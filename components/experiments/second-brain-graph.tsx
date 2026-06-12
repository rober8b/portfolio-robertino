"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "motion/react";

type Node = {
  id: string;
  label: string;
  x: number;
  y: number;
  vx: number;
  vy: number;
  fixed: boolean;
};

type Edge = [string, string];

const NODES_RAW: Array<{ id: string; label: string }> = [
  { id: "marketplace", label: "[[marketplace]]" },
  { id: "recovery-operator", label: "[[recovery-operator]]" },
  { id: "wallet-ars", label: "[[wallet-ars]]" },
  { id: "supabase-vault", label: "[[supabase-vault]]" },
  { id: "mastra-router", label: "[[mastra-router]]" },
  { id: "hermes", label: "[[hermes]]" },
  { id: "schein-anchors", label: "[[schein-anchors]]" },
  { id: "career-direction", label: "[[career-direction]]" },
  { id: "xplora", label: "[[xplora]]" },
  { id: "ai-policy-sprint", label: "[[ai-policy-sprint]]" },
  { id: "anthropic-hackathon", label: "[[anthropic-hackathon]]" },
  { id: "next-16-portfolio", label: "[[next-16-portfolio]]" },
];

const EDGES: Edge[] = [
  ["marketplace", "recovery-operator"],
  ["marketplace", "wallet-ars"],
  ["marketplace", "mastra-router"],
  ["marketplace", "supabase-vault"],
  ["recovery-operator", "mastra-router"],
  ["wallet-ars", "supabase-vault"],
  ["hermes", "supabase-vault"],
  ["hermes", "mastra-router"],
  ["hermes", "career-direction"],
  ["schein-anchors", "career-direction"],
  ["xplora", "ai-policy-sprint"],
  ["xplora", "anthropic-hackathon"],
  ["anthropic-hackathon", "marketplace"],
  ["next-16-portfolio", "marketplace"],
  ["next-16-portfolio", "hermes"],
];

const VIEWBOX_W = 400;
const VIEWBOX_H = 240;
const PADDING = 28;
const NODE_W = 84;
const NODE_H = 18;

const K_REP = 1400;
const K_SPRING = 0.025;
const REST_LENGTH = 70;
const K_CENTER = 0.004;
const DAMPING = 0.85;
const SLEEP_THRESHOLD = 0.05;
const SLEEP_FRAMES = 30;

function buildAdjacency(): Map<string, Set<string>> {
  const map = new Map<string, Set<string>>();
  for (const n of NODES_RAW) map.set(n.id, new Set());
  for (const [a, b] of EDGES) {
    map.get(a)?.add(b);
    map.get(b)?.add(a);
  }
  return map;
}

function buildInitialNodes(): Node[] {
  const cx = VIEWBOX_W / 2;
  const cy = VIEWBOX_H / 2;
  return NODES_RAW.map((n, i) => {
    const angle = (i / NODES_RAW.length) * Math.PI * 2;
    return {
      id: n.id,
      label: n.label,
      x: cx + Math.cos(angle) * 10 + (Math.random() - 0.5) * 4,
      y: cy + Math.sin(angle) * 10 + (Math.random() - 0.5) * 4,
      vx: 0,
      vy: 0,
      fixed: false,
    };
  });
}

type SecondBrainGraphProps = {
  height?: number;
  className?: string;
};

export function SecondBrainGraph({ height = 240, className }: SecondBrainGraphProps) {
  const reducedMotion = useReducedMotion();
  const svgRef = useRef<SVGSVGElement>(null);
  const nodesRef = useRef<Node[]>(buildInitialNodes());
  const adjacencyRef = useRef(buildAdjacency());
  const rafRef = useRef<number | null>(null);
  const sleepCounterRef = useRef(0);
  const dragIdRef = useRef<string | null>(null);
  const [, forceRender] = useState(0);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [pointerCoarse] = useState<boolean>(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia("(pointer: coarse)").matches;
  });

  useEffect(() => {
    if (reducedMotion) return;
    let mounted = true;

    const tick = () => {
      if (!mounted) return;
      const nodes = nodesRef.current;
      const adj = adjacencyRef.current;
      const cx = VIEWBOX_W / 2;
      const cy = VIEWBOX_H / 2;

      for (const n of nodes) {
        if (n.fixed) continue;
        let fx = 0;
        let fy = 0;

        for (const m of nodes) {
          if (m === n) continue;
          let dx = n.x - m.x;
          let dy = n.y - m.y;
          let dsq = dx * dx + dy * dy;
          if (dsq < 1) dsq = 1;
          const f = K_REP / dsq;
          const d = Math.sqrt(dsq);
          fx += (dx / d) * f;
          fy += (dy / d) * f;
        }

        const neighbors = adj.get(n.id);
        if (neighbors) {
          for (const otherId of neighbors) {
            const m = nodes.find((x) => x.id === otherId);
            if (!m) continue;
            const dx = m.x - n.x;
            const dy = m.y - n.y;
            const d = Math.sqrt(dx * dx + dy * dy) || 0.01;
            const f = K_SPRING * (d - REST_LENGTH);
            fx += (dx / d) * f;
            fy += (dy / d) * f;
          }
        }

        fx += (cx - n.x) * K_CENTER;
        fy += (cy - n.y) * K_CENTER;

        n.vx = (n.vx + fx) * DAMPING;
        n.vy = (n.vy + fy) * DAMPING;
        n.x += n.vx;
        n.y += n.vy;

        if (n.x < PADDING) { n.x = PADDING; n.vx = 0; }
        if (n.x > VIEWBOX_W - PADDING) { n.x = VIEWBOX_W - PADDING; n.vx = 0; }
        if (n.y < PADDING) { n.y = PADDING; n.vy = 0; }
        if (n.y > VIEWBOX_H - PADDING) { n.y = VIEWBOX_H - PADDING; n.vy = 0; }
      }

      let maxV = 0;
      for (const n of nodes) {
        const v = Math.max(Math.abs(n.vx), Math.abs(n.vy));
        if (v > maxV) maxV = v;
      }
      if (maxV < SLEEP_THRESHOLD) {
        sleepCounterRef.current += 1;
      } else {
        sleepCounterRef.current = 0;
      }

      forceRender((x) => (x + 1) % 1000);

      if (sleepCounterRef.current < SLEEP_FRAMES) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        rafRef.current = null;
      }
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => {
      mounted = false;
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, [reducedMotion]);

  const wakeSimulation = () => {
    sleepCounterRef.current = 0;
    if (rafRef.current === null && !reducedMotion) {
      const tick = () => {
        const nodes = nodesRef.current;
        const adj = adjacencyRef.current;
        const cx = VIEWBOX_W / 2;
        const cy = VIEWBOX_H / 2;
        for (const n of nodes) {
          if (n.fixed) continue;
          let fx = 0;
          let fy = 0;
          for (const m of nodes) {
            if (m === n) continue;
            let dx = n.x - m.x;
            let dy = n.y - m.y;
            let dsq = dx * dx + dy * dy;
            if (dsq < 1) dsq = 1;
            const f = K_REP / dsq;
            const d = Math.sqrt(dsq);
            fx += (dx / d) * f;
            fy += (dy / d) * f;
          }
          const neighbors = adj.get(n.id);
          if (neighbors) {
            for (const otherId of neighbors) {
              const m = nodes.find((x) => x.id === otherId);
              if (!m) continue;
              const dx = m.x - n.x;
              const dy = m.y - n.y;
              const d = Math.sqrt(dx * dx + dy * dy) || 0.01;
              const f = K_SPRING * (d - REST_LENGTH);
              fx += (dx / d) * f;
              fy += (dy / d) * f;
            }
          }
          fx += (cx - n.x) * K_CENTER;
          fy += (cy - n.y) * K_CENTER;
          n.vx = (n.vx + fx) * DAMPING;
          n.vy = (n.vy + fy) * DAMPING;
          n.x += n.vx;
          n.y += n.vy;
          if (n.x < PADDING) { n.x = PADDING; n.vx = 0; }
          if (n.x > VIEWBOX_W - PADDING) { n.x = VIEWBOX_W - PADDING; n.vx = 0; }
          if (n.y < PADDING) { n.y = PADDING; n.vy = 0; }
          if (n.y > VIEWBOX_H - PADDING) { n.y = VIEWBOX_H - PADDING; n.vy = 0; }
        }
        let maxV = 0;
        for (const n of nodes) {
          const v = Math.max(Math.abs(n.vx), Math.abs(n.vy));
          if (v > maxV) maxV = v;
        }
        if (maxV < SLEEP_THRESHOLD) {
          sleepCounterRef.current += 1;
        } else {
          sleepCounterRef.current = 0;
        }
        forceRender((x) => (x + 1) % 1000);
        if (sleepCounterRef.current < SLEEP_FRAMES) {
          rafRef.current = requestAnimationFrame(tick);
        } else {
          rafRef.current = null;
        }
      };
      rafRef.current = requestAnimationFrame(tick);
    }
  };

  const svgToViewBox = (clientX: number, clientY: number) => {
    const svg = svgRef.current;
    if (!svg) return { x: 0, y: 0 };
    const rect = svg.getBoundingClientRect();
    return {
      x: ((clientX - rect.left) / rect.width) * VIEWBOX_W,
      y: ((clientY - rect.top) / rect.height) * VIEWBOX_H,
    };
  };

  const onNodePointerDown = (id: string) => (e: React.PointerEvent<SVGGElement>) => {
    if (pointerCoarse) {
      setHoveredId((cur) => (cur === id ? null : id));
      return;
    }
    e.preventDefault();
    e.currentTarget.setPointerCapture(e.pointerId);
    dragIdRef.current = id;
    const node = nodesRef.current.find((n) => n.id === id);
    if (node) node.fixed = true;
    wakeSimulation();
  };

  const onNodePointerMove = (e: React.PointerEvent<SVGGElement>) => {
    if (pointerCoarse) return;
    if (!dragIdRef.current) return;
    const node = nodesRef.current.find((n) => n.id === dragIdRef.current);
    if (!node) return;
    const p = svgToViewBox(e.clientX, e.clientY);
    node.x = Math.max(PADDING, Math.min(VIEWBOX_W - PADDING, p.x));
    node.y = Math.max(PADDING, Math.min(VIEWBOX_H - PADDING, p.y));
    node.vx = 0;
    node.vy = 0;
    forceRender((x) => (x + 1) % 1000);
  };

  const onNodePointerUp = (e: React.PointerEvent<SVGGElement>) => {
    if (pointerCoarse) return;
    e.currentTarget.releasePointerCapture(e.pointerId);
    if (dragIdRef.current) {
      const node = nodesRef.current.find((n) => n.id === dragIdRef.current);
      if (node) node.fixed = false;
      dragIdRef.current = null;
      wakeSimulation();
    }
  };

  const adj = adjacencyRef.current;
  const nodes = nodesRef.current;
  const nodeById = new Map(nodes.map((n) => [n.id, n]));
  const highlight = hoveredId;
  const highlightedEdges = new Set<string>();
  if (highlight) {
    for (const [a, b] of EDGES) {
      if (a === highlight || b === highlight) highlightedEdges.add(`${a}|${b}`);
    }
  }

  return (
    <div
      className={`relative h-full w-full overflow-hidden bg-[#0a0a0a] ${className ?? ""}`}
      style={{ height, touchAction: "pan-y" }}
    >
      <svg
        ref={svgRef}
        viewBox={`0 0 ${VIEWBOX_W} ${VIEWBOX_H}`}
        preserveAspectRatio="xMidYMid meet"
        className="block h-full w-full"
        aria-label="Second brain graph"
      >
        <g>
          {EDGES.map(([a, b]) => {
            const na = nodeById.get(a);
            const nb = nodeById.get(b);
            if (!na || !nb) return null;
            const key = `${a}|${b}`;
            const highlighted = highlightedEdges.has(key);
            return (
              <line
                key={key}
                x1={na.x}
                y1={na.y}
                x2={nb.x}
                y2={nb.y}
                stroke="#ff4000"
                strokeWidth={highlighted ? 0.9 : 0.5}
                opacity={highlighted ? 0.85 : 0.25}
              />
            );
          })}
        </g>
        <g>
          {nodes.map((n) => {
            const neighbors = adj.get(n.id);
            const isHover = n.id === highlight;
            const isNeighbor = !!highlight && neighbors?.has(highlight);
            const opacity = !highlight ? 1 : isHover || isNeighbor ? 1 : 0.4;
            return (
              <g
                key={n.id}
                transform={`translate(${n.x - NODE_W / 2}, ${n.y - NODE_H / 2})`}
                style={{ cursor: pointerCoarse ? "pointer" : "grab", touchAction: "none" }}
                onPointerDown={onNodePointerDown(n.id)}
                onPointerMove={onNodePointerMove}
                onPointerUp={onNodePointerUp}
                onPointerEnter={() => !pointerCoarse && setHoveredId(n.id)}
                onPointerLeave={() => !pointerCoarse && setHoveredId(null)}
                opacity={opacity}
              >
                <rect
                  width={NODE_W}
                  height={NODE_H}
                  fill="#0a0a0a"
                  stroke={isHover ? "#ff4000" : "oklch(1 0 0 / 0.18)"}
                  strokeWidth={isHover ? 1.2 : 0.7}
                  rx={2}
                />
                <text
                  x={NODE_W / 2}
                  y={NODE_H / 2 + 3.5}
                  textAnchor="middle"
                  fill={isHover ? "#ff4000" : "oklch(0.96 0.008 50)"}
                  fontFamily="var(--font-jetbrains-mono), ui-monospace, monospace"
                  fontSize="8"
                  fontWeight={isHover ? 600 : 400}
                >
                  {n.label}
                </text>
              </g>
            );
          })}
        </g>
      </svg>
    </div>
  );
}
