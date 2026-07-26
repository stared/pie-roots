// Geometry audit for a chart — the things screenshots hide at page zoom:
// links drawn across a word, links crossing each other, and pairs of links
// running so close they read as one thick wire.
//
// Needs a running server (pnpm build && pnpm preview --port 4331):
//   BASE=http://localhost:4331 node scripts/audit-roots.mjs sed
//
// Also reports label overflow and label collisions, so it covers the whole
// "does this chart hold together geometrically" question in one pass.
import puppeteer from "puppeteer-core";

const BASE = process.env.BASE ?? "http://localhost:4331";
const slug = process.argv[2] ?? "sed";
const browser = await puppeteer.launch({
  executablePath: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  headless: true,
});
const page = await browser.newPage();
await page.setViewport({ width: 1500, height: 1400, deviceScaleFactor: 1 });
await page.goto(`${BASE}/${slug}/`, { waitUntil: "networkidle0" });
await page.evaluate(() => document.fonts.ready);

const out = await page.evaluate(() => {
  const svg = document.querySelector("figure svg");
  const links = [...svg.querySelectorAll("path.t-link, line.t-link")].map(el => {
    const len = el.getTotalLength ? el.getTotalLength() : 0;
    const N = Math.max(24, Math.round(len / 4));
    const pts = [];
    for (let i = 0; i <= N; i++) {
      const p = el.getPointAtLength((len * i) / N);
      pts.push([p.x, p.y]);
    }
    return { id: el.getAttribute("data-id") || el.getAttribute("key") || "", d: el.getAttribute("d") || "", pts, len };
  });
  const texts = [...svg.querySelectorAll("text")].map(t => {
    const b = t.getBBox();
    return { s: t.textContent, cls: t.getAttribute("class") || "", x: b.x, y: b.y, w: b.width, h: b.height };
  });

  // 1. link points inside a glyph box (2px inset: halo already covers hairline grazes)
  const hits = [];
  for (const L of links)
    for (const t of texts) {
      const inside = L.pts.filter(([x, y]) =>
        x > t.x + 2 && x < t.x + t.w - 2 && y > t.y + 2 && y < t.y + t.h - 2);
      if (inside.length) hits.push({ text: t.s, cls: t.cls, pts: inside.length, at: inside[0].map(Math.round), d: L.d.slice(0, 46) });
    }

  // 2. link-link crossings, ignoring the shared origin of a bundle
  const seg = (a, b, c, d) => {
    const s1x = b[0] - a[0], s1y = b[1] - a[1], s2x = d[0] - c[0], s2y = d[1] - c[1];
    const den = -s2x * s1y + s1x * s2y;
    if (!den) return null;
    const s = (-s1y * (a[0] - c[0]) + s1x * (a[1] - c[1])) / den;
    const t = (s2x * (a[1] - c[1]) - s2y * (a[0] - c[0])) / den;
    return s > 0 && s < 1 && t > 0 && t < 1 ? [a[0] + t * s1x, a[1] + t * s1y] : null;
  };
  const crossings = [];
  for (let i = 0; i < links.length; i++)
    for (let j = i + 1; j < links.length; j++) {
      const A = links[i].pts, B = links[j].pts;
      const sharedStart = Math.hypot(A[0][0] - B[0][0], A[0][1] - B[0][1]) < 3;
      for (let a = 0; a < A.length - 1; a++)
        for (let b = 0; b < B.length - 1; b++) {
          const p = seg(A[a], A[a + 1], B[b], B[b + 1]);
          if (!p) continue;
          // a bundle's fan leaves one point: ignore intersections in that neck
          if (sharedStart && Math.hypot(p[0] - A[0][0], p[1] - A[0][1]) < 30) continue;
          crossings.push({ at: p.map(Math.round), a: links[i].d.slice(0, 40), b: links[j].d.slice(0, 40) });
          a = A.length; break;
        }
    }

  // 3. near-coincident links: pairs running within 2px for a long stretch
  const braids = [];
  for (let i = 0; i < links.length; i++)
    for (let j = i + 1; j < links.length; j++) {
      const A = links[i].pts, B = links[j].pts;
      let close = 0;
      for (const p of A) {
        let min = Infinity;
        for (const q of B) min = Math.min(min, Math.hypot(p[0] - q[0], p[1] - q[1]));
        if (min < 2) close++;
      }
      const frac = close / A.length;
      if (close > 12) braids.push({ px: Math.round(close * (links[i].len / A.length)), frac: +frac.toFixed(2), a: links[i].d.slice(0, 40), b: links[j].d.slice(0, 40) });
    }

  // 4. labels outside the viewBox, and labels overlapping each other
  const vb = svg.viewBox.baseVal;
  const overflow = texts.filter(t =>
    t.x < vb.x || t.x + t.w > vb.x + vb.width || t.y < vb.y || t.y + t.h > vb.y + vb.height)
    .map(t => t.s);
  const overlaps = [];
  for (let i = 0; i < texts.length; i++)
    for (let j = i + 1; j < texts.length; j++) {
      const a = texts[i], b = texts[j];
      if (a.x < b.x + b.w - 1 && b.x < a.x + a.w - 1 && a.y < b.y + b.h - 1 && b.y < a.y + a.h - 1)
        overlaps.push([a.s, b.s]);
    }

  return {
    nLinks: links.length, nTexts: texts.length, overflow, overlaps,
    hits, crossings, braids: braids.sort((x, y) => y.px - x.px).slice(0, 12),
  };
});
console.log(JSON.stringify(out, null, 1));
await browser.close();
