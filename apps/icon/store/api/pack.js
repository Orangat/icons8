'use strict'

import axios from '../../plugins/axios'
import config from '../../plugins/config'
import apiCache from '../../plugins/apiCache'

const api = {
  getPack,
  getSeoPack
}

function getPack ({rootState}, {
  pack = rootState.pack.code,
  platform = rootState.platform.apiCode || 'all',
  amount = 50,
  page = 1,
  language = rootState.lang.locale
} = {}) {
  return new Promise(function (resolve, reject) {
    const url = 'api/iconsets/v4/category'
    const params = {
      category: pack,
      amount,
      offset: (page - 1) * amount,
      platform,
      language
    }
    const key = url + JSON.stringify(params)
    apiCache.get(key)
      .then(data => {
        if (data) resolve(data)
        else fetch()
      })
      .catch(fetch)

    function fetch () {
      axios
        .request({
          url,
          baseURL: config.cdnApiUrl,
          method: 'get',
          params
        })
        .then(response => {
          const {category, success, message} = response.data
          apiCache.set(key, {category, success, message}, 60 * 60 * 24) // 24 hours
            .catch(error => {
              console.log(`Warning. Set apiCache error for key ${key}`, error)
            })
          resolve({category, success, message})
        })
        .catch(reject)
    }
  })
}

function getSeoPack ({rootState}, {
  pack = rootState.seoPack.code,
  platform = rootState.platform.apiCode,
  amount = 50,
  page = 1,
  language = rootState.lang.locale
}) {
  return new Promise(function (resolve, reject) {
    const url = 'api/iconsets/v4/seoCategory'
    const params = {
      category: pack,
      amount,
      offset: (page - 1) * amount,
      platform: platform === 'all' ? undefined : platform,
      language
    }
    const key = url + JSON.stringify(params)
    apiCache.get(key)
      .then(data => {
        if (data) resolve(data)
        else fetch()
      })
      .catch(fetch)

    function fetch () {
      axios
        .request({
          url,
          baseURL: config.cdnApiUrl,
          method: 'get',
          params
        })
        .then(response => {
          const {category, success, message} = response.data
          apiCache.set(key, {category, success, message}, 60 * 60 * 24) // 24 hours
          resolve({category, success, message})
        })
        .catch(reject)
    }
  })
}

export default api
