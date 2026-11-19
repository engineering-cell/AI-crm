// Who booked a lesson and when — shown on the lesson details panel and the calendar
// hover card. `createdBy` is the staff login (populated by the API to {name,email,role});
// `createdVia` covers bookings that have no staff login behind them.

const VIA_LABELS = {
  staff: 'Staff',
  ai_agent: 'AI assistant',
  online_intro_booking: 'Online intro booking',
  payment_link: 'Payment link',
}

export function describeBooking(raw) {
  if (!raw) return { by: null, email: null, role: null, at: null }
  const user = raw.createdBy && typeof raw.createdBy === 'object' ? raw.createdBy : null
  const name = user?.name ? String(user.name).trim() : ''
  const via = raw.createdVia ? String(raw.createdVia) : ''
  const at = raw.createdAt || null

  if (name) {
    return { by: name, email: user.email || null, role: user.role || null, at }
  }
  if (via) {
    return { by: VIA_LABELS[via] || via.replace(/_/g, ' '), email: null, role: null, at }
  }
  return { by: null, email: null, role: null, at }
}

export function escapeHtml(value) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}
