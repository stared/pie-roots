// *sed- 'to sit'. Data from root_trees.md (exploration tier).
// Time strata: every node sits at its era's depth — PIE, the
// proto-languages, antiquity, the middle ages, English at the bottom —
// so the settling is datable, not decorative. One word per node; linking
// forms are intermediate NODES (sedēre → possidēre → possess); notes are
// only the gloss · language of the node's own form. x-columns hand-tuned.

export interface SedNode {
  id: string;
  form: string;
  /** gloss · language of this form — non-English forms only */
  note?: string;
  kind: "proto" | "ancestor" | "modern";
  x: number;
  /** moderns rest in the English stratum; ancestors carry their era depth */
  y?: number;
  /** omitted = child of the root */
  parent?: string;
  dashed?: boolean;
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
  { id: "sitjana", form: "*sitjaną", note: "to sit · Proto-Germanic", kind: "proto", x: 130, y: 350 },
  { id: "sittan", form: "sittan", note: "Old English", kind: "ancestor", x: 130, y: 780, parent: "sitjana" },
  { id: "sit", form: "sit", kind: "modern", x: 130, parent: "sittan" },
  { id: "setlaz", form: "*setlaz", note: "seat · Proto-Germanic", kind: "proto", x: 222, y: 410 },
  { id: "setl", form: "setl", note: "Old English", kind: "ancestor", x: 222, y: 850, parent: "setlaz" },
  { id: "settle", form: "settle", kind: "modern", x: 222, parent: "setl" },
  { id: "satjana", form: "*satjaną", note: "to make sit · Proto-Germanic", kind: "proto", x: 314, y: 350 },
  { id: "settan", form: "settan", note: "Old English", kind: "ancestor", x: 314, y: 780, parent: "satjana" },
  { id: "set", form: "set", kind: "modern", x: 314, parent: "settan" },
  { id: "ersetzen", form: "ersetzen", note: "to replace · German", kind: "ancestor", x: 406, y: 870, parent: "satjana" },
  { id: "ersatz", form: "ersatz", kind: "modern", x: 406, parent: "ersetzen" },
  { id: "sotam", form: "*sōtam", note: "what settles · Proto-Germanic", kind: "proto", x: 498, y: 410 },
  { id: "sot", form: "sōt", note: "Old English", kind: "ancestor", x: 498, y: 780, parent: "sotam" },
  { id: "soot", form: "soot", kind: "modern", x: 498, parent: "sot" },
  { id: "nestaz", form: "*nestaz", note: "nest · Proto-Germanic", kind: "proto", x: 590, y: 350 },
  { id: "nest", form: "nest", kind: "modern", x: 590, parent: "nestaz" },
  { id: "saeti", form: "sæti", note: "seat · Old Norse", kind: "ancestor", x: 685, y: 850 },
  { id: "seat", form: "seat", kind: "modern", x: 685, parent: "saeti" },

  // Latin
  { id: "sedere", form: "sedēre", note: "to sit · Latin", kind: "ancestor", x: 950, y: 520 },
  { id: "sedes", form: "sēdēs", note: "seat · Latin", kind: "ancestor", x: 790, y: 600, parent: "sedere" },
  { id: "sie", form: "sie(d)", note: "Old French", kind: "ancestor", x: 790, y: 850, parent: "sedes" },
  { id: "see", form: "see (bishop’s)", kind: "modern", x: 790, parent: "sie" },
  { id: "possidere", form: "possidēre", note: "potis + sedēre ‘to sit as master’ · Latin", kind: "ancestor", x: 900, y: 680, parent: "sedere" },
  { id: "possess", form: "possess", kind: "modern", x: 900, parent: "possidere" },
  { id: "sedare", form: "sēdāre", note: "to settle, to calm · Latin", kind: "ancestor", x: 1010, y: 600, parent: "sedere" },
  { id: "sedate", form: "sedate", kind: "modern", x: 1010, parent: "sedare" },
  { id: "sege", form: "sege", note: "seat · Old French", kind: "ancestor", x: 1110, y: 850, parent: "sedere" },
  { id: "siege", form: "siege", kind: "modern", x: 1110, parent: "sege" },
  { id: "assise", form: "assise", note: "the court’s sitting · Old French", kind: "ancestor", x: 1200, y: 780, parent: "sedere" },
  { id: "size", form: "size", kind: "modern", x: 1200, parent: "assise" },
  { id: "nidus", form: "nīdus", note: "nest · Latin", kind: "ancestor", x: 1335, y: 600 },
  { id: "niais", form: "niais", note: "nestling falcon · Old French", kind: "ancestor", x: 1290, y: 850, parent: "nidus" },
  { id: "eyas", form: "eyas", kind: "modern", x: 1290, parent: "niais" },
  { id: "nidicare", form: "*nīdicāre", note: "to nest · Vulgar Latin", kind: "proto", x: 1380, y: 780, parent: "nidus", dashed: true },
  { id: "niche", form: "niche", kind: "modern", x: 1380, parent: "nidicare", dashed: true },

  // Greek
  { id: "hedra", form: "ἕδρα", note: "seat · Greek", kind: "ancestor", x: 1540, y: 520 },
  { id: "ephedra", form: "ἐφέδρα", note: "the sitting-upon plant · Greek", kind: "ancestor", x: 1480, y: 680, parent: "hedra" },
  { id: "ephedrine", form: "ephedrine", kind: "modern", x: 1480, parent: "ephedra" },
  { id: "kathedra", form: "καθέδρα", note: "a sitting-down · Greek", kind: "ancestor", x: 1580, y: 620, parent: "hedra" },
  { id: "chaiere", form: "chaiere", note: "chair, throne · Old French", kind: "ancestor", x: 1580, y: 880, parent: "kathedra" },
  { id: "chair", form: "chair", kind: "modern", x: 1580, parent: "chaiere" },
  { id: "synedrion", form: "συνέδριον", note: "a sitting-together · Greek", kind: "ancestor", x: 1680, y: 690, parent: "hedra" },
  { id: "sanhedrin_he", form: "sanhedrīn", note: "the great council · Hebrew", kind: "ancestor", x: 1680, y: 850, parent: "synedrion" },
  { id: "sanhedrin", form: "Sanhedrin", kind: "modern", x: 1680, parent: "sanhedrin_he" },

  // Celtic, Welsh, Sanskrit
  { id: "sidos", form: "*sīdos", note: "seat; mound · Proto-Celtic", kind: "proto", x: 1780, y: 360 },
  { id: "sid", form: "síd", note: "fairy mound · Old Irish", kind: "ancestor", x: 1780, y: 740, parent: "sidos" },
  { id: "beansidhe", form: "bean sídhe", note: "woman of the mound · Irish", kind: "ancestor", x: 1780, y: 910, parent: "sid" },
  { id: "banshee", form: "banshee", kind: "modern", x: 1780, parent: "beansidhe" },
  { id: "eistedd", form: "eistedd", note: "a sitting; session · Welsh", kind: "ancestor", x: 1870, y: 850 },
  { id: "eisteddfod", form: "Eisteddfod", kind: "modern", x: 1870, parent: "eistedd" },
  { id: "upanisad", form: "upa-ni-ṣad", note: "a sitting near the teacher · Sanskrit", kind: "ancestor", x: 1990, y: 600 },
  { id: "upanishad", form: "Upanishad", kind: "modern", x: 1990, parent: "upanisad" },
];
