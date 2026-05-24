"use client";

import { motion } from "motion/react";
import { useMode } from "@/components/mode/mode-provider";
import { ScrambleText } from "@/components/primitives/scramble-text";
import { PROFILE, PROJECTS } from "@/lib/site-data";
import { easeOutExpo } from "@/lib/motion/variants";

type ProofPair = {
  key: string;
  value: string;
};

function buildProof(): ProofPair[] {
  const live = PROJECTS.filter((p) => p.status === "live").length;
  const years = Math.max(1, new Date().getFullYear() - PROFILE.startedAt);

  return [
    { key: "products.shipped", value: String(live) },
    { key: "years.building", value: String(years) },
    { key: "currently", value: PROFILE.currentFocus },
    { key: "stack.primary", value: "next · ts · tailwind" },
    { key: "apis.integrated", value: "mp · openai · anthropic · resend · supabase" },
    { key: "clients", value: "LATAM" },
    { key: "deployments.live", value: String(live) },
    { key: "region", value: "BA · AR" },
  ];
}

export function TrustBar() {
  const { mode } = useMode();
  const proof = buildProof();
  const label = mode === "dev" ? "system.proof · verified" : "trayectoria · verificable";

  return (
    <section
      aria-label="Métricas verificables"
      className="relative border-y border-[var(--border-glass)] bg-[var(--surface-elevated)] px-4 py-5 sm:px-6 lg:px-8"
    >
      <div className="mx-auto flex max-w-6xl items-center gap-6">
        <motion.span
          initial={{ opacity: 0, x: -8 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: easeOutExpo }}
          className="hidden shrink-0 font-mono text-[0.6rem] tracking-[0.18em] text-[var(--ink-soft)] uppercase opacity-70 md:inline-flex"
        >
          {label}
        </motion.span>

        <div className="-mx-4 flex-1 overflow-x-auto px-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <ul className="flex min-w-max items-center gap-x-6 gap-y-3 md:flex-wrap md:gap-x-8 md:gap-y-2">
            {proof.map((p, i) => (
              <motion.li
                key={p.key}
                initial={{ opacity: 0, y: 6 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.04 * i, ease: easeOutExpo }}
                className="flex items-baseline gap-2 whitespace-nowrap font-mono text-[0.7rem] text-[var(--ink)]"
              >
                <span className="text-[var(--ink-soft)] opacity-70">[ {p.key} ]</span>
                <span className="nums-tabular font-medium">
                  <ScrambleText text={p.value} trigger="hover" />
                </span>
              </motion.li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
