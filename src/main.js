import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import router from './router'
import store from './store'
import apexchart from './plugins/apexcharts'
import { firestorePlugin } from 'vuefire';

Vue.use(firestorePlugin);

Vue.config.productionTip = false

new Vue({
  vuetify,
  router,
  store,
  apexchart,
  render: h => h(App)
}).$mount('#app')
