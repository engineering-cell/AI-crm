import { CalendarClock, Hash, Mail, Plus, Search, SlidersHorizontal, Users } from 'lucide-react'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { cn, getInitials, getContactDisplayName } from '@/lib/utils'
import { toStudioLocalDate } from '@/lib/studioLocalDate'
import { getStudioTimezone } from '@/lib/studioTimezone'

const GROUP_SUBTITLE = {
  Everyone: 'Everyone',
  Customers: 'Customers',
  Leads: 'Leads',
  Teachers: 'Teachers',
  Other: 'Other',
}

const STATUS_TABS = ['All', 'Unread', 'Scheduled']

const OTHER_ORIGIN_GROUPS = [
  { key: 'inbound', label: 'Inbound' },
  { key: 'outbound', label: 'Outbound' },
  { key: 'pending', label: 'Waiting' },
]

function resolveOtherOrigin(contact) {
  const raw = String(contact?.origin || '').toLowerCase()
  if (raw === 'inbound' || raw === 'outbound' || raw === 'pending') return raw
  if (contact?.reason) return 'inbound'
  return 'outbound'
}

/** Compact list time: today → 5:04 PM, this week → Tue, older → Oct 8. */
function formatListTime(value) {
  if (!value) return ''
  if (Number.isNaN(new Date(value).getTime())) return ''
  // Shifted onto the studio's wall clock, so "today" and the labels are the studio's.
  const d = toStudioLocalDate(new Date(value), getStudioTimezone())
  const now = toStudioLocalDate(new Date(), getStudioTimezone())
  if (d.toDateString() === now.toDateString()) {
    return d.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })
  }
  const ageDays = (now - d) / 86_400_000
  if (ageDays > 0 && ageDays < 6) return d.toLocaleDateString('en-US', { weekday: 'short' })
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
}

function ContactAvatar({ contact }) {
  const isOther = String(contact?.type || '').toLowerCase() === 'other'
  return (
    <Avatar className="h-10 w-10">
      <AvatarFallback
        className={cn(
          'text-sm font-semibold',
          isOther
            ? 'bg-muted text-muted-foreground ring-1 ring-inset ring-border'
            : 'bg-[color:var(--studio-primary)] text-white',
        )}
      >
        {isOther && !contact?.name ? (
          <Hash className="h-4 w-4" aria-hidden />
        ) : (
          getInitials(getContactDisplayName(contact))
        )}
      </AvatarFallback>
    </Avatar>
  )
}

function EmptyState({ title, body }) {
  return (
    <div className="px-6 py-14 text-center">
      <p className="text-sm font-medium text-foreground">{title}</p>
      <p className="mx-auto mt-1 max-w-[16rem] text-xs leading-relaxed text-muted-foreground">{body}</p>
    </div>
  )
}

function ScheduledSkeleton() {
  return (
    <div className="space-y-1 p-2" aria-hidden>
      {[0, 1, 2].map((i) => (
        <div key={i} className="flex items-center gap-3 rounded-lg px-2 py-3">
          <div className="h-10 w-10 rounded-full bg-muted animate-pulse" />
          <div className="flex-1 space-y-2">
            <div className="h-3 w-2/3 rounded bg-muted animate-pulse" />
            <div className="h-3 w-1/2 rounded bg-muted animate-pulse" />
          </div>
        </div>
      ))}
    </div>
  )
}

export default function ContactList({
  conversations,
  selectedConversation,
  onSelectConversation,
  searchQuery,
  onSearchChange,
  contactFilter,
  statusTab = 'All',
  onStatusTabChange,
  unreadCount = 0,
  isUnread = () => false,
  scheduledItems = [],
  scheduledLoading = false,
  selectedScheduledId = null,
  onSelectScheduled,
  onNewConversation,
  onBatchSend,
  canFilter = false,
  activeFilterCount = 0,
  filterApplying = false,
  filterError = null,
  onOpenFilters,
  onClearFilters,
}) {
  const filtered = canFilter && activeFilterCount > 0
  const showingScheduled = statusTab === 'Scheduled'
  const showType = contactFilter === 'Everyone'
  const query = searchQuery.trim()

  const tabCount = { Unread: unreadCount, Scheduled: scheduledItems.length }

  return (
    <aside className="flex flex-col min-h-0 bg-card h-full w-full lg:w-[340px] lg:shrink-0 rounded-none lg:rounded-l-lg border-r border-border">
      <div className="px-4 pt-4 pb-3">
        <div className="flex items-center justify-between gap-3">
          <div className="min-w-0">
            <h3 className="text-base font-semibold text-foreground leading-tight">Inbox</h3>
            <p className="text-xs text-muted-foreground truncate">
              {GROUP_SUBTITLE[contactFilter] || 'Conversations'}
            </p>
          </div>
          <div className="flex items-center gap-1.5 shrink-0">
            <button
              type="button"
              onClick={() => onBatchSend?.()}
              className="inline-flex h-8 items-center gap-1.5 rounded-lg border border-border bg-background px-2.5 text-xs font-medium text-foreground transition-colors hover:bg-muted active:scale-[0.98]"
            >
              <Users className="h-3.5 w-3.5 text-muted-foreground" aria-hidden />
              Bulk
            </button>
            <button
              type="button"
              onClick={() => onNewConversation?.()}
              className="inline-flex h-8 items-center gap-1 rounded-lg bg-[color:var(--studio-primary)] px-2.5 text-xs font-medium text-white transition-opacity hover:opacity-90 active:scale-[0.98]"
            >
              <Plus className="h-3.5 w-3.5" aria-hidden />
              New
            </button>
          </div>
        </div>

        <div className="mt-3 flex items-center gap-2">
          <label className="relative block min-w-0 flex-1">
            <span className="sr-only">Search conversations</span>
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" aria-hidden />
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder={showingScheduled ? 'Search scheduled…' : 'Search name, number or email…'}
              className="h-10 w-full rounded-lg border border-border bg-background pl-9 pr-3 text-sm text-foreground placeholder:text-muted-foreground outline-none transition-colors focus:border-[color:var(--studio-primary)] focus:ring-2 focus:ring-[color:var(--studio-primary)]/15"
            />
          </label>
          {canFilter && !showingScheduled && (
            <button
              type="button"
              onClick={() => onOpenFilters?.()}
              title={`Filter ${GROUP_SUBTITLE[contactFilter]?.toLowerCase() || 'contacts'}`}
              className={cn(
                'inline-flex h-10 shrink-0 items-center gap-1.5 rounded-lg border px-3 text-xs font-medium transition-colors active:scale-[0.98]',
                filtered
                  ? 'border-[color:var(--studio-primary)] bg-[color:var(--studio-primary-light)] text-[color:var(--studio-primary)]'
                  : 'border-border bg-background text-foreground hover:bg-muted',
              )}
            >
              <SlidersHorizontal className="h-3.5 w-3.5" aria-hidden />
              Filter
              {filtered && (
                <span className="min-w-[1.25rem] rounded-full bg-[color:var(--studio-primary)] px-1.5 text-[11px] font-semibold leading-5 text-white tabular-nums">
                  {activeFilterCount}
                </span>
              )}
            </button>
          )}
        </div>

        {filtered && !showingScheduled && (
          <div className="mt-2 flex items-center justify-between gap-2 text-xs">
            <span className={cn('truncate', filterError ? 'text-destructive' : 'text-muted-foreground')}>
              {filterError
                ? filterError
                : filterApplying
                  ? 'Applying filters…'
                  : `${activeFilterCount} ${activeFilterCount === 1 ? 'filter' : 'filters'} applied · ${conversations.length} ${conversations.length === 1 ? 'conversation' : 'conversations'}`}
            </span>
            <button
              type="button"
              onClick={() => onClearFilters?.()}
              className="shrink-0 font-medium text-[color:var(--studio-primary)] hover:underline"
            >
              Clear
            </button>
          </div>
        )}
      </div>

      <div role="tablist" aria-label="Conversation status" className="flex items-center gap-5 border-b border-border px-4">
        {STATUS_TABS.map((tab) => {
          const active = statusTab === tab
          const count = tabCount[tab]
          return (
            <button
              key={tab}
              type="button"
              role="tab"
              aria-selected={active}
              onClick={() => onStatusTabChange?.(tab)}
              className={cn(
                '-mb-px inline-flex items-center gap-1.5 border-b-2 py-2.5 text-sm transition-colors',
                active
                  ? 'border-[color:var(--studio-primary)] font-medium text-[color:var(--studio-primary)]'
                  : 'border-transparent text-muted-foreground hover:text-foreground',
              )}
            >
              {tab}
              {count > 0 && (
                <span
                  className={cn(
                    'min-w-[1.25rem] rounded-full px-1.5 text-[11px] font-medium leading-5 tabular-nums',
                    active || tab === 'Unread'
                      ? 'bg-[color:var(--studio-primary-light)] text-[color:var(--studio-primary)]'
                      : 'bg-muted text-muted-foreground',
                  )}
                >
                  {count}
                </span>
              )}
            </button>
          )
        })}
      </div>

      <div className="flex-1 overflow-y-auto scrollbar-hide">
        {showingScheduled ? (
          scheduledLoading && scheduledItems.length === 0 ? (
            <ScheduledSkeleton />
          ) : scheduledItems.length === 0 ? (
            query ? (
              <EmptyState title="No matches" body={`Nothing scheduled matches “${query}”.`} />
            ) : (
              <EmptyState
                title="Nothing scheduled"
                body="Schedule a reply or a bulk message and it waits here until it sends."
              />
            )
          ) : (
            <ul>
              {scheduledItems.map((item) => {
                const active = selectedScheduledId === item.id
                const bulk = item.recipientCount > 1
                return (
                  <li key={item.id}>
                    <button
                      type="button"
                      onClick={() => onSelectScheduled?.(item.id)}
                      className={cn(
                        'relative flex w-full items-center gap-3 border-b border-border/50 px-4 py-3 text-left transition-colors',
                        active ? 'bg-[color:var(--studio-primary-light)]' : 'hover:bg-muted/60',
                      )}
                    >
                      {active && <span className="absolute inset-y-0 left-0 w-[3px] bg-[color:var(--studio-primary)]" aria-hidden />}
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[color:var(--studio-primary-light)] text-[color:var(--studio-primary)]">
                        {bulk ? <Users className="h-4 w-4" aria-hidden /> : <CalendarClock className="h-4 w-4" aria-hidden />}
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="flex items-baseline justify-between gap-2">
                          <span className={cn('truncate text-sm font-medium', active ? 'text-[color:var(--studio-primary)]' : 'text-foreground')}>
                            {item.title}
                          </span>
                          <span className="shrink-0 text-[11px] tabular-nums text-muted-foreground">
                            {formatListTime(item.scheduledAt)}
                          </span>
                        </span>
                        <span className="mt-0.5 block text-xs text-muted-foreground">{item.meta}</span>
                        <span className="mt-0.5 block truncate text-[13px] text-muted-foreground">
                          {item.preview}
                        </span>
                      </span>
                    </button>
                  </li>
                )
              })}
            </ul>
          )
        ) : conversations.length === 0 ? (
          filtered && filterApplying ? (
            <EmptyState title="Applying filters…" body="Finding conversations that match." />
          ) : filtered ? (
            <EmptyState
              title="No matches"
              body={`No ${GROUP_SUBTITLE[contactFilter]?.toLowerCase() || 'conversations'} match these filters${query ? ` and “${query}”` : ''}.`}
            />
          ) : query ? (
            <EmptyState title="No matches" body={`No conversations match “${query}”.`} />
          ) : statusTab === 'Unread' ? (
            <EmptyState title="You're all caught up" body="New replies show up here until you open them." />
          ) : (
            <EmptyState title="No conversations yet" body="Start one with New, or message a group with Bulk." />
          )
        ) : contactFilter === 'Other' ? (
          <div>
            {OTHER_ORIGIN_GROUPS.map(({ key, label }) => {
              const group = conversations.filter(
                (c) => resolveOtherOrigin(c.contact) === key,
              )
              if (!group.length) return null
              return (
                <div key={key}>
                  <div className="sticky top-0 z-[1] border-b border-border/60 bg-card/95 px-4 py-1.5 backdrop-blur-sm">
                    <p className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
                      {label}
                      <span className="ml-1.5 font-medium tabular-nums text-muted-foreground/80">
                        {group.length}
                      </span>
                    </p>
                  </div>
                  <ul>
                    {group.map((conv) => {
                      const active = selectedConversation === conv.id
                      const unread = isUnread(conv)
                      return (
                        <li key={conv.id}>
                          <button
                            type="button"
                            onClick={() => onSelectConversation(conv.id)}
                            className={cn(
                              'relative flex w-full items-center gap-3 border-b border-border/50 px-4 py-3 text-left transition-colors',
                              active ? 'bg-[color:var(--studio-primary-light)]' : 'hover:bg-muted/60',
                            )}
                          >
                            {active && (
                              <span
                                className="absolute inset-y-0 left-0 w-[3px] bg-[color:var(--studio-primary)]"
                                aria-hidden
                              />
                            )}
                            <ContactAvatar contact={conv.contact} />
                            <span className="min-w-0 flex-1">
                              <span className="flex items-baseline justify-between gap-2">
                                <span
                                  className={cn(
                                    'truncate text-sm',
                                    unread ? 'font-semibold' : 'font-medium',
                                    active
                                      ? 'text-[color:var(--studio-primary)]'
                                      : 'text-foreground',
                                  )}
                                >
                                  {getContactDisplayName(conv.contact)}
                                </span>
                                <span
                                  className={cn(
                                    'shrink-0 text-[11px] tabular-nums',
                                    unread
                                      ? 'font-medium text-[color:var(--studio-primary)]'
                                      : 'text-muted-foreground',
                                  )}
                                >
                                  {formatListTime(conv.timestamp)}
                                </span>
                              </span>
                              <span className="mt-0.5 flex items-center gap-2">
                                <span
                                  className={cn(
                                    'flex min-w-0 flex-1 items-center gap-1 truncate text-[13px]',
                                    unread ? 'text-foreground' : 'text-muted-foreground',
                                  )}
                                >
                                  {conv.channel === 'Email' && (
                                    <Mail
                                      className="h-3 w-3 shrink-0 opacity-70"
                                      aria-label="Email"
                                    />
                                  )}
                                  <span className="truncate">
                                    {conv.lastMessage || 'No messages yet'}
                                  </span>
                                </span>
                                {unread && (
                                  <span className="h-2 w-2 shrink-0 rounded-full bg-[color:var(--studio-primary)]">
                                    <span className="sr-only">Unread</span>
                                  </span>
                                )}
                              </span>
                            </span>
                          </button>
                        </li>
                      )
                    })}
                  </ul>
                </div>
              )
            })}
          </div>
        ) : (
          <ul>
            {conversations.map((conv) => {
              const active = selectedConversation === conv.id
              const unread = isUnread(conv)
              return (
                <li key={conv.id}>
                  <button
                    type="button"
                    onClick={() => onSelectConversation(conv.id)}
                    className={cn(
                      'relative flex w-full items-center gap-3 border-b border-border/50 px-4 py-3 text-left transition-colors',
                      active ? 'bg-[color:var(--studio-primary-light)]' : 'hover:bg-muted/60',
                    )}
                  >
                    {active && <span className="absolute inset-y-0 left-0 w-[3px] bg-[color:var(--studio-primary)]" aria-hidden />}
                    <ContactAvatar contact={conv.contact} />
                    <span className="min-w-0 flex-1">
                      <span className="flex items-baseline justify-between gap-2">
                        <span
                          className={cn(
                            'truncate text-sm',
                            unread ? 'font-semibold' : 'font-medium',
                            active ? 'text-[color:var(--studio-primary)]' : 'text-foreground',
                          )}
                        >
                          {getContactDisplayName(conv.contact)}
                        </span>
                        <span
                          className={cn(
                            'shrink-0 text-[11px] tabular-nums',
                            unread ? 'font-medium text-[color:var(--studio-primary)]' : 'text-muted-foreground',
                          )}
                        >
                          {formatListTime(conv.timestamp)}
                        </span>
                      </span>
                      <span className="mt-0.5 flex items-center gap-2">
                        <span
                          className={cn(
                            'flex min-w-0 flex-1 items-center gap-1 truncate text-[13px]',
                            unread ? 'text-foreground' : 'text-muted-foreground',
                          )}
                        >
                          {conv.channel === 'Email' && <Mail className="h-3 w-3 shrink-0 opacity-70" aria-label="Email" />}
                          <span className="truncate">{conv.lastMessage || 'No messages yet'}</span>
                        </span>
                        {showType && (
                          <span className="shrink-0 text-[11px] text-muted-foreground">
                            {String(conv.contact?.type || '').toLowerCase() === 'other' ? 'Number' : conv.contact?.type}
                          </span>
                        )}
                        {unread && (
                          <span className="h-2 w-2 shrink-0 rounded-full bg-[color:var(--studio-primary)]">
                            <span className="sr-only">Unread</span>
                          </span>
                        )}
                      </span>
                    </span>
                  </button>
                </li>
              )
            })}
          </ul>
        )}
      </div>
    </aside>
  )
}
