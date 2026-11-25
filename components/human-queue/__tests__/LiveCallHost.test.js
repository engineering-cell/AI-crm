import { act, cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import {
  clearLiveQueueCall,
  getLiveQueueCallState,
  startLiveQueueCall,
} from '@/lib/liveQueueCallStore'

const auth = vi.hoisted(() => ({ authed: true }))
const nav = vi.hoisted(() => ({ path: '/customers' }))
const toast = vi.hoisted(() => ({
  info: vi.fn(),
  error: vi.fn(),
  success: vi.fn(),
}))
const apiMock = vi.hoisted(() => ({
  get: vi.fn(),
  post: vi.fn(),
}))

vi.mock('@/lib/auth', () => ({
  isAuthenticated: () => auth.authed,
}))

vi.mock('next/navigation', () => ({
  usePathname: () => nav.path,
  useRouter: () => ({ push: vi.fn(), replace: vi.fn() }),
}))

vi.mock('@/components/ui/toast', () => ({
  useToast: () => toast,
}))

vi.mock('@/lib/api', () => ({
  default: apiMock,
}))

vi.mock('@/components/human-queue/GlobalIncomingCallAlert', () => ({
  default: function IncomingAlert() {
    return <div data-testid="incoming-alert" />
  },
}))

import LiveCallHost from '@/components/human-queue/LiveCallHost'

function fakeConnection({ status = 'open', disconnects = 1 } = {}) {
  const listeners = {}
  const connection = {
    closed: false,
    status: () => status,
    isMuted: () => false,
    mute() {},
    on(event, fn) {
      listeners[event] = listeners[event] || []
      listeners[event].push(fn)
    },
    off(event, fn) {
      listeners[event] = (listeners[event] || []).filter((item) => item !== fn)
    },
    disconnect() {
      if (this.closed) return
      this.closed = true
      const fns = (listeners.disconnect || []).slice()
      for (let i = 0; i < disconnects; i += 1) fns.forEach((fn) => fn())
    },
    emit(event) {
      ;(listeners[event] || []).slice().forEach((fn) => fn())
    },
  }
  return connection
}

function caller() {
  return {
    id: 'q1',
    leadName: 'Ava Brooks',
    phone: '+14045550123',
    createdAt: '2026-11-19T12:00:00.000Z',
    escalationReason: 'Asked for a person',
    status: 'in_progress',
  }
}

async function showHost() {
  let view
  await act(async () => {
    view = render(<LiveCallHost />)
  })
  await screen.findByTestId('incoming-alert')
  return view
}

async function openCall(connection, callStatus = 'connecting') {
  await act(async () => {
    startLiveQueueCall({
      call: caller(),
      connection,
      callStatus,
      canManage: true,
    })
  })
}

describe('LiveCallHost', () => {
  beforeEach(() => {
    auth.authed = true
    nav.path = '/customers'
    clearLiveQueueCall()
    toast.info.mockClear()
    toast.error.mockClear()
    toast.success.mockClear()
    apiMock.get.mockReset()
    apiMock.post.mockReset()
    apiMock.get.mockResolvedValue({
      success: true,
      data: { ...caller(), status: 'in_progress' },
    })
    apiMock.post.mockResolvedValue({ success: true })
  })

  afterEach(() => {
    cleanup()
    clearLiveQueueCall()
  })

  it('keeps the incoming alert mounted once the staff member is signed in', async () => {
    auth.authed = false
    let view
    await act(async () => {
      view = render(<LiveCallHost />)
    })
    expect(screen.queryByTestId('incoming-alert')).toBeNull()

    auth.authed = true
    nav.path = '/inbox/human-queue'
    await act(async () => {
      view.rerender(<LiveCallHost />)
    })
    expect(await screen.findByTestId('incoming-alert')).toBeTruthy()
  })

  it('shows the live panel from the store and marks an open connection connected', async () => {
    await showHost()
    const connection = fakeConnection({ status: 'open' })
    await openCall(connection)
    expect(await screen.findByText('Live call')).toBeTruthy()
    expect(screen.getByText('Ava Brooks')).toBeTruthy()
    expect(screen.getByRole('button', { name: /Resolve & close/ })).toBeTruthy()
    expect(getLiveQueueCallState().callStatus).toBe('connected')
  })

  it('keeps minimize across a queue refresh', async () => {
    let resolveGet
    apiMock.get.mockImplementation(() => new Promise((resolve) => {
      resolveGet = resolve
    }))
    await showHost()
    await openCall(fakeConnection())
    await screen.findByText('Live call')

    fireEvent.click(screen.getAllByTitle('Minimize')[0])
    expect(getLiveQueueCallState().minimized).toBe(true)
    expect(screen.queryByText('Live call')).toBeNull()
    expect(screen.getByText('Ava Brooks')).toBeTruthy()

    await act(async () => {
      resolveGet({
        success: true,
        data: { ...caller(), status: 'in_progress', assignedUserId: 'agent-1' },
      })
    })
    await waitFor(() => {
      expect(getLiveQueueCallState().call.assignedUserId).toBe('agent-1')
    })
    expect(getLiveQueueCallState().minimized).toBe(true)
    expect(screen.queryByText('Hang up')).toBeNull()
  })

  it('toasts once when the caller hangs up, even if disconnect fires twice', async () => {
    await showHost()
    const connection = fakeConnection({ disconnects: 2 })
    await openCall(connection)
    await screen.findByText('Live call')

    await act(async () => {
      connection.emit('disconnect')
    })

    await waitFor(() => {
      expect(screen.queryByText('Ava Brooks')).toBeNull()
    })
    const remote = toast.info.mock.calls.filter((call) => call[0]?.message === 'The call has ended.')
    expect(remote).toHaveLength(1)
    expect(getLiveQueueCallState().call).toBeNull()
    expect(connection.closed).toBe(true)
  })

  it('closes from the queue poll when the caller, a resolve, or the conference ends', async () => {
    const cases = [
      [{ status: 'abandoned', endedReason: 'customer_hangup' }, 'The caller hung up.'],
      [{ status: 'resolved', endedReason: 'agent_resolve' }, 'This call was resolved.'],
      [{ status: 'abandoned', endedReason: 'conference_end' }, 'The call has ended.'],
    ]

    for (const [patch, message] of cases) {
      toast.info.mockClear()
      clearLiveQueueCall()
      cleanup()
      apiMock.get.mockResolvedValue({ success: true, data: { ...caller(), ...patch } })
      await showHost()
      await openCall(fakeConnection())
      await waitFor(() => {
        expect(toast.info).toHaveBeenCalledWith({ title: 'Call disconnected', message })
      })
      expect(getLiveQueueCallState().call).toBeNull()
    }
  })

  it('hangup and resolve do not also toast that the caller hung up', async () => {
    await showHost()
    await openCall(fakeConnection())
    await screen.findByText('Live call')

    fireEvent.click(screen.getByRole('button', { name: 'Hang up' }))
    expect(getLiveQueueCallState().call).toBeNull()
    expect(toast.info).toHaveBeenCalledTimes(1)
    expect(toast.info.mock.calls[0][0].title).toBe('Call ended')

    toast.info.mockClear()
    toast.success.mockClear()
    await openCall(fakeConnection())
    await screen.findByText('Live call')
    fireEvent.click(screen.getByRole('button', { name: /Resolve & close/ }))
    await waitFor(() => {
      expect(apiMock.post).toHaveBeenCalledWith('/api/human-queue/q1/resolve', {})
    })
    expect(getLiveQueueCallState().call).toBeNull()
    expect(toast.success).toHaveBeenCalledWith({ title: 'Resolved', message: 'Call marked as resolved.' })
    expect(toast.info).not.toHaveBeenCalled()
  })

  it('drops the browser audio when a connecting call is closed', async () => {
    await showHost()
    const connection = fakeConnection({ status: 'connecting' })
    await openCall(connection, 'connecting')
    expect(await screen.findByText('Connecting…')).toBeTruthy()

    fireEvent.click(screen.getByTitle('Close'))
    expect(connection.closed).toBe(true)
    expect(getLiveQueueCallState().call).toBeNull()
    expect(toast.info).not.toHaveBeenCalled()
  })

  it('hold and a failed hold stay on the panel', async () => {
    await showHost()
    await openCall(fakeConnection())
    await screen.findByText('Live call')

    fireEvent.click(screen.getByRole('button', { name: 'Hold' }))
    await waitFor(() => {
      expect(apiMock.post).toHaveBeenCalledWith('/api/human-queue/q1/hold', {})
    })
    expect(await screen.findByRole('button', { name: 'Resume' })).toBeTruthy()
    expect(getLiveQueueCallState().callStatus).toBe('on_hold')

    apiMock.post.mockResolvedValueOnce({ success: false, error: 'Hold busy' })
    fireEvent.click(screen.getByRole('button', { name: 'Resume' }))
    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith({ title: 'Hold failed', message: 'Hold busy' })
    })
    expect(screen.getByRole('button', { name: 'Resume' })).toBeTruthy()
    expect(getLiveQueueCallState().callStatus).toBe('on_hold')
  })

  it('drops the live call when the staff member signs out', async () => {
    const view = await showHost()
    const connection = fakeConnection()
    await openCall(connection)
    await screen.findByText('Live call')

    auth.authed = false
    nav.path = '/login'
    await act(async () => {
      view.rerender(<LiveCallHost />)
    })

    await waitFor(() => {
      expect(getLiveQueueCallState().call).toBeNull()
    })
    expect(connection.closed).toBe(true)
    expect(screen.queryByTestId('incoming-alert')).toBeNull()
  })
})
