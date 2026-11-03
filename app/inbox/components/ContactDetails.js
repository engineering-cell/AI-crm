import { useEffect, useState } from 'react'
import { Pin, Trash2, X } from 'lucide-react'
import api from '@/lib/api'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Switch } from '@/components/ui/switch'
import { Textarea } from '@/components/ui/textarea'
import { useToast } from '@/components/ui/toast'
import { formatDateTime, getInitials, nameWithMembers } from '@/lib/utils'

export default function ContactDetails({
  contact,
  leadData,
  onClose,
  aiRepliesOn = true,
  aiToggleSaving = false,
  onToggleAiReplies = null,
  contactKind = null,
  onContactPatched = null,
}) {
  if (!contact) return null

  // Use leadData (full API response) when available, fall back to contact
  const lead = leadData || {}
  const name = nameWithMembers(lead) || contact.name
  const email = lead.email || contact.email || ''
  const phoneNumber = lead.phoneNumber || contact.phoneNumber || ''
  const stage = lead.stage ? capitalize(lead.stage) : null
  const bookingStatus = lead.bookingStatus || null
  const rawLocation = lead.location || null
  // Guard against raw ObjectIds stored in the location field (legacy data issue)
  const location = rawLocation && /^[a-f0-9]{24}$/i.test(rawLocation) ? null : rawLocation
  const isEscalated = lead.isEscalated ?? null
  const assignedAiAgent = lead.assignedAiAgent || null
  const assignedHumanAgent = lead.assignedHumanAgent || null
  const activeSalesJourney = Array.isArray(lead.flowInstances) && lead.flowInstances.length > 0
    ? `${lead.flowInstances.length} active flow${lead.flowInstances.length > 1 ? 's' : ''}`
    : null

  return (
    <aside
      className="bg-card h-full w-full border-l-0 lg:border-l border-border rounded-none lg:rounded-r-lg overflow-y-auto lg:min-w-[280px] lg:max-w-[340px]"
      style={{ fontFamily: "'DM Sans', 'Inter', sans-serif" }}
    >
      {/* Header */}
      <div className="relative flex flex-col items-center pt-8 pb-4 px-5 border-b border-border">
        <Button
          variant="ghost"
          size="icon"
          onClick={onClose}
          className="absolute top-3 right-3 text-muted-foreground hover:text-foreground"
        >
          <X className="h-4 w-4" />
        </Button>

        {/* Avatar */}
        <div
          className="flex items-center justify-center rounded-full mb-3 bg-primary/15 ring-1 ring-border"
          style={{
            width: 72,
            height: 72,
          }}
        >
          <span className="text-xl font-bold text-primary">
            {getInitials(name)}
          </span>
        </div>

        <h2 className="text-base font-semibold text-foreground">{name}</h2>
        {phoneNumber && <p className="text-sm text-muted-foreground mt-0.5">{phoneNumber}</p>}
        {email && <p className="text-xs text-muted-foreground mt-0.5">{email}</p>}
      </div>

      {onToggleAiReplies && lead?._id && (
        <div className="px-5 py-4 border-b border-border flex items-center justify-between gap-3">
          <div>
            <p className="text-sm font-medium text-foreground">AI replies</p>
            <p className="text-xs text-muted-foreground mt-0.5">
              {aiRepliesOn
                ? 'The agent can reply to this customer.'
                : 'Off until you turn it back on. Staff messages and “talk to a person” turn it off.'}
            </p>
          </div>
          <Switch
            checked={aiRepliesOn}
            disabled={aiToggleSaving}
            onCheckedChange={onToggleAiReplies}
            aria-label="AI replies"
          />
        </div>
      )}

      {/* Lead Info */}
      <div className="px-5 py-4 space-y-4 border-b border-border">
        <InfoRow label="Lead Stage" value={stage || 'No Stage'} />
        <InfoRow
          label="Active sales journey"
          value={activeSalesJourney || 'No active sales journey'}
          valueClassName={!activeSalesJourney ? 'text-red-500 dark:text-red-400 font-medium' : 'text-foreground'}
        />
        <InfoRow
          label="Booking Status"
          value={bookingStatus || 'Not Booked'}
          valueClassName={bookingStatus === 'Booked' ? 'text-green-600 dark:text-green-400 font-medium' : 'text-foreground'}
        />
        {location && <InfoRow label="Location" value={location} />}
        {isEscalated !== null && (
          <InfoRow
            label="Escalated"
            value={isEscalated ? 'Yes' : 'No'}
            valueClassName={isEscalated ? 'text-red-500 dark:text-red-400 font-medium' : 'text-foreground'}
          />
        )}
        {assignedAiAgent && <InfoRow label="AI Agent" value={assignedAiAgent} />}
        {assignedHumanAgent && <InfoRow label="Human Agent" value={assignedHumanAgent} />}
      </div>

      {/* Keyed so an unsaved date or note never carries over to the next contact */}
      {contactKind && lead?._id && (
        <div key={lead._id}>
          <CallbackDateSection
            contactPath={`/api/${contactKind}/${lead._id}`}
            callbackDate={lead.callbackDate}
            onPatched={(patch) => onContactPatched?.(lead._id, patch)}
          />
          <NotesSection
            contactPath={`/api/${contactKind}/${lead._id}`}
            notes={lead.notes}
            onPatched={(patch) => onContactPatched?.(lead._id, patch)}
          />
        </div>
      )}

      {/* Account Totals */}
      <div className="px-5 py-4">
        <h3 className="text-sm font-semibold text-foreground mb-3">Account totals</h3>
        <div className="space-y-3">
          <div>
            <p className="text-xs text-muted-foreground">Money Credits</p>
            <p className="text-sm font-semibold text-foreground">$0.00</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Class/Appointment credit</p>
            <p className="text-sm font-semibold text-foreground">0</p>
          </div>
        </div>
      </div>
    </aside>
  )
}

// Stored as UTC midnight: slice rather than format, or browsers west of UTC show the day before.
const toDateInputValue = (value) => (value ? String(value).slice(0, 10) : '')

function CallbackDateSection({ contactPath, callbackDate, onPatched }) {
  const toast = useToast()
  const saved = toDateInputValue(callbackDate)
  const [draft, setDraft] = useState(saved)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    setDraft(saved)
  }, [saved])

  async function handleSave() {
    setSaving(true)
    try {
      const result = await api.put(contactPath, { callbackDate: draft || null })
      if (result.success) {
        onPatched({ callbackDate: draft || null })
        toast.success({ title: 'Saved', message: draft ? 'Callback date updated' : 'Callback date cleared' })
      } else {
        toast.error({ title: 'Save failed', message: result.error || 'Unable to update callback date' })
      }
    } catch (err) {
      toast.error({ title: 'Save failed', message: err?.message || 'Unable to update callback date' })
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="px-5 py-4 border-b border-border">
      <label htmlFor="inbox-callback-date" className="block text-xs text-muted-foreground mb-1.5">
        Callback date
      </label>
      <div className="flex gap-2">
        <Input
          id="inbox-callback-date"
          type="date"
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          className="flex-1 min-w-0"
        />
        {draft !== saved && (
          <Button type="button" size="sm" onClick={handleSave} disabled={saving}>
            {saving ? 'Saving…' : 'Save'}
          </Button>
        )}
      </div>
    </div>
  )
}

function NotesSection({ contactPath, notes, onPatched }) {
  const toast = useToast()
  const [text, setText] = useState('')
  const [adding, setAdding] = useState(false)
  const [deletingId, setDeletingId] = useState(null)

  // Only customer notes can be pinned, and only customer notes have no author.
  const sortedNotes = [...(notes || [])].sort((a, b) => {
    if (Boolean(a.isPinned) !== Boolean(b.isPinned)) return a.isPinned ? -1 : 1
    return new Date(b.createdAt) - new Date(a.createdAt)
  })

  async function handleAdd(e) {
    e.preventDefault()
    if (!text.trim()) return
    setAdding(true)
    try {
      const result = await api.post(`${contactPath}/notes`, { text: text.trim() })
      if (result.success) {
        setText('')
        onPatched({ notes: result.data })
      } else {
        toast.error({ title: 'Error', message: result.error || 'Unable to add note' })
      }
    } catch (err) {
      toast.error({ title: 'Error', message: err?.message || 'Unable to add note' })
    } finally {
      setAdding(false)
    }
  }

  async function handleDelete(noteId) {
    setDeletingId(noteId)
    try {
      const result = await api.delete(`${contactPath}/notes/${noteId}`)
      if (result.success) {
        onPatched({ notes: result.data })
      } else {
        toast.error({ title: 'Error', message: result.error || 'Unable to delete note' })
      }
    } catch (err) {
      toast.error({ title: 'Error', message: err?.message || 'Unable to delete note' })
    } finally {
      setDeletingId(null)
    }
  }

  return (
    <div className="px-5 py-4 border-b border-border">
      <h3 className="text-sm font-semibold text-foreground mb-3">Notes</h3>
      <form onSubmit={handleAdd} className="space-y-2">
        <Textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Add a note…"
          aria-label="Add a note"
          rows={2}
          className="min-h-[60px]"
        />
        <div className="flex justify-end">
          <Button type="submit" size="sm" disabled={adding || !text.trim()}>
            {adding ? 'Adding…' : 'Add note'}
          </Button>
        </div>
      </form>

      {sortedNotes.length === 0 ? (
        <p className="text-xs text-muted-foreground mt-3">No notes yet.</p>
      ) : (
        <div className="space-y-2 mt-3 max-h-64 overflow-y-auto">
          {sortedNotes.map((note) => (
            <div key={note._id} className="rounded-md border border-border bg-muted/40 px-3 py-2">
              <div className="flex items-start justify-between gap-2">
                <p className="text-sm text-foreground flex-1 min-w-0 break-words whitespace-pre-wrap">
                  {note.text}
                </p>
                {note.isPinned && (
                  <Pin className="h-3.5 w-3.5 shrink-0 mt-0.5 text-primary" aria-label="Pinned" />
                )}
                <button
                  type="button"
                  onClick={() => handleDelete(note._id)}
                  disabled={deletingId === note._id}
                  className="shrink-0 mt-0.5 text-muted-foreground hover:text-destructive disabled:opacity-50"
                  aria-label="Delete note"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                {[note.createdBy?.name || note.createdBy?.email, formatDateTime(note.createdAt)]
                  .filter(Boolean)
                  .join(' · ')}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

function capitalize(str) {
  if (!str) return str
  return str.charAt(0).toUpperCase() + str.slice(1)
}

function InfoRow({ label, value, valueClassName = 'text-foreground' }) {
  return (
    <div>
      <p className="text-xs text-muted-foreground mb-0.5">{label}</p>
      <p className={`text-sm ${valueClassName}`}>{value}</p>
    </div>
  )
}
