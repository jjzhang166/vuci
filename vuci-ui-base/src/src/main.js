import Vue from 'vue'
import App from './App'
import router from './router'
import {Card, Form, FormItem, Input, Icon, Button, Row, Col, Menu, Submenu, MenuItem} from 'iview';
import 'iview/dist/styles/iview.css'

Vue.config.productionTip = false

Vue.component('Card', Card);
Vue.component('Form', Form);
Vue.component('FormItem', FormItem);
Vue.component('Input', Input);
Vue.component('Icon', Icon);
Vue.component('Button', Button);
Vue.component('Row', Row);
Vue.component('Col', Col);
Vue.component('Menu', Menu);
Vue.component('Submenu', Submenu);
Vue.component('MenuItem', MenuItem);

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
