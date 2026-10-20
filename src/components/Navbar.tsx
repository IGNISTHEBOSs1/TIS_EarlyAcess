import { useState, useEffect } from "react";
import { KineticLogo } from "./branding/Logo";
import { ThemeToggle } from "./ThemeToggle";
import { Volume2, VolumeX } from "./ui/Icons";
import { useSoundEffects } from "../hooks/useSoundEffects";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const { soundEnabled, toggleSound, playTap } = useSoundEffects();

  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrolled(window.scrollY > 12);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToWaitlist = () => {
    playTap();
    const el = document.getElementById("waitlist");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header className="fixed top-2.5 sm:top-4 inset-x-2.5 sm:inset-x-6 max-w-5xl mx-auto z-50 transition-all duration-300">
      <nav
        aria-label="Main Navigation"
        className={`kinetic-glass-island rounded-full px-3 sm:px-5 py-2 sm:py-2.5 flex items-center justify-between gap-2 sm:gap-4 transition-all duration-200 ${
          scrolled ? "shadow-lg border-black/15 dark:border-white/20" : ""
        }`}
      >
        {/* Brand Lockup */}
        <a
          href="#top"
          className="flex items-center gap-2 sm:gap-2.5 group tactile-press shrink-0 min-w-0"
          aria-label="Kinetic - Personal Trajectory Engine"
        >
          <div className="relative flex items-center justify-center size-8 sm:size-9 rounded-xl border border-black/10 dark:border-white/15 bg-white dark:bg-white/[0.04] p-1 [box-shadow:inset_0_1px_1px_rgba(255,255,255,1),0_1px_2px_rgba(0,0,0,0.06)] dark:[box-shadow:inset_0_1px_1px_rgba(255,255,255,0.15),0_1px_2px_rgba(0,0,0,0.3)] shrink-0">
            <KineticLogo size={20} />
          </div>
          <div className="flex items-center gap-2 min-w-0">
            <span className="font-display font-extrabold text-sm sm:text-base tracking-tight text-[var(--color-text-primary)] leading-none">
              KINETIC
            </span>
            <span className="hidden sm:inline-flex items-center gap-1.5 px-2 py-0.5 stat-chip text-[9px] font-tech-mono uppercase tracking-wider text-[var(--color-text-muted)]">
              <span className="size-1.5 rounded-full bg-zinc-900 dark:bg-zinc-100" />
              Trajectory Engine
            </span>
          </div>
        </a>

        {/* Live Cohort Radar Chip (strictly monochromatic on medium+ screens) */}
        <div className="hidden md:flex stat-chip px-3 py-1 text-[11px] font-tech-mono text-[var(--color-text-secondary)]">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-zinc-400 dark:bg-zinc-200 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-zinc-900 dark:bg-zinc-100" />
          </span>
          <span className="tracking-wider uppercase">COHORT 01 // FORMING</span>
        </div>

        {/* Interactive Controls & Tactile Mobile-Responsive CTA */}
        <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
          {/* Sound Toggle */}
          <button
            type="button"
            onClick={toggleSound}
            aria-label={soundEnabled ? "Mute interface audio" : "Enable interface audio"}
            className="flex items-center justify-center size-8 sm:size-9 rounded-full border border-black/10 dark:border-white/12 bg-white dark:bg-white/[0.05] text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] tactile-press transition-colors [box-shadow:inset_0_1px_1px_rgba(255,255,255,1),0_1px_2px_rgba(0,0,0,0.05)] dark:[box-shadow:inset_0_1px_1px_rgba(255,255,255,0.15),0_1px_2px_rgba(0,0,0,0.3)]"
          >
            {soundEnabled ? <Volume2 size={14} /> : <VolumeX size={14} />}
          </button>

          {/* Theme Toggle (Adaptive: 32px dial on mobile, 82px analog track on tablet/desktop) */}
          <ThemeToggle />

          {/* Waitlist CTA (Visible and perfectly proportioned on both mobile & desktop) */}
          <button
            type="button"
            onClick={scrollToWaitlist}
            className="h-8 sm:h-9 px-3 sm:px-4 rounded-full bg-zinc-900 text-white dark:bg-white dark:text-zinc-950 font-display font-semibold text-xs tracking-tight shadow-[0_2px_6px_rgba(0,0,0,0.18),inset_0_1px_1px_rgba(255,255,255,0.25)] dark:shadow-[0_4px_12px_rgba(255,255,255,0.12),inset_0_1px_1px_rgba(255,255,255,0.9)] hover:opacity-95 active:scale-[0.96] transition-all flex items-center justify-center gap-1 shrink-0"
          >
            <span className="sm:hidden">Join</span>
            <span className="hidden sm:inline">Request Access</span>
          </button>
        </div>
      </nav>
    </header>
  );
}
