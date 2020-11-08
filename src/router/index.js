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
    name: 'Home',
    component: Home
  },
  {
    path: '/senders',
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
  }
]

const router = new VueRouter({
  routes,
  mode: 'history',
  // linkActiveClass: "active"
})

export default router
