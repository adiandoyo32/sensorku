<template>
  <div>
    <v-row>
      <v-col cols="12" lg="3" md="6" sm="12">
        <v-card :loading="loading">
          <v-card-title>
            <v-row no-gutters class="justify-space-between">
              <div>{{ device.device_id }}</div>
              <v-icon color="lime darken-2" @click="openQrcode()">
                mdi-qrcode-scan
              </v-icon>
            </v-row>
          </v-card-title>
          <v-card-subtitle>
            <v-chip
              :color="
                device.is_active == 1 ? 'teal lighten-2' : 'red lighten-2'
              "
              small
              text-color="white"
              label
            >
              {{ device.is_active == 1 ? "Active" : "Inactive" }}
            </v-chip>
          </v-card-subtitle>
          <v-card-text>
            <div class="display-1">
              {{ device.sensor_id }}
              {{ device.sender_id }}
              <v-icon :color="selectedSensorType.color">
                {{ selectedSensorType.icon }}
              </v-icon>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12">
        <v-card class="overflow-hidden">
          <Map />
        </v-card>
      </v-col>
      <v-col cols="12">
          <DeviceDailyLog :deviceId="deviceId" />
      </v-col>
      <v-col cols="12">
        <!-- <DeviceLogChart :deviceId="deviceId" /> -->
      </v-col>
      <v-col cols="12">
        <DeviceLog :deviceId="deviceId" />
      </v-col>
    </v-row>
    <v-dialog v-model="dialogQrcode" max-width="290">
      <v-card>
        <v-card-title class="headline"> QrCode </v-card-title>
        <v-card-text>
          <div class="text-center mt-4">
            <qrcode-vue
              :value="qrcodeValue"
              :size="size"
              level="H"
            ></qrcode-vue>
          </div>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" text @click="dialogQrcode = false">
            Close
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import QrcodeVue from "qrcode.vue";
import DeviceLog from "./DeviceLog.vue";
// import DeviceLogChart from "./DeviceLogChart.vue";
import DeviceDailyLog from "./DeviceDailyLog.vue";
import Map from "@/components/shared/Map.vue";

export default {
  name: "DeviceDetail",
  components: {
    DeviceLog,
    // DeviceLogChart,
    DeviceDailyLog,
    QrcodeVue,
    Map,
  },
  data() {
    return {
      deviceId: this.$route.params.id,
      // device: {
      //   id: null,
      //   is_active: null,
      //   lat: 0,
      //   long: 0,
      //   sender_id: '',
      //   sensor_id: '',
      //   user_id: '',
      // },
      qrcodeValue: "",
      size: 180,
      dialogQrcode: false,
      sensorType: {
        turbidity: { icon: "mdi-wave", color: "brown lighten-2" },
        suhu: { icon: "mdi-thermometer", color: "red lighten-2" },
        ldr: { icon: "mdi-lightbulb-on", color: "yellow darken-2" },
        flow: { icon: "mdi-waves", color: "blue lighten-2" },
        unknown: { icon: "mdi-help", color: "black lighten-2" },
      },
      selectedSensorType: {
        icon: "",
        color: "",
      },
    };
  },

  computed: {
    device() {
      return this.$store.getters["device/DEVICE"];
    },
    loading() {
      return this.$store.getters["device/IS_LOADING"];
    },
  },

  mounted() {
    this.$store.dispatch("device/SHOW_DEVICE", this.deviceId);
  },

  methods: {
    findDevice() {
      var devices = this.$store.getters["device/DEVICES"];
      this.device = devices.find(
        ({ device_id }) => device_id === this.deviceId
      );
    },

    openQrcode() {
      this.qrcodeValue = this.deviceId;
      this.dialogQrcode = true;
    },

    /**
     * * set to type
     * @typedef Sender
     * @property {string} sensor
     *
     * @param {Sender} sender
     *
     */
    getSensorType(sender) {
      switch (sender.sensor) {
        case "Turbidity":
          this.selectedSensorType = this.sensorType.turbidity;
          break;
        case "Suhu":
          this.selectedSensorType = this.sensorType.suhu;
          break;
        case "LDR":
          this.selectedSensorType = this.sensorType.ldr;
          break;
        case "Flow":
          this.selectedSensorType = this.sensorType.flow;
          break;
        default:
          this.selectedSensorType = this.sensorType.unknown;
      }
    },
  },
  watch: {
    $route(to) {
      this.deviceId = to.params.id;
      this.findDevice();
    },
  },
};
</script>
