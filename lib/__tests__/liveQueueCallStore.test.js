import { describe, expect, it, beforeEach } from 'vitest'
import {
  beginQueueAnswer,
  clearLiveQueueCall,
  finishQueueAnswer,
  getLiveQueueCallState,
  hasLiveQueueCall,
  isLiveQueueSession,
  liveQueueEndMessage,
  noteUserEndedLiveQueueCall,
  patchLiveQueueCall,
  setLiveQueueCallMinimized,
  shouldShowIncomingCallPopup,
  startLiveQueueCall,
  subscribeLiveQueueCall,
  takeRemoteEndSuppressed,
} from '@/lib/liveQueueCallStore'

describe('liveQueueCallStore', () => {
  beforeEach(() => {
    clearLiveQueueCall()
    finishQueueAnswer()
    takeRemoteEndSuppressed()
  })

  it('keeps minimize across a call patch and drops it when the call is cleared', () => {
    const sessionId = startLiveQueueCall({
      call: { id: 'q1', leadName: 'Ava' },
      callStatus: 'connecting',
    })
    setLiveQueueCallMinimized(true)
    patchLiveQueueCall({
      call: { id: 'q1', leadName: 'Ava', status: 'in_progress' },
      connection: { id: 'conn' },
      callStatus: 'connected',
    })

    const live = getLiveQueueCallState()
    expect(isLiveQueueSession(sessionId)).toBe(true)
    expect(live.minimized).toBe(true)
    expect(live.callStatus).toBe('connected')
    expect(live.connection.id).toBe('conn')

    clearLiveQueueCall()
    expect(isLiveQueueSession(sessionId)).toBe(false)
    expect(getLiveQueueCallState().call).toBeNull()
    expect(getLiveQueueCallState().minimized).toBe(false)
  })

  it('blocks a second answer until the first claim finishes', () => {
    expect(beginQueueAnswer()).toBe(true)
    expect(beginQueueAnswer()).toBe(false)
    expect(hasLiveQueueCall()).toBe(true)
    finishQueueAnswer()
    expect(hasLiveQueueCall()).toBe(false)
  })

  it('blocks another answer while a call is already on screen', () => {
    startLiveQueueCall({ call: { id: 'q1' } })
    expect(beginQueueAnswer()).toBe(false)
    expect(hasLiveQueueCall()).toBe(true)
  })

  it('suppresses one remote-end notice after the staff member hangs up', () => {
    startLiveQueueCall({ call: { id: 'q1' }, connection: { id: 'c' } })
    noteUserEndedLiveQueueCall()
    expect(takeRemoteEndSuppressed()).toBe(true)
    expect(takeRemoteEndSuppressed()).toBe(false)
  })

  it('a new answer clears a leftover staff-end flag', () => {
    noteUserEndedLiveQueueCall()
    startLiveQueueCall({ call: { id: 'q2' } })
    expect(takeRemoteEndSuppressed()).toBe(false)
  })

  it('a late patch cannot bring back a call that was cleared', () => {
    startLiveQueueCall({ call: { id: 'q1', status: 'claimed' }, connection: { id: 'c' } })
    clearLiveQueueCall()
    patchLiveQueueCall({ call: { id: 'q1', status: 'in_progress' } })
    expect(getLiveQueueCallState().call).toBeNull()
    expect(hasLiveQueueCall()).toBe(false)
  })

  it('clearing invalidates the in-flight answer session and releases the lock', () => {
    expect(beginQueueAnswer()).toBe(true)
    const sessionId = startLiveQueueCall({ call: { id: 'q1' } })
    expect(isLiveQueueSession(sessionId)).toBe(true)
    clearLiveQueueCall()
    expect(isLiveQueueSession(sessionId)).toBe(false)
    expect(beginQueueAnswer()).toBe(true)
    finishQueueAnswer()
  })

  it('does not minimize when nothing is live, and notifies subscribers', () => {
    const seen = []
    const stop = subscribeLiveQueueCall((next) => seen.push(next.call?.id || null))
    setLiveQueueCallMinimized(true)
    expect(getLiveQueueCallState().minimized).toBe(false)
    startLiveQueueCall({ call: { id: 'q9' } })
    setLiveQueueCallMinimized(true)
    clearLiveQueueCall()
    stop()
    expect(seen).toEqual(['q9', 'q9', null])
  })

  it('describes why a queue call closed', () => {
    expect(liveQueueEndMessage({ status: 'in_progress' })).toBeNull()
    expect(liveQueueEndMessage({ status: 'abandoned', endedReason: 'customer_hangup' })).toBe('The caller hung up.')
    expect(liveQueueEndMessage({ status: 'resolved', endedReason: 'agent_resolve' })).toBe('This call was resolved.')
    expect(liveQueueEndMessage({ status: 'abandoned', endedReason: 'conference_end' })).toBe('The call has ended.')
    expect(liveQueueEndMessage(null)).toBeNull()
  })

  it('shows the incoming card on every page except over an expanded live call', () => {
    const waiting = { id: 'w1' }
    const base = { nextCall: waiting, enabled: true, online: true, canAnswer: true }
    expect(shouldShowIncomingCallPopup(base)).toBe(true)
    expect(shouldShowIncomingCallPopup({ ...base, nextCall: null })).toBe(false)
    expect(shouldShowIncomingCallPopup({ ...base, enabled: false })).toBe(false)
    expect(shouldShowIncomingCallPopup({ ...base, online: false })).toBe(false)
    expect(shouldShowIncomingCallPopup({ ...base, canAnswer: false })).toBe(false)
    expect(shouldShowIncomingCallPopup({ ...base, call: { id: 'q1' }, minimized: false })).toBe(false)
    expect(shouldShowIncomingCallPopup({ ...base, call: { id: 'q1' }, minimized: true })).toBe(true)
  })
})
