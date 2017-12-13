// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App'
import router from './router'
import axios from 'axios'
import VueAxios from 'vue-axios'
import session from './plugins/session'

Vue.config.productionTip = false

Vue.use(ElementUI)
Vue.use(VueAxios, axios)
Vue.use(session)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: (h)=>h(App)
})