'use client'

import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import api from '@/lib/api'
import { reviewCaseListPath } from './reviewCaseQuery'

const CASE_STATUSES = [
  { status: 'pending', label: 'Pending', description: 'Waiting for staff review' },
  { status: 'passed', label: 'Passed', description: 'Both automated checks passed' },
  { status: 'approved', label: 'Approved', description: 'Staff approved the correction' },
  { status: 'rejected', label: 'Rejected', description: 'Staff rejected the correction' },
]

function DateRangeForm({ range, onApply }) {
  const [from, setFrom] = useState(range.from || '')
  const [to, setTo] = useState(range.to || '')

  useEffect(() => {
    setFrom(range.from || '')
    setTo(range.to || '')
  }, [range])

  const submit = (event) => {
    event.preventDefault()
    if (from && to && from > to) return
    onApply({ from, to })
  }

  return (
    <form onSubmit={submit} className="flex flex-wrap items-end gap-3 rounded-xl border border-border bg-card p-4">
      <div className="space-y-1">
        <label htmlFor="review-from-date" className="block text-sm font-medium">Start date</label>
        <Input id="review-from-date" type="date" value={from} max={to || undefined} onChange={(event) => setFrom(event.target.value)} />
      </div>
      <div className="space-y-1">
        <label htmlFor="review-to-date" className="block text-sm font-medium">End date</label>
        <Input id="review-to-date" type="date" value={to} min={from || undefined} onChange={(event) => setTo(event.target.value)} />
      </div>
      <Button type="submit">Apply dates</Button>
      <Button type="button" variant="outline" onClick={() => { setFrom(''); setTo(''); onApply({ from: '', to: '' }) }}>Clear</Button>
      <p className="w-full text-xs text-muted-foreground">Dates include the full day in your browser's time zone.</p>
    </form>
  )
}

export default function ReviewCaseDashboard({ canRead, selectedStatus, onSelect, range, onApply, reload, apiClient = api }) {
  const [counts, setCounts] = useState(null)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!canRead) return
    let active = true
    const load = async () => {
      setError('')
      setCounts(null)
      const results = await Promise.all(CASE_STATUSES.map(({ status }) =>
        apiClient.get(reviewCaseListPath({ status, page: 1, limit: 1, range }))))
      if (!active) return
      const failed = results.find((result) => !result.success)
      if (failed) {
        setError(failed.error || 'Could not load review counts.')
        setCounts(null)
        return
      }
      if ((range.from || range.to) && results.some((result) => result.data?.dateRangeApplied !== true)) {
        setError('Date filtering needs the updated review backend. Counts are hidden until it is available.')
        setCounts(null)
        return
      }
      setCounts(Object.fromEntries(CASE_STATUSES.map(({ status }, index) =>
        [status, Number(results[index].data?.total) || 0])))
    }
    load()
    return () => { active = false }
  }, [apiClient, canRead, range, reload])

  return (
    <section className="space-y-4" aria-label="Reply review dashboard">
      <DateRangeForm range={range} onApply={onApply} />
      {error && <p role="alert" className="text-sm text-destructive">{error}</p>}
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {CASE_STATUSES.map(({ status, label, description }) => (
          <button key={status} type="button" aria-pressed={selectedStatus === status} onClick={() => onSelect(status)}
            className={`rounded-xl border p-4 text-left shadow-sm transition-colors ${selectedStatus === status ? 'border-primary bg-primary/10' : 'border-border bg-card hover:bg-muted/40'}`}>
            <span className="block text-sm font-medium text-muted-foreground">{label}</span>
            <span className="mt-2 block text-3xl font-semibold">{counts?.[status] ?? '—'}</span>
            <span className="mt-1 block text-xs text-muted-foreground">{description}</span>
          </button>
        ))}
      </div>
    </section>
  )
}
