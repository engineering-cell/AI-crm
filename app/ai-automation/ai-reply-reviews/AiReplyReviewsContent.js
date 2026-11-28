'use client'

import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { useToast } from '@/components/ui/toast'
import api from '@/lib/api'
import { clonedConversationApi } from '@/lib/clonedConversationApi'
import { getEffectiveBranch } from '@/lib/auth'
import { isSuperAdmin } from '@/lib/permissions'
import CurrentRagSimulationPanel from './CurrentRagSimulationPanel'
import ReviewCaseDashboard from './ReviewCaseDashboard'
import ClonedConversationsPanel from './ClonedConversationsPanel'
import { ManualCaseForm, PassedSubmissionForm } from './ReviewCaseForms'
import { reviewCaseListPath } from './reviewCaseQuery'

const VIEWS = [
  { key: 'reviews', label: 'Review cases' },
  { key: 'cloned', label: 'Cloned conversations' },
  { key: 'simulation', label: 'Simulation' },
]
const REVIEW_STATUSES = new Set(['passed', 'pending', 'approved', 'rejected'])
const PAGE_SIZE = 20

const ISSUE_LABELS = {
  repeated_question: 'Repeated question',
  source_conflict: 'Prompt or knowledge conflict',
  other: 'Other issue',
  none: 'Passed review',
}
const SOURCE_LABELS = {
  manual: 'Manual case',
  automated_pass: 'Captured PASS',
  automated_failure: 'Automated failure',
  cloned_conversation: 'Cloned conversation',
}

const TOOL_TRACE_REASON_MESSAGES = {
  source_message_reference_missing: 'This case has no valid reference to the original sent SMS.',
  source_message_not_found: 'The referenced sent SMS could not be found.',
  missing_lead_id: 'The sent SMS is not linked to a lead checkpoint thread.',
  checkpoint_lookup_failed: 'The checkpoint lookup failed, so the saved result could not be checked.',
  checkpoint_not_found: 'No checkpoints were found for the lead threads searched.',
  checkpoint_after_sent_reply: 'The available checkpoints are later than the sent SMS.',
  checkpoint_search_limit_reached: 'The checkpoint search reached its limit before finding a conclusive turn.',
  sent_reply_not_found: 'The sent SMS did not match a saved agent reply.',
  customer_turn_not_matched: 'The saved agent reply was not tied to the same customer turn.',
  availability_result_not_found: 'The matching turn has no saved booking availability result.',
}

function getReviewPermissions() {
  const allowed = isSuperAdmin()
  return { read: allowed, write: allowed }
}

function formatDate(value) {
  if (!value) return '—'
  const date = new Date(value)
  return Number.isNaN(date.getTime()) ? '—' : date.toLocaleString()
}

function DetailField({ label, value }) {
  return (
    <div className="space-y-1">
      <dt className="text-xs font-semibold text-muted-foreground">{label}</dt>
      <dd className="whitespace-pre-wrap break-words text-sm text-foreground">{value || '—'}</dd>
    </div>
  )
}

function Evidence({ review }) {
  const items = [
    ['Draft excerpt', review.draftExcerpt],
    ['Source excerpt', review.sourceExcerpt],
    ['Earlier customer answer', review.earlierCustomerAnswer],
    ['Earlier agent message', review.earlierAgentMessage],
  ].filter(([, value]) => value)

  return (
    <section className="space-y-3 rounded-lg border border-border bg-muted/20 p-4">
      <h3 className="text-sm font-semibold">Evidence</h3>
      {items.length ? (
        <dl className="space-y-3">
          {items.map(([label, value]) => <DetailField key={label} label={label} value={value} />)}
        </dl>
      ) : <p className="text-sm text-muted-foreground">No evidence recorded.</p>}
    </section>
  )
}

function ReviewToolEvidence({ review }) {
  if (review.source !== 'cloned_conversation') return null
  const conversationEvidence = (review.conversationMessages || []).flatMap((message) =>
    (message.toolEvidence || []).map((item) => ({ ...item, messageAt: message.createdAt })))
  const evidence = review.reviewScope === 'conversation' && conversationEvidence.length
    ? conversationEvidence : Array.isArray(review.toolEvidence) ? review.toolEvidence : []
  const missing = review.reviewScope === 'conversation'
    ? (review.conversationMessages || []).filter((message) => message.toolTraceStatus === 'unavailable') : []
  if (review.reviewScope === 'conversation' && evidence.length === 0 && missing.length === 0) return null
  return (
    <section className="space-y-3 rounded-lg border border-border bg-muted/20 p-4">
      <h3 className="text-sm font-semibold">Original availability tool evidence</h3>
      {review.reviewScope !== 'conversation' && review.toolTraceStatus === 'unavailable' && (
        <p className="text-sm text-amber-700">
          {TOOL_TRACE_REASON_MESSAGES[review.toolTraceReason] || 'The original availability result could not be verified.'} Availability claims in this case remain unverified.
        </p>
      )}
      {review.toolTraceStatus === 'recovered' && review.status === 'approved' && (
        <p className="text-sm text-amber-700">This tool result was recovered after the case was approved. The earlier review reason did not consider it and needs re-evaluation.</p>
      )}
      {missing.map((message) => (
        <p key={message.id} className="text-sm text-amber-700">
          {formatDate(message.createdAt)}: {TOOL_TRACE_REASON_MESSAGES[message.toolTraceReason] || 'No saved booking result was found for this reply.'}
        </p>
      ))}
      {evidence.map((item, index) => (
        <div key={`${item.name}-${index}`} className="space-y-2 text-sm">
          <p className="font-semibold">{item.name}{item.messageAt ? ` - ${formatDate(item.messageAt)}` : ''}</p>
          <p className="whitespace-pre-wrap break-words">Input: {JSON.stringify(item.args || {})}</p>
          <p className="whitespace-pre-wrap break-words">Result: {item.result}</p>
        </div>
      ))}
    </section>
  )
}

function keyConversationMessages(messages) {
  const occurrences = new Map()
  return messages.map((message) => {
    const identity = message._id || message.id || `${message.role}-${message.text}`
    const occurrence = (occurrences.get(identity) || 0) + 1
    occurrences.set(identity, occurrence)
    return { ...message, key: `${identity}-${occurrence}` }
  })
}

function issueContext(issue, messages) {
  const agentIndex = messages.findIndex((message) => message.id === issue.agentMessageId)
  if (agentIndex < 0) return { agent: null, customer: null, messageNumber: null }
  return {
    agent: messages[agentIndex],
    customer: messages.slice(0, agentIndex).findLast((message) => message.role === 'customer'),
    messageNumber: agentIndex + 1,
  }
}

function ConversationIssueCard({ issue, number, messages }) {
  const { agent, customer, messageNumber } = issueContext(issue, messages)
  return (
    <li className="space-y-3 rounded-lg border border-destructive/30 bg-destructive/5 p-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h4 className="font-semibold">Issue {number}: {ISSUE_LABELS[issue.issueType] || 'Other issue'}</h4>
        {agent?.id && <a href={`#review-message-${agent.id}`} className="text-xs font-medium text-primary underline">View message {messageNumber} in conversation</a>}
      </div>
      <dl className="space-y-3">
        <DetailField label="Customer said before this reply" value={customer?.text || 'No earlier customer message in the captured conversation.'} />
        <DetailField label="Agent said" value={agent?.text || issue.draftExcerpt} />
        {issue.earlierAgentMessage && <DetailField label="Earlier agent question" value={issue.earlierAgentMessage} />}
        <DetailField label="Why this was flagged" value={issue.reason} />
        <DetailField label="Suggested reply instead" value={issue.correctedReply} />
      </dl>
      {issue.sourceExcerpt && (
        <details className="text-sm">
          <summary className="cursor-pointer font-medium">Supporting prompt or knowledge excerpt</summary>
          <p className="mt-2 whitespace-pre-wrap break-words">{issue.sourceExcerpt}</p>
        </details>
      )}
    </li>
  )
}

function ConversationIssues({ issues, messages }) {
  if (!Array.isArray(issues) || issues.length === 0) return null
  return (
    <section className="space-y-3 rounded-lg border border-border bg-muted/20 p-4">
      <h3 className="text-base font-semibold">Issues found ({issues.length})</h3>
      <ol className="space-y-3 text-sm">
        {issues.map((issue, index) => <ConversationIssueCard key={`${issue.agentMessageId}-${issue.issueType}-${issue.reason}`} issue={issue} number={index + 1} messages={messages} />)}
      </ol>
    </section>
  )
}

function ConversationContext({ messages, full = false, issueAgentIds }) {
  if (!Array.isArray(messages) || messages.length === 0) return null

  return (
    <section className="space-y-3 rounded-lg border border-border bg-muted/20 p-4">
      <h3 className="text-sm font-semibold">{full ? 'Full conversation' : 'Earlier conversation'}</h3>
      <ol className="space-y-3">
        {keyConversationMessages(messages).map((message, index) => (
          <li key={message.key} id={full && message.id ? `review-message-${message.id}` : undefined}
            className={`scroll-mt-4 rounded-lg p-2 text-sm ${issueAgentIds?.has(message.id) ? 'border border-destructive/40 bg-destructive/5' : ''}`}>
            <span className="font-semibold">{full ? `Message ${index + 1} · ` : ''}{message.role === 'customer' ? 'Customer' : 'Agent'}</span>
            {issueAgentIds?.has(message.id) && <span className="ml-2 text-xs font-medium text-destructive">Issue flagged</span>}
            <p className="whitespace-pre-wrap break-words">{message.text}</p>
          </li>
        ))}
      </ol>
    </section>
  )
}

function ReviewHeader({ review }) {
  return (
    <div className="flex flex-wrap items-start justify-between gap-2">
      <div>
        <h2 className="text-lg font-semibold">{review.reviewScope === 'conversation' ? 'Conversation review' : ISSUE_LABELS[review.issueType] || review.issueType || 'Review case'}</h2>
        {review.source === 'cloned_conversation' && review.sourceStudioName && (
          <p className="text-sm text-muted-foreground">{review.sourceOrganisationName} · {review.sourceStudioName}</p>
        )}
        <p className="text-xs text-muted-foreground">Created {formatDate(review.createdAt)}</p>
      </div>
      <div className="flex flex-wrap gap-2">
        {review.isSimulation && <span className="rounded-full border border-border px-3 py-1 text-xs">Local simulation</span>}
        {review.source === 'manual' && <span className="rounded-full border border-border px-3 py-1 text-xs">Manual case</span>}
        {review.source === 'cloned_conversation' && <span className="rounded-full border border-border px-3 py-1 text-xs">Cloned conversation</span>}
        <span className="rounded-full border border-border px-3 py-1 text-xs font-medium capitalize">{review.status}</span>
        {review.status === 'approved' && <span className="rounded-full border border-primary px-3 py-1 text-xs font-medium text-primary">{review.source === 'cloned_conversation' ? 'Added to staging RAG' : review.isSimulation ? 'Added to test RAG' : 'Added to RAG'}</span>}
      </div>
    </div>
  )
}

function selectedReplyLabel(review) {
  if (review.source === 'manual') return 'Original reply entered for this case'
  if (review.isSimulation) return 'Simulated reply (no SMS sent)'
  if (review.reviewScope === 'conversation') return 'Suggested correction for first issue (not sent)'
  if (review.source === 'cloned_conversation') return 'Second agent proposed reply (not sent)'
  return 'Reply selected for the original SMS'
}

function originalReplyLabel(review) {
  if (review.source === 'manual') return 'Original reply'
  if (review.reviewScope === 'conversation') return 'Matched sent SMS (first issue; author unverified)'
  if (review.source === 'cloned_conversation') return 'Matched sent SMS (author unverified)'
  return 'First draft'
}

function ReviewSources({ review }) {
  const [expanded, setExpanded] = useState(false)
  if (review.source !== 'cloned_conversation') return null
  return (
    <section className="rounded-lg border border-border bg-muted/20 p-4">
      <button type="button" aria-expanded={expanded} onClick={() => setExpanded((current) => !current)}
        className="text-left text-sm font-semibold text-primary underline">
        {expanded ? 'Hide' : 'Show'} supporting prompt and knowledge
      </button>
      {expanded && (
        <dl className="mt-4 space-y-3">
          <DetailField label="SMS prompt" value={review.sourcePromptName} />
          {review.sourceKnowledgeUnavailable && <p className="text-sm text-amber-700">The cloned knowledge-base PDF was unavailable or incomplete for this review.</p>}
          {Array.isArray(review.sourceKnowledge) && review.sourceKnowledge.map((source, index) => (
            <DetailField key={`${source.sourceName}-${index}`} label={source.sourceName || source.type || 'Source'} value={source.text} />
          ))}
        </dl>
      )}
    </section>
  )
}

function ConversationReviewInformation({ review }) {
  const messages = Array.isArray(review.conversationMessages) ? review.conversationMessages : []
  const issueAgentIds = new Set((review.conversationIssues || []).map((issue) => issue.agentMessageId).filter(Boolean))
  return (
    <>
      <ConversationIssues issues={review.conversationIssues} messages={messages} />
      <ConversationContext messages={messages} full issueAgentIds={issueAgentIds} />
      <ReviewToolEvidence review={review} />
      <ReviewSources review={review} />
      {review.status === 'approved' && <dl><DetailField label="Approved reply for future examples" value={review.approvedReply} /></dl>}
      {review.reviewedAt && <dl><DetailField label="Decision made" value={formatDate(review.reviewedAt)} /></dl>}
    </>
  )
}

function ReviewInformation({ review }) {
  if (review.reviewScope === 'conversation') return <ConversationReviewInformation review={review} />
  const isPassed = review.status === 'passed'
  const isManual = review.source === 'manual'

  return (
    <>
      <dl className="space-y-4">
        <DetailField label="Customer message" value={review.customerMessage} />
        <DetailField label={originalReplyLabel(review)} value={review.firstDraft} />
        {!isManual && review.reviewedDraft && review.reviewedDraft !== review.firstDraft && (
          <DetailField label="Draft checked by this reviewer" value={review.reviewedDraft} />
        )}
      </dl>
      <ReviewToolEvidence review={review} />
      <dl className="space-y-4">
        {!isPassed && <DetailField label={review.toolTraceStatus === 'recovered' ? 'Original reason for review (before tool evidence)' : 'Reason for review'} value={review.reason} />}
      </dl>
      <ConversationContext messages={review.priorMessages} />
      <ReviewSources review={review} />
      {!isPassed && !isManual && <Evidence review={review} />}
      {isPassed && (
        <dl className="space-y-4">
          <DetailField label="History review" value={review.reviewDecisions?.history} />
          <DetailField label="Prompt and knowledge review" value={review.reviewDecisions?.conflict} />
        </dl>
      )}
      <dl className="space-y-4">
        {!isPassed && <DetailField label="Proposed correction" value={review.correctedReply} />}
        <DetailField label={selectedReplyLabel(review)} value={review.selectedReply} />
        {review.status === 'approved' && <DetailField label="Approved reply for future examples" value={review.approvedReply} />}
        {review.reviewedAt && <DetailField label="Decision made" value={formatDate(review.reviewedAt)} />}
      </dl>
    </>
  )
}

function PendingActions({ review, onDecision, saving }) {
  const [correction, setCorrection] = useState(review.approvedReply || review.correctedReply || '')

  return (
    <div className="space-y-3 border-t border-border pt-4">
      <label htmlFor="approved-reply" className="block text-sm font-semibold">Correction to approve</label>
      <Textarea id="approved-reply" value={correction} onChange={(event) => setCorrection(event.target.value)} disabled={Boolean(saving)} rows={5} />
      <p className="text-xs text-muted-foreground">Approval adds this correction to {review.source === 'cloned_conversation' ? 'staging RAG' : review.isSimulation ? 'test RAG' : 'RAG'} for future replies. It does not change the original SMS.</p>
      <div className="flex flex-wrap gap-2">
        <Button type="button" onClick={() => onDecision('approve', correction.trim())} disabled={Boolean(saving) || !correction.trim()}>
          {saving === 'approve' ? 'Approving…' : 'Approve'}
        </Button>
        <Button type="button" variant="outline" onClick={() => onDecision('reject')} disabled={Boolean(saving)}>
          {saving === 'reject' ? 'Rejecting…' : 'Reject'}
        </Button>
      </div>
    </div>
  )
}

function ReviewedCaseActions({ review, onRestore, saving }) {
  if (review.source !== 'cloned_conversation' || !['approved', 'rejected'].includes(review.status)) return null

  return (
    <div className="space-y-2 border-t border-border pt-4">
      <Button type="button" variant="outline" disabled={Boolean(saving)} onClick={onRestore}>
        {saving === 'restore' ? 'Getting back…' : `Get back from ${review.status === 'approved' ? 'Approved' : 'Rejected'}`}
      </Button>
      <p className="text-xs text-muted-foreground">
        {review.status === 'approved'
          ? 'Getting back removes its staging RAG entry and opens the original cloned conversation for a new review.'
          : 'Getting back opens the original cloned conversation for a new review.'}
      </p>
    </div>
  )
}

function ReviewDetail({ review, canWrite, onDecision, onSubmitPassed, onRestore, saving }) {
  return (
    <article className="space-y-5 rounded-xl border border-border bg-card p-4 shadow-sm sm:p-5">
      <ReviewHeader review={review} />
      <ReviewInformation review={review} />
      {review.status === 'passed' && canWrite && <PassedSubmissionForm initialReply={review.selectedReply} onSubmit={onSubmitPassed} saving={Boolean(saving)} />}
      {review.status === 'pending' && canWrite && <PendingActions review={review} onDecision={onDecision} saving={saving} />}
      {canWrite && <ReviewedCaseActions review={review} onRestore={onRestore} saving={saving} />}
    </article>
  )
}

function ReviewList({ reviews, selectedId, onSelect }) {
  if (!reviews.length) return <p className="p-4 text-sm text-muted-foreground">No reviews in this list.</p>

  return (
    <ul className="divide-y divide-border">
      {reviews.map((review) => (
        <li key={review._id}>
          <button
            type="button"
            onClick={() => onSelect(review._id)}
            aria-current={selectedId === review._id ? 'true' : undefined}
            className={`w-full space-y-1 p-4 text-left hover:bg-muted/40 ${selectedId === review._id ? 'bg-muted/50' : ''}`}
          >
            <div className="text-sm font-semibold">{review.reviewScope === 'conversation' ? 'Conversation review' : ISSUE_LABELS[review.issueType] || review.issueType || 'Review case'}</div>
            {review.source === 'cloned_conversation' && review.sourceStudioName && (
              <p className="text-xs text-muted-foreground">{review.sourceOrganisationName} · {review.sourceStudioName}</p>
            )}
            <p className="line-clamp-2 text-sm text-foreground">{review.customerMessage}</p>
            <p className="text-xs text-muted-foreground">
              {SOURCE_LABELS[review.source] || 'Review case'}
              {review.isSimulation ? ' · Local simulation' : ''} · {formatDate(review.createdAt)}
            </p>
          </button>
        </li>
      ))}
    </ul>
  )
}

function ReviewQueue({ status, error, listLoading, reviews, selectedId, onSelect, page, totalPages,
  onPageChange, detailLoading, detailError, selectedReview, canWrite, onDecision, onSubmitPassed, onRestore, saving }) {
  return (
    <div className="grid gap-4 lg:grid-cols-[minmax(260px,350px)_minmax(0,1fr)]">
      <section className="self-start overflow-hidden rounded-xl border border-border bg-card shadow-sm" aria-label={`${status} reviews`}>
        {error && <p role="alert" className="p-4 text-sm text-destructive">{error}</p>}
        {listLoading ? <p className="p-4 text-sm text-muted-foreground">Loading reviews…</p> : !error && (
          <ReviewList reviews={reviews} selectedId={selectedId} onSelect={onSelect} />
        )}
        {!error && !listLoading && totalPages > 1 && (
          <div className="flex items-center justify-between gap-2 border-t border-border p-3 text-sm">
            <Button type="button" size="sm" variant="outline" disabled={page === 1} onClick={() => onPageChange(page - 1)}>Previous</Button>
            <span>Page {page} of {totalPages}</span>
            <Button type="button" size="sm" variant="outline" disabled={page === totalPages} onClick={() => onPageChange(page + 1)}>Next</Button>
          </div>
        )}
      </section>

      <div aria-live="polite">
        {detailLoading && <p className="p-4 text-sm text-muted-foreground">Loading review…</p>}
        {detailError && <p role="alert" className="p-4 text-sm text-destructive">{detailError}</p>}
        {!detailLoading && selectedReview && (
          <ReviewDetail key={selectedReview._id} review={selectedReview} canWrite={canWrite} onDecision={onDecision}
            onSubmitPassed={onSubmitPassed} onRestore={onRestore} saving={saving} />
        )}
        {!detailLoading && !detailError && !selectedReview && !listLoading && reviews.length > 0 && (
          <p className="p-4 text-sm text-muted-foreground">Select a review to see its details.</p>
        )}
      </div>
    </div>
  )
}

export default function AiReplyReviewsContent() {
  const toast = useToast()
  const [permissions, setPermissions] = useState({ read: false, write: false })
  const [view, setView] = useState('reviews')
  const [caseBackend, setCaseBackend] = useState('standard')
  const [status, setStatus] = useState('pending')
  const [dateRange, setDateRange] = useState({ from: '', to: '' })
  const [page, setPage] = useState(1)
  const [reload, setReload] = useState(0)
  const [reviews, setReviews] = useState([])
  const [totalPages, setTotalPages] = useState(1)
  const [selectedId, setSelectedId] = useState(null)
  const [selectedReview, setSelectedReview] = useState(null)
  const [listLoading, setListLoading] = useState(false)
  const [detailLoading, setDetailLoading] = useState(false)
  const [error, setError] = useState('')
  const [detailError, setDetailError] = useState('')
  const [saving, setSaving] = useState(null)
  const [manualOpen, setManualOpen] = useState(false)
  const [manualDraft, setManualDraft] = useState(null)
  const [manualDraftVersion, setManualDraftVersion] = useState(0)
  const [focusConversation, setFocusConversation] = useState(null)
  const caseApi = caseBackend === 'clone' ? clonedConversationApi : api

  useEffect(() => {
    const savedTab = window.sessionStorage.getItem('ai-reply-reviews-tab')
    if (savedTab === 'simulation' || savedTab === 'cloned') setView(savedTab)
    else if (REVIEW_STATUSES.has(savedTab)) setStatus(savedTab)
  }, [])

  useEffect(() => {
    if (manualOpen && manualDraft) {
      document.getElementById('manual-review-case')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }, [manualOpen, manualDraft])

  useEffect(() => {
    const updatePermissions = () => setPermissions(getReviewPermissions())
    updatePermissions()
    window.addEventListener('session-refresh', updatePermissions)
    return () => window.removeEventListener('session-refresh', updatePermissions)
  }, [])

  useEffect(() => {
    if (!permissions.read || view !== 'reviews') return
    let active = true
    const load = async () => {
      setListLoading(true)
      setError('')
      const result = await caseApi.get(reviewCaseListPath({ status, page, limit: PAGE_SIZE, range: dateRange }))
      if (!active) return
      setListLoading(false)
      if (!result.success) {
        setError(result.error || 'Could not load reply reviews.')
        setReviews([])
        setSelectedId(null)
        return
      }
      if ((dateRange.from || dateRange.to) && result.data?.dateRangeApplied !== true) {
        setError('Date filtering needs the updated review backend. Cases are hidden until it is available.')
        setReviews([])
        setSelectedId(null)
        return
      }
      const cases = Array.isArray(result.data?.cases) ? result.data.cases : []
      const pages = Math.max(1, Number(result.data?.totalPages) || 1)
      if (page > pages) {
        setPage(pages)
        return
      }
      setReviews(cases)
      setTotalPages(pages)
      setSelectedId((current) => cases.some((item) => item._id === current) ? current : cases[0]?._id || null)
    }
    load()
    return () => { active = false }
  }, [caseApi, permissions.read, view, status, page, dateRange, reload])

  useEffect(() => {
    if (!selectedId || !permissions.read || view !== 'reviews') {
      setSelectedReview(null)
      setDetailLoading(false)
      setDetailError('')
      return
    }
    let active = true
    const load = async () => {
      setDetailLoading(true)
      setDetailError('')
      setSelectedReview(null)
      const result = await caseApi.get(`/api/sms-reply-reviews/${encodeURIComponent(selectedId)}`)
      if (!active) return
      setDetailLoading(false)
      if (result.success) setSelectedReview(result.data)
      else setDetailError(result.error || 'Could not load this review.')
    }
    load()
    return () => { active = false }
  }, [caseApi, permissions.read, selectedId, reload, view])

  const changeStatus = (nextStatus) => {
    setView('reviews')
    window.sessionStorage.setItem('ai-reply-reviews-tab', 'reviews')
    setStatus(nextStatus)
    setPage(1)
    setReviews([])
    setTotalPages(1)
    setSelectedId(null)
    setSelectedReview(null)
  }

  const changeCaseBackend = (nextBackend) => {
    setCaseBackend(nextBackend)
    setDateRange({ from: '', to: '' })
    setPage(1)
    setReviews([])
    setSelectedId(null)
    setSelectedReview(null)
  }

  const openClonedCases = (nextStatus) => {
    changeCaseBackend('clone')
    changeStatus(REVIEW_STATUSES.has(nextStatus) ? nextStatus : 'pending')
  }

  const changeView = (nextView) => {
    setView(nextView)
    window.sessionStorage.setItem('ai-reply-reviews-tab', nextView)
  }

  const applyDateRange = (range) => {
    setDateRange(range)
    setPage(1)
    setSelectedId(null)
    setSelectedReview(null)
  }

  const changePage = (nextPage) => {
    setPage(nextPage)
    setReviews([])
    setSelectedId(null)
    setSelectedReview(null)
  }

  const decide = async (action, approvedReply) => {
    if (!permissions.write || selectedReview?.status !== 'pending' || saving) return
    setSaving(action)
    const result = await caseApi.post(
      `/api/sms-reply-reviews/${encodeURIComponent(selectedReview._id)}/${action}`,
      action === 'approve' ? { approvedReply } : {},
    )
    setSaving(null)
    if (!result.success) {
      toast.error({ title: 'Review could not be updated', message: result.error || 'Please try again.' })
      return
    }
    if (action === 'approve') toast.success(selectedReview.source === 'cloned_conversation' ? 'Added to staging RAG.' : selectedReview.isSimulation ? 'Added to test RAG.' : 'Added to RAG.')
    else toast.success('Review rejected.')
    setSelectedId(null)
    setSelectedReview(null)
    setReload((current) => current + 1)
  }

  const restoreReviewedCase = async () => {
    const review = selectedReview
    if (!permissions.write || caseBackend !== 'clone' || review?.source !== 'cloned_conversation' || saving) return
    if (!['approved', 'rejected'].includes(review.status)) return
    if (!review.sourceLocationID || !(review.sourceConversationID || review.sourceInboundMessageID)) {
      toast.error({ title: 'Original conversation unavailable', message: 'This case has no source studio or customer message reference.' })
      return
    }
    setSaving('restore')
    const path = `/api/sms-reply-reviews/${encodeURIComponent(review._id)}`
    const result = await clonedConversationApi.post(`${path}/restore`, {})
    setSaving(null)
    if (!result.success) {
      toast.error({ title: 'Case could not be updated', message: result.error || 'Please try again.' })
      return
    }
    toast.success('Original cloned conversation is ready for review.')
    setFocusConversation({ studioId: review.sourceLocationID, inboundId: review.sourceConversationID || review.sourceInboundMessageID })
    changeView('cloned')
    setReload((current) => current + 1)
  }

  const submitPassed = async (caseDetails) => {
    if (!permissions.write || selectedReview?.status !== 'passed' || saving) return
    setSaving('submit')
    const result = await caseApi.post(`/api/sms-reply-reviews/${encodeURIComponent(selectedReview._id)}/submit`, caseDetails)
    setSaving(null)
    if (!result.success) {
      toast.error({ title: 'Case could not be submitted', message: result.error || 'Please try again.' })
      return
    }
    toast.success('Case sent to Pending for review.')
    changeStatus('pending')
    setReload((current) => current + 1)
  }

  const createManualCase = async (caseDetails) => {
    if (!permissions.write || !getEffectiveBranch() || saving) return
    setSaving('manual')
    const result = await api.post('/api/sms-reply-reviews/manual', caseDetails)
    setSaving(null)
    if (!result.success) {
      toast.error({ title: 'Manual case could not be added', message: result.error || 'Please try again.' })
      return
    }
    toast.success('Manual case added to Pending for review.')
    setManualOpen(false)
    setManualDraft(null)
    changeStatus('pending')
    setReload((current) => current + 1)
  }

  const toggleManualCase = () => {
    setManualDraft(null)
    setManualDraftVersion((current) => current + 1)
    setManualOpen((current) => !current)
  }

  const sendSimulationToReview = (caseDraft) => {
    changeCaseBackend('standard')
    changeView('reviews')
    setManualDraft(caseDraft)
    setManualDraftVersion((current) => current + 1)
    setManualOpen(true)
  }

  return (
    <div className="mx-auto max-w-7xl space-y-4">
        {permissions.write && view === 'reviews' && caseBackend === 'standard' && (
          <div>
            <Button type="button" variant={manualOpen ? 'outline' : 'default'} onClick={toggleManualCase} disabled={Boolean(saving)}>
              {manualOpen ? 'Close manual case' : 'Add manual case'}
            </Button>
          </div>
        )}
        {manualOpen && permissions.write && view === 'reviews' && caseBackend === 'standard' && (
          <div id="manual-review-case">
            <ManualCaseForm key={manualDraftVersion} initialCase={manualDraft} onSubmit={createManualCase} onCancel={() => setManualOpen(false)} saving={saving === 'manual'} hasStudio={Boolean(getEffectiveBranch())} />
          </div>
        )}
        <div className="flex flex-wrap gap-2" aria-label="Review status">
          {VIEWS.map(({ key, label }) => (
            <button
              key={key}
              type="button"
              aria-pressed={view === key}
              onClick={() => changeView(key)}
              className={`rounded-lg border px-4 py-2 text-sm font-medium ${view === key ? 'border-primary bg-primary text-primary-foreground' : 'border-border bg-card text-foreground hover:bg-muted'}`}
            >
              {label}
            </button>
          ))}
        </div>


        {view === 'simulation' && (
          <div className="space-y-4">
            <CurrentRagSimulationPanel canWrite={permissions.write} onSendToReview={sendSimulationToReview} />
          </div>
        )}

        {view === 'cloned' && (
          <ClonedConversationsPanel canRead={permissions.read} canWrite={permissions.write}
            focusConversation={focusConversation} onCasesCreated={() => setReload((current) => current + 1)} onOpenCases={openClonedCases} />
        )}

        {view === 'reviews' && (
          <div className="space-y-4">
            <div className="flex flex-wrap items-center gap-2 text-sm">
              <span className="font-medium">Case source:</span>
              <Button type="button" size="sm" variant={caseBackend === 'standard' ? 'default' : 'outline'}
                onClick={() => changeCaseBackend('standard')}>Standard reviews</Button>
              <Button type="button" size="sm" variant={caseBackend === 'clone' ? 'default' : 'outline'}
                onClick={() => changeCaseBackend('clone')}>Cloned review cases</Button>
            </div>
            <ReviewCaseDashboard canRead={permissions.read} selectedStatus={status} onSelect={changeStatus}
              range={dateRange} onApply={applyDateRange} reload={reload} apiClient={caseApi} />
            <ReviewQueue status={status} error={error} listLoading={listLoading} reviews={reviews} selectedId={selectedId} onSelect={setSelectedId}
              page={page} totalPages={totalPages} onPageChange={changePage} detailLoading={detailLoading} detailError={detailError}
              selectedReview={selectedReview} canWrite={permissions.write} onDecision={decide} onSubmitPassed={submitPassed}
              onRestore={restoreReviewedCase} saving={saving} />
          </div>
        )}
    </div>
  )
}
