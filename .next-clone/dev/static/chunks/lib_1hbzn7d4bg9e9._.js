(globalThis["TURBOPACK"] || (globalThis["TURBOPACK"] = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/lib/clover.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// Clover Hosted Checkout opens on Clover's own site in a new tab. To avoid the
// browser blocking that tab as a non-user-initiated popup, callers open a blank
// tab synchronously inside the click handler (openCheckoutTab), then navigate it
// to the real checkout URL once the backend responds (navigateCheckoutTab), or
// close it if the request failed (closeCheckoutTab).
__turbopack_context__.s([
    "CHECKOUT_TOAST",
    ()=>CHECKOUT_TOAST,
    "closeCheckoutTab",
    ()=>closeCheckoutTab,
    "navigateCheckoutTab",
    ()=>navigateCheckoutTab,
    "openCheckoutTab",
    ()=>openCheckoutTab
]);
const CHECKOUT_TOAST = 'Payment link opened in a new tab — this will be marked paid once the customer completes payment.';
function openCheckoutTab() {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    return window.open('about:blank', '_blank');
}
function navigateCheckoutTab(tab, url) {
    if (!url) return;
    if (tab && !tab.closed) {
        tab.opener = null;
        tab.location.replace(url);
    } else if ("TURBOPACK compile-time truthy", 1) {
        // Pre-opened tab was blocked or closed — fall back to a direct open.
        window.open(url, '_blank', 'noopener');
    }
}
function closeCheckoutTab(tab) {
    if (tab && !tab.closed) tab.close();
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/lib/hooks/useNotificationEnabled.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useNotificationEnabled",
    ()=>useNotificationEnabled
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$notificationPreferences$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/notificationPreferences.js [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
'use client';
;
;
function useNotificationEnabled(key) {
    _s();
    const [enabled, setEnabled] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useNotificationEnabled.useEffect": ()=>{
            const sync = {
                "useNotificationEnabled.useEffect.sync": ()=>setEnabled((0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$notificationPreferences$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isNotificationEnabled"])(key))
            }["useNotificationEnabled.useEffect.sync"];
            sync();
            window.addEventListener('session-refresh', sync);
            return ({
                "useNotificationEnabled.useEffect": ()=>window.removeEventListener('session-refresh', sync)
            })["useNotificationEnabled.useEffect"];
        }
    }["useNotificationEnabled.useEffect"], [
        key
    ]);
    return enabled;
}
_s(useNotificationEnabled, "I/C4veZZkwwcZGJ+NBwpeehDzKM=");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/lib/hooks/useUpcomingTasks.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useUpcomingTasks",
    ()=>useUpcomingTasks
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/api.js [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
'use client';
;
;
// The calendar API doesn't tag every appointment with a `type` enum — regular
// bookings (lessons/services/memberships) usually have no `type` at all, and
// their kind is only inferable from which reference field is populated.
// `type === 'event'` (or a populated todoID) marks a to-do; `type === 'time'`
// marks blocked-off time, which isn't a task and gets excluded.
function deriveKind(evt) {
    if (evt.todoID || evt.type === 'event') return 'todo';
    if (evt.membershipID) return 'membership';
    if (evt.calendarServiceID) return 'service';
    if (evt.lessonID) return 'lesson';
    return evt.type || 'appointment';
}
// Leads/customers aren't assigned to a specific user in this app (only
// branch-scoped, via the x-location-id header api.js already attaches), so
// callback items aren't filtered by teacher — every user sees the branch's
// upcoming callbacks, same as the /reports/callbacks page.
async function fetchCallbacks(path, endISO, kind, limit) {
    const conditions = [
        {
            field: 'callbackDate',
            operator: 'exists',
            value: true
        },
        {
            field: 'callbackDate',
            operator: 'lte',
            value: endISO
        }
    ];
    const params = new URLSearchParams({
        page: '1',
        limit: String(limit),
        sortBy: 'callbackDate',
        sortOrder: 'asc',
        conditionLogic: 'AND',
        conditions: JSON.stringify(conditions)
    });
    const result = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].get(`${path}?${params}`);
    if (!result.success || !Array.isArray(result.data)) return [];
    return result.data.map((row)=>({
            id: `${kind}-${row._id || row.id}`,
            title: kind === 'lead-callback' ? `Follow up: ${row.name || 'Lead'}` : `Callback: ${row.name || 'Customer'}`,
            kind,
            dueDate: row.callbackDate,
            isOverdue: row.callbackDate ? new Date(row.callbackDate) < new Date() : false,
            assignee: '',
            relatedName: row.phoneNumber || ''
        }));
}
// Calls waiting in the human-intervention queue (AI couldn't handle them,
// a human needs to pick up) — same "waiting" tab as /inbox/human-queue.
// These aren't scheduled for a future time, they need attention now, so
// they're always treated as overdue and sort to the top.
async function fetchHumanQueueWaiting(limit) {
    const result = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].get('/api/human-queue?tab=waiting');
    if (!result.success || !Array.isArray(result.data)) return [];
    return result.data.slice(0, limit).map((item)=>({
            id: `human-queue-${item.id || item._id}`,
            title: `Needs a human: ${item.leadName || item.callerName || 'Unknown caller'}`,
            kind: 'human-intervention',
            dueDate: item.createdAt || new Date().toISOString(),
            isOverdue: true,
            assignee: '',
            relatedName: item.phone || item.callerPhone || item.reason || ''
        }));
}
function useUpcomingTasks({ days = 7, limit = 6, pollMs = 90000 } = {}) {
    _s();
    const [tasks, setTasks] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const fetch = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useUpcomingTasks.useCallback[fetch]": async ({ silent = false } = {})=>{
            if (!silent) setLoading(true);
            setError(null);
            try {
                const start = new Date();
                const end = new Date();
                end.setDate(end.getDate() + days);
                const params = new URLSearchParams({
                    start: start.toISOString(),
                    end: end.toISOString(),
                    limit: 500
                });
                const [calendarResult, leadCallbacks, customerCallbacks, humanQueueItems] = await Promise.all([
                    __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].get(`/api/calendar?${params}`),
                    fetchCallbacks('/api/lead', end.toISOString(), 'lead-callback', limit),
                    fetchCallbacks('/api/customer', end.toISOString(), 'customer-callback', limit),
                    fetchHumanQueueWaiting(limit).catch({
                        "useUpcomingTasks.useCallback[fetch]": ()=>[]
                    }["useUpcomingTasks.useCallback[fetch]"])
                ]);
                const calendarItems = !calendarResult.success || !Array.isArray(calendarResult.data) ? [] : calendarResult.data.filter({
                    "useUpcomingTasks.useCallback[fetch]": (evt)=>evt.type !== 'time'
                }["useUpcomingTasks.useCallback[fetch]"]) // exclude blocked-off time, not a task
                .filter({
                    "useUpcomingTasks.useCallback[fetch]": (evt)=>evt.status !== 'cancelled'
                }["useUpcomingTasks.useCallback[fetch]"])// Only to-dos belong here — lessons/services/memberships/other
                // calendar bookings are shown on the calendar itself, not this list.
                .filter({
                    "useUpcomingTasks.useCallback[fetch]": (evt)=>deriveKind(evt) === 'todo'
                }["useUpcomingTasks.useCallback[fetch]"]).map({
                    "useUpcomingTasks.useCallback[fetch]": (evt)=>{
                        const dueDate = evt.startDateTime;
                        const customer = Array.isArray(evt.customerIDs) ? evt.customerIDs[0] : null;
                        const kind = deriveKind(evt);
                        return {
                            id: String(evt._id || evt.id),
                            title: evt.title || customer?.name || evt.calendarServiceID?.name || evt.lessonID?.name || (kind === 'todo' ? 'To-do' : 'Appointment'),
                            kind,
                            dueDate,
                            isOverdue: dueDate ? new Date(dueDate) < new Date() : false,
                            assignee: evt.teacherID?.name || '',
                            relatedName: customer?.name || ''
                        };
                    }
                }["useUpcomingTasks.useCallback[fetch]"]);
                const items = [
                    ...humanQueueItems,
                    ...calendarItems,
                    ...leadCallbacks,
                    ...customerCallbacks
                ].sort({
                    "useUpcomingTasks.useCallback[fetch].items": (a, b)=>new Date(a.dueDate) - new Date(b.dueDate)
                }["useUpcomingTasks.useCallback[fetch].items"]).slice(0, limit);
                setTasks(items);
            } catch (err) {
                setError(err);
                setTasks([]);
            } finally{
                setLoading(false);
            }
        }
    }["useUpcomingTasks.useCallback[fetch]"], [
        days,
        limit
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useUpcomingTasks.useEffect": ()=>{
            fetch();
            if (!pollMs) return undefined;
            // Poll in the background so lessons/callbacks/human-queue items that
            // change on the server (or on another tab/device) show up without a
            // manual refresh. Paused while the tab is hidden, and forced on regain
            // of focus/visibility so switching back gets you current data right away.
            const interval = setInterval({
                "useUpcomingTasks.useEffect.interval": ()=>{
                    if (document.visibilityState === 'visible') fetch({
                        silent: true
                    });
                }
            }["useUpcomingTasks.useEffect.interval"], pollMs);
            const onFocusOrVisible = {
                "useUpcomingTasks.useEffect.onFocusOrVisible": ()=>fetch({
                        silent: true
                    })
            }["useUpcomingTasks.useEffect.onFocusOrVisible"];
            window.addEventListener('focus', onFocusOrVisible);
            document.addEventListener('visibilitychange', onFocusOrVisible);
            return ({
                "useUpcomingTasks.useEffect": ()=>{
                    clearInterval(interval);
                    window.removeEventListener('focus', onFocusOrVisible);
                    document.removeEventListener('visibilitychange', onFocusOrVisible);
                }
            })["useUpcomingTasks.useEffect"];
        }
    }["useUpcomingTasks.useEffect"], [
        fetch,
        pollMs
    ]);
    return {
        tasks,
        loading,
        error,
        refresh: fetch
    };
}
_s(useUpcomingTasks, "yNMLUea8yF8DETsVtBcew3bLH3Y=");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/lib/notificationSounds.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "playIncomingRing",
    ()=>playIncomingRing,
    "startIncomingRingLoop",
    ()=>startIncomingRingLoop,
    "stopIncomingRingLoop",
    ()=>stopIncomingRingLoop
]);
/**
 * Incoming-call tones for the human queue. Settings preview uses playIncomingRing;
 * the global alert uses startIncomingRingLoop / stopIncomingRingLoop.
 */ let sharedCtx = null;
let loopTimer = null;
let unlocked = false;
function getAudioContext() {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    const Ctx = window.AudioContext || window.webkitAudioContext;
    if (!Ctx) return null;
    if (!sharedCtx || sharedCtx.state === 'closed') {
        sharedCtx = new Ctx();
    }
    return sharedCtx;
}
/** Resume AudioContext after a user gesture so browsers allow sound. */ function ensureAudioUnlocked() {
    if (("TURBOPACK compile-time value", "object") === 'undefined' || unlocked) return;
    const ctx = getAudioContext();
    if (!ctx) return;
    const resume = ()=>{
        ctx.resume?.().catch(()=>{});
        unlocked = true;
        window.removeEventListener('pointerdown', resume);
        window.removeEventListener('keydown', resume);
    };
    if (ctx.state === 'running') {
        unlocked = true;
        return;
    }
    window.addEventListener('pointerdown', resume, {
        once: true
    });
    window.addEventListener('keydown', resume, {
        once: true
    });
}
if ("TURBOPACK compile-time truthy", 1) {
    ensureAudioUnlocked();
}
function playIncomingRing() {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    try {
        const ctx = getAudioContext();
        if (!ctx) return;
        ctx.resume?.().catch(()=>{});
        const now = ctx.currentTime;
        const playBurst = (startOffset)=>{
            const t0 = now + startOffset;
            const duration = 0.45;
            const master = ctx.createGain();
            master.connect(ctx.destination);
            master.gain.setValueAtTime(0.0001, t0);
            master.gain.exponentialRampToValueAtTime(1, t0 + 0.012);
            master.gain.setValueAtTime(1, t0 + duration - 0.05);
            master.gain.exponentialRampToValueAtTime(0.0001, t0 + duration);
            [
                440,
                480
            ].forEach((freq)=>{
                const oscillator = ctx.createOscillator();
                const tone = ctx.createGain();
                oscillator.type = 'triangle';
                oscillator.frequency.value = freq;
                tone.gain.value = 0.72;
                oscillator.connect(tone);
                tone.connect(master);
                oscillator.start(t0);
                oscillator.stop(t0 + duration + 0.02);
            });
        };
        playBurst(0);
        playBurst(0.58);
    } catch  {
    // audio not available
    }
}
function startIncomingRingLoop() {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    ensureAudioUnlocked();
    stopIncomingRingLoop();
    playIncomingRing();
    loopTimer = setInterval(()=>{
        playIncomingRing();
    }, 1300);
}
function stopIncomingRingLoop() {
    if (loopTimer) {
        clearInterval(loopTimer);
        loopTimer = null;
    }
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/lib/paymentMethods.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// The only payment methods staff can record. "card" is the stored value on every
// Payment row and on the backend enums; "Clover" is only what we call it, because a
// card payment is always collected through Clover's hosted checkout.
//
// Wallet is a method here. When the balance cannot cover the amount, the form asks for a
// second method to collect the difference rather than failing — see WalletShortfallField.
__turbopack_context__.s([
    "NO_DEVICE_PAYMENT_METHODS",
    ()=>NO_DEVICE_PAYMENT_METHODS,
    "PAYMENT_METHODS",
    ()=>PAYMENT_METHODS,
    "PAYMENT_METHODS_WITH_SAVED_CARD",
    ()=>PAYMENT_METHODS_WITH_SAVED_CARD,
    "PURCHASE_METHODS",
    ()=>PURCHASE_METHODS,
    "SAVED_CARD_METHOD",
    ()=>SAVED_CARD_METHOD,
    "SHARE_LINK_METHOD",
    ()=>SHARE_LINK_METHOD,
    "SHORTFALL_METHODS",
    ()=>SHORTFALL_METHODS,
    "TIP_METHODS",
    ()=>TIP_METHODS
]);
const PAYMENT_METHODS = [
    {
        value: "cash",
        label: "Cash"
    },
    {
        value: "cheque",
        label: "Cheque"
    },
    {
        value: "card",
        label: "Card"
    },
    // Stripe-only hosted-checkout bank debit — Clover has no ACH product. The
    // backend refuses it outright (400, "ACH requires a Stripe connection…") on
    // a Clover-only location, same guard style as the Clover-connection message
    // below for "card".
    {
        value: "ach",
        label: "ACH"
    },
    {
        value: "terminal",
        label: "Terminal"
    },
    {
        value: "wallet",
        label: "Wallet"
    }
];
const NO_DEVICE_PAYMENT_METHODS = PAYMENT_METHODS.filter(_c = (m)=>m.value !== "terminal");
_c1 = NO_DEVICE_PAYMENT_METHODS;
const PURCHASE_METHODS = NO_DEVICE_PAYMENT_METHODS.filter(_c2 = (m)=>m.value !== "wallet");
_c3 = PURCHASE_METHODS;
const TIP_METHODS = PURCHASE_METHODS;
const SHORTFALL_METHODS = PURCHASE_METHODS;
const SAVED_CARD_METHOD = {
    value: "saved_card",
    label: "Saved card"
};
const PAYMENT_METHODS_WITH_SAVED_CARD = [
    ...PAYMENT_METHODS,
    SAVED_CARD_METHOD
];
const SHARE_LINK_METHOD = {
    value: "link",
    label: "Share Link"
};
var _c, _c1, _c2, _c3;
__turbopack_context__.k.register(_c, "NO_DEVICE_PAYMENT_METHODS$PAYMENT_METHODS.filter");
__turbopack_context__.k.register(_c1, "NO_DEVICE_PAYMENT_METHODS");
__turbopack_context__.k.register(_c2, "PURCHASE_METHODS$NO_DEVICE_PAYMENT_METHODS.filter");
__turbopack_context__.k.register(_c3, "PURCHASE_METHODS");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/lib/permissions.js [app-client] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "SCOPE_ALL",
    ()=>SCOPE_ALL,
    "SCOPE_OWN",
    ()=>SCOPE_OWN,
    "canAccessRoute",
    ()=>canAccessRoute,
    "canManageCallCenter",
    ()=>canManageCallCenter,
    "canManageDefaultWorkflows",
    ()=>canManageDefaultWorkflows,
    "getDefaultRedirect",
    ()=>getDefaultRedirect,
    "getScope",
    ()=>getScope,
    "hasPermission",
    ()=>hasPermission,
    "isAdmin",
    ()=>isAdmin,
    "isOwnScope",
    ()=>isOwnScope,
    "isPublicRoute",
    ()=>isPublicRoute,
    "isStaff",
    ()=>isStaff,
    "isSuperAdmin",
    ()=>isSuperAdmin
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/auth.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/constants.js [app-client] (ecmascript)");
;
;
// CallCenter renamed from HumanQueue — honor either key until all roles are re-saved.
const MODULE_ALIASES = {
    CallCenter: [
        'HumanQueue'
    ],
    HumanQueue: [
        'CallCenter'
    ]
};
// "Edit" was merged into "Write" in the role editor, but roles saved before
// that merge can still hold { write: false, edit: true }. Treat the pair as one
// action in both directions so a legacy role isn't silently stripped of the
// buttons its admin believes it has (the roles list already displays them as one).
const ACTION_ALIASES = {
    write: [
        'edit'
    ],
    edit: [
        'write'
    ]
};
function actionKeys(type) {
    return [
        type,
        ...ACTION_ALIASES[type] || []
    ];
}
const BASE_ACTIONS = [
    'read',
    'write',
    'edit',
    'delete'
];
// `type` is either a base action (read/write/edit/delete) or a catalog-defined
// subPermission key for the module (e.g. 'assign', 'export') — checked
// independently of the base actions, mirroring the backend's userHasPermission.
function moduleGrants(mod, type) {
    if (!mod) return false;
    if (BASE_ACTIONS.includes(type)) {
        return actionKeys(type).some((action)=>mod[action]);
    }
    return Boolean(mod.subPermissions?.[type]);
}
function hasPermission(category, module, type, options = {}) {
    const { allowAliases = true } = options;
    const user = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getCurrentUser"])();
    if (!user) return false;
    if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isRole"])(user.role, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ROLES"].SUPER_ADMIN)) return true;
    // "All Permissions" master switch: master.* grants the requested action on
    // every resource, mirroring the backend's roleMiddleware. Checked first so a
    // Master-granted role sees the menus and routes it can actually access.
    // Master has no per-module subPermissions of its own, so a sub-permission
    // check falls back to master.write — matching the backend's userHasPermission.
    const master = user.permissions?.master?.permissions?.['*'];
    if (BASE_ACTIONS.includes(type) ? moduleGrants(master, type) : master?.write) return true;
    const modules = user.permissions?.[category]?.permissions;
    if (!modules) return false;
    const keys = allowAliases ? [
        module,
        ...MODULE_ALIASES[module] || []
    ] : [
        module
    ];
    return keys.some((key)=>moduleGrants(modules[key], type));
}
const SCOPE_ALL = 'all';
const SCOPE_OWN = 'own';
function getScope(category, module, options = {}) {
    const { allowAliases = true } = options;
    const user = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getCurrentUser"])();
    if (!user) return SCOPE_ALL;
    if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isRole"])(user.role, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ROLES"].SUPER_ADMIN)) return SCOPE_ALL;
    const master = user.permissions?.master?.permissions?.['*'];
    if (master && (master.read || master.write || master.edit || master.delete)) {
        return SCOPE_ALL;
    }
    const modules = user.permissions?.[category]?.permissions;
    if (!modules) return SCOPE_ALL;
    const keys = allowAliases ? [
        module,
        ...MODULE_ALIASES[module] || []
    ] : [
        module
    ];
    const present = keys.map((key)=>modules[key]).filter(Boolean);
    if (present.length === 0) return SCOPE_ALL;
    // Widest wins across aliases, matching the backend.
    return present.every((mod)=>mod.scope === SCOPE_OWN) ? SCOPE_OWN : SCOPE_ALL;
}
function isOwnScope(category, module) {
    return getScope(category, module) === SCOPE_OWN;
}
function canManageCallCenter() {
    return hasPermission('inbox', 'CallCenter', 'write', {
        allowAliases: false
    });
}
// Longest-prefix lookup so a mapping on a parent route (e.g. the customers
// list) also covers its dynamic children (/…/customers/:id), mirroring the
// ROUTE_ACCESS matching further down.
function matchRoutePrefix(map, route) {
    if (map[route]) return map[route];
    let bestKey = null;
    for (const key of Object.keys(map)){
        if (route.startsWith(`${key}/`) && (!bestKey || key.length > bestKey.length)) {
            bestKey = key;
        }
    }
    return bestKey ? map[bestKey] : null;
}
function isPublicRoute(route) {
    return __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PUBLIC_ROUTES"].some((key)=>route === key || route.startsWith(`${key}/`));
}
function canAccessRoute(route) {
    if (isPublicRoute(route)) return true;
    const user = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getCurrentUser"])();
    if (!user) return false;
    if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isRole"])(user.role, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ROLES"].SUPER_ADMIN)) return true;
    // Real backend-enforced permission check takes priority over the legacy
    // role-array system, for any route the backend actually gates.
    const permissionEntry = matchRoutePrefix(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ROUTE_PERMISSIONS"], route);
    if (permissionEntry) {
        const modules = Array.isArray(permissionEntry.module) ? permissionEntry.module : [
            permissionEntry.module
        ];
        const action = permissionEntry.action || 'read';
        return modules.some((module)=>hasPermission(permissionEntry.category, module, action));
    }
    // Exact match first; if not found, fall back to the longest matching prefix route.
    // This supports dynamic segments like `/ai-automation/workflows/:id` without needing to list every id.
    let allowedRoles = __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ROUTE_ACCESS"][route];
    if (!allowedRoles) {
        let bestMatch = null;
        for (const key of Object.keys(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ROUTE_ACCESS"])){
            if (route === key || route.startsWith(`${key}/`)) {
                if (!bestMatch || key.length > bestMatch.length) bestMatch = key;
            }
        }
        if (bestMatch) allowedRoles = __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ROUTE_ACCESS"][bestMatch];
    }
    // Fail closed. A route mapped in neither table is denied rather than opened
    // to every authenticated user — otherwise every new page under app/ ships
    // world-readable by default, and nothing catches it. Add public pages to
    // PUBLIC_ROUTES and gated ones to ROUTE_PERMISSIONS.
    if (!allowedRoles) return false;
    return allowedRoles.some((allowed)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isRole"])(user.role, allowed));
}
function isSuperAdmin() {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isRole"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getCurrentUser"])()?.role, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ROLES"].SUPER_ADMIN);
}
function canManageDefaultWorkflows() {
    return hasPermission('AiAndAutomation', 'workflows', 'defaultWorkflows');
}
function isAdmin() {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isRole"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getCurrentUser"])()?.role, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ROLES"].ADMIN);
}
function isStaff() {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isRole"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getCurrentUser"])()?.role, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ROLES"].STAFF);
}
// Landing pages in preference order. getDefaultRedirect walks these and returns
// the first the user can actually reach.
const LANDING_CANDIDATES = [
    '/dashboard',
    '/inbox',
    '/inbox/human-queue',
    '/calendar',
    '/leads',
    '/settings/studio',
    '/settings/users-roles/customers',
    '/reports'
];
function getDefaultRedirect() {
    const user = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getCurrentUser"])();
    if (!user) return '/auth/login';
    // Never return a route that fails its own canAccessRoute check. The previous
    // version hardcoded staff → /inbox and admin → /, which meant a role holding
    // only inbox.CallCenter (i.e. a call-center agent) was pushed to /inbox,
    // denied there, pushed again — an infinite redirect loop, with MainLayout
    // firing a fresh error toast on every pass.
    const landing = LANDING_CANDIDATES.find((route)=>canAccessRoute(route));
    if (landing) return landing;
    // Genuinely nothing to show. /no-access explains that and offers a logout,
    // which is the only honest end state for a role with no permissions.
    return '/no-access';
}
;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/lib/studio-time.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "studioWallTimeToUtcISO",
    ()=>studioWallTimeToUtcISO,
    "utcToStudioWallTime",
    ()=>utcToStudioWallTime
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2d$tz$2f$dist$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/date-fns-tz/dist/esm/index.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2d$tz$2f$dist$2f$esm$2f$fromZonedTime$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/date-fns-tz/dist/esm/fromZonedTime/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2d$tz$2f$dist$2f$esm$2f$toZonedTime$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/date-fns-tz/dist/esm/toZonedTime/index.js [app-client] (ecmascript)");
'use client';
;
function studioWallTimeToUtcISO(dateStr, timeStr, timezone) {
    if (!dateStr || !timeStr) return undefined;
    const naive = `${dateStr}T${timeStr}`;
    if (!timezone) return new Date(naive).toISOString() // no studio tz known yet — old behavior
    ;
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2d$tz$2f$dist$2f$esm$2f$fromZonedTime$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fromZonedTime"])(naive, timezone).toISOString();
}
function utcToStudioWallTime(iso, timezone) {
    if (!iso) return {
        date: '',
        time: ''
    };
    const zoned = timezone ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2d$tz$2f$dist$2f$esm$2f$toZonedTime$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toZonedTime"])(iso, timezone) : new Date(iso);
    const pad = (n)=>String(n).padStart(2, '0');
    const date = `${zoned.getFullYear()}-${pad(zoned.getMonth() + 1)}-${pad(zoned.getDate())}`;
    const time = `${pad(zoned.getHours())}:${pad(zoned.getMinutes())}`;
    return {
        date,
        time
    };
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/lib/studioLocalDate.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "dateInputToISO",
    ()=>dateInputToISO,
    "formatStudioDate",
    ()=>formatStudioDate,
    "formatStudioTime",
    ()=>formatStudioTime,
    "toDateInput",
    ()=>toDateInput,
    "toStudioLocalDate",
    ()=>toStudioLocalDate,
    "todayDateInput",
    ()=>todayDateInput
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$studioTimezone$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/studioTimezone.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$studio$2d$time$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/studio-time.js [app-client] (ecmascript)");
;
;
function toStudioLocalDate(date, tz) {
    if (!tz) return date;
    try {
        const parts = new Intl.DateTimeFormat('en-CA', {
            timeZone: tz,
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false
        }).formatToParts(date);
        const p = Object.fromEntries(parts.map(({ type, value })=>[
                type,
                value
            ]));
        const hour = Number(p.hour === '24' ? '0' : p.hour);
        return new Date(Number(p.year), Number(p.month) - 1, Number(p.day), hour, Number(p.minute), Number(p.second));
    } catch  {
        return date;
    }
}
function formatStudioDate(value, tz, options = {}) {
    if (!value) return '—';
    const d = new Date(value);
    if (Number.isNaN(d.getTime())) return '—';
    const zone = tz || (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$studioTimezone$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getStudioTimezone"])();
    return d.toLocaleDateString('en-US', {
        ...zone ? {
            timeZone: zone
        } : {},
        weekday: 'short',
        month: 'short',
        day: 'numeric',
        ...options
    });
}
function formatStudioTime(value, tz, options = {}) {
    if (!value) return '—';
    const d = new Date(value);
    if (Number.isNaN(d.getTime())) return '—';
    const zone = tz || (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$studioTimezone$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getStudioTimezone"])();
    return d.toLocaleTimeString('en-US', {
        ...zone ? {
            timeZone: zone
        } : {},
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
        ...options
    });
}
function dateInputToISO(ymd) {
    if (!ymd) return undefined;
    const [y, m, d] = String(ymd).split('-').map(Number);
    if (!y || !m || !d) return undefined;
    const tz = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$studioTimezone$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getStudioTimezone"])();
    if (tz) return (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$studio$2d$time$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["studioWallTimeToUtcISO"])(ymd, (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$studio$2d$time$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["utcToStudioWallTime"])(new Date().toISOString(), tz).time, tz);
    const now = new Date();
    return new Date(y, m - 1, d, now.getHours(), now.getMinutes(), now.getSeconds()).toISOString();
}
function todayDateInput() {
    const tz = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$studioTimezone$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getStudioTimezone"])();
    return new Date().toLocaleDateString('en-CA', tz ? {
        timeZone: tz
    } : undefined);
}
function toDateInput(value) {
    if (!value) return '';
    const d = new Date(value);
    if (Number.isNaN(d.getTime())) return '';
    const dateOnly = d.getUTCHours() === 0 && d.getUTCMinutes() === 0 && d.getUTCSeconds() === 0 && d.getUTCMilliseconds() === 0;
    const tz = dateOnly ? 'UTC' : (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$studioTimezone$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getStudioTimezone"])();
    return d.toLocaleDateString('en-CA', tz ? {
        timeZone: tz
    } : undefined);
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/lib/studioSlotHours.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/** Snapshot of location fields used for bookable slot lists. */ __turbopack_context__.s([
    "buildDayMap",
    ()=>buildDayMap,
    "enumerateGridSlotStarts",
    ()=>enumerateGridSlotStarts,
    "localDayOfWeek",
    ()=>localDayOfWeek,
    "locationSlotSettings",
    ()=>locationSlotSettings,
    "resolveLessonMinutes",
    ()=>resolveLessonMinutes,
    "resolveStudioDayHours",
    ()=>resolveStudioDayHours
]);
function locationSlotSettings(loc) {
    if (!loc) return null;
    return {
        operatingHours: Array.isArray(loc.operatingHours) ? loc.operatingHours : [],
        defaultLessonMinutes: loc.defaultLessonMinutes,
        timezone: loc.timezone || null
    };
}
/** Same fallback the calling/texting agent uses when a location has no operatingHours. */ const FALLBACK_STUDIO_HOURS = [
    null,
    {
        open: 9,
        close: 20
    },
    {
        open: 9,
        close: 20
    },
    {
        open: 9,
        close: 20
    },
    {
        open: 9,
        close: 20
    },
    {
        open: 9,
        close: 20
    },
    {
        open: 9,
        close: 17
    }
];
const WEEKDAY_TO_DOW = {
    Sunday: 0,
    Monday: 1,
    Tuesday: 2,
    Wednesday: 3,
    Thursday: 4,
    Friday: 5,
    Saturday: 6
};
function buildDayMap(operatingHours) {
    if (!Array.isArray(operatingHours) || operatingHours.length === 0) {
        return FALLBACK_STUDIO_HOURS.map((h)=>h ? {
                open: h.open,
                close: h.close
            } : null);
    }
    const map = [
        null,
        null,
        null,
        null,
        null,
        null,
        null
    ];
    for (const h of operatingHours){
        const day = Number(h?.day);
        if (day >= 0 && day <= 6) {
            map[day] = h.closed ? null : {
                open: Number(h.open ?? 9),
                close: Number(h.close ?? 20)
            };
        }
    }
    return map;
}
function localDayOfWeek(dateStr, tz) {
    const [year, month, day] = String(dateStr || '').split('-').map(Number);
    if (!year || !month || !day) return -1;
    const noonUtc = new Date(Date.UTC(year, month - 1, day, 12));
    if (tz) {
        try {
            const weekdayName = new Intl.DateTimeFormat('en-US', {
                timeZone: tz,
                weekday: 'long'
            }).format(noonUtc);
            return WEEKDAY_TO_DOW[weekdayName] ?? -1;
        } catch  {
        // fall through
        }
    }
    return noonUtc.getUTCDay();
}
function resolveLessonMinutes(value) {
    const mins = Number(value);
    if (Number.isFinite(mins) && mins >= 15 && mins <= 180) return mins;
    return 60;
}
function resolveStudioDayHours(operatingHours, dateStr, tz) {
    if (!dateStr) {
        return {
            closed: false,
            openMin: null,
            closeMin: null
        };
    }
    const dayMap = buildDayMap(operatingHours);
    const dow = localDayOfWeek(dateStr, tz);
    const hours = dow >= 0 ? dayMap[dow] : null;
    if (!hours) return {
        closed: true,
        openMin: 0,
        closeMin: 0
    };
    const openMin = Math.round(Number(hours.open) * 60);
    const closeMin = Math.round(Number(hours.close) * 60);
    if (!Number.isFinite(openMin) || !Number.isFinite(closeMin) || openMin >= closeMin) {
        return {
            closed: true,
            openMin: 0,
            closeMin: 0
        };
    }
    return {
        closed: false,
        openMin,
        closeMin
    };
}
function enumerateGridSlotStarts(slotAlignMins, slotStepMins, dayEndMin, busyIntervals = [], bookingDurMins) {
    const step = Math.max(15, Number(slotStepMins) || 60);
    const bookingDur = Math.max(15, Number(bookingDurMins) > 0 ? Number(bookingDurMins) : step);
    const windowStart = Math.max(0, Number(slotAlignMins) || 0);
    const windowEnd = Math.min(24 * 60, Number(dayEndMin) > 0 ? Number(dayEndMin) : 0);
    if (!(windowEnd > windowStart)) return [];
    const busy = Array.isArray(busyIntervals) ? busyIntervals : [];
    const starts = [];
    for(let t = windowStart; t + bookingDur <= windowEnd; t += step){
        const slotEnd = t + bookingDur;
        const conflict = busy.some((b)=>t < b.end && slotEnd > b.start);
        if (!conflict) starts.push(t);
    }
    return starts;
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/lib/twilioVoiceClient.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "destroyTwilioDevice",
    ()=>destroyTwilioDevice,
    "disconnectAllCalls",
    ()=>disconnectAllCalls,
    "disconnectConnection",
    ()=>disconnectConnection,
    "ensureTwilioDevice",
    ()=>ensureTwilioDevice,
    "getActiveConnection",
    ()=>getActiveConnection,
    "getActiveDevice",
    ()=>getActiveDevice,
    "isConnectionMuted",
    ()=>isConnectionMuted,
    "joinConferenceCall",
    ()=>joinConferenceCall,
    "muteConnection",
    ()=>muteConnection,
    "subscribeToConnectionEvents",
    ()=>subscribeToConnectionEvents
]);
'use client';
let devicePromise = null;
let activeDevice = null;
let activeConnection = null;
async function loadVoiceSdk() {
    const mod = await __turbopack_context__.A("[project]/node_modules/@twilio/voice-sdk/esm/twilio.js [app-client] (ecmascript, async loader)");
    return mod.Device;
}
function getActiveConnection() {
    return activeConnection;
}
function getActiveDevice() {
    return activeDevice;
}
async function ensureTwilioDevice(fetchToken) {
    if (activeDevice && activeDevice.state === 'registered') {
        return activeDevice;
    }
    if (!devicePromise) {
        devicePromise = (async ()=>{
            const tokenResult = await fetchToken();
            const payload = tokenResult?.data || tokenResult;
            const token = payload?.token;
            if (!token) {
                throw new Error(tokenResult?.error || tokenResult?.message || 'Voice token unavailable');
            }
            const Device = await loadVoiceSdk();
            const device = new Device(token, {
                codecPreferences: [
                    'opus',
                    'pcmu'
                ],
                closeProtection: true
            });
            await device.register();
            activeDevice = device;
            return device;
        })();
    }
    try {
        return await devicePromise;
    } catch (error) {
        devicePromise = null;
        activeDevice = null;
        throw error;
    }
}
function bindConnectionEvents(connection) {
    connection.on('disconnect', ()=>{
        if (activeConnection === connection) {
            activeConnection = null;
        }
    });
    connection.on('cancel', ()=>{
        if (activeConnection === connection) {
            activeConnection = null;
        }
    });
    connection.on('error', ()=>{
        if (activeConnection === connection) {
            activeConnection = null;
        }
    });
}
async function joinConferenceCall({ fetchToken, conferenceName, queueItemId, callHistoryId }) {
    const device = await ensureTwilioDevice(fetchToken);
    const params = {
        conferenceName: String(conferenceName)
    };
    if (queueItemId) params.queueItemId = String(queueItemId);
    if (callHistoryId) params.callHistoryId = String(callHistoryId);
    const connection = await device.connect({
        params
    });
    activeConnection = connection;
    bindConnectionEvents(connection);
    return connection;
}
function muteConnection(connection, muted = true) {
    const target = connection || activeConnection;
    if (!target?.mute) return false;
    target.mute(Boolean(muted));
    return target.isMuted?.() ?? Boolean(muted);
}
function isConnectionMuted(connection) {
    const target = connection || activeConnection;
    return target?.isMuted?.() ?? false;
}
function disconnectConnection(connection) {
    const target = connection || activeConnection;
    target?.disconnect?.();
    if (activeConnection === target) {
        activeConnection = null;
    }
}
function disconnectAllCalls() {
    activeDevice?.disconnectAll();
    activeConnection = null;
}
function destroyTwilioDevice() {
    disconnectAllCalls();
    activeDevice?.destroy();
    activeDevice = null;
    devicePromise = null;
}
function subscribeToConnectionEvents(connection, handlers = {}) {
    const target = connection || activeConnection;
    if (!target?.on) return ()=>{};
    const events = [
        'accept',
        'disconnect',
        'cancel',
        'error',
        'mute',
        'reconnecting',
        'reconnected'
    ];
    events.forEach((event)=>{
        if (handlers[event]) {
            target.on(event, handlers[event]);
        }
    });
    return ()=>{
        events.forEach((event)=>{
            if (handlers[event]) {
                target.off?.(event, handlers[event]);
            }
        });
    };
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/lib/utils.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "cn",
    ()=>cn,
    "formatCurrency",
    ()=>formatCurrency,
    "formatDate",
    ()=>formatDate,
    "formatDateTime",
    ()=>formatDateTime,
    "formatPercentage",
    ()=>formatPercentage,
    "getContactDisplayName",
    ()=>getContactDisplayName,
    "getInitials",
    ()=>getInitials,
    "nameWithMembers",
    ()=>nameWithMembers,
    "roundSessions",
    ()=>roundSessions,
    "toCalendarDateStringInTimeZone",
    ()=>toCalendarDateStringInTimeZone,
    "toLocalCalendarDateString",
    ()=>toLocalCalendarDateString,
    "truncateText",
    ()=>truncateText
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/clsx/dist/clsx.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tailwind$2d$merge$2f$dist$2f$bundle$2d$mjs$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/tailwind-merge/dist/bundle-mjs.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$studioTimezone$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/studioTimezone.js [app-client] (ecmascript)");
;
;
;
function cn(...inputs) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tailwind$2d$merge$2f$dist$2f$bundle$2d$mjs$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["twMerge"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["clsx"])(inputs));
}
function formatDate(date, timeZone) {
    if (!date) return '';
    const d = new Date(date);
    if (Number.isNaN(d.getTime())) return '';
    // Date-only values (dob, memberSince, enrollment/expiry/lesson/payment
    // dates, etc.) are stored as exact UTC midnight — the backend's parseDate()
    // constructs them as a local calendar date and, since imports commonly run
    // with a UTC server clock, that lands on UTC midnight on the wire. If we
    // then format in the *browser's* local timezone (the default below), a
    // browser west of UTC rolls that back to the previous day — the exact
    // "dates land a day early" bug. Real timestamps (createdAt, etc.) are for
    // all practical purposes never exactly UTC midnight, so this heuristic
    // formats date-only values in UTC (no shift). Real timestamps read in the
    // studio's timezone, so a viewer in another country sees the studio's date.
    const looksDateOnly = d.getUTCHours() === 0 && d.getUTCMinutes() === 0 && d.getUTCSeconds() === 0 && d.getUTCMilliseconds() === 0;
    const zone = timeZone || (looksDateOnly ? 'UTC' : (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$studioTimezone$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getStudioTimezone"])());
    return d.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        ...zone ? {
            timeZone: zone
        } : {}
    });
}
function formatDateTime(date, timeZone) {
    if (!date) return '';
    const d = new Date(date);
    if (Number.isNaN(d.getTime())) return '';
    const zone = timeZone || (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$studioTimezone$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getStudioTimezone"])();
    return d.toLocaleString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
        ...zone ? {
            timeZone: zone
        } : {}
    });
}
function toLocalCalendarDateString(date = new Date()) {
    const d = date instanceof Date ? date : new Date(date);
    if (Number.isNaN(d.getTime())) return '';
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${y}-${m}-${day}`;
}
function toCalendarDateStringInTimeZone(date = new Date(), timeZone) {
    const zone = timeZone || (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$studioTimezone$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getStudioTimezone"])();
    if (!zone) return toLocalCalendarDateString(date);
    const d = date instanceof Date ? date : new Date(date);
    if (Number.isNaN(d.getTime())) return '';
    return new Intl.DateTimeFormat('en-CA', {
        timeZone: zone,
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
    }).format(d);
}
function formatCurrency(amount) {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    }).format(amount);
}
function formatPercentage(value) {
    return `${value.toFixed(1)}%`;
}
function nameWithMembers(person) {
    if (!person) return '';
    return [
        person.name,
        ...(person.members || []).map((m)=>m?.name)
    ].filter(Boolean).join(' & ');
}
function getContactDisplayName(contact) {
    if (!contact) return 'Unknown';
    return contact.name || contact.phoneNumber || contact.email || 'Unknown';
}
function getInitials(name) {
    if (!name) return '??';
    return name.split(' ').map((n)=>n[0]).join('').toUpperCase().slice(0, 2);
}
function truncateText(text, length = 50) {
    if (!text) return '';
    if (text.length <= length) return text;
    return text.slice(0, length) + '...';
}
function roundSessions(n) {
    const v = Number(n);
    if (!Number.isFinite(v)) return 0;
    return Math.ceil(v - 1e-6) + 0;
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=lib_1hbzn7d4bg9e9._.js.map