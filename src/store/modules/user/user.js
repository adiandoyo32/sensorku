const state = {
  user: {},
};

const getters = {
  USER: (state) => {
    return state.user;
  },
};

const mutations = {
  SET_USER: (state, payload) => {
    state.user = payload;
  },
};

const actions = {
  SET_USER: (context, payload) => {
    context.commit("SET_USER", payload);
  },
};

export default {
  state,
  getters,
  mutations,
  actions,
};
