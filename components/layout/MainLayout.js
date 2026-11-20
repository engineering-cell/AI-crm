'use client'

import { Suspense, useEffect, useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { isAuthenticated, refreshSession } from '@/lib/auth'
import { canAccessRoute, getDefaultRedirect } from '@/lib/permissions'
import { Menu } from 'lucide-react'
import { useToast } from '@/components/ui/toast'
import { Button } from '@/components/ui/button'
import Sidebar from './Sidebar'
import Header from './Header'
import { cn } from '@/lib/utils'

export default function MainLayout({
  children,
  title,
  subtitle,
  mainClassName,
  /** For pages that draw their own top bar — stacking both looks broken. */
  hideHeader = false,
}) {
  const router = useRouter()
  const pathname = usePathname()
  const toast = useToast()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isClient, setIsClient] = useState(false)
  const [isAuth, setIsAuth] = useState(false)
  // Tracked separately from isAuth: an authenticated user who fails the route
  // check must not paint the page while the redirect is in flight.
  const [authorized, setAuthorized] = useState(false)

  // Only check authentication on client side to avoid hydration mismatch
  useEffect(() => {
    setIsClient(true)
    const authenticated = isAuthenticated()
    setIsAuth(authenticated)

    if (!authenticated) {
      setAuthorized(false)
      router.push('/auth/login')
      return
    }

    // Check route access
    if (!canAccessRoute(pathname)) {
      setAuthorized(false)
      const destination = getDefaultRedirect()
      // Redirecting to the route we're already on would loop. getDefaultRedirect
      // only returns reachable routes now, so this should be unreachable — but
      // bail loudly rather than spin if a future mapping reintroduces the case.
      if (destination === pathname) return
      toast.error({ title: 'Access denied', message: "You don't have access to that page." })
      router.push(destination)
      return
    }

    setAuthorized(true)
  }, [pathname, router])

  // Pull fresh permissions from the server on mount and when the tab regains
  // focus, so a role edit lands within a minute instead of waiting for the user
  // to log out and back in. Throttled — focus fires often.
  useEffect(() => {
    if (!isAuthenticated()) return

    let lastRefresh = 0
    const REFRESH_INTERVAL_MS = 60_000

    const maybeRefresh = () => {
      const now = Date.now()
      if (now - lastRefresh < REFRESH_INTERVAL_MS) return
      lastRefresh = now
      // A permission change can make the current route unreachable, so re-run
      // the guard against the refreshed session rather than leaving the user on
      // a page they no longer have access to.
      refreshSession().then((user) => {
        if (user) setAuthorized(canAccessRoute(pathname))
      })
    }

    maybeRefresh()
    window.addEventListener('focus', maybeRefresh)
    return () => window.removeEventListener('focus', maybeRefresh)
  }, [pathname])

  // Switching the active location changes what every location-scoped request
  // returns, so reload the whole app — header, sidebar, and page all re-fetch
  // under the new location rather than leaving stale data behind.
  useEffect(() => {
    const handleBranchChange = () => {
      window.location.reload()
    }

    window.addEventListener('branch-change', handleBranchChange)
    return () => window.removeEventListener('branch-change', handleBranchChange)
  }, [])

  // Show nothing until client-side hydration is complete, and nothing at all
  // for a route the user can't access — otherwise the sidebar, header and full
  // page body paint for a frame before router.push lands.
  if (!isClient || !isAuth || !authorized) {
    return null
  }

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <Sidebar mobileOpen={mobileMenuOpen} setMobileOpen={setMobileMenuOpen} />
      <div className="flex-1 flex flex-col overflow-hidden md:p-2">
        {hideHeader ? (
          // The header carries the only sidebar toggle below lg, so hiding it
          // outright would strand mobile users — keep a slim strip for it.
          <div className="flex items-center border-b border-border bg-background px-2 py-1.5 lg:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              className={cn(
                'h-9 w-9 rounded-lg text-muted-foreground',
                mobileMenuOpen && 'bg-muted text-foreground',
              )}
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            >
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        ) : (
          <Suspense fallback={<header className="sticky top-0 z-30 min-h-[86px] border-b border-border bg-background" />}>
            <Header
              title={title}
              subtitle={subtitle}
              mobileMenuOpen={mobileMenuOpen}
              onMenuClick={() => setMobileMenuOpen((prev) => !prev)}
            />
          </Suspense>
        )}
        <main
          className={cn(
            'flex-1 min-h-0 overflow-y-auto scrollbar-hide bg-background px-3 py-3 sm:px-4 sm:py-4 lg:px-2',
            mainClassName,
          )}
        >
          {children}
        </main>
      </div>
    </div>
  )
}


