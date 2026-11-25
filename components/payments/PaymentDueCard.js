"use client";

// Shared "pay an outstanding balance" card — flexible billing, a one-time
// package's remaining balance, and an event/product purchase balance all
// render through this one card in the main customer profile and the
// calendar mini student panel, so wallet shortfall / terminal / tips behave
// identically everywhere. Extracted from
// app/settings/users-roles/customers/[id]/page.js.

import { useState, useEffect } from "react";
import { CalendarDays } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import api from "@/lib/api";
import { formatDate } from "@/lib/utils";
import { useCardProcessor } from "@/app/settings/payments/useCardProcessor";
import {
  openCheckoutTab,
  navigateCheckoutTab,
  closeCheckoutTab,
  CHECKOUT_TOAST,
} from "@/lib/clover";
import { PAYMENT_METHODS_WITH_SAVED_CARD, SHORTFALL_METHODS_WITH_TERMINAL } from "@/lib/paymentMethods";
import { dateInputToISO, todayDateInput } from "@/lib/studioLocalDate";
import WalletShortfallField, {
  walletPaymentFields,
} from "@/components/payments/WalletShortfallField";
import TerminalDeviceField, { terminalTipPayload } from "@/components/payments/TerminalDeviceField";
import SavedCardField from "@/components/payments/SavedCardField";
import CheckNumberField from "@/components/payments/CheckNumberField";
import PaymentMethodPicker from "@/components/payments/PaymentMethodPicker";
import SendPaymentLinkMenu from "@/components/payments/SendPaymentLinkMenu";
import { fetchWalletBalance } from "@/lib/wallet";
import { useToast } from "@/components/ui/toast";

export default function PaymentDueCard({
  itemName,
  badgeLabel = "Flexible Billing",
  amountDue,
  dueDate,
  onChangeDueDate,
  customerID,
  locationID,
  paymentType,
  paymentTarget,
  sendLinkTarget,
  onSuccess,
}) {
  const outstanding = Math.max(0, Number(amountDue) || 0);
  const isOverdue = dueDate && outstanding > 0 && new Date(dueDate) < new Date();
  const [mode, setMode] = useState(null); // "pay" | "change-date"
  const [amount, setAmount] = useState(String(outstanding.toFixed(2)));
  const [method, setMethod] = useState("cash");
  const [paymentDate, setPaymentDate] = useState(todayDateInput);
  const [shortfallMethod, setShortfallMethod] = useState("cash");
  const [walletBalance, setWalletBalance] = useState(0);
  const [deviceID, setDeviceID] = useState("");
  const [savedCardID, setSavedCardID] = useState("");
  const [checkNumber, setCheckNumber] = useState("");
  const [newDueDate, setNewDueDate] = useState(
    dueDate ? new Date(dueDate).toISOString().slice(0, 10) : "",
  );
  const [saving, setSaving] = useState(false);
  const toast = useToast();
  const { ready: cloverReady, provider } = useCardProcessor(locationID);

  useEffect(() => {
    if (mode === "pay") fetchWalletBalance(customerID).then(setWalletBalance);
  }, [mode, customerID]);

  // A wallet short of the amount is topped up by the shortfall method, and that is what
  // reaches Clover — so it decides whether a checkout tab is opened.
  const paymentFields = walletPaymentFields({
    method,
    shortfallMethod,
    balance: walletBalance,
    amountDue: parseFloat(amount) || 0,
  });
  const payWithClover = paymentFields.method === "card" && cloverReady;
  const cloverNotConnected = paymentFields.method === "card" && !cloverReady;
  // ACH is a Stripe-only hosted checkout — Clover has no ACH product, so being
  // "ready" on Clover alone doesn't make this payable.
  const payWithACH = paymentFields.method === "ach" && provider === "stripe";
  const achNotAvailable = paymentFields.method === "ach" && provider !== "stripe";
  const payWithTerminal = paymentFields.method === "terminal";
  const terminalNotSelected = payWithTerminal && !deviceID;
  const payWithSavedCard = paymentFields.method === "saved_card";
  const savedCardNotSelected = payWithSavedCard && !savedCardID;
  const payWithCheque = paymentFields.method === "cheque";
  const amountValid = parseFloat(amount) > 0;

  async function submitPayment() {
    const num = parseFloat(amount);
    if (isNaN(num) || num <= 0) return;
    if (payWithTerminal && !deviceID) return;
    if (payWithSavedCard && !savedCardID) return;
    if (achNotAvailable) return;
    const checkoutTab = payWithClover || payWithACH ? openCheckoutTab() : null;
    setSaving(true);
    const res = await api.post("/api/payment", {
      customerID,
      ...paymentTarget,
      type: paymentType,
      amount: num,
      ...walletPaymentFields({
        method,
        shortfallMethod,
        balance: walletBalance,
        amountDue: num,
      }),
      ...(payWithTerminal ? { deviceID, ...terminalTipPayload() } : {}),
      ...(payWithSavedCard ? { cardToken: savedCardID } : {}),
      ...(payWithCheque ? { checkNumber } : {}),
      ...(paymentDate ? { paymentDate: dateInputToISO(paymentDate) } : {}),
    });
    if (res.success) {
      if (res.data?.checkoutUrl) {
        navigateCheckoutTab(checkoutTab, res.data.checkoutUrl);
        toast.success(CHECKOUT_TOAST);
      } else if (res.data?.pending) {
        // A Stripe Terminal charge is async — the PaymentIntent only
        // succeeds once the customer taps their card, settled later by the
        // webhook. Unlike Clover's synchronous device charge, there's
        // nothing to confirm yet, so don't claim it's recorded.
        //
        // A saved-card charge is also settled by the webhook, but nobody is
        // standing at a reader — saying "waiting for the card" would send staff
        // looking for a tap that never comes.
        toast.success(
          payWithSavedCard
            ? "Card charged — confirming with Stripe."
            : "Charge sent to the reader — waiting for the card.",
        );
      } else {
        toast.success(
          num >= outstanding
            ? "Payment recorded."
            : "Partial payment recorded.",
        );
      }
      setMode(null);
      onSuccess();
    } else {
      closeCheckoutTab(checkoutTab);
      toast.error(res.error || "Failed to record payment.");
    }
    setSaving(false);
  }

  async function handlePay(e) {
    e.preventDefault();
    await submitPayment();
  }

  async function handleChangeDate(e) {
    e.preventDefault();
    if (!newDueDate || !onChangeDueDate) return;
    setSaving(true);
    const res = await onChangeDueDate(newDueDate);
    if (res.success) {
      toast.success("Due date updated.");
      setMode(null);
      onSuccess();
    } else {
      toast.error(res.error || "Failed to update due date.");
    }
    setSaving(false);
  }

  return (
    <div
      className={`rounded-xl border ${isOverdue ? "border-rose-300 bg-rose-50/40 dark:bg-rose-900/10" : "border-warning/20 bg-warning/10"} p-4 space-y-3`}
    >
      <div className="flex items-start justify-between gap-2">
        <div>
          <div className="flex items-center gap-2 flex-wrap">
            <p className="text-[13px] font-semibold text-foreground">
              {itemName}
            </p>
            <span className="inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-medium bg-violet-500/10 text-violet-600">
              {badgeLabel}
            </span>
            {isOverdue && (
              <span className="inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-medium bg-rose-500/10 text-rose-600">
                Overdue
              </span>
            )}
          </div>
          <div className="mt-1.5 flex items-center gap-4 flex-wrap">
            <div>
              <span className="text-[11px] text-muted-foreground">
                Amount Due{" "}
              </span>
              <span className="text-[13px] font-bold text-rose-600">
                ${outstanding.toFixed(2)}
              </span>
            </div>
            {dueDate && (
              <div>
                <span className="text-[11px] text-muted-foreground">
                  Due Date{" "}
                </span>
                <span
                  className={`text-[12px] font-medium ${isOverdue ? "text-rose-600" : "text-foreground"}`}
                >
                  {formatDate(dueDate)}
                </span>
              </div>
            )}
          </div>
        </div>
        {mode !== "change-date" && (
          <div className="flex items-center gap-2 shrink-0">
            <Button
              size="sm"
              className="h-7 px-3 text-[11px] bg-success hover:bg-success text-white"
              onClick={() => setMode("pay")}
            >
              Pay Now
            </Button>
            {onChangeDueDate && (
              <Button
                variant="outline"
                size="sm"
                className="h-7 px-3 text-[11px]"
                onClick={() => setMode("change-date")}
              >
                Change Due Date
              </Button>
            )}
            {sendLinkTarget && cloverReady && customerID && (
              <SendPaymentLinkMenu
                customerID={customerID}
                target={sendLinkTarget}
                onSent={onSuccess}
              />
            )}
          </div>
        )}
      </div>

      <Dialog open={mode === "pay"} onClose={() => setMode(null)} maxWidth="md">
        <DialogContent className="!p-0 overflow-hidden">
          <div className="bg-gradient-to-br from-[var(--studio-primary)]/15 via-[var(--studio-primary)]/5 to-transparent px-6 pt-6 pb-5 border-b border-border">
            <DialogHeader>
              <DialogTitle>Pay Now</DialogTitle>
            </DialogHeader>
            <div className="mt-3 flex items-end justify-between gap-3">
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="inline-flex items-center rounded-full bg-background/80 px-2.5 py-1 text-[11px] font-semibold text-foreground shadow-sm">
                    {itemName}
                  </span>
                  <span className="inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-medium bg-violet-500/10 text-violet-600">
                    {badgeLabel}
                  </span>
                </div>
                {dueDate && (
                  <p className="mt-1.5 flex items-center gap-1 text-[11px] text-muted-foreground">
                    <CalendarDays className="h-3 w-3" />
                    Due {formatDate(dueDate)}
                  </p>
                )}
              </div>
              <p className="text-[26px] font-bold leading-none text-foreground">
                ${outstanding.toFixed(2)}
              </p>
            </div>
          </div>

          <form onSubmit={handlePay} className="space-y-4 px-6 pt-5 pb-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              <div>
                <label className="block text-[11px] font-semibold text-muted-foreground uppercase tracking-wide mb-1">
                  Amount
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[13px] font-medium text-muted-foreground">
                    $
                  </span>
                  <input
                    type="number"
                    min="0.01"
                    step="any"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="h-10 w-full rounded-lg border border-border bg-background pl-6 pr-2.5 text-[14px] font-medium outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/15"
                  />
                </div>
              </div>
              <div>
                <label className="block text-[11px] font-semibold text-muted-foreground uppercase tracking-wide mb-1">
                  Payment Date
                </label>
                <div className="relative">
                  <CalendarDays className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
                  <input
                    type="date"
                    value={paymentDate}
                    max={todayDateInput()}
                    onChange={(e) => setPaymentDate(e.target.value)}
                    className="h-10 w-full rounded-lg border border-border bg-background pl-9 pr-2.5 text-[13px] outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/15"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-muted-foreground uppercase tracking-wide mb-1">
                Payment method
              </label>
              <PaymentMethodPicker methods={PAYMENT_METHODS_WITH_SAVED_CARD} value={method} onChange={setMethod} />
            </div>

            <WalletShortfallField
              method={method}
              balance={walletBalance}
              amountDue={parseFloat(amount) || 0}
              shortfallMethod={shortfallMethod}
              onShortfallMethodChange={setShortfallMethod}
              methods={SHORTFALL_METHODS_WITH_TERMINAL}
            />
            {cloverNotConnected && (
              <p className="text-[12px] text-muted-foreground">
                Connect a card processor (Clover or Stripe) in Settings → Integrations to charge a card.
              </p>
            )}
            {achNotAvailable && (
              <p className="text-[12px] text-muted-foreground">
                ACH needs Stripe — connect it in Settings → Integrations.
              </p>
            )}
            {payWithACH && sendLinkTarget && customerID && (
              <div className="flex items-center justify-between gap-2 rounded-lg border border-primary/30 bg-primary/5 px-3 py-2">
                <p className="text-[11px] text-foreground">
                  Bank transfer redirects off-screen — send a link instead and let the customer pay from their phone.
                </p>
                <SendPaymentLinkMenu
                  customerID={customerID}
                  target={sendLinkTarget}
                  onSent={() => {
                    setMode(null);
                    onSuccess();
                  }}
                />
              </div>
            )}
            <TerminalDeviceField
              method={paymentFields.method}
              locationID={locationID}
              deviceID={deviceID}
              onDeviceChange={setDeviceID}
            />
            <SavedCardField
              method={method}
              locationID={locationID}
              customerID={customerID}
              cardToken={savedCardID}
              onCardChange={setSavedCardID}
            />
            <CheckNumberField
              method={payWithCheque ? "cheque" : ""}
              checkNumber={checkNumber}
              onChange={setCheckNumber}
            />

            <div className="flex justify-end gap-2 pt-2 border-t border-border/70 mt-1">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setMode(null)}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                size="sm"
                className="bg-success hover:bg-success text-white shadow-sm"
                disabled={saving || !amountValid || cloverNotConnected || achNotAvailable || terminalNotSelected || savedCardNotSelected}
              >
                {saving
                  ? payWithTerminal
                    ? "Waiting for terminal…"
                    : "Saving…"
                  : payWithClover
                    ? "Pay by card"
                    : payWithACH
                      ? "Pay by bank transfer"
                      : payWithTerminal
                        ? "Charge Terminal"
                        : payWithSavedCard
                          ? "Charge saved card"
                          : "Confirm Payment"}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {mode === "change-date" && (
        <form
          onSubmit={handleChangeDate}
          className="flex items-end gap-2 flex-wrap pt-2 border-t border-border/50"
        >
          <div className="flex-1 min-w-[160px]">
            <label className="block text-[10px] font-medium text-muted-foreground mb-1">
              New Due Date
            </label>
            <input
              type="date"
              value={newDueDate}
              onChange={(e) => setNewDueDate(e.target.value)}
              className="h-8 w-full rounded-md border border-border bg-background px-2.5 text-[12px] outline-none focus:border-primary"
            />
          </div>
          <div className="flex gap-1.5">
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="h-8 px-3 text-[11px]"
              onClick={() => setMode(null)}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              size="sm"
              className="h-8 px-3 text-[11px]"
              disabled={saving || !newDueDate}
            >
              {saving ? "Saving…" : "Update Date"}
            </Button>
          </div>
        </form>
      )}
    </div>
  );
}
