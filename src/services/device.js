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
      data: device,
    });
  },

  showDevice(deviceId) {
    return service({
      method: "GET",
      url: `${PATH}/${deviceId}`,
    });
  },

  updateDevice(device) {
    return service({
      method: "PATCH",
      url: `${PATH}/${device.device_id}`,
      data: device,
    });
  },

  deleteDevice(deviceId) {
    return service({
      method: "DELETE",
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
