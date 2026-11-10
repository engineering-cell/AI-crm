'use client'

import { Suspense, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { nameWithMembers } from '@/lib/utils'
import MainLayout from '@/components/layout/MainLayout'
import ContactList from '@/app/inbox/components/ContactList'
import ConversationView from '@/app/inbox/components/ConversationView'
import ContactDetails from '@/app/inbox/components/ContactDetails'
import NewMessagePanel from '@/app/inbox/components/NewMessagePanel'
import BulkMessagePanel from '@/app/inbox/components/BulkMessagePanel'
import ScheduledMessageView from '@/app/inbox/components/ScheduledMessageView'
import ActiveCallPanel from '@/components/human-queue/ActiveCallPanel'
import { getCurrentUserId } from '@/lib/auth'
import {
  emptyReadState,
  isConversationUnread,
  markReadState,
  markUnreadState,
  numberConversationId,
  readStateFromServer,
} from '@/lib/inbox-messaging'
import { Sheet, SheetContent } from '@/components/ui/sheet'
import { useInboxHeader } from '@/contexts/InboxHeaderContext'
import { cn, getContactDisplayName } from '@/lib/utils'
import api from '@/lib/api'
import { isPersistedCallId, nextOutboundPanelStatus } from '@/lib/outboundCallStatus'
import GlobalLoader from '@/components/shared/GlobalLoader'
import { useToast } from '@/components/ui/toast'
import {
  applyEmailTemplate,
  buildLeadRecipient,
  buildSendOneEmailPayload,
  dedupeThreadMessages,
  emailsForConversation,
  htmlToPlainText,
  indexEmailHistoryRecords,
  mapEmailHistoryRecord,
  normalizeEmailAddress,
  validateEmailSendInput,
} from '@/lib/emailSend'
import { isPaidConvertedInboxContact } from '@/lib/inbox-contact-search'
import {
  collapseConvertedInboxDuplicates,
  linkedCustomerIdForConversation,
} from '@/lib/inbox-merge-converted'
import LeadsFilterPanel from '@/components/leads/LeadsFilterPanel'
import CustomersFilterPanel from '@/components/customers/CustomersFilterPanel'
import { EMPTY_LEAD_FILTERS, sanitizeLeadFilters } from '@/lib/lead-page-filters'
import { EMPTY_CUSTOMER_FILTERS, sanitizeCustomerFilters } from '@/lib/customer-page-filters'
import { extractFormTemplatesList, extractLeadReasonsList } from '@/lib/workflow-normalize'
import {
  conversationEntityIds,
  countInboxContactFilters,
  fetchMatchingEntityIds,
  inboxFilterEntity,
} from '@/lib/inbox-contact-filters'
import {
  mapAiCallToMessage,
  mapForwardedCallToMessage,
  mapHumanCallToMessage,
  mergeSmsPages,
  mergeThreadByTimestamp,
} from '@/lib/inboxThread'
import { isCustomerAiRepliesEnabled } from '@/lib/customerAiReplies'

function resolveContactType(leadOrConv = {}) {
  const explicit = String(leadOrConv.type || '').toLowerCase()
  if (explicit === 'other') return 'Other'
  if (
    explicit === 'teacher' ||
    explicit === 'teachers' ||
    explicit === 'customer' ||
    explicit === 'customers' ||
    explicit === 'lead' ||
    explicit === 'leads'
  ) {
    if (explicit.startsWith('teacher')) return 'Teacher'
    if (explicit.startsWith('customer')) {
      // API may still say customer while stage is pending_payment.
      return isPaidConvertedInboxContact(leadOrConv) ? 'Customer' : 'Lead'
    }
    return 'Lead'
  }
  return isPaidConvertedInboxContact(leadOrConv) ? 'Customer' : 'Lead'
}

/** Inbox type for a lead profile refresh — never invent Teacher from phone collision. */
function resolveLeadProfileInboxType(lead = {}, previousType = null) {
  if (isPaidConvertedInboxContact(lead)) return 'Customer'
  // Preserve Teacher when inbox already classified this thread that way.
  const prev = String(previousType || '').toLowerCase()
  if (prev.startsWith('teacher')) return 'Teacher'
  return 'Lead'
}

function inboxFilterParamForType(contactTypeLabel) {
  if (contactTypeLabel === 'Everyone') return 'everyone'
  if (contactTypeLabel === 'Other') return 'other'
  if (contactTypeLabel === 'Teachers') return 'teachers'
  if (contactTypeLabel === 'Customers') return 'all'
  return 'leads'
}

/**
 * An optimistic bubble (client id) that history hasn't confirmed yet — no server copy
 * with the same text / subject sent around the same time.
 */
function isOptimisticUnconfirmed(message, serverMessages) {
  if (/^[a-f\d]{24}$/i.test(String(message.id))) return false
  const sentAt = new Date(message.timestamp).getTime()
  return !serverMessages.some(
    (s) =>
      s.id === message.id ||
      (s.direction === message.direction &&
        (s.content === message.content || (message.subject && s.subject === message.subject)) &&
        Math.abs(new Date(s.timestamp).getTime() - sentAt) < 5 * 60_000),
  )
}

function latestInboundAt(messages = [], fallback = null) {
  let latest = fallback ? new Date(fallback).getTime() : 0
  for (const m of messages) {
    if (m.direction !== 'inbound') continue
    const t = new Date(m.timestamp).getTime()
    if (t > latest) latest = t
  }
  return latest ? new Date(latest).toISOString() : null
}

function buildInboxData(smsRecords, emailRecords) {
  const conversations = []
  const threadMessages = {}

  // Group all records by lead._id so one lead = one conversation thread
  const contactGroups = {}

  for (const rec of smsRecords) {
    const lead = rec.leadID
    const status = String(rec?.status || '').toLowerCase()
    const isInbound = status === 'received' || status === 'inbound'
    const resolvedPhone =
      lead?.phoneNumber ||
      (isInbound ? (rec?.from || rec?.phoneNumber) : (rec?.to || rec?.phoneNumber)) ||
      ''
    const key = lead?._id ? `lead-${lead._id}` : `sms-${String(rec.phoneNumber).replace(/\W/g, '_')}`
    if (!contactGroups[key]) {
      contactGroups[key] = {
        contact: {
          id: lead?._id || rec.phoneNumber,
          name: nameWithMembers(lead) || resolvedPhone || rec.phoneNumber,
          type: resolveContactType(lead || {}),
          stage: lead?.stage || '',
          nextVisit: '',
          phoneNumber: resolvedPhone,
          email: lead?.email || '',
          locationID: lead?.locationID || [],
          convertedCustomerID: lead?.convertedCustomerID || null,
          leadSourceID: lead?.leadSourceID || null,
        },
        messages: [],
      }
    } else if (resolvedPhone && !contactGroups[key].contact.phoneNumber) {
      contactGroups[key].contact.phoneNumber = resolvedPhone
    }
    contactGroups[key].messages.push({
      id: rec._id,
      sender: isInbound ? (nameWithMembers(lead) || resolvedPhone || 'Unknown') : 'You',
      direction: isInbound ? 'inbound' : 'outbound',
      content: rec.message,
      timestamp: rec.createdAt,
      channel: 'SMS',
    })
  }

  for (const rec of emailRecords) {
    const lead = rec.leadID
    const status = String(rec?.status || '').toLowerCase()
    const isInbound = status === 'received' || status === 'inbound'
    const email =
      lead?.email ||
      (isInbound ? rec.from : rec.to) ||
      rec.email ||
      ''
    const key = lead?._id ? `lead-${lead._id}` : `email-${String(email).replace(/\W/g, '_')}`
    if (!contactGroups[key]) {
      contactGroups[key] = {
        contact: {
          id: lead?._id || null,
          name: nameWithMembers(lead) || email,
          // An address emailed with no CRM record belongs with Inbox-only contacts.
          type: lead?._id ? resolveContactType(lead) : 'Other',
          stage: lead?.stage || '',
          nextVisit: '',
          phoneNumber: lead?.phoneNumber || '',
          email,
          locationID: lead?.locationID || [],
          convertedCustomerID: lead?.convertedCustomerID || null,
          leadSourceID: lead?.leadSourceID || null,
        },
        messages: [],
      }
    } else {
      if (email && !contactGroups[key].contact.email) {
        contactGroups[key].contact.email = email
      }
      if (!contactGroups[key].contact.convertedCustomerID && lead?.convertedCustomerID) {
        contactGroups[key].contact.convertedCustomerID = lead.convertedCustomerID
      }
      if (!contactGroups[key].contact.leadSourceID && lead?.leadSourceID) {
        contactGroups[key].contact.leadSourceID = lead.leadSourceID
      }
    }
    contactGroups[key].messages.push(mapEmailHistoryRecord(rec))
  }

  for (const [convId, group] of Object.entries(contactGroups)) {
    const sortedMessages = dedupeThreadMessages(
      [...group.messages].sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp)),
    )
    const latest = sortedMessages[sortedMessages.length - 1]
    const lastPreview =
      latest.channel === 'Email'
        ? latest.subject || htmlToPlainText(latest.content) || latest.content
        : latest.content
    conversations.push({
      id: convId,
      contact: { ...group.contact, name: getContactDisplayName(group.contact) },
      lastMessage: lastPreview,
      timestamp: latest.timestamp,
      lastInboundAt: latestInboundAt(sortedMessages),
      unread: 0,
      channel: latest.channel,
    })
    threadMessages[convId] = sortedMessages
  }

  conversations.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
  return { conversations, threadMessages }
}

// Normalize contact type for filters (All, Customers, Leads, Teachers)
function normalizeContactType(type) {
  if (!type) return ''
  const t = String(type).toLowerCase()
  if (t === 'other') return 'Other'
  if (t === 'customer' || t === 'customers') return 'Customers'
  if (t === 'lead' || t === 'leads') return 'Leads'
  if (t === 'teacher' || t === 'teachers') return 'Teachers'
  return type
}

// Header tabs: All Customers | Leads | Teachers — each shows only that type.
// URL value "all" = Customers (tab label "All Customers").
const INBOX_FILTER_MAP = {
  everyone: 'Everyone',
  all: 'Customers',
  customers: 'Customers',
  leads: 'Leads',
  teachers: 'Teachers',
  other: 'Other',
}

function InboxPageContent() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const router = useRouter()
  const isTalkToAssistant = pathname === '/inbox/talk-to-assistant'
  const { setInboxCounts } = useInboxHeader()
  const toast = useToast()
  const [selectedConversation, setSelectedConversation] = useState(null)
  const [showDetails, setShowDetails] = useState(false)
  const [showContactList, setShowContactList] = useState(true)
  const [isLgUp, setIsLgUp] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [contactFilter, setContactFilter] = useState('Customers')
  const [conversations, setConversations] = useState([])
  const [threadMessages, setThreadMessages] = useState({})
  const [threadMeta, setThreadMeta] = useState({}) // { [convId]: { page, hasMore, loading } }
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [rightView, setRightView] = useState('thread') // thread | new
  const [mainView, setMainView] = useState('inbox') // inbox | bulk
  const [statusTab, setStatusTab] = useState('All') // All | Unread | Scheduled
  // Conversation opened from the Unread tab — stays listed while you read it.
  const [openedFromUnread, setOpenedFromUnread] = useState(null)
  const [readState, setReadState] = useState(null)
  const [scheduled, setScheduled] = useState([])
  const [scheduledLoading, setScheduledLoading] = useState(true)
  const [selectedScheduledId, setSelectedScheduledId] = useState(null)
  const [selectedLeadData, setSelectedLeadData] = useState(null)
  /** 'lead' | 'customer' — which record the AI replies switch writes to. */
  const [selectedContactKind, setSelectedContactKind] = useState(null)
  const [aiToggleSaving, setAiToggleSaving] = useState(false)
  const [emailSending, setEmailSending] = useState(false)
  const [smsSending, setSmsSending] = useState(false)
  const [callPlacing, setCallPlacing] = useState(false)
  const [callLogsLoading, setCallLogsLoading] = useState(false)
  const [promoteSaving, setPromoteSaving] = useState(false)
  const [activeOutboundCall, setActiveOutboundCall] = useState(null)
  const [activeOutboundConnection, setActiveOutboundConnection] = useState(null)
  const [outboundCallStatus, setOutboundCallStatus] = useState('connecting')
  const selectedConversationRef = useRef(null)
  const endingOutboundRef = useRef(false)
  const callHistoryLoadedRef = useRef(new Set())
  const callHistoryInFlightRef = useRef(null)
  const callHistoryRequestIdRef = useRef({})

  const invalidateCallHistoryCache = useCallback((conversationId) => {
    if (!conversationId) return
    for (const key of [...callHistoryLoadedRef.current]) {
      if (key === conversationId || key.startsWith(`${conversationId}::`)) {
        callHistoryLoadedRef.current.delete(key)
      }
    }
  }, [])
  const emailHistoryLoadedRef = useRef(new Set())
  const smsPageInFlightRef = useRef(new Set()) // `${convId}:${page}`
  const callLogRefreshTimersRef = useRef(new Map())
  const endOutboundCallRef = useRef(null)
  const activeOutboundConnectionRef = useRef(null)
  const activeOutboundCallRef = useRef(null)
  const outboundCallStatusRef = useRef('connecting')
  const outboundAttemptRef = useRef(0)
  const setOutboundStatus = useCallback((next) => {
    outboundCallStatusRef.current = next
    setOutboundCallStatus(next)
  }, [])

  const upsertConversationAndAppendMessage = useCallback((payload) => {
    const { convId, contact, channel, content, subject, timestamp, extra = {} } = payload

    const effectiveChannel =
      channel === 'Email' ? 'Email' : channel === 'Call' ? 'Call' : 'SMS'
    const lastMessage = effectiveChannel === 'Email' ? (subject || content) : content

    const newMessage = {
      id: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
      sender: 'You',
      direction: 'outbound',
      content,
      subject: effectiveChannel === 'Email' ? subject : undefined,
      timestamp,
      channel: effectiveChannel,
      ...extra,
    }

    setThreadMessages((prev) => ({
      ...prev,
      [convId]: [...(prev[convId] || []), newMessage],
    }))

    setConversations((prev) => {
      const exists = prev.some((c) => c.id === convId)
      const nextRow = {
        id: convId,
        contact,
        lastMessage,
        timestamp,
        unread: 0,
        channel: effectiveChannel,
      }
      const updated = exists ? prev.map((c) => (c.id === convId ? { ...c, ...nextRow } : c)) : [nextRow, ...prev]
      return [...updated].sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
    })
  }, [])

  const handleBatchSent = useCallback((result) => {
    const { channel, leads, subject, content, timestamp } = result || {}
    if (!Array.isArray(leads) || !content) return

    for (const lead of leads) {
      const convId = lead._id
        ? `lead-${lead._id}`
        : channel === 'SMS'
          ? `sms-${String(lead.phoneNumber).replace(/\W/g, '_')}`
          : `email-${String(lead.email).replace(/\W/g, '_')}`

      upsertConversationAndAppendMessage({
        convId,
        contact: {
          id: lead._id,
          name: getContactDisplayName(lead),
          type: resolveContactType(lead),
          stage: lead.stage || '',
          nextVisit: '',
          phoneNumber: lead.phoneNumber,
          email: lead.email,
          locationID: lead.locationID || [],
        },
        channel,
        subject,
        content,
        timestamp: timestamp || new Date().toISOString(),
      })
    }
  }, [upsertConversationAndAppendMessage])

  const fetchInboxData = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const [smsResult, emailResult] = await Promise.all([
        api.get('/api/smsHistory/conversations'),
        api.get('/api/emailHistory?limit=200'),
      ])

      const smsConvs = Array.isArray(smsResult.data) ? smsResult.data : []
      const emailRecords = Array.isArray(emailResult.data) ? emailResult.data : []

      const threads = {}

      // Build SMS conversations from new API shape.
      // Same number in two formats must not produce two rows with one React key.
      const smsById = new Map()
      for (const conv of smsConvs) {
        // Inbox-only numbers have no leadID — key them by number.
        const convId = conv.leadID ? `lead-${conv.leadID}` : numberConversationId(conv.phoneNumber)
        // messages not loaded yet for non-top leads — undefined signals "not fetched"
        const next = {
          id: convId,
          contact: {
            id: conv.leadID || null,
            inboxContactID: conv.inboxContactID || null,
            name: conv.leadID
              ? getContactDisplayName({ name: conv.name, phoneNumber: conv.phoneNumber, email: conv.email })
              : conv.name || '',
            type: resolveContactType(conv),
            stage: conv.stage || '',
            nextVisit: '',
            phoneNumber: conv.phoneNumber || '',
            email: conv.email || '',
            locationID: conv.locationID || [],
            convertedCustomerID: conv.convertedCustomerID || null,
            leadSourceID: conv.leadSourceID || null,
            reason: conv.reason || '',
            evidence: conv.evidence || '',
          },
          lastMessage: conv.lastMessage,
          timestamp: conv.lastMessageAt,
          lastInboundAt: conv.lastInboundAt || null,
          unread: 0,
          // Call-only Others open on the Call tab; everyone else stays on SMS.
          channel: String(conv.channel || '').toLowerCase() === 'call' ? 'Call' : 'SMS',
        }
        const prev = smsById.get(convId)
        if (!prev || new Date(conv.lastMessageAt || 0) > new Date(prev.timestamp || 0)) {
          smsById.set(convId, next)
        }
      }
      const smsConversations = [...smsById.values()]

      // Build email conversations from history
      const { conversations: emailConvs, threadMessages: emailThreads } = buildInboxData([], emailRecords)
      const emailIndex = indexEmailHistoryRecords(emailRecords)

      const smsLeadIds = new Set(smsConversations.map((c) => c.id))

      // Pre-load email history for SMS lead threads (by leadID + matching email address)
      for (const smsConv of smsConversations) {
        const emailMsgs = emailsForConversation(
          smsConv.id,
          smsConv.contact.email,
          emailIndex,
        )
        if (emailMsgs.length > 0) {
          threads[smsConv.id] = emailMsgs
          smsConv.lastInboundAt = latestInboundAt(emailMsgs, smsConv.lastInboundAt)
          if (!smsConv.contact.email) {
            smsConv.contact.email = emailMsgs[emailMsgs.length - 1].recipientEmail || ''
          }
        }
      }

      // Email-only threads (no SMS conversation for that key)
      for (const [key, msgs] of Object.entries(emailThreads)) {
        if (!smsLeadIds.has(key)) threads[key] = msgs
      }

      // Deduplicate by id — SMS entry wins; hide email-only row if same address exists on SMS lead
      const smsEmails = new Set(
        smsConversations.map((c) => normalizeEmailAddress(c.contact.email)).filter(Boolean),
      )
      const uniqueEmailConvs = emailConvs.filter((c) => {
        if (smsLeadIds.has(c.id)) return false
        const addr = normalizeEmailAddress(c.contact.email)
        if (addr && smsEmails.has(addr) && c.id.startsWith('email-')) return false
        return true
      })
      // Converted lead + customer are two ids for one person — keep the lead row.
      const allConversations = collapseConvertedInboxDuplicates(
        [...smsConversations, ...uniqueEmailConvs].sort(
          (a, b) => new Date(b.timestamp) - new Date(a.timestamp),
        ),
      )

      // Move email messages that lived on the dropped customer id onto the kept lead thread.
      for (const conv of allConversations) {
        const linkedCustomerId = linkedCustomerIdForConversation(conv)
        if (!linkedCustomerId) continue
        const customerKey = `lead-${linkedCustomerId}`
        const customerMsgs = threads[customerKey]
        if (!customerMsgs?.length) continue
        const existing = threads[conv.id] || []
        threads[conv.id] = dedupeThreadMessages([...existing, ...customerMsgs]).sort(
          (a, b) => new Date(a.timestamp) - new Date(b.timestamp),
        )
        delete threads[customerKey]
      }

      setConversations(allConversations)
      setThreadMessages(threads)
    } catch (e) {
      console.error(e)
      setError('Failed to load inbox')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchInboxData()
  }, [fetchInboxData])

  // Track desktop breakpoint so mobile master–detail doesn't fight desktop split panes
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px)')
    const sync = () => {
      const matches = mq.matches
      setIsLgUp(matches)
      if (!matches) {
        setShowDetails(false)
      } else {
        // Keep profile sidebar closed by default; user opens via "View profile".
        setShowContactList(true)
      }
    }
    sync()
    mq.addEventListener('change', sync)
    return () => mq.removeEventListener('change', sync)
  }, [])

  // Sync URL ?filter= with contactFilter (header tabs use URL)
  const urlFilter = searchParams?.get('filter') || 'all'
  useEffect(() => {
    setContactFilter(INBOX_FILTER_MAP[urlFilter] ?? 'Customers')
  }, [urlFilter])

  // Location is enforced by the API via x-location-id (branch switcher reloads the page).
  const filteredConversations = useMemo(() => conversations, [conversations])

  // Studio-wide read state (see lib/inbox-messaging). The old per-browser copy
  // is merged into it once, so nothing someone already read turns unread again.
  const legacyReadStateKey = `inbox-read:${getCurrentUserId() || 'me'}`
  // 'local' when the API has no shared read state (older backend): this browser keeps it.
  const [readStateSource, setReadStateSource] = useState(null)
  const loadReadState = useCallback(async () => {
    const res = await api.get('/api/inbox/read-state')
    if (res?.success && res.data) {
      setReadState(readStateFromServer(res.data))
      setReadStateSource('server')
    }
  }, [])

  useEffect(() => {
    let cancelled = false
    ;(async () => {
      let local = null
      try {
        local = JSON.parse(localStorage.getItem(legacyReadStateKey) || 'null')
      } catch {
        local = null
      }
      const res = await api.get('/api/inbox/read-state')
      if (cancelled) return
      if (!res?.success || !res.data) {
        setReadState(local?.baseline ? local : emptyReadState())
        setReadStateSource('local')
        return
      }
      let data = res.data
      if (local?.baseline || !data.baseline) {
        const synced = await api.post('/api/inbox/read-state/sync', {
          baseline: local?.baseline || new Date().toISOString(),
          read: local?.read || {},
        })
        if (synced?.success && synced.data) {
          data = synced.data
          try {
            localStorage.removeItem(legacyReadStateKey)
          } catch {
            // Storage blocked — the merge is idempotent, so a retry next load is harmless.
          }
        }
      }
      if (cancelled) return
      setReadState(readStateFromServer(data))
      setReadStateSource('server')
    })()
    return () => {
      cancelled = true
    }
  }, [legacyReadStateKey])

  useEffect(() => {
    if (readStateSource !== 'local' || !readState) return
    try {
      localStorage.setItem(legacyReadStateKey, JSON.stringify(readState))
    } catch {
      // Private mode / storage full — unread still works for this session.
    }
  }, [readState, readStateSource, legacyReadStateKey])

  // Pick up conversations other staff opened or marked unread.
  useEffect(() => {
    const refresh = () => {
      if (document.visibilityState === 'visible') loadReadState()
    }
    const interval = setInterval(refresh, 30000)
    window.addEventListener('focus', refresh)
    document.addEventListener('visibilitychange', refresh)
    return () => {
      clearInterval(interval)
      window.removeEventListener('focus', refresh)
      document.removeEventListener('visibilitychange', refresh)
    }
  }, [loadReadState])

  const markConversationRead = useCallback((convId) => {
    if (!convId) return
    setReadState((prev) => (prev ? markReadState(prev, convId) : prev))
    api.post('/api/inbox/read-state/read', { conversationKey: convId }).catch(() => {})
  }, [])

  const markConversationUnread = useCallback((convId) => {
    if (!convId) return
    setReadState((prev) => (prev ? markUnreadState(prev, convId) : prev))
    api.post('/api/inbox/read-state/unread', { conversationKey: convId }).catch(() => {})
  }, [])

  const isUnread = useCallback((conv) => isConversationUnread(conv, readState), [readState])

  const matchesGroup = useCallback(
    (conv) => contactFilter === 'Everyone' || normalizeContactType(conv.contact.type) === contactFilter,
    [contactFilter],
  )

  // ── Lead / customer filters (Leads and Customers tabs) ────────────────
  const filterEntity = inboxFilterEntity(contactFilter)
  const [entityFilters, setEntityFilters] = useState({
    lead: EMPTY_LEAD_FILTERS,
    customer: EMPTY_CUSTOMER_FILTERS,
  })
  const [filterPanelEntity, setFilterPanelEntity] = useState(null)
  const [filterOptions, setFilterOptions] = useState(null)
  const [filterOptionsLoading, setFilterOptionsLoading] = useState(false)
  const [filterMatch, setFilterMatch] = useState({ key: null, entity: null, ids: null, error: null })
  const activeEntityFilters = filterEntity ? entityFilters[filterEntity] : null
  const activeFilterCount = countInboxContactFilters(filterEntity, activeEntityFilters)

  const loadFilterOptions = useCallback(async () => {
    if (filterOptions || filterOptionsLoading) return
    setFilterOptionsLoading(true)
    const [locations, forms, reasons, teachers, memberships, packages, tags] = await Promise.all([
      api.get('/api/location?limit=200'),
      api.get('/api/formBuilder?page=1&limit=200'),
      api.get('/api/lead-reasons'),
      api.get('/api/teacher?limit=200&status=active'),
      api.get('/api/membership?limit=200'),
      api.get('/api/package?limit=200'),
      api.get('/api/customer/tags'),
    ])
    const list = (res) => (res?.success && Array.isArray(res.data) ? res.data : [])
    setFilterOptions({
      locations: list(locations),
      forms: forms?.success ? extractFormTemplatesList(forms) : [],
      leadReasons: reasons?.success ? extractLeadReasonsList(reasons) : [],
      teachers: list(teachers),
      memberships: list(memberships),
      packages: list(packages),
      tags: list(tags),
    })
    setFilterOptionsLoading(false)
  }, [filterOptions, filterOptionsLoading])

  const openFilterPanel = () => {
    if (!filterEntity) return
    loadFilterOptions()
    setFilterPanelEntity(filterEntity)
  }

  const applyEntityFilters = (entity, next) => {
    setEntityFilters((prev) => ({
      ...prev,
      [entity]: entity === 'lead' ? sanitizeLeadFilters(next) : sanitizeCustomerFilters(next),
    }))
    setFilterPanelEntity(null)
  }

  const clearEntityFilters = () => {
    if (!filterEntity) return
    applyEntityFilters(filterEntity, filterEntity === 'lead' ? EMPTY_LEAD_FILTERS : EMPTY_CUSTOMER_FILTERS)
  }

  const filterCandidateIds = useMemo(() => {
    if (!filterEntity || activeFilterCount === 0) return []
    return [
      ...new Set(
        filteredConversations
          .filter(matchesGroup)
          .flatMap((conv) => conversationEntityIds(conv, filterEntity)),
      ),
    ].sort()
  }, [filterEntity, activeFilterCount, filteredConversations, matchesGroup])

  const filterRequestKey =
    filterEntity && activeFilterCount > 0
      ? JSON.stringify([filterEntity, activeEntityFilters, filterCandidateIds])
      : null

  useEffect(() => {
    if (!filterRequestKey) return
    let cancelled = false
    const timer = setTimeout(() => {
      fetchMatchingEntityIds(filterEntity, activeEntityFilters, filterCandidateIds)
        .then((ids) => {
          if (!cancelled) setFilterMatch({ key: filterRequestKey, entity: filterEntity, ids, error: null })
        })
        .catch((e) => {
          if (!cancelled) {
            setFilterMatch({ key: filterRequestKey, entity: filterEntity, ids: null, error: e.message })
          }
        })
    }, 250)
    return () => {
      cancelled = true
      clearTimeout(timer)
    }
    // filterRequestKey captures every input below.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterRequestKey])

  const filterApplying = Boolean(filterRequestKey) && filterMatch.key !== filterRequestKey
  const filterError = filterRequestKey && filterMatch.key === filterRequestKey ? filterMatch.error : null
  // Keep showing the previous match while a refreshed one loads (new message, new thread).
  const filterMatchIds = filterRequestKey && filterMatch.entity === filterEntity ? filterMatch.ids : null

  const matchesEntityFilters = useCallback(
    (conv) => {
      if (!filterRequestKey) return true
      if (!filterMatchIds) return false
      return conversationEntityIds(conv, filterEntity).some((id) => filterMatchIds.has(id))
    },
    [filterRequestKey, filterMatchIds, filterEntity],
  )

  const groupConversations = useMemo(() => {
    const q = searchQuery.trim().toLowerCase()
    return filteredConversations.filter((conv) => {
      if (!matchesGroup(conv)) return false
      if (!matchesEntityFilters(conv)) return false
      if (!q) return true
      const haystack = [getContactDisplayName(conv.contact), conv.contact.phoneNumber, conv.contact.email]
        .filter(Boolean)
        .join(' ')
        .toLowerCase()
      const qDigits = q.replace(/\D/g, '')
      return haystack.includes(q) || (qDigits.length >= 3 && haystack.replace(/\D/g, '').includes(qDigits))
    })
  }, [filteredConversations, searchQuery, matchesGroup, matchesEntityFilters])

  // Unread shows only unread, plus the one you opened from here so it doesn't vanish mid-read.
  const displayedConversations = useMemo(() => {
    if (statusTab !== 'Unread') return groupConversations
    return groupConversations.filter((conv) => isUnread(conv) || conv.id === openedFromUnread)
  }, [groupConversations, statusTab, isUnread, openedFromUnread])

  const unreadInGroup = useMemo(
    () => groupConversations.filter((conv) => isUnread(conv)).length,
    [groupConversations, isUnread],
  )

  // ── Scheduled sends ─────────────────────────────────────────────────────
  const fetchScheduled = useCallback(async () => {
    setScheduledLoading(true)
    const res = await api.get('/api/inbox/scheduled')
    setScheduled(res.success && Array.isArray(res.data) ? res.data : [])
    setScheduledLoading(false)
  }, [])

  useEffect(() => {
    fetchScheduled()
  }, [fetchScheduled])

  const scheduledItems = useMemo(() => {
    const q = searchQuery.trim().toLowerCase()
    return scheduled
      .map((item) => {
        const first = item.recipients[0] || {}
        const bulk = item.recipientCount > 1
        const ch = item.channel === 'Email' ? 'email' : item.mediaUrl?.length ? 'MMS' : 'SMS'
        const knownConv = first._id
          ? conversations.find((c) => c.contact?.id && String(c.contact.id) === String(first._id))
          : null
        const types = new Set(
          item.recipients.map((r) =>
            normalizeContactType(r.type) ||
            (r._id ? '' : 'Other'),
          ),
        )
        if (knownConv) types.add(normalizeContactType(knownConv.contact.type))
        return {
          ...item,
          types,
          title: bulk
            ? item.label || `${item.recipientCount} people`
            : first.name || knownConv?.contact?.name || first.phoneNumber || first.email || 'Recipient',
          meta: bulk ? `Bulk ${ch} to ${item.recipientCount} people` : `Individual ${ch}`,
          preview: item.isHtml
            ? item.subject || 'Designed email'
            : item.channel === 'Email' && item.subject
              ? `${item.subject}: ${item.message}`
              : item.message,
        }
      })
      .filter((item) => contactFilter === 'Everyone' || item.types.has(contactFilter))
      .filter((item) => {
        if (!q) return true
        return [item.title, item.preview, ...item.recipients.map((r) => r.name)]
          .join(' ')
          .toLowerCase()
          .includes(q)
      })
  }, [scheduled, conversations, contactFilter, searchQuery])

  const selectedScheduled = scheduledItems.find((s) => s.id === selectedScheduledId) || null

  // Desktop: keep a scheduled item open while on the Scheduled tab.
  useEffect(() => {
    if (!isLgUp || statusTab !== 'Scheduled') return
    if (!selectedScheduled && scheduledItems.length) setSelectedScheduledId(scheduledItems[0].id)
  }, [isLgUp, statusTab, selectedScheduled, scheduledItems])

  const handleSaveScheduled = async (id, patch) => {
    const res = await api.patch(`/api/inbox/scheduled/${encodeURIComponent(id)}`, patch)
    if (!res.success) {
      toast.error({ title: 'Not saved', message: res.error || 'Could not update this message.' })
      if (res.status === 404) fetchScheduled()
      return false
    }
    toast.success({ title: 'Scheduled message updated' })
    fetchScheduled()
    return true
  }

  const handleCancelScheduled = async (id) => {
    const res = await api.delete(`/api/inbox/scheduled/${encodeURIComponent(id)}`)
    if (!res.success) {
      toast.error({ title: 'Not canceled', message: res.error || 'Could not cancel this send.' })
      if (res.status === 404) fetchScheduled()
      return
    }
    toast.success({ title: 'Send canceled', message: 'It won’t go out.' })
    setSelectedScheduledId(null)
    if (!isLgUp) setShowContactList(true)
    fetchScheduled()
  }

  // When the active filter/search hides the current conversation, clear selection.
  // Do NOT force the tab back to the selected contact's type — that blocked
  // switching between Customers / Leads / Teachers.
  useEffect(() => {
    if (!selectedConversation) return
    const stillVisible = displayedConversations.some((c) => c.id === selectedConversation)
    if (!stillVisible) {
      setSelectedConversation(null)
      setShowContactList(true)
    }
  }, [displayedConversations, selectedConversation])

  // Counts for header tabs (from current branch-filtered list)
  const inboxTypeCounts = useMemo(() => {
    const counts = {
      everyone: filteredConversations.length,
      customers: 0,
      leads: 0,
      teachers: 0,
      other: 0,
      unread: { everyone: 0, customers: 0, leads: 0, teachers: 0, other: 0 },
    }
    for (const c of filteredConversations) {
      const t = normalizeContactType(c.contact.type)
      const key = t === 'Customers' ? 'customers' : t === 'Leads' ? 'leads' : t === 'Teachers' ? 'teachers' : t === 'Other' ? 'other' : null
      if (key) counts[key] += 1
      if (isUnread(c)) {
        counts.unread.everyone += 1
        if (key) counts.unread[key] += 1
      }
    }
    return counts
  }, [filteredConversations, isUnread])
  useEffect(() => {
    setInboxCounts(inboxTypeCounts)
  }, [inboxTypeCounts, setInboxCounts])
  useEffect(() => {
    selectedConversationRef.current = selectedConversation
  }, [selectedConversation])

  // Fetch lead or customer profile when conversation changes
  useEffect(() => {
    if (!selectedConversation) {
      setSelectedLeadData(null)
      setSelectedContactKind(null)
      return
    }
    if (!selectedConversation.startsWith('lead-')) {
      setSelectedLeadData(null)
      setSelectedContactKind(null)
      return
    }
    const contactId = selectedConversation.replace('lead-', '')
    // Drop the previous profile immediately so the AI switch cannot be toggled
    // against the wrong person while this fetch is in flight.
    setSelectedLeadData(null)
    setSelectedContactKind(null)
    let cancelled = false

    ;(async () => {
      const leadRes = await api.get(`/api/lead/${contactId}`).catch(() => ({ success: false }))
      if (cancelled) return
      if (leadRes.success && leadRes.data) {
        const lead = leadRes.data
        setSelectedLeadData(lead)
        setSelectedContactKind('lead')
        setConversations((prev) =>
          prev.map((c) =>
            c.id === selectedConversation
              ? {
                  ...c,
                  contact: {
                    ...c.contact,
                    email: lead.email || c.contact.email,
                    phoneNumber: lead.phoneNumber || '',
                    stage: lead.stage || c.contact.stage,
                    name: nameWithMembers(lead) || c.contact.name,
                    type: resolveLeadProfileInboxType(lead, c.contact.type),
                    convertedCustomerID:
                      lead.convertedCustomerID || c.contact.convertedCustomerID || null,
                    linkedCustomerID: c.contact.linkedCustomerID || null,
                    leadSourceID: c.contact.leadSourceID || null,
                    locationID: lead.locationID || c.contact.locationID || [],
                  },
                }
              : c,
          ),
        )
        return
      }

      // Thread keyed by customer id (imported students, converted without lead row).
      const custRes = await api.get(`/api/customer/${contactId}`).catch(() => ({ success: false }))
      if (cancelled) return
      if (!custRes.success || !custRes.data) {
        setSelectedLeadData(null)
        setSelectedContactKind(null)
        return
      }
      const customer = custRes.data
      const effectiveOn = isCustomerAiRepliesEnabled(customer)
      setSelectedLeadData({
        ...customer,
        _id: customer._id,
        aiRepliesEnabled: effectiveOn,
        stage: customer.lifecycleStatus || 'converted',
      })
      setSelectedContactKind('customer')
      setConversations((prev) =>
        prev.map((c) =>
          c.id === selectedConversation
            ? {
                ...c,
                contact: {
                  ...c.contact,
                  email: customer.email || c.contact.email,
                  phoneNumber: customer.phoneNumber || c.contact.phoneNumber || '',
                  stage: customer.lifecycleStatus || c.contact.stage,
                  name: getContactDisplayName(customer) || c.contact.name,
                  type: 'Customer',
                  convertedCustomerID: customer._id,
                  linkedCustomerID: c.contact.linkedCustomerID || null,
                  leadSourceID: customer.leadSourceID || c.contact.leadSourceID || null,
                  locationID: customer.locationID || c.contact.locationID || [],
                },
              }
            : c,
        ),
      )
    })()

    return () => {
      cancelled = true
    }
  }, [selectedConversation])

  const selectedConvData = selectedConversation
    ? (displayedConversations.find((c) => c.id === selectedConversation) ||
      conversations.find((c) => c.id === selectedConversation))
    : null

  const conversationMessages = selectedConversation ? threadMessages[selectedConversation] || [] : []

  const revertOptimisticMessage = (convId, messageId) => {
    setThreadMessages((prev) => ({
      ...prev,
      [convId]: (prev[convId] || []).filter((m) => m.id !== messageId),
    }))
  }

  // Leads: off only when explicitly flipped. Customers: explicit flag or lifecycle default.
  // Human Intervention stops follow-ups/workflows; it does not silence live replies.
  const leadAiRepliesOn = (profile) => {
    if (!profile) return true
    if (selectedContactKind === 'customer') {
      return isCustomerAiRepliesEnabled(profile)
    }
    if (profile.aiRepliesEnabled === false) return false
    return true
  }

  const markAiPausedAfterStaffSend = (convId, leadData) => {
    if (!String(convId || '').startsWith('lead-') || !leadData?._id) return
    setSelectedLeadData((prev) =>
      prev && String(prev._id) === String(leadData._id)
        ? { ...prev, aiRepliesEnabled: false }
        : prev,
    )
    // Customer threads are keyed by customer id — pause that flag too (lead pause is a no-op).
    if (selectedContactKind === 'customer') {
      api
        .put(`/api/customer/${leadData._id}`, { aiRepliesEnabled: false })
        .catch(() => {})
    }
  }

  // The id check drops a late save response once staff have moved to another thread.
  const handleContactPatched = (contactId, patch) => {
    setSelectedLeadData((prev) =>
      prev && String(prev._id) === String(contactId) ? { ...prev, ...patch } : prev,
    )
  }

  const handleToggleAiReplies = async (next) => {
    const contactId = selectedLeadData?._id
    if (!contactId || aiToggleSaving) return
    const previous = selectedLeadData
    const kind = selectedContactKind || 'lead'
    const stillThis = (prev) => prev && String(prev._id) === String(contactId)
    setSelectedLeadData((prev) =>
      stillThis(prev) ? { ...prev, aiRepliesEnabled: next } : prev,
    )
    setAiToggleSaving(true)
    try {
      const path =
        kind === 'customer'
          ? `/api/customer/${contactId}`
          : `/api/lead/${contactId}`
      const result = await api.put(path, { aiRepliesEnabled: next })
      if (!result.success) {
        setSelectedLeadData((prev) => (stillThis(prev) ? previous : prev))
        toast.error({
          title: 'Could not update AI replies',
          message: result.error || 'Try again.',
        })
        return
      }
      const saved = result.data
      if (saved && String(saved._id) === String(contactId)) {
        setSelectedLeadData((prev) => {
          if (!stillThis(prev)) return prev
          if (kind === 'customer') {
            return {
              ...prev,
              ...saved,
              aiRepliesEnabled: next,
              stage: saved.lifecycleStatus || saved.stage || prev.stage,
            }
          }
          return { ...saved, aiRepliesEnabled: next }
        })
      }
      toast.success({
        title: next ? 'AI replies on' : 'AI replies off',
        message: next
          ? 'The agent will reply to this contact again.'
          : 'The agent will stay quiet until you turn this back on.',
      })
    } catch (err) {
      setSelectedLeadData((prev) => (stillThis(prev) ? previous : prev))
      toast.error({
        title: 'Could not update AI replies',
        message: err?.message || 'Try again.',
      })
    } finally {
      setAiToggleSaving(false)
    }
  }

  const handleSendMessage = async ({
    content,
    subject,
    channel,
    scheduleNow = true,
    scheduleDate = null,
    contentHtml = null,
    // New message pane: send to a conversation that may not be in state yet.
    target = null,
  }) => {
    const convId = target?.convId || selectedConversationRef.current || selectedConversation
    if (!convId || !(String(contentHtml || content || '').trim())) return false

    const convFromUI = target
      ? { contact: target.contact, channel }
      : displayedConversations.find((c) => c.id === convId) || conversations.find((c) => c.id === convId)
    // Profile data only counts when it belongs to this thread — it can lag a conversation switch.
    const leadData =
      !target && selectedLeadData && convId === `lead-${selectedLeadData._id}` ? selectedLeadData : null

    // If the user just created a new conversation and sends immediately, the state update
    // from `handleNewConversation` may not have landed yet. In that case we still want
    // to optimistically create/update the conversation row.
    const fallbackContact = convFromUI?.contact || { id: convId, name: 'New conversation', type: 'Lead' }
    const effectiveChannel = channel || convFromUI?.channel || 'SMS'

    if (effectiveChannel === 'Email') {
      const leadRecipient = buildLeadRecipient(fallbackContact, leadData)
      const validationError = validateEmailSendInput({
        lead: leadRecipient,
        subject,
        content,
        html: contentHtml,
        scheduleNow,
        scheduleDate,
      })
      if (validationError) {
        toast.error({ title: 'Cannot send email', message: validationError })
        return false
      }
    } else if (scheduleNow === false) {
      if (!scheduleDate) {
        toast.error({
          title: 'Cannot send SMS',
          message: 'scheduleDate is required when scheduling for later',
        })
        return false
      }
      const when = new Date(scheduleDate)
      if (Number.isNaN(when.getTime()) || when.getTime() <= Date.now()) {
        toast.error({
          title: 'Cannot send SMS',
          message: 'scheduleDate must be a valid future datetime',
        })
        return false
      }
    }

    const messageId = `${Date.now()}`
    const leadRecipient = buildLeadRecipient(fallbackContact, leadData)
    const personalizedContent =
      effectiveChannel === 'SMS'
        ? applyEmailTemplate(String(content || '').trim(), leadRecipient)
        : String(content || '').trim()
    // Optimistic bubble: personalize HTML locally; backend also personalizes on send.
    const personalizedHtml =
      contentHtml && effectiveChannel === 'Email'
        ? applyEmailTemplate(String(contentHtml).trim(), leadRecipient)
        : null
    // Send raw template HTML so the server can personalize (and track) per recipient.
    const htmlForSend =
      contentHtml && effectiveChannel === 'Email'
        ? String(contentHtml).trim()
        : null
    const displayContent =
      personalizedContent || htmlToPlainText(personalizedHtml || '')
    const newMessage = {
      id: messageId,
      sender: 'You',
      direction: 'outbound',
      content: displayContent,
      contentHtml: personalizedHtml || undefined,
      subject: effectiveChannel === 'Email' ? (subject || '').trim() : undefined,
      timestamp: new Date().toISOString(),
      channel: effectiveChannel,
    }

    // Replying means it's been read. Scheduled sends wait in the Scheduled tab, not the thread.
    markConversationRead(convId)
    if (scheduleNow !== false) {
      setThreadMessages((prev) => ({
        ...prev,
        [convId]: [...(prev[convId] || []), newMessage],
      }))
      setConversations((prev) => {
        const exists = prev.some((c) => c.id === convId)
        const nextRow = {
          id: convId,
          contact: fallbackContact,
          lastMessage:
            effectiveChannel === 'Email'
              ? subject || displayContent
              : displayContent,
          timestamp: newMessage.timestamp,
          unread: 0,
          channel: effectiveChannel,
        }

        const updated = exists
          ? prev.map((c) => (c.id === convId ? { ...c, ...nextRow } : c))
          : [nextRow, ...prev]

        return [...updated].sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
      })
    }

    if (effectiveChannel === 'Email') setEmailSending(true)
    else setSmsSending(true)

    try {
      if (isTalkToAssistant) {
        const fromNumber =
          leadData?.phoneNumber ||
          fallbackContact?.phoneNumber ||
          null
        const locationRaw = leadData?.locationID
        const locationID = Array.isArray(locationRaw)
          ? String(locationRaw[0]?._id ?? locationRaw[0] ?? '')
          : String(locationRaw?._id ?? locationRaw ?? '')

        if (!fromNumber) {
          revertOptimisticMessage(convId, messageId)
          toast.error({
            title: 'Missing phone',
            message: 'Select a lead with a phone number to message the assistant.',
          })
          return false
        }
        if (!locationID) {
          revertOptimisticMessage(convId, messageId)
          toast.error({
            title: 'Missing studio',
            message: 'Assign the lead to a studio, then add that studio’s phone in Settings → Studio.',
          })
          return false
        }

        const locationResult = await api.get(`/api/location/${encodeURIComponent(locationID)}`)
        const studio = locationResult?.data
        const toNumber = studio?.phoneNumber
        if (!locationResult.success || !toNumber || studio?.phoneStatus !== 'connected') {
          revertOptimisticMessage(convId, messageId)
          toast.error({
            title: 'Studio phone not connected',
            message: 'Add a Twilio number for this studio in Settings → Studio.',
          })
          return false
        }

        const assistantResult = await api.post('/api/sms/incoming_sms', {
          From: fromNumber,
          To: toNumber,
          Body: personalizedContent || content.trim(),
          MessageSid: `web-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`,
        })
        const assistantReply =
          assistantResult?.data?.Response ||
          assistantResult?.data?.data?.Response ||
          assistantResult?.Response
        if (assistantReply && String(assistantReply).trim()) {
          const replyTimestamp = new Date().toISOString()
          const inboundMessage = {
            id: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
            sender: 'Assistant',
            direction: 'inbound',
            content: String(assistantReply).trim(),
            timestamp: replyTimestamp,
            channel: 'SMS',
          }

          setThreadMessages((prev) => ({
            ...prev,
            [convId]: [...(prev[convId] || []), inboundMessage],
          }))

          setConversations((prev) => {
            const updated = prev.map((c) =>
              c.id === convId
                ? {
                    ...c,
                    lastMessage: inboundMessage.content,
                    timestamp: replyTimestamp,
                    channel: 'SMS',
                  }
                : c
            )
            return [...updated].sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
          })
        }
        return true
      } else if (effectiveChannel === 'SMS') {
        const phoneNumber = leadData?.phoneNumber || fallbackContact.phoneNumber
        if (!phoneNumber) {
          revertOptimisticMessage(convId, messageId)
          toast.error({
            title: 'Missing phone',
            message: 'This contact has no phone number on file.',
          })
          return false
        }

        const locationRaw = leadData?.locationID ?? fallbackContact.locationID
        const locationIDs = Array.isArray(locationRaw)
          ? locationRaw.map((l) => String(l?._id ?? l)).filter(Boolean)
          : locationRaw
            ? [String(locationRaw?._id ?? locationRaw)]
            : []

        const result = await api.post('/api/sms/send-one', {
          lead: {
            _id: fallbackContact.id || leadData?._id,
            phoneNumber,
            name: getContactDisplayName(leadData || fallbackContact),
            stage: leadData?.stage || fallbackContact.stage || '',
            locationID: locationIDs,
            email: leadData?.email || fallbackContact.email || '',
            location: leadData?.location || fallbackContact.location || '',
            type: fallbackContact.type || '',
          },
          message: personalizedContent,
          scheduleNow,
          scheduleDate,
        })
        if (!result.success) {
          revertOptimisticMessage(convId, messageId)
          toast.error({
            title: 'SMS not sent',
            message: result.error || 'Could not send SMS. Check the studio phone is connected.',
          })
          return false
        }
        toast.success({
          title: scheduleNow ? 'SMS sent' : 'SMS scheduled',
          message: scheduleNow
            ? result.message || 'SMS sent successfully'
            : 'Find it under Scheduled until it sends.',
        })
        if (!scheduleNow) fetchScheduled()
        markAiPausedAfterStaffSend(convId, leadData)
        return true
      } else if (effectiveChannel === 'Email') {
        const payload = buildSendOneEmailPayload({
          lead: leadRecipient,
          subject,
          content: personalizedContent,
          html: htmlForSend,
          scheduleNow,
          scheduleDate,
          useTemplate: Boolean(htmlForSend),
        })
        const preferredLocationID = payload.preferredLocationID || null
        const result = await api.post(
          '/api/email/send-one',
          payload,
          preferredLocationID
            ? { headers: { 'x-location-id': preferredLocationID } }
            : {},
        )
        if (!result.success) {
          revertOptimisticMessage(convId, messageId)
          toast.error({
            title: 'Email not sent',
            message: result.error || 'Could not send email.',
          })
          return false
        }
        toast.success({
          title: scheduleNow ? 'Email sent' : 'Email scheduled',
          message: scheduleNow
            ? result.message || 'Email sent successfully'
            : 'Find it under Scheduled until it sends.',
        })
        if (!scheduleNow) fetchScheduled()
        markAiPausedAfterStaffSend(convId, leadData)
        return true
      }
      return false
    } catch (e) {
      console.error('Failed to queue message:', e)
      revertOptimisticMessage(convId, messageId)
      toast.error({
        title: effectiveChannel === 'Email' ? 'Email not sent' : 'SMS not sent',
        message: 'Something went wrong. Please try again.',
      })
      return false
    } finally {
      if (effectiveChannel === 'Email') setEmailSending(false)
      else setSmsSending(false)
    }
  }

  const handleNewMessageSend = async ({ recipient: pickedRecipient, channel, message, subject, inboxName }) => {
    const recipient = pickedRecipient
    let convId
    let contact
    if (recipient.kind === 'contact') {
      const c = recipient.contact
      convId = `lead-${c._id}`
      // The same person can be a lead and a customer (two ids); the list shows one row,
      // keyed by the lead. Reuse it instead of opening a second thread under the other id.
      const ids = new Set([c._id, c.convertedCustomerID, c.leadSourceID].filter(Boolean).map(String))
      const existingConv = conversations.find((conv) => {
        const k = conv.contact || {}
        return [k.id, k.linkedCustomerID, k.convertedCustomerID, k.leadSourceID].some((v) => v && ids.has(String(v)))
      })
      if (existingConv) convId = existingConv.id
      contact = existingConv ? { ...existingConv.contact } : {
        id: c._id,
        name: getContactDisplayName(c),
        type: resolveContactType(c),
        stage: c.stage || '',
        nextVisit: '',
        phoneNumber: c.phoneNumber || '',
        email: c.email || '',
        locationID: c.locationID || [],
        convertedCustomerID: c.convertedCustomerID || null,
      }
    } else if (recipient.kind === 'number') {
      convId = numberConversationId(recipient.phoneNumber)
      const existing = conversations.find((c) => c.id === convId)
      contact = {
        id: null,
        name: inboxName || existing?.contact?.name || '',
        type: 'Other',
        phoneNumber: recipient.phoneNumber,
        email: '',
        locationID: existing?.contact?.locationID || [],
      }
    } else {
      convId = `email-${recipient.email.replace(/\W/g, '_')}`
      contact = { id: null, name: recipient.email, type: 'Other', phoneNumber: '', email: recipient.email, locationID: [] }
    }

    const existed = conversations.some((c) => c.id === convId)
    const ok = await handleSendMessage({ content: message, subject, channel, target: { convId, contact } })
    if (!ok) {
      if (!existed) setConversations((prev) => prev.filter((c) => c.id !== convId))
      return false
    }

    selectedConversationRef.current = convId
    setSelectedConversation(convId)
    setRightView('thread')
    setStatusTab('All')
    setSearchQuery('')
    setShowContactList(false)
    // Make sure the new thread is visible under the current header tab.
    const typeLabel = normalizeContactType(contact.type) || 'Leads'
    if (contactFilter !== 'Everyone' && typeLabel !== contactFilter) {
      setContactFilter(typeLabel)
      const params = new URLSearchParams(searchParams?.toString() || '')
      params.set('filter', inboxFilterParamForType(typeLabel))
      router.replace(`${pathname}?${params.toString()}`)
    }
    if (convId.startsWith('lead-') || convId.startsWith('sms-')) {
      fetchLeadMessages(convId, 1, { contact })
    } else if (existed) {
      fetchConversationEmailHistory(convId)
    }
    return true
  }

  const handleMarkUnread = () => {
    if (!selectedConversation) return
    markConversationUnread(selectedConversation)
    toast.success({ title: 'Marked unread', message: 'It stays in Unread for the studio until someone opens it again.' })
  }

  const handleRenameContact = async (name) => {
    const conv = conversations.find((c) => c.id === selectedConversation)
    const phoneNumber = conv?.contact?.phoneNumber
    const email = conv?.contact?.email
    const inboxContactID = conv?.contact?.inboxContactID
    const leadId = conv?.contact?.id
    if (!phoneNumber && !email && !inboxContactID && !leadId) return false
    // A lead is renamed on the lead record; a bare number/email on its inbox contact.
    const res = leadId
      ? await api.put(`/api/lead/${leadId}`, { name })
      : await api.put('/api/inbox/contacts', {
          ...(inboxContactID ? { inboxContactID } : {}),
          ...(phoneNumber ? { phoneNumber } : {}),
          ...(email ? { email } : {}),
          name,
        })
    if (!res.success) {
      toast.error({ title: 'Name not saved', message: res.error || 'Try again.' })
      return false
    }
    setConversations((prev) =>
      prev.map((c) => (c.id === conv.id ? { ...c, contact: { ...c.contact, name } } : c)),
    )
    toast.success({ title: name ? 'Name saved' : 'Name removed' })
    return true
  }

  const handlePromoteToLead = async () => {
    const conv = conversations.find((c) => c.id === selectedConversation)
    const inboxContactID = conv?.contact?.inboxContactID
    const phoneNumber = conv?.contact?.phoneNumber
    const email = conv?.contact?.email
    if (!inboxContactID && !phoneNumber && !email) {
      toast.error({
        title: 'Cannot promote',
        message: 'This Other contact has no saved inbox record yet. Send a message first, then try again.',
      })
      return
    }
    setPromoteSaving(true)
    try {
      const res = inboxContactID
        ? await api.post(`/api/inbox/contacts/${encodeURIComponent(inboxContactID)}/promote`, {})
        : await api.post('/api/inbox/contacts/promote', {
            ...(phoneNumber ? { phoneNumber } : {}),
            ...(email ? { email } : {}),
          })
      if (!res.success) {
        toast.error({ title: 'Promote failed', message: res.error || 'Try again.' })
        return
      }
      const leadID = res.data?.leadID || res.data?.lead?._id
      toast.success({
        title: 'Moved to Leads',
        message: 'This contact is now a lead. Campaigns and the agent can run on the next message.',
      })
      await fetchInboxData()
      if (leadID) {
        const nextId = `lead-${leadID}`
        selectedConversationRef.current = nextId
        setSelectedConversation(nextId)
        setContactFilter('Leads')
      }
    } finally {
      setPromoteSaving(false)
    }
  }

  const filterRecordsByRecipient = (records, contactEmail) => {
    const normalized = normalizeEmailAddress(contactEmail)
    if (!normalized) return records
    return records.filter((r) => {
      const to = normalizeEmailAddress(r.to || r.email || r.leadID?.email)
      const from = normalizeEmailAddress(r.from)
      // Outbound stores the lead in `to`; inbound replies store the lead in `from`.
      return to === normalized || from === normalized
    })
  }

  const fetchConversationEmailHistory = useCallback(async (conversationId) => {
    if (!conversationId) return
    if (emailHistoryLoadedRef.current.has(conversationId)) return
    emailHistoryLoadedRef.current.add(conversationId)

    const conv = conversations.find((c) => c.id === conversationId)
    const contactEmail = conv?.contact?.email || ''
    const linkedCustomerId = linkedCustomerIdForConversation(conv)

    try {
      let records = []
      const allRes = await api.get('/api/emailHistory?limit=200')
      const allRecords = Array.isArray(allRes.data) ? allRes.data : []

      if (conversationId.startsWith('lead-')) {
        const leadID = conversationId.replace('lead-', '')
        const historyIds = [leadID, linkedCustomerId].filter(Boolean)
        const byIdResults = await Promise.all(
          historyIds.map((id) => api.get(`/api/emailHistory?leadID=${id}&limit=200`)),
        )
        const byIdRecords = byIdResults.flatMap((res) =>
          Array.isArray(res.data) ? res.data : [],
        )
        const byEmail = filterRecordsByRecipient(allRecords, contactEmail)
        const seen = new Set()
        records = [...byIdRecords, ...byEmail].filter((r) => {
          if (seen.has(r._id)) return false
          seen.add(r._id)
          return true
        })
      } else if (conversationId.startsWith('email-') && contactEmail) {
        records = filterRecordsByRecipient(allRecords, contactEmail)
      }

      const emailMsgs = records.map((r) =>
        mapEmailHistoryRecord(r, conv?.contact?.name || null),
      )
      setThreadMessages((prev) => {
        const existing = prev[conversationId] || []
        const smsOnly = existing.filter((m) => m.channel === 'SMS')
        const callOnly = existing.filter((m) => m.channel === 'Call')
        // A just-sent email is queued — keep its bubble until history has it.
        const pendingEmail = existing.filter(
          (m) => m.channel === 'Email' && isOptimisticUnconfirmed(m, emailMsgs),
        )
        return {
          ...prev,
          [conversationId]: mergeThreadByTimestamp(smsOnly, [...emailMsgs, ...pendingEmail], callOnly),
        }
      })
    } catch (e) {
      emailHistoryLoadedRef.current.delete(conversationId)
      console.error('Failed to load email history:', e)
    }
  }, [conversations])

  const fetchConversationCallHistory = useCallback(async (conversationId, { force = false } = {}) => {
    if (!conversationId) return

    const conv =
      conversations.find((c) => c.id === conversationId) ||
      null
    // Only real lead threads get a leadID filter — never pass email/sms contact ids
    // (invalid ObjectIds used to fall through and return org-wide call history).
    const leadID = conversationId.startsWith('lead-')
      ? conversationId.replace('lead-', '')
      : null
    const phoneNumber = String(
      conv?.contact?.phoneNumber ||
      (conversationId.startsWith('lead-') && selectedLeadData?._id &&
        String(selectedLeadData._id) === String(leadID)
        ? selectedLeadData.phoneNumber
        : '') ||
      '',
    ).trim()
    const cacheKey = `${conversationId}::${phoneNumber || 'nophone'}`

    // Call logs are phone-based. Email-only contacts must not show anyone else's history.
    if (!phoneNumber) {
      setThreadMessages((prev) => {
        const existing = prev[conversationId] || []
        if (!existing.some((m) => m.channel === 'Call')) return prev
        return {
          ...prev,
          [conversationId]: existing.filter((m) => m.channel !== 'Call'),
        }
      })
      callHistoryLoadedRef.current.add(cacheKey)
      callHistoryInFlightRef.current = null
      setCallLogsLoading(false)
      return
    }

    if (!force) {
      if (callHistoryInFlightRef.current === conversationId) return
      if (callHistoryLoadedRef.current.has(cacheKey)) return
    }

    const requestId = (callHistoryRequestIdRef.current[conversationId] || 0) + 1
    callHistoryRequestIdRef.current[conversationId] = requestId

    callHistoryInFlightRef.current = conversationId
    setCallLogsLoading(true)
    try {
      // Phone gate above already ensures this contact is dialable. Prefer leadID
      // for lead threads so number-format mismatches don't hide real history;
      // fall back to phone for sms-/orphan threads.
      const humanParams = new URLSearchParams({ limit: '100' })
      if (leadID) humanParams.set('leadID', String(leadID))
      else humanParams.set('phoneNumber', phoneNumber)

      const forwardParams = new URLSearchParams({ limit: '100', phoneNumber })
      const customerId =
        conv?.contact?.type === 'Customer' || conv?.contact?.type === 'customer'
          ? String(conv?.contact?.id || conv?.contact?._id || '').trim()
          : ''
      if (customerId && /^[a-f\d]{24}$/i.test(customerId)) {
        forwardParams.set('customerID', customerId)
      }

      const aiCallUrl = leadID
        ? `/api/ai-calling?leadID=${encodeURIComponent(leadID)}&limit=100`
        : phoneNumber
          ? `/api/ai-calling?phoneNumber=${encodeURIComponent(phoneNumber)}&limit=100`
          : null

      const [humanRes, aiRes, forwardRes] = await Promise.all([
        api.get(`/api/human-call/history?${humanParams.toString()}`),
        aiCallUrl
          ? api.get(aiCallUrl)
          : Promise.resolve({ success: false, data: [] }),
        api.get(`/api/inbound-call/history?${forwardParams.toString()}`).catch(() => ({
          success: false,
          data: [],
        })),
      ])

      if (callHistoryRequestIdRef.current[conversationId] !== requestId) return

      const humanCalls = Array.isArray(humanRes.data) ? humanRes.data : []
      const aiCalls = Array.isArray(aiRes.data) ? aiRes.data : []
      const forwardedCalls = Array.isArray(forwardRes.data) ? forwardRes.data : []
      // Only Inbox Others draw inbound AI calls on the left; lead/customer stay right.
      const treatInboundAsInbound =
        String(conv?.contact?.type || '').toLowerCase() === 'other'

      const callMsgs = [
        ...humanCalls.map(mapHumanCallToMessage),
        ...aiCalls.map((call) => mapAiCallToMessage(call, { treatInboundAsInbound })),
        ...forwardedCalls.map(mapForwardedCallToMessage),
      ].sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp))

      setThreadMessages((prev) => {
        const existing = prev[conversationId] || []
        const smsOnly = existing.filter((m) => m.channel === 'SMS')
        const emailOnly = existing.filter((m) => m.channel === 'Email')
        // Keep recording flags if a later refresh races ahead of Twilio webhook.
        const priorCalls = existing.filter((m) => m.channel === 'Call')
        const priorByRecordId = new Map(
          priorCalls
            .filter((m) => m.callRecordId)
            .map((m) => [String(m.callRecordId), m]),
        )
        const priorById = new Map(priorCalls.map((m) => [String(m.id), m]))
        const mergedCalls = callMsgs.map((msg) => {
          const prior =
            (msg.callRecordId && priorByRecordId.get(String(msg.callRecordId))) ||
            priorById.get(String(msg.id))
          if (prior?.hasRecording && !msg.hasRecording) {
            return {
              ...msg,
              hasRecording: true,
              recordingUrl: msg.recordingUrl || prior.recordingUrl || '',
              callRecordId: msg.callRecordId || prior.callRecordId || null,
            }
          }
          return msg
        })
        return {
          ...prev,
          [conversationId]: mergeThreadByTimestamp(smsOnly, emailOnly, mergedCalls),
        }
      })
      callHistoryLoadedRef.current.add(cacheKey)
    } catch (e) {
      if (callHistoryRequestIdRef.current[conversationId] === requestId) {
        callHistoryLoadedRef.current.delete(cacheKey)
      }
      console.error('Failed to load call history:', e)
    } finally {
      if (callHistoryRequestIdRef.current[conversationId] === requestId) {
        if (callHistoryInFlightRef.current === conversationId) {
          callHistoryInFlightRef.current = null
        }
        setCallLogsLoading(false)
      }
    }
  }, [conversations, selectedLeadData])

  const scheduleCallLogRefresh = useCallback((conversationId) => {
    if (!conversationId) return
    // Per-conversation timers — ending a new call must not cancel backfill for
    // an earlier conversation (or wipe a pending recording refresh).
    const timersMap = callLogRefreshTimersRef.current
    const existing = timersMap.get(conversationId) || []
    existing.forEach((t) => clearTimeout(t))

    const run = () => {
      invalidateCallHistoryCache(conversationId)
      fetchConversationCallHistory(conversationId, { force: true })
    }
    run()
    // Twilio often finalizes conference recordings a few seconds after hangup.
    timersMap.set(conversationId, [
      setTimeout(run, 2500),
      setTimeout(run, 6000),
      setTimeout(run, 12000),
    ])
  }, [fetchConversationCallHistory, invalidateCallHistoryCache])

  useEffect(() => () => {
    callLogRefreshTimersRef.current.forEach((timers) => {
      timers.forEach((t) => clearTimeout(t))
    })
    callLogRefreshTimersRef.current.clear()
  }, [])

  useEffect(() => {
    activeOutboundConnectionRef.current = activeOutboundConnection
  }, [activeOutboundConnection])
  useEffect(() => {
    activeOutboundCallRef.current = activeOutboundCall
  }, [activeOutboundCall])

  const handleCallTabActive = useCallback(() => {
    const convId = selectedConversationRef.current || selectedConversation
    if (convId) fetchConversationCallHistory(convId)
  }, [selectedConversation, fetchConversationCallHistory])

  const handleEmailTabActive = useCallback(() => {
    const convId = selectedConversationRef.current || selectedConversation
    if (convId?.startsWith('lead-') || convId?.startsWith('email-')) {
      fetchConversationEmailHistory(convId)
    }
  }, [selectedConversation, fetchConversationEmailHistory])

  const clearOutboundCallUi = useCallback(() => {
    setActiveOutboundCall(null)
    setActiveOutboundConnection(null)
    setOutboundStatus('connecting')
  }, [setOutboundStatus])

  const handleEndOutboundCall = useCallback(async (opts = {}) => {
    const remoteHangup = Boolean(opts && opts.remoteHangup === true)
    if (endingOutboundRef.current) return
    endingOutboundRef.current = true
    outboundAttemptRef.current += 1
    const callId = activeOutboundCallRef.current?.id || activeOutboundCall?.id || activeOutboundCall?._id
    try {
      const { disconnectConnection } = await import('@/lib/twilioVoiceClient')
      disconnectConnection(activeOutboundConnectionRef.current || activeOutboundConnection)
      if (isPersistedCallId(callId)) {
        await api.post(`/api/human-call/${callId}/end`)
      }
    } catch (e) {
      console.error(e)
    } finally {
      clearOutboundCallUi()
      const convId = selectedConversationRef.current || selectedConversation
      scheduleCallLogRefresh(convId)
      toast.success({
        title: 'Call ended',
        message: remoteHangup
          ? 'The other party disconnected. Updating call log…'
          : 'You ended the call. Updating call log…',
      })
      setTimeout(() => {
        endingOutboundRef.current = false
      }, 500)
    }
  }, [
    activeOutboundCall,
    activeOutboundConnection,
    clearOutboundCallUi,
    selectedConversation,
    scheduleCallLogRefresh,
    toast,
  ])

  useEffect(() => {
    endOutboundCallRef.current = handleEndOutboundCall
  }, [handleEndOutboundCall])

  const handlePlaceCall = useCallback(async () => {
    const convId = selectedConversationRef.current || selectedConversation
    if (!convId) return
    if (activeOutboundCall) {
      toast.error({
        title: 'Call in progress',
        message: 'End the current call before placing another.',
      })
      return
    }

    const conv =
      displayedConversations.find((c) => c.id === convId) ||
      conversations.find((c) => c.id === convId)
    const contact = {
      ...(conv?.contact || {}),
      ...(selectedLeadData || {}),
    }
    const phoneNumber = contact.phoneNumber || conv?.contact?.phoneNumber
    if (!phoneNumber) {
      toast.error({
        title: 'Missing phone',
        message: 'This contact has no phone number on file.',
      })
      return
    }

    setCallPlacing(true)
    endingOutboundRef.current = false
    const attempt = ++outboundAttemptRef.current
    const displayName = getContactDisplayName(contact)
    setActiveOutboundCall({
      id: `pending-${Date.now()}`,
      name: displayName,
      leadName: displayName,
      callerName: displayName,
      phone: phoneNumber,
      phoneNumber,
      callerPhone: phoneNumber,
      initiatedAt: new Date().toISOString(),
      createdAt: new Date().toISOString(),
    })
    setOutboundStatus('connecting')
    let callHistoryId = null
    try {
      const locationRaw = contact.locationID || selectedLeadData?.locationID || []
      const locationIDs = Array.isArray(locationRaw)
        ? locationRaw.map((l) => String(l?._id ?? l)).filter(Boolean)
        : locationRaw
          ? [String(locationRaw?._id ?? locationRaw)]
          : []
      const leadPayload = {
        _id: contact._id || contact.id || (convId.startsWith('lead-') ? convId.replace('lead-', '') : undefined),
        phoneNumber,
        name: getContactDisplayName(contact),
        locationID: locationIDs,
      }
      const result = await api.post('/api/human-call/call-now', { lead: leadPayload })
      if (!result.success) {
        throw new Error(result.error || 'Could not place the call.')
      }
      if (attempt !== outboundAttemptRef.current) {
        const cancelledId = result.data?.callHistoryId || result.data?.call?._id
        if (isPersistedCallId(cancelledId)) api.post(`/api/human-call/${cancelledId}/end`).catch(() => {})
        return
      }

      const conferenceName = result.data?.conferenceName
      callHistoryId = result.data?.callHistoryId || result.data?.call?._id
      const fromNumber = result.data?.from || ''

      const panelCall = {
        id: callHistoryId,
        _id: callHistoryId,
        name: displayName,
        leadName: displayName,
        callerName: displayName,
        phone: phoneNumber,
        phoneNumber,
        callerPhone: phoneNumber,
        fromNumber,
        conferenceName,
        initiatedAt: new Date().toISOString(),
        createdAt: new Date().toISOString(),
      }

      setActiveOutboundCall(panelCall)
      setOutboundStatus('connecting')

      if (conferenceName) {
        try {
          const {
            joinConferenceCall,
            subscribeToConnectionEvents,
            disconnectConnection,
          } = await import('@/lib/twilioVoiceClient')
          const connection = await joinConferenceCall({
            fetchToken: () => api.get('/api/human-call/voice-token'),
            conferenceName,
            callHistoryId,
          })
          if (attempt !== outboundAttemptRef.current) {
            disconnectConnection(connection)
            if (isPersistedCallId(callHistoryId)) api.post(`/api/human-call/${callHistoryId}/end`).catch(() => {})
            return
          }
          setActiveOutboundConnection(connection)
          subscribeToConnectionEvents(connection, {
            accept: () => {},
            disconnect: () => {
              if (endingOutboundRef.current) return
              setActiveOutboundConnection(null)
            },
            cancel: () => {
              if (endingOutboundRef.current) return
              setActiveOutboundConnection(null)
            },
            error: () => {
              toast.error({
                title: 'Call audio error',
                message: 'Browser call connection failed. Check microphone permissions.',
              })
            },
          })
        } catch (voiceErr) {
          console.error(voiceErr)
          toast.error({
            title: 'Browser audio failed',
            message:
              voiceErr?.message ||
              'Could not connect your browser mic. The dialer stayed open so you can hang up.',
          })
        }
      }

      const callRecord = result.data?.call
      const callMsg = callRecord
        ? mapHumanCallToMessage({ ...callRecord, fromNumber: callRecord.fromNumber || fromNumber })
        : {
            id: `human-call-${result.data?.sid || Date.now()}`,
            callRecordId: callHistoryId ? String(callHistoryId) : null,
            sender: 'You',
            direction: 'outbound',
            content: `Outbound call${fromNumber ? ` from ${fromNumber}` : ''} · initiated`,
            timestamp: new Date().toISOString(),
            channel: 'Call',
            callKind: 'human',
            status: 'initiated',
            phoneNumber,
            fromNumber,
            hasRecording: false,
          }

      invalidateCallHistoryCache(convId)

      setThreadMessages((prev) => {
        const existing = prev[convId] || []
        const withoutDup = existing.filter((m) => m.id !== callMsg.id)
        return {
          ...prev,
          [convId]: mergeThreadByTimestamp(
            withoutDup.filter((m) => m.channel === 'SMS'),
            withoutDup.filter((m) => m.channel === 'Email'),
            [...withoutDup.filter((m) => m.channel === 'Call'), callMsg],
          ),
        }
      })

      setConversations((prev) => {
        const exists = prev.some((c) => c.id === convId)
        const nextRow = {
          id: convId,
          contact: conv?.contact || {
            id: leadPayload._id,
            name: leadPayload.name,
            type: resolveContactType(contact),
            phoneNumber,
            email: contact.email || '',
          },
          lastMessage: callMsg.content,
          timestamp: callMsg.timestamp,
          unread: 0,
          channel: 'Call',
        }
        const updated = exists
          ? prev.map((c) => (c.id === convId ? { ...c, ...nextRow } : c))
          : [nextRow, ...prev]
        return [...updated].sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
      })

      toast.success({
        title: 'Calling…',
        message: fromNumber
          ? `Dialing ${phoneNumber} from studio ${fromNumber}. Use the call panel to mute or hang up.`
          : `Dialing ${phoneNumber} from your studio number.`,
      })
    } catch (e) {
      console.error(e)
      if (attempt !== outboundAttemptRef.current) return
      if (!callHistoryId) clearOutboundCallUi()
      toast.error({
        title: 'Call failed',
        message: e.message || 'Something went wrong placing the call.',
      })
    } finally {
      setCallPlacing(false)
    }
  }, [
    activeOutboundCall,
    selectedConversation,
    displayedConversations,
    conversations,
    selectedLeadData,
    setOutboundStatus,
    toast,
    clearOutboundCallUi,
    scheduleCallLogRefresh,
  ])

  // Poll so contact hangup closes the CRM panel even if the Voice SDK lag.
  useEffect(() => {
    const callId = activeOutboundCall?.id || activeOutboundCall?._id
    if (!isPersistedCallId(callId)) return undefined

    let cancelled = false

    const poll = async () => {
      try {
        if (endingOutboundRef.current) return
        const res = await api.get(`/api/human-call/${callId}`)
        if (cancelled || endingOutboundRef.current || !res.success || !res.data) return
        const next = nextOutboundPanelStatus(res.data.status, outboundCallStatusRef.current)
        if (next === 'ended') {
          endOutboundCallRef.current?.({ remoteHangup: true })
          return
        }
        if (next !== outboundCallStatusRef.current) setOutboundStatus(next)
      } catch (e) {
        console.error(e)
      }
    }

    const interval = setInterval(poll, 1000)
    poll()
    return () => {
      cancelled = true
      clearInterval(interval)
    }
  }, [activeOutboundCall?.id, activeOutboundCall?._id, setOutboundStatus])

  const handleOutboundHold = useCallback(async (onHold) => {
    const callId = activeOutboundCallRef.current?.id || activeOutboundCall?.id || activeOutboundCall?._id
    if (!isPersistedCallId(callId)) return
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
  }, [activeOutboundCall, setOutboundStatus, toast])

  const fetchLeadMessages = useCallback(async (conversationId, page = 1, { contact = null } = {}) => {
    const isNumberThread = conversationId.startsWith('sms-')
    const leadID = conversationId.replace('lead-', '')
    const conv = conversations.find((c) => c.id === conversationId) || (contact ? { contact } : null)
    const convName = getContactDisplayName(conv?.contact) || 'Lead'
    const linkedCustomerId = isNumberThread ? null : linkedCustomerIdForConversation(conv)
    const phoneNumber = conv?.contact?.phoneNumber
    if (isNumberThread && !phoneNumber) return
    const pageKey = `${conversationId}:${page}`
    if (smsPageInFlightRef.current.has(pageKey)) return
    smsPageInFlightRef.current.add(pageKey)

    setThreadMeta((prev) => ({ ...prev, [conversationId]: { ...prev[conversationId], loading: true } }))
    try {
      const res = await api.get(
        isNumberThread
          ? `/api/smsHistory/conversations/number/${encodeURIComponent(phoneNumber)}?page=${page}`
          : `/api/smsHistory/conversations/${leadID}?page=${page}`,
      )
      const msgs = Array.isArray(res.data?.messages) ? res.data.messages : []
      // Page 1 also pulls rare SMS stored on the linked customer id into this thread.
      let linkedMsgs = []
      if (page === 1 && linkedCustomerId && linkedCustomerId !== leadID) {
        const linkedRes = await api
          .get(`/api/smsHistory/conversations/${linkedCustomerId}?page=1`)
          .catch(() => null)
        linkedMsgs = Array.isArray(linkedRes?.data?.messages) ? linkedRes.data.messages : []
      }
      const mapSms = (m) => ({
        id: String(m._id),
        sender: m.status === 'received' ? convName : 'You',
        direction: m.status === 'received' ? 'inbound' : 'outbound',
        content: m.message,
        mediaUrl: Array.isArray(m.mediaUrl) && m.mediaUrl.length ? m.mediaUrl : undefined,
        timestamp: m.createdAt,
        channel: 'SMS',
      })
      const mapped = [...msgs, ...linkedMsgs].map(mapSms)
      setThreadMessages((prev) => {
        const existing = prev[conversationId] || []
        const existingEmail = existing.filter((m) => m.channel === 'Email')
        const existingCall = existing.filter((m) => m.channel === 'Call')
        // Keep optimistic SMS (non-ObjectId ids) on page-1 refresh until they appear in history.
        const existingSms = existing.filter((m) => m.channel === 'SMS')
        const optimisticSms =
          page === 1
            ? existingSms.filter((m) => isOptimisticUnconfirmed(m, mapped))
            : []
        const smsSlice =
          page === 1
            ? mergeSmsPages(mapped, optimisticSms)
            : mergeSmsPages(mapped, existingSms)
        return {
          ...prev,
          [conversationId]: mergeThreadByTimestamp(smsSlice, existingEmail, existingCall),
        }
      })
      setThreadMeta((prev) => ({
        ...prev,
        [conversationId]: { page, hasMore: res.data?.hasMore ?? false, loading: false },
      }))
      if (page === 1 && !isNumberThread) {
        fetchConversationEmailHistory(conversationId)
      }
    } catch {
      setThreadMeta((prev) => ({ ...prev, [conversationId]: { ...prev[conversationId], loading: false } }))
      if (page === 1 && !isNumberThread) {
        fetchConversationEmailHistory(conversationId)
      }
    } finally {
      smsPageInFlightRef.current.delete(pageKey)
    }
  }, [conversations, fetchConversationEmailHistory])

  // Threads loaded per-conversation from history: lead threads and Inbox-only numbers.
  const isPagedThread = (id) => id?.startsWith('lead-') || id?.startsWith('sms-')

  const handleSelectConversation = (conversationId) => {
    setSelectedConversation(conversationId)
    setOpenedFromUnread(statusTab === 'Unread' ? conversationId : null)
    setRightView('thread')
    markConversationRead(conversationId)
    setConversations((prev) => prev.map((conv) => (conv.id === conversationId ? { ...conv, unread: 0 } : conv)))
    setShowContactList(false)
    if (!isLgUp) setShowDetails(false)
    if (isPagedThread(conversationId)) {
      fetchLeadMessages(conversationId, 1)
    } else if (conversationId.startsWith('email-')) {
      fetchConversationEmailHistory(conversationId)
    }
  }

  const loadMoreMessages = useCallback(() => {
    if (!isPagedThread(selectedConversation)) return
    const meta = threadMeta[selectedConversation]
    if (!meta?.hasMore || meta?.loading) return
    fetchLeadMessages(selectedConversation, meta.page + 1)
  }, [selectedConversation, threadMeta, fetchLeadMessages])

  useEffect(() => {
    // Desktop: keep a conversation selected. Mobile: stay on the list until the user picks one.
    // Not on Unread — opening something there should be your choice, since it marks it read.
    if (!isLgUp || statusTab !== 'All') return
    if (!selectedConversation && displayedConversations.length > 0) {
      const firstId = displayedConversations[0].id
      setSelectedConversation(firstId)
      if (isPagedThread(firstId)) fetchLeadMessages(firstId, 1)
      else if (firstId.startsWith('email-')) fetchConversationEmailHistory(firstId)
    }
  }, [displayedConversations, selectedConversation, fetchLeadMessages, fetchConversationEmailHistory, isLgUp, statusTab])

  if (loading) {
    return (
      <MainLayout title="Inbox" subtitle="Manage all your conversations in one place" mainClassName="overflow-hidden flex flex-col">
        <div className="flex items-center justify-center flex-1 min-h-0">
          <GlobalLoader variant="center" size="md" text="Loading conversations…" />
        </div>
      </MainLayout>
    )
  }

  if (error) {
    return (
      <MainLayout title="Inbox" subtitle="Manage all your conversations in one place" mainClassName="overflow-hidden flex flex-col">
        <div className="flex flex-col items-center justify-center flex-1 min-h-0 gap-3 text-muted-foreground">
          <p>{error}</p>
          <button onClick={fetchInboxData} className="text-sm underline">Retry</button>
        </div>
      </MainLayout>
    )
  }

  return (
    <MainLayout title="Inbox" subtitle="Manage all your conversations in one place" mainClassName="overflow-hidden flex flex-col !px-0 !py-0 sm:!px-0 sm:!py-0 lg:!px-2 lg:!py-2">
      {activeOutboundCall && typeof document !== 'undefined' && createPortal(
        <ActiveCallPanel
          mode="outbound"
          layerZIndex={500}
          call={activeOutboundCall}
          connection={activeOutboundConnection}
          callStatus={outboundCallStatus}
          onEndCall={() => handleEndOutboundCall()}
          onHoldChange={handleOutboundHold}
          onClose={() => handleEndOutboundCall()}
        />,
        document.body,
      )}
      {mainView === 'bulk' ? (
        <div className="flex h-full min-h-0 min-w-0 flex-1 overflow-hidden">
          <BulkMessagePanel
            contactType={contactFilter}
            onClose={() => setMainView('inbox')}
            onSent={(result) => {
              if (result.scheduleNow) handleBatchSent(result)
              else fetchScheduled()
              setMainView('inbox')
            }}
          />
        </div>
      ) : (
      <div className="flex flex-col lg:flex-row gap-0 h-full min-h-0 min-w-0 flex-1 overflow-hidden">
        {/* Left: Contact list — full screen on mobile until a thread is opened */}
        <div
          className={cn(
            'h-full min-h-0',
            showContactList ? 'flex flex-col' : 'hidden',
            'lg:flex lg:flex-col',
          )}
        >
          <ContactList
            conversations={displayedConversations}
            selectedConversation={rightView === 'thread' ? selectedConversation : null}
            onSelectConversation={handleSelectConversation}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            contactFilter={contactFilter}
            statusTab={statusTab}
            onStatusTabChange={(tab) => {
              setStatusTab(tab)
              setOpenedFromUnread(null)
              setRightView('thread')
            }}
            unreadCount={unreadInGroup}
            isUnread={isUnread}
            scheduledItems={scheduledItems}
            scheduledLoading={scheduledLoading}
            selectedScheduledId={selectedScheduled?.id || null}
            onSelectScheduled={(id) => {
              setSelectedScheduledId(id)
              setShowContactList(false)
            }}
            onNewConversation={() => {
              setRightView('new')
              setShowContactList(false)
            }}
            onBatchSend={() => setMainView('bulk')}
            canFilter={Boolean(filterEntity)}
            activeFilterCount={activeFilterCount}
            filterApplying={filterApplying}
            filterError={filterError}
            onOpenFilters={openFilterPanel}
            onClearFilters={clearEntityFilters}
          />
          <LeadsFilterPanel
            open={filterPanelEntity === 'lead'}
            appliedFilters={entityFilters.lead}
            onClose={() => setFilterPanelEntity(null)}
            onApply={(next) => applyEntityFilters('lead', next)}
            locations={filterOptions?.locations || []}
            forms={filterOptions?.forms || []}
            leadReasons={filterOptions?.leadReasons || []}
            loadingOptions={filterOptionsLoading}
          />
          <CustomersFilterPanel
            open={filterPanelEntity === 'customer'}
            appliedFilters={entityFilters.customer}
            onClose={() => setFilterPanelEntity(null)}
            onApply={(next) => applyEntityFilters('customer', next)}
            locations={filterOptions?.locations || []}
            teachers={filterOptions?.teachers || []}
            tags={filterOptions?.tags || []}
            memberships={filterOptions?.memberships || []}
            packages={filterOptions?.packages || []}
            leadReasons={filterOptions?.leadReasons || []}
            loadingOptions={filterOptionsLoading}
          />
        </div>

        {/* Middle: Conversation / new message / scheduled detail — hidden on mobile while the list is visible */}
        <div
          className={cn(
            'flex-col min-h-0 h-full w-full lg:flex-1 lg:min-w-0',
            showContactList ? 'hidden lg:flex' : 'flex',
          )}
        >
          {rightView === 'new' ? (
            <NewMessagePanel
              onCancel={() => {
                setRightView('thread')
                setShowContactList(true)
              }}
              onSend={handleNewMessageSend}
            />
          ) : statusTab === 'Scheduled' ? (
            <ScheduledMessageView
              item={selectedScheduled}
              onSave={handleSaveScheduled}
              onCancelSend={handleCancelScheduled}
              onBackClick={() => setShowContactList(true)}
            />
          ) : (
            <ConversationView
              conversation={selectedConvData}
              messages={conversationMessages}
              onToggleDetails={() => setShowDetails(!showDetails)}
              showDetails={showDetails}
              onSendMessage={handleSendMessage}
              onBackClick={() => setShowContactList(true)}
              onLoadMore={loadMoreMessages}
              hasMore={threadMeta[selectedConversation]?.hasMore ?? false}
              loadingMore={threadMeta[selectedConversation]?.loading ?? false}
              leadData={selectedLeadData}
              emailSending={emailSending}
              smsSending={smsSending}
              callPlacing={callPlacing}
              callLogsLoading={callLogsLoading}
              onPlaceCall={handlePlaceCall}
              onEmailTabActive={handleEmailTabActive}
              onCallTabActive={handleCallTabActive}
              onMarkUnread={handleMarkUnread}
              onRenameContact={handleRenameContact}
              onPromoteToLead={
                String(selectedConvData?.contact?.type || '').toLowerCase() === 'other'
                  ? handlePromoteToLead
                  : null
              }
              promoteSaving={promoteSaving}
              aiRepliesOn={leadAiRepliesOn(selectedLeadData)}
              aiToggleSaving={aiToggleSaving}
              onToggleAiReplies={selectedLeadData?._id ? handleToggleAiReplies : null}
            />
          )}
        </div>

        {/* Right: Details — desktop side panel */}
        {showDetails && selectedConvData && rightView === 'thread' && statusTab !== 'Scheduled' && (
          <div className="hidden lg:flex flex-col w-80 shrink-0 min-w-[20rem] min-h-0 h-full overflow-hidden">
            <ContactDetails
              contact={selectedConvData.contact}
              leadData={selectedLeadData}
              onClose={() => setShowDetails(false)}
              aiRepliesOn={leadAiRepliesOn(selectedLeadData)}
              aiToggleSaving={aiToggleSaving}
              onToggleAiReplies={selectedLeadData?._id ? handleToggleAiReplies : null}
              contactKind={selectedContactKind}
              onContactPatched={handleContactPatched}
            />
          </div>
        )}

        {/* Mobile / tablet: details as full-height sheet */}
        <Sheet open={!isLgUp && showDetails && !!selectedConvData} onClose={() => setShowDetails(false)} side="right">
          <SheetContent className="p-0">
            {selectedConvData && (
              <ContactDetails
                contact={selectedConvData.contact}
                leadData={selectedLeadData}
                onClose={() => setShowDetails(false)}
                aiRepliesOn={leadAiRepliesOn(selectedLeadData)}
                aiToggleSaving={aiToggleSaving}
                onToggleAiReplies={selectedLeadData?._id ? handleToggleAiReplies : null}
                contactKind={selectedContactKind}
                onContactPatched={handleContactPatched}
              />
            )}
          </SheetContent>
        </Sheet>
      </div>
      )}
    </MainLayout>
  )
}

export default function InboxPage() {
  return (
    <Suspense fallback={
      <MainLayout title="Inbox" subtitle="Manage all your conversations in one place" mainClassName="overflow-hidden flex flex-col">
        <div className="flex items-center justify-center flex-1 min-h-0">
          <GlobalLoader variant="center" size="md" text="Loading conversations…" />
        </div>
      </MainLayout>
    }>
      <InboxPageContent />
    </Suspense>
  )
}
