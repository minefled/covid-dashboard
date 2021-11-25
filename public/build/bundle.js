
(function(l, r) { if (!l || l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (self.location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.getElementsByTagName('head')[0].appendChild(r) })(self.document);
var app = (function () {
    'use strict';

    function noop() { }
    function add_location(element, file, line, column, char) {
        element.__svelte_meta = {
            loc: { file, line, column, char }
        };
    }
    function run(fn) {
        return fn();
    }
    function blank_object() {
        return Object.create(null);
    }
    function run_all(fns) {
        fns.forEach(run);
    }
    function is_function(thing) {
        return typeof thing === 'function';
    }
    function safe_not_equal(a, b) {
        return a != a ? b == b : a !== b || ((a && typeof a === 'object') || typeof a === 'function');
    }
    let src_url_equal_anchor;
    function src_url_equal(element_src, url) {
        if (!src_url_equal_anchor) {
            src_url_equal_anchor = document.createElement('a');
        }
        src_url_equal_anchor.href = url;
        return element_src === src_url_equal_anchor.href;
    }
    function is_empty(obj) {
        return Object.keys(obj).length === 0;
    }
    function append(target, node) {
        target.appendChild(node);
    }
    function insert(target, node, anchor) {
        target.insertBefore(node, anchor || null);
    }
    function detach(node) {
        node.parentNode.removeChild(node);
    }
    function element(name) {
        return document.createElement(name);
    }
    function text(data) {
        return document.createTextNode(data);
    }
    function space() {
        return text(' ');
    }
    function listen(node, event, handler, options) {
        node.addEventListener(event, handler, options);
        return () => node.removeEventListener(event, handler, options);
    }
    function attr(node, attribute, value) {
        if (value == null)
            node.removeAttribute(attribute);
        else if (node.getAttribute(attribute) !== value)
            node.setAttribute(attribute, value);
    }
    function children(element) {
        return Array.from(element.childNodes);
    }
    function custom_event(type, detail, bubbles = false) {
        const e = document.createEvent('CustomEvent');
        e.initCustomEvent(type, bubbles, false, detail);
        return e;
    }

    let current_component;
    function set_current_component(component) {
        current_component = component;
    }
    function get_current_component() {
        if (!current_component)
            throw new Error('Function called outside component initialization');
        return current_component;
    }
    function onMount(fn) {
        get_current_component().$$.on_mount.push(fn);
    }

    const dirty_components = [];
    const binding_callbacks = [];
    const render_callbacks = [];
    const flush_callbacks = [];
    const resolved_promise = Promise.resolve();
    let update_scheduled = false;
    function schedule_update() {
        if (!update_scheduled) {
            update_scheduled = true;
            resolved_promise.then(flush);
        }
    }
    function add_render_callback(fn) {
        render_callbacks.push(fn);
    }
    let flushing = false;
    const seen_callbacks = new Set();
    function flush() {
        if (flushing)
            return;
        flushing = true;
        do {
            // first, call beforeUpdate functions
            // and update components
            for (let i = 0; i < dirty_components.length; i += 1) {
                const component = dirty_components[i];
                set_current_component(component);
                update(component.$$);
            }
            set_current_component(null);
            dirty_components.length = 0;
            while (binding_callbacks.length)
                binding_callbacks.pop()();
            // then, once components are updated, call
            // afterUpdate functions. This may cause
            // subsequent updates...
            for (let i = 0; i < render_callbacks.length; i += 1) {
                const callback = render_callbacks[i];
                if (!seen_callbacks.has(callback)) {
                    // ...so guard against infinite loops
                    seen_callbacks.add(callback);
                    callback();
                }
            }
            render_callbacks.length = 0;
        } while (dirty_components.length);
        while (flush_callbacks.length) {
            flush_callbacks.pop()();
        }
        update_scheduled = false;
        flushing = false;
        seen_callbacks.clear();
    }
    function update($$) {
        if ($$.fragment !== null) {
            $$.update();
            run_all($$.before_update);
            const dirty = $$.dirty;
            $$.dirty = [-1];
            $$.fragment && $$.fragment.p($$.ctx, dirty);
            $$.after_update.forEach(add_render_callback);
        }
    }
    const outroing = new Set();
    let outros;
    function group_outros() {
        outros = {
            r: 0,
            c: [],
            p: outros // parent group
        };
    }
    function check_outros() {
        if (!outros.r) {
            run_all(outros.c);
        }
        outros = outros.p;
    }
    function transition_in(block, local) {
        if (block && block.i) {
            outroing.delete(block);
            block.i(local);
        }
    }
    function transition_out(block, local, detach, callback) {
        if (block && block.o) {
            if (outroing.has(block))
                return;
            outroing.add(block);
            outros.c.push(() => {
                outroing.delete(block);
                if (callback) {
                    if (detach)
                        block.d(1);
                    callback();
                }
            });
            block.o(local);
        }
    }
    function create_component(block) {
        block && block.c();
    }
    function mount_component(component, target, anchor, customElement) {
        const { fragment, on_mount, on_destroy, after_update } = component.$$;
        fragment && fragment.m(target, anchor);
        if (!customElement) {
            // onMount happens before the initial afterUpdate
            add_render_callback(() => {
                const new_on_destroy = on_mount.map(run).filter(is_function);
                if (on_destroy) {
                    on_destroy.push(...new_on_destroy);
                }
                else {
                    // Edge case - component was destroyed immediately,
                    // most likely as a result of a binding initialising
                    run_all(new_on_destroy);
                }
                component.$$.on_mount = [];
            });
        }
        after_update.forEach(add_render_callback);
    }
    function destroy_component(component, detaching) {
        const $$ = component.$$;
        if ($$.fragment !== null) {
            run_all($$.on_destroy);
            $$.fragment && $$.fragment.d(detaching);
            // TODO null out other refs, including component.$$ (but need to
            // preserve final state?)
            $$.on_destroy = $$.fragment = null;
            $$.ctx = [];
        }
    }
    function make_dirty(component, i) {
        if (component.$$.dirty[0] === -1) {
            dirty_components.push(component);
            schedule_update();
            component.$$.dirty.fill(0);
        }
        component.$$.dirty[(i / 31) | 0] |= (1 << (i % 31));
    }
    function init(component, options, instance, create_fragment, not_equal, props, append_styles, dirty = [-1]) {
        const parent_component = current_component;
        set_current_component(component);
        const $$ = component.$$ = {
            fragment: null,
            ctx: null,
            // state
            props,
            update: noop,
            not_equal,
            bound: blank_object(),
            // lifecycle
            on_mount: [],
            on_destroy: [],
            on_disconnect: [],
            before_update: [],
            after_update: [],
            context: new Map(options.context || (parent_component ? parent_component.$$.context : [])),
            // everything else
            callbacks: blank_object(),
            dirty,
            skip_bound: false,
            root: options.target || parent_component.$$.root
        };
        append_styles && append_styles($$.root);
        let ready = false;
        $$.ctx = instance
            ? instance(component, options.props || {}, (i, ret, ...rest) => {
                const value = rest.length ? rest[0] : ret;
                if ($$.ctx && not_equal($$.ctx[i], $$.ctx[i] = value)) {
                    if (!$$.skip_bound && $$.bound[i])
                        $$.bound[i](value);
                    if (ready)
                        make_dirty(component, i);
                }
                return ret;
            })
            : [];
        $$.update();
        ready = true;
        run_all($$.before_update);
        // `false` as a special case of no DOM component
        $$.fragment = create_fragment ? create_fragment($$.ctx) : false;
        if (options.target) {
            if (options.hydrate) {
                const nodes = children(options.target);
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                $$.fragment && $$.fragment.l(nodes);
                nodes.forEach(detach);
            }
            else {
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                $$.fragment && $$.fragment.c();
            }
            if (options.intro)
                transition_in(component.$$.fragment);
            mount_component(component, options.target, options.anchor, options.customElement);
            flush();
        }
        set_current_component(parent_component);
    }
    /**
     * Base class for Svelte components. Used when dev=false.
     */
    class SvelteComponent {
        $destroy() {
            destroy_component(this, 1);
            this.$destroy = noop;
        }
        $on(type, callback) {
            const callbacks = (this.$$.callbacks[type] || (this.$$.callbacks[type] = []));
            callbacks.push(callback);
            return () => {
                const index = callbacks.indexOf(callback);
                if (index !== -1)
                    callbacks.splice(index, 1);
            };
        }
        $set($$props) {
            if (this.$$set && !is_empty($$props)) {
                this.$$.skip_bound = true;
                this.$$set($$props);
                this.$$.skip_bound = false;
            }
        }
    }

    function dispatch_dev(type, detail) {
        document.dispatchEvent(custom_event(type, Object.assign({ version: '3.44.2' }, detail), true));
    }
    function append_dev(target, node) {
        dispatch_dev('SvelteDOMInsert', { target, node });
        append(target, node);
    }
    function insert_dev(target, node, anchor) {
        dispatch_dev('SvelteDOMInsert', { target, node, anchor });
        insert(target, node, anchor);
    }
    function detach_dev(node) {
        dispatch_dev('SvelteDOMRemove', { node });
        detach(node);
    }
    function listen_dev(node, event, handler, options, has_prevent_default, has_stop_propagation) {
        const modifiers = options === true ? ['capture'] : options ? Array.from(Object.keys(options)) : [];
        if (has_prevent_default)
            modifiers.push('preventDefault');
        if (has_stop_propagation)
            modifiers.push('stopPropagation');
        dispatch_dev('SvelteDOMAddEventListener', { node, event, handler, modifiers });
        const dispose = listen(node, event, handler, options);
        return () => {
            dispatch_dev('SvelteDOMRemoveEventListener', { node, event, handler, modifiers });
            dispose();
        };
    }
    function attr_dev(node, attribute, value) {
        attr(node, attribute, value);
        if (value == null)
            dispatch_dev('SvelteDOMRemoveAttribute', { node, attribute });
        else
            dispatch_dev('SvelteDOMSetAttribute', { node, attribute, value });
    }
    function validate_slots(name, slot, keys) {
        for (const slot_key of Object.keys(slot)) {
            if (!~keys.indexOf(slot_key)) {
                console.warn(`<${name}> received an unexpected slot "${slot_key}".`);
            }
        }
    }
    /**
     * Base class for Svelte components with some minor dev-enhancements. Used when dev=true.
     */
    class SvelteComponentDev extends SvelteComponent {
        constructor(options) {
            if (!options || (!options.target && !options.$$inline)) {
                throw new Error("'target' is a required option");
            }
            super();
        }
        $destroy() {
            super.$destroy();
            this.$destroy = () => {
                console.warn('Component was already destroyed'); // eslint-disable-line no-console
            };
        }
        $capture_state() { }
        $inject_state() { }
    }

    /* src/Header/Header.svelte generated by Svelte v3.44.2 */

    const file$3 = "src/Header/Header.svelte";

    function create_fragment$3(ctx) {
    	let div1;
    	let div0;
    	let img;
    	let img_src_value;
    	let t0;
    	let b;

    	const block = {
    		c: function create() {
    			div1 = element("div");
    			div0 = element("div");
    			img = element("img");
    			t0 = space();
    			b = element("b");
    			b.textContent = "Covid Dashboard DE";
    			attr_dev(img, "class", "icon svelte-kucbqa");
    			attr_dev(img, "alt", "[Icon]");
    			if (!src_url_equal(img.src, img_src_value = "/favicon.png")) attr_dev(img, "src", img_src_value);
    			add_location(img, file$3, 6, 8, 104);
    			attr_dev(b, "class", "title svelte-kucbqa");
    			add_location(b, file$3, 7, 8, 163);
    			attr_dev(div0, "class", "icon-block svelte-kucbqa");
    			add_location(div0, file$3, 5, 4, 71);
    			attr_dev(div1, "class", "header svelte-kucbqa");
    			add_location(div1, file$3, 4, 0, 46);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div1, anchor);
    			append_dev(div1, div0);
    			append_dev(div0, img);
    			append_dev(div0, t0);
    			append_dev(div0, b);
    		},
    		p: noop,
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div1);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$3.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$3($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Header', slots, []);
    	let { page = "" } = $$props;
    	const writable_props = ['page'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Header> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ('page' in $$props) $$invalidate(0, page = $$props.page);
    	};

    	$$self.$capture_state = () => ({ page });

    	$$self.$inject_state = $$props => {
    		if ('page' in $$props) $$invalidate(0, page = $$props.page);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [page];
    }

    class Header extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$3, create_fragment$3, safe_not_equal, { page: 0 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Header",
    			options,
    			id: create_fragment$3.name
    		});
    	}

    	get page() {
    		throw new Error("<Header>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set page(value) {
    		throw new Error("<Header>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src/home/Homepage.svelte generated by Svelte v3.44.2 */

    const file$2 = "src/home/Homepage.svelte";

    function create_fragment$2(ctx) {
    	let div12;
    	let div0;
    	let b0;
    	let t1;
    	let div11;
    	let div1;
    	let b1;
    	let t3;
    	let div10;
    	let div3;
    	let div2;
    	let b2;
    	let t5;
    	let div5;
    	let div4;
    	let b3;
    	let t7;
    	let div7;
    	let div6;
    	let b4;
    	let t9;
    	let div9;
    	let div8;
    	let b5;
    	let mounted;
    	let dispose;

    	const block = {
    		c: function create() {
    			div12 = element("div");
    			div0 = element("div");
    			b0 = element("b");
    			b0.textContent = "Die aktuellen Covid-19 Zahlen und Statistiken aus Deutschland";
    			t1 = space();
    			div11 = element("div");
    			div1 = element("div");
    			b1 = element("b");
    			b1.textContent = "Navigator";
    			t3 = space();
    			div10 = element("div");
    			div3 = element("div");
    			div2 = element("div");
    			b2 = element("b");
    			b2.textContent = "Welt";
    			t5 = space();
    			div5 = element("div");
    			div4 = element("div");
    			b3 = element("b");
    			b3.textContent = "Deutschland";
    			t7 = space();
    			div7 = element("div");
    			div6 = element("div");
    			b4 = element("b");
    			b4.textContent = "Bundesländer";
    			t9 = space();
    			div9 = element("div");
    			div8 = element("div");
    			b5 = element("b");
    			b5.textContent = "Landkreise";
    			attr_dev(b0, "class", "info-message svelte-12dosto");
    			add_location(b0, file$2, 5, 8, 85);
    			attr_dev(div0, "class", "landing-banner svelte-12dosto");
    			add_location(div0, file$2, 4, 4, 48);
    			attr_dev(b1, "class", "title svelte-12dosto");
    			add_location(b1, file$2, 10, 12, 262);
    			attr_dev(div1, "class", "header svelte-12dosto");
    			add_location(div1, file$2, 9, 8, 229);
    			attr_dev(b2, "class", "item-name svelte-12dosto");
    			add_location(b2, file$2, 16, 20, 485);
    			attr_dev(div2, "class", "item-box svelte-12dosto");
    			add_location(div2, file$2, 15, 16, 442);
    			attr_dev(div3, "class", "item svelte-12dosto");
    			add_location(div3, file$2, 14, 12, 353);
    			attr_dev(b3, "class", "item-name svelte-12dosto");
    			add_location(b3, file$2, 22, 20, 704);
    			attr_dev(div4, "class", "item-box svelte-12dosto");
    			add_location(div4, file$2, 21, 16, 661);
    			attr_dev(div5, "class", "item svelte-12dosto");
    			add_location(div5, file$2, 20, 12, 570);
    			attr_dev(b4, "class", "item-name svelte-12dosto");
    			add_location(b4, file$2, 28, 20, 929);
    			attr_dev(div6, "class", "item-box svelte-12dosto");
    			add_location(div6, file$2, 27, 16, 886);
    			attr_dev(div7, "class", "item svelte-12dosto");
    			add_location(div7, file$2, 26, 12, 796);
    			attr_dev(b5, "class", "item-name svelte-12dosto");
    			add_location(b5, file$2, 34, 20, 1158);
    			attr_dev(div8, "class", "item-box svelte-12dosto");
    			add_location(div8, file$2, 33, 16, 1115);
    			attr_dev(div9, "class", "item svelte-12dosto");
    			add_location(div9, file$2, 32, 12, 1022);
    			attr_dev(div10, "class", "item-list svelte-12dosto");
    			add_location(div10, file$2, 13, 8, 317);
    			attr_dev(div11, "class", "quick-navigator svelte-12dosto");
    			add_location(div11, file$2, 8, 4, 191);
    			attr_dev(div12, "class", "home-page svelte-12dosto");
    			add_location(div12, file$2, 3, 0, 20);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div12, anchor);
    			append_dev(div12, div0);
    			append_dev(div0, b0);
    			append_dev(div12, t1);
    			append_dev(div12, div11);
    			append_dev(div11, div1);
    			append_dev(div1, b1);
    			append_dev(div11, t3);
    			append_dev(div11, div10);
    			append_dev(div10, div3);
    			append_dev(div3, div2);
    			append_dev(div2, b2);
    			append_dev(div10, t5);
    			append_dev(div10, div5);
    			append_dev(div5, div4);
    			append_dev(div4, b3);
    			append_dev(div10, t7);
    			append_dev(div10, div7);
    			append_dev(div7, div6);
    			append_dev(div6, b4);
    			append_dev(div10, t9);
    			append_dev(div10, div9);
    			append_dev(div9, div8);
    			append_dev(div8, b5);

    			if (!mounted) {
    				dispose = [
    					listen_dev(div3, "click", /*click_handler*/ ctx[0], false, false, false),
    					listen_dev(div5, "click", /*click_handler_1*/ ctx[1], false, false, false),
    					listen_dev(div7, "click", /*click_handler_2*/ ctx[2], false, false, false),
    					listen_dev(div9, "click", /*click_handler_3*/ ctx[3], false, false, false)
    				];

    				mounted = true;
    			}
    		},
    		p: noop,
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div12);
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$2.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$2($$self, $$props) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Homepage', slots, []);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Homepage> was created with unknown prop '${key}'`);
    	});

    	const click_handler = () => {
    		window.location.href = "#world";
    	};

    	const click_handler_1 = () => {
    		window.location.href = "#germany";
    	};

    	const click_handler_2 = () => {
    		window.location.href = "#states";
    	};

    	const click_handler_3 = () => {
    		window.location.href = "#districts";
    	};

    	return [click_handler, click_handler_1, click_handler_2, click_handler_3];
    }

    class Homepage extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$2, create_fragment$2, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Homepage",
    			options,
    			id: create_fragment$2.name
    		});
    	}
    }

    /* src/Germany/GermanyPage.svelte generated by Svelte v3.44.2 */

    const file$1 = "src/Germany/GermanyPage.svelte";

    function create_fragment$1(ctx) {
    	let div;

    	const block = {
    		c: function create() {
    			div = element("div");
    			attr_dev(div, "class", "germany-page svelte-16vkzji");
    			add_location(div, file$1, 2, 0, 29);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    		},
    		p: noop,
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$1.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$1($$self, $$props) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('GermanyPage', slots, []);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<GermanyPage> was created with unknown prop '${key}'`);
    	});

    	return [];
    }

    class GermanyPage extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$1, create_fragment$1, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "GermanyPage",
    			options,
    			id: create_fragment$1.name
    		});
    	}
    }

    class API {
        constructor() {
        }
        getCache() {
            try {
                return (JSON.parse(window.localStorage.getItem("dashboard.api.cache")) || {});
            }
            catch (err) {
                this.setCache({});
                return {};
            }
        }
        setCache(data) {
            window.localStorage.setItem("dashboard.api.cache", JSON.stringify(data));
        }
        setCacheItem(name, value) {
            let current = this.getCache();
            current[name] = value;
            this.setCache(current);
        }
        async fetchGermany() {
            var _a, _b, _c, _d, _e;
            let data;
            if ("germany" in this.getCache()) {
                data = this.getCache()["germany"];
            }
            else {
                data = await (await fetch("https://api.corona-zahlen.org/germany")).json();
                this.setCacheItem("germany", data);
            }
            return {
                cases: (data.cases || 0),
                deaths: (data.deaths || 0),
                recovered: (data.recovered || 0),
                weekIncidence: (data.weekIncidence || 0),
                deltaCases: (((_a = data.delta) === null || _a === void 0 ? void 0 : _a.cases) || 0),
                deltaDeaths: (((_b = data.delta) === null || _b === void 0 ? void 0 : _b.deaths) || 0),
                deltaRecovered: (((_c = data.delta) === null || _c === void 0 ? void 0 : _c.recovered) || 0),
                hospitalizationIncidence: ((_d = data.hospitalization) === null || _d === void 0 ? void 0 : _d.incidence7Days),
                hospitalizationCases: ((_e = data.hospitalization) === null || _e === void 0 ? void 0 : _e.cases7Days)
            };
        }
    }

    class Core {
        constructor() {
            this.api = new API();
        }
        async fetchData() {
            this.germanyData = await this.api.fetchGermany();
            console.log(this.germanyData);
        }
    }

    const default_theme = "light";
    /**
     * Reads the user's preferences from localStorage
     */
    function read_preferences() {
        return {
            theme: read_theme()
        };
    }
    /**
     * Reads the theme from local storage
     */
    function read_theme() {
        switch (window.localStorage.getItem("dashboard.preferences.theme")) {
            case "light":
                return "light";
            case "dark":
                return "dark";
            default:
                return default_theme;
        }
    }

    function get_page() {
        switch (window.location.hash) {
            case "#germany":
                return "germany";
            default:
                return "home";
        }
    }

    /* src/App.svelte generated by Svelte v3.44.2 */
    const file = "src/App.svelte";

    // (22:1) {#if page == "home"}
    function create_if_block_1(ctx) {
    	let homepage;
    	let current;
    	homepage = new Homepage({ $$inline: true });

    	const block = {
    		c: function create() {
    			create_component(homepage.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(homepage, target, anchor);
    			current = true;
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(homepage.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(homepage.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(homepage, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_1.name,
    		type: "if",
    		source: "(22:1) {#if page == \\\"home\\\"}",
    		ctx
    	});

    	return block;
    }

    // (25:1) {#if page == "germany"}
    function create_if_block(ctx) {
    	let germanypage;
    	let current;
    	germanypage = new GermanyPage({ $$inline: true });

    	const block = {
    		c: function create() {
    			create_component(germanypage.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(germanypage, target, anchor);
    			current = true;
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(germanypage.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(germanypage.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(germanypage, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block.name,
    		type: "if",
    		source: "(25:1) {#if page == \\\"germany\\\"}",
    		ctx
    	});

    	return block;
    }

    function create_fragment(ctx) {
    	let main;
    	let link;
    	let link_href_value;
    	let t0;
    	let header;
    	let t1;
    	let t2;
    	let current;
    	header = new Header({ $$inline: true });
    	let if_block0 = /*page*/ ctx[0] == "home" && create_if_block_1(ctx);
    	let if_block1 = /*page*/ ctx[0] == "germany" && create_if_block(ctx);

    	const block = {
    		c: function create() {
    			main = element("main");
    			link = element("link");
    			t0 = space();
    			create_component(header.$$.fragment);
    			t1 = space();
    			if (if_block0) if_block0.c();
    			t2 = space();
    			if (if_block1) if_block1.c();
    			attr_dev(link, "rel", "stylesheet");
    			attr_dev(link, "href", link_href_value = "/assets/themes/" + /*theme*/ ctx[1] + ".css");
    			add_location(link, file, 17, 1, 466);
    			attr_dev(main, "class", "svelte-ifx5fi");
    			add_location(main, file, 15, 0, 437);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, main, anchor);
    			append_dev(main, link);
    			append_dev(main, t0);
    			mount_component(header, main, null);
    			append_dev(main, t1);
    			if (if_block0) if_block0.m(main, null);
    			append_dev(main, t2);
    			if (if_block1) if_block1.m(main, null);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			if (!current || dirty & /*theme*/ 2 && link_href_value !== (link_href_value = "/assets/themes/" + /*theme*/ ctx[1] + ".css")) {
    				attr_dev(link, "href", link_href_value);
    			}

    			if (/*page*/ ctx[0] == "home") {
    				if (if_block0) {
    					if (dirty & /*page*/ 1) {
    						transition_in(if_block0, 1);
    					}
    				} else {
    					if_block0 = create_if_block_1(ctx);
    					if_block0.c();
    					transition_in(if_block0, 1);
    					if_block0.m(main, t2);
    				}
    			} else if (if_block0) {
    				group_outros();

    				transition_out(if_block0, 1, 1, () => {
    					if_block0 = null;
    				});

    				check_outros();
    			}

    			if (/*page*/ ctx[0] == "germany") {
    				if (if_block1) {
    					if (dirty & /*page*/ 1) {
    						transition_in(if_block1, 1);
    					}
    				} else {
    					if_block1 = create_if_block(ctx);
    					if_block1.c();
    					transition_in(if_block1, 1);
    					if_block1.m(main, null);
    				}
    			} else if (if_block1) {
    				group_outros();

    				transition_out(if_block1, 1, 1, () => {
    					if_block1 = null;
    				});

    				check_outros();
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(header.$$.fragment, local);
    			transition_in(if_block0);
    			transition_in(if_block1);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(header.$$.fragment, local);
    			transition_out(if_block0);
    			transition_out(if_block1);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(main);
    			destroy_component(header);
    			if (if_block0) if_block0.d();
    			if (if_block1) if_block1.d();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('App', slots, []);
    	let { page = "home" } = $$props;
    	let { theme = "light" } = $$props;
    	let { core } = $$props;

    	onMount(() => {
    		window.addEventListener("hashchange", () => {
    			$$invalidate(0, page = get_page());
    		});
    	});

    	const writable_props = ['page', 'theme', 'core'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<App> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ('page' in $$props) $$invalidate(0, page = $$props.page);
    		if ('theme' in $$props) $$invalidate(1, theme = $$props.theme);
    		if ('core' in $$props) $$invalidate(2, core = $$props.core);
    	};

    	$$self.$capture_state = () => ({
    		Header,
    		Homepage,
    		GermanyPage,
    		get_page,
    		onMount,
    		page,
    		theme,
    		core
    	});

    	$$self.$inject_state = $$props => {
    		if ('page' in $$props) $$invalidate(0, page = $$props.page);
    		if ('theme' in $$props) $$invalidate(1, theme = $$props.theme);
    		if ('core' in $$props) $$invalidate(2, core = $$props.core);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [page, theme, core];
    }

    class App extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance, create_fragment, safe_not_equal, { page: 0, theme: 1, core: 2 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "App",
    			options,
    			id: create_fragment.name
    		});

    		const { ctx } = this.$$;
    		const props = options.props || {};

    		if (/*core*/ ctx[2] === undefined && !('core' in props)) {
    			console.warn("<App> was created without expected prop 'core'");
    		}
    	}

    	get page() {
    		throw new Error("<App>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set page(value) {
    		throw new Error("<App>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get theme() {
    		throw new Error("<App>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set theme(value) {
    		throw new Error("<App>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get core() {
    		throw new Error("<App>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set core(value) {
    		throw new Error("<App>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

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

    return app;

})();
//# sourceMappingURL=bundle.js.map
