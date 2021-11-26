<script lang="ts">
    import NavigatorItem from "./NavigatorItem.svelte";

    export let page:string = "";
</script>

<div class="header">
    <div class="icon-block">
        <img class="icon" alt="[Icon]" src="public/favicon.png">
        <b class="title">Covid Dashboard</b>
    </div>

    <div class="navigator-block">
        <NavigatorItem id="home" name="Home" selected_page={page}/>
        <NavigatorItem id="world" name="Welt" selected_page={page}/>
        <NavigatorItem id="germany" name="Deutschland" selected_page={page}/>
        <NavigatorItem id="states" name="Bundesländer" selected_page={page}/>
        <NavigatorItem id="districts" name="Landkreise" selected_page={page}/>
    </div>
</div>

<style lang="scss">
    @import "./style.scss";
</style>