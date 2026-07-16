# PIE roots ✳️

Explorable etymologies of Proto-Indo-European roots — how single prehistoric
words fan out into the modern vocabulary. Companion to
[tree-of-tree](https://github.com/stared/tree-of-tree)
([live](https://p.migdal.pl/tree-of-tree/)).

**Live: [p.migdal.pl/pie-roots](https://p.migdal.pl/pie-roots/)**

## What's here

- **The star of *star*** — a scrollytelling explorable of **\*h₂stḗr** 'star'
  (*star, stellar, asterisk, disaster, étoile…*) — the
  [landing page](https://p.migdal.pl/pie-roots/).
- **Root charts** — hand-laid charts, one PIE root each, at
  [roots.html](https://p.migdal.pl/pie-roots/roots.html):
  - [#see](https://p.migdal.pl/pie-roots/roots.html#see) — **\*weyd-** laid out
    as an eye: *vision, view, evidence, wit, wise, history, idea, Hades*
  - [#know](https://p.migdal.pl/pie-roots/roots.html#know) — the same root's
    secret side, rays from the root: *wizard, wiseacre, clairvoyant, déjà vu,
    eidolon* — and Polish *wiedźma, wieszcz, widmo*
  - [#speak](https://p.migdal.pl/pie-roots/roots.html#speak) — **\*bʰeh₂-** as a
    rippling fan: *fate, fairy, prophet, anthem, ban, bandit, contraband*
  - [#sit](https://p.migdal.pl/pie-roots/roots.html#sit) — **\*sed-** in dated
    time strata: *settle, siege, size, chair, banshee, Upanishad*
  - [#turn](https://p.migdal.pl/pie-roots/roots.html#turn) — **\*kʷel-** as a
    wheel of words: *wheel, cycle, chakra, culture, colony, pole, collar*

  Append `?share` before the hash — e.g.
  [roots.html?share#know](https://p.migdal.pl/pie-roots/roots.html?share#know) —
  for a poster page (title, chart, legend, credits) ready for sharing.

## Sourcing

The chart chains follow **Wiktionary**, with **Etymonline** as a second
witness; every edge is verified against the sources before it is drawn, and
uncertain or single-witness steps are dashed. The descent trees with notes
live in [`root_trees.md`](root_trees.md) (exploration tier). The
\*h₂stḗr dossier in [`research.md`](research.md) is graded against the
specialist dictionaries (Watkins, Kroonen, Beekes, de Vaan, Derksen,
Matasović, Kloekhorst, …).

## Run it

```bash
pnpm install
pnpm dev      # the star of 'star'  → http://localhost:5173
pnpm roots    # the root charts     → http://localhost:4330/roots.html
pnpm build    # type-check + production bundle into dist/
pnpm preview  # serve the production build
```

## Stack

Vite + React + TypeScript; d3 only where it earns its keep (hierarchy, zoom,
shape) — the SVG itself is rendered declaratively by React.

```
index.html      the star of 'star' — scrollytelling explorable of *h₂stḗr
roots.html      the root charts (see · know · speak · sit · turn)
src/            star app: components, content (Markdown steps), data
src/roots/      root charts: one component + hand-tuned data file per root
research.md     *h₂stḗr research dossier
root_trees.md   descent trees + verification notes behind the charts
scripts/        puppeteer screenshot verification
```
