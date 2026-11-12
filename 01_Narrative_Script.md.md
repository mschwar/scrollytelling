# Narrative Script: Compute Scrollytelling Visualization

**Version:** 1.0
**Dependency:** Companion to [00_Master_Brief.md.md](./00_Master_Brief.md.md); see [docs/editorial/story-contract.md](./docs/editorial/story-contract.md) for current editorial rules.

---

## 1. Scroll Logic Overview

The interface pairs two coordinated layers driven by scroll position:

- **Background (Sticky):** A D3 SVG chart that stays fixed in the viewport and updates axis domains as the active step changes.
- **Foreground (Scrolling):** Five narrative text cards (indices `0` through `4`) that scroll over the chart, using Floating-Point Operation (FLOP) counts, Electronic Numerical Integrator and Computer (ENIAC) hardware milestones, and Gross Domestic Product (GDP) cost comparisons.

---

## 2. Scene Breakdown

The narrative is divided into five discrete steps (`0` through `4`). Blockquoted lines below preserve the original draft script copy verbatim.

### Step 0: The Anchor (Human Scale)

- **Scroll Trigger:** Reader enters the page.
- **Foreground Text:**

  > "To understand AI, we must understand the speed of thought. This dot represents 1 FLOP: One calculation. Roughly the speed of a human doing a math problem."

- **Visual State:**
  - **X-Axis:** Hidden.
  - **Y-Axis:** Hidden.
  - **Data:** Single dot at `(x = 1900, y = 10^0)`.
  - **Annotation:** Label `"YOU (1 FLOP/s)"` next to the dot.

### Step 1: The Golden Rule (Moore's Law)

- **Scroll Trigger:** Reader scrolls roughly 20% down the story container.
- **Foreground Text:**

  > "For 60 years, computing followed a Golden Rule: Moore's Law. Chips got twice as fast every two years. It was predictable. It was safe."

- **Visual State:**
  - **Axes:** Fade in with a logarithmic vertical axis from `10^0` to `10^15`.
  - **Line:** Orange dashed baseline draws from 1940 to 2010.
  - **Data:** Historical machine points render (ENIAC, Intel 4004, Deep Blue).
  - **Background:** Room-sized computer silhouette transitions to a desktop processor icon.

### Step 2: The Phase Shift (Deep Learning)

- **Scroll Trigger:** Reader reaches the 2012 timeline step.
- **Foreground Text:**

  > "Then, in 2012, we broke the law. Deep Learning required massive parallel processing. We stopped waiting for chips to get faster and started building massive clusters."

- **Visual State:**
  - **Line:** Orange dashed baseline continues across the timeline as a reference curve.
  - **Data:** Purple deep-learning points (AlexNet, AlphaGo) appear and climb steeply above the orange line.
  - **Camera:** Vertical axis domain tweens from `10^15` up to `10^27`.

### Step 3: The Scale Shock (Interaction)

- **Scroll Trigger:** Reader reaches frontier models (GPT-4 and contemporaries).
- **Foreground Text:**

  > "This chart is misleading. A Log Scale compresses reality. If we plotted this on a standard ruler..."

- **Interaction:** Toggle button labeled `[ SEE TRUE SCALE ]`.
- **Visual State:**
  - **On Click:** Vertical axis switches from logarithmic to linear scale, sending top points above the viewport.
  - **Annotation:** Explanatory note describing how compressed orders of magnitude expand on a linear ruler.
  - **Return Path:** Reader can toggle back to logarithmic scale at any time.

### Step 4: The Cost (The Receipt)

- **Scroll Trigger:** Final narrative card.
- **Foreground Text:**

  > "This isn't just math. It's industry. The training cost for these models moved from the price of a sandwich to the GDP of a small nation."

- **Visual State:**
  - **Provenance and Cost:** Final step surfaces grouped source labels, speculative toggles, and training cost context.
  - **Tooltips:** Hovering or focusing a milestone reveals hardware and human-time analogies.

---

## 3. Transition Timing

- **Step Entry:** Updates trigger when a narrative card crosses the viewport midpoint (`intersectionRatio > 0.5`).
- **Animation Duration:** Axis domain transitions run over 800ms to 1200ms with eased settling.
- **Reverse Scrolling:** Scrolling upward reverses domain bounds cleanly (for example, moving from Step 2 back to Step 1).
