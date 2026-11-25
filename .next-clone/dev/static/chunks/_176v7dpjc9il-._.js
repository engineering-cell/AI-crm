(globalThis["TURBOPACK"] || (globalThis["TURBOPACK"] = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/components/Providers.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Providers
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$swr$2f$dist$2f$index$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/swr/dist/index/index.mjs [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/sonner/dist/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$contexts$2f$InboxHeaderContext$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/contexts/InboxHeaderContext.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$contexts$2f$ThemeContext$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/contexts/ThemeContext.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$hooks$2f$useAnalyticsOverview$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/hooks/useAnalyticsOverview.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/auth.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$hooks$2f$useStudioTimezone$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/hooks/useStudioTimezone.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$studioTimezone$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/studioTimezone.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$payments$2f$TerminalChargeTracker$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/payments/TerminalChargeTracker.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature(), _s2 = __turbopack_context__.k.signature(), _s3 = __turbopack_context__.k.signature();
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
// Pages format dates while they render, so the studio timezone has to be known before
// they mount — otherwise their first render uses the viewer's zone and never redoes it.
// Only a first visit to a branch waits on the request; later loads read the cached zone.
// Re-checked on navigation, because signing in moves to the app without a reload.
function StudioTimezoneGate({ children }) {
    _s();
    const pathname = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePathname"])();
    const [ready, setReady] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const triedRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "StudioTimezoneGate.useEffect": ()=>{
            if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isAuthenticated"])()) {
                setReady(true);
                return;
            }
            if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$studioTimezone$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getStudioTimezone"])() || (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$hooks$2f$useStudioTimezone$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["loadCachedStudioTimezone"])() || triedRef.current) {
                setReady(true);
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$hooks$2f$useStudioTimezone$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["resolveStudioTimezone"])(); // refresh the cache in the background; no-op once resolved
                return;
            }
            triedRef.current = true;
            setReady(false);
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$hooks$2f$useStudioTimezone$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["resolveStudioTimezone"])().finally({
                "StudioTimezoneGate.useEffect": ()=>setReady(true)
            }["StudioTimezoneGate.useEffect"]);
        }
    }["StudioTimezoneGate.useEffect"], [
        pathname
    ]);
    return ready ? children : null;
}
_s(StudioTimezoneGate, "sBrfESfh1Gp6hXBUg+bSDlUaBuc=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePathname"]
    ];
});
_c = StudioTimezoneGate;
function ThemedToaster() {
    _s1();
    const { theme, mounted } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$contexts$2f$ThemeContext$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTheme"])();
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Toaster"], {
        position: "top-right",
        richColors: true,
        theme: mounted ? theme : 'light'
    }, void 0, false, {
        fileName: "[project]/components/Providers.js",
        lineNumber: 45,
        columnNumber: 5
    }, this);
}
_s1(ThemedToaster, "VnximR1twuOp6uztnIQCxVNaEgI=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$contexts$2f$ThemeContext$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTheme"]
    ];
});
_c1 = ThemedToaster;
// Scrolling the page while a number field has focus changed its value (prices,
// refunds, quantities). Dropping focus first lets the wheel scroll the page instead.
function useNoWheelOnNumberInputs() {
    _s2();
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useNoWheelOnNumberInputs.useEffect": ()=>{
            const onWheel = {
                "useNoWheelOnNumberInputs.useEffect.onWheel": (e)=>{
                    const el = document.activeElement;
                    if (el?.type === 'number' && el === e.target) el.blur();
                }
            }["useNoWheelOnNumberInputs.useEffect.onWheel"];
            document.addEventListener('wheel', onWheel, {
                capture: true,
                passive: true
            });
            return ({
                "useNoWheelOnNumberInputs.useEffect": ()=>document.removeEventListener('wheel', onWheel, {
                        capture: true
                    })
            })["useNoWheelOnNumberInputs.useEffect"];
        }
    }["useNoWheelOnNumberInputs.useEffect"], []);
}
_s2(useNoWheelOnNumberInputs, "OD7bBpZva5O2jO+Puf00hKivP7c=");
function Providers({ children }) {
    _s3();
    useNoWheelOnNumberInputs();
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$contexts$2f$ThemeContext$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ThemeProvider"], {
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$swr$2f$dist$2f$index$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["SWRConfig"], {
            value: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$hooks$2f$useAnalyticsOverview$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["analyticsSwrConfig"],
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$contexts$2f$InboxHeaderContext$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["InboxHeaderProvider"], {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(StudioTimezoneGate, {
                        children: children
                    }, void 0, false, {
                        fileName: "[project]/components/Providers.js",
                        lineNumber: 72,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ThemedToaster, {}, void 0, false, {
                        fileName: "[project]/components/Providers.js",
                        lineNumber: 73,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$payments$2f$TerminalChargeTracker$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                        fileName: "[project]/components/Providers.js",
                        lineNumber: 74,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/Providers.js",
                lineNumber: 71,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/components/Providers.js",
            lineNumber: 70,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/Providers.js",
        lineNumber: 69,
        columnNumber: 5
    }, this);
}
_s3(Providers, "ZYK2ZrxRHNuHx0iuIs/7TEAFQTY=", false, function() {
    return [
        useNoWheelOnNumberInputs
    ];
});
_c2 = Providers;
var _c, _c1, _c2;
__turbopack_context__.k.register(_c, "StudioTimezoneGate");
__turbopack_context__.k.register(_c1, "ThemedToaster");
__turbopack_context__.k.register(_c2, "Providers");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/payments/TerminalChargeTracker.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>TerminalChargeTracker
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/api.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$toast$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/toast.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/auth.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$terminalCharge$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/terminalCharge.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
const POLL_MS = 3000;
// A reader charge older than this has long been settled or retired by the sweeper.
const RESTORE_WINDOW_MS = 2 * 60 * 60 * 1000;
function settled(id, status) {
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$terminalCharge$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["untrackTerminalCharge"])(id);
    window.dispatchEvent(new CustomEvent(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$terminalCharge$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TERMINAL_CHARGE_SETTLED_EVENT"], {
        detail: {
            id,
            status
        }
    }));
}
function ChargeCard({ charge }) {
    _s();
    const [cancelling, setCancelling] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const cancellingRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(false);
    // Poll until the webhook settles it. A 404/permission error stops tracking rather than
    // leaving a card on screen forever.
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ChargeCard.useEffect": ()=>{
            let stopped = false;
            const tick = {
                "ChargeCard.useEffect.tick": async ()=>{
                    if (stopped || cancellingRef.current) return;
                    const res = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].get(`/api/payment/${charge.id}`);
                    if (stopped || cancellingRef.current) return;
                    if (!res.success) {
                        if (res.status === 404 || res.status === 403) settled(charge.id, 'unknown');
                        return;
                    }
                    const status = res.data?.status;
                    if (status === 'completed') {
                        __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$toast$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].success(`Card payment of $${charge.amount.toFixed(2)} received.`);
                        settled(charge.id, 'completed');
                    } else if (status === 'failed') {
                        __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$toast$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error(`The $${charge.amount.toFixed(2)} card-reader charge did not go through.`);
                        settled(charge.id, 'failed');
                    }
                }
            }["ChargeCard.useEffect.tick"];
            const timer = setInterval(tick, POLL_MS);
            return ({
                "ChargeCard.useEffect": ()=>{
                    stopped = true;
                    clearInterval(timer);
                }
            })["ChargeCard.useEffect"];
        }
    }["ChargeCard.useEffect"], [
        charge.id,
        charge.amount
    ]);
    async function cancel() {
        if (!window.confirm(`Cancel the $${charge.amount.toFixed(2)} charge on the card reader? Nothing will be taken from the customer.`)) return;
        cancellingRef.current = true;
        setCancelling(true);
        const res = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].post(`/api/payment/${charge.id}/cancel-pending`);
        cancellingRef.current = false;
        setCancelling(false);
        if (!res.success) {
            __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$toast$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error(res.error || "Couldn't cancel this charge.");
            return;
        }
        const status = res.data?.status;
        if (status === 'completed') {
            // The customer tapped before the cancel landed — the money is real, so keep it.
            __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$toast$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].success('The customer had already paid — payment recorded instead of cancelled.');
            settled(charge.id, 'completed');
        } else if (status === 'cancelled') {
            __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$toast$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].success('Charge cancelled.');
            settled(charge.id, 'cancelled');
        } else {
            // Stripe still has it mid-processing: keep the card so staff can try again.
            __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$toast$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].info('Stripe still shows this charge in progress — try again shortly.');
        }
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "pointer-events-auto w-72 rounded-xl border border-border bg-background p-3 shadow-lg",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "text-[12px] font-semibold text-foreground",
                children: "Waiting for card on reader"
            }, void 0, false, {
                fileName: "[project]/components/payments/TerminalChargeTracker.js",
                lineNumber: 82,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "mt-0.5 text-[11px] text-muted-foreground",
                children: [
                    "$",
                    charge.amount.toFixed(2),
                    charge.label ? ` · ${charge.label}` : ''
                ]
            }, void 0, true, {
                fileName: "[project]/components/payments/TerminalChargeTracker.js",
                lineNumber: 83,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                type: "button",
                disabled: cancelling,
                onClick: cancel,
                className: "mt-2 h-7 w-full rounded-md border border-rose-300 text-[11px] font-medium text-rose-600 hover:bg-rose-50 disabled:opacity-50 dark:hover:bg-rose-900/20",
                children: cancelling ? 'Cancelling…' : 'Cancel charge'
            }, void 0, false, {
                fileName: "[project]/components/payments/TerminalChargeTracker.js",
                lineNumber: 86,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/payments/TerminalChargeTracker.js",
        lineNumber: 81,
        columnNumber: 5
    }, this);
}
_s(ChargeCard, "Lgl3ZYORQ1VE9MFpF307fDbP9Qk=");
_c = ChargeCard;
function TerminalChargeTracker() {
    _s1();
    const [charges, setCharges] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "TerminalChargeTracker.useEffect": ()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$terminalCharge$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["subscribeTerminalCharges"])(setCharges)
    }["TerminalChargeTracker.useEffect"], []);
    // The tracker lives in memory, so a refresh, a new tab or a navigation would otherwise drop
    // the Cancel button while the customer is still at the reader. Pick the charges back up from
    // the server. Skipped when signed out: a 401 here would log the user out of the login page.
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "TerminalChargeTracker.useEffect": ()=>{
            if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isAuthenticated"])()) return;
            let stopped = false;
            __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].get('/api/payment?method=terminal&status=pending&limit=20').then({
                "TerminalChargeTracker.useEffect": (res)=>{
                    if (stopped || !res.success || !Array.isArray(res.data)) return;
                    for (const p of res.data){
                        if (Date.now() - new Date(p.createdAt).getTime() < RESTORE_WINDOW_MS) (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$terminalCharge$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["trackTerminalCharge"])(p);
                    }
                }
            }["TerminalChargeTracker.useEffect"]);
            return ({
                "TerminalChargeTracker.useEffect": ()=>{
                    stopped = true;
                }
            })["TerminalChargeTracker.useEffect"];
        }
    }["TerminalChargeTracker.useEffect"], []);
    if (charges.length === 0) return null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "pointer-events-none fixed bottom-4 right-4 z-[100] flex flex-col gap-2",
        children: charges.map((c)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ChargeCard, {
                charge: c
            }, c.id, false, {
                fileName: "[project]/components/payments/TerminalChargeTracker.js",
                lineNumber: 120,
                columnNumber: 9
            }, this))
    }, void 0, false, {
        fileName: "[project]/components/payments/TerminalChargeTracker.js",
        lineNumber: 118,
        columnNumber: 5
    }, this);
}
_s1(TerminalChargeTracker, "3hPumG3pFArDidHw3xObPr6eARo=");
_c1 = TerminalChargeTracker;
var _c, _c1;
__turbopack_context__.k.register(_c, "ChargeCard");
__turbopack_context__.k.register(_c1, "TerminalChargeTracker");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/ui/toast.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "toast",
    ()=>toast,
    "useToast",
    ()=>useToast
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/sonner/dist/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$notificationPreferences$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/notificationPreferences.js [app-client] (ecmascript)");
'use client';
;
;
// Per-user preference: success/info pop-ups and error pop-ups are separate
// switches (plus the master one), checked at the moment the toast is raised.
const allowed = (kind)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$notificationPreferences$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isNotificationEnabled"])(kind === 'error' ? 'toast.error' : 'toast.success');
/**
 * Toast utility using Sonner.
 *
 * Accepts EITHER shape:
 *   toast.error('Could not save the customer.')          // string
 *   toast.error({ title: 'Save failed', message: '...' }) // object
 *
 * Both are in use across the app — roughly 450 object-form calls and 257
 * string-form ones. The hook previously destructured `({ title, message })`
 * unconditionally, and destructuring a string yields undefined for both, so every
 * string-form call rendered as a bare "Error" / "Success" with the actual reason
 * dropped. Normalising here fixes all of them without touching the call sites.
 */ function normalize(input, fallbackTitle) {
    // A string is the message itself — show it as the headline rather than burying
    // it under a generic title, which is what the caller clearly intended.
    if (typeof input === 'string') return [
        input || fallbackTitle,
        undefined
    ];
    if (input && typeof input === 'object') {
        return [
            input.title || input.message || fallbackTitle,
            input.title ? input.message : undefined
        ];
    }
    return [
        fallbackTitle,
        undefined
    ];
}
function useToast() {
    return {
        success: (input)=>{
            if (!allowed('success')) return;
            const [title, description] = normalize(input, 'Success');
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].success(title, description ? {
                description
            } : undefined);
        },
        error: (input)=>{
            if (!allowed('error')) return;
            const [title, description] = normalize(input, 'Error');
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error(title, description ? {
                description
            } : undefined);
        },
        info: (input)=>{
            if (!allowed('info')) return;
            const [title, description] = normalize(input, 'Info');
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].info(title, description ? {
                description
            } : undefined);
        }
    };
}
const toast = {
    success: (title, options)=>allowed('success') && __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].success(title, options),
    error: (title, options)=>allowed('error') && __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error(title, options),
    info: (title, options)=>allowed('info') && __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].info(title, options)
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/contexts/InboxHeaderContext.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "InboxHeaderProvider",
    ()=>InboxHeaderProvider,
    "useInboxHeader",
    ()=>useInboxHeader
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
'use client';
;
const InboxHeaderContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createContext"])({
    inboxCounts: {
        customers: 0,
        leads: 0,
        teachers: 0
    },
    setInboxCounts: ()=>{},
    // legacy alias kept so older callers don't crash
    inboxTeachersCount: 0,
    setInboxTeachersCount: ()=>{}
});
function InboxHeaderProvider({ children }) {
    _s();
    const [inboxCounts, setInboxCounts] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        everyone: 0,
        customers: 0,
        leads: 0,
        teachers: 0,
        other: 0,
        unread: {
            everyone: 0,
            customers: 0,
            leads: 0,
            teachers: 0,
            other: 0
        }
    });
    const setInboxTeachersCount = (n)=>{
        setInboxCounts((prev)=>({
                ...prev,
                teachers: Number(n) || 0
            }));
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(InboxHeaderContext.Provider, {
        value: {
            inboxCounts,
            setInboxCounts,
            inboxTeachersCount: inboxCounts.teachers,
            setInboxTeachersCount
        },
        children: children
    }, void 0, false, {
        fileName: "[project]/contexts/InboxHeaderContext.js",
        lineNumber: 28,
        columnNumber: 5
    }, this);
}
_s(InboxHeaderProvider, "CL/N4uxG6wpNxhB7b2OQabHD2Uw=");
_c = InboxHeaderProvider;
function useInboxHeader() {
    _s1();
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"])(InboxHeaderContext);
}
_s1(useInboxHeader, "gDsCjeeItUuvgOWf1v4qoK9RF6k=");
var _c;
__turbopack_context__.k.register(_c, "InboxHeaderProvider");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/contexts/ThemeContext.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ThemeProvider",
    ()=>ThemeProvider,
    "useTheme",
    ()=>useTheme
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
'use client';
;
const ThemeContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createContext"])({
    theme: 'light',
    setTheme: ()=>{},
    mounted: false
});
function getThemeFromDocument() {
    if (typeof document === 'undefined') return 'light';
    return document.documentElement.classList.contains('dark') ? 'dark' : 'light';
}
function ThemeProvider({ children }) {
    _s();
    const [theme, setThemeState] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('light');
    const [mounted, setMounted] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ThemeProvider.useEffect": ()=>{
            setMounted(true);
            setThemeState(getThemeFromDocument());
        }
    }["ThemeProvider.useEffect"], []);
    const setTheme = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "ThemeProvider.useCallback[setTheme]": (value)=>{
            const next = value === 'dark' ? 'dark' : 'light';
            setThemeState(next);
            try {
                localStorage.setItem('theme', next);
            } catch  {
            /* ignore */ }
            document.documentElement.classList.toggle('dark', next === 'dark');
        }
    }["ThemeProvider.useCallback[setTheme]"], []);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ThemeContext.Provider, {
        value: {
            theme,
            setTheme,
            mounted
        },
        children: children
    }, void 0, false, {
        fileName: "[project]/contexts/ThemeContext.js",
        lineNumber: 37,
        columnNumber: 5
    }, this);
}
_s(ThemeProvider, "k2ZnZOOyrBfOkv2MoYBb9brV5Eg=");
_c = ThemeProvider;
function useTheme() {
    _s1();
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"])(ThemeContext);
}
_s1(useTheme, "gDsCjeeItUuvgOWf1v4qoK9RF6k=");
var _c;
__turbopack_context__.k.register(_c, "ThemeProvider");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/lib/api.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "api",
    ()=>api,
    "apiDelete",
    ()=>apiDelete,
    "apiGet",
    ()=>apiGet,
    "apiPatch",
    ()=>apiPatch,
    "apiPost",
    ()=>apiPost,
    "apiPut",
    ()=>apiPut,
    "default",
    ()=>__TURBOPACK__default__export__,
    "getApiBaseUrl",
    ()=>getApiBaseUrl
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/auth.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$terminalCharge$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/terminalCharge.js [app-client] (ecmascript)");
'use client';
;
;
function getApiBaseUrl() {
    const base = typeof __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"] !== 'undefined' && ("TURBOPACK compile-time value", "http://127.0.0.1:8081") || 'http://localhost:8080';
    return base.replace(/\/$/, '');
}
/**
 * Centralized API client for making authenticated requests
 */ class ApiClient {
    constructor(){
        this.baseUrl = getApiBaseUrl();
    }
    /**
   * Build full URL from path
   */ buildUrl(path) {
        // Ensure path starts with /
        const normalizedPath = path.startsWith('/') ? path : `/${path}`;
        return `${this.baseUrl}${normalizedPath}`;
    }
    /**
   * Build headers with authentication token
   */ buildHeaders(customHeaders = {}) {
        const token = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getToken"])();
        const headers = {
            'Content-Type': 'application/json',
            ...customHeaders
        };
        if (token) {
            headers.Authorization = `Bearer ${token}`;
        }
        const effectiveBranch = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getEffectiveBranch"])();
        if (effectiveBranch) {
            headers['x-location-id'] = effectiveBranch;
        }
        return headers;
    }
    /**
   * Handle API response
   */ async handleResponse(response) {
        const data = await response.json().catch(()=>null);
        if (response.status === 401) {
            if ("TURBOPACK compile-time truthy", 1) {
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["logout"])();
            }
            return {
                success: false,
                error: data?.message || 'Session expired. Please sign in again.',
                errorData: data?.error ?? null,
                status: 401
            };
        }
        // Preferred response shape:
        // { success: true, data: <payload>, message?: string, pagination?: any }
        if (response.ok && data && data.success) {
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$terminalCharge$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["trackPendingReaderCharge"])(data.data);
            return {
                success: true,
                data: data.data,
                message: data.message,
                pagination: data.pagination
            };
        }
        // Tolerant mode: many endpoints return raw JSON without a `success` wrapper.
        // Treat any 2xx response as success and return the parsed body as `data`.
        if (response.ok) {
            return {
                success: true,
                data,
                message: data?.message
            };
        }
        return {
            success: false,
            error: data?.message || `Request failed with status ${response.status}`,
            errorData: data?.error ?? null,
            status: response.status
        };
    }
    /**
   * Make API request
   */ async request(path, options = {}) {
        try {
            const url = this.buildUrl(path);
            const headers = this.buildHeaders(options.headers);
            const isFormData = typeof FormData !== 'undefined' && options?.body && options.body instanceof FormData;
            if (isFormData) {
                // Let the browser set multipart boundaries.
                delete headers['Content-Type'];
            }
            const response = await fetch(url, {
                // Every mutation here is immediately followed by a refetch (e.g. the
                // calendar's fetchCalendarEvents() after allocating a lesson) that
                // must see the write that just happened. Without this, the browser
                // can send a conditional GET against Express's auto-generated ETag,
                // get back a 304, and silently reuse its pre-mutation cached body —
                // so a refetch looks like a no-op even though the write succeeded.
                cache: 'no-store',
                ...options,
                headers
            });
            return await this.handleResponse(response);
        } catch (error) {
            return {
                success: false,
                error: error.message || 'Network error. Please try again.'
            };
        }
    }
    /**
   * GET request
   */ async get(path, options = {}) {
        return this.request(path, {
            method: 'GET',
            ...options
        });
    }
    /**
   * POST request
   */ async post(path, data, options = {}) {
        return this.request(path, {
            method: 'POST',
            body: JSON.stringify(data),
            ...options
        });
    }
    /**
   * PUT request
   */ async put(path, data, options = {}) {
        return this.request(path, {
            method: 'PUT',
            body: JSON.stringify(data),
            ...options
        });
    }
    /**
   * PATCH request
   */ async patch(path, data, options = {}) {
        return this.request(path, {
            method: 'PATCH',
            body: JSON.stringify(data),
            ...options
        });
    }
    /**
   * DELETE request
   */ async delete(path, options = {}) {
        return this.request(path, {
            method: 'DELETE',
            ...options
        });
    }
}
// Export singleton instance
const api = new ApiClient();
const __TURBOPACK__default__export__ = api;
;
const apiGet = (path, options)=>api.get(path, options);
const apiPost = (path, data, options)=>api.post(path, data, options);
const apiPut = (path, data, options)=>api.put(path, data, options);
const apiPatch = (path, data, options)=>api.patch(path, data, options);
const apiDelete = (path, options)=>api.delete(path, options);
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/lib/auth.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "LIST_STATE_PREFIX",
    ()=>LIST_STATE_PREFIX,
    "clearPersistedListState",
    ()=>clearPersistedListState,
    "getCurrentUser",
    ()=>getCurrentUser,
    "getCurrentUserId",
    ()=>getCurrentUserId,
    "getEffectiveBranch",
    ()=>getEffectiveBranch,
    "getSelectedBranch",
    ()=>getSelectedBranch,
    "getToken",
    ()=>getToken,
    "getUserBranch",
    ()=>getUserBranch,
    "getUserBranchName",
    ()=>getUserBranchName,
    "getUserLocations",
    ()=>getUserLocations,
    "getUserRole",
    ()=>getUserRole,
    "isAuthenticated",
    ()=>isAuthenticated,
    "login",
    ()=>login,
    "logout",
    ()=>logout,
    "refreshSession",
    ()=>refreshSession,
    "registerOrganization",
    ()=>registerOrganization,
    "setSelectedBranch",
    ()=>setSelectedBranch,
    "updateSessionUser",
    ()=>updateSessionUser
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/constants.js [app-client] (ecmascript)");
'use client';
;
// Session storage key (stores { token, user })
const USER_STORAGE_KEY = 'crm_user_session';
const LIST_STATE_PREFIX = 'list-state:';
function clearPersistedListState() {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    try {
        for (const key of Object.keys(sessionStorage)){
            if (key.startsWith(LIST_STATE_PREFIX)) sessionStorage.removeItem(key);
        }
    } catch  {}
}
// Build API URL: prefer NEXT_PUBLIC_API_BASE_URL when provided, otherwise use relative paths
function apiUrl(path) {
    const base = typeof __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"] !== 'undefined' && ("TURBOPACK compile-time value", "http://127.0.0.1:8081") || '';
    // if base provided, strip trailing slash and prepend base; otherwise return relative path
    if (base) {
        return `${base.replace(/\/$/, '')}${path}`;
    }
    return path;
}
async function login(email, password) {
    try {
        const res = await fetch(apiUrl('/api/auth/login'), {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email,
                password
            })
        });
        const body = await res.json().catch(()=>null);
        if (res.ok && body && body.success) {
            const { token, user } = body.data || {};
            const session = {
                token,
                user
            };
            if ("TURBOPACK compile-time truthy", 1) {
                // A fresh sign-in starts with clean lists, even if the previous session never
                // went through logout() (e.g. it expired or was replaced from another tab).
                clearPersistedListState();
                localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(session));
            }
            return {
                success: true,
                user
            };
        }
        return {
            success: false,
            error: body && body.message || 'Invalid credentials'
        };
    } catch (err) {
        // Network error - return friendly message
        return {
            success: false,
            error: 'Network error. Please try again.'
        };
    }
}
async function registerOrganization(organisationInfo, userInfo) {
    try {
        const res = await fetch(apiUrl('/api/auth/registerOrganization'), {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                OrganisationInfo: organisationInfo,
                userInfo
            })
        });
        const body = await res.json().catch(()=>null);
        if (res.ok && body && body.success) {
            return {
                success: true,
                data: body.data,
                message: body.message
            };
        }
        return {
            success: false,
            error: body && body.message || 'Registration failed'
        };
    } catch (err) {
        return {
            success: false,
            error: 'Network error. Please try again.'
        };
    }
}
async function refreshSession() {
    const token = getToken();
    if (!token) return null;
    try {
        const res = await fetch(apiUrl('/api/auth/me'), {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        const body = await res.json().catch(()=>null);
        if (res.status === 401) {
            logout();
            return null;
        }
        if (!res.ok || !body?.success || !body.data?.user) return null;
        const session = {
            token: body.data.token || token,
            user: body.data.user
        };
        localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(session));
        window.dispatchEvent(new CustomEvent('session-refresh', {
            detail: {
                user: session.user
            }
        }));
        return session.user;
    } catch  {
        // Offline or the API is down — keep working with the session we have.
        return null;
    }
}
function logout() {
    if ("TURBOPACK compile-time truthy", 1) {
        localStorage.removeItem(USER_STORAGE_KEY);
        localStorage.removeItem('crm_selected_branch');
        clearPersistedListState();
        window.location.href = '/auth/login';
    }
}
function getCurrentUser() {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    const sessionJson = localStorage.getItem(USER_STORAGE_KEY);
    if (!sessionJson) return null;
    try {
        const session = JSON.parse(sessionJson);
        return session?.user || null;
    } catch  {
        return null;
    }
}
function updateSessionUser(patch) {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    try {
        const session = JSON.parse(localStorage.getItem(USER_STORAGE_KEY) || 'null');
        if (!session?.user) return;
        session.user = {
            ...session.user,
            ...patch
        };
        localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(session));
        window.dispatchEvent(new CustomEvent('session-refresh', {
            detail: {
                user: session.user
            }
        }));
    } catch  {}
}
function getToken() {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    const sessionJson = localStorage.getItem(USER_STORAGE_KEY);
    if (!sessionJson) return null;
    try {
        const session = JSON.parse(sessionJson);
        return session?.token || null;
    } catch  {
        return null;
    }
}
function isAuthenticated() {
    return getCurrentUser() !== null;
}
function getUserRole() {
    const user = getCurrentUser();
    return user?.role || null;
}
function getCurrentUserId() {
    const user = getCurrentUser();
    return user?._id || user?.id || user?.userId || null;
}
function getUserBranch() {
    const user = getCurrentUser();
    return user?.branchId || null;
}
function getUserBranchName() {
    const user = getCurrentUser();
    return user?.branchName || null;
}
function getUserLocations(user = getCurrentUser()) {
    if (!user) return [];
    if (Array.isArray(user.locationID) && user.locationID.length > 0) {
        return user.locationID.map((loc)=>typeof loc === 'string' ? {
                _id: loc,
                name: null
            } : {
                _id: loc._id,
                name: loc.name || null
            });
    }
    if (user.branchId) {
        return [
            {
                _id: user.branchId,
                name: user.branchName || null
            }
        ];
    }
    return [];
}
function getSelectedBranch() {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    return localStorage.getItem('crm_selected_branch');
}
function setSelectedBranch(branchId, { silent = false } = {}) {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    if (branchId) {
        localStorage.setItem('crm_selected_branch', branchId);
    } else {
        localStorage.removeItem('crm_selected_branch');
    }
    if (silent) return;
    window.dispatchEvent(new CustomEvent('branch-change', {
        detail: {
            branchId
        }
    }));
}
function getEffectiveBranch() {
    const user = getCurrentUser();
    if (!user) return null;
    if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isRole"])(user.role, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ROLES"].SUPER_ADMIN)) {
        return getSelectedBranch() // Can be null for "All Branches"
        ;
    }
    const locations = getUserLocations(user);
    if (locations.length > 1) {
        const selected = getSelectedBranch();
        if (selected && locations.some((loc)=>loc._id === selected)) {
            return selected;
        }
        return locations[0]._id;
    }
    return locations[0]?._id || user.branchId || null;
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/lib/constants.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// User Roles
__turbopack_context__.s([
    "APPOINTMENT_TYPES",
    ()=>APPOINTMENT_TYPES,
    "BRANCH_STATUS",
    ()=>BRANCH_STATUS,
    "CHANNELS",
    ()=>CHANNELS,
    "CONTACT_TYPES",
    ()=>CONTACT_TYPES,
    "LEAD_HEALTH",
    ()=>LEAD_HEALTH,
    "LEAD_STATUS",
    ()=>LEAD_STATUS,
    "PUBLIC_ROUTES",
    ()=>PUBLIC_ROUTES,
    "ROLES",
    ()=>ROLES,
    "ROUTE_ACCESS",
    ()=>ROUTE_ACCESS,
    "ROUTE_PERMISSIONS",
    ()=>ROUTE_PERMISSIONS,
    "isRole",
    ()=>isRole,
    "normalizeRole",
    ()=>normalizeRole
]);
const ROLES = {
    SUPER_ADMIN: 'superadmin',
    ADMIN: 'admin',
    STAFF: 'staff'
};
function normalizeRole(role) {
    return typeof role === 'string' ? role.trim().toLowerCase().replace(/[\s_-]/g, '') : '';
}
function isRole(role, target) {
    return normalizeRole(role) === normalizeRole(target);
}
const PUBLIC_ROUTES = [
    '/auth/login',
    '/auth/register',
    '/auth/forgot-password',
    '/auth/reset-password',
    '/pay',
    '/sign-contract',
    '/unsubscribe',
    '/no-access'
];
const ROUTE_ACCESS = {
    '/': [
        ROLES.SUPER_ADMIN,
        ROLES.ADMIN
    ],
    '/dashboard': [
        ROLES.SUPER_ADMIN,
        ROLES.ADMIN
    ],
    '/inbox': [
        ROLES.SUPER_ADMIN,
        ROLES.ADMIN,
        ROLES.STAFF
    ],
    '/inbox/all-messages': [
        ROLES.SUPER_ADMIN,
        ROLES.ADMIN,
        ROLES.STAFF
    ],
    '/inbox/human-queue': [
        ROLES.SUPER_ADMIN,
        ROLES.ADMIN,
        ROLES.STAFF
    ],
    '/inbox/calls': [
        ROLES.SUPER_ADMIN,
        ROLES.ADMIN,
        ROLES.STAFF
    ],
    '/inbox/talk-to-assistant': [
        ROLES.SUPER_ADMIN,
        ROLES.ADMIN,
        ROLES.STAFF
    ],
    '/leads': [
        ROLES.SUPER_ADMIN,
        ROLES.ADMIN
    ],
    '/calendar': [
        ROLES.SUPER_ADMIN,
        ROLES.ADMIN,
        ROLES.STAFF
    ],
    '/reports': [
        ROLES.SUPER_ADMIN,
        ROLES.ADMIN
    ],
    '/marketing/form-builder': [
        ROLES.SUPER_ADMIN,
        ROLES.ADMIN
    ],
    '/marketing/campaigns': [
        ROLES.SUPER_ADMIN,
        ROLES.ADMIN
    ],
    '/marketing/email-builder': [
        ROLES.SUPER_ADMIN,
        ROLES.ADMIN
    ],
    '/marketing/text-email': [
        ROLES.SUPER_ADMIN,
        ROLES.ADMIN
    ],
    '/marketing/unsubscribed': [
        ROLES.SUPER_ADMIN,
        ROLES.ADMIN
    ],
    '/marketing/sms-builder': [
        ROLES.SUPER_ADMIN,
        ROLES.ADMIN
    ],
    '/ai-automation/make-calls': [
        ROLES.SUPER_ADMIN,
        ROLES.ADMIN
    ],
    '/ai-automation/ai-calling': [
        ROLES.SUPER_ADMIN,
        ROLES.ADMIN
    ],
    '/ai-automation/ai-messaging': [
        ROLES.SUPER_ADMIN,
        ROLES.ADMIN
    ],
    '/ai-automation/followup-settings': [
        ROLES.SUPER_ADMIN,
        ROLES.ADMIN
    ],
    '/ai-automation/workflows': [
        ROLES.SUPER_ADMIN,
        ROLES.ADMIN
    ],
    '/workflow': [
        ROLES.SUPER_ADMIN,
        ROLES.ADMIN
    ],
    '/ai-automation/dynamic-lists': [
        ROLES.SUPER_ADMIN,
        ROLES.ADMIN
    ],
    '/dynamic-list': [
        ROLES.SUPER_ADMIN,
        ROLES.ADMIN
    ],
    '/ai-automation/ai-calling-data': [
        ROLES.SUPER_ADMIN,
        ROLES.ADMIN
    ],
    '/ai-automation/training': [
        ROLES.SUPER_ADMIN,
        ROLES.ADMIN
    ],
    '/ai-automation/rag': [
        ROLES.SUPER_ADMIN,
        ROLES.ADMIN
    ],
    '/settings': [
        ROLES.SUPER_ADMIN,
        ROLES.ADMIN,
        ROLES.STAFF
    ],
    '/settings/studio': [
        ROLES.SUPER_ADMIN,
        ROLES.ADMIN,
        ROLES.STAFF
    ],
    // Personal preferences — every role manages their own.
    '/settings/notifications': [
        ROLES.SUPER_ADMIN,
        ROLES.ADMIN,
        ROLES.STAFF
    ],
    '/settings/users-roles': [
        ROLES.SUPER_ADMIN,
        ROLES.ADMIN
    ],
    '/settings/users-roles/users': [
        ROLES.SUPER_ADMIN,
        ROLES.ADMIN
    ],
    '/settings/users-roles/roles': [
        ROLES.SUPER_ADMIN,
        ROLES.ADMIN
    ],
    '/settings/users-roles/teachers': [
        ROLES.SUPER_ADMIN,
        ROLES.ADMIN
    ],
    '/settings/users-roles/ai-booking-priority': [
        ROLES.SUPER_ADMIN,
        ROLES.ADMIN
    ],
    '/settings/integrations': [
        ROLES.SUPER_ADMIN,
        ROLES.ADMIN
    ],
    '/settings/phone': [
        ROLES.SUPER_ADMIN,
        ROLES.ADMIN
    ],
    '/settings/billing': [
        ROLES.SUPER_ADMIN,
        ROLES.ADMIN
    ],
    '/settings/payments': [
        ROLES.SUPER_ADMIN,
        ROLES.ADMIN
    ],
    '/settings/activity-log': [
        ROLES.SUPER_ADMIN,
        ROLES.ADMIN
    ],
    '/settings/curriculum': [
        ROLES.SUPER_ADMIN,
        ROLES.ADMIN
    ],
    '/settings/goals': [
        ROLES.SUPER_ADMIN,
        ROLES.ADMIN
    ],
    '/settings/documents': [
        ROLES.SUPER_ADMIN,
        ROLES.ADMIN
    ]
};
const ROUTE_PERMISSIONS = {
    // `module` is an array here because the dashboard page is visible if the
    // user can see ANY of its widgets — there's no single blanket dashboard
    // permission anymore (see PERMISSION in components/dashboard/widgets/registry.js
    // and components/owner-dashboard/widgets/registry.js). canAccessRoute treats
    // an array as "read on any of these modules passes".
    '/dashboard': {
        category: 'dashboard',
        module: [
            'leadConversion',
            'AiAnalytics',
            'OwnerOverviewStudentHealth',
            'OwnerOverviewRevenue',
            'OwnerOverviewLessons',
            'OwnerOverviewFunnel',
            'OwnerOverviewMarketing',
            'goals'
        ]
    },
    '/leads': {
        category: 'leads',
        module: 'manage'
    },
    '/calendar': {
        category: 'calendar',
        module: 'bookings'
    },
    '/calendar/group-classes': {
        category: 'calendar',
        module: 'lessons'
    },
    '/marketing/form-builder': {
        category: 'marketing',
        module: 'forms'
    },
    '/marketing/campaigns': {
        category: 'marketing',
        module: 'campaigns'
    },
    '/marketing/email-builder': {
        category: 'marketing',
        module: 'emails'
    },
    '/marketing/text-email': {
        category: 'marketing',
        module: 'emails'
    },
    '/marketing/unsubscribed': {
        category: 'marketing',
        module: 'emails'
    },
    '/marketing/sms-builder': {
        category: 'marketing',
        module: 'sms'
    },
    '/ai-automation/make-calls': {
        category: 'AiAndAutomation',
        module: 'aiCalling'
    },
    '/ai-automation/ai-calling': {
        category: 'AiAndAutomation',
        module: 'aiCalling'
    },
    '/ai-automation/ai-calling-data': {
        category: 'AiAndAutomation',
        module: 'aiCalling'
    },
    '/ai-automation/ai-messaging': {
        category: 'AiAndAutomation',
        module: 'assistants'
    },
    '/ai-automation/followup-settings': {
        category: 'AiAndAutomation',
        module: 'assistants'
    },
    '/ai-automation/workflows': {
        category: 'AiAndAutomation',
        module: 'workflows'
    },
    '/workflow': {
        category: 'AiAndAutomation',
        module: 'workflows'
    },
    '/ai-automation/training': {
        category: 'AiAndAutomation',
        module: 'training'
    },
    '/ai-automation/rag': {
        category: 'AiAndAutomation',
        module: 'training'
    },
    '/ai-automation/ai-reply-reviews': {
        category: 'AiAndAutomation',
        module: 'training'
    },
    '/ai-automation/dynamic-lists': {
        category: 'AiAndAutomation',
        module: 'dynamicLists'
    },
    '/dynamic-list': {
        category: 'AiAndAutomation',
        module: 'dynamicLists'
    },
    '/ai-automation/lead-statuses': {
        category: 'AiAndAutomation',
        module: 'leadStatuses'
    },
    '/inbox': {
        category: 'inbox',
        module: 'AllMessages'
    },
    '/inbox/all-messages': {
        category: 'inbox',
        module: 'AllMessages'
    },
    '/inbox/human-queue': {
        category: 'inbox',
        module: 'CallCenter'
    },
    '/reports': {
        category: 'reports',
        module: 'overview'
    },
    '/reports/teacher-commissions': {
        category: 'reports',
        module: 'teacherCommissions'
    },
    '/reports/callbacks': {
        category: 'reports',
        module: 'overview'
    },
    // The studio page *manages* locations (add/rename/delete) — it is not the
    // branch switcher, which reads GET /api/location directly and stays open to
    // every authenticated user. Leaving this ungated made it the one page every
    // role could reach, complete with Add and Delete Location buttons.
    '/settings/studio': {
        category: 'settings',
        module: 'locations'
    },
    '/settings/users-roles': {
        category: 'settings',
        module: 'users'
    },
    '/settings/users-roles/users': {
        category: 'settings',
        module: 'users'
    },
    '/settings/users-roles/roles': {
        category: 'settings',
        module: 'roles'
    },
    '/settings/users-roles/teachers': {
        category: 'calendar',
        module: 'teachers'
    },
    // Backend guards this route on calendar.teachers write/edit (or settings.users
    // write/edit) — see canManageAiBookingPriority in teachers.routes.js.
    '/settings/users-roles/ai-booking-priority': {
        category: 'calendar',
        module: 'teachers',
        action: 'write'
    },
    // Customers live under this path but are gated by their own permission, not
    // settings.users. Prefix matching in canAccessRoute extends this to the
    // detail route (/settings/users-roles/customers/:id) too.
    '/settings/users-roles/customers': {
        category: 'customers',
        module: 'manage'
    },
    '/settings/setup': {
        category: 'settings',
        module: 'setup'
    },
    '/settings/integrations': {
        category: 'settings',
        module: 'integration'
    },
    '/settings/phone': {
        category: 'settings',
        module: 'integration'
    },
    '/settings/billing': {
        category: 'settings',
        module: 'Billings'
    },
    '/settings/payments': {
        category: 'settings',
        module: 'payments'
    },
    '/settings/activity-log': {
        category: 'settings',
        module: 'activityLog'
    },
    '/settings/curriculum': {
        category: 'calendar',
        module: 'curriculum'
    },
    '/settings/documents': {
        category: 'settings',
        module: 'documents'
    },
    // `dashboard.goals` read is what shows the read-only Goals *widget*. Gating
    // this page on read too meant handing anyone with that tile the ability to
    // rewrite the studio's revenue and student targets. Require write instead.
    '/settings/goals': {
        category: 'dashboard',
        module: 'goals',
        action: 'write'
    }
};
const LEAD_STATUS = {
    NEW: 'New',
    CONTACTED: 'Contacted',
    QUALIFIED: 'Qualified',
    PROPOSAL: 'Proposal',
    NEGOTIATION: 'Negotiation'
};
const LEAD_HEALTH = {
    COLD: 'Cold',
    CONTACTED: 'Contacted',
    CONVERTED: 'Converted'
};
const APPOINTMENT_TYPES = {
    CALL: 'Call',
    MEETING: 'Meeting',
    DEMO: 'Demo',
    FOLLOW_UP: 'Follow-up'
};
const CONTACT_TYPES = {
    ALL: 'All',
    CUSTOMERS: 'Customers',
    LEADS: 'Leads',
    TEACHERS: 'Teachers'
};
const CHANNELS = {
    ALL: 'All',
    EMAIL: 'Email',
    SMS: 'SMS',
    CALL: 'Call'
};
const BRANCH_STATUS = {
    ACTIVE: 'active',
    INACTIVE: 'inactive'
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/lib/hooks/useAnalyticsOverview.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "analyticsSwrConfig",
    ()=>analyticsSwrConfig,
    "rangeQuery",
    ()=>rangeQuery,
    "useDashboardLayout",
    ()=>useDashboardLayout,
    "useDashboardOverview",
    ()=>useDashboardOverview,
    "useDashboardOverviewDetails",
    ()=>useDashboardOverviewDetails,
    "useOwnerDashboardOverview",
    ()=>useOwnerDashboardOverview,
    "useOwnerOverviewDetails",
    ()=>useOwnerOverviewDetails,
    "useReportsOverview",
    ()=>useReportsOverview
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$swr$2f$dist$2f$index$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/swr/dist/index/index.mjs [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/api.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/auth.js [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature(), _s2 = __turbopack_context__.k.signature(), _s3 = __turbopack_context__.k.signature(), _s4 = __turbopack_context__.k.signature(), _s5 = __turbopack_context__.k.signature(), _s6 = __turbopack_context__.k.signature();
'use client';
;
;
;
const analyticsSwrConfig = {
    revalidateOnFocus: false,
    revalidateOnReconnect: true,
    dedupingInterval: 60_000,
    keepPreviousData: true,
    errorRetryCount: 2
};
const DATE_ONLY = /^\d{4}-\d{2}-\d{2}$/;
function rangeQuery(range) {
    if (range && typeof range === 'object') {
        if (range.period) {
            const params = new URLSearchParams({
                period: range.period
            });
            if (range.offsetDays) params.set('offsetDays', String(range.offsetDays));
            if (range.offsetYears) params.set('offsetYears', String(range.offsetYears));
            return params.toString();
        }
        if (DATE_ONLY.test(range.from) && DATE_ONLY.test(range.to)) {
            return new URLSearchParams({
                fromDate: range.from,
                toDate: range.to
            }).toString();
        }
        return new URLSearchParams({
            from: new Date(range.from).toISOString(),
            to: new Date(range.to).toISOString()
        }).toString();
    }
    if (range === 0) return new URLSearchParams({
        period: 'today'
    }).toString();
    const to = new Date();
    const from = new Date(to.getTime() - range * 24 * 60 * 60 * 1000);
    return new URLSearchParams({
        from: from.toISOString(),
        to: to.toISOString()
    }).toString();
}
async function fetchOverview(path) {
    const res = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].get(path);
    if (!res.success) throw new Error(res.error || 'Request failed');
    return res.data ?? {};
}
async function fetchLayout([, page]) {
    const res = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].get(`/api/dashboard-layout?page=${page}`);
    if (!res.success) throw new Error(res.error || 'Failed to load layout');
    return Array.isArray(res.data) ? res.data : [];
}
function branchKey() {
    return ("TURBOPACK compile-time truthy", 1) ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getEffectiveBranch"])() || 'all' : "TURBOPACK unreachable";
}
function useDashboardOverview(range, { enabled = true } = {}) {
    _s();
    const key = enabled ? [
        'dashboard-overview',
        range,
        branchKey()
    ] : null;
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$swr$2f$dist$2f$index$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"])(key, {
        "useDashboardOverview.useSWR": ([, r])=>fetchOverview(`/api/dashboard/overview?${rangeQuery(r)}`)
    }["useDashboardOverview.useSWR"], analyticsSwrConfig);
}
_s(useDashboardOverview, "7xERTuQa/rCStZtEZdi0LgBAmUk=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$swr$2f$dist$2f$index$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"]
    ];
});
function useReportsOverview(range, { enabled = true } = {}) {
    _s1();
    const key = enabled ? [
        'reports-overview',
        range,
        branchKey()
    ] : null;
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$swr$2f$dist$2f$index$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"])(key, {
        "useReportsOverview.useSWR": ([, r])=>fetchOverview(`/api/reports/overview?${rangeQuery(r)}`)
    }["useReportsOverview.useSWR"], analyticsSwrConfig);
}
_s1(useReportsOverview, "7xERTuQa/rCStZtEZdi0LgBAmUk=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$swr$2f$dist$2f$index$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"]
    ];
});
function useOwnerDashboardOverview(rangeDays, { enabled = true } = {}) {
    _s2();
    const key = enabled ? [
        'owner-dashboard-overview',
        rangeDays,
        branchKey()
    ] : null;
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$swr$2f$dist$2f$index$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"])(key, {
        "useOwnerDashboardOverview.useSWR": ([, days])=>fetchOverview(`/api/dashboard/owner-overview?${rangeQuery(days)}`)
    }["useOwnerDashboardOverview.useSWR"], analyticsSwrConfig);
}
_s2(useOwnerDashboardOverview, "7xERTuQa/rCStZtEZdi0LgBAmUk=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$swr$2f$dist$2f$index$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"]
    ];
});
/**
 * Shared shape behind every "Show full details" drill-down button — only
 * differs by which overview's detail endpoint it hits. `params` carries the
 * widget's own drill dimensions (locationID, teacherID, stageGroup, channel,
 * etc.) on top of the shared date range — only fetches once `enabled` (i.e.
 * the details modal is actually open).
 */ function useOverviewDetails(cacheKey, endpoint, { metric, range, page = 1, limit = 25, params = {}, enabled = true }) {
    _s3();
    const key = enabled && metric ? [
        cacheKey,
        metric,
        range,
        page,
        limit,
        params,
        branchKey()
    ] : null;
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$swr$2f$dist$2f$index$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"])(key, {
        "useOverviewDetails.useSWR": ([, m, r, p, l, extra])=>{
            const qs = new URLSearchParams(rangeQuery(r));
            qs.set('metric', m);
            qs.set('page', String(p));
            qs.set('limit', String(l));
            for (const [k, v] of Object.entries(extra || {})){
                if (v !== undefined && v !== null && v !== '') qs.set(k, v);
            }
            return fetchOverview(`${endpoint}?${qs.toString()}`);
        }
    }["useOverviewDetails.useSWR"], analyticsSwrConfig);
}
_s3(useOverviewDetails, "7xERTuQa/rCStZtEZdi0LgBAmUk=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$swr$2f$dist$2f$index$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"]
    ];
});
function useOwnerOverviewDetails(opts) {
    _s4();
    return useOverviewDetails('owner-overview-details', '/api/dashboard/owner-overview/details', opts);
}
_s4(useOwnerOverviewDetails, "CbupdzS2b/DL1q1yWwbWaJB0WvA=", false, function() {
    return [
        useOverviewDetails
    ];
});
function useDashboardOverviewDetails(opts) {
    _s5();
    return useOverviewDetails('dashboard-overview-details', '/api/dashboard/overview/details', opts);
}
_s5(useDashboardOverviewDetails, "CbupdzS2b/DL1q1yWwbWaJB0WvA=", false, function() {
    return [
        useOverviewDetails
    ];
});
function useDashboardLayout(page, { enabled = true } = {}) {
    _s6();
    const key = enabled && page ? [
        'dashboard-layout',
        page,
        branchKey()
    ] : null;
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$swr$2f$dist$2f$index$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"])(key, fetchLayout, {
        ...analyticsSwrConfig,
        // Layout rarely changes from the server after first load; keep it sticky.
        revalidateIfStale: false,
        revalidateOnReconnect: false
    });
}
_s6(useDashboardLayout, "7xERTuQa/rCStZtEZdi0LgBAmUk=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$swr$2f$dist$2f$index$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"]
    ];
});
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/lib/hooks/useStudioTimezone.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__,
    "loadCachedStudioTimezone",
    ()=>loadCachedStudioTimezone,
    "resolveStudioTimezone",
    ()=>resolveStudioTimezone,
    "useStudioTimezone",
    ()=>useStudioTimezone
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/api.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/auth.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$studioTimezone$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/studioTimezone.js [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
/**
 * IANA timezone of the active studio location.
 *
 * Lesson times are UTC instants; rendering them without this shows the viewer's browser
 * zone instead of the studio's, so the same booking reads differently in New York and
 * Los Angeles. The active branch is sent via the x-location-id header, so the first
 * location returned belongs to the branch the user is currently working in.
 *
 * Resolved once per page load (switching branch reloads the page) and shared through
 * lib/studioTimezone, which the plain date helpers read. The last value per branch is
 * kept in localStorage so later loads have it before the first render.
 */ let resolved = false;
let inFlight = null;
const storageKey = ()=>`crm_studio_tz:${(0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getEffectiveBranch"])() || 'all'}`;
function loadCachedStudioTimezone() {
    try {
        const tz = localStorage.getItem(storageKey());
        if (tz) (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$studioTimezone$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["setStudioTimezone"])(tz);
        return tz;
    } catch  {
        return null;
    }
}
function resolveStudioTimezone() {
    if (resolved) return Promise.resolve((0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$studioTimezone$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getStudioTimezone"])());
    if (inFlight) return inFlight;
    inFlight = __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].get('/api/location?limit=50').then((res)=>{
        const list = Array.isArray(res?.data) ? res.data : [];
        const tz = list.find((l)=>l?.timezone)?.timezone || list[0]?.timezone || null;
        if (tz) {
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$studioTimezone$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["setStudioTimezone"])(tz);
            try {
                localStorage.setItem(storageKey(), tz);
            } catch  {
            // Storage blocked — it is fetched again next load.
            }
        }
        resolved = true;
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$studioTimezone$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getStudioTimezone"])();
    }).catch(()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$studioTimezone$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getStudioTimezone"])()).finally(()=>{
        inFlight = null;
    });
    return inFlight;
}
function useStudioTimezone(preferred = null) {
    _s();
    const [timezone, setTimezone] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(preferred || (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$studioTimezone$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getStudioTimezone"])());
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useStudioTimezone.useEffect": ()=>{
            if (preferred) {
                setTimezone(preferred);
                return;
            }
            let active = true;
            resolveStudioTimezone().then({
                "useStudioTimezone.useEffect": (tz)=>{
                    if (active && tz) setTimezone(tz);
                }
            }["useStudioTimezone.useEffect"]);
            return ({
                "useStudioTimezone.useEffect": ()=>{
                    active = false;
                }
            })["useStudioTimezone.useEffect"];
        }
    }["useStudioTimezone.useEffect"], [
        preferred
    ]);
    return timezone;
}
_s(useStudioTimezone, "BU3vlk8nIgpnKHRUHKqcVnJSb48=");
const __TURBOPACK__default__export__ = useStudioTimezone;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/lib/notificationPreferences.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ALL_KEYS",
    ()=>ALL_KEYS,
    "MASTER_KEY",
    ()=>MASTER_KEY,
    "NOTIFICATION_GROUPS",
    ()=>NOTIFICATION_GROUPS,
    "cacheNotificationPreferences",
    ()=>cacheNotificationPreferences,
    "getNotificationPreferences",
    ()=>getNotificationPreferences,
    "isNotificationEnabled",
    ()=>isNotificationEnabled,
    "resolvePreferences",
    ()=>resolvePreferences
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/auth.js [app-client] (ecmascript)");
;
const MASTER_KEY = 'all';
const NOTIFICATION_GROUPS = [
    {
        id: 'popups',
        title: 'Pop-up messages',
        description: 'Short messages that appear after you save, send or change something.',
        items: [
            {
                key: 'toast.success',
                label: 'Confirmations',
                description: 'Saved, sent, created and other success messages.'
            },
            {
                key: 'toast.error',
                label: 'Errors and warnings',
                description: 'Messages that tell you something failed.',
                offWarning: 'With this off, a failed save or send will not show any message.'
            }
        ]
    },
    {
        id: 'humanQueue',
        title: 'Human queue',
        description: 'When the AI hands a lead to your team.',
        items: [
            {
                key: 'humanQueue.sound',
                label: 'Sound when a lead is waiting',
                description: 'A repeating ring anywhere in the app when a lead is waiting and you are online for calls.',
                preview: 'sound'
            }
        ]
    },
    {
        id: 'dashboard',
        title: 'Dashboard',
        description: 'Alerts shown on your dashboard.',
        items: [
            {
                key: 'dashboard.urgentBanner',
                label: 'Urgent intervention banner',
                description: 'The red Human Intervention Required banner at the top.'
            }
        ]
    },
    {
        id: 'reminders',
        title: 'Reminders',
        description: 'Nudges about work that needs you.',
        items: [
            {
                key: 'tasks.badge',
                label: 'New task indicator',
                description: 'The red dot on Upcoming Tasks in the sidebar when something new is due.'
            }
        ]
    }
];
const ALL_KEYS = [
    MASTER_KEY,
    ...NOTIFICATION_GROUPS.flatMap((g)=>g.items.map((i)=>i.key))
];
function resolvePreferences(stored) {
    const prefs = {};
    for (const key of ALL_KEYS)prefs[key] = stored?.[key] !== false;
    return prefs;
}
function getNotificationPreferences() {
    return resolvePreferences((0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getCurrentUser"])()?.notificationPreferences);
}
function isNotificationEnabled(key) {
    const prefs = getNotificationPreferences();
    return prefs[MASTER_KEY] && prefs[key] !== false;
}
function cacheNotificationPreferences(stored) {
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["updateSessionUser"])({
        notificationPreferences: stored
    });
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/lib/studioTimezone.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getStudioTimezone",
    ()=>getStudioTimezone,
    "setStudioTimezone",
    ()=>setStudioTimezone
]);
/**
 * The active studio's IANA timezone, read by the shared date helpers (formatDate,
 * todayDateInput, dateInputToISO, …) so every date reads as the studio's calendar
 * rather than the viewer's — staff in India working a US studio must see the US date.
 *
 * Resolved before any page mounts by StudioTimezoneGate (see useStudioTimezone). Null
 * until then, or when it can't be resolved; the helpers then fall back to the browser's zone.
 */ let studioTimezone = null;
function getStudioTimezone() {
    return studioTimezone;
}
function setStudioTimezone(tz) {
    studioTimezone = tz || null;
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/lib/terminalCharge.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "TERMINAL_CHARGE_SETTLED_EVENT",
    ()=>TERMINAL_CHARGE_SETTLED_EVENT,
    "subscribeTerminalCharges",
    ()=>subscribeTerminalCharges,
    "trackPendingReaderCharge",
    ()=>trackPendingReaderCharge,
    "trackTerminalCharge",
    ()=>trackTerminalCharge,
    "untrackTerminalCharge",
    ()=>untrackTerminalCharge
]);
// Tiny store for card-reader (Stripe Terminal) charges that are still waiting on the
// customer. A reader charge is async: POST /api/payment returns a pending Payment and
// the dialog that started it closes straight away, so without this there is nowhere
// left to press "Cancel" while the customer is standing at the reader.
//
// Callers just do `trackTerminalCharge(res.data.payment)`; <TerminalChargeTracker />
// (mounted once in Providers) renders, polls and cancels.
let charges = [];
const listeners = new Set();
function emit() {
    for (const l of listeners)l(charges);
}
function subscribeTerminalCharges(listener) {
    listeners.add(listener);
    listener(charges);
    return ()=>listeners.delete(listener);
}
function trackTerminalCharge(payment, { label } = {}) {
    const id = payment?._id;
    if (!id || charges.some((c)=>c.id === id)) return;
    charges = [
        ...charges,
        {
            id,
            amount: Number(payment.amount) || 0,
            label: label || null
        }
    ];
    emit();
}
function trackPendingReaderCharge(data) {
    const p = data?.terminalPayment || (data?.pending ? data.payment : null);
    if (p?.method === 'terminal' && p?.status === 'pending') trackTerminalCharge(p);
}
function untrackTerminalCharge(id) {
    if (!charges.some((c)=>c.id === id)) return;
    charges = charges.filter((c)=>c.id !== id);
    emit();
}
const TERMINAL_CHARGE_SETTLED_EVENT = 'terminal-charge-settled';
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=_176v7dpjc9il-._.js.map