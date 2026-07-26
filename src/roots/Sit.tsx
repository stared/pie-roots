import { SED_NODES } from "./data/sed";
import type { WordNode } from "./types";

interface Point { x: number; y: number }
type Laid = WordNode & Point;

const GRID_TOP = 260;
const GRID_STEP = 65;
const row = (n: number) => GRID_TOP + n * GRID_STEP;
const COL_LEFT = 70;
const COL_STEP = 92;
const col = (n: number) => COL_LEFT + n * COL_STEP;
const LEAF_HIGH = row(8);
const LEAF_LOW = row(9);

/** Each node is a label block — form, ring, gloss, language — and links join
 *  block to block: they leave below the language line and stop above the next
 *  form, so no line is ever drawn across a word. English leaves carry their
 *  word below the dot, so a link may run all the way down to the dot itself. */
const LABEL_DROP = 44;
const arriveY = (n: { y: number; kind: string }) => n.y - (n.kind === "modern" ? 6 : 31);
/** the two bundle corridors: root → branch heads, sedēre → its compounds.
 *  Each corridor runs clear of both label blocks it passes between. */
const ROOT_CORRIDOR = 148;
const LATIN_CORRIDOR = 268;
/** the root's gloss is set larger than a node's, so its block is deeper */
const ROOT_DROP = 52;

const ROOT: Point = { x: (col(0) + col(21)) / 2, y: 80 };

// The published chart is a deliberately chosen subset, not the research tree.
// Every modern endpoint owns one column of a single global lattice, leaves
// alternating between two rows so neighbouring English words never touch.
// Shared ancestors are centered over their endpoint span; no family owns a
// private grid. Intermediates keep to their column's parity — even columns use
// odd rows, odd columns use even rows — so no two adjacent labels share a line.
const POS: Record<string, Point> = {
  germanic_sed: { x: col(2), y: row(-1) },
  sitjana: { x: col(0), y: row(1) }, sittan: { x: col(0), y: row(3) }, sit: { x: col(0), y: LEAF_HIGH },
  setlaz: { x: col(1), y: row(2) }, setl: { x: col(1), y: row(4) },
  setlan: { x: col(1), y: row(6) }, settle: { x: col(1), y: LEAF_LOW },
  satjana: { x: col(2), y: row(1) }, settan: { x: col(2), y: row(3) }, set: { x: col(2), y: LEAF_HIGH },
  setija: { x: col(3), y: row(2) }, saeti: { x: col(3), y: row(4) }, seat: { x: col(3), y: LEAF_LOW },
  sotam: { x: col(4), y: row(1) }, sot: { x: col(4), y: row(3) }, soot: { x: col(4), y: LEAF_HIGH },

  nisdos: { x: (col(5) + col(6)) / 2, y: row(-1) },
  nestaz: { x: col(5), y: row(2) }, nest: { x: col(5), y: LEAF_LOW },
  nidus: { x: col(6), y: row(1) }, nidicare: { x: col(6), y: row(3) },
  nicher: { x: col(6), y: row(5) }, niche: { x: col(6), y: LEAF_HIGH },

  sedes: { x: col(7), y: row(-1) },
  sie: { x: col(7), y: row(2) }, see: { x: col(7), y: LEAF_LOW },

  sedere: { x: (col(8) + col(16)) / 2, y: row(-1) },
  sedicum: { x: col(8), y: row(1) }, sege: { x: col(8), y: row(3) }, siege: { x: col(8), y: LEAF_HIGH },
  sedare: { x: col(9), y: row(2) }, sedate: { x: col(9), y: LEAF_LOW },
  assidere: { x: (col(10) + col(11)) / 2, y: row(1) },
  assise: { x: col(10), y: row(3) }, size: { x: col(10), y: LEAF_HIGH },
  assessus: { x: col(11), y: row(4) }, assessare: { x: col(11), y: row(6) }, assess: { x: col(11), y: LEAF_LOW },
  insidere: { x: col(12), y: row(1) }, insidiae: { x: col(12), y: row(3) },
  insidiosus: { x: col(12), y: row(5) }, insidious: { x: col(12), y: LEAF_HIGH },
  obsidere: { x: col(13), y: row(2) }, obsessus: { x: col(13), y: row(4) }, obsess: { x: col(13), y: LEAF_LOW },
  subsidere: { x: col(14), y: row(1) }, subsidium: { x: col(14), y: row(3) }, subsidy: { x: col(14), y: LEAF_HIGH },
  dissidere: { x: col(15), y: row(2) }, dissidens: { x: col(15), y: row(4) }, dissident: { x: col(15), y: LEAF_LOW },
  supersedere: { x: col(16), y: row(1) }, supersede: { x: col(16), y: LEAF_HIGH },

  hedra: { x: (col(17) + col(20)) / 2, y: row(-1) },
  ephedra: { x: col(17), y: row(2) }, ephedrine: { x: col(17), y: LEAF_LOW },
  kathedra: { x: (col(18) + col(19)) / 2, y: row(1) },
  cathedra: { x: (col(18) + col(19)) / 2, y: row(3) },
  cathedralis: { x: col(18), y: row(5) }, cathedral: { x: col(18), y: LEAF_HIGH },
  chaiere: { x: col(19), y: row(6) }, chair: { x: col(19), y: LEAF_LOW },
  synedrion: { x: col(20), y: row(1) }, sanhedrin_he: { x: col(20), y: row(3) },
  sanhedrin: { x: col(20), y: LEAF_HIGH },

  sidos: { x: col(21), y: row(-1) }, sid: { x: col(21), y: row(2) },
  beansidhe: { x: col(21), y: row(4) }, banshee: { x: col(21), y: LEAF_LOW },
};

/** the branch heads: each descends from *sed- itself */
const HEADS = ["germanic_sed", "nisdos", "sedes", "sedere", "hedra", "sidos"];
const heads = new Set(HEADS);

const LATIN_CHILDREN = ["sedicum", "sedare", "assidere", "insidere",
  "obsidere", "subsidere", "dissidere", "supersedere"];
const latinChildren = new Set(LATIN_CHILDREN);

const byId = new Map(SED_NODES.map(n => [n.id, n]));
const nodes: Laid[] = Object.entries(POS).map(([id, p]) => ({ ...byId.get(id)!, ...p }));
const laid = Object.fromEntries(nodes.map(n => [n.id, n])) as Record<string, Laid>;

/** A restrained inverted-u shoulder: descent first, ornament second. */
function linkPath(a: Point, b: Laid) {
  const y0 = a.y + LABEL_DROP;
  const y1 = arriveY(b);
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

/** Shared descent: siblings leave one source through a common corridor, then
 *  separate in source order. The overlap is bundling, never crossing. */
function bundlePath(source: Point, n: Laid, corridor: number, drop = LABEL_DROP) {
  return `M${source.x},${source.y + drop} C${source.x},${corridor} ${n.x},${corridor} ${n.x},${arriveY(n)}`;
}

export default function Sit() {
  return (
    <svg className="seat" viewBox="0 10 2090 925" role="img"
      aria-label="Selected descendants of PIE *sed-, arranged as a descent tree">
      {/* the root's six branch heads leave below its own label block, so the
          corridor passes above every head word instead of through it */}
      {HEADS.map(id =>
        <path key={`head-${id}`} d={bundlePath(ROOT, laid[id], ROOT_CORRIDOR, ROOT_DROP)}
          fill="none" className="t-link" />)}
      {LATIN_CHILDREN.map(id =>
        <path key={`bundle-${id}`} d={bundlePath(laid.sedere, laid[id], LATIN_CORRIDOR)}
          fill="none" className="t-link" />)}
      {nodes.map(n => {
        if (latinChildren.has(n.id) || heads.has(n.id)) return null;
        return <path key={`l-${n.id}`} d={linkPath(laid[n.parent!], n)} fill="none"
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
              <text x={n.x} y={n.y + 57} textAnchor="middle" className="t-note">{n.gloss}</text>}
          </g>
        );
      })}

      <text x={ROOT.x} y={ROOT.y} textAnchor="middle" className="t-root">*sed-</text>
      <text x={ROOT.x} y={ROOT.y + 27} textAnchor="middle" className="t-root-gloss">to sit</text>
      <text x={ROOT.x} y={ROOT.y + 43} textAnchor="middle" className="t-root-gloss t-lang">Proto-Indo-European</text>
    </svg>
  );
}
