import Vue from 'vue'
import VueRouter from 'vue-router'
import PageNotFound from '../views/PageNotFound.vue'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '*',
    name: 'PageNotFound',
    component: PageNotFound
  },
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/vuex',
    name: 'vuex',
    component: () => import('../views/Vuex.vue')
  },
  ...prefixRoutes('/website', [
    {
      path: '/create',
      name: 'create',
      component: () => import('../views/website/Create.vue')
    },
    {
      path: '/edit/:id',
      name: 'edit',
      component: () => import('../views/website/Edit.vue')
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
