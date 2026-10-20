import type { Transition } from "framer-motion";

/**
 * Kinetic Motion Standard
 * Standardized spring physics, easing curves, and transition presets.
 * Based on Apple WWDC Fluid Interfaces & Compositor-Only 120fps Rendering.
 */
export const KINETIC_SPRINGS = {
  /**
   * Critically Damped (zeta = 1.0)
   * Decisive, instantaneous, zero oscillation or overshoot.
   */
  settle: {
    type: "spring" as const,
    stiffness: 380,
    damping: 38,
    mass: 1,
  },

  /**
   * Tactile Micro-Snap (zeta ~ 0.78)
   * Crisp mechanical detent with subtle physical weight.
   */
  snap: {
    type: "spring" as const,
    stiffness: 420,
    damping: 26,
    mass: 0.8,
  },

  /**
   * Fluid Gesture / Drag (zeta ~ 0.82)
   * Follows pointer 1:1, settles with inherited release velocity.
   */
  gesture: {
    type: "spring" as const,
    stiffness: 320,
    damping: 30,
    mass: 1,
  },

  /**
   * Heavy Glass Card Float
   * Solid slab of crystal obsidian moving under fingertip.
   */
  cardFloat: {
    type: "spring" as const,
    stiffness: 260,
    damping: 24,
    mass: 1.2,
  },
} as const;

export const KINETIC_EASINGS = {
  /**
   * Ease-Out-Expo: Decisive deceleration into rest.
   */
  exitDecel: [0.16, 1, 0.3, 1] as const,

  /**
   * Ease-Out-Quint: Velvety entrance curve.
   */
  subtleEntrance: [0.22, 1, 0.36, 1] as const,

  /**
   * Precision Smooth-Pursuit: Telemetry visualizers and progress rings.
   */
  precisionInOut: [0.65, 0, 0.35, 1] as const,
} as const;

export const KINETIC_TRANSITIONS = {
  cardHover: {
    ...KINETIC_SPRINGS.cardFloat,
  } satisfies Transition,

  elementEntrance: {
    duration: 0.42,
    ease: KINETIC_EASINGS.subtleEntrance,
  } satisfies Transition,

  modalSheet: {
    ...KINETIC_SPRINGS.settle,
  } satisfies Transition,

  navPill: {
    ...KINETIC_SPRINGS.settle,
  } satisfies Transition,
} as const;
