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
  { id: "video", form: "videō", gloss: "to see", lang: "Latin", kind: "ancestor", a: 4, r: 140, labelLeft: true },
  { id: "invidere", form: "invidēre", gloss: "to look askance at", lang: "Latin", kind: "ancestor", a: -26, r: 210, parent: "video" },
  { id: "invidia", form: "invidia", gloss: "envy, ill will", lang: "Latin", kind: "ancestor", a: -30, r: 290, parent: "invidere" },
  { id: "envy", form: "envy", kind: "modern", a: -34, r: 420, parent: "invidia" },
  { id: "evidens", form: "ēvidēns", gloss: "plain to see", lang: "Latin", kind: "ancestor", a: -14, r: 240, parent: "video" },
  { id: "evidence", form: "evidence", kind: "modern", a: -21, r: 420, parent: "evidens" },
  { id: "providere", form: "prōvidēre", gloss: "to foresee", lang: "Latin", kind: "ancestor", a: -5, r: 210, parent: "video" },
  { id: "provide", form: "provide", kind: "modern", a: -1, r: 350, parent: "providere" },
  { id: "prudens", form: "prūdēns", gloss: "foreseeing", lang: "Latin", kind: "ancestor", a: -9, r: 295, parent: "providere" },
  { id: "prudent", form: "prudent", kind: "modern", a: -11, r: 430, parent: "prudens" },
  { id: "visio", form: "vīsiō", gloss: "sight", lang: "Latin", kind: "ancestor", a: 4, r: 255, parent: "video" },
  { id: "vision", form: "vision", kind: "modern", a: 2, r: 430, parent: "visio" },
  { id: "veoir", form: "veoir", gloss: "to see", lang: "Old French", kind: "ancestor", a: 22, r: 245, parent: "video" },
  { id: "veue", form: "veue", gloss: "sight", lang: "Old French", kind: "ancestor", a: 16.5, r: 345, parent: "veoir" },
  { id: "view", form: "view", kind: "modern", a: 12, r: 445, parent: "veue" },
  { id: "visus", form: "vīsus", gloss: "a seeing", lang: "Latin", kind: "ancestor", a: 30, r: 185, parent: "video" },
  { id: "avis", form: "avis", gloss: "opinion: (ce m’est) a vis", lang: "Old French", kind: "ancestor", a: 26, r: 295, parent: "visus" },
  { id: "advice", form: "advice", kind: "modern", a: 27, r: 435, parent: "avis" },

  // Greek arm (upper right)
  { id: "histor", form: "ἵστωρ", gloss: "one who has seen", lang: "Greek", kind: "ancestor", a: -55, r: 115 },
  { id: "historia", form: "historia", gloss: "inquiry", lang: "Latin", kind: "ancestor", a: -52, r: 195, parent: "histor" },
  { id: "history", form: "history", kind: "modern", a: -55, r: 330, parent: "historia" },
  { id: "estoire", form: "estoire", gloss: "story, history", lang: "Old French", kind: "ancestor", a: -44, r: 265, parent: "historia" },
  { id: "story", form: "story", kind: "modern", a: -41, r: 365, parent: "estoire" },
  // idea and idol: two different formations on the same seen-stem, side by side
  { id: "idea_gr", form: "ἰδέα", gloss: "form, pattern", lang: "Greek", kind: "ancestor", a: -86, r: 175 },
  { id: "idea", form: "idea", kind: "modern", a: -89, r: 285, parent: "idea_gr" },
  { id: "eidolon", form: "εἴδωλον", gloss: "image, phantom", lang: "Greek", kind: "ancestor", a: -69, r: 230 },
  { id: "idol", form: "idol", kind: "modern", a: -73, r: 330, parent: "eidolon" },

  // Germanic arm (left, inherited): the knowing side — and its near-twin,
  // *wītaną 'to blame' (long ī), the same-surface sibling of *witaną 'to know'
  { id: "witana", form: "*witaną", gloss: "to know", lang: "Proto-Germanic", kind: "proto", a: 197, r: 125 },
  { id: "witan", form: "witan", gloss: "to know", lang: "Old English", kind: "ancestor", a: 187, r: 210, parent: "witana" },
  { id: "wit", form: "wit", kind: "modern", a: 199, r: 320, parent: "witan" },
  { id: "witness", form: "witness", kind: "modern", a: 184, r: 395, parent: "witan" },
  { id: "witanao", form: "*wītaną", gloss: "to blame, punish", lang: "Proto-Germanic", kind: "proto", a: 215, r: 170 },
  { id: "aetwitan", form: "ǣtwītan", gloss: "to taunt", lang: "Old English", kind: "ancestor", a: 221, r: 255, parent: "witanao" },
  { id: "twit", form: "twit", kind: "modern", a: 225, r: 350, parent: "aetwitan" },
  { id: "fwitan", form: "*wītan", gloss: "to show the way", lang: "Frankish", kind: "proto", a: 206, r: 275, parent: "witanao", labelRight: true },
  { id: "guider", form: "guider", gloss: "to guide", lang: "Old French", kind: "ancestor", a: 209, r: 340, parent: "fwitan" },
  { id: "guide", form: "guide", kind: "modern", a: 211, r: 430, parent: "guider" },
  { id: "wisaz", form: "*wīsaz", gloss: "knowing", lang: "Proto-Germanic", kind: "proto", a: 155, r: 145 },
  { id: "wise", form: "wise", kind: "modern", a: 149, r: 330, parent: "wisaz" },
  { id: "wizard", form: "wizard", kind: "modern", a: 157, r: 420, parent: "wise" },
  { id: "wisa", form: "*wīsa", gloss: "manner", lang: "Frankish", kind: "proto", a: 137, r: 215 },
  { id: "guise", form: "guise", kind: "modern", a: 134, r: 330, parent: "wisa" },

  // single-fruit branches
  { id: "druwits", form: "*dru-wits", gloss: "oak-knower", lang: "Proto-Celtic", kind: "proto", a: 62, r: 145 },
  { id: "druid", form: "druid", kind: "modern", a: 64, r: 300, parent: "druwits" },
  { id: "vedas", form: "véda", gloss: "knowledge", lang: "Sanskrit", kind: "ancestor", a: 95, r: 155 },
  { id: "veda", form: "Veda", kind: "modern", a: 93, r: 290, parent: "vedas" },
  // the Unseen: ἀ- 'un-' + ϝιδ- 'seen', with the digamma dropped as in ἰδέα
  { id: "aides", form: "Ἀΐδης", gloss: "the Unseen", lang: "Greek", kind: "ancestor", a: 117, r: 205, dashed: true },
  { id: "hades", form: "Hades", kind: "modern", a: 117, r: 315, parent: "aides" },
];
