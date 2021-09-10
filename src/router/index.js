import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@layout'

export const constantRoutes = [
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    hidden: true,
    children: [
      {
        path: 'dashboard',
        name: 'Dashboard',
        component: () => import(/* webpackChunkName: "chunk-base" */ '@/views/dashboard/index'),
        meta: { title: '首页', icon: 'dashboard', affix: true, noCache: true, }
      }
    ]
  },
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path*',
        component: () => import(/* webpackChunkName: "chunk-base" */ '@/views/redirect/index')
      }
    ]
  },
  {
    path: '/404',
    name: '404',
    component: () => import(/* webpackChunkName: "chunk-base" */ '@/views/404'),
    hidden: true
  },
  {
    path: '/login',
    // name: '/login',
    component: () => import(/* webpackChunkName: "chunk-base" */ '@layout/login/Login2'),
    hidden: true
  }
]

export const constantRouterComponents = {
  layout: Layout,
}



const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter () {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router

/*
属性	详解
path	路径
name	命名路由
component	命名视图组件
components	命名视图组件
redirect	重定向路径
alias	别名
children	嵌套路由
meta	路由元信息 使用$route.meta.属性可以获取
caseSensitive	匹配规则是否大小写敏感？(默认值：false)
pathToRegexpOptions	编译正则的选项
*/