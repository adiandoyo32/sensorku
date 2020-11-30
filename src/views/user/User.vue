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
            :items="userList"
            :search="search"
            :loading="loading"
          ></v-data-table>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  data() {
    return {
      search: "",
      headers: [
        { text: "Name", align: "start", value: "name" },
        { text: "Email", value: "email" },
        { text: "Picture", value: "profile_picture" },
      ],
    };
  },

  computed: {
    loading() {
      return this.$store.getters["user/IS_LOADING"];
    },
    userList() {
      return this.$store.getters["user/GET_USERS"];
    },
  },

  mounted() {
    this.$store.dispatch("user/FETCH_USERS");
  },
};
</script>

<style>
</style>