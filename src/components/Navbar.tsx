import { useEffect, useState } from "react";
import { Button } from "./Button";

interface NavbarProps {
  waitlistCount: number;
}

export function Navbar({ waitlistCount }: NavbarProps) {
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
      className={`fixed top-0 inset-x-0 z-50 transition-colors duration-300 ${
        scrolled ? "bg-black/80 backdrop-blur-md border-b border-white/10" : "bg-transparent"
      }`}
    >
      <nav
        className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4"
        aria-label="Primary"
      >
        <a href="#top" className="flex items-center gap-2 font-semibold text-white">
          <span
            className="flex h-6 w-6 items-center justify-center rounded-md border border-white/20 text-xs"
            aria-hidden="true"
          >
            T
          </span>
          The Improvement System
        </a>

        <div className="flex items-center gap-4">
          <span className="hidden sm:inline font-mono text-xs text-white/50">
            {waitlistCount} on the waitlist
          </span>
          <Button variant="primary" className="text-black">
            Request access
          </Button>
        </div>
      </nav>
    </header>
  );
}
