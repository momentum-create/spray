/**
 * Capture mock site screenshots for presentation / handoff.
 * Usage: npm run capture:serve  (starts server + captures)
 *        npm run capture        (server already on :3456)
 */
import { spawn } from "node:child_process";
import { createServer } from "node:http";
import { readFileSync, mkdirSync, existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { chromium } from "playwright";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const OUT = join(ROOT, "mock-images");
const PORT = 3456;
const BASE = `http://127.0.0.1:${PORT}/index.html?capture=1`;

const SHOTS = [
  { name: "desktop-hero", viewport: { width: 1440, height: 900 }, clip: { selector: ".hero" } },
  { name: "desktop-intro", viewport: { width: 1440, height: 900 }, clip: { selector: ".intro" } },
  { name: "desktop-insight", viewport: { width: 1440, height: 900 }, clip: { selector: ".insight" } },
  { name: "desktop-process", viewport: { width: 1440, height: 900 }, clip: { selector: ".process" } },
  { name: "desktop-stories", viewport: { width: 1440, height: 900 }, clip: { selector: ".stories" } },
  { name: "desktop-access", viewport: { width: 1440, height: 900 }, clip: { selector: ".access" } },
  { name: "desktop-full", viewport: { width: 1440, height: 900 }, fullPage: true },
  { name: "mobile-hero", viewport: { width: 390, height: 844 }, clip: { selector: ".hero" } },
  { name: "mobile-full", viewport: { width: 390, height: 844 }, fullPage: true },
];

function startStaticServer() {
  return new Promise((resolve) => {
    const server = createServer((req, res) => {
      let path = req.url?.split("?")[0] || "/";
      if (path === "/" || path === "/mock-001") path = "/index.html";
      const file = join(ROOT, path.replace(/^\//, "") || "index.html");
      try {
        const data = readFileSync(file);
        const ext = file.split(".").pop();
        const types = { html: "text/html", json: "application/json", png: "image/png", jpg: "image/jpeg" };
        res.writeHead(200, { "Content-Type": types[ext] || "application/octet-stream" });
        res.end(data);
      } catch {
        res.writeHead(404).end("Not found");
      }
    });
    server.listen(PORT, "127.0.0.1", () => resolve(server));
  });
}

async function captureAll() {
  mkdirSync(OUT, { recursive: true });
  const browser = await chromium.launch();
  const page = await browser.newPage();

  for (const shot of SHOTS) {
    await page.setViewportSize(shot.viewport);
    await page.goto(BASE, { waitUntil: "networkidle", timeout: 60000 });
    await page.waitForTimeout(1200);

    const outPath = join(OUT, `${shot.name}.png`);
    if (shot.fullPage) {
      await page.screenshot({ path: outPath, fullPage: true });
    } else if (shot.clip?.selector) {
      const el = page.locator(shot.clip.selector).first();
      await el.scrollIntoViewIfNeeded();
      await page.waitForTimeout(400);
      await el.screenshot({ path: outPath });
    }
    console.log("saved", outPath);
  }

  await browser.close();
}

const shouldServe = process.argv.includes("--serve");
let server;
if (shouldServe) {
  server = await startStaticServer();
  console.log(`Server http://127.0.0.1:${PORT}/`);
}
try {
  await captureAll();
} finally {
  if (server) server.close();
}
