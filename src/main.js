import Vue from 'vue'
import App from './App.vue'
import VueCookies from 'vue-cookies';
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import echarts from 'echarts'
import axios from 'axios'
import baseURL from "./config"

Vue.use(VueCookies);

Vue.use(ElementUI, { size: 'small' })

Vue.use(echarts);

axios.defaults.baseURL = baseURL

// http response 拦截器
axios.interceptors.response.use(
  response => {
    return response
  },
  error => {
    if (error.response) {
      switch (error.response.status) {
        case 401:
          // 跳转到登录页面
          router.replace({
            path: '/login',
            query: { redirect: router.currentRoute.fullPath }
          })
        // this.$Message.error('非法访问，请重试！')
      }
    }
    return Promise.reject(error.response.data)   // 返回接口返回的错误信息
  }
)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
