# Two-Prompt Loop Plan

This repo is now set up for a repeating two-prompt loop:

1. Prompt A: create a feature branch, implement the next feature on the queue, run the required verification, commit, and push.
2. Prompt B: `/qa` the feature in the browser or via an explicit non-UI check, update docs, commit, push, and merge.

## Rules For Every Feature

- One feature per branch.
- One branch per PR.
- No shared implementation branches unless a prerequisite is already merged.
- Each feature must have one of two verification paths:
  - browser QA with screenshots, or
  - an explicit non-UI verification command that proves the change is correct.
- The next agent must be able to find the feature state from repo files alone.
- Each feature must update `CURRENT_STATE.md` if the repo truth changes.
- Each feature must update this plan if the queue changes.

## Branch Naming

- Use `feat/<short-slug>` for product work.
- Use `fix/<short-slug>` for correctness or regressions.
- Keep branch names stable and descriptive enough that a later agent can infer scope without chat history.

## Merge Gate

A feature is mergeable only when all of these are true:

- `npm run validate` passes.
- `npm run build` passes.
- Browser QA screenshots or non-UI verification evidence are recorded in the PR.
- The feature is documented in `CURRENT_STATE.md` or `README.md` if it changes user-visible behavior.
- The branch touches only the files needed for that feature.

## Completed Features

- URL State Sync
  - Branch: `feat/url-state-sync`
  - Goal: preserve `step`, `linear mode`, and `speculative` state in the URL so a session can be reopened and shared.
  - Result: query parameters now reopen the same story state, and the share action copies the current view URL.
  - Verification: `npm run verify:url-state`, `npm run validate`, and `npm run build`.
  - Docs: `README.md`, `CURRENT_STATE.md`, and this plan.
- Keyboard Navigation Upgrade
  - Branch: `feat/keyboard-navigation`
  - Goal: make data point navigation fully keyboard-driven with arrow-key traversal and explicit focus handoff.
  - Result: the Scale panel can hand focus into the chart, and the chart now supports roving focus across visible points with live announcements.
  - Verification: `npm run validate`, `npm run build`, and browser QA in headless Chromium with keyboard-only traversal.
  - Docs: `README.md`, `CURRENT_STATE.md`, and this plan.

## Feature Queue

Pick the first unchecked item unless a later item is blocked by an explicit prerequisite.

### 1. Provenance and Sources View

- Branch: `feat/provenance-view`
- Goal: make dataset provenance easier to audit without reading raw JSON.
- Scope: source grouping, speculative vs. historical labeling, and a compact credits or sources panel.
- Verification: non-UI validation for source coverage plus browser QA for the rendered view.
- Docs: `README.md`, `CURRENT_STATE.md`, and source notes if any fields change.

### 2. Share And Snapshot

- Branch: `feat/share-snapshot`
- Goal: provide a clear export or share action for the current story state.
- Scope: copy-link, Web Share fallback, or static snapshot download.
- Verification: browser QA with a recorded interaction and screenshot.
- Docs: `README.md` and `CURRENT_STATE.md`.

### 3. Accessibility Hardening

- Branch: `feat/accessibility-hardening`
- Goal: close the remaining accessibility gaps without changing the story.
- Scope: aria-live updates, reduced-motion handling, and any missing keyboard semantics.
- Verification: browser QA plus explicit checks for the relevant aria and motion behavior.
- Docs: `README.md`, `CURRENT_STATE.md`, and audit notes.

### 4. Dependency Cleanup

- Branch: `chore/dependency-cleanup`
- Goal: remove or replace low-value dependencies when the behavior is already covered natively.
- Scope: dependency review, lockfile update, and any necessary browser compatibility verification.
- Verification: non-UI validation via build and validation commands, plus browser smoke if the runtime surface changes.
- Docs: `CURRENT_STATE.md` and the audit file.

## Feature Packet Template

Copy this structure into the next branch notes or PR description:

- Feature:
- Branch:
- Why now:
- Scope boundaries:
- Verification path:
- Docs to update:
- Merge blockers:
- Rollback note:

## Handoff Rule

When a feature lands, move it out of the queue and refresh `CURRENT_STATE.md` so the next agent can start from the updated truth without reading chat history.
