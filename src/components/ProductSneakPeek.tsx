import { useState, useRef, useCallback, useEffect, type PointerEvent } from "react";
import { useReducedMotion } from "framer-motion";
import { ShieldCheck, Check, Target, Compass, RotateCcw } from "./ui/Icons";
import { MysteriousClipReveal } from "./motion";
import { useSoundEffects } from "../hooks/useSoundEffects";

interface ProductSneakPeekProps {
  className?: string;
}

export function ProductSneakPeek({ className = "" }: ProductSneakPeekProps) {
  const shouldReduceMotion = useReducedMotion();
  const { playSuccess, playTap } = useSoundEffects();

  // Interactive Trajectory Scrubber State
  const [scrubDay, setScrubDay] = useState<number | null>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  // Focus Action Panel (Swipe to complete) State
  const [focusCompleted, setFocusCompleted] = useState<boolean>(false);
  const [thresholdMet, setThresholdMet] = useState<boolean>(false);
  const trackRef = useRef<HTMLButtonElement>(null);
  const handleRef = useRef<HTMLSpanElement>(null);
  const wavefrontRef = useRef<HTMLDivElement>(null);
  const textMaskRef = useRef<HTMLDivElement>(null);
  const draggingRef = useRef<boolean>(false);
  const dragXRef = useRef<number>(0);
  const rafIdRef = useRef<number | null>(null);

  // 2 Daily Routines State
  const [routine1, setRoutine1] = useState<boolean>(true);
  const [routine2, setRoutine2] = useState<boolean>(true);

  const HANDLE_SIZE = 40;
  const THRESHOLD = 0.65;

  const maxDrag = () => Math.max(0, (trackRef.current?.clientWidth ?? 0) - HANDLE_SIZE - 8);

  const updateDOMPosition = (x: number) => {
    if (handleRef.current) {
      handleRef.current.style.transform = `translate3d(${x}px, -50%, 0)`;
    }
    if (wavefrontRef.current) {
      const w = x > 0 ? x + HANDLE_SIZE : 0;
      wavefrontRef.current.style.width = `${w}px`;
    }
    if (textMaskRef.current) {
      const fadeStart = Math.max(0, x + 8);
      const fadeEnd = x + 38;
      textMaskRef.current.style.maskImage = `linear-gradient(to right, transparent 0px, transparent ${fadeStart}px, black ${fadeEnd}px, black 100%)`;
      textMaskRef.current.style.webkitMaskImage = `linear-gradient(to right, transparent 0px, transparent ${fadeStart}px, black ${fadeEnd}px, black 100%)`;
    }
  };

  const animateSettling = useCallback(
    (x0: number, xt: number, v0: number, onSettled?: () => void) => {
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current);
        rafIdRef.current = null;
      }

      if (shouldReduceMotion) {
        updateDOMPosition(xt);
        dragXRef.current = xt;
        onSettled?.();
        return;
      }

      const startTime = performance.now();
      const omega0 = 0.01844;
      const zeta = 0.922;
      const omegaD = 0.00714;
      const delta = x0 - xt;
      const A = delta;
      const B = (v0 + zeta * omega0 * delta) / omegaD;
      const max = maxDrag();

      const tick = (now: number) => {
        const t = Math.max(0, now - startTime);
        const decay = Math.exp(-zeta * omega0 * t);
        const cosVal = Math.cos(omegaD * t);
        const sinVal = Math.sin(omegaD * t);

        const pos = xt + decay * (A * cosVal + B * sinVal);
        const vel = decay * ((-zeta * omega0 * A + omegaD * B) * cosVal + (-zeta * omega0 * B - omegaD * A) * sinVal);

        const clampedPos = Math.max(0, Math.min(max, pos));
        updateDOMPosition(clampedPos);
        dragXRef.current = clampedPos;

        const isNearRest = Math.abs(pos - xt) < 0.4 && Math.abs(vel) < 0.03;
        if ((t > 40 && isNearRest) || t > 450) {
          updateDOMPosition(xt);
          dragXRef.current = xt;
          rafIdRef.current = null;
          onSettled?.();
        } else {
          rafIdRef.current = requestAnimationFrame(tick);
        }
      };

      rafIdRef.current = requestAnimationFrame(tick);
    },
    [shouldReduceMotion]
  );

  useEffect(() => {
    return () => {
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current);
      }
    };
  }, []);

  const handlePointerDown = (e: PointerEvent<HTMLButtonElement>) => {
    if (focusCompleted) return;
    if (rafIdRef.current) {
      cancelAnimationFrame(rafIdRef.current);
      rafIdRef.current = null;
    }
    trackRef.current?.setPointerCapture(e.pointerId);
    draggingRef.current = true;
    dragXRef.current = 0;
    updateDOMPosition(0);
  };

  const handlePointerMove = (e: PointerEvent<HTMLButtonElement>) => {
    if (!draggingRef.current || focusCompleted) return;
    const rect = trackRef.current?.getBoundingClientRect();
    if (!rect) return;

    const currentX = e.clientX - rect.left - HANDLE_SIZE / 2;
    const max = maxDrag();
    const clampedX = Math.max(0, Math.min(max, currentX));
    dragXRef.current = clampedX;
    updateDOMPosition(clampedX);

    const progress = max > 0 ? clampedX / max : 0;
    const isOverThreshold = progress >= THRESHOLD;
    if (isOverThreshold !== thresholdMet) {
      setThresholdMet(isOverThreshold);
    }
  };

  const handlePointerUp = () => {
    if (!draggingRef.current || focusCompleted) return;
    draggingRef.current = false;
    const max = maxDrag();
    const progress = max > 0 ? dragXRef.current / max : 0;

    if (progress >= THRESHOLD) {
      // Completed!
      updateDOMPosition(max);
      setFocusCompleted(true);
      playSuccess();
      if (typeof navigator !== "undefined" && navigator.vibrate) {
        try {
          navigator.vibrate([15, 60, 25]);
        } catch {
          // ignore
        }
      }
    } else {
      // Settle back to 0
      setThresholdMet(false);
      animateSettling(dragXRef.current, 0, 0);
    }
  };

  const resetFocusSimulation = () => {
    playTap();
    setFocusCompleted(false);
    setThresholdMet(false);
    dragXRef.current = 0;
    updateDOMPosition(0);
  };

  // Trajectory scrub calculation
  const handleSvgPointer = (e: React.PointerEvent<SVGSVGElement>) => {
    const rect = svgRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = e.clientX - rect.left;
    const width = rect.width;
    const day = Math.max(1, Math.min(90, Math.round((x / width) * 90)));
    setScrubDay(day);
  };

  const activeDay = scrubDay ?? 14;
  const currentVelocity = activeDay <= 14 ? "1.25x" : "1.20x";
  const currentMargin = activeDay <= 14 ? "+16d Margin" : "+12d Margin";

  return (
    <div
      id="sneak-peek-frame"
      className={`relative max-w-5xl mx-auto text-left select-none ${className}`}
      aria-label="Kinetic in-app preview console"
    >
      {/* Anchored Floating Telemetry Chips (Desktop only) */}
      <div className="hidden md:flex absolute -top-5 left-4 pointer-events-none z-20">
        <div className="stat-chip px-3.5 py-1.5 text-[11px] text-[var(--color-text-secondary)] font-tech-mono backdrop-blur-xl">
          <span className="size-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-[var(--color-text-primary)] font-bold">
            Velocity: {currentVelocity}
          </span>
          <span className="text-[var(--color-text-muted)]">• {currentMargin}</span>
        </div>
      </div>

      <div className="hidden md:flex absolute -top-5 right-4 pointer-events-none z-20">
        <div className="stat-chip px-3.5 py-1.5 text-[11px] text-[var(--color-text-secondary)] font-tech-mono backdrop-blur-xl">
          <ShieldCheck size={14} className="text-emerald-500" />
          <span className="text-[var(--color-text-primary)] font-bold">
            ±10% Safety Buffer
          </span>
          <span className="text-[var(--color-text-muted)]">• Drift Absorbed</span>
        </div>
      </div>

      {/* Hardware Frame with Liquid Frosted Glass */}
      <MysteriousClipReveal
        direction="center-out"
        duration={0.4}
        delay={0.04}
        showLaserGlint={true}
        className="rounded-2xl md:rounded-3xl"
      >
        <div className="relative rounded-2xl md:rounded-3xl overflow-hidden kinetic-specular-box border border-[var(--color-border-default)]">
          {/* Top Bar HUD Chrome */}
          <div className="flex items-center justify-between px-3 sm:px-6 py-2 sm:py-3 border-b border-[var(--color-border-default)] bg-black/[0.02] dark:bg-white/[0.02] text-xs backdrop-blur-md gap-2">
            <div className="flex items-center gap-1.5 sm:gap-2 min-w-0">
              <span className="size-2 rounded-full bg-zinc-400/60 dark:bg-zinc-600/60 border border-zinc-400/80 dark:border-zinc-500/80 shrink-0" />
              <span className="size-2 rounded-full bg-zinc-400/60 dark:bg-zinc-600/60 border border-zinc-400/80 dark:border-zinc-500/80 shrink-0" />
              <span className="size-2 rounded-full bg-zinc-400/60 dark:bg-zinc-600/60 border border-zinc-400/80 dark:border-zinc-500/80 shrink-0" />
              <span className="ml-1 sm:ml-2 font-tech-mono text-[10px] sm:text-[11px] text-[var(--color-text-muted)] truncate">
                Live Product Console // Trajectory Engine
              </span>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <div className="stat-chip px-2 py-0.5 sm:px-2.5 sm:py-1 text-[9px] sm:text-[10px] font-tech-mono text-[var(--color-text-secondary)]">
                <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="uppercase tracking-wider font-bold text-[var(--color-text-primary)]">
                  Simulation
                </span>
              </div>
            </div>
          </div>

          {/* Living In-App Interface Preview */}
          <div className="p-3 sm:p-6 md:p-8 space-y-4 sm:space-y-6 bg-[var(--color-bg-page)]/40 overflow-hidden">
            {/* SystemBar / Horizon Telemetry Strip */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3 sm:p-4 rounded-xl debossed-well">
              <div className="flex items-center gap-2.5">
                <span className="size-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="font-tech-mono text-xs font-bold text-[var(--color-text-primary)]">
                  CYCLE 01 // DAY {activeDay} OF 90
                </span>
                <span className="hidden sm:inline text-xs font-tech-mono text-[var(--color-text-muted)]">
                  • 90-Day Trajectory Locked
                </span>
              </div>

              <div className="flex items-center gap-2 font-tech-mono text-xs text-[var(--color-text-secondary)]">
                <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 font-semibold text-[10px] sm:text-[11px]">
                  ±10% BUFFER CONE ACTIVE
                </span>
                <span className="hidden sm:inline text-[var(--color-text-muted)]">
                  • 9 Flex Days Intact
                </span>
              </div>
            </div>

            {/* 90-Day Trajectory Engine Visualizer SVG */}
            <div className="p-3 sm:p-6 rounded-xl sm:rounded-2xl kinetic-specular-box border border-[var(--color-border-default)] overflow-hidden">
              <div className="flex items-center justify-between pb-3 mb-2 border-b border-[var(--color-border-default)]">
                <div className="flex items-center gap-2">
                  <Compass size={15} className="text-[var(--color-text-primary)]" />
                  <span className="font-display font-bold text-xs sm:text-sm text-[var(--color-text-primary)]">
                    Trajectory Coordinate Visualizer
                  </span>
                  <span className="font-tech-mono text-[10px] text-[var(--color-text-muted)]">
                    (Hover to scrub vector)
                  </span>
                </div>
                <div className="font-tech-mono text-xs text-[var(--color-text-primary)] font-semibold">
                  Scrub: Day {activeDay} · {currentVelocity}
                </div>
              </div>

              {/* Dynamic Coordinate Chart */}
              <div className="relative h-44 sm:h-56 w-full cursor-crosshair">
                <svg
                  ref={svgRef}
                  className="w-full h-full"
                  viewBox="0 0 760 220"
                  preserveAspectRatio="none"
                  onPointerMove={handleSvgPointer}
                  onPointerLeave={() => setScrubDay(null)}
                >
                  <defs>
                    <linearGradient id="bufferConeFill" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#10b981" stopOpacity="0.08" />
                      <stop offset="100%" stopColor="#10b981" stopOpacity="0.22" />
                    </linearGradient>
                    <linearGradient id="trajectoryLineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#10b981" />
                      <stop offset="70%" stopColor="#34d399" />
                      <stop offset="100%" stopColor="#6ee7b7" />
                    </linearGradient>
                  </defs>

                  {/* Horizontal Grid Coordinates */}
                  <line x1="30" y1="190" x2="730" y2="190" stroke="currentColor" strokeOpacity="0.08" strokeDasharray="3 3" />
                  <line x1="30" y1="130" x2="730" y2="130" stroke="currentColor" strokeOpacity="0.08" strokeDasharray="3 3" />
                  <line x1="30" y1="70" x2="730" y2="70" stroke="currentColor" strokeOpacity="0.08" strokeDasharray="3 3" />

                  {/* Nominal 1.00x Baseline Guide */}
                  <line
                    x1="40"
                    y1="185"
                    x2="720"
                    y2="55"
                    stroke="currentColor"
                    strokeOpacity="0.2"
                    strokeWidth="1.5"
                    strokeDasharray="4 4"
                  />

                  {/* Shaded ±10% Buffer Cone Polygon */}
                  <polygon
                    points="140,165 720,35 720,75 140,175"
                    fill="url(#bufferConeFill)"
                  />
                  <line x1="140" y1="165" x2="720" y2="35" stroke="#10b981" strokeOpacity="0.4" strokeWidth="1" strokeDasharray="3 3" />
                  <line x1="140" y1="175" x2="720" y2="75" stroke="#10b981" strokeOpacity="0.4" strokeWidth="1" strokeDasharray="3 3" />

                  {/* Compounding Kinetic Trajectory Curve */}
                  <path
                    d="M 40,185 C 180,180 240,140 380,105 C 500,75 600,42 720,38"
                    fill="none"
                    stroke="url(#trajectoryLineGrad)"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                  />

                  {/* Origin Marker */}
                  <circle cx="40" cy="185" r="5" fill="currentColor" />
                  <text x="45" y="205" fill="currentColor" fillOpacity="0.5" fontSize="10" fontFamily="monospace">
                    DAY 01 (Origin)
                  </text>

                  {/* Horizon Target Marker */}
                  <circle cx="720" cy="38" r="6" fill="#10b981" />
                  <text x="630" y="25" fill="#10b981" fontWeight="bold" fontSize="11" fontFamily="monospace">
                    DAY 90 (Horizon)
                  </text>

                  {/* Active Scrub Crosshair */}
                  {scrubDay && (
                    <g>
                      <line
                        x1={(scrubDay / 90) * 680 + 40}
                        y1="10"
                        x2={(scrubDay / 90) * 680 + 40}
                        y2="200"
                        stroke="currentColor"
                        strokeWidth="1"
                        strokeDasharray="2 2"
                        strokeOpacity="0.6"
                      />
                      <circle
                        cx={(scrubDay / 90) * 680 + 40}
                        cy={185 - (scrubDay / 90) * 147}
                        r="5"
                        fill="#10b981"
                        className="animate-ping"
                      />
                      <circle
                        cx={(scrubDay / 90) * 680 + 40}
                        cy={185 - (scrubDay / 90) * 147}
                        r="4"
                        fill="#10b981"
                      />
                    </g>
                  )}
                </svg>
              </div>

              {/* Bottom Chart Legend */}
              <div className="mt-3 pt-3 border-t border-[var(--color-border-default)] flex flex-wrap items-center justify-between gap-2 text-[11px] font-tech-mono text-[var(--color-text-muted)]">
                <span className="flex items-center gap-1.5">
                  <span className="size-2 rounded-full bg-emerald-500" />
                  Kinetic Dynamic Vector (1.25x Velocity)
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-3 h-0.5 border-t border-dashed border-[var(--color-text-muted)]" />
                  Nominal Baseline (1.00x)
                </span>
                <span className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400">
                  <ShieldCheck size={12} />
                  ±10% Buffer Cone Corridor
                </span>
              </div>
            </div>

            {/* Daily Execution Grid: Strict 1 Primary Focus + 2 Routines */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-stretch">
              {/* Left: Today's Primary Focus Panel with Physical Swipe Slider */}
              <div className="lg:col-span-7 p-5 rounded-2xl kinetic-specular-box border border-[var(--color-border-default)] flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="flex items-center gap-1.5 text-xs font-tech-mono font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">
                      <Target size={14} /> Today's Focus · 45 min
                    </span>
                    <span className="stat-chip px-2 py-0.5 text-[10px] font-tech-mono text-[var(--color-text-secondary)]">
                      +35% Thrust
                    </span>
                  </div>

                  <h3 className="font-display font-bold text-base sm:text-lg text-[var(--color-text-primary)] leading-snug">
                    Deploy local-first cryptographic vault & trajectory engine
                  </h3>
                  <p className="mt-1 text-xs text-[var(--color-text-secondary)] leading-relaxed font-body">
                    Single needle-moving commitment for Day 14. Once locked, compounds directly into your 90-day trajectory.
                  </p>
                </div>

                {/* The Physical SwipeToComplete Interactive Slider */}
                <div className="mt-5">
                  {focusCompleted ? (
                    <div className="p-3.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-between px-5 transition-all">
                      <span className="flex items-center gap-2 text-xs font-tech-mono font-bold text-emerald-600 dark:text-emerald-400">
                        <Check size={15} strokeWidth={2.5} />
                        Focus Completed • +35% Thrust Injected
                      </span>
                      <button
                        type="button"
                        onClick={resetFocusSimulation}
                        className="text-[11px] font-tech-mono text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] flex items-center gap-1 transition-colors underline cursor-pointer"
                      >
                        <RotateCcw size={11} /> Reset
                      </button>
                    </div>
                  ) : (
                    <button
                      ref={trackRef}
                      type="button"
                      onPointerDown={handlePointerDown}
                      onPointerMove={handlePointerMove}
                      onPointerUp={handlePointerUp}
                      onPointerCancel={handlePointerUp}
                      className={`relative w-full h-12 rounded-full cursor-grab active:cursor-grabbing overflow-hidden select-none transition-colors glass-slider-track ${
                        thresholdMet ? "glass-slider-track-ready" : ""
                      }`}
                      aria-label="Swipe to complete today's primary focus"
                    >
                      {/* Progressive Emerald Wavefront */}
                      <div
                        ref={wavefrontRef}
                        className={`glass-slider-wavefront ${
                          thresholdMet ? "glass-slider-wavefront-ready" : ""
                        }`}
                        style={{ width: "0px" }}
                      />

                      {/* Center Instructional Label with Text Erasure Mask */}
                      <div
                        ref={textMaskRef}
                        className="absolute inset-0 flex items-center justify-center pointer-events-none text-xs font-tech-mono font-medium tracking-wide text-[var(--color-text-secondary)]"
                      >
                        <span>{thresholdMet ? "Release to confirm focus" : "Drag handle to lock focus →"}</span>
                      </div>

                      {/* Tactile Liquid Glass Handle Puck */}
                      <span
                        ref={handleRef}
                        className={`absolute top-1/2 left-1 -translate-y-1/2 size-10 rounded-full flex items-center justify-center pointer-events-none transition-shadow z-10 glass-slider-handle ${
                          thresholdMet ? "glass-slider-handle-ready" : ""
                        }`}
                        style={{ transform: "translate3d(0px, -50%, 0)" }}
                      >
                        <Check size={16} strokeWidth={2.5} className="text-current" />
                      </span>
                    </button>
                  )}
                </div>
              </div>

              {/* Right: The 2 Routine Stabilizers */}
              <div className="lg:col-span-5 p-5 rounded-2xl debossed-well flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-tech-mono text-xs font-bold text-[var(--color-text-primary)] uppercase tracking-wider">
                      2 ROUTINE STABILIZERS
                    </span>
                    <span className="text-[10px] font-tech-mono text-[var(--color-text-muted)]">
                      {(routine1 ? 1 : 0) + (routine2 ? 1 : 0)}/2 Active
                    </span>
                  </div>

                  <div className="space-y-2.5">
                    {/* Routine 1 */}
                    <div
                      onClick={() => {
                        playTap();
                        setRoutine1(!routine1);
                      }}
                      className={`p-3 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                        routine1
                          ? "bg-[var(--color-bg-elevated)] border-emerald-500/30 text-[var(--color-text-primary)]"
                          : "bg-transparent border-black/10 dark:border-white/10 opacity-60 text-[var(--color-text-muted)]"
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <span
                          className={`size-5 rounded-md flex items-center justify-center text-xs transition-colors ${
                            routine1
                              ? "bg-emerald-500 text-white"
                              : "border border-black/20 dark:border-white/20"
                          }`}
                        >
                          {routine1 && <Check size={12} strokeWidth={2.5} />}
                        </span>
                        <div>
                          <span className="font-display font-semibold text-xs block">
                            Morning vector orientation
                          </span>
                          <span className="font-tech-mono text-[10px] text-[var(--color-text-muted)]">
                            10 min · Cadence anchor
                          </span>
                        </div>
                      </div>
                      <span className="text-[10px] font-tech-mono text-emerald-600 dark:text-emerald-400 font-bold">
                        {routine1 ? "LOCKED" : "PENDING"}
                      </span>
                    </div>

                    {/* Routine 2 */}
                    <div
                      onClick={() => {
                        playTap();
                        setRoutine2(!routine2);
                      }}
                      className={`p-3 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                        routine2
                          ? "bg-[var(--color-bg-elevated)] border-emerald-500/30 text-[var(--color-text-primary)]"
                          : "bg-transparent border-black/10 dark:border-white/10 opacity-60 text-[var(--color-text-muted)]"
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <span
                          className={`size-5 rounded-md flex items-center justify-center text-xs transition-colors ${
                            routine2
                              ? "bg-emerald-500 text-white"
                              : "border border-black/20 dark:border-white/20"
                          }`}
                        >
                          {routine2 && <Check size={12} strokeWidth={2.5} />}
                        </span>
                        <div>
                          <span className="font-display font-semibold text-xs block">
                            Evening trajectory reflection
                          </span>
                          <span className="font-tech-mono text-[10px] text-[var(--color-text-muted)]">
                            5 min · Trajectory closure
                          </span>
                        </div>
                      </div>
                      <span className="text-[10px] font-tech-mono text-emerald-600 dark:text-emerald-400 font-bold">
                        {routine2 ? "LOCKED" : "PENDING"}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Subtext info */}
                <div className="mt-4 pt-3 border-t border-black/10 dark:border-white/10 flex items-center justify-between text-[10px] font-tech-mono text-[var(--color-text-muted)]">
                  <span>Strict Constraint: 1 Focus + 2 Routines</span>
                  <span>100% Offline Vault</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </MysteriousClipReveal>
    </div>
  );
}
