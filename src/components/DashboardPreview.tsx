const TRAJECTORY_BARS = [22, 28, 24, 32, 30, 38, 42, 46, 50, 58, 64, 70, 78, 86, 94];

interface DashboardPreviewProps {
  className?: string;
}

/**
 * Static, decorative recreation of the in-app screenshot shown in the
 * recording (task list, cognitive-load meter, 30-day trajectory bars).
 * Purely presentational — marked aria-hidden so screen readers aren't
 * given a meaningless mock UI to narrate; the surrounding section
 * copy carries the actual meaning.
 */
export function DashboardPreview({ className = "" }: DashboardPreviewProps) {
  return (
    <div
      aria-hidden="true"
      className={`rounded-2xl border border-white/10 bg-white/[0.03] p-6 ${className}`}
    >
      <div className="flex items-center gap-2 border-b border-white/10 pb-4 font-mono text-xs text-white/40">
        <span className="h-2 w-2 rounded-full bg-white/20" />
        <span className="h-2 w-2 rounded-full bg-white/20" />
        <span className="h-2 w-2 rounded-full bg-white/20" />
        <span className="ml-2">the-system / today</span>
      </div>

      <div className="mt-4 flex items-center justify-between rounded-lg bg-white/5 px-4 py-3 text-sm">
        <label className="flex items-center gap-3 text-white/80">
          <input type="checkbox" checked readOnly tabIndex={-1} />
          Close the day at 22:30
        </label>
        <span className="font-mono text-xs text-white/40">Queued</span>
      </div>

      <div className="mt-4">
        <div className="flex items-center justify-between font-mono text-xs text-white/40">
          <span>Trajectory · 30 days</span>
          <span>+ compounding</span>
        </div>
        <div className="mt-3 flex items-end gap-1.5" style={{ height: 80 }}>
          {TRAJECTORY_BARS.map((h, i) => (
            <div
              key={i}
              className="flex-1 rounded-sm bg-gradient-to-t from-white/20 to-white/50"
              style={{ height: `${h}%` }}
            />
          ))}
        </div>
      </div>

      <div className="mt-5">
        <div className="flex items-center justify-between font-mono text-xs text-white/40">
          <span>Cognitive load</span>
        </div>
        <div className="mt-2 h-1.5 w-full rounded-full bg-white/10">
          <div className="h-full w-1/4 rounded-full bg-white/60" />
        </div>
        <p className="mt-1.5 font-mono text-[11px] text-white/30">Low · protected focus</p>
      </div>
    </div>
  );
}
