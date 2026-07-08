import { useEffect, useMemo, useRef, useState } from "react";
import { select } from "d3-selection";
import { zoom, zoomIdentity, type ZoomTransform } from "d3-zoom";
import { buildLayout, linkPath, starPath, type LaidNode } from "../lib/layout";
import type { EtymNode } from "../data/etymology";

interface Props {
  focusIds: string[]; // [] = whole star
  interactive: boolean;
  onSelect: (n: EtymNode | null) => void;
  selectedId: string | null;
}

function glyph(n: LaidNode): { d: string; hollow: boolean } {
  const kind = n.node.kind;
  if (kind === "root") return { d: starPath(8, 16, 7), hollow: false };
  if (kind === "reconstructed") return { d: starPath(4, 9, 3.5), hollow: true };
  if (kind === "modern")
    return { d: starPath(5, n.node.important ? 9 : 7, n.node.important ? 3.8 : 3), hollow: false };
  return { d: starPath(4, 7, 2.8), hollow: false };
}

export default function StarChart({ focusIds, interactive, onSelect, selectedId }: Props) {
  const layout = useMemo(buildLayout, []);
  const svgRef = useRef<SVGSVGElement>(null);
  const [transform, setTransform] = useState<ZoomTransform>(zoomIdentity);
  const [hoverId, setHoverId] = useState<string | null>(null);

  const vb = layout.extent;
  const vbW = vb.x1 - vb.x0;
  const vbH = vb.y1 - vb.y0;

  // Active set: focus nodes + their ancestors + their descendants.
  const activeIds = useMemo(() => {
    if (focusIds.length === 0) return null; // null = everything active
    const set = new Set<string>();
    for (const id of focusIds) {
      const laid = layout.byId.get(id);
      if (!laid) continue;
      laid.lineage.forEach((a) => set.add(a));
      for (const n of layout.nodes) {
        if (n.lineage.includes(id)) set.add(n.node.id);
      }
    }
    return set;
  }, [focusIds, layout]);

  const hoverLineage = useMemo(() => {
    if (!hoverId) return null;
    return new Set(layout.byId.get(hoverId)?.lineage ?? []);
  }, [hoverId, layout]);

  // Programmatic framing of the focus set (story mode).
  useEffect(() => {
    if (interactive) return;
    if (focusIds.length === 0) {
      setTransform(zoomIdentity);
      return;
    }
    const pts = focusIds
      .map((id) => layout.byId.get(id))
      .filter((n): n is LaidNode => !!n)
      .flatMap((n) => {
        // include the immediate parent so the framed branch has context
        const parentId = n.lineage[n.lineage.length - 2];
        const p = parentId ? layout.byId.get(parentId) : undefined;
        return p ? [n, p] : [n];
      });
    if (!pts.length) return;
    const xs = pts.map((p) => p.x);
    const ys = pts.map((p) => p.y);
    const pad = 130;
    const x0 = Math.min(...xs) - pad;
    const x1 = Math.max(...xs) + pad;
    const y0 = Math.min(...ys) - pad;
    const y1 = Math.max(...ys) + pad;
    const k = Math.min(2.4, Math.min(vbW / (x1 - x0), vbH / (y1 - y0)));
    const cx = (x0 + x1) / 2;
    const cy = (y0 + y1) / 2;
    setTransform(zoomIdentity.scale(k).translate(-cx, -cy));
  }, [focusIds, interactive, layout, vbW, vbH]);

  // d3-zoom for explore mode.
  useEffect(() => {
    const svg = svgRef.current;
    if (!svg || !interactive) return;
    const z = zoom<SVGSVGElement, unknown>()
      .scaleExtent([0.5, 8])
      .on("zoom", (ev) => setTransform(ev.transform));
    const sel = select(svg);
    sel.call(z);
    return () => {
      sel.on(".zoom", null);
    };
  }, [interactive]);

  const isActive = (id: string) => !activeIds || activeIds.has(id);
  const labelVisible = (n: LaidNode) =>
    interactive || n.node.important || n.node.kind === "root" || isActiveFocused(n);
  const isActiveFocused = (n: LaidNode) => (activeIds ? activeIds.has(n.node.id) : false);

  // In story mode the transform is our own zoomIdentity-based one (translate
  // then scale semantics differ): compose as scale(k) then translate.
  const g = interactive
    ? `translate(${transform.x},${transform.y}) scale(${transform.k})`
    : `scale(${transform.k}) translate(${transform.x},${transform.y})`;

  return (
    <svg
      ref={svgRef}
      className="starchart"
      viewBox={`${vb.x0} ${vb.y0} ${vbW} ${vbH}`}
      role="img"
      aria-label="Radial etymology chart of the Proto-Indo-European root *h₂stḗr, ‘star’"
      onClick={() => onSelect(null)}
    >
      <g style={{ transition: interactive ? "none" : "transform 850ms cubic-bezier(.4,0,.2,1)" }} transform={g}>
        {layout.links.map((l) => {
          const active = isActive(l.target.node.id);
          const inHover = hoverLineage?.has(l.target.node.id) && hoverLineage?.has(l.source.node.id);
          return (
            <path
              key={l.target.node.id}
              d={linkPath(l)}
              fill="none"
              stroke={inHover ? "#fff6d8" : "#5a5a72"}
              strokeWidth={inHover ? 1.6 : Math.max(0.7, Math.sqrt(l.target.subtreeSize) * 0.55)}
              strokeDasharray={l.disputed ? "4 4" : undefined}
              opacity={active ? (inHover ? 0.95 : 0.55) : 0.07}
            />
          );
        })}
        {layout.nodes.map((n) => {
          const { d, hollow } = glyph(n);
          const active = isActive(n.node.id);
          const selected = selectedId === n.node.id;
          const rotate = ((n.angle * 180) / Math.PI) % 360;
          const flip = n.angle > Math.PI;
          return (
            <g
              key={n.node.id}
              transform={`translate(${n.x},${n.y})`}
              opacity={active ? 1 : 0.1}
              style={{ cursor: "pointer" }}
              onMouseEnter={() => setHoverId(n.node.id)}
              onMouseLeave={() => setHoverId(null)}
              onClick={(e) => {
                e.stopPropagation();
                onSelect(n.node);
              }}
            >
              <path
                d={d}
                fill={hollow ? "none" : n.color}
                stroke={selected ? "#ffffff" : n.color}
                strokeWidth={hollow ? 1.2 : selected ? 1.5 : 0}
                strokeDasharray={hollow ? "2.5 2" : undefined}
              />
              {n.node.kind === "root" && <circle r={26} fill="none" stroke="#fff6d8" strokeOpacity={0.25} />}
              {labelVisible(n) && n.node.kind !== "root" && (
                <text
                  className={`label ${n.node.kind === "modern" ? "label-modern" : ""}`}
                  transform={`rotate(${flip ? rotate + 90 : rotate - 90})`}
                  x={flip ? -14 : 14}
                  dy="0.32em"
                  textAnchor={flip ? "end" : "start"}
                  fill={n.color}
                >
                  {n.node.form}
                </text>
              )}
              {n.node.kind === "root" && (
                <text className="label label-root" y={38} textAnchor="middle" fill="#fff6d8">
                  {n.node.form}
                </text>
              )}
            </g>
          );
        })}
      </g>
    </svg>
  );
}
