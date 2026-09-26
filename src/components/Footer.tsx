export function Footer() {
  return (
    <footer className="border-t border-[var(--color-border-default)] px-6 py-8">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 sm:flex-row">
        <a href="#top" className="flex items-center gap-2 font-semibold text-[var(--color-text-primary)]">
          <span
            className="flex h-6 w-6 items-center justify-center rounded-md border border-[var(--color-border-default)] bg-[var(--color-bg-surface)] text-xs"
            aria-hidden="true"
          >
            T
          </span>
          The Improvement System
        </a>
        <p className="font-[var(--font-mono)] text-xs text-[var(--color-neutral-500)]">
          © {new Date().getFullYear()} · Built in public · Pre-launch
        </p>
      </div>
    </footer>
  );
}
