'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { ArrowLeft, Plus, Trash2, Save, ChevronDown, CalendarDays } from 'lucide-react'
import MainLayout from '@/components/layout/MainLayout'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import api from '@/lib/api'
import { toast } from '@/components/ui/toast'
import GlobalLoader from '@/components/shared/GlobalLoader'
import LocationSelector from '@/components/shared/LocationSelector'
import { cn } from '@/lib/utils'
import { formatStudioTime, formatStudioDate } from '@/lib/studioLocalDate'

const EVENT_STATUS_COLORS = {
  scheduled:           'bg-blue-500/10 text-blue-600',
  completed:           'bg-emerald-500/10 text-emerald-600',
  cancelled_no_charge: 'bg-muted text-muted-foreground',
  cancelled_charged:   'bg-red-500/10 text-red-600',
  no_show_no_charge:   'bg-muted text-muted-foreground',
  no_show_charged:     'bg-red-500/10 text-red-600',
}

// Lesson times read in the studio's timezone, not the viewer's.
function formatEventDate(iso) {
  return formatStudioDate(iso, null, { weekday: undefined, year: 'numeric' })
}
function formatEventTime(iso) {
  return iso ? formatStudioTime(iso) : ''
}

function ServiceNamePicker({ value, onChange, onSelect, calendarServices }) {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState(value || '')
  const [dropdownStyle, setDropdownStyle] = useState({})
  const inputRef = useRef(null)
  const wrapperRef = useRef(null)
  const dropdownRef = useRef(null)

  useEffect(() => { setQuery(value || '') }, [value])

  useEffect(() => {
    function close(e) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) setOpen(false)
    }
    function onScroll(e) {
      if (dropdownRef.current && dropdownRef.current.contains(e.target)) return
      setOpen(false)
    }
    document.addEventListener('mousedown', close)
    window.addEventListener('scroll', onScroll, true)
    return () => {
      document.removeEventListener('mousedown', close)
      window.removeEventListener('scroll', onScroll, true)
    }
  }, [])

  function openDropdown() {
    if (inputRef.current) {
      const rect = inputRef.current.getBoundingClientRect()
      setDropdownStyle({ position: 'fixed', top: rect.bottom + 4, left: rect.left, width: Math.max(rect.width, 260), zIndex: 9999 })
    }
    setOpen(true)
  }

  const filtered = query.trim()
    ? calendarServices.filter((s) => s.serviceName.toLowerCase().includes(query.toLowerCase()))
    : calendarServices

  return (
    <div ref={wrapperRef} className="relative w-full">
      <Input
        ref={inputRef}
        placeholder="Service name"
        value={query}
        onChange={(e) => { setQuery(e.target.value); onChange(e.target.value); openDropdown() }}
        onFocus={openDropdown}
        className="h-8 text-sm w-full"
      />
      {open && filtered.length > 0 && (
        <div
          ref={dropdownRef}
          style={dropdownStyle}
          className="max-h-52 overflow-y-auto rounded-lg border border-border bg-popover shadow-lg"
        >
          {filtered.map((s) => (
            <button
              key={s._id}
              type="button"
              onMouseDown={(e) => {
                e.preventDefault()
                onSelect(s)
                setQuery(s.serviceName)
                setOpen(false)
              }}
              className="w-full text-left px-3 py-2 text-sm hover:bg-muted/60 flex items-center gap-2"
            >
              <span
                className="h-6 w-6 rounded-full shrink-0 flex items-center justify-center text-[10px] font-bold text-white"
                style={{ backgroundColor: s.color || '#6366f1' }}
              >
                {s.serviceName.charAt(0).toUpperCase()}
              </span>
              <span className="text-foreground truncate flex-1">{s.serviceName}</span>
              <span className="font-mono text-xs bg-muted px-1.5 py-0.5 rounded border border-border shrink-0 text-muted-foreground">
                {s.serviceCode}
              </span>
              {s.price != null && (
                <span className="text-xs text-muted-foreground shrink-0">${Number(s.price).toFixed(2)}</span>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

function ServiceCodePicker({ value, onChange, onSelect, calendarServices }) {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState(value || '')
  const [dropdownStyle, setDropdownStyle] = useState({})
  const inputRef = useRef(null)
  const wrapperRef = useRef(null)

  useEffect(() => { setQuery(value || '') }, [value])

  const dropdownRef = useRef(null)

  useEffect(() => {
    function close(e) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) setOpen(false)
    }
    function onScroll(e) {
      if (dropdownRef.current && dropdownRef.current.contains(e.target)) return
      setOpen(false)
    }
    document.addEventListener('mousedown', close)
    window.addEventListener('scroll', onScroll, true)
    return () => {
      document.removeEventListener('mousedown', close)
      window.removeEventListener('scroll', onScroll, true)
    }
  }, [])

  function openDropdown() {
    if (inputRef.current) {
      const rect = inputRef.current.getBoundingClientRect()
      setDropdownStyle({ position: 'fixed', top: rect.bottom + 4, left: rect.left, width: 240, zIndex: 9999 })
    }
    setOpen(true)
  }

  const filtered = calendarServices.filter(
    (s) =>
      s.serviceCode.toLowerCase().includes(query.toLowerCase()) ||
      s.serviceName.toLowerCase().includes(query.toLowerCase()),
  )

  return (
    <div ref={wrapperRef} className="relative w-full">
      <div className="relative">
        <Input
          ref={inputRef}
          placeholder="Code"
          value={query}
          onChange={(e) => { setQuery(e.target.value); onChange(e.target.value); openDropdown() }}
          onFocus={openDropdown}
          className="h-8 text-sm pr-6"
        />
        <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground pointer-events-none" />
      </div>
      {open && filtered.length > 0 && (
        <div
          ref={dropdownRef}
          style={dropdownStyle}
          className="max-h-52 overflow-y-auto rounded-lg border border-border bg-popover shadow-lg"
        >
          {filtered.map((s) => (
            <button
              key={s._id}
              type="button"
              onMouseDown={(e) => {
                e.preventDefault()
                onSelect(s)
                setQuery(s.serviceCode)
                setOpen(false)
              }}
              className="w-full text-left px-3 py-2 text-sm hover:bg-muted/60 flex items-center gap-2"
            >
              <span className="font-mono text-xs bg-muted px-1.5 py-0.5 rounded border border-border shrink-0">
                {s.serviceCode}
              </span>
              <span className="text-foreground truncate">{s.serviceName}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

function randomColor() {
  return `#${Math.floor(Math.random() * 0xffffff).toString(16).padStart(6, '0')}`
}

const DISCOUNT_TYPES = [
  { value: 'none', label: 'None' },
  { value: 'percentage', label: 'Percentage (%)' },
  { value: 'fixed', label: 'Fixed ($)' },
]

function emptyService() {
  return {
    _id: `new-${Date.now()}-${Math.random()}`,
    serviceName: '',
    serviceCode: '',
    serviceDetails: '',
    color: '',
    numberOfSessions: '',
    pricePerSession: '',
    total: 0,
    discountType: 'none',
    discountAmount: '',
    finalAmount: 0,
  }
}

function computeAmounts(svc, isChargeable = true) {
  if (isChargeable === false) return { total: 0, finalAmount: 0 }
  const sessions = Number(svc.numberOfSessions) || 0
  const price = Number(svc.pricePerSession) || 0
  const total = sessions * price
  const discount = Number(svc.discountAmount) || 0
  let finalAmount = total
  if (svc.discountType === 'percentage') finalAmount = total - (total * discount) / 100
  else if (svc.discountType === 'fixed') finalAmount = total - discount
  return { total, finalAmount: Math.max(0, finalAmount) }
}

function fmt(n) {
  return typeof n === 'number' ? n.toFixed(2) : '0.00'
}

export default function PackageEditPage() {
  const { id } = useParams()
  const router = useRouter()
  const isNew = id === 'new'

  const [activeTab, setActiveTab] = useState('details')
  const [loading, setLoading] = useState(!isNew)
  const [saving, setSaving] = useState(false)
  const [calendarServices, setCalendarServices] = useState([])
  // A package line is chargeable only if its catalog service is. Non-chargeable
  // lines contribute nothing to package totals.
  const svcChargeable = (s) =>
    calendarServices.find((c) => c.serviceCode === s.serviceCode)?.isChargeable ?? true

  // Events tab state
  const [events, setEvents]           = useState([])
  const [eventsLoading, setEventsLoading] = useState(false)
  const [eventsTotal, setEventsTotal]  = useState(0)
  const [eventsPage, setEventsPage]    = useState(1)
  const [dateStart, setDateStart]      = useState('')
  const [dateEnd,   setDateEnd]        = useState('')

  const loadEvents = useCallback(async (page = 1) => {
    if (isNew) return
    setEventsLoading(true)
    const params = new URLSearchParams({ page: String(page), limit: '50' })
    if (dateStart) params.set('start', new Date(dateStart).toISOString())
    if (dateEnd)   params.set('end',   new Date(dateEnd + 'T23:59:59').toISOString())
    const r = await api.get(`/api/calendar/package/${id}?${params}`)
    if (r.success) {
      setEvents(Array.isArray(r.data) ? r.data : [])
      setEventsTotal(r.pagination?.total ?? 0)
      setEventsPage(page)
    }
    setEventsLoading(false)
  }, [id, isNew, dateStart, dateEnd])

  useEffect(() => { if (activeTab === 'events') loadEvents(1) }, [activeTab, loadEvents])

  useEffect(() => {
    api.get('/api/calendar-service?limit=200').then((res) => {
      if (res.success) setCalendarServices(Array.isArray(res.data) ? res.data : [])
    })
  }, [])

  const [curriculums, setCurriculums] = useState([])
  useEffect(() => {
    api.get('/api/curriculum').then((res) => {
      if (res.success) setCurriculums(Array.isArray(res.data) ? res.data : [])
    })
  }, [])

  const [packageName, setPackageName] = useState('')
  const [locationID, setLocationID] = useState([])
  const [curriculumID, setCurriculumID] = useState('')
  const [description, setDescription] = useState('')
  const [sortOrder, setSortOrder] = useState('')
  const [color, setColor] = useState(() => randomColor())
  const [totalDays, setTotalDays] = useState('')
  const [isActive, setIsActive] = useState(true)
  const [services, setServices] = useState([emptyService()])

  const loadPackage = useCallback(async () => {
    setLoading(true)
    try {
      const result = await api.get(`/api/package/${id}`)
      if (result.success) {
        const pkg = result.data
        setPackageName(pkg.packageName || '')
        setLocationID(
          Array.isArray(pkg.locationID)
            ? pkg.locationID.map((l) => l?._id ?? l).filter(Boolean)
            : pkg.locationID?._id
              ? [pkg.locationID._id]
              : pkg.locationID
                ? [pkg.locationID]
                : []
        )
        setCurriculumID(pkg.curriculumID?._id || pkg.curriculumID || '')
        setDescription(pkg.description || '')
        setSortOrder(pkg.sortOrder ?? '')
        setColor(pkg.color || randomColor())
        setTotalDays(pkg.totalDays ?? '')
        setIsActive(pkg.isActive !== false)
        setServices(
          pkg.services?.length > 0
            ? pkg.services.map((s) => ({ ...s, _id: s._id || `svc-${Math.random()}` }))
            : [emptyService()]
        )
      } else {
        toast.error('Failed to load package', { description: result.error })
        router.push('/settings/setup?tab=packages')
      }
    } catch {
      toast.error('Error', { description: 'Unable to load package' })
      router.push('/settings/setup?tab=packages')
    } finally {
      setLoading(false)
    }
  }, [id, router])

  useEffect(() => {
    if (!isNew) loadPackage()
  }, [isNew, loadPackage])

  function selectServiceFromCatalog(index, catalogService) {
    setServices((prev) => {
      const next = [...prev]
      next[index] = {
        ...next[index],
        serviceName: catalogService.serviceName,
        serviceCode: catalogService.serviceCode,
        serviceDetails: catalogService.description || '',
        pricePerSession: catalogService.price ?? next[index].pricePerSession,
        color: catalogService.color || next[index].color || '',
      }
      return next
    })
  }

  function updateService(index, field, value) {
    setServices((prev) => {
      const next = [...prev]
      next[index] = { ...next[index], [field]: value }
      return next
    })
  }

  function addService() {
    setServices((prev) => [...prev, emptyService()])
  }

  function removeService(index) {
    setServices((prev) => prev.filter((_, i) => i !== index))
  }

  async function handleSave() {
    if (!packageName.trim()) {
      toast.error('Package name is required')
      return
    }
    if (!locationID?.length) {
      toast.error('Please select at least one location')
      return
    }

    const cleanedServices = services
      .filter((s) => s.serviceName.trim())
      .map((s) => {
        const { total, finalAmount } = computeAmounts(s, svcChargeable(s))
        return {
          ...(String(s._id).startsWith('new-') || String(s._id).startsWith('svc-') ? {} : { _id: s._id }),
          serviceName: s.serviceName.trim(),
          serviceCode: s.serviceCode?.trim() || '',
          serviceDetails: s.serviceDetails?.trim() || '',
          color: s.color || undefined,
          numberOfSessions: Number(s.numberOfSessions) || 0,
          pricePerSession: Number(s.pricePerSession) || 0,
          total,
          discountType: s.discountType || 'none',
          discountAmount: Number(s.discountAmount) || 0,
          finalAmount,
        }
      })

    const payload = {
      packageName: packageName.trim(),
      locationID: locationID || undefined,
      curriculumID: curriculumID || null,
      // '' (not undefined) so clearing the field is actually saved — undefined is dropped from the JSON and the old text survives.
      description: description.trim(),
      sortOrder: sortOrder === '' ? 0 : Number(sortOrder),
      color,
      totalDays: totalDays === '' ? 0 : Number(totalDays),
      isActive,
      services: cleanedServices,
    }

    setSaving(true)
    try {
      const result = isNew
        ? await api.post('/api/package', payload)
        : await api.put(`/api/package/${id}`, payload)

      if (result.success) {
        toast.success(isNew ? 'Package created' : 'Package saved')
        router.push('/settings/setup?tab=packages')
      } else {
        toast.error('Failed to save', { description: result.error })
      }
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <MainLayout title="Package" subtitle="">
        <div className="flex items-center justify-center h-[calc(100vh-8rem)]">
          <GlobalLoader variant="center" size="md" text="Loading package…" />
        </div>
      </MainLayout>
    )
  }

  return (
    <MainLayout title={isNew ? 'New Package' : 'Edit Package'} subtitle="">
      <div className="w-full pb-12">

        {/* Top bar */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => router.push('/settings/setup?tab=packages')}
              className="h-9 w-9 rounded-lg border border-border bg-background flex items-center justify-center hover:bg-muted/50 text-muted-foreground"
            >
              <ArrowLeft className="h-4 w-4" />
            </button>
            <div>
              <h1 className="text-xl font-semibold text-foreground">
                {isNew ? 'New Package' : packageName || 'Edit Package'}
              </h1>
              <p className="text-sm text-muted-foreground">
                {isNew ? 'Fill in the details below' : 'Update package details and services'}
              </p>
            </div>
          </div>
        </div>

        {/* Tabs (only for existing packages) */}
        {!isNew && (
          <div className="flex gap-1 rounded-full bg-muted p-1 w-fit mb-4">
            {[{ id: 'details', label: 'Details' }, { id: 'events', label: 'Events' }].map((t) => (
              <button
                key={t.id}
                type="button"
                onClick={() => setActiveTab(t.id)}
                className={cn(
                  'h-8 px-4 rounded-full text-sm transition-all',
                  activeTab === t.id
                    ? 'bg-background text-[var(--studio-primary)] shadow-sm font-semibold'
                    : 'text-muted-foreground hover:text-foreground'
                )}
              >
                {t.label}
              </button>
            ))}
          </div>
        )}

        {/* ── Details tab ── */}
        {(isNew || activeTab === 'details') && <>

        {/* Package details card */}
        <div className="rounded-xl border border-border bg-card p-6 mb-6">
          <h2 className="text-sm font-semibold text-foreground mb-4">Package Details</h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="pkg-name">Package Name *</Label>
              <Input
                id="pkg-name"
                placeholder="e.g. Beginner Bundle"
                value={packageName}
                onChange={(e) => setPackageName(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label>Location</Label>
              <LocationSelector value={locationID} onChange={setLocationID} multiple={true} showAllOption={false} />
            </div>
          </div>
          <div className="flex flex-col gap-1.5 mt-4">
            <Label htmlFor="pkg-desc">Description</Label>
            <Textarea
              id="pkg-desc"
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
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-semibold text-foreground">
              Services
              <span className="ml-2 inline-flex items-center rounded-full px-2 py-0.5 text-xs font-normal bg-muted text-muted-foreground">
                {services.length}
              </span>
            </h2>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={addService}
              className="h-8 px-3 text-xs gap-1.5"
            >
              <Plus className="h-3.5 w-3.5" />
              Add Service
            </Button>
          </div>

          {(() => {
            const chargeableInPkg = services.filter((s) => {
              const cs = calendarServices.find((c) => c.serviceCode === s.serviceCode);
              return cs?.isChargeable === true;
            });
            return chargeableInPkg.length > 1 ? (
              <div className="mb-4 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-[12px] text-amber-800">
                <span className="font-semibold">Pay Per Session unavailable:</span> This package has {chargeableInPkg.length} chargeable services ({chargeableInPkg.map((s) => s.serviceCode).join(", ")}). Only one chargeable service is allowed per package for Pay Per Session billing.
              </div>
            ) : null;
          })()}

          {services.length === 0 ? (
            <div className="py-8 text-center text-sm text-muted-foreground border border-dashed border-border rounded-lg">
              No services yet. Click "Add Service" to get started.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="border-b border-border bg-muted/30">
                    <th className="py-2.5 px-3 text-left text-xs font-medium text-muted-foreground whitespace-nowrap">Service Name *</th>
                    <th className="py-2.5 px-3 text-left text-xs font-medium text-muted-foreground whitespace-nowrap">Code</th>
                    <th className="py-2.5 px-3 text-left text-xs font-medium text-muted-foreground whitespace-nowrap">Color</th>
                    <th className="py-2.5 px-3 text-left text-xs font-medium text-muted-foreground whitespace-nowrap">Details</th>
                    <th className="py-2.5 px-3 text-left text-xs font-medium text-muted-foreground whitespace-nowrap">Sessions</th>
                    <th className="py-2.5 px-3 text-left text-xs font-medium text-muted-foreground whitespace-nowrap">Price/Session</th>
                    <th className="py-2.5 px-3 text-left text-xs font-medium text-muted-foreground whitespace-nowrap">Total</th>
                    <th className="py-2.5 px-3 text-left text-xs font-medium text-muted-foreground whitespace-nowrap">Discount</th>
                    <th className="py-2.5 px-3 text-left text-xs font-medium text-muted-foreground whitespace-nowrap">Disc. Amt</th>
                    <th className="py-2.5 px-3 text-left text-xs font-medium text-muted-foreground whitespace-nowrap">Final Amt</th>
                    <th className="py-2.5 px-3 text-left text-xs font-medium text-muted-foreground whitespace-nowrap w-10" />
                  </tr>
                </thead>
                <tbody>
                  {services.map((svc, idx) => {
                    const catalogSvcMatch = calendarServices.find((c) => c.serviceCode === svc.serviceCode)
                    const isChargeable = catalogSvcMatch?.isChargeable ?? true
                    const { total, finalAmount } = computeAmounts(svc, isChargeable)
                    return (
                      <tr key={svc._id} className="border-b border-border/60 hover:bg-muted/20">
                        <td className="py-2 px-3">
                          <ServiceNamePicker
                            value={svc.serviceName}
                            onChange={(val) => updateService(idx, 'serviceName', val)}
                            onSelect={(catalogSvc) => selectServiceFromCatalog(idx, catalogSvc)}
                            calendarServices={calendarServices}
                          />
                        </td>
                        <td className="py-2 px-3">
                          <ServiceCodePicker
                            value={svc.serviceCode}
                            onChange={(val) => updateService(idx, 'serviceCode', val)}
                            onSelect={(catalogSvc) => selectServiceFromCatalog(idx, catalogSvc)}
                            calendarServices={calendarServices}
                          />
                        </td>
                        <td className="py-2 px-3">
                          <input
                            type="color"
                            value={svc.color || '#6366f1'}
                            onChange={(e) => updateService(idx, 'color', e.target.value)}
                            className="h-8 w-9 rounded cursor-pointer border border-border bg-background p-0.5"
                          />
                        </td>
                        <td className="py-2 px-3">
                          <Input
                            placeholder="Details"
                            value={svc.serviceDetails ?? ""}
                            onChange={(e) => updateService(idx, 'serviceDetails', e.target.value)}
                            className="h-8 text-sm w-full"
                          />
                        </td>
                        <td className="py-2 px-3">
                          <Input
                            type="number"
                            min="0"
                            placeholder="0"
                            value={svc.numberOfSessions ?? ""}
                            onChange={(e) => updateService(idx, 'numberOfSessions', e.target.value)}
                            className="h-8 text-sm w-full"
                          />
                        </td>
                        <td className="py-2 px-3">
                          <div className="relative">
                            <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-xs text-muted-foreground">$</span>
                            <Input
                              type="number"
                              min="0"
                              step="any"
                              placeholder="0.00"
                              value={isChargeable ? (svc.pricePerSession ?? "") : 0}
                              disabled={!isChargeable}
                              onChange={(e) => updateService(idx, 'pricePerSession', e.target.value)}
                              className="h-8 text-sm pl-5 w-full disabled:opacity-40 disabled:cursor-not-allowed"
                            />
                          </div>
                        </td>
                        <td className="py-2 px-3">
                          <div className="h-8 px-2.5 flex items-center rounded-md bg-muted/50 border border-border text-sm text-foreground w-full font-medium">
                            ${fmt(total)}
                          </div>
                        </td>
                        <td className="py-2 px-3">
                          <select
                            value={isChargeable ? (svc.discountType ?? "none") : "none"}
                            disabled={!isChargeable}
                            onChange={(e) => updateService(idx, 'discountType', e.target.value)}
                            className="h-8 rounded-md border border-border bg-background text-sm px-2 focus:outline-none focus:ring-2 focus:ring-brand/30 w-full disabled:opacity-40 disabled:cursor-not-allowed"
                          >
                            {DISCOUNT_TYPES.map((d) => (
                              <option key={d.value} value={d.value}>{d.label}</option>
                            ))}
                          </select>
                        </td>
                        <td className="py-2 px-3">
                          <Input
                            type="number"
                            min="0"
                            step="any"
                            placeholder="0"
                            value={svc.discountAmount ?? ""}
                            disabled={!isChargeable || svc.discountType === 'none'}
                            onChange={(e) => updateService(idx, 'discountAmount', e.target.value)}
                            className="h-8 text-sm w-full disabled:opacity-40 disabled:cursor-not-allowed"
                          />
                        </td>
                        <td className="py-2 px-3">
                          <div
                            className="h-8 px-2.5 flex items-center rounded-md border text-sm font-semibold w-full"
                            style={{
                              backgroundColor: `color-mix(in srgb, ${color} 12%, hsl(var(--card)))`,
                              borderColor: `color-mix(in srgb, ${color} 40%, transparent)`,
                              color,
                            }}
                          >
                            ${fmt(finalAmount)}
                          </div>
                        </td>
                        <td className="py-2 px-3">
                          <button
                            type="button"
                            onClick={() => removeService(idx)}
                            disabled={services.length === 1}
                            className="h-8 w-8 rounded-md flex items-center justify-center text-muted-foreground hover:text-red-500 hover:bg-red-50 disabled:opacity-30 disabled:cursor-not-allowed"
                            aria-label="Remove service"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          )}

          {/* Summary totals */}
          {services.length > 0 && (
            <div className="mt-4 flex justify-end gap-6 text-sm border-t border-border pt-4">
              <div className="flex items-center gap-2 text-muted-foreground">
                <span>Total (all services):</span>
                <span className="font-semibold text-foreground">
                  ${fmt(services.reduce((acc, s) => acc + computeAmounts(s, svcChargeable(s)).total, 0))}
                </span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <span>Final Amount:</span>
                <span className="font-bold text-lg" style={{ color }}>
                  ${fmt(services.reduce((acc, s) => acc + computeAmounts(s, svcChargeable(s)).finalAmount, 0))}
                </span>
              </div>
            </div>
          )}

          {/* Total Days + Active */}
          <div className="mt-6 pt-4 border-t border-border space-y-3">
            <div className="flex items-center gap-3 flex-wrap">
              <Label htmlFor="pkg-curriculum" className="whitespace-nowrap text-sm">Curriculum Tier</Label>
              <div className="relative">
                <select
                  id="pkg-curriculum"
                  value={curriculumID}
                  onChange={(e) => setCurriculumID(e.target.value)}
                  className="h-8 min-w-[180px] appearance-none rounded-lg border border-border bg-background px-3 pr-8 text-sm text-foreground outline-none focus:border-primary"
                >
                  <option value="">Unassigned</option>
                  {curriculums.map((c) => (
                    <option key={c._id} value={c._id}>{c.name}</option>
                  ))}
                </select>
                <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
              </div>
            </div>

            <div className="flex items-center gap-3 flex-wrap">
              <Label htmlFor="pkg-days" className="whitespace-nowrap text-sm">Total Days</Label>
              <Input
                id="pkg-days"
                type="number"
                min="0"
                placeholder="0"
                value={totalDays}
                onChange={(e) => setTotalDays(e.target.value)}
                className="h-8 w-[90px] text-sm"
              />
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
                    onClick={() => setTotalDays(days)}
                    className={cn(
                      'h-7 px-2.5 rounded-full border text-[11px] font-medium transition-colors',
                      Number(totalDays) === days
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
              <Label className="text-sm">Active</Label>
              <div className="flex items-center gap-4">
                <label className="flex items-center gap-1.5 cursor-pointer text-sm">
                  <input type="radio" name="pkg-active" checked={isActive === true} onChange={() => setIsActive(true)} className="accent-brand" />
                  Yes
                </label>
                <label className="flex items-center gap-1.5 cursor-pointer text-sm">
                  <input type="radio" name="pkg-active" checked={isActive === false} onChange={() => setIsActive(false)} className="accent-brand" />
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
              {saving ? 'Saving…' : isNew ? 'Create Package' : 'Save Changes'}
            </Button>
          </div>
        </div>
        </> /* end details tab */}

        {/* ── Events tab ── */}
        {!isNew && activeTab === 'events' && (
          <div className="rounded-xl border border-border bg-card overflow-hidden">
            <div className="flex items-center justify-between gap-3 p-4 border-b border-border">
              <div className="flex items-center gap-2">
                <CalendarDays className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-semibold text-foreground">Booked Events</span>
                <span className="text-xs text-muted-foreground">({eventsTotal})</span>
              </div>
              <div className="flex items-center gap-2">
                <input type="date" value={dateStart} onChange={(e) => setDateStart(e.target.value)}
                  className="h-8 rounded-lg border border-border bg-background px-2 text-[12px] text-foreground outline-none focus:border-primary" />
                <span className="text-muted-foreground text-xs">to</span>
                <input type="date" value={dateEnd} onChange={(e) => setDateEnd(e.target.value)}
                  className="h-8 rounded-lg border border-border bg-background px-2 text-[12px] text-foreground outline-none focus:border-primary" />
                <Button size="sm" onClick={() => loadEvents(1)} className="h-8 px-3 bg-brand hover:bg-brand-dark text-brand-foreground text-xs">Filter</Button>
              </div>
            </div>

            {eventsLoading ? (
              <div className="flex items-center justify-center py-12">
                <GlobalLoader variant="center" size="sm" text="Loading events…" />
              </div>
            ) : events.length === 0 ? (
              <div className="py-12 text-center text-sm text-muted-foreground">No events found for this package.</div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border bg-muted/30">
                      <th className="py-2.5 px-4 text-left text-xs font-medium text-muted-foreground">Date & Time</th>
                      <th className="py-2.5 px-4 text-left text-xs font-medium text-muted-foreground">Title</th>
                      <th className="py-2.5 px-4 text-left text-xs font-medium text-muted-foreground">Students</th>
                      <th className="py-2.5 px-4 text-left text-xs font-medium text-muted-foreground">Teachers</th>
                      <th className="py-2.5 px-4 text-left text-xs font-medium text-muted-foreground">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {events.map((ev) => (
                      <tr key={ev._id} className="border-b border-border/60 hover:bg-muted/20 transition-colors">
                        <td className="py-3 px-4 whitespace-nowrap">
                          <p className="text-[12px] font-medium text-foreground">{formatEventDate(ev.startDateTime)}</p>
                          <p className="text-[11px] text-muted-foreground">{formatEventTime(ev.startDateTime)}</p>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-2">
                            {ev.color && <span className="h-2.5 w-2.5 rounded-full shrink-0" style={{ background: ev.color }} />}
                            <span className="text-[12px] text-foreground">{ev.title || '—'}</span>
                          </div>
                        </td>
                        <td className="py-3 px-4 text-[12px] text-muted-foreground">
                          {ev.customerIDs?.map((c) => c.name || c.email).filter(Boolean).join(', ') || '—'}
                        </td>
                        <td className="py-3 px-4 text-[12px] text-muted-foreground">{ev.teacherID?.name || '—'}</td>
                        <td className="py-3 px-4">
                          <span className={cn('inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-medium', EVENT_STATUS_COLORS[ev.status] || 'bg-muted text-muted-foreground')}>
                            {ev.status?.replace(/_/g, ' ') || '—'}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {eventsTotal > 50 && (
              <div className="flex items-center justify-between px-4 py-3 border-t border-border">
                <Button variant="outline" size="sm" onClick={() => loadEvents(eventsPage - 1)} disabled={eventsPage === 1 || eventsLoading}>Previous</Button>
                <span className="text-xs text-muted-foreground">Page {eventsPage}</span>
                <Button variant="outline" size="sm" onClick={() => loadEvents(eventsPage + 1)} disabled={events.length < 50 || eventsLoading}>Next</Button>
              </div>
            )}
          </div>
        )}

      </div>
    </MainLayout>
  )
}
