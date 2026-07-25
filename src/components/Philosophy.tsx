import { Reveal } from "./Reveal";

const PARAGRAPHS = [
  "Most systems for improving quietly become another thing to manage. The streak breaks, the guilt arrives, and you start over — again.",
  "The real problem isn't motivation. It's that your progress is invisible. You can't feel it, so you stop trusting it. And what you can't feel, you eventually abandon.",
  "Growth shouldn't require you to hold everything in your head. Something should be holding it for you.",
];

export function Philosophy() {
  return (
    <section className="mx-auto max-w-3xl px-6 pt-32 sm:pt-40" aria-labelledby="philosophy-heading">
      <h2 id="philosophy-heading" className="sr-only">
        The philosophy behind the system
      </h2>

      <div className="space-y-6">
        {PARAGRAPHS.map((p, i) => (
          <Reveal key={i} delayMs={i * 100} as="p">
            <p className="text-lg leading-relaxed text-white/70 first:text-white">{p}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
