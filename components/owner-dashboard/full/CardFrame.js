'use client'

import { useState } from 'react'
import { comparisonWindows } from '@/lib/hooks/useOwnerDashboardPage'
import { useOwnerDashboardOverview } from '@/lib/hooks/useAnalyticsOverview'
import { Panel, PanelHead, Reveal } from './chrome'
import { PERIOD_OPTIONS } from './PeriodSelect'

const OPTIONS = PERIOD_OPTIONS.filter((o) => o.value !== 'custom')

/**
 * Data a card renders from: the page's own payload, or — when the card's period
 * dropdown overrides the page period — the same owner-overview read for that
 * period (plus its MoM / YoY comparison windows). The SWR cache means picking
 * the page's own period back never refetches.
 */
export function useCardData(override, pageData, pageComparisons) {
  const windows = override ? comparisonWindows(override) : null
  const own = useOwnerDashboardOverview(override ?? 'mtd', { enabled: Boolean(override) })
  const prev = useOwnerDashboardOverview(windows?.priorPeriod ?? 'mtd', { enabled: Boolean(override), compare: true })
  const ly = useOwnerDashboardOverview(windows?.priorYear ?? 'mtd', { enabled: Boolean(override), compare: true })
  if (!override) return { data: pageData, comparisons: pageComparisons, loading: false, error: null, retry: null }
  return {
    data: own.data,
    comparisons: { previous: prev.data, lastYear: ly.data },
    loading: own.isLoading && !own.data,
    error: own.error && !own.data ? own.error : null,
    retry: () => own.mutate(),
  }
}

export function Skeleton({ height }) {
  return (
    <div className="mt-4 space-y-2.5" style={{ minHeight: height }} aria-busy="true" aria-label="Loading">
      {[80, 60, 70, 45].map((w) => (
        <div key={w} className="h-4 animate-pulse rounded bg-muted" style={{ width: `${w}%` }} />
      ))}
    </div>
  )
}

export function PeriodPicker({ title, snapshot, override, setOverride }) {
  return snapshot ? (
    <span className="rounded-lg border border-border px-2 py-1 text-[11px] font-semibold text-muted-foreground">{snapshot}</span>
  ) : (
    <select
      aria-label={`${title} period`}
      value={override === null ? 'page' : String(override)}
      onChange={(e) => setOverride(e.target.value === 'page' ? null : e.target.value === '30' ? 30 : e.target.value)}
      className="h-7 rounded-lg border border-border bg-background px-2 text-[11px] font-semibold text-muted-foreground"
    >
      <option value="page">Page period</option>
      {OPTIONS.map((o) => (
        <option key={o.value} value={String(o.value)}>
          {o.label}
        </option>
      ))}
    </select>
  )
}

/**
 * The card shell from the spec: title (+ caption) on the left; toggle, Details
 * and the period dropdown on the right. Snapshot cards pass `snapshot="This
 * week"` and get a fixed label instead of a dropdown. The card never disappears:
 * loading shows skeleton bars and a failed load shows "Couldn't load this card · Retry".
 */
export default function CardFrame({
  title,
  note,
  data,
  comparisons,
  pageRange,
  snapshot,
  toggle,
  tag,
  details,
  className = '',
  delay = 1,
  children,
}) {
  const [override, setOverride] = useState(null)
  const card = useCardData(override, data, comparisons)
  const range = override ?? pageRange

  const picker = <PeriodPicker title={title} snapshot={snapshot} override={override} setOverride={setOverride} />

  return (
    <Reveal delay={delay} className="h-full min-w-0">
      <Panel className={`flex h-full flex-col ${className}`}>
        <PanelHead tag={tag} title={title} note={note} right={toggle} detailsButton={<>{details ? details(range) : null}{picker}</>} />
        {card.loading ? (
          <Skeleton height={140} />
        ) : card.error ? (
          <p className="mt-6 text-center text-[13px] text-muted-foreground">
            Couldn&apos;t load this card ·{' '}
            <button type="button" onClick={card.retry} className="font-semibold text-[var(--studio-primary)] underline">
              Retry
            </button>
          </p>
        ) : card.data ? (
          <div className="flex flex-1 flex-col">{children(card.data, card.comparisons, range)}</div>
        ) : null}
      </Panel>
    </Reveal>
  )
}
