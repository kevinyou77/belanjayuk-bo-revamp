import Vue from 'vue'
import Router from 'vue-router'
import Dashboard from '../views/Dashboard'

Vue.use(Router)

function lazyLoad (view) {
  return () => import(`@/views/${view}.vue`)
}

export default new Router ({
  mode: 'history',
  base: __dirname,
  routes: [
    {
      path: '/',
      name: 'login',
      component: lazyLoad('Login'),
    },
    {
      path: '/category',
      name: 'category',
      component: lazyLoad('category/AddCategory')
    }
  ]
})