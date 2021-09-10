import router from '@/router'
import store from '@/store'
// 进度条插件
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import getPageTitle from '@utils/get-page-title'

NProgress.configure({ showSpinner: false }) // NProgress Configuration
// 路由守卫，扫描路由
router.beforeEach(async (to, from, next) => {
  // start progress bar
  NProgress.start()

  // set page title
  document.title = getPageTitle(to.meta.title)

  if (to.path === '/login') {
    next()
  } else {
    const hasGetUserInfo = store.getters.name
    const menuTypeList = store.getters.menuTypeList
    // const menuList = store.getters.menulist
    if (hasGetUserInfo && menuTypeList.length > 0) {
      // && menuList.length > 0
      next()
    } else {
      try {
        await store.dispatch('user/getInfo')
        await store.dispatch('user/getMenuTypeList')
        await store.dispatch('user/getMenuList')
        // router.addRoute(store.getters.menulist)
        next({ path: to.path })
      } catch (error) {
        next('/login')
      }
    }
  }
  NProgress.done()

})

router.afterEach(() => {
  // finish progress bar
  NProgress.done()
})
