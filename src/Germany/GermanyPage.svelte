<script lang="ts">
    import { onMount } from "svelte";
    import SimpleField from "../DashboardFields/SimpleField.svelte";
    import DosesDistribution from "../DashboardFields/DosesDistribution.svelte";

    import { Core, dashboard } from "../../public/assets/core";
    import type { GermanyData, TestsData, VaccinationData } from "../../public/assets/core/api/data";

    export let core:Core;
    export let data:GermanyData = {weekIncidence: 0, cases7Days: 0, hospitalizationIncidence: 0, hospitalizationCases: 0, cases: 0, deaths: 0, recovered: 0, deltaCases: 0, deltaDeaths: 0, deltaRecovered: 0};
    export let vaccinations:VaccinationData = { vaccinated: 0, secondVaccinations: 0, boosterVaccinations: 0, administered: 0, quote: 0, secondVaccinationQuote: 0, boosterVaccinationQuote: 0, dosesBiontech: 0, dosesModerna: 0, dosesAstraZeneca: 0, dosesJanssen: 0, boosterDosesBiontech: 0, boosterDosesModerna: 0, boosterDosesAstraZeneca: 0, boosterDosesJanssen: 0};
    export let tests:TestsData = { calendarWeek: "", performedTest: 0, positiveTests: 0, laboratoryCount: 0 };

    onMount(async () => {
        data = await core.api.fetchGermany();
        vaccinations = await core.api.fetchGermanyVaccinations();
        tests = await core.api.fetchTestData();

        console.log(vaccinations);
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
                    icon_src="public/assets/icons/{core.iconTheme}/7-day-incidence.svg"
                    value={data.weekIncidence} 
                    color={dashboard.calculateIncidenceColor(data.weekIncidence)}
                />

                <SimpleField 
                    name="Fälle 7 Tage"
                    icon_src="public/assets/icons/{core.iconTheme}/covid.png"
                    value={data.cases7Days} 
                    color={dashboard.calculateWeekCasesColor(data.cases7Days)}
                />

                <SimpleField 
                    name="Hospitalisierungs-Inzidenz"
                    icon_src="public/assets/icons/{core.iconTheme}/hospitalization.png"
                    value={data.hospitalizationIncidence} 
                    color={dashboard.calculateHospitalizationColor(data.hospitalizationIncidence)}
                />

                <SimpleField name="Fälle Gesamt" icon_src="public/assets/icons/{core.iconTheme}/covid.png" value={data.cases} delta={data.deltaCases}/>
                <SimpleField name="Tode Gesamt" icon_src="public/assets/icons/{core.iconTheme}/death.png" value={data.deaths} delta={data.deltaDeaths}/>
                <SimpleField name="Genesene Gesamt" icon_src="public/assets/icons/{core.iconTheme}/recovered.png" value={data.recovered} delta={data.deltaRecovered}/>
            </div>
        </div>

        <div class="category">
            <b class="category-name">Impfungen</b>
            <span class="title-underline"></span>

            <div class="item-container size-5">
                <SimpleField name="Erstimpfung" icon_src="public/assets/icons/{core.iconTheme}/vaccination.png" value={vaccinations.vaccinated}/>
                <SimpleField name="Zweitimpfung" icon_src="public/assets/icons/{core.iconTheme}/vaccination.png" value={vaccinations.secondVaccinations}/>
                <SimpleField name="Boosterimpfung" icon_src="public/assets/icons/{core.iconTheme}/booster.png" value={vaccinations.boosterVaccinations}/>
                <SimpleField name="Erstimpfung-Quote" icon_src="public/assets/icons/{core.iconTheme}/quote.png" value={vaccinations.quote*100} unit="%"/>
                <SimpleField name="Zweitimpfung-Quote" icon_src="public/assets/icons/{core.iconTheme}/quote.png" value={vaccinations.secondVaccinationQuote*100} unit="%"/>
                <SimpleField name="Boosterimpfung-Quote" icon_src="public/assets/icons/{core.iconTheme}/quote.png" value={vaccinations.boosterVaccinationQuote*100} unit="%"/>
                <DosesDistribution 
                    doses_biontech={vaccinations.dosesBiontech}
                    doses_moderna={vaccinations.dosesModerna}
                    doses_astrazeneca={vaccinations.dosesAstraZeneca}
                    doses_janssen={vaccinations.dosesJanssen}
                />
            </div>
        </div>

        <div class="category tests-category" style="padding-bottom: 60px">
            <b class="category-name">Tests</b>
            <span class="title-underline"></span>

            <div class="item-container size-3">
                <SimpleField name="Durchgeführte Tests" icon_src="public/assets/icons/{core.iconTheme}/tests.png" value={tests.performedTest}/>
                <SimpleField name="Positive Tests" icon_src="public/assets/icons/{core.iconTheme}/tests.png" value={tests.positiveTests}/>
                <SimpleField name="Postitivitätsrate" icon_src="public/assets/icons/{core.iconTheme}/quote.png" value={(tests.positiveTests / tests.performedTest)*100} unit="%" color={dashboard.calculatePositivityRateColor((tests.positiveTests / tests.performedTest)*100)}/>
            </div>
        </div>
    </div>
</div>

<style lang="scss">
    @import "./style.scss";
    @import "../../public/assets/core/style/dashboard-style-core.scss";
</style>