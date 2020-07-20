const DEV_MODE = process.env.WEBPACK_TARGET === 'dev'

function externals () {
  return DEV_MODE ? [] : [
    'vue'
  ]
}

module.exports = {
  configureWebpack: () => ({
    externals: externals()
  })
}
