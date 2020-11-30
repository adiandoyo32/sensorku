import { fetchUser } from "@/services/user";

const state = {
  users: [],
  isLoading: true
};

const getters = {
  IS_LOADING: (state) => {
    return state.isLoading;
  },
  GET_USERS: (state) => {
    return state.users;
  },
};

const mutations = {
  SET_LOADING: (state, payload) => {
    state.isLoading = payload;
  },
  SET_USERS: (state, payload) => {
    state.users = payload;
  },
};

const actions = {
  FETCH_USERS: (context) => {
    fetchUser()
      .then((res) => {
        context.commit("SET_USERS", res.data.data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => context.commit("SET_LOADING", false));
  },
};

export default {
  state,
  getters,
  mutations,
  actions,
  namespaced: true,
};
