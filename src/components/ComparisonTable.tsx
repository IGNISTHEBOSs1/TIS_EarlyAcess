import { Check, X, ShieldCheck } from "./ui/Icons";
import { Eyebrow } from "./Eyebrow";
import { Reveal } from "./Reveal";

interface ComparisonRow {
  basis: string;
  subBasis: string;
  otherText: string;
  kineticText: string;
}

const COMPARISONS: ComparisonRow[] = [
  {
    basis: "When life happens (missed day)",
    subBasis: "Illness, travel delays, emergencies",
    otherText: "Resets streak to Day 0 (guilt, shame & abandonment)",
    kineticText: "±10% mathematical buffer absorbs it (vector unbroken)",
  },
  {
    basis: "Daily cognitive load",
    subBasis: "Willpower & decision fatigue",
    otherText: "Endless 15–20 item checklist overwhelm",
    kineticText: "Strict 1 Focus + 2 Routines (<2 min execution)",
  },
  {
    basis: "Metric of personal growth",
    subBasis: "Measurement accuracy",
    otherText: "Static binary streak counters & fantasy XP bars",
    kineticText: "Dynamic 90-day trajectory & cumulative velocity index",
  },
  {
    basis: "Data sovereignty & privacy",
    subBasis: "Security guarantee",
    otherText: "Cloud data harvesting, ad tracking pixels, paywalled metrics",
    kineticText: "100% Local-first encrypted browser vault · Zero telemetry",
  },
  {
    basis: "Psychological atmosphere",
    subBasis: "Emotional relationship",
    otherText: "Fear of breaking streak counters, shame-driven notifications",
    kineticText: "Quiet, calm, deterministic personal trajectory",
  },
];

export function ComparisonTable() {
  return (
    <section className="mx-auto max-w-5xl px-6 py-16 sm:py-24" aria-labelledby="comparison-heading">
      <Reveal>
        <Eyebrow variant="badge">ARCHITECTURAL SAFETY COMPARISON</Eyebrow>
      </Reveal>

      <Reveal delayMs={80}>
        <h2
          id="comparison-heading"
          className="font-display mt-6 max-w-3xl text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-[var(--color-text-primary)] leading-[1.12]"
        >
          A fundamentally safer way to build consistency.
        </h2>
        <p className="mt-4 max-w-2xl text-sm sm:text-base text-[var(--color-text-secondary)] leading-relaxed">
          Streaks are static counters that shatter at the first human interruption. Kinetic prioritizes Trajectory — a dynamic velocity engine with a mathematical buffer that absorbs volatility so your momentum never has to start over.
        </p>
      </Reveal>

      {/* Comparison Grid */}
      <Reveal delayMs={160} className="mt-12">
        <div className="kinetic-specular-box rounded-2xl md:rounded-3xl border border-[var(--color-border-default)] overflow-hidden">
          {/* Header row */}
          <div className="grid grid-cols-1 md:grid-cols-12 border-b border-[var(--color-border-default)] bg-[var(--color-bg-surface)] py-4 px-6 text-xs font-tech-mono">
            <div className="md:col-span-4 uppercase tracking-wider text-[var(--color-text-muted)]">
              Dimension // Criteria
            </div>
            <div className="hidden md:flex md:col-span-4 items-center gap-2 uppercase tracking-wider text-[var(--color-text-muted)]">
              <span className="flex size-4 items-center justify-center rounded-sm bg-black/5 dark:bg-white/10 text-[var(--color-text-muted)]">
                <X size={12} />
              </span>
              Conventional Streak Apps
            </div>
            <div className="hidden md:flex md:col-span-4 items-center gap-2 uppercase tracking-wider text-[var(--color-text-primary)] font-bold">
              <span className="flex size-4 items-center justify-center rounded-sm bg-zinc-900 text-white dark:bg-white dark:text-zinc-900">
                <Check size={12} />
              </span>
              Kinetic Improvement System
            </div>
          </div>

          {/* Comparison Rows */}
          <div className="divide-y divide-[var(--color-border-default)]">
            {COMPARISONS.map((row) => (
              <div
                key={row.basis}
                className="grid grid-cols-1 md:grid-cols-12 p-6 gap-4 md:gap-6 items-center hover:bg-black/[0.01] dark:hover:bg-white/[0.01] transition-colors"
              >
                {/* Basis */}
                <div className="md:col-span-4">
                  <span className="font-display font-semibold text-sm sm:text-base text-[var(--color-text-primary)] block">
                    {row.basis}
                  </span>
                  <span className="font-tech-mono text-xs text-[var(--color-text-muted)] mt-0.5 block">
                    {row.subBasis}
                  </span>
                </div>

                {/* Other text */}
                <div className="md:col-span-4 p-3.5 rounded-xl border border-[var(--color-border-default)] bg-black/[0.02] dark:bg-white/[0.02]">
                  <div className="flex items-center gap-1.5 md:hidden mb-2">
                    <span className="flex size-3.5 items-center justify-center rounded bg-black/5 dark:bg-white/10 text-[var(--color-text-muted)]">
                      <X size={10} />
                    </span>
                    <span className="font-tech-mono text-[10px] text-[var(--color-text-muted)] uppercase tracking-wider">
                      Streak Apps
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-[var(--color-text-muted)] leading-relaxed">
                    {row.otherText}
                  </p>
                </div>

                {/* Kinetic text */}
                <div className="md:col-span-4 p-3.5 rounded-xl border border-black/15 dark:border-white/20 bg-black/[0.04] dark:bg-white/[0.04]">
                  <div className="flex items-center gap-1.5 md:hidden mb-2">
                    <span className="flex size-3.5 items-center justify-center rounded bg-zinc-900 text-white dark:bg-white dark:text-zinc-900">
                      <Check size={10} />
                    </span>
                    <span className="font-tech-mono text-[10px] text-[var(--color-text-primary)] font-bold uppercase tracking-wider">
                      Kinetic System
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-[var(--color-text-primary)] font-medium leading-relaxed">
                    {row.kineticText}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Table Footer Guarantee */}
          <div className="border-t border-[var(--color-border-default)] bg-[var(--color-bg-surface)] p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-tech-mono text-[var(--color-text-secondary)]">
            <span className="flex items-center gap-2">
              <ShieldCheck size={15} className="text-[var(--color-text-primary)]" />
              <span>DETERMINISTIC VELOCITY OVER ARBITRARY GAMIFICATION</span>
            </span>
            <span className="text-[var(--color-text-muted)]">
              ZERO DARK PATTERNS // ZERO PAYWALLS
            </span>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
