## Project: The Compute "Phase Shift" Scrollytelling Visualization

**Version:** 1.0  
**Dependency:** Reads 00_Master_Brief.md

---

## 1. Core Aesthetic: "Industrial Futurism"

The look should feel precise, mathematical, and slightly intimidating. It is not a cartoon; it is a blueprint of a Phase Shift.

- **Background:** Off-White / Paper (#F9F9F9).
    
    - Why: Mimics an academic paper or engineering schematic. Dark mode is too "Matrix." We want "Scientific."
        
- **Grid Lines:** Very subtle light gray (#E5E5E5).
    
- **Typography:**
    
    - **Headings:** Inter or Helvetica Neue (Bold).
        
    - **Data Labels:** Roboto Mono or JetBrains Mono (Technical feel).
        

---

## 2. Color Palette (Semantic)

Colors are used to tell the story, not for decoration.

**A. The "Safe" Era (Historical / Moore's Law)**

- **Color:** **Safety Orange** (#F5A623)
    
- **Meaning:** Predictable, Warning-but-safe, Industrial.
    
- **Usage:** The Dashed Line, Pre-2012 dots, The "Hardware Silhouette" graphics.
    

**B. The "Phase Shift" Era (Deep Learning)**

- **Color:** **Electric Purple** (#BD10E0 or #9013FE)
    
- **Meaning:** Artificial, Magic, Deviation, Dangerous.
    
- **Usage:** Post-2012 dots, The "Break" annotation.
    

**C. The "Cost" Gradient (Step 4)**

- **Scale:** Light Green (#B8E986) 
    
    ```
    →→
    ```
    
     Dark Money Green (#417505).
    
- **Usage:** Dots recolor to this scale in the final step.
    

---

## 3. Motion Physics (The "Feel")

Svelte transitions must be tuned to feel "Heavy."

- **The Zoom (Y-Axis Scaling):**
    
    - **Easing:** cubic-bezier(0.25, 1, 0.5, 1) (Fast start, slow settle).
        
    - **Duration:** 1200ms.
        
    - Effect: The chart shouldn't just "snap"; it should feel like the camera is pulling back rapidly to capture a rocket taking off.
        
- **The "Unzip" (Log to Linear):**
    
    - **Visual:** The Y-axis stretches.
        
    - **Animation:** The top dots must accelerate upward exponentially.
        
    - **Fade:** As the dots leave the viewport, they should leave a "motion blur" or fade out, emphasizing they are gone forever.
        

---

## 4. UI Component Styling

**The Scrolling Text (Sidebar)**

- **Style:** Glassmorphism.
    
    - background: rgba(255, 255, 255, 0.9);
        
    - backdrop-filter: blur(10px);
        
    - border-left: 4px solid #333; (The "Stick" design motif).
        
- **Shadow:** Deep drop shadow to separate it from the chart.
    

**The Tooltips**

- **Behavior:** Follow mouse with 20ms lag (elastic feel).
    
- **Content:**
    
    - **Header:** Model Name (Bold).
        
    - **Sub:** Year.
        
    - **Detail:** FLOPs (Scientific Notation).
        
    - **Analogy:** "Equivalent to [X] Humans."
        

**The Axes**

- **X-Axis:** Bottom, sticky.
    
- **Y-Axis:** Left, sticky.
    
- **Ticks:** formatted as powers of 10 (
    
    ```
    10151015
    ```
    
    , 
    
    ```
    10201020
    ```
    
    ).
    
    - Important: Do not clutter with intermediate ticks (
        
        ```
        2×10152×1015
        ```
        
        ). Keep it clean.
        

---

## 5. Final Checks

- Ensure Purple dots sit on top of Orange lines (Z-Index).
    
- Ensure text contrasts passes WCAG AA standards.
    
- Ensure the "Hardware Silhouettes" are low-contrast (opacity 0.1) so they don't fight the data points.