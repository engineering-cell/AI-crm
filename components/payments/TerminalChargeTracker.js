'use client'

import { useEffect, useRef, useState } from 'react'
import api from '@/lib/api'
import { toast } from '@/components/ui/toast'
import { isAuthenticated } from '@/lib/auth'
import {
  subscribeTerminalCharges,
  trackTerminalCharge,
  untrackTerminalCharge,
  TERMINAL_CHARGE_SETTLED_EVENT,
} from '@/lib/terminalCharge'

const POLL_MS = 3000
// A reader charge older than this has long been settled or retired by the sweeper.
const RESTORE_WINDOW_MS = 2 * 60 * 60 * 1000

function settled(id, status) {
  untrackTerminalCharge(id)
  window.dispatchEvent(new CustomEvent(TERMINAL_CHARGE_SETTLED_EVENT, { detail: { id, status } }))
}

function ChargeCard({ charge }) {
  const [cancelling, setCancelling] = useState(false)
  const cancellingRef = useRef(false)

  // Poll until the webhook settles it. A 404/permission error stops tracking rather than
  // leaving a card on screen forever.
  useEffect(() => {
    let stopped = false
    const tick = async () => {
      if (stopped || cancellingRef.current) return
      const res = await api.get(`/api/payment/${charge.id}`)
      if (stopped || cancellingRef.current) return
      if (!res.success) {
        if (res.status === 404 || res.status === 403) settled(charge.id, 'unknown')
        return
      }
      const status = res.data?.status
      if (status === 'completed') {
        toast.success(`Card payment of $${charge.amount.toFixed(2)} received.`)
        settled(charge.id, 'completed')
      } else if (status === 'failed') {
        toast.error(`The $${charge.amount.toFixed(2)} card-reader charge did not go through.`)
        settled(charge.id, 'failed')
      }
    }
    const timer = setInterval(tick, POLL_MS)
    return () => {
      stopped = true
      clearInterval(timer)
    }
  }, [charge.id, charge.amount])

  async function cancel() {
    if (!window.confirm(`Cancel the $${charge.amount.toFixed(2)} charge on the card reader? Nothing will be taken from the customer.`)) return
    cancellingRef.current = true
    setCancelling(true)
    const res = await api.post(`/api/payment/${charge.id}/cancel-pending`)
    cancellingRef.current = false
    setCancelling(false)
    if (!res.success) {
      toast.error(res.error || "Couldn't cancel this charge.")
      return
    }
    const status = res.data?.status
    if (status === 'completed') {
      // The customer tapped before the cancel landed — the money is real, so keep it.
      toast.success('The customer had already paid — payment recorded instead of cancelled.')
      settled(charge.id, 'completed')
    } else if (status === 'cancelled') {
      toast.success('Charge cancelled.')
      settled(charge.id, 'cancelled')
    } else {
      // Stripe still has it mid-processing: keep the card so staff can try again.
      toast.info('Stripe still shows this charge in progress — try again shortly.')
    }
  }

  return (
    <div className="pointer-events-auto w-72 rounded-xl border border-border bg-background p-3 shadow-lg">
      <p className="text-[12px] font-semibold text-foreground">Waiting for card on reader</p>
      <p className="mt-0.5 text-[11px] text-muted-foreground">
        ${charge.amount.toFixed(2)}{charge.label ? ` · ${charge.label}` : ''}
      </p>
      <button
        type="button"
        disabled={cancelling}
        onClick={cancel}
        className="mt-2 h-7 w-full rounded-md border border-rose-300 text-[11px] font-medium text-rose-600 hover:bg-rose-50 disabled:opacity-50 dark:hover:bg-rose-900/20"
      >
        {cancelling ? 'Cancelling…' : 'Cancel charge'}
      </button>
    </div>
  )
}

export default function TerminalChargeTracker() {
  const [charges, setCharges] = useState([])
  useEffect(() => subscribeTerminalCharges(setCharges), [])

  // The tracker lives in memory, so a refresh, a new tab or a navigation would otherwise drop
  // the Cancel button while the customer is still at the reader. Pick the charges back up from
  // the server. Skipped when signed out: a 401 here would log the user out of the login page.
  useEffect(() => {
    if (!isAuthenticated()) return
    let stopped = false
    api.get('/api/payment?method=terminal&status=pending&limit=20').then((res) => {
      if (stopped || !res.success || !Array.isArray(res.data)) return
      for (const p of res.data) {
        if (Date.now() - new Date(p.createdAt).getTime() < RESTORE_WINDOW_MS) trackTerminalCharge(p)
      }
    })
    return () => { stopped = true }
  }, [])
  if (charges.length === 0) return null
  return (
    <div className="pointer-events-none fixed bottom-4 right-4 z-[100] flex flex-col gap-2">
      {charges.map((c) => (
        <ChargeCard key={c.id} charge={c} />
      ))}
    </div>
  )
}
