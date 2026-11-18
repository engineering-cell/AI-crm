// Named date ranges from the owner-dashboard spec (3.2). The backend resolves the same names on the
// studio's own calendar (`?range=<name>`); the date maths here is only used to build comparison windows.

export const NAMED_RANGE_OPTIONS = [
  { value: 'today', label: 'Today' },
  { value: 'yesterday', label: 'Yesterday' },
  { value: 'tomorrow', label: 'Tomorrow' },
  { value: 'this_week', label: 'This week' },
  { value: 'last_week', label: 'Last week' },
  { value: 'next_week', label: 'Next week' },
  { value: 'this_month', label: 'This month' },
  { value: 'last_month', label: 'Last month' },
  { value: 'next_month', label: 'Next month' },
  { value: 'this_quarter', label: 'This quarter' },
  { value: 'last_quarter', label: 'Last quarter' },
  { value: 'next_quarter', label: 'Next quarter' },
  { value: 'this_year', label: 'This year' },
  { value: 'last_year', label: 'Last year' },
  { value: 'next_year', label: 'Next year' },
]

const NAMES = new Set(NAMED_RANGE_OPTIONS.map((o) => o.value))
export const isNamedRange = (r) => typeof r === 'string' && NAMES.has(r)

const iso = (d) => d.toISOString().slice(0, 10)
const utc = (y, m, d) => new Date(Date.UTC(y, m, d))

/** Named range -> { from, to } as YYYY-MM-DD. "this_*" runs from the period start to `today`, like the backend. */
export function namedRangeDates(name, today = new Date()) {
  const y = today.getFullYear()
  const m = today.getMonth()
  const d = today.getDate()
  const day = { today: 0, yesterday: -1, tomorrow: 1 }[name]
  if (day !== undefined) {
    const x = iso(utc(y, m, d + day))
    return { from: x, to: x }
  }
  const match = /^(this|last|next)_(week|month|quarter|year)$/.exec(name || '')
  if (!match) return null
  const n = { last: -1, this: 0, next: 1 }[match[1]]
  const unit = match[2]
  let from
  let to
  if (unit === 'week') {
    const monday = d - ((today.getDay() + 6) % 7)
    from = utc(y, m, monday + 7 * n)
    to = utc(y, m, monday + 7 * n + 6)
  } else if (unit === 'month') {
    from = utc(y, m + n, 1)
    to = utc(y, m + n + 1, 0)
  } else if (unit === 'quarter') {
    const q = Math.floor(m / 3) * 3 + 3 * n
    from = utc(y, q, 1)
    to = utc(y, q + 3, 0)
  } else {
    from = utc(y + n, 0, 1)
    to = utc(y + n, 11, 31)
  }
  if (n === 0) to = utc(y, m, d)
  return { from: iso(from), to: iso(to) }
}

const parse = (s) => {
  const [y, m, d] = s.split('-').map(Number)
  return { y, m: m - 1, d }
}
const shift = (s, { days = 0, months = 0, years = 0 } = {}) => {
  const { y, m, d } = parse(s)
  return iso(utc(y - years, m - months, d - days))
}
const endOfMonth = (y, m) => iso(utc(y, m + 1, 0))
const spanDays = (from, to) => Math.round((Date.parse(to) - Date.parse(from)) / 86400000) + 1

/**
 * Comparison windows for a named range (spec 3.3), as YYYY-MM-DD pairs:
 *  - "to date" ranges (This week/month/quarter/year): the same number of days at the start of the previous period
 *    (stopping at its last day if shorter); YoY = the same dates a year earlier. This year has no previous period (YoY only).
 *  - whole periods (Yesterday, Last week/month/quarter, Tomorrow, Next ...): the whole period before; YoY = same period a year earlier.
 *    Last year has no previous period (YoY only).
 * `priorPeriod: null` means the pill is not shown for that range.
 */
export function namedComparison(name, today = new Date()) {
  const cur = namedRangeDates(name, today)
  if (!cur) return null
  const m = /^(this|last|next)_(week|month|quarter|year)$/.exec(name)
  const unit = m ? m[2] : 'day'
  const toDate = m?.[1] === 'this'
  const yoy = { from: shift(cur.from, { years: 1 }), to: shift(cur.to, { years: 1 }) }
  if (unit === 'year') return { priorPeriod: null, priorYear: yoy }
  let prevFrom
  let prevTo
  if (unit === 'day') {
    prevFrom = prevTo = shift(cur.from, { days: 1 })
  } else if (unit === 'week') {
    prevFrom = shift(cur.from, { days: 7 })
    prevTo = shift(cur.from, { days: 1 })
  } else {
    const back = unit === 'month' ? 1 : 3
    const f = parse(shift(cur.from, { months: back }))
    prevFrom = iso(utc(f.y, f.m, 1))
    prevTo = endOfMonth(f.y, f.m + back - 1)
  }
  if (toDate) {
    const capped = shift(prevFrom, { days: -(spanDays(cur.from, cur.to) - 1) })
    if (capped < prevTo) prevTo = capped
  }
  return { priorPeriod: { from: prevFrom, to: prevTo }, priorYear: yoy }
}

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
/** "1–16 Nov 2026", "28 Oct – 3 Nov 2026" or "1 Nov 2026" for a { from, to } pair of YYYY-MM-DD dates. */
export function formatDateSpan(from, to) {
  const a = parse(from)
  const b = parse(to)
  if (from === to) return `${b.d} ${MONTHS[b.m]} ${b.y}`
  if (a.y === b.y && a.m === b.m) return `${a.d}–${b.d} ${MONTHS[b.m]} ${b.y}`
  if (a.y === b.y) return `${a.d} ${MONTHS[a.m]} – ${b.d} ${MONTHS[b.m]} ${b.y}`
  return `${a.d} ${MONTHS[a.m]} ${a.y} – ${b.d} ${MONTHS[b.m]} ${b.y}`
}

/** The dates a dashboard range covers, printed under each card title (spec 3.1). Studio-day precision is the server's; this is the label. */
export function rangeCaption(range, today = new Date()) {
  const t = iso(utc(today.getFullYear(), today.getMonth(), today.getDate()))
  const days = (n) => formatDateSpan(shift(t, { days: n - 1 }), t)
  if (range && typeof range === 'object') return /^\d{4}-\d{2}-\d{2}$/.test(range.from) ? formatDateSpan(range.from, range.to) : null
  if (range === 0) return formatDateSpan(t, t)
  if (typeof range === 'number') return days(range)
  if (range === 'mtd') return formatDateSpan(namedRangeDates('this_month', today).from, t)
  if (range === 'qtd') return formatDateSpan(namedRangeDates('this_quarter', today).from, t)
  if (range === 'ytd') return formatDateSpan(namedRangeDates('this_year', today).from, t)
  const r = namedRangeDates(range, today)
  return r ? formatDateSpan(r.from, r.to) : null
}
