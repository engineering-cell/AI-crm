'use client'

import { useEffect, useMemo, useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { ReportTableShell } from '@/components/reports/ReportTableShell'
import { cn, formatDate } from '@/lib/utils'
import { useReportTimezone } from '@/lib/reports/ReportTimezoneContext'

const TYPE_ORDER = ['intro', 'private', 'group', 'todo']
const VIEW_STORAGE_KEY = 'report-view:teacher-performance'

const TYPE_META = {
  intro: { label: 'Intro', short: 'Intro' },
  private: { label: 'Private', short: 'Private' },
  group: { label: 'Group', short: 'Group' },
  todo: { label: 'To Do', short: 'To Do' },
}

function formatSessionDate(value, timeZone) {
  return formatDate(value, timeZone) || '—'
}

function formatMoney(value) {
  const n = Number(value) || 0
  return n.toLocaleString(undefined, { style: 'currency', currency: 'USD', maximumFractionDigits: 0 })
}

function teacherInitials(name) {
  const parts = String(name || '')
    .trim()
    .split(/\s+/)
    .filter(Boolean)
  if (!parts.length) return '?'
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase()
  return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase()
}

function lessonCount(byType, key) {
  return byType?.[key]?.lessons ?? 0
}

/**
 * Headline count for a breakdown row. `lessonsTaught` is attendance-based for
 * group services, so a class with 8 students would read as 8 — use the session
 * count there so the number always means "classes/lessons this teacher taught".
 */
function taughtCount(row) {
  if (!row) return 0
  if (row.serviceType === 'group') return row.sessionCount ?? 0
  return row.lessonsTaught ?? 0
}

function hasActivity(row) {
  return taughtCount(row) > 0 || (row?.lessonsTaught ?? 0) > 0 || (row?.sessions?.length ?? 0) > 0
}

function customerCount(byType, key) {
  return byType?.[key]?.customers ?? 0
}

function usePersistedView() {
  const [view, setView] = useState('type')

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(VIEW_STORAGE_KEY)
      if (stored === 'type' || stored === 'service') setView(stored)
    } catch {
      // ignore storage errors
    }
  }, [])

  function updateView(next) {
    setView(next)
    try {
      window.localStorage.setItem(VIEW_STORAGE_KEY, next)
    } catch {
      // ignore storage errors
    }
  }

  return [view, updateView]
}

function ViewToggle({ view, onChange }) {
  const options = [
    { value: 'type', label: 'By type' },
    { value: 'service', label: 'By service' },
  ]

  return (
    <div
      className="inline-flex rounded-lg border border-[var(--studio-primary)]/20 bg-[var(--studio-primary-light)] p-0.5"
      role="group"
      aria-label="Breakdown view"
    >
      {options.map((option) => {
        const active = view === option.value
        return (
          <button
            key={option.value}
            type="button"
            onClick={() => onChange(option.value)}
            className={cn(
              'rounded-md px-3 py-1.5 text-[12px] font-semibold transition-colors',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--studio-primary)]/30',
              active
                ? 'bg-[var(--studio-primary)] text-white'
                : 'text-[var(--studio-primary)] hover:bg-[var(--studio-primary)]/10',
            )}
          >
            {option.label}
          </button>
        )
      })}
    </div>
  )
}

function TypeBadge({ serviceType }) {
  const label = TYPE_META[serviceType]?.short || serviceType || '—'
  return (
    <span className="inline-flex rounded-md bg-[var(--studio-primary)]/10 px-1.5 py-0.5 text-[10px] font-medium uppercase tracking-wide text-[var(--studio-primary)]">
      {label}
    </span>
  )
}

/** Compact studio overview — scanable counts by lesson type. */
function StudioOverviewByType({ byType }) {
  if (!byType) return null

  const cells = [
    ...TYPE_ORDER.map((key) => ({
      key,
      label: TYPE_META[key].label,
      lessons: lessonCount(byType, key),
      customers: customerCount(byType, key),
      hint: key === 'group' ? 'Attendances' : 'Sessions',
    })),
    {
      key: 'total',
      label: 'Total',
      lessons: lessonCount(byType, 'total'),
      customers: customerCount(byType, 'total'),
      hint: 'Lessons',
      emphasize: true,
    },
  ]

  return (
    <div className="grid grid-cols-2 divide-y divide-border/60 sm:grid-cols-5 sm:divide-x sm:divide-y-0">
      {cells.map((cell) => (
        <div
          key={cell.key}
          className={cn('px-4 py-3.5 sm:px-5', cell.emphasize && 'bg-[var(--studio-primary)]/[0.04]')}
        >
          <p className="text-[11px] font-medium text-muted-foreground">{cell.label}</p>
          <p
            className={cn(
              'mt-1 text-xl font-semibold tabular-nums tracking-tight',
              cell.emphasize
                ? 'text-[var(--studio-primary)]'
                : cell.lessons === 0
                  ? 'text-muted-foreground/70'
                  : 'text-foreground',
            )}
          >
            {cell.lessons}
          </p>
          <p className="mt-1 text-[11px] text-muted-foreground">
            <span className="tabular-nums">{cell.customers}</span> customers
            <span className="mx-1.5 text-border">·</span>
            {cell.hint}
          </p>
        </div>
      ))}
    </div>
  )
}

function StudioOverviewByService({ byService }) {
  const rows = byService || []
  if (!rows.length) {
    return (
      <p className="px-4 py-8 text-center text-sm text-muted-foreground sm:px-5">
        No services with completed lessons in this period.
      </p>
    )
  }

  return (
    <div className="max-h-[280px] overflow-auto">
      <table className="w-full min-w-[520px] text-left text-[13px]">
        <thead className="sticky top-0 z-10 bg-card text-[11px] font-semibold uppercase tracking-wide text-muted-foreground shadow-[inset_0_-1px_0_0_hsl(var(--border))]">
          <tr className="bg-card">
            <th className="bg-card px-4 py-2 sm:px-5">Service</th>
            <th className="bg-card px-3 py-2">Type</th>
            <th className="bg-card px-3 py-2 text-right">Lessons</th>
            <th className="bg-card px-4 py-2 text-right sm:px-5">Customers</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.serviceID} className="border-t border-border/50">
              <td className="px-4 py-2.5 font-medium text-foreground sm:px-5">{row.serviceName}</td>
              <td className="px-3 py-2.5">
                <TypeBadge serviceType={row.serviceType} />
              </td>
              <td className="px-3 py-2.5 text-right tabular-nums text-foreground">
                {row.serviceType === 'group' ? row.sessionCount ?? 0 : row.lessons ?? 0}
                {row.serviceType === 'group' && (row.lessons ?? 0) > 0 ? (
                  <span className="mt-0.5 block text-[11px] text-muted-foreground">
                    {row.lessons} attendance{row.lessons === 1 ? '' : 's'}
                  </span>
                ) : null}
              </td>
              <td className="px-4 py-2.5 text-right tabular-nums text-muted-foreground sm:px-5">
                {row.customers ?? 0}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function TypeCountPills({ types }) {
  return (
    <div className="flex flex-wrap gap-1.5">
      {TYPE_ORDER.map((key) => {
        const row = types.find((t) => t.serviceType === key)
        const count = taughtCount(row)
        return (
          <span
            key={key}
            className={cn(
              'inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-[11px] tabular-nums',
              count > 0
                ? 'bg-[var(--studio-primary)]/10 font-medium text-[var(--studio-primary)]'
                : 'text-muted-foreground/50',
            )}
          >
            <span className={count > 0 ? 'text-[var(--studio-primary)]/70' : undefined}>
              {TYPE_META[key].short}
            </span>
            {count}
          </span>
        )
      })}
    </div>
  )
}

function ServiceCountPills({ services }) {
  const active = (services || []).filter((s) => taughtCount(s) > 0)
  if (!active.length) {
    return <span className="text-[11px] text-muted-foreground/50">No services</span>
  }

  return (
    <div className="flex flex-wrap gap-1.5">
      {active.slice(0, 6).map((row) => (
        <span
          key={row.serviceID}
          className="inline-flex max-w-[180px] items-center gap-1 truncate rounded-md bg-[var(--studio-primary)]/10 px-2 py-0.5 text-[11px] font-medium tabular-nums text-[var(--studio-primary)]"
          title={
            row.serviceType === 'group'
              ? `${row.label} — ${taughtCount(row)} classes · ${row.lessonsTaught ?? 0} attendances`
              : row.label
          }
        >
          <span className="truncate">{row.label}</span>
          {taughtCount(row)}
        </span>
      ))}
      {active.length > 6 ? (
        <span className="text-[11px] text-muted-foreground">+{active.length - 6} more</span>
      ) : null}
    </div>
  )
}

function SessionTable({ sessions }) {
  const timeZone = useReportTimezone()

  if (!sessions?.length) {
    return <p className="px-1 py-2 text-[12px] text-muted-foreground">No sessions in this period.</p>
  }

  return (
    <div className="overflow-hidden rounded-lg border border-border/60">
      <table className="w-full text-left text-[13px]">
        <thead className="bg-muted/40 text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
          <tr>
            <th className="px-3 py-2">Date</th>
            <th className="px-3 py-2">Student / to-do</th>
            <th className="px-3 py-2 text-right">Lessons</th>
          </tr>
        </thead>
        <tbody>
          {sessions.map((session, idx) => (
            <tr
              key={`${session.customerID}-${session.date}-${idx}`}
              className="border-t border-border/50"
            >
              <td className="whitespace-nowrap px-3 py-2 text-muted-foreground">
                {formatSessionDate(session.date, timeZone)}
              </td>
              <td className="px-3 py-2 text-foreground">{session.customerName}</td>
              <td className="px-3 py-2 text-right tabular-nums text-foreground">
                {session.lessons || 1}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function BreakdownPanels({ items, idKey = 'serviceType', emptyLabel }) {
  const activeItems = useMemo(() => (items || []).filter(hasActivity), [items])
  const [selected, setSelected] = useState(null)
  const selectedId = selected || activeItems[0]?.[idKey]
  const current = (items || []).find((t) => t[idKey] === selectedId) || activeItems[0]

  useEffect(() => {
    setSelected(null)
  }, [items])

  if (!activeItems.length) {
    return <p className="text-[13px] text-muted-foreground">{emptyLabel}</p>
  }

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap gap-1.5" role="tablist" aria-label="Lesson breakdown">
        {(items || []).filter(hasActivity).map((row) => {
          const key = row[idKey]
          const count = taughtCount(row)
          const isActive = selectedId === key
          return (
            <button
              key={key}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => setSelected(key)}
              className={cn(
                'max-w-[220px] truncate rounded-md px-2.5 py-1.5 text-[12px] font-medium transition-colors',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--studio-primary)]/30 focus-visible:ring-offset-1',
                isActive
                  ? 'bg-[var(--studio-primary)] text-white'
                  : 'bg-[var(--studio-primary-light)] text-[var(--studio-primary)] hover:bg-[var(--studio-primary)]/15',
              )}
              title={
                row.serviceType === 'group'
                  ? `${row.label} — ${count} classes · ${row.lessonsTaught ?? 0} attendances`
                  : row.label
              }
            >
              <span className="truncate">{row.label}</span>
              <span className="ml-1.5 tabular-nums opacity-80">{count}</span>
            </button>
          )
        })}
      </div>

      {current ? (
        <div className="space-y-2">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[12px] text-muted-foreground">
            {current.serviceType && idKey === 'serviceID' ? (
              <TypeBadge serviceType={current.serviceType} />
            ) : null}
            <span>
              <span className="font-semibold tabular-nums text-foreground">
                {current.lessonsTaught ?? 0}
              </span>{' '}
              {current.serviceType === 'group' ? 'attendances' : 'lessons taught'}
            </span>
            <span>
              <span className="font-semibold tabular-nums text-foreground">
                {current.customersServed ?? 0}
              </span>{' '}
              customers
            </span>
            {current.serviceType === 'group' && (current.sessionCount ?? 0) > 0 ? (
              <span>
                <span className="font-semibold tabular-nums text-foreground">
                  {current.sessionCount}
                </span>{' '}
                class{current.sessionCount === 1 ? '' : 'es'}
              </span>
            ) : null}
          </div>
          <SessionTable sessions={current.sessions} />
        </div>
      ) : null}
    </div>
  )
}

function TeacherTypePanels({ types }) {
  // Keep type-order tabs including zeros disabled — match prior UX
  const activeTypes = useMemo(() => (types || []).filter(hasActivity), [types])
  const [selected, setSelected] = useState(null)
  const selectedType = selected || activeTypes[0]?.serviceType || TYPE_ORDER[0]
  const current = (types || []).find((t) => t.serviceType === selectedType) || activeTypes[0]

  if (!activeTypes.length) {
    return (
      <p className="text-[13px] text-muted-foreground">
        No completed lessons for this teacher in the selected period.
      </p>
    )
  }

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap gap-1.5" role="tablist" aria-label="Lesson type">
        {TYPE_ORDER.map((key) => {
          const row = (types || []).find((t) => t.serviceType === key)
          const count = taughtCount(row)
          const isActive = selectedType === key
          const disabled = !hasActivity(row)
          return (
            <button
              key={key}
              type="button"
              role="tab"
              aria-selected={isActive}
              disabled={disabled}
              onClick={() => setSelected(key)}
              className={cn(
                'rounded-md px-2.5 py-1.5 text-[12px] font-medium transition-colors',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--studio-primary)]/30 focus-visible:ring-offset-1',
                disabled && 'cursor-not-allowed opacity-35',
                isActive && !disabled
                  ? 'bg-[var(--studio-primary)] text-white'
                  : 'bg-[var(--studio-primary-light)] text-[var(--studio-primary)] hover:bg-[var(--studio-primary)]/15',
              )}
            >
              {TYPE_META[key].label}
              <span className="ml-1.5 tabular-nums opacity-80">{count}</span>
            </button>
          )
        })}
      </div>

      {current ? (
        <div className="space-y-2">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[12px] text-muted-foreground">
            <span>
              <span className="font-semibold tabular-nums text-foreground">
                {current.lessonsTaught ?? 0}
              </span>{' '}
              {current.serviceType === 'group' ? 'attendances' : 'lessons taught'}
            </span>
            <span>
              <span className="font-semibold tabular-nums text-foreground">
                {current.customersServed ?? 0}
              </span>{' '}
              customers
            </span>
            {current.serviceType === 'group' && (current.sessionCount ?? 0) > 0 ? (
              <span>
                <span className="font-semibold tabular-nums text-foreground">
                  {current.sessionCount}
                </span>{' '}
                class{current.sessionCount === 1 ? '' : 'es'}
              </span>
            ) : null}
          </div>
          <SessionTable sessions={current.sessions} />
        </div>
      ) : null}
    </div>
  )
}

function TeacherKpis({ teacher }) {
  const items = [
    { label: 'Active', value: teacher.activeStudents ?? 0 },
    { label: 'Revenue', value: formatMoney(teacher.revenueGenerated) },
    { label: 'Intros sold', value: teacher.introConversions ?? 0 },
    { label: 'Upgrades', value: teacher.programUpgrades ?? 0 },
    { label: 'Retention', value: `${teacher.retentionPct ?? 0}%` },
  ]

  return (
    <dl className="grid grid-cols-2 gap-x-4 gap-y-2 sm:grid-cols-5">
      {items.map((item) => (
        <div key={item.label}>
          <dt className="text-[11px] text-muted-foreground">{item.label}</dt>
          <dd className="text-[13px] font-medium tabular-nums text-foreground">{item.value}</dd>
        </div>
      ))}
    </dl>
  )
}

function TeacherRow({ teacher, view, defaultOpen = false }) {
  const [open, setOpen] = useState(defaultOpen)
  const types = teacher.lessonsByType || []
  const services = teacher.lessonsByService || []
  const totalLessons =
    view === 'service'
      ? services.reduce((sum, t) => sum + taughtCount(t), 0)
      : types.reduce((sum, t) => sum + taughtCount(t), 0)

  return (
    <article className="border-b border-border/70 last:border-b-0">
      <button
        type="button"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className={cn(
          'flex w-full items-start gap-3 px-4 py-3.5 text-left transition-colors sm:items-center sm:px-5',
          'hover:bg-[var(--studio-primary)]/[0.03] focus-visible:bg-[var(--studio-primary)]/[0.05] focus-visible:outline-none',
        )}
      >
        <span
          className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[var(--studio-primary-light)] text-[11px] font-semibold text-[var(--studio-primary)] sm:mt-0"
          aria-hidden
        >
          {teacherInitials(teacher.teacherName)}
        </span>

        <div className="min-w-0 flex-1 space-y-1.5">
          <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
            <span className="truncate text-[14px] font-semibold text-foreground">
              {teacher.teacherName}
            </span>
            {teacher.studioName && teacher.studioName !== '—' ? (
              <span className="truncate text-[12px] text-muted-foreground">{teacher.studioName}</span>
            ) : null}
            <span className="text-[12px] tabular-nums text-muted-foreground">
              <span className="font-semibold text-[var(--studio-primary)]">{totalLessons}</span> lessons
            </span>
          </div>
          {view === 'service' ? (
            <ServiceCountPills services={services} />
          ) : (
            <TypeCountPills types={types} />
          )}
        </div>

        <ChevronDown
          className={cn(
            'mt-2 h-4 w-4 shrink-0 text-[var(--studio-primary)]/60 transition-transform duration-200 sm:mt-0',
            open && 'rotate-180',
          )}
          aria-hidden
        />
      </button>

      <div
        className={cn(
          'grid transition-[grid-template-rows] duration-200 ease-out',
          open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]',
        )}
      >
        <div className="overflow-hidden">
          <div className="space-y-4 bg-[var(--studio-primary)]/[0.02] px-4 pb-4 pt-1 sm:px-5 sm:pb-5 sm:pl-[4.25rem]">
            {view === 'service' ? (
              <BreakdownPanels
                items={services}
                idKey="serviceID"
                emptyLabel="No completed lessons for this teacher in the selected period."
              />
            ) : (
              <TeacherTypePanels types={types} />
            )}
            <div className="border-t border-[var(--studio-primary)]/10 pt-3">
              <TeacherKpis teacher={teacher} />
            </div>
          </div>
        </div>
      </div>
    </article>
  )
}

/**
 * Lessons taught by teacher — studio overview + expandable per-teacher detail.
 * Supports By type / By service breakdown views.
 */
export function TeacherLessonsTaughtReport({
  rows,
  summary,
  emptyLabel = 'No teachers found for the selected filters.',
}) {
  const [view, setView] = usePersistedView()

  return (
    <div className="space-y-4">
      <ReportTableShell>
        <div className="border-b border-border/70 px-4 py-3 sm:px-5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h3 className="text-sm font-semibold text-[var(--studio-primary)]">Studio overview</h3>
              <p className="mt-0.5 text-[12px] text-muted-foreground">
                Group counts attendances · others count completed sessions
              </p>
            </div>
            <ViewToggle view={view} onChange={setView} />
          </div>
        </div>
        {view === 'service' ? (
          <StudioOverviewByService byService={summary?.byService} />
        ) : (
          <StudioOverviewByType byType={summary?.byType} />
        )}
      </ReportTableShell>

      {!rows.length ? (
        <p className="py-10 text-center text-sm text-muted-foreground">{emptyLabel}</p>
      ) : (
        <ReportTableShell>
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border/70 px-4 py-3 sm:px-5">
            <h3 className="text-sm font-semibold text-[var(--studio-primary)]">By teacher</h3>
            <p className="text-[12px] text-muted-foreground">
              {rows.length} teacher{rows.length === 1 ? '' : 's'} · expand for session detail
            </p>
          </div>
          <div>
            {rows.map((teacher, index) => (
              <TeacherRow
                key={teacher.id}
                teacher={teacher}
                view={view}
                defaultOpen={rows.length === 1 || index === 0}
              />
            ))}
          </div>
        </ReportTableShell>
      )}
    </div>
  )
}
