import { SED_NODES, type SedNode } from "./data/sed";

interface Point { x: number; y: number }
type Laid = Omit<SedNode, "x" | "y"> & Point;

const ROOT: Point = { x: 950, y: 92 };
const LEAF_Y = 825;

// The published chart is a deliberately chosen dozen, not the research tree.
// Each family gets enough horizontal room for its ancestry to remain legible.
const POS: Record<string, Point> = {
  germanic_sed: { x: 230, y: 205 },
  sitjana: { x: 70, y: 340 }, sittan: { x: 70, y: 625 }, sit: { x: 70, y: LEAF_Y },
  setija: { x: 230, y: 340 }, saeti: { x: 230, y: 625 }, seat: { x: 230, y: LEAF_Y },
  sotam: { x: 390, y: 365 }, sot: { x: 390, y: 625 }, soot: { x: 390, y: LEAF_Y },

  nisdos: { x: 600, y: 210 },
  nestaz: { x: 520, y: 420 }, nest: { x: 520, y: LEAF_Y },
  nidus: { x: 670, y: 390 }, nidicare: { x: 670, y: 530 },
  nicher: { x: 670, y: 655 }, niche: { x: 670, y: LEAF_Y },

  sedere: { x: 970, y: 220 },
  sedes: { x: 800, y: 390 }, sie: { x: 770, y: 640 }, see: { x: 770, y: LEAF_Y },
  sedicum: { x: 900, y: 500 }, sege: { x: 900, y: 640 }, siege: { x: 900, y: LEAF_Y },
  sedare: { x: 1030, y: 470 }, sedate: { x: 1030, y: LEAF_Y },
  assidere: { x: 1160, y: 410 }, assise: { x: 1160, y: 625 }, size: { x: 1160, y: LEAF_Y },

  hedra: { x: 1490, y: 215 },
  ephedra: { x: 1290, y: 465 }, ephedrine: { x: 1290, y: LEAF_Y },
  kathedra: { x: 1480, y: 350 }, cathedra: { x: 1480, y: 505 },
  cathedralis: { x: 1420, y: 650 }, cathedral: { x: 1420, y: LEAF_Y },
  chaiere: { x: 1540, y: 650 }, chair: { x: 1540, y: LEAF_Y },
  synedrion: { x: 1680, y: 390 }, sanhedrin_he: { x: 1680, y: 630 },
  sanhedrin: { x: 1680, y: LEAF_Y },

  sidos: { x: 1840, y: 220 }, sid: { x: 1840, y: 475 },
  beansidhe: { x: 1840, y: 650 }, banshee: { x: 1840, y: LEAF_Y },
};

const byId = new Map(SED_NODES.map(n => [n.id, n]));
const nodes: Laid[] = Object.entries(POS).map(([id, p]) => ({ ...byId.get(id)!, ...p }));
const laid = Object.fromEntries(nodes.map(n => [n.id, n])) as Record<string, Laid>;

/** A restrained inverted-u shoulder: descent first, ornament second. */
function linkPath(a: Point, b: Point) {
  const y0 = a.y + 16;
  const y1 = b.y - 8;
  if (Math.abs(a.x - b.x) < 2) return `M${a.x},${y0} V${y1}`;
  const shoulder = Math.min(68, Math.max(34, (y1 - y0) * 0.36));
  return `M${a.x},${y0} C${a.x},${y0 + shoulder} ${b.x},${y0 + shoulder} ${b.x},${y1}`;
}

export default function Sit() {
  return (
    <svg className="seat" viewBox="0 10 1920 875" role="img"
      aria-label="Selected descendants of PIE *sed-, arranged as a descent tree">
      {nodes.map(n => {
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
