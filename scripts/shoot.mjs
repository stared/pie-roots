import puppeteer from "puppeteer-core";

const OUT = process.env.OUT ?? "/tmp/star-shot";
const browser = await puppeteer.launch({
  executablePath: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  headless: true,
});
const page = await browser.newPage();
await page.setViewport({ width: 1500, height: 950, deviceScaleFactor: 1.5 });
const errors = [];
page.on("console", (msg) => {
  if (msg.type() === "error") errors.push(msg.text());
});
page.on("pageerror", (err) => errors.push(String(err)));
await page.goto(process.env.URL ?? "http://localhost:4323/", { waitUntil: "networkidle0" });
await page.evaluate(() => document.fonts.ready);

// 1. hero
await page.screenshot({ path: `${OUT}-hero.png` });
// 2. scroll to a mid story step (stella chapter)
await page.evaluate(() => {
  const steps = document.querySelectorAll(".step");
  steps[3]?.scrollIntoView({ block: "center" });
});
await new Promise((r) => setTimeout(r, 1400));
await page.screenshot({ path: `${OUT}-step4.png` });
// 3. explore overlay (full star)
await page.evaluate(() => {
  const steps = document.querySelectorAll(".step");
  steps[steps.length - 1]?.scrollIntoView({ block: "center" });
});
await new Promise((r) => setTimeout(r, 900));
await page.click(".explore-button");
await new Promise((r) => setTimeout(r, 600));
await page.screenshot({ path: `${OUT}-explore.png` });

console.log("console errors:", errors.length ? errors : "none");
await browser.close();
