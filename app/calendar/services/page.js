'use client'

import { useState, useEffect, useCallback } from 'react'
import { readPersistedListState, usePersistListState } from '@/lib/hooks/useListStatePersistence'
import { Plus, MoreHorizontal, FileText } from 'lucide-react'
import MainLayout from '@/components/layout/MainLayout'
import SearchInput from '@/components/ui/search-input'
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
import api from '@/lib/api'
import { toast } from '@/components/ui/toast'
import GlobalLoader from '@/components/shared/GlobalLoader'
import ServiceDialog from './components/ServiceDialog'

const ROWS_PER_PAGE = 10

// Remembers search/page across back/forward navigation.
const SERVICES_LIST_STATE_KEY = 'services-list-state'

function BoolBadge({ value }) {
  return value
    ? <span className="inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium bg-emerald-500/10 text-emerald-600">Yes</span>
    : <span className="inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium bg-muted text-muted-foreground">No</span>
}

export default function CalendarServicesPage() {
  const [persisted] = useState(() => readPersistedListState(SERVICES_LIST_STATE_KEY) || {})
  const [services, setServices] = useState([])
  const [totalCount, setTotalCount] = useState(0)
  const [currentPage, setCurrentPage] = useState(persisted.currentPage || 1)
  const [searchQuery, setSearchQuery] = useState(persisted.searchQuery || '')
  const [loading, setLoading] = useState(true)
  const [initialLoad, setInitialLoad] = useState(true)
  const [selectedIds, setSelectedIds] = useState([])
  const [dialogOpen, setDialogOpen] = useState(false)
  const [editingService, setEditingService] = useState(null)
  const [duplicating, setDuplicating] = useState(false)

  const totalPages = Math.max(1, Math.ceil(totalCount / ROWS_PER_PAGE))

  const loadServices = useCallback(async (page, search) => {
    setLoading(true)
    try {
      const params = new URLSearchParams({
        page: String(page),
        limit: String(ROWS_PER_PAGE),
      })
      if (search) params.set('search', search)

      const result = await api.get(`/api/calendar-service?${params.toString()}`)
      if (result.success) {
        const data = Array.isArray(result.data) ? result.data : []
        setServices(data)
        setTotalCount(result.pagination?.total ?? data.length)
      } else {
        toast.error('Failed to load services', { description: result.error })
      }
    } catch (e) {
      console.error(e)
      toast.error('Error', { description: 'Unable to load services' })
    } finally {
      setLoading(false)
      setInitialLoad(false)
      setSelectedIds([])
    }
  }, [])

  useEffect(() => {
    loadServices(currentPage, searchQuery)
  }, [currentPage, searchQuery, loadServices])

  usePersistListState(SERVICES_LIST_STATE_KEY, { searchQuery, currentPage })

  const toggleOne = (id) =>
    setSelectedIds((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]))

  const toggleAll = () => {
    if (selectedIds.length === services.length) setSelectedIds([])
    else setSelectedIds(services.map((s) => s._id))
  }

  function openCreate() {
    setDuplicating(false)
    setEditingService(null)
    setDialogOpen(true)
  }

  function openEdit(service) {
    setDuplicating(false)
    setEditingService(service)
    setDialogOpen(true)
  }

  // Same service (code, type, etc.) for another studio — typically with a different price.
  function openDuplicate(service) {
    setDuplicating(true)
    setEditingService(service)
    setDialogOpen(true)
  }

  async function handleDelete(service) {
    if (!window.confirm(`Delete "${service.serviceName}"? This cannot be undone.`)) return
    try {
      const result = await api.delete(`/api/calendar-service/${service._id}`)
      if (result.success) {
        toast.success('Service deleted')
        loadServices(currentPage, searchQuery)
      } else {
        toast.error('Delete failed', { description: result.error })
      }
    } catch (e) {
      console.error(e)
      toast.error('Error', { description: 'Unable to delete service' })
    }
  }

  async function handleToggleStatus(service) {
    try {
      const result = await api.patch(`/api/calendar-service/${service._id}/toggle`)
      if (result.success) {
        toast.success(`Service ${service.isActive ? 'deactivated' : 'activated'}`)
        loadServices(currentPage, searchQuery)
      } else {
        toast.error('Failed', { description: result.error })
      }
    } catch (e) {
      console.error(e)
      toast.error('Error', { description: 'Unable to update service status' })
    }
  }

  if (initialLoad) {
    return (
      <MainLayout title="Calendar Services" subtitle="">
        <div className="flex items-center justify-center h-[calc(100vh-8rem)]">
          <GlobalLoader variant="center" size="md" text="Loading services…" />
        </div>
      </MainLayout>
    )
  }

  return (
    <MainLayout title="Calendar Services" subtitle="">
      <div className="min-h-full flex flex-col p-6">
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-1">
            <h1 className="text-2xl font-semibold text-foreground tracking-tight">Calendar Services</h1>
            <span className="inline-flex items-center rounded-md px-2 py-0.5 text-xs font-medium text-brand bg-background border border-border">
              {totalCount} {totalCount === 1 ? 'service' : 'services'}
            </span>
          </div>
          <p className="text-sm font-normal text-muted-foreground">
            Manage your studio's calendar services and offerings.
          </p>
        </div>

        <div className="flex items-center justify-between gap-3 mb-6">
          <SearchInput
            className="w-[220px] shrink-0"
            placeholder="Search services…"
            value={searchQuery}
            onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1) }}
          />
          <Button
            className="h-9 px-4 rounded-lg bg-brand hover:bg-brand-dark text-brand-foreground text-sm font-medium gap-2 shrink-0"
            onClick={openCreate}
          >
            <Plus className="h-4 w-4" />
            Add Service
          </Button>
        </div>

        <div className="rounded-xl border border-border bg-card min-h-[560px] flex flex-col">
          <div className="flex-1 overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-b border-border hover:bg-transparent bg-muted/30">
                  <TableHead className="w-12 py-3 pl-4 pr-0">
                    <Checkbox
                      checked={selectedIds.length === services.length && services.length > 0}
                      onClick={toggleAll}
                      className="rounded border-border data-[state=checked]:bg-brand data-[state=checked]:border-brand"
                    />
                  </TableHead>
                  <TableHead className="py-3 px-4 text-xs font-medium text-muted-foreground">Service Name</TableHead>
                  <TableHead className="py-3 px-4 text-xs font-medium text-muted-foreground">Service Code</TableHead>
                  <TableHead className="py-3 px-4 text-xs font-medium text-muted-foreground">Location</TableHead>
                  <TableHead className="py-3 px-4 text-xs font-medium text-muted-foreground">Description</TableHead>
                  <TableHead className="py-3 px-4 text-xs font-medium text-muted-foreground">Price</TableHead>
                  <TableHead className="py-3 px-4 text-xs font-medium text-muted-foreground">Chargeable</TableHead>
                  <TableHead className="py-3 px-4 text-xs font-medium text-muted-foreground">Group</TableHead>
                  <TableHead className="py-3 px-4 text-xs font-medium text-muted-foreground">Sort Order</TableHead>
                  <TableHead className="py-3 px-4 text-xs font-medium text-muted-foreground">Documents</TableHead>
                  <TableHead className="py-3 px-4 text-xs font-medium text-muted-foreground">Status</TableHead>
                  <TableHead className="w-12 py-3 pr-4 pl-0" />
                </TableRow>
              </TableHeader>
              <TableBody>
                {services.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={14} className="py-16 text-center text-sm text-muted-foreground">
                      {searchQuery ? 'No services match your search.' : 'No services yet. Click "Add Service" to create one.'}
                    </TableCell>
                  </TableRow>
                ) : (
                  services.map((service) => (
                    <TableRow
                      key={service._id}
                      className="border-b border-border hover:bg-muted/30 transition-colors"
                    >
                      <TableCell className="py-3 pl-4 pr-0">
                        <Checkbox
                          checked={selectedIds.includes(service._id)}
                          onClick={() => toggleOne(service._id)}
                          className="rounded border-border data-[state=checked]:bg-brand data-[state=checked]:border-brand"
                        />
                      </TableCell>
                      <TableCell className="py-3 px-4">
                        <div className="flex items-center gap-3">
                          <div
                            className={`h-9 w-9 rounded-full flex items-center justify-center text-sm font-medium shrink-0 ${service.color ? '' : 'bg-muted text-muted-foreground'}`}
                            style={service.color ? { backgroundColor: service.color, color: '#fff' } : undefined}
                          >
                            {service.serviceName.charAt(0).toUpperCase()}
                          </div>
                          <p className="text-sm font-normal text-foreground leading-tight">{service.serviceName}</p>
                        </div>
                      </TableCell>
                      <TableCell className="py-3 px-4">
                        <span className="inline-flex items-center rounded px-2 py-0.5 text-xs font-mono font-medium bg-muted text-foreground border border-border">
                          {service.serviceCode}
                        </span>
                      </TableCell>
                      <TableCell className="py-3 px-4">
                        <p className="text-sm text-foreground">
                          {service.locationID?.name || <span className="text-muted-foreground">—</span>}
                        </p>
                      </TableCell>
                      <TableCell className="py-3 px-4 max-w-[200px]">
                        <p className="text-sm text-muted-foreground truncate">
                          {service.description || '—'}
                        </p>
                      </TableCell>
                      <TableCell className="py-3 px-4">
                        <p className="text-sm text-foreground">
                          {service.price != null ? `$${Number(service.price).toFixed(2)}` : '—'}
                        </p>
                      </TableCell>
                      <TableCell className="py-3 px-4">
                        <BoolBadge value={service.isChargeable} />
                      </TableCell>
                      <TableCell className="py-3 px-4">
                        <BoolBadge value={service.isGroup} />
                      </TableCell>
                      <TableCell className="py-3 px-4">
                        <p className="text-sm text-foreground">{service.sortByOrder ?? 0}</p>
                      </TableCell>
                      <TableCell className="py-3 px-4">
                        {service.documents?.length > 0 ? (
                          <div className="flex items-center gap-1.5">
                            <FileText className="h-3.5 w-3.5 text-muted-foreground" />
                            <span className="text-sm text-foreground">{service.documents.length}</span>
                          </div>
                        ) : (
                          <span className="text-sm text-muted-foreground">—</span>
                        )}
                      </TableCell>
                      <TableCell className="py-3 px-4">
                        <span
                          className={[
                            'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium',
                            service.isActive
                              ? 'bg-emerald-500/10 text-emerald-600'
                              : 'bg-muted text-muted-foreground',
                          ].join(' ')}
                        >
                          {service.isActive ? 'Active' : 'Inactive'}
                        </span>
                      </TableCell>
                      <TableCell className="py-3 pr-4 pl-0">
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
                            <DropdownMenuItem onClick={() => openEdit(service)}>Edit</DropdownMenuItem>
                            <DropdownMenuItem onClick={() => openDuplicate(service)}>Duplicate</DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleToggleStatus(service)}>
                              {service.isActive ? 'Deactivate' : 'Activate'}
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              className="text-red-600"
                              onClick={() => handleDelete(service)}
                            >
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>

          <div className="flex items-center justify-between px-4 py-3 border-t border-border">
            <button
              type="button"
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1 || loading}
              className="inline-flex items-center h-8 px-3 rounded-lg border border-border bg-background text-sm font-medium text-foreground hover:bg-muted/40 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            <span className="text-sm text-muted-foreground">
              Page {currentPage} of {totalPages}
            </span>
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

        <ServiceDialog
          open={dialogOpen}
          onClose={() => setDialogOpen(false)}
          service={editingService}
          duplicate={duplicating}
          onRefresh={() => loadServices(currentPage, searchQuery)}
        />
      </div>
    </MainLayout>
  )
}
