import { TURN_NODES, RING, ringR, type TurnNode } from "./data/kwel";
import { polar, radialPath } from "./types";

const CX = 830, CY = 790;
const R0 = 92; // links leave the hub from here

interface Laid extends TurnNode { x: number; y: number }

const laid: Record<string, Laid> = {};
for (const n of TURN_NODES) {
  const [x, y] = polar(CX, CY, n.a, ringR(n.d));
  laid[n.id] = { ...n, x, y };
}

export default function Turn() {
  const nodes = Object.values(laid);
  return (
    <svg viewBox="0 0 1700 1580" role="img" aria-label="Descent of PIE *kʷel-, words arranged as a wheel">
      {/* the rims: one faint circle per ring */}
      {RING.slice(1).map(r => (
        <circle key={r} cx={CX} cy={CY} r={r} fill="none" className="t-guide" />
      ))}

      {/* spokes */}
      <g transform={`translate(${CX} ${CY})`}>
        {nodes.map(n => {
          const [pa, pr] = n.parent ? [laid[n.parent].a, ringR(laid[n.parent].d)] : [n.a, R0];
          return <path key={n.id} d={radialPath(pa, pr, n.a, ringR(n.d))} fill="none"
            className="t-link" strokeDasharray={n.dashed ? "5 4" : undefined} />;
        })}
      </g>

      {/* words on the rings */}
      {nodes.map(n => {
        const modern = n.kind === "modern";
        let anchor: "start" | "middle" | "end" = "middle", tx = n.x;
        if (n.x > CX + 190) { anchor = "start"; tx = n.x + 10; }
        if (n.x < CX - 190) { anchor = "end"; tx = n.x - 10; }
        return (
          <g key={n.id}>
            {modern
              ? <circle cx={n.x} cy={n.y} r={4.4} className="t-dot" />
              : <circle cx={n.x} cy={n.y} r={4} fill="none" className="t-ring"
                  strokeDasharray={n.kind === "proto" ? "2 2" : undefined} />}
            <text x={tx} y={n.y - 9} textAnchor={anchor} className={modern ? "t-word" : "t-anc"}>{n.form}</text>
            {n.note && <text x={tx} y={n.y + 18} textAnchor={anchor} className="t-note">{n.note}</text>}
          </g>
        );
      })}

      {/* the hub */}
      <text x={CX} y={CY + 2} textAnchor="middle" className="t-root">*kʷel-</text>
      <text x={CX} y={CY + 28} textAnchor="middle" className="t-root-gloss">to turn</text>
    </svg>
  );
}
