// Whether a lesson has actually been paid for. The calendar grid, the calendar
// event panel and a customer's Lessons tab all read this one rule, so a booking
// can't read "Paid" on one screen and "Unpaid" on another.

import { deriveEffectiveStatus } from "./eventStatus";

export function buildPackageSessionOrder(appointments) {
  // Track session order per (customerID + package reference) for all package
  // billing types. A "package" charge is booked against either a CustomerPackage
  // (charge.customerPackageID — the direct-purchase path, tried first below at
  // sessionsRemaining resolution) or an Enrollment (charge.enrollmentID — the
  // curriculum-enrollment path); either identifies the same kind of credit pool,
  // so both are accepted here. Key: `${customerId}::${packageRefId}::${serviceCode}`,
  // value: sorted array of appointment IDs by date. Used to figure out each
  // session's chronological position so we can decide which sessions are
  // covered by the credits paid so far.
  const pkgSessionOrder = {};

  appointments.forEach((appt) => {
    // Every package charge, not just the first: in a group lesson each student
    // draws on their own package, and each of those is its own credit pool.
    (Array.isArray(appt.charges) ? appt.charges : []).forEach((pkgCharge) => {
      if (pkgCharge.method !== "package") return;
      const packageRefId = String(
        pkgCharge.customerPackageID?._id ?? pkgCharge.customerPackageID ??
        pkgCharge.enrollmentID?._id ?? pkgCharge.enrollmentID ?? "",
      );
      if (!packageRefId) return;
      // Order sessions per service: a package's private-lesson credits are tracked
      // separately from its group-class (or any other) service lines.
      const serviceCode = pkgCharge.serviceCode ?? "";
      const chargeCustomer = pkgCharge.customerID?._id ?? pkgCharge.customerID;
      const customerIds = chargeCustomer
        ? [String(chargeCustomer)]
        : Array.isArray(appt.customerIDs)
          ? appt.customerIDs.map((c) => String(c._id ?? c))
          : [];
      customerIds.forEach((cid) => {
        const key = `${cid}::${packageRefId}::${serviceCode}`;
        if (!pkgSessionOrder[key]) pkgSessionOrder[key] = [];
        pkgSessionOrder[key].push({
          id: String(appt._id),
          date: new Date(appt.startDateTime),
          sessionNumber:
            typeof pkgCharge.sessionNumber === "number"
              ? pkgCharge.sessionNumber
              : null,
        });
      });
    });
  });

  // Sort each group chronologically
  Object.values(pkgSessionOrder).forEach((arr) => arr.sort((a, b) => a.date - b.date));

  // Credit pools whose stamped session numbers cannot be right, so their
  // ordering is recovered from the calendar (chronological) order instead —
  // which is what the stamps were meant to express.
  //
  //  1. Two events in the pool claim the same position. Bookings made before
  //     the backend took its position from the same atomic operation as the
  //     session deduction could observe each other's increments, and a batch
  //     of slots booked together came back sharing one number — five lessons
  //     reading "5 Paid" instead of counting down.
  //  2. The stamps disagree with chronological order. The backend numbers a
  //     session from `sessionsUsed` at booking time, i.e. the order the staff
  //     member created the bookings — so booking five slots newest-first
  //     leaves the earliest lesson stamped #5. `arr` is already sorted by
  //     date, so its stamps must be non-decreasing or the pool is unreliable.
  const untrustedPools = new Set();
  Object.entries(pkgSessionOrder).forEach(([key, arr]) => {
    const stamped = arr.map((e) => e.sessionNumber).filter((n) => n != null);
    if (new Set(stamped).size !== stamped.length) {
      untrustedPools.add(key);
      return;
    }
    for (let i = 1; i < stamped.length; i++) {
      if (stamped[i] < stamped[i - 1]) {
        untrustedPools.add(key);
        return;
      }
    }
  });

  return { pkgSessionOrder, untrustedPools };
}

// Options:
//  - pkgSessionOrder / untrustedPools: buildPackageSessionOrder() over the events
//    loaded with this one — orders package sessions whose charge has no
//    trustworthy backend sessionNumber stamp.
//  - membershipCoverageSet: "customerID::serviceCode" for active memberships.
//  - customerID: judge only this student's charge. A group lesson holds one
//    charge per student; without it the event's first charge decides.
export function resolveEventPayment(
  appt,
  { pkgSessionOrder = {}, untrustedPools = new Set(), membershipCoverageSet = new Set(), customerID = null } = {},
) {
  const serviceCode = appt.calendarServiceID?.serviceCode || "";
  const charges = (Array.isArray(appt.charges) ? appt.charges : []).filter(
    (c) => !customerID || String(c.customerID?._id ?? c.customerID) === String(customerID),
  );
  const customerIds = customerID
    ? [String(customerID)]
    : (Array.isArray(appt.customerIDs) ? appt.customerIDs : []).map((c) => String(c._id ?? c));
  // For one student, their own charges decide the method (derived the way the
  // backend derives the event's: none, one distinct method, else "mixed") — a
  // student with no charge must not inherit a classmate's package.
  const ownMethods = new Set(charges.map((c) => c.method));
  const chargeMethod = !customerID
    ? appt.chargeMethod
    : ownMethods.size === 0
      ? "none"
      : ownMethods.size === 1 ? [...ownMethods][0] : "mixed";

  // Find sessions remaining from the first package/enrollment charge record
  let sessionsRemaining = null;
  let totalSessions = null;
  let sessionsPaidFor = null;
  let sessionsBooked = null;
  let pkgFullyPaid = false;
  if (charges.length > 0) {
    // Membership session-type charges
    const memCharge = charges.find((c) => c.method === "membership" && c.accessType === "sessions");
    if (memCharge?.customerMembershipID) {
      const cm = memCharge.customerMembershipID;
      const cmSvc = (cm.services || []).find((s) => s.serviceCode === serviceCode);
      if (cmSvc) {
        sessionsRemaining = cmSvc.sessionsRemaining ?? null;
        totalSessions = (cmSvc.sessionsUsed ?? 0) + (cmSvc.sessionsRemaining ?? 0);
      }
    }

    const pkgCharge = charges.find((c) => c.method === "package");
    if (pkgCharge) {
      const billingType = appt.packageBillingType ?? null;
      const enrollmentPkg = pkgCharge?.enrollmentID?.package ?? null;
      // Where the money actually lives: an enrollment's package, or the package
      // itself on a direct purchase.
      const billingPkg = enrollmentPkg ?? pkgCharge?.customerPackageID ?? null;
      const amountCollected = billingPkg?.amountCollected ?? 0;
      const totalPaid = billingPkg?.totalPaid ?? 0;
      pkgFullyPaid =
        billingPkg?.paymentStatus === "paid" ||
        (amountCollected > 0 && amountCollected >= totalPaid);

      // Positive evidence that the package has NOT been settled — an explicit
      // non-paid status, or (when the backend sent none) a collected figure short
      // of the price. Missing data leaves the "settled at purchase" assumption
      // alone rather than flipping every one-time booking to Unpaid; a $0 package
      // has nothing to settle and stays paid.
      const packageUnderpaid = billingPkg?.paymentStatus
        ? billingPkg.paymentStatus !== "paid"
        : totalPaid > 0 && amountCollected < totalPaid;

      // A service is "free" when non-chargeable or fully discounted — it has no
      // credits, only sessions, and must be excluded from the paid-credit math.
      const isFreeSvc = (s) =>
        s.isChargeable === false || Number(s.finalAmount || 0) <= 0;

      // Paid sessions for one service — the same math as the customer profile's
      // "Credit Balance" column (before booked sessions come off), so the calendar
      // and the profile can't disagree about whether a student has paid credit.
      const resolveSessionsPaidFor = (svc, services) => {
        if (isFreeSvc(svc)) return null;
        const sessTotal =
          svc.sessionsTotal ?? (svc.sessionsUsed ?? 0) + (svc.sessionsRemaining ?? 0);
        const bt = billingType ?? enrollmentPkg?.billingType;
        // A one-time / pay-per-session package is settled at purchase, so every
        // session it holds is a paid credit — but only while it really is settled.
        // Once it is partly collected or refunded it accrues credits from the money
        // actually taken, exactly like an installment package. Without this, an
        // enrollment showing $300 collected of $4350 with $4050 refunded still
        // reported all 30 of its bookings as "Paid" on the calendar.
        if (bt !== "flexible" && bt !== "payment_plan" && !packageUnderpaid) {
          return sessTotal;
        }
        // Fully collected, whatever the billing type or a stale status says.
        if (totalPaid > 0 && amountCollected >= totalPaid) return sessTotal;
        // Split the collected amount across paid services by their share of the
        // package's net (post-discount) price, then convert this service's share
        // to sessions at its post-discount price.
        const netOf = (s) =>
          Number(s.finalAmount) > 0
            ? Number(s.finalAmount)
            : (s.sessionsTotal ?? (s.sessionsUsed ?? 0) + (s.sessionsRemaining ?? 0)) *
              Number(s.pricePerSession || 0);
        const chargeablePriceTotal = (services ?? []).reduce(
          (sum, s) => sum + (isFreeSvc(s) ? 0 : netOf(s)),
          0,
        );
        const svcShare =
          chargeablePriceTotal > 0 ? netOf(svc) / chargeablePriceTotal : 1;
        const svcAmountPaid = amountCollected * svcShare;
        const effectivePps =
          sessTotal > 0 && Number(svc.finalAmount) > 0
            ? Number(svc.finalAmount) / sessTotal
            : Number(svc.pricePerSession || 0);
        if (effectivePps <= 0) return sessTotal;
        return svcAmountPaid / effectivePps;
      };
      // sessionsUsed counts every booked session, scheduled ones included.
      const bookedOn = (svc) => svc.sessionsUsed ?? 0;
      // Credits are per service: a group class draws on the package's Group Class
      // line only. Guessing another line is only for old charges that recorded no
      // service at all — never for one whose service just isn't on the package.
      const chargedService = (services) =>
        pkgCharge.serviceCode
          ? services.find((s) => s.serviceCode === pkgCharge.serviceCode)
          : services.find((s) => (s.pricePerSession ?? 0) > 0);

      // Try customerPackageID first
      if (pkgCharge?.customerPackageID?.services) {
        const pkg = pkgCharge.customerPackageID;
        const svc = chargedService(pkg.services);
        if (svc) {
          sessionsRemaining = svc.sessionsRemaining ?? null;
          totalSessions = (svc.sessionsUsed ?? 0) + (svc.sessionsRemaining ?? 0);
          sessionsPaidFor = resolveSessionsPaidFor(svc, pkg.services);
          sessionsBooked = bookedOn(svc);
        }
      }
      // Fall back to enrollmentID
      if (sessionsRemaining === null && enrollmentPkg?.services) {
        const svc = chargedService(enrollmentPkg.services);
        if (svc) {
          sessionsRemaining = svc.sessionsRemaining ?? null;
          totalSessions = (svc.sessionsUsed ?? 0) + (svc.sessionsRemaining ?? 0);
          sessionsPaidFor = resolveSessionsPaidFor(svc, enrollmentPkg.services);
          sessionsBooked = bookedOn(svc);
        }
      }
    }
  }

  // "Already used" per the package's own aggregate (sessionsUsed vs
  // sessionsRemaining). The backend increments sessionsUsed synchronously
  // the moment a session is *booked* against the package (see
  // calendarEvent.controller.js's charge-application step) — not when it's
  // attended — so for a normal package this count is already fully
  // explained by the real bookings sitting in pkgSessionOrder below. It only
  // has "invisible" extra beyond that for a migrated package's baseline
  // usage (imported with no CalendarEvent behind it) or bookings outside
  // this fetch's date range.
  const sessionsBeforeFromHistory = totalSessions != null && sessionsRemaining != null ? totalSessions - sessionsRemaining : 0;

  // Determine this event's chronological session number within its enrollment.
  let pkgSessionNumber = null;
  {
    const pkgCharge2 = charges.find((c) => c.method === "package");
    if (pkgCharge2) {
      // Must match the packageRefId resolution used to build pkgSessionOrder
      // above — customerPackageID (direct-purchase) or enrollmentID
      // (curriculum-enrollment), whichever this charge carries.
      const packageRefId2 = String(
        pkgCharge2.customerPackageID?._id ?? pkgCharge2.customerPackageID ??
        pkgCharge2.enrollmentID?._id ?? pkgCharge2.enrollmentID ?? "",
      );
      const serviceCode2 = pkgCharge2.serviceCode ?? "";
      // The pool belongs to the student this charge is for (keyed that way in
      // buildPackageSessionOrder); older charges without one fall back to all.
      const chargeCustomer2 = pkgCharge2.customerID?._id ?? pkgCharge2.customerID;
      const customerIds2 = chargeCustomer2 ? [String(chargeCustomer2)] : customerIds;
      // Duplicate stamps anywhere in this pool mean none of them can be
      // trusted to order it — see untrustedPools above.
      const poolIsTrusted = !customerIds2.some((cid) =>
        untrustedPools.has(`${cid}::${packageRefId2}::${serviceCode2}`),
      );

      // The backend stamps each package-funded charge with its true position
      // in the credit pool at booking time (baseline sessionsUsed + this
      // occurrence's own share — see computeSessionBaselines in
      // calendarEvent.controller.js). That's authoritative and immune to
      // this fetch's date window, unlike the client-side fallback below —
      // prefer it whenever it's present and its pool is self-consistent.
      if (typeof pkgCharge2.sessionNumber === "number" && poolIsTrusted) {
        pkgSessionNumber = pkgCharge2.sessionNumber;
      } else {
        // Fallback for events booked before the backend started stamping
        // sessionNumber: derive it from chronological order among whatever
        // sibling bookings happen to be loaded in the current fetch. This is
        // only as good as that fetch's date window — a package whose
        // bookings span further than it (e.g. a long recurring series) can
        // make this undercount, since it can't tell "not visible" apart from
        // "didn't happen yet".
        for (const cid of customerIds2) {
          const key = `${cid}::${packageRefId2}::${serviceCode2}`;
          const order = pkgSessionOrder[key];
          if (order) {
            const idx = order.findIndex((e) => e.id === String(appt._id));
            if (idx >= 0) {
              // sessionsBeforeFromHistory in excess of what `order` itself
              // accounts for is the genuinely invisible portion (see comment
              // above) — that's the only part that should stack on top of this
              // event's own position in the list. When `order` already
              // explains all of it (the common case: every booking for this
              // key loaded in this fetch), nothing is added and each sibling
              // gets its own increasing position instead of collapsing onto
              // one shared floor.
              const invisiblePriorUsage = Math.max(0, sessionsBeforeFromHistory - order.length);
              pkgSessionNumber = invisiblePriorUsage + idx + 1;
              break;
            }
          }
        }
      }
    }
  }

  // Credits available for this specific session = sessions paid for minus the
  // sessions that come chronologically before it. pkgSessionNumber above
  // already folds in any invisible prior usage, so it's used as-is when
  // resolved; sessionsBeforeFromHistory is only the fallback for an event
  // whose package charge/order couldn't be matched at all. A session is
  // "paid" once it has at least ~one full credit (≥ 0.9, allowing for
  // rounding). This unifies every billing type: a settled one-time/upfront
  // package pays for all sessions at purchase (full credits), while flexible/
  // payment-plan — and any package left partly collected or refunded — accrue
  // credits from the money actually taken.
  const sessionsBefore =
    pkgSessionNumber != null ? pkgSessionNumber - 1 : sessionsBeforeFromHistory;
  // Credit balance (the profile's column): paid sessions not yet booked. While it is
  // not negative, everything booked — this lesson included — is paid for, whatever
  // its stamped position says. Only once bookings run past the paid credit does a
  // lesson's position decide which of them are the unpaid ones.
  const creditCoversAllBookings =
    sessionsPaidFor != null && sessionsBooked != null && sessionsPaidFor - sessionsBooked >= -0.001;
  const coveredByCredits =
    creditCoversAllBookings || (sessionsPaidFor != null && sessionsPaidFor - sessionsBefore >= 0.999);
  // A package charge whose service is free/non-chargeable has nothing to pay.
  const freePackageService =
    chargeMethod === "package" && sessionsRemaining != null && sessionsPaidFor == null;

  // Check if any customer on this event is covered by an active membership for this service
  const coveredByMembership =
    chargeMethod === "membership" ||
    (chargeMethod === "none" &&
      serviceCode &&
      customerIds.some((cid) => membershipCoverageSet.has(`${cid}::${serviceCode}`)));

  // Coarse "paid" signals that don't look at this session's own credit:
  // an explicit payment on the event, a non-installment package (one-time /
  // pay-per-session — settled at purchase), a fully-paid enrollment, or a
  // non-package charge method that always settles up front.
  const paidByCoarseSignal =
    appt.payment?.collected ||
    (chargeMethod === "package" &&
      appt.packageBillingType !== "flexible" &&
      appt.packageBillingType !== "payment_plan") ||
    pkgFullyPaid ||
    chargeMethod === "credits" ||
    chargeMethod === "direct" ||
    chargeMethod === "mixed" ||
    coveredByMembership;

  // When we could resolve the package's credit data, whether THIS session is
  // covered by a purchased/paid credit is authoritative and vetoes the coarse
  // signals above: a one-time (or fully-paid) package that's been booked past
  // the number of sessions it actually paid for must not read as "Paid" just
  // because of its billing type. An explicit payment recorded on the event
  // still counts (e.g. the extra session was paid for separately).
  const packageCreditDataResolved =
    chargeMethod === "package" &&
    (sessionsPaidFor != null || sessionsRemaining != null);
  const _isActuallyPaid = packageCreditDataResolved
    ? coveredByCredits || freePackageService || Boolean(appt.payment?.collected)
    : paidByCoarseSignal || coveredByCredits || freePackageService;

  return {
    sessionsRemaining,
    totalSessions,
    sessionsPaidFor,
    // Whole paid classes still unbooked on this service — the profile's Credit
    // Balance. null when there is no paid credit to count (free service, no package).
    creditBalance:
      sessionsPaidFor != null && sessionsBooked != null
        ? Math.max(0, Math.floor(sessionsPaidFor - sessionsBooked + 0.001))
        : null,
    pkgSessionNumber,
    coveredByMembership,
    // Lessons brought in by a migration import were taken and settled in the
    // old system — paid, whatever charge data they carry.
    paid: Boolean(appt.importBatchID) || Boolean(_isActuallyPaid),
  };
}

// ─── Customer-level unpaid lessons ────────────────────────────────────────────
// The same Paid/Unpaid rule, rolled up for one student so their profile can warn that
// they are behind. Anything counted here reads "Unpaid" on the calendar and on the
// Lessons tab, because it comes from resolveEventPayment — a second rule would drift.

/** "customerID::serviceCode" for every service an active membership covers. */
export function membershipCoverageFor(customerID, customerMemberships = []) {
  const set = new Set();
  (Array.isArray(customerMemberships) ? customerMemberships : []).forEach((m) => {
    if (m.status !== "active") return;
    (m.services || []).forEach((svc) => {
      if (svc.serviceCode) set.add(`${customerID}::${svc.serviceCode}`);
    });
  });
  return set;
}

/** The context resolveEventPayment needs to judge one student's lessons. */
export function buildPaymentContext(events, membershipCoverageSet, customerID) {
  return { ...buildPackageSessionOrder(events), membershipCoverageSet, customerID: String(customerID ?? "") };
}

/**
 * Whether Paid / Unpaid means anything for this event. Only a private or group lesson is
 * something a student pays for — a to-do, record or trial has no payment status to show,
 * and "no charge record" is legitimate for a non-chargeable service or a comped lesson.
 * The Lessons tab's tag and filter and the profile's unpaid alert all read this, so none of
 * them can label a to-do "Unpaid".
 */
export function isPayableLesson(ev) {
  if (!ev || ev.todoID) return false;
  if (ev.type !== "lesson" && ev.type !== "private") return false; // lesson = group
  if (ev.calendarServiceID?.isChargeable === false) return false;
  if (ev.allocation?.overriddenBy) return false;
  return true;
}

// A lesson only counts as owed once it was, or still will be, delivered or charged.
const OWED_STATUSES = new Set(["scheduled", "completed", "cancelled_charged", "no_show_charged"]);

/**
 * How many of this student's private and group lessons nobody has paid for.
 * Left out on purpose, because "no charge record" is legitimate for them (see
 * isPayableLesson): to-dos, records, trials, non-chargeable services, comped lessons —
 * plus cancellations / no-shows that carry no charge, and temporary slot holds.
 * Lessons imported from an old system already read as paid inside resolveEventPayment.
 *
 * @returns {{ total: number, group: number, private: number }}
 */
export function summarizeUnpaidLessons(events = [], { membershipCoverageSet = new Set(), customerID = null } = {}) {
  const ctx = buildPaymentContext(events, membershipCoverageSet, customerID);
  const out = { total: 0, group: 0, private: 0 };
  for (const ev of events) {
    if (!isPayableLesson(ev)) continue;
    if (!OWED_STATUSES.has(deriveEffectiveStatus(ev))) continue;
    if (resolveEventPayment(ev, ctx).paid) continue;
    out.total += 1;
    if (ev.type === "lesson") out.group += 1;
    else out.private += 1;
  }
  return out;
}

/** "3 unpaid group classes · 2 unpaid private lessons", or null when nothing is owed. */
export function describeUnpaidLessons({ group = 0, private: priv = 0 } = {}) {
  const plural = (n, one, many) => `${n} unpaid ${n === 1 ? one : many}`;
  const parts = [];
  if (group) parts.push(plural(group, "group class", "group classes"));
  if (priv) parts.push(plural(priv, "private lesson", "private lessons"));
  return parts.length ? parts.join(" · ") : null;
}
