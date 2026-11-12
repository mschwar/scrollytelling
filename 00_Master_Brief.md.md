# Master Brief: Compute Scrollytelling Visualization

**Version:** 1.0
**Status:** Initial Design Brief (superseded on editorial claims by [docs/editorial/story-contract.md](./docs/editorial/story-contract.md))

---

## 1. Purpose, Inputs, and Outputs

This brief defines the initial product concept for an interactive scrollytelling chart tracking AI training compute growth. The application reads milestone records from `src/data/compute_history.json` and renders a scroll-driven SVG chart comparing model training runs against historical hardware growth.

- **Core Observation:** For decades, single-system hardware performance grew along a steady trajectory often summarized as Moore's Law. After 2012, large deep-learning training runs scaled far faster by combining thousands of accelerators, longer runs, and larger budgets.
- **Reader Challenge:** Raw counts such as `10^27` Floating-Point Operations (FLOPs) are abstract to non-specialist readers, and a logarithmic axis compresses huge differences into equal vertical steps.
- **Design Goal:** Help readers inspect both the multi-decade trend and the physical gap between human arithmetic, early computers, and frontier training clusters.

---

## 2. Design Philosophy: Constructive Incrementalism

Instead of opening on an overloaded chart with complex filter menus, the narrative introduces visual layers one step at a time:

1. **The Anchor:** One human performing arithmetic at roughly 1 Floating-Point Operation (FLOP) per second.
2. **The Baseline:** Multi-decade hardware progress from 1940 to 2010.
3. **The Divergence:** Post-2012 deep-learning training runs climbing steeply above that baseline.
4. **The Scale and Cost:** Linear-scale comparisons, dollar estimates, and source provenance.

---

## 3. User Journey

Scrolling drives five sequential views over a sticky chart:

- **Phase 1 — Anchor (Human Scale):** Introduces 1 calculation per second as a single teaching dot.
- **Phase 2 — Baseline (Hardware Trend):** Draws the orange dashed reference line alongside historical machines from Electronic Numerical Integrator and Computer (ENIAC) to desktop chips.
- **Phase 3 — Divergence (Deep Learning):** Reveals purple model training runs detaching upward from the baseline.
- **Phase 4 — Scale Check:** Provides a toggle that switches the vertical axis from logarithmic (`10x` steps) to linear scale.
- **Phase 5 — Provenance:** Groups historical records and speculative estimates with source labels.

---

## 4. Constraints and Anti-Goals

- **Logarithmic Default:** The vertical axis defaults to logarithmic (`10x` steps) because a linear axis compresses almost every historical point onto the baseline.
- **2D SVG Rendering:** Render crisp 2D SVG geometry with Svelte and D3 rather than 3D WebGL scenes.
- **Focused Controls:** Limit interactive controls to scale switching, speculative-point filtering, keyboard point navigation, and URL sharing.
- **Progressive Disclosure:** Introduce cost estimates and provenance details in later narrative steps rather than crowding Step 0.

---

## 5. Initial Brief Sequence

1. [00_Master_Brief.md.md](./00_Master_Brief.md.md): Product goals and pedagogical sequence.
2. [01_Narrative_Script.md.md](./01_Narrative_Script.md.md): Step-by-step script drafts and scroll triggers.
3. [02_Tech_Architecture.md.md](./02_Tech_Architecture.md.md): Svelte and D3 component structure.
4. [03_Data_Specs.md.md](./03_Data_Specs.md.md): Dataset fields and baseline formulas.
5. [04_Visual_Style_Guide.md.md](./04_Visual_Style_Guide.md.md): Color palette, typography, and motion timing.
