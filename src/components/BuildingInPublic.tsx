import { Eyebrow } from "./Eyebrow";
import { Reveal } from "./Reveal";

interface TimelineEntry {
  when: string;
  tag: string;
  title: string;
  body: string;
}

const ENTRIES: TimelineEntry[] = [
  {
    when: "PHASE 01 // NOW",
    tag: "COHORT 01 ENROLLMENT",
    title: "Waitlist validation & architecture audit",
    body: "We're validating our core invariants before shipping the desktop and web builds. If this philosophy resonates with you, your early feedback directly shapes our v1 engine.",
  },
  {
    when: "PHASE 02 // IN PROGRESS",
    tag: "CORE RUNTIME ALPHA",
    title: "1 Focus + 2 Routines + Buffer cone engine",
    body: "Implementing the mathematical buffer corridor: calculating velocity curves, quiet morning focus selection, and evening capture without scoreboard gamification.",
  },
  {
    when: "PHASE 03 // UPCOMING",
    tag: "SECURITY VAULT",
    title: "Client-side WebCrypto & offline zero-leak vault",
    body: "Finalizing encrypted browser storage (IndexedDB) with zero external telemetry endpoints. Verifiable through open developer tools before broad public distribution.",
  },
];

export function BuildingInPublic() {
  return (
    <section
      className="mx-auto max-w-4xl px-6 py-16 sm:py-24"
      aria-labelledby="building-in-public-heading"
    >
      <Reveal>
        <Eyebrow variant="badge">TRANSPARENT ENGINEERING</Eyebrow>
      </Reveal>

      <Reveal delayMs={80}>
        <h2
          id="building-in-public-heading"
          className="font-display mt-6 max-w-2xl text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight tracking-tight text-[var(--color-text-primary)]"
        >
          No fake reviews. No fabricated urgency.{" "}
          <span className="text-[var(--color-text-muted)]">Just honest engineering.</span>
        </h2>
        <p className="mt-4 max-w-xl text-sm sm:text-base text-[var(--color-text-secondary)] leading-relaxed">
          We'd rather show you exactly where we are than borrow synthetic credibility. Here is our engineering cadence, completely in the open.
        </p>
      </Reveal>

      <div className="mt-12 space-y-6">
        {ENTRIES.map((entry, i) => (
          <Reveal
            key={entry.tag}
            delayMs={i * 80}
            className="kinetic-specular-box p-6 sm:p-7 rounded-2xl border border-[var(--color-border-default)]"
          >
            <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
              <span className="font-tech-mono text-xs uppercase tracking-wider text-[var(--color-text-primary)] font-bold">
                {entry.when}
              </span>
              <span className="rounded-full border border-[var(--color-border-default)] bg-[var(--color-bg-surface)] px-2.5 py-0.5 font-tech-mono text-[10px] uppercase tracking-wider text-[var(--color-text-secondary)]">
                {entry.tag}
              </span>
            </div>
            <h3 className="font-display text-lg sm:text-xl font-bold text-[var(--color-text-primary)]">
              {entry.title}
            </h3>
            <p className="mt-2 text-xs sm:text-sm text-[var(--color-text-secondary)] leading-relaxed font-body">
              {entry.body}
            </p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
