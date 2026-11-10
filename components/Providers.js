'use client'

import { useEffect, useRef, useState } from 'react'
import { usePathname } from 'next/navigation'
import { SWRConfig } from 'swr'
import { Toaster } from 'sonner'
import { InboxHeaderProvider } from '@/contexts/InboxHeaderContext'
import { ThemeProvider, useTheme } from '@/contexts/ThemeContext'
import { analyticsSwrConfig } from '@/lib/hooks/useAnalyticsOverview'
import { isAuthenticated } from '@/lib/auth'
import { loadCachedStudioTimezone, resolveStudioTimezone } from '@/lib/hooks/useStudioTimezone'
import { getStudioTimezone } from '@/lib/studioTimezone'
import TerminalChargeTracker from '@/components/payments/TerminalChargeTracker'

// Pages format dates while they render, so the studio timezone has to be known before
// they mount — otherwise their first render uses the viewer's zone and never redoes it.
// Only a first visit to a branch waits on the request; later loads read the cached zone.
// Re-checked on navigation, because signing in moves to the app without a reload.
function StudioTimezoneGate({ children }) {
  const pathname = usePathname()
  const [ready, setReady] = useState(false)
  const triedRef = useRef(false)

  useEffect(() => {
    if (!isAuthenticated()) {
      setReady(true)
      return
    }
    if (getStudioTimezone() || loadCachedStudioTimezone() || triedRef.current) {
      setReady(true)
      resolveStudioTimezone() // refresh the cache in the background; no-op once resolved
      return
    }
    triedRef.current = true
    setReady(false)
    resolveStudioTimezone().finally(() => setReady(true))
  }, [pathname])

  return ready ? children : null
}

function ThemedToaster() {
  const { theme, mounted } = useTheme()
  return (
    <Toaster
      position="top-right"
      richColors
      theme={mounted ? theme : 'light'}
    />
  )
}

// Scrolling the page while a number field has focus changed its value (prices,
// refunds, quantities). Dropping focus first lets the wheel scroll the page instead.
function useNoWheelOnNumberInputs() {
  useEffect(() => {
    const onWheel = (e) => {
      const el = document.activeElement
      if (el?.type === 'number' && el === e.target) el.blur()
    }
    document.addEventListener('wheel', onWheel, { capture: true, passive: true })
    return () => document.removeEventListener('wheel', onWheel, { capture: true })
  }, [])
}

export default function Providers({ children }) {
  useNoWheelOnNumberInputs()
  return (
    <ThemeProvider>
      <SWRConfig value={analyticsSwrConfig}>
        <InboxHeaderProvider>
          <StudioTimezoneGate>{children}</StudioTimezoneGate>
          <ThemedToaster />
          <TerminalChargeTracker />
        </InboxHeaderProvider>
      </SWRConfig>
    </ThemeProvider>
  )
}
