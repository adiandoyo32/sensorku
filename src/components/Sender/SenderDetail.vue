<template>
  <v-layout>
    <v-row>
      <v-col lg="3" md="3" sm="6">
        <v-card :loading="loading">
          <v-card-title>
            {{ sender.name }}
          </v-card-title>
          <v-card-subtitle>
            <v-chip
              :color="
                sender.status == 'Active' ? 'teal lighten-1' : 'red lighten-1'
              "
              small
              text-color="white"
              label
            >
              {{ sender.status }}
            </v-chip>
          </v-card-subtitle>
          <v-card-text>
            {{ sender.sensor }}
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        
      </v-col>
    </v-row>
  </v-layout>
</template>

<script>
import axios from "axios";

export default {
  name: "SenderDetail",
  data() {
    return {
      id: this.$route.params.id,
      loading: true,
      sender: {
        name: "",
        sensor: "",
        status: "",
      },
    };
  },
  created() {
    this.getSender();
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
          this.loading = false;
        })
        .catch((error) => console.log(error));
    },
  },
  watch: {
    $route(to) {
      this.id = to.params.id;
      this.getSender();
    },
  },
};
</script>

<style>
</style>