const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  publicPath: process.env.NODE_ENV === "production" ? "/anime_quiz_database/" : "/",
  transpileDependencies: true
})
