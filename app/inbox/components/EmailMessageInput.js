'use client'

import ConversationComposer from './ConversationComposer'

export default function EmailMessageInput({
  onSendMessage,
  disabled = false,
  sending = false,
  replyTarget = null,
  onClearReply = null,
}) {
  return (
    <ConversationComposer
      variant="email"
      onSendMessage={onSendMessage}
      disabled={disabled}
      sending={sending}
      replyTarget={replyTarget}
      onClearReply={onClearReply}
    />
  )
}
