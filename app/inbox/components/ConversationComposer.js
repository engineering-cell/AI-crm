'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { CalendarClock, LayoutTemplate, Send, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { useToast } from '@/components/ui/toast'
import {
  buildReplySubject,
  getScheduleMinLocalDatetime,
  htmlToPlainText,
  toScheduleIsoOrNull,
} from '@/lib/emailSend'
import WorkflowEmailTemplatePickerDialog from '@/components/workflow/WorkflowEmailTemplatePickerDialog'
import WorkflowSmsTemplatePickerDialog from '@/components/workflow/WorkflowSmsTemplatePickerDialog'
import { ScaledInboxHtmlEmail } from '@/app/inbox/components/InboxHtmlEmailFrame'

const TEXTAREA_MIN_H = 52
const TEXTAREA_MAX_H = 168

function useAutoResizeTextarea(value) {
  const ref = useRef(null)

  const resize = useCallback(() => {
    const el = ref.current
    if (!el) return
    el.style.height = `${TEXTAREA_MIN_H}px`
    const next = Math.min(Math.max(el.scrollHeight, TEXTAREA_MIN_H), TEXTAREA_MAX_H)
    el.style.height = `${next}px`
  }, [])

  useEffect(() => {
    resize()
  }, [value, resize])

  return { ref, resize }
}

function EmailComposer({
  onSendMessage,
  disabled = false,
  sending = false,
  // Message being replied to (keeps Gmail/Outlook in the same thread).
  replyTarget = null,
  onClearReply = null,
}) {
  const toast = useToast()
  const [message, setMessage] = useState('')
  const [subject, setSubject] = useState('')
  const [scheduleMode, setScheduleMode] = useState('now')
  const [scheduleDate, setScheduleDate] = useState('')
  const [contentHtml, setContentHtml] = useState(null)
  const [selectedTemplate, setSelectedTemplate] = useState(null)
  const [templatePickerOpen, setTemplatePickerOpen] = useState(false)
  const [localSending, setLocalSending] = useState(false)
  const sendLockRef = useRef(false)
  const lastReplyIdRef = useRef(null)

  const usingHtmlTemplate = Boolean(String(contentHtml || '').trim())
  const { ref: textareaRef, resize } = useAutoResizeTextarea(message)
  const isBusy = disabled || sending || localSending

  const hasContent = Boolean(String(contentHtml || '').trim() || message.trim())
  const canSend =
    !isBusy &&
    hasContent &&
    subject.trim() &&
    (scheduleMode === 'now' || !!scheduleDate)

  const minDateTime = getScheduleMinLocalDatetime()

  // When staff picks Reply (or the thread auto-targets the latest email), fill Re: subject.
  useEffect(() => {
    const replyId = replyTarget?.id || null
    if (!replyId || replyId === lastReplyIdRef.current) return
    lastReplyIdRef.current = replyId
    setSubject(buildReplySubject(replyTarget.subject || ''))
  }, [replyTarget?.id, replyTarget?.subject])

  const resetForm = () => {
    setMessage('')
    setSubject(replyTarget ? buildReplySubject(replyTarget.subject || '') : '')
    setScheduleMode('now')
    setScheduleDate('')
    setContentHtml(null)
    setSelectedTemplate(null)
    requestAnimationFrame(resize)
  }

  const clearTemplate = () => {
    setContentHtml(null)
    setSelectedTemplate(null)
    setMessage('')
  }

  const handleTemplateSelect = (tpl) => {
    const html = String(tpl.htmlBody || '').trim()
    if (!html) {
      toast.error({
        title: 'Template unavailable',
        message: 'This email template has no HTML content.',
      })
      return
    }
    setSubject('')
    setContentHtml(html)
    setMessage('')
    setSelectedTemplate({
      id: tpl.emailTemplateId,
      name: tpl.emailTemplateSubject || tpl.subject || 'Email template',
    })
  }

  const handleSend = async () => {
    if (!canSend || sendLockRef.current) return
    const scheduleIso =
      scheduleMode === 'later'
        ? toScheduleIsoOrNull(scheduleDate, { requireFuture: true })
        : null
    if (scheduleMode === 'later' && !scheduleIso) {
      toast.error({
        title: 'Invalid schedule time',
        message: 'Please pick a valid future date and time.',
      })
      return
    }

    sendLockRef.current = true
    setLocalSending(true)
    try {
      const ok = await onSendMessage?.({
        content: usingHtmlTemplate
          ? htmlToPlainText(contentHtml) || selectedTemplate?.name || ''
          : message,
        contentHtml: usingHtmlTemplate ? contentHtml : null,
        subject: subject.trim(),
        channel: 'Email',
        scheduleNow: scheduleMode === 'now',
        scheduleDate: scheduleIso,
        replyToHistoryId: replyTarget?.id || null,
        inReplyTo: replyTarget?.rfcMessageId || null,
        references: replyTarget?.references || null,
      })
      if (ok === true) resetForm()
    } finally {
      sendLockRef.current = false
      setLocalSending(false)
    }
  }

  const handleKeyDown = (e) => {
    if (usingHtmlTemplate) return
    if (e.key === 'Enter' && !e.shiftKey && scheduleMode === 'now') {
      if (e.target.tagName === 'INPUT') return
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <div className="border-t border-border bg-card/80 px-3 py-3 backdrop-blur-sm sm:px-4 sm:py-4">
      {replyTarget ? (
        <div className="mb-2 flex items-start gap-2 rounded-xl border border-[color:var(--studio-primary)]/25 bg-[color:var(--studio-primary-light)]/40 px-3 py-2">
          <div className="min-w-0 flex-1">
            <p className="text-[10px] font-semibold uppercase tracking-wide text-[color:var(--studio-primary)]">
              Replying in thread
            </p>
            <p className="truncate text-xs font-medium text-foreground">
              {replyTarget.subject?.trim() || '(No subject)'}
            </p>
          </div>
          {onClearReply ? (
            <button
              type="button"
              onClick={onClearReply}
              disabled={isBusy}
              className="shrink-0 rounded-md p-1 text-muted-foreground hover:bg-background hover:text-foreground disabled:opacity-50"
              aria-label="Start a new email instead"
              title="Start a new email"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          ) : null}
        </div>
      ) : null}
      <div className="mb-3">
        <input
          type="text"
          placeholder="Subject"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={isBusy}
          className={cn(
            'w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-sm font-medium',
            'placeholder:text-muted-foreground placeholder:font-normal',
            'focus:outline-none focus:ring-2 focus:ring-[color:var(--studio-primary)]/25 focus:border-[color:var(--studio-primary)]',
            'disabled:cursor-not-allowed disabled:opacity-50',
          )}
        />
      </div>

      <div
        className={cn(
          'overflow-hidden rounded-2xl border bg-background shadow-sm transition-shadow',
          'focus-within:border-[color:var(--studio-primary)]/50 focus-within:ring-2 focus-within:ring-[color:var(--studio-primary)]/15',
          scheduleMode === 'later' &&
            'border-[color:var(--studio-primary)]/40 ring-2 ring-[color:var(--studio-primary)]/20',
          usingHtmlTemplate && 'border-[color:var(--studio-primary)]/30',
        )}
      >
        {usingHtmlTemplate ? (
          <div>
            <div className="flex items-center gap-2.5 border-b border-border/80 bg-[color:var(--studio-primary-light)]/40 px-3 py-2">
              <div className="min-w-0 flex-1">
                <p className="text-[10px] font-medium uppercase tracking-wide text-[color:var(--studio-primary)]">
                  HTML template
                </p>
                <p className="truncate text-xs font-semibold text-foreground">
                  {selectedTemplate?.name || 'Selected template'}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setTemplatePickerOpen(true)}
                disabled={isBusy}
                className="shrink-0 rounded-md px-2 py-1 text-[11px] font-medium text-muted-foreground hover:bg-muted hover:text-foreground disabled:opacity-50"
              >
                Change
              </button>
              <button
                type="button"
                onClick={clearTemplate}
                disabled={isBusy}
                className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-md text-muted-foreground hover:bg-muted disabled:opacity-50"
                aria-label="Remove template"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </div>
            <div className="min-w-0 w-full overflow-hidden bg-white">
              <div className="min-w-0 overflow-hidden">
                <ScaledInboxHtmlEmail
                  html={contentHtml}
                  title={selectedTemplate?.name || 'Selected email template'}
                  minHeight={120}
                  maxHeight={240}
                />
              </div>
            </div>
          </div>
        ) : (
          <textarea
            ref={textareaRef}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={isBusy}
            rows={2}
            placeholder="Write your message…"
            className={cn(
              'w-full resize-none bg-transparent px-4 pb-2 pt-3.5 text-sm leading-relaxed text-foreground',
              'placeholder:text-muted-foreground focus:outline-none',
              'disabled:cursor-not-allowed disabled:opacity-50',
            )}
            style={{ minHeight: TEXTAREA_MIN_H, maxHeight: TEXTAREA_MAX_H }}
          />
        )}

        {scheduleMode === 'later' && (
          <div className="border-t border-border/60 px-3 pb-3 pt-0">
            <label className="flex flex-col gap-1.5 pt-3">
              <span className="text-xs font-medium text-muted-foreground">Send at</span>
              <input
                type="datetime-local"
                value={scheduleDate}
                min={minDateTime}
                onChange={(e) => setScheduleDate(e.target.value)}
                disabled={isBusy}
                className={cn(
                  'w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm',
                  'focus:outline-none focus:ring-2 focus:ring-[color:var(--studio-primary)]/30 focus:border-[color:var(--studio-primary)]',
                  'disabled:cursor-not-allowed disabled:opacity-50',
                )}
              />
            </label>
          </div>
        )}

        <div className="flex items-center justify-between gap-2 border-t border-border/80 px-2 py-2 sm:px-3">
          <div className="flex min-w-0 items-center gap-1.5">
            <button
              type="button"
              onClick={() => setTemplatePickerOpen(true)}
              disabled={isBusy}
              className={cn(
                'inline-flex shrink-0 items-center gap-1.5 rounded-lg border px-2.5 py-1.5 text-xs font-semibold transition-colors',
                usingHtmlTemplate
                  ? 'border-[color:var(--studio-primary)]/40 bg-[color:var(--studio-primary-light)] text-[color:var(--studio-primary)]'
                  : 'border-border bg-muted/40 text-foreground hover:bg-muted',
              )}
            >
              <LayoutTemplate className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">
                {usingHtmlTemplate ? 'Template' : 'Use template'}
              </span>
            </button>
            <button
              type="button"
              onClick={() => setScheduleMode((m) => (m === 'now' ? 'later' : 'now'))}
              disabled={isBusy}
              className={cn(
                'inline-flex shrink-0 items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-medium transition-colors',
                scheduleMode === 'later'
                  ? 'bg-[color:var(--studio-primary-light)] text-[color:var(--studio-primary)]'
                  : 'text-muted-foreground hover:bg-muted hover:text-foreground',
              )}
            >
              <CalendarClock className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">
                {scheduleMode === 'later' ? 'Scheduled' : 'Schedule'}
              </span>
            </button>
            {usingHtmlTemplate && !subject.trim() && (
              <span className="hidden text-[11px] text-amber-600 sm:inline dark:text-amber-400">
                Subject required
              </span>
            )}
          </div>

          <div className="flex shrink-0 items-center gap-2">
            {!usingHtmlTemplate && (
              <span className="hidden whitespace-nowrap text-[10px] text-muted-foreground md:inline">
                Enter to send · Shift+Enter new line
              </span>
            )}
            <Button
              type="button"
              variant="gradient"
              size="sm"
              onClick={handleSend}
              disabled={!canSend}
              className="h-9 min-w-[88px] gap-1.5 rounded-xl px-4 font-semibold shadow-sm"
            >
              <Send className="h-4 w-4" />
              <span className="hidden sm:inline">
                {isBusy ? 'Sending…' : scheduleMode === 'later' ? 'Schedule' : 'Send'}
              </span>
              <span className="sm:hidden">{isBusy ? '…' : 'Go'}</span>
            </Button>
          </div>
        </div>
      </div>

      <WorkflowEmailTemplatePickerDialog
        open={templatePickerOpen}
        onClose={() => setTemplatePickerOpen(false)}
        selectedId={selectedTemplate?.id || ''}
        description="Pick a designed email from Email Builder to send in this conversation."
        onSelect={handleTemplateSelect}
      />
    </div>
  )
}

function SmsComposer({ onSendMessage, disabled = false, sending = false }) {
  const toast = useToast()
  const [message, setMessage] = useState('')
  const [scheduleMode, setScheduleMode] = useState('now')
  const [scheduleDate, setScheduleDate] = useState('')
  const [selectedTemplate, setSelectedTemplate] = useState(null)
  const [templatePickerOpen, setTemplatePickerOpen] = useState(false)
  const [localSending, setLocalSending] = useState(false)
  const sendLockRef = useRef(false)

  const { ref: textareaRef, resize } = useAutoResizeTextarea(message)
  const charCount = message.length
  const smsSegments = Math.max(1, Math.ceil(charCount / 160) || 1)
  const isBusy = disabled || sending || localSending

  const canSend =
    !isBusy &&
    message.trim() &&
    (scheduleMode === 'now' || !!scheduleDate)

  const minDateTime = getScheduleMinLocalDatetime()

  const resetForm = () => {
    setMessage('')
    setScheduleMode('now')
    setScheduleDate('')
    setSelectedTemplate(null)
    requestAnimationFrame(resize)
  }

  const clearTemplate = () => setSelectedTemplate(null)

  const handleTemplateSelect = (tpl) => {
    const script = String(tpl.script || '').trim()
    if (!script) {
      toast.error({
        title: 'Template unavailable',
        message: 'This SMS template has no message content.',
      })
      return
    }
    setMessage(script)
    setSelectedTemplate({
      id: tpl.smsTemplateId,
      name: tpl.smsTemplateName || 'SMS template',
    })
  }

  const handleMessageChange = (e) => {
    const next = e.target.value
    setMessage(next)
    if (selectedTemplate && !next.trim()) setSelectedTemplate(null)
  }

  const handleSend = async () => {
    if (!canSend || sendLockRef.current) return
    const scheduleIso =
      scheduleMode === 'later'
        ? toScheduleIsoOrNull(scheduleDate, { requireFuture: true })
        : null
    if (scheduleMode === 'later' && !scheduleIso) {
      toast.error({
        title: 'Invalid schedule time',
        message: 'Please pick a valid future date and time.',
      })
      return
    }

    sendLockRef.current = true
    setLocalSending(true)
    try {
      const ok = await onSendMessage?.({
        content: message,
        contentHtml: null,
        subject: '',
        channel: 'SMS',
        scheduleNow: scheduleMode === 'now',
        scheduleDate: scheduleIso,
      })
      if (ok === true) resetForm()
    } finally {
      sendLockRef.current = false
      setLocalSending(false)
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey && scheduleMode === 'now') {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <div className="border-t border-border bg-card/80 px-3 py-3 backdrop-blur-sm sm:px-4 sm:py-4">
      <div
        className={cn(
          'overflow-hidden rounded-2xl border bg-background shadow-sm transition-shadow',
          'focus-within:border-[color:var(--studio-primary)]/50 focus-within:ring-2 focus-within:ring-[color:var(--studio-primary)]/15',
          scheduleMode === 'later' &&
            'border-[color:var(--studio-primary)]/40 ring-2 ring-[color:var(--studio-primary)]/20',
        )}
      >
        {selectedTemplate && (
          <div className="flex items-center gap-2 border-b border-border/70 bg-muted/40 px-3 py-2">
            <LayoutTemplate className="h-3.5 w-3.5 shrink-0 text-[color:var(--studio-primary)]" />
            <p className="min-w-0 flex-1 truncate text-xs font-medium text-foreground">
              SMS template: {selectedTemplate.name}
            </p>
            <button
              type="button"
              onClick={clearTemplate}
              disabled={isBusy}
              className="inline-flex h-6 w-6 items-center justify-center rounded-md text-muted-foreground hover:bg-background disabled:opacity-50"
              aria-label="Clear template"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </div>
        )}

        <textarea
          ref={textareaRef}
          value={message}
          onChange={handleMessageChange}
          onKeyDown={handleKeyDown}
          disabled={isBusy}
          rows={2}
          placeholder="Type a message…"
          className={cn(
            'w-full resize-none bg-transparent px-4 pb-2 pt-3.5 text-sm leading-relaxed text-foreground',
            'placeholder:text-muted-foreground focus:outline-none',
            'disabled:cursor-not-allowed disabled:opacity-50',
          )}
          style={{ minHeight: TEXTAREA_MIN_H, maxHeight: TEXTAREA_MAX_H }}
        />

        {scheduleMode === 'later' && (
          <div className="border-t border-border/60 px-3 pb-3 pt-0">
            <label className="flex flex-col gap-1.5 pt-3">
              <span className="text-xs font-medium text-muted-foreground">Send at</span>
              <input
                type="datetime-local"
                value={scheduleDate}
                min={minDateTime}
                onChange={(e) => setScheduleDate(e.target.value)}
                disabled={isBusy}
                className={cn(
                  'w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm',
                  'focus:outline-none focus:ring-2 focus:ring-[color:var(--studio-primary)]/30 focus:border-[color:var(--studio-primary)]',
                  'disabled:cursor-not-allowed disabled:opacity-50',
                )}
              />
            </label>
          </div>
        )}

        <div className="flex items-center justify-between gap-2 border-t border-border/80 px-2 py-2 sm:px-3">
          <div className="flex min-w-0 items-center gap-1.5">
            <button
              type="button"
              onClick={() => setTemplatePickerOpen(true)}
              disabled={isBusy}
              className={cn(
                'inline-flex shrink-0 items-center gap-1.5 rounded-lg border px-2.5 py-1.5 text-xs font-semibold transition-colors',
                selectedTemplate
                  ? 'border-[color:var(--studio-primary)]/40 bg-[color:var(--studio-primary-light)] text-[color:var(--studio-primary)]'
                  : 'border-border bg-muted/40 text-foreground hover:bg-muted',
              )}
            >
              <LayoutTemplate className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">
                {selectedTemplate ? 'Templates' : 'Use template'}
              </span>
            </button>
            <button
              type="button"
              onClick={() => setScheduleMode((m) => (m === 'now' ? 'later' : 'now'))}
              disabled={isBusy}
              className={cn(
                'inline-flex shrink-0 items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-medium transition-colors',
                scheduleMode === 'later'
                  ? 'bg-[color:var(--studio-primary-light)] text-[color:var(--studio-primary)]'
                  : 'text-muted-foreground hover:bg-muted hover:text-foreground',
              )}
            >
              <CalendarClock className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">
                {scheduleMode === 'later' ? 'Scheduled' : 'Schedule'}
              </span>
            </button>
            {charCount > 0 && (
              <span
                className={cn(
                  'hidden truncate text-[11px] tabular-nums sm:inline',
                  charCount > 160 ? 'text-amber-600 dark:text-amber-400' : 'text-muted-foreground',
                )}
              >
                {charCount} chars · {smsSegments} segment{smsSegments > 1 ? 's' : ''}
              </span>
            )}
          </div>

          <div className="flex shrink-0 items-center gap-2">
            <span className="hidden whitespace-nowrap text-[10px] text-muted-foreground md:inline">
              Enter to send · Shift+Enter new line
            </span>
            <Button
              type="button"
              variant="gradient"
              size="sm"
              onClick={handleSend}
              disabled={!canSend}
              className="h-9 min-w-[88px] gap-1.5 rounded-xl px-4 font-semibold shadow-sm"
            >
              <Send className="h-4 w-4" />
              <span className="hidden sm:inline">
                {isBusy ? 'Sending…' : scheduleMode === 'later' ? 'Schedule' : 'Send'}
              </span>
              <span className="sm:hidden">{isBusy ? '…' : 'Go'}</span>
            </Button>
          </div>
        </div>
      </div>

      <WorkflowSmsTemplatePickerDialog
        open={templatePickerOpen}
        onClose={() => setTemplatePickerOpen(false)}
        selectedId={selectedTemplate?.id || ''}
        description="Pick an SMS from SMS Builder. The message fills the composer so you can edit before sending."
        onSelect={handleTemplateSelect}
      />
    </div>
  )
}

export default function ConversationComposer({
  variant = 'sms',
  onSendMessage,
  disabled = false,
  sending = false,
  replyTarget = null,
  onClearReply = null,
}) {
  if (variant === 'email') {
    return (
      <EmailComposer
        onSendMessage={onSendMessage}
        disabled={disabled}
        sending={sending}
        replyTarget={replyTarget}
        onClearReply={onClearReply}
      />
    )
  }

  return (
    <SmsComposer
      onSendMessage={onSendMessage}
      disabled={disabled}
      sending={sending}
    />
  )
}
