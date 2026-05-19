# AGENTS.md

## How To Orient

- Read [CURRENT_STATE.md](./CURRENT_STATE.md) first for the current truth of the repo.
- Treat `src/data/compute_history.json` as the data source of truth unless a generator is explicitly introduced.
- Treat `README.md` as the user-facing overview, not the authoritative status document.
- Use `docs/agentic-overhaul/2026-05-audit.md` for the more detailed audit, backlog, and do-not-do-yet list.
- Use `docs/agentic-overhaul/two-prompt-loop-plan.md` for the feature queue and branch/PR loop.
- Use `docs/agentic-overhaul/missing-feature-list.md` as the canonical ordered feature map. Pick the first `todo` item unless one item is already `in_progress` or `qa`.
- Use `docs/editorial/story-contract.md` as the source of truth for audience, claim, data categories, terms, copy rules, and the five-act story.

## Canonical Files

- App entry: `src/main.js`
- App shell: `src/App.svelte`
- Visualization: `src/components/Chart.svelte`
- Narrative: `src/components/Narrative.svelte`
- Scroll wrapper: `src/components/Scrolly.svelte`
- Tooltip: `src/components/Tooltip.svelte`
- Background layer: `src/components/Background.svelte`
- Dataset: `src/data/compute_history.json`
- Validation: `scripts/validate_repo.js`
- Bootstrap status: `CURRENT_STATE.md`
- Detailed audit: `docs/agentic-overhaul/2026-05-audit.md`
- Loop protocol: `docs/agentic-overhaul/two-prompt-loop-plan.md`
- Canonical feature map: `docs/agentic-overhaul/missing-feature-list.md`
- Editorial contract: `docs/editorial/story-contract.md`

## Commands To Run

- Before changes: `npm run validate`
- After UI or data changes: `npm run validate`
- After structural or dependency changes: `npm run build`
- For local preview: `npm run preview`

## Generated Vs Hand-Authored

- Hand-authored: source files in `src/`, `README.md`, `AGENTS.md`, `CURRENT_STATE.md`, `docs/agentic-overhaul/2026-05-audit.md`
- Hand-authored data: `src/data/compute_history.json`
- Generated or disposable: `dist/`, `node_modules/`
- Helper scripts: `fix_analogies.cjs` and `recalculate_analogies.js` are utilities, not runtime dependencies

## Data And Provenance Rules

- Do not invent citations, dates, or provenance for the dataset.
- If you change a value in `src/data/compute_history.json`, keep the provenance/source fields coherent.
- Preserve speculative entries as speculative; do not rewrite them as historical facts.
- If a value is uncertain, record that uncertainty in the docs instead of guessing.

## Accessibility And Documentation Expectations

- Keep interactive controls keyboard reachable.
- Keep aria labels and fallback text aligned with what the UI actually does.
- Update `CURRENT_STATE.md` and `docs/agentic-overhaul/2026-05-audit.md` when the repo truth changes.
- Update `docs/agentic-overhaul/missing-feature-list.md` whenever a feature changes status.
- Update `docs/agentic-overhaul/two-prompt-loop-plan.md` only when the loop protocol itself changes.
- Keep `README.md` commands aligned with the actual scripts in `package.json`.

## Two-Prompt Loop Output

When working from the two-prompt loop, every final response must include the current feature, high-level feature map status, verification performed, docs touched, and the exact next loop command from `docs/agentic-overhaul/two-prompt-loop-plan.md`.

## Safe-Change Rules

- Do not edit build output by hand.
- Do not delete source data or planning docs unless you are intentionally replacing them with a documented equivalent.
- Do not choose a license if the repo metadata is contradictory; document the decision point instead.
- Prefer small, reviewable edits over framework or architecture changes.

## Known Project Traps

- `package.json` and the README previously disagreed on licensing, and the repo had no checked-in `LICENSE` file.
- `index.html` originally referenced the Vite starter favicon, which is not part of this repo.
- The chart has a custom linear-scale mode; preserve the current log-scale defaults unless you are explicitly changing the narrative.
- The repo uses Svelte 5 with Vite, so changes should stay compatible with the current component model and build chain.
