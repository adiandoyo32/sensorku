<template>
  <v-card>
    <v-card-text>
      <v-data-table
        :headers="headers"
        :items="logs"
        sort-by="calories"
        :loading="loading"
      >
        <template v-slot:top>
          <v-toolbar flat>
            <v-toolbar-title>Logs</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn @click.prevent="addLog" dark class="mb-2 mr-5">
              Add Log
            </v-btn>
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
import { db } from "../../firebase/db";

export default {
  data: () => ({
    headers: [
      {
        text: "NTU",
        align: "center",
        sortable: false,
        value: "ntu",
      },
      { text: "Date", value: "created_at" },
    ],
    logs: [],
    loading: true,
  }),

  props: ["id"],

  mounted() {
    this.getLog();
  },

  methods: {
    async addLog() {
      await db
        .collection("logs")
        .doc(this.id)
        .collection("activities")
        .add({ ntu: this.randomNtu(), created_at: Date().toString() });
    },

    async getLog() {
      var logsRef = await db
        .collection("logs")
        .doc(this.id)
        .collection("activities");
      logsRef.onSnapshot((snap) => {
        snap.docChanges().forEach((change) => {
          if (change.type === "added") {
            var log = change.doc.data();
            log.id = change.doc.id;
            this.logs.unshift(log);
          }
        });
      });
      this.loading = false;
    },

    randomNtu() {
      return parseFloat((Math.random() * 100).toFixed(2));
    },
  },
};
</script>

<style>
</style>