"use client";

import { useEffect, useRef, useState } from "react";

const RAMP = ".,-~:;=!*#$@";
const RAMP_LEN = RAMP.length;

const THETA_STEP = 0.1;
const PHI_STEP = 0.04;
const ROT_X_STEP = 0.012;
const ROT_Y_STEP = 0.008;

const WARMUP_FRAMES = 30;
const SAMPLE_WINDOW = 60;
const FRAME_BUDGET_MS = 14;

const GLITCH_MIN_MS = 8000;
const GLITCH_MAX_MS = 15000;
const GLITCH_DURATION_MIN = 200;
const GLITCH_DURATION_MAX = 400;

const MOUSE_RADIUS = 150;

const R1 = 1;
const R2 = 2;
const K2 = 5;

type Mouse = { x: number; y: number };

type Dims = {
  cols: number;
  rows: number;
  fontSize: string;
  lineHeight: number;
};

const DESKTOP_DIMS: Dims = {
  cols: 80,
  rows: 40,
  fontSize: "clamp(7px, 1.3vw, 13px)",
  lineHeight: 1.15,
};

const MOBILE_DIMS: Dims = {
  cols: 60,
  rows: 26,
  fontSize: "8px",
  lineHeight: 1.05,
};

function computeInitialDims(): Dims {
  if (typeof window === "undefined") return DESKTOP_DIMS;
  return window.matchMedia("(max-width: 640px)").matches ? MOBILE_DIMS : DESKTOP_DIMS;
}

export function AsciiTorus({ className }: { className?: string }) {
  const preRef = useRef<HTMLPreElement>(null);
  const cellsRef = useRef<HTMLSpanElement[]>([]);
  const animRef = useRef<number | null>(null);
  const stateRef = useRef({
    A: 0.5,
    B: 1.0,
    glitchUntil: 0,
    nextGlitchAt: 0,
    mouse: { x: -9999, y: -9999 } as Mouse,
    frameCount: 0,
    frameTimes: [] as number[],
    fallback: false,
  });

  const [dims] = useState<Dims>(computeInitialDims);
  const { cols, rows, fontSize, lineHeight } = dims;
  const cellCount = cols * rows;

  const [paused, setPaused] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [lowEnd, setLowEnd] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener("change", onChange);
    const cores = navigator.hardwareConcurrency ?? 8;
    setLowEnd(cores < 4);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    const node = preRef.current;
    if (!node) return;
    const obs = new IntersectionObserver(
      ([entry]) => setPaused(!entry.isIntersecting),
      { threshold: 0 },
    );
    obs.observe(node);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    const node = preRef.current;
    if (!node) return;
    const frag = document.createDocumentFragment();
    const spans: HTMLSpanElement[] = new Array(cellCount);
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const span = document.createElement("span");
        span.textContent = " ";
        spans[c + r * cols] = span;
        frag.appendChild(span);
      }
      if (r < rows - 1) frag.appendChild(document.createTextNode("\n"));
    }
    node.appendChild(frag);
    cellsRef.current = spans;

    const st = stateRef.current;
    const zBuffer = new Float32Array(cellCount);
    const charBuffer = new Int8Array(cellCount);
    renderTorusFrame(st.A, st.B, false, st.mouse, spans, node, zBuffer, charBuffer, cols, rows);

    return () => {
      while (node.firstChild) node.removeChild(node.firstChild);
      cellsRef.current = [];
    };
  }, [cols, rows, cellCount]);

  useEffect(() => {
    if (reducedMotion || lowEnd || paused || stateRef.current.fallback) {
      if (animRef.current !== null) {
        cancelAnimationFrame(animRef.current);
        animRef.current = null;
      }
      return;
    }
    const node = preRef.current;
    if (!node) return;
    const spans = cellsRef.current;
    if (spans.length === 0) return;

    const st = stateRef.current;
    st.nextGlitchAt = performance.now() + randRange(GLITCH_MIN_MS, GLITCH_MAX_MS);
    let last = performance.now();
    const zBuffer = new Float32Array(cellCount);
    const charBuffer = new Int8Array(cellCount);

    const tick = (now: number) => {
      const delta = now - last;
      last = now;

      st.frameCount++;
      if (st.frameCount > WARMUP_FRAMES) {
        st.frameTimes.push(delta);
        if (st.frameTimes.length > SAMPLE_WINDOW) st.frameTimes.shift();
        if (st.frameTimes.length === SAMPLE_WINDOW) {
          let sum = 0;
          for (let i = 0; i < SAMPLE_WINDOW; i++) sum += st.frameTimes[i];
          if (sum / SAMPLE_WINDOW > FRAME_BUDGET_MS) {
            st.fallback = true;
            animRef.current = null;
            return;
          }
        }
      }

      let glitch = false;
      if (now < st.glitchUntil) {
        glitch = true;
      } else if (now > st.nextGlitchAt) {
        st.glitchUntil = now + randRange(GLITCH_DURATION_MIN, GLITCH_DURATION_MAX);
        st.nextGlitchAt = st.glitchUntil + randRange(GLITCH_MIN_MS, GLITCH_MAX_MS);
        glitch = true;
      }

      st.A += ROT_X_STEP;
      st.B += ROT_Y_STEP;

      renderTorusFrame(st.A, st.B, glitch, st.mouse, spans, node, zBuffer, charBuffer, cols, rows);
      animRef.current = requestAnimationFrame(tick);
    };
    animRef.current = requestAnimationFrame(tick);

    return () => {
      if (animRef.current !== null) {
        cancelAnimationFrame(animRef.current);
        animRef.current = null;
      }
    };
  }, [reducedMotion, lowEnd, paused, cols, rows, cellCount]);

  useEffect(() => {
    const node = preRef.current;
    if (!node) return;
    const st = stateRef.current;
    const onMove = (e: PointerEvent) => {
      const rect = node.getBoundingClientRect();
      st.mouse.x = e.clientX - rect.left;
      st.mouse.y = e.clientY - rect.top;
    };
    const onLeave = () => {
      st.mouse.x = -9999;
      st.mouse.y = -9999;
    };
    node.addEventListener("pointermove", onMove);
    node.addEventListener("pointerleave", onLeave);
    return () => {
      node.removeEventListener("pointermove", onMove);
      node.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <pre
      ref={preRef}
      aria-hidden
      role="img"
      aria-label="ASCII torus"
      className={className}
      style={{
        fontFamily: "var(--font-jetbrains-mono), ui-monospace, monospace",
        fontSize,
        lineHeight,
        letterSpacing: 0,
        color: "#ff4000",
        background: "#0a0a0a",
        margin: 0,
        padding: 0,
        whiteSpace: "pre",
        userSelect: "none",
        cursor: "default",
        fontVariantLigatures: "none",
        fontFeatureSettings: '"liga" 0, "calt" 0',
      }}
    />
  );
}

function renderTorusFrame(
  A: number,
  B: number,
  glitch: boolean,
  mouse: Mouse,
  spans: HTMLSpanElement[],
  node: HTMLPreElement,
  zBuffer: Float32Array,
  charBuffer: Int8Array,
  cols: number,
  rows: number,
) {
  zBuffer.fill(0);
  charBuffer.fill(-1);

  const cellCount = cols * rows;
  const K1 = (cols * K2 * 3) / (8 * (R1 + R2));

  const cosA = Math.cos(A);
  const sinA = Math.sin(A);
  const cosB = Math.cos(B);
  const sinB = Math.sin(B);

  for (let theta = 0; theta < Math.PI * 2; theta += THETA_STEP) {
    const cosTheta = Math.cos(theta);
    const sinTheta = Math.sin(theta);
    for (let phi = 0; phi < Math.PI * 2; phi += PHI_STEP) {
      const cosPhi = Math.cos(phi);
      const sinPhi = Math.sin(phi);

      const circleX = R2 + R1 * cosTheta;
      const circleY = R1 * sinTheta;

      const x =
        circleX * (cosB * cosPhi + sinA * sinB * sinPhi) -
        circleY * cosA * sinB;
      const y =
        circleX * (sinB * cosPhi - sinA * cosB * sinPhi) +
        circleY * cosA * cosB;
      const z = K2 + cosA * circleX * sinPhi + circleY * sinA;
      if (z <= 0) continue;
      const ooz = 1 / z;

      const xp = Math.floor(cols / 2 + K1 * ooz * x);
      const yp = Math.floor(rows / 2 - (K1 / 2) * ooz * y);
      if (xp < 0 || xp >= cols || yp < 0 || yp >= rows) continue;

      const idx = xp + yp * cols;
      if (ooz <= zBuffer[idx]) continue;
      zBuffer[idx] = ooz;

      const L =
        cosPhi * cosTheta * sinB -
        cosA * cosTheta * sinPhi -
        sinA * sinTheta +
        cosB * (cosA * sinTheta - cosTheta * sinA * sinPhi);
      const lum = Math.max(0, Math.floor(L * 8));
      charBuffer[idx] = Math.min(RAMP_LEN - 1, lum);
    }
  }

  const mouseActive = mouse.x >= 0 && mouse.y >= 0;
  let cellW = 0;
  let cellH = 0;
  if (mouseActive) {
    const rect = node.getBoundingClientRect();
    cellW = rect.width / cols;
    cellH = rect.height / rows;
  }

  for (let i = 0; i < cellCount; i++) {
    const lit = charBuffer[i] >= 0;
    const span = spans[i];
    if (!span) continue;

    if (!lit) {
      if (span.textContent !== " ") span.textContent = " ";
      continue;
    }

    let charIdx = charBuffer[i];

    if (mouseActive) {
      const c = i % cols;
      const r = (i - c) / cols;
      const px = c * cellW + cellW / 2;
      const py = r * cellH + cellH / 2;
      const dx = px - mouse.x;
      const dy = py - mouse.y;
      const dsq = dx * dx + dy * dy;
      const rsq = MOUSE_RADIUS * MOUSE_RADIUS;
      if (dsq < rsq) {
        const falloff = 1 - Math.sqrt(dsq) / MOUSE_RADIUS;
        charIdx = Math.min(RAMP_LEN - 1, charIdx + Math.floor(falloff * 4));
      }
    }

    if (glitch) {
      charIdx = Math.floor(Math.random() * RAMP_LEN);
    }

    const next = RAMP[charIdx];
    if (span.textContent !== next) span.textContent = next;
  }
}

function randRange(min: number, max: number): number {
  return min + Math.random() * (max - min);
}
