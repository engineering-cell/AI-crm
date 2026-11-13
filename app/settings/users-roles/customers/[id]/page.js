"use client";

import { useState, useEffect, useCallback, useMemo, useRef, Fragment } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  ArrowLeft,
  Pencil,
  Plus,
  Trash2,
  Pin,
  PinOff,
  BookOpen,
  StickyNote,
  User,
  ChevronDown,
  X,
  CreditCard,
  Wallet,
  RotateCcw,
  Receipt,
  ClipboardList,
  Users,
  FileText,
  Send,
  Tag,
  Sparkles,
  Calendar,
  CalendarX,
  Clock,
  CheckCircle,
  XCircle,
  AlertTriangle,
  History,
} from "lucide-react";
import MainLayout from "@/components/layout/MainLayout";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import CreateEnrollmentSheet from "@/components/enrollment/CreateEnrollmentSheet";
import { CreateEventPurchaseDialog } from "@/app/settings/setup/components/EventsPurchases";
import CustomerMembershipsTab from "@/components/membership/CustomerMembershipsTab";
import CustomerWalletTab from "@/components/wallet/CustomerWalletTab";
import { useTerminalChargeSettled } from "@/lib/hooks/useTerminalChargeSettled";
import CancelRefundDialog from "@/components/shared/CancelRefundDialog";
import ConfirmStatusOverrideDialog from "@/components/customers/ConfirmStatusOverrideDialog";
import CustomerStatusHistory from "@/components/customers/CustomerStatusHistory";
import CustomerInboxThread from "@/components/customers/CustomerInboxThread";
import LoadingSpinner from "@/components/shared/LoadingSpinner";
import LocationSelector from "@/components/shared/LocationSelector";
import SendPaymentLinkMenu from "@/components/payments/SendPaymentLinkMenu";
import AutopayControl from "@/components/payments/AutopayControl";
import PayInstallmentDialog from "@/components/payments/PayInstallmentDialog";
import PaymentDueCard from "@/components/payments/PaymentDueCard";
import api from "@/lib/api";
import { hasPermission } from "@/lib/permissions";
import { deriveEffectiveStatus } from "@/lib/eventStatus";
import { resolveLocationID } from "@/app/settings/payments/clover/useCloverConnection";
import { useCardProcessor } from "@/app/settings/payments/useCardProcessor";
import {
  openCheckoutTab,
  navigateCheckoutTab,
  closeCheckoutTab,
  CHECKOUT_TOAST,
} from "@/lib/clover";
import { PAYMENT_METHODS, NO_DEVICE_PAYMENT_METHODS } from "@/lib/paymentMethods";
import {
  dateInputToISO,
  todayDateInput,
  toDateInput,
  toStudioLocalDate,
  formatStudioDate,
  formatStudioTime,
} from "@/lib/studioLocalDate";
import { getStudioTimezone } from "@/lib/studioTimezone";
import { fetchWalletBalance } from "@/lib/wallet";
import { useToast } from "@/components/ui/toast";
import { getInitials, formatDate, formatDateTime, roundSessions } from "@/lib/utils";
import EnrollmentServicesTable from "./EnrollmentServicesTable";
import {
  customerLifecycleColor,
  customerLifecycleLabel,
  CUSTOMER_LIFECYCLE_STATUS_OPTIONS,
} from "@/lib/customer-lifecycle";
import { useCustomerLifecycleStatuses } from "@/lib/use-customer-lifecycle";
import StatusColorBadge from "@/components/shared/StatusColorBadge";
import { formatReasonLabel } from "@/lib/dynamic-list-normalize";
import { extractLeadReasonsList } from "@/lib/workflow-normalize";
import { buildPackageSessionOrder, resolveEventPayment, membershipCoverageFor, buildPaymentContext, isPayableLesson } from "@/lib/event-payment";
import { useUnpaidLessons } from "@/lib/hooks/useUnpaidLessons";
// ─── helpers ────────────────────────────────────────────────────────────────

// Short name for an enrollment. A real package uses its template name; a
// services-only sale ("Services") is named by the service(s) it holds instead.
function enrollmentDisplayName(enr) {
  const pkg = enr?.package;
  if (!pkg) return enr?.label ?? "";
  if (pkg.packageRef) {
    return pkg.packageName ?? pkg.packageRef?.packageName ?? enr?.label ?? "";
  }
  const svcNames = [
    ...new Set(
      (pkg.services ?? [])
        .map((s) => s.serviceName || s.serviceCode)
        .filter(Boolean),
    ),
  ].join(", ");
  return enr?.label || svcNames || pkg.packageName || "";
}

function statusColor(status) {
  return (
    {
      active: "bg-success/10 text-success",
      expired: "bg-warning/10 text-warning",
      exhausted: "bg-rose-500/10 text-rose-600",
      cancelled: "bg-muted text-muted-foreground",
    }[status] ?? "bg-muted text-muted-foreground"
  );
}

function paymentStatusColor(ps) {
  return (
    {
      paid: "bg-success/10 text-success",
      partial: "bg-warning/10 text-warning",
      unpaid: "bg-rose-500/10 text-rose-600",
      payment_pending: "bg-warning/10 text-warning",
    }[ps] ?? "bg-muted text-muted-foreground"
  );
}

function paymentStatusLabel(ps) {
  return ps === "payment_pending" ? "payment pending" : (ps ?? "unpaid");
}

function paymentTypeBadge(type) {
  return (
    {
      package_purchase: {
        label: "Package Sale",
        cls: "bg-info/10 text-info",
      },
      credit_topup: {
        label: "Credit Top-up",
        cls: "bg-violet-500/10 text-violet-600",
      },
      refund: { label: "Refund", cls: "bg-rose-500/10 text-rose-600" },
    }[type] ?? { label: type, cls: "bg-muted text-muted-foreground" }
  );
}


function SessionBar({ used, total }) {
  const pct = total > 0 ? Math.min(100, (used / total) * 100) : 0;
  return (
    <div className="flex items-center gap-2 mt-0.5">
      <div className="flex-1 h-1.5 rounded-full bg-muted overflow-hidden">
        <div
          className="h-full rounded-full bg-primary transition-all"
          style={{ width: `${pct}%` }}
        />
      </div>
      <span className="text-[11px] text-muted-foreground shrink-0">
        {roundSessions(total - used)} left / {roundSessions(total)}
      </span>
    </div>
  );
}

function FormField({ label, required, children }) {
  return (
    <div className="space-y-1.5">
      <label className="block text-[12px] font-medium text-muted-foreground">
        {label}
        {required && <span className="text-destructive ml-0.5">*</span>}
      </label>
      {children}
    </div>
  );
}

// ─── IssueRefundDialog ───────────────────────────────────────────────────────

const refIdOf = (ref) => ref?._id ?? ref ?? null;

// Where the refunded money goes. Wallet keeps it with the studio as store credit, so
// nothing goes back to the card; Cash or Card returns card-taken money to that card.
const REFUND_DESTINATIONS = [
  { value: "wallet", label: "Wallet (store credit)" },
  { value: "cash", label: "Cash" },
  { value: "card", label: "Card" },
];

function IssueRefundDialog({ open, onClose, payment, customerID, onSuccess }) {
  const [amount, setAmount] = useState("");
  const [destination, setDestination] = useState("wallet");
  const [notes, setNotes] = useState("");
  const [saving, setSaving] = useState(false);
  const toast = useToast();

  function reset() {
    setAmount("");
    setDestination("wallet");
    setNotes("");
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const num = parseFloat(amount);
    if (isNaN(num) || num <= 0) return;
    setSaving(true);
    // The endpoint refunds against a customer's payments, not a paymentID — it was being
    // sent one, so the required fields were missing and every refund failed.
    const res = await api.post("/api/payment/refund", {
      customerID,
      enrollmentID: refIdOf(payment.enrollmentID) || undefined,
      method: destination,
      amount: num,
      notes: notes.trim() || undefined,
    });
    if (res.success) {
      toast.success("Refund issued.");
      reset();
      onSuccess();
      onClose();
    } else {
      toast.error(res.error || "Failed to issue refund.");
    }
    setSaving(false);
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(v) => {
        if (!v) {
          reset();
          onClose();
        }
      }}
    >
      <DialogContent className="max-w-sm">
        <DialogHeader>
          <DialogTitle>Issue Refund</DialogTitle>
        </DialogHeader>
        {payment && (
          <p className="text-[12px] text-muted-foreground -mt-1">
            Original payment:{" "}
            <span className="text-foreground font-medium">
              ${Number(payment.amount).toFixed(2)}
            </span>{" "}
            via {payment.method}
          </p>
        )}
        <form onSubmit={handleSubmit} className="space-y-4 mt-2">
          <FormField label="Refund amount" required>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[13px] text-muted-foreground">
                $
              </span>
              <input
                type="number"
                min="0.01"
                step="any"
                max={payment?.amount}
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0.00"
                className="h-9 w-full rounded-lg border border-border bg-background pl-7 pr-3 text-[13px] outline-none focus:border-primary"
              />
            </div>
          </FormField>
          <FormField label="Refund to" required>
            <select
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              className="h-9 w-full rounded-lg border border-border bg-background px-3 text-[13px] outline-none focus:border-primary"
            >
              {REFUND_DESTINATIONS.map((d) => (
                <option key={d.value} value={d.value}>
                  {d.label}
                </option>
              ))}
            </select>
            {destination === "wallet" && (
              <p className="mt-1 text-[11px] text-muted-foreground">
                Added to the customer's wallet to spend on a future purchase.
              </p>
            )}
          </FormField>
          <FormField label="Reason (optional)">
            <input
              type="text"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="e.g. Class cancelled"
              className="h-9 w-full rounded-lg border border-border bg-background px-3 text-[13px] outline-none focus:border-primary"
            />
          </FormField>
          <div className="flex justify-end gap-2 pt-1">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => {
                reset();
                onClose();
              }}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              size="sm"
              disabled={saving || !amount}
              className="bg-rose-600 hover:bg-rose-700 text-white"
            >
              {saving ? "Refunding…" : "Issue Refund"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

// ─── Tags ────────────────────────────────────────────────────────────────────

function TagsEditor({ customer, onUpdated }) {
  const [draft, setDraft] = useState("");
  const [saving, setSaving] = useState(false);
  const [orgTags, setOrgTags] = useState([]);
  const toast = useToast();
  const tags = customer.tags || [];

  useEffect(() => {
    api.get("/api/customer/tags").then((res) => {
      if (res.success) setOrgTags(res.data || []);
    });
  }, []);

  async function saveTags(nextTags) {
    setSaving(true);
    const res = await api.put(`/api/customer/${customer._id}`, {
      tags: nextTags,
    });
    if (res.success) {
      onUpdated();
      setOrgTags((prev) => [...new Set([...prev, ...nextTags])].sort());
    } else {
      toast.error(res.error || "Failed to update tags.");
    }
    setSaving(false);
  }

  function addTag(e) {
    e.preventDefault();
    const value = draft.trim();
    if (!value || tags.includes(value)) return;
    setDraft("");
    saveTags([...tags, value]);
  }

  function removeTag(tag) {
    saveTags(tags.filter((t) => t !== tag));
  }

  const suggestions = orgTags.filter((t) => !tags.includes(t));
  const autoTags = customer.autoTags || [];

  return (
    <div>
      <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wide mb-3">
        Tags
      </p>
      <div className="flex flex-wrap gap-1.5 mb-3">
        {tags.length === 0 && autoTags.length === 0 && (
          <p className="text-[13px] text-muted-foreground">No tags yet.</p>
        )}
        {autoTags.map((tag) => (
          <span
            key={`auto-${tag}`}
            title="Automatically applied — recomputed nightly"
            className="inline-flex items-center gap-1 rounded-full bg-muted px-2.5 py-1 text-[11px] font-medium text-muted-foreground"
          >
            <Tag className="h-3 w-3" />
            {tag}
          </span>
        ))}
        {tags.map((tag) => (
          <span
            key={tag}
            className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-2.5 py-1 text-[11px] font-medium text-primary"
          >
            <Tag className="h-3 w-3" />
            {tag}
            <button
              type="button"
              disabled={saving}
              onClick={() => removeTag(tag)}
              className="ml-0.5 rounded-full p-0.5 hover:bg-primary/20"
            >
              <X className="h-3 w-3" />
            </button>
          </span>
        ))}
      </div>

      {suggestions.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mb-3">
          {suggestions.map((tag) => (
            <button
              key={tag}
              type="button"
              disabled={saving}
              onClick={() => saveTags([...tags, tag])}
              className="inline-flex items-center gap-1 rounded-full border border-dashed border-border px-2.5 py-1 text-[11px] font-medium text-muted-foreground hover:border-primary hover:text-primary"
            >
              <Plus className="h-3 w-3" />
              {tag}
            </button>
          ))}
        </div>
      )}

      <form onSubmit={addTag} className="flex gap-2">
        <input
          type="text"
          list="tag-suggestions"
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          placeholder="Add a tag…"
          className="h-8 flex-1 max-w-[200px] rounded-lg border border-border bg-background px-2.5 text-[12px] text-foreground outline-none focus:border-primary"
        />
        <datalist id="tag-suggestions">
          {orgTags.map((tag) => (
            <option key={tag} value={tag} />
          ))}
        </datalist>
        <Button
          type="submit"
          size="sm"
          variant="outline"
          className="h-8 px-2.5"
          disabled={saving || !draft.trim()}
        >
          <Plus className="h-3.5 w-3.5" />
        </Button>
      </form>
    </div>
  );
}

// ─── Profile Tab ─────────────────────────────────────────────────────────────

function ProfileTab({ customer, locations, onUpdated }) {
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({});
  const [saving, setSaving] = useState(false);
  // Holds the refused payload + violations while the admin decides whether to override.
  const [overridePrompt, setOverridePrompt] = useState(null);
  const [leadReasons, setLeadReasons] = useState([]);
  const { statuses: lifecycleStatuses } = useCustomerLifecycleStatuses();
  const lifecycleOptions = lifecycleStatuses.length
    ? lifecycleStatuses.map((s) => ({ value: s.value, label: s.label }))
    : CUSTOMER_LIFECYCLE_STATUS_OPTIONS;
  // Quick-save for just the callback date, without entering full profile
  // edit mode — mirrors saveCallbackDate() in app/leads/components/LeadsDialog.js
  // so Customers gets the same "update the follow-up reminder in one click"
  // UX Leads already has, instead of requiring the whole profile form.
  const [callbackDateDraft, setCallbackDateDraft] = useState(
    customer.callbackDate ? String(customer.callbackDate).slice(0, 10) : "",
  );
  const [savingCallbackDate, setSavingCallbackDate] = useState(false);
  const [customerEvents, setCustomerEvents] = useState([]);
  const toast = useToast();

  useEffect(() => {
    api.get("/api/lead-reasons").then((res) => {
      if (res?.success) setLeadReasons(extractLeadReasonsList(res));
    });
  }, []);

  useEffect(() => {
    setCallbackDateDraft(
      customer.callbackDate ? String(customer.callbackDate).slice(0, 10) : "",
    );
  }, [customer?._id, customer?.callbackDate]);

  async function saveCallbackDate() {
    if (!customer?._id) return;
    setSavingCallbackDate(true);
    const res = await api.put(`/api/customer/${customer._id}`, {
      callbackDate: callbackDateDraft || null,
    });
    if (res.success) {
      toast.success("Callback date updated.");
      onUpdated();
    } else {
      toast.error(res.error || "Unable to update callback date.");
    }
    setSavingCallbackDate(false);
  }

  useEffect(() => {
    if (!customer?._id) return;
    const now = new Date();
    const past = new Date(now);
    past.setDate(past.getDate() - 60);
    const future = new Date(now);
    future.setDate(future.getDate() + 60);
    const params = new URLSearchParams({
      start: past.toISOString(),
      end: future.toISOString(),
      limit: 200,
    });
    api.get(`/api/calendar?${params}`).then((res) => {
      if (res.success && Array.isArray(res.data)) {
        const custId = String(customer._id);
        const filtered = res.data.filter((ev) => {
          const ids = Array.isArray(ev.customerIDs) ? ev.customerIDs : [];
          return ids.some((c) => String(c?._id ?? c) === custId);
        });
        setCustomerEvents(filtered);
      }
    });
  }, [customer?._id]);

  function startEdit() {
    setForm({
      name: customer.name || "",
      email: customer.email || "",
      phoneNumber: customer.phoneNumber || "",
      locationID: Array.isArray(customer.locationID)
        ? customer.locationID.map((l) => String(l?._id ?? l)).filter(Boolean)
        : customer.locationID
          ? [String(customer.locationID?._id ?? customer.locationID)]
          : [],
      dateOfBirth: customer.dateOfBirth
        ? String(customer.dateOfBirth).slice(0, 10)
        : "",
      gender: customer.gender || "",
      callbackDate: customer.callbackDate
        ? String(customer.callbackDate).slice(0, 10)
        : "",
      lifecycleStatus: customer.lifecycleStatus || "active",
      address: {
        street: customer.address?.street || "",
        city: customer.address?.city || "",
        state: customer.address?.state || "",
        zipCode: customer.address?.zipCode || "",
        country: customer.address?.country || "USA",
      },
    });
    setEditing(true);
  }

  // Built once and reused for the override retry, so the second attempt sends exactly
  // the same payload as the first plus the reason — never a subtly different one.
  function buildProfilePayload() {
    const addr = {
      street: form.address.street.trim(),
      city: form.address.city.trim(),
      state: form.address.state.trim(),
      zipCode: form.address.zipCode.trim(),
      country: form.address.country.trim() || "USA",
    };
    const hasAddress = addr.street || addr.city || addr.state || addr.zipCode;
    return {
      name: form.name.trim(),
      email: form.email.trim(),
      phoneNumber: form.phoneNumber.trim() || undefined,
      locationID: form.locationID || undefined,
      dateOfBirth: form.dateOfBirth || undefined,
      gender: form.gender || undefined,
      callbackDate: form.callbackDate || null,
      lifecycleStatus: form.lifecycleStatus || "active",
      address: hasAddress ? addr : undefined,
    };
  }

  async function submitProfile(payload) {
    const res = await api.put(`/api/customer/${customer._id}`, payload);
    if (res.success) {
      toast.success("Profile saved.");
      onUpdated();
      setEditing(false);
      setOverridePrompt(null);
      return true;
    }
    // A failing entry requirement is not an error to report and forget — the admin may
    // have a legitimate reason, so offer the override rather than a dead end.
    if (res.errorData?.code === "STATUS_REQUIREMENTS_NOT_MET") {
      setOverridePrompt({
        payload,
        violations: res.errorData.violations || [],
        statusLabel: customerLifecycleLabel(payload.lifecycleStatus, lifecycleStatuses),
      });
      return false;
    }
    toast.error(res.error || "Save failed.");
    return false;
  }

  async function saveProfile(e) {
    e.preventDefault();
    if (!form.name.trim()) return;
    if (!Array.isArray(form.locationID) || form.locationID.length === 0) {
      toast.error("Please select at least one location.");
      return;
    }
    setSaving(true);
    await submitProfile(buildProfilePayload());
    setSaving(false);
  }

  async function confirmStatusOverride(reason) {
    if (!overridePrompt) return;
    setSaving(true);
    await submitProfile({ ...overridePrompt.payload, statusOverrideReason: reason });
    setSaving(false);
  }

  const locationName = (raw) => {
    const ids = Array.isArray(raw)
      ? raw.map((l) => String(l?._id ?? l)).filter(Boolean)
      : raw
        ? [String(raw?._id ?? raw)]
        : [];
    if (!ids.length) return "—";
    const names = ids
      .map((id) => locations.find((l) => String(l._id) === id)?.name)
      .filter(Boolean);
    if (!names.length) return "—";
    if (names.length <= 2) return names.join(", ");
    return `${names.slice(0, 2).join(", ")} +${names.length - 2}`;
  };

  return (
    <div className="space-y-6">
      {/* Session totals and balances live on Overview — this view is the record itself. */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Info card */}
        <div className="lg:col-span-2 rounded-xl border border-border bg-card p-6 space-y-5">
          <div className="flex items-center justify-between">
            <h2 className="text-[13px] font-semibold text-foreground">
              Personal details
            </h2>
            {!editing && (
              <Button
                variant="outline"
                size="sm"
                className="h-7 px-2.5 text-[12px]"
                onClick={startEdit}
              >
                <Pencil className="h-3 w-3 mr-1.5" /> Edit
              </Button>
            )}
          </div>

          {editing ? (
            <form onSubmit={saveProfile} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <FormField label="Name" required>
                  <input
                    type="text"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="h-9 w-full rounded-lg border border-border bg-background px-3 text-[13px] outline-none focus:border-primary"
                  />
                </FormField>
                <FormField label="Email">
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) =>
                      setForm({ ...form, email: e.target.value })
                    }
                    className="h-9 w-full rounded-lg border border-border bg-background px-3 text-[13px] outline-none focus:border-primary"
                  />
                </FormField>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <FormField label="Phone">
                  <input
                    type="tel"
                    value={form.phoneNumber}
                    onChange={(e) =>
                      setForm({ ...form, phoneNumber: e.target.value })
                    }
                    className="h-9 w-full rounded-lg border border-border bg-background px-3 text-[13px] outline-none focus:border-primary"
                  />
                </FormField>
                <FormField label="Location">
                  <LocationSelector
                    value={
                      Array.isArray(form.locationID)
                        ? form.locationID
                        : form.locationID
                          ? [form.locationID]
                          : []
                    }
                    onChange={(ids) => setForm({ ...form, locationID: ids })}
                    multiple
                    showAllOption={false}
                    placeholder="Select location(s)…"
                  />
                </FormField>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <FormField label="Date of Birth">
                  <input
                    type="date"
                    value={form.dateOfBirth}
                    onChange={(e) =>
                      setForm({ ...form, dateOfBirth: e.target.value })
                    }
                    className="h-9 w-full rounded-lg border border-border bg-background px-3 text-[13px] outline-none focus:border-primary"
                  />
                </FormField>
                <FormField label="Gender">
                  <div className="relative">
                    <select
                      value={form.gender}
                      onChange={(e) =>
                        setForm({ ...form, gender: e.target.value })
                      }
                      className="h-9 w-full appearance-none rounded-lg border border-border bg-background px-3 pr-8 text-[13px] outline-none focus:border-primary"
                    >
                      <option value="">Select…</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                      <option value="prefer_not_to_say">
                        Prefer not to say
                      </option>
                    </select>
                    <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
                  </div>
                </FormField>
                <FormField label="Callback date">
                  <input
                    type="date"
                    value={form.callbackDate}
                    onChange={(e) =>
                      setForm({ ...form, callbackDate: e.target.value })
                    }
                    className="h-9 w-full rounded-lg border border-border bg-background px-3 text-[13px] outline-none focus:border-primary"
                  />
                </FormField>
                <FormField label="Lifecycle status">
                  <div className="relative">
                    <select
                      value={form.lifecycleStatus || "active"}
                      onChange={(e) =>
                        setForm({ ...form, lifecycleStatus: e.target.value })
                      }
                      className="h-9 w-full appearance-none rounded-lg border border-border bg-background px-3 pr-8 text-[13px] outline-none focus:border-primary"
                    >
                      {lifecycleOptions.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                          {opt.label}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
                  </div>
                </FormField>
              </div>
              <div className="space-y-2 rounded-lg border border-border bg-muted/20 p-3">
                <p className="text-[12px] font-semibold text-muted-foreground">
                  Address
                </p>
                <FormField label="Street">
                  <input
                    type="text"
                    value={form.address.street}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        address: { ...form.address, street: e.target.value },
                      })
                    }
                    className="h-9 w-full rounded-lg border border-border bg-background px-3 text-[13px] outline-none focus:border-primary"
                  />
                </FormField>
                <div className="grid grid-cols-2 gap-3">
                  <FormField label="City">
                    <input
                      type="text"
                      value={form.address.city}
                      onChange={(e) =>
                        setForm({
                          ...form,
                          address: { ...form.address, city: e.target.value },
                        })
                      }
                      className="h-9 w-full rounded-lg border border-border bg-background px-3 text-[13px] outline-none focus:border-primary"
                    />
                  </FormField>
                  <FormField label="State">
                    <input
                      type="text"
                      value={form.address.state}
                      onChange={(e) =>
                        setForm({
                          ...form,
                          address: { ...form.address, state: e.target.value },
                        })
                      }
                      className="h-9 w-full rounded-lg border border-border bg-background px-3 text-[13px] outline-none focus:border-primary"
                    />
                  </FormField>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <FormField label="Zip Code">
                    <input
                      type="text"
                      value={form.address.zipCode}
                      onChange={(e) =>
                        setForm({
                          ...form,
                          address: { ...form.address, zipCode: e.target.value },
                        })
                      }
                      className="h-9 w-full rounded-lg border border-border bg-background px-3 text-[13px] outline-none focus:border-primary"
                    />
                  </FormField>
                  <FormField label="Country">
                    <input
                      type="text"
                      value={form.address.country}
                      onChange={(e) =>
                        setForm({
                          ...form,
                          address: { ...form.address, country: e.target.value },
                        })
                      }
                      className="h-9 w-full rounded-lg border border-border bg-background px-3 text-[13px] outline-none focus:border-primary"
                    />
                  </FormField>
                </div>
              </div>
              <div className="flex gap-2 pt-1">
                <Button type="submit" size="sm" disabled={saving}>
                  {saving ? "Saving…" : "Save"}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setEditing(false)}
                >
                  Cancel
                </Button>
              </div>
            </form>
          ) : (
            <div className="space-y-5">
              {/* Contact */}
              <div>
                <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wide mb-3">
                  Contact
                </p>
                <div className="grid grid-cols-2 gap-x-8 gap-y-4">
                  {[
                    { label: "Name", value: customer.name },
                    { label: "Email", value: customer.email },
                    { label: "Phone", value: customer.phoneNumber || "—" },
                    {
                      label: "Location",
                      value: locationName(customer.locationID),
                    },
                  ].map(({ label, value }) => (
                    <div key={label}>
                      <p className="text-[11px] text-muted-foreground mb-0.5">
                        {label}
                      </p>
                      <p className="text-[13px] text-foreground break-all">
                        {value}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="border-t border-border" />

              {/* Personal */}
              <div>
                <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wide mb-3">
                  Personal
                </p>
                <div className="grid grid-cols-2 gap-x-8 gap-y-4">
                  <div>
                    <p className="text-[11px] text-muted-foreground mb-0.5">
                      Date of Birth
                    </p>
                    <p className="text-[13px] text-foreground">
                      {customer.dateOfBirth
                        ? formatDate(customer.dateOfBirth)
                        : "—"}
                    </p>
                  </div>
                  <div>
                    <p className="text-[11px] text-muted-foreground mb-0.5">
                      Gender
                    </p>
                    <p className="text-[13px] text-foreground">
                      {customer.gender
                        ? customer.gender
                            .replace(/_/g, " ")
                            .replace(/\b\w/g, (c) => c.toUpperCase())
                        : "—"}
                    </p>
                  </div>
                  <div>
                    <p className="text-[11px] text-muted-foreground mb-0.5">
                      Callback date
                    </p>
                    <div className="flex items-center gap-2">
                      <input
                        type="date"
                        value={callbackDateDraft}
                        onChange={(e) => setCallbackDateDraft(e.target.value)}
                        className="h-8 rounded-lg border border-border bg-background px-2.5 text-[13px] outline-none focus:border-primary"
                      />
                      <Button
                        type="button"
                        size="sm"
                        variant="outline"
                        onClick={saveCallbackDate}
                        disabled={
                          savingCallbackDate ||
                          callbackDateDraft ===
                            (customer.callbackDate
                              ? String(customer.callbackDate).slice(0, 10)
                              : "")
                        }
                        className="h-8 shrink-0 px-2.5 text-[12px]"
                      >
                        {savingCallbackDate ? "Saving..." : "Save"}
                      </Button>
                    </div>
                  </div>
                  <div>
                    <p className="text-[11px] text-muted-foreground mb-0.5">
                      Lifecycle status
                    </p>
                    <StatusColorBadge
                      color={customerLifecycleColor(
                        customer.lifecycleStatus,
                        lifecycleStatuses
                      )}
                      className="px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide"
                    >
                      {customerLifecycleLabel(
                        customer.lifecycleStatus,
                        lifecycleStatuses
                      )}
                    </StatusColorBadge>
                  </div>
                  <div>
                    <p className="text-[11px] text-muted-foreground mb-0.5">
                      Reason
                    </p>
                    <p className="text-[13px] text-foreground">
                      {customer.reason
                        ? formatReasonLabel(customer.reason, leadReasons)
                        : "—"}
                    </p>
                  </div>
                  {customer.actualReason ? (
                    <div className="col-span-2">
                      <p className="text-[11px] text-muted-foreground mb-0.5">
                        Their Words
                      </p>
                      <p className="text-[13px] text-foreground italic whitespace-pre-wrap">
                        “{customer.actualReason}”
                      </p>
                    </div>
                  ) : null}
                </div>
              </div>

              <div className="border-t border-border" />

              {/* Address */}
              <div>
                <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wide mb-3">
                  Address
                </p>
                {(() => {
                  const a = customer.address;
                  const hasAny =
                    a &&
                    [a.street, a.city, a.state, a.zipCode, a.country].some(
                      Boolean,
                    );
                  if (!hasAny)
                    return (
                      <p className="text-[13px] text-muted-foreground">—</p>
                    );
                  return (
                    <div className="grid grid-cols-2 gap-x-8 gap-y-4">
                      {[
                        { label: "Street", value: a.street },
                        { label: "City", value: a.city },
                        { label: "State", value: a.state },
                        { label: "Zip Code", value: a.zipCode },
                        { label: "Country", value: a.country },
                      ].map(({ label, value }) => (
                        <div key={label}>
                          <p className="text-[11px] text-muted-foreground mb-0.5">
                            {label}
                          </p>
                          <p className="text-[13px] text-foreground">
                            {value || "—"}
                          </p>
                        </div>
                      ))}
                    </div>
                  );
                })()}
              </div>

              <div className="border-t border-border" />

              {/* Tags */}
              <TagsEditor customer={customer} onUpdated={onUpdated} />
            </div>
          )}
        </div>

        {/* Event cards */}
        <div className="flex flex-col gap-4">
          {/* Upcoming events */}
          <div className="rounded-xl border border-border bg-card p-5 flex flex-col gap-3">
            <h2 className="text-[13px] font-semibold text-foreground">
              Upcoming Events
            </h2>
            {(() => {
              const now = new Date();
              const upcoming = customerEvents
                .filter((ev) => new Date(ev.startDateTime) > now)
                .sort(
                  (a, b) =>
                    new Date(a.startDateTime) - new Date(b.startDateTime),
                )
                .slice(0, 3);
              if (!upcoming.length)
                return (
                  <p className="text-[12px] text-muted-foreground">
                    No upcoming events.
                  </p>
                );
              return upcoming.map((ev, i) => {
                const date = toStudioLocalDate(new Date(ev.startDateTime), getStudioTimezone());
                const instructor = ev.teacherID?.name;
                const label = ev.title || ev.calendarServiceID?.name || "Event";
                return (
                  <div
                    key={ev._id ?? i}
                    className="flex flex-col gap-0.5 rounded-lg bg-muted/40 px-3 py-2.5"
                  >
                    <span className="text-[12px] font-medium text-foreground leading-snug">
                      {label}
                    </span>
                    <span className="text-[11px] text-muted-foreground">
                      {date.toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                      {" · "}
                      {date.toLocaleTimeString("en-US", {
                        hour: "numeric",
                        minute: "2-digit",
                      })}
                    </span>
                    {instructor && (
                      <span className="text-[11px] text-muted-foreground">
                        with {instructor}
                      </span>
                    )}
                  </div>
                );
              });
            })()}
          </div>

          {/* Recent completed events */}
          <div className="rounded-xl border border-border bg-card p-5 flex flex-col gap-3">
            <h2 className="text-[13px] font-semibold text-foreground">
              Recent Completed
            </h2>
            {(() => {
              const now = new Date();
              const past = customerEvents
                .filter(
                  (ev) => new Date(ev.endDateTime ?? ev.startDateTime) <= now,
                )
                .sort(
                  (a, b) =>
                    new Date(b.startDateTime) - new Date(a.startDateTime),
                )
                .slice(0, 3);
              if (!past.length)
                return (
                  <p className="text-[12px] text-muted-foreground">
                    No completed events.
                  </p>
                );
              return past.map((ev, i) => {
                const date = toStudioLocalDate(new Date(ev.startDateTime), getStudioTimezone());
                const instructor = ev.teacherID?.name;
                const label = ev.title || ev.calendarServiceID?.name || "Event";
                return (
                  <div
                    key={ev._id ?? i}
                    className="flex flex-col gap-0.5 rounded-lg bg-muted/40 px-3 py-2.5"
                  >
                    <span className="text-[12px] font-medium text-foreground leading-snug">
                      {label}
                    </span>
                    <span className="text-[11px] text-muted-foreground">
                      {date.toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                      {" · "}
                      {date.toLocaleTimeString("en-US", {
                        hour: "numeric",
                        minute: "2-digit",
                      })}
                    </span>
                    {instructor && (
                      <span className="text-[11px] text-muted-foreground">
                        with {instructor}
                      </span>
                    )}
                  </div>
                );
              });
            })()}
          </div>
        </div>
      </div>
      {/* end inner grid */}

      <ConfirmStatusOverrideDialog
        open={Boolean(overridePrompt)}
        onClose={saving ? undefined : () => setOverridePrompt(null)}
        onConfirm={confirmStatusOverride}
        statusLabel={overridePrompt?.statusLabel}
        violations={overridePrompt?.violations || []}
        busy={saving}
      />
    </div>
  );
}

// ─── PaymentSchedule ─────────────────────────────────────────────────────────

function PaymentSchedule({
  plan,
  cpStatus,
  outstanding,
  onPayInstallment,
  onChangeDate,
  onAddInstallment,
  billingType,
  customerID,
  locationID,
  onSent,
  defaultOpen = false,
}) {
  const [open, setOpen] = useState(defaultOpen);
  const { ready: cloverReady } = useCardProcessor(locationID || plan);

  // A flexible schedule's pending total can drift from the real outstanding
  // balance (a wallet credit, refund, or a payment collected outside the
  // plan) — self-heal it here instead of leaving a stale schedule on screen
  // until someone happens to open the Future Payments sheet. Fixed-amount
  // payment_plan schedules are left alone (their last installment can be
  // intentionally discounted).
  const reconciledRef = useRef(null);
  useEffect(() => {
    if (billingType !== "flexible" || !plan || plan.status !== "active" || outstanding == null) return;
    const pending = plan.installments.map((i, idx) => ({ ...i, idx })).filter((i) => i.status === "pending");
    if (pending.length === 0) return;
    const pendingSum = pending.reduce((sum, i) => sum + Number(i.amount || 0), 0);
    const drift = Number((pendingSum - outstanding).toFixed(2));
    if (Math.abs(drift) <= 0.01) return;
    const key = `${plan._id}:${pendingSum}:${outstanding}`;
    if (reconciledRef.current === key) return; // already tried this exact mismatch this session
    reconciledRef.current = key;
    const target = Math.max(0, Number(outstanding));
    const base = Math.floor((target / pending.length) * 100) / 100;
    Promise.all(
      pending.map((inst, i) => {
        const amount = i === pending.length - 1 ? Number((target - base * (pending.length - 1)).toFixed(2)) : base;
        return api.patch(`/api/payment-plan/${plan._id}/installment/${inst.idx}/due-date`, {
          dueDate: new Date(inst.dueDate).toISOString().slice(0, 10),
          amount,
        });
      }),
    ).then(() => onSent?.());
  }, [plan, outstanding, billingType, onSent]);

  if (!plan) return null;

  const paidCount = plan.installments.filter((i) => i.status === "paid").length;

  return (
    <div className="mt-5 border-t border-border pt-4">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-2 text-[11px] font-medium text-muted-foreground uppercase tracking-wide hover:text-foreground transition-colors w-full"
      >
        <ChevronDown
          className={`h-3.5 w-3.5 transition-transform shrink-0 ${open ? "" : "-rotate-90"}`}
        />
        Payment Schedule
        <div className="flex items-center gap-2 ml-1">
          <span
            className={`normal-case font-normal inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-medium ${
              plan.status === "completed"
                ? "bg-success/10 text-success"
                : plan.status === "cancelled"
                  ? "bg-muted text-muted-foreground"
                  : "bg-violet-500/10 text-violet-600"
            }`}
          >
            {plan.status}
          </span>
          <span className="normal-case font-normal text-muted-foreground text-[11px]">
            {paidCount} / {plan.numberOfInstallments} paid
          </span>
        </div>
      </button>

      {open && (
        <div className="mt-3">
          {["active", "past_due"].includes(plan.status) &&
            plan.installments.some((i) => i.status === "pending") && (
              <div className="mb-3">
                <AutopayControl
                  path={`/api/payment-plan/${plan._id}/autopay`}
                  autoCharge={plan.autoCharge}
                  customerID={customerID}
                  locationID={locationID}
                  onChange={onSent}
                />
              </div>
            )}
          {(() => {
            const nextDueIdx = plan.installments.findIndex((i) => i.status === "pending");
            // Paid installments belong in Payment History, not this
            // schedule — showing only what's still outstanding here.
            const visible = plan.installments
              .map((inst, idx) => ({ inst, idx }))
              .filter(({ inst }) => inst.status !== "paid");
            if (visible.length === 0) {
              return (
                <p className="px-1 text-[12px] text-muted-foreground">
                  All payments collected.
                </p>
              );
            }
            return (
              <div className="rounded-lg border border-border overflow-hidden">
                {visible.map(({ inst, idx }, i) => {
                  const isNextDue = idx === nextDueIdx;
                  const isOverdue = isNextDue && new Date(inst.dueDate) < new Date();
                  const isLast = idx === plan.installments.length - 1;
                  // Flexible schedules let staff pay less than the scheduled
                  // amount (the shortfall gets rescheduled elsewhere, see
                  // PayInstallmentDialog) — that's an underpayment, never a
                  // discount, so only payment_plan's genuine last-installment
                  // rounding discount gets the badge.
                  const hasDiscount =
                    isLast && plan.installmentAmount > inst.amount && billingType !== "flexible";
                  return (
                    <div
                      key={idx}
                      className={`flex items-center justify-between px-3 py-2.5 ${i > 0 ? "border-t border-border" : ""} ${
                        inst.status === "paid"
                          ? "bg-success/5"
                          : isNextDue
                            ? isOverdue
                              ? "bg-rose-50/40 dark:bg-rose-900/10"
                              : "bg-warning/10"
                            : ""
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <div
                          className={`h-5 w-5 rounded-full flex items-center justify-center shrink-0 text-[10px] font-bold ${
                            inst.status === "paid"
                              ? "bg-success text-white"
                              : inst.status === "failed"
                                ? "bg-rose-600 text-white"
                                : inst.status === "payment_pending"
                                  ? "bg-warning text-white"
                                  : "bg-muted text-muted-foreground"
                          }`}
                        >
                          {inst.status === "paid" ? "✓" : idx + 1}
                        </div>
                        <div>
                          <p className="text-[12px] text-foreground font-medium">
                            Payment {idx + 1}
                            {inst.status === "paid" && (
                              <span className="ml-1.5 text-[11px] font-normal text-success">
                                Paid
                              </span>
                            )}
                            {inst.status === "failed" && (
                              <span className="ml-1.5 text-[11px] font-normal text-rose-600">
                                Failed
                              </span>
                            )}
                            {inst.status === "payment_pending" && (
                              <span className="ml-1.5 text-[11px] font-normal text-warning">
                                Payment pending
                              </span>
                            )}
                            {isOverdue && (
                              <span className="ml-1.5 text-[11px] font-normal text-rose-600">
                                Overdue
                              </span>
                            )}
                          </p>
                          <p className={`text-[11px] ${isOverdue ? "text-rose-600" : "text-muted-foreground"}`}>
                            Due {formatDate(inst.dueDate)}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {hasDiscount && (
                          <span className="text-[11px] text-muted-foreground line-through">
                            ${Number(plan.installmentAmount).toFixed(2)}
                          </span>
                        )}
                        <p className={`text-[13px] font-semibold ${isOverdue ? "text-rose-600" : "text-foreground"}`}>
                          ${Number(inst.amount).toFixed(2)}
                        </p>
                        {hasDiscount && (
                          <span className="text-[10px] font-medium text-warning bg-warning/10 px-1.5 py-0.5 rounded-full">
                            discount
                          </span>
                        )}
                        {/* A balance stays payable after the lessons are used up or the
                            package expires — only a cancellation ends it. */}
                        {inst.status === "pending" &&
                          ["active", "past_due"].includes(plan.status) &&
                          cpStatus !== "cancelled" && (
                            <>
                              <Button
                                size="sm"
                                variant="outline"
                                className="h-7 px-2.5 text-[11px]"
                                onClick={() => onChangeDate({ plan, index: idx })}
                              >
                                Change Due Date
                              </Button>
                              {cloverReady && customerID && (
                                <SendPaymentLinkMenu
                                  customerID={customerID}
                                  target={{
                                    kind: "installment",
                                    paymentPlanID: plan._id,
                                    installmentIndex: idx,
                                  }}
                                  onSent={onSent}
                                />
                              )}
                              <Button
                                size="sm"
                                className="h-7 px-2.5 text-[11px] bg-success hover:bg-success text-white"
                                onClick={() =>
                                  onPayInstallment({
                                    plan,
                                    index: idx,
                                    billingType,
                                  })
                                }
                              >
                                Pay Now
                              </Button>
                            </>
                          )}
                      </div>
                    </div>
                  );
                })}
              </div>
            );
          })()}
          {plan.nextPaymentDate && plan.status === "active" && (
            <p className="text-[11px] text-muted-foreground mt-1.5">
              Next payment due: {formatDate(plan.nextPaymentDate)}
            </p>
          )}
          {billingType === "flexible" &&
            plan.status !== "cancelled" &&
            cpStatus !== "cancelled" && (
              <Button
                size="sm"
                variant="outline"
                className="mt-3 h-7 px-3 text-[11px] w-full"
                onClick={() => onAddInstallment({ plan, outstanding })}
              >
                + Add Payment
              </Button>
            )}
        </div>
      )}
    </div>
  );
}

// ─── BounceableCheque ────────────────────────────────────────────────────────
// Surfaces "Mark bounced" up on the enrollment header too, next to Change
// validity / Cancel — Payment History still has it (per-payment, since a
// customer could in principle have more than one cheque against the same
// enrollment), but staff shouldn't have to expand history just to find the
// action for the common case of one outstanding cheque.
function BounceableCheque({ customerID, enrollmentID, onBounced }) {
  const [payment, setPayment] = useState(null); // the bounceable cheque, or null
  const [bouncing, setBouncing] = useState(false);
  const toast = useToast();

  useEffect(() => {
    let cancelled = false;
    api
      .get(`/api/payment/customer/${customerID}?enrollmentID=${enrollmentID}&limit=100`)
      .then((res) => {
        if (cancelled || !res.success) return;
        const bounceable = (res.data || []).find(
          (p) =>
            p.method === "cheque" &&
            p.status === "completed" &&
            p.checkStatus !== "bounced" &&
            p.type !== "refund",
        );
        setPayment(bounceable || null);
      });
    return () => {
      cancelled = true;
    };
  }, [customerID, enrollmentID]);

  if (!payment) return null;

  async function markBounced() {
    if (
      !window.confirm(
        `Mark cheque${payment.checkNumber ? ` #${payment.checkNumber}` : ""} for $${Number(payment.amount).toFixed(2)} as bounced? This reverses the payment and adds the studio's bounced-cheque penalty (set in Settings → Billing).`,
      )
    ) {
      return;
    }
    setBouncing(true);
    const res = await api.post(`/api/payment/${payment._id}/bounce`);
    setBouncing(false);
    if (!res.success) {
      toast.error(res.error || "Couldn't mark this cheque bounced.");
      return;
    }
    const penalty = Number(res.data?.penalty);
    toast.success(
      Number.isFinite(penalty)
        ? `Cheque marked bounced — $${penalty.toFixed(2)} penalty added to the balance.`
        : "Cheque marked bounced — penalty added to the balance.",
    );
    setPayment(null);
    onBounced?.();
  }

  return (
    <Button
      variant="outline"
      size="sm"
      disabled={bouncing}
      className="h-7 px-2.5 text-[11px] font-medium border-rose-500/40 text-rose-600 hover:bg-rose-500/10"
      onClick={markBounced}
    >
      {bouncing ? "Marking…" : "Mark bounced"}
    </Button>
  );
}

// ─── PaymentTimeline ─────────────────────────────────────────────────────────

function PaymentTimeline({ customerID, enrollmentID, payments: preloadedPayments }) {
  const [open, setOpen] = useState(false);
  const [fetchedPayments, setFetchedPayments] = useState(null); // null = not yet loaded
  const [loading, setLoading] = useState(false);
  const [syncingId, setSyncingId] = useState(null);
  const [bouncingId, setBouncingId] = useState(null);
  const [cancellingId, setCancellingId] = useState(null);
  const toast = useToast();
  // A caller that already has the customer's full payment list (e.g. the
  // Events & Products tab) passes it pre-filtered — skips the redundant
  // per-item round trip and stays in sync with that list's own reloads.
  const payments = preloadedPayments ?? fetchedPayments;

  async function load(force = false) {
    if (preloadedPayments || (!force && fetchedPayments !== null)) return; // already have them
    setLoading(true);
    const res = await api.get(
      `/api/payment/customer/${customerID}?enrollmentID=${enrollmentID}&limit=100`,
    );
    if (res.success) setFetchedPayments(Array.isArray(res.data) ? res.data : []);
    else toast.error("Failed to load payment history");
    setLoading(false);
  }

  function toggle() {
    if (!open) load();
    setOpen((v) => !v);
  }

  // Manual backstop for a payment stuck "pending" because the Stripe webhook
  // never arrived (wrong URL, local dev with no tunnel, a dropped delivery) —
  // asks the backend to check Stripe directly and settle it if the money is
  // actually already there.
  async function syncPayment(p) {
    setSyncingId(p._id);
    const res = await api.post(`/api/payment/${p._id}/sync`);
    setSyncingId(null);
    if (!res.success) {
      toast.error(res.error || "Couldn't check Stripe status.");
      return;
    }
    if (res.data?.status === "approved") {
      toast.success("Payment confirmed — it had already gone through on Stripe.");
    } else if (res.data?.status === "declined") {
      toast.error("Stripe shows this payment failed or was cancelled.");
    } else {
      toast.success("Stripe still shows this as processing — try again shortly.");
    }
    load(true);
  }

  // Customer changed their mind, or the wrong amount went to the card reader: cancels the
  // pending reader charge (clears the reader, cancels at Stripe, package back to unpaid).
  // If the customer had in fact already paid, the backend records it instead.
  async function cancelPending(p) {
    if (!window.confirm(`Cancel the pending $${Number(p.amount).toFixed(2)} card-reader charge? The package goes back to unpaid so you can send the right amount.`)) {
      return;
    }
    setCancellingId(p._id);
    const res = await api.post(`/api/payment/${p._id}/cancel-pending`);
    setCancellingId(null);
    if (!res.success) {
      toast.error(res.error || "Couldn't cancel this charge.");
      return;
    }
    if (res.data?.status === "completed") toast.success("The customer had already paid — payment recorded.");
    else if (res.data?.status === "cancelled") toast.success("Charge cancelled.");
    else toast.success("Stripe still shows this charge in progress — try again shortly.");
    load(true);
  }

  // Studio owner acts on this after a bank tells them a customer's cheque bounced —
  // the payment never had real money behind it, so this reverses the credit and adds
  // the flat penalty (see bounceCheck on the backend).
  async function markBounced(p) {
    if (!window.confirm(`Mark cheque${p.checkNumber ? ` #${p.checkNumber}` : ""} for $${Number(p.amount).toFixed(2)} as bounced? This reverses the payment and adds the studio's bounced-cheque penalty (set in Settings → Billing).`)) {
      return;
    }
    setBouncingId(p._id);
    const res = await api.post(`/api/payment/${p._id}/bounce`);
    setBouncingId(null);
    if (!res.success) {
      toast.error(res.error || "Couldn't mark this cheque bounced.");
      return;
    }
    const penalty = Number(res.data?.penalty);
    toast.success(
      Number.isFinite(penalty)
        ? `Cheque marked bounced — $${penalty.toFixed(2)} penalty added to the balance.`
        : "Cheque marked bounced — penalty added to the balance.",
    );
    load(true);
  }

  const typeLabel = {
    package_purchase: "Payment",
    event_purchase: "Purchase",
    credit_topup: "Credit Top-up",
    refund: "Refund",
    session_payment: "Session Payment",
    membership_purchase: "Membership Purchase",
    membership_renewal: "Membership Renewal",
  };

  const methodIcon = {
    cash: "💵",
    card: "💳",
    online: "🌐",
    cheque: "📝",
    other: "•",
  };

  return (
    <div className="mt-4 border-t border-border pt-4">
      <button
        type="button"
        onClick={toggle}
        className="flex items-center gap-2 text-[11px] font-medium text-muted-foreground uppercase tracking-wide hover:text-foreground transition-colors w-full"
      >
        <ChevronDown
          className={`h-3.5 w-3.5 transition-transform shrink-0 ${open ? "" : "-rotate-90"}`}
        />
        Payment History
        {payments !== null && (
          <span className="ml-1 normal-case font-normal">
            ({payments.length} record{payments.length !== 1 ? "s" : ""})
          </span>
        )}
      </button>

      {open && (
        <div className="mt-3">
          {loading && (
            <p className="text-[12px] text-muted-foreground py-4 text-center">
              Loading…
            </p>
          )}
          {!loading && payments !== null && payments.length === 0 && (
            <p className="text-[12px] text-muted-foreground py-4 text-center">
              No payment records yet.
            </p>
          )}
          {!loading && payments !== null && payments.length > 0 && (
            <div className="relative pl-5">
              {/* vertical line */}
              <div className="absolute left-2 top-2 bottom-2 w-px bg-border" />

              {payments.map((p, i) => {
                const isRefund = p.type === "refund";
                const date = toStudioLocalDate(new Date(p.createdAt), getStudioTimezone());
                return (
                  <div
                    key={p._id}
                    className={`relative mb-3 last:mb-0 ${i === 0 ? "" : ""}`}
                  >
                    {/* dot */}
                    <div
                      className={`absolute -left-3 top-2 h-2.5 w-2.5 rounded-full border-2 border-background shrink-0 ${
                        p.status === "failed"
                          ? "bg-rose-500"
                          : isRefund
                            ? "bg-warning"
                            : "bg-success"
                      }`}
                    />

                    <div className="rounded-lg border border-border bg-card px-3 py-2.5">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <div className="flex items-center gap-2 flex-wrap">
                            <p className="text-[12px] font-medium text-foreground">
                              {p.isBounceReversal ? "Bounced Cheque" : (typeLabel[p.type] ?? p.type)}
                            </p>
                            {p.enrollmentID && (
                              <span className="text-[10px] font-medium bg-muted text-muted-foreground px-1.5 py-0.5 rounded border border-border">
                                Enrollment #
                                {p.enrollmentID.enrollmentNumber ?? "—"}
                                {p.enrollmentID.label
                                  ? ` · ${p.enrollmentID.label}`
                                  : ""}
                              </span>
                            )}
                            {p.enrollmentID?.package?.packageName && (
                              <span className="text-[10px] font-medium bg-info/10 text-info px-1.5 py-0.5 rounded border border-info/20">
                                {p.enrollmentID.package.packageName}
                              </span>
                            )}
                            {p.purchaseID?.name && (
                              <span className="text-[10px] font-medium bg-info/10 text-info px-1.5 py-0.5 rounded border border-info/20">
                                {p.purchaseID.name}
                              </span>
                            )}
                          </div>
                          <p className="text-[11px] text-muted-foreground mt-0.5">
                            {date.toLocaleDateString("en-AU", {
                              day: "numeric",
                              month: "short",
                              year: "numeric",
                            })}
                            {" · "}
                            {date.toLocaleTimeString("en-AU", {
                              hour: "numeric",
                              minute: "2-digit",
                            })}
                            {p.processedBy?.name && ` · ${p.processedBy.name}`}
                          </p>
                          {p.method === "cheque" && p.checkNumber && (
                            <p className="text-[11px] text-muted-foreground mt-0.5">
                              Cheque #{p.checkNumber}
                            </p>
                          )}
                          {p.notes && (
                            <p className="text-[11px] text-muted-foreground mt-0.5 italic">
                              {p.notes}
                            </p>
                          )}
                        </div>
                        <div className="flex flex-col items-end gap-1 shrink-0">
                          <span
                            className={`text-[14px] font-semibold ${
                              isRefund
                                ? "text-warning"
                                : p.status === "failed"
                                  ? "text-rose-600"
                                  : "text-success"
                            }`}
                          >
                            {isRefund ? "−" : "+"}${Number(p.amount).toFixed(2)}
                          </span>
                          <div className="flex items-center gap-1.5">
                            <span className="text-[11px] capitalize text-muted-foreground">
                              {methodIcon[p.method] ?? ""} {p.method}
                            </span>
                            {p.status !== "completed" && (
                              <span
                                className={`text-[10px] font-medium px-1.5 py-0.5 rounded-full ${
                                  p.status === "failed"
                                    ? "bg-rose-500/10 text-rose-600"
                                    : "bg-warning/10 text-warning"
                                }`}
                              >
                                {p.status}
                              </span>
                            )}
                            {p.status === "pending" && p.method !== "cash" && (
                              <button
                                type="button"
                                disabled={syncingId === p._id}
                                onClick={() => syncPayment(p)}
                                className="text-[10px] font-medium text-muted-foreground hover:text-foreground underline underline-offset-2 disabled:opacity-50"
                              >
                                {syncingId === p._id ? "Checking…" : "Check status"}
                              </button>
                            )}
                            {p.status === "pending" && p.method === "terminal" && (
                              <button
                                type="button"
                                disabled={cancellingId === p._id}
                                onClick={() => cancelPending(p)}
                                className="text-[10px] font-medium text-rose-600 hover:text-rose-700 underline underline-offset-2 disabled:opacity-50"
                              >
                                {cancellingId === p._id ? "Cancelling…" : "Cancel charge"}
                              </button>
                            )}
                            {p.method === "cheque" && p.checkStatus === "bounced" && (
                              <span className="text-[10px] font-medium px-1.5 py-0.5 rounded-full bg-rose-500/10 text-rose-600">
                                bounced
                              </span>
                            )}
                            {p.method === "cheque" &&
                              p.status === "completed" &&
                              p.checkStatus !== "bounced" &&
                              !isRefund && (
                                <button
                                  type="button"
                                  disabled={bouncingId === p._id}
                                  onClick={() => markBounced(p)}
                                  className="text-[10px] font-medium text-rose-600 hover:text-rose-700 underline underline-offset-2 disabled:opacity-50"
                                >
                                  {bouncingId === p._id ? "Marking…" : "Mark bounced"}
                                </button>
                              )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// ─── ChangeInstallmentDateDialog ─────────────────────────────────────────────

function ChangeInstallmentDateDialog({
  open,
  onClose,
  plan,
  installmentIndex,
  onSuccess,
}) {
  const [dueDate, setDueDate] = useState("");
  const [saving, setSaving] = useState(false);
  const toast = useToast();

  const installment = plan?.installments?.[installmentIndex];

  useEffect(() => {
    if (installment) {
      setDueDate(
        installment.dueDate
          ? new Date(installment.dueDate).toISOString().slice(0, 10)
          : "",
      );
    }
  }, [installment]);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!dueDate) return;
    setSaving(true);
    const res = await api.patch(
      `/api/payment-plan/${plan._id}/installment/${installmentIndex}/due-date`,
      { dueDate },
    );
    if (res.success) {
      toast.success("Installment updated.");
      onSuccess();
      onClose();
    } else {
      toast.error(res.error || "Failed to update installment.");
    }
    setSaving(false);
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(v) => {
        if (!v) onClose();
      }}
    >
      <DialogContent className="max-w-sm">
        <DialogHeader>
          <DialogTitle>Change Due Date</DialogTitle>
        </DialogHeader>
        {installment && (
          <p className="text-[12px] text-muted-foreground -mt-1">
            Payment {installmentIndex + 1} of {plan.numberOfInstallments}
          </p>
        )}
        <form onSubmit={handleSubmit} className="space-y-4 mt-2">
          <FormField label="Due Date" required>
            <input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="h-9 w-full rounded-lg border border-border bg-background px-3 text-[13px] outline-none focus:border-primary"
            />
          </FormField>
          <div className="flex justify-end gap-2 pt-1">
            <Button type="button" variant="outline" size="sm" onClick={onClose}>
              Cancel
            </Button>
            <Button
              type="submit"
              size="sm"
              disabled={saving || !dueDate}
              className="bg-brand hover:opacity-90 text-white"
            >
              {saving ? "Saving…" : "Update"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

// ─── AddInstallmentDialog ─────────────────────────────────────────────────────
// Re-lays out the plan's still-pending payments as the same boxes staff filled
// in on the enrollment's Flexible step, so restructuring the schedule later
// feels like the same form instead of a bare "one payment" popup.

function AddInstallmentDialog({ open, onClose, plan, outstanding, onSuccess }) {
  const [rows, setRows] = useState([]);
  const [saving, setSaving] = useState(false);
  const toast = useToast();

  // The true remaining balance — not the pending installments' own sum, which
  // can drift from it (a wallet credit, refund, or discount applied outside
  // the plan). Falls back to the plan's own total only if the real figure
  // wasn't passed in.
  const target = useMemo(() => {
    if (outstanding != null) return Number(outstanding);
    return (plan?.installments || [])
      .filter((i) => i.status === "pending")
      .reduce((sum, i) => sum + Number(i.amount || 0), 0);
  }, [outstanding, plan]);

  // Rows carry their original installment index (`origIdx`) when they mirror
  // an already-scheduled payment — those get PATCHed. Rows with no `origIdx`
  // are new and get POSTed. There's no delete-installment endpoint, so an
  // already-scheduled row can be re-dated/re-amounted but not removed.
  // Loaded rows are immediately reconciled against `target` — if the schedule
  // had drifted from the real outstanding balance, opening this panel is
  // what fixes it, rather than making staff notice and correct it by hand.
  useEffect(() => {
    if (open && plan) {
      const pending = plan.installments
        .map((inst, idx) => ({ ...inst, idx }))
        .filter((inst) => inst.status === "pending")
        .map((inst) => ({
          _key: String(inst.idx),
          origIdx: inst.idx,
          dueDate: new Date(inst.dueDate).toISOString().slice(0, 10),
          amount: Number(inst.amount).toFixed(2),
        }));
      setRows(splitEvenly(pending, target));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, plan]);

  const rowsTotal = rows.reduce((sum, r) => sum + (Number(r.amount) || 0), 0);
  const amountLeft = Number((target - rowsTotal).toFixed(2));

  // Adding/removing a row, or editing one row's amount, re-spreads the fixed
  // scheduled total across the rest — same auto-balancing as the enrollment
  // form, so a short-paid or overtyped row never has to be hand-corrected.
  function splitEvenly(list, remaining) {
    const base = list.length ? Math.floor((remaining / list.length) * 100) / 100 : 0;
    return list.map((r, i) => ({
      ...r,
      amount: (i === list.length - 1 ? Number((remaining - base * (list.length - 1)).toFixed(2)) : base).toFixed(2),
    }));
  }

  function updateRow(key, field, value) {
    if (field !== "amount") {
      setRows((prev) => prev.map((r) => (r._key === key ? { ...r, [field]: value } : r)));
      return;
    }
    setRows((prev) => {
      const leftover = Math.max(0, target - (Number(value) || 0));
      const others = prev.filter((r) => r._key !== key);
      const split = splitEvenly(others, leftover);
      return prev.map((r) => (r._key === key ? { ...r, amount: value } : split.find((o) => o._key === r._key)));
    });
  }

  function addRow() {
    setRows((prev) =>
      splitEvenly(
        [...prev, { _key: String(Date.now() + Math.random()), origIdx: null, dueDate: "", amount: "" }],
        target,
      ),
    );
  }

  // A row not yet saved just drops out locally. An already-scheduled row
  // deletes on the server right away instead of batching with Save — removing
  // it shifts every later installment's index, which would desync any other
  // row's origIdx if it waited for the batched submit below — so the dialog
  // closes and the parent reloads the plan fresh.
  async function removeRow(row) {
    if (row.origIdx == null) {
      setRows((prev) => splitEvenly(prev.filter((r) => r._key !== row._key), target));
      return;
    }
    if (!window.confirm(`Remove the $${Number(row.amount).toFixed(2)} payment due ${row.dueDate}?`)) return;
    setSaving(true);
    const res = await api.delete(`/api/payment-plan/${plan._id}/installment/${row.origIdx}`);
    setSaving(false);
    if (res.success) {
      toast.success("Payment removed.");
      onSuccess();
      onClose();
    } else {
      toast.error(res.error || "Failed to remove payment.");
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (rows.some((r) => !r.dueDate || !(Number(r.amount) > 0))) {
      toast.error("Every payment needs a date and an amount.");
      return;
    }
    if (Math.abs(amountLeft) > 0.01) {
      toast.error(`Amount left to schedule is $${amountLeft.toFixed(2)} — it must be $0 before saving.`);
      return;
    }
    setSaving(true);
    const results = await Promise.all(
      rows.map((r) =>
        r.origIdx != null
          ? api.patch(`/api/payment-plan/${plan._id}/installment/${r.origIdx}/due-date`, {
              dueDate: r.dueDate,
              amount: Number(r.amount),
            })
          : api.post(`/api/payment-plan/${plan._id}/installment`, {
              dueDate: r.dueDate,
              amount: Number(r.amount),
            }),
      ),
    );
    setSaving(false);

    // A brand-new row that succeeded now exists as a real installment on the
    // backend — record its index so that if another row in this same submit
    // failed and staff retries, this one gets PATCHed instead of POSTed
    // again (which would schedule it a second time).
    setRows((prev) =>
      prev.map((r, i) => {
        const result = results[i];
        if (r.origIdx == null && result?.success) {
          const newIdx = (result.data?.installments?.length ?? 0) - 1;
          return { ...r, origIdx: newIdx };
        }
        return r;
      }),
    );

    if (results.every((r) => r.success)) {
      toast.success("Payment schedule updated.");
      onSuccess();
      onClose();
    } else {
      toast.error("Some payments failed to save — the ones that went through won't be repeated if you try again.");
    }
  }

  return (
    <Sheet open={open} onClose={onClose} width="440px">
      <SheetContent onClose={onClose} className="flex flex-col overflow-hidden p-0">
        <div className="shrink-0 border-b border-border px-5 py-4">
          <h2 className="text-[15px] font-bold text-foreground">Future Payments</h2>
          <p className="text-[11px] text-muted-foreground mt-1">
            One row is the remaining balance's single due date. Add more to split it into a schedule.
          </p>
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col flex-1 min-h-0">
          <div className="flex-1 overflow-y-auto px-5 py-4 space-y-3">
            <div className="space-y-1.5">
              {rows.map((r, i) => (
                <div key={r._key} className="flex items-center gap-2">
                  <span className="text-[11px] text-muted-foreground w-5 shrink-0">{i + 1}.</span>
                  <input
                    type="date"
                    value={r.dueDate}
                    onChange={(e) => updateRow(r._key, "dueDate", e.target.value)}
                    className="h-8 flex-1 rounded-lg border border-border bg-background px-2.5 text-[12px]"
                  />
                  <div className="relative w-28">
                    <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-[11px] text-muted-foreground">$</span>
                    <input
                      type="number"
                      min="0"
                      step="any"
                      placeholder="0.00"
                      value={r.amount}
                      onChange={(e) => updateRow(r._key, "amount", e.target.value)}
                      className="h-8 w-full rounded-lg border border-border bg-background pl-5 pr-2 text-[12px]"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => removeRow(r)}
                    disabled={rows.length === 1 || saving}
                    title="Remove payment"
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
              onClick={addRow}
              className="flex items-center gap-1 h-7 px-2 rounded border border-dashed border-border bg-background text-[11px] font-medium text-muted-foreground hover:text-foreground hover:border-primary transition-colors"
            >
              + Add another payment
            </button>
            <div className="space-y-1 pt-2 border-t border-border">
              <div className="flex items-center justify-between">
                <p className="text-[11px] text-muted-foreground">Amount left to schedule</p>
                <p className={`text-[12px] font-semibold ${Math.abs(amountLeft) > 0.01 ? "text-destructive" : "text-success"}`}>
                  ${amountLeft.toFixed(2)}
                </p>
              </div>
            </div>
          </div>
          <div className="shrink-0 flex justify-end gap-2 border-t border-border/60 px-5 py-3">
            <Button type="button" variant="outline" size="sm" onClick={onClose}>
              Cancel
            </Button>
            <Button
              type="submit"
              size="sm"
              disabled={saving}
              className="bg-brand hover:opacity-90 text-white"
            >
              {saving ? "Saving…" : "Save Schedule"}
            </Button>
          </div>
        </form>
      </SheetContent>
    </Sheet>
  );
}

// ─── SetupPaymentPlanDialog ───────────────────────────────────────────────────
// Schedules NEW going-forward installments against an enrollment's remaining
// balance — for migrated enrollments (which land with a package + a static
// due amount but no billing schedule) and any other one_time enrollment that
// still owes money. Posts to POST /api/customer-package/:enrollmentId/payment-plan.

function SetupPaymentPlanDialog({
  open,
  onClose,
  enrollment,
  outstanding,
  onSuccess,
}) {
  const [numberOfInstallments, setNumberOfInstallments] = useState(3);
  const [frequency, setFrequency] = useState("monthly");
  const [startDate, setStartDate] = useState("");
  const [collectNow, setCollectNow] = useState(false);
  const [method, setMethod] = useState("cash");
  const [saving, setSaving] = useState(false);
  const toast = useToast();

  useEffect(() => {
    if (open) {
      setNumberOfInstallments(3);
      setFrequency("monthly");
      setStartDate(todayDateInput());
      setCollectNow(false);
      setMethod("cash");
    }
  }, [open]);

  const perInstallment =
    outstanding > 0 && numberOfInstallments > 0
      ? (outstanding / numberOfInstallments).toFixed(2)
      : "0.00";

  async function handleSubmit(e) {
    e.preventDefault();
    if (!numberOfInstallments || !frequency || !startDate) return;
    setSaving(true);
    const res = await api.post(
      `/api/customer-package/${enrollment._id}/payment-plan`,
      {
        billing: {
          numberOfInstallments: Number(numberOfInstallments),
          frequency,
          startDate,
          collectNow,
          method,
        },
      },
    );
    if (res.success) {
      toast.success("Payment plan created.");
      onSuccess();
      onClose();
    } else {
      toast.error(res.error || res.message || "Failed to create payment plan.");
    }
    setSaving(false);
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(v) => {
        if (!v) onClose();
      }}
    >
      <DialogContent className="max-w-sm">
        <DialogHeader>
          <DialogTitle>Set Up Payment Plan</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 mt-2">
          <p className="text-[12px] text-muted-foreground">
            Schedule the remaining{" "}
            <span className="font-semibold text-foreground">
              ${Number(outstanding).toFixed(2)}
            </span>{" "}
            balance into recurring payments.
          </p>
          <FormField label="Number of Installments" required>
            <input
              type="number"
              min="1"
              step="1"
              value={numberOfInstallments}
              onChange={(e) => setNumberOfInstallments(e.target.value)}
              className="h-9 w-full rounded-lg border border-border bg-background px-3 text-[13px] outline-none focus:border-primary"
            />
          </FormField>
          <FormField label="Frequency" required>
            <select
              value={frequency}
              onChange={(e) => setFrequency(e.target.value)}
              className="h-9 w-full rounded-lg border border-border bg-background px-3 text-[13px] outline-none focus:border-primary"
            >
              <option value="weekly">Weekly</option>
              <option value="biweekly">Biweekly</option>
              <option value="monthly">Monthly</option>
            </select>
          </FormField>
          <FormField label="First Payment Date" required>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="h-9 w-full rounded-lg border border-border bg-background px-3 text-[13px] outline-none focus:border-primary"
            />
          </FormField>
          {numberOfInstallments > 0 && (
            <p className="text-[12px] text-muted-foreground">
              ≈ ${perInstallment} per installment
            </p>
          )}
          <label className="flex items-center gap-2 text-[13px] text-foreground">
            <input
              type="checkbox"
              checked={collectNow}
              onChange={(e) => setCollectNow(e.target.checked)}
            />
            Collect the first installment now
          </label>
          {collectNow && (
            <FormField label="Method">
              <select
                value={method}
                onChange={(e) => setMethod(e.target.value)}
                className="h-9 w-full rounded-lg border border-border bg-background px-3 text-[13px] outline-none focus:border-primary"
              >
                <option value="cash">Cash</option>
                <option value="cheque">Cheque</option>
                <option value="other">Other</option>
              </select>
            </FormField>
          )}
          <div className="flex justify-end gap-2 pt-1">
            <Button type="button" variant="outline" size="sm" onClick={onClose}>
              Cancel
            </Button>
            <Button
              type="submit"
              size="sm"
              disabled={
                saving || !numberOfInstallments || !frequency || !startDate
              }
              className="bg-brand hover:opacity-90 text-white"
            >
              {saving ? "Saving…" : "Create Plan"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

// ─── Packages Tab ─────────────────────────────────────────────────────────────

const BLANK_ADD_FORM = {
  enrollmentID: "",
  packageID: "",
  purchaseDate: "",
  services: [],
  billingType: "one_time",
  billing: {
    method: "cash",
    numberOfInstallments: 3,
    frequency: "monthly",
    startDate: "",
    dueDate: "",
    initialPayment: "",
    initialPaymentMethod: "cash",
    installmentMode: "count",
    installmentAmount: "",
  },
};

function PackagesTab({ customerID, locationID }) {
  const [customerPkgs, setCustomerPkgs] = useState([]);
  const [detailsMap, setDetailsMap] = useState({});
  const [plansMap, setPlansMap] = useState({}); // cpId -> PaymentPlan doc
  const [allPkgs, setAllPkgs] = useState([]);
  const [enrollments, setEnrollments] = useState([]);
  const [loading, setLoading] = useState(true);

  // Add package multi-step
  const [addOpen, setAddOpen] = useState(false);
  const [addStep, setAddStep] = useState(1);
  const [addForm, setAddForm] = useState(BLANK_ADD_FORM);
  const [selectedPkg, setSelectedPkg] = useState(null);
  const [adding, setAdding] = useState(false);

  // Cancel / pay / pay-installment
  const [cancelTarget, setCancelTarget] = useState(null);
  const [cancelling, setCancelling] = useState(false);
  const [extendTarget, setExtendTarget] = useState(null); // { _id, packageName, expiryDate }
  const [extendDate, setExtendDate] = useState("");
  const [extending, setExtending] = useState(false);
  const [payInstallTarget, setPayInstallTarget] = useState(null); // { plan, index }
  const [changeInstallDateTarget, setChangeInstallDateTarget] = useState(null); // { plan, index }
  const [addInstallTarget, setAddInstallTarget] = useState(null); // { plan, outstanding }
  const toast = useToast();
  const { ready: cloverReady } = useCardProcessor(locationID);

  const load = useCallback(async () => {
    setLoading(true);
    const [pkgRes, allRes, enrRes] = await Promise.all([
      api.get(`/api/customer-package/customer/${customerID}`),
      api.get("/api/package?limit=200&isActive=true"),
      api.get(`/api/enrollment?customerID=${customerID}`),
    ]);
    if (allRes.success) setAllPkgs(allRes.data || []);
    if (enrRes.success) setEnrollments(enrRes.data || []);
    if (pkgRes.success) {
      const list = pkgRes.data || [];
      setCustomerPkgs(list);
      if (list.length > 0) {
        const detailResults = await Promise.all(
          list.map((enr) =>
            api.get(`/api/customer-package/${enr._id}/details`),
          ),
        );
        const detMap = {};
        list.forEach((enr, i) => {
          if (detailResults[i].success)
            detMap[String(enr._id)] = detailResults[i].data;
        });
        setDetailsMap(detMap);

        const hasPlanPkgs = list.some(
          (enr) =>
            enr.package?.billingType === "payment_plan" ||
            enr.package?.billingType === "flexible",
        );
        if (hasPlanPkgs) {
          const plansRes = await api.get(
            `/api/payment-plan/customer/${customerID}`,
          );
          if (plansRes.success) {
            const pm = {};
            (plansRes.data || []).forEach((plan) => {
              const enrId = String(plan.enrollmentID?._id ?? plan.enrollmentID);
              pm[enrId] = plan;
            });
            setPlansMap(pm);
          }
        }
      }
    }
    setLoading(false);
  }, [customerID]);

  useEffect(() => {
    load();
  }, [load]);

  function openAdd() {
    setAddForm(BLANK_ADD_FORM);
    setSelectedPkg(null);
    setAddStep(1);
    setAddOpen(true);
  }
  function closeAdd() {
    setAddOpen(false);
  }

  function onPkgChange(pkgId) {
    const pkg = allPkgs.find((p) => String(p._id) === pkgId);
    setSelectedPkg(pkg || null);
    setAddForm((f) => ({
      ...f,
      packageID: pkgId,
      services: (pkg?.services || []).map((s) => {
        const isChargeable = s.isChargeable ?? true;
        const pricePerSession = isChargeable ? s.pricePerSession || 0 : 0;
        const numberOfSessions = s.numberOfSessions || 0;
        const gross = numberOfSessions * pricePerSession;
        const discountType = isChargeable ? s.discountType || "none" : "none";
        const discountAmount = isChargeable ? Number(s.discountAmount || 0) : 0;
        let finalAmount = gross;
        if (discountType === "percentage")
          finalAmount = Math.max(0, gross - (gross * discountAmount) / 100);
        else if (discountType === "fixed")
          finalAmount = Math.max(0, gross - discountAmount);
        return {
          serviceCode: s.serviceCode || "",
          serviceName: s.serviceName || "",
          color: s.color || "",
          numberOfSessions,
          pricePerSession,
          discountType,
          discountAmount,
          finalAmount: parseFloat(finalAmount.toFixed(2)),
          isChargeable,
        };
      }),
    }));
  }

  function updateSvc(i, field, val) {
    setAddForm((f) => {
      const svcs = f.services.map((s, idx) => {
        if (idx !== i) return s;
        const updated = { ...s, [field]: val };
        const gross =
          (Number(updated.pricePerSession) || 0) *
          (Number(updated.numberOfSessions) || 0);
        const discAmt = Number(updated.discountAmount) || 0;
        let finalAmount = gross;
        if (updated.discountType === "percentage")
          finalAmount = Math.max(0, gross - (gross * discAmt) / 100);
        else if (updated.discountType === "fixed")
          finalAmount = Math.max(0, gross - discAmt);
        updated.finalAmount = parseFloat(finalAmount.toFixed(2));
        return updated;
      });
      return { ...f, services: svcs };
    });
  }

  function setBilling(field, val) {
    setAddForm((f) => ({ ...f, billing: { ...f.billing, [field]: val } }));
  }

  const totalAmount = addForm.services.reduce(
    (s, svc) => s + (Number(svc.finalAmount) || 0),
    0,
  );
  const totalDiscount = addForm.services.reduce((s, svc) => {
    const gross =
      (Number(svc.pricePerSession) || 0) * (Number(svc.numberOfSessions) || 0);
    return s + Math.max(0, gross - (Number(svc.finalAmount) || 0));
  }, 0);

  // Only one-time billing settles money in this dialog; the other types collect later.
  const payWithClover =
    addForm.billingType === "one_time" &&
    addForm.billing.method === "card" &&
    totalAmount > 0 &&
    cloverReady;
  const cloverNotConnected =
    addForm.billingType === "one_time" &&
    addForm.billing.method === "card" &&
    totalAmount > 0 &&
    !cloverReady;

  function getInstallments() {
    const { numberOfInstallments, frequency, startDate } = addForm.billing;
    if (!startDate || !numberOfInstallments) return [];
    const n = Number(numberOfInstallments);
    if (!n || n < 1) return [];
    const baseAmt = parseFloat((totalAmount / n).toFixed(2));
    const result = [];
    let d = new Date(startDate);
    for (let i = 0; i < n; i++) {
      const isLast = i === n - 1;
      const amount = isLast
        ? Math.max(0, parseFloat((totalAmount - baseAmt * (n - 1)).toFixed(2)))
        : baseAmt;
      // startDate is "YYYY-MM-DD" (UTC midnight): formatDate reads it as that day,
      // and the UTC month step keeps it there.
      result.push({ date: formatDate(d), amount });
      if (frequency === "weekly") d = new Date(d.getTime() + 7 * 86400000);
      else if (frequency === "biweekly")
        d = new Date(d.getTime() + 14 * 86400000);
      else {
        d = new Date(d);
        d.setUTCMonth(d.getUTCMonth() + 1);
      }
    }
    return result;
  }

  async function handleAdd() {
    if (!addForm.enrollmentID) {
      toast.error("Please select an enrollment.");
      return;
    }
    if (addForm.billingType === "payment_plan") {
      const { numberOfInstallments, frequency, startDate } = addForm.billing;
      if (!numberOfInstallments || !frequency || !startDate) {
        toast.error("Please fill all payment plan fields.");
        return;
      }
    }
    const checkoutTab = payWithClover ? openCheckoutTab() : null;
    setAdding(true);
    const payload = {
      customerID,
      packageID: addForm.packageID,
      enrollmentID: addForm.enrollmentID,
      services: addForm.services.map((s) => ({
        serviceCode: s.serviceCode,
        serviceName: s.serviceName,
        color: s.color,
        numberOfSessions: Number(s.numberOfSessions),
        pricePerSession: Number(s.pricePerSession),
        discountType: s.discountType || "none",
        discountAmount: Number(s.discountAmount || 0),
        finalAmount: Number(s.finalAmount),
      })),
      billingType: addForm.billingType,
      billing:
        addForm.billingType === "one_time"
          ? { method: addForm.billing.method }
          : addForm.billingType === "payment_plan"
            ? {
                numberOfInstallments: Number(
                  addForm.billing.numberOfInstallments,
                ),
                frequency: addForm.billing.frequency,
                startDate: addForm.billing.startDate,
              }
            : {},
    };
    if (addForm.purchaseDate) payload.purchaseDate = addForm.purchaseDate;
    const res = await api.post("/api/customer-package/add", payload);
    if (res.success) {
      if (res.data?.checkoutUrl) {
        navigateCheckoutTab(checkoutTab, res.data.checkoutUrl);
        toast.success(CHECKOUT_TOAST);
      } else {
        closeCheckoutTab(checkoutTab);
        toast.success("Package added to customer.");
      }
      closeAdd();
      load();
    } else {
      closeCheckoutTab(checkoutTab);
      toast.error(res.error || "Failed to add package.");
    }
    setAdding(false);
  }

  async function handleCancel(refundOption, refundAmount) {
    if (!cancelTarget) return;
    setCancelling(true);
    const res = await api.patch(
      `/api/customer-package/${cancelTarget._id}/cancel`,
      { refundOption, refundAmount },
    );
    if (res.success) {
      toast.success("Package cancelled.");
      setCancelTarget(null);
      load();
    } else toast.error(res.error || "Failed to cancel.");
    setCancelling(false);
  }

  async function handleExtend() {
    if (!extendTarget || !extendDate) return;
    setExtending(true);
    const res = await api.put(
      `/api/enrollment/${extendTarget._id}/extend-expiry`,
      { expiryDate: extendDate },
    );
    if (res.success) {
      toast.success("Expiry date extended.");
      setExtendTarget(null);
      setExtendDate("");
      load();
    } else toast.error(res.error || "Failed to extend expiry.");
    setExtending(false);
  }

  if (loading)
    return (
      <div className="flex items-center justify-center py-16">
        <LoadingSpinner />
      </div>
    );

  const installments = getInstallments();

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-[13px] text-muted-foreground">
          {customerPkgs.length} package{customerPkgs.length !== 1 ? "s" : ""}
        </p>
        <Button size="sm" className="h-8 text-[12px]" onClick={openAdd}>
          <Plus className="h-3.5 w-3.5 mr-1.5" /> Add Package
        </Button>
      </div>

      {customerPkgs.length === 0 ? (
        <div className="rounded-xl border border-border bg-card py-16 text-center text-[13px] text-muted-foreground">
          No packages yet. Click "Add Package" to assign one.
        </div>
      ) : (
        <div className="space-y-3">
          {customerPkgs.map((enr) => {
            const pkg = enr.package ?? {};
            const det = detailsMap[String(enr._id)];
            const billing = det?.billing ?? {};
            const services = det?.services ?? pkg.services ?? [];
            const totalPaid = billing.totalPaid ?? pkg.totalPaid ?? 0;
            const collected =
              billing.amountCollected ?? pkg.amountCollected ?? 0;
            const outstanding =
              billing.outstanding ?? Math.max(0, totalPaid - collected);
            const refunded = billing.totalRefunded ?? 0;
            return (
              <div
                key={enr._id}
                className="rounded-xl border border-border bg-card p-5"
              >
                {/* Header row */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    {pkg.packageRef?.color && (
                      <div
                        className="h-9 w-9 rounded-lg shrink-0 border border-black/10"
                        style={{ backgroundColor: pkg.packageRef.color }}
                      />
                    )}
                    <div>
                      <p className="text-[13px] font-semibold text-foreground">
                        {enrollmentDisplayName(enr) || "Package"}
                      </p>
                      <p className="text-[11px] text-muted-foreground mt-0.5">
                        Purchased {formatDate(pkg.purchaseDate)}
                        {pkg.expiryDate
                          ? ` · Expires ${formatDate(pkg.expiryDate)}`
                          : " · No expiry"}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 flex-wrap justify-end shrink-0">
                    {pkg.billingType && pkg.billingType !== "one_time" && (
                      <span className="inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-medium bg-violet-500/10 text-violet-600 capitalize">
                        {pkg.billingType.replace("_", " ")}
                      </span>
                    )}
                    <span
                      className={`inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-medium ${paymentStatusColor(pkg.paymentStatus)}`}
                    >
                      {paymentStatusLabel(pkg.paymentStatus)}
                    </span>
                    <span
                      className={`inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-medium ${statusColor(pkg.status)}`}
                    >
                      {pkg.status}
                    </span>
                    {pkg.status !== "cancelled" && pkg.expiryDate && (
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-7 px-2.5 text-[11px] font-medium"
                        onClick={() => {
                          const d = pkg.expiryDate
                            ? new Date(pkg.expiryDate)
                                .toISOString()
                                .slice(0, 10)
                            : "";
                          setExtendDate(d);
                          setExtendTarget({
                            _id: enr._id,
                            packageName: pkg.packageName,
                          });
                        }}
                      >
                        Extend
                      </Button>
                    )}
                    {pkg.status === "active" && (
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-7 px-2.5 text-[11px] font-medium border-destructive/40 text-destructive hover:bg-destructive/10"
                        onClick={() =>
                          setCancelTarget({
                            _id: enr._id,
                            packageName: pkg.packageName,
                            maxRefundable: Math.max(0, collected - refunded),
                          })
                        }
                      >
                        <X className="h-3 w-3 mr-1" /> Cancel
                      </Button>
                    )}
                  </div>
                </div>

                {/* Billing summary — 4 columns */}
                <div className="mt-4 grid grid-cols-4 gap-3 rounded-lg bg-muted/40 p-3">
                  {[
                    {
                      label: "Total Price",
                      value: `$${Number(totalPaid).toFixed(2)}`,
                    },
                    {
                      label: "Collected",
                      value: `$${Number(collected).toFixed(2)}`,
                      cls: "text-success",
                    },
                    {
                      label: "Outstanding",
                      value: `$${Number(outstanding).toFixed(2)}`,
                      cls:
                        outstanding > 0
                          ? "text-rose-600"
                          : "text-muted-foreground",
                    },
                    {
                      label: "Refunded",
                      value: `$${Number(refunded).toFixed(2)}`,
                      cls:
                        refunded > 0 ? "text-warning" : "text-muted-foreground",
                    },
                  ].map(({ label, value, cls }) => (
                    <div key={label} className="text-center">
                      <p className="text-[10px] text-muted-foreground mb-0.5">
                        {label}
                      </p>
                      <p
                        className={`text-[13px] font-semibold ${cls ?? "text-foreground"}`}
                      >
                        {value}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Chasing an outstanding balance is the moment this is wanted, so the
                    action sits where the balance is read. */}
                {outstanding > 0 && cloverReady && (
                  <div className="mt-2 flex justify-end">
                    <SendPaymentLinkMenu
                      customerID={customerID}
                      target={{ kind: "package", enrollmentID: enr._id }}
                      onSent={load}
                    />
                  </div>
                )}

                {/* Payment plan / scheduled-flexible installment schedule */}
                {plansMap[String(enr._id)] && (
                  <div className="mt-4 border-t border-border pt-4">
                    <PaymentSchedule
                      plan={plansMap[String(enr._id)]}
                      cpStatus={pkg.status}
                      outstanding={outstanding}
                      billingType={pkg.billingType}
                      customerID={customerID}
                      locationID={locationID}
                      onPayInstallment={setPayInstallTarget}
                      onChangeDate={setChangeInstallDateTarget}
                      onAddInstallment={setAddInstallTarget}
                      onSent={load}
                    />
                  </div>
                )}

                {/* Services with full session breakdown */}
                {services.length > 0 && (
                  <div className="mt-4 border-t border-border pt-4">
                    <p className="text-[11px] font-medium text-muted-foreground uppercase tracking-wide mb-2.5">
                      Services
                    </p>
                    <div className="space-y-2.5">
                      {services.map((svc, i) => {
                        const sessTotal = svc.sessionsTotal ?? 0;
                        const sessSched = svc.sessionsScheduled ?? 0;
                        // `sessionsCompleted` (real CalendarEvent charge
                        // history) is ALWAYS a number, never null/undefined —
                        // `??` alone would silently bury `sessionsUsed` (e.g.
                        // an imported package's Sessions Taken count with no
                        // accompanying Lessons-sheet history) behind a 0
                        // forever. But `sessionsUsed` is the backend's raw
                        // booking-time counter — it already counts every
                        // still-scheduled (not yet completed) session too, so
                        // subtract sessSched before taking the floor, or a
                        // normal (non-imported) package double-counts its
                        // live-scheduled sessions as both "completed" (via
                        // this fallback) and "scheduled". Only the portion of
                        // sessionsUsed that sessSched can't already explain —
                        // i.e. genuinely pre-existing/imported usage with no
                        // CalendarEvent behind it — should raise the floor.
                        const sessUsed = Math.max(
                          svc.sessionsCompleted ?? 0,
                          (svc.sessionsUsed ?? 0) - sessSched,
                        );
                        const sessRemaining = roundSessions(
                          Math.max(0, sessTotal - sessUsed - sessSched),
                        );
                        const pps = Number(svc.pricePerSession) || 0;
                        const effectivePps =
                          sessTotal > 0 && svc.finalAmount > 0
                            ? Number(svc.finalAmount) / sessTotal
                            : pps;
                        const svcTotal = sessTotal * pps;
                        return (
                          <div
                            key={i}
                            className="rounded-lg border border-border/60 bg-background p-3"
                          >
                            <div className="flex items-center gap-2 mb-2.5">
                              {svc.color && (
                                <span
                                  className="h-3 w-3 rounded-full shrink-0 border border-black/10"
                                  style={{ backgroundColor: svc.color }}
                                />
                              )}
                              <p className="text-[12px] font-medium text-foreground flex-1">
                                {svc.serviceName}
                              </p>
                              {svc.pricePerSession > 0 && (
                                <span className="text-[11px] text-muted-foreground">
                                  ${Number(svc.pricePerSession).toFixed(2)}
                                  /session
                                </span>
                              )}
                              {svcTotal > 0 && (
                                <span className="text-[12px] font-semibold text-foreground">
                                  ${svcTotal.toFixed(2)}
                                </span>
                              )}
                            </div>
                            {/* Session counts — 4 boxes */}
                            <div className="grid grid-cols-4 gap-1.5 mb-2">
                              {[
                                { label: "Total", value: sessTotal },
                                {
                                  label: "Completed",
                                  value: sessUsed,
                                  cls: sessUsed > 0 ? "text-info" : "",
                                },
                                {
                                  label: "Scheduled",
                                  value: sessSched,
                                  cls: sessSched > 0 ? "text-violet-600" : "",
                                },
                                {
                                  label: "Remaining",
                                  value: sessRemaining,
                                  cls:
                                    sessRemaining > 0
                                      ? "text-success"
                                      : "text-muted-foreground",
                                },
                              ].map(({ label, value, cls }) => (
                                <div
                                  key={label}
                                  className="text-center bg-muted/40 rounded-md py-1.5"
                                >
                                  <p className="text-[9px] uppercase tracking-wide text-muted-foreground">
                                    {label}
                                  </p>
                                  <p
                                    className={`text-[14px] font-bold ${cls ?? "text-foreground"}`}
                                  >
                                    {roundSessions(value)}
                                  </p>
                                </div>
                              ))}
                            </div>
                            <SessionBar used={sessUsed} total={sessTotal} />
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                <PaymentTimeline
                  customerID={customerID}
                  enrollmentID={String(enr._id)}
                />
              </div>
            );
          })}
        </div>
      )}

      {/* Pay installment dialog */}
      <PayInstallmentDialog
        open={Boolean(payInstallTarget)}
        onClose={() => setPayInstallTarget(null)}
        plan={payInstallTarget?.plan}
        installmentIndex={payInstallTarget?.index}
        billingType={payInstallTarget?.billingType}
        locationID={locationID}
        onSuccess={load}
      />

      {/* Change installment date dialog */}
      <ChangeInstallmentDateDialog
        open={Boolean(changeInstallDateTarget)}
        onClose={() => setChangeInstallDateTarget(null)}
        plan={changeInstallDateTarget?.plan}
        installmentIndex={changeInstallDateTarget?.index}
        onSuccess={load}
      />

      {/* Add installment dialog — flexible plans only */}
      <AddInstallmentDialog
        open={Boolean(addInstallTarget)}
        onClose={() => setAddInstallTarget(null)}
        plan={addInstallTarget?.plan}
        outstanding={addInstallTarget?.outstanding}
        onSuccess={load}
      />

      {/* Cancel confirm */}
      <CancelRefundDialog
        open={Boolean(cancelTarget)}
        onClose={() => setCancelTarget(null)}
        title="Cancel Package"
        itemName={cancelTarget?.packageName}
        maxRefundable={cancelTarget?.maxRefundable ?? 0}
        quoteUrl={cancelTarget ? `/api/customer-package/${cancelTarget._id}/cancel-quote` : null}
        submitting={cancelling}
        onConfirm={handleCancel}
      />

      {/* Extend expiry */}
      <Dialog
        open={Boolean(extendTarget)}
        onOpenChange={(v) => {
          if (!v) {
            setExtendTarget(null);
            setExtendDate("");
          }
        }}
      >
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle>Extend Package Expiry</DialogTitle>
          </DialogHeader>
          <p className="text-[13px] text-muted-foreground mt-1">
            Set a new expiry date for{" "}
            <span className="font-semibold text-foreground">
              {extendTarget?.packageName}
            </span>
            . If the new date is in the future the package will be reactivated.
          </p>
          <div className="mt-4">
            <label className="text-[12px] font-medium text-foreground block mb-1">
              New Expiry Date
            </label>
            <input
              type="date"
              value={extendDate}
              onChange={(e) => setExtendDate(e.target.value)}
              className="w-full rounded-md border border-border bg-background px-3 py-2 text-[13px] focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>
          <div className="flex justify-end gap-2 mt-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setExtendTarget(null);
                setExtendDate("");
              }}
            >
              Cancel
            </Button>
            <Button
              size="sm"
              disabled={extending || !extendDate}
              onClick={handleExtend}
            >
              {extending ? "Saving…" : "Extend Expiry"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Add Package — 3-step dialog */}
      <Dialog
        open={addOpen}
        onOpenChange={(v) => {
          if (!v) closeAdd();
        }}
      >
        <DialogContent className={addStep === 2 ? "max-w-3xl" : "max-w-lg"}>
          <DialogHeader>
            <DialogTitle>Add Package</DialogTitle>
            {/* Step progress bar */}
            <div className="flex gap-1 mt-2">
              {[1, 2, 3].map((s) => (
                <div
                  key={s}
                  className={`h-1 flex-1 rounded-full transition-colors ${s <= addStep ? "bg-primary" : "bg-muted"}`}
                />
              ))}
            </div>
            <p className="text-[11px] text-muted-foreground">
              {addStep === 1
                ? "Step 1 of 3 — Choose package"
                : addStep === 2
                  ? "Step 2 of 3 — Configure services & pricing"
                  : "Step 3 of 3 — Set billing"}
            </p>
          </DialogHeader>

          {/* ── Step 1: Choose package ── */}
          {addStep === 1 && (
            <div className="space-y-4 mt-2">
              <FormField label="Enrollment" required>
                <div className="relative">
                  <select
                    value={addForm.enrollmentID}
                    onChange={(e) =>
                      setAddForm((f) => ({
                        ...f,
                        enrollmentID: e.target.value,
                      }))
                    }
                    className="h-9 w-full appearance-none rounded-lg border border-border bg-background px-3 pr-8 text-[13px] outline-none focus:border-primary"
                  >
                    <option value="">Select enrollment…</option>
                    {enrollments
                      .filter((e) => !e.package)
                      .map((e) => {
                        const ordinal =
                          ["1st", "2nd", "3rd"][e.enrollmentNumber - 1] ??
                          `${e.enrollmentNumber}th`;
                        return (
                          <option key={e._id} value={e._id}>
                            {ordinal} Enrollment{e.label ? ` — ${e.label}` : ""}
                          </option>
                        );
                      })}
                  </select>
                  <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
                </div>
                {enrollments.filter((e) => !e.package).length === 0 && (
                  <p className="text-[11px] text-warning mt-1">
                    No active enrollments without a package. Create an
                    enrollment first in the Enrollments tab.
                  </p>
                )}
              </FormField>
              <FormField label="Package" required>
                <div className="relative">
                  <select
                    value={addForm.packageID}
                    onChange={(e) => onPkgChange(e.target.value)}
                    className="h-9 w-full appearance-none rounded-lg border border-border bg-background px-3 pr-8 text-[13px] outline-none focus:border-primary"
                  >
                    <option value="">Select package…</option>
                    {allPkgs.map((p) => (
                      <option key={p._id} value={p._id}>
                        {p.packageName}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
                </div>
              </FormField>
              {selectedPkg && (
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
                    {selectedPkg.services?.length !== 1 ? "s" : ""}
                    {" · "}
                    {selectedPkg.totalDays > 0
                      ? `${selectedPkg.totalDays} days validity`
                      : "No expiry"}
                  </p>
                </div>
              )}
              <FormField label="Purchase date (optional)">
                <input
                  type="date"
                  value={addForm.purchaseDate}
                  onChange={(e) =>
                    setAddForm((f) => ({ ...f, purchaseDate: e.target.value }))
                  }
                  className="h-9 w-full rounded-lg border border-border bg-background px-3 text-[13px] outline-none focus:border-primary"
                />
              </FormField>
              <div className="flex justify-end gap-2 pt-1">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={closeAdd}
                >
                  Cancel
                </Button>
                <Button
                  type="button"
                  size="sm"
                  disabled={!addForm.packageID || !addForm.enrollmentID}
                  onClick={() => setAddStep(2)}
                >
                  Next
                </Button>
              </div>
            </div>
          )}

          {/* ── Step 2: Configure services ── */}
          {addStep === 2 && (
            <div className="space-y-4 mt-2">
              <div className="overflow-x-auto rounded-lg border border-border">
                <table className="w-full text-[12px]">
                  <thead>
                    <tr className="bg-muted/40 border-b border-border">
                      {[
                        "Service",
                        "Color",
                        "Sessions",
                        "Price / Session",
                        "Discount",
                        "Total",
                      ].map((h) => (
                        <th
                          key={h}
                          className="px-3 py-2 text-left text-[10px] font-medium text-muted-foreground whitespace-nowrap"
                        >
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {addForm.services.map((svc, i) => (
                      <tr
                        key={i}
                        className={i > 0 ? "border-t border-border" : ""}
                      >
                        <td className="px-3 py-2 font-medium text-foreground whitespace-nowrap">
                          {svc.serviceName}
                        </td>
                        <td className="px-3 py-2">
                          <input
                            type="color"
                            value={svc.color || "#6366f1"}
                            onChange={(e) =>
                              updateSvc(i, "color", e.target.value)
                            }
                            className="h-7 w-9 rounded border border-border cursor-pointer p-0.5 bg-background"
                          />
                        </td>
                        <td className="px-3 py-2">
                          <input
                            type="number"
                            min="0"
                            value={svc.numberOfSessions}
                            onChange={(e) =>
                              updateSvc(i, "numberOfSessions", e.target.value)
                            }
                            className="h-7 w-16 rounded border border-border bg-background px-2 text-[12px] outline-none focus:border-primary"
                          />
                        </td>
                        <td className="px-3 py-2">
                          <div className="relative">
                            <span className="absolute left-2 top-1/2 -translate-y-1/2 text-[11px] text-muted-foreground">
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
                                updateSvc(i, "pricePerSession", e.target.value)
                              }
                              className={`h-7 w-20 rounded border pl-5 pr-2 text-[12px] outline-none ${svc.isChargeable === false ? "border-border bg-muted/30 text-muted-foreground cursor-not-allowed" : "border-border bg-background focus:border-primary"}`}
                            />
                          </div>
                        </td>
                        <td className="px-3 py-2">
                          <div className="flex items-center gap-1">
                            <select
                              value={svc.discountType}
                              onChange={(e) =>
                                updateSvc(i, "discountType", e.target.value)
                              }
                              className="h-7 rounded border border-border bg-background px-1 text-[11px] outline-none focus:border-primary"
                            >
                              <option value="none">—</option>
                              <option value="percentage">%</option>
                              <option value="fixed">$</option>
                            </select>
                            {svc.discountType !== "none" && (
                              <input
                                type="number"
                                min="0"
                                step="any"
                                value={svc.discountAmount}
                                onChange={(e) =>
                                  updateSvc(i, "discountAmount", e.target.value)
                                }
                                className="h-7 w-16 rounded border border-border bg-background px-2 text-[11px] outline-none focus:border-primary"
                              />
                            )}
                          </div>
                        </td>
                        <td className="px-3 py-2 font-semibold text-foreground whitespace-nowrap">
                          ${Number(svc.finalAmount).toFixed(2)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot>
                    {totalDiscount > 0 && (
                      <tr className="border-t border-border bg-muted/20">
                        <td
                          colSpan={5}
                          className="px-3 py-2 text-[11px] font-medium text-muted-foreground text-right"
                        >
                          Discount
                        </td>
                        <td className="px-3 py-2 text-[11px] font-medium text-warning">
                          -${totalDiscount.toFixed(2)}
                        </td>
                      </tr>
                    )}
                    <tr className="border-t border-border bg-muted/30">
                      <td
                        colSpan={5}
                        className="px-3 py-2 text-[11px] font-medium text-muted-foreground text-right"
                      >
                        Total
                      </td>
                      <td className="px-3 py-2 text-[12px] font-semibold text-foreground">
                        ${totalAmount.toFixed(2)}
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </div>

              <div className="flex justify-between gap-2 pt-1">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setAddStep(1)}
                >
                  Back
                </Button>
                <Button
                  type="button"
                  size="sm"
                  disabled={addForm.services.length === 0}
                  onClick={() => setAddStep(3)}
                >
                  Next
                </Button>
              </div>
            </div>
          )}

          {/* ── Step 3: Billing ── */}
          {addStep === 3 && (
            <div className="space-y-4 mt-2">
              {/* Billing type selector */}
              <div>
                <p className="text-[12px] font-medium text-muted-foreground mb-2">
                  Billing Type
                </p>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    {
                      value: "one_time",
                      label: "One-time",
                      desc: "Full payment now",
                    },
                    {
                      value: "payment_plan",
                      label: "Payment Plan",
                      desc: "Autopay installments",
                    },
                    {
                      value: "flexible",
                      label: "Flexible",
                      desc: "Pay as you go",
                    },
                  ].map((opt) => (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() =>
                        setAddForm((f) => ({ ...f, billingType: opt.value }))
                      }
                      className={`rounded-lg border-2 p-3 text-left transition-colors ${
                        addForm.billingType === opt.value
                          ? "border-primary bg-primary/5"
                          : "border-border hover:border-border/80 bg-background"
                      }`}
                    >
                      <p className="text-[12px] font-semibold text-foreground">
                        {opt.label}
                      </p>
                      <p className="text-[11px] text-muted-foreground mt-0.5">
                        {opt.desc}
                      </p>
                    </button>
                  ))}
                </div>
              </div>

              {/* One-time */}
              {addForm.billingType === "one_time" && (
                <div className="rounded-lg border border-border bg-muted/20 p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <p className="text-[12px] text-muted-foreground">
                      Billing Date
                    </p>
                    <p className="text-[12px] font-medium text-foreground">
                      {formatDate(addForm.purchaseDate || new Date())}
                    </p>
                  </div>
                  <div className="flex items-center justify-between border-t border-border pt-3">
                    <p className="text-[12px] text-muted-foreground">
                      Payable Balance
                    </p>
                    <p className="text-[15px] font-bold text-foreground">
                      ${totalAmount.toFixed(2)}
                    </p>
                  </div>
                  <FormField label="Payment Method" required>
                    <div className="relative">
                      <select
                        value={addForm.billing.method}
                        onChange={(e) => setBilling("method", e.target.value)}
                        className="h-9 w-full appearance-none rounded-lg border border-border bg-background px-3 pr-8 text-[13px] outline-none focus:border-primary capitalize"
                      >
                        {NO_DEVICE_PAYMENT_METHODS.map((m) => (
                          <option key={m.value} value={m.value}>
                            {m.label}
                          </option>
                        ))}
                      </select>
                      <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
                    </div>
                  </FormField>
                  {cloverNotConnected && (
                    <p className="text-[12px] text-muted-foreground">
                      Connect a card processor (Clover or Stripe) in Settings → Integrations to charge a card.
                    </p>
                  )}
                </div>
              )}

              {/* Payment plan */}
              {addForm.billingType === "payment_plan" && (
                <div className="space-y-3">
                  <div className="grid grid-cols-3 gap-3">
                    <FormField label="Installments" required>
                      <input
                        type="number"
                        min="2"
                        max="52"
                        value={addForm.billing.numberOfInstallments}
                        onChange={(e) =>
                          setBilling("numberOfInstallments", e.target.value)
                        }
                        className="h-9 w-full rounded-lg border border-border bg-background px-3 text-[13px] outline-none focus:border-primary"
                      />
                    </FormField>
                    <FormField label="Frequency" required>
                      <div className="relative">
                        <select
                          value={addForm.billing.frequency}
                          onChange={(e) =>
                            setBilling("frequency", e.target.value)
                          }
                          className="h-9 w-full appearance-none rounded-lg border border-border bg-background px-3 pr-8 text-[13px] outline-none focus:border-primary"
                        >
                          <option value="weekly">Weekly</option>
                          <option value="biweekly">Biweekly</option>
                          <option value="monthly">Monthly</option>
                        </select>
                        <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
                      </div>
                    </FormField>
                    <FormField label="Start Date" required>
                      <input
                        type="date"
                        value={addForm.billing.startDate}
                        onChange={(e) =>
                          setBilling("startDate", e.target.value)
                        }
                        className="h-9 w-full rounded-lg border border-border bg-background px-3 text-[13px] outline-none focus:border-primary"
                      />
                    </FormField>
                  </div>
                  {installments.length > 0 && (
                    <div className="rounded-lg border border-border bg-muted/20 p-3">
                      <div className="flex items-center justify-between mb-2">
                        <p className="text-[11px] font-medium text-muted-foreground uppercase tracking-wide">
                          Schedule Preview
                        </p>
                        {totalDiscount > 0 && (
                          <span className="text-[11px] text-warning">
                            ${totalDiscount.toFixed(2)} discount spread across
                            payments
                          </span>
                        )}
                      </div>
                      <div className="space-y-1 max-h-40 overflow-y-auto pr-1">
                        {installments.map((inst, i) => (
                          <div
                            key={i}
                            className="flex items-center justify-between py-1 border-b border-border/30 last:border-0"
                          >
                            <span className="text-[11px] text-muted-foreground">
                              Payment {i + 1} · {inst.date}
                            </span>
                            <span className="text-[11px] font-medium text-foreground">
                              ${inst.amount.toFixed(2)}
                            </span>
                          </div>
                        ))}
                      </div>
                      <div className="flex items-center justify-between mt-2 pt-2 border-t border-border">
                        <p className="text-[11px] font-medium text-muted-foreground">
                          Payable Balance
                        </p>
                        <p className="text-[13px] font-bold text-foreground">
                          ${totalAmount.toFixed(2)}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Flexible */}
              {addForm.billingType === "flexible" && (
                <div className="rounded-lg border border-border bg-muted/20 p-4 space-y-2">
                  <p className="text-[12px] text-muted-foreground">
                    No schedule set. Payments can be recorded manually at any
                    time.
                  </p>
                  <div className="flex items-center justify-between pt-2 border-t border-border">
                    <p className="text-[12px] text-muted-foreground">
                      Payable Balance
                    </p>
                    <p className="text-[15px] font-bold text-foreground">
                      ${totalAmount.toFixed(2)}
                    </p>
                  </div>
                </div>
              )}

              <div className="flex justify-between gap-2 pt-1">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setAddStep(2)}
                >
                  Back
                </Button>
                <Button
                  type="button"
                  size="sm"
                  disabled={adding || cloverNotConnected}
                  onClick={() => handleAdd()}
                >
                  {adding
                    ? "Adding…"
                    : payWithClover
                      ? "Pay by card"
                      : "Add Package"}
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

// ─── Enrollments Tab ─────────────────────────────────────────────────────────

const BLANK_ENR_FORM = {
  packageID: "",
  purchaseDate: "",
  services: [],
  billingType: "one_time",
  billing: {
    method: "cash",
    numberOfInstallments: 3,
    installmentMode: "count",
    installmentAmount: "",
    frequency: "monthly",
    startDate: "",
  },
};

// The Enrollments tab's "Active" bucket — the Services index counts with the
// same rule so its number always matches what clicking through shows.
function isActiveEnrollment(e) {
  return e.status === "active" && e.package?.status !== "cancelled";
}

function EnrollmentsTab({
  customerID,
  customerName = "",
  locationID,
  /** Open straight onto this enrollment — set when Overview deep-links into one. */
  initialEnrollmentID = null,
}) {
  const [statusFilter, setStatusFilter] = useState("active");
  const [enrollments, setEnrollments] = useState([]);
  const [detailsMap, setDetailsMap] = useState({});
  const [plansMap, setPlansMap] = useState({});
  const [allPkgs, setAllPkgs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedEnrId, setSelectedEnrId] = useState(initialEnrollmentID);

  useEffect(() => {
    if (initialEnrollmentID) setSelectedEnrId(String(initialEnrollmentID));
  }, [initialEnrollmentID]);

  const [createEnrollmentOpen, setCreateEnrollmentOpen] = useState(false);

  const [addTargetEnrollment, setAddTargetEnrollment] = useState(null);
  const [addStep, setAddStep] = useState(1);
  const [addForm, setAddForm] = useState(BLANK_ENR_FORM);
  const [selectedPkg, setSelectedPkg] = useState(null);
  const [adding, setAdding] = useState(false);
  const { ready: cloverReady } = useCardProcessor(locationID);

  const [cancelTarget, setCancelTarget] = useState(null);
  const [cancelling, setCancelling] = useState(false);
  const [extendTarget, setExtendTarget] = useState(null);
  const [extendDate, setExtendDate] = useState("");
  const [extending, setExtending] = useState(false);
  // Services sold on their own are given a fixed one-year validity at purchase
  // (see SERVICE_ONLY_EXPIRY_DAYS) — this is the only place it can be changed,
  // and only by roles that can write enrollments. Super admin passes through.
  const canEditValidity = hasPermission("calendar", "enrollment", "write");
  const [payInstallTarget, setPayInstallTarget] = useState(null);
  const [changeInstallDateTarget, setChangeInstallDateTarget] = useState(null);
  const [addInstallTarget, setAddInstallTarget] = useState(null);
  const [setupPlanTarget, setSetupPlanTarget] = useState(null); // { enrollment, outstanding }
  const [expandedServices, setExpandedServices] = useState(new Set());
  const [calendarEvents, setCalendarEvents] = useState([]);

  function toggleService(key) {
    setExpandedServices((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  }

  const toast = useToast();

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const [enrRes, allRes, calRes] = await Promise.all([
        api.get(`/api/enrollment?customerID=${customerID}`),
        api.get("/api/package?limit=200&isActive=true"),
        api.get(`/api/calendar/customer/${customerID}`),
      ]);
      if (calRes.success && Array.isArray(calRes.data))
        setCalendarEvents(calRes.data);
      if (allRes.success) setAllPkgs(allRes.data || []);
      if (enrRes.success) {
        const list = enrRes.data || [];
        setEnrollments(list);
        if (list.length > 0)
          setSelectedEnrId((prev) => prev ?? String(list[list.length - 1]._id));
        const withPkg = list.filter((e) => e.package);
        if (withPkg.length > 0) {
          const detResults = await Promise.all(
            withPkg.map((e) => api.get(`/api/customer-package/${e._id}/details`)),
          );
          const detMap = {};
          withPkg.forEach((e, i) => {
            if (detResults[i].success) detMap[String(e._id)] = detResults[i].data;
          });
          setDetailsMap(detMap);
          const hasPlan = withPkg.some(
            (e) =>
              e.package?.billingType === "payment_plan" ||
              e.package?.billingType === "flexible",
          );
          if (hasPlan) {
            const plansRes = await api.get(
              `/api/payment-plan/customer/${customerID}`,
            );
            if (plansRes.success) {
              const pm = {};
              (plansRes.data || []).forEach((plan) => {
                const enrId = String(plan.enrollmentID?._id ?? plan.enrollmentID);
                pm[enrId] = plan;
              });
              setPlansMap(pm);
            }
          }
        }
      } else {
        toast.error(enrRes.error || "Failed to load enrollments.");
      }
    } catch (err) {
      // A thrown error here (bad response shape, etc.) must not leave the
      // spinner stuck forever with no visible feedback.
      toast.error(err?.message || "Failed to load enrollments.");
    } finally {
      setLoading(false);
    }
  }, [customerID]);

  useEffect(() => {
    load();
  }, [load]);

  function openCreateAndAddFlow() {
    setCreateEnrollmentOpen(true);
  }

  function openAddPackage(enrollment) {
    setAddTargetEnrollment(enrollment);
    setAddForm(BLANK_ENR_FORM);
    setSelectedPkg(null);
    setAddStep(1);
  }

  function onEnrPkgChange(pkgId) {
    const pkg = allPkgs.find((p) => String(p._id) === pkgId);
    setSelectedPkg(pkg || null);
    setAddForm((f) => ({
      ...f,
      packageID: pkgId,
      services: (pkg?.services || []).map((s) => {
        const gross = (s.numberOfSessions || 0) * (s.pricePerSession || 0);
        const discountType = s.discountType || "none";
        const discountAmount = Number(s.discountAmount || 0);
        let finalAmount = gross;
        if (discountType === "percentage")
          finalAmount = Math.max(0, gross - (gross * discountAmount) / 100);
        else if (discountType === "fixed")
          finalAmount = Math.max(0, gross - discountAmount);
        return {
          serviceCode: s.serviceCode || "",
          serviceName: s.serviceName || "",
          color: s.color || "",
          numberOfSessions: s.numberOfSessions || 0,
          pricePerSession: s.pricePerSession || 0,
          discountType,
          discountAmount,
          finalAmount: parseFloat(finalAmount.toFixed(2)),
        };
      }),
    }));
  }

  function updateEnrSvc(i, field, val) {
    setAddForm((f) => {
      const svcs = f.services.map((s, idx) => {
        if (idx !== i) return s;
        const updated = { ...s, [field]: val };
        const gross =
          (Number(updated.pricePerSession) || 0) *
          (Number(updated.numberOfSessions) || 0);
        const discAmt = Number(updated.discountAmount) || 0;
        let finalAmount = gross;
        if (updated.discountType === "percentage")
          finalAmount = Math.max(0, gross - (gross * discAmt) / 100);
        else if (updated.discountType === "fixed")
          finalAmount = Math.max(0, gross - discAmt);
        updated.finalAmount = parseFloat(finalAmount.toFixed(2));
        return updated;
      });
      return { ...f, services: svcs };
    });
  }

  function addEnrSvcRow() {
    setAddForm((f) => ({
      ...f,
      services: [
        ...f.services,
        {
          serviceCode: "",
          serviceName: "",
          color: "",
          numberOfSessions: 0,
          pricePerSession: 0,
          discountType: "none",
          discountAmount: 0,
          finalAmount: 0,
        },
      ],
    }));
  }

  function removeEnrSvcRow(i) {
    setAddForm((f) => ({
      ...f,
      services: f.services.filter((_, idx) => idx !== i),
    }));
  }

  function setEnrBilling(field, val) {
    setAddForm((f) => ({ ...f, billing: { ...f.billing, [field]: val } }));
  }

  const enrTotalAmount = addForm.services.reduce(
    (s, svc) => s + (Number(svc.finalAmount) || 0),
    0,
  );
  const enrTotalDiscount = addForm.services.reduce((s, svc) => {
    const gross =
      (Number(svc.pricePerSession) || 0) * (Number(svc.numberOfSessions) || 0);
    return s + Math.max(0, gross - (Number(svc.finalAmount) || 0));
  }, 0);

  // Only one-time billing settles money in this dialog; the other types collect later.
  const payWithClover =
    addForm.billingType === "one_time" &&
    addForm.billing.method === "card" &&
    enrTotalAmount > 0 &&
    cloverReady;
  const cloverNotConnected =
    addForm.billingType === "one_time" &&
    addForm.billing.method === "card" &&
    enrTotalAmount > 0 &&
    !cloverReady;

  // Flexible billing collects its initial payment through a second request, after the
  // package is created. When that payment is by card it returns its own checkoutUrl,
  // so this flow needs a pre-opened tab too — otherwise the link is silently dropped.
  const flexInitialByCard =
    addForm.billingType === "flexible" &&
    Number(addForm.billing.initialPayment || 0) > 0 &&
    (addForm.billing.initialPaymentMethod || "cash") === "card" &&
    cloverReady;

  function getEnrInstallments() {
    const {
      installmentMode,
      numberOfInstallments,
      installmentAmount,
      frequency,
      startDate,
    } = addForm.billing;
    if (!startDate) return [];
    let n, baseAmt;
    if (installmentMode === "amount") {
      const amt = Number(installmentAmount || 0);
      if (!amt || amt <= 0) return [];
      n = Math.ceil(enrTotalAmount / amt);
      if (!n) return [];
      baseAmt = amt;
    } else {
      n = Number(numberOfInstallments);
      if (!n || n < 1) return [];
      baseAmt = parseFloat((enrTotalAmount / n).toFixed(2));
    }
    const result = [];
    let d = new Date(startDate);
    for (let i = 0; i < n; i++) {
      const isLast = i === n - 1;
      const amount = isLast
        ? Math.max(
            0,
            parseFloat((enrTotalAmount - baseAmt * (n - 1)).toFixed(2)),
          )
        : baseAmt;
      // startDate is "YYYY-MM-DD" (UTC midnight): formatDate reads it as that day,
      // and the UTC month step keeps it there.
      result.push({ date: formatDate(d), amount });
      if (frequency === "weekly") d = new Date(d.getTime() + 7 * 86400000);
      else if (frequency === "biweekly")
        d = new Date(d.getTime() + 14 * 86400000);
      else {
        d = new Date(d);
        d.setUTCMonth(d.getUTCMonth() + 1);
      }
    }
    return result;
  }

  async function handleEnrAdd() {
    if (addForm.billingType === "payment_plan") {
      const {
        installmentMode,
        numberOfInstallments,
        installmentAmount,
        frequency,
        startDate,
      } = addForm.billing;
      if (!frequency || !startDate) {
        toast.error("Please fill all payment plan fields.");
        return;
      }
      if (installmentMode === "amount" && !Number(installmentAmount)) {
        toast.error("Please enter an installment amount.");
        return;
      }
      if (installmentMode !== "amount" && !numberOfInstallments) {
        toast.error("Please enter number of installments.");
        return;
      }
    }
    const checkoutTab =
      payWithClover || flexInitialByCard ? openCheckoutTab() : null;
    setAdding(true);
    const targetEnrollmentID = addTargetEnrollment?._id
      ? String(addTargetEnrollment._id)
      : "";

    const payload = {
      customerID,
      packageID: addForm.packageID,
      enrollmentID: targetEnrollmentID,
      services: addForm.services.map((s) => ({
        serviceCode: s.serviceCode,
        serviceName: s.serviceName,
        color: s.color,
        numberOfSessions: Number(s.numberOfSessions),
        pricePerSession: Number(s.pricePerSession),
        discountType: s.discountType || "none",
        discountAmount: Number(s.discountAmount || 0),
        finalAmount: Number(s.finalAmount),
      })),
      billingType: addForm.billingType,
      billing:
        addForm.billingType === "one_time"
          ? { method: addForm.billing.method }
          : addForm.billingType === "payment_plan"
            ? {
                installmentMode: addForm.billing.installmentMode || "count",
                numberOfInstallments:
                  addForm.billing.installmentMode === "amount"
                    ? Math.ceil(
                        enrTotalAmount /
                          Number(addForm.billing.installmentAmount || 1),
                      )
                    : Number(addForm.billing.numberOfInstallments),
                installmentAmount:
                  addForm.billing.installmentMode === "amount"
                    ? Number(addForm.billing.installmentAmount)
                    : undefined,
                frequency: addForm.billing.frequency,
                startDate: addForm.billing.startDate,
              }
            : addForm.billingType === "flexible"
              ? { dueDate: addForm.billing.dueDate || undefined }
              : {},
    };
    if (addForm.purchaseDate) payload.purchaseDate = addForm.purchaseDate;
    const res = await api.post("/api/customer-package/add", payload);
    if (!res.success) {
      closeCheckoutTab(checkoutTab);
      toast.error(res.error || "Failed to add package.");
      setAdding(false);
      return;
    }
    if (res.data?.checkoutUrl) {
      navigateCheckoutTab(checkoutTab, res.data.checkoutUrl);
      toast.success(CHECKOUT_TOAST);
      setAddTargetEnrollment(null);
      load();
      setAdding(false);
      return;
    }
    // A flexible package still owes its initial payment below, and that request may
    // return the checkout link. Only a flow with nothing left to collect can close
    // the tab here.
    if (!flexInitialByCard) closeCheckoutTab(checkoutTab);

    const initialPayment = Number(addForm.billing.initialPayment || 0);
    if (addForm.billingType === "flexible" && initialPayment > 0) {
      const payRes = await api.post("/api/payment", {
        customerID,
        enrollmentID: targetEnrollmentID,
        type: "package_purchase",
        amount: initialPayment,
        method: addForm.billing.initialPaymentMethod || "cash",
      });
      if (!payRes.success) {
        closeCheckoutTab(checkoutTab);
        toast.error(
          payRes.error || "Package added, but initial payment failed.",
        );
        setAddTargetEnrollment(null);
        load();
        setAdding(false);
        return;
      }
      if (payRes.data?.checkoutUrl) {
        navigateCheckoutTab(checkoutTab, payRes.data.checkoutUrl);
        toast.success(CHECKOUT_TOAST);
        setAddTargetEnrollment(null);
        load();
        setAdding(false);
        return;
      }
      closeCheckoutTab(checkoutTab);
    }

    toast.success("Package added.");
    setAddTargetEnrollment(null);
    load();
    setAdding(false);
  }

  async function handleEnrCancel(refundOption, refundAmount) {
    if (!cancelTarget) return;
    setCancelling(true);
    const res = await api.patch(
      `/api/customer-package/${cancelTarget.enrollmentId}/cancel`,
      { refundOption, refundAmount },
    );
    if (res.success) {
      toast.success("Package cancelled.");
      setCancelTarget(null);
      load();
    } else toast.error(res.error || "Failed.");
    setCancelling(false);
  }

  async function handleEnrExtend() {
    if (!extendTarget || !extendDate) return;
    setExtending(true);
    const res = await api.put(
      `/api/enrollment/${extendTarget._id}/extend-expiry`,
      { expiryDate: extendDate },
    );
    if (res.success) {
      toast.success("Validity updated.");
      setExtendTarget(null);
      setExtendDate("");
      load();
    } else toast.error(res.error || "Failed to update validity.");
    setExtending(false);
  }

  if (loading)
    return (
      <div className="flex items-center justify-center py-16">
        <LoadingSpinner />
      </div>
    );

  const enrInstallments = getEnrInstallments();

  const filteredEnrollments = statusFilter
    ? enrollments.filter((e) => {
        if (statusFilter === "active") return isActiveEnrollment(e);
        if (statusFilter === "cancelled")
          return e.package?.status === "cancelled";
        if (statusFilter === "expired") return e.package?.status === "expired";
        if (statusFilter === "completed") {
          const svcs = e.package?.services ?? [];
          const total = svcs.reduce(
            (s, svc) => s + (svc.sessionsTotal ?? 0),
            0,
          );
          const used = svcs.reduce(
            (s, svc) => s + Math.max(svc.sessionsCompleted ?? 0, svc.sessionsUsed ?? 0),
            0,
          );
          return (
            e.status !== "active" &&
            e.package?.status !== "expired" &&
            e.package?.status !== "cancelled" &&
            total > 0 &&
            used >= total
          );
        }
        return true;
      })
    : enrollments;

  const isActiveTab = statusFilter === "active";

  const selectedEnr =
    filteredEnrollments.find((e) => String(e._id) === selectedEnrId) ??
    filteredEnrollments[filteredEnrollments.length - 1] ??
    null;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <div className="relative">
            <select
              value={statusFilter}
              onChange={(e) => {
                setStatusFilter(e.target.value);
                setSelectedEnrId(null);
              }}
              className="h-8 rounded-lg border border-border bg-background pl-3 pr-8 text-[12px] font-medium text-foreground outline-none focus:border-primary appearance-none cursor-pointer"
            >
              <option value="active">Active</option>
              <option value="completed">Completed</option>
              <option value="expired">Expired</option>
              <option value="cancelled">Cancelled</option>
            </select>
            <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
          </div>
          {filteredEnrollments.length > 0 ? (
            <div className="relative">
              <select
                value={selectedEnrId ?? ""}
                onChange={(e) => setSelectedEnrId(e.target.value)}
                className="h-8 rounded-lg border border-border bg-background pl-3 pr-8 text-[12px] font-medium text-foreground outline-none focus:border-primary appearance-none cursor-pointer"
              >
                {[...filteredEnrollments].reverse().map((enr) => {
                  const ordinal =
                    ["1st", "2nd", "3rd"][enr.enrollmentNumber - 1] ??
                    `${enr.enrollmentNumber}th`;
                  const pkgName = enrollmentDisplayName(enr);
                  return (
                    <option key={enr._id} value={String(enr._id)}>
                      {ordinal} Enrollment{pkgName ? ` — ${pkgName}` : ""}
                    </option>
                  );
                })}
              </select>
              <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
            </div>
          ) : (
            <p className="text-[13px] text-muted-foreground">0 enrollments</p>
          )}
        </div>
        {isActiveTab && (
          <Button
            size="sm"
            className="h-8 text-[12px]"
            onClick={openCreateAndAddFlow}
          >
            <Plus className="h-3.5 w-3.5 mr-1.5" /> Enroll
          </Button>
        )}
      </div>

      {filteredEnrollments.length === 0 ? (
        <div className="rounded-xl border border-border bg-card py-16 text-center text-[13px] text-muted-foreground">
          {isActiveTab
            ? 'No active enrollments. Click "New Enrollment" to create one.'
            : `No ${statusFilter} enrollments.`}
        </div>
      ) : selectedEnr ? (
        <div className="space-y-4">
          {[selectedEnr].map((enr) => {
            const det = enr.package ? detailsMap[String(enr._id)] : null;
            const cp = enr.package ?? null;
            const billing = det?.billing ?? {};
            const services = det?.services ?? cp?.services ?? [];
            const totalPaid = billing.totalPaid ?? cp?.totalPaid ?? 0;
            const collected =
              billing.amountCollected ?? cp?.amountCollected ?? 0;
            const outstanding =
              billing.outstanding ?? Math.max(0, totalPaid - collected);
            const refunded = billing.totalRefunded ?? 0;
            const ordinal =
              ["1st", "2nd", "3rd"][enr.enrollmentNumber - 1] ??
              `${enr.enrollmentNumber}th`;

            return (
              <div
                key={enr._id}
                className="rounded-xl border border-border bg-card overflow-hidden"
              >
                {/* Enrollment header bar */}
                <div className="flex items-center justify-between px-5 py-4 bg-muted/40 border-b border-border">
                  <div className="flex items-center gap-3">
                    <span className="text-[13px] font-bold text-foreground uppercase tracking-wider">
                      {ordinal} Enrollment
                    </span>
                    {enr.label && (
                      <span className="text-[12px] font-medium text-muted-foreground">
                        · {enr.label}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-3">
                    {enr.teacherID?.name && (
                      <span className="text-[12px] font-medium text-foreground">
                        {enr.teacherID.name}
                      </span>
                    )}
                    <span
                      className={`inline-flex items-center rounded-full px-2.5 py-1 text-[11px] font-semibold ${statusColor(enr.status)}`}
                    >
                      {enr.status}
                    </span>
                    <span className="text-[12px] text-muted-foreground">
                      {formatDate(enr.createdAt)}
                    </span>
                  </div>
                </div>

                {/* No package yet */}
                {!cp ? (
                  <div className="flex items-center justify-between px-5 py-8">
                    <p className="text-[13px] text-muted-foreground">
                      No package assigned yet.
                    </p>
                    {enr.status === "active" && (
                      <Button
                        size="sm"
                        className="h-8 text-[12px]"
                        onClick={() => openAddPackage(enr)}
                      >
                        <Plus className="h-3.5 w-3.5 mr-1.5" /> Add Package
                      </Button>
                    )}
                  </div>
                ) : (
                  <div className="p-5">
                    {/* Package header */}
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-3">
                        {cp.packageRef?.color && (
                          <div
                            className="h-9 w-9 rounded-lg shrink-0 border border-black/10"
                            style={{ backgroundColor: cp.packageRef.color }}
                          />
                        )}
                        <div>
                          <p className="text-[15px] font-bold text-foreground">
                            {enrollmentDisplayName(enr) || "Package"}
                          </p>
                          <p className="text-[12px] text-muted-foreground mt-1">
                            Purchased {formatDate(cp.purchaseDate)}
                            {cp.expiryDate
                              ? ` · Expires ${formatDate(cp.expiryDate)}`
                              : " · No expiry"}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 flex-wrap justify-end shrink-0">
                        {cp.billingType && cp.billingType !== "one_time" && (
                          <span className="inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-medium bg-violet-500/10 text-violet-600 capitalize">
                            {cp.billingType.replace("_", " ")}
                          </span>
                        )}
                        <span
                          className={`inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-medium ${paymentStatusColor(cp.paymentStatus)}`}
                        >
                          {paymentStatusLabel(cp.paymentStatus)}
                        </span>
                        {/* Enrollment header already shows its status; only surface the package's when it differs (e.g. expired). */}
                        {cp.status !== enr.status && (
                          <span
                            className={`inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-medium ${statusColor(cp.status)}`}
                          >
                            {cp.status}
                          </span>
                        )}
                        {canEditValidity && cp.status !== "cancelled" && (
                            <Button
                              variant="outline"
                              size="sm"
                              className="h-7 px-2.5 text-[11px] font-medium"
                              onClick={() => {
                                setExtendDate(
                                  new Date(cp.expiryDate || Date.now())
                                    .toISOString()
                                    .slice(0, 10),
                                );
                                setExtendTarget({
                                  _id: enr._id,
                                  packageName:
                                    enrollmentDisplayName(enr) ||
                                    cp.packageName,
                                });
                              }}
                            >
                              Expiry
                            </Button>
                          )}
                        <BounceableCheque
                          customerID={customerID}
                          enrollmentID={enr._id}
                          onBounced={load}
                        />
                        {cp.status === "active" && (
                          <Button
                            variant="outline"
                            size="sm"
                            className="h-7 px-2.5 text-[11px] font-medium border-destructive/40 text-destructive hover:bg-destructive/10"
                            onClick={() =>
                              setCancelTarget({
                                enrollmentId: enr._id,
                                packageName: cp.packageName,
                                maxRefundable: Math.max(
                                  0,
                                  collected - refunded,
                                ),
                              })
                            }
                          >
                            <X className="h-3 w-3 mr-1" /> Cancel
                          </Button>
                        )}
                      </div>
                    </div>

                    {/* Billing summary */}
                    <div className="mt-4 grid grid-cols-4 divide-x divide-border rounded-lg border border-border bg-muted/30 overflow-hidden">
                      {[
                        {
                          label: "Total Price",
                          value: `$${Number(totalPaid).toFixed(2)}`,
                        },
                        {
                          label: "Collected",
                          value: `$${Number(collected).toFixed(2)}`,
                          cls: "text-success",
                        },
                        {
                          label: "Outstanding",
                          value: `$${Number(outstanding).toFixed(2)}`,
                          cls:
                            outstanding > 0
                              ? "text-rose-500"
                              : "text-muted-foreground",
                        },
                        {
                          label: "Refunded",
                          value: `$${Number(refunded).toFixed(2)}`,
                          cls:
                            refunded > 0
                              ? "text-warning"
                              : "text-muted-foreground",
                        },
                      ].map(({ label, value, cls }) => (
                        <div key={label} className="text-center py-3 px-2">
                          <p className="text-[11px] font-medium text-muted-foreground mb-1 uppercase tracking-wide">
                            {label}
                          </p>
                          <p
                            className={`text-[15px] font-bold ${cls ?? "text-foreground"}`}
                          >
                            {value}
                          </p>
                        </div>
                      ))}
                    </div>

                    {/* Payment plan / scheduled-flexible installments. For
                        flexible billing, a fully-paid plan has nothing left
                        to schedule — paid installments already show in
                        Payment History below, and any new balance goes
                        through the Pay Now card instead of this box. */}
                    {plansMap[String(enr._id)] &&
                      (cp.billingType !== "flexible" ||
                        plansMap[String(enr._id)].installments.some(
                          (i) => i.status === "pending",
                        )) && (
                      <PaymentSchedule
                        plan={plansMap[String(enr._id)]}
                        cpStatus={cp.status}
                        outstanding={outstanding}
                        billingType={cp.billingType}
                        customerID={customerID}
                        locationID={locationID}
                        onPayInstallment={setPayInstallTarget}
                        onChangeDate={setChangeInstallDateTarget}
                        onAddInstallment={setAddInstallTarget}
                        onSent={load}
                      />
                    )}

                    {/* Set up a going-forward payment plan on a package that
                        doesn't have one yet — mainly for migrated enrollments,
                        which land with a static outstanding balance and no
                        billing schedule (see customerImport.service.js).
                        setupPaymentPlanForEnrollment schedules cp.dueAmount,
                        not the Collected-derived `outstanding` figure above —
                        those two can diverge (e.g. this card's `outstanding`
                        is still $1000 for a legacy-imported enrollment whose
                        $700-collected Payment record predates this feature,
                        while dueAmount already correctly says $300). Pass the
                        same amount the backend will actually schedule so the
                        dialog never promises a number it won't deliver. */}
                    {(() => {
                      const schedulable =
                        cp.dueAmount != null
                          ? Number(cp.dueAmount)
                          : outstanding;
                      return (
                        (!cp.billingType || cp.billingType === "one_time") &&
                        enr.status !== "cancelled" &&
                        cp.status !== "cancelled" &&
                        !plansMap[String(enr._id)] &&
                        schedulable > 0 && (
                          <div className="mt-5 border-t border-border pt-5">
                            <div className="flex items-center justify-between mb-3">
                              <p className="text-[12px] font-bold text-foreground uppercase tracking-widest">
                                Payment Due
                              </p>
                              <button
                                type="button"
                                onClick={() =>
                                  setSetupPlanTarget({
                                    enrollment: enr,
                                    outstanding: schedulable,
                                  })
                                }
                                className="text-[11px] font-medium text-muted-foreground hover:text-foreground underline underline-offset-2"
                              >
                                Set up a payment plan instead
                              </button>
                            </div>
                            <PaymentDueCard
                              itemName={cp.packageName}
                              badgeLabel="One-time"
                              amountDue={schedulable}
                              customerID={customerID}
                              locationID={locationID}
                              paymentType="package_purchase"
                              paymentTarget={{ enrollmentID: enr._id }}
                              sendLinkTarget={{ kind: "package", enrollmentID: enr._id }}
                              onSuccess={load}
                            />
                          </div>
                        )
                      );
                    })()}

                    {/* Flexible billing — single-due-date payment card.
                        Hidden only while the flexible enrollment carries a
                        tracked schedule with payments still pending
                        (rendered as installments above instead); a
                        completed/absent schedule with a balance still owed
                        falls through to here. */}
                    {cp.billingType === "flexible" &&
                      enr.status !== "cancelled" &&
                      cp.status !== "cancelled" &&
                      cp.paymentStatus !== "paid" &&
                      !plansMap[String(enr._id)]?.installments?.some(
                        (i) => i.status === "pending",
                      ) && (
                        <div className="mt-5 border-t border-border pt-5">
                          <p className="text-[12px] font-bold text-foreground uppercase tracking-widest mb-3">
                            Payment Due
                          </p>
                          <PaymentDueCard
                            itemName={cp.packageName}
                            amountDue={outstanding}
                            dueDate={cp.dueDate}
                            onChangeDueDate={(newDueDate) =>
                              api.patch(
                                `/api/customer-package/${enr._id}/flexible-due`,
                                { dueDate: newDueDate },
                              )
                            }
                            customerID={customerID}
                            locationID={locationID}
                            paymentType="package_purchase"
                            paymentTarget={{ enrollmentID: enr._id }}
                            sendLinkTarget={{ kind: "package", enrollmentID: enr._id }}
                            onSuccess={load}
                          />
                        </div>
                      )}

                    {/* Services — coverage of completed / scheduled lessons by the money collected */}
                    {services.length > 0 && (
                      <EnrollmentServicesTable
                        enr={enr}
                        cp={cp}
                        services={services}
                        calendarEvents={calendarEvents}
                        customerID={customerID}
                        expandedServices={expandedServices}
                        onToggle={toggleService}
                      />
                    )}

                    <PaymentTimeline
                      customerID={customerID}
                      enrollmentID={String(enr._id)}
                    />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      ) : null}

      {/* Pay installment dialog */}
      <PayInstallmentDialog
        open={Boolean(payInstallTarget)}
        onClose={() => setPayInstallTarget(null)}
        plan={payInstallTarget?.plan}
        installmentIndex={payInstallTarget?.index}
        billingType={payInstallTarget?.billingType}
        locationID={locationID}
        onSuccess={load}
      />

      {/* Change installment date dialog */}
      <ChangeInstallmentDateDialog
        open={Boolean(changeInstallDateTarget)}
        onClose={() => setChangeInstallDateTarget(null)}
        plan={changeInstallDateTarget?.plan}
        installmentIndex={changeInstallDateTarget?.index}
        onSuccess={load}
      />

      {/* Cancel confirm */}
      <CancelRefundDialog
        open={Boolean(cancelTarget)}
        onClose={() => setCancelTarget(null)}
        title="Cancel Package"
        itemName={cancelTarget?.packageName}
        maxRefundable={cancelTarget?.maxRefundable ?? 0}
        quoteUrl={cancelTarget ? `/api/customer-package/${cancelTarget.enrollmentId}/cancel-quote` : null}
        submitting={cancelling}
        onConfirm={handleEnrCancel}
      />

      {/* Add installment dialog — flexible plans only */}
      <AddInstallmentDialog
        open={Boolean(addInstallTarget)}
        onClose={() => setAddInstallTarget(null)}
        plan={addInstallTarget?.plan}
        outstanding={addInstallTarget?.outstanding}
        onSuccess={load}
      />

      {/* Set up a new payment plan on an existing package (e.g. migrated enrollments) */}
      <SetupPaymentPlanDialog
        open={Boolean(setupPlanTarget)}
        onClose={() => setSetupPlanTarget(null)}
        enrollment={setupPlanTarget?.enrollment}
        outstanding={setupPlanTarget?.outstanding ?? 0}
        onSuccess={load}
      />

      {/* Change validity (expiry date) */}
      <Dialog
        open={Boolean(extendTarget)}
        onOpenChange={(v) => {
          if (!v) {
            setExtendTarget(null);
            setExtendDate("");
          }
        }}
      >
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle>Change Validity</DialogTitle>
          </DialogHeader>
          <p className="text-[13px] text-muted-foreground mt-1">
            Set a new expiry date for{" "}
            <span className="font-semibold text-foreground">
              {extendTarget?.packageName}
            </span>
            . If the new date is in the future it will be reactivated.
          </p>
          <div className="mt-4">
            <label className="text-[12px] font-medium text-foreground block mb-1">
              New Expiry Date
            </label>
            <input
              type="date"
              value={extendDate}
              onChange={(e) => setExtendDate(e.target.value)}
              className="w-full rounded-md border border-border bg-background px-3 py-2 text-[13px] focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>
          <div className="flex justify-end gap-2 mt-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setExtendTarget(null);
                setExtendDate("");
              }}
            >
              Cancel
            </Button>
            <Button
              size="sm"
              disabled={extending || !extendDate}
              onClick={handleEnrExtend}
            >
              {extending ? "Saving…" : "Save Validity"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <CreateEnrollmentSheet
        open={createEnrollmentOpen}
        onClose={() => setCreateEnrollmentOpen(false)}
        customerID={customerID}
        customerName={customerName}
        locationID={locationID}
        onSuccess={({ enrollmentID } = {}) => {
          toast.success("Enrollment and package created.");
          setSelectedEnrId(enrollmentID ? String(enrollmentID) : null);
          load();
        }}
      />

      {/* Add Package — side panel */}
      <Sheet
        open={Boolean(addTargetEnrollment)}
        onClose={() => setAddTargetEnrollment(null)}
        width="520px"
      >
        <SheetContent
          onClose={() => setAddTargetEnrollment(null)}
          className="flex flex-col overflow-hidden p-0"
        >
          <div className="shrink-0 border-b border-border px-5 py-4">
            <h2 className="text-[15px] font-bold text-foreground">
              Add Package
            </h2>
          </div>
          <div className="flex-1 overflow-y-auto px-5 py-4">
            <div className="space-y-4">
              {/* ── Package ── */}
              <div className="grid grid-cols-2 gap-3">
                <FormField label="Package" required>
                  <div className="relative">
                    <select
                      value={addForm.packageID}
                      onChange={(e) => onEnrPkgChange(e.target.value)}
                      className="h-8 w-full appearance-none rounded-lg border border-border bg-background px-3 pr-8 text-[12px] outline-none focus:border-primary"
                    >
                      <option value="">Select package…</option>
                      {allPkgs.map((p) => (
                        <option key={p._id} value={p._id}>
                          {p.packageName}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
                  </div>
                </FormField>
                <FormField label="Purchase date (optional)">
                  <input
                    type="date"
                    value={addForm.purchaseDate}
                    onChange={(e) =>
                      setAddForm((f) => ({
                        ...f,
                        purchaseDate: e.target.value,
                      }))
                    }
                    className="h-8 w-full rounded-lg border border-border bg-background px-3 text-[12px] outline-none focus:border-primary"
                  />
                </FormField>
              </div>

              {/* ── Services table ── */}
              {(addForm.packageID || addForm.services.length > 0) && (
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-wide text-muted-foreground mb-2">
                    Services
                  </p>
                  <div className="rounded-lg border border-border overflow-x-auto">
                    <table className="min-w-full text-[12px]">
                      <thead>
                        <tr className="bg-muted/40 border-b border-border">
                          {[
                            "Service",
                            "Color",
                            "Sessions",
                            "Price / Session",
                            "Discount",
                            "Total",
                            "",
                          ].map((h, i) => (
                            <th
                              key={i}
                              className="px-3 py-2 text-left text-[10px] font-semibold text-muted-foreground whitespace-nowrap"
                            >
                              {h}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {addForm.services.map((svc, i) => (
                          <tr
                            key={i}
                            className={i > 0 ? "border-t border-border" : ""}
                          >
                            <td className="px-3 py-2">
                              <input
                                type="text"
                                value={svc.serviceName}
                                onChange={(e) =>
                                  updateEnrSvc(i, "serviceName", e.target.value)
                                }
                                placeholder="Service name"
                                className="h-7 w-36 rounded-md border border-border bg-background px-2 text-[11px] outline-none focus:border-primary"
                              />
                            </td>
                            <td className="px-3 py-2">
                              <input
                                type="color"
                                value={svc.color || "#6366f1"}
                                onChange={(e) =>
                                  updateEnrSvc(i, "color", e.target.value)
                                }
                                className="h-7 w-8 rounded border border-border cursor-pointer p-0.5 bg-background"
                              />
                            </td>
                            <td className="px-3 py-2">
                              <input
                                type="number"
                                min="0"
                                value={svc.numberOfSessions}
                                onChange={(e) =>
                                  updateEnrSvc(
                                    i,
                                    "numberOfSessions",
                                    e.target.value,
                                  )
                                }
                                className="h-7 w-16 rounded-md border border-border bg-background px-2 text-[11px] outline-none focus:border-primary"
                              />
                            </td>
                            <td className="px-3 py-2">
                              <div className="relative">
                                <span className="absolute left-2 top-1/2 -translate-y-1/2 text-[11px] text-muted-foreground">
                                  $
                                </span>
                                <input
                                  type="number"
                                  min="0"
                                  step="any"
                                  value={svc.pricePerSession}
                                  onChange={(e) =>
                                    updateEnrSvc(
                                      i,
                                      "pricePerSession",
                                      e.target.value,
                                    )
                                  }
                                  className="h-7 w-20 rounded-md border border-border bg-background pl-5 pr-2 text-[11px] outline-none focus:border-primary"
                                />
                              </div>
                            </td>
                            <td className="px-3 py-2">
                              <div className="flex items-center gap-1">
                                <select
                                  value={svc.discountType}
                                  onChange={(e) =>
                                    updateEnrSvc(
                                      i,
                                      "discountType",
                                      e.target.value,
                                    )
                                  }
                                  className="h-7 rounded-md border border-border bg-background px-1.5 text-[11px] outline-none focus:border-primary"
                                >
                                  <option value="none">—</option>
                                  <option value="percentage">%</option>
                                  <option value="fixed">$</option>
                                </select>
                                {svc.discountType !== "none" && (
                                  <input
                                    type="number"
                                    min="0"
                                    step="any"
                                    value={svc.discountAmount}
                                    onChange={(e) =>
                                      updateEnrSvc(
                                        i,
                                        "discountAmount",
                                        e.target.value,
                                      )
                                    }
                                    className="h-7 w-16 rounded-md border border-border bg-background px-2 text-[11px] outline-none focus:border-primary"
                                  />
                                )}
                              </div>
                            </td>
                            <td className="px-3 py-2 text-[12px] font-semibold text-foreground whitespace-nowrap">
                              ${Number(svc.finalAmount).toFixed(2)}
                            </td>
                            <td className="px-2 py-2">
                              <button
                                type="button"
                                onClick={() => removeEnrSvcRow(i)}
                                className="text-muted-foreground hover:text-destructive text-[16px] leading-none"
                              >
                                ×
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                      <tfoot>
                        {enrTotalDiscount > 0 && (
                          <tr className="border-t border-border bg-muted/20">
                            <td
                              colSpan={5}
                              className="px-3 py-1.5 text-[11px] font-medium text-muted-foreground text-right"
                            >
                              Discount
                            </td>
                            <td className="px-3 py-1.5 text-[11px] font-medium text-warning">
                              -${enrTotalDiscount.toFixed(2)}
                            </td>
                            <td />
                          </tr>
                        )}
                        <tr className="border-t border-border bg-muted/30">
                          <td
                            colSpan={5}
                            className="px-3 py-2 text-[11px] font-medium text-muted-foreground text-right"
                          >
                            Total
                          </td>
                          <td className="px-3 py-2 text-[12px] font-semibold text-foreground">
                            ${enrTotalAmount.toFixed(2)}
                          </td>
                          <td />
                        </tr>
                      </tfoot>
                    </table>
                  </div>
                  <button
                    type="button"
                    onClick={addEnrSvcRow}
                    className="mt-2 flex items-center gap-1.5 text-[11px] font-semibold text-primary hover:underline"
                  >
                    <Plus className="h-3 w-3" /> Add service
                  </button>
                </div>
              )}

              {/* ── Billing ── */}
              {addForm.services.length > 0 &&
                (() => {
                  const chargeableSvcs = addForm.services.filter(
                    (s) => s.isChargeable !== false,
                  );
                  const canPayPerSession = chargeableSvcs.length === 1;
                  return (
                    <div className="space-y-3">
                      <p className="text-[11px] font-bold uppercase tracking-wide text-muted-foreground">
                        Billing
                      </p>
                      <div className="grid grid-cols-2 gap-2">
                        {[
                          {
                            value: "one_time",
                            label: "One-time",
                            desc: "Full payment now",
                          },
                          {
                            value: "payment_plan",
                            label: "Payment Plan",
                            desc: "Autopay installments",
                          },
                          {
                            value: "flexible",
                            label: "Flexible",
                            desc: "Pay as you go",
                          },
                          {
                            value: "pay_per_session",
                            label: "Pay Per Session",
                            desc: "Charge per booking",
                            disabled: !canPayPerSession,
                          },
                        ].map((opt) => (
                          <button
                            key={opt.value}
                            type="button"
                            disabled={opt.disabled}
                            title={
                              opt.disabled && opt.value === "pay_per_session"
                                ? "Requires exactly 1 chargeable service"
                                : undefined
                            }
                            onClick={() =>
                              !opt.disabled &&
                              setAddForm((f) => ({
                                ...f,
                                billingType: opt.value,
                              }))
                            }
                            className={`rounded-lg border-2 p-2.5 text-left transition-colors ${
                              addForm.billingType === opt.value
                                ? "border-primary bg-primary/5"
                                : opt.disabled
                                  ? "border-border bg-muted/20 text-muted-foreground opacity-50 cursor-not-allowed"
                                  : "border-border hover:border-border/80 bg-background"
                            }`}
                          >
                            <p className="text-[12px] font-semibold text-foreground">
                              {opt.label}
                            </p>
                            <p className="text-[11px] text-muted-foreground mt-0.5">
                              {opt.desc}
                            </p>
                          </button>
                        ))}
                      </div>
                      {!canPayPerSession && addForm.services.length > 0 && (
                        <p className="text-[10px] text-muted-foreground">
                          Pay Per Session requires exactly 1 chargeable service.{" "}
                          {chargeableSvcs.length === 0
                            ? "No chargeable services."
                            : `This package has ${chargeableSvcs.length} chargeable services.`}
                        </p>
                      )}

                      {addForm.billingType === "one_time" && (
                        <div className="rounded-lg border border-border bg-muted/20 p-3 space-y-3">
                          <div className="flex items-center justify-between">
                            <p className="text-[12px] text-muted-foreground">
                              Payable Balance
                            </p>
                            <p className="text-[16px] font-bold text-foreground">
                              ${enrTotalAmount.toFixed(2)}
                            </p>
                          </div>
                          <FormField label="Payment Method" required>
                            <div className="relative">
                              <select
                                value={addForm.billing.method}
                                onChange={(e) =>
                                  setEnrBilling("method", e.target.value)
                                }
                                className="h-8 w-full appearance-none rounded-lg border border-border bg-background px-3 pr-8 text-[12px] outline-none focus:border-primary capitalize"
                              >
                                {NO_DEVICE_PAYMENT_METHODS.map((m) => (
                                  <option key={m.value} value={m.value}>
                                    {m.label}
                                  </option>
                                ))}
                              </select>
                              <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
                            </div>
                          </FormField>
                          {cloverNotConnected && (
                            <p className="text-[12px] text-muted-foreground">
                              Connect a card processor (Clover or Stripe) in Settings → Integrations to charge a card.
                            </p>
                          )}
                        </div>
                      )}

                      {addForm.billingType === "payment_plan" && (
                        <div className="space-y-3">
                          <div className="grid grid-cols-2 gap-3">
                            <FormField label="Installment Mode" required>
                              <div className="relative">
                                <select
                                  value={
                                    addForm.billing.installmentMode ?? "count"
                                  }
                                  onChange={(e) =>
                                    setEnrBilling(
                                      "installmentMode",
                                      e.target.value,
                                    )
                                  }
                                  className="h-8 w-full appearance-none rounded-lg border border-border bg-background px-3 pr-8 text-[12px] outline-none focus:border-primary"
                                >
                                  <option value="count">
                                    No. of Installments
                                  </option>
                                  <option value="amount">
                                    Installment Amount
                                  </option>
                                </select>
                                <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
                              </div>
                            </FormField>
                            {addForm.billing.installmentMode === "amount" ? (
                              <FormField
                                label="Amount per Installment"
                                required
                              >
                                <div className="relative">
                                  <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-[11px] text-muted-foreground">
                                    $
                                  </span>
                                  <input
                                    type="number"
                                    min="1"
                                    step="any"
                                    placeholder="e.g. 100"
                                    value={
                                      addForm.billing.installmentAmount ?? ""
                                    }
                                    onChange={(e) =>
                                      setEnrBilling(
                                        "installmentAmount",
                                        e.target.value,
                                      )
                                    }
                                    className="h-8 w-full rounded-lg border border-border bg-background pl-6 pr-3 text-[12px] outline-none focus:border-primary"
                                  />
                                </div>
                              </FormField>
                            ) : (
                              <FormField label="Installments" required>
                                <input
                                  type="number"
                                  min="2"
                                  max="52"
                                  value={addForm.billing.numberOfInstallments}
                                  onChange={(e) =>
                                    setEnrBilling(
                                      "numberOfInstallments",
                                      e.target.value,
                                    )
                                  }
                                  className="h-8 w-full rounded-lg border border-border bg-background px-3 text-[12px] outline-none focus:border-primary"
                                />
                              </FormField>
                            )}
                            <FormField label="Frequency" required>
                              <div className="relative">
                                <select
                                  value={addForm.billing.frequency}
                                  onChange={(e) =>
                                    setEnrBilling("frequency", e.target.value)
                                  }
                                  className="h-8 w-full appearance-none rounded-lg border border-border bg-background px-3 pr-8 text-[12px] outline-none focus:border-primary"
                                >
                                  <option value="weekly">Weekly</option>
                                  <option value="biweekly">Biweekly</option>
                                  <option value="monthly">Monthly</option>
                                </select>
                                <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
                              </div>
                            </FormField>
                            <FormField label="Start Date" required>
                              <input
                                type="date"
                                value={addForm.billing.startDate}
                                onChange={(e) =>
                                  setEnrBilling("startDate", e.target.value)
                                }
                                className="h-8 w-full rounded-lg border border-border bg-background px-3 text-[12px] outline-none focus:border-primary"
                              />
                            </FormField>
                          </div>
                          {enrInstallments.length > 0 && (
                            <div className="rounded-lg border border-border bg-muted/20 p-3">
                              <div className="flex items-center justify-between mb-2">
                                <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wide">
                                  Schedule Preview
                                </p>
                                {enrTotalDiscount > 0 && (
                                  <span className="text-[11px] text-warning">
                                    ${enrTotalDiscount.toFixed(2)} discount
                                    spread across payments
                                  </span>
                                )}
                              </div>
                              <div className="space-y-1 max-h-36 overflow-y-auto pr-1">
                                {enrInstallments.map((inst, i) => (
                                  <div
                                    key={i}
                                    className="flex items-center justify-between py-1 border-b border-border/30 last:border-0"
                                  >
                                    <span className="text-[11px] text-muted-foreground">
                                      Payment {i + 1} · {inst.date}
                                    </span>
                                    <span className="text-[12px] font-medium text-foreground">
                                      ${inst.amount.toFixed(2)}
                                    </span>
                                  </div>
                                ))}
                              </div>
                              <div className="flex items-center justify-between mt-2 pt-2 border-t border-border">
                                <p className="text-[12px] font-medium text-muted-foreground">
                                  Payable Balance
                                </p>
                                <p className="text-[14px] font-bold text-foreground">
                                  ${enrTotalAmount.toFixed(2)}
                                </p>
                              </div>
                            </div>
                          )}
                        </div>
                      )}

                      {addForm.billingType === "flexible" && (
                        <div className="rounded-lg border border-border bg-muted/20 p-3 space-y-3">
                          <p className="text-[11px] text-muted-foreground">
                            No schedule set. Payment can be collected at any
                            time.
                          </p>
                          <div>
                            <label className="block text-[10px] font-medium text-muted-foreground mb-1">
                              Due Date
                            </label>
                            <input
                              type="date"
                              value={addForm.billing.dueDate}
                              onChange={(e) =>
                                setEnrBilling("dueDate", e.target.value)
                              }
                              className="w-full rounded-md border border-border bg-background px-2.5 py-1.5 text-[11px] outline-none focus:border-primary"
                            />
                          </div>
                          <div className="space-y-2 pt-2 border-t border-border">
                            <p className="text-[10px] font-medium text-muted-foreground">
                              Initial Payment (optional)
                            </p>
                            <div className="grid grid-cols-2 gap-2">
                              <div className="relative">
                                <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-[11px] text-muted-foreground">
                                  $
                                </span>
                                <input
                                  type="number"
                                  min="0"
                                  step="any"
                                  placeholder="0.00"
                                  value={addForm.billing.initialPayment}
                                  onChange={(e) =>
                                    setEnrBilling(
                                      "initialPayment",
                                      e.target.value,
                                    )
                                  }
                                  className="w-full rounded-md border border-border bg-background pl-6 pr-2.5 py-1.5 text-[11px] outline-none focus:border-primary"
                                />
                              </div>
                              <select
                                value={addForm.billing.initialPaymentMethod}
                                onChange={(e) =>
                                  setEnrBilling(
                                    "initialPaymentMethod",
                                    e.target.value,
                                  )
                                }
                                className="w-full rounded-md border border-border bg-background px-2.5 py-1.5 text-[11px] capitalize outline-none focus:border-primary"
                              >
                                {NO_DEVICE_PAYMENT_METHODS.map((m) => (
                                  <option key={m.value} value={m.value}>
                                    {m.label}
                                  </option>
                                ))}
                              </select>
                            </div>
                          </div>
                          <div className="flex items-center justify-between pt-2 border-t border-border">
                            <p className="text-[12px] text-muted-foreground">
                              Payable Balance
                            </p>
                            <p className="text-[14px] font-bold text-foreground">
                              ${enrTotalAmount.toFixed(2)}
                            </p>
                          </div>
                        </div>
                      )}

                      {addForm.billingType === "pay_per_session" && (
                        <div className="rounded-lg border border-border bg-muted/20 p-3 space-y-2">
                          <p className="text-[11px] text-muted-foreground">
                            No upfront payment. A charge is recorded
                            automatically each time a session is booked.
                          </p>
                          {chargeableSvcs.map((s) => {
                            const sessions = Number(s.numberOfSessions || 0);
                            const pricePerSession = Number(
                              s.pricePerSession || 0,
                            );
                            const finalAmount = Number(s.finalAmount || 0);
                            const hasDiscount =
                              s.discountType !== "none" &&
                              Number(s.discountAmount || 0) > 0;
                            const charges =
                              Array(sessions).fill(pricePerSession);
                            if (hasDiscount) {
                              let remaining = Math.max(
                                0,
                                pricePerSession * sessions - finalAmount,
                              );
                              for (
                                let i = sessions - 1;
                                i >= 0 && remaining > 0;
                                i--
                              ) {
                                const reduction = Math.min(
                                  charges[i],
                                  remaining,
                                );
                                charges[i] =
                                  Math.round((charges[i] - reduction) * 100) /
                                  100;
                                remaining =
                                  Math.round((remaining - reduction) * 100) /
                                  100;
                              }
                            }
                            return (
                              <div
                                key={s.serviceCode}
                                className="pt-2 border-t border-border space-y-1.5"
                              >
                                <div className="flex items-center justify-between">
                                  <p className="text-[11px] font-semibold text-foreground">
                                    {s.serviceName || s.serviceCode}
                                  </p>
                                  <p className="text-[10px] text-muted-foreground">
                                    {sessions} sessions · $
                                    {pricePerSession.toFixed(2)}/sess
                                  </p>
                                </div>
                                <div className="rounded-md border border-border overflow-hidden">
                                  <div className="grid grid-cols-2 bg-muted/40 px-2.5 py-1">
                                    <span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">
                                      Session
                                    </span>
                                    <span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider text-right">
                                      Charge
                                    </span>
                                  </div>
                                  <div className="max-h-40 overflow-y-auto">
                                    {charges.map((amount, idx) => {
                                      const isDiscounted =
                                        hasDiscount && amount < pricePerSession;
                                      return (
                                        <div
                                          key={idx}
                                          className={`grid grid-cols-2 px-2.5 py-1 ${idx > 0 ? "border-t border-border" : ""}`}
                                        >
                                          <span className="text-[11px] text-foreground">
                                            Session {idx + 1}
                                          </span>
                                          <div className="text-right">
                                            {isDiscounted && (
                                              <span className="text-[10px] text-muted-foreground line-through mr-1">
                                                ${pricePerSession.toFixed(2)}
                                              </span>
                                            )}
                                            <span
                                              className={`text-[11px] font-semibold ${isDiscounted ? "text-warning" : "text-foreground"}`}
                                            >
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
                            <p className="text-[11px] text-muted-foreground">
                              Total (if all sessions booked)
                            </p>
                            <p className="text-[13px] font-bold text-foreground">
                              $
                              {chargeableSvcs
                                .reduce(
                                  (sum, s) => sum + Number(s.finalAmount || 0),
                                  0,
                                )
                                .toFixed(2)}
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })()}

              {/* ── Footer ── */}
              <div className="flex justify-end gap-2 pt-1">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setAddTargetEnrollment(null)}
                >
                  Cancel
                </Button>
                <Button
                  type="button"
                  size="sm"
                  disabled={adding || cloverNotConnected}
                  onClick={() => handleEnrAdd()}
                >
                  {adding
                    ? "Adding…"
                    : payWithClover
                      ? "Pay by card"
                      : "Add Package"}
                </Button>
              </div>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}

// Purchase-header date that reads as text ("Purchased Oct 9, 2026"). Pressing it
// opens the native date picker and reports the day to `onPick`.
function DateChip({ label, value, placeholder = "Not set", onPick }) {
  const inputRef = useRef(null);
  function open() {
    const el = inputRef.current;
    try {
      el.showPicker();
    } catch {
      el.focus();
      el.click();
    }
  }
  return (
    <div className="relative inline-flex h-8 items-center rounded-lg border border-border bg-background text-[12px]">
      <button
        type="button"
        onClick={open}
        className="inline-flex h-full items-center gap-1.5 rounded-lg px-2.5 transition-colors hover:bg-muted/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
      >
        <Calendar className="h-3.5 w-3.5 text-muted-foreground" />
        <span className="text-muted-foreground">{label}</span>
        <span className={value ? "font-medium text-foreground" : "text-muted-foreground"}>
          {value ? formatDate(value) : placeholder}
        </span>
      </button>
      <input
        ref={inputRef}
        type="date"
        tabIndex={-1}
        aria-hidden="true"
        value={toDateInput(value)}
        onChange={(e) => e.target.value && onPick(e.target.value)}
        className="pointer-events-none absolute inset-0 opacity-0"
      />
    </div>
  );
}

// ─── Payment History Tab ─────────────────────────────────────────────────────

// True once the event / competition this purchase is for is over.
const purchaseExpired = (p) => Boolean(p.expiryDate) && new Date(p.expiryDate) <= new Date();

// Enrollments' buckets minus "expired". Completed = the event is over (its expiry date has
// passed, which also checks off every product) or every product was checked off, with
// nothing left owed. Nobody has to tick products by hand.
function purchaseStatus(p) {
  if (p.cancelStatus === "cancelled") return "cancelled";
  const items = p.lineItems || [];
  const allChecked =
    items.length > 0 && items.every((li) => li.checkStatus === "checked");
  return (allChecked || purchaseExpired(p)) && Number(p.amountDue ?? p.total ?? 0) <= 0
    ? "completed"
    : "active";
}

function PurchasesTab({ customerID, customerName, locationID, initialPurchaseID = null }) {
  const [statusFilter, setStatusFilter] = useState("active");
  const [rows, setRows] = useState([]);
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [busyId, setBusyId] = useState(null);
  const [createPurchaseOpen, setCreatePurchaseOpen] = useState(false);
  const [selectedPurchaseId, setSelectedPurchaseId] = useState(initialPurchaseID);
  const toast = useToast();

  const [plans, setPlans] = useState([]);
  const [payInstallTarget, setPayInstallTarget] = useState(null); // { plan, index }
  const [changeInstallDateTarget, setChangeInstallDateTarget] = useState(null); // { plan, index }
  const [addInstallTarget, setAddInstallTarget] = useState(null); // { plan, outstanding }
  const [cancelTarget, setCancelTarget] = useState(null); // purchase row
  const [cancelling, setCancelling] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    const [pRes, payRes, planRes] = await Promise.all([
      api.get(`/api/purchase?customerID=${customerID}&limit=100`),
      api.get(`/api/payment/customer/${customerID}?limit=200`),
      api.get(`/api/payment-plan/customer/${customerID}`),
    ]);
    if (pRes.success) setRows(Array.isArray(pRes.data) ? pRes.data : []);
    if (payRes.success) setPayments(Array.isArray(payRes.data) ? payRes.data : []);
    if (planRes.success) setPlans(Array.isArray(planRes.data) ? planRes.data : []);
    setLoading(false);
  }, [customerID]);

  useEffect(() => { load(); }, [load]);

  const paymentsFor = (purchaseID) =>
    payments.filter((p) => String(p.purchaseID?._id ?? p.purchaseID) === String(purchaseID));
  const planFor = (purchaseID) =>
    plans.find((pl) => String(pl.purchaseID?._id ?? pl.purchaseID) === String(purchaseID));

  async function toggleLineCheck(row, li) {
    const next = li.checkStatus !== "checked";
    setBusyId(li._id);
    const res = await api.patch(`/api/purchase/${row._id}/line/${li._id}/check`, { checked: next });
    setBusyId(null);
    if (res.success) { load(); }
    else toast.error(res.error || "Failed");
  }

  async function changeExpiryDate(row, ymd) {
    const res = await api.put(`/api/purchase/${row._id}`, { expiryDate: ymd });
    if (res.success) { toast.success("Expiry date updated"); load(); }
    else toast.error(res.error || "Failed to update expiry date");
  }

  async function changePurchaseDate(row, ymd) {
    const res = await api.put(`/api/purchase/${row._id}`, { purchaseDate: dateInputToISO(ymd) });
    if (res.success) { toast.success("Purchase date updated"); load(); }
    else toast.error(res.error || "Failed to update purchase date");
  }

  async function handleCancelPurchase(refundOption, refundAmount) {
    if (!cancelTarget) return;
    setCancelling(true);
    const res = await api.patch(`/api/purchase/${cancelTarget._id}/cancel`, {
      refundOption,
      refundAmount,
    });
    setCancelling(false);
    if (res.success) {
      toast.success("Purchase cancelled.");
      setCancelTarget(null);
      load();
    } else toast.error(res.error || "Failed to cancel.");
  }

  const checkSummary = (row) => {
    const items = row.lineItems || [];
    // An event that is over counts every product as done, even before the sweep ticks them.
    const done = purchaseExpired(row)
      ? items.length
      : items.filter((li) => li.checkStatus === "checked").length;
    return { done, total: items.length };
  };

  const money = (n) => `$${Number(n || 0).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

  if (loading)
    return (
      <div className="flex items-center justify-center py-16">
        <LoadingSpinner />
      </div>
    );

  const filteredRows = rows.filter((r) => purchaseStatus(r) === statusFilter);
  const isActiveTab = statusFilter === "active";

  // Rows arrive newest-first (createdAt: -1) — falls back to the newest
  // purchase, same convention as the Enrollments dropdown above.
  const selectedRow =
    filteredRows.find((r) => String(r._id) === String(selectedPurchaseId)) ??
    filteredRows[0] ??
    null;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <div className="relative">
            <select
              value={statusFilter}
              onChange={(e) => {
                setStatusFilter(e.target.value);
                setSelectedPurchaseId(null);
              }}
              className="h-8 rounded-lg border border-border bg-background pl-3 pr-8 text-[12px] font-medium text-foreground outline-none focus:border-primary appearance-none cursor-pointer"
            >
              <option value="active">Active</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>
            <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
          </div>
          {filteredRows.length > 0 ? (
            <div className="relative">
              <select
                value={selectedRow ? String(selectedRow._id) : ""}
                onChange={(e) => setSelectedPurchaseId(e.target.value)}
                className="h-8 rounded-lg border border-border bg-background pl-3 pr-8 text-[12px] font-medium text-foreground outline-none focus:border-primary appearance-none cursor-pointer"
              >
                {filteredRows.map((r) => (
                  <option key={r._id} value={String(r._id)}>
                    {r.name}
                    {r.purchaseDate ?? r.createdAt ? ` — ${formatDate(r.purchaseDate ?? r.createdAt)}` : ""}
                  </option>
                ))}
              </select>
              <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
            </div>
          ) : (
            <p className="text-[13px] text-muted-foreground">0 purchases</p>
          )}
        </div>
        {isActiveTab && (
          <Button
            size="sm"
            className="h-8 text-[12px]"
            onClick={() => setCreatePurchaseOpen(true)}
          >
            <Plus className="h-3.5 w-3.5 mr-1.5" /> Enroll
          </Button>
        )}
      </div>

      {!selectedRow ? (
        <div className="rounded-xl border border-border bg-card py-16 text-center text-[13px] text-muted-foreground">
          {isActiveTab
            ? 'No active events or products. Click "Enroll" to create one.'
            : `No ${statusFilter} events or products.`}
        </div>
      ) : (
        (() => {
            const r = selectedRow;
            const due = Number(r.amountDue ?? r.total ?? 0);
            const lineItems = r.lineItems || [];
            const rowPayments = paymentsFor(r._id);
            const plan = planFor(r._id);
            const { done, total } = checkSummary(r);
            return (
              <div
                key={r._id}
                className="rounded-xl border border-border bg-card overflow-hidden"
              >
                {/* Header bar */}
                <div className="flex items-center justify-between px-5 py-4 bg-muted/40 border-b border-border">
                  <div className="flex items-center gap-3">
                    <span className="text-[13px] font-bold text-foreground uppercase tracking-wider">
                      {r.name}
                    </span>
                    {r.eventTypeID?.name && (
                      <span className="text-[12px] font-medium text-muted-foreground">
                        · {r.eventTypeID.name}
                      </span>
                    )}
                  </div>
                  <div className="flex flex-wrap items-center justify-end gap-2">
                    {r.cancelStatus === "cancelled" ? (
                      <span
                        className={`inline-flex items-center rounded-full px-2.5 py-1 text-[11px] font-semibold ${statusColor("cancelled")}`}
                      >
                        cancelled
                      </span>
                    ) : (
                      <span
                        className={`inline-flex items-center rounded-full px-2.5 py-1 text-[11px] font-semibold ${paymentStatusColor(r.billingStatus)}`}
                      >
                        {paymentStatusLabel(r.billingStatus)}
                      </span>
                    )}
                    <DateChip
                      label="Purchased"
                      value={r.purchaseDate ?? r.createdAt}
                      onPick={(ymd) => changePurchaseDate(r, ymd)}
                    />
                    {r.cancelStatus !== "cancelled" && (
                      <DateChip
                        label="Expiry"
                        value={r.expiryDate}
                        placeholder="Set date"
                        onPick={(ymd) => changeExpiryDate(r, ymd)}
                      />
                    )}
                    {r.cancelStatus !== "cancelled" && (
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-7 px-2.5 text-[11px] font-medium border-destructive/40 text-destructive hover:bg-destructive/10"
                        onClick={() => setCancelTarget(r)}
                      >
                        <X className="h-3 w-3 mr-1" /> Cancel
                      </Button>
                    )}
                  </div>
                </div>

                <div className="p-5">
                  {/* Billing summary */}
                  <div className="grid grid-cols-3 divide-x divide-border rounded-lg border border-border bg-muted/30 overflow-hidden">
                    {[
                      { label: "Total", value: money(r.total) },
                      { label: "Paid", value: money(r.amountPaid), cls: "text-success" },
                      {
                        label: "Due",
                        value: money(due),
                        cls: due > 0 ? "text-rose-500" : "text-muted-foreground",
                      },
                    ].map(({ label, value, cls }) => (
                      <div key={label} className="text-center py-3 px-2">
                        <p className="text-[11px] font-medium text-muted-foreground mb-1 uppercase tracking-wide">
                          {label}
                        </p>
                        <p className={`text-[15px] font-bold ${cls ?? "text-foreground"}`}>
                          {value}
                        </p>
                      </div>
                    ))}
                  </div>

                  {/* Payment plan / scheduled-flexible installments — same
                      component as Enrollments, so a paid-off plan drops away
                      instead of blocking the remainder below. */}
                  {plan &&
                    r.cancelStatus !== "cancelled" &&
                    (plan.installments || []).some((i) => i.status === "pending") && (
                      <PaymentSchedule
                        plan={plan}
                        cpStatus="active"
                        outstanding={due}
                        // Purchases have no package doc to carry billingType
                        // on (that's where Enrollments keep it) — the plan
                        // itself is tagged with it instead.
                        billingType={plan.billingType || r.billingType}
                        customerID={customerID}
                        locationID={locationID}
                        onPayInstallment={setPayInstallTarget}
                        onChangeDate={setChangeInstallDateTarget}
                        onAddInstallment={setAddInstallTarget}
                        onSent={load}
                      />
                    )}

                  {/* Remaining balance with nothing left scheduled to cover
                      it — same Pay Now card as a flexible enrollment. */}
                  {due > 0 &&
                    !plan?.installments?.some((i) => i.status === "pending") && (
                      <div className="mt-5 border-t border-border pt-5">
                        <p className="text-[12px] font-bold text-foreground uppercase tracking-widest mb-3">
                          Payment Due
                        </p>
                        <PaymentDueCard
                          itemName={r.name}
                          badgeLabel="Payment Due"
                          amountDue={due}
                          customerID={customerID}
                          locationID={locationID}
                          paymentType="event_purchase"
                          paymentTarget={{ purchaseID: r._id }}
                          onSuccess={load}
                        />
                      </div>
                    )}

                  {/* Line items */}
                  <div className="mt-5 border-t border-border pt-5">
                    <div className="flex items-center justify-between mb-3">
                      <p className="text-[12px] font-bold text-foreground uppercase tracking-widest">
                        Line Items
                      </p>
                      <span
                        className={`inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-medium ${total > 0 && done === total ? "bg-success/10 text-success" : "bg-muted text-muted-foreground"}`}
                      >
                        {done}/{total} checked
                      </span>
                    </div>
                    <div className="rounded-lg border border-border overflow-hidden">
                      <div
                        className="grid bg-muted/50 border-b border-border px-3 py-2.5"
                        style={{
                          gridTemplateColumns: "minmax(0,1fr) 70px 90px 90px 90px 150px",
                        }}
                      >
                        {["Item", "Qty", "Price", "Disc.", "Total", "Check"].map((h) => (
                          <span
                            key={h}
                            className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider"
                          >
                            {h}
                          </span>
                        ))}
                      </div>
                      {lineItems.length === 0 ? (
                        <p className="px-3 py-4 text-center text-[12px] text-muted-foreground">
                          No line items.
                        </p>
                      ) : (
                        lineItems.map((li, idx) => (
                          <div
                            key={li._id}
                            className={`grid items-center px-3 py-2.5 ${idx > 0 ? "border-t border-border" : ""}`}
                            style={{
                              gridTemplateColumns: "minmax(0,1fr) 70px 90px 90px 90px 150px",
                            }}
                          >
                            <span className="text-[13px] text-foreground">{li.name}</span>
                            <span className="text-[13px] text-foreground">{li.quantity}</span>
                            <span className="text-[13px] text-foreground">{money(li.unitPrice)}</span>
                            <span className="text-[13px] text-foreground">
                              {li.discount ? money(li.discount) : "—"}
                            </span>
                            <span className="text-[13px] font-semibold text-foreground">
                              {money(li.total)}
                            </span>
                            <span>
                              {li.checkStatus === "checked" ? (
                                <button
                                  type="button"
                                  disabled={busyId === li._id}
                                  onClick={() => toggleLineCheck(r, li)}
                                  className="inline-flex items-center gap-1 rounded-full bg-success/10 px-2 py-0.5 text-[10px] font-medium text-success hover:opacity-80"
                                >
                                  ✓ {li.checkedAt ? formatDate(li.checkedAt) : "checked"}
                                </button>
                              ) : li.eventDate ? (
                                <span
                                  className="text-[10px] text-muted-foreground"
                                  title="Auto-checks after this time"
                                >
                                  auto ·{" "}
                                  {formatDateTime(li.eventDate)}
                                </span>
                              ) : r.expiryDate ? (
                                <span
                                  className="text-[10px] text-muted-foreground"
                                  title="Checked off automatically once the event is over"
                                >
                                  auto · {formatDate(r.expiryDate)}
                                </span>
                              ) : (
                                <span
                                  className="text-[10px] text-muted-foreground"
                                  title="Set an expiry date on this purchase and it completes automatically"
                                >
                                  set expiry date
                                </span>
                              )}
                            </span>
                          </div>
                        ))
                      )}
                    </div>
                    {r.notes && (
                      <p className="mt-2 text-[12px] text-muted-foreground">Note: {r.notes}</p>
                    )}
                  </div>

                  <PaymentTimeline customerID={customerID} payments={rowPayments} />

                  {r.sourceTemplateID?.name && (
                    <p className="mt-4 text-[12px] text-muted-foreground">
                      From template: {r.sourceTemplateID.name}
                    </p>
                  )}
                </div>
              </div>
            );
        })()
      )}

      <CreateEventPurchaseDialog
        open={createPurchaseOpen}
        onClose={() => setCreatePurchaseOpen(false)}
        initialCustomerID={customerID}
        initialCustomerName={customerName}
        onCreated={(purchase) => {
          toast.success("Purchase created");
          setSelectedPurchaseId(purchase?._id ?? null);
          load();
        }}
      />

      {/* Pay installment dialog */}
      <PayInstallmentDialog
        open={Boolean(payInstallTarget)}
        onClose={() => setPayInstallTarget(null)}
        plan={payInstallTarget?.plan}
        installmentIndex={payInstallTarget?.index}
        billingType={payInstallTarget?.billingType}
        locationID={locationID}
        onSuccess={load}
      />

      {/* Change installment date dialog */}
      <ChangeInstallmentDateDialog
        open={Boolean(changeInstallDateTarget)}
        onClose={() => setChangeInstallDateTarget(null)}
        plan={changeInstallDateTarget?.plan}
        installmentIndex={changeInstallDateTarget?.index}
        onSuccess={load}
      />

      {/* Add installment dialog — flexible plans only */}
      <AddInstallmentDialog
        open={Boolean(addInstallTarget)}
        onClose={() => setAddInstallTarget(null)}
        plan={addInstallTarget?.plan}
        outstanding={addInstallTarget?.outstanding}
        onSuccess={load}
      />

      <CancelRefundDialog
        open={Boolean(cancelTarget)}
        onClose={() => setCancelTarget(null)}
        title="Cancel Purchase"
        itemName={cancelTarget?.name}
        maxRefundable={Math.max(0, Number(cancelTarget?.amountPaid) || 0)}
        submitting={cancelling}
        onConfirm={handleCancelPurchase}
      />
    </div>
  );
}

function PaymentsTab({ customerID }) {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [refundTarget, setRefundTarget] = useState(null);
  const LIMIT = 20;
  const lifetime = useLifetimeStats(customerID);

  const load = useCallback(
    async (p = 1) => {
      setLoading(true);
      const payRes = await api.get(
        `/api/payment/customer/${customerID}?page=${p}&limit=${LIMIT}`,
      );
      if (payRes.success) {
        setPayments(payRes.data || []);
        setTotal(payRes.meta?.total ?? payRes.data?.length ?? 0);
      }
      setLoading(false);
    },
    [customerID],
  );

  useEffect(() => {
    load(page);
  }, [load, page]);
  useTerminalChargeSettled(() => load(page));

  const totalPages = Math.max(1, Math.ceil(total / LIMIT));

  if (loading)
    return (
      <div className="flex items-center justify-center py-16">
        <LoadingSpinner />
      </div>
    );

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-[13px] text-muted-foreground">
          {total} transaction{total !== 1 ? "s" : ""}
        </p>
      </div>

      {payments.length === 0 ? (
        <div className="rounded-xl border border-border bg-card py-16 text-center text-[13px] text-muted-foreground">
          No payment records yet.
        </div>
      ) : (
        <>
          <div className="rounded-xl border border-border bg-card overflow-hidden">
            <table className="w-full text-[13px]">
              <thead>
                <tr className="border-b border-border bg-muted/30">
                  {[
                    "Date",
                    "Type",
                    "Amount",
                    "Method",
                    "Package",
                    "Processed By",
                    "Status",
                    "",
                  ].map((h) => (
                    <th
                      key={h}
                      className="px-4 py-2.5 text-left text-[11px] font-medium text-muted-foreground"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {payments.map((p, i) => {
                  return (
                    <tr
                      key={p._id}
                      className={`${i > 0 ? "border-t border-border" : ""} hover:bg-muted/20`}
                    >
                      <td className="px-4 py-3 whitespace-nowrap text-muted-foreground">
                        {formatDate(p.createdAt)}
                      </td>

                      <td className="px-4 py-3 capitalize text-muted-foreground">
                        {p.type?.replace(/_/g, " ") ?? "—"}
                      </td>
                      <td
                        className={`px-4 py-3 font-semibold ${p.type === "refund" ? "text-rose-600" : "text-foreground"}`}
                      >
                        {p.type === "refund" ? "-" : ""}$
                        {Number(p.amount).toFixed(2)}
                      </td>
                      <td className="px-4 py-3 capitalize text-muted-foreground">
                        {p.method}
                      </td>
                      <td className="px-4 py-3 text-muted-foreground">
                        {p.enrollmentID?.package?.packageName ?? "—"}
                      </td>
                      <td className="px-4 py-3 text-muted-foreground">
                        {p.processedBy?.name ?? "—"}
                      </td>
                      <td className="px-4 py-3">
                        <span
                          className={`inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-medium ${
                            p.status === "completed"
                              ? "bg-success/10 text-success"
                              : p.status === "pending"
                                ? "bg-warning/10 text-warning"
                                : "bg-rose-500/10 text-rose-600"
                          }`}
                        >
                          {p.status}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        {p.type !== "refund" && p.status === "completed" && (
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-7 px-2 text-[11px] text-muted-foreground hover:text-rose-600"
                            onClick={() => setRefundTarget(p)}
                          >
                            <RotateCcw className="h-3 w-3 mr-1" /> Refund
                          </Button>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {totalPages > 1 && (
            <div className="flex items-center justify-between">
              <p className="text-[12px] text-muted-foreground">
                Page {page} of {totalPages}
              </p>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="h-7 text-[12px]"
                  disabled={page <= 1}
                  onClick={() => setPage((p) => p - 1)}
                >
                  Prev
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="h-7 text-[12px]"
                  disabled={page >= totalPages}
                  onClick={() => setPage((p) => p + 1)}
                >
                  Next
                </Button>
              </div>
            </div>
          )}
        </>
      )}

      {/* Newest first, so the old system's total belongs after the last page. */}
      {lifetime?.spend.imported > 0 && page >= totalPages && (
        <ImportedHistoryNote importedAt={lifetime.importedAt}>
          ${lifetime.spend.imported.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} spent
        </ImportedHistoryNote>
      )}

      <IssueRefundDialog
        open={Boolean(refundTarget)}
        onClose={() => setRefundTarget(null)}
        payment={refundTarget}
        customerID={customerID}
        onSuccess={() => load(page)}
      />
    </div>
  );
}

// ─── Lessons Tab ──────────────────────────────────────────────────────────────

// Same rule as the calendar, so the two always show the same status.
const deriveEventStatus = deriveEffectiveStatus;

// Lessons brought in by a migration import. They were taken and settled in the old
// system, so they carry no package charge (resolveEventPayment reads them as paid).
const isMigratedEvent = (ev) => Boolean(ev?.importBatchID);

// The importer keeps the lesson type and teacher as text in notes ("Type: private —
// Teacher: Olga"), since they are not resolved to a catalog service or a user.
function migratedNote(ev, label) {
  const m = String(ev?.notes || "").match(new RegExp(label + ": ([^—]+)"));
  return m ? m[1].trim() : "";
}

function eventStatusBadge(status) {
  const map = {
    scheduled: "bg-info/10 text-info",
    completed: "bg-success/10 text-success",
    cancelled: "bg-muted text-muted-foreground",
    cancelled_no_charge: "bg-muted text-muted-foreground",
    cancelled_charged: "bg-warning/10 text-warning",
    no_show: "bg-rose-500/10 text-rose-600",
  };
  return map[status] ?? "bg-muted text-muted-foreground";
}

function eventStatusLabel(status) {
  return (
    {
      scheduled: "Scheduled",
      completed: "Completed",
      cancelled: "Cancelled",
      cancelled_no_charge: "Cancelled",
      cancelled_charged: "Cancelled (charged)",
      no_show: "No Show",
    }[status] ?? status
  );
}

// ─── Trial / 1st-purchase Tab ─────────────────────────────────────────────────

const INTRO_STATUS_LABELS = {
  scheduled: "Scheduled",
  completed: "Completed",
  cancelled_no_charge: "Cancelled",
  cancelled_charged: "Cancelled (charged)",
  no_show_no_charge: "No Show",
  no_show_charged: "No Show (charged)",
  held: "Held",
};

const INTRO_STATUS_PILL = {
  scheduled: "bg-primary/10 text-primary",
  completed: "bg-success/10 text-success",
  cancelled_no_charge: "bg-muted text-muted-foreground",
  cancelled_charged: "bg-muted text-muted-foreground",
  no_show_no_charge: "bg-warning/10 text-warning",
  no_show_charged: "bg-warning/10 text-warning",
  held: "bg-muted text-muted-foreground",
};

function formatIntroDateTime(value, timeZone) {
  if (!value) return "—";
  const zone = timeZone || getStudioTimezone();
  return new Date(value).toLocaleString("en-US", {
    ...(zone ? { timeZone: zone } : {}),
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
}

function formatIntroDate(value, timeZone) {
  if (!value) return "—";
  const zone = timeZone || getStudioTimezone();
  return new Date(value).toLocaleDateString("en-US", {
    ...(zone ? { timeZone: zone } : {}),
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function formatIntroTime(value, timeZone) {
  if (!value) return "";
  const zone = timeZone || getStudioTimezone();
  return new Date(value).toLocaleTimeString("en-US", {
    ...(zone ? { timeZone: zone } : {}),
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
}

function formatIntroMoney(amount) {
  if (amount == null || Number.isNaN(Number(amount))) return "—";
  return `$${Number(amount).toFixed(2)}`;
}

function IntroMetaRow({ label, value, icon: Icon }) {
  if (value == null || value === "" || value === "—") return null;
  return (
    <div className="flex items-start gap-3 py-2.5 border-b border-border/60 last:border-0">
      {Icon ? (
        <Icon className="h-3.5 w-3.5 mt-0.5 text-muted-foreground shrink-0" />
      ) : (
        <span className="w-3.5 shrink-0" />
      )}
      <div className="min-w-0 flex-1">
        <p className="text-[11px] text-muted-foreground leading-none mb-1">
          {label}
        </p>
        <p className="text-[13px] font-medium text-foreground break-words">
          {value}
        </p>
      </div>
    </div>
  );
}

function IntroStatusStep({ done, active, label, sub }) {
  return (
    <div className="flex items-start gap-3 min-w-0">
      <div
        className={[
          "mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border text-[11px] font-semibold",
          done
            ? "border-success bg-success text-white"
            : active
              ? "border-primary bg-primary text-primary-foreground"
              : "border-border bg-background text-muted-foreground",
        ].join(" ")}
      >
        {done ? <CheckCircle className="h-3.5 w-3.5" /> : null}
      </div>
      <div className="min-w-0">
        <p
          className={`text-[13px] font-medium ${active || done ? "text-foreground" : "text-muted-foreground"}`}
        >
          {label}
        </p>
        {sub && (
          <p className="text-[11px] text-muted-foreground mt-0.5">{sub}</p>
        )}
      </div>
    </div>
  );
}

function IntroTab({ customer }) {
  const toast = useToast();
  const [data, setData] = useState(null);
  const [loadError, setLoadError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [cancelling, setCancelling] = useState(false);
  const [editingPurchase, setEditingPurchase] = useState(false);
  const [savingPurchase, setSavingPurchase] = useState(false);
  const [editForm, setEditForm] = useState({
    amount: "",
    description: "",
    paidAt: "",
    channel: "sms",
  });

  const load = useCallback(async () => {
    setLoading(true);
    setLoadError(null);
    try {
      const res = await api.get(`/api/customer/${customer._id}/intro`);
      if (res.success) {
        setData(res.data);
      } else {
        setData(null);
        setLoadError(res.error || "Failed to load trial details.");
        toast.error(res.error || "Failed to load trial details.");
      }
    } catch (err) {
      setData(null);
      setLoadError(err?.message || "Failed to load trial details.");
      toast.error(err?.message || "Failed to load trial details.");
    } finally {
      setLoading(false);
    }
  }, [customer._id]);

  useEffect(() => {
    load();
  }, [load]);

  async function handleCancel(eventId) {
    const rawId = eventId && typeof eventId === "string" ? eventId : null;
    const targetId = rawId || data?.upcoming?._id;
    if (!targetId || cancelling) return;
    if (
      !confirm(
        "Cancel this trial lesson? No charge will apply. They can rebook free since they already paid.",
      )
    )
      return;
    setCancelling(true);
    try {
      const res = await api.delete(`/api/calendar/${targetId}`);
      if (res.success) {
        toast.success("Trial lesson cancelled.");
        await load();
      } else {
        toast.error(res.error || "Failed to cancel.");
      }
    } catch (err) {
      toast.error(err?.message || "Failed to cancel.");
    } finally {
      setCancelling(false);
    }
  }

  function openEditPurchase() {
    const p = data?.purchase;
    if (!p) return;
    const paid = p.paidAt ? new Date(p.paidAt) : null;
    const paidAtLocal =
      paid && !Number.isNaN(paid.getTime())
        ? new Date(paid.getTime() - paid.getTimezoneOffset() * 60000)
            .toISOString()
            .slice(0, 16)
        : "";
    setEditForm({
      amount: p.amount != null ? String(p.amount) : "",
      description: p.description || "",
      paidAt: paidAtLocal,
      channel: p.channel || "sms",
    });
    setEditingPurchase(true);
  }

  async function handleSavePurchase() {
    if (savingPurchase) return;
    const amt = Number(editForm.amount);
    if (!Number.isFinite(amt) || amt <= 0) {
      toast.error("Amount must be a positive number.");
      return;
    }
    if (!String(editForm.description || "").trim()) {
      toast.error("Description is required.");
      return;
    }
    setSavingPurchase(true);
    try {
      const res = await api.patch(`/api/customer/${customer._id}/intro/purchase`, {
        amount: amt,
        description: String(editForm.description).trim(),
        ...(editForm.paidAt
          ? { paidAt: new Date(editForm.paidAt).toISOString() }
          : {}),
        channel: editForm.channel,
      });
      if (res.success) {
        toast.success("Trial purchase updated.");
        setEditingPurchase(false);
        await load();
      } else {
        toast.error(res.error || "Failed to update purchase.");
      }
    } catch (err) {
      toast.error(err?.message || "Failed to update purchase.");
    } finally {
      setSavingPurchase(false);
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-16">
        <LoadingSpinner />
      </div>
    );
  }

  if (loadError && !data) {
    return (
      <div className="rounded-xl border border-border bg-card p-6 text-center space-y-3">
        <p className="text-sm text-muted-foreground">{loadError}</p>
        <Button size="sm" variant="outline" onClick={load}>
          Retry
        </Button>
      </div>
    );
  }

  const {
    purchase,
    purchases,
    openPurchases,
    upcoming,
    takenLesson,
    history,
    purchased,
    taken,
    status,
    statusLabel,
    rescheduleBlockReason,
    canBookOrRebook,
    timezone: studioTimezone,
  } = data || {};

  const purchaseList =
    Array.isArray(purchases) && purchases.length
      ? purchases
      : purchase
        ? [purchase]
        : [];
  const openCount = Array.isArray(openPurchases)
    ? openPurchases.length
    : canBookOrRebook
      ? 1
      : 0;

  const introConsumed = taken || rescheduleBlockReason === "intro_consumed";
  const hadCancelledTrial = (history || []).some((ev) =>
    String(ev?.status || "").startsWith("cancelled"),
  );
  const originalSlot = purchase?.slot;
  const lessonForTaken = takenLesson || null;

  const stepPurchased = Boolean(purchased);
  const stepScheduled = Boolean(upcoming) || Boolean(taken);
  const stepTaken = Boolean(taken) && openCount === 0;

  const resolvedStatus =
    status ||
    (!purchased
      ? "not_purchased"
      : openCount > 0 && !upcoming
        ? "purchased_not_taken"
        : taken && openCount === 0
          ? "taken"
          : upcoming
            ? "purchased_scheduled"
            : hadCancelledTrial
              ? "purchased_cancelled"
              : "purchased_not_taken");

  const resolvedStatusLabel =
    statusLabel ||
    {
      not_purchased: "Not purchased",
      purchased_scheduled: "Purchased — scheduled (not taken yet)",
      purchased_cancelled: "Purchased — cancelled (needs rebook)",
      purchased_not_taken: "Purchased — not scheduled yet",
      taken: "Purchased — already taken",
    }[resolvedStatus];

  const heroTone =
    resolvedStatus === "taken"
      ? "border-success/20 bg-success/5"
      : resolvedStatus === "purchased_scheduled"
        ? "border-primary/20 bg-primary/5"
        : resolvedStatus === "purchased_cancelled" ||
            resolvedStatus === "purchased_not_taken"
          ? "border-warning/25 bg-warning/5"
          : "border-border bg-muted/30";

  const heroSubcopy = !purchased
    ? "This customer has not purchased a trial lesson yet."
    : purchaseList.length > 1
      ? `They have ${purchaseList.length} intro purchases${openCount ? ` (${openCount} still open to book)` : ""}. Book or cancel each from the calendar.`
      : taken
        ? "Purchase complete and the trial lesson has been taken."
        : upcoming
          ? "Purchased and scheduled — waiting for the lesson."
          : hadCancelledTrial
            ? "Purchased, but the trial was cancelled. Book a new time from the calendar."
            : "Purchased, but not scheduled yet. Book a time from the calendar.";

  return (
    <div className="space-y-5">
      {/* Hero status — full width */}
      <div className={`rounded-xl border p-5 md:p-6 ${heroTone}`}>
        <div className="flex flex-wrap items-start justify-between gap-3 mb-5">
          <div className="min-w-0">
            <p className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground mb-1">
              Trial lesson
            </p>
            <h3 className="text-[17px] font-semibold text-foreground leading-snug">
              {resolvedStatusLabel}
            </h3>
            <p className="text-[12px] text-muted-foreground mt-1 max-w-2xl">
              {heroSubcopy}
            </p>
          </div>
          {purchased && (
            <span className="inline-flex items-center gap-1.5 rounded-full bg-background/80 border border-border px-2.5 py-1 text-[11px] font-medium text-foreground shrink-0">
              <CheckCircle className="h-3 w-3 text-success" />
              {purchaseList.length > 1
                ? `${purchaseList.length} purchases`
                : `Paid ${formatIntroMoney(purchase?.amount)}`}
            </span>
          )}
        </div>

        <div className="grid sm:grid-cols-3 gap-4 sm:gap-6">
          <IntroStatusStep
            done={stepPurchased}
            active={!stepPurchased}
            label="Purchased"
            sub={
              purchased
                ? formatIntroDate(purchase?.paidAt, studioTimezone)
                : "Not yet"
            }
          />
          <IntroStatusStep
            done={stepScheduled}
            active={purchased && !upcoming && !taken}
            label="Scheduled"
            sub={
              upcoming
                ? formatIntroDate(upcoming.startDateTime, studioTimezone)
                : taken
                  ? "Was scheduled"
                  : hadCancelledTrial
                    ? "Cancelled — needs rebook"
                    : purchased
                      ? "Needs a time"
                      : "—"
            }
          />
          <IntroStatusStep
            done={stepTaken}
            active={Boolean(upcoming)}
            label="Taken"
            sub={
              taken
                ? INTRO_STATUS_LABELS[lessonForTaken?.status] || "Completed"
                : upcoming
                  ? "Not yet"
                  : "—"
            }
          />
        </div>
      </div>

      {/* Purchase + Lesson — full-width two columns */}
      <div className="grid lg:grid-cols-2 gap-4">
        {/* Purchase card */}
        <div className="rounded-xl border border-border bg-card p-5 md:p-6">
          <div className="flex items-center justify-between gap-2 mb-4">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-muted">
                <Receipt className="h-4 w-4 text-muted-foreground" />
              </div>
              <div>
                <p className="text-[13px] font-semibold text-foreground">
                  1st Purchase
                </p>
                <p className="text-[11px] text-muted-foreground">
                  {purchase?.soldVia === "manual"
                    ? "Sold by staff"
                    : "Payment from AI / booking link"}
                </p>
              </div>
            </div>
            {purchase && !editingPurchase && hasPermission("settings", "Billings", "write") && (
              <Button
                type="button"
                size="sm"
                variant="outline"
                className="h-8 gap-1.5 text-[11px]"
                onClick={openEditPurchase}
              >
                <Pencil className="h-3 w-3" />
                Edit
              </Button>
            )}
          </div>

          {purchase ? (
            editingPurchase ? (
              <div className="space-y-3">
                <div>
                  <p className="text-[11px] font-medium text-muted-foreground mb-1">
                    Description
                  </p>
                  <input
                    type="text"
                    value={editForm.description}
                    onChange={(e) =>
                      setEditForm((f) => ({ ...f, description: e.target.value }))
                    }
                    className="h-9 w-full rounded-lg border border-border bg-background px-3 text-[13px] outline-none focus:border-primary"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <p className="text-[11px] font-medium text-muted-foreground mb-1">
                      Amount ($)
                    </p>
                    <input
                      type="number"
                      min="0.01"
                      step="any"
                      value={editForm.amount}
                      onChange={(e) =>
                        setEditForm((f) => ({ ...f, amount: e.target.value }))
                      }
                      className="h-9 w-full rounded-lg border border-border bg-background px-3 text-[13px] outline-none focus:border-primary"
                    />
                  </div>
                  <div>
                    <p className="text-[11px] font-medium text-muted-foreground mb-1">
                      Paid on
                    </p>
                    <input
                      type="datetime-local"
                      value={editForm.paidAt}
                      onChange={(e) =>
                        setEditForm((f) => ({ ...f, paidAt: e.target.value }))
                      }
                      className="h-9 w-full rounded-lg border border-border bg-background px-3 text-[13px] outline-none focus:border-primary"
                    />
                  </div>
                </div>
                <div>
                  <p className="text-[11px] font-medium text-muted-foreground mb-1">
                    Channel
                  </p>
                  <select
                    value={editForm.channel}
                    onChange={(e) =>
                      setEditForm((f) => ({ ...f, channel: e.target.value }))
                    }
                    className="h-9 w-full rounded-lg border border-border bg-background px-3 text-[13px] outline-none focus:border-primary"
                  >
                    <option value="sms">SMS</option>
                    <option value="email">Email</option>
                    <option value="both">Both</option>
                    <option value="in_person">In person</option>
                  </select>
                </div>
                <div className="flex items-center justify-end gap-2 pt-1">
                  <Button
                    type="button"
                    size="sm"
                    variant="outline"
                    disabled={savingPurchase}
                    onClick={() => setEditingPurchase(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="button"
                    size="sm"
                    disabled={savingPurchase}
                    onClick={handleSavePurchase}
                  >
                    {savingPurchase ? "Saving…" : "Save"}
                  </Button>
                </div>
              </div>
            ) : (
            <div>
              <div className="mb-3 rounded-lg bg-muted/40 px-4 py-3.5">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p className="text-[15px] font-semibold text-foreground">
                      {purchase.description || "Trial Lesson"}
                    </p>
                    <p className="text-[22px] font-semibold tracking-tight mt-0.5">
                      {formatIntroMoney(purchase.amount)}
                    </p>
                  </div>
                  <span
                    className={[
                      "inline-flex items-center rounded-full border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide shrink-0",
                      purchase.soldVia === "manual"
                        ? "border-[var(--studio-primary)]/30 bg-[var(--studio-primary)]/10 text-[var(--studio-primary)]"
                        : "border-border bg-muted text-muted-foreground",
                    ].join(" ")}
                  >
                    {purchase.soldVia === "manual" ? "Sold by Staff" : "Sold by Agent"}
                  </span>
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-x-6">
                <IntroMetaRow
                  icon={CheckCircle}
                  label="Payment status"
                  value="Paid"
                />
                <IntroMetaRow
                  icon={Calendar}
                  label="Paid on"
                  value={formatIntroDate(purchase.paidAt, studioTimezone)}
                />
                <IntroMetaRow
                  icon={Send}
                  label="Booked via"
                  value={
                    purchase.channel
                      ? String(purchase.channel).replace("_", " ").toUpperCase()
                      : null
                  }
                />
                <IntroMetaRow
                  icon={User}
                  label="Sold by"
                  value={
                    purchase.soldVia === "manual" ? "Staff (manual)" : "AI Agent"
                  }
                />
                <IntroMetaRow
                  icon={BookOpen}
                  label="Service"
                  value={originalSlot?.serviceType || null}
                />
                <div className="sm:col-span-2">
                  <IntroMetaRow
                    icon={Clock}
                    label="Slot chosen at payment"
                    value={
                      originalSlot?.startDateTime
                        ? formatIntroDateTime(
                            originalSlot.startDateTime,
                            studioTimezone,
                          )
                        : null
                    }
                  />
                </div>
              </div>
              {purchase.slotSelectionRequired && (
                <div className="mt-3 flex items-start gap-2 rounded-lg border border-warning/30 bg-warning/5 px-3 py-2.5 text-[12px] text-foreground">
                  <AlertTriangle className="h-3.5 w-3.5 mt-0.5 text-warning shrink-0" />
                  Payment cleared, but they still need to pick a new time.
                </div>
              )}
            </div>
            )
          ) : (
            <div className="rounded-lg border border-dashed border-border px-4 py-10 text-center">
              <Sparkles className="h-6 w-6 mx-auto mb-2 text-muted-foreground/50" />
              <p className="text-[13px] font-medium text-foreground">
                Not purchased yet
              </p>
              <p className="text-[12px] text-muted-foreground mt-1">
                No trial payment on record for this customer.
              </p>
            </div>
          )}
        </div>

        {/* Lesson card */}
        <div className="rounded-xl border border-border bg-card p-5 md:p-6 flex flex-col">
          <div className="flex items-center justify-between gap-2 mb-4">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-muted">
                <Calendar className="h-4 w-4 text-muted-foreground" />
              </div>
              <div>
                <p className="text-[13px] font-semibold text-foreground">
                  Lesson
                </p>
                <p className="text-[11px] text-muted-foreground">
                  Current trial booking
                </p>
              </div>
            </div>
            {upcoming && (
              <span
                className={`text-[11px] px-2 py-0.5 rounded-full font-medium ${INTRO_STATUS_PILL[upcoming.status] || "bg-muted text-muted-foreground"}`}
              >
                {INTRO_STATUS_LABELS[upcoming.status] || upcoming.status}
              </span>
            )}
            {!upcoming && taken && lessonForTaken && (
              <span
                className={`text-[11px] px-2 py-0.5 rounded-full font-medium ${INTRO_STATUS_PILL[lessonForTaken.status] || "bg-muted text-muted-foreground"}`}
              >
                {INTRO_STATUS_LABELS[lessonForTaken.status] ||
                  lessonForTaken.status}
              </span>
            )}
          </div>

          <div className="flex-1">
            {upcoming ? (
              <div>
                <div className="rounded-lg bg-muted/40 px-4 py-3.5 mb-3">
                  <p className="text-[11px] uppercase tracking-wide text-muted-foreground mb-1">
                    Upcoming
                  </p>
                  <p className="text-[16px] font-semibold text-foreground leading-snug">
                    {formatIntroDate(upcoming.startDateTime, studioTimezone)}
                  </p>
                  <p className="text-[14px] text-foreground/80 mt-0.5">
                    {formatIntroTime(upcoming.startDateTime, studioTimezone)}
                    {upcoming.endDateTime
                      ? ` – ${formatIntroTime(upcoming.endDateTime, studioTimezone)}`
                      : ""}
                  </p>
                </div>
                <div className="grid sm:grid-cols-2 gap-x-6">
                  <IntroMetaRow
                    icon={User}
                    label="Teacher"
                    value={upcoming.teacherID?.name || "Not assigned"}
                  />
                  <IntroMetaRow
                    icon={CheckCircle}
                    label="Lesson payment"
                    value={
                      upcoming.payment?.collected
                        ? `Collected${upcoming.payment?.amount != null ? ` (${formatIntroMoney(upcoming.payment.amount)})` : ""}`
                        : upcoming.chargeMethod === "direct"
                          ? "Paid (direct)"
                          : null
                    }
                  />
                  <div className="sm:col-span-2">
                    <IntroMetaRow
                      icon={BookOpen}
                      label="Title"
                      value={upcoming.title || null}
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <IntroMetaRow
                      icon={StickyNote}
                      label="Notes"
                      value={upcoming.notes || null}
                    />
                  </div>
                </div>
              </div>
            ) : taken && lessonForTaken ? (
              <div>
                <div className="rounded-lg bg-success/5 border border-success/15 px-4 py-3.5 mb-3">
                  <p className="text-[13px] font-medium text-foreground flex items-center gap-1.5">
                    <CheckCircle className="h-3.5 w-3.5 text-success" />
                    Trial already taken
                  </p>
                  <p className="text-[12px] text-muted-foreground mt-1">
                    {formatIntroDateTime(
                      lessonForTaken.startDateTime,
                      studioTimezone,
                    )}
                  </p>
                </div>
                <div className="grid sm:grid-cols-2 gap-x-6">
                  <IntroMetaRow
                    icon={User}
                    label="Teacher"
                    value={lessonForTaken.teacherID?.name || "—"}
                  />
                  <IntroMetaRow
                    icon={CheckCircle}
                    label="Result"
                    value={
                      INTRO_STATUS_LABELS[lessonForTaken.status] ||
                      lessonForTaken.status
                    }
                  />
                  <div className="sm:col-span-2">
                    <IntroMetaRow
                      icon={BookOpen}
                      label="Title"
                      value={lessonForTaken.title || null}
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <IntroMetaRow
                      icon={StickyNote}
                      label="Notes"
                      value={lessonForTaken.notes || null}
                    />
                  </div>
                </div>
              </div>
            ) : purchased ? (
              <div className="rounded-lg border border-dashed border-border px-4 py-10 text-center">
                <Clock className="h-6 w-6 mx-auto mb-2 text-warning" />
                <p className="text-[13px] font-medium text-foreground">
                  {hadCancelledTrial
                    ? "Trial cancelled — not scheduled"
                    : "Not scheduled yet"}
                </p>
                <p className="text-[12px] text-muted-foreground mt-1 max-w-sm mx-auto">
                  {hadCancelledTrial
                    ? "They already paid — book a new time from the calendar."
                    : "They already paid — book a time from the calendar."}
                </p>
              </div>
            ) : (
              <div className="rounded-lg border border-dashed border-border px-4 py-10 text-center">
                <Calendar className="h-6 w-6 mx-auto mb-2 text-muted-foreground/50" />
                <p className="text-[13px] font-medium text-foreground">
                  No lesson yet
                </p>
                <p className="text-[12px] text-muted-foreground mt-1">
                  Details appear here after the trial is purchased.
                </p>
              </div>
            )}
          </div>

          {upcoming && (
            <div className="flex flex-wrap gap-2 pt-4 mt-auto border-t border-border">
              <Button
                size="sm"
                variant="outline"
                className="text-destructive border-destructive/30 hover:bg-destructive/10"
                onClick={() => handleCancel()}
                disabled={cancelling}
              >
                <CalendarX className="h-3.5 w-3.5 mr-1.5" />
                {cancelling ? "Cancelling…" : "Cancel — No Charge"}
              </Button>
            </div>
          )}
        </div>
      </div>


      {/* History — full width */}
      {history && history.length > 0 && (
        <div className="rounded-xl border border-border bg-card p-5 md:p-6">
          <div className="flex items-center justify-between gap-3 mb-4">
            <p className="text-[13px] font-semibold text-foreground">
              Lesson history
            </p>
            <p className="text-[11px] text-muted-foreground">
              {history.length} record{history.length === 1 ? "" : "s"}
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-x-8 gap-y-0">
            {history.map((ev) => {
              const isDone =
                ev.status === "completed" || ev.status === "no_show_charged";
              const isCancel = String(ev.status || "").startsWith("cancelled");
              return (
                <div
                  key={ev._id}
                  className="flex items-start justify-between gap-3 py-3 border-b border-border/60 last:border-0 md:odd:pr-2 md:even:pl-2"
                >
                  <div className="flex items-start gap-3 min-w-0">
                    <div
                      className={[
                        "mt-0.5 flex h-[22px] w-[22px] shrink-0 items-center justify-center rounded-full border bg-card",
                        isDone
                          ? "border-success/40 text-success"
                          : "border-border text-muted-foreground",
                      ].join(" ")}
                    >
                      {isDone ? (
                        <CheckCircle className="h-3 w-3" />
                      ) : isCancel ? (
                        <XCircle className="h-3 w-3" />
                      ) : (
                        <Clock className="h-3 w-3" />
                      )}
                    </div>
                    <div className="min-w-0">
                      <p className="text-[13px] font-medium text-foreground">
                        {formatIntroDateTime(ev.startDateTime, studioTimezone)}
                      </p>
                      <p className="text-[11px] text-muted-foreground mt-0.5 truncate">
                        {[
                          ev.teacherID?.name
                            ? `with ${ev.teacherID.name}`
                            : null,
                          ev.title,
                        ]
                          .filter(Boolean)
                          .join(" · ") || "Trial lesson"}
                      </p>
                    </div>
                  </div>
                  <span
                    className={`text-[11px] px-2 py-0.5 rounded-full font-medium shrink-0 ${INTRO_STATUS_PILL[ev.status] || "bg-muted text-muted-foreground"}`}
                  >
                    {INTRO_STATUS_LABELS[ev.status] || ev.status}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {!purchased && !upcoming && (!history || !history.length) && (
        <div className="rounded-xl border border-dashed border-border px-6 py-14 text-center">
          <Sparkles className="h-8 w-8 mx-auto mb-3 text-muted-foreground/40" />
          <p className="text-[14px] font-medium text-foreground">
            No trial activity yet
          </p>
          <p className="text-[12px] text-muted-foreground mt-1 max-w-md mx-auto">
            When this customer buys and books their first lesson through AI, the
            purchase and lesson details will show up here.
          </p>
        </div>
      )}
    </div>
  );
}

const LESSON_FILTERS = [
  { id: "scheduled", label: "Scheduled" },
  { id: "completed", label: "Completed" },
  { id: "cancelled", label: "Cancelled" },
  { id: "no_show", label: "No Show" },
  { id: "paid", label: "Paid" },
  { id: "unpaid", label: "Unpaid" },
];

function LessonsTab({ customer }) {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeFilters, setActiveFilters] = useState(new Set());
  const [showFilters, setShowFilters] = useState(false);
  const [sortOrder, setSortOrder] = useState("new_to_old");
  const [membershipCoverageSet, setMembershipCoverageSet] = useState(() => new Set());
  const custId = String(customer?._id ?? "");
  const lifetime = useLifetimeStats(customer?._id);

  useEffect(() => {
    if (!customer?._id) return;
    // No lower bound: a migrated student can have lessons from years back, and all of
    // them belong in this history.
    const future = new Date();
    future.setFullYear(future.getFullYear() + 1);
    const params = new URLSearchParams({
      start: new Date("1990-01-01").toISOString(),
      end: future.toISOString(),
    });
    // Query the customer directly. The org-wide /api/calendar list this used to
    // page through is capped and sorted oldest-first, so it returned the first
    // N events in the whole studio and this customer's recent lessons — the
    // unallocated ones especially — fell off the end before the filter ran.
    api.get(`/api/calendar/customer/${customer._id}?${params}`).then((res) => {
      if (res.success && Array.isArray(res.data)) {
        setEvents(
          [...res.data].sort(
            (a, b) => new Date(b.startDateTime) - new Date(a.startDateTime),
          ),
        );
      }
      setLoading(false);
    });
    // Same coverage the calendar builds, so a lesson an active membership covers
    // reads Paid on both screens.
    api.get(`/api/customer-membership/customer/${customer._id}`).then((res) => {
      setMembershipCoverageSet(membershipCoverageFor(customer._id, res.success ? res.data : []));
    });
  }, [customer?._id]);

  // The calendar's own paid rule, judged on this student's charge.
  const paymentCtx = useMemo(
    () => buildPaymentContext(events, membershipCoverageSet, custId),
    [events, membershipCoverageSet, custId],
  );
  const deriveEventPaid = (ev) => resolveEventPayment(ev, paymentCtx).paid;

  function toggleFilter(id) {
    setActiveFilters((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  if (loading) {
    return (
      <div className="flex justify-center py-16">
        <LoadingSpinner />
      </div>
    );
  }

  // The old system's lesson count, as the oldest entry: at the bottom New to Old, the
  // top Old to New. Unfiltered list only — it is not a lesson a filter can match.
  const importedNote =
    lifetime?.lessons.imported > 0 && activeFilters.size === 0 ? (
      <ImportedHistoryNote importedAt={lifetime.importedAt}>
        {lifetime.lessons.imported.toLocaleString()} lesson{lifetime.lessons.imported === 1 ? "" : "s"} taken
      </ImportedHistoryNote>
    ) : null;

  const filteredEvents = events
    .filter((ev) => {
      if (activeFilters.size === 0) return true;
      const status = deriveEventStatus(ev);
      const isPaid = deriveEventPaid(ev);
      const isCancelledNoCharge =
        status === "cancelled_no_charge" || status === "no_show_no_charge";

      const STATUS_IDS = ["scheduled", "completed", "cancelled", "no_show"];
      const PAYMENT_IDS = ["paid", "unpaid"];
      const selectedStatuses = STATUS_IDS.filter((id) => activeFilters.has(id));
      const selectedPayments = PAYMENT_IDS.filter((id) =>
        activeFilters.has(id),
      );

      const matchesStatus =
        selectedStatuses.length === 0 ||
        (selectedStatuses.includes("scheduled") && status === "scheduled") ||
        (selectedStatuses.includes("completed") && status === "completed") ||
        (selectedStatuses.includes("cancelled") &&
          (status === "cancelled" || isCancelledNoCharge)) ||
        (selectedStatuses.includes("no_show") && status === "no_show");

      // Paid / Unpaid only mean something for a private or group lesson — a to-do never
      // matches either filter.
      const matchesPayment =
        selectedPayments.length === 0 ||
        (isPayableLesson(ev) &&
          ((selectedPayments.includes("paid") && isPaid && !isCancelledNoCharge) ||
            (selectedPayments.includes("unpaid") && !isPaid && !isCancelledNoCharge)));

      return matchesStatus && matchesPayment;
    })
    .sort((a, b) => {
      const diff = new Date(a.startDateTime) - new Date(b.startDateTime);
      return sortOrder === "old_to_new" ? diff : -diff;
    });

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-[13px] text-muted-foreground">
          {filteredEvents.length} event{filteredEvents.length !== 1 ? "s" : ""}
          {activeFilters.size > 0 ? " · filtered" : ""}
        </p>
        <div className="flex items-center gap-2">
          <div className="flex items-center rounded-lg border border-border overflow-hidden text-[12px] font-medium">
            <button
              type="button"
              onClick={() => setSortOrder("new_to_old")}
              className={`h-8 px-3 transition-colors ${sortOrder === "new_to_old" ? "bg-brand text-brand-foreground" : "bg-background text-muted-foreground hover:text-foreground"}`}
            >
              New to Old
            </button>
            <button
              type="button"
              onClick={() => setSortOrder("old_to_new")}
              className={`h-8 px-3 border-l border-border transition-colors ${sortOrder === "old_to_new" ? "bg-brand text-brand-foreground" : "bg-background text-muted-foreground hover:text-foreground"}`}
            >
              Old to New
            </button>
          </div>
          <button
            type="button"
            onClick={() => setShowFilters((v) => !v)}
            className={`flex items-center gap-1.5 h-8 rounded-lg border px-3 text-[12px] font-medium transition-colors ${
              showFilters || activeFilters.size > 0
                ? "border-brand bg-brand/10 text-brand"
                : "border-border bg-background text-muted-foreground hover:text-foreground"
            }`}
          >
            Filter
            {activeFilters.size > 0 && (
              <span className="flex h-4 w-4 items-center justify-center rounded-full bg-brand text-[9px] font-bold text-brand-foreground">
                {activeFilters.size}
              </span>
            )}
            <ChevronDown
              className={`h-3.5 w-3.5 transition-transform ${showFilters ? "rotate-180" : ""}`}
            />
          </button>
        </div>
      </div>

      {showFilters && (
        <div className="flex flex-wrap items-center gap-1.5">
          {LESSON_FILTERS.map((f) => {
            const active = activeFilters.has(f.id);
            return (
              <button
                key={f.id}
                type="button"
                onClick={() => toggleFilter(f.id)}
                className={`h-7 rounded-full px-3 text-[12px] font-medium border transition-colors ${
                  active
                    ? "bg-brand text-brand-foreground border-brand"
                    : "bg-background text-muted-foreground border-border hover:border-primary hover:text-foreground"
                }`}
              >
                {f.label}
              </button>
            );
          })}
          {activeFilters.size > 0 && (
            <button
              type="button"
              onClick={() => setActiveFilters(new Set())}
              className="h-7 rounded-full px-3 text-[12px] font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Clear
            </button>
          )}
        </div>
      )}

      {sortOrder === "old_to_new" && importedNote}

      {filteredEvents.length === 0 ? (
        <div className="rounded-xl border border-border bg-card py-16 text-center text-[13px] text-muted-foreground">
          No events found
          {activeFilters.size > 0 ? " for the selected filters" : ""}.
        </div>
      ) : (
        <div className="rounded-xl border border-border bg-card overflow-hidden">
          {filteredEvents.map((ev, i) => {
            const status = deriveEventStatus(ev);
            const isPersonalNoShow = (ev.noShowIDs || []).some(
              (id) => String(id?._id ?? id) === custId,
            );
            const date = toStudioLocalDate(new Date(ev.startDateTime), getStudioTimezone());
            const end = ev.endDateTime
              ? toStudioLocalDate(new Date(ev.endDateTime), getStudioTimezone())
              : null;
            const migrated = isMigratedEvent(ev);
            const instructor = ev.teacherID?.name || (migrated ? migratedNote(ev, "Teacher") : "");
            const migratedType = migrated ? migratedNote(ev, "Type") : "";
            const label = migrated
              ? migratedType
                ? migratedType.charAt(0).toUpperCase() + migratedType.slice(1) + " lesson"
                : "Lesson"
              : ev.title || ev.calendarServiceID?.name || "Event";
            const serviceCode = migrated
              ? "Previous system"
              : ev.calendarServiceID?.serviceCode ?? ev.type ?? "";
            const isPaid = deriveEventPaid(ev);
            const isCancelledNoCharge =
              status === "cancelled_no_charge" ||
              status === "no_show_no_charge";
            // Only a private or group lesson has a payment status; a to-do shows none.
            const payable = isPayableLesson(ev);
            const paymentLabel = isCancelledNoCharge
              ? "No Charge"
              : isPaid
                ? "Paid"
                : "Unpaid";
            const paymentClass = isCancelledNoCharge
              ? "bg-muted text-muted-foreground"
              : isPaid
                ? "bg-success/10 text-success"
                : "bg-rose-500/10 text-rose-600";
            return (
              <div
                key={ev._id ?? i}
                className={`flex items-center justify-between px-5 py-4 gap-4 ${i > 0 ? "border-t border-border" : ""}`}
              >
                <div className="flex items-center gap-4 min-w-0">
                  <div className="shrink-0 text-center w-12">
                    <p className="text-[11px] font-semibold text-muted-foreground uppercase">
                      {date.toLocaleDateString("en-US", { month: "short" })}
                    </p>
                    <p className="text-[18px] font-bold text-foreground leading-none">
                      {date.getDate()}
                    </p>
                  </div>
                  <div className="min-w-0">
                    <p className="text-[13px] font-medium text-foreground truncate">
                      {label}
                    </p>
                    <p className="text-[11px] text-muted-foreground">
                      {migrated ? (
                        // A history sheet has a day, not a time — show the year instead.
                        date.toLocaleDateString("en-US", { year: "numeric" })
                      ) : (
                        <>
                          {date.toLocaleTimeString("en-US", {
                            hour: "numeric",
                            minute: "2-digit",
                          })}
                          {end &&
                            ` – ${end.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" })}`}
                        </>
                      )}
                      {instructor && ` · ${instructor}`}
                    </p>
                    {serviceCode && (
                      <p className="text-[10px] text-muted-foreground/60 uppercase tracking-wide mt-0.5">
                        {serviceCode}
                      </p>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  {ev.allocation?.status === "unallocated" && (
                    <span
                      className="rounded-full px-2.5 py-0.5 text-[11px] font-medium bg-warning/20 text-warning"
                      title="Not allocated to a package — nothing has paid for this lesson"
                    >
                      Unallocated
                    </span>
                  )}
                  {isPersonalNoShow && (
                    <span className="rounded-full px-2.5 py-0.5 text-[11px] font-medium bg-warning/10 text-warning">
                      No Show
                    </span>
                  )}
                  <span
                    className={`rounded-full px-2.5 py-0.5 text-[11px] font-medium ${eventStatusBadge(status)}`}
                  >
                    {eventStatusLabel(status)}
                  </span>
                  {payable && (
                    <span
                      className={`rounded-full px-2.5 py-0.5 text-[11px] font-medium ${paymentClass}`}
                    >
                      {paymentLabel}
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {sortOrder === "new_to_old" && importedNote}
    </div>
  );
}

// ─── History Tab ────────────────────────────────────────────────────────────
// Status-change timeline is the primary record. customFields.migrationLegacy
// (lifetime counts, source, dance level, etc. from an import) stays as a
// secondary block when it exists.

const HISTORY_DATE_FIELDS = [
  { key: "customerSince", label: "Customer Since" },
  { key: "firstSessionDate", label: "First Session (Intro) Date" },
  { key: "lastLessonDate", label: "Last Lesson Date" },
  { key: "anniversary", label: "Anniversary" },
  { key: "nextAppointmentDate", label: "Next Appointment Date" },
];

const HISTORY_COUNT_FIELDS = [
  { key: "privatesTaken", label: "Privates Taken" },
  { key: "groupsTaken", label: "Groups Taken" },
  { key: "partiesTaken", label: "Parties Taken" },
  { key: "coachingTaken", label: "Coaching Taken" },
];

function HistoryTab({ customer }) {
  const legacy = customer?.customFields?.migrationLegacy || {};
  const hasLegacy = Object.keys(legacy).length > 0;

  // Same rule as the Total Lessons Taken card: the single imported total when given,
  // else the per-type counters added up.
  const countFields = HISTORY_COUNT_FIELDS.filter(({ key }) => legacy[key] != null);
  const totalLessons =
    legacy.totalLessonsTaken != null
      ? Number(legacy.totalLessonsTaken) || 0
      : countFields.reduce((sum, { key }) => sum + (Number(legacy[key]) || 0), 0);

  return (
    <div className="flex flex-col gap-4">
      <div className="rounded-xl border border-border bg-card p-5">
        <h2 className="mb-1 text-[13px] font-semibold text-foreground">Status history</h2>
        <p className="mb-4 text-[12px] text-muted-foreground">
          How this account moved between lifecycle statuses — including changes that were refused or held by an override.
        </p>
        <CustomerStatusHistory customerID={customer._id} />
      </div>

      {hasLegacy && (
        <>
          <div className="rounded-xl border border-border bg-card p-5">
            <h2 className="mb-1 text-[13px] font-semibold text-foreground">Legacy record</h2>
            <p className="mb-4 text-[12px] text-muted-foreground">
              Carried over from this customer&apos;s old system at migration time.
            </p>

            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
              {legacy.source && (
                <div>
                  <p className="text-[11px] text-muted-foreground mb-1">Source</p>
                  <p className="text-[13px] font-medium text-foreground">{legacy.source}</p>
                </div>
              )}
              {legacy.danceLevel && (
                <div>
                  <p className="text-[11px] text-muted-foreground mb-1">Dance Level</p>
                  <p className="text-[13px] font-medium text-foreground">{legacy.danceLevel}</p>
                </div>
              )}
              {legacy.assignedTeacher && (
                <div>
                  <p className="text-[11px] text-muted-foreground mb-1">Assigned Teacher</p>
                  <p className="text-[13px] font-medium text-foreground">{legacy.assignedTeacher}</p>
                </div>
              )}
              {legacy.lifetimeCollected !== undefined && (
                <div>
                  <p className="text-[11px] text-muted-foreground mb-1">Lifetime Collected</p>
                  <p className="text-[13px] font-medium text-foreground">
                    ${Number(legacy.lifetimeCollected).toFixed(2)}
                  </p>
                </div>
              )}
              {HISTORY_DATE_FIELDS.map(
                ({ key, label }) =>
                  legacy[key] && (
                    <div key={key}>
                      <p className="text-[11px] text-muted-foreground mb-1">{label}</p>
                      <p className="text-[13px] font-medium text-foreground">{formatDate(legacy[key])}</p>
                    </div>
                  ),
              )}
            </div>
          </div>

          {totalLessons > 0 && (
            <div className="rounded-xl border border-border bg-card p-5">
              <h2 className="mb-4 text-[13px] font-semibold text-foreground">Historic lesson counts</h2>
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-5">
                {countFields.map(({ key, label }) => (
                  <div key={key} className="rounded-xl border border-border bg-card px-4 py-3">
                    <p className="text-[11px] text-muted-foreground mb-1">{label}</p>
                    <p className="text-[19px] font-semibold text-foreground">
                      {Number(legacy[key]) || 0}
                    </p>
                  </div>
                ))}
                <div className="rounded-xl border border-border bg-primary/5 px-4 py-3">
                  <p className="text-[11px] text-muted-foreground mb-1">Total</p>
                  <p className="text-[19px] font-semibold text-primary">{totalLessons}</p>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}

// ─── Notes Tab ────────────────────────────────────────────────────────────────

function NotesTab({ customer, onUpdated }) {
  const [text, setText] = useState("");
  const [adding, setAdding] = useState(false);
  const [deletingId, setDeletingId] = useState(null);
  const [pinningId, setPinningId] = useState(null);
  const toast = useToast();

  const notes = [...(customer.notes || [])].sort((a, b) => {
    if (a.isPinned && !b.isPinned) return -1;
    if (!a.isPinned && b.isPinned) return 1;
    return new Date(b.createdAt) - new Date(a.createdAt);
  });

  async function handleAdd(e) {
    e.preventDefault();
    if (!text.trim()) return;
    setAdding(true);
    const res = await api.post(`/api/customer/${customer._id}/notes`, {
      text: text.trim(),
    });
    if (res.success) {
      toast.success("Note added.");
      setText("");
      onUpdated();
    } else toast.error(res.error || "Failed.");
    setAdding(false);
  }

  async function handlePin(noteId) {
    setPinningId(noteId);
    await api.patch(`/api/customer/${customer._id}/notes/${noteId}`);
    onUpdated();
    setPinningId(null);
  }

  async function handleDelete(noteId) {
    setDeletingId(noteId);
    const res = await api.delete(
      `/api/customer/${customer._id}/notes/${noteId}`,
    );
    if (res.success) {
      toast.success("Note deleted.");
      onUpdated();
    } else toast.error(res.error || "Failed.");
    setDeletingId(null);
  }

  return (
    <div className="space-y-4">
      <form onSubmit={handleAdd} className="flex gap-2">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Add a note…"
          className="flex-1 h-9 rounded-lg border border-border bg-card px-3 text-[13px] outline-none focus:border-primary"
        />
        <Button
          type="submit"
          size="sm"
          className="h-9 px-4 text-[12px]"
          disabled={adding || !text.trim()}
        >
          {adding ? "Adding…" : "Add"}
        </Button>
      </form>

      {notes.length === 0 ? (
        <div className="rounded-xl border border-border bg-card py-16 text-center text-[13px] text-muted-foreground">
          No notes yet.
        </div>
      ) : (
        <div className="space-y-2">
          {notes.map((note) => (
            <div
              key={note._id}
              className={`rounded-xl border bg-card px-4 py-3.5 ${note.isPinned ? "border-primary/30 bg-primary/5" : "border-border"}`}
            >
              <div className="flex items-start justify-between gap-3">
                <p className="text-[13px] text-foreground leading-relaxed flex-1">
                  {note.text}
                </p>
                <div className="flex items-center gap-1 shrink-0">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-7 w-7 text-muted-foreground hover:text-primary"
                    disabled={pinningId === note._id}
                    onClick={() => handlePin(note._id)}
                  >
                    {note.isPinned ? (
                      <PinOff className="h-3.5 w-3.5" />
                    ) : (
                      <Pin className="h-3.5 w-3.5" />
                    )}
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-7 w-7 text-muted-foreground hover:text-destructive"
                    disabled={deletingId === note._id}
                    onClick={() => handleDelete(note._id)}
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </Button>
                </div>
              </div>
              <p className="text-[11px] text-muted-foreground mt-1.5">
                {formatDate(note.createdAt)}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Student account shell ───────────────────────────────────────────────────

// One entry per drill-in view: its title, icon and the one-line explainer the
// section index shows. Keeping it in one map means the pill nav, the index
// rows and the breadcrumb can never drift apart.
const VIEW_META = {
  "active-enrollments": {
    label: "Enrollments",
    icon: ClipboardList,
    blurb: "Purchased programs, remaining lessons and payment schedules.",
  },
  purchases: {
    label: "Events & Products",
    icon: Receipt,
    blurb: "Event registrations plus the full history of product purchases.",
  },
  memberships: {
    label: "Memberships",
    icon: CreditCard,
    blurb: "Recurring service memberships and the benefits they include.",
  },
  lessons: {
    label: "Lessons",
    icon: BookOpen,
    blurb: "Every booked, completed, cancelled and missed lesson.",
  },
  intro: {
    label: "Trial",
    icon: Sparkles,
    blurb: "The introductory class or first à la carte lesson.",
  },
  wallet: {
    label: "Wallet",
    icon: Wallet,
    blurb: "Available account funds and the full wallet ledger.",
  },
  payments: {
    label: "Payment History",
    icon: Receipt,
    blurb: "Payments, receipts, refunds and their status in one ledger.",
  },
  notes: {
    label: "Notes",
    icon: StickyNote,
    blurb: "Instructor and staff notes, with author and date.",
  },
  history: {
    label: "History",
    icon: History,
    blurb: "Lifecycle status changes, plus any record carried over from a migration.",
  },
  contracts: {
    label: "Waivers & Contracts",
    icon: FileText,
    blurb: "Signed waivers, agreements and related files.",
  },
  members: {
    label: "Members",
    icon: Users,
    blurb: "Partners, guardians and household members on this account.",
  },
  profile: {
    label: "Personal details",
    icon: User,
    blurb: "Contact information, address, tags and lifecycle status.",
  },
};

const SECTIONS = [
  { id: "overview", label: "Overview" },
  {
    id: "services",
    label: "Services",
    title: "Services & Purchases",
    blurb:
      "Everything this student has bought — enrollments, memberships, lessons, events and their trial.",
    views: ["active-enrollments", "purchases", "memberships", "lessons", "intro"],
  },
  { id: "communication", label: "Communication" },
  {
    id: "billing",
    label: "Billing",
    title: "Billing",
    blurb: "Account funds and the full payment record.",
    views: ["wallet", "payments"],
  },
  {
    id: "records",
    label: "Records",
    title: "Records",
    blurb: "Notes, account history, signed documents and connected people.",
    views: ["notes", "history", "contracts", "members", "profile"],
  },
];

const money = (n) => `$${(Number(n) || 0).toFixed(2)}`;

function locationNamesOf(raw, locations) {
  const ids = Array.isArray(raw)
    ? raw.map((l) => String(l?._id ?? l)).filter(Boolean)
    : raw
      ? [String(raw?._id ?? raw)]
      : [];
  const names = ids
    .map((id) => locations.find((l) => String(l._id) === id)?.name)
    .filter(Boolean);
  if (!names.length) return "—";
  return names.length <= 2
    ? names.join(", ")
    : `${names.slice(0, 2).join(", ")} +${names.length - 2}`;
}

// Everything the Overview and the section indexes need, fetched once for the
// whole page instead of each panel doing its own round trip.
function useAccountSummary(customerID) {
  const [state, setState] = useState({
    loading: true,
    enrollments: [],
    memberships: [],
    events: [],
    payments: [],
    purchases: [],
    billing: {},
    wallet: 0,
    sessions: { total: 0, used: 0, remaining: 0 },
  });

  const reload = useCallback(async () => {
    if (!customerID) return;
    const from = new Date();
    from.setFullYear(from.getFullYear() - 1);
    const to = new Date();
    to.setFullYear(to.getFullYear() + 1);
    const calParams = new URLSearchParams({
      start: from.toISOString(),
      end: to.toISOString(),
    });

    const [enrRes, memRes, calRes, payRes, purchRes, wallet] = await Promise.all([
      // The list endpoint pages at 20 by default — a long-tenured student would
      // otherwise lose every enrollment past the first page.
      api.get(`/api/enrollment?customerID=${customerID}&limit=500`),
      api.get(`/api/customer-membership/customer/${customerID}`),
      api.get(`/api/calendar/customer/${customerID}?${calParams}`),
      api.get(`/api/payment/customer/${customerID}?page=1&limit=500`),
      api.get(`/api/purchase?customerID=${customerID}&limit=500`),
      fetchWalletBalance(customerID),
    ]);

    const enrollments = enrRes.success ? enrRes.data || [] : [];
    // Only active packages get a details round trip — the session counters are
    // about what's left to book, and a long-tenured student's expired and
    // completed enrollments would otherwise cost a request each on every load.
    const live = enrollments.filter(
      (e) => e.status !== "cancelled" && e.package?.status === "active",
    );
    const [details, privRes] = await Promise.all([
      Promise.all(
        live.map((e) => api.get(`/api/customer-package/${e._id}/details`)),
      ),
      api.get("/api/calendar-service?type=private&limit=200"),
    ]);
    // The billing figure the enrollment card itself shows (payment rows net of refunds).
    // The stored amountCollected/dueAmount snapshot can lag it — e.g. after a refund.
    const billing = {};
    live.forEach((e, i) => {
      const b = details[i]?.success ? details[i].data?.billing : null;
      if (b) billing[String(e._id)] = b;
    });
    const privateCodes = new Set(
      (privRes.success ? privRes.data || [] : []).map((s) => s.serviceCode),
    );
    const sessions = details.reduce(
      (acc, res) => {
        (res.success ? res.data?.services ?? [] : [])
          .filter((svc) => privateCodes.has(svc.serviceCode))
          .forEach((svc) => {
          const total = svc.sessionsTotal ?? 0;
          const used = svc.sessionsUsed ?? 0;
          acc.total += roundSessions(total);
          acc.used += used;
          acc.remaining += Math.max(0, roundSessions(total) - roundSessions(used));
        });
        return acc;
      },
      { total: 0, used: 0, remaining: 0 },
    );

    setState({
      loading: false,
      enrollments,
      memberships: memRes.success ? memRes.data || [] : [],
      events:
        calRes.success && Array.isArray(calRes.data) ? calRes.data : [],
      payments: payRes.success ? payRes.data || [] : [],
      purchases: purchRes.success ? purchRes.data || [] : [],
      billing,
      wallet: Number(wallet) || 0,
      sessions,
    });
  }, [customerID]);

  useEffect(() => {
    let alive = true;
    setState((p) => ({ ...p, loading: true }));
    reload().finally(() => {
      if (!alive) return;
      setState((p) => ({ ...p, loading: false }));
    });
    return () => {
      alive = false;
    };
  }, [reload]);

  return { ...state, reload };
}

// ─── Shell building blocks ───────────────────────────────────────────────────

function Panel({ title, subtitle, action, className = "", children }) {
  return (
    <section
      className={`rounded-2xl border border-border bg-card p-5 ${className}`}
    >
      {(title || action) && (
        <div className="flex items-start justify-between gap-3 mb-4">
          <div className="min-w-0">
            {title && (
              <h2 className="text-[14px] font-semibold text-foreground">
                {title}
              </h2>
            )}
            {subtitle && (
              <p className="text-[12px] text-muted-foreground mt-1">
                {subtitle}
              </p>
            )}
          </div>
          {action}
        </div>
      )}
      {children}
    </section>
  );
}

function LinkButton({ children, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="shrink-0 text-[12px] font-semibold text-primary hover:underline"
    >
      {children}
    </button>
  );
}

function Field({ label, children }) {
  return (
    <div className="min-w-0">
      <p className="text-[10px] uppercase tracking-wide text-muted-foreground mb-1">
        {label}
      </p>
      <div className="text-[13px] font-medium text-foreground break-words">
        {children}
      </div>
    </div>
  );
}

/** A row that behaves like a link but stays a div, so it can hold buttons. */
function ClickableRow({ onClick, className = "", children }) {
  return (
    <div
      role="button"
      tabIndex={0}
      onClick={onClick}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onClick();
        }
      }}
      className={`cursor-pointer outline-none transition-colors focus-visible:ring-2 focus-visible:ring-primary/40 ${className}`}
    >
      {children}
    </div>
  );
}

// ─── Section index (Services / Billing / Records) ────────────────────────────

function SectionIndex({ section, summary, onOpen, customerID }) {
  const [expanded, setExpanded] = useState(null);
  // Lessons nobody has paid for — surfaced on the Lessons row so a student who is
  // behind can't go unnoticed until someone opens each lesson.
  const unpaidLessons = useUnpaidLessons(section.views?.includes("lessons") ? customerID : null, summary.events);

  // Live counts so the index says something useful before you click into it.
  const stateFor = (viewId) => {
    const activeMemberships = summary.memberships.filter(
      (m) => m.status !== "cancelled" && m.status !== "expired",
    );
    const upcoming = summary.events.filter(
      (ev) =>
        new Date(ev.startDateTime) > new Date() &&
        !String(deriveEventStatus(ev)).startsWith("cancelled"),
    );
    switch (viewId) {
      case "active-enrollments": {
        const activeEnrollments = summary.enrollments.filter(isActiveEnrollment);
        return {
          value: `${activeEnrollments.length} active`,
          hint: activeEnrollments.length ? "Active" : "None yet",
          children: activeEnrollments.map((enr) => {
            const pkg = enr.package;
            const due =
              pkg?.dueAmount != null
                ? Number(pkg.dueAmount)
                : Math.max(
                    0,
                    Number(pkg?.totalPaid ?? pkg?.contractedValue ?? 0) -
                      Number(pkg?.amountCollected || 0),
                  );
            return {
              id: String(enr._id),
              title: pkg?.packageName || enrollmentDisplayName(enr),
              sub: `Purchased ${formatDate(pkg?.purchaseDate ?? enr.createdAt)}`,
              value: due > 0 ? `${money(due)} due` : "Paid in full",
              hint: pkg?.status ?? enr.status,
              open: () =>
                onOpen("active-enrollments", { enrollmentID: String(enr._id) }),
            };
          }),
        };
      }
      case "purchases": {
        const activePurchases = summary.purchases.filter(
          (p) => purchaseStatus(p) === "active",
        );
        return {
          value: `${activePurchases.length} active`,
          hint: activePurchases.length ? "Active" : "None yet",
          children: activePurchases.map((p) => {
            const due = Number(p.amountDue ?? p.total ?? 0);
            return {
              id: String(p._id),
              title: p.name,
              sub: `Purchased ${formatDate(p.createdAt)}`,
              value: due > 0 ? `${money(due)} due` : "Paid in full",
              hint: paymentStatusLabel(p.billingStatus),
              open: () => onOpen("purchases", { purchaseID: String(p._id) }),
            };
          }),
        };
      }
      case "memberships":
        return {
          value: `${activeMemberships.length} active`,
          hint: activeMemberships[0]?.membershipName ?? "None yet",
        };
      case "lessons": {
        const next = upcoming.sort(
          (a, b) => new Date(a.startDateTime) - new Date(b.startDateTime),
        )[0];
        return {
          value: next ? `Next ${formatStudioDate(next.startDateTime, null, { weekday: undefined, year: "numeric" })}` : "Nothing booked",
          hint: `${summary.events.length} in the last year`,
          alert: unpaidLessons?.text || null,
        };
      }
      case "wallet":
        return { value: `${money(summary.wallet)} available`, hint: "View ledger" };
      case "payments": {
        const last = summary.payments[0];
        return {
          value: `${summary.payments.length} transactions`,
          hint: last ? `Last ${formatDate(last.createdAt)}` : "None yet",
        };
      }
      default:
        return {};
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-[17px] font-semibold text-foreground">
          {section.title}
        </h2>
        <p className="text-[12px] text-muted-foreground mt-1">{section.blurb}</p>
      </div>

      <div className="rounded-2xl border border-border bg-card overflow-hidden">
        {section.views.map((viewId, i) => {
          const meta = VIEW_META[viewId];
          const Icon = meta.icon;
          const state = stateFor(viewId);
          const hasChildren = (state.children?.length ?? 0) > 0;
          const isOpen = expanded === viewId;
          return (
            <div
              key={viewId}
              className={i > 0 ? "border-t border-border" : undefined}
            >
              <ClickableRow
                onClick={() =>
                  hasChildren
                    ? setExpanded(isOpen ? null : viewId)
                    : onOpen(viewId)
                }
                className={`flex items-center gap-3 px-4 py-3.5 hover:bg-muted/40 ${isOpen ? "bg-muted/30" : ""}`}
              >
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary">
                  <Icon className="h-4 w-4" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-[13px] font-semibold text-foreground">
                    {meta.label}
                  </span>
                  <span className="block text-[11px] text-muted-foreground">
                    {meta.blurb}
                  </span>
                  {state.alert && (
                    <span className="mt-1 flex items-center gap-1 text-[11px] font-semibold text-destructive">
                      <AlertTriangle className="h-3 w-3 shrink-0" />
                      {state.alert}
                    </span>
                  )}
                </span>
                {state.value && (
                  <span className="hidden sm:block text-right shrink-0">
                    <span className="block text-[12px] font-semibold text-foreground">
                      {summary.loading ? "—" : state.value}
                    </span>
                    <span className="block text-[10px] text-muted-foreground">
                      {summary.loading ? "" : state.hint}
                    </span>
                  </span>
                )}
                <ChevronDown
                  className={`h-4 w-4 shrink-0 text-muted-foreground transition-transform ${
                    hasChildren ? (isOpen ? "rotate-0" : "-rotate-90") : "-rotate-90"
                  }`}
                />
              </ClickableRow>

              {hasChildren && isOpen && (
                <div className="bg-muted/20 px-4 pb-4 pl-4 sm:pl-16 space-y-2">
                  {state.children.map((child) => (
                    <ClickableRow
                      key={child.id}
                      onClick={child.open}
                      className="flex items-center gap-3 rounded-xl border border-border bg-card px-3.5 py-3 hover:border-primary/50"
                    >
                      <span className="min-w-0 flex-1">
                        <span className="block text-[12px] font-semibold text-foreground truncate">
                          {child.title}
                        </span>
                        <span className="block text-[10px] text-muted-foreground">
                          {child.sub}
                        </span>
                      </span>
                      <span className="text-right shrink-0">
                        <span className="block text-[11px] font-semibold text-foreground">
                          {child.value}
                        </span>
                        <span className="block text-[10px] text-muted-foreground capitalize">
                          {child.hint}
                        </span>
                      </span>
                      <ChevronDown className="h-3.5 w-3.5 -rotate-90 text-muted-foreground" />
                    </ClickableRow>
                  ))}
                  <div className="flex justify-end pt-1">
                    <LinkButton onClick={() => onOpen(viewId)}>
                      View all {VIEW_META[viewId].label.toLowerCase()} →
                    </LinkButton>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── Overview ────────────────────────────────────────────────────────────────

// Lifetime lessons taken / lifetime spend: the old system's totals from the import
// plus everything recorded here since (GET /api/customer/:id/lifetime-stats).
function useLifetimeStats(customerID) {
  const [stats, setStats] = useState(null);
  useEffect(() => {
    if (!customerID) return;
    let alive = true;
    api.get(`/api/customer/${customerID}/lifetime-stats`).then((res) => {
      if (alive && res.success) setStats(res.data);
    });
    return () => {
      alive = false;
    };
  }, [customerID]);
  return stats;
}

// The "before this app" line at the bottom of a history list, so the imported total
// reads as the oldest entry with everything recorded here above it.
function ImportedHistoryNote({ importedAt, children }) {
  return (
    <div className="rounded-xl border border-dashed border-border bg-muted/30 px-5 py-3.5 text-[12px] text-muted-foreground">
      <span className="font-medium text-foreground">{children}</span>
      {" "}in the previous system{importedAt ? `, imported ${formatDate(importedAt)}` : ""}.
    </div>
  );
}

function MetricCard({ label, value, hint, accent = "text-foreground", children }) {
  return (
    <div className="h-full rounded-2xl border border-border bg-card p-4">
      <p className="text-[10px] uppercase tracking-wide text-muted-foreground">
        {label}
      </p>
      <p className={`mt-1.5 text-[21px] font-semibold leading-tight ${accent}`}>
        {value}
      </p>
      {hint && <p className="mt-1 text-[11px] text-muted-foreground">{hint}</p>}
      {children}
    </div>
  );
}

function OverviewSection({ customer, locations, summary, onOpen, onUpdated }) {
  const now = Date.now();
  const toast = useToast();
  const { statuses: lifecycleStatuses } = useCustomerLifecycleStatuses();

  // Quick-save for just the callback date, right from the metric tile —
  // mirrors saveCallbackDate() in ProfileTab so this and the full profile
  // form never drift out of sync.
  const [callbackDateDraft, setCallbackDateDraft] = useState(
    customer.callbackDate ? String(customer.callbackDate).slice(0, 10) : "",
  );
  const [savingCallbackDate, setSavingCallbackDate] = useState(false);
  useEffect(() => {
    setCallbackDateDraft(
      customer.callbackDate ? String(customer.callbackDate).slice(0, 10) : "",
    );
  }, [customer?._id, customer?.callbackDate]);
  async function saveCallbackDate() {
    if (!customer?._id) return;
    setSavingCallbackDate(true);
    const res = await api.put(`/api/customer/${customer._id}`, {
      callbackDate: callbackDateDraft || null,
    });
    if (res.success) {
      toast.success("Callback date updated.");
      onUpdated?.();
    } else {
      toast.error(res.error || "Unable to update callback date.");
    }
    setSavingCallbackDate(false);
  }
  const callbackOverdue =
    customer.callbackDate && new Date(customer.callbackDate).getTime() <= now;

  // Outstanding money, broken down by what it's owed against — the same
  // derivation the enrollment cards use, so the two never disagree.
  const owed = useMemo(() => {
    const fromPackages = summary.enrollments
      .map((enr) => {
        const pkg = enr.package;
        if (!pkg || pkg.status === "cancelled" || enr.status === "cancelled")
          return null;
        // Same figure as the enrollment card where we have it; the stored snapshot only for
        // enrollments whose details weren't fetched (expired/completed ones).
        const live = summary.billing?.[String(enr._id)];
        const due =
          live?.outstanding != null
            ? Number(live.outstanding)
            : pkg.dueAmount != null
              ? Number(pkg.dueAmount)
              : Math.max(
                  0,
                  Number(pkg.totalPaid ?? pkg.contractedValue ?? 0) -
                    Number(pkg.amountCollected || 0),
                );
        return due >= 0.01
          ? {
              key: `enr-${enr._id}`,
              label: pkg.packageName || enrollmentDisplayName(enr),
              sub: `Enrollment · purchased ${formatDate(pkg.purchaseDate ?? enr.createdAt)}`,
              amount: due,
              cta: "Open enrollment →",
              open: () =>
                onOpen("active-enrollments", { enrollmentID: String(enr._id) }),
            }
          : null;
      })
      .filter(Boolean);

    const fromMemberships = summary.memberships
      .map((m) => {
        if (m.status === "cancelled") return null;
        const due =
          m.dueAmount != null
            ? Number(m.dueAmount)
            : Math.max(
                0,
                Number(m.price || 0) - Number(m.amountCollected || 0),
              );
        return due >= 0.01
          ? {
              key: `mem-${m._id}`,
              label: m.membershipName || "Membership",
              sub: m.expiryDate
                ? `Membership · expires ${formatDate(m.expiryDate)}`
                : "Membership",
              amount: due,
              cta: "Open membership →",
              open: () => onOpen("memberships"),
            }
          : null;
      })
      .filter(Boolean);

    // Events & Products — same amountDue the Events & Products tab shows for each purchase.
    const fromPurchases = summary.purchases
      .map((p) => {
        const due = Number(p.amountDue ?? p.total ?? 0);
        return due >= 0.01
          ? {
              key: `pur-${p._id}`,
              label: p.name || "Event / product",
              sub: `Event / product · purchased ${formatDate(p.purchaseDate ?? p.createdAt)}`,
              amount: due,
              cta: "Open purchase →",
              open: () => onOpen("purchases", { purchaseID: String(p._id) }),
            }
          : null;
      })
      .filter(Boolean);

    return [...fromPackages, ...fromMemberships, ...fromPurchases].sort(
      (a, b) => b.amount - a.amount,
    );
  }, [summary.enrollments, summary.memberships, summary.purchases, summary.billing, onOpen]);

  const totalOwed = owed.reduce((sum, r) => sum + r.amount, 0);

  // Server totals include the old system's imported figures and aren't capped by the
  // payment page size; the local sum is only a stand-in until they load.
  const lifetime = useLifetimeStats(customer._id);
  const localSpend = useMemo(
    () =>
      summary.payments
        .filter((p) => p.status === "completed")
        .reduce(
          (sum, p) => sum + (p.type === "refund" ? -1 : 1) * Number(p.amount || 0),
          0,
        ),
    [summary.payments],
  );
  const lifetimeSpend = lifetime ? lifetime.spend.total : localSpend;

  const nextLesson = useMemo(
    () =>
      summary.events
        .filter(
          (ev) =>
            new Date(ev.startDateTime).getTime() > now &&
            !String(deriveEventStatus(ev)).startsWith("cancelled"),
        )
        .sort((a, b) => new Date(a.startDateTime) - new Date(b.startDateTime))[0],
    [summary.events, now],
  );

  // One timeline out of two sources, so "what happened lately" doesn't mean
  // reading the Lessons tab and the Payment History tab side by side.
  const activity = useMemo(() => {
    const lessons = summary.events
      .filter((ev) => new Date(ev.startDateTime).getTime() <= now)
      .map((ev) => ({
        key: `ev-${ev._id}`,
        at: ev.startDateTime,
        icon: deriveEventStatus(ev) === "completed" ? CheckCircle : CalendarX,
        title: `${eventStatusLabel(deriveEventStatus(ev))} ${ev.title || "lesson"}`,
        sub: ev.teacherID?.name ? `With ${ev.teacherID.name}` : "",
      }));
    const payments = summary.payments.map((p) => ({
      key: `pay-${p._id}`,
      at: p.createdAt,
      icon: p.type === "refund" ? RotateCcw : Receipt,
      title:
        p.type === "refund"
          ? `Refund issued · ${money(p.amount)}`
          : `Payment received · ${money(p.amount)}`,
      sub: [p.method, p.enrollmentID?.package?.packageName]
        .filter(Boolean)
        .join(" · "),
    }));
    return [...lessons, ...payments]
      .sort((a, b) => new Date(b.at) - new Date(a.at))
      .slice(0, 6);
  }, [summary.events, summary.payments, now]);

  const memberCount = Array.isArray(customer.members)
    ? customer.members.length
    : 0;
  const sinceDate = customer.memberSince ?? customer.createdAt;
  const years = sinceDate
    ? Math.floor((now - new Date(sinceDate).getTime()) / 31557600000)
    : null;

  return (
    <div className="space-y-4">
      {/* Health metrics */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <MetricCard
          label="Current enrollment"
          value={`${summary.sessions.remaining} lesson${summary.sessions.remaining === 1 ? "" : "s"}`}
          hint={`${summary.sessions.used} of ${summary.sessions.total} used`}
        >
          <div className="mt-2.5 h-1.5 overflow-hidden rounded-full bg-muted">
            <div
              className="h-full rounded-full bg-success transition-all"
              style={{
                width: summary.sessions.total
                  ? `${Math.min(100, (summary.sessions.used / summary.sessions.total) * 100)}%`
                  : "0%",
              }}
            />
          </div>
        </MetricCard>
        <MetricCard
          label="Student since"
          value={sinceDate ? formatDate(sinceDate) : "—"}
          hint={
            years != null
              ? `${years} year${years === 1 ? "" : "s"} · ${customerLifecycleLabel(customer.lifecycleStatus, lifecycleStatuses).toLowerCase()}`
              : undefined
          }
        />
        <ClickableRow onClick={() => onOpen("lessons")} className="rounded-2xl">
          <MetricCard
            label="Total lessons taken"
            value={lifetime ? lifetime.lessons.total.toLocaleString() : "—"}
            hint={
              lifetime?.lessons.imported
                ? `${lifetime.lessons.imported.toLocaleString()} before this app · view history →`
                : "View lesson history →"
            }
          />
        </ClickableRow>
        <ClickableRow onClick={() => onOpen("payments")} className="rounded-2xl">
          <MetricCard
            label="Lifetime spend"
            value={money(lifetimeSpend)}
            hint={
              lifetime?.spend.imported
                ? `${money(lifetime.spend.imported)} before this app · view history →`
                : "Completed payments less refunds · view history →"
            }
          />
        </ClickableRow>
      </div>

      {/* Profile + at-a-glance */}
      <div className="grid gap-4 lg:grid-cols-3">
        <Panel
          className="lg:col-span-2"
          title="Student profile"
          action={
            <LinkButton onClick={() => onOpen("profile")}>
              Edit profile
            </LinkButton>
          }
        >
          <div
            className={`mb-4 rounded-xl border p-3.5 ${
              callbackOverdue
                ? "border-warning/30 bg-warning/10"
                : "border-border bg-muted/30"
            }`}
          >
            <div className="flex items-center justify-between gap-2">
              <p className="text-[10px] uppercase tracking-wide text-muted-foreground">
                Callback date
              </p>
              {callbackOverdue && (
                <span className="text-[9px] font-bold uppercase tracking-wide text-warning">
                  Overdue
                </span>
              )}
            </div>
            <div className="mt-1.5 flex flex-wrap items-center gap-2">
              <span
                className={`text-[15px] font-semibold ${callbackOverdue ? "text-warning" : "text-foreground"}`}
              >
                {customer.callbackDate ? formatDate(customer.callbackDate) : "Not set"}
              </span>
              <div className="ml-auto flex items-center gap-1.5">
                <input
                  type="date"
                  value={callbackDateDraft}
                  onChange={(e) => setCallbackDateDraft(e.target.value)}
                  className="h-8 rounded-lg border border-border bg-background px-2 text-[12px] outline-none focus:border-primary"
                />
                <Button
                  type="button"
                  size="sm"
                  variant="outline"
                  onClick={saveCallbackDate}
                  disabled={
                    savingCallbackDate ||
                    callbackDateDraft ===
                      (customer.callbackDate
                        ? String(customer.callbackDate).slice(0, 10)
                        : "")
                  }
                  className="h-8 shrink-0 px-2.5 text-[12px]"
                >
                  {savingCallbackDate ? "..." : "Save"}
                </Button>
              </div>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Phone">{customer.phoneNumber || "—"}</Field>
            <Field label="Email">{customer.email || "—"}</Field>
            <Field label="Date of birth">
              {customer.dateOfBirth ? formatDate(customer.dateOfBirth) : "Not provided"}
            </Field>
            <Field label="Home studio">
              {locationNamesOf(customer.locationID, locations)}
            </Field>
            <Field label="Status">
              <StatusColorBadge
                color={customerLifecycleColor(
                  customer.lifecycleStatus,
                  lifecycleStatuses
                )}
                className="px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide"
              >
                {customerLifecycleLabel(
                  customer.lifecycleStatus,
                  lifecycleStatuses
                )}
              </StatusColorBadge>
            </Field>
          </div>
          {(customer.tags?.length || customer.autoTags?.length) > 0 && (
            <div className="mt-5">
              <p className="text-[10px] uppercase tracking-wide text-muted-foreground mb-2">
                Tags
              </p>
              <div className="flex flex-wrap gap-1.5">
                {[...(customer.tags ?? []), ...(customer.autoTags ?? [])].map(
                  (t, i) => (
                    <span
                      key={`${t}-${i}`}
                      className="rounded-lg bg-muted px-2 py-1 text-[11px] text-foreground"
                    >
                      {t}
                    </span>
                  ),
                )}
              </div>
            </div>
          )}
        </Panel>

        <div className="space-y-4">
          {/* Next lesson — the one thing staff act on most, so it leads. */}
          <section
            className={`rounded-2xl border p-5 ${
              nextLesson
                ? "border-border bg-card"
                : "border-warning/30 bg-warning/10"
            }`}
          >
            <div className="flex items-center justify-between gap-2 mb-3">
              <h2 className="text-[14px] font-semibold text-foreground">
                Next lesson
              </h2>
              {!nextLesson && (
                <span className="text-[9px] font-bold uppercase tracking-wide text-warning">
                  Needs attention
                </span>
              )}
            </div>
            {nextLesson ? (
              <div className="flex items-center gap-3">
                <div className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary">
                  <span className="text-[17px] font-bold leading-none">
                    {new Date(nextLesson.startDateTime).getDate()}
                  </span>
                </div>
                <div className="min-w-0">
                  <p className="text-[13px] font-semibold text-foreground truncate">
                    {nextLesson.title || "Lesson"}
                  </p>
                  <p className="text-[11px] text-muted-foreground">
                    {formatStudioDate(nextLesson.startDateTime, null, { weekday: undefined, year: "numeric" })} ·{" "}
                    {formatStudioTime(nextLesson.startDateTime)}
                  </p>
                  {nextLesson.teacherID?.name && (
                    <p className="text-[11px] text-muted-foreground">
                      With {nextLesson.teacherID.name}
                    </p>
                  )}
                </div>
              </div>
            ) : (
              <div className="flex items-start gap-3">
                <div className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-warning/20 text-[20px] font-bold text-warning">
                  !
                </div>
                <div>
                  <p className="text-[13px] font-semibold text-foreground">
                    No next lesson scheduled
                  </p>
                  <p className="mt-1 text-[11px] text-muted-foreground">
                    {summary.sessions.remaining > 0
                      ? `${summary.sessions.remaining} lesson${summary.sessions.remaining === 1 ? "" : "s"} left to book.`
                      : "No remaining lessons on the account."}
                  </p>
                </div>
              </div>
            )}
          </section>

          <Panel
            title="Members"
            subtitle="People connected to this account"
            action={
              <LinkButton onClick={() => onOpen("members")}>Manage</LinkButton>
            }
          >
            {memberCount > 0 ? (
              <div className="space-y-2.5">
                {customer.members.map((m) => (
                  <div key={m._id} className="flex items-center gap-2.5">
                    <div className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-primary/10 text-[11px] font-semibold text-primary">
                      {(m.name || "?").charAt(0).toUpperCase()}
                    </div>
                    <div className="min-w-0">
                      <p className="truncate text-[13px] font-medium text-foreground">
                        {m.name}
                        {m.relationship && (
                          <span className="ml-1 text-[11px] font-normal capitalize text-muted-foreground">
                            · {m.relationship}
                          </span>
                        )}
                      </p>
                      <div className="text-[11px] text-muted-foreground space-y-0.5">
                        {m.email && <p className="truncate">{m.email}</p>}
                        {m.phoneNumber && <p>{m.phoneNumber}</p>}
                        {m.dateOfBirth && (
                          <p>DOB: {formatDate(m.dateOfBirth)}</p>
                        )}
                        {m.gender && (
                          <p className="capitalize">{m.gender.replace(/_/g, " ")}</p>
                        )}
                        {m.notes && <p className="italic">"{m.notes}"</p>}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-[12px] text-muted-foreground">
                No connected members yet.
              </p>
            )}
          </Panel>
        </div>
      </div>

      {/* Balance summary */}
      <Panel
        title="Balance summary"
        subtitle="Outstanding amounts across this student's account"
        action={
          <div className="text-right">
            <p className="text-[10px] uppercase tracking-wide text-muted-foreground">
              Total balance
            </p>
            <p
              className={`text-[20px] font-semibold ${totalOwed > 0 ? "text-destructive" : "text-foreground"}`}
            >
              {money(totalOwed)}
            </p>
          </div>
        }
      >
        {summary.loading ? (
          <p className="text-[12px] text-muted-foreground">Loading…</p>
        ) : owed.length === 0 ? (
          <div className="flex items-center justify-between gap-3 rounded-xl bg-success/5 px-3.5 py-3">
            <p className="text-[12px] text-foreground">
              Nothing outstanding — this account is fully paid up.
            </p>
            <p className="text-[12px] font-semibold text-success">
              {money(summary.wallet)} in wallet
            </p>
          </div>
        ) : (
          <div className="divide-y divide-border">
            {owed.map((row) => (
              <ClickableRow
                key={row.key}
                onClick={row.open}
                className="flex items-center justify-between gap-3 rounded-lg px-2 py-3 hover:bg-muted/40"
              >
                <div className="min-w-0">
                  <p className="text-[12px] font-semibold text-foreground truncate">
                    {row.label}
                  </p>
                  <p className="text-[11px] text-muted-foreground truncate">
                    {row.sub}
                  </p>
                </div>
                <div className="shrink-0 text-right">
                  <p className="text-[13px] font-semibold text-destructive">
                    {money(row.amount)}
                  </p>
                  <p className="text-[10px] font-semibold text-primary">
                    {row.cta}
                  </p>
                </div>
              </ClickableRow>
            ))}
          </div>
        )}
      </Panel>

      {/* Recent activity */}
      <Panel
        title="Recent activity"
        action={
          <LinkButton onClick={() => onOpen("history")}>
            View all records
          </LinkButton>
        }
      >
        {summary.loading ? (
          <p className="text-[12px] text-muted-foreground">Loading…</p>
        ) : activity.length === 0 ? (
          <p className="text-[12px] text-muted-foreground">
            Nothing has happened on this account yet.
          </p>
        ) : (
          <div className="divide-y divide-border">
            {activity.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.key} className="flex items-center gap-3 py-3">
                  <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-muted text-muted-foreground">
                    <Icon className="h-3.5 w-3.5" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="text-[12px] font-medium text-foreground truncate">
                      {item.title}
                    </p>
                    {item.sub && (
                      <p className="text-[11px] text-muted-foreground truncate">
                        {item.sub}
                      </p>
                    )}
                  </div>
                  <time className="shrink-0 text-[10px] text-muted-foreground">
                    {formatDate(item.at)}
                  </time>
                </div>
              );
            })}
          </div>
        )}
      </Panel>
    </div>
  );
}

// ─── Communication ───────────────────────────────────────────────────────────

// Same Inbox thread UI (SMS, email, calls) scoped to this student.
function CommunicationSection({ customer }) {
  return (
    <div className="flex h-[min(72vh,760px)] min-h-[520px] flex-col overflow-hidden rounded-2xl border border-border bg-card">
      <CustomerInboxThread key={customer._id} customer={customer} />
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function CustomerDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const { statuses: lifecycleStatuses } = useCustomerLifecycleStatuses();
  const [customer, setCustomer] = useState(null);
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(true);
  // `section` is the pill nav; `view` is the drill-in open inside it (null =
  // the section's own index). Both are mirrored into the query string so a
  // refresh or a shared link reopens exactly what the user was looking at.
  // replaceState, not push — the header's Back button is meant to leave the
  // student, not walk back through the sections one at a time.
  const [nav, setNav] = useState(() => {
    if (typeof window === "undefined") return { section: "overview", view: null };
    const params = new URLSearchParams(window.location.search);
    const section = SECTIONS.some((s) => s.id === params.get("section"))
      ? params.get("section")
      : "overview";
    const view = VIEW_META[params.get("view")] ? params.get("view") : null;
    return {
      section,
      view,
      enrollmentID: params.get("enrollment") || null,
      purchaseID: params.get("purchase") || null,
    };
  });
  const summary = useAccountSummary(id);

  const go = useCallback((section, view = null, extra = {}) => {
    setNav({
      section,
      view,
      enrollmentID: extra.enrollmentID ?? null,
      purchaseID: extra.purchaseID ?? null,
    });
    if (typeof window === "undefined") return;
    const params = new URLSearchParams(window.location.search);
    params.set("section", section);
    if (view) params.set("view", view);
    else params.delete("view");
    if (extra.enrollmentID) params.set("enrollment", extra.enrollmentID);
    else params.delete("enrollment");
    if (extra.purchaseID) params.set("purchase", extra.purchaseID);
    else params.delete("purchase");
    window.history.replaceState(null, "", `?${params.toString()}`);
  }, []);

  // Overview panels link straight at a view (and sometimes a specific
  // enrollment); resolve which section owns it so the pill nav follows along.
  const openView = useCallback(
    (viewId, extra = {}) => {
      const owner =
        SECTIONS.find((s) => s.views?.includes(viewId))?.id ?? "records";
      go(owner, viewId, extra);
    },
    [go],
  );

  const load = useCallback(async () => {
    const [custRes, locRes] = await Promise.all([
      api.get(`/api/customer/${id}`),
      api.get("/api/location?limit=200"),
    ]);
    if (custRes.success) setCustomer(custRes.data);
    if (locRes.success) setLocations(locRes.data || []);
    setLoading(false);
  }, [id]);

  useEffect(() => {
    load();
  }, [load]);

  // Drill-in views change their own data (cancel, pay, enroll) — refresh the
  // shared summary on the way back so the indexes and Overview aren't stale.
  const { reload: reloadSummary } = summary;
  useTerminalChargeSettled(reloadSummary);
  const prevViewRef = useRef(nav.view);
  useEffect(() => {
    if (prevViewRef.current && !nav.view) reloadSummary();
    prevViewRef.current = nav.view;
  }, [nav.view, reloadSummary]);

  if (loading) {
    return (
      <MainLayout>
        <div className="flex items-center justify-center h-[calc(100vh-8rem)]">
          <LoadingSpinner />
        </div>
      </MainLayout>
    );
  }

  if (!customer) {
    return (
      <MainLayout>
        <div className="flex flex-col items-center justify-center h-[calc(100vh-8rem)] gap-4">
          <p className="text-[13px] text-muted-foreground">
            Customer not found.
          </p>
          <Button variant="outline" onClick={() => router.back()}>
            Go back
          </Button>
        </div>
      </MainLayout>
    );
  }

  const section = SECTIONS.find((s) => s.id === nav.section) ?? SECTIONS[0];
  const viewMeta = nav.view ? VIEW_META[nav.view] : null;
  const locationLabel = locationNamesOf(customer.locationID, locations);

  const viewContent = {
    profile: () => (
      <ProfileTab customer={customer} locations={locations} onUpdated={load} />
    ),
    intro: () => <IntroTab customer={customer} />,
    "active-enrollments": () => (
      <EnrollmentsTab
        customerID={customer._id}
        customerName={customer.name || customer.email || ""}
        locationID={resolveLocationID(customer)}
        initialEnrollmentID={nav.enrollmentID}
      />
    ),
    memberships: () => (
      <CustomerMembershipsTab
        customerID={customer._id}
        customerName={customer.name || customer.email || ""}
        locationID={resolveLocationID(customer)}
      />
    ),
    wallet: () => (
      <CustomerWalletTab customerID={customer._id} locationID={resolveLocationID(customer)} />
    ),
    purchases: () => (
      <PurchasesTab
        customerID={customer._id}
        customerName={customer.name || customer.email || ""}
        locationID={resolveLocationID(customer)}
        initialPurchaseID={nav.purchaseID}
      />
    ),
    payments: () => <PaymentsTab customerID={customer._id} />,
    lessons: () => <LessonsTab customer={customer} />,
    history: () => <HistoryTab customer={customer} />,
    notes: () => <NotesTab customer={customer} onUpdated={load} />,
    members: () => <MembersTab customer={customer} onUpdated={load} />,
    contracts: () => <ContractsTab customerID={customer._id} />,
  };

  return (
    <MainLayout>
      <div className="w-full pb-6 space-y-5">
        <div className="flex min-w-0 items-start gap-3">
            <Button
              variant="ghost"
              size="icon"
              className="h-9 w-9 shrink-0"
              onClick={() => router.push("/settings/users-roles/customers")}
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <Avatar className="h-12 w-12 shrink-0 rounded-2xl">
              <AvatarFallback className="rounded-2xl bg-primary/10 text-[15px] font-bold text-primary">
                {getInitials(customer.name)}
              </AvatarFallback>
            </Avatar>
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-[22px] font-semibold leading-tight text-foreground truncate">
                  {[customer.name, ...(customer.members || []).map((m) => m.name)]
                    .filter(Boolean)
                    .join(" & ")}
                </h1>
                <StatusColorBadge
                  color={customerLifecycleColor(
                    customer.lifecycleStatus,
                    lifecycleStatuses
                  )}
                  className="shrink-0 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide"
                >
                  {customerLifecycleLabel(
                    customer.lifecycleStatus,
                    lifecycleStatuses
                  )}
                </StatusColorBadge>
              </div>
              <p className="mt-1 text-[12px] text-muted-foreground truncate">
                {[customer.email, customer.phoneNumber, locationLabel !== "—" ? locationLabel : null]
                  .filter(Boolean)
                  .join(" · ")}
              </p>
            </div>
        </div>

        {/* Section nav */}
        <nav
          aria-label="Student account sections"
          className="flex gap-1 overflow-x-auto rounded-2xl bg-muted/60 p-1"
        >
          {SECTIONS.map((s) => (
            <button
              key={s.id}
              type="button"
              onClick={() => go(s.id)}
              aria-current={section.id === s.id ? "page" : undefined}
              className={`whitespace-nowrap rounded-xl px-4 py-2 text-[13px] font-semibold transition-colors ${
                section.id === s.id
                  ? "bg-card text-primary shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {s.label}
            </button>
          ))}
        </nav>

        {/* Breadcrumb back into the section index */}
        {viewMeta && (
          <div className="flex items-center justify-between gap-3">
            <div className="min-w-0">
              <h2 className="text-[17px] font-semibold text-foreground">
                {viewMeta.label}
              </h2>
              <p className="text-[12px] text-muted-foreground">
                {viewMeta.blurb}
              </p>
            </div>
            {section.views && (
              <Button
                variant="outline"
                size="sm"
                className="h-8 shrink-0 px-3 text-[12px]"
                onClick={() => go(section.id)}
              >
                <ArrowLeft className="mr-1.5 h-3.5 w-3.5" />
                {section.label}
              </Button>
            )}
          </div>
        )}

        {/* Content */}
        {nav.view ? (
          viewContent[nav.view]?.()
        ) : section.id === "overview" ? (
          <OverviewSection
            customer={customer}
            locations={locations}
            summary={summary}
            onOpen={openView}
            onUpdated={load}
          />
        ) : section.id === "communication" ? (
          <CommunicationSection customer={customer} />
        ) : (
          <SectionIndex section={section} summary={summary} onOpen={openView} customerID={id} />
        )}
      </div>
    </MainLayout>
  );
}

// ─── Members Tab ─────────────────────────────────────────────────────────────

const MEMBER_GENDER_OPTIONS = [
  { value: "male", label: "Male" },
  { value: "female", label: "Female" },
  { value: "other", label: "Other" },
  { value: "prefer_not_to_say", label: "Prefer not to say" },
];

const EMPTY_MEMBER = {
  name: "",
  email: "",
  phoneNumber: "",
  gender: "",
  dateOfBirth: "",
  relationship: "",
  notes: "",
};

function MemberFormSheet({ open, onClose, customerId, member, onSaved }) {
  const [form, setForm] = useState(EMPTY_MEMBER);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const toast = useToast();
  const isEdit = Boolean(member?._id);

  useEffect(() => {
    if (open) {
      setForm(
        member
          ? {
              name: member.name || "",
              email: member.email || "",
              phoneNumber: member.phoneNumber || "",
              gender: member.gender || "",
              dateOfBirth: member.dateOfBirth
                ? String(member.dateOfBirth).slice(0, 10)
                : "",
              relationship: member.relationship || "",
              notes: member.notes || "",
            }
          : EMPTY_MEMBER,
      );
      setError(null);
    }
  }, [open, member]);

  const set = (k, v) => setForm((p) => ({ ...p, [k]: v }));

  async function handleSubmit(e) {
    e.preventDefault();
    if (!form.name.trim()) {
      setError("Name is required.");
      return;
    }
    setSaving(true);
    const payload = {
      name: form.name.trim(),
      email: form.email || undefined,
      phoneNumber: form.phoneNumber || undefined,
      gender: form.gender || undefined,
      dateOfBirth: form.dateOfBirth || undefined,
      relationship: form.relationship || undefined,
      notes: form.notes || undefined,
    };
    const result = isEdit
      ? await api.put(
          `/api/customer/${customerId}/members/${member._id}`,
          payload,
        )
      : await api.post(`/api/customer/${customerId}/members`, payload);
    if (result.success) {
      toast.success(isEdit ? "Member updated." : "Member added.");
      onSaved();
      onClose();
    } else {
      setError(result.error || "Something went wrong.");
    }
    setSaving(false);
  }

  return (
    <Sheet
      open={open}
      onOpenChange={(v) => {
        if (!v) onClose();
      }}
    >
      <SheetContent>
        <div className="px-6 py-4 border-b border-border">
          <h2 className="text-base font-semibold text-foreground">
            {isEdit ? "Edit Member" : "Add Member"}
          </h2>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4 mt-4 px-6">
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <label className="block text-[12px] font-medium text-muted-foreground">
                Name<span className="text-destructive ml-0.5">*</span>
              </label>
              <input
                type="text"
                value={form.name}
                onChange={(e) => set("name", e.target.value)}
                placeholder="Full name"
                className="h-9 w-full rounded-lg border border-border bg-background px-3 text-[13px] outline-none focus:border-primary"
              />
            </div>
            <div className="space-y-1.5">
              <label className="block text-[12px] font-medium text-muted-foreground">
                Relationship
              </label>
              <input
                type="text"
                value={form.relationship}
                onChange={(e) => set("relationship", e.target.value)}
                placeholder="e.g. Spouse, Partner"
                className="h-9 w-full rounded-lg border border-border bg-background px-3 text-[13px] outline-none focus:border-primary"
              />
            </div>
            <div className="space-y-1.5">
              <label className="block text-[12px] font-medium text-muted-foreground">
                Email
              </label>
              <input
                type="email"
                value={form.email}
                onChange={(e) => set("email", e.target.value)}
                placeholder="Optional"
                className="h-9 w-full rounded-lg border border-border bg-background px-3 text-[13px] outline-none focus:border-primary"
              />
            </div>
            <div className="space-y-1.5">
              <label className="block text-[12px] font-medium text-muted-foreground">
                Phone
              </label>
              <input
                type="tel"
                value={form.phoneNumber}
                onChange={(e) => set("phoneNumber", e.target.value)}
                placeholder="Optional"
                className="h-9 w-full rounded-lg border border-border bg-background px-3 text-[13px] outline-none focus:border-primary"
              />
            </div>
            <div className="space-y-1.5">
              <label className="block text-[12px] font-medium text-muted-foreground">
                Date of Birth
              </label>
              <input
                type="date"
                value={form.dateOfBirth}
                onChange={(e) => set("dateOfBirth", e.target.value)}
                className="h-9 w-full rounded-lg border border-border bg-background px-3 text-[13px] outline-none focus:border-primary"
              />
            </div>
            <div className="space-y-1.5">
              <label className="block text-[12px] font-medium text-muted-foreground">
                Gender
              </label>
              <div className="relative">
                <select
                  value={form.gender}
                  onChange={(e) => set("gender", e.target.value)}
                  className="h-9 w-full appearance-none rounded-lg border border-border bg-background px-3 pr-8 text-[13px] outline-none focus:border-primary"
                >
                  <option value="">Select…</option>
                  {MEMBER_GENDER_OPTIONS.map((g) => (
                    <option key={g.value} value={g.value}>
                      {g.label}
                    </option>
                  ))}
                </select>
                <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
              </div>
            </div>
            <div className="col-span-2 space-y-1.5">
              <label className="block text-[12px] font-medium text-muted-foreground">
                Notes
              </label>
              <input
                type="text"
                value={form.notes}
                onChange={(e) => set("notes", e.target.value)}
                placeholder="Any notes about this member"
                className="h-9 w-full rounded-lg border border-border bg-background px-3 text-[13px] outline-none focus:border-primary"
              />
            </div>
          </div>
          {error && (
            <p className="rounded-lg bg-destructive/10 px-3 py-2 text-[12px] text-destructive">
              {error}
            </p>
          )}
          <div className="flex justify-end gap-2 pt-1">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={saving}>
              {saving ? "Saving…" : isEdit ? "Save Changes" : "Add Member"}
            </Button>
          </div>
        </form>
      </SheetContent>
    </Sheet>
  );
}

function MembersTab({ customer, onUpdated }) {
  const [sheetOpen, setSheetOpen] = useState(false);
  const [editingMember, setEditingMember] = useState(null);
  const [deletingId, setDeletingId] = useState(null);
  const toast = useToast();

  const members = customer.members || [];

  async function handleDelete(memberId) {
    if (!window.confirm("Remove this member?")) return;
    setDeletingId(memberId);
    const res = await api.delete(
      `/api/customer/${customer._id}/members/${memberId}`,
    );
    if (res.success) {
      toast.success("Member removed.");
      onUpdated();
    } else toast.error(res.error || "Failed to remove member.");
    setDeletingId(null);
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-[13px] text-muted-foreground">
          {members.length} member{members.length !== 1 ? "s" : ""} on this
          account
        </p>
        <Button
          size="sm"
          onClick={() => {
            setEditingMember(null);
            setSheetOpen(true);
          }}
        >
          <Plus className="mr-1.5 h-3.5 w-3.5" /> Add Member
        </Button>
      </div>

      {members.length === 0 ? (
        <div className="rounded-xl border border-dashed border-border p-10 text-center">
          <Users className="mx-auto h-8 w-8 text-muted-foreground mb-2" />
          <p className="text-[13px] text-muted-foreground">
            No members added yet.
          </p>
          <p className="text-[12px] text-muted-foreground mt-1">
            Add a family member or partner to this account.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {members.map((m) => (
            <div
              key={m._id}
              className="rounded-xl border border-border bg-card p-4"
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-[12px] font-semibold text-primary">
                    {(m.name || "?").charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <p className="text-[13px] font-medium text-foreground">
                      {m.name}
                    </p>
                    {m.relationship && (
                      <p className="text-[11px] text-muted-foreground capitalize">
                        {m.relationship}
                      </p>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-7 w-7"
                    onClick={() => {
                      setEditingMember(m);
                      setSheetOpen(true);
                    }}
                  >
                    <Pencil className="h-3.5 w-3.5" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-7 w-7 text-destructive hover:text-destructive"
                    disabled={deletingId === m._id}
                    onClick={() => handleDelete(m._id)}
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </Button>
                </div>
              </div>
              <div className="text-[12px] text-muted-foreground space-y-0.5 pl-11">
                {m.email && <p>{m.email}</p>}
                {m.phoneNumber && <p>{m.phoneNumber}</p>}
                {m.dateOfBirth && (
                  <p>DOB: {formatDate(m.dateOfBirth)}</p>
                )}
                {m.gender && (
                  <p className="capitalize">{m.gender.replace(/_/g, " ")}</p>
                )}
                {m.notes && <p className="italic">"{m.notes}"</p>}
              </div>
            </div>
          ))}
        </div>
      )}

      <MemberFormSheet
        open={sheetOpen}
        onClose={() => setSheetOpen(false)}
        customerId={customer._id}
        member={editingMember}
        onSaved={onUpdated}
      />
    </div>
  );
}

// ─── Contracts Tab ─────────────────────────────────────────────────────────────

const CONTRACT_STATUS_STYLES = {
  draft: "bg-muted text-foreground",
  sent: "bg-info/10 text-info",
  signed: "bg-success/10 text-success",
  expired: "bg-warning/10 text-warning",
  revoked: "bg-destructive/10 text-destructive",
};

function ContractFormSheet({ open, onClose, customerId, contract, onSaved }) {
  const [form, setForm] = useState({ title: "", content: "", notes: "" });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const toast = useToast();
  const isEdit = Boolean(contract?._id);

  useEffect(() => {
    if (open) {
      setForm(
        contract
          ? {
              title: contract.title || "",
              content: contract.content || "",
              notes: contract.notes || "",
            }
          : { title: "", content: "", notes: "" },
      );
      setError(null);
    }
  }, [open, contract]);

  const set = (k, v) => setForm((p) => ({ ...p, [k]: v }));

  async function handleSubmit(e) {
    e.preventDefault();
    if (!form.title.trim() || !form.content.trim()) {
      setError("Title and content are required.");
      return;
    }
    setSaving(true);
    const payload = {
      customerID: customerId,
      title: form.title.trim(),
      content: form.content.trim(),
      notes: form.notes || undefined,
    };
    const result = isEdit
      ? await api.put(`/api/contract/${contract._id}`, payload)
      : await api.post("/api/contract", payload);
    if (result.success) {
      toast.success(isEdit ? "Contract updated." : "Contract created.");
      onSaved();
      onClose();
    } else {
      setError(result.error || "Something went wrong.");
    }
    setSaving(false);
  }

  return (
    <Sheet
      open={open}
      onOpenChange={(v) => {
        if (!v) onClose();
      }}
    >
      <SheetContent className="w-full sm:max-w-xl">
        <div className="px-6 py-4 border-b border-border">
          <h2 className="text-base font-semibold text-foreground">
            {isEdit ? "Edit Contract" : "New Contract"}
          </h2>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4 mt-4 px-6">
          <div className="space-y-1.5">
            <label className="block text-[12px] font-medium text-muted-foreground">
              Title<span className="text-destructive ml-0.5">*</span>
            </label>
            <input
              type="text"
              value={form.title}
              onChange={(e) => set("title", e.target.value)}
              placeholder="e.g. Enrollment Agreement"
              className="h-9 w-full rounded-lg border border-border bg-background px-3 text-[13px] outline-none focus:border-primary"
            />
          </div>
          <div className="space-y-1.5">
            <label className="block text-[12px] font-medium text-muted-foreground">
              Contract Content<span className="text-destructive ml-0.5">*</span>
            </label>
            <textarea
              value={form.content}
              onChange={(e) => set("content", e.target.value)}
              rows={10}
              placeholder="Enter the full contract text here…"
              className="w-full rounded-lg border border-border bg-background px-3 py-2 text-[13px] outline-none focus:border-primary resize-y"
            />
          </div>
          <div className="space-y-1.5">
            <label className="block text-[12px] font-medium text-muted-foreground">
              Internal Notes
            </label>
            <input
              type="text"
              value={form.notes}
              onChange={(e) => set("notes", e.target.value)}
              placeholder="Staff notes (not shown to customer)"
              className="h-9 w-full rounded-lg border border-border bg-background px-3 text-[13px] outline-none focus:border-primary"
            />
          </div>
          {error && (
            <p className="rounded-lg bg-destructive/10 px-3 py-2 text-[12px] text-destructive">
              {error}
            </p>
          )}
          <div className="flex justify-end gap-2 pt-1">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={saving}>
              {saving ? "Saving…" : isEdit ? "Save Changes" : "Create Contract"}
            </Button>
          </div>
        </form>
      </SheetContent>
    </Sheet>
  );
}

function ContractsTab({ customerID }) {
  const [contracts, setContracts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sheetOpen, setSheetOpen] = useState(false);
  const [editingContract, setEditingContract] = useState(null);
  const [viewingContract, setViewingContract] = useState(null);
  const [sendingId, setSendingId] = useState(null);
  const toast = useToast();

  const load = useCallback(async () => {
    setLoading(true);
    const res = await api.get(
      `/api/contract?customerID=${customerID}&limit=50`,
    );
    if (res.success) setContracts(res.data || []);
    setLoading(false);
  }, [customerID]);

  useEffect(() => {
    load();
  }, [load]);

  async function handleSend(c) {
    if (!window.confirm(`Send "${c.title}" to the customer for signing?`))
      return;
    setSendingId(c._id);
    const res = await api.post(`/api/contract/${c._id}/send`, {});
    if (res.success) {
      toast.success("Contract sent for signing.");
      load();
    } else toast.error(res.error || "Failed to send.");
    setSendingId(null);
  }

  async function handleRevoke(c) {
    if (!window.confirm(`Revoke "${c.title}"?`)) return;
    const res = await api.post(`/api/contract/${c._id}/revoke`, {});
    if (res.success) {
      toast.success("Contract revoked.");
      load();
    } else toast.error(res.error || "Failed to revoke.");
  }

  async function handleResendAgreement(c) {
    const res = await api.post(`/api/agreement-session/${c._id}/resend`, {});
    if (res.success) toast.success("Agreement link resent.");
    else toast.error(res.error || "Failed to resend.");
  }

  const needsSignatureCount = contracts.filter((c) => c.status === "sent").length;

  async function handleDelete(c) {
    if (!window.confirm(`Delete "${c.title}"?`)) return;
    const res = await api.delete(`/api/contract/${c._id}`);
    if (res.success) {
      toast.success("Contract deleted.");
      load();
    } else toast.error(res.error || "Failed to delete.");
  }

  return (
    <div className="space-y-4">
      {needsSignatureCount > 0 && (
        <div className="inline-flex items-center gap-1.5 rounded-full bg-warning/10 px-3 py-1 text-[12px] font-medium text-warning">
          {needsSignatureCount} Needs Signature
        </div>
      )}
      <div className="flex items-center justify-between">
        <p className="text-[13px] text-muted-foreground">
          {contracts.length} contract{contracts.length !== 1 ? "s" : ""}
        </p>
        <Button
          size="sm"
          onClick={() => {
            setEditingContract(null);
            setSheetOpen(true);
          }}
        >
          <Plus className="mr-1.5 h-3.5 w-3.5" /> New Contract
        </Button>
      </div>

      {loading ? (
        <div className="py-10 text-center text-[13px] text-muted-foreground">
          Loading…
        </div>
      ) : contracts.length === 0 ? (
        <div className="rounded-xl border border-dashed border-border p-10 text-center">
          <FileText className="mx-auto h-8 w-8 text-muted-foreground mb-2" />
          <p className="text-[13px] text-muted-foreground">No contracts yet.</p>
          <p className="text-[12px] text-muted-foreground mt-1">
            Create a contract and send it to the customer for digital signing.
          </p>
        </div>
      ) : (
        <div className="space-y-2">
          {contracts.map((c) => (
            <div
              key={c._id}
              className="rounded-xl border border-border bg-card p-4"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="text-[13px] font-medium text-foreground truncate">
                      {c.title}
                    </p>
                    <span
                      className={`inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-medium capitalize shrink-0 ${CONTRACT_STATUS_STYLES[c.status] ?? "bg-muted text-muted-foreground"}`}
                    >
                      {c.status}
                    </span>
                  </div>
                  {c.signedByName && (
                    <p className="text-[12px] text-success">
                      Accepted by {c.signedByName} · {formatDate(c.signedAt)}
                      {c.acceptedVia && ` · via ${c.acceptedVia === "ipad" ? "studio iPad" : "text link"}`}
                    </p>
                  )}
                  <p className="text-[11px] text-muted-foreground mt-0.5">
                    Created {formatDate(c.createdAt)}
                  </p>
                  {c.documentsIncluded?.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-1.5">
                      {c.documentsIncluded.map((d, i) => (
                        <span key={i} className="rounded-full bg-muted px-2 py-0.5 text-[10px] text-muted-foreground">
                          {d.name} v{d.version}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
                <div className="flex items-center gap-1 shrink-0">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-7 w-7"
                    title="View"
                    onClick={() => setViewingContract(c)}
                  >
                    <FileText className="h-3.5 w-3.5" />
                  </Button>
                  {c.status === "draft" && (
                    <>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-7 w-7"
                        title="Edit"
                        onClick={() => {
                          setEditingContract(c);
                          setSheetOpen(true);
                        }}
                      >
                        <Pencil className="h-3.5 w-3.5" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-7 w-7 text-info hover:text-info"
                        title="Send for signing"
                        disabled={sendingId === c._id}
                        onClick={() => handleSend(c)}
                      >
                        <Send className="h-3.5 w-3.5" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-7 w-7 text-destructive hover:text-destructive"
                        title="Delete"
                        onClick={() => handleDelete(c)}
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </Button>
                    </>
                  )}
                  {c.status === "sent" && (
                    <>
                      {c.documentsIncluded?.length > 0 && (
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-7 w-7 text-info hover:text-info"
                          title="Resend link"
                          onClick={() => handleResendAgreement(c)}
                        >
                          <Send className="h-3.5 w-3.5" />
                        </Button>
                      )}
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-7 w-7 text-warning hover:text-warning"
                        title="Revoke"
                        onClick={() => handleRevoke(c)}
                      >
                        <X className="h-3.5 w-3.5" />
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <ContractFormSheet
        open={sheetOpen}
        onClose={() => setSheetOpen(false)}
        customerId={customerID}
        contract={editingContract}
        onSaved={load}
      />

      {/* View contract dialog */}
      <Dialog
        open={Boolean(viewingContract)}
        onClose={() => setViewingContract(null)}
        maxWidth="4xl"
      >
        <DialogContent
          className="max-h-[90vh] overflow-y-auto"
          onClose={() => setViewingContract(null)}
        >
          <DialogHeader>
            <DialogTitle>{viewingContract?.title}</DialogTitle>
          </DialogHeader>
          {viewingContract && (
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <span
                  className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-[11px] font-medium capitalize ${CONTRACT_STATUS_STYLES[viewingContract.status]}`}
                >
                  {viewingContract.status}
                </span>
              </div>
              <div
                className="agreement-doc rounded-lg border border-border bg-card p-6 max-h-[65vh] overflow-y-auto"
                dangerouslySetInnerHTML={{ __html: viewingContract.content }}
              />
              {viewingContract.signedByName && (
                <div className="rounded-lg border border-success/20 bg-success/10 p-3 text-[12px] text-success space-y-0.5">
                  <p className="font-semibold">Signature Record</p>
                  <p>Signed by: {viewingContract.signedByName}</p>
                  <p>
                    Date: {formatDateTime(viewingContract.signedAt)}
                  </p>
                  {viewingContract.signedByIp && (
                    <p>IP: {viewingContract.signedByIp}</p>
                  )}
                </div>
              )}
              {viewingContract.notes && (
                <p className="text-[12px] text-muted-foreground">
                  Notes: {viewingContract.notes}
                </p>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
