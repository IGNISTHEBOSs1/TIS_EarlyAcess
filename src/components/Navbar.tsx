import { useState, useEffect } from "react";
import { KineticLogo } from "./branding/Logo";
import { ThemeToggle } from "./ThemeToggle";
import { Button } from "./Button";
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
    <header className="fixed top-3 sm:top-4 inset-x-3 sm:inset-x-6 max-w-5xl mx-auto z-50 transition-all duration-300">
      <nav
        aria-label="Main Navigation"
        className={`kinetic-glass-island rounded-2xl md:rounded-full px-4 sm:px-6 py-2.5 sm:py-3 flex items-center justify-between gap-3 transition-shadow duration-200 ${
          scrolled ? "shadow-lg" : ""
        }`}
      >
        {/* Brand Lockup */}
        <a
          href="#top"
          className="flex items-center gap-2.5 group tactile-press"
          aria-label="Kinetic - The Improvement System"
        >
          <div className="relative flex items-center justify-center size-8 sm:size-9 rounded-xl border border-black/10 dark:border-white/15 bg-black/[0.03] dark:bg-white/[0.04] p-1 shadow-xs">
            <KineticLogo size={22} />
          </div>
          <div className="flex flex-col">
            <span className="font-display font-extrabold text-sm sm:text-base tracking-tight text-[var(--color-text-primary)] leading-none">
              KINETIC
            </span>
            <span className="font-tech-mono text-[9px] uppercase tracking-widest text-[var(--color-text-muted)] mt-0.5">
              THE IMPROVEMENT SYSTEM
            </span>
          </div>
        </a>

        {/* Live Cohort Radar Chip (strictly monochromatic) */}
        <div className="hidden md:flex items-center gap-2 px-3 py-1 rounded-full border border-[var(--color-border-default)] bg-[var(--color-bg-surface)] text-[11px] font-tech-mono text-[var(--color-text-secondary)] shadow-xs">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-zinc-400 dark:bg-zinc-200 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-zinc-900 dark:bg-zinc-100" />
          </span>
          <span className="tracking-wider uppercase">COHORT 01 // OPEN</span>
        </div>

        {/* Interactive Controls & CTA */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Sound Toggle */}
          <button
            type="button"
            onClick={toggleSound}
            aria-label={soundEnabled ? "Mute interface audio" : "Enable interface audio"}
            className="flex items-center justify-center size-8 sm:size-9 rounded-full border border-[var(--color-border-default)] bg-[var(--color-bg-surface)] text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] tactile-press transition-colors"
          >
            {soundEnabled ? <Volume2 size={15} /> : <VolumeX size={15} />}
          </button>

          {/* Theme Toggle */}
          <ThemeToggle />

          {/* Waitlist CTA */}
          <Button
            variant="primary"
            size="sm"
            onClick={scrollToWaitlist}
            className="hidden xs:inline-flex"
          >
            Request Access
          </Button>
        </div>
      </nav>
    </header>
  );
}
