import { RIPPLE_NODES, GEN, type RippleNode } from "./data/bheh2";
import { noteLine, polar, radialPath } from "./types";

const OX = 235, OY = 570;
const R0 = 90; // links leave the root from here
const SPAN: [number, number] = [-66, 52];
// Sound travels broadly but the page is a landscape. Geometry is compressed
// vertically; type and node marks remain undistorted.
const KX = 1.08, KY = 0.56;

const radius = (g: number) => {
  const i = Math.floor(g), f = g - i;
  return GEN[i] + (GEN[Math.min(i + 1, GEN.length - 1)] - GEN[i]) * f;
};

interface Laid extends RippleNode { x: number; y: number }

const soundPoint = (a: number, r: number): [number, number] => {
  const [x, y] = polar(0, 0, a, r);
  return [OX + KX * x, OY + KY * y];
};

const soundArc = (r: number) => {
  const [x0, y0] = soundPoint(SPAN[0], r);
  const [x1, y1] = soundPoint(SPAN[1], r);
  return `M ${x0},${y0} A ${KX * r} ${KY * r} 0 0 1 ${x1},${y1}`;
};

const laid: Record<string, Laid> = {};
for (const n of RIPPLE_NODES) {
  const [x, y] = soundPoint(n.a, radius(n.g));
  laid[n.id] = { ...n, x, y };
}

// The notes hold the full tree. The published chart keeps only branches with
// a distinct, legible semantic turn: prophecy, lost speech, sound, destiny,
// infancy/story, and speech becoming public command.
const CHART_IDS = new Set([
  "phemi", "prophetes", "propheta", "prophet",
  "phasis", "aphasia_gr", "aphasia",
  "phone", "symphonia", "symphony", "antiphona", "antifona", "antefn", "anthem",
  "blasphemos", "blasphemeo", "blasphemare", "blasmer", "blame",
  "fari", "fatum", "fata", "fate", "fae", "faerie", "fairy",
  "infans", "infant", "fabula", "fable",
  "bannana", "bannan", "ban", "bannjan", "banir", "banish",
  "frankban", "banof", "banal", "bannum", "bandon", "abandon",
  "bando", "contrabando", "contraband",
]);

export default function Speak() {
  const nodes = Object.values(laid).filter(n => CHART_IDS.has(n.id));
  return (
    <svg className="voice" viewBox="0 80 1510 990" role="img" aria-label="Descent of PIE *bʰeh₂-, words carried outward in waves of speech">
      {/* the ripples: one faint arc per generation */}
      {[1, 2, 3, 4, 5].map(g => (
        <path key={g} d={soundArc(GEN[g])} className="t-guide" />
      ))}

      {/* links */}
      <g transform={`translate(${OX} ${OY}) scale(${KX} ${KY})`}>
        {nodes.map(n => {
          const [pa, pr] = n.parent ? [laid[n.parent].a, radius(laid[n.parent].g)] : [n.a, R0];
          return <path key={n.id} d={radialPath(pa, pr, n.a, radius(n.g))} fill="none"
            className="t-link" strokeDasharray={n.dashed ? "5 4" : undefined} />;
        })}
      </g>

      {/* nodes: a tight label block beside each node — form, then gloss · language */}
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
            <text x={tx} y={modern ? n.y + 5 : n.y - 6} textAnchor={anchor}
              className={modern ? "t-word" : n.kind === "proto" ? "t-anc t-proto" : "t-anc"}>{n.form}</text>
            {!modern && noteLine(n) &&
              <text x={tx} y={n.y + 13} textAnchor={anchor} className="t-note">{noteLine(n)}</text>}
          </g>
        );
      })}

      {/* the root at the mouth of the fan: the utterance begins here */}
      <text x={OX - 14} y={OY + 2} textAnchor="end" className="t-root">*bʰeh₂-</text>
      <text x={OX - 14} y={OY + 26} textAnchor="end" className="t-root-gloss">to speak</text>
    </svg>
  );
}
