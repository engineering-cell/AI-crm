'use client'

import DetailsButton from '@/components/owner-dashboard/widgets/DetailsButton'
import CardFrame from '../CardFrame'
import { Dash, Emph, Empty, SectionHead, num } from '../chrome'
import { CapacityMeter, Cell, DataTable, Row } from '../viz'
import { formatDate } from '@/lib/utils'
import { useCollapsedRows, utilTone } from './ForecastSection'

const UTILIZATION_COLUMNS = [
  { key: 'date', label: 'Date', format: (v) => formatDate(v) || '—' },
  { key: 'teacher', label: 'Instructor' },
  { key: 'studio', label: 'Studio' },
  { key: 'title', label: 'Lesson' },
  { key: 'status', label: 'Status' },
  { key: 'durationHrs', label: 'Duration (hrs)' },
]

const barTone = (pct) => (pct >= 90 ? 'bg-[#C13049]' : pct >= 70 ? 'bg-[#1C8553]' : 'bg-[#C2571A]')
const pct1 = (v) => `${Number(v).toFixed(1)}%`

function UtilizationTable({ rows }) {
  const { shown, toggle } = useCollapsedRows(rows)
  return rows.length ? (
    <>
      <DataTable head={['Instructor', 'Studio', 'Available hrs', 'Booked hrs', '', 'Utilization']} minWidth={620}>
        {shown.map((r) => (
          <Row key={`${r.teacher}-${r.studio}`}>
            <Cell first>{r.teacher}</Cell>
            <Cell>{r.studio || <Dash />}</Cell>
            <Cell>{r.availableHrs ? num(r.availableHrs) : <span title="No weekly capacity set"><Dash /></span>}</Cell>
            <Cell>{num(r.bookedHrs)}</Cell>
            <Cell>
              {r.utilizationPct !== null && (
                <span className="block h-1.5 w-24 overflow-hidden rounded-full bg-muted">
                  <span className={`block h-full ${barTone(r.utilizationPct)}`} style={{ width: `${Math.min(r.utilizationPct, 100)}%` }} />
                </span>
              )}
            </Cell>
            <Cell tone={`${utilTone(r.utilizationPct)} font-bold`}>{r.utilizationPct === null ? <Dash /> : pct1(r.utilizationPct)}</Cell>
          </Row>
        ))}
      </DataTable>
      {toggle}
    </>
  ) : (
    <Empty message="No data for this range" height={160} />
  )
}

export default function CapacitySection({ data, comparisons, rangeDays }) {
  const frame = { data, comparisons, pageRange: rangeDays }
  return (
    <section id="od-capacity" className="mt-[26px] scroll-mt-32">
      <SectionHead
        number="05"
        title="Instructor utilization"
        tag="Are we fully utilized?"
        subtitle="Booked hours against available hours this week."
      />

      <div className="grid grid-cols-1 gap-[18px] [&>*]:min-w-0 min-[1200px]:grid-cols-[3fr_2fr]">
        <CardFrame
          {...frame}
          title="R-12 Instructor utilization"
          snapshot="This week"
          details={(r) => <DetailsButton title="Instructor Utilization — full details" metric="instructorUtilization" rangeDays={r} columns={UTILIZATION_COLUMNS} />}
        >
          {(d) => <UtilizationTable rows={d.lessons?.spec?.instructorWeek?.rows || []} />}
        </CardFrame>

        <CardFrame {...frame} delay={2} title="R-13 Organization capacity" snapshot="This week">
          {(d) => {
            const org = d.lessons?.spec?.instructorWeek?.org
            return org && org.utilizationPct !== null ? (
              <div className="my-auto py-4">
                <CapacityMeter pct={org.utilizationPct}>
                  <Emph>{`${num(org.availableHrs)} available hrs · ${num(org.bookedHrs)} booked hrs · ${num(org.remainingHrs)} remaining hrs`}</Emph>
                  {org.extraStudentsPerWeek !== null && <Emph>{` ≈ ${num(org.extraStudentsPerWeek)} more students a week`}</Emph>}
                </CapacityMeter>
                {org.unconfiguredInstructors > 0 && (
                  <p className="mt-3 text-[12.5px] text-muted-foreground">
                    <Emph>{`${num(org.unconfiguredInstructors)} ${org.unconfiguredInstructors === 1 ? 'instructor has' : 'instructors have'} no availability set (their lessons-per-week number is used, or they are left out) and ${org.unconfiguredInstructors === 1 ? 'is' : 'are'} not counted here.`}</Emph>
                  </p>
                )}
              </div>
            ) : (
              <Empty message="No data for this range" height={160} />
            )
          }}
        </CardFrame>
      </div>
    </section>
  )
}
