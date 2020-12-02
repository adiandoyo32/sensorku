<template>
  <v-row no-gutters align="center" justify="center">
    <v-col lg="4" md="4" sm="8">
      <v-card color="elevation-0 py-5">
        <v-card-title></v-card-title>
        <v-img src="@/assets/plant.svg" :aspect-ratio="4.0" contain />
        <v-card-text>
          <v-form ref="form" @submit.prevent="submit" class="px-10">
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
              @keydown.enter.prevent="submit"
            >
            </v-text-field>
            <v-row align="center" justify="center" class="pt-8">
              <v-btn color="teal darken-2" dark type="submit"> Login </v-btn>
            </v-row>
          </v-form>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
// import axios from "@/services";
import axios from "axios";

export default {
  data() {
    return {
      username: "",
      password: "",
      usernameRules: [(v) => !!v || "Username is required"],
      passwordRules: [(v) => !!v || "Password is required"],
      showPassword: false,
      client_secret: ""
    };
  },
  methods: {
    async submit() {
      if (this.$refs.form.validate()) {
        await axios({
          method: "GET",
          url: 'http://127.0.0.1:8000/api/get-client',
        })
          .then((res) => {
            this.client_secret = res.data.data.secret;
            axios({
              method: "POST",
              url: 'http://127.0.0.1:8000/oauth/token',
              data: {
                grant_type: 'password',
                client_id: "2",
                client_secret: this.client_secret,
                username: this.username,
                password: this.password
              }
            }).then((res) => {
              localStorage.setItem('token', res.data.access_token);
              this.$router.push('/dashboard');
            }).catch((err) => {
              console.log('err' + err);
            })
          })
          .catch((error) => console.log('error ',error));
      }
    },
  },
};
</script>

<style>
</style>