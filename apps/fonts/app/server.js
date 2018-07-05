'use strict'

const { Nuxt, Builder } = require('nuxt')
const app = require('express')()
const morgan = require('morgan')
const host = process.env.HOST || 'localhost'

const port = process.env.PORT || 3008

app.set('port', port)
app.use(morgan(':remote-addr - :date[iso] :method :req[host]:url :status :res[content-length] - :response-time ms'))

// Import and Set Nuxt.js options
let config = require('./nuxt.config.js')
config.dev = !(
  process.env.NODE_ENV === 'production' ||
  process.env.NODE_ENV === 'demo' ||
  process.env.NODE_ENV === 'pre'
)

// Init Nuxt.js
const nuxt = new Nuxt(config)
if (config.dev) {
  new Builder(nuxt).build()
}
app.use(nuxt.render)

// Listen the server
app.listen(port, host)
console.log('Fonts server listening on ' + host + ':' + port)
