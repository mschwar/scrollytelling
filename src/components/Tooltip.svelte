<script>
    export let visible = false;
    export let x = 0;
    export let y = 0;
    export let data = null;

    // Constants for human scale calculation
    const SECONDS_PER_YEAR = 31536000; // 365 * 24 * 60 * 60
    const HUMAN_FLOPS = 1; // 1 FLOP per second

    // Calculate human years with proper formatting
    $: humanYears = data
        ? Math.round(data.training_compute_flops / SECONDS_PER_YEAR)
        : 0;

    $: humanYearsFormatted = (() => {
        if (!humanYears) return "0";

        if (humanYears >= 1e9) {
            return `${(humanYears / 1e9).toFixed(1)} Billion`;
        } else if (humanYears >= 1e6) {
            return `${(humanYears / 1e6).toFixed(1)} Million`;
        } else if (humanYears >= 1e3) {
            return `${(humanYears / 1e3).toFixed(1)} Thousand`;
        }
        return humanYears.toLocaleString();
    })();

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
            <span class="value mono">{Math.floor(data.date_decimal)}</span>
        </div>
        <div class="tooltip-row">
            <span class="label">Compute:</span>
            <span class="value mono">{flopsFormatted} FLOPs</span>
        </div>
        <div class="tooltip-divider"></div>
        <div class="tooltip-anchor">
            <div class="anchor-label">Human Scale:</div>
            <div class="anchor-value">
                Equivalent to <strong>{humanYearsFormatted}</strong> years
                {#if humanYears >= 1e6}
                    <br /><span class="sub"
                        >({(humanYears / 70).toFixed(0).toLocaleString()} human lifetimes)</span
                    >
                {/if}
            </div>
        </div>
        <div class="tooltip-hardware">
            <em>{data.hardware_analogy}</em>
        </div>
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
        background: rgba(26, 26, 26, 0.95);
        backdrop-filter: blur(12px);
        -webkit-backdrop-filter: blur(12px);
        border: 1px solid rgba(255, 255, 255, 0.1);
        border-radius: 6px;
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);

        padding: 0.75rem 1rem;
        min-width: 280px;
        max-width: 320px;

        color: white;
        font-family: var(--font-body, "Inter", sans-serif);
        font-size: 0.875rem;
        line-height: 1.4;

        /* Smooth appearance */
        animation: tooltipFadeIn 150ms ease-out;
    }

    @keyframes tooltipFadeIn {
        from {
            opacity: 0;
            transform: translate(12px, -50%) scale(0.95);
        }
        to {
            opacity: 1;
            transform: translate(12px, -50%) scale(1);
        }
    }

    .tooltip-header {
        font-weight: 700;
        font-size: 1rem;
        margin-bottom: 0.5rem;
        color: #fff;
        font-family: var(--font-heading, "Inter", sans-serif);
    }

    .tooltip-row {
        display: flex;
        justify-content: space-between;
        align-items: baseline;
        margin-bottom: 0.25rem;
    }

    .label {
        color: rgba(255, 255, 255, 0.7);
        font-size: 0.75rem;
        font-weight: 500;
    }

    .value {
        color: #fff;
        font-weight: 500;
    }

    .mono {
        font-family: var(--font-mono, "JetBrains Mono", monospace);
        font-size: 0.8rem;
    }

    .tooltip-divider {
        height: 1px;
        background: rgba(255, 255, 255, 0.15);
        margin: 0.6rem 0;
    }

    .tooltip-anchor {
        background: rgba(245, 166, 35, 0.15); /* Orange tint */
        padding: 0.5rem;
        border-radius: 4px;
        border-left: 2px solid var(--color-orange-moores, #f5a623);
        margin-bottom: 0.5rem;
    }

    .anchor-label {
        font-size: 0.7rem;
        text-transform: uppercase;
        letter-spacing: 0.5px;
        color: rgba(255, 255, 255, 0.6);
        margin-bottom: 0.25rem;
        font-weight: 600;
    }

    .anchor-value {
        font-size: 0.85rem;
        line-height: 1.3;
        color: #fff;
    }

    .anchor-value strong {
        color: var(--color-orange-moores, #f5a623);
        font-weight: 700;
    }

    .sub {
        font-size: 0.75rem;
        color: rgba(255, 255, 255, 0.7);
    }

    .tooltip-hardware {
        text-align: center;
        padding-top: 0.4rem;
        border-top: 1px solid rgba(255, 255, 255, 0.1);
        font-size: 0.75rem;
        color: rgba(255, 255, 255, 0.6);
    }

    .tooltip-hardware em {
        font-style: italic;
    }
</style>
