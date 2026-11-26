import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import api from '@/lib/api'
import AssignMembershipForm from '@/components/membership/AssignMembershipForm'
import NewEnrollmentPackageInline from '@/app/calendar/components/NewEnrollmentPackageInline'

let autoRenew = true
const card = (id, last4) => ({ id, brand: 'visa', last4, expMonth: 4, expYear: 2029 })

vi.mock('@/lib/api', () => ({
  default: {
    get: vi.fn(async (url) => {
      if (url.startsWith('/api/wallet/')) return { success: true, data: { balance: 0 } }
      if (url.startsWith('/api/membership')) {
        return { success: true, data: [{ _id: 'm1', membershipName: 'Gold', price: 100, durationDays: 30, autoRenew }] }
      }
      if (url.startsWith('/api/payments/stripe/customers/')) {
        return { success: true, data: [card('pm_1', '4242'), card('pm_2', '1111')] }
      }
      return { success: true, data: [] }
    }),
    post: vi.fn(async () => ({ success: true, data: { customerMembership: { _id: 'cm1' } } })),
    patch: vi.fn(async () => ({ success: true })),
  },
}))
// The real toast reads localStorage, which this test environment doesn't provide.
vi.mock('@/components/ui/toast', () => ({ toast: { success: vi.fn(), error: vi.fn() }, useToast: () => ({}) }))
vi.mock('@/app/settings/payments/useCardProcessor',() => ({ useCardProcessor: () => ({ ready: true }) }))
vi.mock('@/app/settings/payments/clover/useCloverConnection', () => ({ resolveLocationID: (id) => id }))

const autopayBox = () => screen.queryByRole('checkbox', { name: /Autopay with a saved card/ })

async function pickCard(id) {
  const option = await screen.findByRole('option', { name: /1111/ })
  fireEvent.change(option.closest('select'), { target: { value: id } })
}

async function openMembership() {
  render(<AssignMembershipForm customerID="c1" locationID="loc1" onSuccess={() => {}} onCancel={() => {}} />)
  const option = await screen.findByRole('option', { name: /Gold/ })
  fireEvent.change(option.closest('select'), { target: { value: 'm1' } })
}

describe('autopay at the point of sale', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    autoRenew = true
  })

  it('membership: turns autopay on for the new membership, once a card is chosen', async () => {
    await openMembership()
    fireEvent.click(autopayBox())
    expect(screen.getByRole('button', { name: 'Assign Membership' })).toBeDisabled()
    await pickCard('pm_2')
    fireEvent.click(screen.getByRole('button', { name: 'Assign Membership' }))

    await waitFor(() => expect(api.patch).toHaveBeenCalledWith('/api/customer-membership/cm1/autopay', { paymentMethodId: 'pm_2' }))
  })

  it('membership: left off, nothing is turned on', async () => {
    await openMembership()
    fireEvent.click(screen.getByRole('button', { name: 'Assign Membership' }))
    await waitFor(() => expect(api.post).toHaveBeenCalled())
    expect(api.patch).not.toHaveBeenCalled()
  })

  it('membership: not offered when nothing renews and nothing is scheduled', async () => {
    autoRenew = false
    await openMembership()
    expect(autopayBox()).toBeNull()
  })

  it('package: a payment plan sends the chosen card; a one-time sale offers nothing', async () => {
    const open = async (billingType) => {
      const onSubmit = vi.fn(async () => ({ ok: true }))
      const pkg = { _id: 'pk1', packageName: 'Starter', billingType, services: [{ serviceCode: 'PL', serviceName: 'Private Lesson', numberOfSessions: 10, pricePerSession: 160 }] }
      const view = render(<NewEnrollmentPackageInline packageTemplates={[pkg]} customerID="c1" locationID="loc1" onSubmit={onSubmit} onCancel={() => {}} />)
      await waitFor(() => expect(screen.getByRole('button', { name: /Next: Payment/ })).toBeEnabled())
      const date = view.container.querySelectorAll('input[type="date"]')
      if (billingType === 'payment_plan') fireEvent.change(date[date.length - 1], { target: { value: '2026-11-26' } })
      fireEvent.click(screen.getByRole('button', { name: /Next: Payment/ }))
      await screen.findByRole('button', { name: 'Cash' })
      return { onSubmit, view }
    }

    const oneTime = await open('one_time')
    expect(autopayBox()).toBeNull()
    oneTime.view.unmount()

    const { onSubmit } = await open('payment_plan')
    fireEvent.click(autopayBox())
    const submit = screen.getByRole('button', { name: /Create Enrollment/ })
    expect(submit).toBeDisabled()
    await pickCard('pm_2')
    fireEvent.click(submit)

    await waitFor(() => expect(onSubmit).toHaveBeenCalled())
    expect(onSubmit.mock.calls[0][0].billing.autopayCardID).toBe('pm_2')
  })
})
