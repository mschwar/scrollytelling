
## Project: The Compute "Phase Shift" Scrollytelling Visualization

**Version:** 1.0  
**Dependency:** Reads 00_Master_Brief.md

---

## 1. The Scroll Logic Overview

The application is a "Scrollytelling" interface.

- **Background (Sticky):** The D3 Visualization. It remains fixed in place but mutates based on the current step.
    
- **Foreground (Scrolling):** Text boxes ("Steps") that scroll over the visualization.
    

## 2. The Scene Breakdown

The visualization is divided into **5 Discrete Steps** (State Indices 0-4).

### Step 0: The Anchor (Human Scale)

- **Scroll Trigger:** User enters the page.
    
- **Foreground Text:**
    
    > "To understand AI, we must understand the speed of thought. This dot represents 1 FLOP: One calculation. Roughly the speed of a human doing a math problem."
    
- **Visual State:**
    
    - **X-Axis:** Hidden.
        
    - **Y-Axis:** Hidden.
        
    - **Data:** Single dot at 
        
        ```
        (x=0,y=100)(x=0,y=100)
        ```
        
        .
        
    - **Annotation:** "YOU (1 FLOP/s)" label next to the dot.
        

### Step 1: The Golden Rule (Moore's Law)

- **Scroll Trigger:** User scrolls down ~20%.
    
- **Foreground Text:**
    
    > "For 60 years, computing followed a Golden Rule: Moore's Law. Chips got twice as fast every two years. It was predictable. It was safe."
    
- **Visual State:**
    
    - **Axes:** Fade In. (Y-Axis: Logarithmic 
        
        ```
        100100
        ```
        
         to 
        
        ```
        10151015
        ```
        
        ).
        
    - **Line:** The **Orange Dashed Line** draws from left (1940) to right (2010).
        
    - **Data:** Show "Historical" dots (ENIAC, Intel 4004, Deep Blue).
        
    - **Background:** Silhouette of a "Room Sized Computer" fades into a "Desktop PC".
        

### Step 2: The Phase Shift (Deep Learning)

- **Scroll Trigger:** User scrolls to 2012 timeline.
    
- **Foreground Text:**
    
    > "Then, in 2012, we broke the law. Deep Learning required massive parallel processing. We stopped waiting for chips to get faster and started building massive clusters."
    
- **Visual State:**
    
    - **Line:** The Orange Line continues flat/linear (the "Counterfactual").
        
    - **Data:** The **Purple Dots** (AlexNet, AlphaGo) appear. They visually detach from the Orange Line and shoot upward.
        
    - **Camera:** The Y-Axis domain rapidly scales up from 
        
        ```
        10151015
        ```
        
         to 
        
        ```
        10271027
        ```
        
         (Vertigo Effect) to accommodate the new height.
        

### Step 3: The Scale Shock (Interaction)

- **Scroll Trigger:** User reaches the "Present Day" (GPT-4 / Gemini).
    
- **Foreground Text:**
    
    > "This chart is misleading. A Log Scale compresses reality. If we plotted this on a standard ruler..."
    
- **Interaction:** A button appears: **[ SEE TRUE SCALE ]**.
    
- **Visual State:**
    
    - **On Click:** The chart transitions to Linear Scale. The top dot shoots off the screen.
        
    - **Annotation:** "To reach GPT-4 on this scale, you would need to scroll for 4 light-years."
        
    - **Auto-Reset:** After 5 seconds, snap back to Log Scale.
        

### Step 4: The Cost (The Receipt)

- **Scroll Trigger:** Final section.
    
- **Foreground Text:**
    
    > "This isn't just math. It's industry. The training cost for these models moved from the price of a sandwich to the GDP of a small nation."
    
- **Visual State:**
    
    - **Color Mapping:** Dots recolor based on training_cost_usd (Green gradient).
        
    - **Tooltips:** Enabled. Hovering reveals "Hardware Equivalent" (e.g., "10,000 H100 GPUs").
        

---

## 3. Transition Timing

- **Step Entry:** Actions trigger immediately upon the text box entering the viewport (intersection ratio > 0.5).
    
- **Animation Duration:** All D3 transitions should take **800ms** (ease-in-out) to feel weighty, not jittery.
    
- **Scrubbing:** If the user scrolls rapidly back up, the state must reverse instantly (e.g., hiding purple dots if going from Step 2 
    
    ```
    →→
    ```
    
     Step 1).