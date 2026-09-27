import { Eyebrow } from "./Eyebrow";
import { Reveal } from "./Reveal";
import { DashboardMockup } from "./DashboardMockup";

export function MomentsShowcase() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-12 sm:py-16" aria-labelledby="moments-heading">
      <Reveal>
        <Eyebrow>A look inside</Eyebrow>
      </Reveal>

      <Reveal delayMs={80}>
        <h2
          id="moments-heading"
          className="font-[var(--font-display)] mt-6 max-w-2xl text-4xl font-bold leading-tight tracking-tight text-[var(--color-text-primary)] sm:text-5xl"
        >
          Three moments that matter.
        </h2>
        <p className="mt-4 max-w-xl text-[var(--color-text-secondary)]">
          Not a tour of settings. The few experiences the whole system is
          built around.
        </p>
      </Reveal>

      <div className="mt-12 grid gap-6 lg:grid-cols-[1.6fr_1fr]">
        {/* Left: the big card — Direction, held for you */}
        <Reveal delayMs={40} className="rounded-[var(--radius-lg)] border border-[var(--color-border-default)] p-6 sm:p-8">
          <Eyebrow>Direction, held for you</Eyebrow>
          <p className="mt-4 max-w-md text-[var(--color-text-secondary)]">
            Each day resolves into a handful of moves that actually point
            somewhere. The rest stays out of sight until it's needed.
          </p>
          <DashboardMockup className="mt-6" />
        </Reveal>

        {/* Right column: two stacked cards */}
        <div className="flex flex-col gap-6">
          <Reveal delayMs={80} className="rounded-[var(--radius-lg)] border border-[var(--color-border-default)] p-6 sm:p-8">
            <Eyebrow>Evening reflection</Eyebrow>
            <blockquote className="mt-4 text-xl font-semibold leading-snug tracking-tight text-[var(--color-text-primary)]">
              "Today I avoided the hard thing. Tomorrow I start with it."
            </blockquote>
            <div className="mt-5 flex flex-wrap gap-2">
              {["clarity", "resistance", "honest"].map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-[var(--color-border-default)] px-2.5 py-0.5 font-[var(--font-mono)] text-[11px] text-[var(--color-text-secondary)]"
                >
                  {tag}
                </span>
              ))}
            </div>
          </Reveal>

          <Reveal delayMs={120} className="flex-1 rounded-[var(--radius-lg)] border border-[var(--color-border-default)] p-6 sm:p-8">
            <Eyebrow>A quiet signal</Eyebrow>
            <p className="mt-4 flex items-start gap-3 text-[var(--color-text-secondary)]">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--color-primary-600)]" />
              <span>
                You've kept your word to yourself six days running. This is
                what momentum feels like before it looks like anything.
              </span>
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
