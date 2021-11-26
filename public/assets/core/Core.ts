import { API } from "./api/api";
import type { GermanyData } from "./api/data";
import { Preferences, read_preferences } from "./preferences";

export class Core {

    api:API;
    app:any;

    germanyData:GermanyData;

    userPreferences:Preferences;

    constructor() {
        this.api = new API();

        this.userPreferences = read_preferences();
    }

    get iconTheme():string {
        return (this.userPreferences.theme == "dark" ? "light" : "dark");
    }

    async fetchData() {
        this.germanyData = await this.api.fetchGermany();

        console.log(this.germanyData);
    }

}