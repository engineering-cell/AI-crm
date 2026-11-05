'use client'

import { Suspense, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { useRouter, useSearchParams } from 'next/navigation'
import {
  ArrowRightLeft,
  CheckCircle2,
  ChevronDown,
  Clock3,
  Headphones,
  Mail,
  MessageSquare,
  PhoneCall,
  PhoneForwarded,
  PhoneMissed,
  Settings,
  UserCheck,
  Users,
} from 'lucide-react'
import MainLayout from '@/components/layout/MainLayout'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { cn, formatDateTime, getInitials } from '@/lib/utils'
import { toStudioLocalDate } from '@/lib/studioLocalDate'
import { getStudioTimezone } from '@/lib/studioTimezone'
import GlobalLoader from '@/components/shared/GlobalLoader'
import api from '@/lib/api'
import { isPersistedCallId, nextOutboundPanelStatus } from '@/lib/outboundCallStatus'
import { useToast } from '@/components/ui/toast'
import { getCurrentUser } from '@/lib/auth'
import { canManageCallCenter, hasPermission } from '@/lib/permissions'
import {
  disconnectConnection,
  joinConferenceCall,
  subscribeToConnectionEvents,
} from '@/lib/twilioVoiceClient'
import ActiveCallPanel from '@/components/human-queue/ActiveCallPanel'
import IncomingCallBanner from '@/components/human-queue/IncomingCallBanner'
import ResolvedCallDetail from '@/components/human-queue/ResolvedCallDetail'
import CallbackContactDialog from '@/components/human-queue/CallbackContactDialog'

const CALLBACK_CHANNEL_META = {
  call: {
    label: 'Call',
    icon: PhoneCall,
    className: 'bg-info/10 text-info',
  },
  sms: {
    label: 'SMS',
    icon: MessageSquare,
    className: 'bg-success/10 text-success',
  },
  email: {
    label: 'Email',
    icon: Mail,
    className: 'bg-[var(--studio-primary-light)] text-[var(--studio-primary)]',
  },
}

function callbackChannelMeta(channel) {
  const key = String(channel || 'call').toLowerCase()
  return CALLBACK_CHANNEL_META[key] || CALLBACK_CHANNEL_META.call
}

const CALLBACK_STATUS_FILTERS = [
  { value: '', label: 'All' },
  { value: 'pending', label: 'Pending' },
  { value: 'resolved', label: 'Resolved' },
  { value: 'cancelled', label: 'Cancelled' },
]

const CALLBACK_PAGE_SIZE = 20

const HUMAN_QUEUE_TABS = [
  { id: 'waiting', label: 'Waiting' },
  { id: 'active', label: 'Active' },
  { id: 'resolved', label: 'Resolved' },
  { id: 'callbacks', label: 'Callbacks' },
]

const LEGACY_TAB_MAP = {
  escalations: 'waiting',
  unassigned: 'waiting',
  assigned: 'active',
  transferred: 'active',
}

const LIVE_POLL_MS = 8000
const HISTORY_POLL_MS = 30000
const CALLBACK_POLL_MS = 15000

const TRANSFER_MODE_OPTIONS = [
  {
    id: 'smart',
    label: 'Smart Route',
    desc: 'Transfer to queue if any team member is online — calls wait even if everyone is busy. Switches to callback if nobody is online.',
  },
  {
    id: 'callback_only',
    label: 'Callback Only',
    desc: 'Always schedule a callback — no live transfers, even when agents are online.',
  },
]


function priorityClasses(priority) {
  if (priority === 'High') return 'bg-destructive/10 text-destructive'
  if (priority === 'Medium') return 'bg-warning/10 text-warning'
  return 'bg-success/10 text-success'
}

function waitTimeClasses(minutes) {
  if (minutes >= 15) return 'text-destructive'
  if (minutes >= 8) return 'text-warning'
  return 'text-success'
}

function statusBadgeClasses(status) {
  if (status === 'waiting') return 'bg-warning/10 text-warning'
  if (status === 'in_progress') return 'bg-success/10 text-success'
  if (status === 'claimed') return 'bg-info/10 text-info'
  if (status === 'abandoned') return 'bg-destructive/10 text-destructive'
  if (status === 'resolved') return 'bg-muted text-muted-foreground'
  return 'bg-muted text-muted-foreground'
}

function statusLabel(status) {
  if (status === 'in_progress') return 'On call'
  if (status === 'claimed') return 'Claimed'
  if (status === 'waiting') return 'Waiting'
  if (status === 'abandoned') return 'Disconnected'
  if (status === 'resolved') return 'Resolved'
  if (!status) return 'Unknown'
  return String(status).replace(/_/g, ' ')
}

function endedReasonLabel(reason) {
  if (!reason) return null
  const map = {
    customer_hangup: 'Caller hung up',
    agent_resolve: 'Marked resolved',
    agent_hangup: 'Agent ended call',
    conference_end: 'Call ended',
    stale: 'Timed out in queue',
    transfer_failed: 'Transfer failed',
  }
  return map[reason] || String(reason).replace(/_/g, ' ')
}

function getEndedAt(item) {
  return item?.endedAt || item?.resolvedAt || item?.abandonedAt || item?.callerLeftAt || item?.updatedAt || null
}

function formatShortTime(date) {
  if (!date) return '—'
  if (Number.isNaN(new Date(date).getTime())) return '—'
  // Shifted onto the studio's wall clock, so "today" and the labels are the studio's.
  const d = toStudioLocalDate(new Date(date), getStudioTimezone())
  const now = toStudioLocalDate(new Date(), getStudioTimezone())
  const sameDay = d.toDateString() === now.toDateString()
  if (sameDay) {
    return d.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })
  }
  return d.toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  })
}

function extractList(result) {
  return Array.isArray(result?.data) ? result.data : []
}

function normalizeTab(tab) {
  const raw = tab || 'waiting'
  return LEGACY_TAB_MAP[raw] || raw
}

function Toggle({ checked, onChange, disabled }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      disabled={disabled}
      onClick={() => onChange(!checked)}
      className={cn(
        'relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none disabled:opacity-50',
        checked ? 'bg-[var(--studio-primary)]' : 'bg-muted',
      )}
    >
      <span
        className={cn(
          'inline-block h-4 w-4 transform rounded-full bg-primary-foreground shadow transition-transform',
          checked ? 'translate-x-6' : 'translate-x-1',
        )}
      />
    </button>
  )
}

// ── Settings Panel ────────────────────────────────────────────────────────────

function SettingsPanel({ onClose, canEdit }) {
  const toast = useToast()
  const [settings, setSettings] = useState(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [draft, setDraft] = useState(null)

  useEffect(() => {
    api.get('/api/human-queue/settings').then((r) => {
      if (r.success) {
        const data = { transferMode: r.data?.transferMode || 'smart' }
        setSettings(data)
        setDraft(data)
      }
    }).finally(() => setLoading(false))
  }, [])

  const hasChanges = canEdit && draft && settings && draft.transferMode !== settings.transferMode

  const handleSave = async () => {
    if (!canEdit) return
    setSaving(true)
    try {
      const r = await api.patch('/api/human-queue/settings', { transferMode: draft.transferMode })
      if (!r.success) throw new Error(r.error || 'Failed to save settings')
      const saved = { transferMode: r.data?.transferMode || draft.transferMode }
      setSettings(saved)
      setDraft(saved)
      toast.success({ title: 'Saved', message: 'Routing settings updated.' })
    } catch (err) {
      toast.error({ title: 'Error', message: err.message })
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="rounded-2xl border border-border bg-card shadow-sm overflow-hidden">
      <div className="flex items-center justify-between gap-3 border-b border-border px-5 py-4">
        <div>
          <h2 className="text-sm font-semibold text-foreground">Call Routing Settings</h2>
          <p className="text-xs text-muted-foreground mt-0.5">
            {canEdit
              ? 'Choose how the AI routes calls when a caller asks to speak with a human'
              : 'View-only — you can see the current routing configuration'}
          </p>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="rounded-lg p-1.5 text-muted-foreground hover:bg-muted hover:text-foreground"
        >
          <ChevronDown className="h-4 w-4" />
        </button>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-10">
          <GlobalLoader variant="inline" size="sm" text="Loading settings…" />
        </div>
      ) : (
        <div className="p-5 space-y-5">

          {/* Routing mode */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-3">
              Routing Mode
            </p>
            <div className="grid gap-2">
              {TRANSFER_MODE_OPTIONS.map((opt) => {
                const isSelected = draft?.transferMode === opt.id
                return (
                  <button
                    key={opt.id}
                    type="button"
                    disabled={!canEdit}
                    onClick={() => {
                      if (!canEdit) return
                      setDraft((d) => ({ ...d, transferMode: opt.id }))
                    }}
                    className={cn(
                      'flex items-start gap-3 rounded-xl border p-4 text-left transition-all',
                      isSelected
                        ? 'border-[var(--studio-primary)] bg-[var(--studio-primary-light)]/40'
                        : 'border-border bg-background',
                      canEdit
                        ? 'hover:border-[var(--studio-primary)]/40'
                        : 'cursor-default opacity-90',
                    )}
                  >
                    <span className={cn(
                      'mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full border-2 transition-all',
                      isSelected ? 'border-[var(--studio-primary)] bg-[var(--studio-primary)]' : 'border-muted-foreground/40',
                    )}>
                      {isSelected && <span className="h-1.5 w-1.5 rounded-full bg-primary-foreground" />}
                    </span>
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-foreground">{opt.label}</p>
                      <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">{opt.desc}</p>
                    </div>
                  </button>
                )
              })}
            </div>
          </div>

          {/* Info note */}
          <div className="rounded-xl border border-border bg-muted/40 px-4 py-3">
            <p className="text-xs text-muted-foreground leading-relaxed">
              <span className="font-semibold text-foreground">Escalation rules:</span>{' '}
              The AI transfers immediately when the caller <span className="font-medium">asks for a person</span>.
              If it cannot answer something, it offers a team member and transfers only after they say yes.
              Frustration alone or a casual &quot;call me later&quot; does not escalate.
            </p>
          </div>

          {!canEdit && (
            <p className="text-xs text-muted-foreground">
              You have view-only access. Ask an admin for Queue Settings write permission to make changes.
            </p>
          )}

          {hasChanges && (
            <button
              type="button"
              disabled={saving}
              onClick={handleSave}
              className="inline-flex h-10 w-full items-center justify-center gap-2 rounded-xl bg-[var(--studio-primary)] text-sm font-semibold text-white hover:brightness-95 disabled:opacity-60"
            >
              {saving ? 'Saving…' : 'Save settings'}
            </button>
          )}
        </div>
      )}
    </div>
  )
}

// ── Main Page ────────────────────────────────────────────────────────────────

function HumanQueuePageContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const toast = useToast()
  const rawTab = searchParams?.get('tab') || 'waiting'
  const activeTab = normalizeTab(rawTab)
  const currentUser = getCurrentUser()

  // Redirect legacy tab URLs once
  useEffect(() => {
    if (LEGACY_TAB_MAP[rawTab]) {
      const params = new URLSearchParams(searchParams?.toString() || '')
      params.set('tab', LEGACY_TAB_MAP[rawTab])
      router.replace(`/inbox/human-queue?${params.toString()}`)
    }
  }, [rawTab, router, searchParams])

  const [escalations, setEscalations] = useState([])
  const [agents, setAgents] = useState([])
  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)
  const [selectedEscalationId, setSelectedEscalationId] = useState(null)
  const [historyDetailItem, setHistoryDetailItem] = useState(null)
  const [answeringId, setAnsweringId] = useState(null)
  const [resolvingId, setResolvingId] = useState(null)
  const [tabCounts, setTabCounts] = useState({
    waiting: 0, active: 0, resolved: 0, callbacks: 0,
  })
  const [showSettings, setShowSettings] = useState(false)

  const [voiceSetupReady, setVoiceSetupReady] = useState(null)
  const [activeConnection, setActiveConnection] = useState(null)
  const [activeCall, setActiveCall] = useState(null)
  const [callStatus, setCallStatus] = useState('idle')
  const [callbackOutboundCall, setCallbackOutboundCall] = useState(null)
  const [callbackOutboundConnection, setCallbackOutboundConnection] = useState(null)
  const [callbackOutboundStatus, setCallbackOutboundStatus] = useState('connecting')

  const canViewSettings = hasPermission('inbox', 'QueueSettings', 'read')
  const canEditSettings = hasPermission('inbox', 'QueueSettings', 'write')
  // Server flags from /agents (authoritative — uses fresh DB permissions)
  const [canManageCalls, setCanManageCalls] = useState(false)
  const [canToggleOwnAvailability, setCanToggleOwnAvailability] = useState(false)

  // Clear history detail when leaving Resolved tab
  useEffect(() => {
    if (activeTab !== 'resolved') setHistoryDetailItem(null)
  }, [activeTab])

  // Ref mirrors activeCall so fetchQueueData can read it without being in useCallback deps.
  // Without this, setActiveCall would recreate fetchQueueData → restart poll interval → spinner loop.
  const activeCallRef = useRef(null)
  useEffect(() => { activeCallRef.current = activeCall }, [activeCall])

  const activeConnectionRef = useRef(null)
  useEffect(() => { activeConnectionRef.current = activeConnection }, [activeConnection])

  const toastRef = useRef(toast)
  useEffect(() => { toastRef.current = toast }, [toast])

  const callerDisconnectToastRef = useRef(false)
  const answerParamHandledRef = useRef(null)
  const endingCallbackOutboundRef = useRef(false)
  const endCallbackOutboundRef = useRef(null)
  const callbackOutboundConnectionRef = useRef(null)
  const callbackOutboundCallRef = useRef(null)
  const callbackOutboundStatusRef = useRef('connecting')
  const callbackAttemptRef = useRef(0)
  const setOutboundStatus = useCallback((next) => {
    callbackOutboundStatusRef.current = next
    setCallbackOutboundStatus(next)
  }, [])

  const clearActiveCallUi = useCallback((message) => {
    disconnectConnection(activeConnectionRef.current)
    setActiveConnection(null)
    setActiveCall(null)
    setCallStatus('idle')
    if (message && !callerDisconnectToastRef.current) {
      callerDisconnectToastRef.current = true
      toastRef.current?.info?.({ title: 'Call disconnected', message })
      setTimeout(() => { callerDisconnectToastRef.current = false }, 2000)
    }
  }, [])

  // -- Callbacks tab state --
  const [callbacks, setCallbacks] = useState([])
  const [callbacksLoading, setCallbacksLoading] = useState(false)
  const [markingCalledId, setMarkingCalledId] = useState(null)
  const [cancellingCallbackId, setCancellingCallbackId] = useState(null)
  const [callbackStats, setCallbackStats] = useState({
    pending: 0,
    resolved: 0,
    called: 0,
    cancelled: 0,
  })
  const [callbackFilter, setCallbackFilter] = useState('pending')
  const [selectedCallback, setSelectedCallback] = useState(null)
  const [callbackPage, setCallbackPage] = useState(1)
  const [callbackTotal, setCallbackTotal] = useState(0)
  const callbackFetchGenRef = useRef(0)

  // -- Agent availability toggling --
  const [togglingAgentId, setTogglingAgentId] = useState(null)

  const fetchToken = useCallback(() => api.get('/api/human-queue/voice-token'), [])

  useEffect(() => {
    api.get('/api/human-queue/voice-setup').then((r) => {
      if (r.success) setVoiceSetupReady(Boolean(r.data?.ready))
    })
  }, [])

  const applyAgentsPermissionPayload = useCallback((payload) => {
    if (Array.isArray(payload)) {
      setAgents(payload)
      const localManage = canManageCallCenter()
      setCanManageCalls(localManage)
      setCanToggleOwnAvailability(localManage)
      return
    }
    setAgents(Array.isArray(payload?.agents) ? payload.agents : [])
    setCanManageCalls(Boolean(payload?.canManageCalls))
    setCanToggleOwnAvailability(Boolean(payload?.canToggleOwnAvailability))
  }, [])

  const fetchQueueData = useCallback(async ({ silent = false } = {}) => {
    try {
      if (!silent) setLoading(true)
      else setRefreshing(true)

      const results = await Promise.all([
        api.get(`/api/human-queue?tab=${encodeURIComponent(activeTab)}`),
        api.get('/api/human-queue/agents'),
        api.get('/api/human-queue/stats'),
      ])
      const queueResult = results[0]
      const agentsResult = results[1]
      const statsResult = results[2]

      if (queueResult.success) {
        const list = extractList(queueResult)
        setEscalations(list)
        setSelectedEscalationId((current) => {
          if (current && list.some((i) => (i.id || i._id) === current)) return current
          return list[0]?.id || list[0]?._id || null
        })

        const currentActiveCall = activeCallRef.current
        if (currentActiveCall) {
          const activeId = String(currentActiveCall.id || currentActiveCall._id)
          let updated = list.find((i) => String(i.id || i._id) === activeId) || null

          // Live tabs won't include abandoned/resolved items — fetch by id to detect hangup.
          if (!updated && activeConnectionRef.current) {
            try {
              const detail = await api.get(`/api/human-queue/${activeId}`)
              if (detail.success && detail.data) updated = detail.data
            } catch {
              // ignore — fall through
            }
          }

          if (updated) {
            const terminal = ['abandoned', 'resolved'].includes(updated.status)
            if (terminal) {
              const reason = updated.endedReason === 'customer_hangup'
                ? 'The caller hung up.'
                : updated.status === 'resolved'
                  ? 'This call was resolved.'
                  : 'The call has ended.'
              clearActiveCallUi(reason)
            } else {
              // Only update when something meaningful changed — avoids re-render churn.
              const prev = activeCallRef.current
              const same =
                prev
                && String(prev.id || prev._id) === String(updated.id || updated._id)
                && prev.status === updated.status
                && prev.assignedUserId === updated.assignedUserId
                && prev.endedReason === updated.endedReason
              if (!same) setActiveCall(updated)
            }
          }
        }
      }

      if (agentsResult?.success) applyAgentsPermissionPayload(agentsResult.data)
      if (statsResult.success && statsResult.data) {
        setTabCounts((prev) => ({
          waiting: statsResult.data.waiting ?? statsResult.data.unassigned ?? prev.waiting ?? 0,
          active: statsResult.data.active
            ?? ((statsResult.data.assigned || 0) + (statsResult.data.transferred || 0))
            ?? prev.active
            ?? 0,
          resolved: statsResult.data.resolved ?? prev.resolved ?? 0,
          callbacks: statsResult.data.callbacks ?? prev.callbacks ?? 0,
        }))
      }
    } catch (error) {
      console.error(error)
    } finally {
      if (!silent) setLoading(false)
      setRefreshing(false)
    }
  // clearActiveCallUi is stable (empty deps); do not add toast or it restarts the poll loop.
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTab, applyAgentsPermissionPayload])

  const fetchCallbacks = useCallback(async ({
    silent = false,
    filter = callbackFilter,
    page = callbackPage,
  } = {}) => {
    const gen = ++callbackFetchGenRef.current
    try {
      if (!silent) setCallbacksLoading(true)

      const buildUrl = (pageNum) => {
        const params = new URLSearchParams()
        if (filter) params.set('status', filter)
        params.set('limit', String(CALLBACK_PAGE_SIZE))
        params.set('skip', String(Math.max(0, (pageNum - 1) * CALLBACK_PAGE_SIZE)))
        return `/api/callback-requests?${params.toString()}`
      }

      let listResult = await api.get(buildUrl(page))
      const [statsResult, agentsResult] = await Promise.all([
        api.get('/api/callback-requests/stats'),
        api.get('/api/human-queue/agents'),
      ])
      if (gen !== callbackFetchGenRef.current) return

      if (listResult.success) {
        let total = Number(listResult.data?.total) || 0
        let items = Array.isArray(listResult.data?.items) ? listResult.data.items : []
        const skip = Math.max(0, (page - 1) * CALLBACK_PAGE_SIZE)

        // Resolve/cancel on the last page can leave skip past the end — step back once.
        if (page > 1 && skip >= total) {
          const lastPage = Math.max(1, Math.ceil(total / CALLBACK_PAGE_SIZE) || 1)
          setCallbackPage(lastPage)
          listResult = await api.get(buildUrl(lastPage))
          if (gen !== callbackFetchGenRef.current) return
          if (listResult.success) {
            total = Number(listResult.data?.total) || 0
            items = Array.isArray(listResult.data?.items) ? listResult.data.items : []
          }
        }

        setCallbacks(items)
        setCallbackTotal(total)
      }
      if (statsResult.success && statsResult.data) {
        setCallbackStats({
          pending: statsResult.data.pending || 0,
          resolved: statsResult.data.resolved ?? statsResult.data.called ?? 0,
          called: statsResult.data.called ?? statsResult.data.resolved ?? 0,
          cancelled: statsResult.data.cancelled || 0,
        })
        setTabCounts((prev) => ({ ...prev, callbacks: statsResult.data.pending || 0 }))
      }
      if (agentsResult?.success) applyAgentsPermissionPayload(agentsResult.data)
    } catch (error) {
      console.error(error)
    } finally {
      if (gen === callbackFetchGenRef.current) setCallbacksLoading(false)
    }
  }, [callbackFilter, callbackPage, applyAgentsPermissionPayload])

  const applyCallbackUpdate = useCallback((updated) => {
    if (!updated) return
    const id = String(updated.id || updated._id || '')
    if (!id) return
    const status = updated.status === 'called' ? 'resolved' : updated.status || ''
    setCallbacks((prev) => {
      if (status) {
        const staysVisible =
          !callbackFilter ||
          status === callbackFilter ||
          (callbackFilter === 'resolved' && status === 'resolved')
        if (!staysVisible) return prev.filter((c) => String(c.id || c._id) !== id)
      }
      return prev.map((c) => (
        String(c.id || c._id) === id
          ? { ...c, ...updated, ...(status ? { status } : {}) }
          : c
      ))
    })
  }, [callbackFilter])

  const commitCallbackChange = useCallback((updated) => {
    callbackFetchGenRef.current += 1
    applyCallbackUpdate(updated)
    fetchCallbacks({ silent: true })
  }, [applyCallbackUpdate, fetchCallbacks])

  useEffect(() => {
    let cancelled = false
    let intervalId = null

    const pollMs = activeTab === 'callbacks'
      ? CALLBACK_POLL_MS
      : activeTab === 'resolved'
        ? HISTORY_POLL_MS
        : LIVE_POLL_MS

    const tick = (silent = true) => {
      if (cancelled) return
      // Pause when the browser tab is hidden — saves API load at scale
      if (typeof document !== 'undefined' && document.visibilityState === 'hidden') return
      if (activeTab === 'callbacks') fetchCallbacks({ silent })
      else fetchQueueData({ silent })
    }

    // Initial load (non-silent)
    if (activeTab === 'callbacks') fetchCallbacks({ silent: false })
    else fetchQueueData({ silent: false })

    intervalId = setInterval(() => tick(true), pollMs)

    const onVisibility = () => {
      if (document.visibilityState === 'visible') tick(true)
    }
    document.addEventListener('visibilitychange', onVisibility)

    return () => {
      cancelled = true
      clearInterval(intervalId)
      document.removeEventListener('visibilitychange', onVisibility)
    }
  }, [fetchQueueData, fetchCallbacks, activeTab])

  const waitingCalls = useMemo(
    () => (activeTab === 'waiting' ? escalations.filter((i) => i.status === 'waiting') : []),
    [escalations, activeTab],
  )

  // ── Agent availability toggle ──
  const handleToggleAgentAvailability = async (agentId, newValue) => {
    setTogglingAgentId(agentId)
    try {
      const r = await api.patch(`/api/human-queue/agents/${agentId}/availability`, {
        isAvailableForCalls: newValue,
      })
      if (!r.success) throw new Error(r.error || 'Failed to update availability')
      // Optimistically update local state
      setAgents((prev) =>
        prev.map((a) =>
          a.id === agentId
            ? { ...a, isAvailableForCalls: newValue, availability: newValue && a.activeChats < a.maxConcurrent ? 'available' : 'busy' }
            : a,
        ),
      )
      toast.success({
        title: newValue ? 'Online' : 'Offline',
        message: newValue ? 'Agent is now available for calls.' : 'Agent is now offline.',
      })
    } catch (err) {
      toast.error({ title: 'Error', message: err.message })
    } finally {
      setTogglingAgentId(null)
    }
  }

  // ── Callbacks actions ──
  const handleMarkCalled = async (cbId) => {
    if (!canManageCalls) {
      toast.error({ title: 'No access', message: 'Call Center write or edit permission is required.' })
      return
    }
    setMarkingCalledId(cbId)
    try {
      const r = await api.post(`/api/callback-requests/${cbId}/mark-called`, {})
      if (!r.success) throw new Error(r.error || 'Could not mark callback as called.')
      toast.success({ title: 'Done', message: 'Marked as resolved.' })
      commitCallbackChange({ id: cbId, status: 'resolved' })
    } catch (err) {
      toast.error({ title: 'Failed', message: err.message })
    } finally {
      setMarkingCalledId(null)
    }
  }

  const handleCancelCallback = async (cbId) => {
    if (!canManageCalls) {
      toast.error({ title: 'No access', message: 'Call Center write or edit permission is required.' })
      return
    }
    setCancellingCallbackId(cbId)
    try {
      const r = await api.post(`/api/callback-requests/${cbId}/cancel`, {})
      if (!r.success) throw new Error(r.error || 'Could not cancel callback.')
      toast.success({ title: 'Cancelled', message: 'Removed from the pending queue.' })
      commitCallbackChange({ id: cbId, status: 'cancelled' })
    } catch (err) {
      toast.error({ title: 'Error', message: err.message })
    } finally {
      setCancellingCallbackId(null)
    }
  }

  useEffect(() => { callbackOutboundConnectionRef.current = callbackOutboundConnection }, [callbackOutboundConnection])
  useEffect(() => { callbackOutboundCallRef.current = callbackOutboundCall }, [callbackOutboundCall])
  useEffect(() => { callbackOutboundStatusRef.current = callbackOutboundStatus }, [callbackOutboundStatus])

  useEffect(() => {
    return () => {
      const call = callbackOutboundCallRef.current
      const callId = call?.id || call?._id
      const connection = callbackOutboundConnectionRef.current
      if (!isPersistedCallId(callId) && !connection) return
      endingCallbackOutboundRef.current = true
      callbackAttemptRef.current += 1
      disconnectConnection(connection)
      if (isPersistedCallId(callId)) api.post(`/api/human-call/${callId}/end`).catch(() => {})
    }
  }, [])

  const clearCallbackOutboundUi = useCallback(() => {
    setCallbackOutboundCall(null)
    setCallbackOutboundConnection(null)
    setOutboundStatus('connecting')
  }, [])

  const handleEndCallbackOutbound = useCallback(async (opts = {}) => {
    const remoteHangup = Boolean(opts && opts.remoteHangup === true)
    const silent = Boolean(opts && opts.silent === true)
    if (endingCallbackOutboundRef.current) return
    endingCallbackOutboundRef.current = true
    callbackAttemptRef.current += 1
    const callId = callbackOutboundCallRef.current?.id || callbackOutboundCall?.id || callbackOutboundCall?._id
    try {
      disconnectConnection(callbackOutboundConnectionRef.current || callbackOutboundConnection)
      if (isPersistedCallId(callId)) await api.post(`/api/human-call/${callId}/end`)
    } catch (error) {
      console.error(error)
    } finally {
      clearCallbackOutboundUi()
      if (!silent) {
        toast.info({
          title: 'Call ended',
          message: remoteHangup ? 'The other party disconnected.' : 'You left the call.',
        })
      }
      setTimeout(() => { endingCallbackOutboundRef.current = false }, 500)
    }
  }, [callbackOutboundCall, callbackOutboundConnection, clearCallbackOutboundUi, toast])

  useEffect(() => {
    endCallbackOutboundRef.current = handleEndCallbackOutbound
  }, [handleEndCallbackOutbound])

  useEffect(() => {
    const callId = callbackOutboundCall?.id || callbackOutboundCall?._id
    if (!callId || !isPersistedCallId(callId)) return undefined
    let cancelled = false
    const poll = async () => {
      try {
        if (endingCallbackOutboundRef.current) return
        const res = await api.get(`/api/human-call/${callId}`)
        if (cancelled || endingCallbackOutboundRef.current || !res.success || !res.data) return
        const status = String(res.data.status || '').toLowerCase()
        const next = nextOutboundPanelStatus(status, callbackOutboundStatusRef.current)
        if (next === 'ended') {
          endCallbackOutboundRef.current?.({ remoteHangup: true })
          return
        }
        if (next !== callbackOutboundStatusRef.current) {
          setOutboundStatus(next)
        }
      } catch (error) {
        console.error(error)
      }
    }
    const interval = setInterval(poll, 1000)
    poll()
    return () => {
      cancelled = true
      clearInterval(interval)
    }
  }, [callbackOutboundCall?.id, callbackOutboundCall?._id])

  const placeCallbackCall = useCallback(async ({
    leadId,
    phone,
    name,
    locationIDs,
    callbackId,
    reason,
    aiSummary,
  }) => {
    if (activeConnection || callbackOutboundCall) {
      toast.error({ title: 'Already on a call', message: 'Finish your current call first.' })
      return false
    }
    if (!phone) {
      toast.error({ title: 'Missing phone', message: 'This lead has no phone number.' })
      return false
    }
    endingCallbackOutboundRef.current = false
    const attempt = ++callbackAttemptRef.current
    const pendingId = `pending-${callbackId || Date.now()}`
    setCallbackOutboundCall({
      id: pendingId,
      _id: pendingId,
      callbackId,
      name,
      leadName: name,
      callerName: name,
      phone,
      phoneNumber: phone,
      callerPhone: phone,
      escalationReason: reason || '',
      lastMessage: reason || '',
      aiSummary: aiSummary || '',
      initiatedAt: new Date().toISOString(),
      createdAt: new Date().toISOString(),
    })
    setOutboundStatus('connecting')
    setSelectedCallback(null)
    let callHistoryId = null
    try {
      const result = await api.post('/api/human-call/call-now', {
        lead: {
          ...(leadId ? { _id: leadId } : {}),
          phoneNumber: phone,
          name,
          locationID: locationIDs || [],
        },
      })
      if (!result.success) throw new Error(result.error || 'Could not place the call.')
      if (attempt !== callbackAttemptRef.current) {
        const cancelledId = result.data?.callHistoryId || result.data?.call?._id
        if (isPersistedCallId(cancelledId)) api.post(`/api/human-call/${cancelledId}/end`).catch(() => {})
        return false
      }

      const conferenceName = result.data?.conferenceName
      callHistoryId = result.data?.callHistoryId || result.data?.call?._id
      const fromNumber = result.data?.from || ''
      const session = {
        id: callHistoryId,
        _id: callHistoryId,
        callbackId,
        name,
        leadName: name,
        callerName: name,
        phone,
        phoneNumber: phone,
        callerPhone: phone,
        fromNumber,
        conferenceName,
        escalationReason: reason || '',
        lastMessage: reason || '',
        aiSummary: aiSummary || '',
        initiatedAt: new Date().toISOString(),
        createdAt: new Date().toISOString(),
      }
      setCallbackOutboundCall(session)
      setOutboundStatus('connecting')

      if (conferenceName) {
        const connection = await joinConferenceCall({
          fetchToken: () => api.get('/api/human-call/voice-token'),
          conferenceName,
          callHistoryId,
        })
        if (attempt !== callbackAttemptRef.current) {
          disconnectConnection(connection)
          if (isPersistedCallId(callHistoryId)) api.post(`/api/human-call/${callHistoryId}/end`).catch(() => {})
          return false
        }
        setCallbackOutboundConnection(connection)
        subscribeToConnectionEvents(connection, {
          accept: () => {},
          // A browser-leg blip must not unmount the popup. The status poll
          // closes it once the customer call is actually finished.
          disconnect: () => {
            if (endingCallbackOutboundRef.current) return
            setCallbackOutboundConnection(null)
          },
          cancel: () => {
            if (endingCallbackOutboundRef.current) return
            setCallbackOutboundConnection(null)
          },
          error: () => {
            toast.error({
              title: 'Call audio error',
              message: 'Browser call connection failed. Check microphone permissions.',
            })
          },
        })
      }

      if (callbackId) {
        api.patch(`/api/callback-requests/${callbackId}/status`, {
          touchLastContact: true,
        }).catch(() => {})
      }
      callbackFetchGenRef.current += 1
      fetchCallbacks({ silent: true })
      toast.success({
        title: 'Calling…',
        message: fromNumber
          ? `Dialing ${phone} from studio ${fromNumber}.`
          : `Dialing ${phone} from your studio number.`,
      })
      return true
    } catch (error) {
      console.error(error)
      if (attempt !== callbackAttemptRef.current) return false
      if (callHistoryId) {
        toast.error({
          title: 'Call audio failed',
          message: error.message || 'The dialer stayed open so you can hang up.',
        })
        return true
      }
      clearCallbackOutboundUi()
      toast.error({ title: 'Call failed', message: error.message || 'Could not place the call.' })
      return false
    }
  }, [activeConnection, callbackOutboundCall, clearCallbackOutboundUi, fetchCallbacks, setOutboundStatus, toast])

  const handleCallbackHold = useCallback(async (onHold) => {
    const callId = callbackOutboundCall?.id || callbackOutboundCall?._id
    if (!callId) return
    const r = await api.post(`/api/human-call/${callId}/hold`, { hold: onHold })
    if (!r.success) {
      toast.error({ title: 'Hold failed', message: r.error || 'Could not update hold status.' })
      throw new Error(r.error || 'Hold failed')
    }
    setOutboundStatus(onHold ? 'on_hold' : 'connected')
    toast.success({
      title: onHold ? 'Caller on hold' : 'Caller resumed',
      message: onHold ? 'The caller is hearing hold music.' : 'You are connected again.',
    })
  }, [callbackOutboundCall, toast, setOutboundStatus])

  // ── Queue actions ──
  const handleAnswer = async (item) => {
    const itemId = item.id || item._id
    if (!itemId || !item.conferenceName) return false
    if (!isCallCenterAgent) {
      toast.error({ title: 'No access', message: 'Your role must be marked as Call Center Agent to answer calls.' })
      return false
    }
    if (!canManageCalls) {
      toast.error({ title: 'No access', message: 'Call Center write or edit permission is required to answer calls.' })
      return false
    }
    if (!isOnlineForCalls) {
      toast.error({ title: 'You are offline', message: 'Toggle yourself online in Team Availability before answering calls.' })
      return false
    }
    if (activeConnection || callbackOutboundCall) {
      toast.error({ title: 'Already on a call', message: 'Finish your current call first.' })
      return false
    }

    setAnsweringId(itemId)
    setCallStatus('connecting')
    setActiveCall(item)
    setSelectedEscalationId(itemId)

    try {
      const claimResult = await api.post(`/api/human-queue/${itemId}/claim`, {})
      if (!claimResult.success) {
        toast.error({ title: 'Unable to answer', message: claimResult.error || 'Could not claim this call.' })
        setActiveCall(null)
        setCallStatus('idle')
        return false
      }

      const claimedItem = claimResult.data || item
      const conferenceName = claimedItem.conferenceName || item.conferenceName

      // Customer is already in this conference (Vapi native transfer on escalate).
      // Agent joins the same room — no outbound callback dial.
      const connection = await joinConferenceCall({ fetchToken, conferenceName, queueItemId: itemId })

      setActiveConnection(connection)
      setActiveCall(claimedItem)
      setCallStatus('connecting')

      subscribeToConnectionEvents(connection, {
        accept: () => setCallStatus('connected'),
        disconnect: () => {
          setActiveConnection(null)
          setActiveCall(null)
          setCallStatus('idle')
          if (!callerDisconnectToastRef.current) {
            callerDisconnectToastRef.current = true
            toast.info({
              title: 'Call disconnected',
              message: 'The call has ended.',
            })
            setTimeout(() => { callerDisconnectToastRef.current = false }, 2000)
          }
        },
        error: () => {
          setActiveConnection(null)
          setCallStatus('idle')
        },
      })

      toast.success({ title: 'Connected', message: 'You are now connected to the caller.' })
      fetchQueueData({ silent: true })
      return true
    } catch (error) {
      console.error(error)
      await api.post(`/api/human-queue/${itemId}/release-claim`, {}).catch(() => {})
      setActiveCall(null)
      setCallStatus('idle')
      toast.error({
        title: 'Call failed',
        message: error.message || 'Could not join the call. Check Twilio Voice SDK configuration.',
      })
      fetchQueueData({ silent: true })
      return false
    } finally {
      setAnsweringId(null)
    }
  }

  const handleHoldChange = async (onHold) => {
    const callId = activeCall?.id || activeCall?._id
    if (!callId) return
    const r = await api.post(onHold ? `/api/human-queue/${callId}/hold` : `/api/human-queue/${callId}/unhold`, {})
    if (!r.success) {
      toast.error({ title: 'Hold failed', message: r.error || 'Could not update hold status.' })
      throw new Error(r.error)
    }
    setCallStatus(onHold ? 'on_hold' : 'connected')
    toast.success({
      title: onHold ? 'Caller on hold' : 'Caller resumed',
      message: onHold ? 'The caller is hearing hold music.' : 'You are connected again.',
    })
  }

  const handleResolve = async (escalationId) => {
    if (!canManageCalls) {
      toast.error({ title: 'No access', message: 'Call Center write or edit permission is required.' })
      return
    }
    if (!escalationId) return
    setResolvingId(escalationId)
    try {
      disconnectConnection(activeConnection)
      setActiveConnection(null)
      setActiveCall(null)
      setCallStatus('idle')
      const r = await api.post(`/api/human-queue/${escalationId}/resolve`, {})
      if (!r.success) {
        toast.error({ title: 'Resolve failed', message: r.error || 'Could not resolve.' })
        return
      }
      toast.success({ title: 'Resolved', message: 'Call marked as resolved.' })
      fetchQueueData()
    } catch (error) {
      console.error(error)
      toast.error({ title: 'Error', message: 'Could not resolve this call.' })
    } finally {
      setResolvingId(null)
    }
  }

  const handleEndCall = () => {
    disconnectConnection(activeConnection)
    setActiveConnection(null)
    setActiveCall(null)
    setCallStatus('idle')
    toast.info({ title: 'Call ended', message: 'You left the call. You can still mark it resolved.' })
  }

  const handleCloseCallPanel = () => {
    setActiveCall(null)
    setCallStatus('idle')
  }

  // ── Derived values ──
  const selectedEscalation = useMemo(
    () => escalations.find((i) => (i.id || i._id) === selectedEscalationId) || escalations[0] || null,
    [escalations, selectedEscalationId],
  )

  const agentById = useMemo(() => new Map(agents.map((a) => [a.id, a])), [agents])

  const onlineAgents = agents.filter((a) => a.isAvailableForCalls)
  const availableAgents = agents.filter((a) => a.availability === 'available').length
  const isOnCall = Boolean(activeConnection)
  // Role toggle "Call Center Agent" → user appears in the agents list from the API
  const emailsMatch = (agentEmail) =>
    String(agentEmail || '').trim().toLowerCase() === String(currentUser?.email || '').trim().toLowerCase()
  const isCallCenterAgent = Boolean(
    currentUser?.email && agents.some((a) => emailsMatch(a.email)),
  )
  // Must be a Call Center Agent AND toggled online to answer live calls
  const isOnlineForCalls = Boolean(
    currentUser?.email &&
      agents.some((a) => emailsMatch(a.email) && a.isAvailableForCalls),
  )
  const canAnswerCalls = isCallCenterAgent && canManageCalls && isOnlineForCalls

  const handleAnswerRef = useRef(handleAnswer)
  handleAnswerRef.current = handleAnswer
  const escalationsRef = useRef(escalations)
  escalationsRef.current = escalations

  // Once the answer param is gone, allow the same call to be answered again if the first try failed.
  useEffect(() => {
    if (!searchParams?.get('answer')) answerParamHandledRef.current = null
  }, [searchParams])

  // Global popup navigates here with ?answer=<queueItemId> — claim via existing handleAnswer.
  // The id is marked handled immediately so a queue refresh cannot claim twice.
  useEffect(() => {
    const answerId = searchParams?.get('answer')
    if (!answerId || answeringId || activeConnection || callbackOutboundCall) return
    if (answerParamHandledRef.current === answerId) return
    if (!canAnswerCalls) return
    if (loading) return

    answerParamHandledRef.current = answerId

    const stripAnswerParam = () => {
      const params = new URLSearchParams(searchParams?.toString() || '')
      params.delete('answer')
      const qs = params.toString()
      router.replace(qs ? `/inbox/human-queue?${qs}` : '/inbox/human-queue')
    }

    const fromList = escalationsRef.current.find((i) => String(i.id || i._id) === String(answerId))

    ;(async () => {
      let item = fromList
      if (!item?.conferenceName) {
        const r = await api.get(`/api/human-queue/${encodeURIComponent(answerId)}`)
        if (answerParamHandledRef.current !== answerId) return
        if (!r.success || !r.data?.conferenceName) {
          stripAnswerParam()
          toast.error({
            title: 'Call unavailable',
            message: r.error || 'That waiting call is no longer available.',
          })
          return
        }
        item = r.data
      }
      if (answerParamHandledRef.current !== answerId) return
      await handleAnswerRef.current(item)
      stripAnswerParam()
    })()
  }, [
    searchParams,
    canAnswerCalls,
    answeringId,
    activeConnection,
    callbackOutboundCall,
    loading,
    router,
    toast,
  ])

  return (
    <MainLayout title="Call Center" subtitle="Live voice escalations from AI agents">
      <div className="space-y-4">
        {activeCall && (
          <ActiveCallPanel
            call={activeCall}
            connection={activeConnection}
            callStatus={callStatus}
            resolving={resolvingId === (activeCall.id || activeCall._id)}
            canManage={canManageCalls}
            onEndCall={handleEndCall}
            onResolve={() => handleResolve(activeCall.id || activeCall._id)}
            onHoldChange={handleHoldChange}
            onClose={handleCloseCallPanel}
          />
        )}
        {callbackOutboundCall && typeof document !== 'undefined' && createPortal(
          <ActiveCallPanel
            mode="outbound"
            layerZIndex={500}
            call={callbackOutboundCall}
            connection={callbackOutboundConnection}
            callStatus={callbackOutboundStatus}
            canManage={canManageCalls}
            onEndCall={() => handleEndCallbackOutbound()}
            onHoldChange={handleCallbackHold}
            onClose={() => handleEndCallbackOutbound()}
          />,
          document.body,
        )}

        {/* ── Top bar: tabs + controls ── */}
        <section className="rounded-2xl border border-border bg-card p-4 shadow-sm space-y-3">
          {voiceSetupReady === false && (
            <div className="rounded-xl border border-warning/20 bg-warning/10 px-4 py-3 text-sm text-warning">
              Browser pickup is not configured. Set <code>TWILIO_API_KEY_SID</code>,{' '}
              <code>TWILIO_API_KEY_SECRET</code>, and <code>TWILIO_TWIML_APP_SID</code> in backend env.
            </div>
          )}

          <div className="flex flex-wrap items-center justify-between gap-3">
            {/* Tabs */}
            <div className="flex flex-wrap items-center gap-1 rounded-full bg-muted p-1 w-fit">
              {HUMAN_QUEUE_TABS.map((tab) => {
                const isActive = activeTab === tab.id
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => {
                      const params = new URLSearchParams(searchParams?.toString() || '')
                      params.set('tab', tab.id)
                      router.push(`/inbox/human-queue?${params.toString()}`)
                    }}
                    className={cn(
                      'flex items-center gap-2 rounded-full px-4 h-9 text-sm transition-all',
                      isActive
                        ? 'bg-background text-[var(--studio-primary)] shadow-sm font-semibold'
                        : 'text-muted-foreground hover:text-foreground',
                    )}
                  >
                    <span>{tab.label}</span>
                    <span className={cn(
                      'inline-flex items-center justify-center min-w-5 h-5 px-1 rounded-full text-xs',
                      isActive
                        ? 'bg-[var(--studio-primary-light)] text-[var(--studio-primary)]'
                        : 'bg-background text-muted-foreground',
                    )}>
                      {tabCounts[tab.id] || 0}
                    </span>
                  </button>
                )
              })}
            </div>

            {/* Right controls */}
            <div className="flex flex-wrap items-center gap-2">
              {/* Settings — only shown with QueueSettings read */}
              {canViewSettings && (
                <button
                  type="button"
                  onClick={() => setShowSettings((v) => !v)}
                  className={cn(
                    'inline-flex h-8 w-8 items-center justify-center rounded-full border transition-colors',
                    showSettings
                      ? 'border-[var(--studio-primary)] bg-[var(--studio-primary-light)]/40 text-[var(--studio-primary)]'
                      : 'border-border text-muted-foreground hover:text-foreground',
                  )}
                  title={canEditSettings ? 'Escalation settings' : 'View escalation settings'}
                >
                  <Settings className="h-4 w-4" />
                </button>
              )}
            </div>
          </div>
        </section>

        {/* ── Settings Panel ── */}
        {canViewSettings && showSettings && (
          <SettingsPanel
            onClose={() => setShowSettings(false)}
            canEdit={canEditSettings}
          />
        )}

        {/* ── Callbacks tab ── */}
        {activeTab === 'callbacks' ? (
          callbacksLoading ? (
            <div className="flex items-center justify-center py-20">
              <GlobalLoader variant="inline" size="md" text="Loading callbacks…" />
            </div>
          ) : (
            <section className="space-y-4">
              <div className="grid grid-cols-3 gap-3">
                {[
                  { label: 'Pending', value: callbackStats.pending, color: 'text-warning' },
                  { label: 'Resolved', value: callbackStats.resolved ?? callbackStats.called, color: 'text-success' },
                  { label: 'Cancelled', value: callbackStats.cancelled, color: 'text-muted-foreground' },
                ].map((stat) => (
                  <div key={stat.label} className="rounded-2xl border border-border bg-card p-4 shadow-sm text-center">
                    <p className={cn('text-2xl font-bold', stat.color)}>{stat.value ?? 0}</p>
                    <p className="text-xs text-muted-foreground mt-1">{stat.label}</p>
                  </div>
                ))}
              </div>

              <div className="rounded-2xl border border-border bg-card p-4 shadow-sm">
                <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                  <div>
                    <h2 className="text-sm font-semibold text-foreground">Needs a person</h2>
                    <p className="text-xs text-muted-foreground">
                      Calls, texts, and emails that need a teammate — contact them and resolve when done
                    </p>
                  </div>
                  <select
                    value={callbackFilter}
                    onChange={(e) => {
                      const next = e.target.value
                      setCallbackFilter(next)
                      setCallbackPage(1)
                      fetchCallbacks({
                        silent: false,
                        filter: next,
                        page: 1,
                      })
                    }}
                    className="h-8 rounded-lg border border-border bg-background px-2 text-xs text-foreground outline-none"
                  >
                    {CALLBACK_STATUS_FILTERS.map((f) => (
                      <option key={f.value || 'all'} value={f.value}>
                        {f.label}
                      </option>
                    ))}
                  </select>
                </div>

                {callbacks.length === 0 ? (
                  <div className="rounded-xl border border-dashed border-border bg-background py-12 text-center text-sm text-muted-foreground">
                    <PhoneMissed className="h-8 w-8 mx-auto mb-2 opacity-30" />
                    No callbacks
                    {callbackFilter ? ` · ${callbackFilter}` : ''}.
                  </div>
                ) : (
                  <div className="space-y-2">
                    {callbacks.map((cb) => {
                      const cbId = cb.id || cb._id
                      const status = cb.status === 'called' ? 'resolved' : cb.status
                      const isPending = status === 'pending'
                      const channelMeta = callbackChannelMeta(cb.channel)
                      const ChannelIcon = channelMeta.icon
                      return (
                        <button
                          key={cbId}
                          type="button"
                          onClick={() => setSelectedCallback(cb)}
                          className="w-full rounded-xl border border-border bg-background p-4 text-left transition-colors hover:border-[var(--studio-primary)]/40 hover:bg-muted/30"
                        >
                          <div className="flex items-start justify-between gap-3">
                            <div className="flex items-center gap-3 min-w-0">
                              <Avatar className="h-9 w-9 shrink-0">
                                <AvatarFallback className="bg-[color:var(--studio-primary)] text-white text-xs font-semibold">
                                  {getInitials(cb.leadName || cb.callerName || 'Caller')}
                                </AvatarFallback>
                              </Avatar>
                              <div className="min-w-0">
                                <div className="flex items-center gap-2 min-w-0">
                                  <p className="text-sm font-medium text-foreground truncate">
                                    {cb.leadName || cb.callerName || 'Unknown'}
                                  </p>
                                  <span
                                    className={cn(
                                      'shrink-0 inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-semibold',
                                      channelMeta.className,
                                    )}
                                  >
                                    <ChannelIcon className="h-3 w-3" />
                                    {channelMeta.label}
                                  </span>
                                </div>
                                <p className="text-xs text-muted-foreground truncate">
                                  {cb.phone || cb.callerPhone || cb.email || cb.callerEmail || '—'}
                                </p>
                              </div>
                            </div>
                            <span
                              className={cn(
                                'shrink-0 inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium capitalize',
                                status === 'pending'
                                  ? 'bg-warning/10 text-warning'
                                  : status === 'resolved'
                                    ? 'bg-success/10 text-success'
                                    : 'bg-muted text-muted-foreground',
                              )}
                            >
                              {status}
                            </span>
                          </div>

                          {(() => {
                            const whyText = String(cb.reason || cb.ivrLabel || '').trim()
                            const summaryText = String(cb.aiSummary || '').trim()
                            if (!whyText && !summaryText) return null
                            return (
                              <div className="mt-3 space-y-1.5">
                                {whyText ? (
                                  <div className="rounded-lg bg-muted/50 px-3 py-2 text-xs text-foreground line-clamp-4">
                                    <span className="text-muted-foreground font-medium">Why: </span>
                                    {whyText}
                                  </div>
                                ) : null}
                                {summaryText && summaryText !== whyText ? (
                                  <div className="rounded-lg bg-muted/30 px-3 py-2 text-xs text-foreground line-clamp-4">
                                    <span className="text-muted-foreground font-medium">Summary: </span>
                                    {summaryText}
                                  </div>
                                ) : null}
                              </div>
                            )
                          })()}

                          <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground">
                            <span className="inline-flex items-center gap-1">
                              <Clock3 className="h-3.5 w-3.5" />
                              Last contact {formatDateTime(cb.lastContactAt || cb.createdAt)}
                            </span>
                            {cb.leadStage && (
                              <span className="capitalize">Stage: {cb.leadStage}</span>
                            )}
                            {cb.aiRepliesEnabled === false && (
                              <span className="text-warning">AI replies off</span>
                            )}
                          </div>

                          {isPending && (
                            <div className="mt-3 flex items-center gap-2">
                              <span className="flex-1 inline-flex h-9 items-center justify-center gap-1.5 rounded-lg bg-[var(--studio-primary)] text-white text-xs font-medium">
                                <PhoneForwarded className="h-3.5 w-3.5" />
                                Open & contact
                              </span>
                              {canManageCalls && (
                                <span
                                  role="button"
                                  tabIndex={0}
                                  onClick={(e) => {
                                    e.stopPropagation()
                                    handleCancelCallback(cbId)
                                  }}
                                  onKeyDown={(e) => {
                                    if (e.key === 'Enter' || e.key === ' ') {
                                      e.stopPropagation()
                                      handleCancelCallback(cbId)
                                    }
                                  }}
                                  className="inline-flex h-9 items-center justify-center gap-1.5 rounded-lg border border-border bg-background px-3 text-xs text-muted-foreground hover:text-foreground"
                                >
                                  {cancellingCallbackId === cbId ? '…' : 'Cancel'}
                                </span>
                              )}
                            </div>
                          )}
                        </button>
                      )
                    })}
                  </div>
                )}

                {callbackTotal > CALLBACK_PAGE_SIZE && (
                  <div className="mt-4 flex flex-wrap items-center justify-between gap-2 border-t border-border pt-3">
                    <p className="text-xs text-muted-foreground">
                      Showing{' '}
                      {callbackTotal === 0
                        ? 0
                        : (callbackPage - 1) * CALLBACK_PAGE_SIZE + 1}
                      –
                      {Math.min(callbackPage * CALLBACK_PAGE_SIZE, callbackTotal)} of{' '}
                      {callbackTotal}
                    </p>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        disabled={callbackPage <= 1 || callbacksLoading}
                        onClick={() => {
                          const next = Math.max(1, callbackPage - 1)
                          setCallbackPage(next)
                          fetchCallbacks({ silent: false, page: next })
                        }}
                        className="inline-flex h-8 items-center rounded-lg border border-border bg-background px-3 text-xs font-medium text-foreground disabled:opacity-40"
                      >
                        Previous
                      </button>
                      <span className="text-xs text-muted-foreground">
                        Page {callbackPage} of{' '}
                        {Math.max(1, Math.ceil(callbackTotal / CALLBACK_PAGE_SIZE))}
                      </span>
                      <button
                        type="button"
                        disabled={
                          callbacksLoading ||
                          callbackPage * CALLBACK_PAGE_SIZE >= callbackTotal
                        }
                        onClick={() => {
                          const next = callbackPage + 1
                          setCallbackPage(next)
                          fetchCallbacks({ silent: false, page: next })
                        }}
                        className="inline-flex h-8 items-center rounded-lg border border-border bg-background px-3 text-xs font-medium text-foreground disabled:opacity-40"
                      >
                        Next
                      </button>
                    </div>
                  </div>
                )}
              </div>

              <CallbackContactDialog
                open={Boolean(selectedCallback) && !callbackOutboundCall}
                onClose={() => setSelectedCallback(null)}
                item={selectedCallback}
                canManage={canManageCalls}
                preferredChannel={selectedCallback?.channel || 'call'}
                onUpdated={commitCallbackChange}
                onPlaceCall={placeCallbackCall}
              />
            </section>
          )
        ) : loading ? (
          <div className="flex items-center justify-center py-20">
            <GlobalLoader variant="inline" size="md" text="Loading call center…" />
          </div>
        ) : (
          <section className="space-y-4">
            {activeTab === 'waiting' && (
              <IncomingCallBanner
                waitingCalls={waitingCalls}
                onAnswerNext={handleAnswer}
                answeringId={answeringId}
                isOnCall={isOnCall}
                canAnswer={canAnswerCalls}
              />
            )}

            {/* Stats row — live tabs only */}
            {activeTab !== 'resolved' && (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {[
                  { label: 'Waiting', value: tabCounts.waiting || 0, icon: PhoneCall, tone: 'text-warning' },
                  { label: 'Active', value: tabCounts.active || 0, icon: Headphones, tone: 'text-success' },
                  { label: 'Online agents', value: `${onlineAgents.length}/${agents.length}`, icon: Users, tone: 'text-[var(--studio-primary)]' },
                ].map((stat) => (
                  <div key={stat.label} className="rounded-2xl border border-border bg-card p-4 shadow-sm">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <stat.icon className="h-4 w-4" />
                      <span className="text-xs">{stat.label}</span>
                    </div>
                    <p className={cn('mt-1 text-xl font-bold', stat.tone)}>{stat.value}</p>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'resolved' ? (
              historyDetailItem ? (
                <ResolvedCallDetail
                  queueItem={historyDetailItem}
                  onBack={() => setHistoryDetailItem(null)}
                />
              ) : (
                <div className="rounded-2xl border border-border bg-card p-4 shadow-sm">
                  <div className="flex items-center justify-between gap-3 mb-4">
                    <div>
                      <h2 className="text-sm font-semibold text-foreground">Call history</h2>
                      <p className="text-xs text-muted-foreground">
                        Click a call to open recording, transcript, and summary
                      </p>
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {escalations.length} recent{refreshing ? ' · Updating…' : ''}
                    </div>
                  </div>

                  <div className="space-y-2">
                    {escalations.length === 0 ? (
                      <div className="rounded-xl border border-dashed border-border bg-background py-10 text-center text-sm text-muted-foreground">
                        No resolved calls yet.
                      </div>
                    ) : (
                      escalations.map((item) => {
                        const itemId = item.id || item._id
                        const assignedAgent = item.assignedUserId
                          ? agentById.get(String(item.assignedUserId))
                          : null
                        return (
                          <button
                            key={itemId}
                            type="button"
                            onClick={() => setHistoryDetailItem(item)}
                            className="w-full rounded-xl border border-border bg-background p-3 text-left transition-all hover:bg-muted/40 hover:border-[var(--studio-primary)]/40"
                          >
                            <div className="flex items-start justify-between gap-3">
                              <div className="flex flex-1 items-center gap-3 min-w-0">
                                <Avatar className="h-10 w-10 shrink-0">
                                  <AvatarFallback className="bg-[color:var(--studio-primary)] text-white font-semibold">
                                    {getInitials(item.leadName || item.callerName || 'Caller')}
                                  </AvatarFallback>
                                </Avatar>
                                <div className="min-w-0">
                                  <p className="text-sm font-medium text-foreground truncate">
                                    {item.leadName || item.callerName || 'Unknown caller'}
                                  </p>
                                  <p className="text-xs text-muted-foreground truncate">{item.phone || item.callerPhone}</p>
                                  <p className="text-xs text-muted-foreground truncate mt-0.5">
                                    {endedReasonLabel(item.endedReason) || item.intent}
                                  </p>
                                </div>
                              </div>
                              <div className="text-right shrink-0">
                                <p className="text-xs font-medium text-muted-foreground tabular-nums">
                                  {formatShortTime(getEndedAt(item))}
                                </p>
                                <p className="text-[10px] text-muted-foreground mt-1">
                                  {item.assignedUserName || assignedAgent?.name || 'No agent'}
                                </p>
                                {item.vapiCallId ? (
                                  <p className="text-[10px] text-[var(--studio-primary)] mt-1">View recording →</p>
                                ) : (
                                  <p className="text-[10px] text-muted-foreground mt-1">No recording linked</p>
                                )}
                              </div>
                            </div>
                          </button>
                        )
                      })
                    )}
                  </div>
                </div>
              )
            ) : (
            <div className="grid grid-cols-1 xl:grid-cols-[1.5fr_1fr] gap-4">
              {/* Queue list */}
              <div className="rounded-2xl border border-border bg-card p-4 shadow-sm">
                <div className="flex items-center justify-between gap-3 mb-4">
                  <div>
                    <h2 className="text-sm font-semibold text-foreground">
                      {activeTab === 'waiting' && 'Waiting calls'}
                      {activeTab === 'active' && 'Active calls'}
                    </h2>
                    <p className="text-xs text-muted-foreground">
                      {activeTab === 'waiting' && 'Callers waiting for an agent — answer from here'}
                      {activeTab === 'active' && 'Calls currently with your team'}
                    </p>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {escalations.length} calls{refreshing ? ' · Updating…' : ''}
                  </div>
                </div>

                <div className="space-y-2">
                  {escalations.length === 0 ? (
                    <div className="rounded-xl border border-dashed border-border bg-background py-10 text-center text-sm text-muted-foreground">
                      {activeTab === 'waiting' && 'No callers waiting.'}
                      {activeTab === 'active' && 'No active calls right now.'}
                    </div>
                  ) : (
                    escalations.map((item) => {
                      const itemId = item.id || item._id
                      const assignedAgent = item.assignedUserId
                        ? agentById.get(String(item.assignedUserId))
                        : null
                      const isSelected = (selectedEscalation?.id || selectedEscalation?._id) === itemId
                      const isWaiting = item.status === 'waiting'
                      const isActiveCall = (activeCall?.id || activeCall?._id) === itemId

                      return (
                        <div
                          key={itemId}
                          className={cn(
                            'w-full rounded-xl border p-3 transition-all',
                            isSelected
                              ? 'border-[var(--studio-primary)] bg-[var(--studio-primary-light)]/50'
                              : 'border-border bg-background hover:bg-muted/40',
                            isWaiting && 'ring-1 ring-warning/50',
                            isActiveCall && 'ring-2 ring-success/60',
                          )}
                        >
                          <div className="flex items-start justify-between gap-3">
                            <button
                              type="button"
                              onClick={() => setSelectedEscalationId(itemId)}
                              className="flex flex-1 items-center gap-3 min-w-0 text-left"
                            >
                              <div className="relative shrink-0">
                                <Avatar className="h-10 w-10">
                                  <AvatarFallback className="bg-[color:var(--studio-primary)] text-white font-semibold">
                                    {getInitials(item.leadName || item.callerName || 'Caller')}
                                  </AvatarFallback>
                                </Avatar>
                                {isWaiting && (
                                  <span className="absolute -top-0.5 -right-0.5 flex h-3 w-3">
                                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-warning opacity-75" />
                                    <span className="relative inline-flex h-3 w-3 rounded-full bg-warning" />
                                  </span>
                                )}
                              </div>
                              <div className="min-w-0">
                                <p className="text-sm font-medium text-foreground truncate">
                                  {item.leadName || item.callerName || 'Unknown caller'}
                                </p>
                                <p className="text-xs text-muted-foreground truncate">{item.phone || item.callerPhone}</p>
                                <p className="text-xs text-muted-foreground truncate mt-0.5">{item.intent}</p>
                              </div>
                            </button>

                            <div className="flex flex-col items-end gap-2 shrink-0">
                              <div className="text-right">
                                {isWaiting ? (
                                  <p className={cn('text-sm font-semibold tabular-nums', waitTimeClasses(item.waitMinutes || 0))}>
                                    {item.waitMinutes || 0}m wait
                                  </p>
                                ) : (
                                  <p className="text-xs font-medium text-muted-foreground">
                                    {item.assignedUserName || assignedAgent?.name || 'Agent'}
                                  </p>
                                )}
                                <span className={cn('inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-medium capitalize', statusBadgeClasses(item.status))}>
                                  {statusLabel(item.status)}
                                </span>
                              </div>
                              {isWaiting && !isOnCall && canAnswerCalls && (
                                <button
                                  type="button"
                                  disabled={answeringId === itemId || voiceSetupReady === false}
                                  onClick={() => handleAnswer(item)}
                                  className="inline-flex h-8 items-center gap-1.5 rounded-lg bg-[var(--studio-primary)] px-3 text-xs font-semibold text-white hover:brightness-95 disabled:opacity-60"
                                >
                                  <PhoneCall className="h-3.5 w-3.5" />
                                  {answeringId === itemId ? '…' : 'Answer'}
                                </button>
                              )}
                            </div>
                          </div>

                          <div className="mt-2 flex flex-wrap items-center gap-2 text-xs">
                            <span className={cn('inline-flex items-center rounded-full px-2.5 py-1', priorityClasses(item.priority))}>
                              {item.priority || 'Medium'}
                            </span>
                            {item.ivrLabel && (
                              <span className="inline-flex items-center rounded-full bg-muted px-2.5 py-1 text-muted-foreground">
                                {item.ivrLabel}
                              </span>
                            )}
                            {(item.transferCount > 0) && (
                              <span className="inline-flex items-center rounded-full bg-muted px-2.5 py-1 text-muted-foreground">
                                Transferred
                              </span>
                            )}
                            <span className="inline-flex items-center rounded-full bg-muted px-2.5 py-1 text-muted-foreground">
                              {item.assignedUserName || assignedAgent?.name || 'Unassigned'}
                            </span>
                          </div>
                        </div>
                      )
                    })
                  )}
                </div>
              </div>

              {/* Right column */}
              <div className="space-y-4">
                <div className="rounded-2xl border border-border bg-card p-4 shadow-sm">
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <h3 className="text-sm font-semibold text-foreground">Team Availability</h3>
                    <span className="text-xs text-muted-foreground">
                      {onlineAgents.length} online · {availableAgents} free
                    </span>
                  </div>
                  <div className="space-y-2 max-h-52 overflow-y-auto pr-0.5">
                    {agents.length === 0 ? (
                      <div className="rounded-xl border border-dashed border-border bg-background py-6 text-center text-xs text-muted-foreground">
                        No active team members.
                      </div>
                    ) : (
                      agents.map((agent) => {
                        const isMe = currentUser && agent.email && agent.email === currentUser.email
                        return (
                          <div
                            key={agent.id}
                            className="flex items-center justify-between rounded-xl border border-border bg-background p-2.5"
                          >
                            <div className="flex items-center gap-2 min-w-0">
                              <div className="relative shrink-0">
                                <Avatar className="h-8 w-8">
                                  <AvatarFallback className="text-[10px] bg-muted">{getInitials(agent.name)}</AvatarFallback>
                                </Avatar>
                                <span className={cn(
                                  'absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full border-2 border-card',
                                  agent.isAvailableForCalls ? 'bg-success' : 'bg-muted-foreground',
                                )} />
                              </div>
                              <div className="min-w-0">
                                <p className="text-sm font-medium text-foreground truncate">
                                  {agent.name}
                                  {isMe && <span className="ml-1.5 text-[10px] font-normal text-muted-foreground">(you)</span>}
                                </p>
                                <p className="text-xs text-muted-foreground">
                                  {agent.activeChats}/{agent.maxConcurrent} calls
                                </p>
                              </div>
                            </div>
                            {isMe && canToggleOwnAvailability ? (
                              <Toggle
                                checked={Boolean(agent.isAvailableForCalls)}
                                onChange={(v) => handleToggleAgentAvailability(agent.id, v)}
                                disabled={togglingAgentId === agent.id}
                              />
                            ) : (
                              <span className={cn(
                                'text-[10px] font-medium px-2 py-0.5 rounded-full',
                                agent.isAvailableForCalls
                                  ? 'bg-success/10 text-success'
                                  : 'bg-muted text-muted-foreground',
                              )}>
                                {agent.isAvailableForCalls ? 'Online' : 'Offline'}
                              </span>
                            )}
                          </div>
                        )
                      })
                    )}
                  </div>
                  {onlineAgents.length === 0 && agents.length > 0 && (
                    <p className="mt-2 text-xs text-warning">
                      No agents are online. Escalations will be converted to callbacks.
                    </p>
                  )}
                </div>

                <div className="rounded-2xl border border-border bg-card p-4 shadow-sm">
                  <div className="flex items-start justify-between gap-2 mb-4">
                    <div>
                      <h3 className="text-sm font-semibold text-foreground">Call Details</h3>
                      <p className="text-xs text-muted-foreground">
                        {activeTab === 'active' ? 'Live call context' : 'Caller context before you answer'}
                      </p>
                    </div>
                  </div>

                  {!selectedEscalation ? (
                    <div className="rounded-lg border border-dashed border-border bg-background p-4 text-sm text-muted-foreground">
                      Select a call from the queue.
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <div className="rounded-xl border border-border bg-background p-3">
                        <p className="text-sm font-medium text-foreground">
                          {selectedEscalation.leadName || selectedEscalation.callerName || 'Unknown caller'}
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">{selectedEscalation.phone || selectedEscalation.callerPhone}</p>
                        <p className="text-xs text-muted-foreground mt-1">
                          Escalated by {selectedEscalation.escalatedBy || 'AI Voice Agent'} · {formatDateTime(selectedEscalation.createdAt)}
                        </p>
                        {(selectedEscalation.lastMessage || selectedEscalation.escalationReason) && (
                          <p className="text-sm text-foreground mt-2">
                            &quot;{selectedEscalation.lastMessage || selectedEscalation.escalationReason}&quot;
                          </p>
                        )}
                        {selectedEscalation.aiSummary && (
                          <p className="text-xs text-muted-foreground mt-2">{selectedEscalation.aiSummary}</p>
                        )}
                      </div>

                      <div className="grid grid-cols-1 gap-2 text-xs">
                        {selectedEscalation.status === 'waiting' ? (
                          <div className="flex items-center gap-2 rounded-lg border border-border bg-background px-3 py-2">
                            <Clock3 className="h-4 w-4 text-muted-foreground" />
                            <span className="text-muted-foreground">
                              Waiting:{' '}
                              <span className={cn('font-semibold', waitTimeClasses(selectedEscalation.waitMinutes || 0))}>
                                {selectedEscalation.waitMinutes || 0} min
                              </span>
                            </span>
                          </div>
                        ) : (
                          <div className="flex items-center gap-2 rounded-lg border border-border bg-background px-3 py-2">
                            <Clock3 className="h-4 w-4 text-muted-foreground" />
                            <span className="text-muted-foreground">
                              Claimed:{' '}
                              <span className="font-semibold text-foreground">
                                {formatShortTime(selectedEscalation.claimedAt || selectedEscalation.inProgressAt)}
                              </span>
                            </span>
                          </div>
                        )}
                        <div className="flex items-center gap-2 rounded-lg border border-border bg-background px-3 py-2">
                          <UserCheck className="h-4 w-4 text-muted-foreground" />
                          <span className="text-muted-foreground">
                            Agent:{' '}
                            <span className="font-semibold text-foreground">
                              {selectedEscalation.assignedUserName
                                || (selectedEscalation.assignedUserId ? agentById.get(String(selectedEscalation.assignedUserId))?.name : null)
                                || 'Unassigned'}
                            </span>
                          </span>
                        </div>
                      </div>

                      {selectedEscalation.status === 'waiting' && canAnswerCalls && (
                        <Button
                          className="w-full h-11"
                          onClick={() => handleAnswer(selectedEscalation)}
                          disabled={
                            answeringId === (selectedEscalation.id || selectedEscalation._id)
                            || voiceSetupReady === false
                            || isOnCall
                          }
                        >
                          <PhoneCall className="h-4 w-4 mr-2" />
                          {answeringId ? 'Connecting…' : 'Answer Call'}
                        </Button>
                      )}
                      {selectedEscalation.status === 'waiting' && isCallCenterAgent && canManageCalls && !isOnlineForCalls && (
                        <p className="text-xs text-warning text-center">
                          Toggle yourself online in Team Availability to answer calls.
                        </p>
                      )}
                      {selectedEscalation.status === 'waiting' && isCallCenterAgent && !canManageCalls && (
                        <p className="text-xs text-muted-foreground text-center">
                          View only — Call Center write or edit is required to answer calls.
                        </p>
                      )}

                      {isOnCall && (activeCall?.id || activeCall?._id) === (selectedEscalation.id || selectedEscalation._id) && (
                        <div className="rounded-xl border border-success/20 bg-success/10 px-3 py-2 text-xs text-success">
                          You are on this call. Use the call panel for mute, hold, and hang up.
                        </div>
                      )}

                      {canManageCalls && (
                        <button
                          type="button"
                          disabled={resolvingId === (selectedEscalation.id || selectedEscalation._id)}
                          onClick={() => handleResolve(selectedEscalation.id || selectedEscalation._id)}
                          className="inline-flex w-full h-10 items-center justify-center gap-2 rounded-lg bg-[var(--studio-primary)] text-white text-sm font-medium hover:brightness-95 disabled:opacity-60"
                        >
                          <CheckCircle2 className="h-4 w-4" />
                          {resolvingId ? 'Resolving…' : 'Mark as Resolved'}
                        </button>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
            )}
          </section>
        )}
      </div>
    </MainLayout>
  )
}

export default function HumanQueuePage() {
  return (
    <Suspense
      fallback={
        <MainLayout title="Call Center" subtitle="Live voice escalations from AI agents">
          <div className="flex items-center justify-center py-20">
            <GlobalLoader variant="inline" size="md" text="Loading call center…" />
          </div>
        </MainLayout>
      }
    >
      <HumanQueuePageContent />
    </Suspense>
  )
}
