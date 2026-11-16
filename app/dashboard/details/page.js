'use client'

import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { ArrowLeft, ChevronLeft, ChevronRight, Download } from 'lucide-react'
import MainLayout from '@/components/layout/MainLayout'
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table'
import { ReportFilterPanel } from '@/components/reports/ReportFilterPanel'
import { ReportActiveFiltersBar } from '@/components/reports/ReportActiveFiltersBar'
import { ReportSearchInput } from '@/components/reports/ReportSearchInput'
import { ReportSavedViews } from '@/components/reports/ReportSavedViews'
import { useDashboardDetailsRequest } from '@/lib/dashboardDetailsStore'
import { useDashboardOverviewDetails, useOwnerOverviewDetails } from '@/lib/hooks/useAnalyticsOverview'
import { useReportFilterOptions } from '@/lib/hooks/useReportFilterOptions'
import { useReportPreferences } from '@/lib/hooks/useReportPreferences'
import { buildLeadQueryParams } from '@/lib/lead-filter-fields'
import { dateBoundsFromPresetDays } from '@/lib/reports/reportFilters'
import { countActiveReportFilters, buildReportQueryParams } from '@/lib/reports/buildReportQueryParams'
import { getActiveReportFilterChips, removeReportFilterChip } from '@/lib/reports/reportActiveFilterChips'
import { formatReportCellValue } from '@/lib/reports/formatReportCell'
import api from '@/lib/api'
import DrillView from '@/components/owner-dashboard/full/DrillView'
import { rangeQuery } from '@/lib/hooks/useAnalyticsOverview'

const PAGE_SIZE = 25

const LEAD_SOURCE_TO_UPLOAD_TYPE = {
  Manual: 'manual',
  'Bulk Upload': 'bulk_upload',
  'Website Form': 'form_submission',
  'Incoming SMS': 'incoming_sms',
  'Incoming Email': 'incoming_email',
  WhatsApp: 'incoming_whatsapp',
  'Incoming Call': 'incoming_call',
}

const EMPTY_FILTERS = {
  dateFrom: '',
  dateTo: '',
  datePreset: '',
  studioId: '',
  teacherId: '',
  programId: '',
  leadSource: '',
  groupBy: '',
  comparison: '',
  activeWindowDays: '',
  status: '',
  conditions: [],
  conditionLogic: 'AND',
  search: '',
}

function formatCell(row, column, timeZone) {
  if (column.format) {
    try {
      return column.format(row[column.key], row)
    } catch {
      // fall through
    }
  }
  return formatReportCellValue(row[column.key], column, timeZone)
}

function csvEscape(v) {
  const t = v === null || v === undefined ? '' : String(v)
  return /[",\n\r]/.test(t) ? `"${t.replace(/"/g, '""')}"` : t
}

/** Spec: every drill-down table exports to CSV. Pages through the whole result set, not just the visible page. */
async function exportRowsToCsv({ title, columns, timeZone, fetchAll }) {
  const rows = await fetchAll()
  const lines = [columns.map((c) => csvEscape(c.label)).join(',')]
  for (const row of rows) {
    lines.push(
      columns
        .map((c) => {
          const cell = formatCell(row, c, timeZone)
          return csvEscape(typeof cell === 'string' || typeof cell === 'number' ? cell : row[c.key])
        })
        .join(',')
    )
  }
  const blob = new Blob([`\uFEFF${lines.join('\n')}`], { type: 'text/csv;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `${title.replace(/[^a-z0-9]+/gi, '-').toLowerCase()}.csv`
  a.click()
  URL.revokeObjectURL(url)
}

function isCustomRange(value) {
  return Boolean(value && typeof value === 'object' && value.from && value.to)
}

/** Resolve filter-bar / widget range into absolute YYYY-MM-DD bounds. */
function absoluteRangeBounds(range, timeZone) {
  if (isCustomRange(range)) {
    return { from: range.from, to: range.to }
  }
  // 0 is "Today": from and to are both today's date in the studio's timezone.
  const days = typeof range === 'number' && range >= 0 ? range : 30
  const bounds = dateBoundsFromPresetDays(days, timeZone)
  return { from: bounds.dateFrom, to: bounds.dateTo }
}

/** Range value passed to overview detail hooks (days number or { from, to }). */
function resolveDetailsRange(filters, requestRange) {
  if (filters.datePreset) {
    const days = Number(filters.datePreset)
    if (!Number.isNaN(days) && days > 0) return days
  }
  if (filters.dateFrom && filters.dateTo) {
    return { from: filters.dateFrom, to: filters.dateTo }
  }
  if (typeof requestRange === 'number' && requestRange >= 0) return requestRange
  if (requestRange === 'mtd' || requestRange === 'qtd' || requestRange === 'ytd') return requestRange
  if (isCustomRange(requestRange)) return requestRange
  return 30
}

function filtersFromRequest(request) {
  if (!request) return { ...EMPTY_FILTERS }
  const params = request.params || {}
  const next = {
    ...EMPTY_FILTERS,
    studioId: params.locationID || params.studioId || '',
    teacherId: params.teacherID || params.teacherId || '',
    programId: params.programId || '',
    leadSource: params.leadSource || '',
  }

  // allTime widgets stay unscoped until the user picks a date preset/custom range.
  const allTime = params.allTime === 'true' || params.allTime === true
  if (allTime) return next

  // Keep the filter bar's active preset in sync with the widget that opened details.
  if (typeof request.rangeDays === 'number' && request.rangeDays > 0) {
    next.datePreset = String(request.rangeDays)
  } else if (isCustomRange(request.rangeDays)) {
    next.dateFrom = request.rangeDays.from
    next.dateTo = request.rangeDays.to
    next.datePreset = ''
  }

  return next
}

/**
 * Generic full-page replacement for the old widget "Details" modal. The
 * triggering widget stashes its request (title/metric/columns/etc, including
 * non-serializable `format` functions) in lib/dashboardDetailsStore before
 * navigating here, since this is a client-side route change within the same
 * app shell rather than a reload.
 */
export default function DashboardDetailsPage() {
  const request = useDashboardDetailsRequest()
  const router = useRouter()
  const [page, setPage] = useState(1)
  const [filters, setFilters] = useState(() => filtersFromRequest(request))
  const [filterPanelOpen, setFilterPanelOpen] = useState(false)
  const { studios, teachers, programs, timezone: filterOptionsTimezone } = useReportFilterOptions({ enabled: Boolean(request) })
  const { savedViews, saveView, deleteView } = useReportPreferences()

  const reportTimezone = useMemo(() => {
    if (filters.studioId) {
      const studio = studios.find((s) => s.id === filters.studioId)
      if (studio?.timezone) return studio.timezone
    }
    return filterOptionsTimezone || 'America/New_York'
  }, [filters.studioId, studios, filterOptionsTimezone])

  const savedViewsSlug = useMemo(() => {
    if (!request) return 'dashboard-details'
    return `dashboard-details:${request.source || 'dashboard'}:${request.metric || 'default'}`
  }, [request])

  useEffect(() => {
    setPage(1)
    setFilters(filtersFromRequest(request))
  }, [request])

  // Spec: Escape closes the drill-down and returns to the dashboard.
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape' && !filterPanelOpen) router.push(request?.backHref || '/dashboard')
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [router, request?.backHref, filterPanelOpen])

  const isDashboard = request?.source === 'dashboard'
  const isOwner = request?.source === 'owner'
  const isLeads = request?.source === 'leads'

  const range = useMemo(
    () => resolveDetailsRange(filters, request?.rangeDays),
    [filters.datePreset, filters.dateFrom, filters.dateTo, request?.rangeDays]
  )

  const openedAllTime = request?.params?.allTime === 'true' || request?.params?.allTime === true
  const defaultDateRangeDays = openedAllTime
    ? null
    : typeof request?.rangeDays === 'number'
      ? request.rangeDays
      : 30

  const detailParams = useMemo(() => {
    const base = { ...(request?.params || {}) }
    // Date range is owned by the filter bar — never let stashed widget params override it.
    delete base.from
    delete base.to
    delete base.dateFrom
    delete base.dateTo

    // Once the user picks a date range, honor it even for widgets opened with allTime.
    if (filters.datePreset || (filters.dateFrom && filters.dateTo)) {
      delete base.allTime
    }

    if (filters.studioId) {
      base.locationID = filters.studioId
      base.studioId = filters.studioId
    } else {
      delete base.locationID
      delete base.studioId
    }
    if (filters.teacherId) {
      base.teacherID = filters.teacherId
      base.teacherId = filters.teacherId
    } else {
      delete base.teacherID
      delete base.teacherId
    }
    if (filters.programId) {
      base.programId = filters.programId
    } else {
      delete base.programId
    }
    if (filters.leadSource) {
      base.leadSource = filters.leadSource
      base.uploadType = LEAD_SOURCE_TO_UPLOAD_TYPE[filters.leadSource] || filters.leadSource
    } else {
      delete base.leadSource
      delete base.uploadType
    }
    const conditionParams = buildReportQueryParams({
      conditions: filters.conditions,
      conditionLogic: filters.conditionLogic,
      search: filters.search,
    })
    if (conditionParams.has('conditions')) {
      base.conditions = conditionParams.get('conditions')
      base.conditionLogic = conditionParams.get('conditionLogic')
    } else {
      delete base.conditions
      delete base.conditionLogic
    }
    if (conditionParams.has('search')) base.search = conditionParams.get('search')
    else delete base.search
    return base
  }, [
    request?.params,
    filters.datePreset,
    filters.dateFrom,
    filters.dateTo,
    filters.studioId,
    filters.teacherId,
    filters.programId,
    filters.leadSource,
    filters.conditions,
    filters.conditionLogic,
    filters.search,
  ])

  const dashboardResult = useDashboardOverviewDetails({
    metric: request?.metric,
    range,
    page,
    limit: PAGE_SIZE,
    params: detailParams,
    enabled: isDashboard,
  })
  const ownerResult = useOwnerOverviewDetails({
    metric: request?.metric,
    range,
    page,
    limit: PAGE_SIZE,
    params: detailParams,
    enabled: isOwner,
  })

  const [leadsData, setLeadsData] = useState(null)
  const [leadsLoading, setLeadsLoading] = useState(false)

  useEffect(() => {
    if (!isLeads) return
    let cancelled = false
    setLeadsLoading(true)
    const { from, to } = absoluteRangeBounds(range, reportTimezone)
    const conditions = [
      { field: 'createdFrom', operator: 'eq', value: from },
      { field: 'createdTo', operator: 'eq', value: to },
    ]
    if (filters.studioId) {
      conditions.push({ field: 'locationID', operator: 'eq', value: filters.studioId })
    }
    if (filters.leadSource) {
      conditions.push({
        field: 'uploadType',
        operator: 'eq',
        value: LEAD_SOURCE_TO_UPLOAD_TYPE[filters.leadSource] || filters.leadSource,
      })
    }
    const params = buildLeadQueryParams({
      page,
      limit: PAGE_SIZE,
      filters: {
        conditions,
        conditionLogic: 'AND',
      },
    })

    api.get(`/api/lead?${params.toString()}`).then((res) => {
      if (cancelled) return
      const pagination = res.pagination ?? res.data?.pagination
      setLeadsData({ rows: res.success ? res.data || [] : [], total: res.success ? pagination?.total ?? 0 : 0 })
      setLeadsLoading(false)
    })

    return () => {
      cancelled = true
    }
  }, [isLeads, page, range, filters.studioId, filters.leadSource, reportTimezone])

  const [exporting, setExporting] = useState(false)
  async function handleExport() {
    setExporting(true)
    try {
      const endpoint = isOwner ? '/api/dashboard/owner-overview/details' : '/api/dashboard/overview/details'
      await exportRowsToCsv({
        title: request.title,
        columns: request.columns,
        timeZone: reportTimezone,
        fetchAll: async () => {
          if (isLeads) return leadsData?.rows || []
          const all = []
          for (let p = 1; p <= 40; p += 1) {
            const qs = new URLSearchParams(rangeQuery(range))
            qs.set('metric', request.metric)
            qs.set('page', String(p))
            qs.set('limit', '500')
            for (const [k, v] of Object.entries(detailParams || {})) {
              if (v !== undefined && v !== null && v !== '') qs.set(k, v)
            }
            const res = await api.get(`${endpoint}?${qs.toString()}`)
            const batch = res?.data?.rows || []
            all.push(...batch)
            if (all.length >= (res?.data?.total || 0) || batch.length === 0) break
          }
          return all
        },
      })
    } finally {
      setExporting(false)
    }
  }

  function handleFiltersChange(nextFilters) {
    setPage(1)
    setFilters(nextFilters)
  }

  if (!request) {
    return (
      <MainLayout title="Details" subtitle="Full details">
        <div className="rounded-2xl border border-dashed border-border py-16 text-center">
          <p className="text-sm font-medium text-foreground">No details to show</p>
          <p className="mt-1 text-sm text-muted-foreground">Open this page from a widget&apos;s Details button.</p>
          <Link
            href="/dashboard"
            className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Dashboard
          </Link>
        </div>
      </MainLayout>
    )
  }

  const { rows, total, isLoading } = isDashboard
    ? { rows: dashboardResult.data?.rows || [], total: dashboardResult.data?.total || 0, isLoading: dashboardResult.isLoading }
    : isOwner
      ? { rows: ownerResult.data?.rows || [], total: ownerResult.data?.total || 0, isLoading: ownerResult.isLoading }
      : { rows: leadsData?.rows || [], total: leadsData?.total || 0, isLoading: leadsLoading }

  const totalPages = Math.max(Math.ceil(total / PAGE_SIZE), 1)
  const activeFilterCount = countActiveReportFilters(filters)
  const activeFilterChips = getActiveReportFilterChips(filters, {
    studios,
    teachers,
    programs,
    catalogKey: request?.metric,
    columns: request?.columns || [],
    includeSearch: false,
  })

  return (
    <MainLayout title={request.title} subtitle="Full details">
      {/* Overlay: Escape or a click outside the panel closes it (spec). */}
      <div
        className="fixed inset-0 z-40 overflow-y-auto bg-black/40 p-3 sm:p-8"
        onMouseDown={(e) => {
          if (e.target === e.currentTarget) router.push(request.backHref || '/dashboard')
        }}
      >
        <div className="mx-auto w-full max-w-6xl rounded-2xl bg-background p-4 shadow-2xl sm:p-6" role="dialog" aria-label={request.title}>

      <Link
        href={request.backHref || '/dashboard'}
        className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Dashboard
      </Link>
      {request.drill ? (
        <DrillView kind={request.drill} range={range} />
      ) : (
      <>

      <div className="mt-4 flex flex-wrap items-center gap-2">
        <ReportSearchInput
          value={filters.search || ''}
          onChange={(search) => handleFiltersChange({ ...filters, search })}
        />
        <ReportActiveFiltersBar
          activeCount={activeFilterCount}
          onOpenFilters={() => setFilterPanelOpen(true)}
          chips={activeFilterChips}
          onRemoveChip={(chip) => handleFiltersChange(removeReportFilterChip(filters, chip))}
          onReset={() => handleFiltersChange(filtersFromRequest(request))}
        />
      </div>

      <ReportFilterPanel
        open={filterPanelOpen}
        appliedFilters={filters}
        onClose={() => setFilterPanelOpen(false)}
        onApply={(next) => {
          handleFiltersChange(next)
          setFilterPanelOpen(false)
        }}
        studios={studios}
        teachers={teachers}
        programs={programs}
        catalogKey={request?.metric}
        columns={request?.columns || []}
        defaultDateRangeDays={defaultDateRangeDays}
        timeZone={reportTimezone}
        savedViewsSlot={
          <ReportSavedViews
            compact
            reportSlug={savedViewsSlug}
            savedViews={savedViews}
            currentFilters={filters}
            onApply={(next) => {
              handleFiltersChange(next)
              setFilterPanelOpen(false)
            }}
            onResetFilters={() => handleFiltersChange(filtersFromRequest(request))}
            onSave={(view) => saveView(view).catch(() => {})}
            onDelete={(id) => deleteView(id).catch(() => {})}
          />
        }
      />

      <div className="mt-3 flex justify-end">
        <button
          type="button"
          onClick={handleExport}
          disabled={exporting || rows.length === 0}
          className="inline-flex items-center gap-1.5 rounded-lg border border-border px-3 py-1.5 text-[12.5px] font-semibold text-foreground transition-colors hover:bg-muted/60 disabled:opacity-50"
        >
          <Download className="h-3.5 w-3.5" />
          {exporting ? 'Exporting…' : 'Export CSV'}
        </button>
      </div>

      <div className="mt-2 overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
        {isLoading && rows.length === 0 ? (
          <div className="h-40 animate-pulse bg-muted/30" />
        ) : rows.length === 0 ? (
          <p className="py-12 text-center text-sm text-muted-foreground">No records for this selection.</p>
        ) : (
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                {request.columns.map((col) => (
                  <TableHead
                    key={col.key}
                    className="whitespace-nowrap bg-muted/60 text-[11px] font-semibold uppercase tracking-wide text-muted-foreground"
                  >
                    {col.label}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {rows.map((row, i) => (
                <TableRow key={row._id || row.id || i} className="even:bg-muted/20">
                  {request.columns.map((col) => (
                    <TableCell key={col.key} className="whitespace-nowrap text-sm">
                      {formatCell(row, col, reportTimezone)}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </div>

      {total > PAGE_SIZE && (
        <div className="mt-4 flex items-center justify-between text-sm text-muted-foreground">
          <span>
            Page {page} of {totalPages} · {total.toLocaleString()} total
          </span>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setPage((p) => Math.max(p - 1, 1))}
              disabled={page <= 1}
              className="rounded-lg border border-border p-1.5 disabled:opacity-40"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
              disabled={page >= totalPages}
              className="rounded-lg border border-border p-1.5 disabled:opacity-40"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}
      </>
      )}
        </div>
      </div>
    </MainLayout>
  )
}
