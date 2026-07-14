// *kʷel- 'to turn'. Data from root_trees.md (exploration tier).
// The layout is a wheel made of words alone: the root at the hub, PIE
// formations on an inner ring, ancestors on a middle ring, English words on
// the outer ring. a = screen degrees; d = ring index (fractional allowed).
// gloss and lang are separate fields — the "gloss · language" line is
// composed at render time. The two tele-'s are different Greek words
// (τέλος vs τῆλε) — they sit adjacent so the split reads as deliberate,
// and the dek names it.

import type { WordNode } from "../types";

export interface TurnNode extends WordNode {
  a: number;
  d: number;
}

/** radius per ring */
export const RING = [0, 250, 470, 680];

/** radius for a (possibly fractional) ring index */
export const ringR = (d: number): number => {
  const i = Math.min(Math.floor(d), RING.length - 2);
  return RING[i] + (RING[i + 1] - RING[i]) * (d - i);
};

export const TURN_NODES: TurnNode[] = [
  // the reduplicated 'turner-turner': the word says 'turn' twice
  { id: "kwekwlom", form: "*kʷe-kʷl-óm", gloss: "the reduplicated turner-turner", lang: "PIE", kind: "proto", a: -90, d: 1 },
  { id: "hwehwla", form: "*hwehwlą", gloss: "wheel", lang: "Proto-Germanic", kind: "proto", a: -117, d: 2, parent: "kwekwlom" },
  { id: "hweol", form: "hwēol", gloss: "wheel", lang: "Old English", kind: "ancestor", a: -117, d: 2.5, parent: "hwehwla" },
  { id: "wheel", form: "wheel", kind: "modern", a: -117, d: 3, parent: "hweol" },
  { id: "kyklos", form: "κύκλος", gloss: "wheel, circle", lang: "Greek", kind: "ancestor", a: -88, d: 2, parent: "kwekwlom" },
  { id: "cyclus", form: "cyclus", gloss: "circle, cycle", lang: "Late Latin", kind: "ancestor", a: -94, d: 2.5, parent: "kyklos" },
  { id: "cycle", form: "cycle", kind: "modern", a: -97, d: 3, parent: "cyclus" },
  { id: "cyclone", form: "cyclone", kind: "modern", a: -79, d: 3, parent: "kyklos" },
  { id: "cakra", form: "cakrá", gloss: "wheel", lang: "Sanskrit", kind: "ancestor", a: -60, d: 2, parent: "kwekwlom" },
  { id: "chakra", form: "chakra", kind: "modern", a: -58, d: 3, parent: "cakra" },

  // the plain o-grade: one turn
  { id: "kwolo", form: "*kʷól(h₁)-o-", gloss: "the plain o-grade: one turn", lang: "PIE", kind: "proto", a: 96, d: 1 },
  { id: "polos", form: "πόλος", gloss: "pivot, axis", lang: "Greek", kind: "ancestor", a: 66, d: 2, parent: "kwolo" },
  { id: "polus", form: "polus", gloss: "celestial pole", lang: "Latin", kind: "ancestor", a: 60, d: 2.5, parent: "polos" },
  { id: "pole", form: "pole", kind: "modern", a: 58, d: 3, parent: "polus" },
  { id: "polidion", form: "*πολίδιον", gloss: "little pivot", lang: "Greek", kind: "proto", a: 74, d: 2.35, parent: "polos" },
  { id: "poulie", form: "poulie", gloss: "pulley", lang: "Old French", kind: "ancestor", a: 74, d: 2.7, parent: "polidion", dashed: true },
  { id: "pulley", form: "pulley", kind: "modern", a: 74, d: 3, parent: "poulie" },
  { id: "kolo", form: "koło", gloss: "wheel, circle", lang: "Polish", kind: "ancestor", a: 96, d: 2, parent: "kwolo" },
  { id: "kolej", form: "kolej", gloss: "wheel-rut → railway", lang: "Polish", kind: "ancestor", a: 114, d: 2.5, parent: "kolo" },

  // other formations
  { id: "colere", form: "colere", gloss: "to till, dwell, worship", lang: "Latin", kind: "ancestor", a: -22, d: 1 },
  { id: "cultura", form: "cultūra", gloss: "tilling, cultivation", lang: "Latin", kind: "ancestor", a: -30, d: 1.5, parent: "colere" },
  { id: "culture", form: "culture", kind: "modern", a: -30, d: 2, parent: "cultura" },
  { id: "colonia", form: "colōnia", gloss: "settlement", lang: "Latin", kind: "ancestor", a: -4.5, d: 1.6, parent: "colere" },
  { id: "colony", form: "colony", kind: "modern", a: -4.5, d: 2, parent: "colonia" },
  { id: "palin", form: "πάλιν", gloss: "back again", lang: "Greek", kind: "ancestor", a: 152, d: 1 },
  { id: "palindromos", form: "παλίνδρομος", gloss: "running back again", lang: "Greek", kind: "ancestor", a: 152, d: 1.5, parent: "palin" },
  { id: "palindrome", form: "palindrome", kind: "modern", a: 152, d: 2, parent: "palindromos" },
  { id: "boukolos", form: "βουκόλος", gloss: "cowherd", lang: "Greek", kind: "ancestor", a: 190, d: 1 },
  { id: "boukolikos", form: "βουκολικός", gloss: "pastoral", lang: "Greek", kind: "ancestor", a: 190, d: 1.5, parent: "boukolos" },
  { id: "bucolic", form: "bucolic", kind: "modern", a: 190, d: 2, parent: "boukolikos" },

  // disputed — the two tele-'s side by side: two different Greek words
  { id: "tele", form: "τῆλε", gloss: "far", lang: "Greek", kind: "ancestor", a: 8, d: 1, dashed: true },
  { id: "telephone", form: "telephone", kind: "modern", a: 8, d: 2, parent: "tele" },
  { id: "telos", form: "τέλος", gloss: "the turn of the course: completion", lang: "Greek", kind: "ancestor", a: 27, d: 1, dashed: true },
  { id: "teleologia", form: "teleologia", gloss: "study of ends", lang: "New Latin", kind: "ancestor", a: 27, d: 1.5, parent: "telos" },
  { id: "teleology", form: "teleology", kind: "modern", a: 27, d: 2, parent: "teleologia" },
  { id: "kwolso", form: "*kʷol-so-", gloss: "the neck — what the head turns on", lang: "PIE", kind: "proto", a: 217, d: 1, dashed: true },
  { id: "collum", form: "collum", gloss: "neck", lang: "Latin", kind: "ancestor", a: 217, d: 2, parent: "kwolso" },
  { id: "collare", form: "collāre", gloss: "neck-band", lang: "Late Latin", kind: "ancestor", a: 217, d: 2.5, parent: "collum" },
  { id: "collar", form: "collar", kind: "modern", a: 217, d: 3, parent: "collare" },
];
