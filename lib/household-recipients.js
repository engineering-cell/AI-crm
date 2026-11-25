// A lead's or customer's account can carry household members (partner, fiancé, parent...) with
// their own phone number and email. Staff need to text / call / email THEM from the account, and
// a message to or from a member's number must be labelled as theirs - not as the account holder's.

const digits = (v) => String(v || '').replace(/\D/g, '')

/** Trailing 10 digits, so +1 / formatting differences don't matter. */
export function last10(value) {
  const d = digits(value)
  return d.length >= 10 ? d.slice(-10) : d
}

/** "Max Higgins (Fiancé)" */
export function memberLabel(member) {
  const name = String(member?.name || '').trim() || 'Member'
  const rel = String(member?.relationship || '').trim()
  return rel ? `${name} (${rel})` : name
}

/**
 * Who a message can go to on a channel: the account holder first, then every member who can be
 * reached that way (a phone for SMS / calls, an email for email).
 *
 * @param {{ name?: string, phoneNumber?: string, email?: string, members?: Array }} contact
 * @param {'SMS'|'Call'|'Email'} channel
 * @returns {Array<{ key: string, name: string, label: string, relationship: string|null,
 *                   phoneNumber: string, email: string, isMember: boolean }>}
 */
export function recipientOptions(contact, channel = 'SMS') {
  if (!contact) return []
  const needs = channel === 'Email' ? 'email' : 'phoneNumber'
  const holder = {
    key: 'self',
    name: String(contact.name || '').trim() || 'Account holder',
    label: String(contact.name || '').trim() || 'Account holder',
    relationship: null,
    phoneNumber: contact.phoneNumber || '',
    email: contact.email || '',
    isMember: false,
  }
  const members = (Array.isArray(contact.members) ? contact.members : []).map((m, i) => ({
    key: String(m?._id || `member-${i}`),
    name: String(m?.name || '').trim() || 'Member',
    label: memberLabel(m),
    relationship: m?.relationship || null,
    phoneNumber: m?.phoneNumber || '',
    email: m?.email || '',
    isMember: true,
  }))
  return [holder, ...members].filter((r) => r[needs])
}

/** The option for `key`, else the first (the account holder). */
export function pickRecipient(options, key) {
  return options.find((o) => o.key === key) || options[0] || null
}

/** The member whose number this is - never the account holder's own number. */
export function memberForNumber(contact, number) {
  const target = last10(number)
  if (!target || !contact) return null
  if (last10(contact.phoneNumber) === target) return null
  return (
    (Array.isArray(contact.members) ? contact.members : []).find((m) => last10(m?.phoneNumber) === target) ||
    null
  )
}

/**
 * Label SMS messages that went to / came from a household member's number, so a reply from
 * "Max" does not read as one from the account holder. Other messages pass through untouched.
 * Needs `from` / `to` on the messages (see lib/inboxThread mapSmsHistoryMessages).
 */
export function annotateMemberMessages(messages, contact) {
  if (!Array.isArray(messages) || !contact?.members?.length) return messages
  return messages.map((m) => {
    if (m.channel && m.channel !== 'SMS') return m
    const number = m.direction === 'inbound' ? m.from : m.to
    const member = memberForNumber(contact, number)
    if (!member) return m
    return {
      ...m,
      counterpart: memberLabel(member),
      ...(m.direction === 'inbound' ? { sender: String(member.name || '').trim() || m.sender } : {}),
    }
  })
}
