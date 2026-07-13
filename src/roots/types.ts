// Shared helpers for the root visualizations. Angles are screen degrees:
// 0 = east, 90 = down (SVG y grows downward).

import { linkRadial } from "d3-shape";

export const rad = (deg: number): number => (deg * Math.PI) / 180;

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
