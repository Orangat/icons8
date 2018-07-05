'use strict'

import axios from '~/plugins/axios'
import config from '~/plugins/config'
import apiCache from '~/plugins/apiCache'

export default function getSimilarIcons ({rootState}, {
  id,
  amount = 24,
  language = rootState.lang.locale
} = {}) {
  return new Promise(function (resolve, reject) {
    const url = '/api/iconsets/v4/similar'
    const params = {
      id,
      amount,
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
          const icons = response.data.icons || []
          apiCache.set(key, {icons}, 60 * 60 * 24) // 24 hours
          resolve({icons})
        })
        .catch(reject)
    }
  })
}
