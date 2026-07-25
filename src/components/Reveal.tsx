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
 * Wraps content that should fade + rise into place on scroll.
 * Single source of truth for the reveal animation used across every
 * section, instead of each section duplicating transition classes.
 * Uses createElement (rather than a generic JSX tag) so the element
 * type doesn't have to be threaded through JSX.IntrinsicElements,
 * which blows up TS's type-checker on a polymorphic "as" prop.
 */
export function Reveal({ children, className = "", delayMs = 0, as = "div" }: RevealProps) {
  const { ref, isInView } = useInView<HTMLElement>();

  return createElement(
    as,
    {
      ref,
      className: `transition-all duration-700 ease-out will-change-transform ${
        isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
      } ${className}`,
      style: { transitionDelay: isInView ? `${delayMs}ms` : "0ms" },
    },
    children
  );
}
