'use strict'

import axios from 'axios'
import fs from 'fs-extra'
import config from './config/env'

let appInfo
let translations

console.log('init icons8 cache')
getAppInfo()
  .then(saveAppInfo)
  .then(getTranslations)
  .then(saveTranslations)
  .then(() => {
    console.log('init cache successful')
    process.exit()
  })
  .catch(error => {
    console.log('init cache failed', error)
    process.exit(1)
  })

function getAppInfo () {
  return new Promise(function (resolve, reject) {
    if (appInfo) {
      resolve(appInfo)
    } else {
      axios
        .request({
          url: '/api/service/app-info',
          baseURL: config.appInfoUrl,
          method: 'get'
        })
        .then(response => {
          appInfo = response.data.result
          appInfo.styles = {
            outline: {
              title: 'Outline',
              code: 'outline'
            },
            line: {
              title: 'Line',
              code: 'line'
            },
            small: {
              title: 'Small',
              code: 'small'
            },
            colors: {
              title: 'Color',
              code: 'colors'
            }
          }
          appInfo.shapes = {
            round: {
              title: 'Round',
              code: 'round'
            },
            circle: {
              title: 'Circle',
              code: 'circle'
            },
            square: {
              title: 'Square',
              code: 'square'
            }
          }
          appInfo.colors = {
            black: {
              title: 'Black',
              code: 'black',
              value: '000000'
            },
            white: {
              title: 'White',
              code: 'white',
              value: 'ffffff'
            },
            blue: {
              title: 'Blue',
              code: 'blue',
              value: '4a90e2'
            },
            red: {
              title: 'Red',
              code: 'red',
              value: 'fa314a'
            },
            green: {
              title: 'Green',
              code: 'green',
              value: '26e07f'
            }
          }
          resolve(appInfo)
        })
        .catch(reject)
    }
  })
}

function saveAppInfo (appInfo) {
  // split whole appInfo in bunch of files
  const info = Object.assign({}, appInfo)
  // delete info.platforms
  // delete info.packs
  // delete info.seoPacks
  // delete info.activeLanguages
  return fs.writeJson('./cache/appInfo.json', info, {spaces: 2})
    .then(() => {
      return fs.writeJson('./cache/languages.json', appInfo.activeLanguages, {spaces: 2})
    })
    .then(() => {
      return fs.writeJson('./cache/platforms.json', appInfo.platforms, {spaces: 2})
    })
    .then(() => {
      return fs.writeJson('./cache/packs.json', appInfo.packs, {spaces: 2})
    })
    .then(() => {
      return fs.writeJson('./cache/seoPacks.json', appInfo.seoPacks, {spaces: 2})
    })
}

function getTranslations () {
  return new Promise(function (resolve, reject) {
    if (translations) {
      resolve(translations)
      return
    }
    const promises = []
    appInfo.activeLanguages.forEach(language => {
      promises.push(loadTranslation(language.locale))
    })
    Promise.all(promises)
      .then(response => {
        translations = {};
        [].concat(...response).forEach(trans => {
          translations[trans.locale] = trans.translation
        })
        resolve(translations)
      })
      .catch(reject)
  })
}

function loadTranslation (locale) {
  return new Promise(function (resolve, reject) {
    axios.request({
      url: `/static/locale/${locale}.json`,
      baseURL: config.translationsUrl,
      method: 'get'
    })
      .then(response => {
        resolve({
          locale,
          translation: {
            MENU: response.data.MENU,
            WEB_APP: response.data.WEB_APP,
            REQUEST_ICONS: response.data.REQUEST_ICONS
          }
        })
      })
      .catch(reject)
  })
}

function saveTranslations (translations) {
  // we merge translation with english version in case of missing strings
  Object.keys(translations).forEach(locale => {
    translations[locale] = Object.assign({}, translations['en-US'], translations[locale])
  })
  return fs.writeJson('./cache/translations.json', translations, {spaces: 2})
}
