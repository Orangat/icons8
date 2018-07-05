'use strict'

import Vuex from 'vuex'

import cache from '../../icon/plugins/cache'
import config from '~/plugins/config'
import utils from '~/plugins/utils'

const state = {
  serverError: false,
  apiError: '',
  appInfo: {
    apiUrl: '',
    backendUrl: '',
    blogUrl: '',
    version: '0',
    stripePublicKey: '',
    activeLanguages: [],
    iconsCount: 0,
    iconsCounts: {},
    platforms: {},
    packs: [],
    seoPacks: [],
    parseAnalytics: {
      appId: '',
      javascriptKey: '',
      serverURL: ''
    }
  }
}

const mutations = {
  APP_INFO_LOADED (state, appInfo) {
    state.appInfo = appInfo
    state.appInfo.packs.forEach(pack => {
      pack.code = utils.normalizeValue(pack.code)
    })
  }
}

const actions = {
  nuxtServerInit ({commit}) {
    return new Promise(function (resolve) {
      console.log('hello', Date.now())
      cache.getAppInfo()
        .then(appInfo => {
          config.cdnApiUrl = appInfo.cdnApiUrl
          commit('APP_INFO_LOADED', appInfo)
          resolve()
        })
        .catch(error => {
          console.log(error)
          resolve()
        })
    })
  }
}

const store = new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  state,
  mutations,
  actions
})

export default () => store
