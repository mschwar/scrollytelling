# Data Specifications: Compute Scrollytelling Visualization

**Version:** 1.0
**Dependency:** Companion to [00_Master_Brief.md.md](./00_Master_Brief.md.md) and [02_Tech_Architecture.md.md](./02_Tech_Architecture.md.md)

---

## 1. Data Source Strategy

The client loads a static JSON dataset from `src/data/compute_history.json` with no runtime external network calls.

- **Sources:** Combines historical hardware benchmarks, published model training estimates (Epoch AI and Our World in Data), teaching anchors, and labeled speculative projections.
- **Date Encoding:** Encodes dates as decimal years (for example, `2023.25` for April 2023) for continuous horizontal plotting.
- **Validation:** Run `npm run validate` (`scripts/validate_repo.js`) to verify required fields, finite numeric values, unique `id` keys, and speculative flags.

---

## 2. JSON Schema Definition

Each object in `src/data/compute_history.json` follows this record shape, measuring total arithmetic in Floating-Point Operations (FLOPs):

```json
[
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
  },
  {
    "id": "eniac",
    "name": "ENIAC",
    "organization": "US Army",
    "date_decimal": 1945.9,
    "training_compute_flops": 1e5,
    "training_cost_usd": 6000000,
    "category": "Historical",
    "hardware_analogy": "Vacuum Tube Room",
    "human_analogy": "1.1 days of human math",
    "source": "Historical archive",
    "is_highlight": true
  }
]
```

### Field Dictionary

- `date_decimal` (number): Decimal year plotted on the horizontal axis.
- `training_compute_flops` (number): Total Floating-Point Operation (FLOP) count plotted on the vertical axis.
- `category` (string): One of `"Historical"`, `"Deep Learning"`, `"Theory"`, or `"Speculative"`.
- `is_highlight` (boolean): Always renders a persistent text label when `true`; shows details on hover or focus when `false`.
- `is_speculative` (boolean, required when `category` is `"Speculative"`): Marks projected points controlled by the speculative toggle.
- `source` (string): Provenance label grouped in Step 4 by `src/lib/provenance.js`.

---

## 3. Scale and Baseline Formulas

### Formula 1: Human-Years Analogy

To express FLOP totals as equivalent continuous human calculation time:

```text
Human_Years = FLOPs / (HUMAN_SPEED * SECONDS_PER_YEAR)
```

- `HUMAN_SPEED = 1` FLOP per second.
- `SECONDS_PER_YEAR = 31,536,000`.
- Example: `2e25` FLOPs equals roughly `6.3e17` human years.

### Formula 2: Moore's Law Reference Curve

To plot the counterfactual hardware-progress line doubling every two years from a reference point:

```text
Baseline_FLOPs(year) = Anchor_FLOPs * 2 ^ ((year - Anchor_Year) / 2)
```

---

## 4. Narrative Anchor Milestones

1. **Human Anchor (1900):** Teaching baseline at `1` FLOP.
2. **Electronic Numerical Integrator and Computer (ENIAC) (1945):** Early electronic computer milestone (`10^5` FLOPs).
3. **Desktop Era (1989):** Microprocessor transition.
4. **Deep Blue (1997):** Specialized chess supercomputer.
5. **AlexNet (2012):** GPU-trained convolutional network marking the deep-learning inflection.
6. **AlphaGo (2016) and GPT-4 (2023):** Large-cluster training runs illustrating modern scale.
