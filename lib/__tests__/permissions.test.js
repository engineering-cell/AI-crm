import { describe, it, expect, vi, beforeEach } from 'vitest'

// getCurrentUser reads localStorage on every call, so the tests swap the whole
// module rather than priming storage.
const mockUser = vi.fn()
vi.mock('../auth', () => ({
  getCurrentUser: () => mockUser(),
}))

const {
  hasPermission,
  canAccessRoute,
  getDefaultRedirect,
  isSuperAdmin,
  isAdmin,
  canManageCallCenter,
  isPublicRoute,
  getScope,
  isOwnScope,
  SCOPE_ALL,
  SCOPE_OWN,
} = await import('../permissions')

/** Build a user whose permissions grant `actions` on category.module. */
function userWith(role, category, module, actions) {
  return {
    role,
    permissions: category
      ? { [category]: { permissions: { [module]: actions } } }
      : {},
  }
}

beforeEach(() => {
  mockUser.mockReset()
})

describe('hasPermission', () => {
  it('denies when there is no session', () => {
    mockUser.mockReturnValue(null)
    expect(hasPermission('leads', 'manage', 'read')).toBe(false)
  })

  it('grants everything to superadmin regardless of the permissions object', () => {
    mockUser.mockReturnValue({ role: 'superadmin', permissions: {} })
    expect(hasPermission('settings', 'roles', 'delete')).toBe(true)
  })

  it('matches superadmin case-insensitively', () => {
    for (const role of ['SuperAdmin', 'Super Admin', 'SUPERADMIN', 'super_admin']) {
      mockUser.mockReturnValue({ role, permissions: {} })
      expect(hasPermission('settings', 'roles', 'delete'), role).toBe(true)
      expect(isSuperAdmin(), role).toBe(true)
    }
  })

  it('honours the master wildcard', () => {
    mockUser.mockReturnValue({
      role: 'custom',
      permissions: { master: { permissions: { '*': { read: true } } } },
    })
    expect(hasPermission('anything', 'at-all', 'read')).toBe(true)
    expect(hasPermission('anything', 'at-all', 'delete')).toBe(false)
  })

  it('reads a plain module grant', () => {
    mockUser.mockReturnValue(userWith('staff', 'leads', 'manage', { read: true }))
    expect(hasPermission('leads', 'manage', 'read')).toBe(true)
    expect(hasPermission('leads', 'manage', 'write')).toBe(false)
  })

  it('treats a legacy edit grant as write, and vice versa', () => {
    mockUser.mockReturnValue(userWith('staff', 'calendar', 'enrollment', { edit: true }))
    expect(hasPermission('calendar', 'enrollment', 'write')).toBe(true)

    mockUser.mockReturnValue(userWith('staff', 'calendar', 'enrollment', { write: true }))
    expect(hasPermission('calendar', 'enrollment', 'edit')).toBe(true)
  })

  it('does not let write leak into read or delete', () => {
    mockUser.mockReturnValue(userWith('staff', 'leads', 'manage', { write: true }))
    expect(hasPermission('leads', 'manage', 'read')).toBe(false)
    expect(hasPermission('leads', 'manage', 'delete')).toBe(false)
  })

  it('resolves the HumanQueue -> CallCenter alias', () => {
    mockUser.mockReturnValue(userWith('staff', 'inbox', 'HumanQueue', { read: true }))
    expect(hasPermission('inbox', 'CallCenter', 'read')).toBe(true)
    expect(hasPermission('inbox', 'CallCenter', 'read', { allowAliases: false })).toBe(false)
  })

  it('canManageCallCenter ignores the legacy alias', () => {
    mockUser.mockReturnValue(userWith('staff', 'inbox', 'HumanQueue', { write: true }))
    expect(canManageCallCenter()).toBe(false)

    mockUser.mockReturnValue(userWith('staff', 'inbox', 'CallCenter', { write: true }))
    expect(canManageCallCenter()).toBe(true)
  })
})

describe('canAccessRoute', () => {
  it('allows public routes with no session', () => {
    mockUser.mockReturnValue(null)
    expect(canAccessRoute('/auth/login')).toBe(true)
    expect(canAccessRoute('/pay/abc123')).toBe(true)
    expect(canAccessRoute('/booking-test')).toBe(true)
    expect(canAccessRoute('/no-access')).toBe(true)
    expect(isPublicRoute('/sign-contract')).toBe(true)
  })

  it('denies everything else with no session', () => {
    mockUser.mockReturnValue(null)
    expect(canAccessRoute('/leads')).toBe(false)
  })

  it('fails closed for a route in neither map', () => {
    mockUser.mockReturnValue(userWith('custom', 'leads', 'manage', { read: true }))
    expect(canAccessRoute('/some/brand/new/page')).toBe(false)
  })

  it('gates a route by its ROUTE_PERMISSIONS module', () => {
    mockUser.mockReturnValue(userWith('custom', 'leads', 'manage', { read: true }))
    expect(canAccessRoute('/leads')).toBe(true)
    expect(canAccessRoute('/calendar')).toBe(false)
  })

  it('prefix-matches dynamic child routes', () => {
    mockUser.mockReturnValue(userWith('custom', 'calendar', 'bookings', { read: true }))
    expect(canAccessRoute('/calendar/packages/abc123')).toBe(true)
  })

  it('treats an array module as any-of', () => {
    mockUser.mockReturnValue(userWith('custom', 'dashboard', 'goals', { read: true }))
    expect(canAccessRoute('/dashboard')).toBe(true)
  })

  it('requires write for the goals settings page but only read for the widget', () => {
    mockUser.mockReturnValue(userWith('custom', 'dashboard', 'goals', { read: true }))
    expect(canAccessRoute('/dashboard')).toBe(true)
    expect(canAccessRoute('/settings/goals')).toBe(false)

    mockUser.mockReturnValue(userWith('custom', 'dashboard', 'goals', { read: true, write: true }))
    expect(canAccessRoute('/settings/goals')).toBe(true)
  })

  it('gates /settings/studio on settings.locations', () => {
    mockUser.mockReturnValue(userWith('custom', null))
    expect(canAccessRoute('/settings/studio')).toBe(false)

    mockUser.mockReturnValue(userWith('custom', 'settings', 'locations', { read: true }))
    expect(canAccessRoute('/settings/studio')).toBe(true)
  })

  it('matches ROUTE_ACCESS roles case-insensitively', () => {
    mockUser.mockReturnValue({ role: 'Admin', permissions: {} })
    // /settings has no ROUTE_PERMISSIONS entry, so it falls to the role array.
    expect(canAccessRoute('/settings')).toBe(true)
  })
})

describe('getDefaultRedirect', () => {
  it('sends an unauthenticated visitor to login', () => {
    mockUser.mockReturnValue(null)
    expect(getDefaultRedirect()).toBe('/auth/login')
  })

  it('returns a route the user can actually reach', () => {
    // The regression that mattered: a call-center-only role was sent to /inbox,
    // which needs inbox.AllMessages, and looped forever.
    mockUser.mockReturnValue(userWith('staff', 'inbox', 'CallCenter', { read: true }))
    const destination = getDefaultRedirect()
    expect(destination).toBe('/inbox/human-queue')
    expect(canAccessRoute(destination)).toBe(true)
  })

  it('never returns an unreachable route for any single-module role', () => {
    const roles = [
      ['leads', 'manage'],
      ['calendar', 'bookings'],
      ['customers', 'manage'],
      ['reports', 'overview'],
      ['settings', 'locations'],
      ['inbox', 'AllMessages'],
      ['dashboard', 'goals'],
    ]
    for (const [category, module] of roles) {
      mockUser.mockReturnValue(userWith('custom', category, module, { read: true }))
      const destination = getDefaultRedirect()
      expect(canAccessRoute(destination), `${category}.${module} -> ${destination}`).toBe(true)
    }
  })

  it('falls through to /no-access when nothing is reachable', () => {
    mockUser.mockReturnValue({ role: 'Teacher', permissions: {} })
    expect(getDefaultRedirect()).toBe('/no-access')
  })

  it('sends superadmin to the dashboard', () => {
    mockUser.mockReturnValue({ role: 'superadmin', permissions: {} })
    expect(getDefaultRedirect()).toBe('/dashboard')
  })
})

describe('getScope', () => {
  it('resolves to all when there is no session', () => {
    mockUser.mockReturnValue(null)
    expect(getScope('calendar', 'bookings')).toBe(SCOPE_ALL)
  })

  it('resolves to all for superadmin regardless of stored scope', () => {
    mockUser.mockReturnValue(userWith('superadmin', 'calendar', 'bookings', { read: true, scope: 'own' }))
    expect(getScope('calendar', 'bookings')).toBe(SCOPE_ALL)
  })

  it('resolves to all for the master wildcard', () => {
    mockUser.mockReturnValue({
      role: 'manager',
      permissions: {
        master: { permissions: { '*': { read: true } } },
        calendar: { permissions: { bookings: { read: true, scope: 'own' } } },
      },
    })
    expect(getScope('calendar', 'bookings')).toBe(SCOPE_ALL)
  })

  it('only an explicit own narrows', () => {
    mockUser.mockReturnValue(userWith('teacher', 'calendar', 'bookings', { read: true }))
    expect(getScope('calendar', 'bookings')).toBe(SCOPE_ALL)
    expect(isOwnScope('calendar', 'bookings')).toBe(false)

    mockUser.mockReturnValue(userWith('teacher', 'calendar', 'bookings', { read: true, scope: 'own' }))
    expect(getScope('calendar', 'bookings')).toBe(SCOPE_OWN)
    expect(isOwnScope('calendar', 'bookings')).toBe(true)
  })

  it('junk scope values resolve to all', () => {
    for (const scope of [null, undefined, '', 'OWN', 'everything']) {
      mockUser.mockReturnValue(userWith('teacher', 'calendar', 'bookings', { read: true, scope }))
      expect(getScope('calendar', 'bookings'), `scope=${scope}`).toBe(SCOPE_ALL)
    }
  })

  it('an unknown module resolves to all', () => {
    mockUser.mockReturnValue(userWith('teacher', 'calendar', 'bookings', { read: true, scope: 'own' }))
    expect(getScope('reports', 'overview')).toBe(SCOPE_ALL)
  })

  it('takes the widest scope across the HumanQueue/CallCenter alias', () => {
    mockUser.mockReturnValue({
      role: 'agent',
      permissions: {
        inbox: {
          permissions: {
            CallCenter: { read: true, scope: 'own' },
            HumanQueue: { read: true, scope: 'all' },
          },
        },
      },
    })
    expect(getScope('inbox', 'CallCenter')).toBe(SCOPE_ALL)
  })
})

describe('role helpers', () => {
  it('distinguishes admin from superadmin', () => {
    mockUser.mockReturnValue({ role: 'admin', permissions: {} })
    expect(isAdmin()).toBe(true)
    expect(isSuperAdmin()).toBe(false)
  })

  it('returns false for a null session rather than throwing', () => {
    mockUser.mockReturnValue(null)
    expect(isAdmin()).toBe(false)
    expect(isSuperAdmin()).toBe(false)
  })
})
