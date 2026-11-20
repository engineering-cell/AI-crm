"use client";

import { AlertTriangle } from "lucide-react";

/** Warning card for the 409 needsConflictConfirm answer. */
export default function ConflictPrompt({ prompt, onMove, onBookAnyway, onDismiss, busy = false }) {
  const { tz, conflicts, totalOccurrences } = prompt;
  const fmt = (iso, opts) =>
    new Date(iso).toLocaleString("en-US", { timeZone: tz || undefined, ...opts });
  const dayLabel = (iso) =>
    fmt(iso, { weekday: "short", month: "short", day: "numeric" });
  const timeLabel = (iso) => fmt(iso, { hour: "numeric", minute: "2-digit" });
  // Moving only makes sense for a single date; a repeating series would need
  // each date rebooked, so there staff go back and change the time or confirm.
  const canMove = Boolean(onMove) && totalOccurrences === 1 && conflicts.length === 1;
  const MAX_SHOWN = 6;

  return (
    <div className="shrink-0 mx-5 mb-2 max-h-[40vh] overflow-y-auto rounded-lg bg-warning/10 border border-warning/30 px-3 py-2.5">
      <div className="flex items-start gap-2">
        <AlertTriangle className="h-3.5 w-3.5 text-warning shrink-0 mt-0.5" />
        <div className="text-[12px] text-warning leading-relaxed">
          <p className="font-semibold">
            {conflicts.length === 1
              ? "This teacher is already booked at this time."
              : `This teacher is already booked on ${conflicts.length} of the ${totalOccurrences} dates.`}
          </p>
          <ul className="mt-1.5 space-y-2">
            {conflicts.slice(0, MAX_SHOWN).map((c, i) => (
              <li key={`${c.startDateTime}-${i}`}>
                <span className="font-medium">
                  {dayLabel(c.startDateTime)}, {timeLabel(c.startDateTime)}–{timeLabel(c.endDateTime)}
                </span>
                <span className="text-warning/80">
                  {" "}
                  — {c.conflictsWith.map((w) => w.title || "Another booking").join(", ")}
                </span>
                {c.suggestions?.length > 0 && (
                  <div className="mt-1 flex flex-wrap items-center gap-1.5">
                    <span className="text-[11px] text-warning/80">Open:</span>
                    {c.suggestions.map((s) =>
                      canMove ? (
                        <button
                          key={s.startDateTime}
                          type="button"
                          onClick={() => onMove(s)}
                          className="h-6 px-2 rounded-md border border-warning/40 bg-background text-[11px] font-semibold text-foreground hover:bg-muted/40 transition-colors"
                        >
                          {timeLabel(s.startDateTime)}
                        </button>
                      ) : (
                        <span
                          key={s.startDateTime}
                          className="h-6 px-2 inline-flex items-center rounded-md border border-warning/30 bg-background/60 text-[11px] text-foreground"
                        >
                          {timeLabel(s.startDateTime)}
                        </span>
                      ),
                    )}
                  </div>
                )}
              </li>
            ))}
          </ul>
          {conflicts.length > MAX_SHOWN && (
            <p className="mt-1.5 text-[11px] text-warning/80">
              and {conflicts.length - MAX_SHOWN} more date{conflicts.length - MAX_SHOWN === 1 ? "" : "s"}
            </p>
          )}
        </div>
      </div>
      <div className="mt-2.5 flex items-center gap-2">
        <button
          type="button"
          onClick={onDismiss}
          disabled={busy}
          className="h-8 px-3 rounded-lg bg-warning text-[11px] font-semibold text-warning-foreground hover:opacity-90 transition-opacity"
        >
          Choose another time
        </button>
        <button
          type="button"
          onClick={onBookAnyway}
          disabled={busy}
          className="h-8 px-3 rounded-lg border border-border bg-background text-[11px] font-semibold text-foreground hover:bg-muted/40 transition-colors"
        >
          {conflicts.length === 1 ? "Book anyway" : "Book all anyway"}
        </button>
      </div>
    </div>
  );
}
