"use client";

import { useState, useEffect, useCallback } from "react";
import { useTerminalChargeSettled } from "@/lib/hooks/useTerminalChargeSettled";
import {
  Wallet,
  Plus,
  Minus,
  ArrowDownLeft,
  ArrowUpRight,
  Search,
  X,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/toast";
import LoadingSpinner from "@/components/shared/LoadingSpinner";
import api from "@/lib/api";
import { formatDateTime } from "@/lib/utils";
import { useCardProcessor } from "@/app/settings/payments/useCardProcessor";
import { openCheckoutTab, navigateCheckoutTab, closeCheckoutTab, CHECKOUT_TOAST } from "@/lib/clover";
import { PAYMENT_METHODS_WITH_SAVED_CARD } from "@/lib/paymentMethods";
import PaymentMethodPicker from "@/components/payments/PaymentMethodPicker";
import TerminalDeviceField, { terminalTipPayload } from "@/components/payments/TerminalDeviceField";
import SavedCardField from "@/components/payments/SavedCardField";
import CheckNumberField from "@/components/payments/CheckNumberField";
import { resolveLocationID } from "@/app/settings/payments/clover/useCloverConnection";

// "Add Money" is a real payment collected from the customer — wallet is excluded
// from the method list since you can't fund the wallet from itself.
const ADD_MONEY_METHODS = PAYMENT_METHODS_WITH_SAVED_CARD.filter((m) => m.value !== "wallet");

const TYPE_LABELS = {
  credit_added: "Credit Added",
  booking_payment: "Booking Payment",
  membership_payment: "Membership Payment",
  program_payment: "Program Payment",
  booking_refund: "Booking Refund",
  refund: "Refund",
  admin_adjustment: "Admin Adjustment",
};

const TYPE_OPTIONS = Object.entries(TYPE_LABELS);

const money = (n) => `$${Number(n ?? 0).toFixed(2)}`;

function FormField({ label, required, children }) {
  return (
    <div>
      <label className="block text-[12px] font-medium text-foreground mb-1.5">
        {label}
        {required && <span className="text-rose-500 ml-0.5">*</span>}
      </label>
      {children}
    </div>
  );
}

function AdjustWalletDialog({ open, mode, customerID, locationID, onClose, onSuccess }) {
  const [amount, setAmount] = useState("");
  const [note, setNote] = useState("");
  const [description, setDescription] = useState("");
  const [method, setMethod] = useState("cash");
  const [deviceID, setDeviceID] = useState("");
  const [savedCardID, setSavedCardID] = useState("");
  const [checkNumber, setCheckNumber] = useState("");
  const [saving, setSaving] = useState(false);

  const isAddMoney = mode === "add";
  const isCredit = mode === "add" || mode === "credit";
  const { ready: cloverReady, provider } = useCardProcessor(locationID);
  const resolvedLocationID = resolveLocationID(locationID);

  const payWithClover = isAddMoney && method === "card" && cloverReady;
  const cloverNotConnected = isAddMoney && method === "card" && !cloverReady;
  const payWithACH = isAddMoney && method === "ach" && provider === "stripe";
  const achNotAvailable = isAddMoney && method === "ach" && provider !== "stripe";
  const payWithTerminal = isAddMoney && method === "terminal";
  const terminalNotSelected = payWithTerminal && !deviceID;
  const payWithSavedCard = isAddMoney && method === "saved_card";
  const savedCardNotSelected = payWithSavedCard && !savedCardID;

  function reset() {
    setAmount("");
    setNote("");
    setDescription("");
    setMethod("cash");
    setDeviceID("");
    setSavedCardID("");
    setCheckNumber("");
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const num = parseFloat(amount);
    if (isNaN(num) || num <= 0) return;
    if (!isAddMoney && !note.trim()) {
      toast.error("A reason/note is required for manual adjustments.");
      return;
    }
    if (isAddMoney) {
      if (terminalNotSelected || savedCardNotSelected || achNotAvailable) return;
    }
    setSaving(true);

    let res;
    if (isAddMoney) {
      const checkoutTab = payWithClover || payWithACH ? openCheckoutTab() : null;
      res = await api.post("/api/payment", {
        customerID,
        type: "wallet_topup",
        amount: num,
        method,
        notes: description.trim() || undefined,
        ...(payWithTerminal ? { deviceID, ...terminalTipPayload() } : {}),
        ...(payWithSavedCard ? { cardToken: savedCardID } : {}),
        ...(method === "cheque" ? { checkNumber } : {}),
      });
      if (res.success && res.data?.checkoutUrl) {
        navigateCheckoutTab(checkoutTab, res.data.checkoutUrl);
        toast.success(CHECKOUT_TOAST);
      } else if (res.success && res.data?.pending) {
        toast.success(
          payWithSavedCard
            ? "Card charged — confirming with Stripe."
            : "Charge sent to the reader — waiting for the card.",
        );
      } else if (res.success) {
        toast.success("Funds added to wallet.");
      } else {
        closeCheckoutTab(checkoutTab);
      }
    } else {
      res = await api.post(`/api/wallet/admin/${mode}`, {
        customerID,
        amount: num,
        note: note.trim(),
      });
      if (res.success) {
        toast.success(mode === "credit" ? "Wallet credited." : "Wallet debited.");
      }
    }

    if (res.success) {
      reset();
      onSuccess();
      onClose();
    } else {
      toast.error("Operation failed", { description: res.error });
    }
    setSaving(false);
  }

  const title = isAddMoney
    ? "Add Money"
    : mode === "credit"
      ? "Credit Wallet"
      : "Debit Wallet";

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
      <DialogContent className={isAddMoney ? "max-w-md" : "max-w-sm"}>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 mt-2">
          <FormField label="Amount" required>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[13px] text-muted-foreground">
                $
              </span>
              <input
                type="number"
                min="0.01"
                step="any"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0.00"
                autoFocus
                className="h-9 w-full rounded-lg border border-border bg-background pl-7 pr-3 text-[13px] outline-none focus:border-primary"
              />
            </div>
          </FormField>

          {isAddMoney ? (
            <>
              <FormField label="Payment method">
                <PaymentMethodPicker methods={ADD_MONEY_METHODS} value={method} onChange={setMethod} />
              </FormField>
              {cloverNotConnected && (
                <p className="text-[11px] text-muted-foreground">
                  Connect a card processor (Clover or Stripe) in Settings → Integrations to charge a card.
                </p>
              )}
              {achNotAvailable && (
                <p className="text-[11px] text-muted-foreground">
                  ACH needs Stripe — connect it in Settings → Integrations.
                </p>
              )}
              <TerminalDeviceField
                method={method}
                locationID={resolvedLocationID}
                deviceID={deviceID}
                onDeviceChange={setDeviceID}
              />
              <SavedCardField
                method={method}
                locationID={resolvedLocationID}
                customerID={customerID}
                cardToken={savedCardID}
                onCardChange={setSavedCardID}
              />
              <CheckNumberField method={method} checkNumber={checkNumber} onChange={setCheckNumber} />
              <FormField label="Description (optional)">
                <input
                  type="text"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="e.g. Top-up via card"
                  className="h-9 w-full rounded-lg border border-border bg-background px-3 text-[13px] outline-none focus:border-primary"
                />
              </FormField>
            </>
          ) : (
            <FormField label="Reason / Note" required>
              <input
                type="text"
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="e.g. Goodwill credit, billing correction"
                className="h-9 w-full rounded-lg border border-border bg-background px-3 text-[13px] outline-none focus:border-primary"
              />
            </FormField>
          )}

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
              disabled={
                saving ||
                !amount ||
                (isAddMoney &&
                  (cloverNotConnected || achNotAvailable || terminalNotSelected || savedCardNotSelected))
              }
              className={
                isCredit
                  ? "bg-emerald-600 hover:bg-emerald-700 text-white"
                  : "bg-rose-600 hover:bg-rose-700 text-white"
              }
            >
              {saving
                ? payWithTerminal
                  ? "Waiting for terminal…"
                  : "Saving…"
                : title}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default function CustomerWalletTab({ customerID, locationID }) {
  const [wallet, setWallet] = useState(null);
  const [txns, setTxns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [typeFilter, setTypeFilter] = useState("");
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [refSearch, setRefSearch] = useState("");
  const [dialogMode, setDialogMode] = useState(null); // "add" | "credit" | "debit"
  const LIMIT = 20;

  const loadBalance = useCallback(async () => {
    const res = await api.get(`/api/wallet/${customerID}/balance`);
    if (res.success) setWallet(res.data);
  }, [customerID]);

  const loadTxns = useCallback(
    async (p = 1) => {
      setLoading(true);
      const params = new URLSearchParams({ page: String(p), limit: String(LIMIT) });
      if (typeFilter) params.set("type", typeFilter);
      if (start) params.set("start", start);
      if (end) params.set("end", end);
      if (refSearch.trim()) params.set("referenceId", refSearch.trim());

      const res = await api.get(
        `/api/wallet/${customerID}/transactions?${params.toString()}`,
      );
      if (res.success) {
        setTxns(res.data || []);
        setTotal(res.pagination?.total ?? res.data?.length ?? 0);
      }
      setLoading(false);
    },
    [customerID, typeFilter, start, end, refSearch],
  );

  useEffect(() => {
    loadBalance();
  }, [loadBalance]);

  useEffect(() => {
    loadTxns(page);
  }, [loadTxns, page]);

  // Reset to first page whenever a filter changes
  useEffect(() => {
    setPage(1);
  }, [typeFilter, start, end, refSearch]);

  const refresh = () => {
    loadBalance();
    loadTxns(page);
  };
  // A reader charge that ends (paid / cancelled) changes the balance behind the toast.
  useTerminalChargeSettled(refresh);

  const clearFilters = () => {
    setTypeFilter("");
    setStart("");
    setEnd("");
    setRefSearch("");
  };

  const hasFilters = typeFilter || start || end || refSearch;
  const totalPages = Math.max(1, Math.ceil(total / LIMIT));

  return (
    <div className="space-y-5">
      {/* Balance card */}
      <div className="rounded-xl border border-border bg-gradient-to-br from-primary/5 to-card p-5">
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <Wallet className="h-5 w-5" />
            </div>
            <div>
              <p className="text-[12px] text-muted-foreground">Wallet Balance</p>
              <p className="text-[26px] font-bold leading-tight text-foreground">
                {wallet ? money(wallet.balance) : "—"}
              </p>
              {wallet?.status === "frozen" && (
                <span className="inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-medium bg-amber-500/10 text-amber-600">
                  Frozen
                </span>
              )}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button
              size="sm"
              className="h-8 px-3 text-[12px] bg-emerald-600 hover:bg-emerald-700 text-white"
              onClick={() => setDialogMode("add")}
            >
              <Plus className="h-3.5 w-3.5 mr-1" /> Add Money
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="h-8 px-3 text-[12px]"
              onClick={() => setDialogMode("credit")}
            >
              <ArrowDownLeft className="h-3.5 w-3.5 mr-1" /> Credit
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="h-8 px-3 text-[12px]"
              onClick={() => setDialogMode("debit")}
            >
              <Minus className="h-3.5 w-3.5 mr-1" /> Debit
            </Button>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex items-end gap-2 flex-wrap">
        <div>
          <label className="block text-[10px] font-medium text-muted-foreground mb-1">
            Type
          </label>
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="h-8 rounded-md border border-border bg-background px-2.5 text-[12px] outline-none focus:border-primary"
          >
            <option value="">All types</option>
            {TYPE_OPTIONS.map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-[10px] font-medium text-muted-foreground mb-1">
            From
          </label>
          <input
            type="date"
            value={start}
            onChange={(e) => setStart(e.target.value)}
            className="h-8 rounded-md border border-border bg-background px-2.5 text-[12px] outline-none focus:border-primary"
          />
        </div>
        <div>
          <label className="block text-[10px] font-medium text-muted-foreground mb-1">
            To
          </label>
          <input
            type="date"
            value={end}
            onChange={(e) => setEnd(e.target.value)}
            className="h-8 rounded-md border border-border bg-background px-2.5 text-[12px] outline-none focus:border-primary"
          />
        </div>
        <div className="flex-1 min-w-[160px]">
          <label className="block text-[10px] font-medium text-muted-foreground mb-1">
            Reference ID
          </label>
          <div className="relative">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground/60" />
            <input
              type="text"
              value={refSearch}
              onChange={(e) => setRefSearch(e.target.value)}
              placeholder="Search by reference ID"
              className="h-8 w-full rounded-md border border-border bg-muted/30 pl-8 pr-2.5 text-[12px] text-foreground outline-none focus:border-primary transition-colors placeholder:text-muted-foreground/50"
            />
          </div>
        </div>
        {hasFilters && (
          <Button
            variant="ghost"
            size="sm"
            className="h-8 px-2.5 text-[12px] text-muted-foreground"
            onClick={clearFilters}
          >
            <X className="h-3.5 w-3.5 mr-1" /> Clear
          </Button>
        )}
      </div>

      {/* Transactions */}
      {loading ? (
        <div className="flex items-center justify-center py-16">
          <LoadingSpinner />
        </div>
      ) : txns.length === 0 ? (
        <div className="rounded-xl border border-border bg-card py-16 text-center text-[13px] text-muted-foreground">
          {hasFilters ? "No transactions match these filters." : "No wallet transactions yet."}
        </div>
      ) : (
        <>
          <div className="rounded-xl border border-border bg-card overflow-hidden">
            <table className="w-full text-[13px]">
              <thead>
                <tr className="border-b border-border bg-muted/30">
                  {[
                    "Date & Time",
                    "Type",
                    "Amount",
                    "Prev. Balance",
                    "New Balance",
                    "Description",
                    "Reference",
                    "By",
                  ].map((h) => (
                    <th
                      key={h}
                      className="px-4 py-2.5 text-left text-[11px] font-medium text-muted-foreground whitespace-nowrap"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {txns.map((t, i) => {
                  const isCredit = t.direction === "credit";
                  return (
                    <tr
                      key={t._id}
                      className={`${i > 0 ? "border-t border-border" : ""} hover:bg-muted/20`}
                    >
                      <td className="px-4 py-3 whitespace-nowrap text-muted-foreground">
                        {formatDateTime(t.createdAt)}
                      </td>
                      <td className="px-4 py-3 text-muted-foreground whitespace-nowrap">
                        <span className="inline-flex items-center gap-1.5">
                          {isCredit ? (
                            <ArrowDownLeft className="h-3.5 w-3.5 text-emerald-600" />
                          ) : (
                            <ArrowUpRight className="h-3.5 w-3.5 text-rose-600" />
                          )}
                          {TYPE_LABELS[t.type] ?? t.type}
                        </span>
                      </td>
                      <td
                        className={`px-4 py-3 font-semibold whitespace-nowrap ${isCredit ? "text-emerald-600" : "text-rose-600"}`}
                      >
                        {isCredit ? "+" : "−"}
                        {money(t.amount)}
                      </td>
                      <td className="px-4 py-3 text-muted-foreground whitespace-nowrap">
                        {money(t.balanceBefore)}
                      </td>
                      <td className="px-4 py-3 font-medium text-foreground whitespace-nowrap">
                        {money(t.balanceAfter)}
                      </td>
                      <td className="px-4 py-3 text-muted-foreground max-w-[220px] truncate">
                        {t.description || "—"}
                      </td>
                      <td className="px-4 py-3 text-muted-foreground">
                        {t.referenceId ? (
                          <span title={t.referenceId} className="font-mono text-[11px]">
                            {t.referenceType ? `${t.referenceType}: ` : ""}
                            {String(t.referenceId).slice(-6)}
                          </span>
                        ) : (
                          "—"
                        )}
                      </td>
                      <td className="px-4 py-3 text-muted-foreground capitalize whitespace-nowrap">
                        {t.createdBy?.userId?.name || t.createdBy?.actor || "system"}
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
                Page {page} of {totalPages} · {total} transaction{total !== 1 ? "s" : ""}
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

      <AdjustWalletDialog
        open={Boolean(dialogMode)}
        mode={dialogMode}
        customerID={customerID}
        locationID={locationID}
        onClose={() => setDialogMode(null)}
        onSuccess={refresh}
      />
    </div>
  );
}
