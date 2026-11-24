"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Pin,
  Plus,
  Trash2,
  ChevronDown,
  ExternalLink,
  AlertCircle,
  CheckCircle2,
} from "lucide-react";
import api from "@/lib/api";
import { formatDate } from "@/lib/utils";
import { formatStudioDate, formatStudioTime } from "@/lib/studioLocalDate";
import { useStudioTimezone } from "@/lib/hooks/useStudioTimezone";
import CreateEnrollmentSheet from "@/components/enrollment/CreateEnrollmentSheet";
import SellIntroSheet from "@/components/enrollment/SellIntroSheet";
import EnrollMenu from "@/components/enrollment/EnrollMenu";
import { CreateEventPurchaseDialog } from "@/app/settings/setup/components/EventsPurchases";
import PayInstallmentDialog from "@/components/payments/PayInstallmentDialog";
import PaymentDueCard from "@/components/payments/PaymentDueCard";
import SendPaymentLinkMenu from "@/components/payments/SendPaymentLinkMenu";
import { useCardProcessor } from "@/app/settings/payments/useCardProcessor";
import { hasPermission } from "@/lib/permissions";

const TABS = [
  { key: "appointments", label: "Appointments" },
  { key: "enrollments", label: "Enrollments" },
  { key: "purchases", label: "Events" },
  { key: "payments", label: "Payments" },
  { key: "notes", label: "Notes" },
  { key: "messages", label: "Messages" },
];

// Mini-account design tokens (Cadence mini-account redesign).
const SEG_BTN = (on) =>
  `rounded-md px-3 py-1.5 text-[11px] font-medium transition-colors ${
    on
      ? "bg-primary/10 text-primary"
      : "bg-muted/60 text-muted-foreground hover:text-foreground"
  }`;
const PILL = (warn) =>
  `whitespace-nowrap rounded-[5px] px-2 py-1 text-[11px] font-medium ${
    warn ? "bg-warning/10 text-warning" : "bg-success/10 text-success"
  }`;
const PANEL = "overflow-hidden rounded-[10px] border border-border bg-card";

function initialsOf(name) {
  return String(name || "?")
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((p) => p[0].toUpperCase())
    .join("");
}

function purchaseStatusColor(ps) {
  return (
    {
      paid: "bg-success/10 text-success",
      partial: "bg-warning/10 text-warning",
      unpaid: "bg-rose-500/10 text-rose-600",
      payment_pending: "bg-warning/10 text-warning",
    }[ps] ?? "bg-muted text-muted-foreground"
  );
}

function purchaseStatusLabel(ps) {
  return ps === "payment_pending" ? "payment pending" : (ps ?? "unpaid");
}

function money(n) {
  return `$${Number(n || 0).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

function billingTypeLabel(bt) {
  return (
    {
      flexible: "Flexible",
      payment_plan: "Payment Plan",
      pay_per_session: "Pay Per Session",
      one_time: "One-time",
    }[bt] ?? "Payment Plan"
  );
}

const PAYMENT_TYPE_LABEL = {
  package_purchase: "Package payment",
  session_payment: "Session payment",
  credit_topup: "Credit top-up",
  membership_purchase: "Membership",
  membership_renewal: "Membership renewal",
};

// Auto-charged = true autopay / merchant-initiated scheduled charges only.
// Booking-time package/credits/direct settlements are normal collected payments
// (Payment ledger), not autopay. When autopay ships, mark those charges with
// payment.source === "autopay" (or payment.autopay === true) so they appear here.
function isAutoChargedAtBooking(e) {
  if (!e) return false;
  return e.payment?.source === "autopay" || e.payment?.autopay === true || e.autoCharged === true;
}

// Collected payments come from the Payment ledger (installments, flexible,
// session cash, memberships, Clover checkouts) — not calendar-event charge flags.
function extractCollectedPayments(payResult) {
  const list =
    payResult?.success && Array.isArray(payResult.data) ? payResult.data : [];
  return list
    .filter(
      (p) =>
        p.status === "completed" &&
        p.type !== "refund" &&
        Number(p.amount) > 0,
    )
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
}

function statusColor(status) {
  if (status === "completed") return "bg-success/10 text-success";
  if (status === "cancelled") return "bg-destructive/10 text-destructive";
  if (status === "no_show") return "bg-warning/10 text-warning";
  return "bg-info/10 text-info";
}

export default function MiniStudentPanel({
  customerId,
  customerName,
  onBack,
  inline = false,
  onPaymentSuccess,
  studioTz: studioTzProp = null,
}) {
  // Lesson times are UTC instants — render them in the studio's zone, never the browser's.
  const studioTz = useStudioTimezone(studioTzProp);
  const [activeTab, setActiveTab] = useState("appointments");
  const [customer, setCustomer] = useState(null);
  const [loadingCustomer, setLoadingCustomer] = useState(true);

  const [appointments, setAppointments] = useState([]);
  const [loadingAppts, setLoadingAppts] = useState(false);
  const [apptView, setApptView] = useState("upcoming"); // "upcoming" | "past"
  const [showGroups, setShowGroups] = useState(false);

  const [newNoteText, setNewNoteText] = useState("");
  const [isSavingNote, setIsSavingNote] = useState(false);

  const [catalogPackages, setCatalogPackages] = useState([]);
  const [sellTargetEnrollmentId, setSellTargetEnrollmentId] = useState(null);
  const [sellForm, setSellForm] = useState({
    packageID: "",
    purchaseDate: "",
    notes: "",
  });
  const [sellServices, setSellServices] = useState([]);
  const [isSelling, setIsSelling] = useState(false);
  const [sellError, setSellError] = useState(null);

  const [enrollments, setEnrollments] = useState([]);
  const [loadingEnrollments, setLoadingEnrollments] = useState(false);

  const [showCreateEnrollmentSheet, setShowCreateEnrollmentSheet] =
    useState(false);
  const [enrollMode, setEnrollMode] = useState("service");
  const [showSellIntroSheet, setShowSellIntroSheet] = useState(false);
  const [showEventPurchaseDialog, setShowEventPurchaseDialog] = useState(false);
  const [expandedEnrId, setExpandedEnrId] = useState(null);
  const [justCreatedPurchaseID, setJustCreatedPurchaseID] = useState(null);
  const purchaseRowRefs = useRef({});

  const [collectedPayments, setCollectedPayments] = useState([]);
  const [serviceCharges, setServiceCharges] = useState([]);
  const [loadingPayments, setLoadingPayments] = useState(false);
  const [flexEnrollments, setFlexEnrollments] = useState([]);
  const [allFlexEnrollments, setAllFlexEnrollments] = useState([]);
  const [totalSessionsRemaining, setTotalSessionsRemaining] = useState(null);
  const [upcomingPayments, setUpcomingPayments] = useState([]); // unified sorted list
  const [planPayForms, setPlanPayForms] = useState({}); // planId_installmentIdx → { method, saving, error }
  const [payInstallTarget, setPayInstallTarget] = useState(null); // { plan, index, billingType }

  const [purchases, setPurchases] = useState([]);
  const [purchasePlans, setPurchasePlans] = useState([]);
  const [loadingPurchases, setLoadingPurchases] = useState(false);
  const [busyLineId, setBusyLineId] = useState(null);
  const [addInstallForms, setAddInstallForms] = useState({}); // planId → { open, dueDate, amount, saving, error }
  const [flexiblePlans, setFlexiblePlans] = useState([]); // plans with billingType=flexible for Add Payment button
  const [purchaseNamesById, setPurchaseNamesById] = useState(new Map()); // purchase plans have no package doc to name them
  const [paymentView, setPaymentView] = useState("due");

  const [msgMode, setMsgMode] = useState("sms"); // "sms" | "email"
  const [smsText, setSmsText] = useState("");
  const [emailSubject, setEmailSubject] = useState("");
  const [emailBody, setEmailBody] = useState("");
  const [isSendingMsg, setIsSendingMsg] = useState(false);
  const [msgSuccess, setMsgSuccess] = useState(null);
  const [msgError, setMsgError] = useState(null);
  const [smsHistory, setSmsHistory] = useState([]);
  const [loadingSmsHistory, setLoadingSmsHistory] = useState(false);
  const [smsLoadError, setSmsLoadError] = useState(null);
  const smsThreadRef = useRef(null);
  const [emailHistory, setEmailHistory] = useState([]);
  const [loadingEmailHistory, setLoadingEmailHistory] = useState(false);
  const [emailLoadError, setEmailLoadError] = useState(null);
  const [emailLoadForbidden, setEmailLoadForbidden] = useState(false);
  const [expandedEmails, setExpandedEmails] = useState({});
  const emailThreadRef = useRef(null);
  const [leadId, setLeadId] = useState(null);

  useEffect(() => {
    async function load() {
      setLoadingCustomer(true);
      const result = await api.get(`/api/customer/${customerId}`);
      if (result.success) setCustomer(result.data);
      setLoadingCustomer(false);
    }
    load();
  }, [customerId]);

  useEffect(() => {
    if (activeTab !== "appointments") return;
    async function load() {
      setLoadingAppts(true);
      const result = await api.get(`/api/calendar/customer/${customerId}`);
      if (result.success && Array.isArray(result.data))
        setAppointments(result.data);
      setLoadingAppts(false);
    }
    load();
  }, [activeTab, customerId]);

  async function handleAddNote() {
    if (!newNoteText.trim()) return;
    setIsSavingNote(true);
    const result = await api.post(`/api/customer/${customerId}/notes`, {
      text: newNoteText.trim(),
    });
    if (result.success) {
      setCustomer((prev) => ({ ...prev, notes: result.data }));
      setNewNoteText("");
    }
    setIsSavingNote(false);
  }

  async function handleTogglePin(noteId) {
    const result = await api.patch(
      `/api/customer/${customerId}/notes/${noteId}`,
    );
    if (result.success)
      setCustomer((prev) => ({ ...prev, notes: result.data }));
  }

  async function handleDeleteNote(noteId) {
    const result = await api.delete(
      `/api/customer/${customerId}/notes/${noteId}`,
    );
    if (result.success)
      setCustomer((prev) => ({ ...prev, notes: result.data }));
  }

  useEffect(() => {
    if (activeTab !== "enrollments") return;
    async function load() {
      setLoadingEnrollments(true);
      const [enrResult, catalogResult] = await Promise.all([
        api.get(`/api/enrollment?customerID=${customerId}&limit=500`),
        api.get("/api/package?limit=200&isActive=true"),
      ]);
      if (enrResult.success && Array.isArray(enrResult.data))
        setEnrollments(enrResult.data);
      if (catalogResult.success && Array.isArray(catalogResult.data))
        setCatalogPackages(catalogResult.data);
      setLoadingEnrollments(false);
    }
    load();
  }, [activeTab, customerId]);

  async function reloadEnrollments() {
    const enrResult = await api.get(
      `/api/enrollment?customerID=${customerId}&limit=500`,
    );
    if (enrResult.success && Array.isArray(enrResult.data))
      setEnrollments(enrResult.data);
  }

  useEffect(() => {
    if (activeTab !== "purchases") return;
    async function load() {
      setLoadingPurchases(true);
      const [pRes, planRes] = await Promise.all([
        api.get(`/api/purchase?customerID=${customerId}&limit=50`),
        api.get(`/api/payment-plan/customer/${customerId}`),
      ]);
      if (pRes.success && Array.isArray(pRes.data)) setPurchases(pRes.data);
      if (planRes.success && Array.isArray(planRes.data))
        setPurchasePlans(planRes.data);
      setLoadingPurchases(false);
    }
    load();
  }, [activeTab, customerId]);

  async function reloadPurchases() {
    const [pRes, planRes] = await Promise.all([
      api.get(`/api/purchase?customerID=${customerId}&limit=50`),
      api.get(`/api/payment-plan/customer/${customerId}`),
    ]);
    if (pRes.success && Array.isArray(pRes.data)) setPurchases(pRes.data);
    if (planRes.success && Array.isArray(planRes.data))
      setPurchasePlans(planRes.data);
  }

  // Scrolls the just-created purchase into view once its row exists in the
  // reloaded list, since new rows aren't guaranteed to land at the top.
  useEffect(() => {
    if (!justCreatedPurchaseID) return;
    const el = purchaseRowRefs.current[justCreatedPurchaseID];
    if (el) el.scrollIntoView({ behavior: "smooth", block: "center" });
    const timer = setTimeout(() => setJustCreatedPurchaseID(null), 3000);
    return () => clearTimeout(timer);
  }, [justCreatedPurchaseID, purchases]);

  async function toggleLineCheck(purchase, li) {
    const next = li.checkStatus !== "checked";
    setBusyLineId(li._id);
    const res = await api.patch(
      `/api/purchase/${purchase._id}/line/${li._id}/check`,
      { checked: next },
    );
    setBusyLineId(null);
    if (res.success) await reloadPurchases();
  }

  async function refreshPaymentsData() {
    const [calResult, enrResult, planResult, custResult, payResult, purchResult] =
      await Promise.all([
        api.get(`/api/calendar/customer/${customerId}`),
        api.get(`/api/enrollment?customerID=${customerId}`),
        api.get(`/api/payment-plan/customer/${customerId}`),
        api.get(`/api/customer/${customerId}`),
        api.get(`/api/payment/customer/${customerId}?limit=200`),
        api.get(`/api/purchase?customerID=${customerId}&limit=100`),
      ]);

    if (custResult.success) setCustomer(custResult.data);
    setCollectedPayments(extractCollectedPayments(payResult));

    // A payment plan on an event/product purchase has no package doc to name
    // it — the plan is tagged to the purchase itself instead — so look the
    // purchase's own name up separately for those cards.
    const purchaseNameById = new Map(
      (purchResult.success && Array.isArray(purchResult.data)
        ? purchResult.data
        : []
      ).map((p) => [String(p._id), p.name]),
    );
    setPurchaseNamesById(purchaseNameById);

    // Flexible enrollments that carry a tracked schedule surface as plan installments,
    // so exclude them from the single-due-date flexible cards to avoid double-counting.
    const activePlans = planResult.success
      ? (planResult.data || []).filter((p) => ["active", "past_due"].includes(p.status))
      : [];
    const enrollmentsWithPlan = new Set(
      activePlans.map((p) => String(p.enrollmentID?._id ?? p.enrollmentID)).filter(Boolean),
    );

    let calEvents = [];
    if (calResult.success && Array.isArray(calResult.data)) {
      calEvents = [...calResult.data].sort(
        (a, b) => new Date(b.startDateTime) - new Date(a.startDateTime),
      );
      setServiceCharges(calEvents.filter(isAutoChargedAtBooking));
    }

    let allEnr = [];
    if (enrResult.success) {
      allEnr = enrResult.data || [];
      setEnrollments(allEnr);
      const allFlex = allEnr.filter(
        (e) => e.package?.billingType === "flexible",
      );
      const due = allFlex.filter(
        (e) =>
          e.package?.paymentStatus !== "paid" &&
          e.status !== "cancelled" &&
          e.package?.status !== "cancelled" &&
          !enrollmentsWithPlan.has(String(e._id)),
      );
      setAllFlexEnrollments(allFlex);
      setFlexEnrollments(due);
      const totalRemaining = allEnr
        .filter((e) => e.status === "active" && e.package?.status === "active")
        .reduce((sum, e) => {
          const bt = e.package?.billingType;
          const chargeableServices = (e.package?.services ?? []).filter(
            (s) =>
              s.isChargeable !== false &&
              (s.pricePerSession ?? 0) > 0 &&
              Number(s.finalAmount || 0) > 0,
          );
          if (bt === "flexible" || bt === "payment_plan") {
            const collected = e.package?.amountCollected ?? 0;
            const totalPaid = e.package?.totalPaid ?? 0;
            const chargeableSessions = chargeableServices.reduce(
              (s, sv) =>
                s + (sv.sessionsUsed ?? 0) + (sv.sessionsRemaining ?? 0),
              0,
            );
            const effectivePps =
              chargeableSessions > 0 && totalPaid > 0
                ? totalPaid / chargeableSessions
                : (chargeableServices[0]?.pricePerSession ?? 0);
            const sessionsPaidFor =
              effectivePps > 0 ? collected / effectivePps : 0;
            const sessionsUsed = chargeableServices.reduce(
              (s, sv) => s + (sv.sessionsUsed ?? 0),
              0,
            );
            return sum + Math.max(0, sessionsPaidFor - sessionsUsed);
          }
          return (
            sum +
            chargeableServices.reduce(
              (s2, s) => s2 + (s.sessionsRemaining ?? 0),
              0,
            )
          );
        }, 0);
      setTotalSessionsRemaining(totalRemaining);
    }

    const upcoming = [];
    const now = new Date();

    allEnr
      .filter(
        (e) =>
          e.package?.billingType === "flexible" &&
          e.package?.paymentStatus !== "paid" &&
          e.status !== "cancelled" &&
          e.package?.status !== "cancelled" &&
          !enrollmentsWithPlan.has(String(e._id)),
      )
      .forEach((e) => {
        const col = e.package.amountCollected ?? 0;
        const rem = Math.max(0, (e.package.totalPaid ?? 0) - col);
        const outstanding = rem;
        upcoming.push({
          type: "flexible",
          sortDate: e.package.dueDate
            ? new Date(e.package.dueDate)
            : new Date(8640000000000000),
          enrollmentId: String(e._id),
          packageName: e.package.packageName,
          amount: outstanding,
          dueDate: e.package.dueDate,
          isOverdue: e.package.dueDate && new Date(e.package.dueDate) < now,
        });
      });

    // One-time packages carrying a static leftover balance with no plan or
    // flexible schedule behind them (mainly migrated enrollments) — same
    // Pay Now card as flexible, via the shared PaymentDueCard.
    allEnr
      .filter(
        (e) =>
          (!e.package?.billingType || e.package?.billingType === "one_time") &&
          e.status !== "cancelled" &&
          e.package?.status !== "cancelled" &&
          !enrollmentsWithPlan.has(String(e._id)),
      )
      .forEach((e) => {
        const schedulable =
          e.package.dueAmount != null
            ? Number(e.package.dueAmount)
            : Math.max(0, (e.package.totalPaid ?? 0) - (e.package.amountCollected ?? 0));
        if (schedulable <= 0) return;
        upcoming.push({
          type: "onetime",
          sortDate: new Date(8640000000000000),
          enrollmentId: String(e._id),
          packageName: e.package.packageName,
          amount: schedulable,
        });
      });

    if (planResult.success) {
      const plans = planResult.data || [];
      const planForms = {};
      plans
        .filter((p) => ["active", "past_due"].includes(p.status))
        .forEach((plan) => {
          (plan.installments || []).forEach((inst, idx) => {
            if (inst.status !== "pending") return;
            const dueDate = new Date(inst.dueDate);
            upcoming.push({
              type: "plan",
              sortDate: dueDate,
              planId: String(plan._id),
              installmentIdx: idx,
              plan,
              packageName:
                plan.enrollmentID?.package?.packageName ??
                purchaseNameById.get(
                  String(plan.purchaseID?._id ?? plan.purchaseID),
                ) ??
                "Package",
              amount: inst.amount,
              dueDate: inst.dueDate,
              installmentNumber: idx + 1,
              totalInstallments: plan.numberOfInstallments,
              isOverdue: dueDate < now,
            });
            planForms[`${plan._id}_${idx}`] = {
              method: "cash",
              saving: false,
              error: null,
              open: false,
            };
          });
        });
      setPlanPayForms(planForms);
      setFlexiblePlans(
        plans.filter(
          (p) =>
            p.enrollmentID?.package?.billingType === "flexible" &&
            p.status !== "cancelled",
        ),
      );
    }

    calEvents
      .filter((e) => {
        const isUpcoming = new Date(e.startDateTime) >= now;
        // Due = a charge applies but no cash collected yet, and it isn't covered
        // by a prepaid method (package/credits/membership are already paid).
        const isDueSession =
          e.chargeApplied &&
          !e.payment?.collected &&
          !["package", "credits", "membership"].includes(e.chargeMethod);
        return isUpcoming && isDueSession;
      })
      .forEach((e) => {
        upcoming.push({
          type: "session",
          sortDate: new Date(e.startDateTime),
          eventId: String(e._id),
          title: e.title,
          serviceName: e.calendarServiceID?.serviceName,
          amount: e.calendarServiceID?.price ?? 0,
          startDateTime: e.startDateTime,
          isOverdue: false,
        });
      });

    upcoming.sort((a, b) => a.sortDate - b.sortDate);
    setUpcomingPayments(upcoming);
    onPaymentSuccess?.();
  }

  function handlePkgSelect(pkgId) {
    const pkg = catalogPackages.find((p) => p._id === pkgId);
    setSellForm((f) => ({ ...f, packageID: pkgId }));
    setSellServices(
      (pkg?.services || []).map((s) => {
        const isChargeable = s.isChargeable ?? true;
        return {
          serviceCode: s.serviceCode || "",
          serviceName: s.serviceName || "",
          numberOfSessions: s.numberOfSessions || 0,
          pricePerSession: isChargeable ? s.pricePerSession || 0 : 0,
          discountType: isChargeable ? s.discountType || "none" : "none",
          discountAmount: isChargeable ? s.discountAmount || 0 : 0,
          finalAmount: isChargeable ? s.finalAmount || 0 : 0,
          isChargeable,
        };
      }),
    );
  }

  function updateSellSvc(i, field, val) {
    setSellServices((prev) =>
      prev.map((s, idx) => {
        if (idx !== i) return s;
        const updated = { ...s, [field]: val };
        const price = Number(updated.pricePerSession) || 0;
        const sessions = Number(updated.numberOfSessions) || 0;
        let fa = price * sessions;
        if (updated.discountType === "percentage")
          fa -= fa * ((Number(updated.discountAmount) || 0) / 100);
        if (updated.discountType === "fixed")
          fa -= Number(updated.discountAmount) || 0;
        updated.finalAmount = Math.max(0, parseFloat(fa.toFixed(2)));
        return updated;
      }),
    );
  }

  async function handleSellPackage() {
    if (!sellForm.packageID || !sellTargetEnrollmentId) {
      setSellError("Please select a package.");
      return;
    }
    setIsSelling(true);
    setSellError(null);
    const result = await api.post("/api/customer-package/add", {
      customerID: customerId,
      enrollmentID: sellTargetEnrollmentId,
      packageID: sellForm.packageID,
      purchaseDate: sellForm.purchaseDate || undefined,
      services: sellServices.map((s) => ({
        ...s,
        numberOfSessions: Number(s.numberOfSessions),
        pricePerSession: Number(s.pricePerSession),
        discountAmount: Number(s.discountAmount),
        finalAmount: Number(s.finalAmount),
      })),
      billingType: "one_time",
      billing: { method: "cash" },
      notes: sellForm.notes || undefined,
    });

    if (result.success) {
      const updatedEnrollment = result.data.enrollment ?? result.data;
      setEnrollments((prev) =>
        prev.map((e) =>
          String(e._id) === String(sellTargetEnrollmentId)
            ? { ...e, package: updatedEnrollment.package }
            : e,
        ),
      );
      setSellTargetEnrollmentId(null);
      setSellForm({ packageID: "", purchaseDate: "", notes: "" });
      setSellServices([]);
    } else {
      setSellError(result.error || "Failed to sell package.");
    }
    setIsSelling(false);
  }

  useEffect(() => {
    if (activeTab !== "payments") return;
    async function load() {
      setLoadingPayments(true);
      const [calResult, enrResult, planResult, payResult, purchResult] =
        await Promise.all([
          api.get(`/api/calendar/customer/${customerId}`),
          api.get(`/api/enrollment?customerID=${customerId}`),
          api.get(`/api/payment-plan/customer/${customerId}`),
          api.get(`/api/payment/customer/${customerId}?limit=200`),
          api.get(`/api/purchase?customerID=${customerId}&limit=100`),
        ]);

      setCollectedPayments(extractCollectedPayments(payResult));

      // A payment plan on an event/product purchase has no package doc to
      // name it — look the purchase's own name up separately for those.
      const purchaseNameById = new Map(
        (purchResult.success && Array.isArray(purchResult.data)
          ? purchResult.data
          : []
        ).map((p) => [String(p._id), p.name]),
      );
      setPurchaseNamesById(purchaseNameById);

      const activePlans = planResult.success
        ? (planResult.data || []).filter((p) => ["active", "past_due"].includes(p.status))
        : [];
      const enrollmentsWithPlan = new Set(
        activePlans.map((p) => String(p.enrollmentID?._id ?? p.enrollmentID)).filter(Boolean),
      );

      let calEvents = [];
      if (calResult.success && Array.isArray(calResult.data)) {
        calEvents = [...calResult.data].sort(
          (a, b) => new Date(b.startDateTime) - new Date(a.startDateTime),
        );
        setServiceCharges(calEvents.filter(isAutoChargedAtBooking));
      }

      let allEnr = [];
      if (enrResult.success) {
        allEnr = enrResult.data || [];
        setEnrollments(allEnr);
        const allFlex = allEnr.filter(
          (e) => e.package?.billingType === "flexible",
        );
        const due = allFlex.filter(
          (e) =>
            e.package?.paymentStatus !== "paid" &&
            e.status !== "cancelled" &&
            e.package?.status !== "cancelled" &&
            !enrollmentsWithPlan.has(String(e._id)),
        );
        setAllFlexEnrollments(allFlex);
        setFlexEnrollments(due);
        const totalRemaining = allEnr
          .filter(
            (e) => e.status === "active" && e.package?.status === "active",
          )
          .reduce((sum, e) => {
            const bt = e.package?.billingType;
            const chargeableServices = (e.package?.services ?? []).filter(
              (s) =>
                s.isChargeable !== false &&
                (s.pricePerSession ?? 0) > 0 &&
                Number(s.finalAmount || 0) > 0,
            );
            if (bt === "flexible" || bt === "payment_plan") {
              const collected = e.package?.amountCollected ?? 0;
              const totalPaid = e.package?.totalPaid ?? 0;
              const chargeableSessions = chargeableServices.reduce(
                (s, sv) =>
                  s + (sv.sessionsUsed ?? 0) + (sv.sessionsRemaining ?? 0),
                0,
              );
              const effectivePps =
                chargeableSessions > 0 && totalPaid > 0
                  ? totalPaid / chargeableSessions
                  : (chargeableServices[0]?.pricePerSession ?? 0);
              const sessionsPaidFor =
                effectivePps > 0 ? collected / effectivePps : 0;
              const sessionsUsed = chargeableServices.reduce(
                (s, sv) => s + (sv.sessionsUsed ?? 0),
                0,
              );
              return sum + Math.max(0, sessionsPaidFor - sessionsUsed);
            }
            return (
              sum +
              chargeableServices.reduce(
                (s2, s) => s2 + (s.sessionsRemaining ?? 0),
                0,
              )
            );
          }, 0);
        setTotalSessionsRemaining(totalRemaining);
      }

      // Build unified upcoming payments list
      const upcoming = [];
      const now = new Date();

      // Flexible — unpaid due amounts
      allEnr
        .filter(
          (e) =>
            e.package?.billingType === "flexible" &&
            e.package?.paymentStatus !== "paid" &&
            e.status !== "cancelled" &&
            e.package?.status !== "cancelled" &&
            !enrollmentsWithPlan.has(String(e._id)),
        )
        .forEach((e) => {
          const col = e.package.amountCollected ?? 0;
          const rem = Math.max(0, (e.package.totalPaid ?? 0) - col);
          const outstanding = rem;
          upcoming.push({
            type: "flexible",
            sortDate: e.package.dueDate
              ? new Date(e.package.dueDate)
              : new Date(8640000000000000),
            enrollmentId: String(e._id),
            packageName: e.package.packageName,
            amount: outstanding,
            dueDate: e.package.dueDate,
            isOverdue: e.package.dueDate && new Date(e.package.dueDate) < now,
          });
        });

      // One-time packages carrying a static leftover balance with no plan or
      // flexible schedule behind them (mainly migrated enrollments).
      allEnr
        .filter(
          (e) =>
            (!e.package?.billingType || e.package?.billingType === "one_time") &&
            e.status !== "cancelled" &&
            e.package?.status !== "cancelled" &&
            !enrollmentsWithPlan.has(String(e._id)),
        )
        .forEach((e) => {
          const schedulable =
            e.package.dueAmount != null
              ? Number(e.package.dueAmount)
              : Math.max(0, (e.package.totalPaid ?? 0) - (e.package.amountCollected ?? 0));
          if (schedulable <= 0) return;
          upcoming.push({
            type: "onetime",
            sortDate: new Date(8640000000000000),
            enrollmentId: String(e._id),
            packageName: e.package.packageName,
            amount: schedulable,
          });
        });

      // Payment plan — pending installments
      if (planResult.success) {
        const plans = planResult.data || [];
        const planForms = {};
        plans
          .filter(
            (p) =>
              ["active", "past_due"].includes(p.status) &&
              p.enrollmentID?.package?.status !== "cancelled",
          )
          .forEach((plan) => {
            (plan.installments || []).forEach((inst, idx) => {
              if (inst.status !== "pending") return;
              const dueDate = new Date(inst.dueDate);
              upcoming.push({
                type: "plan",
                sortDate: dueDate,
                planId: String(plan._id),
                installmentIdx: idx,
                plan,
                packageName:
                  plan.enrollmentID?.package?.packageName ??
                  purchaseNameById.get(
                    String(plan.purchaseID?._id ?? plan.purchaseID),
                  ) ??
                  "Package",
                amount: inst.amount,
                dueDate: inst.dueDate,
                installmentNumber: idx + 1,
                totalInstallments: plan.numberOfInstallments,
                isOverdue: dueDate < now,
              });
              planForms[`${plan._id}_${idx}`] = {
                method: "cash",
                saving: false,
                error: null,
              };
            });
          });
        setPlanPayForms(planForms);
      }

      // Pay per session — upcoming scheduled sessions
      calEvents
        .filter((e) => {
          const isUpcoming = new Date(e.startDateTime) >= now;
          // Due = a charge applies but no cash collected yet, and it isn't covered
          // by a prepaid method (package/credits/membership are already paid).
          const isDueSession =
            e.chargeApplied &&
            !e.payment?.collected &&
            !["package", "credits", "membership"].includes(e.chargeMethod);
          return isUpcoming && isDueSession;
        })
        .forEach((e) => {
          upcoming.push({
            type: "session",
            sortDate: new Date(e.startDateTime),
            eventId: String(e._id),
            title: e.title,
            serviceName: e.calendarServiceID?.serviceName,
            amount: e.calendarServiceID?.price ?? 0,
            startDateTime: e.startDateTime,
            isOverdue: false,
          });
        });

      upcoming.sort((a, b) => a.sortDate - b.sortDate);
      setUpcomingPayments(upcoming);
      setLoadingPayments(false);
    }
    load();
  }, [activeTab, customerId]);

  const loadSmsHistory = useCallback(
    async ({ silent = false } = {}) => {
      if (!customerId || !customer) return;
      if (!silent) setLoadingSmsHistory(true);
      setSmsLoadError(null);
      try {
        // A student's texts can sit on their lead thread, their customer thread, or both.
        let foundLeadId = null;
        if (customer.email || customer.phoneNumber) {
          const leadResult = await api
            .get(
              `/api/lead/find-by-contact?email=${encodeURIComponent(customer.email || "")}&phoneNumber=${encodeURIComponent(customer.phoneNumber || "")}`,
            )
            .catch(() => null);
          foundLeadId = leadResult?.success && leadResult.data?._id ? leadResult.data._id : null;
        }
        setLeadId(foundLeadId);
        const ids = [...new Set([foundLeadId, customerId].filter(Boolean).map(String))];
        const results = await Promise.all(
          ids.map((id) =>
            api.get(`/api/smsHistory/conversations/${id}?page=1&limit=200`).catch(() => null),
          ),
        );
        const byId = new Map();
        let anySuccess = false;
        const forbidden = results.some((r) => r?.status === 403);
        for (const r of results) {
          if (!r?.success) continue;
          anySuccess = true;
          for (const m of r.data?.messages || []) byId.set(String(m._id), m);
        }
        if (!anySuccess && ids.length) {
          setSmsLoadError(
            forbidden
              ? "You don't have permission to view message history."
              : "Couldn't load messages. Please try again.",
          );
        }
        if (anySuccess || !ids.length) setSmsHistory(
          [...byId.values()].sort(
            (x, y) => new Date(x.createdAt) - new Date(y.createdAt),
          ),
        );
      } catch (error) {
        console.error("Failed to load SMS history:", error);
        setSmsLoadError("Couldn't load messages. Please try again.");
      }
      setLoadingSmsHistory(false);
    },
    [customerId, customer],
  );

  useEffect(() => {
    if (activeTab !== "messages") return;
    loadSmsHistory();
  }, [activeTab, loadSmsHistory]);

  // Keep the thread scrolled to the newest message.
  useEffect(() => {
    if (activeTab !== "messages" || msgMode !== "sms") return;
    const el = smsThreadRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [smsHistory, activeTab, msgMode, loadingSmsHistory]);

  const loadEmailHistory = useCallback(
    async ({ silent = false } = {}) => {
      if (!customerId || !customer) return;
      if (!silent) setLoadingEmailHistory(true);
      setEmailLoadError(null);
      setEmailLoadForbidden(false);
      try {
        // Emails can be logged against the lead, the customer, or both.
        let foundLeadId = leadId;
        if (!foundLeadId && (customer.email || customer.phoneNumber)) {
          const leadResult = await api
            .get(
              `/api/lead/find-by-contact?email=${encodeURIComponent(customer.email || "")}&phoneNumber=${encodeURIComponent(customer.phoneNumber || "")}`,
            )
            .catch(() => null);
          foundLeadId = leadResult?.success && leadResult.data?._id ? leadResult.data._id : null;
          if (foundLeadId) setLeadId(foundLeadId);
        }
        const ids = [foundLeadId, customerId].filter(Boolean).map(String);
        const qs = new URLSearchParams({ limit: "200" });
        if (foundLeadId) qs.set("leadID", String(foundLeadId));
        if (customerId) qs.set("customerID", String(customerId));
        if (customer.email) qs.set("email", customer.email);
        const results = [
          await api.get(`/api/emailHistory/contact?${qs.toString()}`).catch(() => null),
        ];
        const byId = new Map();
        let anySuccess = false;
        const forbidden = results.some((r) => r?.status === 403);
        for (const r of results) {
          if (!r?.success) continue;
          anySuccess = true;
          const rows = Array.isArray(r.data) ? r.data : r.data?.emails || r.data?.data || [];
          for (const m of rows) byId.set(String(m._id), m);
        }
        if (!anySuccess && ids.length) {
          setEmailLoadForbidden(forbidden);
          setEmailLoadError(
            forbidden
              ? "You don't have permission to view email history."
              : "Couldn't load emails. Please try again.",
          );
        }
        if (anySuccess || !ids.length)
          setEmailHistory((prev) => {
            const server = [...byId.values()];
            // Keep optimistic rows until the server returns a matching subject.
            const pending = prev.filter(
              (p) =>
                String(p._id).startsWith("tmp-") &&
                !server.some((s) => s.subject === p.subject && s.to === p.to),
            );
            return [...server, ...pending].sort(
              (x, y) =>
                new Date(x.sentAt || x.createdAt) - new Date(y.sentAt || y.createdAt),
            );
          });
      } catch (error) {
        console.error("Failed to load email history:", error);
        setEmailLoadError("Couldn't load emails. Please try again.");
      }
      setLoadingEmailHistory(false);
    },
    [customerId, customer, leadId],
  );

  useEffect(() => {
    if (activeTab !== "messages" || msgMode !== "email") return;
    loadEmailHistory();
    // leadId is resolved inside; avoid refetch loop by keying on tab/mode/customer only.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTab, msgMode, customerId, customer]);

  useEffect(() => {
    if (activeTab !== "messages" || msgMode !== "email") return;
    const el = emailThreadRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [emailHistory, activeTab, msgMode, loadingEmailHistory]);

  // Plain-text preview of an email body: strip tags/styles and decode common entities.
  function emailPlainText(raw) {
    return String(raw || "")
      .replace(/<(style|script)[\s\S]*?<\/\1>/gi, "")
      .replace(/<br\s*\/?>|<\/(p|div|li|tr|h[1-6])>/gi, "\n")
      .replace(/<[^>]*>/g, "")
      .replace(/&nbsp;/g, " ")
      .replace(/&amp;/g, "&")
      .replace(/&lt;/g, "<")
      .replace(/&gt;/g, ">")
      .replace(/&quot;/g, '"')
      .replace(/&#39;/g, "'")
      .replace(/\n{3,}/g, "\n\n")
      .trim();
  }

  async function handleSendMessage() {
    if (isSendingMsg) return;
    try {
      await sendMessageInner();
    } catch (error) {
      console.error("Failed to send message:", error);
      setMsgError("Something went wrong sending. Please try again.");
    } finally {
      setIsSendingMsg(false);
    }
  }

  async function sendMessageInner() {
    setMsgError(null);
    setMsgSuccess(null);
    if (!customer) return;
    if (msgMode === "sms") {
      if (!smsText.trim()) {
        setMsgError("Message is required.");
        return;
      }
      if (!customer.phoneNumber) {
        setMsgError("This student has no phone number on file.");
        return;
      }
      setIsSendingMsg(true);
      const smsLocationIDs = Array.isArray(customer.locationID)
        ? customer.locationID.map((id) => String(id?._id ?? id)).filter(Boolean)
        : customer.locationID
          ? [String(customer.locationID?._id ?? customer.locationID)]
          : [];
      const body = smsText.trim();
      const result = await api.post(
        "/api/sms/send-one",
        {
          lead: {
            ...(leadId ? { _id: leadId } : {}),
            phoneNumber: customer.phoneNumber,
            email: customer.email,
            name: customer.name,
            ...(smsLocationIDs.length ? { locationID: smsLocationIDs } : {}),
          },
          message: body,
          scheduleNow: true,
        },
        smsLocationIDs[0]
          ? { headers: { "x-location-id": smsLocationIDs[0] } }
          : {},
      );
      if (result.success) {
        setSmsHistory((prev) => [
          ...prev,
          {
            _id: `tmp-${Date.now()}`,
            from: "you",
            to: customer.phoneNumber,
            message: body,
            status: "sent",
            createdAt: new Date().toISOString(),
          },
        ]);
        setSmsText("");
        loadSmsHistory({ silent: true });
      } else {
        setMsgError(result.error || result.message || "Failed to send SMS.");
      }
    } else {
      if (!emailSubject.trim() || !emailBody.trim()) {
        setMsgError("Subject and body are required.");
        return;
      }
      if (!customer.email) {
        setMsgError("This student has no email on file.");
        return;
      }
      setIsSendingMsg(true);
      const locationIDs = Array.isArray(customer.locationID)
        ? customer.locationID.map((id) => String(id?._id ?? id)).filter(Boolean)
        : customer.locationID
          ? [String(customer.locationID?._id ?? customer.locationID)]
          : [];
      const preferredLocationID = locationIDs[0] || null;
      const result = await api.post(
        "/api/email/send-one",
        {
          lead: {
            ...(leadId ? { _id: leadId } : {}),
            email: customer.email,
            name: customer.name,
            ...(locationIDs.length ? { locationID: locationIDs } : {}),
          },
          subject: emailSubject.trim(),
          body: emailBody.trim(),
          scheduleNow: true,
        },
        preferredLocationID
          ? { headers: { "x-location-id": preferredLocationID } }
          : {},
      );
      if (result.success) {
        setMsgSuccess(`Email sent to ${customer.email}.`);
        setEmailHistory((prev) => [
          ...prev,
          {
            _id: `tmp-${Date.now()}`,
            from: "you",
            to: customer.email,
            subject: emailSubject.trim(),
            body: emailBody.trim(),
            status: "queued",
            createdAt: new Date().toISOString(),
          },
        ]);
        setEmailSubject("");
        setEmailBody("");
        loadEmailHistory({ silent: true });
        setTimeout(() => loadEmailHistory({ silent: true }), 2500);
      } else
        setMsgError(
          result.status === 403
            ? "You don't have permission to send emails."
            : result.error || result.message || "Failed to send email.",
        );
    }
    setIsSendingMsg(false);
  }

  const todayStart = new Date();
  todayStart.setHours(0, 0, 0, 0);
  const privateAppts = appointments.filter(
    (a) => a.type === "private" || a.type === "trial",
  );
  const groupAppts = appointments.filter((a) => a.type === "lesson");
  // Past = already dated before today, or finished/cancelled/no-show whatever its date —
  // a lesson completed earlier today belongs under Past, not Upcoming.
  const isPastAppt = (a) =>
    new Date(a.startDateTime) < todayStart ||
    !["scheduled", "held"].includes(a.status);
  const inView = (list) =>
    list
      .filter((a) => (apptView === "past" ? isPastAppt(a) : !isPastAppt(a)))
      // Upcoming reads soonest-first; Past reads most-recent-first.
      .sort((a, b) =>
        apptView === "past"
          ? new Date(b.startDateTime) - new Date(a.startDateTime)
          : new Date(a.startDateTime) - new Date(b.startDateTime),
      );
  const visiblePrivate = inView(privateAppts);
  const visibleGroups = inView(groupAppts);
  const visibleAppts = showGroups ? visibleGroups : visiblePrivate;

  const sortedNotes = [...(customer?.notes || [])].sort((a, b) => {
    if (a.isPinned !== b.isPinned) return a.isPinned ? -1 : 1;
    return new Date(b.createdAt) - new Date(a.createdAt);
  });

  const locationID = (() => {
    const loc = customer?.locationID;
    if (!loc) return undefined;
    if (Array.isArray(loc)) return loc[0]?._id || loc[0] || undefined;
    return loc._id || loc;
  })();
  const { ready: cardProcessorReady } = useCardProcessor(locationID);

  const tabs = (
    <div
      className="grid shrink-0 grid-cols-6 border-b border-border px-2"
      role="tablist"
      aria-label="Mini account sections"
    >
      {TABS.map((tab) => (
        <button
          key={tab.key}
          type="button"
          role="tab"
          aria-selected={activeTab === tab.key}
          onClick={() => setActiveTab(tab.key)}
          className={[
            "border-b-2 px-0.5 pb-2.5 pt-3 text-[11px] tracking-tight transition-colors",
            activeTab === tab.key
              ? "border-primary font-semibold text-primary"
              : "border-transparent text-muted-foreground hover:text-foreground",
          ].join(" ")}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );

  const body = (
    <div className="flex-1 overflow-y-auto p-4">
      {loadingCustomer ? (
        <p className="text-center pt-10 text-[12px] text-muted-foreground animate-pulse">
          Loading…
        </p>
      ) : !customer ? (
        <p className="text-center pt-10 text-[12px] text-destructive">
          Failed to load student.
        </p>
      ) : (
        <>
          {/* ── APPOINTMENTS ── */}
          {activeTab === "appointments" && (
            <div className="space-y-3">
              <div className="flex gap-1.5">
                <button
                  type="button"
                  onClick={() => setApptView("upcoming")}
                  className={SEG_BTN(apptView === "upcoming")}
                >
                  Upcoming
                </button>
                <button
                  type="button"
                  onClick={() => setApptView("past")}
                  className={SEG_BTN(apptView === "past")}
                >
                  Past
                </button>
                <button
                  type="button"
                  onClick={() => setShowGroups((v) => !v)}
                  className={SEG_BTN(showGroups)}
                >
                  Groups
                </button>
              </div>

              {/* Lessons this student has booked with nothing paying for them.
                  Counted across the whole list, not just the current filter, so
                  it stays visible while browsing past appointments. */}
              {(() => {
                const unallocated = appointments.filter(
                  (a) =>
                    a.allocation?.status === "unallocated" &&
                    a.status === "scheduled",
                ).length;
                if (!unallocated) return null;
                return (
                  <div className="rounded-lg border border-warning/30 bg-warning/5 px-3 py-2">
                    <p className="text-[11px] font-semibold text-warning">
                      {unallocated} unallocated lesson
                      {unallocated === 1 ? "" : "s"}
                    </p>
                    <p className="text-[10px] text-warning/90 leading-relaxed mt-0.5">
                      Booked with no package behind them. The next eligible
                      package purchased claims them oldest-first.
                    </p>
                  </div>
                );
              })()}

              {loadingAppts ? (
                <p className="text-[12px] text-muted-foreground animate-pulse">
                  Loading…
                </p>
              ) : !visibleAppts.length ? (
                <p className="text-[12px] text-muted-foreground">
                  No appointments found.
                </p>
              ) : (
                visibleAppts
                  .map((appt) => (
                    <div
                      key={appt._id}
                      className="flex items-start gap-3 border-b border-border py-3.5 first:pt-0"
                    >
                      <div className="min-w-[48px] shrink-0 rounded-lg border border-border bg-muted/40 px-2.5 py-1.5 text-center text-[11px] text-muted-foreground">
                        {new Date(appt.startDateTime)
                          .toLocaleDateString("en-US", {
                            month: "short",
                            timeZone: studioTz || undefined,
                          })
                          .toUpperCase()}
                        <strong className="block text-[20px] font-semibold leading-tight text-foreground">
                          {new Date(appt.startDateTime).toLocaleDateString(
                            "en-US",
                            { day: "numeric", timeZone: studioTz || undefined },
                          )}
                        </strong>
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-[13px] font-semibold text-foreground">
                          {appt.title}
                        </p>
                        <p className="mt-0.5 text-[12px] text-foreground/80">
                          {formatStudioDate(appt.startDateTime, studioTz)}
                          {" · "}
                          {formatStudioTime(appt.startDateTime, studioTz)}
                        </p>
                        {appt.teacherID?.name && (
                          <p className="mt-0.5 text-[11px] text-muted-foreground">
                            {appt.teacherID.name}
                          </p>
                        )}
                      </div>
                      <div className="flex shrink-0 flex-col items-end gap-1">
                        {appt.allocation?.status === "unallocated" && (
                          <span className={PILL(true)}>Unallocated</span>
                        )}
                        <span
                          className={`rounded-[5px] px-2 py-1 text-[11px] font-medium capitalize ${statusColor(appt.status)}`}
                        >
                          {String(appt.status).replace(/_/g, " ")}
                        </span>
                      </div>
                    </div>
                  ))
              )}
            </div>
          )}

          {/* ── ENROLLMENTS ── */}
          {activeTab === "enrollments" && (
            <div className="space-y-3">
              <div className="mb-1 flex items-center justify-between gap-3">
                <h3 className="text-[14px] font-semibold text-foreground">
                  Active enrollments
                  <span className="ml-1 font-normal text-muted-foreground">
                    · {enrollments.filter((e) => e.package?.status !== "cancelled" && e.status === "active").length}
                  </span>
                </h3>
              <EnrollMenu
                label="New Enrollment"
                triggerClassName="h-auto rounded-lg px-3 py-1.5 text-[11px]"
                align="left"
                onSelectMode={(mode) => {
                  if (mode === "trial") {
                    if (!hasPermission("settings", "Billings", "write")) return;
                    setShowSellIntroSheet(true);
                    return;
                  }
                  setEnrollMode(mode);
                  setShowCreateEnrollmentSheet(true);
                }}
                onSelectEvent={() => setShowEventPurchaseDialog(true)}
              />
              </div>

              {loadingEnrollments ? (
                <p className="text-[12px] text-muted-foreground animate-pulse">
                  Loading…
                </p>
              ) : !enrollments.length ? (
                <p className="text-[12px] text-muted-foreground">
                  No enrollments yet.
                </p>
              ) : (
                (() => {
                  const visible = [...enrollments]
                    .filter((e) => e.package?.status !== "cancelled")
                    .sort(
                      (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
                    );
                  const openId =
                    expandedEnrId &&
                    visible.some((e) => String(e._id) === expandedEnrId)
                      ? expandedEnrId
                      : visible[0]
                        ? String(visible[0]._id)
                        : null;
                  return visible.map((enr) => {
                  const enrStatusCls =
                    enr.status === "active"
                      ? "bg-success/10 text-success"
                      : enr.status === "completed"
                        ? "bg-info/10 text-info"
                        : "bg-muted text-muted-foreground";
                  const cp = enr.package ?? null; // embedded package (or null)
                  const pkgStatusCls =
                    cp?.status === "active"
                      ? "bg-success/10 text-success"
                      : cp?.status === "exhausted"
                        ? "bg-warning/10 text-warning"
                        : cp?.status === "expired"
                          ? "bg-destructive/10 text-destructive"
                          : "bg-muted text-muted-foreground";
                  const isSellOpen = sellTargetEnrollmentId === String(enr._id);
                  const isExpanded = String(enr._id) === openId;

                  return (
                    <div
                      key={enr._id}
                      className="space-y-3"
                    >
                      {/* Enrollment header */}
                      <div
                        onClick={() =>
                          setExpandedEnrId(isExpanded ? null : String(enr._id))
                        }
                        className="flex items-center justify-between gap-2 cursor-pointer select-none"
                      >
                        <p className="text-[12px] font-semibold text-muted-foreground truncate">
                          {enr.label || `Enrollment #${enr.enrollmentNumber}`}
                        </p>
                        <div className="flex items-center gap-1.5 shrink-0">
                          <span
                            className={`rounded-[5px] px-2 py-1 text-[11px] font-medium capitalize ${enrStatusCls}`}
                          >
                            {enr.status}
                          </span>
                          <ChevronDown
                            className={`h-3.5 w-3.5 text-muted-foreground transition-transform ${isExpanded ? "rotate-180" : ""}`}
                          />
                        </div>
                      </div>
                      {isExpanded && (
                        <>
                      {enr.teacherID?.name && (
                        <p className="text-[10px] text-muted-foreground">
                          Teacher: {enr.teacherID.name}
                        </p>
                      )}
                      {enr.notes && (
                        <p className="text-[10px] text-muted-foreground italic">
                          {enr.notes}
                        </p>
                      )}

                      {/* Package section */}
                      {cp ? (
                        <div className={`${PANEL} space-y-3.5 px-4 py-4`}>
                          {/* Package header */}
                          <div className="flex items-start justify-between gap-2">
                            <div className="min-w-0">
                              <p className="text-[14px] font-semibold text-foreground truncate">
                                {cp.packageName ||
                                  cp.packageRef?.packageName ||
                                  "Package"}
                              </p>
                              <p className="mt-1 text-[11px] text-muted-foreground">
                                Available to {customerName}
                              </p>
                            </div>
                            <span
                              className={
                                cp.paymentStatus === "paid" || !cp.paymentStatus
                                  ? PILL(false) + (cp.status !== "active" ? " !bg-muted !text-muted-foreground" : "")
                                  : PILL(true)
                              }
                            >
                              {cp.status !== "active"
                                ? cp.status
                                : cp.paymentStatus === "partial"
                                  ? "Partially paid"
                                  : cp.paymentStatus === "unpaid"
                                    ? "Unpaid"
                                    : "Paid in full"}
                            </span>
                          </div>

                          {/* Lessons left, per service */}
                          {(() => {
                            const svcs = cp.services ?? [];
                            const total = Number(cp.totalPaid ?? 0);
                            const collected = Number(cp.amountCollected ?? 0);
                            const remainingBalance = Math.max(0, total - collected);
                            const showCoverage =
                              remainingBalance > 0.009 &&
                              cp.paymentStatus !== "paid";
                            const chargeable = svcs.filter(
                              (sv) =>
                                sv.isChargeable !== false &&
                                Number(sv.finalAmount || 0) > 0,
                            );
                            const chargeableSessions = chargeable.reduce(
                              (t, sv) =>
                                t + (sv.sessionsUsed ?? 0) + (sv.sessionsRemaining ?? 0),
                              0,
                            );
                            const perSession =
                              chargeableSessions > 0 && total > 0
                                ? total / chargeableSessions
                                : 0;
                            const paidSessions =
                              perSession > 0 ? Math.floor(collected / perSession + 1e-6) : 0;
                            let paidBudget = Math.max(
                              0,
                              paidSessions -
                                chargeable.reduce((t, sv) => t + (sv.sessionsUsed ?? 0), 0),
                            );
                            const unpaidTotal = showCoverage
                              ? chargeable.reduce(
                                  (t, sv) => t + (sv.sessionsRemaining ?? 0),
                                  0,
                                ) - paidBudget
                              : 0;
                            return (
                              <>
                                {svcs.length > 0 && (
                                  <div className="grid grid-cols-2 gap-3.5">
                                    {svcs.map((svc, i) => {
                                      const isCh = chargeable.includes(svc);
                                      const rem = svc.sessionsRemaining ?? 0;
                                      const paid = isCh && showCoverage ? Math.min(rem, paidBudget) : rem;
                                      if (isCh && showCoverage) paidBudget -= paid;
                                      const unpaid = rem - paid;
                                      return (
                                        <div key={i}>
                                          <strong className="block text-[28px] font-semibold leading-tight tracking-tight tabular-nums text-foreground">
                                            {rem}
                                          </strong>
                                          <span className="mt-1 block text-[12px] text-muted-foreground">
                                            {svc.serviceName} left
                                          </span>
                                          {isCh && showCoverage && (
                                            <p className="mt-2.5 flex flex-wrap gap-2 text-[12px]">
                                              {paid > 0 && (
                                                <span className="text-success">{paid} paid</span>
                                              )}
                                              {unpaid > 0 && (
                                                <span className="text-warning">{unpaid} unpaid</span>
                                              )}
                                            </p>
                                          )}
                                          <div className="mt-2 h-1 w-full overflow-hidden rounded-full bg-muted">
                                            <div
                                              className={`h-full rounded-full ${rem === 0 ? "bg-destructive" : "bg-primary"}`}
                                              style={{
                                                width: `${svc.sessionsTotal > 0 ? (rem / svc.sessionsTotal) * 100 : 0}%`,
                                              }}
                                            />
                                          </div>
                                        </div>
                                      );
                                    })}
                                  </div>
                                )}

                                {showCoverage ? (
                                  <div className="-mx-4 -mb-0 mt-1 border-t border-border bg-warning/10 px-4 py-3 text-warning">
                                    <p className="flex items-start gap-2 text-[12px] font-semibold">
                                      <AlertCircle className="mt-px h-[15px] w-[15px] shrink-0" />
                                      {unpaidTotal > 0
                                        ? `${unpaidTotal} lesson${unpaidTotal === 1 ? " is" : "s are"} not yet paid for`
                                        : "Balance remaining on this enrollment"}
                                    </p>
                                    <div className="mt-3 flex items-center justify-between gap-2 text-foreground">
                                      <div>
                                        <strong className="text-[13px] font-semibold">
                                          {money(remainingBalance)} remaining
                                        </strong>
                                        <p className="mt-1 text-[11px] text-muted-foreground">
                                          {money(collected)} paid of {money(total)}
                                        </p>
                                      </div>
                                      <button
                                        type="button"
                                        onClick={() => setActiveTab("payments")}
                                        className="rounded-md border border-border bg-card px-2.5 py-1.5 text-[11px] font-medium text-foreground hover:bg-muted/40"
                                      >
                                        View payments →
                                      </button>
                                    </div>
                                  </div>
                                ) : (
                                  svcs.length > 0 && (
                                    <div className="-mx-4 flex items-center justify-between gap-2 border-t border-border bg-muted/40 px-4 py-2.5 text-[11px] text-muted-foreground">
                                      <span>All remaining lessons are paid for</span>
                                      <CheckCircle2 className="h-4 w-4 text-success" />
                                    </div>
                                  )
                                )}

                                {/* Enrollment details (collapsed by default) */}
                                <details className="group">
                                  <summary className="flex cursor-pointer list-none items-center justify-between text-[12px] font-medium text-foreground">
                                    Enrollment details
                                    <ChevronDown className="h-3.5 w-3.5 text-muted-foreground transition-transform group-open:rotate-180" />
                                  </summary>
                                  <div className="mt-3 grid gap-2 text-[12px]">
                                    {svcs.map((svc, i) => (
                                      <div key={i} className="flex justify-between gap-4">
                                        <span className="text-muted-foreground">{svc.serviceName}</span>
                                        <span className="text-foreground">
                                          {svc.sessionsTotal} included · {svc.sessionsUsed ?? 0} used
                                          {Number(svc.pricePerSession) > 0 && (
                                            <span className="text-muted-foreground">
                                              {" "}· ${Number(svc.pricePerSession).toFixed(2)}/session
                                              {svc.discountType !== "none" && svc.discountAmount > 0 && (
                                                <span className="ml-1 text-success">
                                                  -{svc.discountType === "percentage" ? `${svc.discountAmount}%` : `$${svc.discountAmount}`}
                                                </span>
                                              )}
                                            </span>
                                          )}
                                        </span>
                                      </div>
                                    ))}
                                    {cp.totalPaid != null && (
                                      <div className="flex justify-between gap-4">
                                        <span className="text-muted-foreground">Enrollment total</span>
                                        <strong className="font-semibold text-foreground">{money(total)}</strong>
                                      </div>
                                    )}
                                    {cp.amountCollected != null && (
                                      <div className="flex justify-between gap-4">
                                        <span className="text-muted-foreground">Paid toward this enrollment</span>
                                        <strong className="font-semibold text-foreground">{money(collected)}</strong>
                                      </div>
                                    )}
                                    {remainingBalance > 0.009 && (
                                      <div className="flex justify-between gap-4">
                                        <span className="text-muted-foreground">Remaining balance</span>
                                        <strong className="font-semibold text-foreground">{money(remainingBalance)}</strong>
                                      </div>
                                    )}
                                    {cp.purchaseDate && (
                                      <div className="flex justify-between gap-4">
                                        <span className="text-muted-foreground">Purchased</span>
                                        <span className="text-foreground">{formatDate(cp.purchaseDate)}</span>
                                      </div>
                                    )}
                                    {cp.expiryDate && (
                                      <div className="flex justify-between gap-4">
                                        <span className="text-muted-foreground">Expires</span>
                                        <span className="text-foreground">{formatDate(cp.expiryDate)}</span>
                                      </div>
                                    )}
                                  </div>
                                </details>
                              </>
                            );
                          })()}

                          {cp.notes && (
                            <p className="text-[10px] text-muted-foreground italic border-t border-border pt-2">
                              {cp.notes}
                            </p>
                          )}
                        </div>
                      ) : enr.status === "active" ? (
                        <>
                          <button
                            type="button"
                            onClick={() => {
                              setSellTargetEnrollmentId(
                                isSellOpen ? null : String(enr._id),
                              );
                              setSellForm({
                                packageID: "",
                                purchaseDate: "",
                                notes: "",
                              });
                              setSellServices([]);
                              setSellError(null);
                            }}
                            className="flex items-center gap-1 text-[10px] font-semibold text-primary hover:underline"
                          >
                            <Plus className="h-3 w-3" /> Add Package
                          </button>

                          {isSellOpen && (
                            <div className="rounded-md border border-border bg-background p-2.5 space-y-2">
                              <select
                                value={sellForm.packageID}
                                onChange={(e) =>
                                  handlePkgSelect(e.target.value)
                                }
                                className="h-9 w-full appearance-none rounded-lg border border-border bg-muted/20 px-3 text-[11px] text-foreground outline-none focus:border-primary"
                              >
                                <option value="">Select package…</option>
                                {catalogPackages.map((p) => (
                                  <option key={p._id} value={p._id}>
                                    {p.packageName}
                                  </option>
                                ))}
                              </select>

                              {sellServices.length > 0 && (
                                <div className="rounded-lg border border-border bg-muted/10 overflow-hidden">
                                  <div className="grid grid-cols-[1fr_auto_auto_auto] text-[9px] font-semibold uppercase tracking-wide text-muted-foreground bg-muted/40 px-2 py-1.5">
                                    <span>Service</span>
                                    <span className="w-12 text-center">
                                      Sess.
                                    </span>
                                    <span className="w-14 text-center">
                                      Price
                                    </span>
                                    <span className="w-14 text-right">
                                      Total
                                    </span>
                                  </div>
                                  {sellServices.map((svc, i) => (
                                    <div
                                      key={i}
                                      className="grid grid-cols-[1fr_auto_auto_auto] items-center px-2 py-1.5 border-t border-border"
                                    >
                                      <p className="text-[10px] font-medium text-foreground truncate pr-1">
                                        {svc.serviceName}
                                      </p>
                                      <input
                                        type="number"
                                        min="0"
                                        value={svc.numberOfSessions}
                                        onChange={(e) =>
                                          updateSellSvc(
                                            i,
                                            "numberOfSessions",
                                            e.target.value,
                                          )
                                        }
                                        className="w-12 h-6 text-center rounded border border-border bg-muted/20 text-[10px] outline-none focus:border-primary"
                                      />
                                      <div className="relative w-14 ml-1">
                                        <span className="absolute left-1.5 top-1/2 -translate-y-1/2 text-[9px] text-muted-foreground">
                                          $
                                        </span>
                                        <input
                                          type="number"
                                          min="0"
                                          step="any"
                                          value={
                                            svc.isChargeable === false
                                              ? 0
                                              : svc.pricePerSession
                                          }
                                          disabled={svc.isChargeable === false}
                                          onChange={(e) =>
                                            updateSellSvc(
                                              i,
                                              "pricePerSession",
                                              e.target.value,
                                            )
                                          }
                                          className={`w-full h-6 pl-3.5 pr-1 rounded border text-[10px] outline-none ${svc.isChargeable === false ? "border-border bg-muted/40 text-muted-foreground cursor-not-allowed" : "border-border bg-muted/20 focus:border-primary"}`}
                                        />
                                      </div>
                                      <p className="w-14 text-right text-[10px] font-semibold text-foreground">
                                        ${Number(svc.finalAmount).toFixed(2)}
                                      </p>
                                    </div>
                                  ))}
                                  <div className="flex justify-between px-2 py-1 border-t border-border bg-muted/20">
                                    <span className="text-[9px] font-semibold text-muted-foreground uppercase">
                                      Total
                                    </span>
                                    <span className="text-[11px] font-bold text-foreground">
                                      $
                                      {sellServices
                                        .reduce(
                                          (s, x) =>
                                            s + (Number(x.finalAmount) || 0),
                                          0,
                                        )
                                        .toFixed(2)}
                                    </span>
                                  </div>
                                </div>
                              )}

                              <input
                                type="date"
                                value={sellForm.purchaseDate}
                                onChange={(e) =>
                                  setSellForm((f) => ({
                                    ...f,
                                    purchaseDate: e.target.value,
                                  }))
                                }
                                className="h-8 w-full rounded-lg border border-border bg-muted/20 px-3 text-[11px] text-foreground outline-none focus:border-primary"
                              />
                              {sellError && (
                                <p className="text-[10px] text-destructive">
                                  {sellError}
                                </p>
                              )}
                              <div className="flex gap-2">
                                <button
                                  type="button"
                                  onClick={() => {
                                    setSellTargetEnrollmentId(null);
                                    setSellError(null);
                                  }}
                                  className="flex-1 h-7 rounded-lg border border-border bg-background text-[10px] font-semibold text-foreground hover:bg-muted/40"
                                >
                                  Cancel
                                </button>
                                <button
                                  type="button"
                                  onClick={handleSellPackage}
                                  disabled={isSelling}
                                  className="flex-1 h-7 rounded-lg bg-brand text-[10px] font-semibold text-brand-foreground hover:bg-brand-dark disabled:opacity-60"
                                >
                                  {isSelling ? "Adding…" : "Confirm"}
                                </button>
                              </div>
                            </div>
                          )}
                        </>
                      ) : null}

                      <p className="text-[10px] text-muted-foreground">
                        {formatDate(enr.createdAt)}
                      </p>
                        </>
                      )}
                    </div>
                  );
                  });
                })()
              )}
            </div>
          )}

          {/* ── EVENTS & PRODUCTS (purchases) ── */}
          {activeTab === "purchases" && (
            <div className="space-y-3">
              <button
                type="button"
                onClick={() => setShowEventPurchaseDialog(true)}
                className="flex items-center gap-1.5 rounded-lg bg-brand px-3 py-1.5 text-[11px] font-semibold text-brand-foreground hover:bg-brand-dark"
              >
                <Plus className="h-3 w-3" />
                New Purchase
              </button>

              {loadingPurchases ? (
                <p className="text-[12px] text-muted-foreground animate-pulse">
                  Loading…
                </p>
              ) : !purchases.length ? (
                <p className="text-[12px] text-muted-foreground">
                  No events or products yet.
                </p>
              ) : (
                purchases.map((r) => {
                  const due = Number(r.amountDue ?? r.total ?? 0);
                  const lineItems = r.lineItems || [];
                  const plan = purchasePlans.find(
                    (pl) =>
                      String(pl.purchaseID?._id ?? pl.purchaseID) ===
                      String(r._id),
                  );
                  const hasPendingPlan = (plan?.installments || []).some(
                    (i) => i.status === "pending",
                  );
                  const done = lineItems.filter(
                    (li) => li.checkStatus === "checked",
                  ).length;
                  return (
                    <div
                      key={r._id}
                      ref={(el) => { purchaseRowRefs.current[r._id] = el; }}
                      className={`rounded-lg border px-3 py-2.5 space-y-2 transition-colors ${
                        String(r._id) === String(justCreatedPurchaseID)
                          ? "border-primary bg-primary/5 ring-2 ring-primary/20"
                          : "border-border bg-muted/30"
                      }`}
                    >
                      <div className="flex items-center justify-between gap-2">
                        <div className="min-w-0">
                          <p className="text-[12px] font-semibold text-foreground truncate">
                            {r.name}
                          </p>
                          {r.eventTypeID?.name && (
                            <p className="text-[10px] text-muted-foreground">
                              {r.eventTypeID.name}
                            </p>
                          )}
                        </div>
                        <span
                          className={`shrink-0 rounded-full px-1.5 py-0.5 text-[9px] font-bold uppercase ${purchaseStatusColor(r.billingStatus)}`}
                        >
                          {purchaseStatusLabel(r.billingStatus)}
                        </span>
                      </div>

                      <div className="grid grid-cols-3 gap-2">
                        {[
                          { label: "Total", value: money(r.total) },
                          {
                            label: "Paid",
                            value: money(r.amountPaid),
                            cls: "text-success",
                          },
                          {
                            label: "Due",
                            value: money(due),
                            cls: due > 0 ? "text-rose-500" : "text-muted-foreground",
                          },
                        ].map(({ label, value, cls }) => (
                          <div
                            key={label}
                            className="rounded bg-muted/40 px-2 py-1.5 text-center"
                          >
                            <p className="text-[9px] text-muted-foreground mb-0.5">
                              {label}
                            </p>
                            <p
                              className={`text-[11px] font-semibold ${cls ?? "text-foreground"}`}
                            >
                              {value}
                            </p>
                          </div>
                        ))}
                      </div>

                      {hasPendingPlan ? (
                        <button
                          type="button"
                          onClick={() => {
                            const idx = plan.installments.findIndex(
                              (i) => i.status === "pending",
                            );
                            setPayInstallTarget({
                              plan,
                              index: idx,
                              billingType: plan.billingType || r.billingType,
                            });
                          }}
                          className="rounded-md bg-success hover:bg-success text-white text-[10px] font-semibold px-2 py-1"
                        >
                          Pay Next Installment
                        </button>
                      ) : (
                        due > 0 && (
                          <PaymentDueCard
                            itemName={r.name}
                            badgeLabel="Payment Due"
                            amountDue={due}
                            customerID={customerId}
                            locationID={locationID}
                            paymentType="event_purchase"
                            paymentTarget={{ purchaseID: r._id }}
                            onSuccess={reloadPurchases}
                          />
                        )
                      )}

                      {lineItems.length > 0 && (
                        <div className="space-y-1 border-t border-border pt-2">
                          <p className="text-[9px] font-bold uppercase tracking-wide text-muted-foreground">
                            Line Items · {done}/{lineItems.length} checked
                          </p>
                          {lineItems.map((li) => (
                            <div
                              key={li._id}
                              className="flex items-center justify-between gap-2"
                            >
                              <div className="min-w-0">
                                <p className="text-[11px] text-foreground truncate">
                                  {li.name}{" "}
                                  <span className="text-muted-foreground">
                                    × {li.quantity}
                                  </span>
                                </p>
                              </div>
                              <div className="flex items-center gap-1.5 shrink-0">
                                <span className="text-[10px] font-semibold text-foreground">
                                  {money(li.total)}
                                </span>
                                {li.checkStatus === "checked" ? (
                                  <span className="rounded-full bg-success/10 px-1.5 py-0.5 text-[9px] font-medium text-success">
                                    ✓
                                  </span>
                                ) : (
                                  <button
                                    type="button"
                                    disabled={busyLineId === li._id}
                                    onClick={() => toggleLineCheck(r, li)}
                                    className="rounded border border-border px-1.5 py-0.5 text-[9px] font-medium hover:bg-muted/60"
                                  >
                                    {busyLineId === li._id ? "…" : "Check"}
                                  </button>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      )}

                      {r.notes && (
                        <p className="text-[10px] text-muted-foreground italic border-t border-border pt-2">
                          {r.notes}
                        </p>
                      )}
                    </div>
                  );
                })
              )}
            </div>
          )}

          {/* ── MESSAGES ── */}
          {activeTab === "messages" && (
            <div className="space-y-3">
              {/* SMS / Email toggle */}
              <div className="flex gap-1.5">
                <button
                  type="button"
                  onClick={() => {
                    setMsgMode("sms");
                    setMsgError(null);
                    setMsgSuccess(null);
                  }}
                  className={SEG_BTN(msgMode === "sms")}
                >
                  SMS
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setMsgMode("email");
                    setMsgError(null);
                    setMsgSuccess(null);
                  }}
                  className={SEG_BTN(msgMode === "email")}
                >
                  Email
                </button>
              </div>

              {msgMode === "sms" ? (
                <div className="space-y-2">
                  {/* Conversation thread */}
                  <div
                    ref={smsThreadRef}
                    role="log"
                    aria-label="Text message conversation"
                    aria-live="polite"
                    className="h-72 overflow-y-auto flex flex-col gap-1.5 rounded-xl border border-border bg-muted/30 p-3"
                  >
                    {loadingSmsHistory && smsHistory.length === 0 ? (
                      <div className="flex flex-col gap-2 animate-pulse">
                        <div className="h-7 w-2/3 rounded-xl bg-muted" />
                        <div className="h-7 w-1/2 self-end rounded-xl bg-muted" />
                        <div className="h-7 w-3/5 rounded-xl bg-muted" />
                      </div>
                    ) : smsLoadError && smsHistory.length === 0 ? (
                      <div className="m-auto text-center space-y-2">
                        <p className="text-[11px] text-destructive">{smsLoadError}</p>
                        <button
                          type="button"
                          onClick={() => loadSmsHistory()}
                          className="h-7 rounded-lg border border-border px-3 text-[11px] font-medium hover:bg-muted/60"
                        >
                          Retry
                        </button>
                      </div>
                    ) : smsHistory.length === 0 ? (
                      <div className="m-auto text-center">
                        <p className="text-[12px] font-medium text-foreground">
                          No messages yet
                        </p>
                        <p className="text-[10px] text-muted-foreground mt-0.5">
                          Say hello to {customer?.name?.split(" ")[0] || "your student"} below.
                        </p>
                      </div>
                    ) : (
                      smsHistory.map((msg, i) => {
                        const isInbound = msg.status === "received";
                        const prev = smsHistory[i - 1];
                        const dayKey = (d) => new Date(d).toDateString();
                        const newDay =
                          !prev || dayKey(prev.createdAt) !== dayKey(msg.createdAt);
                        const failed =
                          msg.status === "failed" || msg.status === "undelivered";
                        return (
                          <div key={msg._id} className="flex flex-col gap-1.5">
                            {newDay && (
                              <div className="flex items-center gap-2 py-1">
                                <div className="h-px flex-1 bg-border" />
                                <span className="text-[9px] font-medium uppercase tracking-wide text-muted-foreground">
                                  {new Date(msg.createdAt).toLocaleDateString(undefined, {
                                    weekday: "short",
                                    month: "short",
                                    day: "numeric",
                                  })}
                                </span>
                                <div className="h-px flex-1 bg-border" />
                              </div>
                            )}
                            <div
                              className={`flex flex-col ${isInbound ? "items-start" : "items-end"}`}
                            >
                              <div
                                title={formatStudioTime(msg.createdAt)}
                                className={`max-w-[85%] whitespace-pre-wrap break-words px-3 py-1.5 text-[12px] leading-snug shadow-sm ${
                                  isInbound
                                    ? "rounded-2xl rounded-bl-sm bg-card border border-border text-foreground"
                                    : failed
                                      ? "rounded-2xl rounded-br-sm bg-destructive/10 border border-destructive/40 text-destructive"
                                      : "rounded-2xl rounded-br-sm bg-brand text-brand-foreground"
                                }`}
                              >
                                {msg.message}
                              </div>
                              <span className="text-[9px] text-muted-foreground mt-0.5 px-1">
                                {formatStudioTime(msg.createdAt)}
                                {!isInbound && msg.status && msg.status !== "sent"
                                  ? ` · ${msg.status}`
                                  : ""}
                              </span>
                            </div>
                          </div>
                        );
                      })
                    )}
                  </div>
                  {/* Composer */}
                  <div className="flex items-center justify-between text-[10px] text-muted-foreground">
                    <span>
                      To:{" "}
                      {customer?.phoneNumber || (
                        <span className="text-destructive">No phone number on file</span>
                      )}
                    </span>
                    <span>
                      {smsText.length} chars
                      {smsText.length > 160
                        ? ` · ${Math.ceil(smsText.length / 153)} segments`
                        : ""}
                    </span>
                  </div>
                  <textarea
                    rows={3}
                    aria-label="Text message"
                    value={smsText}
                    disabled={!customer?.phoneNumber}
                    onChange={(e) => setSmsText(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault();
                        if (!isSendingMsg) handleSendMessage();
                      }
                    }}
                    placeholder="Type your message… (Enter to send, Shift+Enter for new line)"
                    className="w-full resize-none rounded-xl border border-border bg-background px-3 py-2 text-[12px] text-foreground outline-none focus:border-primary disabled:opacity-60"
                  />
                </div>
              ) : (
                <div className="space-y-2">
                  <div
                    ref={emailThreadRef}
                    role="log"
                    aria-label="Email conversation"
                    aria-live="polite"
                    className="h-72 overflow-y-auto flex flex-col gap-2 rounded-xl border border-border bg-muted/30 p-3"
                  >
                    {loadingEmailHistory && emailHistory.length === 0 ? (
                      <div className="flex flex-col gap-2 animate-pulse">
                        <div className="h-14 w-4/5 rounded-xl bg-muted" />
                        <div className="h-14 w-3/4 self-end rounded-xl bg-muted" />
                      </div>
                    ) : emailLoadError && emailHistory.length === 0 ? (
                      <div className="m-auto text-center space-y-2">
                        <p className="text-[11px] text-destructive">{emailLoadError}</p>
                        {!emailLoadForbidden && (
                          <button
                            type="button"
                            onClick={() => loadEmailHistory()}
                            className="h-7 rounded-lg border border-border px-3 text-[11px] font-medium hover:bg-muted/60"
                          >
                            Retry
                          </button>
                        )}
                      </div>
                    ) : emailHistory.length === 0 ? (
                      <div className="m-auto text-center">
                        <p className="text-[12px] font-medium text-foreground">
                          No emails yet
                        </p>
                        <p className="text-[10px] text-muted-foreground mt-0.5">
                          Emails sent to {customer?.name?.split(" ")[0] || "your student"} will appear here.
                        </p>
                      </div>
                    ) : (
                      <>
                        {emailLoadError && (
                          <p className="text-[10px] text-destructive">
                            {emailLoadError} Showing earlier results.
                          </p>
                        )}
                        {emailHistory.map((em) => {
                          const when = em.sentAt || em.createdAt;
                          const isInbound =
                            em.direction === "inbound" ||
                            (customer?.email &&
                              String(em.from || "").toLowerCase().includes(
                                String(customer.email).toLowerCase(),
                              ));
                          const text = emailPlainText(em.body);
                          const open = !!expandedEmails[em._id];
                          const long = text.length > 160 || text.split("\n").length > 3;
                          const failed = ["failed", "bounce", "bounced", "dropped"].includes(
                            String(em.status || "").toLowerCase(),
                          );
                          return (
                            <div
                              key={em._id}
                              className={`flex flex-col ${isInbound ? "items-start" : "items-end"}`}
                            >
                              <div
                                className={`max-w-[92%] rounded-xl border px-3 py-2 text-[11px] shadow-sm ${
                                  failed
                                    ? "border-destructive/40 bg-destructive/10"
                                    : isInbound
                                      ? "border-border bg-card"
                                      : "border-border bg-background"
                                }`}
                              >
                                <p className="font-semibold text-foreground break-words">
                                  {em.subject || "(no subject)"}
                                </p>
                                <p
                                  className={`mt-0.5 whitespace-pre-wrap break-words text-muted-foreground ${
                                    open ? "" : "line-clamp-3"
                                  }`}
                                >
                                  {text || "(empty message)"}
                                </p>
                                {long && (
                                  <button
                                    type="button"
                                    onClick={() =>
                                      setExpandedEmails((p) => ({ ...p, [em._id]: !p[em._id] }))
                                    }
                                    className="mt-1 text-[10px] font-medium text-primary hover:underline"
                                  >
                                    {open ? "Show less" : "Show more"}
                                  </button>
                                )}
                              </div>
                              <span className="text-[9px] text-muted-foreground mt-0.5 px-1">
                                {isInbound ? "Received" : "Sent"} · {formatStudioTime(when)}
                                {em.status && em.status !== "sent" ? ` · ${em.status}` : ""}
                              </span>
                            </div>
                          );
                        })}
                      </>
                    )}
                  </div>
                  <p className="text-[10px] text-muted-foreground">
                    To:{" "}
                    {customer?.email || (
                      <span className="text-destructive">No email on file — add one to send</span>
                    )}
                  </p>
                  <input
                    type="text"
                    aria-label="Email subject"
                    value={emailSubject}
                    disabled={!customer?.email}
                    onChange={(e) => setEmailSubject(e.target.value)}
                    placeholder="Subject"
                    className="h-9 w-full rounded-lg border border-border bg-background px-3 text-[12px] text-foreground outline-none focus:border-primary disabled:opacity-60"
                  />
                  <textarea
                    rows={4}
                    aria-label="Email body"
                    value={emailBody}
                    disabled={!customer?.email}
                    onChange={(e) => {
                      setEmailBody(e.target.value);
                      e.target.style.height = "auto";
                      e.target.style.height = `${Math.min(e.target.scrollHeight, 220)}px`;
                    }}
                    placeholder="Message body…"
                    className="w-full resize-none overflow-y-auto rounded-lg border border-border bg-background px-3 py-2 text-[12px] text-foreground outline-none focus:border-primary disabled:opacity-60"
                  />
                </div>
              )}

              {msgError && (
                <p className="text-[11px] text-destructive">{msgError}</p>
              )}
              {msgSuccess && (
                <p className="text-[11px] text-success">{msgSuccess}</p>
              )}

              <button
                type="button"
                onClick={handleSendMessage}
                disabled={
                  isSendingMsg ||
                  (msgMode === "email" && !customer?.email) ||
                  (msgMode === "sms" && !customer?.phoneNumber)
                }
                title={
                  msgMode === "email" && !customer?.email
                    ? "No email on file"
                    : msgMode === "sms" && !customer?.phoneNumber
                      ? "No phone number on file"
                      : undefined
                }
                className="w-full h-9 rounded-lg bg-brand text-[12px] font-semibold text-brand-foreground hover:bg-brand-dark disabled:opacity-60"
              >
                {isSendingMsg
                  ? "Sending…"
                  : `Send ${msgMode === "sms" ? "SMS" : "Email"}`}
              </button>
            </div>
          )}

          {/* ── PAYMENTS ── */}
          {activeTab === "payments" && (
            <div className="space-y-3">
              {/* Summary row */}
              <div className="grid grid-cols-3 gap-2">
                <div className="rounded-[10px] border border-border bg-card px-3 py-2.5">
                  <p className="text-[11px] text-muted-foreground mb-0.5 leading-tight">
                    Auto Charged
                  </p>
                  <p className="text-[20px] font-semibold tracking-tight tabular-nums text-violet-500">
                    $
                    {serviceCharges
                      .reduce(
                        (sum, e) =>
                          sum +
                          (e.charges ?? [])
                            .filter(
                              (c) =>
                                String(c.customerID) === String(customerId),
                            )
                            .reduce((s, c) => s + (c.amount ?? 0), 0),
                        0,
                      )
                      .toFixed(2)}
                  </p>
                </div>
                <div className="rounded-[10px] border border-border bg-card px-3 py-2.5">
                  <p className="text-[11px] text-muted-foreground mb-0.5 leading-tight">
                    Collected
                  </p>
                  <p className="text-[20px] font-semibold tracking-tight tabular-nums text-success">
                    $
                    {collectedPayments
                      .reduce((sum, p) => sum + Number(p.amount ?? 0), 0)
                      .toFixed(2)}
                  </p>
                </div>
                <div className="rounded-[10px] border border-border bg-card px-3 py-2.5">
                  <p className="text-[11px] text-muted-foreground mb-0.5 leading-tight">
                    Credit Balance
                  </p>
                  <p className="text-[20px] font-semibold tracking-tight tabular-nums text-success">
                    {totalSessionsRemaining != null
                      ? Number.isInteger(totalSessionsRemaining)
                        ? totalSessionsRemaining
                        : totalSessionsRemaining
                            .toFixed(2)
                            .replace(/\.?0+$/, "")
                      : "—"}
                  </p>
                </div>
              </div>

              {/* Payment view filter */}
              <div className="flex flex-wrap gap-1.5" role="group" aria-label="Payment view">
                {[
                  ["due", "Payments due"],
                  ["auto", "Auto-charged"],
                  ["collected", "Payment history"],
                ].map(([k, label]) => (
                  <button
                    key={k}
                    type="button"
                    aria-pressed={paymentView === k}
                    onClick={() => setPaymentView(k)}
                    className={SEG_BTN(paymentView === k)}
                  >
                    {label}
                  </button>
                ))}
              </div>

              {/* Upcoming payments — flexible, payment plan, pay-per-session */}
              {paymentView === "due" &&
                !loadingPayments &&
                upcomingPayments.length > 0 && (
                  <div className="space-y-2">
                    <p className="text-[9px] font-bold uppercase tracking-wider text-muted-foreground/60">
                      Upcoming Payments
                    </p>
                    {upcomingPayments.map((item) => {
                      if (item.type === "onetime") {
                        return (
                          <PaymentDueCard
                            key={`onetime-${item.enrollmentId}`}
                            itemName={item.packageName}
                            badgeLabel="One-time"
                            amountDue={item.amount}
                            customerID={customerId}
                            locationID={locationID}
                            paymentType="package_purchase"
                            paymentTarget={{ enrollmentID: item.enrollmentId }}
                            sendLinkTarget={{
                              kind: "package",
                              enrollmentID: item.enrollmentId,
                            }}
                            onSuccess={refreshPaymentsData}
                          />
                        );
                      }

                      if (item.type === "flexible") {
                        return (
                          <PaymentDueCard
                            key={`flex-${item.enrollmentId}`}
                            itemName={item.packageName}
                            amountDue={item.amount}
                            dueDate={item.dueDate}
                            onChangeDueDate={(newDueDate) =>
                              api.patch(
                                `/api/customer-package/${item.enrollmentId}/flexible-due`,
                                { dueDate: newDueDate },
                              )
                            }
                            customerID={customerId}
                            locationID={locationID}
                            paymentType="package_purchase"
                            paymentTarget={{ enrollmentID: item.enrollmentId }}
                            sendLinkTarget={{
                              kind: "package",
                              enrollmentID: item.enrollmentId,
                            }}
                            onSuccess={refreshPaymentsData}
                          />
                        );
                      }

                      if (item.type === "plan") {
                        const fkey = `${item.planId}_${item.installmentIdx}`;
                        const pf = planPayForms[fkey] ?? {
                          saving: false,
                          error: null,
                        };
                        const updatePlan = (patch) =>
                          setPlanPayForms((prev) => ({
                            ...prev,
                            [fkey]: { ...prev[fkey], ...patch },
                          }));
                        return (
                          <div
                            key={fkey}
                            className={`rounded-lg border ${item.isOverdue ? "border-rose-300 bg-rose-50/30 dark:bg-rose-900/10" : "border-border bg-muted/20"} px-3 py-2.5 space-y-2`}
                          >
                            <div className="flex items-start justify-between gap-1.5">
                              <div className="min-w-0">
                                <div className="flex items-center gap-1.5 flex-wrap">
                                  <p className="text-[12px] font-semibold text-foreground truncate">
                                    {item.packageName}
                                  </p>
                                  <span className="text-[9px] bg-violet-500/10 text-violet-600 rounded-full px-1.5 py-0.5 font-medium">
                                    {billingTypeLabel(
                                      item.plan?.enrollmentID?.package
                                        ?.billingType ?? item.plan?.billingType,
                                    )}
                                  </span>
                                  <span className="text-[9px] bg-info/10 text-info rounded-full px-1.5 py-0.5 font-medium">
                                    Payment {item.installmentNumber}/
                                    {item.totalInstallments}
                                  </span>
                                  {item.isOverdue && (
                                    <span className="text-[9px] font-bold text-rose-600 bg-rose-500/10 rounded-full px-1.5 py-0.5">
                                      Overdue
                                    </span>
                                  )}
                                </div>
                                <div className="flex items-center gap-3 mt-0.5">
                                  <span className="text-[11px] font-bold text-foreground">
                                    ${Number(item.amount).toFixed(2)}
                                  </span>
                                  <span
                                    className={`text-[10px] ${item.isOverdue ? "text-rose-500" : "text-muted-foreground"}`}
                                  >
                                    {formatDate(item.dueDate)}
                                  </span>
                                </div>
                              </div>
                              {pf.mode !== "change-date" && (
                                <div className="flex flex-col gap-1 shrink-0">
                                  <button
                                    type="button"
                                    onClick={() =>
                                      setPayInstallTarget({
                                        plan: item.plan,
                                        index: item.installmentIdx,
                                        billingType:
                                          item.plan?.enrollmentID?.package
                                            ?.billingType,
                                      })
                                    }
                                    className="rounded-md bg-success hover:bg-success text-white text-[10px] font-semibold px-2 py-1"
                                  >
                                    Pay Now
                                  </button>
                                  {cardProcessorReady && customerId && (
                                    <SendPaymentLinkMenu
                                      customerID={customerId}
                                      target={{
                                        kind: "installment",
                                        paymentPlanID: item.plan?._id,
                                        installmentIndex: item.installmentIdx,
                                      }}
                                      onSent={onPaymentSuccess}
                                    />
                                  )}
                                  <button
                                    type="button"
                                    onClick={() =>
                                      updatePlan({
                                        mode: "change-date",
                                        changeDate: item.dueDate
                                          ? new Date(item.dueDate)
                                              .toISOString()
                                              .slice(0, 10)
                                          : "",
                                      })
                                    }
                                    className="rounded-md border border-border bg-background hover:bg-muted text-[10px] font-medium px-2 py-1 text-foreground"
                                  >
                                    Change Date
                                  </button>
                                </div>
                              )}
                            </div>
                            {pf.error && (
                              <p className="text-[10px] text-rose-500">
                                {pf.error}
                              </p>
                            )}
                            {pf.mode === "change-date" && (
                              <form
                                onSubmit={async (e) => {
                                  e.preventDefault();
                                  if (!pf.changeDate) return;
                                  updatePlan({ saving: true, error: null });
                                  try {
                                    const res = await api.patch(
                                      `/api/payment-plan/${item.planId}/installment/${item.installmentIdx}/due-date`,
                                      { dueDate: pf.changeDate },
                                    );
                                    if (res.success) {
                                      await refreshPaymentsData();
                                    } else {
                                      updatePlan({
                                        saving: false,
                                        error: res.error || "Failed to update.",
                                      });
                                    }
                                  } catch (err) {
                                    updatePlan({
                                      saving: false,
                                      error: "Something went wrong.",
                                    });
                                  }
                                }}
                                className="space-y-1.5 pt-1.5 border-t border-border/40"
                              >
                                <label className="block text-[10px] text-muted-foreground mb-0.5">Due Date</label>
                                <input
                                  type="date"
                                  value={pf.changeDate ?? ""}
                                  onChange={(e) =>
                                    updatePlan({ changeDate: e.target.value })
                                  }
                                  className="h-7 w-full rounded-md border border-border bg-background px-2.5 text-[11px] outline-none focus:border-primary"
                                />
                                <div className="flex gap-1.5">
                                  <button
                                    type="button"
                                    onClick={() => updatePlan({ mode: null })}
                                    className="flex-1 h-7 rounded-md border border-border bg-background text-[10px] text-muted-foreground hover:bg-muted"
                                  >
                                    Cancel
                                  </button>
                                  <button
                                    type="submit"
                                    disabled={pf.saving || !pf.changeDate}
                                    className="flex-1 h-7 rounded-md bg-brand hover:opacity-90 text-white text-[10px] font-semibold disabled:opacity-50"
                                  >
                                    {pf.saving ? "Saving…" : "Update"}
                                  </button>
                                </div>
                              </form>
                            )}
                            {/* Add Payment — flexible plans only, shown on last installment */}
                            {item.plan?.enrollmentID?.package?.billingType === "flexible" &&
                              item.installmentNumber === item.totalInstallments &&
                              pf.mode !== "change-date" && (() => {
                                const af = addInstallForms[item.planId] ?? { open: false, dueDate: "", amount: "", saving: false, error: null };
                                const updateAdd = (patch) => setAddInstallForms((prev) => ({ ...prev, [item.planId]: { ...prev[item.planId], ...patch } }));
                                return af.open ? (
                                  <form
                                    onSubmit={async (e) => {
                                      e.preventDefault();
                                      if (!af.dueDate || !af.amount) return;
                                      updateAdd({ saving: true, error: null });
                                      const res = await api.post(`/api/payment-plan/${item.planId}/installment`, { dueDate: af.dueDate, amount: Number(af.amount) });
                                      if (res.success) {
                                        updateAdd({ open: false, dueDate: "", amount: "", saving: false });
                                        await refreshPaymentsData();
                                      } else {
                                        updateAdd({ saving: false, error: res.error || "Failed to add payment." });
                                      }
                                    }}
                                    className="space-y-1.5 pt-1.5 border-t border-border/40"
                                  >
                                    <label className="block text-[10px] text-muted-foreground mb-0.5">Due Date</label>
                                    <input type="date" value={af.dueDate} onChange={(e) => updateAdd({ dueDate: e.target.value })} className="h-7 w-full rounded-md border border-border bg-background px-2.5 text-[11px] outline-none focus:border-primary" />
                                    <label className="block text-[10px] text-muted-foreground mb-0.5 mt-1">Amount ($)</label>
                                    <input type="number" min="0.01" step="any" value={af.amount} onChange={(e) => updateAdd({ amount: e.target.value })} className="h-7 w-full rounded-md border border-border bg-background px-2.5 text-[11px] outline-none focus:border-primary" />
                                    {af.error && <p className="text-[10px] text-rose-500">{af.error}</p>}
                                    <div className="flex gap-1.5">
                                      <button type="button" onClick={() => updateAdd({ open: false })} className="flex-1 h-7 rounded-md border border-border bg-background text-[10px] text-muted-foreground hover:bg-muted">Cancel</button>
                                      <button type="submit" disabled={af.saving || !af.dueDate || !af.amount} className="flex-1 h-7 rounded-md bg-brand hover:opacity-90 text-white text-[10px] font-semibold disabled:opacity-50">{af.saving ? "Saving…" : "Add"}</button>
                                    </div>
                                  </form>
                                ) : (
                                  <button type="button" onClick={() => updateAdd({ open: true, dueDate: "", amount: "" })} className="w-full h-7 rounded-md border border-dashed border-border text-[10px] text-muted-foreground hover:text-foreground hover:border-foreground transition-colors mt-1">
                                    + Add Payment
                                  </button>
                                );
                              })()}
                          </div>
                        );
                      }

                      if (item.type === "session") {
                        return (
                          <div
                            key={`session-${item.eventId}`}
                            className="rounded-lg border border-border bg-muted/20 px-3 py-2.5"
                          >
                            <div className="flex items-start justify-between gap-1.5">
                              <div className="min-w-0">
                                <div className="flex items-center gap-1.5 flex-wrap">
                                  <p className="text-[12px] font-semibold text-foreground truncate">
                                    {item.title ||
                                      item.serviceName ||
                                      "Session"}
                                  </p>
                                  <span className="text-[9px] bg-success/10 text-success rounded-full px-1.5 py-0.5 font-medium">
                                    Upcoming
                                  </span>
                                </div>
                                <div className="flex items-center gap-3 mt-0.5">
                                  {item.amount > 0 && (
                                    <span className="text-[11px] font-bold text-foreground">
                                      ${Number(item.amount).toFixed(2)}
                                    </span>
                                  )}
                                  <span className="text-[10px] text-muted-foreground">
                                    {formatStudioDate(
                                      item.startDateTime,
                                      studioTz,
                                    )}{" "}
                                    ·{" "}
                                    {formatStudioTime(
                                      item.startDateTime,
                                      studioTz,
                                    )}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      }

                      return null;
                    })}
                  </div>
                )}

              {/* Add Payment button for flexible plans with no pending installments */}
              {paymentView === "due" && !loadingPayments && flexiblePlans.filter(
                (p) => !upcomingPayments.some((item) => item.type === "plan" && item.planId === String(p._id))
              ).map((plan) => {
                const af = addInstallForms[String(plan._id)] ?? { open: false, dueDate: "", amount: "", saving: false, error: null };
                const updateAdd = (patch) => setAddInstallForms((prev) => ({ ...prev, [String(plan._id)]: { ...prev[String(plan._id)], ...patch } }));
                return (
                  <div key={String(plan._id)} className="rounded-lg border border-dashed border-border bg-muted/10 px-3 py-2.5">
                    <p className="text-[11px] font-semibold text-foreground mb-1.5">
                      {plan.enrollmentID?.package?.packageName ??
                        purchaseNamesById.get(
                          String(plan.purchaseID?._id ?? plan.purchaseID),
                        ) ??
                        "Package"}{" "}
                      · Flexible
                    </p>
                    {af.open ? (
                      <form onSubmit={async (e) => {
                        e.preventDefault();
                        if (!af.dueDate || !af.amount) return;
                        updateAdd({ saving: true, error: null });
                        const res = await api.post(`/api/payment-plan/${plan._id}/installment`, { dueDate: af.dueDate, amount: Number(af.amount) });
                        if (res.success) {
                          updateAdd({ open: false, dueDate: "", amount: "", saving: false });
                          await refreshPaymentsData();
                        } else {
                          updateAdd({ saving: false, error: res.error || "Failed to add payment." });
                        }
                      }} className="space-y-1.5">
                        <label className="block text-[10px] text-muted-foreground mb-0.5">Due Date</label>
                        <input type="date" value={af.dueDate} onChange={(e) => updateAdd({ dueDate: e.target.value })} className="h-7 w-full rounded-md border border-border bg-background px-2.5 text-[11px] outline-none focus:border-primary" />
                        <label className="block text-[10px] text-muted-foreground mb-0.5 mt-1">Amount ($)</label>
                        <input type="number" min="0.01" step="any" value={af.amount} onChange={(e) => updateAdd({ amount: e.target.value })} className="h-7 w-full rounded-md border border-border bg-background px-2.5 text-[11px] outline-none focus:border-primary" />
                        {af.error && <p className="text-[10px] text-rose-500">{af.error}</p>}
                        <div className="flex gap-1.5 mt-1.5">
                          <button type="button" onClick={() => updateAdd({ open: false })} className="flex-1 h-7 rounded-md border border-border bg-background text-[10px] text-muted-foreground hover:bg-muted">Cancel</button>
                          <button type="submit" disabled={af.saving || !af.dueDate || !af.amount} className="flex-1 h-7 rounded-md bg-brand hover:opacity-90 text-white text-[10px] font-semibold disabled:opacity-50">{af.saving ? "Saving…" : "Add"}</button>
                        </div>
                      </form>
                    ) : (
                      <button type="button" onClick={() => updateAdd({ open: true, dueDate: "", amount: "" })} className="w-full h-7 rounded-md border border-dashed border-border text-[10px] text-muted-foreground hover:text-foreground hover:border-foreground transition-colors">
                        + Add Payment
                      </button>
                    )}
                  </div>
                );
              })}

              {loadingPayments ? (
                <p className="text-[12px] text-muted-foreground animate-pulse">
                  Loading…
                </p>
              ) : (
                <>
                  {/* Service charges section */}
                  {paymentView === "auto" && serviceCharges.length > 0 && (
                    <div className="space-y-1.5">
                      <p className="text-[9px] font-bold uppercase tracking-wider text-muted-foreground/60">
                        Autopay charges
                      </p>
                      {serviceCharges.map((evt) => {
                        const METHOD_LABEL = {
                          package: {
                            text: "Package",
                            cls: "bg-violet-500/10 text-violet-600",
                          },
                          credits: {
                            text: "Credits",
                            cls: "bg-info/10 text-info",
                          },
                          mixed: {
                            text: "Mixed",
                            cls: "bg-warning/10 text-warning",
                          },
                        };
                        const m = METHOD_LABEL[evt.chargeMethod] ?? {
                          text: "Charged",
                          cls: "bg-muted text-muted-foreground",
                        };
                        return (
                          <div
                            key={evt._id}
                            className="rounded-lg border border-border bg-muted/30 px-3 py-2 space-y-0.5"
                          >
                            <div className="flex items-center justify-between gap-2">
                              <p className="text-[12px] font-semibold text-foreground truncate">
                                {evt.title}
                              </p>
                              <div className="flex items-center gap-1.5 shrink-0">
                                <span className="text-[12px] font-bold text-violet-500">
                                  $
                                  {(evt.charges ?? [])
                                    .filter(
                                      (c) =>
                                        String(c.customerID) ===
                                        String(customerId),
                                    )
                                    .reduce((s, c) => s + (c.amount ?? 0), 0)
                                    .toFixed(2)}
                                </span>
                                <span
                                  className={`rounded-full px-1.5 py-0.5 text-[9px] font-bold uppercase ${m.cls}`}
                                >
                                  {m.text}
                                </span>
                              </div>
                            </div>
                            <p className="text-[10px] text-muted-foreground">
                              {formatStudioDate(evt.startDateTime, studioTz)}
                              {" · "}
                              {formatStudioTime(evt.startDateTime, studioTz)}
                            </p>
                            {evt.calendarServiceID?.serviceName && (
                              <p className="text-[10px] text-muted-foreground">
                                {evt.calendarServiceID.serviceName}
                              </p>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  )}

                  {/* Collected payments section */}
                  {paymentView === "collected" &&
                    collectedPayments.length > 0 && (
                      <div className="space-y-1.5">
                        <p className="text-[9px] font-bold uppercase tracking-wider text-muted-foreground/60">
                          Collected payments (all methods)
                        </p>
                        {collectedPayments.map((p) => {
                          const METHOD_LABELS = {
                            cash: "Cash",
                            card: "Card",
                            online: "Online",
                            cheque: "Cheque",
                            other: "Other",
                          };
                          const title =
                            p.calendarEventID?.title ||
                            p.enrollmentID?.label ||
                            p.enrollmentID?.package?.packageName ||
                            PAYMENT_TYPE_LABEL[p.type] ||
                            "Payment";
                          return (
                            <div
                              key={p._id}
                              className="rounded-lg border border-border bg-muted/30 px-3 py-2 space-y-0.5"
                            >
                              <div className="flex items-center justify-between gap-2">
                                <p className="text-[12px] font-semibold text-foreground truncate">
                                  {title}
                                </p>
                                <div className="flex items-center gap-1.5 shrink-0">
                                  <span className="text-[12px] font-bold text-success">
                                    ${Number(p.amount ?? 0).toFixed(2)}
                                  </span>
                                  {p.method && (
                                    <span className="rounded-full bg-muted px-1.5 py-0.5 text-[9px] font-bold uppercase text-muted-foreground">
                                      {METHOD_LABELS[p.method] ?? p.method}
                                    </span>
                                  )}
                                </div>
                              </div>
                              <p className="text-[10px] text-muted-foreground">
                                {formatStudioDate(p.createdAt)}
                                {" · "}
                                {formatStudioTime(p.createdAt)}
                              </p>
                            </div>
                          );
                        })}
                      </div>
                    )}

                  {paymentView === "due" && upcomingPayments.length === 0 && (
                    <p className="text-[12px] text-muted-foreground">
                      No payments due.
                    </p>
                  )}
                  {paymentView === "auto" && serviceCharges.length === 0 && (
                    <p className="text-[12px] text-muted-foreground">
                      No autopay charges yet.
                    </p>
                  )}
                  {paymentView === "collected" &&
                    collectedPayments.length === 0 && (
                      <p className="text-[12px] text-muted-foreground">
                        No collected payments yet.
                      </p>
                    )}
                </>
              )}
            </div>
          )}

          {/* ── NOTES ── */}
          {activeTab === "notes" && (
            <div className="space-y-3">
              <div className="space-y-2">
                <textarea
                  rows={2}
                  value={newNoteText}
                  onChange={(e) => setNewNoteText(e.target.value)}
                  placeholder="Add a note…"
                  className="w-full resize-none rounded-lg border border-border bg-background px-3 py-2.5 text-[13px] text-foreground outline-none focus:border-primary"
                />
                <button
                  type="button"
                  onClick={handleAddNote}
                  disabled={isSavingNote || !newNoteText.trim()}
                  className="flex items-center gap-1.5 rounded-lg bg-brand px-3 py-1.5 text-[11px] font-semibold text-brand-foreground hover:bg-brand-dark disabled:opacity-50"
                >
                  <Plus className="h-3 w-3" />
                  {isSavingNote ? "Saving…" : "Add Note"}
                </button>
              </div>

              {!sortedNotes.length ? (
                <p className="text-[12px] text-muted-foreground">
                  No notes yet.
                </p>
              ) : (
                sortedNotes.map((note) => (
                  <div
                    key={note._id}
                    className={`rounded-[9px] border px-3.5 py-3 space-y-2 ${
                      note.isPinned
                        ? "border-primary/30 bg-primary/10"
                        : "border-border bg-card"
                    }`}
                  >
                    <p className="text-[13px] text-foreground whitespace-pre-wrap break-words">
                      {note.text}
                    </p>
                    <div className="flex items-center justify-between">
                      <p className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
                        {note.isPinned && (
                          <span className="inline-flex items-center gap-1 text-primary">
                            <Pin className="h-3 w-3" /> Pinned ·
                          </span>
                        )}
                        {formatDate(note.createdAt)}
                      </p>
                      <div className="flex items-center gap-1">
                        <button
                          type="button"
                          onClick={() => handleTogglePin(note._id)}
                          title={note.isPinned ? "Unpin" : "Pin to top"}
                          className={`grid h-6 w-6 place-items-center rounded-md transition-colors ${
                            note.isPinned
                              ? "text-primary hover:bg-primary/10"
                              : "text-muted-foreground hover:bg-muted"
                          }`}
                        >
                          <Pin className="h-3 w-3" />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDeleteNote(note._id)}
                          className="grid h-6 w-6 place-items-center rounded-md text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
                        >
                          <Trash2 className="h-3 w-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </>
      )}
    </div>
  );

  const enrollmentSheet = (
    <>
      <CreateEnrollmentSheet
        open={showCreateEnrollmentSheet}
        initialMode={enrollMode}
        onClose={() => setShowCreateEnrollmentSheet(false)}
        customerID={customerId}
        customerName={customerName}
        locationID={locationID}
        onSuccess={({ enrollmentID } = {}) => {
          setExpandedEnrId(enrollmentID ? String(enrollmentID) : null);
          reloadEnrollments();
        }}
      />
      <SellIntroSheet
        open={showSellIntroSheet}
        onClose={() => setShowSellIntroSheet(false)}
      />
      <CreateEventPurchaseDialog
        open={showEventPurchaseDialog}
        onClose={() => setShowEventPurchaseDialog(false)}
        initialCustomerID={customerId}
        initialCustomerName={customerName}
        onCreated={(purchase) => {
          setJustCreatedPurchaseID(purchase?._id ?? null);
          reloadPurchases();
        }}
      />
      <PayInstallmentDialog
        open={!!payInstallTarget}
        onClose={() => setPayInstallTarget(null)}
        plan={payInstallTarget?.plan}
        installmentIndex={payInstallTarget?.index}
        billingType={payInstallTarget?.billingType}
        locationID={locationID}
        onSuccess={refreshPaymentsData}
      />
    </>
  );

  if (inline) {
    return (
      <>
        <div className="flex flex-col h-full">
          {customer && (
            <div className="flex items-center justify-between pb-3 px-1">
              <p className="text-[11px] text-muted-foreground">
                Student Account
              </p>
              <Link
                href={`/settings/users-roles/customers/${customerId}`}
                className="flex items-center gap-1 rounded-md border border-border bg-background px-2 py-1 text-[11px] font-medium text-muted-foreground hover:text-foreground hover:border-primary transition-colors"
              >
                <ExternalLink className="h-3 w-3" />
                Full Account
              </Link>
            </div>
          )}
          {tabs}
          {body}
        </div>
        {enrollmentSheet}
      </>
    );
  }

  return (
    <>
      <aside className="h-full w-full max-w-full sm:w-[380px] shrink-0 rounded-xl border border-border bg-card shadow-lg flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between gap-2 border-b border-border px-4 py-3 shrink-0">
          <button
            type="button"
            onClick={onBack}
            className="flex items-center gap-1.5 rounded-md px-2 py-1 text-[11px] font-medium text-muted-foreground hover:bg-muted hover:text-foreground"
            aria-label="Back to event"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Appointment
          </button>
          <span className="text-[11px] text-muted-foreground">Mini account</span>
          <Link
            href={`/settings/users-roles/customers/${customerId}`}
            className="flex shrink-0 items-center gap-1 rounded-md border border-border bg-background px-2 py-1 text-[11px] font-medium text-muted-foreground hover:text-foreground hover:border-primary transition-colors"
          >
            <ExternalLink className="h-3 w-3" />
            Full Account
          </Link>
        </div>
        <div className="flex shrink-0 items-center gap-3 px-4 pb-3 pt-4">
          <div className="grid h-[43px] w-[43px] shrink-0 place-items-center rounded-full bg-primary/10 text-[15px] font-semibold text-primary">
            {initialsOf(customerName)}
          </div>
          <div className="min-w-0">
            <h2 className="truncate text-[17px] font-semibold leading-tight tracking-tight text-foreground">
              {customerName}
            </h2>
            <p className="mt-1 text-[12px] text-muted-foreground">
              Individual account
            </p>
          </div>
        </div>
        {tabs}
        {body}
      </aside>
      {enrollmentSheet}
    </>
  );
}
