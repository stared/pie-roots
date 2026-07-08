// The curated star-of-star dataset. Every claim here is sourced in research.md
// (repo root); statuses follow its epistemic note: `disputed` marks links with
// competing published derivations. Notes attribute claims to their owners —
// this file maps scholarship, not certainty.

export type NodeKind = "root" | "reconstructed" | "attested" | "modern";
export type SenseId = "star" | "shape" | "science" | "fate" | "name";

export interface EtymNode {
  id: string;
  form: string;
  translit?: string; // romanization for non-Latin scripts
  lang: string;
  gloss: string;
  kind: NodeKind;
  sense?: SenseId; // drives color only, never structure
  disputed?: boolean; // the link from the PARENT is contested
  important?: boolean; // labeled even when zoomed out
  note?: string;
  quote?: string;
  refs?: number[];
  children?: EtymNode[];
}

// Stellar-temperature palette: every sense color is a color a star can be
// (blue → white → gold → orange → red); no greens, no violets on this sky.
export const SENSES: Record<SenseId, { label: string; color: string }> = {
  star: { label: "the star itself", color: "#f4f1e8" },
  science: { label: "measuring the sky", color: "#92b4ff" },
  shape: { label: "star-shaped things", color: "#ffe08a" },
  name: { label: "names & gods", color: "#ffb45e" },
  fate: { label: "fate & omens", color: "#ff7a5c" },
};

export const ROOT_COLOR = "#fff6d8";

export const TREE: EtymNode = {
  id: "h2ster",
  form: "*h₂stḗr",
  lang: "Proto-Indo-European",
  gloss: "star",
  kind: "root",
  note: "Probably ‘the glowing one’: *h₂e(h₁)s- ‘to burn, glow’ + the agent suffix *-tḗr (Wiktionary, following Ringe) — though even that reading is hedged. The old idea that the word was borrowed from Semitic Ištar has long been doubted; Wilson-Wright (2015) argues the loan ran the other way.",
  quote:
    "Apparently from *h₂e(h₁)s- (“to burn, glow”) + *-tḗr (agentive suffix). — Wiktionary",
  refs: [1, 2, 3, 4],
  children: [
    // ——— Germanic ———
    {
      id: "pgmc-sterno",
      form: "*sternǭ / *sterrô",
      lang: "Proto-Germanic",
      gloss: "star",
      kind: "reconstructed",
      note: "Kroonen (EDPG 478, s.v. *ster(r)a/ōn-) derives the doubled -rr- variant via Kluge’s law.",
      refs: [5, 30],
      children: [
        {
          id: "oe-steorra",
          form: "steorra",
          lang: "Old English",
          gloss: "star",
          kind: "attested",
          refs: [6],
          children: [
            {
              id: "star",
              form: "star",
              lang: "English",
              gloss: "star",
              kind: "modern",
              sense: "star",
              important: true,
              refs: [7],
            },
            {
              id: "sterling",
              form: "sterling",
              lang: "English",
              gloss: "the silver penny; the pound",
              kind: "modern",
              sense: "shape",
              disputed: true,
              note: "Much-discussed, none of it decisive. The OED prefers *steorling ‘little star’, after stars on some Norman pennies — but etymonline notes starred coins were not especially common. Wiktionary carries *stēre ‘strong, stout’ as the alternative; ‘Easterling’ is “considered long exploded”. Watkins does not list it under the star root at all.",
              refs: [8],
            },
          ],
        },
        {
          id: "de-stern",
          form: "Stern",
          lang: "German",
          gloss: "star",
          kind: "modern",
          sense: "star",
          important: true,
          refs: [9],
        },
        {
          id: "on-stjarna",
          form: "stjarna",
          lang: "Old Norse",
          gloss: "star",
          kind: "attested",
          refs: [10],
          children: [
            {
              id: "me-sterne",
              form: "sterne",
              lang: "Middle English",
              gloss: "star (borrowed from Norse)",
              kind: "attested",
              note: "A second, parallel route of the same Germanic word into England — this time by ship, with the Danelaw.",
              refs: [11],
              children: [
                {
                  id: "starn",
                  form: "starn",
                  lang: "Scots",
                  gloss: "star",
                  kind: "modern",
                  sense: "star",
                  refs: [11],
                },
              ],
            },
          ],
        },
        {
          id: "got-stairno",
          form: "𐍃𐍄𐌰𐌹𐍂𐌽𐍉",
          translit: "stairnō",
          lang: "Gothic",
          gloss: "star",
          kind: "attested",
          important: true,
          note: "The earliest attested Germanic form (4th century). Crimean Gothic, recorded a millennium later, still had stein.",
          refs: [12],
        },
      ],
    },
    // ——— Italic / Latin / Romance ———
    {
      id: "pit-sterla",
      form: "*stērlā",
      lang: "Proto-Italic",
      gloss: "little star (diminutive)",
      kind: "reconstructed",
      note: "A diminutive of the root; the -rl- assimilated regularly to -ll-. Latin kept no trace of the undiminished word — the ‘little star’ became the only star.",
      refs: [13],
      children: [
        {
          id: "la-stella",
          form: "stēlla",
          lang: "Latin",
          gloss: "star; starfish; pupil of the eye",
          kind: "attested",
          important: true,
          refs: [14],
          children: [
            {
              id: "la-stellaris",
              form: "stēllāris",
              lang: "Late Latin",
              gloss: "of the stars",
              kind: "attested",
              refs: [15],
              children: [
                {
                  id: "stellar",
                  form: "stellar",
                  lang: "English",
                  gloss: "of the stars; outstanding (1883)",
                  kind: "modern",
                  sense: "science",
                  important: true,
                  refs: [16],
                  children: [
                    {
                      id: "stellarator",
                      form: "stellarator",
                      lang: "English",
                      gloss: "a machine built to make a star",
                      kind: "modern",
                      sense: "science",
                      note: "A plasma-confinement fusion device (1951) — named for doing what stars do.",
                      refs: [17],
                    },
                  ],
                },
              ],
            },
            {
              id: "interstellar",
              form: "interstellar",
              lang: "English",
              gloss: "between the stars (1620s)",
              kind: "modern",
              sense: "science",
              refs: [18],
            },
            {
              id: "la-constellatio",
              form: "cōnstellātiō",
              lang: "Late Latin",
              gloss: "a set of stars (astrological)",
              kind: "attested",
              refs: [19],
              children: [
                {
                  id: "constellation",
                  form: "constellation",
                  lang: "English",
                  gloss: "a group of stars",
                  kind: "modern",
                  sense: "fate",
                  important: true,
                  note: "Born astrological: the early-14c. sense was the configuration of planets at one’s birth (etymonline).",
                  refs: [20],
                },
              ],
            },
            {
              id: "la-stellatus",
              form: "stēllātus",
              lang: "Latin",
              gloss: "starred",
              kind: "attested",
              refs: [21],
              children: [
                {
                  id: "stellate",
                  form: "stellate",
                  lang: "English",
                  gloss: "star-shaped",
                  kind: "modern",
                  sense: "shape",
                  refs: [22],
                },
              ],
            },
            {
              id: "ml-stellificare",
              form: "stellificāre",
              lang: "Medieval Latin",
              gloss: "to turn into a star",
              kind: "attested",
              refs: [23],
              children: [
                {
                  id: "stellify",
                  form: "stellify",
                  lang: "English",
                  gloss: "to place among the stars",
                  kind: "modern",
                  sense: "fate",
                  note: "Chaucer’s word (via Middle French stellifier): “No, God forbid, to stellify me yet!” — House of Fame.",
                  refs: [23],
                },
              ],
            },
            {
              id: "la-stellio",
              form: "stelliō",
              lang: "Latin",
              gloss: "starred gecko; a knave",
              kind: "attested",
              refs: [24],
              children: [
                {
                  id: "stellionate",
                  form: "stellionate",
                  lang: "English",
                  gloss: "fraud without a special name (law)",
                  kind: "modern",
                  sense: "shape",
                  note: "Star → star-spotted lizard → crafty person → stellionatus, the Roman jurists’ catch-all for fraud — still on the books in Scots law.",
                  refs: [25],
                },
              ],
            },
            {
              id: "stella-name",
              form: "Stella",
              lang: "English",
              gloss: "given name: ‘star’",
              kind: "modern",
              sense: "name",
              refs: [26],
            },
            {
              id: "of-estoile",
              form: "estoile",
              lang: "Old French",
              gloss: "star",
              kind: "attested",
              refs: [27],
              children: [
                {
                  id: "fr-etoile",
                  form: "étoile",
                  lang: "French",
                  gloss: "star",
                  kind: "modern",
                  sense: "star",
                  important: true,
                  refs: [28],
                },
                {
                  id: "estoile",
                  form: "estoile",
                  lang: "English",
                  gloss: "heraldic star with wavy rays",
                  kind: "modern",
                  sense: "shape",
                  refs: [27],
                },
              ],
            },
            {
              id: "oc-estela",
              form: "estela",
              lang: "Occitan",
              gloss: "star",
              kind: "attested",
              refs: [29],
              children: [
                {
                  id: "estelle",
                  form: "Estelle",
                  lang: "English",
                  gloss: "given name",
                  kind: "modern",
                  sense: "name",
                  note: "Via French, from a 3rd-century martyr’s name — not an English respelling of Stella (Wiktionary).",
                  refs: [29],
                },
              ],
            },
            {
              id: "es-estrella",
              form: "estrella",
              lang: "Spanish",
              gloss: "star",
              kind: "modern",
              sense: "star",
              refs: [31],
            },
          ],
        },
      ],
    },
    // ——— Hellenic ———
    {
      id: "gk-aster",
      form: "ἀστήρ",
      translit: "astḗr",
      lang: "Ancient Greek",
      gloss: "star; illustrious person; starfish",
      kind: "attested",
      important: true,
      note: "Already in antiquity the word meant a famous person and a starfish — metaphors English would reinvent millennia later.",
      refs: [32],
      children: [
        {
          id: "gk-asteriskos",
          form: "ἀστερίσκος",
          translit: "asterískos",
          lang: "Ancient Greek",
          gloss: "little star",
          kind: "attested",
          refs: [33],
          children: [
            {
              id: "asterisk",
              form: "asterisk",
              lang: "English",
              gloss: "the ‘little star’ sign *",
              kind: "modern",
              sense: "shape",
              important: true,
              note: "Via Late Latin asteriscus — which, unchanged, also names a small bone of the inner ear.",
              refs: [34],
            },
          ],
        },
        {
          id: "asteroid",
          form: "asteroid",
          lang: "English",
          gloss: "star-like body (1802)",
          kind: "modern",
          sense: "science",
          important: true,
          note: "Greek ἀστεροειδής ‘star-like’, introduced by William Herschel in 1802 for the new not-quite-planets — the word that looks like a modern coinage and is built of the oldest parts.",
          refs: [35],
        },
        {
          id: "asterism",
          form: "asterism",
          lang: "English",
          gloss: "a star pattern (1590s)",
          kind: "modern",
          sense: "shape",
          refs: [36],
        },
        {
          id: "la-aster",
          form: "astēr",
          lang: "Latin",
          gloss: "star; the aster plant",
          kind: "attested",
          refs: [37],
          children: [
            {
              id: "aster",
              form: "aster",
              lang: "English",
              gloss: "the flower with radiate heads (1706)",
              kind: "modern",
              sense: "shape",
              refs: [38],
            },
          ],
        },
        {
          id: "gk-astron",
          form: "ἄστρον",
          translit: "ástron",
          lang: "Ancient Greek",
          gloss: "star, constellation",
          kind: "attested",
          important: true,
          refs: [39],
          children: [
            {
              id: "la-astrum",
              form: "astrum",
              lang: "Latin",
              gloss: "star, celestial body",
              kind: "attested",
              refs: [40],
              children: [
                {
                  id: "astral",
                  form: "astral",
                  lang: "English",
                  gloss: "of the stars (c. 1600)",
                  kind: "modern",
                  sense: "fate",
                  refs: [41],
                },
                {
                  id: "it-disastro",
                  form: "disastro",
                  lang: "Italian",
                  gloss: "calamity — an ill-starred event",
                  kind: "attested",
                  refs: [42],
                  children: [
                    {
                      id: "fr-desastre",
                      form: "désastre",
                      lang: "French",
                      gloss: "disaster (1560s)",
                      kind: "attested",
                      refs: [43],
                      children: [
                        {
                          id: "disaster",
                          form: "disaster",
                          lang: "English",
                          gloss: "a calamity (1590s)",
                          kind: "modern",
                          sense: "fate",
                          important: true,
                          note: "dis- + astro: an event happening under a bad star. The astrology is fossilized in the spelling.",
                          refs: [44],
                        },
                      ],
                    },
                  ],
                },
              ],
            },
            {
              id: "gk-astronomia",
              form: "ἀστρονομία",
              translit: "astronomía",
              lang: "Ancient Greek",
              gloss: "star-arranging",
              kind: "attested",
              refs: [45],
              children: [
                {
                  id: "astronomy",
                  form: "astronomy",
                  lang: "English",
                  gloss: "the science of the stars (c. 1200)",
                  kind: "modern",
                  sense: "science",
                  important: true,
                  note: "Astronomy and astrology were one art until the 17th century; the split of the words completed only around then (etymonline).",
                  refs: [46],
                },
              ],
            },
            {
              id: "gk-astrologia",
              form: "ἀστρολογία",
              translit: "astrología",
              lang: "Ancient Greek",
              gloss: "star-account",
              kind: "attested",
              refs: [47],
              children: [
                {
                  id: "astrology",
                  form: "astrology",
                  lang: "English",
                  gloss: "divination by the stars",
                  kind: "modern",
                  sense: "fate",
                  important: true,
                  refs: [48],
                },
              ],
            },
            {
              id: "gk-astrolabos",
              form: "ἀστρολάβος",
              translit: "astrolábos",
              lang: "Ancient Greek",
              gloss: "star-taker (instrument)",
              kind: "attested",
              refs: [49],
              children: [
                {
                  id: "astrolabe",
                  form: "astrolabe",
                  lang: "English",
                  gloss: "instrument for taking star altitudes (mid-14c.)",
                  kind: "modern",
                  sense: "science",
                  note: "ἄστρον + λαμβάνειν ‘to take’: the instrument’s name says what it does — it takes the stars.",
                  refs: [50],
                },
              ],
            },
            {
              id: "astro",
              form: "astro-",
              lang: "English",
              gloss: "combining form (productive since the 18c.)",
              kind: "modern",
              sense: "science",
              refs: [51],
              children: [
                {
                  id: "astronaut",
                  form: "astronaut",
                  lang: "English",
                  gloss: "star sailor (1929; popularized 1961)",
                  kind: "modern",
                  sense: "science",
                  important: true,
                  note: "Literally ‘star-sailor’, astro- + -naut. Percy Greg had already named a fictional spaceship “Astronaut” in 1880 — half a century before anyone could be one.",
                  refs: [52],
                },
              ],
            },
          ],
        },
      ],
    },
    // ——— Indo-Iranian ———
    {
      id: "pii-hsta",
      form: "*Hstā́",
      lang: "Proto-Indo-Iranian",
      gloss: "star",
      kind: "reconstructed",
      refs: [53],
      children: [
        {
          id: "sa-str",
          form: "स्तृ",
          translit: "stṛ́",
          lang: "Sanskrit (Vedic)",
          gloss: "star",
          kind: "attested",
          refs: [54],
          children: [
            {
              id: "sa-tara",
              form: "तारा",
              translit: "tā́rā",
              lang: "Sanskrit",
              gloss: "star; pupil of the eye; the goddess Tārā",
              kind: "attested",
              important: true,
              note: "A Vedic contraction of stṛ́ — the s- vanished inside Sanskrit (Mayrhofer, EWAia I 643). Within the Sanskrit tradition the goddess’s name was re-read as ‘she who carries across’ (√tṝ) — a folk etymology.",
              refs: [55],
              children: [
                {
                  id: "tara",
                  form: "Tara",
                  lang: "English",
                  gloss: "the Buddhist / Hindu deity name",
                  kind: "modern",
                  sense: "name",
                  note: "Only the deity name carries the Sanskrit star. The common given name Tara is from Irish Teamhair ‘high place’ (the Hill of Tara, popularized by Gone with the Wind) — per Wiktionary.",
                  refs: [56],
                },
              ],
            },
          ],
        },
        {
          id: "ae-star",
          form: "𐬯𐬙𐬀𐬭",
          translit: "star-",
          lang: "Avestan",
          gloss: "star",
          kind: "attested",
          refs: [57],
        },
        {
          id: "op-star",
          form: "𐎠𐎿𐎫𐎼",
          translit: "star-",
          lang: "Old Persian",
          gloss: "star",
          kind: "attested",
          refs: [58],
          children: [
            {
              id: "pal-starag",
              form: "stārag",
              lang: "Middle Persian",
              gloss: "star",
              kind: "attested",
              refs: [58],
              children: [
                {
                  id: "fa-setare",
                  form: "ستاره",
                  translit: "setāre",
                  lang: "Persian",
                  gloss: "star",
                  kind: "modern",
                  sense: "star",
                  important: true,
                  refs: [58],
                  children: [
                    {
                      id: "esther",
                      form: "Esther",
                      lang: "English",
                      gloss: "given name",
                      kind: "modern",
                      sense: "name",
                      disputed: true,
                      important: true,
                      note: "Persian ‘star’ (etymonline) or Akkadian Ištar (Wiktionary’s alternative) — and the two readings blur, since even a Persian star-name would honour the goddess. Deeper down it flips: Ištar’s own name has no Semitic etymology, and Wilson-Wright (2015) argues Semitic borrowed it from Indo-European.",
                      refs: [59, 4],
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
    // ——— Anatolian ———
    {
      id: "hit-hasterz",
      form: "𒄩𒀸𒋼𒅕𒍝",
      translit: "ḫašterz",
      lang: "Hittite",
      gloss: "star",
      kind: "attested",
      important: true,
      note: "The oldest written form in the family — and its initial ḫ- preserves the laryngeal *h₂-, the standard argument that the word is inherited Indo-European rather than a loan from Ishtar’s name.",
      refs: [60],
    },
    // ——— Celtic ———
    {
      id: "pc-stera",
      form: "*sterā",
      lang: "Proto-Celtic",
      gloss: "star",
      kind: "reconstructed",
      refs: [61],
      children: [
        {
          id: "cy-seren",
          form: "seren",
          lang: "Welsh",
          gloss: "star (singulative of sêr)",
          kind: "modern",
          sense: "star",
          important: true,
          refs: [62],
        },
        {
          id: "sga-ser",
          form: "ser",
          lang: "Old Irish",
          gloss: "star",
          kind: "attested",
          disputed: true,
          note: "Attested exactly once, and doubly hedged: eDIL prints the headword as “? ser” and suggests it may be a loan from Welsh (Celtica iii 170–71; LEIA S-90).",
          refs: [63],
        },
      ],
    },
    // ——— Armenian ———
    {
      id: "xcl-astl",
      form: "աստղ",
      translit: "astł",
      lang: "Old Armenian",
      gloss: "star; starfish; asterisk",
      kind: "attested",
      important: true,
      note: "Modern Armenian astġ also means ‘celebrity’ — the same metaphors, reinvented. Astłik, the Armenian dawn-and-love goddess, is ‘little star’.",
      refs: [64],
    },
    // ——— Tocharian ———
    {
      id: "txb-scirye",
      form: "ścirye",
      lang: "Tocharian B",
      gloss: "star",
      kind: "attested",
      note: "The easternmost branch: the same word, carried to the Tarim Basin.",
      refs: [65],
    },
  ],
};

export function nodeById(): Map<string, EtymNode> {
  const map = new Map<string, EtymNode>();
  (function walk(n: EtymNode) {
    if (map.has(n.id)) throw new Error(`[etymology] duplicate id: ${n.id}`);
    map.set(n.id, n);
    n.children?.forEach(walk);
  })(TREE);
  return map;
}

export const NODE_BY_ID = nodeById();

export function senseColor(n: EtymNode): string {
  if (n.kind === "root") return ROOT_COLOR;
  return SENSES[n.sense ?? "star"].color;
}
