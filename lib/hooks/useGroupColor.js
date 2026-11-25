'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import api from '@/lib/api'

// How soon another person's screen shows a change. There is no push channel in this app.
export const GROUP_COLOR_POLL_MS = 10 * 1000

/**
 * The organisation's group class colour, kept current: re-read on a timer while the tab is
 * visible, and at once when the user comes back to it.
 */
export function useGroupColor() {
  const [groupColor, setGroupColor] = useState(null)
  // A poll that started before a save must not put the old colour back.
  const version = useRef(0)

  const refresh = useCallback(async () => {
    const started = version.current
    const res = await api.get('/api/organisation/group-color')
    if (res.success && started === version.current) setGroupColor(res.data?.groupColor || null)
  }, [])

  useEffect(() => {
    const refreshIfVisible = () => {
      if (document.visibilityState === 'visible') refresh()
    }
    refresh()
    const timer = setInterval(refreshIfVisible, GROUP_COLOR_POLL_MS)
    document.addEventListener('visibilitychange', refreshIfVisible)
    window.addEventListener('focus', refreshIfVisible)
    return () => {
      clearInterval(timer)
      document.removeEventListener('visibilitychange', refreshIfVisible)
      window.removeEventListener('focus', refreshIfVisible)
    }
  }, [refresh])

  /** Returns the API result so the caller can report a failure. */
  const saveGroupColor = useCallback(async (color) => {
    version.current += 1
    const res = await api.patch('/api/organisation/group-color', { groupColor: color })
    version.current += 1
    if (res.success) setGroupColor(res.data?.groupColor || null)
    return res
  }, [])

  return { groupColor, saveGroupColor }
}
