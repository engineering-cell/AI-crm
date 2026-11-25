(globalThis["TURBOPACK"] || (globalThis["TURBOPACK"] = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/app/calendar/components/NewEnrollmentPackageInline.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>NewEnrollmentPackageInline,
    "enrollmentLinkTarget",
    ()=>enrollmentLinkTarget
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDown$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/chevron-down.js [app-client] (ecmascript) <export default as ChevronDown>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/plus.js [app-client] (ecmascript) <export default as Plus>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trash$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Trash2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/trash-2.js [app-client] (ecmascript) <export default as Trash2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/api.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/utils.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$settings$2f$payments$2f$useCardProcessor$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/settings/payments/useCardProcessor.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$clover$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/clover.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$toast$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/toast.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$searchable$2d$select$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/searchable-select.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$paymentMethods$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/paymentMethods.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$payments$2f$WalletShortfallField$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/payments/WalletShortfallField.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$payments$2f$SendPaymentLinkMenu$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/payments/SendPaymentLinkMenu.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$payments$2f$TerminalDeviceField$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/payments/TerminalDeviceField.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$payments$2f$SavedCardField$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/payments/SavedCardField.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$payments$2f$CheckNumberField$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/payments/CheckNumberField.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$payments$2f$PaymentMethodPicker$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/payments/PaymentMethodPicker.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
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
function todayISO() {
    const d = new Date();
    const offset = d.getTimezoneOffset();
    return new Date(d.getTime() - offset * 60 * 1000).toISOString().slice(0, 10);
}
function enrollmentLinkTarget(payload, enrollmentID, paymentPlan) {
    if (payload.billingType === "payment_plan") {
        const installmentIndex = (paymentPlan?.installments || []).findIndex((i)=>i.status === "pending");
        return installmentIndex === -1 ? null : {
            kind: "installment",
            paymentPlanID: paymentPlan._id,
            installmentIndex
        };
    }
    if (payload.billingType === "flexible") {
        return {
            kind: "package",
            enrollmentID,
            amount: Number(payload.billing?.initialAmount) || 0
        };
    }
    return {
        kind: "package",
        enrollmentID
    };
}
// A date input's "2026-10-08" parses as UTC midnight; formatDate reads that as the
// calendar day, where local formatting showed the day before west of UTC.
function fmtDate(iso) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatDate"])(iso) || "—";
}
// Selling loose services is meant to be a two-field job, so the validity isn't
// asked for: every service enrollment gets a year. Staff holding
// calendar.enrollment write can change it afterwards from the customer's
// profile (Enrollments → Extend).
const SERVICE_ONLY_EXPIRY_DAYS = 365;
// Loose services bill either in full now or against an open balance — the
// installment-scheduling types belong to packages.
const SERVICE_ONLY_BILLING_TYPES = [
    "one_time",
    "flexible"
];
const BLANK_FORM = {
    teacherID: "",
    label: "",
    packageID: "",
    purchaseDate: todayISO(),
    expiryDays: "",
    services: [],
    billingType: "one_time",
    billing: {
        method: "cash",
        numberOfInstallments: 3,
        frequency: "monthly",
        startDate: "",
        installmentMode: "count",
        installmentAmount: "",
        initialAmount: "0",
        initialDate: todayISO(),
        futurePayments: [
            {
                _key: "fp-0",
                amount: "",
                dueDate: ""
            }
        ],
        collectNow: true,
        collectAmount: "",
        collectDate: todayISO(),
        sendLinkChannel: "email",
        // Wallet is a payment method: walletAmount is what it pays ("" = all it can), and
        // shortfallMethod collects whatever it does not cover.
        walletAmount: "",
        shortfallMethod: "cash"
    },
    tip: {
        enabled: false,
        amount: "",
        method: "cash"
    }
};
function blankService() {
    return {
        _key: String(Date.now() + Math.random()),
        serviceCode: "",
        serviceName: "",
        color: "#6366f1",
        numberOfSessions: 0,
        pricePerSession: 0,
        discountType: "none",
        discountAmount: 0,
        finalAmount: 0
    };
}
function calcFinalAmount(svc) {
    const gross = Number(svc.numberOfSessions || 0) * Number(svc.pricePerSession || 0);
    const amt = Number(svc.discountAmount || 0);
    if (svc.discountType === "percentage") return Math.max(0, gross - gross * amt / 100);
    if (svc.discountType === "fixed") return Math.max(0, gross - amt);
    return gross;
}
// ─── Service picker dropdown ───────────────────────────────────────────────────
function ServicePicker({ catalogServices, onSelect }) {
    _s();
    const [open, setOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [query, setQuery] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const ref = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ServicePicker.useEffect": ()=>{
            if (!open) return;
            const handler = {
                "ServicePicker.useEffect.handler": (e)=>{
                    if (ref.current && !ref.current.contains(e.target)) {
                        setOpen(false);
                        setQuery("");
                    }
                }
            }["ServicePicker.useEffect.handler"];
            document.addEventListener("mousedown", handler);
            return ({
                "ServicePicker.useEffect": ()=>document.removeEventListener("mousedown", handler)
            })["ServicePicker.useEffect"];
        }
    }["ServicePicker.useEffect"], [
        open
    ]);
    const filtered = query.trim() ? catalogServices.filter((s)=>(s.serviceName || s.serviceCode || "").toLowerCase().includes(query.toLowerCase())) : catalogServices;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        ref: ref,
        className: "relative",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                type: "button",
                onClick: ()=>setOpen((v)=>!v),
                className: "flex items-center gap-1 h-7 px-2 rounded border border-dashed border-border bg-background text-[11px] font-medium text-muted-foreground hover:text-foreground hover:border-primary transition-colors",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__["Plus"], {
                        className: "h-3 w-3"
                    }, void 0, false, {
                        fileName: "[project]/app/calendar/components/NewEnrollmentPackageInline.js",
                        lineNumber: 148,
                        columnNumber: 9
                    }, this),
                    " Add Service"
                ]
            }, void 0, true, {
                fileName: "[project]/app/calendar/components/NewEnrollmentPackageInline.js",
                lineNumber: 143,
                columnNumber: 7
            }, this),
            open && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute left-0 top-[calc(100%+4px)] z-50 w-56 rounded-xl border border-border bg-popover shadow-lg overflow-hidden",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "p-2 border-b border-border",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                            autoFocus: true,
                            type: "text",
                            value: query,
                            onChange: (e)=>setQuery(e.target.value),
                            placeholder: "Search catalog…",
                            className: "h-7 w-full rounded-md border border-border bg-muted/30 px-2.5 text-[11px] text-foreground outline-none focus:border-primary placeholder:text-muted-foreground/50"
                        }, void 0, false, {
                            fileName: "[project]/app/calendar/components/NewEnrollmentPackageInline.js",
                            lineNumber: 153,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/calendar/components/NewEnrollmentPackageInline.js",
                        lineNumber: 152,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "max-h-48 overflow-y-auto py-1",
                        children: [
                            filtered.map((s)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    type: "button",
                                    onClick: ()=>{
                                        onSelect(s);
                                        setOpen(false);
                                        setQuery("");
                                    },
                                    className: "w-full flex items-center gap-2 px-3 py-2 text-[12px] text-foreground hover:bg-muted/40 transition-colors",
                                    children: [
                                        s.color && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "h-2 w-2 rounded-full shrink-0",
                                            style: {
                                                background: s.color
                                            }
                                        }, void 0, false, {
                                            fileName: "[project]/app/calendar/components/NewEnrollmentPackageInline.js",
                                            lineNumber: 176,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "truncate",
                                            children: s.serviceName
                                        }, void 0, false, {
                                            fileName: "[project]/app/calendar/components/NewEnrollmentPackageInline.js",
                                            lineNumber: 181,
                                            columnNumber: 17
                                        }, this),
                                        s.serviceCode && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "ml-auto shrink-0 text-[10px] text-muted-foreground",
                                            children: s.serviceCode
                                        }, void 0, false, {
                                            fileName: "[project]/app/calendar/components/NewEnrollmentPackageInline.js",
                                            lineNumber: 183,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, String(s._id), true, {
                                    fileName: "[project]/app/calendar/components/NewEnrollmentPackageInline.js",
                                    lineNumber: 165,
                                    columnNumber: 15
                                }, this)),
                            filtered.length === 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "px-3 py-2 text-[11px] text-muted-foreground",
                                children: "No results"
                            }, void 0, false, {
                                fileName: "[project]/app/calendar/components/NewEnrollmentPackageInline.js",
                                lineNumber: 190,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/calendar/components/NewEnrollmentPackageInline.js",
                        lineNumber: 162,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/calendar/components/NewEnrollmentPackageInline.js",
                lineNumber: 151,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/calendar/components/NewEnrollmentPackageInline.js",
        lineNumber: 142,
        columnNumber: 5
    }, this);
}
_s(ServicePicker, "fh1y5qZ6UcpD5ZmWfywVbCnrjQw=");
_c = ServicePicker;
function NewEnrollmentPackageInline({ teacherOptions = [], packageTemplates = [], /** Sell loose services with no package template — hides the package selector. */ serviceOnly = false, /** When set, only package lines whose `serviceCode` is in this set are included. */ allowedServiceCodes, /** Student the package is being sold to — used to read wallet balance. */ customerID, /** Studio location for Clover readiness (customer location). */ locationID, onCancel, onSubmit }) {
    _s1();
    const [form, setForm] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        "NewEnrollmentPackageInline.useState": ()=>({
                ...BLANK_FORM,
                purchaseDate: todayISO()
            })
    }["NewEnrollmentPackageInline.useState"]);
    const [step, setStep] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(1);
    // Once staff edit the payment date by hand we stop steering it from the
    // schedule — until then it tracks the first installment's due date (or today).
    const [collectDateTouched, setCollectDateTouched] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [catalogServices, setCatalogServices] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [walletBalance, setWalletBalance] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [deviceID, setDeviceID] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [savedCardID, setSavedCardID] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [checkNumber, setCheckNumber] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    // Either processor being ready means a card payment can be taken; the backend
    // routes to whichever this location uses.
    const { ready: cardProcessorReady } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$settings$2f$payments$2f$useCardProcessor$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCardProcessor"])(locationID);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "NewEnrollmentPackageInline.useEffect": ()=>{
            __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].get("/api/calendar-service?limit=200").then({
                "NewEnrollmentPackageInline.useEffect": (res)=>{
                    if (res.success && Array.isArray(res.data)) setCatalogServices(res.data);
                }
            }["NewEnrollmentPackageInline.useEffect"]);
        }
    }["NewEnrollmentPackageInline.useEffect"], []);
    // Picking a package on the Packages tab adopts that package's billing type,
    // which may be one the Service tab doesn't offer. Switching tabs would then
    // leave an installment schedule active with no button to change it.
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "NewEnrollmentPackageInline.useEffect": ()=>{
            if (serviceOnly && !SERVICE_ONLY_BILLING_TYPES.includes(form.billingType)) {
                setForm({
                    "NewEnrollmentPackageInline.useEffect": (p)=>({
                            ...p,
                            billingType: "one_time"
                        })
                }["NewEnrollmentPackageInline.useEffect"]);
            }
        }
    }["NewEnrollmentPackageInline.useEffect"], [
        serviceOnly,
        form.billingType
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "NewEnrollmentPackageInline.useEffect": ()=>{
            if (!customerID) {
                setWalletBalance(null);
                return;
            }
            __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].get(`/api/wallet/${customerID}/balance`).then({
                "NewEnrollmentPackageInline.useEffect": (res)=>{
                    if (res.success) setWalletBalance(Number(res.data?.balance ?? 0));
                }
            }["NewEnrollmentPackageInline.useEffect"]);
        }
    }["NewEnrollmentPackageInline.useEffect"], [
        customerID
    ]);
    const selectedPkg = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "NewEnrollmentPackageInline.useMemo[selectedPkg]": ()=>packageTemplates.find({
                "NewEnrollmentPackageInline.useMemo[selectedPkg]": (p)=>String(p._id) === String(form.packageID)
            }["NewEnrollmentPackageInline.useMemo[selectedPkg]"])
    }["NewEnrollmentPackageInline.useMemo[selectedPkg]"], [
        packageTemplates,
        form.packageID
    ]);
    function handlePkgChange(pkgId) {
        const pkg = packageTemplates.find((p)=>String(p._id) === String(pkgId));
        const raw = pkg?.services || [];
        const filtered = allowedServiceCodes == null ? raw : raw.filter((s)=>allowedServiceCodes.has(s.serviceCode));
        setForm((prev)=>({
                ...prev,
                packageID: pkgId,
                billingType: pkg?.billingType || "one_time",
                services: filtered.map((s)=>{
                    const isChargeable = s.isChargeable ?? true;
                    const svc = {
                        _key: String(s._id || s.serviceCode || Math.random()),
                        serviceCode: s.serviceCode || "",
                        serviceName: s.serviceName || "",
                        color: s.color || "#6366f1",
                        numberOfSessions: Number(s.numberOfSessions || 0),
                        pricePerSession: isChargeable ? Number(s.pricePerSession || 0) : 0,
                        discountType: isChargeable ? s.discountType || "none" : "none",
                        discountAmount: isChargeable ? Number(s.discountAmount || 0) : 0,
                        isChargeable
                    };
                    return {
                        ...svc,
                        finalAmount: Number(calcFinalAmount(svc).toFixed(2))
                    };
                })
            }));
    }
    // One package is not a choice — preselect it so staff aren't made to pick the
    // only option, same reasoning as TerminalDeviceField preselecting a lone reader.
    // Runs only while nothing is chosen yet, so it never overrides a real pick, and
    // re-evaluates if the list itself changes (e.g. a service-code filter narrows
    // it down to exactly one after the customer/context loads).
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "NewEnrollmentPackageInline.useEffect": ()=>{
            if (serviceOnly || form.packageID) return;
            if (packageTemplates.length === 1) handlePkgChange(packageTemplates[0]._id);
        }
    }["NewEnrollmentPackageInline.useEffect"], [
        packageTemplates,
        serviceOnly,
        form.packageID
    ]);
    function updateSvc(key, field, value) {
        setForm((prev)=>{
            const services = prev.services.map((s)=>{
                if (s._key !== key) return s;
                const next = {
                    ...s,
                    [field]: value
                };
                next.finalAmount = Number(calcFinalAmount(next).toFixed(2));
                return next;
            });
            return {
                ...prev,
                services
            };
        });
    }
    function addService(catalogSvc) {
        const svc = catalogSvc ? {
            _key: String(Date.now() + Math.random()),
            serviceCode: catalogSvc.serviceCode || "",
            serviceName: catalogSvc.serviceName || "",
            color: catalogSvc.color || "#6366f1",
            // You are selling at least one session. Defaulting to 0 sold a $0
            // enrollment with no sessions, which no booking can ever draw from —
            // the booking panel filters on sessionsRemaining > 0, so the student
            // was pushed straight to the unallocated picker instead.
            numberOfSessions: 1,
            pricePerSession: catalogSvc.isChargeable !== false ? Number(catalogSvc.price || 0) : 0,
            discountType: "none",
            discountAmount: 0,
            finalAmount: 0,
            isChargeable: catalogSvc.isChargeable ?? true
        } : blankService();
        svc.finalAmount = Number(calcFinalAmount(svc).toFixed(2));
        setForm((prev)=>({
                ...prev,
                services: [
                    ...prev.services,
                    svc
                ]
            }));
    }
    function removeService(key) {
        setForm((prev)=>({
                ...prev,
                services: prev.services.filter((s)=>s._key !== key)
            }));
    }
    // Adding/removing a row (or changing the initial payment) changes how many
    // ways the remaining balance splits, so re-spread it evenly across all rows
    // rather than leaving a stray $0 box or a stale amount.
    function splitEvenly(rows, remaining) {
        const base = rows.length ? Math.floor(remaining / rows.length * 100) / 100 : 0;
        return rows.map((c, i)=>({
                ...c,
                amount: (i === rows.length - 1 ? Number((remaining - base * (rows.length - 1)).toFixed(2)) : base).toFixed(2)
            }));
    }
    function addFuturePayment() {
        setForm((prev)=>{
            const rows = [
                ...prev.billing.futurePayments,
                {
                    _key: String(Date.now() + Math.random()),
                    dueDate: "",
                    amount: ""
                }
            ];
            const remaining = total - Number(prev.billing.initialAmount || 0);
            return {
                ...prev,
                billing: {
                    ...prev.billing,
                    futurePayments: splitEvenly(rows, remaining)
                }
            };
        });
    }
    function updateFuturePayment(key, field, value) {
        setForm((prev)=>{
            const rows = prev.billing.futurePayments;
            if (field !== "amount") {
                return {
                    ...prev,
                    billing: {
                        ...prev.billing,
                        futurePayments: rows.map((c)=>c._key === key ? {
                                ...c,
                                [field]: value
                            } : c)
                    }
                };
            }
            // Editing one row's amount short-pays or over-pays it relative to what
            // was scheduled — spread the remaining balance evenly across the other
            // rows so the total always stays balanced, whichever row was touched.
            const remaining = total - Number(prev.billing.initialAmount || 0);
            const leftover = Math.max(0, remaining - (Number(value) || 0));
            const otherRows = rows.filter((c)=>c._key !== key);
            const splitOthers = splitEvenly(otherRows, leftover);
            const futurePayments = rows.map((c)=>c._key === key ? {
                    ...c,
                    amount: value
                } : splitOthers.find((o)=>o._key === c._key));
            return {
                ...prev,
                billing: {
                    ...prev.billing,
                    futurePayments
                }
            };
        });
    }
    function removeFuturePayment(key) {
        setForm((prev)=>{
            const rows = prev.billing.futurePayments.filter((c)=>c._key !== key);
            const remaining = total - Number(prev.billing.initialAmount || 0);
            return {
                ...prev,
                billing: {
                    ...prev.billing,
                    futurePayments: splitEvenly(rows, remaining)
                }
            };
        });
    }
    const total = form.services.reduce((sum, s)=>sum + (Number(s.finalAmount) || 0), 0);
    const totalDiscount = form.services.reduce((sum, s)=>{
        const gross = Number(s.numberOfSessions || 0) * Number(s.pricePerSession || 0);
        return sum + Math.max(0, gross - (Number(s.finalAmount) || 0));
    }, 0);
    const isLink = form.billing.method === __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$paymentMethods$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SHARE_LINK_METHOD"].value;
    // Wallet sits beside the other methods. It pays what staff set (all it can by default);
    // when it falls short, shortfallMethod collects the rest. Terminal is offered too —
    // this endpoint dispatches to the paired Clover/Stripe reader the same way
    // PaymentDueCard's balance payments do.
    const collectAmt = Number(form.billing.collectAmount || 0);
    const paysByWallet = form.billing.method === "wallet" && form.billing.collectNow && !isLink;
    const walletSplit = (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$payments$2f$WalletShortfallField$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["walletShortfall"])(walletBalance, collectAmt, form.billing.walletAmount);
    const walletApplied = paysByWallet ? walletSplit.walletApplied : 0;
    const walletRemaining = Math.max(0, collectAmt - walletApplied);
    const walletOver = paysByWallet && walletSplit.over;
    // The method that actually collects money; the wallet's share goes as walletAmount.
    const chargeMethod = form.billing.method === "wallet" ? walletRemaining > 0 ? form.billing.shortfallMethod : "cash" : form.billing.method;
    const collectMethodOptions = [
        ...__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$paymentMethods$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PAYMENT_METHODS_WITH_SAVED_CARD"],
        __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$paymentMethods$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SHARE_LINK_METHOD"]
    ];
    const chargeableServices = form.services.filter((s)=>s.isChargeable !== false);
    const installments = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "NewEnrollmentPackageInline.useMemo[installments]": ()=>{
            if (form.billingType !== "payment_plan") return [];
            const { installmentMode, numberOfInstallments, installmentAmount, frequency, startDate } = form.billing;
            if (!startDate) return [];
            let n, baseAmt;
            if (installmentMode === "amount") {
                const amt = Number(installmentAmount || 0);
                if (!amt || amt <= 0) return [];
                n = Math.ceil(total / amt);
                if (!n) return [];
                baseAmt = amt;
            } else {
                n = Number(numberOfInstallments || 0);
                if (!n) return [];
                baseAmt = Number((total / n).toFixed(2));
            }
            let d = new Date(startDate);
            const rows = [];
            for(let i = 0; i < n; i++){
                const isLast = i === n - 1;
                const amount = isLast ? Number((total - baseAmt * (n - 1)).toFixed(2)) : baseAmt;
                rows.push({
                    index: i + 1,
                    amount,
                    isLast,
                    date: fmtDate(d)
                });
                // UTC month step keeps d on UTC midnight, so fmtDate keeps reading the right day.
                if (frequency === "weekly") d = new Date(d.getTime() + 7 * 24 * 60 * 60 * 1000);
                else if (frequency === "biweekly") d = new Date(d.getTime() + 14 * 24 * 60 * 60 * 1000);
                else {
                    d = new Date(d);
                    d.setUTCMonth(d.getUTCMonth() + 1);
                }
            }
            return rows;
        }
    }["NewEnrollmentPackageInline.useMemo[installments]"], [
        form.billingType,
        form.billing.installmentMode,
        form.billing.numberOfInstallments,
        form.billing.installmentAmount,
        form.billing.frequency,
        form.billing.startDate,
        total
    ]);
    const futurePaymentsTotal = form.billing.futurePayments.reduce((sum, c)=>sum + (Number(c.amount) || 0), 0);
    const initialAmount = Number(form.billing.initialAmount || 0);
    // Must hit exactly $0 before staff can move on — anything else means the
    // balance isn't fully accounted for between the initial payment and the
    // future-payment rows.
    const amountLeftToSchedule = total - initialAmount - futurePaymentsTotal;
    const firstInstallmentAmount = installments[0]?.amount ?? 0;
    const collectsFirstInstallment = form.billingType === "payment_plan";
    const defaultCollectDate = form.billingType === "payment_plan" ? form.billing.startDate || todayISO() : form.billingType === "flexible" ? form.billing.initialDate || todayISO() : todayISO();
    const effectiveCollectDate = collectDateTouched ? form.billing.collectDate : defaultCollectDate;
    // One-time payments have nothing to split — the amount collected now is
    // always the full payable balance, so the field is locked the same way a
    // first installment amount is (that one's fixed by the schedule instead).
    // Flexible's initial payment is locked too — it was already finalized on
    // Step 1 and changing it here would desync the student agreement.
    const collectAmountIsFixed = collectsFirstInstallment || form.billingType === "one_time" || form.billingType === "flexible";
    // The wallet settles its share already, so the card only ever charges what's left.
    const cardChargeAmount = walletRemaining;
    const payWithClover = step === 2 && form.billingType !== "pay_per_session" && form.billing.collectNow && chargeMethod === "card" && cardChargeAmount > 0 && cardProcessorReady;
    const cloverNotConnected = step === 2 && form.billingType !== "pay_per_session" && form.billing.collectNow && chargeMethod === "card" && cardChargeAmount > 0 && !cardProcessorReady;
    const terminalNotSelected = step === 2 && form.billing.collectNow && form.billing.method === "terminal" && !deviceID;
    // The reader runs its own tip screen, so a tip typed in here as well would either
    // double up or credit money the customer never chose on the device.
    const readerCollectsTip = form.billing.collectNow && form.billing.method === "terminal";
    const savedCardNotSelected = step === 2 && form.billing.collectNow && form.billing.method === "saved_card" && !savedCardID;
    const defaultCollectAmount = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "NewEnrollmentPackageInline.useMemo[defaultCollectAmount]": ()=>{
            if (form.billingType === "one_time") return total;
            if (form.billingType === "payment_plan") return firstInstallmentAmount;
            if (form.billingType === "flexible") return initialAmount;
            return 0;
        }
    }["NewEnrollmentPackageInline.useMemo[defaultCollectAmount]"], [
        form.billingType,
        total,
        firstInstallmentAmount,
        initialAmount
    ]);
    function goToPayment() {
        if (!serviceOnly && !form.packageID) {
            setError("Please select a package.");
            return;
        }
        if (form.services.length === 0) {
            setError("Add at least one service.");
            return;
        }
        if (total < 0) {
            setError("Total can't be negative — adjust the discounts.");
            return;
        }
        // A fully-discounted / free package has nothing to collect or schedule, so
        // force it onto the one-time path and skip the billing-schedule checks.
        if (total === 0 && form.billingType !== "one_time") {
            setForm((p)=>({
                    ...p,
                    billingType: "one_time"
                }));
        }
        if (total > 0 && form.billingType === "payment_plan") {
            const { installmentMode, numberOfInstallments, installmentAmount, frequency, startDate } = form.billing;
            if (!frequency || !startDate) {
                setError("Fill all payment plan fields.");
                return;
            }
            if (installmentMode === "amount" ? !Number(installmentAmount) : !Number(numberOfInstallments)) {
                setError("Fill all payment plan fields.");
                return;
            }
        }
        if (total > 0 && form.billingType === "flexible") {
            if (initialAmount < 0 || initialAmount > total) {
                setError("Initial payment must be between $0 and the payable balance.");
                return;
            }
            if (initialAmount > 0 && !form.billing.initialDate) {
                setError("Please set the initial payment date.");
                return;
            }
            const scheduledRows = form.billing.futurePayments.filter((c)=>Number(c.amount) > 0);
            if (scheduledRows.some((c)=>!c.dueDate)) {
                setError("Every future payment needs a due date.");
                return;
            }
            if (Math.abs(amountLeftToSchedule) > 0.01) {
                setError(`Amount left to schedule is $${amountLeftToSchedule.toFixed(2)} — it must be $0 before continuing.`);
                return;
            }
        }
        setError("");
        setForm((p)=>({
                ...p,
                billing: {
                    ...p.billing,
                    collectNow: p.billingType !== "flexible" || initialAmount > 0,
                    collectAmount: defaultCollectAmount ? String(defaultCollectAmount.toFixed(2)) : ""
                }
            }));
        setStep(2);
    }
    async function handleSubmit() {
        setError("");
        const sendLink = form.billingType !== "pay_per_session" && form.billing.collectNow && isLink;
        const collect = !sendLink && form.billingType !== "pay_per_session" && form.billing.collectNow && Number(form.billing.collectAmount) > 0;
        const payload = {
            ...form,
            // The Service tab asks for neither, so it never sends a stale value left
            // behind by a visit to the Packages tab.
            ...serviceOnly ? {
                label: "",
                expiryDays: SERVICE_ONLY_EXPIRY_DAYS
            } : {},
            billing: {
                ...form.billing,
                // "link" is not a method the backend records; the creator sends the link instead.
                method: isLink ? undefined : chargeMethod,
                useWallet: walletApplied > 0,
                walletAmount: walletApplied > 0 ? walletApplied : "",
                sendLinkChannel: sendLink ? form.billing.sendLinkChannel : undefined,
                collectNow: collect,
                collectAmount: collect ? Number(form.billing.collectAmount) : 0,
                collectDate: effectiveCollectDate || undefined,
                ...collect && form.billing.method === "terminal" ? {
                    deviceID,
                    ...(0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$payments$2f$TerminalDeviceField$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["terminalTipPayload"])()
                } : {},
                ...collect && form.billing.method === "saved_card" ? {
                    savedCardID
                } : {},
                ...collect && chargeMethod === "cheque" ? {
                    checkNumber
                } : {}
            }
        };
        if (form.tip.enabled && form.tip.amount && !readerCollectsTip) {
            // teacherID may be empty: an enrollment with no teacher can still take a tip.
            payload.tip = {
                teacherID: form.teacherID || undefined,
                amount: form.tip.amount,
                method: form.tip.method
            };
        } else {
            payload.tip = undefined;
        }
        const checkoutTab = payWithClover ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$clover$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["openCheckoutTab"])() : null;
        setLoading(true);
        const res = await onSubmit?.(payload);
        if (!res?.ok) {
            setLoading(false);
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$clover$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["closeCheckoutTab"])(checkoutTab);
            setError("Failed to create enrollment and package.");
            return;
        }
        setLoading(false);
        if (res.checkoutUrl) {
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$clover$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["navigateCheckoutTab"])(checkoutTab, res.checkoutUrl);
            __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$toast$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].success(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$clover$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CHECKOUT_TOAST"]);
        } else {
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$clover$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["closeCheckoutTab"])(checkoutTab);
        }
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "mt-2 h-full min-h-0 rounded-xl border border-border bg-card p-3 flex flex-col",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "shrink-0",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-[12px] font-semibold text-foreground",
                        children: serviceOnly ? "New Enrollment & Services" : "New Enrollment & Package"
                    }, void 0, false, {
                        fileName: "[project]/app/calendar/components/NewEnrollmentPackageInline.js",
                        lineNumber: 653,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-[10px] text-muted-foreground mt-0.5",
                        children: [
                            "Step ",
                            step,
                            " of 2 · ",
                            step === 1 ? serviceOnly ? "Services & billing" : "Package & billing" : "Payment details"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/calendar/components/NewEnrollmentPackageInline.js",
                        lineNumber: 656,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/calendar/components/NewEnrollmentPackageInline.js",
                lineNumber: 652,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex-1 min-h-0 overflow-y-auto mt-3 pr-1 space-y-3",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "space-y-3 pb-1",
                        hidden: step !== 1,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "space-y-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        className: "text-[11px] font-medium text-muted-foreground",
                                        children: "Teacher"
                                    }, void 0, false, {
                                        fileName: "[project]/app/calendar/components/NewEnrollmentPackageInline.js",
                                        lineNumber: 664,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$searchable$2d$select$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                        value: form.teacherID,
                                        onChange: (v)=>setForm((p)=>({
                                                    ...p,
                                                    teacherID: v
                                                })),
                                        options: [
                                            {
                                                value: "",
                                                label: "No teacher"
                                            },
                                            ...teacherOptions
                                        ],
                                        placeholder: "Select teacher…"
                                    }, void 0, false, {
                                        fileName: "[project]/app/calendar/components/NewEnrollmentPackageInline.js",
                                        lineNumber: 667,
                                        columnNumber: 13
                                    }, this),
                                    !serviceOnly && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                className: "text-[11px] font-medium text-muted-foreground",
                                                children: "Label (optional)"
                                            }, void 0, false, {
                                                fileName: "[project]/app/calendar/components/NewEnrollmentPackageInline.js",
                                                lineNumber: 676,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                value: form.label,
                                                onChange: (e)=>setForm((p)=>({
                                                            ...p,
                                                            label: e.target.value
                                                        })),
                                                placeholder: "e.g. Term 1 2026, Trial…",
                                                className: "h-9 w-full rounded-lg border border-border bg-background px-3 text-[12px]"
                                            }, void 0, false, {
                                                fileName: "[project]/app/calendar/components/NewEnrollmentPackageInline.js",
                                                lineNumber: 679,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                className: "text-[11px] font-medium text-muted-foreground",
                                                children: "Package"
                                            }, void 0, false, {
                                                fileName: "[project]/app/calendar/components/NewEnrollmentPackageInline.js",
                                                lineNumber: 688,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$searchable$2d$select$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                value: form.packageID,
                                                onChange: (v)=>handlePkgChange(v),
                                                options: packageTemplates.map((p)=>({
                                                        value: p._id,
                                                        label: p.packageName
                                                    })),
                                                placeholder: "Select package…"
                                            }, void 0, false, {
                                                fileName: "[project]/app/calendar/components/NewEnrollmentPackageInline.js",
                                                lineNumber: 691,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/calendar/components/NewEnrollmentPackageInline.js",
                                        lineNumber: 675,
                                        columnNumber: 15
                                    }, this),
                                    !serviceOnly && selectedPkg && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "rounded-lg border border-border bg-muted/30 p-3 space-y-1",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-[12px] font-medium text-foreground",
                                                children: selectedPkg.packageName
                                            }, void 0, false, {
                                                fileName: "[project]/app/calendar/components/NewEnrollmentPackageInline.js",
                                                lineNumber: 704,
                                                columnNumber: 17
                                            }, this),
                                            selectedPkg.description && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-[11px] text-muted-foreground",
                                                children: selectedPkg.description
                                            }, void 0, false, {
                                                fileName: "[project]/app/calendar/components/NewEnrollmentPackageInline.js",
                                                lineNumber: 708,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-[11px] text-muted-foreground",
                                                children: [
                                                    selectedPkg.services?.length ?? 0,
                                                    " service",
                                                    (selectedPkg.services?.length ?? 0) !== 1 ? "s" : "",
                                                    " · ",
                                                    selectedPkg.totalDays > 0 ? `${selectedPkg.totalDays} days validity` : "No expiry"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/calendar/components/NewEnrollmentPackageInline.js",
                                                lineNumber: 712,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/calendar/components/NewEnrollmentPackageInline.js",
                                        lineNumber: 703,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        className: "text-[11px] font-medium text-muted-foreground",
                                        children: "Purchase date"
                                    }, void 0, false, {
                                        fileName: "[project]/app/calendar/components/NewEnrollmentPackageInline.js",
                                        lineNumber: 722,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        type: "date",
                                        value: form.purchaseDate,
                                        onChange: (e)=>setForm((p)=>({
                                                    ...p,
                                                    purchaseDate: e.target.value
                                                })),
                                        className: "h-9 w-full rounded-lg border border-border bg-background px-3 text-[12px]"
                                    }, void 0, false, {
                                        fileName: "[project]/app/calendar/components/NewEnrollmentPackageInline.js",
                                        lineNumber: 725,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/calendar/components/NewEnrollmentPackageInline.js",
                                lineNumber: 663,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "space-y-2",
                                children: [
                                    serviceOnly && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$searchable$2d$select$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                        value: "",
                                        onChange: (v)=>{
                                            const svc = catalogServices.find((s)=>String(s._id) === String(v));
                                            if (svc) addService(svc);
                                        },
                                        options: catalogServices.filter((s)=>s.type !== "intro").filter((s)=>!form.services.some((fs)=>fs.serviceCode && fs.serviceCode === s.serviceCode)).map((s)=>({
                                                value: String(s._id),
                                                label: s.serviceName || s.serviceCode
                                            })),
                                        placeholder: "Select a service to add…"
                                    }, void 0, false, {
                                        fileName: "[project]/app/calendar/components/NewEnrollmentPackageInline.js",
                                        lineNumber: 738,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "overflow-x-auto rounded-lg border border-border",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("table", {
                                            className: "w-full text-[12px]",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("thead", {
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                                        className: "bg-muted/40 border-b border-border",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                                className: "px-2 py-1.5 text-left",
                                                                children: "Service"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/calendar/components/NewEnrollmentPackageInline.js",
                                                                lineNumber: 758,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                                className: "px-2 py-1.5",
                                                                children: "Color"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/calendar/components/NewEnrollmentPackageInline.js",
                                                                lineNumber: 759,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                                className: "px-2 py-1.5",
                                                                children: "Sessions"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/calendar/components/NewEnrollmentPackageInline.js",
                                                                lineNumber: 760,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                                className: "px-2 py-1.5",
                                                                children: "Price"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/calendar/components/NewEnrollmentPackageInline.js",
                                                                lineNumber: 761,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                                className: "px-2 py-1.5",
                                                                children: "Discount"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/calendar/components/NewEnrollmentPackageInline.js",
                                                                lineNumber: 762,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                                className: "px-2 py-1.5 text-right",
                                                                children: "Total"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/calendar/components/NewEnrollmentPackageInline.js",
                                                                lineNumber: 763,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                                className: "px-2 py-1.5 w-6"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/calendar/components/NewEnrollmentPackageInline.js",
                                                                lineNumber: 764,
                                                                columnNumber: 21
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/calendar/components/NewEnrollmentPackageInline.js",
                                                        lineNumber: 757,
                                                        columnNumber: 19
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/app/calendar/components/NewEnrollmentPackageInline.js",
                                                    lineNumber: 756,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tbody", {
                                                    children: [
                                                        form.services.length === 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                colSpan: 7,
                                                                className: "px-3 py-3 text-center text-[11px] text-muted-foreground italic",
                                                                children: "No services — add one below"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/calendar/components/NewEnrollmentPackageInline.js",
                                                                lineNumber: 770,
                                                                columnNumber: 23
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/calendar/components/NewEnrollmentPackageInline.js",
                                                            lineNumber: 769,
                                                            columnNumber: 21
                                                        }, this),
                                                        form.services.map((s)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                                                className: "border-t border-border first:border-0",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                        className: "px-2 py-1.5",
                                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                            type: "text",
                                                                            value: s.serviceName,
                                                                            onChange: (e)=>updateSvc(s._key, "serviceName", e.target.value),
                                                                            placeholder: "Service name",
                                                                            className: "h-7 w-full rounded border border-border bg-background px-2 text-[12px] outline-none focus:border-primary"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/app/calendar/components/NewEnrollmentPackageInline.js",
                                                                            lineNumber: 784,
                                                                            columnNumber: 25
                                                                        }, this)
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/calendar/components/NewEnrollmentPackageInline.js",
                                                                        lineNumber: 783,
                                                                        columnNumber: 23
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                        className: "px-2 py-1.5",
                                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                            type: "color",
                                                                            value: s.color || "#6366f1",
                                                                            onChange: (e)=>updateSvc(s._key, "color", e.target.value),
                                                                            className: "h-7 w-9 rounded border border-border cursor-pointer p-0.5 bg-background"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/app/calendar/components/NewEnrollmentPackageInline.js",
                                                                            lineNumber: 795,
                                                                            columnNumber: 25
                                                                        }, this)
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/calendar/components/NewEnrollmentPackageInline.js",
                                                                        lineNumber: 794,
                                                                        columnNumber: 23
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                        className: "px-2 py-1.5",
                                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                            type: "number",
                                                                            min: "0",
                                                                            value: s.numberOfSessions,
                                                                            onChange: (e)=>updateSvc(s._key, "numberOfSessions", e.target.value),
                                                                            className: "h-7 w-16 rounded border border-border px-2 outline-none focus:border-primary"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/app/calendar/components/NewEnrollmentPackageInline.js",
                                                                            lineNumber: 805,
                                                                            columnNumber: 25
                                                                        }, this)
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/calendar/components/NewEnrollmentPackageInline.js",
                                                                        lineNumber: 804,
                                                                        columnNumber: 23
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                        className: "px-2 py-1.5",
                                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                            type: "number",
                                                                            min: "0",
                                                                            step: "any",
                                                                            value: s.isChargeable === false ? 0 : s.pricePerSession,
                                                                            disabled: s.isChargeable === false,
                                                                            onChange: (e)=>updateSvc(s._key, "pricePerSession", e.target.value),
                                                                            className: `h-7 w-20 rounded border px-2 outline-none ${s.isChargeable === false ? "border-border bg-muted/30 text-muted-foreground cursor-not-allowed" : "border-border focus:border-primary"}`
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/app/calendar/components/NewEnrollmentPackageInline.js",
                                                                            lineNumber: 820,
                                                                            columnNumber: 25
                                                                        }, this)
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/calendar/components/NewEnrollmentPackageInline.js",
                                                                        lineNumber: 819,
                                                                        columnNumber: 23
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                        className: "px-2 py-1.5",
                                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                            className: "flex items-center gap-1",
                                                                            children: [
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                                                                    value: s.discountType,
                                                                                    disabled: s.isChargeable === false,
                                                                                    onChange: (e)=>updateSvc(s._key, "discountType", e.target.value),
                                                                                    className: `h-7 rounded border border-border px-1 text-[11px] outline-none ${s.isChargeable === false ? "bg-muted/30 text-muted-foreground cursor-not-allowed" : "bg-background focus:border-primary"}`,
                                                                                    children: [
                                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                                            value: "none",
                                                                                            children: "—"
                                                                                        }, void 0, false, {
                                                                                            fileName: "[project]/app/calendar/components/NewEnrollmentPackageInline.js",
                                                                                            lineNumber: 842,
                                                                                            columnNumber: 29
                                                                                        }, this),
                                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                                            value: "percentage",
                                                                                            children: "%"
                                                                                        }, void 0, false, {
                                                                                            fileName: "[project]/app/calendar/components/NewEnrollmentPackageInline.js",
                                                                                            lineNumber: 843,
                                                                                            columnNumber: 29
                                                                                        }, this),
                                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                                            value: "fixed",
                                                                                            children: "$"
                                                                                        }, void 0, false, {
                                                                                            fileName: "[project]/app/calendar/components/NewEnrollmentPackageInline.js",
                                                                                            lineNumber: 844,
                                                                                            columnNumber: 29
                                                                                        }, this)
                                                                                    ]
                                                                                }, void 0, true, {
                                                                                    fileName: "[project]/app/calendar/components/NewEnrollmentPackageInline.js",
                                                                                    lineNumber: 834,
                                                                                    columnNumber: 27
                                                                                }, this),
                                                                                s.discountType !== "none" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                                    type: "number",
                                                                                    min: "0",
                                                                                    step: "any",
                                                                                    value: s.discountAmount,
                                                                                    onChange: (e)=>updateSvc(s._key, "discountAmount", e.target.value),
                                                                                    className: "h-7 w-16 rounded border border-border bg-background px-2 text-[11px] outline-none focus:border-primary"
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/app/calendar/components/NewEnrollmentPackageInline.js",
                                                                                    lineNumber: 847,
                                                                                    columnNumber: 29
                                                                                }, this)
                                                                            ]
                                                                        }, void 0, true, {
                                                                            fileName: "[project]/app/calendar/components/NewEnrollmentPackageInline.js",
                                                                            lineNumber: 833,
                                                                            columnNumber: 25
                                                                        }, this)
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/calendar/components/NewEnrollmentPackageInline.js",
                                                                        lineNumber: 832,
                                                                        columnNumber: 23
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                        className: "px-2 py-1.5 text-right font-semibold",
                                                                        children: [
                                                                            "$",
                                                                            Number(s.finalAmount).toFixed(2)
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/app/calendar/components/NewEnrollmentPackageInline.js",
                                                                        lineNumber: 864,
                                                                        columnNumber: 23
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                        className: "px-2 py-1.5 text-center",
                                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                            type: "button",
                                                                            onClick: ()=>removeService(s._key),
                                                                            className: "text-muted-foreground hover:text-destructive transition-colors",
                                                                            "aria-label": "Remove service",
                                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trash$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Trash2$3e$__["Trash2"], {
                                                                                className: "h-3.5 w-3.5"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/app/calendar/components/NewEnrollmentPackageInline.js",
                                                                                lineNumber: 874,
                                                                                columnNumber: 27
                                                                            }, this)
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/app/calendar/components/NewEnrollmentPackageInline.js",
                                                                            lineNumber: 868,
                                                                            columnNumber: 25
                                                                        }, this)
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/calendar/components/NewEnrollmentPackageInline.js",
                                                                        lineNumber: 867,
                                                                        columnNumber: 23
                                                                    }, this)
                                                                ]
                                                            }, s._key, true, {
                                                                fileName: "[project]/app/calendar/components/NewEnrollmentPackageInline.js",
                                                                lineNumber: 779,
                                                                columnNumber: 21
                                                            }, this))
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/calendar/components/NewEnrollmentPackageInline.js",
                                                    lineNumber: 767,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tfoot", {
                                                    children: [
                                                        totalDiscount > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                                            className: "border-t border-border bg-muted/20",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                    colSpan: 5,
                                                                    className: "px-2 py-1 text-right text-[11px] text-muted-foreground",
                                                                    children: "Discount"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/calendar/components/NewEnrollmentPackageInline.js",
                                                                    lineNumber: 883,
                                                                    columnNumber: 23
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                    className: "px-2 py-1 text-right text-[11px] text-amber-600 font-medium",
                                                                    children: [
                                                                        "-$",
                                                                        totalDiscount.toFixed(2)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/app/calendar/components/NewEnrollmentPackageInline.js",
                                                                    lineNumber: 889,
                                                                    columnNumber: 23
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {}, void 0, false, {
                                                                    fileName: "[project]/app/calendar/components/NewEnrollmentPackageInline.js",
                                                                    lineNumber: 892,
                                                                    columnNumber: 23
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/app/calendar/components/NewEnrollmentPackageInline.js",
                                                            lineNumber: 882,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                                            className: "border-t border-border bg-muted/30",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                    colSpan: 5,
                                                                    className: "px-2 py-1.5 text-right text-[11px] text-muted-foreground",
                                                                    children: "Total"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/calendar/components/NewEnrollmentPackageInline.js",
                                                                    lineNumber: 896,
                                                                    columnNumber: 21
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                    className: "px-2 py-1.5 text-right font-semibold",
                                                                    children: [
                                                                        "$",
                                                                        total.toFixed(2)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/app/calendar/components/NewEnrollmentPackageInline.js",
                                                                    lineNumber: 902,
                                                                    columnNumber: 21
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {}, void 0, false, {
                                                                    fileName: "[project]/app/calendar/components/NewEnrollmentPackageInline.js",
                                                                    lineNumber: 905,
                                                                    columnNumber: 21
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/app/calendar/components/NewEnrollmentPackageInline.js",
                                                            lineNumber: 895,
                                                            columnNumber: 19
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/calendar/components/NewEnrollmentPackageInline.js",
                                                    lineNumber: 880,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/calendar/components/NewEnrollmentPackageInline.js",
                                            lineNumber: 755,
                                            columnNumber: 15
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/app/calendar/components/NewEnrollmentPackageInline.js",
                                        lineNumber: 754,
                                        columnNumber: 13
                                    }, this),
                                    !serviceOnly && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ServicePicker, {
                                        catalogServices: catalogServices.filter((s)=>s.type !== "intro"),
                                        onSelect: addService
                                    }, void 0, false, {
                                        fileName: "[project]/app/calendar/components/NewEnrollmentPackageInline.js",
                                        lineNumber: 913,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/calendar/components/NewEnrollmentPackageInline.js",
                                lineNumber: 736,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "space-y-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-[11px] font-medium text-muted-foreground uppercase",
                                        children: "Billing Type"
                                    }, void 0, false, {
                                        fileName: "[project]/app/calendar/components/NewEnrollmentPackageInline.js",
                                        lineNumber: 922,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "grid grid-cols-3 gap-2",
                                        children: [
                                            {
                                                v: "one_time",
                                                label: "One-time"
                                            },
                                            {
                                                v: "payment_plan",
                                                label: "Payment Plan"
                                            },
                                            {
                                                v: "flexible",
                                                label: "Flexible"
                                            }
                                        ].filter(({ v })=>!serviceOnly || SERVICE_ONLY_BILLING_TYPES.includes(v)).map(({ v, label })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                type: "button",
                                                onClick: ()=>setForm((p)=>({
                                                            ...p,
                                                            billingType: v
                                                        })),
                                                className: `rounded-lg border p-2 text-[11px] transition-colors ${form.billingType === v ? "border-primary bg-primary/5 font-medium" : "border-border bg-background hover:border-primary/50"}`,
                                                children: label
                                            }, v, false, {
                                                fileName: "[project]/app/calendar/components/NewEnrollmentPackageInline.js",
                                                lineNumber: 933,
                                                columnNumber: 17
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/app/calendar/components/NewEnrollmentPackageInline.js",
                                        lineNumber: 925,
                                        columnNumber: 13
                                    }, this),
                                    form.billingType === "one_time" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "rounded-lg border border-border bg-muted/20 p-3",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-center justify-between",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-[12px] text-muted-foreground",
                                                    children: "Payable Balance"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/calendar/components/NewEnrollmentPackageInline.js",
                                                    lineNumber: 950,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-[14px] font-bold text-foreground",
                                                    children: [
                                                        "$",
                                                        total.toFixed(2)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/calendar/components/NewEnrollmentPackageInline.js",
                                                    lineNumber: 953,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/calendar/components/NewEnrollmentPackageInline.js",
                                            lineNumber: 949,
                                            columnNumber: 17
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/app/calendar/components/NewEnrollmentPackageInline.js",
                                        lineNumber: 948,
                                        columnNumber: 15
                                    }, this),
                                    form.billingType === "payment_plan" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "space-y-2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "grid grid-cols-2 gap-2",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                                        value: form.billing.installmentMode,
                                                        onChange: (e)=>setForm((p)=>({
                                                                    ...p,
                                                                    billing: {
                                                                        ...p.billing,
                                                                        installmentMode: e.target.value
                                                                    }
                                                                })),
                                                        className: "h-9 rounded-lg border border-border px-3 text-[12px]",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                value: "count",
                                                                children: "No. of Installments"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/calendar/components/NewEnrollmentPackageInline.js",
                                                                lineNumber: 972,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                value: "amount",
                                                                children: "Installment Amount"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/calendar/components/NewEnrollmentPackageInline.js",
                                                                lineNumber: 973,
                                                                columnNumber: 21
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/calendar/components/NewEnrollmentPackageInline.js",
                                                        lineNumber: 962,
                                                        columnNumber: 19
                                                    }, this),
                                                    form.billing.installmentMode === "amount" ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                        type: "number",
                                                        min: "1",
                                                        placeholder: "Amount per installment",
                                                        value: form.billing.installmentAmount,
                                                        onChange: (e)=>setForm((p)=>({
                                                                    ...p,
                                                                    billing: {
                                                                        ...p.billing,
                                                                        installmentAmount: e.target.value
                                                                    }
                                                                })),
                                                        className: "h-9 rounded-lg border border-border px-3 text-[12px]"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/calendar/components/NewEnrollmentPackageInline.js",
                                                        lineNumber: 976,
                                                        columnNumber: 21
                                                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                        type: "number",
                                                        min: "2",
                                                        placeholder: "Number of installments",
                                                        value: form.billing.numberOfInstallments,
                                                        onChange: (e)=>setForm((p)=>({
                                                                    ...p,
                                                                    billing: {
                                                                        ...p.billing,
                                                                        numberOfInstallments: e.target.value
                                                                    }
                                                                })),
                                                        className: "h-9 rounded-lg border border-border px-3 text-[12px]"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/calendar/components/NewEnrollmentPackageInline.js",
                                                        lineNumber: 990,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/calendar/components/NewEnrollmentPackageInline.js",
                                                lineNumber: 961,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "grid grid-cols-2 gap-2",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                                        value: form.billing.frequency,
                                                        onChange: (e)=>setForm((p)=>({
                                                                    ...p,
                                                                    billing: {
                                                                        ...p.billing,
                                                                        frequency: e.target.value
                                                                    }
                                                                })),
                                                        className: "h-9 rounded-lg border border-border px-3 text-[12px]",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                value: "weekly",
                                                                children: "Weekly"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/calendar/components/NewEnrollmentPackageInline.js",
                                                                lineNumber: 1016,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                value: "biweekly",
                                                                children: "Biweekly"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/calendar/components/NewEnrollmentPackageInline.js",
                                                                lineNumber: 1017,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                value: "monthly",
                                                                children: "Monthly"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/calendar/components/NewEnrollmentPackageInline.js",
                                                                lineNumber: 1018,
                                                                columnNumber: 21
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/calendar/components/NewEnrollmentPackageInline.js",
                                                        lineNumber: 1006,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                        type: "date",
                                                        value: form.billing.startDate,
                                                        onChange: (e)=>setForm((p)=>({
                                                                    ...p,
                                                                    billing: {
                                                                        ...p.billing,
                                                                        startDate: e.target.value
                                                                    }
                                                                })),
                                                        className: "h-9 rounded-lg border border-border px-3 text-[12px]"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/calendar/components/NewEnrollmentPackageInline.js",
                                                        lineNumber: 1020,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/calendar/components/NewEnrollmentPackageInline.js",
                                                lineNumber: 1005,
                                                columnNumber: 17
                                            }, this),
                                            installments.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "rounded-lg border border-border bg-muted/20 p-2.5",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex items-center justify-between mb-1.5",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "text-[11px] font-medium text-muted-foreground uppercase",
                                                            children: "Schedule Preview"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/calendar/components/NewEnrollmentPackageInline.js",
                                                            lineNumber: 1035,
                                                            columnNumber: 23
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/calendar/components/NewEnrollmentPackageInline.js",
                                                        lineNumber: 1034,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "space-y-1 max-h-32 overflow-y-auto pr-1",
                                                        children: installments.map((inst)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "flex items-center justify-between border-b border-border/40 pb-1 last:border-0",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "text-[11px] text-muted-foreground",
                                                                        children: [
                                                                            "Payment ",
                                                                            inst.index,
                                                                            " · ",
                                                                            inst.date
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/app/calendar/components/NewEnrollmentPackageInline.js",
                                                                        lineNumber: 1045,
                                                                        columnNumber: 27
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "text-[11px] font-medium text-foreground",
                                                                        children: [
                                                                            "$",
                                                                            inst.amount.toFixed(2)
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/app/calendar/components/NewEnrollmentPackageInline.js",
                                                                        lineNumber: 1048,
                                                                        columnNumber: 27
                                                                    }, this)
                                                                ]
                                                            }, inst.index, true, {
                                                                fileName: "[project]/app/calendar/components/NewEnrollmentPackageInline.js",
                                                                lineNumber: 1041,
                                                                columnNumber: 25
                                                            }, this))
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/calendar/components/NewEnrollmentPackageInline.js",
                                                        lineNumber: 1039,
                                                        columnNumber: 21
                                                    }, this),
                                                    totalDiscount > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex items-center justify-between mt-2 pt-2 border-t border-border/40",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                className: "text-[11px] text-muted-foreground",
                                                                children: "Discount"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/calendar/components/NewEnrollmentPackageInline.js",
                                                                lineNumber: 1056,
                                                                columnNumber: 25
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                className: "text-[11px] font-medium text-destructive",
                                                                children: [
                                                                    "-$",
                                                                    totalDiscount.toFixed(2)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/app/calendar/components/NewEnrollmentPackageInline.js",
                                                                lineNumber: 1057,
                                                                columnNumber: 25
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/calendar/components/NewEnrollmentPackageInline.js",
                                                        lineNumber: 1055,
                                                        columnNumber: 23
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex items-center justify-between mt-2 pt-2 border-t border-border",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                className: "text-[11px] text-muted-foreground",
                                                                children: "Payable Balance"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/calendar/components/NewEnrollmentPackageInline.js",
                                                                lineNumber: 1061,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                className: "text-[12px] font-bold text-foreground",
                                                                children: [
                                                                    "$",
                                                                    total.toFixed(2)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/app/calendar/components/NewEnrollmentPackageInline.js",
                                                                lineNumber: 1064,
                                                                columnNumber: 23
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/calendar/components/NewEnrollmentPackageInline.js",
                                                        lineNumber: 1060,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/calendar/components/NewEnrollmentPackageInline.js",
                                                lineNumber: 1033,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/calendar/components/NewEnrollmentPackageInline.js",
                                        lineNumber: 960,
                                        columnNumber: 15
                                    }, this),
                                    form.billingType === "flexible" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "rounded-lg border border-border bg-muted/20 p-3 space-y-4",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-[10px] text-muted-foreground -mt-1",
                                                children: "This arrangement will be included in the student agreement — get it right here, it can't be changed on the payment step."
                                            }, void 0, false, {
                                                fileName: "[project]/app/calendar/components/NewEnrollmentPackageInline.js",
                                                lineNumber: 1074,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "space-y-1.5",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                        className: "text-[11px] font-medium text-foreground",
                                                        children: [
                                                            "Initial payment ",
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "font-normal text-muted-foreground",
                                                                children: "(optional — enter $0 if none)"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/calendar/components/NewEnrollmentPackageInline.js",
                                                                lineNumber: 1081,
                                                                columnNumber: 37
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/calendar/components/NewEnrollmentPackageInline.js",
                                                        lineNumber: 1080,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "grid grid-cols-2 gap-2",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "relative",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "absolute left-2.5 top-1/2 -translate-y-1/2 text-[11px] text-muted-foreground",
                                                                        children: "$"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/calendar/components/NewEnrollmentPackageInline.js",
                                                                        lineNumber: 1085,
                                                                        columnNumber: 23
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                        type: "number",
                                                                        min: "0",
                                                                        max: total,
                                                                        step: "any",
                                                                        placeholder: "0.00",
                                                                        value: form.billing.initialAmount,
                                                                        onChange: (e)=>setForm((p)=>{
                                                                                const remaining = total - (Number(e.target.value) || 0);
                                                                                return {
                                                                                    ...p,
                                                                                    billing: {
                                                                                        ...p.billing,
                                                                                        initialAmount: e.target.value,
                                                                                        futurePayments: splitEvenly(p.billing.futurePayments, remaining)
                                                                                    }
                                                                                };
                                                                            }),
                                                                        className: "h-9 w-full rounded-lg border border-border bg-background pl-6 pr-3 text-[12px] outline-none focus:border-primary"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/calendar/components/NewEnrollmentPackageInline.js",
                                                                        lineNumber: 1086,
                                                                        columnNumber: 23
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/app/calendar/components/NewEnrollmentPackageInline.js",
                                                                lineNumber: 1084,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                type: "date",
                                                                value: form.billing.initialDate,
                                                                onChange: (e)=>setForm((p)=>({
                                                                            ...p,
                                                                            billing: {
                                                                                ...p.billing,
                                                                                initialDate: e.target.value
                                                                            }
                                                                        })),
                                                                className: "h-9 w-full rounded-lg border border-border bg-background px-3 text-[12px] outline-none focus:border-primary"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/calendar/components/NewEnrollmentPackageInline.js",
                                                                lineNumber: 1109,
                                                                columnNumber: 21
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/calendar/components/NewEnrollmentPackageInline.js",
                                                        lineNumber: 1083,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/calendar/components/NewEnrollmentPackageInline.js",
                                                lineNumber: 1079,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "space-y-1.5 pt-1 border-t border-border",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                        className: "text-[11px] font-medium text-foreground block pt-2",
                                                        children: "Future payments"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/calendar/components/NewEnrollmentPackageInline.js",
                                                        lineNumber: 1122,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "text-[10px] text-muted-foreground",
                                                        children: "One row is the remaining balance's single due date. Add more to split it into a schedule."
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/calendar/components/NewEnrollmentPackageInline.js",
                                                        lineNumber: 1125,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "space-y-1.5",
                                                        children: form.billing.futurePayments.map((c, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "flex items-center gap-2",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "text-[11px] text-muted-foreground w-5 shrink-0",
                                                                        children: [
                                                                            i + 1,
                                                                            "."
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/app/calendar/components/NewEnrollmentPackageInline.js",
                                                                        lineNumber: 1131,
                                                                        columnNumber: 25
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                        type: "date",
                                                                        value: c.dueDate,
                                                                        onChange: (e)=>updateFuturePayment(c._key, "dueDate", e.target.value),
                                                                        className: "h-8 flex-1 rounded-lg border border-border bg-background px-2.5 text-[12px]"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/calendar/components/NewEnrollmentPackageInline.js",
                                                                        lineNumber: 1132,
                                                                        columnNumber: 25
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "relative w-28",
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                className: "absolute left-2.5 top-1/2 -translate-y-1/2 text-[11px] text-muted-foreground",
                                                                                children: "$"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/app/calendar/components/NewEnrollmentPackageInline.js",
                                                                                lineNumber: 1139,
                                                                                columnNumber: 27
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                                type: "number",
                                                                                min: "0",
                                                                                step: "any",
                                                                                placeholder: "0.00",
                                                                                value: c.amount,
                                                                                onChange: (e)=>updateFuturePayment(c._key, "amount", e.target.value),
                                                                                className: "h-8 w-full rounded-lg border border-border bg-background pl-5 pr-2 text-[12px]"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/app/calendar/components/NewEnrollmentPackageInline.js",
                                                                                lineNumber: 1140,
                                                                                columnNumber: 27
                                                                            }, this)
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/app/calendar/components/NewEnrollmentPackageInline.js",
                                                                        lineNumber: 1138,
                                                                        columnNumber: 25
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                        type: "button",
                                                                        onClick: ()=>removeFuturePayment(c._key),
                                                                        disabled: form.billing.futurePayments.length === 1,
                                                                        className: "text-muted-foreground hover:text-destructive disabled:opacity-30 disabled:cursor-not-allowed transition-colors",
                                                                        "aria-label": "Remove payment",
                                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trash$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Trash2$3e$__["Trash2"], {
                                                                            className: "h-3.5 w-3.5"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/app/calendar/components/NewEnrollmentPackageInline.js",
                                                                            lineNumber: 1157,
                                                                            columnNumber: 27
                                                                        }, this)
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/calendar/components/NewEnrollmentPackageInline.js",
                                                                        lineNumber: 1150,
                                                                        columnNumber: 25
                                                                    }, this)
                                                                ]
                                                            }, c._key, true, {
                                                                fileName: "[project]/app/calendar/components/NewEnrollmentPackageInline.js",
                                                                lineNumber: 1130,
                                                                columnNumber: 23
                                                            }, this))
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/calendar/components/NewEnrollmentPackageInline.js",
                                                        lineNumber: 1128,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        type: "button",
                                                        onClick: addFuturePayment,
                                                        className: "flex items-center gap-1 h-7 px-2 rounded border border-dashed border-border bg-background text-[11px] font-medium text-muted-foreground hover:text-foreground hover:border-primary transition-colors",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__["Plus"], {
                                                                className: "h-3 w-3"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/calendar/components/NewEnrollmentPackageInline.js",
                                                                lineNumber: 1167,
                                                                columnNumber: 21
                                                            }, this),
                                                            " Add another payment"
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/calendar/components/NewEnrollmentPackageInline.js",
                                                        lineNumber: 1162,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/calendar/components/NewEnrollmentPackageInline.js",
                                                lineNumber: 1121,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "space-y-1 pt-2 border-t border-border",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex items-center justify-between",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                className: "text-[11px] text-muted-foreground",
                                                                children: "Amount left to schedule"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/calendar/components/NewEnrollmentPackageInline.js",
                                                                lineNumber: 1173,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                className: `text-[12px] font-semibold ${Math.abs(amountLeftToSchedule) > 0.01 ? "text-destructive" : "text-success"}`,
                                                                children: [
                                                                    "$",
                                                                    amountLeftToSchedule.toFixed(2)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/app/calendar/components/NewEnrollmentPackageInline.js",
                                                                lineNumber: 1174,
                                                                columnNumber: 21
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/calendar/components/NewEnrollmentPackageInline.js",
                                                        lineNumber: 1172,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex items-center justify-between",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                className: "text-[11px] text-muted-foreground",
                                                                children: "Payable Balance"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/calendar/components/NewEnrollmentPackageInline.js",
                                                                lineNumber: 1179,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                className: "text-[13px] font-bold text-foreground",
                                                                children: [
                                                                    "$",
                                                                    total.toFixed(2)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/app/calendar/components/NewEnrollmentPackageInline.js",
                                                                lineNumber: 1180,
                                                                columnNumber: 21
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/calendar/components/NewEnrollmentPackageInline.js",
                                                        lineNumber: 1178,
                                                        columnNumber: 19
                                                    }, this),
                                                    Math.abs(amountLeftToSchedule) > 0.01 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "text-[10px] text-destructive",
                                                        children: "Initial payment plus future payments must add up to the payable balance."
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/calendar/components/NewEnrollmentPackageInline.js",
                                                        lineNumber: 1183,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/calendar/components/NewEnrollmentPackageInline.js",
                                                lineNumber: 1171,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/calendar/components/NewEnrollmentPackageInline.js",
                                        lineNumber: 1073,
                                        columnNumber: 15
                                    }, this),
                                    form.billingType === "pay_per_session" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "rounded-lg border border-border bg-muted/20 p-3 space-y-2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-[11px] text-muted-foreground",
                                                children: "No upfront payment. A payment is recorded automatically each time a session is booked for the chargeable service."
                                            }, void 0, false, {
                                                fileName: "[project]/app/calendar/components/NewEnrollmentPackageInline.js",
                                                lineNumber: 1190,
                                                columnNumber: 17
                                            }, this),
                                            chargeableServices.map((s)=>{
                                                const sessions = Number(s.numberOfSessions || 0);
                                                const pricePerSession = Number(s.pricePerSession || 0);
                                                const finalAmount = Number(s.finalAmount || 0);
                                                const hasDiscount = s.discountType !== "none" && Number(s.discountAmount || 0) > 0;
                                                // Build per-session charge list, applying discount from the last session backwards
                                                const charges = Array(sessions).fill(pricePerSession);
                                                if (hasDiscount) {
                                                    let remaining = Math.max(0, pricePerSession * sessions - finalAmount);
                                                    for(let i = sessions - 1; i >= 0 && remaining > 0; i--){
                                                        const reduction = Math.min(charges[i], remaining);
                                                        charges[i] = Math.round((charges[i] - reduction) * 100) / 100;
                                                        remaining = Math.round((remaining - reduction) * 100) / 100;
                                                    }
                                                }
                                                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "pt-2 border-t border-border space-y-2",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "flex items-center justify-between",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                    className: "text-[11px] font-semibold text-foreground",
                                                                    children: s.serviceName || s.serviceCode
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/calendar/components/NewEnrollmentPackageInline.js",
                                                                    lineNumber: 1213,
                                                                    columnNumber: 25
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                    className: "text-[10px] text-muted-foreground",
                                                                    children: [
                                                                        sessions,
                                                                        " sessions · $",
                                                                        pricePerSession.toFixed(2),
                                                                        "/sess"
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/app/calendar/components/NewEnrollmentPackageInline.js",
                                                                    lineNumber: 1214,
                                                                    columnNumber: 25
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/app/calendar/components/NewEnrollmentPackageInline.js",
                                                            lineNumber: 1212,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "rounded-md border border-border overflow-hidden",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "grid grid-cols-2 bg-muted/40 px-2.5 py-1.5",
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                            className: "text-[10px] font-semibold text-muted-foreground uppercase tracking-wider",
                                                                            children: "Session"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/app/calendar/components/NewEnrollmentPackageInline.js",
                                                                            lineNumber: 1218,
                                                                            columnNumber: 27
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                            className: "text-[10px] font-semibold text-muted-foreground uppercase tracking-wider text-right",
                                                                            children: "Charge"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/app/calendar/components/NewEnrollmentPackageInline.js",
                                                                            lineNumber: 1219,
                                                                            columnNumber: 27
                                                                        }, this)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/app/calendar/components/NewEnrollmentPackageInline.js",
                                                                    lineNumber: 1217,
                                                                    columnNumber: 25
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "max-h-48 overflow-y-auto",
                                                                    children: charges.map((amount, idx)=>{
                                                                        const isDiscounted = hasDiscount && amount < pricePerSession;
                                                                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                            className: `grid grid-cols-2 px-2.5 py-1.5 ${idx > 0 ? 'border-t border-border' : ''}`,
                                                                            children: [
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                    className: "text-[11px] text-foreground",
                                                                                    children: [
                                                                                        "Session ",
                                                                                        idx + 1
                                                                                    ]
                                                                                }, void 0, true, {
                                                                                    fileName: "[project]/app/calendar/components/NewEnrollmentPackageInline.js",
                                                                                    lineNumber: 1226,
                                                                                    columnNumber: 33
                                                                                }, this),
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                    className: "text-right",
                                                                                    children: [
                                                                                        isDiscounted && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                            className: "text-[10px] text-muted-foreground line-through mr-1",
                                                                                            children: [
                                                                                                "$",
                                                                                                pricePerSession.toFixed(2)
                                                                                            ]
                                                                                        }, void 0, true, {
                                                                                            fileName: "[project]/app/calendar/components/NewEnrollmentPackageInline.js",
                                                                                            lineNumber: 1229,
                                                                                            columnNumber: 37
                                                                                        }, this),
                                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                            className: `text-[11px] font-semibold ${isDiscounted ? 'text-amber-600 dark:text-amber-400' : 'text-foreground'}`,
                                                                                            children: [
                                                                                                "$",
                                                                                                amount.toFixed(2)
                                                                                            ]
                                                                                        }, void 0, true, {
                                                                                            fileName: "[project]/app/calendar/components/NewEnrollmentPackageInline.js",
                                                                                            lineNumber: 1231,
                                                                                            columnNumber: 35
                                                                                        }, this)
                                                                                    ]
                                                                                }, void 0, true, {
                                                                                    fileName: "[project]/app/calendar/components/NewEnrollmentPackageInline.js",
                                                                                    lineNumber: 1227,
                                                                                    columnNumber: 33
                                                                                }, this)
                                                                            ]
                                                                        }, idx, true, {
                                                                            fileName: "[project]/app/calendar/components/NewEnrollmentPackageInline.js",
                                                                            lineNumber: 1225,
                                                                            columnNumber: 31
                                                                        }, this);
                                                                    })
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/calendar/components/NewEnrollmentPackageInline.js",
                                                                    lineNumber: 1221,
                                                                    columnNumber: 25
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/app/calendar/components/NewEnrollmentPackageInline.js",
                                                            lineNumber: 1216,
                                                            columnNumber: 23
                                                        }, this)
                                                    ]
                                                }, s.serviceCode, true, {
                                                    fileName: "[project]/app/calendar/components/NewEnrollmentPackageInline.js",
                                                    lineNumber: 1211,
                                                    columnNumber: 21
                                                }, this);
                                            }),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-center justify-between pt-2 border-t border-border",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "text-[11px] text-muted-foreground",
                                                        children: "Total (if all sessions booked)"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/calendar/components/NewEnrollmentPackageInline.js",
                                                        lineNumber: 1244,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "text-[13px] font-bold text-foreground",
                                                        children: [
                                                            "$",
                                                            chargeableServices.reduce((sum, s)=>sum + Number(s.finalAmount || 0), 0).toFixed(2)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/calendar/components/NewEnrollmentPackageInline.js",
                                                        lineNumber: 1245,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/calendar/components/NewEnrollmentPackageInline.js",
                                                lineNumber: 1243,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/calendar/components/NewEnrollmentPackageInline.js",
                                        lineNumber: 1189,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/calendar/components/NewEnrollmentPackageInline.js",
                                lineNumber: 921,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/calendar/components/NewEnrollmentPackageInline.js",
                        lineNumber: 662,
                        columnNumber: 9
                    }, this),
                    step === 2 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "space-y-3 pb-1",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "rounded-lg border border-border bg-muted/20 p-3 space-y-3",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center justify-between",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-[11px] font-medium text-muted-foreground uppercase",
                                            children: "Payment Details"
                                        }, void 0, false, {
                                            fileName: "[project]/app/calendar/components/NewEnrollmentPackageInline.js",
                                            lineNumber: 1259,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-[10px] text-muted-foreground capitalize",
                                            children: form.billingType.replace(/_/g, " ")
                                        }, void 0, false, {
                                            fileName: "[project]/app/calendar/components/NewEnrollmentPackageInline.js",
                                            lineNumber: 1262,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/calendar/components/NewEnrollmentPackageInline.js",
                                    lineNumber: 1258,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center justify-between",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-[11px] text-muted-foreground",
                                            children: "Payable Balance"
                                        }, void 0, false, {
                                            fileName: "[project]/app/calendar/components/NewEnrollmentPackageInline.js",
                                            lineNumber: 1268,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-[13px] font-bold text-foreground",
                                            children: [
                                                "$",
                                                total.toFixed(2)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/calendar/components/NewEnrollmentPackageInline.js",
                                            lineNumber: 1269,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/calendar/components/NewEnrollmentPackageInline.js",
                                    lineNumber: 1267,
                                    columnNumber: 15
                                }, this),
                                total === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-[11px] text-muted-foreground",
                                    children: "This package is free — there is nothing to collect."
                                }, void 0, false, {
                                    fileName: "[project]/app/calendar/components/NewEnrollmentPackageInline.js",
                                    lineNumber: 1273,
                                    columnNumber: 17
                                }, this) : form.billingType === "pay_per_session" ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-[11px] text-muted-foreground",
                                    children: "No upfront payment. A charge is recorded automatically each time a session is booked."
                                }, void 0, false, {
                                    fileName: "[project]/app/calendar/components/NewEnrollmentPackageInline.js",
                                    lineNumber: 1277,
                                    columnNumber: 17
                                }, this) : form.billingType === "flexible" ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "space-y-2",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-center justify-between",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-[11px] text-muted-foreground",
                                                    children: "Initial payment due"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/calendar/components/NewEnrollmentPackageInline.js",
                                                    lineNumber: 1283,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-[12px] font-semibold text-foreground",
                                                    children: [
                                                        "$",
                                                        initialAmount.toFixed(2),
                                                        initialAmount > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "text-muted-foreground font-normal",
                                                            children: [
                                                                " · ",
                                                                fmtDate(form.billing.initialDate)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/app/calendar/components/NewEnrollmentPackageInline.js",
                                                            lineNumber: 1286,
                                                            columnNumber: 45
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/calendar/components/NewEnrollmentPackageInline.js",
                                                    lineNumber: 1284,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/calendar/components/NewEnrollmentPackageInline.js",
                                            lineNumber: 1282,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-center justify-between",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-[11px] text-muted-foreground",
                                                    children: "Remaining balance"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/calendar/components/NewEnrollmentPackageInline.js",
                                                    lineNumber: 1290,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-[12px] font-semibold text-foreground",
                                                    children: [
                                                        "$",
                                                        (total - initialAmount).toFixed(2)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/calendar/components/NewEnrollmentPackageInline.js",
                                                    lineNumber: 1291,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/calendar/components/NewEnrollmentPackageInline.js",
                                            lineNumber: 1289,
                                            columnNumber: 19
                                        }, this),
                                        form.billing.futurePayments.filter((c)=>Number(c.amount) > 0).length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "pt-2 border-t border-border space-y-1",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-[10px] font-medium text-muted-foreground uppercase",
                                                    children: "Future payments"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/calendar/components/NewEnrollmentPackageInline.js",
                                                    lineNumber: 1295,
                                                    columnNumber: 23
                                                }, this),
                                                form.billing.futurePayments.filter((c)=>Number(c.amount) > 0).map((c)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex items-center justify-between",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "text-[11px] text-muted-foreground",
                                                                children: fmtDate(c.dueDate)
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/calendar/components/NewEnrollmentPackageInline.js",
                                                                lineNumber: 1300,
                                                                columnNumber: 29
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "text-[11px] font-medium text-foreground",
                                                                children: [
                                                                    "$",
                                                                    Number(c.amount).toFixed(2)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/app/calendar/components/NewEnrollmentPackageInline.js",
                                                                lineNumber: 1301,
                                                                columnNumber: 29
                                                            }, this)
                                                        ]
                                                    }, c._key, true, {
                                                        fileName: "[project]/app/calendar/components/NewEnrollmentPackageInline.js",
                                                        lineNumber: 1299,
                                                        columnNumber: 27
                                                    }, this))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/calendar/components/NewEnrollmentPackageInline.js",
                                            lineNumber: 1294,
                                            columnNumber: 21
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "pt-2 border-t border-border",
                                            children: initialAmount > 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "space-y-2",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "text-[11px] font-medium text-foreground",
                                                        children: isLink ? "Send a payment link instead" : "Collect initial payment now"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/calendar/components/NewEnrollmentPackageInline.js",
                                                        lineNumber: 1309,
                                                        columnNumber: 25
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$payments$2f$PaymentMethodPicker$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                        methods: collectMethodOptions,
                                                        value: form.billing.method,
                                                        onChange: (v)=>setForm((p)=>({
                                                                    ...p,
                                                                    billing: {
                                                                        ...p.billing,
                                                                        method: v
                                                                    }
                                                                }))
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/calendar/components/NewEnrollmentPackageInline.js",
                                                        lineNumber: 1312,
                                                        columnNumber: 25
                                                    }, this),
                                                    isLink ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "space-y-1.5",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                className: "text-[11px] text-muted-foreground",
                                                                children: [
                                                                    "The enrollment is created unpaid, and a payment link for $",
                                                                    initialAmount.toFixed(2),
                                                                    " is sent to the customer right away."
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/app/calendar/components/NewEnrollmentPackageInline.js",
                                                                lineNumber: 1319,
                                                                columnNumber: 29
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$payments$2f$SendPaymentLinkMenu$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SendLinkChannelPicker"], {
                                                                value: form.billing.sendLinkChannel,
                                                                onChange: (v)=>setForm((p)=>({
                                                                            ...p,
                                                                            billing: {
                                                                                ...p.billing,
                                                                                sendLinkChannel: v
                                                                            }
                                                                        }))
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/calendar/components/NewEnrollmentPackageInline.js",
                                                                lineNumber: 1322,
                                                                columnNumber: 29
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/calendar/components/NewEnrollmentPackageInline.js",
                                                        lineNumber: 1318,
                                                        columnNumber: 27
                                                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                                        children: [
                                                            form.billing.method === "ach" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "flex items-center justify-between gap-3 rounded-lg border border-primary/30 bg-primary/5 px-3 py-2",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                        className: "text-[11px] text-foreground",
                                                                        children: "Bank transfer redirects off-screen — send a link and let the customer pay from their phone instead."
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/calendar/components/NewEnrollmentPackageInline.js",
                                                                        lineNumber: 1331,
                                                                        columnNumber: 33
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                        type: "button",
                                                                        onClick: ()=>setForm((p)=>({
                                                                                    ...p,
                                                                                    billing: {
                                                                                        ...p.billing,
                                                                                        method: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$paymentMethods$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SHARE_LINK_METHOD"].value
                                                                                    }
                                                                                })),
                                                                        className: "shrink-0 rounded-md bg-primary px-2.5 py-1.5 text-[11px] font-semibold text-primary-foreground hover:opacity-90",
                                                                        children: "Send link instead"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/calendar/components/NewEnrollmentPackageInline.js",
                                                                        lineNumber: 1335,
                                                                        columnNumber: 33
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/app/calendar/components/NewEnrollmentPackageInline.js",
                                                                lineNumber: 1330,
                                                                columnNumber: 31
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$payments$2f$TerminalDeviceField$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                                method: form.billing.method,
                                                                locationID: locationID,
                                                                deviceID: deviceID,
                                                                onDeviceChange: setDeviceID
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/calendar/components/NewEnrollmentPackageInline.js",
                                                                lineNumber: 1346,
                                                                columnNumber: 29
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$payments$2f$SavedCardField$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                                method: form.billing.method,
                                                                locationID: locationID,
                                                                customerID: customerID,
                                                                cardToken: savedCardID,
                                                                onCardChange: setSavedCardID
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/calendar/components/NewEnrollmentPackageInline.js",
                                                                lineNumber: 1352,
                                                                columnNumber: 29
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$payments$2f$WalletShortfallField$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                                method: form.billing.method,
                                                                balance: walletBalance,
                                                                amountDue: collectAmt,
                                                                walletAmount: form.billing.walletAmount,
                                                                onWalletAmountChange: (v)=>setForm((p)=>({
                                                                            ...p,
                                                                            billing: {
                                                                                ...p.billing,
                                                                                walletAmount: v
                                                                            }
                                                                        })),
                                                                shortfallMethod: form.billing.shortfallMethod,
                                                                onShortfallMethodChange: (v)=>setForm((p)=>({
                                                                            ...p,
                                                                            billing: {
                                                                                ...p.billing,
                                                                                shortfallMethod: v
                                                                            }
                                                                        }))
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/calendar/components/NewEnrollmentPackageInline.js",
                                                                lineNumber: 1359,
                                                                columnNumber: 29
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$payments$2f$CheckNumberField$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                                method: chargeMethod,
                                                                checkNumber: checkNumber,
                                                                onChange: setCheckNumber
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/calendar/components/NewEnrollmentPackageInline.js",
                                                                lineNumber: 1368,
                                                                columnNumber: 29
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/calendar/components/NewEnrollmentPackageInline.js",
                                                        lineNumber: 1328,
                                                        columnNumber: 27
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/calendar/components/NewEnrollmentPackageInline.js",
                                                lineNumber: 1308,
                                                columnNumber: 23
                                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-[11px] text-muted-foreground",
                                                children: "No payment is due at enrollment."
                                            }, void 0, false, {
                                                fileName: "[project]/app/calendar/components/NewEnrollmentPackageInline.js",
                                                lineNumber: 1377,
                                                columnNumber: 23
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/app/calendar/components/NewEnrollmentPackageInline.js",
                                            lineNumber: 1306,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-[10px] text-muted-foreground pt-1",
                                            children: "To change any amount or date, go back to Step 1."
                                        }, void 0, false, {
                                            fileName: "[project]/app/calendar/components/NewEnrollmentPackageInline.js",
                                            lineNumber: 1380,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/calendar/components/NewEnrollmentPackageInline.js",
                                    lineNumber: 1281,
                                    columnNumber: 17
                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-center justify-between",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-[11px] font-medium text-foreground",
                                                    children: collectsFirstInstallment ? "Collect first installment now" : "Collect payment now"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/calendar/components/NewEnrollmentPackageInline.js",
                                                    lineNumber: 1387,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    type: "button",
                                                    onClick: ()=>setForm((p)=>({
                                                                ...p,
                                                                billing: {
                                                                    ...p.billing,
                                                                    collectNow: !p.billing.collectNow
                                                                }
                                                            })),
                                                    className: `relative h-5 w-9 rounded-full transition-colors ${form.billing.collectNow ? "bg-primary" : "bg-muted-foreground/30"}`,
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: `absolute top-0.5 left-0.5 h-4 w-4 rounded-full bg-white shadow transition-transform ${form.billing.collectNow ? "translate-x-4" : "translate-x-0"}`
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/calendar/components/NewEnrollmentPackageInline.js",
                                                        lineNumber: 1402,
                                                        columnNumber: 23
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/app/calendar/components/NewEnrollmentPackageInline.js",
                                                    lineNumber: 1390,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/calendar/components/NewEnrollmentPackageInline.js",
                                            lineNumber: 1386,
                                            columnNumber: 19
                                        }, this),
                                        form.billing.collectNow && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "space-y-2",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "relative",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "absolute left-2.5 top-1/2 -translate-y-1/2 text-[11px] text-muted-foreground",
                                                            children: "$"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/calendar/components/NewEnrollmentPackageInline.js",
                                                            lineNumber: 1413,
                                                            columnNumber: 25
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                            type: "number",
                                                            min: "0",
                                                            step: "any",
                                                            placeholder: "0.00",
                                                            value: form.billing.collectAmount,
                                                            readOnly: collectAmountIsFixed,
                                                            onChange: (e)=>setForm((p)=>({
                                                                        ...p,
                                                                        billing: {
                                                                            ...p.billing,
                                                                            collectAmount: e.target.value
                                                                        }
                                                                    })),
                                                            className: `h-9 w-full rounded-lg border border-border pl-6 pr-3 text-[12px] outline-none focus:border-primary ${collectAmountIsFixed ? "bg-muted/30 text-muted-foreground" : "bg-background"}`
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/calendar/components/NewEnrollmentPackageInline.js",
                                                            lineNumber: 1414,
                                                            columnNumber: 25
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/calendar/components/NewEnrollmentPackageInline.js",
                                                    lineNumber: 1412,
                                                    columnNumber: 23
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$payments$2f$PaymentMethodPicker$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                    methods: collectMethodOptions,
                                                    value: form.billing.method,
                                                    onChange: (v)=>setForm((p)=>({
                                                                ...p,
                                                                billing: {
                                                                    ...p.billing,
                                                                    method: v
                                                                }
                                                            }))
                                                }, void 0, false, {
                                                    fileName: "[project]/app/calendar/components/NewEnrollmentPackageInline.js",
                                                    lineNumber: 1432,
                                                    columnNumber: 23
                                                }, this),
                                                form.billing.method === "ach" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex items-center justify-between gap-3 rounded-lg border border-primary/30 bg-primary/5 px-3 py-2",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "text-[11px] text-foreground",
                                                            children: "Bank transfer redirects off-screen — send a link and let the customer pay from their phone instead."
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/calendar/components/NewEnrollmentPackageInline.js",
                                                            lineNumber: 1439,
                                                            columnNumber: 27
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                            type: "button",
                                                            onClick: ()=>setForm((p)=>({
                                                                        ...p,
                                                                        billing: {
                                                                            ...p.billing,
                                                                            method: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$paymentMethods$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SHARE_LINK_METHOD"].value
                                                                        }
                                                                    })),
                                                            className: "shrink-0 rounded-md bg-primary px-2.5 py-1.5 text-[11px] font-semibold text-primary-foreground hover:opacity-90",
                                                            children: "Send link instead"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/calendar/components/NewEnrollmentPackageInline.js",
                                                            lineNumber: 1443,
                                                            columnNumber: 27
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/calendar/components/NewEnrollmentPackageInline.js",
                                                    lineNumber: 1438,
                                                    columnNumber: 25
                                                }, this),
                                                isLink && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "space-y-1.5",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "text-[11px] text-muted-foreground",
                                                            children: "The enrollment is created unpaid, and a payment link is sent to the customer right away."
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/calendar/components/NewEnrollmentPackageInline.js",
                                                            lineNumber: 1456,
                                                            columnNumber: 27
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$payments$2f$SendPaymentLinkMenu$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SendLinkChannelPicker"], {
                                                            value: form.billing.sendLinkChannel,
                                                            onChange: (v)=>setForm((p)=>({
                                                                        ...p,
                                                                        billing: {
                                                                            ...p.billing,
                                                                            sendLinkChannel: v
                                                                        }
                                                                    }))
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/calendar/components/NewEnrollmentPackageInline.js",
                                                            lineNumber: 1459,
                                                            columnNumber: 27
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/calendar/components/NewEnrollmentPackageInline.js",
                                                    lineNumber: 1455,
                                                    columnNumber: 25
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/calendar/components/NewEnrollmentPackageInline.js",
                                            lineNumber: 1411,
                                            columnNumber: 21
                                        }, this),
                                        form.billing.collectNow && !isLink && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$payments$2f$TerminalDeviceField$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                            method: form.billing.method,
                                            locationID: locationID,
                                            deviceID: deviceID,
                                            onDeviceChange: setDeviceID
                                        }, void 0, false, {
                                            fileName: "[project]/app/calendar/components/NewEnrollmentPackageInline.js",
                                            lineNumber: 1468,
                                            columnNumber: 21
                                        }, this),
                                        form.billing.collectNow && !isLink && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$payments$2f$SavedCardField$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                            method: form.billing.method,
                                            locationID: locationID,
                                            customerID: customerID,
                                            cardToken: savedCardID,
                                            onCardChange: setSavedCardID
                                        }, void 0, false, {
                                            fileName: "[project]/app/calendar/components/NewEnrollmentPackageInline.js",
                                            lineNumber: 1476,
                                            columnNumber: 21
                                        }, this),
                                        form.billing.collectNow && !isLink && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$payments$2f$WalletShortfallField$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                            method: form.billing.method,
                                            balance: walletBalance,
                                            amountDue: collectAmt,
                                            walletAmount: form.billing.walletAmount,
                                            onWalletAmountChange: (v)=>setForm((p)=>({
                                                        ...p,
                                                        billing: {
                                                            ...p.billing,
                                                            walletAmount: v
                                                        }
                                                    })),
                                            shortfallMethod: form.billing.shortfallMethod,
                                            onShortfallMethodChange: (v)=>setForm((p)=>({
                                                        ...p,
                                                        billing: {
                                                            ...p.billing,
                                                            shortfallMethod: v
                                                        }
                                                    }))
                                        }, void 0, false, {
                                            fileName: "[project]/app/calendar/components/NewEnrollmentPackageInline.js",
                                            lineNumber: 1485,
                                            columnNumber: 21
                                        }, this),
                                        form.billing.collectNow && !isLink && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$payments$2f$CheckNumberField$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                            method: chargeMethod,
                                            checkNumber: checkNumber,
                                            onChange: setCheckNumber
                                        }, void 0, false, {
                                            fileName: "[project]/app/calendar/components/NewEnrollmentPackageInline.js",
                                            lineNumber: 1496,
                                            columnNumber: 21
                                        }, this),
                                        form.billing.collectNow && !isLink && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "space-y-1",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                    className: "text-[11px] text-muted-foreground",
                                                    children: "Payment date"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/calendar/components/NewEnrollmentPackageInline.js",
                                                    lineNumber: 1504,
                                                    columnNumber: 23
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                    type: "date",
                                                    value: effectiveCollectDate,
                                                    onChange: (e)=>{
                                                        setCollectDateTouched(true);
                                                        setForm((p)=>({
                                                                ...p,
                                                                billing: {
                                                                    ...p.billing,
                                                                    collectDate: e.target.value
                                                                }
                                                            }));
                                                    },
                                                    className: "h-9 w-full rounded-lg border border-border bg-background px-3 text-[12px] outline-none focus:border-primary"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/calendar/components/NewEnrollmentPackageInline.js",
                                                    lineNumber: 1505,
                                                    columnNumber: 23
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/calendar/components/NewEnrollmentPackageInline.js",
                                            lineNumber: 1503,
                                            columnNumber: 21
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/calendar/components/NewEnrollmentPackageInline.js",
                                    lineNumber: 1385,
                                    columnNumber: 17
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/calendar/components/NewEnrollmentPackageInline.js",
                            lineNumber: 1257,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/calendar/components/NewEnrollmentPackageInline.js",
                        lineNumber: 1256,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/calendar/components/NewEnrollmentPackageInline.js",
                lineNumber: 661,
                columnNumber: 7
            }, this),
            step === 2 && !readerCollectsTip && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "shrink-0 mt-3 rounded-lg border border-border bg-muted/20 p-3 space-y-2",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center justify-between",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-[11px] font-medium text-muted-foreground",
                                children: "Add a tip?"
                            }, void 0, false, {
                                fileName: "[project]/app/calendar/components/NewEnrollmentPackageInline.js",
                                lineNumber: 1531,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                onClick: ()=>setForm((p)=>({
                                            ...p,
                                            tip: {
                                                ...p.tip,
                                                enabled: !p.tip.enabled
                                            }
                                        })),
                                className: `relative h-5 w-9 rounded-full transition-colors ${form.tip.enabled ? "bg-primary" : "bg-muted-foreground/30"}`,
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: `absolute top-0.5 left-0.5 h-4 w-4 rounded-full bg-white shadow transition-transform ${form.tip.enabled ? "translate-x-4" : "translate-x-0"}`
                                }, void 0, false, {
                                    fileName: "[project]/app/calendar/components/NewEnrollmentPackageInline.js",
                                    lineNumber: 1546,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/app/calendar/components/NewEnrollmentPackageInline.js",
                                lineNumber: 1534,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/calendar/components/NewEnrollmentPackageInline.js",
                        lineNumber: 1530,
                        columnNumber: 11
                    }, this),
                    form.tip.enabled && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex gap-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "relative flex-1",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "absolute left-2.5 top-1/2 -translate-y-1/2 text-[12px] text-muted-foreground",
                                        children: "$"
                                    }, void 0, false, {
                                        fileName: "[project]/app/calendar/components/NewEnrollmentPackageInline.js",
                                        lineNumber: 1556,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        type: "number",
                                        min: "0",
                                        step: "any",
                                        placeholder: "0.00",
                                        value: form.tip.amount,
                                        onChange: (e)=>setForm((p)=>({
                                                    ...p,
                                                    tip: {
                                                        ...p.tip,
                                                        amount: e.target.value
                                                    }
                                                })),
                                        className: "h-9 w-full rounded-lg border border-border bg-background pl-6 pr-3 text-[12px] outline-none focus:border-primary"
                                    }, void 0, false, {
                                        fileName: "[project]/app/calendar/components/NewEnrollmentPackageInline.js",
                                        lineNumber: 1559,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/calendar/components/NewEnrollmentPackageInline.js",
                                lineNumber: 1555,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "relative w-32",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                        value: form.tip.method,
                                        onChange: (e)=>setForm((p)=>({
                                                    ...p,
                                                    tip: {
                                                        ...p.tip,
                                                        method: e.target.value
                                                    }
                                                })),
                                        className: "h-9 w-full appearance-none rounded-lg border border-border bg-background px-3 pr-8 text-[12px] capitalize",
                                        children: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$paymentMethods$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TIP_METHODS"].map((m)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: m.value,
                                                children: m.label
                                            }, m.value, false, {
                                                fileName: "[project]/app/calendar/components/NewEnrollmentPackageInline.js",
                                                lineNumber: 1586,
                                                columnNumber: 21
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/app/calendar/components/NewEnrollmentPackageInline.js",
                                        lineNumber: 1575,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDown$3e$__["ChevronDown"], {
                                        className: "pointer-events-none absolute right-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground"
                                    }, void 0, false, {
                                        fileName: "[project]/app/calendar/components/NewEnrollmentPackageInline.js",
                                        lineNumber: 1591,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/calendar/components/NewEnrollmentPackageInline.js",
                                lineNumber: 1574,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/calendar/components/NewEnrollmentPackageInline.js",
                        lineNumber: 1554,
                        columnNumber: 13
                    }, this),
                    form.tip.enabled && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-[10px] text-muted-foreground",
                        children: form.teacherID ? "Goes to this teacher, or to the studio tip pool if this location pools tips (Settings → Studio → Locations)." : "No teacher on this enrollment — it goes to the studio tip pool if this location pools tips, otherwise it is recorded without a teacher."
                    }, void 0, false, {
                        fileName: "[project]/app/calendar/components/NewEnrollmentPackageInline.js",
                        lineNumber: 1596,
                        columnNumber: 13
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/calendar/components/NewEnrollmentPackageInline.js",
                lineNumber: 1529,
                columnNumber: 9
            }, this),
            error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "text-[11px] text-destructive mt-2",
                children: error
            }, void 0, false, {
                fileName: "[project]/app/calendar/components/NewEnrollmentPackageInline.js",
                lineNumber: 1605,
                columnNumber: 17
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex justify-between gap-2 pt-2 mt-auto border-t border-border/60",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        className: "h-8 px-3 rounded-lg border border-border text-[11px]",
                        onClick: step === 1 ? onCancel : ()=>{
                            setError("");
                            setStep(1);
                        },
                        children: step === 1 ? "Cancel" : "Back"
                    }, void 0, false, {
                        fileName: "[project]/app/calendar/components/NewEnrollmentPackageInline.js",
                        lineNumber: 1608,
                        columnNumber: 9
                    }, this),
                    step === 1 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        className: "h-8 px-3 rounded-lg bg-brand text-brand-foreground text-[11px] font-semibold disabled:opacity-60",
                        onClick: goToPayment,
                        disabled: serviceOnly ? form.services.length === 0 : !form.packageID,
                        children: "Next: Payment →"
                    }, void 0, false, {
                        fileName: "[project]/app/calendar/components/NewEnrollmentPackageInline.js",
                        lineNumber: 1616,
                        columnNumber: 11
                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        className: "h-8 px-3 rounded-lg bg-brand text-brand-foreground text-[11px] font-semibold disabled:opacity-60",
                        onClick: ()=>handleSubmit(),
                        disabled: loading || (serviceOnly ? form.services.length === 0 : !form.packageID) || walletOver || cloverNotConnected || terminalNotSelected || savedCardNotSelected,
                        children: loading ? "Creating…" : payWithClover ? "Pay by card" : serviceOnly ? "Create Enrollment & Services" : "Create Enrollment & Package"
                    }, void 0, false, {
                        fileName: "[project]/app/calendar/components/NewEnrollmentPackageInline.js",
                        lineNumber: 1625,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/calendar/components/NewEnrollmentPackageInline.js",
                lineNumber: 1607,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/calendar/components/NewEnrollmentPackageInline.js",
        lineNumber: 651,
        columnNumber: 5
    }, this);
}
_s1(NewEnrollmentPackageInline, "AMGJXWRTBq5uXSxnIG2b/1lslPM=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$settings$2f$payments$2f$useCardProcessor$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCardProcessor"]
    ];
});
_c1 = NewEnrollmentPackageInline;
var _c, _c1;
__turbopack_context__.k.register(_c, "ServicePicker");
__turbopack_context__.k.register(_c1, "NewEnrollmentPackageInline");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/dashboard/page.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Dashboard
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$layout$2f$MainLayout$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/layout/MainLayout.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dashboard$2f$AdminDashboard$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/dashboard/AdminDashboard.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dashboard$2d$builder$2f$DashboardBuilder$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/dashboard-builder/DashboardBuilder.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dashboard$2d$builder$2f$DateRangePresets$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/dashboard-builder/DateRangePresets.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dashboard$2f$widgets$2f$registry$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/components/dashboard/widgets/registry.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$owner$2d$dashboard$2f$widgets$2f$registry$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/owner-dashboard/widgets/registry.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$permissions$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/lib/permissions.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$hooks$2f$useAnalyticsOverview$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/hooks/useAnalyticsOverview.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/button.js [app-client] (ecmascript)");
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
function Dashboard() {
    _s();
    const admin = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$permissions$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["isAdmin"])();
    const visibleOwnerWidgets = __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$owner$2d$dashboard$2f$widgets$2f$registry$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ownerDashboardWidgetRegistry"].filter((w)=>!w.permission || (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$permissions$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["hasPermission"])(w.permission.category, w.permission.module, 'read'));
    const visibleRegularWidgets = __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dashboard$2f$widgets$2f$registry$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["dashboardWidgetRegistry"].filter((w)=>!w.permission || (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$permissions$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["hasPermission"])(w.permission.category, w.permission.module, 'read'));
    const canSeeOwnerOverview = visibleOwnerWidgets.length > 0;
    const visibleWidgets = admin ? visibleOwnerWidgets : [
        ...visibleOwnerWidgets,
        ...visibleRegularWidgets
    ];
    const canSeeDashboard = visibleWidgets.length > 0;
    const [range, setRange] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(30);
    const { data: overview, error, isLoading, isValidating, mutate } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$hooks$2f$useAnalyticsOverview$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useDashboardOverview"])(range, {
        enabled: !admin && canSeeDashboard
    });
    // Owner-overview widgets each manage their own date range (see withOwnRange
    // in components/owner-dashboard/widgets/registry.js), seeded from `range`
    // below as their shared default. This call also warms the SWR cache for that
    // default range before the grid mounts, so widgets don't each show their own
    // loading skeleton on first paint.
    const { isLoading: ownerWarmingUp } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$hooks$2f$useAnalyticsOverview$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useOwnerDashboardOverview"])(range, {
        enabled: canSeeOwnerOverview
    });
    if (admin) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$layout$2f$MainLayout$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
            title: "Dashboard",
            subtitle: "Welcome back",
            children: [
                canSeeOwnerOverview && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "animate-fade-in mb-6",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dashboard$2d$builder$2f$DashboardBuilder$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        page: "owner-dashboard",
                        widgets: visibleWidgets,
                        sharedProps: {
                            defaultRange: range
                        },
                        dataLoading: ownerWarmingUp,
                        toolbarExtra: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dashboard$2d$builder$2f$DateRangePresets$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                            value: range,
                            onChange: setRange
                        }, void 0, false, {
                            fileName: "[project]/app/dashboard/page.js",
                            lineNumber: 56,
                            columnNumber: 29
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/dashboard/page.js",
                        lineNumber: 51,
                        columnNumber: 13
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/app/dashboard/page.js",
                    lineNumber: 50,
                    columnNumber: 11
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dashboard$2f$AdminDashboard$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                    fileName: "[project]/app/dashboard/page.js",
                    lineNumber: 60,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/app/dashboard/page.js",
            lineNumber: 48,
            columnNumber: 7
        }, this);
    }
    const dataLoading = isLoading && !overview || ownerWarmingUp;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$layout$2f$MainLayout$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
        title: "Dashboard",
        children: [
            error && !overview && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mb-4 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-destructive/30 bg-destructive/5 px-4 py-3",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-sm text-foreground",
                        children: [
                            "Couldn’t load dashboard data.",
                            ' ',
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-muted-foreground",
                                children: error.message || 'Please try again.'
                            }, void 0, false, {
                                fileName: "[project]/app/dashboard/page.js",
                                lineNumber: 73,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/dashboard/page.js",
                        lineNumber: 71,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                        variant: "outline",
                        size: "sm",
                        className: "h-8",
                        onClick: ()=>mutate(),
                        children: "Retry"
                    }, void 0, false, {
                        fileName: "[project]/app/dashboard/page.js",
                        lineNumber: 75,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/dashboard/page.js",
                lineNumber: 70,
                columnNumber: 9
            }, this),
            canSeeDashboard ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dashboard$2d$builder$2f$DashboardBuilder$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                page: "dashboard",
                widgets: visibleWidgets,
                sharedProps: {
                    ...overview || {},
                    defaultRange: range
                },
                dataLoading: dataLoading,
                toolbarExtra: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex items-center gap-2",
                    children: [
                        isValidating && overview && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "text-[11px] text-muted-foreground",
                            children: "Updating…"
                        }, void 0, false, {
                            fileName: "[project]/app/dashboard/page.js",
                            lineNumber: 90,
                            columnNumber: 17
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dashboard$2d$builder$2f$DateRangePresets$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                            value: range,
                            onChange: setRange
                        }, void 0, false, {
                            fileName: "[project]/app/dashboard/page.js",
                            lineNumber: 92,
                            columnNumber: 15
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/dashboard/page.js",
                    lineNumber: 88,
                    columnNumber: 13
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/dashboard/page.js",
                lineNumber: 82,
                columnNumber: 9
            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "rounded-2xl border border-dashed border-border py-16 text-center",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-sm font-medium text-foreground",
                        children: "Nothing to show yet"
                    }, void 0, false, {
                        fileName: "[project]/app/dashboard/page.js",
                        lineNumber: 98,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "mt-1 text-sm text-muted-foreground",
                        children: "Ask an admin to grant you a dashboard permission in Settings → Roles."
                    }, void 0, false, {
                        fileName: "[project]/app/dashboard/page.js",
                        lineNumber: 99,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/dashboard/page.js",
                lineNumber: 97,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/dashboard/page.js",
        lineNumber: 68,
        columnNumber: 5
    }, this);
}
_s(Dashboard, "jH3KAUdU0cUpj7K63qsy7o5sCj0=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$hooks$2f$useAnalyticsOverview$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useDashboardOverview"],
        __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$hooks$2f$useAnalyticsOverview$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useOwnerDashboardOverview"]
    ];
});
_c = Dashboard;
var _c;
__turbopack_context__.k.register(_c, "Dashboard");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/leads/components/LeadsDialog.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>LeadsDialog
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$dialog$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/dialog.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$input$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/input.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/button.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$switch$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/switch.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$user$2d$plus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__UserPlus$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/user-plus.js [app-client] (ecmascript) <export default as UserPlus>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$calendar$2d$clock$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CalendarClock$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/calendar-clock.js [app-client] (ecmascript) <export default as CalendarClock>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trash$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Trash2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/trash-2.js [app-client] (ecmascript) <export default as Trash2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sticky$2d$note$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__StickyNote$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/sticky-note.js [app-client] (ecmascript) <export default as StickyNote>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$send$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Send$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/send.js [app-client] (ecmascript) <export default as Send>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$users$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Users$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/users.js [app-client] (ecmascript) <export default as Users>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$pencil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Pencil$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/pencil.js [app-client] (ecmascript) <export default as Pencil>");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/api.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/auth.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$toast$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/toast.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/utils.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$shared$2f$LocationSelector$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/shared/LocationSelector.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$shared$2f$PhoneNumberInput$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/shared/PhoneNumberInput.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$lead$2d$stages$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/lead-stages.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$lead$2d$filter$2d$fields$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/lead-filter-fields.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$dynamic$2d$list$2d$normalize$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/dynamic-list-normalize.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$leads$2f$LeadEngagementHistory$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/leads/LeadEngagementHistory.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$lead$2d$source$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/lead-source.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature(), _s2 = __turbopack_context__.k.signature();
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
;
;
;
;
;
;
const CLICK_ID_LABELS = {
    gclid: 'Google Ads click',
    gbraid: 'Google Ads click',
    wbraid: 'Google Ads click',
    fbclid: 'Meta click',
    msclkid: 'Microsoft Ads click',
    ttclid: 'TikTok Ads click',
    li_fat_id: 'LinkedIn Ads click'
};
function LeadSourceDetails({ lead }) {
    const attribution = lead.attribution || {};
    const clickLabels = [
        ...new Set(Object.keys(attribution.clickIds || {}).map((k)=>CLICK_ID_LABELS[k]).filter(Boolean))
    ];
    const first = attribution.firstTouch;
    const showFirst = first?.source && first.source !== lead.utm_source;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "md:col-span-2",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                className: "block text-sm font-medium mb-1",
                children: "Lead source"
            }, void 0, false, {
                fileName: "[project]/app/leads/components/LeadsDialog.js",
                lineNumber: 38,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "w-full space-y-1 px-3 py-2 border border-border rounded-md bg-muted/30 text-sm text-foreground",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "font-medium",
                                children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$lead$2d$source$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatLeadSource"])(lead.utm_source) || 'Unknown'
                            }, void 0, false, {
                                fileName: "[project]/app/leads/components/LeadsDialog.js",
                                lineNumber: 41,
                                columnNumber: 11
                            }, this),
                            lead.utm_medium ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-muted-foreground",
                                children: [
                                    " · ",
                                    lead.utm_medium
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/leads/components/LeadsDialog.js",
                                lineNumber: 42,
                                columnNumber: 30
                            }, this) : null,
                            lead.utm_campaign ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-muted-foreground",
                                children: [
                                    " · Campaign: ",
                                    lead.utm_campaign
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/leads/components/LeadsDialog.js",
                                lineNumber: 43,
                                columnNumber: 32
                            }, this) : null
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/leads/components/LeadsDialog.js",
                        lineNumber: 40,
                        columnNumber: 9
                    }, this),
                    clickLabels.length ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-xs text-muted-foreground",
                        children: clickLabels.join(', ')
                    }, void 0, false, {
                        fileName: "[project]/app/leads/components/LeadsDialog.js",
                        lineNumber: 45,
                        columnNumber: 31
                    }, this) : null,
                    showFirst ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-xs text-muted-foreground",
                        children: [
                            "First came from ",
                            (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$lead$2d$source$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatLeadSource"])(first.source)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/leads/components/LeadsDialog.js",
                        lineNumber: 47,
                        columnNumber: 11
                    }, this) : null,
                    attribution.landingPage ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "truncate text-xs text-muted-foreground",
                        title: attribution.landingPage,
                        children: [
                            "Landed on ",
                            attribution.landingPage
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/leads/components/LeadsDialog.js",
                        lineNumber: 50,
                        columnNumber: 11
                    }, this) : null
                ]
            }, void 0, true, {
                fileName: "[project]/app/leads/components/LeadsDialog.js",
                lineNumber: 39,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/leads/components/LeadsDialog.js",
        lineNumber: 37,
        columnNumber: 5
    }, this);
}
_c = LeadSourceDetails;
const bookingStatusOptions = [
    {
        value: 'Not Booked',
        label: 'Not Booked'
    },
    {
        value: 'Booked',
        label: 'Booked'
    }
];
// Mirrors the customer member schema (customer.model.js `memberSchema`) so a
// lead's couple/family carries over 1:1 when the lead is converted.
const MEMBER_GENDER_OPTIONS = [
    {
        value: 'male',
        label: 'Male'
    },
    {
        value: 'female',
        label: 'Female'
    },
    {
        value: 'other',
        label: 'Other'
    },
    {
        value: 'prefer_not_to_say',
        label: 'Prefer not to say'
    }
];
const emptyMember = {
    name: '',
    email: '',
    phoneNumber: '',
    dateOfBirth: '',
    gender: '',
    relationship: '',
    notes: ''
};
function memberFromRecord(member = {}) {
    return {
        name: member.name || '',
        email: member.email || '',
        phoneNumber: member.phoneNumber || '',
        dateOfBirth: member.dateOfBirth ? String(member.dateOfBirth).slice(0, 10) : '',
        gender: member.gender || '',
        relationship: member.relationship || '',
        notes: member.notes || ''
    };
}
// Trim + drop empty optionals; the backend requires only `name`.
function sanitizeMember(member = {}) {
    return {
        name: (member.name || '').trim(),
        email: (member.email || '').trim() || undefined,
        phoneNumber: (member.phoneNumber || '').trim() || undefined,
        dateOfBirth: member.dateOfBirth ? String(member.dateOfBirth).slice(0, 10) : undefined,
        gender: member.gender || undefined,
        relationship: (member.relationship || '').trim() || undefined,
        notes: (member.notes || '').trim() || undefined
    };
}
function cleanLeadMembers(members) {
    return (Array.isArray(members) ? members : []).map(sanitizeMember).filter((m)=>m.name);
}
function defaultLeadLocationIDs() {
    const branch = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getEffectiveBranch"])();
    return branch ? [
        String(branch)
    ] : [];
}
function emptyAddress() {
    return {
        street: '',
        city: '',
        state: '',
        zipCode: '',
        country: 'USA'
    };
}
// Address only goes on the wire when the person actually gave one — a bare
// "USA" is the placeholder, not a real address.
function cleanAddress(address) {
    const a = address || {};
    const out = {
        street: (a.street || '').trim(),
        city: (a.city || '').trim(),
        state: (a.state || '').trim(),
        zipCode: (a.zipCode || '').trim(),
        country: (a.country || '').trim() || 'USA'
    };
    return out.street || out.city || out.state || out.zipCode ? out : undefined;
}
const emptyLead = {
    name: '',
    email: '',
    phoneNumber: '',
    dateOfBirth: '',
    gender: '',
    location: '',
    locationID: [],
    stage: 'new',
    reason: '',
    bookingStatus: 'Not Booked',
    assignedAiAgent: '',
    assignedHumanAgent: '',
    isEscalated: false,
    agentFollowupEnabled: true,
    callbackDate: '',
    notes: '',
    members: []
};
function createEmptyLead() {
    return {
        ...emptyLead,
        locationID: defaultLeadLocationIDs(),
        address: emptyAddress(),
        members: []
    };
}
function addressFromRecord(address) {
    const a = address || {};
    return {
        street: a.street || '',
        city: a.city || '',
        state: a.state || '',
        zipCode: a.zipCode || '',
        country: a.country || 'USA'
    };
}
const toDateInputValue = (value)=>value ? String(value).slice(0, 10) : '';
// Stable default — a fresh `[]` per render would retrigger the open effect forever.
const NO_LEADS = [];
function LeadsDialog({ open, onClose, leads = NO_LEADS, onRefresh, initialLeadId = null, viewOnly = false, leadReasons = [] }) {
    _s();
    const [editingLead, setEditingLead] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [mode, setMode] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('create');
    const [savingCallbackDate, setSavingCallbackDate] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [savedCallbackDate, setSavedCallbackDate] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [sendingPaymentLink, setSendingPaymentLink] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [paymentLinkForm, setPaymentLinkForm] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        amount: '',
        description: 'Intro Lesson',
        channel: 'sms',
        showForm: false
    });
    const toast = (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$toast$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useToast"])();
    const { stages: stageOptions } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$lead$2d$stages$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLeadStages"])();
    const reasonOptions = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$lead$2d$filter$2d$fields$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getLeadReasonOptions"])(leadReasons);
    const PAYMENT_LINK_STAGES = new Set([
        'engaged',
        're_engaged',
        'pending_payment'
    ]);
    async function handleSendPaymentLink() {
        if (!editingLead?._id) return;
        const { amount, description, channel } = paymentLinkForm;
        if (!amount || isNaN(Number(amount)) || Number(amount) <= 0) {
            toast.error({
                title: 'Validation',
                message: 'Enter a valid amount'
            });
            return;
        }
        if (!description) {
            toast.error({
                title: 'Validation',
                message: 'Enter a description'
            });
            return;
        }
        setSendingPaymentLink(true);
        const result = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].post('/api/payment-request/lead', {
            leadID: editingLead._id,
            amount: Number(amount),
            description,
            channel
        });
        setSendingPaymentLink(false);
        if (result.success) {
            toast.success({
                title: 'Payment link sent',
                message: `$${Number(amount).toFixed(2)} link sent via ${channel.toUpperCase()}`
            });
            setPaymentLinkForm((p)=>({
                    ...p,
                    showForm: false
                }));
            onRefresh?.();
        } else {
            toast.error({
                title: 'Failed to send',
                message: result.error || 'Unable to send the payment link'
            });
        }
    }
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "LeadsDialog.useEffect": ()=>{
            if (!open) {
                setEditingLead(null);
                setMode('create');
                return;
            }
            if (!initialLeadId) {
                setEditingLead(createEmptyLead());
                setMode('create');
                return;
            }
            const toEditable = {
                "LeadsDialog.useEffect.toEditable": (lead)=>({
                        ...lead,
                        callbackDate: toDateInputValue(lead.callbackDate),
                        dateOfBirth: toDateInputValue(lead.dateOfBirth),
                        gender: lead.gender || '',
                        address: addressFromRecord(lead.address),
                        notes: Array.isArray(lead.notes) ? lead.notes : [],
                        members: Array.isArray(lead.members) ? lead.members : []
                    })
            }["LeadsDialog.useEffect.toEditable"];
            // Lead may not be in `leads` (e.g. opened by ID from a dashboard drill-down)
            // — then nothing renders until the fetch below fills it in.
            const found = leads?.find({
                "LeadsDialog.useEffect": (l)=>l._id === initialLeadId
            }["LeadsDialog.useEffect"]);
            setEditingLead(found ? toEditable(found) : null);
            setSavedCallbackDate(found ? toDateInputValue(found.callbackDate) : '');
            setMode(viewOnly ? 'view' : 'edit');
            // The leads list payload may omit actualReason / members / personal
            // details; fetch the full record to fill them in.
            __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].get(`/api/lead/${initialLeadId}`).then({
                "LeadsDialog.useEffect": (res)=>{
                    if (!res?.success || !res.data) return;
                    if (!found) setSavedCallbackDate(toDateInputValue(res.data.callbackDate));
                    setEditingLead({
                        "LeadsDialog.useEffect": (prev)=>{
                            if (!prev) return found ? prev : toEditable(res.data);
                            if (prev._id !== initialLeadId) return prev;
                            return {
                                ...prev,
                                actualReason: res.data.actualReason,
                                dateOfBirth: toDateInputValue(res.data.dateOfBirth) || prev.dateOfBirth,
                                gender: res.data.gender || prev.gender,
                                address: res.data.address ? addressFromRecord(res.data.address) : prev.address,
                                members: Array.isArray(res.data.members) ? res.data.members : prev.members || [],
                                engagementHistory: Array.isArray(res.data.engagementHistory) ? res.data.engagementHistory : prev.engagementHistory || [],
                                createdAt: res.data.createdAt || prev.createdAt,
                                utm_source: res.data.utm_source ?? prev.utm_source,
                                utm_medium: res.data.utm_medium ?? prev.utm_medium,
                                utm_campaign: res.data.utm_campaign ?? prev.utm_campaign,
                                attribution: res.data.attribution ?? prev.attribution
                            };
                        }
                    }["LeadsDialog.useEffect"]);
                }
            }["LeadsDialog.useEffect"]);
        }
    }["LeadsDialog.useEffect"], [
        open,
        initialLeadId,
        leads,
        viewOnly
    ]);
    function openEdit(lead) {
        setEditingLead({
            ...lead
        });
        setMode('edit');
    }
    function openCreate() {
        setEditingLead(createEmptyLead());
        setMode('create');
    }
    function closeEdit() {
        setEditingLead(null);
        setMode('create');
    }
    async function saveLead() {
        if (viewOnly) return;
        if (!editingLead) return;
        if (!editingLead.name || !editingLead.phoneNumber) {
            toast.error({
                title: 'Validation Error',
                message: 'Name and phone number are required'
            });
            return;
        }
        const selectedLocationIDs = (Array.isArray(editingLead.locationID) ? editingLead.locationID : editingLead.locationID ? [
            editingLead.locationID
        ] : []).map((l)=>String(l?._id ?? l)).filter(Boolean);
        if (selectedLocationIDs.length === 0) {
            toast.error({
                title: 'Validation Error',
                message: 'Please select at least one location'
            });
            return;
        }
        const user = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getCurrentUser"])();
        if (!user?.organisationID && !editingLead._id) {
            toast.error({
                title: 'Validation Error',
                message: 'You must be logged in to an organisation to create leads'
            });
            return;
        }
        setLoading(true);
        try {
            if (editingLead._id) {
                const result = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].put(`/api/lead/${editingLead._id}`, {
                    name: editingLead.name,
                    email: editingLead.email,
                    phoneNumber: editingLead.phoneNumber,
                    dateOfBirth: editingLead.dateOfBirth || null,
                    gender: editingLead.gender || null,
                    address: cleanAddress(editingLead.address) ?? emptyAddress(),
                    location: editingLead.location,
                    locationID: selectedLocationIDs,
                    stage: editingLead.stage,
                    reason: editingLead.reason || '',
                    bookingStatus: editingLead.bookingStatus,
                    assignedAiAgent: editingLead.assignedAiAgent || '',
                    assignedHumanAgent: editingLead.assignedHumanAgent || '',
                    isEscalated: editingLead.isEscalated || false,
                    agentFollowupEnabled: editingLead.agentFollowupEnabled !== false,
                    callbackDate: editingLead.callbackDate || null
                });
                if (result.success) {
                    toast.success({
                        title: 'Saved',
                        message: 'Lead updated successfully'
                    });
                    closeEdit();
                    onRefresh && onRefresh();
                    onClose?.();
                } else {
                    toast.error({
                        title: 'Save failed',
                        message: result.error || 'Unable to update lead'
                    });
                }
            } else {
                const payload = {
                    ...editingLead,
                    locationID: selectedLocationIDs,
                    organisationID: user?.organisationID,
                    agentFollowupEnabled: editingLead.agentFollowupEnabled !== false,
                    callbackDate: editingLead.callbackDate || undefined,
                    dateOfBirth: editingLead.dateOfBirth || undefined,
                    gender: editingLead.gender || undefined,
                    address: cleanAddress(editingLead.address),
                    members: cleanLeadMembers(editingLead.members)
                };
                const result = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].post('/api/lead', payload);
                if (result.success) {
                    toast.success({
                        title: 'Created',
                        message: 'Lead created successfully'
                    });
                    closeEdit();
                    onRefresh && onRefresh();
                    onClose?.();
                } else {
                    toast.error({
                        title: 'Create failed',
                        message: result.error || 'Unable to create lead'
                    });
                }
            }
        } catch (e) {
            console.error(e);
            toast.error({
                title: 'Error',
                message: 'Unexpected error occurred'
            });
        } finally{
            setLoading(false);
        }
    }
    async function saveCallbackDate() {
        if (!editingLead?._id) return;
        setSavingCallbackDate(true);
        try {
            const result = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].put(`/api/lead/${editingLead._id}`, {
                callbackDate: editingLead.callbackDate || null
            });
            if (result.success) {
                toast.success({
                    title: 'Saved',
                    message: 'Callback date updated'
                });
                setSavedCallbackDate(editingLead.callbackDate || '');
                onRefresh && onRefresh();
            } else {
                toast.error({
                    title: 'Save failed',
                    message: result.error || 'Unable to update callback date'
                });
            }
        } catch (e) {
            console.error(e);
            toast.error({
                title: 'Error',
                message: 'Unexpected error occurred'
            });
        } finally{
            setSavingCallbackDate(false);
        }
    }
    if (!editingLead) return null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$dialog$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Dialog"], {
        open: open,
        onClose: onClose,
        maxWidth: "2xl",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$dialog$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DialogContent"], {
            onClose: onClose,
            className: "max-h-[90vh] overflow-y-auto",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$dialog$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DialogHeader"], {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$dialog$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DialogTitle"], {
                            className: "flex items-center gap-2",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$user$2d$plus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__UserPlus$3e$__["UserPlus"], {
                                    className: "h-5 w-5"
                                }, void 0, false, {
                                    fileName: "[project]/app/leads/components/LeadsDialog.js",
                                    lineNumber: 418,
                                    columnNumber: 13
                                }, this),
                                mode === 'view' ? 'Lead Details' : mode === 'edit' ? 'Edit Lead' : 'Create New Lead'
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/leads/components/LeadsDialog.js",
                            lineNumber: 417,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$dialog$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DialogDescription"], {
                            children: mode === 'view' ? 'View lead information' : mode === 'edit' ? 'Update lead information' : 'Add a new lead to your CRM'
                        }, void 0, false, {
                            fileName: "[project]/app/leads/components/LeadsDialog.js",
                            lineNumber: 421,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/leads/components/LeadsDialog.js",
                    lineNumber: 416,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "space-y-4 py-4",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "grid grid-cols-1 md:grid-cols-2 gap-4",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            className: "block text-sm font-medium mb-1",
                                            children: "Name *"
                                        }, void 0, false, {
                                            fileName: "[project]/app/leads/components/LeadsDialog.js",
                                            lineNumber: 433,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$input$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Input"], {
                                            value: editingLead.name || '',
                                            onChange: (e)=>setEditingLead({
                                                    ...editingLead,
                                                    name: e.target.value
                                                }),
                                            disabled: viewOnly,
                                            placeholder: "Enter lead name"
                                        }, void 0, false, {
                                            fileName: "[project]/app/leads/components/LeadsDialog.js",
                                            lineNumber: 434,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/leads/components/LeadsDialog.js",
                                    lineNumber: 432,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            className: "block text-sm font-medium mb-1",
                                            children: "Email"
                                        }, void 0, false, {
                                            fileName: "[project]/app/leads/components/LeadsDialog.js",
                                            lineNumber: 442,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$input$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Input"], {
                                            type: "email",
                                            value: editingLead.email || '',
                                            onChange: (e)=>setEditingLead({
                                                    ...editingLead,
                                                    email: e.target.value
                                                }),
                                            disabled: viewOnly,
                                            placeholder: "Enter email address"
                                        }, void 0, false, {
                                            fileName: "[project]/app/leads/components/LeadsDialog.js",
                                            lineNumber: 443,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/leads/components/LeadsDialog.js",
                                    lineNumber: 441,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            className: "block text-sm font-medium mb-1",
                                            children: "Phone Number *"
                                        }, void 0, false, {
                                            fileName: "[project]/app/leads/components/LeadsDialog.js",
                                            lineNumber: 452,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$shared$2f$PhoneNumberInput$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                            value: editingLead.phoneNumber || '',
                                            onChange: (value)=>setEditingLead({
                                                    ...editingLead,
                                                    phoneNumber: value
                                                }),
                                            disabled: viewOnly,
                                            placeholder: "e.g. 8287032815"
                                        }, void 0, false, {
                                            fileName: "[project]/app/leads/components/LeadsDialog.js",
                                            lineNumber: 453,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/leads/components/LeadsDialog.js",
                                    lineNumber: 451,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            className: "block text-sm font-medium mb-1",
                                            children: "Date of Birth"
                                        }, void 0, false, {
                                            fileName: "[project]/app/leads/components/LeadsDialog.js",
                                            lineNumber: 461,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$input$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Input"], {
                                            type: "date",
                                            value: editingLead.dateOfBirth || '',
                                            onChange: (e)=>setEditingLead({
                                                    ...editingLead,
                                                    dateOfBirth: e.target.value
                                                }),
                                            disabled: viewOnly
                                        }, void 0, false, {
                                            fileName: "[project]/app/leads/components/LeadsDialog.js",
                                            lineNumber: 462,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/leads/components/LeadsDialog.js",
                                    lineNumber: 460,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            className: "block text-sm font-medium mb-1",
                                            children: "Gender"
                                        }, void 0, false, {
                                            fileName: "[project]/app/leads/components/LeadsDialog.js",
                                            lineNumber: 470,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                            value: editingLead.gender || '',
                                            onChange: (e)=>setEditingLead({
                                                    ...editingLead,
                                                    gender: e.target.value
                                                }),
                                            disabled: viewOnly,
                                            className: "w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-info disabled:opacity-60",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                    value: "",
                                                    children: "Select…"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/leads/components/LeadsDialog.js",
                                                    lineNumber: 477,
                                                    columnNumber: 17
                                                }, this),
                                                MEMBER_GENDER_OPTIONS.map((g)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                        value: g.value,
                                                        children: g.label
                                                    }, g.value, false, {
                                                        fileName: "[project]/app/leads/components/LeadsDialog.js",
                                                        lineNumber: 479,
                                                        columnNumber: 19
                                                    }, this))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/leads/components/LeadsDialog.js",
                                            lineNumber: 471,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/leads/components/LeadsDialog.js",
                                    lineNumber: 469,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            className: "block text-sm font-medium mb-1",
                                            children: "Location *"
                                        }, void 0, false, {
                                            fileName: "[project]/app/leads/components/LeadsDialog.js",
                                            lineNumber: 486,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$shared$2f$LocationSelector$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                            value: Array.isArray(editingLead.locationID) ? editingLead.locationID.map((l)=>String(l?._id ?? l)).filter(Boolean) : editingLead.locationID ? [
                                                String(editingLead.locationID?._id ?? editingLead.locationID)
                                            ] : [],
                                            onChange: (ids)=>setEditingLead((prev)=>({
                                                        ...prev,
                                                        locationID: ids
                                                    })),
                                            placeholder: "Select location(s)",
                                            showAllOption: false,
                                            multiple: true,
                                            disabled: viewOnly,
                                            className: "mt-0.5"
                                        }, void 0, false, {
                                            fileName: "[project]/app/leads/components/LeadsDialog.js",
                                            lineNumber: 487,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/leads/components/LeadsDialog.js",
                                    lineNumber: 485,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            className: "block text-sm font-medium mb-1",
                                            children: "Stage"
                                        }, void 0, false, {
                                            fileName: "[project]/app/leads/components/LeadsDialog.js",
                                            lineNumber: 504,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                            value: editingLead.stage || 'new',
                                            onChange: (e)=>setEditingLead({
                                                    ...editingLead,
                                                    stage: e.target.value
                                                }),
                                            disabled: viewOnly,
                                            className: "w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-info",
                                            children: stageOptions.map((opt)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                    value: opt.value,
                                                    children: opt.label
                                                }, opt.value, false, {
                                                    fileName: "[project]/app/leads/components/LeadsDialog.js",
                                                    lineNumber: 512,
                                                    columnNumber: 19
                                                }, this))
                                        }, void 0, false, {
                                            fileName: "[project]/app/leads/components/LeadsDialog.js",
                                            lineNumber: 505,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/leads/components/LeadsDialog.js",
                                    lineNumber: 503,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            className: "block text-sm font-medium mb-1",
                                            children: "Reason"
                                        }, void 0, false, {
                                            fileName: "[project]/app/leads/components/LeadsDialog.js",
                                            lineNumber: 519,
                                            columnNumber: 15
                                        }, this),
                                        viewOnly ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "w-full px-3 py-2 border border-border rounded-md bg-muted/30 text-sm text-foreground",
                                            children: editingLead.reason ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$dynamic$2d$list$2d$normalize$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatReasonLabel"])(editingLead.reason, leadReasons) : '—'
                                        }, void 0, false, {
                                            fileName: "[project]/app/leads/components/LeadsDialog.js",
                                            lineNumber: 521,
                                            columnNumber: 17
                                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                            value: editingLead.reason || '',
                                            onChange: (e)=>setEditingLead({
                                                    ...editingLead,
                                                    reason: e.target.value
                                                }),
                                            className: "w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-info",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                    value: "",
                                                    children: "None"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/leads/components/LeadsDialog.js",
                                                    lineNumber: 530,
                                                    columnNumber: 19
                                                }, this),
                                                reasonOptions.map((opt)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                        value: opt.value,
                                                        children: opt.label
                                                    }, opt.value, false, {
                                                        fileName: "[project]/app/leads/components/LeadsDialog.js",
                                                        lineNumber: 532,
                                                        columnNumber: 21
                                                    }, this))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/leads/components/LeadsDialog.js",
                                            lineNumber: 525,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/leads/components/LeadsDialog.js",
                                    lineNumber: 518,
                                    columnNumber: 13
                                }, this),
                                viewOnly && editingLead.actualReason && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "md:col-span-2",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            className: "block text-sm font-medium mb-1",
                                            children: "Their Words"
                                        }, void 0, false, {
                                            fileName: "[project]/app/leads/components/LeadsDialog.js",
                                            lineNumber: 541,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "w-full px-3 py-2 border border-border rounded-md bg-muted/30 text-sm text-foreground italic whitespace-pre-wrap",
                                            children: [
                                                "“",
                                                editingLead.actualReason,
                                                "”"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/leads/components/LeadsDialog.js",
                                            lineNumber: 542,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/leads/components/LeadsDialog.js",
                                    lineNumber: 540,
                                    columnNumber: 15
                                }, this),
                                viewOnly && (editingLead.utm_source || editingLead.attribution?.landingPage) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(LeadSourceDetails, {
                                    lead: editingLead
                                }, void 0, false, {
                                    fileName: "[project]/app/leads/components/LeadsDialog.js",
                                    lineNumber: 548,
                                    columnNumber: 15
                                }, this),
                                viewOnly && editingLead?._id && PAYMENT_LINK_STAGES.has(editingLead.stage) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "rounded-lg border border-border bg-muted/30 p-3 space-y-2",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-center justify-between",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-sm font-medium text-foreground flex items-center gap-1.5",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$send$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Send$3e$__["Send"], {
                                                            className: "h-3.5 w-3.5 text-muted-foreground"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/leads/components/LeadsDialog.js",
                                                            lineNumber: 555,
                                                            columnNumber: 21
                                                        }, this),
                                                        "Send Payment Link"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/leads/components/LeadsDialog.js",
                                                    lineNumber: 554,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    type: "button",
                                                    onClick: ()=>setPaymentLinkForm((p)=>({
                                                                ...p,
                                                                showForm: !p.showForm
                                                            })),
                                                    className: "text-xs text-brand hover:underline",
                                                    children: paymentLinkForm.showForm ? 'Hide' : 'Set up'
                                                }, void 0, false, {
                                                    fileName: "[project]/app/leads/components/LeadsDialog.js",
                                                    lineNumber: 558,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/leads/components/LeadsDialog.js",
                                            lineNumber: 553,
                                            columnNumber: 17
                                        }, this),
                                        paymentLinkForm.showForm && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "space-y-2 pt-1",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "grid grid-cols-2 gap-2",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                    className: "block text-xs font-medium mb-1 text-muted-foreground",
                                                                    children: "Amount ($)"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/leads/components/LeadsDialog.js",
                                                                    lineNumber: 570,
                                                                    columnNumber: 25
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$input$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Input"], {
                                                                    type: "number",
                                                                    min: "1",
                                                                    step: "any",
                                                                    value: paymentLinkForm.amount,
                                                                    onChange: (e)=>setPaymentLinkForm((p)=>({
                                                                                ...p,
                                                                                amount: e.target.value
                                                                            })),
                                                                    placeholder: "75.00",
                                                                    className: "h-8 text-sm"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/leads/components/LeadsDialog.js",
                                                                    lineNumber: 571,
                                                                    columnNumber: 25
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/app/leads/components/LeadsDialog.js",
                                                            lineNumber: 569,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                    className: "block text-xs font-medium mb-1 text-muted-foreground",
                                                                    children: "Send via"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/leads/components/LeadsDialog.js",
                                                                    lineNumber: 582,
                                                                    columnNumber: 25
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                                                    value: paymentLinkForm.channel,
                                                                    onChange: (e)=>setPaymentLinkForm((p)=>({
                                                                                ...p,
                                                                                channel: e.target.value
                                                                            })),
                                                                    className: "h-8 w-full rounded-md border border-border bg-background text-sm px-2",
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                            value: "sms",
                                                                            children: "SMS"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/app/leads/components/LeadsDialog.js",
                                                                            lineNumber: 588,
                                                                            columnNumber: 27
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                            value: "email",
                                                                            children: "Email"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/app/leads/components/LeadsDialog.js",
                                                                            lineNumber: 589,
                                                                            columnNumber: 27
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                            value: "both",
                                                                            children: "Both"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/app/leads/components/LeadsDialog.js",
                                                                            lineNumber: 590,
                                                                            columnNumber: 27
                                                                        }, this)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/app/leads/components/LeadsDialog.js",
                                                                    lineNumber: 583,
                                                                    columnNumber: 25
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/app/leads/components/LeadsDialog.js",
                                                            lineNumber: 581,
                                                            columnNumber: 23
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/leads/components/LeadsDialog.js",
                                                    lineNumber: 568,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                            className: "block text-xs font-medium mb-1 text-muted-foreground",
                                                            children: "Description"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/leads/components/LeadsDialog.js",
                                                            lineNumber: 595,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$input$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Input"], {
                                                            value: paymentLinkForm.description,
                                                            onChange: (e)=>setPaymentLinkForm((p)=>({
                                                                        ...p,
                                                                        description: e.target.value
                                                                    })),
                                                            placeholder: "Intro Lesson",
                                                            className: "h-8 text-sm"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/leads/components/LeadsDialog.js",
                                                            lineNumber: 596,
                                                            columnNumber: 23
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/leads/components/LeadsDialog.js",
                                                    lineNumber: 594,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                                    type: "button",
                                                    size: "sm",
                                                    onClick: handleSendPaymentLink,
                                                    disabled: sendingPaymentLink,
                                                    className: "w-full",
                                                    children: sendingPaymentLink ? 'Sending…' : 'Send Payment Link'
                                                }, void 0, false, {
                                                    fileName: "[project]/app/leads/components/LeadsDialog.js",
                                                    lineNumber: 603,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/leads/components/LeadsDialog.js",
                                            lineNumber: 567,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/leads/components/LeadsDialog.js",
                                    lineNumber: 552,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            className: "block text-sm font-medium mb-1",
                                            children: "Booking Status"
                                        }, void 0, false, {
                                            fileName: "[project]/app/leads/components/LeadsDialog.js",
                                            lineNumber: 617,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                            value: editingLead.bookingStatus || 'Not Booked',
                                            onChange: (e)=>setEditingLead({
                                                    ...editingLead,
                                                    bookingStatus: e.target.value
                                                }),
                                            disabled: viewOnly,
                                            className: "w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-info",
                                            children: bookingStatusOptions.map((opt)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                    value: opt.value,
                                                    children: opt.label
                                                }, opt.value, false, {
                                                    fileName: "[project]/app/leads/components/LeadsDialog.js",
                                                    lineNumber: 625,
                                                    columnNumber: 19
                                                }, this))
                                        }, void 0, false, {
                                            fileName: "[project]/app/leads/components/LeadsDialog.js",
                                            lineNumber: 618,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/leads/components/LeadsDialog.js",
                                    lineNumber: 616,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            className: "block text-sm font-medium mb-1",
                                            children: "Assigned AI Agent"
                                        }, void 0, false, {
                                            fileName: "[project]/app/leads/components/LeadsDialog.js",
                                            lineNumber: 632,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$input$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Input"], {
                                            value: editingLead.assignedAiAgent || '',
                                            onChange: (e)=>setEditingLead({
                                                    ...editingLead,
                                                    assignedAiAgent: e.target.value
                                                }),
                                            disabled: viewOnly,
                                            placeholder: "AI agent ID (optional)"
                                        }, void 0, false, {
                                            fileName: "[project]/app/leads/components/LeadsDialog.js",
                                            lineNumber: 633,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/leads/components/LeadsDialog.js",
                                    lineNumber: 631,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            className: "block text-sm font-medium mb-1",
                                            children: "Assigned Human Agent"
                                        }, void 0, false, {
                                            fileName: "[project]/app/leads/components/LeadsDialog.js",
                                            lineNumber: 641,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$input$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Input"], {
                                            value: editingLead.assignedHumanAgent || '',
                                            onChange: (e)=>setEditingLead({
                                                    ...editingLead,
                                                    assignedHumanAgent: e.target.value
                                                }),
                                            disabled: viewOnly,
                                            placeholder: "Human agent email/ID (optional)"
                                        }, void 0, false, {
                                            fileName: "[project]/app/leads/components/LeadsDialog.js",
                                            lineNumber: 642,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/leads/components/LeadsDialog.js",
                                    lineNumber: 640,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            className: "flex items-center gap-1.5 text-sm font-medium mb-1",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$calendar$2d$clock$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CalendarClock$3e$__["CalendarClock"], {
                                                    className: "h-3.5 w-3.5 text-muted-foreground"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/leads/components/LeadsDialog.js",
                                                    lineNumber: 651,
                                                    columnNumber: 17
                                                }, this),
                                                "Callback Date"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/leads/components/LeadsDialog.js",
                                            lineNumber: 650,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-center gap-2",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$input$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Input"], {
                                                    type: "date",
                                                    value: toDateInputValue(editingLead.callbackDate),
                                                    onChange: (e)=>setEditingLead({
                                                            ...editingLead,
                                                            callbackDate: e.target.value
                                                        }),
                                                    disabled: !editingLead._id && viewOnly,
                                                    className: "w-44"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/leads/components/LeadsDialog.js",
                                                    lineNumber: 655,
                                                    columnNumber: 17
                                                }, this),
                                                viewOnly && editingLead._id && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                                    type: "button",
                                                    size: "sm",
                                                    onClick: saveCallbackDate,
                                                    disabled: savingCallbackDate || (editingLead.callbackDate || '') === savedCallbackDate,
                                                    className: "shrink-0 whitespace-nowrap",
                                                    children: savingCallbackDate ? 'Saving...' : 'Save'
                                                }, void 0, false, {
                                                    fileName: "[project]/app/leads/components/LeadsDialog.js",
                                                    lineNumber: 663,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/leads/components/LeadsDialog.js",
                                            lineNumber: 654,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-xs text-muted-foreground mt-1",
                                            children: "Next date to follow up or call this lead back"
                                        }, void 0, false, {
                                            fileName: "[project]/app/leads/components/LeadsDialog.js",
                                            lineNumber: 674,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/leads/components/LeadsDialog.js",
                                    lineNumber: 649,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "md:col-span-2",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        className: "flex items-center gap-1.5 text-sm font-medium mb-1",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                type: "checkbox",
                                                checked: editingLead.isEscalated || false,
                                                onChange: (e)=>setEditingLead({
                                                        ...editingLead,
                                                        isEscalated: e.target.checked
                                                    }),
                                                disabled: viewOnly,
                                                className: "w-4 h-4"
                                            }, void 0, false, {
                                                fileName: "[project]/app/leads/components/LeadsDialog.js",
                                                lineNumber: 680,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                children: "Is Escalated"
                                            }, void 0, false, {
                                                fileName: "[project]/app/leads/components/LeadsDialog.js",
                                                lineNumber: 687,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/leads/components/LeadsDialog.js",
                                        lineNumber: 679,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/app/leads/components/LeadsDialog.js",
                                    lineNumber: 678,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "md:col-span-2 flex items-center justify-between gap-4 rounded-lg border border-border bg-muted/20 px-4 py-3",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "text-sm font-medium",
                                                    children: "Agent follow-up"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/leads/components/LeadsDialog.js",
                                                    lineNumber: 692,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "mt-0.5 text-xs text-muted-foreground",
                                                    children: "When off, this lead is opted out of automated AI follow-ups (even if location settings allow them)."
                                                }, void 0, false, {
                                                    fileName: "[project]/app/leads/components/LeadsDialog.js",
                                                    lineNumber: 693,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/leads/components/LeadsDialog.js",
                                            lineNumber: 691,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$switch$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Switch"], {
                                            checked: editingLead.agentFollowupEnabled !== false,
                                            onCheckedChange: (checked)=>setEditingLead({
                                                    ...editingLead,
                                                    agentFollowupEnabled: checked
                                                }),
                                            disabled: viewOnly
                                        }, void 0, false, {
                                            fileName: "[project]/app/leads/components/LeadsDialog.js",
                                            lineNumber: 697,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/leads/components/LeadsDialog.js",
                                    lineNumber: 690,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/leads/components/LeadsDialog.js",
                            lineNumber: 431,
                            columnNumber: 11
                        }, this),
                        (!viewOnly || cleanAddress(editingLead.address)) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "border-t pt-4",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                    className: "block text-sm font-medium mb-2",
                                    children: "Address"
                                }, void 0, false, {
                                    fileName: "[project]/app/leads/components/LeadsDialog.js",
                                    lineNumber: 709,
                                    columnNumber: 15
                                }, this),
                                viewOnly ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-sm text-foreground",
                                    children: [
                                        editingLead.address?.street,
                                        editingLead.address?.city,
                                        editingLead.address?.state,
                                        editingLead.address?.zipCode,
                                        editingLead.address?.country
                                    ].map((s)=>(s || '').trim()).filter(Boolean).join(', ') || '—'
                                }, void 0, false, {
                                    fileName: "[project]/app/leads/components/LeadsDialog.js",
                                    lineNumber: 711,
                                    columnNumber: 17
                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "grid grid-cols-1 md:grid-cols-2 gap-4",
                                    children: [
                                        {
                                            key: 'street',
                                            label: 'Street'
                                        },
                                        {
                                            key: 'city',
                                            label: 'City'
                                        },
                                        {
                                            key: 'state',
                                            label: 'State'
                                        },
                                        {
                                            key: 'zipCode',
                                            label: 'Zip Code'
                                        },
                                        {
                                            key: 'country',
                                            label: 'Country'
                                        }
                                    ].map(({ key, label })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                    className: "block text-sm font-medium mb-1",
                                                    children: label
                                                }, void 0, false, {
                                                    fileName: "[project]/app/leads/components/LeadsDialog.js",
                                                    lineNumber: 733,
                                                    columnNumber: 23
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$input$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Input"], {
                                                    value: editingLead.address?.[key] ?? (key === 'country' ? 'USA' : ''),
                                                    onChange: (e)=>setEditingLead((prev)=>({
                                                                ...prev,
                                                                address: {
                                                                    ...addressFromRecord(prev.address),
                                                                    [key]: e.target.value
                                                                }
                                                            })),
                                                    placeholder: key === 'country' ? 'USA' : 'Optional'
                                                }, void 0, false, {
                                                    fileName: "[project]/app/leads/components/LeadsDialog.js",
                                                    lineNumber: 734,
                                                    columnNumber: 23
                                                }, this)
                                            ]
                                        }, key, true, {
                                            fileName: "[project]/app/leads/components/LeadsDialog.js",
                                            lineNumber: 732,
                                            columnNumber: 21
                                        }, this))
                                }, void 0, false, {
                                    fileName: "[project]/app/leads/components/LeadsDialog.js",
                                    lineNumber: 724,
                                    columnNumber: 17
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/leads/components/LeadsDialog.js",
                            lineNumber: 708,
                            columnNumber: 13
                        }, this),
                        editingLead._id && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$leads$2f$LeadEngagementHistory$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                            lead: editingLead,
                            stages: stageOptions,
                            leadReasons: leadReasons
                        }, void 0, false, {
                            fileName: "[project]/app/leads/components/LeadsDialog.js",
                            lineNumber: 752,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "border-t pt-4",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                    className: "flex items-center gap-1.5 text-sm font-medium mb-1",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$users$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Users$3e$__["Users"], {
                                            className: "h-3.5 w-3.5 text-muted-foreground"
                                        }, void 0, false, {
                                            fileName: "[project]/app/leads/components/LeadsDialog.js",
                                            lineNumber: 761,
                                            columnNumber: 15
                                        }, this),
                                        "Couple / family members"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/leads/components/LeadsDialog.js",
                                    lineNumber: 760,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-xs text-muted-foreground mb-3",
                                    children: mode === 'create' ? 'Add a partner or family member to create alongside this lead.' : 'People linked to this lead. They carry over when the lead is converted.'
                                }, void 0, false, {
                                    fileName: "[project]/app/leads/components/LeadsDialog.js",
                                    lineNumber: 764,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(LeadMembersSection, {
                                    leadId: editingLead._id || null,
                                    members: editingLead.members || [],
                                    viewOnly: viewOnly,
                                    onChange: (members)=>{
                                        setEditingLead((prev)=>prev ? {
                                                ...prev,
                                                members
                                            } : prev);
                                        if (editingLead._id) onRefresh && onRefresh();
                                    }
                                }, void 0, false, {
                                    fileName: "[project]/app/leads/components/LeadsDialog.js",
                                    lineNumber: 769,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/leads/components/LeadsDialog.js",
                            lineNumber: 759,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "border-t pt-4",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                    className: "flex items-center gap-1.5 text-sm font-medium mb-2",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sticky$2d$note$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__StickyNote$3e$__["StickyNote"], {
                                            className: "h-3.5 w-3.5 text-muted-foreground"
                                        }, void 0, false, {
                                            fileName: "[project]/app/leads/components/LeadsDialog.js",
                                            lineNumber: 782,
                                            columnNumber: 15
                                        }, this),
                                        "Notes"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/leads/components/LeadsDialog.js",
                                    lineNumber: 781,
                                    columnNumber: 13
                                }, this),
                                editingLead._id ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(LeadNotesSection, {
                                    leadId: editingLead._id,
                                    notes: editingLead.notes,
                                    onChanged: (notes)=>{
                                        setEditingLead((prev)=>({
                                                ...prev,
                                                notes
                                            }));
                                        onRefresh && onRefresh();
                                    }
                                }, void 0, false, {
                                    fileName: "[project]/app/leads/components/LeadsDialog.js",
                                    lineNumber: 786,
                                    columnNumber: 15
                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                                            value: editingLead.notes || '',
                                            onChange: (e)=>setEditingLead({
                                                    ...editingLead,
                                                    notes: e.target.value
                                                }),
                                            disabled: viewOnly,
                                            rows: 3,
                                            placeholder: "Add an initial note (optional). You'll be able to add more once the lead is created.",
                                            className: "w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-info disabled:opacity-60"
                                        }, void 0, false, {
                                            fileName: "[project]/app/leads/components/LeadsDialog.js",
                                            lineNumber: 796,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-xs text-muted-foreground mt-1",
                                            children: "Notes carry over to the customer when this lead is converted"
                                        }, void 0, false, {
                                            fileName: "[project]/app/leads/components/LeadsDialog.js",
                                            lineNumber: 804,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/leads/components/LeadsDialog.js",
                                    lineNumber: 795,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/leads/components/LeadsDialog.js",
                            lineNumber: 780,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/leads/components/LeadsDialog.js",
                    lineNumber: 430,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$dialog$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DialogFooter"], {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                            variant: "outline",
                            onClick: onClose,
                            disabled: loading,
                            children: viewOnly ? 'Close' : 'Cancel'
                        }, void 0, false, {
                            fileName: "[project]/app/leads/components/LeadsDialog.js",
                            lineNumber: 813,
                            columnNumber: 11
                        }, this),
                        !viewOnly && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                            onClick: saveLead,
                            disabled: loading,
                            variant: "gradient",
                            children: loading ? 'Saving...' : mode === 'edit' ? 'Save Changes' : 'Create Lead'
                        }, void 0, false, {
                            fileName: "[project]/app/leads/components/LeadsDialog.js",
                            lineNumber: 817,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/leads/components/LeadsDialog.js",
                    lineNumber: 812,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/app/leads/components/LeadsDialog.js",
            lineNumber: 415,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/app/leads/components/LeadsDialog.js",
        lineNumber: 414,
        columnNumber: 5
    }, this);
}
_s(LeadsDialog, "JbYdvDc8fvKU1gJfJsccDfTlim8=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$toast$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useToast"],
        __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$lead$2d$stages$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLeadStages"]
    ];
});
_c1 = LeadsDialog;
function LeadNotesSection({ leadId, notes, onChanged }) {
    _s1();
    const [text, setText] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [adding, setAdding] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [deletingId, setDeletingId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const toast = (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$toast$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useToast"])();
    const sortedNotes = [
        ...notes || []
    ].sort((a, b)=>new Date(b.createdAt) - new Date(a.createdAt));
    async function handleAdd(e) {
        e.preventDefault();
        if (!text.trim()) return;
        setAdding(true);
        const result = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].post(`/api/lead/${leadId}/notes`, {
            text: text.trim()
        });
        if (result.success) {
            setText('');
            onChanged && onChanged(result.data);
        } else {
            toast.error({
                title: 'Error',
                message: result.error || 'Unable to add note'
            });
        }
        setAdding(false);
    }
    async function handleDelete(noteId) {
        setDeletingId(noteId);
        const result = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].delete(`/api/lead/${leadId}/notes/${noteId}`);
        if (result.success) {
            onChanged && onChanged(result.data);
        } else {
            toast.error({
                title: 'Error',
                message: result.error || 'Unable to delete note'
            });
        }
        setDeletingId(null);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "space-y-3",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                onSubmit: handleAdd,
                className: "flex gap-2",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                        type: "text",
                        value: text,
                        onChange: (e)=>setText(e.target.value),
                        placeholder: "Add a note…",
                        className: "flex-1 h-9 px-3 text-sm border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-info"
                    }, void 0, false, {
                        fileName: "[project]/app/leads/components/LeadsDialog.js",
                        lineNumber: 865,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                        type: "submit",
                        size: "sm",
                        disabled: adding || !text.trim(),
                        children: adding ? 'Adding…' : 'Add'
                    }, void 0, false, {
                        fileName: "[project]/app/leads/components/LeadsDialog.js",
                        lineNumber: 872,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/leads/components/LeadsDialog.js",
                lineNumber: 864,
                columnNumber: 7
            }, this),
            sortedNotes.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "rounded-md border border-dashed border-border py-6 text-center text-sm text-muted-foreground",
                children: "No notes yet."
            }, void 0, false, {
                fileName: "[project]/app/leads/components/LeadsDialog.js",
                lineNumber: 878,
                columnNumber: 9
            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "space-y-2 max-h-64 overflow-y-auto pr-1",
                children: sortedNotes.map((note)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "rounded-md border border-border bg-muted/40 px-3 py-2.5",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-start justify-between gap-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-sm text-foreground leading-relaxed flex-1 whitespace-pre-wrap",
                                        children: note.text
                                    }, void 0, false, {
                                        fileName: "[project]/app/leads/components/LeadsDialog.js",
                                        lineNumber: 886,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "button",
                                        onClick: ()=>handleDelete(note._id),
                                        disabled: deletingId === note._id,
                                        className: "shrink-0 text-muted-foreground hover:text-destructive disabled:opacity-50",
                                        "aria-label": "Delete note",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trash$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Trash2$3e$__["Trash2"], {
                                            className: "h-3.5 w-3.5"
                                        }, void 0, false, {
                                            fileName: "[project]/app/leads/components/LeadsDialog.js",
                                            lineNumber: 896,
                                            columnNumber: 19
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/app/leads/components/LeadsDialog.js",
                                        lineNumber: 889,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/leads/components/LeadsDialog.js",
                                lineNumber: 885,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-xs text-muted-foreground mt-1",
                                children: [
                                    note.createdBy?.name || note.createdBy?.email || 'Unknown',
                                    " · ",
                                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatDateTime"])(note.createdAt)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/leads/components/LeadsDialog.js",
                                lineNumber: 899,
                                columnNumber: 15
                            }, this)
                        ]
                    }, note._id, true, {
                        fileName: "[project]/app/leads/components/LeadsDialog.js",
                        lineNumber: 884,
                        columnNumber: 13
                    }, this))
            }, void 0, false, {
                fileName: "[project]/app/leads/components/LeadsDialog.js",
                lineNumber: 882,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/leads/components/LeadsDialog.js",
        lineNumber: 863,
        columnNumber: 5
    }, this);
}
_s1(LeadNotesSection, "jj06OaJfNtklSLLH0dXduKeuYyw=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$toast$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useToast"]
    ];
});
_c2 = LeadNotesSection;
function MemberFields({ value, onChange, disabled = false }) {
    const set = (key, val)=>onChange({
            ...value,
            [key]: val
        });
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "grid grid-cols-1 md:grid-cols-2 gap-3",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                        className: "block text-xs font-medium mb-1 text-muted-foreground",
                        children: "Name *"
                    }, void 0, false, {
                        fileName: "[project]/app/leads/components/LeadsDialog.js",
                        lineNumber: 915,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$input$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Input"], {
                        value: value.name || '',
                        onChange: (e)=>set('name', e.target.value),
                        disabled: disabled,
                        placeholder: "Full name"
                    }, void 0, false, {
                        fileName: "[project]/app/leads/components/LeadsDialog.js",
                        lineNumber: 916,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/leads/components/LeadsDialog.js",
                lineNumber: 914,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                        className: "block text-xs font-medium mb-1 text-muted-foreground",
                        children: "Relationship"
                    }, void 0, false, {
                        fileName: "[project]/app/leads/components/LeadsDialog.js",
                        lineNumber: 924,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$input$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Input"], {
                        value: value.relationship || '',
                        onChange: (e)=>set('relationship', e.target.value),
                        disabled: disabled,
                        placeholder: "e.g. Spouse, Partner"
                    }, void 0, false, {
                        fileName: "[project]/app/leads/components/LeadsDialog.js",
                        lineNumber: 925,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/leads/components/LeadsDialog.js",
                lineNumber: 923,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                        className: "block text-xs font-medium mb-1 text-muted-foreground",
                        children: "Email"
                    }, void 0, false, {
                        fileName: "[project]/app/leads/components/LeadsDialog.js",
                        lineNumber: 933,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$input$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Input"], {
                        type: "email",
                        value: value.email || '',
                        onChange: (e)=>set('email', e.target.value),
                        disabled: disabled,
                        placeholder: "Optional"
                    }, void 0, false, {
                        fileName: "[project]/app/leads/components/LeadsDialog.js",
                        lineNumber: 934,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/leads/components/LeadsDialog.js",
                lineNumber: 932,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                        className: "block text-xs font-medium mb-1 text-muted-foreground",
                        children: "Phone"
                    }, void 0, false, {
                        fileName: "[project]/app/leads/components/LeadsDialog.js",
                        lineNumber: 943,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$shared$2f$PhoneNumberInput$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        value: value.phoneNumber || '',
                        onChange: (v)=>set('phoneNumber', v),
                        disabled: disabled,
                        placeholder: "Optional"
                    }, void 0, false, {
                        fileName: "[project]/app/leads/components/LeadsDialog.js",
                        lineNumber: 944,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/leads/components/LeadsDialog.js",
                lineNumber: 942,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                        className: "block text-xs font-medium mb-1 text-muted-foreground",
                        children: "Date of birth"
                    }, void 0, false, {
                        fileName: "[project]/app/leads/components/LeadsDialog.js",
                        lineNumber: 952,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$input$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Input"], {
                        type: "date",
                        value: value.dateOfBirth || '',
                        onChange: (e)=>set('dateOfBirth', e.target.value),
                        disabled: disabled
                    }, void 0, false, {
                        fileName: "[project]/app/leads/components/LeadsDialog.js",
                        lineNumber: 953,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/leads/components/LeadsDialog.js",
                lineNumber: 951,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                        className: "block text-xs font-medium mb-1 text-muted-foreground",
                        children: "Gender"
                    }, void 0, false, {
                        fileName: "[project]/app/leads/components/LeadsDialog.js",
                        lineNumber: 961,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                        value: value.gender || '',
                        onChange: (e)=>set('gender', e.target.value),
                        disabled: disabled,
                        className: "w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-info disabled:opacity-60",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                value: "",
                                children: "Select…"
                            }, void 0, false, {
                                fileName: "[project]/app/leads/components/LeadsDialog.js",
                                lineNumber: 968,
                                columnNumber: 11
                            }, this),
                            MEMBER_GENDER_OPTIONS.map((g)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                    value: g.value,
                                    children: g.label
                                }, g.value, false, {
                                    fileName: "[project]/app/leads/components/LeadsDialog.js",
                                    lineNumber: 970,
                                    columnNumber: 13
                                }, this))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/leads/components/LeadsDialog.js",
                        lineNumber: 962,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/leads/components/LeadsDialog.js",
                lineNumber: 960,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "md:col-span-2",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                        className: "block text-xs font-medium mb-1 text-muted-foreground",
                        children: "Notes"
                    }, void 0, false, {
                        fileName: "[project]/app/leads/components/LeadsDialog.js",
                        lineNumber: 977,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$input$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Input"], {
                        value: value.notes || '',
                        onChange: (e)=>set('notes', e.target.value),
                        disabled: disabled,
                        placeholder: "Any notes about this person"
                    }, void 0, false, {
                        fileName: "[project]/app/leads/components/LeadsDialog.js",
                        lineNumber: 978,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/leads/components/LeadsDialog.js",
                lineNumber: 976,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/leads/components/LeadsDialog.js",
        lineNumber: 913,
        columnNumber: 5
    }, this);
}
_c3 = MemberFields;
function LeadMembersSection({ leadId, members = [], viewOnly = false, onChange }) {
    _s2();
    const toast = (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$toast$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useToast"])();
    const localMode = !leadId;
    const list = Array.isArray(members) ? members : [];
    const [adding, setAdding] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [draft, setDraft] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(emptyMember);
    const [editKey, setEditKey] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null) // index (local mode) or member _id (server mode)
    ;
    const [editDraft, setEditDraft] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(emptyMember);
    const [busy, setBusy] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const resetAdd = ()=>{
        setAdding(false);
        setDraft(emptyMember);
    };
    const resetEdit = ()=>{
        setEditKey(null);
        setEditDraft(emptyMember);
    };
    const keyFor = (member, index)=>localMode ? member._localId || `i${index}` : member._id;
    const isEditing = (member, index)=>editKey !== null && editKey === keyFor(member, index);
    async function handleAdd() {
        const clean = sanitizeMember(draft);
        if (!clean.name) {
            toast.error({
                title: 'Validation Error',
                message: 'Member name is required'
            });
            return;
        }
        if (localMode) {
            onChange([
                ...list,
                {
                    ...clean,
                    _localId: `m${Date.now()}${Math.random().toString(36).slice(2, 7)}`
                }
            ]);
            resetAdd();
            return;
        }
        setBusy(true);
        const res = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].post(`/api/lead/${leadId}/members`, clean);
        setBusy(false);
        if (res.success) {
            onChange(Array.isArray(res.data?.members) ? res.data.members : []);
            resetAdd();
            toast.success({
                title: 'Added',
                message: 'Member added'
            });
        } else {
            toast.error({
                title: 'Error',
                message: res.error || 'Unable to add member'
            });
        }
    }
    async function handleUpdate(member, index) {
        const clean = sanitizeMember(editDraft);
        if (!clean.name) {
            toast.error({
                title: 'Validation Error',
                message: 'Member name is required'
            });
            return;
        }
        if (localMode) {
            onChange(list.map((m, i)=>i === index ? {
                    ...clean,
                    _localId: m._localId
                } : m));
            resetEdit();
            return;
        }
        setBusy(true);
        const res = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].put(`/api/lead/${leadId}/members/${member._id}`, clean);
        setBusy(false);
        if (res.success) {
            onChange(Array.isArray(res.data?.members) ? res.data.members : []);
            resetEdit();
            toast.success({
                title: 'Saved',
                message: 'Member updated'
            });
        } else {
            toast.error({
                title: 'Error',
                message: res.error || 'Unable to update member'
            });
        }
    }
    async function handleDelete(member, index) {
        if (localMode) {
            onChange(list.filter((_, i)=>i !== index));
            return;
        }
        if (!window.confirm('Remove this member?')) return;
        setBusy(true);
        const res = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].delete(`/api/lead/${leadId}/members/${member._id}`);
        setBusy(false);
        if (res.success) {
            onChange(Array.isArray(res.data?.members) ? res.data.members : []);
            toast.success({
                title: 'Removed',
                message: 'Member removed'
            });
        } else {
            toast.error({
                title: 'Error',
                message: res.error || 'Unable to remove member'
            });
        }
    }
    function startEdit(member, index) {
        setAdding(false);
        setEditKey(keyFor(member, index));
        setEditDraft(memberFromRecord(member));
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "space-y-3",
        children: [
            list.length === 0 && !adding ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "rounded-md border border-dashed border-border py-6 text-center text-sm text-muted-foreground",
                children: viewOnly ? 'No additional people on this lead.' : 'No partner or family members added yet.'
            }, void 0, false, {
                fileName: "[project]/app/leads/components/LeadsDialog.js",
                lineNumber: 1084,
                columnNumber: 9
            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "space-y-2",
                children: list.map((member, index)=>isEditing(member, index) ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "rounded-md border border-border bg-muted/30 p-3",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(MemberFields, {
                                value: editDraft,
                                onChange: setEditDraft,
                                disabled: busy
                            }, void 0, false, {
                                fileName: "[project]/app/leads/components/LeadsDialog.js",
                                lineNumber: 1092,
                                columnNumber: 17
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mt-3 flex justify-end gap-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                        type: "button",
                                        variant: "outline",
                                        size: "sm",
                                        onClick: resetEdit,
                                        disabled: busy,
                                        children: "Cancel"
                                    }, void 0, false, {
                                        fileName: "[project]/app/leads/components/LeadsDialog.js",
                                        lineNumber: 1094,
                                        columnNumber: 19
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                        type: "button",
                                        size: "sm",
                                        onClick: ()=>handleUpdate(member, index),
                                        disabled: busy,
                                        children: busy ? 'Saving…' : 'Save'
                                    }, void 0, false, {
                                        fileName: "[project]/app/leads/components/LeadsDialog.js",
                                        lineNumber: 1097,
                                        columnNumber: 19
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/leads/components/LeadsDialog.js",
                                lineNumber: 1093,
                                columnNumber: 17
                            }, this)
                        ]
                    }, keyFor(member, index), true, {
                        fileName: "[project]/app/leads/components/LeadsDialog.js",
                        lineNumber: 1091,
                        columnNumber: 15
                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-start justify-between gap-3 rounded-md border border-border bg-muted/40 px-3 py-2.5",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "min-w-0",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-sm font-medium text-foreground",
                                        children: [
                                            member.name,
                                            member.relationship && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "ml-2 text-xs font-normal text-muted-foreground capitalize",
                                                children: member.relationship
                                            }, void 0, false, {
                                                fileName: "[project]/app/leads/components/LeadsDialog.js",
                                                lineNumber: 1111,
                                                columnNumber: 23
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/leads/components/LeadsDialog.js",
                                        lineNumber: 1108,
                                        columnNumber: 19
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-xs text-muted-foreground truncate",
                                        children: [
                                            member.email,
                                            member.phoneNumber
                                        ].filter(Boolean).join(' · ') || '—'
                                    }, void 0, false, {
                                        fileName: "[project]/app/leads/components/LeadsDialog.js",
                                        lineNumber: 1116,
                                        columnNumber: 19
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/leads/components/LeadsDialog.js",
                                lineNumber: 1107,
                                columnNumber: 17
                            }, this),
                            !viewOnly && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex shrink-0 items-center gap-1.5",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "button",
                                        onClick: ()=>startEdit(member, index),
                                        disabled: busy,
                                        className: "text-muted-foreground hover:text-foreground disabled:opacity-50",
                                        "aria-label": "Edit member",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$pencil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Pencil$3e$__["Pencil"], {
                                            className: "h-3.5 w-3.5"
                                        }, void 0, false, {
                                            fileName: "[project]/app/leads/components/LeadsDialog.js",
                                            lineNumber: 1129,
                                            columnNumber: 23
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/app/leads/components/LeadsDialog.js",
                                        lineNumber: 1122,
                                        columnNumber: 21
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "button",
                                        onClick: ()=>handleDelete(member, index),
                                        disabled: busy,
                                        className: "text-muted-foreground hover:text-destructive disabled:opacity-50",
                                        "aria-label": "Remove member",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trash$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Trash2$3e$__["Trash2"], {
                                            className: "h-3.5 w-3.5"
                                        }, void 0, false, {
                                            fileName: "[project]/app/leads/components/LeadsDialog.js",
                                            lineNumber: 1138,
                                            columnNumber: 23
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/app/leads/components/LeadsDialog.js",
                                        lineNumber: 1131,
                                        columnNumber: 21
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/leads/components/LeadsDialog.js",
                                lineNumber: 1121,
                                columnNumber: 19
                            }, this)
                        ]
                    }, keyFor(member, index), true, {
                        fileName: "[project]/app/leads/components/LeadsDialog.js",
                        lineNumber: 1103,
                        columnNumber: 15
                    }, this))
            }, void 0, false, {
                fileName: "[project]/app/leads/components/LeadsDialog.js",
                lineNumber: 1088,
                columnNumber: 9
            }, this),
            !viewOnly && adding && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "rounded-md border border-border bg-muted/30 p-3",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(MemberFields, {
                        value: draft,
                        onChange: setDraft,
                        disabled: busy
                    }, void 0, false, {
                        fileName: "[project]/app/leads/components/LeadsDialog.js",
                        lineNumber: 1150,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-3 flex justify-end gap-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                type: "button",
                                variant: "outline",
                                size: "sm",
                                onClick: resetAdd,
                                disabled: busy,
                                children: "Cancel"
                            }, void 0, false, {
                                fileName: "[project]/app/leads/components/LeadsDialog.js",
                                lineNumber: 1152,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                type: "button",
                                size: "sm",
                                onClick: handleAdd,
                                disabled: busy,
                                children: busy ? 'Adding…' : 'Add person'
                            }, void 0, false, {
                                fileName: "[project]/app/leads/components/LeadsDialog.js",
                                lineNumber: 1155,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/leads/components/LeadsDialog.js",
                        lineNumber: 1151,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/leads/components/LeadsDialog.js",
                lineNumber: 1149,
                columnNumber: 9
            }, this),
            !viewOnly && !adding && editKey === null && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                type: "button",
                variant: "outline",
                size: "sm",
                onClick: ()=>{
                    resetEdit();
                    setDraft(emptyMember);
                    setAdding(true);
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$user$2d$plus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__UserPlus$3e$__["UserPlus"], {
                        className: "mr-1.5 h-3.5 w-3.5"
                    }, void 0, false, {
                        fileName: "[project]/app/leads/components/LeadsDialog.js",
                        lineNumber: 1173,
                        columnNumber: 11
                    }, this),
                    "Add person"
                ]
            }, void 0, true, {
                fileName: "[project]/app/leads/components/LeadsDialog.js",
                lineNumber: 1163,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/leads/components/LeadsDialog.js",
        lineNumber: 1082,
        columnNumber: 5
    }, this);
}
_s2(LeadMembersSection, "7vVHv2sjiehnvcv05I92OZkVglI=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$toast$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useToast"]
    ];
});
_c4 = LeadMembersSection;
var _c, _c1, _c2, _c3, _c4;
__turbopack_context__.k.register(_c, "LeadSourceDetails");
__turbopack_context__.k.register(_c1, "LeadsDialog");
__turbopack_context__.k.register(_c2, "LeadNotesSection");
__turbopack_context__.k.register(_c3, "MemberFields");
__turbopack_context__.k.register(_c4, "LeadMembersSection");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/settings/payments/clover/useCloverConnection.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "resolveLocationID",
    ()=>resolveLocationID,
    "useCloverConnection",
    ()=>useCloverConnection
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/api.js [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
'use client';
;
;
const initialState = {
    status: 'loading',
    merchantId: null,
    merchantName: null,
    connectedAt: null,
    ecommercePublicKey: null,
    lastError: null,
    webhookUrl: null,
    // Clover issues a signing secret per merchant, and without it their webhook can't be
    // verified — so a card payment could never be confirmed. Every card Pay button gates
    // on this as well as on `status`.
    webhookSecretSaved: false,
    webhookLastReceivedAt: null,
    webhookLastError: null
};
function resolveLocationID(source) {
    if (source == null || source === '') return null;
    if (typeof source === 'string' || typeof source === 'number') return String(source);
    if (Array.isArray(source)) {
        return source.length ? resolveLocationID(source[0]) : null;
    }
    if (source.locationID !== undefined) {
        return resolveLocationID(source.locationID);
    }
    if (source._id) return String(source._id);
    return null;
}
function useCloverConnection(locationID) {
    _s();
    const [state, setState] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(initialState);
    const resolvedLocationID = resolveLocationID(locationID);
    const refresh = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useCloverConnection.useCallback[refresh]": async ()=>{
            if (!resolvedLocationID) {
                setState({
                    ...initialState,
                    status: 'disconnected'
                });
                return;
            }
            setState({
                "useCloverConnection.useCallback[refresh]": (prev)=>({
                        ...prev,
                        status: 'loading'
                    })
            }["useCloverConnection.useCallback[refresh]"]);
            const result = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].get(`/api/payments/clover/status?locationID=${encodeURIComponent(resolvedLocationID)}`);
            if (result.success && result.data) {
                setState({
                    status: result.data.status || 'disconnected',
                    merchantId: result.data.merchantId ?? null,
                    merchantName: result.data.merchantName ?? null,
                    connectedAt: result.data.connectedAt ?? null,
                    ecommercePublicKey: result.data.ecommercePublicKey ?? null,
                    lastError: result.data.lastError ?? null,
                    webhookUrl: result.data.webhookUrl ?? null,
                    webhookSecretSaved: Boolean(result.data.webhookSecretSaved),
                    webhookLastReceivedAt: result.data.webhookLastReceivedAt ?? null,
                    webhookLastError: result.data.webhookLastError ?? null
                });
            } else {
                setState({
                    ...initialState,
                    status: 'disconnected',
                    lastError: result.error || null
                });
            }
        }
    }["useCloverConnection.useCallback[refresh]"], [
        resolvedLocationID
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useCloverConnection.useEffect": ()=>{
            refresh();
        }
    }["useCloverConnection.useEffect"], [
        refresh
    ]);
    const connect = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useCloverConnection.useCallback[connect]": async ()=>{
            if (!resolvedLocationID) {
                return {
                    success: false,
                    error: 'Select a location first.'
                };
            }
            const result = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].get(`/api/payments/clover/connect?locationID=${encodeURIComponent(resolvedLocationID)}`);
            if (result.success && result.data?.authorizeUrl) {
                window.location.href = result.data.authorizeUrl;
                return {
                    success: true
                };
            }
            return {
                success: false,
                error: result.error || 'Unable to start the Clover connection.'
            };
        }
    }["useCloverConnection.useCallback[connect]"], [
        resolvedLocationID
    ]);
    const disconnect = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useCloverConnection.useCallback[disconnect]": async ()=>{
            if (!resolvedLocationID) {
                return {
                    success: false,
                    error: 'Select a location first.'
                };
            }
            const result = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].post('/api/payments/clover/disconnect', {
                locationID: resolvedLocationID
            });
            if (result.success) {
                await refresh();
            }
            return {
                success: result.success,
                error: result.error
            };
        }
    }["useCloverConnection.useCallback[disconnect]"], [
        resolvedLocationID,
        refresh
    ]);
    const saveWebhookSecret = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useCloverConnection.useCallback[saveWebhookSecret]": async (secret)=>{
            if (!resolvedLocationID) {
                return {
                    success: false,
                    error: 'Select a location first.'
                };
            }
            const result = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].post('/api/payments/clover/webhook-secret', {
                secret,
                locationID: resolvedLocationID
            });
            if (result.success) await refresh();
            return {
                success: result.success,
                error: result.error
            };
        }
    }["useCloverConnection.useCallback[saveWebhookSecret]"], [
        resolvedLocationID,
        refresh
    ]);
    // Clover only sends a webhook when a payment happens, so "a webhook has arrived"
    // can't gate the first payment. A saved secret is what we can require up front.
    const cloverReady = state.status === 'connected' && state.webhookSecretSaved;
    return {
        ...state,
        cloverReady,
        refresh,
        connect,
        disconnect,
        saveWebhookSecret
    };
}
_s(useCloverConnection, "9CBLrgMHT5d7hQNYDUH7JN4cW6Q=");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/settings/payments/clover/useCloverDevices.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "listAvailableDevices",
    ()=>listAvailableDevices,
    "pairDevice",
    ()=>pairDevice,
    "renameDevice",
    ()=>renameDevice,
    "unpairDevice",
    ()=>unpairDevice,
    "useCloverDevices",
    ()=>useCloverDevices
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/api.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$settings$2f$payments$2f$clover$2f$useCloverConnection$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/settings/payments/clover/useCloverConnection.js [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
function useCloverDevices(locationID) {
    _s();
    const [devices, setDevices] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const resolvedLocationID = (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$settings$2f$payments$2f$clover$2f$useCloverConnection$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["resolveLocationID"])(locationID);
    const refresh = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useCloverDevices.useCallback[refresh]": async ()=>{
            if (!resolvedLocationID) {
                setDevices([]);
                setLoading(false);
                return;
            }
            setLoading(true);
            const result = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].get(`/api/payments/clover/devices?locationID=${encodeURIComponent(resolvedLocationID)}`);
            setDevices(result.success && Array.isArray(result.data) ? result.data : []);
            setLoading(false);
        }
    }["useCloverDevices.useCallback[refresh]"], [
        resolvedLocationID
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useCloverDevices.useEffect": ()=>{
            refresh();
        }
    }["useCloverDevices.useEffect"], [
        refresh
    ]);
    return {
        devices,
        loading,
        refresh
    };
}
_s(useCloverDevices, "iN/bSuTKW+zlEGqd0aTXVc/g3HA=");
async function listAvailableDevices(locationID) {
    const resolved = (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$settings$2f$payments$2f$clover$2f$useCloverConnection$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["resolveLocationID"])(locationID);
    if (!resolved) return {
        success: false,
        error: 'Select a location first.'
    };
    return __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].get(`/api/payments/clover/devices/available?locationID=${encodeURIComponent(resolved)}`);
}
async function pairDevice(locationID, { deviceId, name, serial, model }) {
    const resolved = (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$settings$2f$payments$2f$clover$2f$useCloverConnection$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["resolveLocationID"])(locationID);
    if (!resolved) return {
        success: false,
        error: 'Select a location first.'
    };
    return __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].post('/api/payments/clover/devices', {
        locationID: resolved,
        deviceId,
        name,
        serial,
        model
    });
}
async function renameDevice(locationID, id, { name }) {
    const resolved = (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$settings$2f$payments$2f$clover$2f$useCloverConnection$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["resolveLocationID"])(locationID);
    if (!resolved) return {
        success: false,
        error: 'Select a location first.'
    };
    return __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].patch(`/api/payments/clover/devices/${id}?locationID=${encodeURIComponent(resolved)}`, {
        name
    });
}
async function unpairDevice(locationID, id) {
    const resolved = (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$settings$2f$payments$2f$clover$2f$useCloverConnection$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["resolveLocationID"])(locationID);
    if (!resolved) return {
        success: false,
        error: 'Select a location first.'
    };
    return __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].delete(`/api/payments/clover/devices/${id}?locationID=${encodeURIComponent(resolved)}`);
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/settings/payments/stripe/useStripeConnection.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useStripeConnection",
    ()=>useStripeConnection
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/api.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$settings$2f$payments$2f$clover$2f$useCloverConnection$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/settings/payments/clover/useCloverConnection.js [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
const initialState = {
    status: 'loading',
    configured: true,
    accountName: null,
    accountId: null,
    chargesEnabled: false,
    detailsSubmitted: false,
    connectedAt: null,
    webhookLastReceivedAt: null,
    paymentProvider: null,
    lastError: null
};
function useStripeConnection(locationID) {
    _s();
    const [state, setState] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(initialState);
    const resolvedLocationID = (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$settings$2f$payments$2f$clover$2f$useCloverConnection$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["resolveLocationID"])(locationID);
    const refresh = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useStripeConnection.useCallback[refresh]": async ()=>{
            if (!resolvedLocationID) {
                setState({
                    ...initialState,
                    status: 'disconnected'
                });
                return;
            }
            setState({
                "useStripeConnection.useCallback[refresh]": (prev)=>({
                        ...prev,
                        status: 'loading'
                    })
            }["useStripeConnection.useCallback[refresh]"]);
            const res = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].get(`/api/payments/stripe/status?locationID=${encodeURIComponent(resolvedLocationID)}`);
            if (res.success && res.data) {
                setState({
                    status: res.data.connected ? 'connected' : 'disconnected',
                    configured: res.data.configured !== false,
                    accountName: res.data.accountName ?? null,
                    accountId: res.data.accountId ?? null,
                    chargesEnabled: Boolean(res.data.chargesEnabled),
                    detailsSubmitted: Boolean(res.data.detailsSubmitted),
                    connectedAt: res.data.connectedAt ?? null,
                    webhookLastReceivedAt: res.data.webhookLastReceivedAt ?? null,
                    paymentProvider: res.data.paymentProvider ?? null,
                    lastError: null
                });
            } else {
                setState({
                    ...initialState,
                    status: 'disconnected',
                    lastError: res.error || null
                });
            }
        }
    }["useStripeConnection.useCallback[refresh]"], [
        resolvedLocationID
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useStripeConnection.useEffect": ()=>{
            refresh();
        }
    }["useStripeConnection.useEffect"], [
        refresh
    ]);
    const connect = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useStripeConnection.useCallback[connect]": async ()=>{
            if (!resolvedLocationID) return {
                success: false,
                error: 'Select a location first.'
            };
            const res = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].get(`/api/payments/stripe/connect?locationID=${encodeURIComponent(resolvedLocationID)}`);
            if (res.success && res.data?.authorizeUrl) {
                window.location.href = res.data.authorizeUrl;
                return {
                    success: true
                };
            }
            return {
                success: false,
                error: res.error || 'Unable to start the Stripe connection.'
            };
        }
    }["useStripeConnection.useCallback[connect]"], [
        resolvedLocationID
    ]);
    const disconnect = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useStripeConnection.useCallback[disconnect]": async ()=>{
            if (!resolvedLocationID) return {
                success: false,
                error: 'Select a location first.'
            };
            const res = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].post('/api/payments/stripe/disconnect', {
                locationID: resolvedLocationID
            });
            if (res.success) await refresh();
            return {
                success: res.success,
                error: res.error
            };
        }
    }["useStripeConnection.useCallback[disconnect]"], [
        resolvedLocationID,
        refresh
    ]);
    const setProvider = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useStripeConnection.useCallback[setProvider]": async (provider)=>{
            if (!resolvedLocationID) return {
                success: false,
                error: 'Select a location first.'
            };
            const res = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].post('/api/payments/stripe/provider', {
                provider,
                locationID: resolvedLocationID
            });
            if (res.success) await refresh();
            return {
                success: res.success,
                error: res.error
            };
        }
    }["useStripeConnection.useCallback[setProvider]"], [
        resolvedLocationID,
        refresh
    ]);
    return {
        ...state,
        refresh,
        connect,
        disconnect,
        setProvider
    };
}
_s(useStripeConnection, "YE76sde+OwEUyQ5KKySnvg6aZis=");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/settings/payments/useCardProcessor.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useCardProcessor",
    ()=>useCardProcessor
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$settings$2f$payments$2f$clover$2f$useCloverConnection$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/settings/payments/clover/useCloverConnection.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$settings$2f$payments$2f$stripe$2f$useStripeConnection$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/settings/payments/stripe/useStripeConnection.js [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
'use client';
;
;
function useCardProcessor(locationID) {
    _s();
    const clover = (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$settings$2f$payments$2f$clover$2f$useCloverConnection$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCloverConnection"])(locationID);
    const stripe = (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$settings$2f$payments$2f$stripe$2f$useStripeConnection$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useStripeConnection"])(locationID);
    const cloverReady = clover.cloverReady;
    const stripeReady = stripe.status === 'connected' && stripe.chargesEnabled;
    let provider = null;
    if (stripe.paymentProvider === 'stripe' && stripeReady) provider = 'stripe';
    else if (stripe.paymentProvider === 'clover' && cloverReady) provider = 'clover';
    else if (stripeReady && !cloverReady) provider = 'stripe';
    else if (cloverReady && !stripeReady) provider = 'clover';
    else if (cloverReady && stripeReady) provider = 'clover'; // both, no explicit choice
    return {
        ready: cloverReady || stripeReady,
        provider,
        cloverReady,
        stripeReady
    };
}
_s(useCardProcessor, "XJ/Z8YAW+eM8nxEsEcqZW7VHQGQ=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$settings$2f$payments$2f$clover$2f$useCloverConnection$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCloverConnection"],
        __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$settings$2f$payments$2f$stripe$2f$useStripeConnection$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useStripeConnection"]
    ];
});
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/settings/setup/components/EventsPurchases.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "CreateEventPurchaseDialog",
    ()=>CreateEventPurchaseDialog,
    "EventTypesTab",
    ()=>EventTypesTab,
    "ProductsTab",
    ()=>ProductsTab,
    "SavedTemplatesTab",
    ()=>SavedTemplatesTab
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/plus.js [app-client] (ecmascript) <export default as Plus>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$ellipsis$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MoreHorizontal$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/ellipsis.js [app-client] (ecmascript) <export default as MoreHorizontal>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trash$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Trash2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/trash-2.js [app-client] (ecmascript) <export default as Trash2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/x.js [app-client] (ecmascript) <export default as X>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$grip$2d$vertical$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__GripVertical$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/grip-vertical.js [app-client] (ecmascript) <export default as GripVertical>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$dnd$2d$kit$2f$core$2f$dist$2f$core$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@dnd-kit/core/dist/core.esm.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$dnd$2d$kit$2f$sortable$2f$dist$2f$sortable$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@dnd-kit/sortable/dist/sortable.esm.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$dnd$2d$kit$2f$utilities$2f$dist$2f$utilities$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@dnd-kit/utilities/dist/utilities.esm.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$table$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/table.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$dialog$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/dialog.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$sheet$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/sheet.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$dropdown$2d$menu$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/dropdown-menu.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/button.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$input$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/input.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$label$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/label.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$search$2d$input$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/search-input.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/api.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/utils.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$studioLocalDate$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/studioLocalDate.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$toast$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/toast.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$shared$2f$GlobalLoader$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/shared/GlobalLoader.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$shared$2f$LocationSelector$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/shared/LocationSelector.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$payments$2f$SavedCardField$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/payments/SavedCardField.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$payments$2f$CheckNumberField$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/payments/CheckNumberField.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$payments$2f$TerminalDeviceField$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/payments/TerminalDeviceField.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$payments$2f$PaymentMethodPicker$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/payments/PaymentMethodPicker.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$payments$2f$SendPaymentLinkMenu$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/payments/SendPaymentLinkMenu.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$paymentMethods$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/paymentMethods.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$payments$2f$WalletShortfallField$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/payments/WalletShortfallField.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$settings$2f$payments$2f$useCardProcessor$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/settings/payments/useCardProcessor.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature(), _s2 = __turbopack_context__.k.signature(), _s3 = __turbopack_context__.k.signature(), _s4 = __turbopack_context__.k.signature(), _s5 = __turbopack_context__.k.signature(), _s6 = __turbopack_context__.k.signature(), _s7 = __turbopack_context__.k.signature(), _s8 = __turbopack_context__.k.signature();
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
// Wallet sits beside the other methods; a balance too small for today's amount asks how to collect the rest.
const PURCHASE_PAY_METHODS = [
    ...__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$paymentMethods$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PAYMENT_METHODS_WITH_SAVED_CARD"],
    __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$paymentMethods$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SHARE_LINK_METHOD"]
];
// A plan's card/ACH charge takes the whole installment, so only these can share one with the wallet.
const PLAN_SHORTFALL_METHODS = __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$paymentMethods$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SHORTFALL_METHODS"].filter(_c = (m)=>[
        'cash',
        'cheque'
    ].includes(m.value));
_c1 = PLAN_SHORTFALL_METHODS;
;
const money = (n)=>`$${Number(n || 0).toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    })}`;
const selectCls = 'h-9 rounded-md border border-border bg-background px-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring';
function StatusBadge({ active }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
        className: [
            'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium',
            active ? 'bg-success/10 text-success' : 'bg-muted text-muted-foreground'
        ].join(' '),
        children: active ? 'Active' : 'Inactive'
    }, void 0, false, {
        fileName: "[project]/app/settings/setup/components/EventsPurchases.js",
        lineNumber: 48,
        columnNumber: 5
    }, this);
}
_c2 = StatusBadge;
function Shell({ count, noun, onAdd, addLabel, search, setSearch, children }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex flex-col gap-6",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center justify-between gap-3",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$search$2d$input$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        className: "w-[220px] shrink-0",
                        placeholder: `Search ${noun}…`,
                        value: search,
                        onChange: (e)=>setSearch(e.target.value)
                    }, void 0, false, {
                        fileName: "[project]/app/settings/setup/components/EventsPurchases.js",
                        lineNumber: 58,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "inline-flex items-center rounded-md px-2 py-0.5 text-xs font-medium text-brand bg-background border border-border",
                                children: [
                                    count,
                                    " ",
                                    count === 1 ? noun.replace(/s$/, '') : noun
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/settings/setup/components/EventsPurchases.js",
                                lineNumber: 60,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                className: "h-9 px-4 rounded-lg bg-brand hover:bg-brand-dark text-brand-foreground text-sm font-medium gap-2 shrink-0",
                                onClick: onAdd,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__["Plus"], {
                                        className: "h-4 w-4"
                                    }, void 0, false, {
                                        fileName: "[project]/app/settings/setup/components/EventsPurchases.js",
                                        lineNumber: 64,
                                        columnNumber: 13
                                    }, this),
                                    addLabel
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/settings/setup/components/EventsPurchases.js",
                                lineNumber: 63,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/settings/setup/components/EventsPurchases.js",
                        lineNumber: 59,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/settings/setup/components/EventsPurchases.js",
                lineNumber: 57,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "rounded-xl border border-border bg-card min-h-[420px] overflow-x-auto",
                children: children
            }, void 0, false, {
                fileName: "[project]/app/settings/setup/components/EventsPurchases.js",
                lineNumber: 69,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/settings/setup/components/EventsPurchases.js",
        lineNumber: 56,
        columnNumber: 5
    }, this);
}
_c3 = Shell;
/* Drag-to-reorder rows, same behaviour as the Scheduled Offerings tables. */ function SortableRow({ id, disabled, onClick, children }) {
    _s();
    const { attributes, listeners, setNodeRef, transform, transition, isDragging } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$dnd$2d$kit$2f$sortable$2f$dist$2f$sortable$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSortable"])({
        id,
        disabled
    });
    const style = {
        transform: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$dnd$2d$kit$2f$utilities$2f$dist$2f$utilities$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CSS"].Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.5 : 1
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$table$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TableRow"], {
        ref: setNodeRef,
        style: style,
        className: "border-b border-border hover:bg-muted/30 transition-colors cursor-pointer",
        onClick: onClick,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$table$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TableCell"], {
                className: "py-3 pl-2 pr-0 w-8",
                onClick: (e)=>e.stopPropagation(),
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                    type: "button",
                    disabled: disabled,
                    "aria-label": "Drag to reorder",
                    title: disabled ? 'Clear search to reorder' : undefined,
                    className: "cursor-grab active:cursor-grabbing p-1 text-muted-foreground hover:text-foreground touch-none disabled:opacity-30 disabled:cursor-not-allowed",
                    ...attributes,
                    ...listeners,
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$grip$2d$vertical$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__GripVertical$3e$__["GripVertical"], {
                        className: "h-4 w-4"
                    }, void 0, false, {
                        fileName: "[project]/app/settings/setup/components/EventsPurchases.js",
                        lineNumber: 85,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/app/settings/setup/components/EventsPurchases.js",
                    lineNumber: 83,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/settings/setup/components/EventsPurchases.js",
                lineNumber: 82,
                columnNumber: 7
            }, this),
            children
        ]
    }, void 0, true, {
        fileName: "[project]/app/settings/setup/components/EventsPurchases.js",
        lineNumber: 81,
        columnNumber: 5
    }, this);
}
_s(SortableRow, "wZ9LrlAdu45h+k5IBlwhyTPFbVs=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$dnd$2d$kit$2f$sortable$2f$dist$2f$sortable$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSortable"]
    ];
});
_c4 = SortableRow;
function SortableTable({ rows, setRows, url, reload, children }) {
    _s1();
    const sensors = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$dnd$2d$kit$2f$core$2f$dist$2f$core$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSensors"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$dnd$2d$kit$2f$core$2f$dist$2f$core$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSensor"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$dnd$2d$kit$2f$core$2f$dist$2f$core$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PointerSensor"], {
        activationConstraint: {
            distance: 5
        }
    }));
    async function onDragEnd({ active, over }) {
        if (!over || active.id === over.id) return;
        const next = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$dnd$2d$kit$2f$sortable$2f$dist$2f$sortable$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["arrayMove"])(rows, rows.findIndex((r)=>r._id === active.id), rows.findIndex((r)=>r._id === over.id));
        setRows(next);
        const res = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].patch(`${url}/reorder`, {
            order: next.map((r)=>r._id),
            startIndex: 0
        });
        if (!res.success) {
            __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$toast$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error('Failed to save order', {
                description: res.error
            });
            reload();
        }
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$dnd$2d$kit$2f$core$2f$dist$2f$core$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DndContext"], {
        sensors: sensors,
        collisionDetection: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$dnd$2d$kit$2f$core$2f$dist$2f$core$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["closestCenter"],
        onDragEnd: onDragEnd,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$table$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Table"], {
            children: children
        }, void 0, false, {
            fileName: "[project]/app/settings/setup/components/EventsPurchases.js",
            lineNumber: 104,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/app/settings/setup/components/EventsPurchases.js",
        lineNumber: 103,
        columnNumber: 5
    }, this);
}
_s1(SortableTable, "H6JV9DRwuHm/UEUj038pRxJnNmw=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$dnd$2d$kit$2f$core$2f$dist$2f$core$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSensors"]
    ];
});
_c5 = SortableTable;
/* ─────────────────────────── Products ─────────────────────────── */ const locIds = (x)=>(Array.isArray(x) ? x : x ? [
        x
    ] : []).map((l)=>l?._id ?? l).filter(Boolean);
function ProductDialog({ open, onClose, product, onRefresh }) {
    _s2();
    const isEdit = Boolean(product);
    const [form, setForm] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        name: '',
        description: '',
        defaultPrice: '',
        locationID: []
    });
    const [saving, setSaving] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ProductDialog.useEffect": ()=>{
            if (!open) return;
            setForm(product ? {
                name: product.name || '',
                description: product.description || '',
                defaultPrice: product.defaultPrice ?? '',
                locationID: locIds(product.locationID)
            } : {
                name: '',
                description: '',
                defaultPrice: '',
                locationID: []
            });
        }
    }["ProductDialog.useEffect"], [
        open,
        product
    ]);
    async function submit(e) {
        e.preventDefault();
        if (!form.name.trim()) {
            __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$toast$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error('Name is required');
            return;
        }
        if (!form.locationID.length) {
            __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$toast$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error('Please select at least one location');
            return;
        }
        setSaving(true);
        try {
            const payload = {
                locationID: form.locationID,
                name: form.name.trim(),
                description: form.description.trim() || undefined,
                defaultPrice: Number(form.defaultPrice) || 0
            };
            const res = isEdit ? await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].put(`/api/product/${product._id}`, payload) : await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].post('/api/product', payload);
            if (res.success) {
                __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$toast$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].success(isEdit ? 'Product updated' : 'Product created');
                onRefresh();
                onClose();
            } else __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$toast$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error('Failed', {
                description: res.error
            });
        } finally{
            setSaving(false);
        }
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$dialog$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Dialog"], {
        open: open,
        onClose: onClose,
        maxWidth: "md",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$dialog$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DialogContent"], {
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$dialog$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DialogHeader"], {
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$dialog$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DialogTitle"], {
                        children: isEdit ? 'Edit Product' : 'Add Product'
                    }, void 0, false, {
                        fileName: "[project]/app/settings/setup/components/EventsPurchases.js",
                        lineNumber: 141,
                        columnNumber: 23
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/app/settings/setup/components/EventsPurchases.js",
                    lineNumber: 141,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                    onSubmit: submit,
                    className: "flex flex-col gap-4 py-2",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex flex-col gap-1.5",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$label$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Label"], {
                                    children: "Location"
                                }, void 0, false, {
                                    fileName: "[project]/app/settings/setup/components/EventsPurchases.js",
                                    lineNumber: 144,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$shared$2f$LocationSelector$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                    value: form.locationID,
                                    onChange: (ids)=>setForm((f)=>({
                                                ...f,
                                                locationID: ids
                                            })),
                                    multiple: true
                                }, void 0, false, {
                                    fileName: "[project]/app/settings/setup/components/EventsPurchases.js",
                                    lineNumber: 145,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/settings/setup/components/EventsPurchases.js",
                            lineNumber: 143,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex flex-col gap-1.5",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$label$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Label"], {
                                    htmlFor: "p-name",
                                    children: "Name"
                                }, void 0, false, {
                                    fileName: "[project]/app/settings/setup/components/EventsPurchases.js",
                                    lineNumber: 148,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$input$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Input"], {
                                    id: "p-name",
                                    placeholder: "Guest ticket, hotel night…",
                                    value: form.name,
                                    onChange: (e)=>setForm((f)=>({
                                                ...f,
                                                name: e.target.value
                                            }))
                                }, void 0, false, {
                                    fileName: "[project]/app/settings/setup/components/EventsPurchases.js",
                                    lineNumber: 149,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/settings/setup/components/EventsPurchases.js",
                            lineNumber: 147,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex flex-col gap-1.5",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$label$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Label"], {
                                    htmlFor: "p-desc",
                                    children: "Description"
                                }, void 0, false, {
                                    fileName: "[project]/app/settings/setup/components/EventsPurchases.js",
                                    lineNumber: 152,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$input$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Input"], {
                                    id: "p-desc",
                                    placeholder: "Optional",
                                    value: form.description,
                                    onChange: (e)=>setForm((f)=>({
                                                ...f,
                                                description: e.target.value
                                            }))
                                }, void 0, false, {
                                    fileName: "[project]/app/settings/setup/components/EventsPurchases.js",
                                    lineNumber: 153,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/settings/setup/components/EventsPurchases.js",
                            lineNumber: 151,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex flex-col gap-1.5",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$label$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Label"], {
                                    htmlFor: "p-price",
                                    children: "Default price"
                                }, void 0, false, {
                                    fileName: "[project]/app/settings/setup/components/EventsPurchases.js",
                                    lineNumber: 156,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$input$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Input"], {
                                    id: "p-price",
                                    type: "number",
                                    min: "0",
                                    step: "any",
                                    placeholder: "0.00",
                                    value: form.defaultPrice,
                                    onChange: (e)=>setForm((f)=>({
                                                ...f,
                                                defaultPrice: e.target.value
                                            }))
                                }, void 0, false, {
                                    fileName: "[project]/app/settings/setup/components/EventsPurchases.js",
                                    lineNumber: 157,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/settings/setup/components/EventsPurchases.js",
                            lineNumber: 155,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$dialog$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DialogFooter"], {
                            className: "pt-2",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                    type: "button",
                                    variant: "outline",
                                    onClick: onClose,
                                    disabled: saving,
                                    children: "Cancel"
                                }, void 0, false, {
                                    fileName: "[project]/app/settings/setup/components/EventsPurchases.js",
                                    lineNumber: 160,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                    type: "submit",
                                    disabled: saving,
                                    children: saving ? 'Saving…' : isEdit ? 'Save changes' : 'Create product'
                                }, void 0, false, {
                                    fileName: "[project]/app/settings/setup/components/EventsPurchases.js",
                                    lineNumber: 161,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/settings/setup/components/EventsPurchases.js",
                            lineNumber: 159,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/settings/setup/components/EventsPurchases.js",
                    lineNumber: 142,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/app/settings/setup/components/EventsPurchases.js",
            lineNumber: 140,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/app/settings/setup/components/EventsPurchases.js",
        lineNumber: 139,
        columnNumber: 5
    }, this);
}
_s2(ProductDialog, "QeieXAMxNHwYqOij07foBmvgLto=");
_c6 = ProductDialog;
function ProductsTab() {
    _s3();
    const [rows, setRows] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [count, setCount] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    const [search, setSearch] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [dialogOpen, setDialogOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [editing, setEditing] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const load = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "ProductsTab.useCallback[load]": async (s)=>{
            setLoading(true);
            try {
                const params = new URLSearchParams({
                    limit: '100'
                });
                if (s) params.set('search', s);
                const res = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].get(`/api/product?${params}`);
                if (res.success) {
                    setRows(Array.isArray(res.data) ? res.data : []);
                    setCount(res.pagination?.total ?? res.data?.length ?? 0);
                } else __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$toast$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error('Failed to load products', {
                    description: res.error
                });
            } finally{
                setLoading(false);
            }
        }
    }["ProductsTab.useCallback[load]"], []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ProductsTab.useEffect": ()=>{
            const t = setTimeout({
                "ProductsTab.useEffect.t": ()=>load(search)
            }["ProductsTab.useEffect.t"], 250);
            return ({
                "ProductsTab.useEffect": ()=>clearTimeout(t)
            })["ProductsTab.useEffect"];
        }
    }["ProductsTab.useEffect"], [
        search,
        load
    ]);
    async function remove(row) {
        if (!window.confirm(`Delete "${row.name}"?`)) return;
        const res = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].delete(`/api/product/${row._id}`);
        if (res.success) {
            __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$toast$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].success('Product deleted');
            load(search);
        } else __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$toast$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error('Delete failed', {
            description: res.error
        });
    }
    async function toggle(row) {
        const res = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].patch(`/api/product/${row._id}/toggle`);
        if (res.success) {
            load(search);
        } else __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$toast$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error('Failed', {
            description: res.error
        });
    }
    if (loading && rows.length === 0) return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex items-center justify-center h-64",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$shared$2f$GlobalLoader$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
            variant: "center",
            size: "md",
            text: "Loading products…"
        }, void 0, false, {
            fileName: "[project]/app/settings/setup/components/EventsPurchases.js",
            lineNumber: 200,
            columnNumber: 99
        }, this)
    }, void 0, false, {
        fileName: "[project]/app/settings/setup/components/EventsPurchases.js",
        lineNumber: 200,
        columnNumber: 44
    }, this);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Shell, {
        count: count,
        noun: "products",
        addLabel: "Add Product",
        onAdd: ()=>{
            setEditing(null);
            setDialogOpen(true);
        },
        search: search,
        setSearch: setSearch,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SortableTable, {
                rows: rows,
                setRows: setRows,
                url: "/api/product",
                reload: ()=>load(search),
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$table$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TableHeader"], {
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$table$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TableRow"], {
                            className: "border-b border-border hover:bg-transparent bg-muted/30",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$table$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TableHead"], {
                                    className: "w-8 py-3 pl-2 pr-0"
                                }, void 0, false, {
                                    fileName: "[project]/app/settings/setup/components/EventsPurchases.js",
                                    lineNumber: 207,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$table$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TableHead"], {
                                    className: "py-3 px-4 text-xs font-medium text-muted-foreground",
                                    children: "Name"
                                }, void 0, false, {
                                    fileName: "[project]/app/settings/setup/components/EventsPurchases.js",
                                    lineNumber: 208,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$table$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TableHead"], {
                                    className: "py-3 px-4 text-xs font-medium text-muted-foreground",
                                    children: "Description"
                                }, void 0, false, {
                                    fileName: "[project]/app/settings/setup/components/EventsPurchases.js",
                                    lineNumber: 209,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$table$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TableHead"], {
                                    className: "py-3 px-4 text-xs font-medium text-muted-foreground",
                                    children: "Default Price"
                                }, void 0, false, {
                                    fileName: "[project]/app/settings/setup/components/EventsPurchases.js",
                                    lineNumber: 210,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$table$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TableHead"], {
                                    className: "py-3 px-4 text-xs font-medium text-muted-foreground",
                                    children: "Status"
                                }, void 0, false, {
                                    fileName: "[project]/app/settings/setup/components/EventsPurchases.js",
                                    lineNumber: 211,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$table$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TableHead"], {
                                    className: "w-12 py-3 pr-4 pl-0"
                                }, void 0, false, {
                                    fileName: "[project]/app/settings/setup/components/EventsPurchases.js",
                                    lineNumber: 212,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/settings/setup/components/EventsPurchases.js",
                            lineNumber: 206,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/settings/setup/components/EventsPurchases.js",
                        lineNumber: 205,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$table$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TableBody"], {
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$dnd$2d$kit$2f$sortable$2f$dist$2f$sortable$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SortableContext"], {
                            items: rows.map((r)=>r._id),
                            strategy: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$dnd$2d$kit$2f$sortable$2f$dist$2f$sortable$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["verticalListSortingStrategy"],
                            children: rows.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$table$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TableRow"], {
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$table$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TableCell"], {
                                    colSpan: 6,
                                    className: "py-16 text-center text-sm text-muted-foreground",
                                    children: search ? 'No products match your search.' : 'No products yet. Click "Add Product" to create one.'
                                }, void 0, false, {
                                    fileName: "[project]/app/settings/setup/components/EventsPurchases.js",
                                    lineNumber: 218,
                                    columnNumber: 23
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/app/settings/setup/components/EventsPurchases.js",
                                lineNumber: 218,
                                columnNumber: 13
                            }, this) : rows.map((row)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SortableRow, {
                                    id: row._id,
                                    disabled: !!search,
                                    onClick: ()=>{
                                        setEditing(row);
                                        setDialogOpen(true);
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$table$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TableCell"], {
                                            className: "py-3 px-4 text-sm font-medium text-foreground",
                                            children: row.name
                                        }, void 0, false, {
                                            fileName: "[project]/app/settings/setup/components/EventsPurchases.js",
                                            lineNumber: 221,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$table$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TableCell"], {
                                            className: "py-3 px-4 text-sm text-muted-foreground max-w-[280px] truncate",
                                            children: row.description || '—'
                                        }, void 0, false, {
                                            fileName: "[project]/app/settings/setup/components/EventsPurchases.js",
                                            lineNumber: 222,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$table$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TableCell"], {
                                            className: "py-3 px-4 text-sm text-foreground",
                                            children: money(row.defaultPrice)
                                        }, void 0, false, {
                                            fileName: "[project]/app/settings/setup/components/EventsPurchases.js",
                                            lineNumber: 223,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$table$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TableCell"], {
                                            className: "py-3 px-4",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(StatusBadge, {
                                                active: row.isActive
                                            }, void 0, false, {
                                                fileName: "[project]/app/settings/setup/components/EventsPurchases.js",
                                                lineNumber: 224,
                                                columnNumber: 48
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/app/settings/setup/components/EventsPurchases.js",
                                            lineNumber: 224,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$table$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TableCell"], {
                                            className: "py-3 pr-4 pl-0",
                                            onClick: (e)=>e.stopPropagation(),
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$dropdown$2d$menu$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DropdownMenu"], {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$dropdown$2d$menu$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DropdownMenuTrigger"], {
                                                        asChild: true,
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                            type: "button",
                                                            className: "p-1.5 rounded-md hover:bg-muted/50 text-muted-foreground hover:text-foreground",
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$ellipsis$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MoreHorizontal$3e$__["MoreHorizontal"], {
                                                                className: "h-4 w-4"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/settings/setup/components/EventsPurchases.js",
                                                                lineNumber: 227,
                                                                columnNumber: 161
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/settings/setup/components/EventsPurchases.js",
                                                            lineNumber: 227,
                                                            columnNumber: 48
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/settings/setup/components/EventsPurchases.js",
                                                        lineNumber: 227,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$dropdown$2d$menu$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DropdownMenuContent"], {
                                                        align: "end",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$dropdown$2d$menu$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DropdownMenuItem"], {
                                                                onClick: ()=>{
                                                                    setEditing(row);
                                                                    setDialogOpen(true);
                                                                },
                                                                children: "Edit"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/settings/setup/components/EventsPurchases.js",
                                                                lineNumber: 229,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$dropdown$2d$menu$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DropdownMenuItem"], {
                                                                onClick: ()=>toggle(row),
                                                                children: row.isActive ? 'Deactivate' : 'Activate'
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/settings/setup/components/EventsPurchases.js",
                                                                lineNumber: 230,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$dropdown$2d$menu$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DropdownMenuItem"], {
                                                                className: "text-destructive",
                                                                onClick: ()=>remove(row),
                                                                children: "Delete"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/settings/setup/components/EventsPurchases.js",
                                                                lineNumber: 231,
                                                                columnNumber: 21
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/settings/setup/components/EventsPurchases.js",
                                                        lineNumber: 228,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/settings/setup/components/EventsPurchases.js",
                                                lineNumber: 226,
                                                columnNumber: 17
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/app/settings/setup/components/EventsPurchases.js",
                                            lineNumber: 225,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, row._id, true, {
                                    fileName: "[project]/app/settings/setup/components/EventsPurchases.js",
                                    lineNumber: 220,
                                    columnNumber: 13
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/app/settings/setup/components/EventsPurchases.js",
                            lineNumber: 216,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/settings/setup/components/EventsPurchases.js",
                        lineNumber: 215,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/settings/setup/components/EventsPurchases.js",
                lineNumber: 204,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ProductDialog, {
                open: dialogOpen,
                onClose: ()=>setDialogOpen(false),
                product: editing,
                onRefresh: ()=>load(search)
            }, void 0, false, {
                fileName: "[project]/app/settings/setup/components/EventsPurchases.js",
                lineNumber: 240,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/settings/setup/components/EventsPurchases.js",
        lineNumber: 203,
        columnNumber: 5
    }, this);
}
_s3(ProductsTab, "uRa8C6XlS4KeYYKJxTnumPpK0MI=");
_c7 = ProductsTab;
/* ─────────────────────────── Event Types ─────────────────────────── */ function EventTypeDialog({ open, onClose, eventType, onRefresh }) {
    _s4();
    const isEdit = Boolean(eventType);
    const [form, setForm] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        name: '',
        description: '',
        locationID: []
    });
    const [saving, setSaving] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "EventTypeDialog.useEffect": ()=>{
            if (!open) return;
            setForm(eventType ? {
                name: eventType.name || '',
                description: eventType.description || '',
                locationID: locIds(eventType.locationID)
            } : {
                name: '',
                description: '',
                locationID: []
            });
        }
    }["EventTypeDialog.useEffect"], [
        open,
        eventType
    ]);
    async function submit(e) {
        e.preventDefault();
        if (!form.name.trim()) {
            __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$toast$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error('Name is required');
            return;
        }
        if (!form.locationID.length) {
            __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$toast$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error('Please select at least one location');
            return;
        }
        setSaving(true);
        try {
            const payload = {
                locationID: form.locationID,
                name: form.name.trim(),
                description: form.description.trim() || undefined
            };
            const res = isEdit ? await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].put(`/api/event-type/${eventType._id}`, payload) : await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].post('/api/event-type', payload);
            if (res.success) {
                __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$toast$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].success(isEdit ? 'Event type updated' : 'Event type created');
                onRefresh();
                onClose();
            } else __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$toast$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error('Failed', {
                description: res.error
            });
        } finally{
            setSaving(false);
        }
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$dialog$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Dialog"], {
        open: open,
        onClose: onClose,
        maxWidth: "md",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$dialog$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DialogContent"], {
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$dialog$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DialogHeader"], {
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$dialog$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DialogTitle"], {
                        children: isEdit ? 'Edit Event Type' : 'Add Event Type'
                    }, void 0, false, {
                        fileName: "[project]/app/settings/setup/components/EventsPurchases.js",
                        lineNumber: 273,
                        columnNumber: 23
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/app/settings/setup/components/EventsPurchases.js",
                    lineNumber: 273,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                    onSubmit: submit,
                    className: "flex flex-col gap-4 py-2",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex flex-col gap-1.5",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$label$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Label"], {
                                    children: "Location"
                                }, void 0, false, {
                                    fileName: "[project]/app/settings/setup/components/EventsPurchases.js",
                                    lineNumber: 276,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$shared$2f$LocationSelector$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                    value: form.locationID,
                                    onChange: (ids)=>setForm((f)=>({
                                                ...f,
                                                locationID: ids
                                            })),
                                    multiple: true
                                }, void 0, false, {
                                    fileName: "[project]/app/settings/setup/components/EventsPurchases.js",
                                    lineNumber: 277,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/settings/setup/components/EventsPurchases.js",
                            lineNumber: 275,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex flex-col gap-1.5",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$label$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Label"], {
                                    htmlFor: "et-name",
                                    children: "Name"
                                }, void 0, false, {
                                    fileName: "[project]/app/settings/setup/components/EventsPurchases.js",
                                    lineNumber: 280,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$input$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Input"], {
                                    id: "et-name",
                                    placeholder: "Competition, showcase, retreat…",
                                    value: form.name,
                                    onChange: (e)=>setForm((f)=>({
                                                ...f,
                                                name: e.target.value
                                            }))
                                }, void 0, false, {
                                    fileName: "[project]/app/settings/setup/components/EventsPurchases.js",
                                    lineNumber: 281,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/settings/setup/components/EventsPurchases.js",
                            lineNumber: 279,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex flex-col gap-1.5",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$label$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Label"], {
                                    htmlFor: "et-desc",
                                    children: "Description"
                                }, void 0, false, {
                                    fileName: "[project]/app/settings/setup/components/EventsPurchases.js",
                                    lineNumber: 284,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$input$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Input"], {
                                    id: "et-desc",
                                    placeholder: "Optional",
                                    value: form.description,
                                    onChange: (e)=>setForm((f)=>({
                                                ...f,
                                                description: e.target.value
                                            }))
                                }, void 0, false, {
                                    fileName: "[project]/app/settings/setup/components/EventsPurchases.js",
                                    lineNumber: 285,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/settings/setup/components/EventsPurchases.js",
                            lineNumber: 283,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$dialog$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DialogFooter"], {
                            className: "pt-2",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                    type: "button",
                                    variant: "outline",
                                    onClick: onClose,
                                    disabled: saving,
                                    children: "Cancel"
                                }, void 0, false, {
                                    fileName: "[project]/app/settings/setup/components/EventsPurchases.js",
                                    lineNumber: 288,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                    type: "submit",
                                    disabled: saving,
                                    children: saving ? 'Saving…' : isEdit ? 'Save changes' : 'Create event type'
                                }, void 0, false, {
                                    fileName: "[project]/app/settings/setup/components/EventsPurchases.js",
                                    lineNumber: 289,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/settings/setup/components/EventsPurchases.js",
                            lineNumber: 287,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/settings/setup/components/EventsPurchases.js",
                    lineNumber: 274,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/app/settings/setup/components/EventsPurchases.js",
            lineNumber: 272,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/app/settings/setup/components/EventsPurchases.js",
        lineNumber: 271,
        columnNumber: 5
    }, this);
}
_s4(EventTypeDialog, "bt89fG5kjBvLGjJuRvYi1t6Zn/Q=");
_c8 = EventTypeDialog;
function EventTypesTab() {
    _s5();
    const [rows, setRows] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [count, setCount] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    const [search, setSearch] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [dialogOpen, setDialogOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [editing, setEditing] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const load = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "EventTypesTab.useCallback[load]": async (s)=>{
            setLoading(true);
            try {
                const params = new URLSearchParams({
                    limit: '100'
                });
                if (s) params.set('search', s);
                const res = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].get(`/api/event-type?${params}`);
                if (res.success) {
                    setRows(Array.isArray(res.data) ? res.data : []);
                    setCount(res.pagination?.total ?? res.data?.length ?? 0);
                } else __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$toast$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error('Failed to load event types', {
                    description: res.error
                });
            } finally{
                setLoading(false);
            }
        }
    }["EventTypesTab.useCallback[load]"], []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "EventTypesTab.useEffect": ()=>{
            const t = setTimeout({
                "EventTypesTab.useEffect.t": ()=>load(search)
            }["EventTypesTab.useEffect.t"], 250);
            return ({
                "EventTypesTab.useEffect": ()=>clearTimeout(t)
            })["EventTypesTab.useEffect"];
        }
    }["EventTypesTab.useEffect"], [
        search,
        load
    ]);
    async function remove(row) {
        if (!window.confirm(`Delete "${row.name}"?`)) return;
        const res = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].delete(`/api/event-type/${row._id}`);
        if (res.success) {
            __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$toast$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].success('Event type deleted');
            load(search);
        } else __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$toast$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error('Delete failed', {
            description: res.error
        });
    }
    async function toggle(row) {
        const res = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].patch(`/api/event-type/${row._id}/toggle`);
        if (res.success) {
            load(search);
        } else __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$toast$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error('Failed', {
            description: res.error
        });
    }
    if (loading && rows.length === 0) return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex items-center justify-center h-64",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$shared$2f$GlobalLoader$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
            variant: "center",
            size: "md",
            text: "Loading event types…"
        }, void 0, false, {
            fileName: "[project]/app/settings/setup/components/EventsPurchases.js",
            lineNumber: 328,
            columnNumber: 99
        }, this)
    }, void 0, false, {
        fileName: "[project]/app/settings/setup/components/EventsPurchases.js",
        lineNumber: 328,
        columnNumber: 44
    }, this);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Shell, {
        count: count,
        noun: "event types",
        addLabel: "Add Event Type",
        onAdd: ()=>{
            setEditing(null);
            setDialogOpen(true);
        },
        search: search,
        setSearch: setSearch,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SortableTable, {
                rows: rows,
                setRows: setRows,
                url: "/api/event-type",
                reload: ()=>load(search),
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$table$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TableHeader"], {
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$table$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TableRow"], {
                            className: "border-b border-border hover:bg-transparent bg-muted/30",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$table$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TableHead"], {
                                    className: "w-8 py-3 pl-2 pr-0"
                                }, void 0, false, {
                                    fileName: "[project]/app/settings/setup/components/EventsPurchases.js",
                                    lineNumber: 335,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$table$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TableHead"], {
                                    className: "py-3 px-4 text-xs font-medium text-muted-foreground",
                                    children: "Name"
                                }, void 0, false, {
                                    fileName: "[project]/app/settings/setup/components/EventsPurchases.js",
                                    lineNumber: 336,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$table$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TableHead"], {
                                    className: "py-3 px-4 text-xs font-medium text-muted-foreground",
                                    children: "Description"
                                }, void 0, false, {
                                    fileName: "[project]/app/settings/setup/components/EventsPurchases.js",
                                    lineNumber: 337,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$table$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TableHead"], {
                                    className: "py-3 px-4 text-xs font-medium text-muted-foreground",
                                    children: "Status"
                                }, void 0, false, {
                                    fileName: "[project]/app/settings/setup/components/EventsPurchases.js",
                                    lineNumber: 338,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$table$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TableHead"], {
                                    className: "w-12 py-3 pr-4 pl-0"
                                }, void 0, false, {
                                    fileName: "[project]/app/settings/setup/components/EventsPurchases.js",
                                    lineNumber: 339,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/settings/setup/components/EventsPurchases.js",
                            lineNumber: 334,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/settings/setup/components/EventsPurchases.js",
                        lineNumber: 333,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$table$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TableBody"], {
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$dnd$2d$kit$2f$sortable$2f$dist$2f$sortable$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SortableContext"], {
                            items: rows.map((r)=>r._id),
                            strategy: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$dnd$2d$kit$2f$sortable$2f$dist$2f$sortable$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["verticalListSortingStrategy"],
                            children: rows.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$table$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TableRow"], {
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$table$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TableCell"], {
                                    colSpan: 5,
                                    className: "py-16 text-center text-sm text-muted-foreground",
                                    children: search ? 'No event types match your search.' : 'No event types yet. Click "Add Event Type" to create one.'
                                }, void 0, false, {
                                    fileName: "[project]/app/settings/setup/components/EventsPurchases.js",
                                    lineNumber: 345,
                                    columnNumber: 23
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/app/settings/setup/components/EventsPurchases.js",
                                lineNumber: 345,
                                columnNumber: 13
                            }, this) : rows.map((row)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SortableRow, {
                                    id: row._id,
                                    disabled: !!search,
                                    onClick: ()=>{
                                        setEditing(row);
                                        setDialogOpen(true);
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$table$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TableCell"], {
                                            className: "py-3 px-4 text-sm font-medium text-foreground",
                                            children: row.name
                                        }, void 0, false, {
                                            fileName: "[project]/app/settings/setup/components/EventsPurchases.js",
                                            lineNumber: 348,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$table$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TableCell"], {
                                            className: "py-3 px-4 text-sm text-muted-foreground max-w-[320px] truncate",
                                            children: row.description || '—'
                                        }, void 0, false, {
                                            fileName: "[project]/app/settings/setup/components/EventsPurchases.js",
                                            lineNumber: 349,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$table$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TableCell"], {
                                            className: "py-3 px-4",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(StatusBadge, {
                                                active: row.isActive
                                            }, void 0, false, {
                                                fileName: "[project]/app/settings/setup/components/EventsPurchases.js",
                                                lineNumber: 350,
                                                columnNumber: 48
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/app/settings/setup/components/EventsPurchases.js",
                                            lineNumber: 350,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$table$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TableCell"], {
                                            className: "py-3 pr-4 pl-0",
                                            onClick: (e)=>e.stopPropagation(),
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$dropdown$2d$menu$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DropdownMenu"], {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$dropdown$2d$menu$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DropdownMenuTrigger"], {
                                                        asChild: true,
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                            type: "button",
                                                            className: "p-1.5 rounded-md hover:bg-muted/50 text-muted-foreground hover:text-foreground",
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$ellipsis$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MoreHorizontal$3e$__["MoreHorizontal"], {
                                                                className: "h-4 w-4"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/settings/setup/components/EventsPurchases.js",
                                                                lineNumber: 353,
                                                                columnNumber: 161
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/settings/setup/components/EventsPurchases.js",
                                                            lineNumber: 353,
                                                            columnNumber: 48
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/settings/setup/components/EventsPurchases.js",
                                                        lineNumber: 353,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$dropdown$2d$menu$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DropdownMenuContent"], {
                                                        align: "end",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$dropdown$2d$menu$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DropdownMenuItem"], {
                                                                onClick: ()=>{
                                                                    setEditing(row);
                                                                    setDialogOpen(true);
                                                                },
                                                                children: "Edit"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/settings/setup/components/EventsPurchases.js",
                                                                lineNumber: 355,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$dropdown$2d$menu$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DropdownMenuItem"], {
                                                                onClick: ()=>toggle(row),
                                                                children: row.isActive ? 'Deactivate' : 'Activate'
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/settings/setup/components/EventsPurchases.js",
                                                                lineNumber: 356,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$dropdown$2d$menu$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DropdownMenuItem"], {
                                                                className: "text-destructive",
                                                                onClick: ()=>remove(row),
                                                                children: "Delete"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/settings/setup/components/EventsPurchases.js",
                                                                lineNumber: 357,
                                                                columnNumber: 21
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/settings/setup/components/EventsPurchases.js",
                                                        lineNumber: 354,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/settings/setup/components/EventsPurchases.js",
                                                lineNumber: 352,
                                                columnNumber: 17
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/app/settings/setup/components/EventsPurchases.js",
                                            lineNumber: 351,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, row._id, true, {
                                    fileName: "[project]/app/settings/setup/components/EventsPurchases.js",
                                    lineNumber: 347,
                                    columnNumber: 13
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/app/settings/setup/components/EventsPurchases.js",
                            lineNumber: 343,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/settings/setup/components/EventsPurchases.js",
                        lineNumber: 342,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/settings/setup/components/EventsPurchases.js",
                lineNumber: 332,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(EventTypeDialog, {
                open: dialogOpen,
                onClose: ()=>setDialogOpen(false),
                eventType: editing,
                onRefresh: ()=>load(search)
            }, void 0, false, {
                fileName: "[project]/app/settings/setup/components/EventsPurchases.js",
                lineNumber: 366,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/settings/setup/components/EventsPurchases.js",
        lineNumber: 331,
        columnNumber: 5
    }, this);
}
_s5(EventTypesTab, "uRa8C6XlS4KeYYKJxTnumPpK0MI=");
_c9 = EventTypesTab;
/* ─────────────────────────── Line-item editor (shared) ─────────────────────────── */ const emptyLine = ()=>({
        productID: '',
        name: '',
        quantity: 1,
        unitPrice: 0,
        discount: 0,
        eventDate: ''
    });
const lineTotal = (li)=>Math.max(0, (Number(li.quantity) || 0) * (Number(li.unitPrice) || 0) - (Number(li.discount) || 0));
const th = 'px-3 py-2.5 text-[11px] font-semibold uppercase tracking-wide text-muted-foreground';
const numInput = 'h-9 w-[76px] text-right tabular-nums px-2';
function LineItemsEditor({ items, setItems, products, footerExtra = null, showDate = false }) {
    function update(i, patch) {
        setItems((prev)=>prev.map((li, idx)=>idx === i ? {
                    ...li,
                    ...patch
                } : li));
    }
    function pickProduct(i, id) {
        const p = products.find((x)=>x._id === id);
        update(i, p ? {
            productID: id,
            name: p.name,
            unitPrice: p.defaultPrice ?? 0
        } : {
            productID: ''
        });
    }
    function addSaved() {
        const p = products[0];
        setItems((prev)=>[
                ...prev,
                {
                    ...emptyLine(),
                    productID: p?._id || '',
                    name: p?.name || '',
                    unitPrice: p?.defaultPrice ?? 0
                }
            ]);
    }
    const dashBtn = 'inline-flex items-center gap-1.5 rounded-lg border border-dashed border-border px-3 h-9 text-sm font-medium text-muted-foreground hover:text-foreground hover:border-brand/50 hover:bg-muted/40 transition-colors disabled:opacity-40 disabled:cursor-not-allowed';
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "rounded-xl border border-border bg-card overflow-hidden",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "overflow-x-auto",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("table", {
                    className: "w-full border-collapse",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("thead", {
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                className: "bg-muted/40 text-left",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                        className: `${th} w-full`,
                                        children: "Product"
                                    }, void 0, false, {
                                        fileName: "[project]/app/settings/setup/components/EventsPurchases.js",
                                        lineNumber: 398,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                        className: `${th} text-right`,
                                        children: "Qty."
                                    }, void 0, false, {
                                        fileName: "[project]/app/settings/setup/components/EventsPurchases.js",
                                        lineNumber: 399,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                        className: `${th} text-right`,
                                        children: "Price"
                                    }, void 0, false, {
                                        fileName: "[project]/app/settings/setup/components/EventsPurchases.js",
                                        lineNumber: 400,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                        className: `${th} text-right`,
                                        children: "Discount"
                                    }, void 0, false, {
                                        fileName: "[project]/app/settings/setup/components/EventsPurchases.js",
                                        lineNumber: 401,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                        className: `${th} text-right`,
                                        children: "Total"
                                    }, void 0, false, {
                                        fileName: "[project]/app/settings/setup/components/EventsPurchases.js",
                                        lineNumber: 402,
                                        columnNumber: 15
                                    }, this),
                                    showDate && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                        className: th,
                                        children: [
                                            "Event date ",
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "font-normal normal-case",
                                                children: "(optional)"
                                            }, void 0, false, {
                                                fileName: "[project]/app/settings/setup/components/EventsPurchases.js",
                                                lineNumber: 403,
                                                columnNumber: 58
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/settings/setup/components/EventsPurchases.js",
                                        lineNumber: 403,
                                        columnNumber: 28
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                        className: th
                                    }, void 0, false, {
                                        fileName: "[project]/app/settings/setup/components/EventsPurchases.js",
                                        lineNumber: 404,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/settings/setup/components/EventsPurchases.js",
                                lineNumber: 397,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/app/settings/setup/components/EventsPurchases.js",
                            lineNumber: 396,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tbody", {
                            children: items.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                    colSpan: showDate ? 7 : 6,
                                    className: "px-3 py-6 text-center text-sm text-muted-foreground",
                                    children: "No line items yet — add a saved product or a custom item below."
                                }, void 0, false, {
                                    fileName: "[project]/app/settings/setup/components/EventsPurchases.js",
                                    lineNumber: 409,
                                    columnNumber: 19
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/app/settings/setup/components/EventsPurchases.js",
                                lineNumber: 409,
                                columnNumber: 15
                            }, this) : items.map((li, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                    className: "border-t border-border align-middle",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                            className: "px-3 py-2",
                                            children: li.productID ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                                className: "h-9 w-full min-w-[240px] rounded-md border border-border bg-background px-2 text-sm",
                                                value: li.productID,
                                                onChange: (e)=>pickProduct(i, e.target.value),
                                                children: products.map((p)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                        value: p._id,
                                                        children: p.name
                                                    }, p._id, false, {
                                                        fileName: "[project]/app/settings/setup/components/EventsPurchases.js",
                                                        lineNumber: 415,
                                                        columnNumber: 44
                                                    }, this))
                                            }, void 0, false, {
                                                fileName: "[project]/app/settings/setup/components/EventsPurchases.js",
                                                lineNumber: 414,
                                                columnNumber: 21
                                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$input$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Input"], {
                                                placeholder: "Custom item name",
                                                value: li.name,
                                                onChange: (e)=>update(i, {
                                                        name: e.target.value
                                                    }),
                                                className: "h-9 w-full min-w-[240px]"
                                            }, void 0, false, {
                                                fileName: "[project]/app/settings/setup/components/EventsPurchases.js",
                                                lineNumber: 418,
                                                columnNumber: 21
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/app/settings/setup/components/EventsPurchases.js",
                                            lineNumber: 412,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                            className: "px-1.5 py-2",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$input$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Input"], {
                                                type: "number",
                                                min: "0",
                                                value: li.quantity,
                                                onChange: (e)=>update(i, {
                                                        quantity: e.target.value
                                                    }),
                                                className: numInput
                                            }, void 0, false, {
                                                fileName: "[project]/app/settings/setup/components/EventsPurchases.js",
                                                lineNumber: 421,
                                                columnNumber: 45
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/app/settings/setup/components/EventsPurchases.js",
                                            lineNumber: 421,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                            className: "px-1.5 py-2",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$input$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Input"], {
                                                type: "number",
                                                min: "0",
                                                step: "any",
                                                value: li.unitPrice,
                                                onChange: (e)=>update(i, {
                                                        unitPrice: e.target.value
                                                    }),
                                                className: numInput
                                            }, void 0, false, {
                                                fileName: "[project]/app/settings/setup/components/EventsPurchases.js",
                                                lineNumber: 422,
                                                columnNumber: 45
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/app/settings/setup/components/EventsPurchases.js",
                                            lineNumber: 422,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                            className: "px-1.5 py-2",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$input$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Input"], {
                                                type: "number",
                                                min: "0",
                                                step: "any",
                                                value: li.discount,
                                                onChange: (e)=>update(i, {
                                                        discount: e.target.value
                                                    }),
                                                className: numInput
                                            }, void 0, false, {
                                                fileName: "[project]/app/settings/setup/components/EventsPurchases.js",
                                                lineNumber: 423,
                                                columnNumber: 45
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/app/settings/setup/components/EventsPurchases.js",
                                            lineNumber: 423,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                            className: "px-3 py-2 text-right text-sm font-semibold tabular-nums whitespace-nowrap",
                                            children: money(lineTotal(li))
                                        }, void 0, false, {
                                            fileName: "[project]/app/settings/setup/components/EventsPurchases.js",
                                            lineNumber: 424,
                                            columnNumber: 17
                                        }, this),
                                        showDate && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                            className: "px-1.5 py-2",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$input$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Input"], {
                                                type: "datetime-local",
                                                value: li.eventDate || '',
                                                onChange: (e)=>update(i, {
                                                        eventDate: e.target.value
                                                    }),
                                                className: "h-9 w-[200px]"
                                            }, void 0, false, {
                                                fileName: "[project]/app/settings/setup/components/EventsPurchases.js",
                                                lineNumber: 427,
                                                columnNumber: 21
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/app/settings/setup/components/EventsPurchases.js",
                                            lineNumber: 426,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                            className: "px-1 py-2 text-center",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                type: "button",
                                                "aria-label": "Remove line",
                                                onClick: ()=>setItems((prev)=>prev.filter((_, idx)=>idx !== i)),
                                                className: "text-muted-foreground hover:text-destructive",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trash$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Trash2$3e$__["Trash2"], {
                                                    className: "h-4 w-4"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/settings/setup/components/EventsPurchases.js",
                                                    lineNumber: 432,
                                                    columnNumber: 21
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/app/settings/setup/components/EventsPurchases.js",
                                                lineNumber: 431,
                                                columnNumber: 19
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/app/settings/setup/components/EventsPurchases.js",
                                            lineNumber: 430,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, i, true, {
                                    fileName: "[project]/app/settings/setup/components/EventsPurchases.js",
                                    lineNumber: 411,
                                    columnNumber: 15
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/app/settings/setup/components/EventsPurchases.js",
                            lineNumber: 407,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/settings/setup/components/EventsPurchases.js",
                    lineNumber: 395,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/settings/setup/components/EventsPurchases.js",
                lineNumber: 394,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex flex-wrap items-center gap-2 px-3 py-3 border-t border-border bg-muted/20",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        className: dashBtn,
                        onClick: addSaved,
                        disabled: products.length === 0,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__["Plus"], {
                                className: "h-3.5 w-3.5"
                            }, void 0, false, {
                                fileName: "[project]/app/settings/setup/components/EventsPurchases.js",
                                lineNumber: 443,
                                columnNumber: 11
                            }, this),
                            " Add saved product"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/settings/setup/components/EventsPurchases.js",
                        lineNumber: 442,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        className: dashBtn,
                        onClick: ()=>setItems((prev)=>[
                                    ...prev,
                                    emptyLine()
                                ]),
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__["Plus"], {
                                className: "h-3.5 w-3.5"
                            }, void 0, false, {
                                fileName: "[project]/app/settings/setup/components/EventsPurchases.js",
                                lineNumber: 446,
                                columnNumber: 11
                            }, this),
                            " Add custom item"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/settings/setup/components/EventsPurchases.js",
                        lineNumber: 445,
                        columnNumber: 9
                    }, this),
                    footerExtra
                ]
            }, void 0, true, {
                fileName: "[project]/app/settings/setup/components/EventsPurchases.js",
                lineNumber: 441,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/settings/setup/components/EventsPurchases.js",
        lineNumber: 393,
        columnNumber: 5
    }, this);
}
_c10 = LineItemsEditor;
/* ─────────────────────────── Saved Templates ─────────────────────────── */ function TemplateDialog({ open, onClose, template, products, eventTypes, onRefresh }) {
    _s6();
    const isEdit = Boolean(template);
    const [name, setName] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [eventTypeID, setEventTypeID] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [items, setItems] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [saving, setSaving] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "TemplateDialog.useEffect": ()=>{
            if (!open) return;
            if (template) {
                setName(template.name || '');
                setEventTypeID(template.eventTypeID?._id || template.eventTypeID || '');
                setItems((template.lineItems || []).map({
                    "TemplateDialog.useEffect": (li)=>({
                            productID: li.productID?._id || li.productID || '',
                            name: li.name || '',
                            quantity: li.quantity ?? 1,
                            unitPrice: li.unitPrice ?? 0,
                            discount: li.discount ?? 0
                        })
                }["TemplateDialog.useEffect"]));
            } else {
                setName('');
                setEventTypeID('');
                setItems([]);
            }
        }
    }["TemplateDialog.useEffect"], [
        open,
        template
    ]);
    async function submit(e) {
        e.preventDefault();
        if (!name.trim()) {
            __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$toast$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error('Template name is required');
            return;
        }
        const lineItems = items.filter((li)=>(li.name || '').trim());
        if (lineItems.length === 0) {
            __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$toast$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error('Add at least one product');
            return;
        }
        setSaving(true);
        try {
            const payload = {
                name: name.trim(),
                eventTypeID: eventTypeID || undefined,
                lineItems
            };
            const res = isEdit ? await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].put(`/api/purchase-template/${template._id}`, payload) : await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].post('/api/purchase-template', payload);
            if (res.success) {
                __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$toast$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].success(isEdit ? 'Template updated' : 'Template created');
                onRefresh();
                onClose();
            } else __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$toast$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error('Failed', {
                description: res.error
            });
        } finally{
            setSaving(false);
        }
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$dialog$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Dialog"], {
        open: open,
        onClose: onClose,
        maxWidth: "3xl",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$dialog$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DialogContent"], {
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$dialog$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DialogHeader"], {
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$dialog$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DialogTitle"], {
                        children: isEdit ? 'Edit Saved Template' : 'Add Saved Template'
                    }, void 0, false, {
                        fileName: "[project]/app/settings/setup/components/EventsPurchases.js",
                        lineNumber: 492,
                        columnNumber: 23
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/app/settings/setup/components/EventsPurchases.js",
                    lineNumber: 492,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                    onSubmit: submit,
                    className: "flex flex-col gap-4 py-2",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "grid grid-cols-2 gap-3",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex flex-col gap-1.5",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$label$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Label"], {
                                            htmlFor: "t-name",
                                            children: "Template name"
                                        }, void 0, false, {
                                            fileName: "[project]/app/settings/setup/components/EventsPurchases.js",
                                            lineNumber: 496,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$input$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Input"], {
                                            id: "t-name",
                                            placeholder: "AODC New Jersey 2026",
                                            value: name,
                                            onChange: (e)=>setName(e.target.value)
                                        }, void 0, false, {
                                            fileName: "[project]/app/settings/setup/components/EventsPurchases.js",
                                            lineNumber: 497,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/settings/setup/components/EventsPurchases.js",
                                    lineNumber: 495,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex flex-col gap-1.5",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$label$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Label"], {
                                            htmlFor: "t-et",
                                            children: "Event type"
                                        }, void 0, false, {
                                            fileName: "[project]/app/settings/setup/components/EventsPurchases.js",
                                            lineNumber: 500,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                            id: "t-et",
                                            className: selectCls,
                                            value: eventTypeID,
                                            onChange: (e)=>setEventTypeID(e.target.value),
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                    value: "",
                                                    children: "—"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/settings/setup/components/EventsPurchases.js",
                                                    lineNumber: 502,
                                                    columnNumber: 17
                                                }, this),
                                                eventTypes.map((et)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                        value: et._id,
                                                        children: et.name
                                                    }, et._id, false, {
                                                        fileName: "[project]/app/settings/setup/components/EventsPurchases.js",
                                                        lineNumber: 503,
                                                        columnNumber: 41
                                                    }, this))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/settings/setup/components/EventsPurchases.js",
                                            lineNumber: 501,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/settings/setup/components/EventsPurchases.js",
                                    lineNumber: 499,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/settings/setup/components/EventsPurchases.js",
                            lineNumber: 494,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(LineItemsEditor, {
                            items: items,
                            setItems: setItems,
                            products: products
                        }, void 0, false, {
                            fileName: "[project]/app/settings/setup/components/EventsPurchases.js",
                            lineNumber: 507,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$dialog$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DialogFooter"], {
                            className: "pt-2",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                    type: "button",
                                    variant: "outline",
                                    onClick: onClose,
                                    disabled: saving,
                                    children: "Cancel"
                                }, void 0, false, {
                                    fileName: "[project]/app/settings/setup/components/EventsPurchases.js",
                                    lineNumber: 509,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                    type: "submit",
                                    disabled: saving,
                                    children: saving ? 'Saving…' : isEdit ? 'Save changes' : 'Create template'
                                }, void 0, false, {
                                    fileName: "[project]/app/settings/setup/components/EventsPurchases.js",
                                    lineNumber: 510,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/settings/setup/components/EventsPurchases.js",
                            lineNumber: 508,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/settings/setup/components/EventsPurchases.js",
                    lineNumber: 493,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/app/settings/setup/components/EventsPurchases.js",
            lineNumber: 491,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/app/settings/setup/components/EventsPurchases.js",
        lineNumber: 490,
        columnNumber: 5
    }, this);
}
_s6(TemplateDialog, "Da9+g5YBEdohuWeOlqoNVZwtzAQ=");
_c11 = TemplateDialog;
function SavedTemplatesTab() {
    _s7();
    const [rows, setRows] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [count, setCount] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    const [search, setSearch] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [products, setProducts] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [eventTypes, setEventTypes] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [dialogOpen, setDialogOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [editing, setEditing] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const load = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "SavedTemplatesTab.useCallback[load]": async (s)=>{
            setLoading(true);
            try {
                const params = new URLSearchParams({
                    limit: '100'
                });
                if (s) params.set('search', s);
                const [tRes, pRes, eRes] = await Promise.all([
                    __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].get(`/api/purchase-template?${params}`),
                    __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].get('/api/product?limit=200&isActive=true'),
                    __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].get('/api/event-type?limit=200&isActive=true')
                ]);
                if (tRes.success) {
                    setRows(Array.isArray(tRes.data) ? tRes.data : []);
                    setCount(tRes.pagination?.total ?? tRes.data?.length ?? 0);
                } else __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$toast$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error('Failed to load templates', {
                    description: tRes.error
                });
                if (pRes.success) setProducts(Array.isArray(pRes.data) ? pRes.data : []);
                if (eRes.success) setEventTypes(Array.isArray(eRes.data) ? eRes.data : []);
            } finally{
                setLoading(false);
            }
        }
    }["SavedTemplatesTab.useCallback[load]"], []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "SavedTemplatesTab.useEffect": ()=>{
            const t = setTimeout({
                "SavedTemplatesTab.useEffect.t": ()=>load(search)
            }["SavedTemplatesTab.useEffect.t"], 250);
            return ({
                "SavedTemplatesTab.useEffect": ()=>clearTimeout(t)
            })["SavedTemplatesTab.useEffect"];
        }
    }["SavedTemplatesTab.useEffect"], [
        search,
        load
    ]);
    async function openEdit(row) {
        const res = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].get(`/api/purchase-template/${row._id}`);
        setEditing(res.success ? res.data : row);
        setDialogOpen(true);
    }
    async function remove(row) {
        if (!window.confirm(`Delete "${row.name}"?`)) return;
        const res = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].delete(`/api/purchase-template/${row._id}`);
        if (res.success) {
            __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$toast$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].success('Template deleted');
            load(search);
        } else __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$toast$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error('Delete failed', {
            description: res.error
        });
    }
    async function toggle(row) {
        const res = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].patch(`/api/purchase-template/${row._id}/toggle`);
        if (res.success) {
            load(search);
        } else __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$toast$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error('Failed', {
            description: res.error
        });
    }
    if (loading && rows.length === 0) return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex items-center justify-center h-64",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$shared$2f$GlobalLoader$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
            variant: "center",
            size: "md",
            text: "Loading templates…"
        }, void 0, false, {
            fileName: "[project]/app/settings/setup/components/EventsPurchases.js",
            lineNumber: 562,
            columnNumber: 99
        }, this)
    }, void 0, false, {
        fileName: "[project]/app/settings/setup/components/EventsPurchases.js",
        lineNumber: 562,
        columnNumber: 44
    }, this);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Shell, {
        count: count,
        noun: "templates",
        addLabel: "Add Template",
        onAdd: ()=>{
            setEditing(null);
            setDialogOpen(true);
        },
        search: search,
        setSearch: setSearch,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SortableTable, {
                rows: rows,
                setRows: setRows,
                url: "/api/purchase-template",
                reload: ()=>load(search),
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$table$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TableHeader"], {
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$table$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TableRow"], {
                            className: "border-b border-border hover:bg-transparent bg-muted/30",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$table$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TableHead"], {
                                    className: "w-8 py-3 pl-2 pr-0"
                                }, void 0, false, {
                                    fileName: "[project]/app/settings/setup/components/EventsPurchases.js",
                                    lineNumber: 569,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$table$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TableHead"], {
                                    className: "py-3 px-4 text-xs font-medium text-muted-foreground",
                                    children: "Template Name"
                                }, void 0, false, {
                                    fileName: "[project]/app/settings/setup/components/EventsPurchases.js",
                                    lineNumber: 570,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$table$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TableHead"], {
                                    className: "py-3 px-4 text-xs font-medium text-muted-foreground",
                                    children: "Event Type"
                                }, void 0, false, {
                                    fileName: "[project]/app/settings/setup/components/EventsPurchases.js",
                                    lineNumber: 571,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$table$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TableHead"], {
                                    className: "py-3 px-4 text-xs font-medium text-muted-foreground",
                                    children: "Default Products"
                                }, void 0, false, {
                                    fileName: "[project]/app/settings/setup/components/EventsPurchases.js",
                                    lineNumber: 572,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$table$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TableHead"], {
                                    className: "py-3 px-4 text-xs font-medium text-muted-foreground",
                                    children: "Last Updated"
                                }, void 0, false, {
                                    fileName: "[project]/app/settings/setup/components/EventsPurchases.js",
                                    lineNumber: 573,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$table$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TableHead"], {
                                    className: "py-3 px-4 text-xs font-medium text-muted-foreground",
                                    children: "Status"
                                }, void 0, false, {
                                    fileName: "[project]/app/settings/setup/components/EventsPurchases.js",
                                    lineNumber: 574,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$table$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TableHead"], {
                                    className: "w-12 py-3 pr-4 pl-0"
                                }, void 0, false, {
                                    fileName: "[project]/app/settings/setup/components/EventsPurchases.js",
                                    lineNumber: 575,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/settings/setup/components/EventsPurchases.js",
                            lineNumber: 568,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/settings/setup/components/EventsPurchases.js",
                        lineNumber: 567,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$table$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TableBody"], {
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$dnd$2d$kit$2f$sortable$2f$dist$2f$sortable$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SortableContext"], {
                            items: rows.map((r)=>r._id),
                            strategy: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$dnd$2d$kit$2f$sortable$2f$dist$2f$sortable$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["verticalListSortingStrategy"],
                            children: rows.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$table$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TableRow"], {
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$table$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TableCell"], {
                                    colSpan: 7,
                                    className: "py-16 text-center text-sm text-muted-foreground",
                                    children: search ? 'No templates match your search.' : 'No saved templates yet. Click "Add Template" to create one.'
                                }, void 0, false, {
                                    fileName: "[project]/app/settings/setup/components/EventsPurchases.js",
                                    lineNumber: 581,
                                    columnNumber: 23
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/app/settings/setup/components/EventsPurchases.js",
                                lineNumber: 581,
                                columnNumber: 13
                            }, this) : rows.map((row)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SortableRow, {
                                    id: row._id,
                                    disabled: !!search,
                                    onClick: ()=>openEdit(row),
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$table$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TableCell"], {
                                            className: "py-3 px-4 text-sm font-medium text-foreground",
                                            children: row.name
                                        }, void 0, false, {
                                            fileName: "[project]/app/settings/setup/components/EventsPurchases.js",
                                            lineNumber: 584,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$table$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TableCell"], {
                                            className: "py-3 px-4 text-sm text-foreground",
                                            children: row.eventTypeID?.name || '—'
                                        }, void 0, false, {
                                            fileName: "[project]/app/settings/setup/components/EventsPurchases.js",
                                            lineNumber: 585,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$table$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TableCell"], {
                                            className: "py-3 px-4 text-sm text-muted-foreground",
                                            children: [
                                                row.lineItems?.length ?? 0,
                                                " product",
                                                (row.lineItems?.length ?? 0) !== 1 ? 's' : ''
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/settings/setup/components/EventsPurchases.js",
                                            lineNumber: 586,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$table$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TableCell"], {
                                            className: "py-3 px-4 text-sm text-muted-foreground",
                                            children: row.updatedAt ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatDate"])(row.updatedAt) : '—'
                                        }, void 0, false, {
                                            fileName: "[project]/app/settings/setup/components/EventsPurchases.js",
                                            lineNumber: 587,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$table$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TableCell"], {
                                            className: "py-3 px-4",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(StatusBadge, {
                                                active: row.isActive
                                            }, void 0, false, {
                                                fileName: "[project]/app/settings/setup/components/EventsPurchases.js",
                                                lineNumber: 588,
                                                columnNumber: 48
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/app/settings/setup/components/EventsPurchases.js",
                                            lineNumber: 588,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$table$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TableCell"], {
                                            className: "py-3 pr-4 pl-0",
                                            onClick: (e)=>e.stopPropagation(),
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$dropdown$2d$menu$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DropdownMenu"], {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$dropdown$2d$menu$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DropdownMenuTrigger"], {
                                                        asChild: true,
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                            type: "button",
                                                            className: "p-1.5 rounded-md hover:bg-muted/50 text-muted-foreground hover:text-foreground",
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$ellipsis$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MoreHorizontal$3e$__["MoreHorizontal"], {
                                                                className: "h-4 w-4"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/settings/setup/components/EventsPurchases.js",
                                                                lineNumber: 591,
                                                                columnNumber: 161
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/settings/setup/components/EventsPurchases.js",
                                                            lineNumber: 591,
                                                            columnNumber: 48
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/settings/setup/components/EventsPurchases.js",
                                                        lineNumber: 591,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$dropdown$2d$menu$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DropdownMenuContent"], {
                                                        align: "end",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$dropdown$2d$menu$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DropdownMenuItem"], {
                                                                onClick: ()=>openEdit(row),
                                                                children: "Edit"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/settings/setup/components/EventsPurchases.js",
                                                                lineNumber: 593,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$dropdown$2d$menu$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DropdownMenuItem"], {
                                                                onClick: ()=>toggle(row),
                                                                children: row.isActive ? 'Deactivate' : 'Activate'
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/settings/setup/components/EventsPurchases.js",
                                                                lineNumber: 594,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$dropdown$2d$menu$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DropdownMenuItem"], {
                                                                className: "text-destructive",
                                                                onClick: ()=>remove(row),
                                                                children: "Delete"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/settings/setup/components/EventsPurchases.js",
                                                                lineNumber: 595,
                                                                columnNumber: 21
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/settings/setup/components/EventsPurchases.js",
                                                        lineNumber: 592,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/settings/setup/components/EventsPurchases.js",
                                                lineNumber: 590,
                                                columnNumber: 17
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/app/settings/setup/components/EventsPurchases.js",
                                            lineNumber: 589,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, row._id, true, {
                                    fileName: "[project]/app/settings/setup/components/EventsPurchases.js",
                                    lineNumber: 583,
                                    columnNumber: 13
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/app/settings/setup/components/EventsPurchases.js",
                            lineNumber: 579,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/settings/setup/components/EventsPurchases.js",
                        lineNumber: 578,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/settings/setup/components/EventsPurchases.js",
                lineNumber: 566,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(TemplateDialog, {
                open: dialogOpen,
                onClose: ()=>setDialogOpen(false),
                template: editing,
                products: products,
                eventTypes: eventTypes,
                onRefresh: ()=>load(search)
            }, void 0, false, {
                fileName: "[project]/app/settings/setup/components/EventsPurchases.js",
                lineNumber: 604,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/settings/setup/components/EventsPurchases.js",
        lineNumber: 565,
        columnNumber: 5
    }, this);
}
_s7(SavedTemplatesTab, "K6z5xmH/UIep4jO5YXOJuQxkvEQ=");
_c12 = SavedTemplatesTab;
function CreateEventPurchaseDialog({ open, onClose, onCreated, initialCustomerID, initialCustomerName }) {
    _s8();
    const [step, setStep] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(1);
    const [products, setProducts] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [eventTypes, setEventTypes] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [templates, setTemplates] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [teachers, setTeachers] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [customerQuery, setCustomerQuery] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [customers, setCustomers] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [customer, setCustomer] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [showResults, setShowResults] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [eventTypeID, setEventTypeID] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [templateID, setTemplateID] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [name, setName] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [items, setItems] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [saveAsTemplate, setSaveAsTemplate] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [saving, setSaving] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const todayISO = __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$studioLocalDate$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["todayDateInput"];
    const [purchaseDate, setPurchaseDate] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(todayISO());
    // Billing
    const [billingType, setBillingType] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('one_time') // one_time | payment_plan | flexible
    ;
    const [collectNow, setCollectNow] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [payMethod, setPayMethod] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('cash') // cash | card | ach | terminal | cheque | other | saved_card | link
    ;
    const [linkChannel, setLinkChannel] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('email');
    const isLink = payMethod === __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$paymentMethods$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SHARE_LINK_METHOD"].value;
    const [savedCardID, setSavedCardID] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [deviceID, setDeviceID] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [checkNumber, setCheckNumber] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [collectDate, setCollectDate] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(todayISO());
    const [shortfallMethod, setShortfallMethod] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('cash');
    const [walletAmount, setWalletAmount] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [walletBalance, setWalletBalance] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    // tip
    const [tipEnabled, setTipEnabled] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [tipTeacherID, setTipTeacherID] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [tipAmount, setTipAmount] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    // payment_plan
    const [planCount, setPlanCount] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('3');
    const [planFreq, setPlanFreq] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('monthly');
    const [planStart, setPlanStart] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(todayISO());
    // flexible
    const [flexInitialAmount, setFlexInitialAmount] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('0');
    const [flexInitialDate, setFlexInitialDate] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(todayISO());
    const [flexFuturePayments, setFlexFuturePayments] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([
        {
            _key: 'fp-0',
            dueDate: '',
            amount: ''
        }
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "CreateEventPurchaseDialog.useEffect": ()=>{
            if (!open) return;
            setStep(1);
            setCustomer(initialCustomerID ? {
                _id: initialCustomerID,
                name: initialCustomerName || ''
            } : null);
            setCustomerQuery('');
            setEventTypeID('');
            setTemplateID('');
            setName('');
            setItems([]);
            setSaveAsTemplate(false);
            setPurchaseDate(todayISO());
            setBillingType('one_time');
            setCollectNow(true);
            setPayMethod('cash');
            setLinkChannel('email');
            setSavedCardID('');
            setDeviceID('');
            setCheckNumber('');
            setCollectDate(todayISO());
            setShortfallMethod('cash');
            setWalletAmount('');
            setWalletBalance(null);
            setTipEnabled(false);
            setTipTeacherID('');
            setTipAmount('');
            setPlanCount('3');
            setPlanFreq('monthly');
            setPlanStart(todayISO());
            setFlexInitialAmount('0');
            setFlexInitialDate(todayISO());
            setFlexFuturePayments([
                {
                    _key: 'fp-0',
                    dueDate: '',
                    amount: ''
                }
            ]);
            setCustomers([]);
            Promise.all([
                __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].get('/api/product?limit=200&isActive=true'),
                __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].get('/api/event-type?limit=200&isActive=true'),
                __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].get('/api/purchase-template?limit=200&isActive=true'),
                __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].get('/api/customer?limit=500'),
                __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].get('/api/teacher?limit=200&status=active')
            ]).then({
                "CreateEventPurchaseDialog.useEffect": ([p, e, t, c, tch])=>{
                    if (p.success) setProducts(Array.isArray(p.data) ? p.data : []);
                    if (e.success) setEventTypes(Array.isArray(e.data) ? e.data : []);
                    if (t.success) setTemplates(Array.isArray(t.data) ? t.data : []);
                    if (c.success) setCustomers(Array.isArray(c.data) ? c.data : []);
                    if (tch.success) setTeachers(Array.isArray(tch.data) ? tch.data : []);
                }
            }["CreateEventPurchaseDialog.useEffect"]);
        }
    }["CreateEventPurchaseDialog.useEffect"], [
        open,
        initialCustomerID,
        initialCustomerName
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "CreateEventPurchaseDialog.useEffect": ()=>{
            if (!customer?._id) {
                setWalletBalance(null);
                return;
            }
            __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].get(`/api/wallet/${customer._id}/balance`).then({
                "CreateEventPurchaseDialog.useEffect": (res)=>{
                    if (res.success) setWalletBalance(Number(res.data?.balance ?? 0));
                }
            }["CreateEventPurchaseDialog.useEffect"]);
        }
    }["CreateEventPurchaseDialog.useEffect"], [
        customer
    ]);
    const customerMatches = (()=>{
        const q = customerQuery.trim().toLowerCase();
        const list = q ? customers.filter((c)=>`${(0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["nameWithMembers"])(c)} ${c.email || ''}`.toLowerCase().includes(q)) : customers;
        return list.slice(0, 50);
    })();
    function applyTemplate(id) {
        setTemplateID(id);
        const tpl = templates.find((x)=>x._id === id);
        if (!tpl) return;
        if (!name.trim()) setName(tpl.name);
        if (tpl.eventTypeID) setEventTypeID(tpl.eventTypeID._id || tpl.eventTypeID);
        setItems((tpl.lineItems || []).map((li)=>({
                productID: li.productID?._id || li.productID || '',
                name: li.name || '',
                quantity: li.quantity ?? 1,
                unitPrice: li.unitPrice ?? 0,
                discount: li.discount ?? 0
            })));
    }
    const totals = items.reduce((acc, li)=>{
        const q = Number(li.quantity) || 0, up = Number(li.unitPrice) || 0, d = Number(li.discount) || 0;
        acc.subtotal += q * up;
        acc.discount += d;
        return acc;
    }, {
        subtotal: 0,
        discount: 0
    });
    const payable = Math.max(0, totals.subtotal - totals.discount);
    const isPlan = billingType === 'payment_plan';
    const isFlex = billingType === 'flexible';
    const planCountN = Math.max(1, Number(planCount) || 1);
    const perInstallment = payable / planCountN;
    const flexInitialAmountN = Number(flexInitialAmount || 0);
    // What is collected today: the full balance, the first installment, or the flexible
    // initial payment. The wallet can pay any of them, in full or in part.
    const firstCollect = billingType === 'one_time' ? payable : isPlan ? Math.round(perInstallment * 100) / 100 : flexInitialAmountN;
    const paysByWallet = payMethod === 'wallet';
    const walletSplit = (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$payments$2f$WalletShortfallField$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["walletShortfall"])(walletBalance, firstCollect, walletAmount);
    const walletApplied = paysByWallet && collectNow && !isLink ? walletSplit.walletApplied : 0;
    const walletOver = paysByWallet && walletSplit.over;
    const methodCharge = Math.max(0, firstCollect - walletApplied);
    // What actually goes to the backend: Wallet itself is sent as walletAmount, and the
    // method is whatever collects the rest (cash when the wallet covers it all).
    const chargeMethod = paysByWallet ? methodCharge > 0 ? shortfallMethod : 'cash' : payMethod;
    const flexFutureTotal = flexFuturePayments.reduce((s, r)=>s + (Number(r.amount) || 0), 0);
    const flexAmountLeftToSchedule = payable - flexInitialAmountN - flexFutureTotal;
    const flexBalanced = Math.abs(flexAmountLeftToSchedule) < 0.01;
    // Adding/removing a row (or changing the initial payment) changes how many
    // ways the remaining balance splits, so re-spread it evenly across all rows
    // rather than leaving a stray $0 box or a stale amount.
    function splitFlexEvenly(rows, remaining) {
        const base = rows.length ? Math.floor(remaining / rows.length * 100) / 100 : 0;
        return rows.map((r, i)=>({
                ...r,
                amount: (i === rows.length - 1 ? Number((remaining - base * (rows.length - 1)).toFixed(2)) : base).toFixed(2)
            }));
    }
    function updateFlexInitialAmount(value) {
        setFlexInitialAmount(value);
        setFlexFuturePayments((prev)=>splitFlexEvenly(prev, payable - (Number(value) || 0)));
    }
    function addFlexFuturePayment() {
        setFlexFuturePayments((prev)=>{
            const rows = [
                ...prev,
                {
                    _key: String(Date.now() + Math.random()),
                    dueDate: '',
                    amount: ''
                }
            ];
            return splitFlexEvenly(rows, payable - flexInitialAmountN);
        });
    }
    function updateFlexFuturePayment(key, field, value) {
        setFlexFuturePayments((prev)=>{
            if (field !== 'amount') return prev.map((r)=>r._key === key ? {
                    ...r,
                    [field]: value
                } : r);
            const remaining = payable - flexInitialAmountN;
            const leftover = Math.max(0, remaining - (Number(value) || 0));
            const otherRows = prev.filter((r)=>r._key !== key);
            const splitOthers = splitFlexEvenly(otherRows, leftover);
            return prev.map((r)=>r._key === key ? {
                    ...r,
                    amount: value
                } : splitOthers.find((o)=>o._key === r._key));
        });
    }
    function removeFlexFuturePayment(key) {
        setFlexFuturePayments((prev)=>{
            const rows = prev.filter((r)=>r._key !== key);
            return splitFlexEvenly(rows, payable - flexInitialAmountN);
        });
    }
    async function submit() {
        if (!customer) {
            __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$toast$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error('Select a student or customer');
            return;
        }
        if (!name.trim()) {
            __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$toast$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error('Enter a purchase name');
            return;
        }
        const lineItems = items.filter((li)=>(li.name || '').trim());
        if (lineItems.length === 0) {
            __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$toast$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error('Add at least one line item');
            return;
        }
        if (payable > 0 && collectsBySavedCard && !savedCardID) {
            __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$toast$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error('Select a saved card');
            return;
        }
        if (payable > 0 && collectNow && achNotAvailable) {
            __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$toast$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error('ACH needs Stripe — connect it in Settings → Integrations.');
            return;
        }
        if (payable > 0 && collectNow && terminalDeviceMissing) {
            __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$toast$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error('Select a terminal device');
            return;
        }
        setSaving(true);
        try {
            const res = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].post('/api/purchase', {
                customerID: customer._id,
                eventTypeID: eventTypeID || undefined,
                sourceTemplateID: templateID || undefined,
                name: name.trim(),
                purchaseDate: purchaseDate ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$studioLocalDate$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["dateInputToISO"])(purchaseDate) : undefined,
                lineItems,
                saveAsTemplate,
                templateName: name.trim()
            });
            if (!res.success) {
                __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$toast$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error('Failed', {
                    description: res.error
                });
                return;
            }
            const purchase = res.data;
            if (payable <= 0) {
                __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$toast$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].success('Events & products created');
            } else if (billingType === 'one_time') {
                if (collectNow && isLink) {
                    __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$toast$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].success('Events & products created');
                    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$payments$2f$SendPaymentLinkMenu$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["sendPaymentLink"])({
                        customerID: customer._id,
                        target: {
                            kind: 'purchase',
                            purchaseID: purchase._id
                        },
                        channel: linkChannel
                    });
                } else if (collectNow && !walletOver) {
                    const tip = tipEnabled && tipTeacherID && Number(tipAmount) > 0 ? {
                        teacherID: tipTeacherID,
                        amount: Number(tipAmount),
                        method: chargeMethod === 'card' ? 'card' : chargeMethod
                    } : undefined;
                    const payRes = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].post('/api/payment', {
                        customerID: customer._id,
                        purchaseID: purchase._id,
                        type: 'event_purchase',
                        amount: payable,
                        method: chargeMethod,
                        paymentDate: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$studioLocalDate$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["dateInputToISO"])(collectDate),
                        walletAmount: walletApplied > 0 ? walletApplied : undefined,
                        notes: name.trim(),
                        ...chargeMethod === 'saved_card' ? {
                            cardToken: savedCardID
                        } : {},
                        ...chargeMethod === 'cheque' ? {
                            checkNumber
                        } : {},
                        ...chargeMethod === 'terminal' ? {
                            deviceID,
                            ...(0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$payments$2f$TerminalDeviceField$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["terminalTipPayload"])()
                        } : {},
                        tip
                    });
                    if (!payRes.success) __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$toast$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error('Purchase saved, but payment failed', {
                        description: payRes.error
                    });
                    else if (payRes.data?.checkoutUrl) {
                        window.open(payRes.data.checkoutUrl, '_blank', 'noopener');
                        __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$toast$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].success(chargeMethod === 'ach' ? 'Bank transfer checkout opened in a new tab' : 'Card checkout opened in a new tab');
                    } else if (payRes.data?.pending && chargeMethod === 'saved_card') __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$toast$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].success('Events & products created — card charged, confirming with Stripe');
                    else if (payRes.data?.pending && chargeMethod === 'terminal') __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$toast$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].success('Charge sent to the reader — waiting for the card.');
                    else __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$toast$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].success('Events & products created and paid');
                } else {
                    __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$toast$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].success('Events & products created');
                }
            } else {
                // payment_plan or flexible → build a payment plan
                let billing;
                if (isPlan) {
                    billing = {
                        numberOfInstallments: planCountN,
                        frequency: planFreq,
                        startDate: planStart,
                        method: chargeMethod,
                        collectDate,
                        ...chargeMethod === 'saved_card' ? {
                            savedCardID
                        } : {},
                        ...chargeMethod === 'cheque' ? {
                            checkNumber
                        } : {},
                        ...chargeMethod === 'terminal' ? {
                            deviceID,
                            ...(0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$payments$2f$TerminalDeviceField$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["terminalTipPayload"])()
                        } : {}
                    };
                } else {
                    const scheduleRows = [
                        ...flexInitialAmountN > 0 ? [
                            {
                                dueDate: flexInitialDate,
                                amount: flexInitialAmountN
                            }
                        ] : [],
                        ...flexFuturePayments.filter((r)=>r.dueDate && Number(r.amount) > 0).map((r)=>({
                                dueDate: r.dueDate,
                                amount: Number(r.amount)
                            }))
                    ];
                    billing = {
                        customInstallments: scheduleRows,
                        method: chargeMethod,
                        collectDate,
                        ...chargeMethod === 'saved_card' ? {
                            savedCardID
                        } : {},
                        ...chargeMethod === 'cheque' ? {
                            checkNumber
                        } : {},
                        ...chargeMethod === 'terminal' ? {
                            deviceID,
                            ...(0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$payments$2f$TerminalDeviceField$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["terminalTipPayload"])()
                        } : {}
                    };
                }
                if (walletApplied > 0) billing.walletAmount = walletApplied;
                const effectiveCollectNow = isPlan ? collectNow : flexInitialAmountN > 0 && collectNow;
                // "link" is not a method the backend records: the plan is created uncollected and
                // its first installment (flexible: the initial payment) goes out as a link.
                if (isLink) billing.method = undefined;
                const planRes = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].post('/api/payment-plan/purchase', {
                    customerID: customer._id,
                    purchaseID: purchase._id,
                    collectNow: effectiveCollectNow && !isLink,
                    billing
                });
                if (!planRes.success) __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$toast$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error('Purchase saved, but the payment plan failed', {
                    description: planRes.error
                });
                else if (isLink && effectiveCollectNow) {
                    __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$toast$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].success(`${isPlan ? 'Payment plan' : 'Flexible schedule'} created`);
                    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$payments$2f$SendPaymentLinkMenu$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["sendPaymentLink"])({
                        customerID: customer._id,
                        target: {
                            kind: 'installment',
                            paymentPlanID: planRes.data?.plan?._id,
                            installmentIndex: 0
                        },
                        channel: linkChannel
                    });
                } else if (planRes.data?.checkoutUrl) {
                    window.open(planRes.data.checkoutUrl, '_blank', 'noopener');
                    __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$toast$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].success('Plan created — first installment checkout opened');
                } else if (planRes.data?.pending && chargeMethod === 'terminal') __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$toast$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].success('Plan created — charge sent to the reader, waiting for the card.');
                else __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$toast$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].success(`${isPlan ? 'Payment plan' : 'Flexible schedule'} created`);
            }
            onCreated?.(purchase);
            onClose();
        } finally{
            setSaving(false);
        }
    }
    // A customer opened from a profile carries only an id and name, so fall back to the
    // loaded customer list for the location the saved-card lookup needs.
    const chargeLocation = customer?.locationID ?? customers.find((c)=>String(c._id) === String(customer?._id))?.locationID;
    // ACH is Stripe-only hosted checkout — Clover has no ACH product, same guard as
    // every other payment form (PaymentDueCard, NewEnrollmentPackageInline, …).
    const { provider: cardProvider } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$settings$2f$payments$2f$useCardProcessor$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCardProcessor"])(chargeLocation);
    const achNotAvailable = chargeMethod === 'ach' && cardProvider !== 'stripe';
    const collectsBySavedCard = chargeMethod === 'saved_card' && collectNow;
    const savedCardMissing = collectsBySavedCard && !savedCardID;
    const terminalDeviceMissing = chargeMethod === 'terminal' && collectNow && !deviceID;
    const canProceed = customer && name.trim() && items.some((li)=>(li.name || '').trim());
    const methodLabel = chargeMethod === 'saved_card' ? 'saved card' : chargeMethod;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$sheet$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Sheet"], {
        open: open,
        onClose: onClose,
        width: "640px",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$sheet$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SheetContent"], {
            onClose: onClose,
            className: "p-0",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "shrink-0 border-b border-border px-6 pt-6 pb-4",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                            className: "text-lg font-semibold tracking-tight",
                            children: "Create Events & Products"
                        }, void 0, false, {
                            fileName: "[project]/app/settings/setup/components/EventsPurchases.js",
                            lineNumber: 891,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-sm text-muted-foreground mt-1",
                            children: "Sell an event, product, or custom charge."
                        }, void 0, false, {
                            fileName: "[project]/app/settings/setup/components/EventsPurchases.js",
                            lineNumber: 892,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center gap-2 pt-3",
                            children: [
                                {
                                    n: 1,
                                    label: 'Details & billing'
                                },
                                {
                                    n: 2,
                                    label: 'Payment'
                                }
                            ].map((s, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center gap-2",
                                    children: [
                                        i > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "h-px w-6 bg-border"
                                        }, void 0, false, {
                                            fileName: "[project]/app/settings/setup/components/EventsPurchases.js",
                                            lineNumber: 896,
                                            columnNumber: 27
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: [
                                                'inline-flex h-5 w-5 items-center justify-center rounded-full text-[11px] font-semibold',
                                                step >= s.n ? 'bg-brand text-brand-foreground' : 'bg-muted text-muted-foreground'
                                            ].join(' '),
                                            children: s.n
                                        }, void 0, false, {
                                            fileName: "[project]/app/settings/setup/components/EventsPurchases.js",
                                            lineNumber: 897,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: [
                                                'text-xs font-medium',
                                                step === s.n ? 'text-foreground' : 'text-muted-foreground'
                                            ].join(' '),
                                            children: s.label
                                        }, void 0, false, {
                                            fileName: "[project]/app/settings/setup/components/EventsPurchases.js",
                                            lineNumber: 898,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, s.n, true, {
                                    fileName: "[project]/app/settings/setup/components/EventsPurchases.js",
                                    lineNumber: 895,
                                    columnNumber: 15
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/app/settings/setup/components/EventsPurchases.js",
                            lineNumber: 893,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/settings/setup/components/EventsPurchases.js",
                    lineNumber: 890,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex-1 overflow-y-auto px-6 py-5",
                    children: [
                        step === 1 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex flex-col gap-5",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex flex-col gap-1.5",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$label$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Label"], {
                                            children: "Student or customer"
                                        }, void 0, false, {
                                            fileName: "[project]/app/settings/setup/components/EventsPurchases.js",
                                            lineNumber: 908,
                                            columnNumber: 17
                                        }, this),
                                        customer ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-center justify-between rounded-lg border border-border bg-muted/30 px-3 h-10",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-sm font-medium",
                                                    children: [
                                                        (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["nameWithMembers"])(customer),
                                                        customer.email ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "text-muted-foreground font-normal",
                                                            children: [
                                                                " · ",
                                                                customer.email
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/app/settings/setup/components/EventsPurchases.js",
                                                            lineNumber: 911,
                                                            columnNumber: 104
                                                        }, this) : null
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/settings/setup/components/EventsPurchases.js",
                                                    lineNumber: 911,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    type: "button",
                                                    "aria-label": "Clear customer",
                                                    onClick: ()=>{
                                                        setCustomer(null);
                                                        setCustomerQuery('');
                                                        setShowResults(false);
                                                    },
                                                    className: "text-muted-foreground hover:text-foreground",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                                        className: "h-4 w-4"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/settings/setup/components/EventsPurchases.js",
                                                        lineNumber: 912,
                                                        columnNumber: 210
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/app/settings/setup/components/EventsPurchases.js",
                                                    lineNumber: 912,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/settings/setup/components/EventsPurchases.js",
                                            lineNumber: 910,
                                            columnNumber: 19
                                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$input$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Input"], {
                                                    placeholder: customers.length ? 'Search by name or email…' : 'Loading customers…',
                                                    value: customerQuery,
                                                    onChange: (e)=>{
                                                        setCustomerQuery(e.target.value);
                                                        setShowResults(true);
                                                    },
                                                    onFocus: ()=>setShowResults(true)
                                                }, void 0, false, {
                                                    fileName: "[project]/app/settings/setup/components/EventsPurchases.js",
                                                    lineNumber: 916,
                                                    columnNumber: 21
                                                }, this),
                                                showResults && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "rounded-lg border border-border bg-card divide-y divide-border max-h-56 overflow-y-auto",
                                                    children: customerMatches.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "px-3 py-3 text-sm text-muted-foreground",
                                                        children: customers.length ? 'No matches.' : 'Loading…'
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/settings/setup/components/EventsPurchases.js",
                                                        lineNumber: 925,
                                                        columnNumber: 27
                                                    }, this) : customerMatches.map((c)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                            type: "button",
                                                            className: "block w-full px-3 py-2 text-left text-sm hover:bg-muted/60",
                                                            onClick: ()=>{
                                                                setCustomer(c);
                                                                setShowResults(false);
                                                                setCustomerQuery('');
                                                            },
                                                            children: [
                                                                (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["nameWithMembers"])(c),
                                                                c.email ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "text-muted-foreground",
                                                                    children: [
                                                                        " · ",
                                                                        c.email
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/app/settings/setup/components/EventsPurchases.js",
                                                                    lineNumber: 929,
                                                                    columnNumber: 60
                                                                }, this) : null
                                                            ]
                                                        }, c._id, true, {
                                                            fileName: "[project]/app/settings/setup/components/EventsPurchases.js",
                                                            lineNumber: 927,
                                                            columnNumber: 27
                                                        }, this))
                                                }, void 0, false, {
                                                    fileName: "[project]/app/settings/setup/components/EventsPurchases.js",
                                                    lineNumber: 923,
                                                    columnNumber: 23
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/settings/setup/components/EventsPurchases.js",
                                            lineNumber: 915,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/settings/setup/components/EventsPurchases.js",
                                    lineNumber: 907,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "grid grid-cols-1 sm:grid-cols-[1fr_1.6fr] gap-4",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex flex-col gap-1.5",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$label$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Label"], {
                                                    children: "Event Type"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/settings/setup/components/EventsPurchases.js",
                                                    lineNumber: 940,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                                    className: selectCls,
                                                    value: eventTypeID,
                                                    onChange: (e)=>setEventTypeID(e.target.value),
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                            value: "",
                                                            children: "Select…"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/settings/setup/components/EventsPurchases.js",
                                                            lineNumber: 942,
                                                            columnNumber: 21
                                                        }, this),
                                                        eventTypes.map((et)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                value: et._id,
                                                                children: et.name
                                                            }, et._id, false, {
                                                                fileName: "[project]/app/settings/setup/components/EventsPurchases.js",
                                                                lineNumber: 943,
                                                                columnNumber: 45
                                                            }, this))
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/settings/setup/components/EventsPurchases.js",
                                                    lineNumber: 941,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/settings/setup/components/EventsPurchases.js",
                                            lineNumber: 939,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex flex-col gap-1.5",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$label$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Label"], {
                                                    children: "Saved Template or Custom Name"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/settings/setup/components/EventsPurchases.js",
                                                    lineNumber: 947,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                                    className: selectCls,
                                                    value: templateID,
                                                    onChange: (e)=>applyTemplate(e.target.value),
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                            value: "",
                                                            children: "Custom purchase"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/settings/setup/components/EventsPurchases.js",
                                                            lineNumber: 949,
                                                            columnNumber: 21
                                                        }, this),
                                                        templates.map((t)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                value: t._id,
                                                                children: t.name
                                                            }, t._id, false, {
                                                                fileName: "[project]/app/settings/setup/components/EventsPurchases.js",
                                                                lineNumber: 950,
                                                                columnNumber: 43
                                                            }, this))
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/settings/setup/components/EventsPurchases.js",
                                                    lineNumber: 948,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/settings/setup/components/EventsPurchases.js",
                                            lineNumber: 946,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/settings/setup/components/EventsPurchases.js",
                                    lineNumber: 938,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex flex-col gap-1.5",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$label$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Label"], {
                                            htmlFor: "cep-name",
                                            children: "Purchase name"
                                        }, void 0, false, {
                                            fileName: "[project]/app/settings/setup/components/EventsPurchases.js",
                                            lineNumber: 956,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$input$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Input"], {
                                            id: "cep-name",
                                            placeholder: "e.g. AODC New Jersey 2026",
                                            value: name,
                                            onChange: (e)=>setName(e.target.value)
                                        }, void 0, false, {
                                            fileName: "[project]/app/settings/setup/components/EventsPurchases.js",
                                            lineNumber: 957,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/settings/setup/components/EventsPurchases.js",
                                    lineNumber: 955,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex flex-col gap-1.5",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$label$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Label"], {
                                            htmlFor: "cep-purchase-date",
                                            children: "Purchase date"
                                        }, void 0, false, {
                                            fileName: "[project]/app/settings/setup/components/EventsPurchases.js",
                                            lineNumber: 961,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$input$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Input"], {
                                            id: "cep-purchase-date",
                                            type: "date",
                                            value: purchaseDate,
                                            onChange: (e)=>setPurchaseDate(e.target.value)
                                        }, void 0, false, {
                                            fileName: "[project]/app/settings/setup/components/EventsPurchases.js",
                                            lineNumber: 962,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/settings/setup/components/EventsPurchases.js",
                                    lineNumber: 960,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-xs text-muted-foreground -mb-2",
                                    children: "Give a product an event date to auto-check it once that time passes; leave it blank to check it off manually from the customer profile."
                                }, void 0, false, {
                                    fileName: "[project]/app/settings/setup/components/EventsPurchases.js",
                                    lineNumber: 965,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(LineItemsEditor, {
                                    items: items,
                                    setItems: setItems,
                                    products: products,
                                    showDate: true,
                                    footerExtra: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "button",
                                        onClick: ()=>setSaveAsTemplate((v)=>!v),
                                        "aria-pressed": saveAsTemplate,
                                        className: [
                                            'ml-auto inline-flex items-center gap-1.5 rounded-lg border px-3 h-9 text-sm font-medium transition-colors',
                                            saveAsTemplate ? 'border-brand bg-brand/5 text-brand' : 'border-brand/60 text-brand hover:bg-brand/5'
                                        ].join(' '),
                                        children: saveAsTemplate ? '✓ Will save as template' : 'Save as Template'
                                    }, void 0, false, {
                                        fileName: "[project]/app/settings/setup/components/EventsPurchases.js",
                                        lineNumber: 975,
                                        columnNumber: 19
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/app/settings/setup/components/EventsPurchases.js",
                                    lineNumber: 969,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center justify-between rounded-xl border border-border bg-muted/30 px-4 py-3.5",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-sm font-medium text-muted-foreground",
                                            children: "Payable Balance"
                                        }, void 0, false, {
                                            fileName: "[project]/app/settings/setup/components/EventsPurchases.js",
                                            lineNumber: 990,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-xl font-semibold tabular-nums",
                                            children: money(payable)
                                        }, void 0, false, {
                                            fileName: "[project]/app/settings/setup/components/EventsPurchases.js",
                                            lineNumber: 991,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/settings/setup/components/EventsPurchases.js",
                                    lineNumber: 989,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/settings/setup/components/EventsPurchases.js",
                            lineNumber: 906,
                            columnNumber: 13
                        }, this),
                        step === 2 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex flex-col gap-5",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "rounded-xl border border-border overflow-hidden text-sm",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex justify-between px-4 py-2.5",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-muted-foreground",
                                                    children: "Subtotal"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/settings/setup/components/EventsPurchases.js",
                                                    lineNumber: 999,
                                                    columnNumber: 67
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "tabular-nums",
                                                    children: money(totals.subtotal)
                                                }, void 0, false, {
                                                    fileName: "[project]/app/settings/setup/components/EventsPurchases.js",
                                                    lineNumber: 999,
                                                    columnNumber: 122
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/settings/setup/components/EventsPurchases.js",
                                            lineNumber: 999,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex justify-between px-4 py-2.5 border-t border-border",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-muted-foreground",
                                                    children: "Discounts"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/settings/setup/components/EventsPurchases.js",
                                                    lineNumber: 1000,
                                                    columnNumber: 90
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "tabular-nums",
                                                    children: [
                                                        "−",
                                                        money(totals.discount)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/settings/setup/components/EventsPurchases.js",
                                                    lineNumber: 1000,
                                                    columnNumber: 146
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/settings/setup/components/EventsPurchases.js",
                                            lineNumber: 1000,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex justify-between px-4 py-3 border-t border-border bg-muted/30 font-semibold",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    children: "Payable Balance"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/settings/setup/components/EventsPurchases.js",
                                                    lineNumber: 1001,
                                                    columnNumber: 114
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "tabular-nums",
                                                    children: money(payable)
                                                }, void 0, false, {
                                                    fileName: "[project]/app/settings/setup/components/EventsPurchases.js",
                                                    lineNumber: 1001,
                                                    columnNumber: 142
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/settings/setup/components/EventsPurchases.js",
                                            lineNumber: 1001,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/settings/setup/components/EventsPurchases.js",
                                    lineNumber: 998,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "inline-flex rounded-lg border border-border bg-background p-0.5 w-fit",
                                    children: [
                                        {
                                            v: 'one_time',
                                            label: 'One-time'
                                        },
                                        {
                                            v: 'payment_plan',
                                            label: 'Payment plan'
                                        },
                                        {
                                            v: 'flexible',
                                            label: 'Flexible'
                                        }
                                    ].map((o)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            type: "button",
                                            onClick: ()=>setBillingType(o.v),
                                            className: [
                                                'h-8 px-4 rounded-md text-[13px] font-medium transition-colors',
                                                billingType === o.v ? 'bg-brand text-brand-foreground' : 'text-muted-foreground hover:text-foreground'
                                            ].join(' '),
                                            children: o.label
                                        }, o.v, false, {
                                            fileName: "[project]/app/settings/setup/components/EventsPurchases.js",
                                            lineNumber: 1011,
                                            columnNumber: 19
                                        }, this))
                                }, void 0, false, {
                                    fileName: "[project]/app/settings/setup/components/EventsPurchases.js",
                                    lineNumber: 1005,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex flex-col gap-4",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex flex-col gap-1.5",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$label$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Label"], {
                                                    children: "Payment method"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/settings/setup/components/EventsPurchases.js",
                                                    lineNumber: 1024,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$payments$2f$PaymentMethodPicker$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                    methods: PURCHASE_PAY_METHODS,
                                                    value: payMethod,
                                                    onChange: (m)=>{
                                                        setPayMethod(m);
                                                        setWalletAmount('');
                                                        // A flexible schedule with no initial payment yet: the wallet becomes it.
                                                        if (m === 'wallet' && isFlex && flexInitialAmountN <= 0 && walletBalance > 0) {
                                                            updateFlexInitialAmount(Math.min(payable, walletBalance).toFixed(2));
                                                            setCollectNow(true);
                                                        }
                                                    }
                                                }, void 0, false, {
                                                    fileName: "[project]/app/settings/setup/components/EventsPurchases.js",
                                                    lineNumber: 1025,
                                                    columnNumber: 19
                                                }, this),
                                                collectNow && firstCollect > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$payments$2f$WalletShortfallField$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                    method: payMethod,
                                                    balance: walletBalance,
                                                    amountDue: firstCollect,
                                                    walletAmount: walletAmount,
                                                    onWalletAmountChange: setWalletAmount,
                                                    shortfallMethod: shortfallMethod,
                                                    onShortfallMethodChange: setShortfallMethod,
                                                    methods: billingType === 'one_time' ? __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$paymentMethods$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SHORTFALL_METHODS"] : PLAN_SHORTFALL_METHODS
                                                }, void 0, false, {
                                                    fileName: "[project]/app/settings/setup/components/EventsPurchases.js",
                                                    lineNumber: 1039,
                                                    columnNumber: 21
                                                }, this),
                                                isLink && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "text-[12px] text-muted-foreground",
                                                            children: "Created unpaid; whatever you'd collect now is sent to the customer as a payment link."
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/settings/setup/components/EventsPurchases.js",
                                                            lineNumber: 1052,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$payments$2f$SendPaymentLinkMenu$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SendLinkChannelPicker"], {
                                                            value: linkChannel,
                                                            onChange: setLinkChannel
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/settings/setup/components/EventsPurchases.js",
                                                            lineNumber: 1055,
                                                            columnNumber: 23
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/settings/setup/components/EventsPurchases.js",
                                                    lineNumber: 1051,
                                                    columnNumber: 21
                                                }, this),
                                                achNotAvailable && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-[12px] text-muted-foreground",
                                                    children: "ACH needs Stripe — connect it in Settings → Integrations."
                                                }, void 0, false, {
                                                    fileName: "[project]/app/settings/setup/components/EventsPurchases.js",
                                                    lineNumber: 1059,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$payments$2f$TerminalDeviceField$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                    method: payMethod,
                                                    locationID: chargeLocation,
                                                    deviceID: deviceID,
                                                    onDeviceChange: setDeviceID
                                                }, void 0, false, {
                                                    fileName: "[project]/app/settings/setup/components/EventsPurchases.js",
                                                    lineNumber: 1063,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$payments$2f$SavedCardField$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                    method: payMethod,
                                                    locationID: chargeLocation,
                                                    customerID: customer?._id,
                                                    cardToken: savedCardID,
                                                    onCardChange: setSavedCardID
                                                }, void 0, false, {
                                                    fileName: "[project]/app/settings/setup/components/EventsPurchases.js",
                                                    lineNumber: 1069,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$payments$2f$CheckNumberField$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                    method: chargeMethod,
                                                    checkNumber: checkNumber,
                                                    onChange: setCheckNumber
                                                }, void 0, false, {
                                                    fileName: "[project]/app/settings/setup/components/EventsPurchases.js",
                                                    lineNumber: 1076,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/settings/setup/components/EventsPurchases.js",
                                            lineNumber: 1023,
                                            columnNumber: 17
                                        }, this),
                                        !isLink && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex flex-col gap-1.5",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$label$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Label"], {
                                                    htmlFor: "cep-date",
                                                    children: "Payment date"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/settings/setup/components/EventsPurchases.js",
                                                    lineNumber: 1080,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$input$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Input"], {
                                                    id: "cep-date",
                                                    type: "date",
                                                    value: collectDate,
                                                    onChange: (e)=>setCollectDate(e.target.value)
                                                }, void 0, false, {
                                                    fileName: "[project]/app/settings/setup/components/EventsPurchases.js",
                                                    lineNumber: 1081,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/settings/setup/components/EventsPurchases.js",
                                            lineNumber: 1079,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/settings/setup/components/EventsPurchases.js",
                                    lineNumber: 1022,
                                    columnNumber: 15
                                }, this),
                                billingType === 'one_time' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            className: "flex items-center gap-2 text-sm font-medium",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                    type: "checkbox",
                                                    checked: collectNow,
                                                    onChange: (e)=>setCollectNow(e.target.checked)
                                                }, void 0, false, {
                                                    fileName: "[project]/app/settings/setup/components/EventsPurchases.js",
                                                    lineNumber: 1089,
                                                    columnNumber: 21
                                                }, this),
                                                "Collect the full balance now"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/settings/setup/components/EventsPurchases.js",
                                            lineNumber: 1088,
                                            columnNumber: 19
                                        }, this),
                                        !collectNow ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-xs text-muted-foreground",
                                            children: "Recorded as unpaid — collect later from the customer’s Events & Products tab."
                                        }, void 0, false, {
                                            fileName: "[project]/app/settings/setup/components/EventsPurchases.js",
                                            lineNumber: 1093,
                                            columnNumber: 21
                                        }, this) : isLink ? null : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "rounded-xl border border-border p-4 flex flex-col gap-3",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                            className: "flex items-center gap-2 text-sm font-medium",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                    type: "checkbox",
                                                                    checked: tipEnabled,
                                                                    onChange: (e)=>setTipEnabled(e.target.checked)
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/settings/setup/components/EventsPurchases.js",
                                                                    lineNumber: 1098,
                                                                    columnNumber: 27
                                                                }, this),
                                                                "Add a tip for a teacher"
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/app/settings/setup/components/EventsPurchases.js",
                                                            lineNumber: 1097,
                                                            columnNumber: 25
                                                        }, this),
                                                        tipEnabled && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "grid grid-cols-1 sm:grid-cols-2 gap-3",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                                                    className: selectCls,
                                                                    value: tipTeacherID,
                                                                    onChange: (e)=>setTipTeacherID(e.target.value),
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                            value: "",
                                                                            children: "Select teacher…"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/app/settings/setup/components/EventsPurchases.js",
                                                                            lineNumber: 1104,
                                                                            columnNumber: 31
                                                                        }, this),
                                                                        teachers.map((t)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                                value: t._id,
                                                                                children: t.name || t.email
                                                                            }, t._id, false, {
                                                                                fileName: "[project]/app/settings/setup/components/EventsPurchases.js",
                                                                                lineNumber: 1105,
                                                                                columnNumber: 52
                                                                            }, this))
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/app/settings/setup/components/EventsPurchases.js",
                                                                    lineNumber: 1103,
                                                                    columnNumber: 29
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$input$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Input"], {
                                                                    type: "number",
                                                                    min: "0",
                                                                    step: "any",
                                                                    placeholder: "Tip amount",
                                                                    value: tipAmount,
                                                                    onChange: (e)=>setTipAmount(e.target.value)
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/settings/setup/components/EventsPurchases.js",
                                                                    lineNumber: 1107,
                                                                    columnNumber: 29
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/app/settings/setup/components/EventsPurchases.js",
                                                            lineNumber: 1102,
                                                            columnNumber: 27
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/settings/setup/components/EventsPurchases.js",
                                                    lineNumber: 1096,
                                                    columnNumber: 23
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "rounded-xl border border-border bg-muted/30 text-sm divide-y divide-border",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "flex justify-between px-4 py-2.5",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "text-muted-foreground",
                                                                    children: walletApplied > 0 ? `Rest by ${methodLabel}` : chargeMethod === 'card' ? 'On card' : `By ${methodLabel}`
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/settings/setup/components/EventsPurchases.js",
                                                                    lineNumber: 1113,
                                                                    columnNumber: 75
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "tabular-nums",
                                                                    children: money(methodCharge)
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/settings/setup/components/EventsPurchases.js",
                                                                    lineNumber: 1113,
                                                                    columnNumber: 228
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/app/settings/setup/components/EventsPurchases.js",
                                                            lineNumber: 1113,
                                                            columnNumber: 25
                                                        }, this),
                                                        tipEnabled && Number(tipAmount) > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "flex justify-between px-4 py-2.5",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "text-muted-foreground",
                                                                    children: "Teacher tip (recorded separately)"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/settings/setup/components/EventsPurchases.js",
                                                                    lineNumber: 1115,
                                                                    columnNumber: 77
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "tabular-nums",
                                                                    children: money(Number(tipAmount))
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/settings/setup/components/EventsPurchases.js",
                                                                    lineNumber: 1115,
                                                                    columnNumber: 157
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/app/settings/setup/components/EventsPurchases.js",
                                                            lineNumber: 1115,
                                                            columnNumber: 27
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "flex justify-between px-4 py-3 font-semibold",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    children: "Total collected"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/settings/setup/components/EventsPurchases.js",
                                                                    lineNumber: 1117,
                                                                    columnNumber: 87
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "tabular-nums",
                                                                    children: money(payable)
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/settings/setup/components/EventsPurchases.js",
                                                                    lineNumber: 1117,
                                                                    columnNumber: 115
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/app/settings/setup/components/EventsPurchases.js",
                                                            lineNumber: 1117,
                                                            columnNumber: 25
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/settings/setup/components/EventsPurchases.js",
                                                    lineNumber: 1112,
                                                    columnNumber: 23
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/settings/setup/components/EventsPurchases.js",
                                            lineNumber: 1095,
                                            columnNumber: 21
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/settings/setup/components/EventsPurchases.js",
                                    lineNumber: 1087,
                                    columnNumber: 17
                                }, this),
                                isPlan && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "grid grid-cols-1 sm:grid-cols-3 gap-4",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex flex-col gap-1.5",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$label$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Label"], {
                                                            htmlFor: "plan-count",
                                                            children: "# of installments"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/settings/setup/components/EventsPurchases.js",
                                                            lineNumber: 1128,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$input$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Input"], {
                                                            id: "plan-count",
                                                            type: "number",
                                                            min: "2",
                                                            value: planCount,
                                                            onChange: (e)=>setPlanCount(e.target.value)
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/settings/setup/components/EventsPurchases.js",
                                                            lineNumber: 1129,
                                                            columnNumber: 23
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/settings/setup/components/EventsPurchases.js",
                                                    lineNumber: 1127,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex flex-col gap-1.5",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$label$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Label"], {
                                                            children: "Frequency"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/settings/setup/components/EventsPurchases.js",
                                                            lineNumber: 1132,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                                            className: selectCls,
                                                            value: planFreq,
                                                            onChange: (e)=>setPlanFreq(e.target.value),
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                    value: "weekly",
                                                                    children: "Weekly"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/settings/setup/components/EventsPurchases.js",
                                                                    lineNumber: 1134,
                                                                    columnNumber: 25
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                    value: "biweekly",
                                                                    children: "Every 2 weeks"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/settings/setup/components/EventsPurchases.js",
                                                                    lineNumber: 1135,
                                                                    columnNumber: 25
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                    value: "monthly",
                                                                    children: "Monthly"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/settings/setup/components/EventsPurchases.js",
                                                                    lineNumber: 1136,
                                                                    columnNumber: 25
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/app/settings/setup/components/EventsPurchases.js",
                                                            lineNumber: 1133,
                                                            columnNumber: 23
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/settings/setup/components/EventsPurchases.js",
                                                    lineNumber: 1131,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex flex-col gap-1.5",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$label$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Label"], {
                                                            htmlFor: "plan-start",
                                                            children: "First payment date"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/settings/setup/components/EventsPurchases.js",
                                                            lineNumber: 1140,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$input$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Input"], {
                                                            id: "plan-start",
                                                            type: "date",
                                                            value: planStart,
                                                            onChange: (e)=>setPlanStart(e.target.value)
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/settings/setup/components/EventsPurchases.js",
                                                            lineNumber: 1141,
                                                            columnNumber: 23
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/settings/setup/components/EventsPurchases.js",
                                                    lineNumber: 1139,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/settings/setup/components/EventsPurchases.js",
                                            lineNumber: 1126,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "rounded-xl border border-border bg-muted/30 px-4 py-3 text-sm flex justify-between",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-muted-foreground",
                                                    children: [
                                                        planCountN,
                                                        " payments of"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/settings/setup/components/EventsPurchases.js",
                                                    lineNumber: 1145,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "font-semibold tabular-nums",
                                                    children: money(perInstallment)
                                                }, void 0, false, {
                                                    fileName: "[project]/app/settings/setup/components/EventsPurchases.js",
                                                    lineNumber: 1146,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/settings/setup/components/EventsPurchases.js",
                                            lineNumber: 1144,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            className: "flex items-center gap-2 text-sm font-medium",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                    type: "checkbox",
                                                    checked: collectNow,
                                                    onChange: (e)=>setCollectNow(e.target.checked)
                                                }, void 0, false, {
                                                    fileName: "[project]/app/settings/setup/components/EventsPurchases.js",
                                                    lineNumber: 1149,
                                                    columnNumber: 21
                                                }, this),
                                                "Collect the first installment now (",
                                                money(perInstallment),
                                                ")"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/settings/setup/components/EventsPurchases.js",
                                            lineNumber: 1148,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/settings/setup/components/EventsPurchases.js",
                                    lineNumber: 1125,
                                    columnNumber: 17
                                }, this),
                                isFlex && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "rounded-xl border border-border bg-muted/20 p-4 flex flex-col gap-4",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-xs text-muted-foreground -mt-1",
                                            children: "This arrangement will be included in the student agreement — get it right here, it can't be changed on the payment step."
                                        }, void 0, false, {
                                            fileName: "[project]/app/settings/setup/components/EventsPurchases.js",
                                            lineNumber: 1157,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex flex-col gap-1.5",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$label$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Label"], {
                                                    children: [
                                                        "Initial payment ",
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "font-normal text-muted-foreground",
                                                            children: "(optional — enter $0 if none)"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/settings/setup/components/EventsPurchases.js",
                                                            lineNumber: 1163,
                                                            columnNumber: 44
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/settings/setup/components/EventsPurchases.js",
                                                    lineNumber: 1163,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "grid grid-cols-2 gap-2",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$input$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Input"], {
                                                            type: "number",
                                                            min: "0",
                                                            max: payable,
                                                            step: "any",
                                                            placeholder: "0.00",
                                                            value: flexInitialAmount,
                                                            onChange: (e)=>updateFlexInitialAmount(e.target.value)
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/settings/setup/components/EventsPurchases.js",
                                                            lineNumber: 1165,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$input$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Input"], {
                                                            type: "date",
                                                            value: flexInitialDate,
                                                            onChange: (e)=>setFlexInitialDate(e.target.value)
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/settings/setup/components/EventsPurchases.js",
                                                            lineNumber: 1166,
                                                            columnNumber: 23
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/settings/setup/components/EventsPurchases.js",
                                                    lineNumber: 1164,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/settings/setup/components/EventsPurchases.js",
                                            lineNumber: 1162,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex flex-col gap-1.5 pt-2 border-t border-border",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$label$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Label"], {
                                                    children: "Future payments"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/settings/setup/components/EventsPurchases.js",
                                                    lineNumber: 1172,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-xs text-muted-foreground -mt-1",
                                                    children: "One row is the remaining balance's single due date. Add more to split it into a schedule."
                                                }, void 0, false, {
                                                    fileName: "[project]/app/settings/setup/components/EventsPurchases.js",
                                                    lineNumber: 1173,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex flex-col gap-1.5",
                                                    children: flexFuturePayments.map((r, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "flex items-center gap-2",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "w-5 shrink-0 text-xs text-muted-foreground",
                                                                    children: [
                                                                        i + 1,
                                                                        "."
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/app/settings/setup/components/EventsPurchases.js",
                                                                    lineNumber: 1179,
                                                                    columnNumber: 27
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$input$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Input"], {
                                                                    type: "date",
                                                                    value: r.dueDate,
                                                                    onChange: (e)=>updateFlexFuturePayment(r._key, 'dueDate', e.target.value),
                                                                    className: "flex-1"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/settings/setup/components/EventsPurchases.js",
                                                                    lineNumber: 1180,
                                                                    columnNumber: 27
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$input$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Input"], {
                                                                    type: "number",
                                                                    min: "0",
                                                                    step: "any",
                                                                    placeholder: "0.00",
                                                                    value: r.amount,
                                                                    onChange: (e)=>updateFlexFuturePayment(r._key, 'amount', e.target.value),
                                                                    className: "w-28"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/settings/setup/components/EventsPurchases.js",
                                                                    lineNumber: 1181,
                                                                    columnNumber: 27
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                    type: "button",
                                                                    onClick: ()=>removeFlexFuturePayment(r._key),
                                                                    disabled: flexFuturePayments.length === 1,
                                                                    className: "text-muted-foreground hover:text-destructive disabled:opacity-30 disabled:cursor-not-allowed",
                                                                    "aria-label": "Remove payment",
                                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trash$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Trash2$3e$__["Trash2"], {
                                                                        className: "h-4 w-4"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/settings/setup/components/EventsPurchases.js",
                                                                        lineNumber: 1185,
                                                                        columnNumber: 29
                                                                    }, this)
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/settings/setup/components/EventsPurchases.js",
                                                                    lineNumber: 1182,
                                                                    columnNumber: 27
                                                                }, this)
                                                            ]
                                                        }, r._key, true, {
                                                            fileName: "[project]/app/settings/setup/components/EventsPurchases.js",
                                                            lineNumber: 1178,
                                                            columnNumber: 25
                                                        }, this))
                                                }, void 0, false, {
                                                    fileName: "[project]/app/settings/setup/components/EventsPurchases.js",
                                                    lineNumber: 1176,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    type: "button",
                                                    onClick: addFlexFuturePayment,
                                                    className: "inline-flex w-fit items-center gap-1.5 rounded-lg border border-dashed border-border px-3 h-8 text-[13px] font-medium text-muted-foreground hover:text-foreground hover:border-brand/50",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__["Plus"], {
                                                            className: "h-3.5 w-3.5"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/settings/setup/components/EventsPurchases.js",
                                                            lineNumber: 1192,
                                                            columnNumber: 23
                                                        }, this),
                                                        " Add another payment"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/settings/setup/components/EventsPurchases.js",
                                                    lineNumber: 1190,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/settings/setup/components/EventsPurchases.js",
                                            lineNumber: 1171,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex flex-col gap-1 pt-2 border-t border-border",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex items-center justify-between",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "text-xs text-muted-foreground",
                                                            children: "Amount left to schedule"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/settings/setup/components/EventsPurchases.js",
                                                            lineNumber: 1198,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: `text-sm font-semibold ${flexBalanced ? 'text-success' : 'text-destructive'}`,
                                                            children: money(flexAmountLeftToSchedule)
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/settings/setup/components/EventsPurchases.js",
                                                            lineNumber: 1199,
                                                            columnNumber: 23
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/settings/setup/components/EventsPurchases.js",
                                                    lineNumber: 1197,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex items-center justify-between",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "text-xs text-muted-foreground",
                                                            children: "Payable Balance"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/settings/setup/components/EventsPurchases.js",
                                                            lineNumber: 1202,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "text-sm font-bold",
                                                            children: money(payable)
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/settings/setup/components/EventsPurchases.js",
                                                            lineNumber: 1203,
                                                            columnNumber: 23
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/settings/setup/components/EventsPurchases.js",
                                                    lineNumber: 1201,
                                                    columnNumber: 21
                                                }, this),
                                                !flexBalanced && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-[11px] text-destructive",
                                                    children: "Initial payment plus future payments must add up to the payable balance."
                                                }, void 0, false, {
                                                    fileName: "[project]/app/settings/setup/components/EventsPurchases.js",
                                                    lineNumber: 1206,
                                                    columnNumber: 23
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/settings/setup/components/EventsPurchases.js",
                                            lineNumber: 1196,
                                            columnNumber: 19
                                        }, this),
                                        flexInitialAmountN > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            className: "flex items-center gap-2 text-sm font-medium",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                    type: "checkbox",
                                                    checked: collectNow,
                                                    onChange: (e)=>setCollectNow(e.target.checked)
                                                }, void 0, false, {
                                                    fileName: "[project]/app/settings/setup/components/EventsPurchases.js",
                                                    lineNumber: 1212,
                                                    columnNumber: 23
                                                }, this),
                                                "Collect the initial payment now (",
                                                money(flexInitialAmountN),
                                                ")"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/settings/setup/components/EventsPurchases.js",
                                            lineNumber: 1211,
                                            columnNumber: 21
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/settings/setup/components/EventsPurchases.js",
                                    lineNumber: 1156,
                                    columnNumber: 17
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/settings/setup/components/EventsPurchases.js",
                            lineNumber: 997,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/settings/setup/components/EventsPurchases.js",
                    lineNumber: 904,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "shrink-0 flex items-center justify-between gap-2 border-t border-border px-6 py-4",
                    children: step === 1 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                type: "button",
                                variant: "ghost",
                                onClick: onClose,
                                children: "Cancel"
                            }, void 0, false, {
                                fileName: "[project]/app/settings/setup/components/EventsPurchases.js",
                                lineNumber: 1225,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                type: "button",
                                onClick: ()=>setStep(2),
                                disabled: !canProceed,
                                children: "Next: Payment →"
                            }, void 0, false, {
                                fileName: "[project]/app/settings/setup/components/EventsPurchases.js",
                                lineNumber: 1226,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/settings/setup/components/EventsPurchases.js",
                        lineNumber: 1224,
                        columnNumber: 13
                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                type: "button",
                                variant: "ghost",
                                onClick: ()=>setStep(1),
                                children: "← Back"
                            }, void 0, false, {
                                fileName: "[project]/app/settings/setup/components/EventsPurchases.js",
                                lineNumber: 1230,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                type: "button",
                                onClick: submit,
                                disabled: saving || walletOver || isPlan && planCountN < 2 || isFlex && !flexBalanced || collectNow && savedCardMissing || collectNow && achNotAvailable || collectNow && terminalDeviceMissing,
                                children: saving ? 'Saving…' : isPlan ? 'Create payment plan' : isFlex ? 'Create schedule' : collectNow ? isLink ? 'Create & send link' : chargeMethod === 'card' ? 'Create & open checkout' : chargeMethod === 'ach' ? 'Create & pay by bank transfer' : 'Create & record payment' : 'Create purchase'
                            }, void 0, false, {
                                fileName: "[project]/app/settings/setup/components/EventsPurchases.js",
                                lineNumber: 1231,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/settings/setup/components/EventsPurchases.js",
                        lineNumber: 1229,
                        columnNumber: 13
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/app/settings/setup/components/EventsPurchases.js",
                    lineNumber: 1222,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/app/settings/setup/components/EventsPurchases.js",
            lineNumber: 889,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/app/settings/setup/components/EventsPurchases.js",
        lineNumber: 888,
        columnNumber: 5
    }, this);
}
_s8(CreateEventPurchaseDialog, "bwANfPIKao8DbdO8HLET/RWh8KQ=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$settings$2f$payments$2f$useCardProcessor$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCardProcessor"]
    ];
});
_c13 = CreateEventPurchaseDialog;
var _c, _c1, _c2, _c3, _c4, _c5, _c6, _c7, _c8, _c9, _c10, _c11, _c12, _c13;
__turbopack_context__.k.register(_c, "PLAN_SHORTFALL_METHODS$SHORTFALL_METHODS.filter");
__turbopack_context__.k.register(_c1, "PLAN_SHORTFALL_METHODS");
__turbopack_context__.k.register(_c2, "StatusBadge");
__turbopack_context__.k.register(_c3, "Shell");
__turbopack_context__.k.register(_c4, "SortableRow");
__turbopack_context__.k.register(_c5, "SortableTable");
__turbopack_context__.k.register(_c6, "ProductDialog");
__turbopack_context__.k.register(_c7, "ProductsTab");
__turbopack_context__.k.register(_c8, "EventTypeDialog");
__turbopack_context__.k.register(_c9, "EventTypesTab");
__turbopack_context__.k.register(_c10, "LineItemsEditor");
__turbopack_context__.k.register(_c11, "TemplateDialog");
__turbopack_context__.k.register(_c12, "SavedTemplatesTab");
__turbopack_context__.k.register(_c13, "CreateEventPurchaseDialog");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=app_0mhs7dczavvzm._.js.map