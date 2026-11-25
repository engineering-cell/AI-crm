import { describe, it, expect } from 'vitest'
import { applyGroupColor } from '@/lib/groupColor'

const event = (eventType, effectiveStatus = 'scheduled') => ({
  id: eventType + effectiveStatus,
  extendedProps: { eventType, effectiveStatus, color: '#111111' },
})
const colors = (events) => events.map((e) => e.extendedProps.color)

describe('applyGroupColor', () => {
  it('paints group classes, completed ones included, and nothing else', () => {
    const events = [event('lesson'), event('lesson', 'completed'), event('private'), event('trial'), event('event')]
    expect(colors(applyGroupColor(events, '#ff0000'))).toEqual(['#ff0000', '#ff0000', '#111111', '#111111', '#111111'])
  })

  it('leaves a cancelled class grey', () => {
    expect(colors(applyGroupColor([event('lesson', 'cancelled')], '#ff0000'))).toEqual(['#111111'])
  })

  it('restores the original colours once the group colour is cleared', () => {
    const events = [event('lesson')]
    applyGroupColor(events, '#ff0000')
    expect(applyGroupColor(events, null)).toBe(events)
    expect(colors(events)).toEqual(['#111111'])
  })
})
