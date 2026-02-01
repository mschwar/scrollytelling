<script>
    import { onMount } from "svelte";
    import { scaleLog, scaleLinear } from "d3-scale";
    import { line } from "d3-shape";
    import { tweened } from "svelte/motion";
    import { cubicOut } from "svelte/easing";
    import computeData from "../data/compute_history.json";
    import Tooltip from "./Tooltip.svelte";

    // Props for reactive domain control
    export let xDomain = [1900, 2026];
    export let yDomain = [1, 1e27];
    export let isLinearMode = false; // Toggle between log/linear scale
    export let showSpeculative = false; // Toggle speculative data visibility

    // Chart dimensions
    let width = 1200;
    let height = 700;
    const margin = { top: 40, right: 60, bottom: 60, left: 100 };

    // Computed dimensions
    $: innerWidth = width - margin.left - margin.right;
    $: innerHeight = height - margin.top - margin.bottom;

    // Constants for Moore's Law calculation
    const MOORES_LAW_ANCHOR_YEAR = 2012;
    const ALEXNET_FLOPS = 1e18; // AlexNet as anchor point

    // REACTIVE SCALES - Update when domain props change
    $: xScale = scaleLinear().domain(xDomain).range([0, innerWidth]);

    // Toggle between log and linear scale
    $: yScale = isLinearMode
        ? scaleLinear().domain(yDomain).range([innerHeight, 0]).nice()
        : scaleLog().domain(yDomain).range([innerHeight, 0]).nice();

    // Generate Moore's Law line data (2x every 2 years from 2012)
    $: mooresLawData = (() => {
        const points = [];
        const [minYear, maxYear] = xDomain;
        for (
            let year = Math.floor(minYear);
            year <= Math.ceil(maxYear);
            year += 1
        ) {
            const yearsFromAnchor = year - MOORES_LAW_ANCHOR_YEAR;
            const flops = ALEXNET_FLOPS * Math.pow(2, yearsFromAnchor / 2);
            points.push({ year, flops });
        }
        return points;
    })();

    // Create line generator for Moore's Law
    $: mooresLawLine = line()
        .x((d) => xScale(d.year))
        .y((d) => yScale(d.flops));

    // Y-axis tick values (powers of 10) - dynamically based on domain
    $: yTicks = (() => {
        const [min, max] = yDomain;
        const minExp = Math.ceil(Math.log10(min));
        const maxExp = Math.floor(Math.log10(max));
        const ticks = [];
        for (let exp = minExp; exp <= maxExp; exp += 5) {
            ticks.push(Math.pow(10, exp));
        }
        return ticks;
    })();

    // X-axis tick values - dynamically based on domain
    $: xTicks = (() => {
        const [min, max] = xDomain;
        const range = max - min;
        const step = range > 50 ? 20 : 10;
        const ticks = [];
        const start = Math.ceil(min / step) * step;
        for (let year = start; year <= max; year += step) {
            ticks.push(year);
        }
        return ticks;
    })();

    // Format large numbers for Y-axis
    function formatFlops(value) {
        const exponent = Math.log10(value);
        return `10^${Math.round(exponent)}`;
    }

    // Category color mapping
    const categoryColors = {
        Historical: "#F5A623", // Orange
        "Deep Learning": "#BD10E0", // Purple
        Theory: "#50E3C2", // Teal/Green
        Speculative: "#9B9B9B", // Gray
    };

    // Filter data: hide speculative unless toggled
    $: visibleData = computeData.filter(
        (d) => showSpeculative || !d.is_speculative,
    );

    // Separate data by category
    $: historicalData = visibleData.filter((d) => d.category === "Historical");
    $: deepLearningData = visibleData.filter(
        (d) => d.category === "Deep Learning",
    );
    $: theoryData = visibleData.filter((d) => d.category === "Theory");
    $: speculativeData = visibleData.filter(
        (d) => d.category === "Speculative",
    );

    // Tooltip state
    let tooltipVisible = false;
    let tooltipData = null;
    let mouseX = 0;
    let mouseY = 0;

    // Detect mobile vs desktop
    let isMobile = false;
    onMount(() => {
        isMobile = window.innerWidth < 768;
        window.addEventListener("resize", () => {
            isMobile = window.innerWidth < 768;
        });
    });

    // Tweened tooltip position for elastic lag (20ms delay effect)
    const tooltipX = tweened(0, { duration: 20, easing: cubicOut });
    const tooltipY = tweened(0, { duration: 20, easing: cubicOut });

    $: tooltipX.set(mouseX);
    $: tooltipY.set(mouseY);

    // Handle mouse enter on data point (desktop hover)
    function handlePointEnter(point, event) {
        if (!isMobile) {
            tooltipData = point;
            tooltipVisible = true;
            updateMousePosition(event);
        }
    }

    // Handle mouse leave (desktop)
    function handlePointLeave() {
        if (!isMobile) {
            tooltipVisible = false;
            tooltipData = null;
        }
    }

    // Handle click/tap on data point (mobile toggle)
    function handlePointClick(point, event) {
        if (isMobile) {
            // Toggle tooltip on mobile
            if (tooltipData?.id === point.id && tooltipVisible) {
                // Same point clicked - close
                tooltipVisible = false;
                tooltipData = null;
            } else {
                // New point clicked - show
                tooltipData = point;
                tooltipVisible = true;
                updateMousePosition(event);
            }
            event.stopPropagation(); // Prevent background click
        }
    }

    // Close tooltip when clicking background (mobile)
    function handleBackgroundClick() {
        if (isMobile && tooltipVisible) {
            tooltipVisible = false;
            tooltipData = null;
        }
    }

    // Update mouse position
    function updateMousePosition(event) {
        mouseX = event.clientX;
        mouseY = event.clientY;
    }
</script>

<div class="chart-container" on:click={handleBackgroundClick}>
    <svg {width} {height}>
        <g transform={`translate(${margin.left},${margin.top})`}>
            <!-- Grid lines -->
            {#each yTicks as tick}
                <line
                    x1={0}
                    y1={yScale(tick)}
                    x2={innerWidth}
                    y2={yScale(tick)}
                    stroke="#E5E5E5"
                    stroke-width="1"
                />
            {/each}

            <!-- Moore's Law Line (Orange, Dashed) -->
            <path
                d={mooresLawLine(mooresLawData)}
                fill="none"
                stroke="#F5A623"
                stroke-width="3"
                stroke-dasharray="8,4"
                opacity="0.8"
            />

            <!-- Historical Data Points (Orange) -->
            {#each historicalData as point}
                <circle
                    cx={xScale(point.date_decimal)}
                    cy={yScale(point.training_compute_flops)}
                    r="8"
                    fill="#F5A623"
                    stroke="#fff"
                    stroke-width="2"
                    opacity="0.9"
                    class="data-point"
                    on:mouseenter={(e) => handlePointEnter(point, e)}
                    on:mouseleave={handlePointLeave}
                    on:mousemove={updateMousePosition}
                    on:click={(e) => handlePointClick(point, e)}
                />
            {/each}

            <!-- Deep Learning Data Points (Purple) -->
            {#each deepLearningData as point}
                <circle
                    cx={xScale(point.date_decimal)}
                    cy={yScale(point.training_compute_flops)}
                    r="10"
                    fill="#BD10E0"
                    stroke="#fff"
                    stroke-width="2"
                    opacity="0.95"
                    class="data-point"
                    on:mouseenter={(e) => handlePointEnter(point, e)}
                    on:mouseleave={handlePointLeave}
                    on:mousemove={updateMousePosition}
                    on:click={(e) => handlePointClick(point, e)}
                />
            {/each}

            <!-- Theory Data Points (Teal/Green) -->
            {#each theoryData as point}
                <circle
                    cx={xScale(point.date_decimal)}
                    cy={yScale(point.training_compute_flops)}
                    r="7"
                    fill="#50E3C2"
                    stroke="#fff"
                    stroke-width="2"
                    opacity="0.9"
                    class="data-point"
                    on:mouseenter={(e) => handlePointEnter(point, e)}
                    on:mouseleave={handlePointLeave}
                    on:mousemove={updateMousePosition}
                    on:click={(e) => handlePointClick(point, e)}
                />
            {/each}

            <!-- Speculative Data Points (Gray, Dashed Border) -->
            {#each speculativeData as point}
                <circle
                    cx={xScale(point.date_decimal)}
                    cy={yScale(point.training_compute_flops)}
                    r="9"
                    fill="#9B9B9B"
                    stroke="#fff"
                    stroke-width="2"
                    stroke-dasharray="3,3"
                    opacity="0.85"
                    class="data-point speculative"
                    on:mouseenter={(e) => handlePointEnter(point, e)}
                    on:mouseleave={handlePointLeave}
                    on:mousemove={updateMousePosition}
                    on:click={(e) => handlePointClick(point, e)}
                />
            {/each}

            <!-- X-Axis -->
            <g transform={`translate(0,${innerHeight})`}>
                <line
                    x1={0}
                    y1={0}
                    x2={innerWidth}
                    y2={0}
                    stroke="#333"
                    stroke-width="2"
                />

                {#each xTicks as tick}
                    <g transform={`translate(${xScale(tick)},0)`}>
                        <line y1={0} y2={6} stroke="#333" stroke-width="2" />
                        <text
                            y={25}
                            text-anchor="middle"
                            font-family="Inter, sans-serif"
                            font-size="14"
                            fill="#333"
                        >
                            {tick}
                        </text>
                    </g>
                {/each}

                <!-- X-Axis Label -->
                <text
                    x={innerWidth / 2}
                    y={50}
                    text-anchor="middle"
                    font-family="Inter, sans-serif"
                    font-size="16"
                    font-weight="600"
                    fill="#333"
                >
                    Year
                </text>
            </g>

            <!-- Y-Axis -->
            <g>
                <line
                    x1={0}
                    y1={0}
                    x2={0}
                    y2={innerHeight}
                    stroke="#333"
                    stroke-width="2"
                />

                {#each yTicks as tick}
                    <g transform={`translate(0,${yScale(tick)})`}>
                        <line
                            x1={-6}
                            y1={0}
                            x2={0}
                            y2={0}
                            stroke="#333"
                            stroke-width="2"
                        />
                        <text
                            x={-10}
                            y={5}
                            text-anchor="end"
                            font-family="JetBrains Mono, monospace"
                            font-size="13"
                            fill="#333"
                        >
                            {@html formatFlops(tick)}
                        </text>
                    </g>
                {/each}

                <!-- Y-Axis Label -->
                <text
                    x={-innerHeight / 2}
                    y={-70}
                    text-anchor="middle"
                    font-family="Inter, sans-serif"
                    font-size="16"
                    font-weight="600"
                    fill="#333"
                    transform="rotate(-90)"
                >
                    Training Compute (FLOPs)
                </text>
            </g>

            <!-- Legend -->
            <g transform={`translate(${innerWidth - 200},20)`}>
                <!-- Moore's Law -->
                <line
                    x1={0}
                    y1={0}
                    x2={40}
                    y2={0}
                    stroke="#F5A623"
                    stroke-width="3"
                    stroke-dasharray="8,4"
                />
                <text
                    x={50}
                    y={5}
                    font-family="Inter, sans-serif"
                    font-size="14"
                    fill="#333"
                >
                    Moore's Law
                </text>

                <!-- AI Models -->
                <circle
                    cx={20}
                    cy={30}
                    r="8"
                    fill="#BD10E0"
                    stroke="#fff"
                    stroke-width="2"
                />
                <text
                    x={50}
                    y={35}
                    font-family="Inter, sans-serif"
                    font-size="14"
                    fill="#333"
                >
                    AI Models
                </text>
            </g>

            <!-- Labels for highlighted points -->
            {#each computeData.filter((d) => d.is_highlight) as point}
                <text
                    x={xScale(point.date_decimal)}
                    y={yScale(point.training_compute_flops) - 15}
                    text-anchor="middle"
                    font-family="Inter, sans-serif"
                    font-size="12"
                    font-weight="600"
                    fill={point.category === "Historical"
                        ? "#F5A623"
                        : "#BD10E0"}
                >
                    {point.name}
                </text>
            {/each}
        </g>
    </svg>
</div>

<!-- Tooltip (rendered outside SVG for proper positioning) -->
<Tooltip
    visible={tooltipVisible}
    x={$tooltipX}
    y={$tooltipY}
    data={tooltipData}
/>

<style>
    .chart-container {
        width: 100%;
        height: 100vh;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: var(--color-paper, #f9f9f9);
        font-family: var(--font-body, "Inter", sans-serif);
    }

    svg {
        background-color: white;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        border-radius: 8px;
    }

    /* Data point hover states */
    :global(.data-point) {
        cursor: pointer;
        transition:
            r 150ms ease,
            opacity 150ms ease;
    }

    :global(.data-point:hover) {
        r: 14;
        opacity: 1 !important;
        filter: drop-shadow(0 0 8px currentColor);
    }
</style>
