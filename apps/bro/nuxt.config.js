'use strict'

const defaultConfig = require('../../nuxt.config.js')
const config = Object.assign({}, defaultConfig)

config.srcDir = 'apps/bro/'
config.buildDir = '.nuxt/bro'
config.build.publicPath = '/_nuxt/bro/'

config.plugins = [
  '~plugins/components',
  { src: '../icon/plugins/ga', ssr: false },
  { src: '../icon/plugins/nuxtClientInit', ssr: false }
]
config.head.link = [
  { rel: 'shortcut icon', type: 'image/x-icon', sizes: '16x16', href: '/vue-static/bro/favicon.ico' }
]

module.exports = config
