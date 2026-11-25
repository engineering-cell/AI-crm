// The only payment methods staff can record. "card" is the stored value on every
// Payment row and on the backend enums; "Clover" is only what we call it, because a
// card payment is always collected through Clover's hosted checkout.
//
// Wallet is a method here. When the balance cannot cover the amount, the form asks for a
// second method to collect the difference rather than failing — see WalletShortfallField.
export const PAYMENT_METHODS = [
  { value: "cash", label: "Cash" },
  { value: "cheque", label: "Cheque" },
  { value: "card", label: "Card" },
  // Stripe-only hosted-checkout bank debit — Clover has no ACH product. The
  // backend refuses it outright (400, "ACH requires a Stripe connection…") on
  // a Clover-only location, same guard style as the Clover-connection message
  // below for "card".
  { value: "ach", label: "ACH" },
  { value: "terminal", label: "Terminal" },
  { value: "wallet", label: "Wallet" },
]

// "Terminal" only actually charges a physical reader/device on the one flow wired for
// it — POST /api/payment when the form also collects a deviceID via
// TerminalDeviceField and the backend dispatches to chargeWithCloverDevice /
// chargeWithStripeReader (see PaymentDueCard). Every other payment-recording route —
// installment payments, package/membership creation, tips, wallet-shortfall — has no
// device dispatch behind "terminal" at all: picking it there just writes a completed
// Payment row with nothing actually charged, indistinguishable from staff
// self-attesting money that was never taken. Use this (or PURCHASE_METHODS, which is
// already based on it) for any dropdown that isn't paired with TerminalDeviceField
// and a real device-charging endpoint.
export const NO_DEVICE_PAYMENT_METHODS = PAYMENT_METHODS.filter((m) => m.value !== "terminal")

// One-time purchase forms carry their own "Use wallet balance" toggle, which splits
// the price between the wallet and another method. Offering Wallet as a method there
// too would give staff two different ways to spend the same balance. Terminal is
// excluded for the same reason as NO_DEVICE_PAYMENT_METHODS above.
export const PURCHASE_METHODS = NO_DEVICE_PAYMENT_METHODS.filter((m) => m.value !== "wallet")

// A tip is never drawn from the wallet: Tip rows have no wallet-debit hook (that
// lives on Payment), so a wallet tip would credit a teacher out of nothing. The
// backend Tip.method enum excludes it too.
export const TIP_METHODS = PURCHASE_METHODS

// The methods that can cover what the wallet cannot.
export const SHORTFALL_METHODS = PURCHASE_METHODS

// ...plus the physical reader, for the forms whose backend charges the reader only what the
// wallet leaves (a one-time package sale, a balance payment, an installment, a purchase).
// Pair it with TerminalDeviceField keyed to the method that actually charges, and with a
// deviceID in the payload. A form whose backend cannot do that must keep SHORTFALL_METHODS:
// the wallet's share would be dropped, or the reader never reached.
export const SHORTFALL_METHODS_WITH_TERMINAL = [
  ...SHORTFALL_METHODS,
  PAYMENT_METHODS.find((m) => m.value === "terminal"),
]

// "Saved card" charges a card the customer previously tapped on a Stripe reader,
// off-session and with no reader present. Deliberately NOT in PAYMENT_METHODS: only
// POST /api/payment dispatches it (recordPayment → chargeSavedCard). Every other
// payment-recording route would treat it as a plain method string and write a
// completed Payment for money nobody charged — the same trap documented above for
// "terminal". Use this list only on a form that posts to /api/payment AND renders
// SavedCardField to collect the card.
export const SAVED_CARD_METHOD = { value: "saved_card", label: "Saved card" }
export const PAYMENT_METHODS_WITH_SAVED_CARD = [...PAYMENT_METHODS, SAVED_CARD_METHOD]

// "Share Link" records nothing: the form creates the sale unpaid and emails/texts the
// customer a payment link (POST /api/payment-request) for what would have been
// collected now. Never send it to the backend as a method — no endpoint knows it.
export const SHARE_LINK_METHOD = { value: "link", label: "Share Link" }
