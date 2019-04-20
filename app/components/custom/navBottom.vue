<template>
    <GridLayout class="navBottom" height="50" width="100%" row="3" rows="auto"
        columns="auto,auto,auto,auto">

        <GridLayout :class="selectedTab==0?'active':''" @tap="factura" rows="*,auto"
            cols="auto" class="nav" col="0" row="0" width="25%">
            <Image :class="selectedTab==0?'active':''" row="0" class="navIcon"
                :src="selectedTab==0?'~/assets/images/navordersm.png':'~/assets/images/navorders.png'" />
            <Label row="1" v-show="selectedTab==0" text="Factura" class="navText"></Label>
        </GridLayout>
        <GridLayout :class="selectedTab==1?'active':''" @tap="boleta" rows="*,auto"
            cols="auto" class="nav" col="1" row="0" width="25%">
            <Image :class="selectedTab==1?'active':''" row="0" class="navIcon"
                :src="selectedTab==1?'~/assets/images/navordersm.png':'~/assets/images/navorders.png'" />
            <Label row="1" v-show="selectedTab == 1" text="Boleta" class="navText"></Label>
        </GridLayout>
    </GridLayout>
</template>
<script>
    export default {
        data() {
            return {
                selectedTab: 0
            };
        },
        methods: {
            factura() {
                this.selectedTab = 0;
            },
            boleta() {
                this.selectedTab = 1;
            }
        }
    };
</script>

<style>
    .navBottom {
        background-color: #f4f4f4;
        border-color: red;
    }

    .nav {
        height: 100%;
        width: 100%;
    }

    .nav.active {
        background-color: #0Dc43776;
    }

    .navIcon {
        horizontal-align: center;
        vertical-align: center;
        height: 25
    }

    .navIcon.active {
        vertical-align: bottom;
    }

    .navText {
        margin-bottom: 2;
        font-size: 12;
        /* color: #c43776; */
        color: #d62526;
        horizontal-align: center;
    }
</style>