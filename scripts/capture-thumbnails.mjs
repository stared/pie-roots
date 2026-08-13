import fs from "node:fs/promises";
import puppeteer from "puppeteer-core";

const base = process.env.BASE ?? "http://127.0.0.1:8765";
const output = new URL("../public/thumbnails/", import.meta.url);
const requested = new Set(process.argv.slice(2));
const pages = [
  ["deru", "https://p.migdal.pl/tree-of-tree/"],
  ["weyd-magic", `${base}/weyd-magic/`],
  ["weyd", `${base}/weyd/`],
  ["kwel", `${base}/kwel/`],
  ["h2ster", `${base}/h2ster/`],
  ["bheh2", `${base}/bheh2/`],
  ["sed", `${base}/sed/`],
].filter(([name]) => requested.size === 0 || requested.has(name));

await fs.mkdir(output, { recursive: true });
const browser = await puppeteer.launch({
  executablePath: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  headless: true,
});
const page = await browser.newPage();
await page.setViewport({ width: 1500, height: 1100, deviceScaleFactor: 1 });

for (const [name, url] of pages) {
  await page.goto(url, { waitUntil: "networkidle0" });
  await page.evaluate(() => document.fonts.ready);
  if (name === "deru") {
    await page.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight * 0.82));
    await new Promise((resolve) => setTimeout(resolve, 1200));
  }
  const chart = await page.evaluateHandle(() => {
    const candidates = [...document.querySelectorAll("svg")]
      .filter((svg) => {
        const box = svg.getBoundingClientRect();
        return box.width > 250 && box.height > 150;
      });
    return candidates.sort((a, b) => {
      const aa = a.getBoundingClientRect();
      const bb = b.getBoundingClientRect();
      return bb.width * bb.height - aa.width * aa.height;
    })[0];
  });
  const element = chart.asElement();
  if (!element) throw new Error(`No chart SVG found at ${url}`);
  await element.screenshot({
    path: new URL(`${name}.jpg`, output).pathname,
    type: "jpeg",
    quality: 82,
  });
  console.log(`captured ${name}`);
}

await browser.close();
