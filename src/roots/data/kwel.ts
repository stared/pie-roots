// *kʷel- 'to turn'. Data from root_trees.md (exploration tier).
// The layout is a wheel made of words alone. Four rings, EQUALLY spaced
// (radius 125 each): ring 1 — PIE formations and root-adjacent bases;
// ring 2 — first descendants; ring 3 — later intermediates; ring 4 —
// English words, evenly spread (~26°) around the rim (a chain with an
// extra step subdivides: poulie at 3.5).
// Limb philosophy: every branch is ONE STRAIGHT LINE from its fork to its
// rim-leaf; intermediate words sit ON that line at their ring radii (their
// angles below are the computed line–circle intersections, e.g. hwēol at
// −113.2 on the kwekwlom→wheel line). Forks sit on the bisector of their
// children, so every split is a symmetric V. Chains that never leave their
// arm's angle are plain radial spokes. Lines START at ring 1 — there are
// no spokes into the hub; the contested τῆλε and τέλος sit on ring 2 with
// a dashed stub reaching back to ring 1.
// gloss and lang are separate fields — the "gloss · language" line is
// composed at render time; Greek-script forms carry a translit rendered as
// a [ ] line tight under the word. Each node's labels are ONE tight block
// (word / [translit] / gloss), above the node by default or below with
// flip — including English words on the lower rim sitting OUTSIDE the
// wheel (pole, pulley).
// The two tele-'s are different Greek words (τέλος vs τῆλε) — adjacent so
// the split reads as deliberate, and the dek names it. cyclone's link is
// solid: only WHICH κύκλος-form was coined from is uncertain, not the
// family membership.

import type { WordNode } from "../types";

export interface TurnNode extends WordNode {
  a: number;
  d: number;
  /** small horizontal label nudge, so word gaps don't align with a ray */
  dx?: number;
  /** whole label stack below the node instead of above */
  flip?: boolean;
}

/** radius per ring */
export const RING = [0, 125, 250, 375, 500];

/** radius for a (possibly fractional) ring index */
export const ringR = (d: number): number => {
  const i = Math.min(Math.floor(d), RING.length - 2);
  return RING[i] + (RING[i + 1] - RING[i]) * (d - i);
};

export const TURN_NODES: TurnNode[] = [
  // the reduplicated 'turner-turner': the word says 'turn' twice.
  // Fan at the fork: Germanic −39°, Greek straight on, Sanskrit +39°;
  // the Greek line itself splits ±13° at κύκλος.
  { id: "kwekwlom", form: "*kʷe-kʷl-óm", gloss: "turn duplicated", lang: "PIE", kind: "proto", a: -78, d: 1, flip: true },
  { id: "hwehwla", form: "*hwehwlą", gloss: "wheel", lang: "Proto-Germanic", kind: "proto", a: -105.5, d: 2, parent: "kwekwlom", flip: true },
  { id: "hweol", form: "hwēol", gloss: "wheel", lang: "Old English", kind: "ancestor", a: -113.2, d: 3, parent: "hwehwla" },
  { id: "wheel", form: "wheel", kind: "modern", a: -117, d: 4, parent: "hweol" },
  { id: "kyklos", form: "κύκλος", gloss: "wheel, circle", lang: "Greek", translit: "kúklos", kind: "ancestor", a: -78, d: 2, parent: "kwekwlom" },
  { id: "cyclus", form: "cyclus", gloss: "circle, cycle", lang: "Late Latin", kind: "ancestor", a: -86.8, d: 3, parent: "kyklos" },
  { id: "cycle", form: "cycle", kind: "modern", a: -91, d: 4, parent: "cyclus" },
  { id: "cyclone", form: "cyclone", kind: "modern", a: -65, d: 4, parent: "kyklos" },
  { id: "cakra", form: "cakrá", gloss: "wheel", lang: "Sanskrit", kind: "ancestor", a: -50.5, d: 2, parent: "kwekwlom" },
  { id: "chakra", form: "chakra", kind: "modern", a: -39, d: 4, parent: "cakra" },

  // the single turn; πόλος splits ±13° into pole and pulley
  { id: "kwolo", form: "*kʷól(h₁)-o-", gloss: "the single turn", lang: "PIE", kind: "proto", a: 104, d: 1, flip: true },
  { id: "polos", form: "πόλος", gloss: "pivot", lang: "Greek", translit: "pólos", kind: "ancestor", a: 104, d: 2, parent: "kwolo", dx: -6 },
  { id: "polus", form: "polus", gloss: "pole; the heavens", lang: "Latin", kind: "ancestor", a: 95.2, d: 3, parent: "polos" },
  { id: "pole", form: "pole", kind: "modern", a: 91, d: 4, parent: "polus", flip: true },
  { id: "polidion", form: "*πολίδιον", gloss: "little pivot", lang: "Greek", translit: "polídion", kind: "proto", a: 112.8, d: 3, parent: "polos", dashed: true },
  { id: "poulie", form: "poulie", gloss: "pulley", lang: "Old French", kind: "ancestor", a: 115.2, d: 3.5, parent: "polidion", dashed: true },
  { id: "pulley", form: "pulley", kind: "modern", a: 117, d: 4, parent: "poulie", flip: true },

  // other formations; colere sits on the bisector of its ±13° split
  { id: "colere", form: "colere", gloss: "to till, dwell, worship", lang: "Latin", kind: "ancestor", a: 0, d: 1 },
  { id: "cultura", form: "cultūra", gloss: "tilling, cultivation", lang: "Latin", kind: "ancestor", a: -8.7, d: 2, parent: "colere" },
  { id: "culture", form: "culture", kind: "modern", a: -13, d: 4, parent: "cultura" },
  { id: "colonus", form: "colōnus", gloss: "settler", lang: "Latin", kind: "ancestor", a: 8.7, d: 2, parent: "colere", flip: true },
  { id: "colonia", form: "colōnia", gloss: "settlement", lang: "Latin", kind: "ancestor", a: 11.6, d: 3, parent: "colonus" },
  { id: "colony", form: "colony", kind: "modern", a: 13, d: 4, parent: "colonia" },
  { id: "palin", form: "πάλιν", gloss: "back again", lang: "Greek", translit: "pálin", kind: "ancestor", a: 184, d: 1, flip: true },
  { id: "palindromos", form: "παλίνδρομος", gloss: "running back again", lang: "Greek", translit: "palíndromos", kind: "ancestor", a: 184, d: 2, parent: "palin", flip: true },
  { id: "palindrome", form: "palindrome", kind: "modern", a: 184, d: 4, parent: "palindromos" },
  { id: "boukolos", form: "βουκόλος", gloss: "cowherd", lang: "Greek", translit: "boukólos", kind: "ancestor", a: 143, d: 1, flip: true },
  { id: "boukolikos", form: "βουκολικός", gloss: "pastoral", lang: "Greek", translit: "boukolikós", kind: "ancestor", a: 143, d: 2, parent: "boukolos" },
  { id: "bucolicus", form: "būcolicus", gloss: "pastoral", lang: "Latin", kind: "ancestor", a: 143, d: 3, parent: "boukolikos" },
  { id: "bucolic", form: "bucolic", kind: "modern", a: 143, d: 4, parent: "bucolicus" },

  // disputed — the two tele-'s side by side: two different Greek words
  { id: "tele", form: "τῆλε", gloss: "far", lang: "Greek", translit: "têle", kind: "ancestor", a: 39, d: 2, dashed: true },
  { id: "telephone", form: "telephone", kind: "modern", a: 39, d: 4, parent: "tele" },
  { id: "telos", form: "τέλος", gloss: "completion", lang: "Greek", translit: "télos", kind: "ancestor", a: 68, d: 2, dashed: true },
  { id: "teleologia", form: "teleologia", gloss: "study of ends", lang: "New Latin", kind: "ancestor", a: 68, d: 3, parent: "telos", dx: 8 },
  { id: "teleology", form: "teleology", kind: "modern", a: 68, d: 4, parent: "teleologia" },
  { id: "kwolso", form: "*kʷol-so-", gloss: "neck", lang: "PIE", kind: "proto", a: 215, d: 1, dashed: true, flip: true },
  { id: "collum", form: "collum", gloss: "neck", lang: "Latin", kind: "ancestor", a: 215, d: 2, parent: "kwolso", dashed: true },
  { id: "collare", form: "collāre", gloss: "neck-band", lang: "Late Latin", kind: "ancestor", a: 215, d: 3, parent: "collum" },
  { id: "collar", form: "collar", kind: "modern", a: 215, d: 4, parent: "collare" },
];
