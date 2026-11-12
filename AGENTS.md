# AGENTS.md

## How To Orient

- Read [CURRENT_STATE.md](./CURRENT_STATE.md) first for the current repository status.
- Treat `src/data/compute_history.json` as the dataset source of truth unless a documented generator is added.
- Treat [README.md](./README.md) as the human-facing overview, leading with concrete inputs, validation checks, and build outputs.
- Read [docs/editorial/story-contract.md](./docs/editorial/story-contract.md) for audience, core claim, data categories, terminology, copy rules, and the five-act narrative.
- Use [docs/agentic-overhaul/2026-05-audit.md](./docs/agentic-overhaul/2026-05-audit.md) for historical audit context and backlog notes.
- Use [docs/agentic-overhaul/two-prompt-loop-plan.md](./docs/agentic-overhaul/two-prompt-loop-plan.md) for the feature branch and review loop.
- Use [docs/agentic-overhaul/missing-feature-list.md](./docs/agentic-overhaul/missing-feature-list.md) as the ordered feature queue; pick the first `todo` item unless an item is already `in_progress` or `qa`.

## Canonical Files

- App entry: `src/main.js`
- App shell: `src/App.svelte`
- Visualization: `src/components/Chart.svelte`
- Narrative: `src/components/Narrative.svelte`
- Scroll wrapper: `src/components/Scrolly.svelte`
- Tooltip: `src/components/Tooltip.svelte`
- Background layer: `src/components/Background.svelte`
- Provenance helper: `src/lib/provenance.js`
- URL state helper: `src/lib/story-state.js`
- Dataset: `src/data/compute_history.json`
- Repo validator: `scripts/validate_repo.js`
- URL state check: `scripts/verify_story_state_sync.js`
- Doc hygiene gate: `tests/test_doc_hygiene.py`
- Bootstrap status: `CURRENT_STATE.md`
- Editorial contract: `docs/editorial/story-contract.md`

## Commands To Run

- Before and after UI, data, or doc changes: `npm run validate`
- URL state helper verification: `npm run verify:url-state`
- Documentation hygiene gate: `/usr/bin/python3 -m unittest tests/test_doc_hygiene.py -v`
- Production bundle verification: `npm run build`
- Local preview: `npm run preview`

## Generated Vs Hand-Authored

- Hand-authored code and docs: `src/`, `README.md`, `AGENTS.md`, `CURRENT_STATE.md`, `docs/editorial/story-contract.md`, `00_Master_Brief.md.md` through `04_Visual_Style_Guide.md.md`
- Hand-authored dataset: `src/data/compute_history.json`
- Historical logs (do not rewrite retroactively): `CHANGELOG.md`, `docs/agentic-overhaul/*`
- Generated or disposable directories: `dist/`, `node_modules/`, `__pycache__/`
- Standalone utilities: `fix_analogies.cjs` and `recalculate_analogies.js`

## Data And Provenance Rules

- Do not invent citations, dates, or provenance labels for `src/data/compute_history.json`.
- Keep source fields coherent whenever dataset numbers change.
- Keep speculative entries marked `is_speculative: true`; never present extrapolations as historical facts.
- Record uncertainty explicitly in documentation rather than guessing.

## Documentation Hygiene And Accessibility Rules

- Lead human-facing documentation with concrete inputs, validation checks, and outputs before internal project taxonomy.
- Keep `README.md` plain UTF-8 (no byte-order mark) with a `## TL;DR` section between 1 and 60 words.
- Keep every prose sentence in scoped human-facing guides at or below 45 words.
- Avoid banned filler phrases and ambiguous modals (`leverage`, `utilize`, `and/or`, `etc.`, `if applicable`, `as appropriate`).
- Expand unfamiliar uppercase acronyms at first prose use as `Full Term (ACRONYM)` without backticks inside parentheses.
- Use valid repository-relative Markdown links and `#heading` anchors; never commit `file://` links.
- Run `/usr/bin/python3 -m unittest tests/test_doc_hygiene.py -v` whenever documentation changes.
- Keep interactive chart controls keyboard reachable and Accessible Rich Internet Applications (ARIA) labels aligned with actual UI behavior.

## Two-Prompt Loop Output

When working from the two-prompt loop, include the active feature, feature-map status, verification commands run, files updated, and the next command from [docs/agentic-overhaul/two-prompt-loop-plan.md](./docs/agentic-overhaul/two-prompt-loop-plan.md).

## Safe-Change Rules

- Never edit `dist/` build output by hand.
- Do not delete source data or planning briefs without an explicit replacement decision.
- Preserve the unresolved license note until the repository owner checks in a canonical `LICENSE` file.
- Prefer focused, reviewable edits that stay compatible with Svelte 5 and Vite.
