'use client'

import { useEffect, useMemo, useState } from 'react'
import { Headphones, RefreshCw, User } from 'lucide-react'
import api, { getApiBaseUrl } from '@/lib/api'
import { getToken } from '@/lib/auth'
import { Button } from '@/components/ui/button'
import GlobalLoader from '@/components/shared/GlobalLoader'
import SuccessEvaluationDisplay from '@/components/ai-calling/SuccessEvaluationDisplay'
import AiCallRecordingPlayer from '@/components/ai-calling/AiCallRecordingPlayer'
import ResolvedLeadSidebar from '@/components/human-queue/ResolvedLeadSidebar'
import { cn, formatDateTime, getInitials } from '@/lib/utils'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { formatStudioTime } from '@/lib/studioLocalDate'

function formatDuration(startedAt, endedAt) {
  if (!startedAt || !endedAt) return null
  const ms = new Date(endedAt) - new Date(startedAt)
  if (!Number.isFinite(ms) || ms < 0) return null
  const totalSec = Math.round(ms / 1000)
  const m = Math.floor(totalSec / 60)
  const s = totalSec % 60
  return `${m}:${String(s).padStart(2, '0')}`
}

function formatRecordingDuration(seconds) {
  if (seconds == null || !Number.isFinite(Number(seconds))) return null
  const total = Math.max(0, Math.round(Number(seconds)))
  const m = Math.floor(total / 60)
  const s = total % 60
  return `${m}:${String(s).padStart(2, '0')}`
}

function formatEndedReason(reason) {
  if (!reason) return null
  const map = {
    customer_hangup: 'Caller hung up',
    agent_resolve: 'Marked resolved',
    agent_hangup: 'Agent ended call',
    conference_end: 'Call ended',
    stale: 'Timed out in queue',
    transfer_failed: 'Transfer failed',
    'assistant-forwarded-call': 'Transferred to human',
    'assistant-ended-call': 'Assistant ended call',
  }
  if (map[reason]) return map[reason]
  return String(reason).replace(/[-_]/g, ' ')
}

function endedReasonLabel(reason) {
  return formatEndedReason(reason)
}

function getMessages(call) {
  if (Array.isArray(call?.artifact?.messages) && call.artifact.messages.length) {
    return call.artifact.messages
  }
  if (Array.isArray(call?.messages) && call.messages.length) {
    return call.messages
  }
  return []
}

function getRecordingUrl(call) {
  return call?.artifact?.recordingUrl || call?.recordingUrl || null
}

function getStereoUrl(call) {
  return call?.artifact?.stereoRecordingUrl || call?.stereoRecordingUrl || null
}

/**
 * Full call history detail (recording + transcript) for a resolved Human Queue item.
 * Loads AiCallDetail via the queue item's vapiCallId + human conference recording.
 */
export default function ResolvedCallDetail({ queueItem, onBack, canManage = false }) {
  const [call, setCall] = useState(null)
  const [freshItem, setFreshItem] = useState(queueItem || null)
  const [loading, setLoading] = useState(true)
  const [syncing, setSyncing] = useState(false)
  const [error, setError] = useState(null)
  const [humanAudioUrl, setHumanAudioUrl] = useState(null)
  const [humanAudioError, setHumanAudioError] = useState(null)
  const [humanAudioLoading, setHumanAudioLoading] = useState(false)
  const [leadSidebarOpen, setLeadSidebarOpen] = useState(false)

  const activeItem = freshItem || queueItem
  const vapiCallId = activeItem?.vapiCallId || null
  const queueItemId = activeItem?.id || activeItem?._id || null
  const callerName = activeItem?.leadName || activeItem?.callerName || call?.customer?.name || call?.leadID?.name || 'Unknown caller'
  const callerPhone = activeItem?.phone || activeItem?.callerPhone || call?.customer?.number || call?.leadID?.phoneNumber || ''

  const loadCall = async ({ silent = false } = {}) => {
    if (!vapiCallId) {
      setCall(null)
      setError(null)
      setLoading(false)
      return
    }
    if (!silent) setLoading(true)
    setError(null)
    try {
      const r = await api.get(`/api/ai-calling/by-call-id/${encodeURIComponent(vapiCallId)}`)
      if (!r.success || !r.data) {
        setCall(null)
        setError(r.error || 'AI call recording / transcript not found yet. It may still be syncing from Vapi.')
        return
      }
      setCall(r.data)
    } catch (err) {
      setCall(null)
      setError(err?.message || 'Failed to load call details')
    } finally {
      if (!silent) setLoading(false)
    }
  }

  useEffect(() => {
    setFreshItem(queueItem || null)
  }, [queueItem])

  useEffect(() => {
    let cancelled = false
    async function refreshQueueItem() {
      const id = queueItem?.id || queueItem?._id
      if (!id) return
      try {
        const r = await api.get(`/api/human-queue/${encodeURIComponent(id)}`)
        if (!cancelled && r.success && r.data) setFreshItem(r.data)
      } catch {
        // keep list snapshot
      }
    }
    refreshQueueItem()
    return () => { cancelled = true }
  }, [queueItem?.id, queueItem?._id])

  useEffect(() => {
    loadCall()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [vapiCallId])

  useEffect(() => {
    let objectUrl = null
    let cancelled = false

    async function loadHumanRecording() {
      if (!queueItemId) {
        setHumanAudioUrl(null)
        setHumanAudioError(null)
        return
      }

      setHumanAudioLoading(true)
      setHumanAudioError(null)
      try {
        const token = getToken()
        const res = await fetch(
          `${getApiBaseUrl()}/api/human-queue/${encodeURIComponent(queueItemId)}/human-recording`,
          { headers: token ? { Authorization: `Bearer ${token}` } : {} },
        )
        if (!res.ok) {
          const body = await res.json().catch(() => null)
          throw new Error(
            body?.message
            || body?.error
            || 'No human call recording yet. It is created after an agent joins the live conference.',
          )
        }
        const blob = await res.blob()
        objectUrl = URL.createObjectURL(blob)
        if (!cancelled) setHumanAudioUrl(objectUrl)
      } catch (err) {
        if (!cancelled) {
          setHumanAudioUrl(null)
          setHumanAudioError(err?.message || 'Could not load human call recording')
        }
      } finally {
        if (!cancelled) setHumanAudioLoading(false)
      }
    }

    loadHumanRecording()
    return () => {
      cancelled = true
      if (objectUrl) URL.revokeObjectURL(objectUrl)
    }
  }, [queueItemId, activeItem?.humanRecordingSid, activeItem?.humanRecordingUrl])

  const handleSync = async () => {
    if (!call?._id) return
    setSyncing(true)
    try {
      const r = await api.post(`/api/ai-calling/${call._id}/sync`, {})
      if (r.success && r.data) setCall(r.data)
      else await loadCall({ silent: true })
    } catch {
      await loadCall({ silent: true })
    } finally {
      setSyncing(false)
    }
  }

  const messages = useMemo(() => getMessages(call), [call])
  const recordingUrl = getRecordingUrl(call)
  const stereoUrl = getStereoUrl(call)

  const startedAt = call?.startedAt || activeItem?.createdAt || null
  const endedAt =
    call?.endedAt
    || activeItem?.resolvedAt
    || activeItem?.abandonedAt
    || activeItem?.callerLeftAt
    || null
  const duration = formatDuration(startedAt, endedAt)
  const endedReasonDisplay =
    formatEndedReason(call?.endedReason)
    || endedReasonLabel(activeItem?.endedReason)
    || (activeItem?.redirectSucceeded ? 'Transferred to human' : null)
    || null

  const assistantLabel =
    call?.dbAssistantId?.name
    || activeItem?.assistantName
    || call?.assistantName
    || 'AI Agent'
  const evalRubric = call?.dbAssistantId?.successEvaluationRubric || null
  const callerLabel = call?.customer?.name || call?.leadID?.name || callerName

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <button
          type="button"
          className="text-xs text-[var(--studio-primary)] hover:underline underline-offset-2"
          onClick={onBack}
        >
          ← Call history
        </button>
        {call?._id && (
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="h-8 px-3 text-xs gap-1.5"
            onClick={handleSync}
            disabled={syncing}
          >
            {syncing ? <GlobalLoader variant="inline" size="sm" /> : <RefreshCw className="h-3.5 w-3.5" />}
            Sync from Vapi
          </Button>
        )}
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-16">
          <GlobalLoader variant="inline" size="md" text="Loading call recording…" />
        </div>
      ) : (
        <div className="rounded-2xl border border-border bg-card shadow-sm overflow-hidden">
          <div className="border-b border-border px-5 py-4">
            <div className="flex items-start justify-between gap-4 flex-wrap">
              <div className="flex items-center gap-3 min-w-0">
                <Avatar className="h-12 w-12 shrink-0">
                  <AvatarFallback className="bg-[color:var(--studio-primary)] text-white font-semibold">
                    {getInitials(callerName)}
                  </AvatarFallback>
                </Avatar>
                <div className="min-w-0">
                  <button
                    type="button"
                    onClick={() => setLeadSidebarOpen(true)}
                    className="block max-w-full text-left text-lg font-semibold text-foreground truncate hover:text-[var(--studio-primary)] hover:underline underline-offset-2"
                    title="Open lead profile"
                  >
                    {callerName}
                  </button>
                  {callerPhone ? (
                    <button
                      type="button"
                      onClick={() => setLeadSidebarOpen(true)}
                      className="block max-w-full text-left text-sm text-muted-foreground truncate hover:text-[var(--studio-primary)] hover:underline underline-offset-2"
                      title="Open lead profile"
                    >
                      {callerPhone}
                    </button>
                  ) : (
                    <p className="text-sm text-muted-foreground truncate">—</p>
                  )}
                  {activeItem?.intent && (
                    <p className="text-xs text-muted-foreground mt-1 truncate">{activeItem.intent}</p>
                  )}
                </div>
              </div>
              <div className="text-right text-xs text-muted-foreground space-y-0.5">
                {typeof call?.cost === 'number' && call.cost > 0 && (
                  <p className="text-sm font-semibold text-foreground">
                    ${call.cost.toFixed(4)}
                    <span className="text-xs font-normal text-muted-foreground ml-1">cost</span>
                  </p>
                )}
                <p>Escalated {formatDateTime(activeItem?.createdAt)}</p>
                {(activeItem?.endedAt || activeItem?.resolvedAt || activeItem?.abandonedAt) && (
                  <p>Ended {formatDateTime(activeItem.endedAt || activeItem.resolvedAt || activeItem.abandonedAt)}</p>
                )}
              </div>
            </div>
          </div>

          <div className="px-5 py-5 space-y-6">
            <div className="rounded-xl border border-emerald-300/40 bg-emerald-50/60 dark:border-emerald-500/20 dark:bg-emerald-500/10 p-4 space-y-3">
              <div className="flex items-center gap-2">
                <Headphones className="h-4 w-4 text-emerald-700 dark:text-emerald-300" />
                <div>
                  <p className="text-sm font-semibold text-foreground">Human call recording</p>
                  <p className="text-xs text-muted-foreground">
                    Agent ↔ customer conference
                    {formatRecordingDuration(activeItem?.humanRecordingDuration)
                      ? ` · ${formatRecordingDuration(activeItem.humanRecordingDuration)}`
                      : ''}
                    {activeItem?.humanRecordingStatus ? ` · ${activeItem.humanRecordingStatus}` : ''}
                  </p>
                </div>
              </div>
              {humanAudioLoading && (
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <GlobalLoader variant="inline" size="sm" />
                  Loading recording…
                </div>
              )}
              {humanAudioUrl && (
                <audio controls className="w-full" src={humanAudioUrl} preload="metadata" />
              )}
              {!humanAudioLoading && !humanAudioUrl && (
                <p className="text-xs text-amber-800 dark:text-amber-300">
                  {humanAudioError
                    || (!activeItem?.agentCallSid && !activeItem?.inProgressAt
                      ? 'No human agent joined this call, so there is no human conversation recording. The AI transcript below is from before the transfer.'
                      : 'Human recording is not available for this call yet.')}
                </p>
              )}
            </div>

            {error && !call && (
              <div className="rounded-xl border border-dashed border-border bg-muted/30 px-4 py-6 text-center text-sm text-muted-foreground">
                {error}
              </div>
            )}

            {call && (
              <>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
                  {[
                    { label: 'Assistant', value: assistantLabel },
                    { label: 'Duration', value: duration || '—' },
                    { label: 'Ended reason', value: endedReasonDisplay || '—' },
                    { label: 'Started', value: startedAt ? formatStudioTime(startedAt) : '—' },
                    { label: 'Ended', value: endedAt ? formatStudioTime(endedAt) : '—' },
                  ].map(({ label, value }) => (
                    <div key={label} className="rounded-lg bg-muted/40 border border-border/50 px-3 py-2.5">
                      <p className="text-[10px] uppercase tracking-wide text-muted-foreground mb-1">{label}</p>
                      <p className="text-sm font-semibold text-foreground capitalize">{value}</p>
                    </div>
                  ))}
                </div>

                <div className="space-y-2">
                  <p className="text-xs uppercase tracking-wide text-muted-foreground">Summary</p>
                  <p className="text-sm text-foreground bg-muted/50 rounded-lg p-3">
                    {call.analysis?.summary || call.summary || activeItem?.aiSummary || 'No summary available'}
                  </p>
                </div>

                {call.analysis?.successEvaluation && (
                  <SuccessEvaluationDisplay
                    evaluation={call.analysis.successEvaluation}
                    rubric={evalRubric}
                    variant="full"
                  />
                )}

                {(recordingUrl || stereoUrl) && (
                  <div className="space-y-3">
                    <p className="text-xs uppercase tracking-wide text-muted-foreground">AI call recording</p>
                    {recordingUrl && call?._id && (
                      <AiCallRecordingPlayer
                        key={`${call._id}-mono`}
                        callDetailId={call._id}
                        channel="mono"
                        autoStart
                        className="w-full"
                      />
                    )}
                    {stereoUrl && call?._id && (
                      <AiCallRecordingPlayer
                        key={`${call._id}-stereo`}
                        callDetailId={call._id}
                        channel="stereo"
                        className="w-full"
                      />
                    )}
                  </div>
                )}

                {messages.length > 0 && (
                  <div className="space-y-3">
                    {messages.some((m) => m.role === 'system') && (
                      <>
                        <p className="text-xs uppercase tracking-wide text-muted-foreground">Script (system prompt)</p>
                        <div className="text-[11px] text-foreground bg-muted/50 rounded-lg p-3 max-h-[160px] overflow-y-auto whitespace-pre-wrap">
                          {messages.find((m) => m.role === 'system')?.message || 'Script not available'}
                        </div>
                      </>
                    )}

                    <p className="text-xs uppercase tracking-wide text-muted-foreground">Turn-by-turn transcript</p>
                    <div className="max-h-[420px] overflow-y-auto border border-dashed border-border rounded-lg p-3 bg-muted/30 space-y-2">
                      {messages
                        .filter((msg) => msg.role !== 'system')
                        .map((msg, idx) => {
                          const isAI = msg.role === 'bot' || msg.role === 'assistant'
                          const isUser = !isAI
                          return (
                            <div
                              key={idx}
                              className={cn('flex w-full', isUser ? 'justify-end' : 'justify-start')}
                            >
                              <div
                                className={cn(
                                  'max-w-[80%] rounded-2xl px-3 py-2 text-[11px] leading-relaxed shadow-sm',
                                  isAI
                                    ? 'bg-indigo-500/10 text-foreground rounded-bl-sm'
                                    : 'bg-card text-foreground border border-border rounded-br-sm',
                                )}
                              >
                                <p className="mb-1 text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">
                                  {isAI ? 'AI Agent' : callerLabel}
                                </p>
                                <p className="whitespace-pre-wrap">{msg.message || msg.content || ''}</p>
                              </div>
                            </div>
                          )
                        })}
                    </div>
                  </div>
                )}

                {!recordingUrl && !stereoUrl && messages.length === 0 && (
                  <div className="rounded-xl border border-dashed border-border bg-muted/30 px-4 py-6 text-center text-sm text-muted-foreground">
                    AI recording and transcript are not available yet. Try Sync from Vapi.
                  </div>
                )}
              </>
            )}

            {!call && !error && (
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <User className="h-4 w-4" />
                No AI call detail loaded.
              </div>
            )}
          </div>
        </div>
      )}

      <ResolvedLeadSidebar
        open={leadSidebarOpen}
        onClose={() => setLeadSidebarOpen(false)}
        queueItemId={queueItemId}
        fallbackName={callerName}
        fallbackPhone={callerPhone}
        canManage={canManage}
      />
    </div>
  )
}
