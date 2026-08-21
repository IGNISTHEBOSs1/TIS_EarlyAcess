import { Eyebrow } from "./Eyebrow";
import { Reveal } from "./Reveal";

interface TimelineEntry {
  when: string;
  tag: string;
  body: string;
}

const ENTRIES: TimelineEntry[] = [
  {
    when: "Now",
    tag: "Waitlist open",
    body: "We're validating the positioning before writing another line of product. If this resonates, your email genuinely shapes what we build first.",
  },
  {
    when: "This month",
    tag: "Core loop",
    body: "Designing the daily loop: how the system chooses a few meaningful moves with you, and how it reflects momentum back without turning life into a scoreboard.",
  },
  {
    when: "Earlier",
    tag: "Principles",
    body: "Settled the non-negotiables — invisible system, tangible progress, no gamification. Everything is measured against these four beliefs.",
  },
];

export function BuildingInPublic() {
  return (
    <section
      className="mx-auto max-w-3xl px-6 pt-32 pb-16 sm:pt-40 sm:pb-20"
      aria-labelledby="building-in-public-heading"
    >
      <Reveal>
        <Eyebrow>Building in public</Eyebrow>
      </Reveal>

      <Reveal delayMs={80}>
        <h2
          id="building-in-public-heading"
          className="heading-fringe font-display mt-6 max-w-xl text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl"
        >
          No users yet. No fake reviews. <span className="text-white/40">Just honest progress.</span>
        </h2>
        <p className="mt-4 max-w-md text-white/60">
          We'd rather show you where we actually are than borrow credibility
          we haven't earned. Here's the work, in the open.
        </p>
      </Reveal>

      <ol className="mt-16 pl-8">
        {ENTRIES.map((entry, i) => {
          const isLast = i === ENTRIES.length - 1;
          return (
            <Reveal
              key={entry.when}
              delayMs={i * 80}
              as="li"
              className={`relative ${!isLast ? "pb-12" : ""}`}
            >
              {/* dot */}
              <span
                aria-hidden="true"
                className="absolute -left-8 top-1.5 h-2 w-2 rounded-full bg-white/70"
              />
              {/* connector: only between this dot and the next one, never past the last item */}
              {!isLast && (
                <span
                  aria-hidden="true"
                  className="absolute -left-8 top-3.5 bottom-0 ml-[3px] w-px bg-white/10"
                />
              )}
              <div className="flex flex-wrap items-center gap-3">
                <span className="font-mono text-xs text-white/40">{entry.when}</span>
                <span className="rounded-full border border-white/15 px-2.5 py-0.5 font-mono text-[11px] uppercase tracking-wide text-white/50">
                  {entry.tag}
                </span>
              </div>
              <p className="mt-3 max-w-xl text-white/70">{entry.body}</p>
            </Reveal>
          );
        })}
      </ol>
    </section>
  );
}
