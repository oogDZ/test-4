<template>
  <v-data-table
    :headers="headers"
    :items="drivers"
    sort-by="calories"
    class="elevation-1"
  >
    <template v-slot:item="{ item }">
      <tr>
        <td>{{ item.name }}</td>
        <td>
          <v-icon small class="mr-2" @click="editItem(item)">
            mdi-pencil
          </v-icon>
          <v-icon small @click="deleteItem(item)"> mdi-delete </v-icon>
        </td>
        <td>
          <v-select
            v-model="item.vechicleId"
            v-on:change="SetDriverToVechile(item.vechicleId, item.id)"
            :items="getFreeVechicles(item.id)"
            item-value="id"
            item-text="name"
            class="select"
          ></v-select>

          <!--   -->
        </td>
      </tr>
    </template>
    <template v-slot:top>
      <v-toolbar flat
        >!vechicle.driverId

        <v-toolbar-title>My CRUD</v-toolbar-title>
        <v-divider class="mx-4" inset vertical></v-divider>
        <v-spacer></v-spacer>
        <v-dialog v-model="dialog" max-width="500px">
          <template v-slot:activator="{ on, attrs }">
            <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">
              New Item
            </v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="text-h5">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      v-model="editedItem.name"
                      label="Dessert name"
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="close"> Cancel </v-btn>
              <v-btn color="blue darken-1" text @click="save"> Save </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-dialog v-model="dialogDelete" max-width="500px">
          <v-card>
            <v-card-title class="text-h5"
              >Are you sure you want to delete this item?</v-card-title
            >
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="closeDelete"
                >Cancel</v-btn
              >
              <v-btn color="blue darken-1" text @click="deleteItemConfirm"
                >OK</v-btn
              >
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <template v-slot:no-data>
      <v-btn color="primary" @click="initialize"> Reset </v-btn>
    </template>
  </v-data-table>
</template>
<script>
//import { vechicles, driversI } from "./vechicles.js";
import io from "socket.io-client";

export default {
  data: () => ({
    dialog: false,
    dialogDelete: false,
    input: {
      userId: 0,
    },

    //VechicleFiltered: [],
    headers: [
      {
        text: "Dessert (100g serving)",
        align: "start",
        sortable: false,
        value: "name",
      },

      { text: "Actions", value: "actions", sortable: false },
      { text: "Cars", value: "cars" },
    ],
    drivers: [],
    vechicles: [],
    editedIndex: -1,
    editedItem: {
      name: "",
    },
    defaultItem: {
      name: "",
    },
    socket: undefined,
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New Item" : "Edit Item";
    },
  },

  watch: {
    dialog(val) {
      val || this.close();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    },
  },

  created() {
    this.initialize();
  },
  methods: {
    getFreeVechicles(driverId) {
      // console.log(
      //   "qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq",
      //   this.vechicles,
      //   driverId
      // );
      return this.vechicles.filter(
        (vechicle) => !vechicle.driverId || vechicle.driverId === driverId
      );
    },
    SetDriverToVechile(vechicleId, driverId) {
      console.log(
        "... [SetDriverToVechile] vechicleId, driverId",
        vechicleId,
        driverId,
        this.drivers
      );
      this.vechicles.forEach((vechicle) => {
        if (vechicle.driverId == driverId) {
          vechicle.driverId = null;
          console.log("djjjjjjjjjjlshfksdhkfhmsafjbsdjfhdbhu");
        }
        if (vechicle.id == vechicleId) {
          vechicle.driverId = driverId;
        }
        console.log(vechicle.driverId, driverId);
      });
      this.socket.emit("setVechicles", { data: this.vechicles });
      this.socket.emit("setDrivers", { data: this.drivers });
    },
    // VechicleFilter(driverId) {
    //   console.log("... before filter:", this.vechicles);
    //   let names = [];
    //   this.vechicles.forEach((vehicle) => {
    //     if (vehicle.driverId == null || vehicle.driverId == driverId) {
    //       console.log();
    //       names.push({
    //         name: vehicle.name,
    //         id: vehicle.id,
    //       });
    //     }
    //   });
    //   console.log("... after filter:", names);
    //   return names;
    // },
    initialize() {
      this.socket = io("http://localhost:3000");
      this.socket.on("getDrivers", ({ data }) => {
        console.log("..................... getDrivers:", data, this);
        this.drivers = data;
      });
      this.socket.emit("getDrivers");

      this.socket.on("getVechicles", ({ data }) => {
        console.log("..................... getVechicles:", data, this);
        this.vechicles = data;
        console.log("dnfsmmmmmmmmmmmm,", this.vechicles);
        // this.VechicleFiltered = this.VechicleFilter(null);
      });
      this.socket.emit("getVechicles");
    },

    editItem(item) {
      this.editedIndex = this.drivers.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      this.editedIndex = this.drivers.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },

    deleteItemConfirm() {
      this.drivers.splice(this.editedIndex, 1);
      this.closeDelete();
      this.socket.emit("setDrivers", { data: this.drivers });
    },

    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    save() {
      if (this.editedIndex > -1) {
        Object.assign(this.drivers[this.editedIndex], this.editedItem);
      } else {
        this.drivers.push(this.editedItem);
      }
      this.socket.emit("setDrivers", { data: this.drivers });
      this.close();
    },
  },
};
//vechicle.
</script>
<style>
.select {
  max-width: 200px;
  max-height: 200px;
  font-size: 15px;
}
</style>
