import Vue from 'vue'
import App from './App'
import router from './router'
import login from './plugins/login.js'
import menu from './plugins/menu.js'
import system from './plugins/system.js'
import {Layout, Sider, Card, Form, FormItem, Input, Icon, Button, Row, Col, Menu, Submenu, MenuItem, Table} from 'iview';
import 'iview/dist/styles/iview.css'
import store from './store'

Vue.config.productionTip = false

Vue.use(login);
Vue.use(menu);
Vue.use(system);

Vue.component('Layout', Layout);
Vue.component('Sider', Sider);
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
Vue.component('Table', Table);

router.beforeEach((to, from, next) => {
	if (to.path == '/login') {
		sessionStorage.removeItem('_ubus_rpc_session');
	}

	if (!sessionStorage.getItem('_ubus_rpc_session') && to.path != '/login') {
		next('/login')
	} else {
		next()
	}
});


import { mapGetters } from 'vuex'

/* eslint-disable no-new */
new Vue({
	el: '#app',
	store,
	router,
	render: (h)=>h(App),
	computed: {
        ...mapGetters({
            menus: 'getMenus',
            routes: 'getRoutes',
            logged: 'isLogged'
        })
    },
	mounted: function() {
		if (this.menus && this.logged) {
			this.$router.addRoutes(this.routes);
		}
	}
});