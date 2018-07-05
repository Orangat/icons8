import appInfo from '~/plugins/appInfo'
import config from '~/plugins/config'
import * as types from '../../icon/store/mutation-types'

export default function ({ isHMR, store, req }) {
  // If middleware is called from hot module replacement, ignore it
  if (isHMR) return

  if (process.server) {
    const lang = detectLanguage(req)

    config.backendUrl = lang.url
    config.apiUrl = lang.apiUrl

    store.commit(types.APP_INFO_LOADED, Object.assign({}, appInfo, {
      backendUrl: lang.url,
      apiUrl: lang.apiUrl,
      blogUrl: lang.blogUrl
    }))

    store.commit('SET_LOCALE', lang.locale)

    const translations = require('../../../cache/translations.json')
    store.commit('SET_TRANSLATION', translations[lang.locale])
  }
}

function detectLanguage (req) {
  const origin = `https://${req.hostname}`
  const languages = appInfo.activeLanguages
  let locale
  if (!(
    process.env.NODE_ENV === 'production' ||
    process.env.NODE_ENV === 'demo' ||
    process.env.NODE_ENV === 'pre'
  )) {
    const isRu = req.hostname.indexOf('.ru')
    const isIt = req.hostname.indexOf('.it')
    const isDe = req.hostname.indexOf('.de')
    if (isRu > 0) {
      locale = 'ru-RU'
    }
    if (isIt > 0) {
      locale = 'it-IT'
    }
    if (isDe > 0) {
      locale = 'de-DE'
    }
  }
  let lang = languages.find(language => language.url === origin)
  if (!lang) {
    locale = locale || req.query.l || config.language
    lang = languages.find(language => language.locale === locale)
  }
  if (!lang) {
    lang = languages[0]
  }
  return lang
}
