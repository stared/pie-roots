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
  { id: "wheel", form: "wheel", kind: "modern", a: -117, d: 3, parent: "hwehwla" },
  { id: "kyklos", form: "κύκλος", gloss: "wheel, circle", lang: "Greek", kind: "ancestor", a: -88, d: 2, parent: "kwekwlom" },
  { id: "cycle", form: "cycle", kind: "modern", a: -97, d: 3, parent: "kyklos" },
  { id: "cyclone", form: "cyclone", kind: "modern", a: -79, d: 3, parent: "kyklos" },
  { id: "cakra", form: "cakrá", gloss: "wheel", lang: "Sanskrit", kind: "ancestor", a: -60, d: 2, parent: "kwekwlom" },
  { id: "chakra", form: "chakra", kind: "modern", a: -58, d: 3, parent: "cakra" },

  // the plain o-grade: one turn
  { id: "kwolo", form: "*kʷól(h₁)-o-", gloss: "the plain o-grade: one turn", lang: "PIE", kind: "proto", a: 96, d: 1 },
  { id: "polos", form: "πόλος", gloss: "pivot, axis", lang: "Greek", kind: "ancestor", a: 66, d: 2, parent: "kwolo" },
  { id: "pole", form: "pole", kind: "modern", a: 58, d: 3, parent: "polos" },
  { id: "polidion", form: "*πολίδιον", gloss: "little pivot", lang: "Greek", kind: "proto", a: 74, d: 2.5, parent: "polos" },
  { id: "pulley", form: "pulley", kind: "modern", a: 74, d: 3, parent: "polidion", dashed: true },
  { id: "kolo", form: "koło", gloss: "wheel, circle", lang: "Polish", kind: "ancestor", a: 96, d: 2, parent: "kwolo" },
  { id: "kolej", form: "kolej", gloss: "wheel-rut → railway", lang: "Polish", kind: "ancestor", a: 114, d: 2.5, parent: "kolo" },

  // other formations
  { id: "colere", form: "colere", gloss: "to till, dwell, worship", lang: "Latin", kind: "ancestor", a: -22, d: 1 },
  { id: "culture", form: "culture", kind: "modern", a: -30, d: 2, parent: "colere" },
  { id: "colony", form: "colony", kind: "modern", a: -12, d: 2, parent: "colere" },
  { id: "palin", form: "πάλιν", gloss: "back again", lang: "Greek", kind: "ancestor", a: 152, d: 1 },
  { id: "palindrome", form: "palindrome", kind: "modern", a: 152, d: 2, parent: "palin" },
  { id: "boukolos", form: "βουκόλος", gloss: "cowherd", lang: "Greek", kind: "ancestor", a: 190, d: 1 },
  { id: "bucolic", form: "bucolic", kind: "modern", a: 190, d: 2, parent: "boukolos" },

  // disputed — the two tele-'s side by side: two different Greek words
  { id: "tele", form: "τῆλε", gloss: "far", lang: "Greek", kind: "ancestor", a: 8, d: 1, dashed: true },
  { id: "telephone", form: "telephone", kind: "modern", a: 8, d: 2, parent: "tele" },
  { id: "telos", form: "τέλος", gloss: "the turn of the course: completion", lang: "Greek", kind: "ancestor", a: 27, d: 1, dashed: true },
  { id: "teleology", form: "teleology", kind: "modern", a: 27, d: 2, parent: "telos" },
  { id: "kwolso", form: "*kʷol-so-", gloss: "the neck — what the head turns on", lang: "PIE", kind: "proto", a: 217, d: 1, dashed: true },
  { id: "collum", form: "collum", gloss: "neck", lang: "Latin", kind: "ancestor", a: 217, d: 2, parent: "kwolso" },
  { id: "collar", form: "collar", kind: "modern", a: 217, d: 3, parent: "collum" },
];
