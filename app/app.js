import Vue from "nativescript-vue";

import Login from "./components/Login";

new Vue({
    template: `
        <Frame>
            <Login />
        </Frame>`,
    css: `
        <style>
            body{
                background: #FC7E00 !important;
            }
        </style>
    `,
    components: {
        Login
    }
}).$start();
