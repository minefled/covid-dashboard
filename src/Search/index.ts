export function handleKeypress(e, currentValue, autocompleteValue) {
    if(e.keyCode != 123) { e.preventDefault(); }

    if(
        e.which == 32 ||                    // Space
        (e.which >= 65 && e.which <= 90) || // a-z
        e.which == 173 ||                   // Dash
        e.which == 59 ||                    // ö
        e.which == 219 ||                   // ü
        e.which == 222                      // ä

    ) {
        return currentValue + e.key;
    }

    // Backspace
    if(e.which == 8) {
        return currentValue.substring(0, currentValue.length-1);
    }

    // Tab
    if(e.which == 9) {
        return currentValue + autocompleteValue;
    }

    // Escape
    if(e.which == 27) {
        e.target.blur();
    }

    // Enter
    if(e.which == 13) {
        e.target.blur();
    }

    return currentValue;
}

export function findAutocompleteMatch(possible_values, enteredValue) {
    for(var v of possible_values) {
        if(v.toLowerCase().startsWith(enteredValue.toLowerCase())) {
            return v;
        }
    }

    return "";
}

export function isValid(value, possible_values) {
    let lowercase_possibilities /* Sounds like a title of some movie lol */ = possible_values.map(x => x.toLowerCase());

    return lowercase_possibilities.includes(value.toLowerCase());
}