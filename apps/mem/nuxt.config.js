'use strict'

const defaultConfig = require('../../nuxt.config.js')
const config = Object.assign({}, defaultConfig)
const env = require('../../config/env.js')

const cdnUrl = process.env.NODE_ENV === 'production' ? env.staticCdn : ''

config.srcDir = 'apps/mem/'
config.buildDir = '.nuxt/mem'
config.build.publicPath = `${cdnUrl}/_nuxt/mem/`

config.build.vendor = [
  'axios',
  'babel-polyfill'
]
config.plugins = [
  '~plugins/components'
]
config.css = [
  {src: '../public/assets/css/public.scss', lang: 'scss'}
]

const favicon = `${cdnUrl}/vue-static/icon/icons8-favicon.png`
config.head.link = [
  { rel: 'icon', type: 'image/png', sizes: '16x16', href: favicon },
  { rel: 'icon', type: 'image/png', sizes: '32x32', href: favicon },
  { rel: 'icon', type: 'image/png', sizes: '96x96', href: favicon },
  { rel: 'icon', type: 'image/png', sizes: '194x194', href: favicon }
]

module.exports = config
