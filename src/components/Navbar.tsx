import { useEffect, useState } from "react";
import { Button } from "./Button";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    // Passive listener + rAF throttle keeps this cheap on scroll.
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
      className={`fixed top-0 inset-x-0 z-50 border-b transition-colors duration-300 ${
        scrolled
          ? "bg-[#0d0d0d]/95 border-white/10 shadow-[0_1px_0_0_rgba(255,255,255,0.05)]"
          : "bg-[#0a0a0a]/80 border-white/5"
      }`}
    >
      {/* subtle top highlight to sell the glass edge, like light catching the top of a pane */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
      <nav
        className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4"
        aria-label="Primary"
      >
        <a href="#top" className="flex items-center gap-2 font-semibold text-white">
          <span
            className="flex h-6 w-6 items-center justify-center rounded-md border border-white/20 bg-white/5 text-xs"
            aria-hidden="true"
          >
            T
          </span>
          The Improvement System
        </a>

        <div className="flex items-center gap-4">
          <span className="hidden items-center gap-1.5 sm:flex">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400/80" />
            <span className="font-mono text-xs text-white/50">Pre-launch</span>
          </span>
          <Button variant="primary" className="text-black">
            Request access
          </Button>
        </div>
      </nav>
    </header>
  );
}
