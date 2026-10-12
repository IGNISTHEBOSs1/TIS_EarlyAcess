import { useState } from "react";
import type { FormEvent } from "react";
import { Eyebrow } from "./Eyebrow";
import { Button } from "./Button";
import { Reveal } from "./Reveal";
import { DashboardMockup } from "./DashboardMockup";
import { ShieldCheck, Lock, Check } from "./ui/Icons";
import { useSoundEffects } from "../hooks/useSoundEffects";

interface HeroProps {
  onFastSubmit?: (email: string) => void;
}

export function Hero({ onFastSubmit }: HeroProps) {
  const [fastEmail, setFastEmail] = useState("");
  const [fastJoined, setFastJoined] = useState(false);
  const { playSuccess, playTap } = useSoundEffects();

  const handleFastSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!fastEmail.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fastEmail)) {
      const el = document.getElementById("waitlist");
      if (el) el.scrollIntoView({ behavior: "smooth" });
      return;
    }

    onFastSubmit?.(fastEmail.trim());
    setFastJoined(true);
    playSuccess();

    // Also populate the main form if needed
    const el = document.getElementById("waitlist");
    if (el) {
      setTimeout(() => el.scrollIntoView({ behavior: "smooth" }), 600);
    }
  };

  const scrollToProof = () => {
    playTap();
    const el = document.getElementById("buffer-proof");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="top"
      className="relative mx-auto max-w-6xl px-6 pt-24 sm:pt-32 pb-12 sm:pb-16"
      aria-labelledby="hero-heading"
    >
      <div className="max-w-4xl mx-auto text-center flex flex-col items-center">
        {/* Cohort Scarcity Telemetry Eyebrow */}
        <Reveal>
          <Eyebrow variant="badge">COHORT 01 // 250 FOUNDING SEATS FORMING</Eyebrow>
        </Reveal>

        {/* 3-Second Clarity Headline */}
        <Reveal delayMs={80}>
          <h1
            id="hero-heading"
            className="font-display mt-6 text-4xl sm:text-6xl md:text-7xl font-extrabold leading-[1.06] tracking-tight text-[var(--color-text-primary)]"
          >
            A quieter way to become who you're trying to be.
          </h1>
        </Reveal>

        {/* Value Proposition */}
        <Reveal delayMs={160}>
          <p className="mt-6 max-w-2xl text-base sm:text-xl text-[var(--color-text-secondary)] leading-relaxed font-body">
            Not another streak app that shames you for having a life. A local-first,
            mathematically buffered trajectory engine that absorbs life's volatility and
            proves your cumulative velocity.
          </p>
        </Reveal>

        {/* Inline Fast Reservation Component */}
        <Reveal delayMs={240} className="mt-8 sm:mt-10 w-full max-w-md">
          {fastJoined ? (
            <div className="p-3.5 rounded-2xl border border-[var(--color-border-default)] bg-[var(--color-bg-surface)] flex items-center justify-center gap-2 font-tech-mono text-xs text-[var(--color-text-primary)] shadow-xs">
              <span className="flex size-5 items-center justify-center rounded-full bg-zinc-900 text-white dark:bg-white dark:text-zinc-950">
                <Check size={12} strokeWidth={2.5} />
              </span>
              <span>Fast seat reserved. Scrolling to your digital pass...</span>
            </div>
          ) : (
            <form onSubmit={handleFastSubmit} className="flex flex-col sm:flex-row gap-2">
              <input
                type="email"
                required
                placeholder="Enter your email to request access..."
                value={fastEmail}
                onChange={(e) => setFastEmail(e.target.value)}
                className="flex-1 px-4 py-3 rounded-full border border-[var(--color-border-default)] bg-[var(--color-bg-surface)] text-sm text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)] focus:outline-none focus:border-[var(--color-border-focus)] focus:ring-1 focus:ring-[var(--color-border-focus)] font-body shadow-xs transition-all"
              />
              <Button type="submit" variant="primary" size="md" icon className="shrink-0 shadow-md">
                Reserve Seat
              </Button>
            </form>
          )}

          {/* Quiet Trust Line */}
          <div className="mt-3 flex items-center justify-center gap-4 text-[11px] font-tech-mono text-[var(--color-text-muted)]">
            <span className="flex items-center gap-1">
              <Lock size={11} className="text-[var(--color-text-primary)]" /> Local-first vault
            </span>
            <span>·</span>
            <span className="flex items-center gap-1">
              <ShieldCheck size={11} className="text-[var(--color-text-primary)]" /> Zero data harvesting
            </span>
            <span>·</span>
            <span>100% Free local tier</span>
          </div>
        </Reveal>

        {/* Secondary Exploration Link */}
        <Reveal delayMs={300} className="mt-4">
          <button
            type="button"
            onClick={scrollToProof}
            className="font-tech-mono text-xs text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors underline underline-offset-4"
          >
            See how the ±10% buffer prevents streak burnout ↓
          </button>
        </Reveal>
      </div>

      {/* Hero Visual Anchor: Pristine Neoskeuomorphic Dashboard Preview */}
      <div className="mt-12 sm:mt-16">
        <Reveal delayMs={360}>
          <DashboardMockup />
        </Reveal>
      </div>
    </section>
  );
}
