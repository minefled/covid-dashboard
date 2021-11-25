<script>
</script>

<div class="home-page">
    <div class="landing-banner">
        <b class="info-message">Die aktuellen Covid-19 Zahlen und Statistiken aus Deutschland</b>
    </div>

    <div class="quick-navigator">
        <div class="header">
            <b class="title">Navigator</b>
        </div>

        <div class="item-list">
            <div class="item" on:click={() => { window.location.href = "#world"; }}>
                <div class="item-box">
                    <b class="item-name">Welt</b>
                </div>
            </div>

            <div class="item" on:click={() => { window.location.href = "#germany"; }}>
                <div class="item-box">
                    <b class="item-name">Deutschland</b>
                </div>
            </div>

            <div class="item" on:click={() => { window.location.href = "#states"; }}>
                <div class="item-box">
                    <b class="item-name">Bundesländer</b>
                </div>
            </div>

            <div class="item" on:click={() => { window.location.href = "#districts"; }}>
                <div class="item-box">
                    <b class="item-name">Landkreise</b>
                </div>
            </div>
        </div>
    </div>
</div>

<style lang="scss">
    @import "./style.scss";
</style>