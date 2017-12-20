import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/views/login'
import Notfound from '@/views/404'

Vue.use(Router)

export default new Router({
    routes: [
        {path: '/login', component: Login},
        {path: '/404', component: Notfound}
    ]
})
