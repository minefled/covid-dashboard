<script lang="ts">
    import type { Core } from "../../public/assets/core";

    export let core:Core;

    function switchTheme() {
        if(core.userPreferences.theme == "light") {
            core.userPreferences.theme = "dark";
        } else if(core.userPreferences.theme == "dark") {
            core.userPreferences.theme = "light";
        }

        core.app.update();
    }
</script>

<div class="theme-selector-block" on:click={() => {switchTheme();}}>
    <img class="theme-icon" alt="theme-icon" src="public/assets/icons/themes/{core.userPreferences.theme}-theme.png" id="header-theme-sel-icon">
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
    }
</style>