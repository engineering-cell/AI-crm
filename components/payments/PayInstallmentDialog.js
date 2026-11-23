"use client";

// Shared "pay a payment-plan installment" dialog — used by the main customer
// profile and the calendar mini student panel so both surfaces record plan
// payments identically (amount lock, wallet shortfall, terminal, shortfall
// reschedule). Extracted from app/settings/users-roles/customers/[id]/page.js
// so the two call sites can't drift apart again.

import { useState, useEffect, useRef } from "react";
import { CalendarDays, Lock } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
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
import { PAYMENT_METHODS_WITH_SAVED_CARD } from "@/lib/paymentMethods";
import { dateInputToISO, todayDateInput } from "@/lib/studioLocalDate";
import { SHORTFALL_METHODS_WITH_TERMINAL } from "@/lib/paymentMethods";
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

function FormField({ label, required, children }) {
  return (
    <div className="space-y-1.5">
      <label className="block text-[11px] font-semibold text-muted-foreground uppercase tracking-wide">
        {label}
        {required && <span className="text-destructive ml-0.5">*</span>}
      </label>
      {children}
    </div>
  );
}

export default function PayInstallmentDialog({
  open,
  onClose,
  plan,
  installmentIndex,
  billingType,
  locationID,
  onSuccess,
}) {
  const [method, setMethod] = useState("cash");
  const [shortfallMethod, setShortfallMethod] = useState("cash");
  const [walletBalance, setWalletBalance] = useState(0);
  const [amount, setAmount] = useState("");
  const [paymentDate, setPaymentDate] = useState(todayDateInput);
  const [deviceID, setDeviceID] = useState("");
  const [savedCardID, setSavedCardID] = useState("");
  const [checkNumber, setCheckNumber] = useState("");
  const [saving, setSaving] = useState(false);
  const toast = useToast();
  const { ready: cloverReady, provider } = useCardProcessor(locationID || plan);

  useEffect(() => {
    if (open && plan?.customerID) {
      fetchWalletBalance(plan.customerID?._id ?? plan.customerID).then(
        setWalletBalance,
      );
    }
  }, [open, plan?.customerID]);

  const amountEditable = billingType === "flexible";
  const installment = plan?.installments?.[installmentIndex];
  // Guards the shortfall reschedule below from running twice if the actual
  // payment call fails (e.g. a declined card) and staff retries without
  // closing the dialog — the schedule split already went through once.
  const rescheduledRef = useRef(false);

  // When the wallet cannot cover the installment, the shortfall method is what actually
  // reaches Clover — so it, not the wallet, decides whether a checkout tab is needed.
  const paymentFields = walletPaymentFields({
    method,
    shortfallMethod,
    balance: walletBalance,
    amountDue: Number(amount) || 0,
  });
  const payWithClover = paymentFields.method === "card" && cloverReady;
  const cloverNotConnected = paymentFields.method === "card" && !cloverReady;
  // ACH is Stripe-only — Clover has no ACH product.
  const payWithACH = paymentFields.method === "ach" && provider === "stripe";
  const achNotAvailable = paymentFields.method === "ach" && provider !== "stripe";
  const payWithTerminal = paymentFields.method === "terminal";
  const terminalNotSelected = payWithTerminal && !deviceID;
  const payWithSavedCard = paymentFields.method === "saved_card";
  const savedCardNotSelected = payWithSavedCard && !savedCardID;
  const payWithCheque = paymentFields.method === "cheque";

  useEffect(() => {
    if (installment) setAmount(Number(installment.amount).toFixed(2));
    rescheduledRef.current = false;
    setDeviceID("");
    setSavedCardID("");
  }, [installment]);

  function validatedAmount() {
    const num = Number(amount);
    if (isNaN(num) || num <= 0) {
      toast.error("Enter a valid amount.");
      return null;
    }
    return num;
  }

  async function submitPayment() {
    const num = validatedAmount();
    if (num === null) return;
    if (payWithTerminal && !deviceID) return;
    if (payWithSavedCard && !savedCardID) return;
    if (achNotAvailable) return;
    const checkoutTab = payWithClover || payWithACH ? openCheckoutTab() : null;
    setSaving(true);

    // A flexible schedule promises the full balance gets collected. If this
    // installment is being paid for less than its scheduled amount, carve
    // the shortfall into the schedule *before* marking it paid — a
    // single-installment plan otherwise has nothing left pending the moment
    // this one clears, and the backend then has no pending row left to
    // report the balance against, so the remainder silently disappears
    // instead of staying payable. Reordering this ahead of the actual
    // pay-installment call also sidesteps ever asking the backend to add a
    // new installment to a plan it already considers fully paid/completed.
    const shortfall = Number((installment.amount - num).toFixed(2));
    if (billingType === "flexible" && shortfall > 0.01 && !rescheduledRef.current) {
      const otherPending = plan.installments
        .map((i, idx) => ({ ...i, idx }))
        .filter((i) => i.idx !== installmentIndex && i.status === "pending");
      let rescheduleOk;
      if (otherPending.length > 0) {
        const base = Math.floor((shortfall / otherPending.length) * 100) / 100;
        const results = await Promise.all(
          otherPending.map((i, i2) => {
            const bump =
              i2 === otherPending.length - 1
                ? Number((shortfall - base * (otherPending.length - 1)).toFixed(2))
                : base;
            return api.patch(`/api/payment-plan/${plan._id}/installment/${i.idx}/due-date`, {
              dueDate: new Date(i.dueDate).toISOString().slice(0, 10),
              amount: Number((Number(i.amount) + bump).toFixed(2)),
            });
          }),
        );
        rescheduleOk = results.every((r) => r.success);
      } else {
        const addRes = await api.post(`/api/payment-plan/${plan._id}/installment`, {
          dueDate: new Date(installment.dueDate).toISOString().slice(0, 10),
          amount: shortfall,
        });
        rescheduleOk = addRes.success;
      }
      if (!rescheduleOk) {
        closeCheckoutTab(checkoutTab);
        setSaving(false);
        toast.error("Couldn't reschedule the remaining balance — payment not recorded.");
        return;
      }
      rescheduledRef.current = true;
    }

    const res = await api.post(
      `/api/payment-plan/${plan._id}/pay-installment`,
      {
        installmentIndex,
        amount: num,
        paymentDate: dateInputToISO(paymentDate),
        ...(payWithTerminal ? { deviceID, ...terminalTipPayload() } : {}),
        ...(payWithSavedCard ? { cardToken: savedCardID } : {}),
        ...(payWithCheque ? { checkNumber } : {}),
        ...walletPaymentFields({
          method,
          shortfallMethod,
          balance: walletBalance,
          amountDue: num,
        }),
      },
    );
    if (res.success) {
      if (res.data?.checkoutUrl) {
        navigateCheckoutTab(checkoutTab, res.data.checkoutUrl);
        toast.success(CHECKOUT_TOAST);
      } else if (res.data?.pending) {
        // A Stripe Terminal charge is async — the PaymentIntent only succeeds
        // once the customer taps their card, settled later by the webhook. A
        // saved-card charge settles the same way but with nobody at a reader, so
        // it must not send staff looking for a tap that never comes.
        toast.success(
          payWithSavedCard
            ? "Card charged — confirming with Stripe."
            : "Charge sent to the reader — waiting for the card.",
        );
      } else if (shortfall > 0.01) {
        toast.success(
          `Installment payment recorded — $${shortfall.toFixed(2)} shortfall scheduled as a new payment.`,
        );
      } else {
        toast.success("Installment payment recorded.");
      }
      onSuccess();
      onClose();
    } else {
      closeCheckoutTab(checkoutTab);
      toast.error(res.error || "Failed to record payment.");
    }
    setSaving(false);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    await submitPayment();
  }

  async function handleSaveAmount() {
    const num = validatedAmount();
    if (num === null) return;
    setSaving(true);
    const res = await api.patch(
      `/api/payment-plan/${plan._id}/installment/${installmentIndex}/due-date`,
      {
        dueDate: new Date(installment.dueDate).toISOString().slice(0, 10),
        amount: num,
      },
    );
    if (res.success) {
      toast.success("Amount updated.");
      onSuccess();
      onClose();
    } else {
      toast.error(res.error || "Failed to update amount.");
    }
    setSaving(false);
  }

  return (
    <Dialog
      open={open}
      onClose={onClose}
      onOpenChange={(v) => {
        if (!v) onClose();
      }}
    >
      <DialogContent className="max-w-md !p-0 overflow-hidden">
        <div className="bg-gradient-to-br from-[var(--studio-primary)]/15 via-[var(--studio-primary)]/5 to-transparent px-6 pt-6 pb-5 border-b border-border">
          <DialogHeader>
            <DialogTitle>Pay Installment</DialogTitle>
          </DialogHeader>
          {installment && (
            <div className="mt-3 flex items-end justify-between gap-3">
              <div>
                <span className="inline-flex items-center rounded-full bg-background/80 px-2.5 py-1 text-[11px] font-semibold text-foreground shadow-sm">
                  Payment {installmentIndex + 1} of {plan.numberOfInstallments}
                </span>
                <p className="mt-1.5 flex items-center gap-1 text-[11px] text-muted-foreground">
                  <CalendarDays className="h-3 w-3" />
                  Due {formatDate(installment.dueDate)}
                </p>
              </div>
              <p className="text-[26px] font-bold leading-none text-foreground">
                ${Number(installment.amount).toFixed(2)}
              </p>
            </div>
          )}
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 px-6 pt-5 pb-6">
          <FormField label="Amount" required>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[13px] font-medium text-muted-foreground">$</span>
              <input
                type="number"
                min="0.01"
                step="any"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                readOnly={!amountEditable}
                disabled={!amountEditable}
                className={`h-10 w-full rounded-lg border border-border bg-background pl-6 pr-9 text-[14px] font-medium outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/15 ${
                  amountEditable ? "" : "cursor-not-allowed bg-muted/40 text-muted-foreground"
                }`}
              />
              {!amountEditable && (
                <Lock className="pointer-events-none absolute right-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
              )}
            </div>
          </FormField>

          <FormField label="Payment method" required>
            <PaymentMethodPicker methods={PAYMENT_METHODS_WITH_SAVED_CARD} value={method} onChange={setMethod} />
          </FormField>

          <FormField label="Payment date" required>
            <div className="relative">
              <CalendarDays className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
              <input
                type="date"
                value={paymentDate}
                onChange={(e) => setPaymentDate(e.target.value)}
                className="h-10 w-full rounded-lg border border-border bg-background pl-9 pr-3 text-[13px] outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/15"
              />
            </div>
          </FormField>

          <TerminalDeviceField
            method={paymentFields.method}
            locationID={locationID}
            deviceID={deviceID}
            onDeviceChange={setDeviceID}
          />
          <SavedCardField
            method={method}
            locationID={locationID}
            customerID={plan?.customerID?._id ?? plan?.customerID}
            cardToken={savedCardID}
            onCardChange={setSavedCardID}
          />
          <CheckNumberField
            method={payWithCheque ? "cheque" : ""}
            checkNumber={checkNumber}
            onChange={setCheckNumber}
          />
          <WalletShortfallField
            method={method}
            balance={walletBalance}
            amountDue={Number(amount) || 0}
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
          {payWithACH && plan?.customerID && (
            <div className="flex items-center justify-between gap-2 rounded-lg border border-primary/30 bg-primary/5 px-3 py-2">
              <p className="text-[11px] text-foreground">
                Bank transfer redirects off-screen — send a link instead and let the customer pay from their phone.
              </p>
              <SendPaymentLinkMenu
                customerID={plan.customerID?._id ?? plan.customerID}
                target={{
                  kind: "installment",
                  paymentPlanID: plan._id,
                  installmentIndex,
                }}
                onSent={() => {
                  onSuccess();
                  onClose();
                }}
              />
            </div>
          )}

          <div className="flex justify-end gap-2 pt-2 border-t border-border/70 mt-1">
            <Button type="button" variant="outline" size="sm" onClick={onClose}>
              Cancel
            </Button>
            {amountEditable && (
              <Button
                type="button"
                variant="outline"
                size="sm"
                disabled={saving}
                onClick={handleSaveAmount}
              >
                Save
              </Button>
            )}
            <Button
              type="submit"
              size="sm"
              disabled={saving || cloverNotConnected || achNotAvailable || terminalNotSelected || savedCardNotSelected}
              className="bg-success hover:bg-success text-white shadow-sm"
            >
              {saving
                ? payWithTerminal
                  ? "Waiting for terminal…"
                  : "Recording…"
                : payWithClover
                  ? "Pay by card"
                  : payWithACH
                    ? "Pay by bank transfer"
                    : payWithSavedCard
                      ? "Charge saved card"
                      : `Pay $${(Number(amount) || 0).toFixed(2)}`}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
