import Vue from 'vue'
import App from './App'
import router from './router'
import ubus from './plugins/ubus'
import {Card, Form, FormItem, Input, Icon, Button, Row, Col, Menu, Submenu, MenuItem} from 'iview';
import 'iview/dist/styles/iview.css'

Vue.config.productionTip = false

Vue.use(ubus);

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

	if (!sessionStorage.getItem('session') && to.path != '/login') {
		next('/login')
	} else {
		next()
	}
});

let menus = JSON.parse(sessionStorage.getItem('menus'));
if (menus) {
	let routes = [{
        path: '/',
        component: resolve => require(['@/pages/home.vue'], resolve),
        children: []
    },
    {
        path: '*',
        redirect: '/404'
    }];

    menus.forEach(function(m) {
        var r = {path: m.path, component: resolve => require([`@/pages/${m.component}.vue`], resolve)}
        routes[0].children.push(r);
    });


	router.addRoutes(routes);
}

/* eslint-disable no-new */
new Vue({
	el: '#app',
	router,
	render: (h)=>h(App)
});
