import { useState } from "react";
import { Check, Lock } from "./ui/Icons";

const TRAJECTORY_BARS = [24, 28, 26, 34, 32, 40, 46, 52, 58, 66, 72, 80, 86, 92, 98];

interface MockTask {
  id: string;
  type: "focus" | "routine";
  label: string;
  done: boolean;
  metric?: string;
}

const INITIAL_TASKS: MockTask[] = [
  {
    id: "f1",
    type: "focus",
    label: "Ship v1 core trajectory mathematics",
    done: true,
    metric: "+1.8% velocity",
  },
  {
    id: "r1",
    type: "routine",
    label: "25-minute morning uninterrupted deep block",
    done: true,
    metric: "routine 01",
  },
  {
    id: "r2",
    type: "routine",
    label: "Shutdown review & day close at 22:00",
    done: false,
    metric: "routine 02",
  },
];

interface DashboardMockupProps {
  className?: string;
}

/**
 * Authentic Kinetic Neoskeuomorphic In-App Preview
 * Strict Invariants:
 * 1 Primary Focus + 2 Routines Cap,
 * Local-First Encrypted Browser Storage,
 * ±10% Mathematical Buffer Corridor.
 */
export function DashboardMockup({ className = "" }: DashboardMockupProps) {
  const [tasks, setTasks] = useState<MockTask[]>(INITIAL_TASKS);

  const toggleTask = (id: string) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t))
    );
  };

  return (
    <div
      aria-label="Kinetic in-app dashboard preview"
      className={`kinetic-specular-box rounded-2xl md:rounded-3xl border border-[var(--color-border-default)] overflow-hidden ${className}`}
    >
      {/* Top Window Chrome */}
      <div className="flex items-center justify-between border-b border-[var(--color-border-default)] bg-[var(--color-bg-surface)] px-5 py-3 font-tech-mono text-xs text-[var(--color-text-muted)]">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-zinc-400 dark:bg-zinc-600" />
          <span className="h-2 w-2 rounded-full bg-zinc-400 dark:bg-zinc-600" />
          <span className="h-2 w-2 rounded-full bg-zinc-400 dark:bg-zinc-600" />
          <span className="ml-2 text-[11px] text-[var(--color-text-secondary)]">
            kinetic.app // workspace
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="flex items-center gap-1 text-[10px] uppercase tracking-wider text-[var(--color-text-primary)]">
            <Lock size={11} /> LOCAL ENCRYPTED VAULT
          </span>
        </div>
      </div>

      <div className="flex flex-col md:flex-row">
        {/* Left Nav Rail */}
        <div className="flex shrink-0 flex-col gap-1.5 border-b border-[var(--color-border-default)] p-4 md:w-48 md:border-b-0 md:border-r md:p-5 bg-black/[0.01] dark:bg-white/[0.01]">
          <div className="px-3 py-2 rounded-xl bg-zinc-900 text-white dark:bg-white dark:text-zinc-950 font-display text-xs font-bold shadow-xs">
            TODAY
          </div>
          <div className="px-3 py-2 text-xs font-tech-mono text-[var(--color-text-secondary)]">
            TRAJECTORY
          </div>
          <div className="px-3 py-2 text-xs font-tech-mono text-[var(--color-text-secondary)]">
            REFLECTIONS
          </div>
          <div className="px-3 py-2 text-xs font-tech-mono text-[var(--color-text-secondary)]">
            VAULT
          </div>

          {/* Cognitive Guardrail Widget */}
          <div className="mt-6 p-3 rounded-xl border border-[var(--color-border-default)] bg-[var(--color-bg-surface)]">
            <div className="flex items-center justify-between">
              <span className="font-tech-mono text-[10px] uppercase tracking-wider text-[var(--color-text-muted)]">
                COGNITIVE CAP
              </span>
              <span className="font-tech-mono text-[10px] text-[var(--color-text-primary)] font-bold">
                3/3
              </span>
            </div>
            <div className="mt-2 h-1.5 w-full rounded-full bg-black/10 dark:bg-white/10 overflow-hidden">
              <div className="h-full w-full rounded-full bg-zinc-900 dark:bg-white" />
            </div>
            <p className="mt-2 font-tech-mono text-[10px] text-[var(--color-text-secondary)] leading-tight">
              1 Focus + 2 Routines. Overload prevented.
            </p>
          </div>
        </div>

        {/* Center Workspace */}
        <div className="flex-1 p-5 md:p-7">
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <div>
              <span className="font-tech-mono text-xs uppercase tracking-widest text-[var(--color-text-muted)] border-t border-[var(--color-border-default)] pt-1 inline-block">
                DIRECTION // HORIZON 01
              </span>
              <h4 className="font-display text-lg sm:text-xl font-bold text-[var(--color-text-primary)] mt-1">
                Become someone who finishes.
              </h4>
            </div>
            <span className="font-tech-mono text-xs text-[var(--color-text-muted)] tnum">
              DAY 41 // 90
            </span>
          </div>

          {/* Tasks Container */}
          <div className="mt-5 space-y-2.5">
            {tasks.map((task) => (
              <div
                key={task.id}
                onClick={() => toggleTask(task.id)}
                className={`p-3.5 sm:p-4 rounded-xl border transition-all cursor-pointer tactile-press flex items-center justify-between gap-3 ${
                  task.type === "focus"
                    ? "border-black/20 dark:border-white/20 bg-black/[0.03] dark:bg-white/[0.04] shadow-xs"
                    : "border-[var(--color-border-default)] bg-[var(--color-bg-surface)]"
                }`}
              >
                <div className="flex items-center gap-3">
                  <span
                    className={`size-5 rounded-md flex items-center justify-center border transition-all ${
                      task.done
                        ? "bg-zinc-900 border-zinc-900 text-white dark:bg-white dark:border-white dark:text-zinc-950"
                        : "border-[var(--color-border-default)] bg-[var(--color-bg-page)]"
                    }`}
                  >
                    {task.done && <Check size={13} strokeWidth={2.5} />}
                  </span>

                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-tech-mono text-[9px] uppercase tracking-wider text-[var(--color-text-muted)]">
                        {task.type === "focus" ? "PRIMARY FOCUS (1)" : "ROUTINE (2)"}
                      </span>
                    </div>
                    <span
                      className={`text-xs sm:text-sm font-medium ${
                        task.done
                          ? "text-[var(--color-text-muted)] line-through"
                          : "text-[var(--color-text-primary)]"
                      }`}
                    >
                      {task.label}
                    </span>
                  </div>
                </div>

                <span className="font-tech-mono text-[10px] text-[var(--color-text-muted)] uppercase tracking-wider shrink-0">
                  {task.metric}
                </span>
              </div>
            ))}
          </div>

          {/* 30-Day Trajectory Vector Bar Chart */}
          <div className="mt-6 pt-5 border-t border-[var(--color-border-default)]">
            <div className="flex items-center justify-between font-tech-mono text-xs text-[var(--color-text-muted)]">
              <span className="uppercase tracking-wider">30-DAY VELOCITY // ±10% BUFFER ACTIVE</span>
              <span className="text-[var(--color-text-primary)] font-semibold">+98.2% COMPOUNDING</span>
            </div>
            <div className="mt-3 flex items-end gap-1.5 h-16 w-full">
              {TRAJECTORY_BARS.map((h, i) => (
                <div
                  key={i}
                  className="flex-1 rounded-sm bg-zinc-900 dark:bg-white opacity-90 transition-all hover:opacity-100"
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
