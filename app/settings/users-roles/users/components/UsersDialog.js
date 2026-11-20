'use client'

import { useState, useEffect } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { UserPlus, X, CalendarDays } from 'lucide-react'
import LocationSelector from '@/components/shared/LocationSelector'
import RoleSelector from '@/components/shared/RoleSelector'
import StatusSelector from '@/components/shared/StatusSelector'
import { Switch } from '@/components/ui/switch'
import api from '@/lib/api'
import { useToast } from '@/components/ui/toast'
import { cn } from '@/lib/utils'
import AvailabilityEditor, { normalizeAvailability, availabilityPayload } from '@/components/teachers/AvailabilityEditor'

export default function UsersDialog({ open, onClose, users = [], onRefresh, initialUserId = null, rolesList = [] }) {
  const [editingUser, setEditingUser] = useState(null)
  const [loading, setLoading] = useState(false)
  const [mode, setMode] = useState('create') // 'create' or 'edit'
  const [inviteMode, setInviteMode] = useState(false) // create-mode only: invite by email vs set password now
  const toast = useToast()

  // Whether the selected role shows its users on the calendar — the default
  // this user's toggle starts at, unless explicitly overridden below.
  const roleShowsOnCalendar = !!rolesList.find((r) => r.role === editingUser?.role)?.showOnCalendar
  const showOnCalendarOverridden =
    editingUser?.showOnCalendar === true || editingUser?.showOnCalendar === false
  const effectiveShowOnCalendar = showOnCalendarOverridden
    ? editingUser.showOnCalendar
    : roleShowsOnCalendar

  useEffect(() => {
    if (!open) {
      setEditingUser(null)
      setMode('create')
      setInviteMode(false)
      return
    }
    // if an initial user id was provided, pre-select that user for editing
    if (initialUserId && users && users.length > 0) {
      const found = users.find((u) => u._id === initialUserId)
      if (found) {
        setEditingUser({ ...found })
        setMode('edit')
      }
    } else {
      // create mode: show form immediately with empty fields
      setEditingUser({ name: '', email: '', role: '', password: '', locationID: [], phoneNumber: '', status: 'active' })
      setMode('create')
    }
  }, [open, initialUserId, users])

  function openEdit(user) {
    setEditingUser({ ...user })
    setMode('edit')
  }

  function openCreate() {
    setEditingUser({ name: '', email: '', role: '', password: '', locationID: [], phoneNumber: '', status: 'active' })
    setMode('create')
    setInviteMode(false)
  }

  function closeEdit() {
    setEditingUser(null)
    setMode('create')
    setInviteMode(false)
  }

  async function saveUser() {
    if (!editingUser) return

    if (!editingUser._id && inviteMode && (!editingUser.locationID || editingUser.locationID.length === 0)) {
      toast.error({ title: 'Location required', message: 'Select at least one location to invite this user to' })
      return
    }

    const weeklyCapacity = editingUser.weeklyCapacity === '' || editingUser.weeklyCapacity === undefined
      ? null
      : Number(editingUser.weeklyCapacity)

    setLoading(true)
    try {
      if (editingUser._id) {
        // update
        const result = await api.put(`/api/user/${editingUser._id}`, {
          name: editingUser.name,
          role: editingUser.role,
          locationID: editingUser.locationID || [],
          phoneNumber: editingUser.phoneNumber || null,
          status: editingUser.status || 'active',
          showOnCalendar: editingUser.showOnCalendar ?? null,
          ...(effectiveShowOnCalendar ? { weeklyCapacity } : {}),
          ...(effectiveShowOnCalendar && editingUser._availability ? { availability: availabilityPayload(editingUser._availability) } : {}),
        })
        if (result.success) {
          toast.success({ title: 'Saved', message: 'User updated' })
          closeEdit()
          onRefresh && onRefresh()
          onClose?.()
        } else {
          toast.error({ title: 'Save failed', message: result.error || 'Unable to update user' })
        }
      } else if (inviteMode) {
        // invite by email — no password, backend emails a set-password link
        const result = await api.post('/api/user/invite', {
          name: editingUser.name,
          email: editingUser.email,
          role: editingUser.role,
          locationID: editingUser.locationID || [],
          permissions: editingUser.permissions,
          showOnCalendar: editingUser.showOnCalendar ?? null,
          ...(effectiveShowOnCalendar ? { weeklyCapacity } : {}),
          ...(effectiveShowOnCalendar && editingUser._availability ? { availability: availabilityPayload(editingUser._availability) } : {}),
        })
        if (result.success) {
          toast.success({ title: 'Invite sent', message: `An invite email was sent to ${editingUser.email}` })
          closeEdit()
          onRefresh && onRefresh()
          onClose?.()
        } else {
          toast.error({ title: 'Invite failed', message: result.error || 'Unable to invite user' })
        }
      } else {
        // create with password set now
        const result = await api.post('/api/user', {
          ...editingUser,
          ...(effectiveShowOnCalendar ? { weeklyCapacity } : {}),
          ...(effectiveShowOnCalendar && editingUser._availability ? { availability: availabilityPayload(editingUser._availability) } : {}),
        })
        if (result.success) {
          toast.success({ title: 'Created', message: 'User created' })
          closeEdit()
          onRefresh && onRefresh()
          onClose?.()
        } else {
          toast.error({ title: 'Create failed', message: result.error || 'Unable to create user' })
        }
      }
    } catch (e) {
      console.error(e)
      toast.error({ title: 'Error', message: 'Unexpected error' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onClose={onClose} maxWidth="2xl">
      <DialogContent onClose={onClose} className="max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <div>
              <DialogTitle className="text-2xl">{mode === 'create' ? 'Create New User' : 'Edit User'}</DialogTitle>
              <DialogDescription className="mt-1">
                {mode === 'create' ? 'Add a new user to your organization' : 'Update user information'}
              </DialogDescription>
            </div>
            {mode === 'edit' && (
              <Button variant="ghost" size="sm" onClick={openCreate} className="gap-2">
                <UserPlus className="h-4 w-4" />
                New User
              </Button>
            )}
          </div>
        </DialogHeader>

        {editingUser && (
          <div className="space-y-6 mt-6">
            {mode === 'create' && (
              <div className="flex items-center justify-between gap-3 rounded-lg border border-border bg-muted/40 px-4 py-3">
                <div>
                  <p className="text-sm font-medium text-foreground">Invite by email</p>
                  <p className="text-xs text-muted-foreground">
                    {inviteMode
                      ? 'They’ll receive an email to set their own password.'
                      : 'You set their password now; they can log in immediately.'}
                  </p>
                </div>
                <Switch checked={inviteMode} onCheckedChange={setInviteMode} aria-label="Invite by email" />
              </div>
            )}

            {/* Basic Information Section */}
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-foreground uppercase tracking-wide">Basic Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">Full Name *</label>
                  <Input 
                    value={editingUser.name || ''} 
                    onChange={(e) => setEditingUser((p) => ({ ...p, name: e.target.value }))} 
                    placeholder="Enter full name" 
                    required 
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">Email Address *</label>
                  <Input 
                    value={editingUser.email || ''} 
                    onChange={(e) => setEditingUser((p) => ({ ...p, email: e.target.value }))} 
                    placeholder="user@example.com" 
                    type="email" 
                    required 
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">Phone Number</label>
                  <Input 
                    value={editingUser.phoneNumber || ''} 
                    onChange={(e) => setEditingUser((p) => ({ ...p, phoneNumber: e.target.value }))} 
                    placeholder="(555) 123-4567" 
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">Role *</label>
                  <RoleSelector
                    value={editingUser.role}
                    onChange={(role) => setEditingUser((p) => ({ ...p, role }))}
                    placeholder="Select role"
                  />
                </div>
              </div>

              {editingUser.role && (
                <div className="flex items-center justify-between gap-3 rounded-lg border border-border bg-muted/40 px-4 py-3">
                  <div className="flex items-start gap-2">
                    <CalendarDays className="h-4 w-4 mt-0.5 text-muted-foreground shrink-0" />
                    <div>
                      <p className="text-sm font-medium text-foreground">Show on calendar</p>
                      <p className="text-xs text-muted-foreground">
                        {showOnCalendarOverridden
                          ? `Overridden for this user (the "${editingUser.role}" role default is ${roleShowsOnCalendar ? 'on' : 'off'}).`
                          : `Following the "${editingUser.role}" role's default. Toggle to override just for this user.`}
                      </p>
                      {showOnCalendarOverridden && (
                        <button
                          type="button"
                          className="mt-1 text-xs font-medium text-brand hover:underline"
                          onClick={() => setEditingUser((p) => ({ ...p, showOnCalendar: null }))}
                        >
                          Reset to role default
                        </button>
                      )}
                    </div>
                  </div>
                  <Switch
                    checked={effectiveShowOnCalendar}
                    onCheckedChange={(checked) =>
                      setEditingUser((p) => ({ ...p, showOnCalendar: checked }))
                    }
                    aria-label="Show on calendar"
                  />
                </div>
              )}

              {effectiveShowOnCalendar && (
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">
                    Weekly Capacity
                  </label>
                  <Input
                    type="number"
                    min="0"
                    value={editingUser.weeklyCapacity ?? ''}
                    onChange={(e) => setEditingUser((p) => ({ ...p, weeklyCapacity: e.target.value }))}
                    placeholder="Not set"
                    className="max-w-[160px]"
                  />
                  <p className="mt-1 text-xs text-muted-foreground">
                    Lessons/sessions this person can be booked for per week. Used by the Instructor Utilization dashboard widget when no availability is set below.
                  </p>
                </div>
              )}

              {effectiveShowOnCalendar && (
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">
                    Availability (used for instructor utilization)
                  </label>
                  <AvailabilityEditor
                    value={editingUser._availability ?? normalizeAvailability(editingUser.availability)}
                    onChange={(v) => setEditingUser((p) => ({ ...p, _availability: v }))}
                  />
                </div>
              )}
            </div>

            {/* Account Settings Section */}
            <div className="space-y-4 pt-4 border-t border-border">
              <h3 className="text-sm font-semibold text-foreground uppercase tracking-wide">Account Settings</h3>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">
                  Location{mode === 'create' && inviteMode ? ' *' : ''}
                </label>
                <LocationSelector
                  multiple={true}
                  value={editingUser.locationID}
                  onChange={(locationIds) => setEditingUser((p) => ({ ...p, locationID: locationIds }))}
                  placeholder={mode === 'create' && inviteMode ? 'Select at least one location' : 'Select location(s) (optional)'}
                  showAllOption={true}
                />
                {mode === 'create' && inviteMode && (
                  <p className="mt-1 text-xs text-muted-foreground">Required to invite a staff member.</p>
                )}
              </div>
              {mode === 'create' && !inviteMode && (
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">Password *</label>
                  <Input
                    value={editingUser.password || ''}
                    onChange={(e) => setEditingUser((p) => ({ ...p, password: e.target.value }))}
                    placeholder="Enter password"
                    type="password"
                    required
                  />
                </div>
              )}
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">Status</label>
                <StatusSelector
                  value={editingUser.status || 'active'}
                  onChange={(status) => setEditingUser((p) => ({ ...p, status }))}
                  placeholder="Select status"
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-end gap-3 pt-4 border-t border-border">
              <Button variant="ghost" onClick={closeEdit} disabled={loading}>
                Cancel
              </Button>
              <Button onClick={saveUser} variant="gradient" disabled={loading}>
                {loading
                  ? (inviteMode && mode === 'create' ? 'Sending invite...' : 'Saving...')
                  : mode === 'create'
                    ? (inviteMode ? 'Send Invite' : 'Create User')
                    : 'Save Changes'}
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}

