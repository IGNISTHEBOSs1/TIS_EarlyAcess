import { Eyebrow } from "./Eyebrow";
import { Button } from "./Button";
import { Reveal } from "./Reveal";
import { DashboardMockup } from "./DashboardMockup";

export function Hero() {
  return (
    <section
      id="top"
      className="relative mx-auto max-w-7xl px-6 pt-16 pb-12 sm:pt-24 sm:pb-12"
      aria-labelledby="hero-heading"
    >
      <Reveal>
        <Eyebrow>Pre-launch · Building in public</Eyebrow>
      </Reveal>

      <Reveal delayMs={80}>
        <h1
          id="hero-heading"
          className="font-[var(--font-display)] mt-6 max-w-4xl text-5xl font-bold leading-[1.05] tracking-tight text-[var(--color-text-primary)] sm:text-6xl md:text-7xl"
        >
          A quieter way to become who you're trying to be.
        </h1>
      </Reveal>

      <Reveal delayMs={160}>
        <p className="mt-6 max-w-xl text-lg text-[var(--color-text-secondary)]">
          Not another tracker to manage. A personal system that holds your
          direction, notices your progress, and gives it back to you as
          something you can feel.
        </p>
      </Reveal>

      <Reveal delayMs={240}>
        <div className="mt-8 flex flex-wrap items-center gap-4">
          <Button variant="primary" icon className="group">
            Request early access
          </Button>
          <span className="font-[var(--font-mono)] text-xs text-[var(--color-neutral-500)]">
            One email. No spam. Leave whenever.
          </span>
        </div>
      </Reveal>

      <Reveal delayMs={320} className="mt-16">
        <DashboardMockup />
      </Reveal>
    </section>
  );
}
