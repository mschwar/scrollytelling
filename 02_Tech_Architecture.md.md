## Project: The Compute "Phase Shift" Scrollytelling Visualization

**Version:** 1.0  
**Dependency:** Reads 00_Master_Brief.md, 01_Narrative_Script.md

---

## 1. Technology Stack

We will use a lightweight, reactive stack optimized for DOM manipulation and vector graphics.

- **Core Framework:** **Svelte** (Version 4 or 5).
    
    - Reasoning: Svelte's reactive statements ($:) make syncing scroll progress to chart dimensions trivial compared to React's useEffect dependency hell.
        
- **Visualization:** **D3.js** (v7).
    
    - Usage: We use D3 only for scales (d3-scale), shapes (d3-shape), and axis generation. Svelte will handle the actual DOM rendering (SVG elements).
        
- **Scroll Logic:** **Scrollama** (via intersection-observer).
    
    - Usage: To dispatch "Step Enter" and "Step Exit" events.
        
- **Styling:** SCSS / Tailwind (Optional, but clean CSS is required).
    

---

## 2. Component Hierarchy

The application structure should look like this:

codeText

```
src/
├── components/
│   ├── Main.svelte          # Orchestrator (Holds the State)
│   ├── Scrolly.svelte       # The Scrollama Wrapper (Generic)
│   ├── Visualization/
│   │   ├── Chart.svelte     # The SVG Container & D3 Scales
│   │   ├── Axis.svelte      # X/Y Axis rendering
│   │   ├── MooreLine.svelte # The Orange Dashed Line path
│   │   ├── DataDots.svelte  # The Interactive Circles (Purple/Orange)
│   │   └── Tooltip.svelte   # Hover state popup
│   └── Background/
│       └── Silhouette.svelte # The changing hardware icons (ENIAC -> GPU)
├── data/
│   └── compute_history.json # The dataset
└── App.svelte
```

---

## 3. State Management Strategy

We do not need Redux. We will use Svelte's local state in Main.svelte passed down as props.

**Key State Variables:**

1. currentStep (Integer: 0-4): Derived from Scrolly.svelte.
    
2. yDomain (Array: [min, max]): Reactive variable.
    
    - Step 0-1: [1, 1e15]
        
    - Step 2-4: [1, 1e27]
        
    - Logic: When currentStep changes, tween the yDomain values using svelte/motion to create the "Camera Zoom" effect.
        
3. isLinearMode (Boolean): Toggles the Scale function between d3.scaleLog and d3.scaleLinear.
    

---

## 4. Implementation Constraints (The "Rules")

### A. The "Declarative Chart" Rule

Do not use d3.select('circle').transition().  
Instead, bind Svelte variables to SVG attributes.

- **Bad:** D3 chaining inside a useEffect.
    
- **Good:** <circle cx={xScale(d.date)} cy={yScale(d.flops)} />
    
- Why: This ensures that if the user scrolls fast, the DOM state never desyncs from the Scroll state.
    

### B. The "Sticky" Setup

The CSS layout is critical for Scrollytelling.

- The .chart-container must be position: sticky; top: 0; height: 100vh;.
    
- The .step-container must scroll over it with z-index: 10.
    
- Ensure pointer-events: none on the text boxes so they don't block tooltips on the chart.
    

### C. Performance

- Use transform: translate(...) for moving the Tooltip (avoids layout repaints).
    
- If rendering >500 dots, use <canvas> layer for the dots. (Note: For this specific dataset, we expect <100 points, so SVG is preferred for crispness).
    

---

## 5. Next Steps

Once this architecture is set up, proceed to 03_Data_Specs.md to define the JSON structure that feeds Chart.svelte.