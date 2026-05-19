# Story Contract

Status date: 2026-05-19

This document is the editorial source of truth for the AI compute scrollytelling piece. Product, data, visual, and accessibility work should use this contract before changing story copy or chart behavior.

## Working Title

AI Training Compute Outran The Old Hardware Story

## Audience

The primary reader is a technically curious non-specialist: someone who understands that AI progress depends on chips and data centers, but does not already have a mental model for training compute measured in FLOP.

The secondary reader is an evaluator of the project: someone checking whether the data, claims, and interface are credible enough to trust and share.

## Editorial Promise

The piece should make one idea legible:

Training large AI models became a different kind of scaling story after the deep-learning era began. The change is not just faster chips; it is the combination of larger training runs, specialized hardware, bigger datasets, and large budgets pushing model training far beyond a simple Moore's Law-style hardware baseline.

## Defensible Core Claim

Use this framing:

> Since the deep-learning era, the largest AI training runs have grown far faster than a Moore's Law-style hardware baseline.

Avoid this framing:

> AI proved, broke, or invalidated Moore's Law.

Reason: Moore's Law is a hardware trend about transistor density or related hardware progress. This project visualizes training-run compute. Training-run compute can grow faster than hardware because labs also spend more money, use more accelerators, train longer, improve utilization, and scale datasets and models.

## Reader Takeaway

By the end, the reader should be able to say:

- FLOP is a count of computation, not intelligence.
- A log scale is necessary because the range spans many orders of magnitude.
- The post-2012 story is about training-run scale, not just chip improvement.
- Some modern and future numbers are estimates, so provenance and confidence matter.
- The chart is an explanation of scale, not a prediction of AGI.

## Five-Act Story

### 1. Anchor

Give the reader a human-scale baseline: one simple calculation per second is a rough teaching anchor for understanding FLOP.

### 2. Baseline

Show the old hardware-progress intuition: computing hardware improved for decades in a way people often summarize as Moore's Law.

### 3. Inflection

Introduce the deep-learning era and AlexNet as the moment where model training runs become visibly different from the old baseline.

### 4. Scale

Make the modern magnitude inspectable through a defensible comparison, such as multiplier from AlexNet to GPT-4 or a documented human-time analogy.

### 5. Trust

Close by showing provenance, confidence, and which points are historical, estimated, speculative, or pedagogical.

## Data Categories

Every data point should fit one of these editorial categories. Future schema work should encode these directly.

### Historical

A machine, system, or model with a date and value grounded in historical records, model papers, institutional archives, or a reputable dataset.

Historical does not mean perfectly exact. It means the point refers to a real past system and should carry source context.

### Estimated

A real past or current system where training compute, cost, or other values are inferred because the primary source did not fully disclose them.

Estimated entries need method notes and confidence labels. They should not be presented with the same certainty as directly reported values.

### Speculative

A future, hypothetical, extrapolated, or scenario-based point.

Speculative entries should be opt-in and visibly separated from the main historical read. They must not drive the first impression of the chart.

### Pedagogical

A teaching anchor or analogy that is useful for scale but is not a real AI training run.

Pedagogical entries should be labeled as teaching devices. The human baseline belongs here unless the chart explicitly separates machine history from analogy.

## Terms

### FLOP

Floating-point operation. In this project, FLOP is used as a rough count of arithmetic operations.

Use "FLOP" for a count and avoid implying it is a rate unless the value is explicitly FLOP/s.

### Training Compute

The total computation used to train a model. This is different from inference compute, chip speed, parameter count, benchmark score, or intelligence.

### Moore's Law-Style Baseline

A simplified reference line representing a familiar hardware-progress intuition. It is not a law of nature and should not be treated as the thing directly being measured by AI labs.

### Training-Run Scale

The total size of a model training effort: hardware count, training duration, utilization, dataset size, architecture choices, budget, and operational capacity.

## Voice And Copy Rules

- Prefer precise claims over hype.
- Use "outpaced," "diverged from," or "grew faster than" instead of "broke" unless a specific baseline has been defined.
- Do not use "AGI threshold" as a chart label unless the point is clearly speculative and sourced as a scenario, not a forecast.
- Avoid telling the reader "this proves" something. Let the visual and cited numbers carry the argument.
- Avoid unsupported time analogies. If human lifetimes are used, cite the exact assumption.
- Keep panel copy short enough that the chart remains the main event.

## Visual Contract

The chart should feel like an editorial data explanation, not a framework demo.

- The first viewport must state the thesis and keep the data visible.
- The visual system should not rely on emoji or decorative glass cards to create drama.
- Each step should change what the reader can see or compare.
- Labels should support the story; they should not clutter the whole dataset equally.
- Speculative points should not compete visually with historical or estimated points.

## Interaction Contract

Interactions should reveal scale or trust.

Good interactions:

- Compare a model against the baseline.
- Reveal the multiplier between two points.
- Toggle estimated/speculative data.
- Scrub or animate between log and linear scale with a clear explanatory caption.
- Open a data card with source, confidence, and method note.

Weak interactions:

- Motion that only decorates the same conclusion.
- Buttons that cause data to disappear without explaining the scale.
- Tooltips that repeat the label without adding confidence or methodology.

## Source Expectations

Preferred source order:

1. Primary model paper, technical report, or institutional dataset.
2. Reputable curated dataset such as Epoch AI or Our World in Data.
3. Institutional archive for historical hardware.
4. Explicitly labeled extrapolation or scenario.

When a value is estimated, the UI and docs should say estimated. When a value is speculative, the UI and docs should say speculative.

## Out Of Scope

This piece does not try to prove:

- That AI progress will continue at the same rate.
- That a specific model is or is not near AGI.
- That training compute alone explains model capability.
- That Moore's Law as originally stated is false.

## Open Editorial Questions

- What exact human-lifetime assumption should be canonical?
- Should historical hardware and AI model training runs share one axis, or should the visual separate hardware capability from training-run budgets more explicitly?
- Which modern frontier model estimates are credible enough to show by default?
- Should speculative future points remain in the dataset, or move to a separate scenario file?
