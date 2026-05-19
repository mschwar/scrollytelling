# CURRENT_STATE

Audit date: 2026-05-19

Project purpose: this repo is a Svelte 5 + Vite scrollytelling visualization about AI training compute growth, using D3, Scrollama, and a curated compute timeline to explain how post-2012 model training compute diverged from a Moore's Law-style story. The app combines a sticky chart, scroll-driven narrative panels, a tooltip system, a speculative-data toggle, a grouped provenance view, and a noscript fallback image.

## Confirmed Working Pieces

- `npm ci` installs dependencies from the existing lockfile.
- `npm run build` completes successfully after dependencies are installed.
- The app boots as a Svelte 5 client with `src/main.js` mounting `src/App.svelte`.
- The repo contains the expected narrative components, data file, and fallback asset.
- The new validation script runs locally and checks repo structure plus the compute dataset.
- The app now preserves `step`, `linear`, and `speculative` state in the URL, and the share action copies that same view state.
- Browser QA of the shareable URL state and keyboard navigation flow passed in headless Chromium against the built app, with screenshot evidence captured.
- Browser QA of the story-step live announcements passed in headless Chromium against the built app.
- Browser QA of the Provenance & Credits view passed in headless Chromium against the built app, including the speculative toggle state and screenshots confirming the grouped historical/speculative summary cards and reference links.
- The chart handoff button now responds to click, Enter, and Space so keyboard users can move into the chart consistently.
- The Credits step now groups source labels into historical records and speculative estimates for provenance review.
- GitHub Actions now auto-deploys the built site to GitHub Pages from pushes to `main`.
- The two-prompt feature queue now lives in `docs/agentic-overhaul/two-prompt-loop-plan.md`.

## Existing Commands

- `npm run dev` - available, not run during this audit.
- `npm run build` - passed.
- `npm run preview` - available, not run during this audit.
- `npm run validate` - added in this pass and passed.
- `npm run verify:url-state` - available for non-UI verification of the story-state helpers.
- `npm run deploy` - legacy manual fallback still exists, but the normal publish path is now GitHub Actions auto-deploy on `main`.

## Important Files And Directories

- `src/App.svelte` - scroll-state orchestration and cross-component wiring.
- `src/components/Chart.svelte` - D3 scales, data rendering, tooltip interactions, and accessibility hooks.
- `src/components/Narrative.svelte` - scroll steps and call-to-action controls.
- `src/components/Scrolly.svelte` - Scrollama wrapper for step tracking.
- `src/components/Tooltip.svelte` - tooltip presentation and compute readouts.
- `src/components/Background.svelte` - low-contrast background silhouettes.
- `src/lib/story-state.js` - query-string parsing and serialization for shareable story state.
- `src/data/compute_history.json` - curated timeline and provenance fields.
- `index.html` - app shell and noscript fallback image.
- `scripts/validate_repo.js` - structural and data validation.
- `AGENTS.md` - contributor bootstrap instructions.
- `docs/agentic-overhaul/2026-05-audit.md` - detailed audit and backlog.

## Stale Or Conflicting Docs And Metadata

- `package.json` declared `ISC` while the README previously advertised MIT and linked a missing `LICENSE` file.
- The README and changelog contain phase/version claims that read like release notes; they should not be treated as a live product roadmap.
- `index.html` previously referenced the Vite starter favicon, which was not present in the repo.
- The public GitHub Pages site was previously serving source files directly; the repo now uses a workflow-driven Pages deploy instead.

## Known Risks

- There are no automated tests.
- `npm ci` reports dependency vulnerabilities from upstream packages.
- The dataset mixes historical entries, theory milestones, and speculative projections, so provenance needs care when editing values.
- Third-party dependency `intersection-observer` is deprecated and probably unnecessary on modern browsers.
- Network-dependent facts and source claims were not reverified online during this audit.

## Immediate Next Moves

1. Decide the canonical license position and bring `package.json`, the README, and any license file into agreement.
2. Add a minimal test or smoke harness if the interaction surface grows again.
3. Consider tightening provenance notes for speculative dataset entries.
4. Revisit whether `intersection-observer` can be removed now that modern browsers support the native API.
5. Keep an eye on the Pages workflow runs after future pushes to `main`.
