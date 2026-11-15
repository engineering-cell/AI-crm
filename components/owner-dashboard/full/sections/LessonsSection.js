'use client'

import DonutChart from '@/components/dashboard/widgets/DonutChart'
import DetailsButton from '@/components/owner-dashboard/widgets/DetailsButton'
import CardFrame from '../CardFrame'
import { Dash, Empty, SectionHead, num } from '../chrome'
import { Cell, DataTable, DrillAccordion, Fill, RankedBars, Row, TrendArea } from '../viz'
import { formatDate } from '@/lib/utils'

const LESSON_COLUMNS = [
  { key: 'date', label: 'Date', format: (v) => formatDate(v) || '—' },
  { key: 'studio', label: 'Studio' },
  { key: 'teacher', label: 'Instructor' },
  { key: 'title', label: 'Lesson' },
  { key: 'status', label: 'Status' },
]

const TEACHER_COLUMNS = [
  { key: 'date', label: 'Date', format: (v) => formatDate(v) || '—' },
  { key: 'teacher', label: 'Instructor' },
  { key: 'studio', label: 'Studio' },
  { key: 'title', label: 'Lesson' },
  { key: 'status', label: 'Status' },
]

const CURRICULUM_COLUMNS = [
  { key: 'date', label: 'Date', format: (v) => formatDate(v) || '—' },
  { key: 'studio', label: 'Studio' },
  { key: 'teacher', label: 'Instructor' },
  { key: 'tier', label: 'Curriculum Tier' },
  { key: 'title', label: 'Lesson' },
]

/** Index a `[{ [key]: name, [valueKey]: n }]` list by its name column. */
function indexBy(rows, key, valueKey) {
  return new Map((rows || []).map((r) => [r[key], Number(r[valueKey]) || 0]))
}

/**
 * Growth for one row against a comparison window. Returns `null` — rendered as
 * an em dash — when the comparison payload is still loading or the row did not
 * exist back then, so a brand-new studio never reads as "-100%".
 */
function growth(current, previousMap) {
  if (!previousMap) return null
  const prev = previousMap.get(current.name)
  if (prev === undefined || prev === 0) return null
  return ((current.value - prev) / prev) * 100
}

function GrowthCell({ value, newLabel = false }) {
  // An instructor with no lessons in the comparison period is "New", never ∞%.
  if (value === null) return <Cell tone="text-muted-foreground">{newLabel ? 'New' : '—'}</Cell>
  const up = value >= 0
  return (
    <Cell tone={`${up ? 'text-success' : 'text-destructive'} font-bold`}>
      {up ? '+' : ''}
      {value.toFixed(1).replace('-', '−')}%
    </Cell>
  )
}

function growthLabel(value, label) {
  if (value === null) return null
  const up = value >= 0
  return (
    <span className={up ? 'text-success' : 'text-destructive'}>
      {label} {up ? '+' : ''}
      {value.toFixed(1)}%
    </span>
  )
}

function StudioCard({ d, comparisons }) {
  const prev = comparisons?.previous?.lessons ? indexBy(comparisons.previous.lessons.byStudio, 'location', 'count') : null
  const ly = comparisons?.lastYear?.lessons ? indexBy(comparisons.lastYear.lessons.byStudio, 'location', 'count') : null
  const rows = [...(d.lessons?.byStudio || [])].sort((a, b) => b.count - a.count).map((r) => ({ name: r.location, value: r.count }))
  return rows.length ? (
    <div className="mt-4">
      <RankedBars labelWidth={210}
        rows={rows.map((r) => ({
          label: r.name,
          value: r.value,
          sublabel: (
            <>
              {growthLabel(growth(r, prev), 'MoM')}
              {growth(r, prev) !== null && growth(r, ly) !== null ? ' · ' : ''}
              {growthLabel(growth(r, ly), 'YoY')}
            </>
          ),
        }))}
      />
    </div>
  ) : (
    <Empty message="No data for this period" height={160} />
  )
}

function MixCard({ d }) {
  const mixSpec = d.lessons?.spec?.mix
  const types = (mixSpec?.types || []).filter((t) => t.count > 0)
  return types.length ? (
    <div className="mt-3 grid items-start gap-4 sm:grid-cols-[190px_1fr]">
      <DonutChart data={types.map((t) => ({ name: t.type, value: t.count }))} centerLabel="Lessons" centerValue={num(mixSpec.total)} height={190} valueFormatter={(v) => num(v)} showLegend={false} />
      <DrillAccordion
        items={types.map((t) => ({
          label: `${t.type} · ${t.pct.toFixed(1)}%`,
          value: num(t.count),
          rows: t.programs.map((p) => ({ label: p.program, value: num(p.count) })),
        }))}
      />
    </div>
  ) : (
    <Empty message="No data for this period" height={200} />
  )
}

function InstructorCard({ d, comparisons }) {
  const prev = comparisons?.previous?.lessons ? indexBy(comparisons.previous.lessons.byTeacher, 'teacher', 'count') : null
  const ly = comparisons?.lastYear?.lessons ? indexBy(comparisons.lastYear.lessons.byTeacher, 'teacher', 'count') : null
  const rows = [...(d.lessons?.byTeacher || [])].sort((a, b) => b.count - a.count).slice(0, 10).map((r) => ({ name: r.teacher, studio: r.studio, value: r.count }))
  return rows.length ? (
    <DataTable head={['Instructor', 'Studio', 'Lessons taught', 'MoM', 'YoY']} minWidth={520}>
      {rows.map((r, i) => (
        <Row key={r.name}>
          <Cell first tone={i === 0 ? 'text-[var(--studio-primary)]' : 'text-foreground'}>{r.name}</Cell>
          <Cell>{r.studio || <Dash />}</Cell>
          <Cell tone="text-[var(--studio-primary)] font-bold">{num(r.value)}</Cell>
          <GrowthCell value={growth(r, prev)} newLabel={prev && !prev.get(r.name)} />
          <GrowthCell value={growth(r, ly)} newLabel={ly && !ly.get(r.name)} />
        </Row>
      ))}
    </DataTable>
  ) : (
    <Empty message="No data for this period" height={160} />
  )
}

export default function LessonsSection({ data, comparisons, rangeDays }) {
  const monthly = data?.lessons?.spec?.monthly6 || []
  const frame = { data, comparisons, pageRange: rangeDays }

  return (
    <section id="od-lessons" className="mt-[26px] scroll-mt-32">
      <SectionHead
        number="03"
        title="Lessons"
        tag="Is teaching volume growing?"
        subtitle="What we teach, who teaches it, and how it trends."
      />

      <div className="grid grid-cols-1 gap-[18px] [&>*]:min-w-0 min-[1200px]:grid-cols-2">
        <CardFrame
          {...frame}
          title="R-05 Lessons taught by studio"
          details={(r) => <DetailsButton title="Lessons by Studio — full details" metric="lessonsByStudio" drill="lessons" rangeDays={r} columns={LESSON_COLUMNS} />}
        >
          {(d, c) => <StudioCard d={d} comparisons={c} />}
        </CardFrame>
        <CardFrame
          {...frame}
          title="R-06 Lesson mix"
          details={(r) => <DetailsButton title="Lessons by Curriculum Tier — full details" metric="lessonsByCurriculum" drill="lessons" rangeDays={r} columns={CURRICULUM_COLUMNS} />}
        >
          {(d) => <MixCard d={d} />}
        </CardFrame>
      </div>

      <div className="mt-[18px] grid grid-cols-1 gap-[18px] [&>*]:min-w-0 min-[1200px]:grid-cols-2">
        <CardFrame {...frame} title="R-07 Lessons trend" snapshot="Last 6 months">
          {() =>
            monthly.some((m) => m.value > 0) ? (
              <Fill min={190}>
                <TrendArea data={monthly} xKey="label" yKey="value" height="100%" seriesName="Lessons" gradientId="odLessonTrend" />
              </Fill>
            ) : (
              <Empty message="No data for this period" height={150} />
            )
          }
        </CardFrame>
        <CardFrame
          {...frame}
          title="R-08 Lessons taught by instructor"
          details={(r) => <DetailsButton title="Lessons by Instructor — full details" metric="lessonsByTeacher" drill="lessons" rangeDays={r} columns={TEACHER_COLUMNS} />}
        >
          {(d, c) => <InstructorCard d={d} comparisons={c} />}
        </CardFrame>
      </div>
    </section>
  )
}
