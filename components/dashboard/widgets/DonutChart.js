'use client'

import { useId, useState } from 'react'
import { PieChart, Pie, Cell, ResponsiveContainer, Sector, Tooltip } from 'recharts'
import { CHART_COLORS } from './shared'

/** Refined brand palette — darker → lighter pinks, then cyan accents. */
const DONUT_PALETTE = [
  'var(--chart-4)',
  'var(--chart-3)',
  'var(--chart-1)',
  'var(--chart-2)',
  'var(--chart-5)',
  'var(--chart-6)',
  'var(--chart-7)',
  'var(--chart-8)',
]

function CustomTooltip({ active, payload, valueFormatter, nameKey }) {
  if (!active || !payload?.length) return null
  const item = payload[0].payload
  const raw = item[payload[0].dataKey]
  const display = valueFormatter
    ? valueFormatter(raw, item)
    : `${Number(raw).toLocaleString()} · ${item.percentage}%`

  return (
    <div className="rounded-xl border border-border bg-popover px-3 py-2 shadow-lg">
      <div className="flex items-center gap-2">
        <span className="h-2.5 w-2.5 rounded-full" style={{ background: item.color }} />
        <p className="text-[13px] font-semibold text-popover-foreground">{item[nameKey]}</p>
      </div>
      <p className="mt-1 text-[12px] tabular-nums text-muted-foreground">{display}</p>
    </div>
  )
}

function ActiveSlice({ cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill }) {
  return (
    <Sector
      cx={cx}
      cy={cy}
      innerRadius={innerRadius - 2}
      outerRadius={outerRadius + 6}
      startAngle={startAngle}
      endAngle={endAngle}
      fill={fill}
      cornerRadius={6}
      stroke="hsl(var(--card))"
      strokeWidth={2}
      style={{ filter: 'drop-shadow(0 4px 10px rgba(200, 29, 119, 0.28))' }}
    />
  )
}

/**
 * Professional donut: soft track, rounded slices, hover lift, legend with bars.
 */
export default function DonutChart({
  data = [],
  centerLabel,
  centerValue,
  height = 200,
  valueFormatter,
  nameKey = 'name',
  valueKey = 'value',
  showLegend = true,
}) {
  const reactId = useId().replace(/:/g, '')
  const [activeIndex, setActiveIndex] = useState(null)

  const total = data.reduce((s, d) => s + (Number(d[valueKey]) || 0), 0)
  const slices = data.map((d, i) => ({
    ...d,
    color: d.color || DONUT_PALETTE[i % DONUT_PALETTE.length] || CHART_COLORS[i % CHART_COLORS.length],
    percentage: total ? Math.round((Number(d[valueKey]) / total) * 100) : 0,
  }))

  if (!slices.length) return null

  const size = height

  return (
    <div
      className={
        showLegend
          ? 'flex flex-col items-center gap-5 sm:flex-row sm:items-center sm:gap-8'
          : 'flex justify-center'
      }
    >
      <div className="relative shrink-0" style={{ height: size, width: size }}>
        {/* Soft outer halo */}
        <div
          className="pointer-events-none absolute inset-[6%] rounded-full"
          style={{
            background:
              'radial-gradient(circle, color-mix(in srgb, var(--studio-primary) 8%, transparent) 0%, transparent 70%)',
          }}
        />

        <div className="absolute inset-0 z-10">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <defs>
              {slices.map((entry, i) => (
                <linearGradient
                  key={`${reactId}-g-${i}`}
                  id={`${reactId}-grad-${i}`}
                  x1="0"
                  y1="0"
                  x2="1"
                  y2="1"
                >
                  <stop offset="0%" stopColor={entry.color} stopOpacity={1} />
                  <stop offset="100%" stopColor={entry.color} stopOpacity={0.72} />
                </linearGradient>
              ))}
            </defs>

            {/* Background track */}
            <Pie
              data={[{ value: 1 }]}
              dataKey="value"
              cx="50%"
              cy="50%"
              innerRadius="56%"
              outerRadius="90%"
              fill="hsl(var(--muted))"
              stroke="none"
              isAnimationActive={false}
              tooltipType="none"
            />

            <Pie
              data={slices}
              dataKey={valueKey}
              nameKey={nameKey}
              cx="50%"
              cy="50%"
              innerRadius="56%"
              outerRadius="88%"
              paddingAngle={slices.length > 1 ? 2.5 : 0}
              cornerRadius={5}
              stroke="hsl(var(--card))"
              strokeWidth={3}
              activeIndex={activeIndex ?? undefined}
              activeShape={ActiveSlice}
              onMouseEnter={(_, index) => setActiveIndex(index)}
              onMouseLeave={() => setActiveIndex(null)}
            >
              {slices.map((entry, i) => (
                <Cell
                  key={entry[nameKey]}
                  fill={`url(#${reactId}-grad-${i})`}
                  style={{ cursor: 'pointer', outline: 'none' }}
                />
              ))}
            </Pie>

            <Tooltip
              wrapperStyle={{ zIndex: 50, outline: 'none' }}
              content={
                <CustomTooltip valueFormatter={valueFormatter} nameKey={nameKey} />
              }
            />
          </PieChart>
        </ResponsiveContainer>
        </div>

        {(centerLabel || centerValue != null) && (
          <div className="pointer-events-none absolute inset-0 z-0 flex flex-col items-center justify-center px-4 text-center">
            {centerLabel && (
              <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                {centerLabel}
              </p>
            )}
            {centerValue != null && (
              <p className="mt-1 max-w-[78%] truncate text-[20px] font-bold leading-none tracking-tight tabular-nums text-foreground">
                {centerValue}
              </p>
            )}
          </div>
        )}
      </div>

      {showLegend && (
        <div className="w-full min-w-0 flex-1 space-y-2.5">
          {slices.map((item, i) => {
            const isActive = activeIndex === i
            return (
              <button
                key={item[nameKey]}
                type="button"
                className="group w-full rounded-xl border border-transparent px-2.5 py-2 text-left transition-colors hover:border-border hover:bg-muted/40"
                style={
                  isActive
                    ? {
                        borderColor: 'color-mix(in srgb, var(--studio-primary) 25%, transparent)',
                        background: 'color-mix(in srgb, var(--studio-primary) 6%, transparent)',
                      }
                    : undefined
                }
                onMouseEnter={() => setActiveIndex(i)}
                onMouseLeave={() => setActiveIndex(null)}
              >
                <div className="flex items-center justify-between gap-3">
                  <div className="flex min-w-0 items-center gap-2.5">
                    <span
                      className="h-2.5 w-2.5 shrink-0 rounded-full"
                      style={{
                        background: item.color,
                        boxShadow: `0 0 0 3px color-mix(in srgb, ${item.color} 28%, transparent)`,
                      }}
                    />
                    <span className="truncate text-[13px] font-medium text-foreground">{item[nameKey]}</span>
                  </div>
                  <div className="flex shrink-0 items-baseline gap-2">
                    <span className="text-[13px] font-semibold tabular-nums text-foreground">
                      {Number(item[valueKey]).toLocaleString()}
                    </span>
                    <span className="text-[11px] tabular-nums text-muted-foreground">{item.percentage}%</span>
                  </div>
                </div>
                <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-muted">
                  <div
                    className="h-full rounded-full transition-all duration-300"
                    style={{
                      width: `${Math.max(item.percentage, item[valueKey] > 0 ? 3 : 0)}%`,
                      background: `linear-gradient(90deg, ${item.color}, color-mix(in srgb, ${item.color} 55%, white))`,
                    }}
                  />
                </div>
              </button>
            )
          })}
        </div>
      )}
    </div>
  )
}
