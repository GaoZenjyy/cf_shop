import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from "axios"
// 引入vant
import Vant from 'vant';
import 'vant/lib/index.css';
Vue.use(Vant);
// axios.defaults.baseURL = "http://127.0.0.1:9898/api/v1";
// 项目上线
axios.defaults.baseURL = "http://106.53.71.44:7000/api/v1";

axios.interceptors.request.use(function (config) {
  //  获取token 
  let token = localStorage.getItem("token");
  // 判断有没有 token
  if (!token !== null) {
    // 有就添加到 请求头上 发送到服务器
    config.headers.Authorization = "Bearer " + token
  }
  return config;
});
Vue.prototype.$http = axios;
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
