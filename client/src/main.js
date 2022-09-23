import Vue from "vue";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import router from "./router";
// import * as io from "socket.io-client";
// import VueSocketIO from "vue-socket.io";

// Vue
// .use
// new VueSocketIO({
//   debug: true,
//   connection: io("http://localhost:3000"), // options object is Optional
// })
// ();
Vue.config.productionTip = false;

new Vue({
  vuetify,
  router,
  render: (h) => h(App),
}).$mount("#app");
