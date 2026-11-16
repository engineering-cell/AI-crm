import { describe, it, expect, vi, beforeEach } from 'vitest'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'

const get = vi.fn()
vi.mock('@/lib/api', () => ({ default: { get: (...a) => get(...a) } }))

import DrillView from '../DrillView'

describe('DrillView', () => {
  beforeEach(() => get.mockReset())

  it('walks Organization → Studio → Instructor and sends each choice to the backend', async () => {
    get.mockImplementation(async (url = '') => {
      if (url.includes('teacherID')) return { success: true, data: { level: 'customer', rows: [{ key: 'c1', name: 'Ann', count: 1, value: 400 }] } }
      if (url.includes('locationID')) return { success: true, data: { level: 'instructor', rows: [{ key: 't1', name: 'Yuri', count: 3, value: 900 }] } }
      return { success: true, data: { level: 'studio', rows: [{ key: 's1', name: 'Soho', count: 5, value: 1200 }] } }
    })
    render(<DrillView kind="sales" range="mtd" />)

    fireEvent.click(await screen.findByText('Soho'))
    fireEvent.click(await screen.findByText('Yuri'))
    expect(await screen.findByText('Ann')).toBeInTheDocument()
    const last = get.mock.calls.at(-1)[0]
    expect(last).toContain('locationID=s1')
    expect(last).toContain('teacherID=t1')
    expect(last).toContain('kind=sales')

    // Breadcrumb walks back up.
    fireEvent.click(screen.getByText('Organization'))
    await waitFor(() => expect(screen.getByText('Soho')).toBeInTheDocument())
  })

  it('shows the retry state instead of a blank table when a level fails to load', async () => {
    get.mockResolvedValue({ success: false, error: 'boom' })
    render(<DrillView kind="lessons" range="mtd" />)
    expect(await screen.findByText('Retry')).toBeInTheDocument()
  })
})
