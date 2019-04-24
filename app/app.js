import Vue from "nativescript-vue";
import routes from "./routes";
import BackendService from "./services/backend-service";
import Login from "./components/Login";
import Factura from "./components/Factura";
import VueDevtools from 'nativescript-vue-devtools';
import RadSideDrawer from "nativescript-ui-sidedrawer/vue";
import { TNSFontIcon, fonticon } from 'nativescript-fonticon';
// import FloatLabel from './components/custom/FloatLabel';
// Vue.component('FloatLabel', FloatLabel);
const backendService = new BackendService();
Vue.prototype.$backendService = backendService;
TNSFontIcon.debug = true;
TNSFontIcon.paths = {
    'fa': './fonts/font-awesome.css',
    'ion': './fonts/ionicons.css',
};
TNSFontIcon.loadCss();
Vue.filter('fonticon', fonticon);
Vue.use(RadSideDrawer);
Vue.config.silent = false;

Vue.use(VueDevtools);
new Vue({
    template: `
        <Frame>
            <Login />
        </Frame>`,
    components: {
        Login,
        Factura
    },
    render: h => h("frame", [h(backendService.isLoggedIn() ? routes.factura : routes.factura)])
}).$start();
