<template>
  <v-layout>
    <v-row>
      <v-col lg="3" md="6" sm="12">
        <v-card :loading="loading">
          <v-card-title>
            <v-row no-gutters class="justify-space-between">
              <div>{{ sender.name }}</div>
              <v-icon color="lime darken-2" @click="openQrcode()">
                mdi-qrcode-scan
              </v-icon>
            </v-row>
          </v-card-title>
          <v-card-subtitle>
            <v-chip
              :color="
                sender.status == 'Active' ? 'teal lighten-2' : 'red lighten-2'
              "
              small
              text-color="white"
              label
            >
              {{ sender.status }}
            </v-chip>
          </v-card-subtitle>
          <v-card-text>
            <div class="display-1">
              {{ sender.sensor }}
              <v-icon :color="selectedSensorType.color"> {{ selectedSensorType.icon }} </v-icon>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12">
        <v-card>
          <v-card-title> Line Chart </v-card-title>
          <v-card-text>
            <apexchart
              type="line"
              height="350"
              :options="chartOptions"
              :series="series"
            ></apexchart>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12">
        <SenderLog :id="id" />
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
  </v-layout>
</template>

<script>
import axios from "axios";
import QrcodeVue from "qrcode.vue";
import SenderLog from "./SenderLog";

export default {
  name: "SenderDetail",
  components: {
    SenderLog,
    QrcodeVue,
  },
  data() {
    return {
      id: this.$route.params.id,
      loading: true,
      qrcodeValue: "",
      size: 180,
      dialogQrcode: false,
      sender: {
        name: "",
        sensor: "",
        status: "",
      },
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
      series: [
        {
          name: "Likes",
          data: [4, 3, 10, 9, 29, 19, 22, 9, 12, 7, 19, 5, 13, 9, 17, 2, 7, 5],
        },
      ],
      chartOptions: {
        chart: {
          height: 350,
          type: "line",
        },
        stroke: {
          width: 7,
          curve: "smooth",
        },
        xaxis: {
          type: "datetime",
          categories: [
            "1/11/2000",
            "2/11/2000",
            "3/11/2000",
            "4/11/2000",
            "5/11/2000",
            "6/11/2000",
            "7/11/2000",
            "8/11/2000",
            "9/11/2000",
            "10/11/2000",
            "11/11/2000",
            "12/11/2000",
            "1/11/2001",
            "2/11/2001",
            "3/11/2001",
            "4/11/2001",
            "5/11/2001",
            "6/11/2001",
          ],
          tickAmount: 10,
          labels: {
            formatter: function (value, timestamp, opts) {
              return opts.dateFormatter(new Date(timestamp), "dd MMM");
            },
          },
        },
        // title: {
        //   text: "Social Media",
        //   align: "left",
        //   style: {
        //     fontSize: "16px",
        //     color: "#666",
        //   },
        // },
        fill: {
          type: "gradient",
          gradient: {
            shade: "dark",
            gradientToColors: ["#FDD835"],
            shadeIntensity: 1,
            type: "horizontal",
            opacityFrom: 1,
            opacityTo: 1,
            stops: [0, 100, 100, 100],
          },
        },
        markers: {
          size: 4,
          colors: ["#FFA41B"],
          strokeColors: "#fff",
          strokeWidth: 2,
          hover: {
            size: 7,
          },
        },
        yaxis: {
          min: -10,
          max: 40,
          title: {
            text: "Engagement",
          },
        },
      },
    };
  },
  created() {
    this.getSender()
  },
  methods: {
    getSender() {
      axios({
        method: "GET",
        url: `https://add-blank.firebaseio.com/senders/${this.id}.json`,
        responseType: "json",
      })
        .then((res) => {
          this.sender.name = res.data.name;
          this.sender.sensor = res.data.sensor;
          this.sender.status = res.data.status;
          this.getSensorType(this.sender);
          this.loading = false;
        })
        .catch((error) => console.log(error));
    },

    openQrcode() {
      this.qrcodeValue = this.id;
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
      this.id = to.params.id;
      this.getSender();
    },
    // sender: function(from, to) {
    //   console.log(from, to);
    // }
  },
};
</script>

<style>
</style>