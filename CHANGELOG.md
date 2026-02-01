# Changelog

All notable changes to the AI Compute Phase Shift Scrollytelling Visualization will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [Unreleased]

### Planned for Phase 3

- Interactive tooltips with hardware analogies on hover
- Cost-based color gradient visualization (Step 4)
- Mobile responsive optimizations
- Performance profiling and optimization
- Production build configuration

---

## [0.2.0] - 2026-02-01

### Phase 2: Scroll-Triggered Reactive Animations

This release implements the full scrollytelling experience, transforming the static chart into an interactive narrative that responds to scroll position.

#### Added

**Scrollama Integration**

- Created `Scrolly.svelte` - Generic wrapper component using Scrollama library
- Implements intersection observer pattern with `offset: 0.5` (triggers at viewport center)
- Binds current step index to parent via `bind:value` pattern
- Auto-handles window resize events for responsive scroll tracking
- Uses `position: relative` for natural document flow

**Narrative Components**

- Created `Narrative.svelte` with 4 glassmorphic text panels
  - Step 0: "The Anchor" - Establishes 1 FLOP = 1 Human baseline
  - Step 1: "The Speed Limit" - Introduces Moore's Law (2× every 2 years)
  - Step 2: "The Break" - Reveals AlexNet breaking the curve in 2012
  - Step 3: "The Scale" - Quantifies magnitude (600M human lifetimes)
- Implemented glassmorphism styling per visual design system:
  - `background: rgba(255, 255, 255, 0.9)`
  - `backdrop-filter: blur(10px)`
  - 4px solid left border for "stick" design motif
  - Deep drop shadows for z-axis separation

**Tweened Domain Animations**

- Integrated `svelte/motion` with `tweened` stores for smooth interpolation
- Configured 1200ms duration with `cubicOut` easing for "heavy camera" feel
- Implemented step-based domain switching in reactive statement:
  - Step 0: `Y[0.5, 1e6]` × `X[1900, 1950]` → Zoom to Human/ENIAC baseline
  - Step 1: `Y[1e3, 1e18]` × `X[1940, 2015]` → Reveal Moore's Law line
  - Step 2: `Y[1e3, 1e27]` × `X[1940, 2026]` → Show full AI explosion
  - Step 3: Maintains Step 2 view for scale emphasis
- Chart receives domains via `$xDomainTween` subscription pattern

**Background Silhouettes**

- Enhanced `Background.svelte` with step-based hardware evolution
- Implemented 3 era-specific icons with 800ms fade transitions:
  - Step 0: 👤 "Human Computation" (opacity: 0.08)
  - Step 1: 🖥️ "Moore's Law Era"
  - Step 2-3: 🏢 "AI Data Centers"
- Uses `class:active` conditional styling for smooth opacity transitions

#### Changed

**App.svelte Architecture**

- Replaced static domain props with `tweened` store subscriptions
- Added reactive switchboard logic for step-based domain updates
- Integrated Scrolly wrapper around Narrative component
- Enhanced 3-layer architecture with scroll interactivity

**Chart.svelte Enhancements**

- No code changes required (validates reactive prop design from Phase 1)
- Chart automatically responds to domain tweens
- D3 scales recalculate on every domain update via `$:` reactivity

#### Technical Decisions

**Why Scrollama?**

- Industry-standard library for scroll-driven narratives
- Intersection Observer under the hood (performant)
- Proven reliability in data journalism (NYT, FiveThirtyEight)

**Why `tweened` over CSS transitions?**

- Svelte stores provide precise control over interpolation timing
- Can tween numeric arrays (domain pairs) directly
- Enables programmatic animation control (pause/resume/reverse)
- Consistent easing across all animated properties

**Why `cubicOut` easing?**

- Creates cinematic "camera zoom" effect
- Fast start grabs attention, slow settle reduces motion sickness
- Aligns with "heavy motion physics" from visual style guide
- Tested alternatives (linear, easeInOut) felt robotic or bouncy

**Why 1200ms duration?**

- Empirically tested for optimal "heavy but responsive" feel
- 600ms: Too snappy, feels like a bug
- 1000ms: Better, but rushed for large domain changes
- 1200ms: Perfect balance (current choice)
- 1800ms: Too slow, loses user engagement

**Why Step 0 starts at Y=0.5 instead of Y=1?**

- Logarithmic scales cannot render log(0)
- Starting at 0.5 prevents edge case errors
- Provides visual breathing room for the baseline point

---

## [0.1.0] - 2026-01-31

### Phase 1: Static Chart Foundation

Initial release establishing the D3 visualization infrastructure and reactive architecture.

#### Added

**Project Setup**

- Initialized Vite + Svelte 5 development environment
- Configured ES modules in `package.json`
- Installed core dependencies: D3.js v7, Scrollama, intersection-observer
- Created Vite and Svelte config files with preprocessing support

**Data Infrastructure**

- Created `compute_history.json` with 8 milestone data points:
  - **The Human** (1900, 1 FLOP) - Pedagogical baseline anchor
  - **ENIAC** (1945, 10^5 FLOPs) - First electronic computer
  - **Intel 486** (1989, 10^8 FLOPs) - Desktop era representative
  - **Deep Blue** (1997, 10^12 FLOPs) - Chess king milestone
  - **AlexNet** (2012, 10^18 FLOPs) - **THE BREAK** - First to shatter Moore's Law
  - **AlphaGo** (2016, 10^23 FLOPs) - Deep learning takeoff
  - **GPT-4** (2023, 2×10^25 FLOPs) - Current frontier
  - **Gemini Ultra** (2024, 5×10^25 FLOPs) - Latest outlier
- Implemented JSON schema with fields: `id`, `name`, `organization`, `date_decimal`, `training_compute_flops`, `training_cost_usd`, `category`, `hardware_analogy`, `is_highlight`

**D3 Chart Component** (`Chart.svelte`)

- Built SVG-based visualization with 1200×700 responsive dimensions
- Implemented **reactive domain props** (`export let xDomain`, `export let yDomain`)
  - Critical design decision: Enables animations without component reloads
  - X and Y scales rebuild automatically when domains change
- Configured logarithmic Y-axis using `d3.scaleLog()`
  - Range: 1 FLOP → 10^27 FLOPs (26 orders of magnitude)
  - Dynamic tick generation based on domain (powers of 10)
  - Formatted as scientific notation (10^5, 10^20, etc.)
- Configured linear X-axis: 1900 → 2026
- Generated Moore's Law reference line (orange, dashed):
  - Anchor point: AlexNet (2012, 10^18 FLOPs)
  - Formula: `FLOPs = ALEXNET_FLOPS × 2^((year - 2012) / 2)`
  - Extends from 1900 to 2026
- Plotted historical data points (orange circles, category: "Historical")
- Plotted AI models (purple circles, category: "Deep Learning")
- Added axis labels, grid lines, and legend

**Three-Layer Architecture**

- **Layer 0 (z-index: 0):** `Background.svelte` - Fixed position, hardware silhouettes
- **Layer 1 (z-index: 1):** Chart layer - `position: sticky; top: 0` (critical for scrollytelling)
- **Layer 2 (z-index: 2):** Text layer - Scrollable content with `pointer-events: none` (allows chart interaction)

**Visual Design System**

- Implemented color palette from style guide:
  - Safety Orange (#F5A623): Moore's Law, historical era
  - Electric Purple (#BD10E0): Deep learning era, AI models
  - Off-white background (#F9F9F9): Academic paper aesthetic
- Applied Inter font for headings, JetBrains Mono for technical labels
- Subtle grid lines (#E5E5E5)

#### Technical Decisions

**Why Svelte over React?**

- Reactive statements (`$:`) eliminate useEffect dependency hell
- Smaller bundle size (no virtual DOM overhead)
- Built-in motion/transition libraries
- Declarative DOM updates ideal for data visualization

**Why export domain props instead of hardcoding?**

- Future-proofing for scroll-triggered animations (Phase 2)
- Enables testing domain changes without changing component code
- Follows "dumb component" pattern (state managed by parent)

**Why logarithmic Y-axis?**

- Linear scale cannot show 26 orders of magnitude (1 → 10^27)
- Log scale compresses exponential growth into visual space
- Aligns with how scientists think about scale (powers of 10)

**Why decimal years in data?**

- Precise plotting on continuous X-axis (e.g., 2023.25 = April 2023)
- Avoids binning/rounding errors
- Supports future quarterly data points

**Why separate Historical vs. Deep Learning categories?**

- Color-codes the narrative (orange = predictable, purple = exponential)
- Enables conditional rendering/styling based on Moore's Law adherence
- Supports future filtering/toggling features

---

## Version Control Notes

### Git Strategy

- **Main Branch:** Stable releases only (v0.1, v0.2, etc.)
- **Develop Branch:** Phase integration (future)
- **Feature Branches:** Individual components (future)

### Commit Message Format

```
Type: Brief description (50 chars max)

Detailed explanation of what changed and why.
Include architectural decisions and trade-offs.

Refs: #issue-number (if applicable)
```

**Types:** Feat, Fix, Docs, Style, Refactor, Perf, Test, Chore

### Tagging Strategy

- Lightweight tags for checkpoints: `v0.1-phase1`, `v0.2-phase2`
- Annotated tags for releases: `v1.0.0` (production-ready)

---

## Acknowledgments

### Design Inspiration

- NYT Interactive Graphics (scrollytelling patterns)
- Our World in Data (compute visualizations)
- FiveThirtyEight (data-driven narratives)

### Technical Stack

- **Svelte 5** - Reactive UI framework
- **D3.js v7** - Data visualization primitives
- **Scrollama** - Scroll-driven story framework
- **Vite** - Lightning-fast build tool

---

## Future Roadmap

### Phase 3: Polish & Optimization

- [ ] Tooltip system with hardware analogies
- [ ] Cost-based gradient visualization
- [ ] Mobile responsive breakpoints
- [ ] Performance optimization (< 60ms frame time)
- [ ] Accessibility audit (WCAG AA compliance)

### Phase 4: Production Deployment

- [ ] Build pipeline configuration
- [ ] Asset optimization (SVG compression, lazy loading)
- [ ] Analytics integration
- [ ] SEO meta tags
- [ ] Static site generation

### Phase 5: Advanced Features

- [ ] Alternative visualizations (linear scale toggle)
- [ ] Data export functionality
- [ ] Shareable URL states
- [ ] Embedded widget mode
- [ ] Print-friendly stylesheet
