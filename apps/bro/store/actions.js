import JSZip from 'jszip'
import config from '~/plugins/config'
import axios from '~/plugins/axios'

function updateBroIcon ({rootState}, {id, data}) {
  return new Promise(function (resolve, reject) {
    axios.request({
      url: `/api/v1/update/${id}`,
      baseURL: config.broUrl,
      method: 'put',
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${rootState.auth.token}`
      },
      data
    })
      .then(response => {
        if (response.data.status === 'success') {
          resolve(response.data.response.icon)
        } else {
          reject({message: response.data.message})
        }
      })
      .catch(reject)
  })
}

function deleteBroIcons ({rootState}, icons) {
  return new Promise(function (resolve, reject) {
    axios.request({
      url: `/api/v1/delete/`,
      baseURL: config.broUrl,
      method: 'post',
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${rootState.auth.token}`
      },
      data: {
        ids: icons.map(icon => icon.iconId)
      }
    })
      .then(response => {
        if (response.data.status === 'success') {
          resolve()
        } else {
          reject({message: response.data.message})
        }
      })
      .catch(reject)
  })
}

function uploadBroIcon ({rootState}, data) {
  return new Promise(function (resolve, reject) {
    axios.request({
      url: '/api/v1/upload',
      baseURL: config.broUrl,
      method: 'post',
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${rootState.auth.token}`
      },
      data
    })
      .then(response => {
        resolve(response.data)
      })
      .catch(reject)
  })
}

function readBroIcons ({state}, files) {
  return new Promise(function (resolve, reject) {
    const promises = []
    files.forEach(file => {
      promises.push(readSingleFile(file))
    })
    Promise.all(promises)
      .then(response => {
        resolve([].concat(...response))
      })
      .catch(reject)
  })
}

function readSingleFile (file) {
  const filename = file.name
  const fileType = getFileType(filename)

  if (fileType === 'zip') {
    return readZIPFile(file)
  }
  if (fileType === 'svg') {
    return readSVGFile(file)
  }
}

function readZIPFile (file) {
  return new Promise(function (resolve, reject) {
    JSZip().loadAsync(file).then(zip => {
      const promises = []
      Object.keys(zip.files).forEach(fkey => {
        const file = zip.files[fkey]
        const fileType = getFileType(file.name)

        if (fileType === 'svg') {
          promises.push(readFileFromZip(file))
        }
      })
      Promise.all(promises)
        .then(response => {
          const icons = []
          response.forEach(({svg, name}) => {
            icons.push({
              name,
              svg
            })
          })
          resolve(icons)
        })
        .catch(reject)
    })
  })
}

function readFileFromZip (file) {
  return new Promise(function (resolve, reject) {
    file.async('string')
      .then(svg => {
        resolve({svg, name: getFileName(file.name)})
      })
      .catch(reject)
  })
}

function readSVGFile (file) {
  return new Promise(function (resolve) {
    const reader = new FileReader()
    reader.onload = (event) => {
      const icon = {
        name: getFileName(file.name),
        svg: event.target.result
      }
      resolve([icon])
    }
    reader.readAsText(file, 'UTF-8')
  })
}

function getFileType (fileName) {
  const filenameSplitArr = fileName.split('.')
  return filenameSplitArr[filenameSplitArr.length - 1]
}

function getFileName (fileName) {
  const fileNameArr = fileName.split('.')
  return fileNameArr.splice(0, fileNameArr.length - 1).join(' ')
}

function nuxtClientInit ({commit, rootState}) {
  return new Promise(function (resolve) {
    const jwtToken = localStorage.getItem('jwtToken')
    commit('USER_TOKEN_CHANGED', jwtToken)
    if (jwtToken) {
      loadBroPlatforms({commit, rootState})
        .then(() => {
          return loadBroCategories({commit, rootState})
        })
        .then(resolve)
        .catch(error => {
          console.error('loadCategories error', error)
          resolve()
        })
    }
  })
}

function loadBroPlatforms ({commit, rootState}) {
  return new Promise(function (resolve, reject) {
    axios.request({
      url: '/api/v1/platforms',
      baseURL: config.broUrl,
      method: 'get',
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${rootState.auth.token}`
      }
    })
      .then(response => {
        if (response.data.status === 'success') {
          commit('PLATFORMS_LOADED', response.data.response)
          resolve()
        } else {
          reject(response.data.message)
        }
      })
      .catch(reject)
  })
}

function loadBroCategories ({commit, rootState}) {
  return new Promise(function (resolve, reject) {
    axios.request({
      url: '/api/v1/categories',
      baseURL: config.broUrl,
      method: 'get',
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${rootState.auth.token}`
      }
    })
      .then(response => {
        if (response.data.status === 'success') {
          commit('CATEGORIES_LOADED', response.data.response)
          resolve()
        } else {
          reject(response.data.message)
        }
      })
      .catch(reject)
  })
}

export default {
  readBroIcons,
  uploadBroIcon,
  updateBroIcon,
  deleteBroIcons,
  loadBroPlatforms,
  loadBroCategories,
  nuxtClientInit
}
