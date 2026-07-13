// *bʰeh₂- 'to speak'. Data from root_trees.md (exploration tier).
// A fan rippling out from the root: a = fan angle in degrees, g = generation
// (radius index, fractional allowed). One word per node; linking forms are
// intermediate NODES, not footnotes; dashed links alone mark disputed steps.
// gloss and lang are separate fields — the "gloss · language" line is
// composed at render time. Its homophone *bʰeh₂- 'to shine' (phase, photo-,
// phantom, beacon) is a different root — the dek mentions it.

import type { WordNode } from "../types";

export interface RippleNode extends WordNode {
  a: number;
  g: number;
}

/** radius per generation, tuned */
export const GEN = [0, 215, 395, 575, 765, 965, 1175, 1380];

export const RIPPLE_NODES: RippleNode[] = [
  // Greek arm (upper): speech as sound
  { id: "phemi", form: "φημί", gloss: "I say", lang: "Greek", kind: "ancestor", a: -29, g: 1 },
  // φωνή is formed on the root itself (o-grade *bʰoh₂-néh₂), a sibling of φημί
  { id: "phone", form: "φωνή", gloss: "voice, sound", lang: "Greek", kind: "ancestor", a: -22, g: 2 },
  { id: "blasphemos", form: "βλάσφημος", gloss: "evil-speaking", lang: "Greek", kind: "ancestor", a: -40, g: 2, parent: "phemi" },
  { id: "phasis", form: "φάσις", gloss: "utterance", lang: "Greek", kind: "ancestor", a: -33, g: 2, parent: "phemi" },
  { id: "prophetes", form: "προφήτης", gloss: "who speaks forth", lang: "Greek", kind: "ancestor", a: -48, g: 2.2, parent: "phemi" },
  { id: "prophet", form: "prophet", kind: "modern", a: -48, g: 3.4, parent: "prophetes" },
  { id: "euphemos", form: "εὔφημος", gloss: "fair-spoken", lang: "Greek", kind: "ancestor", a: -29.5, g: 2.6, parent: "phemi" },
  { id: "euphemism", form: "euphemism", kind: "modern", a: -29.5, g: 4, parent: "euphemos" },
  { id: "aphasia", form: "aphasia", kind: "modern", a: -32, g: 3, parent: "phasis" },
  { id: "blasphemare", form: "blasphēmāre", lang: "Late Latin", kind: "ancestor", a: -40, g: 3, parent: "blasphemos" },
  { id: "blasmer", form: "blasmer", lang: "Old French", kind: "ancestor", a: -40, g: 4, parent: "blasphemare" },
  { id: "blame", form: "blame", kind: "modern", a: -40.5, g: 5, parent: "blasmer" },
  { id: "phones", form: "phone", kind: "modern", a: -27.5, g: 3, parent: "phone" },
  { id: "symphony", form: "symphony", kind: "modern", a: -15, g: 4, parent: "phone" },
  { id: "antiphona", form: "ἀντίφωνα", gloss: "answering voices", lang: "Greek", kind: "ancestor", a: -21.5, g: 3, parent: "phone" },
  { id: "antefn", form: "antefn", lang: "Old English", kind: "ancestor", a: -21.5, g: 4, parent: "antiphona" },
  { id: "anthem", form: "anthem", kind: "modern", a: -22, g: 5, parent: "antefn" },

  // Latin arm (middle): speech as destiny and law
  { id: "fari", form: "fārī", gloss: "to speak", lang: "Latin", kind: "ancestor", a: 1, g: 1 },
  { id: "fatum", form: "fātum", gloss: "the thing spoken; destiny", lang: "Latin", kind: "ancestor", a: -11, g: 2, parent: "fari" },
  { id: "fate", form: "fate", kind: "modern", a: -13.5, g: 3, parent: "fatum" },
  { id: "fata", form: "Fāta", gloss: "the Fates", lang: "Latin", kind: "ancestor", a: -9, g: 3, parent: "fatum" },
  { id: "fae", form: "fae", lang: "Old French", kind: "ancestor", a: -9, g: 4, parent: "fata" },
  { id: "fairy", form: "fairy", kind: "modern", a: -9, g: 5, parent: "fae" },
  // fāma is formed on the root itself (*bʰéh₂-meh₂), a sibling of fārī
  { id: "fama", form: "fāma", gloss: "talk, repute", lang: "Latin", kind: "ancestor", a: -4.5, g: 2 },
  { id: "fame", form: "fame", kind: "modern", a: -5, g: 3, parent: "fama" },
  { id: "infans", form: "īnfāns", gloss: "the non-speaker", lang: "Latin", kind: "ancestor", a: 2.5, g: 2, parent: "fari" },
  { id: "infant", form: "infant", kind: "modern", a: 0, g: 3.3, parent: "infans" },
  { id: "infanteria", form: "infanteria", gloss: "the foot-soldiery", lang: "Italian", kind: "ancestor", a: 6, g: 4, parent: "infans" },
  { id: "infantry", form: "infantry", kind: "modern", a: 6, g: 5, parent: "infanteria" },
  { id: "fabula", form: "fābula", gloss: "a thing told", lang: "Latin", kind: "ancestor", a: 10, g: 2, parent: "fari" },
  { id: "fable", form: "fable", kind: "modern", a: 9, g: 3, parent: "fabula" },
  { id: "praefatio", form: "praefātiō", lang: "Latin", kind: "ancestor", a: -2, g: 2.7, parent: "fari" },
  { id: "preface", form: "preface", kind: "modern", a: -3, g: 4, parent: "praefatio" },
  { id: "fas", form: "fās", gloss: "divine law", lang: "Latin", kind: "ancestor", a: 14.5, g: 2.25, parent: "fari", dashed: true },
  { id: "nefarious", form: "nefarious", kind: "modern", a: 15.5, g: 3.35, parent: "fas" },
  { id: "ineffabilis", form: "ineffābilis", gloss: "unsayable", lang: "Latin", kind: "ancestor", a: 11, g: 3.1, parent: "fari" },
  { id: "ineffable", form: "ineffable", kind: "modern", a: 11, g: 4.6, parent: "ineffabilis" },
  { id: "fateri", form: "fatērī", gloss: "to avow", lang: "Latin", kind: "ancestor", a: 19, g: 2.7, parent: "fari" },
  { id: "confess", form: "confess", kind: "modern", a: 19, g: 4.5, parent: "fateri" },

  // Germanic arm (lower): speech as command
  { id: "bannana", form: "*bannaną", gloss: "to proclaim", lang: "Proto-Germanic", kind: "proto", a: 32, g: 1 },
  { id: "bannan", form: "bannan", lang: "Old English", kind: "ancestor", a: 24, g: 2, parent: "bannana" },
  { id: "ban", form: "ban", kind: "modern", a: 22.5, g: 3, parent: "bannan" },
  { id: "bannjan", form: "*bannjan", lang: "Frankish", kind: "proto", a: 33, g: 2, parent: "bannana" },
  { id: "banof", form: "ban", gloss: "feudal jurisdiction", lang: "Old French", kind: "ancestor", a: 33, g: 3, parent: "bannana" },
  { id: "banal", form: "banal", kind: "modern", a: 29, g: 4, parent: "banof" },
  { id: "bandon", form: "bandon", gloss: "power; (a bandon) at one’s will", lang: "Old French", kind: "ancestor", a: 32.5, g: 4, parent: "banof" },
  { id: "abandon", form: "abandon", kind: "modern", a: 32.5, g: 5, parent: "bandon" },
  { id: "banish", form: "banish", kind: "modern", a: 38, g: 4, parent: "bannjan" },
  { id: "bannum", form: "bannum", gloss: "the proclamation", lang: "Late Latin", kind: "ancestor", a: 39.5, g: 3, parent: "bannana" },
  { id: "bando", form: "bando", lang: "Italian", kind: "ancestor", a: 41, g: 4, parent: "bannum" },
  { id: "contrabbando", form: "contrabbando", gloss: "against the ban", lang: "Italian", kind: "ancestor", a: 41, g: 4.4, parent: "bando" },
  { id: "contraband", form: "contraband", kind: "modern", a: 41, g: 5.4, parent: "contrabbando" },
  { id: "bandito", form: "bandito", gloss: "proclaimed, outlawed", lang: "Italian", kind: "ancestor", a: 47, g: 4.5, parent: "bannum", dashed: true },
  { id: "bandit", form: "bandit", kind: "modern", a: 47, g: 5.3, parent: "bandito" },
  { id: "boniz", form: "*bōniz", gloss: "a spoken plea", lang: "Proto-Germanic", kind: "proto", a: 45, g: 1 },
  { id: "bon", form: "bón", gloss: "prayer", lang: "Old Norse", kind: "ancestor", a: 45, g: 2, parent: "boniz" },
  { id: "boon", form: "boon", kind: "modern", a: 45, g: 3, parent: "bon" },
];

/** branches that die before English */
export const STUBS: { form: string; gloss: string; lang: string; a: number; g: number }[] = [
  { form: "ban", gloss: "word", lang: "Old Armenian", a: -56, g: 1.6 },
  { form: "basnь", gloss: "fable, spell", lang: "Proto-Slavic", a: -63, g: 1.3 },
  { form: "bhāṣā", gloss: "language", lang: "Sanskrit", a: -49, g: 1.1 },
];
