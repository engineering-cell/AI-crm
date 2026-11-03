import { useState } from 'react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { cleanup, render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import api from '@/lib/api'
import ContactDetails from '../ContactDetails'

vi.mock('@/lib/api', () => ({
  default: { put: vi.fn(), post: vi.fn(), delete: vi.fn() },
}))

const toast = vi.hoisted(() => ({ success: vi.fn(), error: vi.fn() }))
vi.mock('@/components/ui/toast', () => ({ useToast: () => toast }))

const contact = { name: 'Shane Warren' }

/** Mirrors the inbox page: patches land back on the profile it passes down. */
function Harness({ initial, kind }) {
  const [profile, setProfile] = useState(initial)
  return (
    <ContactDetails
      contact={contact}
      leadData={profile}
      contactKind={kind}
      onContactPatched={(id, patch) => {
        expect(id).toBe(initial._id)
        setProfile((prev) => ({ ...prev, ...patch }))
      }}
      onClose={() => {}}
    />
  )
}

const dateInput = () => screen.getByLabelText('Callback date')

describe('ContactDetails callback date and notes', () => {
  beforeEach(() => vi.clearAllMocks())
  afterEach(cleanup)

  it('shows the stored calendar date without a timezone shift', () => {
    render(<Harness kind="lead" initial={{ _id: 'l1', callbackDate: '2026-11-15T00:00:00.000Z' }} />)
    expect(dateInput().value).toBe('2026-11-15')
  })

  it('offers Save only after the date changes, and saves to the lead', async () => {
    api.put.mockResolvedValue({ success: true, data: {} })
    render(<Harness kind="lead" initial={{ _id: 'l1' }} />)
    expect(screen.queryByRole('button', { name: 'Save' })).toBeNull()

    await userEvent.type(dateInput(), '2026-12-01')
    await userEvent.click(screen.getByRole('button', { name: 'Save' }))

    expect(api.put).toHaveBeenCalledWith('/api/lead/l1', { callbackDate: '2026-12-01' })
    await waitFor(() => expect(screen.queryByRole('button', { name: 'Save' })).toBeNull())
  })

  it('clears the date on a customer record by sending null', async () => {
    api.put.mockResolvedValue({ success: true, data: {} })
    render(<Harness kind="customer" initial={{ _id: 'c1', callbackDate: '2026-11-15T00:00:00.000Z' }} />)

    await userEvent.clear(dateInput())
    await userEvent.click(screen.getByRole('button', { name: 'Save' }))

    expect(api.put).toHaveBeenCalledWith('/api/customer/c1', { callbackDate: null })
  })

  it('keeps the draft and shows an error when the save fails', async () => {
    api.put.mockResolvedValue({ success: false, error: 'Forbidden' })
    render(<Harness kind="lead" initial={{ _id: 'l1' }} />)

    await userEvent.type(dateInput(), '2026-12-01')
    await userEvent.click(screen.getByRole('button', { name: 'Save' }))

    await waitFor(() => expect(toast.error).toHaveBeenCalled())
    expect(dateInput().value).toBe('2026-12-01')
    expect(screen.getByRole('button', { name: 'Save' })).toBeTruthy()
  })

  it('adds and deletes notes using the list the API returns', async () => {
    const saved = { _id: 'n1', text: 'Call after 5pm', createdAt: '2026-11-01T10:00:00.000Z', createdBy: { name: 'Leanne' } }
    api.post.mockResolvedValue({ success: true, data: [saved] })
    api.delete.mockResolvedValue({ success: true, data: [] })
    render(<Harness kind="lead" initial={{ _id: 'l1', notes: [] }} />)

    await userEvent.type(screen.getByLabelText('Add a note'), '  Call after 5pm  ')
    await userEvent.click(screen.getByRole('button', { name: 'Add note' }))

    expect(api.post).toHaveBeenCalledWith('/api/lead/l1/notes', { text: 'Call after 5pm' })
    expect(await screen.findByText('Call after 5pm')).toBeTruthy()
    expect(screen.getByText(/Leanne/)).toBeTruthy()
    expect(screen.getByLabelText('Add a note').value).toBe('')

    await userEvent.click(screen.getByRole('button', { name: 'Delete note' }))

    expect(api.delete).toHaveBeenCalledWith('/api/lead/l1/notes/n1')
    expect(await screen.findByText('No notes yet.')).toBeTruthy()
  })

  it('lists pinned customer notes first, then newest', () => {
    const notes = [
      { _id: 'old', text: 'older', createdAt: '2026-01-01T00:00:00.000Z' },
      { _id: 'new', text: 'newer', createdAt: '2026-06-01T00:00:00.000Z' },
      { _id: 'pin', text: 'pinned', isPinned: true, createdAt: '2025-01-01T00:00:00.000Z' },
    ]
    render(<Harness kind="customer" initial={{ _id: 'c1', notes }} />)

    const rendered = screen.getAllByText(/^(older|newer|pinned)$/).map((el) => el.textContent)
    expect(rendered).toEqual(['pinned', 'newer', 'older'])
  })

  it('does not carry unsaved input over to the next contact', async () => {
    const { rerender } = render(
      <ContactDetails contact={contact} leadData={{ _id: 'l1' }} contactKind="lead" onClose={() => {}} />,
    )
    await userEvent.type(dateInput(), '2026-12-01')
    await userEvent.type(screen.getByLabelText('Add a note'), 'for the first lead')

    rerender(<ContactDetails contact={contact} leadData={{ _id: 'l2' }} contactKind="lead" onClose={() => {}} />)

    expect(dateInput().value).toBe('')
    expect(screen.getByLabelText('Add a note').value).toBe('')
  })

  it('hides both sections until the profile has loaded', () => {
    render(<ContactDetails contact={contact} leadData={null} contactKind={null} onClose={() => {}} />)
    expect(screen.queryByLabelText('Callback date')).toBeNull()
    expect(screen.queryByText('Notes')).toBeNull()
  })
})
