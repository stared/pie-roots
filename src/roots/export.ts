// Download the current view as a self-contained poster (SVG or PNG).
//
// The on-page chart is styled by roots.css through ancestor selectors
// (.roots, .dark, .seat …), so a serialized copy would lose everything.
// Instead we rebuild the poster as one standalone SVG: paper ground, title,
// the live chart with its computed styles inlined, legend, credit. PNG is
// that same SVG rasterized through a canvas.

const SVG_NS = "http://www.w3.org/2000/svg";

const CREDIT =
  "by Piotr Migdał · 2026 · p.migdal.pl/pie-roots · sources: Wiktionary, Etymonline";

// Geometry-affecting text props only make sense on text elements.
const TEXT_TAGS = new Set(["text", "tspan", "textPath"]);
const PAINT_PROPS = [
  "fill", "fill-opacity", "fill-rule",
  "stroke", "stroke-width", "stroke-dasharray", "stroke-dashoffset",
  "stroke-linecap", "stroke-linejoin", "stroke-opacity",
  "opacity", "paint-order", "visibility",
];
const TEXT_PROPS = [
  "font-family", "font-size", "font-style", "font-weight",
  "letter-spacing", "text-anchor", "dominant-baseline",
];
const SKIP: Record<string, string> = {
  "fill-opacity": "1", "fill-rule": "nonzero",
  "stroke": "none", "stroke-dasharray": "none", "stroke-dashoffset": "0px",
  "stroke-opacity": "1", "opacity": "1", "visibility": "visible",
  "letter-spacing": "normal", "dominant-baseline": "auto",
};

/** Copy computed styles from the live subtree onto its clone, recursively. */
function inlineStyles(src: Element, dst: Element): void {
  const cs = getComputedStyle(src);
  const props = TEXT_TAGS.has(src.tagName)
    ? [...PAINT_PROPS, ...TEXT_PROPS]
    : PAINT_PROPS;
  const style = props
    .map(p => [p, cs.getPropertyValue(p)] as const)
    .filter(([p, v]) => v && v !== SKIP[p])
    .map(([p, v]) => `${p}:${v}`)
    .join(";");
  if (style) dst.setAttribute("style", style);
  for (let i = 0; i < src.children.length; i++)
    inlineStyles(src.children[i], dst.children[i]);
}

const measureCtx = document.createElement("canvas").getContext("2d")!;
function textWidth(text: string, el: Element): number {
  const cs = getComputedStyle(el);
  measureCtx.font = `${cs.fontStyle} ${cs.fontWeight} ${cs.fontSize} ${cs.fontFamily}`;
  return measureCtx.measureText(text).width;
}

function el<K extends keyof SVGElementTagNameMap>(
  tag: K, attrs: Record<string, string | number>,
): SVGElementTagNameMap[K] {
  const node = document.createElementNS(SVG_NS, tag);
  for (const [k, v] of Object.entries(attrs)) node.setAttribute(k, String(v));
  return node;
}

/**
 * Assemble the poster. All page measurements (font sizes, gaps) are screen px
 * scaled by k = viewBox width / rendered chart width, so the poster keeps the
 * on-screen proportions of chart to type at any chart's native resolution.
 */
function buildPoster(): { svg: SVGSVGElement; width: number; height: number } {
  const root = document.querySelector<HTMLElement>(".roots");
  const chart = root?.querySelector<SVGSVGElement>("figure svg");
  const h1 = root?.querySelector("h1");
  if (!root || !chart || !h1) throw new Error("poster parts not found");

  const [, , vbW, vbH] = (chart.getAttribute("viewBox") ?? "").split(/\s+/).map(Number);
  const k = vbW / chart.getBoundingClientRect().width;
  const u = (px: number) => px * k;

  const paper = getComputedStyle(root).backgroundColor;
  const titleFs = u(parseFloat(getComputedStyle(h1).fontSize));
  const topPad = u(36);
  const chartY = topPad + titleFs * 1.28 + u(12);
  const legendBase = chartY + vbH + u(34);
  const creditBase = legendBase + u(24);
  const H = creditBase + u(26);

  const svg = el("svg", { xmlns: SVG_NS, viewBox: `0 0 ${vbW} ${H}`, width: vbW, height: H });
  svg.appendChild(el("rect", { width: vbW, height: H, fill: paper }));

  // title — mirror the h1's mixed runs (italic root, muted "means")
  const title = el("text", {
    x: vbW / 2, y: topPad + titleFs * 0.92,
    "text-anchor": "middle", "font-size": titleFs,
  });
  const h1cs = getComputedStyle(h1);
  title.setAttribute("style", `font-family:${h1cs.fontFamily};letter-spacing:${u(-0.02 * parseFloat(h1cs.fontSize))}px`);
  for (const node of h1.childNodes) {
    const run = document.createElementNS(SVG_NS, "tspan");
    run.textContent = node.textContent;
    const cs = getComputedStyle(node instanceof Element ? node : h1);
    run.setAttribute("style", `fill:${cs.color};font-style:${cs.fontStyle};font-weight:${cs.fontWeight}`);
    title.appendChild(run);
  }
  svg.appendChild(title);

  // chart — nested svg keeps its own coordinate space
  const clone = chart.cloneNode(true) as SVGSVGElement;
  inlineStyles(chart, clone);
  clone.setAttribute("x", "0");
  clone.setAttribute("y", String(chartY));
  clone.setAttribute("width", String(vbW));
  clone.setAttribute("height", String(vbH));
  svg.appendChild(clone);

  // legend — the footer's glyph+label pairs, centered as one row
  const items = [...root.querySelectorAll("footer.credit > span:not(.by)")].map(span => {
    const glyph = span.querySelector("svg")!;
    const label = (span.textContent ?? "").trim();
    return { glyph, label, w: u(glyph.clientWidth + 4) + u(textWidth(label, span)) };
  });
  const gap = u(22);
  let x = (vbW - items.reduce((s, i) => s + i.w, 0) - gap * (items.length - 1)) / 2;
  const legendCs = getComputedStyle(items[0]?.glyph.parentElement ?? root);
  const legendFs = u(parseFloat(legendCs.fontSize));
  for (const item of items) {
    const g = item.glyph.cloneNode(true) as SVGSVGElement;
    inlineStyles(item.glyph, g);
    g.setAttribute("viewBox", `0 0 ${item.glyph.clientWidth} ${item.glyph.clientHeight}`);
    g.setAttribute("x", String(x));
    g.setAttribute("y", String(legendBase - u(10)));
    g.setAttribute("width", String(u(item.glyph.clientWidth)));
    g.setAttribute("height", String(u(item.glyph.clientHeight)));
    svg.appendChild(g);
    const label = el("text", { x: x + u(item.glyph.clientWidth + 4), y: legendBase, "font-size": legendFs });
    label.setAttribute("style", `fill:${legendCs.color};font-family:${legendCs.fontFamily}`);
    label.textContent = item.label;
    svg.appendChild(label);
    x += item.w + gap;
  }

  const credit = el("text", { x: vbW / 2, y: creditBase, "text-anchor": "middle", "font-size": legendFs });
  credit.setAttribute("style", `fill:${legendCs.color};font-family:${legendCs.fontFamily}`);
  credit.textContent = CREDIT;
  svg.appendChild(credit);

  return { svg, width: vbW, height: H };
}

function saveBlob(blob: Blob, filename: string): void {
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = filename;
  a.click();
  URL.revokeObjectURL(a.href);
}

export async function downloadPoster(slug: string, format: "svg" | "png"): Promise<void> {
  await document.fonts.ready;
  const { svg, width, height } = buildPoster();
  const xml = new XMLSerializer().serializeToString(svg);
  const svgBlob = new Blob([xml], { type: "image/svg+xml;charset=utf-8" });

  if (format === "svg") {
    saveBlob(svgBlob, `${slug}-poster.svg`);
    return;
  }

  const url = URL.createObjectURL(svgBlob);
  try {
    const img = new Image();
    await new Promise((resolve, reject) => {
      img.onload = resolve;
      img.onerror = reject;
      img.src = url;
    });
    const scale = 2; // viewBox units ≈ 1.3× screen px, so 2× vb ≈ 2.6× screen
    const canvas = document.createElement("canvas");
    canvas.width = Math.round(width * scale);
    canvas.height = Math.round(height * scale);
    canvas.getContext("2d")!.drawImage(img, 0, 0, canvas.width, canvas.height);
    const png = await new Promise<Blob | null>(r => canvas.toBlob(r, "image/png"));
    if (!png) throw new Error("PNG encoding failed");
    saveBlob(png, `${slug}-poster.png`);
  } finally {
    URL.revokeObjectURL(url);
  }
}
