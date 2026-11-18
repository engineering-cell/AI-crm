'use client'

import { useEffect, useMemo, useState } from 'react'
import { ReportIdsContext } from './chrome'
import PeriodSelect, { periodLabel as periodLabelFor } from './PeriodSelect'
import { Button } from '@/components/ui/button'
import { useOwnerDashboardPage } from '@/lib/hooks/useOwnerDashboardPage'
import ScorecardSection from './sections/ScorecardSection'
import RevenueSection from './sections/RevenueSection'
import LessonsSection from './sections/LessonsSection'
import ForecastSection from './sections/ForecastSection'
import CapacitySection from './sections/CapacitySection'
import ConversionsSection from './sections/ConversionsSection'
import MarketingSection from './sections/MarketingSection'
import StudentHealthSection from './sections/StudentHealthSection'
import NeedsFixingSection from './sections/NeedsFixingSection'

/* ── sticky section nav ─────────────────────────────────────────────────── */

/**
 * Highlights whichever section currently owns the middle of the viewport.
 * Observes only the ids that actually rendered, so a section hidden by
 * permissions never leaves a dead link behind.
 */
function useActiveSection(ids) {
  const [active, setActive] = useState(ids[0])

  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') return undefined
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries.find((e) => e.isIntersecting)
        if (visible) setActive(visible.target.id)
      },
      { rootMargin: '-25% 0px -65% 0px' }
    )
    ids.forEach((id) => {
      const el = document.getElementById(id)
      if (el) io.observe(el)
    })
    return () => io.disconnect()
  }, [ids])

  return active
}

/**
 * Scrolls smoothly to a section. MainLayout's <main> is the scroll container,
 * not the document, so a plain hash jump lands hard — scrollIntoView animates
 * whichever ancestor actually scrolls. The href stays for keyboard and
 * middle-click behaviour.
 */
function jumpTo(e, id) {
  const el = document.getElementById(id)
  if (!el) return
  e.preventDefault()
  el.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

function SectionNav({ sections }) {
  const ids = useMemo(() => sections.map((s) => s.id), [sections])
  const active = useActiveSection(ids)

  // This bar bleeds out over MainLayout's <main>, which is the scroll container
  // and carries `px-3 py-3 sm:px-4 sm:py-4 lg:px-2`. Two consequences:
  //
  //  - Horizontal: negative margins matching that padding make the bar
  //    full-bleed rather than floating inset like the cards.
  //  - Vertical: a sticky `top-0` resolves against the scroll container's
  //    PADDING box, so the bar pins *below* main's padding-top and cards scroll
  //    visibly through the strip above it. Rather than fight that with negative
  //    margins (how engines resolve a sticky inset against a negative margin
  //    varies), the ::before paints an opaque strip directly above the bar that
  //    travels with it and hides anything passing behind.
  //
  //  - The background stays fully opaque: translucency only reads correctly
  //    where backdrop-filter applies, which inside a scroll container it often
  //    does not, and the fallback is plain alpha with content showing through.
  //
  // The pills WRAP rather than scroll: an `overflow-x-auto` rail here clipped
  // the trailing pills whenever the row was wider than the viewport, and with
  // the scrollbar hidden there was nothing to signal they were there. Wrapping
  // keeps a single row wherever it fits and spills to a second row when it
  // doesn't, so no entry is ever hidden.
  return (
    <nav
      className="sticky top-0 z-40 -mx-3 bg-background px-3 pb-3 pt-1 sm:-mx-4 sm:px-4 lg:-mx-2 lg:px-2
        before:absolute before:inset-x-0 before:bottom-full before:h-4 before:bg-background before:content-['']"
    >
      <div className="inline-flex max-w-full flex-wrap gap-1 rounded-2xl border border-border bg-card p-1 shadow-sm">
        {sections.map((s) => (
          <a
            key={s.id}
            href={`#${s.id}`}
            onClick={(e) => jumpTo(e, s.id)}
            className={`shrink-0 whitespace-nowrap rounded-xl px-3.5 py-1.5 text-[13px] font-semibold transition-colors ${
              active === s.id
                ? 'bg-[var(--studio-primary)] text-brand-foreground shadow-sm'
                : 'text-muted-foreground hover:bg-muted hover:text-foreground'
            }`}
          >
            {s.label}
          </a>
        ))}
      </div>
    </nav>
  )
}

/* ── page ───────────────────────────────────────────────────────────────── */

function Skeleton() {
  return (
    <div className="space-y-4 py-10">
      <div className="h-40 animate-pulse rounded-[20px] bg-muted/50" />
      <div className="h-64 animate-pulse rounded-[20px] bg-muted/40" />
      <div className="h-64 animate-pulse rounded-[20px] bg-muted/30" />
    </div>
  )
}

export default function OwnerDashboardPage() {
  const [range, setRange] = useState('this_month')
  const [showIds, setShowIds] = useState(false)
  const { data, classic, summaries, comparisons, error, isLoading, isValidating, refresh } = useOwnerDashboardPage(range)

  const periodLabel = periodLabelFor(range)

  // Each owner-overview section is permission-gated server side, so an absent
  // key means "this user may not see it" — the section and its nav entry are
  // dropped rather than rendered as a wall of empty states.
  const sections = useMemo(() => {
    const list = [{ id: 'od-scorecard', label: 'Scorecard' }]
    if (data?.revenue) list.push({ id: 'od-revenue', label: 'Revenue' })
    if (data?.lessons) {
      list.push({ id: 'od-lessons', label: 'Lessons' })
      list.push({ id: 'od-forecast', label: 'Forecast' })
      list.push({ id: 'od-capacity', label: 'Instructor utilization' })
    }
    if (data?.funnel) list.push({ id: 'od-conversions', label: 'Conversion funnel' })
    if (data?.marketing) list.push({ id: 'od-marketing', label: 'Marketing' })
    if (data?.studentHealth) list.push({ id: 'od-health', label: 'Student health' })
    return list
  }, [data])

  const shared = { data, classic, comparisons, summaries, rangeDays: range }

  return (
    <ReportIdsContext.Provider value={showIds}>
    <div className="pb-20">
      <header className="flex flex-wrap items-end justify-between gap-4 pb-6 pt-2">
        <div>
          <h1 className="text-[24px] font-extrabold leading-tight text-foreground">Studio performance</h1>
        </div>
        <div className="flex flex-wrap items-center gap-2.5">
          {isValidating && <span className="text-[11px] text-muted-foreground">Updating…</span>}
          <PeriodSelect value={range} onChange={setRange} />
        </div>
      </header>

      <SectionNav sections={sections} />

      {error && !data && (
        <div className="mt-6 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-destructive/30 bg-destructive/5 px-4 py-3">
          <p className="text-sm text-foreground">
            Couldn&apos;t load dashboard data.{' '}
            <span className="text-muted-foreground">{error.message || 'Please try again.'}</span>
          </p>
          <Button variant="outline" size="sm" className="h-8" onClick={() => refresh()}>
            Retry
          </Button>
        </div>
      )}

      {isLoading ? (
        <Skeleton />
      ) : (
        <>
          <ScorecardSection summaries={summaries} data={data} comparisons={comparisons} rangeDays={range} />
          {data?.revenue && <RevenueSection {...shared} />}
          {data?.lessons && (
            <>
              <LessonsSection {...shared} />
              <ForecastSection {...shared} />
              <CapacitySection {...shared} />
            </>
          )}
          {data?.funnel && <ConversionsSection {...shared} />}
          {data?.marketing && <MarketingSection {...shared} />}
          {data?.studentHealth && <StudentHealthSection {...shared} />}
          <NeedsFixingSection data={data} />

        </>
      )}
      <button
        type="button"
        onClick={() => setShowIds((v) => !v)}
        aria-pressed={showIds}
        className="fixed bottom-4 right-4 z-30 rounded-full border border-border bg-card px-3.5 py-2 text-[12px] font-semibold text-foreground shadow-lg hover:bg-muted"
      >
        {showIds ? 'Hide report IDs' : 'Show report IDs'}
      </button>
    </div>
    </ReportIdsContext.Provider>
  )
}
