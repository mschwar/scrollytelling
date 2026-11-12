# Visual Style Guide: Compute Scrollytelling Visualization

**Version:** 1.0
**Dependency:** Companion to [00_Master_Brief.md.md](./00_Master_Brief.md.md)

---

## 1. Core Aesthetic: Editorial Diagram

The visual design aims for an academic paper and engineering schematic aesthetic rather than a dark-mode dashboard:

- **Canvas Background:** Off-White (`#F9F9F9`) for high-contrast legibility.
- **Grid Lines:** Subtle light gray (`#E5E5E5`).
- **Typography:**
  - **Headings and Narrative Copy:** `Inter` or `Helvetica Neue`.
  - **Axis Ticks and Numeric Readouts:** `JetBrains Mono` or `Roboto Mono`.

---

## 2. Semantic Color Palette

Colors encode dataset eras and provenance status:

- **Historical Hardware and Baseline (`#F5A623`, Safety Orange):** Used for the dashed Moore's Law reference curve and pre-2012 milestones.
- **Deep Learning Era (`#BD10E0` / `#9013FE`, Electric Purple):** Used for post-2012 neural network training runs and primary focus outlines.
- **Speculative Estimates (`#9B9B9B`, Neutral Gray Dashed):** Used for opt-in future projections so they remain visually distinct from historical records.
- **Cost Context (`#B8E986` to `#417505`):** Optional green accent range reserved for cost comparisons.

---

## 3. Motion Timing

Svelte domain tweens are tuned for steady, readable camera movement:

- **Vertical Domain Zoom:** `1200ms` duration with `cubicOut` (`cubic-bezier(0.25, 1, 0.5, 1)`), starting briskly and settling smoothly.
- **Scale Toggle (Logarithmic to Linear):** Stretches the vertical axis smoothly so readers see higher-compute points accelerate above the viewport rather than disappear abruptly.

---

## 4. Component Styling

### Scrolling Narrative Cards

- Semi-opaque white surface (`rgba(255, 255, 255, 0.85)`) with `backdrop-filter: blur(8px)`, subtle shadow, and a `4px` left border (`#333333`).

### Tooltips

- Track pointer or focused SVG circle position smoothly.
- Display model name, year, Floating-Point Operation (FLOP) total in scientific notation, source label, and scale analogy.

### Axes

- Keep horizontal (year) and vertical (FLOPs) axes legible against the sticky canvas.
- Format logarithmic vertical ticks cleanly as powers of ten (`10^15`, `10^20`) without crowding intermediate multipliers (`2 x 10^15`).

---

## 5. Visual Quality Checks

- Render deep-learning circles above the dashed reference line in SVG painter order.
- Maintain WCAG 2.2 AA contrast ratios (`>= 4.5:1`) for narrative text, axis labels, and button text.
- Keep background hardware silhouettes at low opacity (`<= 0.1`) so they never obscure data points.
