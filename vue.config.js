/* 
process  当前的node进程。 
NODE_ENV是一个用户自定义的变量，在webpack中它的用途是判断生产环境或开发环境。
*/
const defaultSettings = require('./src/settings.js')
const IS_DEVELOPMENT = process.env.NODE_ENV === "development"
// const cndBaseUrl = process.env.VUE_APP_CDN_DOMAIN

// If your port is set to 80,
// use administrator privileges to execute the command line.
// For example, Mac: sudo npm run
// You can change the port by the following methods:
// port = 9527 npm run dev OR npm run dev --port = 9527
const port = process.env.port || process.env.npm_config_port || 9527 // dev port
const name = defaultSettings.title || 'vue' // page title
// 外部扩展，作用暂时不清楚
const externalConfig = [
  // {name: 'vue', scope:'Vue', usePrefetch: false, js: `${cndBaseUrl}/static/cdn/vue.min.js`}
  { name: 'vue', scope: 'Vue', usePrefetch: false, js: 'https://cdn.bootcdn.net/ajax/libs/vue/2.6.9/vue.min.js' },
  { name: 'lodash', scope: '_', usePrefetch: false, js: 'https://cdn.bootcdn.net/ajax/libs/lodash.js/4.9.0/lodash.min.js' },
  { name: 'element-ui', scope: 'ELEMENT', usePrefetch: false, js: 'https://cdn.bootcdn.net/ajax/libs/element-ui/2.15.1/index.min.js', css: 'https://cdn.bootcdn.net/ajax/libs/element-ui/2.15.1/theme-chalk/index.min.css' },
]

module.exports = {
  //打包文件输出路径，即打包到哪里
  outputDir: 'dist',
  // 静态资源地址
  assetsDir: 'static',
  // eslint-loader 是否在保存的时候检查
  lintOnSave: true,
  publicPath: '/',
  // chainWebpack 这个库提供了一个 webpack 原始配置的上层抽象，使其可以定义具名的 loader 规则
  // 和具名插件，可以通过其提供的一些方法链式调用，在cli-service中就使用了这个插件
  chainWebpack: config => {
    config.plugin('html')
      .tap(args => {
        args[0].cdnConfig = IS_DEVELOPMENT ? [] : externalConfig
        args[0].title = name
        return args
      })
  },
  // compression-webpack-plugin@5.0.0
  // 生产环境是否生成 sourceMap 文件
  productionSourceMap: false,
  // filenameHashing: true, //文件hash
  devServer: {
    port: port, //端口
    open: true, //启动打开浏览器
    // https: false, // 是否使用https协议
    // hotOnly: false, // 是否开启热更新
    proxy: { // 代理
      '/api/': {
        ws: false, //如果要代理 websockets，配置这个参数
        // target: 'http://localhost:8080', // 要访问的接口域名
        // target: 'http://10.4.254.117:8888',
        target: 'http://op.lngov.top',
        changeOrigin: true,  // 开启代理，创建一个虚拟服务器进行发送、接收请求
        secure: false // 如果是https接口，需要配置这个参数
      }
    }
  },
  /* 
 configureWebpack是调整webpack配置最简单的一种方式，可以新增也可以覆盖cli中的配置。
 可以是一个对象：被 webpack-merge 合并到webpack 的设置中去
 也可以是一个函数：如果你需要基于环境有条件地配置行为，就可以进行一些逻辑处理，可以直接修改或
 新增配置，(该函数会在环境变量被设置之后懒执行)。该方法的第一个参数会收到已经解析好的配置。
 在函数内，你可以直接修改配置，或者返回一个将会被合并的对象。
 */
  configureWebpack: config => {
    // 别名配置
    config.resolve.alias = Object.assign(config.resolve.alias, {
      "@view": "@/views",
      "@router": "@/router",
      "@api": "@/api",
      "@store": "@/store",
      "@config": "@/config",
      "@style": "@/style",
      "@utils": "@/utils",
      "@layout": "@/layout",
    })
    // 开启GZIP压缩
    console.log(!IS_DEVELOPMENT, process.env.GZIP)
    if (!IS_DEVELOPMENT && process.env.GZIP) {
      // 导入压缩插件
      const CompressionWebpackPlugin = require('compression-webpack-plugin')
      // 添加插件
      config.plugins = (config.plugins || []).concat(new CompressionWebpackPlugin(
        {
          filename: '[path].gz[query]',
          algorithm: 'gzip', // 压缩格式
          test: /.(js|css)$/, // 只压缩js和css文件
          threshold: 10240, // 只处理10kb的文件
          minRatio: 0.8, // 压缩比率： 压缩率 = 压缩大小、 原始大小
          deleteOriginalAssets: false
        }
      ))
    }
    // 去掉生产环境的 打印和警告提示
    if (!IS_DEVELOPMENT) {
      // terser-webpack-plugin
      config.optimization.minimizer[0].options.terserOptions.compress.warnings = false
      config.optimization.minimizer[0].options.terserOptions.compress.drop_console = true
      config.optimization.minimizer[0].options.terserOptions.compress.drop_debugger = true
      config.optimization.minimizer[0].options.terserOptions.compress.pure_funcs = ["console.log"]
    }
    // 外部扩展（配合静态资源cdn加载） --- 生产环境
    if (!IS_DEVELOPMENT) {
      const extenals = {} // {'vue': "Vue", "lodash": "_"}
      externalConfig.forEach(item => (extenals[item.name] = item.scope))
      config.externals = extenals
    }

  },
}