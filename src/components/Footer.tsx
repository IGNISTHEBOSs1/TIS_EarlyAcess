export function Footer() {
  return (
    <footer className="border-t border-white/10 px-6 py-8">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 sm:flex-row">
        <a href="#top" className="flex items-center gap-2 font-semibold text-white">
          <span
            className="flex h-6 w-6 items-center justify-center rounded-md border border-white/20 bg-white/5 text-xs"
            aria-hidden="true"
          >
            T
          </span>
          The Improvement System
        </a>
        <p className="font-mono text-xs text-white/30">
          © {new Date().getFullYear()} · Built in public · Pre-launch
        </p>
      </div>
    </footer>
  );
}
