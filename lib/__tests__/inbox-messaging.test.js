import {
  emptyReadState,
  isConversationUnread,
  markReadState,
  markUnreadState,
  normalizePhoneE164,
  personalizeForPreview,
  readStateFromServer,
  skipReason,
  smsSegments,
  withOptOutFooter,
} from '@/lib/inbox-messaging'

describe('inbox messaging helpers', () => {
  it('normalizes typed numbers to E.164', () => {
    expect(normalizePhoneE164('(404) 555-0129')).toBe('+14045550129')
    expect(normalizePhoneE164('1 404 555 0129')).toBe('+14045550129')
    expect(normalizePhoneE164('+44 20 7946 0958')).toBe('+442079460958')
    expect(normalizePhoneE164('555-0129')).toBeNull()
    expect(normalizePhoneE164('alex@studio.com')).toBeNull()
  })

  it('adds the STOP footer once', () => {
    expect(withOptOutFooter('Hi')).toBe('Hi\n\nReply STOP to unsubscribe.')
    expect(withOptOutFooter('Hi\nReply stop to unsubscribe')).toBe('Hi\nReply stop to unsubscribe')
  })

  it('counts SMS segments for GSM and unicode text', () => {
    expect(smsSegments('a'.repeat(160))).toBe(1)
    expect(smsSegments('a'.repeat(161))).toBe(2)
    expect(smsSegments('Hi 😊')).toBe(1)
    expect(smsSegments('😊'.repeat(71))).toBe(2)
  })

  it('personalizes with the "there" fallback', () => {
    expect(personalizeForPreview('Hi {{first_name}}!', { name: 'Alex Morgan' })).toBe('Hi Alex!')
    expect(personalizeForPreview('Hi {{first_name}}!', { name: '' })).toBe('Hi there!')
    expect(personalizeForPreview('Hi {{first_name}}!', { name: 'Unknown' })).toBe('Hi there!')
  })

  it('skips recipients who cannot be messaged', () => {
    expect(skipReason({ phoneNumber: '+1404' }, 'SMS')).toBeNull()
    expect(skipReason({ phoneNumber: '' }, 'SMS')).toBe('no phone')
    expect(skipReason({ phoneNumber: '+1404', smsOptOut: true }, 'SMS')).toBe('opted out')
    expect(skipReason({ email: 'a@b.co', emailOptOut: true }, 'Email')).toBe('unsubscribed')
  })

  it('tracks unread from the last inbound message', () => {
    const state = emptyReadState(new Date('2026-10-08T12:00:00Z'))
    const old = { id: 'a', lastInboundAt: '2026-10-08T11:00:00Z' }
    const fresh = { id: 'b', lastInboundAt: '2026-10-08T13:00:00Z' }
    expect(isConversationUnread(old, state)).toBe(false)
    expect(isConversationUnread(fresh, state)).toBe(true)

    const read = markReadState(state, 'b', new Date('2026-10-08T14:00:00Z'))
    expect(isConversationUnread(fresh, read)).toBe(false)
    expect(isConversationUnread(fresh, markUnreadState(read, 'b'))).toBe(true)
  })

  it('uses the studio read state from the server', () => {
    const state = readStateFromServer({
      baseline: '2026-10-08T12:00:00Z',
      read: { b: '2026-10-08T14:00:00Z' },
      unread: { c: true },
    })
    expect(isConversationUnread({ id: 'b', lastInboundAt: '2026-10-08T13:00:00Z' }, state)).toBe(false)
    expect(isConversationUnread({ id: 'c', lastInboundAt: '2026-10-08T11:00:00Z' }, state)).toBe(true)

    const fallback = readStateFromServer(null, new Date('2026-10-09T00:00:00Z'))
    expect(fallback).toEqual({ baseline: '2026-10-09T00:00:00.000Z', read: {}, unread: {} })
  })
})
