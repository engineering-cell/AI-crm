import { applyEmailTemplate } from '@/lib/emailSend'

// ── Recipients ────────────────────────────────────────────────────────────

/** Typed phone number → E.164 (US default), or null if it isn't one. */
export function normalizePhoneE164(raw) {
  const value = String(raw || '').trim()
  if (!value || !/^[+\d\s().-]+$/.test(value)) return null
  const digits = value.replace(/\D/g, '')
  if (value.startsWith('+')) return digits.length >= 10 && digits.length <= 15 ? `+${digits}` : null
  if (digits.length === 10) return `+1${digits}`
  if (digits.length === 11 && digits.startsWith('1')) return `+${digits}`
  return null
}

export function looksLikeEmail(raw) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(raw || '').trim())
}

/** Conversation id for a number texted without a CRM record (matches page.js convention). */
export function numberConversationId(phone) {
  return `sms-${String(phone).replace(/\W/g, '_')}`
}

// ── Message content ───────────────────────────────────────────────────────

export const SMS_OPT_OUT_FOOTER = 'Reply STOP to unsubscribe.'

/** Bulk texts must carry the opt-out line once. */
export function withOptOutFooter(text) {
  const body = String(text || '').trimEnd()
  if (/reply\s+stop\s+to\s+(unsubscribe|opt[\s-]?out)\.?\s*$/i.test(body)) return body
  return `${body}\n\n${SMS_OPT_OUT_FOOTER}`
}

/** GSM-7 vs UCS-2 (emoji, curly quotes…) segment count, as carriers bill it. */
export function smsSegments(text) {
  const value = String(text || '')
  if (!value) return 0
  // eslint-disable-next-line no-control-regex
  const gsm = /^[\x0A\x0D\x20-\x5F\x61-\x7E£¥èéùìòÇØøÅå_ÆæßÉ¡ÄÖÑÜ§¿äöñüà€^{}\\[~\]|]*$/.test(value)
  const length = [...value].length
  if (gsm) return length <= 160 ? 1 : Math.ceil(length / 153)
  return length <= 70 ? 1 : Math.ceil(length / 67)
}

/** Same fallback as the backend: unknown names read as "there". */
export function personalizeForPreview(text, person = {}) {
  const name = String(person.name || '').trim()
  const known = name && name.toLowerCase() !== 'unknown'
  return applyEmailTemplate(text, { ...person, name: known ? name : 'there' })
}

/** Why a bulk recipient will not get the message, or null if they will. */
export function skipReason(person, channel) {
  if (channel === 'Email') {
    if (!person.email) return 'no email'
    if (person.emailOptOut) return 'unsubscribed'
    return null
  }
  if (!person.phoneNumber) return 'no phone'
  if (person.smsOptOut) return 'opted out'
  return null
}

// ── Read state ────────────────────────────────────────────────────────────
// Shared by the whole studio (GET /api/inbox/read-state): one person opening a
// conversation reads it for everyone.

/** Fresh state: everything before `now` counts as read, so day one isn't all bold. */
export function emptyReadState(now = new Date()) {
  return { baseline: now.toISOString(), read: {}, unread: {} }
}

export function isConversationUnread(conv, state) {
  if (!conv || !state) return false
  if (state.unread?.[conv.id]) return true
  if (!conv.lastInboundAt) return false
  const readAt = state.read?.[conv.id] || state.baseline
  return new Date(conv.lastInboundAt) > new Date(readAt)
}

export function markReadState(state, convId, now = new Date()) {
  const unread = { ...state.unread }
  delete unread[convId]
  return { ...state, read: { ...state.read, [convId]: now.toISOString() }, unread }
}

export function markUnreadState(state, convId) {
  return { ...state, unread: { ...state.unread, [convId]: true } }
}

/** Studio read state from the API, in the shape isConversationUnread expects. */
export function readStateFromServer(data, now = new Date()) {
  return {
    baseline: data?.baseline || now.toISOString(),
    read: data?.read && typeof data.read === 'object' ? { ...data.read } : {},
    unread: data?.unread && typeof data.unread === 'object' ? { ...data.unread } : {},
  }
}
