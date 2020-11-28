import Axios from "axios";

const state = {
  devices: [],
  device: {},
  deviceLogs: [],
  isLoading: true,
};

const getters = {
  IS_LOADING: (state) => {
    return state.isLoading;
  },
  DEVICES: (state) => {
    return state.devices;
  },
  DEVICE_LOGS: (state) => {
    return state.deviceLogs;
  },
};

const mutations = {
  SET_DEVICES: (state, payload) => {
    state.devices = payload;
  },
  SET_LOADING: (state, payload) => {
    state.isLoading = payload;
  },
  SET_DEVICE_LOGS: (state, payload) => {
    state.deviceLogs = payload;
  },
};

const actions = {
  FETCH_DEVICES: (context) => {
    Axios({
      method: "GET",
      url: "api/devices",
    })
      .then((res) => {
        context.commit("SET_DEVICES", res.data.data);
      })
      .catch((error) => console.log(error))
      .finally(() => context.commit("SET_LOADING", false));
  },
  FETCH_DEVICE_LOGS: (context, payload) => {
    Axios({
      method: "GET",
      url: `api/devices/${payload.deviceId}/data`,
    })
      .then((res) => {
        context.commit("SET_DEVICE_LOGS", res.data.data);
      })
      .catch((error) => console.log(error))
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
