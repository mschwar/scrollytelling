# AI Compute "Phase Shift" Scrollytelling Visualization

> An interactive data visualization proving AI training compute broke Moore's Law in 2012.

[![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)](./CHANGELOG.md)

![Scrollytelling Demo](https://img.shields.io/badge/demo-scroll--driven-purple)

---

Current repo truth and contributor bootstrap notes live in [CURRENT_STATE.md](./CURRENT_STATE.md) and [AGENTS.md](./AGENTS.md).

## 📊 The Story

This visualization tells a data-driven story in five acts:

1. **The Anchor**: Establish 1 FLOP = 1 Human math problem per second
2. **The Speed Limit**: Show Moore's Law as the "golden rule" (2× every 2 years)
3. **The Break**: Reveal how AlexNet (2012) shattered that curve
4. **The Scale**: Measure the magnitude (GPT-4 = 600 million human lifetimes)
5. **The Provenance**: Group source labels into historical records and speculative estimates, then show the tech stack and attribution

As you scroll, the chart dynamically zooms to highlight each milestone. **Interactive tooltips** reveal human-scale analogies ("600 million years"), and the **"Unzipper" animation** physically demonstrates the scale by shooting modern AI models off the screen.

The current story state is shareable through the URL. `step`, `linear`, and `speculative` are encoded in the query string so a copied link reopens the same view.

The production site auto-deploys from pushes to `main` through GitHub Actions and is published at <https://mschwar.github.io/scrollytelling/>.

---

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ ([Download](https://nodejs.org/))
- Git ([Download](https://git-scm.com/))

### Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd scrollytelling

# Install dependencies
npm install

# Start development server
npm run dev
```

Open **<http://localhost:5173>** in your browser.

---

## 🏗️ Architecture

### Tech Stack

- **Svelte 5** - Reactive UI framework
- **D3.js v7** - Data visualization (scales, shapes, axes)
- **Scrollama** - Scroll-driven narrative engine
- **Vite** - Lightning-fast build tool

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

Enables animations without component reloads.

#### 2. Tweened Store Interpolation

```svelte
// App.svelte
const yDomainTween = tweened([1e0, 1e27], { 
  duration: 1200, 
  easing: cubicOut 
});

// On scroll step change
yDomainTween.set([1e3, 1e18]); // Smoothly animates
```

#### 3. Three-Layer Z-Index Architecture

- **z-index 0**: Background (fixed, subtle icons)
- **z-index 1**: Chart (sticky, remains visible)
- **z-index 2**: Text (scrollable, glassmorphic panels)

---

## 📂 Project Structure

```text
scrollytelling/
├── src/
│   ├── components/
│   │   ├── Chart.svelte          # D3 visualization (reactive scales)
│   │   ├── Background.svelte     # Step-based hardware icons
│   │   ├── Scrolly.svelte        # Scrollama wrapper
│   │   └── Narrative.svelte      # Text step panels
│   ├── data/
│   │   └── compute_history.json  # 8 milestone data points
│   ├── App.svelte                # State management & domain switching
│   ├── main.js                   # Entry point
│   └── app.css                   # Global styles
├── CHANGELOG.md                  # Version history & design decisions
├── package.json
├── vite.config.js
└── svelte.config.js
```

---

## 📈 Data Schema

Each data point in `compute_history.json` follows this structure:

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
  "is_highlight": true
}
```

**Key Milestones:**

- The Human (1900, 1 FLOP)
- ENIAC (1945, 10^5 FLOPs)
- AlexNet (2012, 10^18 FLOPs) ← **THE BREAK**
- GPT-4 (2023, 2×10^25 FLOPs)

---

## 🎨 Visual Design System

### Color Palette

- **Safety Orange** (#F5A623): Moore's Law, Historical era
- **Electric Purple** (#BD10E0): Deep Learning era, AI models
- **Off-White** (#F9F9F9): Background (academic paper aesthetic)

### Typography

- **Headings**: Inter (Bold)
- **Technical Labels**: JetBrains Mono
- **Body Text**: Inter (Regular)

### Motion Design

- **Duration**: 1200ms (empirically tested for "heavy camera" feel)
- **Easing**: cubicOut (fast start, slow settle)
- **Transitions**: 800ms for background icons

---

## 🧪 Testing

### Manual Testing Checklist

```bash
npm run dev
```

1. ✅ Scroll down slowly - Chart should zoom smoothly
2. ✅ Step 0: Human baseline (1 FLOP) is clearly visible
3. ✅ Step 1: Orange Moore's Law line appears
4. ✅ Step 2: Purple AI dots "explode" upward
5. ✅ Background icons fade (👤 → 🖥️ → 🏢)
6. ✅ Text boxes have glassmorphic blur effect
7. ✅ Step 4: The Credits step groups provenance into historical and speculative cards, and the speculative toggle hides the future estimates cleanly

### Debug Mode

Enable Scrollama visual debugger:

```svelte
// Scrolly.svelte
.setup({
  debug: true  // Shows step boundaries
})
```

### URL State

- Copy the URL after changing the step, scale mode, or speculative toggle.
- Reopening that link restores the same story state.
- `npm run verify:url-state` checks the URL-state helper logic directly.

### Keyboard Navigation

- Tab reaches the Scale panel controls, then `Jump to Data Points` hands
  keyboard focus into the chart.
- The `Jump to Data Points` button responds to click, Enter, and Space.
- It is the explicit entry point for keyboard users moving from the narrative
  into the chart.
- Use `Arrow Left` / `Arrow Right` or `Arrow Up` / `Arrow Down` to move
  between data points once focus is in the chart.
- `Home` and `End` jump to the first or last visible point.
- `Enter` or `Space` keeps the current point open, and `Escape` clears the
  tooltip.
- The `L` shortcut still toggles the linear scale outside editable fields.

## 🚢 Deployment

GitHub Actions builds and deploys the production site automatically on pushes to `main`.

- Production URL: <https://mschwar.github.io/scrollytelling/>
- Build command: `npm run build`
- Local production preview: `npm run preview`

---

## 🔧 Development Scripts

```bash
# Start dev server with hot reload
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Save git checkpoint (Windows)
save_checkpoint.bat

# Validate the repo state
npm run validate
```

---

## 📋 Roadmap

See [CHANGELOG.md](./CHANGELOG.md) for detailed version history.

### Phase 1 ✅ (v0.1.0)

- Static D3 chart with reactive scales
- Logarithmic Y-axis (1 → 10^27 FLOPs)
- Moore's Law reference line
- 3-layer architecture foundation

### Phase 2 ✅ (v0.2.0)

- Scrollama integration
- Tweened domain animations
- Glassmorphic narrative panels
- Background silhouette fading

### Phase 3 ✅ (v0.3.0)

- Interactive tooltips with human scale analogies
- Linear scale toggle ("unzip" the logarithmic compression)
- Industrial futurism design system
- Elastic mouse-following tooltip animations
- Hover states and micro-animations

### Phase 4 ✅ (v0.4.0)

- Mobile responsive layout (40vh sticky chart)
- Touch interaction system (tap-to-toggle tooltips)
- Production deployment configuration
- Credits footer with data sources
- GitHub Pages ready builds

### Phase 5 (Future)

- [x] Keyboard navigation for data points
- [x] ARIA live regions and screen reader support
- [ ] Accessibility audit (WCAG AA compliance)

### Screen Reader Support

- The current story step is announced through a polite live region.
- The chart announces focused data points and state changes as you move
  through the visualization.
- SVG data points are explicitly focusable so keyboard users can land on the
  chart consistently across browsers.
- The active narrative panel is marked with `aria-current="step"` so screen
  readers can track the story position.

### Shareable Story State

The app now preserves the current story state in the URL query string so a
specific view can be reloaded or shared directly.

- `step` controls the narrative panel, from `0` to `4`
- `linear=1` enables the linear "unzip" view
- `speculative=0` hides speculative data points

Example: `?step=3&linear=1&speculative=0`

The Credits panel's Share button copies the current browser URL, so the active
step and toggle state come along automatically.

---

## 🤝 Contributing

This is a learning project demonstrating scrollytelling techniques. If you'd like to extend it:

1. Fork the repository
2. Create a feature branch (`git checkout -b feat/amazing-feature`)
3. Commit your changes (see commit format in [CHANGELOG.md](./CHANGELOG.md))
4. Push to the branch (`git push origin feat/amazing-feature`)
5. Open a Pull Request

---

## 📚 Technical Decisions

### Why Svelte over React?

- Reactive statements (`$:`) eliminate useEffect dependency hell
- Smaller bundle size (no virtual DOM)
- Built-in motion/tweening library
- Declarative DOM updates ideal for data visualization

### Why Logarithmic Y-Axis?

- Linear scale cannot display 26 orders of magnitude (1 → 10^27)
- Log scale compresses exponential growth into visual space
- Aligns with scientific thinking (powers of 10)

### Why Scrollama?

- Industry standard (used by NYT, FiveThirtyEight)
- Intersection Observer API (performant)
- Simple API surface area

### Why 1200ms Animation Duration?

Empirically tested:

- 600ms: Too snappy, feels buggy
- 1000ms: Better, but rushed
- **1200ms**: Perfect "heavy camera" feel ✅
- 1800ms: Too slow, loses engagement

See [CHANGELOG.md](./CHANGELOG.md) for more architectural rationale.

---

## 🙏 Acknowledgments

### Design Inspiration

- [NYT Graphics](https://www.nytimes.com/interactive) - Scrollytelling patterns
- [Our World in Data](https://ourworldindata.org/) - Compute visualizations
- [FiveThirtyEight](https://fivethirtyeight.com/) - Data-driven narratives

### Data Sources & Provenance

- [Epoch AI](https://epochai.org/) - ML compute dataset
- [Our World in Data](https://ourworldindata.org/technological-progress) - Historical compute
- The Credits step now groups source labels into historical records and speculative estimates for quicker provenance review.

---

## 📄 License

License status is unresolved. `package.json` currently declares `ISC`, but there is no canonical `LICENSE` file checked in. See [CURRENT_STATE.md](./CURRENT_STATE.md) for the current decision point.

---

## 🐛 Known Issues

- None in v0.4.0 (Phase 4 complete and verified)

---

## 💡 Future Ideas

- **Alternative views**: Toggle linear vs. log scale
- **Data export**: Download chart as SVG/PNG
- **Narration mode**: Auto-scroll through story
- **3D mode**: Experimental WebGL rendering

---

### Built with ❤️ using Svelte + D3.js

For questions or feedback, open an issue on GitHub.
