"use client";

import { ChevronDown, Info } from "lucide-react";
import { formatStudioDate, formatStudioTime } from "@/lib/studioLocalDate";
import { roundSessions } from "@/lib/utils";
import {
  allocateLessonCoverage,
  bucketForStatus,
  formatLessonCount,
} from "@/lib/enrollment-coverage";

const money = (n) =>
  Number(n || 0).toLocaleString("en-US", { style: "currency", currency: "USD" });

// Service takes the slack; the number columns have room for a count plus its alert beside it.
const GRID = "minmax(180px,2fr) minmax(0,1fr) minmax(0,1.3fr) minmax(0,1.6fr) minmax(0,1.1fr) minmax(0,1.4fr)";

const BADGE = {
  paid: "bg-success/10 text-success",
  unpaid: "bg-destructive/10 text-destructive",
  partial: "bg-warning/10 text-warning",
};
const STATE_LABEL = { paid: "Paid", unpaid: "Unpaid", partial: "Partially paid" };

function Badge({ tone, children }) {
  return (
    <span
      className={`inline-flex items-center rounded-md px-1.5 py-0.5 text-[10px] font-semibold leading-tight whitespace-nowrap ${BADGE[tone]}`}
    >
      {children}
    </span>
  );
}

/** "1 unpaid" / "2 partially paid" alerts shown under a Completed / Scheduled count. */
function AlertBadges({ summary }) {
  if (!summary || (!summary.unpaid && !summary.partial)) return null;
  return (
    <div className="flex flex-wrap items-center gap-1">
      {summary.unpaid > 0 && <Badge tone="unpaid">{summary.unpaid} unpaid</Badge>}
      {summary.partial > 0 && <Badge tone="partial">{summary.partial} partially paid</Badge>}
    </div>
  );
}

/**
 * Services section of an enrollment: per service Enrolled / Completed / Scheduled /
 * Not scheduled / Paid credit, with an alert wherever completed or scheduled lessons are
 * not paid for, the dollars needed to cover them, and (expanded) every lesson with its
 * payment status. Coverage comes from lib/enrollment-coverage.js.
 */
export default function EnrollmentServicesTable({
  enr,
  cp,
  services,
  calendarEvents,
  customerID,
  expandedServices,
  onToggle,
}) {
  const isDeferred =
    cp.billingType === "flexible" ||
    cp.billingType === "payment_plan" ||
    cp.billingType === "pay_per_session";
  const isFreeService = (sv) => sv.isChargeable === false || Number(sv.finalAmount || 0) <= 0;
  const svcNetPrice = (sv) => {
    if (isFreeService(sv)) return 0;
    const listPrice = (sv.sessionsTotal ?? 0) * Number(sv.pricePerSession || 0);
    return Number(sv.finalAmount) > 0 ? Number(sv.finalAmount) : listPrice;
  };
  const chargeableTotal = services.reduce((s, sv) => s + svcNetPrice(sv), 0);
  const collected = Number(cp.amountCollected ?? 0);
  const contracted = Number(cp.totalPaid ?? cp.contractedValue ?? 0);

  const rows = services.map((svc, i) => {
    const isFree = isFreeService(svc);
    const sessTotal = svc.sessionsTotal ?? 0;
    const sessSched = svc.sessionsScheduled ?? 0;
    // sessionsUsed already counts still-scheduled sessions, so take them out before
    // flooring against an imported "Sessions Taken" count.
    const sessUsed = Math.max(svc.sessionsCompleted ?? 0, (svc.sessionsUsed ?? 0) - sessSched);
    const sessRemaining = roundSessions(Math.max(0, sessTotal - sessUsed - sessSched));
    const pps = isFree ? 0 : Number(svc.pricePerSession) || 0;
    const price =
      isFree ? 0 : sessTotal > 0 && svc.finalAmount > 0 ? Number(svc.finalAmount) / sessTotal : pps;

    // This enrollment's lessons for this service, newest first.
    const events = (calendarEvents || [])
      .filter((e) => {
        const cs = e.calendarServiceID;
        if (!cs) return false;
        const sameService = svc.serviceCode
          ? cs.serviceCode === svc.serviceCode
          : cs.serviceName === svc.serviceName;
        if (!sameService) return false;
        const charge = (e.charges || []).find(
          (c) => String(c.customerID) === String(customerID) && c.method === "package",
        );
        if (!charge) return false;
        return String(charge.enrollmentID?._id ?? charge.enrollmentID) === String(enr._id);
      })
      .sort((a, b) => new Date(b.startDateTime) - new Date(a.startDateTime));

    const datedCompleted = events.filter((e) => bucketForStatus(e.status) === "completed").length;
    // A migration's "Sessions Taken" has no dated lesson behind it.
    const untracked = Math.max(0, sessUsed - datedCompleted);

    const fullyPaid =
      !isFree &&
      ((contracted > 0 && collected >= contracted) || (!isDeferred && contracted <= 0));
    const share = chargeableTotal > 0 ? svcNetPrice(svc) / chargeableTotal : 1;
    const funds = collected * share;

    const coverage = isFree || price <= 0
      ? null
      : allocateLessonCoverage({
          price,
          funds,
          fullyPaid,
          untracked,
          lessons: events.map((e) => ({ id: e._id, startDateTime: e.startDateTime, status: e.status })),
        });

    // Signed balance: money left after every completed and scheduled lesson. It goes NEGATIVE
    // when lessons are booked beyond what has been paid for (-4 = four lessons still to pay
    // for, -$580 = what covers them), so staff can see it without doing the math.
    const signedDollars = coverage
      ? coverage.leftover - coverage.completed.gap - coverage.scheduled.gap
      : 0;
    const creditLessons = isFree
      ? 0
      : price <= 0
        ? sessRemaining
        : fullyPaid
          ? sessRemaining
          : signedDollars / price;
    const creditDollars = isFree ? 0 : fullyPaid ? sessRemaining * price : signedDollars;

    return {
      svc, i, isFree, sessTotal, sessUsed, sessSched, sessRemaining, price,
      events, untracked, coverage, creditLessons, creditDollars,
    };
  });

  const scheduledGap = rows.reduce((s, r) => s + (r.coverage?.scheduled.gap ?? 0), 0);
  const completedGap = rows.reduce((s, r) => s + (r.coverage?.completed.gap ?? 0), 0);
  const unpaidScheduled = rows.reduce((s, r) => s + (r.coverage?.scheduled.unpaid ?? 0), 0);
  const partialScheduled = rows.reduce((s, r) => s + (r.coverage?.scheduled.partial ?? 0), 0);
  const hasScheduledPaidLessons = rows.some((r) => r.coverage && r.sessSched > 0);

  return (
    <div className="mt-5 border-t border-border pt-5">
      <p className="text-[12px] font-bold text-foreground uppercase tracking-widest mb-3">
        Services
      </p>
      <div className="rounded-lg border border-border overflow-hidden">
        <div
          className="grid sticky top-0 z-10 bg-muted/50 border-b-2 border-border px-3 py-2.5 gap-2"
          style={{ gridTemplateColumns: GRID }}
        >
          <span className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">Service</span>
          {["Enrolled", "Completed", "Scheduled", "Not scheduled"].map((h) => (
            <span key={h} className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider text-left leading-tight">
              {h}
            </span>
          ))}
          <span className="flex items-center justify-start gap-1 text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">
            Paid credit
            <span title="Paid lesson credit left after completed and scheduled lessons. A negative number means lessons are booked beyond what has been paid for." className="cursor-help normal-case">
              <Info className="h-3 w-3" aria-label="About paid credit" />
            </span>
          </span>
        </div>

        {rows.map((r) => {
          const expandKey = `${enr._id}-${r.i}`;
          const isExpanded = expandedServices.has(expandKey);
          return (
            <div key={r.i} className={r.i > 0 ? "border-t border-border" : ""}>
              <div
                className="grid items-start gap-2 px-3 py-3 cursor-pointer hover:bg-muted/20 transition-colors"
                style={{ gridTemplateColumns: GRID }}
                onClick={() => onToggle(expandKey)}
              >
                <div className="flex items-center gap-2 min-w-0 min-h-5">
                  <ChevronDown
                    className={`h-3 w-3 text-muted-foreground shrink-0 transition-transform ${isExpanded ? "rotate-180" : ""}`}
                  />
                  {r.svc.color && (
                    <span
                      className="h-2.5 w-2.5 rounded-full shrink-0 border border-black/10"
                      style={{ backgroundColor: r.svc.color }}
                    />
                  )}
                  <span className="text-[13px] leading-5 font-medium text-foreground">{r.svc.serviceName}</span>
                  {r.isFree && (
                    <span className="shrink-0 inline-flex items-center rounded-full bg-success/10 px-2 py-0.5 text-[10px] font-semibold text-success">
                      {r.svc.isChargeable === false ? "Non-chargeable" : "Free"}
                    </span>
                  )}
                </div>
                <span className="text-[13px] leading-5 font-semibold text-foreground">
                  {roundSessions(r.sessTotal)}
                </span>
                <div className="flex flex-wrap items-center gap-x-2 gap-y-1 min-h-5">
                  <span className={`text-[13px] leading-5 font-semibold ${r.sessUsed > 0 ? "text-info" : "text-muted-foreground"}`}>
                    {roundSessions(r.sessUsed)}
                  </span>
                  <AlertBadges summary={r.coverage?.completed} />
                </div>
                <div className="flex flex-wrap items-center gap-x-2 gap-y-1 min-h-5">
                  <span className={`text-[13px] leading-5 font-semibold ${r.sessSched > 0 ? "text-violet-600" : "text-muted-foreground"}`}>
                    {roundSessions(r.sessSched)}
                  </span>
                  <AlertBadges summary={r.coverage?.scheduled} />
                </div>
                <span className={`text-[13px] leading-5 font-semibold text-left ${r.sessRemaining > 0 ? "text-foreground" : "text-muted-foreground"}`}>
                  {roundSessions(r.sessRemaining)}
                </span>
                <div className="text-left">
                  {r.isFree ? (
                    <span className="text-[13px] leading-5 font-semibold text-muted-foreground">—</span>
                  ) : (
                    <>
                      <span className={`block text-[13px] leading-5 font-semibold ${r.creditLessons > 0.005 ? "text-success" : r.creditLessons < -0.005 ? "text-destructive" : "text-muted-foreground"}`}>
                        {formatLessonCount(r.creditLessons)} {Number(formatLessonCount(r.creditLessons)) === 1 ? "lesson" : "lessons"}
                      </span>
                      <div className={`text-[11px] ${r.creditDollars < -0.005 ? "text-destructive" : "text-muted-foreground"}`}>
                        {r.creditDollars < -0.005 ? `${money(-r.creditDollars)} short` : `${money(r.creditDollars)} available`}
                      </div>
                    </>
                  )}
                </div>
              </div>

              {isExpanded && (
                <div className="border-t border-border/50 bg-muted/10 px-4 py-4 pl-10">
                  <LessonHistory row={r} />
                </div>
              )}
            </div>
          );
        })}
      </div>

      {(scheduledGap > 0 || completedGap > 0 || hasScheduledPaidLessons) && (
        <div
          className={`mt-3 rounded-lg px-4 py-3 text-[12px] ${
            scheduledGap > 0 || completedGap > 0 ? "bg-warning/10 text-foreground" : "bg-success/10 text-foreground"
          }`}
        >
          {scheduledGap > 0 ? (
            <p className="font-semibold">
              {money(scheduledGap)} needed to fully cover scheduled lessons · {unpaidScheduled} unpaid
              {partialScheduled > 0 ? ` + ${partialScheduled} partially paid` : ""}
            </p>
          ) : (
            <p className="font-semibold">All scheduled lessons are paid</p>
          )}
          {completedGap > 0 && (
            <p className="mt-0.5 text-destructive">{money(completedGap)} unpaid for completed lessons</p>
          )}
          <p className="mt-0.5 text-muted-foreground">Unpaid scheduling remains available</p>
        </div>
      )}
    </div>
  );
}

function LessonHistory({ row }) {
  const { svc, events, coverage, untracked, isFree } = row;
  if (events.length === 0 && untracked === 0) {
    return <p className="text-[12px] text-muted-foreground px-1 py-2">No lessons scheduled yet for this service.</p>;
  }
  const byId = new Map((coverage?.rows ?? []).map((c) => [String(c.id), c]));
  const cols = "grid-cols-[1.3fr_1fr_1fr_1fr]";
  return (
    <div>
      <p className="mb-2 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
        {svc.serviceName} history · newest first
      </p>
      <div className="rounded-lg border border-border overflow-hidden">
        <div className={`grid ${cols} gap-2 bg-muted/50 border-b border-border px-3 py-2`}>
          {["Date & time", "Lesson status", "Payment status", "Unpaid amount"].map((h) => (
            <span key={h} className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">
              {h}
            </span>
          ))}
        </div>
        {events.map((ev, idx) => {
          const cov = byId.get(String(ev._id));
          const status = (ev.status || "scheduled").replace(/_/g, " ");
          return (
            <div key={ev._id} className={`grid ${cols} gap-2 items-center px-3 py-2 ${idx > 0 ? "border-t border-border/50" : ""}`}>
              <span className="text-[12px] text-foreground">
                {formatStudioDate(ev.startDateTime, null, { year: "numeric" })} · {formatStudioTime(ev.startDateTime)}
              </span>
              <span className="text-[12px] text-foreground capitalize">{status}</span>
              <span>
                {isFree ? (
                  <Badge tone="paid">Free</Badge>
                ) : cov ? (
                  <Badge tone={cov.state}>{STATE_LABEL[cov.state]}</Badge>
                ) : (
                  <span className="text-[12px] text-muted-foreground">—</span>
                )}
              </span>
              <span className="text-[12px] text-foreground">{cov ? money(cov.unpaid) : "—"}</span>
            </div>
          );
        })}
        {untracked > 0 && (
          <div className={`grid ${cols} gap-2 items-center px-3 py-2 ${events.length > 0 ? "border-t border-border/50" : ""}`}>
            <span className="text-[12px] text-foreground">
              {untracked} imported session{untracked === 1 ? "" : "s"} (no lesson date on record)
            </span>
            <span className="text-[12px] text-foreground">Completed</span>
            <span><Badge tone="paid">Paid</Badge></span>
            <span className="text-[12px] text-foreground">{money(0)}</span>
          </div>
        )}
      </div>
    </div>
  );
}
