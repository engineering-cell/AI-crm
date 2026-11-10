import { describe, it, expect, beforeEach } from 'vitest'
import {
  subscribeTerminalCharges,
  trackPendingReaderCharge,
  untrackTerminalCharge,
} from '../terminalCharge'

let current = []
subscribeTerminalCharges((c) => { current = c })

const reader = { _id: 'p1', amount: 40, method: 'terminal', status: 'pending' }

describe('trackPendingReaderCharge', () => {
  beforeEach(() => current.forEach((c) => untrackTerminalCharge(c.id)))

  it('tracks the payment from POST /api/payment (pending + payment)', () => {
    trackPendingReaderCharge({ pending: true, payment: reader })
    expect(current).toEqual([{ id: 'p1', amount: 40, label: null }])
  })

  it('tracks a nested terminalPayment from package / plan / intro flows', () => {
    trackPendingReaderCharge({ terminalPayment: reader })
    expect(current.map((c) => c.id)).toEqual(['p1'])
  })

  it('does not track the same payment twice', () => {
    trackPendingReaderCharge({ pending: true, payment: reader })
    trackPendingReaderCharge({ pending: true, payment: reader })
    expect(current).toHaveLength(1)
  })

  it('ignores a saved-card charge (nobody is at a reader)', () => {
    trackPendingReaderCharge({ pending: true, payment: { ...reader, method: 'saved_card' } })
    expect(current).toHaveLength(0)
  })

  it('ignores an already-completed Clover device charge', () => {
    trackPendingReaderCharge({ payment: { ...reader, status: 'completed' } })
    expect(current).toHaveLength(0)
  })

  it('ignores responses with no payment', () => {
    trackPendingReaderCharge(undefined)
    trackPendingReaderCharge({ plan: {} })
    expect(current).toHaveLength(0)
  })
})
