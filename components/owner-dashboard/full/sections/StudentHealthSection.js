'use client'

import DetailsButton from '@/components/owner-dashboard/widgets/DetailsButton'
import CardFrame from '../CardFrame'
import { Empty, Legend, SectionHead, num } from '../chrome'
import { Cell, DataTable, Row, StackedCompare } from '../viz'

const STUDENT_COLUMNS = [
  { key: 'name', label: 'Name' },
  { key: 'email', label: 'Email' },
  { key: 'phoneNumber', label: 'Phone' },
  { key: 'studio', label: 'Studio' },
  { key: 'booked', label: 'Booked' },
]

const BOOKED_COLOR = 'var(--studio-primary)'
const NOT_BOOKED_COLOR = 'color-mix(in srgb, hsl(var(--destructive)) 38%, transparent)'

/** Engagement rate per studio from a comparison payload, keyed by studio name. */
function engagementIndex(payload) {
  if (!payload?.studentHealth) return null
  return new Map(
    (payload.studentHealth.perStudio || []).map((r) => [r.location, Number(r.avgLessonsPerActiveStudentPerWeek) || 0])
  )
}

function GrowthCell({ current, index }) {
  if (!index) return <Cell tone="text-muted-foreground">&mdash;</Cell>
  const prev = index.get(current.location)
  if (prev === undefined || prev === 0) return <Cell tone="text-muted-foreground">&mdash;</Cell>
  const value = ((Number(current.avgLessonsPerActiveStudentPerWeek) - prev) / prev) * 100
  const up = value >= 0
  return (
    <Cell tone={`${up ? 'text-success' : 'text-destructive'} font-bold`}>
      {up ? '+' : ''}
      {value.toFixed(1).replace('-', '−')}%
    </Cell>
  )
}

const bySize = (health) => [...(health?.perStudio || [])].sort((a, b) => b.active - a.active)

/** Spec colours for booked %: 80%+ green · 65–79% orange · under 65% red. */
const bookedTone = (pct) => (pct >= 80 ? 'text-[#1C8553]' : pct >= 65 ? 'text-[#C2571A]' : 'text-[#C13049]')

export default function StudentHealthSection({ data, comparisons, rangeDays }) {
  const frame = { data, comparisons, pageRange: rangeDays }
  const totals = data?.studentHealth?.totals

  return (
    <section id="od-health" className="mt-[26px] scroll-mt-32">
      <SectionHead
        number="08"
        title="Student health"
        tag="Are students engaged?"
        subtitle="Who is booked, and who needs a call."
      />

      <div className="grid grid-cols-1 gap-[18px] [&>*]:min-w-0 min-[1200px]:grid-cols-2">
        <CardFrame
          {...frame}
          title="R-24 Active students: booked vs not booked"
          snapshot="Now"
          note={
            totals
              ? `${num(totals.booked)} booked + ${num(totals.notBooked)} not booked = ${num(totals.active)} active · ${Number(totals.bookedPct).toFixed(1)}% booked`
              : null
          }
          details={(r) => <DetailsButton title="Active Students — full details" metric="studentHealth" rangeDays={r} columns={STUDENT_COLUMNS} />}
        >
          {(d) => {
            const perStudio = bySize(d.studentHealth)
            return perStudio.length ? (
              <>
                <div className="mt-3">
                  <Legend items={[{ label: 'Booked', color: BOOKED_COLOR }, { label: 'Not booked', color: NOT_BOOKED_COLOR }]} />
                </div>
                <div className="mt-3">
                  <StackedCompare
                    aColor={BOOKED_COLOR}
                    bColor={NOT_BOOKED_COLOR}
                    rows={perStudio.map((r) => ({
                      label: r.location,
                      sublabel: `${num(r.booked)} of ${num(r.active)} booked`,
                      a: r.booked,
                      b: r.notBooked,
                      valueLabel: `${Number(r.bookedPct).toFixed(1)}%`,
                      valueTone: bookedTone(r.bookedPct),
                    }))}
                  />
                </div>
              </>
            ) : (
              <Empty message="No data for this period" height={200} />
            )
          }}
        </CardFrame>

        <CardFrame
          {...frame}
          title="R-25 Lessons per active student"
          details={(r) => <DetailsButton title="Active Students — full details" metric="studentHealth" rangeDays={r} columns={STUDENT_COLUMNS} />}
        >
          {(d, c) => {
            const perStudio = bySize(d.studentHealth)
            const prevIndex = engagementIndex(c?.previous)
            const lyIndex = engagementIndex(c?.lastYear)
            return perStudio.length ? (
              <DataTable head={['Studio', 'Avg per week', 'Avg MTD', 'MoM', 'YoY']} minWidth={560}>
                {perStudio.map((r, i) => (
                  <Row key={r.location}>
                    <Cell first tone={i === 0 ? 'text-[var(--studio-primary)]' : 'text-foreground'}>{r.location}</Cell>
                    <Cell tone="text-[var(--studio-primary)] font-bold">{Number(r.avgLessonsPerActiveStudentPerWeek).toFixed(1)}</Cell>
                    <Cell>{Number(r.avgLessonsMTD).toFixed(1)}</Cell>
                    <GrowthCell current={r} index={prevIndex} />
                    <GrowthCell current={r} index={lyIndex} />
                  </Row>
                ))}
              </DataTable>
            ) : (
              <Empty message="No data for this period" height={160} />
            )
          }}
        </CardFrame>
      </div>
    </section>
  )
}
