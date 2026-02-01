<script>
    import { tweened } from "svelte/motion";
    import { cubicOut } from "svelte/easing";
    import { onMount } from "svelte";
    import Background from "./components/Background.svelte";
    import Chart from "./components/Chart.svelte";
    import Scrolly from "./components/Scrolly.svelte";
    import Narrative from "./components/Narrative.svelte";

    // Current scroll step (bound to Scrolly)
    let currentStep = 0;

    // Linear scale toggle state
    let isLinearMode = false;

    // Speculative data toggle state (show by default for visibility)
    let showSpeculative = true;

    // Off-chart message state
    let showOffChartMessage = false;

    // Handle toggle from Narrative component
    function handleToggleScale() {
        // Prevent toggling while animation is running
        if (showOffChartMessage) return;

        isLinearMode = !isLinearMode;

        if (isLinearMode) {
            // "The Unzipper" Effect
            // 1. Switch to linear
            // 2. Animate domain to a "human" scale (e.g., 1 PetaFLOP)
            //    This causes hyper-scale models to shoot off the top

            // Allow immediate render of switch
            setTimeout(() => {
                yDomainTween.set([0, 1e16], {
                    duration: 2500,
                    easing: cubicOut,
                });
            }, 50);

            // 3. Show message
            setTimeout(() => {
                showOffChartMessage = true;
            }, 1500);

            // 4. Snap back to Log scale after delay
            setTimeout(() => {
                showOffChartMessage = false;
                isLinearMode = false;
                // Reset to log domain for current step
                const defaultDomains = {
                    0: [0.5, 1e6],
                    1: [1e3, 1e18],
                    2: [1e3, 1e27],
                    3: [1e3, 1e27],
                };
                const target = defaultDomains[currentStep] || [1, 1e27];
                yDomainTween.set(target, { duration: 1000 });
            }, 6000); // 6s total experience
        } else {
            // Manual toggle release - just reset
            showOffChartMessage = false;
        }
    }

    // Handle speculative toggle from Narrative
    function handleToggleSpeculative(event) {
        showSpeculative = event.detail;
    }

    // Global keyboard shortcut for scale toggle
    onMount(() => {
        window.addEventListener("keydown", (e) => {
            // Only trigger if not in an input field
            if (
                (e.key === "l" || e.key === "L") &&
                !e.target.matches("input, textarea")
            ) {
                handleToggleScale();
            }
        });
    });

    // Tweened domain stores for smooth animations
    const xDomainTween = tweened([1900, 2026], {
        duration: 1200,
        easing: cubicOut,
    });

    const yDomainTween = tweened([1, 1e27], {
        duration: 1200,
        easing: cubicOut,
    });

    // Reactive domain switching based on scroll step
    $: {
        if (!showOffChartMessage && !isLinearMode) {
            // Only auto-update if not in animation
            switch (currentStep) {
                case 0: // The Anchor: Zoom in on Human/ENIAC
                    xDomainTween.set([1900, 1950]);
                    yDomainTween.set([0.5, 1e6]);
                    break;

                case 1: // Moore's Law: Show the Orange Line
                    xDomainTween.set([1940, 2015]);
                    yDomainTween.set([1e3, 1e18]);
                    break;

                case 2: // The Break: Show Purple Explosion
                    xDomainTween.set([1940, 2026]);
                    yDomainTween.set([1e3, 1e27]);
                    break;

                case 3: // The Scale: Full view
                    xDomainTween.set([1940, 2026]);
                    yDomainTween.set([1e3, 1e27]);
                    break;

                default:
                    xDomainTween.set([1900, 2026]);
                    yDomainTween.set([1, 1e27]);
            }
        }
    }
</script>

<main>
    <!-- Layer 0: Background (Hardware Silhouettes) -->
    <Background {currentStep} />

    <!-- Layer 1: Chart (D3 Visualization) - STICKY -->
    <div class="chart-layer">
        <Chart
            xDomain={$xDomainTween}
            yDomain={$yDomainTween}
            {isLinearMode}
            {showSpeculative}
        />

        <!-- Off-chart message overlay -->
        {#if showOffChartMessage}
            <div class="off-chart-overlay">
                <div class="message-content">
                    <h2>🚀 Off The Charts!</h2>
                    <p>
                        On a linear scale, modern AI models like Gemini Ultra
                        are <strong>billions of times taller</strong> than this screen.
                    </p>
                    <p class="sub">
                        Ideally scaled, the bar would reach past the moon.
                    </p>
                </div>
            </div>
        {/if}
    </div>

    <!-- Layer 2: Text (Scrollama Narrative) -->
    <div class="text-layer">
        <Scrolly bind:value={currentStep}>
            <Narrative
                {isLinearMode}
                on:toggleScale={handleToggleScale}
                {showSpeculative}
                on:toggleSpeculative={handleToggleSpeculative}
            />
        </Scrolly>
    </div>
</main>

<style>
    :global(body) {
        margin: 0;
        padding: 0;
        font-family:
            "Inter",
            -apple-system,
            BlinkMacSystemFont,
            "Segoe UI",
            sans-serif;
    }

    main {
        width: 100%;
        min-height: 100vh;
        position: relative;
    }

    /* Layer 1: Chart (Middle) */
    .chart-layer {
        position: sticky;
        top: 0;
        width: 100%;
        height: 100vh;
        z-index: 1;
    }

    /* Layer 2: Text (Top) */
    .text-layer {
        position: relative;
        z-index: 2;
        pointer-events: none; /* Allow clicks through to chart for tooltips */
    }

    /* Mobile Responsiveness - Stack Layout */
    @media (max-width: 768px) {
        /* Chart: Sticky at top, reduced height */
        .chart-layer {
            position: sticky;
            top: 0;
            height: 40vh; /* Reduced from 100vh */
            z-index: 1;
        }

        /* Text: Scrolls underneath chart */
        .text-layer {
            position: relative;
            z-index: 2;
            /* Ensure panels have enough opacity to be readable */
        }
    }

    /* Off-Chart Message Overlay */
    .off-chart-overlay {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: rgba(189, 16, 224, 0.95); /* Deep Learning Purple */
        color: white;
        padding: 2rem;
        border-radius: 12px;
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
        text-align: center;
        max-width: 400px;
        z-index: 100;
        animation: popUp 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        pointer-events: none;
    }

    .message-content h2 {
        margin: 0 0 1rem 0;
        font-size: 1.8rem;
    }

    .message-content p {
        margin: 0 0 1rem 0;
        line-height: 1.5;
        font-size: 1.1rem;
    }

    .message-content .sub {
        font-size: 0.9rem;
        opacity: 0.8;
        font-style: italic;
        margin-bottom: 0;
    }

    @keyframes popUp {
        from {
            opacity: 0;
            transform: translate(-50%, -40%) scale(0.9);
        }
        to {
            opacity: 1;
            transform: translate(-50%, -50%) scale(1);
        }
    }
</style>
