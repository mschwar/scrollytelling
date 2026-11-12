# Technical Architecture: Compute Scrollytelling Visualization

**Version:** 1.0
**Dependency:** Companion to [00_Master_Brief.md.md](./00_Master_Brief.md.md) and [01_Narrative_Script.md.md](./01_Narrative_Script.md.md)

---

## 1. Technology Stack

The client uses a reactive frontend stack built for declarative SVG rendering:

- **Core Framework — Svelte 5:** Reactive declarations keep scroll state and chart dimensions synchronized without manual DOM diffing.
- **Visualization — D3.js (v7):** Supplies mathematical scales (`d3-scale`) and path generators (`d3-shape`), while Svelte templates own SVG elements.
- **Scroll Detection — Scrollama:** Dispatches step-enter events using browser intersection observers.
- **Styling — Plain CSS:** Component-scoped styles and `src/app.css` custom properties without Sassy Cascading Style Sheets (SCSS) preprocessors.

---

## 2. Component Hierarchy

The implemented application structure in `src/` organizes state around `App.svelte`:

```text
src/
├── components/
│   ├── Background.svelte    # Hardware silhouettes (ENIAC to GPU clusters)
│   ├── Chart.svelte         # Sticky SVG canvas, D3 scales, and focusable points
│   ├── Narrative.svelte     # Five scrolling narrative cards and controls
│   ├── Scrolly.svelte       # Scrollama step observer wrapper
│   └── Tooltip.svelte       # Hover and keyboard readout card
├── data/
│   └── compute_history.json # Curated compute dataset
├── lib/
│   ├── provenance.js        # Source grouping helper
│   └── story-state.js       # Query-string state parser and serializer
└── App.svelte               # Top-level state orchestrator
```

Electronic Numerical Integrator and Computer (ENIAC) through modern cluster silhouettes render behind the sticky SVG layer.

---

## 3. State Management Strategy

Top-level state lives in `src/App.svelte` and flows downward via props:

1. `currentStep` (`0` through `4`): Updated by `Scrolly.svelte` and mirrored to `?step=` in the URL.
2. `yDomain` (`[min, max]`): Tweened via `svelte/motion` from `[1, 1e15]` in early steps to `[1, 1e27]` in later steps.
3. `isLinearMode` (boolean): Switches the vertical axis between `scaleLog` and `scaleLinear`.
4. `showSpeculative` (boolean): Shows or hides speculative future points.

---

## 4. Implementation Rules

### A. Declarative SVG Rendering

Bind Svelte expressions directly to SVG attributes (`<circle cx={xScale(d.date_decimal)} cy={yScale(d.training_compute_flops)} />`) instead of mutating nodes with `d3.select().transition()`. Declarative bindings prevent rapid scrolling from desynchronizing visual state.

### B. Sticky Layering

- Keep `.chart-container` sticky (`position: sticky; top: 0; height: 100vh;`).
- Scroll narrative steps above the chart (`z-index: 2`) with `pointer-events: none` on the outer wrapper and `pointer-events: all` on `.step-content` so chart tooltips remain reachable.

### C. Rendering Performance

- Position tooltips with CSS `transform: translate(...)` to avoid layout thrashing.
- Keep SVG rendering for datasets under 100 milestones so labels and focus rings stay crisp.

---

## 5. Next Specification

See [03_Data_Specs.md.md](./03_Data_Specs.md.md) for the JSON schema fields and baseline formulas consumed by `src/components/Chart.svelte`.
