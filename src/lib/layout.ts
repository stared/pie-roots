// Radial layout: root at the exact center, descent flowing outward.
// Angle comes from a tidy d3 tree run on the full hierarchy (so branch sectors
// scale with their populations). Radius is ORGANIC: each generation steps
// outward by a slightly irregular amount, so nothing sits on a shared circle —
// arms with deeper histories simply reach further.

import { hierarchy, tree, type HierarchyPointNode } from "d3-hierarchy";
import { TREE, senseColor, type EtymNode } from "../data/etymology";

export interface LaidNode {
  node: EtymNode;
  x: number;
  y: number;
  angle: number; // radians, 0 = up
  r: number;
  color: string;
  lineage: string[]; // ids from root down to (and including) this node
  subtreeSize: number;
}

export interface LaidLink {
  source: LaidNode;
  target: LaidNode;
  disputed: boolean;
}

export interface Layout {
  nodes: LaidNode[];
  links: LaidLink[];
  byId: Map<string, LaidNode>;
  extent: { x0: number; y0: number; x1: number; y1: number };
}

const FIRST_STEP = 150; // root → branch head
const STEP = 96; // each later generation
// Deterministic per-node wobble so siblings never share a radius.
function wobble(id: string): number {
  let h = 0;
  for (let i = 0; i < id.length; i++) h = (h * 31 + id.charCodeAt(i)) | 0;
  return 0.82 + ((h >>> 3) % 1000) / 1000 * 0.36; // 0.82 … 1.18
}

function radius(n: HierarchyPointNode<EtymNode>): number {
  if (!n.parent) return 0;
  const step = n.depth === 1 ? FIRST_STEP : STEP;
  return radius(n.parent) + step * wobble(n.data.id);
}

export function buildLayout(): Layout {
  const root = hierarchy<EtymNode>(TREE);
  root.count(); // populate .value with leaf counts for sector weighting

  const t = tree<EtymNode>()
    .size([2 * Math.PI, 1])
    .separation((a, b) => ((a.parent === b.parent ? 1 : 2) / Math.max(a.depth, 1)));
  const pointRoot = t(root);

  const byId = new Map<string, LaidNode>();
  const nodes: LaidNode[] = [];

  pointRoot.each((n) => {
    const angle = n.x;
    const r = radius(n);
    const laid: LaidNode = {
      node: n.data,
      angle,
      r,
      x: Math.sin(angle) * r,
      y: -Math.cos(angle) * r,
      color: senseColor(n.data),
      lineage: n.ancestors().map((a) => a.data.id).reverse(),
      subtreeSize: n.value ?? 1,
    };
    byId.set(n.data.id, laid);
    nodes.push(laid);
  });

  const links: LaidLink[] = [];
  pointRoot.each((n) => {
    if (!n.parent) return;
    links.push({
      source: byId.get(n.parent.data.id)!,
      target: byId.get(n.data.id)!,
      disputed: !!n.data.disputed,
    });
  });

  // Symmetric extent around the root: the story camera's framing math assumes
  // the origin sits at the viewBox center.
  const pad = 170; // room for rim labels
  let reach = 0;
  for (const n of nodes) {
    reach = Math.max(reach, Math.abs(n.x), Math.abs(n.y));
  }
  const R = reach + pad;
  const extent = { x0: -R, y0: -R, x1: R, y1: R };
  return { nodes, links, byId, extent };
}

/** Link path: a straight line from parent to child. */
export function linkPath(l: LaidLink): string {
  return `M${l.source.x},${l.source.y}L${l.target.x},${l.target.y}`;
}

/** SVG path for an n-pointed star centered at 0,0 (rotate/translate outside). */
export function starPath(points: number, outer: number, inner: number): string {
  const step = Math.PI / points;
  let d = "";
  for (let i = 0; i < points * 2; i++) {
    const r = i % 2 === 0 ? outer : inner;
    const a = i * step - Math.PI / 2;
    d += `${i === 0 ? "M" : "L"}${(Math.cos(a) * r).toFixed(2)},${(Math.sin(a) * r).toFixed(2)}`;
  }
  return d + "Z";
}
