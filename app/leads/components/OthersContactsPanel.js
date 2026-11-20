'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import { MessageSquare, UserPlus, ExternalLink, Plus } from 'lucide-react'
import api from '@/lib/api'
import { toast } from '@/components/ui/toast'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog'
import LoadingSpinner from '@/components/shared/LoadingSpinner'
import { RowsPerPage } from '@/components/shared/RowsPerPage'
import { cn, formatDateTime } from '@/lib/utils'
import { normalizePhoneE164 } from '@/lib/inbox-messaging'
import { hasPermission } from '@/lib/permissions'

const ORIGIN_BADGE = {
  inbound: 'bg-amber-100 text-amber-900 dark:bg-amber-950 dark:text-amber-100',
  outbound: 'bg-sky-100 text-sky-900 dark:bg-sky-950 dark:text-sky-100',
  pending: 'bg-muted text-muted-foreground',
}

function originLabel(origin) {
  if (origin === 'inbound') return 'Inbound'
  if (origin === 'pending') return 'Waiting'
  return 'Outbound'
}

export default function OthersContactsPanel() {
  const router = useRouter()
  const canWrite = hasPermission('inbox', 'AllMessages', 'write')
  const [contacts, setContacts] = useState([])
  const [loading, setLoading] = useState(true)
  const [query, setQuery] = useState('')
  const [debouncedQuery, setDebouncedQuery] = useState('')
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [total, setTotal] = useState(0)
  const [promotingId, setPromotingId] = useState(null)
  const [textOpen, setTextOpen] = useState(false)
  const [textPhone, setTextPhone] = useState('')
  const [textBody, setTextBody] = useState('')
  const [textSending, setTextSending] = useState(false)
  const appliedQueryRef = useRef('')

  useEffect(() => {
    const timer = setTimeout(() => {
      const next = query.trim()
      if (appliedQueryRef.current === next) return
      appliedQueryRef.current = next
      setDebouncedQuery(next)
      setPage(1)
    }, 250)
    return () => clearTimeout(timer)
  }, [query])

  const load = useCallback(async () => {
    setLoading(true)
    try {
      const params = new URLSearchParams({
        page: String(page),
        limit: String(pageSize),
      })
      if (debouncedQuery) params.set('q', debouncedQuery)
      const res = await api.get(`/api/inbox/contacts?${params.toString()}`)
      const list = Array.isArray(res?.data?.contacts)
        ? res.data.contacts
        : Array.isArray(res?.data)
          ? res.data
          : []
      const nextTotal = Number(res?.pagination?.total ?? res?.data?.total ?? list.length) || 0
      if (list.length === 0 && page > 1 && nextTotal > 0) {
        setPage((current) => Math.max(1, current - 1))
        return
      }
      setContacts(list)
      setTotal(nextTotal)
    } catch (err) {
      console.error(err)
      toast.error('Could not load Others', {
        description: err?.message || 'Try again',
      })
      setContacts([])
      setTotal(0)
    } finally {
      setLoading(false)
    }
  }, [page, pageSize, debouncedQuery])

  useEffect(() => {
    load()
  }, [load])

  const totalPages = Math.max(1, Math.ceil((total || 0) / pageSize) || 1)

  const openInboxThread = (contact) => {
    const phone = contact?.phoneNumber
    const params = new URLSearchParams({ filter: 'other' })
    if (phone) params.set('q', phone)
    router.push(`/inbox?${params.toString()}`)
  }

  const promote = async (contact) => {
    if (!contact?._id) return
    setPromotingId(String(contact._id))
    try {
      const res = await api.post(`/api/inbox/contacts/${encodeURIComponent(contact._id)}/promote`, {})
      if (!res?.success) {
        toast.error('Could not make a lead', {
          description: res?.error || res?.message || 'Try again',
        })
        return
      }
      toast.success('Made a lead', {
        description: contact.phoneNumber || contact.email || 'Contact promoted',
      })
      await load()
    } catch (err) {
      toast.error('Could not make a lead', { description: err?.message || 'Try again' })
    } finally {
      setPromotingId(null)
    }
  }

  const openTextDialog = (phone = '') => {
    setTextPhone(phone || '')
    setTextBody('')
    setTextOpen(true)
  }

  const sendText = async () => {
    const phone = normalizePhoneE164(textPhone)
    if (!phone) {
      toast.error('Enter a valid phone number')
      return
    }
    if (!String(textBody || '').trim()) {
      toast.error('Enter a message')
      return
    }
    setTextSending(true)
    try {
      const res = await api.post('/api/sms/send-one', {
        lead: { phoneNumber: phone, name: phone },
        message: String(textBody).trim(),
        scheduleNow: true,
      })
      if (!res?.success) {
        toast.error('Could not send', {
          description: res?.error || res?.message || 'Try again',
        })
        return
      }
      toast.success('Text sent', { description: phone })
      setTextOpen(false)
      await load()
      router.push(`/inbox?filter=other&q=${encodeURIComponent(phone)}`)
    } catch (err) {
      toast.error('Could not send', { description: err?.message || 'Try again' })
    } finally {
      setTextSending(false)
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="min-w-0">
          <p className="text-sm text-muted-foreground">
            Numbers that are not leads — inbound junk, staff texts, and chats still waiting for intent.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search name or number"
            className="h-9 w-[220px]"
          />
          {canWrite ? (
            <Button
              type="button"
              className="h-9 gap-2"
              onClick={() => openTextDialog('')}
            >
              <Plus className="h-4 w-4" />
              Text a number
            </Button>
          ) : null}
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center py-16">
          <LoadingSpinner />
        </div>
      ) : contacts.length === 0 ? (
        <div className="rounded-xl border border-dashed border-border px-6 py-14 text-center">
          <p className="text-sm font-medium text-foreground">
            {debouncedQuery ? 'No matches' : 'No Others yet'}
          </p>
          <p className="mt-1 text-xs text-muted-foreground">
            {debouncedQuery
              ? 'Nothing on this list matches that search.'
              : 'Silent calls, short greetings, and staff-started numbers show up here.'}
          </p>
        </div>
      ) : (
        <div className="overflow-hidden rounded-xl border border-border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Phone / email</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Reason</TableHead>
                <TableHead>Last seen</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {contacts.map((contact) => {
                const origin = contact.origin || 'outbound'
                const id = String(contact._id)
                return (
                  <TableRow key={id} className="cursor-pointer" onClick={() => openInboxThread(contact)}>
                    <TableCell className="font-medium">
                      {contact.name || '—'}
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col">
                        <span>{contact.phoneNumber || '—'}</span>
                        {contact.email ? (
                          <span className="text-xs text-muted-foreground">{contact.email}</span>
                        ) : null}
                      </div>
                    </TableCell>
                    <TableCell>
                      <span
                        className={cn(
                          'inline-flex rounded-full px-2 py-0.5 text-[11px] font-medium',
                          ORIGIN_BADGE[origin] || ORIGIN_BADGE.pending,
                        )}
                      >
                        {contact.originLabel || originLabel(origin)}
                      </span>
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {contact.reason || (origin === 'pending' ? 'Waiting for intent' : '—')}
                    </TableCell>
                    <TableCell className="text-muted-foreground tabular-nums">
                      {contact.lastSeenAt ? formatDateTime(contact.lastSeenAt) : '—'}
                    </TableCell>
                    <TableCell className="text-right" onClick={(e) => e.stopPropagation()}>
                      <div className="inline-flex items-center gap-1">
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="h-8 gap-1"
                          onClick={() => openInboxThread(contact)}
                          title="Open in inbox"
                        >
                          <ExternalLink className="h-3.5 w-3.5" />
                        </Button>
                        {canWrite && contact.phoneNumber ? (
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            className="h-8 gap-1"
                            onClick={() => openTextDialog(contact.phoneNumber)}
                            title="Send text"
                          >
                            <MessageSquare className="h-3.5 w-3.5" />
                          </Button>
                        ) : null}
                        {canWrite ? (
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            className="h-8 gap-1"
                            disabled={promotingId === id}
                            onClick={() => promote(contact)}
                            title="Make a lead"
                          >
                            <UserPlus className="h-3.5 w-3.5" />
                            {promotingId === id ? '…' : 'Lead'}
                          </Button>
                        ) : null}
                      </div>
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
          <div className="flex items-center justify-between border-t border-border px-4 py-3">
            <RowsPerPage
              value={pageSize}
              onChange={(n) => {
                setPageSize(n)
                setPage(1)
              }}
              disabled={loading}
            />
            <span className="text-sm text-muted-foreground">
              Page {page} of {totalPages}
            </span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setPage((current) => Math.max(1, current - 1))}
                disabled={page === 1 || loading}
                className="inline-flex h-8 items-center rounded-lg border border-border bg-background px-3 text-sm font-medium text-foreground hover:bg-muted/40 disabled:cursor-not-allowed disabled:opacity-40"
              >
                Previous
              </button>
              <button
                type="button"
                onClick={() => setPage((current) => Math.min(totalPages, current + 1))}
                disabled={page === totalPages || loading}
                className="inline-flex h-8 items-center rounded-lg border border-border bg-background px-3 text-sm font-medium text-foreground hover:bg-muted/40 disabled:cursor-not-allowed disabled:opacity-40"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      )}

      <Dialog open={textOpen} onClose={() => setTextOpen(false)} maxWidth="md">
        <DialogContent className="sm:max-w-md" onClose={() => setTextOpen(false)}>
          <DialogHeader>
            <DialogTitle>Text a number</DialogTitle>
          </DialogHeader>
          <div className="space-y-3 py-2">
            <Input
              value={textPhone}
              onChange={(e) => setTextPhone(e.target.value)}
              placeholder="+1…"
              autoFocus
            />
            <Textarea
              value={textBody}
              onChange={(e) => setTextBody(e.target.value)}
              placeholder="Message"
              rows={4}
            />
            <p className="text-[11px] text-muted-foreground">
              Creates an Outbound Other if this number is not already a lead or customer.
            </p>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setTextOpen(false)}>
              Cancel
            </Button>
            <Button type="button" onClick={sendText} disabled={textSending}>
              {textSending ? 'Sending…' : 'Send'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
