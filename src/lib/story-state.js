const STORY_STATE_KEYS = Object.freeze({
  step: "step",
  linear: "linear",
  speculative: "speculative",
});

export const DEFAULT_STORY_STATE = Object.freeze({
  step: 0,
  linear: false,
  speculative: true,
});

function clampStep(value, maxStep = Number.POSITIVE_INFINITY) {
  const parsed = Number.isFinite(value) ? Math.trunc(value) : DEFAULT_STORY_STATE.step;
  const lowerBounded = Math.max(0, parsed);

  if (!Number.isFinite(maxStep)) {
    return lowerBounded;
  }

  return Math.min(lowerBounded, Math.max(0, Math.trunc(maxStep)));
}

function parseBoolean(value, fallback) {
  if (value === null) {
    return fallback;
  }

  const normalized = value.trim().toLowerCase();

  if (["1", "true", "yes", "on"].includes(normalized)) {
    return true;
  }

  if (["0", "false", "no", "off"].includes(normalized)) {
    return false;
  }

  return fallback;
}

export function normalizeStoryState(
  nextState = DEFAULT_STORY_STATE,
  maxStep = Number.POSITIVE_INFINITY,
) {
  return {
    step: clampStep(nextState.step, maxStep),
    linear: typeof nextState.linear === "boolean"
      ? nextState.linear
      : DEFAULT_STORY_STATE.linear,
    speculative: typeof nextState.speculative === "boolean"
      ? nextState.speculative
      : DEFAULT_STORY_STATE.speculative,
  };
}

export function readStoryState(search = "", maxStep = Number.POSITIVE_INFINITY) {
  const normalizedSearch = search.startsWith("?") ? search.slice(1) : search;
  const params = new URLSearchParams(normalizedSearch);

  return normalizeStoryState(
    {
      step: clampStep(
        Number.parseInt(params.get(STORY_STATE_KEYS.step), 10),
        maxStep,
      ),
      linear: parseBoolean(
        params.get(STORY_STATE_KEYS.linear),
        DEFAULT_STORY_STATE.linear,
      ),
      speculative: parseBoolean(
        params.get(STORY_STATE_KEYS.speculative),
        DEFAULT_STORY_STATE.speculative,
      ),
    },
    maxStep,
  );
}

export function serializeStoryState(nextState = DEFAULT_STORY_STATE, maxStep) {
  const state = normalizeStoryState(nextState, maxStep);
  const params = new URLSearchParams();

  params.set(STORY_STATE_KEYS.step, String(state.step));
  params.set(STORY_STATE_KEYS.linear, state.linear ? "1" : "0");
  params.set(STORY_STATE_KEYS.speculative, state.speculative ? "1" : "0");

  return params.toString();
}

export function buildStoryUrl(
  nextState = DEFAULT_STORY_STATE,
  location = { pathname: "/", hash: "" },
  maxStep,
) {
  const pathname = location.pathname ?? "/";
  const hash = location.hash ?? "";

  return `${pathname}?${serializeStoryState(nextState, maxStep)}${hash}`;
}
