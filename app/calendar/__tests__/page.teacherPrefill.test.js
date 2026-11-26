import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, screen, fireEvent, cleanup } from '@testing-library/react'
import CalendarPage from '../page'

vi.mock('next/navigation', () => ({
  useSearchParams: () => new URLSearchParams(),
  useRouter: () => ({ push: vi.fn(), replace: vi.fn() }),
  usePathname: () => '/calendar',
}))
vi.mock('@/components/layout/MainLayout', () => ({ default: ({ children }) => <div>{children}</div> }))
vi.mock('../components/EventDetailPanel', () => ({ default: () => null }))
// Stands in for the booking form: shows which teacher the page hands it.
vi.mock('../components/AppointmentComposerPanel', () => ({
  default: ({ open, initialInstructorId, initialDate }) =>
    open ? <div data-testid="composer">{`${initialInstructorId || 'none'}|${initialDate || 'no-date'}`}</div> : null,
}))
vi.mock('@/lib/api', () => ({
  default: {
    get: vi.fn(async (url) =>
      url.startsWith('/api/teacher')
        ? { success: true, data: [{ _id: 't1', name: 'Tristen S' }, { _id: 't2', name: 'Other Teacher' }] }
        : { success: true, data: [] },
    ),
    patch: vi.fn(async () => ({ success: true })),
    put: vi.fn(async () => ({ success: true })),
    post: vi.fn(async () => ({ success: true })),
  },
}))

beforeEach(() => {
  const store = new Map()
  vi.stubGlobal('localStorage', {
    getItem: (k) => store.get(k) ?? null,
    setItem: (k, v) => store.set(k, String(v)),
    removeItem: (k) => store.delete(k),
  })
  vi.stubGlobal('matchMedia', () => ({ matches: false, addEventListener() {}, removeEventListener() {} }))
  vi.stubGlobal('ResizeObserver', class { observe() {} unobserve() {} disconnect() {} })
})
afterEach(() => {
  cleanup()
  vi.unstubAllGlobals()
})

const composer = () => screen.getByTestId('composer').textContent

async function filterToTristen() {
  fireEvent.click((await screen.findAllByRole('button', { name: /^Teacher$/ }))[0])
  fireEvent.click((await screen.findAllByRole('button', { name: /Tristen S/ }))[0])
}

function switchTo(view) {
  fireEvent.click(screen.getAllByRole('button', { name: view })[0])
}

function clickEmptyWeekSlot(container) {
  fireEvent.click(container.querySelectorAll('div[class*="group/col"]')[2], { clientY: 100 })
}

describe('booking form teacher prefill', () => {
  it('week view: an empty slot carries the filtered teacher', async () => {
    const { container } = render(<CalendarPage />)
    await filterToTristen()
    switchTo('Week')
    clickEmptyWeekSlot(container)
    expect(composer()).toMatch(/^t1\|\d{4}-\d{2}-\d{2}$/)
  })

  it('week view: with no filter the teacher is left empty', async () => {
    const { container } = render(<CalendarPage />)
    await screen.findAllByRole('button', { name: /^Teacher$/ })
    switchTo('Week')
    clickEmptyWeekSlot(container)
    expect(composer()).toMatch(/^none\|\d{4}/)
  })

  it('+ Create carries the filtered teacher', async () => {
    render(<CalendarPage />)
    await filterToTristen()
    fireEvent.click(screen.getAllByRole('button', { name: '+ Create' })[0])
    expect(composer()).toBe('t1|no-date')
  })
})
