const WORDS = [
  "Deterministic Trajectory",
  "±10% Buffer Cone",
  "Local-First Vault",
  "1 Focus + 2 Routines",
  "Quiet Momentum",
  "Zero Telemetry",
  "Encrypted Storage",
];

/**
 * Continuous horizontal marquee.
 * Strictly Monochromatic kinetic marquee ticker with subtle border highlights.
 */
export function MarqueeBelt() {
  const loop = [...WORDS, ...WORDS];

  return (
    <div
      className="relative overflow-hidden border-y border-[var(--color-border-default)] py-8 bg-black/[0.01] dark:bg-white/[0.01]"
      aria-hidden="true"
    >
      <div className="flex w-max animate-marquee gap-12 sm:gap-16">
        {[...loop, ...loop].map((word, i) => (
          <span
            key={i}
            className="flex items-center gap-12 sm:gap-16 font-display text-2xl sm:text-3xl font-bold uppercase tracking-tight text-[var(--color-text-primary)]/20 transition-colors"
          >
            <span>{word}</span>
            <span className="font-tech-mono text-sm text-[var(--color-text-primary)]/10">
              //
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}
