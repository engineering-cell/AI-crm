'use client'

import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { clonedConversationApi } from '@/lib/clonedConversationApi'

const BASE_PATH = '/api/sms-reply-reviews/live'
const PAGE_SIZE = 20

function conversationPath(studioId, inboundId) {
  const query = new URLSearchParams({ sourceLocationID: studioId })
  return `${BASE_PATH}/conversations/${encodeURIComponent(inboundId)}?${query}`
}

function reviewPath(studioId, inboundId) {
  const query = new URLSearchParams({ sourceLocationID: studioId })
  return `${BASE_PATH}/conversations/${encodeURIComponent(inboundId)}/review?${query}`
}

function formatDate(value) {
  if (!value) return '—'
  const date = new Date(value)
  return Number.isNaN(date.getTime()) ? '—' : date.toLocaleString()
}

function ConversationText({ label, text, date }) {
  return (
    <div className="space-y-1 rounded-lg border border-border bg-muted/20 p-3">
      <h3 className="text-sm font-semibold">{label}</h3>
      <p className="whitespace-pre-wrap break-words text-sm">{text || 'No matched sent SMS.'}</p>
      {date && <p className="text-xs text-muted-foreground">{formatDate(date)}</p>}
    </div>
  )
}

function ConversationList({ conversations, selectedId, onSelect, disabled }) {
  if (conversations.length === 0) {
    return <p className="p-4 text-sm text-muted-foreground">No cloned inbound conversations were found for this studio.</p>
  }

  return (
    <ul className="divide-y divide-border">
      {conversations.map((conversation) => (
        <li key={conversation.inboundID}>
          <button type="button" disabled={disabled} aria-current={selectedId === conversation.inboundID ? 'true' : undefined}
            onClick={() => onSelect(conversation.inboundID)}
            className={`w-full space-y-1 p-4 text-left hover:bg-muted/40 disabled:cursor-wait ${selectedId === conversation.inboundID ? 'bg-muted/50' : ''}`}>
            <p className="line-clamp-2 text-sm font-medium">{conversation.customerMessage || 'Empty customer message'}</p>
            <p className="text-xs text-muted-foreground">{formatDate(conversation.customerMessageAt)} · {conversation.canReview ? 'Matched sent SMS' : 'No matched sent SMS'}</p>
          </button>
        </li>
      ))}
    </ul>
  )
}

function ReviewOutcome({ outcome, onOpenCases }) {
  if (!outcome) return null
  if (outcome.status === 'unavailable') {
    return <p role="status" className="rounded-lg border border-amber-300 p-3 text-sm">The review could not complete, so no case was created. Try again when the reviewers are available.</p>
  }

  const cases = Array.isArray(outcome.cases) ? outcome.cases : []
  return (
    <div role="status" className="space-y-2 rounded-lg border border-border p-3 text-sm">
      <p className="font-medium">{outcome.alreadyReviewed ? 'This conversation was already reviewed.' : 'Review complete.'}</p>
      {cases.length === 0 && <p>No review case was created.</p>}
      {outcome.decisions && (
        <p>History: {outcome.decisions.history || '—'} · Prompt and knowledge: {outcome.decisions.conflict || '—'}</p>
      )}
      {cases.map((reviewCase) => (
        <p key={reviewCase._id}>Case status: <span className="font-semibold capitalize">{reviewCase.status}</span></p>
      ))}
      {cases.some((reviewCase) => reviewCase.sourceKnowledgeUnavailable) && (
        <p className="text-amber-700">Knowledge retrieval was unavailable during this review. The result does not verify the production agent’s original knowledge.</p>
      )}
      {cases.length > 0 && <Button type="button" size="sm" variant="outline" onClick={() => onOpenCases(cases[0].status)}>Open review cases</Button>}
    </div>
  )
}

function ConversationDetail({ conversation, canWrite, reviewing, reviewError, outcome, onReview, onOpenCases }) {
  return (
    <article className="space-y-4 rounded-xl border border-border bg-card p-4 shadow-sm">
      <div>
        <h2 className="text-lg font-semibold">Conversation</h2>
        <p className="text-xs text-muted-foreground">{conversation.studioName} · {formatDate(conversation.customerMessageAt)}</p>
      </div>
      {conversation.priorMessages?.length > 0 && (
        <section className="space-y-2">
          <h3 className="text-sm font-semibold">Earlier conversation</h3>
          <ol className="space-y-2">
            {conversation.priorMessages.map((message, index) => (
              <li key={`${index}-${message.role}`} className="rounded-lg border border-border bg-muted/20 p-3 text-sm">
                <span className="font-semibold">{message.role === 'customer' ? 'Customer' : 'Agent'}</span>
                <p className="whitespace-pre-wrap break-words">{message.text}</p>
              </li>
            ))}
          </ol>
        </section>
      )}
      <ConversationText label="Customer message" text={conversation.customerMessage} date={conversation.customerMessageAt} />
      <ConversationText label="Matched sent SMS (author unverified)" text={conversation.sentReply} date={conversation.sentReplyAt} />
      <p className="text-xs text-muted-foreground">The sent SMS may have been written by the agent or by staff. Review uses this sent text and does not contact the customer.</p>
      {!conversation.canReview && <p className="text-sm text-muted-foreground">A review needs a matched sent SMS for this message.</p>}
      {conversation.canReview && canWrite && (
        <Button type="button" disabled={reviewing} onClick={onReview}>{reviewing ? 'Running review…' : 'Run review'}</Button>
      )}
      {conversation.canReview && !canWrite && <p className="text-sm text-muted-foreground">Write access is required to run a review.</p>}
      {reviewError && <p role="alert" className="text-sm text-destructive">{reviewError}</p>}
      <ReviewOutcome outcome={outcome} onOpenCases={onOpenCases} />
    </article>
  )
}

export default function ClonedConversationsPanel({ canRead, canWrite, onCasesCreated, onOpenCases }) {
  const [studios, setStudios] = useState([])
  const [studioId, setStudioId] = useState('')
  const [studioError, setStudioError] = useState('')
  const [studiosLoading, setStudiosLoading] = useState(false)
  const [conversations, setConversations] = useState([])
  const [total, setTotal] = useState(0)
  const [page, setPage] = useState(1)
  const [listError, setListError] = useState('')
  const [listLoading, setListLoading] = useState(false)
  const [selectedId, setSelectedId] = useState('')
  const [detail, setDetail] = useState(null)
  const [detailError, setDetailError] = useState('')
  const [detailLoading, setDetailLoading] = useState(false)
  const [reviewing, setReviewing] = useState(false)
  const [reviewError, setReviewError] = useState('')
  const [outcome, setOutcome] = useState(null)

  useEffect(() => {
    if (!canRead) return
    let active = true
    const load = async () => {
      setStudiosLoading(true)
      setStudioError('')
      const result = await clonedConversationApi.get(`${BASE_PATH}/studios`)
      if (!active) return
      setStudiosLoading(false)
      if (!result.success) {
        setStudioError(result.error || 'Could not load training studios.')
        return
      }
      const mapped = Array.isArray(result.data?.studios) ? result.data.studios : []
      setStudios(mapped)
      setStudioId((current) => mapped.some((studio) => studio.id === current) ? current : mapped[0]?.id || '')
    }
    load()
    return () => { active = false }
  }, [canRead])

  useEffect(() => {
    if (!canRead || !studioId) return
    let active = true
    const load = async () => {
      setListLoading(true)
      setListError('')
      const query = new URLSearchParams({ sourceLocationID: studioId, page: String(page), limit: String(PAGE_SIZE) })
      const result = await clonedConversationApi.get(`${BASE_PATH}/conversations?${query}`)
      if (!active) return
      setListLoading(false)
      if (!result.success) {
        setListError(result.error || 'Could not load cloned conversations.')
        setConversations([])
        setSelectedId('')
        return
      }
      const rows = Array.isArray(result.data?.conversations) ? result.data.conversations : []
      setConversations(rows)
      setTotal(Number(result.data?.total) || 0)
      setSelectedId((current) => rows.some((row) => row.inboundID === current) ? current : rows[0]?.inboundID || '')
    }
    load()
    return () => { active = false }
  }, [canRead, studioId, page])

  useEffect(() => {
    if (!canRead || !studioId || !selectedId) {
      setDetail(null)
      setDetailError('')
      setDetailLoading(false)
      return
    }
    let active = true
    const load = async () => {
      setDetail(null)
      setDetailError('')
      setOutcome(null)
      setReviewError('')
      setDetailLoading(true)
      const result = await clonedConversationApi.get(conversationPath(studioId, selectedId))
      if (!active) return
      setDetailLoading(false)
      if (result.success) setDetail(result.data)
      else setDetailError(result.error || 'Could not load this conversation.')
    }
    load()
    return () => { active = false }
  }, [canRead, studioId, selectedId])

  const selectStudio = (nextStudioId) => {
    setStudioId(nextStudioId)
    setPage(1)
    setSelectedId('')
    setConversations([])
    setTotal(0)
    setDetail(null)
    setOutcome(null)
  }

  const changePage = (nextPage) => {
    setPage(nextPage)
    setSelectedId('')
    setDetail(null)
    setOutcome(null)
  }

  const runReview = async () => {
    if (!canWrite || !detail?.canReview || reviewing) return
    setReviewing(true)
    setReviewError('')
    setOutcome(null)
    const result = await clonedConversationApi.post(reviewPath(studioId, detail.inboundID))
    setReviewing(false)
    if (!result.success) {
      setReviewError(result.error || 'Could not run the review.')
      return
    }
    setOutcome(result.data)
    if (result.data?.cases?.length) onCasesCreated()
  }

  if (!canRead) return <p className="text-sm text-muted-foreground">Read access is required to view cloned conversations.</p>

  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE))
  const studioGroups = studios.reduce((groups, studio) => {
    const organisation = studio.organisationName || 'Organisation'
    if (!groups[organisation]) groups[organisation] = []
    groups[organisation].push(studio)
    return groups
  }, {})
  return (
    <section className="space-y-4" aria-label="Cloned conversations">
      <div>
        <h2 className="text-xl font-semibold">Cloned conversations</h2>
        <p className="text-sm text-muted-foreground">Browse historical inbound SMS and review a matched sent reply. A completed review creates a case in Passed or Pending. No SMS is sent.</p>
      </div>
      <div className="space-y-2 rounded-xl border border-border bg-card p-4">
        <label htmlFor="cloned-studio" className="block text-sm font-semibold">Cloned studio</label>
        <select id="cloned-studio" value={studioId} onChange={(event) => selectStudio(event.target.value)} disabled={studiosLoading || reviewing || studios.length === 0}
          className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm">
          {studios.length === 0 && <option value="">Select a studio</option>}
          {Object.entries(studioGroups).map(([organisation, options]) => (
            <optgroup key={organisation} label={organisation}>
              {options.map((studio) => <option key={studio.id} value={studio.id}>{studio.name}</option>)}
            </optgroup>
          ))}
        </select>
        {studiosLoading && <p className="text-sm text-muted-foreground">Loading studios…</p>}
        {studioError && <p role="alert" className="text-sm text-destructive">{studioError}</p>}
        {!studiosLoading && !studioError && studios.length === 0 && <p className="text-sm text-muted-foreground">No studios are available for this account.</p>}
      </div>
      {studioId && (
        <div className="grid gap-4 lg:grid-cols-[minmax(260px,350px)_minmax(0,1fr)]">
          <div className="self-start overflow-hidden rounded-xl border border-border bg-card shadow-sm">
            <div className="border-b border-border p-4 text-sm font-semibold">Inbound messages · {total.toLocaleString()}</div>
            {listError && <p role="alert" className="p-4 text-sm text-destructive">{listError}</p>}
            {listLoading ? <p className="p-4 text-sm text-muted-foreground">Loading conversations…</p> : !listError && (
              <ConversationList conversations={conversations} selectedId={selectedId} onSelect={setSelectedId} disabled={reviewing} />
            )}
            {!listLoading && !listError && totalPages > 1 && (
              <div className="flex items-center justify-between gap-2 border-t border-border p-3 text-sm">
                <Button type="button" size="sm" variant="outline" disabled={page <= 1 || reviewing} onClick={() => changePage(page - 1)}>Previous</Button>
                <span>Page {page} of {totalPages}</span>
                <Button type="button" size="sm" variant="outline" disabled={page >= totalPages || reviewing} onClick={() => changePage(page + 1)}>Next</Button>
              </div>
            )}
          </div>
          <div aria-live="polite">
            {detailLoading && <p className="p-4 text-sm text-muted-foreground">Loading conversation…</p>}
            {detailError && <p role="alert" className="p-4 text-sm text-destructive">{detailError}</p>}
            {!detailLoading && detail && <ConversationDetail conversation={detail} canWrite={canWrite} reviewing={reviewing}
              reviewError={reviewError} outcome={outcome} onReview={runReview} onOpenCases={onOpenCases} />}
          </div>
        </div>
      )}
    </section>
  )
}
