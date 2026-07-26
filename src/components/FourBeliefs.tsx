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
    <section className="mx-auto max-w-6xl px-6 py-32 sm:py-40" aria-labelledby="beliefs-heading">
      <Reveal>
        <Eyebrow>The philosophy</Eyebrow>
      </Reveal>

      <Reveal delayMs={80}>
        <h2
          id="beliefs-heading"
          className="font-display mt-6 text-4xl font-bold tracking-tight text-white sm:text-5xl"
        >
          Built on four beliefs.
        </h2>
      </Reveal>

      <div className="mt-20 grid gap-x-12 gap-y-16 sm:grid-cols-2">
        {BELIEFS.map((b, i) => (
          <Reveal key={b.number} delayMs={i * 60}>
            <span
              aria-hidden="true"
              className="font-display inline-flex h-16 w-16 items-center justify-center rounded-2xl border border-white/15 bg-white/[0.06] text-2xl font-bold text-white/70 backdrop-blur-md shadow-[inset_0_1px_0_0_rgba(255,255,255,0.15)] sm:h-20 sm:w-20 sm:text-3xl"
            >
              {b.number}
            </span>
            <h3 className="font-display mt-2 text-xl font-semibold tracking-tight text-white">
              {b.title}
            </h3>
            <p className="mt-3 max-w-md text-white/60">{b.body}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
