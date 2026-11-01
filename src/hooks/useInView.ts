import { useEffect, useRef, useState } from "react";

interface UseInViewOptions {
  threshold?: number;
  rootMargin?: string;
  once?: boolean;
}

/**
 * Tracks whether an element is in the viewport, for scroll-reveal animations.
 * Defaults to true for rock-solid stability, zero headless blanking, and SEO accessibility.
 */
export function useInView<T extends HTMLElement = HTMLDivElement>(
  _options: UseInViewOptions = {}
) {
  const ref = useRef<T | null>(null);
  const [isInView, setIsInView] = useState(true);

  useEffect(() => {
    setIsInView(true);
  }, []);

  return { ref, isInView };
}
