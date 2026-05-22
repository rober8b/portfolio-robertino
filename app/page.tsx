import { ModeToggle } from "@/components/mode/mode-toggle";
import { AskButton } from "@/components/ask/ask-button";
import { HeroSection } from "@/components/sections/hero-section";
import { ProjectsSection } from "@/components/sections/projects-section";
import { GithubSection } from "@/components/sections/github-section";
import { ContactSection } from "@/components/sections/contact-section";
import { SiteFooter } from "@/components/sections/site-footer";

export default function Home() {
  return (
    <main className="relative min-h-dvh overflow-x-hidden">
      <nav className="fixed top-6 left-1/2 z-50 flex -translate-x-1/2 items-center gap-2">
        <ModeToggle />
        <AskButton />
      </nav>
      <HeroSection />
      <CreamAurora />
      <ProjectsSection />
      <GithubSection />
      <ContactSection />
      <SiteFooter />
    </main>
  );
}

function CreamAurora() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-x-0 top-[100vh] -z-10 h-[200vh] overflow-hidden"
    >
      <div
        className="absolute top-[10%] left-[-12%] h-[55vh] w-[55vh] rounded-full opacity-45 blur-3xl"
        style={{
          background:
            "radial-gradient(circle, var(--accent-soft) 0%, transparent 60%)",
        }}
      />
      <div
        className="absolute right-[-10%] bottom-[15%] h-[60vh] w-[60vh] rounded-full opacity-30 blur-3xl"
        style={{
          background:
            "radial-gradient(circle, var(--highlight-warm) 0%, transparent 70%)",
        }}
      />
    </div>
  );
}
