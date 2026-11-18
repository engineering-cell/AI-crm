/**
 * Customer lifecycle statuses (trial + student phase).
 * Keys stay trial_* for compatibility; labels use Trial.
 * Keep in sync with backend CUSTOMER_LIFECYCLE_STATUS_META.
 */

import { sanitizeStatusHex } from '@/lib/status-hex'

export const CUSTOMER_LIFECYCLE_STATUS_META = [
  {
    value: 'trial_unscheduled',
    label: 'Trial Unscheduled',
    phase: 'intro',
    description: 'First purchase / convert done. Trial lesson not booked yet.',
    color: '#F59E0B',
  },
  {
    value: 'trial_scheduled',
    label: 'Trial Scheduled',
    phase: 'intro',
    description: 'Trial lesson is on the calendar.',
    color: '#0EA5E9',
  },
  {
    value: 'trial_no_show',
    label: 'Trial No-Show',
    phase: 'intro',
    description: 'Missed the scheduled trial lesson.',
    color: '#F97316',
  },
  {
    value: 'group_only',
    label: 'Group Only',
    phase: 'intro',
    description:
      'Bought group classes. No intro and no program yet. Using what they paid for.',
    color: '#14B8A6',
  },
  {
    value: 'no_sale',
    label: 'No Sale',
    phase: 'intro',
    description: 'Attended trial but has not bought a program yet.',
    color: '#8B5CF6',
  },
  {
    value: 'active',
    label: 'Active',
    phase: 'student',
    description: 'Bought a program / package again — active student.',
    color: '#059669',
  },
  {
    value: 'inactive',
    label: 'Inactive',
    phase: 'student',
    description: 'Lapsed or idle — no recent activity or enrollment.',
    color: '#E11D48',
  },
  {
    value: 'archived',
    label: 'Archived',
    phase: 'student',
    description: 'Closed / no longer managed in the active pipeline.',
    color: '#64748B',
  },
]

export const CUSTOMER_LIFECYCLE_STATUS_OPTIONS = CUSTOMER_LIFECYCLE_STATUS_META.map(
  ({ value, label }) => ({ value, label })
)

let _orgStatusCache = null

export function setCustomerLifecycleStatusCache(rows) {
  _orgStatusCache = Array.isArray(rows) && rows.length ? rows : null
}

export function findCustomerLifecycleStatus(status, statuses) {
  const key = String(status || '').toLowerCase()
  const list =
    Array.isArray(statuses) && statuses.length
      ? statuses
      : _orgStatusCache
  if (Array.isArray(list) && list.length) {
    const match = list.find((s) => String(s.value || '').toLowerCase() === key)
    if (match) return match
  }
  return CUSTOMER_LIFECYCLE_STATUS_META.find((s) => s.value === key) || null
}

export function customerLifecycleLabel(status, statuses) {
  const key = String(status || '').toLowerCase()
  return (
    findCustomerLifecycleStatus(status, statuses)?.label ||
    (key ? key.replace(/_/g, ' ') : 'Active')
  )
}

export function customerLifecycleColor(status, statuses) {
  const key = String(status || 'active').toLowerCase()
  const hex = sanitizeStatusHex(findCustomerLifecycleStatus(key, statuses)?.color)
  if (hex) return hex
  return sanitizeStatusHex(
    CUSTOMER_LIFECYCLE_STATUS_META.find((s) => s.value === 'active')?.color
  )
}

export function customerLifecycleBadgeClass(status) {
  switch (String(status || '').toLowerCase()) {
    case 'inactive':
      return 'bg-rose-100 text-rose-600 dark:bg-rose-900/30 dark:text-rose-400'
    case 'archived':
      return 'bg-muted text-muted-foreground dark:bg-slate-800/60 dark:text-muted-foreground'
    case 'trial_scheduled':
      return 'bg-sky-100 text-sky-700 dark:bg-sky-900/30 dark:text-sky-400'
    case 'trial_unscheduled':
      return 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400'
    case 'trial_no_show':
      return 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400'
    case 'group_only':
      return 'bg-teal-100 text-teal-700 dark:bg-teal-900/30 dark:text-teal-400'
    case 'no_sale':
      return 'bg-violet-100 text-violet-700 dark:bg-violet-900/30 dark:text-violet-400'
    case 'active':
    default:
      return 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400'
  }
}

export function getCustomerLifecycleBadgeProps(status, statuses) {
  const color = customerLifecycleColor(status, statuses)
  if (color) {
    return { className: 'status-color-badge', style: { '--status-color': color } }
  }
  return { className: customerLifecycleBadgeClass(status), style: undefined }
}

export function normalizeCustomerLifecycleMeta(rows) {
  if (!Array.isArray(rows) || !rows.length) return CUSTOMER_LIFECYCLE_STATUS_META.map((s) => ({ ...s }))
  const byKey = new Map(
    rows.map((row) => [String(row.value || row.key || '').toLowerCase(), row])
  )
  return CUSTOMER_LIFECYCLE_STATUS_META.map((meta) => {
    const row = byKey.get(meta.value)
    if (!row) return { ...meta }
    return {
      value: meta.value,
      label: String(row.label || row.name || '').trim() || meta.label,
      phase: row.phase || meta.phase,
      description: row.description != null ? String(row.description) : meta.description,
      color: sanitizeStatusHex(row.color) || meta.color,
      id: row.id || row._id || undefined,
    }
  })
}
