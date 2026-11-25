import { describe, it, expect } from 'vitest'
import { namedRangeDates, isNamedRange } from '../dashboardRanges'
import { rangeQuery } from '../hooks/useAnalyticsOverview'
import { comparisonWindows } from '../hooks/useOwnerDashboardPage'

const wed = new Date(2026, 10, 18) // Wed 18 Nov 2026
describe('named ranges', () => {
  it('maps names to studio-calendar dates (week starts Monday)', () => {
    expect(namedRangeDates('this_week', wed)).toEqual({ from: '2026-11-16', to: '2026-11-18' })
    expect(namedRangeDates('last_week', wed)).toEqual({ from: '2026-11-09', to: '2026-11-15' })
    expect(namedRangeDates('next_week', wed)).toEqual({ from: '2026-11-23', to: '2026-11-29' })
    expect(namedRangeDates('last_month', wed)).toEqual({ from: '2026-10-01', to: '2026-10-31' })
    expect(namedRangeDates('next_quarter', wed)).toEqual({ from: '2027-01-01', to: '2027-03-31' })
    expect(namedRangeDates('last_year', wed)).toEqual({ from: '2025-01-01', to: '2025-12-31' })
    expect(namedRangeDates('tomorrow', wed)).toEqual({ from: '2026-11-19', to: '2026-11-19' })
  })
  it('sends the name to the backend and compares like a date range', () => {
    expect(isNamedRange('this_quarter')).toBe(true)
    expect(rangeQuery('last_quarter')).toBe('range=last_quarter')
    expect(comparisonWindows('last_month').priorPeriod).toHaveProperty('from')
  })
})

import { namedComparison, rangeCaption } from '../dashboardRanges'
describe('comparison windows (spec 3.3)', () => {
  it('to-date ranges compare the same days at the start of the previous period', () => {
    const c = namedComparison('this_month', new Date(2026, 10, 16))
    expect(c.priorPeriod).toEqual({ from: '2026-10-01', to: '2026-10-16' })
    expect(c.priorYear).toEqual({ from: '2025-11-01', to: '2025-11-16' })
    expect(namedComparison('this_month', new Date(2026, 2, 31)).priorPeriod).toEqual({ from: '2026-02-01', to: '2026-02-28' })
  })
  it('whole periods compare with the whole period before; years are year-on-year only', () => {
    const wed = new Date(2026, 10, 18)
    expect(namedComparison('last_month', wed).priorPeriod).toEqual({ from: '2026-09-01', to: '2026-09-30' })
    expect(namedComparison('last_week', wed).priorPeriod).toEqual({ from: '2026-11-02', to: '2026-11-08' })
    expect(namedComparison('last_quarter', wed).priorPeriod).toEqual({ from: '2026-04-01', to: '2026-06-30' })
    expect(namedComparison('yesterday', wed).priorPeriod).toEqual({ from: '2026-11-16', to: '2026-11-16' })
    expect(namedComparison('this_year', wed).priorPeriod).toBeNull()
    expect(namedComparison('last_year', wed).priorYear).toEqual({ from: '2024-01-01', to: '2024-12-31' })
  })
  it('prints the covered dates', () => {
    expect(rangeCaption('this_month', new Date(2026, 10, 16))).toBe('1–16 Nov 2026')
    expect(rangeCaption({ from: '2026-10-28', to: '2026-11-03' })).toBe('28 Oct – 3 Nov 2026')
  })
})
