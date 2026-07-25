import type { ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "ghost";
  children: ReactNode;
  icon?: boolean;
}

/**
 * Single button implementation for the whole page. The recording shows
 * the same pill-shaped white button reused for every CTA ("Request
 * access", "Request early access", "Join the waitlist") — this replaces
 * what was almost certainly copy-pasted markup per instance.
 */
export function Button({
  variant = "primary",
  children,
  icon = false,
  className = "",
  ...rest
}: ButtonProps) {
  const base =
    "inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-medium transition-all duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/60 disabled:opacity-50 disabled:cursor-not-allowed";

  const variants: Record<string, string> = {
    primary:
      "bg-white text-black hover:bg-white/90 active:scale-[0.98] shadow-sm",
    ghost:
      "bg-transparent text-white border border-white/15 hover:border-white/30 hover:bg-white/5",
  };

  return (
    <button className={`${base} ${variants[variant]} ${className}`} {...rest}>
      {children}
      {icon && (
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          aria-hidden="true"
          className="transition-transform duration-200 group-hover:translate-x-0.5"
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
