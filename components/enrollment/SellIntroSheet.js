'use client'

import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import { ExternalLink, Link2, Loader2 } from 'lucide-react'
import { Sheet, SheetContent } from '@/components/ui/sheet'
import SearchableSelect from '@/components/ui/searchable-select'
import PaymentMethodPicker from '@/components/payments/PaymentMethodPicker'
import TerminalDeviceField, { terminalTipPayload } from '@/components/payments/TerminalDeviceField'
import LessonSlotPicker, { slotWallTimesToUtcRange } from '@/components/calendar/LessonSlotPicker'
import { Button } from '@/components/ui/button'
import { nameWithMembers } from '@/lib/utils'
import { useToast } from '@/components/ui/toast'
import { useStudioTimezone } from '@/lib/hooks/useStudioTimezone'
import { resolveLessonMinutes, resolveStudioDayHours, locationSlotSettings } from '@/lib/studioSlotHours'
import api from '@/lib/api'

const SHEET_WIDTH = '560px'

const INTRO_PAYMENT_METHODS = [
  { value: 'link', label: 'Share Link' },
  { value: 'cash', label: 'Cash' },
  { value: 'card', label: 'Card' },
  { value: 'terminal', label: 'Terminal' },
]

const LINK_CHANNELS = [
  { value: 'sms', label: 'SMS' },
  { value: 'email', label: 'Email' },
  { value: 'both', label: 'Both' },
]

function sessionKey(s) {
  return String(s.sessionID || s._id || '')
}

function money(n) {
  const value = Number(n)
  if (!Number.isFinite(value)) return '0'
  return Number.isInteger(value) ? value.toFixed(0) : value.toFixed(2)
}

const WEEKDAY_LABELS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

function formatClock(hhmm) {
  if (!hhmm || !hhmm.includes(':')) return ''
  const [h, m] = hhmm.split(':').map(Number)
  if (!Number.isFinite(h)) return hhmm
  return `${h % 12 || 12}:${String(m).padStart(2, '0')} ${h < 12 ? 'AM' : 'PM'}`
}

function scheduleStillRunning(schedule) {
  if (!schedule?.endDate) return true
  return schedule.endDate >= new Date().toLocaleDateString('en-CA')
}

function formatSessionDate(s) {
  const day = s.localDay || ''
  const date = s.localDate
    ? new Date(`${s.localDate}T12:00:00`).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
    : ''
  const time = s.localTime || ''
  return [day, date].filter(Boolean).join(', ') + (time ? ` · ${time}` : '')
}

function locationMatches(service, locationID) {
  if (!locationID) return true
  const locs = Array.isArray(service.locationID) ? service.locationID : [service.locationID]
  return locs.some((l) => String(l?._id || l) === String(locationID))
}

export default function SellIntroSheet({ open, onClose, onSuccess }) {
  const toast = useToast()
  const studioTz = useStudioTimezone()

  const [contactOptions, setContactOptions] = useState([])
  const [selectedContactKey, setSelectedContactKey] = useState('')
  const [introCatalog, setIntroCatalog] = useState([])
  const [catalogLoading, setCatalogLoading] = useState(false)
  const [saleKind, setSaleKind] = useState('intro')
  const [selectedIntroID, setSelectedIntroID] = useState('')
  const [sessions, setSessions] = useState([])
  const [groupLessons, setGroupLessons] = useState([])
  const [groupSchedules, setGroupSchedules] = useState([])
  const [sessionsLoading, setSessionsLoading] = useState(false)
  const [selectedScheduleID, setSelectedScheduleID] = useState('')
  const [selectedSessionID, setSelectedSessionID] = useState('')
  const [method, setMethod] = useState('link')
  const [channel, setChannel] = useState('sms')
  const [deviceID, setDeviceID] = useState('')
  const [includeSlot, setIncludeSlot] = useState(false)
  const [teacherOptions, setTeacherOptions] = useState([])
  const [teacherID, setTeacherID] = useState('')
  const [slotDate, setSlotDate] = useState('')
  const [selectedSlot, setSelectedSlot] = useState(null)
  const [locationsById, setLocationsById] = useState({})
  /** Location ids whose by-id fetch failed — unlock generic fallback hours. */
  const [locationFetchFailed, setLocationFetchFailed] = useState({})
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [result, setResult] = useState(null)
  const [warning, setWarning] = useState(null)

  const selectedContact = useMemo(
    () => contactOptions.find((c) => c.value === selectedContactKey) || null,
    [contactOptions, selectedContactKey],
  )
  const locationID = selectedContact?.locationID || null
  const selectedLocation = locationID ? locationsById[String(locationID)] || null : null
  const hoursReady =
    !locationID ||
    Boolean(selectedLocation) ||
    Boolean(locationFetchFailed[String(locationID)])
  const hoursLoading = Boolean(locationID && !hoursReady)
  const slotTz = selectedLocation?.timezone || studioTz || null
  const durationMins = locationID
    ? resolveLessonMinutes(selectedLocation?.defaultLessonMinutes)
    : 60

  const dayHours = useMemo(() => {
    // Wait for the location document — do not invent fallback chips while loading.
    if (!hoursReady) return { closed: false, openMin: null, closeMin: null }
    return resolveStudioDayHours(selectedLocation?.operatingHours, slotDate, slotTz)
  }, [hoursReady, selectedLocation, slotDate, slotTz])

  const locationIntros = useMemo(
    () =>
      introCatalog.filter((s) => {
        if (s.isActive === false) return false
        if (!locationMatches(s, locationID)) return false
        const price = Number(s.price)
        // $0 Setup intros are complimentary and sellable from Sell Intro.
        if (Number.isFinite(price) && price === 0) return true
        return price > 0 && s.isChargeable !== false
      }),
    [introCatalog, locationID],
  )

  const selectedIntro = useMemo(
    () => locationIntros.find((s) => String(s._id) === String(selectedIntroID)) || null,
    [locationIntros, selectedIntroID],
  )
  const isFreeIntro =
    saleKind === 'intro' &&
    selectedIntro != null &&
    Number.isFinite(Number(selectedIntro.price)) &&
    Number(selectedIntro.price) === 0

  const groupClasses = useMemo(() => {
    const lessonsById = new Map(
      (Array.isArray(groupLessons) ? groupLessons : []).map((lesson) => [String(lesson._id), lesson]),
    )
    return (Array.isArray(groupSchedules) ? groupSchedules : [])
      .filter(scheduleStillRunning)
      .map((schedule) => {
        const lessonId = String(schedule.lessonID?._id || schedule.lessonID || '')
        const lesson = lessonsById.get(lessonId) || (typeof schedule.lessonID === 'object' ? schedule.lessonID : {})
        const listedPrice = Number(lesson.calendarServiceID?.price)
        const sessionPrice = (Array.isArray(sessions) ? sessions : []).find(
          (session) =>
            String(session.scheduleID) === String(schedule._id) && Number(session.dropInPrice) > 0,
        )?.dropInPrice
        const price = Number.isFinite(listedPrice) && listedPrice > 0 ? listedPrice : Number(sessionPrice)
        const loc = schedule.locationID
        const scheduleLocationID = loc ? String(loc._id || loc) : null
        const days = (schedule.daysOfWeek || [])
          .slice()
          .sort((a, b) => ((a + 6) % 7) - ((b + 6) % 7))
          .map((day) => WEEKDAY_LABELS[day])
          .filter(Boolean)
          .join(', ')
        return {
          scheduleID: String(schedule._id),
          name: lesson.name || 'Group class',
          color: lesson.color || null,
          price: Number.isFinite(price) && price > 0 ? price : null,
          locationID: scheduleLocationID,
          days,
          time: formatClock(schedule.startTime),
          teacher: schedule.teacherID?.name ? String(schedule.teacherID.name).split(' ')[0] : null,
          draft: schedule.status !== 'published',
          inactive: lesson.isActive === false,
        }
      })
      .filter((row) => {
        if (!locationID) return true
        return !row.locationID || row.locationID === String(locationID)
      })
      .sort((a, b) => a.name.localeCompare(b.name) || a.time.localeCompare(b.time))
  }, [groupLessons, groupSchedules, sessions, locationID])

  const selectedGroupClass = useMemo(
    () => groupClasses.find((row) => row.scheduleID === String(selectedScheduleID)) || null,
    [groupClasses, selectedScheduleID],
  )

  const datesForClass = useMemo(() => {
    if (!selectedGroupClass) return []
    return (Array.isArray(sessions) ? sessions : []).filter(
      (session) => String(session.scheduleID) === selectedGroupClass.scheduleID && !session.cancelled,
    )
  }, [sessions, selectedGroupClass])

  const selectedSession = useMemo(
    () => datesForClass.find((s) => sessionKey(s) === String(selectedSessionID) && s.spotsLeft !== 0) || null,
    [datesForClass, selectedSessionID],
  )

  useEffect(() => {
    if (!open) return
    let cancelled = false
    setError('')
    setResult(null)
    setWarning(null)
    setSelectedContactKey('')
    setSaleKind('intro')
    setSelectedIntroID('')
    setSelectedScheduleID('')
    setSelectedSessionID('')
    setMethod('link')
    setChannel('sms')
    setDeviceID('')
    setIncludeSlot(false)
    setTeacherID('')
    setSlotDate('')
    setSelectedSlot(null)
    setLocationsById({})
    setLocationFetchFailed({})
    setSubmitting(false)

    async function load() {
      setCatalogLoading(true)
      setSessionsLoading(true)
      const from = new Date()
      const [leadsRes, customersRes, introsRes, teachersRes, locationsRes, sessionsRes, lessonsRes, schedulesRes] =
        await Promise.all([
        api.get('/api/lead?limit=200&page=1'),
        api.get('/api/customer?limit=200&page=1'),
        api.get('/api/calendar-service?type=intro&limit=200'),
        api.get('/api/teacher?limit=200&status=active'),
        api.get('/api/location?limit=50'),
        api.get(`/api/class-schedule/sessions?start=${from.toISOString()}&days=90`),
        api.get('/api/lesson?limit=500'),
        api.get('/api/class-schedule'),
      ])
      if (cancelled) return

      const options = []
      const convertedCustomerIds = new Set()

      if (leadsRes?.success && Array.isArray(leadsRes.data)) {
        for (const lead of leadsRes.data) {
          const loc = lead.locationID
          const locId = Array.isArray(loc)
            ? loc[0]?._id || loc[0] || null
            : loc?._id || loc || null
          const convertedId = lead.convertedCustomerID
            ? String(lead.convertedCustomerID?._id || lead.convertedCustomerID)
            : null
          if (convertedId) convertedCustomerIds.add(convertedId)
          options.push({
            value: convertedId ? `customer:${convertedId}` : `lead:${lead._id ?? lead.id}`,
            label: [
              nameWithMembers(lead) || 'Unnamed lead',
              lead.phoneNumber || lead.email || null,
              convertedId ? 'Customer' : 'Lead',
            ]
              .filter(Boolean)
              .join(' · '),
            kind: convertedId ? 'customer' : 'lead',
            leadID: String(lead._id ?? lead.id),
            customerID: convertedId,
            locationID: locId ? String(locId) : null,
            phoneNumber: lead.phoneNumber || null,
            email: lead.email || null,
            stage: lead.stage || null,
          })
        }
      }

      if (customersRes?.success && Array.isArray(customersRes.data)) {
        for (const cust of customersRes.data) {
          const id = String(cust._id ?? cust.id)
          if (convertedCustomerIds.has(id)) continue
          const loc = cust.locationID
          const locId = Array.isArray(loc)
            ? loc[0]?._id || loc[0] || null
            : loc?._id || loc || null
          options.push({
            value: `customer:${id}`,
            label: [cust.name || 'Unnamed customer', cust.phoneNumber || cust.email || null, 'Customer']
              .filter(Boolean)
              .join(' · '),
            kind: 'customer',
            leadID: null,
            customerID: id,
            locationID: locId ? String(locId) : null,
            phoneNumber: cust.phoneNumber || null,
            email: cust.email || null,
            stage: null,
          })
        }
      }

      options.sort((a, b) => String(a.label).localeCompare(String(b.label)))
      setContactOptions(options)

      if (introsRes?.success && Array.isArray(introsRes.data)) {
        setIntroCatalog(introsRes.data)
      } else {
        setIntroCatalog([])
      }

      if (teachersRes?.success && Array.isArray(teachersRes.data)) {
        setTeacherOptions(
          teachersRes.data.map((t) => ({
            value: String(t._id ?? t.id),
            label: t.name || t.email || String(t._id),
          })),
        )
      } else {
        setTeacherOptions([])
      }

      if (locationsRes?.success && Array.isArray(locationsRes.data)) {
        const byId = {}
        for (const loc of locationsRes.data) {
          const settings = locationSlotSettings(loc)
          if (settings) byId[String(loc._id ?? loc.id)] = settings
        }
        setLocationsById(byId)
      } else {
        setLocationsById({})
      }

      setSessions(sessionsRes?.success && Array.isArray(sessionsRes.data) ? sessionsRes.data : [])
      setGroupLessons(lessonsRes?.success && Array.isArray(lessonsRes.data) ? lessonsRes.data : [])
      setGroupSchedules(schedulesRes?.success && Array.isArray(schedulesRes.data) ? schedulesRes.data : [])
      setCatalogLoading(false)
      setSessionsLoading(false)
    }

    load()
    return () => {
      cancelled = true
    }
  }, [open])

  useEffect(() => {
    if (!selectedIntroID) return
    if (!locationIntros.some((s) => String(s._id) === String(selectedIntroID))) {
      setSelectedIntroID('')
    }
  }, [locationIntros, selectedIntroID])

  useEffect(() => {
    setWarning(null)
  }, [selectedContactKey])

  // Locations list is capped at 50 — pull the contact's studio by id when missing.
  useEffect(() => {
    if (!locationID) return
    const id = String(locationID)
    if (locationsById[id] || locationFetchFailed[id]) return
    let cancelled = false
    api
      .get(`/api/location/${id}`)
      .then((res) => {
        if (cancelled) return
        if (!res?.success || !res.data) {
          setLocationFetchFailed((prev) => (prev[id] ? prev : { ...prev, [id]: true }))
          return
        }
        const settings = locationSlotSettings(res.data)
        if (!settings) {
          setLocationFetchFailed((prev) => (prev[id] ? prev : { ...prev, [id]: true }))
          return
        }
        setLocationsById((prev) => (prev[id] ? prev : { ...prev, [id]: settings }))
      })
      .catch(() => {
        if (!cancelled) {
          setLocationFetchFailed((prev) => (prev[id] ? prev : { ...prev, [id]: true }))
        }
      })
    return () => {
      cancelled = true
    }
  }, [locationID, locationsById, locationFetchFailed])

  // A slot picked for one studio or lesson length is not valid for another.
  useEffect(() => {
    setSelectedSlot(null)
  }, [locationID, durationMins])

  useEffect(() => {
    if (dayHours.closed) setSelectedSlot(null)
  }, [dayHours.closed, slotDate])

  function handleClose() {
    setError('')
    setResult(null)
    setWarning(null)
    setSubmitting(false)
    onClose?.()
  }

  async function submitGroupSale() {
    if (!selectedContact) {
      setError('Please select a lead or customer.')
      return
    }
    if (!selectedGroupClass) {
      setError('Select a group class.')
      return
    }
    if (!selectedGroupClass.price) {
      setError('That class has no drop-in price. Set one on the class before selling it.')
      return
    }
    if (!selectedSession) {
      setError('Select a date for that class.')
      return
    }
    if (method === 'link') {
      if (channel !== 'email' && !selectedContact?.phoneNumber) {
        setError('This contact has no phone number — pick Email or add a phone first.')
        return
      }
      if (channel !== 'sms' && !selectedContact?.email) {
        setError('This contact has no email — pick SMS or add an email first.')
        return
      }
    }
    if (method === 'terminal' && !deviceID) {
      setError('Select a terminal to charge.')
      return
    }

    setError('')
    setSubmitting(true)
    setResult(null)

    const body = {
      classSessionID: sessionKey(selectedSession),
      method,
      ...(selectedContact.leadID ? { leadID: selectedContact.leadID } : {}),
      ...(selectedContact.customerID ? { customerID: selectedContact.customerID } : {}),
      ...(method === 'link' ? { channel } : {}),
      ...(method === 'terminal' ? { billing: { deviceID, ...terminalTipPayload() } } : {}),
    }

    try {
      const res = await api.post('/api/payment-request/group-class', body)
      if (!res?.success) {
        setError(res?.error || 'Failed to sell the group class.')
        setSubmitting(false)
        return
      }

      const data = res.data || {}
      setResult({
        method,
        message: res.message || 'Done',
        checkoutUrl: data.checkoutUrl || null,
        customerID: data.customerID || selectedContact.customerID || null,
        pending: Boolean(data.pending),
      })

      if (method === 'link') toast.success('Group class payment link sent.')
      else if (method === 'cash') toast.success('Group class sold — cash collected.')
      else if (method === 'card') toast.success('Checkout opened — complete payment on the card page.')
      else if (data.pending) toast.success('Charge sent to the reader — waiting for the card.')
      else toast.success('Group class sold — terminal payment collected.')

      onSuccess?.(data)
    } catch (err) {
      setError(err?.message || 'Failed to sell the group class.')
    } finally {
      setSubmitting(false)
    }
  }

  async function submitSale({ confirmOverride = false } = {}) {
    if (saleKind === 'group') {
      await submitGroupSale()
      return
    }
    if (!selectedContact) {
      setError('Please select a lead or customer.')
      return
    }
    if (!selectedIntro) {
      setError('Select an intro from Setup before selling.')
      return
    }
    const introPrice = Number(selectedIntro.price)
    const freeIntro = Number.isFinite(introPrice) && introPrice === 0
    if (!freeIntro && (!(introPrice > 0) || selectedIntro.isChargeable === false)) {
      setError('That intro is not chargeable. Fix the price in Settings → Setup → Intro.')
      return
    }
    if (!freeIntro && method === 'link') {
      if (channel !== 'email' && !selectedContact?.phoneNumber) {
        setError('This contact has no phone number — pick Email or add a phone first.')
        return
      }
      if (channel !== 'sms' && !selectedContact?.email) {
        setError('This contact has no email — pick SMS or add an email first.')
        return
      }
    }
    if (!freeIntro && method === 'terminal' && !deviceID) {
      setError('Select a terminal to charge.')
      return
    }

    let slotPayload
    if (includeSlot) {
      if (hoursLoading) {
        setError('Studio hours are still loading. Wait a moment, then pick a slot.')
        return
      }
      if (dayHours.closed) {
        setError('The studio is closed that day. Pick another date, or turn off “Hold a slot”.')
        return
      }
      if (!teacherID || !slotDate || !selectedSlot) {
        setError('Pick a teacher, date, and time slot, or turn off “Hold a slot”.')
        return
      }
      const range = slotWallTimesToUtcRange(slotDate, selectedSlot, slotTz)
      if (!range) {
        setError('Could not resolve the selected slot time.')
        return
      }
      slotPayload = {
        startDateTime: range.startDateTime,
        endDateTime: range.endDateTime,
        calendarServiceID: selectedIntro._id,
        serviceType: selectedIntro.serviceName,
        teacherID,
      }
    }

    setError('')
    setSubmitting(true)
    setResult(null)

    const body = {
      calendarServiceID: selectedIntro._id,
      amount: introPrice,
      description: selectedIntro.serviceName,
      // Complimentary intros skip payment collection — backend ignores method.
      method: freeIntro ? 'cash' : method,
      confirmOverride: confirmOverride || undefined,
      ...(selectedContact.leadID ? { leadID: selectedContact.leadID } : {}),
      ...(selectedContact.customerID ? { customerID: selectedContact.customerID } : {}),
      ...(!freeIntro && method === 'link' ? { channel } : {}),
      ...(!freeIntro && method === 'terminal'
        ? { billing: { deviceID, ...terminalTipPayload() } }
        : {}),
      ...(slotPayload ? { slot: slotPayload } : {}),
    }

    try {
      const res = await api.post('/api/payment-request/lead', body)
      if (!res?.success) {
        const flags = res?.errorData
        // Only the prior-intro / active-package warning is confirmable. A 409 for
        // a busy teacher must stay an error — confirming would resubmit the same slot.
        if (
          flags?.needsConfirm ||
          /already has an intro|active package/i.test(String(res?.error || ''))
        ) {
          setWarning({
            alreadyTookIntro: Boolean(flags?.alreadyTookIntro),
            isActiveCustomer: Boolean(flags?.isActiveCustomer),
            message: res?.error || 'Confirm to sell another intro.',
          })
          setSubmitting(false)
          return
        }
        setError(res?.error || 'Failed to sell the intro.')
        setSubmitting(false)
        return
      }

      const data = res.data || {}
      setWarning(null)
      setResult({
        method: freeIntro ? 'free' : method,
        message: res.message || 'Done',
        checkoutUrl: data.checkoutUrl || null,
        customerID: data.customerID || selectedContact.customerID || null,
        pending: Boolean(data.pending),
      })

      if (freeIntro) toast.success('Complimentary intro booked.')
      else if (method === 'link') toast.success('Payment link sent.')
      else if (method === 'cash') toast.success('Trial sold — cash collected.')
      else if (method === 'card') toast.success('Checkout opened — complete payment on the card page.')
      else if (data.pending) toast.success('Charge sent to the reader — waiting for the card.')
      else toast.success('Trial sold — terminal payment collected.')

      onSuccess?.(data)
    } catch (err) {
      setError(err?.message || 'Failed to sell the intro.')
    } finally {
      setSubmitting(false)
    }
  }

  async function handleSubmit() {
    await submitSale({ confirmOverride: false })
  }

  async function handleConfirmOverride() {
    await submitSale({ confirmOverride: true })
  }

  return (
    <Sheet open={open} onClose={handleClose} width={SHEET_WIDTH}>
      <SheetContent onClose={handleClose} className="flex flex-col overflow-hidden p-0">
        <div className="shrink-0 border-b border-border bg-muted/30 px-5 pt-5 pb-3">
          <p className="text-[14px] font-bold text-foreground">Sell intro or group</p>
          <p className="text-[12px] text-muted-foreground mt-1">
            Sell a Setup intro or one group-class drop-in — share a payment link or collect cash, card,
            or terminal in person.
          </p>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4">
          {result ? (
            <div className="rounded-xl border border-success/30 bg-success/5 p-4 space-y-3">
              <p className="text-[13px] font-semibold text-foreground">{result.message}</p>
              {result.checkoutUrl && (
                <a
                  href={result.checkoutUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-[12px] font-medium text-[var(--studio-primary)] hover:underline"
                >
                  <Link2 className="h-3.5 w-3.5" />
                  Open checkout page
                  <ExternalLink className="h-3 w-3" />
                </a>
              )}
              {result.customerID && (
                <Link
                  href={`/settings/users-roles/customers/${result.customerID}`}
                  className="block text-[12px] font-medium text-[var(--studio-primary)] hover:underline"
                  onClick={handleClose}
                >
                  View customer profile →
                </Link>
              )}
              {result.pending && (
                <p className="text-[12px] text-muted-foreground">
                  Waiting for the customer to tap their card on the reader. They will convert once
                  payment clears.
                </p>
              )}
              <div className="pt-1">
                <Button type="button" size="sm" variant="outline" onClick={handleClose}>
                  Done
                </Button>
              </div>
            </div>
          ) : (
            <>
              {warning && (
                <div className="rounded-xl border border-warning/40 bg-warning/10 p-3 space-y-2">
                  <p className="text-[13px] font-semibold text-foreground">Confirm before selling</p>
                  <ul className="list-disc pl-4 space-y-1 text-[12px] text-muted-foreground">
                    {warning.alreadyTookIntro && (
                      <li>This customer already took an intro. Sell another one anyway?</li>
                    )}
                    {warning.isActiveCustomer && (
                      <li>This customer already has an active package. Sell an intro anyway?</li>
                    )}
                    {!warning.alreadyTookIntro && !warning.isActiveCustomer && (
                      <li>{warning.message}</li>
                    )}
                  </ul>
                  <div className="flex flex-wrap gap-2 pt-1">
                    <Button
                      type="button"
                      size="sm"
                      onClick={handleConfirmOverride}
                      disabled={submitting}
                    >
                      {submitting ? 'Selling…' : 'Yes, sell another intro'}
                    </Button>
                    <Button
                      type="button"
                      size="sm"
                      variant="outline"
                      onClick={() => setWarning(null)}
                      disabled={submitting}
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              )}

              <div className="rounded-xl border border-border bg-card p-3">
                <p className="text-[11px] font-medium text-muted-foreground mb-1">
                  Lead or customer
                </p>
                <SearchableSelect
                  value={selectedContactKey}
                  onChange={setSelectedContactKey}
                  options={contactOptions}
                  placeholder="Search lead or customer…"
                />
                {selectedContact?.stage && (
                  <p className="mt-1.5 text-[11px] text-muted-foreground">
                    Current stage:{' '}
                    <span className="font-medium text-foreground">{selectedContact.stage}</span>
                  </p>
                )}
              </div>

              <div className="rounded-xl border border-border bg-card p-3 space-y-2">
                <div className="flex items-center justify-between gap-2">
                  <p className="text-[11px] font-medium text-muted-foreground">What to sell</p>
                  <div className="inline-flex rounded-lg border border-border bg-background p-0.5">
                    {[
                      { value: 'intro', label: 'Intro' },
                      { value: 'group', label: 'Group class' },
                    ].map((option) => (
                      <button
                        key={option.value}
                        type="button"
                        onClick={() => {
                          setSaleKind(option.value)
                          setError('')
                          setWarning(null)
                        }}
                        className={[
                          'h-7 px-2.5 rounded-md text-[11px] font-medium transition-colors',
                          saleKind === option.value
                            ? 'bg-brand text-brand-foreground'
                            : 'text-muted-foreground hover:text-foreground',
                        ].join(' ')}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                </div>
                {saleKind === 'group' ? (
                  sessionsLoading ? (
                    <p className="text-[11px] text-muted-foreground flex items-center gap-1.5">
                      <Loader2 className="h-3 w-3 animate-spin" />
                      Loading classes…
                    </p>
                  ) : groupClasses.length === 0 ? (
                    <p className="text-[11px] text-muted-foreground">
                      No group classes
                      {locationID ? ' for this location' : ''}. Create one in Group classes first.
                    </p>
                  ) : (
                    <>
                    <div className="space-y-1.5 max-h-64 overflow-y-auto">
                      {groupClasses.map((groupClass) => {
                        const isSelected = groupClass.scheduleID === String(selectedScheduleID)
                        const detail = [groupClass.days, groupClass.time, groupClass.teacher && `with ${groupClass.teacher}`]
                          .filter(Boolean)
                          .join(' · ')
                        return (
                          <button
                            key={groupClass.scheduleID}
                            type="button"
                            disabled={groupClass.inactive || !groupClass.price}
                            onClick={() => {
                              setSelectedScheduleID(groupClass.scheduleID)
                              setSelectedSessionID('')
                              setError('')
                            }}
                            className={[
                              'flex w-full items-center justify-between rounded-lg border px-2.5 py-2 text-left transition-colors',
                              groupClass.inactive || !groupClass.price ? 'cursor-not-allowed opacity-60' : '',
                              isSelected
                                ? 'border-brand bg-brand/10'
                                : 'border-border bg-background hover:bg-muted/40',
                            ].join(' ')}
                          >
                            <div className="flex items-center gap-2 min-w-0">
                              <span
                                className="h-2.5 w-2.5 rounded-full shrink-0"
                                style={{ background: groupClass.color || 'var(--studio-primary)' }}
                              />
                              <span className="min-w-0">
                                <span className="block truncate text-[12px] font-medium">
                                  {groupClass.name}
                                  {groupClass.inactive ? ' · Inactive' : groupClass.draft ? ' · Draft' : ''}
                                </span>
                                {detail && (
                                  <span className="block truncate text-[11px] text-muted-foreground">
                                    {detail}
                                  </span>
                                )}
                              </span>
                            </div>
                            <span className="text-[12px] font-semibold shrink-0 ml-2">
                              {groupClass.price ? `$${money(groupClass.price)}` : 'No price'}
                            </span>
                          </button>
                        )
                      })}
                    </div>
                    {selectedGroupClass && (
                      <div className="space-y-1.5 border-t border-border pt-2">
                        <p className="text-[11px] font-medium text-muted-foreground">
                          Date for {selectedGroupClass.name}
                        </p>
                        {datesForClass.length === 0 ? (
                          <p className="text-[11px] text-muted-foreground">
                            No upcoming date in the next 90 days.
                          </p>
                        ) : (
                          <div className="max-h-48 space-y-1.5 overflow-y-auto">
                          {datesForClass.map((session) => {
                            const id = sessionKey(session)
                            const full = session.spotsLeft === 0
                            const isSelected = !full && id === String(selectedSessionID)
                            const spots =
                              session.spotsLeft == null
                                ? 'Open'
                                : full
                                  ? 'Full'
                                  : `${session.spotsLeft} spot${session.spotsLeft === 1 ? '' : 's'} left`
                            return (
                              <button
                                key={id}
                                type="button"
                                disabled={full}
                                onClick={() => setSelectedSessionID(id)}
                                className={[
                                  'flex w-full items-center justify-between rounded-lg border px-2.5 py-2 text-left transition-colors',
                                  full ? 'cursor-not-allowed opacity-50' : '',
                                  isSelected
                                    ? 'border-brand bg-brand/10'
                                    : 'border-border bg-background hover:bg-muted/40',
                                ].join(' ')}
                              >
                                <span className="min-w-0 truncate text-[12px] font-medium">
                                  {formatSessionDate(session)}
                                </span>
                                <span className="shrink-0 ml-2 text-[11px] text-muted-foreground">
                                  {spots}
                                </span>
                              </button>
                            )
                          })}
                          </div>
                        )}
                      </div>
                    )}
                  </>
                  )
                ) : catalogLoading ? (
                  <p className="text-[11px] text-muted-foreground flex items-center gap-1.5">
                    <Loader2 className="h-3 w-3 animate-spin" />
                    Loading intros…
                  </p>
                ) : locationIntros.length === 0 ? (
                  <p className="text-[11px] text-muted-foreground">
                    No chargeable intros for this location. Create one in{' '}
                    <Link
                      href="/settings/setup"
                      className="font-medium text-[var(--studio-primary)] hover:underline"
                    >
                      Settings → Setup → Services → Intro
                    </Link>{' '}
                    first.
                  </p>
                ) : (
                  <div className="space-y-1.5">
                    {locationIntros.map((intro) => {
                      const isSelected = String(intro._id) === String(selectedIntroID)
                      return (
                        <button
                          key={intro._id}
                          type="button"
                          onClick={() => setSelectedIntroID(String(intro._id))}
                          className={[
                            'flex w-full items-center justify-between rounded-lg border px-2.5 py-2 text-left transition-colors',
                            isSelected
                              ? 'border-brand bg-brand/10'
                              : 'border-border bg-background hover:bg-muted/40',
                          ].join(' ')}
                        >
                          <div className="flex items-center gap-2 min-w-0">
                            {intro.color && (
                              <span
                                className="h-2.5 w-2.5 rounded-full shrink-0"
                                style={{ background: intro.color }}
                              />
                            )}
                            <span className="text-[12px] font-medium truncate">
                              {intro.serviceName}
                            </span>
                          </div>
                          <span className="text-[12px] font-semibold shrink-0 ml-2">
                            {Number(intro.price) === 0
                              ? 'Free'
                              : `$${Number(intro.price).toFixed(2)}`}
                          </span>
                        </button>
                      )
                    })}
                  </div>
                )}
                {saleKind === 'intro' && selectedIntro && (
                  <p className="text-[11px] text-muted-foreground">
                    Price locked from Setup — staff cannot override.
                  </p>
                )}
              </div>

              <div className="rounded-xl border border-border bg-card p-3 space-y-3">
                <p className="text-[11px] font-medium text-muted-foreground">Payment</p>
                {isFreeIntro ? (
                  <p className="text-[12px] text-muted-foreground">
                    Complimentary intro — no payment to collect. Booking converts the lead the same
                    way a paid sale does.
                  </p>
                ) : (
                  <>
                    <PaymentMethodPicker
                      methods={INTRO_PAYMENT_METHODS}
                      value={method}
                      onChange={(v) => {
                        setMethod(v)
                        setDeviceID('')
                      }}
                    />

                    {method === 'link' && (
                      <div>
                        <p className="text-[11px] font-medium text-muted-foreground mb-1.5">
                          Send via
                        </p>
                        <div className="inline-flex rounded-lg border border-border bg-background p-0.5">
                          {LINK_CHANNELS.map((c) => (
                            <button
                              key={c.value}
                              type="button"
                              onClick={() => setChannel(c.value)}
                              className={[
                                'h-8 px-3 rounded-md text-[12px] font-medium transition-colors',
                                channel === c.value
                                  ? 'bg-brand text-brand-foreground'
                                  : 'text-muted-foreground hover:text-foreground',
                              ].join(' ')}
                            >
                              {c.label}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    {method === 'terminal' && (
                      <TerminalDeviceField
                        method="terminal"
                        locationID={locationID}
                        deviceID={deviceID}
                        onDeviceChange={setDeviceID}
                      />
                    )}

                    {method === 'card' && (
                      <p className="text-[11px] text-muted-foreground">
                        Opens a hosted checkout page you can show the lead (or share) while
                        they&apos;re here.
                      </p>
                    )}
                  </>
                )}
              </div>

              {saleKind === 'intro' && (
              <div className="rounded-xl border border-border bg-card p-3 space-y-3">
                <label className="flex items-center gap-2 text-[12px] font-medium text-foreground">
                  <input
                    type="checkbox"
                    checked={includeSlot}
                    onChange={(e) => {
                      setIncludeSlot(e.target.checked)
                      if (!e.target.checked) {
                        setSelectedSlot(null)
                        setTeacherID('')
                        setSlotDate('')
                      }
                    }}
                  />
                  Hold a time slot (optional)
                </label>
                {includeSlot && (
                  <>
                    {!locationID ? (
                      <p className="text-[11px] text-muted-foreground">
                        This lead has no location — assign one before holding a slot.
                      </p>
                    ) : !selectedIntro ? (
                      <p className="text-[11px] text-muted-foreground">
                        Select an intro above before picking a slot.
                      </p>
                    ) : (
                      <LessonSlotPicker
                        teacherOptions={teacherOptions}
                        teacherID={teacherID}
                        onTeacherChange={setTeacherID}
                        date={slotDate}
                        onDateChange={setSlotDate}
                        selectedSlot={selectedSlot}
                        onSlotChange={setSelectedSlot}
                        durationMins={durationMins}
                        slotStepMins={durationMins}
                        slotAlignMins={dayHours.openMin ?? undefined}
                        dayEndMin={dayHours.closeMin ?? undefined}
                        dayClosed={dayHours.closed}
                        hoursLoading={hoursLoading}
                        studioTz={slotTz}
                      />
                    )}
                  </>
                )}
              </div>
              )}

              {error && (
                <div className="rounded-lg bg-destructive/10 border border-destructive/20 px-3 py-2 text-[12px] text-destructive">
                  {error}
                </div>
              )}
            </>
          )}
        </div>

        {!result && (
          <div className="shrink-0 border-t border-border px-5 py-3 flex items-center justify-end gap-2">
            <Button type="button" variant="outline" size="sm" onClick={handleClose} disabled={submitting}>
              Cancel
            </Button>
            <Button type="button" size="sm" onClick={handleSubmit} disabled={submitting}>
              {submitting ? (
                <>
                  <Loader2 className="h-3.5 w-3.5 animate-spin mr-1.5" />
                  Working…
                </>
              ) : isFreeIntro ? (
                'Book free intro'
              ) : method === 'link' ? (
                'Send payment link'
              ) : method === 'cash' ? (
                'Collect cash'
              ) : method === 'card' ? (
                'Open card checkout'
              ) : (
                'Charge terminal'
              )}
            </Button>
          </div>
        )}
      </SheetContent>
    </Sheet>
  )
}
