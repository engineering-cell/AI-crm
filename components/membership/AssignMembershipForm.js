'use client'

import { useState, useEffect } from 'react'
import { Plus, Trash2 } from 'lucide-react'
import api from '@/lib/api'
import { toast } from '@/components/ui/toast'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useCardProcessor } from '@/app/settings/payments/useCardProcessor'
import { openCheckoutTab, navigateCheckoutTab, closeCheckoutTab, CHECKOUT_TOAST } from '@/lib/clover'

import { NO_DEVICE_PAYMENT_METHODS, SAVED_CARD_METHOD, SHARE_LINK_METHOD, SHORTFALL_METHODS } from '@/lib/paymentMethods'
import SavedCardField from '@/components/payments/SavedCardField'
import AutopayOption, { turnOnAutopay } from '@/components/payments/AutopayOption'
import WalletShortfallField, { walletShortfall } from '@/components/payments/WalletShortfallField'
import PaymentMethodPicker from '@/components/payments/PaymentMethodPicker'
import CheckNumberField from '@/components/payments/CheckNumberField'
import { SendLinkChannelPicker, sendPaymentLink } from '@/components/payments/SendPaymentLinkMenu'
import { dateInputToISO, todayDateInput } from '@/lib/studioLocalDate'
import { formatDate } from '@/lib/utils'

// Wallet sits beside the other methods; a balance too small asks how to collect the rest.
// POST /api/customer-membership charges the saved card itself.
const MEMBERSHIP_METHODS = [...NO_DEVICE_PAYMENT_METHODS, SAVED_CARD_METHOD, SHARE_LINK_METHOD]
// A schedule's card charge takes the whole installment, so only these can share one with the wallet.
const PLAN_SHORTFALL_METHODS = SHORTFALL_METHODS.filter((m) => ['cash', 'cheque'].includes(m.value))

function todayISO() {
  const d = new Date()
  const offset = d.getTimezoneOffset()
  return new Date(d.getTime() - offset * 60 * 1000).toISOString().slice(0, 10)
}

// Shared membership-assignment form. Used inside the customer Memberships tab and
// the enroll menu's Membership tab.
export default function AssignMembershipForm({ customerID, locationID, onSuccess, onCancel }) {
  const [templates, setTemplates] = useState([])
  const [membershipID, setMembershipID] = useState('')
  const [billingType, setBillingType] = useState('one_time')
  // Both back-datable, for members who joined and paid before being entered here.
  const [purchaseDate, setPurchaseDate] = useState(todayDateInput)
  const [paymentDate, setPaymentDate] = useState(todayDateInput)
  const [method, setMethod] = useState('cash')
  const [linkChannel, setLinkChannel] = useState('email')
  const isLink = method === SHARE_LINK_METHOD.value
  const [checkNumber, setCheckNumber] = useState('')
  const [savedCardID, setSavedCardID] = useState('')
  // A card belongs to one customer; never carry it over to the next.
  const [autopayOn, setAutopayOn] = useState(false)
  const [autopayCardID, setAutopayCardID] = useState('')
  useEffect(() => { setSavedCardID(''); setAutopayOn(false); setAutopayCardID('') }, [customerID])
  // Flexible billing — same "initial payment + future payments" builder as
  // enrollments/events so staff see one consistent flow everywhere.
  const [flexInitialAmount, setFlexInitialAmount] = useState('0')
  const [flexInitialDate, setFlexInitialDate] = useState(todayISO())
  const [flexFuturePayments, setFlexFuturePayments] = useState([{ _key: 'fp-0', dueDate: '', amount: '' }])
  const [collectInitialNow, setCollectInitialNow] = useState(true)
  const [notes, setNotes] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [walletBalance, setWalletBalance] = useState(null)
  const [shortfallMethod, setShortfallMethod] = useState('cash')
  const [walletAmount, setWalletAmount] = useState('')
  const { ready: cloverReady } = useCardProcessor(locationID)
  // Set while a "Review and Pay" agreement session is pending acceptance —
  // the membership isn't assigned and nothing is charged until this resolves.
  const [agreementGate, setAgreementGate] = useState(null)

  useEffect(() => {
    api.get('/api/membership?isActive=true&limit=200').then((res) => {
      if (res.success) setTemplates(Array.isArray(res.data) ? res.data : [])
    })
  }, [])

  // One membership is not a choice — preselect it so staff aren't made to pick
  // the only option, same reasoning as TerminalDeviceField preselecting a lone
  // reader. Runs only while nothing is chosen yet, so it never overrides a pick.
  useEffect(() => {
    if (!membershipID && templates.length === 1) setMembershipID(templates[0]._id)
  }, [templates, membershipID])

  useEffect(() => {
    if (!customerID) { setWalletBalance(null); return }
    api.get(`/api/wallet/${customerID}/balance`).then((res) => {
      if (res.success) setWalletBalance(Number(res.data?.balance ?? 0))
    })
  }, [customerID])

  useEffect(() => {
    if (!agreementGate || agreementGate.status !== 'sent') return
    const interval = setInterval(async () => {
      const statusRes = await api.get(`/api/agreement-session/${agreementGate.contractID}/status`)
      if (!statusRes?.success) return
      if (statusRes.data.status === 'signed') {
        clearInterval(interval)
        const contractID = agreementGate.contractID
        setAgreementGate(null)
        await performAssign(contractID)
      }
    }, 4000)
    return () => clearInterval(interval)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [agreementGate])

  const selected = templates.find((t) => t._id === membershipID)
  const price = Number(selected?.price ?? 0)
  // Same arithmetic as the backend: purchase date + durationDays. A back-dated period
  // that has already ended renews (and bills) on the next nightly run.
  const periodEnd = selected && purchaseDate
    ? new Date(Date.parse(purchaseDate) + (selected.durationDays || 30) * 86400000).toISOString().slice(0, 10)
    : ''
  const periodEnded = Boolean(periodEnd) && periodEnd <= todayDateInput()

  const flexInitialAmountN = Number(flexInitialAmount || 0)
  const flexFutureTotal = flexFuturePayments.reduce((sum, c) => sum + (Number(c.amount) || 0), 0)
  const flexAmountLeftToSchedule = price - flexInitialAmountN - flexFutureTotal
  const flexBalanced = Math.abs(flexAmountLeftToSchedule) < 0.01
  const collectingFlexInitial = billingType === 'flexible' && flexInitialAmountN > 0 && collectInitialNow

  // What is collected today and how much of it the wallet pays (Wallet is a method;
  // it pays all it can unless staff set an amount, and shortfallMethod collects the rest).
  const collectToday = billingType === 'one_time' ? price : collectingFlexInitial ? flexInitialAmountN : 0
  const paysByWallet = method === 'wallet' && !isLink
  const walletSplit = walletShortfall(walletBalance, collectToday, walletAmount)
  const walletApplied = paysByWallet ? walletSplit.walletApplied : 0
  const remaining = Math.max(0, collectToday - walletApplied)
  const walletOver = paysByWallet && walletSplit.over
  // The method that actually collects money; the wallet's share goes as walletAmount.
  const chargeMethod = paysByWallet ? (remaining > 0 ? shortfallMethod : 'cash') : method

  // One-time card purchases, and a flexible schedule's collected-now initial
  // payment, settle through Clover's hosted page; everything else (cash,
  // wallet, future-dated installments) is recorded directly.
  const payWithClover =
    (billingType === 'one_time' || collectingFlexInitial) && remaining > 0 && chargeMethod === 'card' && cloverReady
  const cloverNotConnected =
    (billingType === 'one_time' || collectingFlexInitial) && remaining > 0 && chargeMethod === 'card' && !cloverReady

  const bySavedCard = chargeMethod === SAVED_CARD_METHOD.value && collectToday > 0
  const savedCardNotSelected = bySavedCard && !savedCardID

  // Autopay covers renewals and a schedule's installments. Not offered while the first
  // installment goes out as a payment link: it could be charged while they are paying.
  const hasFuturePayments = billingType === 'flexible' && flexFuturePayments.some((c) => Number(c.amount) > 0)
  const renews = Boolean(selected?.autoRenew)
  const autopayAvailable = price > 0 && (renews || hasFuturePayments) && !(isLink && collectingFlexInitial)
  const autopayNotSelected = autopayAvailable && autopayOn && !autopayCardID

  // Adding/removing a row (or changing the initial payment) changes how many
  // ways the remaining balance splits, so re-spread it evenly across all rows
  // rather than leaving a stray $0 box or a stale amount.
  function splitFlexEvenly(rows, remaining) {
    const base = rows.length ? Math.floor((remaining / rows.length) * 100) / 100 : 0
    return rows.map((r, i) => ({
      ...r,
      amount: (i === rows.length - 1 ? Number((remaining - base * (rows.length - 1)).toFixed(2)) : base).toFixed(2),
    }))
  }
  function updateFlexInitialAmount(value) {
    setFlexInitialAmount(value)
    setFlexFuturePayments((prev) => splitFlexEvenly(prev, price - (Number(value) || 0)))
  }
  function addFlexFuturePayment() {
    setFlexFuturePayments((prev) => {
      const rows = [...prev, { _key: String(Date.now() + Math.random()), dueDate: '', amount: '' }]
      return splitFlexEvenly(rows, price - flexInitialAmountN)
    })
  }
  function updateFlexFuturePayment(key, field, value) {
    setFlexFuturePayments((prev) => {
      if (field !== 'amount') return prev.map((r) => (r._key === key ? { ...r, [field]: value } : r))
      const remaining = price - flexInitialAmountN
      const leftover = Math.max(0, remaining - (Number(value) || 0))
      const otherRows = prev.filter((r) => r._key !== key)
      const splitOthers = splitFlexEvenly(otherRows, leftover)
      return prev.map((r) => (r._key === key ? { ...r, amount: value } : splitOthers.find((o) => o._key === r._key)))
    })
  }
  function removeFlexFuturePayment(key) {
    setFlexFuturePayments((prev) => {
      const rows = prev.filter((r) => r._key !== key)
      return splitFlexEvenly(rows, price - flexInitialAmountN)
    })
  }

  async function handleSubmit() {
    if (!customerID) { toast.error('Select a student first'); return }
    if (!membershipID) { toast.error('Select a membership'); return }
    if (walletOver) {
      toast.error('Insufficient wallet balance', { description: `Wallet has $${(walletBalance ?? 0).toFixed(2)} but you entered $${Number(walletAmount).toFixed(2)}.` })
      return
    }

    const resolveRes = await api.get('/api/agreement-session/resolve?enrollmentType=membership')
    if (resolveRes?.success && resolveRes.data?.required) {
      setSubmitting(true)
      // Mirrors this form's own flexible-billing schedule so the agreement
      // the student sees lists the same payments they'll actually get.
      const schedule = billingType === 'flexible'
        ? [
            ...(flexInitialAmountN > 0 && flexInitialDate
              ? [{ description: 'Initial payment', amount: flexInitialAmountN, dueDate: flexInitialDate, status: collectInitialNow && !isLink ? 'paid' : 'upcoming' }]
              : []),
            ...flexFuturePayments
              .filter((c) => c.dueDate && Number(c.amount) > 0)
              .map((c) => ({ description: 'Scheduled payment', amount: Number(c.amount), dueDate: c.dueDate, status: 'upcoming' })),
          ]
        : []
      const sessionRes = await api.post('/api/agreement-session', {
        customerID,
        enrollmentType: 'membership',
        isRecurringBilling: Boolean(selected?.autoRenew),
        draftEnrollment: {
          label: selected?.membershipName,
          purchaseDate: dateInputToISO(purchaseDate),
          services: [{
            serviceName: selected?.membershipName,
            sessionsTotal: 1,
            pricePerSession: price,
            discountType: 'none',
            discountAmount: 0,
            finalAmount: price,
          }],
          totalPaid: price,
          totalDiscount: 0,
          amountCollected: 0,
          billingType,
          schedule,
        },
      })
      setSubmitting(false)
      if (!sessionRes?.success) {
        toast.error('Failed to send the agreement for review', { description: sessionRes?.error })
        return
      }
      setAgreementGate({
        contractID: sessionRes.data.contract._id,
        ipadUrl: sessionRes.data.ipadUrl,
        status: 'sent',
      })
      return
    }

    return performAssign()
  }

  async function performAssign(linkContractID = null) {
    // "Share Link" assigns it unpaid and sends a link for what would be collected now.
    const sendLink = isLink && (billingType === 'one_time' ? price > 0 : collectingFlexInitial)
    const billing = {}
    if (billingType === 'one_time') {
      if (isLink) billing.collectNow = false
      else {
        billing.method = chargeMethod
        if (chargeMethod === 'cheque') billing.checkNumber = checkNumber
        if (walletApplied > 0) billing.walletAmount = walletApplied
      }
    }
    else if (billingType === 'flexible') {
      if (!flexBalanced) {
        toast.error(`Amount left to schedule is $${flexAmountLeftToSchedule.toFixed(2)} — it must be $0 before saving.`)
        return
      }
      if (flexInitialAmountN > 0 && !flexInitialDate) { toast.error('Please set the initial payment date'); return }
      const futureRows = flexFuturePayments.filter((c) => Number(c.amount) > 0)
      if (futureRows.some((c) => !c.dueDate)) { toast.error('Every future payment needs a due date'); return }

      const scheduleRows = [
        ...(flexInitialAmountN > 0 ? [{ dueDate: flexInitialDate, amount: flexInitialAmountN }] : []),
        ...futureRows.map((c) => ({ dueDate: c.dueDate, amount: Number(c.amount) })),
      ]
      if (scheduleRows.length === 0) { toast.error('Add at least one payment'); return }

      billing.customInstallments = scheduleRows
      if (!isLink) billing.method = chargeMethod
      if (chargeMethod === 'cheque') billing.checkNumber = checkNumber
      if (walletApplied > 0) billing.walletAmount = walletApplied
      if (flexInitialAmountN > 0) billing.collectNow = collectInitialNow && !isLink
    }
    if (!isLink) billing.collectDate = dateInputToISO(paymentDate)
    if (bySavedCard) billing.savedCardID = savedCardID

    const checkoutTab = payWithClover ? openCheckoutTab() : null
    setSubmitting(true)
    try {
      const result = await api.post('/api/customer-membership', {
        customerID,
        membershipID,
        purchaseDate: dateInputToISO(purchaseDate),
        billingType,
        billing,
        notes: notes.trim() || undefined,
      })
      if (result.success) {
        if (result.data?.checkoutUrl) {
          navigateCheckoutTab(checkoutTab, result.data.checkoutUrl)
          toast.success(CHECKOUT_TOAST)
        } else {
          closeCheckoutTab(checkoutTab)
          toast.success(result.data?.pending ? 'Card charged — confirming with Stripe' : 'Membership assigned')
        }
        const newID = result.data?.customerMembership?._id
        if (autopayAvailable && autopayOn && newID) {
          await turnOnAutopay(`/api/customer-membership/${newID}/autopay`, autopayCardID)
        }
        if (linkContractID) {
          api.patch(`/api/agreement-session/${linkContractID}/link-payment`, {
            paymentID: result.data?.paymentID || result.data?._id,
          }).catch(() => {})
        }
        if (sendLink) {
          // Flexible's initial payment is the plan's first installment.
          await sendPaymentLink({
            customerID,
            channel: linkChannel,
            target: billingType === 'one_time'
              ? { kind: 'membership', customerMembershipID: result.data?.customerMembership?._id }
              : { kind: 'installment', paymentPlanID: result.data?.paymentPlan?._id, installmentIndex: 0 },
          })
        }
        onSuccess?.()
      } else {
        closeCheckoutTab(checkoutTab)
        toast.error('Failed to assign membership', { description: result.error })
      }
    } finally {
      setSubmitting(false)
    }
  }

  if (agreementGate) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 p-8 text-center">
        <p className="text-[15px] font-semibold text-foreground">Waiting for student acceptance</p>
        <p className="text-[13px] text-muted-foreground max-w-sm">
          The membership agreement has been sent to the student&apos;s phone. Open it on the studio iPad, or wait for
          them to accept on their device. Nothing will be charged until they accept.
        </p>
        <a href={agreementGate.ipadUrl} target="_blank" rel="noreferrer" className="text-[13px] text-brand hover:underline font-medium">
          Open on studio iPad
        </a>
        <div className="flex gap-2 pt-2">
          <button
            type="button"
            onClick={async () => {
              const res = await api.post(`/api/agreement-session/${agreementGate.contractID}/resend`, {})
              if (res?.success) setAgreementGate((p) => ({ ...p, ipadUrl: res.data.ipadUrl }))
            }}
            className="text-[12px] text-muted-foreground hover:text-foreground underline"
          >
            Resend link
          </button>
          <button
            type="button"
            onClick={() => setAgreementGate(null)}
            className="text-[12px] text-muted-foreground hover:text-foreground underline"
          >
            Cancel
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-5">
      <div className="flex flex-col gap-1.5">
        <Label className="font-semibold">Membership *</Label>
        <select
          value={membershipID}
          onChange={(e) => setMembershipID(e.target.value)}
          className="h-9 rounded-lg border border-border bg-background text-sm px-2.5 focus:outline-none focus:ring-2 focus:ring-brand/30"
        >
          <option value="">Select a membership…</option>
          {templates.map((t) => (
            <option key={t._id} value={t._id}>
              {t.membershipName} — ${Number(t.price ?? 0).toFixed(2)} / {t.durationDays}d
            </option>
          ))}
        </select>
      </div>

      {selected && (
        <div className="rounded-lg border border-border bg-muted/20 p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-foreground">{selected.membershipName}</span>
            <span className="text-sm font-semibold text-foreground">${Number(selected.price ?? 0).toFixed(2)}</span>
          </div>
          <p className="text-[12px] text-muted-foreground mb-3">
            {selected.durationDays} days · {selected.autoRenew ? 'auto-renews' : 'no auto-renew'}
          </p>
          <div className="space-y-1.5">
            {(selected.services || []).map((s, i) => (
              <div key={i} className="flex items-center gap-2 text-[12px]">
                <span className="h-2.5 w-2.5 rounded-full shrink-0" style={{ background: s.color || '#6366f1' }} />
                <span className="text-foreground">{s.serviceName}</span>
                <span className="ml-auto text-muted-foreground">
                  {s.accessType === 'unlimited' ? 'Unlimited' : `${s.numberOfSessions} sessions`}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="am-purchase-date" className="font-semibold">Purchase date</Label>
        <Input id="am-purchase-date" type="date" value={purchaseDate} onChange={(e) => setPurchaseDate(e.target.value)} className="h-9 w-[180px]" />
        {periodEnd && (
          <p className={`text-[11px] ${periodEnded ? 'text-warning' : 'text-muted-foreground'}`}>
            {selected?.autoRenew ? 'Renews' : 'Expires'} {formatDate(periodEnd)}
            {periodEnded &&
              (selected?.autoRenew
                ? ' — already passed, so it renews tonight and bills a new period. For a member who is paid up, use the date their current period started.'
                : ' — already passed, so it will show as expired.')}
          </p>
        )}
      </div>

      <div className="flex flex-col gap-1.5">
        <Label className="font-semibold">Billing</Label>
        <div className="inline-flex rounded-lg border border-border bg-background p-0.5 w-fit">
          {[
            { v: 'one_time', label: 'One-time' },
            { v: 'flexible', label: 'Flexible' },
          ].map((opt) => (
            <button
              key={opt.v}
              type="button"
              onClick={() => setBillingType(opt.v)}
              className={[
                'h-8 px-3 rounded-md text-[12px] font-medium transition-colors',
                billingType === opt.v ? 'bg-brand text-brand-foreground' : 'text-muted-foreground hover:text-foreground',
              ].join(' ')}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {billingType === 'one_time' && (
        <div className="space-y-3">
          {price > 0 && (
            <div className="flex flex-col gap-1.5">
              <Label>Payment Method</Label>
              <PaymentMethodPicker methods={MEMBERSHIP_METHODS} value={method} onChange={(m) => { setMethod(m); setWalletAmount('') }} />
              <WalletShortfallField
                method={method}
                balance={walletBalance}
                amountDue={collectToday}
                walletAmount={walletAmount}
                onWalletAmountChange={setWalletAmount}
                shortfallMethod={shortfallMethod}
                onShortfallMethodChange={setShortfallMethod}
              />
              <CheckNumberField method={chargeMethod} checkNumber={checkNumber} onChange={setCheckNumber} />
              <SavedCardField method={method} locationID={locationID} customerID={customerID} cardToken={savedCardID} onCardChange={setSavedCardID} />
              {isLink && <SendLinkChannelPicker value={linkChannel} onChange={setLinkChannel} />}
            </div>
          )}
          {/* A saved card is charged now, so there is no date to back-date. */}
          {price > 0 && !isLink && !bySavedCard && (
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="am-payment-date">Payment date</Label>
              <Input id="am-payment-date" type="date" value={paymentDate} onChange={(e) => setPaymentDate(e.target.value)} className="h-9 w-[180px]" />
            </div>
          )}

        </div>
      )}

      {billingType === 'flexible' && (
        <div className="rounded-xl border border-border bg-muted/20 p-4 flex flex-col gap-4">
          <p className="text-xs text-muted-foreground -mt-1">
            This arrangement will be included in the student agreement — get it right here, it can&apos;t be changed on the payment step.
          </p>

          {/* Initial payment */}
          <div className="flex flex-col gap-1.5">
            <Label>Initial payment <span className="font-normal text-muted-foreground">(optional — enter $0 if none)</span></Label>
            <div className="grid grid-cols-2 gap-2">
              <Input type="number" min="0" max={price} step="any" placeholder="0.00" value={flexInitialAmount} onChange={(e) => updateFlexInitialAmount(e.target.value)} />
              <Input type="date" value={flexInitialDate} onChange={(e) => setFlexInitialDate(e.target.value)} />
            </div>
          </div>

          {/* Future payments */}
          <div className="flex flex-col gap-1.5 pt-2 border-t border-border">
            <Label>Future payments</Label>
            <p className="text-xs text-muted-foreground -mt-1">
              One row is the remaining balance's single due date. Add more to split it into a schedule.
            </p>
            <div className="flex flex-col gap-1.5">
              {flexFuturePayments.map((r, i) => (
                <div key={r._key} className="flex items-center gap-2">
                  <span className="w-5 shrink-0 text-xs text-muted-foreground">{i + 1}.</span>
                  <Input type="date" value={r.dueDate} onChange={(e) => updateFlexFuturePayment(r._key, 'dueDate', e.target.value)} className="flex-1" />
                  <Input type="number" min="0" step="any" placeholder="0.00" value={r.amount} onChange={(e) => updateFlexFuturePayment(r._key, 'amount', e.target.value)} className="w-28" />
                  <button type="button" onClick={() => removeFlexFuturePayment(r._key)} disabled={flexFuturePayments.length === 1}
                    className="text-muted-foreground hover:text-destructive disabled:opacity-30 disabled:cursor-not-allowed"
                    aria-label="Remove payment">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
            <button type="button" onClick={addFlexFuturePayment}
              className="inline-flex w-fit items-center gap-1.5 rounded-lg border border-dashed border-border px-3 h-8 text-[13px] font-medium text-muted-foreground hover:text-foreground hover:border-brand/50">
              <Plus className="h-3.5 w-3.5" /> Add another payment
            </button>
          </div>

          <div className="flex flex-col gap-1 pt-2 border-t border-border">
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground">Amount left to schedule</span>
              <span className={`text-sm font-semibold ${flexBalanced ? 'text-success' : 'text-destructive'}`}>${flexAmountLeftToSchedule.toFixed(2)}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground">Membership Price</span>
              <span className="text-sm font-bold">${price.toFixed(2)}</span>
            </div>
            {!flexBalanced && (
              <p className="text-[11px] text-destructive">Initial payment plus future payments must add up to the membership price.</p>
            )}
          </div>

          {flexInitialAmountN > 0 && (
            <div className="flex flex-col gap-3 pt-2 border-t border-border">
              <label className="flex items-center gap-2 text-sm font-medium">
                <input type="checkbox" checked={collectInitialNow} onChange={(e) => setCollectInitialNow(e.target.checked)} />
                Collect the initial payment now (${flexInitialAmountN.toFixed(2)})
              </label>
              {collectInitialNow && (
                <div className="flex flex-col gap-1.5">
                  <Label>Payment Method</Label>
                  <PaymentMethodPicker methods={MEMBERSHIP_METHODS} value={method} onChange={(m) => { setMethod(m); setWalletAmount('') }} />
                  <WalletShortfallField
                    method={method}
                    balance={walletBalance}
                    amountDue={collectToday}
                    walletAmount={walletAmount}
                    onWalletAmountChange={setWalletAmount}
                    shortfallMethod={shortfallMethod}
                    onShortfallMethodChange={setShortfallMethod}
                    methods={PLAN_SHORTFALL_METHODS}
                  />
                  <CheckNumberField method={chargeMethod} checkNumber={checkNumber} onChange={setCheckNumber} />
                  <SavedCardField method={method} locationID={locationID} customerID={customerID} cardToken={savedCardID} onCardChange={setSavedCardID} />
                  {isLink ? (
                    <SendLinkChannelPicker value={linkChannel} onChange={setLinkChannel} />
                  ) : bySavedCard ? null : (
                    <>
                      <Label htmlFor="am-flex-payment-date">Payment date</Label>
                      <Input id="am-flex-payment-date" type="date" value={paymentDate} onChange={(e) => setPaymentDate(e.target.value)} className="h-9 w-[180px]" />
                    </>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {autopayAvailable && (
        <AutopayOption
          on={autopayOn}
          onToggle={(next) => {
            setAutopayOn(next)
            if (next && !autopayCardID && bySavedCard) setAutopayCardID(savedCardID)
          }}
          card={autopayCardID}
          onCardChange={setAutopayCardID}
          customerID={customerID}
          locationID={locationID}
          covers={renews && hasFuturePayments ? 'Future payments and renewals are' : renews ? 'Renewals are' : 'Future payments are'}
        />
      )}

      <div className="flex flex-col gap-1.5">
        <Label className="font-semibold">Notes</Label>
        <Input value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Optional" className="h-9" />
      </div>

      <div className="flex flex-col gap-1.5 pt-2">
        {cloverNotConnected && (
          <p className="text-[11px] text-amber-600 text-right">Connect a card processor (Clover or Stripe) in Settings → Integrations to charge a card.</p>
        )}
        <div className="flex justify-end gap-2">
          {onCancel && <Button variant="outline" onClick={onCancel} disabled={submitting}>Cancel</Button>}
          <Button onClick={() => handleSubmit()} disabled={submitting || walletOver || cloverNotConnected || savedCardNotSelected || autopayNotSelected || (billingType === 'flexible' && !flexBalanced)} className="bg-brand hover:bg-brand-dark text-brand-foreground">
            {submitting ? 'Assigning…' : payWithClover ? 'Pay by card' : 'Assign Membership'}
          </Button>
        </div>
      </div>
    </div>
  )
}
