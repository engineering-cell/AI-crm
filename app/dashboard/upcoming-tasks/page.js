'use client'

import { useMemo, useState } from 'react'
import { readPersistedListState, usePersistListState } from '@/lib/hooks/useListStatePersistence'
import {
  CalendarClock,
  CalendarCheck2,
  CheckSquare,
  PhoneCall,
  Headphones,
  RotateCw,
  ArrowUpDown,
  SlidersHorizontal,
  AlarmClock,
  X,
} from 'lucide-react'
import MainLayout from '@/components/layout/MainLayout'
import { getStudioTimezone } from '@/lib/studioTimezone'
import { diffDayKeys, formatDayKey, pickTimezone, todayKeyInTz } from '@/lib/location-time'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import SearchInput from '@/components/ui/search-input'
import LoadingSpinner from '@/components/shared/LoadingSpinner'
import { formatDate, cn } from '@/lib/utils'
import { useUpcomingTasks } from '@/lib/hooks/useUpcomingTasks'
import CreateTaskDialog from '@/components/dashboard/CreateTaskDialog'

const ROWS_PER_PAGE = 15

// Remembers search/filters/sort/page across back/forward navigation.
const UPCOMING_TASKS_LIST_STATE_KEY = 'upcoming-tasks-list-state'

const KIND_ICON = {
  todo: CheckSquare,
  'lead-callback': PhoneCall,
  'customer-callback': PhoneCall,
  'human-intervention': Headphones,
}

const KIND_LABEL = {
  todo: 'To-do',
  'lead-callback': 'Lead Follow-up',
  'customer-callback': 'Callback',
  'human-intervention': 'Needs Human',
}

// Per-kind accent so the list reads at a glance, same idea as the callback
// report's colored summary tiles — not just a wall of identical grey rows.
const KIND_ACCENT = {
  todo: 'bg-info/10 text-info',
  'lead-callback': 'bg-violet-100 text-violet-700',
  'customer-callback': 'bg-emerald-100 text-emerald-700',
  'human-intervention': 'bg-rose-100 text-rose-700',
}

const KIND_OPTIONS = [
  { value: '', label: 'All types' },
  { value: 'todo', label: 'To-do' },
  { value: 'lead-callback', label: 'Lead Follow-up' },
  { value: 'customer-callback', label: 'Callback' },
  { value: 'human-intervention', label: 'Needs Human' },
]

const SORT_OPTIONS = [
  { value: 'due', label: 'Due date (soonest first)' },
  { value: 'overdue', label: 'Most overdue first' },
  { value: 'type', label: 'Task type' },
]

const TYPE_SORT_RANK = {
  'human-intervention': 0,
  'lead-callback': 1,
  'customer-callback': 2,
  todo: 3,
}

function sortTasks(items, sortBy) {
  const copy = [...items]
  if (sortBy === 'overdue') {
    // Most-overdue first, then soonest-due-first for everything still ahead.
    return copy.sort((a, b) => {
      if (a.isOverdue !== b.isOverdue) return a.isOverdue ? -1 : 1
      return new Date(a.dueDate) - new Date(b.dueDate)
    })
  }
  if (sortBy === 'type') {
    return copy.sort((a, b) => {
      const rankDiff = (TYPE_SORT_RANK[a.kind] ?? 9) - (TYPE_SORT_RANK[b.kind] ?? 9)
      if (rankDiff !== 0) return rankDiff
      return new Date(a.dueDate) - new Date(b.dueDate)
    })
  }
  // 'due': hook already returns tasks sorted ascending by due date.
  return copy
}

// Buckets tasks under friendly date headers instead of one long flat list —
// "Overdue" and "Today" are the ones that actually need eyes right now, so
// they lead.
function groupByDueDate(items) {
  const startOfToday = new Date()
  startOfToday.setHours(0, 0, 0, 0)
  const startOfTomorrow = new Date(startOfToday)
  startOfTomorrow.setDate(startOfTomorrow.getDate() + 1)
  const startOfNextWeek = new Date(startOfToday)
  startOfNextWeek.setDate(startOfNextWeek.getDate() + 7)

  const buckets = [
    { key: 'overdue', label: 'Overdue', items: [] },
    { key: 'today', label: 'Today', items: [] },
    { key: 'tomorrow', label: 'Tomorrow', items: [] },
    { key: 'week', label: 'This week', items: [] },
    { key: 'later', label: 'Later', items: [] },
  ]

  for (const task of items) {
    const due = task.dueDate ? new Date(task.dueDate) : null
    if (task.isOverdue) {
      buckets[0].items.push(task)
    } else if (task.dueDayKey) {
      // Callback: bucket by calendar day in the contact's location timezone.
      const diff = diffDayKeys(todayKeyInTz(pickTimezone(task.dueTimezone, getStudioTimezone())), task.dueDayKey)
      buckets[diff <= 0 ? 1 : diff === 1 ? 2 : diff < 7 ? 3 : 4].items.push(task)
    } else if (!due) {
      buckets[4].items.push(task)
    } else if (due < startOfTomorrow) {
      buckets[1].items.push(task)
    } else if (due < new Date(startOfTomorrow.getTime() + 24 * 60 * 60 * 1000)) {
      buckets[2].items.push(task)
    } else if (due < startOfNextWeek) {
      buckets[3].items.push(task)
    } else {
      buckets[4].items.push(task)
    }
  }

  return buckets.filter((b) => b.items.length > 0)
}

function TaskRow({ task }) {
  const Icon = KIND_ICON[task.kind] || CalendarClock
  return (
    <div className="flex items-start gap-3 p-3 rounded-lg border border-border bg-card hover:border-brand/40 hover:shadow-sm transition-all">
      <div className={cn('h-9 w-9 rounded-xl flex items-center justify-center shrink-0', KIND_ACCENT[task.kind] || 'bg-muted text-muted-foreground')}>
        <Icon className="h-4 w-4" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2 mb-1">
          <p className="text-sm font-medium text-foreground">{task.title}</p>
          <Badge variant={task.isOverdue ? 'error' : 'info'} className="shrink-0 text-xs">
            {task.isOverdue ? 'Overdue' : KIND_LABEL[task.kind] || task.kind}
          </Badge>
        </div>
        <p className="text-xs text-muted-foreground">Due: {task.dueDayKey ? formatDayKey(task.dueDayKey) : formatDate(task.dueDate)}</p>
        {(task.assignee || task.relatedName) && (
          <p className="text-xs text-muted-foreground/80 mt-0.5">
            {task.assignee && `Assigned to: ${task.assignee}`}
            {task.assignee && task.relatedName && ' · '}
            {task.relatedName}
          </p>
        )}
      </div>
    </div>
  )
}

export default function UpcomingTasksPage() {
  // Wide enough window/limit to give the filters something real to work
  // with — this page is the "see everything" destination for the dashboard
  // card's fixed 3-item preview, so it deliberately casts a bigger net.
  const { tasks, loading, refresh } = useUpcomingTasks({ days: 30, limit: 200, pollMs: 90000 })

  const [persisted] = useState(() => readPersistedListState(UPCOMING_TASKS_LIST_STATE_KEY) || {})
  const [search, setSearch] = useState(persisted.search || '')
  const [kind, setKind] = useState(persisted.kind || '')
  const [assignee, setAssignee] = useState(persisted.assignee || '')
  const [fromDate, setFromDate] = useState(persisted.fromDate || '')
  const [toDate, setToDate] = useState(persisted.toDate || '')
  const [overdueOnly, setOverdueOnly] = useState(persisted.overdueOnly || false)
  const [sortBy, setSortBy] = useState(persisted.sortBy || 'due')
  const [currentPage, setCurrentPage] = useState(persisted.currentPage || 1)
  const [showMoreFilters, setShowMoreFilters] = useState(false)

  const assigneeOptions = useMemo(
    () => [...new Set(tasks.map((t) => t.assignee).filter(Boolean))].sort((a, b) => a.localeCompare(b)),
    [tasks]
  )

  const filtered = useMemo(() => {
    const term = search.trim().toLowerCase()
    const items = tasks.filter((task) => {
      if (kind && task.kind !== kind) return false
      if (assignee && task.assignee !== assignee) return false
      if (overdueOnly && !task.isOverdue) return false
      if (term) {
        const haystack = `${task.title} ${task.relatedName} ${task.assignee}`.toLowerCase()
        if (!haystack.includes(term)) return false
      }
      if (fromDate && task.dueDate && new Date(task.dueDate) < new Date(fromDate)) return false
      if (toDate && task.dueDate && new Date(task.dueDate) > new Date(`${toDate}T23:59:59`)) return false
      return true
    })
    return sortTasks(items, sortBy)
  }, [tasks, search, kind, assignee, overdueOnly, fromDate, toDate, sortBy])

  const totalPages = Math.max(1, Math.ceil(filtered.length / ROWS_PER_PAGE))
  const page = Math.min(currentPage, totalPages)
  const pageItems = filtered.slice((page - 1) * ROWS_PER_PAGE, page * ROWS_PER_PAGE)
  // Date-bucketed headers only make sense when sorted by due date — the
  // other sort modes intentionally break chronological order, so they
  // render as a single flat list instead.
  const groups = useMemo(
    () => (sortBy === 'due' ? groupByDueDate(pageItems) : [{ key: 'all', label: null, items: pageItems }]),
    [pageItems, sortBy]
  )

  usePersistListState(UPCOMING_TASKS_LIST_STATE_KEY, {
    search,
    kind,
    assignee,
    fromDate,
    toDate,
    overdueOnly,
    sortBy,
    currentPage,
  })

  const hasMoreFiltersActive = Boolean(kind || assignee || fromDate || toDate || overdueOnly || sortBy !== 'due')
  const hasActiveFilters = Boolean(search || hasMoreFiltersActive)
  const clearFilters = () => {
    setSearch('')
    setKind('')
    setAssignee('')
    setFromDate('')
    setToDate('')
    setOverdueOnly(false)
    setSortBy('due')
    setCurrentPage(1)
  }

  return (
    <MainLayout title="Upcoming Tasks" subtitle="To-dos, callbacks, and calls waiting on a human — next 30 days">
      <div className="space-y-5 py-2">
        <div className="rounded-xl border border-border bg-card p-4 space-y-4">
          <div className="flex flex-wrap items-center gap-3">
            <SearchInput
              className="flex-1 min-w-[220px]"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value)
                setCurrentPage(1)
              }}
              placeholder="Search by title, contact, assignee…"
            />
            <button
              type="button"
              onClick={() => setShowMoreFilters((prev) => !prev)}
              aria-expanded={showMoreFilters}
              className={cn(
                'relative inline-flex items-center gap-1.5 h-9 px-3 rounded-lg border text-[13px] font-medium transition-colors',
                showMoreFilters || hasMoreFiltersActive
                  ? 'border-brand/30 bg-brand/10 text-brand'
                  : 'border-border text-muted-foreground hover:text-foreground hover:bg-muted'
              )}
            >
              <SlidersHorizontal className="h-3.5 w-3.5" />
              Filters
              {hasMoreFiltersActive && (
                <span className="h-1.5 w-1.5 rounded-full bg-brand" aria-hidden="true" />
              )}
            </button>
            {hasActiveFilters && (
              <button
                type="button"
                onClick={clearFilters}
                className="inline-flex items-center gap-1 h-9 px-2.5 rounded-lg text-xs font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
              >
                <X className="h-3.5 w-3.5" />
                Clear all
              </button>
            )}
            <button
              type="button"
              onClick={() => refresh()}
              title="Refresh"
              className="inline-flex items-center justify-center h-9 w-9 rounded-lg border border-border text-muted-foreground hover:text-foreground hover:bg-muted transition-colors ml-auto"
            >
              <RotateCw className="h-3.5 w-3.5" />
            </button>
            <CreateTaskDialog onCreated={() => refresh()} />
          </div>

          {showMoreFilters && (
            <div className="space-y-3 pt-3 border-t border-border/70">
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
                <div>
                  <label className="block text-xs font-medium text-muted-foreground mb-1.5">Type</label>
                  <select
                    value={kind}
                    onChange={(e) => {
                      setKind(e.target.value)
                      setCurrentPage(1)
                    }}
                    className="h-9 w-full px-3 text-[13px] border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-info"
                  >
                    {KIND_OPTIONS.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-muted-foreground mb-1.5">Assigned to</label>
                  <select
                    value={assignee}
                    onChange={(e) => {
                      setAssignee(e.target.value)
                      setCurrentPage(1)
                    }}
                    disabled={assigneeOptions.length === 0}
                    className="h-9 w-full px-3 text-[13px] border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-info disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <option value="">Everyone</option>
                    {assigneeOptions.map((name) => (
                      <option key={name} value={name}>
                        {name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-muted-foreground mb-1.5">
                    <ArrowUpDown className="inline h-3 w-3 mr-1 align-[-1px]" />
                    Sort by
                  </label>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="h-9 w-full px-3 text-[13px] border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-info"
                  >
                    {SORT_OPTIONS.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="flex items-end">
                  <button
                    type="button"
                    onClick={() => {
                      setOverdueOnly((prev) => !prev)
                      setCurrentPage(1)
                    }}
                    aria-pressed={overdueOnly}
                    className={cn(
                      'inline-flex h-9 w-full items-center justify-center gap-1.5 rounded-lg border px-3 text-[13px] font-medium transition-colors',
                      overdueOnly
                        ? 'border-destructive/30 bg-destructive/10 text-destructive'
                        : 'border-border text-muted-foreground hover:text-foreground hover:bg-muted'
                    )}
                  >
                    <AlarmClock className="h-3.5 w-3.5" />
                    Overdue only
                  </button>
                </div>
              </div>

              <div className="flex flex-wrap items-end gap-3">
                <div>
                  <label className="block text-xs font-medium text-muted-foreground mb-1.5">Due from</label>
                  <Input
                    type="date"
                    value={fromDate}
                    onChange={(e) => {
                      setFromDate(e.target.value)
                      setCurrentPage(1)
                    }}
                    className="h-9 text-[13px] rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-muted-foreground mb-1.5">Due to</label>
                  <Input
                    type="date"
                    value={toDate}
                    onChange={(e) => {
                      setToDate(e.target.value)
                      setCurrentPage(1)
                    }}
                    className="h-9 text-[13px] rounded-lg"
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        <Card className="rounded-xl border border-border bg-card shadow-sm">
          <CardContent className="pt-4">
            {loading && (
              <div className="py-12">
                <LoadingSpinner text="Loading tasks…" />
              </div>
            )}
            {!loading && filtered.length === 0 && (
              <div className="flex flex-col items-center justify-center py-14 text-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted mb-3">
                  <CalendarCheck2 className="h-6 w-6 text-muted-foreground" />
                </div>
                <p className="text-sm font-medium text-foreground">
                  {hasActiveFilters ? 'No tasks match these filters.' : "You're all caught up."}
                </p>
                {hasActiveFilters && (
                  <button type="button" onClick={clearFilters} className="mt-2 text-xs font-medium text-brand hover:underline">
                    Clear filters
                  </button>
                )}
              </div>
            )}

            {!loading && groups.length > 0 && (
              <div className="space-y-5">
                {groups.map((group) => (
                  <div key={group.key}>
                    {group.label && (
                      <div className="flex items-center gap-2 mb-2">
                        <h3
                          className={cn(
                            'text-xs font-semibold uppercase tracking-wider',
                            group.key === 'overdue' ? 'text-destructive' : 'text-muted-foreground'
                          )}
                        >
                          {group.label}
                        </h3>
                        <span className="text-xs text-muted-foreground/70">{group.items.length}</span>
                        <div className="h-px flex-1 bg-border" />
                      </div>
                    )}
                    <div className="space-y-2">
                      {group.items.map((task) => (
                        <TaskRow key={task.id} task={task} />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {filtered.length > 0 && totalPages > 1 && (
              <div className="flex items-center justify-between pt-5 mt-5 border-t border-border">
                <button
                  type="button"
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={page === 1}
                  className="inline-flex items-center h-8 px-3 rounded-lg border border-border bg-background text-sm font-medium text-foreground hover:bg-muted/40 disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  Previous
                </button>
                <span className="text-sm text-muted-foreground">
                  Page {page} of {totalPages} · {filtered.length} total
                </span>
                <button
                  type="button"
                  onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                  disabled={page === totalPages}
                  className="inline-flex items-center h-8 px-3 rounded-lg border border-border bg-background text-sm font-medium text-foreground hover:bg-muted/40 disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  Next
                </button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  )
}
