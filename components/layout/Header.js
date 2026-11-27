// 'use client'

// import { useState } from 'react'
// import { usePathname, useSearchParams, useRouter } from 'next/navigation'
// import { Bell, MapPin, ChevronDown, Menu, Search } from 'lucide-react'
// import { Button } from '@/components/ui/button'
// import BranchSelector from '@/components/shared/BranchSelector'
// import { getCurrentUser } from '@/lib/auth'
// import { getInitials } from '@/lib/utils'
// import { isSuperAdmin } from '@/lib/permissions'
// import { cn } from '@/lib/utils'
// import { useInboxHeader } from '@/contexts/InboxHeaderContext'

// const INBOX_FILTERS = [
//   { value: 'all', label: 'All Customers' },
//   { value: 'leads', label: 'Leads' },
//   { value: 'teachers', label: 'Teachers' },
// ]

// /**
//  * Header matching Figma highlighted section: W 1204 H 86, Auto layout, Gap 24px, Padding 24px.
//  * On Inbox: left = All Customers | Leads | Teachers tabs; right = search+notification | All Branch | profile.
//  */
// export default function Header({ title, subtitle, onMenuClick }) {
//   const [showNotifications, setShowNotifications] = useState(false)
//   const user = getCurrentUser()
//   const { inboxTeachersCount } = useInboxHeader()
//   const pathname = usePathname()
//   const searchParams = useSearchParams()
//   const router = useRouter()
//   const isInbox = pathname?.startsWith('/inbox')
//   const inboxFilter = (isInbox && searchParams?.get('filter')) || 'all'

//   const setInboxFilter = (value) => {
//     const params = new URLSearchParams(searchParams?.toString() || '')
//     params.set('filter', value)
//     router.push(`/inbox?${params.toString()}`)
//   }

//   return (
//     <header className="sticky top-0 z-30 min-h-[86px] border-b border-slate-200/80 bg-white">
//       <div className="flex min-h-[86px] items-center justify-between gap-6 px-6">
//         {/* Left: on Inbox show 3 filter tabs (All Customers, Leads, Teachers); else spacer for right alignment */}
//         {isInbox ? (
//           <div className="flex h-[38px] items-center gap-5 shrink-0">
//             {INBOX_FILTERS.map(({ value, label }) => {
//               const isActive = inboxFilter === value
//               const isTeachers = value === 'teachers'
//               return (
//                 <button
//                   key={value}
//                   onClick={() => setInboxFilter(value)}
//                   className={cn(
//                     'h-[38px] px-4 rounded-full text-sm font-normal transition-colors shrink-0',
//                     isActive
//                       ? 'bg-[var(--studio-primary)] text-white'
//                       : 'bg-transparent text-[var(--studio-primary)] hover:bg-[var(--studio-primary-light)]'
//                   )}
//                 >
//                   {isTeachers ? (
//                     <span className="flex items-center gap-2">
//                       <span>{label}</span>
//                       <span
//                         className={cn(
//                           'min-w-[24px] h-6 px-2 rounded-full text-xs font-medium flex items-center justify-center',
//                           isActive
//                             ? 'bg-white text-[var(--studio-primary)]'
//                             : 'bg-[var(--studio-primary-light)] text-[var(--studio-primary)]'
//                         )}
//                       >
//                         {inboxTeachersCount}
//                       </span>
//                     </span>
//                   ) : (
//                     label
//                   )}
//                 </button>
//               )
//             })}
//           </div>
//         ) : (
//           <div className="flex-1" />
//         )}

//         {/* Right: menu (mobile) + search+notification pill + All Branch + profile */}
//         <div className="flex items-center gap-6 shrink-0">
//         {/* Mobile: menu on far left */}
//         <Button
//           variant="ghost"
//           size="icon"
//           onClick={onMenuClick}
//           className="md:hidden h-[38px] w-[38px] rounded-lg text-slate-600 absolute left-4"
//           aria-label="Open menu"
//         >
//           <Menu className="h-5 w-5" />
//         </Button>

//         {/* Right-aligned block: Search+Notification combined | All Branch | User profile */}
//         <div className="flex items-center gap-6">
//         {/* 1. Notification + Search combined – pill container, inner elements 38px */}
//         <div className="flex items-center h-[38px] gap-1 rounded-full bg-slate-100 shrink-0 px-0.5">
//           <div className="relative">
//             <Button
//               variant="ghost"
//               size="icon"
//               onClick={() => setShowNotifications(!showNotifications)}
//               className="h-[38px] w-[38px] rounded-full text-slate-500 hover:bg-slate-200/80 shrink-0"
//               aria-label="Notifications"
//             >
//               <Bell className="h-5 w-5" />
//             </Button>
//             {showNotifications && (
//               <>
//                 <div className="fixed inset-0 z-40" onClick={() => setShowNotifications(false)} />
//                 <div className="absolute right-0 top-full mt-2 w-80 z-50 rounded-xl border border-slate-200 bg-white shadow-xl">
//                   <div className="p-4 border-b border-slate-200">
//                     <h3 className="font-semibold text-sm text-slate-900">Notifications</h3>
//                   </div>
//                   <div className="p-4 text-sm text-slate-500">No new notifications.</div>
//                 </div>
//               </>
//             )}
//           </div>
//           <Button
//             variant="ghost"
//             size="icon"
//             className="h-[38px] w-[38px] rounded-full text-slate-500 hover:bg-slate-200/80 shrink-0"
//             aria-label="Search"
//           >
//             <Search className="h-5 w-5" />
//           </Button>
//         </div>

//         {/* 2. All Branch – backend-connected; UI only. Super admin = dropdown, others = read-only label */}
//         <div className="w-[200px] shrink-0">
//           {isSuperAdmin() ? (
//             <BranchSelector />
//           ) : (
//             <div
//               className={cn(
//                 'flex items-center justify-between gap-2 h-[38px] px-3 rounded-[32px]',
//                 'bg-[#F1F5F9]'
//               )}
//             >
//               <div className="flex items-center gap-1.5 min-w-0">
//                 <MapPin className="h-5 w-5 shrink-0 text-[#94A3B8]" />
//                 <span className="text-sm font-normal truncate" style={{ color: '#94A3B8' }}>
//                   {user?.branchName || 'All Branch'}
//                 </span>
//               </div>
//               <ChevronDown className="h-4 w-4 shrink-0 text-[#94A3B8]" />
//             </div>
//           )}
//         </div>

//         {/* 3. User profile – avatar + name (line 1) + email (line 2, below name) */}
//         <div className="flex items-center gap-2 shrink-0">
//           <div
//             className="h-[38px] w-[38px] rounded-full bg-slate-200 flex items-center justify-center text-sm font-medium text-slate-600 shrink-0"
//             aria-hidden
//           >
//             {user ? getInitials(user.name) : '?'}
//           </div>
//           <div className="flex flex-col items-start min-w-0 hidden sm:block">
//             <span className="text-sm font-normal text-[#050312] block leading-tight">
//               {user ? `Hi, ${user.name || 'User'}` : 'Hi, User'}
//             </span>
//             <span className="text-xs font-normal text-[#94A3B8] block leading-tight mt-0.5">
//               {user?.email || '—'}
//             </span>
//           </div>
//         </div>
//         </div>
//       </div>
//       </div>
//     </header>
//   );
// }

"use client";

import { useState, useEffect, useRef } from "react";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { Menu, LogOut, Moon, Sun } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";
import { Button } from "@/components/ui/button";
import BranchSelector from "@/components/shared/BranchSelector";
import StaffLocationSwitcher from "@/components/shared/StaffLocationSwitcher";
import CreateEnrollmentSheet from "@/components/enrollment/CreateEnrollmentSheet";
import SellIntroSheet from "@/components/enrollment/SellIntroSheet";
import EnrollMenu from "@/components/enrollment/EnrollMenu";
import { CreateEventPurchaseDialog } from "@/app/settings/setup/components/EventsPurchases";
import { getCurrentUser, logout } from "@/lib/auth";
import { getInitials, cn } from "@/lib/utils";
import { isSuperAdmin, hasPermission } from "@/lib/permissions";
import { useInboxHeader } from "@/contexts/InboxHeaderContext";

const INBOX_FILTERS = [
  { value: "all", label: "Customers", countKey: "customers" },
  { value: "leads", label: "Leads", countKey: "leads" },
  { value: "teachers", label: "Teachers", countKey: "teachers" },
  // Numbers texted from the Inbox that aren't a lead, customer or teacher.
  { value: "other", label: "Other", countKey: "other" },
];

export default function Header({
  title,
  subtitle,
  onMenuClick,
  mobileMenuOpen = false,
}) {
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [createEnrollmentOpen, setCreateEnrollmentOpen] = useState(false);
  const [sellIntroOpen, setSellIntroOpen] = useState(false);
  const [enrollMode, setEnrollMode] = useState("service");
  const [purchaseOpen, setPurchaseOpen] = useState(false);
  const profileRef = useRef(null);
  const user = getCurrentUser();
  const shortName = (user?.name || "").trim().split(/\s+/).filter(Boolean)[0];
  const { theme, setTheme, mounted: themeMounted } = useTheme();

  useEffect(() => {
    function handleClickOutside(event) {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setShowProfileMenu(false);
      }
    }
    if (showProfileMenu) {
      document.addEventListener("click", handleClickOutside);
      return () => document.removeEventListener("click", handleClickOutside);
    }
  }, [showProfileMenu]);

  const { inboxCounts } = useInboxHeader();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  const isInbox =
    pathname === "/inbox" ||
    pathname === "/inbox/all-messages" ||
    pathname === "/inbox/talk-to-assistant";
  const isForms = pathname?.startsWith("/marketing/form-builder");
  const isEmails = pathname?.startsWith("/marketing/email-builder");
  const isAICalling = pathname?.startsWith("/ai-automation/ai-calling");
  const isAIMessaging = pathname?.startsWith("/ai-automation/ai-messaging");
  const inboxFilter = (isInbox && searchParams?.get("filter")) || "all";
  const formsView = isForms ? searchParams?.get("view") || "templates" : null;
  const emailsView = isEmails ? searchParams?.get("view") || "templates" : null;
  const aiCallingView = isAICalling
    ? searchParams?.get("view") || "scripts"
    : null;
  const rawMessagingView = searchParams?.get("view");
  const canOpenMessagingReviewView =
    !["cloned-review-rag", "ai-reply-reviews"].includes(rawMessagingView) || isSuperAdmin();
  const aiMessagingView = isAIMessaging
    ? ["prompt", "knowledge-base", "playbook", "cloned-review-rag", "ai-reply-reviews"].includes(rawMessagingView) && canOpenMessagingReviewView
      ? rawMessagingView
      : "prompt"
    : null;

  const setInboxFilter = (value) => {
    const params = new URLSearchParams(searchParams?.toString() || "");
    params.set("filter", value);
    const base =
      pathname === "/inbox/all-messages"
        ? "/inbox/all-messages"
        : pathname === "/inbox/talk-to-assistant"
          ? "/inbox/talk-to-assistant"
          : "/inbox";
    router.push(`${base}?${params.toString()}`);
  };

  const setFormsView = (value) => {
    if (!isForms) return;
    const params = new URLSearchParams(searchParams?.toString() || "");
    params.set("view", value);
    router.push(`/marketing/form-builder?${params.toString()}`);
  };

  const setEmailsView = (value) => {
    if (!isEmails) return;
    const params = new URLSearchParams(searchParams?.toString() || "");
    params.set("view", value);
    router.push(`/marketing/email-builder?${params.toString()}`);
  };

  const setAICallingView = (value) => {
    if (!isAICalling) return;
    const params = new URLSearchParams(searchParams?.toString() || "");
    params.set("view", value);
    router.push(`/ai-automation/ai-calling?${params.toString()}`);
  };

  const setAIMessagingView = (value) => {
    if (!isAIMessaging) return;
    const params = new URLSearchParams(searchParams?.toString() || "");
    params.set("view", value);
    router.push(`/ai-automation/ai-messaging?${params.toString()}`);
  };

  return (
    <>
      <header className="sticky top-0 z-[60] border-b py-3 border-border bg-background">
        <div className="flex flex-col gap-3 px-3 sm:px-4 lg:px-6 lg:flex-row lg:items-center lg:justify-between">
          {/* LEFT SECTION — ROUTE-SPECIFIC NAV */}
          <div className="order-2 lg:order-1 w-full min-w-0 overflow-x-auto scrollbar-hide lg:flex-1 lg:pr-2">
            {isInbox ? (
              <div className="flex w-max items-center gap-0.5 h-9 rounded-full bg-muted p-1">
                {INBOX_FILTERS.map(({ value, label, countKey }) => {
                  const isActive = inboxFilter === value;
                  const unread = inboxCounts?.unread?.[countKey] ?? 0;

                  return (
                    <button
                      key={value}
                      onClick={() => setInboxFilter(value)}
                      className={cn(
                        "flex items-center gap-1.5 px-3 h-7 rounded-full text-[13px] font-medium transition-colors duration-200",
                        isActive
                          ? "bg-background text-[var(--studio-primary)] shadow-sm"
                          : "text-muted-foreground hover:text-[var(--studio-primary)]",
                      )}
                    >
                      <span>{label}</span>
                      {unread > 0 && (
                        <span
                          className="h-[18px] min-w-[18px] px-1 rounded-full bg-[var(--studio-primary)] text-white text-[11px] font-semibold flex items-center justify-center tabular-nums"
                          title={`${unread} unread`}
                        >
                          {unread > 99 ? "99+" : unread}
                          <span className="sr-only"> unread</span>
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            ) : isForms ? (
              <div className="flex items-center h-[44px]">
                <div className="flex w-max items-center gap-5 sm:gap-8 rounded-full bg-muted px-4 sm:px-6 py-2">
                  {[
                    { value: "templates", label: "Templates" },
                    { value: "builder", label: "Form Builder" },
                    { value: "analytics", label: "Analytics" },
                  ].map(({ value, label }) => {
                    const isActive = formsView === value;
                    return (
                      <button
                        key={value}
                        onClick={() => setFormsView(value)}
                        className={cn(
                          "text-sm font-medium transition-colors duration-200 whitespace-nowrap",
                          isActive
                            ? "text-[var(--studio-primary)]"
                            : "text-muted-foreground",
                        )}
                      >
                        {label}
                      </button>
                    );
                  })}
                </div>
              </div>
            ) : isEmails ? (
              <div className="flex items-center h-[44px]">
                <div className="flex w-max items-center gap-5 sm:gap-8 rounded-full bg-muted px-4 sm:px-6 py-2">
                  {[
                    { value: "templates", label: "Templates" },
                    { value: "analytics", label: "Analytics" },
                  ].map(({ value, label }) => {
                    const isActive =
                      emailsView === value ||
                      (value === "templates" &&
                        (emailsView === "builder" || emailsView === "bulk"));
                    return (
                      <button
                        key={value}
                        type="button"
                        onClick={() => setEmailsView(value)}
                        className={cn(
                          "text-sm font-medium transition-colors duration-200 whitespace-nowrap",
                          isActive
                            ? "text-[var(--studio-primary)]"
                            : "text-muted-foreground",
                        )}
                      >
                        {label}
                      </button>
                    );
                  })}
                </div>
              </div>
            ) : isAICalling ? (
              <div className="flex items-center h-[44px]">
                <div className="flex w-max items-center gap-5 sm:gap-8 rounded-full bg-muted px-4 sm:px-6 py-2">
                  {[
                    { value: "scripts", label: "Scripts" },
                    { value: "personas", label: "AI Personas" },
                    { value: "knowledge", label: "Knowledge Base" },
                    { value: "background-sounds", label: "Background Sounds" },
                    { value: "inbound-ivr", label: "Inbound IVR" },
                    { value: "assistants", label: "AI Assist" },
                  ].map(({ value, label }) => {
                    const isActive = aiCallingView === value;
                    return (
                      <button
                        key={value}
                        onClick={() => setAICallingView(value)}
                        className={cn(
                          "text-sm font-medium transition-colors duration-200 whitespace-nowrap",
                          isActive
                            ? "text-[var(--studio-primary)]"
                            : "text-muted-foreground",
                        )}
                      >
                        {label}
                      </button>
                    );
                  })}
                </div>
              </div>
            ) : isAIMessaging ? (
              <div className="flex h-[44px] items-center">
                <div className="flex w-max items-center gap-3 rounded-full bg-muted px-3 py-2 sm:gap-4 sm:px-4">
                  {[
                    { value: "prompt", label: "Prompt" },
                    { value: "knowledge-base", label: "Knowledge base" },
                    { value: "playbook", label: "Conversation playbook" },
                    ...(isSuperAdmin() ? [
                      { value: "cloned-review-rag", label: "Cloned review RAG" },
                      { value: "ai-reply-reviews", label: "AI Reply Reviews" },
                    ] : []),
                  ].map(({ value, label }) => {
                    const isActive = aiMessagingView === value;
                    return (
                      <button
                        key={value}
                        type="button"
                        onClick={() => setAIMessagingView(value)}
                        className={cn(
                          "whitespace-nowrap text-sm font-medium transition-colors duration-200",
                          isActive
                            ? "text-[var(--studio-primary)]"
                            : "text-muted-foreground",
                        )}
                      >
                        {label}
                      </button>
                    );
                  })}
                </div>
              </div>
            ) : title ? (
              <div className="flex min-w-0 flex-col justify-center py-0.5">
                <h1 className="truncate text-[19px] font-bold leading-tight text-foreground">
                  {title}
                </h1>
                {subtitle && (
                  <p className="mt-0.5 truncate text-[13px] leading-tight text-muted-foreground">
                    {subtitle}
                  </p>
                )}
              </div>
            ) : null}
          </div>

          {/* RIGHT SECTION */}
          <div className="order-1 lg:order-2 w-full lg:w-auto flex items-center justify-between lg:justify-end gap-2 sm:gap-3 lg:gap-4 xl:gap-6 shrink-0">
            <div className="flex items-center gap-2 lg:hidden">
              <Button
                variant="ghost"
                size="icon"
                onClick={onMenuClick}
                className={cn(
                  "h-[38px] w-[38px] rounded-lg text-muted-foreground",
                  mobileMenuOpen && "bg-muted text-foreground",
                )}
                aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              >
                <Menu className="h-5 w-5" />
              </Button>
            </div>

            <div className="flex items-center gap-2 sm:gap-3 lg:gap-4 xl:gap-6 ml-auto">
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="h-[38px] w-[38px] rounded-full text-muted-foreground hover:bg-muted shrink-0"
                aria-label={
                  theme === "dark"
                    ? "Switch to light mode"
                    : "Switch to dark mode"
                }
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              >
                {!themeMounted ? (
                  <Sun className="h-5 w-5 opacity-60" aria-hidden />
                ) : theme === "dark" ? (
                  <Sun className="h-5 w-5" aria-hidden />
                ) : (
                  <Moon className="h-5 w-5" aria-hidden />
                )}
              </Button>

              {/* BRANCH / LOCATION SELECTOR */}
              <div className="hidden md:block w-[170px] lg:w-[200px]">
                {isSuperAdmin() ? <BranchSelector /> : <StaffLocationSwitcher />}
              </div>

              {/* CREATE ENROLLMENT (desktop only) */}
              {hasPermission("calendar", "enrollment", "write") && (
                <div className="hidden md:block">
                  <EnrollMenu
                    label="Enroll"
                    onSelectMode={(mode) => {
                      if (mode === "trial") {
                        if (!hasPermission("settings", "Billings", "write")) return;
                        setSellIntroOpen(true);
                        return;
                      }
                      setEnrollMode(mode);
                      setCreateEnrollmentOpen(true);
                    }}
                    onSelectEvent={() => setPurchaseOpen(true)}
                  />
                </div>
              )}

              {/* USER PROFILE – click to open dropdown with Logout */}
              <div className="relative" ref={profileRef}>
                <button
                  type="button"
                  onClick={() => setShowProfileMenu((prev) => !prev)}
                  className="flex items-center gap-2 rounded-lg px-1 py-1.5 hover:bg-muted transition-colors text-left min-w-0"
                  aria-expanded={showProfileMenu}
                  aria-haspopup="true"
                >
                  <div className="h-[38px] w-[38px] rounded-full bg-brand flex items-center justify-center text-sm font-semibold text-brand-foreground shrink-0">
                    {user ? getInitials(user.name) : "?"}
                  </div>
                  <div className="hidden xl:flex flex-col min-w-0 max-w-[140px] xl:max-w-none items-start">
                    <span className="block text-sm text-foreground leading-tight truncate w-full">
                      {user ? `Hi, ${shortName || "User"}` : "Hi, User"}
                    </span>
                    <span className="block text-xs text-muted-foreground leading-tight mt-1 truncate w-full">
                      {user?.email || "—"}
                    </span>
                  </div>
                </button>

                {showProfileMenu && (
                  <div
                    className="absolute right-0 top-full mt-2 w-48 z-50 rounded-lg border border-border bg-popover text-popover-foreground shadow-lg py-1"
                    role="menu"
                  >
                    <button
                      type="button"
                      onClick={() => {
                        setShowProfileMenu(false);
                        logout();
                      }}
                      className="flex w-full items-center gap-2 px-4 py-2.5 text-sm text-foreground hover:bg-muted transition-colors"
                      role="menuitem"
                    >
                      <LogOut className="h-4 w-4 text-muted-foreground" />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* BRANCH / LOCATION SELECTOR — MOBILE (hidden md:block above hides it) */}
          <div className="order-3 w-full md:hidden">
            {isSuperAdmin() ? <BranchSelector /> : <StaffLocationSwitcher />}
          </div>
        </div>
      </header>

      <CreateEnrollmentSheet
        open={createEnrollmentOpen}
        initialMode={enrollMode}
        onClose={() => setCreateEnrollmentOpen(false)}
        onSuccess={({ customerID, enrollmentID } = {}) => {
          setCreateEnrollmentOpen(false);
          // This sheet has no fixed customer — it isn't opened from a profile
          // page — so opening what was just created means navigating there.
          if (customerID) {
            const params = new URLSearchParams({ section: "services", view: "active-enrollments" });
            if (enrollmentID) params.set("enrollment", enrollmentID);
            // A hard nav, not router.push: this page reads its section/view/id
            // from window.location.search only once on mount, not reactively —
            // pushing to the same customer already open wouldn't refresh it.
            window.location.href = `/settings/users-roles/customers/${customerID}?${params.toString()}`;
          }
        }}
      />
      <SellIntroSheet
        open={sellIntroOpen}
        onClose={() => setSellIntroOpen(false)}
      />
      <CreateEventPurchaseDialog
        open={purchaseOpen}
        onClose={() => setPurchaseOpen(false)}
        onCreated={(purchase) => {
          setPurchaseOpen(false);
          const customerID = purchase?.customerID?._id ?? purchase?.customerID;
          if (customerID) {
            const params = new URLSearchParams({ section: "services", view: "purchases" });
            if (purchase?._id) params.set("purchase", purchase._id);
            window.location.href = `/settings/users-roles/customers/${customerID}?${params.toString()}`;
          }
        }}
      />
    </>
  );
}
