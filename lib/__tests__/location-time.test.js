import { describe, it, expect } from 'vitest'
import {
  callbackDayKey,
  callbackInputValue,
  compareToTodayInTz,
  dayKeyInTz,
  diffDayKeys,
  formatDayKey,
  isCallbackOverdue,
  pickTimezone,
} from '../location-time'

// 2026-11-19 20:00 in New York (EST, UTC-5) == 2026-11-20 01:00Z == 2026-11-20 06:30 in Kolkata.
const NOW = new Date('2026-11-20T01:00:00Z')
const NY = 'America/New_York'
const IN = 'Asia/Kolkata'

describe('location-time (runs under any machine TZ)', () => {
  it('reported case: Nov 20 callback is Upcoming for a New York location, Today for India', () => {
    const cb = '2026-11-20T00:00:00.000Z' // date-only legacy value
    expect(compareToTodayInTz(cb, NY, NOW)).toMatchObject({ dayKey: '2026-11-20', diffDays: 1, status: 'upcoming' })
    expect(compareToTodayInTz(cb, IN, NOW)).toMatchObject({ dayKey: '2026-11-20', diffDays: 0, status: 'today' })
  })

  it('the same instant is a different day per location tz', () => {
    expect(dayKeyInTz(NOW, NY)).toBe('2026-11-19')
    expect(dayKeyInTz(NOW, IN)).toBe('2026-11-20')
    expect(dayKeyInTz(NOW, 'Pacific/Auckland')).toBe('2026-11-20')
  })

  it('noon-of-day instants stored by the backend keep their studio day', () => {
    // noon Nov 20 in Auckland (UTC+13) == Nov 19 23:00Z; noon in NY == 17:00Z
    expect(callbackDayKey('2026-11-19T23:00:00.000Z', 'Pacific/Auckland')).toBe('2026-11-20')
    expect(callbackDayKey('2026-11-20T17:00:00.000Z', NY)).toBe('2026-11-20')
    expect(callbackInputValue({ callbackDate: '2026-11-19T23:00:00.000Z', locationTimezone: 'Pacific/Auckland' })).toBe('2026-11-20')
  })

  it('backend callbackDayKey wins for date inputs', () => {
    expect(callbackInputValue({ callbackDayKey: '2026-11-21', callbackDate: '2026-11-20T00:00:00.000Z' })).toBe('2026-11-21')
    expect(callbackInputValue(null)).toBe('')
  })

  it('end-of-day and start-of-day edges', () => {
    expect(dayKeyInTz('2026-11-20T04:59:59.999Z', NY)).toBe('2026-11-19') // 23:59:59 EST
    expect(dayKeyInTz('2026-11-20T05:00:00.000Z', NY)).toBe('2026-11-20') // midnight EST
  })

  it('DST transitions', () => {
    // US spring forward 2026-03-08 (EST->EDT): 04:59Z is still Mar 7 23:59 EST? no: 05:00Z = midnight EST Mar 8
    expect(dayKeyInTz('2026-03-08T04:59:59Z', NY)).toBe('2026-03-07')
    expect(dayKeyInTz('2026-03-08T05:00:00Z', NY)).toBe('2026-03-08')
    // Fall back 2026-11-01: midnight EDT = 04:00Z
    expect(dayKeyInTz('2026-11-01T03:59:59Z', NY)).toBe('2026-10-31')
    expect(dayKeyInTz('2026-11-01T04:00:00Z', NY)).toBe('2026-11-01')
    expect(diffDayKeys('2026-03-07', '2026-03-09')).toBe(2)
    expect(diffDayKeys('2026-10-31', '2026-11-02')).toBe(2)
  })

  it('overdue/today/upcoming relative to the location', () => {
    expect(compareToTodayInTz('2026-11-19', NY, NOW).status).toBe('today')
    expect(compareToTodayInTz('2026-11-18', NY, NOW).status).toBe('overdue')
    expect(isCallbackOverdue({ callbackDate: '2026-11-19T00:00:00.000Z', locationTimezone: IN }, null, NOW)).toBe(true)
    expect(isCallbackOverdue({ callbackDate: '2026-11-19T00:00:00.000Z', locationTimezone: NY }, null, NOW)).toBe(false)
    expect(isCallbackOverdue({ callbackDate: 'x', callbackStatus: 'overdue' })).toBe(true)
  })

  it('tz-less rows: non-midnight instant reads as its UTC date when no studio tz is set', () => {
    expect(callbackInputValue({ callbackDate: '2026-11-19T23:00:00.000Z' })).toBe('2026-11-19')
  })

  it('formatDayKey never shifts the day', () => {
    expect(formatDayKey('2026-11-19')).toBe('Nov 19, 2026')
    expect(formatDayKey('bad')).toBe('')
  })

  it('pickTimezone skips invalid zones', () => {
    expect(pickTimezone('Nope/Zone', null, NY)).toBe(NY)
    expect(pickTimezone()).toBeNull()
  })
})
