const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    public: "https:meats-game.bridgetools.dev",
    host: "localhost",
    port: 3015
  }
})
