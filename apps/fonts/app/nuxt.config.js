'use strict'

const defaultConfig = require('../../../nuxt.config.js')
const config = Object.assign({}, defaultConfig)

config.srcDir = 'apps/fonts/app'
config.buildDir = '.nuxt/fonts-app'
config.build.publicPath = '/_nuxt/fonts-app/'
config.build.vendor = ['babel-polyfill']
config.build.css = undefined

module.exports = config
