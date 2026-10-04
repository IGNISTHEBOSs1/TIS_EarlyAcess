import type { ReactNode } from "react";

interface EyebrowProps {
  children: ReactNode;
  variant?: "line" | "badge";
  className?: string;
}

/**
 * Technical Eyebrow Label
 * Displays telemetry tags and section identifiers in JetBrains Mono with wide tracking.
 */
export function Eyebrow({ children, variant = "line", className = "" }: EyebrowProps) {
  if (variant === "badge") {
    return (
      <div
        className={`inline-flex items-center gap-2 rounded-full border border-[var(--color-border-default)] bg-[var(--color-bg-surface)] px-3 py-1 font-[var(--font-mono)] text-xs text-[var(--color-text-secondary)] shadow-xs ${className}`}
      >
        <span className="h-1.5 w-1.5 rounded-full bg-zinc-900 dark:bg-zinc-100" />
        <span className="uppercase tracking-widest">{children}</span>
      </div>
    );
  }

  return (
    <div
      className={`inline-flex items-center gap-2 font-[var(--font-mono)] text-xs uppercase tracking-widest text-[var(--color-text-secondary)] border-t border-[var(--color-border-default)] pt-2 ${className}`}
    >
      <span className="h-1 w-1 rounded-full bg-[var(--color-text-secondary)]" />
      <span>{children}</span>
    </div>
  );
}
