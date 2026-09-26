import type { ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "ghost";
  children: ReactNode;
  icon?: boolean;
}

/**
 * Single button implementation for the whole page, styled from the
 * UX4G design system tokens (theme.css) via arbitrary-value classes —
 * no hardcoded colors. Focus ring is intentionally NOT set here:
 * theme.css defines a global :focus-visible rule, so every interactive
 * element gets a consistent, compliant ring automatically.
 */
export function Button({
  variant = "primary",
  children,
  icon = false,
  className = "",
  ...rest
}: ButtonProps) {
  const base =
    "inline-flex items-center gap-2 rounded-[var(--radius-md)] px-6 font-[var(--font-weight-medium)] transition-all duration-[var(--duration-base)] ease-[var(--easing-standard)] disabled:opacity-50 disabled:cursor-not-allowed";
  // Minimum touch target height per theme.css's --touch-target-min (44px)
  const sizing = "min-h-[var(--touch-target-min)]";

  const variants: Record<string, string> = {
    primary:
      "bg-[var(--color-primary-600)] text-[var(--color-text-on-primary)] hover:bg-[var(--color-primary-700)] active:scale-[0.98] shadow-[var(--shadow-sm)]",
    ghost:
      "bg-transparent text-[var(--color-text-secondary)] border border-[var(--color-border-default)] hover:border-[var(--color-primary-600)] hover:text-[var(--color-text-primary)]",
  };

  return (
    <button className={`${base} ${sizing} ${variants[variant]} ${className}`} {...rest}>
      {children}
      {icon && (
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          aria-hidden="true"
          className="transition-transform duration-[var(--duration-base)] group-hover:translate-x-0.5"
        >
          <path
            d="M3.5 8h9M8.5 4l4 4-4 4"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )}
    </button>
  );
}
