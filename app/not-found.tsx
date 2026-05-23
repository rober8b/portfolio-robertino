import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Sparkles } from "lucide-react";

export const metadata: Metadata = {
  title: "404 · Esa ruta no existe",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <main className="zone-drench relative flex min-h-dvh items-center justify-center overflow-hidden px-4 sm:px-6 lg:px-8">
      <Ambient />

      <div className="relative z-10 mx-auto w-full max-w-3xl text-center">
        <p className="font-mono text-xs tracking-[0.12em] uppercase opacity-80">
          ruta no encontrada · status 404
        </p>

        <h1
          className="mt-8 font-display font-semibold text-balance text-[clamp(6rem,22vw,16rem)] leading-[0.85] tracking-[-0.06em]"
          style={{ filter: "url(#liquid-refract)" }}
        >
          404
        </h1>

        <p className="mt-10 max-w-prose-tight mx-auto text-lg leading-relaxed sm:text-xl">
          Esa página no existe, o la moví y todavía no la redirigí. <br className="hidden sm:inline" />
          Pero no perdés el viaje: probá Cmd+K y andá a cualquier sección.
        </p>

        <div className="mt-12 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/"
            className="group inline-flex items-center gap-2 rounded-full bg-[var(--drench-text)] px-6 py-3.5 text-base font-medium text-[var(--drench-bg)] transition-transform duration-300 hover:-translate-y-0.5"
          >
            <ArrowLeft
              size={16}
              strokeWidth={1.75}
              className="transition-transform duration-300 group-hover:-translate-x-0.5"
            />
            Volver al inicio
          </Link>
          <span className="inline-flex items-center gap-2 rounded-full border border-[var(--drench-border)] bg-[var(--drench-glass-bg)] px-5 py-3.5 text-sm backdrop-blur">
            <Sparkles size={14} strokeWidth={1.75} />
            <span>O probá</span>
            <kbd className="rounded border border-[var(--drench-border)] bg-[var(--drench-glass-bg)] px-1.5 py-0.5 font-mono text-[0.65rem]">
              Cmd K
            </kbd>
          </span>
        </div>

        <p className="mt-16 font-mono text-[0.65rem] tracking-[0.12em] uppercase opacity-50">
          si esto debería existir, escribime —{" "}
          <a
            href="mailto:robertinobarbuto@gmail.com?subject=404 en el portfolio"
            className="underline-offset-2 hover:underline"
          >
            robertinobarbuto@gmail.com
          </a>
        </p>
      </div>
    </main>
  );
}

function Ambient() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0">
      <div
        className="absolute top-[-25%] left-[-15%] h-[80vh] w-[80vh] rounded-full opacity-55 blur-3xl"
        style={{
          background:
            "radial-gradient(circle, var(--drench-bg-deeper) 0%, transparent 65%)",
        }}
      />
      <div
        className="absolute right-[-20%] bottom-[-15%] h-[70vh] w-[70vh] rounded-full opacity-45 blur-3xl"
        style={{
          background:
            "radial-gradient(circle, oklch(0.78 0.18 50) 0%, transparent 70%)",
        }}
      />
      <div
        className="absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, var(--drench-text) 1px, transparent 0)",
          backgroundSize: "32px 32px",
        }}
      />
    </div>
  );
}
