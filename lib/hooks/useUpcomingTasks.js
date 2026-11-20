'use client'

import { useEffect, useState, useCallback } from 'react'
import api from '@/lib/api'
import { getStudioTimezone } from '@/lib/studioTimezone'
import { callbackInputValue, dayKeyInTz, isCallbackOverdue } from '@/lib/location-time'

// The calendar API doesn't tag every appointment with a `type` enum — regular
// bookings (lessons/services/memberships) usually have no `type` at all, and
// their kind is only inferable from which reference field is populated.
// `type === 'event'` (or a populated todoID) marks a to-do; `type === 'time'`
// marks blocked-off time, which isn't a task and gets excluded.
function deriveKind(evt) {
  if (evt.todoID || evt.type === 'event') return 'todo'
  if (evt.membershipID) return 'membership'
  if (evt.calendarServiceID) return 'service'
  if (evt.lessonID) return 'lesson'
  return evt.type || 'appointment'
}

// Leads/customers aren't assigned to a specific user in this app (only
// branch-scoped, via the x-location-id header api.js already attaches), so
// callback items aren't filtered by teacher — every user sees the branch's
// upcoming callbacks, same as the /reports/callbacks page.
async function fetchCallbacks(path, endISO, kind, limit) {
  const conditions = [
    { field: 'callbackDate', operator: 'exists', value: true },
    { field: 'callbackDate', operator: 'lte', value: endISO },
  ]
  const params = new URLSearchParams({
    page: '1',
    limit: String(limit),
    sortBy: 'callbackDate',
    sortOrder: 'asc',
    conditionLogic: 'AND',
    conditions: JSON.stringify(conditions),
  })
  const result = await api.get(`${path}?${params}`)
  if (!result.success || !Array.isArray(result.data)) return []

  return result.data.map((row) => ({
    id: `${kind}-${row._id || row.id}`,
    title: kind === 'lead-callback' ? `Follow up: ${row.name || 'Lead'}` : `Callback: ${row.name || 'Customer'}`,
    kind,
    dueDate: row.callbackDate,
    dueDayKey: callbackInputValue(row) || null,
    dueTimezone: row.locationTimezone || null,
    isOverdue: isCallbackOverdue(row, getStudioTimezone()),
    assignee: '',
    relatedName: row.phoneNumber || '',
  }))
}

// Calls waiting in the human-intervention queue (AI couldn't handle them,
// a human needs to pick up) — same "waiting" tab as /inbox/human-queue.
// These aren't scheduled for a future time, they need attention now, so
// they're always treated as overdue and sort to the top.
async function fetchHumanQueueWaiting(limit) {
  const result = await api.get('/api/human-queue?tab=waiting')
  if (!result.success || !Array.isArray(result.data)) return []

  return result.data.slice(0, limit).map((item) => ({
    id: `human-queue-${item.id || item._id}`,
    title: `Needs a human: ${item.leadName || item.callerName || 'Unknown caller'}`,
    kind: 'human-intervention',
    dueDate: item.createdAt || new Date().toISOString(),
    isOverdue: true,
    assignee: '',
    relatedName: item.phone || item.callerPhone || item.reason || '',
  }))
}

/**
 * Fetches the logged-in user's upcoming tasks for the next `days` days:
 * calendar to-dos, lead and customer callback dates, and calls waiting on
 * human intervention.
 *
 * - Calendar items: only to-dos are included (lessons/services/memberships/
 *   other bookings live on the calendar itself, not this list). To-dos are
 *   shown to everyone regardless of assignment.
 * - Callback dates: branch-scoped (via the x-location-id header), same as
 *   the /reports/callbacks page — leads/customers aren't assigned per user.
 * - Human-intervention queue: branch-scoped, same as /inbox/human-queue.
 */
// Kept relatively slow on purpose: this polls 4 endpoints per active tab, so
// the interval directly drives backend request volume as concurrent users
// grow. 90s is a deliberate tradeoff — "fresh enough" without scaling request
// count with every open tab the way a 30s poll would.
export function useUpcomingTasks({ days = 7, limit = 6, pollMs = 90000 } = {}) {
  const [tasks, setTasks] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetch = useCallback(async ({ silent = false } = {}) => {
    if (!silent) setLoading(true)
    setError(null)
    try {
      const start = new Date()
      const end = new Date()
      end.setDate(end.getDate() + days)

      const params = new URLSearchParams({
        start: start.toISOString(),
        end: end.toISOString(),
        limit: 500,
      })
      const [calendarResult, leadCallbacks, customerCallbacks, humanQueueItems] = await Promise.all([
        api.get(`/api/calendar?${params}`),
        // +1 day of slack: each contact's own 'today' may be ahead of the studio's zone.
        fetchCallbacks('/api/lead', dayKeyInTz(new Date(end.getTime() + 86400000), getStudioTimezone()), 'lead-callback', limit),
        fetchCallbacks('/api/customer', dayKeyInTz(new Date(end.getTime() + 86400000), getStudioTimezone()), 'customer-callback', limit),
        fetchHumanQueueWaiting(limit).catch(() => []),
      ])

      const calendarItems = !calendarResult.success || !Array.isArray(calendarResult.data)
        ? []
        : calendarResult.data
        .filter((evt) => evt.type !== 'time') // exclude blocked-off time, not a task
        .filter((evt) => evt.status !== 'cancelled')
        // Only to-dos belong here — lessons/services/memberships/other
        // calendar bookings are shown on the calendar itself, not this list.
        .filter((evt) => deriveKind(evt) === 'todo')
        .map((evt) => {
          const dueDate = evt.startDateTime
          const customer = Array.isArray(evt.customerIDs) ? evt.customerIDs[0] : null
          const kind = deriveKind(evt)
          return {
            id: String(evt._id || evt.id),
            title:
              evt.title ||
              customer?.name ||
              evt.calendarServiceID?.name ||
              evt.lessonID?.name ||
              (kind === 'todo' ? 'To-do' : 'Appointment'),
            kind, // 'lesson' | 'service' | 'membership' | 'todo' | 'appointment'
            dueDate,
            isOverdue: dueDate ? new Date(dueDate) < new Date() : false,
            assignee: evt.teacherID?.name || '',
            relatedName: customer?.name || '',
          }
        })

      const items = [...humanQueueItems, ...calendarItems, ...leadCallbacks, ...customerCallbacks]
        .sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate))
        .slice(0, limit)

      setTasks(items)
    } catch (err) {
      setError(err)
      setTasks([])
    } finally {
      setLoading(false)
    }
  }, [days, limit])

  useEffect(() => {
    fetch()

    if (!pollMs) return undefined

    // Poll in the background so lessons/callbacks/human-queue items that
    // change on the server (or on another tab/device) show up without a
    // manual refresh. Paused while the tab is hidden, and forced on regain
    // of focus/visibility so switching back gets you current data right away.
    const interval = setInterval(() => {
      if (document.visibilityState === 'visible') fetch({ silent: true })
    }, pollMs)

    const onFocusOrVisible = () => fetch({ silent: true })
    window.addEventListener('focus', onFocusOrVisible)
    document.addEventListener('visibilitychange', onFocusOrVisible)

    return () => {
      clearInterval(interval)
      window.removeEventListener('focus', onFocusOrVisible)
      document.removeEventListener('visibilitychange', onFocusOrVisible)
    }
  }, [fetch, pollMs])

  return { tasks, loading, error, refresh: fetch }
}
