import Vue from 'vue'
import App from './App.vue'
import Default from './components/layouts/Default.vue';
import NoSidebar from './components/layouts/NoSidebar.vue';
import vuetify from './plugins/vuetify';
import router from './router'
import store from './store'
import apexchart from './plugins/apexcharts'
import { firestorePlugin } from 'vuefire';
import './registerServiceWorker'

Vue.use(firestorePlugin);

Vue.component("default-layout", Default);
Vue.component("no-sidebar-layout", NoSidebar);

Vue.config.productionTip = false

new Vue({
  vuetify,
  router,
  store,
  apexchart,
  render: h => h(App)
}).$mount('#app')
