import { afterEach, describe, expect, it, vi } from 'vitest'
import { cleanup, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

// Keep this test about WHO a message / call goes to: stub the inputs so a click sends or dials.
vi.mock('../MessageInput', () => ({
  default: ({ onSendMessage }) => (
    <button onClick={() => onSendMessage({ content: 'hello', channel: 'SMS' })}>send-sms</button>
  ),
}))
vi.mock('../EmailMessageInput', () => ({
  default: ({ onSendMessage }) => (
    <button onClick={() => onSendMessage({ content: 'hi', subject: 's', channel: 'Email' })}>send-email</button>
  ),
}))
vi.mock('../CallMessageInput', () => ({
  default: ({ phoneNumber, onPlaceCall }) => (
    <button onClick={() => onPlaceCall()}>{`dial ${phoneNumber}`}</button>
  ),
}))
vi.mock('../CallLogList', () => ({ default: () => null }))
vi.mock('next/link', () => ({ default: ({ children, href }) => <a href={href}>{children}</a> }))

import ConversationView from '../ConversationView'

// Alyssa Gomez (+1 404 368 3733) and her fiancé Max Higgins (+1 404 480 3123) - the reported account.
const MAX = { _id: 'm1', name: 'Max Higgins', relationship: 'Fiancé', phoneNumber: '+14044803123', email: 'max@example.test' }
const CONTACT = {
  id: 'customer-1', _id: 'customer-1', name: 'Alyssa Gomez', type: 'Customer',
  phoneNumber: '+14043683733', email: 'alyssa@example.test', members: [MAX],
}
const CONVERSATION = { id: 'customer-1', channel: 'SMS', contact: CONTACT }

const MESSAGES = [
  { id: '1', channel: 'SMS', direction: 'outbound', sender: 'You', content: 'Are you free Monday?', timestamp: '2026-11-04T22:21:00Z', to: '+14044803123', from: '+12125550100' },
  { id: '2', channel: 'SMS', direction: 'inbound', sender: 'Alyssa Gomez', content: 'I could move it to Monday evening', timestamp: '2026-11-04T22:22:00Z', from: '+14044803123', to: '+12125550100' },
  { id: '3', channel: 'SMS', direction: 'inbound', sender: 'Alyssa Gomez', content: 'It is Alyssa here', timestamp: '2026-11-04T22:30:00Z', from: '+14043683733', to: '+12125550100' },
]

const renderView = (props = {}) => {
  const onSendMessage = vi.fn().mockResolvedValue(true)
  const onPlaceCall = vi.fn()
  render(
    <ConversationView
      conversation={CONVERSATION}
      messages={MESSAGES}
      leadData={CONTACT}
      onSendMessage={onSendMessage}
      onPlaceCall={onPlaceCall}
      {...props}
    />,
  )
  return { onSendMessage, onPlaceCall }
}

afterEach(cleanup)

describe('ConversationView with household members', () => {
  it('offers the account holder and the member as recipients', () => {
    renderView()
    const select = screen.getByLabelText('To')
    const options = Array.from(select.querySelectorAll('option')).map((o) => o.textContent)
    expect(options).toHaveLength(2)
    expect(options[0]).toMatch(/Alyssa Gomez.*account holder.*\+14043683733/)
    expect(options[1]).toMatch(/Max Higgins \(Fiancé\).*\+14044803123/)
  })

  it('texts the account holder by default - nothing changes for people without members', async () => {
    const { onSendMessage } = renderView()
    await userEvent.click(screen.getByText('send-sms'))
    expect(onSendMessage).toHaveBeenCalledWith({ content: 'hello', channel: 'SMS' })
  })

  it('texts the member when picked, saying who it is for', async () => {
    const { onSendMessage } = renderView()
    await userEvent.selectOptions(screen.getByLabelText('To'), 'm1')
    await userEvent.click(screen.getByText('send-sms'))
    const arg = onSendMessage.mock.calls[0][0]
    expect(arg.content).toBe('hello')
    expect(arg.recipient).toMatchObject({ key: 'm1', name: 'Max Higgins', phoneNumber: '+14044803123', isMember: true })
  })

  it('calls the member\'s number when picked - the reported "I can only call her"', async () => {
    const { onPlaceCall } = renderView()
    await userEvent.click(screen.getByText('Call'))
    expect(screen.getByText('dial +14043683733')).toBeTruthy() // holder by default
    await userEvent.selectOptions(screen.getByLabelText('Call'), 'm1')
    expect(screen.getByText('dial +14044803123')).toBeTruthy()
    await userEvent.click(screen.getByText('dial +14044803123'))
    expect(onPlaceCall).toHaveBeenCalledWith(expect.objectContaining({ name: 'Max Higgins', phoneNumber: '+14044803123' }))
  })

  it('calls the account holder with no recipient override when she is selected', async () => {
    const { onPlaceCall } = renderView()
    await userEvent.click(screen.getByText('Call'))
    await userEvent.click(screen.getByText('dial +14043683733'))
    expect(onPlaceCall).toHaveBeenCalledWith(null)
  })

  it('labels messages to and from the member as theirs, not the account holder\'s', () => {
    renderView()
    expect(screen.getByText('To Max Higgins (Fiancé)')).toBeTruthy() // the text staff sent to Max
    expect(screen.getByText('Max Higgins (Fiancé)')).toBeTruthy() // Max's reply
    // Alyssa's own message carries no member label
    expect(screen.getAllByText(/^(To )?Max Higgins \(Fiancé\)$/)).toHaveLength(2)
  })

  it('shows no recipient picker for a contact without members', () => {
    renderView({ leadData: { ...CONTACT, members: [] }, conversation: { ...CONVERSATION, contact: { ...CONTACT, members: [] } } })
    expect(screen.queryByLabelText('To')).toBeNull()
  })
})

describe('a household member\'s own chat', () => {
  const MEMBER_CONTACT = {
    id: null, name: 'Max Higgins', type: 'Customer', phoneNumber: '+14044803123', email: '',
    convertedCustomerID: 'customer-1',
    memberOf: { id: 'customer-1', name: 'Alyssa Gomez', relationship: 'Fiancé' },
  }

  it('says whose account the member belongs to, and offers no recipient picker', () => {
    renderView({
      conversation: { id: 'sms-14044803123', channel: 'SMS', contact: MEMBER_CONTACT },
      leadData: null,
      messages: [],
    })
    expect(screen.getByText('Member of Alyssa Gomez · Fiancé')).toBeTruthy()
    expect(screen.getByText('Max Higgins')).toBeTruthy()
    expect(screen.queryByLabelText('To')).toBeNull()
  })

  it('links View profile to the account the member belongs to', () => {
    renderView({
      conversation: { id: 'sms-14044803123', channel: 'SMS', contact: MEMBER_CONTACT },
      leadData: null,
      messages: [],
    })
    expect(screen.getByText('View profile').closest('a').getAttribute('href')).toBe('/settings/users-roles/customers/customer-1')
  })
})
