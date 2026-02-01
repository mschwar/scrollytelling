<script>
    export let visible = false;
    export let x = 0;
    export let y = 0;
    export let data = null;

    // Format FLOPs in scientific notation
    $: flopsFormatted = data
        ? data.training_compute_flops.toExponential(1).replace("e+", " × 10^")
        : "";
</script>

{#if visible && data}
    <div class="tooltip" style="left: {x}px; top: {y}px;">
        <div class="tooltip-header">
            {data.name}
        </div>

        <div class="tooltip-row">
            <span class="label">Year:</span>
            <span class="value mono"
                >{data.date_decimal.toFixed(
                    data.date_decimal % 1 === 0 ? 0 : 1,
                )}</span
            >
        </div>

        <!-- Cost Estimate -->
        {#if data.cost_estimate || data.training_cost_usd > 0}
            <div class="tooltip-row">
                <span class="label">Est. Cost:</span>
                <span class="value mono">
                    {data.cost_estimate ||
                        `$${data.training_cost_usd.toLocaleString()}`}
                </span>
            </div>
        {/if}

        <div class="tooltip-row">
            <span class="label">Compute:</span>
            <span class="value mono">{flopsFormatted} FLOPs</span>
        </div>

        <div class="tooltip-divider"></div>

        <!-- Human Analogy (from JSON) -->
        <div class="tooltip-anchor">
            <div class="anchor-label">
                <span style="font-size: 1.1em; margin-right: 4px;">👤</span>
                Human Equivalency:
            </div>
            <div class="anchor-value">
                {data.human_analogy}
            </div>
        </div>

        <div class="tooltip-hardware">
            <em>{data.hardware_analogy}</em>
        </div>

        <!-- Speculative Warning -->
        {#if data.is_speculative}
            <div class="tooltip-warning">⚠️ Speculative Estimate</div>
        {/if}

        <!-- Source Citation -->
        {#if data.source}
            <div class="tooltip-source">
                Source: {data.source}
            </div>
        {/if}
    </div>
{/if}

<style>
    .tooltip {
        position: fixed;
        pointer-events: none;
        z-index: 1000;

        /* Offset from cursor */
        transform: translate(12px, -50%);

        /* Glassmorphism */
        background: rgba(20, 20, 20, 0.95);
        backdrop-filter: blur(12px);
        -webkit-backdrop-filter: blur(12px);
        border: 1px solid rgba(255, 255, 255, 0.15);
        border-radius: 8px;
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.5);

        padding: 0.85rem 1rem;
        min-width: 260px;
        max-width: 300px;

        color: white;
        font-family: var(--font-body, "Inter", sans-serif);
        font-size: 0.875rem;
        line-height: 1.4;

        /* Smooth appearance */
        transition:
            opacity 0.1s ease-out,
            transform 0.1s ease-out;
    }

    .tooltip-header {
        font-weight: 700;
        font-size: 1.1rem;
        margin-bottom: 0.75rem;
        color: #fff;
        font-family: var(--font-heading, "Inter", sans-serif);
        border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        padding-bottom: 0.5rem;
    }

    .tooltip-row {
        display: flex;
        justify-content: space-between;
        align-items: baseline;
        margin-bottom: 0.35rem;
    }

    .label {
        color: rgba(255, 255, 255, 0.6);
        font-size: 0.75rem;
        font-weight: 500;
    }

    .value {
        color: #fff;
        font-weight: 500;
        text-align: right;
    }

    .mono {
        font-family: var(--font-mono, "JetBrains Mono", monospace);
        font-size: 0.8rem;
        letter-spacing: -0.02em;
    }

    .tooltip-divider {
        height: 1px;
        background: rgba(255, 255, 255, 0.1);
        margin: 0.6rem 0;
    }

    .tooltip-anchor {
        background: rgba(80, 227, 194, 0.1); /* Teal tint for human scale */
        padding: 0.6rem;
        border-radius: 4px;
        border-left: 3px solid #50e3c2;
        margin-bottom: 0.75rem;
    }

    .anchor-label {
        font-size: 0.7rem;
        text-transform: uppercase;
        letter-spacing: 0.5px;
        color: #50e3c2;
        margin-bottom: 0.25rem;
        font-weight: 700;
        display: flex;
        align-items: center;
    }

    .anchor-value {
        font-size: 0.9rem;
        font-weight: 500;
        line-height: 1.3;
        color: #fff;
    }

    .tooltip-hardware {
        text-align: center;
        font-size: 0.8rem;
        color: rgba(255, 255, 255, 0.7);
        margin-bottom: 0.5rem;
    }

    .tooltip-hardware em {
        font-style: normal;
        background: rgba(255, 255, 255, 0.1);
        padding: 2px 6px;
        border-radius: 4px;
        font-size: 0.75rem;
    }

    .tooltip-warning {
        background: rgba(245, 158, 11, 0.2);
        color: #f59e0b;
        font-size: 0.75rem;
        padding: 0.4rem;
        border-radius: 4px;
        text-align: center;
        margin-top: 0.5rem;
        font-weight: 600;
        border: 1px solid rgba(245, 158, 11, 0.3);
    }

    .tooltip-source {
        text-align: right;
        font-size: 0.65rem;
        color: rgba(255, 255, 255, 0.4);
        margin-top: 0.5rem;
        font-style: italic;
    }
</style>
