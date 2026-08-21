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
      className={`rounded-2xl border border-white/10 bg-white/[0.03] ${className}`}
    >
      <div className="flex items-center gap-2 border-b border-white/10 px-6 py-4 font-mono text-xs text-white/40">
        <span className="h-2 w-2 rounded-full bg-white/20" />
        <span className="h-2 w-2 rounded-full bg-white/20" />
        <span className="h-2 w-2 rounded-full bg-white/20" />
        <span className="ml-2">the-system / today</span>
      </div>

      <div className="flex flex-col sm:flex-row">
        <div className="flex shrink-0 flex-col gap-1 border-b border-white/10 p-4 sm:w-40 sm:border-b-0 sm:border-r sm:p-6">
          <span className="rounded-lg bg-white/10 px-3 py-2 text-sm font-medium text-white">
            Today
          </span>
          <span className="px-3 py-2 text-sm text-white/50">Trajectory</span>
          <span className="px-3 py-2 text-sm text-white/50">Reflections</span>
          <span className="px-3 py-2 text-sm text-white/50">Signals</span>

          <div className="mt-6 px-3">
            <p className="font-mono text-[11px] uppercase tracking-wide text-white/40">
              Cognitive load
            </p>
            <div className="mt-2 h-1.5 w-full rounded-full bg-white/10">
              <div className="h-full w-1/4 rounded-full bg-white/60" />
            </div>
            <p className="mt-1.5 font-mono text-[11px] text-white/30">
              Low · protected focus
            </p>
          </div>
        </div>

        <div className="flex-1 p-4 sm:p-6">
          <div className="flex items-baseline justify-between">
            <div>
              <p className="font-mono text-xs text-white/40 border-t border-white/15 pt-1.5 inline-block">
                Direction
              </p>
              <h4 className="mt-1 text-lg font-semibold text-white">
                Become someone who finishes.
              </h4>
            </div>
            <span className="font-mono text-xs text-white/40">Day 41</span>
          </div>

          <div className="mt-4 space-y-2">
            {TASKS.map((task) => (
              <div
                key={task.label}
                className="flex items-center justify-between rounded-lg border border-white/5 bg-white/5 px-4 py-3 text-sm"
              >
                <span className="flex items-center gap-3">
                  <span
                    className={`h-4 w-4 shrink-0 rounded border ${
                      task.done ? "border-white/40 bg-white" : "border-white/30"
                    }`}
                  />
                  <span className={task.done ? "text-white/40 line-through" : "text-white/85"}>
                    {task.label}
                  </span>
                </span>
                <span className="font-mono text-xs text-white/40">{task.status}</span>
              </div>
            ))}
          </div>

          <div className="mt-5">
            <div className="flex items-center justify-between font-mono text-xs text-white/40">
              <span className="border-t border-white/15 pt-1.5">Trajectory · 30 days</span>
              <span>+ compounding</span>
            </div>
            <div className="mt-3 flex items-end gap-1.5" style={{ height: 70 }}>
              {TRAJECTORY_BARS.map((h, i) => (
                <div
                  key={i}
                  className="flex-1 rounded-sm bg-gradient-to-t from-white/20 to-white/50"
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
