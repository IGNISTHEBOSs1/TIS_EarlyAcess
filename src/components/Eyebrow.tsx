interface EyebrowProps {
  children: string;
  className?: string;
}

/**
 * Small tracked-out label above section headings. Restyled to theme.css
 * tokens: neutral secondary text, standard border color, the system's
 * defined wide letter-spacing token rather than an arbitrary value.
 */
export function Eyebrow({ children, className = "" }: EyebrowProps) {
  return (
    <p
      className={`font-[var(--font-mono)] text-[var(--font-size-xs)] uppercase text-[var(--color-text-secondary)] border-t border-[var(--color-border-default)] pt-[var(--space-2)] inline-block ${className}`}
      style={{ letterSpacing: "var(--letter-spacing-wide)" }}
    >
      {children}
    </p>
  );
}
