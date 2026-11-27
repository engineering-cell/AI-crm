'use client'

import { Suspense, useCallback, useMemo } from 'react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import MainLayout from '@/components/layout/MainLayout'
import { Tabs, TabsContent } from '@/components/ui/tabs'
import { isSuperAdmin } from '@/lib/permissions'
import ClonedReviewRagPanel from '@/app/ai-automation/rag/ClonedReviewRagPanel'
import AiReplyReviewsContent from '@/app/ai-automation/ai-reply-reviews/AiReplyReviewsContent'
import DocumentLibraryTab from './components/DocumentLibraryTab'
import SmsPromptTab from './components/SmsPromptTab'
import {
  normalizeWorkingLocation,
  workingLocationQueryParam,
} from '@/app/ai-automation/ai-calling/components/locationScope'

const VALID_VIEWS = ['prompt', 'knowledge-base', 'playbook', 'cloned-review-rag', 'ai-reply-reviews']
const ADMIN_VIEWS = new Set(['knowledge-base', 'cloned-review-rag', 'ai-reply-reviews'])

function AiMessagingPageInner() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const rawView = searchParams?.get('view')
  const canAccessAdminViews = isSuperAdmin()
  const activeTab = VALID_VIEWS.includes(rawView) && (!ADMIN_VIEWS.has(rawView) || canAccessAdminViews)
    ? rawView
    : 'prompt'
  const workingLocationID = useMemo(
    () => normalizeWorkingLocation(searchParams?.get('locationID')),
    [searchParams],
  )

  const setQuery = useCallback(
    (patch) => {
      const params = new URLSearchParams(searchParams?.toString() || '')
      Object.entries(patch).forEach(([key, value]) => {
        if (value == null || value === '') params.delete(key)
        else params.set(key, String(value))
      })
      router.replace(`${pathname}?${params.toString()}`)
    },
    [pathname, router, searchParams],
  )

  const setActiveTab = (tab) => {
    setQuery({ view: tab, locationID: workingLocationQueryParam(workingLocationID) })
  }

  const setWorkingLocationID = (id) => {
    setQuery({
      view: activeTab,
      locationID: workingLocationQueryParam(normalizeWorkingLocation(id)),
    })
  }

  const subtitle = useMemo(() => {
    if (activeTab === 'knowledge-base') {
      return 'Manage studio knowledge base documents the AI messaging agent can retrieve facts from.'
    }
    if (activeTab === 'playbook') {
      return 'Manage conversation playbooks so the AI messaging agent matches your tone and pacing.'
    }
    if (activeTab === 'cloned-review-rag') {
      return 'Inspect staff-approved examples in the staging review index.'
    }
    if (activeTab === 'ai-reply-reviews') {
      return 'Review SMS replies and choose examples for future replies.'
    }
    return 'Manage system prompts for the AI messaging agent.'
  }, [activeTab])

  return (
    <MainLayout title="AI Messaging" subtitle={subtitle}>
      <div className="flex h-full min-h-full flex-col">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="flex h-full min-h-full w-full flex-col">
          <SmsPromptTab
            activeView={activeTab}
            workingLocationID={workingLocationID}
            onWorkingLocationChange={setWorkingLocationID}
          />
          {canAccessAdminViews && <DocumentLibraryTab
            activeView={activeTab}
            workingLocationID={workingLocationID}
            onWorkingLocationChange={setWorkingLocationID}
            tabValue="knowledge-base"
            endpoint="/api/knowledge-base"
            heading="Knowledge base"
            subheading="Pick a studio, upload that studio's PDF, then Set active. Each studio keeps its own knowledge base — activating one location does not replace another."
            entityLabel="document"
            entityPlural="documents"
            requireActive
          />}
          <DocumentLibraryTab
            activeView={activeTab}
            workingLocationID={workingLocationID}
            onWorkingLocationChange={setWorkingLocationID}
            tabValue="playbook"
            endpoint="/api/conversational-playbook"
            heading="Conversation playbook"
            subheading="Upload example conversation PDFs so the AI agent matches your studio's tone and pacing. The active playbook for the selected studio is the only one that studio's texts use."
            entityLabel="playbook"
            entityPlural="playbooks"
          />
          {canAccessAdminViews && (
            <TabsContent value="cloned-review-rag" className="mt-6 flex-1 outline-none">
              <ClonedReviewRagPanel />
            </TabsContent>
          )}
          {canAccessAdminViews && (
            <TabsContent value="ai-reply-reviews" className="mt-6 flex-1 outline-none">
              <AiReplyReviewsContent />
            </TabsContent>
          )}
        </Tabs>
      </div>
    </MainLayout>
  )
}

export default function AiMessagingPage() {
  return (
    <Suspense fallback={null}>
      <AiMessagingPageInner />
    </Suspense>
  )
}
