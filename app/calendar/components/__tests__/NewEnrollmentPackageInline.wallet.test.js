import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import NewEnrollmentPackageInline from '../NewEnrollmentPackageInline'

let walletBalance = 1000
vi.mock('@/lib/api', () => ({
  default: {
    get: vi.fn(async (url) => {
      if (url.startsWith('/api/wallet/')) return { success: true, data: { balance: walletBalance } }
      if (url.startsWith('/api/payments/stripe/readers')) return { success: true, data: [{ _id: 'reader1', label: 'Front desk' }] }
      return { success: true, data: [] }
    }),
    post: vi.fn(),
  },
}))
vi.mock('@/app/settings/payments/useCardProcessor', () => ({ useCardProcessor: () => ({ ready: true }) }))

// The screenshot: a $950 one-time sale to a customer with $1,000 in the wallet.
const pkg = (billingType) => ({
  _id: 'pk1',
  packageName: 'Starter 8',
  billingType,
  services: [{ serviceCode: 'PL', serviceName: 'Private Lesson', numberOfSessions: 1, pricePerSession: 950 }],
})

async function openPayment(billingType = 'one_time') {
  const onSubmit = vi.fn(async () => ({ ok: true }))
  render(<NewEnrollmentPackageInline packageTemplates={[pkg(billingType)]} customerID="c1" locationID="loc1" onSubmit={onSubmit} onCancel={() => {}} />)
  await waitFor(() => expect(screen.getByRole('button', { name: /Next: Payment/ })).toBeEnabled())
  fireEvent.click(screen.getByRole('button', { name: /Next: Payment/ }))
  await screen.findByRole('button', { name: 'Wallet' })
  return onSubmit
}

describe('Create Enrollment: Wallet is a payment method', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    walletBalance = 1000
  })

  it('shows Wallet beside Terminal, Cash, ACH — and no "Use wallet balance" toggle', async () => {
    await openPayment()
    for (const name of ['Terminal', 'Cash', 'Wallet', 'ACH', 'Share Link']) {
      expect(screen.getByRole('button', { name })).toBeInTheDocument()
    }
    expect(screen.queryByText(/Use wallet balance/)).toBeNull()
  })

  it('paying $950 by Wallet sends it all as wallet credit', async () => {
    const onSubmit = await openPayment()
    fireEvent.click(screen.getByRole('button', { name: 'Wallet' }))
    expect(screen.getByLabelText('From wallet')).toHaveValue(950)
    expect(screen.getByText(/covers this payment/)).toBeInTheDocument()

    fireEvent.click(screen.getByRole('button', { name: /Create Enrollment/ }))
    await waitFor(() => expect(onSubmit).toHaveBeenCalled())
    const { billing } = onSubmit.mock.calls[0][0]
    expect(billing).toMatchObject({ useWallet: true, walletAmount: 950, method: 'cash', collectAmount: 950 })
  })

  it('an edited wallet amount leaves the rest to the method picked for it', async () => {
    const onSubmit = await openPayment()
    fireEvent.click(screen.getByRole('button', { name: 'Wallet' }))
    fireEvent.change(screen.getByLabelText('From wallet'), { target: { value: '700' } })
    expect(screen.getByText(/Collect the remaining/)).toHaveTextContent('$250.00')
    fireEvent.change(screen.getByLabelText('Collect the rest by'), { target: { value: 'cheque' } })

    fireEvent.click(screen.getByRole('button', { name: /Create Enrollment/ }))
    await waitFor(() => expect(onSubmit).toHaveBeenCalled())
    expect(onSubmit.mock.calls[0][0].billing).toMatchObject({ useWallet: true, walletAmount: 700, method: 'cheque' })
  })

  it('a short wallet pays what it has; more than it holds blocks the sale', async () => {
    walletBalance = 300
    await openPayment()
    fireEvent.click(screen.getByRole('button', { name: 'Wallet' }))
    expect(screen.getByLabelText('From wallet')).toHaveValue(300)
    expect(screen.getByText(/Collect the remaining/)).toHaveTextContent('$650.00')

    fireEvent.change(screen.getByLabelText('From wallet'), { target: { value: '400' } })
    expect(screen.getByText('More than the wallet holds.')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /Create Enrollment/ })).toBeDisabled()
  })

  it('offers Terminal for what the wallet leaves, and sends the reader with the wallet split', async () => {
    walletBalance = 300
    const onSubmit = await openPayment()
    fireEvent.click(screen.getByRole('button', { name: 'Wallet' }))
    const options = Array.from(screen.getByLabelText('Collect the rest by').querySelectorAll('option')).map((o) => o.textContent)
    expect(options).toContain('Terminal')

    fireEvent.change(screen.getByLabelText('Collect the rest by'), { target: { value: 'terminal' } })
    // Same reader picker as a terminal-only sale, preselected when it is the only reader.
    await waitFor(() => expect(screen.getByRole('button', { name: /Create Enrollment/ })).toBeEnabled())

    fireEvent.click(screen.getByRole('button', { name: /Create Enrollment/ }))
    await waitFor(() => expect(onSubmit).toHaveBeenCalled())
    expect(onSubmit.mock.calls[0][0].billing).toMatchObject({
      method: 'terminal',
      deviceID: 'reader1',
      useWallet: true,
      walletAmount: 300,
    })
  })

  it('Terminal for the remainder is blocked until a reader is chosen', async () => {
    walletBalance = 300
    await openPayment()
    fireEvent.click(screen.getByRole('button', { name: 'Wallet' }))
    const { default: api } = await import('@/lib/api')
    api.get.mockImplementation(async (url) => {
      if (url.startsWith('/api/wallet/')) return { success: true, data: { balance: walletBalance } }
      return { success: true, data: [] } // no readers paired
    })
    fireEvent.change(screen.getByLabelText('Collect the rest by'), { target: { value: 'terminal' } })
    expect(screen.getByRole('button', { name: /Create Enrollment/ })).toBeDisabled()
  })

  it('a non-wallet sale is unchanged: Cash sends no wallet amount', async () => {
    const onSubmit = await openPayment()
    fireEvent.click(screen.getByRole('button', { name: 'Cash' }))
    fireEvent.click(screen.getByRole('button', { name: /Create Enrollment/ }))
    await waitFor(() => expect(onSubmit).toHaveBeenCalled())
    expect(onSubmit.mock.calls[0][0].billing).toMatchObject({ method: 'cash', useWallet: false, walletAmount: '' })
  })
})
