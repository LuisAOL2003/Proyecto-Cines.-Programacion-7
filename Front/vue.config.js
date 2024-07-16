const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');

module.exports = {
  configureWebpack: {
    plugins: [
      new CaseSensitivePathsPlugin(),
    ],
    resolve: {
      alias: {
        'vue$': 'vue/dist/vue.esm-bundler.js'
      },
      extensions: ['*', '.js', '.vue', '.json']
    }
  }
}

const path = require('path');

module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src')
      }
    }
  }
};