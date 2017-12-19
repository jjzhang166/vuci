import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/pages/login'
import Home from '@/pages/home'
import StatusOverview from '@/pages/status-overview'
import StatusRoutes from '@/pages/status-routes'

Vue.use(Router)

export default new Router({
    routes: [
    {
        path: '/login',
        name: 'Login',
        component: Login
    },
    {
        path: '/',
        name: 'Home',
        component: Home,
        children: [{
            path: '/status/overview',
            component: StatusOverview
        },{
            path: '/status/routes',
            component: StatusRoutes
        }]
    }]
})
