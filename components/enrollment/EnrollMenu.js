import { useEffect, useMemo, useRef, useState } from "react";
import { CalendarDays, ChevronDown, ChevronRight, Layers, Plus, Repeat, Sparkles, Ticket } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { hasPermission } from "@/lib/permissions";

export const ENROLL_OPTIONS = [
  {
    mode: "service",
    label: "Services",
    description: "Individual classes and sessions",
    icon: CalendarDays,
  },
  {
    mode: "package",
    label: "Packages",
    description: "Bundled lesson programs",
    icon: Layers,
  },
  {
    mode: "membership",
    label: "Memberships",
    description: "Recurring studio access",
    icon: Repeat,
  },
  {
    mode: "trial",
    label: "Intro or group",
    description: "Sell an intro lesson or one group class",
    icon: Sparkles,
  },
];

export function EnrollMenuItem({ icon: Icon, label, description, onClick }) {
  return (
    <button
      type="button"
      role="menuitem"
      onClick={onClick}
      className="group flex w-full items-start gap-3 rounded-xl px-2 py-2 text-left transition-colors hover:bg-[var(--studio-primary-light)]"
    >
      <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[var(--studio-primary-light)] text-[var(--studio-primary)] ring-1 ring-[var(--studio-primary)]/12 transition-colors group-hover:bg-[var(--studio-primary)] group-hover:text-white group-hover:ring-transparent">
        <Icon className="h-4 w-4" strokeWidth={1.75} />
      </span>
      <span className="min-w-0 flex-1 pt-0.5">
        <span className="flex items-center justify-between gap-2">
          <span className="text-[13px] font-semibold text-foreground transition-colors group-hover:text-[var(--studio-primary)]">
            {label}
          </span>
          <ChevronRight className="h-3.5 w-3.5 shrink-0 text-muted-foreground/40 opacity-0 -translate-x-1 transition-all group-hover:translate-x-0 group-hover:opacity-100 group-hover:text-[var(--studio-primary)]" />
        </span>
        <span className="mt-0.5 block text-[11px] leading-snug text-muted-foreground">
          {description}
        </span>
      </span>
    </button>
  );
}

export default function EnrollMenu({
  /** Trigger label — "Enroll" in the header, "New" on a student's page. */
  label = "Enroll",
  /** Extra classes for the trigger, so each caller keeps its own button shape. */
  triggerClassName,
  /** Which edge of the trigger the menu hangs from — "right" (default, for a
   * trigger near the right edge of its container, e.g. the header) or "left"
   * (for a trigger near the left edge, e.g. a narrow side panel), so the
   * menu opens toward whichever side actually has room. */
  align = "right",
  onSelectMode,
  onSelectEvent,
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  // Intro or group hits payment-request APIs which require
  // settings/Billings/write — hide that choice when the role can't sell.
  const visibleOptions = useMemo(
    () =>
      ENROLL_OPTIONS.filter(
        (o) => o.mode !== "trial" || hasPermission("settings", "Billings", "write"),
      ),
    [],
  );

  useEffect(() => {
    if (!open) return;
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) setOpen(false);
    }
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [open]);

  return (
    <div
      className="relative inline-block"
      ref={ref}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <Button
        type="button"
        className={cn(
          "h-[38px] rounded-full px-4 text-[13px] font-semibold bg-brand text-brand-foreground hover:bg-brand-dark",
          triggerClassName,
        )}
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label={label}
      >
        <Plus className="h-4 w-4" />
        {label}
        <ChevronDown
          className={cn(
            "h-3.5 w-3.5 opacity-80 transition-transform duration-200",
            open && "rotate-180",
          )}
        />
      </Button>

      {open && (
        <div
          className={cn(
            "absolute top-full pt-2 w-[300px] z-50 animate-scale-in",
            align === "left"
              ? "left-0 origin-top-left"
              : "right-0 origin-top-right",
          )}
          role="menu"
          aria-label="Enrollment options"
        >
          <div
            className="overflow-hidden rounded-2xl border border-border bg-popover text-popover-foreground"
            style={{
              boxShadow:
                "var(--bar-glow), 0 18px 40px -18px hsl(var(--foreground) / 0.16)",
            }}
          >
            <div className="px-3.5 pt-3 pb-2">
              <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[var(--studio-primary)]">
                New enrollment
              </p>
              <p className="mt-0.5 text-[12px] text-muted-foreground">
                Select an offering type
              </p>
            </div>

            <div className="px-1.5 pb-1.5">
              {visibleOptions.map((o) => (
                <EnrollMenuItem
                  key={o.mode}
                  icon={o.icon}
                  label={o.label}
                  description={o.description}
                  onClick={() => {
                    setOpen(false);
                    onSelectMode?.(o.mode);
                  }}
                />
              ))}
            </div>

            <div
              className="mx-4 my-0.5 h-px"
              style={{
                background:
                  "linear-gradient(90deg, transparent, color-mix(in srgb, var(--studio-primary) 40%, transparent), transparent)",
              }}
              aria-hidden
            />

            <div className="px-1.5 py-1.5 pb-2">
              <p className="px-2 pb-1 pt-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                Events
              </p>
              <EnrollMenuItem
                icon={Ticket}
                label="Events & Products"
                description="Tickets, recitals, and one-time items"
                onClick={() => {
                  setOpen(false);
                  onSelectEvent?.();
                }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
