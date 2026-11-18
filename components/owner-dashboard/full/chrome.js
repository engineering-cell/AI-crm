'use client'

import { createContext, useContext, useEffect, useRef, useState } from 'react'
import { TrendingUp, TrendingDown, Lock, BarChart3 } from 'lucide-react'

/* ── report IDs (spec: "Show report IDs" overlay, bottom-right) ───────────── */

export const ReportIdsContext = createContext(false)

/** Small ID label (K-01, R-01 …) shown only while the page's "Show report IDs" toggle is on. */
export function IdBadge({ id }) {
  const show = useContext(ReportIdsContext)
  if (!show || !id) return null
  return (
    <span data-rid={id} className="rounded bg-[#4A3352] px-1.5 py-0.5 text-[10px] font-bold tracking-wide text-white">
      {id}
    </span>
  )
}

/* ── formatters ─────────────────────────────────────────────────────────── */

export function money(n) {
  const v = Number(n) || 0
  return `$${Math.round(v).toLocaleString()}`
}

/** Exact money to the cent, for figures people check against an account (outstanding balances). */
export function moneyExact(n) {
  const v = Number(n) || 0
  return `${v < 0 ? '−' : ''}$${Math.abs(v).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
}

/** Compact money for axis ticks and dense bar rows. */
export function moneyShort(n) {
  const v = Number(n) || 0
  const abs = Math.abs(v)
  if (abs >= 1000000) return `$${(v / 1000000).toFixed(1)}M`
  if (abs >= 1000) return `$${Math.round(v / 1000)}K`
  return `$${Math.round(v).toLocaleString()}`
}

export const num = (n) => Math.round(Number(n) || 0).toLocaleString()
export const pct1 = (n) => `${(Number(n) || 0).toFixed(1)}%`

/* ── reveal-on-scroll ───────────────────────────────────────────────────── */

/**
 * Adds the `od-in` class the first time the node scrolls into view. Degrades to
 * "immediately visible" where IntersectionObserver is unavailable, so content
 * can never end up permanently transparent.
 */
export function useReveal() {
  const ref = useRef(null)
  const [shown, setShown] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (!node || shown) return undefined
    if (typeof IntersectionObserver === 'undefined') {
      setShown(true)
      return undefined
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setShown(true)
          io.disconnect()
        }
      },
      { rootMargin: '0px 0px -6% 0px' }
    )
    io.observe(node)
    return () => io.disconnect()
  }, [shown])

  return [ref, shown]
}

/** Layout wrapper only. The design allows one animation — bars growing once on first load — so no fade or slide-in. */
export function Reveal({ children, className = '' }) {
  return <div className={className.trim()}>{children}</div>
}

/* ── type ───────────────────────────────────────────────────────────────── */

export function Eyebrow({ children, className = '' }) {
  return (
    <p className={`text-[10px] font-bold uppercase tracking-[0.32em] text-[var(--studio-primary)] ${className}`.trim()}>
      {children}
    </p>
  )
}

/** The concept's foil-gradient text, re-cut in the brand ramp. */
export function Foil({ children, className = '' }) {
  return <span className={`od-foil ${className}`.trim()}>{children}</span>
}

export function Chip({ children, ghost = false }) {
  if (ghost) {
    return (
      <span className="whitespace-nowrap rounded-full border border-border px-4 py-2 text-[10px] font-semibold tracking-[0.2em] text-muted-foreground">
        {children}
      </span>
    )
  }
  return (
    <span
      className="whitespace-nowrap rounded-full px-4 py-2 text-[10px] font-bold tracking-[0.2em] text-brand-foreground"
      style={{ background: 'var(--studio-gradient-css)' }}
    >
      {children}
    </span>
  )
}

/* ── section header ─────────────────────────────────────────────────────── */

export function SectionHead({ number, title, tag, subtitle }) {
  return (
    <div className="mb-[18px] flex flex-wrap items-center gap-x-3 gap-y-1.5">
      <h2 className="text-[19px] font-extrabold leading-tight text-foreground">{title}</h2>
      {tag && <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-muted-foreground">{tag}</span>}
      {subtitle && <p className="ml-auto text-[12.5px] text-muted-foreground max-[1199px]:ml-0 max-[1199px]:w-full">{subtitle}</p>}
    </div>
  )
}

/**
 * Supporting lines in the design set their numbers in bold ink against grey text
 * ("<b>34</b> active payment plans"). Wraps every figure in a string — $1,152, 78.5%, 954 — that way.
 */
export function Emph({ children }) {
  if (typeof children !== 'string') return children
  const parts = children.split(/(\$?\d[\d,]*(?:\.\d+)?(?:%| pp|K|M)?)/g)
  return parts.map((part, i) =>
    i % 2 ? (
      <b key={i} className="font-semibold text-foreground">
        {part}
      </b>
    ) : (
      part
    )
  )
}

/* ── comparison badges ──────────────────────────────────────────────────── */

/**
 * One MoM / YoY badge. `d` comes from delta() or pointDelta() in
 * useOwnerDashboardPage — `null` means we genuinely have nothing to compare
 * against, so nothing renders rather than a misleading 0%.
 */
export function DeltaPill({ d, label, hideWhenMissing = false }) {
  // Spec 3.3: a missing comparison shows "—", never nothing or a made-up 0.
  if (!d) return hideWhenMissing ? null : <span title={`No ${label} comparison yet`} className="inline-flex items-center gap-1 rounded-full bg-muted px-2 py-0.5 text-[10px] font-bold text-muted-foreground"><span className="text-[9px] font-medium uppercase tracking-[0.04em] opacity-70">{label}</span>—</span>

  const up = d.dir === 'up'
  const text = d.noBaseline
    ? 'New'
    : d.points
      ? `${d.pct >= 0 ? '+' : '−'}${Math.abs(d.pct).toFixed(1)} pp`
      : `${d.pct >= 0 ? '+' : '−'}${Math.abs(d.pct).toFixed(1)}%`
  const Icon = up ? TrendingUp : TrendingDown

  return (
    <span
      title={d.noBaseline ? `No ${label} baseline to compare against` : `${text} vs ${label}`}
      className={`inline-flex items-center gap-1 whitespace-nowrap rounded-full px-2 py-0.5 text-[10px] font-bold tabular-nums ${
        up ? 'bg-success/10 text-success' : 'bg-destructive/10 text-destructive'
      }`}
    >
      <span className="text-[9px] font-medium uppercase tracking-[0.04em] opacity-70">{label}</span>
      <Icon className="h-3 w-3" aria-hidden />
      {text}
    </span>
  )
}

/* ── surfaces ───────────────────────────────────────────────────────────── */

export const panelClass =
  'rounded-[20px] border border-border bg-card p-5 text-card-foreground shadow-sm ' +
  'transition-[box-shadow,border-color] duration-200 ease-out hover:shadow-md ' +
  'hover:border-[color-mix(in_srgb,var(--studio-primary)_28%,hsl(var(--border)))]'

export function Panel({ children, className = '' }) {
  return <div className={`${panelClass} ${className}`.trim()}>{children}</div>
}

/** The concept's card title row: label left, note + controls right. */
export function PanelHead({ title, note, right, detailsButton, tag }) {
  return (
    <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-2">
      <h3 className="flex items-center gap-2 text-[15px] font-extrabold uppercase text-[var(--studio-primary-dark,#7E0F47)]">
        <IdBadge id={title.match(/^R-\d+/)?.[0]} />
        {title.replace(/^R-\d+\s+/, '')}
        {tag && <span className="rounded-full bg-[#9D85E8] px-2 py-0.5 text-[10px] font-bold tracking-[0.08em] text-white">{tag}</span>}
      </h3>
      <div className="flex flex-wrap items-center gap-2">
        {note && (
          <span className="text-[10px] normal-case tracking-normal text-muted-foreground">
            <Emph>{note}</Emph>
          </span>
        )}
        {right}
        {detailsButton}
      </div>
    </div>
  )
}

/**
 * Stand-in for a panel the current backend cannot fill. Distinct from Empty
 * ("no rows in this period") — this says the metric itself does not exist yet,
 * and names what it would take to light it up.
 */
export function NotAvailable({ message, requires, height = 200 }) {
  return (
    <div
      className="mt-4 flex flex-col items-center justify-center gap-2 rounded-2xl border border-dashed border-border px-6 py-6 text-center"
      style={{ minHeight: height }}
    >
      <Lock className="h-6 w-6 text-muted-foreground/35" aria-hidden />
      <p className="text-[13px] font-medium text-foreground">{message}</p>
      {requires && <p className="max-w-[48ch] text-[11px] leading-relaxed text-muted-foreground">{requires}</p>}
    </div>
  )
}

/** "No rows for this period" — the data path exists, this window is just empty. */
export function Empty({ message = 'No data for this range.', height = 200 }) {
  return (
    <div className="flex flex-col items-center justify-center gap-2 px-4 text-center" style={{ minHeight: height }}>
      <BarChart3 className="h-6 w-6 text-muted-foreground/35" aria-hidden />
      <p className="text-[13px] text-muted-foreground">{message}</p>
    </div>
  )
}

/** Small colour-key row used above stacked / multi-series charts. */
export function Legend({ items }) {
  return (
    <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-[11px] text-muted-foreground">
      {items.map((it) => (
        <span key={it.label} className="flex items-center gap-1.5">
          <span className="h-2 w-2 shrink-0 rounded-full" style={{ background: it.color }} />
          {it.label}
        </span>
      ))}
    </div>
  )
}

/** Pill segmented control — the concept's MONTHLY / QUARTERLY / YEARLY switch. */
export function Segmented({ value, onChange, options }) {
  return (
    <div className="inline-flex gap-[3px] rounded-full border border-border bg-muted/60 p-[3px]">
      {options.map((opt) => {
        const active = opt.value === value
        return (
          <button
            key={opt.value}
            type="button"
            onClick={() => onChange(opt.value)}
            className={`rounded-full px-3.5 py-1.5 text-[9px] font-bold tracking-[0.14em] transition-colors ${
              active
                ? 'bg-[var(--studio-primary)] text-brand-foreground'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            {opt.label}
          </button>
        )
      })}
    </div>
  )
}

/**
 * Inline "this column/panel has no data source yet" note. Used *underneath* a
 * structure that is rendered in full — the shape from the concept stays on
 * screen with em dashes in place of numbers, and this says why. Distinct from
 * NotAvailable, which replaces the structure entirely.
 */
export function Caveat({ children }) {
  return (
    <p className="mt-3 flex items-start gap-1.5 border-t border-dashed border-border pt-2.5 text-[10.5px] leading-relaxed text-muted-foreground">
      <Lock className="mt-[1px] h-3 w-3 shrink-0 opacity-50" aria-hidden />
      <span>{children}</span>
    </p>
  )
}

/** Placeholder for a value the backend cannot supply, in tables and metric grids. */
export function Dash() {
  return <span className="text-muted-foreground/50">&mdash;</span>
}
