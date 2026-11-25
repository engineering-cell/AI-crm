'use client'

import { useEffect, useState } from 'react'
import { toast } from '@/components/ui/toast'

/** One colour for every group class on the calendar. */
export default function GroupColorPicker({ color, onSave }) {
  // The native picker reports every shade while it is dragged; only the one the user
  // settles on is saved.
  const [draft, setDraft] = useState(null)

  useEffect(() => {
    if (!draft) return
    const timer = setTimeout(async () => {
      const res = await onSave(draft)
      setDraft(null)
      if (!res.success) toast.error(res.error || "Couldn't save the group colour.")
    }, 500)
    return () => clearTimeout(timer)
  }, [draft, onSave])

  async function reset() {
    setDraft(null)
    const res = await onSave(null)
    if (!res.success) toast.error(res.error || "Couldn't reset the group colour.")
  }

  return (
    <div className="flex items-center gap-2">
      <label className="flex cursor-pointer items-center gap-2 text-xs text-muted-foreground">
        Colour for all groups
        <input
          type="color"
          value={draft || color || '#6366f1'}
          onChange={(e) => setDraft(e.target.value)}
          className="h-9 w-11 cursor-pointer rounded border border-border bg-background p-1"
        />
      </label>
      {color ? (
        <button type="button" onClick={reset} className="text-xs font-medium text-brand hover:underline">
          Reset
        </button>
      ) : (
        <span className="text-xs text-muted-foreground/70">Not set</span>
      )}
    </div>
  )
}
