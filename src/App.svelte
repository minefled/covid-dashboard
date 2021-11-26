<script lang="ts">
	import Header from "./Header/Header.svelte";
	import Homepage from "./home/Homepage.svelte";
	import GermanyPage from "./Germany/GermanyPage.svelte";	
	import { Core, get_page } from "../public/assets/core";
	import { onMount } from "svelte";

	export let page = "home";
	export let core:Core;

	onMount(() => {
		window.addEventListener("hashchange", () => {
			page = get_page();
		})
	});

	export function update() {
		core.userPreferences.theme = core.userPreferences.theme;
	}
</script>

<main>
	<!-- Load theme -->
	<link rel="stylesheet" href="public/assets/themes/{core.userPreferences.theme}.css" id="theme-loader">

	<Header page={page} core={core}/>

	{#if page == "home"}
		<Homepage />
	{/if}
	{#if page == "germany"}
		<GermanyPage core={core}/>
	{/if}
</main>

<style lang="scss">
	main {
		position: fixed;
		top: 0;
		left: 0;

		width: 100%;
		height: 100vh;
	}
</style>