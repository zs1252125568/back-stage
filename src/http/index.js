/*
 * @Date: 2019-12-18 11:54:33
 * @LastEditors: zhangsh
 * @LastEditTime: 2021-05-20 11:17:36
 */
import axios from 'axios'
import Vue from 'vue'
import router from '../router'

//响应时间
axios.defaults.timeout = 6000;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';        //配置请求头

if (process.env.NODE_ENV == 'development') {
  axios.defaults.baseURL = '/api'
}
if (process.env.NODE_ENV == 'production') {
  axios.defaults.baseURL = process.env.VUE_APP_BASE_URL
}

// 请求之前
axios.interceptors.request.use(function (config) {
  // 添加token
  config.headers['expert-token'] = localStorage.getItem('token') || ''
  return config;
}, function (error) {
  // 请求错误
  // console.log('请求失败', error)
  return Promise.reject(error)
});
// 响应的拦截器  
axios.interceptors.response.use(
  response => {  //成功请求到数据
    //这里根据后端提供的数据进行对应的处理
    if (response.data.errCode === -2) {
      let hash = window.location.hash || ''
      if (!hash.includes('/login')) router.push("/login")
      // localStorage.removeItem("token")
      // Vue.prototype.show('身份过期了，需要重新登录一下', 'warning', true)
    }
    if (response.data.errCode === -1) {
      let hash = window.location.hash || ''
      if (!hash.includes('binding')) router.push("/binding")
    }
    return response && response.data ? response.data : response;
  },
  error => {  //响应错误处理
    console.log('响应错误', error)
    Vue.prototype.show('网络异常，请重试', 'error')
  }
)

export default axios;
