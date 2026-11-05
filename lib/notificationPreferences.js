import { getCurrentUser, updateSessionUser } from './auth'

/**
 * The alerts a user can switch on or off. Every entry here is enforced where the
 * alert is raised (see `isNotificationEnabled` / `useNotificationEnabled`
 * callers), so don't list a toggle that does nothing. Keys must match
 * NOTIFICATION_KEYS in the backend's helper/notificationPreferences.helper.js,
 * which is what the API accepts.
 */
export const MASTER_KEY = 'all'

export const NOTIFICATION_GROUPS = [
  {
    id: 'popups',
    title: 'Pop-up messages',
    description: 'Short messages that appear after you save, send or change something.',
    items: [
      {
        key: 'toast.success',
        label: 'Confirmations',
        description: 'Saved, sent, created and other success messages.',
      },
      {
        key: 'toast.error',
        label: 'Errors and warnings',
        description: 'Messages that tell you something failed.',
        offWarning: 'With this off, a failed save or send will not show any message.',
      },
    ],
  },
  {
    id: 'humanQueue',
    title: 'Human queue',
    description: 'When the AI hands a lead to your team.',
    items: [
      {
        key: 'humanQueue.sound',
        label: 'Sound when a lead is waiting',
        description: 'A repeating ring anywhere in the app when a lead is waiting and you are online for calls.',
        preview: 'sound',
      },
    ],
  },
  {
    id: 'dashboard',
    title: 'Dashboard',
    description: 'Alerts shown on your dashboard.',
    items: [
      {
        key: 'dashboard.urgentBanner',
        label: 'Urgent intervention banner',
        description: 'The red Human Intervention Required banner at the top.',
      },
    ],
  },
  {
    id: 'reminders',
    title: 'Reminders',
    description: 'Nudges about work that needs you.',
    items: [
      {
        key: 'tasks.badge',
        label: 'New task indicator',
        description: 'The red dot on Upcoming Tasks in the sidebar when something new is due.',
      },
    ],
  },
]

export const ALL_KEYS = [MASTER_KEY, ...NOTIFICATION_GROUPS.flatMap((g) => g.items.map((i) => i.key))]

/** Stored preferences with every unset key treated as ON. */
export function resolvePreferences(stored) {
  const prefs = {}
  for (const key of ALL_KEYS) prefs[key] = stored?.[key] !== false
  return prefs
}

export function getNotificationPreferences() {
  return resolvePreferences(getCurrentUser()?.notificationPreferences)
}

/** Whether `key` may alert right now: its own switch AND the master switch. */
export function isNotificationEnabled(key) {
  const prefs = getNotificationPreferences()
  return prefs[MASTER_KEY] && prefs[key] !== false
}

/** Caches saved preferences on the local session so every alert site sees them at once. */
export function cacheNotificationPreferences(stored) {
  updateSessionUser({ notificationPreferences: stored })
}
