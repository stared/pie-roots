import { TURN_NODES, RING, ringR, type TurnNode } from "./data/kwel";
import { noteLine, polar } from "./types";

const CX = 830, CY = 790;
const LBL = 120; // beyond CX±LBL labels anchor sideways

interface Laid extends TurnNode { x: number; y: number }

const laid: Record<string, Laid> = {};
for (const n of TURN_NODES) {
  const [x, y] = polar(CX, CY, n.a, ringR(n.d));
  laid[n.id] = { ...n, x, y };
}

export default function Turn() {
  const nodes = Object.values(laid);
  return (
    <svg viewBox="215 250 1190 1080" className="wheel" role="img" aria-label="Descent of PIE *kʷel-, words arranged as a wheel">
      {/* the rims: one faint circle per ring */}
      {RING.slice(1).map(r => (
        <circle key={r} cx={CX} cy={CY} r={r} fill="none" className="t-guide" />
      ))}

      {/* spokes: straight segments from the parent node; lines start at ring 1,
          so root-level nodes on ring 1 get no inward spoke — contested root-level
          nodes on ring 2 (τῆλε, τέλος) keep a dashed stub back to ring 1 */}
      {nodes.map(n => {
        if (!n.parent && n.d <= 1) return null;
        const [px, py] = n.parent ? [laid[n.parent].x, laid[n.parent].y] : polar(CX, CY, n.a, RING[1]);
        return <line key={n.id} x1={px} y1={py} x2={n.x} y2={n.y}
          className="t-link" strokeDasharray={n.dashed ? "5 4" : undefined} />;
      })}

      {/* words on the rings */}
      {nodes.map(n => {
        const modern = n.kind === "modern";
        let anchor: "start" | "middle" | "end" = "middle", tx = n.x;
        if (n.x > CX + LBL) { anchor = "start"; tx = n.x + 10; }
        if (n.x < CX - LBL) { anchor = "end"; tx = n.x - 10; }
        tx += n.dx ?? 0;
        return (
          <g key={n.id}>
            {modern
              ? <circle cx={n.x} cy={n.y} r={4.4} className="t-dot" />
              : <circle cx={n.x} cy={n.y} r={4} fill="none" className="t-ring"
                  strokeDasharray={n.kind === "proto" ? "2 2" : undefined} />}
            {/* one tight block per node — word, [translit], gloss — above the node, or below with flip */}
            <text x={tx} y={n.flip ? n.y + 18 : n.y - 9 - 14 * ((n.translit ? 1 : 0) + (noteLine(n) ? 1 : 0))} textAnchor={anchor}
              className={modern ? "t-word" : "t-anc"}>{n.form}</text>
            {n.translit && <text x={tx} y={n.flip ? n.y + 33 : n.y - 8 - (noteLine(n) ? 15 : 0)} textAnchor={anchor} className="t-note">[{n.translit}]</text>}
            {noteLine(n) && <text x={tx} y={n.flip ? n.y + (n.translit ? 48 : 33) : n.y - 8} textAnchor={anchor} className="t-note">{noteLine(n)}</text>}
          </g>
        );
      })}

      {/* the hub */}
      <text x={CX} y={CY + 2} textAnchor="middle" className="t-root">*kʷel-</text>
      <text x={CX} y={CY + 26} textAnchor="middle" className="t-root-gloss">to turn</text>
      <text x={CX} y={CY + 44} textAnchor="middle" className="t-root-gloss">Proto-Indo-European</text>
    </svg>
  );
}
