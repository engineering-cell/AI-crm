'use client'

import { useCallback, useEffect, useState } from 'react'
import { Workflow as WorkflowIcon } from 'lucide-react'
import api from '@/lib/api'
import { Switch } from '@/components/ui/switch'
import { useToast } from '@/components/ui/toast'
import { formatDateTime } from '@/lib/utils'
import { hasPermission } from '@/lib/permissions'

/**
 * Lead profile: every workflow matching this lead (enrolled or not), with a switch per workflow.
 * Off  → lead exits the workflow and its upcoming campaign steps are cancelled.
 * On   → re-enrolls right away if the lead still matches the workflow's audience.
 */
export default function LeadWorkflowsSection({ leadId }) {
  const toast = useToast()
  const [rows, setRows] = useState(null) // null = loading
  const [busyId, setBusyId] = useState(null)
  const canEdit = hasPermission('leads', 'manage', 'edit')

  const load = useCallback(async () => {
    if (!leadId) return
    const res = await api.get(`/api/lead/${leadId}/workflows`)
    setRows(res?.success && Array.isArray(res.data) ? res.data : [])
  }, [leadId])

  useEffect(() => {
    setRows(null)
    load()
  }, [load])

  async function toggle(row, enabled) {
    if (busyId) return
    setBusyId(String(row.workflowID))
    // Optimistic flip so the switch feels instant; reload reconciles with the server.
    setRows((prev) =>
      (prev || []).map((r) =>
        r.workflowID === row.workflowID
          ? { ...r, enrolled: enabled, excluded: !enabled, ...(enabled ? {} : { upcomingSteps: 0, nextStepAt: null }) }
          : r,
      ),
    )
    const res = await api.put(`/api/lead/${leadId}/workflows/${row.workflowID}`, { enabled })
    if (!res?.success) {
      toast.error({ title: 'Workflow not updated', message: res?.error || 'Could not update this workflow.' })
    } else if (enabled && res.data && res.data.enrolled === false) {
      toast.info({ title: 'Not enrolled yet', message: res.message })
    } else {
      toast.success({ title: enabled ? 'Added to workflow' : 'Removed from workflow', message: res.message })
    }
    await load()
    setBusyId(null)
  }

  return (
    <div className="border-t pt-4">
      <label className="flex items-center gap-1.5 text-sm font-medium mb-1">
        <WorkflowIcon className="h-3.5 w-3.5 text-muted-foreground" />
        Workflows
      </label>
      <p className="text-xs text-muted-foreground mb-3">
        Turn a workflow off to remove this lead from it. Their upcoming messages and calls from that workflow are cancelled.
      </p>

      {rows === null ? (
        <p className="text-xs text-muted-foreground">Loading workflows…</p>
      ) : rows.length === 0 ? (
        <p className="text-xs text-muted-foreground">No workflows match this lead right now.</p>
      ) : (
        <div className="space-y-2">
          {rows.map((row) => {
            const on = Boolean(row.enrolled)
            const busy = busyId === String(row.workflowID)
            return (
              <div
                key={row.workflowID}
                className="flex items-center justify-between gap-4 rounded-lg border border-border bg-muted/20 px-4 py-3"
              >
                <div className="min-w-0">
                  <div className="truncate text-sm font-medium">{row.name}</div>
                  <p className="mt-0.5 text-xs text-muted-foreground">
                    {on
                      ? row.campaignStatus === 'paused'
                        ? 'Enrolled · paused'
                        : `Enrolled · ${row.upcomingSteps} upcoming step${row.upcomingSteps === 1 ? '' : 's'}${
                            row.nextStepAt ? ` · next ${formatDateTime(row.nextStepAt)}` : ''
                          }`
                      : row.excluded
                        ? 'Removed — will not be re-enrolled automatically'
                        : 'Matches this lead · not enrolled'}
                    {row.workflowStatus === 'inactive' ? ' · workflow inactive' : ''}
                  </p>
                </div>
                <Switch
                  checked={on}
                  onCheckedChange={(checked) => toggle(row, checked)}
                  disabled={!canEdit || busy}
                  aria-label={`${on ? 'Remove lead from' : 'Add lead to'} ${row.name}`}
                />
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
