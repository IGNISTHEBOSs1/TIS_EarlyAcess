import { Eyebrow } from "./Eyebrow";
import { Reveal } from "./Reveal";
import { DashboardMockup } from "./DashboardMockup";

export function MomentsShowcase() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-16 sm:py-24" aria-labelledby="moments-heading">
      <Reveal>
        <Eyebrow variant="badge">IN-PRODUCT CADENCE</Eyebrow>
      </Reveal>

      <Reveal delayMs={80}>
        <h2
          id="moments-heading"
          className="font-display mt-6 max-w-2xl text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight tracking-tight text-[var(--color-text-primary)]"
        >
          Three moments that matter.
        </h2>
        <p className="mt-4 max-w-xl text-sm sm:text-base text-[var(--color-text-secondary)] leading-relaxed">
          Not a labyrinth of complex settings. The quiet, high-signal loop the entire system is built around.
        </p>
      </Reveal>

      <div className="mt-12 grid gap-6 lg:grid-cols-[1.5fr_1fr]">
        {/* Left: Direction, held for you */}
        <Reveal delayMs={100} className="kinetic-specular-box p-6 sm:p-8 rounded-2xl md:rounded-3xl border border-[var(--color-border-default)]">
          <Eyebrow>01 // MORNING CLARITY</Eyebrow>
          <h3 className="font-display text-xl sm:text-2xl font-bold text-[var(--color-text-primary)] mt-3">
            Direction, held for you
          </h3>
          <p className="mt-2 text-xs sm:text-sm text-[var(--color-text-secondary)] max-w-md leading-relaxed">
            Each morning resolves into exactly 1 decisive Focus and 2 lightweight Routines. The rest stays completely invisible until needed.
          </p>
          <div className="mt-6">
            <DashboardMockup />
          </div>
        </Reveal>

        {/* Right column: Evening reflection + Quiet signal */}
        <div className="flex flex-col gap-6">
          <Reveal delayMs={160} className="kinetic-specular-box p-6 sm:p-8 rounded-2xl md:rounded-3xl border border-[var(--color-border-default)]">
            <Eyebrow>02 // EVENING CLOSING</Eyebrow>
            <h3 className="font-display text-xl font-bold text-[var(--color-text-primary)] mt-3">
              Low-friction reflection
            </h3>
            <blockquote className="mt-4 text-base sm:text-lg font-semibold leading-snug tracking-tight text-[var(--color-text-primary)] border-l-2 border-[var(--color-text-primary)] pl-3">
              "Today I avoided the difficult refactor. Tomorrow I lock it as the primary move."
            </blockquote>
            <div className="mt-5 flex flex-wrap gap-2">
              {["clarity", "resistance", "unbroken"].map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-[var(--color-border-default)] bg-[var(--color-bg-surface)] px-2.5 py-0.5 font-tech-mono text-[11px] text-[var(--color-text-secondary)]"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </Reveal>

          <Reveal delayMs={220} className="kinetic-specular-box p-6 sm:p-8 rounded-2xl md:rounded-3xl border border-[var(--color-border-default)] flex-1 flex flex-col justify-between">
            <div>
              <Eyebrow>03 // TELEMETRY INSIGHT</Eyebrow>
              <h3 className="font-display text-xl font-bold text-[var(--color-text-primary)] mt-3">
                A quiet velocity signal
              </h3>
              <p className="mt-3 text-xs sm:text-sm text-[var(--color-text-secondary)] leading-relaxed">
                You've honored your commitments 6 days straight. The mathematical buffer has widened by 1.8%. This is what trajectory feels like before it becomes visible to the outside world.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-[var(--color-border-default)] flex items-center justify-between font-tech-mono text-[10px] text-[var(--color-text-muted)]">
              <span>STATUS // RESILIENT</span>
              <span>BUFFER // TOLERANT</span>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
