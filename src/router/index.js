import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import(/* webpackChunkName: "home" */ '../views/home/index.vue')
  },
  {
    path: '/taskDetails/:type',
    name: 'taskDetails',
    props: true,
    component: () => import(/* webpackChunkName: "taskDetails" */ '../views/taskDetails/index.vue'),
    meta: {
      showBackBtn: true
    }
  }
]

const router = new VueRouter({
  routes
})

export default router
