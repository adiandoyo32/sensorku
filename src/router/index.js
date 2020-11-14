import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Sender from '../views/Sender.vue'
import SenderTable from '../components/Sender/SenderTable.vue'
import SenderDetail from '../components/Sender/SenderDetail.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/dashboard',
    name: 'Home',
    component: Home
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/auth/Login.vue'),
    meta: { layout: "no-sidebar-layout" }
  },
  {
    path: '/devices',
    component: Sender,
    children: [
      {
        path: '',
        name: 'SenderTable',
        component: SenderTable,
      },
      {
        path: ':id',
        name: 'SenderDetail',
        component: SenderDetail,
      },
    ]
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  { path: '*', 
    name: '404',
    // redirect: '/404',
    component: () => import('@/views/error-page/404'),
    meta: { layout: "no-sidebar-layout" }
  }
]

const router = new VueRouter({
  routes,
  mode: 'history',
})

router.beforeEach((to, from, next) => {
  to.meta.layout = to.meta.layout || 'default-layout'
  next()
})

export default router
