// *kʷel- 'to turn'. Data from root_trees.md (exploration tier).
// The layout is a wheel made of words alone. Rings, from hub outward:
//   ring 1 — PIE formations and root-adjacent bases (the start of every arm)
//   ring 2 — first descendants
//   ring 3 — later intermediates
//   ring 4 — English words, evenly spread (~26°) around the rim
// A chain steps outward one ring per word; the English word is always on
// ring 4 — a chain with a missing step stretches that segment across the
// skipped ring (cultura → culture), a chain with an extra step subdivides
// evenly (poulie at 3.5).
// Bend philosophy: every segment is straight and chains bend ONLY at nodes.
// At a fork, the parent sits on the bisector of its children and both leave
// at the same angle (symmetric V); a branch adopts its leaf's angle at its
// first node after the fork and runs dead radial from there; a leaf with no
// node after the fork (cyclone, chakra) connects with one straight diagonal.
// gloss and lang are separate fields — the "gloss · language" line is
// composed at render time; Greek-script forms carry a translit rendered as
// a [ ] line tight under the word. The two tele-'s are different Greek words
// (τέλος vs τῆλε) — they sit adjacent so the split reads as deliberate, and
// the dek names it. cyclone's link is solid: only WHICH κύκλος-form was
// coined from is uncertain, not the family membership.

import type { WordNode } from "../types";

export interface TurnNode extends WordNode {
  a: number;
  d: number;
  /** small horizontal label nudge, so word gaps don't align with a ray */
  dx?: number;
  /** gloss line above the node — for shallow descending rays that would strike a below-note */
  noteUp?: boolean;
}

/** radius per ring */
export const RING = [0, 250, 375, 500, 625];

/** radius for a (possibly fractional) ring index */
export const ringR = (d: number): number => {
  const i = Math.min(Math.floor(d), RING.length - 2);
  return RING[i] + (RING[i + 1] - RING[i]) * (d - i);
};

export const TURN_NODES: TurnNode[] = [
  // the reduplicated 'turner-turner': the word says 'turn' twice.
  // Fan at the fork: Germanic −39°, Greek straight on, Sanskrit +39°;
  // the Greek line itself splits ±13° at κύκλος.
  { id: "kwekwlom", form: "*kʷe-kʷl-óm", gloss: "the reduplicated turner-turner", lang: "PIE", kind: "proto", a: -78, d: 1 },
  { id: "hwehwla", form: "*hwehwlą", gloss: "wheel", lang: "Proto-Germanic", kind: "proto", a: -117, d: 2, parent: "kwekwlom" },
  { id: "hweol", form: "hwēol", gloss: "wheel", lang: "Old English", kind: "ancestor", a: -117, d: 3, parent: "hwehwla" },
  { id: "wheel", form: "wheel", kind: "modern", a: -117, d: 4, parent: "hweol" },
  { id: "kyklos", form: "κύκλος", gloss: "wheel, circle", lang: "Greek", translit: "kúklos", kind: "ancestor", a: -78, d: 2, parent: "kwekwlom" },
  { id: "cyclus", form: "cyclus", gloss: "circle, cycle", lang: "Late Latin", kind: "ancestor", a: -91, d: 3, parent: "kyklos", dx: -12 },
  { id: "cycle", form: "cycle", kind: "modern", a: -91, d: 4, parent: "cyclus" },
  { id: "cyclone", form: "cyclone", kind: "modern", a: -65, d: 4, parent: "kyklos" },
  { id: "cakra", form: "cakrá", gloss: "wheel", lang: "Sanskrit", kind: "ancestor", a: -39, d: 2, parent: "kwekwlom" },
  { id: "chakra", form: "chakra", kind: "modern", a: -39, d: 4, parent: "cakra" },

  // the single turn; πόλος splits ±13° into pole and pulley
  { id: "kwolo", form: "*kʷól(h₁)-o-", gloss: "the single turn", lang: "PIE", kind: "proto", a: 104, d: 1, dx: 6 },
  { id: "polos", form: "πόλος", gloss: "pivot", lang: "Greek", translit: "pólos", kind: "ancestor", a: 104, d: 2, parent: "kwolo" },
  { id: "polus", form: "polus", gloss: "pole; the heavens", lang: "Latin", kind: "ancestor", a: 91, d: 3, parent: "polos", dx: 8 },
  { id: "pole", form: "pole", kind: "modern", a: 91, d: 4, parent: "polus" },
  { id: "polidion", form: "*πολίδιον", gloss: "little pivot", lang: "Greek", translit: "polídion", kind: "proto", a: 117, d: 3, parent: "polos", dashed: true, dx: -15 },
  { id: "poulie", form: "poulie", gloss: "pulley", lang: "Old French", kind: "ancestor", a: 117, d: 3.5, parent: "polidion", dashed: true },
  { id: "pulley", form: "pulley", kind: "modern", a: 117, d: 4, parent: "poulie" },

  // other formations; colere sits on the bisector of its ±13° split
  { id: "colere", form: "colere", gloss: "to till, dwell, worship", lang: "Latin", kind: "ancestor", a: 0, d: 1, dx: -9 },
  { id: "cultura", form: "cultūra", gloss: "tilling, cultivation", lang: "Latin", kind: "ancestor", a: -13, d: 2, parent: "colere" },
  { id: "culture", form: "culture", kind: "modern", a: -13, d: 4, parent: "cultura" },
  { id: "colonus", form: "colōnus", gloss: "settler", lang: "Latin", kind: "ancestor", a: 13, d: 2, parent: "colere", noteUp: true },
  { id: "colonia", form: "colōnia", gloss: "settlement", lang: "Latin", kind: "ancestor", a: 13, d: 3, parent: "colonus", noteUp: true },
  { id: "colony", form: "colony", kind: "modern", a: 13, d: 4, parent: "colonia" },
  { id: "palin", form: "πάλιν", gloss: "back again", lang: "Greek", translit: "pálin", kind: "ancestor", a: 143, d: 1 },
  { id: "palindromos", form: "παλίνδρομος", gloss: "running back again", lang: "Greek", translit: "palíndromos", kind: "ancestor", a: 143, d: 2, parent: "palin" },
  { id: "palindrome", form: "palindrome", kind: "modern", a: 143, d: 4, parent: "palindromos" },
  { id: "boukolos", form: "βουκόλος", gloss: "cowherd", lang: "Greek", translit: "boukólos", kind: "ancestor", a: 184, d: 1 },
  { id: "boukolikos", form: "βουκολικός", gloss: "pastoral", lang: "Greek", translit: "boukolikós", kind: "ancestor", a: 184, d: 2, parent: "boukolos" },
  { id: "bucolicus", form: "būcolicus", gloss: "pastoral", lang: "Latin", kind: "ancestor", a: 184, d: 3, parent: "boukolikos" },
  { id: "bucolic", form: "bucolic", kind: "modern", a: 184, d: 4, parent: "bucolicus" },

  // disputed — the two tele-'s side by side: two different Greek words
  { id: "tele", form: "τῆλε", gloss: "far", lang: "Greek", translit: "têle", kind: "ancestor", a: 39, d: 1, dashed: true, dx: 6 },
  { id: "telephone", form: "telephone", kind: "modern", a: 39, d: 4, parent: "tele" },
  { id: "telos", form: "τέλος", gloss: "completion", lang: "Greek", translit: "télos", kind: "ancestor", a: 68, d: 1, dashed: true, dx: -16 },
  { id: "teleologia", form: "teleologia", gloss: "study of ends", lang: "New Latin", kind: "ancestor", a: 68, d: 3, parent: "telos", dx: -14 },
  { id: "teleology", form: "teleology", kind: "modern", a: 68, d: 4, parent: "teleologia" },
  { id: "kwolso", form: "*kʷol-so-", gloss: "the neck — what the head turns on", lang: "PIE", kind: "proto", a: 215, d: 1, dashed: true },
  { id: "collum", form: "collum", gloss: "neck", lang: "Latin", kind: "ancestor", a: 215, d: 2, parent: "kwolso", dashed: true },
  { id: "collare", form: "collāre", gloss: "neck-band", lang: "Late Latin", kind: "ancestor", a: 215, d: 3, parent: "collum" },
  { id: "collar", form: "collar", kind: "modern", a: 215, d: 4, parent: "collare" },
];
