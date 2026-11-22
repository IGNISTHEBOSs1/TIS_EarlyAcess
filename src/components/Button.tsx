import type { ButtonHTMLAttributes, ReactNode, MouseEvent } from "react";
import { ArrowRight } from "./ui/Icons";
import { useSoundEffects } from "../hooks/useSoundEffects";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  children: ReactNode;
  icon?: boolean;
}

export function Button({
  variant = "primary",
  size = "md",
  children,
  icon = false,
  className = "",
  onClick,
  ...rest
}: ButtonProps) {
  const { playButtonPress } = useSoundEffects();

  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    playButtonPress();
    onClick?.(e);
  };

  const base =
    "inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-colors duration-150 select-none disabled:opacity-40 disabled:cursor-not-allowed tactile-press focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus-ring-color)]";

  const sizeClasses = {
    sm: "px-3.5 py-1.5 text-xs min-h-[36px]",
    md: "px-5 py-2.5 text-sm min-h-[44px]",
    lg: "px-7 py-3 text-base min-h-[50px]",
  }[size];

  const variantClasses = {
    primary:
      "bg-[var(--color-text-primary)] text-[var(--color-bg-page)] shadow-sm hover:opacity-90 active:scale-[0.98]",
    secondary:
      "bg-[var(--color-bg-surface)] text-[var(--color-text-primary)] border border-[var(--color-border-default)] hover:bg-[var(--color-bg-elevated)] active:scale-[0.98]",
    outline:
      "bg-transparent text-[var(--color-text-primary)] border border-[var(--color-border-default)] hover:border-[var(--color-text-primary)] hover:bg-black/[0.03] dark:hover:bg-white/[0.04] active:scale-[0.98]",
    ghost:
      "bg-transparent text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-black/[0.04] dark:hover:bg-white/[0.05] active:scale-[0.98]",
  }[variant];

  return (
    <button
      className={`${base} ${sizeClasses} ${variantClasses} ${className}`}
      onClick={handleClick}
      {...rest}
    >
      <span>{children}</span>
      {icon && (
        <ArrowRight
          size={14}
          className="transition-transform duration-150 group-hover:translate-x-0.5"
        />
      )}
    </button>
  );
}
