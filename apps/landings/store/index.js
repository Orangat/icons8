'use strict'

import Vuex from 'vuex'

import auth from '../../public/store/auth'
import lang from '../../public/store/lang'
import seo from '../../icon/store/seo'
import api from '../../icon/store/api'
import icon from '../../icon/store/icon'
import appInfo from '~/plugins/appInfo'
import config from '../../icon/plugins/config'
import utils from '~/plugins/utils'
import * as types from '../../icon/store/mutation-types'

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
  },
  platform: {},
  pack: {}
}
const mutations = {
  PACK_CHANGED (state, packCode) {
    packCode = utils.normalizeValue(packCode)
    const packs = state.appInfo.packs

    let currentPack = packs.find(pack => pack.code === packCode)
    if (!currentPack) {
      currentPack = packs.find(pack => pack.code === 'free-icons')
    }
    state.pack = currentPack
  },
  APP_INFO_LOADED (state, appInfo) {
    state.appInfo = appInfo
    state.appInfo.packs.forEach(pack => {
      pack.code = utils.normalizeValue(pack.code)
    })
  }
}

const actions = {
  setPack ({commit}, packCode) {
    commit(types.PACK_CHANGED, packCode)
  },
  nuxtServerInit ({commit}) {
    config.cdnApiUrl = appInfo.cdnApiUrl
    commit(types.APP_INFO_LOADED, appInfo)
  },
  nuxtClientInit ({state}) {
    return new Promise(function (resolve) {
      config.cdnApiUrl = state.appInfo.cdnApiUrl
      resolve()
    })
  }
}

const store = new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  state,
  mutations,
  actions,
  modules: {
    auth: auth(),
    lang: lang(),
    seo: seo(),
    api: api(),
    icon: icon()
  }
})

export default () => store
