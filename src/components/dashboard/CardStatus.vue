<template>
  <v-row>
    <v-col lg="3" md="4" sm="12" cols="12">
      <v-card>
        <v-card-text class="m-0">
          <v-list-item three-line>
            <v-list-item-content>
              <v-list-item-title>
                <span class="title font-weight-black"> {{ availableDevices }} </span>
              </v-list-item-title>
              <v-list-item-subtitle>
                <span class=""> Active Devices </span>
              </v-list-item-subtitle>
            </v-list-item-content>
            <v-list-item-avatar size="56">
              <v-icon size="56" color="teal lighten-2">
                mdi-access-point
              </v-icon>
            </v-list-item-avatar>
          </v-list-item>
        </v-card-text>
      </v-card>
    </v-col>
    <v-col lg="3" md="4" sm="12" cols="12">
      <v-card>
        <v-card-text class="m-0">
          <v-list-item three-line>
            <v-list-item-content>
              <v-list-item-title>
                <span class="title font-weight-black"> {{ unavailableDevices }} </span>
              </v-list-item-title>
              <v-list-item-subtitle>
                <span class=""> Inactive Devices </span>
              </v-list-item-subtitle>
            </v-list-item-content>
            <v-list-item-avatar size="56">
              <v-icon size="56" color="red lighten-2">
                mdi-access-point
              </v-icon>
            </v-list-item-avatar>
          </v-list-item>
        </v-card-text>
      </v-card>
    </v-col>
    <v-col lg="3" md="4" sm="12" cols="12">
      <v-card>
        <v-card-text class="m-0">
          <v-list-item three-line>
            <v-list-item-content>
              <v-list-item-title>
                <span class="title font-weight-black"> {{ userList }} </span>
              </v-list-item-title>
              <v-list-item-subtitle>
                <span> Users </span>
              </v-list-item-subtitle>
            </v-list-item-content>
            <v-list-item-avatar size="56">
              <v-icon size="56" color="blue-grey lighten-2">
                mdi-account-supervisor
              </v-icon>
            </v-list-item-avatar>
          </v-list-item>
        </v-card-text>
      </v-card>
    </v-col>
    <v-col lg="3" md="4" sm="12" cols="12">
      <v-card>
        <v-card-text class="m-0">
          <v-list-item three-line>
            <v-list-item-content>
              <v-list-item-title>
                <span class="title font-weight-black"> 0 </span>
              </v-list-item-title>
              <v-list-item-subtitle>
                <span class=""> Device Logs </span>
              </v-list-item-subtitle>
            </v-list-item-content>
            <v-list-item-avatar size="56">
              <v-icon size="56" color="blue lighten-2">
                mdi-android-messages
              </v-icon>
            </v-list-item-avatar>
          </v-list-item>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  computed: {
    availableDevices() {
      return this.$store.getters["dashboard/AVAILABLE_DEVICES"].length;
    },
    unavailableDevices() {
      return this.$store.getters["dashboard/UNAVAILABLE_DEVICES"].length;
    },
    userList() {
      return this.$store.getters["user/USERS"].length;
    },
  },

  mounted() {
    this.$store.dispatch("dashboard/FETCH_AVAILABLE_DEVICES");
    this.$store.dispatch("dashboard/FETCH_UNAVAILABLE_DEVICES");
    this.$store.dispatch("user/FETCH_USERS");
  },
};
</script>