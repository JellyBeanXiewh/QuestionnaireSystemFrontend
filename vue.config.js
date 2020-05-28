'use strict'
module.exports = {
  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:8888',  //后端接口地址
        changeOrigin: true,
      }
    },
  },
}
