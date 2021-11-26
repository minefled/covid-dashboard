export type Page = "home" | "world" | "germany" | "states" | "districts";

export function get_page():Page {
    switch(window.location.hash) {
        case "#world":
            return "world";

        case "#germany":
            return "germany";

        case "#states":
            return "states";

        case "#districts":
            return "districts";

        default:
            return "home";
    }
}