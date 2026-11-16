'use client'

import { BadgeDollarSign, CalendarCheck, CalendarClock, Gauge, GraduationCap, ShoppingBag, Sparkles, Target, UserPlus, Users, Rocket } from 'lucide-react'
import { delta, pointDelta } from '@/lib/hooks/useOwnerDashboardPage'
import { DeltaPill, Emph, IdBadge, SectionHead, money, num, pct1 } from '../chrome'

/**
 * K-01 … K-11, in the order and with the labels of the Owner Dashboard spec.
 * Each card is one scalar from the owner-overview payload, with MoM / YoY pills
 * (percent for counts and money, percentage points for rates). Snapshot cards
 * (Booked %, Scheduled, Utilization of the live week) carry no pills.
 */
/** Percentage-point pill from a precomputed change (null → no pill). */
const ppPill = (v) => (v === null || v === undefined ? null : { pct: v, dir: v >= 0 ? 'up' : 'down', points: true, noBaseline: false })

function buildCards({ current, previous, lastYear }, { rates, report2 }) {
  // Scorecard rates use the latest cohort that has finished its window (spec), so
  // this month's value does not drop artificially at the start of the month.
  const rate = (key) => (rates || []).find((r) => r.key === key)?.latest || null
  const cohortPills = (key) => ({ mom: ppPill(rate(key)?.changePp), yoy: ppPill(rate(key)?.yoyPp) })
  const cohortValue = (key) => (rate(key) ? rate(key).ratePct : null)
  const cur = current || {}
  const prev = previous || {}
  const ly = lastYear || {}

  const value = (v, fmt) => (v === null || v === undefined ? null : fmt(v))
  const ratio = (key) => ({ mom: delta(cur[key], prev[key]), yoy: delta(cur[key], ly[key]) })
  const points = (key) => ({ mom: pointDelta(cur[key], prev[key]), yoy: pointDelta(cur[key], ly[key]) })

  return [
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
      note: rate('leadToIntro') ? `${num(rate('leadToIntro').converted)} of ${num(rate('leadToIntro').cohort)} leads booked an intro (${rate('leadToIntro').month})` : null,
      ...(rate('leadToIntro') ? cohortPills('leadToIntro') : points('leadToIntroPct')),
    },
    {
      id: 'K-06',
      label: 'Intro → First purchase',
      icon: ShoppingBag,
      value: value(cohortValue('introToPurchase') ?? cur.introToPurchasePct, pct1),
      href: 'od-conversions',
      note: report2 ? `Avg first purchase ${money(report2.avgSale)} · avg cash ${money(report2.avgCashAtSale)}` : null,
      ...(rate('introToPurchase') ? cohortPills('introToPurchase') : points('introToPurchasePct')),
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
      ...(rate('introToStarter') ? cohortPills('introToStarter') : points('introToStarterPct')),
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
          ? `Rest of week · ${num(cur.introsScheduledRestOfMonth)} more rest of month`
          : null,
    },
    {
      id: 'K-10',
      label: 'Lessons scheduled',
      icon: CalendarClock,
      value: value(cur.scheduledWeek, num),
      href: 'od-forecast',
      note: cur.confirmedPct !== null && cur.confirmedPct !== undefined ? `${pct1(cur.confirmedPct)} of them confirmed` : 'Confirmed lessons this week',
    },
    {
      id: 'K-11',
      label: 'Instructor utilization',
      icon: Gauge,
      value: value(cur.utilizationPct, (v) => pct1(v)),
      href: 'od-capacity',
      note:
        cur.actualPerWeek !== null && cur.capacityPerWeek
          ? `${cur.actualPerWeek} of ${num(cur.capacityPerWeek)} lessons per week`
          : null,
      ...points('utilizationPct'),
    },
  ]
}

function scrollTo(e, id) {
  const el = document.getElementById(id)
  if (!el) return
  e.preventDefault()
  el.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

function KpiCard({ card }) {
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
        <span className="ml-auto"><IdBadge id={card.id} /></span>
      </div>
      <p className="my-3 text-[30px] font-bold leading-none tabular-nums text-foreground">
        {card.value ?? <span className="text-muted-foreground/50">&mdash;</span>}
      </p>
      <div className="flex flex-wrap gap-1.5">
        <DeltaPill d={card.mom} label="MoM" />
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

export default function ScorecardSection({ summaries, data }) {
  const cards = buildCards(summaries, { rates: data?.funnel?.spec?.conversionRates, report2: data?.funnel?.spec?.reports?.report2 })

  return (
    <section id="od-scorecard" className="scroll-mt-32">
      <SectionHead
        number="01"
        title="Scorecard"
        tag="Are we growing?"
        subtitle="Every card jumps to the report behind it."
      />
      <div className="grid grid-cols-1 gap-[18px] min-[800px]:grid-cols-2 min-[1200px]:grid-cols-4">
        {cards.map((card) => (
          <KpiCard key={card.id} card={card} />
        ))}
      </div>
    </section>
  )
}
