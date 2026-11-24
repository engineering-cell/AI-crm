'use client'

import { useState, useEffect, useRef } from 'react'
import { Building2, ChevronDown } from 'lucide-react'
import api from '@/lib/api'
import { cn } from '@/lib/utils'
import { getEffectiveBranch } from '@/lib/auth'

const ALL = 'all'

export default function LocationSelector({
  value,
  onChange,
  onChangeObject,
  placeholder = 'Select location...',
  showAllOption = false,
  /** Marketing: pick every studio the user can access */
  allowAllBranches = false,
  /**
   * When empty, pre-select the studio already chosen in the navbar branch switcher.
   * Runs once per mount so the user can still clear / change afterward.
   */
  preselectActiveBranch = true,
  filterActiveOnly = true,
  className = '',
  multiple = false,
  disabled = false,
}) {
  const [locations, setLocations] = useState([])
  const [loading, setLoading] = useState(true)
  const [open, setOpen] = useState(false)
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0, width: 0 })
  const buttonRef = useRef(null)
  const dropdownRef = useRef(null)
  const didAutoSelectRef = useRef(false)

  useEffect(() => {
    loadLocations()
  }, [])

  useEffect(() => {
    if (open && buttonRef.current) {
      const updatePosition = () => {
        if (buttonRef.current) {
          const buttonRect = buttonRef.current.getBoundingClientRect()
          setDropdownPosition({
            top: buttonRect.bottom + 4,
            left: buttonRect.left,
            width: buttonRect.width,
          })
        }
      }

      updatePosition()

      window.addEventListener('scroll', updatePosition, true)
      window.addEventListener('resize', updatePosition)

      return () => {
        window.removeEventListener('scroll', updatePosition, true)
        window.removeEventListener('resize', updatePosition)
      }
    }
  }, [open])

  async function loadLocations() {
    try {
      setLoading(true)
      const result = await api.get('/api/location?limit=200')
      if (result.success) {
        let locs = result.data || []

        if (filterActiveOnly) {
          locs = locs.filter((loc) => loc.status?.toLowerCase() === 'active')
        }

        setLocations(locs)
      }
    } catch (e) {
      console.error('Failed to load locations:', e)
    } finally {
      setLoading(false)
    }
  }

  const isAllBranches = allowAllBranches && value === ALL
  const isMultiple = multiple || Array.isArray(value)
  const selectedIds = (
    isAllBranches
      ? []
      : Array.isArray(value)
        ? value
        : value && value !== ALL
          ? [value]
          : []
  ).map(String)
  const selectedLocations = isMultiple
    ? locations.filter((loc) => selectedIds.includes(String(loc._id)))
    : locations.find((loc) => String(loc._id) === String(value))

  // Auto-select: single studio, or exactly the navbar branch when empty.
  useEffect(() => {
    if (loading || locations.length === 0) return
    if (allowAllBranches && isAllBranches) {
      didAutoSelectRef.current = true
      return
    }

    const hasSelection = isMultiple ? selectedIds.length > 0 : Boolean(value) && value !== ALL
    if (hasSelection) {
      didAutoSelectRef.current = true
      return
    }
    if (didAutoSelectRef.current) return

    const apply = (loc) => {
      if (!loc) return
      didAutoSelectRef.current = true
      const id = String(loc._id)
      // Always a single studio — never preselect multiple.
      if (isMultiple) onChange([id])
      else onChange(id)
      onChangeObject?.(loc)
    }

    if (preselectActiveBranch) {
      const branchId = getEffectiveBranch()
      if (branchId) {
        const match = locations.find((loc) => String(loc._id) === String(branchId))
        if (match) {
          apply(match)
          return
        }
      }
    }

    if (locations.length === 1) {
      apply(locations[0])
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    loading,
    locations,
    isMultiple,
    selectedIds.length,
    value,
    allowAllBranches,
    isAllBranches,
    preselectActiveBranch,
  ])

  if (!loading && locations.length === 1 && !allowAllBranches) {
    const only = locations[0]
    return (
      <div
        className={cn(
          'flex w-full items-center gap-2 rounded-lg border border-border bg-muted/40 px-3 py-2 text-sm text-foreground',
          className
        )}
      >
        <Building2 className="h-4 w-4 shrink-0 text-muted-foreground" />
        <div className="min-w-0 flex-1">
          <div className="truncate font-medium">{only.name}</div>
          {(only.city || only.state) && (
            <div className="truncate text-xs text-muted-foreground">
              {only.city && only.state ? `${only.city}, ${only.state}` : only.city || only.state}
            </div>
          )}
        </div>
      </div>
    )
  }

  const label = loading
    ? 'Loading...'
    : isAllBranches
      ? 'All branches'
      : isMultiple
        ? selectedLocations && selectedLocations.length > 0
          ? selectedLocations.map((s) => s.name).join(', ')
          : placeholder
        : selectedLocations
          ? selectedLocations.name
          : placeholder

  const showPlaceholderStyle =
    !loading &&
    !isAllBranches &&
    (!selectedLocations || (isMultiple && selectedLocations.length === 0))

  return (
    <div className={cn('relative', className)}>
      <button
        ref={buttonRef}
        type="button"
        onClick={() => {
          if (disabled) return
          setOpen(!open)
        }}
        className={cn(
          'w-full flex items-center justify-between gap-2 px-3 py-2 rounded-lg border border-border',
          'bg-background text-sm text-foreground hover:border-muted-foreground/30 transition-colors',
          'focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-1 focus:ring-offset-background',
          open && 'border-brand ring-2 ring-brand ring-offset-1 ring-offset-background',
          disabled && 'bg-muted text-muted-foreground cursor-not-allowed'
        )}
        disabled={loading || disabled}
      >
        <div className="flex items-center gap-2 min-w-0 flex-1">
          <Building2 className="h-4 w-4 text-muted-foreground shrink-0" />
          <span className={cn('truncate', showPlaceholderStyle && 'text-muted-foreground')}>
            {label}
          </span>
        </div>
        <ChevronDown
          className={cn(
            'h-4 w-4 text-muted-foreground shrink-0 transition-transform',
            open && 'rotate-180'
          )}
        />
      </button>

      {open && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setOpen(false)} />
          <div
            ref={dropdownRef}
            className="fixed z-30 bg-popover text-popover-foreground border border-border rounded-lg shadow-lg max-h-60 overflow-y-auto overflow-x-hidden"
            style={{
              top: `${dropdownPosition.top}px`,
              left: `${dropdownPosition.left}px`,
              width: `${dropdownPosition.width}px`,
            }}
          >
            {allowAllBranches && locations.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={() => {
                    didAutoSelectRef.current = true
                    onChange(ALL)
                    setOpen(false)
                  }}
                  className={cn(
                    'w-full flex items-center gap-2 px-3 py-2 text-sm text-left hover:bg-muted transition-colors',
                    isAllBranches && 'bg-brand/10 text-brand font-medium'
                  )}
                >
                  <Building2 className="h-4 w-4 text-muted-foreground" />
                  <span>All branches</span>
                </button>
                <div className="h-px bg-border my-1" />
              </>
            )}
            {showAllOption && (
              <>
                <button
                  type="button"
                  onClick={() => {
                    didAutoSelectRef.current = true
                    onChange(isMultiple ? [] : null)
                    setOpen(false)
                  }}
                  className={cn(
                    'w-full flex items-center gap-2 px-3 py-2 text-sm text-left hover:bg-muted transition-colors',
                    ((!isMultiple && !value) ||
                      (isMultiple && (!value || value.length === 0))) &&
                      !isAllBranches &&
                      'bg-brand/10 text-brand font-medium'
                  )}
                >
                  <Building2 className="h-4 w-4 text-muted-foreground" />
                  <span>No Location</span>
                </button>
                <div className="h-px bg-border my-1" />
              </>
            )}
            {isMultiple && locations.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={() => {
                    didAutoSelectRef.current = true
                    const allSelected = locations.every((l) => selectedIds.includes(String(l._id)))
                    onChange(allSelected ? [] : locations.map((l) => String(l._id)))
                  }}
                  className="w-full flex items-center justify-between gap-2 px-3 py-2 text-sm font-medium text-brand text-left hover:bg-muted transition-colors"
                >
                  <span>
                    {locations.every((l) => selectedIds.includes(String(l._id))) ? 'Clear all' : 'Select all'}
                  </span>
                  <span className="text-xs font-normal text-muted-foreground">
                    {selectedIds.length} of {locations.length} selected
                  </span>
                </button>
                <div className="h-px bg-border my-1" />
              </>
            )}
            {locations.length === 0 ? (
              <div className="px-3 py-4 text-sm text-center text-muted-foreground">
                {loading ? 'Loading locations...' : 'No locations available'}
              </div>
            ) : (
              locations.map((location) => (
                <button
                  key={location._id}
                  type="button"
                  onClick={() => {
                    didAutoSelectRef.current = true
                    const locationId = String(location._id)
                    if (isMultiple) {
                      const current = isAllBranches ? [] : selectedIds.slice()
                      const idx = current.indexOf(locationId)
                      if (idx > -1) current.splice(idx, 1)
                      else current.push(locationId)
                      onChange(current)
                    } else {
                      onChange(locationId)
                      onChangeObject?.(location)
                      setOpen(false)
                    }
                  }}
                  className={cn(
                    'w-full flex items-start gap-2 px-3 py-2 text-sm text-left hover:bg-muted transition-colors',
                    !isAllBranches &&
                      (isMultiple
                        ? selectedIds.includes(String(location._id))
                        : String(value) === String(location._id)) &&
                      'bg-brand/10 text-brand font-medium'
                  )}
                >
                  <Building2 className="h-4 w-4 text-muted-foreground mt-0.5 shrink-0" />
                  <div className="flex-1 min-w-0">
                    <div className="font-medium truncate">{location.name}</div>
                    {(location.city || location.state) && (
                      <div className="text-xs text-muted-foreground truncate">
                        {location.city && location.state
                          ? `${location.city}, ${location.state}`
                          : location.city || location.state}
                      </div>
                    )}
                  </div>
                  {!isAllBranches &&
                    isMultiple &&
                    selectedIds.includes(String(location._id)) && (
                      <div className="ml-2 text-sm text-brand">✓</div>
                    )}
                </button>
              ))
            )}
          </div>
        </>
      )}
    </div>
  )
}

export { ALL as ALL_BRANCHES_VALUE }
