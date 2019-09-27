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
      component: lazyLoad('category/Category'),
      meta: {
        requireAuth: true,
      }
    },
    {
      path: '/stock-products',
      name: 'stock-products',
      component: lazyLoad('stock-product/StockProduct'),
      meta: {
        requireAuth: true,
      }
    },
    {
      path: '/staff',
      name: 'staff',
      component: lazyLoad('staff/Staff'),
      meta: {
        requireAuth: true,
      },
    },
    {
      path: '/products',
      name: 'products',
      component: lazyLoad('product/Products'),
      meta: {
        requireAuth: true,
      }
    }
  ]
})

router.beforeEach((to, from, next) => {
  const bearerToken = sessionStorage.getItem('bearerToken')

  if (to.fullPath === '/' && bearerToken) {
    next({
      path: '/dashboard',
    })
  }

  if (to.matched.some(record => record.meta.requireAuth)) {
    if (bearerToken === null) {
      next({
        path: '/',
        params: { nextUrl: to.fullPath },
      })
    }
  }

  next()
})

export default router
