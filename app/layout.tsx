import type { Metadata, Viewport } from "next";
import { Geist, JetBrains_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { ModeProvider } from "@/components/mode/mode-provider";
import { AskPaletteProvider } from "@/components/ask/ask-palette-provider";
import { AskPalette } from "@/components/ask/ask-palette";
import { LiquidRefractFilter } from "@/components/glass/liquid-refract-filter";
import { CustomCursor } from "@/components/primitives/custom-cursor";
import { ConsoleGreeting } from "@/components/primitives/console-greeting";
import { AsciiGrain } from "@/components/ambient/ascii-grain";
import { AsciiParticles } from "@/components/ambient/ascii-particles";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://roberb.dev"),
  title: {
    default: "Robertino Barbuto · Dev freelance · Buenos Aires",
    template: "%s · Robertino Barbuto",
  },
  description:
    "Desarrollador freelance en Buenos Aires. Ecommerce, apps web y sistemas agénticos para LATAM. Next.js, TypeScript, Mastra, Gemini.",
  authors: [{ name: "Robertino Barbuto", url: "https://github.com/rober8b" }],
  creator: "Robertino Barbuto",
  openGraph: {
    type: "website",
    locale: "es_AR",
    title: "Robertino Barbuto · Dev freelance · Buenos Aires",
    description:
      "Desarrollador freelance. Ecommerce, apps web y sistemas agénticos para LATAM.",
    siteName: "Robertino Barbuto",
  },
  twitter: {
    card: "summary_large_image",
    title: "Robertino Barbuto · Dev freelance",
    description:
      "Ecommerce, apps web y sistemas agénticos para LATAM.",
  },
};

export const viewport: Viewport = {
  themeColor: "oklch(0.66 0.22 33)",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es-AR"
      className={`${geistSans.variable} ${jetbrainsMono.variable}`}
      suppressHydrationWarning
    >
      <body className="bg-background text-foreground min-h-dvh font-sans">
        <div
          aria-hidden
          className="pointer-events-none fixed inset-0 -z-10 text-[var(--ink)] grain-breathe"
        >
          <AsciiGrain width={140} height={72} opacity={0.055} />
        </div>
        <AsciiParticles />
        <ModeProvider>
          <AskPaletteProvider>
            <LiquidRefractFilter />
            <CustomCursor />
            <ConsoleGreeting />
            {children}
            <AskPalette />
          </AskPaletteProvider>
        </ModeProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
