import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import VueAxios from 'vue-axios'
import iView from 'iview'
import 'iview/dist/styles/iview.css'

Vue.config.productionTip = false

Vue.use(iView)
Vue.use(VueAxios, axios)

router.beforeEach((to, from, next) => {
	if (to.path != '/login') {
		next({path: '/login'})
	} else {
		next();
	}
})

/* eslint-disable no-new */
new Vue({
	el: '#app',
	router,
	render: (h)=>h(App)
})
