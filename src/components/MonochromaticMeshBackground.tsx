import { useEffect, useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useTheme } from "../hooks/useTheme";

/**
 * Monochromatic Kinetic Motion Background
 * Strictly Monochromatic: Dual-mode harmonic trajectory waves, traveling data particles
 * with comet trails, precision coordinate grid, and ambient diffusions.
 */
export function MonochromaticMeshBackground() {
  const shouldReduceMotion = useReducedMotion();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mousePosRef = useRef({ x: 0.5, y: 0.5 });
  const { isDark } = useTheme();

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mousePosRef.current.x = e.clientX / window.innerWidth;
      mousePosRef.current.y = e.clientY / window.innerHeight;
    };
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useEffect(() => {
    if (shouldReduceMotion) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.scale(dpr, dpr);

    const handleResize = () => {
      if (!canvas) return;
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);
    };
    window.addEventListener("resize", handleResize);

    // 5 Harmonic trajectory waves calibrated for dark and light monochromatic palettes
    const waveLines = isDark
      ? [
          { amp: 32, freq: 0.0011, speed: 0.65, color: "rgba(255, 255, 255, 0.38)", yOffset: height * 0.18, lineWidth: 2.0 },
          { amp: 44, freq: 0.0009, speed: 0.5, color: "rgba(255, 255, 255, 0.44)", yOffset: height * 0.36, lineWidth: 2.4 },
          { amp: 28, freq: 0.0013, speed: 0.75, color: "rgba(228, 228, 231, 0.32)", yOffset: height * 0.54, lineWidth: 1.8 },
          { amp: 38, freq: 0.001, speed: 0.45, color: "rgba(212, 212, 216, 0.28)", yOffset: height * 0.72, lineWidth: 1.8 },
          { amp: 46, freq: 0.0007, speed: 0.35, color: "rgba(161, 161, 170, 0.22)", yOffset: height * 0.88, lineWidth: 1.6 },
        ]
      : [
          { amp: 32, freq: 0.0011, speed: 0.65, color: "rgba(24, 24, 27, 0.30)", yOffset: height * 0.18, lineWidth: 2.0 },
          { amp: 44, freq: 0.0009, speed: 0.5, color: "rgba(24, 24, 27, 0.36)", yOffset: height * 0.36, lineWidth: 2.4 },
          { amp: 28, freq: 0.0013, speed: 0.75, color: "rgba(39, 39, 42, 0.26)", yOffset: height * 0.54, lineWidth: 1.8 },
          { amp: 38, freq: 0.001, speed: 0.45, color: "rgba(63, 63, 70, 0.22)", yOffset: height * 0.72, lineWidth: 1.8 },
          { amp: 46, freq: 0.0007, speed: 0.35, color: "rgba(82, 82, 91, 0.18)", yOffset: height * 0.88, lineWidth: 1.6 },
        ];

    // 20 Traveling trajectory data particles with comet trails
    const particles = Array.from({ length: 20 }, (_, i) => ({
      x: (i / 20) * width,
      waveIndex: i % 5,
      speed: 0.35 + (i % 4) * 0.18,
      radius: i % 3 === 0 ? 2.8 : i % 2 === 0 ? 2.2 : 1.6,
      history: [] as { x: number; y: number }[],
    }));

    let time = 0;
    const render = () => {
      time += 0.005;
      ctx.clearRect(0, 0, width, height);

      const mx = mousePosRef.current.x;
      const my = mousePosRef.current.y;

      // Render waves
      waveLines.forEach((wave) => {
        ctx.beginPath();
        ctx.strokeStyle = wave.color;
        ctx.lineWidth = wave.lineWidth;
        for (let x = 0; x <= width; x += 8) {
          const mouseDist = Math.hypot(x / width - mx, wave.yOffset / height - my);
          const mouseInfluence = Math.max(0, 1 - mouseDist * 2.2) * 20;
          const y =
            wave.yOffset +
            Math.sin(x * wave.freq + time * wave.speed) * wave.amp +
            Math.cos(x * wave.freq * 0.5 + time * 0.5) * 8 +
            mouseInfluence;
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
      });

      // Render traveling particles
      particles.forEach((p) => {
        p.x = (p.x + p.speed) % width;
        const wave = waveLines[p.waveIndex];
        const mouseDist = Math.hypot(p.x / width - mx, wave.yOffset / height - my);
        const mouseInfluence = Math.max(0, 1 - mouseDist * 2.2) * 20;
        const y =
          wave.yOffset +
          Math.sin(p.x * wave.freq + time * wave.speed) * wave.amp +
          Math.cos(p.x * wave.freq * 0.5 + time * 0.5) * 8 +
          mouseInfluence;

        p.history.push({ x: p.x, y });
        if (p.history.length > 5) p.history.shift();

        // Comet tail
        if (p.history.length > 1) {
          ctx.beginPath();
          ctx.moveTo(p.history[0].x, p.history[0].y);
          for (let h = 1; h < p.history.length; h++) {
            ctx.lineTo(p.history[h].x, p.history[h].y);
          }
          ctx.strokeStyle = isDark ? "rgba(255, 255, 255, 0.24)" : "rgba(24, 24, 27, 0.18)";
          ctx.lineWidth = p.radius * 0.8;
          ctx.stroke();
        }

        // Core particle
        ctx.beginPath();
        ctx.arc(p.x, y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = isDark ? "rgba(255, 255, 255, 0.95)" : "rgba(24, 24, 27, 0.85)";
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
    };
  }, [shouldReduceMotion, isDark]);

  const { scrollYProgress } = useScroll();
  const orb1Y = useTransform(scrollYProgress, [0, 1], [-20, 80]);
  const orb2Y = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const orb3Y = useTransform(scrollYProgress, [0, 1], [0, 60]);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0" aria-hidden="true">
      {/* Precision Trajectory Coordinate Grid */}
      <div
        className="absolute inset-0 opacity-[0.08] dark:opacity-[0.10] text-[var(--color-text-primary)] transition-opacity"
        style={{
          backgroundImage: `linear-gradient(currentColor 1px, transparent 1px), linear-gradient(90deg, currentColor 1px, transparent 1px)`,
          backgroundSize: "40px 40px",
          maskImage: "radial-gradient(ellipse at center, rgba(0,0,0,1) 45%, rgba(0,0,0,0.15) 90%)",
          WebkitMaskImage: "radial-gradient(ellipse at center, rgba(0,0,0,1) 45%, rgba(0,0,0,0.15) 90%)",
        }}
      />

      {/* Kinetic Monochromatic Wave Canvas */}
      {!shouldReduceMotion && (
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full opacity-100" />
      )}

      {/* Ambient Volumetric Parallax Diffusions */}
      <motion.div
        style={{ y: orb1Y }}
        className="absolute -top-32 -left-24 w-[520px] h-[520px] rounded-full bg-zinc-400/[0.14] dark:bg-white/[0.05] blur-[140px] pointer-events-none"
      />
      <motion.div
        style={{ y: orb2Y }}
        className="absolute top-1/2 -right-32 w-[480px] h-[480px] rounded-full bg-zinc-500/[0.12] dark:bg-zinc-700/15 blur-[150px] pointer-events-none"
      />
      <motion.div
        style={{ y: orb3Y }}
        className="absolute -bottom-32 left-1/3 w-[460px] h-[460px] rounded-full bg-zinc-400/[0.14] dark:bg-white/[0.04] blur-[140px] pointer-events-none"
      />
    </div>
  );
}
