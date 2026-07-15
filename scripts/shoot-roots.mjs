// Screenshot the four root visualizations. Needs a running server:
//   pnpm build && pnpm preview --port 4331   (or pnpm roots for the dev server)
// Usage: BASE=http://localhost:4331 node scripts/shoot-roots.mjs [see speak sit turn]
import puppeteer from "puppeteer-core";

const BASE = process.env.BASE ?? "http://localhost:4331";
const OUT = process.env.OUT ?? "/tmp/roots";
const views = process.argv.slice(2).length ? process.argv.slice(2) : ["see", "know", "speak", "sit", "turn"];

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
  await page.goto(`${BASE}/roots.html#${v}`, { waitUntil: "networkidle0" });
  await page.reload({ waitUntil: "networkidle0" }); // hash-only navigations don't refetch
  await page.evaluate(() => document.fonts.ready);
  await page.screenshot({ path: `${OUT}-${v}.png`, fullPage: true });
  console.log(`${v}: shot -> ${OUT}-${v}.png`);
}
console.log("console errors:", errors.length ? errors : "none");
await browser.close();
