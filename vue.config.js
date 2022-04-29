const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  publicPath: '/var/www/html/meats-game',
  transpileDependencies: true,
  devServer: {
    allowedHosts: "meats-game.bridgetools.dev",
    host: "localhost",
    port: 3015
  }
})
