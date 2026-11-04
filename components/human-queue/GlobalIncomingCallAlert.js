'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { PhoneCall, X } from 'lucide-react'
import api from '@/lib/api'
import { getCurrentUser } from '@/lib/auth'
import { hasPermission } from '@/lib/permissions'
import { isNotificationEnabled } from '@/lib/notificationPreferences'
import { startIncomingRingLoop, stopIncomingRingLoop } from '@/lib/notificationSounds'
import { getActiveConnection } from '@/lib/twilioVoiceClient'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { cn, getInitials } from '@/lib/utils'

const AGENTS_POLL_MS = 30_000
const WAITING_VISIBLE_MS = 5_000
const WAITING_HIDDEN_MS = 8_000

function waitingItemId(item) {
  return String(item?.id || item?._id || '')
}

function sameEmail(a, b) {
  return String(a || '').trim().toLowerCase() === String(b || '').trim().toLowerCase()
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
  const [canAnswer, setCanAnswer] = useState(false)
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
      setCanAnswer(false)
      return
    }
    const r = await api.get('/api/human-queue/agents')
    if (r.status === 403) {
      stopPollingRef.current = true
      setEnabled(false)
      setOnline(false)
      setCanAnswer(false)
      return
    }
    if (!r.success) return
    const agents = Array.isArray(r.data?.agents) ? r.data.agents : (Array.isArray(r.data) ? r.data : [])
    const me = agents.find((a) => sameEmail(a.email, user.email))
    const manage = Array.isArray(r.data) ? false : Boolean(r.data?.canManageCalls)
    setEnabled(Boolean(me))
    setOnline(Boolean(me?.isAvailableForCalls))
    setCanAnswer(manage)
  }, [canReadCallCenter])

  const refreshWaiting = useCallback(async () => {
    if (stopPollingRef.current || !online || !canAnswer) {
      setWaiting([])
      return
    }
    const r = await api.get('/api/human-queue?tab=waiting')
    if (r.status === 403) {
      stopPollingRef.current = true
      setEnabled(false)
      setOnline(false)
      setCanAnswer(false)
      setWaiting([])
      return
    }
    if (!r.success) return
    const items = Array.isArray(r.data) ? r.data : (Array.isArray(r.data?.items) ? r.data.items : [])
    setWaiting(items.filter((i) => i.status === 'waiting' || !i.status))
  }, [online, canAnswer])

  // Gate: only users with Call Center read
  useEffect(() => {
    if (!canReadCallCenter) {
      stopPollingRef.current = true
      setEnabled(false)
      setOnline(false)
      setCanAnswer(false)
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
    if (!online || !canAnswer || stopPollingRef.current) {
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
  }, [online, canAnswer, refreshWaiting])

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
  const showPopup = Boolean(nextCall && enabled && online && canAnswer && !onCallCenterWaiting)

  // Ring loop while any waiting call exists for an online agent (including Call Center waiting tab)
  useEffect(() => {
    const shouldRing =
      enabled
      && online
      && canAnswer
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
  }, [enabled, online, canAnswer, visibleWaiting.length, alreadyOnCall, answering, nextId])

  // System notification when CRM tab is in the background (permission already granted only)
  useEffect(() => {
    if (!enabled || !online || !canAnswer || typeof window === 'undefined' || typeof Notification === 'undefined') return
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
  }, [enabled, online, canAnswer, visibleWaiting])

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
  const callerName = nextCall.leadName || nextCall.callerName || 'Unknown caller'
  const callerPhone = nextCall.phone || nextCall.callerPhone || ''
  const reason = nextCall.intent || nextCall.escalationReason || 'Requested human assistance'
  const waitingLabel = nextCall.waitMinutes
    ? `Waiting ${nextCall.waitMinutes}m`
    : 'Just now'
  const queueLabel = visibleWaiting.length > 1
    ? `${visibleWaiting.length} waiting`
    : '1 in queue'

  return (
    <div
      className="pointer-events-none fixed inset-x-0 bottom-0 z-[400] flex justify-center p-4 sm:inset-x-auto sm:bottom-6 sm:right-6 sm:justify-end sm:p-0"
      role="alert"
      aria-live="assertive"
    >
      <div className="pointer-events-auto w-full max-w-[380px] overflow-hidden rounded-2xl border border-border bg-card shadow-2xl animate-scale-in">
        <div className="flex items-center justify-between gap-3 border-b border-border bg-muted/40 px-4 py-2.5">
          <div className="flex min-w-0 items-center gap-2">
            <span className="relative flex h-2 w-2 shrink-0">
              <span className={cn(
                'absolute inline-flex h-full w-full animate-ping rounded-full opacity-70',
                highPriority ? 'bg-red-500' : 'bg-[var(--studio-primary)]',
              )} />
              <span className={cn(
                'relative inline-flex h-2 w-2 rounded-full',
                highPriority ? 'bg-red-500' : 'bg-[var(--studio-primary)]',
              )} />
            </span>
            <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
              Incoming call
            </p>
            {highPriority && (
              <span className="rounded-full bg-red-500/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-red-600 dark:text-red-400">
                High
              </span>
            )}
          </div>
          <button
            type="button"
            onClick={handleDismiss}
            className="rounded-lg p-1.5 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            aria-label="Dismiss"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="space-y-4 p-4">
          <div className="flex items-center gap-3">
            <Avatar className="h-12 w-12 border border-border">
              <AvatarFallback className="bg-[var(--studio-primary)] text-sm font-semibold text-white">
                {getInitials(callerName)}
              </AvatarFallback>
            </Avatar>
            <div className="min-w-0">
              <p className="truncate text-base font-semibold text-foreground">{callerName}</p>
              {callerPhone ? (
                <p className="truncate text-sm text-muted-foreground">{callerPhone}</p>
              ) : null}
              <p className="mt-0.5 text-xs text-muted-foreground">
                {waitingLabel}
                <span className="px-1.5 text-border">·</span>
                {queueLabel}
              </p>
            </div>
          </div>

          <div className="rounded-xl border border-border bg-muted/30 px-3 py-2.5">
            <p className="text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
              Why they called
            </p>
            <p className="mt-1 line-clamp-2 text-sm leading-snug text-foreground">{reason}</p>
          </div>

          <button
            type="button"
            disabled={alreadyOnCall || answering}
            onClick={handleAnswer}
            className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-[var(--studio-primary)] text-sm font-semibold text-white shadow-sm transition-all hover:brightness-95 disabled:opacity-60"
          >
            <PhoneCall className="h-4 w-4" />
            {answering ? 'Connecting…' : alreadyOnCall ? 'Already on a call' : 'Answer call'}
          </button>
        </div>
      </div>
    </div>
  )
}
