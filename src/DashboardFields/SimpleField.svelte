<script lang="ts">
    import { formatNumber } from "../../public/assets/core";

    export let value:number = 0;
    export let delta:number = null;
    export let icon_src = "";
    export let name = "";
    export let color:string = "";
    export let unit:string = "";
    export let hideValue:boolean = false;
</script>

<div class="item-box">
    <div class="item">
        <div class="icon-section"><img src={icon_src} class="item-icon" alt=""></div>
        <div class="content-section">
            <div class="title-section">
                <b class="item-title">{name}</b>
            </div>
            <div class="value-section">
                <b class="item-value" style={(color == "" || hideValue) ? "" : `color: ${color}`}>{hideValue ? "--" : formatNumber(value)}{unit}</b>
                {#if delta != null && !hideValue}
                    <b class="delta">+{formatNumber(delta)}</b>
                {/if}
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
            box-shadow: var(--dashboard-item-shadow);

            color: var(--primary-text-color);

            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: center;

            div.icon-section {
                display: flex;
                align-items: center;
                justify-content: center;

                height: 100%;
                width: 90px;

                margin: 8px;
                margin-left: 10px;

                img.item-icon {
                    height: 60px;
                }

                @media(max-width: 1000px) {
                    img.item-icon {
                        height: 50px;
                    }
                }
            }

            div.content-section {
                width: 100%;
                height: 100%;

                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;

                margin-left: 1em;

                div.title-section {
                    width: 100%;
                    height: 30%;

                    display: flex;
                    flex-direction: row;
                    align-items: center;
                    justify-content: flex-start;

                    b.item-title {
                        font-family: "Montserrat";
                        font-size: 16px;
                        font-weight: 700;

                        color: var(--dashboard-item-name-color);

                        animation: 0.7s title-appear;
                    }

                    @media(max-width: 900px) {
                        b.item-title {
                            font-size: 15px;
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
                    height: 50%;

                    display: flex;
                    flex-direction: row;
                    align-items: center;
                    justify-content: flex-start;

                    b.item-value {
                        font-size: 32px;
                        font-family: "Outfit";
                        font-weight: 800;
                        color: #ffffff;

                        transition: 0.3s;

                        opacity: 0%;
                        transform: translateY(0%);

                        animation: 0.7s value-appear forwards;
                        animation-delay: 0.15s;
                    }

                    b.delta {
                        font-size: 18px;
                        font-family: "Outfit";
                        font-weight: 800;
                        color: #777;

                        margin-left: 1.5ex;

                        opacity: 0%;
                        transform: translateY(0%);

                        animation: 0.7s value-appear forwards;
                        animation-delay: 0.3s;
                    }

                    @media(max-width: 900px) {
                        b.item-value {
                            font-size: 24px;
                        }

                        b.delta {
                            font-size: 14px;
                        }
                    }

                    @keyframes value-appear {
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
            }
        }
    }
</style>