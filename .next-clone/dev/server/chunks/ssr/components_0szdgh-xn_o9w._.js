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
"[project]/components/charts/barGradients.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Shared bar fills for every Recharts <BarChart>.
 *
 * Mirrors the design language: the primary series gets the Berry 500 → 700
 * vertical gradient, secondary series get the pale Berry 200 → 100 wash.
 * Colours come from --bar-gradient-* / --bar-soft-*, so both flip with the theme.
 *
 * Put {BAR_GRADIENT_DEFS} inside the chart, then fill bars with BAR_FILL /
 * BAR_FILL_SOFT. The gradient ids are document-global but the definitions are
 * identical everywhere, so repeating them across charts on one page is safe.
 *
 * NOTE: this is an element constant, not a component, and must stay that way.
 * Recharts renders its children through its own lookup — a custom component
 * wrapper is dropped silently, taking the <defs> with it and leaving every
 * gradient-filled bar invisible. A plain <defs> element does get rendered.
 */ __turbopack_context__.s([
    "BAR_FILL",
    ()=>BAR_FILL,
    "BAR_FILL_SOFT",
    ()=>BAR_FILL_SOFT,
    "BAR_GRADIENT_DEFS",
    ()=>BAR_GRADIENT_DEFS,
    "BAR_GRADIENT_ID",
    ()=>BAR_GRADIENT_ID,
    "BAR_GRADIENT_SOFT_ID",
    ()=>BAR_GRADIENT_SOFT_ID
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
;
const BAR_GRADIENT_ID = 'chartBarBerry';
const BAR_GRADIENT_SOFT_ID = 'chartBarBerrySoft';
const BAR_FILL = `url(#${BAR_GRADIENT_ID})`;
const BAR_FILL_SOFT = `url(#${BAR_GRADIENT_SOFT_ID})`;
const BAR_GRADIENT_DEFS = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("defs", {
    children: [
        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("linearGradient", {
            id: BAR_GRADIENT_ID,
            x1: "0",
            y1: "0",
            x2: "0",
            y2: "1",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("stop", {
                    offset: "0%",
                    stopColor: "var(--bar-gradient-start)"
                }, void 0, false, {
                    fileName: "[project]/components/charts/barGradients.js",
                    lineNumber: 26,
                    columnNumber: 7
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("stop", {
                    offset: "100%",
                    stopColor: "var(--bar-gradient-end)"
                }, void 0, false, {
                    fileName: "[project]/components/charts/barGradients.js",
                    lineNumber: 27,
                    columnNumber: 7
                }, ("TURBOPACK compile-time value", void 0))
            ]
        }, void 0, true, {
            fileName: "[project]/components/charts/barGradients.js",
            lineNumber: 25,
            columnNumber: 5
        }, ("TURBOPACK compile-time value", void 0)),
        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("linearGradient", {
            id: BAR_GRADIENT_SOFT_ID,
            x1: "0",
            y1: "0",
            x2: "0",
            y2: "1",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("stop", {
                    offset: "0%",
                    stopColor: "var(--bar-soft-start)"
                }, void 0, false, {
                    fileName: "[project]/components/charts/barGradients.js",
                    lineNumber: 30,
                    columnNumber: 7
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("stop", {
                    offset: "100%",
                    stopColor: "var(--bar-soft-end)"
                }, void 0, false, {
                    fileName: "[project]/components/charts/barGradients.js",
                    lineNumber: 31,
                    columnNumber: 7
                }, ("TURBOPACK compile-time value", void 0))
            ]
        }, void 0, true, {
            fileName: "[project]/components/charts/barGradients.js",
            lineNumber: 29,
            columnNumber: 5
        }, ("TURBOPACK compile-time value", void 0))
    ]
}, void 0, true, {
    fileName: "[project]/components/charts/barGradients.js",
    lineNumber: 24,
    columnNumber: 3
}, ("TURBOPACK compile-time value", void 0));
}),
"[project]/components/dashboard-builder/DashboardBuilder.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>DashboardBuilder
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$grip$2d$vertical$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__GripVertical$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/grip-vertical.js [app-ssr] (ecmascript) <export default as GripVertical>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/x.js [app-ssr] (ecmascript) <export default as X>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/plus.js [app-ssr] (ecmascript) <export default as Plus>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$layout$2d$grid$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__LayoutGrid$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/layout-grid.js [app-ssr] (ecmascript) <export default as LayoutGrid>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$rotate$2d$ccw$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__RotateCcw$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/rotate-ccw.js [app-ssr] (ecmascript) <export default as RotateCcw>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Check$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/check.js [app-ssr] (ecmascript) <export default as Check>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$columns$2d$2$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Columns2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/columns-2.js [app-ssr] (ecmascript) <export default as Columns2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$columns$2d$3$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Columns3$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/columns-3.js [app-ssr] (ecmascript) <export default as Columns3>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$square$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Square$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/square.js [app-ssr] (ecmascript) <export default as Square>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$rectangle$2d$horizontal$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__RectangleHorizontal$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/rectangle-horizontal.js [app-ssr] (ecmascript) <export default as RectangleHorizontal>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$dnd$2d$kit$2f$core$2f$dist$2f$core$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@dnd-kit/core/dist/core.esm.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$dnd$2d$kit$2f$sortable$2f$dist$2f$sortable$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@dnd-kit/sortable/dist/sortable.esm.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$dnd$2d$kit$2f$utilities$2f$dist$2f$utilities$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@dnd-kit/utilities/dist/utilities.esm.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/button.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$sheet$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/sheet.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/api.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/utils.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dashboard$2f$widgets$2f$shared$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/dashboard/widgets/shared.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dashboard$2f$widgets$2f$legacyWidgetMap$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/dashboard/widgets/legacyWidgetMap.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$hooks$2f$useAnalyticsOverview$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/hooks/useAnalyticsOverview.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$swr$2f$dist$2f$_internal$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/swr/dist/_internal/index.mjs [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/auth.js [app-ssr] (ecmascript)");
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
const SPAN_CLASS = {
    quarter: 'md:col-span-3',
    third: 'md:col-span-4',
    half: 'md:col-span-6',
    full: 'md:col-span-12'
};
const SIZE_ICONS = {
    quarter: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$square$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Square$3e$__["Square"],
    third: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$columns$2d$3$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Columns3$3e$__["Columns3"],
    half: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$columns$2d$2$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Columns2$3e$__["Columns2"],
    full: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$rectangle$2d$horizontal$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__RectangleHorizontal$3e$__["RectangleHorizontal"]
};
function defaultLayout(registry) {
    return registry.map((w)=>({
            id: w.id,
            visible: true,
            size: w.defaultSize || 'full'
        }));
}
function migrateLegacy(saved, registry) {
    if (!Array.isArray(saved) || saved.length === 0) return null;
    const registryIds = new Set(registry.map((w)=>w.id));
    const hasLegacy = saved.some((e)=>__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dashboard$2f$widgets$2f$legacyWidgetMap$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["LEGACY_WIDGET_MAP"][e.id]);
    const hasOnlyUnknown = saved.every((e)=>!registryIds.has(e.id) && !__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dashboard$2f$widgets$2f$legacyWidgetMap$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["LEGACY_WIDGET_MAP"][e.id]);
    if (!hasLegacy && !hasOnlyUnknown) return null;
    const result = [];
    const seen = new Set();
    for (const entry of saved){
        const mapped = __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dashboard$2f$widgets$2f$legacyWidgetMap$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["LEGACY_WIDGET_MAP"][entry.id];
        if (mapped) {
            for (const id of mapped){
                if (registryIds.has(id) && !seen.has(id)) {
                    const def = registry.find((w)=>w.id === id);
                    result.push({
                        id,
                        visible: entry.visible !== false,
                        size: def?.defaultSize || 'half'
                    });
                    seen.add(id);
                }
            }
        } else if (registryIds.has(entry.id) && !seen.has(entry.id)) {
            const def = registry.find((w)=>w.id === entry.id);
            result.push({
                id: entry.id,
                visible: entry.visible !== false,
                size: entry.size || def?.defaultSize || 'full'
            });
            seen.add(entry.id);
        }
    }
    for (const w of registry){
        if (!seen.has(w.id)) {
            result.push({
                id: w.id,
                visible: true,
                size: w.defaultSize || 'full'
            });
        }
    }
    return result;
}
function mergeLayout(registry, saved) {
    const migrated = migrateLegacy(saved, registry);
    if (migrated) return migrated;
    const byId = new Map(registry.map((w)=>[
            w.id,
            w
        ]));
    const result = [];
    const seen = new Set();
    for (const entry of saved || []){
        const def = byId.get(entry.id);
        if (!def) continue;
        const allowed = def.allowedSizes || [
            'quarter',
            'third',
            'half',
            'full'
        ];
        const size = allowed.includes(entry.size) ? entry.size : def.defaultSize || 'full';
        result.push({
            id: entry.id,
            visible: entry.visible !== false,
            size
        });
        seen.add(entry.id);
    }
    for (const w of registry){
        if (!seen.has(w.id)) {
            result.push({
                id: w.id,
                visible: true,
                size: w.defaultSize || 'full'
            });
        }
    }
    return result;
}
function SortableWidget({ id, title, size, allowedSizes, editing, onRemove, onResize, children }) {
    const { attributes, listeners, setNodeRef, transform, transition, isDragging } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$dnd$2d$kit$2f$sortable$2f$dist$2f$sortable$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useSortable"])({
        id
    });
    const style = {
        transform: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$dnd$2d$kit$2f$utilities$2f$dist$2f$utilities$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CSS"].Transform.toString(transform),
        transition,
        zIndex: isDragging ? 40 : 'auto',
        opacity: isDragging ? 0.35 : 1
    };
    const sizes = (allowedSizes || __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dashboard$2f$widgets$2f$shared$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SIZE_OPTIONS"].map((s)=>s.id)).filter((s)=>__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dashboard$2f$widgets$2f$shared$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SIZE_OPTIONS"].some((o)=>o.id === s));
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        ref: setNodeRef,
        style: style,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])('group relative col-span-1 min-h-0', SPAN_CLASS[size] || SPAN_CLASS.full),
        children: [
            editing && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute inset-x-0 -top-px z-20 flex items-center justify-between gap-2 rounded-t-2xl border border-b-0 border-[var(--studio-primary)]/25 bg-background/95 px-2 py-1.5 backdrop-blur-sm",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex min-w-0 items-center gap-1.5",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                className: "cursor-grab touch-none rounded-md p-1 text-muted-foreground hover:bg-muted hover:text-foreground active:cursor-grabbing",
                                "aria-label": `Drag ${title}`,
                                ...attributes,
                                ...listeners,
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$grip$2d$vertical$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__GripVertical$3e$__["GripVertical"], {
                                    className: "h-4 w-4"
                                }, void 0, false, {
                                    fileName: "[project]/components/dashboard-builder/DashboardBuilder.js",
                                    lineNumber: 167,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/components/dashboard-builder/DashboardBuilder.js",
                                lineNumber: 160,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "truncate text-[11px] font-semibold uppercase tracking-wide text-muted-foreground",
                                children: title
                            }, void 0, false, {
                                fileName: "[project]/components/dashboard-builder/DashboardBuilder.js",
                                lineNumber: 169,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/dashboard-builder/DashboardBuilder.js",
                        lineNumber: 159,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-0.5",
                        children: [
                            sizes.map((s)=>{
                                const opt = __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dashboard$2f$widgets$2f$shared$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SIZE_OPTIONS"].find((o)=>o.id === s);
                                const Icon = SIZE_ICONS[s] || __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$square$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Square$3e$__["Square"];
                                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    type: "button",
                                    title: opt?.title || s,
                                    onClick: ()=>onResize(id, s),
                                    className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])('rounded-md px-1.5 py-1 text-[10px] font-semibold transition-colors', size === s ? 'bg-[var(--studio-primary)] text-white' : 'text-muted-foreground hover:bg-muted hover:text-foreground'),
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "sr-only",
                                            children: opt?.title
                                        }, void 0, false, {
                                            fileName: "[project]/components/dashboard-builder/DashboardBuilder.js",
                                            lineNumber: 191,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Icon, {
                                            className: "h-3.5 w-3.5"
                                        }, void 0, false, {
                                            fileName: "[project]/components/dashboard-builder/DashboardBuilder.js",
                                            lineNumber: 192,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, s, true, {
                                    fileName: "[project]/components/dashboard-builder/DashboardBuilder.js",
                                    lineNumber: 179,
                                    columnNumber: 17
                                }, this);
                            }),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                className: "ml-1 rounded-md p-1 text-muted-foreground hover:bg-destructive/10 hover:text-destructive",
                                "aria-label": `Remove ${title}`,
                                title: "Remove",
                                onClick: ()=>onRemove(id),
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                    className: "h-3.5 w-3.5"
                                }, void 0, false, {
                                    fileName: "[project]/components/dashboard-builder/DashboardBuilder.js",
                                    lineNumber: 203,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/components/dashboard-builder/DashboardBuilder.js",
                                lineNumber: 196,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/dashboard-builder/DashboardBuilder.js",
                        lineNumber: 174,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/dashboard-builder/DashboardBuilder.js",
                lineNumber: 158,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])('h-full', editing && 'rounded-2xl pt-9 ring-1 ring-[var(--studio-primary)]/20 ring-offset-2 ring-offset-background'),
                children: children
            }, void 0, false, {
                fileName: "[project]/components/dashboard-builder/DashboardBuilder.js",
                lineNumber: 209,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/dashboard-builder/DashboardBuilder.js",
        lineNumber: 152,
        columnNumber: 5
    }, this);
}
function WidgetCatalog({ open, onClose, hiddenWidgets, registryById, onAdd }) {
    const categories = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>{
        const map = new Map();
        for (const w of hiddenWidgets){
            const entry = registryById.get(w.id);
            if (!entry) continue;
            const cat = entry.category || 'Other';
            if (!map.has(cat)) map.set(cat, []);
            map.get(cat).push(entry);
        }
        return [
            ...map.entries()
        ];
    }, [
        hiddenWidgets,
        registryById
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$sheet$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Sheet"], {
        open: open,
        onClose: onClose,
        side: "right",
        width: "420px",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$sheet$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SheetContent"], {
            onClose: onClose,
            className: "p-0",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$sheet$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SheetHeader"], {
                    className: "border-b border-border px-5 py-4",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$sheet$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SheetTitle"], {
                            className: "text-base",
                            children: "Add widgets"
                        }, void 0, false, {
                            fileName: "[project]/components/dashboard-builder/DashboardBuilder.js",
                            lineNumber: 238,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "mt-1 text-sm text-muted-foreground",
                            children: "Choose sections to show on your dashboard. Drag and resize after adding."
                        }, void 0, false, {
                            fileName: "[project]/components/dashboard-builder/DashboardBuilder.js",
                            lineNumber: 239,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/dashboard-builder/DashboardBuilder.js",
                    lineNumber: 237,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex-1 overflow-y-auto px-5 py-4",
                    children: categories.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "py-10 text-center text-sm text-muted-foreground",
                        children: "All widgets are already on your dashboard."
                    }, void 0, false, {
                        fileName: "[project]/components/dashboard-builder/DashboardBuilder.js",
                        lineNumber: 245,
                        columnNumber: 13
                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "space-y-6",
                        children: categories.map(([category, items])=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "mb-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--studio-primary)]",
                                        children: category
                                    }, void 0, false, {
                                        fileName: "[project]/components/dashboard-builder/DashboardBuilder.js",
                                        lineNumber: 252,
                                        columnNumber: 19
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "space-y-2",
                                        children: items.map((entry)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                type: "button",
                                                onClick: ()=>onAdd(entry.id),
                                                className: "flex w-full items-start gap-3 rounded-xl border border-border bg-card p-3 text-left transition-colors hover:border-[var(--studio-primary)]/40 hover:bg-muted/40",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg",
                                                        style: {
                                                            background: 'color-mix(in srgb, var(--studio-primary) 12%, transparent)'
                                                        },
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__["Plus"], {
                                                            className: "h-4 w-4 text-[var(--studio-primary)]"
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/dashboard-builder/DashboardBuilder.js",
                                                            lineNumber: 267,
                                                            columnNumber: 27
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/dashboard-builder/DashboardBuilder.js",
                                                        lineNumber: 263,
                                                        columnNumber: 25
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "min-w-0 flex-1",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "block text-sm font-semibold text-foreground",
                                                                children: entry.title
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/dashboard-builder/DashboardBuilder.js",
                                                                lineNumber: 270,
                                                                columnNumber: 27
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "mt-0.5 block text-xs text-muted-foreground",
                                                                children: entry.description
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/dashboard-builder/DashboardBuilder.js",
                                                                lineNumber: 271,
                                                                columnNumber: 27
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/components/dashboard-builder/DashboardBuilder.js",
                                                        lineNumber: 269,
                                                        columnNumber: 25
                                                    }, this)
                                                ]
                                            }, entry.id, true, {
                                                fileName: "[project]/components/dashboard-builder/DashboardBuilder.js",
                                                lineNumber: 257,
                                                columnNumber: 23
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/components/dashboard-builder/DashboardBuilder.js",
                                        lineNumber: 255,
                                        columnNumber: 19
                                    }, this)
                                ]
                            }, category, true, {
                                fileName: "[project]/components/dashboard-builder/DashboardBuilder.js",
                                lineNumber: 251,
                                columnNumber: 17
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/components/dashboard-builder/DashboardBuilder.js",
                        lineNumber: 249,
                        columnNumber: 13
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/components/dashboard-builder/DashboardBuilder.js",
                    lineNumber: 243,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/components/dashboard-builder/DashboardBuilder.js",
            lineNumber: 236,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/dashboard-builder/DashboardBuilder.js",
        lineNumber: 235,
        columnNumber: 5
    }, this);
}
function DashboardBuilder({ page, widgets, sharedProps = {}, dataLoading = false, toolbarExtra = null }) {
    const { mutate: globalMutate } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$swr$2f$dist$2f$_internal$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["useSWRConfig"])();
    const branch = ("TURBOPACK compile-time falsy", 0) ? "TURBOPACK unreachable" : 'all';
    const layoutKey = [
        'dashboard-layout',
        page,
        branch
    ];
    const { data: savedLayout, isLoading: layoutLoading } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$hooks$2f$useAnalyticsOverview$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useDashboardLayout"])(page);
    const [layout, setLayout] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [editing, setEditing] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [catalogOpen, setCatalogOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [saveState, setSaveState] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('idle') // idle | saving | saved
    ;
    const [activeId, setActiveId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const saveTimer = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const savedHintTimer = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const didMigratePersist = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(false);
    const registryById = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>new Map(widgets.map((w)=>[
                w.id,
                w
            ])), [
        widgets
    ]);
    // Hydrate local layout from SWR cache / network once available.
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (layoutLoading) return;
        const saved = Array.isArray(savedLayout) ? savedLayout : [];
        const next = mergeLayout(widgets, saved);
        setLayout(next);
        const savedIds = new Set(saved.map((w)=>w.id));
        const needsPersist = (saved || []).some((w)=>__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dashboard$2f$widgets$2f$legacyWidgetMap$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["LEGACY_WIDGET_MAP"][w.id]) || next.some((w)=>!savedIds.has(w.id) && registryById.has(w.id));
        if (needsPersist && next.length && !didMigratePersist.current) {
            didMigratePersist.current = true;
            __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].put('/api/dashboard-layout', {
                page,
                widgets: next
            }).then((res)=>{
                if (res.success) globalMutate(layoutKey, next, {
                    revalidate: false
                });
            });
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [
        page,
        layoutLoading,
        savedLayout,
        widgets
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        return ()=>{
            if (saveTimer.current) clearTimeout(saveTimer.current);
            if (savedHintTimer.current) clearTimeout(savedHintTimer.current);
        };
    }, []);
    function persist(nextLayout) {
        if (saveTimer.current) clearTimeout(saveTimer.current);
        setSaveState('saving');
        saveTimer.current = setTimeout(()=>{
            __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].put('/api/dashboard-layout', {
                page,
                widgets: nextLayout
            }).then((res)=>{
                if (res.success) {
                    globalMutate(layoutKey, nextLayout, {
                        revalidate: false
                    });
                    setSaveState('saved');
                    if (savedHintTimer.current) clearTimeout(savedHintTimer.current);
                    savedHintTimer.current = setTimeout(()=>setSaveState('idle'), 1600);
                } else {
                    setSaveState('idle');
                }
            });
        }, 350);
    }
    function updateLayout(updater) {
        setLayout((prev)=>{
            if (!prev) return prev;
            const next = typeof updater === 'function' ? updater(prev) : updater;
            persist(next);
            return next;
        });
    }
    const sensors = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$dnd$2d$kit$2f$core$2f$dist$2f$core$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useSensors"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$dnd$2d$kit$2f$core$2f$dist$2f$core$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useSensor"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$dnd$2d$kit$2f$core$2f$dist$2f$core$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PointerSensor"], {
        activationConstraint: {
            distance: 6
        }
    }));
    function handleDragStart(event) {
        setActiveId(event.active.id);
    }
    function handleDragEnd(event) {
        const { active, over } = event;
        setActiveId(null);
        if (!over || active.id === over.id) return;
        updateLayout((prev)=>{
            const oldIndex = prev.findIndex((w)=>w.id === active.id);
            const newIndex = prev.findIndex((w)=>w.id === over.id);
            if (oldIndex < 0 || newIndex < 0) return prev;
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$dnd$2d$kit$2f$sortable$2f$dist$2f$sortable$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["arrayMove"])(prev, oldIndex, newIndex);
        });
    }
    function removeWidget(id) {
        updateLayout((prev)=>prev.map((w)=>w.id === id ? {
                    ...w,
                    visible: false
                } : w));
    }
    function addWidget(id) {
        updateLayout((prev)=>{
            const def = registryById.get(id);
            const next = prev.map((w)=>w.id === id ? {
                    ...w,
                    visible: true,
                    size: w.size || def?.defaultSize || 'half'
                } : w);
            const idx = next.findIndex((w)=>w.id === id);
            if (idx >= 0) {
                const [item] = next.splice(idx, 1);
                next.push(item);
            }
            return next;
        });
        setCatalogOpen(false);
    }
    function resizeWidget(id, size) {
        updateLayout((prev)=>prev.map((w)=>w.id === id ? {
                    ...w,
                    size
                } : w));
    }
    function resetLayout() {
        const next = defaultLayout(widgets);
        setLayout(next);
        persist(next);
    }
    // One skeleton shape for the whole loading period (saved layout + widget
    // data), not two different ones in sequence — swapping a 4-box generic
    // skeleton for a differently-sized N-box one mid-load (plus the toolbar
    // popping in between them) read as a flash/blink even though each phase
    // was "just loading" on its own.
    if (layoutLoading || !layout || dataLoading) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "grid grid-cols-1 gap-5 md:grid-cols-12",
            children: [
                1,
                2,
                3,
                4
            ].map((i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])('h-48 animate-pulse rounded-[20px] border-2 border-border bg-muted/40', i === 1 ? 'md:col-span-12' : 'md:col-span-4')
                }, i, false, {
                    fileName: "[project]/components/dashboard-builder/DashboardBuilder.js",
                    lineNumber: 425,
                    columnNumber: 11
                }, this))
        }, void 0, false, {
            fileName: "[project]/components/dashboard-builder/DashboardBuilder.js",
            lineNumber: 423,
            columnNumber: 7
        }, this);
    }
    const visibleWidgets = layout.filter((w)=>w.visible && registryById.has(w.id));
    const hiddenWidgets = layout.filter((w)=>!w.visible && registryById.has(w.id));
    const activeEntry = activeId ? registryById.get(activeId) : null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "space-y-3",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex flex-wrap items-center justify-between gap-2",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex min-w-0 flex-wrap items-center gap-2",
                        children: [
                            toolbarExtra,
                            editing && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-[11px] text-muted-foreground",
                                children: [
                                    "Drag · resize · remove",
                                    saveState === 'saving' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "ml-1.5",
                                        children: "· Saving…"
                                    }, void 0, false, {
                                        fileName: "[project]/components/dashboard-builder/DashboardBuilder.js",
                                        lineNumber: 449,
                                        columnNumber: 42
                                    }, this),
                                    saveState === 'saved' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "ml-1.5 inline-flex items-center gap-0.5 text-emerald-600",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Check$3e$__["Check"], {
                                                className: "h-3 w-3"
                                            }, void 0, false, {
                                                fileName: "[project]/components/dashboard-builder/DashboardBuilder.js",
                                                lineNumber: 452,
                                                columnNumber: 19
                                            }, this),
                                            " Saved"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/dashboard-builder/DashboardBuilder.js",
                                        lineNumber: 451,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/dashboard-builder/DashboardBuilder.js",
                                lineNumber: 447,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/dashboard-builder/DashboardBuilder.js",
                        lineNumber: 444,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "ml-auto flex flex-wrap items-center justify-end gap-1.5",
                        children: [
                            (editing || hiddenWidgets.length > 0) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Button"], {
                                variant: "outline",
                                size: "sm",
                                className: "h-9 px-2.5 text-[13px]",
                                onClick: ()=>setCatalogOpen(true),
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__["Plus"], {
                                        className: "mr-1 h-3.5 w-3.5"
                                    }, void 0, false, {
                                        fileName: "[project]/components/dashboard-builder/DashboardBuilder.js",
                                        lineNumber: 462,
                                        columnNumber: 15
                                    }, this),
                                    "Add",
                                    hiddenWidgets.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "ml-1 rounded-full bg-muted px-1.5 py-0.5 text-[10px] font-semibold tabular-nums",
                                        children: hiddenWidgets.length
                                    }, void 0, false, {
                                        fileName: "[project]/components/dashboard-builder/DashboardBuilder.js",
                                        lineNumber: 465,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/dashboard-builder/DashboardBuilder.js",
                                lineNumber: 461,
                                columnNumber: 13
                            }, this),
                            editing && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Button"], {
                                variant: "outline",
                                size: "sm",
                                className: "h-9 px-2.5 text-[13px]",
                                onClick: resetLayout,
                                title: "Reset to default layout",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$rotate$2d$ccw$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__RotateCcw$3e$__["RotateCcw"], {
                                        className: "mr-1 h-3.5 w-3.5"
                                    }, void 0, false, {
                                        fileName: "[project]/components/dashboard-builder/DashboardBuilder.js",
                                        lineNumber: 479,
                                        columnNumber: 15
                                    }, this),
                                    "Reset"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/dashboard-builder/DashboardBuilder.js",
                                lineNumber: 472,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Button"], {
                                variant: editing ? 'gradient' : 'outline',
                                size: "sm",
                                className: "h-9 px-2.5 text-[13px]",
                                onClick: ()=>setEditing((e)=>!e),
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$layout$2d$grid$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__LayoutGrid$3e$__["LayoutGrid"], {
                                        className: "mr-1 h-3.5 w-3.5"
                                    }, void 0, false, {
                                        fileName: "[project]/components/dashboard-builder/DashboardBuilder.js",
                                        lineNumber: 489,
                                        columnNumber: 13
                                    }, this),
                                    editing ? 'Done' : 'Customize'
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/dashboard-builder/DashboardBuilder.js",
                                lineNumber: 483,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/dashboard-builder/DashboardBuilder.js",
                        lineNumber: 459,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/dashboard-builder/DashboardBuilder.js",
                lineNumber: 443,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$dnd$2d$kit$2f$core$2f$dist$2f$core$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DndContext"], {
                sensors: sensors,
                collisionDetection: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$dnd$2d$kit$2f$core$2f$dist$2f$core$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["closestCenter"],
                onDragStart: handleDragStart,
                onDragEnd: handleDragEnd,
                onDragCancel: ()=>setActiveId(null),
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$dnd$2d$kit$2f$sortable$2f$dist$2f$sortable$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SortableContext"], {
                        items: visibleWidgets.map((w)=>w.id),
                        strategy: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$dnd$2d$kit$2f$sortable$2f$dist$2f$sortable$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["rectSortingStrategy"],
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "grid grid-cols-1 gap-6 md:grid-cols-12 [grid-auto-flow:dense]",
                            children: visibleWidgets.map((w)=>{
                                const entry = registryById.get(w.id);
                                if (!entry) return null;
                                const WidgetComponent = entry.component;
                                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(SortableWidget, {
                                    id: w.id,
                                    title: entry.title,
                                    size: w.size || entry.defaultSize || 'full',
                                    allowedSizes: entry.allowedSizes,
                                    editing: editing,
                                    onRemove: removeWidget,
                                    onResize: resizeWidget,
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(WidgetComponent, {
                                        ...sharedProps,
                                        ...entry.props || {}
                                    }, void 0, false, {
                                        fileName: "[project]/components/dashboard-builder/DashboardBuilder.js",
                                        lineNumber: 519,
                                        columnNumber: 19
                                    }, this)
                                }, w.id, false, {
                                    fileName: "[project]/components/dashboard-builder/DashboardBuilder.js",
                                    lineNumber: 509,
                                    columnNumber: 17
                                }, this);
                            })
                        }, void 0, false, {
                            fileName: "[project]/components/dashboard-builder/DashboardBuilder.js",
                            lineNumber: 503,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/dashboard-builder/DashboardBuilder.js",
                        lineNumber: 502,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$dnd$2d$kit$2f$core$2f$dist$2f$core$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DragOverlay"], {
                        dropAnimation: null,
                        children: activeEntry ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "rounded-2xl border-2 border-[var(--studio-primary)] bg-card/95 px-4 py-3 shadow-xl backdrop-blur-sm",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-sm font-semibold text-foreground",
                                    children: activeEntry.title
                                }, void 0, false, {
                                    fileName: "[project]/components/dashboard-builder/DashboardBuilder.js",
                                    lineNumber: 529,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-xs text-muted-foreground",
                                    children: "Drop to reposition"
                                }, void 0, false, {
                                    fileName: "[project]/components/dashboard-builder/DashboardBuilder.js",
                                    lineNumber: 530,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/dashboard-builder/DashboardBuilder.js",
                            lineNumber: 528,
                            columnNumber: 13
                        }, this) : null
                    }, void 0, false, {
                        fileName: "[project]/components/dashboard-builder/DashboardBuilder.js",
                        lineNumber: 526,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/dashboard-builder/DashboardBuilder.js",
                lineNumber: 495,
                columnNumber: 7
            }, this),
            visibleWidgets.length === 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "rounded-2xl border border-dashed border-border py-16 text-center",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-sm font-medium text-foreground",
                        children: "Your dashboard is empty"
                    }, void 0, false, {
                        fileName: "[project]/components/dashboard-builder/DashboardBuilder.js",
                        lineNumber: 538,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "mt-1 text-sm text-muted-foreground",
                        children: "Add widgets to build your view."
                    }, void 0, false, {
                        fileName: "[project]/components/dashboard-builder/DashboardBuilder.js",
                        lineNumber: 539,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Button"], {
                        variant: "gradient",
                        size: "sm",
                        className: "mt-4",
                        onClick: ()=>setCatalogOpen(true),
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__["Plus"], {
                                className: "mr-1.5 h-4 w-4"
                            }, void 0, false, {
                                fileName: "[project]/components/dashboard-builder/DashboardBuilder.js",
                                lineNumber: 541,
                                columnNumber: 13
                            }, this),
                            "Add widget"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/dashboard-builder/DashboardBuilder.js",
                        lineNumber: 540,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/dashboard-builder/DashboardBuilder.js",
                lineNumber: 537,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(WidgetCatalog, {
                open: catalogOpen,
                onClose: ()=>setCatalogOpen(false),
                hiddenWidgets: hiddenWidgets,
                registryById: registryById,
                onAdd: addWidget
            }, void 0, false, {
                fileName: "[project]/components/dashboard-builder/DashboardBuilder.js",
                lineNumber: 547,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/dashboard-builder/DashboardBuilder.js",
        lineNumber: 442,
        columnNumber: 5
    }, this);
}
}),
"[project]/components/dashboard-builder/DateRangePresets.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>DateRangePresets
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$calendar$2d$range$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__CalendarRange$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/calendar-range.js [app-ssr] (ecmascript) <export default as CalendarRange>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$rotate$2d$ccw$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__RotateCcw$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/rotate-ccw.js [app-ssr] (ecmascript) <export default as RotateCcw>");
'use client';
;
;
;
const PRESETS = [
    {
        label: 'Today',
        days: 0
    },
    {
        label: '7D',
        days: 7
    },
    {
        label: '30D',
        days: 30
    },
    {
        label: '90D',
        days: 90
    },
    {
        label: '12M',
        days: 365
    }
];
const DEFAULT_DAYS = 30;
function isCustomRange(value) {
    return Boolean(value && typeof value === 'object' && value.from && value.to);
}
function isDefaultRange(value, defaultDays) {
    return !isCustomRange(value) && value === defaultDays;
}
function DateRangePresets({ value, onChange, defaultDays = DEFAULT_DAYS }) {
    const [open, setOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [draftFrom, setDraftFrom] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(isCustomRange(value) ? value.from : '');
    const [draftTo, setDraftTo] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(isCustomRange(value) ? value.to : '');
    const popoverRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (isCustomRange(value)) {
            setDraftFrom(value.from);
            setDraftTo(value.to);
        } else {
            setDraftFrom('');
            setDraftTo('');
        }
    }, [
        value
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (!open) return;
        function onClickOutside(e) {
            if (popoverRef.current && !popoverRef.current.contains(e.target)) setOpen(false);
        }
        document.addEventListener('mousedown', onClickOutside);
        return ()=>document.removeEventListener('mousedown', onClickOutside);
    }, [
        open
    ]);
    function applyCustom() {
        if (!draftFrom || !draftTo) return;
        onChange({
            from: draftFrom,
            to: draftTo
        });
        setOpen(false);
    }
    function resetDates() {
        setDraftFrom('');
        setDraftTo('');
        setOpen(false);
        onChange(defaultDays);
    }
    const customActive = open || isCustomRange(value);
    const canReset = !isDefaultRange(value, defaultDays);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "relative shrink-0",
        ref: popoverRef,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "inline-flex h-9 items-stretch overflow-hidden rounded-lg border border-border bg-background shadow-sm",
                children: [
                    PRESETS.map((preset, index)=>{
                        const active = !customActive && value === preset.days;
                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            type: "button",
                            onClick: ()=>{
                                onChange(preset.days);
                                setOpen(false);
                            },
                            className: [
                                'inline-flex min-w-[2.5rem] items-center justify-center px-2.5 text-[12px] font-semibold leading-none transition-colors',
                                index > 0 ? 'border-l border-border/70' : '',
                                active ? 'bg-[var(--studio-primary)] text-white' : 'text-foreground/70 hover:bg-muted/60 hover:text-foreground'
                            ].join(' '),
                            children: preset.label
                        }, preset.days, false, {
                            fileName: "[project]/components/dashboard-builder/DateRangePresets.js",
                            lineNumber: 72,
                            columnNumber: 13
                        }, this);
                    }),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        onClick: ()=>setOpen((o)=>!o),
                        title: "Custom date range",
                        className: [
                            'inline-flex max-w-[15rem] items-center gap-1.5 border-l border-border/70 px-2.5 text-[12px] font-semibold leading-none transition-colors',
                            customActive ? 'bg-[var(--studio-primary)] text-white' : 'text-foreground/70 hover:bg-muted/60 hover:text-foreground'
                        ].join(' '),
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$calendar$2d$range$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__CalendarRange$3e$__["CalendarRange"], {
                                className: "h-3.5 w-3.5 shrink-0 opacity-90"
                            }, void 0, false, {
                                fileName: "[project]/components/dashboard-builder/DateRangePresets.js",
                                lineNumber: 102,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "truncate",
                                children: isCustomRange(value) ? `${value.from} → ${value.to}` : 'Custom'
                            }, void 0, false, {
                                fileName: "[project]/components/dashboard-builder/DateRangePresets.js",
                                lineNumber: 103,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/dashboard-builder/DateRangePresets.js",
                        lineNumber: 91,
                        columnNumber: 9
                    }, this),
                    canReset && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        onClick: resetDates,
                        title: "Reset date range",
                        className: "inline-flex items-center gap-1 border-l border-border/70 px-2.5 text-[12px] font-medium leading-none text-foreground/65 transition-colors hover:bg-muted/60 hover:text-foreground",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$rotate$2d$ccw$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__RotateCcw$3e$__["RotateCcw"], {
                                className: "h-3 w-3"
                            }, void 0, false, {
                                fileName: "[project]/components/dashboard-builder/DateRangePresets.js",
                                lineNumber: 114,
                                columnNumber: 13
                            }, this),
                            "Reset"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/dashboard-builder/DateRangePresets.js",
                        lineNumber: 108,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/dashboard-builder/DateRangePresets.js",
                lineNumber: 68,
                columnNumber: 7
            }, this),
            open && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute left-0 top-[calc(100%+0.4rem)] z-30 w-[min(100vw-2rem,22rem)] rounded-xl border border-border bg-card p-3 shadow-lg shadow-black/10",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "mb-2 text-[11px] font-semibold uppercase tracking-wide text-foreground/55",
                        children: "Custom range"
                    }, void 0, false, {
                        fileName: "[project]/components/dashboard-builder/DateRangePresets.js",
                        lineNumber: 122,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex flex-col gap-2 sm:flex-row sm:items-center",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                type: "date",
                                value: draftFrom,
                                onChange: (e)=>setDraftFrom(e.target.value),
                                "aria-label": "Start date",
                                className: "box-border h-9 w-full min-w-0 flex-1 rounded-lg border border-border bg-background px-2.5 text-[13px] text-foreground focus:outline-none focus:ring-2 focus:ring-[var(--studio-primary)]/30"
                            }, void 0, false, {
                                fileName: "[project]/components/dashboard-builder/DateRangePresets.js",
                                lineNumber: 126,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "hidden shrink-0 text-[12px] text-foreground/50 sm:inline",
                                children: "to"
                            }, void 0, false, {
                                fileName: "[project]/components/dashboard-builder/DateRangePresets.js",
                                lineNumber: 133,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                type: "date",
                                value: draftTo,
                                min: draftFrom || undefined,
                                onChange: (e)=>setDraftTo(e.target.value),
                                "aria-label": "End date",
                                className: "box-border h-9 w-full min-w-0 flex-1 rounded-lg border border-border bg-background px-2.5 text-[13px] text-foreground focus:outline-none focus:ring-2 focus:ring-[var(--studio-primary)]/30"
                            }, void 0, false, {
                                fileName: "[project]/components/dashboard-builder/DateRangePresets.js",
                                lineNumber: 134,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/dashboard-builder/DateRangePresets.js",
                        lineNumber: 125,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-3 flex items-center justify-end gap-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                onClick: resetDates,
                                className: "inline-flex h-8 items-center justify-center rounded-lg px-3 text-[12px] font-medium text-foreground/70 transition-colors hover:bg-muted hover:text-foreground",
                                children: "Reset"
                            }, void 0, false, {
                                fileName: "[project]/components/dashboard-builder/DateRangePresets.js",
                                lineNumber: 144,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                onClick: applyCustom,
                                disabled: !draftFrom || !draftTo,
                                className: "inline-flex h-8 items-center justify-center rounded-lg bg-[var(--studio-primary)] px-3.5 text-[12px] font-semibold text-white transition-opacity disabled:opacity-45",
                                children: "Apply"
                            }, void 0, false, {
                                fileName: "[project]/components/dashboard-builder/DateRangePresets.js",
                                lineNumber: 151,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/dashboard-builder/DateRangePresets.js",
                        lineNumber: 143,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/dashboard-builder/DateRangePresets.js",
                lineNumber: 121,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/dashboard-builder/DateRangePresets.js",
        lineNumber: 67,
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
"[project]/components/leads/LeadEngagementHistory.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "buildEngagementTimeline",
    ()=>buildEngagementTimeline,
    "default",
    ()=>LeadEngagementHistory,
    "getLeadAttemptCount",
    ()=>getLeadAttemptCount
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$history$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__History$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/history.js [app-ssr] (ecmascript) <export default as History>");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/utils.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$lead$2d$stages$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/lead-stages.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$dynamic$2d$list$2d$normalize$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/dynamic-list-normalize.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$lead$2d$source$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/lead-source.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$shared$2f$StatusColorBadge$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/shared/StatusColorBadge.js [app-ssr] (ecmascript)");
'use client';
;
;
;
;
;
;
;
;
/** Past attempts rendered before collapsing — the array has no backend cap. */ const RECENT_PAST_ATTEMPTS = 3;
function getLeadAttemptCount(lead) {
    const history = Array.isArray(lead?.engagementHistory) ? lead.engagementHistory : [];
    return history.length + 1;
}
function ordinal(n) {
    const mod100 = n % 100;
    if (mod100 >= 11 && mod100 <= 13) return `${n}th`;
    return `${n}${({
        1: 'st',
        2: 'nd',
        3: 'rd'
    })[n % 10] || 'th'}`;
}
function buildEngagementTimeline(lead) {
    const history = Array.isArray(lead?.engagementHistory) ? lead.engagementHistory : [];
    if (history.length === 0) return [];
    const snapshot = (source)=>Object.fromEntries(TIMELINE_FIELDS.map(({ key })=>[
                key,
                source?.[key] ?? null
            ]));
    const attempts = [
        ...history.map((entry, i)=>({
                attempt: i + 1,
                date: i === 0 ? lead.createdAt : history[i - 1].createdDate,
                // Entries archived before the snapshot was widened only carry stage/reason/email.
                legacy: entry.name == null,
                values: snapshot(entry),
                current: false
            })),
        {
            attempt: history.length + 1,
            date: history[history.length - 1].createdDate,
            legacy: false,
            values: snapshot(lead),
            current: true
        }
    ];
    return attempts.map((item, i)=>{
        const prev = attempts[i - 1];
        const changed = new Set();
        if (prev) {
            for (const { key, legacySafe } of TIMELINE_FIELDS){
                if ((prev.legacy || item.legacy) && !legacySafe) continue;
                if (normalize(prev.values[key]) !== normalize(item.values[key])) changed.add(key);
            }
        }
        return {
            ...item,
            changed
        };
    });
}
/** `legacySafe` fields were recorded on every history entry, including old ones. */ const TIMELINE_FIELDS = [
    {
        key: 'name',
        label: 'name'
    },
    {
        key: 'email',
        label: 'email',
        legacySafe: true
    },
    {
        key: 'stage',
        label: 'stage',
        legacySafe: true
    },
    {
        key: 'reason',
        label: 'reason',
        legacySafe: true
    },
    {
        key: 'location',
        label: 'studio'
    },
    {
        key: 'utm_source',
        label: 'source'
    },
    {
        key: 'utm_url',
        label: 'page'
    }
];
function normalize(value) {
    return String(value ?? '').trim().toLowerCase();
}
function Row({ label, changed, children }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "grid grid-cols-[64px_1fr] gap-3 text-xs",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "font-mono text-muted-foreground",
                children: label
            }, void 0, false, {
                fileName: "[project]/components/leads/LeadEngagementHistory.js",
                lineNumber: 85,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])('flex min-w-0 items-start gap-1.5 text-foreground', changed && 'font-medium'),
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "min-w-0 break-words",
                        children: children || '—'
                    }, void 0, false, {
                        fileName: "[project]/components/leads/LeadEngagementHistory.js",
                        lineNumber: 87,
                        columnNumber: 9
                    }, this),
                    changed && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "shrink-0 rounded bg-amber-100 px-1 py-px text-[10px] font-medium leading-tight text-amber-800 dark:bg-amber-900/40 dark:text-amber-300",
                        children: "updated"
                    }, void 0, false, {
                        fileName: "[project]/components/leads/LeadEngagementHistory.js",
                        lineNumber: 89,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/leads/LeadEngagementHistory.js",
                lineNumber: 86,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/leads/LeadEngagementHistory.js",
        lineNumber: 84,
        columnNumber: 5
    }, this);
}
function fieldValue(key, value, { stages, leadReasons }) {
    if (value == null || value === '') return null;
    if (key === 'stage') {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$shared$2f$StatusColorBadge$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
            color: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$lead$2d$stages$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getLeadStageColor"])(value, stages),
            className: "px-2 py-0.5 text-[11px] font-medium",
            children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$lead$2d$stages$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["formatLeadStageLabel"])(value, stages)
        }, void 0, false, {
            fileName: "[project]/components/leads/LeadEngagementHistory.js",
            lineNumber: 102,
            columnNumber: 7
        }, this);
    }
    if (key === 'reason') return (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$dynamic$2d$list$2d$normalize$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["formatReasonLabel"])(value, leadReasons);
    if (key === 'utm_source') return (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$lead$2d$source$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["formatLeadSource"])(value);
    if (key === 'utm_url') {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
            className: "block truncate",
            title: value,
            children: value
        }, void 0, false, {
            fileName: "[project]/components/leads/LeadEngagementHistory.js",
            lineNumber: 114,
            columnNumber: 7
        }, this);
    }
    return value;
}
function LeadEngagementHistory({ lead, stages, leadReasons = [] }) {
    const [expanded, setExpanded] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const timeline = buildEngagementTimeline(lead);
    if (timeline.length === 0) return null;
    const pastCount = timeline.length - 1;
    const hiddenCount = expanded ? 0 : Math.max(0, pastCount - RECENT_PAST_ATTEMPTS);
    const visible = timeline.slice(hiddenCount);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "border-t pt-4",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                className: "flex items-center gap-1.5 text-sm font-medium mb-1",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$history$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__History$3e$__["History"], {
                        className: "h-3.5 w-3.5 text-muted-foreground"
                    }, void 0, false, {
                        fileName: "[project]/components/leads/LeadEngagementHistory.js",
                        lineNumber: 134,
                        columnNumber: 9
                    }, this),
                    "Engagement history"
                ]
            }, void 0, true, {
                fileName: "[project]/components/leads/LeadEngagementHistory.js",
                lineNumber: 133,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "text-xs text-muted-foreground mb-3",
                children: [
                    "This lead has submitted the form ",
                    timeline.length,
                    " times. Each attempt shows its details, with fields that changed from the previous attempt marked as updated."
                ]
            }, void 0, true, {
                fileName: "[project]/components/leads/LeadEngagementHistory.js",
                lineNumber: 137,
                columnNumber: 7
            }, this),
            hiddenCount > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                type: "button",
                onClick: ()=>setExpanded(true),
                className: "mb-3 ml-6 text-xs font-medium text-primary hover:underline",
                children: [
                    "Show ",
                    hiddenCount,
                    " earlier attempt",
                    hiddenCount === 1 ? '' : 's'
                ]
            }, void 0, true, {
                fileName: "[project]/components/leads/LeadEngagementHistory.js",
                lineNumber: 143,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("ol", {
                className: "relative ml-1.5 space-y-4 border-l border-border pl-5",
                children: visible.map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                        className: "relative",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])('absolute -left-[26px] top-0.5 h-3 w-3 rounded-full border-2', item.current ? 'border-primary bg-primary' : 'border-primary bg-background'),
                                "aria-hidden": true
                            }, void 0, false, {
                                fileName: "[project]/components/leads/LeadEngagementHistory.js",
                                lineNumber: 155,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "mb-1.5 font-mono text-[11px] uppercase tracking-wide text-muted-foreground",
                                children: [
                                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["formatDate"])(item.date) || 'Unknown date',
                                    " — ",
                                    item.current ? 'Current' : `${ordinal(item.attempt)} attempt`
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/leads/LeadEngagementHistory.js",
                                lineNumber: 162,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])('max-w-sm space-y-1.5 rounded-lg border bg-card px-3 py-2.5', item.current ? 'border-primary/60' : 'border-border'),
                                children: TIMELINE_FIELDS.filter(({ legacySafe })=>!item.legacy || legacySafe).map(({ key, label })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Row, {
                                        label: label,
                                        changed: item.changed.has(key),
                                        children: fieldValue(key, item.values[key], {
                                            stages,
                                            leadReasons
                                        })
                                    }, key, false, {
                                        fileName: "[project]/components/leads/LeadEngagementHistory.js",
                                        lineNumber: 172,
                                        columnNumber: 17
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/components/leads/LeadEngagementHistory.js",
                                lineNumber: 165,
                                columnNumber: 13
                            }, this)
                        ]
                    }, item.attempt, true, {
                        fileName: "[project]/components/leads/LeadEngagementHistory.js",
                        lineNumber: 154,
                        columnNumber: 11
                    }, this))
            }, void 0, false, {
                fileName: "[project]/components/leads/LeadEngagementHistory.js",
                lineNumber: 152,
                columnNumber: 7
            }, this),
            expanded && pastCount > RECENT_PAST_ATTEMPTS && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                type: "button",
                onClick: ()=>setExpanded(false),
                className: "mt-3 ml-6 text-xs font-medium text-primary hover:underline",
                children: "Show fewer"
            }, void 0, false, {
                fileName: "[project]/components/leads/LeadEngagementHistory.js",
                lineNumber: 182,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/leads/LeadEngagementHistory.js",
        lineNumber: 132,
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
"[project]/components/ui/switch.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Switch",
    ()=>Switch,
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/utils.js [app-ssr] (ecmascript)");
'use client';
;
;
;
const Switch = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["forwardRef"])(function Switch({ checked, onChange, onCheckedChange, className = '', onClick, ...props }, ref) {
    const handleClick = (e)=>{
        e.stopPropagation();
        const next = !checked;
        onChange?.(next);
        onCheckedChange?.(next);
        onClick?.(e);
        onClick?.(e);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
        ref: ref,
        type: "button",
        role: "switch",
        "aria-checked": checked,
        onClick: handleClick,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])('inline-flex h-6 w-11 shrink-0 items-center rounded-full p-0.5 transition-colors', checked ? 'bg-[var(--studio-primary)]' : 'bg-muted-foreground/30', className),
        ...props,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
            className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])('inline-block h-5 w-5 transform rounded-full bg-white shadow transition-transform', checked ? 'translate-x-5' : 'translate-x-0')
        }, void 0, false, {
            fileName: "[project]/components/ui/switch.js",
            lineNumber: 32,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/ui/switch.js",
        lineNumber: 19,
        columnNumber: 5
    }, this);
});
;
const __TURBOPACK__default__export__ = Switch;
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
];

//# sourceMappingURL=components_0szdgh-xn_o9w._.js.map