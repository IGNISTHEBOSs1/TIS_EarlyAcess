const TRAJECTORY_BARS = [18, 22, 20, 26, 24, 30, 34, 38, 44, 50, 58, 66, 74, 82, 90];

interface Task {
  label: string;
  status: string;
  done?: boolean;
}

const TASKS: Task[] = [
  { label: "Write for 25 minutes", status: "Done", done: true },
  { label: "Walk without your phone", status: "In progress" },
  { label: "Close the day at 22:30", status: "Queued" },
];

interface DashboardMockupProps {
  className?: string;
}

/**
 * The recurring in-app screenshot mockup — sidebar nav, today's tasks,
 * 30-day trajectory chart, cognitive load meter. Appears twice in the
 * real page (once in the Hero, once as the anchor visual in Three
 * Moments), so it's a standalone component rather than duplicated JSX.
 * Purely decorative/illustrative — aria-hidden, since the surrounding
 * section copy carries the actual meaning for screen readers.
 */
export function DashboardMockup({ className = "" }: DashboardMockupProps) {
  return (
    <div
      aria-hidden="true"
      className={`rounded-[var(--radius-lg)] border border-[var(--color-border-default)] bg-[var(--color-bg-surface)] ${className}`}
    >
      <div className="flex items-center gap-2 border-b border-[var(--color-border-default)] px-6 py-4 font-[var(--font-mono)] text-xs text-[var(--color-neutral-500)]">
        <span className="h-2 w-2 rounded-full bg-[var(--color-neutral-300)]" />
        <span className="h-2 w-2 rounded-full bg-[var(--color-neutral-300)]" />
        <span className="h-2 w-2 rounded-full bg-[var(--color-neutral-300)]" />
        <span className="ml-2">the-system / today</span>
      </div>

      <div className="flex flex-col sm:flex-row">
        <div className="flex shrink-0 flex-col gap-1 border-b border-[var(--color-border-default)] p-4 sm:w-40 sm:border-b-0 sm:border-r sm:p-6">
          <span className="rounded-[var(--radius-md)] bg-[var(--color-primary-100)] px-3 py-2 text-sm font-medium text-[var(--color-primary-700)]">
            Today
          </span>
          <span className="px-3 py-2 text-sm text-[var(--color-text-secondary)]">Trajectory</span>
          <span className="px-3 py-2 text-sm text-[var(--color-text-secondary)]">Reflections</span>
          <span className="px-3 py-2 text-sm text-[var(--color-text-secondary)]">Signals</span>

          <div className="mt-6 px-3">
            <p className="font-[var(--font-mono)] text-[11px] uppercase tracking-wide text-[var(--color-neutral-500)]">
              Cognitive load
            </p>
            <div className="mt-2 h-1.5 w-full rounded-full bg-[var(--color-bg-surface)]">
              <div className="h-full w-1/4 rounded-full bg-[var(--color-primary-600)]" />
            </div>
            <p className="mt-1.5 font-[var(--font-mono)] text-[11px] text-[var(--color-neutral-500)]">
              Low · protected focus
            </p>
          </div>
        </div>

        <div className="flex-1 p-4 sm:p-6">
          <div className="flex items-baseline justify-between">
            <div>
              <p className="font-[var(--font-mono)] text-xs text-[var(--color-neutral-500)] border-t border-[var(--color-border-default)] pt-1.5 inline-block">
                Direction
              </p>
              <h4 className="mt-1 text-lg font-semibold text-[var(--color-text-primary)]">
                Become someone who finishes.
              </h4>
            </div>
            <span className="font-[var(--font-mono)] text-xs text-[var(--color-neutral-500)]">Day 41</span>
          </div>

          <div className="mt-4 space-y-2">
            {TASKS.map((task) => (
              <div
                key={task.label}
                className="flex items-center justify-between rounded-[var(--radius-md)] border border-[var(--color-border-default)] bg-[var(--color-bg-page)] px-4 py-3 text-sm"
              >
                <span className="flex items-center gap-3">
                  <span
                    className={`h-4 w-4 shrink-0 rounded-[var(--radius-sm)] border ${
                      task.done
                        ? "border-[var(--color-primary-600)] bg-[var(--color-primary-600)]"
                        : "border-[var(--color-border-default)]"
                    }`}
                  />
                  <span className={task.done ? "text-[var(--color-neutral-500)] line-through" : "text-[var(--color-text-primary)]"}>
                    {task.label}
                  </span>
                </span>
                <span className="font-[var(--font-mono)] text-xs text-[var(--color-neutral-500)]">{task.status}</span>
              </div>
            ))}
          </div>

          <div className="mt-5">
            <div className="flex items-center justify-between font-[var(--font-mono)] text-xs text-[var(--color-neutral-500)]">
              <span className="border-t border-[var(--color-border-default)] pt-1.5">Trajectory · 30 days</span>
              <span>+ compounding</span>
            </div>
            <div className="mt-3 flex items-end gap-1.5" style={{ height: 70 }}>
              {TRAJECTORY_BARS.map((h, i) => (
                <div
                  key={i}
                  className="flex-1 rounded-[var(--radius-sm)] bg-gradient-to-t from-[var(--color-primary-100)] to-[var(--color-primary-600)]"
                  style={{ height: `${h}%` }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
