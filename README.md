# PIE roots ✳️

Explorable etymologies of Proto-Indo-European roots — how single prehistoric
words fan out into the modern vocabulary. It continues
[tree-of-tree](https://github.com/stared/tree-of-tree)
([live](https://p.migdal.pl/tree-of-tree/)), the tree of *tree*.

**Live: [p.migdal.pl/pie-roots](https://p.migdal.pl/pie-roots/)**

## What's here

One root per page:

- [/h2ster/](https://p.migdal.pl/pie-roots/h2ster/) — **the star of *star***,
  a scrollytelling explorable of **\*h₂stḗr** 'star'
  (*star, stellar, asterisk, disaster, étoile…*)
- [/weyd/](https://p.migdal.pl/pie-roots/weyd/) — **\*weyd-** means to see, to
  know — laid out as an eye: *vision, view, evidence, wit, wise, history,
  idea, Hades*
- [/weyd-magic/](https://p.migdal.pl/pie-roots/weyd-magic/) — **\*weyd-**
  means magic — the root's occult descendants as rays of light: *wizard,
  wiseacre, clairvoyant, déjà vu, eidolon* — and Polish *wiedźma, wieszcz,
  widmo*
- [/bheh2/](https://p.migdal.pl/pie-roots/bheh2/) — **\*bʰeh₂-** 'to speak' as
  a rippling fan: *fate, fairy, prophet, anthem, ban, bandit, contraband*
- [/sed/](https://p.migdal.pl/pie-roots/sed/) — **\*sed-** 'to sit' in dated
  time strata: *settle, siege, size, chair, banshee, Upanishad*
- [/kwel/](https://p.migdal.pl/pie-roots/kwel/) — **\*kʷel-** 'to turn' as a
  wheel of words: *wheel, cycle, chakra, culture, colony, pole, collar*

Append `?share` — e.g.
[/weyd-magic/?share](https://p.migdal.pl/pie-roots/weyd-magic/?share) — for a
poster page (title, chart, legend, credits) ready for sharing.

## Sourcing

The chart chains follow **Wiktionary**, with **Etymonline** as a second
witness; every edge is verified against the sources before it is drawn, and
uncertain or weakly-sourced steps are dashed. Each charted root has its
descent tree with notes in [`notes/`](notes) — e.g.
[`notes/weyd.md`](notes/weyd.md) — with the wider survey in
[`root_trees.md`](root_trees.md). The
\*h₂stḗr dossier in [`research.md`](research.md) is graded against the
specialist dictionaries (Watkins, Kroonen, Beekes, de Vaan, Derksen,
Matasović, Kloekhorst, …).

## Run it

```bash
pnpm install
pnpm dev      # the site            → http://localhost:5173
pnpm roots    # the root charts     → http://localhost:4330/weyd/
pnpm build    # type-check + production bundle into dist/
pnpm preview  # serve the production build
```

## Stack

Vite + React + TypeScript; d3 only where it earns its keep (hierarchy, zoom,
shape) — the SVG itself is rendered declaratively by React.

```
index.html      the landing page — index of the collection
h2ster/         the star of 'star' — scrollytelling explorable of *h₂stḗr
weyd/ weyd-magic/ bheh2/ sed/ kwel/   the root charts, one page per root
src/            star app: components, content (Markdown steps), data
src/roots/      root charts: one component + hand-tuned data file per root
research.md     *h₂stḗr research dossier
root_trees.md   descent trees + verification notes behind the charts
scripts/        puppeteer screenshot verification
```
