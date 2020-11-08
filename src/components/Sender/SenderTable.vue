<template>
  <v-card>
    <v-card-text>
      <v-data-table :headers="headers" :items="senders" :loading="loading">
        <template v-slot:top>
          <v-toolbar flat>
            <v-toolbar-title>Senders</v-toolbar-title>
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
                  New Sender
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
                            label="Name"
                            :rules="nameRules"
                            required
                          ></v-text-field>
                          <v-select
                            :items="sensor"
                            v-model="editedItem.sensor"
                            label="Sensor"
                            :rules="[(v) => !!v || 'Sensor is required']"
                            required
                          ></v-select>
                          <v-select
                            :items="status"
                            label="Status"
                            v-model="editedItem.status"
                            :rules="[(v) => !!v || 'Status is required']"
                            required
                          ></v-select>
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
                  <v-btn color="green darken-1" text @click="deleteItemConfirm"
                    >OK</v-btn
                  >
                  <v-spacer></v-spacer>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-toolbar>
        </template>
        <template v-slot:[`item.actions`]="{ item }">
          <v-icon
            color="teal lighten-2"
            small
            class="mr-4"
            @click="navigateSenderDetail(item)"
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
          <v-icon color="red darken-1" small @click="deleteItem(item)">
            mdi-delete
          </v-icon>
        </template>
        <template v-slot:no-data>
          <v-btn color="primary" @click="initialize"> Reset </v-btn>
        </template>
      </v-data-table>
    </v-card-text>
  </v-card>
</template>

<script>
// import { axios } from "../api";
import axios from "axios";
// import QRCode from "@chenfengyuan/vue-qrcode"
import QrcodeVue from "qrcode.vue";

export default {
  name: "SenderTable",
  data: () => ({
    qrcodeValue: "",
    size: 180,
    valid: true,
    loading: true,
    dialog: false,
    dialogQrcode: false,
    dialogDelete: false,
    headers: [
      {
        text: "Name",
        align: "start",
        sortable: false,
        value: "name",
      },
      { text: "Sensor", value: "sensor", sortable: false },
      { text: "Status", value: "status" },
      { text: "Actions", value: "actions", sortable: false },
    ],
    status: ["Active", "Deactive"],
    sensor: ["Turbility", "Suhu", "LDR", "Flow"],
    senders: [],
    editedIndex: -1,
    editedItem: {
      id: "",
      name: "",
      sensor: "",
      status: "",
    },
    defaultItem: {
      id: "",
      name: "",
      sensor: "",
      status: "",
    },
    nameRules: [(v) => !!v || "Name is required"],
    sensorRules: [(v) => !!v || "Sensor is required"],
  }),

  components: {
    QrcodeVue,
  },

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New Sender" : "Edit Sender";
    },
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

  created() {
    this.initialize();
  },

  methods: {
    initialize() {
      this.senders = [];
      axios({
        method: "GET",
        url: "https://add-blank.firebaseio.com/senders.json",
        responseType: "json",
      })
        .then((res) => {
          for (let key in res.data) {
            var data = {};
            data.id = key;
            data.name = res.data[key].name;
            data.sensor = res.data[key].sensor;
            // data.status = `<h1>asd</h1>`;
            data.status = res.data[key].status;
            this.senders.push(data);
          }
          this.loading = false
        })
        .catch((error) => console.log(error));
    },

    openQrcode(item) {
      this.qrcodeValue = item.id;
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
        let sender = this.editedItem;
        if (this.editedIndex > -1) {
          axios({
            method: "PATCH",
            url: `https://add-blank.firebaseio.com/senders/${sender.id}.json`,
            data: {
              name: sender.name,
              sensor: sender.sensor,
              status: sender.status,
            },
          })
            .then((res) => {
              console.log(res);
              this.initialize();
            })
            .catch((error) => console.log(error));
        } else {
          axios({
            method: "POST",
            url: "https://add-blank.firebaseio.com/senders.json",
            data: {
              name: sender.name,
              sensor: sender.sensor,
              status: sender.status,
            },
          })
            .then((res) => {
              console.log(res);
              this.initialize();
            })
            .catch((error) => console.log(error));
        }
        this.close();
      }
    },

    navigateSenderDetail(item) {
      let senderId = item.id;
      this.$router.push({ 
        name: "SenderDetail",
        params: { id: senderId }
      })
    },
  },
};
</script>

<style>
</style>