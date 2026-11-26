"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { ChevronDown, Plus, Trash2 } from "lucide-react";
import api from "@/lib/api";
import { formatDate } from "@/lib/utils";
import { useCardProcessor } from "@/app/settings/payments/useCardProcessor";
import { openCheckoutTab, navigateCheckoutTab, closeCheckoutTab, CHECKOUT_TOAST } from "@/lib/clover";
import { toast } from "@/components/ui/toast";
import SearchableSelect from "@/components/ui/searchable-select";

import { PAYMENT_METHODS_WITH_SAVED_CARD, SHARE_LINK_METHOD, SHORTFALL_METHODS, SHORTFALL_METHODS_WITH_TERMINAL, TIP_METHODS } from "@/lib/paymentMethods";
import WalletShortfallField, { walletShortfall } from "@/components/payments/WalletShortfallField";
import { SendLinkChannelPicker } from "@/components/payments/SendPaymentLinkMenu";
import TerminalDeviceField, { terminalTipPayload } from "@/components/payments/TerminalDeviceField";
import SavedCardField from "@/components/payments/SavedCardField";
import AutopayOption from "@/components/payments/AutopayOption";
import CheckNumberField from "@/components/payments/CheckNumberField";
import PaymentMethodPicker from "@/components/payments/PaymentMethodPicker";

function todayISO() {
  const d = new Date();
  const offset = d.getTimezoneOffset();
  return new Date(d.getTime() - offset * 60 * 1000).toISOString().slice(0, 10);
}

// What a "Share Link" enrollment's payment link pays, once the enrollment exists: the
// whole balance, the first installment, or — flexible — just the initial payment, since
// the plan already holds the rest. Called by whichever onSubmit created it.
export function enrollmentLinkTarget(payload, enrollmentID, paymentPlan) {
  if (payload.billingType === "payment_plan") {
    const installmentIndex = (paymentPlan?.installments || []).findIndex((i) => i.status === "pending");
    return installmentIndex === -1 ? null : { kind: "installment", paymentPlanID: paymentPlan._id, installmentIndex };
  }
  if (payload.billingType === "flexible") {
    return { kind: "package", enrollmentID, amount: Number(payload.billing?.initialAmount) || 0 };
  }
  return { kind: "package", enrollmentID };
}

// A date input's "2026-10-08" parses as UTC midnight; formatDate reads that as the
// calendar day, where local formatting showed the day before west of UTC.
function fmtDate(iso) {
  return formatDate(iso) || "—";
}

// Selling loose services is meant to be a two-field job, so the validity isn't
// asked for: every service enrollment gets a year. Staff holding
// calendar.enrollment write can change it afterwards from the customer's
// profile (Enrollments → Extend).
const SERVICE_ONLY_EXPIRY_DAYS = 365;

// Loose services bill either in full now or against an open balance — the
// installment-scheduling types belong to packages.
const SERVICE_ONLY_BILLING_TYPES = ["one_time", "flexible"];

const BLANK_FORM = {
  teacherID: "",
  label: "",
  packageID: "",
  purchaseDate: todayISO(),
  expiryDays: "",
  notes: "",
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
    futurePayments: [{ _key: "fp-0", amount: "", dueDate: "" }],
    collectNow: true,
    collectAmount: "",
    collectDate: todayISO(),
    sendLinkChannel: "email",
    // Wallet is a payment method: walletAmount is what it pays ("" = all it can), and
    // shortfallMethod collects whatever it does not cover.
    walletAmount: "",
    shortfallMethod: "cash",
  },
  tip: {
    enabled: false,
    amount: "",
    method: "cash",
  },
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
    finalAmount: 0,
  };
}

function calcFinalAmount(svc) {
  const gross =
    Number(svc.numberOfSessions || 0) * Number(svc.pricePerSession || 0);
  const amt = Number(svc.discountAmount || 0);
  if (svc.discountType === "percentage")
    return Math.max(0, gross - (gross * amt) / 100);
  if (svc.discountType === "fixed") return Math.max(0, gross - amt);
  return gross;
}

// ─── Service picker dropdown ───────────────────────────────────────────────────

function ServicePicker({ catalogServices, onSelect }) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const ref = useRef(null);

  useEffect(() => {
    if (!open) return;
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
        setQuery("");
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  const filtered = query.trim()
    ? catalogServices.filter((s) =>
        (s.serviceName || s.serviceCode || "")
          .toLowerCase()
          .includes(query.toLowerCase()),
      )
    : catalogServices;

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-1 h-7 px-2 rounded border border-dashed border-border bg-background text-[11px] font-medium text-muted-foreground hover:text-foreground hover:border-primary transition-colors"
      >
        <Plus className="h-3 w-3" /> Add Service
      </button>
      {open && (
        <div className="absolute left-0 top-[calc(100%+4px)] z-50 w-56 rounded-xl border border-border bg-popover shadow-lg overflow-hidden">
          <div className="p-2 border-b border-border">
            <input
              autoFocus
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search catalog…"
              className="h-7 w-full rounded-md border border-border bg-muted/30 px-2.5 text-[11px] text-foreground outline-none focus:border-primary placeholder:text-muted-foreground/50"
            />
          </div>
          <div className="max-h-48 overflow-y-auto py-1">
            {/* + Blank service button removed */}
            {filtered.map((s) => (
              <button
                key={String(s._id)}
                type="button"
                onClick={() => {
                  onSelect(s);
                  setOpen(false);
                  setQuery("");
                }}
                className="w-full flex items-center gap-2 px-3 py-2 text-[12px] text-foreground hover:bg-muted/40 transition-colors"
              >
                {s.color && (
                  <span
                    className="h-2 w-2 rounded-full shrink-0"
                    style={{ background: s.color }}
                  />
                )}
                <span className="truncate">{s.serviceName}</span>
                {s.serviceCode && (
                  <span className="ml-auto shrink-0 text-[10px] text-muted-foreground">
                    {s.serviceCode}
                  </span>
                )}
              </button>
            ))}
            {filtered.length === 0 && (
              <p className="px-3 py-2 text-[11px] text-muted-foreground">
                No results
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Main component ────────────────────────────────────────────────────────────

export default function NewEnrollmentPackageInline({
  teacherOptions = [],
  packageTemplates = [],
  /** Sell loose services with no package template — hides the package selector. */
  serviceOnly = false,
  /** When set, only package lines whose `serviceCode` is in this set are included. */
  allowedServiceCodes,
  /** Student the package is being sold to — used to read wallet balance. */
  customerID,
  /** Studio location for Clover readiness (customer location). */
  locationID,
  onCancel,
  onSubmit,
}) {
  const [form, setForm] = useState(() => ({
    ...BLANK_FORM,
    purchaseDate: todayISO(),
  }));
  const [step, setStep] = useState(1);
  // Once staff edit the payment date by hand we stop steering it from the
  // schedule — until then it tracks the first installment's due date (or today).
  const [collectDateTouched, setCollectDateTouched] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [catalogServices, setCatalogServices] = useState([]);
  const [walletBalance, setWalletBalance] = useState(null);
  const [deviceID, setDeviceID] = useState("");
  const [savedCardID, setSavedCardID] = useState("");
  const [autopayOn, setAutopayOn] = useState(false);
  const [autopayCardID, setAutopayCardID] = useState("");
  // A card belongs to one customer; never carry it over to the next.
  useEffect(() => {
    setSavedCardID("");
    setAutopayOn(false);
    setAutopayCardID("");
  }, [customerID]);
  const [checkNumber, setCheckNumber] = useState("");
  // Either processor being ready means a card payment can be taken; the backend
  // routes to whichever this location uses.
  const { ready: cardProcessorReady } = useCardProcessor(locationID);

  useEffect(() => {
    api.get("/api/calendar-service?limit=200").then((res) => {
      if (res.success && Array.isArray(res.data)) setCatalogServices(res.data);
    });
  }, []);

  // Picking a package on the Packages tab adopts that package's billing type,
  // which may be one the Service tab doesn't offer. Switching tabs would then
  // leave an installment schedule active with no button to change it.
  useEffect(() => {
    if (serviceOnly && !SERVICE_ONLY_BILLING_TYPES.includes(form.billingType)) {
      setForm((p) => ({ ...p, billingType: "one_time" }));
    }
  }, [serviceOnly, form.billingType]);

  useEffect(() => {
    if (!customerID) { setWalletBalance(null); return; }
    api.get(`/api/wallet/${customerID}/balance`).then((res) => {
      if (res.success) setWalletBalance(Number(res.data?.balance ?? 0));
    });
  }, [customerID]);

  const selectedPkg = useMemo(
    () =>
      packageTemplates.find((p) => String(p._id) === String(form.packageID)),
    [packageTemplates, form.packageID],
  );

  function handlePkgChange(pkgId) {
    const pkg = packageTemplates.find((p) => String(p._id) === String(pkgId));
    const raw = pkg?.services || [];
    const filtered =
      allowedServiceCodes == null
        ? raw
        : raw.filter((s) => allowedServiceCodes.has(s.serviceCode));
    setForm((prev) => ({
      ...prev,
      packageID: pkgId,
      billingType: pkg?.billingType || "one_time",
      services: filtered.map((s) => {
        const isChargeable = s.isChargeable ?? true;
        const svc = {
          _key: String(s._id || s.serviceCode || Math.random()),
          serviceCode: s.serviceCode || "",
          serviceName: s.serviceName || "",
          color: s.color || "#6366f1",
          numberOfSessions: Number(s.numberOfSessions || 0),
          pricePerSession: isChargeable ? Number(s.pricePerSession || 0) : 0,
          discountType: isChargeable ? (s.discountType || "none") : "none",
          discountAmount: isChargeable ? Number(s.discountAmount || 0) : 0,
          isChargeable,
        };
        return { ...svc, finalAmount: Number(calcFinalAmount(svc).toFixed(2)) };
      }),
    }));
  }

  // One package is not a choice — preselect it so staff aren't made to pick the
  // only option, same reasoning as TerminalDeviceField preselecting a lone reader.
  // Runs only while nothing is chosen yet, so it never overrides a real pick, and
  // re-evaluates if the list itself changes (e.g. a service-code filter narrows
  // it down to exactly one after the customer/context loads).
  useEffect(() => {
    if (serviceOnly || form.packageID) return;
    if (packageTemplates.length === 1) handlePkgChange(packageTemplates[0]._id);
  }, [packageTemplates, serviceOnly, form.packageID]);

  function updateSvc(key, field, value) {
    setForm((prev) => {
      const services = prev.services.map((s) => {
        if (s._key !== key) return s;
        const next = { ...s, [field]: value };
        next.finalAmount = Number(calcFinalAmount(next).toFixed(2));
        return next;
      });
      return { ...prev, services };
    });
  }

  function addService(catalogSvc) {
    const svc = catalogSvc
      ? {
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
          isChargeable: catalogSvc.isChargeable ?? true,
        }
      : blankService();
    svc.finalAmount = Number(calcFinalAmount(svc).toFixed(2));
    setForm((prev) => ({ ...prev, services: [...prev.services, svc] }));
  }

  function removeService(key) {
    setForm((prev) => ({
      ...prev,
      services: prev.services.filter((s) => s._key !== key),
    }));
  }

  // Adding/removing a row (or changing the initial payment) changes how many
  // ways the remaining balance splits, so re-spread it evenly across all rows
  // rather than leaving a stray $0 box or a stale amount.
  function splitEvenly(rows, remaining) {
    const base = rows.length ? Math.floor((remaining / rows.length) * 100) / 100 : 0;
    return rows.map((c, i) => ({
      ...c,
      amount: (i === rows.length - 1 ? Number((remaining - base * (rows.length - 1)).toFixed(2)) : base).toFixed(2),
    }));
  }

  function addFuturePayment() {
    setForm((prev) => {
      const rows = [
        ...prev.billing.futurePayments,
        { _key: String(Date.now() + Math.random()), dueDate: "", amount: "" },
      ];
      const remaining = total - Number(prev.billing.initialAmount || 0);
      return { ...prev, billing: { ...prev.billing, futurePayments: splitEvenly(rows, remaining) } };
    });
  }

  function updateFuturePayment(key, field, value) {
    setForm((prev) => {
      const rows = prev.billing.futurePayments;
      if (field !== "amount") {
        return {
          ...prev,
          billing: {
            ...prev.billing,
            futurePayments: rows.map((c) => (c._key === key ? { ...c, [field]: value } : c)),
          },
        };
      }
      // Editing one row's amount short-pays or over-pays it relative to what
      // was scheduled — spread the remaining balance evenly across the other
      // rows so the total always stays balanced, whichever row was touched.
      const remaining = total - Number(prev.billing.initialAmount || 0);
      const leftover = Math.max(0, remaining - (Number(value) || 0));
      const otherRows = rows.filter((c) => c._key !== key);
      const splitOthers = splitEvenly(otherRows, leftover);
      const futurePayments = rows.map((c) =>
        c._key === key ? { ...c, amount: value } : splitOthers.find((o) => o._key === c._key),
      );
      return { ...prev, billing: { ...prev.billing, futurePayments } };
    });
  }

  function removeFuturePayment(key) {
    setForm((prev) => {
      const rows = prev.billing.futurePayments.filter((c) => c._key !== key);
      const remaining = total - Number(prev.billing.initialAmount || 0);
      return { ...prev, billing: { ...prev.billing, futurePayments: splitEvenly(rows, remaining) } };
    });
  }

  const total = form.services.reduce(
    (sum, s) => sum + (Number(s.finalAmount) || 0),
    0,
  );
  const totalDiscount = form.services.reduce((sum, s) => {
    const gross =
      Number(s.numberOfSessions || 0) * Number(s.pricePerSession || 0);
    return sum + Math.max(0, gross - (Number(s.finalAmount) || 0));
  }, 0);

  const isLink = form.billing.method === SHARE_LINK_METHOD.value;

  // Wallet sits beside the other methods. It pays what staff set (all it can by default);
  // when it falls short, shortfallMethod collects the rest. Terminal is offered too —
  // this endpoint dispatches to the paired Clover/Stripe reader the same way
  // PaymentDueCard's balance payments do.
  const collectAmt = Number(form.billing.collectAmount || 0);
  const paysByWallet = form.billing.method === "wallet" && form.billing.collectNow && !isLink;
  const walletSplit = walletShortfall(walletBalance, collectAmt, form.billing.walletAmount);
  const walletApplied = paysByWallet ? walletSplit.walletApplied : 0;
  const walletRemaining = Math.max(0, collectAmt - walletApplied);
  const walletOver = paysByWallet && walletSplit.over;
  // The method that actually collects money; the wallet's share goes as walletAmount.
  const chargeMethod =
    form.billing.method === "wallet" ? (walletRemaining > 0 ? form.billing.shortfallMethod : "cash") : form.billing.method;
  // The reader can collect what the wallet leaves, but only on a one-time sale: that is the
  // only flow whose backend charges the reader the remainder. A payment plan would drop
  // the wallet's share, so Terminal is not offered there.
  const terminalShortfallAllowed = form.billingType === "one_time";
  const shortfallMethodOptions = terminalShortfallAllowed ? SHORTFALL_METHODS_WITH_TERMINAL : SHORTFALL_METHODS;
  // Switching to a billing type that cannot use the reader must not leave it silently chosen.
  useEffect(() => {
    if (!terminalShortfallAllowed && form.billing.shortfallMethod === "terminal") {
      setForm((p) => ({ ...p, billing: { ...p.billing, shortfallMethod: "cash" } }));
    }
  }, [terminalShortfallAllowed, form.billing.shortfallMethod]);
  const collectMethodOptions = [...PAYMENT_METHODS_WITH_SAVED_CARD, SHARE_LINK_METHOD];

  const chargeableServices = form.services.filter((s) => s.isChargeable !== false);

  const installments = useMemo(() => {
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
    for (let i = 0; i < n; i++) {
      const isLast = i === n - 1;
      const amount = isLast ? Number((total - baseAmt * (n - 1)).toFixed(2)) : baseAmt;
      rows.push({
        index: i + 1,
        amount,
        isLast,
        date: fmtDate(d),
      });
      // UTC month step keeps d on UTC midnight, so fmtDate keeps reading the right day.
      if (frequency === "weekly") d = new Date(d.getTime() + 7 * 24 * 60 * 60 * 1000);
      else if (frequency === "biweekly") d = new Date(d.getTime() + 14 * 24 * 60 * 60 * 1000);
      else { d = new Date(d); d.setUTCMonth(d.getUTCMonth() + 1); }
    }
    return rows;
  }, [
    form.billingType,
    form.billing.installmentMode,
    form.billing.numberOfInstallments,
    form.billing.installmentAmount,
    form.billing.frequency,
    form.billing.startDate,
    total,
  ]);

  const futurePaymentsTotal = form.billing.futurePayments.reduce(
    (sum, c) => sum + (Number(c.amount) || 0),
    0,
  );
  const initialAmount = Number(form.billing.initialAmount || 0);
  // Must hit exactly $0 before staff can move on — anything else means the
  // balance isn't fully accounted for between the initial payment and the
  // future-payment rows.
  const amountLeftToSchedule = total - initialAmount - futurePaymentsTotal;

  const firstInstallmentAmount = installments[0]?.amount ?? 0;

  const collectsFirstInstallment = form.billingType === "payment_plan";

  const defaultCollectDate =
    form.billingType === "payment_plan"
      ? form.billing.startDate || todayISO()
      : form.billingType === "flexible"
        ? form.billing.initialDate || todayISO()
        : todayISO();
  const effectiveCollectDate = collectDateTouched
    ? form.billing.collectDate
    : defaultCollectDate;
  // One-time payments have nothing to split — the amount collected now is
  // always the full payable balance, so the field is locked the same way a
  // first installment amount is (that one's fixed by the schedule instead).
  // Flexible's initial payment is locked too — it was already finalized on
  // Step 1 and changing it here would desync the student agreement.
  const collectAmountIsFixed =
    collectsFirstInstallment || form.billingType === "one_time" || form.billingType === "flexible";

  // The wallet settles its share already, so the card only ever charges what's left.
  const cardChargeAmount = walletRemaining;
  const payWithClover =
    step === 2 &&
    form.billingType !== "pay_per_session" &&
    form.billing.collectNow &&
    chargeMethod === "card" &&
    cardChargeAmount > 0 &&
    cardProcessorReady;
  const cloverNotConnected =
    step === 2 &&
    form.billingType !== "pay_per_session" &&
    form.billing.collectNow &&
    chargeMethod === "card" &&
    cardChargeAmount > 0 &&
    !cardProcessorReady;
  const terminalNotSelected =
    step === 2 && form.billing.collectNow && chargeMethod === "terminal" && !deviceID;
  // The reader runs its own tip screen, so a tip typed in here as well would either
  // double up or credit money the customer never chose on the device.
  const readerCollectsTip = form.billing.collectNow && chargeMethod === "terminal";
  const savedCardNotSelected =
    step === 2 && form.billing.collectNow && form.billing.method === "saved_card" && !savedCardID;

  // Autopay needs a schedule. Not offered when the first installment goes out as a
  // payment link: the nightly job could charge it while the customer is paying.
  const autopayAvailable =
    total > 0 &&
    ((form.billingType === "payment_plan" && !(form.billing.collectNow && isLink)) ||
      (form.billingType === "flexible" && form.billing.futurePayments.some((c) => Number(c.amount) > 0)));
  const autopayNotSelected = step === 2 && autopayAvailable && autopayOn && !autopayCardID;

  const defaultCollectAmount = useMemo(() => {
    if (form.billingType === "one_time") return total;
    if (form.billingType === "payment_plan") return firstInstallmentAmount;
    if (form.billingType === "flexible") return initialAmount;
    return 0;
  }, [form.billingType, total, firstInstallmentAmount, initialAmount]);

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
      setForm((p) => ({ ...p, billingType: "one_time" }));
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
      const scheduledRows = form.billing.futurePayments.filter((c) => Number(c.amount) > 0);
      if (scheduledRows.some((c) => !c.dueDate)) {
        setError("Every future payment needs a due date.");
        return;
      }
      if (Math.abs(amountLeftToSchedule) > 0.01) {
        setError(`Amount left to schedule is $${amountLeftToSchedule.toFixed(2)} — it must be $0 before continuing.`);
        return;
      }
    }
    setError("");
    setForm((p) => ({
      ...p,
      billing: {
        ...p.billing,
        collectNow: p.billingType !== "flexible" || initialAmount > 0,
        collectAmount: defaultCollectAmount ? String(defaultCollectAmount.toFixed(2)) : "",
      },
    }));
    setStep(2);
  }

  async function handleSubmit() {
    setError("");
    const sendLink = form.billingType !== "pay_per_session" && form.billing.collectNow && isLink;
    const collect =
      !sendLink &&
      form.billingType !== "pay_per_session" &&
      form.billing.collectNow &&
      Number(form.billing.collectAmount) > 0;
    const payload = {
      ...form,
      // The Service tab asks for neither, so it never sends a stale value left
      // behind by a visit to the Packages tab.
      ...(serviceOnly ? { label: "", expiryDays: SERVICE_ONLY_EXPIRY_DAYS } : {}),
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
        ...(collect && chargeMethod === "terminal" ? { deviceID, ...terminalTipPayload() } : {}),
        ...(collect && form.billing.method === "saved_card" ? { savedCardID } : {}),
        autopayCardID: autopayAvailable && autopayOn ? autopayCardID : undefined,
        ...(collect && chargeMethod === "cheque" ? { checkNumber } : {}),
      },
    };
    if (form.tip.enabled && form.tip.amount && !readerCollectsTip) {
      // teacherID may be empty: an enrollment with no teacher can still take a tip.
      payload.tip = { teacherID: form.teacherID || undefined, amount: form.tip.amount, method: form.tip.method };
    } else {
      payload.tip = undefined;
    }

    const checkoutTab = payWithClover ? openCheckoutTab() : null;
    setLoading(true);
    const res = await onSubmit?.(payload);
    if (!res?.ok) {
      setLoading(false);
      closeCheckoutTab(checkoutTab);
      setError("Failed to create enrollment and package.");
      return;
    }
    setLoading(false);
    if (res.checkoutUrl) {
      navigateCheckoutTab(checkoutTab, res.checkoutUrl);
      toast.success(CHECKOUT_TOAST);
    } else {
      closeCheckoutTab(checkoutTab);
    }
  }

  return (
    <div className="mt-2 h-full min-h-0 rounded-xl border border-border bg-card p-3 flex flex-col">
      <div className="shrink-0">
        <p className="text-[12px] font-semibold text-foreground">
          {serviceOnly ? "New Enrollment & Services" : "New Enrollment & Package"}
        </p>
        <p className="text-[10px] text-muted-foreground mt-0.5">
          Step {step} of 2 · {step === 1 ? (serviceOnly ? "Services & billing" : "Package & billing") : "Payment details"}
        </p>
      </div>

      <div className="flex-1 min-h-0 overflow-y-auto mt-3 pr-1 space-y-3">
        <div className="space-y-3 pb-1" hidden={step !== 1}>
          <div className="space-y-2">
            <label className="text-[12px] font-semibold text-foreground">
              Teacher
            </label>
            <SearchableSelect
              value={form.teacherID}
              onChange={(v) => setForm((p) => ({ ...p, teacherID: v }))}
              options={[{ value: "", label: "No teacher" }, ...teacherOptions]}
              placeholder="Select teacher…"
            />

            {!serviceOnly && (
              <>
                <label className="text-[12px] font-semibold text-foreground">
                  Label (optional)
                </label>
                <input
                  value={form.label}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, label: e.target.value }))
                  }
                  placeholder="e.g. Term 1 2026, Trial…"
                  className="h-9 w-full rounded-lg border border-border bg-background px-3 text-[12px]"
                />

                <label className="text-[12px] font-semibold text-foreground">
                  Package
                </label>
                <SearchableSelect
                  value={form.packageID}
                  onChange={(v) => handlePkgChange(v)}
                  options={packageTemplates.map((p) => ({
                    value: p._id,
                    label: p.packageName,
                  }))}
                  placeholder="Select package…"
                />
              </>
            )}
            {!serviceOnly && selectedPkg && (
              <div className="rounded-lg border border-border bg-muted/30 p-3 space-y-1">
                <p className="text-[12px] font-medium text-foreground">
                  {selectedPkg.packageName}
                </p>
                {selectedPkg.description && (
                  <p className="text-[11px] text-muted-foreground">
                    {selectedPkg.description}
                  </p>
                )}
                <p className="text-[11px] text-muted-foreground">
                  {selectedPkg.services?.length ?? 0} service
                  {(selectedPkg.services?.length ?? 0) !== 1 ? "s" : ""}
                  {" · "}
                  {selectedPkg.totalDays > 0
                    ? `${selectedPkg.totalDays} days validity`
                    : "No expiry"}
                </p>
              </div>
            )}
            <label className="text-[12px] font-semibold text-foreground">
              Purchase date
            </label>
            <input
              type="date"
              value={form.purchaseDate}
              onChange={(e) =>
                setForm((p) => ({ ...p, purchaseDate: e.target.value }))
              }
              className="h-9 w-full rounded-lg border border-border bg-background px-3 text-[12px]"
            />
            <label htmlFor="enrollment-notes" className="block text-[12px] font-semibold text-foreground">
              Notes (optional)
            </label>
            <textarea
              id="enrollment-notes"
              value={form.notes}
              onChange={(e) => setForm((p) => ({ ...p, notes: e.target.value }))}
              rows={3}
              placeholder="Anything staff should know about this sale"
              className="w-full resize-y rounded-lg border border-border bg-background px-3 py-2 text-[12px]"
            />
          </div>

          {/* ── Services table ── */}
          <div className="space-y-2">
            {serviceOnly && (
              <SearchableSelect
                value=""
                onChange={(v) => {
                  const svc = catalogServices.find((s) => String(s._id) === String(v));
                  if (svc) addService(svc);
                }}
                options={catalogServices
                  .filter((s) => s.type !== "intro")
                  .filter(
                    (s) =>
                      !form.services.some((fs) => fs.serviceCode && fs.serviceCode === s.serviceCode),
                  )
                  .map((s) => ({ value: String(s._id), label: s.serviceName || s.serviceCode }))}
                placeholder="Select a service to add…"
              />
            )}
            <div className="overflow-x-auto rounded-lg border border-border">
              <table className="w-full text-[12px]">
                <thead>
                  <tr className="bg-muted/40 border-b border-border">
                    <th className="px-2 py-1.5 text-left">Service</th>
                    <th className="px-2 py-1.5">Color</th>
                    <th className="px-2 py-1.5">Sessions</th>
                    <th className="px-2 py-1.5">Price</th>
                    <th className="px-2 py-1.5">Discount</th>
                    <th className="px-2 py-1.5 text-right">Total</th>
                    <th className="px-2 py-1.5 w-6" />
                  </tr>
                </thead>
                <tbody>
                  {form.services.length === 0 && (
                    <tr>
                      <td
                        colSpan={7}
                        className="px-3 py-3 text-center text-[11px] text-muted-foreground italic"
                      >
                        No services — add one below
                      </td>
                    </tr>
                  )}
                  {form.services.map((s) => (
                    <tr
                      key={s._key}
                      className="border-t border-border first:border-0"
                    >
                      <td className="px-2 py-1.5">
                        <input
                          type="text"
                          value={s.serviceName}
                          onChange={(e) =>
                            updateSvc(s._key, "serviceName", e.target.value)
                          }
                          placeholder="Service name"
                          className="h-7 w-full rounded border border-border bg-background px-2 text-[12px] outline-none focus:border-primary"
                        />
                      </td>
                      <td className="px-2 py-1.5">
                        <input
                          type="color"
                          value={s.color || "#6366f1"}
                          onChange={(e) =>
                            updateSvc(s._key, "color", e.target.value)
                          }
                          className="h-7 w-9 rounded border border-border cursor-pointer p-0.5 bg-background"
                        />
                      </td>
                      <td className="px-2 py-1.5">
                        <input
                          type="number"
                          min="0"
                          value={s.numberOfSessions}
                          onChange={(e) =>
                            updateSvc(
                              s._key,
                              "numberOfSessions",
                              e.target.value,
                            )
                          }
                          className="h-7 w-16 rounded border border-border px-2 outline-none focus:border-primary"
                        />
                      </td>
                      <td className="px-2 py-1.5">
                        <input
                          type="number"
                          min="0"
                          step="any"
                          value={s.isChargeable === false ? 0 : s.pricePerSession}
                          disabled={s.isChargeable === false}
                          onChange={(e) =>
                            updateSvc(s._key, "pricePerSession", e.target.value)
                          }
                          className={`h-7 w-20 rounded border px-2 outline-none ${s.isChargeable === false ? "border-border bg-muted/30 text-muted-foreground cursor-not-allowed" : "border-border focus:border-primary"}`}
                        />
                      </td>
                      <td className="px-2 py-1.5">
                        <div className="flex items-center gap-1">
                          <select
                            value={s.discountType}
                            disabled={s.isChargeable === false}
                            onChange={(e) =>
                              updateSvc(s._key, "discountType", e.target.value)
                            }
                            className={`h-7 rounded border border-border px-1 text-[11px] outline-none ${s.isChargeable === false ? "bg-muted/30 text-muted-foreground cursor-not-allowed" : "bg-background focus:border-primary"}`}
                          >
                            <option value="none">—</option>
                            <option value="percentage">%</option>
                            <option value="fixed">$</option>
                          </select>
                          {s.discountType !== "none" && (
                            <input
                              type="number"
                              min="0"
                              step="any"
                              value={s.discountAmount}
                              onChange={(e) =>
                                updateSvc(
                                  s._key,
                                  "discountAmount",
                                  e.target.value,
                                )
                              }
                              className="h-7 w-16 rounded border border-border bg-background px-2 text-[11px] outline-none focus:border-primary"
                            />
                          )}
                        </div>
                      </td>
                      <td className="px-2 py-1.5 text-right font-semibold">
                        ${Number(s.finalAmount).toFixed(2)}
                      </td>
                      <td className="px-2 py-1.5 text-center">
                        <button
                          type="button"
                          onClick={() => removeService(s._key)}
                          className="text-muted-foreground hover:text-destructive transition-colors"
                          aria-label="Remove service"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  {totalDiscount > 0 && (
                    <tr className="border-t border-border bg-muted/20">
                      <td
                        colSpan={5}
                        className="px-2 py-1 text-right text-[11px] text-muted-foreground"
                      >
                        Discount
                      </td>
                      <td className="px-2 py-1 text-right text-[11px] text-amber-600 font-medium">
                        -${totalDiscount.toFixed(2)}
                      </td>
                      <td />
                    </tr>
                  )}
                  <tr className="border-t border-border bg-muted/30">
                    <td
                      colSpan={5}
                      className="px-2 py-1.5 text-right text-[11px] text-muted-foreground"
                    >
                      Total
                    </td>
                    <td className="px-2 py-1.5 text-right font-semibold">
                      ${total.toFixed(2)}
                    </td>
                    <td />
                  </tr>
                </tfoot>
              </table>
            </div>

            {/* Add service button */}
            {!serviceOnly && (
              <ServicePicker
                catalogServices={catalogServices.filter((s) => s.type !== "intro")}
                onSelect={addService}
              />
            )}
          </div>

          {/* ── Billing type ── */}
          <div className="space-y-2">
            <p className="text-[12px] font-semibold text-foreground uppercase">
              Billing Type
            </p>
            <div className="grid grid-cols-3 gap-2">
              {[
                { v: "one_time", label: "One-time" },
                { v: "payment_plan", label: "Payment Plan" },
                { v: "flexible", label: "Flexible" },
              ]
                .filter(({ v }) => !serviceOnly || SERVICE_ONLY_BILLING_TYPES.includes(v))
                .map(({ v, label }) => (
                <button
                  key={v}
                  type="button"
                  onClick={() => setForm((p) => ({ ...p, billingType: v }))}
                  className={`rounded-lg border p-2 text-[11px] transition-colors ${
                    form.billingType === v
                      ? "border-primary bg-primary/5 font-medium"
                      : "border-border bg-background hover:border-primary/50"
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
            {form.billingType === "one_time" && (
              <div className="rounded-lg border border-border bg-muted/20 p-3">
                <div className="flex items-center justify-between">
                  <p className="text-[12px] text-muted-foreground">
                    Payable Balance
                  </p>
                  <p className="text-[14px] font-bold text-foreground">
                    ${total.toFixed(2)}
                  </p>
                </div>
              </div>
            )}
            {form.billingType === "payment_plan" && (
              <div className="space-y-2">
                <div className="grid grid-cols-2 gap-2">
                  <select
                    value={form.billing.installmentMode}
                    onChange={(e) =>
                      setForm((p) => ({
                        ...p,
                        billing: { ...p.billing, installmentMode: e.target.value },
                      }))
                    }
                    className="h-9 rounded-lg border border-border px-3 text-[12px]"
                  >
                    <option value="count">No. of Installments</option>
                    <option value="amount">Installment Amount</option>
                  </select>
                  {form.billing.installmentMode === "amount" ? (
                    <input
                      type="number"
                      min="1"
                      placeholder="Amount per installment"
                      value={form.billing.installmentAmount}
                      onChange={(e) =>
                        setForm((p) => ({
                          ...p,
                          billing: { ...p.billing, installmentAmount: e.target.value },
                        }))
                      }
                      className="h-9 rounded-lg border border-border px-3 text-[12px]"
                    />
                  ) : (
                    <input
                      type="number"
                      min="2"
                      placeholder="Number of installments"
                      value={form.billing.numberOfInstallments}
                      onChange={(e) =>
                        setForm((p) => ({
                          ...p,
                          billing: { ...p.billing, numberOfInstallments: e.target.value },
                        }))
                      }
                      className="h-9 rounded-lg border border-border px-3 text-[12px]"
                    />
                  )}
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <select
                    value={form.billing.frequency}
                    onChange={(e) =>
                      setForm((p) => ({
                        ...p,
                        billing: { ...p.billing, frequency: e.target.value },
                      }))
                    }
                    className="h-9 rounded-lg border border-border px-3 text-[12px]"
                  >
                    <option value="weekly">Weekly</option>
                    <option value="biweekly">Biweekly</option>
                    <option value="monthly">Monthly</option>
                  </select>
                  <input
                    type="date"
                    value={form.billing.startDate}
                    onChange={(e) =>
                      setForm((p) => ({
                        ...p,
                        billing: { ...p.billing, startDate: e.target.value },
                      }))
                    }
                    className="h-9 rounded-lg border border-border px-3 text-[12px]"
                  />
                </div>
                {installments.length > 0 && (
                  <div className="rounded-lg border border-border bg-muted/20 p-2.5">
                    <div className="flex items-center justify-between mb-1.5">
                      <p className="text-[11px] font-medium text-muted-foreground uppercase">
                        Schedule Preview
                      </p>
                    </div>
                    <div className="space-y-1 max-h-32 overflow-y-auto pr-1">
                      {installments.map((inst) => (
                        <div
                          key={inst.index}
                          className="flex items-center justify-between border-b border-border/40 pb-1 last:border-0"
                        >
                          <span className="text-[11px] text-muted-foreground">
                            Payment {inst.index} · {inst.date}
                          </span>
                          <span className="text-[11px] font-medium text-foreground">
                            ${inst.amount.toFixed(2)}
                          </span>
                        </div>
                      ))}
                    </div>
                    {totalDiscount > 0 && (
                      <div className="flex items-center justify-between mt-2 pt-2 border-t border-border/40">
                        <p className="text-[11px] text-muted-foreground">Discount</p>
                        <p className="text-[11px] font-medium text-destructive">-${totalDiscount.toFixed(2)}</p>
                      </div>
                    )}
                    <div className="flex items-center justify-between mt-2 pt-2 border-t border-border">
                      <p className="text-[11px] text-muted-foreground">
                        Payable Balance
                      </p>
                      <p className="text-[12px] font-bold text-foreground">
                        ${total.toFixed(2)}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            )}
            {form.billingType === "flexible" && (
              <div className="rounded-lg border border-border bg-muted/20 p-3 space-y-4">
                <p className="text-[10px] text-muted-foreground -mt-1">
                  This arrangement will be included in the student agreement — get it right here, it can't be changed on the payment step.
                </p>

                {/* Initial payment */}
                <div className="space-y-1.5">
                  <label className="text-[11px] font-medium text-foreground">
                    Initial payment <span className="font-normal text-muted-foreground">(optional — enter $0 if none)</span>
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="relative">
                      <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-[11px] text-muted-foreground">$</span>
                      <input
                        type="number"
                        min="0"
                        max={total}
                        step="any"
                        placeholder="0.00"
                        value={form.billing.initialAmount}
                        onChange={(e) =>
                          setForm((p) => {
                            const remaining = total - (Number(e.target.value) || 0);
                            return {
                              ...p,
                              billing: {
                                ...p.billing,
                                initialAmount: e.target.value,
                                futurePayments: splitEvenly(p.billing.futurePayments, remaining),
                              },
                            };
                          })
                        }
                        className="h-9 w-full rounded-lg border border-border bg-background pl-6 pr-3 text-[12px] outline-none focus:border-primary"
                      />
                    </div>
                    <input
                      type="date"
                      value={form.billing.initialDate}
                      onChange={(e) =>
                        setForm((p) => ({ ...p, billing: { ...p.billing, initialDate: e.target.value } }))
                      }
                      className="h-9 w-full rounded-lg border border-border bg-background px-3 text-[12px] outline-none focus:border-primary"
                    />
                  </div>
                </div>

                {/* Future payments */}
                <div className="space-y-1.5 pt-1 border-t border-border">
                  <label className="text-[11px] font-medium text-foreground block pt-2">
                    Future payments
                  </label>
                  <p className="text-[10px] text-muted-foreground">
                    One row is the remaining balance's single due date. Add more to split it into a schedule.
                  </p>
                  <div className="space-y-1.5">
                    {form.billing.futurePayments.map((c, i) => (
                      <div key={c._key} className="flex items-center gap-2">
                        <span className="text-[11px] text-muted-foreground w-5 shrink-0">{i + 1}.</span>
                        <input
                          type="date"
                          value={c.dueDate}
                          onChange={(e) => updateFuturePayment(c._key, "dueDate", e.target.value)}
                          className="h-8 flex-1 rounded-lg border border-border bg-background px-2.5 text-[12px]"
                        />
                        <div className="relative w-28">
                          <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-[11px] text-muted-foreground">$</span>
                          <input
                            type="number"
                            min="0"
                            step="any"
                            placeholder="0.00"
                            value={c.amount}
                            onChange={(e) => updateFuturePayment(c._key, "amount", e.target.value)}
                            className="h-8 w-full rounded-lg border border-border bg-background pl-5 pr-2 text-[12px]"
                          />
                        </div>
                        <button
                          type="button"
                          onClick={() => removeFuturePayment(c._key)}
                          disabled={form.billing.futurePayments.length === 1}
                          className="text-muted-foreground hover:text-destructive disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                          aria-label="Remove payment"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                  <button
                    type="button"
                    onClick={addFuturePayment}
                    className="flex items-center gap-1 h-7 px-2 rounded border border-dashed border-border bg-background text-[11px] font-medium text-muted-foreground hover:text-foreground hover:border-primary transition-colors"
                  >
                    <Plus className="h-3 w-3" /> Add another payment
                  </button>
                </div>

                <div className="space-y-1 pt-2 border-t border-border">
                  <div className="flex items-center justify-between">
                    <p className="text-[11px] text-muted-foreground">Amount left to schedule</p>
                    <p className={`text-[12px] font-semibold ${Math.abs(amountLeftToSchedule) > 0.01 ? "text-destructive" : "text-success"}`}>
                      ${amountLeftToSchedule.toFixed(2)}
                    </p>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-[11px] text-muted-foreground">Payable Balance</p>
                    <p className="text-[13px] font-bold text-foreground">${total.toFixed(2)}</p>
                  </div>
                  {Math.abs(amountLeftToSchedule) > 0.01 && (
                    <p className="text-[10px] text-destructive">Initial payment plus future payments must add up to the payable balance.</p>
                  )}
                </div>
              </div>
            )}
            {form.billingType === "pay_per_session" && (
              <div className="rounded-lg border border-border bg-muted/20 p-3 space-y-2">
                <p className="text-[11px] text-muted-foreground">
                  No upfront payment. A payment is recorded automatically each time a session is booked for the chargeable service.
                </p>
                {chargeableServices.map((s) => {
                  const sessions = Number(s.numberOfSessions || 0);
                  const pricePerSession = Number(s.pricePerSession || 0);
                  const finalAmount = Number(s.finalAmount || 0);
                  const hasDiscount = s.discountType !== "none" && Number(s.discountAmount || 0) > 0;

                  // Build per-session charge list, applying discount from the last session backwards
                  const charges = Array(sessions).fill(pricePerSession);
                  if (hasDiscount) {
                    let remaining = Math.max(0, pricePerSession * sessions - finalAmount);
                    for (let i = sessions - 1; i >= 0 && remaining > 0; i--) {
                      const reduction = Math.min(charges[i], remaining);
                      charges[i] = Math.round((charges[i] - reduction) * 100) / 100;
                      remaining = Math.round((remaining - reduction) * 100) / 100;
                    }
                  }

                  return (
                    <div key={s.serviceCode} className="pt-2 border-t border-border space-y-2">
                      <div className="flex items-center justify-between">
                        <p className="text-[11px] font-semibold text-foreground">{s.serviceName || s.serviceCode}</p>
                        <p className="text-[10px] text-muted-foreground">{sessions} sessions · ${pricePerSession.toFixed(2)}/sess</p>
                      </div>
                      <div className="rounded-md border border-border overflow-hidden">
                        <div className="grid grid-cols-2 bg-muted/40 px-2.5 py-1.5">
                          <span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">Session</span>
                          <span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider text-right">Charge</span>
                        </div>
                        <div className="max-h-48 overflow-y-auto">
                          {charges.map((amount, idx) => {
                            const isDiscounted = hasDiscount && amount < pricePerSession;
                            return (
                              <div key={idx} className={`grid grid-cols-2 px-2.5 py-1.5 ${idx > 0 ? 'border-t border-border' : ''}`}>
                                <span className="text-[11px] text-foreground">Session {idx + 1}</span>
                                <div className="text-right">
                                  {isDiscounted && (
                                    <span className="text-[10px] text-muted-foreground line-through mr-1">${pricePerSession.toFixed(2)}</span>
                                  )}
                                  <span className={`text-[11px] font-semibold ${isDiscounted ? 'text-amber-600 dark:text-amber-400' : 'text-foreground'}`}>
                                    ${amount.toFixed(2)}
                                  </span>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  );
                })}
                <div className="flex items-center justify-between pt-2 border-t border-border">
                  <p className="text-[11px] text-muted-foreground">Total (if all sessions booked)</p>
                  <p className="text-[13px] font-bold text-foreground">
                    ${chargeableServices.reduce((sum, s) => sum + Number(s.finalAmount || 0), 0).toFixed(2)}
                  </p>
                </div>
              </div>
            )}
          </div>

        </div>

        {step === 2 && (
          <div className="space-y-3 pb-1">
            <div className="rounded-lg border border-border bg-muted/20 p-3 space-y-3">
              <div className="flex items-center justify-between">
                <p className="text-[11px] font-medium text-muted-foreground uppercase">
                  Payment Details
                </p>
                <span className="text-[10px] text-muted-foreground capitalize">
                  {form.billingType.replace(/_/g, " ")}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <p className="text-[11px] text-muted-foreground">Payable Balance</p>
                <p className="text-[13px] font-bold text-foreground">${total.toFixed(2)}</p>
              </div>

              {total === 0 ? (
                <p className="text-[11px] text-muted-foreground">
                  This package is free — there is nothing to collect.
                </p>
              ) : form.billingType === "pay_per_session" ? (
                <p className="text-[11px] text-muted-foreground">
                  No upfront payment. A charge is recorded automatically each time a session is booked.
                </p>
              ) : form.billingType === "flexible" ? (
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <p className="text-[11px] text-muted-foreground">Initial payment due</p>
                    <p className="text-[12px] font-semibold text-foreground">
                      ${initialAmount.toFixed(2)}
                      {initialAmount > 0 && <span className="text-muted-foreground font-normal"> · {fmtDate(form.billing.initialDate)}</span>}
                    </p>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-[11px] text-muted-foreground">Remaining balance</p>
                    <p className="text-[12px] font-semibold text-foreground">${(total - initialAmount).toFixed(2)}</p>
                  </div>
                  {form.billing.futurePayments.filter((c) => Number(c.amount) > 0).length > 0 && (
                    <div className="pt-2 border-t border-border space-y-1">
                      <p className="text-[10px] font-medium text-muted-foreground uppercase">Future payments</p>
                      {form.billing.futurePayments
                        .filter((c) => Number(c.amount) > 0)
                        .map((c) => (
                          <div key={c._key} className="flex items-center justify-between">
                            <span className="text-[11px] text-muted-foreground">{fmtDate(c.dueDate)}</span>
                            <span className="text-[11px] font-medium text-foreground">${Number(c.amount).toFixed(2)}</span>
                          </div>
                        ))}
                    </div>
                  )}
                  <div className="pt-2 border-t border-border">
                    {initialAmount > 0 ? (
                      <div className="space-y-2">
                        <p className="text-[11px] font-medium text-foreground">
                          {isLink ? "Send a payment link instead" : "Collect initial payment now"}
                        </p>
                        <PaymentMethodPicker
                          methods={collectMethodOptions}
                          value={form.billing.method}
                          onChange={(v) => setForm((p) => ({ ...p, billing: { ...p.billing, method: v } }))}
                        />
                        {isLink ? (
                          <div className="space-y-1.5">
                            <p className="text-[11px] text-muted-foreground">
                              The enrollment is created unpaid, and a payment link for ${initialAmount.toFixed(2)} is sent to the customer right away.
                            </p>
                            <SendLinkChannelPicker
                              value={form.billing.sendLinkChannel}
                              onChange={(v) => setForm((p) => ({ ...p, billing: { ...p.billing, sendLinkChannel: v } }))}
                            />
                          </div>
                        ) : (
                          <>
                            {form.billing.method === "ach" && (
                              <div className="flex items-center justify-between gap-3 rounded-lg border border-primary/30 bg-primary/5 px-3 py-2">
                                <p className="text-[11px] text-foreground">
                                  Bank transfer redirects off-screen — send a link and let the customer pay from
                                  their phone instead.
                                </p>
                                <button
                                  type="button"
                                  onClick={() =>
                                    setForm((p) => ({ ...p, billing: { ...p.billing, method: SHARE_LINK_METHOD.value } }))
                                  }
                                  className="shrink-0 rounded-md bg-primary px-2.5 py-1.5 text-[11px] font-semibold text-primary-foreground hover:opacity-90"
                                >
                                  Send link instead
                                </button>
                              </div>
                            )}
                            <TerminalDeviceField
                              method={chargeMethod}
                              locationID={locationID}
                              deviceID={deviceID}
                              onDeviceChange={setDeviceID}
                            />
                            <SavedCardField
                              method={form.billing.method}
                              locationID={locationID}
                              customerID={customerID}
                              cardToken={savedCardID}
                              onCardChange={setSavedCardID}
                            />
                            <WalletShortfallField
                              method={form.billing.method}
                              balance={walletBalance}
                              amountDue={collectAmt}
                              walletAmount={form.billing.walletAmount}
                              onWalletAmountChange={(v) => setForm((p) => ({ ...p, billing: { ...p.billing, walletAmount: v } }))}
                              shortfallMethod={form.billing.shortfallMethod}
                              onShortfallMethodChange={(v) => setForm((p) => ({ ...p, billing: { ...p.billing, shortfallMethod: v } }))}
                              methods={shortfallMethodOptions}
                            />
                            <CheckNumberField
                              method={chargeMethod}
                              checkNumber={checkNumber}
                              onChange={setCheckNumber}
                            />
                          </>
                        )}
                      </div>
                    ) : (
                      <p className="text-[11px] text-muted-foreground">No payment is due at enrollment.</p>
                    )}
                  </div>
                  <p className="text-[10px] text-muted-foreground pt-1">
                    To change any amount or date, go back to Step 1.
                  </p>
                </div>
              ) : (
                <>
                  <div className="flex items-center justify-between">
                    <p className="text-[11px] font-medium text-foreground">
                      {collectsFirstInstallment ? "Collect first installment now" : "Collect payment now"}
                    </p>
                    <button
                      type="button"
                      onClick={() =>
                        setForm((p) => ({
                          ...p,
                          billing: { ...p.billing, collectNow: !p.billing.collectNow },
                        }))
                      }
                      className={`relative h-5 w-9 rounded-full transition-colors ${
                        form.billing.collectNow ? "bg-primary" : "bg-muted-foreground/30"
                      }`}
                    >
                      <span
                        className={`absolute top-0.5 left-0.5 h-4 w-4 rounded-full bg-white shadow transition-transform ${
                          form.billing.collectNow ? "translate-x-4" : "translate-x-0"
                        }`}
                      />
                    </button>
                  </div>

                  {form.billing.collectNow && (
                    <div className="space-y-2">
                      <div className="relative">
                        <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-[11px] text-muted-foreground">$</span>
                        <input
                          type="number"
                          min="0"
                          step="any"
                          placeholder="0.00"
                          value={form.billing.collectAmount}
                          readOnly={collectAmountIsFixed}
                          onChange={(e) =>
                            setForm((p) => ({
                              ...p,
                              billing: { ...p.billing, collectAmount: e.target.value },
                            }))
                          }
                          className={`h-9 w-full rounded-lg border border-border pl-6 pr-3 text-[12px] outline-none focus:border-primary ${
                            collectAmountIsFixed ? "bg-muted/30 text-muted-foreground" : "bg-background"
                          }`}
                        />
                      </div>
                      <PaymentMethodPicker
                        methods={collectMethodOptions}
                        value={form.billing.method}
                        onChange={(v) => setForm((p) => ({ ...p, billing: { ...p.billing, method: v } }))}
                      />
                      {form.billing.method === "ach" && (
                        <div className="flex items-center justify-between gap-3 rounded-lg border border-primary/30 bg-primary/5 px-3 py-2">
                          <p className="text-[11px] text-foreground">
                            Bank transfer redirects off-screen — send a link and let the customer pay from their
                            phone instead.
                          </p>
                          <button
                            type="button"
                            onClick={() =>
                              setForm((p) => ({ ...p, billing: { ...p.billing, method: SHARE_LINK_METHOD.value } }))
                            }
                            className="shrink-0 rounded-md bg-primary px-2.5 py-1.5 text-[11px] font-semibold text-primary-foreground hover:opacity-90"
                          >
                            Send link instead
                          </button>
                        </div>
                      )}
                      {isLink && (
                        <div className="space-y-1.5">
                          <p className="text-[11px] text-muted-foreground">
                            The enrollment is created unpaid, and a payment link is sent to the customer right away.
                          </p>
                          <SendLinkChannelPicker
                            value={form.billing.sendLinkChannel}
                            onChange={(v) => setForm((p) => ({ ...p, billing: { ...p.billing, sendLinkChannel: v } }))}
                          />
                        </div>
                      )}
                    </div>
                  )}
                  {form.billing.collectNow && !isLink && (
                    <TerminalDeviceField
                      method={chargeMethod}
                      locationID={locationID}
                      deviceID={deviceID}
                      onDeviceChange={setDeviceID}
                    />
                  )}
                  {form.billing.collectNow && !isLink && (
                    <SavedCardField
                      method={form.billing.method}
                      locationID={locationID}
                      customerID={customerID}
                      cardToken={savedCardID}
                      onCardChange={setSavedCardID}
                    />
                  )}
                  {form.billing.collectNow && !isLink && (
                    <WalletShortfallField
                      method={form.billing.method}
                      balance={walletBalance}
                      amountDue={collectAmt}
                      walletAmount={form.billing.walletAmount}
                      onWalletAmountChange={(v) => setForm((p) => ({ ...p, billing: { ...p.billing, walletAmount: v } }))}
                      shortfallMethod={form.billing.shortfallMethod}
                      onShortfallMethodChange={(v) => setForm((p) => ({ ...p, billing: { ...p.billing, shortfallMethod: v } }))}
                      methods={shortfallMethodOptions}
                    />
                  )}
                  {form.billing.collectNow && !isLink && (
                    <CheckNumberField
                      method={chargeMethod}
                      checkNumber={checkNumber}
                      onChange={setCheckNumber}
                    />
                  )}
                  {form.billing.collectNow && !isLink && (
                    <div className="space-y-1">
                      <label className="text-[11px] text-muted-foreground">Payment date</label>
                      <input
                        type="date"
                        value={effectiveCollectDate}
                        onChange={(e) => {
                          setCollectDateTouched(true);
                          setForm((p) => ({
                            ...p,
                            billing: { ...p.billing, collectDate: e.target.value },
                          }));
                        }}
                        className="h-9 w-full rounded-lg border border-border bg-background px-3 text-[12px] outline-none focus:border-primary"
                      />
                    </div>
                  )}
                </>
              )}
            </div>

            {autopayAvailable && (
              <AutopayOption
                on={autopayOn}
                onToggle={(next) => {
                  setAutopayOn(next);
                  // Start from the card already picked for today's payment.
                  if (next && !autopayCardID && form.billing.method === "saved_card") setAutopayCardID(savedCardID);
                }}
                card={autopayCardID}
                onCardChange={setAutopayCardID}
                customerID={customerID}
                locationID={locationID}
                covers={form.billingType === "flexible" ? "Future payments are" : "Installments not collected today are"}
              />
            )}
          </div>
        )}
      </div>

      {/* ── Tip for teacher ── */}
      {step === 2 && !readerCollectsTip && (
        <div className="shrink-0 mt-3 rounded-lg border border-border bg-muted/20 p-3 space-y-2">
          <div className="flex items-center justify-between">
            <p className="text-[11px] font-medium text-muted-foreground">
              Add a tip?
            </p>
            <button
              type="button"
              onClick={() =>
                setForm((p) => ({
                  ...p,
                  tip: { ...p.tip, enabled: !p.tip.enabled },
                }))
              }
              className={`relative h-5 w-9 rounded-full transition-colors ${
                form.tip.enabled ? "bg-primary" : "bg-muted-foreground/30"
              }`}
            >
              <span
                className={`absolute top-0.5 left-0.5 h-4 w-4 rounded-full bg-white shadow transition-transform ${
                  form.tip.enabled ? "translate-x-4" : "translate-x-0"
                }`}
              />
            </button>
          </div>
          {form.tip.enabled && (
            <div className="flex gap-2">
              <div className="relative flex-1">
                <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-[12px] text-muted-foreground">
                  $
                </span>
                <input
                  type="number"
                  min="0"
                  step="any"
                  placeholder="0.00"
                  value={form.tip.amount}
                  onChange={(e) =>
                    setForm((p) => ({
                      ...p,
                      tip: { ...p.tip, amount: e.target.value },
                    }))
                  }
                  className="h-9 w-full rounded-lg border border-border bg-background pl-6 pr-3 text-[12px] outline-none focus:border-primary"
                />
              </div>
              <div className="relative w-32">
                <select
                  value={form.tip.method}
                  onChange={(e) =>
                    setForm((p) => ({
                      ...p,
                      tip: { ...p.tip, method: e.target.value },
                    }))
                  }
                  className="h-9 w-full appearance-none rounded-lg border border-border bg-background px-3 pr-8 text-[12px] capitalize"
                >
                  {TIP_METHODS.map((m) => (
                    <option key={m.value} value={m.value}>
                      {m.label}
                    </option>
                  ))}
                </select>
                <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
              </div>
            </div>
          )}
          {form.tip.enabled && (
            <p className="text-[10px] text-muted-foreground">
              {form.teacherID
                ? "Goes to this teacher, or to the studio tip pool if this location pools tips (Settings → Studio → Locations)."
                : "No teacher on this enrollment — it goes to the studio tip pool if this location pools tips, otherwise it is recorded without a teacher."}
            </p>
          )}
        </div>
      )}

      {error && <p className="text-[11px] text-destructive mt-2">{error}</p>}

      <div className="flex justify-between gap-2 pt-2 mt-auto border-t border-border/60">
        <button
          type="button"
          className="h-8 px-3 rounded-lg border border-border text-[11px]"
          onClick={step === 1 ? onCancel : () => { setError(""); setStep(1); }}
        >
          {step === 1 ? "Cancel" : "Back"}
        </button>
        {step === 1 ? (
          <button
            type="button"
            className="h-8 px-3 rounded-lg bg-brand text-brand-foreground text-[11px] font-semibold disabled:opacity-60"
            onClick={goToPayment}
            disabled={serviceOnly ? form.services.length === 0 : !form.packageID}
          >
            Next: Payment →
          </button>
        ) : (
          <button
            type="button"
            className="h-8 px-3 rounded-lg bg-brand text-brand-foreground text-[11px] font-semibold disabled:opacity-60"
            onClick={() => handleSubmit()}
            disabled={loading || (serviceOnly ? form.services.length === 0 : !form.packageID) || walletOver || cloverNotConnected || terminalNotSelected || savedCardNotSelected || autopayNotSelected}
          >
            {loading ? "Creating…" : payWithClover ? "Pay by card" : serviceOnly ? "Create Enrollment & Services" : "Create Enrollment & Package"}
          </button>
        )}
      </div>
    </div>
  );
}
