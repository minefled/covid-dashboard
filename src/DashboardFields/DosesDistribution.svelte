<script lang="ts">
    import { afterUpdate, onMount } from "svelte";

    import { formatNumber } from "../../public/assets/core";

    let percent_biontech    = 0;
    let percent_moderna     = 0;
    let percent_astrazeneca = 0;
    let percent_janssen     = 0;

    export let doses_biontech = 0,
               doses_moderna = 0,
               doses_astrazeneca = 0,
               doses_janssen = 0;

    onMount(() => {
    });

    afterUpdate(() => {
        updateChart();
    });

    function updateChart() {
        let total = Math.max(doses_biontech + doses_moderna + doses_astrazeneca + doses_janssen, 1);  // In case the total would be 0, the max should prevent division by zero later on

        percent_biontech    = (doses_biontech    / total) * 100;
        percent_moderna     = (doses_moderna     / total) * 100;
        percent_astrazeneca = (doses_astrazeneca / total) * 100;
        percent_janssen     = (doses_janssen     / total) * 100;
    }
</script>

<div class="item-box">
    <div class="item">
        <div class="title-section">
            <img class="item-icon" src="public/assets/icons/light/distribution.png" alt="">
            <b class="item-title">Impfdosen</b>
        </div>
        <div class="value-section">
            <div class="legend">
                <div class="legend-item">
                    <span class="item-color-preview biontech" />
                    <b class="item-name">Biontech</b>
                </div>

                <div class="legend-item">
                    <span class="item-color-preview moderna" />
                    <b class="item-name">Moderna</b>
                </div>

                <div class="legend-item">
                    <span class="item-color-preview astrazeneca" />
                    <b class="item-name">AstraZeneca</b>
                </div>

                <div class="legend-item">
                    <span class="item-color-preview janssen" />
                    <b class="item-name">Janssen</b>
                </div>
            </div>

            <div class="distribution-chart-container">
                <div class="distribution-chart">
                    <span class="dose-segment biontech"     style="width: {percent_biontech}%;" />
                    <span class="dose-segment moderna"      style="width: {percent_moderna}%;"/>
                    <span class="dose-segment astrazeneca"  style="width: {percent_astrazeneca}%;"/>
                    <span class="dose-segment janssen"      style="width: {percent_janssen}%;"/>
                </div>
            </div>
        </div>
    </div>
</div>

<style lang="scss">
    div.item-box {
        width: 100%;

        padding-top: 6px;
        padding-bottom: 6px;

        div.item {
            width: calc(100% - 12px);
            height: 82px;

            padding: 6px;
            border-radius: 10px;

            background-color: var(--dashboard-item-default-background-color);
            color: var(--primary-text-color);

            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;

            div.title-section {
                width: 100%;
                height: 40%;

                display: flex;
                flex-direction: row;
                align-items: center;
                justify-content: center;

                b.item-title {
                    font-family: "Montserrat";
                    font-size: 16px;
                    font-weight: 700;

                    color: var(--dashboard-item-name-color);

                    animation: 0.7s title-appear;
                }

                img.item-icon {
                    height: 60%;
                    margin-right: 0.8em;
                }

                @media(max-width: 800px) {
                    b.item-title {
                        font-size: 16px;
                    }
                }

                @media(max-width: 600px) {
                    b.item-title {
                        font-size: 14px;
                    }
                }

                @keyframes title-appear {
                        0% {
                            opacity: 0%;
                            transform: translateY(30%);
                        }

                        100% {
                            opacity: 100%;
                            transform: translateY(0%);
                        }
                    }
            }

            div.value-section {
                width: 100%;
                height: 55%;

                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;

                margin-top: 4px;

                div.legend {
                    width: calc(100% - 12px);
                    height: 40%;

                    display: flex;
                    flex-direction: row;
                    align-items: center;
                    justify-content: space-evenly;

                    .legend-item {
                        width: 100%;

                        display: flex;
                        flex-direction: row;
                        align-items: center;
                        justify-content: center;

                        font-size: 11px;

                        span.item-color-preview {
                            background-color: #ffffff;
                            height: 0.9em;
                            width: 0.9em;

                            border-radius: 50%;

                            margin-right: 0.8ex;
                        }

                        span.item-color-preview.biontech { background-color: var(--dashboard-vaccination-distribution-chart-segment-biontech); }
                        span.item-color-preview.moderna { background-color: var(--dashboard-vaccination-distribution-chart-segment-moderna); }
                        span.item-color-preview.astrazeneca { background-color: var(--dashboard-vaccination-distribution-chart-segment-astrazeneca); }
                        span.item-color-preview.janssen { background-color: var(--dashboard-vaccination-distribution-chart-segment-janssen); }

                        b.item-name {
                            font-size: 11px;
                            font-family: "Roboto";
                        }
                    }
                }

                div.distribution-chart-container {
                    width: calc(100% - 12px);
                    height: 55%;

                    display: flex;
                    align-items: center;
                    justify-content: center;

                    div.distribution-chart {
                        width: 95%;
                        height: 30%;

                        background-color: var(--dashboard-vaccination-distribution-chart-background);

                        border-radius: 3px;

                        overflow-x: hidden;
                        overflow-y: visible;

                        display: flex;
                        flex-direction: row;
                        align-items: center;
                        justify-content: flex-start;

                        span.dose-segment {
                            height: 100%;
                            width: 25%;

                            overflow-x: hidden;
                            overflow-y: visible;

                            opacity: 0%;

                            animation: 0.75s segment-appear forwards;
                        }

                        span.dose-segment.biontech { background-color: var(--dashboard-vaccination-distribution-chart-segment-biontech); animation-delay: 0s;}
                        span.dose-segment.moderna { background-color: var(--dashboard-vaccination-distribution-chart-segment-moderna); animation-delay: 0.15s;}
                        span.dose-segment.astrazeneca { background-color: var(--dashboard-vaccination-distribution-chart-segment-astrazeneca); animation-delay: 0.3s;}
                        span.dose-segment.janssen { background-color: var(--dashboard-vaccination-distribution-chart-segment-janssen); animation-delay: 0.45s;}

                        @keyframes segment-appear {
                            0% {
                                opacity: 0%;
                                transform: scaleX(0%);
                            }

                            100% {
                                opacity: 100%;
                                transform: scaleX(100%);
                            }
                        }
                    }
                }
            }
        }
    }
</style>