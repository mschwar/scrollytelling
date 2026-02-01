<script>
    // No script needed - pure presentation
</script>

<div class="narrative-container">
    <!-- Step 0: The Anchor -->
    <div class="step">
        <div class="step-content">
            <h2>The Anchor</h2>
            <p class="lead">1 FLOP = 1 Human Math Problem</p>
            <p>
                In 1900, a human accountant could perform roughly <strong
                    >1 calculation per second</strong
                >
                (1 FLOP). This is our baseline. Everything that follows is measured
                against this human scale.
            </p>
        </div>
    </div>

    <!-- Step 1: The Speed Limit -->
    <div class="step">
        <div class="step-content">
            <h2>The Speed Limit</h2>
            <p class="lead">Moore's Law: The Golden Rule</p>
            <p>
                For 70 years, computing power doubled every <strong
                    >2 years</strong
                >. From ENIAC's vacuum tubes to desktop processors, we rode this
                exponential curve. It was predictable. It was safe. It was the
                <em>speed limit</em>.
            </p>
        </div>
    </div>

    <!-- Step 2: The Break -->
    <div class="step">
        <div class="step-content">
            <h2>The Break</h2>
            <p class="lead">Deep Learning Leaves the Line</p>
            <p>
                In <strong>2012</strong>, AlexNet shattered the curve. By
                parallelizing neural networks across GPUs, AI training broke
                free from Moore's Law. What took 70 years to achieve was now
                happening every <em>18 months</em>.
            </p>
            <p class="highlight">
                The purple dots are no longer following the orange line.
            </p>
        </div>
    </div>

    <!-- Step 3: The Scale -->
    <div class="step">
        <div class="step-content">
            <h2>The Scale</h2>
            <p class="lead">Unzipping the Logarithmic Scale</p>
            <p>
                GPT-4's training used <strong>2×10²⁵ FLOPs</strong>. If a human
                tried to perform this computation at 1 FLOP/second, it would
                take <strong>600 million human lifetimes</strong>.
            </p>
            <p class="highlight">
                This is not a trend line. This is a phase shift.
            </p>
        </div>
    </div>

    <!-- Spacer to allow scrolling past last step -->
    <div class="step spacer"></div>
</div>

<style>
    .narrative-container {
        position: relative;
        z-index: 2;
        pointer-events: none; /* Allow clicks through to chart */
    }

    .step {
        min-height: 100vh;
        display: flex;
        align-items: center;
        justify-content: flex-start;
        padding: 0 2rem;
    }

    .step.spacer {
        min-height: 60vh; /* Extra scroll space */
    }

    .step-content {
        max-width: 500px;
        padding: 2rem 2.5rem;
        pointer-events: all; /* Re-enable for text boxes */

        /* Glassmorphism styling per 04_Visual_Style_Guide */
        background: rgba(255, 255, 255, 0.9);
        backdrop-filter: blur(10px);
        border-left: 4px solid #333;
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.15);
        border-radius: 4px;
    }

    h2 {
        font-family: "Inter", sans-serif;
        font-size: 2rem;
        font-weight: 700;
        margin: 0 0 1rem 0;
        color: #1a1a1a;
    }

    .lead {
        font-size: 1.25rem;
        font-weight: 600;
        color: #333;
        margin: 0 0 1.5rem 0;
        font-family: "Inter", sans-serif;
    }

    p {
        font-family: "Inter", sans-serif;
        font-size: 1rem;
        line-height: 1.6;
        color: #444;
        margin: 0 0 1rem 0;
    }

    p:last-child {
        margin-bottom: 0;
    }

    strong {
        font-weight: 700;
        color: #1a1a1a;
    }

    em {
        font-style: italic;
        color: #f5a623; /* Orange for Moore's Law references */
    }

    .highlight {
        padding: 0.75rem 1rem;
        background: rgba(189, 16, 224, 0.1); /* Purple tint */
        border-left: 3px solid #bd10e0;
        margin-top: 1rem;
        font-weight: 500;
    }

    /* Responsive adjustments */
    @media (max-width: 768px) {
        .step {
            padding: 0 1rem;
        }

        .step-content {
            padding: 1.5rem 2rem;
        }

        h2 {
            font-size: 1.5rem;
        }

        .lead {
            font-size: 1.1rem;
        }
    }
</style>
