'use client'

import useSWR from 'swr'
import api from '@/lib/api'
import { getEffectiveBranch } from '@/lib/auth'

/** Shared SWR defaults — show cache instantly when revisiting tabs. */
export const analyticsSwrConfig = {
  revalidateOnFocus: false,
  revalidateOnReconnect: true,
  dedupingInterval: 60_000,
  keepPreviousData: true,
  errorRetryCount: 2,
}

const DATE_ONLY = /^\d{4}-\d{2}-\d{2}$/

/**
 * Turns a dashboard range into query params. "Today" and picked dates are
 * calendar-day ideas, so they are sent as such and the backend resolves them in
 * the STUDIO's timezone. Resolving them here would use the browser's midnight, and
 * a browser in India and a studio in New York disagree about what day it is for
 * half of every day. Accepts:
 *   - a number of days: a rolling window ending now (no calendar edge, so exact times are fine)
 *   - 0: today, from the studio's midnight until now
 *   - { period: 'today', offsetDays?, offsetYears? }: the same stretch of an earlier day
 *   - { from, to } as YYYY-MM-DD: whole studio days
 *   - { from, to } as ISO timestamps: exact instants (rolling comparison windows)
 */
export function rangeQuery(range) {
  if (range === 'mtd' || range === 'qtd' || range === 'ytd') return new URLSearchParams({ period: range }).toString()
  if (range && typeof range === 'object') {
    if (range.period) {
      const params = new URLSearchParams({ period: range.period })
      if (range.offsetDays) params.set('offsetDays', String(range.offsetDays))
      if (range.offsetMonths) params.set('offsetMonths', String(range.offsetMonths))
      if (range.offsetYears) params.set('offsetYears', String(range.offsetYears))
      return params.toString()
    }
    if (DATE_ONLY.test(range.from) && DATE_ONLY.test(range.to)) {
      return new URLSearchParams({ fromDate: range.from, toDate: range.to }).toString()
    }
    return new URLSearchParams({
      from: new Date(range.from).toISOString(),
      to: new Date(range.to).toISOString(),
    }).toString()
  }
  if (range === 0) return new URLSearchParams({ period: 'today' }).toString()
  const to = new Date()
  const from = new Date(to.getTime() - range * 24 * 60 * 60 * 1000)
  return new URLSearchParams({ from: from.toISOString(), to: to.toISOString() }).toString()
}

async function fetchOverview(path) {
  const res = await api.get(path)
  if (!res.success) throw new Error(res.error || 'Request failed')
  return res.data ?? {}
}

async function fetchLayout([, page]) {
  const res = await api.get(`/api/dashboard-layout?page=${page}`)
  if (!res.success) throw new Error(res.error || 'Failed to load layout')
  return Array.isArray(res.data) ? res.data : []
}

function branchKey() {
  return typeof window !== 'undefined' ? getEffectiveBranch() || 'all' : 'all'
}

/**
 * Dashboard overview. Cache key is stable (range + branch) so navigating away
 * and back reuses data. Dates are computed at fetch time only.
 */
/** `range`: number of days (relative) or { from, to } (custom absolute dates). */
export function useDashboardOverview(range, { enabled = true } = {}) {
  const key = enabled ? ['dashboard-overview', range, branchKey()] : null

  return useSWR(
    key,
    ([, r]) => fetchOverview(`/api/dashboard/overview?${rangeQuery(r)}`),
    analyticsSwrConfig
  )
}

/** `range`: number of days (relative) or { from, to } (custom absolute dates). */
export function useReportsOverview(range, { enabled = true } = {}) {
  const key = enabled ? ['reports-overview', range, branchKey()] : null

  return useSWR(
    key,
    ([, r]) => fetchOverview(`/api/reports/overview?${rangeQuery(r)}`),
    analyticsSwrConfig
  )
}

/**
 * `compare: true` is for the prior-period / prior-year reads that only feed MoM and
 * YoY pills — the backend skips the trend, funnel and hours work for them.
 * `legacy: true` also builds the old purchase-journey / curriculum shapes (old widget grid only).
 */
export function useOwnerDashboardOverview(rangeDays, { enabled = true, compare = false, legacy = false } = {}) {
  const key = enabled ? ['owner-dashboard-overview', rangeDays, branchKey(), compare, legacy] : null

  return useSWR(
    key,
    ([, days, , isCompare, isLegacy]) =>
      fetchOverview(`/api/dashboard/owner-overview?${rangeQuery(days)}${isCompare ? '&compare=1' : ''}${isLegacy ? '&legacy=1' : ''}`),
    analyticsSwrConfig
  )
}

/**
 * Shared shape behind every "Show full details" drill-down button — only
 * differs by which overview's detail endpoint it hits. `params` carries the
 * widget's own drill dimensions (locationID, teacherID, stageGroup, channel,
 * etc.) on top of the shared date range — only fetches once `enabled` (i.e.
 * the details modal is actually open).
 */
function useOverviewDetails(cacheKey, endpoint, { metric, range, page = 1, limit = 25, params = {}, enabled = true }) {
  const key = enabled && metric ? [cacheKey, metric, range, page, limit, params, branchKey()] : null

  return useSWR(
    key,
    ([, m, r, p, l, extra]) => {
      const qs = new URLSearchParams(rangeQuery(r))
      qs.set('metric', m)
      qs.set('page', String(p))
      qs.set('limit', String(l))
      for (const [k, v] of Object.entries(extra || {})) {
        if (v !== undefined && v !== null && v !== '') qs.set(k, v)
      }
      return fetchOverview(`${endpoint}?${qs.toString()}`)
    },
    analyticsSwrConfig
  )
}

export function useOwnerOverviewDetails(opts) {
  return useOverviewDetails('owner-overview-details', '/api/dashboard/owner-overview/details', opts)
}

export function useDashboardOverviewDetails(opts) {
  return useOverviewDetails('dashboard-overview-details', '/api/dashboard/overview/details', opts)
}

/** Per-user widget layout for dashboard / reports customize mode. */
export function useDashboardLayout(page, { enabled = true } = {}) {
  const key = enabled && page ? ['dashboard-layout', page, branchKey()] : null
  return useSWR(key, fetchLayout, {
    ...analyticsSwrConfig,
    // Layout rarely changes from the server after first load; keep it sticky.
    revalidateIfStale: false,
    revalidateOnReconnect: false,
  })
}
