'use client'

import { useEffect, useState } from 'react'
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Switch } from '@/components/ui/switch'
import LocationSelector from '@/components/shared/LocationSelector'
import api from '@/lib/api'
import { toast } from '@/components/ui/toast'
import ConflictPrompt from '../../components/ConflictPrompt'

// Mon → Sun, as 0 (Sun) – 6 (Sat) weekday numbers.
export const WEEKDAYS = [
  { value: 1, label: 'Mon' },
  { value: 2, label: 'Tue' },
  { value: 3, label: 'Wed' },
  { value: 4, label: 'Thu' },
  { value: 5, label: 'Fri' },
  { value: 6, label: 'Sat' },
  { value: 0, label: 'Sun' },
]

const todayLocal = () => new Date().toLocaleDateString('en-CA')
const idOf = (v) => (v && typeof v === 'object' ? v._id : v) || ''

function classForm(lesson) {
  return {
    name: lesson?.name || '',
    description: lesson?.description || '',
    tags: (lesson?.tags || []).join(', '),
    isActive: lesson?.isActive !== false,
    calendarServiceID: idOf(lesson?.calendarServiceID),
    duration: String(lesson?.duration ?? 60),
    color: lesson?.color || '#6366f1',
    locationID: (Array.isArray(lesson?.locationID) ? lesson.locationID : [lesson?.locationID])
      .map(idOf)
      .filter(Boolean),
  }
}

function scheduleForm(schedule, lesson, effectiveFrom) {
  return {
    enabled: Boolean(schedule) || !lesson,
    daysOfWeek: schedule?.daysOfWeek || [],
    startTime: schedule?.startTime || '18:00',
    durationMinutes: String(schedule?.durationMinutes ?? lesson?.duration ?? 60),
    startDate: schedule?.startDate || todayLocal(),
    endDate: schedule?.endDate || '',
    teacherID: idOf(schedule?.teacherID),
    locationID: idOf(schedule?.locationID),
    room: schedule?.room || '',
    capacity: schedule?.capacity ? String(schedule.capacity) : '',
    status: schedule?.status || 'published',
    effectiveFrom: effectiveFrom || todayLocal(),
  }
}

function NativeSelect({ id, value, onChange, children }) {
  return (
    <select
      id={id}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="h-9 w-full rounded-md border border-input bg-background px-3 text-sm text-foreground outline-none focus:ring-2 focus:ring-ring"
    >
      {children}
    </select>
  )
}

function SectionLabel({ children }) {
  return (
    <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">{children}</p>
  )
}

function showScheduleError(result) {
  const conflicts = result.errorData?.conflicts
  if (!conflicts?.length) return toast.error('Schedule not saved', { description: result.error })
  // `when` is already in studio time; the browser's own timezone could shift the day.
  const dates = conflicts.map((c) => c.when).join('; ')
  toast.error('Booked sessions are in the way', {
    description: `${result.error} (${dates})`,
  })
}

/**
 * One drawer for the group class source of truth: class details (shared with
 * the AI agent and website) plus its recurring schedule. Editing a schedule
 * applies "from this date forward".
 */
export default function GroupClassDrawer({ open, onClose, lesson = null, schedule = null, effectiveFrom = null, onSaved }) {
  const [form, setForm] = useState(() => classForm(lesson))
  const [sched, setSched] = useState(() => scheduleForm(schedule, lesson, effectiveFrom))
  // A new class saved before its schedule failed — retries must not create it twice.
  const [createdLesson, setCreatedLesson] = useState(null)
  const [services, setServices] = useState([])
  const [teachers, setTeachers] = useState([])
  const [saving, setSaving] = useState(false)
  // Set when the backend says the instructor is already booked for some sessions.
  const [conflictPrompt, setConflictPrompt] = useState(null)
  const target = lesson || createdLesson

  useEffect(() => {
    if (!open) return
    setForm(classForm(lesson))
    setSched(scheduleForm(schedule, lesson, effectiveFrom))
    setCreatedLesson(null)
    setConflictPrompt(null)
  }, [open, lesson, schedule, effectiveFrom])

  useEffect(() => {
    if (!open || services.length) return
    api.get('/api/calendar-service?limit=200&isActive=true').then((res) => {
      if (res.success && Array.isArray(res.data)) setServices(res.data)
    })
    api.get('/api/teacher?limit=200&status=active').then((res) => {
      if (res.success && Array.isArray(res.data)) setTeachers(res.data)
    })
  }, [open, services.length])

  const set = (field, value) => setForm((prev) => ({ ...prev, [field]: value }))
  const setS = (field, value) => setSched((prev) => ({ ...prev, [field]: value }))
  const toggleDay = (day) =>
    setS('daysOfWeek', sched.daysOfWeek.includes(day) ? sched.daysOfWeek.filter((d) => d !== day) : [...sched.daysOfWeek, day])

  function scheduleFields() {
    return {
      daysOfWeek: sched.daysOfWeek,
      startTime: sched.startTime,
      durationMinutes: Number(sched.durationMinutes) || Number(form.duration) || 60,
      startDate: sched.startDate,
      endDate: sched.endDate || null,
      teacherID: sched.teacherID || null,
      room: sched.room.trim(),
      capacity: sched.capacity ? Number(sched.capacity) : null,
      status: sched.status,
    }
  }

  async function handleSave(e, { allowConflicts = false } = {}) {
    e?.preventDefault()
    if (!form.name.trim()) return toast.error('Class name is required')
    if (!form.locationID.length) return toast.error('Pick at least one location for this class')
    if (sched.enabled) {
      if (!sched.daysOfWeek.length) return toast.error('Pick at least one weekday')
      if (!schedule && !(sched.locationID || form.locationID[0])) return toast.error('Pick a location for the schedule')
      if (sched.endDate && sched.endDate < sched.startDate) return toast.error('End date must be after the start date')
    }

    setSaving(true)
    try {
      // New schedule: ask first whether the instructor is already booked, so a blocked
      // schedule doesn't leave behind a saved class with no schedule.
      if (!schedule && sched.enabled && sched.teacherID && !allowConflicts) {
        const check = await api.post('/api/class-schedule/check-conflicts', {
          ...scheduleFields(),
          locationID: sched.locationID || form.locationID[0],
          durationMinutes: scheduleFields().durationMinutes ?? (Number(form.duration) || 60),
        })
        if (check.success && check.data?.hasConflicts) {
          setConflictPrompt({ ...check.data, tz: check.data.timezone })
          return
        }
      }

      const classPayload = {
        name: form.name.trim(),
        description: form.description.trim(),
        tags: form.tags.split(',').map((t) => t.trim()).filter(Boolean),
        isActive: form.isActive,
        calendarServiceID: form.calendarServiceID || undefined,
        duration: Number(form.duration) || 60,
        color: form.color || undefined,
        locationID: form.locationID,
      }
      const lessonRes = target
        ? await api.put(`/api/lesson/${target._id}`, classPayload)
        : await api.post('/api/lesson', classPayload)
      if (!lessonRes.success) return toast.error('Class not saved', { description: lessonRes.error })
      if (!target) setCreatedLesson(lessonRes.data)

      if (schedule) {
        const res = await api.patch(`/api/class-schedule/${schedule._id}`, {
          ...scheduleFields(),
          effectiveFrom: sched.effectiveFrom,
        })
        if (!res.success) return showScheduleError(res)
      } else if (sched.enabled) {
        const schedulePayload = {
          ...scheduleFields(),
          lessonID: lessonRes.data._id,
          locationID: sched.locationID || form.locationID[0],
          ...(allowConflicts ? { allowConflicts: true } : {}),
        }
        const res = await api.post('/api/class-schedule', schedulePayload)
        // Safety net: a booking made after the pre-check above can still clash. The class
        // is saved at this point, so a retry re-checks without creating it twice.
        if (!res.success && res.errorData?.needsConflictConfirm) {
          onSaved?.()
          setConflictPrompt({ ...res.errorData, tz: res.errorData.timezone })
          return
        }
        if (!res.success) {
          onSaved?.()
          return showScheduleError(res)
        }
      }

      toast.success(schedule ? 'Class and schedule updated' : target ? 'Class updated' : 'Class created')
      onSaved?.()
      onClose()
    } finally {
      setSaving(false)
    }
  }

  // Staff chose to create the schedule even though the instructor is double-booked.
  function bookAnyway() {
    setConflictPrompt(null)
    return handleSave(null, { allowConflicts: true })
  }

  async function handleEndSchedule() {
    const from = sched.effectiveFrom
    if (!window.confirm(`End this schedule? Sessions from ${from} onward are removed; past sessions stay.`)) return
    setSaving(true)
    try {
      const res = await api.delete(`/api/class-schedule/${schedule._id}?from=${from}`)
      if (!res.success) return showScheduleError(res)
      toast.success('Schedule ended')
      onSaved?.()
      onClose()
    } finally {
      setSaving(false)
    }
  }

  const selectedService = services.find((s) => s._id === form.calendarServiceID)

  return (
    <Sheet open={open} onClose={onClose} width={520}>
      <SheetContent onClose={onClose}>
        <SheetHeader className="border-b border-border">
          <SheetTitle>{schedule ? 'Edit schedule' : target ? 'Edit class' : 'New group class'}</SheetTitle>
          <p className="text-xs text-muted-foreground">
            {schedule
              ? 'Changes apply from the date you choose. Cancelled and one-off edited sessions are left alone.'
              : 'Set up the class and add its recurring schedule.'}
          </p>
        </SheetHeader>

        <form onSubmit={handleSave} className="flex flex-1 flex-col">
          <div className="flex-1 space-y-4 p-6">
            <SectionLabel>Class details</SectionLabel>
            <div className="space-y-1.5">
              <Label htmlFor="gc-name">Class name</Label>
              <Input id="gc-name" value={form.name} onChange={(e) => set('name', e.target.value)} placeholder="e.g. Beginner Salsa" />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="gc-description">Description</Label>
              <Textarea
                id="gc-description"
                value={form.description}
                onChange={(e) => set('description', e.target.value)}
                placeholder="What students will learn, who it's for, and what to expect"
              />
              <p className="text-[11px] text-muted-foreground">Shown to students on your website and used by your AI agent.</p>
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="gc-tags">Level &amp; tags</Label>
              <Input id="gc-tags" value={form.tags} onChange={(e) => set('tags', e.target.value)} placeholder="Level 1, Latin, Partner dance" />
              <p className="text-[11px] text-muted-foreground">Comma separated. Website filters use these.</p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label htmlFor="gc-service">Billing service</Label>
                <NativeSelect id="gc-service" value={form.calendarServiceID} onChange={(v) => set('calendarServiceID', v)}>
                  <option value="">No billing service</option>
                  {/* Group services only; a class already on another service keeps it listed so the field isn't blank. */}
                  {services.filter((s) => s.type === 'group' || s._id === form.calendarServiceID).map((s) => (
                    <option key={s._id} value={s._id}>
                      {s.serviceCode ? `[${s.serviceCode}] ` : ''}
                      {s.serviceName}
                    </option>
                  ))}
                </NativeSelect>
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="gc-duration">Default duration (min)</Label>
                <Input id="gc-duration" type="number" min="5" value={form.duration} onChange={(e) => set('duration', e.target.value)} />
              </div>
            </div>
            {selectedService && (
              <p className="-mt-2 text-[11px] text-muted-foreground">
                {selectedService.isChargeable
                  ? `Students' sessions are deducted from packages with code "${selectedService.serviceCode}".`
                  : 'This service is not chargeable — no sessions are deducted.'}
              </p>
            )}
            <div className="grid grid-cols-[1fr_auto] items-end gap-3">
              <div className="space-y-1.5">
                <Label>Locations</Label>
                <LocationSelector value={form.locationID} onChange={(ids) => set('locationID', ids)} multiple />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="gc-color">Color</Label>
                <input
                  id="gc-color"
                  type="color"
                  value={form.color}
                  onChange={(e) => set('color', e.target.value)}
                  className="block h-9 w-12 rounded border border-border bg-background p-1"
                />
              </div>
            </div>
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm font-medium text-foreground">Active</p>
                <p className="text-xs text-muted-foreground">Inactive classes are hidden from your website and AI agent.</p>
              </div>
              <Switch checked={form.isActive} onChange={(v) => set('isActive', v)} aria-label="Class active" />
            </div>

            <div className="h-px bg-border" />

            <SectionLabel>Recurring schedule</SectionLabel>
            {!schedule && (
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm font-medium text-foreground">Add to calendar</p>
                  <p className="text-xs text-muted-foreground">Create sessions from a weekly schedule.</p>
                </div>
                <Switch checked={sched.enabled} onChange={(v) => setS('enabled', v)} aria-label="Add schedule" />
              </div>
            )}

            {sched.enabled && (
              <div className="space-y-4">
                <div className="space-y-1.5">
                  <Label>Repeats on</Label>
                  <div className="flex flex-wrap gap-1.5">
                    {WEEKDAYS.map((d) => {
                      const on = sched.daysOfWeek.includes(d.value)
                      return (
                        <button
                          key={d.value}
                          type="button"
                          aria-pressed={on}
                          onClick={() => toggleDay(d.value)}
                          className={`h-9 w-11 rounded-lg border text-xs font-semibold transition-colors ${
                            on ? 'border-brand/40 bg-brand/10 text-brand' : 'border-border bg-background text-muted-foreground hover:bg-muted/40'
                          }`}
                        >
                          {d.label}
                        </button>
                      )
                    })}
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <Label htmlFor="gc-time">Start time</Label>
                    <Input id="gc-time" type="time" value={sched.startTime} onChange={(e) => setS('startTime', e.target.value)} />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="gc-sched-duration">Duration (min)</Label>
                    <Input
                      id="gc-sched-duration"
                      type="number"
                      min="5"
                      value={sched.durationMinutes}
                      onChange={(e) => setS('durationMinutes', e.target.value)}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <Label htmlFor="gc-start">Starts on</Label>
                    <Input
                      id="gc-start"
                      type="date"
                      value={sched.startDate}
                      onChange={(e) => setS('startDate', e.target.value)}
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="gc-end">Ends on <span className="font-normal text-muted-foreground">(optional)</span></Label>
                    <Input id="gc-end" type="date" value={sched.endDate} onChange={(e) => setS('endDate', e.target.value)} />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <Label htmlFor="gc-teacher">Instructor</Label>
                    <NativeSelect id="gc-teacher" value={sched.teacherID} onChange={(v) => setS('teacherID', v)}>
                      <option value="">No instructor</option>
                      {teachers.map((t) => (
                        <option key={t._id} value={t._id}>{t.name || t.email}</option>
                      ))}
                    </NativeSelect>
                  </div>
                  <div className="space-y-1.5">
                    <Label>Location</Label>
                    {schedule ? (
                      <Input value={schedule.locationID?.name || ''} disabled />
                    ) : (
                      <LocationSelector
                        value={sched.locationID || form.locationID[0] || ''}
                        onChange={(v) => setS('locationID', v)}
                        preselectActiveBranch={false}
                      />
                    )}
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-3">
                  <div className="space-y-1.5">
                    <Label htmlFor="gc-room">Room</Label>
                    <Input id="gc-room" value={sched.room} onChange={(e) => setS('room', e.target.value)} placeholder="Studio A" />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="gc-capacity">Capacity</Label>
                    <Input
                      id="gc-capacity"
                      type="number"
                      min="1"
                      value={sched.capacity}
                      onChange={(e) => setS('capacity', e.target.value)}
                      placeholder="No limit"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="gc-status">Visibility</Label>
                    <NativeSelect id="gc-status" value={sched.status} onChange={(v) => setS('status', v)}>
                      <option value="published">Published</option>
                      <option value="draft">Draft</option>
                    </NativeSelect>
                  </div>
                </div>
                <p className="text-[11px] text-muted-foreground">
                  Sessions appear on the calendar either way. Only published schedules are shared with your website and AI agent.
                </p>
                {schedule && (
                  <div className="space-y-1.5 rounded-lg border border-border bg-muted/30 p-3">
                    <Label htmlFor="gc-from">Apply changes from</Label>
                    <Input
                      id="gc-from"
                      type="date"
                      min={todayLocal()}
                      value={sched.effectiveFrom}
                      onChange={(e) => setS('effectiveFrom', e.target.value)}
                    />
                    <p className="text-[11px] text-muted-foreground">Sessions before this date keep their current details.</p>
                  </div>
                )}
              </div>
            )}
          </div>

          {conflictPrompt && (
            <ConflictPrompt
              prompt={conflictPrompt}
              busy={saving}
              onBookAnyway={bookAnyway}
              onDismiss={() => setConflictPrompt(null)}
            />
          )}

          <div className="sticky bottom-0 flex items-center justify-between gap-2 border-t border-border bg-card px-6 py-4">
            {schedule ? (
              <Button type="button" variant="outline" className="text-destructive" onClick={handleEndSchedule} disabled={saving}>
                End schedule
              </Button>
            ) : (
              <span className="text-[11px] text-muted-foreground">Changes sync across Cadance</span>
            )}
            <div className="flex gap-2">
              <Button type="button" variant="outline" onClick={onClose} disabled={saving}>
                Cancel
              </Button>
              <Button type="submit" disabled={saving} className="bg-brand text-brand-foreground hover:bg-brand-dark">
                {saving ? 'Saving…' : 'Save'}
              </Button>
            </div>
          </div>
        </form>
      </SheetContent>
    </Sheet>
  )
}
