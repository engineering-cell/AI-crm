'use client'

import { useState, useEffect, useCallback } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { ArrowLeft, Save, ChevronDown, ChevronRight } from 'lucide-react'
import MainLayout from '@/components/layout/MainLayout'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Checkbox } from '@/components/ui/checkbox'
import api from '@/lib/api'
import { toast } from '@/components/ui/toast'
import GlobalLoader from '@/components/shared/GlobalLoader'
import LocationSelector from '@/components/shared/LocationSelector'
import { cn } from '@/lib/utils'

function randomColor() {
  return `#${Math.floor(Math.random() * 0xffffff).toString(16).padStart(6, '0')}`
}


function computeAmounts(svc) {
  if (svc.accessType === 'unlimited') return { total: 0, finalAmount: 0 }
  const sessions = Number(svc.numberOfSessions) || 0
  const price = Number(svc.pricePerSession) || 0
  const total = sessions * price
  const discount = Number(svc.discountAmount) || 0
  let finalAmount = total
  if (svc.discountType === 'percentage') finalAmount = total - (total * discount) / 100
  else if (svc.discountType === 'fixed') finalAmount = total - discount
  return { total, finalAmount: Math.max(0, finalAmount) }
}

// serviceSelections: Map<serviceCode, { accessType, numberOfSessions, pricePerSession, discountType, discountAmount }>
function makeSelection(catalogSvc, existing) {
  return {
    accessType: existing?.accessType || 'unlimited',
    numberOfSessions: existing?.numberOfSessions ?? '',
    pricePerSession: existing?.pricePerSession ?? catalogSvc.price ?? '',
    discountType: existing?.discountType || 'none',
    discountAmount: existing?.discountAmount ?? '',
  }
}

export default function MembershipEditPage() {
  const { id } = useParams()
  const router = useRouter()
  const isNew = id === 'new'

  const [loading, setLoading] = useState(!isNew)
  const [saving, setSaving] = useState(false)

  // Services eligible for memberships, grouped by type
  const [privateServices, setPrivateServices] = useState([])
  const [groupServices, setGroupServices] = useState([])
  // Expanded state for each group accordion
  const [groupOpen, setGroupOpen] = useState({ private: true, group: false })

  // selectedCodes: Set<serviceCode>
  const [selectedCodes, setSelectedCodes] = useState(new Set())
  // selections: Map<serviceCode, { accessType, numberOfSessions, ... }>
  const [selections, setSelections] = useState({})

  const [membershipName, setMembershipName] = useState('')
  const [locationID, setLocationID] = useState([])
  const [description, setDescription] = useState('')
  const [color, setColor] = useState(() => randomColor())
  const [durationDays, setDurationDays] = useState(30)
  const [price, setPrice] = useState('')
  const [autoRenew, setAutoRenew] = useState(true)
  const [isActive, setIsActive] = useState(true)

  useEffect(() => {
    Promise.all([
      api.get('/api/calendar-service?showOnMemberships=true&type=private&limit=200'),
      api.get('/api/calendar-service?showOnMemberships=true&type=group&limit=200'),
    ]).then(([pvt, grp]) => {
      if (pvt.success) setPrivateServices(Array.isArray(pvt.data) ? pvt.data : [])
      if (grp.success) setGroupServices(Array.isArray(grp.data) ? grp.data : [])
    })
  }, [])

  const loadMembership = useCallback(async () => {
    setLoading(true)
    try {
      const result = await api.get(`/api/membership/${id}`)
      if (result.success) {
        const m = result.data
        setMembershipName(m.membershipName || '')
        setLocationID(
          Array.isArray(m.locationID)
            ? m.locationID.map((l) => l?._id ?? l).filter(Boolean)
            : m.locationID?._id ? [m.locationID._id] : m.locationID ? [m.locationID] : []
        )
        setDescription(m.description || '')
        setColor(m.color || randomColor())
        setDurationDays(m.durationDays ?? 30)
        setPrice(m.price ?? '')
        setAutoRenew(m.autoRenew !== false)
        setIsActive(m.isActive !== false)
        if (m.services?.length) {
          const codes = new Set(m.services.map((s) => s.serviceCode))
          const sels = {}
          m.services.forEach((s) => {
            sels[s.serviceCode] = {
              accessType: s.accessType || 'unlimited',
              numberOfSessions: s.numberOfSessions ?? '',
              pricePerSession: s.pricePerSession ?? '',
              discountType: s.discountType || 'none',
              discountAmount: s.discountAmount ?? '',
              // keep original doc _id and metadata for update
              _id: s._id,
              serviceName: s.serviceName,
              serviceDetails: s.serviceDetails || '',
              svcColor: s.color || '',
            }
          })
          setSelectedCodes(codes)
          setSelections(sels)
        }
      } else {
        toast.error('Failed to load membership', { description: result.error })
        router.push('/calendar/memberships')
      }
    } catch {
      toast.error('Error', { description: 'Unable to load membership' })
      router.push('/calendar/memberships')
    } finally {
      setLoading(false)
    }
  }, [id, router])

  useEffect(() => { if (!isNew) loadMembership() }, [isNew, loadMembership])

  function toggleService(catalogSvc) {
    const code = catalogSvc.serviceCode
    setSelectedCodes((prev) => {
      const next = new Set(prev)
      if (next.has(code)) {
        next.delete(code)
      } else {
        next.add(code)
        setSelections((s) => ({
          ...s,
          [code]: makeSelection(catalogSvc, s[code]),
        }))
      }
      return next
    })
  }

  function updateSelection(code, field, value) {
    setSelections((prev) => ({ ...prev, [code]: { ...prev[code], [field]: value } }))
  }

  const allCatalogByCode = [...privateServices, ...groupServices].reduce((acc, s) => {
    acc[s.serviceCode] = s
    return acc
  }, {})

  async function handleSave() {
    if (!membershipName.trim()) { toast.error('Membership name is required'); return }
    if (!locationID?.length) { toast.error('Please select at least one location'); return }

    const cleanedServices = [...selectedCodes].map((code) => {
      const sel = selections[code] || {}
      const catalogSvc = allCatalogByCode[code] || {}
      const isUnlimited = sel.accessType === 'unlimited'
      const { total, finalAmount } = computeAmounts({
        accessType: sel.accessType,
        numberOfSessions: sel.numberOfSessions,
        pricePerSession: sel.pricePerSession,
        discountType: sel.discountType,
        discountAmount: sel.discountAmount,
      })
      return {
        ...(sel._id ? { _id: sel._id } : {}),
        serviceName: sel.serviceName || catalogSvc.serviceName || code,
        serviceCode: code,
        serviceDetails: sel.serviceDetails || catalogSvc.description || '',
        color: sel.svcColor || catalogSvc.color || '',
        accessType: sel.accessType || 'unlimited',
        numberOfSessions: isUnlimited ? 0 : Number(sel.numberOfSessions) || 0,
        pricePerSession: isUnlimited ? 0 : Number(sel.pricePerSession) || 0,
        total,
        discountType: isUnlimited ? 'none' : sel.discountType || 'none',
        discountAmount: isUnlimited ? 0 : Number(sel.discountAmount) || 0,
        finalAmount,
      }
    })

    const payload = {
      membershipName: membershipName.trim(),
      locationID: locationID || undefined,
      description: description.trim(),
      color,
      durationDays: durationDays === '' ? 30 : Number(durationDays),
      price: price === '' ? 0 : Number(price),
      autoRenew,
      isActive,
      services: cleanedServices,
    }

    setSaving(true)
    try {
      const result = isNew
        ? await api.post('/api/membership', payload)
        : await api.put(`/api/membership/${id}`, payload)
      if (result.success) {
        toast.success(isNew ? 'Membership created' : 'Membership saved')
        router.push('/calendar/memberships')
      } else {
        toast.error('Failed to save', { description: result.error })
      }
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <MainLayout title="Membership" subtitle="">
        <div className="flex items-center justify-center h-[calc(100vh-8rem)]">
          <GlobalLoader variant="center" size="md" text="Loading membership…" />
        </div>
      </MainLayout>
    )
  }

  return (
    <MainLayout title={isNew ? 'New Membership' : 'Edit Membership'} subtitle="">
      <div className="w-full pb-12">

        {/* Top bar */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => router.push('/calendar/memberships')}
              className="h-9 w-9 rounded-lg border border-border bg-background flex items-center justify-center hover:bg-muted/50 text-muted-foreground"
            >
              <ArrowLeft className="h-4 w-4" />
            </button>
            <div>
              <h1 className="text-xl font-semibold text-foreground">
                {isNew ? 'New Membership' : membershipName || 'Edit Membership'}
              </h1>
              <p className="text-sm text-muted-foreground">
                {isNew ? 'Fill in the details below' : 'Update membership details and services'}
              </p>
            </div>
          </div>
        </div>

        {/* Membership details card */}
        <div className="rounded-xl border border-border bg-card p-6 mb-6">
          <h2 className="text-sm font-semibold text-foreground mb-4">Membership Details</h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="mem-name">Membership Name *</Label>
              <Input
                id="mem-name"
                placeholder="e.g. Unlimited Monthly"
                value={membershipName}
                onChange={(e) => setMembershipName(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label>Location</Label>
              <LocationSelector value={locationID} onChange={setLocationID} multiple={true} showAllOption={false} />
            </div>
          </div>
          <div className="flex flex-col gap-1.5 mt-4">
            <Label htmlFor="mem-desc">Description</Label>
            <Textarea
              id="mem-desc"
              placeholder="Optional description…"
              rows={2}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="resize-none"
            />
          </div>
        </div>

        {/* Services card */}
        <div className="rounded-xl border border-border bg-card p-6">
          <div className="flex items-center justify-between mb-1">
            <h2 className="text-sm font-semibold text-foreground">
              Services
              <span className="ml-2 inline-flex items-center rounded-full px-2 py-0.5 text-xs font-normal bg-muted text-muted-foreground">
                {selectedCodes.size} selected
              </span>
            </h2>
          </div>
          <p className="mb-4 text-[12px] text-muted-foreground">
            Select the services included in this membership. Tick services below, then choose
            {' '}<span className="font-medium text-foreground">Unlimited</span> (open daily access) or
            {' '}<span className="font-medium text-foreground">Sessions</span> (fixed count).
            {(privateServices.length === 0 && groupServices.length === 0) && (
              <span className="block mt-1 text-amber-600">
                No services are enabled for memberships yet. Enable them via Setup → Services → Memberships checkbox.
              </span>
            )}
          </p>

          {/* Grouped accordions */}
          {[
            { key: 'private', label: 'Private Services', items: privateServices },
            { key: 'group', label: 'Group Services', items: groupServices },
          ].map(({ key, label, items }) => items.length === 0 ? null : (
            <div key={key} className="mb-3 rounded-lg border border-border overflow-hidden">
              {/* Accordion header */}
              <button
                type="button"
                onClick={() => setGroupOpen((prev) => ({ ...prev, [key]: !prev[key] }))}
                className="w-full flex items-center justify-between px-4 py-3 bg-muted/30 hover:bg-muted/50 transition-colors text-left"
              >
                <div className="flex items-center gap-2">
                  {groupOpen[key] ? <ChevronDown className="h-4 w-4 text-muted-foreground" /> : <ChevronRight className="h-4 w-4 text-muted-foreground" />}
                  <span className="text-[13px] font-medium text-foreground">{label}</span>
                  <span className="text-[11px] text-muted-foreground">
                    ({items.filter((s) => selectedCodes.has(s.serviceCode)).length}/{items.length} selected)
                  </span>
                </div>
              </button>

              {/* Accordion body */}
              {groupOpen[key] && (
                <div className="divide-y divide-border">
                  {/* Select all row */}
                  <div className="px-4 py-2 flex items-center gap-2 bg-muted/10">
                    <Checkbox
                      checked={items.every((s) => selectedCodes.has(s.serviceCode))}
                      onClick={() => {
                        const allSelected = items.every((s) => selectedCodes.has(s.serviceCode))
                        if (!allSelected) {
                          setSelections((sel) => {
                            const next = { ...sel }
                            items.forEach((s) => { next[s.serviceCode] = makeSelection(s, sel[s.serviceCode]) })
                            return next
                          })
                          setSelectedCodes((prev) => {
                            const next = new Set(prev)
                            items.forEach((s) => next.add(s.serviceCode))
                            return next
                          })
                        } else {
                          setSelectedCodes((prev) => {
                            const next = new Set(prev)
                            items.forEach((s) => next.delete(s.serviceCode))
                            return next
                          })
                        }
                      }}
                      className="rounded border-border data-[state=checked]:bg-violet-600 data-[state=checked]:border-violet-600 shrink-0"
                    />
                    <span className="text-[12px] text-muted-foreground select-none">Select all</span>
                  </div>
                  {items.map((svc) => {
                    const isSelected = selectedCodes.has(svc.serviceCode)
                    const sel = selections[svc.serviceCode] || {}
                    const isUnlimited = !isSelected || sel.accessType !== 'sessions'
                    const isChargeable = svc.isChargeable ?? false
                    const priceDisabled = isUnlimited || !isChargeable

                    return (
                      <div key={svc._id} className={cn('px-4 py-3 transition-colors', isSelected ? 'bg-violet-500/5' : 'bg-card')}>
                        {/* Row 1: checkbox + name + access toggle */}
                        <div className="flex items-center gap-3">
                          <Checkbox
                            checked={isSelected}
                            onClick={() => toggleService(svc)}
                            className="rounded border-border data-[state=checked]:bg-violet-600 data-[state=checked]:border-violet-600 shrink-0"
                          />
                          {svc.color && (
                            <span className="h-3 w-3 rounded-full shrink-0" style={{ backgroundColor: svc.color }} />
                          )}
                          <span className={cn('text-[13px] font-medium flex-1', isSelected ? 'text-foreground' : 'text-muted-foreground')}>
                            {svc.serviceName}
                          </span>
                          <span className="font-mono text-[11px] bg-muted px-1.5 py-0.5 rounded border border-border text-muted-foreground shrink-0">
                            {svc.serviceCode}
                          </span>

                          {/* Access toggle — only visible when selected */}
                          {isSelected && (
                            <div className="inline-flex rounded-lg border border-border bg-background p-0.5 shrink-0">
                              {[{ v: 'unlimited', label: 'Unlimited' }, { v: 'sessions', label: 'Sessions' }].map((opt) => (
                                <button
                                  key={opt.v}
                                  type="button"
                                  onClick={() => updateSelection(svc.serviceCode, 'accessType', opt.v)}
                                  className={cn(
                                    'h-7 px-3 rounded-md text-[11px] font-medium transition-colors whitespace-nowrap',
                                    sel.accessType === opt.v
                                      ? 'bg-brand text-brand-foreground'
                                      : 'text-muted-foreground hover:text-foreground'
                                  )}
                                >
                                  {opt.label}
                                </button>
                              ))}
                            </div>
                          )}
                        </div>

                        {/* Row 2: sessions / price config — only when sessions mode */}
                        {isSelected && sel.accessType === 'sessions' && (
                          <div className="mt-2.5 ml-7 flex items-center gap-3 flex-wrap">
                            <div className="flex items-center gap-1.5">
                              <Label className="text-[12px] whitespace-nowrap text-muted-foreground">Sessions</Label>
                              <Input
                                type="number"
                                min="1"
                                placeholder="0"
                                value={sel.numberOfSessions ?? ''}
                                onChange={(e) => updateSelection(svc.serviceCode, 'numberOfSessions', e.target.value)}
                                className="h-8 w-[80px] text-sm"
                              />
                            </div>
                            {isChargeable && (
                              <>
                                <div className="flex items-center gap-1.5">
                                  <Label className="text-[12px] whitespace-nowrap text-muted-foreground">Price/Session</Label>
                                  <div className="relative">
                                    <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-xs text-muted-foreground">$</span>
                                    <Input
                                      type="number"
                                      min="0"
                                      step="any"
                                      placeholder="0.00"
                                      value={sel.pricePerSession ?? ''}
                                      onChange={(e) => updateSelection(svc.serviceCode, 'pricePerSession', e.target.value)}
                                      className="h-8 w-[100px] text-sm pl-5"
                                    />
                                  </div>
                                </div>
                                <div className="flex items-center gap-1.5">
                                  <Label className="text-[12px] whitespace-nowrap text-muted-foreground">Discount</Label>
                                  <select
                                    value={sel.discountType ?? 'none'}
                                    onChange={(e) => updateSelection(svc.serviceCode, 'discountType', e.target.value)}
                                    className="h-8 rounded-md border border-border bg-background text-[12px] px-2 focus:outline-none"
                                  >
                                    <option value="none">None</option>
                                    <option value="percentage">% Off</option>
                                    <option value="fixed">$ Off</option>
                                  </select>
                                  {sel.discountType !== 'none' && (
                                    <Input
                                      type="number"
                                      min="0"
                                      step="any"
                                      placeholder="0"
                                      value={sel.discountAmount ?? ''}
                                      onChange={(e) => updateSelection(svc.serviceCode, 'discountAmount', e.target.value)}
                                      className="h-8 w-[80px] text-sm"
                                    />
                                  )}
                                </div>
                                {(() => {
                                  const { finalAmount } = computeAmounts({ accessType: 'sessions', numberOfSessions: sel.numberOfSessions, pricePerSession: sel.pricePerSession, discountType: sel.discountType, discountAmount: sel.discountAmount })
                                  return finalAmount > 0 ? (
                                    <span className="text-[12px] font-semibold text-foreground">
                                      Total: ${finalAmount.toFixed(2)}
                                    </span>
                                  ) : null
                                })()}
                              </>
                            )}
                          </div>
                        )}

                        {isSelected && sel.accessType !== 'sessions' && (
                          <p className="mt-1 ml-7 text-[11px] text-muted-foreground">Once per day, for the duration of the membership.</p>
                        )}
                      </div>
                    )
                  })}
                </div>
              )}
            </div>
          ))}

          {/* Pricing + duration + auto-renew */}
          <div className="mt-6 pt-4 border-t border-border space-y-4">
            <div className="flex items-center gap-3 flex-wrap">
              <Label htmlFor="mem-price" className="whitespace-nowrap text-sm">Membership Price</Label>
              <div className="relative">
                <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-xs text-muted-foreground">$</span>
                <Input
                  id="mem-price"
                  type="number"
                  min="0"
                  step="any"
                  placeholder="0.00"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="h-8 w-[120px] text-sm pl-5"
                />
              </div>
              <span className="text-[11px] text-muted-foreground">billed each period</span>
            </div>

            <div className="flex items-center gap-3 flex-wrap">
              <Label htmlFor="mem-days" className="whitespace-nowrap text-sm">Duration</Label>
              <Input
                id="mem-days"
                type="number"
                min="1"
                placeholder="30"
                value={durationDays}
                onChange={(e) => setDurationDays(e.target.value)}
                className="h-8 w-[90px] text-sm"
              />
              <span className="text-[11px] text-muted-foreground">days</span>
              <div className="flex items-center gap-1.5">
                {[
                  { label: '1 month', days: 30 },
                  { label: '3 months', days: 90 },
                  { label: '6 months', days: 180 },
                  { label: '1 year', days: 365 },
                ].map(({ label, days }) => (
                  <button
                    key={days}
                    type="button"
                    onClick={() => setDurationDays(days)}
                    className={cn(
                      'h-7 px-2.5 rounded-full border text-[11px] font-medium transition-colors',
                      Number(durationDays) === days
                        ? 'bg-brand border-brand text-brand-foreground'
                        : 'border-border bg-background text-muted-foreground hover:text-foreground hover:border-foreground/30'
                    )}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Label className="text-sm">Auto-renew</Label>
              <div className="flex items-center gap-4">
                <label className="flex items-center gap-1.5 cursor-pointer text-sm">
                  <input type="radio" name="mem-autorenew" checked={autoRenew === true} onChange={() => setAutoRenew(true)} className="accent-brand" />
                  Yes
                </label>
                <label className="flex items-center gap-1.5 cursor-pointer text-sm">
                  <input type="radio" name="mem-autorenew" checked={autoRenew === false} onChange={() => setAutoRenew(false)} className="accent-brand" />
                  No
                </label>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Label className="text-sm">Active</Label>
              <div className="flex items-center gap-4">
                <label className="flex items-center gap-1.5 cursor-pointer text-sm">
                  <input type="radio" name="mem-active" checked={isActive === true} onChange={() => setIsActive(true)} className="accent-brand" />
                  Yes
                </label>
                <label className="flex items-center gap-1.5 cursor-pointer text-sm">
                  <input type="radio" name="mem-active" checked={isActive === false} onChange={() => setIsActive(false)} className="accent-brand" />
                  No
                </label>
              </div>
            </div>
          </div>

          {/* Save button at bottom */}
          <div className="mt-6 pt-4 border-t border-border flex justify-end">
            <Button
              onClick={handleSave}
              disabled={saving}
              className="h-9 px-6 rounded-lg bg-brand hover:bg-brand-dark text-brand-foreground text-sm font-medium gap-2"
            >
              <Save className="h-4 w-4" />
              {saving ? 'Saving…' : isNew ? 'Create Membership' : 'Save Changes'}
            </Button>
          </div>
        </div>

      </div>
    </MainLayout>
  )
}
