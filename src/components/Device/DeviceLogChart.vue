<template>
    <v-card>
      <v-card-title> Device Logs Chart </v-card-title>
      <v-card-text>
        <line-chart :data="[['Blueberry', 44], ['Strawberry', 23]]" :download="true"></line-chart>
      </v-card-text>
      <!-- <div>
          {{ dataSet }}
      </div> -->
    </v-card>
</template>

<script>
export default {
  data() {
    return {
      chartData: [
        // {
        //   name: "Device",
        //   data: [
        //     ["2020-01-01", 1],
        //     ["2020-01-02", 4],
        //     ["2017-01-03", 0],
        //   ],
        // },
        {
          name: "Devices",
        },
      ],
    };
  },

  props: ["deviceId"],

  computed: {
    dataSet() {
      return this.$store.getters["device/DEVICE_LOG_DATASET"];
    },
  },

  mounted() {
    // this.$store.dispatch("device/FETCH_DEVICE_LOGS", this.deviceId);
  },
};
</script>

<style>
</style>