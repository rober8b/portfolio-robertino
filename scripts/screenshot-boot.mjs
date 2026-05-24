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
const page = await ctx.newPage();

await page.goto(URL, { waitUntil: "domcontentloaded" });

// Wait for boot to mount
await page.getByText(/booting rober8b/i).waitFor({ state: "visible", timeout: 5000 });

// Frame 1 — early in the boot, ~2 lines revealed
await page.waitForTimeout(180);
await page.screenshot({ path: `${OUT_DIR}/boot-01-early.png` });

// Frame 2 — mid-boot, ~4 lines revealed
await page.waitForTimeout(280);
await page.screenshot({ path: `${OUT_DIR}/boot-02-mid.png` });

// Frame 3 — near-final, last line visible
await page.waitForTimeout(380);
await page.screenshot({ path: `${OUT_DIR}/boot-03-final.png` });

console.log("Wrote 3 frames to", OUT_DIR);
await browser.close();
