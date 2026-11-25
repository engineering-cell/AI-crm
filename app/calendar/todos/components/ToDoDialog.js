'use client'

import { useState, useEffect } from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import api from '@/lib/api'
import { toast } from '@/components/ui/toast'
import LocationSelector from '@/components/shared/LocationSelector'
import Switch from '@/components/ui/switch'

const EMPTY_FORM = {
  name: '',
  locationID: [],
  duration: '',
  color: '#6366f1',
  includeInLessonsTaught: false,
}

export default function ToDoDialog({ open, onClose, todo, onRefresh }) {
  const isEdit = Boolean(todo)
  const [form, setForm] = useState(EMPTY_FORM)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    if (!open) return
    if (todo) {
      setForm({
        name: todo.name || '',
        locationID: Array.isArray(todo.locationID)
          ? todo.locationID.map((l) => l?._id ?? l).filter(Boolean)
          : todo.locationID?._id
            ? [todo.locationID._id]
            : todo.locationID
              ? [todo.locationID]
              : [],
        duration: todo.duration ?? '',
        color: todo.color || '#6366f1',
        includeInLessonsTaught: todo.includeInLessonsTaught === true,
      })
    } else {
      setForm(EMPTY_FORM)
    }
  }, [open, todo])

  function set(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    if (!form.name) {
      toast.error('Missing fields', { description: 'Name is required.' })
      return
    }
    if (!form.locationID?.length) {
      toast.error('Missing fields', { description: 'Please select at least one location.' })
      return
    }
    setSaving(true)
    try {
      const payload = {
        name: form.name,
        locationID: form.locationID,
        duration: form.duration === '' ? 50 : Number(form.duration),
        color: form.color || undefined,
        includeInLessonsTaught: form.includeInLessonsTaught === true,
      }
      const result = isEdit
        ? await api.put(`/api/todo/${todo._id}`, payload)
        : await api.post('/api/todo', payload)

      if (result.success) {
        toast.success(isEdit ? 'To-do updated' : 'To-do created')
        onRefresh()
        onClose()
      } else {
        toast.error('Failed', { description: result.error })
      }
    } finally {
      setSaving(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={(v) => { if (!v) onClose() }}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>{isEdit ? 'Edit To-Do' : 'Add To-Do'}</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4 py-2">
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="todo-name">Name</Label>
            <Input
              id="todo-name"
              placeholder="To-do name"
              value={form.name}
              onChange={(e) => set('name', e.target.value)}
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <Label>Location</Label>
            <LocationSelector
              value={form.locationID}
              onChange={(ids) => set('locationID', ids)}
              multiple={true}
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="todo-duration">Duration (min)</Label>
            <Input
              id="todo-duration"
              type="number"
              min="0"
              placeholder="50"
              value={form.duration}
              onChange={(e) => set('duration', e.target.value)}
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="todo-color">Color</Label>
            <div className="flex items-center gap-3">
              <input
                id="todo-color"
                type="color"
                value={form.color || '#6366f1'}
                onChange={(e) => set('color', e.target.value)}
                className="h-9 w-12 rounded border border-border bg-background p-1"
              />
              <Input
                value={form.color}
                onChange={(e) => set('color', e.target.value)}
                placeholder="#6366f1"
                className="font-mono"
              />
            </div>
          </div>

          <div className="flex items-start justify-between gap-4 rounded-lg border border-border px-3 py-2.5">
            <div className="flex flex-col gap-0.5">
              <Label htmlFor="todo-lessons-taught" className="cursor-pointer">
                Include in Lessons Taught report
              </Label>
              <p className="text-[12px] text-muted-foreground">
                Count each completed {form.name ? `"${form.name}"` : 'to-do'} as a session the teacher taught.
                Leave off for time blocks that aren&apos;t lessons.
              </p>
            </div>
            <Switch
              id="todo-lessons-taught"
              aria-label="Include in Lessons Taught report"
              checked={form.includeInLessonsTaught}
              onCheckedChange={(v) => set('includeInLessonsTaught', v)}
            />
          </div>

          <DialogFooter className="pt-2">
            <Button type="button" variant="outline" onClick={onClose} disabled={saving}>
              Cancel
            </Button>
            <Button type="submit" disabled={saving}>
              {saving ? 'Saving…' : isEdit ? 'Save changes' : 'Create to-do'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
