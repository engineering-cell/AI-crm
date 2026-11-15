'use client'

import DetailsButton from '@/components/owner-dashboard/widgets/DetailsButton'
import CardFrame from '../CardFrame'
import { useState } from 'react'
import { Dash, Empty, SectionHead, moneyShort, num } from '../chrome'
import { Cell, DataTable, RankedBars, RevenueLessonsCombo, Row } from '../viz'
import { formatDate } from '@/lib/utils'

const FORECAST_COLUMNS = [
  { key: 'date', label: 'Date', format: (v) => formatDate(v) || '—' },
  { key: 'studio', label: 'Studio' },
  { key: 'teacher', label: 'Instructor' },
  { key: 'title', label: 'Lesson' },
]

/** Spec colour rule for utilization: 90%+ red · 70–89% green · under 70% orange. */
export const utilTone = (pct) =>
  pct === null || pct === undefined ? 'text-muted-foreground' : pct >= 90 ? 'text-[#C13049]' : pct >= 70 ? 'text-[#1C8553]' : 'text-[#C2571A]'

const pct1 = (v) => `${Number(v).toFixed(1)}%`

const COLLAPSED_ROWS = 8

/** First rows of a long list, with a "Show all" toggle so rows of cards stay a similar height. */
export function useCollapsedRows(rows, limit = COLLAPSED_ROWS) {
  const [all, setAll] = useState(false)
  const shown = all || rows.length <= limit ? rows : rows.slice(0, limit)
  const toggle =
    rows.length > limit ? (
      <button type="button" onClick={() => setAll((v) => !v)} className="mt-2 self-start text-[12.5px] font-semibold text-[var(--studio-primary)] hover:underline">
        {all ? 'Show fewer' : `Show all ${rows.length} instructors`}
      </button>
    ) : null
  return { shown, toggle }
}

function InstructorForecast({ rows }) {
  const { shown, toggle } = useCollapsedRows(rows)
  return rows.length ? (
    <>
      <DataTable head={['Instructor', 'Studio', 'Scheduled', 'Total capacity', 'Remaining slots', 'Projected utilization']} minWidth={640}>
        {shown.map((r) => (
          <Row key={`${r.teacher}-${r.studio}`}>
            <Cell first>{r.teacher}</Cell>
            <Cell>{r.studio || <Dash />}</Cell>
            <Cell>{num(r.scheduled)}</Cell>
            <Cell>{num(r.capacitySlots)}</Cell>
            <Cell>{num(r.remainingSlots)}</Cell>
            <Cell tone={`${utilTone(r.utilizationPct)} font-bold`}>{r.utilizationPct === null ? <Dash /> : pct1(r.utilizationPct)}</Cell>
          </Row>
        ))}
      </DataTable>
      {toggle}
    </>
  ) : (
    <Empty message="No data for this period" height={160} />
  )
}

export default function ForecastSection({ data, comparisons, rangeDays }) {
  const frame = { data, comparisons, pageRange: rangeDays }
  return (
    <section id="od-forecast" className="mt-[26px] scroll-mt-32">
      <SectionHead
        number="04"
        title="Lesson forecast"
        tag="What will we teach next?"
        subtitle="Confirmed lessons coming up this week."
      />

      <div className="grid grid-cols-1 gap-[18px] [&>*]:min-w-0 min-[1200px]:grid-cols-2">
        <CardFrame
          {...frame}
          title="R-09 Scheduled this week by studio"
          snapshot="This week"
          details={(r) => <DetailsButton title="Scheduled Lessons — full details" metric="forecastByStudio" rangeDays={r} columns={FORECAST_COLUMNS} />}
        >
          {(d) => {
            const byStudio = [...(d.lessons?.scheduledThisWeek?.byStudio || [])].sort((a, b) => b.scheduled - a.scheduled)
            return byStudio.length ? (
              <div className="mt-4">
                <RankedBars labelWidth={210} rows={byStudio.map((r) => ({ label: r.location, value: r.scheduled }))} accent="#E87FB0" />
              </div>
            ) : (
              <Empty message="No data for this period" height={160} />
            )
          }}
        </CardFrame>

        <CardFrame
          {...frame}
          title="R-10 Scheduled this week by instructor"
          snapshot="This week"
          details={(r) => <DetailsButton title="Scheduled by Instructor — full details" metric="forecastByTeacher" rangeDays={r} columns={FORECAST_COLUMNS} />}
        >
          {(d) => <InstructorForecast rows={d.lessons?.spec?.instructorWeek?.rows || []} />}
        </CardFrame>
      </div>

      <div className="mt-[18px]">
        <CardFrame {...frame} title="R-11 Revenue & lessons trend" snapshot="Last 12 months" className="">
          {(d) => {
            const rev = d.revenue?.spec?.netSales?.trend?.monthly12
            const les = d.lessons?.spec?.monthly12
            if (!rev || !les) return <Empty message="No data for this period" height={200} />
            const combo = rev.map((r, i) => ({ label: r.label, revenue: r.value, lessons: les[i]?.value || 0 }))
            return (
              <>
                <div className="mt-3">
                  <RevenueLessonsCombo data={combo} height={290} moneyFormatter={moneyShort} />
                </div>
                <div className="mt-2 flex gap-4 text-[12px] text-muted-foreground">
                  <span className="flex items-center gap-1.5"><i className="h-2.5 w-2.5 rounded-sm bg-[#E87FB0]" /> Net sales (left)</span>
                  <span className="flex items-center gap-1.5"><i className="h-2.5 w-2.5 rounded-sm bg-[#4A3352]" /> Lessons taught (right)</span>
                </div>
              </>
            )
          }}
        </CardFrame>
      </div>
    </section>
  )
}
