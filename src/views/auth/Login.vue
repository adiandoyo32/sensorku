<template>
  <v-row no-gutters align="center" justify="center">
    <v-col lg="4" md="4" sm="8">
      <v-card color="elevation-0 py-5">
        <v-card-title></v-card-title>
        <v-img src="@/assets/plant.svg" :aspect-ratio="4.0" contain />
        <v-card-text>
          <v-form ref="form" class="px-10">
            <v-text-field
              label="Username"
              v-model="username"
              :rules="usernameRules"
            >
            </v-text-field>
            <v-text-field
              label="Password"
              v-model="password"
              :rules="passwordRules"
              :type="showPassword ? 'text' : 'password'"
              :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
              @click:append="showPassword = !showPassword"
              @keyup.enter="validate"
            >
            </v-text-field>
            <v-row align="center" justify="center" class="pt-8">
              <v-btn color="teal darken-2" dark @click="validate">
                Login
              </v-btn>
            </v-row>
          </v-form>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  data() {
    return {
      username: "admin",
      password: 7894561230,
      usernameRules: [(v) => !!v || "Username is required"],
      passwordRules: [(v) => !!v || "Password is required"],
      rightUsername: "admin",
      rightPassword: 7894561230,
      showPassword: false,
    };
  },
  methods: {
    validate() {
      if (this.$refs.form.validate()) {
        if (this.username == this.rightUsername && this.password == this.rightPassword) {
          this.$router.push({name: 'Home'})
        } else {
          console.log('wrong username or password');
        }
      }
    },
  },
};
</script>

<style>
</style>