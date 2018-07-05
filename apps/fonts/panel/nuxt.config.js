'use strict'

const defaultConfig = require('../../../nuxt.config.js')
const config = Object.assign({}, defaultConfig)

config.srcDir = 'apps/fonts/panel'
config.buildDir = '.nuxt/fonts-panel'
config.build.publicPath = '/_nuxt/fonts-panel/'

config.plugins = ['~plugins/vuetify']
config.build.css = undefined

module.exports = config
