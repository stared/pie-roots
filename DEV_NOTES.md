# DEV_NOTES — representation, design, story

Everything about *how the data is shown* lives here. `research.md` is data only: etymological facts, epistemic status, sources.

## Relationship to tree-of-tree

Companion piece to [tree-of-tree](https://github.com/stared/tree-of-tree) (local checkout: `../tree-of-tree-claude`, live at https://p.migdal.pl/tree-of-tree/). The tree of 'tree' was tree-shaped; the star of 'star' is star-shaped. Fresh codebase (decided — no code fork), but mirror its proven contracts:

- typed `EtymNode`-style data file (form, translit, lang, gloss, kind, sense, disputed, note, quote, refs, children)
- Markdown story steps with frontmatter `focus: [nodeIds]`, validated against the data at startup
- `references.ts`: id → URL, human labels derived from the URL
- separate poster render path (static image for r/dataisbeautiful)

## Design brief

Radial star layout: **root in the center**, **black background** (night sky), **nodes as star glyphs**.

- **Eight arms** fall naturally out of the eight branches (research.md §3) — an **eight-pointed star**, which is also the Star of Ishtar's shape: a quiet in-joke given the loan controversy (research.md §4.3). Arm weights are asymmetric (Greek ≫ Armenian); options: (a) embrace uneven flares, (b) angle-budget arms by subtree size, (c) group the four single-word arms into a shared sector.
- **Radial semantics**: root at center; generations as concentric rings (PIE → proto-languages → attested ancient → modern); **English words at the outer rim** = the points of the star. Time flows outward — like light leaving a star.
- **Node glyphs**: star shapes with meaning — e.g. number of points or fill by `kind` (reconstructed = hollow/dashed outline star, attested = filled, modern English = brightest/largest); `important` nodes could twinkle subtly. Root as the biggest star (or a black-hole-like void with a corona — it's a reconstruction, never attested).
- **Palette on black**: sense colors must survive dark bg — a star-temperature palette is tempting (blue-white / white / yellow / orange / red like stellar classes: another pun, "stellar classification"). Text: off-white; avoid pure #fff on pure #000.
- **Label placement**: radial layouts fight labels; options: labels along the ray angle (rotated, flipped on the left half) vs. horizontal with leader lines. Either way a label de-collision pass in polar coordinates will be needed.
- **Open questions for the build round**: how literal the "star polygon" silhouette should be vs. organic radial tree; whether chapters rotate/zoom the star (polar camera framing); poster framing; whether the look-alike roots get tiny satellite mini-stars in a corner.

## Representation decisions

- **Attribute, don't assert**: detail panels present claims with their owners ("Beekes derives…", "Wiktionary, following Ringe…"), never bare facts — all sources are human and fallible, and the chart should read as a map of scholarship, not of certainty.
- **Disputed etymologies** (sterling, Esther): drawn as **dashed edges**, with the competing positions in the detail panel.
- **The root's own origin** (research.md §4.3): **no drawn parent edge** — drawn edges mean *descent from the root*, nothing else. The hedged "glower" derivation and the Ishtar direction-of-borrowing controversy go into the center node's detail panel and the story chapters. Prose metaphor available: you can't see into a star's core — below the root, reconstruction goes opaque. (An "ember inside the star" visual — \*h₂eh₁s- as a faint glow inside the center — is a possible flourish, only if clearly marked as conjecture.)
- **Unrelated look-alikes** (Balto-Slavic zvezda; stare/stark/starve; street/strategy; sterile): **prose-only chapter, no nodes, no visual gap** — same treatment as Baum in the tree-of-tree "Not all PIE trees are related" chapter.
- **`important` nodes** (labeled when zoomed out, draft): star, stellar, constellation, Stella, asterisk, asteroid, disaster, astronomy, astrology, astronaut, Tara, Esther, Stern, staírnō, seren, ḫašterz, astł.- **Sense buckets → color** (by meaning, never by language), per the draft categories in research.md §3.
- Rhetorical beat to keep for the look-alikes chapter: *asteroid* looks like it should be a false friend and is genuine; *stare* feels star-related and is not.

## Story arc (draft — rethought 2026-07-08, second pass)

**Organizing principle: non-obviousness.** A word that visibly contains "star" (stardom, starfish, superstar, starlight…) teaches the reader nothing — no reveal, no story. The test for every chapter beat: *would you be surprised that this word does — or does not — have a star in it?* Two kinds of surprise carry the whole piece:

- **Hidden stars**: words people use daily with no idea a star is inside (disaster, étoile, Esther…).
- **Fake stars**: words that loudly flash "star" and are unrelated (starve, strategy, Zoroaster…).

Transparent star-compounds stay in the chart as small leaves but get NO narrative time. Chapters still light cross-arm constellations (the mechanic from the first pass survives; the content criterion changes).

1. **A quiz, not a lecture** (hook) — six words: *disaster, starve, étoile, strategy, Esther, stark*. Which contain a star? Every letter-based guess is wrong — the spelling misleads in both directions. That inversion is the thesis of the whole chart: kinship is descent, not resemblance.
2. **The glower** — the center: \*h₂stḗr, probably 'the one that glows' (\*h₂eh₁s- 'burn' + \*-tḗr, hedged); below the root, reconstruction goes opaque.
3. **Same word, unrecognizable** — cognates that sound nothing like star yet are the same word run through regular sound change: Hittite ḫašterz, Welsh seren, Armenian astł, Ossetian стъалы, Tocharian ścirye, Sanskrit tā́rā (the s- lost in a Vedic contraction). The arms of the star are disguises.
4. **stella in disguise** — the Latin diminutive ('little star') hiding inside étoile and estrella, and re-entering English where nobody sees it: Estelle, the heraldic estoile, the ballet étoile.
5. **The hidden stars of Greek** — disaster = dis-astro, 'ill-starred'; the astrolabe, 'star-taker'; asterisk, 'little star', whose Latin twin asteriscus now names a bone of the inner ear.
6. **The strangest paths** — where the star ended up with no sky in sight: the pupil of the eye (Sanskrit tā́rā and Latin stēlla both); the starred gecko stelliō that became a knave and then stellionate, fraud, in Scots law; the stellarator, a machine for making a star.
7. **Names with stars inside** — Esther: one name, two origins (Persian 'star' or Ishtar), and they are not independent; Tara: the deity name hides a star, the common given name (Irish Temair) does not — a double trap.
8. **The Ishtar question** — the oldest attestation, cuneiform ḫašterz, and what its ḫ- proves: the family inherited the word, it is not Ishtar's; the live twist is the opposite direction — Semitic may have borrowed it from Indo-European (Wilson-Wright 2015). Unresolved.
9. **Hidden constellation, wrong root** — desire and consider carry Latin's OTHER star word, sīdus 'constellation', inside them: star-meaning hidden in plain English, but a different family entirely. And Balto-Slavic shows the mirror case: same sky, different word (zvezda, root ĝhu̯oigʷ- 'shine').
10. **Fake stars** — starve, stark, stern, stare, sterile, street, stratum, strategy, sitar, Zoroaster, poetaster: five different roots and suffixes, none of them star. The reverse trap closes the loop: asteroid looks coined-and-fake and is the genuine article.
11. **Notes** — sources, method, credits.

(Each chapter maps to a set of focus-node ids for the scrollytelling.)
