import { Eyebrow } from "./Eyebrow";
import { Reveal } from "./Reveal";

interface Belief {
  number: string;
  title: string;
  body: string;
}

const BELIEFS: Belief[] = [
  {
    number: "01",
    title: "The system stays invisible.",
    body: "You don't manage the tool. It works underneath your day — quietly organizing direction, effort and reflection so you can spend your attention on living, not logging.",
  },
  {
    number: "02",
    title: "Progress is made tangible.",
    body: "Effort you can't perceive is effort you stop trusting. The system reflects your momentum back to you in a form you can actually feel, so continuing feels obvious.",
  },
  {
    number: "03",
    title: "Fewer decisions, deeper ones.",
    body: "Instead of endless features, you get a small number of meaningful moves each day — chosen with you, in service of who you're becoming. Simplicity is the feature.",
  },
  {
    number: "04",
    title: "You are not a character in a game.",
    body: "No points, no levels, no fantasy avatar. Improvement is treated with the seriousness of your real life — because that's exactly what it is.",
  },
];

export function FourBeliefs() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-16 sm:py-24" aria-labelledby="beliefs-heading">
      <Reveal>
        <Eyebrow>The philosophy</Eyebrow>
      </Reveal>

      <Reveal delayMs={80}>
        <h2
          id="beliefs-heading"
          className="font-[var(--font-display)] mt-6 text-[var(--font-size-3xl)] font-[var(--font-weight-bold)] text-[var(--color-text-primary)]"
        >
          Built on four beliefs.
        </h2>
      </Reveal>

      <div className="mt-12 grid gap-x-12 gap-y-10 sm:grid-cols-2">
        {BELIEFS.map((b, i) => (
          <Reveal key={b.number} delayMs={i * 60}>
            <span
              aria-hidden="true"
              className="block font-[var(--font-weight-bold)] text-[var(--font-size-2xl)] text-[var(--color-primary-500)]"
            >
              {b.number}
            </span>
            <h3 className="mt-2 text-[var(--font-size-lg)] font-[var(--font-weight-semibold)] text-[var(--color-text-primary)]">
              {b.title}
            </h3>
            <p className="mt-3 max-w-md text-[var(--color-text-secondary)]">{b.body}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
