import { EYE_NODES, type EyeNode } from "./data/weyd";
import { noteLine, polar, rad, radialPath } from "./types";

const CX = 850, CY = 620;
const A = 780, B = 400; // almond half-axes: the silhouette the words trace
const R0 = 96; // links leave the root from here

const rmax = (a: number) => (A * B) / Math.hypot(B * Math.cos(rad(a)), A * Math.sin(rad(a)));
const almond = `M ${CX - A},${CY} Q ${CX},${CY - 2 * B} ${CX + A},${CY} Q ${CX},${CY + 2 * B} ${CX - A},${CY} Z`;

interface Laid extends EyeNode { x: number; y: number; re: number }

const laid: Record<string, Laid> = {};
for (const n of EYE_NODES) {
  const re = n.kind === "modern" ? Math.min(n.r, rmax(n.a) * 0.8) : n.r;
  const [x, y] = polar(CX, CY, n.a, re);
  laid[n.id] = { ...n, x, y, re };
}

export default function See() {
  const nodes = Object.values(laid);
  return (
    <svg viewBox="0 205 1700 860" role="img" aria-label="Descent of PIE *weyd-, words arranged as an eye">
      {/* the almond, faintly */}
      <path d={almond} className="t-guide" fill="none" />

      {/* links */}
      <g transform={`translate(${CX} ${CY})`}>
        {nodes.map(n => {
          const [pa, pr] = n.parent ? [laid[n.parent].a, laid[n.parent].re] : [n.a, R0];
          return <path key={n.id} d={radialPath(pa, pr, n.a, n.re)} fill="none"
            className="t-link" strokeDasharray={n.dashed ? "5 4" : undefined} />;
        })}
      </g>

      {/* nodes */}
      {nodes.map(n => {
        const modern = n.kind === "modern";
        let above = n.y < CY;
        if (n.flip) above = !above;
        let anchor: "start" | "middle" | "end" = "middle", tx = n.x;
        if (n.x > CX + 470) { anchor = "end"; tx = n.x - 4; }
        if (n.x < CX - 470) { anchor = "start"; tx = n.x + 4; }
        if (n.labelLeft) { anchor = "end"; tx = n.x - 10; }
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
