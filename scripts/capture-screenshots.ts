import { chromium } from "@playwright/test";
import { mkdir } from "node:fs/promises";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUTPUT_DIR = resolve(__dirname, "../public/projects");

type ProjectTarget = {
  slug: string;
  url: string;
};

const TARGETS: ProjectTarget[] = [
  {
    slug: "aredes-asociados",
    url: "https://aredesasociados.com.ar",
  },
  {
    slug: "pizza-block",
    url: "https://pizza-block.vercel.app/",
  },
  {
    slug: "xplora",
    url: "https://xploraucema.com",
  },
  {
    slug: "leiza-page",
    url: "https://madrenaturaleza.ar",
  },
  {
    slug: "dental-app",
    url: "https://consultoriopyp.vercel.app",
  },
];

async function captureScreenshots() {
  await mkdir(OUTPUT_DIR, { recursive: true });
  console.log(`Saving screenshots to: ${OUTPUT_DIR}\n`);

  const browser = await chromium.launch();

  for (const target of TARGETS) {
    console.log(`Starting capture for: ${target.slug} (${target.url})`);

    try {
      // 1. Desktop Viewport: 1280x800
      const desktopContext = await browser.newContext({
        viewport: { width: 1280, height: 800 },
        deviceScaleFactor: 1,
      });
      const desktopPage = await desktopContext.newPage();
      
      console.log(`[Desktop] Navigating to ${target.url}...`);
      await desktopPage.goto(target.url, { waitUntil: "networkidle", timeout: 60000 });
      
      // Give dynamic components or animations a moment to settle
      await desktopPage.waitForTimeout(1500);
      
      const desktopPath = resolve(OUTPUT_DIR, `${target.slug}.jpg`);
      await desktopPage.screenshot({
        path: desktopPath,
        fullPage: true,
        type: "jpeg",
        quality: 85,
      });
      console.log(`[Desktop] Captured: ${desktopPath}`);
      await desktopContext.close();

      // 2. Mobile Viewport: 390x844
      const mobileContext = await browser.newContext({
        viewport: { width: 390, height: 844 },
        deviceScaleFactor: 1,
        isMobile: true,
        hasTouch: true,
      });
      const mobilePage = await mobileContext.newPage();
      
      console.log(`[Mobile] Navigating to ${target.url}...`);
      await mobilePage.goto(target.url, { waitUntil: "networkidle", timeout: 60000 });
      
      // Settle animations
      await mobilePage.waitForTimeout(1500);
      
      const mobilePath = resolve(OUTPUT_DIR, `${target.slug}-mobile.jpg`);
      await mobilePage.screenshot({
        path: mobilePath,
        fullPage: true,
        type: "jpeg",
        quality: 85,
      });
      console.log(`[Mobile] Captured: ${mobilePath}`);
      await mobileContext.close();

      console.log(`✓ Completed: ${target.slug}\n`);
    } catch (err) {
      console.error(`✗ Failed to capture screenshots for ${target.slug}:`, err instanceof Error ? err.message : err);
      console.log();
    }
  }

  await browser.close();
  console.log("All screenshot tasks finished.");
}

captureScreenshots().catch((err) => {
  console.error("Fatal error running screenshot script:", err);
  process.exit(1);
});
