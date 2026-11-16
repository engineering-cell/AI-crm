'use client'

import DonutChart from '@/components/dashboard/widgets/DonutChart'
import LeadsDetailsButton from '@/components/owner-dashboard/widgets/LeadsDetailsButton'
import { formatFieldDisplayValue } from '@/lib/dynamic-list-normalize'
import CardFrame from '../CardFrame'
import { Dash, Empty, Legend, SectionHead, moneyShort, num } from '../chrome'
import { Cell, DataTable, RankedBars, Row } from '../viz'
import { formatDate } from '@/lib/utils'

const LEAD_COLUMNS = [
  { key: 'name', label: 'Name' },
  { key: 'email', label: 'Email' },
  { key: 'phoneNumber', label: 'Phone' },
  { key: 'uploadType', label: 'Entry method', format: (v) => formatFieldDisplayValue(v) },
  { key: 'stage', label: 'Stage', format: (v) => formatFieldDisplayValue(v) },
  { key: 'createdAt', label: 'Created', format: (v) => formatDate(v) || '—' },
]

/** Category colours from the spec, in order. */
const SOURCE_COLORS = {
  Meta: '#8A0F4D',
  Google: '#C42A77',
  Referral: '#E87FB0',
  Organic: '#4A3352',
  'Walk-in': '#9D85E8',
  Unknown: '#5BB8E8',
}

function LeadsBySource({ d }) {
  const m = d.marketing
  const sources = (m?.leadsBySource || []).filter((r) => r.count > 0)
  return sources.length ? (
    <div className="mt-4 grid items-center gap-4 sm:grid-cols-[200px_1fr]">
      <DonutChart
        data={sources.map((s) => ({ name: s.source, value: s.count, color: SOURCE_COLORS[s.source] }))}
        centerLabel="Leads"
        centerValue={num(m.leadTotal)}
        height={190}
        valueFormatter={(v) => num(v)}
        showLegend={false}
      />
      <ul className="text-[13.5px]">
        {sources.map((s) => (
          <li key={s.source} className="flex items-center gap-2 border-b border-border/60 py-1.5 last:border-b-0">
            <i className="h-2.5 w-2.5 shrink-0 rounded-sm" style={{ background: SOURCE_COLORS[s.source] }} />
            <span className="flex-1 font-semibold text-foreground">{s.source}</span>
            <span className="tabular-nums text-foreground">{num(s.count)}</span>
            <span className="w-14 text-right tabular-nums text-muted-foreground">{s.pct.toFixed(1)}%</span>
          </li>
        ))}
      </ul>
    </div>
  ) : (
    <Empty message="No data for this period" height={200} />
  )
}

function RevenueBySource({ d }) {
  const rows = (d.marketing?.revenueBySource || []).filter((r) => r.revenue !== 0)
  return rows.length ? (
    <div className="mt-4">
      <RankedBars rows={rows.map((r) => ({ label: r.source, value: r.revenue }))} valueFormatter={moneyShort} />
    </div>
  ) : (
    <Empty message="No data for this period" height={200} />
  )
}

function LeadsByStudio({ d }) {
  const studios = d.marketing?.leadsByStudioSource || []
  return studios.length ? (
    <>
      <div className="mt-4 flex flex-col gap-2.5">
        {studios.map((st) => (
          <div key={st.location} className="grid grid-cols-[minmax(0,130px)_1fr_56px] items-center gap-3">
            <span className="truncate text-[12px] font-semibold text-foreground" title={st.location}>{st.location}</span>
            <div className="flex h-3.5 overflow-hidden rounded-[3px] bg-muted">
              {st.sources.filter((x) => x.count > 0).map((x) => (
                <div
                  key={x.source}
                  title={`${x.source}: ${num(x.count)} (${((x.count / st.total) * 100).toFixed(1)}%)`}
                  style={{ width: `${(x.count / st.total) * 100}%`, background: SOURCE_COLORS[x.source] }}
                />
              ))}
            </div>
            <span className="text-right text-[12px] font-bold tabular-nums text-[var(--studio-primary)]">{num(st.total)}</span>
          </div>
        ))}
      </div>
      <div className="mt-3">
        <Legend items={Object.entries(SOURCE_COLORS).map(([label, color]) => ({ label, color }))} />
      </div>
    </>
  ) : (
    <Empty message="No data for this period" height={160} />
  )
}

const pct1 = (v) => `${Number(v).toFixed(1)}%`

/** R-22 (phase 2): ad-spend columns stay empty until spend is imported or entered. */
function ChannelEconomics({ d }) {
  const rows = d.marketing?.channelEconomics || []
  return rows.length ? (
    <>
      <DataTable head={['Source', 'Leads', 'L→I %', 'I→S %', 'Revenue', 'CPL', 'Cost per sale', 'ROAS']} minWidth={640}>
        {rows.map((r) => (
          <Row key={r.source}>
            <Cell first>{r.source}</Cell>
            <Cell>{num(r.leads)}</Cell>
            <Cell>{pct1(r.leadToIntroPct)}</Cell>
            <Cell>{pct1(r.introToStarterPct)}</Cell>
            <Cell tone="text-[var(--studio-primary)] font-bold">{moneyShort(r.revenue)}</Cell>
            <Cell>{r.cpl === null ? <Dash /> : `$${r.cpl}`}</Cell>
            <Cell>{r.costPerSale === null ? <Dash /> : `$${r.costPerSale}`}</Cell>
            <Cell>{r.roas === null ? <Dash /> : `${r.roas}×`}</Cell>
          </Row>
        ))}
      </DataTable>
      <p className="mt-3 text-[12.5px] text-muted-foreground">CPL, cost per sale and ROAS need monthly ad spend per platform per studio (import from Meta and Google Ads, or manual entry).</p>
    </>
  ) : (
    <Empty message="No data for this period" height={160} />
  )
}

/** R-23 (phase 2): top ZIP codes from the ZIP on each lead. */
function LeadDensityByZip({ d }) {
  const rows = d.marketing?.leadDensityByZip || []
  return rows.length ? (
    <DataTable head={['ZIP', 'Leads', 'Starters', 'Revenue']} minWidth={380}>
      {rows.map((r) => (
        <Row key={r.zip}>
          <Cell first>{r.zip}</Cell>
          <Cell>{num(r.leads)}</Cell>
          <Cell>{num(r.starters)}</Cell>
          <Cell tone="text-[var(--studio-primary)] font-bold">{moneyShort(r.revenue)}</Cell>
        </Row>
      ))}
    </DataTable>
  ) : (
    <Empty message="No ZIP codes on leads for this period" height={160} />
  )
}

export default function MarketingSection({ data, comparisons, rangeDays }) {
  const frame = { data, comparisons, pageRange: rangeDays }
  return (
    <section id="od-marketing" className="mt-[26px] scroll-mt-32">
      <SectionHead
        number="07"
        title="Marketing performance"
        tag="Where do students come from?"
        subtitle="Which sources bring leads and revenue."
      />

      <div className="grid grid-cols-1 gap-[18px] [&>*]:min-w-0 min-[1200px]:grid-cols-2">
        <CardFrame {...frame} title="R-19 Leads by source" details={(r) => <LeadsDetailsButton rangeDays={r} columns={LEAD_COLUMNS} />}>
          {(d) => <LeadsBySource d={d} />}
        </CardFrame>
        <CardFrame {...frame} title="R-20 Revenue by source" note="first-touch">
          {(d) => <RevenueBySource d={d} />}
        </CardFrame>
      </div>

      <div className="mt-[18px]">
        <CardFrame {...frame} title="R-21 Leads by studio & source" className="">
          {(d) => <LeadsByStudio d={d} />}
        </CardFrame>
      </div>

      <div className="mt-[18px] grid grid-cols-1 gap-[18px] [&>*]:min-w-0 min-[1200px]:grid-cols-[3fr_2fr]">
        <CardFrame {...frame} title="R-22 Channel economics" tag="PHASE 2">
          {(d) => <ChannelEconomics d={d} />}
        </CardFrame>
        <CardFrame {...frame} title="R-23 Lead density by ZIP" tag="PHASE 2">
          {(d) => <LeadDensityByZip d={d} />}
        </CardFrame>
      </div>
    </section>
  )
}
