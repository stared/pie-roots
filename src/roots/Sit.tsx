import { SED_NODES } from "./data/sed";
import type { WordNode } from "./types";

interface Point { x: number; y: number }
type Laid = WordNode & Point;

const COL_LEFT = 70;
const COL_STEP = 96;
const col = (n: number) => COL_LEFT + n * COL_STEP;

/** Generations: the root, the branch heads, then one row per descent step.
 *  A fork's children always share a row — that is what keeps every link a
 *  straight line that passes over no other label (see linkPath). */
const HEAD = 270;
const G1 = 410, G2 = 540, G3 = 670;
const LEAF_HIGH = 800, LEAF_LOW = 865;

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
// alternating between two rows so neighbouring English words never touch.
// Shared ancestors are centered over their endpoint span; no family owns a
// private grid. Column order puts the widest forms where a neighbouring column
// is a generation away, so no two labels on a row can reach each other.
const POS: Record<string, Point> = {
  germanic_sed: { x: col(1.5), y: HEAD },
  sitjana: { x: col(0), y: G1 }, sittan: { x: col(0), y: G2 }, sit: { x: col(0), y: LEAF_HIGH },
  satjana: { x: col(1), y: G1 }, settan: { x: col(1), y: G2 }, set: { x: col(1), y: LEAF_LOW },
  setija: { x: col(2), y: G1 }, saeti: { x: col(2), y: G2 }, seat: { x: col(2), y: LEAF_HIGH },
  sotam: { x: col(3), y: G1 }, sot: { x: col(3), y: G2 }, soot: { x: col(3), y: LEAF_LOW },

  nisdos: { x: col(4.5), y: HEAD },
  nestaz: { x: col(4), y: G1 }, nest: { x: col(4), y: LEAF_HIGH },
  nidus: { x: col(5), y: G1 }, nidicare: { x: col(5), y: G2 },
  nicher: { x: col(5), y: G3 }, niche: { x: col(5), y: LEAF_LOW },

  sedes: { x: col(6), y: HEAD },
  sie: { x: col(6), y: G1 }, see: { x: col(6), y: LEAF_HIGH },

  sedere: { x: col(10.5), y: HEAD },
  sedicum: { x: col(7), y: G1 }, sege: { x: col(7), y: G2 }, siege: { x: col(7), y: LEAF_LOW },
  sedare: { x: col(8), y: G1 }, sedate: { x: col(8), y: LEAF_HIGH },
  assidere: { x: col(9.5), y: G1 },
  assise: { x: col(9), y: G2 }, sise: { x: col(9), y: G3 }, size: { x: col(9), y: LEAF_LOW },
  assessus: { x: col(10), y: G2 }, assessare: { x: col(10), y: G3 }, assess: { x: col(10), y: LEAF_HIGH },
  supersedere: { x: col(11), y: G1 }, supersede: { x: col(11), y: LEAF_LOW },
  insidere: { x: col(12), y: G1 }, insidiae: { x: col(12), y: G2 },
  insidiosus: { x: col(12), y: G3 }, insidious: { x: col(12), y: LEAF_HIGH },
  obsidere: { x: col(13), y: G1 }, obsessus: { x: col(13), y: G2 }, obsess: { x: col(13), y: LEAF_LOW },
  dissidere: { x: col(14), y: G1 }, dissidens: { x: col(14), y: G2 }, dissident: { x: col(14), y: LEAF_HIGH },

  // sedēre's twin stem: the dictionaries build subsīdō on sīdō, so subsidy
  // descends beside the sedēre fan, not inside it
  sido: { x: col(15), y: HEAD },
  subsidere: { x: col(15), y: G1 }, subsidium: { x: col(15), y: G2 }, subsidy: { x: col(15), y: LEAF_LOW },

  hedra: { x: col(17.5), y: HEAD },
  ephedra: { x: col(16), y: G1 }, ephedrine: { x: col(16), y: LEAF_HIGH },
  kathedra: { x: col(17.5), y: G1 }, cathedra: { x: col(17.5), y: G2 },
  cathedralis: { x: col(17), y: G3 }, cathedral: { x: col(17), y: LEAF_LOW },
  chaiere: { x: col(18), y: G3 }, chair: { x: col(18), y: LEAF_HIGH },
  synedrion: { x: col(19), y: G1 }, sanhedrin_he: { x: col(19), y: G2 },
  sanhedrin: { x: col(19), y: LEAF_LOW },

  sidos: { x: col(20), y: HEAD },
  sid: { x: col(20), y: G1 }, beansidhe: { x: col(20), y: G2 }, banshee: { x: col(20), y: LEAF_HIGH },
};

const byId = new Map(SED_NODES.map(n => [n.id, n]));
const nodes: Laid[] = Object.entries(POS).map(([id, p]) => ({ ...byId.get(id)!, ...p }));
const laid = Object.fromEntries(nodes.map(n => [n.id, n])) as Record<string, Laid>;

/**
 * Every link is straight: curvature would carry no meaning here. A chain runs
 * vertically down its column; a fork sends one straight line to each child.
 * Because a fork's children share a row, a line to a far child stays above the
 * row it is heading for, so it can never cut through a nearer child's label —
 * and lines leaving one point can never cross each other.
 */
function linkPath(a: Point, b: Laid, drop = LABEL_DROP) {
  const y0 = a.y + drop;
  const y1 = arriveY(b);
  return Math.abs(a.x - b.x) < 2 ? `M${a.x},${y0} V${y1}` : `M${a.x},${y0} L${b.x},${y1}`;
}

export default function Sit() {
  return (
    <svg className="seat" viewBox="0 35 2080 885" role="img"
      aria-label="Selected descendants of PIE *sed-, arranged as a descent tree">
      {nodes.map(n => {
        const parent = n.parent && laid[n.parent] ? laid[n.parent] : undefined;
        return <path key={`l-${n.id}`} fill="none" className="t-link"
          d={linkPath(parent ?? ROOT, n, parent ? LABEL_DROP : ROOT_DROP)}
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
