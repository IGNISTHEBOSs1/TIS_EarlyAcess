const WORDS = ["Progress", "Follow-through", "Identity", "Direction", "Momentum"];

/**
 * Continuous horizontal marquee. Duplicating the word list once and
 * animating a -50% translateX loop is the standard CSS-only approach —
 * avoids JS-driven position updates causing re-renders every frame.
 */
export function MarqueeBelt() {
  const loop = [...WORDS, ...WORDS];

  return (
    <div
      className="relative overflow-hidden border-y border-[var(--color-border-default)] py-10"
      aria-hidden="true"
    >
      <div className="flex w-max animate-marquee gap-16">
        {[...loop, ...loop].map((word, i) => (
          <span
            key={i}
            className="flex items-center gap-16 text-4xl font-semibold text-[var(--color-text-primary)]/25 sm:text-5xl"
          >
            {word}
            <span className="text-[var(--color-text-primary)]/10">·</span>
          </span>
        ))}
      </div>
    </div>
  );
}
