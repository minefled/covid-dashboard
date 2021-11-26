import type { GermanyData } from "./data";

export class API {

    constructor() {

    }

    getCache():Object {
        try {
            return (JSON.parse( window.localStorage.getItem("dashboard.api.cache") ) || {});
        } catch(err) {
            this.setCache({});
            return {};
        }
    }

    setCache(data:Object) {
        window.localStorage.setItem("dashboard.api.cache", JSON.stringify(data));
    }

    setCacheItem(name:string, value:any) {
        let current = this.getCache();
        current[name] = value;

        this.setCache(current);
    }

    async fetchGermany():Promise<GermanyData> {
        let data;

        if("germany" in this.getCache()) {
            data = this.getCache()["germany"];
        } else {
            data = await (await fetch("https://api.corona-zahlen.org/germany")).json();
            this.setCacheItem("germany", data);
        }

        return {
            cases: (data.cases || 0),
            deaths: (data.deaths || 0),
            recovered: (data.recovered || 0),

            cases7Days: (data.casesPerWeek || 0),
            weekIncidence: (data.weekIncidence || 0),

            deltaCases: (data.delta?.cases || 0),
            deltaDeaths: (data.delta?.deaths || 0),
            deltaRecovered: (data.delta?.recovered || 0),

            hospitalizationIncidence: (data.hospitalization?.incidence7Days),
            hospitalizationCases: (data.hospitalization?.cases7Days)
        };
    }

}