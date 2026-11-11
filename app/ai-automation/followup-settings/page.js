'use client'

import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import { Loader2, Info, Plus, Trash2 } from 'lucide-react'
import MainLayout from '@/components/layout/MainLayout'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Select } from '@/components/ui/select'
import { Switch } from '@/components/ui/switch'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { useToast } from '@/components/ui/toast'
import api from '@/lib/api'
import { getEffectiveBranch } from '@/lib/auth'
import { cn } from '@/lib/utils'
import WorkflowStageMultiSelect from '@/components/workflow/WorkflowStageMultiSelect'
import { formatLeadStageLabel } from '@/lib/lead-stages'

const MIN_FOLLOWUPS = 1
const MAX_FOLLOWUPS = 10
/** Empty scope = Navbar is All branches and user has not picked a studio yet. */
const NO_BRANCH = ''

/** Textarea that grows with its content so the full value is visible without scrolling. */
function AutoGrowTextarea({ value, minRows = 4, className, ...props }) {
  const ref = useRef(null)

  const resize = useCallback(() => {
    const el = ref.current
    if (!el) return
    el.style.height = 'auto'
    el.style.height = `${el.scrollHeight}px`
  }, [])

  useLayoutEffect(() => {
    resize()
  }, [value, resize])

  return (
    <Textarea
      {...props}
      ref={ref}
      value={value}
      rows={minRows}
      onInput={resize}
      className={cn('min-h-0 resize-none overflow-hidden', className)}
    />
  )
}

// The API stores the wait as hours + minutes; days are entered here and sent as hours.
const MAX_INTERVAL_HOURS = 72
const MAX_INTERVAL_DAYS = Math.floor(MAX_INTERVAL_HOURS / 24)

/** API hours → { intervalDays, intervalHours } for the form (e.g. 26 → 1 day 2 hours). */
function splitIntervalHours(totalHours) {
  const total = Math.max(0, Math.floor(Number(totalHours) || 0))
  return { intervalDays: String(Math.floor(total / 24)), intervalHours: String(total % 24) }
}

/** Form days + hours + minutes → { intervalHours, intervalMinutes } for the API, or { error }. */
function intervalForApi(item, { allowZero = false } = {}) {
  const days = Number(item?.intervalDays || 0)
  const hours = Number(item?.intervalHours || 0)
  const minutes = Number(item?.intervalMinutes || 0)
  if (!Number.isInteger(days) || days < 0 || days > MAX_INTERVAL_DAYS) {
    return { error: `days must be 0–${MAX_INTERVAL_DAYS}.` }
  }
  if (!Number.isInteger(hours) || hours < 0 || hours > 23) {
    return { error: 'hours must be 0–23.' }
  }
  if (!Number.isInteger(minutes) || minutes < 0 || minutes > 59) {
    return { error: 'minutes must be 0–59.' }
  }
  const totalHours = days * 24 + hours
  if (totalHours > MAX_INTERVAL_HOURS) {
    return { error: `wait can be at most ${MAX_INTERVAL_HOURS} hours (${MAX_INTERVAL_DAYS} days).` }
  }
  if (!allowZero && totalHours === 0 && minutes === 0) {
    return { error: 'interval must be greater than zero.' }
  }
  return { intervalHours: totalHours, intervalMinutes: minutes }
}

function emptyFollowup(overrides = {}) {
  return {
    intervalDays: '0',
    intervalHours: '1',
    intervalMinutes: '0',
    useAiMessage: true,
    message: '',
    ...overrides,
  }
}

const DEFAULT_FOLLOWUPS = [
  emptyFollowup({ intervalHours: '1', intervalMinutes: '0' }),
  emptyFollowup({ intervalHours: '2', intervalMinutes: '30' }),
  emptyFollowup({ intervalHours: '5', intervalMinutes: '0' }),
]

function followupFromApi(item) {
  const message = item?.message ?? null
  const hasCustomMessage = typeof message === 'string' && message.trim().length > 0
  return emptyFollowup({
    ...splitIntervalHours(item?.intervalHours ?? 1),
    intervalMinutes: String(item?.intervalMinutes ?? 0),
    useAiMessage: !hasCustomMessage,
    message: hasCustomMessage ? message : '',
  })
}

function emptyFirstMessage(overrides = {}) {
  return {
    enabled: false,
    intervalDays: '0',
    intervalHours: '0',
    intervalMinutes: '0',
    useAiMessage: true,
    message: '',
    ...overrides,
  }
}

function firstMessageFromApi(entry) {
  if (!entry || typeof entry !== 'object') return emptyFirstMessage()
  const message = entry.message ?? null
  const hasCustomMessage = typeof message === 'string' && message.trim().length > 0
  return emptyFirstMessage({
    enabled: true,
    ...splitIntervalHours(entry.intervalHours ?? 0),
    intervalMinutes: String(entry.intervalMinutes ?? 0),
    useAiMessage: !hasCustomMessage,
    message: hasCustomMessage ? message : '',
  })
}

function emptyStageConfig(overrides = {}) {
  return {
    /** Local-only id for new unsaved cards */
    draftKey: null,
    stage: '',
    followupPrompt: '',
    firstMessage: emptyFirstMessage(),
    followups: DEFAULT_FOLLOWUPS.map((f) => ({ ...f })),
    ...overrides,
  }
}

function stageConfigFromApi(entry) {
  return emptyStageConfig({
    draftKey: null,
    stage: String(entry?.stage || '').trim().toLowerCase(),
    followupPrompt: typeof entry?.followupPrompt === 'string' ? entry.followupPrompt : '',
    firstMessage: firstMessageFromApi(entry?.firstMessage),
    followups:
      Array.isArray(entry?.followups) && entry.followups.length > 0
        ? entry.followups.map(followupFromApi)
        : DEFAULT_FOLLOWUPS.map((f) => ({ ...f })),
  })
}

/** Normalize API settings row → page state. */
function settingsToForm(raw) {
  const agentFollowupEnabled = raw?.agentFollowupEnabled !== false
  const stageFollowups = Array.isArray(raw?.stageFollowups)
    ? raw.stageFollowups.map(stageConfigFromApi).filter((s) => s.stage)
    : []

  // Legacy flat shape (pre per-stage) → one card so old rows still edit.
  if (
    stageFollowups.length === 0 &&
    raw &&
    (Array.isArray(raw.followups) || raw.followupCount != null || raw.followupStages)
  ) {
    const legacyStages = Array.isArray(raw.followupStages)
      ? raw.followupStages.map((s) => String(s || '').trim().toLowerCase()).filter(Boolean)
      : []
    const stage = legacyStages[0] || 'engaged'
    const followups =
      Array.isArray(raw.followups) && raw.followups.length > 0
        ? raw.followups.map(followupFromApi)
        : DEFAULT_FOLLOWUPS.map((f) => ({ ...f }))
    return {
      agentFollowupEnabled,
      stageFollowups: [
        emptyStageConfig({
          stage,
          followupPrompt: typeof raw.followupPrompt === 'string' ? raw.followupPrompt : '',
          followups,
        }),
      ],
    }
  }

  return {
    agentFollowupEnabled,
    stageFollowups,
  }
}

function formatIntervalLabel(hours, minutes) {
  const parts = []
  if (Number(hours) > 0) parts.push(`${hours}h`)
  if (Number(minutes) > 0) parts.push(`${minutes}m`)
  return parts.length ? parts.join(' ') : '0m'
}

function summarizeFollowups(item) {
  if (item.agentFollowupEnabled === false) return 'Follow-ups disabled'
  const stages = Array.isArray(item.stageFollowups) ? item.stageFollowups : []
  if (stages.length === 0) {
    // Legacy summary fallback
    if (item.followupCount != null) {
      return `${item.followupCount} follow-ups every ${formatIntervalLabel(
        item.followupIntervalHours ?? 0,
        item.followupIntervalMinutes ?? 0,
      )}`
    }
    return 'No stages configured'
  }
  const labels = stages
    .map((s) => formatLeadStageLabel(s.stage) || s.stage)
    .filter(Boolean)
  return `${stages.length} stage${stages.length === 1 ? '' : 's'}: ${labels.join(', ')}`
}

function stageCardKey(config, index) {
  if (config.draftKey) return config.draftKey
  if (config.stage) return `stage:${config.stage}`
  return `idx:${index}`
}

export default function FollowupSettingsPage() {
  const toast = useToast()

  const [navBranch, setNavBranch] = useState(() => getEffectiveBranch() || NO_BRANCH)
  const [locations, setLocations] = useState([])
  const [scope, setScope] = useState(() => getEffectiveBranch() || NO_BRANCH)
  const [form, setForm] = useState(() => settingsToForm(null))
  const [loading, setLoading] = useState(true)
  const [savingMaster, setSavingMaster] = useState(false)
  const [savingStageKey, setSavingStageKey] = useState(null)
  const [removingStageKey, setRemovingStageKey] = useState(null)
  const [locationOverrides, setLocationOverrides] = useState([])
  /** Which stage card is expanded in the editor. */
  const [activeCardKey, setActiveCardKey] = useState(null)

  const navbarLocked = Boolean(navBranch)

  const scopeOptions = useMemo(
    () =>
      locations.map((loc) => ({
        value: String(loc._id),
        label: loc.name || 'Unnamed location',
      })),
    [locations],
  )

  const hasBranchScope = Boolean(scope)
  const activeScopeLabel = useMemo(() => {
    if (!scope) return 'Select a branch'
    return locations.find((loc) => String(loc._id) === String(scope))?.name || 'Selected location'
  }, [scope, locations])

  const scheduleDisabled = hasBranchScope && form.agentFollowupEnabled === false

  const configuredStages = useMemo(
    () =>
      new Set(
        (form.stageFollowups || [])
          .map((s) => String(s.stage || '').trim().toLowerCase())
          .filter(Boolean),
      ),
    [form.stageFollowups],
  )

  const loadLocations = useCallback(async () => {
    const result = await api.get('/api/location?limit=200')
    if (!result.success) return []
    const locs = (result.data || []).filter(
      (loc) => loc.status?.toLowerCase() === 'active' || !loc.status,
    )
    setLocations(locs)
    return locs
  }, [])

  const applySettings = useCallback((settings) => {
    const next = settingsToForm(settings)
    setForm(next)
    const first = next.stageFollowups[0]
    setActiveCardKey(first ? stageCardKey(first, 0) : null)
  }, [])

  const loadSettings = useCallback(
    async (nextScope) => {
      if (!nextScope) {
        setLocationOverrides([])
        applySettings(null)
        setLoading(false)
        return
      }

      setLoading(true)
      try {
        const result = await api.get(
          `/api/followup-settings?locationID=${encodeURIComponent(nextScope)}`,
        )
        if (!result.success) {
          toast.error({
            title: 'Unable to load settings',
            message: result.error || result.message || 'Please try again.',
          })
          applySettings(null)
          return
        }

        applySettings(result.data)
        const all = await api.get('/api/followup-settings')
        if (all.success && Array.isArray(all.data)) {
          setLocationOverrides(all.data.filter((item) => item.locationID != null))
        } else {
          setLocationOverrides([])
        }
      } catch {
        toast.error({ title: 'Error', message: 'Failed to load follow-up settings.' })
        applySettings(null)
      } finally {
        setLoading(false)
      }
    },
    [applySettings, toast],
  )

  const resolveScopeFromNav = useCallback((branch, locs) => {
    if (branch && locs.some((loc) => String(loc._id) === String(branch))) {
      return String(branch)
    }
    return NO_BRANCH
  }, [])

  useEffect(() => {
    let cancelled = false

    async function init() {
      const locs = await loadLocations()
      if (cancelled) return

      const branch = getEffectiveBranch() || NO_BRANCH
      setNavBranch(branch)
      const initialScope = resolveScopeFromNav(branch, locs)
      setScope(initialScope)
      await loadSettings(initialScope)
    }

    init()
    return () => {
      cancelled = true
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    const onBranchChange = async () => {
      const branch = getEffectiveBranch() || NO_BRANCH
      setNavBranch(branch)
      const nextScope = resolveScopeFromNav(branch, locations)
      setScope(nextScope)
      await loadSettings(nextScope)
    }
    window.addEventListener('branch-change', onBranchChange)
    return () => window.removeEventListener('branch-change', onBranchChange)
  }, [locations, loadSettings, resolveScopeFromNav])

  async function handleScopeChange(nextScope) {
    setScope(nextScope)
    await loadSettings(nextScope)
  }

  function updateStageConfig(index, patch) {
    setForm((prev) => ({
      ...prev,
      stageFollowups: prev.stageFollowups.map((item, i) =>
        i === index ? { ...item, ...patch } : item,
      ),
    }))
  }

  function updateStageFollowup(stageIndex, stepIndex, patch) {
    setForm((prev) => ({
      ...prev,
      stageFollowups: prev.stageFollowups.map((stage, i) => {
        if (i !== stageIndex) return stage
        return {
          ...stage,
          followups: stage.followups.map((step, j) =>
            j === stepIndex ? { ...step, ...patch } : step,
          ),
        }
      }),
    }))
  }

  function addStageCard() {
    const draftKey = `draft:${Date.now()}`
    const next = emptyStageConfig({ draftKey, stage: '' })
    setForm((prev) => ({
      ...prev,
      stageFollowups: [...prev.stageFollowups, next],
    }))
    setActiveCardKey(draftKey)
  }

  function addFollowupStep(stageIndex) {
    setForm((prev) => {
      const stage = prev.stageFollowups[stageIndex]
      if (!stage) return prev
      if (stage.followups.length >= MAX_FOLLOWUPS) {
        toast.error({
          title: 'Limit reached',
          message: `You can add up to ${MAX_FOLLOWUPS} follow-ups per stage.`,
        })
        return prev
      }
      return {
        ...prev,
        stageFollowups: prev.stageFollowups.map((item, i) =>
          i === stageIndex
            ? { ...item, followups: [...item.followups, emptyFollowup()] }
            : item,
        ),
      }
    })
  }

  function removeFollowupStep(stageIndex, stepIndex) {
    setForm((prev) => {
      const stage = prev.stageFollowups[stageIndex]
      if (!stage || stage.followups.length <= MIN_FOLLOWUPS) {
        toast.error({ title: 'Required', message: 'Keep at least one follow-up step.' })
        return prev
      }
      return {
        ...prev,
        stageFollowups: prev.stageFollowups.map((item, i) =>
          i === stageIndex
            ? {
                ...item,
                followups: item.followups.filter((_, j) => j !== stepIndex),
              }
            : item,
        ),
      }
    })
  }

  function validateStageConfig(config, label = 'Stage') {
    const stage = String(config.stage || '').trim().toLowerCase()
    if (!stage) {
      toast.error({ title: 'Validation', message: `${label}: select a lead stage.` })
      return null
    }

    if (!Array.isArray(config.followups) || config.followups.length < MIN_FOLLOWUPS) {
      toast.error({ title: 'Validation', message: `${label}: add at least one follow-up step.` })
      return null
    }
    if (config.followups.length > MAX_FOLLOWUPS) {
      toast.error({
        title: 'Validation',
        message: `${label}: at most ${MAX_FOLLOWUPS} follow-up steps.`,
      })
      return null
    }

    const steps = []
    for (let i = 0; i < config.followups.length; i++) {
      const step = config.followups[i]
      const stepLabel = `${label} · Follow-up ${i + 1}`
      const interval = intervalForApi(step)
      if (interval.error) {
        toast.error({ title: 'Validation', message: `${stepLabel}: ${interval.error}` })
        return null
      }
      if (!step.useAiMessage && !String(step.message || '').trim()) {
        toast.error({
          title: 'Validation',
          message: `${stepLabel}: enter a message or enable AI-generated.`,
        })
        return null
      }

      steps.push({
        intervalHours: interval.intervalHours,
        intervalMinutes: interval.intervalMinutes,
        message: step.useAiMessage ? null : String(step.message).trim(),
      })
    }

    let firstMessage = null
    if (config.firstMessage?.enabled) {
      const firstLabel = `${label} · First message`
      const interval = intervalForApi(config.firstMessage, { allowZero: true })
      if (interval.error) {
        toast.error({ title: 'Validation', message: `${firstLabel}: ${interval.error}` })
        return null
      }
      if (
        !config.firstMessage.useAiMessage &&
        !String(config.firstMessage.message || '').trim()
      ) {
        toast.error({
          title: 'Validation',
          message: `${firstLabel}: enter a message or enable AI-generated.`,
        })
        return null
      }
      firstMessage = {
        intervalHours: interval.intervalHours,
        intervalMinutes: interval.intervalMinutes,
        message: config.firstMessage.useAiMessage
          ? null
          : String(config.firstMessage.message || '').trim(),
      }
    }

    return {
      stage,
      followupPrompt: String(config.followupPrompt || '').trim() || null,
      firstMessage,
      followups: steps,
    }
  }

  async function handleSaveMasterSwitch(checked) {
    if (!hasBranchScope) {
      toast.error({
        title: 'Branch required',
        message: 'Select a studio branch to save follow-up settings for.',
      })
      return
    }

    setForm((prev) => ({ ...prev, agentFollowupEnabled: checked }))
    setSavingMaster(true)
    try {
      // Do NOT send stageFollowups here — bulk PUT replaces the whole array.
      const result = await api.put('/api/followup-settings', {
        locationID: scope,
        agentFollowupEnabled: checked,
      })
      if (!result.success) {
        setForm((prev) => ({ ...prev, agentFollowupEnabled: !checked }))
        toast.error({
          title: 'Unable to save',
          message: result.error || result.message || 'Please try again.',
        })
        return
      }
      toast.success({
        title: 'Saved',
        message: checked
          ? `Agent follow-ups enabled for ${activeScopeLabel}.`
          : `Agent follow-ups paused for ${activeScopeLabel}.`,
      })
    } catch {
      setForm((prev) => ({ ...prev, agentFollowupEnabled: !checked }))
      toast.error({ title: 'Error', message: 'Failed to save follow-up settings.' })
    } finally {
      setSavingMaster(false)
    }
  }

  async function handleSaveStage(index) {
    if (!hasBranchScope) {
      toast.error({
        title: 'Branch required',
        message: 'Select a studio branch to save follow-up settings for.',
      })
      return
    }

    const config = form.stageFollowups[index]
    if (!config) return

    const label = formatLeadStageLabel(config.stage) || config.stage || `Stage ${index + 1}`
    const payload = validateStageConfig(config, label)
    if (!payload) return

    const duplicate = form.stageFollowups.some(
      (s, i) =>
        i !== index &&
        String(s.stage || '').trim().toLowerCase() === payload.stage &&
        !s.draftKey,
    )
    if (duplicate) {
      toast.error({
        title: 'Duplicate stage',
        message: `${label} already has a follow-up setup. Open that card instead.`,
      })
      return
    }

    const cardKey = stageCardKey(config, index)
    setSavingStageKey(cardKey)
    try {
      const result = await api.put('/api/followup-settings/stage', {
        locationID: scope,
        stage: payload.stage,
        followupPrompt: payload.followupPrompt,
        firstMessage: payload.firstMessage,
        followups: payload.followups,
      })
      if (!result.success) {
        toast.error({
          title: 'Unable to save stage',
          message: result.error || result.message || 'Please try again.',
        })
        return
      }
      toast.success({
        title: 'Stage saved',
        message: `Follow-up setup saved for ${formatLeadStageLabel(payload.stage) || payload.stage}.`,
      })
      applySettings(result.data)
      setActiveCardKey(`stage:${payload.stage}`)
    } catch {
      toast.error({ title: 'Error', message: 'Failed to save stage follow-up.' })
    } finally {
      setSavingStageKey(null)
    }
  }

  async function handleRemoveStage(index) {
    if (!hasBranchScope) return
    const config = form.stageFollowups[index]
    if (!config) return

    // Unsaved draft — drop locally only.
    if (config.draftKey || !config.stage) {
      setForm((prev) => ({
        ...prev,
        stageFollowups: prev.stageFollowups.filter((_, i) => i !== index),
      }))
      setActiveCardKey(null)
      return
    }

    const stage = String(config.stage).trim().toLowerCase()
    const label = formatLeadStageLabel(stage) || stage
    if (
      !confirm(
        `Remove follow-ups for ${label}? That stage will no longer trigger agent follow-ups. (This is not the same as pausing all follow-ups with the master switch.)`,
      )
    ) {
      return
    }

    const cardKey = stageCardKey(config, index)
    setRemovingStageKey(cardKey)
    try {
      const result = await api.delete(
        `/api/followup-settings/stage/${encodeURIComponent(stage)}?locationID=${encodeURIComponent(scope)}`,
      )
      if (!result.success) {
        toast.error({
          title: 'Unable to remove',
          message: result.error || result.message || 'Please try again.',
        })
        return
      }
      toast.success({ title: 'Removed', message: `Follow-ups removed for ${label}.` })
      applySettings(result.data)
    } catch {
      toast.error({ title: 'Error', message: 'Failed to remove stage follow-up.' })
    } finally {
      setRemovingStageKey(null)
    }
  }

  const busy = savingMaster || Boolean(savingStageKey) || Boolean(removingStageKey)

  return (
    <MainLayout
      title="Follow-up Settings"
      subtitle="Configure how the AI agent follows up with leads — independently per lead stage."
    >
      <div className="w-full space-y-6 p-4 md:p-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Follow-up schedule</CardTitle>
            <CardDescription>
              Each lead stage can have its own prompt and follow-up steps. Settings are saved per
              studio (location rows do not inherit the org default).
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="followup-scope" className="text-sm font-medium">
                Applies to
              </label>
              {navbarLocked ? (
                <div className="rounded-lg border border-border bg-muted/30 px-4 py-3 text-sm">
                  <span className="font-medium text-foreground">{activeScopeLabel}</span>
                  <p className="mt-1 text-xs text-muted-foreground">
                    Taken from the branch selected in the navbar. Switch branches there to edit
                    another studio.
                  </p>
                </div>
              ) : (
                <>
                  <Select
                    id="followup-scope"
                    value={scope || NO_BRANCH}
                    onChange={(e) => handleScopeChange(e.target.value)}
                    disabled={loading || busy}
                  >
                    <option value={NO_BRANCH}>Select a branch…</option>
                    {scopeOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </Select>
                  <p className="text-xs text-muted-foreground">
                    Navbar is on All branches — pick the studio you want to save follow-up settings
                    for.
                  </p>
                </>
              )}
            </div>

            {!hasBranchScope ? (
              <div className="rounded-lg border border-dashed border-border bg-muted/10 px-4 py-8 text-center text-sm text-muted-foreground">
                Select a branch above to load and edit follow-up settings.
              </div>
            ) : loading ? (
              <div className="flex items-center justify-center gap-2 py-12 text-sm text-muted-foreground">
                <Loader2 className="h-4 w-4 animate-spin" />
                Loading settings…
              </div>
            ) : (
              <>
                <div className="flex items-center justify-between gap-4 rounded-lg border border-border bg-muted/20 p-4">
                  <div>
                    <div className="text-sm font-medium">
                      Enable agent follow-ups for {activeScopeLabel}
                    </div>
                    <p className="mt-1 text-xs text-muted-foreground">
                      Master switch for this location only. When off, all stage setups stay saved
                      but nothing sends. Individual leads can still opt out on their profile.
                    </p>
                  </div>
                  <Switch
                    checked={form.agentFollowupEnabled !== false}
                    onCheckedChange={handleSaveMasterSwitch}
                    disabled={busy}
                  />
                </div>

                <div
                  className={cn(
                    'space-y-4',
                    scheduleDisabled && 'pointer-events-none opacity-50',
                  )}
                >
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <div className="text-sm font-medium">Stage follow-ups</div>
                      <p className="mt-0.5 text-xs text-muted-foreground">
                        Add a card per stage. Selecting another stage shows that stage&apos;s own
                        prompt and steps — they do not share one setup.
                      </p>
                    </div>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={addStageCard}
                      disabled={busy || scheduleDisabled}
                    >
                      <Plus className="h-4 w-4" />
                      Add stage
                    </Button>
                  </div>

                  {form.stageFollowups.length === 0 ? (
                    <div className="rounded-lg border border-dashed border-border px-4 py-10 text-center text-sm text-muted-foreground">
                      No stages configured yet. Add a stage to define its follow-up chain.
                    </div>
                  ) : null}

                  {form.stageFollowups.map((config, stageIndex) => {
                    const cardKey = stageCardKey(config, stageIndex)
                    const isActive = activeCardKey === cardKey
                    const stageLabel =
                      formatLeadStageLabel(config.stage) || config.stage || 'New stage'
                    const isSaving = savingStageKey === cardKey
                    const isRemoving = removingStageKey === cardKey
                    const usedElsewhere = new Set(
                      [...configuredStages].filter(
                        (s) => s && s !== String(config.stage || '').trim().toLowerCase(),
                      ),
                    )

                    return (
                      <div
                        key={cardKey}
                        className={cn(
                          'rounded-xl border bg-card transition-colors',
                          isActive ? 'border-primary/40 shadow-sm' : 'border-border',
                        )}
                      >
                        <button
                          type="button"
                          className="flex w-full items-center justify-between gap-3 px-4 py-3 text-left"
                          onClick={() => setActiveCardKey(isActive ? null : cardKey)}
                        >
                          <div className="min-w-0">
                            <div className="text-sm font-semibold text-foreground truncate">
                              {stageLabel}
                              {config.draftKey ? (
                                <span className="ml-2 text-xs font-normal text-muted-foreground">
                                  (unsaved)
                                </span>
                              ) : null}
                            </div>
                            <p className="mt-0.5 text-xs text-muted-foreground">
                              {config.firstMessage?.enabled ? 'First message · ' : ''}
                              {config.followups.length} step
                              {config.followups.length === 1 ? '' : 's'}
                              {config.followupPrompt?.trim() ? ' · custom prompt' : ''}
                            </p>
                          </div>
                          <span className="text-xs font-medium text-muted-foreground shrink-0">
                            {isActive ? 'Hide' : 'Edit'}
                          </span>
                        </button>

                        {isActive ? (
                          <div className="space-y-4 border-t border-border px-4 py-4">
                            <div className="space-y-2">
                              <label className="text-sm font-medium">Follow-up stage</label>
                              <WorkflowStageMultiSelect
                                single
                                values={config.stage ? [config.stage] : []}
                                onChange={(next) => {
                                  const nextStage = Array.isArray(next) && next[0]
                                    ? String(next[0]).trim().toLowerCase()
                                    : ''
                                  if (nextStage && usedElsewhere.has(nextStage)) {
                                    toast.error({
                                      title: 'Already configured',
                                      message: `${formatLeadStageLabel(nextStage) || nextStage} already has a card. Open that one to edit.`,
                                    })
                                    return
                                  }
                                  updateStageConfig(stageIndex, { stage: nextStage })
                                }}
                                placeholder="Select stage…"
                                compact={false}
                              />
                              <p className="text-xs text-muted-foreground">
                                Follow-ups start when a lead enters this stage, and stop when they
                                leave.
                              </p>
                            </div>

                            <div className="space-y-2">
                              <label
                                htmlFor={`followup-prompt-${cardKey}`}
                                className="text-sm font-medium"
                              >
                                AI follow-up prompt
                              </label>
                              <AutoGrowTextarea
                                id={`followup-prompt-${cardKey}`}
                                minRows={6}
                                value={config.followupPrompt || ''}
                                onChange={(e) =>
                                  updateStageConfig(stageIndex, {
                                    followupPrompt: e.target.value,
                                  })
                                }
                                placeholder="Optional guidance for AI-written follow-ups for this stage…"
                                disabled={busy || scheduleDisabled}
                              />
                              <p className="text-xs text-muted-foreground">
                                Used when a step has AI-generated message on. Leave blank for the
                                default prompt.
                              </p>
                            </div>

                            <div className="space-y-3 rounded-lg border border-border bg-muted/10 p-4">
                              <div className="flex items-center justify-between gap-4">
                                <div>
                                  <div className="text-sm font-semibold text-foreground">
                                    First message
                                  </div>
                                  <p className="mt-0.5 text-xs text-muted-foreground">
                                    Sent once to new leads added manually, by bulk upload, or from a
                                    form into this stage. Leads from SMS, email, or calls skip it
                                    (they already got a live reply), and so do existing leads moved
                                    into this stage. Never resent — restarts begin at Follow-up 1.
                                  </p>
                                </div>
                                <Switch
                                  checked={Boolean(config.firstMessage?.enabled)}
                                  onCheckedChange={(checked) =>
                                    updateStageConfig(stageIndex, {
                                      firstMessage: {
                                        ...(config.firstMessage || emptyFirstMessage()),
                                        enabled: checked,
                                      },
                                    })
                                  }
                                  disabled={busy || scheduleDisabled}
                                />
                              </div>

                              {config.firstMessage?.enabled ? (
                                <div className="grid gap-4 sm:grid-cols-3">
                                  <div className="space-y-2">
                                    <label
                                      htmlFor={`first-message-days-${cardKey}`}
                                      className="text-sm font-medium"
                                    >
                                      Wait (days)
                                    </label>
                                    <Input
                                      id={`first-message-days-${cardKey}`}
                                      type="number"
                                      min={0}
                                      max={MAX_INTERVAL_DAYS}
                                      value={config.firstMessage?.intervalDays ?? '0'}
                                      onChange={(e) =>
                                        updateStageConfig(stageIndex, {
                                          firstMessage: {
                                            ...(config.firstMessage || emptyFirstMessage()),
                                            enabled: true,
                                            intervalDays: e.target.value,
                                          },
                                        })
                                      }
                                      disabled={busy || scheduleDisabled}
                                    />
                                    <p className="text-xs text-muted-foreground">0–{MAX_INTERVAL_DAYS} days</p>
                                  </div>
                                  <div className="space-y-2">
                                    <label
                                      htmlFor={`first-message-hours-${cardKey}`}
                                      className="text-sm font-medium"
                                    >
                                      Wait (hours)
                                    </label>
                                    <Input
                                      id={`first-message-hours-${cardKey}`}
                                      type="number"
                                      min={0}
                                      max={23}
                                      value={config.firstMessage?.intervalHours ?? '0'}
                                      onChange={(e) =>
                                        updateStageConfig(stageIndex, {
                                          firstMessage: {
                                            ...(config.firstMessage || emptyFirstMessage()),
                                            enabled: true,
                                            intervalHours: e.target.value,
                                          },
                                        })
                                      }
                                      disabled={busy || scheduleDisabled}
                                    />
                                    <p className="text-xs text-muted-foreground">0–23 hours</p>
                                  </div>
                                  <div className="space-y-2">
                                    <label
                                      htmlFor={`first-message-minutes-${cardKey}`}
                                      className="text-sm font-medium"
                                    >
                                      Wait (minutes)
                                    </label>
                                    <Input
                                      id={`first-message-minutes-${cardKey}`}
                                      type="number"
                                      min={0}
                                      max={59}
                                      value={config.firstMessage?.intervalMinutes ?? '0'}
                                      onChange={(e) =>
                                        updateStageConfig(stageIndex, {
                                          firstMessage: {
                                            ...(config.firstMessage || emptyFirstMessage()),
                                            enabled: true,
                                            intervalMinutes: e.target.value,
                                          },
                                        })
                                      }
                                      disabled={busy || scheduleDisabled}
                                    />
                                    <p className="text-xs text-muted-foreground">
                                      0–59 minutes · all zero sends right away
                                    </p>
                                  </div>
                                </div>
                              ) : null}

                              {config.firstMessage?.enabled ? (
                                <div className="space-y-3 rounded-lg border border-border bg-background p-3">
                                  <div className="flex items-center justify-between gap-4">
                                    <div>
                                      <div className="text-sm font-medium">AI-generated message</div>
                                      <p className="mt-0.5 text-xs text-muted-foreground">
                                        When on, the AI writes this first touch. When off, use a
                                        fixed message.
                                      </p>
                                    </div>
                                    <Switch
                                      checked={Boolean(config.firstMessage?.useAiMessage)}
                                      onCheckedChange={(checked) =>
                                        updateStageConfig(stageIndex, {
                                          firstMessage: {
                                            ...(config.firstMessage || emptyFirstMessage()),
                                            enabled: true,
                                            useAiMessage: checked,
                                            message: checked
                                              ? ''
                                              : config.firstMessage?.message || '',
                                          },
                                        })
                                      }
                                      disabled={busy || scheduleDisabled}
                                    />
                                  </div>

                                  {!config.firstMessage?.useAiMessage ? (
                                    <div className="space-y-2">
                                      <label
                                        htmlFor={`first-message-${cardKey}`}
                                        className="text-sm font-medium"
                                      >
                                        Fixed message
                                      </label>
                                      <Textarea
                                        id={`first-message-${cardKey}`}
                                        rows={3}
                                        value={config.firstMessage?.message || ''}
                                        onChange={(e) =>
                                          updateStageConfig(stageIndex, {
                                            firstMessage: {
                                              ...(config.firstMessage || emptyFirstMessage()),
                                              enabled: true,
                                              useAiMessage: false,
                                              message: e.target.value,
                                            },
                                          })
                                        }
                                        placeholder="Hi! Thanks for reaching out — happy to help you get started."
                                        disabled={busy || scheduleDisabled}
                                      />
                                    </div>
                                  ) : null}
                                </div>
                              ) : null}
                            </div>

                            <div className="flex items-center justify-between gap-3">
                              <div>
                                <div className="text-sm font-medium">Follow-up steps</div>
                                <p className="mt-0.5 text-xs text-muted-foreground">
                                  After the first message (if enabled), or when a chain restarts,
                                  these steps run in order. Each waits its interval after the
                                  previous message.
                                </p>
                              </div>
                              <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                onClick={() => addFollowupStep(stageIndex)}
                                disabled={
                                  busy ||
                                  scheduleDisabled ||
                                  config.followups.length >= MAX_FOLLOWUPS
                                }
                              >
                                <Plus className="h-4 w-4" />
                                Add step
                              </Button>
                            </div>

                            {config.followups.map((step, stepIndex) => (
                              <div
                                key={stepIndex}
                                className="space-y-4 rounded-lg border border-border bg-muted/10 p-4"
                              >
                                <div className="flex items-center justify-between gap-3">
                                  <div className="text-sm font-semibold text-foreground">
                                    Follow-up {stepIndex + 1}
                                  </div>
                                  <Button
                                    type="button"
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => removeFollowupStep(stageIndex, stepIndex)}
                                    disabled={
                                      busy ||
                                      scheduleDisabled ||
                                      config.followups.length <= MIN_FOLLOWUPS
                                    }
                                    className="text-muted-foreground hover:text-destructive"
                                  >
                                    <Trash2 className="h-4 w-4" />
                                    Remove
                                  </Button>
                                </div>

                                <div className="grid gap-4 sm:grid-cols-3">
                                  <div className="space-y-2">
                                    <label
                                      htmlFor={`followup-days-${cardKey}-${stepIndex}`}
                                      className="text-sm font-medium"
                                    >
                                      Wait (days)
                                    </label>
                                    <Input
                                      id={`followup-days-${cardKey}-${stepIndex}`}
                                      type="number"
                                      min={0}
                                      max={MAX_INTERVAL_DAYS}
                                      value={step.intervalDays ?? '0'}
                                      onChange={(e) =>
                                        updateStageFollowup(stageIndex, stepIndex, {
                                          intervalDays: e.target.value,
                                        })
                                      }
                                      disabled={busy || scheduleDisabled}
                                    />
                                    <p className="text-xs text-muted-foreground">0–{MAX_INTERVAL_DAYS} days</p>
                                  </div>
                                  <div className="space-y-2">
                                    <label
                                      htmlFor={`followup-hours-${cardKey}-${stepIndex}`}
                                      className="text-sm font-medium"
                                    >
                                      Wait (hours)
                                    </label>
                                    <Input
                                      id={`followup-hours-${cardKey}-${stepIndex}`}
                                      type="number"
                                      min={0}
                                      max={23}
                                      value={step.intervalHours}
                                      onChange={(e) =>
                                        updateStageFollowup(stageIndex, stepIndex, {
                                          intervalHours: e.target.value,
                                        })
                                      }
                                      disabled={busy || scheduleDisabled}
                                    />
                                    <p className="text-xs text-muted-foreground">0–23 hours</p>
                                  </div>
                                  <div className="space-y-2">
                                    <label
                                      htmlFor={`followup-minutes-${cardKey}-${stepIndex}`}
                                      className="text-sm font-medium"
                                    >
                                      Wait (minutes)
                                    </label>
                                    <Input
                                      id={`followup-minutes-${cardKey}-${stepIndex}`}
                                      type="number"
                                      min={0}
                                      max={59}
                                      value={step.intervalMinutes}
                                      onChange={(e) =>
                                        updateStageFollowup(stageIndex, stepIndex, {
                                          intervalMinutes: e.target.value,
                                        })
                                      }
                                      disabled={busy || scheduleDisabled}
                                    />
                                    <p className="text-xs text-muted-foreground">0–59 minutes</p>
                                  </div>
                                </div>

                                <div className="space-y-3 rounded-lg border border-border bg-background p-3">
                                  <div className="flex items-center justify-between gap-4">
                                    <div>
                                      <div className="text-sm font-medium">AI-generated message</div>
                                      <p className="mt-0.5 text-xs text-muted-foreground">
                                        When on, the AI writes this follow-up. When off, use a fixed
                                        message.
                                      </p>
                                    </div>
                                    <Switch
                                      checked={step.useAiMessage}
                                      onCheckedChange={(checked) =>
                                        updateStageFollowup(stageIndex, stepIndex, {
                                          useAiMessage: checked,
                                          message: checked ? '' : step.message,
                                        })
                                      }
                                      disabled={busy || scheduleDisabled}
                                    />
                                  </div>

                                  {!step.useAiMessage ? (
                                    <div className="space-y-2">
                                      <label
                                        htmlFor={`followup-message-${cardKey}-${stepIndex}`}
                                        className="text-sm font-medium"
                                      >
                                        Fixed message
                                      </label>
                                      <Textarea
                                        id={`followup-message-${cardKey}-${stepIndex}`}
                                        rows={3}
                                        value={step.message}
                                        onChange={(e) =>
                                          updateStageFollowup(stageIndex, stepIndex, {
                                            message: e.target.value,
                                          })
                                        }
                                        placeholder="Hey! Just checking in — are you still interested?"
                                        disabled={busy || scheduleDisabled}
                                      />
                                    </div>
                                  ) : null}
                                </div>
                              </div>
                            ))}

                            <div className="flex flex-wrap items-center justify-end gap-2 pt-1">
                              <Button
                                type="button"
                                variant="outline"
                                onClick={() => handleRemoveStage(stageIndex)}
                                disabled={busy || scheduleDisabled}
                                className="text-destructive hover:text-destructive"
                              >
                                {isRemoving ? (
                                  <>
                                    <Loader2 className="h-4 w-4 animate-spin" />
                                    Removing…
                                  </>
                                ) : (
                                  <>
                                    <Trash2 className="h-4 w-4" />
                                    {config.draftKey ? 'Discard' : 'Remove stage'}
                                  </>
                                )}
                              </Button>
                              <Button
                                type="button"
                                variant="gradient"
                                onClick={() => handleSaveStage(stageIndex)}
                                disabled={busy || scheduleDisabled}
                              >
                                {isSaving ? (
                                  <>
                                    <Loader2 className="h-4 w-4 animate-spin" />
                                    Saving…
                                  </>
                                ) : (
                                  'Save stage'
                                )}
                              </Button>
                            </div>
                          </div>
                        ) : null}
                      </div>
                    )
                  })}
                </div>
              </>
            )}
          </CardContent>
        </Card>

        {locationOverrides.length > 0 ? (
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Location overrides</CardTitle>
              <CardDescription>
                Studios with custom follow-up settings. Location rows do not inherit from an org
                default — each studio is configured on its own.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="divide-y divide-border rounded-lg border border-border">
                {locationOverrides.map((item) => {
                  const locationName =
                    locations.find((loc) => String(loc._id) === String(item.locationID))?.name ||
                    'Unknown location'
                  return (
                    <li key={String(item.locationID)}>
                      <button
                        type="button"
                        onClick={() => {
                          if (navbarLocked) {
                            toast.error({
                              title: 'Switch branch',
                              message: `Use the navbar to switch to ${locationName} to edit these settings.`,
                            })
                            return
                          }
                          handleScopeChange(String(item.locationID))
                        }}
                        className={cn(
                          'flex w-full items-center justify-between gap-4 px-4 py-3 text-left transition-colors hover:bg-muted/40',
                          String(scope) === String(item.locationID) && 'bg-muted/50',
                        )}
                      >
                        <div>
                          <div className="text-sm font-medium text-foreground">{locationName}</div>
                          <div className="mt-0.5 text-xs text-muted-foreground">
                            {summarizeFollowups(item)}
                          </div>
                        </div>
                        <span className="text-xs font-medium text-[color:var(--studio-primary)]">
                          {navbarLocked ? 'View in navbar' : 'Edit'}
                        </span>
                      </button>
                    </li>
                  )
                })}
              </ul>
            </CardContent>
          </Card>
        ) : null}

        <div className="flex gap-3 rounded-lg border border-border bg-muted/20 px-4 py-3 text-sm text-muted-foreground">
          <Info className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />
          <div className="space-y-1">
            <p>
              Save each stage with <span className="font-medium text-foreground">Save stage</span>{' '}
              — that only updates that stage. The master switch pauses everything without deleting
              stage setups.
            </p>
            <p>
              <span className="font-medium text-foreground">Remove stage</span> deletes that
              stage&apos;s chain so it no longer triggers follow-ups. It is not the same as turning
              the location switch off.
            </p>
          </div>
        </div>
      </div>
    </MainLayout>
  )
}
