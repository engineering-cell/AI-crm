'use client'

import { useRouter } from 'next/navigation'
import { Table2 } from 'lucide-react'
import { setDashboardDetailsRequest } from '@/lib/dashboardDetailsStore'

/**
 * Self-contained "Show full details" trigger for an owner-overview widget —
 * stashes its drill-down request (metric/rangeDays/params/columns, hitting
 * /api/dashboard/owner-overview/details) and navigates to the shared details
 * page instead of opening a modal.
 */
export default function DetailsButton({ title, metric, rangeDays, params, columns, drill }) {
  const router = useRouter()

  function handleClick() {
    setDashboardDetailsRequest({ source: 'owner', title, metric, rangeDays, params, columns, drill, backHref: '/dashboard' })
    router.push('/dashboard/details')
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      title="Show full details"
      className="flex items-center gap-1 rounded-lg border border-border px-2 py-1 text-[11px] font-medium text-muted-foreground transition-colors hover:bg-muted/60 hover:text-foreground"
    >
      <Table2 className="h-3 w-3" />
      Details
    </button>
  )
}
