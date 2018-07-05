'use strict'

const merge = require('webpack-merge')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = {
  srcDir: 'apps/docs/',
  head: {
    title: 'Icons 8 Components',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { name: 'format-detection', content: 'telephone=no' },
      { name: 'robots', content: 'noodp' },
      { 'http-equiv': 'X-UA-Compatible', content: 'IE=edge, chrome=1' },
      { name: 'google-site-verification', content: 'some-code' },
      { name: 'description', hid: 'description', content: 'Pretty Icons 8 components for internal projects' }
    ],
    link: [
      { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/icons8-components/icons8-favicon.png' },
      { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/icons8-components/icons8-favicon.png' },
      { rel: 'icon', type: 'image/png', sizes: '96x96', href: '/icons8-components/icons8-favicon.png' },
      { rel: 'icon', type: 'image/png', sizes: '194x194', href: '/icons8-components/icons8-favicon.png' },
      { rel: 'stylesheet', href: '//cdnjs.cloudflare.com/ajax/libs/highlight.js/9.9.0/styles/atom-one-light.min.css' }
    ]
  },
  plugins: [
    '~plugins/highlight',
    '~plugins/components'
  ],
  performance: {
    gzip: true
  },
  cache: true,
  generate: {
    dir: 'docs'
  },
  buildDir: '.nuxt/docs',
  build: {
    vendor: [
      'babel-polyfill'
    ],
    publicPath: '/_nuxt/docs/',
    extend (config) {
      const urlLoader = config.module.rules.find((rule) => rule.loader === 'url-loader')
      urlLoader.test = /\.(png|jpe?g|gif)$/
      urlLoader.options.limit = 10000

      return merge(config, {
        module: {
          rules: [{
            test: /\.css$/,
            loader: ExtractTextPlugin.extract({
              fallback: 'style-loader',
              use: 'css-loader'
            })
          }, {
            test: /\.svg$/,
            loader: 'svg-inline-loader',
            exclude: /node_modules/
          }, {
            test: /(.*node_modules)(.*svg)(\?.*)?$/,
            loader: 'url-loader',
            query: {
              limit: 10000,
              name: 'imgs/[name].[hash:7].[ext]'
            }
          }]
        },
        plugins: [new ExtractTextPlugin('styles.css')]
      })
    }
  },
  router: {
    base: '/icons8-components/',
    linkActiveClass: 'is-active',
    linkExactActiveClass: 'is-exact-active',
    scrollBehavior: function () {
      return { x: 0, y: 0 }
    }
  },
  css: [
    {src: '~/assets/css/public.scss', lang: 'scss'}
  ],
  loading: {
    color: '#238836',
    height: '5px'
  }
}
