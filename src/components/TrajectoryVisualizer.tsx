import { useState } from "react";
import { motion } from "framer-motion";
import { ShieldCheck, Compass, Check, X } from "./ui/Icons";
import { Eyebrow } from "./Eyebrow";
import { Reveal } from "./Reveal";
import { useSoundEffects } from "../hooks/useSoundEffects";

type DayState = "normal" | "missed" | "recovering";

export function TrajectoryVisualizer() {
  const [scenario, setScenario] = useState<DayState>("normal");
  const { playConfirmation } = useSoundEffects();

  const handleSelectScenario = (sc: DayState) => {
    playConfirmation();
    setScenario(sc);
  };

  // 14-day velocity tracking
  const baselinePoints = [
    { day: 1, val: 24 },
    { day: 2, val: 30 },
    { day: 3, val: 36 },
    { day: 4, val: 42 },
    { day: 5, val: 48 },
    { day: 6, val: 54 },
    { day: 7, val: 60 },
    { day: 8, val: scenario === "missed" ? 55 : scenario === "recovering" ? 62 : 66 },
    { day: 9, val: scenario === "missed" ? 57 : scenario === "recovering" ? 69 : 72 },
    { day: 10, val: scenario === "missed" ? 61 : scenario === "recovering" ? 76 : 78 },
    { day: 11, val: scenario === "missed" ? 67 : scenario === "recovering" ? 82 : 84 },
    { day: 12, val: scenario === "missed" ? 73 : scenario === "recovering" ? 88 : 90 },
    { day: 13, val: scenario === "missed" ? 79 : scenario === "recovering" ? 93 : 95 },
    { day: 14, val: scenario === "missed" ? 85 : scenario === "recovering" ? 97 : 99 },
  ];

  const streakCount = scenario === "missed" ? 0 : scenario === "recovering" ? 6 : 48;

  return (
    <section
      id="buffer-proof"
      className="mx-auto max-w-6xl px-6 py-16 sm:py-24"
      aria-labelledby="proof-heading"
    >
      <Reveal>
        <Eyebrow variant="badge">ACT 02 // ARCHITECTURAL CONTRAST</Eyebrow>
      </Reveal>

      <Reveal delayMs={80}>
        <h2
          id="proof-heading"
          className="font-display mt-6 max-w-3xl text-3xl sm:text-5xl font-extrabold tracking-tight text-[var(--color-text-primary)] leading-[1.1]"
        >
          Streaks shatter at the first interruption.
          <br />
          <span className="text-[var(--color-text-muted)]">
            Kinetic's ±10% buffer absorbs it.
          </span>
        </h2>
        <p className="mt-4 max-w-2xl text-sm sm:text-base text-[var(--color-text-secondary)] leading-relaxed font-body">
          You don't have a willpower problem. You have a fragile system problem. When illness, late flights, or family emergencies happen, conventional apps wipe out months of effort. Kinetic models your consistency as a resilient mathematical vector.
        </p>
      </Reveal>

      <Reveal delayMs={160} className="mt-10 sm:mt-12">
        <div className="kinetic-specular-box p-6 sm:p-8 rounded-2xl md:rounded-3xl border border-[var(--color-border-default)]">
          {/* Controls Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[var(--color-border-default)]">
            <div className="flex items-center gap-2">
              <span className="p-1 rounded-md border border-[var(--color-border-default)] bg-[var(--color-bg-surface)]">
                <Compass size={16} className="text-[var(--color-text-primary)]" />
              </span>
              <span className="font-tech-mono text-xs uppercase tracking-widest text-[var(--color-text-muted)]">
                SIMULATION SCENARIOS //
              </span>
            </div>

            {/* Interactive Scenario Switcher */}
            <div className="flex items-center gap-1.5 p-1 rounded-xl border border-[var(--color-border-default)] bg-[var(--color-bg-surface)] self-start sm:self-auto">
              <button
                type="button"
                onClick={() => handleSelectScenario("normal")}
                className={`px-3 py-1.5 rounded-lg text-xs font-tech-mono transition-all tactile-press ${
                  scenario === "normal"
                    ? "bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 shadow-xs font-semibold"
                    : "text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]"
                }`}
              >
                Normal Routine
              </button>
              <button
                type="button"
                onClick={() => handleSelectScenario("missed")}
                className={`px-3 py-1.5 rounded-lg text-xs font-tech-mono transition-all tactile-press ${
                  scenario === "missed"
                    ? "bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 shadow-xs font-semibold"
                    : "text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]"
                }`}
              >
                Life Disruption (Flu/Travel)
              </button>
              <button
                type="button"
                onClick={() => handleSelectScenario("recovering")}
                className={`px-3 py-1.5 rounded-lg text-xs font-tech-mono transition-all tactile-press ${
                  scenario === "recovering"
                    ? "bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 shadow-xs font-semibold"
                    : "text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]"
                }`}
              >
                Resumed Vector
              </button>
            </div>
          </div>

          {/* Side-by-Side Reality Matrix */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
            {/* Conventional Streak App Outcome */}
            <div className="p-5 sm:p-6 rounded-xl border border-[var(--color-border-default)] bg-black/[0.02] dark:bg-white/[0.02] flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1.5 text-xs font-tech-mono text-[var(--color-text-muted)] uppercase tracking-wider">
                    <X size={13} /> Conventional Streak App
                  </span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-tech-mono uppercase tracking-wide border border-[var(--color-border-default)] text-[var(--color-text-muted)]">
                    Day 0 Reset Penalty
                  </span>
                </div>

                <div className="mt-4 flex items-baseline gap-3">
                  <span className="font-display font-extrabold text-4xl sm:text-5xl tracking-tight text-[var(--color-text-primary)] tnum">
                    {streakCount}
                  </span>
                  <span className="text-sm font-tech-mono text-[var(--color-text-muted)]">
                    active streak days
                  </span>
                </div>

                <p className="mt-3 text-xs sm:text-sm text-[var(--color-text-secondary)] leading-relaxed">
                  {scenario === "missed" ? (
                    <span className="text-[var(--color-text-primary)] font-medium">
                      Streak shattered to zero. All 48 consecutive days wiped out because you were ill. Triggers guilt, defeat, and app abandonment.
                    </span>
                  ) : scenario === "recovering" ? (
                    <span>
                      Forced restart from scratch. Your prior 48 days of genuine momentum were erased by an arbitrary binary counter.
                    </span>
                  ) : (
                    <span>
                      Fragile all-or-nothing counter. Creates constant low-grade anxiety about keeping an unbroken calendar streak alive.
                    </span>
                  )}
                </p>
              </div>

              <div className="mt-5 pt-3 border-t border-[var(--color-border-default)] flex items-center justify-between text-[11px] font-tech-mono text-[var(--color-text-muted)]">
                <span>Psychological Cost: Shame & Guilt</span>
                <span>Mechanism: Binary 1 or 0</span>
              </div>
            </div>

            {/* Kinetic Trajectory Engine Outcome */}
            <div className="p-5 sm:p-6 rounded-xl border border-black/15 dark:border-white/20 bg-black/[0.04] dark:bg-white/[0.04] shadow-sm flex flex-col justify-between relative overflow-hidden">
              <div className="absolute top-0 right-0 px-3 py-1 bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 text-[10px] font-tech-mono font-bold tracking-widest uppercase rounded-bl-lg">
                BUFFER PROTECTED
              </div>

              <div>
                <div className="flex items-center justify-between pr-24">
                  <span className="flex items-center gap-1.5 text-xs font-tech-mono text-[var(--color-text-primary)] font-bold uppercase tracking-wider">
                    <Check size={13} strokeWidth={2.5} /> Kinetic Trajectory Engine
                  </span>
                </div>

                <div className="mt-4 flex items-baseline gap-3">
                  <span className="font-display font-extrabold text-4xl sm:text-5xl tracking-tight text-[var(--color-text-primary)] tnum">
                    {scenario === "missed" ? "92.4%" : scenario === "recovering" ? "96.1%" : "98.2%"}
                  </span>
                  <span className="text-sm font-tech-mono text-[var(--color-text-muted)]">
                    velocity preserved
                  </span>
                </div>

                <p className="mt-3 text-xs sm:text-sm text-[var(--color-text-primary)] leading-relaxed font-medium">
                  {scenario === "missed" ? (
                    <span>
                      The <strong>±10% mathematical buffer cone</strong> absorbs the disruption. Your 90-day trajectory vector remains unbroken. Zero shame, zero reset, pure momentum continuity.
                    </span>
                  ) : scenario === "recovering" ? (
                    <span>
                      Momentum smoothly compounds back to 96.1%. Life happened, but your trajectory held firm because genuine growth is cumulative.
                    </span>
                  ) : (
                    <span>
                      Deterministic personal trajectory. Grounded in mathematical tolerances that treat your real life with adult seriousness.
                    </span>
                  )}
                </p>
              </div>

              <div className="mt-5 pt-3 border-t border-[var(--color-border-default)] flex items-center justify-between text-[11px] font-tech-mono text-[var(--color-text-primary)] font-semibold">
                <span className="flex items-center gap-1">
                  <ShieldCheck size={13} /> Vector Unbroken
                </span>
                <span>±10% Corridor Active</span>
              </div>
            </div>
          </div>

          {/* SVG Buffer Cone Graph */}
          <div className="mt-6 pt-6 border-t border-[var(--color-border-default)]">
            <div className="flex items-center justify-between text-xs font-tech-mono text-[var(--color-text-muted)] mb-3">
              <span>DAY 01 // HORIZON START</span>
              <span className="hidden sm:inline">±10% BUFFER CONE CORRIDOR (SHADED TOLERANCE)</span>
              <span>DAY 14 // RECENT VECTOR</span>
            </div>

            <div className="relative h-32 sm:h-36 w-full rounded-xl border border-[var(--color-border-default)] bg-[var(--color-bg-surface)] p-2 overflow-hidden flex items-end">
              {/* Shaded Corridor */}
              <svg className="absolute inset-0 h-full w-full" preserveAspectRatio="none" viewBox="0 0 100 100">
                <polygon
                  points="0,85 100,10 100,25 0,95"
                  fill="currentColor"
                  className="text-black/[0.04] dark:text-white/[0.05]"
                />
                <path
                  d="M 0 85 Q 50 45 100 10"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="0.8"
                  strokeDasharray="2 2"
                  className="text-zinc-400/50 dark:text-zinc-500/50"
                />
                <path
                  d="M 0 95 Q 50 65 100 25"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="0.8"
                  strokeDasharray="2 2"
                  className="text-zinc-400/50 dark:text-zinc-500/50"
                />
              </svg>

              {/* Trajectory Velocity Columns */}
              <div className="relative z-10 flex w-full items-end justify-between gap-1 sm:gap-2 h-full px-2 pb-1">
                {baselinePoints.map((p, idx) => {
                  const isDisruptedDay = idx === 7;
                  return (
                    <div key={p.day} className="flex-1 flex flex-col items-center gap-1 h-full justify-end group">
                      <motion.div
                        layout
                        initial={{ height: 0 }}
                        animate={{ height: `${p.val}%` }}
                        transition={{ type: "spring", stiffness: 300, damping: 25 }}
                        className={`w-full rounded-sm transition-colors ${
                          isDisruptedDay && scenario === "missed"
                            ? "bg-zinc-400 dark:bg-zinc-600"
                            : "bg-zinc-900 dark:bg-zinc-100"
                        }`}
                      />
                      <span className="font-tech-mono text-[9px] text-[var(--color-text-muted)] tnum">
                        {p.day}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
