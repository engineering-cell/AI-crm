'use client'

import { useEffect, useState } from 'react'
import {
  Area,
  AreaChart,
  Bar,
  CartesianGrid,
  ComposedChart,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { chartAxisStroke, chartGridStroke, rechartsTooltipContentStyle } from '@/lib/chartStyles'
import { BAR_FILL, BAR_GRADIENT_DEFS } from '@/components/charts/barGradients'
import { num } from './chrome'

/**
 * Bars are laid out at width:0 on first paint and grown on the next frame, so
 * the CSS transition actually runs. Without the deferred flip React would
 * commit the final width immediately and nothing would animate.
 */
function useGrow() {
  const [grown, setGrown] = useState(false)
  useEffect(() => {
    const id = requestAnimationFrame(() => setGrown(true))
    return () => cancelAnimationFrame(id)
  }, [])
  return grown
}

/**
 * Width transitions are written as inline styles, not Tailwind utilities. An
 * arbitrary duration or easing value is ambiguous between Tailwind's
 * transition and animation scales, so it warns on build and may not emit the
 * class at all — an inline style is unambiguous and always applies.
 */
const grow = (ms) => `width ${ms}ms cubic-bezier(.22, 1, .36, 1)`

const SOFT_FILL = 'color-mix(in srgb, var(--studio-primary) 26%, transparent)'
const STRONG_FILL = 'linear-gradient(90deg, var(--bar-gradient-start), var(--bar-gradient-end))'

/* ── ranked horizontal bars ─────────────────────────────────────────────── */

/**
 * Label · track · value, ranked descending — the workhorse row of the concept.
 * `rows`: { label, value, sublabel? }[]
 */
export function RankedBars({
  rows = [],
  valueFormatter = num,
  highlightFirst = true,
  labelWidth = 128,
  accent,
}) {
  const grown = useGrow()
  const max = Math.max(...rows.map((r) => Number(r.value) || 0), 1)

  return (
    <div className="flex flex-col">
      {rows.map((r, i) => {
        const value = Number(r.value) || 0
        const width = grown ? Math.max((value / max) * 100, value > 0 ? 2 : 0) : 0
        const first = highlightFirst && i === 0
        return (
          <div
            key={`${r.label}-${i}`}
            title={`${r.label}: ${Number(r.value).toLocaleString(undefined, { maximumFractionDigits: 2 })}`}
            className="grid items-center gap-3 py-[7px]"
            style={{ gridTemplateColumns: `minmax(0,${labelWidth}px) 1fr 78px` }}
          >
            <span className="min-w-0 truncate text-[11.5px] font-semibold text-foreground" title={r.label}>
              {r.label}
              {r.sublabel && (
                <span className="mt-0.5 block truncate text-[9.5px] font-normal tracking-[0.02em] text-muted-foreground">
                  {r.sublabel}
                </span>
              )}
            </span>
            <div className="h-3.5 overflow-hidden rounded-[3px] bg-muted">
              <div
                className="h-full rounded-[3px]"
                style={{ transition: grow(1200), width: `${width}%`, background: accent || (first ? STRONG_FILL : SOFT_FILL) }}
              />
            </div>
            <span
              className={`text-right text-[12px] font-bold tabular-nums ${
                first ? 'text-[var(--studio-primary)]' : 'text-muted-foreground'
              }`}
            >
              {valueFormatter(value)}
            </span>
          </div>
        )
      })}
    </div>
  )
}

/* ── two-segment comparison bars ────────────────────────────────────────── */

/**
 * One bar per row split into two segments (e.g. booked vs. not booked), with
 * every bar scaled against the largest row total so lengths stay comparable.
 * `rows`: { label, sublabel?, a, b, valueLabel, valueTone? }[]
 */
export function StackedCompare({ rows = [], aColor, bColor }) {
  const grown = useGrow()
  const max = Math.max(...rows.map((r) => (Number(r.a) || 0) + (Number(r.b) || 0)), 1)

  return (
    <div className="flex flex-col">
      {rows.map((r) => {
        const a = Number(r.a) || 0
        const b = Number(r.b) || 0
        const total = a + b
        const aWidth = grown ? (a / max) * 100 : 0
        const bWidth = grown ? (b / max) * 100 : 0
        return (
          <div key={r.label} className="grid grid-cols-[minmax(0,150px)_1fr_58px] items-center gap-3 py-[7px]">
            <span className="min-w-0 truncate text-[11.5px] font-semibold text-foreground" title={r.label}>
              {r.label}
              {r.sublabel && (
                <span className="mt-0.5 block truncate text-[9.5px] font-normal text-muted-foreground">{r.sublabel}</span>
              )}
            </span>
            <div className="flex h-[19px] overflow-hidden rounded-[4px] bg-muted">
              <div
                className="h-full"
                style={{ transition: grow(1100), width: `${aWidth}%`, background: aColor || 'var(--studio-primary)' }}
                title={`${num(a)} booked`}
              />
              <div
                className="h-full"
                style={{
                  transition: grow(1100),
                  width: `${bWidth}%`,
                  background: bColor || 'color-mix(in srgb, hsl(var(--destructive)) 38%, transparent)',
                }}
                title={`${num(b)} not booked`}
              />
            </div>
            <span className={`text-right text-[12px] font-bold tabular-nums ${r.valueTone || 'text-foreground'}`}>
              {r.valueLabel ?? num(total)}
            </span>
          </div>
        )
      })}
    </div>
  )
}

/* ── goal attainment ────────────────────────────────────────────────────── */

/** Slim attainment track — switches to the success ramp once the goal is met. */
export function GoalBar({ pct }) {
  const grown = useGrow()
  const clamped = Math.min(Math.max(Number(pct) || 0, 0), 100)
  const over = (Number(pct) || 0) >= 100
  return (
    <div className="h-1.5 min-w-[80px] overflow-hidden rounded-[3px] bg-muted">
      <div
        className="h-full rounded-[3px]"
        style={{
          transition: grow(1200),
          width: grown ? `${clamped}%` : '0%',
          background: over ? 'linear-gradient(90deg, hsl(var(--success)/0.7), hsl(var(--success)))' : STRONG_FILL,
        }}
      />
    </div>
  )
}

/* ── composition / mix rows ─────────────────────────────────────────────── */

/**
 * The concept's "cmix" row — a labelled share bar under a funnel stage.
 * `rows`: { label, pct, value, color }[]
 */
export function MixBars({ title, caption, rows = [], unavailable = false, children }) {
  const grown = useGrow()
  return (
    <div className="mt-4 border-t border-border pt-4">
      <div className="mb-2.5 flex items-baseline justify-between gap-3">
        <b className="text-[9.5px] font-bold uppercase tracking-[0.22em] text-[var(--studio-primary)]">{title}</b>
        {caption && <span className="text-[10.5px] text-muted-foreground">{caption}</span>}
      </div>
      {rows.map((r) => (
        <div key={r.label} className="grid grid-cols-[minmax(0,190px)_1fr_110px] items-center gap-3 py-1">
          <span className="min-w-0 truncate text-[11.5px] text-muted-foreground" title={r.label}>
            {r.label}
          </span>
          <div className="h-2.5 overflow-hidden rounded-[4px] bg-muted">
            {!unavailable && (
              <div
                className="h-full rounded-[4px]"
                style={{ transition: grow(900), width: grown ? `${r.pct}%` : '0%', background: r.color || 'var(--studio-primary)' }}
              />
            )}
          </div>
          <span
            className={`text-right text-[11px] font-bold tabular-nums ${
              unavailable ? 'text-muted-foreground/50' : 'text-foreground'
            }`}
          >
            {unavailable ? '—' : r.value}
          </span>
        </div>
      ))}
      {children}
    </div>
  )
}

/* ── funnel ─────────────────────────────────────────────────────────────── */

/**
 * One funnel stage card. `metrics` renders the concept's 2-column metric grid
 * beneath the headline number; `selected` is the click-to-drill state.
 */
export function Stage({ label, value, metrics = [], primary = false, selected = false, onClick, footer }) {
  const clickable = typeof onClick === 'function'
  const Tag = clickable ? 'button' : 'div'
  return (
    <Tag
      type={clickable ? 'button' : undefined}
      onClick={onClick}
      // flex-1 basis-0 (not a fixed width): stages share the row evenly and
      // stretch to fill it, the way the concept's `flex: 1 1 0` stages do.
      // A fixed width leaves the whole right half of the panel empty.
      className={`min-w-[150px] flex-1 basis-0 rounded-2xl border p-4 text-left transition-all duration-300 ${
        selected
          ? 'border-[var(--studio-primary)] bg-[color-mix(in_srgb,var(--studio-primary)_7%,hsl(var(--card)))] shadow-md'
          : primary
            ? 'border-[color-mix(in_srgb,var(--studio-primary)_35%,hsl(var(--border)))] bg-card'
            : 'border-border bg-card'
      } ${clickable ? 'cursor-pointer hover:border-[color-mix(in_srgb,var(--studio-primary)_45%,hsl(var(--border)))]' : ''}`}
    >
      <p className="text-[9px] font-bold uppercase tracking-[0.22em] text-muted-foreground">{label}</p>
      <p className="od-figure mt-2 text-[32px] leading-none text-[var(--studio-primary)]">{value}</p>
      {metrics.length > 0 && (
        <div className="mt-3 grid grid-cols-2 gap-x-3 gap-y-2 border-t border-border pt-2.5">
          {metrics.map((m) => (
            <div key={m.label}>
              <p className="text-[7.5px] font-bold uppercase tracking-[0.14em] text-muted-foreground">{m.label}</p>
              <p className={`text-[12.5px] font-bold tabular-nums ${m.tone || 'text-foreground'}`}>{m.value}</p>
            </div>
          ))}
        </div>
      )}
      {footer && (
        <p
          className={`mt-3 text-[8.5px] font-bold tracking-[0.18em] ${
            selected ? 'text-[var(--studio-primary)]' : 'text-muted-foreground'
          }`}
        >
          {footer}
        </p>
      )}
    </Tag>
  )
}

/** The rate + arrow that sits between two stages. */
export function Connector({ rate, caption, owner }) {
  return (
    <div className="flex w-[80px] flex-none flex-col items-center justify-center px-1 text-center">
      <span className="od-figure text-[21px] text-success">{rate}</span>
      <span className="my-0.5 text-[11px] text-[var(--studio-primary)]" aria-hidden>
        &#9656;
      </span>
      {caption && <span className="text-[8.5px] leading-[1.45] tracking-[0.06em] text-muted-foreground">{caption}</span>}
      {owner && <span className="mt-1 text-[8px] font-bold tracking-[0.2em] text-[var(--studio-primary)]">{owner}</span>}
    </div>
  )
}

/**
 * Horizontally scrollable rail for a funnel. Stages flex to share the width
 * evenly; `stages` sets the floor below which the rail scrolls instead of
 * squashing the cards past the point of legibility.
 *
 * Children must be stages and connectors as *direct* siblings — wrapping a
 * connector+stage pair in a div would make that wrapper the flex item and
 * break the even distribution across stages.
 */
export function Flow({ children, stages = 2 }) {
  const minWidth = stages * 170 + Math.max(stages - 1, 0) * 80
  return (
    <div className="overflow-x-auto pb-1">
      <div className="flex items-stretch" style={{ minWidth }}>
        {children}
      </div>
    </div>
  )
}

/* ── drill-down accordion ───────────────────────────────────────────────── */

/** `items`: { label, value, rows: { label, value }[] }[] */
export function DrillAccordion({ items = [] }) {
  return (
    <div className="mt-3 max-h-56 overflow-y-auto pr-1">
      {items.map((item, i) => (
        <details
          key={item.label}
          open={i === 0}
          className="border-t border-border/60 first:border-t-0 [&_summary::-webkit-details-marker]:hidden"
        >
          <summary className="flex cursor-pointer list-none items-center justify-between gap-3 px-1.5 py-2.5 text-[12px] font-semibold text-foreground transition-colors hover:text-[var(--studio-primary)]">
            <span className="min-w-0 truncate">{item.label}</span>
            <span className="shrink-0 tabular-nums">{item.value}</span>
          </summary>
          <div className="px-1.5 pb-2.5">
            {item.rows.map((r) => (
              <div
                key={r.label}
                className="flex justify-between border-l border-border py-1.5 pl-3.5 text-[11px] text-muted-foreground"
              >
                <span className="min-w-0 truncate">{r.label}</span>
                <strong className="shrink-0 font-semibold tabular-nums text-foreground">{r.value}</strong>
              </div>
            ))}
          </div>
        </details>
      ))}
    </div>
  )
}

/**
 * A chart slot that takes whatever height its card has left (min `min`px), so a short chart
 * beside a tall table fills the card instead of leaving a gap under it.
 */
export function Fill({ children, min = 200 }) {
  return (
    <div className="relative mt-3 flex-1" style={{ minHeight: min }}>
      <div className="absolute inset-0">{children}</div>
    </div>
  )
}

/* ── recharts wrappers ──────────────────────────────────────────────────── */

const AXIS_TICK = { fill: chartAxisStroke, fontSize: 11 }

/** Single-series area trend — the concept's gold line, re-cut in the brand ramp. */
export function TrendArea({ data, xKey, yKey, height = 200, valueFormatter = num, seriesName = 'Value', gradientId }) {
  const id = gradientId || `odTrend-${xKey}-${yKey}`
  return (
    <div style={{ height }}>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 10, right: 8, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--studio-primary)" stopOpacity={0.28} />
              <stop offset="100%" stopColor="var(--studio-primary)" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid stroke={chartGridStroke} vertical={false} />
          <XAxis dataKey={xKey} tick={AXIS_TICK} tickLine={false} axisLine={false} />
          <YAxis tick={AXIS_TICK} tickLine={false} axisLine={false} tickFormatter={valueFormatter} width={58} />
          <Tooltip contentStyle={rechartsTooltipContentStyle} formatter={(v) => [valueFormatter(v), seriesName]} />
          <Area
            type="monotone"
            dataKey={yKey}
            name={seriesName}
            stroke="var(--studio-primary)"
            strokeWidth={2.4}
            fill={`url(#${id})`}
            dot={{ r: 2.5, fill: 'hsl(var(--card))', stroke: 'var(--studio-primary)', strokeWidth: 2 }}
            activeDot={{ r: 4 }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}

/** Multi-series percentage lines — used by the conversion-rate trend panel. */
export function MultiLine({ data, xKey, series, height = 260 }) {
  return (
    <div style={{ height }}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 10, right: 8, left: 0, bottom: 0 }}>
          <CartesianGrid stroke={chartGridStroke} vertical={false} />
          <XAxis dataKey={xKey} tick={AXIS_TICK} tickLine={false} axisLine={false} />
          <YAxis
            tick={AXIS_TICK}
            tickLine={false}
            axisLine={false}
            width={44}
            domain={[0, 100]}
            tickFormatter={(v) => `${v}%`}
          />
          <Tooltip contentStyle={rechartsTooltipContentStyle} formatter={(v, n) => [`${Number(v).toFixed(1)}%`, n]} />
          {series.map((s) => (
            <Line
              key={s.key}
              type="monotone"
              dataKey={s.key}
              name={s.label}
              stroke={s.color}
              strokeWidth={1.9}
              dot={false}
              activeDot={{ r: 3.5 }}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

/**
 * Revenue bars against a lessons line on a second axis — the concept's combo
 * chart. Two independent Y axes because the two series are orders of magnitude
 * apart and a shared scale would flatten the lesson line onto the floor.
 */
export function RevenueLessonsCombo({ data, height = 290, moneyFormatter, lessonsKey = 'lessons' }) {
  const hasLessons = data.some((d) => Number(d[lessonsKey]) > 0)
  return (
    <div style={{ height }}>
      <ResponsiveContainer width="100%" height="100%">
        <ComposedChart data={data} margin={{ top: 20, right: 8, left: 0, bottom: 0 }}>
          {BAR_GRADIENT_DEFS}
          <CartesianGrid stroke={chartGridStroke} vertical={false} />
          <XAxis dataKey="label" tick={AXIS_TICK} tickLine={false} axisLine={false} />
          <YAxis
            yAxisId="left"
            tick={AXIS_TICK}
            tickLine={false}
            axisLine={false}
            width={62}
            tickFormatter={moneyFormatter}
          />
          <YAxis
            yAxisId="right"
            orientation="right"
            tick={AXIS_TICK}
            tickLine={false}
            axisLine={false}
            width={52}
            tickFormatter={num}
          />
          <Tooltip
            contentStyle={rechartsTooltipContentStyle}
            formatter={(v, n) => [n === 'Revenue' ? moneyFormatter(v) : num(v), n]}
          />
          <Bar yAxisId="left" dataKey="revenue" name="Revenue" radius={[6, 6, 0, 0]} fill={BAR_FILL} maxBarSize={38} />
          {hasLessons && (
            <Line
              yAxisId="right"
              type="monotone"
              dataKey={lessonsKey}
              name="Lessons"
              stroke="hsl(var(--foreground))"
              strokeWidth={2.2}
              dot={{ r: 2.5, fill: 'hsl(var(--card))', stroke: 'hsl(var(--foreground))', strokeWidth: 2 }}
              activeDot={{ r: 4 }}
            />
          )}
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  )
}

/* ── big utilization meter ──────────────────────────────────────────────── */

export function CapacityMeter({ pct, children }) {
  const grown = useGrow()
  const value = Math.min(Math.max(Number(pct) || 0, 0), 100)
  return (
    <div className="flex flex-wrap items-center gap-6">
      <span className="od-figure text-[56px] leading-none text-[var(--studio-primary)]">
        {Math.round(Number(pct) || 0)}%
      </span>
      <div className="h-4 min-w-[220px] flex-1 overflow-hidden rounded-full bg-muted">
        <div
          className="h-full rounded-full"
          style={{ transition: grow(1400), width: grown ? `${value}%` : '0%', background: STRONG_FILL }}
        />
      </div>
      <div className="text-[11px] leading-[1.8] text-muted-foreground">{children}</div>
    </div>
  )
}

/* ── tables ─────────────────────────────────────────────────────────────── */

export function DataTable({ head = [], children, minWidth, emptyMessage }) {
  return (
    <div className="mt-3 overflow-x-auto">
      <table className="w-full border-collapse tabular-nums" style={minWidth ? { minWidth } : undefined}>
        <thead>
          <tr>
            {head.map((h, i) => (
              <th
                key={typeof h === 'string' ? h : h.label}
                className={`whitespace-nowrap border-b border-border px-2.5 py-2.5 text-[8.5px] font-bold uppercase tracking-[0.18em] text-muted-foreground ${
                  i === 0 ? 'text-left' : 'text-right'
                }`}
                style={typeof h === 'object' && h.width ? { width: h.width } : undefined}
              >
                {typeof h === 'string' ? h : h.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {emptyMessage ? (
            <tr>
              <td
                colSpan={head.length}
                className="border-b border-border/50 px-2.5 py-8 text-center text-[12px] text-muted-foreground"
              >
                {emptyMessage}
              </td>
            </tr>
          ) : (
            children
          )}
        </tbody>
      </table>
    </div>
  )
}

export function Row({ children }) {
  return <tr className="transition-colors hover:bg-[color-mix(in_srgb,var(--studio-primary)_4%,transparent)]">{children}</tr>
}

export function Cell({ children, first = false, tone = 'text-foreground', className = '' }) {
  return (
    <td
      className={`whitespace-nowrap border-b border-border/50 px-2.5 py-2.5 text-[12.5px] ${
        first ? 'text-left font-bold' : 'text-right'
      } ${tone} ${className}`.trim()}
    >
      {children}
    </td>
  )
}
