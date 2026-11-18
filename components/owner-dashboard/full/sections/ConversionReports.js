'use client'

import { useState } from 'react'
import DetailsButton from '@/components/owner-dashboard/widgets/DetailsButton'
import { Empty, IdBadge, Reveal, money, num } from '../chrome'
import { PeriodPicker, Skeleton, useCardData } from '../CardFrame'
import { formatDate } from '@/lib/utils'

const FUNNEL_COLUMNS = [
  { key: 'name', label: 'Lead' },
  { key: 'email', label: 'Email' },
  { key: 'phoneNumber', label: 'Phone' },
  { key: 'studio', label: 'Studio' },
  { key: 'createdAt', label: 'Created', format: (v) => formatDate(v) || '—' },
  { key: 'introBooked', label: 'Intro booked' },
  { key: 'introAttended', label: 'Intro attended' },
  { key: 'firstPurchase', label: 'First purchase' },
]
const JOURNEY_COLUMNS = [
  { key: 'name', label: 'Customer' },
  { key: 'email', label: 'Email' },
  { key: 'phoneNumber', label: 'Phone' },
  { key: 'studio', label: 'Studio' },
  { key: 'purchaseCount', label: 'Purchases' },
  { key: 'totalLtv', label: 'Total LTV', format: money },
  { key: 'lastPurchase', label: 'Last purchase', format: (v) => formatDate(v) || '—' },
]
const PROGRESSION_COLUMNS = [
  { key: 'name', label: 'Customer' },
  { key: 'email', label: 'Email' },
  { key: 'phoneNumber', label: 'Phone' },
  { key: 'studio', label: 'Studio' },
  { key: 'highestTier', label: 'Highest tier reached' },
]

const BERRY_SHADES = ['#E87FB0', '#C42A77', '#8A0F4D', '#5E0A36']
const MIX_COLORS = ['#8A0F4D', '#C42A77', '#E87FB0', '#4A3352', '#9D85E8', '#5BB8E8']
// Gold is reserved for lifetime value (spec).
const GOLD = { line: '#E3B34E', text: '#A87414', bg: '#FFF8E8' }
const pct1 = (v) => `${Number(v).toFixed(1)}%`
const dash = (v, fmt = (x) => x) => (v === null || v === undefined ? '—' : fmt(v))

function ReportCard({ rid, tag, title, owner, details, data, comparisons, rangeDays, className = '', children }) {
  const [override, setOverride] = useState(null)
  const card = useCardData(override, data, comparisons)
  const range = override ?? rangeDays
  const reports = card.data?.funnel?.spec?.reports
  return (
    <div className={`flex flex-col rounded-[20px] border border-border bg-card p-5 text-card-foreground shadow-sm ${className}`}>
      <div className="flex flex-wrap items-center gap-2">
        <span className="rounded-full bg-[#FBEEF4] px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-[0.1em] text-[var(--studio-primary)] dark:bg-muted">{tag}</span>
        <h5 className="text-[15px] font-extrabold text-[#7E0F47] dark:text-[var(--studio-primary)]">{title}</h5>
        <IdBadge id={rid} />
        <div className="ml-auto flex items-center gap-2">
          {details(range)}
          <PeriodPicker title={title} override={override} setOverride={setOverride} />
        </div>
      </div>
      {owner && <p className="mt-1 text-[12.5px] text-muted-foreground">Owner · {owner}</p>}
      {card.loading ? (
        <Skeleton height={160} />
      ) : card.error ? (
        <p className="mt-6 text-center text-[13px] text-muted-foreground">
          Couldn&apos;t load this card ·{' '}
          <button type="button" onClick={card.retry} className="font-semibold text-[var(--studio-primary)] underline">Retry</button>
        </p>
      ) : reports ? (
        <div className="flex flex-1 flex-col">{children(reports)}</div>
      ) : (
        <Empty message="No data for this range" height={160} />
      )}
    </div>
  )
}

/** Headline rate, a funnel of 3–4 shrinking bars, and one strip of supporting numbers. */
function FunnelBody({ hero, heroNote, rows, strip }) {
  const max = Math.max(...rows.map((r) => r.value), 1)
  return (
    <>
      <div className="mt-3">
        <b className="text-[40px] font-bold leading-none tabular-nums text-[var(--studio-primary)]">{hero}</b>
        <span className="ml-2 text-[13.5px] text-muted-foreground">{heroNote}</span>
      </div>
      <div className="mb-4 mt-4 flex flex-col gap-2">
        {rows.map((r, i) => (
          <div key={r.label} className="grid grid-cols-[110px_1fr_56px] items-center gap-3">
            <span className="text-[12.5px] text-muted-foreground">{r.label}</span>
            <div className="h-7 rounded-md bg-muted">
              <div
                className="flex h-full items-center rounded-md px-2 text-[12px] font-bold text-white"
                style={{ width: `${Math.max((r.value / max) * 100, r.value ? 12 : 0)}%`, background: BERRY_SHADES[Math.min(i, 3)] }}
              >
                {num(r.value)}
              </div>
            </div>
            <span className="text-right text-[12.5px] font-bold tabular-nums text-foreground">{r.pct === null ? '' : pct1(r.pct)}</span>
          </div>
        ))}
      </div>
      <div className="mt-auto grid grid-flow-col auto-cols-fr divide-x divide-border border-t border-border pt-3">
        {strip.map((s) => (
          <div key={s.label} className="px-3 first:pl-0">
            <label className="block text-[11px] font-bold uppercase tracking-[0.08em] text-muted-foreground">{s.label}</label>
            <b className="text-[16px] tabular-nums text-foreground">{s.value}</b>
          </div>
        ))}
      </div>
    </>
  )
}

/**
 * Bars = customers/students, gold line = LTV to that step, % pills between bars,
 * a table whose columns line up under the bars, and a click-to-select mix bar.
 */
function Journey({ steps, selected, onSelect, mixTitle, mixFor }) {
  const n = steps.length
  const maxCount = Math.max(...steps.map((s) => s.count), 1)
  const maxLtv = Math.max(...steps.map((s) => s.ltv), 1)
  const H = 215
  const cols = { gridTemplateColumns: `repeat(${n}, minmax(110px, 1fr))` }
  // Gold line lives in its own band above the bars so labels never collide with the customer counts.
  const barMax = H - 100
  const pts = steps.map((s, i) => [((i + 0.5) / n) * 100, 44 + (1 - s.ltv / maxLtv) * 30])
  const live = steps.map((s) => s.count > 0)
  const mix = mixFor(steps[selected])

  return (
    <>
      <div className="overflow-x-auto">
        <div style={{ minWidth: n * 110 }}>
          <div className="relative" style={{ height: H }}>
            <div className="absolute inset-0 grid" style={cols}>
              {steps.map((s, i) => (
                <button
                  key={s.label}
                  type="button"
                  onClick={() => onSelect(i)}
                  className={`flex flex-col items-center justify-end ${i === selected ? 'bg-[#FBEEF4] dark:bg-muted' : ''}`}
                  aria-label={`${s.label}: ${s.count}`}
                >
                  <span className="mb-1 text-[12px] font-bold tabular-nums text-[var(--studio-primary)]">{num(s.count)}</span>
                  <span className="w-9 rounded-t-md" style={{ height: `${(s.count / maxCount) * barMax}px`, background: 'linear-gradient(180deg,#C42A77,#8A0F4D)', minHeight: s.count ? 3 : 0 }} />
                </button>
              ))}
            </div>
            <svg className="pointer-events-none absolute inset-0 h-full w-full" viewBox={`0 0 100 ${H}`} preserveAspectRatio="none">
              <polyline fill="none" stroke={GOLD.line} strokeWidth="2" vectorEffect="non-scaling-stroke" points={pts.filter((_, i) => live[i]).map((p) => p.join(',')).join(' ')} />
            </svg>
            {pts.map((p, i) => (live[i] ? (
              <span key={steps[i].label} className="pointer-events-none absolute -translate-x-1/2 -translate-y-full" style={{ left: `${p[0]}%`, top: p[1] - 6 }}>
                <span className="rounded px-1 text-[11px] font-bold tabular-nums" style={{ color: GOLD.text, background: GOLD.bg }}>{money(steps[i].ltv)}</span>
                <span className="mx-auto mt-0.5 block h-2 w-2 rounded-full" style={{ background: GOLD.line }} />
              </span>
            ) : null))}
            {steps.slice(0, -1).map((s, i) =>
              steps[i + 1].pctNext === null || steps[i + 1].pctNext === undefined || s.count === 0 ? null : (
                <span
                  key={`p${s.label}`}
                  className="pointer-events-none absolute -translate-x-1/2 rounded-full border border-border bg-card px-1.5 text-[11px] font-bold tabular-nums text-foreground"
                  style={{ left: `${((i + 1) / n) * 100}%`, bottom: 8 }}
                  title={steps[i + 1].pctNote}
                >
                  {steps[i + 1].maturing ? 'maturing' : pct1(steps[i + 1].pctNext)}
                </span>
              )
            )}
          </div>
          <div className="mt-2 grid border-t border-border" style={cols}>
            {steps.map((s, i) => (
              <button
                key={s.label}
                type="button"
                onClick={() => onSelect(i)}
                className={`px-2 py-2 text-left ${i === selected ? 'bg-[#FBEEF4] dark:bg-muted' : ''}`}
              >
                <b className="block text-[12.5px] text-foreground">{s.label}</b>
                {s.cells.map((c) => (
                  <span key={c.label} className="block text-[12px] leading-snug text-muted-foreground">
                    {c.label} <b className="tabular-nums text-foreground">{c.value}</b>
                  </span>
                ))}
              </button>
            ))}
          </div>
        </div>
      </div>
      {mix && (
        <div className="mt-3 border-t border-border pt-3">
          <p className="mb-1.5 text-[12.5px] font-semibold text-foreground">{steps[selected].label} · {mixTitle}</p>
          <div className="flex h-5 overflow-hidden rounded-md bg-muted">
            {mix.filter((m) => m.pct > 0).map((m, i) => (
              <div key={m.label} title={`${m.label}: ${num(m.count)} (${pct1(m.pct)})`} style={{ width: `${m.pct}%`, background: MIX_COLORS[i % MIX_COLORS.length] }} />
            ))}
          </div>
          <div className="mt-1.5 flex flex-wrap gap-x-4 gap-y-1 text-[12px] text-muted-foreground">
            {mix.map((m, i) => (
              <span key={m.label} className="flex items-center gap-1.5">
                <i className="h-2 w-2 rounded-sm" style={{ background: MIX_COLORS[i % MIX_COLORS.length] }} />
                {m.label} {pct1(m.pct)}
              </span>
            ))}
          </div>
        </div>
      )}
    </>
  )
}

function Report1({ reports }) {
  const a = reports.report1
  return (
    <FunnelBody
      hero={pct1(a.bookedPct)}
      heroNote="of leads booked an intro"
      rows={[
        { label: 'Unique leads', value: a.uniqueLeads, pct: null },
        { label: 'Qualified', value: a.qualified, pct: a.uniqueLeads ? (a.qualified / a.uniqueLeads) * 100 : 0 },
        { label: 'Contacted', value: a.contacted, pct: a.uniqueLeads ? (a.contacted / a.uniqueLeads) * 100 : 0 },
        { label: 'Booked an intro', value: a.booked, pct: a.bookedPct },
      ]}
      strip={[
        { label: 'Avg time to book', value: dash(a.avgDaysToBook, (v) => `${v} days`) },
        { label: 'Median time to book', value: dash(a.medianDaysToBook, (v) => `${v} days`) },
      ]}
    />
  )
}

function Report2({ reports }) {
  const b = reports.report2
  return (
    <FunnelBody
      hero={pct1(b.boughtPct)}
      heroNote={`of intros taught bought${b.medianDaysToBuy === null ? '' : ` · median ${b.medianDaysToBuy} days to buy`}`}
      rows={[
        { label: 'Intros booked', value: b.introsBooked, pct: null },
        { label: 'Intros taught', value: b.introsTaught, pct: b.showRatePct },
        { label: 'Bought', value: b.firstPurchases, pct: b.boughtPct },
      ]}
      strip={[
        { label: 'Avg sale', value: money(b.avgSale) },
        { label: 'Cash at sale', value: money(b.avgCashAtSale) },
        { label: 'Collected', value: pct1(b.collectionRatePct) },
        { label: 'Avg units', value: b.avgUnits },
      ]}
    />
  )
}

function Report3({ reports }) {
  const [pick, setPick] = useState(0)
  const steps = reports.report3.steps.map((s) => ({
    label: s.label,
    count: s.customers,
    ltv: s.ltv,
    pctNext: s.boughtAgainPct,
    pctNote: s.medianDaysFromPrev === null ? 'Bought again' : `Bought again · median ${s.medianDaysFromPrev} days after the previous purchase`,
    cells: [
      { label: 'Avg sale', value: money(s.avgSale) },
      { label: 'Cash at sale', value: money(s.avgCash) },
      { label: 'Collected', value: pct1(s.collectionRatePct) },
      { label: 'Units', value: s.avgUnits },
      { label: 'Median days', value: dash(s.medianDaysFromPrev) },
    ],
    mix: s.mix,
  }))
  return (
    <>
      <p className="mb-3 mt-1 text-[12.5px] text-muted-foreground">
        Bars = customers · gold = lifetime value so far · % between bars = bought again. Installments stay with the original purchase.
      </p>
      {steps[0]?.count ? (
        <Journey steps={steps} selected={pick} onSelect={setPick} mixTitle="product mix" mixFor={(s) => s.mix.map((m) => ({ label: m.category, count: m.count, pct: m.pct }))} />
      ) : (
        <Empty message="No data for this range" height={160} />
      )}
    </>
  )
}

function Report4({ reports }) {
  const [pick, setPick] = useState(0)
  const r4 = reports.report4
  const steps = r4.steps.map((s, i) => ({
    label: s.label,
    count: s.students,
    ltv: s.ltv,
    pctNext: i === 0 ? null : r4.steps[i - 1].advancedPct,
    maturing: i > 0 && r4.steps[i - 1].maturing,
    pctNote: 'Advanced from the previous program',
    cells: [
      { label: 'Avg sale', value: money(s.avgSale) },
      { label: 'Cash at sale', value: money(s.avgCash) },
      { label: 'Time in program', value: s.avgDaysInProgram === null ? '—' : `${s.avgDaysInProgram} days` },
      { label: 'Units', value: s.avgUnits },
    ],
    paid: s,
  }))
  return (
    <>
      <p className="mb-3 mt-1 text-[12.5px] text-muted-foreground">
        Bars = students · gold = lifetime value so far · % between bars = advanced to the next program (first: Starter ÷ intros taught). Full-program purchases only.
      </p>
      {steps[0]?.count ? (
        <>
          <Journey
            steps={steps}
            selected={pick}
            onSelect={setPick}
            mixTitle="paid in full vs payment plan"
            mixFor={(s) => {
              const total = s.paid.paidInFull + s.paid.paymentPlan
              if (!total) return null
              return [
                { label: 'Paid in full', count: s.paid.paidInFull, pct: (s.paid.paidInFull / total) * 100 },
                { label: 'Payment plan', count: s.paid.paymentPlan, pct: (s.paid.paymentPlan / total) * 100 },
              ]
            }}
          />
          <p className="mt-2 text-[12.5px] text-muted-foreground">
            Starter enrollments ÷ intros taught: <b className="text-foreground">{pct1(r4.starterPerIntroPct)}</b> ({num(r4.starterEnrollments)} Starters). Programs whose window is still open show “maturing”.
          </p>
        </>
      ) : (
        <Empty message="No data for this range" height={160} />
      )}
    </>
  )
}

export default function ConversionReports({ data, comparisons, rangeDays }) {
  const frame = { data, comparisons, rangeDays }
  const details = (title, metric, columns) => (range) => <DetailsButton title={title} metric={metric} rangeDays={range} columns={columns} />
  return (
    <>
      <div className="mt-[18px] grid grid-cols-1 gap-[18px] [&>*]:min-w-0 min-[1200px]:grid-cols-2">
        <Reveal>
          <ReportCard {...frame} rid="R-15" tag="Report 1" title="Lead → Intro" owner="Marketing and front desk" details={details('Lead → Intro — full details', 'conversionFunnelReports', FUNNEL_COLUMNS)} className="h-full">
            {(r) => <Report1 reports={r} />}
          </ReportCard>
        </Reveal>
        <Reveal>
          <ReportCard {...frame} rid="R-16" tag="Report 2" title="Intro → First purchase" owner="Instructors" details={details('Intro → First purchase — full details', 'conversionFunnelReports', FUNNEL_COLUMNS)} className="h-full">
            {(r) => <Report2 reports={r} />}
          </ReportCard>
        </Reveal>
      </div>

      <Reveal className="mt-[18px]">
        <ReportCard {...frame} rid="R-17" tag="Report 3" title="Purchase journey" details={details('Purchase journey — full details', 'purchaseJourney', JOURNEY_COLUMNS)}>
          {(r) => <Report3 reports={r} />}
        </ReportCard>
      </Reveal>

      <Reveal className="mt-[18px]">
        <ReportCard {...frame} rid="R-18" tag="Report 4" title="Classic curriculum funnel" details={details('Classic curriculum funnel — full details', 'curriculumProgression', PROGRESSION_COLUMNS)}>
          {(r) => <Report4 reports={r} />}
        </ReportCard>
      </Reveal>
    </>
  )
}
