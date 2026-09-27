import { useEffect, useState } from "react";
import { Button } from "./Button";
import { ThemeToggle } from "./ThemeToggle";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrolled(window.scrollY > 8);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-[var(--z-sticky)] border-b border-[var(--color-border-default)] bg-[var(--color-bg-page)] transition-shadow duration-[var(--duration-base)] ${
        scrolled ? "shadow-[var(--shadow-sm)]" : ""
      }`}
    >
      <nav
        className="mx-auto flex max-w-7xl items-center justify-between px-6"
        style={{ paddingBlock: "var(--space-4)" }}
        aria-label="Primary"
      >
        <a
          href="#top"
          className="font-[var(--font-display)] flex items-center gap-2 font-[var(--font-weight-semibold)] text-[var(--color-text-primary)]"
        >
          <span
            className="flex h-6 w-6 items-center justify-center rounded-[var(--radius-sm)] border border-[var(--color-border-default)] bg-[var(--color-bg-surface)] text-xs"
            aria-hidden="true"
          >
            T
          </span>
          THE IMPROVEMENT SYSTEM
        </a>

        <div className="flex items-center gap-4">
          <span className="hidden items-center gap-1.5 sm:flex">
            <span className="h-1.5 w-1.5 rounded-[var(--radius-full)] bg-[var(--color-success-600)]" />
            <span className="font-[var(--font-mono)] text-[var(--font-size-xs)] uppercase tracking-[var(--letter-spacing-wide)] text-[var(--color-text-secondary)]">
              Pre-launch
            </span>
          </span>
          <ThemeToggle />
          <Button variant="primary">Request access</Button>
        </div>
      </nav>
    </header>
  );
}
