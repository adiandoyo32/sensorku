<template>
  <v-card>
    <v-card-text>
      <v-data-table :headers="headers" :items="userDevices" sort-by="value">
        <template v-slot:top>
          <v-toolbar flat>
            <v-toolbar-title>Device</v-toolbar-title>
            <v-spacer></v-spacer>
            <!-- <v-btn @click.prevent="addLog" dark class="mb-2 mr-5">
              Add Log
            </v-btn> -->
          </v-toolbar>
        </template>
        <template v-slot:[`item.is_active`]="{ item }">
              <v-chip
                small
                :color="
                  item.is_active === 1 ? 'teal lighten-2' : 'red lighten-2'
                "
                dark
                >{{ item.is_active === 1 ? "Active" : "Inactive" }}</v-chip
              >
            </template>
        <template v-slot:no-data>
          <!-- <v-btn color="primary"> Reset </v-btn> -->
          <p>Device not found</p>
        </template>
      </v-data-table>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
    headers: [
      { text: "Name", align: "start", sortable: false, value: "device_id" },
      { text: "Sender", value: "sender_id", sortable: false },
      { text: "Sensor", value: "sensor_id", sortable: false },
      { text: "Status", align: "center", value: "is_active" },
    //   { text: "Actions", align: "center", value: "actions", sortable: false },
    ],
    };
  },
  props: ["userId"],

  computed: {
    userDevices() {
      return this.$store.getters["user/USER_DEVICES"];
    },
  },

  mounted() {
    this.$store.dispatch("user/FETCH_USER_DEVICES", this.userId);
  },
};
</script>

<style>
</style>