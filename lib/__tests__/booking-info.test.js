import { describe, it, expect } from 'vitest'
import { describeBooking, escapeHtml } from '../booking-info'

describe('describeBooking', () => {
  it('uses the populated staff login and the booking time', () => {
    const r = describeBooking({
      createdAt: '2026-11-17T09:14:00Z',
      createdBy: { name: 'Olivia Owner', email: 'o@x.test', role: 'superadmin' },
      createdVia: 'staff',
    })
    expect(r).toEqual({ by: 'Olivia Owner', email: 'o@x.test', role: 'superadmin', at: '2026-11-17T09:14:00Z' })
  })
  it('labels bookings with no staff login by how they were made', () => {
    expect(describeBooking({ createdAt: 't', createdVia: 'ai_agent' }).by).toBe('AI assistant')
    expect(describeBooking({ createdAt: 't', createdVia: 'online_intro_booking' }).by).toBe('Online intro booking')
    expect(describeBooking({ createdAt: 't', createdVia: 'payment_link' }).by).toBe('Payment link')
  })
  it('still returns the time when who is not recorded (older lessons)', () => {
    const r = describeBooking({ createdAt: '2026-01-01T00:00:00Z' })
    expect(r.by).toBeNull()
    expect(r.at).toBe('2026-01-01T00:00:00Z')
  })
  it('ignores an unpopulated createdBy id', () => {
    expect(describeBooking({ createdBy: '6af2c1229bb0af7201adf2b0', createdAt: 't' }).by).toBeNull()
  })
  it('handles missing input', () => {
    expect(describeBooking(null).at).toBeNull()
  })
})

describe('escapeHtml', () => {
  it('escapes markup so a name cannot inject into the hover card', () => {
    expect(escapeHtml('<img src=x onerror=1>"&\'')).toBe('&lt;img src=x onerror=1&gt;&quot;&amp;&#39;')
  })
})
