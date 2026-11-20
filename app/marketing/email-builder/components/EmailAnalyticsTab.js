'use client'

import { useCallback, useEffect, useState } from 'react'
import { TabsContent } from '@/components/ui/tabs'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import GlobalLoader from '@/components/shared/GlobalLoader'
import api from '@/lib/api'
import { cn, formatDate } from '@/lib/utils'
import {
  FORM_ANALYTICS_RANGES,
  formAnalyticsQuery,
  formAnalyticsReady,
} from '@/lib/form-analytics'
import { PaginatedRows } from '../../form-builder/components/analyticsTablePagination'

function pct(value) {
  const n = Number(value)
  if (!Number.isFinite(n)) return '0%'
  return `${n.toFixed(1)}%`
}

function MetricCard({ label, value, hint }) {
  return (
    <div className="flex min-h-[120px] flex-col rounded-xl border border-border bg-card p-4 shadow-sm">
      <p className="text-sm text-muted-foreground">{label}</p>
      <p className="mt-3 text-3xl font-semibold tracking-tight text-foreground tabular-nums">{value}</p>
      {hint ? <p className="mt-auto pt-2 text-xs text-muted-foreground">{hint}</p> : null}
    </div>
  )
}

export default function EmailAnalyticsTab() {
  const [range, setRange] = useState('30d')
  const [from, setFrom] = useState('')
  const [to, setTo] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [totals, setTotals] = useState(null)
  const [rows, setRows] = useState([])

  const load = useCallback(async () => {
    if (!formAnalyticsReady({ range, from, to })) return
    setLoading(true)
    setError(null)
    try {
      const result = await api.get(`/api/email/builder/analytics?${formAnalyticsQuery({ range, from, to })}`)
      if (result?.success && result.data) {
        setTotals(result.data.totals || null)
        setRows(Array.isArray(result.data.byTemplate) ? result.data.byTemplate : [])
      } else {
        setError(result?.error || 'Failed to load email analytics')
        setTotals(null)
        setRows([])
      }
    } catch {
      setError('Failed to load email analytics')
      setTotals(null)
      setRows([])
    } finally {
      setLoading(false)
    }
  }, [range, from, to])

  useEffect(() => {
    load()
  }, [load])

  const rangeLabel = FORM_ANALYTICS_RANGES.find((r) => r.value === range)?.label || ''

  return (
    <TabsContent value="analytics" className="mt-3 flex-1 min-h-0 space-y-6">
      <div className="relative space-y-6">
        {loading ? (
          <div className="absolute inset-0 z-10 flex items-center justify-center rounded-lg bg-background/70 backdrop-blur-[1px]">
            <GlobalLoader text="Loading email analytics…" />
          </div>
        ) : null}

        <section className="rounded-2xl border border-border bg-card p-5 shadow-sm md:p-6">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <h2 className="text-lg font-semibold text-foreground">Email performance</h2>
              <p className="mt-0.5 text-sm text-muted-foreground">
                Opens, clicks and bounces from SendGrid for emails sent in this period
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <div className="inline-flex rounded-xl bg-muted p-1">
                {FORM_ANALYTICS_RANGES.map((item) => (
                  <button
                    key={item.value}
                    type="button"
                    disabled={loading}
                    onClick={() => setRange(item.value)}
                    className={cn(
                      'rounded-lg px-3 py-1.5 text-sm font-medium text-muted-foreground transition-colors',
                      range === item.value && 'bg-background text-foreground shadow-sm',
                    )}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
              {range === 'custom' ? (
                <div className="flex items-center gap-2">
                  <input
                    type="date"
                    value={from}
                    onChange={(e) => setFrom(e.target.value)}
                    className="h-9 rounded-lg border border-border bg-background px-2 text-sm"
                  />
                  <span className="text-xs text-muted-foreground">to</span>
                  <input
                    type="date"
                    value={to}
                    onChange={(e) => setTo(e.target.value)}
                    className="h-9 rounded-lg border border-border bg-background px-2 text-sm"
                  />
                </div>
              ) : null}
            </div>
          </div>

          <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-5">
            <MetricCard
              label="Sent"
              value={totals ? Number(totals.sent || 0).toLocaleString() : '—'}
              hint={totals?.failed ? `${Number(totals.failed).toLocaleString()} failed` : 'Delivered / accepted'}
            />
            <MetricCard
              label="Open rate"
              value={totals ? pct(totals.openRate) : '—'}
              hint={totals ? `${Number(totals.opened || 0).toLocaleString()} opened` : ' '}
            />
            <MetricCard
              label="Click rate"
              value={totals ? pct(totals.clickRate) : '—'}
              hint={totals ? `${Number(totals.clicked || 0).toLocaleString()} clicked` : ' '}
            />
            <MetricCard
              label="Click-through rate"
              value={totals ? pct(totals.clickThroughRate) : '—'}
              hint="Clicks ÷ opens"
            />
            <MetricCard
              label="Bounce rate"
              value={totals ? pct(totals.bounceRate) : '—'}
              hint={totals ? `${Number(totals.bounced || 0).toLocaleString()} bounced` : ' '}
            />
          </div>
        </section>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Emails</CardTitle>
            <CardDescription>
              Performance by subject line ({rangeLabel.toLowerCase()}). Open and click rates use SendGrid events.
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-2">
            {error ? (
              <div className="text-sm text-destructive py-4">{error}</div>
            ) : (
              <PaginatedRows rows={rows}>
                {(pageRows, footer) => (
                  <div className="overflow-auto rounded-md border border-border">
                    <table className="min-w-[900px] w-full text-sm">
                      <thead className="bg-muted/40">
                        <tr className="text-left text-muted-foreground">
                          <th className="px-4 py-3 font-medium">Email</th>
                          <th className="px-4 py-3 font-medium text-right">Sent</th>
                          <th className="px-4 py-3 font-medium text-right">Opened</th>
                          <th className="px-4 py-3 font-medium text-right">Open rate</th>
                          <th className="px-4 py-3 font-medium text-right">Clicked</th>
                          <th className="px-4 py-3 font-medium text-right">Click rate</th>
                          <th className="px-4 py-3 font-medium text-right">CTR</th>
                          <th className="px-4 py-3 font-medium text-right">Bounced</th>
                          <th className="px-4 py-3 font-medium">Last sent</th>
                        </tr>
                      </thead>
                      <tbody className="bg-card">
                        {rows.length === 0 ? (
                          <tr>
                            <td className="px-4 py-6 text-muted-foreground" colSpan={9}>
                              {loading
                                ? 'Loading…'
                                : 'No emails sent in this period. Opens and clicks appear after SendGrid reports them.'}
                            </td>
                          </tr>
                        ) : (
                          pageRows.map((row) => (
                            <tr key={row.subject} className="border-t border-border">
                              <td className="px-4 py-3 font-medium text-foreground max-w-[280px]">
                                <span className="line-clamp-2">{row.subject || 'No subject'}</span>
                              </td>
                              <td className="px-4 py-3 text-right tabular-nums text-foreground">
                                {Number(row.sent) || 0}
                              </td>
                              <td className="px-4 py-3 text-right tabular-nums text-foreground">
                                {Number(row.opened) || 0}
                              </td>
                              <td className="px-4 py-3 text-right tabular-nums text-foreground">
                                {pct(row.openRate)}
                              </td>
                              <td className="px-4 py-3 text-right tabular-nums text-foreground">
                                {Number(row.clicked) || 0}
                              </td>
                              <td className="px-4 py-3 text-right tabular-nums text-foreground">
                                {pct(row.clickRate)}
                              </td>
                              <td className="px-4 py-3 text-right tabular-nums text-foreground">
                                {pct(row.clickThroughRate)}
                              </td>
                              <td className="px-4 py-3 text-right tabular-nums text-foreground">
                                {Number(row.bounced) || 0}
                              </td>
                              <td className="px-4 py-3 text-muted-foreground whitespace-nowrap">
                                {row.lastSentAt ? formatDate(row.lastSentAt) : '—'}
                              </td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                    {footer}
                  </div>
                )}
              </PaginatedRows>
            )}
          </CardContent>
        </Card>
      </div>
    </TabsContent>
  )
}
