import { API } from "./api/api";
import type { GermanyData } from "./api/data";

export class Core {

    api:API;

    germanyData:GermanyData;

    constructor() {
        this.api = new API();
    }

    async fetchData() {
        this.germanyData = await this.api.fetchGermany();

        console.log(this.germanyData);
    }

}