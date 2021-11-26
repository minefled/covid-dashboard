<script lang="ts">
    import { createEventDispatcher } from "svelte";
    import NavigatorItem from "./NavigatorItem.svelte";

    const dispatch = createEventDispatcher();

    export let page:string = "";

    function select_page(event) {
        dispatch("set-page", {
            "page": event?.detail?.page || ""
        });
    }
</script>

<div class="header">
    <div class="icon-block">
        <img class="icon" alt="[Icon]" src="public/favicon.png">
        <b class="title">Covid Dashboard</b>
    </div>

    <div class="navigator-block">
        <NavigatorItem id="home" name="Home" selected_page={page} on:set-page={(e) => { select_page(e); }}/>
        <NavigatorItem id="world" name="Welt" selected_page={page} on:set-page={(e) => { select_page(e); }}/>
        <NavigatorItem id="germany" name="Deutschland" selected_page={page} on:set-page={(e) => { select_page(e); }}/>
        <NavigatorItem id="states" name="Bundesländer" selected_page={page} on:set-page={(e) => { select_page(e); }}/>
        <NavigatorItem id="districts" name="Landkreise" selected_page={page} on:set-page={(e) => { select_page(e); }}/>
    </div>
</div>

<style lang="scss">
    @import "./style.scss";
</style>