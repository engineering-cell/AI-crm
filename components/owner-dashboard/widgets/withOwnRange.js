'use client'

import { useEffect, useRef, useState } from 'react'
import { useOwnerDashboardOverview } from '@/lib/hooks/useAnalyticsOverview'

const RANGE_LOADER = <div className="h-40 animate-pulse rounded-xl bg-muted/40" />

/** `a`/`b` are each either a number of days or a { from, to } custom range. */
function sameRange(a, b) {
  if (a === b) return true
  if (a && b && typeof a === 'object' && typeof b === 'object') return a.from === b.from && a.to === b.to
  return false
}

/**
 * Tracks a widget's own range, seeded from and re-synced to the page-level
 * default (props.defaultRange, set by the top toolbar picker) — but once the
 * user picks a range on this specific widget, it "sticks": further page-level
 * changes stop overriding it until the widget is reset (e.g. layout reset).
 */
function useWidgetRange(defaultRange) {
  const [rangeDays, setRangeDays] = useState(defaultRange)
  const [overridden, setOverridden] = useState(false)
  const prevDefaultRef = useRef(defaultRange)

  useEffect(() => {
    if (!sameRange(prevDefaultRef.current, defaultRange)) {
      prevDefaultRef.current = defaultRange
      if (!overridden) setRangeDays(defaultRange)
    }
  }, [defaultRange, overridden])

  function onRangeChange(next) {
    setOverridden(true)
    setRangeDays(next)
  }

  return [rangeDays, onRangeChange]
}

/**
 * Wraps an owner-dashboard widget so it manages its own date range and fetches
 * owner-overview data independently of every other widget — e.g. "Revenue by
 * Studio" can show 90D while "Lessons Trend" shows 7D at the same time.
 * Widgets sharing the same range still hit one deduped SWR request (see
 * analyticsSwrConfig.dedupingInterval), so a shared default doesn't multiply
 * network calls. `defaultRange` comes from the page's top-level date picker
 * (via sharedProps) and seeds every widget that hasn't been overridden locally.
 */
export function withOwnRange(WidgetComponent, { defaultRangeDays = 30 } = {}) {
  function Wrapped({ defaultRange }) {
    const [rangeDays, onRangeChange] = useWidgetRange(defaultRange ?? defaultRangeDays)
    const { data, isLoading } = useOwnerDashboardOverview(rangeDays, { legacy: true })

    if (isLoading && !data) return RANGE_LOADER

    return <WidgetComponent {...(data || {})} rangeDays={rangeDays} onRangeChange={onRangeChange} />
  }
  Wrapped.displayName = `WithOwnRange(${WidgetComponent.displayName || WidgetComponent.name || 'Widget'})`
  return Wrapped
}

/**
 * Same idea, but for widgets that fetch their own data directly (e.g.
 * LeadsByUploadTypeWidget hits /api/lead itself) rather than reading from
 * owner-overview — this just supplies the local range state + setter, synced
 * to the page-level default the same way as withOwnRange.
 */
export function withRangeState(WidgetComponent, { defaultRangeDays = 30 } = {}) {
  function Wrapped({ defaultRange, ...props }) {
    const [rangeDays, onRangeChange] = useWidgetRange(defaultRange ?? defaultRangeDays)
    return <WidgetComponent {...props} rangeDays={rangeDays} onRangeChange={onRangeChange} />
  }
  Wrapped.displayName = `WithRangeState(${WidgetComponent.displayName || WidgetComponent.name || 'Widget'})`
  return Wrapped
}
