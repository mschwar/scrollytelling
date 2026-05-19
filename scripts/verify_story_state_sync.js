#!/usr/bin/env node

import assert from "node:assert/strict";
import {
  DEFAULT_STORY_STATE,
  buildStoryUrl,
  normalizeStoryState,
  readStoryState,
  serializeStoryState,
} from "../src/lib/story-state.js";

const restored = readStoryState("?step=3&linear=true&speculative=0");
assert.deepEqual(restored, {
  step: 3,
  linear: true,
  speculative: false,
});

const clamped = readStoryState("?step=99&linear=1&speculative=no", 4);
assert.deepEqual(clamped, {
  step: 4,
  linear: true,
  speculative: false,
});

const normalized = normalizeStoryState(
  {
    step: -12,
    linear: false,
    speculative: true,
  },
  2,
);
assert.deepEqual(normalized, {
  step: 0,
  linear: false,
  speculative: true,
});

assert.equal(
  serializeStoryState({
    step: 2,
    linear: true,
    speculative: false,
  }),
  "step=2&linear=1&speculative=0",
);

assert.equal(
  buildStoryUrl(
    {
      step: DEFAULT_STORY_STATE.step,
      linear: DEFAULT_STORY_STATE.linear,
      speculative: DEFAULT_STORY_STATE.speculative,
    },
    {
      pathname: "/story",
      hash: "#hero",
    },
  ),
  "/story?step=0&linear=0&speculative=1#hero",
);

console.log("URL state sync helpers verified.");
