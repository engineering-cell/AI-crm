module.exports = [
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
];

//# sourceMappingURL=components_enrollment_1oeb_n7syvak9._.js.map