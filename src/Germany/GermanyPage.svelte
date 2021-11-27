<script lang="ts">
    import { onMount } from "svelte";
    import SimpleField from "../DashboardFields/SimpleField.svelte";

    import { calculateHospitalizationColor, calculateIncidenceColor, calculateWeekCasesColor } from "./index.js";

    import type { Core } from "../../public/assets/core";
    import type { GermanyData, VaccinationData } from "../../public/assets/core/api/data";

    export let core:Core;
    export let data:GermanyData = {weekIncidence: 0, cases7Days: 0, hospitalizationIncidence: 0, hospitalizationCases: 0, cases: 0, deaths: 0, recovered: 0, deltaCases: 0, deltaDeaths: 0, deltaRecovered: 0};
    export let vaccinations:VaccinationData = { vaccinated: 0, secondVaccinations: 0, boosterVaccinations: 0, administered: 0, quote: 0, secondVaccinationQuote: 0, dosesBiontech: 0, dosesModerna: 0, dosesAstraZeneca: 0, dosesJanssen: 0, boosterDosesBiontech: 0, boosterDosesModerna: 0, boosterDosesAstraZeneca: 0, boosterDosesJanssen: 0};

    onMount(async () => {
        data = await core.api.fetchGermany();
        vaccinations = await core.api.fetchGermanyVaccinations();
    });
</script>

<div class="germany-page">
    <!--
        Felder:
            -- Fälle --
            Inzidenz
            Fälle 7 Tage
            Hospitalisierung

            Fälle gesamt
            Tode gesamt
            Genesene gesamt

            Neue Fälle
            Neue Tode
            Neue Genesene

            -- Tests --
            Durchgeführte Tests
            Positive Tests
            Positivitäts-Rate

            -- Impfung --
            Impfung #1
            Impfung #2
            Booster Impfung

            Impfquote
            Verteilung der Impfstoffe
    -->

    <div class="categories">
        <div class="category">
            <b class="category-name">Fälle</b>
            <span class="title-underline"></span>

            <div class="item-container size-6">
                <SimpleField 
                    name="7-Tage-Inzidenz"
                    icon_src="public/assets/icons/light/7-day-incidence.svg"
                    value={data.weekIncidence} 
                    color={calculateIncidenceColor(data.weekIncidence)}
                />

                <SimpleField 
                    name="Fälle 7 Tage"
                    icon_src="public/assets/icons/light/covid.png"
                    value={data.cases7Days} 
                    color={calculateWeekCasesColor(data.cases7Days)}
                />

                <SimpleField 
                    name="Hospitalisierungs-Inzidenz"
                    icon_src="public/assets/icons/light/hospitalization.png"
                    value={data.hospitalizationIncidence} 
                    color={calculateHospitalizationColor(data.hospitalizationIncidence)}
                />

                <SimpleField name="Fälle Gesamt" icon_src="public/assets/icons/light/covid.png" value={data.cases} delta={data.deltaCases}/>
                <SimpleField name="Tode Gesamt" icon_src="public/assets/icons/light/death.png" value={data.deaths} delta={data.deltaDeaths}/>
                <SimpleField name="Genesene Gesamt" icon_src="public/assets/icons/light/recovered.png" value={data.recovered} delta={data.deltaRecovered}/>
            </div>
        </div>

        <div class="category">
            <b class="category-name">Impfungen</b>
            <span class="title-underline"></span>

            <div class="item-container size-5">
                <SimpleField name="Erstimpfung" icon_src="public/assets/icons/light/vaccination.png" value={vaccinations.vaccinated}/>
                <SimpleField name="Zweitimpfung" icon_src="public/assets/icons/light/vaccination.png" value={vaccinations.secondVaccinations}/>
                <SimpleField name="Boosterimpfung" icon_src="public/assets/icons/light/booster.png" value={vaccinations.boosterVaccinations}/>
                <SimpleField name="Erstimpfung-Quote" icon_src="public/assets/icons/light/quote.png" value={vaccinations.quote*100} unit="%"/>
                <SimpleField name="Zweitimpfung-Quote" icon_src="public/assets/icons/light/quote.png" value={vaccinations.secondVaccinationQuote*100} unit="%"/>
            </div>
        </div>

        <div class="category">
            <b class="category-name">Tests</b>
            <span class="title-underline"></span>

            <div class="item-container size-3">
            </div>
        </div>
    </div>
</div>

<style lang="scss">
    @import "./style.scss";
</style>