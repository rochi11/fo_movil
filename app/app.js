import Vue from "nativescript-vue";
import VueDevtools from 'nativescript-vue-devtools';
Vue.config.silent = false;
import Login from "./components/Login";
Vue.use(VueDevtools);
new Vue({
    template: `
        <Frame>
            <Login />
        </Frame>`,
    components: {
        Login
    }
}).$start();
