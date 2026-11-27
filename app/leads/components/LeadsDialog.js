'use client'

import { useState, useEffect } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Switch } from '@/components/ui/switch'
import { UserPlus, CalendarClock, Trash2, StickyNote, Send, Users, Pencil } from 'lucide-react'
import api from '@/lib/api'
import { getCurrentUser, getEffectiveBranch } from '@/lib/auth'
import { useToast } from '@/components/ui/toast'
import { cn, formatDateTime } from '@/lib/utils'
import { callbackInputValue } from '@/lib/location-time'
import LocationSelector from '@/components/shared/LocationSelector'
import PhoneNumberInput from '@/components/shared/PhoneNumberInput'
import { useLeadStages } from '@/lib/lead-stages'
import { getLeadReasonOptions } from '@/lib/lead-filter-fields'
import { formatReasonLabel } from '@/lib/dynamic-list-normalize'
import LeadEngagementHistory from '@/components/leads/LeadEngagementHistory'
import LeadWorkflowsSection from '@/components/leads/LeadWorkflowsSection'
import { formatLeadSource } from '@/lib/lead-source'

const CLICK_ID_LABELS = {
  gclid: 'Google Ads click',
  gbraid: 'Google Ads click',
  wbraid: 'Google Ads click',
  fbclid: 'Meta click',
  msclkid: 'Microsoft Ads click',
  ttclid: 'TikTok Ads click',
  li_fat_id: 'LinkedIn Ads click',
}

function LeadSourceDetails({ lead }) {
  const attribution = lead.attribution || {}
  const clickLabels = [...new Set(Object.keys(attribution.clickIds || {}).map((k) => CLICK_ID_LABELS[k]).filter(Boolean))]
  const first = attribution.firstTouch
  const showFirst = first?.source && first.source !== lead.utm_source
  return (
    <div className="md:col-span-2">
      <label className="block text-sm font-medium mb-1">Lead source</label>
      <div className="w-full space-y-1 px-3 py-2 border border-border rounded-md bg-muted/30 text-sm text-foreground">
        <p>
          <span className="font-medium">{formatLeadSource(lead.utm_source) || 'Unknown'}</span>
          {lead.utm_medium ? <span className="text-muted-foreground"> · {lead.utm_medium}</span> : null}
          {lead.utm_campaign ? <span className="text-muted-foreground"> · Campaign: {lead.utm_campaign}</span> : null}
        </p>
        {clickLabels.length ? <p className="text-xs text-muted-foreground">{clickLabels.join(', ')}</p> : null}
        {showFirst ? (
          <p className="text-xs text-muted-foreground">First came from {formatLeadSource(first.source)}</p>
        ) : null}
        {attribution.landingPage ? (
          <p className="truncate text-xs text-muted-foreground" title={attribution.landingPage}>
            Landed on {attribution.landingPage}
          </p>
        ) : null}
      </div>
    </div>
  )
}

const bookingStatusOptions = [
  { value: 'Not Booked', label: 'Not Booked' },
  { value: 'Booked', label: 'Booked' },
]

// Mirrors the customer member schema (customer.model.js `memberSchema`) so a
// lead's couple/family carries over 1:1 when the lead is converted.
const MEMBER_GENDER_OPTIONS = [
  { value: 'male', label: 'Male' },
  { value: 'female', label: 'Female' },
  { value: 'other', label: 'Other' },
  { value: 'prefer_not_to_say', label: 'Prefer not to say' },
]

const emptyMember = {
  name: '',
  email: '',
  phoneNumber: '',
  dateOfBirth: '',
  gender: '',
  relationship: '',
  notes: '',
}

function memberFromRecord(member = {}) {
  return {
    name: member.name || '',
    email: member.email || '',
    phoneNumber: member.phoneNumber || '',
    dateOfBirth: member.dateOfBirth ? String(member.dateOfBirth).slice(0, 10) : '',
    gender: member.gender || '',
    relationship: member.relationship || '',
    notes: member.notes || '',
  }
}

// Trim + drop empty optionals; the backend requires only `name`.
function sanitizeMember(member = {}) {
  return {
    name: (member.name || '').trim(),
    email: (member.email || '').trim() || undefined,
    phoneNumber: (member.phoneNumber || '').trim() || undefined,
    dateOfBirth: member.dateOfBirth ? String(member.dateOfBirth).slice(0, 10) : undefined,
    gender: member.gender || undefined,
    relationship: (member.relationship || '').trim() || undefined,
    notes: (member.notes || '').trim() || undefined,
  }
}

function cleanLeadMembers(members) {
  return (Array.isArray(members) ? members : [])
    .map(sanitizeMember)
    .filter((m) => m.name)
}

function defaultLeadLocationIDs() {
  const branch = getEffectiveBranch()
  return branch ? [String(branch)] : []
}

function emptyAddress() {
  return { street: '', city: '', state: '', zipCode: '', country: 'USA' }
}

// Address only goes on the wire when the person actually gave one — a bare
// "USA" is the placeholder, not a real address.
function cleanAddress(address) {
  const a = address || {}
  const out = {
    street: (a.street || '').trim(),
    city: (a.city || '').trim(),
    state: (a.state || '').trim(),
    zipCode: (a.zipCode || '').trim(),
    country: (a.country || '').trim() || 'USA',
  }
  return out.street || out.city || out.state || out.zipCode ? out : undefined
}

const emptyLead = {
  name: '',
  email: '',
  phoneNumber: '',
  dateOfBirth: '',
  gender: '',
  location: '',
  locationID: [],
  stage: 'new',
  reason: '',
  bookingStatus: 'Not Booked',
  assignedAiAgent: '',
  assignedHumanAgent: '',
  isEscalated: false,
  agentFollowupEnabled: true,
  callbackDate: '',
  notes: '',
  members: [],
}

function createEmptyLead() {
  return {
    ...emptyLead,
    locationID: defaultLeadLocationIDs(),
    address: emptyAddress(),
    members: [],
  }
}

function addressFromRecord(address) {
  const a = address || {}
  return {
    street: a.street || '',
    city: a.city || '',
    state: a.state || '',
    zipCode: a.zipCode || '',
    country: a.country || 'USA',
  }
}

const toDateInputValue = (value) => (value ? String(value).slice(0, 10) : '')
// Stable default — a fresh `[]` per render would retrigger the open effect forever.
const NO_LEADS = []

export default function LeadsDialog({
  open,
  onClose,
  leads = NO_LEADS,
  onRefresh,
  initialLeadId = null,
  viewOnly = false,
  leadReasons = [],
}) {
  const [editingLead, setEditingLead] = useState(null)
  const [loading, setLoading] = useState(false)
  const [mode, setMode] = useState('create')
  const [savingCallbackDate, setSavingCallbackDate] = useState(false)
  const [savedCallbackDate, setSavedCallbackDate] = useState('')
  const [sendingPaymentLink, setSendingPaymentLink] = useState(false)
  const [paymentLinkForm, setPaymentLinkForm] = useState({ amount: '', description: 'Intro Lesson', channel: 'sms', showForm: false })
  const toast = useToast()
  const { stages: stageOptions } = useLeadStages()
  const reasonOptions = getLeadReasonOptions(leadReasons)

  const PAYMENT_LINK_STAGES = new Set(['engaged', 're_engaged', 'pending_payment'])

  async function handleSendPaymentLink() {
    if (!editingLead?._id) return
    const { amount, description, channel } = paymentLinkForm
    if (!amount || isNaN(Number(amount)) || Number(amount) <= 0) {
      toast.error({ title: 'Validation', message: 'Enter a valid amount' })
      return
    }
    if (!description) {
      toast.error({ title: 'Validation', message: 'Enter a description' })
      return
    }
    setSendingPaymentLink(true)
    const result = await api.post('/api/payment-request/lead', {
      leadID: editingLead._id,
      amount: Number(amount),
      description,
      channel,
    })
    setSendingPaymentLink(false)
    if (result.success) {
      toast.success({ title: 'Payment link sent', message: `$${Number(amount).toFixed(2)} link sent via ${channel.toUpperCase()}` })
      setPaymentLinkForm((p) => ({ ...p, showForm: false }))
      onRefresh?.()
    } else {
      toast.error({ title: 'Failed to send', message: result.error || 'Unable to send the payment link' })
    }
  }

  useEffect(() => {
    if (!open) {
      setEditingLead(null)
      setMode('create')
      return
    }
    if (!initialLeadId) {
      setEditingLead(createEmptyLead())
      setMode('create')
      return
    }
    const toEditable = (lead) => ({
      ...lead,
      callbackDate: callbackInputValue(lead),
      dateOfBirth: toDateInputValue(lead.dateOfBirth),
      gender: lead.gender || '',
      address: addressFromRecord(lead.address),
      notes: Array.isArray(lead.notes) ? lead.notes : [],
      members: Array.isArray(lead.members) ? lead.members : [],
    })
    // Lead may not be in `leads` (e.g. opened by ID from a dashboard drill-down)
    // — then nothing renders until the fetch below fills it in.
    const found = leads?.find((l) => l._id === initialLeadId)
    setEditingLead(found ? toEditable(found) : null)
    setSavedCallbackDate(found ? callbackInputValue(found) : '')
    setMode(viewOnly ? 'view' : 'edit')
    // The leads list payload may omit actualReason / members / personal
    // details; fetch the full record to fill them in.
    api.get(`/api/lead/${initialLeadId}`).then((res) => {
      if (!res?.success || !res.data) return
      if (!found) setSavedCallbackDate(callbackInputValue(res.data))
      setEditingLead((prev) => {
        if (!prev) return found ? prev : toEditable(res.data)
        if (prev._id !== initialLeadId) return prev
        return {
          ...prev,
          actualReason: res.data.actualReason,
          dateOfBirth: toDateInputValue(res.data.dateOfBirth) || prev.dateOfBirth,
          gender: res.data.gender || prev.gender,
          address: res.data.address ? addressFromRecord(res.data.address) : prev.address,
          members: Array.isArray(res.data.members) ? res.data.members : prev.members || [],
          engagementHistory: Array.isArray(res.data.engagementHistory)
            ? res.data.engagementHistory
            : prev.engagementHistory || [],
          createdAt: res.data.createdAt || prev.createdAt,
          utm_source: res.data.utm_source ?? prev.utm_source,
          utm_medium: res.data.utm_medium ?? prev.utm_medium,
          utm_campaign: res.data.utm_campaign ?? prev.utm_campaign,
          attribution: res.data.attribution ?? prev.attribution,
        }
      })
    })
  }, [open, initialLeadId, leads, viewOnly])

  function openEdit(lead) {
    setEditingLead({ ...lead })
    setMode('edit')
  }

  function openCreate() {
    setEditingLead(createEmptyLead())
    setMode('create')
  }

  function closeEdit() {
    setEditingLead(null)
    setMode('create')
  }

  async function saveLead() {
    if (viewOnly) return
    if (!editingLead) return

    if (!editingLead.name || !editingLead.phoneNumber) {
      toast.error({ title: 'Validation Error', message: 'Name and phone number are required' })
      return
    }

    const selectedLocationIDs = (
      Array.isArray(editingLead.locationID)
        ? editingLead.locationID
        : editingLead.locationID
          ? [editingLead.locationID]
          : []
    )
      .map((l) => String(l?._id ?? l))
      .filter(Boolean)

    if (selectedLocationIDs.length === 0) {
      toast.error({ title: 'Validation Error', message: 'Please select at least one location' })
      return
    }

    const user = getCurrentUser()
    if (!user?.organisationID && !editingLead._id) {
      toast.error({ title: 'Validation Error', message: 'You must be logged in to an organisation to create leads' })
      return
    }

    setLoading(true)
    try {
      if (editingLead._id) {
        const result = await api.put(`/api/lead/${editingLead._id}`, {
          name: editingLead.name,
          email: editingLead.email,
          phoneNumber: editingLead.phoneNumber,
          dateOfBirth: editingLead.dateOfBirth || null,
          gender: editingLead.gender || null,
          address: cleanAddress(editingLead.address) ?? emptyAddress(),
          location: editingLead.location,
          locationID: selectedLocationIDs,
          stage: editingLead.stage,
          reason: editingLead.reason || '',
          bookingStatus: editingLead.bookingStatus,
          assignedAiAgent: editingLead.assignedAiAgent || '',
          assignedHumanAgent: editingLead.assignedHumanAgent || '',
          isEscalated: editingLead.isEscalated || false,
          agentFollowupEnabled: editingLead.agentFollowupEnabled !== false,
          callbackDate: editingLead.callbackDate || null,
        })
        if (result.success) {
          toast.success({ title: 'Saved', message: 'Lead updated successfully' })
          closeEdit()
          onRefresh && onRefresh()
          onClose?.()
        } else {
          toast.error({ title: 'Save failed', message: result.error || 'Unable to update lead' })
        }
      } else {
        const payload = {
          ...editingLead,
          locationID: selectedLocationIDs,
          organisationID: user?.organisationID,
          agentFollowupEnabled: editingLead.agentFollowupEnabled !== false,
          callbackDate: editingLead.callbackDate || undefined,
          dateOfBirth: editingLead.dateOfBirth || undefined,
          gender: editingLead.gender || undefined,
          address: cleanAddress(editingLead.address),
          members: cleanLeadMembers(editingLead.members),
        }
        const result = await api.post('/api/lead', payload)
        if (result.success) {
          toast.success({ title: 'Created', message: 'Lead created successfully' })
          closeEdit()
          onRefresh && onRefresh()
          onClose?.()
        } else {
          toast.error({ title: 'Create failed', message: result.error || 'Unable to create lead' })
        }
      }
    } catch (e) {
      console.error(e)
      toast.error({ title: 'Error', message: 'Unexpected error occurred' })
    } finally {
      setLoading(false)
    }
  }

  async function saveCallbackDate() {
    if (!editingLead?._id) return
    setSavingCallbackDate(true)
    try {
      const result = await api.put(`/api/lead/${editingLead._id}`, {
        callbackDate: editingLead.callbackDate || null,
      })
      if (result.success) {
        toast.success({ title: 'Saved', message: 'Callback date updated' })
        setSavedCallbackDate(editingLead.callbackDate || '')
        onRefresh && onRefresh()
      } else {
        toast.error({ title: 'Save failed', message: result.error || 'Unable to update callback date' })
      }
    } catch (e) {
      console.error(e)
      toast.error({ title: 'Error', message: 'Unexpected error occurred' })
    } finally {
      setSavingCallbackDate(false)
    }
  }

  if (!editingLead) return null

  return (
    <Dialog open={open} onClose={onClose} maxWidth="2xl">
      <DialogContent onClose={onClose} className="max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <UserPlus className="h-5 w-5" />
            {mode === 'view' ? 'Lead Details' : mode === 'edit' ? 'Edit Lead' : 'Create New Lead'}
          </DialogTitle>
          <DialogDescription>
            {mode === 'view'
              ? 'View lead information'
              : mode === 'edit'
              ? 'Update lead information'
              : 'Add a new lead to your CRM'}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Name *</label>
              <Input
                value={editingLead.name || ''}
                onChange={(e) => setEditingLead({ ...editingLead, name: e.target.value })}
                disabled={viewOnly}
                placeholder="Enter lead name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <Input
                type="email"
                value={editingLead.email || ''}
                onChange={(e) => setEditingLead({ ...editingLead, email: e.target.value })}
                disabled={viewOnly}
                placeholder="Enter email address"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Phone Number *</label>
              <PhoneNumberInput
                value={editingLead.phoneNumber || ''}
                onChange={(value) => setEditingLead({ ...editingLead, phoneNumber: value })}
                disabled={viewOnly}
                placeholder="e.g. 8287032815"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Date of Birth</label>
              <Input
                type="date"
                value={editingLead.dateOfBirth || ''}
                onChange={(e) => setEditingLead({ ...editingLead, dateOfBirth: e.target.value })}
                disabled={viewOnly}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Gender</label>
              <select
                value={editingLead.gender || ''}
                onChange={(e) => setEditingLead({ ...editingLead, gender: e.target.value })}
                disabled={viewOnly}
                className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-info disabled:opacity-60"
              >
                <option value="">Select…</option>
                {MEMBER_GENDER_OPTIONS.map((g) => (
                  <option key={g.value} value={g.value}>
                    {g.label}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Location *</label>
              <LocationSelector
                value={
                  Array.isArray(editingLead.locationID)
                    ? editingLead.locationID.map((l) => String(l?._id ?? l)).filter(Boolean)
                    : editingLead.locationID
                      ? [String(editingLead.locationID?._id ?? editingLead.locationID)]
                      : []
                }
                onChange={(ids) => setEditingLead((prev) => ({ ...prev, locationID: ids }))}
                placeholder="Select location(s)"
                showAllOption={false}
                multiple={true}
                disabled={viewOnly}
                className="mt-0.5"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Stage</label>
              <select
                value={editingLead.stage || 'new'}
                onChange={(e) => setEditingLead({ ...editingLead, stage: e.target.value })}
                disabled={viewOnly}
                className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-info"
              >
                {stageOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Reason</label>
              {viewOnly ? (
                <p className="w-full px-3 py-2 border border-border rounded-md bg-muted/30 text-sm text-foreground">
                  {editingLead.reason ? formatReasonLabel(editingLead.reason, leadReasons) : '—'}
                </p>
              ) : (
                <select
                  value={editingLead.reason || ''}
                  onChange={(e) => setEditingLead({ ...editingLead, reason: e.target.value })}
                  className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-info"
                >
                  <option value="">None</option>
                  {reasonOptions.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              )}
            </div>
            {viewOnly && editingLead.actualReason && (
              <div className="md:col-span-2">
                <label className="block text-sm font-medium mb-1">Their Words</label>
                <p className="w-full px-3 py-2 border border-border rounded-md bg-muted/30 text-sm text-foreground italic whitespace-pre-wrap">
                  “{editingLead.actualReason}”
                </p>
              </div>
            )}
            {viewOnly && (editingLead.utm_source || editingLead.attribution?.landingPage) && (
              <LeadSourceDetails lead={editingLead} />
            )}
            {/* Send Payment Link — shown for engaged/re_engaged leads in view mode */}
            {viewOnly && editingLead?._id && PAYMENT_LINK_STAGES.has(editingLead.stage) && (
              <div className="rounded-lg border border-border bg-muted/30 p-3 space-y-2">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-foreground flex items-center gap-1.5">
                    <Send className="h-3.5 w-3.5 text-muted-foreground" />
                    Send Payment Link
                  </p>
                  <button
                    type="button"
                    onClick={() => setPaymentLinkForm((p) => ({ ...p, showForm: !p.showForm }))}
                    className="text-xs text-brand hover:underline"
                  >
                    {paymentLinkForm.showForm ? 'Hide' : 'Set up'}
                  </button>
                </div>
                {paymentLinkForm.showForm && (
                  <div className="space-y-2 pt-1">
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="block text-xs font-medium mb-1 text-muted-foreground">Amount ($)</label>
                        <Input
                          type="number"
                          min="1"
                          step="any"
                          value={paymentLinkForm.amount}
                          onChange={(e) => setPaymentLinkForm((p) => ({ ...p, amount: e.target.value }))}
                          placeholder="75.00"
                          className="h-8 text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium mb-1 text-muted-foreground">Send via</label>
                        <select
                          value={paymentLinkForm.channel}
                          onChange={(e) => setPaymentLinkForm((p) => ({ ...p, channel: e.target.value }))}
                          className="h-8 w-full rounded-md border border-border bg-background text-sm px-2"
                        >
                          <option value="sms">SMS</option>
                          <option value="email">Email</option>
                          <option value="both">Both</option>
                        </select>
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-medium mb-1 text-muted-foreground">Description</label>
                      <Input
                        value={paymentLinkForm.description}
                        onChange={(e) => setPaymentLinkForm((p) => ({ ...p, description: e.target.value }))}
                        placeholder="Intro Lesson"
                        className="h-8 text-sm"
                      />
                    </div>
                    <Button
                      type="button"
                      size="sm"
                      onClick={handleSendPaymentLink}
                      disabled={sendingPaymentLink}
                      className="w-full"
                    >
                      {sendingPaymentLink ? 'Sending…' : 'Send Payment Link'}
                    </Button>
                  </div>
                )}
              </div>
            )}
            <div>
              <label className="block text-sm font-medium mb-1">Booking Status</label>
              <select
                value={editingLead.bookingStatus || 'Not Booked'}
                onChange={(e) => setEditingLead({ ...editingLead, bookingStatus: e.target.value })}
                disabled={viewOnly}
                className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-info"
              >
                {bookingStatusOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Assigned AI Agent</label>
              <Input
                value={editingLead.assignedAiAgent || ''}
                onChange={(e) => setEditingLead({ ...editingLead, assignedAiAgent: e.target.value })}
                disabled={viewOnly}
                placeholder="AI agent ID (optional)"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Assigned Human Agent</label>
              <Input
                value={editingLead.assignedHumanAgent || ''}
                onChange={(e) => setEditingLead({ ...editingLead, assignedHumanAgent: e.target.value })}
                disabled={viewOnly}
                placeholder="Human agent email/ID (optional)"
              />
            </div>
            <div>
              <label className="flex items-center gap-1.5 text-sm font-medium mb-1">
                <CalendarClock className="h-3.5 w-3.5 text-muted-foreground" />
                Callback Date
              </label>
              <div className="flex items-center gap-2">
                <Input
                  type="date"
                  value={toDateInputValue(editingLead.callbackDate)}
                  onChange={(e) => setEditingLead({ ...editingLead, callbackDate: e.target.value })}
                  disabled={!editingLead._id && viewOnly}
                  className="w-44"
                />
                {viewOnly && editingLead._id && (
                  <Button
                    type="button"
                    size="sm"
                    onClick={saveCallbackDate}
                    disabled={savingCallbackDate || (editingLead.callbackDate || '') === savedCallbackDate}
                    className="shrink-0 whitespace-nowrap"
                  >
                    {savingCallbackDate ? 'Saving...' : 'Save'}
                  </Button>
                )}
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Next date to follow up or call this lead back
              </p>
            </div>
            <div className="md:col-span-2">
              <label className="flex items-center gap-1.5 text-sm font-medium mb-1">
                <input
                  type="checkbox"
                  checked={editingLead.isEscalated || false}
                  onChange={(e) => setEditingLead({ ...editingLead, isEscalated: e.target.checked })}
                  disabled={viewOnly}
                  className="w-4 h-4"
                />
                <span>Is Escalated</span>
              </label>
            </div>
            <div className="md:col-span-2 flex items-center justify-between gap-4 rounded-lg border border-border bg-muted/20 px-4 py-3">
              <div>
                <div className="text-sm font-medium">Agent follow-up</div>
                <p className="mt-0.5 text-xs text-muted-foreground">
                  When off, this lead is opted out of automated AI follow-ups (even if location settings allow them).
                </p>
              </div>
              <Switch
                checked={editingLead.agentFollowupEnabled !== false}
                onCheckedChange={(checked) =>
                  setEditingLead({ ...editingLead, agentFollowupEnabled: checked })
                }
                disabled={viewOnly}
              />
            </div>
          </div>

          {(!viewOnly || cleanAddress(editingLead.address)) && (
            <div className="border-t pt-4">
              <label className="block text-sm font-medium mb-2">Address</label>
              {viewOnly ? (
                <p className="text-sm text-foreground">
                  {[
                    editingLead.address?.street,
                    editingLead.address?.city,
                    editingLead.address?.state,
                    editingLead.address?.zipCode,
                    editingLead.address?.country,
                  ]
                    .map((s) => (s || '').trim())
                    .filter(Boolean)
                    .join(', ') || '—'}
                </p>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    { key: 'street', label: 'Street' },
                    { key: 'city', label: 'City' },
                    { key: 'state', label: 'State' },
                    { key: 'zipCode', label: 'Zip Code' },
                    { key: 'country', label: 'Country' },
                  ].map(({ key, label }) => (
                    <div key={key}>
                      <label className="block text-sm font-medium mb-1">{label}</label>
                      <Input
                        value={editingLead.address?.[key] ?? (key === 'country' ? 'USA' : '')}
                        onChange={(e) =>
                          setEditingLead((prev) => ({
                            ...prev,
                            address: { ...addressFromRecord(prev.address), [key]: e.target.value },
                          }))
                        }
                        placeholder={key === 'country' ? 'USA' : 'Optional'}
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {editingLead._id && <LeadWorkflowsSection leadId={editingLead._id} />}

          {editingLead._id && (
            <LeadEngagementHistory
              lead={editingLead}
              stages={stageOptions}
              leadReasons={leadReasons}
            />
          )}

          <div className="border-t pt-4">
            <label className="flex items-center gap-1.5 text-sm font-medium mb-1">
              <Users className="h-3.5 w-3.5 text-muted-foreground" />
              Couple / family members
            </label>
            <p className="text-xs text-muted-foreground mb-3">
              {mode === 'create'
                ? 'Add a partner or family member to create alongside this lead.'
                : 'People linked to this lead. They carry over when the lead is converted.'}
            </p>
            <LeadMembersSection
              leadId={editingLead._id || null}
              members={editingLead.members || []}
              viewOnly={viewOnly}
              onChange={(members) => {
                setEditingLead((prev) => (prev ? { ...prev, members } : prev))
                if (editingLead._id) onRefresh && onRefresh()
              }}
            />
          </div>

          <div className="border-t pt-4">
            <label className="flex items-center gap-1.5 text-sm font-medium mb-2">
              <StickyNote className="h-3.5 w-3.5 text-muted-foreground" />
              Notes
            </label>
            {editingLead._id ? (
              <LeadNotesSection
                leadId={editingLead._id}
                notes={editingLead.notes}
                onChanged={(notes) => {
                  setEditingLead((prev) => ({ ...prev, notes }))
                  onRefresh && onRefresh()
                }}
              />
            ) : (
              <>
                <textarea
                  value={editingLead.notes || ''}
                  onChange={(e) => setEditingLead({ ...editingLead, notes: e.target.value })}
                  disabled={viewOnly}
                  rows={3}
                  placeholder="Add an initial note (optional). You'll be able to add more once the lead is created."
                  className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-info disabled:opacity-60"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Notes carry over to the customer when this lead is converted
                </p>
              </>
            )}
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose} disabled={loading}>
            {viewOnly ? 'Close' : 'Cancel'}
          </Button>
          {!viewOnly && (
            <Button onClick={saveLead} disabled={loading} variant="gradient">
              {loading ? 'Saving...' : mode === 'edit' ? 'Save Changes' : 'Create Lead'}
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

function LeadNotesSection({ leadId, notes, onChanged }) {
  const [text, setText] = useState('')
  const [adding, setAdding] = useState(false)
  const [deletingId, setDeletingId] = useState(null)
  const toast = useToast()

  const sortedNotes = [...(notes || [])].sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  )

  async function handleAdd(e) {
    e.preventDefault()
    if (!text.trim()) return
    setAdding(true)
    const result = await api.post(`/api/lead/${leadId}/notes`, { text: text.trim() })
    if (result.success) {
      setText('')
      onChanged && onChanged(result.data)
    } else {
      toast.error({ title: 'Error', message: result.error || 'Unable to add note' })
    }
    setAdding(false)
  }

  async function handleDelete(noteId) {
    setDeletingId(noteId)
    const result = await api.delete(`/api/lead/${leadId}/notes/${noteId}`)
    if (result.success) {
      onChanged && onChanged(result.data)
    } else {
      toast.error({ title: 'Error', message: result.error || 'Unable to delete note' })
    }
    setDeletingId(null)
  }

  return (
    <div className="space-y-3">
      <form onSubmit={handleAdd} className="flex gap-2">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Add a note…"
          className="flex-1 h-9 px-3 text-sm border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-info"
        />
        <Button type="submit" size="sm" disabled={adding || !text.trim()}>
          {adding ? 'Adding…' : 'Add'}
        </Button>
      </form>

      {sortedNotes.length === 0 ? (
        <div className="rounded-md border border-dashed border-border py-6 text-center text-sm text-muted-foreground">
          No notes yet.
        </div>
      ) : (
        <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
          {sortedNotes.map((note) => (
            <div key={note._id} className="rounded-md border border-border bg-muted/40 px-3 py-2.5">
              <div className="flex items-start justify-between gap-2">
                <p className="text-sm text-foreground leading-relaxed flex-1 whitespace-pre-wrap">
                  {note.text}
                </p>
                <button
                  type="button"
                  onClick={() => handleDelete(note._id)}
                  disabled={deletingId === note._id}
                  className="shrink-0 text-muted-foreground hover:text-destructive disabled:opacity-50"
                  aria-label="Delete note"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                {note.createdBy?.name || note.createdBy?.email || 'Unknown'} · {formatDateTime(note.createdAt)}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

function MemberFields({ value, onChange, disabled = false }) {
  const set = (key, val) => onChange({ ...value, [key]: val })
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
      <div>
        <label className="block text-xs font-medium mb-1 text-muted-foreground">Name *</label>
        <Input
          value={value.name || ''}
          onChange={(e) => set('name', e.target.value)}
          disabled={disabled}
          placeholder="Full name"
        />
      </div>
      <div>
        <label className="block text-xs font-medium mb-1 text-muted-foreground">Relationship</label>
        <Input
          value={value.relationship || ''}
          onChange={(e) => set('relationship', e.target.value)}
          disabled={disabled}
          placeholder="e.g. Spouse, Partner"
        />
      </div>
      <div>
        <label className="block text-xs font-medium mb-1 text-muted-foreground">Email</label>
        <Input
          type="email"
          value={value.email || ''}
          onChange={(e) => set('email', e.target.value)}
          disabled={disabled}
          placeholder="Optional"
        />
      </div>
      <div>
        <label className="block text-xs font-medium mb-1 text-muted-foreground">Phone</label>
        <PhoneNumberInput
          value={value.phoneNumber || ''}
          onChange={(v) => set('phoneNumber', v)}
          disabled={disabled}
          placeholder="Optional"
        />
      </div>
      <div>
        <label className="block text-xs font-medium mb-1 text-muted-foreground">Date of birth</label>
        <Input
          type="date"
          value={value.dateOfBirth || ''}
          onChange={(e) => set('dateOfBirth', e.target.value)}
          disabled={disabled}
        />
      </div>
      <div>
        <label className="block text-xs font-medium mb-1 text-muted-foreground">Gender</label>
        <select
          value={value.gender || ''}
          onChange={(e) => set('gender', e.target.value)}
          disabled={disabled}
          className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-info disabled:opacity-60"
        >
          <option value="">Select…</option>
          {MEMBER_GENDER_OPTIONS.map((g) => (
            <option key={g.value} value={g.value}>
              {g.label}
            </option>
          ))}
        </select>
      </div>
      <div className="md:col-span-2">
        <label className="block text-xs font-medium mb-1 text-muted-foreground">Notes</label>
        <Input
          value={value.notes || ''}
          onChange={(e) => set('notes', e.target.value)}
          disabled={disabled}
          placeholder="Any notes about this person"
        />
      </div>
    </div>
  )
}

function LeadMembersSection({ leadId, members = [], viewOnly = false, onChange }) {
  const toast = useToast()
  const localMode = !leadId
  const list = Array.isArray(members) ? members : []

  const [adding, setAdding] = useState(false)
  const [draft, setDraft] = useState(emptyMember)
  const [editKey, setEditKey] = useState(null) // index (local mode) or member _id (server mode)
  const [editDraft, setEditDraft] = useState(emptyMember)
  const [busy, setBusy] = useState(false)

  const resetAdd = () => {
    setAdding(false)
    setDraft(emptyMember)
  }
  const resetEdit = () => {
    setEditKey(null)
    setEditDraft(emptyMember)
  }

  const keyFor = (member, index) => (localMode ? member._localId || `i${index}` : member._id)
  const isEditing = (member, index) => editKey !== null && editKey === keyFor(member, index)

  async function handleAdd() {
    const clean = sanitizeMember(draft)
    if (!clean.name) {
      toast.error({ title: 'Validation Error', message: 'Member name is required' })
      return
    }
    if (localMode) {
      onChange([...list, { ...clean, _localId: `m${Date.now()}${Math.random().toString(36).slice(2, 7)}` }])
      resetAdd()
      return
    }
    setBusy(true)
    const res = await api.post(`/api/lead/${leadId}/members`, clean)
    setBusy(false)
    if (res.success) {
      onChange(Array.isArray(res.data?.members) ? res.data.members : [])
      resetAdd()
      toast.success({ title: 'Added', message: 'Member added' })
    } else {
      toast.error({ title: 'Error', message: res.error || 'Unable to add member' })
    }
  }

  async function handleUpdate(member, index) {
    const clean = sanitizeMember(editDraft)
    if (!clean.name) {
      toast.error({ title: 'Validation Error', message: 'Member name is required' })
      return
    }
    if (localMode) {
      onChange(list.map((m, i) => (i === index ? { ...clean, _localId: m._localId } : m)))
      resetEdit()
      return
    }
    setBusy(true)
    const res = await api.put(`/api/lead/${leadId}/members/${member._id}`, clean)
    setBusy(false)
    if (res.success) {
      onChange(Array.isArray(res.data?.members) ? res.data.members : [])
      resetEdit()
      toast.success({ title: 'Saved', message: 'Member updated' })
    } else {
      toast.error({ title: 'Error', message: res.error || 'Unable to update member' })
    }
  }

  async function handleDelete(member, index) {
    if (localMode) {
      onChange(list.filter((_, i) => i !== index))
      return
    }
    if (!window.confirm('Remove this member?')) return
    setBusy(true)
    const res = await api.delete(`/api/lead/${leadId}/members/${member._id}`)
    setBusy(false)
    if (res.success) {
      onChange(Array.isArray(res.data?.members) ? res.data.members : [])
      toast.success({ title: 'Removed', message: 'Member removed' })
    } else {
      toast.error({ title: 'Error', message: res.error || 'Unable to remove member' })
    }
  }

  function startEdit(member, index) {
    setAdding(false)
    setEditKey(keyFor(member, index))
    setEditDraft(memberFromRecord(member))
  }

  return (
    <div className="space-y-3">
      {list.length === 0 && !adding ? (
        <div className="rounded-md border border-dashed border-border py-6 text-center text-sm text-muted-foreground">
          {viewOnly ? 'No additional people on this lead.' : 'No partner or family members added yet.'}
        </div>
      ) : (
        <div className="space-y-2">
          {list.map((member, index) =>
            isEditing(member, index) ? (
              <div key={keyFor(member, index)} className="rounded-md border border-border bg-muted/30 p-3">
                <MemberFields value={editDraft} onChange={setEditDraft} disabled={busy} />
                <div className="mt-3 flex justify-end gap-2">
                  <Button type="button" variant="outline" size="sm" onClick={resetEdit} disabled={busy}>
                    Cancel
                  </Button>
                  <Button type="button" size="sm" onClick={() => handleUpdate(member, index)} disabled={busy}>
                    {busy ? 'Saving…' : 'Save'}
                  </Button>
                </div>
              </div>
            ) : (
              <div
                key={keyFor(member, index)}
                className="flex items-start justify-between gap-3 rounded-md border border-border bg-muted/40 px-3 py-2.5"
              >
                <div className="min-w-0">
                  <p className="text-sm font-medium text-foreground">
                    {member.name}
                    {member.relationship && (
                      <span className="ml-2 text-xs font-normal text-muted-foreground capitalize">
                        {member.relationship}
                      </span>
                    )}
                  </p>
                  <p className="text-xs text-muted-foreground truncate">
                    {[member.email, member.phoneNumber].filter(Boolean).join(' · ') || '—'}
                  </p>
                </div>
                {!viewOnly && (
                  <div className="flex shrink-0 items-center gap-1.5">
                    <button
                      type="button"
                      onClick={() => startEdit(member, index)}
                      disabled={busy}
                      className="text-muted-foreground hover:text-foreground disabled:opacity-50"
                      aria-label="Edit member"
                    >
                      <Pencil className="h-3.5 w-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDelete(member, index)}
                      disabled={busy}
                      className="text-muted-foreground hover:text-destructive disabled:opacity-50"
                      aria-label="Remove member"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                )}
              </div>
            )
          )}
        </div>
      )}

      {!viewOnly && adding && (
        <div className="rounded-md border border-border bg-muted/30 p-3">
          <MemberFields value={draft} onChange={setDraft} disabled={busy} />
          <div className="mt-3 flex justify-end gap-2">
            <Button type="button" variant="outline" size="sm" onClick={resetAdd} disabled={busy}>
              Cancel
            </Button>
            <Button type="button" size="sm" onClick={handleAdd} disabled={busy}>
              {busy ? 'Adding…' : 'Add person'}
            </Button>
          </div>
        </div>
      )}

      {!viewOnly && !adding && editKey === null && (
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => {
            resetEdit()
            setDraft(emptyMember)
            setAdding(true)
          }}
        >
          <UserPlus className="mr-1.5 h-3.5 w-3.5" />
          Add person
        </Button>
      )}
    </div>
  )
}
