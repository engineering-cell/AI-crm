'use client'

import { useState } from 'react'
import DonutChart from '@/components/dashboard/widgets/DonutChart'
import DetailsButton from '@/components/owner-dashboard/widgets/DetailsButton'
import CardFrame from '../CardFrame'
import { Emph, Empty, SectionHead, Segmented, moneyShort, num, moneyExact } from '../chrome'
import { DrillAccordion, Fill, MixBars, RankedBars, TrendArea } from '../viz'
import { formatDate } from '@/lib/utils'

// Rows behind R-01 / R-02: one per sale or refund, same definition as the cards.
const SALES_COLUMNS = [
  { key: 'date', label: 'Date', format: (v) => formatDate(v) || '—' },
  { key: 'customer', label: 'Customer' },
  { key: 'studio', label: 'Studio' },
  { key: 'serviceType', label: 'Service type' },
  { key: 'program', label: 'Program' },
  { key: 'instructor', label: 'Instructor' },
  { key: 'amount', label: 'Net sales', format: moneyShort },
]

// R-04 Details: one row per open payment plan with its unpaid installments, exact to the cent. Click a row to open the student's account. The total equals the card.
const BALANCE_COLUMNS = [
  { key: 'customer', label: 'Customer' },
  { key: 'studio', label: 'Studio' },
  { key: 'product', label: 'Product' },
  { key: 'planTotal', label: 'Plan total', format: moneyExact },
  { key: 'paid', label: 'Paid', format: moneyExact },
  { key: 'owed', label: 'Owed', format: moneyExact },
  { key: 'daysOverdue', label: 'Days overdue' },
  {
    key: 'installments',
    label: 'Due dates',
    format: (v) => (Array.isArray(v) ? v.map((i) => `${String(i.dueDate).slice(0, 10)} ${moneyExact(i.amount)}`).join(' · ') : '—'),
  },
]

const TREND_OPTIONS = [
  { value: 'monthly', label: 'MONTHLY' },
  { value: 'quarterly', label: 'QUARTERLY' },
  { value: 'yearly', label: 'YEARLY' },
]

/** R-02: service types → programs, straight from the catalog-driven backend tree. */
function buildProductMix(byServiceType = []) {
  const types = byServiceType.filter((t) => Number(t.value) > 0)
  return {
    slices: types.map((t) => ({ name: t.serviceType, value: t.value })),
    accordion: types.map((t) => ({
      label: `${t.serviceType} · ${t.pct.toFixed(1)}%`,
      value: moneyShort(t.value),
      rows: t.programs.map((p) => ({ label: p.program, value: moneyShort(p.value) })),
    })),
    total: types.reduce((s, t) => s + t.value, 0),
  }
}

function ByStudio({ d }) {
  const rows = [...(d.revenue?.byStudio || [])].sort((a, b) => b.revenue - a.revenue)
  return rows.length ? (
    <div className="mt-4">
      <RankedBars labelWidth={210} rows={rows.map((r) => ({ label: r.location, value: r.revenue }))} valueFormatter={moneyShort} />
    </div>
  ) : (
    <Empty message="No data for this range" height={160} />
  )
}

function ByProduct({ d }) {
  const product = buildProductMix(d.revenue?.spec?.netSales?.byServiceType)
  return product.slices.length ? (
    <div className="mt-3 grid items-start gap-4 sm:grid-cols-[190px_1fr]">
      <DonutChart data={product.slices} centerLabel="Net sales" centerValue={moneyShort(product.total)} height={190} valueFormatter={(v) => moneyShort(v)} showLegend={false} />
      <DrillAccordion items={product.accordion} />
    </div>
  ) : (
    <Empty message="No data for this range" height={220} />
  )
}

function Trend({ d, grain }) {
  const trend = d.revenue?.spec?.netSales?.trend
  return trend ? (
    <Fill min={210}>
      <TrendArea data={trend[grain]} xKey="label" yKey="value" height="100%" seriesName="Net sales" valueFormatter={(v) => `$${(v / 1e6).toFixed(2)}M`} gradientId="odRevenueTrend" />
    </Fill>
  ) : (
    <Empty message="No data for this range" height={180} />
  )
}

export default function RevenueSection({ data, comparisons, rangeDays }) {
  const [grain, setGrain] = useState('monthly')
  const revenue = data?.revenue
  const rank = revenue?.spec?.netSales?.rank

  // R-04: payment-plan installments (spec). Falls back to the package-balance view on an older backend.
  const plans = revenue?.outstandingPlans
  const ageing = plans?.aging || revenue?.outstandingAgeing || []
  const ageingTotal = ageing.reduce((sum, b) => sum + b.amount, 0)
  const outstanding = [...(revenue?.outstandingBalances || [])]

  const frame = { data, comparisons, pageRange: rangeDays }

  return (
    <section id="od-revenue" className="mt-[26px] scroll-mt-32">
      <SectionHead
        number="02"
        title="Where the money comes from"
        tag="Where is the money?"
        subtitle="Net sales by studio, product and period, plus cash still owed."
      />

      <div className="grid grid-cols-1 gap-[18px] [&>*]:min-w-0 min-[1200px]:grid-cols-2">
        <CardFrame
          {...frame}
          title="R-01 Revenue by studio"
          note={rank ? `#${rank.position} of ${rank.of}` : 'net sales'}
          details={(r) => <DetailsButton title="Revenue by Studio — full details" metric="netSalesLines" drill="sales" rangeDays={r} columns={SALES_COLUMNS} />}
        >
          {(d) => <ByStudio d={d} />}
        </CardFrame>

        <CardFrame
          {...frame}
          title="R-02 Revenue by product"
          note="by service type"
          details={(r) => <DetailsButton title="Revenue by Product — full details" metric="netSalesLines" drill="sales" rangeDays={r} columns={SALES_COLUMNS} />}
        >
          {(d) => <ByProduct d={d} />}
        </CardFrame>
      </div>

      <div className="mt-[18px] grid grid-cols-1 gap-[18px] [&>*]:min-w-0 min-[1200px]:grid-cols-[3fr_2fr]">
        <CardFrame
          {...frame}
          delay={1}
          title="R-03 Revenue trend"
          snapshot={grain === 'monthly' ? 'Last 6 months' : grain === 'quarterly' ? 'Last 6 quarters' : 'Last 5 years'}
          toggle={<Segmented value={grain} onChange={setGrain} options={TREND_OPTIONS} />}
        >
          {(d) => <Trend d={d} grain={grain} />}
        </CardFrame>

        <CardFrame
          {...frame}
          delay={2}
          title="R-04 Outstanding balances"
          snapshot="Today"
          details={(r) => <DetailsButton title="Outstanding Balances — full details" metric="paymentPlans" rangeDays={r} columns={BALANCE_COLUMNS} />}
        >
          {() => (
            <>
              <p className="mt-3 text-[30px] font-bold leading-none tabular-nums text-[var(--studio-primary)]">
                {moneyExact(plans?.total ?? revenue?.totalOutstanding ?? 0)}
              </p>
              <p className="mb-3 mt-1 text-[13px] text-muted-foreground">
                {plans ? (
                  <>
                    <b className="font-semibold text-foreground">{num(plans.activePlans)}</b> active {plans.activePlans === 1 ? 'plan' : 'plans'} ·{' '}
                    <b className="font-semibold text-[#C13049]">{num(plans.overduePlans)} overdue</b>
                  </>
                ) : (
                  <Emph>{`across ${num(outstanding.length)} ${outstanding.length === 1 ? 'studio' : 'studios'}`}</Emph>
                )}
              </p>
              {ageing.length ? (
                <MixBars
                  title="Aging"
                  caption="by days past due"
                  rows={ageing.map((b) => ({
                    label: b.bucket,
                    pct: ageingTotal ? Math.round((b.amount / ageingTotal) * 100) : 0,
                    value: moneyExact(b.amount),
                    color: b.bucket.startsWith('90+') ? 'hsl(var(--destructive))' : b.bucket === 'Not yet due' ? '#E87FB0' : undefined,
                  }))}
                />
              ) : (
                <Empty message="No data for this range" height={100} />
              )}
            </>
          )}
        </CardFrame>
      </div>
    </section>
  )
}
