import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Vuex from '../views/Vuex.vue'
import WebsiteList from '../views/WebsiteList.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/vuex',
    name: 'vuex',
    component: Vuex
  },
  {
    path: '/create',
    name: 'create',
    component: Home
  },
  {
    path: '/website_list',
    name: 'website_list',
    component: WebsiteList
  },
  {
    path: '/edit/:id',
    name: 'edit',
    component: Home
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
  routes
})

export default router
