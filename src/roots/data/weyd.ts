// *weyd- 'to see → to know'. Data from root_trees.md (exploration tier).
// One word per node; every non-obvious English word gets its linking form as
// a real intermediate NODE (videō → invidia → envy), never as a footnote.
// gloss and lang are separate fields — the "gloss · language" line is
// composed at render time. Angles/radii are hand-tuned; modern words are
// clamped to the almond silhouette.

import type { WordNode } from "../types";

export interface EyeNode extends WordNode {
  a: number;
  r: number;
  /** force the label to the other side of the node */
  flip?: boolean;
  /** label sits left of the node, clear of the rightward fan */
  labelLeft?: boolean;
  /** label sits right of the node, clear of a leftward fan */
  labelRight?: boolean;
}

export const EYE_NODES: EyeNode[] = [
  // Latin arm (right): the seeing side
  { id: "video", form: "videō", gloss: "to see", lang: "Latin", kind: "ancestor", a: 0, r: 150, labelLeft: true },
  { id: "invidere", form: "invidēre", gloss: "to look askance at", lang: "Latin", kind: "ancestor", a: -27.3, r: 215, parent: "video" },
  { id: "invidia", form: "invidia", gloss: "envy, ill will", lang: "Latin", kind: "ancestor", a: -42.7, r: 329, parent: "invidere" },
  { id: "envy", form: "envy", kind: "modern", a: -49, r: 435, parent: "invidia" },
  { id: "evidens", form: "ēvidēns", gloss: "plain to see", lang: "Latin", kind: "ancestor", a: -27.0, r: 313, parent: "video" },
  { id: "evidence", form: "evidence", kind: "modern", a: -33, r: 435, parent: "evidens" },
  { id: "providere", form: "prōvidēre", gloss: "to foresee", lang: "Latin", kind: "ancestor", a: -9.8, r: 247, parent: "video" },
  { id: "provide", form: "provide", kind: "modern", a: -6, r: 435, parent: "providere" },
  { id: "prudens", form: "prūdēns", gloss: "foreseeing", lang: "Latin", kind: "ancestor", a: -13.7, r: 341, parent: "providere" },
  { id: "prudent", form: "prudent", kind: "modern", a: -16, r: 435, parent: "prudens" },
  { id: "visio", form: "vīsiō", gloss: "sight", lang: "Latin", kind: "ancestor", a: 4.5, r: 292, parent: "video" },
  { id: "vision", form: "vision", kind: "modern", a: 6, r: 435, parent: "visio" },
  { id: "veoir", form: "veoir", gloss: "to see", lang: "Old French", kind: "ancestor", a: 10.0, r: 233, parent: "video" },
  { id: "veue", form: "veue", gloss: "sight", lang: "Old French", kind: "ancestor", a: 15.7, r: 348, parent: "veoir" },
  { id: "view", form: "view", kind: "modern", a: 18, r: 435, parent: "veue" },
  { id: "visus", form: "vīsus", gloss: "a seeing", lang: "Latin", kind: "ancestor", a: 21.9, r: 266, parent: "video" },
  { id: "avis", form: "avis", gloss: "opinion: (ce m’est) a vis", lang: "Old French", kind: "ancestor", a: 26.5, r: 332, parent: "visus" },
  { id: "advice", form: "advice", kind: "modern", a: 31, r: 435, parent: "avis" },

  // Greek arm (upper right)
  { id: "histor", form: "ἵστωρ", gloss: "one who has seen", lang: "Greek", kind: "ancestor", a: -69.9, r: 164 },
  { id: "historia", form: "historia", gloss: "inquiry", lang: "Latin", kind: "ancestor", a: -69.9, r: 273, parent: "histor" },
  { id: "history", form: "history", kind: "modern", a: -83, r: 435, parent: "historia" },
  { id: "estoire", form: "estoire", gloss: "story, history", lang: "Old French", kind: "ancestor", a: -67.5, r: 354, parent: "historia" },
  { id: "story", form: "story", kind: "modern", a: -66, r: 435, parent: "estoire" },
  // idea and idol: two different formations on the same seen-stem, side by side
  { id: "idea_gr", form: "ἰδέα", gloss: "form, pattern", lang: "Greek", kind: "ancestor", a: -116.0, r: 183 },
  { id: "idea", form: "idea", kind: "modern", a: -116, r: 435, parent: "idea_gr" },
  { id: "eidolon", form: "εἴδωλον", gloss: "image, phantom", lang: "Greek", kind: "ancestor", a: -99.0, r: 218 },
  { id: "idol", form: "idol", kind: "modern", a: -99, r: 435, parent: "eidolon" },

  // Germanic arm (left, inherited): the knowing side — and its near-twin,
  // *wītaną 'to blame' (long ī), the same-surface sibling of *witaną 'to know'
  { id: "witana", form: "*witaną", gloss: "to know", lang: "Proto-Germanic", kind: "proto", a: 169.5, r: 147 },
  { id: "witan", form: "witan", gloss: "to know", lang: "Old English", kind: "ancestor", a: 169.5, r: 267, parent: "witana" },
  { id: "wit", form: "wit", kind: "modern", a: 172, r: 435, parent: "witan" },
  { id: "witness", form: "witness", kind: "modern", a: 155, r: 435, parent: "witan" },
  { id: "witanao", form: "*wītaną", gloss: "to blame, punish", lang: "Proto-Germanic", kind: "proto", a: -152.3, r: 184 },
  { id: "aetwitan", form: "ǣtwītan", gloss: "to taunt", lang: "Old English", kind: "ancestor", a: -161.2, r: 308, parent: "witanao" },
  { id: "twit", form: "twit", kind: "modern", a: 195, r: 435, parent: "aetwitan" },
  { id: "fwitan", form: "*wītan", gloss: "to show the way", lang: "Frankish", kind: "proto", a: -146.7, r: 265, parent: "witanao", labelRight: true },
  { id: "guider", form: "guider", gloss: "to guide", lang: "Old French", kind: "ancestor", a: -143.8, r: 349, parent: "fwitan" },
  { id: "guide", form: "guide", kind: "modern", a: 218, r: 435, parent: "guider" },
  { id: "wisaz", form: "*wīsaz", gloss: "knowing", lang: "Proto-Germanic", kind: "proto", a: 129.5, r: 155, labelRight: true },
  { id: "wys", form: "wys", gloss: "wise", lang: "Middle English", kind: "ancestor", a: 129.5, r: 290, parent: "wisaz", labelRight: true },
  { id: "wise", form: "wise", kind: "modern", a: 122, r: 435, parent: "wys" },
  { id: "wizard", form: "wizard", kind: "modern", a: 137, r: 435, parent: "wys" },
  { id: "wisa", form: "*wīsa", gloss: "manner", lang: "Frankish", kind: "proto", a: 103, r: 245, labelRight: true },
  { id: "guise", form: "guise", kind: "modern", a: 103, r: 435, parent: "wisa" },

  // single-fruit branches
  { id: "druwits", form: "*dru-wits", gloss: "oak-knower", lang: "Proto-Celtic", kind: "proto", a: 48, r: 175, labelLeft: true },
  { id: "druid", form: "druid", kind: "modern", a: 48, r: 435, parent: "druwits" },
  { id: "vedas", form: "véda", gloss: "knowledge", lang: "Sanskrit", kind: "ancestor", a: 68, r: 215, labelLeft: true },
  { id: "veda", form: "Veda", kind: "modern", a: 68, r: 435, parent: "vedas" },
  // the Unseen: ἀ- 'un-' + ϝιδ- 'seen', with the digamma dropped as in ἰδέα
  { id: "aides", form: "Ἀΐδης", gloss: "the Unseen", lang: "Greek", kind: "ancestor", a: 88, r: 160, dashed: true, labelLeft: true },
  { id: "hades", form: "Hades", kind: "modern", a: 88, r: 435, parent: "aides" },
];
