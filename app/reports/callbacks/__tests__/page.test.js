import { afterEach, describe, expect, it, vi } from 'vitest'
import { cleanup, render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

const push = vi.hoisted(() => vi.fn())
vi.mock('next/navigation', () => ({ useRouter: () => ({ push }) }))
vi.mock('@/components/layout/MainLayout', () => ({ default: ({ children }) => <div>{children}</div> }))
vi.mock('@/app/leads/components/LeadsDialog', () => ({ default: () => null }))
vi.mock('@/components/leads/LeadCommunicationDialog', () => ({
  default: ({ lead, channel, contactType }) =>
    lead ? <div data-testid="comm">{`${contactType}:${channel}:${lead._id}`}</div> : null,
}))
vi.mock('@/lib/lead-stages', () => ({
  useLeadStages: () => ({ stages: [] }),
  formatLeadStageLabel: () => 'New',
  getLeadStageColor: () => 'gray',
}))
vi.mock('@/lib/hooks/useListStatePersistence', () => ({
  readPersistedListState: () => null,
  usePersistListState: () => {},
}))
const get = vi.hoisted(() => vi.fn())
vi.mock('@/lib/api', () => ({ default: { get } }))

import Page, { resolveCallback } from '../page'

afterEach(() => {
  cleanup()
  vi.useRealTimers()
  get.mockReset()
  push.mockReset()
})

function mockApi(rows) {
  get.mockImplementation(async (path) => {
    if (path.startsWith('/api/location')) return { success: true, data: [{ _id: 'l1', name: 'NY', timezone: 'America/New_York' }] }
    return { success: true, data: rows, pagination: { total: rows.length } }
  })
}

describe('Callback report', () => {
  it('shows the studio-local day and status (ignores the browser clock) and opens communication without opening the row', async () => {
    vi.useFakeTimers({ toFake: ['Date'] })
    vi.setSystemTime(new Date('2026-11-20T01:00:00Z')) // Nov 20 in India, Nov 19 8pm in New York
    mockApi([
      { _id: 'c1', name: 'Ann', email: 'a@x.com', phoneNumber: '1', locationID: ['l1'], callbackDate: '2026-11-20T00:00:00.000Z', calls: 1, emails: 2, chats: 3 },
    ])
    render(<Page />)
    await userEvent.setup({ advanceTimers: () => {} }).click(await screen.findByRole('button', { name: /Customers/ })).catch(() => {})
    expect(await screen.findByText('Nov 20, 2026 · in 1d')).toBeTruthy()
    const btn = screen.getByRole('button', { name: 'Open emails for Ann' })
    btn.click()
    expect(await screen.findByTestId('comm')).toHaveProperty('textContent', 'Customer:Email:c1')
    expect(push).not.toHaveBeenCalled()
  })

  it('backend callbackStatus wins over the local computation', () => {
    const info = resolveCallback({ callbackDate: '2020-01-01T00:00:00Z', callbackStatus: 'upcoming', locationTimezone: 'America/New_York' })
    expect(info.status).toBe('upcoming')
  })

  it('falls back to the /api/location timezone for a customer row with a locationID array', async () => {
    vi.useFakeTimers({ toFake: ['Date'] })
    vi.setSystemTime(new Date('2026-11-20T01:00:00Z'))
    mockApi([{ _id: 'c2', name: 'Bo', locationID: ['l1'], callbackDate: '2026-11-19T00:00:00.000Z' }])
    render(<Page />)
    await userEvent.click(await screen.findByRole('button', { name: /Customers/ }))
    // New York is still Nov 19 -> Today (India would say Overdue)
    expect(await screen.findByText('Nov 19, 2026 · Today')).toBeTruthy()
  })

  it('prefers the backend day key/status/timezone', () => {
    const info = resolveCallback({ callbackDate: '2026-11-20T17:00:00Z', callbackDayKey: '2026-11-20', callbackStatus: 'today', locationTimezone: 'America/New_York' })
    expect(info).toMatchObject({ dayKey: '2026-11-20', status: 'today' })
  })
})
