import service from "./index";

const PATH = "api/devices";

export default {
  fetchDevice() {
    return service({
      method: "GET",
      url: PATH,
    });
  },

  createDevice(device) {
    return service({
      method: "POST",
      url: PATH,
      data: device
    })
  },

  showDevice(deviceId) {
    return service({
      method: "GET",
      url: `${PATH}/${deviceId}`,
    });
  },

  fetchDeviceLogs(deviceId) {
    return service({
      method: "GET",
      url: `${PATH}/${deviceId}/data`,
    });
  },

};
