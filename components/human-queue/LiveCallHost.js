'use client'

import { Suspense, useCallback, useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { usePathname } from 'next/navigation'
import api from '@/lib/api'
import { isAuthenticated } from '@/lib/auth'
import { useToast } from '@/components/ui/toast'
import { isPersistedCallId, nextOutboundPanelStatus } from '@/lib/outboundCallStatus'
import {
  clearLiveOutboundCall,
  getLiveOutboundCallState,
  noteUserEndedLiveOutboundCall,
  patchLiveOutboundCall,
  setLiveOutboundCallMinimized,
  takeOutboundEndSuppressed,
  useLiveOutboundCall,
} from '@/lib/liveOutboundCallStore'
import {
  clearLiveQueueCall,
  getLiveQueueCallState,
  liveQueueEndMessage,
  noteUserEndedLiveQueueCall,
  patchLiveQueueCall,
  setLiveQueueCallMinimized,
  takeRemoteEndSuppressed,
  useLiveQueueCall,
} from '@/lib/liveQueueCallStore'
import {
  disconnectConnection,
  subscribeToConnectionEvents,
} from '@/lib/twilioVoiceClient'
import ActiveCallPanel from '@/components/human-queue/ActiveCallPanel'
import GlobalIncomingCallAlert from '@/components/human-queue/GlobalIncomingCallAlert'

const STATUS_POLL_MS = 4000

/**
 * App-wide shell for:
 *  - the incoming-call popup (always mounted; not tied to Call Center tabs)
 *  - the live queue call panel / minimized bar (survives navigation)
 *
 * Mount once from Providers. Callback dials live here too, so leaving
 * Call Center minimizes the call instead of hanging it up.
 */
function dropLiveCallOnLogout() {
  const live = getLiveQueueCallState()
  if (live.call || live.connection) {
    noteUserEndedLiveQueueCall()
    disconnectConnection(live.connection)
    clearLiveQueueCall()
  }
  const outbound = getLiveOutboundCallState()
  if (outbound.call || outbound.connection) {
    noteUserEndedLiveOutboundCall()
    disconnectConnection(outbound.connection)
    clearLiveOutboundCall()
  }
}

export default function LiveCallHost() {
  const pathname = usePathname()
  const [signedIn, setSignedIn] = useState(false)

  useEffect(() => {
    const sync = () => {
      const ok = isAuthenticated()
      if (!ok) dropLiveCallOnLogout()
      setSignedIn(ok)
    }
    sync()
    const id = setInterval(sync, 2000)
    return () => clearInterval(id)
  }, [pathname])

  if (!signedIn) return null
  return <LiveCallHostInner />
}

function LiveCallHostInner() {
  const toast = useToast()
  const live = useLiveQueueCall()
  const outbound = useLiveOutboundCall()
  const disconnectToastRef = useRef(false)
  const clearingRef = useRef(false)
  const liveRef = useRef(live)
  useEffect(() => {
    liveRef.current = live
  }, [live])

  const clearWithMessage = useCallback((message) => {
    if (clearingRef.current) return
    clearingRef.current = true
    try {
      if (takeRemoteEndSuppressed() || !getLiveQueueCallState().call) {
        disconnectConnection(getLiveQueueCallState().connection)
        clearLiveQueueCall()
        return
      }
      disconnectConnection(getLiveQueueCallState().connection)
      // A sync disconnect handler may already have closed the panel and toasted.
      if (!getLiveQueueCallState().call) return
      clearLiveQueueCall()
      if (message && !disconnectToastRef.current) {
        disconnectToastRef.current = true
        toast.info({ title: 'Call disconnected', message })
        setTimeout(() => {
          disconnectToastRef.current = false
        }, 2000)
      }
    } finally {
      clearingRef.current = false
    }
  }, [toast])

  // Wire Twilio connection events while a live queue call is up.
  // Depend on the connection only — polling replaces the call object and must
  // not drop the disconnect listener mid-call.
  useEffect(() => {
    const connection = live.connection
    if (!connection || !getLiveQueueCallState().call) return undefined

    const rawStatus = typeof connection.status === 'function' ? connection.status() : connection.status
    if (rawStatus === 'open' && getLiveQueueCallState().callStatus === 'connecting') {
      patchLiveQueueCall({ callStatus: 'connected' })
    }

    return subscribeToConnectionEvents(connection, {
      accept: () => {
        if (getLiveQueueCallState().callStatus === 'connecting') {
          patchLiveQueueCall({ callStatus: 'connected' })
        }
      },
      disconnect: () => {
        if (takeRemoteEndSuppressed() || !getLiveQueueCallState().call) {
          clearLiveQueueCall()
          return
        }
        clearWithMessage('The call has ended.')
      },
      error: () => {
        clearWithMessage('The call audio failed.')
      },
    })
  }, [live.connection, clearWithMessage])

  // Poll queue item so a remote hangup closes the panel even off Call Center
  useEffect(() => {
    const callId = live.call?.id || live.call?._id
    if (!callId || !live.connection) return undefined

    let cancelled = false
    const tick = async () => {
      if (cancelled) return
      try {
        const detail = await api.get(`/api/human-queue/${encodeURIComponent(callId)}`)
        if (cancelled || !detail.success || !detail.data) return
        const updated = detail.data
        const reason = liveQueueEndMessage(updated)
        if (reason) {
          clearWithMessage(reason)
          return
        }
        const prev = liveRef.current?.call
        const same =
          prev
          && String(prev.id || prev._id) === String(updated.id || updated._id)
          && prev.status === updated.status
          && prev.assignedUserId === updated.assignedUserId
          && prev.endedReason === updated.endedReason
        if (!same) patchLiveQueueCall({ call: updated })
      } catch {
        // ignore transient poll errors
      }
    }

    tick()
    const id = setInterval(tick, STATUS_POLL_MS)
    return () => {
      cancelled = true
      clearInterval(id)
    }
  }, [live.call?.id, live.call?._id, live.connection, clearWithMessage])

  const handleHoldChange = useCallback(async (onHold) => {
    const callId = liveRef.current?.call?.id || liveRef.current?.call?._id
    if (!callId) return
    const r = await api.post(
      onHold ? `/api/human-queue/${callId}/hold` : `/api/human-queue/${callId}/unhold`,
      {},
    )
    if (!r.success) {
      toast.error({ title: 'Hold failed', message: r.error || 'Could not update hold status.' })
      throw new Error(r.error || 'Hold failed')
    }
    patchLiveQueueCall({ callStatus: onHold ? 'on_hold' : 'connected' })
    toast.success({
      title: onHold ? 'Caller on hold' : 'Caller resumed',
      message: onHold ? 'The caller is hearing hold music.' : 'You are connected again.',
    })
  }, [toast])

  const handleEndCall = useCallback(() => {
    noteUserEndedLiveQueueCall()
    disconnectConnection(getLiveQueueCallState().connection)
    clearLiveQueueCall()
    toast.info({
      title: 'Call ended',
      message: 'You left the call. You can still mark it resolved from Active.',
    })
  }, [toast])

  const handleResolve = useCallback(async () => {
    const callId = liveRef.current?.call?.id || liveRef.current?.call?._id
    if (!callId) return
    if (!liveRef.current?.canManage) {
      toast.error({
        title: 'No access',
        message: 'Call Center write or edit permission is required.',
      })
      return
    }
    patchLiveQueueCall({ resolving: true })
    try {
      noteUserEndedLiveQueueCall()
      disconnectConnection(getLiveQueueCallState().connection)
      const r = await api.post(`/api/human-queue/${callId}/resolve`, {})
      clearLiveQueueCall()
      if (!r.success) {
        toast.error({ title: 'Resolve failed', message: r.error || 'Could not resolve.' })
        return
      }
      toast.success({ title: 'Resolved', message: 'Call marked as resolved.' })
    } catch (error) {
      console.error(error)
      noteUserEndedLiveQueueCall()
      disconnectConnection(getLiveQueueCallState().connection)
      clearLiveQueueCall()
      toast.error({ title: 'Error', message: 'Could not resolve this call.' })
    }
  }, [toast])

  const handleClose = useCallback(() => {
    const status = liveRef.current?.callStatus
    if (status === 'connected' || status === 'on_hold') {
      setLiveQueueCallMinimized(true)
      return
    }
    // Connecting: drop the browser leg too, or audio stays up with no panel.
    noteUserEndedLiveQueueCall()
    disconnectConnection(getLiveQueueCallState().connection)
    clearLiveQueueCall()
  }, [])

  useEffect(() => {
    const connection = outbound.connection
    if (!connection || !getLiveOutboundCallState().call) return undefined
    return subscribeToConnectionEvents(connection, {
      // A browser-leg blip must not close the panel. The status poll
      // closes it once the customer call is actually finished.
      disconnect: () => {
        if (!getLiveOutboundCallState().call) return
        patchLiveOutboundCall({ connection: null })
      },
      cancel: () => {
        if (!getLiveOutboundCallState().call) return
        patchLiveOutboundCall({ connection: null })
      },
      error: () => {
        toast.error({
          title: 'Call audio error',
          message: 'Browser call connection failed. Check microphone permissions.',
        })
      },
    })
  }, [outbound.connection, toast])

  const endOutboundCall = useCallback((opts = {}) => {
    const remoteHangup = Boolean(opts.remoteHangup)
    const current = getLiveOutboundCallState()
    if (!current.call && !current.connection) return
    noteUserEndedLiveOutboundCall()
    const callId = current.call?.id || current.call?._id
    disconnectConnection(current.connection)
    clearLiveOutboundCall()
    if (isPersistedCallId(callId)) api.post(`/api/human-call/${callId}/end`).catch(() => {})
    toast.info({
      title: 'Call ended',
      message: remoteHangup ? 'The call has ended.' : 'You left the call.',
    })
  }, [toast])

  useEffect(() => {
    const callId = outbound.call?.id || outbound.call?._id
    if (!callId || !isPersistedCallId(callId)) return undefined
    let cancelled = false
    const poll = async () => {
      if (takeOutboundEndSuppressed() || !getLiveOutboundCallState().call) return
      try {
        const res = await api.get(`/api/human-call/${callId}`)
        if (cancelled || !getLiveOutboundCallState().call || !res.success || !res.data) return
        const next = nextOutboundPanelStatus(
          res.data.status,
          getLiveOutboundCallState().callStatus,
        )
        if (next === 'ended') {
          endOutboundCall({ remoteHangup: true })
          return
        }
        if (next !== getLiveOutboundCallState().callStatus) {
          patchLiveOutboundCall({ callStatus: next })
        }
      } catch {
        // ignore transient poll errors
      }
    }
    poll()
    const id = setInterval(poll, 1000)
    return () => {
      cancelled = true
      clearInterval(id)
    }
  }, [outbound.call?.id, outbound.call?._id, endOutboundCall])

  const handleOutboundHold = useCallback(async (onHold) => {
    const callId = getLiveOutboundCallState().call?.id || getLiveOutboundCallState().call?._id
    if (!callId) return
    const r = await api.post(`/api/human-call/${callId}/hold`, { hold: onHold })
    if (!r.success) {
      toast.error({ title: 'Hold failed', message: r.error || 'Could not update hold status.' })
      throw new Error(r.error || 'Hold failed')
    }
    patchLiveOutboundCall({ callStatus: onHold ? 'on_hold' : 'connected' })
    toast.success({
      title: onHold ? 'Caller on hold' : 'Caller resumed',
      message: onHold ? 'The caller is hearing hold music.' : 'You are connected again.',
    })
  }, [toast])

  const outboundPanel = outbound.call && typeof document !== 'undefined'
    ? createPortal(
      <ActiveCallPanel
        mode="outbound"
        layerZIndex={500}
        call={outbound.call}
        connection={outbound.connection}
        callStatus={outbound.callStatus}
        canManage={outbound.canManage}
        minimized={outbound.minimized}
        onMinimizedChange={setLiveOutboundCallMinimized}
        onEndCall={() => endOutboundCall()}
        onHoldChange={handleOutboundHold}
        onClose={() => setLiveOutboundCallMinimized(true)}
      />,
      document.body,
    )
    : null

  const panel = live.call && typeof document !== 'undefined'
    ? createPortal(
      <ActiveCallPanel
        mode="queue"
        layerZIndex={500}
        call={live.call}
        connection={live.connection}
        callStatus={live.callStatus}
        resolving={live.resolving}
        canManage={live.canManage}
        minimized={live.minimized}
        onMinimizedChange={setLiveQueueCallMinimized}
        onEndCall={handleEndCall}
        onResolve={handleResolve}
        onHoldChange={handleHoldChange}
        onClose={handleClose}
      />,
      document.body,
    )
    : null

  return (
    <>
      <Suspense fallback={null}>
        <GlobalIncomingCallAlert />
      </Suspense>
      {panel}
      {outboundPanel}
    </>
  )
}
