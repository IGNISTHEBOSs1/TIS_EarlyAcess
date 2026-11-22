import { motion, AnimatePresence } from "framer-motion";
import { Sun, Moon } from "./ui/Icons";
import { useTheme } from "../hooks/useTheme";
import { useSoundEffects } from "../hooks/useSoundEffects";

/**
 * Tactile Neoskeuomorphic Theme Toggle
 * Symmetrical circular instrument switch honoring Kinetic tokens and Hallmark craft.
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
      aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
      onClick={handleToggle}
      className="flex items-center justify-center size-8 sm:size-9 rounded-full border border-[var(--color-border-default)] bg-[var(--color-bg-surface)] text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] tactile-press transition-colors shadow-xs"
    >
      <AnimatePresence mode="wait" initial={false}>
        {isDark ? (
          <motion.div
            key="moon"
            initial={{ rotate: -45, scale: 0.6, opacity: 0 }}
            animate={{ rotate: 0, scale: 1, opacity: 1 }}
            exit={{ rotate: 45, scale: 0.6, opacity: 0 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className="flex items-center justify-center"
          >
            <Moon size={14} />
          </motion.div>
        ) : (
          <motion.div
            key="sun"
            initial={{ rotate: 45, scale: 0.6, opacity: 0 }}
            animate={{ rotate: 0, scale: 1, opacity: 1 }}
            exit={{ rotate: -45, scale: 0.6, opacity: 0 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className="flex items-center justify-center"
          >
            <Sun size={14} strokeWidth={2.2} />
          </motion.div>
        )}
      </AnimatePresence>
    </button>
  );
}
