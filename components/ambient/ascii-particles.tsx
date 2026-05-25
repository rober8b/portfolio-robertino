"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "motion/react";

const GLYPHS = [".", "·", "+", "/", "\\", "*", "·", "·", "·"];
const PARTICLE_COUNT = 48;
const DRIFT_VEL = 0.05; // base wander speed
const MOUSE_FORCE = 22; // pixels — strength of repulsion
const MOUSE_RADIUS = 140; // px
const FRAME_SKIP = 2; // render every Nth RAF tick (~30fps at 60Hz)

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  glyph: string;
  alpha: number;
};

export function AsciiParticles() {
  const reduced = useReducedMotion();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef(0);
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef<{ x: number; y: number; active: boolean }>({
    x: -9999,
    y: -9999,
    active: false,
  });
  const sizeRef = useRef<{ w: number; h: number; dpr: number }>({
    w: 0,
    h: 0,
    dpr: 1,
  });

  useEffect(() => {
    if (reduced) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      const w = window.innerWidth;
      const h = window.innerHeight;
      sizeRef.current = { w, h, dpr };
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      // Seed particles on first sizing.
      if (particlesRef.current.length === 0) {
        const out: Particle[] = [];
        for (let i = 0; i < PARTICLE_COUNT; i++) {
          out.push({
            x: Math.random() * w,
            y: Math.random() * h,
            vx: (Math.random() - 0.5) * DRIFT_VEL,
            vy: (Math.random() - 0.5) * DRIFT_VEL,
            glyph: GLYPHS[Math.floor(Math.random() * GLYPHS.length)],
            alpha: 0.15 + Math.random() * 0.25,
          });
        }
        particlesRef.current = out;
      }
    };

    const onMove = (e: PointerEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY, active: true };
    };
    const onLeave = () => {
      mouseRef.current.active = false;
    };

    let frame = 0;
    const tick = () => {
      frame++;
      if (frame % FRAME_SKIP !== 0) {
        rafRef.current = requestAnimationFrame(tick);
        return;
      }
      const { w, h } = sizeRef.current;
      const m = mouseRef.current;
      ctx.clearRect(0, 0, w, h);

      // Use accent (orange) at low alpha. Reading currentColor would require
      // attaching to DOM tree; instead hard-code the OKLCH and lean on alpha.
      ctx.font = "10px JetBrains Mono, monospace";
      ctx.textBaseline = "middle";
      ctx.textAlign = "center";

      const particles = particlesRef.current;
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Mouse repulsion within MOUSE_RADIUS.
        if (m.active) {
          const dx = p.x - m.x;
          const dy = p.y - m.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < MOUSE_RADIUS * MOUSE_RADIUS && d2 > 1) {
            const d = Math.sqrt(d2);
            const force = (1 - d / MOUSE_RADIUS) * (MOUSE_FORCE / d);
            p.vx += dx * force * 0.02;
            p.vy += dy * force * 0.02;
          }
        }

        // Drift + damping.
        p.x += p.vx;
        p.y += p.vy;
        p.vx *= 0.94;
        p.vy *= 0.94;

        // Add a tiny perpetual jitter so they keep wandering.
        p.vx += (Math.random() - 0.5) * 0.04;
        p.vy += (Math.random() - 0.5) * 0.04;

        // Wrap edges so they never disappear.
        if (p.x < -10) p.x = w + 10;
        else if (p.x > w + 10) p.x = -10;
        if (p.y < -10) p.y = h + 10;
        else if (p.y > h + 10) p.y = -10;

        ctx.globalAlpha = p.alpha;
        ctx.fillStyle = "oklch(0.66 0.25 33)";
        ctx.fillText(p.glyph, p.x, p.y);
      }

      ctx.globalAlpha = 1;
      rafRef.current = requestAnimationFrame(tick);
    };

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerleave", onLeave);
    rafRef.current = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerleave", onLeave);
    };
  }, [reduced]);

  if (reduced) return null;

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-[9]"
    />
  );
}
