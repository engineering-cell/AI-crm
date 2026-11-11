// Tiny store for card-reader (Stripe Terminal) charges that are still waiting on the
// customer. A reader charge is async: POST /api/payment returns a pending Payment and
// the dialog that started it closes straight away, so without this there is nowhere
// left to press "Cancel" while the customer is standing at the reader.
//
// Callers just do `trackTerminalCharge(res.data.payment)`; <TerminalChargeTracker />
// (mounted once in Providers) renders, polls and cancels.

let charges = []
const listeners = new Set()

function emit() {
  for (const l of listeners) l(charges)
}

export function subscribeTerminalCharges(listener) {
  listeners.add(listener)
  listener(charges)
  return () => listeners.delete(listener)
}

/** Start tracking a pending reader charge. Safe to call twice for the same payment. */
export function trackTerminalCharge(payment, { label } = {}) {
  const id = payment?._id
  if (!id || charges.some((c) => c.id === id)) return
  charges = [...charges, { id, amount: Number(payment.amount) || 0, label: label || null }]
  emit()
}

/**
 * Called by the API client on every successful response. A card-reader charge is the only
 * thing that comes back as a `pending` Payment with method "terminal" (Clover's device
 * charge is synchronous, so it is already completed), so spotting that shape here covers
 * every screen that can start one — payments, installments, wallet top-ups, package and
 * plan sales, intro sales — without each having to remember to register it.
 * Plan/package/intro flows nest it as `terminalPayment`; /api/payment returns `payment`.
 */
export function trackPendingReaderCharge(data) {
  const p = data?.terminalPayment || (data?.pending ? data.payment : null)
  if (p?.method === 'terminal' && p?.status === 'pending') trackTerminalCharge(p)
}

export function untrackTerminalCharge(id) {
  if (!charges.some((c) => c.id === id)) return
  charges = charges.filter((c) => c.id !== id)
  emit()
}

// Fired when a tracked charge ends (paid, failed or cancelled) so open screens can refetch.
export const TERMINAL_CHARGE_SETTLED_EVENT = 'terminal-charge-settled'
