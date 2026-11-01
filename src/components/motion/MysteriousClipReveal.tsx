import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { KINETIC_EASINGS } from "../../lib/motion-tokens";

interface MysteriousClipRevealProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  direction?: "horizontal" | "vertical" | "center-out";
  className?: string;
  showLaserGlint?: boolean;
}

export function MysteriousClipReveal({
  children,
  delay = 0,
  duration = 0.35,
  direction = "horizontal",
  className = "",
  showLaserGlint = false,
}: MysteriousClipRevealProps) {
  const shouldReduce = useReducedMotion();

  if (shouldReduce) {
    return <div className={className}>{children}</div>;
  }

  const isHorizontal = direction === "horizontal";
  const isCenterOut = direction === "center-out";

  const initialClip = isCenterOut
    ? "inset(0 50% 0 50%)"
    : isHorizontal
    ? "inset(0 100% 0 0)"
    : "inset(100% 0 0 0)";

  const animateClip = "inset(0 0% 0 0)";

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* Masked Content Layer */}
      <motion.div
        initial={{
          clipPath: initialClip,
          opacity: 0.2,
        }}
        animate={{
          clipPath: animateClip,
          opacity: 1,
        }}
        transition={{
          duration,
          delay,
          ease: KINETIC_EASINGS.exitDecel,
        }}
      >
        {children}
      </motion.div>

      {/* Laser Glint Accent Edge */}
      {showLaserGlint && (
        <motion.div
          initial={{ left: "-30%", opacity: 0 }}
          animate={{ left: "130%", opacity: [0, 0.85, 0] }}
          transition={{
            duration: duration * 1.35,
            delay: delay + 0.05,
            ease: KINETIC_EASINGS.exitDecel,
          }}
          className="pointer-events-none absolute inset-y-0 w-24 -skew-x-12 bg-gradient-to-r from-transparent via-white/40 dark:via-white/20 to-transparent blur-[2px]"
          aria-hidden="true"
        />
      )}
    </div>
  );
}
