// *sed- 'to sit'. Descent data from notes/sed.md (exploration tier); this file
// is the whole researched tree, of which the chart draws a chosen subset —
// Sit.tsx names the drawn nodes and owns every coordinate. One word per node;
// linking forms are intermediate NODES (sedēre → possidēre → possess). gloss
// and lang are separate fields — the "gloss · language" line is composed at
// render time.

import type { WordNode } from "../types";

export const SED_NODES: WordNode[] = [
  // Germanic
  { id: "sitjana", form: "*sitjaną", gloss: "to sit", lang: "Proto-Germanic", kind: "proto" },
  { id: "sittan", form: "sittan", gloss: "to sit", lang: "Old English", kind: "ancestor", parent: "sitjana" },
  { id: "sit", form: "sit", kind: "modern", parent: "sittan" },
  { id: "setlaz", form: "*setlaz", gloss: "seat", lang: "Proto-Germanic", kind: "proto", dashed: true },
  { id: "setl", form: "setl", gloss: "seat", lang: "Old English", kind: "ancestor", parent: "setlaz" },
  { id: "setlan", form: "setlan", gloss: "to settle, put to rest", lang: "Old English", kind: "ancestor", parent: "setl" },
  { id: "settle", form: "settle", kind: "modern", parent: "setlan" },
  { id: "satjana", form: "*satjaną", gloss: "to make sit", lang: "Proto-Germanic", kind: "proto" },
  { id: "settan", form: "settan", gloss: "to set", lang: "Old English", kind: "ancestor", parent: "satjana" },
  { id: "set", form: "set", kind: "modern", parent: "settan" },
  { id: "irsezzen", form: "irsezzen", gloss: "to replace", lang: "Old High German", kind: "ancestor", parent: "satjana" },
  { id: "ersetzen", form: "ersetzen", gloss: "to replace", lang: "German", kind: "ancestor", parent: "irsezzen" },
  { id: "ersatzde", form: "Ersatz", gloss: "replacement", lang: "German", kind: "ancestor", parent: "ersetzen" },
  { id: "ersatz", form: "ersatz", kind: "modern", parent: "ersatzde" },
  { id: "sotam", form: "*sōtą", gloss: "what settles", lang: "Proto-Germanic", kind: "proto" },
  { id: "sot", form: "sōt", gloss: "soot", lang: "Old English", kind: "ancestor", parent: "sotam" },
  { id: "soot", form: "soot", kind: "modern", parent: "sot" },
  { id: "nisdos", form: "*ni-sd-ós", gloss: "nest: where the bird sits down", lang: "PIE", kind: "proto" },
  { id: "nestaz", form: "*nestą", gloss: "nest", lang: "Proto-Germanic", kind: "proto", parent: "nisdos" },
  { id: "nest", form: "nest", kind: "modern", parent: "nestaz" },
  { id: "setija", form: "*setiją", gloss: "seat", lang: "Proto-Germanic", kind: "proto" },
  { id: "saeti", form: "sæti", gloss: "seat", lang: "Old Norse", kind: "ancestor", parent: "setija" },
  { id: "seat", form: "seat", kind: "modern", parent: "saeti" },

  // Latin
  { id: "sedere", form: "sedēre", gloss: "to sit", lang: "Latin", kind: "ancestor" },
  // sēdēs is a root-noun beside the verb, not derived from it (notes/sed.md)
  { id: "sedes", form: "sēdēs", gloss: "seat", lang: "Latin", kind: "ancestor" },
  { id: "sie", form: "sie", gloss: "seat, throne", lang: "Old French", kind: "ancestor", parent: "sedes" },
  { id: "see", form: "see", gloss: "papal / bishop’s", kind: "modern", parent: "sie" },
  // the potis + sedēre analysis is hedged in the sources; the dash carries that
  { id: "possidere", form: "possidēre", gloss: "to occupy, hold", lang: "Latin", kind: "ancestor", parent: "sedere", dashed: true },
  { id: "possesser", form: "possesser", gloss: "to possess", lang: "Old French", kind: "ancestor", parent: "possidere" },
  { id: "possess", form: "possess", kind: "modern", parent: "possesser" },
  { id: "sedicum", form: "*sēdicum", gloss: "seat", lang: "Vulgar Latin", kind: "proto", parent: "sedere" },
  { id: "sege", form: "sege", gloss: "seat", lang: "Old French", kind: "ancestor", parent: "sedicum" },
  { id: "siege", form: "siege", kind: "modern", parent: "sege" },
  { id: "sedare", form: "sēdāre", gloss: "to settle, to calm", lang: "Latin", kind: "ancestor", parent: "sedere" },
  { id: "sedatus", form: "sedātus", gloss: "calmed, composed", lang: "Latin", kind: "ancestor", parent: "sedare" },
  { id: "sedate", form: "sedate", kind: "modern", parent: "sedatus" },
  { id: "assidere", form: "assidēre", gloss: "sit beside", lang: "Latin", kind: "ancestor", parent: "sedere" },
  { id: "assise", form: "assise", gloss: "the court’s sitting", lang: "Old French", kind: "ancestor", parent: "assidere" },
  // English assize is size's sibling, not its ancestor: both witnesses route
  // size through the clipped assise (Etymonline, Wiktionary)
  { id: "sise", form: "sise", gloss: "an assessed amount", lang: "Old French", kind: "ancestor", parent: "assise" },
  { id: "size", form: "size", kind: "modern", parent: "sise" },
  { id: "assessus", form: "assessus", gloss: "a sitting by", lang: "Latin", kind: "ancestor", parent: "assidere" },
  { id: "assessare", form: "assessāre", gloss: "fix a tax or fine", lang: "Medieval Latin", kind: "ancestor", parent: "assessus" },
  { id: "assess", form: "assess", kind: "modern", parent: "assessare" },
  { id: "insidere", form: "īnsidēre", gloss: "sit in or on", lang: "Latin", kind: "ancestor", parent: "sedere" },
  { id: "insidiae", form: "īnsidiae", gloss: "a lying in wait, ambush", lang: "Latin", kind: "ancestor", parent: "insidere" },
  { id: "insidiosus", form: "īnsidiōsus", gloss: "cunning, treacherous", lang: "Latin", kind: "ancestor", parent: "insidiae" },
  { id: "insidious", form: "insidious", kind: "modern", parent: "insidiosus" },
  { id: "obsidere", form: "obsidēre", gloss: "sit against; besiege", lang: "Latin", kind: "ancestor", parent: "sedere" },
  { id: "obsessus", form: "obsessus", gloss: "besieged", lang: "Latin", kind: "ancestor", parent: "obsidere" },
  { id: "obsess", form: "obsess", kind: "modern", parent: "obsessus" },
  // sīdō is *sed- reduplicated (de Vaan *sizd-e/o-), a stem beside sedēre, and
  // every dictionary builds subsīdō on it: L&S "sub-sīdo … 3", Wiktionary
  // sub- + sīdō. No source derives the verb from sedēre — Etymonline only says
  // its sidere is "connected to" sedere. subsidium: L&S "from subsideo", the
  // collateral 2nd-conjugation form of the same verb.
  { id: "sido", form: "sīdō", gloss: "to settle down", lang: "Latin", kind: "ancestor" },
  { id: "subsidere", form: "subsīdere", gloss: "sit down; remain", lang: "Latin", kind: "ancestor", parent: "sido" },
  { id: "subsidium", form: "subsidium", gloss: "reserve troops; support", lang: "Latin", kind: "ancestor", parent: "subsidere" },
  { id: "subsidy", form: "subsidy", kind: "modern", parent: "subsidium" },
  { id: "dissidere", form: "dissidēre", gloss: "sit apart; disagree", lang: "Latin", kind: "ancestor", parent: "sedere" },
  { id: "dissidens", form: "dissidēns", gloss: "disagreeing", lang: "Latin", kind: "ancestor", parent: "dissidere" },
  { id: "dissident", form: "dissident", kind: "modern", parent: "dissidens" },
  { id: "supersedere", form: "supersedēre", gloss: "to sit above", lang: "Latin", kind: "ancestor", parent: "sedere" },
  { id: "supersede", form: "supersede", kind: "modern", parent: "supersedere" },
  { id: "nidus", form: "nīdus", gloss: "nest", lang: "Latin", kind: "ancestor", parent: "nisdos" },
  { id: "nidacem", form: "*nīdācem", gloss: "nesting", lang: "Vulgar Latin", kind: "proto", parent: "nidus" },
  { id: "niais", form: "niais", gloss: "nestling falcon", lang: "Old French", kind: "ancestor", parent: "nidacem" },
  { id: "nyas", form: "nyas", gloss: "nestling hawk (a nyas → an eyas)", lang: "English", kind: "ancestor", parent: "niais" },
  { id: "eyas", form: "eyas", kind: "modern", parent: "nyas" },
  { id: "nidicare", form: "*nīdicāre", gloss: "to nest", lang: "Vulgar Latin", kind: "proto", parent: "nidus", dashed: true },
  { id: "nicher", form: "nichier", gloss: "to make a nest", lang: "Old French", kind: "ancestor", parent: "nidicare", dashed: true },
  { id: "niche", form: "niche", kind: "modern", parent: "nicher" },

  // Greek
  { id: "hedra", form: "ἕδρα", gloss: "seat", lang: "Greek", kind: "ancestor" },
  { id: "ephedra", form: "ἐφέδρα", gloss: "sitting upon", lang: "Greek", kind: "ancestor", parent: "hedra" },
  { id: "ephedrine", form: "ephedrine", kind: "modern", parent: "ephedra" },
  { id: "kathedra", form: "καθέδρα", gloss: "seat, chair", lang: "Greek", kind: "ancestor", parent: "hedra" },
  { id: "cathedra", form: "cathedra", gloss: "chair; bishop’s seat", lang: "Latin", kind: "ancestor", parent: "kathedra" },
  { id: "cathedralis", form: "cathedrālis", gloss: "of a bishop’s seat", lang: "Late Latin", kind: "ancestor", parent: "cathedra" },
  { id: "cathedral", form: "cathedral", kind: "modern", parent: "cathedralis" },
  { id: "chaiere", form: "chaiere", gloss: "chair, throne", lang: "Old French", kind: "ancestor", parent: "cathedra" },
  { id: "chair", form: "chair", kind: "modern", parent: "chaiere" },
  { id: "synedrion", form: "συνέδριον", gloss: "a sitting-together", lang: "Greek", kind: "ancestor", parent: "hedra" },
  { id: "sanhedrin_he", form: "sanhedrīn", gloss: "council", lang: "Late Hebrew", kind: "ancestor", parent: "synedrion" },
  { id: "sanhedrin", form: "Sanhedrin", kind: "modern", parent: "sanhedrin_he" },

  // Celtic, Welsh, Sanskrit
  { id: "sidos", form: "*sīdos", gloss: "otherworld mound", lang: "Proto-Celtic", kind: "proto" },
  { id: "sid", form: "síd", gloss: "fairy mound", lang: "Old Irish", kind: "ancestor", parent: "sidos" },
  { id: "beansidhe", form: "bean sí", gloss: "woman of the mound", lang: "Irish", kind: "ancestor", parent: "sid" },
  { id: "banshee", form: "banshee", kind: "modern", parent: "beansidhe" },
  { id: "eistedd", form: "eistedd", gloss: "to sit", lang: "Welsh", kind: "ancestor" },
  { id: "eisteddfodw", form: "eisteddfod", gloss: "sitting together", lang: "Welsh", kind: "ancestor", parent: "eistedd" },
  { id: "eisteddfod", form: "Eisteddfod", gloss: "poets and musicians compete", kind: "modern", parent: "eisteddfodw" },
  { id: "upanisad", form: "upa-ni-ṣad", gloss: "a sitting down beside", lang: "Sanskrit", kind: "ancestor" },
  { id: "upanishad", form: "Upanishad", gloss: "teachings on reality and self", kind: "modern", parent: "upanisad" },
];
