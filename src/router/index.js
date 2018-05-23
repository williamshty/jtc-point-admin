import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home.vue'
import AdminLanding from '@/components/authority/AdminLanding'
import AuthLogin from '@/components/auth/AuthLogin'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home Page',
      component: Home
    },
    {
      path: '/authority',
      name: 'Authority Landing',
      component: AdminLanding
    },
    {
      path: '/auth',
      component: AuthLogin
    }
  ]
})
