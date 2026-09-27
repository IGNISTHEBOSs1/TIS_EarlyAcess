import { useTheme } from "../hooks/useTheme";

/**
 * Sun/moon toggle switch, matching the reference navbar. A visually
 * hidden checkbox drives the actual state so this is keyboard- and
 * screen-reader-operable like any other toggle, with the sliding knob
 * as pure decoration on top.
 */
export function ThemeToggle() {
  const { theme, toggle } = useTheme();
  const isDark = theme === "dark";

  return (
    <label className="relative inline-flex cursor-pointer items-center">
      <input
        type="checkbox"
        role="switch"
        aria-checked={isDark}
        checked={isDark}
        onChange={toggle}
        className="peer sr-only"
      />
      <span
        aria-hidden="true"
        className="flex h-7 w-14 items-center rounded-[var(--radius-full)] border border-[var(--color-border-default)] bg-[var(--color-bg-surface)] px-1 transition-colors duration-[var(--duration-base)] peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-[var(--color-border-focus)]"
      >
        <span
          className={`flex h-5 w-5 items-center justify-center rounded-[var(--radius-full)] bg-[var(--color-primary-600)] text-[10px] text-[var(--color-text-on-primary)] transition-transform duration-[var(--duration-base)] ${
            isDark ? "translate-x-[26px]" : "translate-x-0"
          }`}
        >
          {isDark ? "🌙" : "☀"}
        </span>
      </span>
      <span className="sr-only">
        {isDark ? "Switch to light mode" : "Switch to dark mode"}
      </span>
    </label>
  );
}
