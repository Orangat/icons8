'use strict'

const { Nuxt, Builder } = require('nuxt')
const app = require('express')()
const morgan = require('morgan')
const host = process.env.HOST || 'designer.local-icons8.com'

const port = process.env.PORT || 3003

app.set('port', port)
app.use('/icon', morgan(':remote-addr - :date[iso] :method :req[host]:url :status :res[content-length] - :response-time ms'))

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
console.log('Server listening on ' + host + ':' + port)
