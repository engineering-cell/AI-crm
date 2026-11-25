(globalThis["TURBOPACK"] || (globalThis["TURBOPACK"] = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/lib/chartStyles.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/** Recharts strokes/tooltip — uses CSS variables so charts respect light/dark mode */ __turbopack_context__.s([
    "chartAxisStroke",
    ()=>chartAxisStroke,
    "chartGridStroke",
    ()=>chartGridStroke,
    "rechartsTooltipContentStyle",
    ()=>rechartsTooltipContentStyle,
    "rechartsTooltipCursor",
    ()=>rechartsTooltipCursor,
    "rechartsTooltipItemStyle",
    ()=>rechartsTooltipItemStyle
]);
const chartGridStroke = 'hsl(var(--border))';
const chartAxisStroke = 'hsl(var(--muted-foreground))';
const rechartsTooltipContentStyle = {
    backgroundColor: 'hsl(var(--popover))',
    border: '1px solid hsl(var(--border))',
    borderRadius: '8px',
    fontSize: '12px',
    color: 'hsl(var(--popover-foreground))'
};
const rechartsTooltipCursor = {
    fill: 'hsl(var(--muted))',
    opacity: 0.4
};
const rechartsTooltipItemStyle = {
    color: 'hsl(var(--popover-foreground))'
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
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
"[project]/lib/customer-filter-fields.js [app-client] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "CUSTOMER_CONDITION_FIELDS",
    ()=>CUSTOMER_CONDITION_FIELDS,
    "CUSTOMER_CONDITION_OPERATORS",
    ()=>CUSTOMER_CONDITION_OPERATORS,
    "buildCustomerQueryParams",
    ()=>buildCustomerQueryParams,
    "filtersToConditionsForForm",
    ()=>filtersToConditionsForForm,
    "formatConditionDisplayValue",
    ()=>formatConditionDisplayValue,
    "formatConditionValueLabel",
    ()=>formatConditionValueLabel,
    "getApiCustomerConditions",
    ()=>getApiCustomerConditions,
    "getConditionFieldDef",
    ()=>getConditionFieldDef,
    "getFieldValueOptions",
    ()=>getFieldValueOptions,
    "getOperatorsForField",
    ()=>getOperatorsForField,
    "getValidConditions",
    ()=>getValidConditions,
    "normalizeConditionValue",
    ()=>normalizeConditionValue
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$dynamic$2d$list$2d$normalize$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/dynamic-list-normalize.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$lead$2d$filter$2d$fields$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/lead-filter-fields.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$customer$2d$list$2d$filter$2d$catalog$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/lib/customer-list-filter-catalog.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$dynamic$2d$list$2d$filter$2d$catalog$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/dynamic-list-filter-catalog.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$customer$2d$page$2d$filters$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/customer-page-filters.js [app-client] (ecmascript)");
;
;
;
;
const CUSTOMER_CONDITION_FIELDS = __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$customer$2d$list$2d$filter$2d$catalog$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["ALL_CUSTOMER_FILTER_FIELDS"].map(_c = ({ value, label })=>({
        value,
        label
    }));
_c1 = CUSTOMER_CONDITION_FIELDS;
const CUSTOMER_CONDITION_OPERATORS = __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$dynamic$2d$list$2d$filter$2d$catalog$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FILTER_OPERATORS"];
function getConditionFieldDef(field) {
    if (String(field || '').startsWith('customFields.')) {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$customer$2d$list$2d$filter$2d$catalog$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["getCustomerFilterFieldDef"])('customFields');
    }
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$customer$2d$list$2d$filter$2d$catalog$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["getCustomerFilterFieldDef"])(field);
}
function getOperatorsForField(field) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$customer$2d$list$2d$filter$2d$catalog$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["getOperatorsForCustomerFilterField"])(field);
}
function normalizeConditionValue(operator, value) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$dynamic$2d$list$2d$filter$2d$catalog$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["normalizeFilterConditionValue"])(operator, value);
}
function getFieldValueOptions(field, context = {}) {
    const { locations = [], teachers = [], tags = [], memberships = [], packages = [], leadReasons = [], eventTypes = [], products = [], purchaseNames = [], purchaseItemNames = [] } = context;
    const def = getConditionFieldDef(field);
    if (!def) return null;
    if (def.optionsKey === 'locations' || field === 'locationID') {
        return locations.map((loc)=>({
                value: loc._id,
                label: loc.name || loc._id
            }));
    }
    if (def.optionsKey === 'teachers' || field === 'enrollment.teacherID') {
        return teachers.map((t)=>({
                value: t._id,
                label: t.name || t._id
            }));
    }
    if (def.optionsKey === 'reason' || field === 'reason') {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$lead$2d$filter$2d$fields$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getLeadReasonOptions"])(leadReasons);
    }
    if (def.optionsKey === 'tags' || field === 'tags') {
        return (tags || []).map((tag)=>({
                value: typeof tag === 'string' ? tag : tag.name || tag._id,
                label: typeof tag === 'string' ? tag : tag.name || tag._id
            }));
    }
    if (def.optionsKey === 'memberships' || field === 'membership.membershipName') {
        return memberships.map((m)=>({
                value: m.name || m._id,
                label: m.name || m._id
            }));
    }
    if (def.optionsKey === 'packages' || field === 'package.packageID') {
        return packages.map((p)=>({
                value: p._id,
                label: p.packageName || p._id
            }));
    }
    if (def.optionsKey === 'eventTypes') {
        return eventTypes.map((e)=>({
                value: e._id,
                label: e.name || e._id
            }));
    }
    if (def.optionsKey === 'products') {
        return products.map((p)=>({
                value: p._id,
                label: p.name || p._id
            }));
    }
    if (def.optionsKey === 'purchaseNames') {
        return purchaseNames.map((n)=>({
                value: n,
                label: n
            }));
    }
    if (def.optionsKey === 'purchaseItemNames') {
        return purchaseItemNames.map((n)=>({
                value: n,
                label: n
            }));
    }
    if (def.staticOptions) {
        return def.staticOptions.map((opt)=>typeof opt === 'string' ? {
                value: opt,
                label: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$dynamic$2d$list$2d$normalize$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatFieldDisplayValue"])(opt)
            } : {
                value: opt.value,
                label: opt.label || (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$dynamic$2d$list$2d$normalize$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatFieldDisplayValue"])(opt.value)
            });
    }
    return null;
}
function formatConditionDisplayValue(value) {
    if (Array.isArray(value)) {
        return value.map((v)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$dynamic$2d$list$2d$normalize$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatFieldDisplayValue"])(String(v ?? ''))).filter(Boolean).join(', ');
    }
    if (value && typeof value === 'object' && 'key' in value) {
        return `${value.key}: ${value.value}`;
    }
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$dynamic$2d$list$2d$normalize$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatFieldDisplayValue"])(String(value ?? ''));
}
function formatConditionValueLabel(field, value, context = {}) {
    const values = Array.isArray(value) ? value : [
        value
    ];
    const options = getFieldValueOptions(field, context) || [];
    return values.map((v)=>{
        if (v && typeof v === 'object') {
            if ('from' in v && 'to' in v) return `${v.from} – ${v.to}`;
            if ('key' in v) return `${v.key}=${v.value || ''}`;
        }
        const str = String(v);
        const match = options.find((o)=>o.value === str || o.value === v);
        if (match) return match.label;
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$dynamic$2d$list$2d$normalize$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatFieldDisplayValue"])(str);
    }).join(', ');
}
function getValidConditions(conditions = []) {
    if (!Array.isArray(conditions)) return [];
    return conditions.filter((condition)=>{
        if (!condition?.field) return false;
        if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$dynamic$2d$list$2d$filter$2d$catalog$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["conditionHasValue"])(condition)) return true;
        if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$dynamic$2d$list$2d$filter$2d$catalog$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isValuelessOperator"])(condition?.operator || 'eq')) return true;
        return false;
    });
}
function getApiCustomerConditions(conditions = []) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$customer$2d$page$2d$filters$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["stripUiRankingConditions"])(getValidConditions(conditions));
}
function serializeConditionForApi(condition) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$customer$2d$list$2d$filter$2d$catalog$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["serializeCustomerFilterConditionForApi"])(condition);
}
function buildConditionGroupsPayload(conditions = [], groupLogics = {}, globalLogic = 'AND') {
    const valid = getApiCustomerConditions(conditions);
    if (valid.length === 0) return null;
    const byGroup = new Map();
    for (const condition of valid){
        const groupId = condition.groupId || 'ungrouped';
        if (!byGroup.has(groupId)) byGroup.set(groupId, []);
        byGroup.get(groupId).push(serializeConditionForApi(condition));
    }
    const flatConditions = Array.from(byGroup.values()).flat();
    if (byGroup.size <= 1 && Object.keys(groupLogics || {}).length === 0) {
        return {
            conditionLogic: globalLogic === 'OR' ? 'OR' : 'AND',
            conditions: flatConditions
        };
    }
    const groups = Array.from(byGroup.entries()).map(([groupId, groupConditions])=>({
            id: groupId,
            logic: groupLogics?.[groupId] === 'OR' ? 'OR' : 'AND',
            conditions: groupConditions
        }));
    return {
        conditionLogic: globalLogic === 'OR' ? 'OR' : 'AND',
        conditions: flatConditions,
        conditionGroups: groups
    };
}
function buildCustomerQueryParams({ page, limit, filters = {} }) {
    const synced = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$customer$2d$page$2d$filters$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["syncCustomerSpendRanking"])(filters);
    const params = new URLSearchParams();
    if (page) params.set('page', String(page));
    if (limit) params.set('limit', String(limit));
    const search = String(synced?.search ?? '').trim();
    if (search) params.set('search', search);
    if (synced?.teacherID) params.set('teacherID', synced.teacherID);
    const conditions = Array.isArray(synced?.conditions) ? synced.conditions : [];
    const payload = buildConditionGroupsPayload(conditions, synced?.groupLogics || {}, synced?.conditionLogic || 'AND');
    if (payload) {
        params.set('conditionLogic', payload.conditionLogic);
        params.set('conditions', JSON.stringify(payload.conditions));
        if (payload.conditionGroups?.length) {
            params.set('conditionGroups', JSON.stringify(payload.conditionGroups));
        }
    }
    const sortBy = String(synced?.sortBy || '').trim();
    const sortOrder = String(synced?.sortOrder || '').trim();
    if (sortBy) params.set('sortBy', sortBy);
    if (sortOrder === 'asc' || sortOrder === 'desc') params.set('sortOrder', sortOrder);
    return params;
}
function filtersToConditionsForForm(filters = {}) {
    if (!Array.isArray(filters?.conditions)) return [];
    return getValidConditions(filters.conditions).map((c)=>({
            ...serializeConditionForApi(c),
            ...c.groupId ? {
                groupId: c.groupId
            } : {},
            ...c.id ? {
                id: c.id
            } : {}
        }));
}
;
var _c, _c1;
__turbopack_context__.k.register(_c, "CUSTOMER_CONDITION_FIELDS$ALL_CUSTOMER_FILTER_FIELDS.map");
__turbopack_context__.k.register(_c1, "CUSTOMER_CONDITION_FIELDS");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/lib/customer-lifecycle.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "CUSTOMER_LIFECYCLE_STATUS_META",
    ()=>CUSTOMER_LIFECYCLE_STATUS_META,
    "CUSTOMER_LIFECYCLE_STATUS_OPTIONS",
    ()=>CUSTOMER_LIFECYCLE_STATUS_OPTIONS,
    "customerLifecycleBadgeClass",
    ()=>customerLifecycleBadgeClass,
    "customerLifecycleColor",
    ()=>customerLifecycleColor,
    "customerLifecycleLabel",
    ()=>customerLifecycleLabel,
    "findCustomerLifecycleStatus",
    ()=>findCustomerLifecycleStatus,
    "getCustomerLifecycleBadgeProps",
    ()=>getCustomerLifecycleBadgeProps,
    "normalizeCustomerLifecycleMeta",
    ()=>normalizeCustomerLifecycleMeta,
    "setCustomerLifecycleStatusCache",
    ()=>setCustomerLifecycleStatusCache
]);
/**
 * Customer lifecycle statuses (trial + student phase).
 * Keys stay trial_* for compatibility; labels use Trial.
 * Keep in sync with backend CUSTOMER_LIFECYCLE_STATUS_META.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$status$2d$hex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/status-hex.js [app-client] (ecmascript)");
;
const CUSTOMER_LIFECYCLE_STATUS_META = [
    {
        value: 'trial_unscheduled',
        label: 'Trial Unscheduled',
        phase: 'intro',
        description: 'First purchase / convert done. Trial lesson not booked yet.',
        color: '#F59E0B'
    },
    {
        value: 'trial_scheduled',
        label: 'Trial Scheduled',
        phase: 'intro',
        description: 'Trial lesson is on the calendar.',
        color: '#0EA5E9'
    },
    {
        value: 'trial_no_show',
        label: 'Trial No-Show',
        phase: 'intro',
        description: 'Missed the scheduled trial lesson.',
        color: '#F97316'
    },
    {
        value: 'no_sale',
        label: 'No Sale',
        phase: 'intro',
        description: 'Attended trial but has not bought a program yet.',
        color: '#8B5CF6'
    },
    {
        value: 'active',
        label: 'Active',
        phase: 'student',
        description: 'Bought a program / package again — active student.',
        color: '#059669'
    },
    {
        value: 'inactive',
        label: 'Inactive',
        phase: 'student',
        description: 'Lapsed or idle — no recent activity or enrollment.',
        color: '#E11D48'
    },
    {
        value: 'archived',
        label: 'Archived',
        phase: 'student',
        description: 'Closed / no longer managed in the active pipeline.',
        color: '#64748B'
    }
];
const CUSTOMER_LIFECYCLE_STATUS_OPTIONS = CUSTOMER_LIFECYCLE_STATUS_META.map(_c = ({ value, label })=>({
        value,
        label
    }));
_c1 = CUSTOMER_LIFECYCLE_STATUS_OPTIONS;
let _orgStatusCache = null;
function setCustomerLifecycleStatusCache(rows) {
    _orgStatusCache = Array.isArray(rows) && rows.length ? rows : null;
}
function findCustomerLifecycleStatus(status, statuses) {
    const key = String(status || '').toLowerCase();
    const list = Array.isArray(statuses) && statuses.length ? statuses : _orgStatusCache;
    if (Array.isArray(list) && list.length) {
        const match = list.find((s)=>String(s.value || '').toLowerCase() === key);
        if (match) return match;
    }
    return CUSTOMER_LIFECYCLE_STATUS_META.find((s)=>s.value === key) || null;
}
function customerLifecycleLabel(status, statuses) {
    const key = String(status || '').toLowerCase();
    return findCustomerLifecycleStatus(status, statuses)?.label || (key ? key.replace(/_/g, ' ') : 'Active');
}
function customerLifecycleColor(status, statuses) {
    const key = String(status || 'active').toLowerCase();
    const hex = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$status$2d$hex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["sanitizeStatusHex"])(findCustomerLifecycleStatus(key, statuses)?.color);
    if (hex) return hex;
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$status$2d$hex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["sanitizeStatusHex"])(CUSTOMER_LIFECYCLE_STATUS_META.find((s)=>s.value === 'active')?.color);
}
function customerLifecycleBadgeClass(status) {
    switch(String(status || '').toLowerCase()){
        case 'inactive':
            return 'bg-rose-100 text-rose-600 dark:bg-rose-900/30 dark:text-rose-400';
        case 'archived':
            return 'bg-muted text-muted-foreground dark:bg-slate-800/60 dark:text-muted-foreground';
        case 'trial_scheduled':
            return 'bg-sky-100 text-sky-700 dark:bg-sky-900/30 dark:text-sky-400';
        case 'trial_unscheduled':
            return 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400';
        case 'trial_no_show':
            return 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400';
        case 'no_sale':
            return 'bg-violet-100 text-violet-700 dark:bg-violet-900/30 dark:text-violet-400';
        case 'active':
        default:
            return 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400';
    }
}
function getCustomerLifecycleBadgeProps(status, statuses) {
    const color = customerLifecycleColor(status, statuses);
    if (color) {
        return {
            className: 'status-color-badge',
            style: {
                '--status-color': color
            }
        };
    }
    return {
        className: customerLifecycleBadgeClass(status),
        style: undefined
    };
}
function normalizeCustomerLifecycleMeta(rows) {
    if (!Array.isArray(rows) || !rows.length) return CUSTOMER_LIFECYCLE_STATUS_META.map((s)=>({
            ...s
        }));
    const byKey = new Map(rows.map((row)=>[
            String(row.value || row.key || '').toLowerCase(),
            row
        ]));
    return CUSTOMER_LIFECYCLE_STATUS_META.map((meta)=>{
        const row = byKey.get(meta.value);
        if (!row) return {
            ...meta
        };
        return {
            value: meta.value,
            label: String(row.label || row.name || '').trim() || meta.label,
            phase: row.phase || meta.phase,
            description: row.description != null ? String(row.description) : meta.description,
            color: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$status$2d$hex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["sanitizeStatusHex"])(row.color) || meta.color,
            id: row.id || row._id || undefined
        };
    });
}
var _c, _c1;
__turbopack_context__.k.register(_c, "CUSTOMER_LIFECYCLE_STATUS_OPTIONS$CUSTOMER_LIFECYCLE_STATUS_META.map");
__turbopack_context__.k.register(_c1, "CUSTOMER_LIFECYCLE_STATUS_OPTIONS");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/lib/customer-list-filter-catalog.js [app-client] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ALL_CUSTOMER_FILTER_FIELDS",
    ()=>ALL_CUSTOMER_FILTER_FIELDS,
    "CUSTOMER_FILTER_FIELD_MAP",
    ()=>CUSTOMER_FILTER_FIELD_MAP,
    "CUSTOMER_FILTER_GROUPS",
    ()=>CUSTOMER_FILTER_GROUPS,
    "getCustomerFilterFieldDef",
    ()=>getCustomerFilterFieldDef,
    "getDefaultOperatorForCustomerField",
    ()=>getDefaultOperatorForCustomerField,
    "getOperatorsForCustomerFilterField",
    ()=>getOperatorsForCustomerFilterField,
    "serializeCustomerFilterConditionForApi",
    ()=>serializeCustomerFilterConditionForApi
]);
/**
 * Customer Dynamic List filter catalog (customer-list-filter-reference.pdf).
 * Groups · fields · shared operators with lead catalog.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$dynamic$2d$list$2d$filter$2d$catalog$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/dynamic-list-filter-catalog.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$customer$2d$lifecycle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/customer-lifecycle.js [app-client] (ecmascript)");
;
;
;
const OP = {
    eq: 'eq',
    ne: 'ne',
    in: 'in',
    not_in: 'not_in',
    contains: 'contains',
    starts_with: 'starts_with',
    exists: 'exists',
    not_exists: 'not_exists',
    is_true: 'is_true',
    is_false: 'is_false',
    gt: 'gt',
    gte: 'gte',
    lt: 'lt',
    lte: 'lte',
    between: 'between',
    within_days: 'within_days',
    older_than_days: 'older_than_days'
};
const GENDER_OPTIONS = [
    'male',
    'female',
    'other',
    'prefer_not_to_say'
];
const MEMBERSHIP_STATUS = [
    'active',
    'expired',
    'cancelled',
    'frozen'
];
const PAYMENT_STATUS = [
    'paid',
    'partial',
    'unpaid'
];
const BILLING_TYPE = [
    'one_time',
    'flexible',
    'payment_plan'
];
const RENEWAL_METHOD = [
    'cash',
    'card',
    'ach',
    'online',
    'cheque',
    'other'
];
const PACKAGE_STATUS = [
    'active',
    'expired',
    'exhausted',
    'cancelled'
];
const PACKAGE_BILLING = [
    'one_time',
    'payment_plan',
    'flexible',
    'pay_per_session'
];
const ENROLLMENT_STATUS = [
    'active',
    'completed',
    'cancelled'
];
const SESSION_STATUS = [
    'scheduled',
    'completed',
    'cancelled_no_charge',
    'cancelled_charged',
    'no_show_no_charge',
    'no_show_charged'
];
const SESSION_TYPE = [
    'lesson',
    'trial',
    'private',
    'event',
    'record'
];
const CHARGE_METHOD = [
    'package',
    'credits',
    'direct',
    'membership',
    'mixed',
    'none'
];
const PAYMENT_METHOD = [
    'cash',
    'card',
    'online',
    'cheque',
    'other',
    'wallet'
];
const PAYMENT_TYPE = [
    'package_purchase',
    'membership_purchase',
    'membership_renewal',
    'credit_topup',
    'session_payment',
    'refund'
];
const PAYMENT_RECORD_STATUS = [
    'completed',
    'pending',
    'failed'
];
const WALLET_STATUS = [
    'active',
    'frozen'
];
const CONTRACT_STATUS = [
    'draft',
    'sent',
    'signed',
    'expired',
    'revoked'
];
const WEEKDAYS = [
    'Mon',
    'Tue',
    'Wed',
    'Thu',
    'Fri',
    'Sat',
    'Sun'
];
const MONTHS = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec'
];
function field(def) {
    return {
        operators: [
            OP.eq
        ],
        inputType: 'text',
        optionsKey: null,
        staticOptions: null,
        notes: '',
        ...def
    };
}
const CUSTOMER_FILTER_GROUPS = [
    {
        id: 'customer_profile',
        label: 'Customer Profile',
        description: 'Who the customer is: status, teacher, location and contact details.',
        fields: [
            field({
                value: 'name',
                label: 'Name',
                inputType: 'text',
                operators: [
                    OP.contains,
                    OP.starts_with,
                    OP.eq,
                    OP.ne
                ]
            }),
            field({
                value: 'email',
                label: 'Email',
                inputType: 'text',
                operators: [
                    OP.eq,
                    OP.ne,
                    OP.contains,
                    OP.exists
                ]
            }),
            field({
                value: 'phoneNumber',
                label: 'Phone number',
                inputType: 'text',
                operators: [
                    OP.exists,
                    OP.not_exists,
                    OP.starts_with
                ]
            }),
            field({
                value: 'locationID',
                label: 'Location',
                inputType: 'select',
                optionsKey: 'locations',
                operators: [
                    OP.eq,
                    OP.ne,
                    OP.in,
                    OP.exists,
                    OP.not_exists
                ]
            }),
            field({
                value: 'credits.ranking',
                label: 'Credits ranking',
                inputType: 'select',
                staticOptions: [
                    {
                        value: 'most',
                        label: 'Most credits'
                    },
                    {
                        value: 'least',
                        label: 'Least credits'
                    }
                ],
                operators: [
                    OP.eq
                ],
                notes: 'Orders the customer list by prepaid credit balance (the Credits column), highest or lowest first.'
            }),
            field({
                value: 'credits',
                label: 'Credits',
                inputType: 'number',
                operators: [
                    OP.eq,
                    OP.gt,
                    OP.gte,
                    OP.lt,
                    OP.lte,
                    OP.between
                ],
                notes: 'Filters by prepaid credit balance shown in the Credits column.'
            }),
            field({
                value: 'lifecycleStatus',
                label: 'Lifecycle Status',
                inputType: 'select',
                staticOptions: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$customer$2d$lifecycle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CUSTOMER_LIFECYCLE_STATUS_OPTIONS"],
                operators: [
                    OP.eq,
                    OP.ne,
                    OP.in,
                    OP.not_in,
                    OP.exists,
                    OP.not_exists
                ]
            }),
            // Next to Lifecycle Status so "Active + Teacher" can sit in one filter group. Matches the
            // teacher on an enrollment or a calendar event; with Active also required, the backend
            // narrows it to calendar events only (scopeTeacherToLessons).
            field({
                value: 'enrollment.teacherID',
                label: 'Teacher',
                inputType: 'select',
                optionsKey: 'teachers',
                operators: [
                    OP.in,
                    OP.not_in,
                    OP.eq,
                    OP.ne
                ]
            }),
            field({
                value: 'reason',
                label: 'Reason',
                inputType: 'select',
                optionsKey: 'reason',
                operators: [
                    OP.eq,
                    OP.ne,
                    OP.in,
                    OP.contains,
                    OP.exists,
                    OP.not_exists
                ]
            }),
            field({
                value: 'classAssigned',
                label: 'Class assigned',
                inputType: 'boolean',
                operators: [
                    OP.exists,
                    OP.not_exists
                ]
            })
        ]
    },
    {
        id: 'demographics',
        label: 'Demographics',
        description: 'Age, gender, and address fields.',
        fields: [
            field({
                value: 'gender',
                label: 'Gender',
                inputType: 'select',
                staticOptions: GENDER_OPTIONS,
                operators: [
                    OP.eq,
                    OP.ne,
                    OP.in
                ]
            }),
            field({
                value: 'dateOfBirth',
                label: 'Date of birth',
                inputType: 'date',
                operators: [
                    OP.eq,
                    OP.exists,
                    OP.not_exists
                ]
            }),
            field({
                value: 'age',
                label: 'Age',
                inputType: 'number',
                operators: [
                    OP.eq,
                    OP.gt,
                    OP.gte,
                    OP.lt,
                    OP.lte,
                    OP.between
                ]
            }),
            field({
                value: 'address.city',
                label: 'City',
                inputType: 'text',
                operators: [
                    OP.eq,
                    OP.ne,
                    OP.contains
                ]
            }),
            field({
                value: 'address.state',
                label: 'State',
                inputType: 'text',
                operators: [
                    OP.eq,
                    OP.ne,
                    OP.in
                ]
            }),
            field({
                value: 'address.country',
                label: 'Country',
                inputType: 'text',
                operators: [
                    OP.eq,
                    OP.ne,
                    OP.in
                ]
            }),
            field({
                value: 'address.zipCode',
                label: 'ZIP code',
                inputType: 'text',
                operators: [
                    OP.eq,
                    OP.starts_with,
                    OP.contains
                ]
            })
        ]
    },
    {
        id: 'tags_custom_fields',
        label: 'Tags & Custom Fields',
        description: 'Tags, custom fields, family members, and notes.',
        fields: [
            field({
                value: 'tags',
                label: 'Tags',
                inputType: 'multiselect',
                optionsKey: 'tags',
                operators: [
                    OP.in,
                    OP.not_in,
                    OP.exists,
                    OP.not_exists
                ]
            }),
            field({
                value: 'tags.count',
                label: 'Tag count',
                inputType: 'number',
                operators: [
                    OP.eq,
                    OP.gt,
                    OP.gte,
                    OP.lt,
                    OP.lte
                ]
            }),
            field({
                value: 'notes.hasPinned',
                label: 'Has pinned note',
                inputType: 'boolean',
                operators: [
                    OP.is_true,
                    OP.is_false
                ]
            }),
            field({
                value: 'customFields',
                label: 'Custom field',
                inputType: 'customField',
                operators: [
                    OP.eq,
                    OP.ne,
                    OP.contains,
                    OP.exists,
                    OP.not_exists
                ]
            }),
            field({
                value: 'members.count',
                label: 'Family member count',
                inputType: 'number',
                operators: [
                    OP.eq,
                    OP.gt,
                    OP.gte,
                    OP.lt,
                    OP.lte
                ]
            }),
            field({
                value: 'members.hasFamilyMembers',
                label: 'Has family members',
                inputType: 'boolean',
                operators: [
                    OP.is_true,
                    OP.is_false
                ]
            })
        ]
    },
    {
        id: 'timing',
        label: 'Timing',
        description: 'When the customer record was created or last updated.',
        fields: [
            field({
                value: 'createdAt',
                label: 'Created at',
                inputType: 'date',
                operators: [
                    OP.eq,
                    OP.within_days,
                    OP.older_than_days,
                    OP.between,
                    OP.gt,
                    OP.lt
                ]
            }),
            field({
                value: 'updatedAt',
                label: 'Updated at',
                inputType: 'date',
                operators: [
                    OP.eq,
                    OP.within_days,
                    OP.older_than_days,
                    OP.between,
                    OP.gt,
                    OP.lt
                ]
            }),
            field({
                value: 'createdAtDayOfWeek',
                label: 'Created (day of week)',
                inputType: 'select',
                staticOptions: WEEKDAYS,
                operators: [
                    OP.in
                ]
            }),
            field({
                value: 'createdAtMonth',
                label: 'Created (month)',
                inputType: 'select',
                staticOptions: MONTHS,
                operators: [
                    OP.in
                ]
            })
        ]
    },
    {
        id: 'membership',
        label: 'Membership',
        description: 'Cross-collection filters against CustomerMembership records.',
        fields: [
            field({
                value: 'membership.hasActive',
                label: 'Has active membership',
                inputType: 'boolean',
                operators: [
                    OP.is_true,
                    OP.is_false
                ]
            }),
            field({
                value: 'membership.status',
                label: 'Membership status',
                inputType: 'select',
                staticOptions: MEMBERSHIP_STATUS,
                operators: [
                    OP.eq,
                    OP.ne,
                    OP.in,
                    OP.not_in
                ]
            }),
            field({
                value: 'membership.membershipName',
                label: 'Membership name',
                inputType: 'text',
                operators: [
                    OP.eq,
                    OP.ne,
                    OP.contains,
                    OP.in
                ]
            }),
            field({
                value: 'membership.totalCount',
                label: 'Total memberships',
                inputType: 'number',
                operators: [
                    OP.eq,
                    OP.gt,
                    OP.gte,
                    OP.lt,
                    OP.lte
                ]
            }),
            field({
                value: 'membership.expiryDate',
                label: 'Membership expiry',
                inputType: 'date',
                operators: [
                    OP.eq,
                    OP.within_days,
                    OP.older_than_days,
                    OP.between,
                    OP.gt,
                    OP.lt
                ]
            }),
            field({
                value: 'membership.purchaseDate',
                label: 'Membership purchase date',
                inputType: 'date',
                operators: [
                    OP.eq,
                    OP.within_days,
                    OP.older_than_days,
                    OP.between
                ]
            }),
            field({
                value: 'membership.paymentStatus',
                label: 'Membership payment status',
                inputType: 'select',
                staticOptions: PAYMENT_STATUS,
                operators: [
                    OP.eq,
                    OP.ne,
                    OP.in
                ]
            }),
            field({
                value: 'membership.billingType',
                label: 'Membership billing type',
                inputType: 'select',
                staticOptions: BILLING_TYPE,
                operators: [
                    OP.eq,
                    OP.in
                ]
            }),
            field({
                value: 'membership.renewalMethod',
                label: 'Renewal method',
                inputType: 'select',
                staticOptions: RENEWAL_METHOD,
                operators: [
                    OP.eq,
                    OP.ne,
                    OP.in
                ]
            }),
            field({
                value: 'membership.autoRenew',
                label: 'Auto renew',
                inputType: 'boolean',
                operators: [
                    OP.is_true,
                    OP.is_false
                ]
            }),
            field({
                value: 'membership.isFrozen',
                label: 'Membership frozen',
                inputType: 'boolean',
                operators: [
                    OP.is_true,
                    OP.is_false
                ]
            }),
            field({
                value: 'membership.price',
                label: 'Membership price',
                inputType: 'number',
                operators: [
                    OP.eq,
                    OP.gt,
                    OP.gte,
                    OP.lt,
                    OP.lte,
                    OP.between
                ]
            }),
            field({
                value: 'membership.dueAmount',
                label: 'Due amount',
                inputType: 'number',
                operators: [
                    OP.exists,
                    OP.gt,
                    OP.gte
                ]
            }),
            field({
                value: 'membership.durationDays',
                label: 'Duration (days)',
                inputType: 'number',
                operators: [
                    OP.eq,
                    OP.gt,
                    OP.lt,
                    OP.between
                ]
            }),
            field({
                value: 'membership.hasFreezes',
                label: 'Has freezes',
                inputType: 'boolean',
                operators: [
                    OP.is_true,
                    OP.is_false
                ]
            })
        ]
    },
    {
        id: 'package',
        label: 'Package',
        description: 'Cross-collection filters against CustomerPackage records.',
        fields: [
            field({
                value: 'package.hasActive',
                label: 'Has active package',
                inputType: 'boolean',
                operators: [
                    OP.is_true,
                    OP.is_false
                ]
            }),
            field({
                value: 'package.packageID',
                label: 'Package (active enrollment)',
                inputType: 'select',
                optionsKey: 'packages',
                operators: [
                    OP.eq,
                    OP.ne,
                    OP.in,
                    OP.not_in
                ]
            }),
            field({
                value: 'package.status',
                label: 'Package status',
                inputType: 'select',
                staticOptions: PACKAGE_STATUS,
                operators: [
                    OP.eq,
                    OP.ne,
                    OP.in
                ]
            }),
            field({
                value: 'package.totalCount',
                label: 'Total packages',
                inputType: 'number',
                operators: [
                    OP.eq,
                    OP.gt,
                    OP.gte,
                    OP.lt,
                    OP.lte
                ]
            }),
            field({
                value: 'package.expiryDate',
                label: 'Package expiry',
                inputType: 'date',
                operators: [
                    OP.eq,
                    OP.within_days,
                    OP.older_than_days,
                    OP.between
                ]
            }),
            field({
                value: 'package.paymentStatus',
                label: 'Package payment status',
                inputType: 'select',
                staticOptions: PAYMENT_STATUS,
                operators: [
                    OP.eq,
                    OP.in
                ]
            }),
            field({
                value: 'package.billingType',
                label: 'Package billing type',
                inputType: 'select',
                staticOptions: PACKAGE_BILLING,
                operators: [
                    OP.eq,
                    OP.in
                ]
            }),
            field({
                value: 'package.sessionsRemaining',
                label: 'Sessions remaining',
                inputType: 'number',
                operators: [
                    OP.eq,
                    OP.gt,
                    OP.gte,
                    OP.lt,
                    OP.lte
                ]
            }),
            field({
                value: 'package.sessionsUsed',
                label: 'Sessions used',
                inputType: 'number',
                operators: [
                    OP.eq,
                    OP.gt,
                    OP.gte,
                    OP.lt,
                    OP.lte
                ]
            }),
            field({
                value: 'package.totalPaid',
                label: 'Package total paid',
                inputType: 'number',
                operators: [
                    OP.gt,
                    OP.gte,
                    OP.lt,
                    OP.lte,
                    OP.between
                ]
            }),
            field({
                value: 'package.hasExhausted',
                label: 'Has exhausted package',
                inputType: 'boolean',
                operators: [
                    OP.is_true,
                    OP.is_false
                ]
            })
        ]
    },
    {
        id: 'events_products',
        label: 'Events & Products',
        description: 'Cross-collection filters against Events & Products purchases (Purchase records).',
        fields: [
            field({
                value: 'purchase.hasAny',
                label: 'Has event or product purchase',
                inputType: 'boolean',
                operators: [
                    OP.is_true,
                    OP.is_false
                ]
            }),
            field({
                value: 'purchase.totalCount',
                label: 'Total purchases',
                inputType: 'number',
                operators: [
                    OP.eq,
                    OP.gt,
                    OP.gte,
                    OP.lt,
                    OP.lte
                ]
            }),
            field({
                value: 'purchase.name',
                label: 'Event / purchase name',
                inputType: 'select',
                optionsKey: 'purchaseNames',
                // Pick existing names; "contains" / "starts with" stay free-text for partial matches.
                allowTextSearch: true,
                operators: [
                    OP.in,
                    OP.not_in,
                    OP.eq,
                    OP.contains,
                    OP.starts_with
                ],
                notes: 'Matches the name given to the purchase, e.g. "Showcase Halloween".'
            }),
            field({
                value: 'purchase.eventTypeID',
                label: 'Event type',
                inputType: 'select',
                optionsKey: 'eventTypes',
                operators: [
                    OP.in,
                    OP.not_in,
                    OP.eq,
                    OP.ne
                ]
            }),
            field({
                value: 'purchase.productID',
                label: 'Product',
                inputType: 'select',
                optionsKey: 'products',
                operators: [
                    OP.in,
                    OP.not_in,
                    OP.eq,
                    OP.ne
                ],
                notes: 'Customers with a purchase that includes this product.'
            }),
            field({
                value: 'purchase.itemName',
                label: 'Product / item name',
                inputType: 'select',
                optionsKey: 'purchaseItemNames',
                allowTextSearch: true,
                operators: [
                    OP.in,
                    OP.not_in,
                    OP.eq,
                    OP.contains,
                    OP.starts_with
                ],
                notes: 'Matches any line item name, including custom items.'
            }),
            field({
                value: 'purchase.billingStatus',
                label: 'Purchase payment status',
                inputType: 'select',
                staticOptions: PAYMENT_STATUS,
                operators: [
                    OP.eq,
                    OP.in,
                    OP.ne
                ]
            }),
            field({
                value: 'purchase.purchaseDate',
                label: 'Purchase date',
                inputType: 'date',
                operators: [
                    OP.within_days,
                    OP.older_than_days,
                    OP.between,
                    OP.gt,
                    OP.lt
                ]
            }),
            field({
                value: 'purchase.eventDate',
                label: 'Event date',
                inputType: 'date',
                operators: [
                    OP.within_days,
                    OP.between,
                    OP.gt,
                    OP.lt,
                    OP.older_than_days
                ]
            })
        ]
    },
    {
        id: 'enrollment',
        label: 'Enrollment',
        hiddenInFilter: true,
        description: 'Cross-collection filters against Enrollment records.',
        fields: [
            field({
                value: 'enrollment.hasActive',
                label: 'Has active enrollment',
                inputType: 'boolean',
                operators: [
                    OP.is_true,
                    OP.is_false
                ]
            }),
            field({
                value: 'enrollment.status',
                label: 'Enrollment status',
                inputType: 'select',
                staticOptions: ENROLLMENT_STATUS,
                operators: [
                    OP.eq,
                    OP.ne,
                    OP.in
                ]
            }),
            field({
                value: 'enrollment.totalCount',
                label: 'Total enrollments',
                inputType: 'number',
                operators: [
                    OP.eq,
                    OP.gt,
                    OP.gte,
                    OP.lt,
                    OP.lte
                ]
            }),
            field({
                value: 'enrollment.hasTeacher',
                label: 'Has teacher',
                inputType: 'boolean',
                operators: [
                    OP.exists,
                    OP.not_exists
                ]
            }),
            field({
                value: 'enrollment.hasCompleted',
                label: 'Has completed enrollment',
                inputType: 'boolean',
                operators: [
                    OP.is_true,
                    OP.is_false
                ]
            }),
            field({
                value: 'enrollment.hasCancelled',
                label: 'Has cancelled enrollment',
                inputType: 'boolean',
                operators: [
                    OP.is_true,
                    OP.is_false
                ]
            })
        ]
    },
    {
        id: 'sessions',
        label: 'Sessions / Bookings',
        description: 'Cross-collection filters against CalendarEvent records.',
        fields: [
            field({
                value: 'session.totalCount',
                label: 'Total sessions',
                inputType: 'number',
                operators: [
                    OP.eq,
                    OP.gt,
                    OP.gte,
                    OP.lt,
                    OP.lte,
                    OP.between
                ]
            }),
            field({
                value: 'session.completedCount',
                label: 'Completed sessions',
                inputType: 'number',
                operators: [
                    OP.eq,
                    OP.gt,
                    OP.gte,
                    OP.lt,
                    OP.lte
                ]
            }),
            field({
                value: 'session.status',
                label: 'Session status',
                inputType: 'select',
                staticOptions: SESSION_STATUS,
                operators: [
                    OP.in,
                    OP.not_in
                ]
            }),
            field({
                value: 'session.hasNoShow',
                label: 'Has no-show',
                inputType: 'boolean',
                operators: [
                    OP.is_true,
                    OP.is_false
                ]
            }),
            field({
                value: 'session.noShowCount',
                label: 'No-show count',
                inputType: 'number',
                operators: [
                    OP.eq,
                    OP.gt,
                    OP.gte,
                    OP.lt,
                    OP.lte
                ]
            }),
            field({
                value: 'session.type',
                label: 'Session type',
                inputType: 'select',
                staticOptions: SESSION_TYPE,
                operators: [
                    OP.in,
                    OP.not_in
                ]
            }),
            field({
                value: 'session.lastSessionAt',
                label: 'Last session',
                inputType: 'date',
                operators: [
                    OP.eq,
                    OP.within_days,
                    OP.older_than_days,
                    OP.not_exists
                ]
            }),
            field({
                value: 'session.nextSessionAt',
                label: 'Next session',
                inputType: 'date',
                operators: [
                    OP.eq,
                    OP.within_days,
                    OP.exists,
                    OP.not_exists
                ]
            }),
            field({
                value: 'session.chargeMethod',
                label: 'Charge method',
                inputType: 'select',
                staticOptions: CHARGE_METHOD,
                operators: [
                    OP.in,
                    OP.not_in
                ]
            }),
            field({
                value: 'session.countInDays',
                label: 'Session count in days',
                inputType: 'number',
                operators: [
                    OP.gt,
                    OP.gte,
                    OP.lt,
                    OP.lte
                ]
            })
        ]
    },
    {
        id: 'payments',
        label: 'Payments & Financial',
        description: 'Cross-collection filters against Payment records.',
        fields: [
            field({
                value: 'payment.spendRanking',
                label: 'Spend ranking',
                inputType: 'select',
                staticOptions: [
                    {
                        value: 'most',
                        label: 'Most spend'
                    },
                    {
                        value: 'least',
                        label: 'Least spend'
                    }
                ],
                operators: [
                    OP.eq
                ],
                notes: 'Orders the customer list by lifetime net spend (completed payments, excluding refunds).'
            }),
            field({
                value: 'payment.totalSpend',
                label: 'Total Spend',
                inputType: 'number',
                // Lifetime net spend: completed payments excluding refunds (dollars).
                // Sort tip: payment.totalSpend desc on the customer list for highest spenders.
                operators: [
                    OP.eq,
                    OP.gt,
                    OP.gte,
                    OP.lt,
                    OP.lte,
                    OP.between,
                    OP.exists,
                    OP.not_exists
                ]
            }),
            field({
                value: 'payment.totalCount',
                label: 'Payment count',
                inputType: 'number',
                operators: [
                    OP.eq,
                    OP.gt,
                    OP.gte,
                    OP.lt,
                    OP.lte
                ]
            }),
            field({
                value: 'payment.lastPaymentAt',
                label: 'Last payment',
                inputType: 'date',
                operators: [
                    OP.eq,
                    OP.within_days,
                    OP.older_than_days,
                    OP.exists,
                    OP.not_exists
                ]
            }),
            field({
                value: 'payment.method',
                label: 'Payment method',
                inputType: 'select',
                staticOptions: PAYMENT_METHOD,
                operators: [
                    OP.eq,
                    OP.ne,
                    OP.in,
                    OP.not_in
                ]
            }),
            field({
                value: 'payment.type',
                label: 'Payment type',
                inputType: 'select',
                staticOptions: PAYMENT_TYPE,
                operators: [
                    OP.in,
                    OP.not_in
                ]
            }),
            field({
                value: 'payment.status',
                label: 'Payment status',
                inputType: 'select',
                staticOptions: PAYMENT_RECORD_STATUS,
                operators: [
                    OP.eq,
                    OP.in
                ]
            }),
            field({
                value: 'payment.hasRefund',
                label: 'Has refund',
                inputType: 'boolean',
                operators: [
                    OP.is_true,
                    OP.is_false
                ]
            }),
            field({
                value: 'payment.countInDays',
                label: 'Payment count in days',
                inputType: 'number',
                operators: [
                    OP.gt,
                    OP.gte,
                    OP.lt,
                    OP.lte
                ]
            }),
            field({
                value: 'payment.avgSpend',
                label: 'Average spend',
                inputType: 'number',
                operators: [
                    OP.gt,
                    OP.gte,
                    OP.lt,
                    OP.lte
                ]
            })
        ]
    },
    {
        id: 'wallet',
        label: 'Wallet',
        description: 'Wallet balance and transaction history.',
        fields: [
            field({
                value: 'wallet.balance',
                label: 'Wallet balance',
                inputType: 'number',
                operators: [
                    OP.eq,
                    OP.gt,
                    OP.gte,
                    OP.lt,
                    OP.lte,
                    OP.between
                ]
            }),
            field({
                value: 'wallet.status',
                label: 'Wallet status',
                inputType: 'select',
                staticOptions: WALLET_STATUS,
                operators: [
                    OP.eq
                ]
            }),
            field({
                value: 'wallet.hasFunds',
                label: 'Has funds',
                inputType: 'boolean',
                operators: [
                    OP.is_true,
                    OP.is_false
                ]
            }),
            field({
                value: 'wallet.totalCreditsAdded',
                label: 'Total credits added',
                inputType: 'number',
                operators: [
                    OP.gt,
                    OP.gte,
                    OP.lt,
                    OP.lte
                ]
            }),
            field({
                value: 'wallet.lastTopupAt',
                label: 'Last top-up',
                inputType: 'date',
                operators: [
                    OP.eq,
                    OP.within_days,
                    OP.older_than_days,
                    OP.not_exists
                ]
            }),
            field({
                value: 'wallet.transactionCount',
                label: 'Transaction count',
                inputType: 'number',
                operators: [
                    OP.gt,
                    OP.gte,
                    OP.lt,
                    OP.lte
                ]
            })
        ]
    },
    {
        id: 'contract',
        label: 'Contract',
        description: 'Contract records sent or signed by this customer.',
        fields: [
            field({
                value: 'contract.hasAny',
                label: 'Has any contract',
                inputType: 'boolean',
                operators: [
                    OP.is_true,
                    OP.is_false
                ]
            }),
            field({
                value: 'contract.status',
                label: 'Contract status',
                inputType: 'select',
                staticOptions: CONTRACT_STATUS,
                operators: [
                    OP.eq,
                    OP.ne,
                    OP.in
                ]
            }),
            field({
                value: 'contract.hasSigned',
                label: 'Has signed contract',
                inputType: 'boolean',
                operators: [
                    OP.is_true,
                    OP.is_false
                ]
            }),
            field({
                value: 'contract.signedAt',
                label: 'Signed at',
                inputType: 'date',
                operators: [
                    OP.eq,
                    OP.within_days,
                    OP.older_than_days,
                    OP.exists,
                    OP.not_exists
                ]
            }),
            field({
                value: 'contract.totalCount',
                label: 'Total contracts',
                inputType: 'number',
                operators: [
                    OP.eq,
                    OP.gt,
                    OP.gte
                ]
            }),
            field({
                value: 'contract.hasExpired',
                label: 'Has expired contract',
                inputType: 'boolean',
                operators: [
                    OP.is_true,
                    OP.is_false
                ]
            })
        ]
    }
];
const ALL_CUSTOMER_FILTER_FIELDS = CUSTOMER_FILTER_GROUPS.flatMap(_c = (g)=>g.fields);
_c1 = ALL_CUSTOMER_FILTER_FIELDS;
const CUSTOMER_FILTER_FIELD_MAP = Object.fromEntries(_c3 = ALL_CUSTOMER_FILTER_FIELDS.map(_c2 = (f)=>[
        f.value,
        f
    ]));
_c4 = CUSTOMER_FILTER_FIELD_MAP;
function getCustomerFilterFieldDef(field) {
    if (String(field || '').startsWith('customFields.')) {
        return CUSTOMER_FILTER_FIELD_MAP.customFields || null;
    }
    return CUSTOMER_FILTER_FIELD_MAP[field] || null;
}
function getOperatorsForCustomerFilterField(field) {
    const def = getCustomerFilterFieldDef(field);
    if (!def) return (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$dynamic$2d$list$2d$filter$2d$catalog$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getOperatorsForFilterField"])(field);
    return __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$dynamic$2d$list$2d$filter$2d$catalog$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FILTER_OPERATORS"].filter((o)=>def.operators.includes(o.value)).map((o)=>{
        if (def.inputType === 'date' && o.value === 'eq') {
            return {
                ...o,
                label: 'On'
            };
        }
        if (def.inputType === 'date' && o.value === 'gt') {
            return {
                ...o,
                label: 'After'
            };
        }
        if (def.inputType === 'date' && o.value === 'lt') {
            return {
                ...o,
                label: 'Before'
            };
        }
        return o;
    });
}
function getDefaultOperatorForCustomerField(field) {
    const def = getCustomerFilterFieldDef(field);
    return def?.operators?.[0] || (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$dynamic$2d$list$2d$filter$2d$catalog$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getDefaultOperatorForField"])(field);
}
function serializeCustomerFilterConditionForApi(condition) {
    const field = condition?.field;
    const operator = condition?.operator || getDefaultOperatorForCustomerField(field);
    const value = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$dynamic$2d$list$2d$filter$2d$catalog$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["normalizeFilterConditionValue"])(operator, condition?.value, field);
    if (field === 'customFields' && value && typeof value === 'object') {
        return {
            field: value.key ? `customFields.${value.key}` : 'customFields',
            operator,
            value: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$dynamic$2d$list$2d$filter$2d$catalog$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isValuelessOperator"])(operator) ? true : value.value
        };
    }
    if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$dynamic$2d$list$2d$filter$2d$catalog$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isBetweenOperator"])(operator) && value && typeof value === 'object') {
        return {
            field,
            operator,
            value: [
                value.from,
                value.to
            ]
        };
    }
    return {
        field,
        operator,
        value: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$dynamic$2d$list$2d$filter$2d$catalog$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isValuelessOperator"])(operator) ? true : value
    };
}
var _c, _c1, _c2, _c3, _c4;
__turbopack_context__.k.register(_c, "ALL_CUSTOMER_FILTER_FIELDS$CUSTOMER_FILTER_GROUPS.flatMap");
__turbopack_context__.k.register(_c1, "ALL_CUSTOMER_FILTER_FIELDS");
__turbopack_context__.k.register(_c2, "CUSTOMER_FILTER_FIELD_MAP$Object.fromEntries$ALL_CUSTOMER_FILTER_FIELDS.map");
__turbopack_context__.k.register(_c3, "CUSTOMER_FILTER_FIELD_MAP$Object.fromEntries");
__turbopack_context__.k.register(_c4, "CUSTOMER_FILTER_FIELD_MAP");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/lib/customer-page-filters.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "CREDITS_RANKING_FIELD",
    ()=>CREDITS_RANKING_FIELD,
    "CUSTOMER_SORT_OPTIONS",
    ()=>CUSTOMER_SORT_OPTIONS,
    "EMPTY_CUSTOMER_FILTERS",
    ()=>EMPTY_CUSTOMER_FILTERS,
    "SPEND_RANKING_FIELD",
    ()=>SPEND_RANKING_FIELD,
    "applyCustomerSortPreset",
    ()=>applyCustomerSortPreset,
    "countAdvancedCustomerFilters",
    ()=>countAdvancedCustomerFilters,
    "creditsRankingToSort",
    ()=>creditsRankingToSort,
    "customerSortPresetValue",
    ()=>customerSortPresetValue,
    "hasActiveCustomerFilters",
    ()=>hasActiveCustomerFilters,
    "isCreditsRankingCondition",
    ()=>isCreditsRankingCondition,
    "isSpendRankingCondition",
    ()=>isSpendRankingCondition,
    "isUiRankingCondition",
    ()=>isUiRankingCondition,
    "sanitizeCustomerFilters",
    ()=>sanitizeCustomerFilters,
    "sortToCreditsRankingValue",
    ()=>sortToCreditsRankingValue,
    "sortToSpendRankingValue",
    ()=>sortToSpendRankingValue,
    "spendRankingToSort",
    ()=>spendRankingToSort,
    "stripSpendRankingConditions",
    ()=>stripSpendRankingConditions,
    "stripUiRankingConditions",
    ()=>stripUiRankingConditions,
    "syncCustomerSpendRanking",
    ()=>syncCustomerSpendRanking
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$customer$2d$list$2d$filter$2d$catalog$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/lib/customer-list-filter-catalog.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$dynamic$2d$list$2d$filter$2d$catalog$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/dynamic-list-filter-catalog.js [app-client] (ecmascript)");
;
const SPEND_RANKING_FIELD = 'payment.spendRanking';
const CREDITS_RANKING_FIELD = 'credits.ranking';
const EMPTY_CUSTOMER_FILTERS = {
    search: '',
    teacherID: '',
    conditionLogic: 'AND',
    conditions: [],
    groupLogics: {},
    enabledGroups: {},
    sortBy: 'createdAt',
    sortOrder: 'desc'
};
const CUSTOMER_SORT_OPTIONS = [
    {
        value: 'newest',
        label: 'Newest',
        sortBy: 'createdAt',
        sortOrder: 'desc'
    },
    {
        value: 'most_spend',
        label: 'Most spend',
        sortBy: 'payment.totalSpend',
        sortOrder: 'desc'
    },
    {
        value: 'least_spend',
        label: 'Least spend',
        sortBy: 'payment.totalSpend',
        sortOrder: 'asc'
    },
    {
        value: 'most_credits',
        label: 'Most credits',
        sortBy: 'credits',
        sortOrder: 'desc'
    },
    {
        value: 'least_credits',
        label: 'Least credits',
        sortBy: 'credits',
        sortOrder: 'asc'
    }
];
function isSpendRankingCondition(condition) {
    return condition?.field === SPEND_RANKING_FIELD;
}
function isCreditsRankingCondition(condition) {
    return condition?.field === CREDITS_RANKING_FIELD;
}
function isUiRankingCondition(condition) {
    return isSpendRankingCondition(condition) || isCreditsRankingCondition(condition);
}
function spendRankingToSort(value) {
    if (value === 'most') return {
        sortBy: 'payment.totalSpend',
        sortOrder: 'desc'
    };
    if (value === 'least') return {
        sortBy: 'payment.totalSpend',
        sortOrder: 'asc'
    };
    return null;
}
function creditsRankingToSort(value) {
    if (value === 'most') return {
        sortBy: 'credits',
        sortOrder: 'desc'
    };
    if (value === 'least') return {
        sortBy: 'credits',
        sortOrder: 'asc'
    };
    return null;
}
function sortToSpendRankingValue(sortBy, sortOrder) {
    if (sortBy !== 'payment.totalSpend') return null;
    return sortOrder === 'asc' ? 'least' : 'most';
}
function sortToCreditsRankingValue(sortBy, sortOrder) {
    if (sortBy !== 'credits') return null;
    return sortOrder === 'asc' ? 'least' : 'most';
}
function stripSpendRankingConditions(conditions = []) {
    return (Array.isArray(conditions) ? conditions : []).filter((c)=>!isSpendRankingCondition(c));
}
function stripUiRankingConditions(conditions = []) {
    return (Array.isArray(conditions) ? conditions : []).filter((c)=>!isUiRankingCondition(c));
}
function syncCustomerSpendRanking(filters = {}) {
    const conditions = Array.isArray(filters.conditions) ? filters.conditions : [];
    const others = stripUiRankingConditions(conditions);
    const rankings = conditions.filter((c)=>isUiRankingCondition(c) && String(c.value ?? '').trim() !== '');
    const ranking = rankings[rankings.length - 1];
    if (isCreditsRankingCondition(ranking)) {
        const fromCondition = creditsRankingToSort(ranking.value);
        if (fromCondition) {
            return {
                ...filters,
                ...fromCondition,
                conditions: [
                    ...others,
                    {
                        id: ranking.id || 'credits-ranking',
                        field: CREDITS_RANKING_FIELD,
                        operator: 'eq',
                        value: ranking.value,
                        groupId: ranking.groupId || 'customer_profile'
                    }
                ]
            };
        }
    }
    if (isSpendRankingCondition(ranking)) {
        const fromCondition = spendRankingToSort(ranking.value);
        if (fromCondition) {
            return {
                ...filters,
                ...fromCondition,
                conditions: [
                    ...others,
                    {
                        id: ranking.id || 'spend-ranking',
                        field: SPEND_RANKING_FIELD,
                        operator: 'eq',
                        value: ranking.value,
                        groupId: ranking.groupId || 'payments'
                    }
                ]
            };
        }
    }
    const fromCreditsSort = sortToCreditsRankingValue(filters.sortBy, filters.sortOrder);
    if (fromCreditsSort) {
        return {
            ...filters,
            conditions: [
                ...others,
                {
                    id: 'credits-ranking',
                    field: CREDITS_RANKING_FIELD,
                    operator: 'eq',
                    value: fromCreditsSort,
                    groupId: 'customer_profile'
                }
            ]
        };
    }
    const fromSpendSort = sortToSpendRankingValue(filters.sortBy, filters.sortOrder);
    if (fromSpendSort) {
        return {
            ...filters,
            conditions: [
                ...others,
                {
                    id: 'spend-ranking',
                    field: SPEND_RANKING_FIELD,
                    operator: 'eq',
                    value: fromSpendSort,
                    groupId: 'payments'
                }
            ]
        };
    }
    return {
        ...filters,
        conditions: others,
        sortBy: filters.sortBy || 'createdAt',
        sortOrder: filters.sortOrder === 'asc' ? 'asc' : 'desc'
    };
}
function customerSortPresetValue(filters = {}) {
    const by = filters?.sortBy || 'createdAt';
    const order = filters?.sortOrder === 'asc' ? 'asc' : 'desc';
    const match = CUSTOMER_SORT_OPTIONS.find((o)=>o.sortBy === by && o.sortOrder === order);
    return match?.value || 'newest';
}
function applyCustomerSortPreset(filters, presetValue) {
    const preset = CUSTOMER_SORT_OPTIONS.find((o)=>o.value === presetValue) || CUSTOMER_SORT_OPTIONS[0];
    // Strip ranking conditions first so sync derives them only from the new sort
    // (otherwise an old ranking condition wins and undoes the preset).
    return syncCustomerSpendRanking({
        ...filters,
        sortBy: preset.sortBy,
        sortOrder: preset.sortOrder,
        conditions: stripUiRankingConditions(filters.conditions)
    });
}
function sanitizeCustomerFilters(filters) {
    return syncCustomerSpendRanking({
        ...filters,
        search: filters?.search ?? '',
        teacherID: filters?.teacherID ?? '',
        conditionLogic: filters?.conditionLogic === 'OR' ? 'OR' : 'AND',
        conditions: Array.isArray(filters?.conditions) ? filters.conditions : [],
        groupLogics: filters?.groupLogics && typeof filters.groupLogics === 'object' ? filters.groupLogics : {},
        enabledGroups: filters?.enabledGroups && typeof filters.enabledGroups === 'object' ? filters.enabledGroups : {},
        sortBy: filters?.sortBy || 'createdAt',
        sortOrder: filters?.sortOrder === 'asc' ? 'asc' : 'desc'
    });
}
function hasActiveCustomerFilters(filters = {}) {
    if (String(filters?.search ?? '').trim()) return true;
    if (String(filters?.teacherID ?? '').trim()) return true;
    if (customerSortPresetValue(filters) !== 'newest') return true;
    return (Array.isArray(filters?.conditions) ? filters.conditions : []).some((c)=>{
        if (!c?.field || isUiRankingCondition(c)) return false;
        if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$dynamic$2d$list$2d$filter$2d$catalog$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["conditionHasValue"])(c)) return true;
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$dynamic$2d$list$2d$filter$2d$catalog$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isValuelessOperator"])(c?.operator || 'eq');
    });
}
function countAdvancedCustomerFilters(filters = {}) {
    return (Array.isArray(filters?.conditions) ? filters.conditions : []).filter((c)=>{
        if (!c?.field || isUiRankingCondition(c)) return false;
        if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$dynamic$2d$list$2d$filter$2d$catalog$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["conditionHasValue"])(c)) return true;
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$dynamic$2d$list$2d$filter$2d$catalog$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isValuelessOperator"])(c?.operator || 'eq');
    }).length;
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/lib/dashboardDetailsStore.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "setDashboardDetailsRequest",
    ()=>setDashboardDetailsRequest,
    "useDashboardDetailsRequest",
    ()=>useDashboardDetailsRequest
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
'use client';
;
// Holds the most recent "Show details" request in memory so the dashboard's
// details page (a client-side navigation, not a reload) can pick it back up
// without needing to serialize column `format` functions into the URL.
let current = null;
const listeners = new Set();
function setDashboardDetailsRequest(payload) {
    current = payload;
    listeners.forEach((listener)=>listener());
}
function subscribe(listener) {
    listeners.add(listener);
    return ()=>listeners.delete(listener);
}
function useDashboardDetailsRequest() {
    _s();
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSyncExternalStore"])(subscribe, {
        "useDashboardDetailsRequest.useSyncExternalStore": ()=>current
    }["useDashboardDetailsRequest.useSyncExternalStore"], {
        "useDashboardDetailsRequest.useSyncExternalStore": ()=>null
    }["useDashboardDetailsRequest.useSyncExternalStore"]);
}
_s(useDashboardDetailsRequest, "FpwL93IKMLJZuQQXefVtWynbBPQ=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSyncExternalStore"]
    ];
});
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/lib/dynamic-list-constants.js [app-client] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "CONDITION_LOGIC_OPTIONS",
    ()=>CONDITION_LOGIC_OPTIONS,
    "DYNAMIC_LIST_ENTITY_LABELS",
    ()=>DYNAMIC_LIST_ENTITY_LABELS,
    "DYNAMIC_LIST_ENTITY_TYPES",
    ()=>DYNAMIC_LIST_ENTITY_TYPES,
    "LISTS_PAGE_SIZE",
    ()=>LISTS_PAGE_SIZE,
    "MEMBERS_PAGE_SIZE",
    ()=>MEMBERS_PAGE_SIZE,
    "STATUS_OPTIONS",
    ()=>STATUS_OPTIONS,
    "UPLOAD_TYPE_OPTIONS",
    ()=>UPLOAD_TYPE_OPTIONS,
    "getDynamicListsHref",
    ()=>getDynamicListsHref
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$lead$2d$stages$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/lead-stages.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$lead$2d$source$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/lead-source.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$lead$2d$filter$2d$fields$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/lead-filter-fields.js [app-client] (ecmascript)");
;
const UPLOAD_TYPE_OPTIONS = [
    'manual',
    'bulk_upload',
    'form_submission',
    'incoming_sms',
    'incoming_email',
    'incoming_whatsapp',
    'incoming_call'
];
;
const CONDITION_LOGIC_OPTIONS = [
    'AND',
    'OR'
];
const DYNAMIC_LIST_ENTITY_TYPES = [
    'lead',
    'customer'
];
const DYNAMIC_LIST_ENTITY_LABELS = {
    lead: 'Leads',
    customer: 'Customers'
};
function getDynamicListsHref(entityType = 'lead') {
    return entityType === 'customer' ? '/ai-automation/dynamic-lists?entityType=customer' : '/ai-automation/dynamic-lists';
}
const STATUS_OPTIONS = [
    'active',
    'inactive'
];
const MEMBERS_PAGE_SIZE = 10;
const LISTS_PAGE_SIZE = 20;
;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/lib/dynamic-list-filter-catalog.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Dynamic List / Leads filter catalog from DanceStudio CRM Filter Reference.
 * 9 groups · field operators · value types for Filters sidebar + condition editor.
 */ __turbopack_context__.s([
    "ALL_FILTER_FIELDS",
    ()=>ALL_FILTER_FIELDS,
    "BETWEEN_OPERATORS",
    ()=>BETWEEN_OPERATORS,
    "FILTER_FIELD_MAP",
    ()=>FILTER_FIELD_MAP,
    "FILTER_GROUPS",
    ()=>FILTER_GROUPS,
    "FILTER_OPERATORS",
    ()=>FILTER_OPERATORS,
    "MULTI_VALUE_OPERATORS",
    ()=>MULTI_VALUE_OPERATORS,
    "OPERATOR_LABEL_MAP",
    ()=>OPERATOR_LABEL_MAP,
    "VALUELESS_OPERATORS",
    ()=>VALUELESS_OPERATORS,
    "conditionHasValue",
    ()=>conditionHasValue,
    "emptyValueForOperator",
    ()=>emptyValueForOperator,
    "getDefaultOperatorForField",
    ()=>getDefaultOperatorForField,
    "getFilterFieldDef",
    ()=>getFilterFieldDef,
    "getOperatorsForFilterField",
    ()=>getOperatorsForFilterField,
    "isBetweenOperator",
    ()=>isBetweenOperator,
    "isValuelessOperator",
    ()=>isValuelessOperator,
    "normalizeFilterConditionValue",
    ()=>normalizeFilterConditionValue,
    "serializeFilterConditionForApi",
    ()=>serializeFilterConditionForApi,
    "serializeFilterConditionForUi",
    ()=>serializeFilterConditionForUi,
    "usesMultiValueOperator",
    ()=>usesMultiValueOperator
]);
const FILTER_OPERATORS = [
    {
        value: 'eq',
        label: 'Equals'
    },
    {
        value: 'ne',
        label: 'Exclude'
    },
    {
        value: 'in',
        label: 'In'
    },
    {
        value: 'not_in',
        label: 'Not in'
    },
    {
        value: 'contains',
        label: 'Contains'
    },
    {
        value: 'starts_with',
        label: 'Starts with'
    },
    {
        value: 'exists',
        label: 'Exists'
    },
    {
        value: 'not_exists',
        label: 'Not exists'
    },
    {
        value: 'is_true',
        label: 'Is true'
    },
    {
        value: 'is_false',
        label: 'Is false'
    },
    {
        value: 'gt',
        label: 'Greater than'
    },
    {
        value: 'gte',
        label: 'Greater or equal'
    },
    {
        value: 'lt',
        label: 'Less than'
    },
    {
        value: 'lte',
        label: 'Less or equal'
    },
    {
        value: 'between',
        label: 'Between'
    },
    {
        value: 'within_days',
        label: 'Within days'
    },
    {
        value: 'older_than_days',
        label: 'Older than days'
    }
];
const OPERATOR_LABEL_MAP = Object.fromEntries(_c1 = FILTER_OPERATORS.map(_c = (o)=>[
        o.value,
        o.label
    ]));
_c2 = OPERATOR_LABEL_MAP;
const VALUELESS_OPERATORS = new Set([
    'exists',
    'not_exists',
    'is_true',
    'is_false'
]);
const MULTI_VALUE_OPERATORS = new Set([
    'in',
    'not_in',
    'ne'
]);
const BETWEEN_OPERATORS = new Set([
    'between'
]);
function usesMultiValueOperator(operator = 'eq') {
    return MULTI_VALUE_OPERATORS.has(operator);
}
function isValuelessOperator(operator = 'eq') {
    return VALUELESS_OPERATORS.has(operator);
}
function isBetweenOperator(operator = 'eq') {
    return BETWEEN_OPERATORS.has(operator);
}
const OP = {
    eq: 'eq',
    ne: 'ne',
    in: 'in',
    not_in: 'not_in',
    contains: 'contains',
    starts_with: 'starts_with',
    exists: 'exists',
    not_exists: 'not_exists',
    is_true: 'is_true',
    is_false: 'is_false',
    gt: 'gt',
    gte: 'gte',
    lt: 'lt',
    lte: 'lte',
    between: 'between',
    within_days: 'within_days',
    older_than_days: 'older_than_days'
};
function field(def) {
    return {
        operators: [
            OP.eq
        ],
        inputType: 'text',
        optionsKey: null,
        staticOptions: null,
        notes: '',
        ...def
    };
}
const FILTER_GROUPS = [
    {
        id: 'lead_profile',
        label: 'Lead Profile',
        description: 'Fields stored on the Lead document.',
        fields: [
            field({
                value: 'stage',
                label: 'Stage',
                inputType: 'select',
                optionsKey: 'stage',
                operators: [
                    OP.eq,
                    OP.ne,
                    OP.in,
                    OP.not_in
                ]
            }),
            field({
                value: 'uploadType',
                label: 'Upload type',
                inputType: 'select',
                optionsKey: 'uploadType',
                operators: [
                    OP.eq,
                    OP.ne,
                    OP.in,
                    OP.not_in
                ]
            }),
            field({
                value: 'reason',
                label: 'Reason',
                inputType: 'select',
                optionsKey: 'reason',
                operators: [
                    OP.eq,
                    OP.ne,
                    OP.in,
                    OP.contains,
                    OP.exists,
                    OP.not_exists
                ]
            }),
            field({
                value: 'bookingStatus',
                label: 'Booking status',
                inputType: 'select',
                optionsKey: 'bookingStatus',
                operators: [
                    OP.eq,
                    OP.ne
                ]
            }),
            field({
                value: 'isEscalated',
                label: 'Escalated',
                inputType: 'boolean',
                operators: [
                    OP.is_true,
                    OP.is_false
                ]
            }),
            field({
                value: 'assignedAiAgent',
                label: 'Assigned AI agent',
                inputType: 'text',
                operators: [
                    OP.eq,
                    OP.ne,
                    OP.exists,
                    OP.not_exists
                ]
            }),
            field({
                value: 'assignedHumanAgent',
                label: 'Assigned human agent',
                inputType: 'text',
                operators: [
                    OP.eq,
                    OP.ne,
                    OP.exists,
                    OP.not_exists
                ]
            }),
            field({
                value: 'name',
                label: 'Name',
                inputType: 'text',
                operators: [
                    OP.contains,
                    OP.starts_with,
                    OP.eq,
                    OP.ne
                ]
            }),
            field({
                value: 'email',
                label: 'Email',
                inputType: 'text',
                operators: [
                    OP.eq,
                    OP.ne,
                    OP.contains,
                    OP.exists
                ]
            }),
            field({
                value: 'phoneNumber',
                label: 'Phone number',
                inputType: 'text',
                operators: [
                    OP.exists,
                    OP.not_exists,
                    OP.starts_with
                ]
            }),
            field({
                value: 'location',
                label: 'Location (text)',
                inputType: 'text',
                operators: [
                    OP.eq,
                    OP.ne,
                    OP.contains,
                    OP.exists
                ]
            }),
            field({
                value: 'locationID',
                label: 'Location',
                inputType: 'select',
                optionsKey: 'locations',
                operators: [
                    OP.eq,
                    OP.ne,
                    OP.in,
                    OP.exists,
                    OP.not_exists
                ]
            }),
            field({
                value: 'formID',
                label: 'Form',
                inputType: 'select',
                optionsKey: 'forms',
                operators: [
                    OP.eq,
                    OP.exists,
                    OP.not_exists
                ]
            }),
            field({
                value: 'metadata',
                label: 'Metadata key',
                inputType: 'metadata',
                operators: [
                    OP.eq,
                    OP.ne,
                    OP.contains,
                    OP.exists,
                    OP.not_exists
                ],
                notes: 'Filter any metadata key, e.g. source_campaign'
            })
        ]
    },
    {
        id: 'utm',
        label: 'UTM / Attribution',
        description: 'Ad and traffic source parameters captured when the lead enters.',
        fields: [
            field({
                value: 'utm_source',
                label: 'UTM source',
                inputType: 'select',
                optionsKey: 'source',
                operators: [
                    OP.eq,
                    OP.ne,
                    OP.in,
                    OP.exists,
                    OP.not_exists
                ]
            }),
            field({
                value: 'utm_medium',
                label: 'UTM medium',
                inputType: 'text',
                operators: [
                    OP.eq,
                    OP.ne,
                    OP.contains,
                    OP.exists,
                    OP.not_exists
                ]
            }),
            field({
                value: 'utm_campaign',
                label: 'UTM campaign',
                inputType: 'text',
                operators: [
                    OP.eq,
                    OP.ne,
                    OP.contains,
                    OP.in,
                    OP.exists
                ]
            }),
            field({
                value: 'utm_term',
                label: 'UTM term',
                inputType: 'text',
                operators: [
                    OP.eq,
                    OP.contains,
                    OP.exists,
                    OP.not_exists
                ]
            }),
            field({
                value: 'utm_content',
                label: 'UTM content',
                inputType: 'text',
                operators: [
                    OP.eq,
                    OP.ne,
                    OP.contains,
                    OP.exists
                ]
            }),
            field({
                value: 'utm_keyword',
                label: 'UTM keyword',
                inputType: 'text',
                operators: [
                    OP.eq,
                    OP.contains,
                    OP.exists,
                    OP.not_exists
                ]
            }),
            field({
                value: 'utm_device',
                label: 'UTM device',
                inputType: 'select',
                staticOptions: [
                    'mobile',
                    'desktop',
                    'tablet'
                ],
                operators: [
                    OP.eq,
                    OP.ne,
                    OP.in,
                    OP.exists
                ]
            }),
            field({
                value: 'utm_browser',
                label: 'UTM browser',
                inputType: 'text',
                operators: [
                    OP.eq,
                    OP.ne,
                    OP.exists
                ]
            }),
            field({
                value: 'utm_os',
                label: 'UTM OS',
                inputType: 'select',
                staticOptions: [
                    'iOS',
                    'Android',
                    'Windows',
                    'macOS'
                ],
                operators: [
                    OP.eq,
                    OP.ne,
                    OP.in,
                    OP.exists
                ]
            }),
            field({
                value: 'utm_location',
                label: 'UTM location',
                inputType: 'text',
                operators: [
                    OP.eq,
                    OP.contains,
                    OP.exists
                ]
            }),
            field({
                value: 'utm_placement',
                label: 'UTM placement',
                inputType: 'text',
                operators: [
                    OP.eq,
                    OP.contains,
                    OP.exists
                ]
            }),
            field({
                value: 'utm_matchtype',
                label: 'UTM match type',
                inputType: 'select',
                staticOptions: [
                    'exact',
                    'phrase',
                    'broad'
                ],
                operators: [
                    OP.eq,
                    OP.ne,
                    OP.in,
                    OP.exists
                ]
            }),
            field({
                value: 'utm_network',
                label: 'UTM network',
                inputType: 'select',
                staticOptions: [
                    {
                        value: 'g',
                        label: 'Google Search (g)'
                    },
                    {
                        value: 'd',
                        label: 'Display (d)'
                    },
                    {
                        value: 'yt',
                        label: 'YouTube (yt)'
                    }
                ],
                operators: [
                    OP.eq,
                    OP.ne,
                    OP.in,
                    OP.exists
                ]
            }),
            field({
                value: 'utm_id',
                label: 'UTM id',
                inputType: 'text',
                operators: [
                    OP.eq,
                    OP.in,
                    OP.exists,
                    OP.not_exists
                ]
            })
        ]
    },
    {
        id: 'timing',
        label: 'lead create/update timing',
        description: 'Date-based filters on when the lead was created or last modified.',
        fields: [
            field({
                value: 'createdAt',
                label: 'Created at',
                inputType: 'date',
                operators: [
                    OP.eq,
                    OP.within_days,
                    OP.older_than_days,
                    OP.between,
                    OP.gt,
                    OP.lt
                ]
            }),
            field({
                value: 'updatedAt',
                label: 'Updated at',
                inputType: 'date',
                operators: [
                    OP.eq,
                    OP.within_days,
                    OP.older_than_days,
                    OP.between,
                    OP.gt,
                    OP.lt
                ]
            }),
            field({
                value: 'createdAtDayOfWeek',
                label: 'Created (day of week)',
                inputType: 'select',
                staticOptions: [
                    {
                        value: 'Mon',
                        label: 'Mon'
                    },
                    {
                        value: 'Tue',
                        label: 'Tue'
                    },
                    {
                        value: 'Wed',
                        label: 'Wed'
                    },
                    {
                        value: 'Thu',
                        label: 'Thu'
                    },
                    {
                        value: 'Fri',
                        label: 'Fri'
                    },
                    {
                        value: 'Sat',
                        label: 'Sat'
                    },
                    {
                        value: 'Sun',
                        label: 'Sun'
                    }
                ],
                operators: [
                    OP.in
                ]
            }),
            field({
                value: 'createdAtHour',
                label: 'Created (hour)',
                inputType: 'number',
                operators: [
                    OP.between,
                    OP.gte,
                    OP.lte
                ],
                notes: '0–23'
            })
        ]
    },
    {
        id: 'callback',
        label: 'Callback',
        description: 'Follow-up callback date scheduled on the lead.',
        fields: [
            field({
                value: 'callbackDate',
                label: 'Callback date',
                inputType: 'date',
                operators: [
                    OP.eq,
                    OP.between,
                    OP.gt,
                    OP.lt,
                    OP.within_days,
                    OP.older_than_days,
                    OP.exists,
                    OP.not_exists
                ]
            })
        ]
    },
    {
        id: 'sms',
        label: 'SMS Activity',
        description: 'Cross-collection lookup against SMS history.',
        fields: [
            field({
                value: 'sms.hasAny',
                label: 'Has any SMS',
                inputType: 'boolean',
                operators: [
                    OP.is_true,
                    OP.is_false
                ]
            }),
            field({
                value: 'sms.totalCount',
                label: 'SMS total count',
                inputType: 'number',
                operators: [
                    OP.eq,
                    OP.gt,
                    OP.gte,
                    OP.lt,
                    OP.lte
                ]
            }),
            field({
                value: 'sms.status',
                label: 'SMS status',
                inputType: 'select',
                staticOptions: [
                    'queued',
                    'sent',
                    'delivered',
                    'failed',
                    'undelivered',
                    'received'
                ],
                operators: [
                    OP.in,
                    OP.not_in
                ]
            }),
            field({
                value: 'sms.hasDelivered',
                label: 'Has delivered SMS',
                inputType: 'boolean',
                operators: [
                    OP.is_true,
                    OP.is_false
                ]
            }),
            field({
                value: 'sms.hasFailed',
                label: 'Has failed SMS',
                inputType: 'boolean',
                operators: [
                    OP.is_true,
                    OP.is_false
                ]
            }),
            field({
                value: 'sms.hasIncoming',
                label: 'Has incoming SMS',
                inputType: 'boolean',
                operators: [
                    OP.is_true,
                    OP.is_false
                ]
            }),
            field({
                value: 'sms.lastSentAt',
                label: 'SMS last sent at',
                inputType: 'date',
                operators: [
                    OP.eq,
                    OP.within_days,
                    OP.older_than_days,
                    OP.exists,
                    OP.not_exists
                ]
            }),
            field({
                value: 'sms.countInDays',
                label: 'SMS count in days',
                inputType: 'number',
                operators: [
                    OP.eq,
                    OP.gt,
                    OP.gte,
                    OP.lt,
                    OP.lte
                ]
            })
        ]
    },
    {
        id: 'email',
        label: 'Email Activity',
        description: 'Cross-collection lookup against email history.',
        fields: [
            field({
                value: 'email.hasAny',
                label: 'Has any email',
                inputType: 'boolean',
                operators: [
                    OP.is_true,
                    OP.is_false
                ]
            }),
            field({
                value: 'email.totalCount',
                label: 'Email total count',
                inputType: 'number',
                operators: [
                    OP.eq,
                    OP.gt,
                    OP.gte,
                    OP.lt,
                    OP.lte
                ]
            }),
            field({
                value: 'email.hasBounced',
                label: 'Has bounced email',
                inputType: 'boolean',
                operators: [
                    OP.is_true,
                    OP.is_false
                ]
            }),
            field({
                value: 'email.status',
                label: 'Email status',
                inputType: 'text',
                operators: [
                    OP.eq,
                    OP.ne,
                    OP.in
                ]
            }),
            field({
                value: 'email.lastSentAt',
                label: 'Email last sent at',
                inputType: 'date',
                operators: [
                    OP.eq,
                    OP.within_days,
                    OP.older_than_days,
                    OP.exists,
                    OP.not_exists
                ]
            }),
            field({
                value: 'email.subject',
                label: 'Email subject',
                inputType: 'text',
                operators: [
                    OP.contains,
                    OP.eq
                ]
            }),
            field({
                value: 'email.countInDays',
                label: 'Email count in days',
                inputType: 'number',
                operators: [
                    OP.gt,
                    OP.gte,
                    OP.lt,
                    OP.lte
                ]
            })
        ]
    },
    {
        id: 'ai_call',
        label: 'AI Call Activity',
        description: 'Cross-collection lookup against AI call details.',
        fields: [
            field({
                value: 'aiCall.hasAny',
                label: 'Has any AI call',
                inputType: 'boolean',
                operators: [
                    OP.is_true,
                    OP.is_false
                ]
            }),
            field({
                value: 'aiCall.totalCount',
                label: 'AI call total count',
                inputType: 'number',
                operators: [
                    OP.eq,
                    OP.gt,
                    OP.gte,
                    OP.lt,
                    OP.lte
                ]
            }),
            field({
                value: 'aiCall.status',
                label: 'AI call status',
                inputType: 'text',
                operators: [
                    OP.eq,
                    OP.ne,
                    OP.in
                ]
            }),
            field({
                value: 'aiCall.endedReason',
                label: 'AI call ended reason',
                inputType: 'select',
                staticOptions: [
                    'customer-ended-call',
                    'voicemail',
                    'assistant-error',
                    'no-answer'
                ],
                operators: [
                    OP.eq,
                    OP.ne,
                    OP.in,
                    OP.not_in,
                    OP.exists
                ]
            }),
            field({
                value: 'aiCall.hasTranscript',
                label: 'Has transcript',
                inputType: 'boolean',
                operators: [
                    OP.is_true,
                    OP.is_false
                ]
            }),
            field({
                value: 'aiCall.hasRecording',
                label: 'Has recording',
                inputType: 'boolean',
                operators: [
                    OP.is_true,
                    OP.is_false
                ]
            }),
            field({
                value: 'aiCall.successEvaluation',
                label: 'Success evaluation',
                inputType: 'select',
                staticOptions: [
                    'success',
                    'partial',
                    'failure'
                ],
                operators: [
                    OP.eq,
                    OP.ne,
                    OP.in,
                    OP.exists
                ]
            }),
            field({
                value: 'aiCall.lastCallAt',
                label: 'AI call last at',
                inputType: 'date',
                operators: [
                    OP.eq,
                    OP.within_days,
                    OP.older_than_days,
                    OP.exists,
                    OP.not_exists
                ]
            }),
            field({
                value: 'aiCall.countInDays',
                label: 'AI call count in days',
                inputType: 'number',
                operators: [
                    OP.gt,
                    OP.gte,
                    OP.lt,
                    OP.lte
                ]
            })
        ]
    },
    {
        id: 'human_call',
        label: 'Human Call Activity',
        description: 'Cross-collection lookup against human call history.',
        fields: [
            field({
                value: 'humanCall.hasAny',
                label: 'Has any human call',
                inputType: 'boolean',
                operators: [
                    OP.is_true,
                    OP.is_false
                ]
            }),
            field({
                value: 'humanCall.totalCount',
                label: 'Human call total count',
                inputType: 'number',
                operators: [
                    OP.eq,
                    OP.gt,
                    OP.gte,
                    OP.lt,
                    OP.lte
                ]
            }),
            field({
                value: 'humanCall.status',
                label: 'Human call status',
                inputType: 'select',
                staticOptions: [
                    'queued',
                    'initiated',
                    'failed'
                ],
                operators: [
                    OP.eq,
                    OP.ne,
                    OP.in
                ]
            }),
            field({
                value: 'humanCall.lastCallAt',
                label: 'Human call last at',
                inputType: 'date',
                operators: [
                    OP.eq,
                    OP.within_days,
                    OP.older_than_days,
                    OP.exists,
                    OP.not_exists
                ]
            }),
            field({
                value: 'humanCall.countInDays',
                label: 'Human call count in days',
                inputType: 'number',
                operators: [
                    OP.gt,
                    OP.gte,
                    OP.lt,
                    OP.lte
                ]
            })
        ]
    },
    {
        id: 'campaign',
        label: 'Campaign Activity',
        description: 'Cross-collection lookup against campaigns and steps.',
        fields: [
            field({
                value: 'campaign.isActive',
                label: 'In active campaign',
                inputType: 'boolean',
                operators: [
                    OP.is_true,
                    OP.is_false
                ]
            }),
            field({
                value: 'campaign.totalCount',
                label: 'Campaign total count',
                inputType: 'number',
                operators: [
                    OP.eq,
                    OP.gt,
                    OP.gte,
                    OP.lt,
                    OP.lte
                ]
            }),
            field({
                value: 'campaign.status',
                label: 'Campaign status',
                inputType: 'select',
                staticOptions: [
                    'active',
                    'inactive'
                ],
                operators: [
                    OP.eq,
                    OP.ne,
                    OP.in
                ]
            }),
            field({
                value: 'campaign.hasCompleted',
                label: 'Has completed campaign',
                inputType: 'boolean',
                operators: [
                    OP.is_true,
                    OP.is_false
                ]
            }),
            field({
                value: 'campaign.lastStartedAt',
                label: 'Campaign last started at',
                inputType: 'date',
                operators: [
                    OP.eq,
                    OP.within_days,
                    OP.older_than_days,
                    OP.exists,
                    OP.not_exists
                ]
            }),
            field({
                value: 'campaign.stepType',
                label: 'Campaign step type',
                inputType: 'select',
                staticOptions: [
                    'email',
                    'sms',
                    'aiCall',
                    'humanCall'
                ],
                operators: [
                    OP.in,
                    OP.not_in
                ]
            }),
            field({
                value: 'campaign.stepStatus',
                label: 'Campaign step status',
                inputType: 'select',
                staticOptions: [
                    'scheduled',
                    'completed',
                    'failed',
                    'skipped'
                ],
                operators: [
                    OP.in,
                    OP.not_in
                ]
            }),
            field({
                value: 'campaign.hasFailedStep',
                label: 'Has failed step',
                inputType: 'boolean',
                operators: [
                    OP.is_true,
                    OP.is_false
                ]
            })
        ]
    },
    {
        id: 'conversion',
        label: 'Conversion',
        description: 'Whether the lead has converted to a customer.',
        fields: [
            field({
                value: 'convertedCustomerID',
                label: 'Converted customer',
                inputType: 'boolean',
                operators: [
                    OP.exists,
                    OP.not_exists
                ]
            }),
            field({
                value: 'isConverted',
                label: 'Is converted',
                inputType: 'boolean',
                operators: [
                    OP.is_true,
                    OP.is_false
                ]
            })
        ]
    }
];
const ALL_FILTER_FIELDS = FILTER_GROUPS.flatMap(_c3 = (group)=>group.fields);
_c4 = ALL_FILTER_FIELDS;
const FILTER_FIELD_MAP = Object.fromEntries(_c6 = ALL_FILTER_FIELDS.map(_c5 = (f)=>[
        f.value,
        f
    ]));
_c7 = FILTER_FIELD_MAP;
function getFilterFieldDef(field) {
    return FILTER_FIELD_MAP[field] || null;
}
function getOperatorsForFilterField(field) {
    const def = getFilterFieldDef(field);
    if (!def) return FILTER_OPERATORS.filter((o)=>[
            'eq',
            'ne',
            'in'
        ].includes(o.value));
    return FILTER_OPERATORS.filter((o)=>def.operators.includes(o.value)).map((o)=>{
        // Date equality: send operator "eq" with YYYY-MM-DD; label reads naturally as "On".
        if (def.inputType === 'date' && o.value === 'eq') {
            return {
                ...o,
                label: 'On'
            };
        }
        if (def.inputType === 'date' && o.value === 'gt') {
            return {
                ...o,
                label: 'After'
            };
        }
        if (def.inputType === 'date' && o.value === 'lt') {
            return {
                ...o,
                label: 'Before'
            };
        }
        return o;
    });
}
function getDefaultOperatorForField(field) {
    const def = getFilterFieldDef(field);
    return def?.operators?.[0] || 'eq';
}
function emptyValueForOperator(operator) {
    if (isValuelessOperator(operator)) return true;
    if (usesMultiValueOperator(operator)) return [];
    if (isBetweenOperator(operator)) return {
        from: '',
        to: ''
    };
    return '';
}
function conditionHasValue(condition) {
    if (!condition?.field) return false;
    const operator = condition.operator || 'eq';
    if (isValuelessOperator(operator)) return true;
    const value = condition.value;
    if (usesMultiValueOperator(operator)) {
        if (Array.isArray(value)) return value.length > 0;
        return String(value ?? '').trim() !== '';
    }
    if (isBetweenOperator(operator)) {
        const from = typeof value === 'object' && value ? value.from : Array.isArray(value) ? value[0] : '';
        const to = typeof value === 'object' && value ? value.to : Array.isArray(value) ? value[1] : '';
        return String(from ?? '').trim() !== '' && String(to ?? '').trim() !== '';
    }
    if (typeof value === 'object' && value && 'key' in value) {
        return String(value.key ?? '').trim() !== '' && (isValuelessOperator(operator) || String(value.value ?? '').trim() !== '');
    }
    return String(value ?? '').trim() !== '';
}
function normalizeFilterConditionValue(operator, value, field) {
    if (isValuelessOperator(operator)) return true;
    if (usesMultiValueOperator(operator)) {
        if (Array.isArray(value)) return value.map((v)=>String(v).trim()).filter(Boolean);
        if (typeof value === 'string') {
            return value.split(',').map((v)=>v.trim()).filter(Boolean);
        }
        return [];
    }
    if (isBetweenOperator(operator)) {
        if (value && typeof value === 'object' && !Array.isArray(value)) {
            return {
                from: String(value.from ?? '').trim(),
                to: String(value.to ?? '').trim()
            };
        }
        if (Array.isArray(value)) {
            return {
                from: String(value[0] ?? '').trim(),
                to: String(value[1] ?? '').trim()
            };
        }
        return {
            from: '',
            to: ''
        };
    }
    if (field === 'metadata' && value && typeof value === 'object') {
        return {
            key: String(value.key ?? '').trim(),
            value: String(value.value ?? '').trim()
        };
    }
    if (Array.isArray(value)) return String(value[0] ?? '').trim();
    return String(value ?? '').trim();
}
function serializeFilterConditionForApi(condition) {
    const field = condition?.field;
    const operator = condition?.operator || getDefaultOperatorForField(field);
    const value = normalizeFilterConditionValue(operator, condition?.value, field);
    if (field === 'metadata' && value && typeof value === 'object') {
        return {
            field: value.key ? `metadata.${value.key}` : 'metadata',
            operator,
            value: isValuelessOperator(operator) ? true : value.value
        };
    }
    if (isBetweenOperator(operator) && value && typeof value === 'object') {
        return {
            field,
            operator,
            value: [
                value.from,
                value.to
            ]
        };
    }
    return {
        field,
        operator,
        value: isValuelessOperator(operator) ? true : value
    };
}
function serializeFilterConditionForUi(condition) {
    return {
        ...serializeFilterConditionForApi(condition),
        ...condition?.groupId ? {
            groupId: condition.groupId
        } : {},
        ...condition?.id ? {
            id: condition.id
        } : {}
    };
}
var _c, _c1, _c2, _c3, _c4, _c5, _c6, _c7;
__turbopack_context__.k.register(_c, "OPERATOR_LABEL_MAP$Object.fromEntries$FILTER_OPERATORS.map");
__turbopack_context__.k.register(_c1, "OPERATOR_LABEL_MAP$Object.fromEntries");
__turbopack_context__.k.register(_c2, "OPERATOR_LABEL_MAP");
__turbopack_context__.k.register(_c3, "ALL_FILTER_FIELDS$FILTER_GROUPS.flatMap");
__turbopack_context__.k.register(_c4, "ALL_FILTER_FIELDS");
__turbopack_context__.k.register(_c5, "FILTER_FIELD_MAP$Object.fromEntries$ALL_FILTER_FIELDS.map");
__turbopack_context__.k.register(_c6, "FILTER_FIELD_MAP$Object.fromEntries");
__turbopack_context__.k.register(_c7, "FILTER_FIELD_MAP");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/lib/dynamic-list-normalize.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "SYSTEM_REASON_CODES",
    ()=>SYSTEM_REASON_CODES,
    "buildConditionGroupsFromFlat",
    ()=>buildConditionGroupsFromFlat,
    "buildDynamicListPayload",
    ()=>buildDynamicListPayload,
    "createEmptyCondition",
    ()=>createEmptyCondition,
    "createEmptyConditionGroup",
    ()=>createEmptyConditionGroup,
    "extractDynamicListsList",
    ()=>extractDynamicListsList,
    "findCatalogGroupIdForField",
    ()=>findCatalogGroupIdForField,
    "flattenConditionGroups",
    ()=>flattenConditionGroups,
    "formatConditionValueLabel",
    ()=>formatConditionValueLabel,
    "formatDateTime",
    ()=>formatDateTime,
    "formatFieldDisplayValue",
    ()=>formatFieldDisplayValue,
    "formatReasonLabel",
    ()=>formatReasonLabel,
    "getFieldValueOptions",
    ()=>getFieldValueOptions,
    "getLeadReasonOptions",
    ()=>getLeadReasonOptions,
    "getListId",
    ()=>getListId,
    "getListName",
    ()=>getListName,
    "getMembershipLead",
    ()=>getMembershipLead,
    "groupWorkflowsByListId",
    ()=>groupWorkflowsByListId,
    "inferCatalogGroupId",
    ()=>inferCatalogGroupId,
    "isSystemLeadReason",
    ()=>isSystemLeadReason,
    "normalizeConditionValue",
    ()=>normalizeConditionValue,
    "normalizeConditionsForForm",
    ()=>normalizeConditionsForForm,
    "normalizeDynamicListFromApi",
    ()=>normalizeDynamicListFromApi,
    "statusBadgeClass",
    ()=>statusBadgeClass,
    "summarizeCondition",
    ()=>summarizeCondition,
    "summarizeConditions",
    ()=>summarizeConditions
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$lead$2d$filter$2d$fields$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/lead-filter-fields.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$customer$2d$filter$2d$fields$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/lib/customer-filter-fields.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$dynamic$2d$list$2d$filter$2d$catalog$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/dynamic-list-filter-catalog.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$customer$2d$list$2d$filter$2d$catalog$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/lib/customer-list-filter-catalog.js [app-client] (ecmascript) <locals>");
;
;
;
;
function formatFieldDisplayValue(value) {
    if (value === null || value === undefined) return '';
    const str = String(value).trim();
    if (!str) return '';
    return str.replace(/[_-]/g, ' ').split(/\s+/).map((word)=>word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
}
function getMembershipLead(membership) {
    const lead = membership?.leadID || membership?.lead || {};
    const id = lead._id || lead.id || '';
    if (!id) return null;
    return {
        _id: id,
        name: lead.name || '',
        email: lead.email || '',
        phoneNumber: lead.phoneNumber || '',
        stage: lead.stage || '',
        uploadType: lead.uploadType || '',
        reason: lead.reason || '',
        location: lead.location || '',
        locationID: lead.locationID || '',
        utm_source: lead.utm_source || lead.source || ''
    };
}
function formatDateTime(iso) {
    if (!iso) return '';
    const d = new Date(iso);
    if (Number.isNaN(d.getTime())) return '';
    return new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: 'short',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit'
    }).format(d);
}
function statusBadgeClass(status) {
    const s = String(status || '').toLowerCase();
    if (s === 'active') return 'bg-emerald-500/15 text-emerald-700 dark:text-emerald-300';
    if (s === 'inactive') return 'bg-muted text-muted-foreground';
    return 'bg-muted text-muted-foreground';
}
function getListId(list) {
    if (!list) return '';
    if (typeof list === 'string') return list;
    return list._id || list.id || '';
}
function getListName(list) {
    if (!list || typeof list === 'string') return '';
    return list.name || '';
}
/** Known lead reason codes that need a specific label rather than generic Title Case. */ const REASON_LABEL_OVERRIDES = {
    wedding_dance: 'Wedding Dance',
    special_event: 'Special Event',
    stay_in_shape: 'Stay in Shape',
    stay_in_shap: 'Stay in Shape',
    meet_new_people: 'Meet New People',
    try_something_new: 'Try Something New',
    have_fun: 'Have Fun'
};
const SYSTEM_REASON_CODES = new Set([
    'special_event',
    'stay_in_shape',
    'stay_in_shap',
    'meet_new_people',
    'try_something_new',
    'wedding_dance',
    'have_fun'
]);
function isSystemLeadReason(reason) {
    if (!reason) return false;
    if (reason.isSystem) return true;
    const code = String(reason.reasonCode || reason.value || reason.name || '').trim().toLowerCase().replace(/\s+/g, '_');
    return SYSTEM_REASON_CODES.has(code);
}
function formatReasonLabel(reason, leadReasons = []) {
    if (reason === null || reason === undefined || String(reason).trim() === '') {
        return 'Default (any reason)';
    }
    const code = String(reason).trim();
    const codeKey = code.toLowerCase();
    if (REASON_LABEL_OVERRIDES[codeKey]) return REASON_LABEL_OVERRIDES[codeKey];
    const match = getLeadReasonOptions(leadReasons).find((o)=>String(o.value).trim() === code || String(o.value).trim().toLowerCase() === codeKey);
    const catalogLabel = String(match?.label || '').trim();
    if (catalogLabel) {
        const catalogKey = catalogLabel.toLowerCase();
        if (REASON_LABEL_OVERRIDES[catalogKey]) return REASON_LABEL_OVERRIDES[catalogKey];
        // Catalog stored the code as the name (e.g. "special_event") — humanize it.
        if (/[_-]/.test(catalogLabel) || catalogLabel.toLowerCase() === codeKey) {
            return formatFieldDisplayValue(catalogLabel);
        }
        return catalogLabel;
    }
    return formatFieldDisplayValue(code);
}
function getLeadReasonOptions(leadReasons = []) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$lead$2d$filter$2d$fields$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getLeadReasonOptions"])(leadReasons);
}
function getFieldValueOptions(field, context = {}) {
    const leadReasons = Array.isArray(context) ? context : context?.leadReasons || [];
    const locations = context?.locations || [];
    const forms = context?.forms || [];
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$lead$2d$filter$2d$fields$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getFieldValueOptions"])(field, {
        leadReasons,
        locations,
        forms
    });
}
function formatConditionValueLabel(field, value, context = {}) {
    const leadReasons = Array.isArray(context) ? context : context?.leadReasons || [];
    const locations = context?.locations || [];
    const forms = context?.forms || [];
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$lead$2d$filter$2d$fields$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatConditionValueLabel"])(field, value, {
        leadReasons,
        locations,
        forms
    });
}
function uid(prefix = 'id') {
    return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
}
function createEmptyCondition(overrides = {}) {
    return {
        id: uid('cond'),
        field: '',
        operator: 'eq',
        value: '',
        ...overrides
    };
}
function createEmptyConditionGroup(overrides = {}) {
    return {
        id: uid('group'),
        catalogGroupId: '',
        logic: 'AND',
        conditions: [],
        ...overrides
    };
}
function findCatalogGroupIdForField(field, entityType = 'lead') {
    if (!field) return '';
    const catalogGroups = entityType === 'customer' ? __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$customer$2d$list$2d$filter$2d$catalog$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["CUSTOMER_FILTER_GROUPS"] : __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$dynamic$2d$list$2d$filter$2d$catalog$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FILTER_GROUPS"];
    return catalogGroups.find((g)=>g.fields.some((f)=>f.value === field))?.id || '';
}
function inferCatalogGroupId(group, entityType = 'lead') {
    if (group?.catalogGroupId) return group.catalogGroupId;
    for (const condition of group?.conditions || []){
        const resolved = findCatalogGroupIdForField(condition?.field, entityType);
        if (resolved) return resolved;
    }
    return '';
}
function buildConditionGroupsFromFlat({ conditions = [], groupLogics = {}, conditionGroups, entityType = 'lead' } = {}) {
    const catalogGroups = entityType === 'customer' ? __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$customer$2d$list$2d$filter$2d$catalog$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["CUSTOMER_FILTER_GROUPS"] : __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$dynamic$2d$list$2d$filter$2d$catalog$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FILTER_GROUPS"];
    if (Array.isArray(conditionGroups) && conditionGroups.length > 0) {
        return conditionGroups.map((g, index)=>{
            const normalizedConditions = normalizeConditionsForForm(g.conditions || []).map((c)=>({
                    ...c,
                    groupId: g.id || c.groupId
                }));
            const catalogGroupId = inferCatalogGroupId({
                catalogGroupId: g.catalogGroupId,
                conditions: normalizedConditions
            }, entityType);
            return {
                id: g.id || uid(`group-${index}`),
                catalogGroupId,
                logic: g.logic === 'OR' ? 'OR' : 'AND',
                conditions: normalizedConditions
            };
        });
    }
    const normalized = normalizeConditionsForForm(conditions);
    if (normalized.length === 0 || normalized.length === 1 && !normalized[0].field) {
        return [];
    }
    const byGroup = new Map();
    for (const condition of normalized){
        const key = condition.groupId || 'ungrouped';
        if (!byGroup.has(key)) byGroup.set(key, []);
        byGroup.get(key).push(condition);
    }
    return Array.from(byGroup.entries()).map(([groupId, groupConditions], index)=>{
        const catalogGroup = findCatalogGroupIdForField(groupConditions[0]?.field, entityType) || (catalogGroups.some((g)=>g.id === groupId) ? groupId : '');
        return {
            id: uid(`group-${index}`),
            catalogGroupId: catalogGroup,
            logic: groupLogics?.[groupId] === 'OR' ? 'OR' : 'AND',
            conditions: groupConditions
        };
    });
}
function flattenConditionGroups(groups = []) {
    const conditionGroups = [];
    const flatConditions = [];
    const groupLogics = {};
    for (const group of groups){
        const valid = (group.conditions || []).filter((c)=>c?.field);
        if (valid.length === 0) continue;
        const logic = group.logic === 'OR' ? 'OR' : 'AND';
        const instanceId = group.id || uid('group');
        const catalogGroupId = group.catalogGroupId || '';
        // Prefer unique instance id so two "Lead Profile" blocks stay separate.
        groupLogics[instanceId] = logic;
        const serialized = valid.map((c)=>({
                id: c.id,
                field: c.field,
                operator: c.operator,
                value: c.value,
                groupId: instanceId,
                ...catalogGroupId ? {
                    catalogGroupId
                } : {}
            }));
        flatConditions.push(...serialized);
        conditionGroups.push({
            id: instanceId,
            catalogGroupId: catalogGroupId || undefined,
            logic,
            conditions: serialized.map(({ field, operator, value })=>({
                    field,
                    operator,
                    value
                }))
        });
    }
    return {
        conditions: flatConditions,
        groupLogics,
        conditionGroups
    };
}
function normalizeConditionValue(operator, value) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$lead$2d$filter$2d$fields$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["normalizeConditionValue"])(operator, value);
}
function normalizeConditionsForForm(conditions) {
    if (!Array.isArray(conditions) || conditions.length === 0) return [
        createEmptyCondition()
    ];
    return conditions.map((c, index)=>{
        const operator = c?.operator || 'eq';
        const value = normalizeConditionValue(operator, c?.value);
        const multi = operator === 'in' || operator === 'ne' || operator === 'not_in';
        return {
            id: c?.id || `${c?.field || 'stage'}-${index}`,
            field: c?.field || 'stage',
            operator,
            value: multi || operator === 'between' || typeof value === 'object' ? value : operator === 'exists' || operator === 'not_exists' || operator === 'is_true' || operator === 'is_false' ? true : String(value || ''),
            ...c?.groupId ? {
                groupId: c.groupId
            } : {}
        };
    });
}
function normalizeDynamicListFromApi(list) {
    if (!list || typeof list !== 'object') return null;
    return {
        ...list,
        _id: list._id || list.id,
        name: String(list.name ?? ''),
        description: String(list.description ?? ''),
        status: list.status === 'inactive' ? 'inactive' : 'active',
        entityType: list.entityType === 'customer' ? 'customer' : 'lead',
        conditionLogic: list.conditionLogic === 'OR' ? 'OR' : 'AND',
        isFavorite: Boolean(list.isFavorite),
        memberCount: Number(list.memberCount ?? 0),
        conditions: normalizeConditionsForForm(list.conditions)
    };
}
function buildDynamicListPayload(form) {
    const rawConditions = (form.conditions || []).map((c)=>{
        const operator = c.operator || 'eq';
        const value = normalizeConditionValue(operator, c.value);
        let next;
        if (operator === 'exists' || operator === 'not_exists' || operator === 'is_true' || operator === 'is_false') {
            next = {
                field: c.field,
                operator,
                value: true
            };
        } else if (operator === 'between' && value && typeof value === 'object' && !Array.isArray(value)) {
            next = {
                field: c.field,
                operator,
                value: [
                    value.from,
                    value.to
                ]
            };
        } else {
            next = {
                field: c.field,
                operator,
                value: operator === 'in' || operator === 'ne' || operator === 'not_in' ? value : value
            };
        }
        if (c.groupId) next.groupId = c.groupId;
        return next;
    }).filter((c)=>{
        if (!c.field) return false;
        if (c.operator === 'exists' || c.operator === 'not_exists' || c.operator === 'is_true' || c.operator === 'is_false') {
            return true;
        }
        if (c.operator === 'in' || c.operator === 'ne' || c.operator === 'not_in') {
            return Array.isArray(c.value) && c.value.length > 0;
        }
        if (c.operator === 'between') {
            return Array.isArray(c.value) && c.value.length === 2 && String(c.value[0]).trim() && String(c.value[1]).trim();
        }
        if (c.value && typeof c.value === 'object') return true;
        return String(c.value || '').trim() !== '';
    });
    const groupLogics = form.groupLogics && typeof form.groupLogics === 'object' ? form.groupLogics : {};
    const byGroup = new Map();
    for (const condition of rawConditions){
        const groupId = condition.groupId || 'ungrouped';
        if (!byGroup.has(groupId)) byGroup.set(groupId, []);
        byGroup.get(groupId).push({
            field: condition.field,
            operator: condition.operator,
            value: condition.value
        });
    }
    const conditions = rawConditions.map(({ field, operator, value })=>({
            field,
            operator,
            value
        }));
    const payload = {
        name: String(form.name || '').trim(),
        description: String(form.description || '').trim(),
        entityType: form.entityType === 'customer' ? 'customer' : 'lead',
        conditionLogic: form.conditionLogic === 'OR' ? 'OR' : 'AND',
        conditions,
        status: form.status === 'inactive' ? 'inactive' : 'active'
    };
    if (byGroup.size > 1 || Object.keys(groupLogics).length > 0) {
        if (Array.isArray(form.conditionGroups) && form.conditionGroups.length > 0) {
            payload.conditionGroups = form.conditionGroups.map((group)=>({
                    id: group.id,
                    ...group.catalogGroupId ? {
                        catalogGroupId: group.catalogGroupId
                    } : {},
                    logic: group.logic === 'OR' ? 'OR' : 'AND',
                    conditions: (group.conditions || []).map(({ field, operator, value })=>({
                            field,
                            operator,
                            value
                        }))
                }));
        } else {
            payload.conditionGroups = Array.from(byGroup.entries()).map(([groupId, groupConditions])=>({
                    id: groupId,
                    logic: groupLogics[groupId] === 'OR' ? 'OR' : 'AND',
                    conditions: groupConditions
                }));
        }
    }
    return payload;
}
function summarizeCondition(condition, context = {}, entityType = 'lead') {
    const leadReasons = Array.isArray(context) ? context : context?.leadReasons || [];
    const locations = context?.locations || [];
    const forms = context?.forms || [];
    const teachers = context?.teachers || [];
    const tags = context?.tags || [];
    const memberships = context?.memberships || [];
    const packages = context?.packages || [];
    const fieldDef = entityType === 'customer' ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$customer$2d$filter$2d$fields$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["getConditionFieldDef"])(condition?.field) : (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$lead$2d$filter$2d$fields$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getConditionFieldDef"])(condition?.field);
    const field = fieldDef?.label || formatFieldDisplayValue(condition?.field || 'field');
    const operator = condition?.operator || 'eq';
    const value = condition?.value;
    const formatValue = (v)=>entityType === 'customer' ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$customer$2d$filter$2d$fields$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["formatConditionValueLabel"])(condition?.field, v, {
            locations,
            teachers,
            tags,
            memberships,
            packages,
            leadReasons
        }) : (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$lead$2d$filter$2d$fields$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatConditionValueLabel"])(condition?.field, v, {
            leadReasons,
            locations,
            forms
        });
    if (operator === 'exists') return `${field} exists`;
    if (operator === 'not_exists') return `${field} not exists`;
    if (operator === 'is_true') return `${field} is true`;
    if (operator === 'is_false') return `${field} is false`;
    if (operator === 'in' && Array.isArray(value)) {
        return `${field} is one of [${value.map(formatValue).join(', ')}]`;
    }
    if (operator === 'not_in' && Array.isArray(value)) {
        return `${field} not in [${value.map(formatValue).join(', ')}]`;
    }
    if (operator === 'ne' && Array.isArray(value)) {
        const display = value.map(formatValue).join(', ');
        return condition?.field === 'search' ? `Search exclude [${display}]` : `${field} exclude [${display}]`;
    }
    if (operator === 'within_days') return `${field} within last ${formatValue(value)} days`;
    if (operator === 'older_than_days') return `${field} older than ${formatValue(value)} days`;
    if (operator === 'between') {
        const from = value && typeof value === 'object' && !Array.isArray(value) ? value.from : value?.[0];
        const to = value && typeof value === 'object' && !Array.isArray(value) ? value.to : value?.[1];
        return `${field} between ${formatValue(from)} and ${formatValue(to)}`;
    }
    const opLabel = operator === 'eq' ? '=' : operator === 'ne' ? 'exclude' : operator;
    const display = Array.isArray(value) ? value.map(formatValue).join(', ') : formatValue(value);
    return `${field} ${opLabel} ${display}`;
}
function summarizeConditions(list, context = {}, entityType = 'lead') {
    const leadReasons = Array.isArray(context) ? context : context?.leadReasons || [];
    const locations = context?.locations || [];
    const forms = context?.forms || [];
    const conditions = Array.isArray(list?.conditions) ? list.conditions : [];
    if (conditions.length === 0) return 'No conditions';
    const logic = list?.conditionLogic === 'OR' ? ' OR ' : ' AND ';
    const resolvedEntity = list?.entityType || entityType;
    return conditions.map((c)=>summarizeCondition(c, {
            leadReasons,
            locations,
            forms,
            ...context
        }, resolvedEntity)).join(logic);
}
function extractDynamicListsList(result) {
    const data = result?.data;
    if (Array.isArray(data?.lists)) return data.lists;
    if (Array.isArray(data)) return data;
    return [];
}
function groupWorkflowsByListId(workflows = []) {
    const map = new Map();
    for (const wf of workflows){
        const listId = getListId(wf?.listID);
        if (!listId) continue;
        if (!map.has(listId)) map.set(listId, []);
        map.get(listId).push(wf);
    }
    return map;
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
"[project]/lib/hooks/useOwnerDashboardPage.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "comparisonWindows",
    ()=>comparisonWindows,
    "delta",
    ()=>delta,
    "pointDelta",
    ()=>pointDelta,
    "summarize",
    ()=>summarize,
    "useOwnerDashboardPage",
    ()=>useOwnerDashboardPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$hooks$2f$useAnalyticsOverview$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/hooks/useAnalyticsOverview.js [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
'use client';
;
;
const DAY_MS = 24 * 60 * 60 * 1000;
/**
 * Normalises either supported range shape (a number of days, or a
 * { from, to } YYYY-MM-DD pair) into concrete Date bounds so we can derive
 * the two comparison windows from it.
 */ function resolveWindow(range) {
    const to = new Date();
    const from = new Date(to.getTime() - (Number(range) || 30) * DAY_MS);
    return {
        from,
        to
    };
}
const DATE_ONLY = /^\d{4}-\d{2}-\d{2}$/;
/** 'YYYY-MM-DD' shifted by whole calendar days/years (plain date arithmetic, no timezone). */ function shiftDate(dateStr, { days = 0, years = 0 } = {}) {
    const [y, m, d] = dateStr.split('-').map(Number);
    return new Date(Date.UTC(y - years, m - 1, d - days)).toISOString().slice(0, 10);
}
function comparisonWindows(range) {
    // Calendar-based ranges are compared by calendar, and the backend places them on
    // the studio's days: today vs the same hours yesterday / last year, and a picked
    // date range vs the equally long run of days before it / a year earlier.
    if (range === 0) {
        return {
            priorPeriod: {
                period: 'today',
                offsetDays: 1
            },
            priorYear: {
                period: 'today',
                offsetYears: 1
            }
        };
    }
    if (range && typeof range === 'object' && DATE_ONLY.test(range.from) && DATE_ONLY.test(range.to)) {
        const lengthDays = Math.round((Date.parse(range.to) - Date.parse(range.from)) / DAY_MS) + 1;
        const priorTo = shiftDate(range.from, {
            days: 1
        });
        return {
            priorPeriod: {
                from: shiftDate(priorTo, {
                    days: lengthDays - 1
                }),
                to: priorTo
            },
            priorYear: {
                from: shiftDate(range.from, {
                    years: 1
                }),
                to: shiftDate(range.to, {
                    years: 1
                })
            }
        };
    }
    const { from, to } = resolveWindow(range);
    const lengthMs = to.getTime() - from.getTime();
    // Exact timestamps, not whole days: the prior period must be the same length
    // as the current window and end the instant before it starts (the old
    // day-rounded bounds left a gap and a different length, skewing every MoM).
    // "Today" is shorter than a day, so it compares against the same hours
    // yesterday rather than the few hours just before midnight.
    const shiftMs = lengthMs + 1;
    const prevFrom = new Date(from.getTime() - shiftMs);
    const prevTo = new Date(to.getTime() - shiftMs);
    const yearFrom = new Date(from);
    yearFrom.setFullYear(yearFrom.getFullYear() - 1);
    const yearTo = new Date(to);
    yearTo.setFullYear(yearTo.getFullYear() - 1);
    return {
        priorPeriod: {
            from: prevFrom.toISOString(),
            to: prevTo.toISOString()
        },
        priorYear: {
            from: yearFrom.toISOString(),
            to: yearTo.toISOString()
        }
    };
}
const sum = (rows, key)=>(rows || []).reduce((acc, r)=>acc + (Number(r?.[key]) || 0), 0);
function summarize(data) {
    if (!data) return null;
    const { revenue, lessons, funnel, studentHealth } = data;
    const utilization = (lessons?.instructorUtilization || []).filter((t)=>t.weeklyCapacity > 0);
    const capacityPerWeek = sum(utilization, 'weeklyCapacity');
    const actualPerWeek = sum(utilization, 'actualPerWeek');
    return {
        // Prefer the backend's de-duplicated totals: summing the per-studio rows
        // double-counts anything attached to more than one studio. The sum is only a
        // fallback for an older backend that doesn't send them.
        revenue: revenue ? revenue.total ?? sum(revenue.byStudio, 'revenue') : null,
        outstanding: revenue ? Number(revenue.totalOutstanding) || 0 : null,
        lessons: lessons ? lessons.total ?? sum(lessons.byStudio, 'count') : null,
        scheduled: lessons ? lessons.scheduledTotal ?? sum(lessons.forecastByStudio, 'scheduled') : null,
        scheduledToday: lessons ? Number(lessons.scheduledToday) || 0 : null,
        leads: funnel ? Number(funnel.report1?.leadCount) || 0 : null,
        introsBooked: funnel ? Number(funnel.report1?.introBookedCount) || 0 : null,
        convertedLeads: funnel ? Number(funnel.report1?.convertedCount) || 0 : null,
        // Intro lessons marked completed in the window. report2.introCount (this
        // window's new leads who attended) is only a fallback for an older backend.
        introsTaught: funnel ? Number(funnel.introsTaught ?? funnel.report2?.introCount) || 0 : null,
        firstPurchases: funnel ? Number(funnel.report2?.firstPurchaseCount) || 0 : null,
        leadToIntroPct: funnel ? Number(funnel.report1?.ratePct) || 0 : null,
        introToPurchasePct: funnel ? Number(funnel.report2?.ratePct) || 0 : null,
        activeStudents: studentHealth ? Number(studentHealth.totals?.active) || 0 : null,
        bookedStudents: studentHealth ? Number(studentHealth.totals?.booked) || 0 : null,
        bookedPct: studentHealth ? Number(studentHealth.totals?.bookedPct) || 0 : null,
        // Weighted, not a mean of percentages — one 8-lesson teacher shouldn't
        // swing the org number as hard as one 40-lesson teacher.
        utilizationPct: lessons ? capacityPerWeek ? Math.round(actualPerWeek / capacityPerWeek * 100) : null : null,
        capacityPerWeek: lessons ? capacityPerWeek : null,
        actualPerWeek: lessons ? Math.round(actualPerWeek * 10) / 10 : null
    };
}
function delta(current, previous) {
    if (current === null || current === undefined || previous === null || previous === undefined) return null;
    const cur = Number(current) || 0;
    const prev = Number(previous) || 0;
    if (!prev) return cur ? {
        pct: null,
        dir: 'up',
        noBaseline: true
    } : null;
    const pct = (cur - prev) / Math.abs(prev) * 100;
    return {
        pct,
        dir: pct >= 0 ? 'up' : 'down',
        noBaseline: false
    };
}
function pointDelta(current, previous) {
    if (current === null || current === undefined || previous === null || previous === undefined) return null;
    const diff = (Number(current) || 0) - (Number(previous) || 0);
    return {
        pct: diff,
        dir: diff >= 0 ? 'up' : 'down',
        points: true,
        noBaseline: false
    };
}
function useOwnerDashboardPage(range) {
    _s();
    const { priorPeriod, priorYear } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "useOwnerDashboardPage.useMemo": ()=>comparisonWindows(range)
    }["useOwnerDashboardPage.useMemo"], [
        range
    ]);
    const current = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$hooks$2f$useAnalyticsOverview$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useOwnerDashboardOverview"])(range);
    const previous = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$hooks$2f$useAnalyticsOverview$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useOwnerDashboardOverview"])(priorPeriod);
    const lastYear = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$hooks$2f$useAnalyticsOverview$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useOwnerDashboardOverview"])(priorYear);
    const classic = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$hooks$2f$useAnalyticsOverview$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useDashboardOverview"])(range);
    const summaries = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "useOwnerDashboardPage.useMemo[summaries]": ()=>({
                current: summarize(current.data),
                previous: summarize(previous.data),
                lastYear: summarize(lastYear.data)
            })
    }["useOwnerDashboardPage.useMemo[summaries]"], [
        current.data,
        previous.data,
        lastYear.data
    ]);
    return {
        data: current.data,
        classic: classic.data,
        summaries,
        // Raw comparison payloads, for panels that need per-row (per studio, per
        // teacher) growth rather than a single org-wide scalar.
        comparisons: {
            previous: previous.data,
            lastYear: lastYear.data
        },
        error: current.error,
        // Only the primary read blocks first paint. The comparison reads and the
        // classic-overview read fill in their badges/charts as they land, so a slow
        // secondary request never holds the whole page on a skeleton.
        isLoading: current.isLoading && !current.data,
        isValidating: current.isValidating || previous.isValidating || lastYear.isValidating,
        refresh: current.mutate
    };
}
_s(useOwnerDashboardPage, "5RrB5FUz/FUW/vf0mtdkZNKzTZs=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$hooks$2f$useAnalyticsOverview$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useOwnerDashboardOverview"],
        __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$hooks$2f$useAnalyticsOverview$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useOwnerDashboardOverview"],
        __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$hooks$2f$useAnalyticsOverview$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useOwnerDashboardOverview"],
        __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$hooks$2f$useAnalyticsOverview$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useDashboardOverview"]
    ];
});
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
"[project]/lib/lead-filter-fields.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "BOOLEAN_OPTIONS",
    ()=>BOOLEAN_OPTIONS,
    "CONDITION_FIELDS",
    ()=>CONDITION_FIELDS,
    "CONDITION_OPERATORS",
    ()=>CONDITION_OPERATORS,
    "LEAD_FILTER_FIELD_DEFS",
    ()=>LEAD_FILTER_FIELD_DEFS,
    "buildLeadQueryParams",
    ()=>buildLeadQueryParams,
    "buildQueryParamsFromConditionFilters",
    ()=>buildQueryParamsFromConditionFilters,
    "filtersToConditionGroups",
    ()=>filtersToConditionGroups,
    "filtersToConditions",
    ()=>filtersToConditions,
    "filtersToConditionsForForm",
    ()=>filtersToConditionsForForm,
    "foldPseudoDateConditions",
    ()=>foldPseudoDateConditions,
    "formatConditionValueLabel",
    ()=>formatConditionValueLabel,
    "getConditionFieldDef",
    ()=>getConditionFieldDef,
    "getFieldValueOptions",
    ()=>getFieldValueOptions,
    "getLeadReasonOptions",
    ()=>getLeadReasonOptions,
    "getOperatorsForField",
    ()=>getOperatorsForField,
    "getValidConditions",
    ()=>getValidConditions,
    "normalizeConditionValue",
    ()=>normalizeConditionValue,
    "sanitizeAppliedConditionFilters",
    ()=>sanitizeAppliedConditionFilters
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$dynamic$2d$list$2d$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/lib/dynamic-list-constants.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$lead$2d$source$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__LEAD_SOURCE_OPTIONS__as__SOURCE_OPTIONS$3e$__ = __turbopack_context__.i("[project]/lib/lead-source.js [app-client] (ecmascript) <export LEAD_SOURCE_OPTIONS as SOURCE_OPTIONS>");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$lead$2d$stages$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__LEAD_STAGE_VALUES__as__STAGE_OPTIONS$3e$__ = __turbopack_context__.i("[project]/lib/lead-stages.js [app-client] (ecmascript) <export LEAD_STAGE_VALUES as STAGE_OPTIONS>");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$dynamic$2d$list$2d$normalize$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/dynamic-list-normalize.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$lead$2d$flat$2d$filters$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/lead-flat-filters.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$lead$2d$source$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/lead-source.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$dynamic$2d$list$2d$filter$2d$catalog$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/dynamic-list-filter-catalog.js [app-client] (ecmascript)");
;
;
;
;
;
const MEMBER_BOOKING_STATUS_OPTIONS = [
    'Not Booked',
    'Booked'
];
const LEAD_FILTER_FIELD_DEFS = [
    {
        value: 'search',
        label: 'Search',
        inputType: 'text'
    },
    ...__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$dynamic$2d$list$2d$filter$2d$catalog$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ALL_FILTER_FIELDS"].map(({ value, label, inputType, optionsKey })=>({
            value,
            label,
            inputType: inputType === 'metadata' ? 'text' : inputType,
            optionsKey
        })),
    // Legacy aliases still used by older saved lists / params
    {
        value: 'source',
        label: 'Source',
        inputType: 'select',
        optionsKey: 'source'
    },
    {
        value: 'withinDays',
        label: 'Created within (days)',
        inputType: 'number'
    },
    {
        value: 'olderThanDays',
        label: 'Created older than (days)',
        inputType: 'number'
    },
    {
        value: 'createdFrom',
        label: 'Created from',
        inputType: 'date'
    },
    {
        value: 'createdTo',
        label: 'Created to',
        inputType: 'date'
    },
    {
        value: 'updatedFrom',
        label: 'Updated from',
        inputType: 'date'
    },
    {
        value: 'updatedTo',
        label: 'Updated to',
        inputType: 'date'
    }
];
const CONDITION_FIELDS = LEAD_FILTER_FIELD_DEFS.map(_c = ({ value, label })=>({
        value,
        label
    }));
_c1 = CONDITION_FIELDS;
const CONDITION_OPERATORS = __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$dynamic$2d$list$2d$filter$2d$catalog$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FILTER_OPERATORS"].map(_c2 = ({ value, label })=>({
        value,
        label
    }));
_c3 = CONDITION_OPERATORS;
const BOOLEAN_OPTIONS = [
    {
        value: 'true',
        label: 'Yes'
    },
    {
        value: 'false',
        label: 'No'
    }
];
function getConditionFieldDef(field) {
    if (String(field || '').startsWith('metadata.')) {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$dynamic$2d$list$2d$filter$2d$catalog$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getFilterFieldDef"])('metadata') || {
            value: 'metadata',
            label: 'Metadata',
            inputType: 'text'
        };
    }
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$dynamic$2d$list$2d$filter$2d$catalog$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getFilterFieldDef"])(field) || LEAD_FILTER_FIELD_DEFS.find((def)=>def.value === field) || null;
}
function toLabeledOptions(values = []) {
    return values.map((value)=>({
            value,
            label: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$dynamic$2d$list$2d$normalize$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatFieldDisplayValue"])(value)
        }));
}
function getLeadReasonOptions(leadReasons = []) {
    const seen = new Set();
    return (leadReasons || []).map((r)=>{
        const value = String(r?.reasonCode || r?.name || '').trim();
        const name = String(r?.name || '').trim();
        // Prefer a human name; if the catalog stored a snake_case code as the name, title-case it.
        const label = name && !/[_-]/.test(name) ? name : (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$dynamic$2d$list$2d$normalize$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatFieldDisplayValue"])(name || value);
        return {
            value,
            label
        };
    }).filter((o)=>{
        // The lead-reasons payload can carry the same reason twice (a default plus
        // an org override); keep the first so React option keys stay unique.
        if (!o.value || seen.has(o.value)) return false;
        seen.add(o.value);
        return true;
    });
}
function getFieldValueOptions(field, context = {}) {
    const { leadReasons = [], locations = [], forms = [], stages } = context;
    const def = getConditionFieldDef(field);
    if (!def) return null;
    if (def.optionsKey === 'stage' || field === 'stage') {
        // Use org-specific stages when provided (array of { value, label } objects)
        if (Array.isArray(stages) && stages.length > 0) return stages;
        return toLabeledOptions(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$lead$2d$stages$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__LEAD_STAGE_VALUES__as__STAGE_OPTIONS$3e$__["STAGE_OPTIONS"]);
    }
    if (def.optionsKey === 'uploadType' || field === 'uploadType') return toLabeledOptions(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$dynamic$2d$list$2d$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["UPLOAD_TYPE_OPTIONS"]);
    if (def.optionsKey === 'source' || field === 'source' || field === 'utm_source') return (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$lead$2d$source$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["leadSourceOptions"])(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$lead$2d$source$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__LEAD_SOURCE_OPTIONS__as__SOURCE_OPTIONS$3e$__["SOURCE_OPTIONS"]);
    if (def.optionsKey === 'reason' || field === 'reason') return getLeadReasonOptions(leadReasons);
    if (def.optionsKey === 'bookingStatus' || field === 'bookingStatus') {
        return toLabeledOptions(MEMBER_BOOKING_STATUS_OPTIONS);
    }
    if (def.optionsKey === 'locations' || field === 'locationID') {
        return locations.map((loc)=>({
                value: loc._id,
                label: loc.name || loc._id
            }));
    }
    if (def.optionsKey === 'forms' || field === 'formID') {
        return forms.map((form)=>({
                value: form._id,
                label: form.name || form.title || form._id
            }));
    }
    if (def.staticOptions) {
        return def.staticOptions.map((opt)=>typeof opt === 'string' ? {
                value: opt,
                label: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$dynamic$2d$list$2d$normalize$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatFieldDisplayValue"])(opt)
            } : {
                value: opt.value,
                label: opt.label || (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$dynamic$2d$list$2d$normalize$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatFieldDisplayValue"])(opt.value)
            });
    }
    if (def.inputType === 'boolean') return BOOLEAN_OPTIONS;
    return null;
}
function formatConditionValueLabel(field, value, context = {}) {
    const values = Array.isArray(value) ? value : [
        value
    ];
    const options = getFieldValueOptions(field, context) || [];
    return values.map((v)=>{
        if (v && typeof v === 'object') {
            if ('from' in v && 'to' in v) return `${v.from} – ${v.to}`;
            if ('key' in v) return `${v.key}=${v.value || ''}`;
        }
        const str = String(v);
        const match = options.find((o)=>o.value === str || o.value === v);
        if (match) return match.label;
        if (field === 'isEscalated' || field === 'isConverted') {
            return str === 'true' ? 'Yes' : str === 'false' ? 'No' : (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$dynamic$2d$list$2d$normalize$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatFieldDisplayValue"])(str);
        }
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$dynamic$2d$list$2d$normalize$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatFieldDisplayValue"])(str);
    }).join(', ');
}
function getOperatorsForField(field) {
    const catalogOps = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$dynamic$2d$list$2d$filter$2d$catalog$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getOperatorsForFilterField"])(field);
    if (catalogOps?.length) return catalogOps;
    const def = getConditionFieldDef(field);
    if (!def) return CONDITION_OPERATORS.filter((op)=>[
            'eq',
            'ne',
            'in'
        ].includes(op.value));
    if (def.inputType === 'boolean' || def.inputType === 'number' || def.inputType === 'date') {
        return CONDITION_OPERATORS.filter((op)=>op.value === 'eq');
    }
    return CONDITION_OPERATORS.filter((op)=>[
            'eq',
            'ne',
            'in'
        ].includes(op.value));
}
function normalizeConditionValue(operator, value) {
    if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$dynamic$2d$list$2d$filter$2d$catalog$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isValuelessOperator"])(operator)) return true;
    if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$dynamic$2d$list$2d$filter$2d$catalog$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usesMultiValueOperator"])(operator) || operator === 'in' || operator === 'ne' || operator === 'not_in') {
        if (Array.isArray(value)) return value.map((v)=>String(v).trim()).filter(Boolean);
        if (typeof value === 'string') {
            return value.split(',').map((v)=>v.trim()).filter(Boolean);
        }
        return [];
    }
    if (operator === 'between') {
        if (value && typeof value === 'object' && !Array.isArray(value)) {
            return {
                from: String(value.from ?? '').trim(),
                to: String(value.to ?? '').trim()
            };
        }
        if (Array.isArray(value)) return {
            from: String(value[0] ?? '').trim(),
            to: String(value[1] ?? '').trim()
        };
        return {
            from: '',
            to: ''
        };
    }
    if (value && typeof value === 'object' && 'key' in value) {
        return {
            key: String(value.key ?? '').trim(),
            value: String(value.value ?? '').trim()
        };
    }
    if (Array.isArray(value)) return String(value[0] ?? '').trim();
    return String(value ?? '').trim();
}
function formatDateFromParam(dateStr) {
    const trimmed = String(dateStr ?? '').trim();
    if (!trimmed) return '';
    if (trimmed.includes('T')) return trimmed;
    return `${trimmed}T00:00:00.000Z`;
}
function formatDateToParam(dateStr) {
    const trimmed = String(dateStr ?? '').trim();
    if (!trimmed) return '';
    if (trimmed.includes('T')) return trimmed;
    return `${trimmed}T23:59:59.999Z`;
}
function getValidConditions(conditions = []) {
    if (!Array.isArray(conditions)) return [];
    return conditions.filter((condition)=>{
        if (!condition?.field) return false;
        if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$dynamic$2d$list$2d$filter$2d$catalog$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["conditionHasValue"])(condition)) return true;
        if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$dynamic$2d$list$2d$filter$2d$catalog$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isValuelessOperator"])(condition?.operator || 'eq')) return true;
        return false;
    });
}
const CONDITION_FIELD_TO_QUERY_KEY = {
    stage: 'stage',
    uploadType: 'uploadType',
    source: 'utm_source',
    utm_source: 'utm_source',
    reason: 'reason',
    bookingStatus: 'bookingStatus',
    locationID: 'locationID',
    formID: 'formID',
    isEscalated: 'isEscalated',
    createdFrom: 'createdFrom',
    createdTo: 'createdTo',
    updatedFrom: 'updatedFrom',
    updatedTo: 'updatedTo',
    withinDays: 'withinDays',
    olderThanDays: 'olderThanDays'
};
// Legacy date-range pseudo-fields the quick bar / flat filters and a couple of
// dashboard widgets still emit. They are NOT real Lead schema fields, so the
// backend's condition validator rejects the whole request (400) if they reach
// the `conditions` blob. Fold them into proper `createdAt` / `updatedAt`
// conditions the backend actually understands.
const PSEUDO_DATE_CONDITION_FIELDS = new Set([
    'createdFrom',
    'createdTo',
    'updatedFrom',
    'updatedTo',
    'withinDays',
    'olderThanDays'
]);
function foldPseudoDateConditions(conditions = []) {
    if (!Array.isArray(conditions)) return [];
    const passthrough = [];
    const bounds = {
        createdAt: {
            from: '',
            to: ''
        },
        updatedAt: {
            from: '',
            to: ''
        }
    };
    const relative = [];
    for (const condition of conditions){
        const field = condition?.field;
        if (!PSEUDO_DATE_CONDITION_FIELDS.has(field)) {
            passthrough.push(condition);
            continue;
        }
        const raw = String(condition?.value ?? '').trim();
        if (!raw) continue;
        if (field === 'createdFrom') bounds.createdAt.from = raw;
        else if (field === 'createdTo') bounds.createdAt.to = raw;
        else if (field === 'updatedFrom') bounds.updatedAt.from = raw;
        else if (field === 'updatedTo') bounds.updatedAt.to = raw;
        else if (field === 'withinDays') relative.push({
            field: 'createdAt',
            operator: 'within_days',
            value: raw
        });
        else if (field === 'olderThanDays') relative.push({
            field: 'createdAt',
            operator: 'older_than_days',
            value: raw
        });
    }
    const folded = [];
    for (const dbField of [
        'createdAt',
        'updatedAt'
    ]){
        const { from, to } = bounds[dbField];
        // `between` value is the object form the filter catalog expects internally;
        // serializeConditionForApi normalizes it to the [from, to] array on the wire.
        if (from && to) folded.push({
            field: dbField,
            operator: 'between',
            value: {
                from,
                to
            }
        });
        else if (from) folded.push({
            field: dbField,
            operator: 'gte',
            value: from
        });
        else if (to) folded.push({
            field: dbField,
            operator: 'lte',
            value: to
        });
    }
    return [
        ...passthrough,
        ...folded,
        ...relative
    ];
}
function serializeConditionForApi(condition) {
    if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$dynamic$2d$list$2d$filter$2d$catalog$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getFilterFieldDef"])(condition?.field) || String(condition?.field || '').startsWith('metadata.')) {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$dynamic$2d$list$2d$filter$2d$catalog$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["serializeFilterConditionForApi"])(condition);
    }
    const operator = condition?.operator || 'eq';
    const value = normalizeConditionValue(operator, condition?.value);
    return {
        field: condition?.field,
        operator,
        value
    };
}
function sanitizeAppliedConditionFilters(filters = {}) {
    return {
        ...filters,
        conditions: getValidConditions(filters.conditions)
    };
}
function buildConditionGroupsPayload(conditions = [], groupLogics = {}, globalLogic = 'AND') {
    const valid = getValidConditions(conditions);
    if (valid.length === 0) return null;
    const byGroup = new Map();
    for (const condition of valid){
        const groupId = condition.groupId || 'ungrouped';
        if (!byGroup.has(groupId)) byGroup.set(groupId, []);
        byGroup.get(groupId).push(serializeConditionForApi(condition));
    }
    const flatConditions = Array.from(byGroup.values()).flat();
    // Flatten if only one group / no group logics were provided — preserves older backend shape.
    if (byGroup.size <= 1 && Object.keys(groupLogics || {}).length === 0) {
        return {
            conditionLogic: globalLogic === 'OR' ? 'OR' : 'AND',
            conditions: flatConditions
        };
    }
    const groups = Array.from(byGroup.entries()).map(([groupId, groupConditions])=>({
            id: groupId,
            logic: groupLogics?.[groupId] === 'OR' ? 'OR' : 'AND',
            conditions: groupConditions
        }));
    return {
        conditionLogic: globalLogic === 'OR' ? 'OR' : 'AND',
        conditions: flatConditions,
        conditionGroups: groups
    };
}
function buildQueryParamsFromConditionFilters({ page, limit, search = '', conditionLogic = 'AND', conditions = [], groupLogics = {} }) {
    const params = new URLSearchParams();
    if (page) params.set('page', String(page));
    if (limit) params.set('limit', String(limit));
    const trimmedSearch = String(search ?? '').trim();
    if (trimmedSearch) params.set('search', trimmedSearch);
    const payload = buildConditionGroupsPayload(foldPseudoDateConditions(conditions), groupLogics, conditionLogic);
    if (payload) {
        params.set('conditionLogic', payload.conditionLogic);
        params.set('conditions', JSON.stringify(payload.conditions));
        if (payload.conditionGroups?.length) {
            params.set('conditionGroups', JSON.stringify(payload.conditionGroups));
        }
        for (const condition of payload.conditions){
            const key = CONDITION_FIELD_TO_QUERY_KEY[condition.field];
            if (!key) continue;
            if (condition.operator === 'eq' && !Array.isArray(condition.value) && typeof condition.value !== 'object') {
                const value = String(condition.value ?? '').trim();
                if (!value) continue;
                if (key === 'createdFrom' || key === 'updatedFrom') {
                    params.set(key, formatDateFromParam(value));
                } else if (key === 'createdTo' || key === 'updatedTo') {
                    params.set(key, formatDateToParam(value));
                } else {
                    params.set(key, value);
                }
            }
        }
    }
    return params;
}
function filtersToConditions(filters = {}) {
    const raw = Array.isArray(filters?.conditions) && filters.conditions.length > 0 ? getValidConditions(filters.conditions) : (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$lead$2d$flat$2d$filters$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["flatFiltersToConditions"])(filters);
    return foldPseudoDateConditions(raw).map(serializeConditionForApi);
}
function filtersToConditionsForForm(filters = {}) {
    if (Array.isArray(filters?.conditions) && filters.conditions.length > 0) {
        return foldPseudoDateConditions(getValidConditions(filters.conditions)).map((c)=>({
                ...serializeConditionForApi(c),
                ...c.groupId ? {
                    groupId: c.groupId
                } : {},
                ...c.id ? {
                    id: c.id
                } : {}
            }));
    }
    return foldPseudoDateConditions((0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$lead$2d$flat$2d$filters$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["flatFiltersToConditions"])(filters)).map(serializeConditionForApi);
}
function filtersToConditionGroups(filters = {}) {
    const conditions = foldPseudoDateConditions(Array.isArray(filters?.conditions) ? filters.conditions : (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$lead$2d$flat$2d$filters$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["flatFiltersToConditions"])(filters));
    return buildConditionGroupsPayload(conditions, filters?.groupLogics || {}, filters?.conditionLogic || 'AND');
}
function buildLeadQueryParams({ page, limit, filters = {} }) {
    let conditions = Array.isArray(filters?.conditions) && filters.conditions.length > 0 ? [
        ...filters.conditions
    ] : (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$lead$2d$flat$2d$filters$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["flatFiltersToConditions"])(filters);
    const searchOperator = filters?.searchOperator || 'eq';
    const searchParam = searchOperator === 'eq' && !Array.isArray(filters?.search) ? String(filters?.search ?? '') : '';
    // Plain text search uses the dedicated `search` query param. Leave `search`
    // conditions only for exclude / multi-value operators so we don't send a
    // duplicate filter (and so older backends that reject field=search still get
    // a working equals search via the query param alone).
    if (searchParam.trim()) {
        conditions = conditions.filter((c)=>c?.field !== 'search');
    }
    return buildQueryParamsFromConditionFilters({
        page,
        limit,
        search: searchParam,
        conditionLogic: filters.conditionLogic,
        conditions,
        groupLogics: filters.groupLogics
    });
}
var _c, _c1, _c2, _c3;
__turbopack_context__.k.register(_c, "CONDITION_FIELDS$LEAD_FILTER_FIELD_DEFS.map");
__turbopack_context__.k.register(_c1, "CONDITION_FIELDS");
__turbopack_context__.k.register(_c2, "CONDITION_OPERATORS$FILTER_OPERATORS.map");
__turbopack_context__.k.register(_c3, "CONDITION_OPERATORS");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/lib/lead-flat-filters.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ALL_OPERATOR_FILTER_DEFS",
    ()=>ALL_OPERATOR_FILTER_DEFS,
    "FILTER_OPERATOR_OPTIONS",
    ()=>FILTER_OPERATOR_OPTIONS,
    "OPERATOR_FILTER_FIELD_DEFS",
    ()=>OPERATOR_FILTER_FIELD_DEFS,
    "QUICK_FILTER_OPERATOR_DEFS",
    ()=>QUICK_FILTER_OPERATOR_DEFS,
    "SEARCH_FILTER_DEF",
    ()=>SEARCH_FILTER_DEF,
    "clearFlatFilterField",
    ()=>clearFlatFilterField,
    "countActiveFlatFilterFields",
    ()=>countActiveFlatFilterFields,
    "flatFilterHasValue",
    ()=>flatFilterHasValue,
    "flatFiltersToConditions",
    ()=>flatFiltersToConditions,
    "getFlatFilterOperator",
    ()=>getFlatFilterOperator,
    "getFlatFilterValues",
    ()=>getFlatFilterValues,
    "updateFlatFilterOperator",
    ()=>updateFlatFilterOperator,
    "updateFlatFilterValue",
    ()=>updateFlatFilterValue,
    "usesMultiValueOperator",
    ()=>usesMultiValueOperator
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$dynamic$2d$list$2d$normalize$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/dynamic-list-normalize.js [app-client] (ecmascript)");
;
const FILTER_OPERATOR_OPTIONS = [
    {
        value: 'eq',
        label: 'Equals'
    },
    {
        value: 'ne',
        label: 'Exclude'
    },
    {
        value: 'in',
        label: 'In'
    }
];
function usesMultiValueOperator(operator = 'eq') {
    return operator === 'in' || operator === 'ne';
}
const SEARCH_FILTER_DEF = {
    filterKey: 'search',
    conditionField: 'search',
    operatorKey: 'searchOperator'
};
const OPERATOR_FILTER_FIELD_DEFS = [
    {
        filterKey: 'bookingStatus',
        conditionField: 'bookingStatus',
        operatorKey: 'bookingStatusOperator',
        optionsKey: 'bookingStatus'
    },
    {
        filterKey: 'reason',
        conditionField: 'reason',
        operatorKey: 'reasonOperator',
        optionsKey: 'reason'
    },
    {
        filterKey: 'utm_source',
        conditionField: 'source',
        operatorKey: 'sourceOperator',
        optionsKey: 'source'
    },
    {
        filterKey: 'locationID',
        conditionField: 'locationID',
        operatorKey: 'locationOperator',
        optionsKey: 'locations'
    },
    {
        filterKey: 'formID',
        conditionField: 'formID',
        operatorKey: 'formOperator',
        optionsKey: 'forms'
    }
];
const QUICK_FILTER_OPERATOR_DEFS = [
    {
        filterKey: 'stage',
        conditionField: 'stage',
        operatorKey: 'stageOperator',
        optionsKey: 'stage'
    },
    {
        filterKey: 'uploadType',
        conditionField: 'uploadType',
        operatorKey: 'uploadTypeOperator',
        optionsKey: 'uploadType'
    }
];
const ALL_OPERATOR_FILTER_DEFS = [
    ...QUICK_FILTER_OPERATOR_DEFS,
    ...OPERATOR_FILTER_FIELD_DEFS
];
function flatFilterHasValue(value, operator = 'eq') {
    if (usesMultiValueOperator(operator)) {
        if (Array.isArray(value)) return value.length > 0;
        return String(value ?? '').trim() !== '';
    }
    if (Array.isArray(value)) return String(value[0] ?? '').trim() !== '';
    return String(value ?? '').trim() !== '';
}
function getFlatFilterOperator(filters, operatorKey) {
    return filters?.[operatorKey] || 'eq';
}
function getFlatFilterValues(filters, filterKey, operatorKey) {
    const operator = getFlatFilterOperator(filters, operatorKey);
    const value = filters?.[filterKey];
    if (usesMultiValueOperator(operator)) {
        if (Array.isArray(value)) return value.map((v)=>String(v)).filter(Boolean);
        if (String(value ?? '').trim()) return [
            String(value)
        ];
        return [];
    }
    if (Array.isArray(value)) return String(value[0] ?? '');
    return String(value ?? '');
}
function updateFlatFilterOperator(filters, filterKey, operatorKey, operator) {
    const next = {
        ...filters,
        [operatorKey]: operator
    };
    const current = filters?.[filterKey];
    if (usesMultiValueOperator(operator)) {
        next[filterKey] = Array.isArray(current) ? current : String(current ?? '').trim() ? [
            String(current)
        ] : [];
    } else {
        next[filterKey] = Array.isArray(current) ? String(current[0] ?? '') : String(current ?? '');
    }
    return next;
}
function updateFlatFilterValue(filters, filterKey, operatorKey, value) {
    return {
        ...filters,
        [filterKey]: value
    };
}
function serializeFlatFilterCondition(operator, value) {
    if (usesMultiValueOperator(operator)) {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$dynamic$2d$list$2d$normalize$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["normalizeConditionValue"])(operator, value);
    }
    return String(value ?? '');
}
function flatFiltersToConditions(filters = {}) {
    const conditions = [];
    // Preferred path: Filters sidebar stores PDF-catalog conditions.
    if (Array.isArray(filters?.conditions) && filters.conditions.length > 0) {
        for (const condition of filters.conditions){
            if (!condition?.field) continue;
            conditions.push({
                id: condition.id,
                field: condition.field,
                operator: condition.operator || 'eq',
                value: condition.value
            });
        }
    } else {
        for (const def of ALL_OPERATOR_FILTER_DEFS){
            const operator = getFlatFilterOperator(filters, def.operatorKey);
            const value = getFlatFilterValues(filters, def.filterKey, def.operatorKey);
            if (!flatFilterHasValue(value, operator)) continue;
            conditions.push({
                field: def.conditionField,
                operator,
                value: serializeFlatFilterCondition(operator, value)
            });
        }
        if (filters.isEscalated === true || filters.isEscalated === 'true') {
            conditions.push({
                field: 'isEscalated',
                operator: 'eq',
                value: 'true'
            });
        }
        const days = parseInt(String(filters.relativeCreatedDays ?? '').trim(), 10);
        if (Number.isFinite(days) && days >= 1) {
            if (filters.relativeCreated === 'after') {
                conditions.push({
                    field: 'withinDays',
                    operator: 'eq',
                    value: String(days)
                });
            } else if (filters.relativeCreated === 'before') {
                conditions.push({
                    field: 'olderThanDays',
                    operator: 'eq',
                    value: String(days)
                });
            }
        }
        const pushEq = (field, value)=>{
            const trimmed = String(value ?? '').trim();
            if (!trimmed) return;
            conditions.push({
                field,
                operator: 'eq',
                value: trimmed
            });
        };
        pushEq('createdFrom', filters.createdFrom);
        pushEq('createdTo', filters.createdTo);
        pushEq('updatedFrom', filters.updatedFrom);
        pushEq('updatedTo', filters.updatedTo);
    }
    const searchOperator = getFlatFilterOperator(filters, SEARCH_FILTER_DEF.operatorKey);
    const searchValue = getFlatFilterValues(filters, SEARCH_FILTER_DEF.filterKey, SEARCH_FILTER_DEF.operatorKey);
    if (flatFilterHasValue(searchValue, searchOperator)) {
        conditions.push({
            field: SEARCH_FILTER_DEF.conditionField,
            operator: searchOperator,
            value: serializeFlatFilterCondition(searchOperator, searchValue)
        });
    }
    return conditions;
}
function countActiveFlatFilterFields(filters, { hiddenFields = new Set(), skipQuick = true } = {}) {
    const quick = skipQuick ? new Set([
        'search'
    ]) : new Set();
    let count = 0;
    for (const def of ALL_OPERATOR_FILTER_DEFS){
        if (quick.has(def.filterKey)) continue;
        if (hiddenFields.has(def.filterKey)) continue;
        const operator = getFlatFilterOperator(filters, def.operatorKey);
        const value = getFlatFilterValues(filters, def.filterKey, def.operatorKey);
        if (flatFilterHasValue(value, operator)) count += 1;
    }
    const hasRelative = Boolean(filters.relativeCreated) && parseInt(String(filters.relativeCreatedDays ?? '').trim(), 10) >= 1;
    if (hasRelative) count += 1;
    for (const key of [
        'createdFrom',
        'createdTo',
        'updatedFrom',
        'updatedTo'
    ]){
        if (String(filters[key] ?? '').trim()) count += 1;
    }
    if (filters.isEscalated === true || filters.isEscalated === 'true') count += 1;
    return count;
}
function clearFlatFilterField(filters, filterKey) {
    const next = {
        ...filters,
        [filterKey]: ''
    };
    const def = ALL_OPERATOR_FILTER_DEFS.find((d)=>d.filterKey === filterKey);
    if (def) next[def.operatorKey] = 'eq';
    if (filterKey === SEARCH_FILTER_DEF.filterKey) next[SEARCH_FILTER_DEF.operatorKey] = 'eq';
    return next;
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/lib/lead-source.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Lead source (utm_source). Form leads get it automatically from the ad /
 * referral that brought the visitor; the builder's Source field is a fallback.
 */ /** Options of the form builder's manual Source field. */ __turbopack_context__.s([
    "FORM_SOURCE_FIELD_VALUES",
    ()=>FORM_SOURCE_FIELD_VALUES,
    "LEAD_SOURCE_OPTIONS",
    ()=>LEAD_SOURCE_OPTIONS,
    "formatLeadSource",
    ()=>formatLeadSource,
    "leadSourceOptions",
    ()=>leadSourceOptions
]);
const FORM_SOURCE_FIELD_VALUES = [
    'google-add',
    'website'
];
const LEAD_SOURCE_OPTIONS = [
    'facebook',
    'instagram',
    'google',
    'google-add',
    'bing',
    'tiktok',
    'linkedin',
    'youtube',
    'twitter',
    'website'
];
const LABELS = {
    facebook: 'Facebook',
    instagram: 'Instagram',
    messenger: 'Messenger',
    audience_network: 'Meta Audience Network',
    google: 'Google',
    'google-add': 'Google Ads',
    bing: 'Bing',
    yahoo: 'Yahoo',
    duckduckgo: 'DuckDuckGo',
    tiktok: 'TikTok',
    linkedin: 'LinkedIn',
    youtube: 'YouTube',
    twitter: 'X (Twitter)',
    website: 'Website',
    direct: 'Direct / unknown'
};
function formatLeadSource(value) {
    const key = String(value ?? '').trim().toLowerCase();
    if (!key) return '';
    if (LABELS[key]) return LABELS[key];
    // Referral sources are hostnames (blog.example.com) — show as-is.
    if (key.includes('.')) return key;
    return key.replace(/[_-]+/g, ' ').replace(/\b\w/g, (c)=>c.toUpperCase());
}
const leadSourceOptions = (values = LEAD_SOURCE_OPTIONS)=>values.map((value)=>({
            value,
            label: formatLeadSource(value)
        }));
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/lib/lead-source.js [app-client] (ecmascript) <export LEAD_SOURCE_OPTIONS as SOURCE_OPTIONS>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "SOURCE_OPTIONS",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$lead$2d$source$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LEAD_SOURCE_OPTIONS"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$lead$2d$source$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/lead-source.js [app-client] (ecmascript)");
}),
"[project]/lib/lead-stages.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "CAMPAIGN_LEAD_STAGE_OPTIONS",
    ()=>CAMPAIGN_LEAD_STAGE_OPTIONS,
    "LEAD_STAGE_BADGE_STYLES",
    ()=>LEAD_STAGE_BADGE_STYLES,
    "LEAD_STAGE_DEFAULT_COLORS",
    ()=>LEAD_STAGE_DEFAULT_COLORS,
    "LEAD_STAGE_OPTIONS",
    ()=>LEAD_STAGE_OPTIONS,
    "LEAD_STAGE_VALUES",
    ()=>LEAD_STAGE_VALUES,
    "STAGE_OPTIONS",
    ()=>STAGE_OPTIONS,
    "formatLeadStageLabel",
    ()=>formatLeadStageLabel,
    "getLeadStageBadgeClass",
    ()=>getLeadStageBadgeClass,
    "getLeadStageBadgeProps",
    ()=>getLeadStageBadgeProps,
    "getLeadStageColor",
    ()=>getLeadStageColor,
    "getLeadStageOptions",
    ()=>getLeadStageOptions,
    "invalidateLeadStagesCache",
    ()=>invalidateLeadStagesCache,
    "useLeadStages",
    ()=>useLeadStages
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/api.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$status$2d$hex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/status-hex.js [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
const LEAD_STAGE_VALUES = [
    'new',
    'engaged',
    'pending_payment',
    'declined',
    'dormant',
    'converted',
    'human intervention',
    're_engaged',
    'cold'
];
const LEAD_STAGE_DEFAULT_COLORS = {
    new: '#6B7280',
    engaged: '#3B82F6',
    pending_payment: '#F59E0B',
    declined: '#DC2626',
    dormant: '#64748B',
    converted: '#059669',
    'human intervention': '#D97706',
    re_engaged: '#6366F1',
    cold: '#94A3B8'
};
function fallbackStage(value) {
    return {
        value,
        label: formatLeadStageLabel(value),
        key: value,
        name: formatLeadStageLabel(value),
        color: LEAD_STAGE_DEFAULT_COLORS[value]
    };
}
function fallbackStages() {
    return LEAD_STAGE_VALUES.map(fallbackStage);
}
const LEAD_STAGE_BADGE_STYLES = {
    new: 'bg-muted text-foreground',
    engaged: 'bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300',
    pending_payment: 'bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300',
    declined: 'bg-rose-100 text-rose-800 dark:bg-rose-900/40 dark:text-rose-300',
    dormant: 'bg-muted text-foreground',
    converted: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300',
    'human intervention': 'bg-orange-100 text-orange-800 dark:bg-orange-900/40 dark:text-orange-300',
    re_engaged: 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900/40 dark:text-indigo-300',
    cold: 'bg-slate-100 text-slate-700 dark:bg-slate-800/60 dark:text-slate-300'
};
const DEFAULT_BADGE_CLASS = 'bg-muted text-foreground';
function getLeadStageBadgeClass(stageKey) {
    const key = String(stageKey || 'new').trim().toLowerCase();
    return LEAD_STAGE_BADGE_STYLES[key] ?? DEFAULT_BADGE_CLASS;
}
function getLeadStageColor(stageKey, stages) {
    const key = String(stageKey || 'new').trim().toLowerCase();
    if (Array.isArray(stages)) {
        const match = stages.find((s)=>String(s.key || s.value || '').trim().toLowerCase() === key);
        const fromOrg = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$status$2d$hex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["sanitizeStatusHex"])(match?.color);
        if (fromOrg) return fromOrg;
    }
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$status$2d$hex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["sanitizeStatusHex"])(LEAD_STAGE_DEFAULT_COLORS[key] || '');
}
function getLeadStageBadgeProps(stageKey, stages) {
    const color = getLeadStageColor(stageKey, stages);
    if (color) {
        return {
            className: 'status-color-badge',
            style: {
                '--status-color': color
            }
        };
    }
    return {
        className: getLeadStageBadgeClass(stageKey),
        style: undefined
    };
}
const STAGE_OPTIONS = LEAD_STAGE_VALUES;
const LEAD_STAGE_OPTIONS = LEAD_STAGE_VALUES;
const CAMPAIGN_LEAD_STAGE_OPTIONS = LEAD_STAGE_VALUES;
function formatLeadStageLabel(value, stages) {
    if (value === null || value === undefined) return '';
    const str = String(value).trim();
    if (!str) return '';
    if (Array.isArray(stages)) {
        const match = stages.find((s)=>s.key === str || s.value === str);
        if (match?.name) return match.name;
    }
    return str.replace(/[_-]/g, ' ').split(/\s+/).map((word)=>word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
}
function getLeadStageOptions() {
    return LEAD_STAGE_VALUES.map((value)=>({
            value,
            label: formatLeadStageLabel(value)
        }));
}
// Module-level cache so multiple hooks on the same page share one fetch.
let _cache = null;
let _cachePromise = null;
const _listeners = new Set();
function fetchFromApi() {
    if (_cache) return Promise.resolve(_cache);
    if (_cachePromise) return _cachePromise;
    _cachePromise = __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].get('/api/lead-status?active=true').then((res)=>{
        if (res?.success && Array.isArray(res.data)) {
            _cache = res.data.map((s)=>({
                    value: s.key,
                    label: s.name,
                    key: s.key,
                    name: s.name,
                    color: s.color,
                    description: s.description,
                    sortOrder: s.sortOrder,
                    isActive: s.isActive,
                    isDefault: s.isDefault
                }));
        } else {
            _cache = fallbackStages();
        }
        _cachePromise = null;
        return _cache;
    }).catch(()=>{
        _cachePromise = null;
        return fallbackStages();
    });
    return _cachePromise;
}
function invalidateLeadStagesCache() {
    _cache = null;
    _cachePromise = null;
    _listeners.forEach((fn)=>fn());
}
function useLeadStages() {
    _s();
    const [stages, setStages] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        "useLeadStages.useState": ()=>_cache ?? fallbackStages()
    }["useLeadStages.useState"]);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(!_cache);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useLeadStages.useEffect": ()=>{
            let cancelled = false;
            const refresh = {
                "useLeadStages.useEffect.refresh": ()=>{
                    if (_cache) {
                        setStages(_cache);
                        setLoading(false);
                        return;
                    }
                    setLoading(true);
                    fetchFromApi().then({
                        "useLeadStages.useEffect.refresh": (result)=>{
                            if (cancelled) return;
                            setStages(result);
                            setLoading(false);
                        }
                    }["useLeadStages.useEffect.refresh"]);
                }
            }["useLeadStages.useEffect.refresh"];
            refresh();
            _listeners.add(refresh);
            return ({
                "useLeadStages.useEffect": ()=>{
                    cancelled = true;
                    _listeners.delete(refresh);
                }
            })["useLeadStages.useEffect"];
        }
    }["useLeadStages.useEffect"], []);
    return {
        stages,
        loading
    };
}
_s(useLeadStages, "ZyRrecWoobKVMirNES7ftHzZ8Lk=");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/lib/lead-stages.js [app-client] (ecmascript) <export LEAD_STAGE_VALUES as STAGE_OPTIONS>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "STAGE_OPTIONS",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$lead$2d$stages$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LEAD_STAGE_VALUES"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$lead$2d$stages$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/lead-stages.js [app-client] (ecmascript)");
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
"[project]/lib/status-hex.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "sanitizeStatusHex",
    ()=>sanitizeStatusHex
]);
const HEX_RE = /^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/;
function sanitizeStatusHex(value) {
    const color = String(value || '').trim();
    if (!HEX_RE.test(color)) return '';
    if (color.length === 4) {
        const r = color[1];
        const g = color[2];
        const b = color[3];
        return `#${r}${r}${g}${g}${b}${b}`;
    }
    return color;
}
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

//# sourceMappingURL=lib_00kxmqd1da_no._.js.map