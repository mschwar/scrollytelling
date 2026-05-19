<script>
    import { onMount, tick } from "svelte";
    import scrollama from "scrollama";

    // Bind this value to parent component to track current step
    export let value = 0;

    let scrollamaInstance;

    function handleResize() {
        if (scrollamaInstance) {
            scrollamaInstance.resize();
        }
    }

    onMount(() => {
        scrollamaInstance = scrollama();

        scrollamaInstance
            .setup({
                step: ".step:not(.spacer)",
                offset: 0.5, // Trigger when step reaches middle of viewport
                debug: false, // Set to true to see visual debugger
            })
            .onStepEnter((response) => {
                value = response.index;
            });

        // Setup resize listener
        window.addEventListener("resize", handleResize);

        let cancelled = false;
        tick().then(() => {
            if (cancelled) {
                return;
            }

            const steps = Array.from(
                document.querySelectorAll(".step:not(.spacer)"),
            );

            if (steps.length === 0) {
                return;
            }

            const normalizedIndex = Math.min(
                Math.max(Math.trunc(value), 0),
                steps.length - 1,
            );

            if (normalizedIndex !== value) {
                value = normalizedIndex;
            }

            steps[normalizedIndex]?.scrollIntoView({
                block: "start",
                behavior: "auto",
            });
        });

        return () => {
            cancelled = true;
            if (scrollamaInstance) {
                scrollamaInstance.destroy();
            }
            window.removeEventListener("resize", handleResize);
        };
    });
</script>

<div class="scrolly-container">
    <slot />
</div>

<style>
    .scrolly-container {
        position: relative;
        /* Flow naturally in document - children will scroll over sticky chart */
    }
</style>
