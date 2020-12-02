import service from './index';

const PATH = 'api/devices';

export default {
    fetchAvailableDevices() {
      return service({
        method: "GET",
        url: `${PATH}/get-available-devices`,
      });
    },

    fetchUnavailableDevices() {
      return service({
        method: "GET",
        url: `${PATH}/get-unavailable-devices`,
      });
    },
  };
  