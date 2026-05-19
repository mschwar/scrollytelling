# Two-Prompt Loop Plan

Status date: 2026-05-19

This repo is optimized for a repeating two-prompt build loop. A fresh agent must be able to land in the repo, read this file plus `docs/agentic-overhaul/missing-feature-list.md`, and continue without chat history.

## The Two Commands

Prompt A, implementation:

```text
create a feature branch and develop the next feature on the missing feature list. When you finish, commit and push. Include the next loop command in the output.
```

Prompt B, QA and merge:

```text
/qa and test feature in the web browser. take screen shots to make sure everything looks right. Resolve any PR review comments and bot CI flags on git. Update docs. Commit, push, and merge. Include the next loop command in the output.
```

## Output Contract

Every Prompt A and Prompt B final response must include:

- Current feature: feature number, title, branch, and PR URL if available.
- Feature map: the high-level list from `docs/agentic-overhaul/missing-feature-list.md`, with status markers.
- Verification: commands run, browser QA target, screenshots captured, or explicit reason browser QA was not required.
- Docs touched: files updated so the next agent can discover the state.
- Next command: the exact next loop command in a fenced `text` block.

Prompt A's next command is always Prompt B.

Prompt B's next command is always Prompt A unless the feature list is complete.

## Feature States

Use these exact status labels in `missing-feature-list.md`:

- `todo`: not started.
- `in_progress`: Prompt A branch exists and implementation is underway.
- `qa`: implementation is pushed and waiting for Prompt B.
- `done`: merged into `main`.
- `blocked`: cannot proceed without a concrete dependency or decision.

Only one feature should be `in_progress` or `qa` at a time.

## Prompt A Responsibilities

1. Start from `main` and update it from `origin/main`.
2. Read `CURRENT_STATE.md`, `AGENTS.md`, this loop plan, and `docs/agentic-overhaul/missing-feature-list.md`.
3. Select the first `todo` feature unless a feature is already marked `in_progress` or `qa`.
4. Create the specified branch.
5. Mark the selected feature `in_progress` in `missing-feature-list.md`.
6. Implement only that feature's scope.
7. Run the feature's required non-UI checks.
8. Run `npm run validate` and `npm run build`.
9. Update docs:
   - `CURRENT_STATE.md` if repo truth changed.
   - `missing-feature-list.md` status and notes.
   - `README.md` only if user-facing behavior changed.
   - This loop plan only if the loop itself changed.
10. Commit and push the branch.
11. Open a draft PR for the branch if GitHub auth is available. If it is not available, say so and include the pushed branch name.
12. Mark the feature `qa`.
13. Final response must include the feature map and Prompt B as the next command.

## Prompt B Responsibilities

1. Read `CURRENT_STATE.md`, `AGENTS.md`, this loop plan, and `docs/agentic-overhaul/missing-feature-list.md`.
2. Identify the feature marked `qa` and its branch/PR.
3. Check out the branch and update it from `origin/main` if needed.
4. Run `npm run validate` and `npm run build`.
5. Run the feature's required QA:
   - Browser QA with screenshots for UI, layout, interaction, accessibility, and visual work.
   - Explicit non-UI verification command for docs-only, data-only, or script-only work.
6. Inspect CI and PR review comments. Resolve actionable failures.
7. Update docs with QA evidence and final state.
8. Commit and push any QA fixes or doc updates.
9. Merge the PR when checks pass.
10. Switch back to `main`, pull the merged state, and mark the feature `done` if that status did not land in the merged PR.
11. Final response must include the feature map and Prompt A as the next command.

## Merge Gate

A feature is mergeable only when all of these are true:

- It has exactly one branch and one PR.
- It is independently useful if merged by itself.
- It does not depend on unmerged sibling branches.
- `npm run validate` passes.
- `npm run build` passes.
- Browser QA screenshots or explicit non-UI verification evidence are recorded in docs or the PR.
- `CURRENT_STATE.md` and `missing-feature-list.md` reflect the new truth.
- The next agent can infer the next feature from repo files alone.

## Branch And PR Rules

- Use the exact branch listed for the feature.
- Use one PR per feature.
- Prefer draft PRs after Prompt A; Prompt B marks ready or merges after QA.
- Keep branch scope tight. Do not opportunistically refactor unrelated code.
- Do not start another feature while one is `in_progress` or `qa`.

## Verification Rules

Browser QA is required for:

- Layout, visual design, animation, tooltip, scrolling, keyboard, accessibility, responsive, and share/export work.
- Any change touching `src/App.svelte`, `src/components/*`, or `src/app.css`, unless the feature packet explicitly says a non-UI check is enough.

Non-UI verification is acceptable for:

- Documentation-only changes.
- Dataset validation scripts.
- Pure serialization helpers.
- CI/dependency/license changes that do not alter runtime behavior.

Minimum browser QA for UI features:

- Desktop viewport screenshot.
- Mobile viewport screenshot.
- Any relevant interaction screenshot, such as tooltip open, linear scale active, share copied, or reduced motion active.
- Console error check.

## Completed Features

- URL State Sync
  - Branch: `feat/url-state-sync`
  - Result: query parameters reopen the same story state, and the share action copies the current view URL.
  - Verification: `npm run verify:url-state`, `npm run validate`, and `npm run build`.
- Keyboard Navigation Upgrade
  - Branch: `feat/keyboard-navigation`
  - Result: the Scale panel can hand focus into the chart, and the chart supports roving focus across visible points with live announcements.
  - Verification: `npm run validate`, `npm run build`, and browser QA in headless Chromium with keyboard-only traversal.
- Provenance And Sources View
  - Branch: `feat/provenance-view`
  - Result: the Credits step groups source labels into historical records and speculative estimates.
  - Verification: `npm run validate`, `npm run build`, and browser QA of the rendered provenance view with screenshots.
- Agentic Buildout Plan
  - Branch: documentation update on current branch
  - Result: this two-prompt loop and `missing-feature-list.md` define the remaining buildout from start to finish.
  - Verification: `npm run validate`, `npm run build`.

## Handoff Template

Use this in PR descriptions and final responses:

```text
Feature:
Branch:
PR:
Status:
Why now:
Scope completed:
Verification:
Screenshots:
Docs updated:
Known follow-up:
Next command:
```

## Failure Recovery

- If Prompt A cannot complete implementation, leave the feature `in_progress`, document the blocker in `missing-feature-list.md`, commit any useful docs or scaffolding only if coherent, and do not mark `qa`.
- If Prompt B finds a serious issue, fix it on the same branch and keep the same PR.
- If a feature proves too large, split it by editing `missing-feature-list.md` first, commit that split, then implement only the first newly split feature.
- If GitHub auth or network access blocks PR operations, keep the branch pushed if possible, document the exact blocker, and include the next command anyway.
