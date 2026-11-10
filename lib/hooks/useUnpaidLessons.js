'use client'

import { useEffect, useState } from 'react'
import api from '@/lib/api'
import { membershipCoverageFor, summarizeUnpaidLessons, describeUnpaidLessons } from '@/lib/event-payment'

/**
 * How many lessons a student has taken or booked that nobody paid for, for the profile's
 * Services → Lessons row. Loads the student's whole lesson history (the same call and
 * window as the Lessons tab) — the page summary only holds the last year, and an old
 * unpaid class must still raise the flag.
 *
 * `refreshKey` is any value that changes when the page reloads its data.
 * Pass a null customerID to stay idle.
 */
export function useUnpaidLessons(customerID, refreshKey) {
  const [unpaid, setUnpaid] = useState(null)

  useEffect(() => {
    if (!customerID) { setUnpaid(null); return }
    let stopped = false
    const future = new Date()
    future.setFullYear(future.getFullYear() + 1)
    const params = new URLSearchParams({ start: new Date('1990-01-01').toISOString(), end: future.toISOString() })
    Promise.all([
      api.get(`/api/calendar/customer/${customerID}?${params}`),
      api.get(`/api/customer-membership/customer/${customerID}`),
    ]).then(([evRes, memRes]) => {
      if (stopped || !evRes.success || !Array.isArray(evRes.data)) return
      const coverage = membershipCoverageFor(customerID, memRes.success ? memRes.data : [])
      const counts = summarizeUnpaidLessons(evRes.data, { membershipCoverageSet: coverage, customerID })
      setUnpaid({ ...counts, text: describeUnpaidLessons(counts) })
    })
    return () => { stopped = true }
  }, [customerID, refreshKey])

  return unpaid
}
