module.exports = [
"[project]/components/calendar/LessonSlotPicker.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>LessonSlotPicker,
    "slotWallTimesToUtcRange",
    ()=>slotWallTimesToUtcRange
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/api.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$studioLocalDate$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/studioLocalDate.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$studio$2d$time$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/studio-time.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$studioSlotHours$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/studioSlotHours.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$searchable$2d$select$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/searchable-select.js [app-ssr] (ecmascript)");
'use client';
;
;
;
;
;
;
;
/**
 * Shared teacher + date + free-slot grid for calendar booking and Sell Intro.
 * Mirrors AppointmentComposerPanel's AvailabilityPicker (no recurrence).
 */ function formatTime12h(time24) {
    const [h, m] = String(time24 || '00:00').split(':').map(Number);
    const period = h >= 12 ? 'PM' : 'AM';
    const h12 = h % 12 || 12;
    return `${h12}:${String(m || 0).padStart(2, '0')} ${period}`;
}
function localCalendarDayQueryRange(dateStr, tz) {
    const [y, mo, d] = String(dateStr || '').split('-').map(Number);
    if (!y || !mo || !d) return null;
    const dayStart = new Date(y, mo - 1, d, 0, 0, 0, 0);
    const dayEndExclusive = dayStart.getTime() + 86400000;
    const startISO = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$studio$2d$time$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["studioWallTimeToUtcISO"])(dateStr, '00:00', tz) || dayStart.toISOString();
    const endISO = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$studio$2d$time$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["studioWallTimeToUtcISO"])(dateStr, '23:59', tz) || new Date(y, mo - 1, d, 23, 59, 59, 999).toISOString();
    return {
        startISO,
        endISO,
        dayStartMs: dayStart.getTime(),
        dayEndExclusiveMs: dayEndExclusive
    };
}
function clipIntervalToLocalDay(evStart, evEnd, dayStartMs, dayEndExclusiveMs) {
    const s = Math.max(evStart.getTime(), dayStartMs);
    const e = Math.min(evEnd.getTime(), dayEndExclusiveMs);
    if (e <= s) return null;
    return {
        start: Math.max(0, Math.floor((s - dayStartMs) / 60000)),
        end: Math.min(24 * 60, Math.ceil((e - dayStartMs) / 60000))
    };
}
function statusBlocksAvailability(status) {
    if (status === 'cancelled_no_charge' || status === 'cancelled_charged') return false;
    return true;
}
function mergeMinuteIntervals(intervals) {
    if (!intervals.length) return [];
    const sorted = [
        ...intervals
    ].sort((a, b)=>a.start - b.start);
    const out = [
        {
            ...sorted[0]
        }
    ];
    for(let i = 1; i < sorted.length; i++){
        const prev = out[out.length - 1];
        const cur = sorted[i];
        if (cur.start < prev.end) prev.end = Math.max(prev.end, cur.end);
        else out.push({
            ...cur
        });
    }
    return out;
}
function enumerateAvailabilitySlotStarts(slotAlignMins, slotStepMins, dayEndMin, busyIntervals = [], bookingDurMins) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$studioSlotHours$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["enumerateGridSlotStarts"])(slotAlignMins, slotStepMins, dayEndMin, busyIntervals, bookingDurMins);
}
function AvailabilityGrid({ teacherID, date, durationMins, slotStepMins, slotAlignMins, dayEndMin, selectedStart, onSelect, studioTz }) {
    const [busyIntervalsMin, setBusyIntervalsMin] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [blockingEventCount, setBlockingEventCount] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(0);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const range = localCalendarDayQueryRange(date, studioTz);
        if (!teacherID || !range) {
            setBusyIntervalsMin([]);
            setBlockingEventCount(0);
            return;
        }
        let cancelled = false;
        setLoading(true);
        const qs = new URLSearchParams({
            teacherID: String(teacherID),
            start: new Date(new Date(range.startISO).getTime() - 86400000).toISOString(),
            end: range.endISO,
            limit: '500'
        });
        __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].get(`/api/calendar?${qs.toString()}`).then((res)=>{
            if (cancelled) return;
            if (!res.success || !Array.isArray(res.data)) {
                setBusyIntervalsMin([]);
                setBlockingEventCount(0);
                return;
            }
            const intervals = [];
            let blocking = 0;
            for (const ev of res.data){
                if (!statusBlocksAvailability(ev.status)) continue;
                const st = ev.startDateTime ? new Date(ev.startDateTime) : null;
                const en = ev.endDateTime ? new Date(ev.endDateTime) : null;
                if (!st || !en || !(en > st)) continue;
                const clipped = clipIntervalToLocalDay((0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$studioLocalDate$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toStudioLocalDate"])(st, studioTz), (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$studioLocalDate$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toStudioLocalDate"])(en, studioTz), range.dayStartMs, range.dayEndExclusiveMs);
                if (clipped && clipped.end > clipped.start) {
                    intervals.push(clipped);
                    blocking += 1;
                }
            }
            setBlockingEventCount(blocking);
            setBusyIntervalsMin(mergeMinuteIntervals(intervals));
        }).catch(()=>{
            if (!cancelled) {
                setBusyIntervalsMin([]);
                setBlockingEventCount(0);
            }
        }).finally(()=>{
            if (!cancelled) setLoading(false);
        });
        return ()=>{
            cancelled = true;
        };
    }, [
        teacherID,
        date,
        studioTz
    ]);
    const availableSlots = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>{
        const bookingDur = Math.max(15, Number(durationMins) || 60);
        const stepMins = Math.max(15, Number(slotStepMins) > 0 ? Number(slotStepMins) : bookingDur);
        // Missing close must not invent a 9pm window — callers pass studio hours.
        const windowEnd = Number(dayEndMin) > 0 ? Number(dayEndMin) : 0;
        if (!(windowEnd > 0)) return [];
        const gridStarts = enumerateAvailabilitySlotStarts(slotAlignMins, stepMins, windowEnd, busyIntervalsMin, bookingDur);
        return gridStarts.map((t)=>{
            const slotEnd = t + bookingDur;
            const hh = String(Math.floor(t / 60)).padStart(2, '0');
            const mm = String(t % 60).padStart(2, '0');
            const eh = String(Math.floor(slotEnd / 60)).padStart(2, '0');
            const em = String(slotEnd % 60).padStart(2, '0');
            return {
                start: `${hh}:${mm}`,
                end: `${eh}:${em}`
            };
        });
    }, [
        busyIntervalsMin,
        durationMins,
        slotStepMins,
        slotAlignMins,
        dayEndMin
    ]);
    if (!teacherID || !date) return null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "rounded-xl border border-border bg-muted/20 p-3 space-y-2",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center justify-between",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-[11px] font-semibold text-muted-foreground uppercase tracking-wider",
                        children: [
                            "Availability · every ",
                            slotStepMins || durationMins || 60,
                            " min"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/calendar/LessonSlotPicker.js",
                        lineNumber: 189,
                        columnNumber: 9
                    }, this),
                    !loading && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-[10px] text-muted-foreground",
                        children: [
                            availableSlots.length,
                            " free · ",
                            blockingEventCount,
                            " booked"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/calendar/LessonSlotPicker.js",
                        lineNumber: 193,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/calendar/LessonSlotPicker.js",
                lineNumber: 188,
                columnNumber: 7
            }, this),
            loading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "text-[11px] text-muted-foreground py-1",
                children: "Checking teacher's schedule…"
            }, void 0, false, {
                fileName: "[project]/components/calendar/LessonSlotPicker.js",
                lineNumber: 200,
                columnNumber: 9
            }, this) : availableSlots.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "text-[11px] text-destructive font-medium py-0.5",
                children: "No available slots on this date."
            }, void 0, false, {
                fileName: "[project]/components/calendar/LessonSlotPicker.js",
                lineNumber: 202,
                columnNumber: 9
            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex flex-wrap gap-1.5 max-h-[140px] overflow-y-auto pr-1",
                children: availableSlots.map((slot)=>{
                    const isSelected = selectedStart === slot.start;
                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        onClick: ()=>onSelect?.(slot),
                        className: [
                            'px-2.5 py-1 rounded-lg text-[11px] font-medium border transition-colors shrink-0',
                            isSelected ? 'border-brand bg-brand text-brand-foreground' : 'border-border bg-background text-foreground hover:bg-muted/50 hover:border-brand/40'
                        ].join(' '),
                        children: formatTime12h(slot.start)
                    }, slot.start, false, {
                        fileName: "[project]/components/calendar/LessonSlotPicker.js",
                        lineNumber: 210,
                        columnNumber: 15
                    }, this);
                })
            }, void 0, false, {
                fileName: "[project]/components/calendar/LessonSlotPicker.js",
                lineNumber: 206,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/calendar/LessonSlotPicker.js",
        lineNumber: 187,
        columnNumber: 5
    }, this);
}
function LessonSlotPicker({ teacherOptions = [], teacherID, onTeacherChange, date, onDateChange, selectedSlot, onSlotChange, durationMins = 60, slotStepMins, slotAlignMins, dayEndMin, dayClosed = false, hoursLoading = false, studioTz = null }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "space-y-3",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-[11px] font-medium text-muted-foreground mb-1",
                        children: "Teacher"
                    }, void 0, false, {
                        fileName: "[project]/components/calendar/LessonSlotPicker.js",
                        lineNumber: 267,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$searchable$2d$select$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                        value: teacherID || '',
                        onChange: (v)=>{
                            onTeacherChange?.(v);
                            onSlotChange?.(null);
                        },
                        options: teacherOptions,
                        placeholder: "Select teacher…"
                    }, void 0, false, {
                        fileName: "[project]/components/calendar/LessonSlotPicker.js",
                        lineNumber: 268,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/calendar/LessonSlotPicker.js",
                lineNumber: 266,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-[11px] font-medium text-muted-foreground mb-1",
                        children: "Date"
                    }, void 0, false, {
                        fileName: "[project]/components/calendar/LessonSlotPicker.js",
                        lineNumber: 280,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                        type: "date",
                        value: date || '',
                        onChange: (e)=>{
                            onDateChange?.(e.target.value);
                            onSlotChange?.(null);
                        },
                        className: "h-9 w-full rounded-lg border border-border bg-background px-3 text-[12px] text-foreground outline-none focus:border-primary transition-colors"
                    }, void 0, false, {
                        fileName: "[project]/components/calendar/LessonSlotPicker.js",
                        lineNumber: 281,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/calendar/LessonSlotPicker.js",
                lineNumber: 279,
                columnNumber: 7
            }, this),
            hoursLoading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "rounded-xl border border-border bg-muted/20 p-3",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "text-[11px] text-muted-foreground font-medium",
                    children: "Loading studio hours…"
                }, void 0, false, {
                    fileName: "[project]/components/calendar/LessonSlotPicker.js",
                    lineNumber: 294,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/calendar/LessonSlotPicker.js",
                lineNumber: 293,
                columnNumber: 9
            }, this) : dayClosed && date ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "rounded-xl border border-border bg-muted/20 p-3",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "text-[11px] text-muted-foreground font-medium",
                    children: "Studio is closed that day."
                }, void 0, false, {
                    fileName: "[project]/components/calendar/LessonSlotPicker.js",
                    lineNumber: 300,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/calendar/LessonSlotPicker.js",
                lineNumber: 299,
                columnNumber: 9
            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(AvailabilityGrid, {
                teacherID: teacherID,
                date: date,
                durationMins: durationMins,
                slotStepMins: slotStepMins || durationMins,
                slotAlignMins: slotAlignMins,
                dayEndMin: dayEndMin,
                selectedStart: selectedSlot?.start || null,
                onSelect: (slot)=>onSlotChange?.(slot),
                studioTz: studioTz
            }, void 0, false, {
                fileName: "[project]/components/calendar/LessonSlotPicker.js",
                lineNumber: 305,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/calendar/LessonSlotPicker.js",
        lineNumber: 265,
        columnNumber: 5
    }, this);
}
function slotWallTimesToUtcRange(date, slot, studioTz) {
    if (!date || !slot?.start || !slot?.end) return null;
    const startDateTime = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$studio$2d$time$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["studioWallTimeToUtcISO"])(date, slot.start, studioTz);
    const endDateTime = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$studio$2d$time$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["studioWallTimeToUtcISO"])(date, slot.end, studioTz);
    if (!startDateTime || !endDateTime) return null;
    return {
        startDateTime,
        endDateTime
    };
}
}),
"[project]/components/enrollment/CreateEnrollmentSheet.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>CreateEnrollmentSheet
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$sheet$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/sheet.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$searchable$2d$select$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/searchable-select.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$calendar$2f$components$2f$NewEnrollmentPackageInline$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/calendar/components/NewEnrollmentPackageInline.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$membership$2f$AssignMembershipForm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/membership/AssignMembershipForm.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$payments$2f$SendPaymentLinkMenu$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/payments/SendPaymentLinkMenu.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/api.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/utils.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$studioLocalDate$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/studioLocalDate.js [app-ssr] (ecmascript)");
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
const SHEET_WIDTH = '640px';
function CreateEnrollmentSheet({ open, onClose, /** 'service' | 'package' | 'membership' — which tab to open on. */ initialMode = 'service', /** When set, student is fixed and the selector is hidden. */ customerID: fixedCustomerID = null, customerName = '', /** Studio for Clover readiness when student is fixed (customer location). */ locationID: fixedLocationID = null, /** When set, only group/specific service lines are sellable and only packages containing them are listed. */ allowedServiceCodes = null, onSuccess }) {
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('');
    const [submitting, setSubmitting] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [mode, setMode] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(initialMode);
    // Set while a "Review and Pay" agreement session is pending student
    // acceptance — the enrollment/package isn't created and nothing is charged
    // until this resolves to 'signed' (see resolveAndMaybeGate).
    const [agreementGate, setAgreementGate] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (open) setMode(initialMode);
    }, [
        open,
        initialMode
    ]);
    const [selectedCustomerID, setSelectedCustomerID] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('');
    const [teacherOptions, setTeacherOptions] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [customerOptions, setCustomerOptions] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [packageTemplates, setPackageTemplates] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const resolvedCustomerID = fixedCustomerID ? String(fixedCustomerID) : selectedCustomerID;
    const resolvedLocationID = (()=>{
        if (fixedLocationID) return String(fixedLocationID);
        const opt = customerOptions.find((c)=>c.value === selectedCustomerID);
        return opt?.locationID || null;
    })();
    const sellablePackages = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>{
        if (!allowedServiceCodes) return packageTemplates;
        return packageTemplates.filter((p)=>(p.services || []).some((s)=>allowedServiceCodes.has(s.serviceCode)));
    }, [
        packageTemplates,
        allowedServiceCodes
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (!open) return;
        let cancelled = false;
        async function loadOptions() {
            setError('');
            const requests = [
                __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].get('/api/teacher?limit=200&status=active'),
                __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].get('/api/package?limit=200')
            ];
            if (!fixedCustomerID) {
                requests.splice(1, 0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].get('/api/customer?limit=200'));
            }
            const results = await Promise.all(requests);
            if (cancelled) return;
            let teachersRes;
            let customersRes;
            let packagesRes;
            if (fixedCustomerID) {
                ;
                [teachersRes, packagesRes] = results;
            } else {
                ;
                [teachersRes, customersRes, packagesRes] = results;
            }
            if (teachersRes?.success && Array.isArray(teachersRes.data)) {
                setTeacherOptions(teachersRes.data.map((t)=>({
                        value: String(t._id ?? t.id),
                        label: t.name || t.email || String(t._id)
                    })));
            }
            if (customersRes?.success && Array.isArray(customersRes.data)) {
                setCustomerOptions(customersRes.data.map((c)=>{
                    const loc = c.locationID;
                    const locationID = Array.isArray(loc) ? loc[0]?._id || loc[0] || null : loc?._id || loc || null;
                    return {
                        value: String(c._id ?? c.id),
                        // "Ashley & Tom" — members show next to the account holder and are searchable.
                        label: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["nameWithMembers"])(c) || c.email || String(c._id),
                        locationID: locationID ? String(locationID) : null
                    };
                }));
            }
            if (packagesRes?.success && Array.isArray(packagesRes.data)) {
                setPackageTemplates(packagesRes.data);
            }
        }
        loadOptions();
        return ()=>{
            cancelled = true;
        };
    }, [
        open,
        fixedCustomerID
    ]);
    const selectedCustomerLabel = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>{
        if (fixedCustomerID && customerName) return customerName;
        const opt = customerOptions.find((c)=>c.value === selectedCustomerID);
        return opt?.label || '';
    }, [
        fixedCustomerID,
        customerName,
        customerOptions,
        selectedCustomerID
    ]);
    function handleClose() {
        setError('');
        setSelectedCustomerID('');
        onClose?.();
    }
    async function handleCreateEnrollmentAndPackage(payload, linkContractID = null) {
        if (!resolvedCustomerID) {
            setError('Please select a student.');
            return {
                ok: false
            };
        }
        setError('');
        setSubmitting(true);
        const enrRes = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].post('/api/enrollment', {
            customerID: resolvedCustomerID,
            label: payload?.label?.trim() || undefined,
            teacherID: payload?.teacherID || undefined
        });
        if (!enrRes?.success) {
            setError(enrRes?.error || 'Failed to create enrollment.');
            setSubmitting(false);
            return {
                ok: false
            };
        }
        const created = enrRes?.data?.enrollment && typeof enrRes.data.enrollment === 'object' ? enrRes.data.enrollment : enrRes.data;
        const enrollmentID = String(created?._id || created?.enrollmentID || '');
        if (!enrollmentID) {
            setError('Enrollment created but ID was not returned.');
            setSubmitting(false);
            return {
                ok: false
            };
        }
        const addRes = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].post('/api/customer-package/add', {
            customerID: resolvedCustomerID,
            packageID: payload.packageID || undefined,
            label: payload?.label?.trim() || undefined,
            expiryDays: payload.expiryDays ? Number(payload.expiryDays) : undefined,
            enrollmentID,
            services: (payload.services || []).map((s)=>({
                    serviceCode: s.serviceCode,
                    serviceName: s.serviceName,
                    color: s.color,
                    numberOfSessions: Number(s.numberOfSessions || 0),
                    pricePerSession: Number(s.pricePerSession || 0),
                    discountType: s.discountType || 'none',
                    discountAmount: Number(s.discountAmount || 0),
                    finalAmount: Number(s.finalAmount || 0)
                })),
            billingType: payload.billingType,
            billing: payload.billingType === 'one_time' ? {
                method: payload.billing?.method || 'cash',
                collectDate: payload.billing?.collectDate || undefined,
                // Explicit false only — omitting it (every other caller of this
                // endpoint) must keep the backend's default of collecting now.
                ...payload.billing?.collectNow === false ? {
                    collectNow: false
                } : {},
                ...payload.billing?.useWallet && Number(payload.billing?.walletAmount) > 0 ? {
                    walletAmount: Number(payload.billing.walletAmount)
                } : {},
                ...payload.billing?.method === 'terminal' ? {
                    deviceID: payload.billing?.deviceID
                } : {},
                // A saved card is charged inside the add endpoint itself for a one-time
                // sale, so it rides on the billing object under its own name — never
                // as cardToken, which that endpoint reads as a Clover token.
                ...payload.billing?.method === 'saved_card' ? {
                    savedCardID: payload.billing?.savedCardID
                } : {}
            } : payload.billingType === 'payment_plan' ? (()=>{
                const totalAmount = (payload.services || []).reduce((sum, s)=>sum + Number(s.finalAmount || 0), 0);
                const mode = payload.billing?.installmentMode || 'count';
                const numberOfInstallments = mode === 'amount' ? Math.ceil(totalAmount / Number(payload.billing?.installmentAmount || 1)) : Number(payload.billing?.numberOfInstallments || 0);
                return {
                    installmentMode: mode,
                    numberOfInstallments,
                    installmentAmount: mode === 'amount' ? Number(payload.billing?.installmentAmount) : undefined,
                    frequency: payload.billing?.frequency,
                    startDate: payload.billing?.startDate
                };
            })() : payload.billingType === 'flexible' ? {
                initialAmount: Number(payload.billing?.initialAmount || 0),
                initialDate: payload.billing?.initialDate || undefined,
                customInstallments: (payload.billing?.futurePayments || []).filter((c)=>c.dueDate && Number(c.amount) > 0).map((c)=>({
                        dueDate: c.dueDate,
                        amount: Number(c.amount)
                    }))
            } : {},
            ...payload.purchaseDate ? {
                purchaseDate: payload.purchaseDate
            } : {},
            ...payload.tip?.amount ? {
                tip: {
                    teacherID: payload.tip.teacherID || undefined,
                    amount: Number(payload.tip.amount),
                    method: payload.tip.method || 'cash'
                }
            } : {}
        });
        if (!addRes?.success) {
            setError(addRes?.error || 'Failed to add package to enrollment.');
            setSubmitting(false);
            return {
                ok: false
            };
        }
        let checkoutUrl = payload.billingType === 'one_time' ? addRes.data?.checkoutUrl || null : null;
        const collectAmount = Number(payload.billing?.collectAmount || 0);
        const collectNow = Boolean(payload.billing?.collectNow) && collectAmount > 0;
        const method = payload.billing?.method || 'cash';
        // The part of today's payment the wallet covers; `method` collects the rest.
        const walletShare = payload.billing?.useWallet && Number(payload.billing?.walletAmount) > 0 ? {
            walletAmount: Number(payload.billing.walletAmount)
        } : {};
        if (collectNow && payload.billingType === 'payment_plan') {
            const planRes = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].get(`/api/payment-plan/customer/${resolvedCustomerID}`);
            const plans = planRes?.success ? planRes.data || [] : [];
            const matchesEnrollment = (p)=>String(p.enrollmentID?._id ?? p.enrollmentID) === String(enrollmentID);
            const byNewest = (a, b)=>new Date(b.createdAt) - new Date(a.createdAt);
            const plan = plans.filter(matchesEnrollment).sort(byNewest)[0] ?? [
                ...plans
            ].sort(byNewest)[0];
            const firstPending = (plan?.installments || []).findIndex((i)=>i.status === 'pending');
            if (plan && firstPending !== -1) {
                const payRes = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].post(`/api/payment-plan/${plan._id}/pay-installment`, {
                    installmentIndex: firstPending,
                    method,
                    ...walletShare,
                    paymentDate: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$studioLocalDate$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["dateInputToISO"])(payload.billing?.collectDate),
                    ...method === 'terminal' ? {
                        deviceID: payload.billing?.deviceID
                    } : {},
                    ...method === 'saved_card' ? {
                        cardToken: payload.billing?.savedCardID
                    } : {}
                });
                if (!payRes?.success) {
                    setError(payRes?.error || 'Enrollment created but first installment payment failed.');
                    setSubmitting(false);
                    return {
                        ok: false
                    };
                }
                checkoutUrl = payRes.data?.checkoutUrl || null;
            }
        } else if (collectNow && payload.billingType === 'flexible') {
            const payRes = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].post('/api/payment', {
                customerID: resolvedCustomerID,
                enrollmentID,
                type: 'package_purchase',
                amount: collectAmount,
                method,
                ...walletShare,
                paymentDate: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$studioLocalDate$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["dateInputToISO"])(payload.billing?.collectDate),
                ...method === 'terminal' ? {
                    deviceID: payload.billing?.deviceID
                } : {},
                ...method === 'saved_card' ? {
                    cardToken: payload.billing?.savedCardID
                } : {}
            });
            if (!payRes?.success) {
                setError(payRes?.error || 'Enrollment created but initial payment failed.');
                setSubmitting(false);
                return {
                    ok: false
                };
            }
            checkoutUrl = payRes.data?.checkoutUrl || null;
        }
        // Sent here, not by the form: behind an agreement gate this runs only once it's signed.
        const linkChannel = payload.billing?.sendLinkChannel;
        const linkTarget = linkChannel && (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$calendar$2f$components$2f$NewEnrollmentPackageInline$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["enrollmentLinkTarget"])(payload, enrollmentID, addRes.data?.paymentPlan);
        if (linkTarget) await (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$payments$2f$SendPaymentLinkMenu$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["sendPaymentLink"])({
            customerID: resolvedCustomerID,
            target: linkTarget,
            channel: linkChannel
        });
        if (linkContractID) {
            __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].patch(`/api/agreement-session/${linkContractID}/link-payment`, {
                enrollmentID
            }).catch(()=>{});
        }
        setSubmitting(false);
        handleClose();
        onSuccess?.({
            customerID: resolvedCustomerID,
            enrollmentID
        });
        return {
            ok: true,
            checkoutUrl
        };
    }
    // Mirrors NewEnrollmentPackageInline's own installment preview math, so the
    // agreement the student sees lists the same schedule they'll actually get —
    // this only needs to exist for the pre-creation "Review and Pay" render.
    function buildSchedulePreview(payload) {
        const total = (payload.services || []).reduce((sum, s)=>sum + Number(s.finalAmount || 0), 0);
        if (payload.billingType === 'payment_plan') {
            const b = payload.billing || {};
            const mode = b.installmentMode || 'count';
            let n;
            let baseAmt;
            if (mode === 'amount') {
                const amt = Number(b.installmentAmount || 0);
                if (!amt) return [];
                n = Math.ceil(total / amt);
                baseAmt = amt;
            } else {
                n = Number(b.numberOfInstallments || 0);
                if (!n) return [];
                baseAmt = Number((total / n).toFixed(2));
            }
            if (!b.startDate) return [];
            let d = new Date(b.startDate);
            const rows = [];
            for(let i = 0; i < n; i++){
                const isLast = i === n - 1;
                const amount = isLast ? Number((total - baseAmt * (n - 1)).toFixed(2)) : baseAmt;
                rows.push({
                    description: `Installment ${i + 1}`,
                    amount,
                    dueDate: new Date(d),
                    status: 'upcoming'
                });
                if (b.frequency === 'weekly') d = new Date(d.getTime() + 7 * 24 * 60 * 60 * 1000);
                else if (b.frequency === 'biweekly') d = new Date(d.getTime() + 14 * 24 * 60 * 60 * 1000);
                else {
                    d = new Date(d);
                    d.setMonth(d.getMonth() + 1);
                }
            }
            return rows;
        }
        if (payload.billingType === 'flexible') {
            const b = payload.billing || {};
            const rows = [];
            if (Number(b.initialAmount) > 0 && b.initialDate) {
                rows.push({
                    description: 'Initial payment',
                    amount: Number(b.initialAmount),
                    dueDate: new Date(b.initialDate),
                    status: b.collectNow === false ? 'upcoming' : 'paid'
                });
            }
            for (const c of b.futurePayments || []){
                if (c.dueDate && Number(c.amount) > 0) {
                    rows.push({
                        description: 'Scheduled payment',
                        amount: Number(c.amount),
                        dueDate: new Date(c.dueDate),
                        status: 'upcoming'
                    });
                }
            }
            return rows;
        }
        return [];
    }
    // Company-level gate: some enrollment types require the student to accept
    // an agreement packet (via studio iPad or texted link) before anything is
    // created or charged — see settings/documents "Agreement Settings".
    async function resolveAndMaybeGate(payload) {
        if (!resolvedCustomerID) {
            setError('Please select a student.');
            return {
                ok: false
            };
        }
        const resolveRes = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].get(`/api/agreement-session/resolve?enrollmentType=${mode}`);
        if (!resolveRes?.success || !resolveRes.data?.required) {
            return handleCreateEnrollmentAndPackage(payload);
        }
        setError('');
        setSubmitting(true);
        const totalPaid = (payload.services || []).reduce((sum, s)=>sum + Number(s.finalAmount || 0), 0);
        const totalDiscount = (payload.services || []).reduce((sum, s)=>sum + Number(s.discountAmount || 0), 0);
        const schedule = buildSchedulePreview(payload);
        const sessionRes = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].post('/api/agreement-session', {
            customerID: resolvedCustomerID,
            enrollmentType: mode,
            isRecurringBilling: payload.billingType === 'payment_plan',
            draftEnrollment: {
                label: payload?.label?.trim() || undefined,
                purchaseDate: new Date(),
                services: payload.services || [],
                totalPaid,
                totalDiscount,
                amountCollected: 0,
                billingType: payload.billingType,
                schedule
            }
        });
        setSubmitting(false);
        if (!sessionRes?.success) {
            setError(sessionRes?.error || 'Failed to send the agreement for review.');
            return {
                ok: false
            };
        }
        setAgreementGate({
            contractID: sessionRes.data.contract._id,
            ipadUrl: sessionRes.data.ipadUrl,
            smsUrl: sessionRes.data.smsUrl,
            payload,
            status: 'sent'
        });
        return {
            ok: true,
            pendingAgreement: true
        };
    }
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (!agreementGate || agreementGate.status !== 'sent') return;
        const interval = setInterval(async ()=>{
            const statusRes = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].get(`/api/agreement-session/${agreementGate.contractID}/status`);
            if (!statusRes?.success) return;
            if (statusRes.data.status === 'signed') {
                clearInterval(interval);
                setAgreementGate(null);
                await handleCreateEnrollmentAndPackage(agreementGate.payload, agreementGate.contractID);
            }
        }, 4000);
        return ()=>clearInterval(interval);
    }, [
        agreementGate
    ]);
    async function handleResendAgreement() {
        if (!agreementGate) return;
        const result = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].post(`/api/agreement-session/${agreementGate.contractID}/resend`, {});
        if (result?.success) {
            setAgreementGate((p)=>({
                    ...p,
                    smsUrl: result.data.smsUrl,
                    ipadUrl: result.data.ipadUrl
                }));
        }
    }
    if (agreementGate) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$sheet$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Sheet"], {
            open: open,
            onClose: ()=>{},
            width: SHEET_WIDTH,
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$sheet$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SheetContent"], {
                className: "flex flex-col items-center justify-center gap-4 p-8 text-center",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-[15px] font-semibold text-foreground",
                        children: "Waiting for student acceptance"
                    }, void 0, false, {
                        fileName: "[project]/components/enrollment/CreateEnrollmentSheet.js",
                        lineNumber: 468,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-[13px] text-muted-foreground max-w-sm",
                        children: "The enrollment agreement has been sent to the student's phone. Open it on the studio iPad, or wait for them to accept on their device. The enrollment won't be created and nothing will be charged until they accept."
                    }, void 0, false, {
                        fileName: "[project]/components/enrollment/CreateEnrollmentSheet.js",
                        lineNumber: 469,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                        href: agreementGate.ipadUrl,
                        target: "_blank",
                        rel: "noreferrer",
                        className: "text-[13px] text-brand hover:underline font-medium",
                        children: "Open on studio iPad"
                    }, void 0, false, {
                        fileName: "[project]/components/enrollment/CreateEnrollmentSheet.js",
                        lineNumber: 473,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex gap-2 pt-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                onClick: handleResendAgreement,
                                className: "text-[12px] text-muted-foreground hover:text-foreground underline",
                                children: "Resend link"
                            }, void 0, false, {
                                fileName: "[project]/components/enrollment/CreateEnrollmentSheet.js",
                                lineNumber: 482,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                onClick: ()=>setAgreementGate(null),
                                className: "text-[12px] text-muted-foreground hover:text-foreground underline",
                                children: "Cancel"
                            }, void 0, false, {
                                fileName: "[project]/components/enrollment/CreateEnrollmentSheet.js",
                                lineNumber: 489,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/enrollment/CreateEnrollmentSheet.js",
                        lineNumber: 481,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/enrollment/CreateEnrollmentSheet.js",
                lineNumber: 467,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/components/enrollment/CreateEnrollmentSheet.js",
            lineNumber: 466,
            columnNumber: 7
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$sheet$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Sheet"], {
        open: open,
        onClose: handleClose,
        width: SHEET_WIDTH,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$sheet$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SheetContent"], {
            onClose: handleClose,
            className: "flex flex-col overflow-hidden p-0",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "shrink-0 border-b border-border bg-muted/30 px-5 pt-5 pb-3",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-[14px] font-bold text-foreground",
                            children: mode === 'membership' ? 'Assign Membership' : 'Create Enrollment'
                        }, void 0, false, {
                            fileName: "[project]/components/enrollment/CreateEnrollmentSheet.js",
                            lineNumber: 506,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-[12px] text-muted-foreground mt-1",
                            children: mode === 'membership' ? 'Give this student a recurring membership.' : mode === 'service' ? 'Sell services on their own — enrollment and services in one go.' : 'Create enrollment and package in one go.'
                        }, void 0, false, {
                            fileName: "[project]/components/enrollment/CreateEnrollmentSheet.js",
                            lineNumber: 509,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "mt-3 inline-flex rounded-lg border border-border bg-background p-0.5",
                            children: [
                                {
                                    v: 'service',
                                    label: 'Service'
                                },
                                {
                                    v: 'package',
                                    label: 'Packages'
                                },
                                {
                                    v: 'membership',
                                    label: 'Memberships'
                                }
                            ].map((opt)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    type: "button",
                                    onClick: ()=>{
                                        setMode(opt.v);
                                        setError('');
                                    },
                                    className: [
                                        'h-8 px-4 rounded-md text-[12px] font-medium transition-colors',
                                        mode === opt.v ? 'bg-brand text-brand-foreground' : 'text-muted-foreground hover:text-foreground'
                                    ].join(' '),
                                    children: opt.label
                                }, opt.v, false, {
                                    fileName: "[project]/components/enrollment/CreateEnrollmentSheet.js",
                                    lineNumber: 522,
                                    columnNumber: 15
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/components/enrollment/CreateEnrollmentSheet.js",
                            lineNumber: 516,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/enrollment/CreateEnrollmentSheet.js",
                    lineNumber: 505,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex-1 overflow-y-auto px-5 py-4",
                    children: mode !== 'membership' ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "rounded-xl border border-border bg-card p-3 mb-0",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-[11px] font-medium text-muted-foreground mb-1",
                                        children: "Student"
                                    }, void 0, false, {
                                        fileName: "[project]/components/enrollment/CreateEnrollmentSheet.js",
                                        lineNumber: 541,
                                        columnNumber: 17
                                    }, this),
                                    fixedCustomerID ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-[12px] font-medium text-foreground truncate",
                                        children: selectedCustomerLabel || 'Selected student'
                                    }, void 0, false, {
                                        fileName: "[project]/components/enrollment/CreateEnrollmentSheet.js",
                                        lineNumber: 543,
                                        columnNumber: 19
                                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$searchable$2d$select$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                        value: selectedCustomerID,
                                        onChange: (v)=>setSelectedCustomerID(v),
                                        options: customerOptions,
                                        placeholder: "Select student…"
                                    }, void 0, false, {
                                        fileName: "[project]/components/enrollment/CreateEnrollmentSheet.js",
                                        lineNumber: 547,
                                        columnNumber: 19
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/enrollment/CreateEnrollmentSheet.js",
                                lineNumber: 540,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$calendar$2f$components$2f$NewEnrollmentPackageInline$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                teacherOptions: teacherOptions,
                                serviceOnly: mode === 'service',
                                packageTemplates: mode === 'service' ? [] : sellablePackages,
                                allowedServiceCodes: allowedServiceCodes,
                                customerID: resolvedCustomerID,
                                locationID: resolvedLocationID,
                                onCancel: handleClose,
                                onSubmit: resolveAndMaybeGate
                            }, void 0, false, {
                                fileName: "[project]/components/enrollment/CreateEnrollmentSheet.js",
                                lineNumber: 556,
                                columnNumber: 15
                            }, this),
                            error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mt-3 rounded-lg bg-destructive/10 border border-destructive/20 px-3 py-2 text-[12px] text-destructive",
                                children: error
                            }, void 0, false, {
                                fileName: "[project]/components/enrollment/CreateEnrollmentSheet.js",
                                lineNumber: 568,
                                columnNumber: 17
                            }, this),
                            submitting && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "mt-2 text-[11px] text-muted-foreground",
                                children: "Creating…"
                            }, void 0, false, {
                                fileName: "[project]/components/enrollment/CreateEnrollmentSheet.js",
                                lineNumber: 573,
                                columnNumber: 17
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/enrollment/CreateEnrollmentSheet.js",
                        lineNumber: 539,
                        columnNumber: 13
                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                        children: [
                            !fixedCustomerID && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "rounded-xl border border-border bg-card p-3 mb-4",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-[11px] font-medium text-muted-foreground mb-1",
                                        children: "Student"
                                    }, void 0, false, {
                                        fileName: "[project]/components/enrollment/CreateEnrollmentSheet.js",
                                        lineNumber: 580,
                                        columnNumber: 19
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$searchable$2d$select$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                        value: selectedCustomerID,
                                        onChange: (v)=>setSelectedCustomerID(v),
                                        options: customerOptions,
                                        placeholder: "Select student…"
                                    }, void 0, false, {
                                        fileName: "[project]/components/enrollment/CreateEnrollmentSheet.js",
                                        lineNumber: 581,
                                        columnNumber: 19
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/enrollment/CreateEnrollmentSheet.js",
                                lineNumber: 579,
                                columnNumber: 17
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$membership$2f$AssignMembershipForm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                customerID: resolvedCustomerID,
                                locationID: resolvedLocationID,
                                onSuccess: ()=>{
                                    handleClose();
                                    onSuccess?.();
                                },
                                onCancel: handleClose
                            }, void 0, false, {
                                fileName: "[project]/components/enrollment/CreateEnrollmentSheet.js",
                                lineNumber: 589,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/enrollment/CreateEnrollmentSheet.js",
                        lineNumber: 577,
                        columnNumber: 13
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/components/enrollment/CreateEnrollmentSheet.js",
                    lineNumber: 537,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/components/enrollment/CreateEnrollmentSheet.js",
            lineNumber: 504,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/enrollment/CreateEnrollmentSheet.js",
        lineNumber: 503,
        columnNumber: 5
    }, this);
}
}),
"[project]/components/enrollment/EnrollMenu.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ENROLL_OPTIONS",
    ()=>ENROLL_OPTIONS,
    "EnrollMenuItem",
    ()=>EnrollMenuItem,
    "default",
    ()=>EnrollMenu
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$calendar$2d$days$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__CalendarDays$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/calendar-days.js [app-ssr] (ecmascript) <export default as CalendarDays>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDown$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/chevron-down.js [app-ssr] (ecmascript) <export default as ChevronDown>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$right$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronRight$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/chevron-right.js [app-ssr] (ecmascript) <export default as ChevronRight>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$layers$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Layers$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/layers.js [app-ssr] (ecmascript) <export default as Layers>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/plus.js [app-ssr] (ecmascript) <export default as Plus>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$repeat$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Repeat$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/repeat.js [app-ssr] (ecmascript) <export default as Repeat>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sparkles$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Sparkles$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/sparkles.js [app-ssr] (ecmascript) <export default as Sparkles>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$ticket$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Ticket$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/ticket.js [app-ssr] (ecmascript) <export default as Ticket>");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/button.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/utils.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$permissions$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/lib/permissions.js [app-ssr] (ecmascript) <locals>");
;
;
;
;
;
;
const ENROLL_OPTIONS = [
    {
        mode: "service",
        label: "Services",
        description: "Individual classes and sessions",
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$calendar$2d$days$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__CalendarDays$3e$__["CalendarDays"]
    },
    {
        mode: "package",
        label: "Packages",
        description: "Bundled lesson programs",
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$layers$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Layers$3e$__["Layers"]
    },
    {
        mode: "membership",
        label: "Memberships",
        description: "Recurring studio access",
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$repeat$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Repeat$3e$__["Repeat"]
    },
    {
        mode: "trial",
        label: "Trial / Intro",
        description: "Sell a first lesson to a lead",
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sparkles$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Sparkles$3e$__["Sparkles"]
    }
];
function EnrollMenuItem({ icon: Icon, label, description, onClick }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
        type: "button",
        role: "menuitem",
        onClick: onClick,
        className: "group flex w-full items-start gap-3 rounded-xl px-2 py-2 text-left transition-colors hover:bg-[var(--studio-primary-light)]",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[var(--studio-primary-light)] text-[var(--studio-primary)] ring-1 ring-[var(--studio-primary)]/12 transition-colors group-hover:bg-[var(--studio-primary)] group-hover:text-white group-hover:ring-transparent",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Icon, {
                    className: "h-4 w-4",
                    strokeWidth: 1.75
                }, void 0, false, {
                    fileName: "[project]/components/enrollment/EnrollMenu.js",
                    lineNumber: 43,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/enrollment/EnrollMenu.js",
                lineNumber: 42,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "min-w-0 flex-1 pt-0.5",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "flex items-center justify-between gap-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-[13px] font-semibold text-foreground transition-colors group-hover:text-[var(--studio-primary)]",
                                children: label
                            }, void 0, false, {
                                fileName: "[project]/components/enrollment/EnrollMenu.js",
                                lineNumber: 47,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$right$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronRight$3e$__["ChevronRight"], {
                                className: "h-3.5 w-3.5 shrink-0 text-muted-foreground/40 opacity-0 -translate-x-1 transition-all group-hover:translate-x-0 group-hover:opacity-100 group-hover:text-[var(--studio-primary)]"
                            }, void 0, false, {
                                fileName: "[project]/components/enrollment/EnrollMenu.js",
                                lineNumber: 50,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/enrollment/EnrollMenu.js",
                        lineNumber: 46,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "mt-0.5 block text-[11px] leading-snug text-muted-foreground",
                        children: description
                    }, void 0, false, {
                        fileName: "[project]/components/enrollment/EnrollMenu.js",
                        lineNumber: 52,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/enrollment/EnrollMenu.js",
                lineNumber: 45,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/enrollment/EnrollMenu.js",
        lineNumber: 36,
        columnNumber: 5
    }, this);
}
function EnrollMenu({ /** Trigger label — "Enroll" in the header, "New" on a student's page. */ label = "Enroll", /** Extra classes for the trigger, so each caller keeps its own button shape. */ triggerClassName, /** Which edge of the trigger the menu hangs from — "right" (default, for a
   * trigger near the right edge of its container, e.g. the header) or "left"
   * (for a trigger near the left edge, e.g. a narrow side panel), so the
   * menu opens toward whichever side actually has room. */ align = "right", onSelectMode, onSelectEvent }) {
    const [open, setOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const ref = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    // Trial/Intro hits POST /api/payment-request/lead which requires
    // settings/Billings/write — hide the option when the role can't sell.
    const visibleOptions = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>ENROLL_OPTIONS.filter((o)=>o.mode !== "trial" || (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$permissions$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["hasPermission"])("settings", "Billings", "write")), []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (!open) return;
        function handleClickOutside(event) {
            if (ref.current && !ref.current.contains(event.target)) setOpen(false);
        }
        document.addEventListener("click", handleClickOutside);
        return ()=>document.removeEventListener("click", handleClickOutside);
    }, [
        open
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "relative inline-block",
        ref: ref,
        onMouseEnter: ()=>setOpen(true),
        onMouseLeave: ()=>setOpen(false),
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Button"], {
                type: "button",
                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])("h-[38px] rounded-full px-4 text-[13px] font-semibold bg-brand text-brand-foreground hover:bg-brand-dark", triggerClassName),
                onClick: ()=>setOpen((v)=>!v),
                "aria-haspopup": "menu",
                "aria-expanded": open,
                "aria-label": label,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__["Plus"], {
                        className: "h-4 w-4"
                    }, void 0, false, {
                        fileName: "[project]/components/enrollment/EnrollMenu.js",
                        lineNumber: 114,
                        columnNumber: 9
                    }, this),
                    label,
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDown$3e$__["ChevronDown"], {
                        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])("h-3.5 w-3.5 opacity-80 transition-transform duration-200", open && "rotate-180")
                    }, void 0, false, {
                        fileName: "[project]/components/enrollment/EnrollMenu.js",
                        lineNumber: 116,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/enrollment/EnrollMenu.js",
                lineNumber: 103,
                columnNumber: 7
            }, this),
            open && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])("absolute top-full pt-2 w-[300px] z-50 animate-scale-in", align === "left" ? "left-0 origin-top-left" : "right-0 origin-top-right"),
                role: "menu",
                "aria-label": "Enrollment options",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "overflow-hidden rounded-2xl border border-border bg-popover text-popover-foreground",
                    style: {
                        boxShadow: "var(--bar-glow), 0 18px 40px -18px hsl(var(--foreground) / 0.16)"
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "px-3.5 pt-3 pb-2",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-[10px] font-bold uppercase tracking-[0.22em] text-[var(--studio-primary)]",
                                    children: "New enrollment"
                                }, void 0, false, {
                                    fileName: "[project]/components/enrollment/EnrollMenu.js",
                                    lineNumber: 143,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "mt-0.5 text-[12px] text-muted-foreground",
                                    children: "Select an offering type"
                                }, void 0, false, {
                                    fileName: "[project]/components/enrollment/EnrollMenu.js",
                                    lineNumber: 146,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/enrollment/EnrollMenu.js",
                            lineNumber: 142,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "px-1.5 pb-1.5",
                            children: visibleOptions.map((o)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(EnrollMenuItem, {
                                    icon: o.icon,
                                    label: o.label,
                                    description: o.description,
                                    onClick: ()=>{
                                        setOpen(false);
                                        onSelectMode?.(o.mode);
                                    }
                                }, o.mode, false, {
                                    fileName: "[project]/components/enrollment/EnrollMenu.js",
                                    lineNumber: 153,
                                    columnNumber: 17
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/components/enrollment/EnrollMenu.js",
                            lineNumber: 151,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "mx-4 my-0.5 h-px",
                            style: {
                                background: "linear-gradient(90deg, transparent, color-mix(in srgb, var(--studio-primary) 40%, transparent), transparent)"
                            },
                            "aria-hidden": true
                        }, void 0, false, {
                            fileName: "[project]/components/enrollment/EnrollMenu.js",
                            lineNumber: 166,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "px-1.5 py-1.5 pb-2",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "px-2 pb-1 pt-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-foreground",
                                    children: "Events"
                                }, void 0, false, {
                                    fileName: "[project]/components/enrollment/EnrollMenu.js",
                                    lineNumber: 176,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(EnrollMenuItem, {
                                    icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$ticket$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Ticket$3e$__["Ticket"],
                                    label: "Events & Products",
                                    description: "Tickets, recitals, and one-time items",
                                    onClick: ()=>{
                                        setOpen(false);
                                        onSelectEvent?.();
                                    }
                                }, void 0, false, {
                                    fileName: "[project]/components/enrollment/EnrollMenu.js",
                                    lineNumber: 179,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/enrollment/EnrollMenu.js",
                            lineNumber: 175,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/enrollment/EnrollMenu.js",
                    lineNumber: 135,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/enrollment/EnrollMenu.js",
                lineNumber: 125,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/enrollment/EnrollMenu.js",
        lineNumber: 97,
        columnNumber: 5
    }, this);
}
}),
"[project]/components/enrollment/SellIntroSheet.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>SellIntroSheet
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$external$2d$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ExternalLink$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/external-link.js [app-ssr] (ecmascript) <export default as ExternalLink>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$link$2d$2$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Link2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/link-2.js [app-ssr] (ecmascript) <export default as Link2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/loader-circle.js [app-ssr] (ecmascript) <export default as Loader2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$sheet$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/sheet.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$searchable$2d$select$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/searchable-select.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$payments$2f$PaymentMethodPicker$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/payments/PaymentMethodPicker.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$payments$2f$TerminalDeviceField$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/payments/TerminalDeviceField.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$calendar$2f$LessonSlotPicker$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/calendar/LessonSlotPicker.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/button.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/utils.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$toast$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/toast.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$hooks$2f$useStudioTimezone$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/hooks/useStudioTimezone.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$studioSlotHours$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/studioSlotHours.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/api.js [app-ssr] (ecmascript)");
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
const SHEET_WIDTH = '560px';
const INTRO_PAYMENT_METHODS = [
    {
        value: 'link',
        label: 'Share Link'
    },
    {
        value: 'cash',
        label: 'Cash'
    },
    {
        value: 'card',
        label: 'Card'
    },
    {
        value: 'terminal',
        label: 'Terminal'
    }
];
const LINK_CHANNELS = [
    {
        value: 'sms',
        label: 'SMS'
    },
    {
        value: 'email',
        label: 'Email'
    },
    {
        value: 'both',
        label: 'Both'
    }
];
function locationMatches(service, locationID) {
    if (!locationID) return true;
    const locs = Array.isArray(service.locationID) ? service.locationID : [
        service.locationID
    ];
    return locs.some((l)=>String(l?._id || l) === String(locationID));
}
function SellIntroSheet({ open, onClose, onSuccess }) {
    const toast = (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$toast$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useToast"])();
    const studioTz = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$hooks$2f$useStudioTimezone$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useStudioTimezone"])();
    const [contactOptions, setContactOptions] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [selectedContactKey, setSelectedContactKey] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('');
    const [introCatalog, setIntroCatalog] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [catalogLoading, setCatalogLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [selectedIntroID, setSelectedIntroID] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('');
    const [method, setMethod] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('link');
    const [channel, setChannel] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('sms');
    const [deviceID, setDeviceID] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('');
    const [includeSlot, setIncludeSlot] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [teacherOptions, setTeacherOptions] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [teacherID, setTeacherID] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('');
    const [slotDate, setSlotDate] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('');
    const [selectedSlot, setSelectedSlot] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [locationsById, setLocationsById] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])({});
    /** Location ids whose by-id fetch failed — unlock generic fallback hours. */ const [locationFetchFailed, setLocationFetchFailed] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])({});
    const [submitting, setSubmitting] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('');
    const [result, setResult] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [warning, setWarning] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const selectedContact = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>contactOptions.find((c)=>c.value === selectedContactKey) || null, [
        contactOptions,
        selectedContactKey
    ]);
    const locationID = selectedContact?.locationID || null;
    const selectedLocation = locationID ? locationsById[String(locationID)] || null : null;
    const hoursReady = !locationID || Boolean(selectedLocation) || Boolean(locationFetchFailed[String(locationID)]);
    const hoursLoading = Boolean(locationID && !hoursReady);
    const slotTz = selectedLocation?.timezone || studioTz || null;
    const durationMins = locationID ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$studioSlotHours$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["resolveLessonMinutes"])(selectedLocation?.defaultLessonMinutes) : 60;
    const dayHours = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>{
        // Wait for the location document — do not invent fallback chips while loading.
        if (!hoursReady) return {
            closed: false,
            openMin: null,
            closeMin: null
        };
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$studioSlotHours$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["resolveStudioDayHours"])(selectedLocation?.operatingHours, slotDate, slotTz);
    }, [
        hoursReady,
        selectedLocation,
        slotDate,
        slotTz
    ]);
    const locationIntros = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>introCatalog.filter((s)=>{
            if (s.isActive === false) return false;
            if (!locationMatches(s, locationID)) return false;
            const price = Number(s.price);
            // $0 Setup intros are complimentary and sellable from Sell Intro.
            if (Number.isFinite(price) && price === 0) return true;
            return price > 0 && s.isChargeable !== false;
        }), [
        introCatalog,
        locationID
    ]);
    const selectedIntro = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>locationIntros.find((s)=>String(s._id) === String(selectedIntroID)) || null, [
        locationIntros,
        selectedIntroID
    ]);
    const isFreeIntro = selectedIntro != null && Number.isFinite(Number(selectedIntro.price)) && Number(selectedIntro.price) === 0;
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (!open) return;
        let cancelled = false;
        setError('');
        setResult(null);
        setWarning(null);
        setSelectedContactKey('');
        setSelectedIntroID('');
        setMethod('link');
        setChannel('sms');
        setDeviceID('');
        setIncludeSlot(false);
        setTeacherID('');
        setSlotDate('');
        setSelectedSlot(null);
        setLocationsById({});
        setLocationFetchFailed({});
        setSubmitting(false);
        async function load() {
            setCatalogLoading(true);
            const [leadsRes, customersRes, introsRes, teachersRes, locationsRes] = await Promise.all([
                __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].get('/api/lead?limit=200&page=1'),
                __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].get('/api/customer?limit=200&page=1'),
                __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].get('/api/calendar-service?type=intro&limit=200'),
                __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].get('/api/teacher?limit=200&status=active'),
                __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].get('/api/location?limit=50')
            ]);
            if (cancelled) return;
            const options = [];
            const convertedCustomerIds = new Set();
            if (leadsRes?.success && Array.isArray(leadsRes.data)) {
                for (const lead of leadsRes.data){
                    const loc = lead.locationID;
                    const locId = Array.isArray(loc) ? loc[0]?._id || loc[0] || null : loc?._id || loc || null;
                    const convertedId = lead.convertedCustomerID ? String(lead.convertedCustomerID?._id || lead.convertedCustomerID) : null;
                    if (convertedId) convertedCustomerIds.add(convertedId);
                    options.push({
                        value: convertedId ? `customer:${convertedId}` : `lead:${lead._id ?? lead.id}`,
                        label: [
                            (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["nameWithMembers"])(lead) || 'Unnamed lead',
                            lead.phoneNumber || lead.email || null,
                            convertedId ? 'Customer' : 'Lead'
                        ].filter(Boolean).join(' · '),
                        kind: convertedId ? 'customer' : 'lead',
                        leadID: String(lead._id ?? lead.id),
                        customerID: convertedId,
                        locationID: locId ? String(locId) : null,
                        phoneNumber: lead.phoneNumber || null,
                        email: lead.email || null,
                        stage: lead.stage || null
                    });
                }
            }
            if (customersRes?.success && Array.isArray(customersRes.data)) {
                for (const cust of customersRes.data){
                    const id = String(cust._id ?? cust.id);
                    if (convertedCustomerIds.has(id)) continue;
                    const loc = cust.locationID;
                    const locId = Array.isArray(loc) ? loc[0]?._id || loc[0] || null : loc?._id || loc || null;
                    options.push({
                        value: `customer:${id}`,
                        label: [
                            cust.name || 'Unnamed customer',
                            cust.phoneNumber || cust.email || null,
                            'Customer'
                        ].filter(Boolean).join(' · '),
                        kind: 'customer',
                        leadID: null,
                        customerID: id,
                        locationID: locId ? String(locId) : null,
                        phoneNumber: cust.phoneNumber || null,
                        email: cust.email || null,
                        stage: null
                    });
                }
            }
            options.sort((a, b)=>String(a.label).localeCompare(String(b.label)));
            setContactOptions(options);
            if (introsRes?.success && Array.isArray(introsRes.data)) {
                setIntroCatalog(introsRes.data);
            } else {
                setIntroCatalog([]);
            }
            if (teachersRes?.success && Array.isArray(teachersRes.data)) {
                setTeacherOptions(teachersRes.data.map((t)=>({
                        value: String(t._id ?? t.id),
                        label: t.name || t.email || String(t._id)
                    })));
            } else {
                setTeacherOptions([]);
            }
            if (locationsRes?.success && Array.isArray(locationsRes.data)) {
                const byId = {};
                for (const loc of locationsRes.data){
                    const settings = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$studioSlotHours$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["locationSlotSettings"])(loc);
                    if (settings) byId[String(loc._id ?? loc.id)] = settings;
                }
                setLocationsById(byId);
            } else {
                setLocationsById({});
            }
            setCatalogLoading(false);
        }
        load();
        return ()=>{
            cancelled = true;
        };
    }, [
        open
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (!selectedIntroID) return;
        if (!locationIntros.some((s)=>String(s._id) === String(selectedIntroID))) {
            setSelectedIntroID('');
        }
    }, [
        locationIntros,
        selectedIntroID
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        setWarning(null);
    }, [
        selectedContactKey
    ]);
    // Locations list is capped at 50 — pull the contact's studio by id when missing.
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (!locationID) return;
        const id = String(locationID);
        if (locationsById[id] || locationFetchFailed[id]) return;
        let cancelled = false;
        __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].get(`/api/location/${id}`).then((res)=>{
            if (cancelled) return;
            if (!res?.success || !res.data) {
                setLocationFetchFailed((prev)=>prev[id] ? prev : {
                        ...prev,
                        [id]: true
                    });
                return;
            }
            const settings = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$studioSlotHours$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["locationSlotSettings"])(res.data);
            if (!settings) {
                setLocationFetchFailed((prev)=>prev[id] ? prev : {
                        ...prev,
                        [id]: true
                    });
                return;
            }
            setLocationsById((prev)=>prev[id] ? prev : {
                    ...prev,
                    [id]: settings
                });
        }).catch(()=>{
            if (!cancelled) {
                setLocationFetchFailed((prev)=>prev[id] ? prev : {
                        ...prev,
                        [id]: true
                    });
            }
        });
        return ()=>{
            cancelled = true;
        };
    }, [
        locationID,
        locationsById,
        locationFetchFailed
    ]);
    // A slot picked for one studio or lesson length is not valid for another.
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        setSelectedSlot(null);
    }, [
        locationID,
        durationMins
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (dayHours.closed) setSelectedSlot(null);
    }, [
        dayHours.closed,
        slotDate
    ]);
    function handleClose() {
        setError('');
        setResult(null);
        setWarning(null);
        setSubmitting(false);
        onClose?.();
    }
    async function submitSale({ confirmOverride = false } = {}) {
        if (!selectedContact) {
            setError('Please select a lead or customer.');
            return;
        }
        if (!selectedIntro) {
            setError('Select an intro from Setup before selling.');
            return;
        }
        const introPrice = Number(selectedIntro.price);
        const freeIntro = Number.isFinite(introPrice) && introPrice === 0;
        if (!freeIntro && (!(introPrice > 0) || selectedIntro.isChargeable === false)) {
            setError('That intro is not chargeable. Fix the price in Settings → Setup → Intro.');
            return;
        }
        if (!freeIntro && method === 'link') {
            if (channel !== 'email' && !selectedContact?.phoneNumber) {
                setError('This contact has no phone number — pick Email or add a phone first.');
                return;
            }
            if (channel !== 'sms' && !selectedContact?.email) {
                setError('This contact has no email — pick SMS or add an email first.');
                return;
            }
        }
        if (!freeIntro && method === 'terminal' && !deviceID) {
            setError('Select a terminal to charge.');
            return;
        }
        let slotPayload;
        if (includeSlot) {
            if (hoursLoading) {
                setError('Studio hours are still loading. Wait a moment, then pick a slot.');
                return;
            }
            if (dayHours.closed) {
                setError('The studio is closed that day. Pick another date, or turn off “Hold a slot”.');
                return;
            }
            if (!teacherID || !slotDate || !selectedSlot) {
                setError('Pick a teacher, date, and time slot, or turn off “Hold a slot”.');
                return;
            }
            const range = (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$calendar$2f$LessonSlotPicker$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["slotWallTimesToUtcRange"])(slotDate, selectedSlot, slotTz);
            if (!range) {
                setError('Could not resolve the selected slot time.');
                return;
            }
            slotPayload = {
                startDateTime: range.startDateTime,
                endDateTime: range.endDateTime,
                calendarServiceID: selectedIntro._id,
                serviceType: selectedIntro.serviceName,
                teacherID
            };
        }
        setError('');
        setSubmitting(true);
        setResult(null);
        const body = {
            calendarServiceID: selectedIntro._id,
            amount: introPrice,
            description: selectedIntro.serviceName,
            // Complimentary intros skip payment collection — backend ignores method.
            method: freeIntro ? 'cash' : method,
            confirmOverride: confirmOverride || undefined,
            ...selectedContact.leadID ? {
                leadID: selectedContact.leadID
            } : {},
            ...selectedContact.customerID ? {
                customerID: selectedContact.customerID
            } : {},
            ...!freeIntro && method === 'link' ? {
                channel
            } : {},
            ...!freeIntro && method === 'terminal' ? {
                billing: {
                    deviceID,
                    ...(0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$payments$2f$TerminalDeviceField$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["terminalTipPayload"])()
                }
            } : {},
            ...slotPayload ? {
                slot: slotPayload
            } : {}
        };
        try {
            const res = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].post('/api/payment-request/lead', body);
            if (!res?.success) {
                const flags = res?.errorData;
                // Only the prior-intro / active-package warning is confirmable. A 409 for
                // a busy teacher must stay an error — confirming would resubmit the same slot.
                if (flags?.needsConfirm || /already has an intro|active package/i.test(String(res?.error || ''))) {
                    setWarning({
                        alreadyTookIntro: Boolean(flags?.alreadyTookIntro),
                        isActiveCustomer: Boolean(flags?.isActiveCustomer),
                        message: res?.error || 'Confirm to sell another intro.'
                    });
                    setSubmitting(false);
                    return;
                }
                setError(res?.error || 'Failed to sell the intro.');
                setSubmitting(false);
                return;
            }
            const data = res.data || {};
            setWarning(null);
            setResult({
                method: freeIntro ? 'free' : method,
                message: res.message || 'Done',
                checkoutUrl: data.checkoutUrl || null,
                customerID: data.customerID || selectedContact.customerID || null,
                pending: Boolean(data.pending)
            });
            if (freeIntro) toast.success('Complimentary intro booked.');
            else if (method === 'link') toast.success('Payment link sent.');
            else if (method === 'cash') toast.success('Trial sold — cash collected.');
            else if (method === 'card') toast.success('Checkout opened — complete payment on the card page.');
            else if (data.pending) toast.success('Charge sent to the reader — waiting for the card.');
            else toast.success('Trial sold — terminal payment collected.');
            onSuccess?.(data);
        } catch (err) {
            setError(err?.message || 'Failed to sell the intro.');
        } finally{
            setSubmitting(false);
        }
    }
    async function handleSubmit() {
        await submitSale({
            confirmOverride: false
        });
    }
    async function handleConfirmOverride() {
        await submitSale({
            confirmOverride: true
        });
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$sheet$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Sheet"], {
        open: open,
        onClose: handleClose,
        width: SHEET_WIDTH,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$sheet$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SheetContent"], {
            onClose: handleClose,
            className: "flex flex-col overflow-hidden p-0",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "shrink-0 border-b border-border bg-muted/30 px-5 pt-5 pb-3",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-[14px] font-bold text-foreground",
                            children: "Sell Trial / Intro"
                        }, void 0, false, {
                            fileName: "[project]/components/enrollment/SellIntroSheet.js",
                            lineNumber: 432,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-[12px] text-muted-foreground mt-1",
                            children: "Sell a Setup intro to a lead or customer — share a payment link or collect cash, card, or terminal in person."
                        }, void 0, false, {
                            fileName: "[project]/components/enrollment/SellIntroSheet.js",
                            lineNumber: 433,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/enrollment/SellIntroSheet.js",
                    lineNumber: 431,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex-1 overflow-y-auto px-5 py-4 space-y-4",
                    children: result ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "rounded-xl border border-success/30 bg-success/5 p-4 space-y-3",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-[13px] font-semibold text-foreground",
                                children: result.message
                            }, void 0, false, {
                                fileName: "[project]/components/enrollment/SellIntroSheet.js",
                                lineNumber: 442,
                                columnNumber: 15
                            }, this),
                            result.checkoutUrl && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                href: result.checkoutUrl,
                                target: "_blank",
                                rel: "noopener noreferrer",
                                className: "inline-flex items-center gap-1.5 text-[12px] font-medium text-[var(--studio-primary)] hover:underline",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$link$2d$2$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Link2$3e$__["Link2"], {
                                        className: "h-3.5 w-3.5"
                                    }, void 0, false, {
                                        fileName: "[project]/components/enrollment/SellIntroSheet.js",
                                        lineNumber: 450,
                                        columnNumber: 19
                                    }, this),
                                    "Open checkout page",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$external$2d$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ExternalLink$3e$__["ExternalLink"], {
                                        className: "h-3 w-3"
                                    }, void 0, false, {
                                        fileName: "[project]/components/enrollment/SellIntroSheet.js",
                                        lineNumber: 452,
                                        columnNumber: 19
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/enrollment/SellIntroSheet.js",
                                lineNumber: 444,
                                columnNumber: 17
                            }, this),
                            result.customerID && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                href: `/settings/users-roles/customers/${result.customerID}`,
                                className: "block text-[12px] font-medium text-[var(--studio-primary)] hover:underline",
                                onClick: handleClose,
                                children: "View customer profile →"
                            }, void 0, false, {
                                fileName: "[project]/components/enrollment/SellIntroSheet.js",
                                lineNumber: 456,
                                columnNumber: 17
                            }, this),
                            result.pending && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-[12px] text-muted-foreground",
                                children: "Waiting for the customer to tap their card on the reader. They will convert once payment clears."
                            }, void 0, false, {
                                fileName: "[project]/components/enrollment/SellIntroSheet.js",
                                lineNumber: 465,
                                columnNumber: 17
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "pt-1",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Button"], {
                                    type: "button",
                                    size: "sm",
                                    variant: "outline",
                                    onClick: handleClose,
                                    children: "Done"
                                }, void 0, false, {
                                    fileName: "[project]/components/enrollment/SellIntroSheet.js",
                                    lineNumber: 471,
                                    columnNumber: 17
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/components/enrollment/SellIntroSheet.js",
                                lineNumber: 470,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/enrollment/SellIntroSheet.js",
                        lineNumber: 441,
                        columnNumber: 13
                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                        children: [
                            warning && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "rounded-xl border border-warning/40 bg-warning/10 p-3 space-y-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-[13px] font-semibold text-foreground",
                                        children: "Confirm before selling"
                                    }, void 0, false, {
                                        fileName: "[project]/components/enrollment/SellIntroSheet.js",
                                        lineNumber: 480,
                                        columnNumber: 19
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                        className: "list-disc pl-4 space-y-1 text-[12px] text-muted-foreground",
                                        children: [
                                            warning.alreadyTookIntro && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                children: "This customer already took an intro. Sell another one anyway?"
                                            }, void 0, false, {
                                                fileName: "[project]/components/enrollment/SellIntroSheet.js",
                                                lineNumber: 483,
                                                columnNumber: 23
                                            }, this),
                                            warning.isActiveCustomer && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                children: "This customer already has an active package. Sell an intro anyway?"
                                            }, void 0, false, {
                                                fileName: "[project]/components/enrollment/SellIntroSheet.js",
                                                lineNumber: 486,
                                                columnNumber: 23
                                            }, this),
                                            !warning.alreadyTookIntro && !warning.isActiveCustomer && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                children: warning.message
                                            }, void 0, false, {
                                                fileName: "[project]/components/enrollment/SellIntroSheet.js",
                                                lineNumber: 489,
                                                columnNumber: 23
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/enrollment/SellIntroSheet.js",
                                        lineNumber: 481,
                                        columnNumber: 19
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex flex-wrap gap-2 pt-1",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Button"], {
                                                type: "button",
                                                size: "sm",
                                                onClick: handleConfirmOverride,
                                                disabled: submitting,
                                                children: submitting ? 'Selling…' : 'Yes, sell another intro'
                                            }, void 0, false, {
                                                fileName: "[project]/components/enrollment/SellIntroSheet.js",
                                                lineNumber: 493,
                                                columnNumber: 21
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Button"], {
                                                type: "button",
                                                size: "sm",
                                                variant: "outline",
                                                onClick: ()=>setWarning(null),
                                                disabled: submitting,
                                                children: "Cancel"
                                            }, void 0, false, {
                                                fileName: "[project]/components/enrollment/SellIntroSheet.js",
                                                lineNumber: 501,
                                                columnNumber: 21
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/enrollment/SellIntroSheet.js",
                                        lineNumber: 492,
                                        columnNumber: 19
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/enrollment/SellIntroSheet.js",
                                lineNumber: 479,
                                columnNumber: 17
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "rounded-xl border border-border bg-card p-3",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-[11px] font-medium text-muted-foreground mb-1",
                                        children: "Lead or customer"
                                    }, void 0, false, {
                                        fileName: "[project]/components/enrollment/SellIntroSheet.js",
                                        lineNumber: 515,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$searchable$2d$select$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                        value: selectedContactKey,
                                        onChange: setSelectedContactKey,
                                        options: contactOptions,
                                        placeholder: "Search lead or customer…"
                                    }, void 0, false, {
                                        fileName: "[project]/components/enrollment/SellIntroSheet.js",
                                        lineNumber: 518,
                                        columnNumber: 17
                                    }, this),
                                    selectedContact?.stage && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "mt-1.5 text-[11px] text-muted-foreground",
                                        children: [
                                            "Current stage:",
                                            ' ',
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "font-medium text-foreground",
                                                children: selectedContact.stage
                                            }, void 0, false, {
                                                fileName: "[project]/components/enrollment/SellIntroSheet.js",
                                                lineNumber: 527,
                                                columnNumber: 21
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/enrollment/SellIntroSheet.js",
                                        lineNumber: 525,
                                        columnNumber: 19
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/enrollment/SellIntroSheet.js",
                                lineNumber: 514,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "rounded-xl border border-border bg-card p-3 space-y-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-[11px] font-medium text-muted-foreground",
                                        children: "Intro"
                                    }, void 0, false, {
                                        fileName: "[project]/components/enrollment/SellIntroSheet.js",
                                        lineNumber: 533,
                                        columnNumber: 17
                                    }, this),
                                    catalogLoading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-[11px] text-muted-foreground flex items-center gap-1.5",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__["Loader2"], {
                                                className: "h-3 w-3 animate-spin"
                                            }, void 0, false, {
                                                fileName: "[project]/components/enrollment/SellIntroSheet.js",
                                                lineNumber: 536,
                                                columnNumber: 21
                                            }, this),
                                            "Loading intros…"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/enrollment/SellIntroSheet.js",
                                        lineNumber: 535,
                                        columnNumber: 19
                                    }, this) : locationIntros.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-[11px] text-muted-foreground",
                                        children: [
                                            "No chargeable intros for this location. Create one in",
                                            ' ',
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                                href: "/settings/setup",
                                                className: "font-medium text-[var(--studio-primary)] hover:underline",
                                                children: "Settings → Setup → Services → Intro"
                                            }, void 0, false, {
                                                fileName: "[project]/components/enrollment/SellIntroSheet.js",
                                                lineNumber: 542,
                                                columnNumber: 21
                                            }, this),
                                            ' ',
                                            "first."
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/enrollment/SellIntroSheet.js",
                                        lineNumber: 540,
                                        columnNumber: 19
                                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "space-y-1.5",
                                        children: locationIntros.map((intro)=>{
                                            const isSelected = String(intro._id) === String(selectedIntroID);
                                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                type: "button",
                                                onClick: ()=>setSelectedIntroID(String(intro._id)),
                                                className: [
                                                    'flex w-full items-center justify-between rounded-lg border px-2.5 py-2 text-left transition-colors',
                                                    isSelected ? 'border-brand bg-brand/10' : 'border-border bg-background hover:bg-muted/40'
                                                ].join(' '),
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex items-center gap-2 min-w-0",
                                                        children: [
                                                            intro.color && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "h-2.5 w-2.5 rounded-full shrink-0",
                                                                style: {
                                                                    background: intro.color
                                                                }
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/enrollment/SellIntroSheet.js",
                                                                lineNumber: 568,
                                                                columnNumber: 31
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "text-[12px] font-medium truncate",
                                                                children: intro.serviceName
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/enrollment/SellIntroSheet.js",
                                                                lineNumber: 573,
                                                                columnNumber: 29
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/components/enrollment/SellIntroSheet.js",
                                                        lineNumber: 566,
                                                        columnNumber: 27
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-[12px] font-semibold shrink-0 ml-2",
                                                        children: Number(intro.price) === 0 ? 'Free' : `$${Number(intro.price).toFixed(2)}`
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/enrollment/SellIntroSheet.js",
                                                        lineNumber: 577,
                                                        columnNumber: 27
                                                    }, this)
                                                ]
                                            }, intro._id, true, {
                                                fileName: "[project]/components/enrollment/SellIntroSheet.js",
                                                lineNumber: 555,
                                                columnNumber: 25
                                            }, this);
                                        })
                                    }, void 0, false, {
                                        fileName: "[project]/components/enrollment/SellIntroSheet.js",
                                        lineNumber: 551,
                                        columnNumber: 19
                                    }, this),
                                    selectedIntro && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-[11px] text-muted-foreground",
                                        children: "Price locked from Setup — staff cannot override."
                                    }, void 0, false, {
                                        fileName: "[project]/components/enrollment/SellIntroSheet.js",
                                        lineNumber: 588,
                                        columnNumber: 19
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/enrollment/SellIntroSheet.js",
                                lineNumber: 532,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "rounded-xl border border-border bg-card p-3 space-y-3",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-[11px] font-medium text-muted-foreground",
                                        children: "Payment"
                                    }, void 0, false, {
                                        fileName: "[project]/components/enrollment/SellIntroSheet.js",
                                        lineNumber: 595,
                                        columnNumber: 17
                                    }, this),
                                    isFreeIntro ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-[12px] text-muted-foreground",
                                        children: "Complimentary intro — no payment to collect. Booking converts the lead the same way a paid sale does."
                                    }, void 0, false, {
                                        fileName: "[project]/components/enrollment/SellIntroSheet.js",
                                        lineNumber: 597,
                                        columnNumber: 19
                                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$payments$2f$PaymentMethodPicker$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                                methods: INTRO_PAYMENT_METHODS,
                                                value: method,
                                                onChange: (v)=>{
                                                    setMethod(v);
                                                    setDeviceID('');
                                                }
                                            }, void 0, false, {
                                                fileName: "[project]/components/enrollment/SellIntroSheet.js",
                                                lineNumber: 603,
                                                columnNumber: 21
                                            }, this),
                                            method === 'link' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "text-[11px] font-medium text-muted-foreground mb-1.5",
                                                        children: "Send via"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/enrollment/SellIntroSheet.js",
                                                        lineNumber: 614,
                                                        columnNumber: 25
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "inline-flex rounded-lg border border-border bg-background p-0.5",
                                                        children: LINK_CHANNELS.map((c)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                type: "button",
                                                                onClick: ()=>setChannel(c.value),
                                                                className: [
                                                                    'h-8 px-3 rounded-md text-[12px] font-medium transition-colors',
                                                                    channel === c.value ? 'bg-brand text-brand-foreground' : 'text-muted-foreground hover:text-foreground'
                                                                ].join(' '),
                                                                children: c.label
                                                            }, c.value, false, {
                                                                fileName: "[project]/components/enrollment/SellIntroSheet.js",
                                                                lineNumber: 619,
                                                                columnNumber: 29
                                                            }, this))
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/enrollment/SellIntroSheet.js",
                                                        lineNumber: 617,
                                                        columnNumber: 25
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/enrollment/SellIntroSheet.js",
                                                lineNumber: 613,
                                                columnNumber: 23
                                            }, this),
                                            method === 'terminal' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$payments$2f$TerminalDeviceField$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                                method: "terminal",
                                                locationID: locationID,
                                                deviceID: deviceID,
                                                onDeviceChange: setDeviceID
                                            }, void 0, false, {
                                                fileName: "[project]/components/enrollment/SellIntroSheet.js",
                                                lineNumber: 638,
                                                columnNumber: 23
                                            }, this),
                                            method === 'card' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-[11px] text-muted-foreground",
                                                children: "Opens a hosted checkout page you can show the lead (or share) while they're here."
                                            }, void 0, false, {
                                                fileName: "[project]/components/enrollment/SellIntroSheet.js",
                                                lineNumber: 647,
                                                columnNumber: 23
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/enrollment/SellIntroSheet.js",
                                        lineNumber: 602,
                                        columnNumber: 19
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/enrollment/SellIntroSheet.js",
                                lineNumber: 594,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "rounded-xl border border-border bg-card p-3 space-y-3",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        className: "flex items-center gap-2 text-[12px] font-medium text-foreground",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                type: "checkbox",
                                                checked: includeSlot,
                                                onChange: (e)=>{
                                                    setIncludeSlot(e.target.checked);
                                                    if (!e.target.checked) {
                                                        setSelectedSlot(null);
                                                        setTeacherID('');
                                                        setSlotDate('');
                                                    }
                                                }
                                            }, void 0, false, {
                                                fileName: "[project]/components/enrollment/SellIntroSheet.js",
                                                lineNumber: 658,
                                                columnNumber: 19
                                            }, this),
                                            "Hold a time slot (optional)"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/enrollment/SellIntroSheet.js",
                                        lineNumber: 657,
                                        columnNumber: 17
                                    }, this),
                                    includeSlot && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                                        children: !locationID ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-[11px] text-muted-foreground",
                                            children: "This lead has no location — assign one before holding a slot."
                                        }, void 0, false, {
                                            fileName: "[project]/components/enrollment/SellIntroSheet.js",
                                            lineNumber: 675,
                                            columnNumber: 23
                                        }, this) : !selectedIntro ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-[11px] text-muted-foreground",
                                            children: "Select an intro above before picking a slot."
                                        }, void 0, false, {
                                            fileName: "[project]/components/enrollment/SellIntroSheet.js",
                                            lineNumber: 679,
                                            columnNumber: 23
                                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$calendar$2f$LessonSlotPicker$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                            teacherOptions: teacherOptions,
                                            teacherID: teacherID,
                                            onTeacherChange: setTeacherID,
                                            date: slotDate,
                                            onDateChange: setSlotDate,
                                            selectedSlot: selectedSlot,
                                            onSlotChange: setSelectedSlot,
                                            durationMins: durationMins,
                                            slotStepMins: durationMins,
                                            slotAlignMins: dayHours.openMin ?? undefined,
                                            dayEndMin: dayHours.closeMin ?? undefined,
                                            dayClosed: dayHours.closed,
                                            hoursLoading: hoursLoading,
                                            studioTz: slotTz
                                        }, void 0, false, {
                                            fileName: "[project]/components/enrollment/SellIntroSheet.js",
                                            lineNumber: 683,
                                            columnNumber: 23
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/components/enrollment/SellIntroSheet.js",
                                        lineNumber: 673,
                                        columnNumber: 19
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/enrollment/SellIntroSheet.js",
                                lineNumber: 656,
                                columnNumber: 15
                            }, this),
                            error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "rounded-lg bg-destructive/10 border border-destructive/20 px-3 py-2 text-[12px] text-destructive",
                                children: error
                            }, void 0, false, {
                                fileName: "[project]/components/enrollment/SellIntroSheet.js",
                                lineNumber: 705,
                                columnNumber: 17
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/enrollment/SellIntroSheet.js",
                        lineNumber: 477,
                        columnNumber: 13
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/components/enrollment/SellIntroSheet.js",
                    lineNumber: 439,
                    columnNumber: 9
                }, this),
                !result && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "shrink-0 border-t border-border px-5 py-3 flex items-center justify-end gap-2",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Button"], {
                            type: "button",
                            variant: "outline",
                            size: "sm",
                            onClick: handleClose,
                            disabled: submitting,
                            children: "Cancel"
                        }, void 0, false, {
                            fileName: "[project]/components/enrollment/SellIntroSheet.js",
                            lineNumber: 715,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Button"], {
                            type: "button",
                            size: "sm",
                            onClick: handleSubmit,
                            disabled: submitting,
                            children: submitting ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__["Loader2"], {
                                        className: "h-3.5 w-3.5 animate-spin mr-1.5"
                                    }, void 0, false, {
                                        fileName: "[project]/components/enrollment/SellIntroSheet.js",
                                        lineNumber: 721,
                                        columnNumber: 19
                                    }, this),
                                    "Working…"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/enrollment/SellIntroSheet.js",
                                lineNumber: 720,
                                columnNumber: 17
                            }, this) : isFreeIntro ? 'Book free intro' : method === 'link' ? 'Send payment link' : method === 'cash' ? 'Collect cash' : method === 'card' ? 'Open card checkout' : 'Charge terminal'
                        }, void 0, false, {
                            fileName: "[project]/components/enrollment/SellIntroSheet.js",
                            lineNumber: 718,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/enrollment/SellIntroSheet.js",
                    lineNumber: 714,
                    columnNumber: 11
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/components/enrollment/SellIntroSheet.js",
            lineNumber: 430,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/enrollment/SellIntroSheet.js",
        lineNumber: 429,
        columnNumber: 5
    }, this);
}
}),
"[project]/components/human-queue/GlobalIncomingCallAlert.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>GlobalIncomingCallAlert
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$phone$2d$call$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__PhoneCall$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/phone-call.js [app-ssr] (ecmascript) <export default as PhoneCall>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/x.js [app-ssr] (ecmascript) <export default as X>");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/api.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/auth.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$permissions$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/lib/permissions.js [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$notificationPreferences$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/notificationPreferences.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$notificationSounds$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/notificationSounds.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$twilioVoiceClient$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/twilioVoiceClient.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$avatar$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/avatar.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/utils.js [app-ssr] (ecmascript)");
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
const AGENTS_POLL_MS = 30_000;
const WAITING_VISIBLE_MS = 5_000;
const WAITING_HIDDEN_MS = 8_000;
function waitingItemId(item) {
    return String(item?.id || item?._id || '');
}
function sameEmail(a, b) {
    return String(a || '').trim().toLowerCase() === String(b || '').trim().toLowerCase();
}
function GlobalIncomingCallAlert() {
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRouter"])();
    const pathname = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["usePathname"])();
    const searchParams = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useSearchParams"])();
    const [enabled, setEnabled] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [online, setOnline] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [canAnswer, setCanAnswer] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [waiting, setWaiting] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [dismissedIds, setDismissedIds] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(()=>new Set());
    const [answering, setAnswering] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [alreadyOnCall, setAlreadyOnCall] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const stopPollingRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(false);
    const notifiedIdsRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(new Set());
    const wasRingingRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(false);
    const canReadCallCenter = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$permissions$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["hasPermission"])('inbox', 'CallCenter', 'read');
    const queueTab = (searchParams?.get('tab') || 'waiting').toLowerCase();
    const onCallCenterWaiting = pathname === '/inbox/human-queue' && (queueTab === 'waiting' || queueTab === 'escalations' || queueTab === 'unassigned');
    const refreshAgents = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(async ()=>{
        if (stopPollingRef.current || !canReadCallCenter) return;
        const user = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getCurrentUser"])();
        if (!user?.email) {
            setEnabled(false);
            setOnline(false);
            setCanAnswer(false);
            return;
        }
        const r = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].get('/api/human-queue/agents');
        if (r.status === 403) {
            stopPollingRef.current = true;
            setEnabled(false);
            setOnline(false);
            setCanAnswer(false);
            return;
        }
        if (!r.success) return;
        const agents = Array.isArray(r.data?.agents) ? r.data.agents : Array.isArray(r.data) ? r.data : [];
        const me = agents.find((a)=>sameEmail(a.email, user.email));
        const manage = Array.isArray(r.data) ? false : Boolean(r.data?.canManageCalls);
        setEnabled(Boolean(me));
        setOnline(Boolean(me?.isAvailableForCalls));
        setCanAnswer(manage);
    }, [
        canReadCallCenter
    ]);
    const refreshWaiting = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(async ()=>{
        if (stopPollingRef.current || !online || !canAnswer) {
            setWaiting([]);
            return;
        }
        const r = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].get('/api/human-queue?tab=waiting');
        if (r.status === 403) {
            stopPollingRef.current = true;
            setEnabled(false);
            setOnline(false);
            setCanAnswer(false);
            setWaiting([]);
            return;
        }
        if (!r.success) return;
        const items = Array.isArray(r.data) ? r.data : Array.isArray(r.data?.items) ? r.data.items : [];
        setWaiting(items.filter((i)=>i.status === 'waiting' || !i.status));
    }, [
        online,
        canAnswer
    ]);
    // Gate: only users with Call Center read
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (!canReadCallCenter) {
            stopPollingRef.current = true;
            setEnabled(false);
            setOnline(false);
            setCanAnswer(false);
            setWaiting([]);
            return;
        }
        stopPollingRef.current = false;
        refreshAgents();
    }, [
        canReadCallCenter,
        refreshAgents
    ]);
    // Agents poll (~30s)
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (!canReadCallCenter || stopPollingRef.current) return undefined;
        const id = setInterval(refreshAgents, AGENTS_POLL_MS);
        return ()=>clearInterval(id);
    }, [
        canReadCallCenter,
        refreshAgents
    ]);
    // Waiting poll — only while online
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (!online || !canAnswer || stopPollingRef.current) {
            setWaiting([]);
            return undefined;
        }
        let intervalId;
        const tick = ()=>{
            if (stopPollingRef.current) return;
            refreshWaiting();
        };
        tick();
        const schedule = ()=>{
            clearInterval(intervalId);
            const ms = typeof document !== 'undefined' && document.visibilityState === 'hidden' ? WAITING_HIDDEN_MS : WAITING_VISIBLE_MS;
            intervalId = setInterval(tick, ms);
        };
        schedule();
        const onVisibility = ()=>{
            schedule();
            if (document.visibilityState === 'visible') tick();
        };
        document.addEventListener('visibilitychange', onVisibility);
        return ()=>{
            clearInterval(intervalId);
            document.removeEventListener('visibilitychange', onVisibility);
        };
    }, [
        online,
        canAnswer,
        refreshWaiting
    ]);
    // Keep Answer/ring in sync when Twilio connection starts on another page surface
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const tick = ()=>setAlreadyOnCall(Boolean((0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$twilioVoiceClient$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getActiveConnection"])()));
        tick();
        const id = setInterval(tick, 1500);
        return ()=>clearInterval(id);
    }, []);
    const visibleWaiting = waiting.filter((item)=>{
        const id = waitingItemId(item);
        return id && !dismissedIds.has(id);
    });
    const nextCall = visibleWaiting[0] || null;
    const nextId = nextCall ? waitingItemId(nextCall) : '';
    const showPopup = Boolean(nextCall && enabled && online && canAnswer && !onCallCenterWaiting);
    // Ring loop while any waiting call exists for an online agent (including Call Center waiting tab)
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const shouldRing = enabled && online && canAnswer && visibleWaiting.length > 0 && !alreadyOnCall && !answering && (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$notificationPreferences$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isNotificationEnabled"])('humanQueue.sound');
        if (shouldRing) {
            if (!wasRingingRef.current) {
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$notificationSounds$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["startIncomingRingLoop"])();
                wasRingingRef.current = true;
            }
        } else if (wasRingingRef.current) {
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$notificationSounds$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["stopIncomingRingLoop"])();
            wasRingingRef.current = false;
        }
        return ()=>{
            if (wasRingingRef.current) {
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$notificationSounds$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["stopIncomingRingLoop"])();
                wasRingingRef.current = false;
            }
        };
    }, [
        enabled,
        online,
        canAnswer,
        visibleWaiting.length,
        alreadyOnCall,
        answering,
        nextId
    ]);
    // System notification when CRM tab is in the background (permission already granted only)
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if ("TURBOPACK compile-time truthy", 1) return;
        //TURBOPACK unreachable
        ;
        const item = undefined;
    }, [
        enabled,
        online,
        canAnswer,
        visibleWaiting
    ]);
    // Clear dismissals when the call leaves the waiting list
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const liveIds = new Set(waiting.map(waitingItemId).filter(Boolean));
        setDismissedIds((prev)=>{
            let changed = false;
            const next = new Set();
            for (const id of prev){
                if (liveIds.has(id)) next.add(id);
                else changed = true;
            }
            return changed ? next : prev;
        });
        for (const id of notifiedIdsRef.current){
            if (!liveIds.has(id)) notifiedIdsRef.current.delete(id);
        }
    }, [
        waiting
    ]);
    const handleAnswer = ()=>{
        if (!nextId || alreadyOnCall || answering) return;
        setAnswering(true);
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$notificationSounds$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["stopIncomingRingLoop"])();
        wasRingingRef.current = false;
        router.push(`/inbox/human-queue?tab=waiting&answer=${encodeURIComponent(nextId)}`);
        // Reset answering after navigation settles; page owns the claim.
        setTimeout(()=>setAnswering(false), 2500);
    };
    const handleDismiss = ()=>{
        if (!nextId) return;
        setDismissedIds((prev)=>new Set(prev).add(nextId));
    };
    if (!showPopup || !nextCall) return null;
    const highPriority = nextCall.priority === 'High';
    const callerName = nextCall.leadName || nextCall.callerName || 'Unknown caller';
    const callerPhone = nextCall.phone || nextCall.callerPhone || '';
    const reason = nextCall.intent || nextCall.escalationReason || 'Requested human assistance';
    const waitingLabel = nextCall.waitMinutes ? `Waiting ${nextCall.waitMinutes}m` : 'Just now';
    const queueLabel = visibleWaiting.length > 1 ? `${visibleWaiting.length} waiting` : '1 in queue';
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "pointer-events-none fixed inset-x-0 bottom-0 z-[400] flex justify-center p-4 sm:inset-x-auto sm:bottom-6 sm:right-6 sm:justify-end sm:p-0",
        role: "alert",
        "aria-live": "assertive",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "pointer-events-auto w-full max-w-[380px] overflow-hidden rounded-2xl border border-border bg-card shadow-2xl animate-scale-in",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex items-center justify-between gap-3 border-b border-border bg-muted/40 px-4 py-2.5",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex min-w-0 items-center gap-2",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "relative flex h-2 w-2 shrink-0",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])('absolute inline-flex h-full w-full animate-ping rounded-full opacity-70', highPriority ? 'bg-red-500' : 'bg-[var(--studio-primary)]')
                                        }, void 0, false, {
                                            fileName: "[project]/components/human-queue/GlobalIncomingCallAlert.js",
                                            lineNumber: 276,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])('relative inline-flex h-2 w-2 rounded-full', highPriority ? 'bg-red-500' : 'bg-[var(--studio-primary)]')
                                        }, void 0, false, {
                                            fileName: "[project]/components/human-queue/GlobalIncomingCallAlert.js",
                                            lineNumber: 280,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/human-queue/GlobalIncomingCallAlert.js",
                                    lineNumber: 275,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-[11px] font-semibold uppercase tracking-wider text-muted-foreground",
                                    children: "Incoming call"
                                }, void 0, false, {
                                    fileName: "[project]/components/human-queue/GlobalIncomingCallAlert.js",
                                    lineNumber: 285,
                                    columnNumber: 13
                                }, this),
                                highPriority && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "rounded-full bg-red-500/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-red-600 dark:text-red-400",
                                    children: "High"
                                }, void 0, false, {
                                    fileName: "[project]/components/human-queue/GlobalIncomingCallAlert.js",
                                    lineNumber: 289,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/human-queue/GlobalIncomingCallAlert.js",
                            lineNumber: 274,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            type: "button",
                            onClick: handleDismiss,
                            className: "rounded-lg p-1.5 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground",
                            "aria-label": "Dismiss",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                className: "h-4 w-4"
                            }, void 0, false, {
                                fileName: "[project]/components/human-queue/GlobalIncomingCallAlert.js",
                                lineNumber: 300,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/components/human-queue/GlobalIncomingCallAlert.js",
                            lineNumber: 294,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/human-queue/GlobalIncomingCallAlert.js",
                    lineNumber: 273,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "space-y-4 p-4",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center gap-3",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$avatar$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Avatar"], {
                                    className: "h-12 w-12 border border-border",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$avatar$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AvatarFallback"], {
                                        className: "bg-[var(--studio-primary)] text-sm font-semibold text-white",
                                        children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getInitials"])(callerName)
                                    }, void 0, false, {
                                        fileName: "[project]/components/human-queue/GlobalIncomingCallAlert.js",
                                        lineNumber: 307,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/components/human-queue/GlobalIncomingCallAlert.js",
                                    lineNumber: 306,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "min-w-0",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "truncate text-base font-semibold text-foreground",
                                            children: callerName
                                        }, void 0, false, {
                                            fileName: "[project]/components/human-queue/GlobalIncomingCallAlert.js",
                                            lineNumber: 312,
                                            columnNumber: 15
                                        }, this),
                                        callerPhone ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "truncate text-sm text-muted-foreground",
                                            children: callerPhone
                                        }, void 0, false, {
                                            fileName: "[project]/components/human-queue/GlobalIncomingCallAlert.js",
                                            lineNumber: 314,
                                            columnNumber: 17
                                        }, this) : null,
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "mt-0.5 text-xs text-muted-foreground",
                                            children: [
                                                waitingLabel,
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "px-1.5 text-border",
                                                    children: "·"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/human-queue/GlobalIncomingCallAlert.js",
                                                    lineNumber: 318,
                                                    columnNumber: 17
                                                }, this),
                                                queueLabel
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/human-queue/GlobalIncomingCallAlert.js",
                                            lineNumber: 316,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/human-queue/GlobalIncomingCallAlert.js",
                                    lineNumber: 311,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/human-queue/GlobalIncomingCallAlert.js",
                            lineNumber: 305,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "rounded-xl border border-border bg-muted/30 px-3 py-2.5",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-[11px] font-medium uppercase tracking-wide text-muted-foreground",
                                    children: "Why they called"
                                }, void 0, false, {
                                    fileName: "[project]/components/human-queue/GlobalIncomingCallAlert.js",
                                    lineNumber: 325,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "mt-1 line-clamp-2 text-sm leading-snug text-foreground",
                                    children: reason
                                }, void 0, false, {
                                    fileName: "[project]/components/human-queue/GlobalIncomingCallAlert.js",
                                    lineNumber: 328,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/human-queue/GlobalIncomingCallAlert.js",
                            lineNumber: 324,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            type: "button",
                            disabled: alreadyOnCall || answering,
                            onClick: handleAnswer,
                            className: "inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-[var(--studio-primary)] text-sm font-semibold text-white shadow-sm transition-all hover:brightness-95 disabled:opacity-60",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$phone$2d$call$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__PhoneCall$3e$__["PhoneCall"], {
                                    className: "h-4 w-4"
                                }, void 0, false, {
                                    fileName: "[project]/components/human-queue/GlobalIncomingCallAlert.js",
                                    lineNumber: 337,
                                    columnNumber: 13
                                }, this),
                                answering ? 'Connecting…' : alreadyOnCall ? 'Already on a call' : 'Answer call'
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/human-queue/GlobalIncomingCallAlert.js",
                            lineNumber: 331,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/human-queue/GlobalIncomingCallAlert.js",
                    lineNumber: 304,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/components/human-queue/GlobalIncomingCallAlert.js",
            lineNumber: 272,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/human-queue/GlobalIncomingCallAlert.js",
        lineNumber: 267,
        columnNumber: 5
    }, this);
}
}),
"[project]/components/layout/Header.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Header
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$menu$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Menu$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/menu.js [app-ssr] (ecmascript) <export default as Menu>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$log$2d$out$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__LogOut$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/log-out.js [app-ssr] (ecmascript) <export default as LogOut>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$moon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Moon$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/moon.js [app-ssr] (ecmascript) <export default as Moon>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sun$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Sun$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/sun.js [app-ssr] (ecmascript) <export default as Sun>");
var __TURBOPACK__imported__module__$5b$project$5d2f$contexts$2f$ThemeContext$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/contexts/ThemeContext.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/button.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$shared$2f$BranchSelector$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/shared/BranchSelector.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$shared$2f$StaffLocationSwitcher$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/shared/StaffLocationSwitcher.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$enrollment$2f$CreateEnrollmentSheet$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/enrollment/CreateEnrollmentSheet.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$enrollment$2f$SellIntroSheet$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/enrollment/SellIntroSheet.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$enrollment$2f$EnrollMenu$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/enrollment/EnrollMenu.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$settings$2f$setup$2f$components$2f$EventsPurchases$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/settings/setup/components/EventsPurchases.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/auth.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/utils.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$permissions$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/lib/permissions.js [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$contexts$2f$InboxHeaderContext$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/contexts/InboxHeaderContext.js [app-ssr] (ecmascript)");
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
    const [showProfileMenu, setShowProfileMenu] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [createEnrollmentOpen, setCreateEnrollmentOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [sellIntroOpen, setSellIntroOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [enrollMode, setEnrollMode] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("service");
    const [purchaseOpen, setPurchaseOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const profileRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const user = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getCurrentUser"])();
    const shortName = (user?.name || "").trim().split(/\s+/).filter(Boolean)[0];
    const { theme, setTheme, mounted: themeMounted } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$contexts$2f$ThemeContext$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useTheme"])();
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        function handleClickOutside(event) {
            if (profileRef.current && !profileRef.current.contains(event.target)) {
                setShowProfileMenu(false);
            }
        }
        if (showProfileMenu) {
            document.addEventListener("click", handleClickOutside);
            return ()=>document.removeEventListener("click", handleClickOutside);
        }
    }, [
        showProfileMenu
    ]);
    const { inboxCounts } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$contexts$2f$InboxHeaderContext$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useInboxHeader"])();
    const pathname = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["usePathname"])();
    const searchParams = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useSearchParams"])();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRouter"])();
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
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
                className: "sticky top-0 z-[60] border-b py-3 border-border bg-background",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex flex-col gap-3 px-3 sm:px-4 lg:px-6 lg:flex-row lg:items-center lg:justify-between",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "order-2 lg:order-1 w-full min-w-0 overflow-x-auto scrollbar-hide lg:flex-1 lg:pr-2",
                            children: isInbox ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex w-max items-center gap-0.5 h-9 rounded-full bg-muted p-1",
                                children: INBOX_FILTERS.map(({ value, label, countKey })=>{
                                    const isActive = inboxFilter === value;
                                    const unread = inboxCounts?.unread?.[countKey] ?? 0;
                                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>setInboxFilter(value),
                                        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])("flex items-center gap-1.5 px-3 h-7 rounded-full text-[13px] font-medium transition-colors duration-200", isActive ? "bg-background text-[var(--studio-primary)] shadow-sm" : "text-muted-foreground hover:text-[var(--studio-primary)]"),
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                children: label
                                            }, void 0, false, {
                                                fileName: "[project]/components/layout/Header.js",
                                                lineNumber: 314,
                                                columnNumber: 23
                                            }, this),
                                            unread > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "h-[18px] min-w-[18px] px-1 rounded-full bg-[var(--studio-primary)] text-white text-[11px] font-semibold flex items-center justify-center tabular-nums",
                                                title: `${unread} unread`,
                                                children: [
                                                    unread > 99 ? "99+" : unread,
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
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
                            }, this) : isForms ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center h-[44px]",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
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
                                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: ()=>setFormsView(value),
                                            className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])("text-sm font-medium transition-colors duration-200 whitespace-nowrap", isActive ? "text-[var(--studio-primary)]" : "text-muted-foreground"),
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
                            }, this) : isAICalling ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center h-[44px]",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
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
                                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: ()=>setAICallingView(value),
                                            className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])("text-sm font-medium transition-colors duration-200 whitespace-nowrap", isActive ? "text-[var(--studio-primary)]" : "text-muted-foreground"),
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
                            }, this) : isAIMessaging ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex h-[44px] items-center",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
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
                                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            type: "button",
                                            onClick: ()=>setAIMessagingView(value),
                                            className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])("whitespace-nowrap text-sm font-medium transition-colors duration-200", isActive ? "text-[var(--studio-primary)]" : "text-muted-foreground"),
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
                            }, this) : title ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex min-w-0 flex-col justify-center py-0.5",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                        className: "truncate text-[19px] font-bold leading-tight text-foreground",
                                        children: title
                                    }, void 0, false, {
                                        fileName: "[project]/components/layout/Header.js",
                                        lineNumber: 412,
                                        columnNumber: 17
                                    }, this),
                                    subtitle && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
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
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "order-1 lg:order-2 w-full lg:w-auto flex items-center justify-between lg:justify-end gap-2 sm:gap-3 lg:gap-4 xl:gap-6 shrink-0",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center gap-2 lg:hidden",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Button"], {
                                        variant: "ghost",
                                        size: "icon",
                                        onClick: onMenuClick,
                                        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])("h-[38px] w-[38px] rounded-lg text-muted-foreground", mobileMenuOpen && "bg-muted text-foreground"),
                                        "aria-label": mobileMenuOpen ? "Close menu" : "Open menu",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$menu$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Menu$3e$__["Menu"], {
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
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center gap-2 sm:gap-3 lg:gap-4 xl:gap-6 ml-auto",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Button"], {
                                            type: "button",
                                            variant: "ghost",
                                            size: "icon",
                                            className: "h-[38px] w-[38px] rounded-full text-muted-foreground hover:bg-muted shrink-0",
                                            "aria-label": theme === "dark" ? "Switch to light mode" : "Switch to dark mode",
                                            onClick: ()=>setTheme(theme === "dark" ? "light" : "dark"),
                                            children: !themeMounted ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sun$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Sun$3e$__["Sun"], {
                                                className: "h-5 w-5 opacity-60",
                                                "aria-hidden": true
                                            }, void 0, false, {
                                                fileName: "[project]/components/layout/Header.js",
                                                lineNumber: 455,
                                                columnNumber: 19
                                            }, this) : theme === "dark" ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sun$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Sun$3e$__["Sun"], {
                                                className: "h-5 w-5",
                                                "aria-hidden": true
                                            }, void 0, false, {
                                                fileName: "[project]/components/layout/Header.js",
                                                lineNumber: 457,
                                                columnNumber: 19
                                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$moon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Moon$3e$__["Moon"], {
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
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "hidden md:block w-[170px] lg:w-[200px]",
                                            children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$permissions$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["isSuperAdmin"])() ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$shared$2f$BranchSelector$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                                                fileName: "[project]/components/layout/Header.js",
                                                lineNumber: 465,
                                                columnNumber: 35
                                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$shared$2f$StaffLocationSwitcher$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                                                fileName: "[project]/components/layout/Header.js",
                                                lineNumber: 465,
                                                columnNumber: 56
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/components/layout/Header.js",
                                            lineNumber: 464,
                                            columnNumber: 15
                                        }, this),
                                        (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$permissions$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["hasPermission"])("calendar", "enrollment", "write") && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "hidden md:block",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$enrollment$2f$EnrollMenu$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                                label: "Enroll",
                                                onSelectMode: (mode)=>{
                                                    if (mode === "trial") {
                                                        if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$permissions$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["hasPermission"])("settings", "Billings", "write")) return;
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
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "relative",
                                            ref: profileRef,
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    type: "button",
                                                    onClick: ()=>setShowProfileMenu((prev)=>!prev),
                                                    className: "flex items-center gap-2 rounded-lg px-1 py-1.5 hover:bg-muted transition-colors text-left min-w-0",
                                                    "aria-expanded": showProfileMenu,
                                                    "aria-haspopup": "true",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "h-[38px] w-[38px] rounded-full bg-brand flex items-center justify-center text-sm font-semibold text-brand-foreground shrink-0",
                                                            children: user ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getInitials"])(user.name) : "?"
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/layout/Header.js",
                                                            lineNumber: 496,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "hidden xl:flex flex-col min-w-0 max-w-[140px] xl:max-w-none items-start",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "block text-sm text-foreground leading-tight truncate w-full",
                                                                    children: user ? `Hi, ${shortName || "User"}` : "Hi, User"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/components/layout/Header.js",
                                                                    lineNumber: 500,
                                                                    columnNumber: 21
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
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
                                                showProfileMenu && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "absolute right-0 top-full mt-2 w-48 z-50 rounded-lg border border-border bg-popover text-popover-foreground shadow-lg py-1",
                                                    role: "menu",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        type: "button",
                                                        onClick: ()=>{
                                                            setShowProfileMenu(false);
                                                            (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["logout"])();
                                                        },
                                                        className: "flex w-full items-center gap-2 px-4 py-2.5 text-sm text-foreground hover:bg-muted transition-colors",
                                                        role: "menuitem",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$log$2d$out$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__LogOut$3e$__["LogOut"], {
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
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "order-3 w-full md:hidden",
                            children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$permissions$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["isSuperAdmin"])() ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$shared$2f$BranchSelector$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                                fileName: "[project]/components/layout/Header.js",
                                lineNumber: 534,
                                columnNumber: 31
                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$shared$2f$StaffLocationSwitcher$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
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
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$enrollment$2f$CreateEnrollmentSheet$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
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
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$enrollment$2f$SellIntroSheet$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                open: sellIntroOpen,
                onClose: ()=>setSellIntroOpen(false)
            }, void 0, false, {
                fileName: "[project]/components/layout/Header.js",
                lineNumber: 557,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$settings$2f$setup$2f$components$2f$EventsPurchases$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CreateEventPurchaseDialog"], {
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
}),
"[project]/components/layout/MainLayout.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>MainLayout
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/auth.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$permissions$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/lib/permissions.js [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$menu$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Menu$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/menu.js [app-ssr] (ecmascript) <export default as Menu>");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$toast$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/toast.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/button.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$layout$2f$Sidebar$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/layout/Sidebar.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$layout$2f$Header$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/layout/Header.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$human$2d$queue$2f$GlobalIncomingCallAlert$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/human-queue/GlobalIncomingCallAlert.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/utils.js [app-ssr] (ecmascript)");
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
function MainLayout({ children, title, subtitle, mainClassName, /** For pages that draw their own top bar — stacking both looks broken. */ hideHeader = false }) {
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRouter"])();
    const pathname = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["usePathname"])();
    const toast = (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$toast$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useToast"])();
    const [mobileMenuOpen, setMobileMenuOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isClient, setIsClient] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isAuth, setIsAuth] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    // Tracked separately from isAuth: an authenticated user who fails the route
    // check must not paint the page while the redirect is in flight.
    const [authorized, setAuthorized] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    // Only check authentication on client side to avoid hydration mismatch
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        setIsClient(true);
        const authenticated = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isAuthenticated"])();
        setIsAuth(authenticated);
        if (!authenticated) {
            setAuthorized(false);
            router.push('/auth/login');
            return;
        }
        // Check route access
        if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$permissions$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["canAccessRoute"])(pathname)) {
            setAuthorized(false);
            const destination = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$permissions$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["getDefaultRedirect"])();
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
    }, [
        pathname,
        router
    ]);
    // Pull fresh permissions from the server on mount and when the tab regains
    // focus, so a role edit lands within a minute instead of waiting for the user
    // to log out and back in. Throttled — focus fires often.
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isAuthenticated"])()) return;
        let lastRefresh = 0;
        const REFRESH_INTERVAL_MS = 60_000;
        const maybeRefresh = ()=>{
            const now = Date.now();
            if (now - lastRefresh < REFRESH_INTERVAL_MS) return;
            lastRefresh = now;
            // A permission change can make the current route unreachable, so re-run
            // the guard against the refreshed session rather than leaving the user on
            // a page they no longer have access to.
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["refreshSession"])().then((user)=>{
                if (user) setAuthorized((0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$permissions$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["canAccessRoute"])(pathname));
            });
        };
        maybeRefresh();
        window.addEventListener('focus', maybeRefresh);
        return ()=>window.removeEventListener('focus', maybeRefresh);
    }, [
        pathname
    ]);
    // Switching the active location changes what every location-scoped request
    // returns, so reload the whole app — header, sidebar, and page all re-fetch
    // under the new location rather than leaving stale data behind.
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const handleBranchChange = ()=>{
            window.location.reload();
        };
        window.addEventListener('branch-change', handleBranchChange);
        return ()=>window.removeEventListener('branch-change', handleBranchChange);
    }, []);
    // Show nothing until client-side hydration is complete, and nothing at all
    // for a route the user can't access — otherwise the sidebar, header and full
    // page body paint for a frame before router.push lands.
    if (!isClient || !isAuth || !authorized) {
        return null;
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex h-screen overflow-hidden bg-background",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$layout$2f$Sidebar$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                mobileOpen: mobileMenuOpen,
                setMobileOpen: setMobileMenuOpen
            }, void 0, false, {
                fileName: "[project]/components/layout/MainLayout.js",
                lineNumber: 108,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex-1 flex flex-col overflow-hidden md:p-2",
                children: [
                    hideHeader ? // The header carries the only sidebar toggle below lg, so hiding it
                    // outright would strand mobile users — keep a slim strip for it.
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center border-b border-border bg-background px-2 py-1.5 lg:hidden",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Button"], {
                            variant: "ghost",
                            size: "icon",
                            onClick: ()=>setMobileMenuOpen((prev)=>!prev),
                            className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])('h-9 w-9 rounded-lg text-muted-foreground', mobileMenuOpen && 'bg-muted text-foreground'),
                            "aria-label": mobileMenuOpen ? 'Close menu' : 'Open menu',
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$menu$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Menu$3e$__["Menu"], {
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
                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Suspense"], {
                        fallback: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
                            className: "sticky top-0 z-30 min-h-[86px] border-b border-border bg-background"
                        }, void 0, false, {
                            fileName: "[project]/components/layout/MainLayout.js",
                            lineNumber: 128,
                            columnNumber: 31
                        }, this),
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$layout$2f$Header$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
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
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
                        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])('flex-1 min-h-0 overflow-y-auto scrollbar-hide bg-background px-3 py-3 sm:px-4 sm:py-4 lg:px-2', mainClassName),
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
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Suspense"], {
                fallback: null,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$human$2d$queue$2f$GlobalIncomingCallAlert$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
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
}),
"[project]/components/layout/Sidebar.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Sidebar
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$image$2d$component$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__Image__as__default$3e$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/image-component.js [app-ssr] (ecmascript) <export Image as default>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/utils.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/auth.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$permissions$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/lib/permissions.js [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$shared$2f$BrandLogo$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/shared/BrandLogo.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$hooks$2f$useUpcomingTasks$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/hooks/useUpcomingTasks.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$hooks$2f$useNotificationEnabled$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/hooks/useNotificationEnabled.js [app-ssr] (ecmascript)");
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
    const pathname = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["usePathname"])();
    const user = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getCurrentUser"])();
    const [openMenu, setOpenMenu] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null) // string | null
    ;
    const [menuAnchorRect, setMenuAnchorRect] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null) // DOMRectLike | null
    ;
    const [menuPos, setMenuPos] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null) // { top:number, left:number } | null
    ;
    const dropdownRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const sidebarRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const navScaleRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const subscriptionRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const closeTimerRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const menuHoverRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(false);
    const [navBox, setNavBox] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])({
        scale: 1,
        height: null
    });
    const { tasks: upcomingTasks, loading: upcomingTasksLoading } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$hooks$2f$useUpcomingTasks$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useUpcomingTasks"])({
        days: 7,
        limit: 20
    });
    const showTaskBadge = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$hooks$2f$useNotificationEnabled$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useNotificationEnabled"])('tasks.badge');
    // Red dot clears once the popover has been opened for the current task set;
    // reappears if the list changes (e.g. a new task shows up) after that.
    // Persisted to localStorage (client-only, no backend/AWS cost) so it
    // survives a page reload instead of re-flagging already-seen tasks.
    const seenTasksStorageKey = user?._id ? `${SEEN_TASKS_STORAGE_KEY}:${user._id}` : null;
    const [seenTaskIds, setSeenTaskIds] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(()=>{
        if ("TURBOPACK compile-time truthy", 1) return new Set();
        //TURBOPACK unreachable
        ;
    });
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
    const menuItemsByName = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>{
        const map = new Map();
        for (const item of navItems)map.set(item.name, item);
        return map;
    }, []);
    const taskDateFormatter = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>new Intl.DateTimeFormat('en-US', {
            month: 'short',
            day: 'numeric'
        }), []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        setMobileOpen(false);
        setOpenMenu(null);
        setMenuAnchorRect(null);
        setMenuPos(null);
    }, [
        pathname,
        setMobileOpen
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (mobileOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return ()=>{
            document.body.style.overflow = 'unset';
        };
    }, [
        mobileOpen
    ]);
    // Scale the logo + nav block down (rather than scrolling) so it always
    // fits between the header and the pinned "Upcoming Tasks" card, no matter
    // how short or tall the viewport is.
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const recompute = ()=>{
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
        };
        recompute();
        window.addEventListener('resize', recompute);
        const ro = new ResizeObserver(recompute);
        if (sidebarRef.current) ro.observe(sidebarRef.current);
        return ()=>{
            window.removeEventListener('resize', recompute);
            ro.disconnect();
        };
    }, []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const handleClickOutside = (event)=>{
            const target = event.target;
            if (sidebarRef.current && sidebarRef.current.contains(target)) return;
            if (dropdownRef.current && dropdownRef.current.contains(target)) return;
            setOpenMenu(null);
            setMenuAnchorRect(null);
            setMenuPos(null);
        };
        document.addEventListener('mousedown', handleClickOutside);
        return ()=>document.removeEventListener('mousedown', handleClickOutside);
    }, []);
    // Reposition dropdown to avoid viewport clipping (flip up/left as needed)
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (!openMenu || !menuAnchorRect) return;
        const raf = window.requestAnimationFrame(()=>{
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
        });
        return ()=>window.cancelAnimationFrame(raf);
    }, [
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
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            mobileOpen && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "fixed inset-0 bg-black/50 z-[100] lg:hidden",
                onClick: ()=>setMobileOpen(false),
                "aria-hidden": "true"
            }, void 0, false, {
                fileName: "[project]/components/layout/Sidebar.js",
                lineNumber: 315,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("aside", {
                ref: sidebarRef,
                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])('flex flex-col h-screen transition-all duration-300 justify-between items-center', 'lg:relative fixed inset-y-0 left-0 z-[110]', 'w-[136px] min-w-[136px]', mobileOpen ? 'flex translate-x-0' : 'hidden lg:flex -translate-x-full lg:translate-x-0', 'bg-sidebar-gradient rounded-r-[40px]'),
                style: {
                    padding: '24px 12px'
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        ref: navScaleRef,
                        className: "flex flex-col items-center gap-5 w-[112px]",
                        style: {
                            transform: `scale(${navBox.scale})`,
                            transformOrigin: 'top center',
                            height: navBox.height ?? undefined
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$shared$2f$BrandLogo$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["BrandLockup"], {
                                size: 46,
                                title: studioName
                            }, void 0, false, {
                                fileName: "[project]/components/layout/Sidebar.js",
                                lineNumber: 344,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
                                className: "flex flex-col items-center gap-1 rounded-r-[24px]",
                                children: navItems.map((item)=>{
                                    // A parent is visible if its own href passes OR any of its
                                    // children do. Gating on the parent href alone hid whole sections
                                    // from users who could use them — e.g. a call-center role has
                                    // inbox.CallCenter but not inbox.AllMessages, and the Inbox
                                    // parent points at /inbox, so the one child they could open was
                                    // unreachable (the parent button preventDefaults and never
                                    // navigates, so there was no way in).
                                    const accessibleChildren = Array.isArray(item.children) ? item.children.filter((child)=>child.href ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$permissions$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["canAccessRoute"])(child.href) : true) : [];
                                    const hasOwnAccess = item.href ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$permissions$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["canAccessRoute"])(item.href) : true;
                                    if (!hasOwnAccess && accessibleChildren.length === 0) return null;
                                    const hasChildren = accessibleChildren.length > 0;
                                    const isActive = item.href === '/' ? pathname === '/' : item.name === 'Settings' ? pathname.startsWith('/settings') : item.href && (pathname === item.href || pathname.startsWith(`${item.href}/`));
                                    const labelClass = item.labelStyle === 'bold' ? 'text-[12px] leading-[18px] font-bold' : item.labelStyle === 'regular14' ? 'text-[14px] leading-[20px] font-normal' : 'text-[12px] leading-[18px] font-normal';
                                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "relative",
                                        onMouseEnter: ()=>{
                                        // handled on the button/link so we can capture the bounding rect
                                        },
                                        onMouseLeave: ()=>{
                                            if (hasChildren && !mobileOpen) scheduleClose();
                                        },
                                        children: hasChildren ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
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
                                            className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])(sidebarTileClass, 'hover:bg-white/5', isActive && 'bg-[image:var(--sidebar-active-css)] text-white shadow-[var(--sidebar-active-shadow)]'),
                                            "aria-expanded": openMenu === item.name,
                                            "aria-haspopup": "menu",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
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
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])(sidebarLabelClass, labelClass),
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
                                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
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
                                            className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])(sidebarTileClass, 'hover:bg-white/5', isActive && 'bg-[image:var(--sidebar-active-css)] text-white shadow-[var(--sidebar-active-shadow)]'),
                                            "aria-current": isActive ? 'page' : undefined,
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
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
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])(sidebarLabelClass, labelClass),
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
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                        href: "/dashboard/upcoming-tasks",
                        ref: subscriptionRef,
                        className: "relative group flex shrink-0 flex-col items-center gap-1 p-1 rounded-lg border border-white/15 bg-white/5 w-[112px]",
                        onMouseEnter: markTasksSeen,
                        onFocus: markTasksSeen,
                        onClick: ()=>setMobileOpen(false),
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "relative w-[62px] h-[46.5px] overflow-hidden rounded",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$image$2d$component$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__Image__as__default$3e$__["default"], {
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
                                    showTaskBadge && !upcomingTasksLoading && unseenTaskCount > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
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
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-white font-bold text-[10px] leading-[16px] drop-shadow-sm",
                                children: "Upcoming Tasks"
                            }, void 0, false, {
                                fileName: "[project]/components/layout/Sidebar.js",
                                lineNumber: 493,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "pointer-events-none absolute left-[118px] bottom-0 flex max-h-[70vh] w-[300px] flex-col rounded-xl border border-border bg-popover text-popover-foreground p-3 opacity-0 shadow-lg transition-all duration-150 group-hover:pointer-events-auto group-hover:opacity-100 group-focus-within:pointer-events-auto group-focus-within:opacity-100 z-50",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "mb-2 shrink-0 flex items-center justify-between gap-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                children: "Upcoming Tasks"
                                            }, void 0, false, {
                                                fileName: "[project]/components/layout/Sidebar.js",
                                                lineNumber: 497,
                                                columnNumber: 15
                                            }, this),
                                            !upcomingTasksLoading && upcomingTasks.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
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
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "space-y-2 overflow-y-auto pr-1",
                                        children: [
                                            upcomingTasksLoading && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "text-[11px] text-muted-foreground",
                                                children: "Loading…"
                                            }, void 0, false, {
                                                fileName: "[project]/components/layout/Sidebar.js",
                                                lineNumber: 504,
                                                columnNumber: 17
                                            }, this),
                                            !upcomingTasksLoading && upcomingTasks.length === 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "text-[11px] text-muted-foreground",
                                                children: "Nothing scheduled this week."
                                            }, void 0, false, {
                                                fileName: "[project]/components/layout/Sidebar.js",
                                                lineNumber: 507,
                                                columnNumber: 17
                                            }, this),
                                            upcomingTasks.map((task)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "rounded-lg border border-border px-2.5 py-2",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "flex items-center justify-between gap-2",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "text-xs font-medium text-foreground leading-4 truncate",
                                                                    children: task.title
                                                                }, void 0, false, {
                                                                    fileName: "[project]/components/layout/Sidebar.js",
                                                                    lineNumber: 512,
                                                                    columnNumber: 21
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
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
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])('mt-1 text-[11px]', task.isOverdue ? 'text-destructive' : 'text-muted-foreground'),
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
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
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
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "px-5 mb-2 text-xs font-semibold tracking-wider text-muted-foreground uppercase",
                            children: item.name
                        }, void 0, false, {
                            fileName: "[project]/components/layout/Sidebar.js",
                            lineNumber: 551,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "h-px bg-border mb-2 mx-2"
                        }, void 0, false, {
                            fileName: "[project]/components/layout/Sidebar.js",
                            lineNumber: 554,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex flex-col",
                            children: item.children.filter((child)=>child.href ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$permissions$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["canAccessRoute"])(child.href) : true).map((child, _, children)=>{
                                // Only the most specific match is active, so /reports doesn't
                                // light up alongside /reports/teacher-commissions.
                                const matches = (href)=>pathname === href || pathname.startsWith(`${href}/`);
                                const isChildActive = matches(child.href) && !children.some((other)=>other.href?.length > child.href.length && matches(other.href));
                                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                    href: child.href,
                                    onClick: ()=>{
                                        setOpenMenu(null);
                                        setMenuAnchorRect(null);
                                        setMenuPos(null);
                                        setMobileOpen(false);
                                    },
                                    className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])('px-5 py-2.5 text-sm transition-colors block w-full text-left', isChildActive ? 'bg-primary/10 text-primary font-medium' : 'text-foreground hover:bg-muted hover:text-foreground'),
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
}),
"[project]/components/membership/AssignMembershipForm.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>AssignMembershipForm
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/plus.js [app-ssr] (ecmascript) <export default as Plus>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trash$2d$2$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Trash2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/trash-2.js [app-ssr] (ecmascript) <export default as Trash2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/api.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$toast$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/toast.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/button.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$input$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/input.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$label$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/label.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$settings$2f$payments$2f$useCardProcessor$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/settings/payments/useCardProcessor.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$clover$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/clover.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$paymentMethods$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/paymentMethods.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$payments$2f$WalletShortfallField$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/payments/WalletShortfallField.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$payments$2f$PaymentMethodPicker$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/payments/PaymentMethodPicker.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$payments$2f$CheckNumberField$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/payments/CheckNumberField.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$payments$2f$SendPaymentLinkMenu$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/payments/SendPaymentLinkMenu.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$studioLocalDate$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/studioLocalDate.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/utils.js [app-ssr] (ecmascript)");
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
// Wallet sits beside the other methods; a balance too small asks how to collect the rest.
const MEMBERSHIP_METHODS = [
    ...__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$paymentMethods$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["NO_DEVICE_PAYMENT_METHODS"],
    __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$paymentMethods$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SHARE_LINK_METHOD"]
];
// A schedule's card charge takes the whole installment, so only these can share one with the wallet.
const PLAN_SHORTFALL_METHODS = __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$paymentMethods$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SHORTFALL_METHODS"].filter((m)=>[
        'cash',
        'cheque'
    ].includes(m.value));
function todayISO() {
    const d = new Date();
    const offset = d.getTimezoneOffset();
    return new Date(d.getTime() - offset * 60 * 1000).toISOString().slice(0, 10);
}
function AssignMembershipForm({ customerID, locationID, onSuccess, onCancel }) {
    const [templates, setTemplates] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [membershipID, setMembershipID] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('');
    const [billingType, setBillingType] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('one_time');
    // Both back-datable, for members who joined and paid before being entered here.
    const [purchaseDate, setPurchaseDate] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$studioLocalDate$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["todayDateInput"]);
    const [paymentDate, setPaymentDate] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$studioLocalDate$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["todayDateInput"]);
    const [method, setMethod] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('cash');
    const [linkChannel, setLinkChannel] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('email');
    const isLink = method === __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$paymentMethods$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SHARE_LINK_METHOD"].value;
    const [checkNumber, setCheckNumber] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('');
    // Flexible billing — same "initial payment + future payments" builder as
    // enrollments/events so staff see one consistent flow everywhere.
    const [flexInitialAmount, setFlexInitialAmount] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('0');
    const [flexInitialDate, setFlexInitialDate] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(todayISO());
    const [flexFuturePayments, setFlexFuturePayments] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([
        {
            _key: 'fp-0',
            dueDate: '',
            amount: ''
        }
    ]);
    const [collectInitialNow, setCollectInitialNow] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(true);
    const [notes, setNotes] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('');
    const [submitting, setSubmitting] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [walletBalance, setWalletBalance] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [shortfallMethod, setShortfallMethod] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('cash');
    const [walletAmount, setWalletAmount] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('');
    const { ready: cloverReady } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$settings$2f$payments$2f$useCardProcessor$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCardProcessor"])(locationID);
    // Set while a "Review and Pay" agreement session is pending acceptance —
    // the membership isn't assigned and nothing is charged until this resolves.
    const [agreementGate, setAgreementGate] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].get('/api/membership?isActive=true&limit=200').then((res)=>{
            if (res.success) setTemplates(Array.isArray(res.data) ? res.data : []);
        });
    }, []);
    // One membership is not a choice — preselect it so staff aren't made to pick
    // the only option, same reasoning as TerminalDeviceField preselecting a lone
    // reader. Runs only while nothing is chosen yet, so it never overrides a pick.
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (!membershipID && templates.length === 1) setMembershipID(templates[0]._id);
    }, [
        templates,
        membershipID
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (!customerID) {
            setWalletBalance(null);
            return;
        }
        __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].get(`/api/wallet/${customerID}/balance`).then((res)=>{
            if (res.success) setWalletBalance(Number(res.data?.balance ?? 0));
        });
    }, [
        customerID
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (!agreementGate || agreementGate.status !== 'sent') return;
        const interval = setInterval(async ()=>{
            const statusRes = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].get(`/api/agreement-session/${agreementGate.contractID}/status`);
            if (!statusRes?.success) return;
            if (statusRes.data.status === 'signed') {
                clearInterval(interval);
                const contractID = agreementGate.contractID;
                setAgreementGate(null);
                await performAssign(contractID);
            }
        }, 4000);
        return ()=>clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [
        agreementGate
    ]);
    const selected = templates.find((t)=>t._id === membershipID);
    const price = Number(selected?.price ?? 0);
    // Same arithmetic as the backend: purchase date + durationDays. A back-dated period
    // that has already ended renews (and bills) on the next nightly run.
    const periodEnd = selected && purchaseDate ? new Date(Date.parse(purchaseDate) + (selected.durationDays || 30) * 86400000).toISOString().slice(0, 10) : '';
    const periodEnded = Boolean(periodEnd) && periodEnd <= (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$studioLocalDate$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["todayDateInput"])();
    const flexInitialAmountN = Number(flexInitialAmount || 0);
    const flexFutureTotal = flexFuturePayments.reduce((sum, c)=>sum + (Number(c.amount) || 0), 0);
    const flexAmountLeftToSchedule = price - flexInitialAmountN - flexFutureTotal;
    const flexBalanced = Math.abs(flexAmountLeftToSchedule) < 0.01;
    const collectingFlexInitial = billingType === 'flexible' && flexInitialAmountN > 0 && collectInitialNow;
    // What is collected today and how much of it the wallet pays (Wallet is a method;
    // it pays all it can unless staff set an amount, and shortfallMethod collects the rest).
    const collectToday = billingType === 'one_time' ? price : collectingFlexInitial ? flexInitialAmountN : 0;
    const paysByWallet = method === 'wallet' && !isLink;
    const walletSplit = (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$payments$2f$WalletShortfallField$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["walletShortfall"])(walletBalance, collectToday, walletAmount);
    const walletApplied = paysByWallet ? walletSplit.walletApplied : 0;
    const remaining = Math.max(0, collectToday - walletApplied);
    const walletOver = paysByWallet && walletSplit.over;
    // The method that actually collects money; the wallet's share goes as walletAmount.
    const chargeMethod = paysByWallet ? remaining > 0 ? shortfallMethod : 'cash' : method;
    // One-time card purchases, and a flexible schedule's collected-now initial
    // payment, settle through Clover's hosted page; everything else (cash,
    // wallet, future-dated installments) is recorded directly.
    const payWithClover = (billingType === 'one_time' || collectingFlexInitial) && remaining > 0 && chargeMethod === 'card' && cloverReady;
    const cloverNotConnected = (billingType === 'one_time' || collectingFlexInitial) && remaining > 0 && chargeMethod === 'card' && !cloverReady;
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
        setFlexFuturePayments((prev)=>splitFlexEvenly(prev, price - (Number(value) || 0)));
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
            return splitFlexEvenly(rows, price - flexInitialAmountN);
        });
    }
    function updateFlexFuturePayment(key, field, value) {
        setFlexFuturePayments((prev)=>{
            if (field !== 'amount') return prev.map((r)=>r._key === key ? {
                    ...r,
                    [field]: value
                } : r);
            const remaining = price - flexInitialAmountN;
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
            return splitFlexEvenly(rows, price - flexInitialAmountN);
        });
    }
    async function handleSubmit() {
        if (!customerID) {
            __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$toast$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"].error('Select a student first');
            return;
        }
        if (!membershipID) {
            __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$toast$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"].error('Select a membership');
            return;
        }
        if (walletOver) {
            __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$toast$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"].error('Insufficient wallet balance', {
                description: `Wallet has $${(walletBalance ?? 0).toFixed(2)} but you entered $${Number(walletAmount).toFixed(2)}.`
            });
            return;
        }
        const resolveRes = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].get('/api/agreement-session/resolve?enrollmentType=membership');
        if (resolveRes?.success && resolveRes.data?.required) {
            setSubmitting(true);
            // Mirrors this form's own flexible-billing schedule so the agreement
            // the student sees lists the same payments they'll actually get.
            const schedule = billingType === 'flexible' ? [
                ...flexInitialAmountN > 0 && flexInitialDate ? [
                    {
                        description: 'Initial payment',
                        amount: flexInitialAmountN,
                        dueDate: flexInitialDate,
                        status: collectInitialNow && !isLink ? 'paid' : 'upcoming'
                    }
                ] : [],
                ...flexFuturePayments.filter((c)=>c.dueDate && Number(c.amount) > 0).map((c)=>({
                        description: 'Scheduled payment',
                        amount: Number(c.amount),
                        dueDate: c.dueDate,
                        status: 'upcoming'
                    }))
            ] : [];
            const sessionRes = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].post('/api/agreement-session', {
                customerID,
                enrollmentType: 'membership',
                isRecurringBilling: Boolean(selected?.autoRenew),
                draftEnrollment: {
                    label: selected?.membershipName,
                    purchaseDate: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$studioLocalDate$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["dateInputToISO"])(purchaseDate),
                    services: [
                        {
                            serviceName: selected?.membershipName,
                            sessionsTotal: 1,
                            pricePerSession: price,
                            discountType: 'none',
                            discountAmount: 0,
                            finalAmount: price
                        }
                    ],
                    totalPaid: price,
                    totalDiscount: 0,
                    amountCollected: 0,
                    billingType,
                    schedule
                }
            });
            setSubmitting(false);
            if (!sessionRes?.success) {
                __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$toast$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"].error('Failed to send the agreement for review', {
                    description: sessionRes?.error
                });
                return;
            }
            setAgreementGate({
                contractID: sessionRes.data.contract._id,
                ipadUrl: sessionRes.data.ipadUrl,
                status: 'sent'
            });
            return;
        }
        return performAssign();
    }
    async function performAssign(linkContractID = null) {
        // "Share Link" assigns it unpaid and sends a link for what would be collected now.
        const sendLink = isLink && (billingType === 'one_time' ? price > 0 : collectingFlexInitial);
        const billing = {};
        if (billingType === 'one_time') {
            if (isLink) billing.collectNow = false;
            else {
                billing.method = chargeMethod;
                if (chargeMethod === 'cheque') billing.checkNumber = checkNumber;
                if (walletApplied > 0) billing.walletAmount = walletApplied;
            }
        } else if (billingType === 'flexible') {
            if (!flexBalanced) {
                __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$toast$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"].error(`Amount left to schedule is $${flexAmountLeftToSchedule.toFixed(2)} — it must be $0 before saving.`);
                return;
            }
            if (flexInitialAmountN > 0 && !flexInitialDate) {
                __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$toast$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"].error('Please set the initial payment date');
                return;
            }
            const futureRows = flexFuturePayments.filter((c)=>Number(c.amount) > 0);
            if (futureRows.some((c)=>!c.dueDate)) {
                __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$toast$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"].error('Every future payment needs a due date');
                return;
            }
            const scheduleRows = [
                ...flexInitialAmountN > 0 ? [
                    {
                        dueDate: flexInitialDate,
                        amount: flexInitialAmountN
                    }
                ] : [],
                ...futureRows.map((c)=>({
                        dueDate: c.dueDate,
                        amount: Number(c.amount)
                    }))
            ];
            if (scheduleRows.length === 0) {
                __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$toast$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"].error('Add at least one payment');
                return;
            }
            billing.customInstallments = scheduleRows;
            if (!isLink) billing.method = chargeMethod;
            if (chargeMethod === 'cheque') billing.checkNumber = checkNumber;
            if (walletApplied > 0) billing.walletAmount = walletApplied;
            if (flexInitialAmountN > 0) billing.collectNow = collectInitialNow && !isLink;
        }
        if (!isLink) billing.collectDate = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$studioLocalDate$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["dateInputToISO"])(paymentDate);
        const checkoutTab = payWithClover ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$clover$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["openCheckoutTab"])() : null;
        setSubmitting(true);
        try {
            const result = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].post('/api/customer-membership', {
                customerID,
                membershipID,
                purchaseDate: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$studioLocalDate$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["dateInputToISO"])(purchaseDate),
                billingType,
                billing,
                notes: notes.trim() || undefined
            });
            if (result.success) {
                if (result.data?.checkoutUrl) {
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$clover$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["navigateCheckoutTab"])(checkoutTab, result.data.checkoutUrl);
                    __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$toast$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"].success(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$clover$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CHECKOUT_TOAST"]);
                } else {
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$clover$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["closeCheckoutTab"])(checkoutTab);
                    __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$toast$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"].success('Membership assigned');
                }
                if (linkContractID) {
                    __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].patch(`/api/agreement-session/${linkContractID}/link-payment`, {
                        paymentID: result.data?.paymentID || result.data?._id
                    }).catch(()=>{});
                }
                if (sendLink) {
                    // Flexible's initial payment is the plan's first installment.
                    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$payments$2f$SendPaymentLinkMenu$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["sendPaymentLink"])({
                        customerID,
                        channel: linkChannel,
                        target: billingType === 'one_time' ? {
                            kind: 'membership',
                            customerMembershipID: result.data?.customerMembership?._id
                        } : {
                            kind: 'installment',
                            paymentPlanID: result.data?.paymentPlan?._id,
                            installmentIndex: 0
                        }
                    });
                }
                onSuccess?.();
            } else {
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$clover$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["closeCheckoutTab"])(checkoutTab);
                __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$toast$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"].error('Failed to assign membership', {
                    description: result.error
                });
            }
        } finally{
            setSubmitting(false);
        }
    }
    if (agreementGate) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex flex-col items-center justify-center gap-4 p-8 text-center",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "text-[15px] font-semibold text-foreground",
                    children: "Waiting for student acceptance"
                }, void 0, false, {
                    fileName: "[project]/components/membership/AssignMembershipForm.js",
                    lineNumber: 311,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "text-[13px] text-muted-foreground max-w-sm",
                    children: "The membership agreement has been sent to the student's phone. Open it on the studio iPad, or wait for them to accept on their device. Nothing will be charged until they accept."
                }, void 0, false, {
                    fileName: "[project]/components/membership/AssignMembershipForm.js",
                    lineNumber: 312,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                    href: agreementGate.ipadUrl,
                    target: "_blank",
                    rel: "noreferrer",
                    className: "text-[13px] text-brand hover:underline font-medium",
                    children: "Open on studio iPad"
                }, void 0, false, {
                    fileName: "[project]/components/membership/AssignMembershipForm.js",
                    lineNumber: 316,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex gap-2 pt-2",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            type: "button",
                            onClick: async ()=>{
                                const res = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].post(`/api/agreement-session/${agreementGate.contractID}/resend`, {});
                                if (res?.success) setAgreementGate((p)=>({
                                        ...p,
                                        ipadUrl: res.data.ipadUrl
                                    }));
                            },
                            className: "text-[12px] text-muted-foreground hover:text-foreground underline",
                            children: "Resend link"
                        }, void 0, false, {
                            fileName: "[project]/components/membership/AssignMembershipForm.js",
                            lineNumber: 320,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            type: "button",
                            onClick: ()=>setAgreementGate(null),
                            className: "text-[12px] text-muted-foreground hover:text-foreground underline",
                            children: "Cancel"
                        }, void 0, false, {
                            fileName: "[project]/components/membership/AssignMembershipForm.js",
                            lineNumber: 330,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/membership/AssignMembershipForm.js",
                    lineNumber: 319,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/components/membership/AssignMembershipForm.js",
            lineNumber: 310,
            columnNumber: 7
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "space-y-5",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex flex-col gap-1.5",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$label$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Label"], {
                        children: "Membership *"
                    }, void 0, false, {
                        fileName: "[project]/components/membership/AssignMembershipForm.js",
                        lineNumber: 345,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                        value: membershipID,
                        onChange: (e)=>setMembershipID(e.target.value),
                        className: "h-9 rounded-lg border border-border bg-background text-sm px-2.5 focus:outline-none focus:ring-2 focus:ring-brand/30",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                value: "",
                                children: "Select a membership…"
                            }, void 0, false, {
                                fileName: "[project]/components/membership/AssignMembershipForm.js",
                                lineNumber: 351,
                                columnNumber: 11
                            }, this),
                            templates.map((t)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                    value: t._id,
                                    children: [
                                        t.membershipName,
                                        " — $",
                                        Number(t.price ?? 0).toFixed(2),
                                        " / ",
                                        t.durationDays,
                                        "d"
                                    ]
                                }, t._id, true, {
                                    fileName: "[project]/components/membership/AssignMembershipForm.js",
                                    lineNumber: 353,
                                    columnNumber: 13
                                }, this))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/membership/AssignMembershipForm.js",
                        lineNumber: 346,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/membership/AssignMembershipForm.js",
                lineNumber: 344,
                columnNumber: 7
            }, this),
            selected && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "rounded-lg border border-border bg-muted/20 p-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center justify-between mb-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-sm font-medium text-foreground",
                                children: selected.membershipName
                            }, void 0, false, {
                                fileName: "[project]/components/membership/AssignMembershipForm.js",
                                lineNumber: 363,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-sm font-semibold text-foreground",
                                children: [
                                    "$",
                                    Number(selected.price ?? 0).toFixed(2)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/membership/AssignMembershipForm.js",
                                lineNumber: 364,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/membership/AssignMembershipForm.js",
                        lineNumber: 362,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-[12px] text-muted-foreground mb-3",
                        children: [
                            selected.durationDays,
                            " days · ",
                            selected.autoRenew ? 'auto-renews' : 'no auto-renew'
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/membership/AssignMembershipForm.js",
                        lineNumber: 366,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "space-y-1.5",
                        children: (selected.services || []).map((s, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-2 text-[12px]",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "h-2.5 w-2.5 rounded-full shrink-0",
                                        style: {
                                            background: s.color || '#6366f1'
                                        }
                                    }, void 0, false, {
                                        fileName: "[project]/components/membership/AssignMembershipForm.js",
                                        lineNumber: 372,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-foreground",
                                        children: s.serviceName
                                    }, void 0, false, {
                                        fileName: "[project]/components/membership/AssignMembershipForm.js",
                                        lineNumber: 373,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "ml-auto text-muted-foreground",
                                        children: s.accessType === 'unlimited' ? 'Unlimited' : `${s.numberOfSessions} sessions`
                                    }, void 0, false, {
                                        fileName: "[project]/components/membership/AssignMembershipForm.js",
                                        lineNumber: 374,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, i, true, {
                                fileName: "[project]/components/membership/AssignMembershipForm.js",
                                lineNumber: 371,
                                columnNumber: 15
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/components/membership/AssignMembershipForm.js",
                        lineNumber: 369,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/membership/AssignMembershipForm.js",
                lineNumber: 361,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex flex-col gap-1.5",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$label$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Label"], {
                        htmlFor: "am-purchase-date",
                        children: "Purchase date"
                    }, void 0, false, {
                        fileName: "[project]/components/membership/AssignMembershipForm.js",
                        lineNumber: 384,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$input$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Input"], {
                        id: "am-purchase-date",
                        type: "date",
                        value: purchaseDate,
                        onChange: (e)=>setPurchaseDate(e.target.value),
                        className: "h-9 w-[180px]"
                    }, void 0, false, {
                        fileName: "[project]/components/membership/AssignMembershipForm.js",
                        lineNumber: 385,
                        columnNumber: 9
                    }, this),
                    periodEnd && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: `text-[11px] ${periodEnded ? 'text-warning' : 'text-muted-foreground'}`,
                        children: [
                            selected?.autoRenew ? 'Renews' : 'Expires',
                            " ",
                            (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["formatDate"])(periodEnd),
                            periodEnded && (selected?.autoRenew ? ' — already passed, so it renews tonight and bills a new period. For a member who is paid up, use the date their current period started.' : ' — already passed, so it will show as expired.')
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/membership/AssignMembershipForm.js",
                        lineNumber: 387,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/membership/AssignMembershipForm.js",
                lineNumber: 383,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex flex-col gap-1.5",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$label$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Label"], {
                        children: "Billing"
                    }, void 0, false, {
                        fileName: "[project]/components/membership/AssignMembershipForm.js",
                        lineNumber: 398,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "inline-flex rounded-lg border border-border bg-background p-0.5 w-fit",
                        children: [
                            {
                                v: 'one_time',
                                label: 'One-time'
                            },
                            {
                                v: 'flexible',
                                label: 'Flexible'
                            }
                        ].map((opt)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                onClick: ()=>setBillingType(opt.v),
                                className: [
                                    'h-8 px-3 rounded-md text-[12px] font-medium transition-colors',
                                    billingType === opt.v ? 'bg-brand text-brand-foreground' : 'text-muted-foreground hover:text-foreground'
                                ].join(' '),
                                children: opt.label
                            }, opt.v, false, {
                                fileName: "[project]/components/membership/AssignMembershipForm.js",
                                lineNumber: 404,
                                columnNumber: 13
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/components/membership/AssignMembershipForm.js",
                        lineNumber: 399,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/membership/AssignMembershipForm.js",
                lineNumber: 397,
                columnNumber: 7
            }, this),
            billingType === 'one_time' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "space-y-3",
                children: [
                    price > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex flex-col gap-1.5",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$label$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Label"], {
                                children: "Payment Method"
                            }, void 0, false, {
                                fileName: "[project]/components/membership/AssignMembershipForm.js",
                                lineNumber: 423,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$payments$2f$PaymentMethodPicker$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                methods: MEMBERSHIP_METHODS,
                                value: method,
                                onChange: (m)=>{
                                    setMethod(m);
                                    setWalletAmount('');
                                }
                            }, void 0, false, {
                                fileName: "[project]/components/membership/AssignMembershipForm.js",
                                lineNumber: 424,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$payments$2f$WalletShortfallField$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                method: method,
                                balance: walletBalance,
                                amountDue: collectToday,
                                walletAmount: walletAmount,
                                onWalletAmountChange: setWalletAmount,
                                shortfallMethod: shortfallMethod,
                                onShortfallMethodChange: setShortfallMethod
                            }, void 0, false, {
                                fileName: "[project]/components/membership/AssignMembershipForm.js",
                                lineNumber: 425,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$payments$2f$CheckNumberField$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                method: chargeMethod,
                                checkNumber: checkNumber,
                                onChange: setCheckNumber
                            }, void 0, false, {
                                fileName: "[project]/components/membership/AssignMembershipForm.js",
                                lineNumber: 434,
                                columnNumber: 15
                            }, this),
                            isLink && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$payments$2f$SendPaymentLinkMenu$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SendLinkChannelPicker"], {
                                value: linkChannel,
                                onChange: setLinkChannel
                            }, void 0, false, {
                                fileName: "[project]/components/membership/AssignMembershipForm.js",
                                lineNumber: 435,
                                columnNumber: 26
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/membership/AssignMembershipForm.js",
                        lineNumber: 422,
                        columnNumber: 13
                    }, this),
                    price > 0 && !isLink && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex flex-col gap-1.5",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$label$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Label"], {
                                htmlFor: "am-payment-date",
                                children: "Payment date"
                            }, void 0, false, {
                                fileName: "[project]/components/membership/AssignMembershipForm.js",
                                lineNumber: 440,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$input$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Input"], {
                                id: "am-payment-date",
                                type: "date",
                                value: paymentDate,
                                onChange: (e)=>setPaymentDate(e.target.value),
                                className: "h-9 w-[180px]"
                            }, void 0, false, {
                                fileName: "[project]/components/membership/AssignMembershipForm.js",
                                lineNumber: 441,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/membership/AssignMembershipForm.js",
                        lineNumber: 439,
                        columnNumber: 13
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/membership/AssignMembershipForm.js",
                lineNumber: 420,
                columnNumber: 9
            }, this),
            billingType === 'flexible' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "rounded-xl border border-border bg-muted/20 p-4 flex flex-col gap-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-xs text-muted-foreground -mt-1",
                        children: "This arrangement will be included in the student agreement — get it right here, it can't be changed on the payment step."
                    }, void 0, false, {
                        fileName: "[project]/components/membership/AssignMembershipForm.js",
                        lineNumber: 450,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex flex-col gap-1.5",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$label$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Label"], {
                                children: [
                                    "Initial payment ",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "font-normal text-muted-foreground",
                                        children: "(optional — enter $0 if none)"
                                    }, void 0, false, {
                                        fileName: "[project]/components/membership/AssignMembershipForm.js",
                                        lineNumber: 456,
                                        columnNumber: 36
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/membership/AssignMembershipForm.js",
                                lineNumber: 456,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "grid grid-cols-2 gap-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$input$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Input"], {
                                        type: "number",
                                        min: "0",
                                        max: price,
                                        step: "any",
                                        placeholder: "0.00",
                                        value: flexInitialAmount,
                                        onChange: (e)=>updateFlexInitialAmount(e.target.value)
                                    }, void 0, false, {
                                        fileName: "[project]/components/membership/AssignMembershipForm.js",
                                        lineNumber: 458,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$input$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Input"], {
                                        type: "date",
                                        value: flexInitialDate,
                                        onChange: (e)=>setFlexInitialDate(e.target.value)
                                    }, void 0, false, {
                                        fileName: "[project]/components/membership/AssignMembershipForm.js",
                                        lineNumber: 459,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/membership/AssignMembershipForm.js",
                                lineNumber: 457,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/membership/AssignMembershipForm.js",
                        lineNumber: 455,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex flex-col gap-1.5 pt-2 border-t border-border",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$label$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Label"], {
                                children: "Future payments"
                            }, void 0, false, {
                                fileName: "[project]/components/membership/AssignMembershipForm.js",
                                lineNumber: 465,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-xs text-muted-foreground -mt-1",
                                children: "One row is the remaining balance's single due date. Add more to split it into a schedule."
                            }, void 0, false, {
                                fileName: "[project]/components/membership/AssignMembershipForm.js",
                                lineNumber: 466,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex flex-col gap-1.5",
                                children: flexFuturePayments.map((r, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center gap-2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "w-5 shrink-0 text-xs text-muted-foreground",
                                                children: [
                                                    i + 1,
                                                    "."
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/membership/AssignMembershipForm.js",
                                                lineNumber: 472,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$input$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Input"], {
                                                type: "date",
                                                value: r.dueDate,
                                                onChange: (e)=>updateFlexFuturePayment(r._key, 'dueDate', e.target.value),
                                                className: "flex-1"
                                            }, void 0, false, {
                                                fileName: "[project]/components/membership/AssignMembershipForm.js",
                                                lineNumber: 473,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$input$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Input"], {
                                                type: "number",
                                                min: "0",
                                                step: "any",
                                                placeholder: "0.00",
                                                value: r.amount,
                                                onChange: (e)=>updateFlexFuturePayment(r._key, 'amount', e.target.value),
                                                className: "w-28"
                                            }, void 0, false, {
                                                fileName: "[project]/components/membership/AssignMembershipForm.js",
                                                lineNumber: 474,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                type: "button",
                                                onClick: ()=>removeFlexFuturePayment(r._key),
                                                disabled: flexFuturePayments.length === 1,
                                                className: "text-muted-foreground hover:text-destructive disabled:opacity-30 disabled:cursor-not-allowed",
                                                "aria-label": "Remove payment",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trash$2d$2$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Trash2$3e$__["Trash2"], {
                                                    className: "h-4 w-4"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/membership/AssignMembershipForm.js",
                                                    lineNumber: 478,
                                                    columnNumber: 21
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/components/membership/AssignMembershipForm.js",
                                                lineNumber: 475,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, r._key, true, {
                                        fileName: "[project]/components/membership/AssignMembershipForm.js",
                                        lineNumber: 471,
                                        columnNumber: 17
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/components/membership/AssignMembershipForm.js",
                                lineNumber: 469,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                onClick: addFlexFuturePayment,
                                className: "inline-flex w-fit items-center gap-1.5 rounded-lg border border-dashed border-border px-3 h-8 text-[13px] font-medium text-muted-foreground hover:text-foreground hover:border-brand/50",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__["Plus"], {
                                        className: "h-3.5 w-3.5"
                                    }, void 0, false, {
                                        fileName: "[project]/components/membership/AssignMembershipForm.js",
                                        lineNumber: 485,
                                        columnNumber: 15
                                    }, this),
                                    " Add another payment"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/membership/AssignMembershipForm.js",
                                lineNumber: 483,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/membership/AssignMembershipForm.js",
                        lineNumber: 464,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex flex-col gap-1 pt-2 border-t border-border",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center justify-between",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-xs text-muted-foreground",
                                        children: "Amount left to schedule"
                                    }, void 0, false, {
                                        fileName: "[project]/components/membership/AssignMembershipForm.js",
                                        lineNumber: 491,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: `text-sm font-semibold ${flexBalanced ? 'text-success' : 'text-destructive'}`,
                                        children: [
                                            "$",
                                            flexAmountLeftToSchedule.toFixed(2)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/membership/AssignMembershipForm.js",
                                        lineNumber: 492,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/membership/AssignMembershipForm.js",
                                lineNumber: 490,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center justify-between",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-xs text-muted-foreground",
                                        children: "Membership Price"
                                    }, void 0, false, {
                                        fileName: "[project]/components/membership/AssignMembershipForm.js",
                                        lineNumber: 495,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-sm font-bold",
                                        children: [
                                            "$",
                                            price.toFixed(2)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/membership/AssignMembershipForm.js",
                                        lineNumber: 496,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/membership/AssignMembershipForm.js",
                                lineNumber: 494,
                                columnNumber: 13
                            }, this),
                            !flexBalanced && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-[11px] text-destructive",
                                children: "Initial payment plus future payments must add up to the membership price."
                            }, void 0, false, {
                                fileName: "[project]/components/membership/AssignMembershipForm.js",
                                lineNumber: 499,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/membership/AssignMembershipForm.js",
                        lineNumber: 489,
                        columnNumber: 11
                    }, this),
                    flexInitialAmountN > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex flex-col gap-3 pt-2 border-t border-border",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                className: "flex items-center gap-2 text-sm font-medium",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        type: "checkbox",
                                        checked: collectInitialNow,
                                        onChange: (e)=>setCollectInitialNow(e.target.checked)
                                    }, void 0, false, {
                                        fileName: "[project]/components/membership/AssignMembershipForm.js",
                                        lineNumber: 506,
                                        columnNumber: 17
                                    }, this),
                                    "Collect the initial payment now ($",
                                    flexInitialAmountN.toFixed(2),
                                    ")"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/membership/AssignMembershipForm.js",
                                lineNumber: 505,
                                columnNumber: 15
                            }, this),
                            collectInitialNow && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex flex-col gap-1.5",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$label$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Label"], {
                                        children: "Payment Method"
                                    }, void 0, false, {
                                        fileName: "[project]/components/membership/AssignMembershipForm.js",
                                        lineNumber: 511,
                                        columnNumber: 19
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$payments$2f$PaymentMethodPicker$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                        methods: MEMBERSHIP_METHODS,
                                        value: method,
                                        onChange: (m)=>{
                                            setMethod(m);
                                            setWalletAmount('');
                                        }
                                    }, void 0, false, {
                                        fileName: "[project]/components/membership/AssignMembershipForm.js",
                                        lineNumber: 512,
                                        columnNumber: 19
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$payments$2f$WalletShortfallField$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                        method: method,
                                        balance: walletBalance,
                                        amountDue: collectToday,
                                        walletAmount: walletAmount,
                                        onWalletAmountChange: setWalletAmount,
                                        shortfallMethod: shortfallMethod,
                                        onShortfallMethodChange: setShortfallMethod,
                                        methods: PLAN_SHORTFALL_METHODS
                                    }, void 0, false, {
                                        fileName: "[project]/components/membership/AssignMembershipForm.js",
                                        lineNumber: 513,
                                        columnNumber: 19
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$payments$2f$CheckNumberField$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                        method: chargeMethod,
                                        checkNumber: checkNumber,
                                        onChange: setCheckNumber
                                    }, void 0, false, {
                                        fileName: "[project]/components/membership/AssignMembershipForm.js",
                                        lineNumber: 523,
                                        columnNumber: 19
                                    }, this),
                                    isLink ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$payments$2f$SendPaymentLinkMenu$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SendLinkChannelPicker"], {
                                        value: linkChannel,
                                        onChange: setLinkChannel
                                    }, void 0, false, {
                                        fileName: "[project]/components/membership/AssignMembershipForm.js",
                                        lineNumber: 525,
                                        columnNumber: 21
                                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$label$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Label"], {
                                                htmlFor: "am-flex-payment-date",
                                                children: "Payment date"
                                            }, void 0, false, {
                                                fileName: "[project]/components/membership/AssignMembershipForm.js",
                                                lineNumber: 528,
                                                columnNumber: 23
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$input$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Input"], {
                                                id: "am-flex-payment-date",
                                                type: "date",
                                                value: paymentDate,
                                                onChange: (e)=>setPaymentDate(e.target.value),
                                                className: "h-9 w-[180px]"
                                            }, void 0, false, {
                                                fileName: "[project]/components/membership/AssignMembershipForm.js",
                                                lineNumber: 529,
                                                columnNumber: 23
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/membership/AssignMembershipForm.js",
                                        lineNumber: 527,
                                        columnNumber: 21
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/membership/AssignMembershipForm.js",
                                lineNumber: 510,
                                columnNumber: 17
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/membership/AssignMembershipForm.js",
                        lineNumber: 504,
                        columnNumber: 13
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/membership/AssignMembershipForm.js",
                lineNumber: 449,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex flex-col gap-1.5",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$label$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Label"], {
                        children: "Notes"
                    }, void 0, false, {
                        fileName: "[project]/components/membership/AssignMembershipForm.js",
                        lineNumber: 540,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$input$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Input"], {
                        value: notes,
                        onChange: (e)=>setNotes(e.target.value),
                        placeholder: "Optional",
                        className: "h-9"
                    }, void 0, false, {
                        fileName: "[project]/components/membership/AssignMembershipForm.js",
                        lineNumber: 541,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/membership/AssignMembershipForm.js",
                lineNumber: 539,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex flex-col gap-1.5 pt-2",
                children: [
                    cloverNotConnected && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-[11px] text-amber-600 text-right",
                        children: "Connect a card processor (Clover or Stripe) in Settings → Integrations to charge a card."
                    }, void 0, false, {
                        fileName: "[project]/components/membership/AssignMembershipForm.js",
                        lineNumber: 546,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex justify-end gap-2",
                        children: [
                            onCancel && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Button"], {
                                variant: "outline",
                                onClick: onCancel,
                                disabled: submitting,
                                children: "Cancel"
                            }, void 0, false, {
                                fileName: "[project]/components/membership/AssignMembershipForm.js",
                                lineNumber: 549,
                                columnNumber: 24
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Button"], {
                                onClick: ()=>handleSubmit(),
                                disabled: submitting || walletOver || cloverNotConnected || billingType === 'flexible' && !flexBalanced,
                                className: "bg-brand hover:bg-brand-dark text-brand-foreground",
                                children: submitting ? 'Assigning…' : payWithClover ? 'Pay by card' : 'Assign Membership'
                            }, void 0, false, {
                                fileName: "[project]/components/membership/AssignMembershipForm.js",
                                lineNumber: 550,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/membership/AssignMembershipForm.js",
                        lineNumber: 548,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/membership/AssignMembershipForm.js",
                lineNumber: 544,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/membership/AssignMembershipForm.js",
        lineNumber: 343,
        columnNumber: 5
    }, this);
}
}),
"[project]/components/payments/CheckNumberField.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>CheckNumberField
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
'use client';
;
function CheckNumberField({ method, checkNumber, onChange, className }) {
    if (method !== 'cheque') return null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: className,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                className: "block text-[11px] font-semibold text-muted-foreground uppercase tracking-wide mb-1",
                children: "Check number"
            }, void 0, false, {
                fileName: "[project]/components/payments/CheckNumberField.js",
                lineNumber: 14,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                type: "text",
                inputMode: "numeric",
                value: checkNumber || '',
                onChange: (e)=>onChange(e.target.value),
                placeholder: "e.g. 1042",
                className: "h-9 w-full rounded-md border border-border bg-background px-2.5 text-[12px] outline-none focus:border-primary"
            }, void 0, false, {
                fileName: "[project]/components/payments/CheckNumberField.js",
                lineNumber: 17,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/payments/CheckNumberField.js",
        lineNumber: 13,
        columnNumber: 5
    }, this);
}
}),
"[project]/components/payments/PaymentMethodPicker.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>PaymentMethodPicker
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$banknote$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Banknote$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/banknote.js [app-ssr] (ecmascript) <export default as Banknote>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$credit$2d$card$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__CreditCard$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/credit-card.js [app-ssr] (ecmascript) <export default as CreditCard>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$check$2d$2$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__FileCheck2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/file-check-2.js [app-ssr] (ecmascript) <export default as FileCheck2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$landmark$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Landmark$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/landmark.js [app-ssr] (ecmascript) <export default as Landmark>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$link$2d$2$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Link2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/link-2.js [app-ssr] (ecmascript) <export default as Link2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$ellipsis$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__MoreHorizontal$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/ellipsis.js [app-ssr] (ecmascript) <export default as MoreHorizontal>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$smartphone$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Smartphone$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/smartphone.js [app-ssr] (ecmascript) <export default as Smartphone>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$wallet$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Wallet$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/wallet.js [app-ssr] (ecmascript) <export default as Wallet>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$wallet$2d$cards$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__WalletCards$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/wallet-cards.js [app-ssr] (ecmascript) <export default as WalletCards>");
'use client';
;
;
;
// Shared payment-method control — every payment surface (Pay Now balance,
// pay-installment, new enrollment/package, membership assign, event
// purchases) renders this instead of its own <select> so the method picker
// looks and behaves identically everywhere.
const METHOD_ICONS = {
    cash: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$banknote$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Banknote$3e$__["Banknote"],
    cheque: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$check$2d$2$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__FileCheck2$3e$__["FileCheck2"],
    card: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$credit$2d$card$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__CreditCard$3e$__["CreditCard"],
    ach: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$landmark$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Landmark$3e$__["Landmark"],
    terminal: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$smartphone$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Smartphone$3e$__["Smartphone"],
    wallet: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$wallet$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Wallet$3e$__["Wallet"],
    link: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$link$2d$2$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Link2$3e$__["Link2"],
    saved_card: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$wallet$2d$cards$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__WalletCards$3e$__["WalletCards"]
};
// What a studio takes payment by day to day, in this exact order; everything
// else in a caller's `methods` list sits behind "More" instead of crowding the
// default view. A caller's own list still decides what's offered at all — this
// only decides what's shown first, and in what order.
const PRIMARY_ORDER = [
    'terminal',
    'saved_card',
    'cash',
    'wallet',
    'ach',
    'link'
];
function PaymentMethodPicker({ methods, value, onChange, className }) {
    const primary = PRIMARY_ORDER.map((v)=>methods.find((m)=>m.value === v)).filter(Boolean);
    const secondary = methods.filter((m)=>!PRIMARY_ORDER.includes(m.value));
    // Starts expanded if the current value is already one of the "more" methods
    // (e.g. a draft loaded with method: "cheque") — collapsing it would hide the
    // very button showing what's selected.
    const [expanded, setExpanded] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(()=>secondary.some((m)=>m.value === value));
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (secondary.some((m)=>m.value === value)) setExpanded(true);
    // Only widening (never re-collapsing) on a value change from outside, so this
    // doesn't fight a staff member who just clicked "More" themselves.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [
        value
    ]);
    const visible = expanded || secondary.length === 0 ? [
        ...primary,
        ...secondary
    ] : primary;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: `grid gap-1.5 ${className || ''}`,
        // Fixed at `repeat(methods.length, 1fr)` squeezed every option into one row no
        // matter how many there were — fine at 4-5 methods, unreadable once cheque/ACH
        // pushed it to 7. auto-fit (not auto-fill) sizes columns to a sane minimum,
        // wraps the rest onto new rows, and — unlike auto-fill — collapses any empty
        // trailing column tracks instead of reserving their width as dead space.
        style: {
            gridTemplateColumns: 'repeat(auto-fit, minmax(72px, 1fr))'
        },
        children: [
            visible.map((m)=>{
                const Icon = METHOD_ICONS[m.value];
                const active = value === m.value;
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                    type: "button",
                    onClick: ()=>onChange(m.value),
                    className: `flex flex-col items-center justify-center gap-1 rounded-lg border py-2.5 text-[10.5px] font-medium transition-all ${active ? 'border-[var(--studio-primary)] bg-[var(--studio-primary)]/10 text-[var(--studio-primary)] shadow-sm' : 'border-border bg-background text-muted-foreground hover:border-foreground/30 hover:text-foreground'}`,
                    children: [
                        Icon && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Icon, {
                            className: "h-4 w-4"
                        }, void 0, false, {
                            fileName: "[project]/components/payments/PaymentMethodPicker.js",
                            lineNumber: 68,
                            columnNumber: 22
                        }, this),
                        m.label
                    ]
                }, m.value, true, {
                    fileName: "[project]/components/payments/PaymentMethodPicker.js",
                    lineNumber: 58,
                    columnNumber: 11
                }, this);
            }),
            !expanded && secondary.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                type: "button",
                onClick: ()=>setExpanded(true),
                className: "flex flex-col items-center justify-center gap-1 rounded-lg border border-dashed border-border py-2.5 text-[10.5px] font-medium text-muted-foreground transition-all hover:border-foreground/30 hover:text-foreground",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$ellipsis$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__MoreHorizontal$3e$__["MoreHorizontal"], {
                        className: "h-4 w-4"
                    }, void 0, false, {
                        fileName: "[project]/components/payments/PaymentMethodPicker.js",
                        lineNumber: 79,
                        columnNumber: 11
                    }, this),
                    "More"
                ]
            }, void 0, true, {
                fileName: "[project]/components/payments/PaymentMethodPicker.js",
                lineNumber: 74,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/payments/PaymentMethodPicker.js",
        lineNumber: 45,
        columnNumber: 5
    }, this);
}
}),
"[project]/components/payments/SavedCardField.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>SavedCardField
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/api.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$settings$2f$payments$2f$clover$2f$useCloverConnection$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/settings/payments/clover/useCloverConnection.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$studioTimezone$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/studioTimezone.js [app-ssr] (ecmascript)");
'use client';
;
;
;
;
;
/**
 * Card picker shown when `method === "saved_card"`. Lists the cards this customer
 * saved by tapping on a Stripe reader; the parent reads the chosen one back out via
 * `onCardChange` and sends it as `cardToken` to POST /api/payment.
 *
 * A card can only get here by being used on the reader once — the network has no way
 * to vault a card nobody presented — so the empty state says that rather than leaving
 * staff staring at a blank dropdown.
 */ /**
 * "VISA •••• 4242 — exp 04/29 · saved 12 Sep". The saved date is what separates two
 * cards that would otherwise read identically, and tells staff which one the customer
 * used most recently.
 */ function describeCard(card) {
    const brand = card.brand ? card.brand.toUpperCase() : 'Card';
    const exp = `${String(card.expMonth).padStart(2, '0')}/${String(card.expYear).slice(-2)}`;
    const base = `${brand} •••• ${card.last4} — exp ${exp}`;
    if (!card.savedAt) return base;
    const saved = new Date(card.savedAt);
    if (Number.isNaN(saved.getTime())) return base;
    return `${base} · saved ${saved.toLocaleDateString(undefined, {
        day: 'numeric',
        month: 'short',
        timeZone: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$studioTimezone$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getStudioTimezone"])() || undefined
    })}`;
}
function SavedCardField({ method, locationID, customerID, cardToken, onCardChange, className }) {
    const resolved = (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$settings$2f$payments$2f$clover$2f$useCloverConnection$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["resolveLocationID"])(locationID);
    const [cards, setCards] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (method !== 'saved_card' || !resolved || !customerID) {
            setCards(null);
            return;
        }
        let cancelled = false;
        __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].get(`/api/payments/stripe/customers/${encodeURIComponent(customerID)}/cards?locationID=${encodeURIComponent(resolved)}`).then((res)=>{
            if (!cancelled) setCards(res.success && Array.isArray(res.data) ? res.data : []);
        });
        return ()=>{
            cancelled = true;
        };
    }, [
        method,
        resolved,
        customerID
    ]);
    // Nothing to choose from when exactly one card exists — pick it so staff cannot
    // submit a saved-card charge with no card attached.
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (cards?.length === 1 && !cardToken) onCardChange(cards[0].id);
    }, [
        cards,
        cardToken,
        onCardChange
    ]);
    if (method !== 'saved_card') return null;
    const note = className ?? 'text-[11px] text-muted-foreground';
    if (!resolved) return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
        className: note,
        children: "No location on this customer — a saved-card charge needs one."
    }, void 0, false, {
        fileName: "[project]/components/payments/SavedCardField.js",
        lineNumber: 64,
        columnNumber: 25
    }, this);
    if (cards === null) return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
        className: note,
        children: "Loading saved cards…"
    }, void 0, false, {
        fileName: "[project]/components/payments/SavedCardField.js",
        lineNumber: 65,
        columnNumber: 30
    }, this);
    if (cards.length === 0) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
            className: note,
            children: "No saved cards for this customer. A card is saved the first time they pay on a Stripe reader — take one terminal payment and it will appear here."
        }, void 0, false, {
            fileName: "[project]/components/payments/SavedCardField.js",
            lineNumber: 69,
            columnNumber: 7
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
        value: cardToken || '',
        onChange: (e)=>onCardChange(e.target.value),
        className: "h-8 w-full rounded-md border border-border bg-background px-2.5 text-[12px] outline-none focus:border-primary",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                value: "",
                disabled: true,
                children: "Select saved card…"
            }, void 0, false, {
                fileName: "[project]/components/payments/SavedCardField.js",
                lineNumber: 82,
                columnNumber: 7
            }, this),
            cards.map((c)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                    value: c.id,
                    children: describeCard(c)
                }, c.id, false, {
                    fileName: "[project]/components/payments/SavedCardField.js",
                    lineNumber: 84,
                    columnNumber: 9
                }, this))
        ]
    }, void 0, true, {
        fileName: "[project]/components/payments/SavedCardField.js",
        lineNumber: 77,
        columnNumber: 5
    }, this);
}
}),
"[project]/components/payments/SendPaymentLinkMenu.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "SendLinkChannelPicker",
    ()=>SendLinkChannelPicker,
    "default",
    ()=>SendPaymentLinkMenu,
    "sendPaymentLink",
    ()=>sendPaymentLink
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$mail$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Mail$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/mail.js [app-ssr] (ecmascript) <export default as Mail>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$message$2d$square$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__MessageSquare$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/message-square.js [app-ssr] (ecmascript) <export default as MessageSquare>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$send$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Send$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/send.js [app-ssr] (ecmascript) <export default as Send>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/loader-circle.js [app-ssr] (ecmascript) <export default as Loader2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/api.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$toast$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/toast.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/button.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$dropdown$2d$menu$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/dropdown-menu.js [app-ssr] (ecmascript)");
'use client';
;
;
;
;
;
;
;
/**
 * Sends the customer a link they can pay from, beside whatever they owe.
 *
 * A menu rather than a modal: the only decision is which channel, so making staff open a
 * dialog, pick, and confirm would be three interactions for one choice. Picking the
 * channel IS the confirmation.
 *
 * `target` names what is being paid, and the server resolves the amount from it — the
 * balance may move between now and the moment the customer taps the link, so the client
 * never sends a price.
 */ const CHANNELS = [
    {
        value: 'email',
        label: 'Email',
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$mail$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Mail$3e$__["Mail"]
    },
    {
        value: 'sms',
        label: 'Text message',
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$message$2d$square$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__MessageSquare$3e$__["MessageSquare"]
    },
    {
        value: 'both',
        label: 'Email and text',
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$send$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Send$3e$__["Send"]
    }
];
const money = (amount)=>new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    }).format(Number(amount) || 0);
async function sendPaymentLink({ customerID, target, channel }) {
    const result = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].post('/api/payment-request', {
        customerID,
        target,
        channel
    });
    if (result.success) {
        __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$toast$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"].success('Payment link sent', {
            description: `They can pay ${money(result.data.amount)} from the link. This updates itself once they do.`
        });
        return true;
    }
    // The server's message is the useful one — it says which setup step is missing, or
    // that the customer has no phone number on file.
    __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$toast$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"].error('Could not send the payment link', {
        description: result.error
    });
    return false;
}
function SendLinkChannelPicker({ value, onChange }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex gap-1.5",
        children: [
            {
                value: 'email',
                label: 'Email'
            },
            {
                value: 'sms',
                label: 'Text'
            },
            {
                value: 'both',
                label: 'Both'
            }
        ].map((c)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                type: "button",
                onClick: ()=>onChange(c.value),
                className: `h-7 flex-1 rounded-md border text-[11px] font-medium transition-colors ${value === c.value ? 'border-primary bg-primary/10 text-primary' : 'border-border text-muted-foreground hover:bg-muted/40'}`,
                children: c.label
            }, c.value, false, {
                fileName: "[project]/components/payments/SendPaymentLinkMenu.js",
                lineNumber: 62,
                columnNumber: 9
            }, this))
    }, void 0, false, {
        fileName: "[project]/components/payments/SendPaymentLinkMenu.js",
        lineNumber: 56,
        columnNumber: 5
    }, this);
}
function SendPaymentLinkMenu({ customerID, target, onSent }) {
    const [sending, setSending] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    async function send(channel) {
        setSending(true);
        const sent = await sendPaymentLink({
            customerID,
            target,
            channel
        });
        setSending(false);
        if (sent) onSent?.();
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$dropdown$2d$menu$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DropdownMenu"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$dropdown$2d$menu$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DropdownMenuTrigger"], {
                asChild: true,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Button"], {
                    variant: "outline",
                    size: "sm",
                    disabled: sending,
                    "aria-busy": sending,
                    className: "h-7 gap-1.5 px-2 text-[11px]",
                    children: sending ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__["Loader2"], {
                                "aria-hidden": "true",
                                className: "h-3 w-3 motion-safe:animate-spin"
                            }, void 0, false, {
                                fileName: "[project]/components/payments/SendPaymentLinkMenu.js",
                                lineNumber: 101,
                                columnNumber: 15
                            }, this),
                            "Sending…"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/payments/SendPaymentLinkMenu.js",
                        lineNumber: 100,
                        columnNumber: 13
                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$send$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Send$3e$__["Send"], {
                                "aria-hidden": "true",
                                className: "h-3 w-3"
                            }, void 0, false, {
                                fileName: "[project]/components/payments/SendPaymentLinkMenu.js",
                                lineNumber: 106,
                                columnNumber: 15
                            }, this),
                            "Send link"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/payments/SendPaymentLinkMenu.js",
                        lineNumber: 105,
                        columnNumber: 13
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/components/payments/SendPaymentLinkMenu.js",
                    lineNumber: 92,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/payments/SendPaymentLinkMenu.js",
                lineNumber: 91,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$dropdown$2d$menu$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DropdownMenuContent"], {
                align: "end",
                className: "min-w-[11rem]",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$dropdown$2d$menu$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DropdownMenuLabel"], {
                        className: "text-[11px] font-medium text-muted-foreground",
                        children: "Send a payment link by"
                    }, void 0, false, {
                        fileName: "[project]/components/payments/SendPaymentLinkMenu.js",
                        lineNumber: 114,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$dropdown$2d$menu$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DropdownMenuSeparator"], {}, void 0, false, {
                        fileName: "[project]/components/payments/SendPaymentLinkMenu.js",
                        lineNumber: 117,
                        columnNumber: 9
                    }, this),
                    CHANNELS.map(({ value, label, icon: Icon })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$dropdown$2d$menu$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DropdownMenuItem"], {
                            onClick: ()=>send(value),
                            className: "gap-2 text-[13px]",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Icon, {
                                    "aria-hidden": "true",
                                    className: "h-3.5 w-3.5 text-muted-foreground"
                                }, void 0, false, {
                                    fileName: "[project]/components/payments/SendPaymentLinkMenu.js",
                                    lineNumber: 120,
                                    columnNumber: 13
                                }, this),
                                label
                            ]
                        }, value, true, {
                            fileName: "[project]/components/payments/SendPaymentLinkMenu.js",
                            lineNumber: 119,
                            columnNumber: 11
                        }, this))
                ]
            }, void 0, true, {
                fileName: "[project]/components/payments/SendPaymentLinkMenu.js",
                lineNumber: 113,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/payments/SendPaymentLinkMenu.js",
        lineNumber: 90,
        columnNumber: 5
    }, this);
}
}),
"[project]/components/payments/TerminalDeviceField.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>TerminalDeviceField,
    "terminalTipPayload",
    ()=>terminalTipPayload
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/api.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$settings$2f$payments$2f$clover$2f$useCloverDevices$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/settings/payments/clover/useCloverDevices.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$settings$2f$payments$2f$clover$2f$useCloverConnection$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/settings/payments/clover/useCloverConnection.js [app-ssr] (ecmascript)");
'use client';
;
;
;
;
;
function terminalTipPayload() {
    return {};
}
function TerminalDeviceField({ method, locationID, deviceID, onDeviceChange, className }) {
    const { devices, loading } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$settings$2f$payments$2f$clover$2f$useCloverDevices$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCloverDevices"])(locationID);
    const resolved = (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$settings$2f$payments$2f$clover$2f$useCloverConnection$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["resolveLocationID"])(locationID);
    const [stripeReaders, setStripeReaders] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (method !== 'terminal' || !resolved || devices && devices.length > 0) {
            setStripeReaders(null);
            return;
        }
        let cancelled = false;
        __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].get(`/api/payments/stripe/readers?locationID=${encodeURIComponent(resolved)}`).then((res)=>{
            if (!cancelled) setStripeReaders(res.success && Array.isArray(res.data) ? res.data : []);
        });
        return ()=>{
            cancelled = true;
        };
    }, [
        method,
        resolved,
        devices
    ]);
    const options = devices.length > 0 ? devices.map((d)=>({
            id: d._id,
            label: d.name || d.deviceId
        })) : (stripeReaders || []).map((r)=>({
            id: r._id,
            label: r.label || r.readerId
        }));
    // One terminal is not a choice — preselect it so staff are not made to pick the only
    // option. Runs only while nothing is chosen, so it never overrides a selection.
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (method === 'terminal' && options.length === 1 && !deviceID) onDeviceChange(options[0].id);
    }, [
        method,
        options,
        deviceID,
        onDeviceChange
    ]);
    if (method !== 'terminal') return null;
    const note = className ?? 'text-[11px] text-muted-foreground';
    if (!resolved) return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
        className: note,
        children: "No location on this customer — a terminal payment needs one."
    }, void 0, false, {
        fileName: "[project]/components/payments/TerminalDeviceField.js",
        lineNumber: 56,
        columnNumber: 25
    }, this);
    if (loading) return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
        className: note,
        children: "Loading terminals…"
    }, void 0, false, {
        fileName: "[project]/components/payments/TerminalDeviceField.js",
        lineNumber: 57,
        columnNumber: 23
    }, this);
    if (options.length === 0) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
            className: note,
            children: stripeReaders === null ? 'Loading terminals…' : 'No terminals paired for this location. Pair one in Settings → Integrations.'
        }, void 0, false, {
            fileName: "[project]/components/payments/TerminalDeviceField.js",
            lineNumber: 61,
            columnNumber: 7
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "space-y-1.5",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
            value: deviceID || '',
            onChange: (e)=>onDeviceChange(e.target.value),
            className: "h-8 w-full rounded-md border border-border bg-background px-2.5 text-[12px] outline-none focus:border-primary",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                    value: "",
                    disabled: true,
                    children: "Select terminal…"
                }, void 0, false, {
                    fileName: "[project]/components/payments/TerminalDeviceField.js",
                    lineNumber: 74,
                    columnNumber: 9
                }, this),
                options.map((o)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                        value: o.id,
                        children: o.label
                    }, o.id, false, {
                        fileName: "[project]/components/payments/TerminalDeviceField.js",
                        lineNumber: 76,
                        columnNumber: 11
                    }, this))
            ]
        }, void 0, true, {
            fileName: "[project]/components/payments/TerminalDeviceField.js",
            lineNumber: 69,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/payments/TerminalDeviceField.js",
        lineNumber: 68,
        columnNumber: 5
    }, this);
}
}),
"[project]/components/payments/WalletShortfallField.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>WalletShortfallField,
    "isWalletShort",
    ()=>isWalletShort,
    "walletPaymentFields",
    ()=>walletPaymentFields,
    "walletShortfall",
    ()=>walletShortfall
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$paymentMethods$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/paymentMethods.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/utils.js [app-ssr] (ecmascript)");
'use client';
;
;
;
// Paying by Wallet used to be all-or-nothing: the Payment model debits the balance when
// the row is written, so a wallet too small for the amount threw and the payment died.
// Now the wallet pays what it can and a second method covers the difference.
const round2 = (n)=>Math.round((n + Number.EPSILON) * 100) / 100;
const walletShortfall = (balance, amountDue, requested)=>{
    const available = Math.max(0, Number(balance) || 0);
    const due = Math.max(0, Number(amountDue) || 0);
    const asked = requested === undefined || requested === '' ? Infinity : Math.max(0, Number(requested) || 0);
    const walletApplied = round2(Math.min(available, due, asked));
    return {
        available,
        due,
        walletApplied,
        remaining: round2(due - walletApplied),
        over: asked !== Infinity && asked > available
    };
};
const isWalletShort = (method, balance, amountDue)=>method === 'wallet' && walletShortfall(balance, amountDue).remaining > 0;
function walletPaymentFields({ method, shortfallMethod, balance, amountDue }) {
    if (method !== 'wallet') return {
        method
    };
    const { walletApplied, remaining } = walletShortfall(balance, amountDue);
    if (remaining === 0) return {
        method: 'wallet'
    };
    return {
        method: shortfallMethod,
        walletAmount: walletApplied
    };
}
function WalletShortfallField({ method, balance, amountDue, shortfallMethod, onShortfallMethodChange, walletAmount, onWalletAmountChange, methods = __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$paymentMethods$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SHORTFALL_METHODS"], className }) {
    if (method !== 'wallet') return null;
    const editable = Boolean(onWalletAmountChange);
    const { available, due, walletApplied, remaining, over } = walletShortfall(balance, amountDue, editable ? walletAmount : undefined);
    const amountInput = editable && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex flex-wrap items-center gap-2",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                htmlFor: "wallet-pay-amount",
                className: "text-[12px] text-muted-foreground",
                children: "From wallet"
            }, void 0, false, {
                fileName: "[project]/components/payments/WalletShortfallField.js",
                lineNumber: 66,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "relative",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "absolute left-2.5 top-1/2 -translate-y-1/2 text-[12px] text-muted-foreground",
                        children: "$"
                    }, void 0, false, {
                        fileName: "[project]/components/payments/WalletShortfallField.js",
                        lineNumber: 70,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                        id: "wallet-pay-amount",
                        type: "number",
                        min: "0",
                        step: "any",
                        max: Math.min(available, due),
                        value: walletAmount === '' || walletAmount === undefined ? walletApplied.toFixed(2) : walletAmount,
                        onChange: (e)=>onWalletAmountChange(e.target.value),
                        className: "h-8 w-32 rounded-lg border border-border bg-background pl-6 pr-2 text-[13px] tabular-nums outline-none focus:border-primary"
                    }, void 0, false, {
                        fileName: "[project]/components/payments/WalletShortfallField.js",
                        lineNumber: 71,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/payments/WalletShortfallField.js",
                lineNumber: 69,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "text-[12px] text-muted-foreground",
                children: [
                    "of $",
                    available.toFixed(2),
                    " available"
                ]
            }, void 0, true, {
                fileName: "[project]/components/payments/WalletShortfallField.js",
                lineNumber: 82,
                columnNumber: 7
            }, this),
            over && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "w-full text-[12px] text-destructive",
                children: "More than the wallet holds."
            }, void 0, false, {
                fileName: "[project]/components/payments/WalletShortfallField.js",
                lineNumber: 83,
                columnNumber: 16
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/payments/WalletShortfallField.js",
        lineNumber: 65,
        columnNumber: 5
    }, this);
    if (remaining === 0) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])('space-y-2', className),
            children: [
                amountInput,
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "text-[12px] text-muted-foreground",
                    children: [
                        "Wallet balance $",
                        available.toFixed(2),
                        " — covers this payment."
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/payments/WalletShortfallField.js",
                    lineNumber: 91,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/components/payments/WalletShortfallField.js",
            lineNumber: 89,
            columnNumber: 7
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])('rounded-lg border border-amber-500/40 bg-amber-500/5 p-3 space-y-2', className),
        children: [
            amountInput,
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "text-[12px] text-foreground",
                children: [
                    editable && walletApplied > 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                        children: [
                            "The wallet pays ",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "font-semibold",
                                children: [
                                    "$",
                                    walletApplied.toFixed(2)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/payments/WalletShortfallField.js",
                                lineNumber: 104,
                                columnNumber: 29
                            }, this),
                            ".",
                            ' '
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/payments/WalletShortfallField.js",
                        lineNumber: 103,
                        columnNumber: 11
                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                        children: [
                            "The wallet has",
                            ' ',
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "font-semibold",
                                children: [
                                    "$",
                                    available.toFixed(2)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/payments/WalletShortfallField.js",
                                lineNumber: 109,
                                columnNumber: 13
                            }, this),
                            ", which does not cover this payment.",
                            ' ',
                            walletApplied > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                                children: [
                                    "It will pay ",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "font-semibold",
                                        children: [
                                            "$",
                                            walletApplied.toFixed(2)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/payments/WalletShortfallField.js",
                                        lineNumber: 113,
                                        columnNumber: 29
                                    }, this),
                                    ".",
                                    ' '
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/payments/WalletShortfallField.js",
                                lineNumber: 112,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/payments/WalletShortfallField.js",
                        lineNumber: 107,
                        columnNumber: 11
                    }, this),
                    "Collect the remaining ",
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "font-semibold",
                        children: [
                            "$",
                            remaining.toFixed(2)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/payments/WalletShortfallField.js",
                        lineNumber: 118,
                        columnNumber: 31
                    }, this),
                    " by:"
                ]
            }, void 0, true, {
                fileName: "[project]/components/payments/WalletShortfallField.js",
                lineNumber: 101,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                "aria-label": "Collect the rest by",
                value: shortfallMethod,
                onChange: (e)=>onShortfallMethodChange(e.target.value),
                className: "h-9 w-full rounded-lg border border-border bg-background px-3 text-[13px] capitalize outline-none focus:border-primary",
                children: methods.map((m)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                        value: m.value,
                        children: m.label
                    }, m.value, false, {
                        fileName: "[project]/components/payments/WalletShortfallField.js",
                        lineNumber: 128,
                        columnNumber: 11
                    }, this))
            }, void 0, false, {
                fileName: "[project]/components/payments/WalletShortfallField.js",
                lineNumber: 121,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/payments/WalletShortfallField.js",
        lineNumber: 99,
        columnNumber: 5
    }, this);
}
}),
"[project]/components/shared/BranchSelector.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>BranchSelector
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$building$2d$2$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Building2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/building-2.js [app-ssr] (ecmascript) <export default as Building2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Check$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/check.js [app-ssr] (ecmascript) <export default as Check>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDown$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/chevron-down.js [app-ssr] (ecmascript) <export default as ChevronDown>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$map$2d$pin$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__MapPin$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/map-pin.js [app-ssr] (ecmascript) <export default as MapPin>");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/auth.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$permissions$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/lib/permissions.js [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/api.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/utils.js [app-ssr] (ecmascript)");
'use client';
;
;
;
;
;
;
;
function BranchSelector() {
    const [open, setOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [selected, setSelected] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [query, setQuery] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('');
    const [branches, setBranches] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(true);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const savedBranch = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getSelectedBranch"])();
        setSelected(savedBranch);
        loadBranches();
    }, []);
    async function loadBranches() {
        try {
            setLoading(true);
            const result = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].get('/api/location?limit=200');
            if (result.success) {
                // Filter only active locations — this switcher only scopes what data
                // you see in the app; creates pick location inside each form.
                const activeLocations = (result.data || []).filter((loc)=>loc.status?.toLowerCase() === 'active');
                setBranches(activeLocations);
            }
        } catch (e) {
            console.error('Failed to load branches:', e);
        } finally{
            setLoading(false);
        }
    }
    if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$permissions$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["isSuperAdmin"])()) {
        return null;
    }
    const selectedBranch = selected ? branches.find((b)=>b._id === selected) : null;
    const filteredBranches = branches.filter((branch)=>{
        const haystack = `${branch.name} ${branch.city || ''} ${branch.state || ''}`.toLowerCase();
        return haystack.includes(query.toLowerCase());
    });
    const handleSelect = (branchId)=>{
        setSelected(branchId);
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["setSelectedBranch"])(branchId);
        setOpen(false);
        setQuery('');
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "relative w-full",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                type: "button",
                onClick: ()=>setOpen(!open),
                className: "flex items-center justify-between gap-2 w-full h-[38px] px-3 rounded-[32px] bg-muted hover:bg-muted/80 transition-colors text-sm font-normal text-muted-foreground",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-1 min-w-0",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$map$2d$pin$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__MapPin$3e$__["MapPin"], {
                                className: "h-5 w-5 shrink-0 text-muted-foreground"
                            }, void 0, false, {
                                fileName: "[project]/components/shared/BranchSelector.js",
                                lineNumber: 65,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "truncate",
                                children: selectedBranch ? selectedBranch.name : 'All Branch'
                            }, void 0, false, {
                                fileName: "[project]/components/shared/BranchSelector.js",
                                lineNumber: 66,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/shared/BranchSelector.js",
                        lineNumber: 64,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDown$3e$__["ChevronDown"], {
                        className: "h-4 w-4 shrink-0 text-muted-foreground"
                    }, void 0, false, {
                        fileName: "[project]/components/shared/BranchSelector.js",
                        lineNumber: 68,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/shared/BranchSelector.js",
                lineNumber: 59,
                columnNumber: 7
            }, this),
            open && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "fixed inset-0 z-40",
                        onClick: ()=>setOpen(false)
                    }, void 0, false, {
                        fileName: "[project]/components/shared/BranchSelector.js",
                        lineNumber: 73,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "absolute top-full left-0 mt-2 w-72 z-50 rounded-xl border border-border bg-popover text-popover-foreground shadow-xl max-h-96 overflow-hidden animate-scale-in",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "p-3 border-b border-border",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                    value: query,
                                    onChange: (e)=>setQuery(e.target.value),
                                    placeholder: "Search…",
                                    className: "h-7 w-full rounded-md border border-border bg-muted/30 px-2.5 text-[11px] text-foreground outline-none focus:border-primary transition-colors placeholder:text-muted-foreground/50"
                                }, void 0, false, {
                                    fileName: "[project]/components/shared/BranchSelector.js",
                                    lineNumber: 76,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/components/shared/BranchSelector.js",
                                lineNumber: 75,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "max-h-80 overflow-y-auto scrollbar-hide p-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>handleSelect(null),
                                        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])('w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-colors', !selected ? 'bg-brand text-brand-foreground' : 'hover:bg-muted text-foreground'),
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-center gap-2",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$building$2d$2$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Building2$3e$__["Building2"], {
                                                        className: "h-4 w-4"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/shared/BranchSelector.js",
                                                        lineNumber: 94,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "font-medium",
                                                        children: "All Branches"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/shared/BranchSelector.js",
                                                        lineNumber: 95,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/shared/BranchSelector.js",
                                                lineNumber: 93,
                                                columnNumber: 17
                                            }, this),
                                            !selected && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Check$3e$__["Check"], {
                                                className: "h-4 w-4"
                                            }, void 0, false, {
                                                fileName: "[project]/components/shared/BranchSelector.js",
                                                lineNumber: 97,
                                                columnNumber: 31
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/shared/BranchSelector.js",
                                        lineNumber: 84,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "my-2 h-px bg-border"
                                    }, void 0, false, {
                                        fileName: "[project]/components/shared/BranchSelector.js",
                                        lineNumber: 100,
                                        columnNumber: 15
                                    }, this),
                                    loading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "px-3 py-4 text-sm text-center text-muted-foreground",
                                        children: "Loading branches..."
                                    }, void 0, false, {
                                        fileName: "[project]/components/shared/BranchSelector.js",
                                        lineNumber: 103,
                                        columnNumber: 17
                                    }, this) : filteredBranches.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "px-3 py-4 text-sm text-center text-muted-foreground",
                                        children: query ? 'No branches found' : 'No branches available'
                                    }, void 0, false, {
                                        fileName: "[project]/components/shared/BranchSelector.js",
                                        lineNumber: 107,
                                        columnNumber: 17
                                    }, this) : filteredBranches.map((branch)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: ()=>handleSelect(branch._id),
                                            className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])('w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-colors mb-1', selected === branch._id ? 'bg-brand text-brand-foreground' : 'hover:bg-muted text-foreground'),
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex flex-col items-start",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "font-medium text-sm",
                                                            children: branch.name
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/shared/BranchSelector.js",
                                                            lineNumber: 123,
                                                            columnNumber: 23
                                                        }, this),
                                                        (branch.city || branch.state) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "text-xs text-muted-foreground",
                                                            children: branch.city && branch.state ? `${branch.city}, ${branch.state}` : branch.city || branch.state
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/shared/BranchSelector.js",
                                                            lineNumber: 125,
                                                            columnNumber: 25
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/components/shared/BranchSelector.js",
                                                    lineNumber: 122,
                                                    columnNumber: 21
                                                }, this),
                                                selected === branch._id && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Check$3e$__["Check"], {
                                                    className: "h-4 w-4"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/shared/BranchSelector.js",
                                                    lineNumber: 132,
                                                    columnNumber: 49
                                                }, this)
                                            ]
                                        }, branch._id, true, {
                                            fileName: "[project]/components/shared/BranchSelector.js",
                                            lineNumber: 112,
                                            columnNumber: 19
                                        }, this))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/shared/BranchSelector.js",
                                lineNumber: 83,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/shared/BranchSelector.js",
                        lineNumber: 74,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/shared/BranchSelector.js",
                lineNumber: 72,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/shared/BranchSelector.js",
        lineNumber: 58,
        columnNumber: 5
    }, this);
}
}),
"[project]/components/shared/BrandLogo.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "BrandLockup",
    ()=>BrandLockup,
    "BrandLogo",
    ()=>BrandLogo,
    "BrandMark",
    ()=>BrandMark,
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/utils.js [app-ssr] (ecmascript)");
;
;
function BrandLogo({ size = 24, className }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        width: size,
        height: size,
        viewBox: "0 0 32 32",
        fill: "none",
        xmlns: "http://www.w3.org/2000/svg",
        className: className,
        "aria-hidden": true,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M24.6 23.7 A11.56 11.56 0 1 1 24.6 8.26",
                fill: "none",
                stroke: "var(--brand-mark-ink)",
                strokeWidth: "4.13"
            }, void 0, false, {
                fileName: "[project]/components/shared/BrandLogo.js",
                lineNumber: 18,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                cx: "24.75",
                cy: "16",
                r: "2.13",
                fill: "var(--brand-gold-bright)"
            }, void 0, false, {
                fileName: "[project]/components/shared/BrandLogo.js",
                lineNumber: 24,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/shared/BrandLogo.js",
        lineNumber: 9,
        columnNumber: 5
    }, this);
}
function BrandMark({ size = 46, className }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])('grid place-items-center shrink-0', className),
        style: {
            width: size,
            height: size,
            borderRadius: size * 0.3,
            background: 'var(--brand-mark-gradient-css)',
            boxShadow: 'var(--brand-mark-shadow)'
        },
        "aria-hidden": true,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(BrandLogo, {
            size: Math.round(size * 0.52)
        }, void 0, false, {
            fileName: "[project]/components/shared/BrandLogo.js",
            lineNumber: 43,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/shared/BrandLogo.js",
        lineNumber: 32,
        columnNumber: 5
    }, this);
}
function BrandLockup({ size = 46, tone = 'light', title, className }) {
    const light = tone === 'light';
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])('flex flex-col items-center gap-2.5 text-center', className),
        title: title,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(BrandMark, {
                size: size
            }, void 0, false, {
                fileName: "[project]/components/shared/BrandLogo.js",
                lineNumber: 61,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: light ? 'text-white' : 'text-foreground',
                        style: {
                            fontFamily: 'var(--font-display), Georgia, serif',
                            fontWeight: 500,
                            fontSize: size * 0.283,
                            letterSpacing: '0.06em',
                            lineHeight: 1.1
                        },
                        children: [
                            "CADANCE",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("b", {
                                style: {
                                    fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif",
                                    color: light ? 'var(--brand-gold-bright)' : 'var(--brand-gold)',
                                    fontWeight: 700,
                                    fontSize: size * 0.196,
                                    letterSpacing: '0.28em',
                                    verticalAlign: 2,
                                    marginLeft: 2
                                },
                                children: "AI"
                            }, void 0, false, {
                                fileName: "[project]/components/shared/BrandLogo.js",
                                lineNumber: 74,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/shared/BrandLogo.js",
                        lineNumber: 63,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: light ? 'text-white/65' : 'text-muted-foreground',
                        style: {
                            fontWeight: 500,
                            fontSize: size * 0.185,
                            letterSpacing: '0.22em',
                            textTransform: 'uppercase',
                            marginTop: 3
                        },
                        children: "Studio Intelligence"
                    }, void 0, false, {
                        fileName: "[project]/components/shared/BrandLogo.js",
                        lineNumber: 88,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/shared/BrandLogo.js",
                lineNumber: 62,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/shared/BrandLogo.js",
        lineNumber: 57,
        columnNumber: 5
    }, this);
}
const __TURBOPACK__default__export__ = BrandLogo;
}),
"[project]/components/shared/GlobalLoader.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>GlobalLoader
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/utils.js [app-ssr] (ecmascript)");
'use client';
;
;
const SIZE_PRESET_PX = {
    xs: 18,
    sm: 24,
    md: 32,
    lg: 42,
    xl: 54
};
function resolveBlobPx(size) {
    if (typeof size === 'number' && Number.isFinite(size)) {
        return Math.max(16, Math.min(72, size));
    }
    return SIZE_PRESET_PX[size] ?? SIZE_PRESET_PX.md;
}
function resolveBlobCssVar(size, variant) {
    // Allow numeric sizes (e.g. size={32}) to behave like fixed px.
    if (typeof size === 'number' && Number.isFinite(size)) {
        const px = resolveBlobPx(size);
        return `${px}px`;
    }
    // Use clamp so loaders scale consistently across screen sizes.
    const centerMap = {
        xs: 'clamp(14px, 1.8vw, 18px)',
        sm: 'clamp(18px, 2.4vw, 24px)',
        md: 'clamp(22px, 2.9vw, 32px)',
        lg: 'clamp(28px, 3.4vw, 42px)',
        xl: 'clamp(34px, 4.0vw, 54px)'
    };
    const inlineMap = {
        xs: 'clamp(12px, 1.6vw, 14px)',
        sm: 'clamp(14px, 2.0vw, 18px)',
        md: 'clamp(16px, 2.2vw, 22px)',
        lg: 'clamp(18px, 2.6vw, 28px)',
        xl: 'clamp(22px, 3.0vw, 34px)'
    };
    const map = variant === 'inline' ? inlineMap : centerMap;
    return map[size] ?? map.md;
}
const blobShadow = '0 10px 28px -8px rgb(var(--studio-primary-rgb) / 0.35), 0 4px 12px -4px rgb(var(--studio-primary-rgb) / 0.18), inset 0 1px 0 0 rgba(255,255,255,0.35)';
function GlobalLoader({ size = 'md', className = '', text = null, full = false, variant = 'center', 'aria-label': ariaLabel = 'Loading' }) {
    const cssVars = {
        ['--gl-blob-size']: resolveBlobCssVar(size, variant)
    };
    const blobStage = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "relative isolate mx-auto overflow-visible",
        style: {
            width: 'calc(var(--gl-blob-size) * 2)',
            height: 'var(--gl-blob-size)',
            ...cssVars
        },
        "aria-hidden": true,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])('global-loader-ambient pointer-events-none absolute left-1/2 top-1/2 z-0 block rounded-[45%]', 'h-[130%] min-h-[20px] w-[90%] min-w-[24px]', 'bg-[radial-gradient(ellipse_72%_55%_at_50%_48%,rgb(var(--studio-primary-rgb)/0.28),transparent_72%)]', 'blur-md motion-reduce:!animate-none'),
                "aria-hidden": true
            }, void 0, false, {
                fileName: "[project]/components/shared/GlobalLoader.js",
                lineNumber: 79,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])('global-loader-blob1 absolute z-[2] overflow-hidden rounded-full', 'ring-1 ring-white/25 ring-inset', 'bg-gradient-to-br from-[var(--studio-primary)] via-primary to-[var(--studio-gradient)]'),
                style: {
                    width: 'calc(var(--gl-blob-size) * 0.8)',
                    height: 'calc(var(--gl-blob-size) * 0.8)',
                    left: '10%',
                    top: '10%',
                    boxShadow: blobShadow
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "pointer-events-none absolute inset-0 bg-gradient-to-b from-white/40 via-white/[0.07] to-transparent mix-blend-soft-light"
                    }, void 0, false, {
                        fileName: "[project]/components/shared/GlobalLoader.js",
                        lineNumber: 104,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "pointer-events-none absolute -left-[20%] -top-[20%] h-[70%] w-[70%] rounded-full bg-white/15 blur-md"
                    }, void 0, false, {
                        fileName: "[project]/components/shared/GlobalLoader.js",
                        lineNumber: 105,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/shared/GlobalLoader.js",
                lineNumber: 90,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])('global-loader-blob2 absolute z-[2] overflow-hidden rounded-full', 'ring-1 ring-white/20 ring-inset', 'bg-gradient-to-tl from-[var(--studio-gradient)] via-primary to-[var(--studio-primary)]'),
                style: {
                    width: 'calc(var(--gl-blob-size) * 0.6)',
                    height: 'calc(var(--gl-blob-size) * 0.6)',
                    right: '5%',
                    top: '20%',
                    boxShadow: blobShadow
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "pointer-events-none absolute inset-0 bg-gradient-to-t from-white/30 via-transparent to-[var(--studio-primary)]/[0.12] mix-blend-soft-light"
                    }, void 0, false, {
                        fileName: "[project]/components/shared/GlobalLoader.js",
                        lineNumber: 123,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "pointer-events-none absolute -right-[15%] bottom-0 h-[55%] w-[55%] rounded-full bg-brand-light/40 blur-md"
                    }, void 0, false, {
                        fileName: "[project]/components/shared/GlobalLoader.js",
                        lineNumber: 124,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/shared/GlobalLoader.js",
                lineNumber: 109,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])('global-loader-trail absolute z-[1] rounded-full', 'bg-gradient-to-r from-transparent via-brand/50 to-transparent', 'motion-reduce:!animate-none', 'blur-[0.5px]'),
                style: {
                    width: 'calc(var(--gl-blob-size) * 1.2)',
                    height: 'max(7px, calc(var(--gl-blob-size) * 0.12))',
                    top: '40%',
                    left: '20%'
                }
            }, void 0, false, {
                fileName: "[project]/components/shared/GlobalLoader.js",
                lineNumber: 128,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/shared/GlobalLoader.js",
        lineNumber: 69,
        columnNumber: 5
    }, this);
    if (variant === 'inline') {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
            className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])('inline-flex items-center justify-center gap-3', className),
            style: cssVars,
            role: "status",
            "aria-label": ariaLabel,
            children: [
                blobStage,
                text ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: "text-xs font-medium leading-snug tracking-tight text-muted-foreground sm:text-sm",
                    children: text
                }, void 0, false, {
                    fileName: "[project]/components/shared/GlobalLoader.js",
                    lineNumber: 155,
                    columnNumber: 11
                }, this) : null
            ]
        }, void 0, true, {
            fileName: "[project]/components/shared/GlobalLoader.js",
            lineNumber: 147,
            columnNumber: 7
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])(full ? 'flex min-h-screen items-center justify-center' : '', 'w-full px-4 text-center', className),
        style: cssVars,
        role: "status",
        "aria-live": "polite",
        "aria-label": ariaLabel,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex flex-col items-center gap-5",
            children: [
                blobStage,
                text ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "max-w-sm text-sm font-medium leading-relaxed tracking-tight text-muted-foreground sm:text-base",
                    children: text
                }, void 0, false, {
                    fileName: "[project]/components/shared/GlobalLoader.js",
                    lineNumber: 178,
                    columnNumber: 11
                }, this) : null
            ]
        }, void 0, true, {
            fileName: "[project]/components/shared/GlobalLoader.js",
            lineNumber: 175,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/shared/GlobalLoader.js",
        lineNumber: 164,
        columnNumber: 5
    }, this);
}
}),
"[project]/components/shared/LocationSelector.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ALL_BRANCHES_VALUE",
    ()=>ALL,
    "default",
    ()=>LocationSelector
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$building$2d$2$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Building2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/building-2.js [app-ssr] (ecmascript) <export default as Building2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDown$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/chevron-down.js [app-ssr] (ecmascript) <export default as ChevronDown>");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/api.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/utils.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/auth.js [app-ssr] (ecmascript)");
'use client';
;
;
;
;
;
;
const ALL = 'all';
function LocationSelector({ value, onChange, onChangeObject, placeholder = 'Select location...', showAllOption = false, /** Marketing: pick every studio the user can access */ allowAllBranches = false, /**
   * When empty, pre-select the studio already chosen in the navbar branch switcher.
   * Runs once per mount so the user can still clear / change afterward.
   */ preselectActiveBranch = true, filterActiveOnly = true, className = '', multiple = false, disabled = false }) {
    const [locations, setLocations] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(true);
    const [open, setOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [dropdownPosition, setDropdownPosition] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])({
        top: 0,
        left: 0,
        width: 0
    });
    const buttonRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const dropdownRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const didAutoSelectRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        loadLocations();
    }, []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (open && buttonRef.current) {
            const updatePosition = ()=>{
                if (buttonRef.current) {
                    const buttonRect = buttonRef.current.getBoundingClientRect();
                    setDropdownPosition({
                        top: buttonRect.bottom + 4,
                        left: buttonRect.left,
                        width: buttonRect.width
                    });
                }
            };
            updatePosition();
            window.addEventListener('scroll', updatePosition, true);
            window.addEventListener('resize', updatePosition);
            return ()=>{
                window.removeEventListener('scroll', updatePosition, true);
                window.removeEventListener('resize', updatePosition);
            };
        }
    }, [
        open
    ]);
    async function loadLocations() {
        try {
            setLoading(true);
            const result = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].get('/api/location?limit=200');
            if (result.success) {
                let locs = result.data || [];
                if (filterActiveOnly) {
                    locs = locs.filter((loc)=>loc.status?.toLowerCase() === 'active');
                }
                setLocations(locs);
            }
        } catch (e) {
            console.error('Failed to load locations:', e);
        } finally{
            setLoading(false);
        }
    }
    const isAllBranches = allowAllBranches && value === ALL;
    const isMultiple = multiple || Array.isArray(value);
    const selectedIds = (isAllBranches ? [] : Array.isArray(value) ? value : value && value !== ALL ? [
        value
    ] : []).map(String);
    const selectedLocations = isMultiple ? locations.filter((loc)=>selectedIds.includes(String(loc._id))) : locations.find((loc)=>String(loc._id) === String(value));
    // Auto-select: single studio, or exactly the navbar branch when empty.
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (loading || locations.length === 0) return;
        if (allowAllBranches && isAllBranches) {
            didAutoSelectRef.current = true;
            return;
        }
        const hasSelection = isMultiple ? selectedIds.length > 0 : Boolean(value) && value !== ALL;
        if (hasSelection) {
            didAutoSelectRef.current = true;
            return;
        }
        if (didAutoSelectRef.current) return;
        const apply = (loc)=>{
            if (!loc) return;
            didAutoSelectRef.current = true;
            const id = String(loc._id);
            // Always a single studio — never preselect multiple.
            if (isMultiple) onChange([
                id
            ]);
            else onChange(id);
            onChangeObject?.(loc);
        };
        if (preselectActiveBranch) {
            const branchId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getEffectiveBranch"])();
            if (branchId) {
                const match = locations.find((loc)=>String(loc._id) === String(branchId));
                if (match) {
                    apply(match);
                    return;
                }
            }
        }
        if (locations.length === 1) {
            apply(locations[0]);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [
        loading,
        locations,
        isMultiple,
        selectedIds.length,
        value,
        allowAllBranches,
        isAllBranches,
        preselectActiveBranch
    ]);
    if (!loading && locations.length === 1 && !allowAllBranches) {
        const only = locations[0];
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])('flex w-full items-center gap-2 rounded-lg border border-border bg-muted/40 px-3 py-2 text-sm text-foreground', className),
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$building$2d$2$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Building2$3e$__["Building2"], {
                    className: "h-4 w-4 shrink-0 text-muted-foreground"
                }, void 0, false, {
                    fileName: "[project]/components/shared/LocationSelector.js",
                    lineNumber: 161,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "min-w-0 flex-1",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "truncate font-medium",
                            children: only.name
                        }, void 0, false, {
                            fileName: "[project]/components/shared/LocationSelector.js",
                            lineNumber: 163,
                            columnNumber: 11
                        }, this),
                        (only.city || only.state) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "truncate text-xs text-muted-foreground",
                            children: only.city && only.state ? `${only.city}, ${only.state}` : only.city || only.state
                        }, void 0, false, {
                            fileName: "[project]/components/shared/LocationSelector.js",
                            lineNumber: 165,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/shared/LocationSelector.js",
                    lineNumber: 162,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/components/shared/LocationSelector.js",
            lineNumber: 155,
            columnNumber: 7
        }, this);
    }
    const label = loading ? 'Loading...' : isAllBranches ? 'All branches' : isMultiple ? selectedLocations && selectedLocations.length > 0 ? selectedLocations.map((s)=>s.name).join(', ') : placeholder : selectedLocations ? selectedLocations.name : placeholder;
    const showPlaceholderStyle = !loading && !isAllBranches && (!selectedLocations || isMultiple && selectedLocations.length === 0);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])('relative', className),
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                ref: buttonRef,
                type: "button",
                onClick: ()=>{
                    if (disabled) return;
                    setOpen(!open);
                },
                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])('w-full flex items-center justify-between gap-2 px-3 py-2 rounded-lg border border-border', 'bg-background text-sm text-foreground hover:border-muted-foreground/30 transition-colors', 'focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-1 focus:ring-offset-background', open && 'border-brand ring-2 ring-brand ring-offset-1 ring-offset-background', disabled && 'bg-muted text-muted-foreground cursor-not-allowed'),
                disabled: loading || disabled,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-2 min-w-0 flex-1",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$building$2d$2$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Building2$3e$__["Building2"], {
                                className: "h-4 w-4 text-muted-foreground shrink-0"
                            }, void 0, false, {
                                fileName: "[project]/components/shared/LocationSelector.js",
                                lineNumber: 210,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])('truncate', showPlaceholderStyle && 'text-muted-foreground'),
                                children: label
                            }, void 0, false, {
                                fileName: "[project]/components/shared/LocationSelector.js",
                                lineNumber: 211,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/shared/LocationSelector.js",
                        lineNumber: 209,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDown$3e$__["ChevronDown"], {
                        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])('h-4 w-4 text-muted-foreground shrink-0 transition-transform', open && 'rotate-180')
                    }, void 0, false, {
                        fileName: "[project]/components/shared/LocationSelector.js",
                        lineNumber: 215,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/shared/LocationSelector.js",
                lineNumber: 193,
                columnNumber: 7
            }, this),
            open && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "fixed inset-0 z-10",
                        onClick: ()=>setOpen(false)
                    }, void 0, false, {
                        fileName: "[project]/components/shared/LocationSelector.js",
                        lineNumber: 225,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        ref: dropdownRef,
                        className: "fixed z-30 bg-popover text-popover-foreground border border-border rounded-lg shadow-lg max-h-60 overflow-y-auto overflow-x-hidden",
                        style: {
                            top: `${dropdownPosition.top}px`,
                            left: `${dropdownPosition.left}px`,
                            width: `${dropdownPosition.width}px`
                        },
                        children: [
                            allowAllBranches && locations.length > 1 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "button",
                                        onClick: ()=>{
                                            didAutoSelectRef.current = true;
                                            onChange(ALL);
                                            setOpen(false);
                                        },
                                        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])('w-full flex items-center gap-2 px-3 py-2 text-sm text-left hover:bg-muted transition-colors', isAllBranches && 'bg-brand/10 text-brand font-medium'),
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$building$2d$2$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Building2$3e$__["Building2"], {
                                                className: "h-4 w-4 text-muted-foreground"
                                            }, void 0, false, {
                                                fileName: "[project]/components/shared/LocationSelector.js",
                                                lineNumber: 249,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                children: "All branches"
                                            }, void 0, false, {
                                                fileName: "[project]/components/shared/LocationSelector.js",
                                                lineNumber: 250,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/shared/LocationSelector.js",
                                        lineNumber: 237,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "h-px bg-border my-1"
                                    }, void 0, false, {
                                        fileName: "[project]/components/shared/LocationSelector.js",
                                        lineNumber: 252,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/shared/LocationSelector.js",
                                lineNumber: 236,
                                columnNumber: 15
                            }, this),
                            showAllOption && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "button",
                                        onClick: ()=>{
                                            didAutoSelectRef.current = true;
                                            onChange(isMultiple ? [] : null);
                                            setOpen(false);
                                        },
                                        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])('w-full flex items-center gap-2 px-3 py-2 text-sm text-left hover:bg-muted transition-colors', (!isMultiple && !value || isMultiple && (!value || value.length === 0)) && !isAllBranches && 'bg-brand/10 text-brand font-medium'),
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$building$2d$2$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Building2$3e$__["Building2"], {
                                                className: "h-4 w-4 text-muted-foreground"
                                            }, void 0, false, {
                                                fileName: "[project]/components/shared/LocationSelector.js",
                                                lineNumber: 272,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                children: "No Location"
                                            }, void 0, false, {
                                                fileName: "[project]/components/shared/LocationSelector.js",
                                                lineNumber: 273,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/shared/LocationSelector.js",
                                        lineNumber: 257,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "h-px bg-border my-1"
                                    }, void 0, false, {
                                        fileName: "[project]/components/shared/LocationSelector.js",
                                        lineNumber: 275,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/shared/LocationSelector.js",
                                lineNumber: 256,
                                columnNumber: 15
                            }, this),
                            locations.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "px-3 py-4 text-sm text-center text-muted-foreground",
                                children: loading ? 'Loading locations...' : 'No locations available'
                            }, void 0, false, {
                                fileName: "[project]/components/shared/LocationSelector.js",
                                lineNumber: 279,
                                columnNumber: 15
                            }, this) : locations.map((location)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    type: "button",
                                    onClick: ()=>{
                                        didAutoSelectRef.current = true;
                                        const locationId = String(location._id);
                                        if (isMultiple) {
                                            const current = isAllBranches ? [] : selectedIds.slice();
                                            const idx = current.indexOf(locationId);
                                            if (idx > -1) current.splice(idx, 1);
                                            else current.push(locationId);
                                            onChange(current);
                                        } else {
                                            onChange(locationId);
                                            onChangeObject?.(location);
                                            setOpen(false);
                                        }
                                    },
                                    className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])('w-full flex items-start gap-2 px-3 py-2 text-sm text-left hover:bg-muted transition-colors', !isAllBranches && (isMultiple ? selectedIds.includes(String(location._id)) : String(value) === String(location._id)) && 'bg-brand/10 text-brand font-medium'),
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$building$2d$2$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Building2$3e$__["Building2"], {
                                            className: "h-4 w-4 text-muted-foreground mt-0.5 shrink-0"
                                        }, void 0, false, {
                                            fileName: "[project]/components/shared/LocationSelector.js",
                                            lineNumber: 311,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex-1 min-w-0",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "font-medium truncate",
                                                    children: location.name
                                                }, void 0, false, {
                                                    fileName: "[project]/components/shared/LocationSelector.js",
                                                    lineNumber: 313,
                                                    columnNumber: 21
                                                }, this),
                                                (location.city || location.state) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "text-xs text-muted-foreground truncate",
                                                    children: location.city && location.state ? `${location.city}, ${location.state}` : location.city || location.state
                                                }, void 0, false, {
                                                    fileName: "[project]/components/shared/LocationSelector.js",
                                                    lineNumber: 315,
                                                    columnNumber: 23
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/shared/LocationSelector.js",
                                            lineNumber: 312,
                                            columnNumber: 19
                                        }, this),
                                        !isAllBranches && isMultiple && selectedIds.includes(String(location._id)) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "ml-2 text-sm text-brand",
                                            children: "✓"
                                        }, void 0, false, {
                                            fileName: "[project]/components/shared/LocationSelector.js",
                                            lineNumber: 325,
                                            columnNumber: 23
                                        }, this)
                                    ]
                                }, location._id, true, {
                                    fileName: "[project]/components/shared/LocationSelector.js",
                                    lineNumber: 284,
                                    columnNumber: 17
                                }, this))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/shared/LocationSelector.js",
                        lineNumber: 226,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/shared/LocationSelector.js",
                lineNumber: 224,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/shared/LocationSelector.js",
        lineNumber: 192,
        columnNumber: 5
    }, this);
}
;
}),
"[project]/components/shared/StaffLocationSwitcher.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>StaffLocationSwitcher
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Check$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/check.js [app-ssr] (ecmascript) <export default as Check>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDown$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/chevron-down.js [app-ssr] (ecmascript) <export default as ChevronDown>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$map$2d$pin$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__MapPin$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/map-pin.js [app-ssr] (ecmascript) <export default as MapPin>");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/auth.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/api.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/utils.js [app-ssr] (ecmascript)");
'use client';
;
;
;
;
;
;
function StaffLocationSwitcher() {
    const [open, setOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [selected, setSelected] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [locations, setLocations] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(true);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const user = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getCurrentUser"])();
        const assigned = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getUserLocations"])(user);
        const active = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getEffectiveBranch"])();
        setSelected(active);
        if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getSelectedBranch"])() && active) {
            // Persist the auto-selected default so it survives a reload and so
            // the api client's header stays in sync with what's shown here. Silent:
            // this is the already-effective location, not a user switch, so it must
            // not trigger MainLayout's reload-on-branch-change.
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["setSelectedBranch"])(active, {
                silent: true
            });
        }
        loadLocationNames(assigned);
    }, []);
    async function loadLocationNames(assigned) {
        if (assigned.length === 0) {
            setLoading(false);
            return;
        }
        try {
            setLoading(true);
            const result = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].get('/api/location');
            const allLocations = result.success ? result.data || [] : [];
            const assignedIds = new Set(assigned.map((loc)=>loc._id));
            const resolved = allLocations.filter((loc)=>assignedIds.has(loc._id)).map((loc)=>({
                    _id: loc._id,
                    name: loc.name,
                    city: loc.city,
                    state: loc.state
                }));
            // Fall back to whatever name (if any) the session already carried,
            // for any assigned id the /api/location call didn't return.
            const resolvedIds = new Set(resolved.map((loc)=>loc._id));
            const missing = assigned.filter((loc)=>!resolvedIds.has(loc._id)).map((loc)=>({
                    _id: loc._id,
                    name: loc.name || 'Unnamed location'
                }));
            setLocations([
                ...resolved,
                ...missing
            ]);
        } catch (e) {
            console.error('Failed to load assigned locations:', e);
            setLocations(assigned.map((loc)=>({
                    _id: loc._id,
                    name: loc.name || 'Unnamed location'
                })));
        } finally{
            setLoading(false);
        }
    }
    if (loading) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex items-center gap-1.5 h-[38px] px-3 rounded-full bg-muted text-sm text-muted-foreground",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$map$2d$pin$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__MapPin$3e$__["MapPin"], {
                    className: "h-5 w-5 shrink-0"
                }, void 0, false, {
                    fileName: "[project]/components/shared/StaffLocationSwitcher.js",
                    lineNumber: 83,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: "truncate",
                    children: "Loading…"
                }, void 0, false, {
                    fileName: "[project]/components/shared/StaffLocationSwitcher.js",
                    lineNumber: 84,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/components/shared/StaffLocationSwitcher.js",
            lineNumber: 82,
            columnNumber: 7
        }, this);
    }
    // 0 or 1 assigned locations: nothing to switch between, plain label.
    if (locations.length <= 1) {
        const only = locations[0];
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex items-center gap-1.5 h-[38px] px-3 rounded-full bg-muted text-sm text-muted-foreground",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$map$2d$pin$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__MapPin$3e$__["MapPin"], {
                    className: "h-5 w-5 shrink-0"
                }, void 0, false, {
                    fileName: "[project]/components/shared/StaffLocationSwitcher.js",
                    lineNumber: 94,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: "truncate",
                    children: only?.name || 'No location assigned'
                }, void 0, false, {
                    fileName: "[project]/components/shared/StaffLocationSwitcher.js",
                    lineNumber: 95,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/components/shared/StaffLocationSwitcher.js",
            lineNumber: 93,
            columnNumber: 7
        }, this);
    }
    const selectedLocation = locations.find((loc)=>loc._id === selected);
    const handleSelect = (locationId)=>{
        setSelected(locationId);
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["setSelectedBranch"])(locationId);
        setOpen(false);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "relative w-full",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                type: "button",
                onClick: ()=>setOpen(!open),
                "aria-haspopup": "listbox",
                "aria-expanded": open,
                className: "flex items-center justify-between gap-2 w-full h-[38px] px-3 rounded-full bg-muted hover:bg-muted/80 transition-colors text-sm font-normal text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-1.5 min-w-0",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$map$2d$pin$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__MapPin$3e$__["MapPin"], {
                                className: "h-5 w-5 shrink-0 text-muted-foreground"
                            }, void 0, false, {
                                fileName: "[project]/components/shared/StaffLocationSwitcher.js",
                                lineNumber: 118,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "truncate",
                                children: selectedLocation?.name || 'Select location'
                            }, void 0, false, {
                                fileName: "[project]/components/shared/StaffLocationSwitcher.js",
                                lineNumber: 119,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/shared/StaffLocationSwitcher.js",
                        lineNumber: 117,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDown$3e$__["ChevronDown"], {
                        className: "h-4 w-4 shrink-0 text-muted-foreground"
                    }, void 0, false, {
                        fileName: "[project]/components/shared/StaffLocationSwitcher.js",
                        lineNumber: 121,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/shared/StaffLocationSwitcher.js",
                lineNumber: 110,
                columnNumber: 7
            }, this),
            open && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "fixed inset-0 z-40",
                        onClick: ()=>setOpen(false)
                    }, void 0, false, {
                        fileName: "[project]/components/shared/StaffLocationSwitcher.js",
                        lineNumber: 126,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        role: "listbox",
                        className: "absolute top-full left-0 mt-2 w-72 z-50 rounded-xl border border-border bg-popover text-popover-foreground shadow-xl max-h-80 overflow-y-auto scrollbar-hide p-2 animate-scale-in",
                        children: locations.map((location)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                role: "option",
                                "aria-selected": selected === location._id,
                                onClick: ()=>handleSelect(location._id),
                                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])('w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-colors mb-1 last:mb-0', selected === location._id ? 'bg-brand text-brand-foreground' : 'hover:bg-muted text-foreground'),
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex flex-col items-start min-w-0",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "font-medium text-sm truncate",
                                                children: location.name
                                            }, void 0, false, {
                                                fileName: "[project]/components/shared/StaffLocationSwitcher.js",
                                                lineNumber: 145,
                                                columnNumber: 19
                                            }, this),
                                            (location.city || location.state) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-xs text-muted-foreground truncate",
                                                children: location.city && location.state ? `${location.city}, ${location.state}` : location.city || location.state
                                            }, void 0, false, {
                                                fileName: "[project]/components/shared/StaffLocationSwitcher.js",
                                                lineNumber: 147,
                                                columnNumber: 21
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/shared/StaffLocationSwitcher.js",
                                        lineNumber: 144,
                                        columnNumber: 17
                                    }, this),
                                    selected === location._id && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Check$3e$__["Check"], {
                                        className: "h-4 w-4 shrink-0"
                                    }, void 0, false, {
                                        fileName: "[project]/components/shared/StaffLocationSwitcher.js",
                                        lineNumber: 154,
                                        columnNumber: 47
                                    }, this)
                                ]
                            }, location._id, true, {
                                fileName: "[project]/components/shared/StaffLocationSwitcher.js",
                                lineNumber: 132,
                                columnNumber: 15
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/components/shared/StaffLocationSwitcher.js",
                        lineNumber: 127,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/shared/StaffLocationSwitcher.js",
                lineNumber: 125,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/shared/StaffLocationSwitcher.js",
        lineNumber: 109,
        columnNumber: 5
    }, this);
}
}),
"[project]/components/ui/avatar.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Avatar",
    ()=>Avatar,
    "AvatarFallback",
    ()=>AvatarFallback,
    "AvatarImage",
    ()=>AvatarImage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/utils.js [app-ssr] (ecmascript)");
;
;
;
const Avatar = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["forwardRef"])(({ className, ...props }, ref)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        ref: ref,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])('relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full', className),
        ...props
    }, void 0, false, {
        fileName: "[project]/components/ui/avatar.js",
        lineNumber: 5,
        columnNumber: 3
    }, ("TURBOPACK compile-time value", void 0)));
Avatar.displayName = 'Avatar';
const AvatarImage = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["forwardRef"])(({ className, alt = '', ...props }, ref)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
        ref: ref,
        alt: alt,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])('aspect-square h-full w-full', className),
        ...props
    }, void 0, false, {
        fileName: "[project]/components/ui/avatar.js",
        lineNumber: 14,
        columnNumber: 3
    }, ("TURBOPACK compile-time value", void 0)));
AvatarImage.displayName = 'AvatarImage';
const AvatarFallback = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["forwardRef"])(({ className, ...props }, ref)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        ref: ref,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])('flex h-full w-full items-center justify-center rounded-full bg-muted', className),
        ...props
    }, void 0, false, {
        fileName: "[project]/components/ui/avatar.js",
        lineNumber: 19,
        columnNumber: 3
    }, ("TURBOPACK compile-time value", void 0)));
AvatarFallback.displayName = 'AvatarFallback';
;
}),
"[project]/components/ui/button.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Button",
    ()=>Button
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/utils.js [app-ssr] (ecmascript)");
;
;
;
const Button = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["forwardRef"])(({ className, variant = 'default', size = 'default', children, ...props }, ref)=>{
    const variants = {
        default: 'bg-primary text-primary-foreground hover:bg-primary/90',
        destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
        outline: 'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
        secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        link: 'text-primary underline-offset-4 hover:underline',
        gradient: 'btn-gradient'
    };
    const sizes = {
        default: 'h-10 px-4 py-2',
        sm: 'h-9 rounded-md px-3',
        lg: 'h-11 rounded-md px-8',
        icon: 'h-10 w-10'
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])('inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50', variants[variant], sizes[size], className),
        ref: ref,
        ...props,
        children: children
    }, void 0, false, {
        fileName: "[project]/components/ui/button.js",
        lineNumber: 23,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
});
Button.displayName = 'Button';
;
}),
"[project]/components/ui/dialog.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Dialog",
    ()=>Dialog,
    "DialogContent",
    ()=>DialogContent,
    "DialogDescription",
    ()=>DialogDescription,
    "DialogFooter",
    ()=>DialogFooter,
    "DialogHeader",
    ()=>DialogHeader,
    "DialogTitle",
    ()=>DialogTitle
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$dom$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-dom.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/x.js [app-ssr] (ecmascript) <export default as X>");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/utils.js [app-ssr] (ecmascript)");
'use client';
;
;
;
;
;
/** Nested dialogs: only lock scroll once; only topmost handles Escape. */ let bodyScrollLockCount = 0;
let dialogStack = [];
function Dialog({ open, onClose, children, maxWidth = 'lg', keepMounted = false }) {
    const [mounted, setMounted] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [stackDepth, setStackDepth] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(0);
    const onCloseRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(onClose);
    onCloseRef.current = onClose;
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        setMounted(true);
    }, []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (!open) return undefined;
        bodyScrollLockCount += 1;
        if (bodyScrollLockCount === 1) {
            document.body.style.overflow = 'hidden';
        }
        const entry = {
            getOnClose: ()=>onCloseRef.current
        };
        dialogStack.push(entry);
        setStackDepth(dialogStack.length);
        const onKeyDown = (e)=>{
            if (e.key !== 'Escape') return;
            const top = dialogStack[dialogStack.length - 1];
            if (top !== entry) return;
            e.preventDefault();
            e.stopPropagation();
            onCloseRef.current?.();
        };
        window.addEventListener('keydown', onKeyDown);
        return ()=>{
            window.removeEventListener('keydown', onKeyDown);
            dialogStack = dialogStack.filter((d)=>d !== entry);
            bodyScrollLockCount = Math.max(0, bodyScrollLockCount - 1);
            if (bodyScrollLockCount === 0) {
                document.body.style.overflow = '';
            }
        };
    }, [
        open
    ]);
    if (!mounted) return null;
    if (!open && !keepMounted) return null;
    const maxWidthClasses = {
        sm: 'max-w-sm',
        md: 'max-w-md',
        lg: 'max-w-lg',
        xl: 'max-w-xl',
        '2xl': 'max-w-2xl',
        '3xl': 'max-w-3xl',
        '4xl': 'max-w-4xl',
        '5xl': 'max-w-5xl',
        '6xl': 'max-w-6xl',
        '7xl': 'max-w-7xl',
        full: 'max-w-full'
    };
    const layer = Math.max(1, stackDepth);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$dom$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createPortal"])(/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: open ? 'fixed inset-0 overflow-y-auto' : 'hidden',
        role: "presentation",
        style: open ? {
            zIndex: 200 + layer
        } : undefined,
        "aria-hidden": open ? undefined : true,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: open ? 'fixed inset-0 bg-background/80 backdrop-blur-sm' : 'hidden',
                onClick: ()=>onCloseRef.current?.(),
                "aria-hidden": "true"
            }, void 0, false, {
                fileName: "[project]/components/ui/dialog.js",
                lineNumber: 80,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: open ? 'flex min-h-full items-center justify-center p-3 sm:p-4 md:p-6' : undefined,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    role: open ? 'dialog' : undefined,
                    "aria-modal": open ? 'true' : undefined,
                    className: open ? `relative my-auto w-full ${maxWidthClasses[maxWidth] || maxWidthClasses.lg} animate-scale-in` : undefined,
                    style: open ? {
                        zIndex: 201 + layer
                    } : undefined,
                    onClick: open ? (e)=>e.stopPropagation() : undefined,
                    children: children
                }, void 0, false, {
                    fileName: "[project]/components/ui/dialog.js",
                    lineNumber: 86,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/ui/dialog.js",
                lineNumber: 85,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/ui/dialog.js",
        lineNumber: 74,
        columnNumber: 5
    }, this), document.body);
}
function DialogContent({ className, children, onClose }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])('relative rounded-xl border-2 border-border bg-card text-card-foreground shadow-2xl p-6', className),
        children: [
            onClose && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                type: "button",
                onClick: onClose,
                className: "absolute right-4 top-4 z-10 rounded-full p-1.5 bg-muted hover:bg-muted/80 text-muted-foreground hover:text-foreground transition-all focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                        className: "h-4 w-4"
                    }, void 0, false, {
                        fileName: "[project]/components/ui/dialog.js",
                        lineNumber: 110,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "sr-only",
                        children: "Close"
                    }, void 0, false, {
                        fileName: "[project]/components/ui/dialog.js",
                        lineNumber: 111,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/ui/dialog.js",
                lineNumber: 105,
                columnNumber: 9
            }, this),
            children
        ]
    }, void 0, true, {
        fileName: "[project]/components/ui/dialog.js",
        lineNumber: 103,
        columnNumber: 5
    }, this);
}
function DialogHeader({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])('flex flex-col space-y-1.5 text-center sm:text-left', className),
        ...props
    }, void 0, false, {
        fileName: "[project]/components/ui/dialog.js",
        lineNumber: 120,
        columnNumber: 10
    }, this);
}
function DialogTitle({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])('text-lg font-semibold leading-none tracking-tight', className),
        ...props
    }, void 0, false, {
        fileName: "[project]/components/ui/dialog.js",
        lineNumber: 124,
        columnNumber: 10
    }, this);
}
function DialogDescription({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])('text-sm text-muted-foreground', className),
        ...props
    }, void 0, false, {
        fileName: "[project]/components/ui/dialog.js",
        lineNumber: 128,
        columnNumber: 10
    }, this);
}
function DialogFooter({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])('flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2', className),
        ...props
    }, void 0, false, {
        fileName: "[project]/components/ui/dialog.js",
        lineNumber: 132,
        columnNumber: 10
    }, this);
}
;
}),
"[project]/components/ui/dropdown-menu.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "DropdownMenu",
    ()=>DropdownMenu,
    "DropdownMenuContent",
    ()=>DropdownMenuContent,
    "DropdownMenuItem",
    ()=>DropdownMenuItem,
    "DropdownMenuLabel",
    ()=>DropdownMenuLabel,
    "DropdownMenuSeparator",
    ()=>DropdownMenuSeparator,
    "DropdownMenuTrigger",
    ()=>DropdownMenuTrigger
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$dom$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-dom.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/utils.js [app-ssr] (ecmascript)");
'use client';
;
;
;
;
const DropdownContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createContext"])();
function DropdownMenu({ children }) {
    const [open, setOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const ref = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const triggerRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const contentRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const handleClickOutside = (event)=>{
            const insideTrigger = ref.current?.contains(event.target);
            const insideContent = contentRef.current?.contains(event.target);
            if (!insideTrigger && !insideContent) {
                setOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return ()=>document.removeEventListener('mousedown', handleClickOutside);
    }, []);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(DropdownContext.Provider, {
        value: {
            open,
            setOpen,
            triggerRef,
            contentRef
        },
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            ref: ref,
            className: "relative inline-block",
            children: children
        }, void 0, false, {
            fileName: "[project]/components/ui/dropdown-menu.js",
            lineNumber: 29,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/ui/dropdown-menu.js",
        lineNumber: 28,
        columnNumber: 5
    }, this);
}
function DropdownMenuTrigger({ children, asChild }) {
    const { open, setOpen, triggerRef } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useContext"])(DropdownContext);
    if (asChild) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            ref: triggerRef,
            onClick: ()=>setOpen(!open),
            children: children
        }, void 0, false, {
            fileName: "[project]/components/ui/dropdown-menu.js",
            lineNumber: 41,
            columnNumber: 7
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
        ref: triggerRef,
        onClick: ()=>setOpen(!open),
        className: "focus:outline-none",
        children: children
    }, void 0, false, {
        fileName: "[project]/components/ui/dropdown-menu.js",
        lineNumber: 48,
        columnNumber: 5
    }, this);
}
function DropdownMenuContent({ className, align = 'end', children }) {
    const { open, setOpen, triggerRef, contentRef } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useContext"])(DropdownContext);
    const [pos, setPos] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null) // { top, left, minWidth }
    ;
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (!open) {
            setPos(null);
            return;
        }
        const raf = requestAnimationFrame(()=>{
            const triggerEl = triggerRef?.current;
            const contentEl = contentRef.current;
            if (!triggerEl || !contentEl) return;
            const triggerRect = triggerEl.getBoundingClientRect();
            const contentRect = contentEl.getBoundingClientRect();
            const vh = window.innerHeight;
            const vw = window.innerWidth;
            const gap = 4;
            // Vertical: prefer below, flip above if not enough space
            let top;
            const spaceBelow = vh - triggerRect.bottom;
            const spaceAbove = triggerRect.top;
            if (spaceBelow >= contentRect.height + gap || spaceBelow >= spaceAbove) {
                top = triggerRect.bottom + gap;
            } else {
                top = triggerRect.top - contentRect.height - gap;
            }
            top = Math.max(gap, Math.min(top, vh - contentRect.height - gap));
            // Horizontal: align per prop, clamp to viewport
            let left;
            if (align === 'end') {
                left = triggerRect.right - contentRect.width;
            } else if (align === 'center') {
                left = triggerRect.left + triggerRect.width / 2 - contentRect.width / 2;
            } else {
                left = triggerRect.left;
            }
            left = Math.max(gap, Math.min(left, vw - contentRect.width - gap));
            setPos({
                top,
                left
            });
        });
        return ()=>cancelAnimationFrame(raf);
    }, [
        open,
        align,
        triggerRef
    ]);
    if (!open) return null;
    const content = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        ref: contentRef,
        style: pos ? {
            top: pos.top,
            left: pos.left
        } : {
            visibility: 'hidden',
            top: 0,
            left: 0
        },
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])('fixed z-[9999] min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md animate-scale-in', className),
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            onClick: ()=>setOpen(false),
            children: children
        }, void 0, false, {
            fileName: "[project]/components/ui/dropdown-menu.js",
            lineNumber: 114,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/ui/dropdown-menu.js",
        lineNumber: 106,
        columnNumber: 5
    }, this);
    return typeof document !== 'undefined' ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$dom$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createPortal"])(content, document.body) : null;
}
function DropdownMenuItem({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])('relative flex cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50', className),
        ...props
    }, void 0, false, {
        fileName: "[project]/components/ui/dropdown-menu.js",
        lineNumber: 123,
        columnNumber: 5
    }, this);
}
function DropdownMenuSeparator({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])('-mx-1 my-1 h-px bg-muted', className),
        ...props
    }, void 0, false, {
        fileName: "[project]/components/ui/dropdown-menu.js",
        lineNumber: 134,
        columnNumber: 10
    }, this);
}
function DropdownMenuLabel({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])('px-2 py-1.5 text-sm font-semibold', className),
        ...props
    }, void 0, false, {
        fileName: "[project]/components/ui/dropdown-menu.js",
        lineNumber: 138,
        columnNumber: 10
    }, this);
}
;
}),
"[project]/components/ui/input.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Input",
    ()=>Input
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/utils.js [app-ssr] (ecmascript)");
;
;
;
const Input = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["forwardRef"])(({ className, type, ...props }, ref)=>{
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
        type: type,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])('flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50', className),
        ref: ref,
        ...props
    }, void 0, false, {
        fileName: "[project]/components/ui/input.js",
        lineNumber: 6,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
});
Input.displayName = 'Input';
;
}),
"[project]/components/ui/label.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Label",
    ()=>Label
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/utils.js [app-ssr] (ecmascript)");
;
;
;
const Label = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["forwardRef"])(({ className, ...props }, ref)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
        ref: ref,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])('text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70', className),
        ...props
    }, void 0, false, {
        fileName: "[project]/components/ui/label.js",
        lineNumber: 5,
        columnNumber: 3
    }, ("TURBOPACK compile-time value", void 0)));
Label.displayName = 'Label';
;
}),
"[project]/components/ui/search-input.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>SearchInput
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$search$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Search$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/search.js [app-ssr] (ecmascript) <export default as Search>");
'use client';
;
;
function SearchInput({ value, onChange, placeholder = 'Search…', className = '', icon = true, inputClassName = '', ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: [
            'relative',
            className
        ].join(' '),
        children: [
            icon && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$search$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Search$3e$__["Search"], {
                className: "pointer-events-none absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground/60"
            }, void 0, false, {
                fileName: "[project]/components/ui/search-input.js",
                lineNumber: 22,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                type: "text",
                value: value,
                onChange: onChange,
                placeholder: placeholder,
                className: [
                    'h-9 w-full rounded-lg border border-border bg-background text-[12px] text-foreground outline-none focus:border-primary transition-colors placeholder:text-muted-foreground/50',
                    icon ? 'pl-8 pr-3' : 'px-3',
                    inputClassName
                ].join(' '),
                ...props
            }, void 0, false, {
                fileName: "[project]/components/ui/search-input.js",
                lineNumber: 24,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/ui/search-input.js",
        lineNumber: 20,
        columnNumber: 5
    }, this);
}
}),
"[project]/components/ui/searchable-select.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>SearchableSelect
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDown$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/chevron-down.js [app-ssr] (ecmascript) <export default as ChevronDown>");
'use client';
;
;
;
function SearchableSelect({ value, onChange, options = [], placeholder, disabled }) {
    const [open, setOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [query, setQuery] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('');
    const containerRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const inputRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const selected = options.find((o)=>o.value === value);
    const filtered = query.trim() ? options.filter((o)=>o.label.toLowerCase().includes(query.toLowerCase())) : options;
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (!open) {
            setQuery('');
            return;
        }
        setTimeout(()=>inputRef.current?.focus(), 0);
    }, [
        open
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        function handleClick(e) {
            if (containerRef.current && !containerRef.current.contains(e.target)) setOpen(false);
        }
        document.addEventListener('mousedown', handleClick);
        return ()=>document.removeEventListener('mousedown', handleClick);
    }, []);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        ref: containerRef,
        className: "relative",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                type: "button",
                disabled: disabled,
                onClick: ()=>setOpen((v)=>!v),
                className: "h-9 w-full flex items-center justify-between rounded-lg border border-border bg-background px-3 pr-8 text-[12px] text-foreground outline-none focus:border-primary transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-left",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: selected ? 'text-foreground' : 'text-muted-foreground/50',
                        children: selected ? selected.label : placeholder
                    }, void 0, false, {
                        fileName: "[project]/components/ui/searchable-select.js",
                        lineNumber: 48,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDown$3e$__["ChevronDown"], {
                        className: "pointer-events-none absolute right-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground"
                    }, void 0, false, {
                        fileName: "[project]/components/ui/searchable-select.js",
                        lineNumber: 51,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/ui/searchable-select.js",
                lineNumber: 42,
                columnNumber: 7
            }, this),
            open && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute z-50 mt-1 w-full rounded-lg border border-border bg-background shadow-lg overflow-hidden",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "p-1.5 border-b border-border",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                            ref: inputRef,
                            type: "text",
                            value: query,
                            onChange: (e)=>setQuery(e.target.value),
                            placeholder: "Search…",
                            className: "h-7 w-full rounded-md border border-border bg-muted/30 px-2.5 text-[11px] text-foreground outline-none focus:border-primary transition-colors placeholder:text-muted-foreground/50"
                        }, void 0, false, {
                            fileName: "[project]/components/ui/searchable-select.js",
                            lineNumber: 57,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/ui/searchable-select.js",
                        lineNumber: 56,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "max-h-48 overflow-y-auto",
                        children: filtered.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "px-3 py-2 text-[11px] text-muted-foreground",
                            children: "No results"
                        }, void 0, false, {
                            fileName: "[project]/components/ui/searchable-select.js",
                            lineNumber: 68,
                            columnNumber: 15
                        }, this) : filtered.map((opt)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                onClick: ()=>{
                                    onChange?.(opt.value);
                                    setOpen(false);
                                },
                                className: [
                                    'w-full text-left px-3 py-1.5 text-[12px] hover:bg-muted/50 transition-colors',
                                    opt.value === value ? 'bg-brand/10 text-brand font-medium' : 'text-foreground'
                                ].join(' '),
                                children: opt.label
                            }, opt.value, false, {
                                fileName: "[project]/components/ui/searchable-select.js",
                                lineNumber: 71,
                                columnNumber: 17
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/components/ui/searchable-select.js",
                        lineNumber: 66,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/ui/searchable-select.js",
                lineNumber: 55,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/ui/searchable-select.js",
        lineNumber: 41,
        columnNumber: 5
    }, this);
}
}),
"[project]/components/ui/select.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Select",
    ()=>Select
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDown$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/chevron-down.js [app-ssr] (ecmascript) <export default as ChevronDown>");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/utils.js [app-ssr] (ecmascript)");
'use client';
;
;
;
;
const Select = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["forwardRef"])(({ className, children, ...props }, ref)=>{
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "relative",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])('flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 appearance-none', className),
                ref: ref,
                ...props,
                children: children
            }, void 0, false, {
                fileName: "[project]/components/ui/select.js",
                lineNumber: 10,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDown$3e$__["ChevronDown"], {
                className: "absolute right-3 top-3 h-4 w-4 opacity-50 pointer-events-none"
            }, void 0, false, {
                fileName: "[project]/components/ui/select.js",
                lineNumber: 20,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/components/ui/select.js",
        lineNumber: 9,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
});
Select.displayName = 'Select';
;
}),
"[project]/components/ui/sheet.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Sheet",
    ()=>Sheet,
    "SheetContent",
    ()=>SheetContent,
    "SheetDescription",
    ()=>SheetDescription,
    "SheetFooter",
    ()=>SheetFooter,
    "SheetHeader",
    ()=>SheetHeader,
    "SheetTitle",
    ()=>SheetTitle
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/x.js [app-ssr] (ecmascript) <export default as X>");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/utils.js [app-ssr] (ecmascript)");
'use client';
;
;
;
;
function Sheet({ open, onClose, children, side = 'right', width }) {
    if (!open) return null;
    const sideClasses = {
        right: 'right-0 h-full w-full max-w-[400px] sm:max-w-[540px] border-l',
        left: 'left-0 h-full w-full max-w-[400px] sm:max-w-[540px] border-r',
        top: 'top-0 left-0 right-0 h-[min(400px,85vh)] sm:h-[500px] border-b',
        bottom: 'bottom-0 left-0 right-0 h-[min(400px,85vh)] sm:h-[500px] border-t'
    };
    const animationClasses = {
        right: 'animate-slide-in-right',
        left: 'animate-slide-in-left',
        top: 'animate-slide-in-top',
        bottom: 'animate-slide-in-bottom'
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "fixed inset-0 z-[150] overflow-hidden",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "fixed inset-0 bg-background/80 backdrop-blur-sm",
                onClick: onClose
            }, void 0, false, {
                fileName: "[project]/components/ui/sheet.js",
                lineNumber: 26,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: `fixed ${sideClasses[side]} z-[150] bg-card border-border shadow-2xl ${animationClasses[side]}`,
                style: width ? {
                    width,
                    maxWidth: '100%'
                } : undefined,
                children: children
            }, void 0, false, {
                fileName: "[project]/components/ui/sheet.js",
                lineNumber: 27,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/ui/sheet.js",
        lineNumber: 25,
        columnNumber: 5
    }, this);
}
function SheetContent({ className, children, onClose, side = 'right' }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])('relative flex h-full flex-col overflow-y-auto', className),
        children: [
            onClose && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                onClick: onClose,
                className: "absolute right-4 top-4 z-10 rounded-full p-1.5 bg-muted hover:bg-muted/80 text-muted-foreground hover:text-foreground transition-all focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                        className: "h-4 w-4"
                    }, void 0, false, {
                        fileName: "[project]/components/ui/sheet.js",
                        lineNumber: 45,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "sr-only",
                        children: "Close"
                    }, void 0, false, {
                        fileName: "[project]/components/ui/sheet.js",
                        lineNumber: 46,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/ui/sheet.js",
                lineNumber: 41,
                columnNumber: 9
            }, this),
            children
        ]
    }, void 0, true, {
        fileName: "[project]/components/ui/sheet.js",
        lineNumber: 39,
        columnNumber: 5
    }, this);
}
function SheetHeader({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])('flex flex-col space-y-1.5 p-6', className),
        ...props
    }, void 0, false, {
        fileName: "[project]/components/ui/sheet.js",
        lineNumber: 55,
        columnNumber: 10
    }, this);
}
function SheetTitle({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])('text-lg font-semibold leading-none tracking-tight', className),
        ...props
    }, void 0, false, {
        fileName: "[project]/components/ui/sheet.js",
        lineNumber: 59,
        columnNumber: 10
    }, this);
}
function SheetDescription({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])('text-sm text-muted-foreground', className),
        ...props
    }, void 0, false, {
        fileName: "[project]/components/ui/sheet.js",
        lineNumber: 63,
        columnNumber: 10
    }, this);
}
function SheetFooter({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])('mt-auto flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2 p-6', className),
        ...props
    }, void 0, false, {
        fileName: "[project]/components/ui/sheet.js",
        lineNumber: 67,
        columnNumber: 10
    }, this);
}
;
}),
"[project]/components/ui/table.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Table",
    ()=>Table,
    "TableBody",
    ()=>TableBody,
    "TableCell",
    ()=>TableCell,
    "TableFooter",
    ()=>TableFooter,
    "TableHead",
    ()=>TableHead,
    "TableHeader",
    ()=>TableHeader,
    "TableRow",
    ()=>TableRow
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/utils.js [app-ssr] (ecmascript)");
;
;
;
const Table = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["forwardRef"])(({ className, ...props }, ref)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "relative w-full overflow-auto scrollbar-hide",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("table", {
            ref: ref,
            className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])('w-full caption-bottom text-sm', className),
            ...props
        }, void 0, false, {
            fileName: "[project]/components/ui/table.js",
            lineNumber: 6,
            columnNumber: 5
        }, ("TURBOPACK compile-time value", void 0))
    }, void 0, false, {
        fileName: "[project]/components/ui/table.js",
        lineNumber: 5,
        columnNumber: 3
    }, ("TURBOPACK compile-time value", void 0)));
Table.displayName = 'Table';
const TableHeader = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["forwardRef"])(({ className, ...props }, ref)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("thead", {
        ref: ref,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])('[&_tr]:border-b', className),
        ...props
    }, void 0, false, {
        fileName: "[project]/components/ui/table.js",
        lineNumber: 12,
        columnNumber: 3
    }, ("TURBOPACK compile-time value", void 0)));
TableHeader.displayName = 'TableHeader';
const TableBody = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["forwardRef"])(({ className, ...props }, ref)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("tbody", {
        ref: ref,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])('[&_tr:last-child]:border-0', className),
        ...props
    }, void 0, false, {
        fileName: "[project]/components/ui/table.js",
        lineNumber: 17,
        columnNumber: 3
    }, ("TURBOPACK compile-time value", void 0)));
TableBody.displayName = 'TableBody';
const TableFooter = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["forwardRef"])(({ className, ...props }, ref)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("tfoot", {
        ref: ref,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])('border-t bg-muted/50 font-medium [&>tr]:last:border-b-0', className),
        ...props
    }, void 0, false, {
        fileName: "[project]/components/ui/table.js",
        lineNumber: 22,
        columnNumber: 3
    }, ("TURBOPACK compile-time value", void 0)));
TableFooter.displayName = 'TableFooter';
const TableRow = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["forwardRef"])(({ className, ...props }, ref)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
        ref: ref,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])('border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted', className),
        ...props
    }, void 0, false, {
        fileName: "[project]/components/ui/table.js",
        lineNumber: 27,
        columnNumber: 3
    }, ("TURBOPACK compile-time value", void 0)));
TableRow.displayName = 'TableRow';
const TableHead = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["forwardRef"])(({ className, ...props }, ref)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
        ref: ref,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])('h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0', className),
        ...props
    }, void 0, false, {
        fileName: "[project]/components/ui/table.js",
        lineNumber: 36,
        columnNumber: 3
    }, ("TURBOPACK compile-time value", void 0)));
TableHead.displayName = 'TableHead';
const TableCell = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["forwardRef"])(({ className, ...props }, ref)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
        ref: ref,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])('p-4 align-middle [&:has([role=checkbox])]:pr-0', className),
        ...props
    }, void 0, false, {
        fileName: "[project]/components/ui/table.js",
        lineNumber: 48,
        columnNumber: 3
    }, ("TURBOPACK compile-time value", void 0)));
TableCell.displayName = 'TableCell';
;
}),
"[project]/components/ui/textarea.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Textarea",
    ()=>Textarea
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/utils.js [app-ssr] (ecmascript)");
;
;
;
const Textarea = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["forwardRef"])(({ className, ...props }, ref)=>{
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])('flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50', className),
        ref: ref,
        ...props
    }, void 0, false, {
        fileName: "[project]/components/ui/textarea.js",
        lineNumber: 6,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
});
Textarea.displayName = 'Textarea';
;
}),
];

//# sourceMappingURL=components_06fns1j4q8bka._.js.map