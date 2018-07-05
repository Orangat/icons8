'use strict'

const defaultConfig = require('../../nuxt.config.js')
const config = Object.assign({}, defaultConfig)
const env = require('../../config/env.js')

const cdnUrl = process.env.NODE_ENV === 'production' ? env.staticCdn : ''

config.srcDir = 'apps/icon/'
config.buildDir = '.nuxt/icon'
config.build.publicPath = `${cdnUrl}/_nuxt/icon/`

config.plugins = [
  '~plugins/components',
  '../public/plugins/common-components',
  { src: '~plugins/ga', ssr: false },
  { src: '~plugins/nuxtClientInit', ssr: false },
  { src: '~plugins/userInfo', ssr: false },
  { src: '~plugins/infinite-scroll', ssr: false },
  { src: '../public/plugins/scrollTo', ssr: false },
  { src: '~plugins/touch', ssr: false }
]
config.router.middleware = ['hreflang', 'state', 'i18n']

module.exports = config
