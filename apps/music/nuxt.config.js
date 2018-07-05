'use strict'

const defaultConfig = require('../../nuxt.config.js')
const config = Object.assign({}, defaultConfig)

config.srcDir = 'apps/music/'
config.buildDir = '.nuxt/music'
config.build.publicPath = '/_nuxt/music/'

config.plugins = [
  '~plugins/components',
  { src: '../icon/plugins/ga', ssr: false },
  { src: '../icon/plugins/userInfo', ssr: false }
]
const favicon = `/vue-static/music/music_favicon.ico`
config.head.link = [
  { rel: 'icon', type: 'image/x-icon', sizes: '16x16', href: favicon },
  { rel: 'icon', type: 'image/x-icon', sizes: '32x32', href: favicon },
  { rel: 'icon', type: 'image/x-icon', sizes: '96x96', href: favicon },
  { rel: 'icon', type: 'image/x-icon', sizes: '194x194', href: favicon }
]
config.router.base = '/music/'

module.exports = config
