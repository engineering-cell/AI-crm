'use client'

import api, { getApiBaseUrl } from './api'

function cloneBaseUrl() {
  return (process.env.NEXT_PUBLIC_CLONE_API_BASE_URL || getApiBaseUrl()).replace(/\/$/, '')
}

async function request(path, method, data) {
  try {
    const response = await fetch(`${cloneBaseUrl()}${path}`, {
      method,
      headers: api.buildHeaders(),
      cache: 'no-store',
      ...(data === undefined ? {} : { body: JSON.stringify(data) }),
    })
    return await api.handleResponse(response)
  } catch {
    return { success: false, error: 'Could not reach the review backend.' }
  }
}

function clonedCasePath(path) {
  if (path.startsWith('/api/sms-reply-reviews/live/')) return path
  if (!path.startsWith('/api/sms-reply-reviews')) return path
  return `${path}${path.includes('?') ? '&' : '?'}source=cloned_conversation`
}

export const clonedConversationApi = {
  get: (path) => request(clonedCasePath(path), 'GET'),
  post: (path, data) => request(clonedCasePath(path), 'POST', data),
}
