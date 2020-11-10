<template>
  <v-app>
    <component :is="$route.meta.layout">
      <router-view />
    </component>
    <!-- <NavBar />
    <AppBar />
    <v-main class="grey lighten-4">
      <v-container>
        <transition>
          <router-view />
        </transition>
      </v-container>
    </v-main> -->
  </v-app>
</template>

<script>
// import NavBar from "@/components/NavBar";
// import AppBar from "@/components/AppBar";
const default_layout = "default";


export default {
  name: "App",
  // components: {
  //   NavBar,
  //   AppBar,
  // },
  data() {
    return {
      drawer: true,
    }
  },
  methods:{
   layout() {
      const _layout = (this.$route.meta?.layout || default_layout) + "-layout"
      console.log(_layout)
      return _layout;
    }
  },
  computed: {
    
  }
};
</script>

<style lang="scss" scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  // text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
