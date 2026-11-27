// Pre-selected "Refund to" for a payment. Money goes back the way it came in: the
// old fixed default of Wallet let staff think a card charge had been returned when
// it was only store credit. "" means there's no safe guess, so staff must choose.
const CARD_METHODS = new Set(["card", "terminal", "saved_card", "online", "ach"]);

export function defaultRefundDestination(method) {
  if (CARD_METHODS.has(method)) return "card";
  return method === "cash" || method === "wallet" ? method : "";
}
