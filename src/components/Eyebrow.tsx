interface EyebrowProps {
  children: string;
  className?: string;
}

/**
 * The small tracked-out monospace labels above section headings
 * ("PRE-LAUNCH · BUILDING IN PUBLIC", "THE PHILOSOPHY", "A LOOK INSIDE",
 * "BEFORE YOU ASK", "THE WAITLIST"). Extracted since the same visual
 * pattern repeats before nearly every section.
 */
export function Eyebrow({ children, className = "" }: EyebrowProps) {
  return (
    <p
      className={`font-mono text-[11px] tracking-[0.2em] text-white/40 uppercase border-b border-white/15 pb-2 inline-block ${className}`}
    >
      {children}
    </p>
  );
}
