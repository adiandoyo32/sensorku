const state = {
  drawer: true,
};

const getters = {
  getDrawer: (state) => {
    return state.drawer;
  },
};

const mutations = {
  SET_DRAWER: (state, payload) => {
    state.drawer = payload;
  },
};

const actions = {
  SET_DRAWER: ({ commit }, payload) => {
    commit("SET_DRAWER", payload);
  },
};

export default {
  state,
  getters,
  mutations,
  actions,
};
