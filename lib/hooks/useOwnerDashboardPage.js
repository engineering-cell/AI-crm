'use client'

import { useMemo } from 'react'
import { isNamedRange, namedComparison } from '@/lib/dashboardRanges'
import { useOwnerDashboardOverview, useDashboardOverview } from './useAnalyticsOverview'

const DAY_MS = 24 * 60 * 60 * 1000

/**
 * Normalises either supported range shape (a number of days, or a
 * { from, to } YYYY-MM-DD pair) into concrete Date bounds so we can derive
 * the two comparison windows from it.
 */
function resolveWindow(range) {
  const to = new Date()
  const from = new Date(to.getTime() - (Number(range) || 30) * DAY_MS)
  return { from, to }
}

const DATE_ONLY = /^\d{4}-\d{2}-\d{2}$/

/** 'YYYY-MM-DD' shifted by whole calendar days/years (plain date arithmetic, no timezone). */
function shiftDate(dateStr, { days = 0, years = 0 } = {}) {
  const [y, m, d] = dateStr.split('-').map(Number)
  return new Date(Date.UTC(y - years, m - 1, d - days)).toISOString().slice(0, 10)
}

/**
 * The two comparison windows behind every MoM / YoY badge on this page:
 *
 *  - prior period — the same number of days immediately before the current
 *    window (so a 30-day view compares against the previous 30 days).
 *  - prior year   — the exact same calendar window, one year earlier.
 *
 * Both are plain owner-overview calls with explicit { from, to } bounds, so
 * they hit the same endpoint, the same SWR cache, and the same permission
 * filtering as the primary request — no new backend surface is needed.
 */
export function comparisonWindows(range) {
  // Named ranges follow spec 3.3 (see namedComparison). Month / quarter / year to date are the same ranges as This month,
  // This quarter and This year, so they compare the same way: whole days at the start of the previous period.
  const TO_DATE_NAMES = { mtd: 'this_month', qtd: 'this_quarter', ytd: 'this_year' }
  if (TO_DATE_NAMES[range]) return namedComparison(TO_DATE_NAMES[range])
  // Today keeps the same-hours-yesterday behaviour below.
  if (range === 'today') range = 0
  else if (isNamedRange(range)) return namedComparison(range)
  // Calendar periods compare like-for-like: MoM = same days of the previous month, YoY = same dates a year earlier.
  if (range === 'mtd' || range === 'qtd' || range === 'ytd') {
    return {
      priorPeriod: { period: range, offsetMonths: 1 },
      priorYear: { period: range, offsetYears: 1 },
    }
  }
  // Calendar-based ranges are compared by calendar, and the backend places them on
  // the studio's days: today vs the same hours yesterday / last year, and a picked
  // date range vs the equally long run of days before it / a year earlier.
  if (range === 0) {
    return {
      priorPeriod: { period: 'today', offsetDays: 1 },
      priorYear: { period: 'today', offsetYears: 1 },
    }
  }
  if (range && typeof range === 'object' && DATE_ONLY.test(range.from) && DATE_ONLY.test(range.to)) {
    const lengthDays = Math.round((Date.parse(range.to) - Date.parse(range.from)) / DAY_MS) + 1
    const priorTo = shiftDate(range.from, { days: 1 })
    return {
      priorPeriod: { from: shiftDate(priorTo, { days: lengthDays - 1 }), to: priorTo },
      priorYear: { from: shiftDate(range.from, { years: 1 }), to: shiftDate(range.to, { years: 1 }) },
    }
  }

  const { from, to } = resolveWindow(range)
  const lengthMs = to.getTime() - from.getTime()

  // Exact timestamps, not whole days: the prior period must be the same length
  // as the current window and end the instant before it starts (the old
  // day-rounded bounds left a gap and a different length, skewing every MoM).
  // "Today" is shorter than a day, so it compares against the same hours
  // yesterday rather than the few hours just before midnight.
  const shiftMs = lengthMs + 1
  const prevFrom = new Date(from.getTime() - shiftMs)
  const prevTo = new Date(to.getTime() - shiftMs)

  const yearFrom = new Date(from)
  yearFrom.setFullYear(yearFrom.getFullYear() - 1)
  const yearTo = new Date(to)
  yearTo.setFullYear(yearTo.getFullYear() - 1)

  return {
    priorPeriod: { from: prevFrom.toISOString(), to: prevTo.toISOString() },
    priorYear: { from: yearFrom.toISOString(), to: yearTo.toISOString() },
  }
}

const sum = (rows, key) => (rows || []).reduce((acc, r) => acc + (Number(r?.[key]) || 0), 0)

/**
 * Flattens one owner-overview payload into the scalar headline metrics the
 * scorecard compares period-over-period. Returns `null` for a metric whose
 * section the caller has no permission for, so a missing section reads as
 * "hidden", never as a real zero.
 */
export function summarize(data) {
  if (!data) return null
  const { revenue, lessons, funnel, studentHealth } = data
  const rateOf = (key) => funnel?.spec?.conversionRates?.find((r) => r.key === key)?.range || null

  const utilization = (lessons?.instructorUtilization || []).filter((t) => t.weeklyCapacity > 0)
  const hoursWeek = lessons?.spec?.instructorWeek?.org || null
  const capacityPerWeek = sum(utilization, 'weeklyCapacity')
  const actualPerWeek = sum(utilization, 'actualPerWeek')

  return {
    // Prefer the backend's de-duplicated totals: summing the per-studio rows
    // double-counts anything attached to more than one studio. The sum is only a
    // fallback for an older backend that doesn't send them.
    revenue: revenue ? revenue.total ?? sum(revenue.byStudio, 'revenue') : null,
    outstanding: revenue ? Number(revenue.totalOutstanding) || 0 : null,
    lessons: lessons ? lessons.total ?? sum(lessons.byStudio, 'count') : null,
    scheduled: lessons ? lessons.scheduledTotal ?? sum(lessons.forecastByStudio, 'scheduled') : null,
    // Spec K-09 / K-10: confirmed lessons from now to Sunday, plus intros.
    scheduledWindow: lessons?.scheduledThisWeek?.window || null,
    scheduledWeek: lessons?.scheduledThisWeek ? Number(lessons.scheduledThisWeek.total) || 0 : null,
    confirmedPct: lessons?.scheduledThisWeek?.confirmedPct ?? null,
    introsScheduledWeek: lessons?.scheduledThisWeek ? Number(lessons.scheduledThisWeek.introsThisWeek) || 0 : null,
    introsScheduledRestOfMonth: lessons?.scheduledThisWeek ? Number(lessons.scheduledThisWeek.introsRestOfMonth) || 0 : null,
    scheduledToday: lessons ? Number(lessons.scheduledToday) || 0 : null,
    // Unique people (phone, then email), spam/invalid/duplicate excluded; the old count is only a fallback.
    leads: funnel ? Number(funnel.spec?.reports?.report1?.uniqueLeads ?? funnel.report1?.leadCount) || 0 : null,
    introsBooked: funnel?.report1 ? Number(funnel.report1.introBookedCount) || 0 : null,
    convertedLeads: funnel?.report1 ? Number(funnel.report1.convertedCount) || 0 : null,
    // Intro lessons marked completed in the window. report2.introCount (this
    // window's new leads who attended) is only a fallback for an older backend.
    introsTaught: funnel ? Number(funnel.introsTaught ?? funnel.report2?.introCount) || 0 : null,
    firstPurchases: funnel?.report2 ? Number(funnel.report2.firstPurchaseCount) || 0 : null,
    // Window-based rates only exist in legacy mode; the scorecard uses the finished-cohort rates instead.
    // The three headline rates come from the range cohort (selected dates), with the number of people behind each, so a
    // comparison with an empty previous period shows "—" rather than a made-up change.
    leadToIntroPct: rateOf('leadToIntro')?.ratePct ?? (funnel?.report1?.ratePct !== undefined ? Number(funnel.report1.ratePct) || 0 : null),
    leadToIntroCohort: rateOf('leadToIntro')?.cohort ?? null,
    introToPurchasePct: rateOf('introToPurchase')?.ratePct ?? (funnel?.report2?.ratePct !== undefined ? Number(funnel.report2.ratePct) || 0 : null),
    introToPurchaseCohort: rateOf('introToPurchase')?.cohort ?? null,
    // K-07: Intro → Starter (cohort = intros taught in the period).
    introToStarterPct: rateOf('introToStarter')?.ratePct ?? (funnel?.introToStarter ? Number(funnel.introToStarter.ratePct) || 0 : null),
    introToStarterCohort: rateOf('introToStarter')?.cohort ?? null,
    startersSold: funnel?.introToStarter ? Number(funnel.introToStarter.startersSold) || 0 : null,
    avgStarterSale: funnel?.introToStarter ? Number(funnel.introToStarter.avgStarterSale) || 0 : null,
    introsTakenForStarter: funnel?.introToStarter ? Number(funnel.introToStarter.introsTaught) || 0 : null,
    activeStudents: studentHealth ? Number(studentHealth.totals?.active) || 0 : null,
    bookedStudents: studentHealth ? Number(studentHealth.totals?.booked) || 0 : null,
    bookedPct: studentHealth ? Number(studentHealth.totals?.bookedPct) || 0 : null,
    // Weighted, not a mean of percentages — one 8-lesson teacher shouldn't
    // swing the org number as hard as one 40-lesson teacher.
    // K-11 = R-13: booked hours / available hours for the studio week (spec 5.1). The lessons-per-week figure is only a fallback.
    utilizationPct: lessons ? (hoursWeek ? hoursWeek.utilizationPct ?? null : capacityPerWeek ? Math.round((actualPerWeek / capacityPerWeek) * 100) : null) : null,
    bookedHrs: hoursWeek ? hoursWeek.bookedHrs ?? null : null,
    availableHrs: hoursWeek ? hoursWeek.availableHrs ?? null : null,
    bookedHrsAll: hoursWeek ? hoursWeek.bookedHrsAll ?? null : null,
    unconfiguredInstructors: hoursWeek ? hoursWeek.unconfiguredInstructors ?? null : null,
    capacityPerWeek: lessons ? capacityPerWeek : null,
    actualPerWeek: lessons ? Math.round(actualPerWeek * 10) / 10 : null,
  }
}

/**
 * Percent change with the same "no baseline" semantics the backend's pctTrend()
 * uses — growth from zero is undefined, so callers render "New" rather than a
 * fabricated 100%.
 */
export function delta(current, previous) {
  if (current === null || current === undefined || previous === null || previous === undefined) return null
  const cur = Number(current) || 0
  const prev = Number(previous) || 0
  if (!prev) return cur ? { pct: null, dir: 'up', noBaseline: true } : null
  const pct = ((cur - prev) / Math.abs(prev)) * 100
  return { pct, dir: pct >= 0 ? 'up' : 'down', noBaseline: false }
}

/** Percentage-point change, for metrics that are already percentages. */
export function pointDelta(current, previous) {
  if (current === null || current === undefined || previous === null || previous === undefined) return null
  const diff = (Number(current) || 0) - (Number(previous) || 0)
  return { pct: diff, dir: diff >= 0 ? 'up' : 'down', points: true, noBaseline: false }
}

/**
 * Everything the Owner Dashboard page renders, in one hook.
 *
 * Three owner-overview reads (current / prior period / prior year) power the
 * page body plus every comparison badge, and one dashboard-overview read
 * supplies the series that only live there: the 12-month revenue history
 * (`aiAgentRevenue`), lead source economics (`leadsBySourceConversion`) and
 * leads per studio (`perStudioBreakdown`).
 *
 * Each section is independently permission-gated on the backend, so any of
 * these can legitimately come back absent — consumers must treat a missing
 * key as "not visible to this user", not as empty data.
 */
export function useOwnerDashboardPage(range) {
  const { priorPeriod, priorYear } = useMemo(() => comparisonWindows(range), [range])

  const current = useOwnerDashboardOverview(range, { prior: priorPeriod, yoy: priorYear })
  const previous = useOwnerDashboardOverview(priorPeriod ?? 'mtd', { compare: true, enabled: Boolean(priorPeriod) })
  const lastYear = useOwnerDashboardOverview(priorYear, { compare: true })
  const classic = useDashboardOverview(range)

  const summaries = useMemo(
    () => ({
      current: summarize(current.data),
      previous: summarize(previous.data),
      lastYear: summarize(lastYear.data),
      // This year / Last year compare year-on-year only (spec 3.3), so the "vs prev" pill is hidden.
      yearOnly: !priorPeriod,
    }),
    [current.data, previous.data, lastYear.data, priorPeriod]
  )

  return {
    data: current.data,
    classic: classic.data,
    summaries,
    // Raw comparison payloads, for panels that need per-row (per studio, per
    // teacher) growth rather than a single org-wide scalar.
    comparisons: { previous: priorPeriod ? previous.data : undefined, lastYear: lastYear.data },
    error: current.error,
    // Only the primary read blocks first paint. The comparison reads and the
    // classic-overview read fill in their badges/charts as they land, so a slow
    // secondary request never holds the whole page on a skeleton.
    isLoading: current.isLoading && !current.data,
    isValidating: current.isValidating || previous.isValidating || lastYear.isValidating,
    refresh: current.mutate,
  }
}
