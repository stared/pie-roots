// *bʰeh₂- 'to speak'. Data from root_trees.md (exploration tier).
// A fan rippling out from the root: a = fan angle in degrees, g = generation
// (radius index). One word per node; linking forms are intermediate NODES,
// not footnotes; dashed links alone mark disputed steps. Its homophone
// *bʰeh₂- 'to shine' (phase, photo-, phantom, beacon) is a different root —
// the dek mentions it.

export interface RippleNode {
  id: string;
  form: string;
  /** gloss · language of this form — non-English forms only */
  note?: string;
  kind: "ancestor" | "proto" | "modern";
  a: number;
  g: number;
  parent?: string;
  dashed?: boolean;
}

/** radius per generation, tuned */
export const GEN = [0, 215, 395, 575, 765, 965, 1175, 1380];

export const RIPPLE_NODES: RippleNode[] = [
  // Greek arm (upper): speech as sound
  { id: "phemi", form: "φημί", note: "I say · Greek", kind: "ancestor", a: -29, g: 1 },
  { id: "phone", form: "φωνή", note: "voice, sound · Greek", kind: "ancestor", a: -22, g: 2, parent: "phemi" },
  { id: "blasphemos", form: "βλάσφημος", note: "evil-speaking · Greek", kind: "ancestor", a: -40, g: 2, parent: "phemi" },
  { id: "phasis", form: "φάσις", note: "utterance · Greek", kind: "ancestor", a: -33, g: 2, parent: "phemi" },
  { id: "prophet", form: "prophet", kind: "modern", a: -44, g: 3, parent: "phemi" },
  { id: "euphemism", form: "euphemism", kind: "modern", a: -36.5, g: 4, parent: "phemi" },
  { id: "aphasia", form: "aphasia", kind: "modern", a: -32, g: 3, parent: "phasis" },
  { id: "blasphemare", form: "blasphēmāre", note: "Late Latin", kind: "ancestor", a: -40, g: 3, parent: "blasphemos" },
  { id: "blasmer", form: "blasmer", note: "Old French", kind: "ancestor", a: -40, g: 4, parent: "blasphemare" },
  { id: "blame", form: "blame", kind: "modern", a: -40.5, g: 5, parent: "blasmer" },
  { id: "phones", form: "phone", kind: "modern", a: -27.5, g: 3, parent: "phone" },
  { id: "symphony", form: "symphony", kind: "modern", a: -15, g: 4, parent: "phone" },
  { id: "antiphona", form: "antiphona", note: "answering voices · Late Latin", kind: "ancestor", a: -21.5, g: 3, parent: "phone" },
  { id: "antefn", form: "antefn", note: "Old English", kind: "ancestor", a: -21.5, g: 4, parent: "antiphona" },
  { id: "anthem", form: "anthem", kind: "modern", a: -22, g: 5, parent: "antefn" },

  // Latin arm (middle): speech as destiny and law
  { id: "fari", form: "fārī", note: "to speak · Latin", kind: "ancestor", a: 1, g: 1 },
  { id: "fatum", form: "fātum", note: "the thing spoken; destiny · Latin", kind: "ancestor", a: -11, g: 2, parent: "fari" },
  { id: "fate", form: "fate", kind: "modern", a: -13.5, g: 3, parent: "fatum" },
  { id: "fata", form: "Fāta", note: "the Fates · Late Latin", kind: "ancestor", a: -9, g: 3, parent: "fatum" },
  { id: "fae", form: "fae", note: "Old French", kind: "ancestor", a: -9, g: 4, parent: "fata" },
  { id: "fairy", form: "fairy", kind: "modern", a: -9, g: 5, parent: "fae" },
  { id: "fama", form: "fāma", note: "what is said of you · Latin", kind: "ancestor", a: -4.5, g: 2, parent: "fari" },
  { id: "fame", form: "fame", kind: "modern", a: -5, g: 3, parent: "fama" },
  { id: "infans", form: "īnfāns", note: "the non-speaker · Latin", kind: "ancestor", a: 2.5, g: 2, parent: "fari" },
  { id: "infant", form: "infant", kind: "modern", a: 0, g: 3, parent: "infans" },
  { id: "infanteria", form: "infanteria", note: "the youths · Italian", kind: "ancestor", a: 6, g: 4, parent: "infans" },
  { id: "infantry", form: "infantry", kind: "modern", a: 6, g: 5, parent: "infanteria" },
  { id: "fabula", form: "fābula", note: "a thing told · Latin", kind: "ancestor", a: 10, g: 2, parent: "fari" },
  { id: "fable", form: "fable", kind: "modern", a: 9, g: 3, parent: "fabula" },
  { id: "preface", form: "preface", kind: "modern", a: 10.5, g: 4, parent: "fari" },
  { id: "fas", form: "fās", note: "what may be spoken · Latin", kind: "ancestor", a: 14.5, g: 2.25, parent: "fari" },
  { id: "nefarious", form: "nefarious", kind: "modern", a: 15.5, g: 3.35, parent: "fas" },
  { id: "ineffabilis", form: "ineffābilis", note: "unsayable · Latin", kind: "ancestor", a: 11, g: 3.1, parent: "fari" },
  { id: "ineffable", form: "ineffable", kind: "modern", a: 11, g: 4.6, parent: "ineffabilis" },
  { id: "fateri", form: "fatērī", note: "to avow · Latin", kind: "ancestor", a: 19, g: 2.7, parent: "fari", dashed: true },
  { id: "confess", form: "confess", kind: "modern", a: 19, g: 4.5, parent: "fateri" },

  // Germanic arm (lower): speech as command
  { id: "bannana", form: "*bannaną", note: "to proclaim · Proto-Germanic", kind: "proto", a: 32, g: 1 },
  { id: "bannan", form: "bannan", note: "Old English", kind: "ancestor", a: 24, g: 2, parent: "bannana" },
  { id: "ban", form: "ban", kind: "modern", a: 22.5, g: 3, parent: "bannan" },
  { id: "bannjan", form: "*bannjan", note: "Frankish", kind: "proto", a: 33, g: 2, parent: "bannana" },
  { id: "banof", form: "ban", note: "feudal jurisdiction · Old French", kind: "ancestor", a: 33, g: 3, parent: "bannjan" },
  { id: "banal", form: "banal", kind: "modern", a: 29, g: 4, parent: "banof" },
  { id: "bandon", form: "bandon", note: "a bandon ‘at one’s mercy’ · Old French", kind: "ancestor", a: 32.5, g: 4, parent: "banof" },
  { id: "abandon", form: "abandon", kind: "modern", a: 32.5, g: 5, parent: "bandon" },
  { id: "banish", form: "banish", kind: "modern", a: 38, g: 4, parent: "banof" },
  { id: "bannum", form: "bannum", note: "Medieval Latin ← Germanic", kind: "ancestor", a: 39.5, g: 3, parent: "bannana" },
  { id: "bando", form: "bando", note: "Italian", kind: "ancestor", a: 41, g: 4, parent: "bannum" },
  { id: "contrabbando", form: "contrabbando", note: "against the ban · Italian", kind: "ancestor", a: 41, g: 4.4, parent: "bando" },
  { id: "contraband", form: "contraband", kind: "modern", a: 41, g: 5.4, parent: "contrabbando" },
  { id: "bandito", form: "bandito", note: "proclaimed, outlawed · Italian", kind: "ancestor", a: 47, g: 4.5, parent: "bando", dashed: true },
  { id: "bandit", form: "bandit", kind: "modern", a: 47, g: 5.3, parent: "bandito" },
  { id: "boniz", form: "*bōniz", note: "a spoken plea · Proto-Germanic", kind: "proto", a: 45, g: 1 },
  { id: "bon", form: "bón", note: "prayer · Old Norse", kind: "ancestor", a: 45, g: 2, parent: "boniz" },
  { id: "boon", form: "boon", kind: "modern", a: 45, g: 3, parent: "bon" },
];

/** branches that die before English: label · position */
export const STUBS: { text: string; a: number; g: number }[] = [
  { text: "ban ‘word’ · Old Armenian", a: -56, g: 1.6 },
  { text: "basnь ‘fable, spell’ · Proto-Slavic", a: -63, g: 1.3 },
  { text: "bhāṣā ‘language’ · Sanskrit", a: -49, g: 1.1 },
];
