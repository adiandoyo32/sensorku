import dashboard from "@/services/dashboard";

const state = {
  availableDevices: [],
  unavailableDevices: [],
  isLoading: true,
};

const getters = {
  IS_LOADING: (state) => {
    return state.isLoading;
  },
  AVAILABLE_DEVICES: (state) => {
    return state.availableDevices;
  },
  UNAVAILABLE_DEVICES: (state) => {
    return state.unavailableDevices;
  },
};

const mutations = {
  SET_LOADING: (state, payload) => {
    state.isLoading = payload;
  },
  SET_AVAILABLE_DEVICES: (state, payload) => {
    state.availableDevices = payload;
  },
  SET_UNAVAILABLE_DEVICES: (state, payload) => {
    state.unavailableDevices = payload;
  },
};

const actions = {
  FETCH_AVAILABLE_DEVICES: (context) => {
    dashboard.fetchAvailableDevices()
      .then((res) => {
        context.commit("SET_AVAILABLE_DEVICES", res.data.data);
      })
      .catch((err) => {
        console.log(err);
      })
  },

  FETCH_UNAVAILABLE_DEVICES: (context) => {
    dashboard.fetchUnavailableDevices()
      .then((res) => {
        context.commit("SET_UNAVAILABLE_DEVICES", res.data.data);
      })
      .catch((err) => {
        console.log(err);
      })
  },
};

export default {
  state,
  getters,
  mutations,
  actions,
  namespaced: true,
};
