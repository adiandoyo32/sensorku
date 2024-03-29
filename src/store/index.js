import Vue from 'vue'
import Vuex from 'vuex'
import app from './modules/app'
import dashboard from './modules/dashboard'
import device from './modules/device'
import user from './modules/user'
// import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex)

export default new Vuex.Store({
  // plugins: [createPersistedState()],
  modules: {
    app,
    dashboard,
    user,
    device,
  }
})
