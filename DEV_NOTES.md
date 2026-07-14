# DEV_NOTES — representation, design, story

## Backlog (v2 round done 2026-07-08; iterate from here)

Verify visually with `pnpm dev` + `node scripts/shoot.mjs` (screenshots; URL env var overrides port).

- Label de-collision — collisions remain at branch boundaries (Gothic × Latin arm; the astro- cluster; the Iranian chain near center); needs a polar relaxation pass.
- Sector weighting — pure leaf-count leaves an angular gap bottom-left; consider min-angles for small arms or grouping the four single-word arms.
- Star silhouette — current shape is organic-radial; decide how literal the star polygon should be (arm-length flare by subtree size?).
- Fonts — exotic scripts now transliteration-first on the chart (see representation decisions); original scripts could get Noto webfont subsets in the detail panel.
- Mobile — only a crude stacked layout so far; needs a real pass.
- Dataset — decide the pending §7 items in research.md (Esther/sterling in-or-out is IN as disputed for now; rare-words cutoff; Tara node kept as deity name); pull verbatim specialist quotes (the three deep dives discussed).
- Poster path — static PNG render for r/dataisbeautiful, later.
- Deploy — GitHub repo + Pages workflow + OG image, when ready.

Everything about *how the data is shown* lives here. `research.md` is data only: etymological facts, epistemic status, sources.

## Root explorations (`src/roots/`, settled 2026-07-13)

Four candidate roots (data from `root_trees.md`, exploration tier) — \*weyd-, \*bʰeh₂-, \*sed-, \*kʷel- — each with a **shaped layout carried by word placement plus one subtle structural guide**:

- `See.tsx` — \*weyd-: **elliptical polar coordinates** (KX/KY map (a, r) into the wide eye; the rim is the r = const ellipse, no per-angle clamping) with **straight-segment links**. All English words sit on one rim band (r = 435) so the ellipse fills evenly; unbranched chains are straight lines with their intermediate nodes ON the line. Ἀΐδης → Hades is an ordinary dashed-from-root chain inside the eye.
- `Speak.tsx` — \*bʰeh₂-: a fan rippling rightward, faint arcs marking the generations; dead branches as dashed stubs; the 'shine' homophone lives in the dek only.
- `Sit.tsx` — \*sed-: **time strata** — every node sits at its era's depth (PIE / proto-languages / antiquity / middle ages / English), faint hairlines between eras with small-caps era labels in each band's lower-left; English words rest as bare leaves in the bottom stratum.
- `Turn.tsx` — \*kʷel-: faint concentric rims; PIE formations inner, ancestors middle, English words on the outer rim.

**Chart rules (Piotr, 2026-07-12/13, hard-won over several rounds):**

- *Scenery is fluff, layout is fair game.* No painted props (eyeball fill, speaker glyph, arches). **One subtle guide structure is welcome** — faint rims, ripple arcs, strata hairlines, an almond outline (`.t-guide`), never filled.
- *Contrast hierarchy is strict*: words, links, and dots must clearly dominate; guides whisper. No "grayscale hell" where content and decoration blur together.
- *One word per node.* No `cycle · encyclopedia` combo labels. Prune repetitive same-stem derivatives (view but not interview; ban but not banns).
- *Linking forms are NODES, not footnotes.* `videō → invidia → envy` is drawn as a chain; a note like "← invidia…" under an English word is wrong. Notes carry only the gloss · language of the node's own form; English leaves stand bare.
- *No `?` in word forms or notes* — a dashed link alone marks a disputed step.
- *Dashed means the STEP is uncertain in the sources* — not mere borrowing. Loans drawn flatly by Wiktionary (guide, guise, historia, Veda) are solid; dashes mark hedged derivations (fās, bandito, niche, the two tele-'s, *kʷol-so-, *πολίδιον→pulley). The Hades line is dashed for a different reason: it is not a descent edge at all.
- *Transmission steps are drawn only when the surface changed en route.* Modern learned words connect straight to their classical formation (teleology < τέλος, ephedrine < ἐφέδρα, symphony < φωνή); Latin/French carrier steps appear only where the word visibly transformed (blame's blasphēmāre→blasmer, anthem's antefn, chair's chaiere).
- *Data is structured*: every node carries `gloss` and `lang` as separate fields; the "gloss · language" note line is composed at render time (`noteLine` in types.ts), never baked into data strings.
- *Every non-English node carries a gloss* — a bare language tag reads as missing data.
- *Each dek carries a sound-law key* answering "why doesn't it sound like the root": Greek w-loss (see), bʰ→f/φ (speak), s→h (sit), the kʷ→π/τ/hw split (turn).
- *No second-class nodes*: branches that die before English are ordinary nodes (ring + form/gloss/lang), not floating stub text — near-invisible dotted connectors read as broken.
- *Speak labels are a tight three-line block beside the node* (form / gloss / language) — straddling the node left a dead gap, and one-line "gloss · language" tails caused most collisions; fan-head nodes whose corridors exit rightward (fārī, φημί, *bannjan; videō in see) take `labelLeft`.
- *A label must be closer to its own node than to any other* — a gloss that drifts toward a neighboring node (dru-wits' note hovering by véda) reads as belonging to it. Fan-head ancestors sit at the angular centroid of their subtree, close to the root, so density stays even.
- *Same surface, different source must be legible.* When two English words share a visible element but descend from different forms (teleology's *tele-* = τέλος vs telephone's *tele-* = τῆλε; idea = ἰδέα vs idol = εἴδωλον), each gets its own source node, the pair sits adjacent, and the dek names the split — otherwise the chart reads as inconsistent.
- *A chain with no splits is a STRAIGHT LINE, its nodes ON the line.* Curvature carries no meaning, so it exists only where the tree branches: see uses straight segments with unbranched runs placed collinearly (computed on the branch-point→rim-word segment, inverted to elliptical (a, r)). Speak keeps `linkRadial` (a true generation fan — radius always dominates); sit keeps its canopy. Never hand-rolled midpoint pulls, never decorative arcs. *No line crossings*; verify every change with screenshots (`pnpm roots:shoot`).

Stack: React + TypeScript, d3-shape for link curves, typed data modules with hand-tuned positions in `src/roots/data/`, second Vite entry (`roots.html`, hash-switched views `#see #speak #sit #turn`), type-checked by `tsc -b`. Run: `pnpm roots`.

**Subtraction principle (Piotr, 2026-07-12): perfectionism is when nothing can be subtracted.** No decorative texture, no captions narrating the diagram, no per-word drift explainers on English words — the note line is reserved for non-English forms (gloss · language, per the chart-label rule). Modern English words stand bare.

## Relationship to tree-of-tree

Companion piece to [tree-of-tree](https://github.com/stared/tree-of-tree) (local checkout: `../tree-of-tree-claude`, live at https://p.migdal.pl/tree-of-tree/). The tree of 'tree' was tree-shaped; the star of 'star' is star-shaped. Fresh codebase (decided — no code fork), but mirror its proven contracts:

- typed `EtymNode`-style data file (form, translit, lang, gloss, kind, sense, disputed, note, quote, refs, children)
- Markdown story steps with frontmatter `focus: [nodeIds]`, validated against the data at startup
- `references.ts`: id → URL, human labels derived from the URL
- separate poster render path (static image for r/dataisbeautiful)

## Design brief

Radial star layout: **root in the center**, **black background** (night sky), **nodes as star glyphs**.

- **Eight arms** fall naturally out of the eight branches (research.md §3) — an **eight-pointed star**, which is also the Star of Ishtar's shape: a quiet in-joke given the loan controversy (research.md §4.3). Arm weights are asymmetric (Greek ≫ Armenian); options: (a) embrace uneven flares, (b) angle-budget arms by subtree size, (c) group the four single-word arms into a shared sector.
- **Radial semantics (decided 2026-07-08)**: root at center; **no rings** — each generation steps outward by a slightly irregular, deterministic amount (per-node wobble), so nothing sits on a shared circle and arms with deeper histories reach further. Time still flows outward; the silhouette is organic.
- **Links (decided)**: straight lines, parent to child.
- **Node glyphs**: star shapes with meaning — e.g. number of points or fill by `kind` (reconstructed = hollow/dashed outline star, attested = filled, modern English = brightest/largest); `important` nodes could twinkle subtly. Root as the biggest star (or a black-hole-like void with a corona — it's a reconstruction, never attested).
- **Palette (decided)**: stellar temperatures only — every sense color is a color a star can be: blue / blue-white / white / gold / orange / ember red. No greens, no violets. Five sense buckets (the former "stranger paths" bucket was folded into its neighbors).
- **Typography (decided)**: two-font system — serif for prose and word-forms, sans for every supporting voice (glosses, language tags, kickers, step numbers, legend, controls); real weight/size hierarchy; antialiased. On the chart: form = serif semibold, gloss = sans italic, language = sans small caps.
- **Labels (decided)**: rotated along the ray, flipped past π. English words show the form alone; every non-English word carries its meaning (first gloss clause) and its language on the chart. A de-collision pass in polar coordinates is still needed (backlog).
- **Open questions**: how literal the "star polygon" silhouette should be vs. organic radial tree; poster framing; whether the look-alike roots get tiny satellite mini-stars in a corner.

## Representation decisions

- **Attribute, don't assert — in the panel, never in the prose**: detail panels present claims with their owners ("Beekes derives…", "Wiktionary, following Ringe…") — all sources are human and fallible, and the chart should read as a map of scholarship, not of certainty. Story prose NEVER carries citation apparatus: it hedges plainly ("though even that reading is uncertain") and leaves the names to the panel.
- **Exotic scripts are transliteration-first on the chart** (Gothic, cuneiform Hittite / Old Persian, Avestan — the `TRANSLIT_FIRST` set in StarChart): system fonts mangle them; the original script lives in the detail panel. Scripts that render well (Greek, Devanagari, Armenian, Arabic) stay original-first with a transliteration line.
- **Disputed etymologies** (sterling, Esther): drawn as **dashed edges**, with the competing positions in the detail panel.
- **The root's own origin** (research.md §4.3): **no drawn parent edge** — drawn edges mean *descent from the root*, nothing else. The hedged "glower" derivation and the Ishtar direction-of-borrowing controversy go into the center node's detail panel and the story chapters. Prose metaphor available: you can't see into a star's core — below the root, reconstruction goes opaque. (An "ember inside the star" visual — \*h₂eh₁s- as a faint glow inside the center — is a possible flourish, only if clearly marked as conjecture.)
- **Unrelated look-alikes** (Balto-Slavic zvezda; stare/stark/starve; street/strategy; sterile): **prose-only chapter, no nodes, no visual gap** — same treatment as Baum in the tree-of-tree "Not all PIE trees are related" chapter.
- **`important` nodes** (labeled when zoomed out, draft): star, stellar, constellation, Stella, asterisk, asteroid, disaster, astronomy, astrology, astronaut, Tara, Esther, Stern, staírnō, seren, ḫašterz, astł.- **Sense buckets → color** (by meaning, never by language), per the draft categories in research.md §3.
- Rhetorical beat to keep for the look-alikes chapter: *asteroid* looks like it should be a false friend and is genuine; *stare* feels star-related and is not.

## Story arc (v2 — rebuilt 2026-07-08, third pass; shipped in `src/content/steps/`)

**Two principles.**

1. **Non-obviousness** (survives from the second pass): the test for every beat is *would you be surprised that this word does — or does not — have a star in it?* Transparent star-compounds (stardom, starfish…) get no narrative time.
2. **Walk through words, never talk about the walk** (new, after the v1 prose failed): each step is ONE paragraph that moves word → word → word. Titles name the content — actual words, or a concrete question ("Does Ishtar come from star?") — never the author's method or framing device ("a quiz, not a lecture" was the anti-pattern). No thesis-speak, no meta-commentary, no citations in the prose (hedges stay, plainly worded). The hook lives in the hero as a "Did you know…?" question over English words only.

The shipped ten chapters: **The star in the centre** (root) → **From steorra to star** (Germanic; star as the least-changed word) → **seren, astł, tā́rā** (cognate disguises + the Tara double take) → **Latin's little star** (stēlla → étoile/estrella → Estelle/estoile) → **Is there a star in disaster?** (Greek: disaster, asterisk, astrolabe) → **The star in your eye** (pupil, stellionate, stellarator) → **Does Ishtar come from star?** (ḫašterz's ḫ-, Wilson-Wright reversal, Esther as coda) → **Latin's other star** (sīdus hiding in consider/desire — framed as a find, never as "X is unrelated" trivia; Balto-Slavic gwiazda) → **starve, stark, strategy** (look-alikes; asteroid as the reverse trap) → **Notes**.

Hero hook: ONE short line, connections only — no negatives, no fake stars (those pay off in the closing chapter), nothing whose letters give it away (Estelle, aster, asterisk), no clause chains. The honest inventory of surprising English words is thin (disaster; disputed Esther), so the hook stays minimal rather than padded or explained.
