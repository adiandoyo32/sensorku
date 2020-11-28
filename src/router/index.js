import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Device from '../views/Device.vue'
import DeviceTable from '../components/Device/DeviceTable.vue'
import DeviceDetail from '../components/Device/DeviceDetail.vue'

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
    component: Device,
    children: [
      {
        path: '',
        name: 'DeviceTable',
        component: DeviceTable,
      },
      {
        path: ':id',
        name: 'DeviceDetail',
        component: DeviceDetail,
      },
    ]
  },
  {
    path: '/users',
    name: 'User',
    component: () => import('../views/user/User.vue')
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('../views/About.vue')
  },
  { path: '*', 
    name: '404',
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
