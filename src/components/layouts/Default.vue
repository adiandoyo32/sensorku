<template>
  <v-main class="grey lighten-4">
    <v-app-bar app>
      <v-app-bar-nav-icon @click.stop="toggle"></v-app-bar-nav-icon>
      <v-toolbar-title>Application</v-toolbar-title>
      <v-spacer></v-spacer>

      <v-btn icon>
        <v-icon>mdi-bell</v-icon>
      </v-btn>
      <v-menu
        origin="center center"
        transition="scale-transition"
        :nudge-bottom="16"
        offset-y
      >
        <template v-slot:activator="{ on, attrs }">
          <v-btn icon v-bind="attrs" v-on="on">
            <v-avatar dark size="36">
              <v-icon color=""> mdi-account-circle </v-icon>
            </v-avatar>
          </v-btn>
        </template>
        <v-list>
          <v-list-item-group>
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title> Option 1 </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title> Option 2 </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title> Option 3 </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item @click="logout">
              <v-list-item-content>
                <v-list-item-title> Logout </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-menu>
    </v-app-bar>

    <v-navigation-drawer
      v-model="drawer"
      class="teal darken-2"
      floating
      dark
      app
    >
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="title"> Sensorku </v-list-item-title>
          <v-list-item-subtitle> Vue Js </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list dense nav>
        <v-list-item
          v-for="item in items"
          :key="item.title"
          :to="item.path"
          exact-active-class=""
          link
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-container fluid>
      <transition>
        <slot />
      </transition>
    </v-container>
  </v-main>
</template>

<script>
// import NavBar from "@/components/NavBar";
// import AppBar from "@/components/AppBar";

export default {
  // components: {
  //   NavBar,
  //   AppBar,
  // },
  data() {
    return {
      items: [
        { title: "Dashboard", icon: "mdi-view-dashboard", path: "/dashboard" },
        { title: "Devices", icon: "mdi-access-point", path: "/devices" },
        { title: "About", icon: "mdi-help-box", path: "/about" },
      ],
      drawer: true,
    };
  },
  methods: {
    toggle() {
      this.drawer = !this.drawer;
    },
    logout() {
      this.$router.push({ name: "Login" });
    },
  },
};
</script>
