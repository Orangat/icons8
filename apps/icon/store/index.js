'use strict'

import Vuex from 'vuex'

import mutations from './mutations'
import actions from './actions'
import getters from './getters'

import api from './api'
import auth from '../../public/store/auth'
import icon from './icon'
import collections from './collections'
import lang from '../../public/store/lang'
import seo from './seo'

const ICON_MODE = 'ICON_MODE'
const COLLECTIONS_MODE = 'COLLECTIONS_MODE'

const state = () => ({
  serverError: false,
  apiError: '',
  // it's just default appInfo, real data loaded in nuxtServerInit
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
  pack: {},
  seoPack: {},
  color: {
    title: 'Black',
    code: 'black',
    value: '000000'
  },
  shape: undefined,
  format: undefined,
  ui: {
    iconsGridStyle: 'labels',
    extendedIconsGridStyle: 'labels',
    sidebars: {
      left: {
        enabled: true,
        active: false
      },
      right: {
        enabled: true,
        active: false
      }
    },
    mode: ICON_MODE,
    modes: {
      ICON_MODE,
      COLLECTIONS_MODE
    }
  }
})

const store = () => new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  state,
  mutations,
  actions,
  getters,
  modules: {
    api: api(),
    auth: auth(),
    icon: icon(),
    collections: collections(),
    lang: lang(),
    seo: seo()
  }
})

export default store
