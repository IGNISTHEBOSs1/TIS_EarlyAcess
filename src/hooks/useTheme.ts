import { useEffect, useState } from "react";

type Theme = "light" | "dark";

const STORAGE_KEY = "tis-theme";

function getInitialTheme(): Theme {
  if (typeof window === "undefined") return "light";
  const stored = window.localStorage.getItem(STORAGE_KEY);
  if (stored === "light" || stored === "dark") return stored;
  // Respect system preference on first visit, default to light per the
  // reference (light screenshot is the primary/first-listed variant).
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

/**
 * Applies the theme as a data-attribute on <html> (matched by
 * [data-theme="dark"] in theme.css) and persists the choice. Runs the
 * initial application synchronously on first render via useState's
 * initializer so there's no flash of the wrong theme on mount.
 */
export function useTheme() {
  const [theme, setTheme] = useState<Theme>(getInitialTheme);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    window.localStorage.setItem(STORAGE_KEY, theme);
  }, [theme]);

  const toggle = () => setTheme((t) => (t === "light" ? "dark" : "light"));

  return { theme, toggle };
}
