'use strict'

import axios from '~/plugins/axios'
import config from '~/plugins/config'
import apiCache from '~/plugins/apiCache'

export default function latest ({rootState}, {
  amount = 50,
  page = 1,
  platform = rootState.platform.apiCode,
  language = rootState.lang.locale
} = {}) {
  return new Promise(function (resolve, reject) {
    const url = 'api/iconsets/v4/latest'
    const params = {
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
          const {icons, success, message} = response.data
          apiCache.set(key, {icons, success, message}, 60 * 60 * 2) // 2 hours
            .catch(error => {
              console.log(`Warning. Set apiCache error for key ${key}`, error)
            })
          resolve({icons, success, message})
        })
        .catch(reject)
    }
  })
}
