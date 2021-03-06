const path = require('path');
function resolve (dir) {
  return path.join(__dirname, dir)
}
module.exports = {
  baseUrl: process.env.NODE_ENV === 'production' ? '/vue-realworld/' : '/',
  lintOnSave: true,
  chainWebpack: (config)=>{
    config.resolve.alias
      .set('@', resolve('src'))
      .set('^@',resolve('src/common'))
      .set('~@',resolve('src/components'))
      .set('static',resolve('src/static'))
  }
}