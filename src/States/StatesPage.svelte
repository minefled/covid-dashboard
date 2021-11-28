<script lang="ts">
    import { onMount } from "svelte";
    import Search from "../Search/Search.svelte";
    import SimpleField from "../DashboardFields/SimpleField.svelte";
    import DosesDistribution from "../DashboardFields/DosesDistribution.svelte";

    import { Core, dashboard } from "../../public/assets/core";
    import type { StateData, TestsData, VaccinationData } from "../../public/assets/core/api/data";

    import { all } from "./index";

    export let selectedState:string = "";
    export let data:StateData = { name: "", abbreviation: "", population: 0, cases: 0, deaths: 0, recovered: 0, deltaCases: 0, deltaDeaths: 0, deltaRecovered: 0, weekIncidence:0, cases7Days: 0, hospitalizationCases: 0, hospitalizationIncidence: 0 };
    export let vaccinations:VaccinationData = { vaccinated: 0, secondVaccinations: 0, boosterVaccinations: 0, administered: 0, quote: 0, secondVaccinationQuote: 0, boosterVaccinationQuote: 0, dosesBiontech: 0, dosesModerna: 0, dosesAstraZeneca: 0, dosesJanssen: 0, boosterDosesBiontech: 0, boosterDosesModerna: 0, boosterDosesAstraZeneca: 0, boosterDosesJanssen: 0};
    export let tests:TestsData = { calendarWeek: "", performedTest: 0, positiveTests: 0, laboratoryCount: 0 };

    export let core:Core;

    onMount(async () => {
    });

    function onSearchSubmit(value:string) {
        console.log(value);

        selectedState = value;
        selectState(value);
    }

    function selectState(id:string) {
        data = core.getStateData(id);
        vaccinations = core.getStateVaccinationsData(data.name);
    }
</script>

<div class="states-page">
    <div class="search-bar">
        <Search possible_values={all} placeholder="Bundesland suchen..." on:submit={(e) => { onSearchSubmit(e.detail?.value || "") }}/>
    </div>

    <div class="categories">
        <div class="category">
            <b class="category-name">Fälle</b>
            <span class="title-underline"></span>

            <div class="item-container size-6">
                <SimpleField 
                    name="7-Tage-Inzidenz"
                    icon_src="public/assets/icons/{core.iconTheme}/7-day-incidence.svg"
                    value={data.weekIncidence} 
                    color={dashboard.calculateIncidenceColor(data.weekIncidence)}
                    hideValue={selectedState == ""}
                />

                <SimpleField 
                    name="Fälle 7 Tage"
                    icon_src="public/assets/icons/{core.iconTheme}/covid.png"
                    value={data.cases7Days} 
                    color={dashboard.calculateWeekCasesColor(data.cases7Days)}
                    hideValue={selectedState == ""}
                />

                <SimpleField 
                    name="Hospitalisierungs-Inzidenz"
                    icon_src="public/assets/icons/{core.iconTheme}/hospitalization.png"
                    value={data.hospitalizationIncidence} 
                    color={dashboard.calculateHospitalizationColor(data.hospitalizationIncidence)}
                    hideValue={selectedState == ""}
                />

                <SimpleField name="Fälle Gesamt" icon_src="public/assets/icons/{core.iconTheme}/covid.png" value={data.cases} delta={data.deltaCases} hideValue={selectedState == ""}/>
                <SimpleField name="Tode Gesamt" icon_src="public/assets/icons/{core.iconTheme}/death.png" value={data.deaths} delta={data.deltaDeaths} hideValue={selectedState == ""}/>
                <SimpleField name="Genesene Gesamt" icon_src="public/assets/icons/{core.iconTheme}/recovered.png" value={data.recovered} delta={data.deltaRecovered} hideValue={selectedState == ""}/>
            </div>
        </div>

        <div class="category">
            <b class="category-name">Impfungen</b>
            <span class="title-underline"></span>

            <div class="item-container size-5">
                <SimpleField name="Erstimpfung" icon_src="public/assets/icons/{core.iconTheme}/vaccination.png" value={vaccinations.vaccinated} hideValue={selectedState == ""}/>
                <SimpleField name="Zweitimpfung" icon_src="public/assets/icons/{core.iconTheme}/vaccination.png" value={vaccinations.secondVaccinations} hideValue={selectedState == ""}/>
                <SimpleField name="Boosterimpfung" icon_src="public/assets/icons/{core.iconTheme}/booster.png" value={vaccinations.boosterVaccinations} hideValue={selectedState == ""}/>
                <SimpleField name="Erstimpfung-Quote" icon_src="public/assets/icons/{core.iconTheme}/quote.png" value={vaccinations.quote*100} unit="%" hideValue={selectedState == ""}/>
                <SimpleField name="Zweitimpfung-Quote" icon_src="public/assets/icons/{core.iconTheme}/quote.png" value={vaccinations.secondVaccinationQuote*100} unit="%" hideValue={selectedState == ""}/>
                <SimpleField name="Boosterimpfung-Quote" icon_src="public/assets/icons/{core.iconTheme}/quote.png" value={vaccinations.boosterVaccinationQuote*100} unit="%" hideValue={selectedState == ""}/>
                <DosesDistribution 
                    doses_biontech={vaccinations.dosesBiontech}
                    doses_moderna={vaccinations.dosesModerna}
                    doses_astrazeneca={vaccinations.dosesAstraZeneca}
                    doses_janssen={vaccinations.dosesJanssen}
                />
            </div>
        </div>
    </div>
</div>

<style lang="scss">
    @import "./style.scss";
    @import "../../public/assets/core/style/dashboard-style-core.scss";
</style>