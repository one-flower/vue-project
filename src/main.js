import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// elementUi
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);
// css样式文件
import '@/style/index.scss'
// 路由跳转守卫
import '@/permission' // permission control
// 接口调用
import http from '@/utils/http'
Vue.prototype.$http = http

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
