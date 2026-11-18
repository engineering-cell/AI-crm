import { TrendingUp, TrendingDown, BarChart3 } from 'lucide-react'

// Shared visual helpers — matched to reports widgets (chartCardClass / titles).
export const PRIMARY = 'var(--studio-primary)'
export const GRADIENT_COLOR = 'var(--studio-gradient)'

/** Higher-contrast pink → magenta palette for pie/donut slices. */
export const CHART_COLORS = [
  'var(--chart-1)',
  'var(--chart-2)',
  'var(--chart-3)',
  'var(--chart-4)',
  'var(--chart-5)',
  'var(--chart-6)',
  'var(--chart-7)',
  'var(--chart-8)',
]

export const SIZE_OPTIONS = [
  { id: 'quarter', label: '1/4', title: 'Quarter width', cols: 3 },
  { id: 'third', label: '1/3', title: 'Third width', cols: 4 },
  { id: 'half', label: '1/2', title: 'Half width', cols: 6 },
  { id: 'full', label: 'Full', title: 'Full width', cols: 12 },
]

/** Same card chrome as reports `chartCardClass`, with a soft hover lift. */
export const chartCardClass =
  'h-full rounded-[20px] border-2 p-5 bg-card border-border text-card-foreground shadow-sm ' +
  'transition-[box-shadow,transform,border-color] duration-200 ease-out ' +
  'hover:shadow-md hover:border-[color-mix(in_srgb,var(--studio-primary)_28%,hsl(var(--border)))]'

export function SectionLabel({ children, as: Tag = 'h3' }) {
  return (
    <Tag className="flex items-center gap-2 text-base font-bold uppercase tracking-[0.02em] text-[var(--studio-primary)]">
      <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--studio-primary)]" aria-hidden />
      {children}
    </Tag>
  )
}

/** SectionLabel + an optional "Show full details" button on the same row. */
export function WidgetTitleRow({ title, detailsButton = null }) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-2">
      <SectionLabel>{title}</SectionLabel>
      {detailsButton}
    </div>
  )
}

export function Card({ children, className = '' }) {
  return <div className={`${chartCardClass} ${className}`.trim()}>{children}</div>
}

/**
 * Trend badge. `label` is the full sentence for assistive tech / tooltip when
 * `text` is abbreviated (e.g. just "12.5%").
 */
export function Trend({ type = 'up', text, label, className = 'mt-1.5' }) {
  const isUp = type === 'up'
  const Icon = isUp ? TrendingUp : TrendingDown
  return (
    <div
      title={label}
      aria-label={label}
      className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[12.5px] font-semibold ${
        isUp ? 'bg-success/10 text-success' : 'bg-destructive/10 text-destructive'
      } ${className}`.trim()}
    >
      <Icon className="h-3.5 w-3.5" aria-hidden />
      <span>{text}</span>
    </div>
  )
}

export function EmptyChart({ message = 'No data for this range.' }) {
  return (
    <div className="flex h-[240px] flex-col items-center justify-center gap-2 px-4 text-center">
      <BarChart3 className="h-7 w-7 text-muted-foreground/35" aria-hidden />
      <p className="text-sm text-muted-foreground">{message}</p>
    </div>
  )
}
