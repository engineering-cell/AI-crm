import { describe, it, expect, vi, beforeEach } from 'vitest'
import { fireEvent, render, screen, within } from '@testing-library/react'
import { money, moneyShort, num } from '../chrome'

// DetailsButton / LeadsDetailsButton call useRouter(); the page only needs a
// router to mount, navigation itself is not under test here.
vi.mock('next/navigation', () => ({ useRouter: () => ({ push: vi.fn() }) }))

// Recharts measures its container, which jsdom reports as 0×0 — every chart
// would then render nothing and warn. A fixed-size ResponsiveContainer stub
// keeps the surrounding panels (the thing under test) rendering normally.
vi.mock('recharts', async () => {
  const actual = await vi.importActual('recharts')
  return {
    ...actual,
    ResponsiveContainer: ({ children }) => (
      <div style={{ width: 600, height: 300 }}>{children}</div>
    ),
  }
})

const overview = vi.fn()
const classicOverview = vi.fn()

vi.mock('@/lib/hooks/useAnalyticsOverview', () => ({
  useOwnerDashboardOverview: (range) => overview(range),
  useDashboardOverview: (range) => classicOverview(range),
}))

/**
 * One owner-overview payload, shaped exactly like ownerDashboard.controller's
 * response — including every field added to back a previously-"NotAvailable"
 * panel with real data (studio columns, per-studio goals, ageing buckets, the
 * cohort-consistent show rate, the first-purchase product mix, and threshold
 * exceptions).
 */
function ownerPayload({
  revenue,
  lessons,
  leads,
  introsBooked,
  introsAttended,
  intros,
  purchases,
  active,
  booked,
}) {
  const showRatePct = introsBooked ? Math.round((introsAttended / introsBooked) * 100) : 0
  return {
    studentHealth: {
      perStudio: [
        {
          location: 'Soho',
          active,
          booked,
          notBooked: active - booked,
          bookedPct: Math.round((booked / active) * 100),
          avgLessonsPerActiveStudentPerWeek: 2.3,
          avgLessonsMTD: 6.4,
        },
      ],
      totals: { active, booked, notBooked: active - booked, bookedPct: Math.round((booked / active) * 100) },
      newActiveTrend: {
        momGrowth: { value: 12, trendPct: 20, trendType: 'up' },
        ytdGrowth: { value: 90, trendPct: 8, trendType: 'up' },
      },
    },
    revenue: {
      byStudio: [{ location: 'Soho', revenue }],
      membershipByType: [{ membershipName: 'Monthly', revenue: 4000 }],
      outstandingBalances: [{ location: 'Soho', outstanding: 8600 }],
      outstandingAgeing: [
        { bucket: '0–30 days', amount: 5200 },
        { bucket: '31–60 days', amount: 2100 },
        { bucket: '61–90 days', amount: 900 },
        { bucket: '90+ days', amount: 400 },
      ],
      totalOutstanding: 8600,
      byCurriculum: [{ tier: 'Bronze I', revenue: 26000 }],
      spec: {
        netSales: {
          total: revenue,
          byStudio: [{ location: 'Soho', revenue }],
          byServiceType: [
            { serviceType: 'Private Lessons', value: revenue, pct: 100, programs: [{ program: 'Starter', value: revenue, pct: 100 }] },
          ],
          trend: {
            monthly: [{ label: 'Nov MTD', partial: true, value: revenue }],
            quarterly: [{ label: 'Q4 26 QTD', partial: true, value: revenue }],
            yearly: [{ label: '2026 YTD', partial: true, value: revenue }],
            monthly12: [{ label: 'Nov MTD', partial: true, value: revenue }],
          },
        },
      },
    },
    lessons: {
      byStudio: [{ location: 'Soho', count: lessons }],
      byTeacher: [{ teacher: 'Yuri', studio: 'Soho', count: 148 }],
      trend: [
        { week: 'Week 1', count: 120 },
        { week: 'Week 2', count: 140 },
      ],
      forecastByStudio: [{ location: 'Soho', scheduled: 156 }],
      forecastByTeacher: [
        {
          teacher: 'Yuri',
          studio: 'Soho',
          scheduled: 34,
          weeklyCapacity: 40,
          remainingPerWeek: 6,
          projectedUtilizationPct: 85,
        },
      ],
      instructorUtilization: [
        { teacherID: 't1', teacher: 'Yuri', studio: 'Soho', weeklyCapacity: 40, actualPerWeek: 34, utilizationPct: 85 },
        { teacherID: 't2', teacher: 'Misha', studio: 'Soho', weeklyCapacity: 40, actualPerWeek: 26, utilizationPct: 65 },
      ],
      byCurriculum: [{ tier: 'Bronze I', count: 1108 }],
      scheduledThisWeek: { total: 156, confirmedPct: 94.5, byStudio: [{ location: 'Soho', scheduled: 156 }], introsThisWeek: 7, introsRestOfMonth: 12 },
      spec: {
        mix: { total: lessons, types: [{ type: 'Private Lessons', count: lessons, pct: 100, programs: [{ program: 'Starter', count: lessons }] }] },
        monthly6: [{ label: 'Nov MTD', partial: true, value: lessons }],
        monthly12: [{ label: 'Nov MTD', partial: true, value: lessons }],
        instructorWeek: {
          rows: [{ teacher: 'Yuri', studio: 'Soho', availableHrs: 40, bookedHrs: 34, taught: 20, scheduled: 14, capacitySlots: 40, remainingSlots: 6, remainingHrs: 6, utilizationPct: 85 }],
          org: { availableHrs: 40, bookedHrs: 34, remainingHrs: 6, utilizationPct: 85, avgLessonsPerInstructor: 34, extraStudentsPerWeek: 2 },
        },
      },
    },
    marketing: {
      leadTotal: 10,
      leadsBySource: [{ source: 'Meta', count: 6, pct: 60 }, { source: 'Google', count: 4, pct: 40 }],
      revenueBySource: [{ source: 'Meta', revenue: 52000 }],
      channelEconomics: [{ source: 'Meta', leads: 6, leadToIntroPct: 33.3, introToStarterPct: 50, revenue: 600, cpl: null, costPerSale: null, roas: null }],
      leadDensityByZip: [{ zip: '10013', leads: 4, starters: 1, revenue: 400 }],
      leadsByStudioSource: [{ location: 'Soho', total: 10, sources: [{ source: 'Meta', count: 6 }, { source: 'Google', count: 4 }] }],
    },
    funnel: {
      introToStarter: { introsTaught: 20, startersSold: 5, ratePct: 25, avgStarterSale: 400 },
      spec: {
        conversionRates: [],
        reports: {
          report1: { uniqueLeads: leads, qualified: 90, contacted: 80, booked: 20, bookedPct: 20, avgDaysToBook: 3.4, medianDaysToBook: 2 },
          report2: { introsBooked: 30, introsTaught: 24, showRatePct: 80, firstPurchases: 12, boughtPct: 50, avgSale: 550, avgCashAtSale: 420, collectionRatePct: 76.4, avgUnits: 3.4, medianDaysToBuy: 6 },
          report3: { cohort: 12, steps: [
            { n: 1, label: 'Purchase 1', customers: 12, avgSale: 550, avgCash: 420, collectionRatePct: 76.4, avgUnits: 3.4, ltv: 550, boughtAgainPct: null, medianDaysFromPrev: null, mix: [{ category: 'Core programs', count: 12, pct: 100 }] },
            { n: 2, label: 'Purchase 2', customers: 6, avgSale: 300, avgCash: 300, collectionRatePct: 100, avgUnits: 2, ltv: 850, boughtAgainPct: 50, medianDaysFromPrev: 21, mix: [{ category: 'Memberships', count: 6, pct: 100 }] },
          ] },
          report4: { starterEnrollments: 9, starterPerIntroPct: 37.5, steps: [
            { label: 'Starter', students: 9, avgSale: 400, avgCash: 300, avgUnits: 8, avgDaysInProgram: 40, ltv: 700, advancedPct: 33.3, maturing: false, paidInFull: 5, paymentPlan: 4 },
            { label: 'Foundation', students: 3, avgSale: 900, avgCash: 900, avgUnits: 20, avgDaysInProgram: null, ltv: 1500, advancedPct: null, maturing: false, paidInFull: 3, paymentPlan: 0 },
          ] },
        },
      },
      report1: {
        leadCount: leads,
        introBookedCount: introsBooked,
        introAttendedCount: introsAttended,
        showRatePct,
        ratePct: 60,
        avgDaysToBook: 3,
      },
      report2: {
        introCount: intros,
        firstPurchaseCount: purchases,
        ratePct: 50,
        avgDaysToPurchase: 6,
        firstPurchaseProductMix: purchases
          ? [
              { category: 'Curriculum Package', count: Math.round(purchases * 0.6), pct: 60 },
              { category: 'Membership', count: Math.round(purchases * 0.3), pct: 30 },
              { category: 'Single Session', count: purchases - Math.round(purchases * 0.6) - Math.round(purchases * 0.3), pct: 10 },
            ]
          : [],
      },
      report3: {
        purchaseJourney: [
          {
            label: 'Purchase 1',
            count: 100,
            avgSaleValue: 550,
            avgCollected: 420,
            avgDaysSincePrevious: null,
            avgLtv: 550,
          },
          {
            label: 'Purchase 2',
            count: 62,
            avgSaleValue: 820,
            avgCollected: 610,
            avgDaysSincePrevious: 34,
            avgLtv: 1058,
          },
        ],
      },
      report4: {
        curriculumProgression: [
          { label: 'Starter', count: 60 },
          { label: 'Bronze I', count: 28 },
        ],
      },
    },
    goals: {
      period: '2026-07',
      metrics: [
        { metric: 'revenue', label: 'Revenue', actual: revenue, target: 200000, pct: 58 },
        { metric: 'newActiveStudents', label: 'New Active Students', actual: 12, target: 20, pct: 60 },
        { metric: 'lessons', label: 'Lessons Taught', actual: lessons, target: 600, pct: 75 },
      ],
      perStudio: [
        {
          location: 'Soho',
          revenueActual: revenue,
          revenueTarget: 150000,
          revenuePct: Math.round((revenue / 150000) * 100),
          lessonsActual: lessons,
          lessonsTarget: 500,
          lessonsPct: Math.round((lessons / 500) * 100),
        },
      ],
    },
    exceptions: {
      rows: [
        {
          severity: 'red',
          category: 'Booking risk',
          studio: 'Soho',
          message: 'Soho — only 42% of 245 active students are booked (142 with nothing on the books).',
        },
        {
          severity: 'amber',
          category: 'Capacity ceiling',
          studio: 'Soho',
          message: 'Yuri (Soho) — approaching capacity at 88% of weekly slots.',
        },
      ],
    },
  }
}

const CURRENT = ownerPayload({
  revenue: 116000,
  lessons: 451,
  leads: 420,
  introsBooked: 250,
  introsAttended: 200,
  intros: 200,
  purchases: 100,
  active: 245,
  booked: 213,
})
const PRIOR = ownerPayload({
  revenue: 100000,
  lessons: 400,
  leads: 500,
  introsBooked: 240,
  introsAttended: 190,
  intros: 190,
  purchases: 90,
  active: 240,
  booked: 200,
})

beforeEach(() => {
  overview.mockReset()
  classicOverview.mockReset()
  // The page reads owner-overview three times per render: once for the current
  // window (a number of days) and twice for the comparison windows (explicit
  // { from, to } pairs). Keying off the range shape rather than call order
  // keeps the answers stable across re-renders.
  overview.mockImplementation((range) => ({
    data: range && typeof range === 'object' ? PRIOR : CURRENT,
    isLoading: false,
    isValidating: false,
    mutate: vi.fn(),
  }))
  classicOverview.mockReturnValue({
    data: {
      aiAgentRevenue: [
        { month: 'Jan', thisYear: 90000, lastYear: 70000 },
        { month: 'Feb', thisYear: 116000, lastYear: 82000 },
      ],
      leadsBySourceConversion: [
        { leadSource: 'Form Submission', totalLeads: 240, bookings: 96, convRate: '40%', convRatePct: 40, costPerLead: '$4.10' },
      ],
      revenueBySource: [{ leadSource: 'Form Submission', revenue: 52000 }],
      leadDensityByZip: [{ zip: '10013', leads: 68, starters: 13, revenue: 52000 }],
      perStudioBreakdown: [
        { location: 'Soho', totalLeads: 240, bookings: 96, bookingRate: '40%', bookingRatePct: 40 },
      ],
    },
    isLoading: false,
    isValidating: false,
  })
})

async function renderPage() {
  const { default: OwnerDashboardPage } = await import('../OwnerDashboardPage')
  return render(<OwnerDashboardPage />)
}

describe('OwnerDashboardPage', () => {
  it('renders every section the payload grants, in the concept order', async () => {
    await renderPage()

    for (const heading of [
      'Scorecard',
      'Where the money comes from',
      'Lessons',
      'Lesson forecast',
      'Instructor utilization',
      'Conversion funnel',
      'Marketing performance',
      'Student health',
    ]) {
      expect(screen.getAllByText(heading).length).toBeGreaterThan(0)
    }
    // Spec: the scorecard is K-01 … K-11 and "Priorities & exceptions" is not in this build.
    expect(document.querySelectorAll('[data-report-id^="K-"]')).toHaveLength(11)
    expect(screen.queryByText('Operating Exceptions')).not.toBeInTheDocument()
  })

  it('shows real headline figures from the payload rather than placeholders', async () => {
    await renderPage()

    // Hero + scorecard revenue, lessons, scheduled and booked-% all come
    // straight from the owner-overview aggregates. Expectations are built with
    // the page's own formatters because digit grouping is locale-dependent
    // (en-IN groups 116000 as 1,16,000) and the suite must not assume en-US.
    expect(screen.getAllByText(money(116000)).length).toBeGreaterThan(0)
    expect(screen.getAllByText(num(451)).length).toBeGreaterThan(0)
    expect(screen.getAllByText(num(156)).length).toBeGreaterThan(0)
    expect(screen.getAllByText('87.0%').length).toBeGreaterThan(0)
  })

  it('derives MoM badges by comparing the current window with the prior one', async () => {
    await renderPage()

    // Revenue 116,000 vs prior 100,000 = +16.0%.
    expect(screen.getAllByText('+16.0%').length).toBeGreaterThan(0)
    // Leads 420 vs prior 500 = -16.0%, i.e. a decline is reported as one.
    expect(screen.getAllByText('−16.0%').length).toBeGreaterThan(0)
  })

  it('marks metrics the backend still cannot produce instead of inventing a number', async () => {
    await renderPage()

    // Spec K-07 / K-09 come straight from the backend fields, never a made-up number.
    expect(document.querySelector('[data-report-id="K-07"]').textContent).toContain('25.0%')
    expect(document.querySelector('[data-report-id="K-09"]').textContent).toContain('7')
  })

  it('never renders an impossible conversion rate even for a skewed cohort', async () => {
    // Real-world shape: 22 trials completed in the window, but only 4 of the
    // leads *created* in that window booked one — report2.introCount and
    // report1.introBookedCount are different cohorts, so dividing them (the
    // old bug) could exceed 100%. The backend-computed showRatePct never can.
    const skewed = ownerPayload({
      revenue: 116000,
      lessons: 451,
      leads: 34,
      introsBooked: 4,
      introsAttended: 4,
      intros: 22,
      purchases: 0,
      active: 245,
      booked: 213,
    })
    overview.mockReset()
    overview.mockImplementation(() => ({
      data: skewed,
      isLoading: false,
      isValidating: false,
      mutate: vi.fn(),
    }))

    await renderPage()

    const rates = screen.queryAllByText(/^\d+%$/)
    expect(rates.length).toBeGreaterThan(0)
    for (const el of rates) {
      expect(Number(el.textContent.replace('%', ''))).toBeLessThanOrEqual(100)
    }
  })

  it('renders every panel the concept has, including the ones still with no data source', async () => {
    await renderPage()

    // IDs are an overlay (spec: "Show report IDs"), hidden by default.
    expect(document.querySelector('[data-rid]')).toBeNull()
    fireEvent.click(screen.getByText('Show report IDs'))
    const expected = [
      ...Array.from({ length: 11 }, (_, i) => `K-${String(i + 1).padStart(2, '0')}`),
      ...[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25].map((n) => `R-${String(n).padStart(2, '0')}`),
    ]
    for (const id of expected) {
      expect(document.querySelector(`[data-rid="${id}"]`), id).not.toBeNull()
    }
    // R-22 / R-23 carry the purple Phase 2 tag; ad-spend columns are dashes until spend exists.
    expect(screen.getAllByText('PHASE 2')).toHaveLength(2)
    expect(screen.getByText('10013')).toBeInTheDocument()
    // Card titles read without the ID prefix.
    expect(screen.getByText('Revenue by studio')).toBeInTheDocument()
    expect(screen.getByText('Outstanding balances')).toBeInTheDocument()

    // Spec column headers.
    for (const column of ['Remaining slots', 'Projected utilization', 'Available hrs', 'Booked hrs', 'Avg per week']) {
      expect(screen.getAllByText(column).length).toBeGreaterThan(0)
    }
  })

  it('backs the previously-empty panels with real data end to end', async () => {
    await renderPage()

    // Per-studio goal table (Revenue + Lessons vs Goal).
    expect(screen.getAllByText('Soho').length).toBeGreaterThan(0)

    // Ageing buckets with real amounts, not a dash.
    expect(screen.getByText('Aging')).toBeInTheDocument()
    expect(screen.getByText('0–30 days')).toBeInTheDocument() // falls back to package balances when outstandingPlans is absent

    // Forecast by instructor now has a real studio + scheduled + capacity row.
    expect(screen.getAllByText('Yuri').length).toBeGreaterThan(0)

    // Revenue by source (first-touch) from the backend.
    expect(screen.getAllByText(moneyShort(52000)).length).toBeGreaterThan(0)

  })

  it('renders the four funnel reports from the spec formulas', async () => {
    await renderPage()
    expect(screen.getAllByText('Lead → Intro').length).toBeGreaterThan(0)
    expect(screen.getByText('Median time to book')).toBeInTheDocument()
    expect(screen.getAllByText('Intro → First purchase').length).toBeGreaterThan(0)
    expect(screen.getAllByText('Cash at sale').length).toBeGreaterThan(0)
    expect(screen.getByText('Purchase journey')).toBeInTheDocument()
    expect(screen.getByText('Classic curriculum funnel')).toBeInTheDocument()
    expect(screen.getAllByText('37.5%').length).toBeGreaterThan(0)
  })

  it("lets one card override the page period without touching the others", async () => {
    await renderPage()
    overview.mockClear()
    fireEvent.change(screen.getByLabelText('R-05 Lessons taught by studio period'), { target: { value: 'ytd' } })
    // The overridden card reads its own period (plus its MoM / YoY windows); the page period stays 'mtd'.
    expect(overview.mock.calls.some(([range]) => range === 'ytd')).toBe(true)
    expect(screen.getByLabelText('R-01 Revenue by studio period').value).toBe('page')
  })

  it('shows the studio rank in single-studio view', async () => {
    overview.mockImplementation(() => ({
      data: { ...CURRENT, revenue: { ...CURRENT.revenue, spec: { netSales: { ...CURRENT.revenue.spec.netSales, rank: { position: 5, of: 13 } } } } },
      isLoading: false,
      isValidating: false,
      mutate: vi.fn(),
    }))
    await renderPage()
    expect(screen.getByText((_, el) => el?.tagName === 'SPAN' && el.textContent === '#5 of 13')).toBeInTheDocument()
  })

  it('keeps a Details drill-down on the data panels', async () => {
    await renderPage()
    expect(screen.getAllByText('Details').length).toBeGreaterThan(5)
  })

  it('drops a section and its nav entry when the server withholds that permission', async () => {
    const noRevenue = { ...CURRENT }
    delete noRevenue.revenue
    overview.mockReset()
    overview.mockImplementation(() => ({
      data: noRevenue,
      isLoading: false,
      isValidating: false,
      mutate: vi.fn(),
    }))

    await renderPage()

    expect(screen.queryByText('Where the money comes from')).not.toBeInTheDocument()
    const nav = screen.getByRole('navigation')
    expect(within(nav).queryByText('Revenue')).not.toBeInTheDocument()
    // Sections the user still has stay put.
    expect(within(nav).getByText('Lessons')).toBeInTheDocument()
  })
})
