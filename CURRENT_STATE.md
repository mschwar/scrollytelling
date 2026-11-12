# CURRENT_STATE

Audit date: 2026-05-19

Project purpose: this repository builds a Svelte 5 and Vite scrollytelling web application from `src/data/compute_history.json`. It uses D3 and Scrollama to show how large AI training runs grew faster than a Moore's Law hardware baseline, pairing a sticky chart with narrative steps, tooltips, scale and speculative toggles, grouped provenance cards, and a fallback image.

## Confirmed Working Pieces

- `npm ci` installs dependencies from `package-lock.json`.
- `npm run build` compiles static assets cleanly into `dist/`.
- The client mounts `src/App.svelte` from `src/main.js` with narrative components, `src/data/compute_history.json`, and `ai_compute_timeline_highres.png`.
- `npm run validate` (`scripts/validate_repo.js`) checks required files, Markdown links, HTML asset paths, and dataset provenance fields.
- `npm run verify:url-state` (`scripts/verify_story_state_sync.js`) verifies query-string parsing, clamping, and serialization for `step`, `linear`, and `speculative`.
- `/usr/bin/python3 -m unittest tests/test_doc_hygiene.py -v` enforces zero-dependency prose, acronym, sentence-length, and link checks across active documentation.
- Browser verification confirmed URL state sharing, keyboard focus handoff (`Jump to Data Points` via click, `Enter`, and `Space`), polite live-region step announcements, and grouped historical/speculative provenance cards.
- GitHub Actions builds and deploys `dist/` to GitHub Pages on pushes to `main`.
- The two-prompt workflow lives in [docs/agentic-overhaul/two-prompt-loop-plan.md](./docs/agentic-overhaul/two-prompt-loop-plan.md) and [docs/agentic-overhaul/missing-feature-list.md](./docs/agentic-overhaul/missing-feature-list.md).
- Editorial rules live in [docs/editorial/story-contract.md](./docs/editorial/story-contract.md), replacing older "broke Moore's Law" phrasing with training-run scale comparisons.

## Existing Commands

- `npm run dev` — start the local Vite server.
- `npm run build` — compile static production assets.
- `npm run preview` — serve the compiled production bundle locally.
- `npm run validate` — validate required files, Markdown links, HTML assets, and `src/data/compute_history.json`.
- `npm run verify:url-state` — run Node assertions against `src/lib/story-state.js`.
- `/usr/bin/python3 -m unittest tests/test_doc_hygiene.py -v` — run the Python standard-library documentation hygiene test suite.
- `npm run deploy` — legacy `gh-pages` manual publish script; normal publishing runs via GitHub Actions on `main`.

## Important Files And Directories

- `src/App.svelte` — scroll-state orchestration and cross-component state wiring.
- `src/components/Chart.svelte` — D3 scales, SVG rendering, tooltip interactions, and keyboard focus hooks.
- `src/components/Narrative.svelte` — five scroll steps, scale controls, and provenance summary cards.
- `src/components/Scrolly.svelte` — Scrollama observer wrapper.
- `src/components/Tooltip.svelte` — milestone readouts and scale analogies.
- `src/components/Background.svelte` — low-contrast hardware silhouettes.
- `src/lib/story-state.js` — query-string parsing and serialization for shareable URL state.
- `src/lib/provenance.js` — historical vs. speculative source grouping helper.
- `src/data/compute_history.json` — curated compute timeline and source labels.
- `index.html` — HTML shell and `noscript` fallback image.
- `scripts/validate_repo.js` — repository and dataset validator.
- `tests/test_doc_hygiene.py` — active documentation hygiene gate.
- [AGENTS.md](./AGENTS.md) — contributor and agent operating instructions.
- [docs/editorial/story-contract.md](./docs/editorial/story-contract.md) — editorial contract for claims, categories, terms, and copy.
- [docs/agentic-overhaul/2026-05-audit.md](./docs/agentic-overhaul/2026-05-audit.md) — historical audit log and backlog.

## Stale Or Conflicting Docs And Metadata

- `package.json` declares `"ISC"`, whereas no `LICENSE` file is checked into the repository.
- [CHANGELOG.md](./CHANGELOG.md) records earlier release notes and should not be read as the live backlog.
- Runtime copy in `src/components/Narrative.svelte` still contains older phrasing scheduled for editorial alignment in Feature 2 and Feature 7.

## Known Risks

- Automated verification covers dataset structure, URL state helpers, and documentation hygiene, but browser rendering still requires manual or headless Chromium checks.
- `npm ci` reports upstream transitive dependency advisories.
- `src/data/compute_history.json` combines historical systems, theory points, and speculative projections, requiring careful source labeling during edits.
- The `intersection-observer` polyfill dependency is deprecated on modern browsers.
- Narrow mobile viewports still crop the chart horizontally until Feature 5 lands.

## Immediate Next Moves

1. Start Feature 2 (`Data audit and claim correction`) from [docs/agentic-overhaul/missing-feature-list.md](./docs/agentic-overhaul/missing-feature-list.md).
2. Verify edits with `npm run validate`, `npm run verify:url-state`, `/usr/bin/python3 -m unittest tests/test_doc_hygiene.py -v`, and `npm run build`.
3. Keep runtime copy updates scoped to Feature 2 and responsive chart layout changes scoped to Feature 5.
