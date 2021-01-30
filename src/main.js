// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
// 引入字体文件
import './assets/font/iconfont.css'
// 引入全局的样式文件
import './assets/css/global.css'
import axios from 'axios'
// 请求基准路径的配置
axios.defaults.baseURL = 'http://127.0.0.1:8888/api'
// 将axios挂在到Vue的原型对象上
// 在别的组件中 this.$http
Vue.prototype.$http = axios

// 将全局的echarts对象挂在到Vue的原型对象上
// 别的组件中 this.$echarts
Vue.prototype.$echarts = window.echarts

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
