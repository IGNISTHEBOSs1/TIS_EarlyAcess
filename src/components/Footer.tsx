import { KineticLogo } from "./branding/Logo";
import { ShieldCheck, Lock } from "./ui/Icons";
import { useSoundEffects } from "../hooks/useSoundEffects";

export function Footer() {
  const { playTap } = useSoundEffects();

  const scrollToTop = () => {
    playTap();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="border-t border-[var(--color-border-default)] bg-[var(--color-bg-page)] px-6 py-12 transition-colors">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 md:flex-row md:items-center md:justify-between">
        {/* Brand Lockup */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2.5">
            <div className="flex items-center justify-center size-8 rounded-lg border border-[var(--color-border-default)] bg-[var(--color-bg-surface)] p-1">
              <KineticLogo size={20} />
            </div>
            <span className="font-display font-extrabold text-base tracking-tight text-[var(--color-text-primary)]">
              KINETIC
            </span>
          </div>
          <p className="font-tech-mono text-xs text-[var(--color-text-muted)]">
            The Deterministic Personal Trajectory Engine
          </p>
        </div>

        {/* System Invariant Badges */}
        <div className="flex flex-wrap items-center gap-4 text-xs font-tech-mono text-[var(--color-text-muted)]">
          <span className="flex items-center gap-1.5">
            <Lock size={12} className="text-[var(--color-text-primary)]" /> Local-First Vault
          </span>
          <span className="flex items-center gap-1.5">
            <ShieldCheck size={12} className="text-[var(--color-text-primary)]" /> Zero Telemetry
          </span>
          <span>±10% Buffer Cone</span>
          <span>1 Focus + 2 Routines</span>
        </div>

        {/* Copyright & Top Scroll */}
        <div className="flex items-center justify-between md:justify-end gap-6 border-t md:border-t-0 pt-4 md:pt-0 border-[var(--color-border-default)]">
          <p className="font-tech-mono text-xs text-[var(--color-text-muted)]">
            © {new Date().getFullYear()} · Pre-launch
          </p>
          <button
            type="button"
            onClick={scrollToTop}
            className="font-tech-mono text-xs text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] transition-colors underline"
          >
            Back to top ↑
          </button>
        </div>
      </div>
    </footer>
  );
}
