import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import NewEnrollmentPackageInline from '../NewEnrollmentPackageInline'

vi.mock('@/lib/api', () => ({
  default: {
    get: vi.fn(async (url) =>
      url.startsWith('/api/wallet/') ? { success: true, data: { balance: 0 } } : { success: true, data: [] },
    ),
    post: vi.fn(),
  },
}))
vi.mock('@/app/settings/payments/useCardProcessor', () => ({ useCardProcessor: () => ({ ready: true }) }))

const pkg = {
  _id: 'pk1',
  packageName: 'Starter 8',
  billingType: 'one_time',
  services: [{ serviceCode: 'PL', serviceName: 'Private Lesson', numberOfSessions: 1, pricePerSession: 950 }],
}

describe('Create Enrollment: notes', () => {
  it('sends what staff typed with the sale', async () => {
    const onSubmit = vi.fn(async () => ({ ok: true }))
    render(<NewEnrollmentPackageInline packageTemplates={[pkg]} customerID="c1" locationID="loc1" onSubmit={onSubmit} onCancel={() => {}} />)

    fireEvent.change(screen.getByLabelText('Notes (optional)'), { target: { value: 'Paid for by parent' } })
    await waitFor(() => expect(screen.getByRole('button', { name: /Next: Payment/ })).toBeEnabled())
    fireEvent.click(screen.getByRole('button', { name: /Next: Payment/ }))
    fireEvent.click(await screen.findByRole('button', { name: 'Cash' }))
    fireEvent.click(screen.getByRole('button', { name: /Create Enrollment/ }))

    await waitFor(() => expect(onSubmit).toHaveBeenCalled())
    expect(onSubmit.mock.calls[0][0].notes).toBe('Paid for by parent')
  })
})
