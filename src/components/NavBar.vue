<template>
  <v-navigation-drawer
    permanent
    v-model="drawer"
    class="teal darken-2"
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
</template>

<script>
export default {
  data() {
    return {
      items: [
        { title: "Dashboard", icon: "mdi-view-dashboard", path: "/" },
        { title: "Devices", icon: "mdi-access-point", path: "/senders" },
        { title: "About", icon: "mdi-help-box", path: "/about" },
      ],
      right: null,
    };
  },
};
</script>