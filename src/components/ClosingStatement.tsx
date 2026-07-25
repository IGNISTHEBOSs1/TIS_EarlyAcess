import { Reveal } from "./Reveal";

export function ClosingStatement() {
  return (
    <section className="border-t border-white/10 px-6 py-40 sm:py-48 text-center" aria-label="Closing statement">
      <Reveal>
        <p className="mx-auto max-w-3xl text-3xl font-semibold leading-snug text-white sm:text-4xl">
          You've started over enough. This time, let something hold the line
          with you.
        </p>
      </Reveal>
    </section>
  );
}
