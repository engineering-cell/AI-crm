import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { cleanup, render, screen, within } from '@testing-library/react'
import EnrollmentServicesTable from '../EnrollmentServicesTable'

// The account the studio reported (Fort Lee test student): a $725 payment plan with $155
// collected (1 of 5 instalments), 5 private lessons at $145 each, and two private lessons
// booked on Nov 19 - 2:40-3:30 PM and 3:30-4:20 PM New York time.
const CUSTOMER = 'cust-1'
const ENR = { _id: 'enr-1' }
const CP = { billingType: 'payment_plan', amountCollected: 155, totalPaid: 725 }
const PL = { serviceCode: 'PL', serviceName: 'Private Lesson' }

const lesson = (id, startIso, endIso, status) => ({
  _id: id,
  startDateTime: startIso,
  endDateTime: endIso,
  status,
  calendarServiceID: PL,
  charges: [{ customerID: CUSTOMER, method: 'package', enrollmentID: 'enr-1' }],
})

const EVENTS = [
  lesson('a', '2026-11-19T19:40:00Z', '2026-11-19T20:30:00Z', 'scheduled'), // finished 3:30 PM
  lesson('b', '2026-11-19T20:30:00Z', '2026-11-19T21:20:00Z', 'scheduled'), // 3:30-4:20 PM
]

// The backend's per-service counters at a given moment (what getCustomerPackageDetails returns).
const services = (completed, scheduled) => [
  {
    ...PL, color: '#00f', sessionsTotal: 5, sessionsUsed: 2, sessionsCompleted: completed,
    sessionsScheduled: scheduled, pricePerSession: 155, finalAmount: 725, isChargeable: true,
  },
]

const renderTable = (svcs) =>
  render(
    <EnrollmentServicesTable
      enr={ENR} cp={CP} services={svcs} calendarEvents={EVENTS}
      customerID={CUSTOMER} expandedServices={new Set()} onToggle={() => {}}
    />,
  )

describe('Services table, lesson in progress', () => {
  beforeEach(() => {
    vi.useFakeTimers()
    vi.setSystemTime(new Date('2026-11-19T20:35:00Z')) // 3:35 PM New York: lesson B has started, not ended
  })
  afterEach(() => {
    cleanup()
    vi.useRealTimers()
  })

  it('shows Completed 1 / Scheduled 1 and one partially paid lesson - not a phantom second completed lesson', () => {
    // After the backend fix: 1 ended lesson, 1 in progress.
    renderTable(services(1, 1))
    const row = screen.getByText('Private Lesson').closest('div[class*="grid"]')
    const text = row.textContent
    expect(text).toMatch(/1 partially paid/)
    expect(text).not.toMatch(/unpaid/i)
    // credit: paid for $155 of 2 x $145 => -0.93 lessons, $135 short
    expect(row.textContent).toMatch(/-0\.93 lessons/)
    expect(row.textContent).toMatch(/\$135\.00 short/)
    expect(screen.queryByText(/-1\.93/)).toBeNull()
    // the warning banner is about the scheduled lesson only
    expect(screen.getByText(/\$135\.00 needed to fully cover scheduled lessons/)).toBeTruthy()
    expect(screen.queryByText(/unpaid for completed lessons/)).toBeNull()
  })

  it('does not invent an imported lesson even if the counters lag a moment behind', () => {
    // Stale counters (the old start-time rule: Completed 2, Scheduled 0) must not turn the
    // lesson in progress into money-eating phantom usage in the coverage maths.
    renderTable(services(1, 1))
    expect(screen.queryByText(/1 unpaid/)).toBeNull()
  })
})

describe('Services table, after both lessons have ended', () => {
  beforeEach(() => {
    vi.useFakeTimers()
    vi.setSystemTime(new Date('2026-11-19T22:00:00Z'))
  })
  afterEach(() => {
    cleanup()
    vi.useRealTimers()
  })

  it('first lesson paid, second partially paid, both completed', () => {
    renderTable(services(2, 0))
    const row = screen.getByText('Private Lesson').closest('div[class*="grid"]')
    expect(row.textContent).toMatch(/1 partially paid/)
    expect(within(row).queryByText(/unpaid/i)).toBeNull()
    expect(screen.getByText(/\$135\.00 unpaid for completed lessons/)).toBeTruthy()
  })

  it('says nothing is scheduled, rather than that scheduled lessons are paid, when there are none', () => {
    renderTable(services(2, 0))
    expect(screen.getByText('No lessons scheduled')).toBeTruthy()
    expect(screen.queryByText('All scheduled lessons are paid')).toBeNull()
  })
})
