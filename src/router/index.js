import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },
  {
    path: '/dashboard',
    component: Layout,
    redirect: '/dashboard/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: '系统首页', icon: 'dashboard' }
    }]
    // meta: { title: '首页', icon: 'dashboard',roles: ['18'] }
  },
  {
    path: '/base',
    component: Layout,
    name: 'base',
    meta: {
      title: '交易查询',
      icon: 'example'
    },
    children: [
      {
        path: 'unionTradeQuery',
        name: 'unionTradeQuery',
        component: () => import('@/views/trade/unionTradeQuery'),
        meta: { title: '交易量查询', icon: 'user' }
      },
      {
      path: 'unionTradeQueryDay',
      name: 'unionTradeQueryDay',
      component: () => import('@/views/trade/unionTradeQueryDay'),
      meta: { title: '天交易量统计', icon: 'password' }
    },
    {
      path: 'unionTradeQueryWeek',
      name: 'unionTradeQueryweek',
      component: () => import('@/views/trade/unionTradeQueryWeek'),
      meta: { title: '周交易量统计', icon: 'password' }
    },
    {
      path: 'unionTradeQueryMonth',
      name: 'unionTradeQueryMonth',
      component: () => import('@/views/trade/unionTradeQueryMonth'),
      meta: { title: '月天交易量统计', icon: 'password' }
    },
    {
      path: 'unionTradeQueryYear',
      name: 'unionTradeQueryYear',
      component: () => import('@/views/trade/unionTradeQueryYear'),
      meta: { title: '年交易量统计', icon: 'password' }
    }
   ]
  },
  {
    path: '/base',
    component: Layout,
    name: 'base',
    meta: {
      title: '价格查询',
      icon: 'example'
    },
    children: [
      {
        path: 'unionPriceCurveView',
        name: 'unionPriceCurveView',
        component: () => import('@/views/price/unionPriceCurveView'),
        meta: { title: '联盟价格曲线', icon: 'user' }
      },
      {
      path: 'unionPriceMerchantTime',
      name: 'unionPriceMerchantTime',
      component: () => import('@/views/price/unionPriceMerchantTime'),
      meta: { title: '价格时间查询', icon: 'password' }
    }]
    // meta: { title: '首页', icon: 'dashboard',roles: ['18'] }
  },


  { path: '/', redirect: '/login', hidden: true },
  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
