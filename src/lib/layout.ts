// Radial layout: root at the exact center, descent flowing outward.
// Angle comes from a tidy d3 tree run on the full hierarchy (so branch sectors
// scale with their populations); radius encodes era-like depth so that modern
// English words form the outer rim — the points of the star.

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

const RIM = 420; // radius of the modern-word rim, in layout units

/** Radius ring: root center; reconstructions close-in; attestations by their
 * chain depth; modern words snapped to the rim. */
function ring(n: HierarchyPointNode<EtymNode>): number {
  const kind = n.data.kind;
  if (kind === "root") return 0;
  if (kind === "reconstructed") return 0.28 * RIM;
  if (kind === "modern") return RIM;
  // attested: deeper chains sit further out, capped below the rim
  let attestedAbove = 0;
  for (let p = n.parent; p; p = p.parent) {
    if (p.data.kind === "attested") attestedAbove++;
  }
  return Math.min(0.5 + 0.14 * attestedAbove, 0.82) * RIM;
}

export function buildLayout(): Layout {
  const root = hierarchy<EtymNode>(TREE);
  root.count(); // populate .value with leaf counts for sector weighting

  const t = tree<EtymNode>()
    .size([2 * Math.PI, 1])
    .separation((a, b) => ((a.parent === b.parent ? 1 : 1.6) / Math.max(a.depth, 1)));
  const pointRoot = t(root);

  const byId = new Map<string, LaidNode>();
  const nodes: LaidNode[] = [];

  pointRoot.each((n) => {
    const angle = n.x;
    const r = ring(n);
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

  const pad = 150; // room for rim labels
  const extent = { x0: -RIM - pad, y0: -RIM - pad, x1: RIM + pad, y1: RIM + pad };
  return { nodes, links, byId, extent };
}

/** Link path: a gentle radial curve from parent to child. */
export function linkPath(l: LaidLink): string {
  const { source: s, target: t } = l;
  if (s.r === 0) return `M0,0L${t.x},${t.y}`;
  // curve through an intermediate point at the child's angle, parent's radius
  const mx = Math.sin(t.angle) * s.r;
  const my = -Math.cos(t.angle) * s.r;
  return `M${s.x},${s.y}Q${mx},${my} ${t.x},${t.y}`;
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
