/**
 * Effective AI-replies for a customer (mirrors backend customerAiReplies.helper).
 * Explicit true/false wins; unset falls back by lifecycle.
 */

const AGENT_HANDLED_LIFECYCLE = new Set([
  'trial_scheduled',
  'trial_unscheduled',
  'trial_no_show',
  'group_only',
])

export function defaultAiRepliesEnabledForLifecycle(lifecycleStatus) {
  return AGENT_HANDLED_LIFECYCLE.has(String(lifecycleStatus || '').trim().toLowerCase())
}

export function isCustomerAiRepliesEnabled(customer) {
  if (!customer) return false
  if (customer.aiRepliesEnabled === true) return true
  if (customer.aiRepliesEnabled === false) return false
  return defaultAiRepliesEnabledForLifecycle(customer.lifecycleStatus)
}
