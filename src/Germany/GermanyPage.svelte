<script lang="ts">
    import { onMount } from "svelte";

    import { calculateHospitalizationColor, calculateIncidenceColor, calculateWeekCasesColor } from "./index.js";

    import { Core, formatNumber } from "../../public/assets/core";
    import type { GermanyData, VaccinationData } from "../../public/assets/core/api/data";

    export let core:Core;
    export let data:GermanyData = {weekIncidence: 0, cases7Days: 0, hospitalizationIncidence: 0, hospitalizationCases: 0, cases: 0, deaths: 0, recovered: 0, deltaCases: 0, deltaDeaths: 0, deltaRecovered: 0};
    export let vaccinations:VaccinationData = { vaccinated: 0, secondVaccinations: 0, boosterVaccinations: 0, administered: 0, quote: 0, dosesBiontech: 0, dosesModerna: 0, dosesAstraZeneca: 0, dosesJanssen: 0, boosterDosesBiontech: 0, boosterDosesModerna: 0, boosterDosesAstraZeneca: 0, boosterDosesJanssen: 0};

    onMount(async () => {
        data = await core.api.fetchGermany();
        vaccinations = await core.api.fetchGermanyVaccinations();

        document.getElementById("germany-7-day-incidence").style.color = calculateIncidenceColor(data.weekIncidence);
        document.getElementById("germany-cases-7-days").style.color = calculateWeekCasesColor(data.cases7Days);
        document.getElementById("germany-hospitalization-incidence").style.color = calculateHospitalizationColor(data.hospitalizationIncidence);
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
                <!-- Inzidenz -->
                <div class="item-box">
                    <div class="item">
                        <div class="icon-section"><img src="public/assets/icons/light/7-day-incidence.svg" class="item-icon"></div>
                        <div class="content-section">
                            <div class="title-section">
                                <b>7-Tage-Inzidenz</b>
                            </div>
                            <div class="value-section">
                                <b id="germany-7-day-incidence">{formatNumber(data.weekIncidence)}</b>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Fälle 7 Tage -->
                <div class="item-box">
                    <div class="item">
                        <div class="icon-section"><img src="public/assets/icons/light/covid.png" class="item-icon"></div>
                        <div class="content-section">
                            <div class="title-section">
                                <b>Fälle 7 Tage</b>
                            </div>
                            <div class="value-section">
                                <b id="germany-cases-7-days">{formatNumber(data.cases7Days)}</b>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Hospitalisierung -->
                <div class="item-box">
                    <div class="item">
                        <div class="icon-section"><img src="public/assets/icons/light/hospitalization.png" class="item-icon"></div>
                        <div class="content-section">
                            <div class="title-section">
                                <b>Hospitalisierungs-Inzidenz</b>
                            </div>
                            <div class="value-section">
                                <b id="germany-hospitalization-incidence">{formatNumber(data.hospitalizationIncidence)}</b>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Fälle gesamt -->
                <div class="item-box">
                    <div class="item">
                        <div class="icon-section"><img src="public/assets/icons/light/covid.png" class="item-icon"></div>
                        <div class="content-section">
                            <div class="title-section">
                                <b>Fälle Gesamt</b>
                            </div>
                            <div class="value-section">
                                <b>{formatNumber(data.cases)}</b>
                                <b class="delta">+{formatNumber(data.deltaCases)}</b>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Tode Gesamt -->
                <div class="item-box">
                    <div class="item">
                        <div class="icon-section"><img src="public/assets/icons/light/death.png" class="item-icon"></div>
                        <div class="content-section">
                            <div class="title-section">
                                <b>Tode Gesamt</b>
                            </div>
                            <div class="value-section">
                                <b>{formatNumber(data.deaths)}</b>
                                <b class="delta">+{formatNumber(data.deltaDeaths)}</b>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Genesene Gesamt -->
                <div class="item-box">
                    <div class="item">
                        <div class="item">
                            <div class="icon-section"><img src="public/assets/icons/light/recovered.png" class="item-icon"></div>
                            <div class="content-section">
                                <div class="title-section">
                                    <b>Genesene Gesamt</b>
                                </div>
                                <div class="value-section">
                                    <b>{formatNumber(data.recovered)}</b>
                                    <b class="delta">+{formatNumber(data.deltaRecovered)}</b>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="category">
            <b class="category-name">Impfungen</b>
            <span class="title-underline"></span>

            <div class="item-container size-5">
                <!-- Erstimpfung -->
                <div class="item-box">
                    <div class="item">
                        <div class="icon-section"><img src="public/assets/icons/light/vaccination.png" class="item-icon"></div>
                        <div class="content-section">
                            <div class="title-section">
                                <b>Erstimpfung</b>
                            </div>
                            <div class="value-section">
                                <b>{formatNumber(vaccinations.vaccinated)}</b>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Zweitimpfung -->
                <div class="item-box">
                    <div class="item">
                        <div class="icon-section"><img src="public/assets/icons/light/vaccination.png" class="item-icon"></div>
                        <div class="content-section">
                            <div class="title-section">
                                <b>Zweitimpfung</b>
                            </div>
                            <div class="value-section">
                                <b>{formatNumber(vaccinations.secondVaccinations)}</b>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Boosterimpfung -->
                <div class="item-box">
                    <div class="item">
                        <div class="icon-section"><img src="public/assets/icons/light/booster.png" class="item-icon"></div>
                        <div class="content-section">
                            <div class="title-section">
                                <b>Boosterimpfung</b>
                            </div>
                            <div class="value-section">
                                <b>{formatNumber(vaccinations.boosterVaccinations)}</b>
                            </div>
                        </div>
                    </div>
                </div>
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