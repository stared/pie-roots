import { SED_NODES, ROOT_X, ROOT_Y, STRATA, LEAF_Y, ERAS, type SedNode } from "./data/sed";
import { noteLine } from "./types";

interface Laid extends SedNode { y: number }

const laid: Record<string, Laid> = {};
for (const n of SED_NODES) laid[n.id] = { ...n, y: n.y ?? LEAF_Y };

/** settling curve: drift sideways high under the parent, then sink at the column */
const settle = (x0: number, y0: number, x1: number, y1: number) =>
  `M ${x0},${y0} C ${x0 + (x1 - x0) * 0.9},${y0} ${x1},${y0 + (y1 - y0) * 0.2} ${x1},${y1}`;

export default function Sit() {
  const nodes = Object.values(laid);
  return (
    <svg viewBox="0 60 2120 1090" role="img" aria-label="Descent of PIE *sed-, words settling through the strata of time">
      {/* the strata */}
      {STRATA.map(y => <line key={y} x1={70} y1={y} x2={2050} y2={y} className="t-guide" />)}
      {ERAS.map(e => <text key={e.label} x={80} y={e.y} className="t-era">{e.label}</text>)}

      {/* settling lines */}
      {nodes.map(n => {
        const p = n.parent ? laid[n.parent] : { x: ROOT_X, y: ROOT_Y + 40 };
        return <path key={`l-${n.id}`} d={settle(p.x, p.y + 14, n.x, n.y - (n.kind === "modern" ? 6 : 26))}
          fill="none" className="t-link" strokeDasharray={n.dashed ? "5 4" : undefined} />;
      })}

      {/* ancestors, sinking through the strata */}
      {nodes.filter(n => n.kind !== "modern").map(n => (
        <g key={n.id}>
          <circle cx={n.x} cy={n.y} r={4} fill="none" className="t-ring"
            strokeDasharray={n.kind === "proto" ? "2 2" : undefined} />
          <text x={n.x} y={n.y - 12} textAnchor="middle" className="t-anc">{n.form}</text>
          {noteLine(n) && <text x={n.x} y={n.y + 22} textAnchor="middle" className="t-note">{noteLine(n)}</text>}
        </g>
      ))}

      {/* English words at rest in the bottom stratum */}
      {nodes.filter(n => n.kind === "modern").map(n => (
        <g key={n.id}>
          <circle cx={n.x} cy={LEAF_Y} r={4.4} className="t-dot" />
          <text x={n.x} y={LEAF_Y + 34} textAnchor="middle" className="t-word">{n.form}</text>
        </g>
      ))}

      {/* the root in the oldest stratum */}
      <text x={ROOT_X} y={ROOT_Y} textAnchor="middle" className="t-root">*sed-</text>
      <text x={ROOT_X} y={ROOT_Y + 26} textAnchor="middle" className="t-root-gloss">to sit</text>
    </svg>
  );
}
