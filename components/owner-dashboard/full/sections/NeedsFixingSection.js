'use client'

import { Panel, SectionHead, num } from '../chrome'

/**
 * Data gaps behind guessed or incomplete numbers, so they are visible instead of silently wrong.
 * Comes from the overview's `dataQuality` (owner view only); shows nothing when everything is clean.
 */
export default function NeedsFixingSection({ data }) {
  const open = (data?.dataQuality || []).filter((i) => i.count > 0)
  if (!open.length) return null
  return (
    <section id="od-needs-fixing" className="mt-[26px] scroll-mt-32">
      <SectionHead number="09" title="Needs fixing" tag="Why some numbers are estimates" subtitle="Data gaps that make dashboard numbers incomplete or guessed." />
      <Panel>
        <ul className="divide-y divide-border">
          {open.map((item) => (
            <li key={item.key} className="flex flex-wrap items-baseline gap-x-4 gap-y-1 py-3 first:pt-0 last:pb-0">
              <span className="min-w-[48px] text-[22px] font-bold tabular-nums text-[var(--studio-primary)]">
                {num(item.count)}
                {item.of ? <span className="text-[12px] font-medium text-muted-foreground"> / {num(item.of)}</span> : null}
              </span>
              <span className="flex-1 text-[13.5px] text-foreground">
                {item.label}
                <span className="block text-[12.5px] text-muted-foreground">{item.fix} Affects {item.affects}.</span>
              </span>
            </li>
          ))}
        </ul>
      </Panel>
    </section>
  )
}
