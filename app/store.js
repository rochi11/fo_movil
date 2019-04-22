import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersist from 'vuex-persist';

Vue.use(Vuex)
const vuexPersist = new VuexPersist({
  key: "my-app",
  storage: localStorage
});
export default new Vuex.Store({
    state: {
      user: {
        logged: 0,
        data: ''
      },
      invoice: []
    },
    mutations: {
      itemstransient(state, data){
        state.invoice = data;
      },
      loginuser(state, data) {
        state.user.data = data;
        state.user.logged = 1;
      },
      logoutuser(state) {
        state.user.data = '';
        state.user.logged = 0;
      }
    },
    getters: {
      bringItems: state => {
        return state.invoice
      },
      userData: state => {
        return state.user.data.user
      },
      userToken: state => {
        return state.user.data.token
      },
      userPermits: state => {
          return state.user.data.configuration
      }
    },
    actions: {},
    plugins: [vuexPersist.plugin]
  });