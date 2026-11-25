/**
 * Paint every group class session with the organisation's group colour. With no colour set,
 * events are returned untouched. Cancelled classes stay grey.
 */
export function applyGroupColor(events, groupColor) {
  if (!groupColor) return events
  return events.map((event) => {
    const props = event.extendedProps
    if (props?.eventType !== 'lesson' || props.effectiveStatus === 'cancelled') return event
    return { ...event, extendedProps: { ...props, color: groupColor } }
  })
}
