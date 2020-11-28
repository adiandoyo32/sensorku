<template>
  <v-card>
    <v-card-text>
      <v-data-table
        :headers="headers"
        :items="deviceLogs"
        sort-by="value"
      >
        <template v-slot:top>
          <v-toolbar flat>
            <v-toolbar-title>Device Logs</v-toolbar-title>
            <v-spacer></v-spacer>
            <!-- <v-btn @click.prevent="addLog" dark class="mb-2 mr-5">
              Add Log
            </v-btn> -->
            <!-- <v-btn dark @click.prevent="randomNtu">Random</v-btn> -->
          </v-toolbar>
        </template>
        <template v-slot:no-data>
          <!-- <v-btn color="primary"> Reset </v-btn> -->
          <p>Log not found</p>
        </template>
      </v-data-table>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  data: () => ({
    headers: [
      { text: "Device Name", sortable: false, value: "device_id"},
      { text: "Value", value: "value" },
    ],
  }),

  props: ["deviceId"],

  computed: {
    deviceLogs() {
      return this.$store.getters["device/DEVICE_LOGS"];
    },
  },

  mounted() {
    this.$store.dispatch("device/FETCH_DEVICE_LOGS", {
      deviceId: this.deviceId,
    });
  },

  methods: {},
};
</script>

<style>
</style>