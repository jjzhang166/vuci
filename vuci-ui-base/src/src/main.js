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

var session = {
	login: declare ({
		object: 'session',
		method: 'login',
		params: ['username', 'password'],
		expect: {'': { }}
	}),

	set_sid: function (sid) {
		rpc.sid = sid;
	}
}

session.login('root', 'zjh329')
