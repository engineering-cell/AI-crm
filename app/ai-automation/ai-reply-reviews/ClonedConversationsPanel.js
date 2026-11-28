'use client'

import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { clonedConversationApi } from '@/lib/clonedConversationApi'

const BASE_PATH = '/api/sms-reply-reviews/live'
const PAGE_SIZE = 20
const REVIEW_CHECKS = [
  { key: 'history', label: 'History' },
  { key: 'conflicts', label: 'Conflicts' },
  { key: 'tools', label: 'Tool results' },
]
const CHECK_STATUS_LABELS = { pass: 'Pass', fail: 'Fail', unverifiable: 'Unable to verify' }

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

function ConversationList({ conversations, selectedId, onSelect, disabled, search }) {
  if (conversations.length === 0) {
    return <p className="p-4 text-sm text-muted-foreground">{search ? 'No conversations match this name or phone number.' : 'No cloned conversations were found for this studio.'}</p>
  }

  return (
    <ul className="divide-y divide-border">
      {conversations.map((conversation) => (
        <li key={conversation.inboundID}>
          <button type="button" disabled={disabled} aria-current={selectedId === conversation.inboundID ? 'true' : undefined}
            onClick={() => onSelect(conversation.inboundID)}
            className={`w-full space-y-1 p-4 text-left hover:bg-muted/40 disabled:cursor-wait ${selectedId === conversation.inboundID ? 'bg-muted/50' : ''}`}>
            <p className="text-sm font-semibold">{conversation.customerName || conversation.customerPhone}</p>
            {conversation.customerName && <p className="text-xs text-muted-foreground">{conversation.customerPhone}</p>}
            <p className="line-clamp-2 text-sm font-medium">{conversation.customerMessage || 'Empty customer message'}</p>
            <p className="text-xs text-muted-foreground">{formatDate(conversation.customerMessageAt)} · {conversation.messageCount} customer messages</p>
          </button>
        </li>
      ))}
    </ul>
  )
}

function ReviewOutcome({ outcome, onOpenCases }) {
  if (!outcome) return null
  const reviewCase = outcome.cases?.[0]
  const checks = outcome.reviewChecks || reviewCase?.reviewChecks
  const checkReasons = outcome.reviewCheckReasons || reviewCase?.reviewCheckReasons
  const passed = outcome.status === 'passed' || reviewCase?.status === 'passed'
  if (!checks && !reviewCase && !outcome.status) return null
  return (
    <div role="status" className="space-y-2 rounded-lg border border-border p-3 text-sm">
      {checks && (
        <dl className="space-y-2">
          {REVIEW_CHECKS.map(({ key, label }) => (
            <div key={key} className="flex flex-wrap gap-x-2">
              <dt className="font-medium">{label}:</dt>
              <dd>{CHECK_STATUS_LABELS[checks[key]] || 'Not checked'}</dd>
            </div>
          ))}
        </dl>
      )}
      {checks?.tools === 'unverifiable' && checkReasons?.tools && (
        <p className="text-amber-700">Tool results: {checkReasons.tools}</p>
      )}
      {passed && <p>No issues found in this conversation.</p>}
      {outcome.status === 'error' && (
        <p className="text-destructive">The conversation review could not finish. {outcome.reason || 'Please try again.'} You can retry the review.</p>
      )}
      {outcome.status === 'unverifiable' && (
        <p className="text-amber-700">The tool results could not be verified, so the conversation review is incomplete.</p>
      )}
      {outcome.status === 'unavailable' && <p className="text-amber-700">The conversation review could not be completed. {outcome.reason || 'Please try again.'}</p>}
      {reviewCase && !passed && <p>One case covers the issues found in this conversation.</p>}
      {outcome.status === 'fail' && !reviewCase && <p className="text-destructive">Issues were found, but no case was returned. Please retry the review.</p>}
      {reviewCase && <Button type="button" size="sm" variant="outline" onClick={() => onOpenCases(reviewCase.status)}>
        Open review case
      </Button>}
    </div>
  )
}

function ConversationDetail({ conversation, canWrite, reviewing, outcome, onReview, onOpenCases }) {
  const hasAgentMessage = conversation.messages?.some((message) => message.role === 'agent')
  return (
    <article className="space-y-4 rounded-xl border border-border bg-card p-4 shadow-sm">
      <div>
        <h2 className="text-lg font-semibold">Conversation with {conversation.customerPhone}</h2>
        <p className="text-xs text-muted-foreground">{conversation.studioName}</p>
      </div>
      <ol className="space-y-2">
        {conversation.messages?.map((message) => (
          <li key={message.id} className="space-y-2 rounded-lg border border-border bg-muted/20 p-3 text-sm">
            <span className="font-semibold">{message.role === 'customer' ? 'Customer' : 'Agent'}</span>
            <p className="whitespace-pre-wrap break-words">{message.text}</p>
            <p className="text-xs text-muted-foreground">{formatDate(message.createdAt)}</p>
          </li>
        ))}
      </ol>
      <p className="text-xs text-muted-foreground">Sent SMS may have been written by the agent or by staff. Reviewing does not contact the customer.</p>
      {!hasAgentMessage && <p className="text-sm text-muted-foreground">This conversation has no sent agent messages to review.</p>}
      {canWrite && hasAgentMessage && (
        <Button type="button" disabled={reviewing} onClick={onReview}>
          {reviewing ? 'Reviewing conversation...' : 'Review conversation'}
        </Button>
      )}
      {!canWrite && <p className="text-sm text-muted-foreground">Write access is required to run a review.</p>}
      <ReviewOutcome outcome={outcome} onOpenCases={onOpenCases} />
    </article>
  )
}

export default function ClonedConversationsPanel({ canRead, canWrite, focusConversation, onCasesCreated, onOpenCases }) {
  const [studios, setStudios] = useState([])
  const [studioId, setStudioId] = useState('')
  const [studioError, setStudioError] = useState('')
  const [studiosLoading, setStudiosLoading] = useState(false)
  const [conversations, setConversations] = useState([])
  const [total, setTotal] = useState(0)
  const [page, setPage] = useState(1)
  const [searchInput, setSearchInput] = useState('')
  const [search, setSearch] = useState('')
  const [listError, setListError] = useState('')
  const [listLoading, setListLoading] = useState(false)
  const [selectedId, setSelectedId] = useState('')
  const [detail, setDetail] = useState(null)
  const [detailError, setDetailError] = useState('')
  const [detailLoading, setDetailLoading] = useState(false)
  const [reviewing, setReviewing] = useState(false)
  const [outcome, setOutcome] = useState(null)

  useEffect(() => {
    const timer = setTimeout(() => setSearch(searchInput.trim()), 300)
    return () => clearTimeout(timer)
  }, [searchInput])

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
      setStudioId((current) => mapped.some((studio) => studio.id === current) ? current
        : mapped.some((studio) => studio.id === focusConversation?.studioId) ? focusConversation.studioId
          : mapped[0]?.id || '')
    }
    load()
    return () => { active = false }
  }, [canRead, focusConversation])

  useEffect(() => {
    if (!focusConversation?.studioId || !focusConversation?.inboundId) return
    setStudioId(focusConversation.studioId)
    setSelectedId(focusConversation.inboundId)
  }, [focusConversation])

  useEffect(() => {
    if (!canRead || !studioId || searchInput.trim() !== search) return
    let active = true
    const load = async () => {
      setListLoading(true)
      setListError('')
      const query = new URLSearchParams({ sourceLocationID: studioId, page: String(page),
        limit: String(PAGE_SIZE), search })
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
      setSelectedId((current) => rows.some((row) => row.inboundID === current)
        || (studioId === focusConversation?.studioId && current === focusConversation?.inboundId)
        ? current : rows[0]?.inboundID || '')
    }
    load()
    return () => { active = false }
  }, [canRead, studioId, page, focusConversation, search, searchInput])

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

  const changeSearch = (value) => {
    setSearchInput(value)
    setPage(1)
    setConversations([])
    setTotal(0)
    setSelectedId('')
    setDetail(null)
    setOutcome(null)
    setListError('')
    setListLoading(true)
  }

  const changePage = (nextPage) => {
    setPage(nextPage)
    setSelectedId('')
    setDetail(null)
    setOutcome(null)
  }

  const runReview = async () => {
    if (!canWrite || reviewing || !detail?.messages?.some((message) => message.role === 'agent')) return
    setReviewing(true)
    setOutcome(null)
    try {
      const result = await clonedConversationApi.post(reviewPath(studioId, selectedId))
      if (!result.success) {
        setOutcome({ status: 'error', reason: result.error || 'Could not reach the review backend.' })
        return
      }
      setOutcome(result.data)
      if (result.data?.cases?.length) onCasesCreated()
    } finally {
      setReviewing(false)
    }
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
        <p className="text-sm text-muted-foreground">Review the complete SMS conversation with one action. A case is created only if the review finds an issue. No SMS is sent.</p>
      </div>
      <div className="space-y-2 rounded-xl border border-border bg-card p-4">
        <div className="grid gap-3 md:grid-cols-2">
          <div className="space-y-2">
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
          </div>
          <div className="space-y-2">
            <label htmlFor="cloned-conversation-search" className="block text-sm font-semibold">Search by name or phone</label>
            <Input id="cloned-conversation-search" type="search" value={searchInput} maxLength={100}
              onChange={(event) => changeSearch(event.target.value)} disabled={!studioId || reviewing}
              placeholder="Enter a person's name or phone number" />
          </div>
        </div>
        {studiosLoading && <p className="text-sm text-muted-foreground">Loading studios…</p>}
        {studioError && <p role="alert" className="text-sm text-destructive">{studioError}</p>}
        {!studiosLoading && !studioError && studios.length === 0 && <p className="text-sm text-muted-foreground">No studios are available for this account.</p>}
      </div>
      {studioId && (
        <div className="grid gap-4 lg:grid-cols-[minmax(260px,350px)_minmax(0,1fr)]">
          <div className="self-start overflow-hidden rounded-xl border border-border bg-card shadow-sm">
            <div className="border-b border-border p-4 text-sm font-semibold">Conversations · {total.toLocaleString()}</div>
            {listError && <p role="alert" className="p-4 text-sm text-destructive">{listError}</p>}
            {listLoading ? <p className="p-4 text-sm text-muted-foreground">Loading conversations…</p> : !listError && (
              <ConversationList conversations={conversations} selectedId={selectedId} onSelect={setSelectedId} disabled={reviewing} search={search} />
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
              outcome={outcome} onReview={runReview} onOpenCases={onOpenCases} />}
          </div>
        </div>
      )}
    </section>
  )
}
