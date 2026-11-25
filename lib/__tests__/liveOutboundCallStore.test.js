import { describe, expect, it, beforeEach } from 'vitest'
import {
  clearLiveOutboundCall,
  getLiveOutboundCallState,
  isLiveOutboundSession,
  patchLiveOutboundCall,
  setLiveOutboundCallMinimized,
  startLiveOutboundCall,
} from '@/lib/liveOutboundCallStore'

describe('liveOutboundCallStore', () => {
  beforeEach(() => {
    clearLiveOutboundCall()
  })

  it('keeps a minimized callback call when the session is patched', () => {
    const sessionId = startLiveOutboundCall({
      call: { id: 'c1', leadName: 'Ava' },
      callStatus: 'connecting',
    })
    setLiveOutboundCallMinimized(true)
    patchLiveOutboundCall({
      call: { id: 'c1', leadName: 'Ava' },
      callStatus: 'connected',
    })

    const live = getLiveOutboundCallState()
    expect(isLiveOutboundSession(sessionId)).toBe(true)
    expect(live.minimized).toBe(true)
    expect(live.callStatus).toBe('connected')
  })

  it('drops a stale dial once the call is cleared', () => {
    const sessionId = startLiveOutboundCall({
      call: { id: 'c1', leadName: 'Ava' },
    })
    clearLiveOutboundCall()
    expect(isLiveOutboundSession(sessionId)).toBe(false)
    expect(getLiveOutboundCallState().call).toBeNull()
  })
})