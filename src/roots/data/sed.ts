// *sed- 'to sit'. Data from root_trees.md (exploration tier).
// Time strata: every node sits at its era's depth — PIE, the
// proto-languages, antiquity, the middle ages, English at the bottom —
// so the settling is datable, not decorative. One word per node; linking
// forms are intermediate NODES (sedēre → possidēre → possess). gloss and
// lang are separate fields — the "gloss · language" line is composed at
// render time. x-columns hand-tuned.

import type { WordNode } from "../types";

export interface SedNode extends WordNode {
  x: number;
  /** moderns rest in the English stratum; ancestors carry their era depth */
  y?: number;
}

export const ROOT_X = 1020;
export const ROOT_Y = 150;
/** stratum boundaries (faint hairlines) and the resting depth of English words */
export const STRATA = [250, 460, 730, 970];
export const LEAF_Y = 1050;

export const ERAS: { label: string; y: number }[] = [
  { label: "PIE", y: 240 },
  { label: "PROTO-LANGUAGES", y: 450 },
  { label: "ANTIQUITY", y: 720 },
  { label: "MIDDLE AGES", y: 960 },
  { label: "ENGLISH", y: 1115 },
];

export const SED_NODES: SedNode[] = [
  // Germanic
  { id: "germanic_sed", form: "*set- / *sat-", gloss: "the inherited sit-family", lang: "Proto-Germanic", kind: "proto", x: 410, y: 290 },
  { id: "sitjana", form: "*sitjaną", gloss: "to sit", lang: "Proto-Germanic", kind: "proto", x: 140, y: 350, parent: "germanic_sed" },
  { id: "sittan", form: "sittan", gloss: "to sit", lang: "Old English", kind: "ancestor", x: 140, y: 780, parent: "sitjana" },
  { id: "sit", form: "sit", kind: "modern", x: 140, parent: "sittan" },
  { id: "setlaz", form: "*setlaz", gloss: "seat", lang: "Proto-Germanic", kind: "proto", x: 222, y: 410, parent: "germanic_sed", dashed: true },
  { id: "setl", form: "setl", gloss: "seat", lang: "Old English", kind: "ancestor", x: 222, y: 850, parent: "setlaz" },
  { id: "setlan", form: "setlan", gloss: "to settle, put to rest", lang: "Old English", kind: "ancestor", x: 222, y: 912, parent: "setl" },
  { id: "settle", form: "settle", kind: "modern", x: 222, parent: "setlan" },
  { id: "satjana", form: "*satjaną", gloss: "to make sit", lang: "Proto-Germanic", kind: "proto", x: 314, y: 350, parent: "germanic_sed" },
  { id: "settan", form: "settan", gloss: "to set", lang: "Old English", kind: "ancestor", x: 314, y: 780, parent: "satjana" },
  { id: "set", form: "set", kind: "modern", x: 314, parent: "settan" },
  { id: "irsezzen", form: "irsezzen", gloss: "to replace", lang: "Old High German", kind: "ancestor", x: 406, y: 860, parent: "satjana" },
  { id: "ersetzen", form: "ersetzen", gloss: "to replace", lang: "German", kind: "ancestor", x: 406, y: 930, parent: "irsezzen" },
  { id: "ersatzde", form: "Ersatz", gloss: "replacement", lang: "German", kind: "ancestor", x: 406, y: 1000, parent: "ersetzen" },
  { id: "ersatz", form: "ersatz", kind: "modern", x: 406, parent: "ersatzde" },
  { id: "sotam", form: "*sōtą", gloss: "what settles", lang: "Proto-Germanic", kind: "proto", x: 320, y: 410, parent: "germanic_sed" },
  { id: "sot", form: "sōt", gloss: "soot", lang: "Old English", kind: "ancestor", x: 320, y: 780, parent: "sotam" },
  { id: "soot", form: "soot", kind: "modern", x: 320, parent: "sot" },
  { id: "nisdos", form: "*ni-sd-ós", gloss: "nest: where the bird sits down", lang: "PIE", kind: "proto", x: 930, y: 240 },
  { id: "nestaz", form: "*nestą", gloss: "nest", lang: "Proto-Germanic", kind: "proto", x: 500, y: 350, parent: "nisdos" },
  { id: "nest", form: "nest", kind: "modern", x: 500, parent: "nestaz" },
  { id: "setija", form: "*sētiją", gloss: "seat", lang: "Proto-Germanic", kind: "proto", x: 680, y: 360, parent: "germanic_sed" },
  { id: "saeti", form: "sæti", gloss: "seat", lang: "Old Norse", kind: "ancestor", x: 680, y: 795, parent: "setija" },
  { id: "seat", form: "seat", kind: "modern", x: 680, parent: "saeti" },

  // Latin
  { id: "sedere", form: "sedēre", gloss: "to sit", lang: "Latin", kind: "ancestor", x: 1040, y: 520 },
  { id: "sedes", form: "sēdēs", gloss: "seat", lang: "Latin", kind: "ancestor", x: 860, y: 600, parent: "sedere" },
  { id: "sie", form: "sie", gloss: "seat, throne", lang: "Old French", kind: "ancestor", x: 860, y: 880, parent: "sedes" },
  { id: "see", form: "see", gloss: "papal / bishop’s", kind: "modern", x: 860, parent: "sie" },
  { id: "possidere", form: "possidēre", gloss: "probably potis + sedēre", lang: "Latin", kind: "ancestor", x: 900, y: 680, parent: "sedere", dashed: true },
  { id: "possesser", form: "possesser", gloss: "to possess", lang: "Old French", kind: "ancestor", x: 900, y: 815, parent: "possidere" },
  { id: "possess", form: "possess", kind: "modern", x: 900, parent: "possesser" },
  { id: "sedicum", form: "*sēdicum", gloss: "seat", lang: "Vulgar Latin", kind: "proto", x: 1040, y: 760, parent: "sedes" },
  { id: "sege", form: "sege", gloss: "seat", lang: "Old French", kind: "ancestor", x: 1040, y: 880, parent: "sedicum" },
  { id: "siege", form: "siege", kind: "modern", x: 1040, parent: "sege" },
  { id: "sedare", form: "sēdāre", gloss: "to settle, to calm", lang: "Latin", kind: "ancestor", x: 1110, y: 600, parent: "sedere" },
  { id: "sedate", form: "sedate", kind: "modern", x: 1110, parent: "sedare" },
  { id: "assidere", form: "assidēre", gloss: "ad + sedēre: to sit by", lang: "Latin", kind: "ancestor", x: 1220, y: 680, parent: "sedere" },
  { id: "assise", form: "assise", gloss: "the court’s sitting", lang: "Old French", kind: "ancestor", x: 1220, y: 780, parent: "assidere" },
  { id: "size", form: "size", kind: "modern", x: 1220, parent: "assise" },
  { id: "assessus", form: "assessus", gloss: "a sitting by", lang: "Latin", kind: "ancestor", x: 1260, y: 760, parent: "assidere" },
  { id: "assessare", form: "assessāre", gloss: "fix a tax or fine", lang: "Medieval Latin", kind: "ancestor", x: 1260, y: 880, parent: "assessus" },
  { id: "assess", form: "assess", kind: "modern", x: 1260, parent: "assessare" },
  { id: "insidere", form: "īnsidēre", gloss: "sit in or on", lang: "Latin", kind: "ancestor", x: 1320, y: 620, parent: "sedere" },
  { id: "insidiae", form: "īnsidiae", gloss: "a lying in wait, ambush", lang: "Latin", kind: "ancestor", x: 1320, y: 790, parent: "insidere" },
  { id: "insidious", form: "insidious", kind: "modern", x: 1320, parent: "insidiae" },
  { id: "obsidere", form: "obsidēre", gloss: "sit against; besiege", lang: "Latin", kind: "ancestor", x: 1390, y: 620, parent: "sedere" },
  { id: "obsessus", form: "obsessus", gloss: "besieged", lang: "Latin", kind: "ancestor", x: 1390, y: 790, parent: "obsidere" },
  { id: "obsess", form: "obsess", kind: "modern", x: 1390, parent: "obsessus" },
  { id: "subsidere", form: "subsidere", gloss: "sit down; remain", lang: "Latin", kind: "ancestor", x: 1460, y: 620, parent: "sedere" },
  { id: "subsidium", form: "subsidium", gloss: "reserve troops; support", lang: "Latin", kind: "ancestor", x: 1460, y: 790, parent: "subsidere" },
  { id: "subsidy", form: "subsidy", kind: "modern", x: 1460, parent: "subsidium" },
  { id: "dissidere", form: "dissidēre", gloss: "sit apart; disagree", lang: "Latin", kind: "ancestor", x: 1530, y: 620, parent: "sedere" },
  { id: "dissidens", form: "dissidēns", gloss: "disagreeing", lang: "Latin", kind: "ancestor", x: 1530, y: 790, parent: "dissidere" },
  { id: "dissident", form: "dissident", kind: "modern", x: 1530, parent: "dissidens" },
  { id: "supersedere", form: "supersedēre", gloss: "to sit above", lang: "Latin", kind: "ancestor", x: 1600, y: 690, parent: "sedere" },
  { id: "supersede", form: "supersede", kind: "modern", x: 1600, parent: "supersedere" },
  { id: "nidus", form: "nīdus", gloss: "nest", lang: "Latin", kind: "ancestor", x: 1335, y: 600, parent: "nisdos" },
  { id: "nidacem", form: "*nīdācem", gloss: "nesting", lang: "Vulgar Latin", kind: "proto", x: 1355, y: 745, parent: "nidus" },
  { id: "niais", form: "niais", gloss: "nestling falcon", lang: "Old French", kind: "ancestor", x: 1250, y: 850, parent: "nidacem" },
  { id: "nyas", form: "nyas", gloss: "nestling hawk (a nyas → an eyas)", lang: "English", kind: "ancestor", x: 1250, y: 990, parent: "niais" },
  { id: "eyas", form: "eyas", kind: "modern", x: 1290, parent: "nyas" },
  { id: "nidicare", form: "*nīdicāre", gloss: "to nest", lang: "Vulgar Latin", kind: "proto", x: 1400, y: 810, parent: "nidus", dashed: true },
  { id: "nicher", form: "nichier", gloss: "to make a nest", lang: "Old French", kind: "ancestor", x: 1400, y: 940, parent: "nidicare", dashed: true },
  { id: "niche", form: "niche", kind: "modern", x: 1380, parent: "nicher" },

  // Greek
  { id: "hedra", form: "ἕδρα", gloss: "seat", lang: "Greek", kind: "ancestor", x: 1400, y: 520 },
  { id: "ephedra", form: "ἐφέδρα", gloss: "plant name: sitting-upon", lang: "Greek", kind: "ancestor", x: 1480, y: 680, parent: "hedra" },
  { id: "ephedrine", form: "ephedrine", kind: "modern", x: 1480, parent: "ephedra" },
  { id: "kathedra", form: "καθέδρα", gloss: "seat, chair", lang: "Greek", kind: "ancestor", x: 1400, y: 640, parent: "hedra" },
  { id: "cathedra", form: "cathedra", gloss: "chair; bishop’s seat", lang: "Latin", kind: "ancestor", x: 1400, y: 765, parent: "kathedra" },
  { id: "cathedralis", form: "cathedrālis", gloss: "of a bishop’s seat", lang: "Late Latin", kind: "ancestor", x: 1360, y: 880, parent: "cathedra" },
  { id: "cathedral", form: "cathedral", kind: "modern", x: 1360, parent: "cathedralis" },
  { id: "chaiere", form: "chaiere", gloss: "chair, throne", lang: "Old French", kind: "ancestor", x: 1400, y: 880, parent: "cathedra" },
  { id: "chair", form: "chair", kind: "modern", x: 1400, parent: "chaiere" },
  { id: "synedrion", form: "συνέδριον", gloss: "a sitting-together", lang: "Greek", kind: "ancestor", x: 1690, y: 585, parent: "hedra" },
  { id: "sanhedrin_he", form: "sanhedrīn", gloss: "council", lang: "Hebrew", kind: "ancestor", x: 1660, y: 700, parent: "synedrion" },
  { id: "sanhedrin", form: "Sanhedrin", kind: "modern", x: 1665, parent: "sanhedrin_he" },

  // Celtic, Welsh, Sanskrit
  { id: "sidos", form: "*sīdos", gloss: "otherworld mound", lang: "Proto-Celtic", kind: "proto", x: 1580, y: 360 },
  { id: "sid", form: "síd", gloss: "fairy mound", lang: "Old Irish", kind: "ancestor", x: 1580, y: 740, parent: "sidos" },
  { id: "beansidhe", form: "bean sí", gloss: "woman of the mound", lang: "Irish", kind: "ancestor", x: 1580, y: 910, parent: "sid" },
  { id: "banshee", form: "banshee", kind: "modern", x: 1580, parent: "beansidhe" },
  { id: "eistedd", form: "eistedd", gloss: "to sit", lang: "Welsh", kind: "ancestor", x: 1780, y: 850 },
  { id: "eisteddfodw", form: "eisteddfod", gloss: "sitting together", lang: "Welsh", kind: "ancestor", x: 1780, y: 990, parent: "eistedd" },
  { id: "eisteddfod", form: "Eisteddfod", gloss: "poets and musicians compete", kind: "modern", x: 1780, parent: "eisteddfodw" },
  { id: "upanisad", form: "upa-ni-ṣad", gloss: "a sitting down beside", lang: "Sanskrit", kind: "ancestor", x: 1980, y: 600 },
  { id: "upanishad", form: "Upanishad", gloss: "teachings on reality and self", kind: "modern", x: 1980, parent: "upanisad" },
];
