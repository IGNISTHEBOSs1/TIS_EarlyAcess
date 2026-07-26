import { Reveal } from "./Reveal";

interface Point {
  lead: string;
  rest: string;
}

const POINTS: Point[] = [
  {
    lead: "Improving quietly becomes another thing to manage.",
    rest: "The streak breaks, the guilt arrives, you start over.",
  },
  {
    lead: "The real problem isn't motivation.",
    rest: "It's that progress is invisible — what you can't feel, you eventually abandon.",
  },
  {
    lead: "Growth shouldn't live only in your head.",
    rest: "Something should be holding it for you.",
  },
];

export function Philosophy() {
  return (
    <section className="mx-auto max-w-3xl px-6 pt-32 sm:pt-40" aria-labelledby="philosophy-heading">
      <h2 id="philosophy-heading" className="sr-only">
        The philosophy behind the system
      </h2>

      <div className="space-y-10">
        {POINTS.map((point, i) => (
          <Reveal key={i} delayMs={i * 90} as="div" className="flex gap-5">
            <span
              aria-hidden="true"
              className="mt-1.5 w-8 shrink-0 border-t-2 border-white/25 sm:mt-2.5"
            />
            <p className="font-display text-2xl font-semibold leading-snug tracking-tight sm:text-3xl">
              <span className="text-white">{point.lead}</span>{" "}
              <span className="text-white/40">{point.rest}</span>
            </p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
