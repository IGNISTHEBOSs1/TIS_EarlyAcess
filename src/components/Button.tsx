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
    "inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-all duration-150 select-none disabled:opacity-40 disabled:cursor-not-allowed tactile-press focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus-ring-color)]";

  const sizeClasses = {
    sm: "px-3.5 py-1.5 text-xs min-h-[36px]",
    md: "px-5 py-2.5 text-sm min-h-[44px]",
    lg: "px-7 py-3 text-base min-h-[50px]",
  }[size];

  const variantClasses = {
    primary:
      "bg-zinc-900 text-white dark:bg-white dark:text-zinc-950 shadow-[0_2px_8px_rgba(0,0,0,0.15),inset_0_1px_1px_rgba(255,255,255,0.25)] dark:shadow-[0_4px_16px_rgba(255,255,255,0.12),inset_0_1px_1px_rgba(255,255,255,0.9)] hover:opacity-95 hover:shadow-md",
    secondary:
      "bg-zinc-200/80 text-zinc-900 dark:bg-zinc-800/80 dark:text-zinc-100 border border-black/5 dark:border-white/10 hover:bg-zinc-300/80 dark:hover:bg-zinc-700/80",
    outline:
      "bg-transparent text-[var(--color-text-primary)] border border-[var(--color-border-default)] hover:border-[var(--color-text-primary)] hover:bg-black/[0.03] dark:hover:bg-white/[0.04]",
    ghost:
      "bg-transparent text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-black/[0.04] dark:hover:bg-white/[0.05]",
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
