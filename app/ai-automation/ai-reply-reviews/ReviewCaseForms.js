'use client'

import { useRef, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'

const ISSUE_OPTIONS = [
  { value: 'repeated_question', label: 'Repeated question' },
  { value: 'source_conflict', label: 'Prompt or knowledge conflict' },
  { value: 'other', label: 'Other' },
]

function ReviewFields({ values, onChange, prefix, disabled }) {
  return (
    <>
      <div className="space-y-1">
        <label htmlFor={`${prefix}-issue`} className="block text-sm font-semibold">Issue type</label>
        <Select id={`${prefix}-issue`} value={values.issueType} onChange={(event) => onChange('issueType', event.target.value)} disabled={disabled} required>
          <option value="">Select an issue</option>
          {ISSUE_OPTIONS.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
        </Select>
      </div>
      <div className="space-y-1">
        <label htmlFor={`${prefix}-reason`} className="block text-sm font-semibold">Reason</label>
        <Textarea id={`${prefix}-reason`} value={values.reason} onChange={(event) => onChange('reason', event.target.value)} disabled={disabled} maxLength={2000} required rows={3} />
      </div>
      <div className="space-y-1">
        <label htmlFor={`${prefix}-reply`} className="block text-sm font-semibold">Correct reply</label>
        <Textarea id={`${prefix}-reply`} value={values.correctedReply} onChange={(event) => onChange('correctedReply', event.target.value)} disabled={disabled} maxLength={4000} required rows={5} />
      </div>
    </>
  )
}

function updateField(setValues, field, value) {
  setValues((current) => ({ ...current, [field]: value }))
}

export function PassedSubmissionForm({ initialReply, onSubmit, saving }) {
  const [values, setValues] = useState({ issueType: '', reason: '', correctedReply: initialReply || '' })

  const submit = (event) => {
    event.preventDefault()
    if (!values.issueType || !values.reason.trim() || !values.correctedReply.trim()) return
    onSubmit({
      issueType: values.issueType,
      reason: values.reason.trim(),
      correctedReply: values.correctedReply.trim(),
    })
  }

  return (
    <form onSubmit={submit} className="space-y-3 border-t border-border pt-4">
      <h3 className="text-sm font-semibold">Send for review</h3>
      <p className="text-xs text-muted-foreground">Add the reply you want the team to approve. This case enters Pending and is not added to RAG yet.</p>
      <ReviewFields values={values} onChange={(field, value) => updateField(setValues, field, value)} prefix="passed" disabled={saving} />
      <Button type="submit" disabled={saving}>{saving ? 'Sending…' : 'Send for review'}</Button>
    </form>
  )
}

const EMPTY_MANUAL_CASE = {
  customerMessage: '', originalReply: '', correctedReply: '', issueType: '', reason: '', leadID: '',
}

export function useConversationMessages(initialMessages = []) {
  const [messages, setMessages] = useState(() => initialMessages.map((message, index) => ({ ...message, id: index + 1 })))
  const nextMessageId = useRef(initialMessages.length)

  const addMessage = () => {
    nextMessageId.current += 1
    setMessages((current) => [...current, { id: nextMessageId.current, role: 'customer', text: '' }])
  }

  const updateMessage = (id, field, value) => {
    setMessages((current) => current.map((item) => item.id === id ? { ...item, [field]: value } : item))
  }

  const removeMessage = (id) => setMessages((current) => current.filter((item) => item.id !== id))
  return { messages, addMessage, updateMessage, removeMessage }
}

export function ConversationEditor({ messages, onAdd, onUpdate, onRemove, disabled, prefix }) {
  return (
    <section className="space-y-3" aria-label="Earlier conversation">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h3 className="text-sm font-semibold">Earlier conversation (optional)</h3>
        <Button type="button" variant="outline" size="sm" disabled={disabled || messages.length >= 30} onClick={onAdd}>Add message</Button>
      </div>
      {messages.map((message, index) => (
        <div key={message.id} className="space-y-2 rounded-lg border border-border p-3">
          <div className="flex items-center gap-2">
            <label htmlFor={`${prefix}-role-${message.id}`} className="text-sm">Message {index + 1}</label>
            <Select id={`${prefix}-role-${message.id}`} value={message.role} onChange={(event) => onUpdate(message.id, 'role', event.target.value)} disabled={disabled}>
              <option value="customer">Customer</option>
              <option value="agent">Agent</option>
            </Select>
            <Button type="button" variant="outline" size="sm" disabled={disabled} onClick={() => onRemove(message.id)} aria-label={`Remove message ${index + 1}`}>Remove</Button>
          </div>
          <Textarea value={message.text} onChange={(event) => onUpdate(message.id, 'text', event.target.value)} disabled={disabled} maxLength={2000} required rows={2} aria-label={`Text for message ${index + 1}`} />
        </div>
      ))}
    </section>
  )
}

export function ManualCaseForm({ onSubmit, onCancel, saving, hasStudio, initialCase }) {
  const [values, setValues] = useState(() => ({
    ...EMPTY_MANUAL_CASE,
    customerMessage: initialCase?.customerMessage || '',
    originalReply: initialCase?.originalReply || '',
  }))
  const conversation = useConversationMessages(initialCase?.priorMessages)

  const submit = (event) => {
    event.preventDefault()
    if (!hasStudio || !Object.entries(values).every(([key, value]) => key === 'leadID' || Boolean(value.trim()))) return
    if (conversation.messages.some((item) => !item.text.trim())) return
    onSubmit({
      customerMessage: values.customerMessage.trim(),
      originalReply: values.originalReply.trim(),
      correctedReply: values.correctedReply.trim(),
      issueType: values.issueType,
      reason: values.reason.trim(),
      ...(values.leadID.trim() ? { leadID: values.leadID.trim() } : {}),
      priorMessages: conversation.messages.map(({ role, text }) => ({ role, text: text.trim() })),
    })
  }

  return (
    <form onSubmit={submit} className="space-y-4 rounded-xl border border-border bg-card p-4 shadow-sm sm:p-5">
      <div>
        <h2 className="text-lg font-semibold">Add manual case</h2>
        <p className="text-sm text-muted-foreground">Save an SMS example for review. Approval is required before it enters RAG.</p>
        {initialCase && <p className="mt-1 text-sm text-muted-foreground">Simulation input and reply are filled in. Add an issue type, reason, and correct reply.</p>}
      </div>
      {!hasStudio && <p role="alert" className="text-sm text-destructive">Select a studio before adding a manual case.</p>}
      <div className="space-y-1">
        <label htmlFor="manual-customer" className="block text-sm font-semibold">Customer message</label>
        <Textarea id="manual-customer" value={values.customerMessage} onChange={(event) => updateField(setValues, 'customerMessage', event.target.value)} disabled={saving} maxLength={2000} required rows={3} />
      </div>
      <div className="space-y-1">
        <label htmlFor="manual-original" className="block text-sm font-semibold">Original reply</label>
        <Textarea id="manual-original" value={values.originalReply} onChange={(event) => updateField(setValues, 'originalReply', event.target.value)} disabled={saving} maxLength={4000} required rows={4} />
      </div>
      <ReviewFields values={values} onChange={(field, value) => updateField(setValues, field, value)} prefix="manual" disabled={saving} />
      <div className="space-y-1">
        <label htmlFor="manual-lead" className="block text-sm font-semibold">Lead ID (optional)</label>
        <Input id="manual-lead" value={values.leadID} onChange={(event) => updateField(setValues, 'leadID', event.target.value)} disabled={saving} pattern="[a-fA-F0-9]{24}" title="Enter a 24-character lead ID" />
      </div>
      <ConversationEditor messages={conversation.messages} onAdd={conversation.addMessage} onUpdate={conversation.updateMessage} onRemove={conversation.removeMessage} disabled={saving} prefix="manual" />
      <div className="flex gap-2">
        <Button type="submit" disabled={saving || !hasStudio}>{saving ? 'Adding…' : 'Add to Pending'}</Button>
        <Button type="button" variant="outline" disabled={saving} onClick={onCancel}>Cancel</Button>
      </div>
    </form>
  )
}
