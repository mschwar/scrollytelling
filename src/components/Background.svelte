<script>
    export let currentStep = 0;
</script>

<div class="background-layer">
    <!-- Step 0: Human/Abacus Era -->
    <div class="silhouette human" class:active={currentStep === 0}>
        <div class="icon">👤</div>
        <div class="label">Human Computation</div>
    </div>

    <!-- Step 1: Desktop PC Era -->
    <div class="silhouette desktop" class:active={currentStep === 1}>
        <div class="icon">🖥️</div>
        <div class="label">Moore's Law Era</div>
    </div>

    <!-- Step 2-3: Data Center / AI Era -->
    <div class="silhouette datacenter" class:active={currentStep >= 2}>
        <div class="icon">🏢</div>
        <div class="label">AI Data Centers</div>
    </div>
</div>

<style>
    .background-layer {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100vh;
        z-index: 0;
        pointer-events: none;
        overflow: hidden;
    }

    .silhouette {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        opacity: 0;
        transition: opacity 800ms ease-in-out;
        text-align: center;
        color: #333;
    }

    .silhouette.active {
        opacity: 0.08; /* Very subtle, per style guide */
    }

    .icon {
        font-size: 20rem;
        line-height: 1;
        filter: grayscale(100%);
    }

    .label {
        font-family: "Inter", sans-serif;
        font-size: 1.5rem;
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 4px;
        margin-top: 2rem;
    }

    /* Position variations to avoid overlap */
    .human {
        transform: translate(-50%, -50%) scale(0.9);
    }

    .desktop {
        transform: translate(-50%, -50%) scale(1);
    }

    .datacenter {
        transform: translate(-50%, -50%) scale(1.1);
    }
</style>
