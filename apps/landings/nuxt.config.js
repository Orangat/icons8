'use strict'

const defaultConfig = require('../../nuxt.config.js')
const config = Object.assign({}, defaultConfig)
const env = require('../../config/env.js')

const cdnUrl = process.env.NODE_ENV === 'production' ? env.staticCdn : ''

config.srcDir = 'apps/landings/'
config.buildDir = '.nuxt/landings'
config.build.publicPath = `${cdnUrl}/_nuxt/landings/`

config.plugins = [
  '~plugins/components',
  '../public/plugins/scrollTo',
  '~plugins/soundBus',
  { src: '../icon/plugins/ga', ssr: false },
  { src: '../icon/plugins/nuxtClientInit', ssr: false },
  { src: '../icon/plugins/userInfo', ssr: false }
]
config.router.middleware = ['hreflang', 'i18n']

module.exports = config
