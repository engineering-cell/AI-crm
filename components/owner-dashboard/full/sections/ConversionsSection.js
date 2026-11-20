'use client'

import { useMemo, useState } from 'react'
import ConversionReports from './ConversionReports'
import CardFrame from '../CardFrame'
import { Empty, Legend, SectionHead, Segmented, num } from '../chrome'
import { MultiLine } from '../viz'

/** 12-month rate line; months still maturing are drawn dashed and grey (never compared). */
function Sparkline({ series }) {
  const W = 220
  const H = 36
  const max = Math.max(...series.map((p) => p.ratePct), 1)
  const pts = series.map((p, i) => ({ x: (i / Math.max(series.length - 1, 1)) * W, y: H - 3 - (p.ratePct / max) * (H - 6), maturing: p.maturing }))
  const firstMaturing = pts.findIndex((p) => p.maturing)
  const solid = firstMaturing === -1 ? pts : pts.slice(0, firstMaturing)
  const dashed = firstMaturing <= 0 ? [] : pts.slice(firstMaturing - 1)
  const line = (arr) => arr.map((p) => `${p.x},${p.y}`).join(' ')
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="h-9 w-full" preserveAspectRatio="none" role="img" aria-label="12-month trend">
      {solid.length > 1 && <polyline fill="none" stroke="#C42A77" strokeWidth="2" vectorEffect="non-scaling-stroke" strokeLinejoin="round" points={line(solid)} />}
      {dashed.length > 1 && <polyline fill="none" stroke="#9a9a9a" strokeWidth="2" strokeDasharray="4 3" vectorEffect="non-scaling-stroke" points={line(dashed)} />}
    </svg>
  )
}

const LINE_COLORS = ['#8A0F4D', '#C42A77', '#E87FB0', '#4A3352', '#9D85E8', '#5BB8E8', '#1C8553', '#C2571A']

/** The snapshot rows / all-lines chart for one set of conversion rates (the card's own data, so its period dropdown works). */
function TrendBody({ rates, trendView }) {
  const allLines = useMemo(() => {
    if (!rates.length) return null
    return rates[0].series.map((pt, i) => {
      const row = { label: pt.month }
      rates.forEach((r) => {
        const sp = r.series[i]
        // Maturing cohorts are not compared with finished months (spec): left off the line.
        row[r.key] = !sp || sp.maturing || !sp.cohort ? null : sp.ratePct
      })
      return row
    })
  }, [rates])
  return (
    <>
    {rates.length ? (
      trendView === 'snapshot' ? (
        <div className="mt-3 divide-y divide-border/60">
          {rates.map((r) => (
            <div key={r.key} className="grid items-center gap-4 py-2.5 sm:grid-cols-[1fr_150px_1fr]">
              <div>
                <p className="text-[13.5px] font-semibold text-foreground">{r.label}</p>
                <p className="text-[12.5px] text-muted-foreground">{r.range ? `${num(r.range.converted)} of ${num(r.range.cohort)} · any time up to today` : 'any time up to today'}</p>
              </div>
              <div className="rounded-xl bg-[#FBEEF4] px-3 py-2 text-center dark:bg-muted">
                <p className="text-[20px] font-bold tabular-nums text-[var(--studio-primary)]">{r.range ? `${r.range.ratePct.toFixed(1)}%` : r.latest ? `${r.latest.ratePct.toFixed(1)}%` : '—'}</p>
                <p className={`text-[11px] font-bold ${(r.range?.changePp ?? 0) >= 0 ? 'text-success' : 'text-destructive'}`}>
                  {r.range?.changePp === null || r.range?.changePp === undefined ? '' : `${r.range.changePp >= 0 ? '▲ +' : '▼ −'}${Math.abs(r.range.changePp).toFixed(1)} pp vs prev`}
                </p>
              </div>
              <Sparkline series={r.series} />
            </div>
          ))}
        </div>
      ) : (
        <>
          <div className="mt-3"><Legend items={rates.map((r, i) => ({ label: r.label, color: LINE_COLORS[i % LINE_COLORS.length] }))} /></div>
          <div className="mt-2">
            <MultiLine data={allLines} xKey="label" series={rates.map((r, i) => ({ key: r.key, label: r.label, color: LINE_COLORS[i % LINE_COLORS.length] }))} height={260} />
          </div>
        </>
      )
    ) : (
      <Empty message="No data for this range" height={200} />
    )}
    <p className="mt-3 text-[12.5px] text-muted-foreground">The box shows the selected range and its change against the same number of days before it. Recent people may still convert.</p>
    </>
  )
}

export default function ConversionsSection({ data, comparisons, rangeDays }) {
  const [trendView, setTrendView] = useState('snapshot')
  return (
    <section id="od-conversions" className="mt-[26px] scroll-mt-32">
      <SectionHead
        number="06"
        title="Conversion funnel"
        tag="Do leads become students?"
        subtitle="From first enquiry to the top of the curriculum."
      />

      <CardFrame
        data={data}
        comparisons={comparisons}
        pageRange={rangeDays}
        className=""
        title="R-14 Conversion trends"
        note="The selected range's rate, its change vs. the previous range, and the 12-month trend"
        toggle={<Segmented value={trendView} onChange={setTrendView} options={[{ value: 'snapshot', label: 'SNAPSHOT' }, { value: 'all', label: 'ALL LINES' }]} />}
      >
        {(d) => <TrendBody rates={d?.funnel?.spec?.conversionRates || []} trendView={trendView} />}
      </CardFrame>

      <ConversionReports data={data} comparisons={comparisons} rangeDays={rangeDays} />
    </section>
  )
}
