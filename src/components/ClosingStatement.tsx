import { Reveal } from "./Reveal";
import { Button } from "./Button";
import { useSoundEffects } from "../hooks/useSoundEffects";

export function ClosingStatement() {
  const { playTap } = useSoundEffects();

  const scrollToWaitlist = () => {
    playTap();
    const el = document.getElementById("waitlist");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      className="border-t border-[var(--color-border-default)] px-6 py-20 sm:py-28 text-center relative overflow-hidden"
      aria-label="Closing statement"
    >
      <div className="mx-auto max-w-4xl flex flex-col items-center">
        <Reveal>
          <span className="font-tech-mono text-xs uppercase tracking-widest text-[var(--color-text-muted)] border-t border-[var(--color-border-default)] pt-2 inline-block">
            TRAJECTORY OVER STREAKS
          </span>
          <h2 className="font-display mt-6 text-3xl sm:text-5xl md:text-6xl font-extrabold leading-[1.1] tracking-tight text-[var(--color-text-primary)]">
            You've started over enough.
            <br />
            <span className="text-[var(--color-text-muted)]">
              This time, let a calm system hold the line with you.
            </span>
          </h2>
        </Reveal>

        <Reveal delayMs={80}>
          <p className="mt-6 text-sm sm:text-lg text-[var(--color-text-secondary)] max-w-xl font-body">
            Join the founding cohort of people who want personal momentum to feel quiet, safe, and mathematically real.
          </p>
        </Reveal>

        <Reveal delayMs={140} className="mt-8 sm:mt-10">
          <Button
            variant="primary"
            size="lg"
            icon
            onClick={scrollToWaitlist}
            className="group shadow-md"
          >
            Request Early Access
          </Button>
        </Reveal>
      </div>
    </section>
  );
}
