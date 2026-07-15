import { KNOW_NODES, type KnowNode } from "./data/woyde";
import { noteLine, rad } from "./types";

const CX = 850, CY = 620;
// a radiance: straight rays bursting from the root in every direction,
// no rim, no silhouette — the burst of lines is the only shape. Links fade
// as they travel outward, like light. Mildly elliptical to use the width.
const KX = 1.35, KY = 0.88;
const R0 = 70; // links leave the root from here
const R_FADE = 460; // opacity floor is reached out here

const polarE = (a: number, r: number): [number, number] => [
  CX + KX * r * Math.cos(rad(a)),
  CY + KY * r * Math.sin(rad(a)),
];

interface Laid extends KnowNode { x: number; y: number }

const laid: Record<string, Laid> = {};
for (const n of KNOW_NODES) {
  const [x, y] = polarE(n.a, n.r);
  laid[n.id] = { ...n, x, y };
}

export default function Know() {
  const nodes = Object.values(laid);
  return (
    <svg viewBox="0 195 1700 880" role="img" aria-label="Descent of PIE *weyd- into words of secret knowing, rays from the root">
      {/* links: straight rays, fading outward */}
      {nodes.map(n => {
        const p = n.parent ? laid[n.parent] : undefined;
        const [px, py] = p ? [p.x, p.y] : polarE(n.a, R0);
        const rMid = ((p?.r ?? R0) + n.r) / 2;
        const fade = 1 - 0.55 * Math.min(rMid / R_FADE, 1);
        return <line key={`l-${n.id}`} x1={px} y1={py} x2={n.x} y2={n.y}
          className="t-link" strokeOpacity={fade}
          strokeDasharray={n.dashed ? "5 4" : undefined} />;
      })}

      {/* nodes */}
      {nodes.map(n => {
        const modern = n.kind === "modern";
        let above = n.y < CY;
        if (n.flip) above = !above;
        let anchor: "start" | "middle" | "end" = "middle", tx = n.x;
        if (n.x > CX + 560) { anchor = "start"; tx = n.x + 9; }
        if (n.x < CX - 560) { anchor = "end"; tx = n.x - 9; }
        if (n.labelLeft) { anchor = "end"; tx = n.x - 10; }
        if (n.labelRight) { anchor = "start"; tx = n.x + 10; }
        if (n.dx) tx += n.dx;
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

      {/* the root as the source of light */}
      <text x={CX} y={CY + 2} textAnchor="middle" className="t-root">*weyd-</text>
      <text x={CX} y={CY + 30} textAnchor="middle" className="t-root-gloss">to see means to know</text>
    </svg>
  );
}
