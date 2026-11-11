'use client'

import { useEffect, useRef } from 'react'
import { TERMINAL_CHARGE_SETTLED_EVENT } from '@/lib/terminalCharge'

/**
 * Run `callback` whenever a tracked card-reader charge ends (paid, failed or cancelled), so
 * a screen showing money — a wallet balance, a payment list — refetches instead of staying
 * stale behind the "payment recorded" toast. The latest callback is always used.
 */
export function useTerminalChargeSettled(callback) {
  const ref = useRef(callback)
  ref.current = callback
  useEffect(() => {
    const onSettled = () => ref.current?.()
    window.addEventListener(TERMINAL_CHARGE_SETTLED_EVENT, onSettled)
    return () => window.removeEventListener(TERMINAL_CHARGE_SETTLED_EVENT, onSettled)
  }, [])
}
