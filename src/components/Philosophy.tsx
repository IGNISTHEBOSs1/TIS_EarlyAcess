import { Eyebrow } from "./Eyebrow";
import { Reveal } from "./Reveal";

const PARAGRAPHS = [
  "Most tools ask you to log more, tap more, and remember more. So the effort of improving quietly becomes another thing to manage. The streak breaks, the guilt arrives, and you start over — again.",
  "The real problem isn't motivation. It's that your progress is invisible. You can't feel it, so you stop trusting it. And what you can't feel, you eventually abandon.",
  "Growth shouldn't require you to hold everything in your head. Something should be holding it for you.",
];

export function Philosophy() {
  return (
    <section className="mx-auto max-w-3xl px-6 pt-16 sm:pt-16" aria-labelledby="philosophy-heading">
      <Reveal>
        <Eyebrow>Why nothing sticks</Eyebrow>
      </Reveal>

      <Reveal delayMs={80}>
        <h2
          id="philosophy-heading"
          className="mt-6 max-w-2xl text-3xl font-bold leading-tight tracking-tight sm:text-4xl"
        >
          <span className="text-[var(--color-text-primary)]">You don't have a discipline problem. You</span>{" "}
          <span className="text-[var(--color-neutral-500)]">have a system problem.</span>
        </h2>
      </Reveal>

      <div className="mt-8 space-y-6">
        {PARAGRAPHS.map((p, i) => (
          <Reveal key={i} delayMs={120 + i * 90} as="p">
            <p className="max-w-xl text-[var(--color-text-secondary)]">{p}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
