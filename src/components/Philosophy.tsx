import { Eyebrow } from "./Eyebrow";
import { Reveal } from "./Reveal";

const PARAGRAPHS = [
  "Most tools ask you to log more, tap more, and remember more. So the effort of improving quietly turns into another exhausting administrative chore. The streak shatters on an off-day, the shame spiral arrives, and you start over from zero — again.",
  "The real problem isn't willpower or discipline. It's that traditional systems are static and fragile. They treat a missed day like total personal failure instead of normal human volatility.",
  "Consistency is not an unbroken tally. It is a mathematical vector with momentum, velocity, and resilience. Growth shouldn't require you to hold everything in your head. A calm system should hold it for you.",
];

export function Philosophy() {
  return (
    <section className="mx-auto max-w-4xl px-6 py-16 sm:py-24" aria-labelledby="philosophy-heading">
      <Reveal>
        <Eyebrow variant="badge">FIRST PRINCIPLES</Eyebrow>
      </Reveal>

      <Reveal delayMs={80}>
        <h2
          id="philosophy-heading"
          className="font-display mt-6 text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight tracking-tight text-[var(--color-text-primary)]"
        >
          You don't have a discipline problem.{" "}
          <span className="text-[var(--color-text-muted)]">You have a fragile system problem.</span>
        </h2>
      </Reveal>

      <div className="mt-8 space-y-6">
        {PARAGRAPHS.map((p, i) => (
          <Reveal key={i} delayMs={120 + i * 80}>
            <p className="text-base sm:text-lg text-[var(--color-text-secondary)] leading-relaxed font-body">
              {p}
            </p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
