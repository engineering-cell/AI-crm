'use client'

const DAYS = [
  { day: 1, label: 'Mon' },
  { day: 2, label: 'Tue' },
  { day: 3, label: 'Wed' },
  { day: 4, label: 'Thu' },
  { day: 5, label: 'Fri' },
  { day: 6, label: 'Sat' },
  { day: 0, label: 'Sun' },
]

const input = 'h-8 rounded-lg border border-border bg-background px-2 text-[12px] text-foreground outline-none focus:border-primary'

/** Hours an instructor can teach, one window per weekday, plus time off. Feeds the dashboard's available hours (utilization). */
export function emptyAvailability() {
  return { weekly: [], timeOff: [] }
}

export function normalizeAvailability(a) {
  return {
    weekly: (a?.weekly || []).map((w) => ({ day: w.day, start: w.start, end: w.end })),
    timeOff: (a?.timeOff || []).map((t) => ({
      from: String(t.from || '').slice(0, 10),
      to: String(t.to || '').slice(0, 10),
      reason: t.reason || '',
    })),
  }
}

/** Converts the editor's value to the API shape; incomplete rows are dropped. */
export function availabilityPayload(a) {
  return {
    weekly: (a.weekly || []).filter((w) => w.start && w.end && w.end > w.start),
    timeOff: (a.timeOff || [])
      .filter((t) => t.from && t.to && t.to >= t.from)
      .map((t) => ({ from: `${t.from}T00:00:00.000Z`, to: `${t.to}T23:59:59.999Z`, reason: t.reason || '' })),
  }
}

export function weeklyHours(a) {
  return (a?.weekly || []).reduce((sum, w) => {
    const [sh, sm] = String(w.start).split(':').map(Number)
    const [eh, em] = String(w.end).split(':').map(Number)
    const mins = eh * 60 + em - (sh * 60 + sm)
    return sum + (mins > 0 ? mins / 60 : 0)
  }, 0)
}

export default function AvailabilityEditor({ value, onChange }) {
  const a = value || emptyAvailability()
  const windowOf = (day) => a.weekly.find((w) => w.day === day)
  const setWindow = (day, patch) => {
    const rest = a.weekly.filter((w) => w.day !== day)
    onChange({ ...a, weekly: patch ? [...rest, { day, start: '09:00', end: '17:00', ...windowOf(day), ...patch }] : rest })
  }
  const setTimeOff = (i, patch) => onChange({ ...a, timeOff: a.timeOff.map((t, idx) => (idx === i ? { ...t, ...patch } : t)) })

  return (
    <div className="space-y-3 rounded-lg border border-border p-3">
      <div className="flex items-center justify-between">
        <p className="text-[12px] font-medium text-muted-foreground">Weekly availability</p>
        <p className="text-[12px] text-muted-foreground">{weeklyHours(a).toFixed(1)} hrs / week</p>
      </div>
      <div className="space-y-1.5">
        {DAYS.map(({ day, label }) => {
          const w = windowOf(day)
          return (
            <div key={day} className="flex items-center gap-2">
              <label className="flex w-14 items-center gap-1.5 text-[12px] text-foreground">
                <input type="checkbox" checked={Boolean(w)} onChange={(e) => setWindow(day, e.target.checked ? {} : null)} />
                {label}
              </label>
              {w ? (
                <>
                  <input type="time" aria-label={`${label} start`} value={w.start} onChange={(e) => setWindow(day, { start: e.target.value })} className={input} />
                  <span className="text-[12px] text-muted-foreground">to</span>
                  <input type="time" aria-label={`${label} end`} value={w.end} onChange={(e) => setWindow(day, { end: e.target.value })} className={input} />
                </>
              ) : (
                <span className="text-[12px] text-muted-foreground">Not available</span>
              )}
            </div>
          )
        })}
      </div>

      <div className="space-y-1.5">
        <p className="text-[12px] font-medium text-muted-foreground">Time off</p>
        {a.timeOff.map((t, i) => (
          <div key={i} className="flex flex-wrap items-center gap-2">
            <input type="date" aria-label="Time off from" value={t.from} onChange={(e) => setTimeOff(i, { from: e.target.value })} className={input} />
            <span className="text-[12px] text-muted-foreground">to</span>
            <input type="date" aria-label="Time off to" value={t.to} min={t.from || undefined} onChange={(e) => setTimeOff(i, { to: e.target.value })} className={input} />
            <input type="text" aria-label="Reason" placeholder="Reason" value={t.reason} onChange={(e) => setTimeOff(i, { reason: e.target.value })} className={`${input} w-32`} />
            <button type="button" onClick={() => onChange({ ...a, timeOff: a.timeOff.filter((_, idx) => idx !== i) })} className="text-[12px] text-destructive">
              Remove
            </button>
          </div>
        ))}
        <button type="button" onClick={() => onChange({ ...a, timeOff: [...a.timeOff, { from: '', to: '', reason: '' }] })} className="text-[12px] font-medium text-primary">
          + Add time off
        </button>
      </div>
    </div>
  )
}
