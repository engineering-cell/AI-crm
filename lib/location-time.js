/**
 * Calendar-day helpers that are driven by an explicit IANA timezone (the contact's
 * LOCATION), never by the browser's or UTC's clock. Used by the Callback Report and
 * anything else that must say "today / overdue / upcoming" for a studio location.
 *
 * Day keys are plain "YYYY-MM-DD" strings, which sort and compare lexicographically.
 */

import { getStudioTimezone } from './studioTimezone'

const DAY_KEY_RE = /^\d{4}-\d{2}-\d{2}$/

export function isValidTimezone(tz) {
  if (!tz || typeof tz !== 'string') return false
  try {
    new Intl.DateTimeFormat('en-US', { timeZone: tz })
    return true
  } catch {
    return false
  }
}

/** First valid timezone in the list (location -> active location -> org default ...). */
export function pickTimezone(...candidates) {
  for (const tz of candidates) if (isValidTimezone(tz)) return tz
  return null
}

function isExactUtcMidnight(d) {
  return d.getUTCHours() === 0 && d.getUTCMinutes() === 0 && d.getUTCSeconds() === 0 && d.getUTCMilliseconds() === 0
}

/** Calendar day (YYYY-MM-DD) of an instant in `tz`. Falls back to UTC when tz is unknown. */
export function dayKeyInTz(value, tz) {
  if (!value) return null
  if (typeof value === 'string' && DAY_KEY_RE.test(value)) return value
  const d = value instanceof Date ? value : new Date(value)
  if (Number.isNaN(d.getTime())) return null
  const zone = isValidTimezone(tz) ? tz : 'UTC'
  return d.toLocaleDateString('en-CA', { timeZone: zone })
}

/**
 * Day key of a stored callback date. Date-only values (a plain "YYYY-MM-DD", or an
 * instant at exactly UTC midnight, which is how date-only values travel on the wire)
 * keep their own calendar day; real instants are read in `tz`.
 */
export function callbackDayKey(value, tz) {
  if (!value) return null
  if (typeof value === 'string' && DAY_KEY_RE.test(value)) return value
  const d = new Date(value)
  if (Number.isNaN(d.getTime())) return null
  if (isExactUtcMidnight(d)) return d.toISOString().slice(0, 10)
  return dayKeyInTz(d, tz)
}

export function todayKeyInTz(tz, now = new Date()) {
  return dayKeyInTz(now, tz)
}

function dayNumber(key) {
  const [y, m, d] = key.split('-').map(Number)
  return Math.round(Date.UTC(y, m - 1, d) / 86400000)
}

/** Whole days from `fromKey` to `toKey` (positive = toKey is later). */
export function diffDayKeys(fromKey, toKey) {
  if (!fromKey || !toKey) return null
  return dayNumber(toKey) - dayNumber(fromKey)
}

/**
 * Where a callback day sits relative to today in `tz`.
 * @returns {{ dayKey: string, diffDays: number, status: 'overdue'|'today'|'upcoming' } | null}
 */
export function compareToTodayInTz(value, tz, now = new Date()) {
  const dayKey = callbackDayKey(value, tz)
  if (!dayKey) return null
  const diffDays = diffDayKeys(todayKeyInTz(tz, now), dayKey)
  const status = diffDays < 0 ? 'overdue' : diffDays === 0 ? 'today' : 'upcoming'
  return { dayKey, diffDays, status }
}

/** "Nov 19, 2026" for a day key — pure calendar formatting, no timezone shift. */
export function formatDayKey(key) {
  if (!key || !DAY_KEY_RE.test(key)) return ''
  const [y, m, d] = key.split('-').map(Number)
  return new Date(Date.UTC(y, m - 1, d)).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    timeZone: 'UTC',
  })
}

/**
 * Value for an `<input type="date">` showing a lead/customer record's callback day.
 * Prefers the backend's studio-local callbackDayKey; never slices the ISO string
 * (that is the UTC day, which differs from the studio day for far-east locations).
 */
export function callbackInputValue(record) {
  if (!record) return ''
  // Rows the backend did not enrich have no locationTimezone: fall back to the active
  // studio's zone, then UTC (so a tz-less, non-midnight instant reads as its UTC date).
  return record.callbackDayKey || callbackDayKey(record.callbackDate, record.locationTimezone || getStudioTimezone()) || ''
}

/** True when the record's callback day is before today in its location's timezone. */
export function isCallbackOverdue(record, fallbackTz, now = new Date()) {
  if (!record?.callbackDate && !record?.callbackDayKey) return false
  if (['overdue', 'today', 'upcoming'].includes(record.callbackStatus)) return record.callbackStatus === 'overdue'
  const tz = pickTimezone(record.locationTimezone, fallbackTz)
  return compareToTodayInTz(record.callbackDayKey || record.callbackDate, tz, now)?.status === 'overdue'
}
