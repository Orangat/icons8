'use strict'

import axios from '../../../plugins/axios'
import utils from '../../../plugins/utils'
import config from '../../../plugins/config'

const download = {
  downloadIcon,
  downloadById,
  downloadBySVG,
  getIconContentBySVG
}

function downloadIcon ({rootState}, {icon, options}) {
  let downloadOptions = Object.assign({
    format: rootState.icon.format,
    size: rootState.icon.size,
    color: rootState.icon.color,
    simplified: rootState.icon.isSimplified
  }, options)

  let name = utils.normalizeValue(icon.name)
  if (icon.filled && !name.endsWith('-filled')) {
    name += '-filled'
  }
  if (downloadOptions.format === 'png') {
    downloadOptions.name = `icons8-${name}-${downloadOptions.size}.${downloadOptions.format}`
  } else {
    downloadOptions.name = `icons8-${name}.${downloadOptions.format}`
  }

  if (icon.svgEffect) {
    return downloadBySVG({rootState}, {svg: icon.svgEffect, ...downloadOptions})
  } else if (icon.svgCurrentResolution) {
    return downloadBySVG({rootState}, {svg: icon.svgCurrentResolution, ...downloadOptions})
  } else if (icon.id) {
    return downloadById({rootState}, {id: icon.id, ...downloadOptions})
  } else {
    return downloadBySVG({rootState}, {svg: icon.svg, ...downloadOptions})
  }
}

function downloadById ({rootState}, {
  id,
  format = rootState.icon.format,
  size = rootState.icon.size,
  color = rootState.icon.color,
  simplified = rootState.icon.isSimplified,
  name
}) {
  return new Promise(function (resolve, reject) {
    let params = {
      id,
      format,
      size
    }
    if (color) {
      params.color = color
    }
    let url = '//image.icons8.com'
    if (format === 'svg') {
      url = `${config.apiUrl}/api/iconsets/download`
      params.format = `svg.${simplified ? 'simplified' : 'editable'}`
    }
    axios
      .request({
        url,
        method: 'get',
        params,
        responseType: 'blob',
        withCredentials: true
      })
      .then(response => {
        utils.saveAsExt(response.data, name)
        resolve()
      })
      .catch(error => {
        reject(error)
      })
  })
}

function downloadBySVG ({rootState}, {
  svg,
  format = rootState.icon.format,
  size = rootState.icon.size,
  color = rootState.icon.color,
  name
}) {
  return new Promise(function (resolve, reject) {
    getIconContentBySVG({
      svg,
      format,
      size,
      color
    })
      .then(response => {
        utils.saveAsExt(response.data, name)
        resolve()
      })
      .catch(error => {
        reject(error)
      })
  })
}

function getIconContentBySVG ({
  svg,
  format,
  size,
  color
}) {
  let data = {
    svg,
    format: format === 'svg' ? 'svg.editable' : format,
    size
  }
  if (color) {
    data.color = color
  }
  return axios.request({
    url: '/api/iconsets/download',
    baseURL: config.apiUrl,
    method: 'post',
    data,
    transformRequest: function (obj) {
      let str = []
      Object.keys(obj).forEach(key => {
        str.push(encodeURIComponent(key) + '=' + encodeURIComponent(obj[key]))
      })
      return str.join('&')
    },
    responseType: 'blob',
    withCredentials: true
  })
}

// function getDownloadUrl ({id, format = 'png', size, color, simplified}) {
//   let params = {
//     id,
//     format,
//     size
//   }
//   if (color) {
//     params.color = color
//   }
//   if (format === 'svg') {
//     params.format = `svg.${simplified ? 'simplified' : 'editable'}`
//   }
//
//   let query = ''
//   Object.keys(params).forEach((key, index) => {
//     query += index ? '&' : '?'
//     query += `${key}=${params[key]}`
//   })
//
//   return `${config.apiUrl}/api/iconsets/download${query}`
// }
//
// function downloadUrl (url, filename) {
//   // window.open(url, '_blank')
//   // return true
//
//   if (utils.isSafari) {
//     let iframe = document.createElement('iframe')
//     iframe.setAttribute('width', '1')
//     iframe.setAttribute('height', '1')
//     iframe.setAttribute('frameborder', '0')
//     iframe.setAttribute('src', url)
//
//     document.body.appendChild(iframe)
//     return true
//   } else {
//     console.log('3')
//     let a = document.createElement('a')
//     a.href = url
//     a.setAttribute('target', '_blank')
//     if (a.download !== undefined) {
//       // Set HTML5 download attribute. This will prevent file from opening if supported.
//       a.download = filename
//     }
//     // a.style.display = 'none'
//
//     document.body.appendChild(a)
//
//     if (document.createEvent) {
//       console.log('4')
//       let e = document.createEvent('MouseEvents')
//       e.initEvent('click', true, true)
//       a.dispatchEvent(e)
//       return true
//     } else {
//       a.click()
//     }
//
//     return true
//   }
// }

export { getIconContentBySVG }
export default download
