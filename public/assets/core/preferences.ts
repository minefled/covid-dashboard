export type _theme = "dark" | "light";

export const default_theme:_theme = "light";

export interface Preferences {
    theme: _theme;
}

/**
 * Reads the user's preferences from localStorage
 */
export function read_preferences():Preferences {
    return {
        theme: read_theme()
    };
}

/**
 * Writes new preferences to localStorage
 */
export function write_preferences(pref:Preferences) {
    window.localStorage.setItem("dashboard.preferences.theme", pref.theme);
}

/**
 * Reads the theme from local storage
 */
export function read_theme():_theme {
    switch( window.localStorage.getItem("dashboard.preferences.theme") ) {
        case "light":
            return "light";
        
        case "dark":
            return "dark";

        default:
            return default_theme;
    }
}