// Shared helpers for the root visualizations. Angles are screen degrees:
// 0 = east, 90 = down (SVG y grows downward).

import { linkRadial } from "d3-shape";

export const rad = (deg: number): number => (deg * Math.PI) / 180;

/** A chart word: gloss and language live in separate fields (data),
 *  and are composed into the "gloss · language" note line only here
 *  (presentation). English words carry neither. */
export interface WordNode {
  id: string;
  form: string;
  gloss?: string;
  lang?: string;
  /** romanization for non-Latin scripts, shown as its own [translit] line */
  translit?: string;
  kind: "proto" | "ancestor" | "modern";
  parent?: string;
  /** the step from the parent is uncertain in the sources */
  dashed?: boolean;
}

export const noteLine = (n: { gloss?: string; lang?: string }): string | undefined => {
  const line = [n.gloss, n.lang].filter(Boolean).join(" · ");
  return line || undefined;
};

export const polar = (cx: number, cy: number, deg: number, r: number): [number, number] => [
  cx + Math.cos(rad(deg)) * r,
  cy + Math.sin(rad(deg)) * r,
];

/** Stroke-only circular arc between two screen angles at radius r. */
export function arcPath(cx: number, cy: number, r: number, a0: number, a1: number): string {
  const [x0, y0] = polar(cx, cy, a0, r);
  const [x1, y1] = polar(cx, cy, a1, r);
  const large = Math.abs(a1 - a0) > 180 ? 1 : 0;
  return `M ${x0},${y0} A ${r} ${r} 0 ${large} 1 ${x1},${y1}`;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const radialGen: any = linkRadial()
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  .angle((d: any) => d[0])
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  .radius((d: any) => d[1]);

/**
 * Smooth radial link between two polar points (screen degrees, origin-relative
 * path — render inside a translated <g>).
 */
export const radialPath = (a0: number, r0: number, a1: number, r1: number): string =>
  radialGen({ source: [rad(a0 + 90), r0], target: [rad(a1 + 90), r1] }) ?? "";

/**
 * Spiral link: angle and radius interpolate together, so the tangent always
 * follows the direction of travel — same-ray links are straight, lateral
 * links are one soft arc, never an S (unlike linkRadial, which forces radial
 * tangents at both ends and absorbs lateral offset mid-curve as a wobble).
 * Origin-relative; screen degrees.
 */
export const spiralPath = (a0: number, r0: number, a1: number, r1: number): string => {
  const N = 24;
  const pts: string[] = [];
  for (let i = 0; i <= N; i++) {
    const t = i / N;
    const a = rad(a0 + (a1 - a0) * t);
    const r = r0 + (r1 - r0) * t;
    pts.push(`${(Math.cos(a) * r).toFixed(1)},${(Math.sin(a) * r).toFixed(1)}`);
  }
  return `M ${pts[0]} L ${pts.slice(1).join(" ")}`;
};
