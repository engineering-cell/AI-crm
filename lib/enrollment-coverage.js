// How much of a student's private-lesson bookings the money collected so far actually
// covers, and which lessons are left unpaid. Pure functions so the Services table on the
// enrollment page and its tests share one rule.
//
// Rule (agreed with the studio): collected money is applied to lessons in order —
// completed lessons first, then scheduled lessons, each oldest first. A lesson is Paid when
// its full price is covered, Partially paid when only some of it is, Unpaid when none is.
// Whatever money is left after every booked lesson is the paid credit still available.

const EPS = 0.005;

/** Lesson statuses that count as delivered / charged (the "Completed" column). */
export const COMPLETED_BUCKET = new Set(["completed", "no_show_charged", "cancelled_charged"]);
/** Lesson statuses that are booked but not yet delivered (the "Scheduled" column). */
export const SCHEDULED_BUCKET = new Set(["scheduled"]);

const cents = (n) => Math.round(Number(n || 0) * 100) / 100;

export function bucketForStatus(status) {
  if (COMPLETED_BUCKET.has(status)) return "completed";
  if (SCHEDULED_BUCKET.has(status)) return "scheduled";
  return null; // cancelled with no charge, held, no-show without charge… nothing owed
}

function stateFor(covered, price) {
  if (covered >= price - EPS) return "paid";
  if (covered <= EPS) return "unpaid";
  return "partial";
}

/**
 * @param {object}   args
 * @param {number}   args.price          price of one lesson (net of discount)
 * @param {number}   args.funds          money collected that belongs to this service
 * @param {boolean}  [args.fullyPaid]    the whole package is paid — every lesson is covered
 * @param {Array}    args.lessons        [{ id, startDateTime, status }]
 * @param {number}   [args.untracked]    imported completed sessions with no dated lesson; they
 *                                       were settled in the old system but still use up credit
 * @returns {{
 *   rows: Array<{ id, startDateTime, status, bucket, covered, unpaid, state }>,
 *   completed: { unpaid: number, partial: number, gap: number },
 *   scheduled: { unpaid: number, partial: number, gap: number },
 *   leftover: number,
 * }}
 */
export function allocateLessonCoverage({ price, funds, fullyPaid = false, lessons = [], untracked = 0 }) {
  const unit = Number(price) || 0;
  const rows = [];
  const empty = () => ({ unpaid: 0, partial: 0, gap: 0 });
  const completed = empty();
  const scheduled = empty();

  const dated = lessons
    .map((l) => ({ ...l, bucket: bucketForStatus(l.status) }))
    .filter((l) => l.bucket)
    .sort((a, b) => new Date(a.startDateTime) - new Date(b.startDateTime));
  const ordered = [
    ...dated.filter((l) => l.bucket === "completed"),
    ...dated.filter((l) => l.bucket === "scheduled"),
  ];

  let left = fullyPaid ? Infinity : Math.max(0, Number(funds) || 0);
  if (!fullyPaid && unit > 0) left = Math.max(0, left - Math.max(0, untracked) * unit);

  for (const lesson of ordered) {
    const covered = unit <= 0 || fullyPaid ? unit : cents(Math.min(unit, Math.max(0, left)));
    if (!fullyPaid) left = Math.max(0, left - covered);
    const unpaid = cents(unit - covered);
    const state = stateFor(covered, unit);
    const bucket = lesson.bucket === "completed" ? completed : scheduled;
    if (state === "unpaid") bucket.unpaid += 1;
    if (state === "partial") bucket.partial += 1;
    bucket.gap = cents(bucket.gap + unpaid);
    rows.push({ ...lesson, covered, unpaid, state });
  }

  return { rows, completed, scheduled, leftover: fullyPaid ? 0 : cents(left) };
}

/** "0.28" style lesson count: at most two decimals, no trailing zeros. */
export function formatLessonCount(n) {
  const v = Number(n) || 0;
  return v.toFixed(2).replace(/\.00$/, "").replace(/(\.\d)0$/, "$1");
}
