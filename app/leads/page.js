'use client'

import { useState, useEffect, useCallback, useMemo, useRef, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { readPersistedListState, usePersistListState } from '@/lib/hooks/useListStatePersistence'
import { Plus, Phone, Mail, MessageSquare, MoreHorizontal, UserCheck } from 'lucide-react'
import MainLayout from '@/components/layout/MainLayout'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu'
import LeadsDialog from './components/LeadsDialog'
import OthersContactsPanel from './components/OthersContactsPanel'
import BulkCreateLeadsDialog from './components/BulkCreateLeadsDialog'
import ImportExportCsv from '@/components/shared/ImportExportCsv'
import LeadsQuickBar from '@/components/leads/LeadsQuickBar'
import LeadsFilterPanel from '@/components/leads/LeadsFilterPanel'
import { getLeadAttemptCount } from '@/components/leads/LeadEngagementHistory'
import LeadCommunicationDialog from '@/components/leads/LeadCommunicationDialog'
import SavedListsPanel from '@/components/shared/SavedListsPanel'
import DynamicListFormDialog from '@/components/dynamic-list/DynamicListFormDialog'
import DynamicListMemberSendDialog from '@/components/dynamic-list/DynamicListMemberSendDialog'
import BulkSendActionBar from '@/components/shared/BulkSendActionBar'
import api from '@/lib/api'
import { toast } from '@/components/ui/toast'
import GlobalLoader from '@/components/shared/GlobalLoader'
import { RowsPerPage } from '@/components/shared/RowsPerPage'
import LoadingSpinner from '@/components/shared/LoadingSpinner'
import { buildLeadQueryParams, filtersToConditionsForForm } from '@/lib/lead-filter-fields'
import { formatReasonLabel } from '@/lib/dynamic-list-normalize'
import {
  EMPTY_LEAD_FILTERS,
  hasActiveLeadFilters,
  sanitizeLeadFilters,
} from '@/lib/lead-page-filters'
import { extractFormTemplatesList, extractLeadReasonsList } from '@/lib/workflow-normalize'
import { normalizeConditionsForForm } from '@/lib/dynamic-list-normalize'
import { formatLeadStageLabel, getLeadStageColor, useLeadStages } from '@/lib/lead-stages'
import { getCurrentUser } from '@/lib/auth'
import { hasPermission } from '@/lib/permissions'
import { isViewingAllBranches, getBranchQueryParam } from '@/lib/branch-filter'
import StatusColorBadge from '@/components/shared/StatusColorBadge'
import { cn, nameWithMembers, formatDate, formatDateTime } from '@/lib/utils'

const LEAD_CSV_FIELDS = [
  { key: 'name', header: 'name', sample: 'John Doe' },
  { key: 'email', header: 'email', sample: 'john.doe@example.com' },
  { key: 'phoneNumber', header: 'phonenumber', sample: '+1234567890' },
  { key: 'status', header: 'status', sample: 'new' },
  { key: 'reason', header: 'reason', sample: '' },
  { key: 'dateOfBirth', header: 'dateofbirth', sample: '1990-01-01' },
  { key: 'gender', header: 'gender', sample: 'male' },
  { key: 'street', header: 'street', sample: '123 Main St' },
  { key: 'city', header: 'city', sample: 'New York' },
  { key: 'state', header: 'state', sample: 'NY' },
  { key: 'zipCode', header: 'zipcode', sample: '10001' },
  { key: 'country', header: 'country', sample: 'USA' },
  { key: 'createdAt', header: 'createdat', sample: '2026-01-01' },
]

const DEFAULT_ROWS_PER_PAGE = 10

// Remembers filters/page/pageSize across back/forward navigation.
const LEADS_LIST_STATE_KEY = 'leads-list-state'

function studioLabelForLead(lead, locations = []) {
  const raw = lead?.locationID
  const ids = Array.isArray(raw) ? raw : raw ? [raw] : []
  const names = []
  for (const item of ids) {
    if (item && typeof item === 'object' && item.name) {
      names.push(String(item.name).trim())
      continue
    }
    const id = String(item?._id ?? item ?? '')
    const match = locations.find((loc) => String(loc._id) === id)
    if (match?.name) names.push(String(match.name).trim())
  }
  const unique = [...new Set(names.filter(Boolean))]
  if (unique.length) return unique.join(', ')
  const text = String(lead?.location || '').trim()
  if (text && !/^[a-f0-9]{24}$/i.test(text)) return text
  return ''
}

function toRecipientLead(lead) {
  if (!lead?._id) return null
  return {
    _id: lead._id,
    name: lead.name,
    email: lead.email,
    phoneNumber: lead.phoneNumber,
    locationID: lead.locationID,
    type: 'Lead',
  }
}

function LeadsPageInner() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const viewParam = searchParams.get('view')
  const view = viewParam === 'lists' ? 'lists' : viewParam === 'others' ? 'others' : 'all'
  const canWriteLeads = hasPermission('leads', 'manage', 'write')
  const canDeleteLeads = hasPermission('leads', 'manage', 'delete')
  const { stages: stageOptions } = useLeadStages()
  const [selectedIds, setSelectedIds] = useState([])
  const [selectedLeadsData, setSelectedLeadsData] = useState([])
  const [selectingAll, setSelectingAll] = useState(false)
  const [sendDialogOpen, setSendDialogOpen] = useState(false)
  const [sendChannel, setSendChannel] = useState('SMS')
  const [persisted] = useState(() => readPersistedListState(LEADS_LIST_STATE_KEY) || {})
  const [currentPage, setCurrentPage] = useState(persisted.currentPage || 1)
  const [pageSize, setPageSize] = useState(persisted.pageSize || DEFAULT_ROWS_PER_PAGE)
  const [leads, setLeads] = useState([])
  const [totalCount, setTotalCount] = useState(0)
  const [loading, setLoading] = useState(true)
  const [initialLoad, setInitialLoad] = useState(true)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [dialogInitialLeadId, setDialogInitialLeadId] = useState(null)
  const [dialogViewOnly, setDialogViewOnly] = useState(false)
  const [bulkDialogOpen, setBulkDialogOpen] = useState(false)
  const [filters, setFilters] = useState(persisted.filters || EMPTY_LEAD_FILTERS)
  const [filterPanelOpen, setFilterPanelOpen] = useState(false)
  const [communication, setCommunication] = useState(null) // { lead, channel }
  const [listDialogOpen, setListDialogOpen] = useState(false)
  const [prefillList, setPrefillList] = useState(null)
  const [savedListsRefreshKey, setSavedListsRefreshKey] = useState(0)
  const [savedListsCount, setSavedListsCount] = useState(null)
  const [leadReasons, setLeadReasons] = useState([])
  const [locations, setLocations] = useState([])
  const [forms, setForms] = useState([])
  const [loadingOptions, setLoadingOptions] = useState(false)
  const [convertingId, setConvertingId] = useState(null)
  const [bulkDeleting, setBulkDeleting] = useState(false)
  const latestRequestRef = useRef(0)

  const setView = (nextView) => {
    const params = new URLSearchParams(searchParams.toString())
    if (nextView === 'lists') params.set('view', 'lists')
    else if (nextView === 'others') params.set('view', 'others')
    else params.delete('view')
    const qs = params.toString()
    router.replace(`/leads${qs ? `?${qs}` : ''}`, { scroll: false })
  }

  useEffect(() => {
    let cancelled = false
    const loadCount = async () => {
      const params = new URLSearchParams({
        page: '1',
        limit: '1',
        entityType: 'lead',
        status: 'active',
      })
      const res = await api.get(`/api/dynamic-list?${params.toString()}`)
      if (cancelled) return
      if (res?.success) {
        const totalLists = Number(res?.data?.total ?? res?.pagination?.total ?? 0)
        setSavedListsCount(Number.isFinite(totalLists) ? totalLists : 0)
      }
    }
    loadCount()
    return () => {
      cancelled = true
    }
  }, [savedListsRefreshKey])

  const totalPages = Math.max(1, Math.ceil((totalCount || 0) / pageSize))
  const pageLeadIds = useMemo(() => leads.map((l) => l._id).filter(Boolean), [leads])
  const allOnPageSelected =
    pageLeadIds.length > 0 && pageLeadIds.every((id) => selectedIds.includes(id))
  const selectedLeads = selectedLeadsData

  const clearSelection = () => {
    setSelectedIds([])
    setSelectedLeadsData([])
  }

  const loadLeads = useCallback(async (page, nextFilters, limit) => {
    // Searching fires a new request per change; ignore any response that is no
    // longer the latest so a slow early request can't overwrite newer results.
    const requestId = ++latestRequestRef.current
    const isStale = () => requestId !== latestRequestRef.current

    setLoading(true)
    try {
      const sanitized = sanitizeLeadFilters(nextFilters)
      const params = buildLeadQueryParams({
        page,
        limit,
        filters: sanitized,
      })

      const result = await api.get(`/api/lead?${params.toString()}`)
      if (isStale()) return

      if (result.success) {
        const data = Array.isArray(result.data) ? result.data : result.data?.leads || []
        const pagination = result.pagination ?? result.data?.pagination
        const total = pagination?.total ?? data.length
        const nextTotalPages = Math.max(1, Math.ceil((total || 0) / limit))
        if (page > nextTotalPages) {
          setCurrentPage(nextTotalPages)
          return
        }

        setLeads(data)
        setTotalCount(total)
      } else {
        toast.error('Failed to load leads', { description: result.error })
      }
    } catch (e) {
      if (isStale()) return
      console.error(e)
      toast.error('Error', { description: 'Unable to load leads' })
    } finally {
      if (!isStale()) {
        setLoading(false)
        setInitialLoad(false)
      }
    }
  }, [])

  const loadFilterOptions = useCallback(async () => {
    setLoadingOptions(true)
    const [reasonsRes, locationsRes, formsRes] = await Promise.all([
      api.get('/api/lead-reasons'),
      api.get('/api/location?limit=200'),
      api.get('/api/formBuilder?page=1&limit=200'),
    ])
    if (reasonsRes?.success) setLeadReasons(extractLeadReasonsList(reasonsRes))
    if (locationsRes?.success) setLocations(Array.isArray(locationsRes.data) ? locationsRes.data : [])
    if (formsRes?.success) setForms(extractFormTemplatesList(formsRes))
    setLoadingOptions(false)
  }, [])

  useEffect(() => {
    loadFilterOptions()
  }, [loadFilterOptions])

  useEffect(() => {
    loadLeads(currentPage, filters, pageSize)
  }, [currentPage, filters, pageSize, loadLeads])

  usePersistListState(LEADS_LIST_STATE_KEY, { currentPage, pageSize, filters })

  const refreshLeads = useCallback(() => {
    loadLeads(currentPage, filters, pageSize)
  }, [currentPage, filters, pageSize, loadLeads])

  const applyFilters = (next) => {
    clearSelection()
    setFilters(sanitizeLeadFilters(next))
    setCurrentPage(1)
    setFilterPanelOpen(false)
  }

  const openCreateListFromFilters = () => {
    const sanitized = sanitizeLeadFilters(filters)
    const conditions = filtersToConditionsForForm(sanitized)
    if (conditions.length === 0) {
      toast.info('No filters applied', { description: 'Apply at least one filter before saving as a list.' })
      return
    }
    setPrefillList({
      name: '',
      description: '',
      entityType: 'lead',
      conditionLogic: sanitized.conditionLogic || 'AND',
      conditions: normalizeConditionsForForm(conditions),
      groupLogics: sanitized.groupLogics || {},
      status: 'active',
    })
    setListDialogOpen(true)
  }

  if (initialLoad && view !== 'lists' && view !== 'others') {
    return (
      <MainLayout>
        <div className="flex items-center justify-center h-[calc(100vh-8rem)]">
          <GlobalLoader variant="center" size="md" text="Loading leads…" />
        </div>
      </MainLayout>
    )
  }

  const toggleOne = (lead) => {
    if (!lead?._id) return
    const isSelected = selectedIds.includes(lead._id)
    if (isSelected) {
      setSelectedIds((prev) => prev.filter((id) => id !== lead._id))
      setSelectedLeadsData((prev) => prev.filter((item) => item._id !== lead._id))
      return
    }
    const recipient = toRecipientLead(lead)
    setSelectedIds((prev) => [...prev, lead._id])
    setSelectedLeadsData((prev) => [...prev.filter((item) => item._id !== lead._id), recipient])
  }

  const toggleAll = () => {
    if (allOnPageSelected) {
      setSelectedIds((prev) => prev.filter((id) => !pageLeadIds.includes(id)))
      setSelectedLeadsData((prev) => prev.filter((lead) => !pageLeadIds.includes(lead._id)))
      return
    }
    const toAdd = leads.map(toRecipientLead).filter(Boolean).filter((lead) => !selectedIds.includes(lead._id))
    setSelectedIds((prev) => [...new Set([...prev, ...toAdd.map((lead) => lead._id)])])
    setSelectedLeadsData((prev) => {
      const existingIds = new Set(prev.map((lead) => lead._id))
      return [...prev, ...toAdd.filter((lead) => !existingIds.has(lead._id))]
    })
  }

  const selectAllMatching = async () => {
    if (selectingAll || totalCount <= leads.length) return
    setSelectingAll(true)
    try {
      const sanitized = sanitizeLeadFilters(filters)
      const params = buildLeadQueryParams({
        page: 1,
        limit: totalCount,
        filters: sanitized,
      })
      const result = await api.get(`/api/lead?${params.toString()}`)
      if (!result.success) {
        toast.error('Failed to select all', { description: result.error || 'Could not load all leads.' })
        return
      }
      const data = Array.isArray(result.data) ? result.data : result.data?.leads || []
      const allLeads = data.map(toRecipientLead).filter(Boolean)
      setSelectedIds(allLeads.map((lead) => lead._id))
      setSelectedLeadsData(allLeads)
    } catch (e) {
      console.error(e)
      toast.error('Error', { description: 'Could not select all leads.' })
    } finally {
      setSelectingAll(false)
    }
  }

  const openSendDialog = (channel) => {
    if (!selectedLeads.length) return
    setSendChannel(channel)
    setSendDialogOpen(true)
  }

  const openCreateDialog = () => {
    setDialogInitialLeadId(null)
    setDialogViewOnly(false)
    setDialogOpen(true)
  }

  const openEditDialog = (id) => {
    setDialogInitialLeadId(id)
    setDialogViewOnly(false)
    setDialogOpen(true)
  }

  const openViewDialog = (id) => {
    setDialogInitialLeadId(id)
    setDialogViewOnly(true)
    setDialogOpen(true)
  }

  const handleConvertToCustomer = async (lead) => {
    if (lead.convertedCustomerID) {
      toast.info('Already a customer', { description: `${nameWithMembers(lead)} has already been converted to a customer.` })
      return
    }
    const confirmed = window.confirm(`Convert "${nameWithMembers(lead)}" to a customer? This will create a Customer record and mark the lead as Converted.`)
    if (!confirmed) return

    setConvertingId(lead._id)
    try {
      const result = await api.post(`/api/lead/${lead._id}/convert-to-customer`, {})
      if (result.success) {
        toast.success('Converted', { description: `${nameWithMembers(lead)} has been converted to a customer.` })
        refreshLeads()
      } else {
        toast.error('Conversion failed', { description: result.error || 'Unable to convert lead' })
      }
    } catch (e) {
      console.error(e)
      toast.error('Error', { description: 'Unexpected error during conversion' })
    } finally {
      setConvertingId(null)
    }
  }

  const handleExportLeads = async () => {
    const sanitized = sanitizeLeadFilters(filters)
    const params = buildLeadQueryParams({
      page: 1,
      limit: totalCount || 1000,
      filters: sanitized,
    })
    const result = await api.get(`/api/lead?${params.toString()}`)
    if (!result.success) {
      throw new Error(result.error || 'Failed to load leads for export')
    }
    const data = Array.isArray(result.data) ? result.data : result.data?.leads || []
    return data.map((lead) => ({
      name: lead.name || '',
      email: lead.email || '',
      phoneNumber: lead.phoneNumber || '',
      status: lead.stage || '',
      reason: lead.reason || '',
      dateOfBirth: lead.dateOfBirth ? String(lead.dateOfBirth).slice(0, 10) : '',
      gender: lead.gender || '',
      street: lead.address?.street || '',
      city: lead.address?.city || '',
      state: lead.address?.state || '',
      zipCode: lead.address?.zipCode || '',
      country: lead.address?.country || '',
      createdAt: lead.createdAt ? String(lead.createdAt).slice(0, 10) : '',
    }))
  }

  const handleImportLeads = async (rows) => {
    const user = getCurrentUser()
    if (!user?.organisationID) {
      throw new Error('You must be logged in to an organisation to import leads')
    }
    const branchId = getBranchQueryParam()
    const branchLocation = locations.find((l) => String(l._id) === String(branchId))
    const leadsWithOrg = rows.map((row) => {
      const address = {
        street: (row.street || '').trim(),
        city: (row.city || '').trim(),
        state: (row.state || '').trim(),
        zipCode: (row.zipCode || '').trim(),
        country: (row.country || '').trim() || 'USA',
      }
      const hasAddress = address.street || address.city || address.state || address.zipCode
      return {
        name: row.name,
        email: row.email,
        phoneNumber: row.phoneNumber,
        stage: row.status || 'new',
        reason: row.reason || '',
        dateOfBirth: row.dateOfBirth || undefined,
        gender: (row.gender || '').trim().toLowerCase() || undefined,
        address: hasAddress ? address : undefined,
        location: branchLocation?.name || '',
        locationID: branchId ? [branchId] : undefined,
        organisationID: user.organisationID,
      }
    })
    const result = await api.post('/api/lead/bulk', leadsWithOrg)
    if (!result.success) {
      throw new Error(result.error || 'Failed to import leads')
    }
    refreshLeads()
    return { successCount: result.data?.length ?? leadsWithOrg.length, errorCount: 0 }
  }

  const handleDeleteLead = async (id) => {
    const confirmed = window.confirm('Are you sure you want to delete this lead?')
    if (!confirmed) return

    try {
      const result = await api.delete(`/api/lead/${id}`)
      if (result.success) {
        toast.success('Deleted', { description: 'Lead deleted successfully' })
        setSelectedIds((prev) => prev.filter((x) => x !== id))
        setSelectedLeadsData((prev) => prev.filter((item) => item._id !== id))
        refreshLeads()
      } else {
        toast.error('Delete failed', { description: result.error || 'Unable to delete lead' })
      }
    } catch (e) {
      console.error(e)
      toast.error('Error', { description: 'Unexpected error while deleting lead' })
    }
  }

  const handleBulkDeleteLeads = async () => {
    if (!canDeleteLeads || selectedIds.length === 0) return
    const confirmed = window.confirm(
      `Delete ${selectedIds.length} lead${selectedIds.length === 1 ? '' : 's'}? This cannot be undone.`,
    )
    if (!confirmed) return

    try {
      setBulkDeleting(true)
      const result = await api.request('/api/lead/bulk', {
        method: 'DELETE',
        body: JSON.stringify({ ids: selectedIds }),
      })
      if (result.success) {
        const count = result.data?.deletedCount ?? selectedIds.length
        toast.success('Deleted', {
          description: `${count} lead${count === 1 ? '' : 's'} deleted successfully`,
        })
        clearSelection()
        refreshLeads()
      } else {
        toast.error('Delete failed', { description: result.error || 'Unable to delete selected leads' })
      }
    } catch (e) {
      console.error(e)
      toast.error('Error', { description: 'Unexpected error while deleting selected leads' })
    } finally {
      setBulkDeleting(false)
    }
  }

  return (
    <MainLayout>
      <div className="space-y-6 p-6">
        {/* Header */}
        <div className="flex items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-semibold text-foreground">Leads</h1>
              {view === 'all' ? (
                <span className="inline-flex items-center rounded-md px-2 py-0.5 text-xs font-medium text-brand bg-background border border-border">
                  {totalCount} leads
                </span>
              ) : null}
            </div>
            <p className="mt-0.5 text-[13px] text-muted-foreground">
              Manage leads and filter by any field. Save filters as dynamic lists for automation.
            </p>
          </div>
          {view === 'all' ? (
            <div className="flex items-center gap-2 shrink-0">
              <ImportExportCsv
                entityLabel="Lead"
                fields={LEAD_CSV_FIELDS}
                getExportRows={handleExportLeads}
                onImportRows={canWriteLeads ? handleImportLeads : undefined}
                disabled={isViewingAllBranches() || !canWriteLeads}
                disabledReason={
                  !canWriteLeads
                    ? "You don't have permission to import leads"
                    : 'Select a specific branch to import or export leads'
                }
              />
              {canWriteLeads && (
                <Button
                  className="h-9 px-4 rounded-lg bg-brand hover:bg-brand-dark text-brand-foreground text-sm font-medium gap-2 shrink-0"
                  onClick={openCreateDialog}
                >
                  <Plus className="h-4 w-4" />
                  Add Leads
                </Button>
              )}
            </div>
          ) : null}
        </div>

        <div className="border-b border-border">
          <div className="flex items-center gap-6">
            <button
              type="button"
              onClick={() => setView('all')}
              className={cn(
                'relative pb-2.5 text-[13px] font-medium transition-colors',
                view === 'all'
                  ? 'text-foreground'
                  : 'text-muted-foreground hover:text-foreground',
              )}
            >
              All leads
              {view === 'all' ? (
                <span className="absolute inset-x-0 -bottom-px h-0.5 rounded-full bg-[var(--studio-primary)]" />
              ) : null}
            </button>
            <button
              type="button"
              onClick={() => setView('lists')}
              className={cn(
                'relative inline-flex items-center gap-2 pb-2.5 text-[13px] font-medium transition-colors',
                view === 'lists'
                  ? 'text-foreground'
                  : 'text-muted-foreground hover:text-foreground',
              )}
            >
              Saved lists
              {savedListsCount != null ? (
                <span
                  className={cn(
                    'inline-flex h-5 min-w-5 items-center justify-center rounded-full px-1.5 text-[11px] font-semibold',
                    view === 'lists'
                      ? 'bg-[var(--studio-primary)] text-white'
                      : 'bg-muted text-muted-foreground',
                  )}
                >
                  {savedListsCount}
                </span>
              ) : null}
              {view === 'lists' ? (
                <span className="absolute inset-x-0 -bottom-px h-0.5 rounded-full bg-[var(--studio-primary)]" />
              ) : null}
            </button>
            <button
              type="button"
              onClick={() => setView('others')}
              className={cn(
                'relative pb-2.5 text-[13px] font-medium transition-colors',
                view === 'others'
                  ? 'text-foreground'
                  : 'text-muted-foreground hover:text-foreground',
              )}
            >
              Others
              {view === 'others' ? (
                <span className="absolute inset-x-0 -bottom-px h-0.5 rounded-full bg-[var(--studio-primary)]" />
              ) : null}
            </button>
          </div>
        </div>

        {view === 'lists' ? (
          <SavedListsPanel entityType="lead" refreshKey={savedListsRefreshKey} />
        ) : view === 'others' ? (
          <OthersContactsPanel />
        ) : (
          <>
        <LeadsQuickBar
          filters={filters}
          onChange={(next) => {
            clearSelection()
            setFilters(sanitizeLeadFilters(next))
            setCurrentPage(1)
          }}
          onClear={() => applyFilters(EMPTY_LEAD_FILTERS)}
          onOpenAdvanced={() => setFilterPanelOpen(true)}
          onCreateList={openCreateListFromFilters}
          canCreateList
          locations={locations}
          forms={forms}
          leadReasons={leadReasons}
        />

        <BulkSendActionBar
          selectedCount={selectedLeads.length}
          entityLabel="lead"
          onSendSms={() => openSendDialog('SMS')}
          onSendEmail={() => openSendDialog('Email')}
          onClear={clearSelection}
          canDelete={canDeleteLeads}
          onDelete={handleBulkDeleteLeads}
          deleting={bulkDeleting}
          showSelectAll={allOnPageSelected}
          selectAllTotal={totalCount}
          pageCount={leads.length}
          onSelectAll={selectAllMatching}
          selectingAll={selectingAll}
        />

        {/* Table */}
        <div className="rounded-xl border border-border bg-card overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="border-b border-border hover:bg-transparent bg-muted/30">
                <TableHead className="w-12 py-3 pl-4 pr-0">
                  <Checkbox
                    checked={allOnPageSelected}
                    onClick={toggleAll}
                    className="rounded border-border data-[state=checked]:bg-brand data-[state=checked]:border-brand"
                  />
                </TableHead>
                <TableHead className="py-3 px-4 text-xs font-medium text-muted-foreground">Name</TableHead>
                <TableHead className="py-3 px-4 text-xs font-medium text-muted-foreground">Contact</TableHead>
                <TableHead className="py-3 px-4 text-xs font-medium text-muted-foreground">Status</TableHead>
                <TableHead className="py-3 px-4 text-xs font-medium text-muted-foreground">Reason</TableHead>
                <TableHead className="py-3 px-4 text-xs font-medium text-muted-foreground">Communication</TableHead>
                <TableHead className="py-3 px-4 text-xs font-medium text-muted-foreground">Created</TableHead>
                <TableHead className="w-12 py-3 pr-4 pl-0" />
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={8} className="py-12 text-center">
                    <LoadingSpinner />
                  </TableCell>
                </TableRow>
              ) : leads.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={8} className="py-14 text-center text-sm text-muted-foreground">
                    {hasActiveLeadFilters(filters)
                      ? 'No leads match this view. Try a different search term or clear your filters.'
                      : 'No leads yet.'}
                  </TableCell>
                </TableRow>
              ) : (
              leads.map((lead) => {
                const stageKey = (lead.stage || 'new').toLowerCase()
                const createdAt = lead.createdAt ? new Date(lead.createdAt) : null
                const createdLabel = createdAt ? formatDateTime(createdAt) : '-'
                const studioLabel = studioLabelForLead(lead, locations)
                const lastActiveLabel = lead.updatedAt
                  ? formatDate(lead.updatedAt)
                  : createdLabel

                return (
                <TableRow
                  key={lead._id}
                  className="border-b border-border hover:bg-muted/30 transition-colors cursor-pointer"
                  onClick={() => openViewDialog(lead._id)}
                >
                  <TableCell className="py-3 pl-4 pr-0" onClick={(e) => e.stopPropagation()}>
                    <Checkbox
                      checked={selectedIds.includes(lead._id)}
                      onClick={() => toggleOne(lead)}
                      className="rounded border-border data-[state=checked]:bg-brand data-[state=checked]:border-brand"
                    />
                  </TableCell>
                  <TableCell className="py-3 px-4">
                    <div className="flex items-center gap-3">
                      <div className="h-9 w-9 rounded-full bg-muted flex items-center justify-center text-sm font-medium text-muted-foreground shrink-0">
                        {lead.name?.charAt(0) || '?'}
                      </div>
                      <div>
                        <p className="flex items-center gap-1.5 text-sm font-normal text-foreground leading-tight">
                          <span>{nameWithMembers(lead)}</span>
                          {getLeadAttemptCount(lead) > 1 && (
                            <span
                              className="inline-flex items-center rounded-full bg-indigo-100 px-1.5 py-0.5 text-[10px] font-medium leading-none text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-300"
                              title="Times this lead has submitted the form"
                            >
                              {getLeadAttemptCount(lead)} attempts
                            </span>
                          )}
                        </p>
                        {studioLabel && (
                          <p className="text-xs font-normal text-muted-foreground leading-tight mt-0.5">
                            {studioLabel}
                          </p>
                        )}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="py-3 px-4">
                    <div className="text-sm font-normal text-foreground leading-tight">{lead.email}</div>
                    <div className="text-xs font-normal text-muted-foreground leading-tight">{lead.phoneNumber}</div>
                  </TableCell>
                  <TableCell className="py-3 px-4 whitespace-nowrap">
                    <StatusColorBadge
                      color={getLeadStageColor(stageKey, stageOptions)}
                      className="px-2.5 py-0.5 text-xs font-medium"
                    >
                      {formatLeadStageLabel(lead.stage, stageOptions) || 'New'}
                    </StatusColorBadge>
                  </TableCell>
                  <TableCell className="py-3 px-4">
                    <span className="text-sm font-normal text-foreground leading-tight">
                      {lead.reason ? formatReasonLabel(lead.reason, leadReasons) : '—'}
                    </span>
                  </TableCell>
                  <TableCell className="py-3 px-4" onClick={(e) => e.stopPropagation()}>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      {[
                        { channel: 'Call', icon: Phone, count: lead.calls, label: 'calls' },
                        { channel: 'Email', icon: Mail, count: lead.emails, label: 'emails' },
                        { channel: 'SMS', icon: MessageSquare, count: lead.chats, label: 'messages' },
                      ].map(({ channel, icon: Icon, count, label }) => (
                        <button
                          key={channel}
                          type="button"
                          onClick={() => setCommunication({ lead, channel })}
                          title={`Open ${label}`}
                          className="flex items-center gap-1 rounded-md px-1.5 py-1 transition-colors hover:bg-[var(--studio-primary)]/10 hover:text-[var(--studio-primary)]"
                        >
                          <Icon className="h-3.5 w-3.5" />
                          {count ?? 0}
                        </button>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell className="py-3 px-4">
                    <p className="text-sm font-normal text-foreground leading-tight">{createdLabel}</p>
                    <p className="text-xs font-normal text-muted-foreground leading-tight">
                      Last: {lastActiveLabel}
                    </p>
                  </TableCell>
                  <TableCell className="py-3 pr-4 pl-0" onClick={(e) => e.stopPropagation()}>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <button
                          type="button"
                          className="p-1.5 rounded-md hover:bg-muted/50 text-muted-foreground hover:text-foreground"
                          aria-label="Actions"
                        >
                          <MoreHorizontal className="h-4 w-4" />
                        </button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => openViewDialog(lead._id)}>View</DropdownMenuItem>
                        {canWriteLeads && (
                          <DropdownMenuItem onClick={() => openEditDialog(lead._id)}>Edit</DropdownMenuItem>
                        )}
                        {canWriteLeads && (
                          <DropdownMenuItem
                            onClick={() => handleConvertToCustomer(lead)}
                            disabled={!!lead.convertedCustomerID || convertingId === lead._id}
                            className="flex items-center gap-2"
                          >
                            <UserCheck className="h-3.5 w-3.5" />
                            {lead.convertedCustomerID ? 'Already a Customer' : convertingId === lead._id ? 'Converting…' : 'Convert to Customer'}
                          </DropdownMenuItem>
                        )}
                        {canDeleteLeads && (
                          <DropdownMenuItem
                            className="text-destructive"
                            onClick={() => handleDeleteLead(lead._id)}
                          >
                            Delete
                          </DropdownMenuItem>
                        )}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              )
            })
              )}
            </TableBody>
          </Table>

          <div className="flex items-center justify-between px-4 py-3 border-t border-border">
            <RowsPerPage
              value={pageSize}
              onChange={(n) => { setPageSize(n); setCurrentPage(1) }}
              disabled={loading}
            />
            <span className="text-sm text-muted-foreground">
              Page {currentPage} of {totalPages}
            </span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1 || loading}
                className="inline-flex items-center h-8 px-3 rounded-lg border border-border bg-background text-sm font-medium text-foreground hover:bg-muted/40 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Previous
              </button>
              <button
                type="button"
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages || loading}
                className="inline-flex items-center h-8 px-3 rounded-lg border border-border bg-background text-sm font-medium text-foreground hover:bg-muted/40 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Next
              </button>
            </div>
          </div>
        </div>

        <LeadCommunicationDialog
          lead={communication?.lead}
          channel={communication?.channel}
          onClose={() => {
            setCommunication(null)
            refreshLeads()
          }}
        />
        <LeadsFilterPanel
          open={filterPanelOpen}
          appliedFilters={filters}
          onClose={() => setFilterPanelOpen(false)}
          onApply={applyFilters}
          locations={locations}
          forms={forms}
          leadReasons={leadReasons}
          loadingOptions={loadingOptions}
        />
          </>
        )}

        <DynamicListFormDialog
          open={listDialogOpen}
          onClose={() => {
            setListDialogOpen(false)
            setPrefillList(null)
          }}
          list={prefillList}
          entityType="lead"
          onSaved={() => {
            toast.success('Dynamic list created', {
              description: 'Your filtered leads have been saved as a dynamic list.',
            })
            setSavedListsRefreshKey((k) => k + 1)
          }}
        />

        <LeadsDialog
          open={dialogOpen}
          onClose={() => setDialogOpen(false)}
          leads={leads}
          onRefresh={refreshLeads}
          initialLeadId={dialogInitialLeadId}
          viewOnly={dialogViewOnly}
          leadReasons={leadReasons}
        />

        <BulkCreateLeadsDialog
          open={bulkDialogOpen}
          onClose={() => setBulkDialogOpen(false)}
          onRefresh={refreshLeads}
        />

        <DynamicListMemberSendDialog
          open={sendDialogOpen}
          onClose={() => setSendDialogOpen(false)}
          leads={selectedLeads}
          initialChannel={sendChannel}
          entityLabel="lead"
          recipientType="Lead"
          onSent={clearSelection}
        />
      </div>
    </MainLayout>
  )
}

export default function LeadsPage() {
  return (
    <Suspense fallback={null}>
      <LeadsPageInner />
    </Suspense>
  )
}
