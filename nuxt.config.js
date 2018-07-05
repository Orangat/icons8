'use strict'

const ExtractTextPlugin = require('extract-text-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const webpack = require('webpack')
const env = require('./config/env.js')
const LRU = require('lru-cache')

const isDev = !(
  process.env.NODE_ENV === 'production' ||
  process.env.NODE_ENV === 'demo' ||
  process.env.NODE_ENV === 'pre'
)

const cdnUrl = process.env.NODE_ENV === 'production' ? env.staticCdn : ''
const favicon = `${cdnUrl}/vue-static/icon/icons8-favicon.png`

module.exports = {
  head: {
    title: '55,000 Icons - Free Download | Icons8',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { name: 'format-detection', content: 'telephone=no' },
      { name: 'robots', content: 'noodp' },
      { 'http-equiv': 'X-UA-Compatible', content: 'IE=edge, chrome=1' },

      { name: 'description', hid: 'description', content: 'The largest icon pack of free icons for Windows8, Windows10, iOS 11, Android 4, Material, and Office. Save in any size, color, and format in 20 seconds.' }
    ],
    link: [
      { rel: 'icon', type: 'image/png', hid: 'favicon-16', sizes: '16x16', href: favicon },
      { rel: 'icon', type: 'image/png', hid: 'favicon-32', sizes: '32x32', href: favicon },
      { rel: 'icon', type: 'image/png', hid: 'favicon-96', sizes: '96x96', href: favicon },
      { rel: 'icon', type: 'image/png', hid: 'favicon-194', sizes: '194x194', href: favicon }
    ]
  },
  env,
  vendor: [
    'axios',
    'babel-polyfill',
    'debounce'
  ],
  css: [
    {src: '~assets/css/public.scss', lang: 'scss'}
  ],
  render: {
    bundleRenderer: {
      cache: LRU({
        max: 10000,
        maxAge: 1000 * 60 * 60 * 24 // 24 hours
      })
    },
    resourceHints: false
  },
  build: {
    extend (config) {
      config.plugins = config.plugins || []
      config.plugins.push(new ExtractTextPlugin('styles.css'))
      config.plugins.push(new webpack.ContextReplacementPlugin(/moment[\\\/]locale$/, /^\.\/(en)$/))

      config.module.rules.push({
        test: /\.css$/,
        loader: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader'
        })
      })
      config.module.rules.push({
        test: /\.svg$/,
        loader: 'svg-inline-loader',
        exclude: /node_modules/
      })
      config.module.rules.push({
        test: /(.*node_modules)(.*svg)(\?.*)?$/,
        loader: 'url-loader',
        query: {
          limit: 10000,
          name: 'imgs/[name].[hash:7].[ext]'
        }
      })
      const urlLoader = config.module.rules.find((rule) => rule.loader === 'url-loader')
      urlLoader.test = /\.(png|jpe?g|gif)$/

      if (!isDev) {
        config.plugins.push(new BundleAnalyzerPlugin({
          analyzerMode: 'static',
          generateStatsFile: true,
          openAnalyzer: false,
          logLevel: 'info'
        }))
      }
    }
  },
  router: {
    linkActiveClass: 'is-active',
    linkExactActiveClass: 'is-exact-active',
    scrollBehavior: function () {
      return { x: 0, y: 0 }
    }
  },
  loading: {
    color: '#238836',
    height: '5px'
  }
}
