import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { getStudioTimezone } from './studioTimezone'

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

export function formatDate(date, timeZone) {
  if (!date) return ''
  const d = new Date(date)
  if (Number.isNaN(d.getTime())) return ''
  // Date-only values (dob, memberSince, enrollment/expiry/lesson/payment
  // dates, etc.) are stored as exact UTC midnight — the backend's parseDate()
  // constructs them as a local calendar date and, since imports commonly run
  // with a UTC server clock, that lands on UTC midnight on the wire. If we
  // then format in the *browser's* local timezone (the default below), a
  // browser west of UTC rolls that back to the previous day — the exact
  // "dates land a day early" bug. Real timestamps (createdAt, etc.) are for
  // all practical purposes never exactly UTC midnight, so this heuristic
  // formats date-only values in UTC (no shift). Real timestamps read in the
  // studio's timezone, so a viewer in another country sees the studio's date.
  const looksDateOnly =
    d.getUTCHours() === 0 && d.getUTCMinutes() === 0 && d.getUTCSeconds() === 0 && d.getUTCMilliseconds() === 0
  const zone = timeZone || (looksDateOnly ? 'UTC' : getStudioTimezone())
  return d.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    ...(zone ? { timeZone: zone } : {}),
  })
}

export function formatDateTime(date, timeZone) {
  if (!date) return ''
  const d = new Date(date)
  if (Number.isNaN(d.getTime())) return ''
  const zone = timeZone || getStudioTimezone()
  return d.toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    ...(zone ? { timeZone: zone } : {}),
  })
}

/** Local calendar YYYY-MM-DD (not UTC) — for report date presets/filters. */
export function toLocalCalendarDateString(date = new Date()) {
  const d = date instanceof Date ? date : new Date(date)
  if (Number.isNaN(d.getTime())) return ''
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${y}-${m}-${day}`
}

/** Calendar YYYY-MM-DD in an IANA timezone (the studio's when none is given). */
export function toCalendarDateStringInTimeZone(date = new Date(), timeZone) {
  const zone = timeZone || getStudioTimezone()
  if (!zone) return toLocalCalendarDateString(date)
  const d = date instanceof Date ? date : new Date(date)
  if (Number.isNaN(d.getTime())) return ''
  return new Intl.DateTimeFormat('en-CA', {
    timeZone: zone,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(d)
}

export function formatCurrency(amount) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount)
}

export function formatPercentage(value) {
  return `${value.toFixed(1)}%`
}

// "Ashley & Tom" — a lead/customer's own name followed by any partner/family members.
export function nameWithMembers(person) {
  if (!person) return ''
  return [person.name, ...(person.members || []).map((m) => m?.name)].filter(Boolean).join(' & ')
}

export function getContactDisplayName(contact) {
  if (!contact) return 'Unknown'
  return contact.name || contact.phoneNumber || contact.email || 'Unknown'
}

export function getInitials(name) {
  if (!name) return '??'
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)
}

export function truncateText(text, length = 50) {
  if (!text) return ''
  if (text.length <= length) return text
  return text.slice(0, length) + '...'
}



/**
 * Lesson counts are whole lessons, rounded UP (5.8 -> 6), with no float noise
 * (5.800000000000001). Use this for every "N left" / "N of M" the CRM shows so the
 * rule lives in one place. Mirrors wholeSessions() in the backend's sessionCount.helper.js.
 */
export function roundSessions(n) {
  const v = Number(n);
  if (!Number.isFinite(v)) return 0;
  return Math.ceil(v - 1e-6) + 0;
}
