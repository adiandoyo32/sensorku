import User from "@/services/user";

const state = {
  users: [],
  user: {},
  isLoading: true,
  successMessage: null,
  errMessage: null,
  userDevice: [],
};

const getters = {
  IS_LOADING: (state) => {
    return state.isLoading;
  },
  USERS: (state) => {
    return state.users;
  },
  USER: (state) => {
    return state.user;
  },
  SUCCESS_MESSAGE: (state) => {
    return state.successMessage;
  },
  ERR_MESSAGE: (state) => {
    return state.errMessage;
  },
  USER_DEVICES: (state) => {
    return state.userDevice;
  },
};

const mutations = {
  SET_LOADING: (state, payload) => {
    state.isLoading = payload;
  },
  SET_USERS: (state, payload) => {
    state.users = payload;
  },
  SET_USER: (state, payload) => {
    state.user = payload;
  },
  SET_SUCCESS_MESSAGE: (state, payload) => {
    state.successMessage = payload;
  },
  SET_ERR_MESSAGE: (state, payload) => {
    state.errMessage = payload;
  },
  SET_USER_DEVICES: (state, payload) => {
    state.userDevice = payload;
  },
};

const actions = {
  FETCH_USERS: (context) => {
    User.fetchUser()
      .then((res) => {
        context.commit("SET_USERS", res.data.data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => context.commit("SET_LOADING", false));
  },

  CREATE_USER: ({ dispatch, commit }, user) => {
    commit("SET_LOADING", true);
    User.createUser(user)
      .then((res) => {
        console.log(res);
        if (res.data.error) {
          commit("SET_SUCCESS_MESSAGE", null);
          commit("SET_ERR_MESSAGE", res.data.error);
        } else {
          commit("SET_SUCCESS_MESSAGE", res.data);
          commit("SET_ERR_MESSAGE", null);
          dispatch("FETCH_USERS");
        }
      })
      .catch((err) => {
        console.log("err", err);
      })
      .finally(() => commit("SET_LOADING", false));
  },

  UPDATE_USER: ({ dispatch, commit }, user) => {
    commit("SET_LOADING", true);
    User.updateUser(user)
      .then((res) => {
        if (res.data.error) {
          commit("SET_SUCCESS_MESSAGE", null);
          commit("SET_ERR_MESSAGE", res.data.error);
        } else {
          commit("SET_SUCCESS_MESSAGE", res.data);
          commit("SET_ERR_MESSAGE", null);
          dispatch("FETCH_USERS");
        }
      })
      .catch((err) => {
        console.log("err", err);
      })
      .finally(() => commit("SET_LOADING", false));
  },

  SHOW_USER: (context, userId) => {
    context.commit("SET_LOADING", true);
    User.showUser(userId)
      .then((res) => {
        context.commit("SET_USER", res.data.data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => context.commit("SET_LOADING", false));
  },

  DELETE_USER: ({ dispatch, commit }, userId) => {
    commit("SET_LOADING", true);
    User.deleteUser(userId)
      .then((res) => {
        if (res.data.error) {
          commit("SET_SUCCESS_MESSAGE", null);
          commit("SET_ERR_MESSAGE", res.data.error);
        } else {
          commit("SET_SUCCESS_MESSAGE", res.data);
          commit("SET_ERR_MESSAGE", null);
          dispatch("FETCH_USERS");
        }
      })
      .catch((err) => {
        console.log("err", err);
      })
      .finally(() => commit("SET_LOADING", false));
  },

  FETCH_USER_DEVICES: (context, userId) => {
    context.commit("SET_LOADING", true);
    User.fetchUserDevices(userId)
      .then((res) => {
        console.log(res);
        context.commit("SET_USER_DEVICES", res.data.data);
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
