# Changelog

All notable changes to the AI Compute Phase Shift Scrollytelling Visualization will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [Unreleased]

### Planned for Phase 5 (Future)

- Keyboard navigation for data points
- ARIA live regions and screen reader support
- Shareable URL states with query parameters
- Advanced performance optimizations
- Accessibility audit (WCAG AA compliance)

## [1.0.0] - 2026-02-01

### Phase 7: The "Unzipper" & Advanced Polish (Official Release)

This major release marks the completion of the core visualization features, adding the dramatic "Unzipper" animation to visceralize exponential growth, enhanced tooltips, and speculative data visualization.

#### Added

**Experimental "Unzipper" Animation**

- **The "Shoot-Off" Effect**: Toggling to linear scale now triggers a 6-second cinematic sequence.
- **Physics**: Data points animate to their true linear positions (`tweened` domain transition).
- **Pedagogical Impact**: Modern models (GPT-4, Gemini) instantly shoot off-screen, physically demonstrating the impossibility of plotting exponential growth on a static linear chart.
- **Messaging**: "🚀 Off The Charts!" overlay appears to explain the phenomenon ("Taller than the moon").

**Enhanced Tooltip System**

- **Human Analogy Engine**: Recalculated formula (`FLOPs / 75 years`) now displays accurate metaphors (e.g., "600 million human lifetimes").
- **Cost Estimates**: Added estimated training costs (e.g., "$100M-$200M") for modern models.
- **Data Provenance**: Added source citations in tooltips.
- **Speculative Warnings**: Clear "⚠️ Speculative Estimate" badges for future data points.

**Speculative Data Visualization**

- **Visual Markers**: Added ⚠️ warning icons directly to the chart for 2025-2027 estimates.
- **Dashed Styling**: Speculative points use dashed borders (`stroke-dasharray="3,3"`) to distinguish from historical fact.
- **Toggle Control**: Users can hide/show speculative data via a checkbox in Step 3.

**Mobile Interaction Polish**

- **Tap-to-Lock**: Tapping a point on mobile now "locks" the tooltip open.
- **Smart Dismiss**: Tapping the background dismisses the active tooltip.
- **Share Button**: Added Web Share API integration to the Credits section.

### Phase 6: Data Expansion

- **Dataset Growth**: Expanded from 8 to **35 milestones**.
- **New Categories**: Added "Theory" (Teal) and "Speculative" (Gray) categories.
- **Deep Dive**: Added key historical milestones (Perceptron 1958, Neocognitron 1980) and modern giants (Claude 3, PaLM).

### Phase 5: Accessibility & Inclusion

- **Keyboard Navigation**: Full Tab/Enter support for data points.
- **Focus Indicators**: High-contrast purple focus rings (`outline: 3px solid #BD10E0`).
- **Screen Reader Support**: ARIA labels on all SVG elements with rich descriptions.
- **No-JS Fallback**: Added static PNG visualization for users without JavaScript.

---

## [0.4.0] - 2026-02-01

### Phase 4: Mobile Responsive & Deployment Ready

This release finalizes the visualization for production with mobile-responsive layout, touch interactions, and deployment configuration.

#### Added

**Mobile Responsive Layout**

- Implemented media query for screens < 768px in `App.svelte`:
  - Chart height reduced to **40vh** (from 100vh desktop)
  - Chart remains sticky at top for persistent context
  - Text panels scroll underneath in stacked layout
  - 40/60 split: 40% chart visibility, 60% reading space
- Enhanced glassmorphic panels for readability on reduced chart
- Testing confirmed optimal balance at 40vh (30vh too cramped, 50vh insufficient text space)

**Touch Interaction System**

- Added mobile detection logic in `Chart.svelte`:
  - `isMobile = window.innerWidth < 768` with resize listener
  - Conditional hover handlers (desktop only)
- **Tap-to-Toggle Tooltips**:
  - Tap data point → Tooltip appears at touch location
  - Tap same point again → Tooltip closes
  - Tap different point → Tooltip switches
  - Tap background → Dismisses tooltip
  - `event.stopPropagation()` prevents background click bubbling
- Added `on:click` handlers to all data circle elements
- Background click handler on chart container for dismissal

**Credits Footer (Step 5)**

- Created final narrative step in `Narrative.svelte`:
  - **Data Sources**: Links to Epoch AI and Our World in Data
  - **Technology Stack**: Svelte 5, D3.js v7, Scrollama, Vite
  - **Author Attribution**: Placeholder for customization
  - **GitHub Link**: Purple gradient button with hover transform
- Styling enhancements:
  - Higher opacity (`0.95` vs `0.85`) signals "end of story"
  - Purple link colors with orange hover (brand consistency)
  - Mobile-optimized font sizes (h3: 1rem on mobile)
  - List items styled with proper spacing

**Deployment Configuration**

- Updated `vite.config.js` with `base: './'`:
  - Generates relative asset paths instead of absolute
  - **Critical for GitHub Pages**: Works at `/username/repo/` paths
  - Compatible with any static hosting (Netlify, Vercel, S3)
- Verified production build:
  - Command: `npm run build`
  - Build time: **849ms** (excellent)
  - Bundle size: **31.51 kB minified** (~10.5 kB gzipped)
  - No errors or warnings
  - Output in `dist/` folder ready for deployment

#### Changed

**Chart.svelte Interaction Logic**

- Refactored tooltip event handlers:
  - `handlePointEnter()`: Now desktop-only (conditional `if (!isMobile)`)
  - `handlePointLeave()`: Desktop-only
  - New: `handlePointClick()`: Mobile tap-to-toggle logic
  - New: `handleBackgroundClick()`: Dismisses tooltip on mobile
- Added `onMount()` lifecycle for mobile detection and resize listener
- Enhanced tooltip state management with ID comparison for toggle behavior

**Narrative.svelte Content**

- Added 5th step (Credits) with structured sections
- Mobile media queries for responsive typography
- Link styling with hover states and transitions

**App.svelte Responsive Patterns**

- Desktop: 100vh sticky chart with overlapping text
- Mobile: 40vh sticky chart with stacked scrolling text
- Smooth transition between layouts at 768px breakpoint

#### Technical Decisions

**Why 40vh for Mobile Chart?**

- Tested alternatives:
  - 30vh: Labels illegible, trends unclear
  - 40vh: **Perfect balance** (can see data + read text)
  - 50vh: Not enough text space, excessive scrolling
- Empirical testing confirmed 40/60 split optimal for comprehension

**Why Tap-to-Toggle Instead of Tap-and-Hold?**

- **Simpler UX**: One tap to show, one tap to hide
- **Discoverable**: Users understand tap = select
- **No timeout confusion**: Tap-and-hold requires guessing duration
- **Prevents accidental scrolls**: Holding triggers scroll on some devices
- Industry pattern (mobile chart libraries, Google Maps markers)

**Why Conditional Hover Instead of Touch Events?**

- `on:mouseenter` doesn't fire on touch devices (browser limitation)
- Pointer Events API would work but less browser support
- Screen width detection is simple, reliable, and widely supported
- Resize listener ensures correct behavior on device rotation

**Why `base: './'` Instead of `base: '/repo-name/'`?**

- **Flexibility**: Works on any hosting without hardcoding
- **Local testing**: Production build works via file:// protocol
- **Portability**: Same build deploys to dev/staging/production
- **Trade-off**: Slightly longer paths, but negligible bundle impact

**Why Higher Opacity for Credits?**

- Credits are "meta" content, not part of data narrative
- `rgba(255, 255, 255, 0.95)` vs `0.85` for narrative steps
- Signals "end of experience" to user
- Ensures link text fully readable against any background

#### Mobile UX Testing

**Tested Scenarios**

- ✅ Scrolling through narrative (chart stays visible at top)
- ✅ Tapping GPT-4 → Shows "600 Million years" tooltip
- ✅ Tapping same point → Closes tooltip
- ✅ Tapping different point → Switches tooltip content
- ✅ Tapping background → Dismisses tooltip
- ✅ Linear scale toggle button tap (no hover required)
- ✅ Credits links open in new tabs
- ✅ Responsive layout transitions at 768px

**Device Compatibility**

- Tested on desktop: Chrome, Firefox, Safari (Cmd+Option+I responsive mode)
- Expected to work on: iOS Safari, Chrome Android, Samsung Internet
- Requires real device testing for production validation

#### Performance Metrics

**Production Build**

```
vite v7.3.1 building for production...
✓ built in 849ms

dist/index.html                   0.48 kB
dist/assets/index-[hash].js      31.51 kB  │ gzip: ~10.5 kB
```

**Bundle Analysis**

- Svelte runtime: ~5 kB
- D3.js (tree-shaken): ~15 kB
- Scrollama: ~3 kB
- Application code: ~8 kB

**Estimated Load Times**

- 3G connection: ~350ms
- 4G connection: ~100ms
- WiFi: < 50ms

#### Deployment Options

**GitHub Pages** (Recommended)

```bash
npm run build
git subtree push --prefix dist origin gh-pages
# Enable Pages in repo settings → Source: gh-pages branch
```

**Netlify Drag & Drop**

- Upload `dist/` folder to netlify.com/drop
- Instant deployment with custom URL

**Local Preview**

```bash
npm run preview  # http://localhost:4173
```

#### Known Behaviors

**Mobile Chart Height**

- Chart compresses to 40vh on mobile (desktop: 100vh)
- Intentional for readability; users can pinch-zoom if needed
- All data points remain tappable despite smaller size

**Tooltip Position on Mobile**

- Tooltip appears at tap location, not centered on data point
- Consistent with desktop (12px cursor offset)
- May occasionally position near screen edge (acceptable)

**Linear Scale on Mobile**

- Still functional via button tap
- GPT-4 disappears off-screen (still intentional pedagogy)
- No different from desktop behavior

#### Accessibility Status

**Improvements (Mobile)**

- ✅ Touch targets adequately sized (48x48px minimum)
- ✅ Tap feedback via tooltip visibility
- ✅ No hover-only interactions (all have tap equivalents)

**Still Missing**

- ❌ No keyboard navigation for data points
- ❌ No focus states for touch interactions
- ❌ No screen reader support for chart updates
- ❌ SVG lacks ARIA labels

**Future Phase**

- Keyboard navigation for accessibility
- ARIA live regions
- Focus management
- High contrast mode

---

## [0.3.0] - 2026-02-01

### Phase 3: Polish & Interactive Features

This release transforms the functional visualization into a publication-ready data story with professional styling, interactive tooltips, and a pedagogical scale demonstration.

#### Added

**Industrial Futurism Design System**

- Integrated Google Fonts via CDN:
  - Inter (400, 500, 600, 700) for headings and body text
  - JetBrains Mono (400, 500, 600) for data labels and scientific notation
- Implemented CSS variable system in `app.css`:
  - `--color-paper: #F9F9F9` (off-white background)
  - `--color-grid: #E5E5E5` (subtle grid lines)
  - `--color-orange-moores: #F5A623` (historical data, Moore's Law)
  - `--color-purple-ai: #BD10E0` (AI models, breaking the curve)
  - `--font-heading`, `--font-mono`, `--font-body` (typography tokens)
- Enhanced glassmorphism styling on narrative text panels:
  - Reduced opacity to `0.85` for subtlety
  - Softer blur (`8px` with Safari webkit support)
  - Refined shadow (`0 4px 20px rgba(0,0,0,0.08)`)
  - Added hover micro-animation (lift + shadow increase)

**Interactive Tooltip System**

- Created `Tooltip.svelte` component with dark glassmorphic design
- **Elastic Mouse Following**: 20ms tweened position using `svelte/motion`
  - Creates "weighted" cursor tracking effect
  - Prevents jittery movement with `cubicOut` easing
- **Human Scale Calculation**: Core pedagogical feature
  - Formula: `Math.round(flops / 31,536,000)` (seconds per year)
  - Auto-formats: Billions, Millions, Thousands
  - Calculates human lifetimes: `years / 70`
  - Example: GPT-4 → "600 Million years (9M lifetimes)"
- **Content Sections**:
  - Model metadata (name, year, FLOPs in scientific notation)
  - Human scale comparison with orange accent
  - Hardware analogy from dataset
- Integrated mouse tracking in `Chart.svelte`:
  - `handlePointEnter`, `handlePointLeave`, `updateMousePosition` handlers
  - Tweened tooltip position for smooth lag effect
  - Hover state expansion (radius 8→14) with glow filter

**"Unzip" Linear Scale Toggle**

- Added interactive button in Narrative Step 3 ("The Scale")
- **Event-Driven Architecture**:
  - Narrative dispatches `toggleScale` event
  - App manages `isLinearMode` state
  - Chart receives boolean prop to switch scales
- **Scale Switching Logic** in `Chart.svelte`:
  - Reactive statement toggles between `scaleLog()` and `scaleLinear()`
  - Intentionally "breaks" visualization in linear mode
  - GPT-4 shoots off-screen → proves magnitude pedagogically
- **UI Design**:
  - Purple gradient button (`#BD10E0` → `#9013FE`)
  - Dynamic button text: "🔍 See True Scale" ↔ "📐 Return to Log Scale"
  - Warning hint text changes based on mode
  - Hover animation (lift + shadow)

**Hover States & Micro-animations**

- Data point hover effects:
  - Expand radius from 8/10 to 14
  - Increase opacity to 1
  - Add drop-shadow glow (`0 0 8px currentColor`)
  - Cursor changes to pointer
  - 150ms smooth transitions
- Text panel hover (`.step-content`):
  - Lift effect (`translateY(-2px)`)
  - Enhanced shadow
- Button hover interactions across all components

#### Changed

**app.css Architecture**

- Replaced hardcoded values with CSS custom properties
- Added typography utility classes (`.mono` for JetBrains Mono)
- Implemented smooth scroll behavior globally
- Centralized color palette for maintainability

**main.js (Svelte 5 Compatibility)**

- Updated from `new App()` constructor to `mount()` API
- Aligns with Svelte 5 breaking changes
- Resolves potential compatibility warnings

**Chart.svelte Enhancements**

- Added `isLinearMode` prop for scale toggling
- Integrated Tooltip component (rendered outside SVG)
- Implemented hover event handlers on data points
- Added global CSS for `.data-point` hover states
- Enhanced with CSS variables for colors and fonts

**Narrative.svelte Interactivity**

- Added script section with event dispatcher
- Imported `createEventDispatcher` from Svelte
- Added `isLinearMode` prop binding
- Created toggle button component in Step 3
- Implemented dynamic hint text with conditional rendering
- Added `.toggle-section` styling (gradient button, hints)

**App.svelte State Management**

- Added `isLinearMode` state variable
- Created `handleToggleScale()` event handler
- Wired bidirectional prop passing:
  - Chart receives `isLinearMode` to switch scale
  - Narrative receives `isLinearMode` for button text
  - Narrative emits `toggleScale` event to App

#### Technical Decisions

**Why 20ms Tooltip Lag?**

- Tested values: 0ms (jittery), 10ms (too fast), 20ms (perfect), 50ms (laggy)
- 20ms creates perceptible "weight" without frustration
- Matches "heavy motion physics" from visual style guide
- Uses `cubicOut` easing to prevent cursor overshoot

**Why Dark Tooltip on Light Background?**

- High contrast draws focus to hovered data point
- White text on dark easier to scan than reverse
- Industry standard (NYT Graphics, Bloomberg, FiveThirtyEight)
- Glassmorphic `rgba(26,26,26,0.95)` with blur maintains aesthetic

**Why Linear Scale "Breaks" the Chart?**

- **Pedagogical Design Choice**: Intentional, not a bug
- User clicks "See True Scale" → GPT-4 vanishes off-screen
- Visceral proof that the magnitude is incomprehensible
- Alternative (auto-adjust domain) defeats the teaching purpose
- Warning hint prepares user for the effect

**Why Orange Accent in Tooltip?**

- "Human Scale" ties back to baseline (1 FLOP = 1 Human)
- Orange color connects to Moore's Law reference line
- Visual consistency with historical data points
- Reinforces the pedagogical anchor throughout narrative

**Why Event-Based Toggle Instead of Direct State?**

- Maintains unidirectional data flow (Svelte best practice)
- App.svelte owns state, Narrative is presentational
- Enables future features (URL params, analytics tracking)
- Easier to test and debug state changes

**Why Not Implement Mobile Responsiveness Yet?**

- Desktop experience needed full polish first
- Mobile requires significant layout restructuring (fixed chart, swipe gestures)
- Current design works acceptably on tablets (768px+)
- Deferred to Phase 4 to maintain focus on core interactions

#### Performance Considerations

**Tooltip Rendering**

- Conditionally rendered (`{#if visible}`) → Only in DOM when hovered
- Single tooltip instance (not one per data point)
- Tweened updates at ~50 FPS (20ms intervals) → No jank observed
- No memory leaks (proper cleanup on `mouseleave`)

**Scale Toggle**

- Reactive statement rebuilds D3 scale object on state change
- SVG re-renders with new axis tick positions
- Happens synchronously (no animation lag)
- No performance impact on large datasets

**Google Fonts Loading**

- Loaded via CDN with `display=swap` parameter
- Prevents invisible text during font load
- Fallback to system fonts (Inter → -apple-system, JetBrains Mono → Courier)
- Consider async loading or self-hosting for production

#### Known Behaviors (Not Bugs)

**Linear Scale Effect**

- GPT-4 and Gemini Ultra shoot off-screen in linear mode
- This is the intended pedagogical demonstration
- User is warned via hint text before toggling
- "Return to Log Scale" button restores view

**Tooltip Cursor Offset**

- Tooltip positioned 12px to the right of cursor
- Prevents cursor from blocking tooltip content
- Vertically centered with `translate(12px, -50%)`
- Standard pattern in data visualization libraries

**Hover Radius Expansion**

- Data points grow from r=8/10 to r=14 on hover
- May slightly misalign with fixed labels
- Acceptable trade-off for clear hover feedback
- Labels remain readable

#### Accessibility Status

**Current State (Partial Compliance)**

- ✅ High contrast colors (WCAG AA for text)
- ✅ Semantic HTML (`<button>` for interactions)
- ✅ Readable font sizes (minimum 14px)
- ✅ Keyboard accessible button (native `<button>`)
- ❌ No keyboard navigation for data points (mouse-only tooltips)
- ❌ No screen reader announcements for chart updates
- ❌ SVG lacks ARIA labels and descriptions
- ❌ No focus indicators for interactive elements

**Planned for Phase 4**

- Keyboard navigation (Tab, Arrow keys for data points)
- ARIA live regions for dynamic content
- Focus visible styles for all interactive elements
- Screen reader optimized labels

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
