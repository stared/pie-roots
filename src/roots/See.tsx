import { EYE_NODES, type EyeNode } from "./data/weyd";
import { noteLine, rad } from "./types";

const CX = 850, CY = 620;
// elliptical polar coordinates: the eye is wider than tall, so a unit of
// radius stretches KX horizontally and KY vertically. r = const is an
// ellipse — the rim needs no clamping, chains grow radially to the edge.
const KX = 1.6, KY = 0.82;
const R0 = 70; // links leave the root from here
const R_EDGE = 460; // the rim ellipse (faint guide)

const polarE = (a: number, r: number): [number, number] => [
  CX + KX * r * Math.cos(rad(a)),
  CY + KY * r * Math.sin(rad(a)),
];

interface Laid extends EyeNode { x: number; y: number }

const laid: Record<string, Laid> = {};
for (const n of EYE_NODES) {
  const [x, y] = polarE(n.a, n.r);
  laid[n.id] = { ...n, x, y };
}

export default function See() {
  const nodes = Object.values(laid);
  return (
    <svg viewBox="0 205 1700 860" role="img" aria-label="Descent of PIE *weyd-, words arranged as an eye">
      {/* the rim, faintly */}
      <ellipse cx={CX} cy={CY} rx={KX * R_EDGE} ry={KY * R_EDGE} className="t-guide" fill="none" />

      {/* links: straight segments — curvature carries no meaning, so chains
          without splits are single lines with their nodes ON the line */}
      {nodes.map(n => {
        const [px, py] = n.parent ? [laid[n.parent].x, laid[n.parent].y] : polarE(n.a, R0);
        return <line key={`l-${n.id}`} x1={px} y1={py} x2={n.x} y2={n.y}
          className="t-link" strokeDasharray={n.dashed ? "5 4" : undefined} />;
      })}

      {/* nodes */}
      {nodes.map(n => {
        const modern = n.kind === "modern";
        let above = n.y < CY;
        if (n.flip) above = !above;
        let anchor: "start" | "middle" | "end" = "middle", tx = n.x;
        if (n.x > CX + 580) { anchor = "end"; tx = n.x - 4; }
        if (n.x < CX - 580) { anchor = "start"; tx = n.x + 4; }
        if (n.labelLeft) { anchor = "end"; tx = n.x - 10; }
        if (n.labelRight) { anchor = "start"; tx = n.x + 10; }
        const dy = above ? -13 : 26;
        return (
          <g key={n.id}>
            {modern
              ? <circle cx={n.x} cy={n.y} r={4.4} className="t-dot" />
              : <circle cx={n.x} cy={n.y} r={4} fill="none" className="t-ring"
                  strokeDasharray={n.kind === "proto" ? "2 2" : undefined} />}
            <text x={tx} y={n.y + dy} textAnchor={anchor}
              className={modern ? "t-word" : "t-anc"}>{n.form}</text>
            {noteLine(n) && (
              <text x={tx} y={n.y + dy + (above ? -16 : 17)} textAnchor={anchor} className="t-note">{noteLine(n)}</text>
            )}
          </g>
        );
      })}

      {/* the root at the pupil's place */}
      <text x={CX} y={CY + 2} textAnchor="middle" className="t-root">*weyd-</text>
      <text x={CX} y={CY + 30} textAnchor="middle" className="t-root-gloss">to see → to know</text>
    </svg>
  );
}
