import { test, expect } from "@playwright/test";

test.describe("Homepage smoke", () => {
  test("renders hero with name", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    await expect(page.getByText("Robertino Barbuto").first()).toBeVisible();
  });

  test("mode toggle switches copy", async ({ page }) => {
    await page.goto("/");
    // Hero words are split into per-word spans for stagger animation.
    // Assert by individual distinctive words.
    const devBtn = page.getByRole("radio", { name: /Dev/i });
    await devBtn.click();
    await expect(page.getByText(/agénticos/i).first()).toBeVisible();

    const clientBtn = page.getByRole("radio", { name: /Cliente/i });
    await clientBtn.click();
    await expect(page.getByText("armo").first()).toBeVisible();
  });

  test("projects section renders all featured projects", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByRole("heading", { name: /Marketplace agéntico/i })).toBeVisible();
    await expect(page.getByRole("heading", { name: /Aredes Asociados/i })).toBeVisible();
    await expect(page.getByRole("heading", { name: /Madre Naturaleza/i })).toBeVisible();
  });

  test("github section renders heatmap container", async ({ page }) => {
    await page.goto("/");
    const githubHeader = page.getByText(/Lo que vengo construyendo/i);
    await githubHeader.scrollIntoViewIfNeeded();
    await expect(githubHeader).toBeVisible();
  });

  test("contact + footer render", async ({ page }) => {
    await page.goto("/");
    await page.locator("footer").last().scrollIntoViewIfNeeded();
    await expect(page.getByText("robertino").last()).toBeVisible();
  });

  test("respects prefers-reduced-motion", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/");
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  });
});

test.describe("Marketplace manifesto", () => {
  test("renders hero claim", async ({ page }) => {
    await page.goto("/marketplace");
    await expect(
      page.getByRole("heading", { name: /Squads de IA verticales/i }),
    ).toBeVisible();
  });

  test("has back link to home", async ({ page }) => {
    await page.goto("/marketplace");
    const link = page.getByRole("link", { name: /portfolio/i });
    await expect(link).toHaveAttribute("href", "/");
  });
});

test.describe("Ask palette", () => {
  test("opens with Cmd+K and shows input", async ({ page }) => {
    await page.goto("/");
    await page.keyboard.press("ControlOrMeta+K");
    await expect(page.getByPlaceholder(/Preguntá|comandos/i).first()).toBeVisible();
  });

  test("command mode triggers with >", async ({ page }) => {
    await page.goto("/");
    await page.keyboard.press("ControlOrMeta+K");
    const input = page.getByPlaceholder(/Preguntá|comandos/i).first();
    await input.fill(">");
    await expect(page.getByText(/modo comando/i)).toBeVisible();
  });

  test("Esc closes the palette", async ({ page }) => {
    await page.goto("/");
    await page.keyboard.press("ControlOrMeta+K");
    const input = page.getByPlaceholder(/Preguntá|comandos/i).first();
    await expect(input).toBeVisible();
    await page.keyboard.press("Escape");
    // AnimatePresence runs an exit transition; use not.toBeVisible with a tolerant wait.
    await expect(input).not.toBeVisible({ timeout: 2000 });
  });
});

test.describe("404", () => {
  test("not-found page renders", async ({ page }) => {
    const res = await page.goto("/this-does-not-exist");
    expect(res?.status()).toBe(404);
    await expect(page.getByRole("heading", { name: /404/ })).toBeVisible();
  });
});

test.describe("ASCII grammar v1", () => {
  test("boot sequence appears on first visit and clears", async ({ page }) => {
    await page.goto("/");
    const bootText = page.getByText(/booting rober8b/i);
    await bootText.waitFor({ state: "visible", timeout: 6000 });
    // overlay unmounts (phase=done) after the fade
    await bootText.waitFor({ state: "detached", timeout: 5000 });
  });

  test("boot skipped on repeat visit via sessionStorage", async ({ page }) => {
    await page.goto("/");
    const bootText = page.getByText(/booting rober8b/i);
    await bootText.waitFor({ state: "visible", timeout: 6000 });
    await bootText.waitFor({ state: "detached", timeout: 5000 });
    await page.reload();
    await expect(page.getByText(/booting rober8b/i)).toHaveCount(0);
  });

  test("section transitions render between zones", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByText(/mounting \/who\.manifesto/i)).toBeAttached();
    await expect(page.getByText(/loading projects\.featured/i)).toBeAttached();
    await expect(page.getByText(/entering experiments\.runtime/i)).toBeAttached();
  });

  test("feedback.log renders only placeholders (no fake quotes)", async ({ page }) => {
    await page.goto("/");
    await page.locator("#feedback").scrollIntoViewIfNeeded();
    await expect(page.getByText(/feedback\.log/i).first()).toBeVisible();
    await expect(page.getByText(/pendiente/i).first()).toBeVisible();
  });

  test("reduced motion does not break boot sequence", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/");
    // Under reduced motion, boot collapses to an instant render + short hold.
    // h1 must remain visible throughout — boot does not block paint.
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  });
});
