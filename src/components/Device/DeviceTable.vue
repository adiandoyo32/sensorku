<template>
  <v-row>
    <v-col>
      <v-alert v-if="errMsg" color="red lighten-2" dismissible dark>
        <ul v-for="(item, i) in errMsg" :key="i">
          <li>{{ item[0] }}</li>
        </ul>
      </v-alert>
      <v-alert v-if="successMsg" color="teal lighten-2" dismissible dark>
        {{ successMsg.data.device_id }} {{ successMsg.message }}
      </v-alert>
      <v-card>
        <v-card-text>
          <v-data-table
            :headers="headers"
            :items="deviceList"
            :loading="loading"
          >
            <template v-slot:top>
              <v-toolbar flat>
                <v-toolbar-title>Devices</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-dialog v-model="dialog" persistent max-width="500px">
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn
                      color="primary"
                      dark
                      class="mb-2"
                      v-bind="attrs"
                      v-on="on"
                    >
                      New Device
                    </v-btn>
                  </template>
                  <v-card class="pa-5">
                    <validation-observer
                      ref="observer"
                      v-slot="{ handleSubmit }"
                    >
                      <v-form @submit.prevent="handleSubmit(save)">
                        <v-card-title>
                          <span class="headline">{{ formTitle }}</span>
                        </v-card-title>

                        <v-card-text>
                          <v-container>
                            <v-row>
                              <v-col cols="12">
                                <validation-provider
                                  v-slot="{ errors }"
                                  name="Device Name"
                                  rules="required"
                                  v-if="editedIndex === -1"
                                >
                                  <v-text-field
                                    v-model="editedItem.device_id"
                                    label="Device Name"
                                    :error-messages="errors"
                                    required
                                    v-if="editedIndex === -1"
                                  ></v-text-field>
                                </validation-provider>
                                <validation-provider
                                  v-slot="{ errors }"
                                  name="Sender"
                                  rules="required"
                                >
                                  <v-text-field
                                    v-model="editedItem.sender_id"
                                    label="Sender"
                                    :error-messages="errors"
                                    required
                                  ></v-text-field>
                                </validation-provider>
                                <validation-provider
                                  v-slot="{ errors }"
                                  name="Sensor"
                                  rules="required"
                                >
                                  <v-text-field
                                    v-model="editedItem.sensor_id"
                                    label="Sensor"
                                    :error-messages="errors"
                                    required
                                  ></v-text-field>
                                </validation-provider>
                                <validation-provider
                                  v-slot="{ errors }"
                                  name="Status"
                                  rules="required"
                                >
                                  <v-select
                                    :items="status"
                                    :error-messages="errors"
                                    item-text="state"
                                    item-value="abbr"
                                    label="Status"
                                    data-vv-name="status"
                                    v-model="editedItem.is_active"
                                  ></v-select>
                                </validation-provider>
                              </v-col>
                              <v-col cols="12" sm="6" md="6">
                                <validation-provider
                                  v-slot="{ errors }"
                                  name="Latitude"
                                  rules="required|double"
                                >
                                  <v-text-field
                                    v-model="editedItem.lat"
                                    label="Latitude"
                                    :error-messages="errors"
                                  ></v-text-field>
                                </validation-provider>
                              </v-col>
                              <v-col cols="12" sm="6" md="6">
                                <validation-provider
                                  v-slot="{ errors }"
                                  name="Longitude"
                                  rules="required|double"
                                >
                                  <v-text-field
                                    v-model="editedItem.long"
                                    label="Longitude"
                                    :error-messages="errors"
                                  ></v-text-field>
                                </validation-provider>
                              </v-col>
                            </v-row>
                          </v-container>
                        </v-card-text>

                        <v-card-actions>
                          <v-spacer></v-spacer>
                          <v-btn
                            color="blue darken-1"
                            class="mr-4"
                            text
                            @click="close"
                          >
                            Cancel
                          </v-btn>
                          <v-btn color="primary" type="submit"> Save </v-btn>
                        </v-card-actions>
                      </v-form>
                    </validation-observer>
                  </v-card>
                </v-dialog>

                <v-dialog v-model="dialogQrcode" max-width="290">
                  <v-card>
                    <v-card-title class="headline"> QrCode </v-card-title>
                    <v-card-text>
                      <div class="text-center mt-4">
                        <qrcode-vue
                          :value="qrcodeValue"
                          :size="size"
                          level="H"
                        ></qrcode-vue>
                      </div>
                    </v-card-text>

                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn
                        color="green darken-1"
                        text
                        @click="dialogQrcode = false"
                      >
                        Close
                      </v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>

                <v-dialog v-model="dialogDelete" max-width="500px">
                  <v-card>
                    <v-card-title class="headline"
                      >Are you sure you want to delete this item?</v-card-title
                    >
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn color="green darken-1" text @click="closeDelete"
                        >Cancel</v-btn
                      >
                      <v-btn
                        color="green darken-1"
                        text
                        @click="deleteItemConfirm"
                        >OK</v-btn
                      >
                      <v-spacer></v-spacer>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
              </v-toolbar>
            </template>
            <template v-slot:[`item.is_active`]="{ item }">
              <v-chip
                small
                :color="
                  item.is_active === 1 ? 'teal lighten-2' : 'red lighten-2'
                "
                dark
                >{{ item.is_active === 1 ? "Active" : "Inactive" }}</v-chip
              >
            </template>
            <template v-slot:[`item.actions`]="{ item }">
              <v-icon
                color="teal lighten-2"
                small
                class="mr-4"
                @click="navigateDeviceDetail(item)"
              >
                mdi-information-outline
              </v-icon>
              <v-icon
                color="lime darken-2"
                small
                class="mr-4"
                @click="openQrcode(item)"
              >
                mdi-qrcode-scan
              </v-icon>
              <v-icon
                color="blue lighten-2"
                small
                class="mr-4"
                @click="editItem(item)"
              >
                mdi-pencil
              </v-icon>
              <v-icon
                color="red lighten-2"
                class="mr-4"
                small
                @click="deleteItem(item)"
              >
                mdi-delete
              </v-icon>
            </template>
            <template v-slot:no-data>
              <v-btn color="primary" @click="initialize"> Reset </v-btn>
            </template>
          </v-data-table>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import { required, double } from "vee-validate/dist/rules";
import {
  extend,
  ValidationObserver,
  ValidationProvider,
  setInteractionMode,
} from "vee-validate";
import QrcodeVue from "qrcode.vue";

setInteractionMode("eager");

extend("required", {
  ...required,
  message: "{_field_} can not be empty",
});

extend("double", {
  ...double,
  message: "Invalid {_field_} value",
});

export default {
  name: "SenderTable",
  data: () => ({
    qrcodeValue: "",
    size: 180,
    dialog: false,
    dialogQrcode: false,
    dialogDelete: false,
    headers: [
      { text: "Name", align: "start", sortable: false, value: "device_id" },
      { text: "Sender", value: "sender_id", sortable: false },
      { text: "Sensor", value: "sensor_id", sortable: false },
      { text: "Status", align: "center", value: "is_active" },
      { text: "Actions", align: "center", value: "actions", sortable: false },
    ],
    status: [
      { state: "Active", abbr: 1 },
      { state: "Inactive", abbr: 0 },
    ],
    sensor: ["Turbidity", "Suhu", "LDR", "Flow"],
    editedIndex: -1,
    device: {},
    editedItem: {
      id: "",
      device_id: "",
      sender_id: "",
      sensor_id: "",
      is_active: "",
      lat: "",
      long: "",
    },
    defaultItem: {
      id: "",
      device_id: "",
      sender_id: "",
      sensor_id: "",
      is_active: "",
      lat: "",
      long: "",
    },
    // nameRules: [(v) => !!v || "Name is required"],
    // senderRules: [(v) => !!v || "Sender is required"],
    // sensorRules: [(v) => !!v || "Sensor is required"],
    // latitudeRules: [
    //   (v) => !!v || "Langitude is required",
    //   (v) => /^-?\d+(\.\d+)?$/.test(v) || "Invalid input",
    // ],
    // longitudeRules: [
    //   (v) => !!v || "Longitude is required",
    //   (v) => /^-?\d+(\.\d+)?$/.test(v) || "Invalid input",
    // ],
  }),

  components: {
    QrcodeVue,
    ValidationProvider,
    ValidationObserver,
  },

  watch: {
    dialog(val) {
      val || this.close();
    },
    dialogQrcode(val) {
      val || this.closeQrcode();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    },
  },

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New Device" : "Edit Device";
    },
    deviceList() {
      return this.$store.getters["device/DEVICES"];
    },
    loading() {
      return this.$store.getters["device/IS_LOADING"];
    },
    successMsg() {
      return this.$store.getters["device/SUCCESS_MESSAGE"];
    },
    errMsg() {
      return this.$store.getters["device/ERR_MESSAGE"];
    },
  },

  mounted() {
    this.$store.dispatch("device/FETCH_DEVICES");
  },

  methods: {
    openQrcode(item) {
      this.qrcodeValue = item.device_id;
      this.dialogQrcode = true;
    },

    editItem(item) {
      this.editedIndex = this.$store.getters["device/DEVICES"].indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      this.editedIndex = this.$store.getters["device/DEVICES"].indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },

    deleteItemConfirm() {
      let deviceId = this.editedItem.device_id;
      this.$store.dispatch("device/DELETE_DEVICE", deviceId);
      this.closeDelete();
    },

    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
      this.$refs.observer.reset()
    },

    closeQrcode() {
      this.dialogQrcode = false;
    },

    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    save() {
      let device = {
        id: this.editedItem.id,
        device_id: this.editedItem.device_id,
        sender_id: this.editedItem.sender_id,
        sensor_id: this.editedItem.sensor_id,
        is_active: this.editedItem.is_active,
        lat: this.editedItem.lat,
        long: this.editedItem.long,
      };
      if (this.editedIndex > -1) {
        this.$store.dispatch("device/UPDATE_DEVICE", device);
      } else {
        this.$store.dispatch("device/CREATE_DEVICE", device);
      }
      this.close();
    },

    navigateDeviceDetail(item) {
      let deviceId = item.device_id;
      this.$router.push({
        name: "DeviceDetail",
        params: { id: deviceId },
      });
    },
  },
};
</script>

<style>
</style>