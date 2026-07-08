# CLAUDE.md

The star of *star* — an explorable etymology of PIE \*h₂stḗr 'star', companion piece to tree-of-tree (`../tree-of-tree-claude`, https://github.com/stared/tree-of-tree).

## Document roles — keep them strictly separate

- **`research.md`** — etymological DATA only: words, descent chains, epistemic status (solid/disputed/not-a-member), sources. Self-contained: no cross-references to other repos, no visualization or representation language (no "dashed", "node color", "chapter", "prose-only"…).
- **`DEV_NOTES.md`** — everything about representation: design brief, how disputed/excluded items are rendered, story arc, contracts mirrored from tree-of-tree.
- **`CLAUDE.md`** (this file) — meta conventions only.

When Piotr gives guidance by analogy to tree-of-tree ("treat like X"), translate it into self-contained terms in the right file; record the analogy here or in DEV_NOTES, never in research.md.

## Project decisions (2026-07-08)

- Fresh codebase, no fork; reuse tree-of-tree's *contracts* (data schema, Markdown steps with validated `focus` ids, references map, poster path) — see DEV_NOTES.
- English words are the focus; other languages matter mainly as ancestors of English words.
- pnpm; no global installs.
