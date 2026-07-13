// *weyd- 'to see → to know'. Data from root_trees.md (exploration tier).
// One word per node; every non-obvious English word gets its linking form as
// a real intermediate NODE (videō → invidia → envy), never as a footnote.
// Notes are only the gloss · language of the node's own form. Angles/radii
// are hand-tuned; modern words are clamped to the almond silhouette.

export type EyeKind = "ancestor" | "proto" | "modern";

export interface EyeNode {
  id: string;
  form: string;
  /** gloss · language of this form — non-English forms only */
  note?: string;
  kind: EyeKind;
  a: number;
  r: number;
  parent?: string;
  /** loan or disputed link */
  dashed?: boolean;
  /** force the label to the other side of the node */
  flip?: boolean;
}

export const EYE_NODES: EyeNode[] = [
  // Latin arm (right): the seeing side
  { id: "video", form: "videō", note: "to see · Latin", kind: "ancestor", a: 4, r: 180 },
  { id: "invidia", form: "invidia", note: "a look cast upon · Latin", kind: "ancestor", a: -24, r: 330, parent: "video" },
  { id: "envy", form: "envy", kind: "modern", a: -34, r: 450, parent: "invidia" },
  { id: "evidens", form: "ēvidēns", note: "plain to see · Latin", kind: "ancestor", a: -14, r: 345, parent: "video" },
  { id: "evidence", form: "evidence", kind: "modern", a: -24, r: 516, parent: "evidens" },
  { id: "prudens", form: "prūdēns", note: "foreseeing, from prōvidēns · Latin", kind: "ancestor", a: -5, r: 345, parent: "video" },
  { id: "prudent", form: "prudent", kind: "modern", a: -13, r: 560, parent: "prudens" },
  { id: "visio", form: "vīsiō", note: "sight · Latin", kind: "ancestor", a: 4, r: 330, parent: "video" },
  { id: "vision", form: "vision", kind: "modern", a: -1, r: 570, parent: "visio" },
  { id: "veoir", form: "veoir", note: "to see · Old French", kind: "ancestor", a: 20, r: 280, parent: "video" },
  { id: "view", form: "view", kind: "modern", a: 13, r: 470, parent: "veoir" },
  { id: "avis", form: "avis", note: "opinion: (ce m’est) a vis · Old French", kind: "ancestor", a: 28, r: 330, parent: "veoir" },
  { id: "advice", form: "advice", kind: "modern", a: 28, r: 490, parent: "avis" },

  // Greek arm (upper right)
  { id: "histor", form: "ἵστωρ", note: "one who has seen · Greek", kind: "ancestor", a: -55, r: 150 },
  { id: "historia", form: "historia", note: "inquiry · Greek → Latin", kind: "ancestor", a: -55, r: 255, parent: "histor" },
  { id: "history", form: "history", kind: "modern", a: -58, r: 400, parent: "historia" },
  { id: "estoire", form: "estoire", note: "Old French", kind: "ancestor", a: -46, r: 330, parent: "historia", flip: true },
  { id: "story", form: "story", kind: "modern", a: -46, r: 360, parent: "estoire" },
  { id: "eidos", form: "εἶδος", note: "the seen form · Greek", kind: "ancestor", a: -76, r: 240 },
  { id: "idea", form: "idea", kind: "modern", a: -84, r: 340, parent: "eidos" },
  { id: "idol", form: "idol", kind: "modern", a: -72, r: 390, parent: "eidos" },

  // Germanic arm (left, inherited): the knowing side
  { id: "witana", form: "*witaną", note: "to know · Proto-Germanic", kind: "proto", a: 198, r: 160 },
  { id: "witan", form: "witan", note: "to know · Old English", kind: "ancestor", a: 186, r: 265, parent: "witana" },
  { id: "wit", form: "wit", kind: "modern", a: 201, r: 390, parent: "witan" },
  { id: "witness", form: "witness", kind: "modern", a: 184, r: 490, parent: "witan" },
  { id: "aetwitan", form: "ǣtwītan", note: "to taunt · Old English", kind: "ancestor", a: 172, r: 380, parent: "witan" },
  { id: "twit", form: "twit", kind: "modern", a: 172, r: 560, parent: "aetwitan" },
  { id: "fwitan", form: "*wītan", note: "to show the way · Frankish", kind: "proto", a: 205, r: 280, parent: "witana" },
  { id: "guider", form: "guider", note: "Old French", kind: "ancestor", a: 208, r: 400, parent: "fwitan", dashed: true },
  { id: "guide", form: "guide", kind: "modern", a: 210, r: 520, parent: "guider" },
  { id: "wisaz", form: "*wīsaz", note: "knowing · Proto-Germanic", kind: "proto", a: 158, r: 180 },
  { id: "wise", form: "wise", kind: "modern", a: 150, r: 440, parent: "wisaz" },
  { id: "wizard", form: "wizard", kind: "modern", a: 163, r: 500, parent: "wisaz" },
  { id: "wisa", form: "wīsa", note: "manner · Frankish", kind: "proto", a: 138, r: 280, parent: "wisaz" },
  { id: "guise", form: "guise", kind: "modern", a: 136, r: 420, parent: "wisa", dashed: true },

  // single-fruit branches
  { id: "druwits", form: "*dru-wits", note: "oak-knower · Proto-Celtic", kind: "proto", a: 64, r: 180 },
  { id: "druid", form: "druid", kind: "modern", a: 66, r: 340, parent: "druwits" },
  { id: "vedas", form: "véda", note: "knowledge · Sanskrit", kind: "ancestor", a: 110, r: 196 },
  { id: "veda", form: "Veda", kind: "modern", a: 108, r: 330, parent: "vedas" },
];
