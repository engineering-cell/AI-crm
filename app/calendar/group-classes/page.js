'use client'

import { useCallback, useEffect, useMemo, useState } from 'react'
import { ChevronDown, ChevronLeft, ChevronRight, Layers, MoreHorizontal, Plus, Repeat, Sparkles, Code2 } from 'lucide-react'
import MainLayout from '@/components/layout/MainLayout'
import SearchInput from '@/components/ui/search-input'
import { Button } from '@/components/ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import GlobalLoader from '@/components/shared/GlobalLoader'
import api from '@/lib/api'
import { toast } from '@/components/ui/toast'
import GroupClassDrawer, { WEEKDAYS } from './components/GroupClassDrawer'
import WebsiteEmbedDialog from './components/WebsiteEmbedDialog'

const todayLocal = () => new Date().toLocaleDateString('en-CA')

function formatClock(hhmm) {
  const [h, m] = hhmm.split(':').map(Number)
  return `${h % 12 || 12}:${String(m).padStart(2, '0')} ${h < 12 ? 'AM' : 'PM'}`
}

function formatCivil(date) {
  return new Date(`${date}T00:00:00`).toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' })
}

// In the studio's timezone: staff elsewhere should still read "Tue · 7:30 PM".
function formatNext(iso, timeZone) {
  if (!iso) return null
  const d = new Date(iso)
  const civil = (date) => date.toLocaleDateString('en-CA', { timeZone })
  const days = Math.round((new Date(civil(d)) - new Date(civil(new Date()))) / 86_400_000)
  const day =
    days === 0 ? 'Today'
      : days === 1 ? 'Tomorrow'
        : days < 7 ? d.toLocaleDateString('en-US', { weekday: 'short', timeZone })
          : d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', timeZone })
  return { day, time: d.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', timeZone }) }
}

const isRunning = (s) => !s.endDate || s.endDate >= todayLocal()

function StatusPill({ status }) {
  const live = status === 'published'
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2 py-1 text-[10px] font-semibold ${
        live ? 'bg-emerald-500/10 text-emerald-700' : 'bg-amber-500/10 text-amber-700'
      }`}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-current" />
      {live ? 'Live' : 'Draft'}
    </span>
  )
}

function DayPills({ days }) {
  return (
    <div className="flex gap-0.5">
      {WEEKDAYS.map((d) => (
        <span
          key={d.value}
          className={`grid h-[22px] w-[22px] place-items-center rounded-md text-[9px] ${
            days.includes(d.value) ? 'bg-brand/10 font-bold text-brand' : 'bg-muted/50 text-muted-foreground/60'
          }`}
        >
          {d.label[0]}
        </span>
      ))}
    </div>
  )
}

function Metric({ icon: Icon, value, label }) {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-border bg-card px-4 py-4">
      <div className="grid h-9 w-9 place-items-center rounded-lg bg-brand/10 text-brand">
        <Icon className="h-4 w-4" />
      </div>
      <div>
        <p className="text-xl font-bold tracking-tight text-foreground">{value}</p>
        <p className="text-xs text-muted-foreground">{label}</p>
      </div>
    </div>
  )
}

export default function GroupClassesPage() {
  const [lessons, setLessons] = useState([])
  const [schedules, setSchedules] = useState([])
  const [loading, setLoading] = useState(true)
  const [tab, setTab] = useState('library')
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('all')
  const [expanded, setExpanded] = useState(() => new Set())
  const [drawer, setDrawer] = useState({ open: false, lesson: null, schedule: null })
  const [embedOpen, setEmbedOpen] = useState(false)

  const load = useCallback(async () => {
    // ponytail: whole library in one request; studios have tens of class types.
    // Switch to server paging if a studio passes ~500.
    const [lessonRes, scheduleRes] = await Promise.all([
      api.get('/api/lesson?limit=500'),
      api.get('/api/class-schedule'),
    ])
    if (lessonRes.success) setLessons(Array.isArray(lessonRes.data) ? lessonRes.data : [])
    else toast.error('Failed to load classes', { description: lessonRes.error })
    if (scheduleRes.success) setSchedules(Array.isArray(scheduleRes.data) ? scheduleRes.data : [])
    else toast.error('Failed to load schedules', { description: scheduleRes.error })
    setLoading(false)
  }, [])

  useEffect(() => { load() }, [load])

  const runningByLesson = useMemo(() => {
    const map = new Map()
    for (const s of schedules.filter(isRunning)) {
      const key = String(s.lessonID?._id ?? s.lessonID)
      map.set(key, [...(map.get(key) || []), s])
    }
    return map
  }, [schedules])

  const rows = useMemo(() => {
    const q = search.trim().toLowerCase()
    return lessons.filter((l) => {
      const scheduled = runningByLesson.has(String(l._id))
      if (filter === 'scheduled' && !scheduled) return false
      if (filter === 'unscheduled' && scheduled) return false
      if (!q) return true
      return [l.name, l.description, ...(l.tags || [])].some((v) => v?.toLowerCase().includes(q))
    })
  }, [lessons, runningByLesson, search, filter])

  const running = schedules.filter(isRunning)
  const openDrawer = (lesson = null, schedule = null) => setDrawer({ open: true, lesson, schedule })

  async function deleteClass(lesson) {
    if (!window.confirm(`Delete "${lesson.name}"? This cannot be undone.`)) return
    const res = await api.delete(`/api/lesson/${lesson._id}`)
    if (!res.success) return toast.error('Delete failed', { description: res.error })
    toast.success('Class deleted')
    load()
  }

  const toggleDescription = (id) =>
    setExpanded((prev) => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })

  if (loading) {
    return (
      <MainLayout title="Group classes" subtitle="">
        <div className="flex h-[calc(100vh-8rem)] items-center justify-center">
          <GlobalLoader variant="center" size="md" text="Loading classes…" />
        </div>
      </MainLayout>
    )
  }

  return (
    <MainLayout title="Group classes" subtitle="">
      <div className="min-h-full p-6">
        <div className="mb-6 flex items-start justify-between gap-4">
          <div>
            <p className="mb-1 text-[11px] font-bold uppercase tracking-widest text-brand">Studio offerings</p>
            <h1 className="text-2xl font-semibold tracking-tight text-foreground">Group classes</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              One class library. One schedule. Ready for your calendar, website, and AI agent.
            </p>
          </div>
          <div className="flex shrink-0 gap-2">
            <Button variant="outline" className="h-9 gap-2 rounded-lg px-4" onClick={() => setEmbedOpen(true)}>
              <Code2 className="h-4 w-4" />
              Website embed
            </Button>
            <Button className="h-9 gap-2 rounded-lg bg-brand px-4 text-brand-foreground hover:bg-brand-dark" onClick={() => openDrawer()}>
              <Plus className="h-4 w-4" />
              New class
            </Button>
          </div>
        </div>

        <div className="mb-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
          <Metric icon={Layers} value={lessons.length} label="Class types" />
          <Metric icon={Repeat} value={running.length} label="On the schedule" />
          <Metric
            icon={Sparkles}
            value={running.filter((s) => s.status === 'published').length}
            label="Published to website & AI agent"
          />
        </div>

        <div className="mb-4 flex gap-6 border-b border-border">
          {[
            ['library', 'Class library', lessons.length],
            ['schedule', 'Weekly schedule', running.length],
          ].map(([key, label, count]) => (
            <button
              key={key}
              type="button"
              onClick={() => setTab(key)}
              className={`-mb-px border-b-2 px-0.5 pb-3 text-sm transition-colors ${
                tab === key ? 'border-brand font-semibold text-brand' : 'border-transparent text-muted-foreground hover:text-foreground'
              }`}
            >
              {label}
              <span className="ml-1.5 rounded bg-muted px-1.5 py-0.5 text-[10px]">{count}</span>
            </button>
          ))}
        </div>

        {tab === 'schedule' ? (
          <WeeklySchedule />
        ) : (
          <div className="overflow-hidden rounded-xl border border-border bg-card">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border p-4">
              <SearchInput className="w-full sm:w-[260px]" placeholder="Search classes" value={search} onChange={(e) => setSearch(e.target.value)} />
              <div className="flex items-center gap-3">
                <select
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                  className="h-9 rounded-md border border-input bg-background px-3 text-sm text-foreground"
                >
                  <option value="all">All classes</option>
                  <option value="scheduled">On schedule</option>
                  <option value="unscheduled">Not scheduled</option>
                </select>
                <p className="hidden items-center gap-1.5 text-xs text-muted-foreground md:flex">
                  <Sparkles className="h-3.5 w-3.5 text-brand" />
                  Published classes are shared with your AI agent
                </p>
              </div>
            </div>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/30 hover:bg-transparent">
                    {['Class', 'Weekly days', 'Time', 'Schedule dates', 'Status', 'Next session', ''].map((h) => (
                      <TableHead key={h} className="px-4 py-3 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                        {h}
                      </TableHead>
                    ))}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {rows.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={7} className="py-16 text-center text-sm text-muted-foreground">
                        {lessons.length ? 'No classes match that search.' : 'No classes yet. Click "New class" to add one.'}
                      </TableCell>
                    </TableRow>
                  ) : (
                    rows.map((lesson) => {
                      const scheds = runningByLesson.get(String(lesson._id)) || []
                      const open = expanded.has(lesson._id)
                      return (
                        <TableRow key={lesson._id} className="align-top hover:bg-muted/20">
                          <TableCell className="min-w-[220px] px-4 py-3.5">
                            <div className="flex items-start gap-3">
                              <span className="mt-0.5 h-8 w-1.5 shrink-0 rounded-full" style={{ background: lesson.color || 'var(--studio-primary)' }} />
                              <div className="min-w-0">
                                <p className="text-sm font-semibold text-foreground">
                                  {lesson.name}
                                  {lesson.isActive === false && (
                                    <span className="ml-2 rounded bg-muted px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground">Inactive</span>
                                  )}
                                </p>
                                <button
                                  type="button"
                                  aria-expanded={open}
                                  onClick={() => toggleDescription(lesson._id)}
                                  className="mt-1 flex items-center gap-1 text-[11px] text-muted-foreground hover:text-brand"
                                >
                                  Description <ChevronDown className={`h-3 w-3 transition-transform ${open ? 'rotate-180' : ''}`} />
                                </button>
                                {open && (
                                  <p className="mt-1.5 max-w-[380px] text-[11px] leading-relaxed text-muted-foreground">
                                    {lesson.description || 'Add a description for students and your AI agent.'}
                                  </p>
                                )}
                                {lesson.tags?.length > 0 && (
                                  <p className="mt-1 text-[11px] text-muted-foreground">{lesson.tags.join(' · ')}</p>
                                )}
                              </div>
                            </div>
                          </TableCell>
                          {scheds.length === 0 ? (
                            <>
                              <TableCell className="px-4 py-3.5"><DayPills days={[]} /></TableCell>
                              <TableCell className="px-4 py-3.5 text-xs text-muted-foreground">—</TableCell>
                              <TableCell className="px-4 py-3.5 text-xs text-muted-foreground">—</TableCell>
                              <TableCell className="px-4 py-3.5 text-[11px] text-muted-foreground">Not scheduled</TableCell>
                              <TableCell className="px-4 py-3.5 text-xs text-muted-foreground">—</TableCell>
                            </>
                          ) : (
                            <>
                              <TableCell className="space-y-2 px-4 py-3.5">
                                {scheds.map((s) => <DayPills key={s._id} days={s.daysOfWeek} />)}
                              </TableCell>
                              <TableCell className="space-y-2 whitespace-nowrap px-4 py-3.5 text-xs text-foreground">
                                {scheds.map((s) => <p key={s._id} className="leading-[22px]">{formatClock(s.startTime)}</p>)}
                              </TableCell>
                              <TableCell className="space-y-2 whitespace-nowrap px-4 py-3.5 text-xs text-muted-foreground">
                                {scheds.map((s) => (
                                  <p key={s._id} className="leading-[22px]">
                                    {formatCivil(s.startDate)} — {s.endDate ? formatCivil(s.endDate) : 'Ongoing'}
                                  </p>
                                ))}
                              </TableCell>
                              <TableCell className="space-y-2 px-4 py-3.5">
                                {scheds.map((s) => <div key={s._id} className="leading-[22px]"><StatusPill status={s.status} /></div>)}
                              </TableCell>
                              <TableCell className="space-y-2 whitespace-nowrap px-4 py-3.5 text-[11px] text-muted-foreground">
                                {scheds.map((s) => {
                                  const next = formatNext(s.nextSessionAt, s.locationID?.timezone)
                                  return (
                                    <p key={s._id} className="leading-[22px]">
                                      {next ? <><strong className="font-semibold text-foreground">{next.day}</strong> · {next.time}</> : '—'}
                                    </p>
                                  )
                                })}
                              </TableCell>
                            </>
                          )}
                          <TableCell className="px-4 py-3.5">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <button type="button" aria-label="Class actions" className="rounded-md p-1.5 text-muted-foreground hover:bg-muted/50 hover:text-foreground">
                                  <MoreHorizontal className="h-4 w-4" />
                                </button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem onClick={() => openDrawer(lesson)}>Edit class</DropdownMenuItem>
                                {scheds.map((s) => (
                                  <DropdownMenuItem key={s._id} onClick={() => openDrawer(lesson, s)}>
                                    Edit schedule · {WEEKDAYS.filter((d) => s.daysOfWeek.includes(d.value)).map((d) => d.label).join('/')} {formatClock(s.startTime)}
                                  </DropdownMenuItem>
                                ))}
                                <DropdownMenuItem className="text-red-600" onClick={() => deleteClass(lesson)}>Delete class</DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      )
                    })
                  )}
                </TableBody>
              </Table>
            </div>
            <div className="flex justify-between border-t border-border px-4 py-3 text-[11px] text-muted-foreground">
              <span>Showing <strong className="font-medium text-foreground">{rows.length}</strong> of <strong className="font-medium text-foreground">{lessons.length}</strong> class types</span>
            </div>
          </div>
        )}

        <WebsiteEmbedDialog open={embedOpen} onClose={() => setEmbedOpen(false)} />
        <GroupClassDrawer
          open={drawer.open}
          lesson={drawer.lesson}
          schedule={drawer.schedule}
          onClose={() => setDrawer((d) => ({ ...d, open: false }))}
          onSaved={load}
        />
      </div>
    </MainLayout>
  )
}

function mondayOf(date) {
  const d = new Date(date.getFullYear(), date.getMonth(), date.getDate())
  d.setDate(d.getDate() - ((d.getDay() + 6) % 7))
  return d
}

/** The same session rows the AI agent and website read, drafts included. */
function WeeklySchedule() {
  const [weekStart, setWeekStart] = useState(() => mondayOf(new Date()))
  const [sessions, setSessions] = useState(null)

  useEffect(() => {
    setSessions(null)
    // Sessions are placed by their studio-local date below; pad the window a
    // day each side so a viewer in another timezone can't clip the week's edges.
    const from = new Date(weekStart)
    from.setDate(from.getDate() - 1)
    api.get(`/api/class-schedule/sessions?start=${from.toISOString()}&days=9`).then((res) => {
      if (res.success) setSessions(Array.isArray(res.data) ? res.data : [])
      else {
        setSessions([])
        toast.error('Failed to load the schedule', { description: res.error })
      }
    })
  }, [weekStart])

  const days = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(weekStart)
    d.setDate(d.getDate() + i)
    return d
  })
  const shift = (weeks) =>
    setWeekStart((prev) => {
      const d = new Date(prev)
      d.setDate(d.getDate() + weeks * 7)
      return d
    })
  const label = `${days[0].toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} – ${days[6].toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}`

  return (
    <div className="rounded-xl border border-border bg-card p-5">
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h3 className="text-base font-semibold text-foreground">
            Week <span className="font-normal text-muted-foreground">· {label}</span>
          </h3>
          <p className="mt-1 text-[11px] text-muted-foreground">Sessions come from your schedules and appear on the calendar automatically.</p>
        </div>
        <div className="flex items-center gap-1">
          <Button variant="outline" size="sm" aria-label="Previous week" onClick={() => shift(-1)}><ChevronLeft className="h-4 w-4" /></Button>
          <Button variant="outline" size="sm" onClick={() => setWeekStart(mondayOf(new Date()))}>This week</Button>
          <Button variant="outline" size="sm" aria-label="Next week" onClick={() => shift(1)}><ChevronRight className="h-4 w-4" /></Button>
        </div>
      </div>
      {sessions === null ? (
        <div className="py-16"><GlobalLoader variant="center" size="sm" text="Loading week…" /></div>
      ) : (
        <div className="overflow-x-auto">
          <div className="grid min-w-[760px] grid-cols-7 gap-2">
            {days.map((day) => {
              const key = day.toLocaleDateString('en-CA')
              const daySessions = sessions.filter((s) => s.localDate === key)
              return (
                <div key={key} className="min-h-[220px] rounded-lg border border-border p-2">
                  <p className="mb-2 text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">
                    {day.toLocaleDateString('en-US', { weekday: 'short' })}
                    <span className="mt-1 block text-base font-semibold normal-case text-foreground">{day.getDate()}</span>
                  </p>
                  {daySessions.length === 0 ? (
                    <p className="py-8 text-center text-[10px] text-muted-foreground/60">No classes</p>
                  ) : (
                    daySessions.map((s) => (
                      <div
                        key={s.sessionID}
                        className={`mb-1.5 rounded-md border-l-2 p-2 ${
                          s.cancelled ? 'border-muted-foreground/40 bg-muted/40 opacity-60' : 'border-brand bg-brand/5'
                        }`}
                      >
                        <p className={`text-[11px] font-semibold leading-tight text-foreground ${s.cancelled ? 'line-through' : ''}`}>{s.className}</p>
                        <p className="mt-1 text-[10px] text-muted-foreground">
                          {s.localTime}{s.instructor ? ` · ${s.instructor}` : ''}
                        </p>
                        <p className="mt-0.5 text-[10px] text-muted-foreground">
                          {s.cancelled ? 'Cancelled' : s.spotsLeft == null ? 'Open' : s.spotsLeft === 0 ? 'Full' : `${s.spotsLeft} spots left`}
                          {!s.published && ' · Draft'}
                        </p>
                      </div>
                    ))
                  )}
                </div>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}
