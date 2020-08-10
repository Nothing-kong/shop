import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import "./plugins/element.js";
//引入全局样式
import "./assets/css/global.css";
// 导入字体图标
import "./assets/fonts/iconfont.css";

import axios from "axios";
// 配置请求的根路径
axios.defaults.baseURL = "https://www.liulongbin.top:8888/api/private/v1/";
// axios  request请求拦截
axios.interceptors.request.use(config => {
  // NProgress.start()
  // console.log(config)
  // 为请求头对象，添加token验证的Authorization字段
  config.headers.Authorization = window.sessionStorage.getItem('token')
  // 在最后必须 return config
  return config
})
// response 拦截器中,  隐藏进度条NProgress.done()
axios.interceptors.response.use(config => {
  // NProgress.done()
  return config
})
Vue.prototype.$http = axios;

Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");