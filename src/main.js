import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { BootstrapVue, BootstrapVueIcons } from 'bootstrap-vue'

import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import './assets/app.css'
import Snotify, { SnotifyPosition } from 'vue-snotify'; // 1. Import Snotify
const SnotifyOptions = {
  toast: {
    position: SnotifyPosition.centerBottom,
    timeout: 3000,
  }
}

Vue.config.productionTip = false

Vue.use(BootstrapVue)
Vue.use(BootstrapVueIcons)
Vue.use(Snotify,SnotifyOptions);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
