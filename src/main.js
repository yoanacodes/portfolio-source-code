import Vue from "vue";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import store from "./store";
import router from "./router";
import gtag, { install } from "ga-gtag";

Vue.config.productionTip = false;

// yoanacodes = G-MS5X26N0DS
// github.io = G-M15T1HK6XS
const github = "G-M15T1HK6XS";
const yoanacodes = "G-MS5X26N0DS";

install(yoanacodes, { send_page_view: false });

const app = new Vue({
  vuetify,
  store,
  router,
  render: (h) => h(App),
});

router.afterEach((to, from) => {
  gtag("event", "page_view", {
    page_title: to.name,
    page_location: to.path,
    page_path: to.path,
    send_to: yoanacodes,
  });
});

app.$mount("#app");
