# AI Training Compute Scrollytelling Visualization

[![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)](./CHANGELOG.md)
![Scrollytelling Demo](https://img.shields.io/badge/demo-scroll--driven-purple)

## TL;DR

This Svelte and D3 web app reads curated compute milestones from `src/data/compute_history.json`, validates dataset fields and links with `npm run validate`, and renders a five-step interactive chart comparing model training runs against a hardware growth baseline.

## Inputs, Checks, and Outputs

Current repository status and contributor rules live in [CURRENT_STATE.md](./CURRENT_STATE.md) and [AGENTS.md](./AGENTS.md). The editorial source of truth lives in [docs/editorial/story-contract.md](./docs/editorial/story-contract.md).

- **Inputs**: Milestone records in `src/data/compute_history.json`, URL query parameters (`step`, `linear`, `speculative`), and scroll or keyboard interactions.
- **Checks**: Repository structure, link targets, and dataset provenance fields via `npm run validate`; URL state helpers via `npm run verify:url-state`; documentation hygiene via `/usr/bin/python3 -m unittest tests/test_doc_hygiene.py -v`.
- **Outputs**: A static bundle in `dist/` (`npm run build`) with a sticky D3 SVG chart, five narrative panels, scale and speculative-data toggles, focusable data points, and grouped provenance cards.

## The Story

This visualization presents compute growth in five acts, using Floating-Point Operation (FLOP) counts to measure total arithmetic operations:

1. **Anchor**: Give the reader a rough human-scale baseline for 1 FLOP.
2. **Baseline**: Show the older hardware-progress intuition often summarized as Moore's Law.
3. **Inflection**: Show how deep-learning training runs visibly diverged from that baseline after 2012.
4. **Scale**: Make the modern magnitude inspectable through documented comparisons and scale switching.
5. **Trust**: Separate historical, estimated, speculative, and pedagogical data so readers can audit the chart.

As you scroll, the chart zooms to frame each milestone. Interactive tooltips display scale analogies and source labels, while the linear-scale toggle shows why a logarithmic axis is required across 26 orders of magnitude.

The current story state is shareable through the URL query string (`step`, `linear`, and `speculative`) so a copied link reopens the same view.

The production site deploys from pushes to `main` through GitHub Actions at <https://mschwar.github.io/scrollytelling/>.

---

## Quick Start

### Prerequisites

- Node.js 18+ ([Download](https://nodejs.org/))
- Python 3.10+ for documentation hygiene checks
- Git ([Download](https://git-scm.com/))

### Installation

```bash
git clone https://github.com/mschwar/scrollytelling.git
cd scrollytelling
npm install
npm run dev
```

Open <http://localhost:5173> in your browser.

---

## Architecture

### Tech Stack

- **Svelte 5**: Reactive user interface framework
- **D3.js v7**: Data visualization scales, shapes, and axes
- **Scrollama**: Scroll-driven step detection
- **Vite**: Frontend bundler and local development server

### Component Hierarchy

```text
App.svelte (State Orchestrator)
├── Background.svelte (Layer 0: Hardware silhouettes)
├── Chart.svelte (Layer 1: D3 SVG visualization)
└── Scrolly.svelte (Layer 2: Scroll sensor)
    └── Narrative.svelte (Text panels)
```

### Key Design Patterns

#### 1. Reactive Domain Props

```svelte
// Chart.svelte
export let xDomain = [1900, 2026];
export let yDomain = [1e0, 1e27];

$: xScale = scaleLinear().domain(xDomain).range([0, innerWidth]);
```

Reactive domain bindings update axis positions without reloading components.

#### 2. Tweened Store Interpolation

```svelte
// App.svelte
const yDomainTween = tweened([1e0, 1e27], {
  duration: 1200,
  easing: cubicOut
});

// On scroll step change
yDomainTween.set([1e3, 1e18]);
```

#### 3. Three-Layer Z-Index Architecture

- **z-index 0**: Background (`Background.svelte`, fixed low-contrast silhouettes)
- **z-index 1**: Chart (`Chart.svelte`, sticky SVG canvas)
- **z-index 2**: Narrative (`Narrative.svelte`, scrollable step cards)

---

## Project Structure

```text
scrollytelling/
├── src/
│   ├── components/
│   │   ├── Chart.svelte          # D3 visualization (reactive scales)
│   │   ├── Background.svelte     # Step-based hardware icons
│   │   ├── Scrolly.svelte        # Scrollama wrapper
│   │   ├── Narrative.svelte      # Text step panels
│   │   └── Tooltip.svelte        # Hover and focus readouts
│   ├── data/
│   │   └── compute_history.json  # Curated milestone dataset
│   ├── lib/
│   │   ├── provenance.js         # Grouped source summary builder
│   │   └── story-state.js        # URL query-string state helpers
│   ├── App.svelte                # State management and domain switching
│   ├── main.js                   # Entry point
│   └── app.css                   # Global styles
├── docs/
│   └── editorial/
│       └── story-contract.md     # Editorial source of truth
├── scripts/
│   ├── validate_repo.js          # Structural and dataset validator
│   └── verify_story_state_sync.js
├── tests/
│   └── test_doc_hygiene.py       # Zero-dependency doc hygiene gate
├── CHANGELOG.md                  # Historical version log
├── package.json
├── vite.config.js
└── svelte.config.js
```

---

## Data Schema

Each entry in `src/data/compute_history.json` follows this structure:

```json
{
  "id": "gpt-4",
  "name": "GPT-4",
  "organization": "OpenAI",
  "date_decimal": 2023.25,
  "training_compute_flops": 2e25,
  "training_cost_usd": 100000000,
  "category": "Deep Learning",
  "hardware_analogy": "The Galaxy",
  "human_analogy": "600 million human lifetimes",
  "source": "Epoch AI",
  "is_highlight": true
}
```

**Selected Milestones:**

- The Human (1900, 1 FLOP)
- Electronic Numerical Integrator and Computer (ENIAC) (1945, 10^5 FLOPs)
- AlexNet (2012, 10^18 FLOPs) — post-2012 inflection point
- GPT-4 (2023, 2 x 10^25 FLOPs)

---

## Visual Design System

### Color Palette

- **Safety Orange** (`#F5A623`): Moore's Law baseline and pre-2012 hardware milestones
- **Electric Purple** (`#BD10E0`): Deep-learning era training runs
- **Off-White** (`#F9F9F9`): Paper-inspired canvas background

### Typography

- **Headings**: Inter (Bold)
- **Technical Labels**: JetBrains Mono
- **Body Text**: Inter (Regular)

### Motion Design

- **Duration**: 1200ms camera domain interpolation
- **Easing**: `cubicOut` (fast start, gradual settle)
- **Background Transitions**: 800ms opacity fade for hardware silhouettes

---

## Verification and Testing

### Automated Checks

```bash
npm run validate
npm run verify:url-state
/usr/bin/python3 -m unittest tests/test_doc_hygiene.py -v
```

### Manual Verification Checklist

```bash
npm run dev
```

1. Scroll down slowly and confirm the chart zooms smoothly across steps.
2. Step 0: Confirm the human baseline (1 FLOP) is visible.
3. Step 1: Confirm the orange Moore's Law baseline line renders.
4. Step 2: Confirm purple deep-learning points diverge above the baseline.
5. Step 3: Confirm the linear-scale button and speculative-data checkbox update the chart.
6. Step 4: Confirm the Credits card groups provenance into historical records and speculative estimates.

### URL State

- Changing the active step, scale mode, or speculative toggle updates `?step=...&linear=...&speculative=...` in the browser address bar.
- Reopening a copied link restores the same step and toggle state.
- `npm run verify:url-state` tests URL parsing, clamping, and serialization directly.

### Keyboard Navigation and Screen Readers

- `Tab` reaches the Scale panel controls, and `Jump to Data Points` moves focus into the SVG chart via click, `Enter`, or `Space`.
- `Arrow Left`, `Arrow Right`, `Arrow Up`, and `Arrow Down` move between visible milestones; `Home` and `End` jump to the endpoints.
- `Enter` or `Space` pins the active tooltip, `Escape` clears it, and `L` toggles linear mode outside text inputs.
- Accessible Rich Internet Applications (ARIA) live regions announce the active step (`aria-current="step"`) and focused chart values.

---

## Development Scripts and Deployment

```bash
# Start local development server
npm run dev

# Build static production assets into dist/
npm run build

# Preview the production build locally
npm run preview

# Validate repository files, links, and dataset records
npm run validate

# Verify URL query-string state helpers
npm run verify:url-state
```

GitHub Actions builds and publishes `dist/` to <https://mschwar.github.io/scrollytelling/> on pushes to `main`.

---

## Historical Design Briefs and Changelog

Initial planning briefs remain on disk for reference:

- [00_Master_Brief.md.md](./00_Master_Brief.md.md)
- [01_Narrative_Script.md.md](./01_Narrative_Script.md.md)
- [02_Tech_Architecture.md.md](./02_Tech_Architecture.md.md)
- [03_Data_Specs.md.md](./03_Data_Specs.md.md)
- [04_Visual_Style_Guide.md.md](./04_Visual_Style_Guide.md.md)

See [CHANGELOG.md](./CHANGELOG.md) for historical release notes and [CURRENT_STATE.md](./CURRENT_STATE.md) for current repository status.

---

## Acknowledgments and Data Sources

- [Epoch AI](https://epochai.org/) — Machine learning compute dataset
- [Our World in Data](https://ourworldindata.org/technological-progress) — Historical computing benchmarks
- Editorial scrollytelling inspiration from [The New York Times](https://www.nytimes.com/interactive) and [FiveThirtyEight](https://fivethirtyeight.com/)

---

## License

License status is unresolved. `package.json` declares `"ISC"`, while no `LICENSE` file is checked into the repository. See [CURRENT_STATE.md](./CURRENT_STATE.md) before redistributing.
