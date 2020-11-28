import Vue from 'vue'
import Vuex from 'vuex'
import app from './modules/app'
import device from './modules/device'
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex)

export default new Vuex.Store({
  plugins: [createPersistedState()],
  modules: {
    app,
    device
  },
  state: {
    user: []
  },
  getters: {
    user: (state) => {
      return state.user;
    }
  },
  mutations: {
    user(state, user) {
      state.user = user;
    }
  },
  actions: {
    user(context, user) {
      context.commit('user', user);
    }
  }
})
