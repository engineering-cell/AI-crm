'use client'

import { useSyncExternalStore } from 'react'

/**
 * A callback dial stays up across Call Center tabs and the rest of the app.
 * The panel is mounted once in LiveCallHost, not on the callbacks page.
 */

const EMPTY = Object.freeze({
  call: null,
  connection: null,
  callStatus: 'connecting',
  minimized: false,
  canManage: true,
})

let state = { ...EMPTY }
const listeners = new Set()
let session = 0
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

export function getLiveOutboundCallState() {
  return state
}

export function subscribeLiveOutboundCall(listener) {
  listeners.add(listener)
  return () => listeners.delete(listener)
}

export function hasLiveOutboundCall() {
  return Boolean(state.call || state.connection)
}

export function noteUserEndedLiveOutboundCall() {
  ignoreRemoteEnd = true
}

export function takeOutboundEndSuppressed() {
  if (!ignoreRemoteEnd) return false
  ignoreRemoteEnd = false
  return true
}

export function startLiveOutboundCall({
  call,
  callStatus = 'connecting',
  canManage = true,
} = {}) {
  if (!call) return 0
  ignoreRemoteEnd = false
  session += 1
  setState({
    call,
    connection: null,
    callStatus: callStatus || 'connecting',
    minimized: false,
    canManage: Boolean(canManage),
  })
  return session
}

export function isLiveOutboundSession(id) {
  return Boolean(id) && session === id && Boolean(state.call)
}

export function patchLiveOutboundCall(patch = {}) {
  if (!state.call) return state
  return setState(patch)
}

export function setLiveOutboundCallMinimized(minimized) {
  if (!state.call) return state
  return setState({ minimized: Boolean(minimized) })
}

export function clearLiveOutboundCall() {
  session += 1
  state = { ...EMPTY }
  emit()
  return state
}

export function useLiveOutboundCall() {
  return useSyncExternalStore(
    subscribeLiveOutboundCall,
    getLiveOutboundCallState,
    getLiveOutboundCallState,
  )
}
