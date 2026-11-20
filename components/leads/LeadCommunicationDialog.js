'use client'

import { useEffect, useRef, useState } from 'react'
import { ExternalLink, X } from 'lucide-react'
import Link from 'next/link'
import { Dialog } from '@/components/ui/dialog'
import CustomerInboxThread from '@/components/customers/CustomerInboxThread'
import { nameWithMembers } from '@/lib/utils'

const CHANNEL_LABEL = { SMS: 'Messages', Email: 'Email', Call: 'Calls' }

/** Inbox thread for one lead (or, with contactType="Customer", one customer) in a popup, opened on the SMS, Email or Call tab. */
export default function LeadCommunicationDialog({ lead, channel = 'SMS', contactType = 'Lead', onClose }) {
  const isCustomer = contactType === 'Customer'
  const [callLive, setCallLive] = useState(false)
  const [dismissed, setDismissed] = useState(false)
  const sessionRef = useRef(null)
  const prevLeadIdRef = useRef(null)
  const closedRef = useRef(false)

  const leadId = lead?._id ? String(lead._id) : null
  if (leadId && !dismissed) {
    sessionRef.current = { lead, channel }
  }

  useEffect(() => {
    if (callLive) return
    if (leadId && leadId !== prevLeadIdRef.current) {
      setDismissed(false)
      closedRef.current = false
    }
    prevLeadIdRef.current = leadId
  }, [leadId, callLive])

  useEffect(() => {
    if (!dismissed || callLive || closedRef.current) return
    closedRef.current = true
    onClose?.()
  }, [dismissed, callLive, onClose])

  const session = sessionRef.current
  const dialogOpen = Boolean(leadId) && !dismissed
  const keepCall = dismissed && callLive

  const requestClose = () => {
    if (callLive && lead) {
      sessionRef.current = { lead, channel }
      setDismissed(true)
      return
    }
    onClose?.()
  }

  if (!session?.lead?._id && !leadId) return null

  const shown = keepCall ? session.lead : lead
  const shownChannel = keepCall ? session.channel : channel
  if (!shown?._id) return null

  return (
    <Dialog open={dialogOpen} keepMounted={keepCall} onClose={requestClose} maxWidth="4xl">
      <div className="flex h-[min(80vh,760px)] min-h-[480px] flex-col overflow-hidden rounded-xl border-2 border-border bg-card shadow-2xl">
        <div className="flex items-center justify-between gap-3 border-b border-border px-4 py-2.5">
          <p className="min-w-0 truncate text-sm font-semibold text-foreground">
            {CHANNEL_LABEL[shownChannel] || 'Conversation'} · {nameWithMembers(shown) || shown.phoneNumber || 'Lead'}
          </p>
          <div className="flex shrink-0 items-center gap-1">
            <Link
              href={isCustomer ? '/inbox?filter=customers' : '/inbox?filter=leads'}
              className="inline-flex items-center gap-1 rounded-md px-2 py-1 text-xs font-medium text-muted-foreground hover:bg-muted hover:text-foreground"
            >
              <ExternalLink className="h-3.5 w-3.5" />
              Open inbox
            </Link>
            <button
              type="button"
              onClick={requestClose}
              className="rounded-full p-1.5 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              aria-label="Close"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>
        <CustomerInboxThread
          key={`${shown._id}-${shownChannel}`}
          customer={{
            _id: shown._id,
            leadSourceID: isCustomer ? shown.leadSourceID : shown._id,
            name: shown.name,
            members: shown.members,
            email: shown.email,
            phoneNumber: shown.phoneNumber,
            locationID: shown.locationID,
          }}
          contactType={contactType}
          initialChannel={shownChannel}
          onOutboundCallChange={setCallLive}
        />
      </div>
    </Dialog>
  )
}
