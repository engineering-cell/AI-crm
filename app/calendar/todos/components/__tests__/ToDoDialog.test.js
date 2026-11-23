import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import ToDoDialog from '../ToDoDialog'

vi.mock('@/lib/api', () => ({ default: { post: vi.fn(async () => ({ success: true })), put: vi.fn(async () => ({ success: true })) } }))
vi.mock('@/components/ui/toast', () => ({ toast: { success: vi.fn(), error: vi.fn() } }))
vi.mock('@/components/shared/LocationSelector', () => ({ default: () => <div /> }))
import api from '@/lib/api'

const existing = { _id: 't1', name: 'DO NOT BOOK', locationID: ['loc1'], duration: 50, color: '#64c2f2' }

describe('To-do dialog: Include in Lessons Taught report', () => {
  beforeEach(() => vi.clearAllMocks())

  it('is off by default for a new to-do', () => {
    render(<ToDoDialog open onClose={() => {}} onRefresh={() => {}} />)
    expect(screen.getByRole('switch', { name: 'Include in Lessons Taught report' })).toHaveAttribute('aria-checked', 'false')
  })

  it('reflects the saved setting when editing', () => {
    render(<ToDoDialog open onClose={() => {}} onRefresh={() => {}} todo={{ ...existing, includeInLessonsTaught: true }} />)
    expect(screen.getByRole('switch', { name: 'Include in Lessons Taught report' })).toHaveAttribute('aria-checked', 'true')
  })

  it('an existing to-do with no saved setting shows it off', () => {
    render(<ToDoDialog open onClose={() => {}} onRefresh={() => {}} todo={existing} />)
    expect(screen.getByRole('switch', { name: 'Include in Lessons Taught report' })).toHaveAttribute('aria-checked', 'false')
  })

  it('saves the setting with the to-do', async () => {
    render(<ToDoDialog open onClose={() => {}} onRefresh={() => {}} todo={existing} />)
    fireEvent.click(screen.getByRole('switch', { name: 'Include in Lessons Taught report' }))
    fireEvent.click(screen.getByRole('button', { name: 'Save changes' }))

    await waitFor(() => expect(api.put).toHaveBeenCalled())
    expect(api.put).toHaveBeenCalledWith('/api/todo/t1', expect.objectContaining({ includeInLessonsTaught: true }))
  })
})
