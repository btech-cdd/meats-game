const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    allowedHosts: "meats-game.bridgetools.dev",
    host: "localhost",
    port: 3015
  },
  pwa: {
      name: 'Test',
      iconPaths: {
        favicon32: '',
        favicon16: '',
        appleTouchIcon: '',
        maskIcon: '',
        msTileImage: ''
      }
  }
})
