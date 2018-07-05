'use strict'

const defaultConfig = require('../../nuxt.config.js')
const config = Object.assign({}, defaultConfig)
const env = require('../../config/env.js')

const cdnUrl = process.env.NODE_ENV === 'production' ? env.staticCdn : ''

config.srcDir = 'apps/photos/'
config.buildDir = '.nuxt/photos'
config.build.publicPath = `${cdnUrl}/_nuxt/photos/`

config.plugins = [
  '~plugins/components'
]

const favicon = `https://photos.icons8.com/photos/static/img/moose_favicon-2.ico`
config.head.title = 'Moose - Photo Editor'
config.head.link = [
  { rel: 'icon', type: 'image/png', sizes: '16x16', href: favicon },
  { rel: 'icon', type: 'image/png', sizes: '32x32', href: favicon },
  { rel: 'icon', type: 'image/png', sizes: '96x96', href: favicon },
  { rel: 'icon', type: 'image/png', sizes: '194x194', href: favicon }
]

module.exports = config
