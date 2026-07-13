import { RIPPLE_NODES, GEN, type RippleNode } from "./data/bheh2";
import { polar, arcPath, radialPath } from "./types";

const OX = 335, OY = 820;
const R0 = 90; // links leave the root from here
const SPAN: [number, number] = [-66, 52];

const radius = (g: number) => {
  const i = Math.floor(g), f = g - i;
  return GEN[i] + (GEN[Math.min(i + 1, GEN.length - 1)] - GEN[i]) * f;
};

interface Laid extends RippleNode { x: number; y: number }

const laid: Record<string, Laid> = {};
for (const n of RIPPLE_NODES) {
  const [x, y] = polar(OX, OY, n.a, radius(n.g));
  laid[n.id] = { ...n, x, y };
}

export default function Speak() {
  const nodes = Object.values(laid);
  return (
    <svg viewBox="0 0 1800 1620" role="img" aria-label="Descent of PIE *bʰeh₂-, words rippling out from the root">
      {/* the ripples: one faint arc per generation */}
      {[1, 2, 3, 4, 5].map(g => (
        <path key={g} d={arcPath(OX, OY, GEN[g], SPAN[0], SPAN[1])} className="t-guide" />
      ))}

      {/* links */}
      <g transform={`translate(${OX} ${OY})`}>
        {nodes.map(n => {
          const [pa, pr] = n.parent ? [laid[n.parent].a, radius(laid[n.parent].g)] : [n.a, R0];
          return <path key={n.id} d={radialPath(pa, pr, n.a, radius(n.g))} fill="none"
            className="t-link" strokeDasharray={n.dashed ? "5 4" : undefined} />;
        })}
      </g>

      {/* nodes: a tight label block beside each node — form, gloss, language */}
      {nodes.map(n => {
        const modern = n.kind === "modern";
        const left = n.labelLeft;
        const tx = left ? n.x - 11 : n.x + 11;
        const anchor = left ? "end" : "start";
        return (
          <g key={n.id}>
            {modern
              ? <circle cx={n.x} cy={n.y} r={4.4} className="t-dot" />
              : <circle cx={n.x} cy={n.y} r={4} fill="none" className="t-ring"
                  strokeDasharray={n.kind === "proto" ? "2 2" : undefined} />}
            {modern
              ? <text x={tx} y={n.y + 5} textAnchor={anchor} className="t-word">{n.form}</text>
              : left ? (
                <>
                  <text x={tx} y={n.y - 8} textAnchor={anchor} className="t-anc">{n.form}</text>
                  {n.gloss && <text x={tx} y={n.y + 14} textAnchor={anchor} className="t-note">{n.gloss}</text>}
                  {n.lang && <text x={tx} y={n.y + 28} textAnchor={anchor} className="t-note">{n.lang}</text>}
                </>
              ) : (
                <>
                  <text x={tx} y={n.y - 6} textAnchor={anchor} className="t-anc">{n.form}</text>
                  {n.gloss && <text x={tx} y={n.y + 13} textAnchor={anchor} className="t-note">{n.gloss}</text>}
                  {n.lang && <text x={tx} y={n.y + 27} textAnchor={anchor} className="t-note">{n.lang}</text>}
                </>
              )}
          </g>
        );
      })}

      {/* the root at the mouth of the fan */}
      <text x={OX - 14} y={OY + 2} textAnchor="end" className="t-root">*bʰeh₂-</text>
      <text x={OX - 14} y={OY + 26} textAnchor="end" className="t-root-gloss">to speak</text>
    </svg>
  );
}
