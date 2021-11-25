export type Page = "home" | "germany";

export function get_page():Page {
    switch(window.location.hash) {
        case "#germany":
            return "germany";

        default:
            return "home";
    }
}