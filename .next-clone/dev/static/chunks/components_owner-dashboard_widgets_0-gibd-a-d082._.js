(globalThis["TURBOPACK"] || (globalThis["TURBOPACK"] = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/components/owner-dashboard/widgets/ConversionFunnelReportsWidget.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ConversionFunnelReportsWidget
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$leads$2f$components$2f$LeadsDialog$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/leads/components/LeadsDialog.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dashboard$2f$widgets$2f$shared$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/dashboard/widgets/shared.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$owner$2d$dashboard$2f$widgets$2f$shared$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/owner-dashboard/widgets/shared.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$owner$2d$dashboard$2f$widgets$2f$WidgetHeader$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/owner-dashboard/widgets/WidgetHeader.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$owner$2d$dashboard$2f$widgets$2f$DetailsButton$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/owner-dashboard/widgets/DetailsButton.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$owner$2d$dashboard$2f$widgets$2f$FunnelDrilldownTable$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/owner-dashboard/widgets/FunnelDrilldownTable.js [app-client] (ecmascript)");
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
const DETAIL_COLUMNS = [
    {
        key: 'name',
        label: 'Lead'
    },
    {
        key: 'email',
        label: 'Email'
    },
    {
        key: 'phoneNumber',
        label: 'Phone'
    },
    {
        key: 'studio',
        label: 'Studio'
    },
    {
        key: 'createdAt',
        label: 'Created',
        format: (v)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatDate"])(v) || '—'
    },
    {
        key: 'introBooked',
        label: 'Intro Booked'
    },
    {
        key: 'introAttended',
        label: 'Intro Attended'
    },
    {
        key: 'firstPurchase',
        label: 'First Purchase'
    }
];
const truthy = (v)=>v === true || v === 'Yes' || v === 'yes' || v === 1 || v === '1';
// Each card drills into the same detail set, narrowed to that stage.
const STAGES = [
    {
        key: 'leads',
        label: 'Leads',
        filterFn: null
    },
    {
        key: 'introBooked',
        label: 'Intro Booked',
        filterFn: (r)=>truthy(r.introBooked)
    },
    {
        key: 'introAttended',
        label: 'Intros Attended',
        filterFn: (r)=>truthy(r.introAttended)
    },
    {
        key: 'firstPurchase',
        label: 'First Purchase',
        filterFn: (r)=>truthy(r.firstPurchase)
    }
];
function ConversionFunnelReportsWidget({ funnel, rangeDays, onRangeChange }) {
    _s();
    const [activeStage, setActiveStage] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [viewLeadId, setViewLeadId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const report1 = funnel?.report1 || {
        leadCount: 0,
        introBookedCount: 0,
        ratePct: 0,
        avgDaysToBook: 0
    };
    const report2 = funnel?.report2 || {
        introCount: 0,
        firstPurchaseCount: 0,
        ratePct: 0,
        avgDaysToPurchase: 0
    };
    const showRatePct = report1.introBookedCount ? Math.round(report2.introCount / report1.introBookedCount * 100) : 0;
    const denom = report1.leadCount || 1;
    const bar = (n)=>Math.round(n / denom * 100);
    const toggle = (key)=>setActiveStage((cur)=>cur === key ? null : key);
    const active = STAGES.find((s)=>s.key === activeStage);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dashboard$2f$widgets$2f$shared$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Card"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$owner$2d$dashboard$2f$widgets$2f$WidgetHeader$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                title: "Lead → Intro → First Purchase",
                rangeDays: rangeDays,
                onRangeChange: onRangeChange,
                detailsButton: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$owner$2d$dashboard$2f$widgets$2f$DetailsButton$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                    title: "Lead → Intro → First Purchase — full details",
                    metric: "conversionFunnelReports",
                    rangeDays: rangeDays,
                    columns: DETAIL_COLUMNS
                }, void 0, false, {
                    fileName: "[project]/components/owner-dashboard/widgets/ConversionFunnelReportsWidget.js",
                    lineNumber: 57,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/owner-dashboard/widgets/ConversionFunnelReportsWidget.js",
                lineNumber: 52,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "mt-1 text-[11px] text-muted-foreground",
                children: "Report 1 (Lead to Intro Booked) and Report 2 (Intro to First Purchase) chained into one funnel. Click a card for the underlying records."
            }, void 0, false, {
                fileName: "[project]/components/owner-dashboard/widgets/ConversionFunnelReportsWidget.js",
                lineNumber: 65,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-4 flex items-stretch gap-2 overflow-x-auto pb-1",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$owner$2d$dashboard$2f$widgets$2f$shared$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FunnelStage"], {
                        label: "Leads",
                        value: report1.leadCount.toLocaleString(),
                        barPct: 100,
                        highlight: activeStage === null,
                        onClick: ()=>toggle('leads'),
                        active: activeStage === 'leads'
                    }, void 0, false, {
                        fileName: "[project]/components/owner-dashboard/widgets/ConversionFunnelReportsWidget.js",
                        lineNumber: 70,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$owner$2d$dashboard$2f$widgets$2f$shared$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FunnelConnector"], {
                        ratePct: report1.ratePct,
                        caption: `avg ${report1.avgDaysToBook}d to book`
                    }, void 0, false, {
                        fileName: "[project]/components/owner-dashboard/widgets/ConversionFunnelReportsWidget.js",
                        lineNumber: 78,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$owner$2d$dashboard$2f$widgets$2f$shared$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FunnelStage"], {
                        label: "Intro Booked",
                        value: report1.introBookedCount.toLocaleString(),
                        barPct: bar(report1.introBookedCount),
                        onClick: ()=>toggle('introBooked'),
                        active: activeStage === 'introBooked'
                    }, void 0, false, {
                        fileName: "[project]/components/owner-dashboard/widgets/ConversionFunnelReportsWidget.js",
                        lineNumber: 79,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$owner$2d$dashboard$2f$widgets$2f$shared$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FunnelConnector"], {
                        ratePct: showRatePct,
                        caption: "show rate"
                    }, void 0, false, {
                        fileName: "[project]/components/owner-dashboard/widgets/ConversionFunnelReportsWidget.js",
                        lineNumber: 86,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$owner$2d$dashboard$2f$widgets$2f$shared$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FunnelStage"], {
                        label: "Intros Attended",
                        value: report2.introCount.toLocaleString(),
                        barPct: bar(report2.introCount),
                        onClick: ()=>toggle('introAttended'),
                        active: activeStage === 'introAttended'
                    }, void 0, false, {
                        fileName: "[project]/components/owner-dashboard/widgets/ConversionFunnelReportsWidget.js",
                        lineNumber: 87,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$owner$2d$dashboard$2f$widgets$2f$shared$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FunnelConnector"], {
                        ratePct: report2.ratePct,
                        caption: `avg ${report2.avgDaysToPurchase}d to buy`
                    }, void 0, false, {
                        fileName: "[project]/components/owner-dashboard/widgets/ConversionFunnelReportsWidget.js",
                        lineNumber: 94,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$owner$2d$dashboard$2f$widgets$2f$shared$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FunnelStage"], {
                        label: "First Purchase",
                        value: report2.firstPurchaseCount.toLocaleString(),
                        barPct: bar(report2.firstPurchaseCount),
                        onClick: ()=>toggle('firstPurchase'),
                        active: activeStage === 'firstPurchase'
                    }, void 0, false, {
                        fileName: "[project]/components/owner-dashboard/widgets/ConversionFunnelReportsWidget.js",
                        lineNumber: 95,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/owner-dashboard/widgets/ConversionFunnelReportsWidget.js",
                lineNumber: 69,
                columnNumber: 7
            }, this),
            active && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$owner$2d$dashboard$2f$widgets$2f$FunnelDrilldownTable$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                title: active.label,
                metric: "conversionFunnelReports",
                rangeDays: rangeDays,
                columns: DETAIL_COLUMNS,
                filterFn: active.filterFn,
                onClose: ()=>setActiveStage(null),
                onRowClick: (row)=>row.customerID ? router.push(`/settings/users-roles/customers/${row.customerID}`) : setViewLeadId(row._id)
            }, void 0, false, {
                fileName: "[project]/components/owner-dashboard/widgets/ConversionFunnelReportsWidget.js",
                lineNumber: 105,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$leads$2f$components$2f$LeadsDialog$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                open: Boolean(viewLeadId),
                onClose: ()=>setViewLeadId(null),
                initialLeadId: viewLeadId,
                viewOnly: true
            }, void 0, false, {
                fileName: "[project]/components/owner-dashboard/widgets/ConversionFunnelReportsWidget.js",
                lineNumber: 117,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/owner-dashboard/widgets/ConversionFunnelReportsWidget.js",
        lineNumber: 51,
        columnNumber: 5
    }, this);
}
_s(ConversionFunnelReportsWidget, "vRxmXfVTaQLi6eQfLffx+FEmFxQ=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"]
    ];
});
_c = ConversionFunnelReportsWidget;
var _c;
__turbopack_context__.k.register(_c, "ConversionFunnelReportsWidget");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/owner-dashboard/widgets/CurriculumProgressionWidget.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>CurriculumProgressionWidget
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dashboard$2f$widgets$2f$shared$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/dashboard/widgets/shared.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$owner$2d$dashboard$2f$widgets$2f$shared$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/owner-dashboard/widgets/shared.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$owner$2d$dashboard$2f$widgets$2f$WidgetHeader$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/owner-dashboard/widgets/WidgetHeader.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$owner$2d$dashboard$2f$widgets$2f$DetailsButton$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/owner-dashboard/widgets/DetailsButton.js [app-client] (ecmascript)");
'use client';
;
;
;
;
;
const DETAIL_COLUMNS = [
    {
        key: 'name',
        label: 'Customer'
    },
    {
        key: 'email',
        label: 'Email'
    },
    {
        key: 'phoneNumber',
        label: 'Phone'
    },
    {
        key: 'studio',
        label: 'Studio'
    },
    {
        key: 'highestTier',
        label: 'Highest Tier Reached'
    }
];
function CurriculumProgressionWidget({ funnel, rangeDays, onRangeChange }) {
    const stages = funnel?.report4?.curriculumProgression || [];
    const hasData = stages.some((s)=>s.count > 0);
    const maxCount = Math.max(...stages.map((s)=>s.count), 1);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dashboard$2f$widgets$2f$shared$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Card"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$owner$2d$dashboard$2f$widgets$2f$WidgetHeader$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                title: "Curriculum Progression",
                // Highest tier ever reached — lifetime, not window-scoped — so no range dropdown.
                right: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: "text-[11px] text-muted-foreground",
                    children: "All time"
                }, void 0, false, {
                    fileName: "[project]/components/owner-dashboard/widgets/CurriculumProgressionWidget.js",
                    lineNumber: 26,
                    columnNumber: 16
                }, this),
                detailsButton: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$owner$2d$dashboard$2f$widgets$2f$DetailsButton$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                    title: "Curriculum Progression — full details",
                    metric: "curriculumProgression",
                    rangeDays: rangeDays,
                    columns: DETAIL_COLUMNS
                }, void 0, false, {
                    fileName: "[project]/components/owner-dashboard/widgets/CurriculumProgressionWidget.js",
                    lineNumber: 28,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/owner-dashboard/widgets/CurriculumProgressionWidget.js",
                lineNumber: 23,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "mt-1 text-[11px] text-muted-foreground",
                children: "Report 4 — how many students have ever reached each curriculum tier."
            }, void 0, false, {
                fileName: "[project]/components/owner-dashboard/widgets/CurriculumProgressionWidget.js",
                lineNumber: 36,
                columnNumber: 7
            }, this),
            hasData ? // Wrapping grid, not a horizontal rail — orgs have many tiers, and a
            // centered overflow rail clipped the first ones out of reach.
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-4 grid grid-cols-[repeat(auto-fill,minmax(160px,1fr))] gap-3",
                children: stages.map((s, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$owner$2d$dashboard$2f$widgets$2f$shared$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FunnelStage"], {
                        label: s.label,
                        value: s.count.toLocaleString(),
                        barPct: Math.round(s.count / maxCount * 100),
                        metrics: i > 0 ? [
                            {
                                label: 'From previous tier',
                                value: `${stages[i - 1].count ? Math.round(s.count / stages[i - 1].count * 100) : 0}%`
                            }
                        ] : []
                    }, s.label, false, {
                        fileName: "[project]/components/owner-dashboard/widgets/CurriculumProgressionWidget.js",
                        lineNumber: 44,
                        columnNumber: 13
                    }, this))
            }, void 0, false, {
                fileName: "[project]/components/owner-dashboard/widgets/CurriculumProgressionWidget.js",
                lineNumber: 42,
                columnNumber: 9
            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dashboard$2f$widgets$2f$shared$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["EmptyChart"], {
                message: "No students have reached a curriculum tier yet."
            }, void 0, false, {
                fileName: "[project]/components/owner-dashboard/widgets/CurriculumProgressionWidget.js",
                lineNumber: 63,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/owner-dashboard/widgets/CurriculumProgressionWidget.js",
        lineNumber: 22,
        columnNumber: 5
    }, this);
}
_c = CurriculumProgressionWidget;
var _c;
__turbopack_context__.k.register(_c, "CurriculumProgressionWidget");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/owner-dashboard/widgets/DetailsButton.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>DetailsButton
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$table$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Table2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/table-2.js [app-client] (ecmascript) <export default as Table2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$dashboardDetailsStore$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/dashboardDetailsStore.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
function DetailsButton({ title, metric, rangeDays, params, columns }) {
    _s();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    function handleClick() {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$dashboardDetailsStore$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["setDashboardDetailsRequest"])({
            source: 'owner',
            title,
            metric,
            rangeDays,
            params,
            columns,
            backHref: '/dashboard'
        });
        router.push('/dashboard/details');
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
        type: "button",
        onClick: handleClick,
        title: "Show full details",
        className: "flex items-center gap-1 rounded-lg border border-border px-2 py-1 text-[11px] font-medium text-muted-foreground transition-colors hover:bg-muted/60 hover:text-foreground",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$table$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Table2$3e$__["Table2"], {
                className: "h-3 w-3"
            }, void 0, false, {
                fileName: "[project]/components/owner-dashboard/widgets/DetailsButton.js",
                lineNumber: 28,
                columnNumber: 7
            }, this),
            "Details"
        ]
    }, void 0, true, {
        fileName: "[project]/components/owner-dashboard/widgets/DetailsButton.js",
        lineNumber: 22,
        columnNumber: 5
    }, this);
}
_s(DetailsButton, "fN7XvhJ+p5oE6+Xlo0NJmXpxjC8=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"]
    ];
});
_c = DetailsButton;
var _c;
__turbopack_context__.k.register(_c, "DetailsButton");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/owner-dashboard/widgets/ExecutiveScorecardWidget.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ExecutiveScorecardWidget
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$hooks$2f$useOwnerDashboardPage$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/hooks/useOwnerDashboardPage.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dashboard$2f$widgets$2f$shared$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/dashboard/widgets/shared.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$owner$2d$dashboard$2f$widgets$2f$RangeDropdown$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/owner-dashboard/widgets/RangeDropdown.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
const money = (n)=>`$${Math.round(Number(n) || 0).toLocaleString()}`;
const num = (n)=>Math.round(Number(n) || 0).toLocaleString();
/**
 * The Executive Scorecard — headline metrics from the owner-overview payload,
 * each badged against the prior period (MoM) and the same window a year ago
 * (YoY). Ported from the sectioned dashboard's ScorecardSection into the
 * classic widget-grid design (Card + Trend), so the two dashboards share one
 * look. A metric the backend can't produce still renders as an em dash with a
 * short note, so the grid keeps its shape.
 */ function todayNote(cur, rangeDays) {
    if (rangeDays !== 0 || cur.scheduledToday === null || cur.scheduledToday === undefined) return null;
    return `taught so far · ${num(cur.scheduledToday)} more scheduled later today`;
}
function buildCards({ current, previous, lastYear }, rangeDays) {
    const cur = current || {};
    const prev = previous || {};
    const ly = lastYear || {};
    const value = (v, fmt)=>v === null || v === undefined ? null : fmt(v);
    const ratio = (key)=>({
            mom: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$hooks$2f$useOwnerDashboardPage$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["delta"])(cur[key], prev[key]),
            yoy: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$hooks$2f$useOwnerDashboardPage$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["delta"])(cur[key], ly[key])
        });
    const points = (key)=>({
            mom: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$hooks$2f$useOwnerDashboardPage$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["pointDelta"])(cur[key], prev[key]),
            yoy: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$hooks$2f$useOwnerDashboardPage$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["pointDelta"])(cur[key], ly[key])
        });
    return [
        {
            label: 'Revenue',
            value: value(cur.revenue, money),
            ...ratio('revenue')
        },
        {
            label: 'Lessons',
            value: value(cur.lessons, num),
            // On "Today" a bare count of lessons already taught reads wrong beside a
            // calendar full of today's bookings, so say how many are still to come.
            note: todayNote(cur, rangeDays),
            ...ratio('lessons')
        },
        {
            label: 'Leads',
            value: value(cur.leads, num),
            ...ratio('leads')
        },
        {
            label: 'Intros Taught',
            value: value(cur.introsTaught, num),
            note: cur.introsBooked !== null && cur.introsBooked !== undefined ? `${num(cur.introsBooked)} of ${num(cur.convertedLeads)} converted leads booked an intro` : null,
            ...ratio('introsTaught')
        },
        {
            label: 'Lead → Intro',
            value: value(cur.leadToIntroPct, (v)=>`${v}%`),
            ...points('leadToIntroPct')
        },
        {
            label: 'Intro → First Purchase',
            value: value(cur.introToPurchasePct, (v)=>`${v}%`),
            note: cur.firstPurchases !== null && cur.firstPurchases !== undefined ? `${num(cur.firstPurchases)} first purchases` : null,
            ...points('introToPurchasePct')
        },
        {
            label: 'Booked %',
            value: value(cur.bookedPct, (v)=>`${v}%`),
            note: cur.activeStudents !== null && cur.activeStudents !== undefined ? `${num(cur.bookedStudents)} booked of ${num(cur.activeStudents)} active` : null
        },
        {
            label: 'Lessons Scheduled',
            value: value(cur.scheduled, num),
            note: 'Confirmed future lessons'
        },
        {
            label: 'Teacher Utilization',
            value: value(cur.utilizationPct, (v)=>`${v}%`),
            note: cur.actualPerWeek !== null && cur.actualPerWeek !== undefined && cur.capacityPerWeek ? `${cur.actualPerWeek} of ${num(cur.capacityPerWeek)} lessons/wk` : null,
            ...points('utilizationPct')
        }
    ];
}
/** One MoM / YoY badge from a delta()/pointDelta() result. `null` → nothing. */ function DeltaBadge({ d, label }) {
    if (!d) return null;
    const suffix = d.points ? ' pp' : '%';
    const text = d.noBaseline ? 'New' : `${d.pct >= 0 ? '+' : ''}${d.pct.toFixed(1)}${suffix}`;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dashboard$2f$widgets$2f$shared$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Trend"], {
        type: d.dir,
        text: `${label} ${text}`,
        label: `${label}: ${d.noBaseline ? 'no prior data to compare against' : text}`,
        className: ""
    }, void 0, false, {
        fileName: "[project]/components/owner-dashboard/widgets/ExecutiveScorecardWidget.js",
        lineNumber: 92,
        columnNumber: 5
    }, this);
}
_c = DeltaBadge;
function ExecutiveScorecardWidget({ rangeDays, onRangeChange }) {
    _s();
    const { summaries, isLoading } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$hooks$2f$useOwnerDashboardPage$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useOwnerDashboardPage"])(rangeDays);
    if (isLoading && !summaries?.current) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "h-64 animate-pulse rounded-xl bg-muted/40"
        }, void 0, false, {
            fileName: "[project]/components/owner-dashboard/widgets/ExecutiveScorecardWidget.js",
            lineNumber: 105,
            columnNumber: 12
        }, this);
    }
    const cards = buildCards(summaries, rangeDays);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        className: "flex h-full flex-col gap-3",
        children: [
            onRangeChange && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center justify-end",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$owner$2d$dashboard$2f$widgets$2f$RangeDropdown$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                    value: rangeDays,
                    onChange: onRangeChange
                }, void 0, false, {
                    fileName: "[project]/components/owner-dashboard/widgets/ExecutiveScorecardWidget.js",
                    lineNumber: 114,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/owner-dashboard/widgets/ExecutiveScorecardWidget.js",
                lineNumber: 113,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid flex-1 grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3",
                children: cards.map((card)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dashboard$2f$widgets$2f$shared$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Card"], {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "truncate text-[13px] font-bold uppercase tracking-[0.02em] text-[var(--studio-primary)]",
                                children: card.label
                            }, void 0, false, {
                                fileName: "[project]/components/owner-dashboard/widgets/ExecutiveScorecardWidget.js",
                                lineNumber: 120,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                className: "mt-2.5 bg-gradient-to-b from-muted-foreground to-foreground bg-clip-text text-[32px] font-bold leading-[1.21] text-transparent",
                                children: card.value ?? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-muted-foreground/50",
                                    children: "—"
                                }, void 0, false, {
                                    fileName: "[project]/components/owner-dashboard/widgets/ExecutiveScorecardWidget.js",
                                    lineNumber: 124,
                                    columnNumber: 30
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/components/owner-dashboard/widgets/ExecutiveScorecardWidget.js",
                                lineNumber: 123,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mt-2 flex flex-wrap gap-1.5",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(DeltaBadge, {
                                        d: card.mom,
                                        label: "MoM"
                                    }, void 0, false, {
                                        fileName: "[project]/components/owner-dashboard/widgets/ExecutiveScorecardWidget.js",
                                        lineNumber: 127,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(DeltaBadge, {
                                        d: card.yoy,
                                        label: "YoY"
                                    }, void 0, false, {
                                        fileName: "[project]/components/owner-dashboard/widgets/ExecutiveScorecardWidget.js",
                                        lineNumber: 128,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/owner-dashboard/widgets/ExecutiveScorecardWidget.js",
                                lineNumber: 126,
                                columnNumber: 13
                            }, this),
                            card.note && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "mt-2 text-[11px] leading-relaxed text-muted-foreground",
                                children: card.note
                            }, void 0, false, {
                                fileName: "[project]/components/owner-dashboard/widgets/ExecutiveScorecardWidget.js",
                                lineNumber: 130,
                                columnNumber: 27
                            }, this)
                        ]
                    }, card.label, true, {
                        fileName: "[project]/components/owner-dashboard/widgets/ExecutiveScorecardWidget.js",
                        lineNumber: 119,
                        columnNumber: 11
                    }, this))
            }, void 0, false, {
                fileName: "[project]/components/owner-dashboard/widgets/ExecutiveScorecardWidget.js",
                lineNumber: 117,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/owner-dashboard/widgets/ExecutiveScorecardWidget.js",
        lineNumber: 111,
        columnNumber: 5
    }, this);
}
_s(ExecutiveScorecardWidget, "PV55cT/AumrY2HkCZXaYnwq6CIs=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$hooks$2f$useOwnerDashboardPage$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useOwnerDashboardPage"]
    ];
});
_c1 = ExecutiveScorecardWidget;
var _c, _c1;
__turbopack_context__.k.register(_c, "DeltaBadge");
__turbopack_context__.k.register(_c1, "ExecutiveScorecardWidget");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/owner-dashboard/widgets/FunnelDrilldownTable.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>FunnelDrilldownTable
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/x.js [app-client] (ecmascript) <export default as X>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$left$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronLeft$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/chevron-left.js [app-client] (ecmascript) <export default as ChevronLeft>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronRight$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/chevron-right.js [app-client] (ecmascript) <export default as ChevronRight>");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$table$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/table.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$shared$2f$LoadingSpinner$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/shared/LoadingSpinner.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$hooks$2f$useAnalyticsOverview$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/hooks/useAnalyticsOverview.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
const PAGE_SIZE = 10;
// One wide fetch, then paged/filtered on the client — funnel stages need
// client-side filtering on boolean/count columns the details endpoint returns
// but doesn't filter by.
const FETCH_LIMIT = 500;
function renderCell(row, col) {
    const raw = row[col.key];
    if (col.format) {
        try {
            return col.format(raw, row);
        } catch  {
        /* fall through */ }
    }
    if (typeof raw === 'boolean') return raw ? 'Yes' : '—';
    if (raw === null || raw === undefined || raw === '') return '—';
    return String(raw);
}
function FunnelDrilldownTable({ title, metric, rangeDays, columns, filterFn, onClose, onRowClick }) {
    _s();
    const [page, setPage] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(1);
    const { data, isLoading } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$hooks$2f$useAnalyticsOverview$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useOwnerOverviewDetails"])({
        metric,
        range: rangeDays,
        page: 1,
        limit: FETCH_LIMIT,
        enabled: true
    });
    const allRows = data?.rows || [];
    const rows = filterFn ? allRows.filter(filterFn) : allRows;
    const totalPages = Math.max(Math.ceil(rows.length / PAGE_SIZE), 1);
    const safePage = Math.min(page, totalPages);
    const pageRows = rows.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "mt-4 overflow-hidden rounded-2xl border border-border bg-card",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center justify-between border-b border-border bg-muted/40 px-4 py-2.5",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-[12px] font-bold uppercase tracking-[0.08em] text-[var(--studio-primary)]",
                        children: [
                            title,
                            !isLoading && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "ml-2 font-medium normal-case text-muted-foreground",
                                children: [
                                    rows.length.toLocaleString(),
                                    " records"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/owner-dashboard/widgets/FunnelDrilldownTable.js",
                                lineNumber: 55,
                                columnNumber: 26
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/owner-dashboard/widgets/FunnelDrilldownTable.js",
                        lineNumber: 53,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        onClick: onClose,
                        className: "rounded-md p-1 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground",
                        "aria-label": "Close",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                            className: "h-3.5 w-3.5"
                        }, void 0, false, {
                            fileName: "[project]/components/owner-dashboard/widgets/FunnelDrilldownTable.js",
                            lineNumber: 63,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/owner-dashboard/widgets/FunnelDrilldownTable.js",
                        lineNumber: 57,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/owner-dashboard/widgets/FunnelDrilldownTable.js",
                lineNumber: 52,
                columnNumber: 7
            }, this),
            isLoading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center justify-center py-12",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$shared$2f$LoadingSpinner$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                    size: "md"
                }, void 0, false, {
                    fileName: "[project]/components/owner-dashboard/widgets/FunnelDrilldownTable.js",
                    lineNumber: 69,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/owner-dashboard/widgets/FunnelDrilldownTable.js",
                lineNumber: 68,
                columnNumber: 9
            }, this) : rows.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "py-10 text-center text-sm text-muted-foreground",
                children: "No records for this stage."
            }, void 0, false, {
                fileName: "[project]/components/owner-dashboard/widgets/FunnelDrilldownTable.js",
                lineNumber: 72,
                columnNumber: 9
            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "overflow-x-auto",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$table$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Table"], {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$table$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TableHeader"], {
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$table$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TableRow"], {
                                className: "hover:bg-transparent",
                                children: columns.map((col)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$table$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TableHead"], {
                                        className: "whitespace-nowrap bg-muted/60 text-[11px] font-semibold uppercase tracking-wide text-muted-foreground",
                                        children: col.label
                                    }, col.key, false, {
                                        fileName: "[project]/components/owner-dashboard/widgets/FunnelDrilldownTable.js",
                                        lineNumber: 79,
                                        columnNumber: 19
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/components/owner-dashboard/widgets/FunnelDrilldownTable.js",
                                lineNumber: 77,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/components/owner-dashboard/widgets/FunnelDrilldownTable.js",
                            lineNumber: 76,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$table$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TableBody"], {
                            children: pageRows.map((row, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$table$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TableRow"], {
                                    className: `even:bg-muted/20 ${onRowClick ? 'cursor-pointer hover:bg-muted/40' : ''}`,
                                    onClick: onRowClick ? ()=>onRowClick(row) : undefined,
                                    children: columns.map((col)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$table$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TableCell"], {
                                            className: "whitespace-nowrap text-sm",
                                            children: renderCell(row, col)
                                        }, col.key, false, {
                                            fileName: "[project]/components/owner-dashboard/widgets/FunnelDrilldownTable.js",
                                            lineNumber: 96,
                                            columnNumber: 21
                                        }, this))
                                }, row._id || row.id || i, false, {
                                    fileName: "[project]/components/owner-dashboard/widgets/FunnelDrilldownTable.js",
                                    lineNumber: 90,
                                    columnNumber: 17
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/components/owner-dashboard/widgets/FunnelDrilldownTable.js",
                            lineNumber: 88,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/owner-dashboard/widgets/FunnelDrilldownTable.js",
                    lineNumber: 75,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/owner-dashboard/widgets/FunnelDrilldownTable.js",
                lineNumber: 74,
                columnNumber: 9
            }, this),
            rows.length > PAGE_SIZE && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center justify-between border-t border-border px-4 py-2 text-[12px] text-muted-foreground",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        children: [
                            "Page ",
                            safePage,
                            " of ",
                            totalPages
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/owner-dashboard/widgets/FunnelDrilldownTable.js",
                        lineNumber: 109,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-1.5",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                onClick: ()=>setPage((p)=>Math.max(p - 1, 1)),
                                disabled: safePage <= 1,
                                className: "rounded-lg border border-border p-1 disabled:opacity-40",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$left$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronLeft$3e$__["ChevronLeft"], {
                                    className: "h-4 w-4"
                                }, void 0, false, {
                                    fileName: "[project]/components/owner-dashboard/widgets/FunnelDrilldownTable.js",
                                    lineNumber: 119,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/components/owner-dashboard/widgets/FunnelDrilldownTable.js",
                                lineNumber: 113,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                onClick: ()=>setPage((p)=>Math.min(p + 1, totalPages)),
                                disabled: safePage >= totalPages,
                                className: "rounded-lg border border-border p-1 disabled:opacity-40",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronRight$3e$__["ChevronRight"], {
                                    className: "h-4 w-4"
                                }, void 0, false, {
                                    fileName: "[project]/components/owner-dashboard/widgets/FunnelDrilldownTable.js",
                                    lineNumber: 127,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/components/owner-dashboard/widgets/FunnelDrilldownTable.js",
                                lineNumber: 121,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/owner-dashboard/widgets/FunnelDrilldownTable.js",
                        lineNumber: 112,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/owner-dashboard/widgets/FunnelDrilldownTable.js",
                lineNumber: 108,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/owner-dashboard/widgets/FunnelDrilldownTable.js",
        lineNumber: 51,
        columnNumber: 5
    }, this);
}
_s(FunnelDrilldownTable, "wsagoZsj4r16badiN8YHaNaPlHI=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$hooks$2f$useAnalyticsOverview$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useOwnerOverviewDetails"]
    ];
});
_c = FunnelDrilldownTable;
var _c;
__turbopack_context__.k.register(_c, "FunnelDrilldownTable");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/owner-dashboard/widgets/GoalsWidget.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>GoalsWidget
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dashboard$2f$widgets$2f$shared$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/dashboard/widgets/shared.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$owner$2d$dashboard$2f$widgets$2f$DetailsButton$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/owner-dashboard/widgets/DetailsButton.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/utils.js [app-client] (ecmascript)");
'use client';
;
;
;
;
const DETAIL_COLUMNS = [
    {
        key: 'category',
        label: 'Category'
    },
    {
        key: 'date',
        label: 'Date',
        format: (v)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatDate"])(v) || '—'
    },
    {
        key: 'label',
        label: 'Detail'
    },
    {
        key: 'name',
        label: 'Name'
    },
    {
        key: 'studio',
        label: 'Studio'
    },
    {
        key: 'value',
        label: 'Value',
        format: (v, row)=>row?.category === 'Revenue' ? `$${Number(v || 0).toLocaleString()}` : Number(v || 0).toLocaleString()
    }
];
function formatValue(metric, n) {
    const num = Number(n) || 0;
    if (metric === 'revenue') {
        if (Math.abs(num) >= 1000000) return `$${(num / 1000000).toFixed(1)}M`;
        if (Math.abs(num) >= 10000) return `$${(num / 1000).toFixed(1)}k`;
        return `$${num.toLocaleString(undefined, {
            maximumFractionDigits: 0
        })}`;
    }
    return num.toLocaleString();
}
function GoalRow({ label, actual, target, pct, metric }) {
    const clamped = pct === null ? 0 : Math.min(pct, 100);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "py-2.5",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-baseline justify-between",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-[12px] font-semibold text-foreground",
                        children: label
                    }, void 0, false, {
                        fileName: "[project]/components/owner-dashboard/widgets/GoalsWidget.js",
                        lineNumber: 31,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-[12px] tabular-nums text-muted-foreground",
                        children: [
                            formatValue(metric, actual),
                            target !== null && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                children: [
                                    " / ",
                                    formatValue(metric, target)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/owner-dashboard/widgets/GoalsWidget.js",
                                lineNumber: 34,
                                columnNumber: 31
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/owner-dashboard/widgets/GoalsWidget.js",
                        lineNumber: 32,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/owner-dashboard/widgets/GoalsWidget.js",
                lineNumber: 30,
                columnNumber: 7
            }, this),
            target !== null ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-1.5 h-2.5 overflow-hidden rounded-full bg-muted",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "h-full rounded-full transition-all duration-700",
                    style: {
                        width: `${Math.max(clamped, actual > 0 ? 2 : 0)}%`,
                        background: pct >= 100 ? 'linear-gradient(90deg, var(--bar-gradient-start), var(--bar-gradient-end))' : 'color-mix(in srgb, var(--studio-primary) 40%, transparent)'
                    }
                }, void 0, false, {
                    fileName: "[project]/components/owner-dashboard/widgets/GoalsWidget.js",
                    lineNumber: 39,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/owner-dashboard/widgets/GoalsWidget.js",
                lineNumber: 38,
                columnNumber: 9
            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "mt-1 text-[10px] text-muted-foreground",
                children: "No goal set for this month."
            }, void 0, false, {
                fileName: "[project]/components/owner-dashboard/widgets/GoalsWidget.js",
                lineNumber: 51,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/owner-dashboard/widgets/GoalsWidget.js",
        lineNumber: 29,
        columnNumber: 5
    }, this);
}
_c = GoalRow;
function GoalsWidget({ goals, rangeDays = 30 }) {
    const metrics = goals?.metrics || [];
    const anyTargetSet = metrics.some((m)=>m.target !== null);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dashboard$2f$widgets$2f$shared$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Card"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex flex-wrap items-center justify-between gap-2",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dashboard$2f$widgets$2f$shared$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SectionLabel"], {
                        children: "Goals This Month"
                    }, void 0, false, {
                        fileName: "[project]/components/owner-dashboard/widgets/GoalsWidget.js",
                        lineNumber: 64,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$owner$2d$dashboard$2f$widgets$2f$DetailsButton$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        title: "Goals This Month — full details",
                        metric: "goalsDetail",
                        rangeDays: rangeDays,
                        columns: DETAIL_COLUMNS
                    }, void 0, false, {
                        fileName: "[project]/components/owner-dashboard/widgets/GoalsWidget.js",
                        lineNumber: 65,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/owner-dashboard/widgets/GoalsWidget.js",
                lineNumber: 63,
                columnNumber: 7
            }, this),
            metrics.length > 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-2 divide-y divide-border",
                children: metrics.map((m)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(GoalRow, {
                        label: m.label,
                        actual: m.actual,
                        target: m.target,
                        pct: m.pct,
                        metric: m.metric
                    }, m.metric, false, {
                        fileName: "[project]/components/owner-dashboard/widgets/GoalsWidget.js",
                        lineNumber: 75,
                        columnNumber: 13
                    }, this))
            }, void 0, false, {
                fileName: "[project]/components/owner-dashboard/widgets/GoalsWidget.js",
                lineNumber: 73,
                columnNumber: 9
            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dashboard$2f$widgets$2f$shared$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["EmptyChart"], {
                message: "No goals configured."
            }, void 0, false, {
                fileName: "[project]/components/owner-dashboard/widgets/GoalsWidget.js",
                lineNumber: 79,
                columnNumber: 9
            }, this),
            !anyTargetSet && metrics.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "mt-1 text-[10px] text-muted-foreground",
                children: "Set targets in Settings → Goals."
            }, void 0, false, {
                fileName: "[project]/components/owner-dashboard/widgets/GoalsWidget.js",
                lineNumber: 82,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/owner-dashboard/widgets/GoalsWidget.js",
        lineNumber: 62,
        columnNumber: 5
    }, this);
}
_c1 = GoalsWidget;
var _c, _c1;
__turbopack_context__.k.register(_c, "GoalRow");
__turbopack_context__.k.register(_c1, "GoalsWidget");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/owner-dashboard/widgets/InstructorUtilizationWidget.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>InstructorUtilizationWidget
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dashboard$2f$widgets$2f$shared$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/dashboard/widgets/shared.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$owner$2d$dashboard$2f$widgets$2f$shared$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/owner-dashboard/widgets/shared.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$owner$2d$dashboard$2f$widgets$2f$WidgetHeader$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/owner-dashboard/widgets/WidgetHeader.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$owner$2d$dashboard$2f$widgets$2f$DetailsButton$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/owner-dashboard/widgets/DetailsButton.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/utils.js [app-client] (ecmascript)");
'use client';
;
;
;
;
;
;
const DETAIL_COLUMNS = [
    {
        key: 'date',
        label: 'Date',
        format: (v)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatDate"])(v) || '—'
    },
    {
        key: 'teacher',
        label: 'Teacher'
    },
    {
        key: 'studio',
        label: 'Studio'
    },
    {
        key: 'title',
        label: 'Lesson'
    },
    {
        key: 'status',
        label: 'Status'
    }
];
function InstructorUtilizationWidget({ lessons, rangeDays, onRangeChange }) {
    const all = lessons?.instructorUtilization || [];
    // A capacity of 0 is as unusable as none: utilization is undefined (the
    // backend sends null), so those teachers belong with the "not set" group
    // rather than in the bar list as "null%".
    const configured = all.filter((t)=>t.weeklyCapacity > 0);
    const unconfigured = all.filter((t)=>!(t.weeklyCapacity > 0));
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dashboard$2f$widgets$2f$shared$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Card"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$owner$2d$dashboard$2f$widgets$2f$WidgetHeader$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                title: "Instructor Utilization",
                rangeDays: rangeDays,
                onRangeChange: onRangeChange,
                right: unconfigured.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: "text-[11px] text-muted-foreground",
                    children: [
                        unconfigured.length,
                        " without capacity set"
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/owner-dashboard/widgets/InstructorUtilizationWidget.js",
                    lineNumber: 33,
                    columnNumber: 13
                }, this),
                detailsButton: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$owner$2d$dashboard$2f$widgets$2f$DetailsButton$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                    title: "Instructor Utilization — full details",
                    metric: "instructorUtilization",
                    rangeDays: rangeDays,
                    columns: DETAIL_COLUMNS
                }, void 0, false, {
                    fileName: "[project]/components/owner-dashboard/widgets/InstructorUtilizationWidget.js",
                    lineNumber: 37,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/owner-dashboard/widgets/InstructorUtilizationWidget.js",
                lineNumber: 27,
                columnNumber: 7
            }, this),
            configured.length > 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-4",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$owner$2d$dashboard$2f$widgets$2f$shared$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RankedBarList"], {
                    rows: configured.map((t)=>({
                            label: t.teacher,
                            sublabel: `${t.actualPerWeek}/${t.weeklyCapacity} per wk`,
                            value: t.utilizationPct
                        })),
                    valueFormatter: (v)=>`${v}%`
                }, void 0, false, {
                    fileName: "[project]/components/owner-dashboard/widgets/InstructorUtilizationWidget.js",
                    lineNumber: 47,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/owner-dashboard/widgets/InstructorUtilizationWidget.js",
                lineNumber: 46,
                columnNumber: 9
            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dashboard$2f$widgets$2f$shared$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["EmptyChart"], {
                message: "Set a weekly capacity on teachers in Settings > Teachers to see utilization."
            }, void 0, false, {
                fileName: "[project]/components/owner-dashboard/widgets/InstructorUtilizationWidget.js",
                lineNumber: 57,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/owner-dashboard/widgets/InstructorUtilizationWidget.js",
        lineNumber: 26,
        columnNumber: 5
    }, this);
}
_c = InstructorUtilizationWidget;
var _c;
__turbopack_context__.k.register(_c, "InstructorUtilizationWidget");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/owner-dashboard/widgets/LeadsByUploadTypeWidget.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>LeadsByUploadTypeWidget
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/api.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$dynamic$2d$list$2d$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/lib/dynamic-list-constants.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$dynamic$2d$list$2d$normalize$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/dynamic-list-normalize.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$lead$2d$filter$2d$fields$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/lead-filter-fields.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dashboard$2f$widgets$2f$shared$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/dashboard/widgets/shared.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$owner$2d$dashboard$2f$widgets$2f$shared$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/owner-dashboard/widgets/shared.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$owner$2d$dashboard$2f$widgets$2f$WidgetHeader$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/owner-dashboard/widgets/WidgetHeader.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$owner$2d$dashboard$2f$widgets$2f$LeadsDetailsButton$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/owner-dashboard/widgets/LeadsDetailsButton.js [app-client] (ecmascript)");
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
const DETAIL_COLUMNS = [
    {
        key: 'name',
        label: 'Name'
    },
    {
        key: 'email',
        label: 'Email'
    },
    {
        key: 'phoneNumber',
        label: 'Phone'
    },
    {
        key: 'uploadType',
        label: 'Source',
        format: (v)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$dynamic$2d$list$2d$normalize$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatFieldDisplayValue"])(v)
    },
    {
        key: 'stage',
        label: 'Stage',
        format: (v)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$dynamic$2d$list$2d$normalize$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatFieldDisplayValue"])(v)
    },
    {
        key: 'createdAt',
        label: 'Created',
        format: (v)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatDate"])(v) || '—'
    }
];
/** YYYY-MM-DD, matching the value shape the Leads page date filters send. */ function dateOnly(d) {
    return d.toISOString().slice(0, 10);
}
/**
 * Accepts either a number of days (relative range) or a { from, to } custom
 * date pair (YYYY-MM-DD) — same two shapes useAnalyticsOverview's rangeQuery()
 * handles, since `range` here comes from the same page-level date picker /
 * withOwnRange-style state. Passing the custom-range object straight into the
 * `days * ...` arithmetic below (as if it were always a number) produced NaN
 * -> an Invalid Date -> a thrown RangeError from toISOString().
 */ function rangeDates(range) {
    if (range && typeof range === 'object') {
        return {
            from: range.from,
            to: range.to
        };
    }
    const to = new Date();
    const from = new Date(to.getTime() - range * 24 * 60 * 60 * 1000);
    return {
        from: dateOnly(from),
        to: dateOnly(to)
    };
}
async function countLeadsByUploadType(uploadType, from, to) {
    // Reuse the same query-building path the Leads page uses (buildLeadQueryParams →
    // buildQueryParamsFromConditionFilters) so this sends the exact same request
    // shape — including createdFrom/createdTo as flat query params, which is what
    // the backend actually reads for date-range filtering (not the conditions blob).
    const params = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$lead$2d$filter$2d$fields$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["buildLeadQueryParams"])({
        page: 1,
        limit: 1,
        filters: {
            conditions: [
                {
                    field: 'uploadType',
                    operator: 'eq',
                    value: uploadType
                },
                {
                    field: 'createdFrom',
                    operator: 'eq',
                    value: from
                },
                {
                    field: 'createdTo',
                    operator: 'eq',
                    value: to
                }
            ],
            conditionLogic: 'AND'
        }
    });
    const res = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].get(`/api/lead?${params.toString()}`);
    const pagination = res.pagination ?? res.data?.pagination;
    const total = res.success ? pagination?.total ?? 0 : 0;
    return {
        uploadType,
        total
    };
}
function LeadsByUploadTypeWidget({ rangeDays = 30, onRangeChange }) {
    _s();
    const [rows, setRows] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "LeadsByUploadTypeWidget.useEffect": ()=>{
            let cancelled = false;
            setRows(null);
            const { from, to } = rangeDates(rangeDays);
            Promise.all(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$dynamic$2d$list$2d$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["UPLOAD_TYPE_OPTIONS"].map({
                "LeadsByUploadTypeWidget.useEffect": (type)=>countLeadsByUploadType(type, from, to)
            }["LeadsByUploadTypeWidget.useEffect"])).then({
                "LeadsByUploadTypeWidget.useEffect": (results)=>{
                    if (cancelled) return;
                    setRows(results.filter({
                        "LeadsByUploadTypeWidget.useEffect": (r)=>r.total > 0
                    }["LeadsByUploadTypeWidget.useEffect"]));
                }
            }["LeadsByUploadTypeWidget.useEffect"]);
            return ({
                "LeadsByUploadTypeWidget.useEffect": ()=>{
                    cancelled = true;
                }
            })["LeadsByUploadTypeWidget.useEffect"];
        }
    }["LeadsByUploadTypeWidget.useEffect"], [
        rangeDays
    ]);
    const loading = rows === null;
    const data = [
        ...rows || []
    ].sort((a, b)=>b.total - a.total);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dashboard$2f$widgets$2f$shared$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Card"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$owner$2d$dashboard$2f$widgets$2f$WidgetHeader$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                title: "Leads by Source",
                rangeDays: rangeDays,
                onRangeChange: onRangeChange,
                detailsButton: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$owner$2d$dashboard$2f$widgets$2f$LeadsDetailsButton$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                    rangeDays: rangeDays,
                    columns: DETAIL_COLUMNS
                }, void 0, false, {
                    fileName: "[project]/components/owner-dashboard/widgets/LeadsByUploadTypeWidget.js",
                    lineNumber: 103,
                    columnNumber: 24
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/owner-dashboard/widgets/LeadsByUploadTypeWidget.js",
                lineNumber: 99,
                columnNumber: 7
            }, this),
            loading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-4 h-32 animate-pulse rounded-xl bg-muted/40"
            }, void 0, false, {
                fileName: "[project]/components/owner-dashboard/widgets/LeadsByUploadTypeWidget.js",
                lineNumber: 106,
                columnNumber: 9
            }, this) : data.length > 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-4",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$owner$2d$dashboard$2f$widgets$2f$shared$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RankedBarList"], {
                    rows: data.map((r)=>({
                            label: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$dynamic$2d$list$2d$normalize$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatFieldDisplayValue"])(r.uploadType),
                            value: r.total
                        })),
                    valueFormatter: (v)=>v.toLocaleString()
                }, void 0, false, {
                    fileName: "[project]/components/owner-dashboard/widgets/LeadsByUploadTypeWidget.js",
                    lineNumber: 109,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/owner-dashboard/widgets/LeadsByUploadTypeWidget.js",
                lineNumber: 108,
                columnNumber: 9
            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dashboard$2f$widgets$2f$shared$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["EmptyChart"], {
                message: "No leads in this period."
            }, void 0, false, {
                fileName: "[project]/components/owner-dashboard/widgets/LeadsByUploadTypeWidget.js",
                lineNumber: 115,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/owner-dashboard/widgets/LeadsByUploadTypeWidget.js",
        lineNumber: 98,
        columnNumber: 5
    }, this);
}
_s(LeadsByUploadTypeWidget, "oUO4y1eHkE0Vf49q2Vm/qoo41YE=");
_c = LeadsByUploadTypeWidget;
var _c;
__turbopack_context__.k.register(_c, "LeadsByUploadTypeWidget");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/owner-dashboard/widgets/LeadsDetailsButton.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>LeadsDetailsButton
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$table$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Table2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/table-2.js [app-client] (ecmascript) <export default as Table2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$dashboardDetailsStore$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/dashboardDetailsStore.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
function LeadsDetailsButton({ rangeDays, columns }) {
    _s();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    function handleClick() {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$dashboardDetailsStore$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["setDashboardDetailsRequest"])({
            source: 'leads',
            title: 'Leads by Source — full details',
            rangeDays,
            columns,
            backHref: '/dashboard'
        });
        router.push('/dashboard/details');
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
        type: "button",
        onClick: handleClick,
        className: "flex items-center gap-1 rounded-lg border border-border px-2 py-1 text-[11px] font-medium text-muted-foreground transition-colors hover:bg-muted/60 hover:text-foreground",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$table$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Table2$3e$__["Table2"], {
                className: "h-3 w-3"
            }, void 0, false, {
                fileName: "[project]/components/owner-dashboard/widgets/LeadsDetailsButton.js",
                lineNumber: 34,
                columnNumber: 7
            }, this),
            "Details"
        ]
    }, void 0, true, {
        fileName: "[project]/components/owner-dashboard/widgets/LeadsDetailsButton.js",
        lineNumber: 29,
        columnNumber: 5
    }, this);
}
_s(LeadsDetailsButton, "fN7XvhJ+p5oE6+Xlo0NJmXpxjC8=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"]
    ];
});
_c = LeadsDetailsButton;
var _c;
__turbopack_context__.k.register(_c, "LeadsDetailsButton");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/owner-dashboard/widgets/LessonForecastWidget.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>LessonForecastWidget
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$chart$2f$BarChart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/chart/BarChart.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$Bar$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/cartesian/Bar.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$XAxis$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/cartesian/XAxis.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$YAxis$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/cartesian/YAxis.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$CartesianGrid$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/cartesian/CartesianGrid.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$Tooltip$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/component/Tooltip.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$ResponsiveContainer$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/component/ResponsiveContainer.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$charts$2f$barGradients$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/charts/barGradients.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$chartStyles$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/chartStyles.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dashboard$2f$widgets$2f$shared$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/dashboard/widgets/shared.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$owner$2d$dashboard$2f$widgets$2f$WidgetHeader$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/owner-dashboard/widgets/WidgetHeader.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$owner$2d$dashboard$2f$widgets$2f$DetailsButton$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/owner-dashboard/widgets/DetailsButton.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/utils.js [app-client] (ecmascript)");
'use client';
;
;
;
;
;
;
;
;
const DETAIL_COLUMNS = [
    {
        key: 'date',
        label: 'Date',
        format: (v)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatDate"])(v) || '—'
    },
    {
        key: 'studio',
        label: 'Studio'
    },
    {
        key: 'teacher',
        label: 'Teacher'
    },
    {
        key: 'title',
        label: 'Lesson'
    }
];
function LessonForecastWidget({ lessons, rangeDays, onRangeChange }) {
    const data = lessons?.forecastByStudio || [];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dashboard$2f$widgets$2f$shared$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Card"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$owner$2d$dashboard$2f$widgets$2f$WidgetHeader$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                title: "Scheduled Lessons Forecast",
                rangeDays: rangeDays,
                onRangeChange: onRangeChange,
                detailsButton: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$owner$2d$dashboard$2f$widgets$2f$DetailsButton$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                    title: "Scheduled Lessons Forecast — full details",
                    metric: "lessonForecast",
                    rangeDays: rangeDays,
                    columns: DETAIL_COLUMNS
                }, void 0, false, {
                    fileName: "[project]/components/owner-dashboard/widgets/LessonForecastWidget.js",
                    lineNumber: 28,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/owner-dashboard/widgets/LessonForecastWidget.js",
                lineNumber: 23,
                columnNumber: 7
            }, this),
            data.length > 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-4 h-[220px]",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$ResponsiveContainer$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ResponsiveContainer"], {
                    width: "100%",
                    height: "100%",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$chart$2f$BarChart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BarChart"], {
                        data: data,
                        margin: {
                            top: 8,
                            right: 8,
                            left: 0,
                            bottom: 0
                        },
                        children: [
                            __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$charts$2f$barGradients$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BAR_GRADIENT_DEFS"],
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$CartesianGrid$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CartesianGrid"], {
                                stroke: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$chartStyles$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["chartGridStroke"],
                                vertical: false
                            }, void 0, false, {
                                fileName: "[project]/components/owner-dashboard/widgets/LessonForecastWidget.js",
                                lineNumber: 41,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$XAxis$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["XAxis"], {
                                dataKey: "location",
                                tick: {
                                    fill: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$chartStyles$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["chartAxisStroke"],
                                    fontSize: 12
                                },
                                tickLine: false,
                                axisLine: false
                            }, void 0, false, {
                                fileName: "[project]/components/owner-dashboard/widgets/LessonForecastWidget.js",
                                lineNumber: 42,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$YAxis$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["YAxis"], {
                                tick: {
                                    fill: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$chartStyles$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["chartAxisStroke"],
                                    fontSize: 12
                                },
                                tickLine: false,
                                axisLine: false
                            }, void 0, false, {
                                fileName: "[project]/components/owner-dashboard/widgets/LessonForecastWidget.js",
                                lineNumber: 43,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$Tooltip$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Tooltip"], {
                                contentStyle: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$chartStyles$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["rechartsTooltipContentStyle"],
                                formatter: (v)=>[
                                        v,
                                        'Scheduled'
                                    ]
                            }, void 0, false, {
                                fileName: "[project]/components/owner-dashboard/widgets/LessonForecastWidget.js",
                                lineNumber: 44,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$Bar$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Bar"], {
                                dataKey: "scheduled",
                                name: "Scheduled",
                                radius: [
                                    8,
                                    8,
                                    0,
                                    0
                                ],
                                fill: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$charts$2f$barGradients$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BAR_FILL"]
                            }, void 0, false, {
                                fileName: "[project]/components/owner-dashboard/widgets/LessonForecastWidget.js",
                                lineNumber: 45,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/owner-dashboard/widgets/LessonForecastWidget.js",
                        lineNumber: 39,
                        columnNumber: 13
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/components/owner-dashboard/widgets/LessonForecastWidget.js",
                    lineNumber: 38,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/owner-dashboard/widgets/LessonForecastWidget.js",
                lineNumber: 37,
                columnNumber: 9
            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dashboard$2f$widgets$2f$shared$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["EmptyChart"], {
                message: "No upcoming lessons scheduled."
            }, void 0, false, {
                fileName: "[project]/components/owner-dashboard/widgets/LessonForecastWidget.js",
                lineNumber: 50,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/owner-dashboard/widgets/LessonForecastWidget.js",
        lineNumber: 22,
        columnNumber: 5
    }, this);
}
_c = LessonForecastWidget;
var _c;
__turbopack_context__.k.register(_c, "LessonForecastWidget");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/owner-dashboard/widgets/LessonTrendWidget.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>LessonTrendWidget
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$chart$2f$AreaChart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/chart/AreaChart.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$Area$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/cartesian/Area.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$XAxis$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/cartesian/XAxis.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$YAxis$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/cartesian/YAxis.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$CartesianGrid$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/cartesian/CartesianGrid.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$Tooltip$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/component/Tooltip.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$ResponsiveContainer$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/component/ResponsiveContainer.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$chartStyles$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/chartStyles.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dashboard$2f$widgets$2f$shared$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/dashboard/widgets/shared.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$owner$2d$dashboard$2f$widgets$2f$WidgetHeader$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/owner-dashboard/widgets/WidgetHeader.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$owner$2d$dashboard$2f$widgets$2f$DetailsButton$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/owner-dashboard/widgets/DetailsButton.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/utils.js [app-client] (ecmascript)");
'use client';
;
;
;
;
;
;
;
const DETAIL_COLUMNS = [
    {
        key: 'date',
        label: 'Date',
        format: (v)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatDate"])(v) || '—'
    },
    {
        key: 'studio',
        label: 'Studio'
    },
    {
        key: 'teacher',
        label: 'Teacher'
    },
    {
        key: 'title',
        label: 'Lesson'
    },
    {
        key: 'status',
        label: 'Status'
    }
];
function LessonTrendWidget({ lessons, rangeDays, onRangeChange }) {
    const data = lessons?.trend || [];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dashboard$2f$widgets$2f$shared$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Card"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$owner$2d$dashboard$2f$widgets$2f$WidgetHeader$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                title: "Lessons Trend",
                rangeDays: rangeDays,
                onRangeChange: onRangeChange,
                detailsButton: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$owner$2d$dashboard$2f$widgets$2f$DetailsButton$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                    title: "Lessons Trend — full details",
                    metric: "lessonTrend",
                    rangeDays: rangeDays,
                    columns: DETAIL_COLUMNS
                }, void 0, false, {
                    fileName: "[project]/components/owner-dashboard/widgets/LessonTrendWidget.js",
                    lineNumber: 28,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/owner-dashboard/widgets/LessonTrendWidget.js",
                lineNumber: 23,
                columnNumber: 7
            }, this),
            data.length > 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-4 h-[220px]",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$ResponsiveContainer$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ResponsiveContainer"], {
                    width: "100%",
                    height: "100%",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$chart$2f$AreaChart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AreaChart"], {
                        data: data,
                        margin: {
                            top: 8,
                            right: 8,
                            left: 0,
                            bottom: 0
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("defs", {
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("linearGradient", {
                                    id: "ownerLessonTrendGradient",
                                    x1: "0",
                                    y1: "0",
                                    x2: "0",
                                    y2: "1",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("stop", {
                                            offset: "0%",
                                            stopColor: "var(--studio-primary)",
                                            stopOpacity: 0.35
                                        }, void 0, false, {
                                            fileName: "[project]/components/owner-dashboard/widgets/LessonTrendWidget.js",
                                            lineNumber: 42,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("stop", {
                                            offset: "100%",
                                            stopColor: "var(--studio-primary)",
                                            stopOpacity: 0
                                        }, void 0, false, {
                                            fileName: "[project]/components/owner-dashboard/widgets/LessonTrendWidget.js",
                                            lineNumber: 43,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/owner-dashboard/widgets/LessonTrendWidget.js",
                                    lineNumber: 41,
                                    columnNumber: 17
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/components/owner-dashboard/widgets/LessonTrendWidget.js",
                                lineNumber: 40,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$CartesianGrid$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CartesianGrid"], {
                                stroke: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$chartStyles$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["chartGridStroke"],
                                vertical: false
                            }, void 0, false, {
                                fileName: "[project]/components/owner-dashboard/widgets/LessonTrendWidget.js",
                                lineNumber: 46,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$XAxis$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["XAxis"], {
                                dataKey: "week",
                                tick: {
                                    fill: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$chartStyles$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["chartAxisStroke"],
                                    fontSize: 12
                                },
                                tickLine: false,
                                axisLine: false
                            }, void 0, false, {
                                fileName: "[project]/components/owner-dashboard/widgets/LessonTrendWidget.js",
                                lineNumber: 47,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$YAxis$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["YAxis"], {
                                tick: {
                                    fill: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$chartStyles$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["chartAxisStroke"],
                                    fontSize: 12
                                },
                                tickLine: false,
                                axisLine: false
                            }, void 0, false, {
                                fileName: "[project]/components/owner-dashboard/widgets/LessonTrendWidget.js",
                                lineNumber: 48,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$Tooltip$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Tooltip"], {
                                contentStyle: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$chartStyles$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["rechartsTooltipContentStyle"],
                                formatter: (v)=>[
                                        v,
                                        'Lessons'
                                    ]
                            }, void 0, false, {
                                fileName: "[project]/components/owner-dashboard/widgets/LessonTrendWidget.js",
                                lineNumber: 49,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$Area$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Area"], {
                                type: "monotone",
                                dataKey: "count",
                                name: "Lessons",
                                stroke: "var(--studio-primary)",
                                strokeWidth: 2,
                                fill: "url(#ownerLessonTrendGradient)"
                            }, void 0, false, {
                                fileName: "[project]/components/owner-dashboard/widgets/LessonTrendWidget.js",
                                lineNumber: 50,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/owner-dashboard/widgets/LessonTrendWidget.js",
                        lineNumber: 39,
                        columnNumber: 13
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/components/owner-dashboard/widgets/LessonTrendWidget.js",
                    lineNumber: 38,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/owner-dashboard/widgets/LessonTrendWidget.js",
                lineNumber: 37,
                columnNumber: 9
            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dashboard$2f$widgets$2f$shared$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["EmptyChart"], {
                message: "No completed lessons in this period."
            }, void 0, false, {
                fileName: "[project]/components/owner-dashboard/widgets/LessonTrendWidget.js",
                lineNumber: 62,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/owner-dashboard/widgets/LessonTrendWidget.js",
        lineNumber: 22,
        columnNumber: 5
    }, this);
}
_c = LessonTrendWidget;
var _c;
__turbopack_context__.k.register(_c, "LessonTrendWidget");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/owner-dashboard/widgets/LessonsByCurriculumWidget.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>LessonsByCurriculumWidget
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dashboard$2f$widgets$2f$shared$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/dashboard/widgets/shared.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$owner$2d$dashboard$2f$widgets$2f$shared$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/owner-dashboard/widgets/shared.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$owner$2d$dashboard$2f$widgets$2f$WidgetHeader$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/owner-dashboard/widgets/WidgetHeader.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$owner$2d$dashboard$2f$widgets$2f$DetailsButton$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/owner-dashboard/widgets/DetailsButton.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/utils.js [app-client] (ecmascript)");
'use client';
;
;
;
;
;
;
const DETAIL_COLUMNS = [
    {
        key: 'date',
        label: 'Date',
        format: (v)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatDate"])(v) || '—'
    },
    {
        key: 'studio',
        label: 'Studio'
    },
    {
        key: 'teacher',
        label: 'Teacher'
    },
    {
        key: 'tier',
        label: 'Curriculum Tier'
    },
    {
        key: 'title',
        label: 'Lesson'
    }
];
function LessonsByCurriculumWidget({ lessons, rangeDays, onRangeChange }) {
    const tiers = lessons?.byCurriculum || [];
    const data = tiers.filter((r)=>r.count > 0);
    const emptyMessage = tiers.length === 0 ? 'No curriculum tiers set up yet. Tag packages with a curriculum in Settings to see tier activity.' : 'No lessons taught under a curriculum-tagged package in this period.';
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dashboard$2f$widgets$2f$shared$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Card"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$owner$2d$dashboard$2f$widgets$2f$WidgetHeader$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                title: "Lessons by Curriculum Tier",
                rangeDays: rangeDays,
                onRangeChange: onRangeChange,
                detailsButton: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$owner$2d$dashboard$2f$widgets$2f$DetailsButton$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                    title: "Lessons by Curriculum Tier — full details",
                    metric: "lessonsByCurriculum",
                    rangeDays: rangeDays,
                    columns: DETAIL_COLUMNS
                }, void 0, false, {
                    fileName: "[project]/components/owner-dashboard/widgets/LessonsByCurriculumWidget.js",
                    lineNumber: 31,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/owner-dashboard/widgets/LessonsByCurriculumWidget.js",
                lineNumber: 26,
                columnNumber: 7
            }, this),
            data.length > 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-4",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$owner$2d$dashboard$2f$widgets$2f$shared$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RankedBarList"], {
                    rows: data.map((r)=>({
                            label: r.tier,
                            value: r.count
                        })),
                    highlightFirst: false
                }, void 0, false, {
                    fileName: "[project]/components/owner-dashboard/widgets/LessonsByCurriculumWidget.js",
                    lineNumber: 41,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/owner-dashboard/widgets/LessonsByCurriculumWidget.js",
                lineNumber: 40,
                columnNumber: 9
            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dashboard$2f$widgets$2f$shared$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["EmptyChart"], {
                message: emptyMessage
            }, void 0, false, {
                fileName: "[project]/components/owner-dashboard/widgets/LessonsByCurriculumWidget.js",
                lineNumber: 47,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/owner-dashboard/widgets/LessonsByCurriculumWidget.js",
        lineNumber: 25,
        columnNumber: 5
    }, this);
}
_c = LessonsByCurriculumWidget;
var _c;
__turbopack_context__.k.register(_c, "LessonsByCurriculumWidget");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/owner-dashboard/widgets/LessonsByStudioWidget.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>LessonsByStudioWidget
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dashboard$2f$widgets$2f$shared$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/dashboard/widgets/shared.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$owner$2d$dashboard$2f$widgets$2f$shared$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/owner-dashboard/widgets/shared.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$owner$2d$dashboard$2f$widgets$2f$WidgetHeader$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/owner-dashboard/widgets/WidgetHeader.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$owner$2d$dashboard$2f$widgets$2f$DetailsButton$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/owner-dashboard/widgets/DetailsButton.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/utils.js [app-client] (ecmascript)");
'use client';
;
;
;
;
;
;
const DETAIL_COLUMNS = [
    {
        key: 'date',
        label: 'Date',
        format: (v)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatDate"])(v) || '—'
    },
    {
        key: 'studio',
        label: 'Studio'
    },
    {
        key: 'teacher',
        label: 'Teacher'
    },
    {
        key: 'title',
        label: 'Lesson'
    },
    {
        key: 'status',
        label: 'Status'
    }
];
function LessonsByStudioWidget({ lessons, rangeDays, onRangeChange }) {
    const data = [
        ...lessons?.byStudio || []
    ].sort((a, b)=>b.count - a.count);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dashboard$2f$widgets$2f$shared$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Card"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$owner$2d$dashboard$2f$widgets$2f$WidgetHeader$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                title: "Lessons Taught by Studio",
                rangeDays: rangeDays,
                onRangeChange: onRangeChange,
                detailsButton: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$owner$2d$dashboard$2f$widgets$2f$DetailsButton$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                    title: "Lessons by Studio — full details",
                    metric: "lessonsByStudio",
                    rangeDays: rangeDays,
                    columns: DETAIL_COLUMNS
                }, void 0, false, {
                    fileName: "[project]/components/owner-dashboard/widgets/LessonsByStudioWidget.js",
                    lineNumber: 27,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/owner-dashboard/widgets/LessonsByStudioWidget.js",
                lineNumber: 22,
                columnNumber: 7
            }, this),
            data.length > 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-4",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$owner$2d$dashboard$2f$widgets$2f$shared$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RankedBarList"], {
                    rows: data.map((r)=>({
                            label: r.location,
                            value: r.count
                        }))
                }, void 0, false, {
                    fileName: "[project]/components/owner-dashboard/widgets/LessonsByStudioWidget.js",
                    lineNumber: 37,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/owner-dashboard/widgets/LessonsByStudioWidget.js",
                lineNumber: 36,
                columnNumber: 9
            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dashboard$2f$widgets$2f$shared$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["EmptyChart"], {
                message: "No completed lessons in this period."
            }, void 0, false, {
                fileName: "[project]/components/owner-dashboard/widgets/LessonsByStudioWidget.js",
                lineNumber: 40,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/owner-dashboard/widgets/LessonsByStudioWidget.js",
        lineNumber: 21,
        columnNumber: 5
    }, this);
}
_c = LessonsByStudioWidget;
var _c;
__turbopack_context__.k.register(_c, "LessonsByStudioWidget");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/owner-dashboard/widgets/LessonsByTeacherWidget.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>LessonsByTeacherWidget
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dashboard$2f$widgets$2f$shared$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/dashboard/widgets/shared.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$table$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/table.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$owner$2d$dashboard$2f$widgets$2f$WidgetHeader$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/owner-dashboard/widgets/WidgetHeader.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$owner$2d$dashboard$2f$widgets$2f$DetailsButton$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/owner-dashboard/widgets/DetailsButton.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/utils.js [app-client] (ecmascript)");
'use client';
;
;
;
;
;
;
const DETAIL_COLUMNS = [
    {
        key: 'date',
        label: 'Date',
        format: (v)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatDate"])(v) || '—'
    },
    {
        key: 'teacher',
        label: 'Teacher'
    },
    {
        key: 'studio',
        label: 'Studio'
    },
    {
        key: 'title',
        label: 'Lesson'
    },
    {
        key: 'status',
        label: 'Status'
    }
];
function LessonsByTeacherWidget({ lessons, rangeDays, onRangeChange }) {
    const data = [
        ...lessons?.byTeacher || []
    ].sort((a, b)=>b.count - a.count).slice(0, 10);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dashboard$2f$widgets$2f$shared$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Card"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$owner$2d$dashboard$2f$widgets$2f$WidgetHeader$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                title: "Lessons Taught by Teacher",
                rangeDays: rangeDays,
                onRangeChange: onRangeChange,
                detailsButton: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$owner$2d$dashboard$2f$widgets$2f$DetailsButton$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                    title: "Lessons by Teacher — full details",
                    metric: "lessonsByTeacher",
                    rangeDays: rangeDays,
                    columns: DETAIL_COLUMNS
                }, void 0, false, {
                    fileName: "[project]/components/owner-dashboard/widgets/LessonsByTeacherWidget.js",
                    lineNumber: 27,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/owner-dashboard/widgets/LessonsByTeacherWidget.js",
                lineNumber: 22,
                columnNumber: 7
            }, this),
            data.length > 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-3",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$table$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Table"], {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$table$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TableHeader"], {
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$table$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TableRow"], {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$table$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TableHead"], {
                                        className: "h-9 px-2 text-[11px]",
                                        children: "Teacher"
                                    }, void 0, false, {
                                        fileName: "[project]/components/owner-dashboard/widgets/LessonsByTeacherWidget.js",
                                        lineNumber: 40,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$table$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TableHead"], {
                                        className: "h-9 px-2 text-right text-[11px]",
                                        children: "Lessons Taught"
                                    }, void 0, false, {
                                        fileName: "[project]/components/owner-dashboard/widgets/LessonsByTeacherWidget.js",
                                        lineNumber: 41,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/owner-dashboard/widgets/LessonsByTeacherWidget.js",
                                lineNumber: 39,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/components/owner-dashboard/widgets/LessonsByTeacherWidget.js",
                            lineNumber: 38,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$table$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TableBody"], {
                            children: data.map((r, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$table$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TableRow"], {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$table$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TableCell"], {
                                            className: `px-2 py-2 text-[13px] font-semibold ${i === 0 ? 'text-[var(--studio-primary)]' : 'text-foreground'}`,
                                            children: r.teacher
                                        }, void 0, false, {
                                            fileName: "[project]/components/owner-dashboard/widgets/LessonsByTeacherWidget.js",
                                            lineNumber: 47,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$table$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TableCell"], {
                                            className: "px-2 py-2 text-right text-[13px] tabular-nums text-foreground",
                                            children: r.count.toLocaleString()
                                        }, void 0, false, {
                                            fileName: "[project]/components/owner-dashboard/widgets/LessonsByTeacherWidget.js",
                                            lineNumber: 50,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, `${r.teacher}-${i}`, true, {
                                    fileName: "[project]/components/owner-dashboard/widgets/LessonsByTeacherWidget.js",
                                    lineNumber: 46,
                                    columnNumber: 17
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/components/owner-dashboard/widgets/LessonsByTeacherWidget.js",
                            lineNumber: 44,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/owner-dashboard/widgets/LessonsByTeacherWidget.js",
                    lineNumber: 37,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/owner-dashboard/widgets/LessonsByTeacherWidget.js",
                lineNumber: 36,
                columnNumber: 9
            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dashboard$2f$widgets$2f$shared$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["EmptyChart"], {
                message: "No completed lessons in this period."
            }, void 0, false, {
                fileName: "[project]/components/owner-dashboard/widgets/LessonsByTeacherWidget.js",
                lineNumber: 59,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/owner-dashboard/widgets/LessonsByTeacherWidget.js",
        lineNumber: 21,
        columnNumber: 5
    }, this);
}
_c = LessonsByTeacherWidget;
var _c;
__turbopack_context__.k.register(_c, "LessonsByTeacherWidget");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/owner-dashboard/widgets/MembershipRevenueWidget.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>MembershipRevenueWidget
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dashboard$2f$widgets$2f$DonutChart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/dashboard/widgets/DonutChart.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dashboard$2f$widgets$2f$shared$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/dashboard/widgets/shared.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$owner$2d$dashboard$2f$widgets$2f$WidgetHeader$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/owner-dashboard/widgets/WidgetHeader.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$owner$2d$dashboard$2f$widgets$2f$DetailsButton$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/owner-dashboard/widgets/DetailsButton.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/utils.js [app-client] (ecmascript)");
'use client';
;
;
;
;
;
;
function formatMoney(n) {
    const num = Number(n) || 0;
    if (Math.abs(num) >= 1000000) return `$${(num / 1000000).toFixed(1)}M`;
    if (Math.abs(num) >= 10000) return `$${(num / 1000).toFixed(1)}k`;
    return `$${num.toLocaleString(undefined, {
        maximumFractionDigits: 0
    })}`;
}
const DETAIL_COLUMNS = [
    {
        key: 'date',
        label: 'Date',
        format: (v)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatDate"])(v) || '—'
    },
    {
        key: 'customer',
        label: 'Customer'
    },
    {
        key: 'studio',
        label: 'Studio'
    },
    {
        key: 'membership',
        label: 'Membership'
    },
    {
        key: 'method',
        label: 'Method'
    },
    {
        key: 'amount',
        label: 'Amount',
        format: (v)=>formatMoney(v)
    }
];
function MembershipRevenueWidget({ revenue, rangeDays, onRangeChange }) {
    const rows = revenue?.membershipByType || [];
    const data = rows.map((r)=>({
            name: r.membershipName,
            value: r.revenue
        }));
    const total = data.reduce((s, d)=>s + d.value, 0);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dashboard$2f$widgets$2f$shared$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Card"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$owner$2d$dashboard$2f$widgets$2f$WidgetHeader$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                title: "Membership Revenue by Type",
                rangeDays: rangeDays,
                onRangeChange: onRangeChange,
                detailsButton: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$owner$2d$dashboard$2f$widgets$2f$DetailsButton$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                    title: "Membership Revenue — full details",
                    metric: "membershipRevenue",
                    rangeDays: rangeDays,
                    columns: DETAIL_COLUMNS
                }, void 0, false, {
                    fileName: "[project]/components/owner-dashboard/widgets/MembershipRevenueWidget.js",
                    lineNumber: 37,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/owner-dashboard/widgets/MembershipRevenueWidget.js",
                lineNumber: 32,
                columnNumber: 7
            }, this),
            data.length > 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dashboard$2f$widgets$2f$DonutChart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                data: data,
                centerLabel: "Total",
                centerValue: formatMoney(total),
                height: 210,
                valueFormatter: (v)=>formatMoney(v)
            }, void 0, false, {
                fileName: "[project]/components/owner-dashboard/widgets/MembershipRevenueWidget.js",
                lineNumber: 46,
                columnNumber: 9
            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dashboard$2f$widgets$2f$shared$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["EmptyChart"], {
                message: "No membership revenue in this period."
            }, void 0, false, {
                fileName: "[project]/components/owner-dashboard/widgets/MembershipRevenueWidget.js",
                lineNumber: 54,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/owner-dashboard/widgets/MembershipRevenueWidget.js",
        lineNumber: 31,
        columnNumber: 5
    }, this);
}
_c = MembershipRevenueWidget;
var _c;
__turbopack_context__.k.register(_c, "MembershipRevenueWidget");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/owner-dashboard/widgets/OperatingExceptionsWidget.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>OperatingExceptionsWidget
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$triangle$2d$alert$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertTriangle$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/triangle-alert.js [app-client] (ecmascript) <export default as AlertTriangle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dashboard$2f$widgets$2f$shared$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/dashboard/widgets/shared.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$owner$2d$dashboard$2f$widgets$2f$RangeDropdown$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/owner-dashboard/widgets/RangeDropdown.js [app-client] (ecmascript)");
'use client';
;
;
;
;
/**
 * Operating Exceptions — booking risk, capacity ceilings and goal shortfalls,
 * each checked against a fixed threshold on the owner-overview endpoint.
 * Ported from the sectioned dashboard's ActionsSection into the widget-grid
 * design. `exceptions` is spread in by withOwnRange from the owner-overview
 * payload (`exceptions.rows`).
 */ const SEVERITY_TONE = {
    red: 'bg-destructive',
    amber: 'bg-warning'
};
function ExceptionRow({ row }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex items-start gap-2.5 border-b border-border/60 py-3 last:border-b-0",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: `mt-1.5 h-2 w-2 shrink-0 rounded-full ${SEVERITY_TONE[row.severity] || 'bg-muted-foreground'}`
            }, void 0, false, {
                fileName: "[project]/components/owner-dashboard/widgets/OperatingExceptionsWidget.js",
                lineNumber: 22,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "min-w-0",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-[11px] font-bold uppercase tracking-[0.12em] text-muted-foreground",
                        children: row.category
                    }, void 0, false, {
                        fileName: "[project]/components/owner-dashboard/widgets/OperatingExceptionsWidget.js",
                        lineNumber: 24,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "mt-0.5 text-[13px] leading-relaxed text-foreground",
                        children: row.message
                    }, void 0, false, {
                        fileName: "[project]/components/owner-dashboard/widgets/OperatingExceptionsWidget.js",
                        lineNumber: 25,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/owner-dashboard/widgets/OperatingExceptionsWidget.js",
                lineNumber: 23,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/owner-dashboard/widgets/OperatingExceptionsWidget.js",
        lineNumber: 21,
        columnNumber: 5
    }, this);
}
_c = ExceptionRow;
function OperatingExceptionsWidget({ exceptions, rangeDays, onRangeChange }) {
    const rows = exceptions?.rows || [];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        className: "flex h-full flex-col gap-3",
        children: [
            onRangeChange && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center justify-end",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$owner$2d$dashboard$2f$widgets$2f$RangeDropdown$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                    value: rangeDays,
                    onChange: onRangeChange
                }, void 0, false, {
                    fileName: "[project]/components/owner-dashboard/widgets/OperatingExceptionsWidget.js",
                    lineNumber: 38,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/owner-dashboard/widgets/OperatingExceptionsWidget.js",
                lineNumber: 37,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dashboard$2f$widgets$2f$shared$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Card"], {
                className: "flex-1",
                children: [
                    rows.length ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: rows.map((row, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ExceptionRow, {
                                row: row
                            }, `${row.category}-${row.studio}-${i}`, false, {
                                fileName: "[project]/components/owner-dashboard/widgets/OperatingExceptionsWidget.js",
                                lineNumber: 45,
                                columnNumber: 15
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/components/owner-dashboard/widgets/OperatingExceptionsWidget.js",
                        lineNumber: 43,
                        columnNumber: 11
                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex h-[180px] flex-col items-center justify-center gap-2 px-4 text-center",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$triangle$2d$alert$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertTriangle$3e$__["AlertTriangle"], {
                                className: "h-7 w-7 text-muted-foreground/35",
                                "aria-hidden": true
                            }, void 0, false, {
                                fileName: "[project]/components/owner-dashboard/widgets/OperatingExceptionsWidget.js",
                                lineNumber: 50,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-sm text-muted-foreground",
                                children: "No exceptions — every studio and instructor is within threshold."
                            }, void 0, false, {
                                fileName: "[project]/components/owner-dashboard/widgets/OperatingExceptionsWidget.js",
                                lineNumber: 51,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/owner-dashboard/widgets/OperatingExceptionsWidget.js",
                        lineNumber: 49,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "mt-3 border-t border-border/60 pt-3 text-[11px] leading-relaxed text-muted-foreground",
                        children: "Booking risk, capacity ceilings and goal shortfalls, each checked against a fixed threshold — not yet configurable per organisation."
                    }, void 0, false, {
                        fileName: "[project]/components/owner-dashboard/widgets/OperatingExceptionsWidget.js",
                        lineNumber: 56,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/owner-dashboard/widgets/OperatingExceptionsWidget.js",
                lineNumber: 41,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/owner-dashboard/widgets/OperatingExceptionsWidget.js",
        lineNumber: 35,
        columnNumber: 5
    }, this);
}
_c1 = OperatingExceptionsWidget;
var _c, _c1;
__turbopack_context__.k.register(_c, "ExceptionRow");
__turbopack_context__.k.register(_c1, "OperatingExceptionsWidget");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/owner-dashboard/widgets/OutstandingBalancesWidget.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>OutstandingBalancesWidget
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dashboard$2f$widgets$2f$shared$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/dashboard/widgets/shared.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$owner$2d$dashboard$2f$widgets$2f$shared$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/owner-dashboard/widgets/shared.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$owner$2d$dashboard$2f$widgets$2f$WidgetHeader$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/owner-dashboard/widgets/WidgetHeader.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$owner$2d$dashboard$2f$widgets$2f$DetailsButton$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/owner-dashboard/widgets/DetailsButton.js [app-client] (ecmascript)");
'use client';
;
;
;
;
;
function formatMoney(n) {
    const num = Number(n) || 0;
    if (Math.abs(num) >= 1000000) return `$${(num / 1000000).toFixed(1)}M`;
    if (Math.abs(num) >= 10000) return `$${(num / 1000).toFixed(1)}k`;
    return `$${num.toLocaleString(undefined, {
        maximumFractionDigits: 0
    })}`;
}
const DETAIL_COLUMNS = [
    {
        key: 'customer',
        label: 'Customer'
    },
    {
        key: 'studio',
        label: 'Studio'
    },
    {
        key: 'source',
        label: 'Source'
    },
    {
        key: 'name',
        label: 'Package / Membership'
    },
    {
        key: 'dueAmount',
        label: 'Due',
        format: (v)=>formatMoney(v)
    }
];
function OutstandingBalancesWidget({ revenue, rangeDays, onRangeChange }) {
    const data = [
        ...revenue?.outstandingBalances || []
    ].sort((a, b)=>b.outstanding - a.outstanding);
    const total = revenue?.totalOutstanding || 0;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dashboard$2f$widgets$2f$shared$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Card"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$owner$2d$dashboard$2f$widgets$2f$WidgetHeader$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                title: "Outstanding Balances",
                rangeDays: rangeDays,
                onRangeChange: onRangeChange,
                right: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: "text-[18px] font-bold leading-none tabular-nums text-[var(--studio-primary)]",
                    children: formatMoney(total)
                }, void 0, false, {
                    fileName: "[project]/components/owner-dashboard/widgets/OutstandingBalancesWidget.js",
                    lineNumber: 34,
                    columnNumber: 11
                }, this),
                detailsButton: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$owner$2d$dashboard$2f$widgets$2f$DetailsButton$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                    title: "Outstanding Balances — full details",
                    metric: "outstandingBalances",
                    rangeDays: rangeDays,
                    columns: DETAIL_COLUMNS
                }, void 0, false, {
                    fileName: "[project]/components/owner-dashboard/widgets/OutstandingBalancesWidget.js",
                    lineNumber: 39,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/owner-dashboard/widgets/OutstandingBalancesWidget.js",
                lineNumber: 29,
                columnNumber: 7
            }, this),
            data.length > 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-4",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$owner$2d$dashboard$2f$widgets$2f$shared$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RankedBarList"], {
                    rows: data.map((r)=>({
                            label: r.location,
                            value: r.outstanding
                        })),
                    valueFormatter: formatMoney
                }, void 0, false, {
                    fileName: "[project]/components/owner-dashboard/widgets/OutstandingBalancesWidget.js",
                    lineNumber: 49,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/owner-dashboard/widgets/OutstandingBalancesWidget.js",
                lineNumber: 48,
                columnNumber: 9
            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dashboard$2f$widgets$2f$shared$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["EmptyChart"], {
                message: "No outstanding balances."
            }, void 0, false, {
                fileName: "[project]/components/owner-dashboard/widgets/OutstandingBalancesWidget.js",
                lineNumber: 52,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/owner-dashboard/widgets/OutstandingBalancesWidget.js",
        lineNumber: 28,
        columnNumber: 5
    }, this);
}
_c = OutstandingBalancesWidget;
var _c;
__turbopack_context__.k.register(_c, "OutstandingBalancesWidget");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/owner-dashboard/widgets/PurchaseJourneyWidget.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>PurchaseJourneyWidget
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dashboard$2f$widgets$2f$shared$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/dashboard/widgets/shared.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$owner$2d$dashboard$2f$widgets$2f$shared$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/owner-dashboard/widgets/shared.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$owner$2d$dashboard$2f$widgets$2f$WidgetHeader$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/owner-dashboard/widgets/WidgetHeader.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$owner$2d$dashboard$2f$widgets$2f$DetailsButton$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/owner-dashboard/widgets/DetailsButton.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$owner$2d$dashboard$2f$widgets$2f$FunnelDrilldownTable$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/owner-dashboard/widgets/FunnelDrilldownTable.js [app-client] (ecmascript)");
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
const DETAIL_COLUMNS = [
    {
        key: 'name',
        label: 'Customer'
    },
    {
        key: 'email',
        label: 'Email'
    },
    {
        key: 'phoneNumber',
        label: 'Phone'
    },
    {
        key: 'studio',
        label: 'Studio'
    },
    {
        key: 'purchaseCount',
        label: 'Purchases'
    },
    {
        key: 'totalLtv',
        label: 'Total LTV',
        format: (v)=>`$${Number(v || 0).toLocaleString()}`
    },
    {
        key: 'lastPurchase',
        label: 'Last Purchase',
        format: (v)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatDate"])(v) || '—'
    }
];
function formatMoney(n) {
    const num = Number(n) || 0;
    if (Math.abs(num) >= 1000000) return `$${(num / 1000000).toFixed(1)}M`;
    if (Math.abs(num) >= 10000) return `$${(num / 1000).toFixed(1)}k`;
    return `$${num.toLocaleString(undefined, {
        maximumFractionDigits: 0
    })}`;
}
function PurchaseJourneyWidget({ funnel, rangeDays, onRangeChange }) {
    _s();
    const [activeStage, setActiveStage] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const stages = funnel?.report3?.purchaseJourney || [];
    const topCount = stages[0]?.count || 1;
    const toggle = (i)=>setActiveStage((cur)=>cur === i ? null : i);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dashboard$2f$widgets$2f$shared$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Card"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$owner$2d$dashboard$2f$widgets$2f$WidgetHeader$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                title: "Purchase Journey",
                // Lifetime view — every purchase a customer has ever made — so there is
                // deliberately no date-range dropdown to imply otherwise.
                right: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: "text-[11px] text-muted-foreground",
                    children: "All time"
                }, void 0, false, {
                    fileName: "[project]/components/owner-dashboard/widgets/PurchaseJourneyWidget.js",
                    lineNumber: 42,
                    columnNumber: 16
                }, this),
                detailsButton: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$owner$2d$dashboard$2f$widgets$2f$DetailsButton$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                    title: "Purchase Journey — full details",
                    metric: "purchaseJourney",
                    rangeDays: rangeDays,
                    columns: DETAIL_COLUMNS
                }, void 0, false, {
                    fileName: "[project]/components/owner-dashboard/widgets/PurchaseJourneyWidget.js",
                    lineNumber: 44,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/owner-dashboard/widgets/PurchaseJourneyWidget.js",
                lineNumber: 38,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "mt-1 text-[11px] text-muted-foreground",
                children: "Report 3 — how far customers get through repeat purchases, and what each one is worth. Click a card for the underlying customers."
            }, void 0, false, {
                fileName: "[project]/components/owner-dashboard/widgets/PurchaseJourneyWidget.js",
                lineNumber: 52,
                columnNumber: 7
            }, this),
            stages.length > 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-4 flex items-stretch gap-2 overflow-x-auto pb-1",
                        children: stages.map((s, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex flex-1 items-stretch gap-2",
                                children: [
                                    i > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$owner$2d$dashboard$2f$widgets$2f$shared$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FunnelConnector"], {
                                        ratePct: stages[i - 1].count ? Math.round(s.count / stages[i - 1].count * 100) : 0,
                                        caption: s.avgDaysSincePrevious !== null ? `avg ${s.avgDaysSincePrevious}d later` : undefined
                                    }, void 0, false, {
                                        fileName: "[project]/components/owner-dashboard/widgets/PurchaseJourneyWidget.js",
                                        lineNumber: 62,
                                        columnNumber: 19
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$owner$2d$dashboard$2f$widgets$2f$shared$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FunnelStage"], {
                                        label: s.label,
                                        value: s.count.toLocaleString(),
                                        barPct: Math.round(s.count / topCount * 100),
                                        highlight: activeStage === null && i === 0,
                                        onClick: ()=>toggle(i),
                                        active: activeStage === i,
                                        metrics: [
                                            {
                                                label: 'Avg sale',
                                                value: formatMoney(s.avgSaleValue)
                                            },
                                            {
                                                label: 'Avg LTV',
                                                value: formatMoney(s.avgLtv)
                                            }
                                        ]
                                    }, void 0, false, {
                                        fileName: "[project]/components/owner-dashboard/widgets/PurchaseJourneyWidget.js",
                                        lineNumber: 67,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, s.label, true, {
                                fileName: "[project]/components/owner-dashboard/widgets/PurchaseJourneyWidget.js",
                                lineNumber: 60,
                                columnNumber: 15
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/components/owner-dashboard/widgets/PurchaseJourneyWidget.js",
                        lineNumber: 58,
                        columnNumber: 11
                    }, this),
                    activeStage !== null && stages[activeStage] && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$owner$2d$dashboard$2f$widgets$2f$FunnelDrilldownTable$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        title: `${stages[activeStage].label} — customers with ${activeStage + 1}+ purchases`,
                        metric: "purchaseJourney",
                        rangeDays: rangeDays,
                        columns: DETAIL_COLUMNS,
                        filterFn: (r)=>(Number(r.purchaseCount) || 0) >= activeStage + 1,
                        onClose: ()=>setActiveStage(null)
                    }, void 0, false, {
                        fileName: "[project]/components/owner-dashboard/widgets/PurchaseJourneyWidget.js",
                        lineNumber: 84,
                        columnNumber: 13
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/owner-dashboard/widgets/PurchaseJourneyWidget.js",
                lineNumber: 57,
                columnNumber: 9
            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dashboard$2f$widgets$2f$shared$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["EmptyChart"], {
                message: "No purchases in this period."
            }, void 0, false, {
                fileName: "[project]/components/owner-dashboard/widgets/PurchaseJourneyWidget.js",
                lineNumber: 95,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/owner-dashboard/widgets/PurchaseJourneyWidget.js",
        lineNumber: 37,
        columnNumber: 5
    }, this);
}
_s(PurchaseJourneyWidget, "DcVPctOnfjREoOXmjGZA++eAooM=");
_c = PurchaseJourneyWidget;
var _c;
__turbopack_context__.k.register(_c, "PurchaseJourneyWidget");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/owner-dashboard/widgets/RangeDropdown.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>RangeDropdown
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDown$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/chevron-down.js [app-client] (ecmascript) <export default as ChevronDown>");
'use client';
;
;
const OPTIONS = [
    // 0 is the studio's current day so far. Without this option the select could not
    // represent a "Today" page range and fell back to showing "Last 7 days".
    {
        label: 'Today',
        days: 0
    },
    {
        label: 'Last 7 days',
        days: 7
    },
    {
        label: 'Last 30 days',
        days: 30
    },
    {
        label: 'Last 90 days',
        days: 90
    },
    {
        label: 'Last 12 months',
        days: 365
    }
];
function isCustomRange(value) {
    return Boolean(value && typeof value === 'object' && value.from && value.to);
}
function RangeDropdown({ value, onChange }) {
    const custom = isCustomRange(value);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "relative",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                value: custom ? 'custom' : value,
                onChange: (e)=>onChange(Number(e.target.value)),
                className: "h-7 appearance-none rounded-md border border-border bg-background py-0 pl-2.5 pr-6 text-[12px] font-medium text-foreground focus:outline-none focus:ring-1 focus:ring-ring",
                children: [
                    custom && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                        value: "custom",
                        disabled: true,
                        children: [
                            value.from,
                            " → ",
                            value.to
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/owner-dashboard/widgets/RangeDropdown.js",
                        lineNumber: 37,
                        columnNumber: 11
                    }, this),
                    OPTIONS.map((opt)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                            value: opt.days,
                            children: opt.label
                        }, opt.days, false, {
                            fileName: "[project]/components/owner-dashboard/widgets/RangeDropdown.js",
                            lineNumber: 42,
                            columnNumber: 11
                        }, this))
                ]
            }, void 0, true, {
                fileName: "[project]/components/owner-dashboard/widgets/RangeDropdown.js",
                lineNumber: 31,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDown$3e$__["ChevronDown"], {
                className: "pointer-events-none absolute right-1.5 top-1/2 h-3 w-3 -translate-y-1/2 text-muted-foreground"
            }, void 0, false, {
                fileName: "[project]/components/owner-dashboard/widgets/RangeDropdown.js",
                lineNumber: 47,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/owner-dashboard/widgets/RangeDropdown.js",
        lineNumber: 30,
        columnNumber: 5
    }, this);
}
_c = RangeDropdown;
var _c;
__turbopack_context__.k.register(_c, "RangeDropdown");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/owner-dashboard/widgets/RevenueByCurriculumWidget.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>RevenueByCurriculumWidget
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dashboard$2f$widgets$2f$shared$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/dashboard/widgets/shared.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$owner$2d$dashboard$2f$widgets$2f$shared$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/owner-dashboard/widgets/shared.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$owner$2d$dashboard$2f$widgets$2f$WidgetHeader$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/owner-dashboard/widgets/WidgetHeader.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$owner$2d$dashboard$2f$widgets$2f$DetailsButton$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/owner-dashboard/widgets/DetailsButton.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/utils.js [app-client] (ecmascript)");
'use client';
;
;
;
;
;
;
function formatMoney(n) {
    const num = Number(n) || 0;
    if (Math.abs(num) >= 1000000) return `$${(num / 1000000).toFixed(1)}M`;
    if (Math.abs(num) >= 10000) return `$${(num / 1000).toFixed(1)}k`;
    return `$${num.toLocaleString(undefined, {
        maximumFractionDigits: 0
    })}`;
}
const DETAIL_COLUMNS = [
    {
        key: 'date',
        label: 'Date',
        format: (v)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatDate"])(v) || '—'
    },
    {
        key: 'customer',
        label: 'Customer'
    },
    {
        key: 'studio',
        label: 'Studio'
    },
    {
        key: 'tier',
        label: 'Curriculum Tier'
    },
    {
        key: 'amount',
        label: 'Amount',
        format: (v)=>formatMoney(v)
    }
];
function RevenueByCurriculumWidget({ revenue, rangeDays, onRangeChange }) {
    const tiers = revenue?.byCurriculum || [];
    const data = tiers.filter((r)=>r.revenue > 0);
    const emptyMessage = tiers.length === 0 ? 'No curriculum tiers set up yet. Tag packages with a curriculum in Settings to see tier revenue.' : 'No curriculum-tagged payments collected in this period.';
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dashboard$2f$widgets$2f$shared$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Card"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$owner$2d$dashboard$2f$widgets$2f$WidgetHeader$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                title: "Revenue by Curriculum Tier",
                rangeDays: rangeDays,
                onRangeChange: onRangeChange,
                detailsButton: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$owner$2d$dashboard$2f$widgets$2f$DetailsButton$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                    title: "Revenue by Curriculum Tier — full details",
                    metric: "revenueByCurriculum",
                    rangeDays: rangeDays,
                    columns: DETAIL_COLUMNS
                }, void 0, false, {
                    fileName: "[project]/components/owner-dashboard/widgets/RevenueByCurriculumWidget.js",
                    lineNumber: 38,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/owner-dashboard/widgets/RevenueByCurriculumWidget.js",
                lineNumber: 33,
                columnNumber: 7
            }, this),
            data.length > 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-4",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$owner$2d$dashboard$2f$widgets$2f$shared$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RankedBarList"], {
                    rows: data.map((r)=>({
                            label: r.tier,
                            value: r.revenue
                        })),
                    valueFormatter: formatMoney,
                    highlightFirst: false
                }, void 0, false, {
                    fileName: "[project]/components/owner-dashboard/widgets/RevenueByCurriculumWidget.js",
                    lineNumber: 48,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/owner-dashboard/widgets/RevenueByCurriculumWidget.js",
                lineNumber: 47,
                columnNumber: 9
            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dashboard$2f$widgets$2f$shared$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["EmptyChart"], {
                message: emptyMessage
            }, void 0, false, {
                fileName: "[project]/components/owner-dashboard/widgets/RevenueByCurriculumWidget.js",
                lineNumber: 55,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/owner-dashboard/widgets/RevenueByCurriculumWidget.js",
        lineNumber: 32,
        columnNumber: 5
    }, this);
}
_c = RevenueByCurriculumWidget;
var _c;
__turbopack_context__.k.register(_c, "RevenueByCurriculumWidget");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/owner-dashboard/widgets/RevenueByStudioWidget.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>RevenueByStudioWidget
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dashboard$2f$widgets$2f$shared$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/dashboard/widgets/shared.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$owner$2d$dashboard$2f$widgets$2f$shared$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/owner-dashboard/widgets/shared.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$owner$2d$dashboard$2f$widgets$2f$WidgetHeader$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/owner-dashboard/widgets/WidgetHeader.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$owner$2d$dashboard$2f$widgets$2f$DetailsButton$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/owner-dashboard/widgets/DetailsButton.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/utils.js [app-client] (ecmascript)");
'use client';
;
;
;
;
;
;
function formatMoney(n) {
    const num = Number(n) || 0;
    if (Math.abs(num) >= 1000000) return `$${(num / 1000000).toFixed(1)}M`;
    if (Math.abs(num) >= 10000) return `$${(num / 1000).toFixed(1)}k`;
    return `$${num.toLocaleString(undefined, {
        maximumFractionDigits: 0
    })}`;
}
const DETAIL_COLUMNS = [
    {
        key: 'date',
        label: 'Date',
        format: (v)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatDate"])(v) || '—'
    },
    {
        key: 'customer',
        label: 'Customer'
    },
    {
        key: 'studio',
        label: 'Studio'
    },
    {
        key: 'type',
        label: 'Type'
    },
    {
        key: 'method',
        label: 'Method'
    },
    {
        key: 'amount',
        label: 'Amount',
        format: (v)=>formatMoney(v)
    }
];
function RevenueByStudioWidget({ revenue, rangeDays, onRangeChange }) {
    const data = [
        ...revenue?.byStudio || []
    ].sort((a, b)=>b.revenue - a.revenue);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dashboard$2f$widgets$2f$shared$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Card"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$owner$2d$dashboard$2f$widgets$2f$WidgetHeader$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                title: "Revenue by Studio",
                rangeDays: rangeDays,
                onRangeChange: onRangeChange,
                detailsButton: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$owner$2d$dashboard$2f$widgets$2f$DetailsButton$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                    title: "Revenue by Studio — full details",
                    metric: "revenueByStudio",
                    rangeDays: rangeDays,
                    columns: DETAIL_COLUMNS
                }, void 0, false, {
                    fileName: "[project]/components/owner-dashboard/widgets/RevenueByStudioWidget.js",
                    lineNumber: 35,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/owner-dashboard/widgets/RevenueByStudioWidget.js",
                lineNumber: 30,
                columnNumber: 7
            }, this),
            data.length > 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-4",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$owner$2d$dashboard$2f$widgets$2f$shared$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RankedBarList"], {
                    rows: data.map((r)=>({
                            label: r.location,
                            value: r.revenue
                        })),
                    valueFormatter: formatMoney
                }, void 0, false, {
                    fileName: "[project]/components/owner-dashboard/widgets/RevenueByStudioWidget.js",
                    lineNumber: 45,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/owner-dashboard/widgets/RevenueByStudioWidget.js",
                lineNumber: 44,
                columnNumber: 9
            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dashboard$2f$widgets$2f$shared$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["EmptyChart"], {
                message: "No revenue in this period."
            }, void 0, false, {
                fileName: "[project]/components/owner-dashboard/widgets/RevenueByStudioWidget.js",
                lineNumber: 51,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/owner-dashboard/widgets/RevenueByStudioWidget.js",
        lineNumber: 29,
        columnNumber: 5
    }, this);
}
_c = RevenueByStudioWidget;
var _c;
__turbopack_context__.k.register(_c, "RevenueByStudioWidget");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/owner-dashboard/widgets/StudentHealthByStudioWidget.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>StudentHealthByStudioWidget
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dashboard$2f$widgets$2f$shared$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/dashboard/widgets/shared.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$owner$2d$dashboard$2f$widgets$2f$shared$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/owner-dashboard/widgets/shared.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$owner$2d$dashboard$2f$widgets$2f$WidgetHeader$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/owner-dashboard/widgets/WidgetHeader.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$owner$2d$dashboard$2f$widgets$2f$DetailsButton$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/owner-dashboard/widgets/DetailsButton.js [app-client] (ecmascript)");
'use client';
;
;
;
;
;
const DETAIL_COLUMNS = [
    {
        key: 'name',
        label: 'Name'
    },
    {
        key: 'email',
        label: 'Email'
    },
    {
        key: 'phoneNumber',
        label: 'Phone'
    },
    {
        key: 'studio',
        label: 'Studio'
    },
    {
        key: 'booked',
        label: 'Booked'
    }
];
function StudentHealthByStudioWidget({ studentHealth, rangeDays, onRangeChange }) {
    const data = [
        ...studentHealth?.perStudio || []
    ].sort((a, b)=>b.active - a.active);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dashboard$2f$widgets$2f$shared$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Card"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$owner$2d$dashboard$2f$widgets$2f$WidgetHeader$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                title: "Student Health by Studio",
                rangeDays: rangeDays,
                onRangeChange: onRangeChange,
                right: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex items-center gap-3 text-[11px] text-muted-foreground",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "flex items-center gap-1.5",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "h-2 w-2 rounded-full",
                                    style: {
                                        background: 'var(--studio-primary)'
                                    }
                                }, void 0, false, {
                                    fileName: "[project]/components/owner-dashboard/widgets/StudentHealthByStudioWidget.js",
                                    lineNumber: 28,
                                    columnNumber: 15
                                }, this),
                                "Booked"
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/owner-dashboard/widgets/StudentHealthByStudioWidget.js",
                            lineNumber: 27,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "flex items-center gap-1.5",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "h-2 w-2 rounded-full",
                                    style: {
                                        background: 'color-mix(in srgb, var(--studio-primary) 15%, transparent)'
                                    }
                                }, void 0, false, {
                                    fileName: "[project]/components/owner-dashboard/widgets/StudentHealthByStudioWidget.js",
                                    lineNumber: 32,
                                    columnNumber: 15
                                }, this),
                                "Not booked"
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/owner-dashboard/widgets/StudentHealthByStudioWidget.js",
                            lineNumber: 31,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/owner-dashboard/widgets/StudentHealthByStudioWidget.js",
                    lineNumber: 26,
                    columnNumber: 11
                }, this),
                detailsButton: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$owner$2d$dashboard$2f$widgets$2f$DetailsButton$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                    title: "Active Students — full details",
                    metric: "studentHealth",
                    rangeDays: rangeDays,
                    columns: DETAIL_COLUMNS
                }, void 0, false, {
                    fileName: "[project]/components/owner-dashboard/widgets/StudentHealthByStudioWidget.js",
                    lineNumber: 38,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/owner-dashboard/widgets/StudentHealthByStudioWidget.js",
                lineNumber: 21,
                columnNumber: 7
            }, this),
            data.length > 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-4",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$owner$2d$dashboard$2f$widgets$2f$shared$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["StackedBarRow"], {
                    rows: data.map((r)=>({
                            label: r.location,
                            sublabel: `${r.bookedPct}% booked · ${r.avgLessonsPerActiveStudentPerWeek}/wk`,
                            a: r.booked,
                            b: r.notBooked,
                            valueLabel: r.active.toLocaleString()
                        }))
                }, void 0, false, {
                    fileName: "[project]/components/owner-dashboard/widgets/StudentHealthByStudioWidget.js",
                    lineNumber: 48,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/owner-dashboard/widgets/StudentHealthByStudioWidget.js",
                lineNumber: 47,
                columnNumber: 9
            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dashboard$2f$widgets$2f$shared$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["EmptyChart"], {
                message: "No active students in this period."
            }, void 0, false, {
                fileName: "[project]/components/owner-dashboard/widgets/StudentHealthByStudioWidget.js",
                lineNumber: 59,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/owner-dashboard/widgets/StudentHealthByStudioWidget.js",
        lineNumber: 20,
        columnNumber: 5
    }, this);
}
_c = StudentHealthByStudioWidget;
var _c;
__turbopack_context__.k.register(_c, "StudentHealthByStudioWidget");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/owner-dashboard/widgets/StudentHealthOverviewWidget.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>StudentHealthOverviewWidget
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$users$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Users$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/users.js [app-client] (ecmascript) <export default as Users>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$calendar$2d$check$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CalendarCheck2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/calendar-check-2.js [app-client] (ecmascript) <export default as CalendarCheck2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$user$2d$plus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__UserPlus$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/user-plus.js [app-client] (ecmascript) <export default as UserPlus>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trending$2d$up$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__TrendingUp$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/trending-up.js [app-client] (ecmascript) <export default as TrendingUp>");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dashboard$2f$widgets$2f$shared$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/dashboard/widgets/shared.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$owner$2d$dashboard$2f$widgets$2f$RangeDropdown$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/owner-dashboard/widgets/RangeDropdown.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$owner$2d$dashboard$2f$widgets$2f$DetailsButton$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/owner-dashboard/widgets/DetailsButton.js [app-client] (ecmascript)");
'use client';
;
;
;
;
;
const DETAIL_COLUMNS = [
    {
        key: 'name',
        label: 'Name'
    },
    {
        key: 'email',
        label: 'Email'
    },
    {
        key: 'phoneNumber',
        label: 'Phone'
    },
    {
        key: 'studio',
        label: 'Studio'
    },
    {
        key: 'booked',
        label: 'Booked'
    }
];
// `noBaseline` (see pctTrend in ownerDashboard.controller.js) means the prior
// period had 0 — percent growth from zero is undefined, so a fixed "100%"
// badge used to show for both a 0->1 and a 0->11 jump. Show "New" instead of
// a fabricated percentage, and skip the badge entirely when there's nothing
// to report either way (0 now, nothing to compare against).
function trendDisplay(growth, comparisonLabel) {
    if (growth.noBaseline) {
        if (!growth.value) return null;
        return {
            text: 'New',
            label: `No ${comparisonLabel} data to compare against`
        };
    }
    const pct = (growth.trendPct ?? 0).toFixed(1);
    return {
        text: `${pct}%`,
        label: `${pct}% vs ${comparisonLabel}`
    };
}
function StudentHealthOverviewWidget({ studentHealth, rangeDays, onRangeChange }) {
    const totals = studentHealth?.totals || {
        active: 0,
        booked: 0,
        notBooked: 0,
        bookedPct: 0
    };
    const momGrowth = studentHealth?.newActiveTrend?.momGrowth || {
        value: 0,
        trendPct: 0,
        trendType: 'up'
    };
    const ytdGrowth = studentHealth?.newActiveTrend?.ytdGrowth || {
        value: 0,
        trendPct: 0,
        trendType: 'up'
    };
    const momTrend = trendDisplay(momGrowth, 'last month');
    const ytdTrend = trendDisplay(ytdGrowth, 'same period last year');
    const cards = [
        {
            title: 'Active Students',
            value: totals.active.toLocaleString(),
            icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$users$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Users$3e$__["Users"]
        },
        {
            title: 'Booked',
            value: `${totals.booked.toLocaleString()} (${totals.bookedPct}%)`,
            icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$calendar$2d$check$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CalendarCheck2$3e$__["CalendarCheck2"]
        },
        {
            title: 'New Active — MTD',
            value: momGrowth.value.toLocaleString(),
            trend: momTrend?.text,
            trendLabel: momTrend?.label,
            trendType: momGrowth.trendType,
            icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$user$2d$plus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__UserPlus$3e$__["UserPlus"]
        },
        {
            title: 'New Active — YTD',
            value: ytdGrowth.value.toLocaleString(),
            trend: ytdTrend?.text,
            trendLabel: ytdTrend?.label,
            trendType: ytdGrowth.trendType,
            icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trending$2d$up$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__TrendingUp$3e$__["TrendingUp"]
        }
    ];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        className: "flex h-full flex-col gap-3",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center justify-end gap-2",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$owner$2d$dashboard$2f$widgets$2f$DetailsButton$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        title: "Active Students — full details",
                        metric: "studentHealth",
                        rangeDays: rangeDays,
                        columns: DETAIL_COLUMNS
                    }, void 0, false, {
                        fileName: "[project]/components/owner-dashboard/widgets/StudentHealthOverviewWidget.js",
                        lineNumber: 61,
                        columnNumber: 9
                    }, this),
                    onRangeChange && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$owner$2d$dashboard$2f$widgets$2f$RangeDropdown$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        value: rangeDays,
                        onChange: onRangeChange
                    }, void 0, false, {
                        fileName: "[project]/components/owner-dashboard/widgets/StudentHealthOverviewWidget.js",
                        lineNumber: 67,
                        columnNumber: 27
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/owner-dashboard/widgets/StudentHealthOverviewWidget.js",
                lineNumber: 60,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid flex-1 grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4",
                children: cards.map((card)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dashboard$2f$widgets$2f$shared$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Card"], {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center justify-between gap-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex min-w-0 items-center gap-2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[var(--studio-primary-light)] text-[var(--studio-primary)]",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(card.icon, {
                                                    className: "h-4 w-4",
                                                    "aria-hidden": true
                                                }, void 0, false, {
                                                    fileName: "[project]/components/owner-dashboard/widgets/StudentHealthOverviewWidget.js",
                                                    lineNumber: 75,
                                                    columnNumber: 19
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/components/owner-dashboard/widgets/StudentHealthOverviewWidget.js",
                                                lineNumber: 74,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "truncate text-[13px] font-bold uppercase tracking-[0.02em] text-[var(--studio-primary)]",
                                                children: card.title
                                            }, void 0, false, {
                                                fileName: "[project]/components/owner-dashboard/widgets/StudentHealthOverviewWidget.js",
                                                lineNumber: 77,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/owner-dashboard/widgets/StudentHealthOverviewWidget.js",
                                        lineNumber: 73,
                                        columnNumber: 15
                                    }, this),
                                    card.trend && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dashboard$2f$widgets$2f$shared$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Trend"], {
                                        type: card.trendType,
                                        text: card.trend,
                                        label: card.trendLabel,
                                        className: "shrink-0"
                                    }, void 0, false, {
                                        fileName: "[project]/components/owner-dashboard/widgets/StudentHealthOverviewWidget.js",
                                        lineNumber: 82,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/owner-dashboard/widgets/StudentHealthOverviewWidget.js",
                                lineNumber: 72,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                className: "mt-2.5 text-[32px] font-bold leading-[1.21] bg-gradient-to-b from-muted-foreground to-foreground bg-clip-text text-transparent",
                                children: card.value
                            }, void 0, false, {
                                fileName: "[project]/components/owner-dashboard/widgets/StudentHealthOverviewWidget.js",
                                lineNumber: 90,
                                columnNumber: 13
                            }, this)
                        ]
                    }, card.title, true, {
                        fileName: "[project]/components/owner-dashboard/widgets/StudentHealthOverviewWidget.js",
                        lineNumber: 71,
                        columnNumber: 11
                    }, this))
            }, void 0, false, {
                fileName: "[project]/components/owner-dashboard/widgets/StudentHealthOverviewWidget.js",
                lineNumber: 69,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/owner-dashboard/widgets/StudentHealthOverviewWidget.js",
        lineNumber: 59,
        columnNumber: 5
    }, this);
}
_c = StudentHealthOverviewWidget;
var _c;
__turbopack_context__.k.register(_c, "StudentHealthOverviewWidget");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/owner-dashboard/widgets/WidgetHeader.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>WidgetHeader
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dashboard$2f$widgets$2f$shared$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/dashboard/widgets/shared.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$owner$2d$dashboard$2f$widgets$2f$RangeDropdown$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/owner-dashboard/widgets/RangeDropdown.js [app-client] (ecmascript)");
'use client';
;
;
;
function WidgetHeader({ title, right = null, detailsButton = null, rangeDays, onRangeChange }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex flex-wrap items-center justify-between gap-2",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dashboard$2f$widgets$2f$shared$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SectionLabel"], {
                children: title
            }, void 0, false, {
                fileName: "[project]/components/owner-dashboard/widgets/WidgetHeader.js",
                lineNumber: 16,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center gap-2",
                children: [
                    right,
                    detailsButton,
                    onRangeChange && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$owner$2d$dashboard$2f$widgets$2f$RangeDropdown$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        value: rangeDays,
                        onChange: onRangeChange
                    }, void 0, false, {
                        fileName: "[project]/components/owner-dashboard/widgets/WidgetHeader.js",
                        lineNumber: 20,
                        columnNumber: 27
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/owner-dashboard/widgets/WidgetHeader.js",
                lineNumber: 17,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/owner-dashboard/widgets/WidgetHeader.js",
        lineNumber: 15,
        columnNumber: 5
    }, this);
}
_c = WidgetHeader;
var _c;
__turbopack_context__.k.register(_c, "WidgetHeader");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/owner-dashboard/widgets/registry.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ownerDashboardWidgetRegistry",
    ()=>ownerDashboardWidgetRegistry
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$owner$2d$dashboard$2f$widgets$2f$StudentHealthOverviewWidget$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/owner-dashboard/widgets/StudentHealthOverviewWidget.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$owner$2d$dashboard$2f$widgets$2f$StudentHealthByStudioWidget$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/owner-dashboard/widgets/StudentHealthByStudioWidget.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$owner$2d$dashboard$2f$widgets$2f$RevenueByStudioWidget$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/owner-dashboard/widgets/RevenueByStudioWidget.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$owner$2d$dashboard$2f$widgets$2f$MembershipRevenueWidget$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/owner-dashboard/widgets/MembershipRevenueWidget.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$owner$2d$dashboard$2f$widgets$2f$OutstandingBalancesWidget$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/owner-dashboard/widgets/OutstandingBalancesWidget.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$owner$2d$dashboard$2f$widgets$2f$LessonsByStudioWidget$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/owner-dashboard/widgets/LessonsByStudioWidget.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$owner$2d$dashboard$2f$widgets$2f$LessonsByTeacherWidget$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/owner-dashboard/widgets/LessonsByTeacherWidget.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$owner$2d$dashboard$2f$widgets$2f$LessonTrendWidget$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/owner-dashboard/widgets/LessonTrendWidget.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$owner$2d$dashboard$2f$widgets$2f$LessonForecastWidget$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/owner-dashboard/widgets/LessonForecastWidget.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$owner$2d$dashboard$2f$widgets$2f$ConversionFunnelReportsWidget$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/owner-dashboard/widgets/ConversionFunnelReportsWidget.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$owner$2d$dashboard$2f$widgets$2f$InstructorUtilizationWidget$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/owner-dashboard/widgets/InstructorUtilizationWidget.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$owner$2d$dashboard$2f$widgets$2f$PurchaseJourneyWidget$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/owner-dashboard/widgets/PurchaseJourneyWidget.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$owner$2d$dashboard$2f$widgets$2f$RevenueByCurriculumWidget$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/owner-dashboard/widgets/RevenueByCurriculumWidget.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$owner$2d$dashboard$2f$widgets$2f$LessonsByCurriculumWidget$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/owner-dashboard/widgets/LessonsByCurriculumWidget.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$owner$2d$dashboard$2f$widgets$2f$CurriculumProgressionWidget$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/owner-dashboard/widgets/CurriculumProgressionWidget.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$owner$2d$dashboard$2f$widgets$2f$GoalsWidget$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/owner-dashboard/widgets/GoalsWidget.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$owner$2d$dashboard$2f$widgets$2f$LeadsByUploadTypeWidget$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/owner-dashboard/widgets/LeadsByUploadTypeWidget.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$owner$2d$dashboard$2f$widgets$2f$ExecutiveScorecardWidget$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/owner-dashboard/widgets/ExecutiveScorecardWidget.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$owner$2d$dashboard$2f$widgets$2f$OperatingExceptionsWidget$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/owner-dashboard/widgets/OperatingExceptionsWidget.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$owner$2d$dashboard$2f$widgets$2f$withOwnRange$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/owner-dashboard/widgets/withOwnRange.js [app-client] (ecmascript)");
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
/**
 * Each widget's `permission` names the backend module (under the "dashboard"
 * permission category — see permissions.helper.js in the backend repo) that
 * gates it. A role needs "read" on that specific module to see this widget at
 * all — there's no single blanket "Owner Dashboard" permission anymore, each
 * section (Student Health, Revenue, Lessons, Funnel, Marketing, Goals) is
 * independently grantable in Settings → Roles.
 */ const PERMISSION = {
    studentHealth: {
        category: 'dashboard',
        module: 'OwnerOverviewStudentHealth'
    },
    revenue: {
        category: 'dashboard',
        module: 'OwnerOverviewRevenue'
    },
    lessons: {
        category: 'dashboard',
        module: 'OwnerOverviewLessons'
    },
    funnel: {
        category: 'dashboard',
        module: 'OwnerOverviewFunnel'
    },
    marketing: {
        category: 'dashboard',
        module: 'OwnerOverviewMarketing'
    },
    goals: {
        category: 'dashboard',
        module: 'goals'
    }
};
const ownerDashboardWidgetRegistry = [
    {
        id: 'owner-executive-scorecard',
        title: 'Executive Scorecard',
        description: 'Headline metrics — revenue, lessons, leads, conversion, utilization — vs prior period and last year',
        category: 'Overview',
        // No single permission: each card self-blanks for any metric whose section
        // the caller can't see, so the widget is safe to always offer.
        component: (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$owner$2d$dashboard$2f$widgets$2f$withOwnRange$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["withRangeState"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$owner$2d$dashboard$2f$widgets$2f$ExecutiveScorecardWidget$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]),
        defaultSize: 'full',
        allowedSizes: [
            'full'
        ]
    },
    {
        id: 'owner-operating-exceptions',
        title: 'Operating Exceptions',
        description: 'Booking risk, capacity ceilings and goal shortfalls flagged against a fixed threshold',
        category: 'Overview',
        permission: PERMISSION.lessons,
        component: (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$owner$2d$dashboard$2f$widgets$2f$withOwnRange$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["withOwnRange"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$owner$2d$dashboard$2f$widgets$2f$OperatingExceptionsWidget$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]),
        defaultSize: 'half',
        allowedSizes: [
            'half',
            'full'
        ]
    },
    {
        id: 'owner-student-health-overview',
        title: 'Student Health Overview',
        description: 'Active students, booked %, and new-active growth',
        category: 'Student Health',
        permission: PERMISSION.studentHealth,
        component: (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$owner$2d$dashboard$2f$widgets$2f$withOwnRange$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["withOwnRange"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$owner$2d$dashboard$2f$widgets$2f$StudentHealthOverviewWidget$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]),
        defaultSize: 'full',
        allowedSizes: [
            'full',
            'half'
        ]
    },
    {
        id: 'owner-student-health-by-studio',
        title: 'Student Health by Studio',
        description: 'Booked vs not-booked active students per studio',
        category: 'Student Health',
        permission: PERMISSION.studentHealth,
        component: (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$owner$2d$dashboard$2f$widgets$2f$withOwnRange$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["withOwnRange"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$owner$2d$dashboard$2f$widgets$2f$StudentHealthByStudioWidget$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]),
        defaultSize: 'full',
        allowedSizes: [
            'half',
            'full'
        ]
    },
    {
        id: 'owner-revenue-by-studio',
        title: 'Revenue by Studio',
        description: 'Net revenue per studio for the selected period',
        category: 'Revenue',
        permission: PERMISSION.revenue,
        component: (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$owner$2d$dashboard$2f$widgets$2f$withOwnRange$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["withOwnRange"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$owner$2d$dashboard$2f$widgets$2f$RevenueByStudioWidget$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]),
        defaultSize: 'half',
        allowedSizes: [
            'half',
            'full'
        ]
    },
    {
        id: 'owner-membership-revenue',
        title: 'Membership Revenue',
        description: 'Revenue split by membership type',
        category: 'Revenue',
        permission: PERMISSION.revenue,
        component: (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$owner$2d$dashboard$2f$widgets$2f$withOwnRange$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["withOwnRange"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$owner$2d$dashboard$2f$widgets$2f$MembershipRevenueWidget$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]),
        defaultSize: 'half',
        allowedSizes: [
            'half',
            'full'
        ]
    },
    {
        id: 'owner-outstanding-balances',
        title: 'Outstanding Balances',
        description: 'Amounts due on active packages and memberships',
        category: 'Revenue',
        permission: PERMISSION.revenue,
        component: (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$owner$2d$dashboard$2f$widgets$2f$withOwnRange$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["withOwnRange"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$owner$2d$dashboard$2f$widgets$2f$OutstandingBalancesWidget$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]),
        defaultSize: 'half',
        allowedSizes: [
            'half',
            'full'
        ]
    },
    {
        id: 'owner-lessons-by-studio',
        title: 'Lessons by Studio',
        description: 'Completed lessons per studio',
        category: 'Lessons',
        permission: PERMISSION.lessons,
        component: (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$owner$2d$dashboard$2f$widgets$2f$withOwnRange$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["withOwnRange"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$owner$2d$dashboard$2f$widgets$2f$LessonsByStudioWidget$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]),
        defaultSize: 'half',
        allowedSizes: [
            'half',
            'full'
        ]
    },
    {
        id: 'owner-lessons-by-teacher',
        title: 'Lessons by Teacher',
        description: 'Completed lessons per teacher',
        category: 'Lessons',
        permission: PERMISSION.lessons,
        component: (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$owner$2d$dashboard$2f$widgets$2f$withOwnRange$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["withOwnRange"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$owner$2d$dashboard$2f$widgets$2f$LessonsByTeacherWidget$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]),
        defaultSize: 'half',
        allowedSizes: [
            'half',
            'full'
        ]
    },
    {
        id: 'owner-lesson-trend',
        title: 'Lessons Trend',
        description: 'Completed lessons by week',
        category: 'Lessons',
        permission: PERMISSION.lessons,
        component: (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$owner$2d$dashboard$2f$widgets$2f$withOwnRange$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["withOwnRange"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$owner$2d$dashboard$2f$widgets$2f$LessonTrendWidget$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]),
        defaultSize: 'half',
        allowedSizes: [
            'half',
            'full'
        ]
    },
    {
        id: 'owner-lesson-forecast',
        title: 'Scheduled Lessons Forecast',
        description: 'Upcoming scheduled lessons per studio',
        category: 'Lessons',
        permission: PERMISSION.lessons,
        component: (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$owner$2d$dashboard$2f$widgets$2f$withOwnRange$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["withOwnRange"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$owner$2d$dashboard$2f$widgets$2f$LessonForecastWidget$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]),
        defaultSize: 'half',
        allowedSizes: [
            'half',
            'full'
        ]
    },
    {
        id: 'owner-instructor-utilization',
        title: 'Instructor Utilization',
        description: 'Actual lessons per week vs. each teacher\'s weekly capacity',
        category: 'Lessons',
        permission: PERMISSION.lessons,
        component: (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$owner$2d$dashboard$2f$widgets$2f$withOwnRange$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["withOwnRange"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$owner$2d$dashboard$2f$widgets$2f$InstructorUtilizationWidget$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]),
        defaultSize: 'half',
        allowedSizes: [
            'half',
            'full'
        ]
    },
    {
        id: 'owner-conversion-funnel-reports',
        title: 'Conversion Funnel Reports',
        description: 'Lead to Intro Booked, and Intro to First Purchase',
        category: 'Funnel',
        permission: PERMISSION.funnel,
        component: (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$owner$2d$dashboard$2f$widgets$2f$withOwnRange$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["withOwnRange"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$owner$2d$dashboard$2f$widgets$2f$ConversionFunnelReportsWidget$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]),
        defaultSize: 'full',
        allowedSizes: [
            'full'
        ]
    },
    {
        id: 'owner-purchase-journey',
        title: 'Purchase Journey',
        description: 'Repeat-purchase progression and value per milestone',
        category: 'Funnel',
        permission: PERMISSION.funnel,
        component: (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$owner$2d$dashboard$2f$widgets$2f$withOwnRange$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["withOwnRange"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$owner$2d$dashboard$2f$widgets$2f$PurchaseJourneyWidget$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]),
        defaultSize: 'full',
        allowedSizes: [
            'full'
        ]
    },
    {
        id: 'owner-revenue-by-curriculum',
        title: 'Revenue by Curriculum Tier',
        description: 'Purchase revenue split by curriculum tier',
        category: 'Revenue',
        permission: PERMISSION.revenue,
        component: (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$owner$2d$dashboard$2f$widgets$2f$withOwnRange$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["withOwnRange"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$owner$2d$dashboard$2f$widgets$2f$RevenueByCurriculumWidget$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]),
        defaultSize: 'half',
        allowedSizes: [
            'half',
            'full'
        ]
    },
    {
        id: 'owner-lessons-by-curriculum',
        title: 'Lessons by Curriculum Tier',
        description: 'Completed lessons split by curriculum tier',
        category: 'Lessons',
        permission: PERMISSION.lessons,
        component: (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$owner$2d$dashboard$2f$widgets$2f$withOwnRange$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["withOwnRange"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$owner$2d$dashboard$2f$widgets$2f$LessonsByCurriculumWidget$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]),
        defaultSize: 'half',
        allowedSizes: [
            'half',
            'full'
        ]
    },
    {
        id: 'owner-curriculum-progression',
        title: 'Curriculum Progression',
        description: 'Students who have ever reached each curriculum tier',
        category: 'Funnel',
        permission: PERMISSION.funnel,
        component: (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$owner$2d$dashboard$2f$widgets$2f$withOwnRange$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["withOwnRange"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$owner$2d$dashboard$2f$widgets$2f$CurriculumProgressionWidget$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]),
        defaultSize: 'full',
        allowedSizes: [
            'full'
        ]
    },
    {
        id: 'owner-leads-by-source',
        title: 'Leads by Source',
        description: 'Leads grouped by upload type — manual, bulk upload, form, and incoming channels',
        category: 'Marketing',
        permission: PERMISSION.marketing,
        component: (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$owner$2d$dashboard$2f$widgets$2f$withOwnRange$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["withRangeState"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$owner$2d$dashboard$2f$widgets$2f$LeadsByUploadTypeWidget$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]),
        defaultSize: 'half',
        allowedSizes: [
            'half',
            'full'
        ]
    },
    {
        id: 'owner-goals',
        title: 'Goals This Month',
        description: 'Revenue, new students, and lessons vs. this month\'s targets',
        category: 'Goals',
        permission: PERMISSION.goals,
        component: (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$owner$2d$dashboard$2f$widgets$2f$withOwnRange$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["withOwnRange"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$owner$2d$dashboard$2f$widgets$2f$GoalsWidget$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]),
        defaultSize: 'half',
        allowedSizes: [
            'half',
            'full'
        ]
    }
];
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/owner-dashboard/widgets/shared.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "FunnelConnector",
    ()=>FunnelConnector,
    "FunnelStage",
    ()=>FunnelStage,
    "RankedBarList",
    ()=>RankedBarList,
    "StackedBarRow",
    ()=>StackedBarRow
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
'use client';
;
function RankedBarList({ rows = [], valueFormatter = (v)=>v.toLocaleString(), sublabelFormatter, highlightFirst = true }) {
    const max = Math.max(...rows.map((r)=>r.value), 1);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex flex-col",
        children: rows.map((r, i)=>{
            const pct = Math.max(r.value / max * 100, r.value > 0 ? 2 : 0);
            const first = highlightFirst && i === 0;
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid grid-cols-[minmax(0,110px)_1fr_auto] items-center gap-3 py-1.5",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "truncate text-[12px] font-semibold text-foreground",
                        title: r.label,
                        children: [
                            r.label,
                            r.sublabel && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "ml-1 text-[10px] font-normal text-muted-foreground",
                                children: r.sublabel
                            }, void 0, false, {
                                fileName: "[project]/components/owner-dashboard/widgets/shared.js",
                                lineNumber: 19,
                                columnNumber: 30
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/owner-dashboard/widgets/shared.js",
                        lineNumber: 17,
                        columnNumber: 13
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "h-3 overflow-hidden rounded-full bg-muted",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "h-full rounded-full transition-all duration-700",
                            style: {
                                width: `${pct}%`,
                                background: first ? 'linear-gradient(90deg, var(--bar-gradient-start), var(--bar-gradient-end))' : 'color-mix(in srgb, var(--studio-primary) 28%, transparent)'
                            }
                        }, void 0, false, {
                            fileName: "[project]/components/owner-dashboard/widgets/shared.js",
                            lineNumber: 22,
                            columnNumber: 15
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/owner-dashboard/widgets/shared.js",
                        lineNumber: 21,
                        columnNumber: 13
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: `text-right text-[12px] font-bold tabular-nums ${first ? 'text-[var(--studio-primary)]' : 'text-muted-foreground'}`,
                        children: valueFormatter(r.value)
                    }, void 0, false, {
                        fileName: "[project]/components/owner-dashboard/widgets/shared.js",
                        lineNumber: 32,
                        columnNumber: 13
                    }, this)
                ]
            }, r.label, true, {
                fileName: "[project]/components/owner-dashboard/widgets/shared.js",
                lineNumber: 16,
                columnNumber: 11
            }, this);
        })
    }, void 0, false, {
        fileName: "[project]/components/owner-dashboard/widgets/shared.js",
        lineNumber: 11,
        columnNumber: 5
    }, this);
}
_c = RankedBarList;
function StackedBarRow({ rows = [] }) {
    const max = Math.max(...rows.map((r)=>r.a + r.b), 1);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex flex-col",
        children: rows.map((r)=>{
            const total = r.a + r.b;
            const widthPct = Math.max(total / max * 100, total > 0 ? 2 : 0);
            const aShare = total ? r.a / total * 100 : 0;
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid grid-cols-[minmax(0,120px)_1fr_54px] items-center gap-3 py-1.5",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "truncate text-[12px] font-semibold text-foreground",
                        title: r.label,
                        children: [
                            r.label,
                            r.sublabel && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "block text-[10px] font-normal text-muted-foreground",
                                children: r.sublabel
                            }, void 0, false, {
                                fileName: "[project]/components/owner-dashboard/widgets/shared.js",
                                lineNumber: 55,
                                columnNumber: 30
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/owner-dashboard/widgets/shared.js",
                        lineNumber: 53,
                        columnNumber: 13
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex h-4 overflow-hidden rounded-full bg-muted",
                        style: {
                            width: `${widthPct}%`
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "h-full",
                                style: {
                                    width: `${aShare}%`,
                                    background: 'var(--studio-primary)'
                                }
                            }, void 0, false, {
                                fileName: "[project]/components/owner-dashboard/widgets/shared.js",
                                lineNumber: 58,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "h-full flex-1",
                                style: {
                                    background: 'color-mix(in srgb, var(--studio-primary) 15%, transparent)'
                                }
                            }, void 0, false, {
                                fileName: "[project]/components/owner-dashboard/widgets/shared.js",
                                lineNumber: 59,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/owner-dashboard/widgets/shared.js",
                        lineNumber: 57,
                        columnNumber: 13
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-right text-[12px] font-bold tabular-nums text-foreground",
                        children: r.valueLabel
                    }, void 0, false, {
                        fileName: "[project]/components/owner-dashboard/widgets/shared.js",
                        lineNumber: 61,
                        columnNumber: 13
                    }, this)
                ]
            }, r.label, true, {
                fileName: "[project]/components/owner-dashboard/widgets/shared.js",
                lineNumber: 52,
                columnNumber: 11
            }, this);
        })
    }, void 0, false, {
        fileName: "[project]/components/owner-dashboard/widgets/shared.js",
        lineNumber: 46,
        columnNumber: 5
    }, this);
}
_c1 = StackedBarRow;
function FunnelStage({ label, value, metrics = [], barPct = null, highlight = false, onClick, active = false }) {
    const Tag = onClick ? 'button' : 'div';
    const emphasized = highlight || active;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Tag, {
        ...onClick ? {
            type: 'button',
            onClick
        } : {},
        className: `flex min-w-[150px] flex-1 flex-col rounded-2xl border p-4 text-left transition-colors ${onClick ? 'cursor-pointer hover:border-[var(--studio-primary)] hover:shadow-sm' : ''} ${emphasized ? 'border-[var(--studio-primary)] bg-[color-mix(in_srgb,var(--studio-primary)_7%,transparent)]' : 'border-border bg-card'}`,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "text-[10px] font-bold uppercase tracking-[0.16em] text-muted-foreground",
                children: label
            }, void 0, false, {
                fileName: "[project]/components/owner-dashboard/widgets/shared.js",
                lineNumber: 89,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "mt-1.5 bg-gradient-to-b from-muted-foreground to-foreground bg-clip-text text-[28px] font-bold leading-none tabular-nums text-transparent",
                children: value
            }, void 0, false, {
                fileName: "[project]/components/owner-dashboard/widgets/shared.js",
                lineNumber: 90,
                columnNumber: 7
            }, this),
            barPct !== null && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-2.5 h-1.5 overflow-hidden rounded-full bg-muted",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "h-full rounded-full transition-all duration-700",
                    style: {
                        width: `${Math.max(barPct, barPct > 0 ? 4 : 0)}%`,
                        background: 'linear-gradient(90deg, var(--bar-gradient-start), var(--bar-gradient-end))'
                    }
                }, void 0, false, {
                    fileName: "[project]/components/owner-dashboard/widgets/shared.js",
                    lineNumber: 95,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/owner-dashboard/widgets/shared.js",
                lineNumber: 94,
                columnNumber: 9
            }, this),
            metrics.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-3 grid grid-cols-2 gap-2 border-t border-border pt-2.5",
                children: metrics.map((m)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-[9px] font-semibold uppercase tracking-[0.1em] text-muted-foreground",
                                children: m.label
                            }, void 0, false, {
                                fileName: "[project]/components/owner-dashboard/widgets/shared.js",
                                lineNumber: 108,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-[13px] font-bold tabular-nums text-foreground",
                                children: m.value
                            }, void 0, false, {
                                fileName: "[project]/components/owner-dashboard/widgets/shared.js",
                                lineNumber: 109,
                                columnNumber: 15
                            }, this)
                        ]
                    }, m.label, true, {
                        fileName: "[project]/components/owner-dashboard/widgets/shared.js",
                        lineNumber: 107,
                        columnNumber: 13
                    }, this))
            }, void 0, false, {
                fileName: "[project]/components/owner-dashboard/widgets/shared.js",
                lineNumber: 105,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/owner-dashboard/widgets/shared.js",
        lineNumber: 79,
        columnNumber: 5
    }, this);
}
_c2 = FunnelStage;
function FunnelConnector({ ratePct, caption }) {
    const weak = ratePct < 100;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex w-[92px] shrink-0 flex-col items-center justify-center gap-1 px-1 text-center",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: `rounded-full px-2 py-0.5 text-[12.5px] font-bold tabular-nums ${weak ? 'bg-success/10 text-success' : 'bg-muted text-muted-foreground'}`,
                children: [
                    ratePct,
                    "%"
                ]
            }, void 0, true, {
                fileName: "[project]/components/owner-dashboard/widgets/shared.js",
                lineNumber: 123,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex w-full items-center text-[var(--studio-primary)]",
                "aria-hidden": true,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "h-px flex-1 bg-[color-mix(in_srgb,var(--studio-primary)_40%,transparent)]"
                    }, void 0, false, {
                        fileName: "[project]/components/owner-dashboard/widgets/shared.js",
                        lineNumber: 131,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "-ml-0.5 text-[11px] leading-none",
                        children: "▸"
                    }, void 0, false, {
                        fileName: "[project]/components/owner-dashboard/widgets/shared.js",
                        lineNumber: 132,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/owner-dashboard/widgets/shared.js",
                lineNumber: 130,
                columnNumber: 7
            }, this),
            caption && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "text-[9px] leading-tight text-muted-foreground",
                children: caption
            }, void 0, false, {
                fileName: "[project]/components/owner-dashboard/widgets/shared.js",
                lineNumber: 134,
                columnNumber: 19
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/owner-dashboard/widgets/shared.js",
        lineNumber: 122,
        columnNumber: 5
    }, this);
}
_c3 = FunnelConnector;
var _c, _c1, _c2, _c3;
__turbopack_context__.k.register(_c, "RankedBarList");
__turbopack_context__.k.register(_c1, "StackedBarRow");
__turbopack_context__.k.register(_c2, "FunnelStage");
__turbopack_context__.k.register(_c3, "FunnelConnector");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/owner-dashboard/widgets/withOwnRange.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "withOwnRange",
    ()=>withOwnRange,
    "withRangeState",
    ()=>withRangeState
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$hooks$2f$useAnalyticsOverview$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/hooks/useAnalyticsOverview.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
const RANGE_LOADER = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
    className: "h-40 animate-pulse rounded-xl bg-muted/40"
}, void 0, false, {
    fileName: "[project]/components/owner-dashboard/widgets/withOwnRange.js",
    lineNumber: 6,
    columnNumber: 22
}, ("TURBOPACK compile-time value", void 0));
/** `a`/`b` are each either a number of days or a { from, to } custom range. */ function sameRange(a, b) {
    if (a === b) return true;
    if (a && b && typeof a === 'object' && typeof b === 'object') return a.from === b.from && a.to === b.to;
    return false;
}
/**
 * Tracks a widget's own range, seeded from and re-synced to the page-level
 * default (props.defaultRange, set by the top toolbar picker) — but once the
 * user picks a range on this specific widget, it "sticks": further page-level
 * changes stop overriding it until the widget is reset (e.g. layout reset).
 */ function useWidgetRange(defaultRange) {
    _s();
    const [rangeDays, setRangeDays] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(defaultRange);
    const [overridden, setOverridden] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const prevDefaultRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(defaultRange);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useWidgetRange.useEffect": ()=>{
            if (!sameRange(prevDefaultRef.current, defaultRange)) {
                prevDefaultRef.current = defaultRange;
                if (!overridden) setRangeDays(defaultRange);
            }
        }
    }["useWidgetRange.useEffect"], [
        defaultRange,
        overridden
    ]);
    function onRangeChange(next) {
        setOverridden(true);
        setRangeDays(next);
    }
    return [
        rangeDays,
        onRangeChange
    ];
}
_s(useWidgetRange, "QIKFJMVN/8kcWr5BbaUzGrFa2Bw=");
function withOwnRange(WidgetComponent, { defaultRangeDays = 30 } = {}) {
    var _s = __turbopack_context__.k.signature();
    function Wrapped({ defaultRange }) {
        _s();
        const [rangeDays, onRangeChange] = useWidgetRange(defaultRange ?? defaultRangeDays);
        const { data, isLoading } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$hooks$2f$useAnalyticsOverview$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useOwnerDashboardOverview"])(rangeDays);
        if (isLoading && !data) return RANGE_LOADER;
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(WidgetComponent, {
            ...data || {},
            rangeDays: rangeDays,
            onRangeChange: onRangeChange
        }, void 0, false, {
            fileName: "[project]/components/owner-dashboard/widgets/withOwnRange.js",
            lineNumber: 57,
            columnNumber: 12
        }, this);
    }
    _s(Wrapped, "CAqymFw+36lx/vUCf+idBgSMR1E=", false, function() {
        return [
            useWidgetRange,
            __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$hooks$2f$useAnalyticsOverview$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useOwnerDashboardOverview"]
        ];
    });
    Wrapped.displayName = `WithOwnRange(${WidgetComponent.displayName || WidgetComponent.name || 'Widget'})`;
    return Wrapped;
}
function withRangeState(WidgetComponent, { defaultRangeDays = 30 } = {}) {
    var _s = __turbopack_context__.k.signature();
    function Wrapped({ defaultRange, ...props }) {
        _s();
        const [rangeDays, onRangeChange] = useWidgetRange(defaultRange ?? defaultRangeDays);
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(WidgetComponent, {
            ...props,
            rangeDays: rangeDays,
            onRangeChange: onRangeChange
        }, void 0, false, {
            fileName: "[project]/components/owner-dashboard/widgets/withOwnRange.js",
            lineNumber: 72,
            columnNumber: 12
        }, this);
    }
    _s(Wrapped, "9YgqlAPxV2Bd4haoMge3AFdTzKo=", false, function() {
        return [
            useWidgetRange
        ];
    });
    Wrapped.displayName = `WithRangeState(${WidgetComponent.displayName || WidgetComponent.name || 'Widget'})`;
    return Wrapped;
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=components_owner-dashboard_widgets_0-gibd-a-d082._.js.map