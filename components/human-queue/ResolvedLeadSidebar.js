'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import {
  Check,
  Clock3,
  Loader2,
  Mail,
  Phone,
  Trash2,
} from 'lucide-react'
import api from '@/lib/api'
import { cn, formatDateTime, getInitials } from '@/lib/utils'
import { getStudioTimezone } from '@/lib/studioTimezone'
import { studioWallTimeToUtcISO, utcToStudioWallTime } from '@/lib/studio-time'
import { useToast } from '@/components/ui/toast'
import {
  useLeadStages,
  formatLeadStageLabel,
  getLeadStageColor,
} from '@/lib/lead-stages'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet'
import GlobalLoader from '@/components/shared/GlobalLoader'

function formatWhen(value) {
  if (!value) return null
  const zone = getStudioTimezone()
  try {
    return new Date(value).toLocaleString(undefined, {
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      ...(zone ? { timeZone: zone } : {}),
    })
  } catch {
    return null
  }
}

function wallTimeInputValue(iso) {
  if (!iso) return ''
  const wall = utcToStudioWallTime(iso, getStudioTimezone())
  if (!wall.date || !wall.time) return ''
  return `${wall.date}T${wall.time}`
}

/**
 * Right-hand lead profile. Used on a resolved call and on a callback row.
 * Stage, notes, and callback — the full inbox stays in the callbacks dialog.
 */
export default function ResolvedLeadSidebar({
  open,
  onClose,
  queueItemId,
  profileId,
  apiBase = '/api/human-queue',
  fallbackName = 'Unknown caller',
  fallbackPhone = '',
  canManage = false,
}) {
  const toast = useToast()
  const { stages: stageOptions } = useLeadStages()
  const [loading, setLoading] = useState(false)
  const [lead, setLead] = useState(null)
  const [pendingCallback, setPendingCallback] = useState(null)
  const [leadStage, setLeadStage] = useState('')
  const [savingStage, setSavingStage] = useState(null)
  const [savingCallback, setSavingCallback] = useState(null)
  const [scheduledLocal, setScheduledLocal] = useState('')
  const [noteText, setNoteText] = useState('')
  const [savingNote, setSavingNote] = useState(false)
  const [deletingNoteId, setDeletingNoteId] = useState(null)
  const [loadError, setLoadError] = useState(null)
  const loadGen = useRef(0)
  const recordId = profileId || queueItemId

  const loadContact = useCallback(async () => {
    if (!recordId) return
    const gen = ++loadGen.current
    setLoading(true)
    setLoadError(null)
    try {
      const r = await api.get(`${apiBase}/${encodeURIComponent(recordId)}/contact`)
      if (gen !== loadGen.current) return
      if (!r.success) {
        setLead(null)
        setPendingCallback(null)
        setLeadStage('')
        setLoadError(r.error || 'Could not load this contact.')
        return
      }
      const nextLead = r.data?.lead || null
      const nextCb = r.data?.pendingCallback || null
      setLead(nextLead)
      setPendingCallback(nextCb)
      setLeadStage(nextLead?.stage || '')
      setNoteText('')
      setScheduledLocal(wallTimeInputValue(nextCb?.scheduledTime))
    } catch (err) {
      if (gen !== loadGen.current) return
      setLoadError(err?.message || 'Could not load this contact.')
    } finally {
      if (gen === loadGen.current) setLoading(false)
    }
  }, [apiBase, recordId])

  useEffect(() => {
    if (!open || !recordId) return
    loadContact()
  }, [open, recordId, loadContact])

  const handleSaveLeadStage = async (next) => {
    if (!canManage || !(lead?.id || lead?._id) || !recordId || savingStage) return
    if (
      String(next || '').trim().toLowerCase() ===
      String(leadStage || '').trim().toLowerCase()
    ) {
      return
    }
    const previous = leadStage
    setSavingStage(next)
    setLeadStage(next)
    try {
      const r = await api.patch(`${apiBase}/${encodeURIComponent(recordId)}/lead-stage`, {
        stage: next,
      })
      if (!r.success) throw new Error(r.error || 'Could not update lead stage.')
      const savedStage = r.data?.stage || next
      setLeadStage(savedStage)
      setLead((prev) => (prev ? { ...prev, stage: savedStage } : prev))
      toast.success({
        title: 'Stage updated',
        message: `Lead stage set to ${formatLeadStageLabel(savedStage, stageOptions)}.`,
      })
    } catch (err) {
      toast.error({ title: 'Stage update failed', message: err.message })
      setLeadStage(previous || lead?.stage || '')
    } finally {
      setSavingStage(null)
    }
  }

  const applyNotes = (notes) => {
    setLead((prev) => (prev ? { ...prev, notes: Array.isArray(notes) ? notes : [] } : prev))
  }

  const handleAddNote = async (event) => {
    event.preventDefault()
    const text = noteText.trim()
    if (!canManage || !(lead?.id || lead?._id) || !recordId || !text || savingNote) return
    setSavingNote(true)
    try {
      const r = await api.post(`${apiBase}/${encodeURIComponent(recordId)}/notes`, { text })
      if (!r.success) throw new Error(r.error || 'Could not add note.')
      applyNotes(r.data)
      setNoteText('')
      toast.success({ title: 'Note added', message: 'Saved on this lead.' })
    } catch (err) {
      toast.error({ title: 'Note failed', message: err.message })
    } finally {
      setSavingNote(false)
    }
  }

  const handleDeleteNote = async (noteId) => {
    if (!canManage || !noteId || !recordId || deletingNoteId) return
    setDeletingNoteId(noteId)
    try {
      const r = await api.delete(
        `${apiBase}/${encodeURIComponent(recordId)}/notes/${encodeURIComponent(noteId)}`,
      )
      if (!r.success) throw new Error(r.error || 'Could not delete note.')
      applyNotes(r.data)
    } catch (err) {
      toast.error({ title: 'Delete failed', message: err.message })
    } finally {
      setDeletingNoteId(null)
    }
  }

  const handleArrangeCallback = async () => {
    if (!canManage || !recordId || savingCallback) return
    if (!lead?.id && !lead?._id) {
      toast.error({
        title: 'No lead',
        message: 'This call is not linked to a lead.',
      })
      return
    }
    setSavingCallback('arrange')
    try {
      const body = {}
      if (scheduledLocal) {
        const [dateStr, timeStr] = scheduledLocal.split('T')
        const iso = studioWallTimeToUtcISO(dateStr, timeStr, getStudioTimezone())
        if (!iso) throw new Error('Pick a valid callback time.')
        body.scheduledTime = iso
      }
      const r = await api.post(`${apiBase}/${encodeURIComponent(recordId)}/callback`, body)
      if (!r.success) throw new Error(r.error || 'Could not arrange callback.')
      setPendingCallback(r.data)
      toast.success({
        title: 'Callback arranged',
        message: r.data?.scheduledTime
          ? `Scheduled for ${formatWhen(r.data.scheduledTime)}.`
          : 'A pending callback was added for this lead.',
      })
    } catch (err) {
      toast.error({ title: 'Callback failed', message: err.message })
    } finally {
      setSavingCallback(null)
    }
  }

  const handleCallbackStatus = async (status) => {
    const cbId = pendingCallback?.id || pendingCallback?._id
    if (!canManage || !cbId || savingCallback) return
    setSavingCallback(status)
    try {
      const r = await api.patch(`/api/callback-requests/${encodeURIComponent(cbId)}/status`, {
        status,
      })
      if (!r.success) throw new Error(r.error || 'Could not update callback.')
      if (status === 'pending') {
        setPendingCallback(r.data || { ...pendingCallback, status: 'pending' })
      } else {
        setPendingCallback(null)
        setScheduledLocal('')
      }
      toast.success({
        title: status === 'resolved' ? 'Callback resolved' : status === 'cancelled' ? 'Callback cancelled' : 'Callback updated',
        message: status === 'resolved'
          ? 'Marked resolved.'
          : status === 'cancelled'
            ? 'This callback was cancelled.'
            : `Status set to ${status}.`,
      })
    } catch (err) {
      toast.error({ title: 'Update failed', message: err.message })
    } finally {
      setSavingCallback(null)
    }
  }

  const notes = [...(lead?.notes || [])].sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
  )
  const displayName = lead?.name || fallbackName
  const phone = lead?.phoneNumber || fallbackPhone || ''
  const email = lead?.email || ''
  const hasLead = Boolean(lead?.id || lead?._id)
  const stageColor = getLeadStageColor(leadStage, stageOptions)

  return (
    <Sheet open={open} onClose={onClose} side="right" width="420px">
      <SheetContent onClose={onClose} className="flex flex-col overflow-hidden p-0">
        <SheetHeader className="border-b border-border px-5 py-4 pr-12 text-left">
          <div className="flex items-start gap-3">
            <Avatar className="h-11 w-11 shrink-0">
              <AvatarFallback className="bg-[color:var(--studio-primary)] text-white text-sm font-semibold">
                {getInitials(displayName)}
              </AvatarFallback>
            </Avatar>
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <SheetTitle className="truncate">{displayName}</SheetTitle>
                {leadStage ? (
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-muted/60 px-2 py-0.5 text-[11px] font-medium text-foreground">
                    <span
                      className="h-2 w-2 rounded-full"
                      style={{ backgroundColor: stageColor || '#6B7280' }}
                    />
                    {formatLeadStageLabel(leadStage, stageOptions)}
                  </span>
                ) : null}
              </div>
              <SheetDescription className="mt-1 flex flex-wrap gap-x-3 gap-y-1">
                {phone ? (
                  <span className="inline-flex items-center gap-1">
                    <Phone className="h-3.5 w-3.5" />
                    {phone}
                  </span>
                ) : null}
                {email ? (
                  <span className="inline-flex items-center gap-1">
                    <Mail className="h-3.5 w-3.5" />
                    {email}
                  </span>
                ) : null}
              </SheetDescription>
            </div>
          </div>
        </SheetHeader>

        <div className="min-h-0 flex-1 space-y-6 overflow-y-auto px-5 py-5">
          {loading ? (
            <div className="flex items-center justify-center py-16">
              <GlobalLoader variant="inline" size="md" text="Loading contact…" />
            </div>
          ) : loadError ? (
            <div className="rounded-xl border border-dashed border-border bg-muted/30 px-4 py-8 text-center text-sm text-muted-foreground">
              {loadError}
            </div>
          ) : (
            <>
              {!hasLead && (
                <div className="rounded-xl border border-amber-500/30 bg-amber-500/10 px-3 py-2.5 text-xs text-amber-900 dark:text-amber-200">
                  This call is not linked to a lead. Stage, notes, and callback stay unavailable until a lead is matched.
                </div>
              )}

              <div className="space-y-2">
                <label className="text-xs font-medium text-muted-foreground">Lead stage</label>
                <div className="flex flex-wrap gap-1.5">
                  {(stageOptions || []).map((s) => {
                    const value = s.key || s.value
                    const label = s.name || formatLeadStageLabel(value, stageOptions)
                    const active =
                      String(leadStage || '').trim().toLowerCase() ===
                      String(value || '').trim().toLowerCase()
                    const saving = savingStage === value
                    const color = getLeadStageColor(value, stageOptions)
                    const disabled = !canManage || !hasLead || Boolean(savingStage)
                    return (
                      <button
                        key={value}
                        type="button"
                        disabled={disabled}
                        onClick={() => handleSaveLeadStage(value)}
                        className={cn(
                          'inline-flex h-8 items-center gap-1.5 rounded-full border px-2.5 text-xs font-medium transition-colors',
                          active
                            ? 'border-foreground/25 bg-muted text-foreground shadow-sm'
                            : 'border-border bg-background text-muted-foreground hover:bg-muted/60 hover:text-foreground',
                          disabled && 'cursor-not-allowed opacity-50',
                        )}
                      >
                        {saving ? (
                          <Loader2 className="h-3 w-3 animate-spin" />
                        ) : (
                          <span
                            className="h-2 w-2 shrink-0 rounded-full"
                            style={{ backgroundColor: color || '#6B7280' }}
                          />
                        )}
                        {label}
                        {active && !saving ? <Check className="h-3 w-3" /> : null}
                      </button>
                    )
                  })}
                </div>
                {!canManage && (
                  <p className="text-[11px] text-muted-foreground">
                    View only — Call Center write or edit is required to change the stage.
                  </p>
                )}
              </div>

              <div className="space-y-3">
                <label className="text-xs font-medium text-muted-foreground">Notes</label>
                {canManage && hasLead ? (
                  <form onSubmit={handleAddNote} className="flex gap-2">
                    <input
                      type="text"
                      value={noteText}
                      onChange={(e) => setNoteText(e.target.value)}
                      placeholder="Add a note…"
                      disabled={savingNote}
                      className="h-9 min-w-0 flex-1 rounded-lg border border-border bg-background px-3 text-sm text-foreground outline-none focus:ring-2 focus:ring-[var(--studio-primary)]/30 disabled:opacity-50"
                    />
                    <button
                      type="submit"
                      disabled={savingNote || !noteText.trim()}
                      className="inline-flex h-9 shrink-0 items-center justify-center rounded-lg bg-[var(--studio-primary)] px-3 text-sm font-semibold text-white hover:brightness-95 disabled:opacity-50"
                    >
                      {savingNote ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Add'}
                    </button>
                  </form>
                ) : null}

                {notes.length === 0 ? (
                  <div className="rounded-xl border border-dashed border-border bg-muted/30 px-3 py-4 text-center text-xs text-muted-foreground">
                    No notes yet.
                  </div>
                ) : (
                  <div className="max-h-64 space-y-2 overflow-y-auto pr-1">
                    {notes.map((note) => {
                      const noteId = note.id || note._id
                      return (
                        <div key={noteId} className="rounded-xl border border-border bg-muted/40 px-3 py-2.5">
                          <div className="flex items-start justify-between gap-2">
                            <p className="flex-1 whitespace-pre-wrap text-sm leading-relaxed text-foreground">
                              {note.text}
                            </p>
                            {canManage ? (
                              <button
                                type="button"
                                onClick={() => handleDeleteNote(noteId)}
                                disabled={deletingNoteId === noteId}
                                className="shrink-0 text-muted-foreground hover:text-destructive disabled:opacity-50"
                                aria-label="Delete note"
                              >
                                {deletingNoteId === noteId ? (
                                  <Loader2 className="h-3.5 w-3.5 animate-spin" />
                                ) : (
                                  <Trash2 className="h-3.5 w-3.5" />
                                )}
                              </button>
                            ) : null}
                          </div>
                          <p className="mt-1 text-xs text-muted-foreground">
                            {note.createdBy?.name || note.createdBy?.email || 'Unknown'}
                            {' · '}
                            {formatDateTime(note.createdAt)}
                          </p>
                        </div>
                      )
                    })}
                  </div>
                )}
                {!canManage && (
                  <p className="text-[11px] text-muted-foreground">
                    View only — Call Center write or edit is required to add notes.
                  </p>
                )}
              </div>

              <div className="space-y-3">
                <label className="text-xs font-medium text-muted-foreground">Callback</label>

                {pendingCallback ? (
                  <div className="space-y-3 rounded-xl border border-border bg-muted/30 p-3">
                    <div className="flex items-start gap-2 text-sm text-foreground">
                      <Clock3 className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />
                      <div className="min-w-0">
                        <p className="font-medium">Pending callback</p>
                        <p className="text-xs text-muted-foreground mt-0.5">
                          {pendingCallback.scheduledTime
                            ? `Scheduled ${formatWhen(pendingCallback.scheduledTime)}`
                            : 'No time set yet'}
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <button
                        type="button"
                        disabled={!canManage || Boolean(savingCallback)}
                        onClick={() => handleCallbackStatus('resolved')}
                        className="inline-flex h-8 items-center gap-1.5 rounded-lg border border-emerald-500/40 bg-emerald-500/10 px-3 text-xs font-medium text-emerald-700 dark:text-emerald-300 disabled:opacity-50"
                      >
                        {savingCallback === 'resolved' ? (
                          <Loader2 className="h-3.5 w-3.5 animate-spin" />
                        ) : (
                          <Check className="h-3.5 w-3.5" />
                        )}
                        Mark resolved
                      </button>
                      <button
                        type="button"
                        disabled={!canManage || Boolean(savingCallback)}
                        onClick={() => handleCallbackStatus('cancelled')}
                        className="inline-flex h-8 items-center rounded-lg border border-border bg-background px-3 text-xs font-medium text-muted-foreground hover:text-foreground disabled:opacity-50"
                      >
                        {savingCallback === 'cancelled' ? (
                          <Loader2 className="h-3.5 w-3.5 animate-spin" />
                        ) : null}
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-3 rounded-xl border border-border bg-background p-3">
                    <p className="text-xs text-muted-foreground">
                      Arrange a follow-up for this lead. They will appear under Callbacks.
                    </p>
                    <div className="space-y-1.5">
                      <label className="text-[11px] font-medium text-muted-foreground">
                        Preferred time
                      </label>
                      <input
                        type="datetime-local"
                        value={scheduledLocal}
                        onChange={(e) => setScheduledLocal(e.target.value)}
                        disabled={!canManage || !hasLead || Boolean(savingCallback)}
                        className="h-9 w-full rounded-lg border border-border bg-background px-3 text-sm text-foreground outline-none focus:ring-2 focus:ring-[var(--studio-primary)]/30 disabled:opacity-50"
                      />
                    </div>
                    <button
                      type="button"
                      disabled={!canManage || !hasLead || Boolean(savingCallback)}
                      onClick={handleArrangeCallback}
                      className="inline-flex h-9 w-full items-center justify-center gap-2 rounded-lg bg-[var(--studio-primary)] px-3 text-sm font-semibold text-white hover:brightness-95 disabled:opacity-50"
                    >
                      {savingCallback === 'arrange' ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : null}
                      Arrange callback
                    </button>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  )
}
