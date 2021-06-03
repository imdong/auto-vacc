const path = require('path')
const resolve = dir => path.join(__dirname, dir)
const packageJson = require('./package.json')

const config = {
  pages: {
    index: {
      entry: 'src/main.js',
      title: `自动预约疫苗-深圳 v${packageJson.version}`
    }
  },
  chainWebpack: config => {
    config.resolve.alias
      .set('@', resolve('src'))
  },
  pluginOptions: {
    electronBuilder: {
      // vue 里面使用electron需要的配置，否则会报错
      // 具体请看 https://nklayman.github.io/vue-cli-plugin-electron-builder/guide/security.html
      nodeIntegration: true
    }
  }
}

module.exports = config
