<template>
  <v-row>
    <v-col>
      <v-alert v-if="errMsg" color="red lighten-2" dismissible dark>
          <ul v-for="(item, i) in errMsg" :key="i">
            <li>{{ item[0] }} </li>
          </ul>  
      </v-alert>
      <v-alert v-if="successMsg" color="teal lighten-2" dismissible dark>
          {{ successMsg.device_id }} device created successfully!
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
                    <v-form
                      ref="form"
                      v-model="valid"
                      @submit.prevent="save"
                      lazy-validation
                    >
                      <v-card-title>
                        <span class="headline">{{ formTitle }}</span>
                      </v-card-title>

                      <v-card-text>
                        <v-container>
                          <v-row>
                            <v-col cols="12">
                              <v-text-field
                                v-model="editedItem.name"
                                label="Device Name"
                                :rules="nameRules"
                                required
                              ></v-text-field>
                              <v-text-field
                                v-model="editedItem.sender"
                                label="Sender"
                                :rules="senderRules"
                                required
                              ></v-text-field>
                              <v-text-field
                                v-model="editedItem.sensor"
                                label="Sensor"
                                :rules="sensorRules"
                                required
                              ></v-text-field>
                              <v-select
                                :items="status"
                                item-text="state"
                                item-value="value"
                                label="Status"
                                v-model="editedItem.status"
                                :rules="[(v) => !!v || 'Status is required']"
                              ></v-select>
                            </v-col>
                            <v-col cols="12" sm="6" md="6">
                              <v-text-field
                                v-model="editedItem.lat"
                                label="Latitude"
                                :rules="latitudeRules"
                              ></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6" md="6">
                              <v-text-field
                                v-model="editedItem.long"
                                label="Longitude"
                                :rules="longitudeRules"
                              ></v-text-field>
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
                        <v-btn color="teal" dark type="submit"> Save </v-btn>
                      </v-card-actions>
                    </v-form>
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
import axios from "axios";
import QrcodeVue from "qrcode.vue";

export default {
  name: "SenderTable",
  data: () => ({
    qrcodeValue: "",
    size: 180,
    valid: true,
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
    status: ["Active", "Inactive"],
    sensor: ["Turbidity", "Suhu", "LDR", "Flow"],
    senders: [],
    editedIndex: -1,
    editedItem: {
      id: "",
      name: "",
      sender: "",
      sensor: "",
      status: "",
      lat: "",
      long: "",
    },
    defaultItem: {
      id: "",
      name: "",
      sender: "",
      sensor: "",
      status: "",
      lat: "",
      long: "",
    },
    nameRules: [(v) => !!v || "Name is required"],
    senderRules: [(v) => !!v || "Sender is required"],
    sensorRules: [(v) => !!v || "Sensor is required"],
    latitudeRules: [
      (v) => !!v || "Langitude is required",
      (v) => /^-?\d+(\.\d+)?$/.test(v) || "Invalid input",
    ],
    longitudeRules: [
      (v) => !!v || "Longitude is required",
      (v) => /^-?\d+(\.\d+)?$/.test(v) || "Invalid input",
    ],
    device: {},
  }),

  components: {
    QrcodeVue,
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
      this.editedIndex = this.senders.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      this.editedIndex = this.senders.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },

    deleteItemConfirm() {
      let sender = this.editedItem;
      axios({
        method: "DELETE",
        url: `https://add-blank.firebaseio.com/senders/${sender.id}.json`,
      })
        .then((res) => {
          console.log(res);
          this.initialize();
        })
        .catch((error) => console.log(error));
      this.closeDelete();
    },

    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
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
      if (this.$refs.form.validate()) {
        let device = {
          id: this.editedItem.id,
          device_id: this.editedItem.name,
          sender_id: this.editedItem.sender,
          sensor_id: this.editedItem.sensor,
          status: this.editedItem.status == "Active" ? 1 : 0,
          lat: this.editedItem.lat,
          long: this.editedItem.long,
        };

        if (this.editedIndex > -1) {
          console.log("update", device);

          // axios({
          //   method: "PATCH",
          //   url: `https://add-blank.firebaseio.com/senders/${sender.id}.json`,
          //   data: {
          //     name: sender.name,
          //     sensor: sender.sensor,
          //     status: sender.status,
          //   },
          // })
          //   .then((res) => {
          //     console.log(res);
          //     this.initialize();
          //   })
          //   .catch((error) => console.log(error));
        } else {
          this.$store.dispatch("device/CREATE_DEVICE", device);
        }
        this.close();
      }
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