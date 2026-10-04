import { motion, AnimatePresence } from "framer-motion";
import { Sun, Moon } from "./ui/Icons";
import { useTheme } from "../hooks/useTheme";
import { useSoundEffects } from "../hooks/useSoundEffects";

/**
 * Tactile Neoskeuomorphic Theme Toggle
 * Analog instrument switch with mechanical track, spring physics,
 * rotating solar core and glowing lunar crescent.
 */
export function ThemeToggle() {
  const { isDark, toggle } = useTheme();
  const { playTap } = useSoundEffects();

  const handleToggle = () => {
    playTap();
    toggle();
  };

  return (
    <button
      type="button"
      role="switch"
      aria-checked={isDark}
      aria-label={`Switch to ${isDark ? "light (solar)" : "dark (lunar)"} mode`}
      onClick={handleToggle}
      className={`relative flex items-center h-8 sm:h-9 w-[76px] sm:w-[82px] p-1 rounded-full cursor-pointer select-none transition-all duration-300 border border-black/10 dark:border-white/15 bg-zinc-200/90 dark:bg-zinc-900/90 shadow-[inset_0_2px_4px_rgba(0,0,0,0.14),0_1px_2px_rgba(255,255,255,0.8)] dark:shadow-[inset_0_2px_5px_rgba(0,0,0,0.6),0_1px_1px_rgba(255,255,255,0.08)] hover:border-black/30 dark:hover:border-white/30 active:scale-[0.96] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus-ring-color)] ${
        isDark ? "justify-end" : "justify-start"
      }`}
    >
      {/* Background mechanical track indicators */}
      <div className="absolute inset-0 flex items-center justify-between px-2.5 pointer-events-none select-none">
        <span
          className={`text-[8px] sm:text-[9px] font-[var(--font-mono)] font-bold tracking-widest transition-opacity duration-200 ${
            isDark ? "opacity-100 text-zinc-400" : "opacity-0"
          }`}
        >
          LUNAR
        </span>
        <span
          className={`text-[8px] sm:text-[9px] font-[var(--font-mono)] font-bold tracking-widest transition-opacity duration-200 ml-auto ${
            !isDark ? "opacity-100 text-zinc-600" : "opacity-0"
          }`}
        >
          SOLAR
        </span>
      </div>

      {/* Kinetic Knob with spring physics & celestial core */}
      <motion.div
        layout
        transition={{ type: "spring", stiffness: 420, damping: 26 }}
        className="size-6 sm:size-7 rounded-full flex items-center justify-center relative z-10 bg-white dark:bg-zinc-800 text-[var(--color-text-primary)] shadow-[inset_0_1px_1px_rgba(255,255,255,0.95),0_2px_6px_rgba(0,0,0,0.2)] dark:shadow-[inset_0_1px_1px_rgba(255,255,255,0.22),0_2px_8px_rgba(0,0,0,0.6)]"
      >
        <AnimatePresence mode="wait" initial={false}>
          {isDark ? (
            <motion.div
              key="moon"
              initial={{ rotate: -90, scale: 0.5, opacity: 0 }}
              animate={{ rotate: 0, scale: 1, opacity: 1 }}
              exit={{ rotate: 90, scale: 0.5, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="relative flex items-center justify-center text-zinc-100"
            >
              <Moon size={14} className="fill-zinc-100" />
            </motion.div>
          ) : (
            <motion.div
              key="sun"
              initial={{ rotate: 90, scale: 0.5, opacity: 0 }}
              animate={{ rotate: 0, scale: 1, opacity: 1 }}
              exit={{ rotate: -90, scale: 0.5, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="relative flex items-center justify-center text-zinc-950"
            >
              <Sun size={14} strokeWidth={2.4} />
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 size-3.5 border border-zinc-950/25 rounded-full border-dashed pointer-events-none"
              />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </button>
  );
}
