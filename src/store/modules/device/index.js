import Device from "@/services/device";

const state = {
  devices: [],
  device: {},
  deviceLogs: [],
  isLoading: true,
  successMessage: null,
  errMessage: null,
};

const getters = {
  IS_LOADING: (state) => {
    return state.isLoading;
  },
  DEVICES: (state) => {
    return state.devices;
  },
  DEVICE: (state) => {
    return state.device;
  },
  DEVICE_LOGS: (state) => {
    return state.deviceLogs;
  },
  SUCCESS_MESSAGE: (state) => {
    return state.successMessage;
  },
  ERR_MESSAGE: (state) => {
    return state.errMessage;
  },
  DEVICE_LOG_DATASET: (state) => {
    // const date = state.deviceLogs.map(logs => {
    //   return logs.created_at;
    // });
    // const value = state.deviceLogs.map(logs => {
    //   return logs.value;
    // });
    // let data = {
    //   date,
    //   value
    // };
    // return data;
    console.log('log data', state.deviceLogs);
    const dataset = state.deviceLogs.map(logs => {
      return { x: logs.created_at, y: logs.value }
    })
    return dataset;
  },
};

const mutations = {
  SET_DEVICES: (state, payload) => {
    state.devices = payload;
  },
  SET_DEVICE: (state, payload) => {
    state.device = payload;
  },
  SET_LOADING: (state, payload) => {
    state.isLoading = payload;
  },
  SET_DEVICE_LOGS: (state, payload) => {
    state.deviceLogs = payload;
  },
  SET_SUCCESS_MESSAGE: (state, payload) => {
    state.successMessage = payload;
  },
  SET_ERR_MESSAGE: (state, payload) => {
    state.errMessage = payload;
  },
};

const actions = {
  // fetch all device
  FETCH_DEVICES: (context) => {
    Device.fetchDevice()
      .then((res) => {
        context.commit("SET_DEVICES", res.data.data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => context.commit("SET_LOADING", false));
  },

  CREATE_DEVICE: ({ dispatch, commit }, device) => {
    commit("SET_LOADING", true);
    Device.createDevice(device)
      .then((res) => {
        if (res.data.error) {
          commit("SET_SUCCESS_MESSAGE", null);
          commit("SET_ERR_MESSAGE", res.data.error);
        } else {
          commit("SET_SUCCESS_MESSAGE", res.data);
          commit("SET_ERR_MESSAGE", null);
          dispatch("FETCH_DEVICES");
        }
      })
      .catch((err) => {
        console.log("err", err);
      })
      .finally(() => commit("SET_LOADING", false));
  },

  // fetch single device
  SHOW_DEVICE: (context, deviceId) => {
    context.commit("SET_LOADING", true);
    Device.showDevice(deviceId)
      .then((res) => {
        context.commit("SET_DEVICE", res.data.data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => context.commit("SET_LOADING", false));
  },

  UPDATE_DEVICE: ({ dispatch, commit }, device) => {
    commit("SET_LOADING", true);
    Device.updateDevice(device)
      .then((res) => {
        if (res.data.error) {
          commit("SET_SUCCESS_MESSAGE", null);
          commit("SET_ERR_MESSAGE", res.data.error);
        } else {
          commit("SET_SUCCESS_MESSAGE", res.data);
          commit("SET_ERR_MESSAGE", null);
          dispatch("FETCH_DEVICES");
        }
      })
      .catch((err) => {
        console.log("err", err);
      })
      .finally(() => commit("SET_LOADING", false));
  },

  DELETE_DEVICE: ({ dispatch, commit }, deviceId) => {
    commit("SET_LOADING", true);
    Device.deleteDevice(deviceId)
      .then((res) => {
        if (res.data.error) {
          commit("SET_SUCCESS_MESSAGE", null);
          commit("SET_ERR_MESSAGE", res.data.error);
        } else {
          commit("SET_SUCCESS_MESSAGE", res.data);
          commit("SET_ERR_MESSAGE", null);
          dispatch("FETCH_DEVICES");
        }
      })
      .catch((err) => {
        console.log("err", err);
      })
      .finally(() => commit("SET_LOADING", false));
  },

  FETCH_DEVICE_LOGS: (context, deviceId) => {
    console.log('logs');
    Device.fetchDeviceLogs(deviceId)
      .then((res) => {
        context.commit("SET_DEVICE_LOGS", res.data.data);
      })
      .catch((error) => {
        console.log(error);
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
