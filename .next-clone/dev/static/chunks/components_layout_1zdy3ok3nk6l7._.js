(globalThis["TURBOPACK"] || (globalThis["TURBOPACK"] = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/components/layout/Header.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Header
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$menu$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Menu$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/menu.js [app-client] (ecmascript) <export default as Menu>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$log$2d$out$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__LogOut$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/log-out.js [app-client] (ecmascript) <export default as LogOut>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$moon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Moon$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/moon.js [app-client] (ecmascript) <export default as Moon>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sun$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Sun$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/sun.js [app-client] (ecmascript) <export default as Sun>");
var __TURBOPACK__imported__module__$5b$project$5d2f$contexts$2f$ThemeContext$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/contexts/ThemeContext.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/button.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$shared$2f$BranchSelector$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/shared/BranchSelector.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$shared$2f$StaffLocationSwitcher$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/shared/StaffLocationSwitcher.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$enrollment$2f$CreateEnrollmentSheet$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/enrollment/CreateEnrollmentSheet.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$enrollment$2f$SellIntroSheet$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/enrollment/SellIntroSheet.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$enrollment$2f$EnrollMenu$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/enrollment/EnrollMenu.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$settings$2f$setup$2f$components$2f$EventsPurchases$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/settings/setup/components/EventsPurchases.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/auth.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/utils.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$permissions$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/lib/permissions.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$contexts$2f$InboxHeaderContext$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/contexts/InboxHeaderContext.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
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
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
const INBOX_FILTERS = [
    {
        value: "all",
        label: "Customers",
        countKey: "customers"
    },
    {
        value: "leads",
        label: "Leads",
        countKey: "leads"
    },
    {
        value: "teachers",
        label: "Teachers",
        countKey: "teachers"
    },
    // Numbers texted from the Inbox that aren't a lead, customer or teacher.
    {
        value: "other",
        label: "Other",
        countKey: "other"
    }
];
function Header({ title, subtitle, onMenuClick, mobileMenuOpen = false }) {
    _s();
    const [showProfileMenu, setShowProfileMenu] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [createEnrollmentOpen, setCreateEnrollmentOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [sellIntroOpen, setSellIntroOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [enrollMode, setEnrollMode] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("service");
    const [purchaseOpen, setPurchaseOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const profileRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const user = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getCurrentUser"])();
    const shortName = (user?.name || "").trim().split(/\s+/).filter(Boolean)[0];
    const { theme, setTheme, mounted: themeMounted } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$contexts$2f$ThemeContext$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTheme"])();
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Header.useEffect": ()=>{
            function handleClickOutside(event) {
                if (profileRef.current && !profileRef.current.contains(event.target)) {
                    setShowProfileMenu(false);
                }
            }
            if (showProfileMenu) {
                document.addEventListener("click", handleClickOutside);
                return ({
                    "Header.useEffect": ()=>document.removeEventListener("click", handleClickOutside)
                })["Header.useEffect"];
            }
        }
    }["Header.useEffect"], [
        showProfileMenu
    ]);
    const { inboxCounts } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$contexts$2f$InboxHeaderContext$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useInboxHeader"])();
    const pathname = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePathname"])();
    const searchParams = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSearchParams"])();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const isInbox = pathname === "/inbox" || pathname === "/inbox/all-messages" || pathname === "/inbox/talk-to-assistant";
    const isForms = pathname?.startsWith("/marketing/form-builder");
    const isAICalling = pathname?.startsWith("/ai-automation/ai-calling");
    const isAIMessaging = pathname?.startsWith("/ai-automation/ai-messaging");
    const inboxFilter = isInbox && searchParams?.get("filter") || "all";
    const formsView = isForms ? searchParams?.get("view") || "templates" : null;
    const aiCallingView = isAICalling ? searchParams?.get("view") || "scripts" : null;
    const rawMessagingView = searchParams?.get("view");
    const aiMessagingView = isAIMessaging ? [
        "prompt",
        "knowledge-base",
        "playbook"
    ].includes(rawMessagingView) ? rawMessagingView : "prompt" : null;
    const setInboxFilter = (value)=>{
        const params = new URLSearchParams(searchParams?.toString() || "");
        params.set("filter", value);
        const base = pathname === "/inbox/all-messages" ? "/inbox/all-messages" : pathname === "/inbox/talk-to-assistant" ? "/inbox/talk-to-assistant" : "/inbox";
        router.push(`${base}?${params.toString()}`);
    };
    const setFormsView = (value)=>{
        if (!isForms) return;
        const params = new URLSearchParams(searchParams?.toString() || "");
        params.set("view", value);
        router.push(`/marketing/form-builder?${params.toString()}`);
    };
    const setAICallingView = (value)=>{
        if (!isAICalling) return;
        const params = new URLSearchParams(searchParams?.toString() || "");
        params.set("view", value);
        router.push(`/ai-automation/ai-calling?${params.toString()}`);
    };
    const setAIMessagingView = (value)=>{
        if (!isAIMessaging) return;
        const params = new URLSearchParams(searchParams?.toString() || "");
        params.set("view", value);
        router.push(`/ai-automation/ai-messaging?${params.toString()}`);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
                className: "sticky top-0 z-[60] border-b py-3 border-border bg-background",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex flex-col gap-3 px-3 sm:px-4 lg:px-6 lg:flex-row lg:items-center lg:justify-between",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "order-2 lg:order-1 w-full min-w-0 overflow-x-auto scrollbar-hide lg:flex-1 lg:pr-2",
                            children: isInbox ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex w-max items-center gap-0.5 h-9 rounded-full bg-muted p-1",
                                children: INBOX_FILTERS.map(({ value, label, countKey })=>{
                                    const isActive = inboxFilter === value;
                                    const unread = inboxCounts?.unread?.[countKey] ?? 0;
                                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>setInboxFilter(value),
                                        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("flex items-center gap-1.5 px-3 h-7 rounded-full text-[13px] font-medium transition-colors duration-200", isActive ? "bg-background text-[var(--studio-primary)] shadow-sm" : "text-muted-foreground hover:text-[var(--studio-primary)]"),
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                children: label
                                            }, void 0, false, {
                                                fileName: "[project]/components/layout/Header.js",
                                                lineNumber: 314,
                                                columnNumber: 23
                                            }, this),
                                            unread > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "h-[18px] min-w-[18px] px-1 rounded-full bg-[var(--studio-primary)] text-white text-[11px] font-semibold flex items-center justify-center tabular-nums",
                                                title: `${unread} unread`,
                                                children: [
                                                    unread > 99 ? "99+" : unread,
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "sr-only",
                                                        children: " unread"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/layout/Header.js",
                                                        lineNumber: 321,
                                                        columnNumber: 27
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/layout/Header.js",
                                                lineNumber: 316,
                                                columnNumber: 25
                                            }, this)
                                        ]
                                    }, value, true, {
                                        fileName: "[project]/components/layout/Header.js",
                                        lineNumber: 304,
                                        columnNumber: 21
                                    }, this);
                                })
                            }, void 0, false, {
                                fileName: "[project]/components/layout/Header.js",
                                lineNumber: 298,
                                columnNumber: 15
                            }, this) : isForms ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center h-[44px]",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex w-max items-center gap-5 sm:gap-8 rounded-full bg-muted px-4 sm:px-6 py-2",
                                    children: [
                                        {
                                            value: "templates",
                                            label: "Templates"
                                        },
                                        {
                                            value: "builder",
                                            label: "Form Builder"
                                        },
                                        {
                                            value: "analytics",
                                            label: "Analytics"
                                        }
                                    ].map(({ value, label })=>{
                                        const isActive = formsView === value;
                                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: ()=>setFormsView(value),
                                            className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("text-sm font-medium transition-colors duration-200 whitespace-nowrap", isActive ? "text-[var(--studio-primary)]" : "text-muted-foreground"),
                                            children: label
                                        }, value, false, {
                                            fileName: "[project]/components/layout/Header.js",
                                            lineNumber: 338,
                                            columnNumber: 23
                                        }, this);
                                    })
                                }, void 0, false, {
                                    fileName: "[project]/components/layout/Header.js",
                                    lineNumber: 330,
                                    columnNumber: 17
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/components/layout/Header.js",
                                lineNumber: 329,
                                columnNumber: 15
                            }, this) : isAICalling ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center h-[44px]",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex w-max items-center gap-5 sm:gap-8 rounded-full bg-muted px-4 sm:px-6 py-2",
                                    children: [
                                        {
                                            value: "scripts",
                                            label: "Scripts"
                                        },
                                        {
                                            value: "personas",
                                            label: "AI Personas"
                                        },
                                        {
                                            value: "knowledge",
                                            label: "Knowledge Base"
                                        },
                                        {
                                            value: "background-sounds",
                                            label: "Background Sounds"
                                        },
                                        {
                                            value: "inbound-ivr",
                                            label: "Inbound IVR"
                                        },
                                        {
                                            value: "assistants",
                                            label: "AI Assist"
                                        }
                                    ].map(({ value, label })=>{
                                        const isActive = aiCallingView === value;
                                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: ()=>setAICallingView(value),
                                            className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("text-sm font-medium transition-colors duration-200 whitespace-nowrap", isActive ? "text-[var(--studio-primary)]" : "text-muted-foreground"),
                                            children: label
                                        }, value, false, {
                                            fileName: "[project]/components/layout/Header.js",
                                            lineNumber: 367,
                                            columnNumber: 23
                                        }, this);
                                    })
                                }, void 0, false, {
                                    fileName: "[project]/components/layout/Header.js",
                                    lineNumber: 356,
                                    columnNumber: 17
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/components/layout/Header.js",
                                lineNumber: 355,
                                columnNumber: 15
                            }, this) : isAIMessaging ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex h-[44px] items-center",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex w-max items-center gap-5 rounded-full bg-muted px-4 py-2 sm:gap-8 sm:px-6",
                                    children: [
                                        {
                                            value: "prompt",
                                            label: "Prompt"
                                        },
                                        {
                                            value: "knowledge-base",
                                            label: "Knowledge base"
                                        },
                                        {
                                            value: "playbook",
                                            label: "Conversation playbook"
                                        }
                                    ].map(({ value, label })=>{
                                        const isActive = aiMessagingView === value;
                                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            type: "button",
                                            onClick: ()=>setAIMessagingView(value),
                                            className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("whitespace-nowrap text-sm font-medium transition-colors duration-200", isActive ? "text-[var(--studio-primary)]" : "text-muted-foreground"),
                                            children: label
                                        }, value, false, {
                                            fileName: "[project]/components/layout/Header.js",
                                            lineNumber: 393,
                                            columnNumber: 23
                                        }, this);
                                    })
                                }, void 0, false, {
                                    fileName: "[project]/components/layout/Header.js",
                                    lineNumber: 385,
                                    columnNumber: 17
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/components/layout/Header.js",
                                lineNumber: 384,
                                columnNumber: 15
                            }, this) : title ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex min-w-0 flex-col justify-center py-0.5",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                        className: "truncate text-[19px] font-bold leading-tight text-foreground",
                                        children: title
                                    }, void 0, false, {
                                        fileName: "[project]/components/layout/Header.js",
                                        lineNumber: 412,
                                        columnNumber: 17
                                    }, this),
                                    subtitle && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "mt-0.5 truncate text-[13px] leading-tight text-muted-foreground",
                                        children: subtitle
                                    }, void 0, false, {
                                        fileName: "[project]/components/layout/Header.js",
                                        lineNumber: 416,
                                        columnNumber: 19
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/layout/Header.js",
                                lineNumber: 411,
                                columnNumber: 15
                            }, this) : null
                        }, void 0, false, {
                            fileName: "[project]/components/layout/Header.js",
                            lineNumber: 296,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "order-1 lg:order-2 w-full lg:w-auto flex items-center justify-between lg:justify-end gap-2 sm:gap-3 lg:gap-4 xl:gap-6 shrink-0",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center gap-2 lg:hidden",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                        variant: "ghost",
                                        size: "icon",
                                        onClick: onMenuClick,
                                        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("h-[38px] w-[38px] rounded-lg text-muted-foreground", mobileMenuOpen && "bg-muted text-foreground"),
                                        "aria-label": mobileMenuOpen ? "Close menu" : "Open menu",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$menu$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Menu$3e$__["Menu"], {
                                            className: "h-5 w-5"
                                        }, void 0, false, {
                                            fileName: "[project]/components/layout/Header.js",
                                            lineNumber: 437,
                                            columnNumber: 17
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/components/layout/Header.js",
                                        lineNumber: 427,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/components/layout/Header.js",
                                    lineNumber: 426,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center gap-2 sm:gap-3 lg:gap-4 xl:gap-6 ml-auto",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                            type: "button",
                                            variant: "ghost",
                                            size: "icon",
                                            className: "h-[38px] w-[38px] rounded-full text-muted-foreground hover:bg-muted shrink-0",
                                            "aria-label": theme === "dark" ? "Switch to light mode" : "Switch to dark mode",
                                            onClick: ()=>setTheme(theme === "dark" ? "light" : "dark"),
                                            children: !themeMounted ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sun$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Sun$3e$__["Sun"], {
                                                className: "h-5 w-5 opacity-60",
                                                "aria-hidden": true
                                            }, void 0, false, {
                                                fileName: "[project]/components/layout/Header.js",
                                                lineNumber: 455,
                                                columnNumber: 19
                                            }, this) : theme === "dark" ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sun$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Sun$3e$__["Sun"], {
                                                className: "h-5 w-5",
                                                "aria-hidden": true
                                            }, void 0, false, {
                                                fileName: "[project]/components/layout/Header.js",
                                                lineNumber: 457,
                                                columnNumber: 19
                                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$moon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Moon$3e$__["Moon"], {
                                                className: "h-5 w-5",
                                                "aria-hidden": true
                                            }, void 0, false, {
                                                fileName: "[project]/components/layout/Header.js",
                                                lineNumber: 459,
                                                columnNumber: 19
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/components/layout/Header.js",
                                            lineNumber: 442,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "hidden md:block w-[170px] lg:w-[200px]",
                                            children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$permissions$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["isSuperAdmin"])() ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$shared$2f$BranchSelector$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                                                fileName: "[project]/components/layout/Header.js",
                                                lineNumber: 465,
                                                columnNumber: 35
                                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$shared$2f$StaffLocationSwitcher$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                                                fileName: "[project]/components/layout/Header.js",
                                                lineNumber: 465,
                                                columnNumber: 56
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/components/layout/Header.js",
                                            lineNumber: 464,
                                            columnNumber: 15
                                        }, this),
                                        (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$permissions$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["hasPermission"])("calendar", "enrollment", "write") && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "hidden md:block",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$enrollment$2f$EnrollMenu$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                label: "Enroll",
                                                onSelectMode: (mode)=>{
                                                    if (mode === "trial") {
                                                        if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$permissions$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["hasPermission"])("settings", "Billings", "write")) return;
                                                        setSellIntroOpen(true);
                                                        return;
                                                    }
                                                    setEnrollMode(mode);
                                                    setCreateEnrollmentOpen(true);
                                                },
                                                onSelectEvent: ()=>setPurchaseOpen(true)
                                            }, void 0, false, {
                                                fileName: "[project]/components/layout/Header.js",
                                                lineNumber: 471,
                                                columnNumber: 19
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/components/layout/Header.js",
                                            lineNumber: 470,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "relative",
                                            ref: profileRef,
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    type: "button",
                                                    onClick: ()=>setShowProfileMenu((prev)=>!prev),
                                                    className: "flex items-center gap-2 rounded-lg px-1 py-1.5 hover:bg-muted transition-colors text-left min-w-0",
                                                    "aria-expanded": showProfileMenu,
                                                    "aria-haspopup": "true",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "h-[38px] w-[38px] rounded-full bg-brand flex items-center justify-center text-sm font-semibold text-brand-foreground shrink-0",
                                                            children: user ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getInitials"])(user.name) : "?"
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/layout/Header.js",
                                                            lineNumber: 496,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "hidden xl:flex flex-col min-w-0 max-w-[140px] xl:max-w-none items-start",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "block text-sm text-foreground leading-tight truncate w-full",
                                                                    children: user ? `Hi, ${shortName || "User"}` : "Hi, User"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/components/layout/Header.js",
                                                                    lineNumber: 500,
                                                                    columnNumber: 21
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "block text-xs text-muted-foreground leading-tight mt-1 truncate w-full",
                                                                    children: user?.email || "—"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/components/layout/Header.js",
                                                                    lineNumber: 503,
                                                                    columnNumber: 21
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/components/layout/Header.js",
                                                            lineNumber: 499,
                                                            columnNumber: 19
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/components/layout/Header.js",
                                                    lineNumber: 489,
                                                    columnNumber: 17
                                                }, this),
                                                showProfileMenu && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "absolute right-0 top-full mt-2 w-48 z-50 rounded-lg border border-border bg-popover text-popover-foreground shadow-lg py-1",
                                                    role: "menu",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        type: "button",
                                                        onClick: ()=>{
                                                            setShowProfileMenu(false);
                                                            (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["logout"])();
                                                        },
                                                        className: "flex w-full items-center gap-2 px-4 py-2.5 text-sm text-foreground hover:bg-muted transition-colors",
                                                        role: "menuitem",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$log$2d$out$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__LogOut$3e$__["LogOut"], {
                                                                className: "h-4 w-4 text-muted-foreground"
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/layout/Header.js",
                                                                lineNumber: 523,
                                                                columnNumber: 23
                                                            }, this),
                                                            "Logout"
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/components/layout/Header.js",
                                                        lineNumber: 514,
                                                        columnNumber: 21
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/components/layout/Header.js",
                                                    lineNumber: 510,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/layout/Header.js",
                                            lineNumber: 488,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/layout/Header.js",
                                    lineNumber: 441,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/layout/Header.js",
                            lineNumber: 425,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "order-3 w-full md:hidden",
                            children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$permissions$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["isSuperAdmin"])() ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$shared$2f$BranchSelector$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                                fileName: "[project]/components/layout/Header.js",
                                lineNumber: 534,
                                columnNumber: 31
                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$shared$2f$StaffLocationSwitcher$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                                fileName: "[project]/components/layout/Header.js",
                                lineNumber: 534,
                                columnNumber: 52
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/components/layout/Header.js",
                            lineNumber: 533,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/layout/Header.js",
                    lineNumber: 294,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/layout/Header.js",
                lineNumber: 293,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$enrollment$2f$CreateEnrollmentSheet$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                open: createEnrollmentOpen,
                initialMode: enrollMode,
                onClose: ()=>setCreateEnrollmentOpen(false),
                onSuccess: ({ customerID, enrollmentID } = {})=>{
                    setCreateEnrollmentOpen(false);
                    // This sheet has no fixed customer — it isn't opened from a profile
                    // page — so opening what was just created means navigating there.
                    if (customerID) {
                        const params = new URLSearchParams({
                            section: "services",
                            view: "active-enrollments"
                        });
                        if (enrollmentID) params.set("enrollment", enrollmentID);
                        // A hard nav, not router.push: this page reads its section/view/id
                        // from window.location.search only once on mount, not reactively —
                        // pushing to the same customer already open wouldn't refresh it.
                        window.location.href = `/settings/users-roles/customers/${customerID}?${params.toString()}`;
                    }
                }
            }, void 0, false, {
                fileName: "[project]/components/layout/Header.js",
                lineNumber: 539,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$enrollment$2f$SellIntroSheet$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                open: sellIntroOpen,
                onClose: ()=>setSellIntroOpen(false)
            }, void 0, false, {
                fileName: "[project]/components/layout/Header.js",
                lineNumber: 557,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$settings$2f$setup$2f$components$2f$EventsPurchases$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CreateEventPurchaseDialog"], {
                open: purchaseOpen,
                onClose: ()=>setPurchaseOpen(false),
                onCreated: (purchase)=>{
                    setPurchaseOpen(false);
                    const customerID = purchase?.customerID?._id ?? purchase?.customerID;
                    if (customerID) {
                        const params = new URLSearchParams({
                            section: "services",
                            view: "purchases"
                        });
                        if (purchase?._id) params.set("purchase", purchase._id);
                        window.location.href = `/settings/users-roles/customers/${customerID}?${params.toString()}`;
                    }
                }
            }, void 0, false, {
                fileName: "[project]/components/layout/Header.js",
                lineNumber: 561,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/layout/Header.js",
        lineNumber: 292,
        columnNumber: 5
    }, this);
}
_s(Header, "hoTbsgnzlDyIi1UqnxrPEsu7r8Y=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$contexts$2f$ThemeContext$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTheme"],
        __TURBOPACK__imported__module__$5b$project$5d2f$contexts$2f$InboxHeaderContext$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useInboxHeader"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePathname"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSearchParams"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"]
    ];
});
_c = Header;
var _c;
__turbopack_context__.k.register(_c, "Header");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/layout/MainLayout.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>MainLayout
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/auth.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$permissions$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/lib/permissions.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$menu$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Menu$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/menu.js [app-client] (ecmascript) <export default as Menu>");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$toast$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/toast.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/button.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$layout$2f$Sidebar$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/layout/Sidebar.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$layout$2f$Header$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/layout/Header.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$human$2d$queue$2f$GlobalIncomingCallAlert$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/human-queue/GlobalIncomingCallAlert.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/utils.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
;
;
;
;
;
;
function MainLayout({ children, title, subtitle, mainClassName, /** For pages that draw their own top bar — stacking both looks broken. */ hideHeader = false }) {
    _s();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const pathname = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePathname"])();
    const toast = (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$toast$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useToast"])();
    const [mobileMenuOpen, setMobileMenuOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isClient, setIsClient] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isAuth, setIsAuth] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    // Tracked separately from isAuth: an authenticated user who fails the route
    // check must not paint the page while the redirect is in flight.
    const [authorized, setAuthorized] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    // Only check authentication on client side to avoid hydration mismatch
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "MainLayout.useEffect": ()=>{
            setIsClient(true);
            const authenticated = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isAuthenticated"])();
            setIsAuth(authenticated);
            if (!authenticated) {
                setAuthorized(false);
                router.push('/auth/login');
                return;
            }
            // Check route access
            if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$permissions$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["canAccessRoute"])(pathname)) {
                setAuthorized(false);
                const destination = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$permissions$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["getDefaultRedirect"])();
                // Redirecting to the route we're already on would loop. getDefaultRedirect
                // only returns reachable routes now, so this should be unreachable — but
                // bail loudly rather than spin if a future mapping reintroduces the case.
                if (destination === pathname) return;
                toast.error({
                    title: 'Access denied',
                    message: "You don't have access to that page."
                });
                router.push(destination);
                return;
            }
            setAuthorized(true);
        }
    }["MainLayout.useEffect"], [
        pathname,
        router
    ]);
    // Pull fresh permissions from the server on mount and when the tab regains
    // focus, so a role edit lands within a minute instead of waiting for the user
    // to log out and back in. Throttled — focus fires often.
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "MainLayout.useEffect": ()=>{
            if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isAuthenticated"])()) return;
            let lastRefresh = 0;
            const REFRESH_INTERVAL_MS = 60_000;
            const maybeRefresh = {
                "MainLayout.useEffect.maybeRefresh": ()=>{
                    const now = Date.now();
                    if (now - lastRefresh < REFRESH_INTERVAL_MS) return;
                    lastRefresh = now;
                    // A permission change can make the current route unreachable, so re-run
                    // the guard against the refreshed session rather than leaving the user on
                    // a page they no longer have access to.
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["refreshSession"])().then({
                        "MainLayout.useEffect.maybeRefresh": (user)=>{
                            if (user) setAuthorized((0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$permissions$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["canAccessRoute"])(pathname));
                        }
                    }["MainLayout.useEffect.maybeRefresh"]);
                }
            }["MainLayout.useEffect.maybeRefresh"];
            maybeRefresh();
            window.addEventListener('focus', maybeRefresh);
            return ({
                "MainLayout.useEffect": ()=>window.removeEventListener('focus', maybeRefresh)
            })["MainLayout.useEffect"];
        }
    }["MainLayout.useEffect"], [
        pathname
    ]);
    // Switching the active location changes what every location-scoped request
    // returns, so reload the whole app — header, sidebar, and page all re-fetch
    // under the new location rather than leaving stale data behind.
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "MainLayout.useEffect": ()=>{
            const handleBranchChange = {
                "MainLayout.useEffect.handleBranchChange": ()=>{
                    window.location.reload();
                }
            }["MainLayout.useEffect.handleBranchChange"];
            window.addEventListener('branch-change', handleBranchChange);
            return ({
                "MainLayout.useEffect": ()=>window.removeEventListener('branch-change', handleBranchChange)
            })["MainLayout.useEffect"];
        }
    }["MainLayout.useEffect"], []);
    // Show nothing until client-side hydration is complete, and nothing at all
    // for a route the user can't access — otherwise the sidebar, header and full
    // page body paint for a frame before router.push lands.
    if (!isClient || !isAuth || !authorized) {
        return null;
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex h-screen overflow-hidden bg-background",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$layout$2f$Sidebar$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                mobileOpen: mobileMenuOpen,
                setMobileOpen: setMobileMenuOpen
            }, void 0, false, {
                fileName: "[project]/components/layout/MainLayout.js",
                lineNumber: 108,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex-1 flex flex-col overflow-hidden md:p-2",
                children: [
                    hideHeader ? // The header carries the only sidebar toggle below lg, so hiding it
                    // outright would strand mobile users — keep a slim strip for it.
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center border-b border-border bg-background px-2 py-1.5 lg:hidden",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                            variant: "ghost",
                            size: "icon",
                            onClick: ()=>setMobileMenuOpen((prev)=>!prev),
                            className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('h-9 w-9 rounded-lg text-muted-foreground', mobileMenuOpen && 'bg-muted text-foreground'),
                            "aria-label": mobileMenuOpen ? 'Close menu' : 'Open menu',
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$menu$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Menu$3e$__["Menu"], {
                                className: "h-5 w-5"
                            }, void 0, false, {
                                fileName: "[project]/components/layout/MainLayout.js",
                                lineNumber: 124,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/components/layout/MainLayout.js",
                            lineNumber: 114,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/layout/MainLayout.js",
                        lineNumber: 113,
                        columnNumber: 11
                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Suspense"], {
                        fallback: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
                            className: "sticky top-0 z-30 min-h-[86px] border-b border-border bg-background"
                        }, void 0, false, {
                            fileName: "[project]/components/layout/MainLayout.js",
                            lineNumber: 128,
                            columnNumber: 31
                        }, this),
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$layout$2f$Header$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                            title: title,
                            subtitle: subtitle,
                            mobileMenuOpen: mobileMenuOpen,
                            onMenuClick: ()=>setMobileMenuOpen((prev)=>!prev)
                        }, void 0, false, {
                            fileName: "[project]/components/layout/MainLayout.js",
                            lineNumber: 129,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/layout/MainLayout.js",
                        lineNumber: 128,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
                        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('flex-1 min-h-0 overflow-y-auto scrollbar-hide bg-background px-3 py-3 sm:px-4 sm:py-4 lg:px-2', mainClassName),
                        children: children
                    }, void 0, false, {
                        fileName: "[project]/components/layout/MainLayout.js",
                        lineNumber: 137,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/layout/MainLayout.js",
                lineNumber: 109,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Suspense"], {
                fallback: null,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$human$2d$queue$2f$GlobalIncomingCallAlert$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                    fileName: "[project]/components/layout/MainLayout.js",
                    lineNumber: 147,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/layout/MainLayout.js",
                lineNumber: 146,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/layout/MainLayout.js",
        lineNumber: 107,
        columnNumber: 5
    }, this);
}
_s(MainLayout, "Am5FhbBVPw/XkhPwVEBaU/tVCy0=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePathname"],
        __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$toast$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useToast"]
    ];
});
_c = MainLayout;
var _c;
__turbopack_context__.k.register(_c, "MainLayout");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/layout/Sidebar.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Sidebar
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$image$2d$component$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__Image__as__default$3e$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/image-component.js [app-client] (ecmascript) <export Image as default>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/utils.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/auth.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$permissions$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/lib/permissions.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$shared$2f$BrandLogo$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/shared/BrandLogo.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$hooks$2f$useUpcomingTasks$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/hooks/useUpcomingTasks.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$hooks$2f$useNotificationEnabled$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/hooks/useNotificationEnabled.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
;
;
;
;
;
const SEEN_TASKS_STORAGE_KEY = 'crm_seen_upcoming_task_ids';
const TASK_KIND_LABEL = {
    lesson: 'Lesson',
    service: 'Appointment',
    membership: 'Membership',
    todo: 'To-do',
    'lead-callback': 'Lead Follow-up',
    'customer-callback': 'Callback',
    'human-intervention': 'Needs Human'
};
const navItems = [
    {
        name: 'Dashboard',
        href: '/dashboard',
        iconSrc: '/figma/sidebar/dashboard-selected.svg',
        iconSize: 24,
        labelStyle: 'bold'
    },
    {
        name: 'Inbox',
        href: '/inbox',
        iconSrc: '/figma/sidebar/inbox.svg',
        iconSize: 20,
        labelStyle: 'regular',
        children: [
            {
                name: 'All Messages',
                href: '/inbox/all-messages'
            },
            {
                name: 'Call Center',
                href: '/inbox/human-queue'
            }
        ]
    },
    {
        name: 'Leads',
        href: '/leads',
        iconSrc: '/figma/sidebar/leads.svg',
        iconSize: 20,
        labelStyle: 'regular'
    },
    {
        name: 'Customers',
        href: '/settings/users-roles/customers',
        iconSrc: '/figma/sidebar/customers.svg',
        iconSize: 20,
        labelStyle: 'regular'
    },
    {
        name: 'Calendar',
        href: '/calendar',
        iconSrc: '/figma/sidebar/calendar.svg',
        iconSize: 20,
        labelStyle: 'regular',
        children: [
            {
                name: 'Calendar',
                href: '/calendar'
            },
            {
                name: 'Group Classes',
                href: '/calendar/group-classes'
            }
        ]
    },
    {
        name: 'Marketing',
        href: '/marketing/form-builder',
        iconSrc: '/figma/sidebar/marketing.svg',
        iconSize: 20,
        labelStyle: 'regular14',
        children: [
            {
                name: 'Form Builder',
                href: '/marketing/form-builder'
            },
            {
                name: 'Campaigns',
                href: '/marketing/campaigns'
            },
            {
                name: 'Email Builder',
                href: '/marketing/email-builder'
            },
            {
                name: 'Text Email',
                href: '/marketing/text-email'
            },
            {
                name: 'Unsubscribed',
                href: '/marketing/unsubscribed'
            },
            {
                name: 'SMS Builder',
                href: '/marketing/sms-builder'
            }
        ]
    },
    {
        name: 'Reports',
        href: '/reports',
        iconSrc: '/figma/sidebar/reports.svg',
        iconSize: 20,
        labelStyle: 'regular',
        children: [
            {
                name: 'All Reports',
                href: '/reports'
            },
            {
                name: "Teacher's Commissions",
                href: '/reports/teacher-commissions'
            },
            {
                name: 'Callback Report',
                href: '/reports/callbacks'
            }
        ]
    },
    {
        name: 'AI & Automation',
        href: '/ai-automation/workflows',
        iconSrc: '/figma/sidebar/ai-automation.svg',
        iconSize: 20,
        labelStyle: 'regular',
        children: [
            {
                name: 'Make Calls',
                href: '/ai-automation/make-calls'
            },
            {
                name: 'AI Calling',
                href: '/ai-automation/ai-calling'
            },
            {
                name: 'AI Messaging',
                href: '/ai-automation/ai-messaging'
            },
            {
                name: 'Follow-up Settings',
                href: '/ai-automation/followup-settings'
            },
            {
                name: 'Workflows',
                href: '/ai-automation/workflows'
            },
            {
                name: 'Dynamic Lists',
                href: '/ai-automation/dynamic-lists'
            },
            {
                name: 'Stages & Lifecycle',
                href: '/ai-automation/lead-statuses'
            },
            {
                name: 'AI Calls Data',
                href: '/ai-automation/ai-calling-data'
            },
            {
                name: 'Training',
                href: '/ai-automation/training'
            },
            {
                name: 'RAG Knowledge',
                href: '/ai-automation/rag'
            },
            {
                name: 'AI Reply Reviews',
                href: '/ai-automation/ai-reply-reviews'
            }
        ]
    },
    {
        name: 'Settings',
        href: '/settings/studio',
        iconSrc: '/figma/sidebar/settings.svg',
        iconSize: 20,
        labelStyle: 'regular',
        children: [
            {
                name: 'Studio',
                href: '/settings/studio'
            },
            {
                name: 'Notifications',
                href: '/settings/notifications'
            },
            {
                name: 'Users & Roles',
                href: '/settings/users-roles'
            },
            {
                name: 'Curriculum',
                href: '/settings/curriculum'
            },
            {
                name: 'Goals',
                href: '/settings/goals'
            },
            {
                name: 'Document Library',
                href: '/settings/documents'
            },
            {
                name: 'Setup',
                href: '/settings/setup'
            },
            {
                name: 'Integrations',
                href: '/settings/integrations'
            },
            {
                name: 'Billing',
                href: '/settings/billing'
            },
            {
                name: 'Activity Log',
                href: '/settings/activity-log'
            }
        ]
    }
];
function Sidebar({ mobileOpen, setMobileOpen }) {
    _s();
    const pathname = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePathname"])();
    const user = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getCurrentUser"])();
    const [openMenu, setOpenMenu] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null) // string | null
    ;
    const [menuAnchorRect, setMenuAnchorRect] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null) // DOMRectLike | null
    ;
    const [menuPos, setMenuPos] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null) // { top:number, left:number } | null
    ;
    const dropdownRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const sidebarRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const navScaleRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const subscriptionRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const closeTimerRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const menuHoverRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(false);
    const [navBox, setNavBox] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        scale: 1,
        height: null
    });
    const { tasks: upcomingTasks, loading: upcomingTasksLoading } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$hooks$2f$useUpcomingTasks$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useUpcomingTasks"])({
        days: 7,
        limit: 20
    });
    const showTaskBadge = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$hooks$2f$useNotificationEnabled$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useNotificationEnabled"])('tasks.badge');
    // Red dot clears once the popover has been opened for the current task set;
    // reappears if the list changes (e.g. a new task shows up) after that.
    // Persisted to localStorage (client-only, no backend/AWS cost) so it
    // survives a page reload instead of re-flagging already-seen tasks.
    const seenTasksStorageKey = user?._id ? `${SEEN_TASKS_STORAGE_KEY}:${user._id}` : null;
    const [seenTaskIds, setSeenTaskIds] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        "Sidebar.useState": ()=>{
            if (("TURBOPACK compile-time value", "object") === 'undefined' || !seenTasksStorageKey) return new Set();
            try {
                return new Set(JSON.parse(localStorage.getItem(seenTasksStorageKey) || '[]'));
            } catch  {
                return new Set();
            }
        }
    }["Sidebar.useState"]);
    const unseenTaskCount = upcomingTasks.filter((t)=>!seenTaskIds.has(t.id)).length;
    const markTasksSeen = ()=>{
        const next = new Set(upcomingTasks.map((t)=>t.id));
        setSeenTaskIds(next);
        if (!seenTasksStorageKey) return;
        try {
            localStorage.setItem(seenTasksStorageKey, JSON.stringify([
                ...next
            ]));
        } catch  {
        // storage unavailable (private mode, quota) — in-memory state still works
        }
    };
    const menuItemsByName = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "Sidebar.useMemo[menuItemsByName]": ()=>{
            const map = new Map();
            for (const item of navItems)map.set(item.name, item);
            return map;
        }
    }["Sidebar.useMemo[menuItemsByName]"], []);
    const taskDateFormatter = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "Sidebar.useMemo[taskDateFormatter]": ()=>new Intl.DateTimeFormat('en-US', {
                month: 'short',
                day: 'numeric'
            })
    }["Sidebar.useMemo[taskDateFormatter]"], []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Sidebar.useEffect": ()=>{
            setMobileOpen(false);
            setOpenMenu(null);
            setMenuAnchorRect(null);
            setMenuPos(null);
        }
    }["Sidebar.useEffect"], [
        pathname,
        setMobileOpen
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Sidebar.useEffect": ()=>{
            if (mobileOpen) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = 'unset';
            }
            return ({
                "Sidebar.useEffect": ()=>{
                    document.body.style.overflow = 'unset';
                }
            })["Sidebar.useEffect"];
        }
    }["Sidebar.useEffect"], [
        mobileOpen
    ]);
    // Scale the logo + nav block down (rather than scrolling) so it always
    // fits between the header and the pinned "Upcoming Tasks" card, no matter
    // how short or tall the viewport is.
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Sidebar.useEffect": ()=>{
            const recompute = {
                "Sidebar.useEffect.recompute": ()=>{
                    const aside = sidebarRef.current;
                    const wrap = navScaleRef.current;
                    const sub = subscriptionRef.current;
                    if (!aside || !wrap) return;
                    // Reset to natural (unscaled) size first — measuring while our own
                    // shrink is still applied would lock in a stale, too-large scale.
                    const prevTransform = wrap.style.transform;
                    const prevHeight = wrap.style.height;
                    wrap.style.transform = 'none';
                    wrap.style.height = 'auto';
                    const asideStyles = window.getComputedStyle(aside);
                    const paddingY = (parseFloat(asideStyles.paddingTop) || 0) + (parseFloat(asideStyles.paddingBottom) || 0);
                    const subHeight = sub ? sub.offsetHeight : 0;
                    const available = aside.clientHeight - paddingY - subHeight;
                    const natural = wrap.scrollHeight;
                    wrap.style.transform = prevTransform;
                    wrap.style.height = prevHeight;
                    const scale = natural > 0 ? Math.min(1, available / natural) : 1;
                    setNavBox({
                        scale,
                        height: natural * scale
                    });
                }
            }["Sidebar.useEffect.recompute"];
            recompute();
            window.addEventListener('resize', recompute);
            const ro = new ResizeObserver(recompute);
            if (sidebarRef.current) ro.observe(sidebarRef.current);
            return ({
                "Sidebar.useEffect": ()=>{
                    window.removeEventListener('resize', recompute);
                    ro.disconnect();
                }
            })["Sidebar.useEffect"];
        }
    }["Sidebar.useEffect"], []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Sidebar.useEffect": ()=>{
            const handleClickOutside = {
                "Sidebar.useEffect.handleClickOutside": (event)=>{
                    const target = event.target;
                    if (sidebarRef.current && sidebarRef.current.contains(target)) return;
                    if (dropdownRef.current && dropdownRef.current.contains(target)) return;
                    setOpenMenu(null);
                    setMenuAnchorRect(null);
                    setMenuPos(null);
                }
            }["Sidebar.useEffect.handleClickOutside"];
            document.addEventListener('mousedown', handleClickOutside);
            return ({
                "Sidebar.useEffect": ()=>document.removeEventListener('mousedown', handleClickOutside)
            })["Sidebar.useEffect"];
        }
    }["Sidebar.useEffect"], []);
    // Reposition dropdown to avoid viewport clipping (flip up/left as needed)
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Sidebar.useEffect": ()=>{
            if (!openMenu || !menuAnchorRect) return;
            const raf = window.requestAnimationFrame({
                "Sidebar.useEffect.raf": ()=>{
                    const el = dropdownRef.current;
                    if (!el) return;
                    const vh = window.innerHeight || 0;
                    const vw = window.innerWidth || 0;
                    const margin = 8;
                    const gap = 10;
                    const menuRect = el.getBoundingClientRect();
                    const desiredLeft = menuAnchorRect.right + gap;
                    const desiredTop = menuAnchorRect.top;
                    let left = desiredLeft;
                    let top = desiredTop;
                    // Flip left if not enough right space
                    if (left + menuRect.width > vw - margin) {
                        left = Math.max(margin, menuAnchorRect.left - menuRect.width - gap);
                    }
                    // Clamp / flip up if not enough bottom space
                    if (top + menuRect.height > vh - margin) {
                        top = Math.max(margin, vh - menuRect.height - margin);
                    }
                    if (top < margin) top = margin;
                    setMenuPos({
                        top,
                        left
                    });
                }
            }["Sidebar.useEffect.raf"]);
            return ({
                "Sidebar.useEffect": ()=>window.cancelAnimationFrame(raf)
            })["Sidebar.useEffect"];
        }
    }["Sidebar.useEffect"], [
        openMenu,
        menuAnchorRect
    ]);
    const openDropdownFor = (name, targetEl)=>{
        if (!name || !targetEl) return;
        if (closeTimerRef.current) window.clearTimeout(closeTimerRef.current);
        const rect = targetEl.getBoundingClientRect();
        setOpenMenu(name);
        setMenuAnchorRect(rect);
        setMenuPos(null); // will be computed after dropdown renders
    };
    const scheduleClose = ()=>{
        if (closeTimerRef.current) window.clearTimeout(closeTimerRef.current);
        closeTimerRef.current = window.setTimeout(()=>{
            if (!menuHoverRef.current) {
                setOpenMenu(null);
                setMenuAnchorRect(null);
                setMenuPos(null);
            }
        }, 120);
    };
    if (!user) return null;
    const studioName = user.branchName || 'Dance Studio';
    const sidebarTileClass = 'flex flex-col justify-center items-center gap-1 rounded-lg text-[color:var(--sidebar-ink)] w-[104px] min-h-[64px] px-2 py-2 transition-colors';
    const sidebarLabelClass = 'text-center whitespace-nowrap leading-tight w-full overflow-visible';
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            mobileOpen && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "fixed inset-0 bg-black/50 z-[100] lg:hidden",
                onClick: ()=>setMobileOpen(false),
                "aria-hidden": "true"
            }, void 0, false, {
                fileName: "[project]/components/layout/Sidebar.js",
                lineNumber: 315,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("aside", {
                ref: sidebarRef,
                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('flex flex-col h-screen transition-all duration-300 justify-between items-center', 'lg:relative fixed inset-y-0 left-0 z-[110]', 'w-[136px] min-w-[136px]', mobileOpen ? 'flex translate-x-0' : 'hidden lg:flex -translate-x-full lg:translate-x-0', 'bg-sidebar-gradient rounded-r-[40px]'),
                style: {
                    padding: '24px 12px'
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        ref: navScaleRef,
                        className: "flex flex-col items-center gap-5 w-[112px]",
                        style: {
                            transform: `scale(${navBox.scale})`,
                            transformOrigin: 'top center',
                            height: navBox.height ?? undefined
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$shared$2f$BrandLogo$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BrandLockup"], {
                                size: 46,
                                title: studioName
                            }, void 0, false, {
                                fileName: "[project]/components/layout/Sidebar.js",
                                lineNumber: 344,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
                                className: "flex flex-col items-center gap-1 rounded-r-[24px]",
                                children: navItems.map((item)=>{
                                    // A parent is visible if its own href passes OR any of its
                                    // children do. Gating on the parent href alone hid whole sections
                                    // from users who could use them — e.g. a call-center role has
                                    // inbox.CallCenter but not inbox.AllMessages, and the Inbox
                                    // parent points at /inbox, so the one child they could open was
                                    // unreachable (the parent button preventDefaults and never
                                    // navigates, so there was no way in).
                                    const accessibleChildren = Array.isArray(item.children) ? item.children.filter((child)=>child.href ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$permissions$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["canAccessRoute"])(child.href) : true) : [];
                                    const hasOwnAccess = item.href ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$permissions$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["canAccessRoute"])(item.href) : true;
                                    if (!hasOwnAccess && accessibleChildren.length === 0) return null;
                                    const hasChildren = accessibleChildren.length > 0;
                                    const isActive = item.href === '/' ? pathname === '/' : item.name === 'Settings' ? pathname.startsWith('/settings') : item.href && (pathname === item.href || pathname.startsWith(`${item.href}/`));
                                    const labelClass = item.labelStyle === 'bold' ? 'text-[12px] leading-[18px] font-bold' : item.labelStyle === 'regular14' ? 'text-[14px] leading-[20px] font-normal' : 'text-[12px] leading-[18px] font-normal';
                                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "relative",
                                        onMouseEnter: ()=>{
                                        // handled on the button/link so we can capture the bounding rect
                                        },
                                        onMouseLeave: ()=>{
                                            if (hasChildren && !mobileOpen) scheduleClose();
                                        },
                                        children: hasChildren ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            type: "button",
                                            onClick: (e)=>{
                                                // Parent with submenu should not navigate; open/toggle popup list.
                                                e.preventDefault();
                                                const anchorEl = e.currentTarget;
                                                if (mobileOpen) {
                                                    setOpenMenu((prev)=>{
                                                        const next = prev === item.name ? null : item.name;
                                                        if (next) {
                                                            setMenuAnchorRect(anchorEl.getBoundingClientRect());
                                                            setMenuPos(null);
                                                        } else {
                                                            setMenuAnchorRect(null);
                                                            setMenuPos(null);
                                                        }
                                                        return next;
                                                    });
                                                }
                                            },
                                            onMouseEnter: (e)=>{
                                                if (hasChildren && !mobileOpen) openDropdownFor(item.name, e.currentTarget);
                                            },
                                            className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])(sidebarTileClass, 'hover:bg-white/5', isActive && 'bg-[image:var(--sidebar-active-css)] text-white shadow-[var(--sidebar-active-shadow)]'),
                                            "aria-expanded": openMenu === item.name,
                                            "aria-haspopup": "menu",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                                    src: item.iconSrc,
                                                    alt: "",
                                                    width: item.iconSize,
                                                    height: item.iconSize,
                                                    style: {
                                                        width: item.iconSize,
                                                        height: item.iconSize
                                                    },
                                                    "aria-hidden": true
                                                }, void 0, false, {
                                                    fileName: "[project]/components/layout/Sidebar.js",
                                                    lineNumber: 421,
                                                    columnNumber: 23
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])(sidebarLabelClass, labelClass),
                                                    children: item.name
                                                }, void 0, false, {
                                                    fileName: "[project]/components/layout/Sidebar.js",
                                                    lineNumber: 429,
                                                    columnNumber: 23
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/layout/Sidebar.js",
                                            lineNumber: 389,
                                            columnNumber: 21
                                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                            href: item.href,
                                            onClick: ()=>setMobileOpen(false),
                                            onMouseEnter: ()=>{
                                                // close any open dropdown when hovering non-dropdown items
                                                if (!mobileOpen) {
                                                    setOpenMenu(null);
                                                    setMenuAnchorRect(null);
                                                    setMenuPos(null);
                                                }
                                            },
                                            className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])(sidebarTileClass, 'hover:bg-white/5', isActive && 'bg-[image:var(--sidebar-active-css)] text-white shadow-[var(--sidebar-active-shadow)]'),
                                            "aria-current": isActive ? 'page' : undefined,
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                                    src: item.iconSrc,
                                                    alt: "",
                                                    width: item.iconSize,
                                                    height: item.iconSize,
                                                    style: {
                                                        width: item.iconSize,
                                                        height: item.iconSize
                                                    },
                                                    "aria-hidden": true
                                                }, void 0, false, {
                                                    fileName: "[project]/components/layout/Sidebar.js",
                                                    lineNumber: 451,
                                                    columnNumber: 23
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])(sidebarLabelClass, labelClass),
                                                    children: item.name
                                                }, void 0, false, {
                                                    fileName: "[project]/components/layout/Sidebar.js",
                                                    lineNumber: 459,
                                                    columnNumber: 23
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/layout/Sidebar.js",
                                            lineNumber: 432,
                                            columnNumber: 21
                                        }, this)
                                    }, item.name, false, {
                                        fileName: "[project]/components/layout/Sidebar.js",
                                        lineNumber: 378,
                                        columnNumber: 17
                                    }, this);
                                })
                            }, void 0, false, {
                                fileName: "[project]/components/layout/Sidebar.js",
                                lineNumber: 346,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/layout/Sidebar.js",
                        lineNumber: 335,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        href: "/dashboard/upcoming-tasks",
                        ref: subscriptionRef,
                        className: "relative group flex shrink-0 flex-col items-center gap-1 p-1 rounded-lg border border-white/15 bg-white/5 w-[112px]",
                        onMouseEnter: markTasksSeen,
                        onFocus: markTasksSeen,
                        onClick: ()=>setMobileOpen(false),
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "relative w-[62px] h-[46.5px] overflow-hidden rounded",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$image$2d$component$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__Image__as__default$3e$__["default"], {
                                        src: "/figma/sidebar/upcoming-memoji.png",
                                        alt: "",
                                        width: 62,
                                        height: 47,
                                        className: "w-full h-full object-cover",
                                        unoptimized: true
                                    }, void 0, false, {
                                        fileName: "[project]/components/layout/Sidebar.js",
                                        lineNumber: 478,
                                        columnNumber: 13
                                    }, this),
                                    showTaskBadge && !upcomingTasksLoading && unseenTaskCount > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "absolute top-0.5 right-0.5 h-2 w-2 rounded-full bg-red-500 ring-2 ring-black/40",
                                        "aria-label": `${unseenTaskCount} new upcoming task${unseenTaskCount === 1 ? '' : 's'}`
                                    }, void 0, false, {
                                        fileName: "[project]/components/layout/Sidebar.js",
                                        lineNumber: 487,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/layout/Sidebar.js",
                                lineNumber: 477,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-white font-bold text-[10px] leading-[16px] drop-shadow-sm",
                                children: "Upcoming Tasks"
                            }, void 0, false, {
                                fileName: "[project]/components/layout/Sidebar.js",
                                lineNumber: 493,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "pointer-events-none absolute left-[118px] bottom-0 flex max-h-[70vh] w-[300px] flex-col rounded-xl border border-border bg-popover text-popover-foreground p-3 opacity-0 shadow-lg transition-all duration-150 group-hover:pointer-events-auto group-hover:opacity-100 group-focus-within:pointer-events-auto group-focus-within:opacity-100 z-50",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "mb-2 shrink-0 flex items-center justify-between gap-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                children: "Upcoming Tasks"
                                            }, void 0, false, {
                                                fileName: "[project]/components/layout/Sidebar.js",
                                                lineNumber: 497,
                                                columnNumber: 15
                                            }, this),
                                            !upcomingTasksLoading && upcomingTasks.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "normal-case tracking-normal text-muted-foreground/80",
                                                children: upcomingTasks.length
                                            }, void 0, false, {
                                                fileName: "[project]/components/layout/Sidebar.js",
                                                lineNumber: 499,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/layout/Sidebar.js",
                                        lineNumber: 496,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "space-y-2 overflow-y-auto pr-1",
                                        children: [
                                            upcomingTasksLoading && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "text-[11px] text-muted-foreground",
                                                children: "Loading…"
                                            }, void 0, false, {
                                                fileName: "[project]/components/layout/Sidebar.js",
                                                lineNumber: 504,
                                                columnNumber: 17
                                            }, this),
                                            !upcomingTasksLoading && upcomingTasks.length === 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "text-[11px] text-muted-foreground",
                                                children: "Nothing scheduled this week."
                                            }, void 0, false, {
                                                fileName: "[project]/components/layout/Sidebar.js",
                                                lineNumber: 507,
                                                columnNumber: 17
                                            }, this),
                                            upcomingTasks.map((task)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "rounded-lg border border-border px-2.5 py-2",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "flex items-center justify-between gap-2",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "text-xs font-medium text-foreground leading-4 truncate",
                                                                    children: task.title
                                                                }, void 0, false, {
                                                                    fileName: "[project]/components/layout/Sidebar.js",
                                                                    lineNumber: 512,
                                                                    columnNumber: 21
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "shrink-0 text-[9px] uppercase tracking-wide text-muted-foreground",
                                                                    children: TASK_KIND_LABEL[task.kind] || task.kind
                                                                }, void 0, false, {
                                                                    fileName: "[project]/components/layout/Sidebar.js",
                                                                    lineNumber: 513,
                                                                    columnNumber: 21
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/components/layout/Sidebar.js",
                                                            lineNumber: 511,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('mt-1 text-[11px]', task.isOverdue ? 'text-destructive' : 'text-muted-foreground'),
                                                            children: [
                                                                "Due ",
                                                                taskDateFormatter.format(new Date(task.dueDate)),
                                                                task.assignee ? ` - ${task.assignee}` : ''
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/components/layout/Sidebar.js",
                                                            lineNumber: 517,
                                                            columnNumber: 19
                                                        }, this)
                                                    ]
                                                }, task.id, true, {
                                                    fileName: "[project]/components/layout/Sidebar.js",
                                                    lineNumber: 510,
                                                    columnNumber: 17
                                                }, this))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/layout/Sidebar.js",
                                        lineNumber: 502,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/layout/Sidebar.js",
                                lineNumber: 495,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/layout/Sidebar.js",
                        lineNumber: 469,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/layout/Sidebar.js",
                lineNumber: 323,
                columnNumber: 7
            }, this),
            openMenu && (()=>{
                const item = menuItemsByName.get(openMenu);
                if (!item || !item.children || item.children.length === 0) return null;
                const top = menuPos?.top ?? menuAnchorRect?.top ?? 0;
                const left = menuPos?.left ?? (menuAnchorRect?.right ?? 0) + 10;
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    ref: dropdownRef,
                    className: "fixed w-[210px] bg-popover text-popover-foreground rounded-xl shadow-lg py-3 z-[9999] border border-border",
                    style: {
                        top,
                        left
                    },
                    role: "menu",
                    onMouseEnter: ()=>{
                        menuHoverRef.current = true;
                        if (closeTimerRef.current) window.clearTimeout(closeTimerRef.current);
                    },
                    onMouseLeave: ()=>{
                        menuHoverRef.current = false;
                        scheduleClose();
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "px-5 mb-2 text-xs font-semibold tracking-wider text-muted-foreground uppercase",
                            children: item.name
                        }, void 0, false, {
                            fileName: "[project]/components/layout/Sidebar.js",
                            lineNumber: 551,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "h-px bg-border mb-2 mx-2"
                        }, void 0, false, {
                            fileName: "[project]/components/layout/Sidebar.js",
                            lineNumber: 554,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex flex-col",
                            children: item.children.filter((child)=>child.href ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$permissions$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["canAccessRoute"])(child.href) : true).map((child, _, children)=>{
                                // Only the most specific match is active, so /reports doesn't
                                // light up alongside /reports/teacher-commissions.
                                const matches = (href)=>pathname === href || pathname.startsWith(`${href}/`);
                                const isChildActive = matches(child.href) && !children.some((other)=>other.href?.length > child.href.length && matches(other.href));
                                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                    href: child.href,
                                    onClick: ()=>{
                                        setOpenMenu(null);
                                        setMenuAnchorRect(null);
                                        setMenuPos(null);
                                        setMobileOpen(false);
                                    },
                                    className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('px-5 py-2.5 text-sm transition-colors block w-full text-left', isChildActive ? 'bg-primary/10 text-primary font-medium' : 'text-foreground hover:bg-muted hover:text-foreground'),
                                    role: "menuitem",
                                    children: child.name
                                }, child.href, false, {
                                    fileName: "[project]/components/layout/Sidebar.js",
                                    lineNumber: 566,
                                    columnNumber: 21
                                }, this);
                            })
                        }, void 0, false, {
                            fileName: "[project]/components/layout/Sidebar.js",
                            lineNumber: 555,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/layout/Sidebar.js",
                    lineNumber: 537,
                    columnNumber: 11
                }, this);
            })()
        ]
    }, void 0, true, {
        fileName: "[project]/components/layout/Sidebar.js",
        lineNumber: 313,
        columnNumber: 5
    }, this);
}
_s(Sidebar, "2xoYov0IFjvlKVjjpHioK37R8Ts=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePathname"],
        __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$hooks$2f$useUpcomingTasks$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useUpcomingTasks"],
        __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$hooks$2f$useNotificationEnabled$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useNotificationEnabled"]
    ];
});
_c = Sidebar;
var _c;
__turbopack_context__.k.register(_c, "Sidebar");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=components_layout_1zdy3ok3nk6l7._.js.map