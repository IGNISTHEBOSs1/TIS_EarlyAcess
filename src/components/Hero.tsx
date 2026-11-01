import { useState } from "react";
import type { FormEvent } from "react";
import { Eyebrow } from "./Eyebrow";
import { Button } from "./Button";
import { Reveal } from "./Reveal";
import { ProductSneakPeek } from "./ProductSneakPeek";
import { MysteriousClipReveal, AtmosphericLift } from "./motion";
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
      className="relative mx-auto w-full max-w-6xl px-3.5 sm:px-6 pt-20 sm:pt-32 pb-12 sm:pb-16"
      aria-labelledby="hero-heading"
    >
      <div className="max-w-4xl mx-auto text-center flex flex-col items-center">
        {/* Cohort Scarcity Telemetry Eyebrow with Atmospheric Lift */}
        <AtmosphericLift yOffset={6}>
          <Eyebrow variant="badge">
            <span className="hidden sm:inline">COHORT 01 // 250 FOUNDING SEATS FORMING</span>
            <span className="sm:hidden">COHORT 01 // 250 SEATS FORMING</span>
          </Eyebrow>
        </AtmosphericLift>

        {/* 3-Second Clarity Headline with Mysterious Clip Reveal */}
        <MysteriousClipReveal
          direction="horizontal"
          duration={0.32}
          delay={0.04}
          showLaserGlint={false}
          className="max-w-4xl mx-auto mt-6"
        >
          <h1
            id="hero-heading"
            className="font-display text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold leading-[1.08] tracking-tight text-[var(--color-text-primary)]"
          >
            A quieter way to become{" "}
            <span className="block sm:inline">who you're trying to be.</span>
          </h1>
        </MysteriousClipReveal>

        {/* Value Proposition with Atmospheric Lift */}
        <AtmosphericLift yOffset={8} duration={0.28} delay={0.08}>
          <p className="mt-5 max-w-2xl text-sm sm:text-lg md:text-xl text-[var(--color-text-secondary)] leading-relaxed font-body">
            Not another streak app that shames you for having a life. A quiet,
            mathematically buffered trajectory engine that absorbs life's volatility and
            proves your cumulative velocity.
          </p>
        </AtmosphericLift>

        {/* Inline Fast Reservation Component */}
        <AtmosphericLift yOffset={8} duration={0.28} delay={0.12} className="mt-8 sm:mt-10 w-full max-w-md">
          {fastJoined ? (
            <div className="p-3.5 rounded-2xl debossed-well flex items-center justify-center gap-2 font-tech-mono text-xs text-[var(--color-text-primary)]">
              <span className="flex size-5 items-center justify-center rounded-full bg-zinc-900 text-white dark:bg-white dark:text-zinc-950 shadow-xs">
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
                className="flex-1 px-4 py-3 rounded-full tactile-input text-sm text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)] focus:outline-none focus:border-[var(--color-border-focus)] focus:ring-1 focus:ring-[var(--color-border-focus)] font-body transition-all"
              />
              <Button type="submit" variant="primary" size="md" icon className="shrink-0 shadow-md">
                Reserve Seat
              </Button>
            </form>
          )}

          {/* Quiet Trust Line */}
          <div className="mt-3.5 flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-xs font-tech-mono text-[var(--color-text-muted)]">
            <span className="flex items-center gap-1 font-semibold text-[var(--color-text-primary)]">
              <Check size={12} strokeWidth={2.5} /> Free Forever
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Lock size={11} className="text-[var(--color-text-primary)]" /> 100% Private Offline Vault
            </span>
            <span className="hidden sm:inline">•</span>
            <span className="hidden sm:flex items-center gap-1">
              <ShieldCheck size={11} className="text-[var(--color-text-primary)]" /> Zero Telemetry
            </span>
          </div>
        </AtmosphericLift>

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

      {/* Hero Visual Anchor: Authentic In-App Product Preview Console */}
      <div className="mt-12 sm:mt-16 w-full">
        <ProductSneakPeek />
      </div>
    </section>
  );
}
