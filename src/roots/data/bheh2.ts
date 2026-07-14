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
  /** label sits left of the node, on the incoming stub */
  labelLeft?: boolean;
}

/** radius per generation, tuned */
export const GEN = [0, 215, 395, 575, 765, 965, 1175, 1380];

export const RIPPLE_NODES: RippleNode[] = [
  // Greek arm (upper): speech as sound
  { id: "phemi", form: "φημί", gloss: "I say", lang: "Greek", kind: "ancestor", a: -29, g: 1, labelLeft: true },
  // φωνή is formed on the root itself (o-grade *bʰoh₂-néh₂), a sibling of φημί
  { id: "phone", form: "φωνή", gloss: "voice, sound", lang: "Greek", kind: "ancestor", a: -22, g: 2 },
  { id: "blasphemos", form: "βλάσφημος", gloss: "evil-speaking", lang: "Greek", kind: "ancestor", a: -41.5, g: 2.05, parent: "phemi" },
  { id: "phasis", form: "φάσις", gloss: "utterance", lang: "Greek", kind: "ancestor", a: -33, g: 2, parent: "phemi" },
  { id: "prophetes", form: "προφήτης", gloss: "who speaks forth", lang: "Greek", kind: "ancestor", a: -48, g: 2.2, parent: "phemi" },
  { id: "propheta", form: "prophēta", gloss: "foreteller", lang: "Latin", kind: "ancestor", a: -48, g: 2.8, parent: "prophetes" },
  { id: "prophet", form: "prophet", kind: "modern", a: -48, g: 3.4, parent: "propheta" },
  { id: "euphemos", form: "εὔφημος", gloss: "fair-spoken", lang: "Greek", kind: "ancestor", a: -29.5, g: 2.6, parent: "phemi" },
  { id: "euphemismos", form: "εὐφημισμός", gloss: "fair-speaking", lang: "Greek", kind: "ancestor", a: -29.5, g: 3.3, parent: "euphemos" },
  { id: "euphemism", form: "euphemism", kind: "modern", a: -29.5, g: 4, parent: "euphemismos" },
  { id: "aphasia_gr", form: "ἀφασία", gloss: "speechlessness", lang: "Greek", kind: "ancestor", a: -34.5, g: 2.7, parent: "phasis", dashed: true },
  { id: "aphasia", form: "aphasia", kind: "modern", a: -35, g: 3.4, parent: "aphasia_gr" },
  { id: "blasphemeo", form: "βλασφημέω", gloss: "to speak ill of", lang: "Greek", kind: "ancestor", a: -40.3, g: 2.95, parent: "blasphemos" },
  { id: "blasphemare", form: "blasphēmāre", gloss: "to revile", lang: "Late Latin", kind: "ancestor", a: -40, g: 3.5, parent: "blasphemeo" },
  { id: "blasmer", form: "blasmer", gloss: "to blame", lang: "Old French", kind: "ancestor", a: -40, g: 4, parent: "blasphemare" },
  { id: "blame", form: "blame", kind: "modern", a: -40.5, g: 5, parent: "blasmer" },
  { id: "symphonia", form: "συμφωνία", gloss: "a sounding-together", lang: "Greek", kind: "ancestor", a: -18, g: 2.6, parent: "phone" },
  { id: "symphony", form: "symphony", kind: "modern", a: -16.5, g: 4, parent: "symphonia" },
  { id: "antiphona", form: "ἀντίφωνα", gloss: "answering voices", lang: "Greek", kind: "ancestor", a: -21.5, g: 3, parent: "phone" },
  { id: "antifona", form: "antifona", gloss: "antiphon", lang: "Late Latin", kind: "ancestor", a: -24, g: 3.6, parent: "antiphona" },
  { id: "antefn", form: "antefn", gloss: "sung response", lang: "Old English", kind: "ancestor", a: -22, g: 4.4, parent: "antifona" },
  { id: "anthem", form: "anthem", kind: "modern", a: -22, g: 5.05, parent: "antefn" },

  // Latin arm (middle): speech as destiny and law
  { id: "fari", form: "fārī", gloss: "to speak", lang: "Latin", kind: "ancestor", a: 1, g: 1, labelLeft: true },
  { id: "fatum", form: "fātum", gloss: "the thing spoken; destiny", lang: "Latin", kind: "ancestor", a: -11, g: 2, parent: "fari" },
  { id: "fata", form: "fāta", gloss: "predictions; the Fates", lang: "Latin", kind: "ancestor", a: -11, g: 3, parent: "fatum" },
  { id: "fate", form: "fate", kind: "modern", a: -13, g: 4, parent: "fata" },
  { id: "fae", form: "fae", gloss: "fay", lang: "Old French", kind: "ancestor", a: -9, g: 4, parent: "fata", dashed: true },
  { id: "faerie", form: "faerie", gloss: "enchantment", lang: "Old French", kind: "ancestor", a: -9, g: 4.5, parent: "fae" },
  { id: "fairy", form: "fairy", kind: "modern", a: -9, g: 5, parent: "faerie" },
  // fāma is formed on the root itself (*bʰéh₂-meh₂), a sibling of fārī
  { id: "fama", form: "fāma", gloss: "talk, repute", lang: "Latin", kind: "ancestor", a: -4.5, g: 2.2 },
  { id: "fame", form: "fame", kind: "modern", a: -5, g: 3, parent: "fama" },
  { id: "infans", form: "īnfāns", gloss: "the non-speaker", lang: "Latin", kind: "ancestor", a: 2.5, g: 2, parent: "fari" },
  { id: "infant", form: "infant", kind: "modern", a: 0, g: 3.6, parent: "infans" },
  { id: "infante", form: "infante", gloss: "youth; foot soldier", lang: "Italian or Spanish", kind: "ancestor", a: 5, g: 3, parent: "infans" },
  { id: "infanteria", form: "infanteria", gloss: "the foot-soldiery", lang: "Italian", kind: "ancestor", a: 6, g: 4, parent: "infante" },
  { id: "infantry", form: "infantry", kind: "modern", a: 6, g: 5, parent: "infanteria" },
  { id: "fabula", form: "fābula", gloss: "a thing told", lang: "Latin", kind: "ancestor", a: 10, g: 2, parent: "fari", labelLeft: true },
  { id: "fable", form: "fable", kind: "modern", a: 9, g: 3, parent: "fabula" },
  { id: "praefatio", form: "praefātiō", gloss: "a fore-saying", lang: "Latin", kind: "ancestor", a: -2, g: 2.85, parent: "fari" },
  { id: "preface", form: "preface", kind: "modern", a: -3, g: 4, parent: "praefatio" },
  { id: "fas", form: "fās", gloss: "divine law", lang: "Latin", kind: "ancestor", a: 13.5, g: 2.9, dashed: true },
  { id: "nefas", form: "nefās", gloss: "sin against divine law", lang: "Latin", kind: "ancestor", a: 15, g: 3.5, parent: "fas" },
  { id: "nefarious", form: "nefarious", kind: "modern", a: 15, g: 4.3, parent: "nefas" },
  { id: "ineffabilis", form: "ineffābilis", gloss: "unsayable", lang: "Latin", kind: "ancestor", a: 11, g: 3.3, parent: "fari" },
  { id: "ineffable", form: "ineffable", kind: "modern", a: 11, g: 4.6, parent: "ineffabilis" },
  { id: "fateri", form: "fatērī", gloss: "to avow", lang: "Latin", kind: "ancestor", a: 20, g: 2.7 },
  { id: "confiteri", form: "cōnfitērī", gloss: "to acknowledge", lang: "Latin", kind: "ancestor", a: 20.5, g: 3.8, parent: "fateri" },
  { id: "confess", form: "confess", kind: "modern", a: 20.5, g: 5.2, parent: "confiteri" },

  // Germanic arm (lower): speech as command
  { id: "bannana", form: "*bannaną", gloss: "to proclaim", lang: "Proto-Germanic", kind: "proto", a: 32, g: 1 },
  { id: "bannan", form: "bannan", gloss: "to summon", lang: "Old English", kind: "ancestor", a: 24, g: 1.85, parent: "bannana" },
  { id: "ban", form: "ban", kind: "modern", a: 22.5, g: 3.1, parent: "bannan" },
  { id: "bannjan", form: "*bannjan", gloss: "to summon, banish", lang: "Frankish", kind: "proto", a: 28, g: 2.2, parent: "bannana", labelLeft: true },
  { id: "banir", form: "banir", gloss: "to banish", lang: "Old French", kind: "ancestor", a: 25.5, g: 3.55, parent: "bannjan", dashed: true },
  { id: "banish", form: "banish", kind: "modern", a: 23, g: 4.5, parent: "banir" },
  { id: "frankban", form: "*ban", gloss: "a command", lang: "Frankish", kind: "proto", a: 42, g: 1.85, parent: "bannana", labelLeft: true },
  { id: "banof", form: "ban", gloss: "decree, legal control", lang: "Old French", kind: "ancestor", a: 37, g: 2.9, parent: "frankban" },
  { id: "banal", form: "banal", kind: "modern", a: 39, g: 4, parent: "banof", dashed: true },
  { id: "bandon", form: "bandon", gloss: "power; (a bandon) at one’s will", lang: "Old French", kind: "ancestor", a: 38.5, g: 4.3, parent: "bannum" },
  { id: "abandon", form: "abandon", kind: "modern", a: 37.5, g: 5.15, parent: "bandon" },
  { id: "bannum", form: "bannum", gloss: "the proclamation", lang: "Late Latin", kind: "ancestor", a: 44, g: 3.1, parent: "frankban" },
  { id: "bando", form: "bando", gloss: "proclamation, edict", lang: "Italian", kind: "ancestor", a: 46, g: 4.2, parent: "bannum" },
  { id: "contrabando", form: "contrabando", gloss: "against the ban", lang: "Italian", kind: "ancestor", a: 46, g: 4.65, parent: "bando" },
  { id: "contraband", form: "contraband", kind: "modern", a: 46, g: 5.6, parent: "contrabando" },
  { id: "bannire", form: "bannīre", gloss: "to proclaim, outlaw", lang: "Late Latin", kind: "ancestor", a: 30, g: 3.8, parent: "bannjan" },
  { id: "bandire", form: "bandire", gloss: "to proclaim, banish", lang: "Italian", kind: "ancestor", a: 30, g: 4.35, parent: "bannire" },
  { id: "bandito", form: "bandito", gloss: "proclaimed, outlawed", lang: "Italian", kind: "ancestor", a: 30, g: 4.95, parent: "bandire" },
  { id: "bandit", form: "bandit", kind: "modern", a: 30, g: 5.5, parent: "bandito" },
  { id: "boniz", form: "*bōniz", gloss: "supplication", lang: "Proto-Germanic", kind: "proto", a: 52, g: 1 },
  { id: "bon", form: "bón", gloss: "prayer", lang: "Old Norse", kind: "ancestor", a: 52, g: 2.05, parent: "boniz" },
  { id: "boon", form: "boon", kind: "modern", a: 52, g: 3, parent: "bon" },

  // branches that die before English
  { id: "banarm", form: "ban", gloss: "word", lang: "Old Armenian", kind: "ancestor", a: -56, g: 1.75 },
  { id: "basn", form: "*basnь", gloss: "tale, fable", lang: "Proto-Slavic", kind: "proto", a: -63, g: 2.4 },
  { id: "bhasa", form: "bhāṣā", gloss: "language", lang: "Sanskrit", kind: "ancestor", a: -49, g: 1.1, dashed: true },
];
