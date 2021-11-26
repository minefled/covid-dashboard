import App from './App.svelte';

import { Core, get_page } from "./../public/assets/core/index.js";

let core = new Core();
core.fetchData();

const app = new App({
	target: document.body,
	props: {
		page: get_page(),

		core: core
	}
});

core.app = app;

export default app;