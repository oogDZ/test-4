import Vue from "vue";
import VueRouter from "vue-router";
import Drivers from "../components/DriversTable.vue"; //"   /components/";
import Vechicle from "../components/VechiclesTable.vue";
import LoginPage from "../components/LoginPage.vue";
import cookie from "vue-cookie";
//import cookies from "vue-cookie";
Vue.use(VueRouter);
const routes = [
  {
    path: "/drivers",
    name: "drivers",
    component: Drivers,
  },
  {
    path: "/vechicles",
    name: "vechicles",
    component: Vechicle,
  },
  {
    path: "/login",
    name: "login",
    component: LoginPage,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});
router.beforeEach(async (to, from, next) => {
  console.log(":::", to.name, from);
  const currentUser = cookie.get("test");
  console.log(currentUser !== null, to.name !== "login");
  if (to.name !== "login" && currentUser == null) {
    next({ name: "login" });
  } else {
    console.log(to.name);
    next();
  }

  // // redirect to login page if not logged in and trying to access a restricted page
  // //const { authorize } = to.meta;
  //
  // console.log(to);
  // console.log(from);
  // if (!currentUser && to.name !== "Login") {
  //   console.log("fsdjfdsj");
  //   // not logged in so redirect to login page with the return url
  //   return { name: "Login" };
  // } else {
  //   console.log("dsdddddddddddddddddddddddddddd");
  //   return true;
  // } //next({ name: "Login" });
  // // } else {
  // //   next();
  // // }
});
export default router;
