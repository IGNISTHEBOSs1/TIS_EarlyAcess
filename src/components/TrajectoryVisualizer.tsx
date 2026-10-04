import { useState } from "react";
import { motion } from "framer-motion";
import { ShieldCheck, Compass } from "./ui/Icons";
import { useSoundEffects } from "../hooks/useSoundEffects";

type DayState = "normal" | "missed" | "recovering";

export function TrajectoryVisualizer() {
  const [scenario, setScenario] = useState<DayState>("normal");
  const { playConfirmation } = useSoundEffects();

  const handleSelectScenario = (sc: DayState) => {
    playConfirmation();
    setScenario(sc);
  };

  // Trajectory points for 14-day window
  const baselinePoints = [
    { day: 1, val: 20 },
    { day: 2, val: 26 },
    { day: 3, val: 32 },
    { day: 4, val: 38 },
    { day: 5, val: 44 },
    { day: 6, val: 50 },
    { day: 7, val: 56 },
    { day: 8, val: scenario === "missed" ? 52 : scenario === "recovering" ? 58 : 62 },
    { day: 9, val: scenario === "missed" ? 54 : scenario === "recovering" ? 65 : 68 },
    { day: 10, val: scenario === "missed" ? 58 : scenario === "recovering" ? 72 : 74 },
    { day: 11, val: scenario === "missed" ? 64 : scenario === "recovering" ? 78 : 80 },
    { day: 12, val: scenario === "missed" ? 70 : scenario === "recovering" ? 84 : 86 },
    { day: 13, val: scenario === "missed" ? 76 : scenario === "recovering" ? 89 : 91 },
    { day: 14, val: scenario === "missed" ? 82 : scenario === "recovering" ? 94 : 96 },
  ];

  // Conventional streak points (shatters on Day 8 in missed scenario)
  const streakCount = scenario === "missed" ? 0 : scenario === "recovering" ? 6 : 48;

  return (
    <div className="kinetic-specular-box p-6 sm:p-8 rounded-2xl md:rounded-3xl border border-[var(--color-border-default)]">
      {/* Visualizer Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[var(--color-border-default)]">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1 rounded-md border border-[var(--color-border-default)] bg-[var(--color-bg-surface)]">
              <Compass size={16} className="text-[var(--color-text-primary)]" />
            </span>
            <span className="font-tech-mono text-xs uppercase tracking-widest text-[var(--color-text-muted)]">
              TELEMETRY ENGINE // BUFFER MATHEMATICS
            </span>
          </div>
          <h3 className="font-display font-bold text-xl sm:text-2xl text-[var(--color-text-primary)] mt-1.5">
            The ±10% Mathematical Buffer Cone
          </h3>
          <p className="text-xs sm:text-sm text-[var(--color-text-secondary)] mt-1 max-w-xl">
            Simulate what happens when illness, flights, or emergencies hit. See why Kinetic protects your psychology while streak apps trigger guilt spirals.
          </p>
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
            Clean Run
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
            Life Interruption
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

      {/* Side-by-Side Reality Preview */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
        {/* Conventional Streak App Outcome */}
        <div className="p-4 sm:p-5 rounded-xl border border-[var(--color-border-default)] bg-black/[0.02] dark:bg-white/[0.02] flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <span className="font-tech-mono text-[11px] uppercase tracking-wider text-[var(--color-text-muted)]">
                CONVENTIONAL STREAK APPS
              </span>
              <span className="px-2 py-0.5 rounded text-[10px] font-tech-mono uppercase tracking-wide border border-[var(--color-border-default)] text-[var(--color-text-secondary)]">
                FRAGILE COUNTER
              </span>
            </div>
            <div className="mt-4 flex items-baseline gap-3">
              <span className="font-display font-extrabold text-4xl sm:text-5xl tracking-tight text-[var(--color-text-primary)] tnum">
                {streakCount}
              </span>
              <span className="text-sm font-tech-mono text-[var(--color-text-muted)]">
                days recorded
              </span>
            </div>
            <p className="mt-3 text-xs sm:text-sm text-[var(--color-text-secondary)] leading-relaxed">
              {scenario === "missed" ? (
                <span className="text-[var(--color-text-primary)] font-medium">
                  Streak snapped to Day 0. All 48 consecutive days wiped out because you were sick. Triggers guilt, frustration, and app deletion.
                </span>
              ) : scenario === "recovering" ? (
                <span>
                  Restarting from scratch. The psychological penalty remains — 48 days of genuine effort erased by a single calendar slot.
                </span>
              ) : (
                <span>
                  Fragile count. Every morning starts with low-grade anxiety of losing the streak number.
                </span>
              )}
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-[var(--color-border-default)] flex items-center justify-between text-[11px] font-tech-mono text-[var(--color-text-muted)]">
            <span>Result: High Churn</span>
            <span>Penalty: All-or-Nothing</span>
          </div>
        </div>

        {/* Kinetic Trajectory Engine Outcome */}
        <div className="p-4 sm:p-5 rounded-xl border border-black/15 dark:border-white/20 bg-black/[0.04] dark:bg-white/[0.04] shadow-sm flex flex-col justify-between relative overflow-hidden">
          <div className="absolute top-0 right-0 px-3 py-1 bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 text-[10px] font-tech-mono font-bold tracking-widest uppercase rounded-bl-lg">
            PROTECTED
          </div>
          <div>
            <div className="flex items-center justify-between pr-24">
              <span className="font-tech-mono text-[11px] uppercase tracking-wider text-[var(--color-text-primary)] font-bold">
                KINETIC TRAJECTORY ENGINE
              </span>
            </div>
            <div className="mt-4 flex items-baseline gap-3">
              <span className="font-display font-extrabold text-4xl sm:text-5xl tracking-tight text-[var(--color-text-primary)] tnum">
                {scenario === "missed" ? "92.4%" : scenario === "recovering" ? "96.1%" : "98.2%"}
              </span>
              <span className="text-sm font-tech-mono text-[var(--color-text-muted)]">
                velocity maintained
              </span>
            </div>
            <p className="mt-3 text-xs sm:text-sm text-[var(--color-text-primary)] leading-relaxed">
              {scenario === "missed" ? (
                <span>
                  The <strong>±10% mathematical buffer corridor</strong> absorbs the off-day. Your 90-day vector stays fully unbroken. Zero shame, zero reset, pure momentum continuity.
                </span>
              ) : scenario === "recovering" ? (
                <span>
                  Momentum automatically compounds back to 96.1%. Life happened, but your trajectory held firm because consistency is a vector, not a tally.
                </span>
              ) : (
                <span>
                  Quiet, deterministic progress. Grounded in mathematical tolerances that treat your real life with adult seriousness.
                </span>
              )}
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-[var(--color-border-default)] flex items-center justify-between text-[11px] font-tech-mono text-[var(--color-text-primary)] font-semibold">
            <span className="flex items-center gap-1">
              <ShieldCheck size={13} /> Tolerance Corridor Active
            </span>
            <span>Vector Unbroken</span>
          </div>
        </div>
      </div>

      {/* SVG Mathematical Curve Visualization */}
      <div className="mt-6 pt-6 border-t border-[var(--color-border-default)]">
        <div className="flex items-center justify-between text-xs font-tech-mono text-[var(--color-text-muted)] mb-3">
          <span>DAY 01 // HORIZON START</span>
          <span>±10% BUFFER CONE CORRIDOR</span>
          <span>DAY 14 // RECENT VECTOR</span>
        </div>

        <div className="relative h-36 w-full rounded-xl border border-[var(--color-border-default)] bg-[var(--color-bg-surface)] p-2 overflow-hidden flex items-end">
          {/* Shaded Buffer Cone Corridor */}
          <svg className="absolute inset-0 h-full w-full" preserveAspectRatio="none" viewBox="0 0 100 100">
            {/* Upper buffer boundary */}
            <path
              d="M 0 85 Q 50 45 100 10"
              fill="none"
              stroke="currentColor"
              strokeWidth="0.8"
              strokeDasharray="2 2"
              className="text-zinc-400/40 dark:text-zinc-600/40"
            />
            {/* Lower buffer boundary */}
            <path
              d="M 0 95 Q 50 65 100 25"
              fill="none"
              stroke="currentColor"
              strokeWidth="0.8"
              strokeDasharray="2 2"
              className="text-zinc-400/40 dark:text-zinc-600/40"
            />
            {/* Shaded buffer corridor area */}
            <polygon
              points="0,85 100,10 100,25 0,95"
              fill="currentColor"
              className="text-black/[0.03] dark:text-white/[0.04]"
            />
          </svg>

          {/* Interactive Trajectory Bars */}
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
  );
}
