import { API } from "./api/api";
import type { GermanyData, StateData, StatesData, StatesVaccinations, TestsData, VaccinationData } from "./api/data";
import { Preferences, read_preferences } from "./preferences";

export class Core {

    api:API;
    app:any;

    germanyData:GermanyData;
    germanyVaccinationData:VaccinationData;
    germanyTestData:TestsData;

    statesData:StatesData;
    statesVaccinations:StatesVaccinations;

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

        this.statesData = await this.api.fetchStates();
        this.statesVaccinations = await this.api.fetchStatesVaccinations();

        console.log(this.germanyData, this.germanyVaccinationData, this.statesData, this.statesVaccinations);
    }

    getStateData(id:string):StateData|null {
        for(var key in this.statesData) {
            var state:StateData = this.statesData[key];

            if(state.name.toLowerCase() == id.toLowerCase() || state.abbreviation.toLowerCase() == id.toLowerCase()) {
                return state;
            }
        }

        return null;
    }

    getStateVaccinationsData(name:string):VaccinationData|null {
        for(var key in this.statesVaccinations) {
            var state:VaccinationData = this.statesVaccinations[key];

            if(state.stateName.toLowerCase() == name.toLowerCase()) {
                return state;
            }
        }

        return null;
    }

}