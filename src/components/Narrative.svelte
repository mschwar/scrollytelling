<script>
    import { createEventDispatcher } from "svelte";

    export let isLinearMode = false;

    const dispatch = createEventDispatcher();

    function toggleScale() {
        dispatch("toggleScale");
    }
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

            <!-- The "Unzip" Toggle Button -->
            <div class="toggle-section">
                <button
                    class="unzip-button"
                    on:click={toggleScale}
                    accesskey="l"
                    aria-label="Toggle between logarithmic and linear scale. Press L key as shortcut."
                >
                    {isLinearMode
                        ? "📐 Return to Log Scale"
                        : "🔍 See True Scale (Linear)"}
                </button>
                <p class="toggle-hint">
                    {#if isLinearMode}
                        Linear scale shows the <em>actual</em> distances. GPT-4 shoots
                        off the chart.
                    {:else}
                        Warning: Switching to linear scale will make top models
                        disappear off-screen. This proves the magnitude.
                    {/if}
                </p>
            </div>
        </div>
    </div>

    <!-- Step 4: Credits & Sources -->
    <div class="step">
        <div class="step-content credits">
            <h2>Built With Data</h2>
            <p class="lead">Sources & Credits</p>

            <div class="credits-section">
                <h3>Data Sources</h3>
                <ul>
                    <li>
                        <a
                            href="https://epochai.org/"
                            target="_blank"
                            rel="noopener">Epoch AI</a
                        > – ML compute dataset
                    </li>
                    <li>
                        <a
                            href="https://ourworldindata.org/technological-progress"
                            target="_blank"
                            rel="noopener">Our World in Data</a
                        > – Historical compute benchmarks
                    </li>
                </ul>
            </div>

            <div class="credits-section">
                <h3>Technology Stack</h3>
                <ul>
                    <li><strong>Svelte 5</strong> – Reactive UI framework</li>
                    <li><strong>D3.js v7</strong> – Data visualization</li>
                    <li>
                        <strong>Scrollama</strong> – Scroll-driven narratives
                    </li>
                    <li><strong>Vite</strong> – Build tool</li>
                </ul>
            </div>

            <div class="credits-section">
                <p class="author">
                    <strong>Visualization by:</strong> Built as a demonstration of
                    scrollytelling techniques
                </p>
                <p class="github-link">
                    <a
                        href="https://github.com/yourusername/scrollytelling"
                        target="_blank"
                        rel="noopener"
                    >
                        View Source on GitHub →
                    </a>
                </p>
            </div>
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

        /* Glassmorphism styling - Industrial Futurism per 04_Visual_Style_Guide */
        background: rgba(255, 255, 255, 0.85);
        backdrop-filter: blur(8px);
        -webkit-backdrop-filter: blur(8px); /* Safari support */
        border-left: 4px solid var(--color-border-dark, #333);
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
        border-radius: 4px;

        transition:
            transform 200ms ease,
            box-shadow 200ms ease;
    }

    .step-content:hover {
        transform: translateY(-2px);
        box-shadow: 0 6px 24px rgba(0, 0, 0, 0.12);
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

    /* Toggle Section Styling */
    .toggle-section {
        margin-top: 1.5rem;
        padding-top: 1rem;
        border-top: 1px solid rgba(0, 0, 0, 0.1);
    }

    .unzip-button {
        width: 100%;
        padding: 0.875rem 1.5rem;
        font-family: var(--font-heading, "Inter", sans-serif);
        font-size: 1rem;
        font-weight: 600;
        color: white;
        background: linear-gradient(135deg, #bd10e0 0%, #9013fe 100%);
        border: none;
        border-radius: 6px;
        cursor: pointer;
        transition: all 200ms ease;
        box-shadow: 0 2px 8px rgba(189, 16, 224, 0.3);
    }

    .unzip-button:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(189, 16, 224, 0.4);
    }

    .unzip-button:active {
        transform: translateY(0);
    }

    .toggle-hint {
        margin-top: 0.75rem;
        font-size: 0.85rem;
        color: #666;
        line-height: 1.5;
        font-style: italic;
    }

    .toggle-hint em {
        color: #bd10e0;
        font-weight: 600;
    }

    /* Credits Section Styling */
    .credits {
        background: rgba(255, 255, 255, 0.95);
        max-width: 600px;
    }

    .credits h3 {
        font-size: 1.1rem;
        font-weight: 600;
        margin: 1.5rem 0 0.75rem 0;
        color: var(--color-text-primary, #1a1a1a);
    }

    .credits-section {
        margin-bottom: 1.5rem;
    }

    .credits-section ul {
        list-style: none;
        padding: 0;
        margin: 0;
    }

    .credits-section li {
        margin-bottom: 0.5rem;
        font-size: 0.95rem;
        line-height: 1.5;
    }

    .credits-section a {
        color: var(--color-purple-ai, #bd10e0);
        text-decoration: none;
        font-weight: 500;
        transition: color 150ms ease;
    }

    .credits-section a:hover {
        color: var(--color-orange-moores, #f5a623);
        text-decoration: underline;
    }

    .author {
        font-size: 0.95rem;
        margin: 1rem 0 0.5rem 0;
    }

    .github-link {
        margin-top: 0.5rem;
    }

    .github-link a {
        display: inline-block;
        padding: 0.5rem 1rem;
        background: rgba(189, 16, 224, 0.1);
        border: 1px solid var(--color-purple-ai, #bd10e0);
        border-radius: 4px;
        font-weight: 500;
        transition: all 150ms ease;
    }

    .github-link a:hover {
        background: var(--color-purple-ai, #bd10e0);
        color: white;
        text-decoration: none;
        transform: translateY(-1px);
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

        .credits {
            max-width: 100%;
        }

        .credits h3 {
            font-size: 1rem;
        }
    }
</style>
