import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import api from '@/lib/api'
import AssignMembershipForm from '../AssignMembershipForm'

const card = (id, last4) => ({ id, brand: 'visa', last4, expMonth: 4, expYear: 2029 })

vi.mock('@/lib/api', () => ({
  default: {
    get: vi.fn(async (url) => {
      if (url.startsWith('/api/wallet/')) return { success: true, data: { balance: 0 } }
      if (url.startsWith('/api/membership')) {
        return { success: true, data: [{ _id: 'm1', membershipName: 'Gold', price: 100, durationDays: 30 }] }
      }
      if (url.startsWith('/api/payments/stripe/customers/')) {
        return { success: true, data: [card('pm_1', '4242'), card('pm_2', '1111')] }
      }
      return { success: true, data: [] }
    }),
    post: vi.fn(async () => ({ success: true, data: { pending: true } })),
  },
}))
vi.mock('@/app/settings/payments/useCardProcessor', () => ({ useCardProcessor: () => ({ processor: null }) }))
vi.mock('@/app/settings/payments/clover/useCloverConnection', () => ({ resolveLocationID: (id) => id }))

describe('AssignMembershipForm: saved card', () => {
  beforeEach(() => vi.clearAllMocks())

  it('needs a card chosen, then sends it with the sale', async () => {
    render(<AssignMembershipForm customerID="c1" locationID="loc1" onSuccess={() => {}} onCancel={() => {}} />)
    const option = await screen.findByRole('option', { name: /Gold/ })
    fireEvent.change(option.closest('select'), { target: { value: 'm1' } })
    fireEvent.click(await screen.findByRole('button', { name: 'Saved card' }))

    const cardOption = await screen.findByRole('option', { name: /1111/ })
    const submit = screen.getByRole('button', { name: 'Assign Membership' })
    expect(submit).toBeDisabled()

    fireEvent.change(cardOption.closest('select'), { target: { value: 'pm_2' } })
    expect(submit).toBeEnabled()
    fireEvent.click(submit)

    await waitFor(() => expect(api.post).toHaveBeenCalledWith('/api/customer-membership', expect.anything()))
    const [, body] = api.post.mock.calls.find(([url]) => url === '/api/customer-membership')
    expect(body.billing).toMatchObject({ method: 'saved_card', savedCardID: 'pm_2' })
  })
})
