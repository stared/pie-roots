// Click the "download PNG / SVG" buttons on each root view and verify the files.
// Needs a running server:
//   pnpm build && pnpm preview --port 4331   (or pnpm roots for the dev server)
// Usage: BASE=http://localhost:4331 node scripts/test-downloads.mjs
import puppeteer from "puppeteer-core";
import fs from "node:fs";
import path from "node:path";

const BASE = process.env.BASE ?? "http://localhost:4331";
const OUT = process.env.OUT ?? "/tmp/roots-downloads";
fs.mkdirSync(OUT, { recursive: true });

const views = ["weyd", "weyd-magic", "bheh2", "sed", "kwel"];

const browser = await puppeteer.launch({
  executablePath: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  headless: true,
});
const page = await browser.newPage();
await page.setViewport({ width: 1500, height: 1400 });
const errors = [];
page.on("console", m => { if (m.type() === "error") errors.push(m.text()); });
page.on("pageerror", e => errors.push(String(e)));

const cdp = await page.createCDPSession();
const downloads = new Map(); // guid -> {suggested, done}
await cdp.send("Browser.setDownloadBehavior", {
  behavior: "allowAndName", downloadPath: OUT, eventsEnabled: true,
});
cdp.on("Browser.downloadWillBegin", e => {
  downloads.set(e.guid, { suggested: e.suggestedFilename, done: false });
});
cdp.on("Browser.downloadProgress", e => {
  const d = downloads.get(e.guid);
  if (d && e.state === "completed") d.done = true;
});

async function awaitDownload(prevCount) {
  const deadline = Date.now() + 15000;
  while (Date.now() < deadline) {
    const entries = [...downloads.entries()];
    if (entries.length > prevCount && entries[entries.length - 1][1].done)
      return entries[entries.length - 1];
    await new Promise(r => setTimeout(r, 100));
  }
  throw new Error("download timed out");
}

for (const v of views) {
  await page.goto(`${BASE}/${v}/`, { waitUntil: "networkidle0" });
  await page.evaluate(() => document.fonts.ready);
  for (const fmt of ["PNG", "SVG"]) {
    const prev = downloads.size;
    await page.evaluate(label => {
      const btn = [...document.querySelectorAll("button.dl")]
        .find(b => b.textContent === label);
      if (!btn) throw new Error(`no ${label} button`);
      btn.click();
    }, fmt);
    const [guid, info] = await awaitDownload(prev);
    const finalPath = path.join(OUT, info.suggested);
    fs.renameSync(path.join(OUT, guid), finalPath);
    const size = fs.statSync(finalPath).size;
    console.log(`${v} ${fmt}: ${info.suggested} (${(size / 1024).toFixed(0)} kB)`);
    if (size < 5000) throw new Error(`${info.suggested} suspiciously small`);
  }
}
console.log("console errors:", errors.length ? errors : "none");
await browser.close();
