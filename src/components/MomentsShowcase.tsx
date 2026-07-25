import { Eyebrow } from "./Eyebrow";
import { Reveal } from "./Reveal";
import { DashboardPreview } from "./DashboardPreview";

export function MomentsShowcase() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-16" aria-labelledby="moments-heading">
      <Reveal>
        <Eyebrow>A look inside</Eyebrow>
      </Reveal>

      <Reveal delayMs={80}>
        <h2
          id="moments-heading"
          className="mt-6 max-w-2xl text-4xl font-bold leading-tight text-white sm:text-5xl"
        >
          Three moments that matter.
        </h2>
      </Reveal>

      <Reveal delayMs={160} className="mt-12">
        <DashboardPreview />
      </Reveal>

      <Reveal delayMs={220}>
        <blockquote className="mt-8 max-w-xl text-white/60">
          You've kept your word to yourself six days running. This is what
          momentum feels like before it looks like anything.
        </blockquote>
      </Reveal>
    </section>
  );
}
