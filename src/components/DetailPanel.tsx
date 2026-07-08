import type { EtymNode } from "../data/etymology";
import { SENSES } from "../data/etymology";
import { REFERENCES, sourceLink } from "../data/references";

const KIND_LABEL: Record<EtymNode["kind"], string> = {
  root: "reconstructed root",
  reconstructed: "reconstructed",
  attested: "attested",
  modern: "modern word",
};

export default function DetailPanel({ node, onClose }: { node: EtymNode; onClose: () => void }) {
  return (
    <aside className="detail" onClick={(e) => e.stopPropagation()}>
      <button className="detail-close" onClick={onClose} aria-label="Close">
        ×
      </button>
      <div className="detail-kind">{KIND_LABEL[node.kind]}</div>
      <h3 className="detail-form">
        {node.form}
        {node.translit && <span className="detail-translit"> [{node.translit}]</span>}
      </h3>
      <div className="detail-lang">{node.lang}</div>
      <div className="detail-gloss">‘{node.gloss}’</div>
      {node.sense && node.kind === "modern" && (
        <div className="detail-sense" style={{ color: SENSES[node.sense].color }}>
          {SENSES[node.sense].label}
        </div>
      )}
      {node.disputed && (
        <div className="detail-disputed">⚠ Disputed link — competing published derivations.</div>
      )}
      {node.note && <p className="detail-note">{node.note}</p>}
      {node.quote && <blockquote className="detail-quote">{node.quote}</blockquote>}
      {node.refs && node.refs.length > 0 && (
        <div className="detail-sources">
          <div className="detail-sources-title">Sources</div>
          <ul>
            {node.refs.map((r) => (
              <li key={r}>
                <a href={REFERENCES[r]} target="_blank" rel="noopener noreferrer">
                  {sourceLink(REFERENCES[r])}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </aside>
  );
}
