'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { PhoneCall, PhoneIncoming, X } from 'lucide-react'
import api from '@/lib/api'
import { getCurrentUser } from '@/lib/auth'
import { hasPermission } from '@/lib/permissions'
import { isNotificationEnabled } from '@/lib/notificationPreferences'
import { startIncomingRingLoop, stopIncomingRingLoop } from '@/lib/notificationSounds'
import { getActiveConnection } from '@/lib/twilioVoiceClient'
import { cn } from '@/lib/utils'

const AGENTS_POLL_MS = 30_000
const WAITING_VISIBLE_MS = 5_000
const WAITING_HIDDEN_MS = 8_000

function waitingItemId(item) {
  return String(item?.id || item?._id || '')
}

/**
 * App-wide incoming-call popup for online Call Center agents.
 * Mounted from MainLayout — no-ops when the user cannot read Call Center.
 */
export default function GlobalIncomingCallAlert() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [enabled, setEnabled] = useState(false)
  const [online, setOnline] = useState(false)
  const [waiting, setWaiting] = useState([])
  const [dismissedIds, setDismissedIds] = useState(() => new Set())
  const [answering, setAnswering] = useState(false)
  const [alreadyOnCall, setAlreadyOnCall] = useState(false)
  const stopPollingRef = useRef(false)
  const notifiedIdsRef = useRef(new Set())
  const wasRingingRef = useRef(false)

  const canReadCallCenter = hasPermission('inbox', 'CallCenter', 'read')

  const queueTab = (searchParams?.get('tab') || 'waiting').toLowerCase()
  const onCallCenterWaiting =
    pathname === '/inbox/human-queue'
    && (queueTab === 'waiting' || queueTab === 'escalations' || queueTab === 'unassigned')

  const refreshAgents = useCallback(async () => {
    if (stopPollingRef.current || !canReadCallCenter) return
    const user = getCurrentUser()
    if (!user?.email) {
      setEnabled(false)
      setOnline(false)
      return
    }
    const r = await api.get('/api/human-queue/agents')
    if (r.status === 403) {
      stopPollingRef.current = true
      setEnabled(false)
      setOnline(false)
      return
    }
    if (!r.success) return
    const agents = Array.isArray(r.data?.agents) ? r.data.agents : (Array.isArray(r.data) ? r.data : [])
    const me = agents.find((a) => a.email === user.email)
    setEnabled(Boolean(me))
    setOnline(Boolean(me?.isAvailableForCalls))
  }, [canReadCallCenter])

  const refreshWaiting = useCallback(async () => {
    if (stopPollingRef.current || !online) {
      setWaiting([])
      return
    }
    const r = await api.get('/api/human-queue?tab=waiting')
    if (r.status === 403) {
      stopPollingRef.current = true
      setEnabled(false)
      setOnline(false)
      setWaiting([])
      return
    }
    if (!r.success) return
    const items = Array.isArray(r.data) ? r.data : (Array.isArray(r.data?.items) ? r.data.items : [])
    setWaiting(items.filter((i) => i.status === 'waiting' || !i.status))
  }, [online])

  // Gate: only users with Call Center read
  useEffect(() => {
    if (!canReadCallCenter) {
      stopPollingRef.current = true
      setEnabled(false)
      setOnline(false)
      setWaiting([])
      return
    }
    stopPollingRef.current = false
    refreshAgents()
  }, [canReadCallCenter, refreshAgents])

  // Agents poll (~30s)
  useEffect(() => {
    if (!canReadCallCenter || stopPollingRef.current) return undefined
    const id = setInterval(refreshAgents, AGENTS_POLL_MS)
    return () => clearInterval(id)
  }, [canReadCallCenter, refreshAgents])

  // Waiting poll — only while online
  useEffect(() => {
    if (!online || stopPollingRef.current) {
      setWaiting([])
      return undefined
    }

    let intervalId
    const tick = () => {
      if (stopPollingRef.current) return
      refreshWaiting()
    }
    tick()

    const schedule = () => {
      clearInterval(intervalId)
      const ms = typeof document !== 'undefined' && document.visibilityState === 'hidden'
        ? WAITING_HIDDEN_MS
        : WAITING_VISIBLE_MS
      intervalId = setInterval(tick, ms)
    }
    schedule()

    const onVisibility = () => {
      schedule()
      if (document.visibilityState === 'visible') tick()
    }
    document.addEventListener('visibilitychange', onVisibility)
    return () => {
      clearInterval(intervalId)
      document.removeEventListener('visibilitychange', onVisibility)
    }
  }, [online, refreshWaiting])

  // Keep Answer/ring in sync when Twilio connection starts on another page surface
  useEffect(() => {
    const tick = () => setAlreadyOnCall(Boolean(getActiveConnection()))
    tick()
    const id = setInterval(tick, 1500)
    return () => clearInterval(id)
  }, [])

  const visibleWaiting = waiting.filter((item) => {
    const id = waitingItemId(item)
    return id && !dismissedIds.has(id)
  })
  const nextCall = visibleWaiting[0] || null
  const nextId = nextCall ? waitingItemId(nextCall) : ''
  const showPopup = Boolean(nextCall && enabled && online && !onCallCenterWaiting)

  // Ring loop while any waiting call exists for an online agent (including Call Center waiting tab)
  useEffect(() => {
    const shouldRing =
      enabled
      && online
      && visibleWaiting.length > 0
      && !alreadyOnCall
      && !answering
      && isNotificationEnabled('humanQueue.sound')

    if (shouldRing) {
      if (!wasRingingRef.current) {
        startIncomingRingLoop()
        wasRingingRef.current = true
      }
    } else if (wasRingingRef.current) {
      stopIncomingRingLoop()
      wasRingingRef.current = false
    }

    return () => {
      if (wasRingingRef.current) {
        stopIncomingRingLoop()
        wasRingingRef.current = false
      }
    }
  }, [enabled, online, visibleWaiting.length, alreadyOnCall, answering, nextId])

  // System notification when CRM tab is in the background (permission already granted only)
  useEffect(() => {
    if (!enabled || !online || typeof window === 'undefined' || typeof Notification === 'undefined') return
    if (Notification.permission !== 'granted') return
    if (document.visibilityState !== 'hidden') return

    for (const item of visibleWaiting) {
      const id = waitingItemId(item)
      if (!id || notifiedIdsRef.current.has(id)) continue
      notifiedIdsRef.current.add(id)
      try {
        const name = item.leadName || item.callerName || 'Unknown caller'
        // eslint-disable-next-line no-new
        new Notification('Incoming call', {
          body: `${name} is waiting in the Call Center`,
          tag: `human-queue-${id}`,
        })
      } catch {
        // Notifications unavailable
      }
    }
  }, [enabled, online, visibleWaiting])

  // Clear dismissals when the call leaves the waiting list
  useEffect(() => {
    const liveIds = new Set(waiting.map(waitingItemId).filter(Boolean))
    setDismissedIds((prev) => {
      let changed = false
      const next = new Set()
      for (const id of prev) {
        if (liveIds.has(id)) next.add(id)
        else changed = true
      }
      return changed ? next : prev
    })
    for (const id of notifiedIdsRef.current) {
      if (!liveIds.has(id)) notifiedIdsRef.current.delete(id)
    }
  }, [waiting])

  const handleAnswer = () => {
    if (!nextId || alreadyOnCall || answering) return
    setAnswering(true)
    stopIncomingRingLoop()
    wasRingingRef.current = false
    router.push(`/inbox/human-queue?tab=waiting&answer=${encodeURIComponent(nextId)}`)
    // Reset answering after navigation settles; page owns the claim.
    setTimeout(() => setAnswering(false), 2500)
  }

  const handleDismiss = () => {
    if (!nextId) return
    setDismissedIds((prev) => new Set(prev).add(nextId))
  }

  if (!showPopup || !nextCall) return null

  const highPriority = nextCall.priority === 'High'

  return (
    <div
      className="pointer-events-none fixed inset-x-0 bottom-0 z-[400] flex justify-center p-4 sm:inset-x-auto sm:bottom-6 sm:right-6 sm:justify-end"
      role="alert"
      aria-live="assertive"
    >
      <div
        className={cn(
          'pointer-events-auto relative w-full max-w-sm overflow-hidden rounded-2xl border shadow-lg',
          highPriority
            ? 'border-red-300/70 bg-card'
            : 'border-[var(--studio-primary)]/40 bg-card',
        )}
      >
        <div className={cn(
          'absolute inset-y-0 left-0 w-1',
          highPriority ? 'bg-red-500 animate-pulse' : 'bg-[var(--studio-primary)] animate-pulse',
        )} />
        <div className="relative flex flex-col gap-3 p-4 pl-5">
          <div className="flex items-start justify-between gap-2">
            <div className="flex items-center gap-3 min-w-0">
              <div
                className={cn(
                  'flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-white',
                  highPriority ? 'bg-red-500 animate-pulse' : 'bg-[var(--studio-primary)]',
                )}
              >
                <PhoneIncoming className="h-5 w-5" />
              </div>
              <div className="min-w-0">
                <p className="text-sm font-semibold text-foreground">
                  Incoming call{visibleWaiting.length > 1 ? ` · ${visibleWaiting.length} waiting` : ''}
                </p>
                <p className="text-sm text-foreground truncate">
                  {nextCall.leadName || nextCall.callerName || 'Unknown caller'}
                </p>
                <p className="text-xs text-muted-foreground truncate mt-0.5">
                  {nextCall.intent || nextCall.escalationReason || 'Requested human assistance'}
                  {nextCall.waitMinutes ? ` · waiting ${nextCall.waitMinutes}m` : ''}
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={handleDismiss}
              className="rounded-lg p-1 text-muted-foreground hover:bg-muted hover:text-foreground"
              aria-label="Dismiss"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
          <button
            type="button"
            disabled={alreadyOnCall || answering}
            onClick={handleAnswer}
            className="inline-flex h-10 w-full items-center justify-center gap-2 rounded-xl bg-[var(--studio-primary)] text-sm font-semibold text-white hover:brightness-95 disabled:opacity-60"
          >
            <PhoneCall className="h-4 w-4" />
            {answering ? 'Connecting…' : alreadyOnCall ? 'Already on a call' : 'Answer'}
          </button>
        </div>
      </div>
    </div>
  )
}
