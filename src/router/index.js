import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

function lazyLoad (view) {
  return () => import(`@/views/${view}.vue`)
}

const router = new Router ({
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
      component: lazyLoad('category/AddCategory'),
      meta: {
        requireAuth: true,
      }
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(recodrd => recodrd.meta.requireAuth)) {
    if (sessionStorage.getItem('bearerToken') == null) {
      next({
        path: '/login',
        params: { nextUrl: to.fullPath },
      })
    }
  }

  next()
})

export default router
