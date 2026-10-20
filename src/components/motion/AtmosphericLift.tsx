import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { KINETIC_EASINGS } from "../../lib/motion-tokens";

interface AtmosphericLiftProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  yOffset?: number;
  blurAmount?: number;
  className?: string;
  triggerOnce?: boolean;
}

export function AtmosphericLift({
  children,
  delay = 0,
  duration = 0.38,
  yOffset = 8,
  blurAmount = 4,
  className = "",
  triggerOnce = true,
}: AtmosphericLiftProps) {
  const shouldReduce = useReducedMotion();

  if (shouldReduce) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: yOffset,
        filter: `blur(${blurAmount}px)`,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
      }}
      viewport={{ once: triggerOnce, margin: "-6% 0px" }}
      transition={{
        duration,
        delay,
        ease: KINETIC_EASINGS.exitDecel,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
