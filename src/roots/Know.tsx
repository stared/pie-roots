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
    <svg viewBox="0 195 1700 880" role="img" aria-label="Descent of PIE *weyd- into words of secret knowing, rays of light from the root">
      {/* the light: starlight, not lamplight — rays graded from bright at the
          source to faint at the rim, bloom under the modern words the light
          still reaches, and the root itself burning as the star at the center.
          The ambient glow is faint; the words carry the light. */}
      <defs>
        <radialGradient id="k-glow" gradientUnits="userSpaceOnUse" cx={CX} cy={CY} r={R_FADE}
          gradientTransform={`translate(${CX} ${CY}) scale(${KX} ${KY}) translate(${-CX} ${-CY})`}>
          <stop offset="0%" stopColor="#dfe7f4" stopOpacity={0.11} />
          <stop offset="55%" stopColor="#ccd6e8" stopOpacity={0.04} />
          <stop offset="100%" stopColor="#c4cede" stopOpacity={0} />
        </radialGradient>
        <radialGradient id="k-ray" gradientUnits="userSpaceOnUse" cx={CX} cy={CY} r={560}
          gradientTransform={`translate(${CX} ${CY}) scale(${KX} ${KY}) translate(${-CX} ${-CY})`}>
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="40%" stopColor="#c9cfda" />
          <stop offset="100%" stopColor="#767c88" />
        </radialGradient>
        <filter id="k-bloom" x="-250%" y="-250%" width="600%" height="600%">
          <feGaussianBlur stdDeviation="4" />
        </filter>
        <filter id="k-raybloom" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="2.6" />
        </filter>
        <filter id="k-textbloom" x="-60%" y="-120%" width="220%" height="340%">
          <feGaussianBlur stdDeviation="7" />
        </filter>
      </defs>
      <ellipse cx={CX} cy={CY} rx={R_FADE * KX} ry={R_FADE * KY} fill="url(#k-glow)" />

      {/* links: straight rays of light, graded outward by the shared gradient —
          drawn twice, a blurred glow under the crisp line */}
      {[{ pfx: "lg", glow: true }, { pfx: "l", glow: false }].map(({ pfx, glow }) => (
        <g key={pfx} filter={glow ? "url(#k-raybloom)" : undefined} opacity={glow ? 0.6 : 1}>
          {nodes.map(n => {
            const p = n.parent ? laid[n.parent] : undefined;
            const [px, py] = p ? [p.x, p.y] : polarE(n.a, R0);
            return <line key={`${pfx}-${n.id}`} x1={px} y1={py} x2={n.x} y2={n.y}
              className="t-link" style={{ stroke: "url(#k-ray)", strokeWidth: glow ? 2.4 : undefined }}
              strokeDasharray={n.dashed ? "5 4" : undefined} />;
          })}
        </g>
      ))}

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
              ? <>
                  <circle cx={n.x} cy={n.y} r={9} fill="#dce8fa" opacity={0.55} filter="url(#k-bloom)" />
                  <circle cx={n.x} cy={n.y} r={4.4} className="t-dot" />
                </>
              : <circle cx={n.x} cy={n.y} r={4} fill="none" className="t-ring"
                  strokeDasharray={n.kind === "proto" ? "2 2" : undefined} />}
            <text x={tx} y={n.y + dy} textAnchor={anchor}
              className={modern ? "t-word" : n.kind === "proto" ? "t-anc t-proto" : "t-anc"}>{n.form}</text>
            {noteLine(n) && (
              <text x={tx} y={n.y + dy + (above ? -16 : 17)} textAnchor={anchor} className="t-note">{noteLine(n)}</text>
            )}
          </g>
        );
      })}

      {/* the root as the source of light: the word itself blooms like a star —
          a blurred copy underneath, the crisp text on top */}
      <text x={CX} y={CY + 2} textAnchor="middle" className="t-root"
        style={{ fill: "#ffffff" }} opacity={0.85} filter="url(#k-textbloom)">*weyd-</text>
      <text x={CX} y={CY + 2} textAnchor="middle" className="t-root">*weyd-</text>
      <text x={CX} y={CY + 30} textAnchor="middle" className="t-root-gloss">to see, to know · Proto-Indo-European</text>
    </svg>
  );
}
