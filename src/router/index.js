import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Vuex from '../views/Vuex.vue'
import Create from '../views/website/Create.vue'
import Edit from '../views/website/Edit.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/vuex',
    name: 'vuex',
    component: Vuex
  },
  ...prefixRoutes('/website', [
    {
      path: '/create',
      name: 'create',
      component: Create,
    },
    {
      path: '/edit/:id',
      name: 'edit',
      component: Edit
    },
  ]),
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]
// https://github.com/vuejs/vue-router/issues/2105
function prefixRoutes(prefix, routes) {
  return routes.map((route) => {
    route.path = prefix + '' + route.path;
    return route;
  });
}

const router = new VueRouter({
  routes
})

export default router
