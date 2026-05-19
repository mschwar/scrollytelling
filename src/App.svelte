<script>
    import { tweened } from "svelte/motion";
    import { cubicOut } from "svelte/easing";
    import { onMount, tick } from "svelte";
    import Background from "./components/Background.svelte";
    import Chart from "./components/Chart.svelte";
    import Scrolly from "./components/Scrolly.svelte";
    import Narrative from "./components/Narrative.svelte";
    import { buildStoryUrl, readStoryState } from "./lib/story-state.js";

    const MAX_TRACKED_STEP = 4;

    const STEP_DOMAIN_PRESETS = {
        0: { x: [1900, 1950], y: [0.5, 1e6] },
        1: { x: [1940, 2015], y: [1e3, 1e18] },
        2: { x: [1940, 2026], y: [1e3, 1e27] },
        3: { x: [1940, 2026], y: [1e3, 1e27] },
    };

    const FALLBACK_DOMAIN = { x: [1900, 2026], y: [1, 1e27] };
    const LINEAR_Y_DOMAIN = [0, 1e16];

    function getStepDomains(step) {
        return STEP_DOMAIN_PRESETS[step] || FALLBACK_DOMAIN;
    }

    const initialStoryState =
        typeof window === "undefined"
            ? readStoryState("", MAX_TRACKED_STEP)
            : readStoryState(window.location.search, MAX_TRACKED_STEP);

    // Current scroll step (bound to Scrolly)
    let currentStep = initialStoryState.step;

    // Linear scale toggle state
    let isLinearMode = initialStoryState.linear;

    // Speculative data toggle state (show by default for visibility)
    let showSpeculative = initialStoryState.speculative;

    // Off-chart message state
    let showOffChartMessage = false;
    let hasHydratedStoryState = false;
    let chartRef;

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

    function handleGlobalKeydown(event) {
        const target = event.target;

        if (
            target instanceof Element &&
            target.matches("input, textarea, [contenteditable='true']")
        ) {
            return;
        }

        if (event.key === "l" || event.key === "L") {
            handleToggleScale();
        }
    }

    // Handle speculative toggle from Narrative
    function handleToggleSpeculative(event) {
        showSpeculative = event.detail;
    }

    function handleFocusChart() {
        chartRef?.focusFirstVisiblePoint();
    }

    onMount(() => {
        window.addEventListener("keydown", handleGlobalKeydown);

        let cancelled = false;
        tick().then(() => {
            if (!cancelled) {
                hasHydratedStoryState = true;
            }
        });

        return () => {
            cancelled = true;
            window.removeEventListener("keydown", handleGlobalKeydown);
        };
    });

    function syncStoryStateToUrl(
        step,
        linearMode,
        speculativeMode,
        hydrated,
    ) {
        if (!hydrated || typeof window === "undefined") {
            return;
        }

        window.history.replaceState(
            null,
            "",
            buildStoryUrl(
                {
                    step,
                    linear: linearMode,
                    speculative: speculativeMode,
                },
                window.location,
                MAX_TRACKED_STEP,
            ),
        );
    }

    $: syncStoryStateToUrl(
        currentStep,
        isLinearMode,
        showSpeculative,
        hasHydratedStoryState,
    );

    // Tweened domain stores for smooth animations
    const xDomainTween = tweened([1900, 2026], {
        duration: 1200,
        easing: cubicOut,
    });

    const yDomainTween = tweened([1, 1e27], {
        duration: 1200,
        easing: cubicOut,
    });

    // Reactive domain switching based on scroll step and scale mode
    $: {
        if (!showOffChartMessage) {
            const { x, y } = getStepDomains(currentStep);
            xDomainTween.set(x);
            yDomainTween.set(isLinearMode ? LINEAR_Y_DOMAIN : y);
        }
    }

</script>

<main>
    <!-- Layer 0: Background (Hardware Silhouettes) -->
    <Background {currentStep} />

    <!-- Layer 1: Chart (D3 Visualization) - STICKY -->
    <div class="chart-layer">
        <Chart
            bind:this={chartRef}
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
                {currentStep}
                {isLinearMode}
                on:toggleScale={handleToggleScale}
                on:focusChart={handleFocusChart}
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
