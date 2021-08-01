import Vue from 'vue'
import App from './App.vue'
import router from './router'

import Buefy from 'buefy'
import 'buefy/dist/buefy.css'

import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

import VueCompositionApi from '@vue/composition-api';
import VueApexCharts from 'vue-apexcharts'

import "@/helper/backgroundTask";

Vue.use(VueCompositionApi);
Vue.use(VueApexCharts)

library.add(fas);

Vue.component('vue-fontawesome', FontAwesomeIcon);
Vue.component('apexchart', VueApexCharts)

Vue.config.productionTip = false
Vue.use(Buefy, {
  defaultIconComponent: "vue-fontawesome",
  defaultIconPack: "fas",
});

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
