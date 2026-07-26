import { SED_NODES } from "./data/sed";
import type { WordNode } from "./types";

interface Point { x: number; y: number }
type Laid = WordNode & Point;

const GRID_TOP = 400;
const GRID_STEP = 65;
const row = (n: number) => GRID_TOP + n * GRID_STEP;
const COL_LEFT = 70;
const COL_STEP = 92;
const col = (n: number) => COL_LEFT + n * COL_STEP;
const HEAD_Y = 300;
const LEAF_HIGH = row(7);
const LEAF_LOW = row(8);

/** Each node is a label block — form, ring, gloss, language. Links join block
 *  to block: they leave below the language line and stop above the next form,
 *  so no line is ever drawn across a word. English leaves carry their word
 *  below the dot, so a link runs all the way down to the dot itself. */
const LABEL_DROP = 44;
/** the root's gloss is set larger than a node's, so its block is deeper */
const ROOT_DROP = 52;
const arriveY = (n: { y: number; kind: string }) => n.y - (n.kind === "modern" ? 6 : 31);

const ROOT: Point = { x: (col(0) + col(20)) / 2, y: 80 };

// The published chart is a deliberately chosen subset, not the research tree.
// Every modern endpoint owns one column of a single global lattice, leaves
// alternating between two bottom rows. Neighbouring columns stagger their
// intermediates — the checkerboard — and that is what buys each label the
// width of two columns, so a gloss can carry the derived sense as well as the
// literal one (obsidēre "sit against; besiege"). Shared ancestors are centered
// over their endpoint span; no family owns a private grid.
const POS: Record<string, Point> = {
  // no cover node above the Germanic four: each is its own formation on the
  // root, and no source posits a shared Proto-Germanic ancestor for them
  sitjana: { x: col(0), y: HEAD_Y }, sittan: { x: col(0), y: row(2) }, sit: { x: col(0), y: LEAF_HIGH },
  satjana: { x: col(1), y: row(1) }, settan: { x: col(1), y: row(3) }, set: { x: col(1), y: LEAF_LOW },
  setija: { x: col(2), y: HEAD_Y }, saeti: { x: col(2), y: row(2) }, seat: { x: col(2), y: LEAF_HIGH },
  sotam: { x: col(3), y: row(1) }, sot: { x: col(3), y: row(3) }, soot: { x: col(3), y: LEAF_LOW },

  nisdos: { x: col(4.5), y: HEAD_Y },
  nestaz: { x: col(4), y: row(2) }, nest: { x: col(4), y: LEAF_HIGH },
  nidus: { x: col(5), y: row(1) }, nidicare: { x: col(5), y: row(3) },
  nicher: { x: col(5), y: row(5) }, niche: { x: col(5), y: LEAF_LOW },

  sedes: { x: col(6), y: HEAD_Y },
  sie: { x: col(6), y: row(2) }, see: { x: col(6), y: LEAF_HIGH },

  sedere: { x: col(10.5), y: HEAD_Y },
  sedicum: { x: col(7), y: row(1) }, sege: { x: col(7), y: row(3) }, siege: { x: col(7), y: LEAF_LOW },
  sedare: { x: col(8), y: row(2) }, sedatus: { x: col(8), y: row(4) }, sedate: { x: col(8), y: LEAF_HIGH },
  assidere: { x: col(9.5), y: row(1) },
  assise: { x: col(9), y: row(3) }, sise: { x: col(9), y: row(5) }, size: { x: col(9), y: LEAF_LOW },
  assessus: { x: col(10), y: row(4) }, assessare: { x: col(10), y: row(6) }, assess: { x: col(10), y: LEAF_HIGH },
  insidere: { x: col(11), y: row(1) }, insidiae: { x: col(11), y: row(3) },
  insidiosus: { x: col(11), y: row(5) }, insidious: { x: col(11), y: LEAF_LOW },
  obsidere: { x: col(12), y: row(2) }, obsessus: { x: col(12), y: row(4) }, obsess: { x: col(12), y: LEAF_HIGH },
  dissidere: { x: col(13), y: row(1) }, dissidens: { x: col(13), y: row(3) }, dissident: { x: col(13), y: LEAF_LOW },
  supersedere: { x: col(14), y: row(2) }, supersede: { x: col(14), y: LEAF_HIGH },

  // sedēre's twin stem: the dictionaries build subsīdō on sīdō, so subsidy
  // descends beside the sedēre fan, not inside it
  sido: { x: col(15), y: HEAD_Y },
  subsidere: { x: col(15), y: row(1) }, subsidium: { x: col(15), y: row(3) },
  subsidy: { x: col(15), y: LEAF_LOW },

  hedra: { x: col(17.5), y: HEAD_Y },
  ephedra: { x: col(16), y: row(2) }, ephedrine: { x: col(16), y: LEAF_HIGH },
  kathedra: { x: col(17.5), y: row(1) }, cathedra: { x: col(17.5), y: row(3) },
  cathedralis: { x: col(17), y: row(5) }, cathedral: { x: col(17), y: LEAF_LOW },
  chaiere: { x: col(18), y: row(6) }, chair: { x: col(18), y: LEAF_HIGH },
  synedrion: { x: col(19), y: row(2) }, sanhedrin_he: { x: col(19), y: row(4) },
  sanhedrin: { x: col(19), y: LEAF_LOW },

  sidos: { x: col(20), y: HEAD_Y },
  sid: { x: col(20), y: row(1) }, beansidhe: { x: col(20), y: row(3) }, banshee: { x: col(20), y: LEAF_HIGH },
};

const byId = new Map(SED_NODES.map(n => [n.id, n]));
const nodes: Laid[] = Object.entries(POS).map(([id, p]) => ({ ...byId.get(id)!, ...p }));
const laid = Object.fromEntries(nodes.map(n => [n.id, n])) as Record<string, Laid>;

/** Each parent's generation line: the depth of its shallowest child. Deeper
 *  siblings hang below it inside their own columns. */
const ROOT_KEY = "__root";
const knee: Record<string, number> = {};
for (const n of nodes) {
  const key = n.parent && laid[n.parent] ? n.parent : ROOT_KEY;
  knee[key] = Math.min(knee[key] ?? Infinity, arriveY(n));
}

/**
 * A link descends straight to its child's own column, and only then drops.
 *
 * Above the generation line it is one clean diagonal (a plain vertical, for a
 * chain); below it, everything happens inside the child's own column. So a
 * link never travels through a row band it does not belong to — which is what
 * lets neighbouring columns stagger freely without any line cutting a label,
 * crossing a sibling, or running shadowed alongside one.
 */
function linkPath(a: Point, b: Laid, kneeY: number, drop = LABEL_DROP) {
  const y0 = a.y + drop;
  const y1 = arriveY(b);
  if (Math.abs(a.x - b.x) < 2) return `M${a.x},${y0} V${y1}`;
  if (y1 <= kneeY + 1) return `M${a.x},${y0} L${b.x},${y1}`;
  const dx = b.x - a.x, dy = kneeY - y0;
  const len = Math.hypot(dx, dy);
  const r = Math.min(13, len / 3, (y1 - kneeY) / 2);
  return `M${a.x},${y0} L${b.x - (dx / len) * r},${kneeY - (dy / len) * r}` +
    ` Q${b.x},${kneeY} ${b.x},${kneeY + r} V${y1}`;
}

/**
 * The root's own branches take a bracket instead: a stem down to one shared
 * lintel, then a drop into each branch's column. Ten diagonals from a single
 * point would converge into a near-solid wedge under the root and separate
 * only far out; one lintel says the same thing in a single line. It is drawn
 * once — as a trunk with two rounded ends plus one drop per branch — so no
 * segment is ever painted twice.
 */
const LINTEL = 196;
const rootKids = nodes.filter(n => !(n.parent && laid[n.parent]));
const kidXs = rootKids.map(n => n.x);
const MIN_X = Math.min(...kidXs), MAX_X = Math.max(...kidXs);
const LINTEL_R = 14;

/** stem, trunk, and the two rounded ends where the outermost branches turn */
const bracket = [
  `M${ROOT.x},${ROOT.y + ROOT_DROP} V${LINTEL}`,
  `M${MIN_X + LINTEL_R},${LINTEL} H${MAX_X - LINTEL_R}`,
  ...rootKids
    .filter(n => n.x === MIN_X || n.x === MAX_X)
    .map(n => {
      const s = n.x === MIN_X ? 1 : -1;
      return `M${n.x + s * LINTEL_R},${LINTEL} Q${n.x},${LINTEL} ${n.x},${LINTEL + LINTEL_R} V${arriveY(n)}`;
    }),
];
const rootDrop = (n: Laid) => `M${n.x},${LINTEL} V${arriveY(n)}`;

export default function Sit() {
  return (
    <svg className="seat" viewBox="0 35 2000 940" role="img"
      aria-label="Selected descendants of PIE *sed-, arranged as a descent tree">
      {bracket.map((d, i) => <path key={`b-${i}`} d={d} fill="none" className="t-link" />)}
      {nodes.map(n => {
        const parent = n.parent && laid[n.parent] ? laid[n.parent] : undefined;
        if (!parent && (n.x === MIN_X || n.x === MAX_X)) return null; // drawn with the bracket ends
        return <path key={`l-${n.id}`} fill="none" className="t-link"
          d={parent ? linkPath(parent, n, knee[n.parent!]) : rootDrop(n)}
          strokeDasharray={n.dashed ? "5 4" : undefined} />;
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
