import { createElement } from "react";
import type { ElementType, ReactNode } from "react";
import { useInView } from "../hooks/useInView";

interface RevealProps {
  children: ReactNode;
  className?: string;
  delayMs?: number;
  as?: ElementType;
}

/**
 * Wraps content that smoothly animates into place.
 * Always renders visible by default so screen readers and headless screenshots never blank.
 */
export function Reveal({ children, className = "", delayMs = 0, as = "div" }: RevealProps) {
  const { ref, isInView } = useInView<HTMLElement>();

  return createElement(
    as,
    {
      ref,
      className: `transition-all duration-300 ease-out will-change-transform ${
        isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
      } ${className}`,
      style: { transitionDelay: isInView ? `${delayMs}ms` : "0ms" },
    },
    children
  );
}
