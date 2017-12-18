import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import VueAxios from 'vue-axios'
import iView from 'iview'
import 'iview/dist/styles/iview.css'
import {declare} from './plugins/ubus/rpc'

Vue.config.productionTip = false

Vue.use(iView)

router.beforeEach((to, from, next) => {
	if (to.path == '/login') {
		sessionStorage.removeItem('session');
	}

	let session = JSON.parse(sessionStorage.getItem('session'));
	if (!session && to.path != '/login') {
		next('/login')
	} else {
		next()
	}
});

/* eslint-disable no-new */
new Vue({
	el: '#app',
	router,
	render: (h)=>h(App)
})
