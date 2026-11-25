'use client'

import { useSyncExternalStore } from 'react'

/**
 * Module store for a live human-queue call.
 * Survives Call Center tab changes and page navigations because the UI host
 * mounts once in Providers — not on the human-queue page.
 */

const EMPTY = Object.freeze({
  call: null,
  connection: null,
  callStatus: 'idle',
  minimized: false,
  canManage: true,
  resolving: false,
})

let state = { ...EMPTY }
const listeners = new Set()
let session = 0
let answerLock = false
let ignoreRemoteEnd = false

function emit() {
  for (const listener of listeners) {
    try {
      listener(state)
    } catch {
      // ignore subscriber errors
    }
  }
}

function setState(patch) {
  state = { ...state, ...patch }
  emit()
  return state
}

export function getLiveQueueCallState() {
  return state
}

export function subscribeLiveQueueCall(listener) {
  listeners.add(listener)
  return () => listeners.delete(listener)
}

export function hasLiveQueueCall() {
  return Boolean(state.call || state.connection || answerLock)
}

/** Synchronous guard so two Answer clicks cannot both claim. */
export function beginQueueAnswer() {
  if (answerLock || state.call || state.connection) return false
  answerLock = true
  return true
}

export function finishQueueAnswer() {
  answerLock = false
}

/**
 * Staff hangup / resolve / logout. The Twilio disconnect and the status poll
 * must not also toast "the caller hung up".
 */
export function noteUserEndedLiveQueueCall() {
  ignoreRemoteEnd = true
}

export function takeRemoteEndSuppressed() {
  if (!ignoreRemoteEnd) return false
  ignoreRemoteEnd = false
  return true
}

export function startLiveQueueCall({
  call,
  connection = null,
  callStatus = 'connecting',
  canManage = true,
} = {}) {
  if (!call) return 0
  ignoreRemoteEnd = false
  session += 1
  setState({
    call,
    connection: connection || null,
    callStatus: callStatus || 'connecting',
    minimized: false,
    canManage: Boolean(canManage),
    resolving: false,
  })
  return session
}

export function isLiveQueueSession(id) {
  return Boolean(id) && session === id && Boolean(state.call)
}

export function patchLiveQueueCall(patch = {}) {
  // A late poll must not recreate a call the staff member already left.
  if (!state.call) return state
  return setState(patch)
}

/** Copy for a queue row that is no longer live. Null while the call is still up. */
export function liveQueueEndMessage(item) {
  if (!item || !['abandoned', 'resolved'].includes(item.status)) return null
  if (item.endedReason === 'customer_hangup') return 'The caller hung up.'
  if (item.status === 'resolved') return 'This call was resolved.'
  return 'The call has ended.'
}

/** Incoming card stays up on every page, including over a minimized live call. */
export function shouldShowIncomingCallPopup({
  nextCall,
  enabled,
  online,
  canAnswer,
  call,
  minimized,
} = {}) {
  if (!nextCall || !enabled || !online || !canAnswer) return false
  return !(call && !minimized)
}

export function setLiveQueueCallMinimized(minimized) {
  if (!state.call) return state
  return setState({ minimized: Boolean(minimized) })
}

export function clearLiveQueueCall() {
  session += 1
  answerLock = false
  state = { ...EMPTY }
  emit()
  return state
}

/** React hook — re-renders when the live queue call store changes. */
export function useLiveQueueCall() {
  return useSyncExternalStore(
    subscribeLiveQueueCall,
    getLiveQueueCallState,
    getLiveQueueCallState,
  )
}
