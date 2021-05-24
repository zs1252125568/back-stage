/*
 * @Date: 2021-05-17 15:27:43
 * @LastEditors: zhangsh
 * @LastEditTime: 2021-05-24 13:09:04
 */
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'
import axios from './http/index'
import util from "./util/index"


Object.keys(util).map((v) => {
  if (!Vue.prototype[v]) {
    Vue.prototype[v] = util[v]
  } else {
    throw ('试图在给Vue的原型添加属性时候出现冲突')
  }
})

Vue.config.productionTip = false
Vue.prototype.$axios = axios
Vue.prototype.util = util


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
