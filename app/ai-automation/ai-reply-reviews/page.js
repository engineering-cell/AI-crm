'use client'

import MainLayout from '@/components/layout/MainLayout'
import AiReplyReviewsContent from './AiReplyReviewsContent'

export default function AiReplyReviewsPage() {
  return (
    <MainLayout title="AI Reply Reviews" subtitle="Review SMS replies and choose examples for future replies.">
      <AiReplyReviewsContent />
    </MainLayout>
  )
}
