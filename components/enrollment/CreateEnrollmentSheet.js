'use client'

import { useEffect, useMemo, useState } from 'react'
import { Sheet, SheetContent } from '@/components/ui/sheet'
import SearchableSelect from '@/components/ui/searchable-select'
import NewEnrollmentPackageInline, { enrollmentLinkTarget } from '@/app/calendar/components/NewEnrollmentPackageInline'
import AssignMembershipForm from '@/components/membership/AssignMembershipForm'
import { sendPaymentLink } from '@/components/payments/SendPaymentLinkMenu'
import { turnOnAutopay } from '@/components/payments/AutopayOption'
import api from '@/lib/api'
import { useToast } from '@/components/ui/toast'
import { nameWithMembers } from '@/lib/utils'
import { dateInputToISO } from '@/lib/studioLocalDate'

const SHEET_WIDTH = '640px'

export default function CreateEnrollmentSheet({
  open,
  onClose,
  /** 'service' | 'package' | 'membership' — which tab to open on. */
  initialMode = 'service',
  /** When set, student is fixed and the selector is hidden. */
  customerID: fixedCustomerID = null,
  customerName = '',
  /** Studio for Clover readiness when student is fixed (customer location). */
  locationID: fixedLocationID = null,
  /** When set, only group/specific service lines are sellable and only packages containing them are listed. */
  allowedServiceCodes = null,
  onSuccess,
}) {
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const toast = useToast()
  const [mode, setMode] = useState(initialMode)
  // Set while a "Review and Pay" agreement session is pending student
  // acceptance — the enrollment/package isn't created and nothing is charged
  // until this resolves to 'signed' (see resolveAndMaybeGate).
  const [agreementGate, setAgreementGate] = useState(null)

  useEffect(() => {
    if (open) setMode(initialMode)
  }, [open, initialMode])
  const [selectedCustomerID, setSelectedCustomerID] = useState('')
  const [teacherOptions, setTeacherOptions] = useState([])
  const [customerOptions, setCustomerOptions] = useState([])
  const [packageTemplates, setPackageTemplates] = useState([])

  const resolvedCustomerID = fixedCustomerID
    ? String(fixedCustomerID)
    : selectedCustomerID

  const resolvedLocationID = (() => {
    if (fixedLocationID) return String(fixedLocationID)
    const opt = customerOptions.find((c) => c.value === selectedCustomerID)
    return opt?.locationID || null
  })()

  const sellablePackages = useMemo(() => {
    if (!allowedServiceCodes) return packageTemplates
    return packageTemplates.filter((p) =>
      (p.services || []).some((s) => allowedServiceCodes.has(s.serviceCode)),
    )
  }, [packageTemplates, allowedServiceCodes])

  useEffect(() => {
    if (!open) return
    let cancelled = false

    async function loadOptions() {
      setError('')
      const requests = [
        api.get('/api/teacher?limit=200&status=active'),
        api.get('/api/package?limit=200'),
      ]
      if (!fixedCustomerID) {
        requests.splice(1, 0, api.get('/api/customer?limit=200'))
      }

      const results = await Promise.all(requests)
      if (cancelled) return

      let teachersRes
      let customersRes
      let packagesRes

      if (fixedCustomerID) {
        ;[teachersRes, packagesRes] = results
      } else {
        ;[teachersRes, customersRes, packagesRes] = results
      }

      if (teachersRes?.success && Array.isArray(teachersRes.data)) {
        setTeacherOptions(
          teachersRes.data.map((t) => ({
            value: String(t._id ?? t.id),
            label: t.name || t.email || String(t._id),
          })),
        )
      }
      if (customersRes?.success && Array.isArray(customersRes.data)) {
        setCustomerOptions(
          customersRes.data.map((c) => {
            const loc = c.locationID
            const locationID = Array.isArray(loc)
              ? (loc[0]?._id || loc[0] || null)
              : (loc?._id || loc || null)
            return {
              value: String(c._id ?? c.id),
              // "Ashley & Tom" — members show next to the account holder and are searchable.
              label: nameWithMembers(c) || c.email || String(c._id),
              locationID: locationID ? String(locationID) : null,
            }
          }),
        )
      }
      if (packagesRes?.success && Array.isArray(packagesRes.data)) {
        setPackageTemplates(packagesRes.data)
      }
    }

    loadOptions()
    return () => {
      cancelled = true
    }
  }, [open, fixedCustomerID])

  const selectedCustomerLabel = useMemo(() => {
    if (fixedCustomerID && customerName) return customerName
    const opt = customerOptions.find((c) => c.value === selectedCustomerID)
    return opt?.label || ''
  }, [fixedCustomerID, customerName, customerOptions, selectedCustomerID])

  function handleClose() {
    setError('')
    setSelectedCustomerID('')
    onClose?.()
  }

  async function handleCreateEnrollmentAndPackage(payload, linkContractID = null) {
    if (!resolvedCustomerID) {
      setError('Please select a student.')
      return { ok: false }
    }

    setError('')
    setSubmitting(true)

    const enrRes = await api.post('/api/enrollment', {
      customerID: resolvedCustomerID,
      label: payload?.label?.trim() || undefined,
      teacherID: payload?.teacherID || undefined,
    })

    if (!enrRes?.success) {
      setError(enrRes?.error || 'Failed to create enrollment.')
      setSubmitting(false)
      return { ok: false }
    }

    const created =
      enrRes?.data?.enrollment && typeof enrRes.data.enrollment === 'object'
        ? enrRes.data.enrollment
        : enrRes.data
    const enrollmentID = String(created?._id || created?.enrollmentID || '')

    if (!enrollmentID) {
      setError('Enrollment created but ID was not returned.')
      setSubmitting(false)
      return { ok: false }
    }

    const addRes = await api.post('/api/customer-package/add', {
      customerID: resolvedCustomerID,
      packageID: payload.packageID || undefined,
      label: payload?.label?.trim() || undefined,
      expiryDays: payload.expiryDays ? Number(payload.expiryDays) : undefined,
      enrollmentID,
      notes: payload.notes?.trim() || undefined,
      services: (payload.services || []).map((s) => ({
        serviceCode: s.serviceCode,
        serviceName: s.serviceName,
        color: s.color,
        numberOfSessions: Number(s.numberOfSessions || 0),
        pricePerSession: Number(s.pricePerSession || 0),
        discountType: s.discountType || 'none',
        discountAmount: Number(s.discountAmount || 0),
        finalAmount: Number(s.finalAmount || 0),
      })),
      billingType: payload.billingType,
      billing:
        payload.billingType === 'one_time'
          ? {
              method: payload.billing?.method || 'cash',
              collectDate: payload.billing?.collectDate || undefined,
              // Explicit false only — omitting it (every other caller of this
              // endpoint) must keep the backend's default of collecting now.
              ...(payload.billing?.collectNow === false ? { collectNow: false } : {}),
              ...(payload.billing?.useWallet && Number(payload.billing?.walletAmount) > 0
                ? { walletAmount: Number(payload.billing.walletAmount) }
                : {}),
              ...(payload.billing?.method === 'terminal'
                ? {
                    deviceID: payload.billing?.deviceID,
                  }
                : {}),
              // A saved card is charged inside the add endpoint itself for a one-time
              // sale, so it rides on the billing object under its own name — never
              // as cardToken, which that endpoint reads as a Clover token.
              ...(payload.billing?.method === 'saved_card'
                ? { savedCardID: payload.billing?.savedCardID }
                : {}),
            }
          : payload.billingType === 'payment_plan'
            ? (() => {
                const totalAmount = (payload.services || []).reduce(
                  (sum, s) => sum + Number(s.finalAmount || 0),
                  0,
                )
                const mode = payload.billing?.installmentMode || 'count'
                const numberOfInstallments =
                  mode === 'amount'
                    ? Math.ceil(totalAmount / Number(payload.billing?.installmentAmount || 1))
                    : Number(payload.billing?.numberOfInstallments || 0)
                return {
                  installmentMode: mode,
                  numberOfInstallments,
                  installmentAmount:
                    mode === 'amount' ? Number(payload.billing?.installmentAmount) : undefined,
                  frequency: payload.billing?.frequency,
                  startDate: payload.billing?.startDate,
                }
              })()
            : payload.billingType === 'flexible'
              ? {
                  initialAmount: Number(payload.billing?.initialAmount || 0),
                  initialDate: payload.billing?.initialDate || undefined,
                  customInstallments: (payload.billing?.futurePayments || [])
                    .filter((c) => c.dueDate && Number(c.amount) > 0)
                    .map((c) => ({ dueDate: c.dueDate, amount: Number(c.amount) })),
                }
              : {},
      ...(payload.purchaseDate ? { purchaseDate: payload.purchaseDate } : {}),
      ...(payload.tip?.amount
        ? {
            tip: {
              teacherID: payload.tip.teacherID || undefined,
              amount: Number(payload.tip.amount),
              method: payload.tip.method || 'cash',
            },
          }
        : {}),
    })

    if (!addRes?.success) {
      setError(addRes?.error || 'Failed to add package to enrollment.')
      setSubmitting(false)
      return { ok: false }
    }

    let checkoutUrl = payload.billingType === 'one_time' ? (addRes.data?.checkoutUrl || null) : null

    const collectAmount = Number(payload.billing?.collectAmount || 0)
    const collectNow = Boolean(payload.billing?.collectNow) && collectAmount > 0
    const method = payload.billing?.method || 'cash'
    // The part of today's payment the wallet covers; `method` collects the rest.
    const walletShare =
      payload.billing?.useWallet && Number(payload.billing?.walletAmount) > 0
        ? { walletAmount: Number(payload.billing.walletAmount) }
        : {}

    if (collectNow && payload.billingType === 'payment_plan') {
      const planRes = await api.get(`/api/payment-plan/customer/${resolvedCustomerID}`)
      const plans = planRes?.success ? planRes.data || [] : []
      const matchesEnrollment = (p) =>
        String(p.enrollmentID?._id ?? p.enrollmentID) === String(enrollmentID)
      const byNewest = (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      const plan =
        plans.filter(matchesEnrollment).sort(byNewest)[0] ?? [...plans].sort(byNewest)[0]
      const firstPending = (plan?.installments || []).findIndex((i) => i.status === 'pending')
      if (plan && firstPending !== -1) {
        const payRes = await api.post(`/api/payment-plan/${plan._id}/pay-installment`, {
          installmentIndex: firstPending,
          method,
          ...walletShare,
          paymentDate: dateInputToISO(payload.billing?.collectDate),
          ...(method === 'terminal'
            ? {
                deviceID: payload.billing?.deviceID,
              }
            : {}),
          ...(method === 'saved_card' ? { cardToken: payload.billing?.savedCardID } : {}),
        })
        if (!payRes?.success) {
          setError(payRes?.error || 'Enrollment created but first installment payment failed.')
          setSubmitting(false)
          return { ok: false }
        }
        checkoutUrl = payRes.data?.checkoutUrl || null
      }
    } else if (collectNow && payload.billingType === 'flexible') {
      const payRes = await api.post('/api/payment', {
        customerID: resolvedCustomerID,
        enrollmentID,
        type: 'package_purchase',
        amount: collectAmount,
        method,
        ...walletShare,
        paymentDate: dateInputToISO(payload.billing?.collectDate),
        ...(method === 'terminal'
          ? {
              deviceID: payload.billing?.deviceID,
            }
          : {}),
        ...(method === 'saved_card' ? { cardToken: payload.billing?.savedCardID } : {}),
      })
      if (!payRes?.success) {
        setError(payRes?.error || 'Enrollment created but initial payment failed.')
        setSubmitting(false)
        return { ok: false }
      }
      checkoutUrl = payRes.data?.checkoutUrl || null
    }

    // Only reached once today's payment went through (a failure returns above).
    if (payload.billing?.autopayCardID && addRes.data?.paymentPlan?._id) {
      await turnOnAutopay(`/api/payment-plan/${addRes.data.paymentPlan._id}/autopay`, payload.billing.autopayCardID)
    }

    // Sent here, not by the form: behind an agreement gate this runs only once it's signed.
    const linkChannel = payload.billing?.sendLinkChannel
    const linkTarget = linkChannel && enrollmentLinkTarget(payload, enrollmentID, addRes.data?.paymentPlan)
    if (linkTarget) await sendPaymentLink({ customerID: resolvedCustomerID, target: linkTarget, channel: linkChannel })

    if (linkContractID) {
      api.patch(`/api/agreement-session/${linkContractID}/link-payment`, { enrollmentID }).catch(() => {})
    }

    // Tell staff what happened to the student's unallocated lessons: how many the new program
    // claimed (including ones that already took place) and why any were left behind.
    const allocation = addRes.data?.allocation
    if (allocation && (allocation.allocated > 0 || allocation.skipped > 0 || allocation.blocked)) {
      const note = String(addRes.message || '').replace(/^Package (assigned|added) — /, '')
      if (note && note !== String(addRes.message || '')) {
        const hadProblem = allocation.skipped > 0 || Boolean(allocation.blocked)
        const showToast = hadProblem ? toast.error : toast.success
        showToast({ title: 'Unallocated lessons', message: note })
      }
    }

    setSubmitting(false)
    handleClose()
    onSuccess?.({ customerID: resolvedCustomerID, enrollmentID })
    return { ok: true, checkoutUrl }
  }

  // Mirrors NewEnrollmentPackageInline's own installment preview math, so the
  // agreement the student sees lists the same schedule they'll actually get —
  // this only needs to exist for the pre-creation "Review and Pay" render.
  function buildSchedulePreview(payload) {
    const total = (payload.services || []).reduce((sum, s) => sum + Number(s.finalAmount || 0), 0)

    if (payload.billingType === 'payment_plan') {
      const b = payload.billing || {}
      const mode = b.installmentMode || 'count'
      let n
      let baseAmt
      if (mode === 'amount') {
        const amt = Number(b.installmentAmount || 0)
        if (!amt) return []
        n = Math.ceil(total / amt)
        baseAmt = amt
      } else {
        n = Number(b.numberOfInstallments || 0)
        if (!n) return []
        baseAmt = Number((total / n).toFixed(2))
      }
      if (!b.startDate) return []
      let d = new Date(b.startDate)
      const rows = []
      for (let i = 0; i < n; i++) {
        const isLast = i === n - 1
        const amount = isLast ? Number((total - baseAmt * (n - 1)).toFixed(2)) : baseAmt
        rows.push({ description: `Installment ${i + 1}`, amount, dueDate: new Date(d), status: 'upcoming' })
        if (b.frequency === 'weekly') d = new Date(d.getTime() + 7 * 24 * 60 * 60 * 1000)
        else if (b.frequency === 'biweekly') d = new Date(d.getTime() + 14 * 24 * 60 * 60 * 1000)
        else { d = new Date(d); d.setMonth(d.getMonth() + 1) }
      }
      return rows
    }

    if (payload.billingType === 'flexible') {
      const b = payload.billing || {}
      const rows = []
      if (Number(b.initialAmount) > 0 && b.initialDate) {
        rows.push({ description: 'Initial payment', amount: Number(b.initialAmount), dueDate: new Date(b.initialDate), status: b.collectNow === false ? 'upcoming' : 'paid' })
      }
      for (const c of b.futurePayments || []) {
        if (c.dueDate && Number(c.amount) > 0) {
          rows.push({ description: 'Scheduled payment', amount: Number(c.amount), dueDate: new Date(c.dueDate), status: 'upcoming' })
        }
      }
      return rows
    }

    return []
  }

  // Company-level gate: some enrollment types require the student to accept
  // an agreement packet (via studio iPad or texted link) before anything is
  // created or charged — see settings/documents "Agreement Settings".
  async function resolveAndMaybeGate(payload) {
    if (!resolvedCustomerID) {
      setError('Please select a student.')
      return { ok: false }
    }

    const resolveRes = await api.get(`/api/agreement-session/resolve?enrollmentType=${mode}`)
    if (!resolveRes?.success || !resolveRes.data?.required) {
      return handleCreateEnrollmentAndPackage(payload)
    }

    setError('')
    setSubmitting(true)

    const totalPaid = (payload.services || []).reduce((sum, s) => sum + Number(s.finalAmount || 0), 0)
    const totalDiscount = (payload.services || []).reduce((sum, s) => sum + Number(s.discountAmount || 0), 0)
    const schedule = buildSchedulePreview(payload)

    const sessionRes = await api.post('/api/agreement-session', {
      customerID: resolvedCustomerID,
      enrollmentType: mode,
      isRecurringBilling: payload.billingType === 'payment_plan',
      draftEnrollment: {
        label: payload?.label?.trim() || undefined,
        purchaseDate: new Date(),
        services: payload.services || [],
        totalPaid,
        totalDiscount,
        amountCollected: 0,
        billingType: payload.billingType,
        schedule,
      },
    })

    setSubmitting(false)

    if (!sessionRes?.success) {
      setError(sessionRes?.error || 'Failed to send the agreement for review.')
      return { ok: false }
    }

    setAgreementGate({
      contractID: sessionRes.data.contract._id,
      ipadUrl: sessionRes.data.ipadUrl,
      smsUrl: sessionRes.data.smsUrl,
      payload,
      status: 'sent',
    })

    return { ok: true, pendingAgreement: true }
  }

  useEffect(() => {
    if (!agreementGate || agreementGate.status !== 'sent') return
    const interval = setInterval(async () => {
      const statusRes = await api.get(`/api/agreement-session/${agreementGate.contractID}/status`)
      if (!statusRes?.success) return
      if (statusRes.data.status === 'signed') {
        clearInterval(interval)
        setAgreementGate(null)
        await handleCreateEnrollmentAndPackage(agreementGate.payload, agreementGate.contractID)
      }
    }, 4000)
    return () => clearInterval(interval)
  }, [agreementGate])

  async function handleResendAgreement() {
    if (!agreementGate) return
    const result = await api.post(`/api/agreement-session/${agreementGate.contractID}/resend`, {})
    if (result?.success) {
      setAgreementGate((p) => ({ ...p, smsUrl: result.data.smsUrl, ipadUrl: result.data.ipadUrl }))
    }
  }

  if (agreementGate) {
    return (
      <Sheet open={open} onClose={() => {}} width={SHEET_WIDTH}>
        <SheetContent className="flex flex-col items-center justify-center gap-4 p-8 text-center">
          <p className="text-[15px] font-semibold text-foreground">Waiting for student acceptance</p>
          <p className="text-[13px] text-muted-foreground max-w-sm">
            The enrollment agreement has been sent to the student&apos;s phone. Open it on the studio iPad, or wait for
            them to accept on their device. The enrollment won&apos;t be created and nothing will be charged until they accept.
          </p>
          <a
            href={agreementGate.ipadUrl}
            target="_blank"
            rel="noreferrer"
            className="text-[13px] text-brand hover:underline font-medium"
          >
            Open on studio iPad
          </a>
          <div className="flex gap-2 pt-2">
            <button
              type="button"
              onClick={handleResendAgreement}
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
        </SheetContent>
      </Sheet>
    )
  }

  return (
    <Sheet open={open} onClose={handleClose} width={SHEET_WIDTH}>
      <SheetContent onClose={handleClose} className="flex flex-col overflow-hidden p-0">
        <div className="shrink-0 border-b border-border bg-muted/30 px-5 pt-5 pb-3">
          <p className="text-[14px] font-bold text-foreground">
            {mode === 'membership' ? 'Assign Membership' : 'Create Enrollment'}
          </p>
          <p className="text-[12px] text-muted-foreground mt-1">
            {mode === 'membership'
              ? 'Give this student a recurring membership.'
              : mode === 'service'
                ? 'Sell services on their own — enrollment and services in one go.'
                : 'Create enrollment and package in one go.'}
          </p>
          <div className="mt-3 inline-flex rounded-lg border border-border bg-background p-0.5">
            {[
              { v: 'service', label: 'Service' },
              { v: 'package', label: 'Packages' },
              { v: 'membership', label: 'Memberships' },
            ].map((opt) => (
              <button
                key={opt.v}
                type="button"
                onClick={() => { setMode(opt.v); setError('') }}
                className={[
                  'h-8 px-4 rounded-md text-[12px] font-medium transition-colors',
                  mode === opt.v ? 'bg-brand text-brand-foreground' : 'text-muted-foreground hover:text-foreground',
                ].join(' ')}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-4">
          {mode !== 'membership' ? (
            <>
              <div className="rounded-xl border border-border bg-card p-3 mb-0">
                <p className="text-[12px] font-semibold text-foreground mb-1">Student</p>
                {fixedCustomerID ? (
                  <p className="text-[12px] font-medium text-foreground truncate">
                    {selectedCustomerLabel || 'Selected student'}
                  </p>
                ) : (
                  <SearchableSelect
                    value={selectedCustomerID}
                    onChange={(v) => setSelectedCustomerID(v)}
                    options={customerOptions}
                    placeholder="Select student…"
                  />
                )}
              </div>

              <NewEnrollmentPackageInline
                teacherOptions={teacherOptions}
                serviceOnly={mode === 'service'}
                packageTemplates={mode === 'service' ? [] : sellablePackages}
                allowedServiceCodes={allowedServiceCodes}
                customerID={resolvedCustomerID}
                locationID={resolvedLocationID}
                onCancel={handleClose}
                onSubmit={resolveAndMaybeGate}
              />

              {error && (
                <div className="mt-3 rounded-lg bg-destructive/10 border border-destructive/20 px-3 py-2 text-[12px] text-destructive">
                  {error}
                </div>
              )}
              {submitting && (
                <p className="mt-2 text-[11px] text-muted-foreground">Creating…</p>
              )}
            </>
          ) : (
            <>
              {!fixedCustomerID && (
                <div className="rounded-xl border border-border bg-card p-3 mb-4">
                  <p className="text-[12px] font-semibold text-foreground mb-1">Student</p>
                  <SearchableSelect
                    value={selectedCustomerID}
                    onChange={(v) => setSelectedCustomerID(v)}
                    options={customerOptions}
                    placeholder="Select student…"
                  />
                </div>
              )}
              <AssignMembershipForm
                customerID={resolvedCustomerID}
                locationID={resolvedLocationID}
                onSuccess={() => { handleClose(); onSuccess?.() }}
                onCancel={handleClose}
              />
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  )
}
