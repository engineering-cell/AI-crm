'use client'

import { useEffect, useState } from 'react'
import MainLayout from '@/components/layout/MainLayout'
import { isSuperAdmin } from '@/lib/permissions'
import ClonedReviewRagPanel from './ClonedReviewRagPanel'

export default function RagKnowledgePage() {
  const [canRead, setCanRead] = useState(false)

  useEffect(() => {
    const update = () => setCanRead(isSuperAdmin())
    update()
    window.addEventListener('session-refresh', update)
    return () => window.removeEventListener('session-refresh', update)
  }, [])

  return (
    <MainLayout title="Cloned review RAG" subtitle="Inspect staff-approved examples in the staging review index.">
      <div className="mx-auto max-w-7xl space-y-5 pb-10">
        {canRead
          ? <ClonedReviewRagPanel />
          : <p className="rounded-lg border border-border p-4 text-sm">You do not have permission to inspect training knowledge.</p>}
      </div>
    </MainLayout>
  )
}
