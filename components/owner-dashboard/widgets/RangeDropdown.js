'use client'

import { ChevronDown } from 'lucide-react'
import { NAMED_RANGE_OPTIONS } from '@/lib/dashboardRanges'

const OPTIONS = [
  // 0 is the studio's current day so far. Without this option the select could not
  // represent a "Today" page range and fell back to showing "Last 7 days".
  { label: 'Today', days: 0 },
  { label: 'Last 7 days', days: 7 },
  { label: 'Last 30 days', days: 30 },
  { label: 'Last 90 days', days: 90 },
  { label: 'Last 12 months', days: 365 },
  ...NAMED_RANGE_OPTIONS.filter((o) => o.value !== 'today').map((o) => ({ label: o.label, days: o.value })),
]

function isCustomRange(value) {
  return Boolean(value && typeof value === 'object' && value.from && value.to)
}

/**
 * Compact per-widget range selector for owner-dashboard cards. Presets only —
 * if this widget inherited a custom date range from the top-level page picker
 * (and hasn't been overridden locally), it shows that range as a disabled
 * placeholder option; picking any preset here switches the widget off the
 * custom range and overrides the page default, same as picking any other preset.
 */
export default function RangeDropdown({ value, onChange }) {
  const custom = isCustomRange(value)

  return (
    <div className="relative">
      <select
        value={custom ? 'custom' : value}
        onChange={(e) => onChange(/^[0-9]+$/.test(e.target.value) ? Number(e.target.value) : e.target.value)}
        className="h-7 appearance-none rounded-md border border-border bg-background py-0 pl-2.5 pr-6 text-[12px] font-medium text-foreground focus:outline-none focus:ring-1 focus:ring-ring"
      >
        {custom && (
          <option value="custom" disabled>
            {value.from} → {value.to}
          </option>
        )}
        {OPTIONS.map((opt) => (
          <option key={opt.days} value={opt.days}>
            {opt.label}
          </option>
        ))}
      </select>
      <ChevronDown className="pointer-events-none absolute right-1.5 top-1/2 h-3 w-3 -translate-y-1/2 text-muted-foreground" />
    </div>
  )
}
