import { SED_NODES, type SedNode } from "./data/sed";

interface Point { x: number; y: number }
type Laid = Omit<SedNode, "x" | "y"> & Point;

const ROOT: Point = { x: 970, y: 92 };
const LEAF_HIGH = 805;
const LEAF_LOW = 855;

// The published chart is a deliberately chosen subset, not the research tree.
// Each family gets enough horizontal room for its ancestry to remain legible.
const POS: Record<string, Point> = {
  germanic_sed: { x: 140, y: 205 },
  sitjana: { x: 40, y: 325 }, sittan: { x: 40, y: 585 }, sit: { x: 40, y: LEAF_HIGH },
  setija: { x: 140, y: 390 }, saeti: { x: 140, y: 650 }, seat: { x: 140, y: LEAF_LOW },
  sotam: { x: 240, y: 325 }, sot: { x: 240, y: 585 }, soot: { x: 240, y: LEAF_HIGH },

  nisdos: { x: 370, y: 210 },
  nestaz: { x: 330, y: 410 }, nest: { x: 330, y: LEAF_LOW },
  nidus: { x: 430, y: 365 }, nidicare: { x: 430, y: 470 },
  nicher: { x: 430, y: 620 }, niche: { x: 430, y: LEAF_HIGH },

  sedere: { x: 930, y: 205 },
  sedes: { x: 540, y: 325 },
  sie: { x: 500, y: 540 }, see: { x: 500, y: LEAF_LOW },
  sedicum: { x: 585, y: 470 }, sege: { x: 585, y: 620 }, siege: { x: 585, y: LEAF_HIGH },
  sedare: { x: 680, y: 390 }, sedate: { x: 680, y: LEAF_LOW },
  assidere: { x: 810, y: 325 },
  assise: { x: 770, y: 470 }, size: { x: 770, y: LEAF_HIGH },
  assessus: { x: 855, y: 540 }, assessare: { x: 855, y: 690 }, assess: { x: 855, y: LEAF_LOW },
  insidere: { x: 950, y: 325 }, insidiae: { x: 950, y: 620 }, insidious: { x: 950, y: LEAF_HIGH },
  obsidere: { x: 1045, y: 390 }, obsessus: { x: 1045, y: 690 }, obsess: { x: 1045, y: LEAF_LOW },
  subsidere: { x: 1140, y: 325 }, subsidium: { x: 1140, y: 620 }, subsidy: { x: 1140, y: LEAF_HIGH },
  dissidere: { x: 1235, y: 390 }, dissidens: { x: 1235, y: 690 }, dissident: { x: 1235, y: LEAF_LOW },
  supersedere: { x: 1330, y: 325 }, supersede: { x: 1330, y: LEAF_HIGH },

  hedra: { x: 1600, y: 215 },
  ephedra: { x: 1435, y: 390 }, ephedrine: { x: 1435, y: LEAF_LOW },
  kathedra: { x: 1600, y: 350 }, cathedra: { x: 1600, y: 505 },
  cathedralis: { x: 1540, y: 620 }, cathedral: { x: 1540, y: LEAF_HIGH },
  chaiere: { x: 1650, y: 690 }, chair: { x: 1650, y: LEAF_LOW },
  synedrion: { x: 1760, y: 325 }, sanhedrin_he: { x: 1760, y: 620 },
  sanhedrin: { x: 1760, y: LEAF_HIGH },

  sidos: { x: 1900, y: 220 }, sid: { x: 1900, y: 475 },
  beansidhe: { x: 1900, y: 650 }, banshee: { x: 1900, y: LEAF_LOW },
};

const LATIN_CHILDREN = ["sedes", "sedare", "assidere", "insidere",
  "obsidere", "subsidere", "dissidere", "supersedere"];
const latinChildren = new Set(LATIN_CHILDREN);

const byId = new Map(SED_NODES.map(n => [n.id, n]));
const nodes: Laid[] = Object.entries(POS).map(([id, p]) => ({ ...byId.get(id)!, ...p }));
const laid = Object.fromEntries(nodes.map(n => [n.id, n])) as Record<string, Laid>;

/** A restrained inverted-u shoulder: descent first, ornament second. */
function linkPath(a: Point, b: Point) {
  const y0 = a.y + 16;
  const y1 = b.y - 8;
  if (Math.abs(a.x - b.x) < 2) return `M${a.x},${y0} V${y1}`;
  const dy = y1 - y0;
  const dx = b.x - a.x;
  // Ladder links are mostly lateral. A forced downward shoulder would pass
  // their target and curl back upward, so they leave and arrive horizontally.
  if (dy < 70)
    return `M${a.x},${y0} C${a.x + dx * 0.42},${y0} ${b.x - dx * 0.42},${y1} ${b.x},${y1}`;
  const shoulder = Math.min(68, Math.max(12, dy * 0.36));
  return `M${a.x},${y0} C${a.x},${y0 + shoulder} ${b.x},${y0 + shoulder} ${b.x},${y1}`;
}

function latinBundlePath(n: Point) {
  const y1 = n.y - 8;
  return `M930,221 C930,260 ${n.x},260 ${n.x},${y1}`;
}

export default function Sit() {
  return (
    <svg className="seat" viewBox="0 10 1960 925" role="img"
      aria-label="Selected descendants of PIE *sed-, arranged as a descent tree">
      {/* The Latin compounds share the beginning of one smooth descent, then
          separate in source order. The overlap is bundling, never crossing. */}
      {LATIN_CHILDREN.map(id =>
        <path key={`bundle-${id}`} d={latinBundlePath(laid[id])}
          fill="none" className="t-link" />)}
      {nodes.map(n => {
        if (latinChildren.has(n.id)) return null;
        const p = n.parent && laid[n.parent] ? laid[n.parent] : ROOT;
        return <path key={`l-${n.id}`} d={linkPath(p, n)} fill="none"
          className="t-link" strokeDasharray={n.dashed ? "5 4" : undefined} />;
      })}

      {nodes.map(n => {
        const modern = n.kind === "modern";
        return (
          <g key={n.id}>
            {modern
              ? <circle cx={n.x} cy={n.y} r={4.4} className="t-dot" />
              : <circle cx={n.x} cy={n.y} r={4} fill="none" className="t-ring"
                  strokeDasharray={n.kind === "proto" ? "2 2" : undefined} />}
            <text x={n.x} y={modern ? n.y + 33 : n.y - 13} textAnchor="middle"
              className={modern ? "t-word" : n.kind === "proto" ? "t-anc t-proto" : "t-anc"}>{n.form}</text>
            {!modern && n.gloss &&
              <text x={n.x} y={n.y + 20} textAnchor="middle" className="t-note">{n.gloss}</text>}
            {!modern && n.lang &&
              <text x={n.x} y={n.y + 36} textAnchor="middle" className="t-note t-lang">{n.lang}</text>}
            {modern && n.gloss &&
              <text x={n.x} y={n.y + 51} textAnchor="middle" className="t-note">{n.gloss}</text>}
          </g>
        );
      })}

      <text x={ROOT.x} y={ROOT.y} textAnchor="middle" className="t-root">*sed-</text>
      <text x={ROOT.x} y={ROOT.y + 27} textAnchor="middle" className="t-root-gloss">to sit</text>
      <text x={ROOT.x} y={ROOT.y + 43} textAnchor="middle" className="t-root-gloss t-lang">Proto-Indo-European</text>
    </svg>
  );
}
