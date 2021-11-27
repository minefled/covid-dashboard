import { API } from "./api/api";
import type { GermanyData, TestsData, VaccinationData } from "./api/data";
import { Preferences, read_preferences } from "./preferences";

export class Core {

    api:API;
    app:any;

    germanyData:GermanyData;
    germanyVaccinationData:VaccinationData;
    germanyTestData:TestsData;

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
        this.germanyVaccinationData = await this.api.fetchGermanyVaccinations();
        this.germanyTestData = await this.api.fetchTestData();

        console.log(this.germanyData, this.germanyVaccinationData);
    }

}