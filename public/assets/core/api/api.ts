import type { GermanyData, StateData, StatesData, StatesVaccinations, TestsData, VaccinationData } from "./data";

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

            hospitalizationIncidence: (data.hospitalization?.incidence7Days || 0),
            hospitalizationCases: (data.hospitalization?.cases7Days || 0)
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

        return this.getVaccinationData(data.data || {});
    }

    async fetchTestData():Promise<TestsData> {
        let data;
        if("germany-tests" in this.getCache()) {
            data = this.getCache()["germany-tests"];
        } else {
            data = await (await fetch("https://api.corona-zahlen.org/testing/history/")).json();
            this.setCacheItem("germany-tests", data);
        }

        let newest = ((data.data?.history || []).reverse()[0] || {});

        return {
            calendarWeek: (newest.calendarWeek || ""),

            performedTest: (newest.performedTests || 0),
            positiveTests: (newest.positiveTests || 0),

            laboratoryCount: (newest.laboratoryCount || 0)
        };
    }

    async fetchStates():Promise<StatesData> {
        let data;
        if("states" in this.getCache()) {
            data = this.getCache()["states"];
        } else {
            data = await (await fetch("https://api.corona-zahlen.org/states")).json();
            this.setCacheItem("states", data);
        }

        return {
            BB: this.getStateData(data.data?.BB || {}),
            BE: this.getStateData(data.data?.BE || {}),
            BW: this.getStateData(data.data?.BW || {}),
            BY: this.getStateData(data.data?.BY || {}),
            HB: this.getStateData(data.data?.HB || {}),
            HE: this.getStateData(data.data?.HE || {}),
            HH: this.getStateData(data.data?.HH || {}),
            MV: this.getStateData(data.data?.MV || {}),
            NI: this.getStateData(data.data?.NI || {}),
            NW: this.getStateData(data.data?.NW || {}),
            RP: this.getStateData(data.data?.RP || {}),
            SH: this.getStateData(data.data?.SH || {}),
            SL: this.getStateData(data.data?.SL || {}),
            SN: this.getStateData(data.data?.SN || {}),
            ST: this.getStateData(data.data?.ST || {}),
            TH: this.getStateData(data.data?.TH || {})
        };
    }

    async fetchStatesVaccinations():Promise<StatesVaccinations> {
        let data;
        if("germany-vaccinations" in this.getCache()) {
            data = this.getCache()["germany-vaccinations"];
        } else {
            data = await (await fetch("https://api.corona-zahlen.org/vaccinations")).json();
            this.setCacheItem("germany-vaccinations", data);
        }

        return {
            BB: this.getVaccinationData(data.data?.states?.BB || {}),
            BE: this.getVaccinationData(data.data?.states?.BE || {}),
            BW: this.getVaccinationData(data.data?.states?.BW || {}),
            BY: this.getVaccinationData(data.data?.states?.BY || {}),
            HB: this.getVaccinationData(data.data?.states?.HB || {}),
            HE: this.getVaccinationData(data.data?.states?.HE || {}),
            HH: this.getVaccinationData(data.data?.states?.HH || {}),
            MV: this.getVaccinationData(data.data?.states?.MV || {}),
            NI: this.getVaccinationData(data.data?.states?.NI || {}),
            NW: this.getVaccinationData(data.data?.states?.NW || {}),
            RP: this.getVaccinationData(data.data?.states?.RP || {}),
            SH: this.getVaccinationData(data.data?.states?.SH || {}),
            SL: this.getVaccinationData(data.data?.states?.SL || {}),
            SN: this.getVaccinationData(data.data?.states?.SN || {}),
            ST: this.getVaccinationData(data.data?.states?.ST || {}),
            TH: this.getVaccinationData(data.data?.states?.TH || {})
        };
    }

    getVaccinationData(data):VaccinationData {
        return {
            stateName: (data.name || ""),

            vaccinated: (data.vaccinated || 0),
            secondVaccinations: (data.secondVaccination?.vaccinated || 0),
            administered: (data.administered || 0),

            quote: (data.quote || 0),
            secondVaccinationQuote: (data.secondVaccination?.quote || 0),

            boosterVaccinations: (data.boosterVaccination?.vaccinated || 0),
            boosterVaccinationQuote: (data.boosterVaccination?.quote || 0),

            dosesBiontech: (data.vaccination?.biontech || 0),
            dosesModerna: (data.vaccination?.moderna || 0),
            dosesAstraZeneca: (data.vaccination?.astraZeneca || 0),
            dosesJanssen: (data.vaccination?.janssen || 0),

            boosterDosesBiontech: (data.boosterVaccination?.vaccination?.biontech || 0),
            boosterDosesModerna: (data.boosterVaccination?.vaccination?.moderna || 0),
            boosterDosesAstraZeneca: (data.boosterVaccination?.vaccination?.astraZeneca || 0),
            boosterDosesJanssen: (data.boosterVaccination?.vaccination?.janssen || 0)
        }
    }

    getStateData(data):StateData {
        return {
            name: (data.name || ""),
            abbreviation: (data.abbreviation || ""),
            population: (data.population || 0),

            cases: (data.cases || 0),
            deaths: (data.deaths || 0),
            recovered: (data.recovered || 0),

            deltaCases: (data.delta?.cases || 0),
            deltaDeaths: (data.delta?.deaths || 0),
            deltaRecovered: (data.delta?.recovered || 0),

            cases7Days: (data.casesPerWeek || 0),
            weekIncidence: (data.weekIncidence || 0),

            hospitalizationCases: (data.hospitalization?.cases7Days || 0),
            hospitalizationIncidence: (data.hospitalization?.incidence7Days || 0)
        }
    }

}