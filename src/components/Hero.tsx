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
      className="relative mx-auto max-w-6xl px-6 pt-24 sm:pt-32 pb-12 sm:pb-16"
      aria-labelledby="hero-heading"
    >
      <div className="max-w-4xl mx-auto text-center flex flex-col items-center">
        {/* Cohort Scarcity Telemetry Eyebrow with Atmospheric Lift */}
        <AtmosphericLift yOffset={12} blurAmount={4}>
          <Eyebrow variant="badge">COHORT 01 // 250 FOUNDING SEATS FORMING</Eyebrow>
        </AtmosphericLift>

        {/* 3-Second Clarity Headline with Mysterious Clip Reveal & Monochromatic Gradient */}
        <MysteriousClipReveal
          direction="horizontal"
          duration={0.88}
          delay={0.08}
          showLaserGlint={true}
          className="max-w-4xl mx-auto mt-6"
        >
          <h1
            id="hero-heading"
            className="font-display text-4xl sm:text-6xl md:text-7xl font-extrabold leading-[1.06] tracking-tight drop-shadow-[0_1px_2px_rgba(0,0,0,0.05)] dark:drop-shadow-[0_4px_24px_rgba(0,0,0,0.9)]"
          >
            <span className="bg-gradient-to-b from-zinc-900 via-zinc-800 to-zinc-950 dark:from-zinc-100 dark:via-zinc-200 dark:to-zinc-400 bg-clip-text text-transparent block sm:inline">
              A quieter way to become
            </span>{" "}
            <span className="bg-gradient-to-b from-black via-zinc-950 to-black dark:from-white dark:via-zinc-50 dark:to-zinc-200 bg-clip-text text-transparent font-black block sm:inline">
              who you're trying to be.
            </span>
          </h1>
        </MysteriousClipReveal>

        {/* Value Proposition with Atmospheric Lift */}
        <AtmosphericLift yOffset={16} blurAmount={6} duration={0.65} delay={0.16}>
          <p className="mt-6 max-w-2xl text-base sm:text-xl text-[var(--color-text-secondary)] leading-relaxed font-body">
            Not another streak app that shames you for having a life. A quiet,
            mathematically buffered trajectory engine that absorbs life's volatility and
            proves your cumulative velocity.
          </p>
        </AtmosphericLift>

        {/* Inline Fast Reservation Component */}
        <AtmosphericLift yOffset={18} blurAmount={6} duration={0.65} delay={0.24} className="mt-8 sm:mt-10 w-full max-w-md">
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
          <div className="mt-3 flex items-center justify-center gap-3 text-[11px] font-tech-mono text-[var(--color-text-muted)]">
            <span className="flex items-center gap-1 font-semibold text-[var(--color-text-primary)]">
              <Check size={12} strokeWidth={2.5} /> Free Forever
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Lock size={11} className="text-[var(--color-text-primary)]" /> 100% Private Offline Vault
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
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
