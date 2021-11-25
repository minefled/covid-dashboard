<script lang="ts">
	import Header from "./Header/Header.svelte";
	import Homepage from "./home/Homepage.svelte";
	import GermanyPage from "./Germany/GermanyPage.svelte";	
	import { Core, get_page } from "../public/assets/core";
	import { onMount } from "svelte";

	export let page = "home";
	export let theme = "light";
	export let core:Core;

	onMount(() => {
		window.addEventListener("hashchange", () => {
			page = get_page();
		})
	})
</script>

<main>
	<!-- Load theme -->
	<link rel="stylesheet" href="public/assets/themes/{theme}.css">

	<Header />

	{#if page == "home"}
		<Homepage />
	{/if}
	{#if page == "germany"}
		<GermanyPage />
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