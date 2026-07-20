import { TURN_NODES, RING, ringR, type TurnNode } from "./data/kwel";
import { noteLine, polar } from "./types";

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
    <svg viewBox="105 115 1440 1330" className="wheel" role="img" aria-label="Descent of PIE *kʷel-, words arranged as a wheel">
      {/* the rims: one faint circle per ring */}
      {RING.slice(1).map(r => (
        <circle key={r} cx={CX} cy={CY} r={r} fill="none" className="t-guide" />
      ))}

      {/* spokes: straight segments from parent (or hub rim) to node */}
      {nodes.map(n => {
        const [px, py] = n.parent ? [laid[n.parent].x, laid[n.parent].y] : polar(CX, CY, n.a, R0);
        return <line key={n.id} x1={px} y1={py} x2={n.x} y2={n.y}
          className="t-link" strokeDasharray={n.dashed ? "5 4" : undefined} />;
      })}

      {/* words on the rings */}
      {nodes.map(n => {
        const modern = n.kind === "modern";
        let anchor: "start" | "middle" | "end" = "middle", tx = n.x;
        if (n.x > CX + 190) { anchor = "start"; tx = n.x + 10; }
        if (n.x < CX - 190) { anchor = "end"; tx = n.x - 10; }
        tx += n.dx ?? 0;
        return (
          <g key={n.id}>
            {modern
              ? <circle cx={n.x} cy={n.y} r={4.4} className="t-dot" />
              : <circle cx={n.x} cy={n.y} r={4} fill="none" className="t-ring"
                  strokeDasharray={n.kind === "proto" ? "2 2" : undefined} />}
            <text x={tx} y={n.y - 9 - (n.translit ? 14 : 0) - (n.noteUp ? 14 : 0)} textAnchor={anchor}
              className={modern ? "t-word" : "t-anc"}>{n.form}</text>
            {n.translit && <text x={tx} y={n.y - 8 - (n.noteUp ? 15 : 0)} textAnchor={anchor} className="t-note">[{n.translit}]</text>}
            {noteLine(n) && <text x={tx} y={n.noteUp ? n.y - 8 : n.y + 18} textAnchor={anchor} className="t-note">{noteLine(n)}</text>}
          </g>
        );
      })}

      {/* the hub */}
      <text x={CX} y={CY + 2} textAnchor="middle" className="t-root">*kʷel-</text>
      <text x={CX} y={CY + 28} textAnchor="middle" className="t-root-gloss">to turn · Proto-Indo-European</text>
    </svg>
  );
}
