import { describe, it, expect } from 'vitest'
import { resolveEventPayment } from '../event-payment'

const base = (over) => ({
  _id: 'x', type: 'private', startDateTime: '2020-01-01T10:00:00Z', endDateTime: '2020-01-01T11:00:00Z',
  customerIDs: ['c'], charges: [], chargeMethod: 'direct', ...over,
})

describe('no-charge outcomes read Unpaid', () => {
  for (const status of ['no_show_no_charge', 'cancelled_no_charge', 'no_show', 'cancelled']) {
    it(`${status} is unpaid even with a charge record or stale payment.collected`, () => {
      expect(resolveEventPayment(base({ status })).paid).toBe(false)
      expect(resolveEventPayment(base({ status, chargeMethod: 'credits' })).paid).toBe(false)
      expect(resolveEventPayment(base({ status, payment: { collected: true } })).paid).toBe(false)
    })
  }
  it('package-method no-show is unpaid', () => {
    const ev = base({ status: 'no_show_no_charge', chargeMethod: 'package',
      charges: [{ method: 'package', customerID: 'c' }] })
    expect(resolveEventPayment(ev).paid).toBe(false)
  })
  it('group event judged per student is unpaid', () => {
    const ev = base({ type: 'lesson', status: 'no_show_no_charge', customerIDs: ['c', 'd'],
      charges: [{ method: 'direct', customerID: 'c' }, { method: 'direct', customerID: 'd' }] })
    expect(resolveEventPayment(ev, { customerID: 'c' }).paid).toBe(false)
  })
  it('charged outcomes and completed keep paid', () => {
    for (const status of ['no_show_charged', 'cancelled_charged', 'completed'])
      expect(resolveEventPayment(base({ status })).paid).toBe(true)
  })
})
