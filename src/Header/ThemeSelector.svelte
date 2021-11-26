<script lang="ts">
    import { onMount } from "svelte";

    import type { Core } from "../../public/assets/core";

    export let core:Core;

    function switchTheme() {
        if(core.userPreferences.theme == "light") {
            core.userPreferences.theme = "dark";
        } else if(core.userPreferences.theme == "dark") {
            core.userPreferences.theme = "light";
        }

        document.getElementById("header-theme-sel-icon").style.opacity = "0";

        setTimeout(() => {
            document.getElementById("header-theme-sel-icon").setAttribute("src", `public/assets/icons/themes/${core.userPreferences.theme}-theme.png`);
            core.app.update();
            document.getElementById("header-theme-sel-icon").style.opacity = "1";
        }, 200);
    }

    onMount(() => {
        document.getElementById("header-theme-sel-icon").setAttribute("src", `public/assets/icons/themes/${core.userPreferences.theme}-theme.png`);
    });
</script>

<div class="theme-selector-block" on:click={() => {switchTheme();}}>
    <img class="theme-icon" alt="theme-icon" src="public/assets/icons/themes/dark-theme.png" id="header-theme-sel-icon">
</div>

<style lang="scss">
    .theme-selector-block {
        height: 100%;
        width: 30px;

        padding-left: 6px;
        padding-right: 6px;

        display: flex;
        align-items: center;
        justify-content: center;

        position: absolute;
        right: 8px;

        cursor: pointer;
    }

    img.theme-icon {
        width: 100%;

        transition: 0.2s;
    }
</style>