<script lang="ts">
    import { handleKeypress, findAutocompleteMatch, isValid } from ".";
    import { createEventDispatcher } from "svelte";

    export let possible_values:Array<string> = [];
    export let placeholder:string = "Search...";

    export let value = "";

    let _value:string = "";

    let autocomplete_value:string = "";

    const dispatch = createEventDispatcher();

    function handle_keypress(e) {
        _value = handleKeypress(e, _value, autocomplete_value);
        let autocomplete = findAutocompleteMatch(possible_values, _value);
        autocomplete_value = autocomplete.substr(_value.length, autocomplete.length);

        if(isValid(_value, possible_values)) value = _value;
        else value = "";

        if(e.which == 13) dispatch("submit", { "value": value });
    }
</script>

<div class="search" tabindex="0" on:keydown={(e) => {handle_keypress(e);}}>
    <div class="text-section">
        <b class="value {_value == "" ? "placeholder" : ""}">{_value == "" ? placeholder : _value}</b>
        {#if autocomplete_value.length > 0 && _value != ""}
            <b class="autocomplete">{autocomplete_value}</b>
        {/if}
    </div>

    <div class="validation-section">
        <style>
            polyline {
                opacity: 0%;
                /*transition: 0.4s;*/
            }

            polyline.visible {
                opacity: 100%;
            }
        </style>

        <svg viewBox="0 0 50 50" style="width: 80%; height: 80%">
            <polyline class="{value != "" ? "visible" : ""}" fill="none" stroke-linecap="round" stroke="#53b547" stroke-miterlimit="10" stroke-width="6" points="7.5,27.5 22.5,38.5 42.5,11.5 "/>
            <polyline class="{value == "" ? "visible" : ""}" fill="none" stroke-linecap="round" stroke="#c74444" stroke-miterlimit="10" stroke-width="6" points="9,9 41,41 "/>
            <polyline class="{value == "" ? "visible" : ""}" fill="none" stroke-linecap="round" stroke="#c74444" stroke-miterlimit="10" stroke-width="6" points="9,41 41,9 "/>
        </svg>
    </div>
</div>

<style lang="scss">
    @import "./style.scss";
</style>