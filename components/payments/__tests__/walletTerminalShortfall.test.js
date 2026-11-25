import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { SHORTFALL_METHODS, SHORTFALL_METHODS_WITH_TERMINAL } from '@/lib/paymentMethods'
import PaymentDueCard from '../PaymentDueCard'
import PayInstallmentDialog from '../PayInstallmentDialog'

// The wallet pays part and the card reader collects the rest. Each form that offers the
// wallet must list Terminal for the rest, show the reader picker once it is chosen, and
// send the reader with the wallet split.

vi.mock('@/lib/api', () => ({
  default: {
    get: vi.fn(async (url) => {
      if (url.startsWith('/api/payments/stripe/readers')) return { success: true, data: [{ _id: 'reader1', label: 'Front desk' }] }
      return { success: true, data: [] }
    }),
    post: vi.fn(async () => ({ success: true, data: {} })),
  },
}))
vi.mock('@/lib/wallet', () => ({ fetchWalletBalance: vi.fn(async () => 300) }))
vi.mock('@/app/settings/payments/useCardProcessor', () => ({ useCardProcessor: () => ({ ready: true, provider: 'stripe' }) }))
vi.mock('@/components/ui/toast', () => ({ useToast: () => ({ success: vi.fn(), error: vi.fn() }), toast: { success: vi.fn(), error: vi.fn() } }))
import api from '@/lib/api'

const optionLabels = (select) => Array.from(select.querySelectorAll('option')).map((o) => o.textContent)

describe('shortfall method lists', () => {
  it('Terminal is offered only by the list for forms that can charge the reader the remainder', () => {
    expect(SHORTFALL_METHODS.map((m) => m.value)).not.toContain('terminal')
    expect(SHORTFALL_METHODS_WITH_TERMINAL.map((m) => m.value)).toContain('terminal')
    expect(SHORTFALL_METHODS_WITH_TERMINAL.map((m) => m.value)).not.toContain('wallet')
  })
})

describe('Balance due (PaymentDueCard)', () => {
  beforeEach(() => vi.clearAllMocks())

  it('offers Terminal for what the wallet leaves and sends the reader with the wallet split', async () => {
    render(<PaymentDueCard itemName="Starter" amountDue={950} customerID="c1" locationID="loc1" paymentType="package_purchase" paymentTarget={{ enrollmentID: 'e1' }} onSuccess={() => {}} />)
    fireEvent.click(screen.getByRole('button', { name: 'Pay Now' }))
    fireEvent.click(await screen.findByRole('button', { name: 'Wallet' }))

    const select = await screen.findByLabelText('Collect the rest by')
    expect(optionLabels(select)).toContain('Terminal')

    fireEvent.change(select, { target: { value: 'terminal' } })
    // The reader picker follows the method that charges, and a lone reader is preselected,
    // which is what enables the submit button (it reads "Charge Terminal").
    const submit = await screen.findByRole('button', { name: 'Charge Terminal' })
    await waitFor(() => expect(submit).toBeEnabled())
    fireEvent.click(submit)

    await waitFor(() => expect(api.post).toHaveBeenCalled())
    expect(api.post.mock.calls[0][1]).toMatchObject({ method: 'terminal', deviceID: 'reader1', walletAmount: 300 })
  })
})

describe('Pay installment (PayInstallmentDialog)', () => {
  beforeEach(() => vi.clearAllMocks())

  it('offers Terminal for what the wallet leaves of an installment', async () => {
    const plan = { _id: 'p1', customerID: 'c1', installments: [{ amount: 500, status: 'pending' }] }
    render(<PayInstallmentDialog open onClose={() => {}} plan={plan} installmentIndex={0} billingType="payment_plan" locationID="loc1" onSuccess={() => {}} />)
    fireEvent.click(await screen.findByRole('button', { name: 'Wallet' }))

    const select = await screen.findByLabelText('Collect the rest by')
    expect(optionLabels(select)).toContain('Terminal')
  })
})
