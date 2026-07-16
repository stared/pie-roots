// Screenshot the root visualizations. Needs a running server:
//   pnpm build && pnpm preview --port 4331   (or pnpm roots for the dev server)
// Usage: BASE=http://localhost:4331 node scripts/shoot-roots.mjs [weyd weyd-magic/?share ...]
import puppeteer from "puppeteer-core";

const BASE = process.env.BASE ?? "http://localhost:4331";
const OUT = process.env.OUT ?? "/tmp/roots";
const views = process.argv.slice(2).length ? process.argv.slice(2) : ["weyd", "weyd-magic", "bheh2", "sed", "kwel"];

const browser = await puppeteer.launch({
  executablePath: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  headless: true,
});
const page = await browser.newPage();
await page.setViewport({ width: 1500, height: 1400, deviceScaleFactor: 1.5 });
const errors = [];
page.on("console", (m) => { if (m.type() === "error") errors.push(m.text()); });
page.on("pageerror", (e) => errors.push(String(e)));

for (const v of views) {
  // a view is a path, optionally with a query: "weyd", "weyd-magic/?share"
  const path = v.includes("/") ? v : `${v}/`;
  await page.goto(`${BASE}/${path}`, { waitUntil: "networkidle0" });
  await page.evaluate(() => document.fonts.ready);
  const name = v.replace(/[/?#]/g, "");
  await page.screenshot({ path: `${OUT}-${name}.png`, fullPage: true });
  console.log(`${v}: shot -> ${OUT}-${name}.png`);
}
console.log("console errors:", errors.length ? errors : "none");
await browser.close();
