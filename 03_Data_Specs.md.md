## Project: The Compute "Phase Shift" Scrollytelling Visualization

**Version:** 1.0  
**Dependency:** Reads 00_Master_Brief.md, 02_Tech_Architecture.md

---

## 1. Data Source Strategy

The application will load a single static JSON file (compute_history.json). We are not connecting to a live API.

- **Source:** The data is a composite of historical records (Epoch AI, Our World in Data) and manually curated "Anchor Points."
    
- **Parsing:** Dates must be parsed as decimal years (e.g., 2023.25 for April 2023) to allow precise plotting on the X-Axis.
    blah blah blah

---

## 2. JSON Schema Definition

The code must expect the following array structure. Do not infer types; enforce them.

codeJSON

```
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
    "is_highlight": true
  }
]
```

### Field Dictionary

- **date_decimal (Float):** Used for X-Position.
    
- **training_compute_flops (Float):** The raw FLOP count. Used for Y-Position.
    
- **category (String):** Determines the color.
    
    - Values: "Historical" (Pre-2012) or "Deep Learning" (Post-2012).
        
- **is_highlight (Boolean):** If true, always show the label. If false, only show point (label appears on hover). This prevents UI clutter.
    

---

## 3. The "Human Scale" Math

The frontend must perform specific calculations to generate the "Intuition Metrics" used in the sidebar.

**Formula 1: Human-Years**  
To convert FLOPs to "Time it would take a human":  

```
Human Years=FLOPsHuman Speed×Seconds in YearHuman Years=Human Speed×Seconds in YearFLOPs​
```

- **Constant:** HUMAN_SPEED = 1 FLOP/second.
    
- **Constant:** SECONDS_YEAR = 31,536,000.
    
- Example: GPT-4 (
    
    ```
    2×10252×1025
    ```
    
    ) 
    
    ```
    ≈≈
    ```
    
     
    
    ```
    6×10176×1017
    ```
    
     Human Years.
    

**Formula 2: Moore's Law Baseline (The Orange Line)**  
To draw the "Counterfactual" line (where we should be if Deep Learning didn't happen):

- **Anchor Point:** 2012 (AlexNet).
    
- **Slope:** 
    
    ```
    2×2×
    ```
    
     every 2 years.
    
- **Equation:** 
    
    ```
    Y=AlexNet_FLOPs×2CurrentYear−20122Y=AlexNet_FLOPs×22CurrentYear−2012​
    ```
    
- Usage: Use this function to plot the dashed orange line extending from 2012 to 2026.
    

---

## 4. Required Data Points (The Narrative Anchors)

Ensure the dataset includes these specific milestones to drive the story:

1. **The Start:** ENIAC (1946) - 
    
    ```
    105105
    ```
    
2. **The Desktop Era:** Intel 486 (1989)
    
3. **The Chess King:** Deep Blue (1997)
    
4. **The Break:** AlexNet (2012) - The first point to jump the curve.
    
5. **The Takeoff:** AlphaGo (2016)
    
6. **The Present:** GPT-4 / Gemini Ultra (2023/2024) - The outlier.