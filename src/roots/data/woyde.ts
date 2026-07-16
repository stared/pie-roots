// *weyd- again, knowing side: the perfect *wóyde 'to have seen' means 'to
// know', and the words where knowing stayed secret — seers, witches,
// phantoms, sacred knowledge. Data from root_trees.md (exploration tier).
// One word per node; linking forms are intermediate NODES. gloss and lang
// are separate fields — the "gloss · language" line is composed at render
// time. Polish words are first-class leaves (kind "modern" with gloss and
// lang). Angles/radii hand-tuned; off-ray chains are lerped collinear.

import type { WordNode } from "../types";

export interface KnowNode extends WordNode {
  a: number;
  r: number;
  /** force the label to the other side of the node */
  flip?: boolean;
  /** label sits left of the node, clear of a rightward ray */
  labelLeft?: boolean;
  /** label sits right of the node, clear of a leftward ray */
  labelRight?: boolean;
  /** small horizontal label nudge */
  dx?: number;
}

export const KNOW_NODES: KnowNode[] = [
  // Slavic arm (right): the seeing verb and the knowing verb, one letter apart
  { id: "videti", form: "*vìděti", gloss: "to see", lang: "Proto-Slavic", kind: "proto", a: -46.4, r: 165 },
  { id: "widziec", form: "widzieć", gloss: "to see", lang: "Polish", kind: "modern", a: -46.4, r: 300, parent: "videti" },
  { id: "widmo", form: "widmo", gloss: "spectre; spectrum", lang: "Polish", kind: "modern", a: -46.4, r: 450, parent: "widziec" },
  { id: "woyde", form: "*wóyde", gloss: "to have seen, to know", lang: "PIE", kind: "proto", a: -8.5, r: 118 },
  { id: "vedeti", form: "*vě̀děti", gloss: "to know; to foresee", lang: "Proto-Slavic", kind: "proto", a: -8.5, r: 255, parent: "woyde", labelLeft: true, flip: true },
  { id: "vedja", form: "*věďa", gloss: "knowledge", lang: "Proto-Slavic", kind: "proto", a: -20.5, r: 345.6, parent: "vedeti" },
  { id: "wiedza", form: "wiedza", gloss: "knowledge", lang: "Polish", kind: "modern", a: -27.4, r: 445, parent: "vedja" },
  { id: "vesc", form: "*věščь", gloss: "oracular, skilled", lang: "Proto-Slavic", kind: "proto", a: -8.5, r: 345, parent: "vedeti", dx: 45 },
  { id: "wieszcz", form: "wieszcz", gloss: "poet-prophet", lang: "Polish", kind: "modern", a: -8.5, r: 448, parent: "vesc", flip: true },
  { id: "vedma", form: "*vědьma", gloss: "witch", lang: "Proto-Slavic", kind: "proto", a: 3.6, r: 347.0, parent: "vedeti" },
  { id: "wiedzma", form: "wiedźma", gloss: "witch", lang: "Polish", kind: "modern", a: 10.5, r: 448, parent: "vedma" },

  // Germanic arm (lower right): the wise ones
  { id: "wisaz", form: "*wīsaz", gloss: "knowing", lang: "Proto-Germanic", kind: "proto", a: 39, r: 190, labelRight: true, flip: true },
  { id: "wis", form: "wīs", gloss: "wise", lang: "Old English", kind: "ancestor", a: 39, r: 265, parent: "wisaz", labelRight: true, flip: true },
  { id: "wys", form: "wys", gloss: "wise", lang: "Middle English", kind: "ancestor", a: 33.0, r: 355.3, parent: "wis", dx: -10 },
  { id: "wizard", form: "wizard", kind: "modern", a: 29.4, r: 448, parent: "wys" },
  { id: "wisdomoe", form: "wīsdōm", gloss: "wisdom", lang: "Old English", kind: "ancestor", a: 46.5, r: 388.0, parent: "wis", labelLeft: true },
  { id: "wisdom", form: "wisdom", kind: "modern", a: 48.4, r: 442, parent: "wisdomoe" },
  // the soothsayer word: only one witness ties *wītagō back to the root
  { id: "witago", form: "*wītagō", gloss: "wise one; prophet", lang: "Proto-West Germanic", kind: "proto", a: 67.3, r: 200, dashed: true, dx: 25 },
  { id: "wizzago", form: "wīzago", gloss: "prophet", lang: "Old High German", kind: "ancestor", a: 67.3, r: 272, parent: "witago", dx: 22 },
  { id: "wijssegger", form: "wijssegger", gloss: "soothsayer", lang: "Middle Dutch", kind: "ancestor", a: 67.3, r: 355, parent: "wizzago", dx: 18 },
  { id: "wiseacre", form: "wiseacre", kind: "modern", a: 67.3, r: 448, parent: "wijssegger" },

  // Celtic (bottom): the strong knower
  { id: "druwits", form: "*dru-wits", gloss: "strong knower", lang: "Proto-Celtic", kind: "proto", a: 86.3, r: 150, dx: 20 },
  { id: "druides", form: "Druidae", gloss: "the druids", lang: "Latin", kind: "ancestor", a: 86.3, r: 275, parent: "druwits", dx: 18 },
  { id: "druide", form: "druide", gloss: "druid", lang: "French", kind: "ancestor", a: 86.3, r: 362, parent: "druides", dx: 15 },
  { id: "druid", form: "druid", kind: "modern", a: 86.3, r: 445, parent: "druide" },

  // Indic arm (lower left): knowledge as scripture and spell
  { id: "vidya", form: "vidyā", gloss: "knowledge; spell, incantation", lang: "Sanskrit", kind: "ancestor", a: 105.2, r: 430 },
  { id: "vedaskt", form: "véda", gloss: "knowledge", lang: "Sanskrit", kind: "ancestor", a: 133, r: 215 },
  { id: "veda", form: "Veda", kind: "modern", a: 124.2, r: 435, parent: "vedaskt" },
  { id: "ayurvedaskt", form: "āyurveda", gloss: "science of life", lang: "Sanskrit", kind: "ancestor", a: 140.2, r: 340.4, parent: "vedaskt" },
  { id: "ayurveda", form: "Ayurveda", kind: "modern", a: 143.1, r: 445, parent: "ayurvedaskt" },

  // Latin arm (left): the far-seers
  { id: "video", form: "vidēre", gloss: "to see", lang: "Latin", kind: "ancestor", a: -172, r: 120 },
  { id: "providere", form: "prōvidēre", gloss: "to foresee", lang: "Latin", kind: "ancestor", a: 171.2, r: 222.0, parent: "video" },
  { id: "providentia", form: "prōvidentia", gloss: "foresight", lang: "Latin", kind: "ancestor", a: 165.1, r: 334.2, parent: "providere" },
  { id: "providence", form: "Providence", kind: "modern", a: 162.1, r: 445, parent: "providentia" },
  { id: "veoir", form: "veoir", gloss: "to see", lang: "Old French", kind: "ancestor", a: -170.2, r: 210.0, parent: "video" },
  { id: "voir", form: "voir", gloss: "to see", lang: "French", kind: "ancestor", a: -169.5, r: 300, parent: "veoir" },
  { id: "vu", form: "vu", gloss: "seen", lang: "French", kind: "ancestor", a: -175.2, r: 372.8, parent: "voir" },
  { id: "dejavu", form: "déjà vu", kind: "modern", a: -179.0, r: 448, parent: "vu" },
  { id: "voyant", form: "voyant", gloss: "seeing", lang: "French", kind: "ancestor", a: -163.8, r: 374.8, parent: "voir" },
  { id: "clairvoyant", form: "clairvoyant", kind: "modern", a: -160.1, r: 452, parent: "voyant" },
  { id: "visus", form: "vīsus", gloss: "a seeing", lang: "Latin", kind: "ancestor", a: -151.2, r: 228.7, parent: "video" },
  { id: "visio", form: "vīsiō", gloss: "sight", lang: "Latin", kind: "ancestor", a: -144.4, r: 340.9, parent: "visus" },
  { id: "vision", form: "vision", kind: "modern", a: -141.1, r: 452, parent: "visio" },

  // Greek arm (upper left): forms, phantoms, the Unseen
  { id: "ideagr", form: "ἰδέα", gloss: "form, pattern", lang: "Greek", kind: "ancestor", a: -122.2, r: 195 },
  { id: "ideala", form: "idea", gloss: "archetype", lang: "Latin", kind: "ancestor", a: -122.2, r: 315, parent: "ideagr" },
  { id: "idea", form: "idea", kind: "modern", a: -122.2, r: 445, parent: "ideala" },
  { id: "eidos", form: "εἶδος", gloss: "form, appearance", lang: "Greek", kind: "ancestor", a: -94, r: 118 },
  { id: "eidolongr", form: "εἴδωλον", gloss: "image, phantom", lang: "Greek", kind: "ancestor", a: -94, r: 238, parent: "eidos" },
  { id: "idolum", form: "īdōlum", gloss: "image, idol", lang: "Latin", kind: "ancestor", a: -99.1, r: 320.6, parent: "eidolongr" },
  { id: "idole", form: "idole", gloss: "idol", lang: "Old French", kind: "ancestor", a: -101.6, r: 387.8, parent: "idolum" },
  { id: "idol", form: "idol", kind: "modern", a: -103.2, r: 447, parent: "idole" },
  { id: "eidolon", form: "eidolon", kind: "modern", a: -84.3, r: 430, parent: "eidolongr" },
  // the Unseen: ἀ- 'un-' + ϝιδ- 'seen', with the digamma dropped as in ἰδέα
  { id: "aides", form: "Ἀΐδης", gloss: "the Unseen", lang: "Greek", kind: "ancestor", a: -65.3, r: 310, dashed: true },
  { id: "hades", form: "Hades", kind: "modern", a: -65.3, r: 445, parent: "aides" },
];
