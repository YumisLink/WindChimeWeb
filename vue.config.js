module.exports = {
  publicPath: '/', //配置该路径，nginx中，进行路由转发，才可找到
  devServer: {
    historyApiFallback: true,
    open: true,
    proxy: {
      '/api': {

        target: 'http://yumiswindchime.cn:8085/',//设置你调用的接口域名和端口号 别忘了加http
        changeOrigin: true,    //這裡true表示实现跨域
        pathRewrite: {
          '^/api': '/' //这里理解成用‘/api’代替target里面的地址，后面组件中我们掉接口时直接用api代替 比如我要调用'http://40.00.100.100:3002/user/add'，直接写‘/api/user/add’即可
        }
      }
    }
  },
  // devServer: {
  //   host: "172.0.0.1",
  //   port: 3000,     // 端口号
  //   disableHostCheck: true,
  // },

};