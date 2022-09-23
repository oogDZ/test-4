<template>
  <v-app>
    <div v-if="ChecUrl()">
      <v-app-bar app clipped-left color="orange">
        <v-app-bar-title>
          <h3 class="text-h4 white--text">DateTable</h3>
        </v-app-bar-title>
      </v-app-bar>

      <v-navigation-drawer app clipped left>
        <v-list-item-group>
          <v-list-item
            v-for="item in menu_items"
            :key="item.id"
            router
            link
            @click="$router.push({ path: item.url })"
          >
            <v-list-item-title>
              {{ item.name }}
            </v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-navigation-drawer>
    </div>
    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>
<script>
console.log(window.location.pathname);
export default {
  data: () => ({
    menu_items: [
      {
        id: 0,
        name: "Drivers",
        url: "/drivers",
      },
      {
        id: 1,
        name: "Vechicle",
        url: "/vechicles",
      },
    ],
  }),
  methods: {
    ChecUrl() {
      console.log(window.location.pathname);
      if (window.location.pathname == "/login") {
        return false;
      } else {
        return true;
      }
    },
  },
  name: "App",
};
</script>
