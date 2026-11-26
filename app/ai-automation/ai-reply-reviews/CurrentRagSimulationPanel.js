'use client'

import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Select } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import api from '@/lib/api'
import { getCurrentUser, getEffectiveBranch, getUserLocations, setSelectedBranch } from '@/lib/auth'
import { isSuperAdmin } from '@/lib/permissions'
import { ConversationEditor, useConversationMessages } from './ReviewCaseForms'

const LIVE_TOOL_LABELS = {
  availability: 'availability',
  booking: 'booking',
  payment: 'payment',
  lesson_management: 'lesson management',
}

function RetrievedSources({ sources, unavailable }) {
  const items = Array.isArray(sources) ? sources : []

  return (
    <section className="space-y-3" aria-label="Retrieved sources">
      <h3 className="text-sm font-semibold">Retrieved knowledge and examples</h3>
      {unavailable && items.length === 0 && <p className="text-sm text-muted-foreground">Sources are unavailable because retrieval failed.</p>}
      {items.length === 0 && !unavailable && <p className="text-sm text-muted-foreground">No matching sources were selected for this message.</p>}
      <ol className="space-y-3">
        {items.map((source) => (
          <li key={`${source.type}-${source.sourceID || source.sourceName || 'source'}-${source.chunkIndex ?? 'whole'}-${source.text}`} className="rounded-lg border border-border bg-muted/20 p-3">
            <p className="text-sm font-semibold">{source.sourceName || source.type || 'Source'} <span className="font-normal text-muted-foreground">({source.type || 'knowledge'}{source.chunkIndex == null ? '' : `, chunk ${source.chunkIndex}`})</span></p>
            <p className="mt-2 whitespace-pre-wrap break-words text-sm">{source.text}</p>
          </li>
        ))}
      </ol>
    </section>
  )
}

function SimulationResult({ preview, onSendToReview }) {
  const { data, input } = preview
  const toolNeed = LIVE_TOOL_LABELS[data.liveToolNeed]

  return (
    <section className="space-y-4 rounded-xl border border-border bg-card p-4 shadow-sm" aria-label="Simulation result">
      <h2 className="text-lg font-semibold">Simulation result</h2>
      {data.retrievalUnavailable && <p role="alert" className="rounded-lg border border-destructive p-3 text-sm text-destructive">Knowledge retrieval failed. This answer is not a successful test of the studio’s current RAG knowledge.</p>}
      {toolNeed && <p role="note" className="rounded-lg border border-border bg-muted/30 p-3 text-sm">This message may need live {toolNeed} tools. This is an advisory label; the preview does not run those tools.</p>}
      <p className="text-sm text-muted-foreground">{data.limitation || 'No SMS, booking, payment, availability, or customer update is performed.'}</p>
      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded-lg border border-border p-3">
          <h3 className="text-sm font-semibold">First agent reply</h3>
          <p className="mt-2 whitespace-pre-wrap break-words text-sm">{data.firstDraft}</p>
        </div>
        <div className="rounded-lg border border-border p-3">
          <h3 className="text-sm font-semibold">Final reply</h3>
          <p className="mt-2 whitespace-pre-wrap break-words text-sm">{data.finalReply}</p>
        </div>
      </div>
      {data.reviewersRun && (
        <dl className="grid gap-3 text-sm sm:grid-cols-2">
          <div><dt className="font-semibold">History review</dt><dd>{data.decisions?.history || 'Unavailable'}</dd></div>
          <div><dt className="font-semibold">Prompt and knowledge review</dt><dd>{data.decisions?.conflict || 'Unavailable'}</dd></div>
        </dl>
      )}
      <RetrievedSources sources={data.retrievedSources} unavailable={data.retrievalUnavailable} />
      <Button type="button" variant="outline" onClick={() => onSendToReview({
        customerMessage: input.customerMessage,
        originalReply: data.finalReply,
        priorMessages: input.priorMessages,
      })}>Send to review</Button>
      <p className="text-xs text-muted-foreground">The manual case form will require a reason and correct reply. Team approval is required before this enters RAG.</p>
    </section>
  )
}

export default function CurrentRagSimulationPanel({ canWrite, onSendToReview }) {
  const [studios, setStudios] = useState([])
  const [selectedStudio, setSelectedStudio] = useState('')
  const [studioError, setStudioError] = useState('')
  const [customerMessage, setCustomerMessage] = useState('')
  const [runReviewers, setRunReviewers] = useState(true)
  const [running, setRunning] = useState(false)
  const [error, setError] = useState('')
  const [preview, setPreview] = useState(null)
  const conversation = useConversationMessages()

  useEffect(() => {
    if (!canWrite) return
    let active = true
    setSelectedStudio(getEffectiveBranch() || '')
    api.get('/api/location?limit=200').then((result) => {
      if (!active) return
      if (!result.success || !Array.isArray(result.data)) {
        setStudioError(result.error || 'Could not load studios.')
        return
      }
      const assigned = new Set(getUserLocations(getCurrentUser()).map((location) => location._id))
      const available = result.data.filter((location) =>
        location.status?.toLowerCase() === 'active' && (isSuperAdmin() || assigned.has(location._id)))
      setStudios(available)
    })
    return () => { active = false }
  }, [canWrite])

  const selectStudio = (studioId) => {
    if (studioId === selectedStudio) return
    setSelectedStudio(studioId)
    setSelectedBranch(studioId || null)
    setPreview(null)
  }

  const run = async (event) => {
    event.preventDefault()
    if (!canWrite || !selectedStudio || !customerMessage.trim() || running) return
    if (conversation.messages.some((message) => !message.text.trim())) return
    const input = {
      customerMessage: customerMessage.trim(),
      priorMessages: conversation.messages.map(({ role, text }) => ({ role, text: text.trim() })),
      runReviewers,
    }
    setRunning(true)
    setError('')
    setPreview(null)
    const result = await api.post('/api/sms-reply-reviews/simulate/current', input)
    setRunning(false)
    if (!result.success) {
      setError(result.error || 'Simulation failed.')
      return
    }
    setPreview({ data: result.data, input })
  }

  if (!canWrite) return <p className="text-sm text-muted-foreground">Training write access is required to run a simulation.</p>

  return (
    <div className="space-y-4">
      <form onSubmit={run} className="space-y-4 rounded-xl border border-border bg-card p-4 shadow-sm">
        <div>
          <h2 className="text-lg font-semibold">Current studio RAG simulation</h2>
          <p className="text-sm text-muted-foreground">Preview the selected studio’s active SMS prompt and current knowledge. No customer is contacted and no live tools run.</p>
        </div>
        <div className="space-y-1">
          <label htmlFor="simulation-studio" className="block text-sm font-semibold">Studio</label>
          <Select id="simulation-studio" value={selectedStudio} onChange={(event) => selectStudio(event.target.value)} disabled={running} required>
            <option value="">Select a studio</option>
            {studios.map((studio) => <option key={studio._id} value={studio._id}>{studio.name}</option>)}
          </Select>
          <p className="text-xs text-muted-foreground">Changing studios updates the app’s selected studio and reloads this page.</p>
          {studioError && <p role="alert" className="text-sm text-destructive">{studioError}</p>}
        </div>
        <div className="space-y-1">
          <label htmlFor="simulation-customer" className="block text-sm font-semibold">Customer message</label>
          <Textarea id="simulation-customer" value={customerMessage} onChange={(event) => setCustomerMessage(event.target.value)} disabled={running} maxLength={2000} required rows={3} />
        </div>
        <ConversationEditor messages={conversation.messages} onAdd={conversation.addMessage} onUpdate={conversation.updateMessage} onRemove={conversation.removeMessage} disabled={running} prefix="simulation" />
        <label htmlFor="simulation-reviewers" className="flex items-center gap-2 text-sm font-medium">
          <input id="simulation-reviewers" type="checkbox" checked={runReviewers} onChange={(event) => setRunReviewers(event.target.checked)} disabled={running} className="h-4 w-4 accent-primary" />
          Run reply reviewers
        </label>
        <Button type="submit" disabled={running || !selectedStudio}>{running ? 'Running simulation…' : 'Run simulation'}</Button>
        {running && <p role="status" className="text-sm text-muted-foreground">Generating a reply with the current studio knowledge…</p>}
        {error && <p role="alert" className="text-sm text-destructive">{error}</p>}
      </form>
      {preview && <SimulationResult preview={preview} onSendToReview={onSendToReview} />}
    </div>
  )
}
