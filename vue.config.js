/*
 * @Date: 2021-05-18 14:34:31
 * @LastEditors: zhangsh
 * @LastEditTime: 2021-05-19 09:45:07
 */
module.exports = {
  publicPath: process.env.VUE_APP_PUB_URL,
  devServer: {
    port: 80,
    disableHostCheck: true,
    proxy: {
      '/api': {
        target: 'http://192.168.1.38:8090/tp-backend',
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''  //通过pathRewrite重写地址，将前缀/api转为/
        }
      }
    }
  }
}