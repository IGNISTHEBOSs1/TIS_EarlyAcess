import { Reveal } from "./Reveal";
import { Button } from "./Button";

export function ClosingStatement() {
  return (
    <section className="border-t border-white/10 px-6 py-40 sm:py-48 text-center" aria-label="Closing statement">
      <Reveal>
        <p className="heading-fringe font-display mx-auto max-w-3xl text-3xl font-semibold leading-snug tracking-tight text-white sm:text-4xl">
          You've started over enough. This time, let something hold the line
          with you.
        </p>
      </Reveal>

      <Reveal delayMs={80}>
        <p className="mt-6 text-white/50">
          Join the people who want progress to feel real again.
        </p>
      </Reveal>

      <Reveal delayMs={140} className="mt-8 flex justify-center">
        <Button variant="primary" className="text-black">
          Request early access
        </Button>
      </Reveal>
    </section>
  );
}
