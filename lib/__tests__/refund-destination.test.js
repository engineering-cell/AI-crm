import { describe, it, expect } from 'vitest'
import { defaultRefundDestination } from '../refund-destination'

describe('defaultRefundDestination', () => {
  it('sends card-taken money back to the card', () => {
    for (const method of ['card', 'terminal', 'saved_card', 'online', 'ach']) {
      expect(defaultRefundDestination(method)).toBe('card')
    }
  })
  it('keeps cash and wallet where they came from', () => {
    expect(defaultRefundDestination('cash')).toBe('cash')
    expect(defaultRefundDestination('wallet')).toBe('wallet')
  })
  it('makes staff choose when there is no safe guess', () => {
    for (const method of ['cheque', 'other', undefined]) {
      expect(defaultRefundDestination(method)).toBe('')
    }
  })
})
