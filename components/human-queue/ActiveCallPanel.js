'use client'

import { useEffect, useState } from 'react'
import {
  CheckCircle2,
  Mic,
  MicOff,
  Minimize2,
  Maximize2,
  Pause,
  Phone,
  PhoneOff,
  Play,
  X,
} from 'lucide-react'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { cn, formatDateTime, getInitials } from '@/lib/utils'
import {
  isConnectionMuted,
  muteConnection,
  subscribeToConnectionEvents,
} from '@/lib/twilioVoiceClient'
import { useCallTimer } from './useCallTimer'

function CallActionButton({ icon: Icon, label, active, danger, disabled, onClick }) {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      className={cn(
        'flex flex-col items-center justify-center gap-1.5 rounded-2xl px-3 py-3 transition-all disabled:opacity-50',
        danger
          ? 'bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90'
          : active
            ? 'bg-[var(--studio-primary)] text-white shadow-md'
            : 'bg-muted/80 text-foreground hover:bg-muted',
      )}
    >
      <Icon className="h-5 w-5" />
      <span className="text-[11px] font-medium leading-none">{label}</span>
    </button>
  )
}

export default function ActiveCallPanel({
  call,
  connection,
  onEndCall,
  onResolve,
  onHoldChange,
  onClose,
  resolving = false,
  callStatus = 'connecting',
  canManage = true,
  mode = 'queue', // 'queue' | 'outbound'
  layerZIndex = 60,
  /** When set, minimize is controlled by the parent (survives remounts). */
  minimized: minimizedProp,
  onMinimizedChange,
}) {
  const [localMinimized, setLocalMinimized] = useState(false)
  const minimizedControlled = typeof minimizedProp === 'boolean'
  const minimized = minimizedControlled ? minimizedProp : localMinimized
  const setMinimized = (next) => {
    const value = Boolean(next)
    if (!minimizedControlled) setLocalMinimized(value)
    onMinimizedChange?.(value)
  }
  const [muted, setMuted] = useState(false)
  const [callerOnHold, setCallerOnHold] = useState(false)

  const isConnected = callStatus === 'connected' || callStatus === 'on_hold'
  const { formatted: callDuration } = useCallTimer(isConnected, call?.inProgressAt || call?.claimedAt || call?.initiatedAt)
  useEffect(() => {
    if (!connection) return undefined

    setMuted(isConnectionMuted(connection))

    return subscribeToConnectionEvents(connection, {
      mute: (isMuted) => setMuted(isMuted),
    })
  }, [connection])

  const handleToggleMute = () => {
    const next = !muted
    muteConnection(connection, next)
    setMuted(next)
  }

  const handleToggleHold = async () => {
    const next = !callerOnHold
    try {
      await onHoldChange?.(next)
      setCallerOnHold(next)
    } catch {
      // parent shows toast
    }
  }

  const handleHangUp = () => {
    // Parent owns disconnect (outbound and queue) so it can set an ending
    // guard before teardown and avoid a duplicate "caller hung up" toast.
    onEndCall?.()
  }

  const callerName = call?.leadName || call?.callerName || call?.name || 'Unknown caller'
  const callerPhone = call?.phone || call?.callerPhone || call?.phoneNumber || 'Unknown number'
  const metaLine = `Escalated ${formatDateTime(call?.createdAt)}`
  const showHold = mode === 'outbound' || canManage
  const statusLabel = callStatus === 'connecting'
    ? 'Connecting…'
    : callStatus === 'ended'
      ? 'Call ended'
      : callerOnHold
        ? 'Caller on hold'
        : 'Live call'

  if (minimized) {
    return (
      <div className="fixed bottom-6 right-6" style={{ zIndex: layerZIndex }}>
        <button
          type="button"
          onClick={() => setMinimized(false)}
          className="flex items-center gap-3 rounded-2xl border border-[var(--studio-primary)]/30 bg-card px-4 py-3 shadow-2xl"
        >
          <span className="relative flex h-3 w-3">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success opacity-75" />
            <span className="relative inline-flex h-3 w-3 rounded-full bg-success" />
          </span>
          <div className="text-left">
            <p className="text-sm font-semibold text-foreground">{callerName}</p>
            <p className="text-xs text-muted-foreground">{callDuration} · {callerOnHold ? 'On hold' : 'Live'}</p>
          </div>
          <Maximize2 className="h-4 w-4 text-muted-foreground" />
        </button>
      </div>
    )
  }

  return (
    <div className="fixed inset-0 flex items-end justify-center p-4 sm:items-center sm:p-6" style={{ zIndex: layerZIndex }}>
      <div
        className="absolute inset-0 bg-background/70 backdrop-blur-sm"
        onClick={isConnected ? undefined : onClose}
      />

      <div className="relative z-10 w-full max-w-lg overflow-hidden rounded-3xl border border-border bg-card shadow-2xl animate-scale-in">
        <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 px-5 py-4 text-white">
          <div className="flex items-start justify-between gap-3">
            <div>
              <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-white/70">
                <span className="relative flex h-2 w-2">
                  {isConnected && (
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success opacity-75" />
                  )}
                  <span
                    className={cn(
                      'relative inline-flex h-2 w-2 rounded-full',
                      callStatus === 'connecting'
                        ? 'bg-warning'
                        : callerOnHold
                          ? 'bg-warning'
                          : 'bg-success',
                    )}
                  />
                </span>
                {statusLabel}
              </div>
              <p className="mt-1 text-2xl font-bold tabular-nums">{callDuration}</p>
            </div>
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => setMinimized(true)}
                className="rounded-lg p-2 text-white/70 hover:bg-white/10 hover:text-white"
                title="Minimize"
              >
                <Minimize2 className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={isConnected ? () => setMinimized(true) : onClose}
                className="rounded-lg p-2 text-white/70 hover:bg-white/10 hover:text-white"
                title={isConnected ? 'Minimize' : 'Close'}
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>

          <div className="mt-4 flex items-center gap-3">
            <Avatar className="h-14 w-14 border-2 border-white/20">
              <AvatarFallback className="bg-white/10 text-lg font-semibold text-white">
                {getInitials(callerName)}
              </AvatarFallback>
            </Avatar>
            <div className="min-w-0">
              <p className="truncate text-lg font-semibold">{callerName}</p>
              <p className="text-sm text-white/70">{callerPhone}</p>
              <p className="mt-0.5 text-xs text-white/50">{metaLine}</p>
            </div>
          </div>
        </div>

        <div className="space-y-4 p-5">
          {(call?.escalationReason || call?.lastMessage || call?.aiSummary) && (
            <div className="rounded-xl border border-border bg-muted/30 p-3">
              <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Reason for call</p>
              <p className="mt-1 text-sm text-foreground">
                &quot;{call?.lastMessage || call?.escalationReason}&quot;
              </p>
              {call?.aiSummary && (
                <p className="mt-2 text-xs text-muted-foreground">
                  <span className="font-medium">AI summary:</span> {call.aiSummary}
                </p>
              )}
            </div>
          )}

          <div className={cn('grid gap-2', showHold ? 'grid-cols-3' : 'grid-cols-2')}>
            <CallActionButton
              icon={muted ? MicOff : Mic}
              label={muted ? 'Unmute' : 'Mute'}
              active={muted}
              disabled={!isConnected && callStatus !== 'connecting'}
              onClick={handleToggleMute}
            />
            {showHold && (
              <CallActionButton
                icon={callerOnHold ? Play : Pause}
                label={callerOnHold ? 'Resume' : 'Hold'}
                active={callerOnHold}
                disabled={!isConnected}
                onClick={handleToggleHold}
              />
            )}
            <CallActionButton
              icon={PhoneOff}
              label="Hang up"
              danger
              onClick={handleHangUp}
            />
          </div>

          {mode !== 'outbound' && (
            <div className="flex gap-2">
              {canManage && (
                <button
                  type="button"
                  disabled={resolving}
                  onClick={() => onResolve?.()}
                  className="inline-flex h-11 flex-1 items-center justify-center gap-2 rounded-xl bg-success text-sm font-semibold text-white hover:bg-success disabled:opacity-60"
                >
                  <CheckCircle2 className="h-4 w-4" />
                  {resolving ? 'Resolving…' : 'Resolve & close'}
                </button>
              )}
              <button
                type="button"
                onClick={handleHangUp}
                className={cn(
                  'inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-border px-4 text-sm font-medium text-muted-foreground hover:text-foreground',
                  !canManage && 'flex-1',
                )}
              >
                <Phone className="h-4 w-4" />
                Leave call
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
