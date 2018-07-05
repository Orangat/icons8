'use strict'

import axios from '~/plugins/axios'
import config from '~/plugins/config'
import apiCache from '~/plugins/apiCache'

import download from './download'
import upload from './upload'
import getSimilarIcons from './similar'

const api = {
  getIcon,
  getSimilarIcons,
  ...download,
  ...upload
}

let atob
if (process.browser) {
  atob = window.atob
} else {
  atob = require('atob')
}

function getIcon ({rootState}, {
  id,
  info = 'false',
  language = rootState.lang.locale
}) {
  return new Promise(function (resolve, reject) {
    const url = 'api/iconsets/v4/icon'
    const params = {
      id,
      info,
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
          const data = response.data
          if (!data.success) {
            reject({...data})
            return
          }
          const icon = data.icon
          // decode svg
          icon.svg = icon.svg ? atob(icon.svg) : icon.svg

          // init svgEffect
          icon.svgEffect = undefined
          // init svgCurrentResolution
          icon.svgCurrentResolution = undefined

          // mainId it's lowest id of all variants
          icon.mainId = icon.id << 0

          // decode variants svg
          if (icon.variants) {
            icon.variants.forEach(variant => {
              const svg = variant.svg
              variant.svg = svg ? atob(svg) : svg

              // decode variant resolutions svg
              if (variant.resolutions) {
                variant.resolutions.forEach(resolution => {
                  const svg = resolution.svg
                  resolution.svg = svg ? atob(svg) : svg
                })
              }
              // find mainId
              const id = variant.id << 0
              if (id < icon.mainId) {
                icon.mainId = id
              }
            })
          }

          // decode resolutions svg
          if (icon.resolutions) {
            icon.resolutions.forEach(resolution => {
              const svg = resolution.svg
              resolution.svg = svg ? atob(svg) : svg
            })
          }
          apiCache.set(key, {icon}, 60 * 60 * 24) // 24 hours
            .catch(error => {
              console.log(`Warning. Set apiCache error for key ${key}`, error)
            })
          resolve({icon})
        })
        .catch(reject)
    }
  })
}

export default api
