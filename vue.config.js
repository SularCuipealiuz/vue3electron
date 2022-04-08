const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
  configureWebpack: {
    resolve: {
      fallback: { path: require.resolve("path-browserify") },
    },
  },
  pluginOptions: {
    electronBuilder: {
      // List native deps here if they don't work
      externals: ["iohook"],
      nodeModulesPath: ["../../node_modules", "./node_modules"],
    },
  },
});
