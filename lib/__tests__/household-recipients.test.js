import { describe, expect, it } from 'vitest'
import {
  annotateMemberMessages,
  last10,
  memberForNumber,
  memberLabel,
  pickRecipient,
  recipientOptions,
} from '../household-recipients'

// The reported account: Alyssa Gomez (+1 404 368 3733) with her fiancé Max Higgins (+1 404 480 3123).
const ALYSSA = {
  name: 'Alyssa Gomez',
  phoneNumber: '+14043683733',
  email: 'alyssa@example.test',
  members: [{ _id: 'm1', name: 'Max Higgins', relationship: 'Fiancé', phoneNumber: '+14044803123', email: 'max@example.test' }],
}

describe('recipientOptions', () => {
  it('offers the account holder first, then the member, for texts and calls', () => {
    const opts = recipientOptions(ALYSSA, 'SMS')
    expect(opts.map((o) => o.label)).toEqual(['Alyssa Gomez', 'Max Higgins (Fiancé)'])
    expect(opts[0].isMember).toBe(false)
    expect(opts[1]).toMatchObject({ key: 'm1', phoneNumber: '+14044803123', isMember: true })
    expect(recipientOptions(ALYSSA, 'Call')).toHaveLength(2)
  })

  it('only lists people who can be reached on the channel', () => {
    const noEmailMember = { ...ALYSSA, members: [{ _id: 'm1', name: 'Max', phoneNumber: '+14044803123' }] }
    expect(recipientOptions(noEmailMember, 'Email').map((o) => o.key)).toEqual(['self'])
    const noPhoneMember = { ...ALYSSA, members: [{ _id: 'm1', name: 'Max', email: 'max@example.test' }] }
    expect(recipientOptions(noPhoneMember, 'SMS').map((o) => o.key)).toEqual(['self'])
    expect(recipientOptions(noPhoneMember, 'Email').map((o) => o.key)).toEqual(['self', 'm1'])
  })

  it('is just the holder when there are no members, and handles nothing', () => {
    expect(recipientOptions({ ...ALYSSA, members: [] }, 'SMS')).toHaveLength(1)
    expect(recipientOptions(null)).toEqual([])
  })
})

describe('pickRecipient', () => {
  it('falls back to the account holder for an unknown key', () => {
    const opts = recipientOptions(ALYSSA, 'SMS')
    expect(pickRecipient(opts, 'm1').name).toBe('Max Higgins')
    expect(pickRecipient(opts, 'gone').key).toBe('self')
    expect(pickRecipient([], 'x')).toBeNull()
  })
})

describe('memberForNumber / memberLabel', () => {
  it('finds the member by number whatever the formatting', () => {
    expect(memberForNumber(ALYSSA, '+14044803123').name).toBe('Max Higgins')
    expect(memberForNumber(ALYSSA, '(404) 480-3123').name).toBe('Max Higgins')
    expect(memberForNumber(ALYSSA, '14044803123').name).toBe('Max Higgins')
  })
  it('never treats the account holder\'s own number as a member', () => {
    expect(memberForNumber(ALYSSA, '+14043683733')).toBeNull()
    expect(memberForNumber(ALYSSA, '+19998887777')).toBeNull()
    expect(memberForNumber(ALYSSA, '')).toBeNull()
  })
  it('labels with the relationship when there is one', () => {
    expect(memberLabel({ name: 'Max Higgins', relationship: 'Fiancé' })).toBe('Max Higgins (Fiancé)')
    expect(memberLabel({ name: 'Max' })).toBe('Max')
    expect(last10('+1 (404) 480-3123')).toBe('4044803123')
  })
})

describe('annotateMemberMessages', () => {
  const thread = [
    { id: '1', channel: 'SMS', direction: 'outbound', sender: 'You', to: '+14044803123', from: '+12125550100' },
    { id: '2', channel: 'SMS', direction: 'inbound', sender: 'Alyssa Gomez', from: '+14044803123', to: '+12125550100' },
    { id: '3', channel: 'SMS', direction: 'inbound', sender: 'Alyssa Gomez', from: '+14043683733', to: '+12125550100' },
    { id: '4', channel: 'Email', direction: 'inbound', sender: 'Alyssa Gomez' },
  ]

  it('labels a reply from the member as the member\'s, not the account holder\'s (the reported bug)', () => {
    const out = annotateMemberMessages(thread, ALYSSA)
    expect(out[1]).toMatchObject({ sender: 'Max Higgins', counterpart: 'Max Higgins (Fiancé)' })
  })

  it('marks texts sent TO the member, keeping "You" as the sender', () => {
    const out = annotateMemberMessages(thread, ALYSSA)
    expect(out[0]).toMatchObject({ sender: 'You', counterpart: 'Max Higgins (Fiancé)' })
  })

  it('leaves the account holder\'s own messages and non-SMS rows alone', () => {
    const out = annotateMemberMessages(thread, ALYSSA)
    expect(out[2]).toEqual(thread[2])
    expect(out[3]).toEqual(thread[3])
  })

  it('returns the same array when there are no members', () => {
    expect(annotateMemberMessages(thread, { ...ALYSSA, members: [] })).toBe(thread)
  })
})
