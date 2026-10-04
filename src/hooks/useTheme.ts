import { useEffect, useState } from "react";

export type Theme = "light" | "dark";

const STORAGE_KEY = "tis-theme";

function getInitialTheme(): Theme {
  if (typeof window === "undefined") return "light";
  const stored = window.localStorage.getItem(STORAGE_KEY);
  if (stored === "light" || stored === "dark") return stored;
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

/**
 * Manages dual-mode SOLAR (clean paper canvas) and LUNAR (deep obsidian canvas).
 * Synchronizes documentElement dataset.theme and the 'dark' CSS class so both
 * Tailwind dark: utilities and custom neoskeuomorphic CSS tokens respond instantly.
 */
export function useTheme() {
  const [theme, setThemeState] = useState<Theme>(getInitialTheme);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    try {
      window.localStorage.setItem(STORAGE_KEY, theme);
    } catch {
      // Ignore private storage restrictions
    }
  }, [theme]);

  const toggle = () => setThemeState((t) => (t === "light" ? "dark" : "light"));
  const setTheme = (t: Theme) => setThemeState(t);

  return { theme, toggle, setTheme, isDark: theme === "dark" };
}
