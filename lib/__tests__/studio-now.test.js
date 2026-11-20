import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { studioNow } from '../studioLocalDate'

// The calendar draws the lesson cards in the studio's wall-clock time, so its red "now" line
// must be the studio's wall clock too, whatever timezone the browser runs in. Run this file
// with TZ=Asia/Kolkata / America/New_York / America/Chicago / Pacific/Auckland to prove it.
describe('studioNow', () => {
  beforeEach(() => {
    vi.useFakeTimers()
    vi.setSystemTime(new Date('2026-11-19T20:35:00Z'))
  })
  afterEach(() => vi.useRealTimers())

  it('reads 3:35 PM for a New York studio, regardless of the browser timezone', () => {
    const d = studioNow('America/New_York')
    expect([d.getFullYear(), d.getMonth() + 1, d.getDate(), d.getHours(), d.getMinutes()]).toEqual([2026, 11, 19, 15, 35])
  })

  it('reads 2:35 PM for a Chicago studio and 10:35 AM the next day for Guam', () => {
    const c = studioNow('America/Chicago')
    expect([c.getHours(), c.getMinutes()]).toEqual([14, 35])
    const g = studioNow('Pacific/Guam')
    expect([g.getDate(), g.getHours(), g.getMinutes()]).toEqual([20, 6, 35])
  })

  it('with no studio timezone it is just the current time', () => {
    expect(studioNow(null).getTime()).toBe(Date.now())
  })
})
