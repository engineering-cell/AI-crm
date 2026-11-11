import { describe, it, expect } from 'vitest'
import {
  summarizeUnpaidLessons,
  describeUnpaidLessons,
  membershipCoverageFor,
  resolveEventPayment,
  isPayableLesson,
} from '../event-payment'

const ME = 'cust-me'
const DAY = 86400000
let n = 0
const ev = (over = {}) => ({
  _id: `e${++n}`,
  type: 'lesson',
  status: 'completed',
  startDateTime: new Date(Date.now() - 3 * DAY).toISOString(),
  endDateTime: new Date(Date.now() - 3 * DAY + 3600000).toISOString(),
  customerIDs: [ME],
  charges: [],
  chargeMethod: 'none',
  calendarServiceID: { serviceCode: 'GRP', serviceName: 'Group Class', isChargeable: true, price: 28 },
  ...over,
})
const paidByCredits = (customerID = ME) => ({ chargeMethod: 'credits', charges: [{ method: 'credits', customerID }] })
const count = (events, extra = {}) => summarizeUnpaidLessons(events, { customerID: ME, ...extra })

describe('summarizeUnpaidLessons', () => {
  it('counts unpaid group classes and unpaid private lessons separately', () => {
    const r = count([ev(), ev(), ev(), ev({ type: 'private' }), ev({ type: 'private' })])
    expect(r).toEqual({ total: 5, group: 3, private: 2 })
  })

  it('does not count a lesson that is paid for', () => {
    expect(count([ev(paidByCredits()), ev()]).total).toBe(1)
  })

  it("judges THIS student's charge — a classmate who paid does not cover them", () => {
    const shared = ev({ customerIDs: [ME, 'cust-other'], charges: [{ method: 'credits', customerID: 'cust-other' }], chargeMethod: 'credits' })
    expect(count([shared]).group).toBe(1)
    expect(summarizeUnpaidLessons([shared], { customerID: 'cust-other' }).total).toBe(0)
  })

  it('counts an unallocated booking (no package, membership or credits)', () => {
    expect(count([ev({ type: 'private', status: 'scheduled', startDateTime: new Date(Date.now() + 2 * DAY).toISOString(), endDateTime: new Date(Date.now() + 2 * DAY + 3600000).toISOString(), allocation: { status: 'unallocated' } })]).private).toBe(1)
  })

  it('does not count a lesson an active membership covers', () => {
    const cover = membershipCoverageFor(ME, [{ status: 'active', services: [{ serviceCode: 'GRP' }] }])
    expect(count([ev()], { membershipCoverageSet: cover }).total).toBe(0)
    const expired = membershipCoverageFor(ME, [{ status: 'cancelled', services: [{ serviceCode: 'GRP' }] }])
    expect(count([ev()], { membershipCoverageSet: expired }).total).toBe(1)
  })

  describe('left out because "no charge record" is legitimate for them', () => {
    it.each([
      ['a to-do', { type: 'event' }],
      ['a to-do linked to the catalog', { type: 'lesson', todoID: 't1' }],
      ['a record', { type: 'record' }],
      ['a trial', { type: 'trial' }],
      ['an event with no type (not a private or group lesson)', { type: undefined }],
      ['a non-chargeable service', { calendarServiceID: { serviceCode: 'FREE', isChargeable: false } }],
      ['a cancellation with no charge', { status: 'cancelled_no_charge' }],
      ['a no-show with no charge', { status: 'no_show_no_charge' }],
      ['a temporary slot hold', { status: 'held' }],
      ['a comped lesson', { allocation: { status: 'unallocated', overriddenBy: 'u1' } }],
      ['a lesson imported from the old system', { importBatchID: 'batch1' }],
    ])('%s', (_name, over) => {
      expect(count([ev(over)]).total).toBe(0)
    })
  })

  it('still counts a late-cancel or no-show that WAS charged but not paid', () => {
    expect(count([ev({ status: 'cancelled_charged' }), ev({ status: 'no_show_charged' })]).total).toBe(2)
  })

  it('counts an unpaid lesson from years ago (no date cut-off)', () => {
    const old = ev({ startDateTime: '2019-03-01T10:00:00Z', endDateTime: '2019-03-01T11:00:00Z' })
    expect(count([old]).group).toBe(1)
  })

  it('agrees with resolveEventPayment for every lesson it counts', () => {
    const events = [ev(), ev(paidByCredits()), ev({ type: 'private' })]
    const unpaid = events.filter((e) => !resolveEventPayment(e, { customerID: ME }).paid).length
    expect(count(events).total).toBe(unpaid)
  })

  it('handles no events', () => {
    expect(count([])).toEqual({ total: 0, group: 0, private: 0 })
  })
})

describe('isPayableLesson — only private and group lessons have a Paid/Unpaid status', () => {
  it('is true for a group lesson and a private lesson', () => {
    expect(isPayableLesson(ev({ type: 'lesson' }))).toBe(true)
    expect(isPayableLesson(ev({ type: 'private' }))).toBe(true)
  })
  it.each([
    ['a to-do', { type: 'event' }],
    ['a to-do made from the catalog', { type: 'lesson', todoID: 't1' }],
    ['a record', { type: 'record' }],
    ['a trial', { type: 'trial' }],
    ['a non-chargeable service', { calendarServiceID: { isChargeable: false } }],
    ['a comped lesson', { allocation: { overriddenBy: 'u1' } }],
  ])('is false for %s', (_n, over) => {
    expect(isPayableLesson(ev(over))).toBe(false)
  })
  it('is false for nothing', () => {
    expect(isPayableLesson(null)).toBe(false)
    expect(isPayableLesson(undefined)).toBe(false)
  })
})

describe('describeUnpaidLessons', () => {
  it('words the counts the way the studio said it', () => {
    expect(describeUnpaidLessons({ group: 3, private: 2, other: 0 })).toBe('3 unpaid group classes · 2 unpaid private lessons')
  })
  it('uses the singular for one', () => {
    expect(describeUnpaidLessons({ group: 1, private: 1 })).toBe('1 unpaid group class · 1 unpaid private lesson')
  })
  it('is null when nothing is owed, so the row looks exactly as before', () => {
    expect(describeUnpaidLessons({ group: 0, private: 0 })).toBeNull()
    expect(describeUnpaidLessons()).toBeNull()
  })
})
