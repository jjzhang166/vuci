import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/pages/login'
import Notfound from '@/pages/404'
import Home from '@/pages/home'
import StatusOverview from '@/pages/status-overview'
import StatusRoutes from '@/pages/status-routes'

Vue.use(Router)

export default new Router({
    routes: [
    {
        path: '/login',
        component: Login
    },
    {
        path: '/404',
        component: Notfound
    },
    {
        path: '/',
        component: Home,
        children: [{
            path: '/status/overview',
            component: StatusOverview
        },{
            path: '/status/routes',
            component: StatusRoutes
        }]
    },
    {
        path: '*',
        redirect: '/404'
    }]
})
