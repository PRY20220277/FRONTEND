import Vue from "vue";
import App from "./App";
import router from "./router/index";
import VueAnalytics from "vue-analytics";

import PaperDashboard from "./plugins/paperDashboard";
import "vue-notifyjs/themes/default.css";
import store from "./store";
import vuetify from "./plugins/vuetify";

Vue.use(PaperDashboard);

// Vue.use(VueAnalytics, {
//   id: "378916691", // Replace with your tracking ID
//   router: router, // Replace with your Vue Router instance if using
//   autoTracking: {
//     exception: true,
//   },
// });

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
