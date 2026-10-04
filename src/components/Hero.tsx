import { Eyebrow } from "./Eyebrow";
import { Button } from "./Button";
import { Reveal } from "./Reveal";
import { TrajectoryVisualizer } from "./TrajectoryVisualizer";
import { ShieldCheck, Lock, Target, Compass } from "./ui/Icons";
import { useSoundEffects } from "../hooks/useSoundEffects";

export function Hero() {
  const { playTap } = useSoundEffects();

  const scrollToWaitlist = () => {
    playTap();
    const el = document.getElementById("waitlist");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const scrollToBuffer = () => {
    playTap();
    const el = document.getElementById("buffer-engine");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="top"
      className="relative mx-auto max-w-6xl px-6 pt-24 sm:pt-32 pb-16"
      aria-labelledby="hero-heading"
    >
      <div className="max-w-4xl mx-auto text-center flex flex-col items-center">
        <Reveal>
          <Eyebrow variant="badge">KINETIC PROTOCOL // COHORT 01 PRE-LAUNCH</Eyebrow>
        </Reveal>

        <Reveal delayMs={80}>
          <h1
            id="hero-heading"
            className="font-display mt-6 text-4xl sm:text-6xl md:text-7xl font-extrabold leading-[1.08] tracking-tight text-[var(--color-text-primary)]"
          >
            A quieter way to become who you're trying to be.
          </h1>
        </Reveal>

        <Reveal delayMs={160}>
          <p className="mt-6 max-w-2xl text-base sm:text-xl text-[var(--color-text-secondary)] leading-relaxed font-body">
            Not another streak app that shames you for having a life. A local-first,
            mathematically buffered trajectory engine that absorbs life's volatility and
            proves your cumulative velocity.
          </p>
        </Reveal>

        <Reveal delayMs={240}>
          <div className="mt-8 sm:mt-10 flex flex-wrap items-center justify-center gap-4">
            <Button
              variant="primary"
              size="lg"
              icon
              onClick={scrollToWaitlist}
              className="group shadow-md"
            >
              Reserve Early Access
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={scrollToBuffer}
            >
              Simulate Buffer Math
            </Button>
          </div>
          <p className="mt-3 font-tech-mono text-xs text-[var(--color-text-muted)]">
            Cohort 01 Limited · Zero credit card · 100% Free forever local tier
          </p>
        </Reveal>

        {/* 4 Invariant Trust & Safety Badges */}
        <Reveal delayMs={300} className="mt-10 sm:mt-12 w-full">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-left">
            <div className="p-3 sm:p-4 rounded-xl border border-[var(--color-border-default)] bg-[var(--color-bg-surface)] flex items-start gap-3 shadow-xs">
              <Lock size={16} className="text-[var(--color-text-primary)] shrink-0 mt-0.5" />
              <div>
                <span className="font-display text-xs font-bold text-[var(--color-text-primary)] block">
                  Local-First Vault
                </span>
                <span className="font-tech-mono text-[10px] text-[var(--color-text-muted)] block mt-0.5">
                  Client-side encrypted
                </span>
              </div>
            </div>

            <div className="p-3 sm:p-4 rounded-xl border border-[var(--color-border-default)] bg-[var(--color-bg-surface)] flex items-start gap-3 shadow-xs">
              <Compass size={16} className="text-[var(--color-text-primary)] shrink-0 mt-0.5" />
              <div>
                <span className="font-display text-xs font-bold text-[var(--color-text-primary)] block">
                  ±10% Buffer Cone
                </span>
                <span className="font-tech-mono text-[10px] text-[var(--color-text-muted)] block mt-0.5">
                  Absorbs off-days safely
                </span>
              </div>
            </div>

            <div className="p-3 sm:p-4 rounded-xl border border-[var(--color-border-default)] bg-[var(--color-bg-surface)] flex items-start gap-3 shadow-xs">
              <Target size={16} className="text-[var(--color-text-primary)] shrink-0 mt-0.5" />
              <div>
                <span className="font-display text-xs font-bold text-[var(--color-text-primary)] block">
                  1 Focus + 2 Routines
                </span>
                <span className="font-tech-mono text-[10px] text-[var(--color-text-muted)] block mt-0.5">
                  Cognitive load capped
                </span>
              </div>
            </div>

            <div className="p-3 sm:p-4 rounded-xl border border-[var(--color-border-default)] bg-[var(--color-bg-surface)] flex items-start gap-3 shadow-xs">
              <ShieldCheck size={16} className="text-[var(--color-text-primary)] shrink-0 mt-0.5" />
              <div>
                <span className="font-display text-xs font-bold text-[var(--color-text-primary)] block">
                  Zero Telemetry
                </span>
                <span className="font-tech-mono text-[10px] text-[var(--color-text-muted)] block mt-0.5">
                  No tracking pixels
                </span>
              </div>
            </div>
          </div>
        </Reveal>
      </div>

      {/* Trajectory Simulation Engine */}
      <div id="buffer-engine" className="mt-14 sm:mt-20">
        <Reveal delayMs={360}>
          <TrajectoryVisualizer />
        </Reveal>
      </div>
    </section>
  );
}
