import { chromium } from "@playwright/test";
import { mkdir } from "node:fs/promises";

const OUT_DIR = "test-results";
const URL = process.env.PORTFOLIO_URL ?? "http://localhost:3000/";

await mkdir(OUT_DIR, { recursive: true });

const browser = await chromium.launch();
const ctx = await browser.newContext({
  viewport: { width: 1440, height: 900 },
  deviceScaleFactor: 2,
});

// Pre-seed sessionStorage so the boot is skipped for the page tour.
await ctx.addInitScript(() => {
  try {
    window.sessionStorage.setItem("rober8b.booted", "1");
  } catch {
    /* no-op */
  }
});

const page = await ctx.newPage();
await page.goto(URL, { waitUntil: "networkidle" });

// Wait for the page to settle (animations, fonts).
await page.waitForTimeout(800);

const sections = [
  { name: "01-hero", selector: "main" },
  { name: "02-trust-bar", selector: "section[aria-label='Métricas verificables']" },
  { name: "03-who", selector: "#who" },
  { name: "04-projects", selector: "#projects" },
  { name: "05-process", selector: "#process" },
  { name: "06-github", selector: "#github" },
  { name: "07-experiments", selector: "#lab" },
  { name: "08-notes", selector: "#notes" },
  { name: "09-feedback-log", selector: "#feedback" },
  { name: "10-contact", selector: "#contact" },
  { name: "11-footer", selector: "footer.zone-drench" },
];

for (const { name, selector } of sections) {
  const el = page.locator(selector).first();
  await el.scrollIntoViewIfNeeded();
  await page.waitForTimeout(600);
  await page.screenshot({ path: `${OUT_DIR}/page-${name}.png` });
  console.log("captured", name);
}

// Also one full-page screenshot for the bird's-eye view.
await page.evaluate(() => window.scrollTo(0, 0));
await page.waitForTimeout(400);
await page.screenshot({
  path: `${OUT_DIR}/page-full.png`,
  fullPage: true,
});
console.log("captured full");

await browser.close();
