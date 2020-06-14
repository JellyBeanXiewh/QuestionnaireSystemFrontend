import Vue from 'vue'
import App from './App.vue'
import VueCookies from 'vue-cookies';
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import axios from 'axios'
import baseURL from "./config"

Vue.use(VueCookies);

// Vue.use(BootstrapVue)
Vue.use(ElementUI, { size: 'small' })

axios.defaults.baseURL = baseURL

// http request 拦截器
// axios.interceptors.request.use(
//   config => {
//     if (localStorage.JWT_TOKEN) {  // 判断是否存在token，如果存在的话，则每个http header都加上token
//       config.headers.Authorization = `token ${localStorage.JWT_TOKEN}`
//     }
//     return config
//   },
//   err => {
//     return Promise.reject(err)
//   }
// )

// http response 拦截器
axios.interceptors.response.use(
  response => {
    return response
  },
  error => {
    if (error.response) {
      switch (error.response.status) {
        case 401:
          // 返回 401 清除token信息并跳转到登录页面
          // store.commit('LOG_OUT')
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
