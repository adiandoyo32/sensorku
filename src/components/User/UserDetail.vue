<template>
  <div>
    <v-row>
      <v-col lg="6" md="6" sm="12">
        <v-card :loading="loading">
          <v-card-title>
            <div>{{ user.name }}</div>
          </v-card-title>

          <v-card-text>
            <div class="display-1">
              {{ user.email }}
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userId: this.$route.params.id,
    };
  },
  computed: {
    user() {
      return this.$store.getters["user/USER"];
    },
    loading() {
      return this.$store.getters["user/IS_LOADING"];
    },
  },

  mounted() {
    this.$store.dispatch("user/SHOW_USER", this.userId);
  },

  methods: {
    findUser() {
      var users = this.$store.getters["user/USERS"];
      this.user = users.find(({ id }) => id === this.userId);
    },
  },

  watch: {
    $route(to) {
      this.userId = to.params.id;
      this.findUser();
    },
  },
};
</script>

<style>
</style>