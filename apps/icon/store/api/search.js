'use strict'

import axios from '../../plugins/axios'
import config from '../../plugins/config'
import apiCache from '../../plugins/apiCache'

export default function search ({rootState}, {
  term,
  platform = rootState.platform ? rootState.platform.apiCode : 'all',
  page = 1,
  amount = 50,
  language = rootState.lang.locale,
  options = {}
} = {}) {
  return new Promise(function (resolve, reject) {
    const url = 'api/iconsets/v4/search'
    const params = {
      term,
      amount,
      offset: (page - 1) * amount,
      platform,
      language,
      ...options
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
          baseURL: config.searchUrl,
          method: 'get',
          params
        })
        .then(response => {
          if (response.data.icons) {
            const {icons, success, message, translations} = response.data
            apiCache.set(key, {icons, success, message, translations}, 60 * 60 * 24) // 48 hours
              .catch(error => {
                console.log(`Warning. Set apiCache error for key ${key}`, error)
              })
            resolve({icons, success, message, translations})
          } else {
            reject('Server error')
          }
        })
        .catch(reject)
    }
  })
}
