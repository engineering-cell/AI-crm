'use client'

import { BadgeDollarSign, CalendarCheck, CalendarClock, Gauge, GraduationCap, ShoppingBag, Sparkles, Target, UserPlus, Users, Rocket } from 'lucide-react'
import { useState } from 'react'
import { comparisonWindows, delta, pointDelta, summarize } from '@/lib/hooks/useOwnerDashboardPage'
import { PeriodPicker, useCardData } from '../CardFrame'
import { DeltaPill, Emph, IdBadge, money, num, pct1 } from '../chrome'

/**
 * K-01 … K-11, in the order and with the labels of the Owner Dashboard spec.
 * Each card is one scalar from the owner-overview payload, with MoM / YoY pills
 * (percent for counts and money, percentage points for rates). Snapshot cards
 * (Booked %, Scheduled, Utilization of the live week) carry no pills.
 */
/** Percentage-point pill from a precomputed change (null → no pill). */

function buildCards({ current, previous, lastYear }, { rates, report2, snapshot }) {
  // Scorecard rates use the latest cohort that has finished its window (spec), so
  // this month's value does not drop artificially at the start of the month.
  const inRange = (key) => (rates || []).find((r) => r.key === key)?.range || null
  const cohortValue = (key) => (inRange(key) ? inRange(key).ratePct : null)
  const cur = current || {}
  const prev = previous || {}
  const ly = lastYear || {}

  const value = (v, fmt) => (v === null || v === undefined ? null : fmt(v))
  const ratio = (key) => ({ mom: delta(cur[key], prev[key]), yoy: delta(cur[key], ly[key]) })
  // Rate pills: percentage points between the two periods' rates, shown only when both periods had people to measure.
  const ratePts = (field) => {
    const cohortKey = field.replace('Pct', 'Cohort')
    const diff = (ref) => (ref?.[cohortKey] > 0 && cur[cohortKey] > 0 ? pointDelta(cur[field], ref[field]) : null)
    return { mom: diff(prev), yoy: diff(ly) }
  }
  const points = (key) => ({ mom: pointDelta(cur[key], prev[key]), yoy: pointDelta(cur[key], ly[key]) })

  const cards = [
    { id: 'K-01', label: 'Revenue', icon: BadgeDollarSign, value: value(cur.revenue, money), href: 'od-revenue', ...ratio('revenue') },
    { id: 'K-02', label: 'Lessons taught', icon: GraduationCap, value: value(cur.lessons, num), href: 'od-lessons', ...ratio('lessons') },
    { id: 'K-03', label: 'Leads', icon: UserPlus, value: value(cur.leads, num), href: 'od-conversions', ...ratio('leads') },
    { id: 'K-04', label: 'Intros taught', icon: Sparkles, value: value(cur.introsTaught, num), href: 'od-conversions', ...ratio('introsTaught') },
    {
      id: 'K-05',
      label: 'Lead → Intro',
      icon: Target,
      value: value(cohortValue('leadToIntro') ?? cur.leadToIntroPct, pct1),
      href: 'od-conversions',
      note: inRange('leadToIntro') ? `${num(inRange('leadToIntro').converted)} of ${num(inRange('leadToIntro').cohort)} leads converted` : null,
      ...ratePts('leadToIntroPct'),
    },
    {
      id: 'K-06',
      label: 'Intro → First purchase',
      icon: ShoppingBag,
      value: value(cohortValue('introToPurchase') ?? cur.introToPurchasePct, pct1),
      href: 'od-conversions',
      note: report2 ? `${num(report2.firstPurchases)} of ${num(report2.introsTaught)} bought · avg first purchase ${money(report2.avgSale)} · avg cash ${money(report2.avgCashAtSale)}` : null,
      ...ratePts('introToPurchasePct'),
    },
    {
      id: 'K-07',
      label: 'Intro → Starter',
      icon: Rocket,
      value: value(cohortValue('introToStarter') ?? cur.introToStarterPct, pct1),
      href: 'od-conversions',
      note:
        cur.startersSold !== null && cur.startersSold !== undefined
          ? `${num(cur.startersSold)} Starters sold · avg ${money(cur.avgStarterSale)}`
          : null,
      ...ratePts('introToStarterPct'),
    },
    {
      id: 'K-08',
      label: 'Booked %',
      icon: CalendarCheck,
      value: value(cur.bookedPct, pct1),
      href: 'od-health',
      note:
        cur.activeStudents !== null
          ? `${num(cur.bookedStudents)} booked of ${num(cur.activeStudents)} active · ${num(cur.activeStudents - cur.bookedStudents)} not booked`
          : null,
      ...points('bookedPct'),
    },
    {
      id: 'K-09',
      label: 'Intros scheduled',
      icon: CalendarClock,
      value: value(cur.introsScheduledWeek, num),
      href: 'od-forecast',
      note:
        cur.introsScheduledWeek !== null && cur.introsScheduledWeek !== undefined
          ? `${windowLabel(cur.scheduledWindow)} · ${num(cur.introsScheduledRestOfMonth)} more rest of month`
          : null,
    },
    {
      id: 'K-10',
      label: 'Lessons scheduled',
      icon: CalendarClock,
      value: value(cur.scheduledWeek, num),
      href: 'od-forecast',
      note: `${windowLabel(cur.scheduledWindow)}${cur.introsScheduledWeek !== null && cur.introsScheduledWeek !== undefined ? ` · + ${num(cur.introsScheduledWeek)} intros` : ''}`,
    },
    {
      id: 'K-11',
      label: 'Instructor utilization',
      icon: Gauge,
      value: value(cur.utilizationPct, (v) => pct1(v)),
      href: 'od-capacity',
      note:
        cur.availableHrs === 0 && cur.bookedHrsAll
          ? `${num(cur.bookedHrsAll)} hrs booked · availability not set for ${num(cur.unconfiguredInstructors)} instructors · ${windowLabel(cur.scheduledWindow)}`
          : cur.availableHrs !== null && cur.availableHrs !== undefined
          ? `${num(cur.bookedHrs)} of ${num(cur.availableHrs)} hrs booked · ${windowLabel(cur.scheduledWindow)}`
          : cur.actualPerWeek !== null && cur.capacityPerWeek
            ? `${cur.actualPerWeek} of ${num(cur.capacityPerWeek)} lessons per week`
            : null,
      ...points('utilizationPct'),
    },
  ]

  // "Right now" cards cannot be rebuilt for a past date, so their pills compare with the nightly snapshot
  // (spec 3.1): K-08 against the same date last month / last year, K-09 to K-11 against 4 weeks / 52 weeks ago.
  // No snapshot yet shows "—".
  const FROM_SNAPSHOT = {
    'K-08': { field: 'bookedPct', now: cur.bookedPct, mom: 'lastMonth', yoy: 'lastYear', points: true },
    'K-09': { field: 'scheduledIntrosWeek', now: cur.introsScheduledWeek, mom: 'weeks4', yoy: 'weeks52' },
    'K-10': { field: 'scheduledLessonsWeek', now: cur.scheduledWeek, mom: 'weeks4', yoy: 'weeks52' },
    'K-11': { field: 'utilizationPct', now: cur.utilizationPct, mom: 'weeks4', yoy: 'weeks52', points: true },
  }
  return cards.map((card) => {
    const m = FROM_SNAPSHOT[card.id]
    if (!m) return card
    const diff = (then) => (then === null || then === undefined ? null : m.points ? pointDelta(m.now, then) : delta(m.now, then))
    return { ...card, mom: diff(snapshot?.[m.mom]?.[m.field]), yoy: diff(snapshot?.[m.yoy]?.[m.field]) }
  })
}

/** "Rest of this week · 18–22 Nov": the dates the scheduled cards cover, so nobody reads them as month to date. */
function windowLabel(w) {
  if (!w?.from || !w?.to) return 'Rest of this week'
  const fmt = (v, opts) => new Date(v).toLocaleDateString('en-US', opts)
  const a = fmt(w.from, { day: 'numeric' })
  const b = fmt(w.to, { day: 'numeric', month: 'short' })
  return `${w.label || 'Rest of this week'} · ${a}–${b}`
}

function scrollTo(e, id) {
  const el = document.getElementById(id)
  if (!el) return
  e.preventDefault()
  el.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

function KpiCard({ card, picker }) {
  const Icon = card.icon || Users
  return (
    <a
      href={`#${card.href}`}
      onClick={(e) => scrollTo(e, card.href)}
      data-report-id={card.id}
      className="group block rounded-[20px] border border-border bg-card p-5 text-card-foreground shadow-sm transition-[box-shadow,border-color] hover:border-[color-mix(in_srgb,var(--studio-primary)_28%,hsl(var(--border)))] hover:shadow-md"
    >
      <div className="flex items-center gap-2.5">
        <span className="flex h-[34px] w-[34px] shrink-0 items-center justify-center rounded-[10px] bg-[#FBEEF4] text-[var(--studio-primary)] dark:bg-[color-mix(in_srgb,var(--studio-primary)_18%,transparent)]">
          <Icon className="h-4 w-4" aria-hidden />
        </span>
        <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-muted-foreground">{card.label}</p>
        <span className="ml-auto flex items-center gap-2">
          {picker && (
            // The dropdown sits inside the card link: stop it from also scrolling to the section.
            <span onClick={(e) => { e.preventDefault(); e.stopPropagation() }}>{picker}</span>
          )}
          <IdBadge id={card.id} />
        </span>
      </div>
      <p className="my-3 text-[30px] font-bold leading-none tabular-nums text-foreground">
        {card.value ?? <span className="text-muted-foreground/50">&mdash;</span>}
      </p>
      <div className="flex flex-wrap gap-1.5">
        {!card.yearOnly && <DeltaPill d={card.mom} label="vs prev" />}
        <DeltaPill d={card.yoy} label="YoY" />
      </div>
      {card.note && (
        <p className="mt-2.5 text-[12.5px] leading-snug text-muted-foreground">
          <Emph>{card.note}</Emph>
        </p>
      )}
    </a>
  )
}

/** Spec 3.1, period type A: these cards follow the page range, and the card's own dropdown overrides it. */
const RANGE_CARDS = new Set(['K-01', 'K-02', 'K-03', 'K-04', 'K-05', 'K-06', 'K-07'])

function ScorecardItem({ id, summaries, data, comparisons }) {
  const [override, setOverride] = useState(null)
  const own = useCardData(override, data, comparisons)
  const src = override ? own.data : data
  const summ = override
    ? { current: summarize(own.data), previous: summarize(own.comparisons?.previous), lastYear: summarize(own.comparisons?.lastYear) }
    : summaries
  const card = buildCards(summ, {
    rates: src?.funnel?.spec?.conversionRates,
    report2: src?.funnel?.spec?.reports?.report2,
    snapshot: data?.snapshotCompare,
  }).find((c) => c.id === id)
  const yearOnly = override ? !comparisonWindows(override).priorPeriod : summaries?.yearOnly
  const picker = RANGE_CARDS.has(id) ? <PeriodPicker title={card.label} override={override} setOverride={setOverride} /> : null
  return <KpiCard card={{ ...card, yearOnly }} picker={picker} />
}

export default function ScorecardSection({ summaries, data, comparisons }) {
  const ids = buildCards(summaries, { rates: data?.funnel?.spec?.conversionRates, report2: data?.funnel?.spec?.reports?.report2, snapshot: data?.snapshotCompare }).map((c) => c.id)

  return (
    <section id="od-scorecard" className="scroll-mt-32">
      <div className="grid grid-cols-1 gap-[18px] min-[800px]:grid-cols-2 min-[1200px]:grid-cols-4">
        {ids.map((id) => (
          <ScorecardItem key={id} id={id} summaries={summaries} data={data} comparisons={comparisons} />
        ))}
      </div>
    </section>
  )
}
