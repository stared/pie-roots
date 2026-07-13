import { EYE_NODES, type EyeNode } from "./data/weyd";
import { polar, rad, radialPath } from "./types";

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

      {/* Hades, just outside the lower rim — no link into the eye: the Unseen */}
      <circle cx={1210} cy={945} r={4} fill="none" className="t-ring" />
      <text x={1210} y={933} textAnchor="middle" className="t-anc">Ἀΐδης</text>
      <text x={1210} y={984} textAnchor="middle" className="t-note">the Unseen: *n̥- ‘un-’ + wid- ‘seen’ · Greek</text>
      <line x1={1218} y1={948} x2={1438} y2={968} className="t-link" strokeDasharray="5 4" />
      <circle cx={1444} cy={968} r={4.4} className="t-dot" />
      <text x={1458} y={974} className="t-word">Hades</text>

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
        const dy = above ? -13 : 26;
        return (
          <g key={n.id}>
            {modern
              ? <circle cx={n.x} cy={n.y} r={4.4} className="t-dot" />
              : <circle cx={n.x} cy={n.y} r={4} fill="none" className="t-ring"
                  strokeDasharray={n.kind === "proto" ? "2 2" : undefined} />}
            <text x={tx} y={n.y + dy} textAnchor={anchor}
              className={modern ? "t-word" : "t-anc"}>{n.form}</text>
            {n.note && (
              <text x={tx} y={n.y + dy + (above ? -16 : 17)} textAnchor={anchor} className="t-note">{n.note}</text>
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
