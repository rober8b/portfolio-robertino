import { FloatingNav } from "@/components/navigation/floating-nav";
import { HeroSection } from "@/components/sections/hero-section";
import { TrustBar } from "@/components/sections/trust-bar";
import { WhoSection } from "@/components/sections/who-section";
import { ProjectsSection } from "@/components/sections/projects-section";
import { BuildProcessSection } from "@/components/sections/build-process-section";
import { GithubSection } from "@/components/sections/github-section";
import { ExperimentsSection } from "@/components/sections/experiments-section";
import { NotesSection } from "@/components/sections/notes-section";
import { FeedbackLogSection } from "@/components/sections/feedback-log-section";
import { ContactSection } from "@/components/sections/contact-section";
import { SiteFooter } from "@/components/sections/site-footer";
import { MarqueeDivider } from "@/components/primitives/marquee-divider";
import { SectionTransition } from "@/components/primitives/section-transition";
import { fetchGithubActivity } from "@/lib/github/client";

export default async function Home() {
  const activity = await fetchGithubActivity();

  return (
    <main className="relative min-h-dvh overflow-x-hidden">
      <FloatingNav />
      <HeroSection />
      <TrustBar />
      <CreamAurora />
      <SectionTransition command="mounting /who.manifesto" />
      <WhoSection />
      <SectionTransition command="loading projects.featured" />
      <ProjectsSection />
      <BuildProcessSection />
      <MarqueeDivider />
      <GithubSection activity={activity} />
      <SectionTransition command="entering experiments.runtime" />
      <ExperimentsSection />
      <NotesSection />
      <FeedbackLogSection />
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
