const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    allowedHosts: "meats-game.bridgetools.dev",
    host: "localhost",
    port: 3015
  }
})
