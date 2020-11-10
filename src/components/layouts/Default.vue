<template>
  <div>
    <NavBar />
    <AppBar />
    <v-main class="grey lighten-4">
      <v-container>
        <transition>
          <slot />
        </transition>
      </v-container>
    </v-main>
  </div>
</template>

<script>
import NavBar from "@/components/NavBar";
import AppBar from "@/components/AppBar";

export default {
  components: {
    NavBar,
    AppBar,
  },
};
</script>
