const webpack = require('webpack')
const merge = require('webpack-merge')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const path = require('path')

const config = {
  entry: path.join(__dirname, '/icons8-components.js'),
  output: {
    path: path.join(__dirname, '/../../dist/components/')
  },
  module: {
    loaders: [{
      test: /\.js$/,
      loader: 'babel-loader',
      include: __dirname,
      exclude: /node_modules/
    }, {
      test: /\.vue$/,
      loader: 'vue-loader',
      options: {
        extractCSS: true
      }
    }, {
      test: /\.svg$/,
      loader: 'svg-inline-loader',
      exclude: /node_modules/
    }, {
      test: /\.(png|jpg|gif)$/,
      loader: 'url-loader',
      options: {
        limit: 10000,
        name: '[name].[ext]?[hash]'
      }
    }]
  },
  externals: {
    axios: 'axios',
    vuex: 'vuex'
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      minimize: true,
      sourceMap: false,
      mangle: true,
      compress: {
        warnings: false
      }
    }),
    new ExtractTextPlugin({
      filename: 'icons8-components.css'
    })
  ]
}

if (process.env.NODE_ENV !== 'production') {
  config.devtool = '#cheap-module-eval-source-map'
  config.plugins.push(new webpack.HotModuleReplacementPlugin())
  config.plugins.push(new webpack.NoEmitOnErrorsPlugin())
}

module.exports = [
  merge(config, {
    output: {
      filename: 'icons8-components.min.js',
      libraryTarget: 'window',
      library: 'icons8Components'
    }
  }),
  merge(config, {
    output: {
      filename: 'icons8-components.js',
      libraryTarget: 'umd',
      library: 'icons8-components',
      umdNamedDefine: true
    }
  })
]
