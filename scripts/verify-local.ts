import { chromium } from "@playwright/test";
import { mkdir } from "node:fs/promises";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUTPUT_DIR = resolve(__dirname, "../verify");
const URL = process.env.URL ?? "http://localhost:3456";

const VIEWPORTS = [
  { name: "mobile", width: 390, height: 844, dsf: 2 },
  { name: "desktop", width: 1440, height: 900, dsf: 2 },
] as const;

async function main() {
  await mkdir(OUTPUT_DIR, { recursive: true });
  const browser = await chromium.launch();

  for (const vp of VIEWPORTS) {
    const ctx = await browser.newContext({
      viewport: { width: vp.width, height: vp.height },
      deviceScaleFactor: vp.dsf,
      colorScheme: "light",
    });
    const page = await ctx.newPage();
    page.on("console", (msg) => {
      if (msg.type() === "error") console.log(`! [${vp.name}] ${msg.text()}`);
    });

    console.log(`> ${vp.name} · ${URL}`);
    await page.goto(URL, { waitUntil: "networkidle", timeout: 30000 });
    await page.waitForTimeout(600);

    // Hero
    await page.screenshot({
      path: resolve(OUTPUT_DIR, `${vp.name}-1-hero.jpg`),
      type: "jpeg",
      quality: 80,
    });

    // Scroll to projects
    await page.evaluate(() => document.getElementById("projects")?.scrollIntoView());
    await page.waitForTimeout(800);
    await page.screenshot({
      path: resolve(OUTPUT_DIR, `${vp.name}-2-projects.jpg`),
      type: "jpeg",
      quality: 80,
    });

    // Scroll to bottom (footer)
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page.waitForTimeout(800);
    await page.screenshot({
      path: resolve(OUTPUT_DIR, `${vp.name}-3-footer.jpg`),
      type: "jpeg",
      quality: 80,
    });

    // Open Ask AI palette
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(400);
    await page.keyboard.press("Control+K");
    await page.waitForTimeout(700);
    await page.screenshot({
      path: resolve(OUTPUT_DIR, `${vp.name}-4-ask.jpg`),
      type: "jpeg",
      quality: 80,
    });

    await ctx.close();
  }

  await browser.close();
  console.log(`\nDone. Screenshots in ${OUTPUT_DIR}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
