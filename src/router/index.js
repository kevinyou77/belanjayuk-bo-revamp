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
      path: '/dashboard',
      name: 'dashboard',
      component: lazyLoad('dashboard/Dashboard'),
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
      path: '/purchase',
      name: 'purchase',
      component: lazyLoad('purchase/Purchase'),
      meta: {
        requireAuth: true,
      }
    },
    {
      path: '/supplier',
      name: 'supplier',
      component: lazyLoad('supplier/Supplier'),
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
      path: '/customers',
      name: 'customers',
      component: lazyLoad('customers/Customers'),
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
    },
    {
      path: '/transaction',
      name: 'transaction',
      component: lazyLoad('transaction/Transaction'),
      meta: {
        requireAuth: true,
      }
    },
    {
      path: '/transaction/history',
      name: 'transaction-history',
      component: lazyLoad('transaction/history/TransactionHistory'),
      meta: {
        requireAuth: true,
      }
    },
    {
      path: '/transaction/history/:id',
      name: 'transaction-history-detail',
      component: lazyLoad('transaction/history/TransactionHistoryDetail'),
      meta: {
        requireAuth: true,
      }
    },
    {
      path: '/transaction/history/print/:id',
      name: 'transaction-history-detail-print',
      component: lazyLoad('transaction/history/TransactionHistoryPrint'),
      meta: {
        requireAuth: true,
      }
    },
    {
      path: '/help',
      name: 'help',
      component: lazyLoad('purchase/Purchase'),
      meta: {
        requireAuth: true,
      }
    },
    {
      path: '/refund',
      name: 'refund',
      component: lazyLoad('refund/Refund'),
      meta: {
        requireAuth: true,
      }
    },
    {
      path: '/debt',
      name: 'debt',
      component: lazyLoad('debt/Debt'),
      meta: {
        requireAuth: true,
      }
    },
    {
      path: '/store-settings',
      name: 'store-settings',
      component: lazyLoad('store-settings/StoreSettings'),
      meta: {
        requireAuth: true,
      }
    }
  ]
})

router.beforeEach((to, _, next) => {
  const bearerToken = sessionStorage.getItem('bearerToken') ? sessionStorage.getItem('bearerToken') : ""
  const role = sessionStorage.getItem('roleName') ? sessionStorage.getItem('roleName') : ""

  if (bearerToken && role.toLowerCase() === 'cashier') {
    if (to.fullPath === '/transaction') {
      next()
    } else {
      next({
        path: '/transaction'
      })
    }
  } 

  if (to.fullPath === '/' && bearerToken) {
    next({
      path: '/dashboard',
    })
  }

  if (to.fullPath === '/logout' && bearerToken) {
    sessionStorage.clear()
    next({ path: '/' })
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
