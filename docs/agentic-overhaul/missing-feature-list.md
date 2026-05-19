# Missing Feature List

Status date: 2026-05-19

This is the canonical feature map for the agentic buildout. Pick the first `todo` item unless one feature is already `in_progress` or `qa`.

## High-Level Map

| # | Status | Feature | Branch | Verification |
| --- | --- | --- | --- | --- |
| 0 | done | Agentic buildout operating plan | `docs/agentic-buildout-plan` | `npm run validate`, `npm run build` |
| 1 | qa | Editorial north star and story contract | `feat/editorial-north-star` | non-UI doc review plus `npm run validate` |
| 2 | todo | Data audit and claim correction | `fix/data-claims-audit` | data script or documented calculation check, `npm run validate`, `npm run build` |
| 3 | todo | Provenance schema and per-point citations | `feat/provenance-schema` | dataset validation plus browser QA of provenance display |
| 4 | todo | Speculative mode trust reset | `fix/speculative-opt-in` | non-UI URL-state check plus browser QA |
| 5 | todo | Responsive chart sizing | `feat/responsive-chart` | desktop and mobile browser QA screenshots |
| 6 | todo | Opening thesis screen | `feat/opening-thesis` | desktop and mobile browser QA screenshots |
| 7 | todo | Narrative rewrite and panel hierarchy | `feat/narrative-rewrite` | browser QA across all story steps |
| 8 | todo | Signature scale interaction | `feat/signature-scale-interaction` | browser QA interaction screenshots and console check |
| 9 | todo | Visual system reset | `feat/visual-system-reset` | desktop and mobile browser QA screenshots |
| 10 | todo | Tooltip and data card upgrade | `feat/data-card-tooltips` | browser QA hover, tap, and keyboard screenshots |
| 11 | todo | Mobile scrollytelling polish | `feat/mobile-polish` | mobile browser QA screenshots across steps |
| 12 | todo | Browser smoke test harness | `feat/browser-smoke-tests` | explicit test command plus build and validate |
| 13 | todo | Accessibility hardening | `feat/accessibility-hardening` | browser QA plus reduced-motion and keyboard checks |
| 14 | todo | Share and snapshot export | `feat/share-snapshot` | browser QA of copy/share/download path |
| 15 | todo | Performance and asset polish | `feat/performance-polish` | build size review plus browser smoke |
| 16 | todo | Dependency and license cleanup | `chore/dependency-license-cleanup` | `npm ci`, `npm audit`, `npm run validate`, `npm run build` |
| 17 | todo | Final editorial QA and release pass | `release/editorial-qa` | full browser QA, docs review, production preview |

## Feature Packets

### 1. Editorial North Star And Story Contract

- Status: `qa`
- Branch: `feat/editorial-north-star`
- Goal: define the precise audience, claim, scope, and editorial promise before more UI work.
- Why now: the current app feels like a mechanics demo because the thesis is overbroad and the audience is unclear.
- Scope:
  - Create `docs/editorial/story-contract.md`.
  - Replace "proving broke Moore's Law" language with a more defensible framing.
  - Define the five-act story in one sentence each.
  - Define what counts as historical, estimated, speculative, and pedagogical data.
  - Define terms: FLOP, training compute, Moore's Law-style baseline, training-run scale.
- Out of scope:
  - No chart redesign.
  - No data value changes except wording in docs.
- Verification:
  - `npm run validate`
  - Manual doc review against `README.md`, `CURRENT_STATE.md`, and the feature map.
- Docs:
  - `README.md`
  - `CURRENT_STATE.md`
  - This file
- Implementation notes:
  - Added `docs/editorial/story-contract.md`.
  - Updated `README.md`, `AGENTS.md`, `CURRENT_STATE.md`, and validation to make the editorial contract discoverable.
  - Runtime story copy still contains old claims by design; Feature 2 and Feature 7 own those corrections.

### 2. Data Audit And Claim Correction

- Status: `todo`
- Branch: `fix/data-claims-audit`
- Goal: make the story's headline numbers match the dataset and documented methodology.
- Why now: the GPT-4 human-lifetime copy currently conflicts with `compute_history.json`, which damages trust.
- Scope:
  - Add or update a script that recalculates human analogies from FLOP values and documented assumptions.
  - Correct narrative text, tooltip text, README claims, and data fields that do not match the calculation.
  - Add a short methodology note explaining seconds-per-year and lifetime assumptions.
  - Remove or soften unsupported "600 million human lifetimes" language unless the calculation supports it.
- Out of scope:
  - No visual redesign.
  - No new data sources beyond cited verification needed to correct existing claims.
- Verification:
  - Explicit calculation script output.
  - `npm run validate`
  - `npm run build`
- Docs:
  - `README.md`
  - `CURRENT_STATE.md`
  - `docs/editorial/story-contract.md` if created
  - This file

### 3. Provenance Schema And Per-Point Citations

- Status: `todo`
- Branch: `feat/provenance-schema`
- Goal: make every data point auditable without reading vague source labels.
- Why now: source labels like "OpenAI, 2023" and "Trend extrapolation" are not enough for public trust.
- Scope:
  - Extend dataset entries with structured provenance fields, such as `source_url`, `source_type`, `confidence`, and `method_note`.
  - Update validation to require the new fields.
  - Update the Credits/Provenance view to expose source type and confidence.
  - Keep speculative and estimated entries clearly separate from observed historical records.
- Out of scope:
  - No full replacement of the dataset.
  - No live API.
- Verification:
  - `npm run validate`
  - `npm run build`
  - Browser QA screenshot of provenance view.
- Docs:
  - `README.md`
  - `CURRENT_STATE.md`
  - This file

### 4. Speculative Mode Trust Reset

- Status: `todo`
- Branch: `fix/speculative-opt-in`
- Goal: hide speculative future data by default and make the toggle state feel trustworthy.
- Why now: speculative points shown by default weaken the first read of the piece.
- Scope:
  - Change default `speculative` state to hidden.
  - Update copy so speculation is opt-in and clearly labeled.
  - Ensure URL state still restores `speculative=1` and `speculative=0`.
  - Confirm hidden speculative labels do not render on the chart.
- Out of scope:
  - No provenance schema expansion.
- Verification:
  - `npm run verify:url-state`
  - `npm run validate`
  - `npm run build`
  - Browser QA screenshots with speculation hidden and shown.
- Docs:
  - `README.md`
  - `CURRENT_STATE.md`
  - This file

### 5. Responsive Chart Sizing

- Status: `todo`
- Branch: `feat/responsive-chart`
- Goal: replace fixed chart dimensions with container-aware sizing so mobile and desktop both work.
- Why now: the current `1200x700` SVG crops on narrow viewports.
- Scope:
  - Measure chart container size.
  - Drive SVG width/height and margins from available space.
  - Preserve log/linear behavior and tooltip positioning.
  - Ensure axis labels, legend, and point labels do not overlap badly at mobile widths.
- Out of scope:
  - No narrative rewrite.
  - No new visual style.
- Verification:
  - `npm run validate`
  - `npm run build`
  - Browser QA screenshots at desktop and mobile sizes.
- Docs:
  - `CURRENT_STATE.md`
  - This file

### 6. Opening Thesis Screen

- Status: `todo`
- Branch: `feat/opening-thesis`
- Goal: give the first viewport a crisp editorial hook instead of starting with a partially covered chart.
- Why now: the first impression currently feels like a chart demo, not a story.
- Scope:
  - Add an opening view that states the literal thesis and lets the chart remain legible.
  - Keep it as the first screen of the actual scrollytelling experience, not a marketing landing page.
  - Include a clear transition into the first data step.
  - Make the first viewport work on mobile and desktop.
- Out of scope:
  - No full visual system overhaul.
- Verification:
  - `npm run validate`
  - `npm run build`
  - Browser QA screenshots at first viewport on desktop and mobile.
- Docs:
  - `README.md`
  - `CURRENT_STATE.md`
  - This file

### 7. Narrative Rewrite And Panel Hierarchy

- Status: `todo`
- Branch: `feat/narrative-rewrite`
- Goal: rewrite all story panels so each step earns its place and escalates the argument.
- Why now: the current panels tell the user what to feel instead of making the chart reveal it.
- Scope:
  - Rewrite panel copy around the approved story contract.
  - Reduce generic phrases like "phase shift" unless quantified.
  - Add compact step labels or progress context if useful.
  - Establish visual hierarchy within panels: thesis, evidence, implication.
- Out of scope:
  - No new data values.
  - No new chart type.
- Verification:
  - `npm run validate`
  - `npm run build`
  - Browser QA screenshots across all story steps.
- Docs:
  - `README.md`
  - `CURRENT_STATE.md`
  - This file

### 8. Signature Scale Interaction

- Status: `todo`
- Branch: `feat/signature-scale-interaction`
- Goal: replace the current arbitrary "unzipper" with one memorable, inspectable interaction.
- Why now: the app needs a single visual beat that makes the scale intuitive.
- Scope:
  - Design and implement one interaction, such as a smooth log-to-linear scrub, multiplier gap reveal, or human-time comparison.
  - Keep the interaction keyboard reachable.
  - Make the animation respect reduced-motion settings.
  - Preserve URL state if the interaction changes persistent state.
- Out of scope:
  - No 3D/WebGL unless it is the smallest credible implementation.
- Verification:
  - `npm run validate`
  - `npm run build`
  - Browser QA screenshots before, during/after interaction, and mobile behavior.
  - Console error check.
- Docs:
  - `README.md`
  - `CURRENT_STATE.md`
  - This file

### 9. Visual System Reset

- Status: `todo`
- Branch: `feat/visual-system-reset`
- Goal: move from generic demo styling to a distinctive editorial data-viz system.
- Why now: the current white chart, purple dots, orange line, emoji silhouettes, and glass cards feel generic.
- Scope:
  - Define restrained typography, color, spacing, chart labels, annotation style, and panel treatments.
  - Replace emoji background silhouettes with meaningful visual assets or remove them.
  - Improve label density and annotation clarity.
  - Keep contrast and accessibility intact.
- Out of scope:
  - No story copy rewrite beyond labels needed for visual fit.
- Verification:
  - `npm run validate`
  - `npm run build`
  - Browser QA screenshots for desktop and mobile across representative steps.
- Docs:
  - `README.md` if visual system is documented there.
  - `CURRENT_STATE.md`
  - This file

### 10. Tooltip And Data Card Upgrade

- Status: `todo`
- Branch: `feat/data-card-tooltips`
- Goal: turn tooltip content into useful evidence, not just labels and huge numbers.
- Why now: the tooltip should help users understand source confidence, category, cost, and scale.
- Scope:
  - Add source type, confidence, and method note when available.
  - Improve number formatting for human lifetimes and FLOPs.
  - Make tooltip placement robust near viewport edges.
  - Ensure tap-to-lock and keyboard behavior still work.
- Out of scope:
  - No new provenance schema unless Feature 3 is not enough; if blocked, mark this feature blocked.
- Verification:
  - `npm run validate`
  - `npm run build`
  - Browser QA screenshots for hover, tap/mobile, and keyboard focus.
- Docs:
  - `CURRENT_STATE.md`
  - This file

### 11. Mobile Scrollytelling Polish

- Status: `todo`
- Branch: `feat/mobile-polish`
- Goal: make the mobile experience feel intentionally designed rather than squeezed.
- Why now: the current mobile viewport crops the chart and overlaps panels.
- Scope:
  - Tune sticky chart height, panel placement, scroll step spacing, axis visibility, and touch targets.
  - Ensure the first and final steps are readable.
  - Confirm the provenance view is usable on mobile.
- Out of scope:
  - No desktop redesign unless a shared style bug requires it.
- Verification:
  - `npm run validate`
  - `npm run build`
  - Browser QA screenshots for every step at a mobile viewport.
- Docs:
  - `CURRENT_STATE.md`
  - This file

### 12. Browser Smoke Test Harness

- Status: `todo`
- Branch: `feat/browser-smoke-tests`
- Goal: make core interactions verifiable without manual inspection every time.
- Why now: the repo currently validates structure, not behavior.
- Scope:
  - Add a lightweight browser smoke test command for app load, URL state, step restoration, speculative toggle, tooltip open, and console errors.
  - Keep the test focused and maintainable.
  - Add the command to CI if stable.
- Out of scope:
  - No exhaustive visual regression suite.
- Verification:
  - New smoke test command.
  - `npm run validate`
  - `npm run build`
- Docs:
  - `README.md`
  - `CURRENT_STATE.md`
  - This file

### 13. Accessibility Hardening

- Status: `todo`
- Branch: `feat/accessibility-hardening`
- Goal: close remaining accessibility gaps after the main interaction and layout settle.
- Why now: accessibility work should land after the core UX patterns are stable enough to audit.
- Scope:
  - Reduced motion behavior.
  - Keyboard semantics for chart/background interactions.
  - Focus order and visible focus review.
  - ARIA labels aligned to revised copy.
- Out of scope:
  - No major redesign unless needed to fix accessibility blockers.
- Verification:
  - `npm run validate`
  - `npm run build`
  - Browser QA keyboard walkthrough.
  - Reduced-motion check.
- Docs:
  - `README.md`
  - `CURRENT_STATE.md`
  - This file

### 14. Share And Snapshot Export

- Status: `todo`
- Branch: `feat/share-snapshot`
- Goal: let readers save or share the exact state of the story.
- Why now: once the story is credible and visually compelling, sharing becomes useful.
- Scope:
  - Polish copy-link/Web Share behavior.
  - Add static chart snapshot export if feasible.
  - Avoid alert-based UX if a non-blocking status works better.
  - Preserve URL state in all share paths.
- Out of scope:
  - No server-side image rendering.
- Verification:
  - `npm run validate`
  - `npm run build`
  - Browser QA of share/copy/export path with screenshot.
- Docs:
  - `README.md`
  - `CURRENT_STATE.md`
  - This file

### 15. Performance And Asset Polish

- Status: `todo`
- Branch: `feat/performance-polish`
- Goal: make the final app feel fast and stable.
- Why now: visual and interaction changes may introduce asset or runtime cost.
- Scope:
  - Review bundle and asset size.
  - Optimize large fallback image or replace with a smaller generated preview.
  - Remove dead CSS and unused runtime paths.
  - Check console for runtime noise.
- Out of scope:
  - No dependency cleanup unless clearly part of performance.
- Verification:
  - `npm run build`
  - Build output size comparison.
  - Browser smoke screenshot.
- Docs:
  - `CURRENT_STATE.md`
  - This file

### 16. Dependency And License Cleanup

- Status: `todo`
- Branch: `chore/dependency-license-cleanup`
- Goal: resolve metadata drift and remove low-value dependencies.
- Why now: the repo should be releasable without contradictory license or dependency notes.
- Scope:
  - Decide and apply license metadata only if the user or repo gives a clear canonical answer; otherwise document the unresolved state.
  - Remove `intersection-observer` if no longer needed.
  - Update lockfile.
  - Refresh stale vulnerability notes.
- Out of scope:
  - No product UI changes.
- Verification:
  - `npm ci`
  - `npm audit`
  - `npm run validate`
  - `npm run build`
- Docs:
  - `README.md`
  - `CURRENT_STATE.md`
  - This file

### 17. Final Editorial QA And Release Pass

- Status: `todo`
- Branch: `release/editorial-qa`
- Goal: verify the whole piece reads as one crisp, trustworthy experience.
- Why now: this is the final pass after all independently mergeable features have landed.
- Scope:
  - Full desktop and mobile story walkthrough.
  - Check source links, labels, tooltips, keyboard flow, reduced motion, and share state.
  - Tighten README and current state docs.
  - Confirm production deploy instructions.
- Out of scope:
  - No new product features unless they are release blockers.
- Verification:
  - `npm run validate`
  - `npm run build`
  - `npm run preview`
  - Full browser QA screenshots across the story.
- Docs:
  - `README.md`
  - `CURRENT_STATE.md`
  - This file

## Next Loop Command

Because the feature map is now ready, the next loop command is:

```text
create a feature branch and develop the next feature on the missing feature list. When you finish, commit and push. Include the next loop command in the output.
```
