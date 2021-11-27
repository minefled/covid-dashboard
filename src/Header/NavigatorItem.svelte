<script lang="ts">
    export let id:string;
    export let name:string;

    export let selected_page:string;
</script>

<div class="navigator-item {id == selected_page ? "active" : ""}" id="header-nav-itm-{id}" on:click={() => { window.location.href = `#${id}`; }}>
    <b class="item-name">{name}</b>
    <span class="item-name-underline"></span>
</div>

<style lang="scss">
    .navigator-item {
        height: 100%;

        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;

        margin-left: 1.5ex;
        margin-right: 1.5ex;

        cursor: pointer;

        b {
            font-family: "Montserrat";
            font-size: 16;
            font-weight: 500;

            color: var(--header-navigator-item-name-color)
        }

        .item-name-underline {
            margin-top: 0px;

            width: 0%;
            height: 0px;

            background: var(--header-navigator-item-active-background-color);
            background: var(--header-navigator-item-active-background);

            transition: 0.2s;
        }
    }

    .navigator-item.active {
        .item-name-underline {
            margin-top: 2px;

            width: 100%;
            height: 2px;

            background: var(--header-navigator-item-active-background-color);
            background: var(--header-navigator-item-active-background);
        }
    }

    @media(max-width: 850px) {
        .navigator-item {
            width: 100%;

            b {
                font-family: "Montserrat";
                font-size: 24px;
                font-weight: 700;

                color: var(--header-navigator-item-name-color)
            }

            .item-name-underline {
                display: none;
            }
        }

        .navigator-item.active {
            background-color: var(--header-navigator-phone-item-active-background);
        }
    }
</style>