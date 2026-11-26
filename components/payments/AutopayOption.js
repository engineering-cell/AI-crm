'use client'

import api from '@/lib/api'
import { toast } from '@/components/ui/toast'
import SavedCardField from '@/components/payments/SavedCardField'

/**
 * "Autopay" at the point of sale. The sale is made first; the form then calls
 * turnOnAutopay with the new plan or membership, the same endpoints AutopayControl uses.
 */
export default function AutopayOption({ on, onToggle, card, onCardChange, customerID, locationID, covers }) {
  return (
    <div className="rounded-lg border border-border bg-muted/20 px-3 py-2.5 space-y-2">
      <label className="flex items-center gap-2 text-[12px] font-semibold text-foreground">
        <input type="checkbox" checked={on} onChange={(e) => onToggle(e.target.checked)} />
        Autopay with a saved card
      </label>
      {on && (
        <>
          <SavedCardField
            method="saved_card"
            locationID={locationID}
            customerID={customerID}
            cardToken={card}
            onCardChange={onCardChange}
          />
          <p className="text-[11px] text-muted-foreground">
            {covers} charged to this card automatically, overnight on the due date. Anything due and
            still unpaid is charged too. Only turn this on with the customer&apos;s permission.
          </p>
        </>
      )}
    </div>
  )
}

/** The sale already exists, so a failure here is reported, never thrown. */
export async function turnOnAutopay(path, paymentMethodId) {
  const res = await api.patch(path, { paymentMethodId })
  if (res?.success) return true
  toast.error('Sale saved, but autopay was not turned on', {
    description: `${res?.error || 'Unknown error'}. Set it up from the customer's profile.`,
  })
  return false
}
