'use client'

import { AlertTriangle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'

/**
 * In-app replacement for window.confirm().
 *
 *   <ConfirmDialog
 *     open={!!pending}
 *     title="Move this class?"
 *     description="Only this session changes teacher."
 *     warnings={["Yolanda already has an appointment at that time."]}
 *     confirmLabel="Move"
 *     onConfirm={...}
 *     onCancel={...}
 *   />
 *
 * `warnings` render as a highlighted list under the description; `tone="destructive"`
 * makes the confirm button red for deletions.
 */
export function ConfirmDialog({
  open,
  title,
  description,
  warnings = [],
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  tone = 'default',
  busy = false,
  onConfirm,
  onCancel,
}) {
  return (
    <Dialog open={open} onClose={busy ? undefined : onCancel} maxWidth="sm">
      <DialogContent className="space-y-4">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          {description ? <DialogDescription>{description}</DialogDescription> : null}
        </DialogHeader>

        {warnings.length > 0 && (
          <ul className="space-y-2 rounded-lg border border-warning/30 bg-warning/10 px-3 py-2.5">
            {warnings.map((w) => (
              <li key={w} className="flex items-start gap-2 text-[13px] leading-relaxed text-warning">
                <AlertTriangle className="mt-0.5 h-3.5 w-3.5 shrink-0" />
                <span>{w}</span>
              </li>
            ))}
          </ul>
        )}

        <DialogFooter className="gap-2 sm:gap-0">
          <Button type="button" variant="outline" onClick={onCancel} disabled={busy}>
            {cancelLabel}
          </Button>
          <Button
            type="button"
            variant={tone === 'destructive' ? 'destructive' : 'default'}
            onClick={onConfirm}
            disabled={busy}
            autoFocus
          >
            {confirmLabel}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
