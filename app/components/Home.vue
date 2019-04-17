<template>
    <Page class="page">
        <ActionBar class="action-bar" title="Pokemon"></ActionBar>
        <GridLayout>
            <ListView for="p in pokemon" class="list-group">
                <v-template>
                    <StackLayout class="list-group-item">
                        <Label :text="p.name" />
                    </StackLayout>
                </v-template>
            </ListView>
        </GridLayout>
    </Page>
</template>

<script>
import * as http from "http";
    export default {
        data() {
            return {
                pokemon: []
            };
        },
        mounted() {
            http.getJSON("https://pokeapi.co/api/v2/pokemon/?limit=151").then(result => {
                this.pokemon = result.results;
            }, error => {
                console.log(error);
            });
         },
        computed: {
            message() {
                return "Blank {N}-Vue app";
            }
        }
    };
</script>

<style scoped lang="scss">
    // Start custom common variables
    @import '../app-variables';
    // End custom common variables

    // Custom styles
    .fa {
        color: $accent-dark;
    }

    .info {
        font-size: 20;
    }
    @keyframes spin {
    from { transform: rotate(0); }
    to { transform: rotate(360); }
}
Image {
    animation-name: spin; 
    animation-duration: 3s;
    animation-iteration-count: infinite;
    animation-timing-function: linear;
}
</style>
