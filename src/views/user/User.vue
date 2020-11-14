<template>
  <v-row>
    <v-col cols="12">
      <v-card>
        <v-card-title>
          Users
          <v-spacer></v-spacer>
          <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="Search"
            single-line
            hide-details
          ></v-text-field>
        </v-card-title>
        <v-card-text>

        <v-data-table
          :headers="headers"
          :items="users"
          :search="search"
          :loading="loading"
        ></v-data-table>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import Axios from "axios";
export default {
  data() {
    return {
      search: "",
      loading: true,
      headers: [
        {
          text: "Name",
          align: "start",
          filterable: false,
          value: "name",
        },
        { text: "Username", value: "username" },
        { text: "Email", value: "email" },
        { text: "Phone", value: "phone" },
      ],
      users: [],
    };
  },
  created() {
    this.getUser();
  },
  methods: {
    getUser() {
      Axios({
        method: "GET",
        url: "https://jsonplaceholder.typicode.com/users",
        responseType: "json",
      })
        .then((res) => {
            this.users = res.data;
          this.loading = false;
        })
        .catch((error) => console.log(error));
    },
  },
};
</script>

<style>
</style>