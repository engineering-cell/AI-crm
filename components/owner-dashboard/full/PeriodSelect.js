'use client'

import { useState } from 'react'

export const PERIOD_OPTIONS = [
  { value: 'mtd', label: 'Month to date' },
  { value: 30, label: 'Last 30 days' },
  { value: 'qtd', label: 'Quarter to date' },
  { value: 'ytd', label: 'Year to date' },
  { value: 'custom', label: 'Custom' },
]

export function periodLabel(range) {
  if (range && typeof range === 'object') return `${range.from} → ${range.to}`
  return PERIOD_OPTIONS.find((o) => o.value === range)?.label || 'Month to date'
}

/** Period dropdown from the spec: Month to date · Last 30 days · Quarter to date · Year to date · Custom. */
export default function PeriodSelect({ value, onChange }) {
  const isCustom = value && typeof value === 'object'
  const [from, setFrom] = useState(isCustom ? value.from : '')
  const [to, setTo] = useState(isCustom ? value.to : '')
  const [showCustom, setShowCustom] = useState(false)

  const apply = (f, t) => {
    if (f && t && f <= t) onChange({ from: f, to: t })
  }

  return (
    <div className="flex flex-wrap items-center gap-2">
      <select
        aria-label="Period"
        value={isCustom || showCustom ? 'custom' : String(value)}
        onChange={(e) => {
          const v = e.target.value
          if (v === 'custom') return setShowCustom(true)
          setShowCustom(false)
          onChange(v === '30' ? 30 : v)
        }}
        className="h-9 rounded-lg border border-border bg-background px-3 text-[13px] font-semibold text-foreground"
      >
        {PERIOD_OPTIONS.map((o) => (
          <option key={o.value} value={String(o.value)}>
            {o.label}
          </option>
        ))}
      </select>
      {(isCustom || showCustom) && (
        <>
          <input type="date" aria-label="Start date" value={from} onChange={(e) => { setFrom(e.target.value); apply(e.target.value, to) }} className="h-9 rounded-lg border border-border bg-background px-2 text-[13px]" />
          <input type="date" aria-label="End date" value={to} min={from || undefined} onChange={(e) => { setTo(e.target.value); apply(from, e.target.value) }} className="h-9 rounded-lg border border-border bg-background px-2 text-[13px]" />
        </>
      )}
    </div>
  )
}
