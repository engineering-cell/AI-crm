'use client'

import { useCallback, useEffect, useState } from 'react'
import { ChevronRight, Download } from 'lucide-react'
import api from '@/lib/api'
import { rangeQuery } from '@/lib/hooks/useAnalyticsOverview'
import { formatDate } from '@/lib/utils'
import { money, num } from './chrome'

const LEVELS = [
  { id: 'studio', label: 'Studio', param: 'locationID' },
  { id: 'instructor', label: 'Instructor', param: 'teacherID' },
  { id: 'customer', label: 'Customer', param: 'customerID' },
]

function csvEscape(v) {
  const t = v === null || v === undefined ? '' : String(v)
  return /[",\n\r]/.test(t) ? `"${t.replace(/"/g, '""')}"` : t
}

/**
 * The spec's one drill-down, the same everywhere: Organization → Studio →
 * Instructor → Customer, then the individual records. Each click narrows the
 * previous level; the breadcrumb walks back. Exports the level on screen to CSV.
 */
export default function DrillView({ kind, range }) {
  // path: the choices made so far, e.g. [{ param: 'locationID', id, name }, ...]
  const [path, setPath] = useState([])
  const [state, setState] = useState({ loading: true, error: null, data: null })
  const isSales = kind === 'sales'
  const fmt = (v) => (isSales ? money(v) : num(v))

  const load = useCallback(async () => {
    setState((s) => ({ ...s, loading: true, error: null }))
    try {
      const qs = new URLSearchParams(rangeQuery(range))
      qs.set('metric', 'drill')
      qs.set('kind', kind)
      qs.set('limit', '100')
      for (const p of path) qs.set(p.param, p.id)
      const res = await api.get(`/api/dashboard/owner-overview/details?${qs.toString()}`)
      if (!res.success) throw new Error(res.error || 'Request failed')
      setState({ loading: false, error: null, data: res.data })
    } catch (err) {
      setState({ loading: false, error: err, data: null })
    }
  }, [kind, range, path])

  useEffect(() => {
    load()
  }, [load])

  const data = state.data
  const level = data?.level
  const nextParam = LEVELS.find((l) => l.id === level)?.param

  function exportCsv() {
    if (!data) return
    const head = level === 'lines' ? ['Date', 'Detail', isSales ? 'Net sales' : 'Lessons'] : [LEVELS.find((l) => l.id === level)?.label, 'Records', isSales ? 'Net sales' : 'Lessons']
    const lines = [head.map(csvEscape).join(',')]
    for (const r of data.rows) {
      lines.push((level === 'lines' ? [formatDate(r.date) || '', r.label, r.value] : [r.name, r.count, r.value]).map(csvEscape).join(','))
    }
    const blob = new Blob([`﻿${lines.join('\n')}`], { type: 'text/csv;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${isSales ? 'net-sales' : 'lessons'}-${path.map((p) => p.name).join('-') || 'organization'}.csv`.toLowerCase().replace(/\s+/g, '-')
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="mt-4">
      <div className="flex flex-wrap items-center gap-1 text-[13px]">
        <button type="button" onClick={() => setPath([])} className={`font-semibold ${path.length ? 'text-[var(--studio-primary)] hover:underline' : 'text-foreground'}`}>
          Organization
        </button>
        {path.map((p, i) => (
          <span key={p.param} className="flex items-center gap-1">
            <ChevronRight className="h-3.5 w-3.5 text-muted-foreground" aria-hidden />
            <button
              type="button"
              onClick={() => setPath(path.slice(0, i + 1))}
              className={`font-semibold ${i < path.length - 1 ? 'text-[var(--studio-primary)] hover:underline' : 'text-foreground'}`}
            >
              {p.name}
            </button>
          </span>
        ))}
        <button
          type="button"
          onClick={exportCsv}
          disabled={!data || data.rows.length === 0}
          className="ml-auto inline-flex items-center gap-1.5 rounded-lg border border-border px-3 py-1.5 text-[12.5px] font-semibold text-foreground hover:bg-muted/60 disabled:opacity-50"
        >
          <Download className="h-3.5 w-3.5" />
          Export CSV
        </button>
      </div>

      <div className="mt-3 overflow-x-auto rounded-2xl border border-border bg-card shadow-sm">
        {state.loading && !data ? (
          <div className="h-40 animate-pulse bg-muted/30" />
        ) : state.error ? (
          <p className="py-12 text-center text-sm text-muted-foreground">
            Couldn&apos;t load this card ·{' '}
            <button type="button" onClick={load} className="font-semibold text-[var(--studio-primary)] underline">
              Retry
            </button>
          </p>
        ) : !data || data.rows.length === 0 ? (
          <p className="py-12 text-center text-sm text-muted-foreground">No data for this range</p>
        ) : (
          <table className="w-full border-collapse tabular-nums">
            <thead>
              <tr className="bg-muted/60 text-left text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
                {level === 'lines' ? (
                  <>
                    <th className="px-4 py-2.5">Date</th>
                    <th className="px-4 py-2.5">Detail</th>
                    <th className="px-4 py-2.5 text-right">{isSales ? 'Net sales' : 'Lessons'}</th>
                  </>
                ) : (
                  <>
                    <th className="px-4 py-2.5">{LEVELS.find((l) => l.id === level)?.label}</th>
                    <th className="px-4 py-2.5 text-right">Records</th>
                    <th className="px-4 py-2.5 text-right">{isSales ? 'Net sales' : 'Lessons taught'}</th>
                  </>
                )}
              </tr>
            </thead>
            <tbody>
              {data.rows.map((r, i) =>
                level === 'lines' ? (
                  <tr key={i} className="border-t border-border/60 text-[13.5px]">
                    <td className="px-4 py-2.5">{formatDate(r.date) || '—'}</td>
                    <td className="px-4 py-2.5">{r.label}</td>
                    <td className="px-4 py-2.5 text-right font-semibold">{fmt(r.value)}</td>
                  </tr>
                ) : (
                  <tr key={r.key || `none-${i}`} className="border-t border-border/60 text-[13.5px]">
                    <td className="px-4 py-2.5">
                      {r.key ? (
                        <button type="button" onClick={() => setPath([...path, { param: nextParam, id: r.key, name: r.name }])} className="font-semibold text-[var(--studio-primary)] hover:underline">
                          {r.name}
                        </button>
                      ) : (
                        <span className="text-muted-foreground">{r.name}</span>
                      )}
                    </td>
                    <td className="px-4 py-2.5 text-right text-muted-foreground">{num(r.count)}</td>
                    <td className="px-4 py-2.5 text-right font-semibold">{fmt(r.value)}</td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}
