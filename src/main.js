import Vue from 'vue'
import App from './App.vue'
import Default from './components/layouts/Default.vue';
import NoSidebar from './components/layouts/NoSidebar.vue';
import vuetify from './plugins/vuetify';
import Chartkick from 'vue-chartkick';
import Chart from 'chart.js';
import VueApexCharts from 'vue-apexcharts'
import router from './router'
import store from './store'
import * as VueGoogleMaps from 'vue2-google-maps'
import { firestorePlugin } from 'vuefire';
import './registerServiceWorker'

Vue.use(firestorePlugin);

Vue.use(Chartkick.use(Chart));
Vue.use(VueGoogleMaps, {
    load: {
        key: 'AIzaSyD9uz6zUypi-G-JJfXsLb0plc3EAP8P5Aw',
        libraries: 'places'
    },
    installComponent: true
})

Vue.component("default-layout", Default);
Vue.component("no-sidebar-layout", NoSidebar);
Vue.component('apexchart', VueApexCharts);


Vue.config.productionTip = false

new Vue({
  vuetify,
  router,
  store,
  render: h => h(App)
}).$mount('#app')
