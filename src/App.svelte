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

    // Speculative data toggle state
    let showSpeculative = false;

    // Handle toggle from Narrative component
    function handleToggleScale() {
        isLinearMode = !isLinearMode;
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
    </div>

    <!-- Layer 2: Text (Scrollama Narrative) -->
    <div class="text-layer">
        <Scrolly bind:value={currentStep}>
            <Narrative {isLinearMode} on:toggleScale={handleToggleScale} />
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
</style>
