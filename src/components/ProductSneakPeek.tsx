import { ShieldCheck } from "./ui/Icons";
import { MysteriousClipReveal } from "./motion";

interface ProductSneakPeekProps {
  className?: string;
}

/**
 * Authentic Kinetic In-App Sneak Peek Console
 * Displays the authentic high-resolution application capture from Kinetic,
 * mounted inside the canonical neoskeuomorphic liquid frosted glass hardware frame.
 */
export function ProductSneakPeek({ className = "" }: ProductSneakPeekProps) {
  return (
    <div
      id="sneak-peek-frame"
      className={`relative max-w-5xl mx-auto text-left select-none ${className}`}
      aria-label="Kinetic in-app preview console"
    >
      {/* Anchored Floating Telemetry Chips */}
      <div className="hidden md:flex absolute -top-5 left-4 items-center gap-2.5 px-3.5 py-1.5 rounded-full border border-black/[0.08] dark:border-white/[0.08] bg-[var(--color-bg-elevated)]/90 backdrop-blur-xl text-[11px] text-[var(--color-text-secondary)] shadow-sm pointer-events-none z-20 font-tech-mono">
        <span className="size-2 rounded-full bg-[var(--color-text-primary)] animate-pulse" />
        <span className="text-[var(--color-text-primary)] font-bold">
          Velocity: 1.25x
        </span>
        <span className="text-[var(--color-text-muted)]">• +16d Margin</span>
      </div>

      <div className="hidden md:flex absolute -top-5 right-4 items-center gap-2.5 px-3.5 py-1.5 rounded-full border border-black/[0.08] dark:border-white/[0.08] bg-[var(--color-bg-elevated)]/90 backdrop-blur-xl text-[11px] text-[var(--color-text-secondary)] shadow-sm pointer-events-none z-20 font-tech-mono">
        <ShieldCheck size={14} className="text-[var(--color-text-primary)]" />
        <span className="text-[var(--color-text-primary)] font-bold">
          ±10% Safety Buffer
        </span>
        <span className="text-[var(--color-text-muted)]">• Drift Absorbed</span>
      </div>

      {/* Hardware Frame with Liquid Frosted Glass & Mysterious Reveal */}
      <MysteriousClipReveal
        direction="center-out"
        duration={0.85}
        delay={0.08}
        showLaserGlint={true}
        className="rounded-2xl md:rounded-3xl"
      >
        <div className="relative rounded-2xl md:rounded-3xl border border-black/[0.1] dark:border-white/[0.12] bg-[var(--color-bg-surface)]/85 backdrop-blur-2xl shadow-xl overflow-hidden kinetic-specular-box">
          {/* Top Bar HUD Chrome */}
          <div className="flex items-center justify-between px-3.5 sm:px-6 py-2.5 sm:py-3 border-b border-[var(--color-border-default)] bg-black/[0.02] dark:bg-white/[0.02] text-xs backdrop-blur-md">
            <div className="flex items-center gap-2">
              <span className="size-2.5 rounded-full bg-zinc-400/60 dark:bg-zinc-600/60 border border-zinc-400/80 dark:border-zinc-500/80" />
              <span className="size-2.5 rounded-full bg-zinc-400/60 dark:bg-zinc-600/60 border border-zinc-400/80 dark:border-zinc-500/80" />
              <span className="size-2.5 rounded-full bg-zinc-400/60 dark:bg-zinc-600/60 border border-zinc-400/80 dark:border-zinc-500/80" />
              <span className="ml-2 font-tech-mono text-[10px] sm:text-[11px] text-[var(--color-text-muted)]">
                Live Product Console // Trajectory Visualizer
              </span>
            </div>

            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[var(--color-bg-elevated)] border border-[var(--color-border-default)] text-[10px] font-tech-mono text-[var(--color-text-secondary)] shadow-xs">
                <span className="size-1.5 rounded-full bg-[var(--color-text-primary)]" />
                <span className="uppercase tracking-wider">In-App View</span>
              </div>
            </div>
          </div>

          {/* Genuine Kinetic App Image from theimprovementsystem */}
          <div className="p-3 sm:p-5 md:p-6 bg-black/[0.01] dark:bg-white/[0.01]">
            <img
              src="/assets/app-demo-fallback.png"
              alt="Kinetic actual app interface preview"
              width={1024}
              height={580}
              className="w-full h-auto object-cover max-h-[580px] rounded-xl border border-[var(--color-border-default)] shadow-xs"
              loading="eager"
            />
          </div>
        </div>
      </MysteriousClipReveal>
    </div>
  );
}
