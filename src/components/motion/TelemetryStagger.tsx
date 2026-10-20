import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { KINETIC_EASINGS } from "../../lib/motion-tokens";

interface TelemetryStaggerContainerProps {
  children: React.ReactNode;
  staggerDelay?: number;
  initialDelay?: number;
  className?: string;
  triggerOnce?: boolean;
}

export function TelemetryStaggerContainer({
  children,
  staggerDelay = 0.04,
  initialDelay = 0,
  className = "",
  triggerOnce = true,
}: TelemetryStaggerContainerProps) {
  const shouldReduce = useReducedMotion();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduce ? 0 : staggerDelay,
        delayChildren: shouldReduce ? 0 : initialDelay,
      },
    },
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: triggerOnce, margin: "-8% 0px" }}
      variants={containerVariants}
      className={className}
    >
      {children}
    </motion.div>
  );
}

interface TelemetryStaggerItemProps {
  children: React.ReactNode;
  className?: string;
  yOffset?: number;
  blurAmount?: number;
  duration?: number;
}

export function TelemetryStaggerItem({
  children,
  className = "",
  yOffset = 8,
  blurAmount = 4,
  duration = 0.32,
}: TelemetryStaggerItemProps) {
  const shouldReduce = useReducedMotion();

  const itemVariants = {
    hidden: {
      opacity: 0,
      y: shouldReduce ? 0 : yOffset,
      filter: shouldReduce ? "none" : `blur(${blurAmount}px)`,
    },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        duration,
        ease: KINETIC_EASINGS.exitDecel,
      },
    },
  };

  return (
    <motion.div variants={itemVariants} className={className}>
      {children}
    </motion.div>
  );
}
