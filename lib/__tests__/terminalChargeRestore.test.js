import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, waitFor, screen } from '@testing-library/react'

const get = vi.fn()
vi.mock('@/lib/api', () => ({ default: { get: (...a) => get(...a), post: vi.fn() } }))
vi.mock('@/lib/auth', () => ({ isAuthenticated: vi.fn() }))
vi.mock('@/components/ui/toast', () => ({ toast: { success: vi.fn(), error: vi.fn(), info: vi.fn() } }))

import { isAuthenticated } from '@/lib/auth'
import { subscribeTerminalCharges, untrackTerminalCharge } from '../terminalCharge'
import TerminalChargeTracker from '@/components/payments/TerminalChargeTracker'

let tracked = []
subscribeTerminalCharges((c) => { tracked = c })
const recent = { _id: 'p-recent', amount: 18, method: 'terminal', status: 'pending', createdAt: new Date().toISOString() }
const stale = { _id: 'p-stale', amount: 9, method: 'terminal', status: 'pending', createdAt: new Date(Date.now() - 5 * 3600 * 1000).toISOString() }

describe('TerminalChargeTracker restores pending reader charges on load', () => {
  beforeEach(() => { tracked.slice().forEach((c) => untrackTerminalCharge(c.id)); get.mockReset(); isAuthenticated.mockReset() })

  it('picks up a recent pending charge and shows its Cancel button, ignoring a stale one', async () => {
    isAuthenticated.mockReturnValue(true)
    get.mockResolvedValue({ success: true, data: [recent, stale] })
    render(<TerminalChargeTracker />)
    await waitFor(() => expect(screen.getByText('Cancel charge')).toBeTruthy())
    expect(tracked.map((c) => c.id)).toEqual(['p-recent'])
    expect(get).toHaveBeenCalledWith('/api/payment?method=terminal&status=pending&limit=20')
  })

  it('does not call the API when signed out (a 401 would log the user out of the login page)', async () => {
    isAuthenticated.mockReturnValue(false)
    render(<TerminalChargeTracker />)
    await new Promise((r) => setTimeout(r, 50))
    expect(get).not.toHaveBeenCalled()
    expect(tracked).toHaveLength(0)
  })
})
