<template>
  <v-row>
    <v-col cols="12">
      <v-alert v-if="errMsg" color="red lighten-2" dismissible dark>
        <ul v-for="(item, i) in errMsg" :key="i">
          <li>{{ item[0] }}</li>
        </ul>
      </v-alert>
      <v-alert v-if="successMsg" color="teal lighten-2" dismissible dark>
        {{ successMsg.data.device_id }} {{ successMsg.message }}
      </v-alert>
      <v-card>
        <v-card-title>
          <v-spacer></v-spacer>
          <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="Search"
            single-line
            hide-details
          ></v-text-field>
        </v-card-title>
        <v-card-text>
          <v-data-table
            fixed-header
            height="350"
            :headers="headers"
            :items="userList"
            :loading="loading"
            :search="search"
          >
            <template v-slot:top>
              <v-toolbar flat>
                <v-toolbar-title>Users</v-toolbar-title>
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
                      New User
                    </v-btn>
                  </template>
                  <v-card class="pa-5">
                    <validation-observer
                      ref="observer"
                      v-slot="{ handleSubmit }"
                    >
                      <v-form @submit.prevent="handleSubmit(submit)">
                        <v-card-title>
                          <span class="headline">{{ formTitle }}</span>
                        </v-card-title>

                        <v-card-text>
                          <v-container>
                            <v-row>
                              <v-col cols="12">
                                <validation-provider
                                  v-slot="{ errors }"
                                  name="Name"
                                  rules="required"
                                >
                                  <v-text-field
                                    v-model="editedItem.name"
                                    label="Name"
                                    :error-messages="errors"
                                    required
                                  ></v-text-field>
                                </validation-provider>
                                <validation-provider
                                  v-slot="{ errors }"
                                  name="Email"
                                  rules="required|email"
                                >
                                  <v-text-field
                                    v-model="editedItem.email"
                                    label="Email"
                                    :error-messages="errors"
                                    required
                                  ></v-text-field>
                                </validation-provider>
                                <validation-provider
                                  v-slot="{ errors }"
                                  name="Password"
                                  rules="required|min:6|confirmed:confirmation"
                                  v-if="editedIndex === -1"
                                >
                                  <v-text-field
                                    v-model="editedItem.password"
                                    label="Password"
                                    :error-messages="errors"
                                    required
                                    v-if="editedIndex === -1"
                                  ></v-text-field>
                                </validation-provider>
                                <validation-provider
                                  v-slot="{ errors }"
                                  name="Confirmation"
                                  rules=""
                                  vid="confirmation"
                                  v-if="editedIndex === -1"
                                >
                                  <v-text-field
                                    v-model="editedItem.password_confirmation"
                                    label="Confirmation"
                                    :error-messages="errors"
                                    required
                                    v-if="editedIndex === -1"
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

                <v-dialog v-model="dialogDelete" max-width="500px">
                  <v-card>
                    <v-card-title class="headline"
                      >Are you sure you want to delete this user?</v-card-title
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
                @click="navigateUserDetail(item)"
              >
                mdi-information-outline
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
              <v-btn color="primary"> Reset </v-btn>
            </template>
          </v-data-table>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import { required, email, min, confirmed } from "vee-validate/dist/rules";
import {
  extend,
  ValidationObserver,
  ValidationProvider,
  setInteractionMode,
} from "vee-validate";

setInteractionMode("eager");

extend("required", {
  ...required,
  message: "{_field_} can not be empty.",
});

extend("email", {
  ...email,
  message: "{_field_} field must be a valid email.",
});

extend("min", {
  ...min,
  message: "Use 6 characters or more for your password.",
});

extend("confirmed", {
  ...confirmed,
  message: "{_field_} confirmation didn't match. Try again.",
});

export default {
  name: "User",
  components: {
    ValidationProvider,
    ValidationObserver,
  },
  data() {
    return {
      search: "",
      dialog: false,
      dialogDelete: false,
      headers: [
        { text: "Name", align: "start", value: "name" },
        { text: "Email", value: "email" },
        { text: "Picture", value: "profile_picture" },
        { text: "Actions", align: "center", value: "actions", sortable: false },
      ],
      editedIndex: -1,
      editedItem: {
        id: "",
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
      },
      defaultItem: {
        id: "",
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
      },
    };
  },

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New User" : "Edit User";
    },
    loading() {
      return this.$store.getters["user/IS_LOADING"];
    },
    userList() {
      return this.$store.getters["user/USERS"];
    },
    successMsg() {
      return this.$store.getters["user/SUCCESS_MESSAGE"];
    },
    errMsg() {
      return this.$store.getters["user/ERR_MESSAGE"];
    },
  },

  mounted() {
    this.$store.dispatch("user/FETCH_USERS");
  },

  methods: {
    editItem(item) {
      this.editedIndex = this.$store.getters["user/USERS"].indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      this.editedIndex = this.$store.getters["user/USERS"].indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },

    deleteItemConfirm() {
      let userId = this.editedItem.id;
      this.$store.dispatch("user/DELETE_USER", userId);
      this.closeDelete();
    },

    close() {
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
      this.$refs.observer.reset();
      this.dialog = false;
    },

    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    navigateUserDetail(item) {
      let userId = item.id;
      this.$router.push({
        name: "UserDetail",
        params: { id: userId },
      });
    },

    submit() {
      let user = {
        id: this.editedItem.id,
        name: this.editedItem.name,
        email: this.editedItem.email,
        password: this.editedItem.password,
        password_confirmation: this.editedItem.password_confirmation
      };
      if (this.editedIndex > -1) {
        this.$store.dispatch("user/UPDATE_USER", user);
      } else {
        this.$store.dispatch("user/CREATE_USER", user);
      }
      this.close();
    }
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
};
</script>

<style>
</style>