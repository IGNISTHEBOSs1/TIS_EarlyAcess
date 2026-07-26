import { Reveal } from "./Reveal";

const POINTS = [
  "Improving quietly becomes another thing to manage. The streak breaks, the guilt arrives, you start over.",
  "The real problem isn't motivation — it's that progress is invisible. What you can't feel, you eventually abandon.",
  "Growth shouldn't require you to hold it all in your head. Something should be holding it for you.",
];

export function Philosophy() {
  return (
    <section className="mx-auto max-w-3xl px-6 pt-32 sm:pt-40" aria-labelledby="philosophy-heading">
      <h2 id="philosophy-heading" className="sr-only">
        The philosophy behind the system
      </h2>

      <div className="space-y-5">
        {POINTS.map((point, i) => (
          <Reveal key={i} delayMs={i * 90} as="p">
            <p className="font-display text-2xl font-semibold leading-snug tracking-tight text-white/90 sm:text-3xl">
              {point}
            </p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
