const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
  // webpack的打包分析工具
  configureWebpack: {
    plugins: [
      new BundleAnalyzerPlugin()
    ],
    // 防止将某些 import 的包(package)打包到 bundle 中，
    // 而是在运行时(runtime)再去从外部获取这些扩展依赖(external dependencies)。
    // 用人话说，就是对某些包(比如CDN导入的包)不进行打包
    externals: {
      // 前面为全局变量名，后面为库名
      'vue': 'Vue',
      'axios': 'axios',
      'element-ui': 'ELEMENT'
    }
  },
  devServer: {
    // vue项目启动时的ip地址和端口
    host: 'localhost',
    port: 8000,
    proxy: {
      // 匹配所有以 /api 开头的url
      '/api': {
        // 请求的目标主机
        target: 'http://dev3.airdb.io:8081',
        changeOrigin: true,
        ws: true
        // 这样重写会把路径中 /api 消去
        // pathRewrite: {
        //   '^/api': '/api'
        // }
      }
    }
  }
};