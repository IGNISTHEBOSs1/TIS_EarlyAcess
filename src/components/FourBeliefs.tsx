import { Eyebrow } from "./Eyebrow";
import { Reveal } from "./Reveal";

interface Belief {
  number: string;
  tag: string;
  title: string;
  body: string;
}

const BELIEFS: Belief[] = [
  {
    number: "01",
    tag: "CALM SUBSTRATE",
    title: "The system stays invisible.",
    body: "You don't manage the tool. It works underneath your day — quietly organizing direction, effort, and reflection so you can spend your attention on living, not endless logging.",
  },
  {
    number: "02",
    tag: "DETERMINISTIC VECTOR",
    title: "Progress is made tangible.",
    body: "Effort you can't perceive is effort you stop trusting. Kinetic calculates your cumulative momentum into clear mathematical trajectory you can actually feel, so continuing feels obvious.",
  },
  {
    number: "03",
    tag: "COGNITIVE PROTECTION",
    title: "Fewer decisions, deeper ones.",
    body: "Instead of overwhelming 20-item checklists, you get a strict constraint of 1 Primary Focus + 2 Supporting Routines each day. Simplicity is the feature that preserves your willpower.",
  },
  {
    number: "04",
    tag: "REAL LIFE RESPECT",
    title: "You are not a character in a game.",
    body: "No fantasy hunter ranks, no XP bars, no cartoon badges. Improvement is treated with the seriousness of your real life — because that's exactly what it is.",
  },
];

export function FourBeliefs() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-16 sm:py-24" aria-labelledby="beliefs-heading">
      <Reveal>
        <Eyebrow variant="badge">FOUNDATIONAL ARCHITECTURE</Eyebrow>
      </Reveal>

      <Reveal delayMs={80}>
        <h2
          id="beliefs-heading"
          className="font-display mt-6 text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-[var(--color-text-primary)] leading-[1.12]"
        >
          Built on four quiet beliefs.
        </h2>
        <p className="mt-4 max-w-xl text-sm sm:text-base text-[var(--color-text-secondary)] leading-relaxed">
          Every screen, algorithm, and interaction in Kinetic is governed by these core invariants.
        </p>
      </Reveal>

      <div className="mt-12 grid gap-6 sm:grid-cols-2">
        {BELIEFS.map((b, i) => (
          <Reveal
            key={b.number}
            delayMs={i * 60}
            className="kinetic-specular-box p-6 sm:p-8 rounded-2xl border border-[var(--color-border-default)] flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="font-tech-mono text-xs uppercase tracking-widest text-[var(--color-text-muted)]">
                  {b.tag}
                </span>
                <span
                  aria-hidden="true"
                  className="font-tech-mono font-bold text-lg text-[var(--color-text-primary)]"
                >
                  {b.number}
                </span>
              </div>
              <h3 className="font-display text-xl font-bold text-[var(--color-text-primary)] tracking-tight">
                {b.title}
              </h3>
              <p className="mt-3 text-xs sm:text-sm text-[var(--color-text-secondary)] leading-relaxed font-body">
                {b.body}
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-[var(--color-border-default)] flex items-center justify-between text-[10px] font-tech-mono text-[var(--color-text-muted)]">
              <span>CANONICAL INVARIANT</span>
              <span>VERIFIED</span>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
