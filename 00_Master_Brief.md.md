
## Project: The Compute "Phase Shift" Scrollytelling Visualization

**Version:** 1.0  
**Status:** Approved for Implementation

---

## 1. The North Star

We are building an interactive, scrollytelling data visualization that demystifies the explosive growth of AI training compute.

**The Core Insight:** For 60 years, computers got faster at a predictable rate (Moore's Law). In 2012, that pattern broke. AI demanded a new scale of compute that defied historical trends.

**The Problem:** The raw numbers (

```
10271027
```

 FLOPs) are abstract and meaningless to the average human. A standard log-scale chart hides the drama of this explosion.

**The Goal:** The user must not just see the line go up; they must feel the friction of the scale. They must understand that modern AI is not just "faster software," but a fundamental shift from "desktop computing" to "industrial-scale planetary computing."

---

## 2. Design Philosophy: "Constructive Incrementalism"

We are strictly adhering to a pedagogical framework called **Constructive Incrementalism**.

- **Do Not Deconstruct:** Do not show the final complex chart and ask the user to filter it.
    
- **Reconstruct:** We start with a blank void and a single unit (The Stick). We force the user to build the mental model step-by-step.
    

**The "Stick" to "Machine" Progression:**

1. **The Stick:** One human doing math (1 FLOP).
    
2. **The Pattern:** The comfortable rise of Moore's Law (1940–2010).
    
3. **The Break:** The sudden, vertical departure of Deep Learning (2012–Present).
    
4. **The Cost:** The realization of the economic and energy price tag.
    

---

## 3. The User Journey

The experience acts as a linear narrative controlled by the scroll bar.

- **Phase 1: Anchor (The Human Scale)**
    
    - Concept: "I understand what 1 calculation is."
        
    - Visual: A single dot vs. a human.
        
- **Phase 2: Establish Norms (Moore's Law)**
    
    - Concept: "Computers get 2x faster every 2 years. This is the law of the universe."
        
    - Visual: The orange dashed line. The hardware silhouette grows from Room (ENIAC) to Chip (Intel).
        
- **Phase 3: The Violation (Deep Learning)**
    
    - Concept: "Wait, the data points aren't following the orange line anymore. They are skyrocketing."
        
    - Visual: The purple dots detach and shoot upward.
        
- **Phase 4: The Reality Check (Scale)**
    
    - Concept: "Log scales are lying to me. The true scale is astronomical."
        
    - Visual: The 'Unzip' interaction where the chart attempts to unfold to linear scale.
        

---

## 4. Anti-Goals (Constraints)

- **NO Linear Scales (as default):** The Y-Axis must be Logarithmic (
    
    ```
    10x10x
    ```
    
    ) by default. A linear chart of this data is unreadable.
    
- **NO 3D Graphics:** This is a clean, 2D SVG overlay. Do not use Three.js or WebGL unless absolutely necessary for performance.
    
- **NO User Input Forms:** This is a narrative experience. The user observes; they do not input data.
    
- **NO Information Dumping:** Do not show "Training Cost" or "Energy" until the narrative reaches Phase 4. Keep the UI minimal until the complexity is earned.
    

---

## 5. Documentation Map

This brief is part 1 of 5. Please ingest the files in this specific order to build the implementation plan:

1. 00_Master_Brief.md (Current): Philosophy & Goals.
    
2. 01_Narrative_Script.md: The specific steps, copy, and scroll triggers.
    
3. 02_Tech_Architecture.md: The Tech Stack (Svelte/D3) and Component Hierarchy.
    
4. 03_Data_Specs.md: The JSON schema, required columns, and math logic.
    
5. 04_Visual_Style_Guide.md: Colors, fonts, and animation physics.