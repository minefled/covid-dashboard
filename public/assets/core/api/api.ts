import type { GermanyData, VaccinationData } from "./data";

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

    async fetchGermanyVaccinations():Promise<VaccinationData> {
        let data;
        if("germany-vaccinations" in this.getCache()) {
            data = this.getCache()["germany-vaccinations"];
        } else {
            data = await (await fetch("https://api.corona-zahlen.org/vaccinations")).json();
            this.setCacheItem("germany-vaccinations", data);
        }

        return {
            vaccinated: (data.data?.vaccinated || 0),
            secondVaccinations: (data.data?.secondVaccination?.vaccinated || 0),
            administered: (data.data?.administered || 0),

            quote: (data.data?.quote || 0),

            boosterVaccinations: (data.data?.boosterVaccination?.vaccinated || 0),

            dosesBiontech: (data.data?.vaccination?.biontech || 0),
            dosesModerna: (data.data?.vaccination?.moderna || 0),
            dosesAstraZeneca: (data.data?.vaccination?.astraZeneca || 0),
            dosesJanssen: (data.data?.vaccination?.janssen || 0),

            boosterDosesBiontech: (data.data?.boosterVaccination?.vaccination?.biontech || 0),
            boosterDosesModerna: (data.data?.boosterVaccination?.vaccination?.moderna || 0),
            boosterDosesAstraZeneca: (data.data?.boosterVaccination?.vaccination?.astraZeneca || 0),
            boosterDosesJanssen: (data.data?.boosterVaccination?.vaccination?.janssen || 0)
        }
    }

}