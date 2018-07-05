const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const path = require('path')

const config = {
  entry: path.join(__dirname, '/assets/css/public.scss'),
  output: {
    path: path.join(__dirname, '/../../dist/components/'),
    filename: 'icons8-public.css',
    libraryTarget: 'umd'
  },
  module: {
    loaders: [{
      test: /\.scss/,
      use: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: [{loader: 'css-loader', options: { minimize: true }}, {
          loader: 'postcss-loader',
          options: {
            config: {
              path: './postcss.config.js'
            }
          }
        }, 'sass-loader']
      }),
      exclude: /node_modules/
    }, {
      test: /\.svg$/,
      loader: 'svg-inline-loader',
      exclude: /node_modules/
    }]
  },
  externals: {
    axios: 'axios'
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
      filename: 'icons8-public.css'
    })
  ]
}

module.exports = config
