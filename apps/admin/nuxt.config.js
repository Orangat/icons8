'use strict'

const defaultConfig = require('../../nuxt.config.js')
const config = Object.assign({}, defaultConfig)
const env = require('../../config/env.js')

const cdnUrl = process.env.NODE_ENV === 'production' ? env.staticCdn : ''

config.srcDir = 'apps/admin/'
config.buildDir = '.nuxt/admin'
config.build.publicPath = `${cdnUrl}/_nuxt/admin/`

config.plugins = [
  '~plugins/components'
]

module.exports = config
