<script lang="ts">
    import { formatNumber } from "../../public/assets/core";

    export let value:number = 0;
    export let delta:number = null;
    export let icon_src = "";
    export let name = "";
    export let color:string = "";
    export let unit:string = "";
</script>

<div class="item-box">
    <div class="item">
        <div class="icon-section"><img src={icon_src} class="item-icon" alt=""></div>
        <div class="content-section">
            <div class="title-section">
                <b class="item-title">{name}</b>
            </div>
            <div class="value-section">
                <b class="item-value" style={(color == "") ? "" : `color: ${color}`}>{formatNumber(value)}{unit}</b>
                {#if delta != null}
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
            }

            div.content-section {
                width: 100%;
                height: 100%;

                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;

                div.title-section {
                    width: 100%;
                    height: 30%;

                    display: flex;
                    flex-direction: row;
                    align-items: center;
                    justify-content: flex-start;

                    b.item-title {
                        font-family: "Montserrat";
                        font-size: 20px;
                        font-weight: 700;

                        margin-left: 1em;
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

                        margin-left: 0.5em;

                        transition: 0.3s;
                    }

                    b.delta {
                        font-size: 16px;
                        font-family: "Outfit";
                        font-weight: 800;
                        color: #777;

                        margin-left: 1.5em;
                    }
                }
            }
        }
    }

    @media(max-width: 1100px) {
        img.item-icon {
            height: 40px;
        }

        div.title-section b {
            font-size: 18px;
        }
    }

    @media(max-width: 800px) {
        img.item-icon {
            height: 30px;
        }

        div.item {
            width: calc(100%);
        }

        b.item-title {
            font-size: 10px;
        }

        b.item-value {
            font-size: 16px;
        }

        b.delta {
            font-size: 12px;
        }
    }
</style>