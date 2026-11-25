function dateBoundary(value, nextDay = false) {
  const boundary = new Date(`${value}T00:00:00`)
  if (nextDay) boundary.setDate(boundary.getDate() + 1)
  return boundary.toISOString()
}

export function reviewCaseListPath({ status, page = 1, limit = 20, range = {} }) {
  const params = new URLSearchParams({ status, page: String(page), limit: String(limit) })
  if (range.from) params.set('createdFrom', dateBoundary(range.from))
  if (range.to) params.set('createdBefore', dateBoundary(range.to, true))
  return `/api/sms-reply-reviews?${params.toString()}`
}
