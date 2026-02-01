<script>
    import { onMount, onDestroy } from "svelte";
    import scrollama from "scrollama";

    // Bind this value to parent component to track current step
    export let value = 0;

    let scroller;
    let scrollamaInstance;

    onMount(() => {
        scrollamaInstance = scrollama();

        scrollamaInstance
            .setup({
                step: ".step",
                offset: 0.5, // Trigger when step reaches middle of viewport
                debug: false, // Set to true to see visual debugger
            })
            .onStepEnter((response) => {
                value = response.index;
            });

        // Setup resize listener
        window.addEventListener("resize", scrollamaInstance.resize);

        return () => {
            if (scrollamaInstance) {
                scrollamaInstance.destroy();
            }
            window.removeEventListener("resize", scrollamaInstance.resize);
        };
    });

    onDestroy(() => {
        if (scrollamaInstance) {
            scrollamaInstance.destroy();
        }
    });
</script>

<div class="scrolly-container" bind:this={scroller}>
    <slot />
</div>

<style>
    .scrolly-container {
        position: relative;
        /* Flow naturally in document - children will scroll over sticky chart */
    }
</style>
