import App from './App.svelte';

import { Core, read_preferences, get_page } from "./../public/assets/core/index.js";
let preferences = read_preferences();

let core = new Core();
core.fetchData();

const app = new App({
	target: document.body,
	props: {
		theme: preferences.theme,
		page: get_page(),

		core: core
	}
});

export default app;