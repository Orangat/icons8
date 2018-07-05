'use strict'

import config from './config'

let apiCache = {
  set () {
    return new Promise(function (resolve) {
      resolve()
    })
  },
  get () {
    return new Promise(function (resolve) {
      resolve()
    })
  }
}

if (process.server && config.redis) {
  const redis = require('redis')
  let cache
  try {
    cache = redis.createClient({
      host: config.redisHost,
      port: config.redisPort,
      retry_strategy: function (options) {
        console.log('options.attempt', options.attempt)
        if (options.error && options.error.code === 'ECONNREFUSED') {
          // End reconnecting on a specific error and flush all commands with
          // a individual error
          return new Error('The server refused the connection')
        }
        if (options.total_retry_time > 1000 * 60 * 60) {
          // End reconnecting after a specific timeout and flush all commands
          // with a individual error
          return new Error('Retry time exhausted')
        }
        if (options.attempt > 10) {
          // End reconnecting with built in error
          return undefined
        }
        // reconnect after
        return Math.min(options.attempt * 100, 3000)
      }
    })
    apiCache = {
      get (key) {
        return new Promise(function (resolve, reject) {
          cache.get(encodeURIComponent(key), (error, response) => {
            if (error) {
              reject(error)
            } else {
              resolve(response ? JSON.parse(response) : undefined)
            }
          })
        })
      },
      set (key, data, expire) {
        return new Promise(function (resolve, reject) {
          cache.set(encodeURIComponent(key), JSON.stringify(data), 'EX', expire, (error, response) => {
            if (error) {
              reject(error)
            } else {
              resolve(response)
            }
          })
        })
      }
    }
  } catch (e) {
    console.error('Redis ERROR', e)
  }
}

export default apiCache
