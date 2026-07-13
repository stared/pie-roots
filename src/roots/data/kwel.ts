// *kʷel- 'to turn'. Data from root_trees.md (exploration tier).
// The layout is a wheel made of words alone: the root at the hub, PIE
// formations on an inner ring, ancestors on a middle ring, English words on
// the outer ring. a = screen degrees; d = ring index.

export interface TurnNode {
  id: string;
  form: string;
  /** gloss · language — non-English forms only */
  note?: string;
  kind: "proto" | "ancestor" | "modern";
  a: number;
  d: 1 | 2 | 3;
  parent?: string;
  dashed?: boolean;
}

/** radius per ring */
export const RING = [0, 250, 470, 680];

export const TURN_NODES: TurnNode[] = [
  // the reduplicated 'turner-turner': the word says 'turn' twice
  { id: "kwekwlom", form: "*kʷe-kʷl-óm", note: "the reduplicated turner-turner · PIE", kind: "proto", a: -90, d: 1 },
  { id: "hwehwla", form: "*hwehwlą", note: "Proto-Germanic", kind: "proto", a: -117, d: 2, parent: "kwekwlom" },
  { id: "wheel", form: "wheel", kind: "modern", a: -117, d: 3, parent: "hwehwla" },
  { id: "kyklos", form: "κύκλος", note: "wheel, circle · Greek", kind: "ancestor", a: -88, d: 2, parent: "kwekwlom" },
  { id: "cycle", form: "cycle", kind: "modern", a: -97, d: 3, parent: "kyklos" },
  { id: "cyclone", form: "cyclone", kind: "modern", a: -79, d: 3, parent: "kyklos" },
  { id: "cakra", form: "cakrá", note: "wheel · Sanskrit", kind: "ancestor", a: -60, d: 2, parent: "kwekwlom" },
  { id: "chakra", form: "chakra", kind: "modern", a: -58, d: 3, parent: "cakra" },

  // the plain o-grade: one turn
  { id: "kwolo", form: "*kʷól(h₁)-o-", note: "the plain o-grade: one turn · PIE", kind: "proto", a: 96, d: 1 },
  { id: "polos", form: "πόλος", note: "pivot, axis · Greek", kind: "ancestor", a: 66, d: 2, parent: "kwolo" },
  { id: "pole", form: "pole", kind: "modern", a: 58, d: 3, parent: "polos" },
  { id: "pulley", form: "pulley", kind: "modern", a: 74, d: 3, parent: "polos" },
  { id: "kolo", form: "koło", note: "wheel, circle · Polish", kind: "ancestor", a: 96, d: 2, parent: "kwolo" },
  { id: "kolej", form: "kolej", note: "wheel-track → railway · Polish", kind: "ancestor", a: 114, d: 2, parent: "kwolo" },

  // other formations
  { id: "colere", form: "colere", note: "to till, dwell, worship · Latin", kind: "ancestor", a: -22, d: 1 },
  { id: "culture", form: "culture", kind: "modern", a: -30, d: 2, parent: "colere" },
  { id: "colony", form: "colony", kind: "modern", a: -12, d: 2, parent: "colere" },
  { id: "palin", form: "πάλιν", note: "back again · Greek", kind: "ancestor", a: 152, d: 1 },
  { id: "palindrome", form: "palindrome", kind: "modern", a: 152, d: 2, parent: "palin" },
  { id: "boukolos", form: "βουκόλος", note: "cattle-mover · Greek", kind: "ancestor", a: 190, d: 1 },
  { id: "bucolic", form: "bucolic", kind: "modern", a: 190, d: 2, parent: "boukolos" },

  // disputed
  { id: "kwolso", form: "*kʷol-so-", note: "the neck: what the head turns on? · PIE", kind: "proto", a: 217, d: 1, dashed: true },
  { id: "collar", form: "collar", kind: "modern", a: 217, d: 2, parent: "kwolso", dashed: true },
  { id: "telos", form: "τέλος", note: "the turn of the course → completion? · Greek", kind: "ancestor", a: 27, d: 1, dashed: true },
  { id: "teleology", form: "teleology", kind: "modern", a: 27, d: 2, parent: "telos", dashed: true },
  { id: "tele", form: "τῆλε", note: "far — a locative of the turning root? · Greek", kind: "ancestor", a: -43, d: 1, dashed: true },
  { id: "telephone", form: "telephone", kind: "modern", a: -47, d: 2, parent: "tele", dashed: true },
];
