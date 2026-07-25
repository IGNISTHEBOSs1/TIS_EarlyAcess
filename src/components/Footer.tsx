export function Footer() {
  return (
    <footer className="border-t border-white/10 px-6 py-10">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 sm:flex-row">
        <p className="font-mono text-xs text-white/30">
          © {new Date().getFullYear()} The Improvement System
        </p>
        <p className="font-mono text-xs text-white/30">Built quietly, in public.</p>
      </div>
    </footer>
  );
}
