/**
 * Captura screenshots de los proyectos públicos para usar como thumbnails en project cards.
 *
 * Uso:
 *   1. Asegurate de tener las URLs reales en TARGETS abajo.
 *   2. pnpm dlx playwright install chromium  (solo la primera vez)
 *   3. pnpm tsx scripts/capture-thumbnails.ts
 *
 * Output: public/thumbnails/<slug>.webp · 1280x800 retina (deviceScaleFactor 2)
 */
import { chromium, type Page } from "@playwright/test";
import { mkdir } from "node:fs/promises";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUTPUT_DIR = resolve(__dirname, "../public/projects");

type Target = {
  slug: string;
  url: string;
  waitFor?: string; // optional CSS selector to wait for
  hide?: string[]; // selectors to hide before screenshot (cookies, banners, chat widgets)
};

const TARGETS: Target[] = [
  { slug: "aredes-asociados", url: "https://aredesasociados.com.ar/" },
  { slug: "nebula", url: "https://www.somosnebula.ar/" },
  { slug: "dental-app", url: "https://consultoriopyp.vercel.app/" },
  { slug: "xplora", url: "https://xploraucema.com/" },
  { slug: "leiza-page", url: "https://leiza-page.vercel.app/" },
  { slug: "equitas-abogados", url: "https://equitas-abogados.vercel.app/" },
  { slug: "pizza-block", url: "https://pizza-block.vercel.app/" },
  { slug: "nomos", url: "https://nomos-tau.vercel.app/" },
];

async function captureOne(target: Target, page: Page) {
  console.log(`> ${target.slug} · ${target.url}`);
  await page.goto(target.url, { waitUntil: "networkidle", timeout: 45_000 });

  if (target.waitFor) {
    await page.waitForSelector(target.waitFor, { timeout: 10_000 }).catch(() => null);
  }
  if (target.hide?.length) {
    await page.evaluate((selectors: string[]) => {
      for (const s of selectors) {
        document.querySelectorAll(s).forEach((el) => ((el as HTMLElement).style.display = "none"));
      }
    }, target.hide);
  }

  // Settle animations
  await page.waitForTimeout(800);

  const path = resolve(OUTPUT_DIR, `${target.slug}.jpg`);
  await page.screenshot({
    path,
    fullPage: false,
    type: "jpeg",
    quality: 85,
  });
  console.log(`  · written ${path}`);
}

async function main() {
  await mkdir(OUTPUT_DIR, { recursive: true });

  if (TARGETS.length === 0) {
    console.warn("! TARGETS is empty. Add project URLs to scripts/capture-thumbnails.ts");
    return;
  }

  const browser = await chromium.launch();
  const ctx = await browser.newContext({
    viewport: { width: 1280, height: 800 },
    deviceScaleFactor: 2,
    colorScheme: "light",
  });
  const page = await ctx.newPage();

  for (const target of TARGETS) {
    try {
      await captureOne(target, page);
    } catch (err) {
      console.error(`! Failed for ${target.slug}:`, err instanceof Error ? err.message : err);
    }
  }

  await browser.close();
  console.log("\nDone. Thumbnails in", OUTPUT_DIR);
  console.log("Next: agregá la ruta `image: '/thumbnails/<slug>.webp'` al proyecto en lib/site-data.ts");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
