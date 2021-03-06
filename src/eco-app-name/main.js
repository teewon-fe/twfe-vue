import './config'
import Vue from 'vue'
import i18n from './i18n'
import App from './app.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false

new Vue({
  i18n,
  router,
  store,
  render: h => h(App)
}).$mount('#app')
