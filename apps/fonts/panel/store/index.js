import Vuex from 'vuex'
import api from '../api'

export default () => new Vuex.Store({
  state: {
    sites: [],
    isInProgress: false,
    user: null,
    config: {
      user: null
    },
    excludedFonts: [],
    excludedSites: [],
    stats: {},
    fonts: []
  },
  getters: {
    getIsInProgress: state => state.isInProgress,
    getConfig: state => state.config,
    getExcludedFonts: state => state.excludedFonts,
    getExcludedSites: state => state.excludedSites,
    getStats: state => state.stats,
    getFonts: state => state.fonts
  },
  actions: {
    async nuxtServerInit ({ dispatch }) {
      await dispatch('getConfig')
    },
    getConfig ({commit}) {
      return api.getConfig(response => {
        commit('setConfig', response)
      })
    },
    getSites ({commit}, payload) {
      const page = payload.page || 1
      const callback = payload.callback

      api.getSites(page, (sites, pagesCount) => {
        commit('setSites', sites)
        if (callback) {
          callback(pagesCount)
        }
      })
    },
    getFonts ({commit}, payload) {
      const page = payload.page || 1
      const callback = payload.callback

      api.getFonts(page, (fonts, pagesCount) => {
        commit('setFonts', fonts)
        if (callback) {
          callback(pagesCount)
        }
      })
    },
    getStats ({commit}, callback) {
      api.getStats(stats => {
        commit('setStats', stats)
        if (callback) {
          callback()
        }
      })
    },
    removeExcludedFont ({commit}, payload) {
      const excludedFont = payload.excludedFont
      const callback = payload.callback

      api.removeExcludedFont(excludedFont, () => {
        commit('removeExcludedFont', excludedFont)
        callback()
      })
    },
    getExcludedFonts ({commit}, callback) {
      api.getExcludedFonts(excludedFonts => {
        commit('setExcludedFonts', excludedFonts)
        callback()
      })
    },
    removeExcludedSite ({commit}, payload) {
      const excludedSite = payload.excludedSite
      const callback = payload.callback

      api.removeExcludedSite(excludedSite, () => {
        commit('removeExcludedSite', excludedSite)
        callback()
      })
    },
    getExcludedSites ({commit}, callback) {
      api.getExcludedSites(excludedSites => {
        commit('setExcludedSites', excludedSites)
        callback()
      })
    }
  },
  mutations: {
    setConfig (state, config) {
      state.config = config
    },
    setSites (state, sites) {
      state.sites = sites
    },
    setFonts (state, fonts) {
      state.fonts = fonts
    },
    setStats (state, stats) {
      state.stats = stats
    },
    setUser (state, user) {
      state.config.user = user
    },
    setIsInProgress (state, isInProgress) {
      state.isInProgress = isInProgress
    },
    setExcludedFonts (state, excludedFonts) {
      state.excludedFonts = excludedFonts
    },
    removeExcludedFont (state, excludedFont) {
      state.excludedFonts = state.excludedFonts.filter(element => element.id !== excludedFont.id)
    },
    addExcludedFont (state, excludedFont) {
      state.excludedFonts.push(excludedFont)
    },
    setExcludedSites (state, excludedSites) {
      state.excludedSites = excludedSites
    },
    removeExcludedSite (state, excludedSite) {
      state.excludedSites = state.excludedSites.filter(element => element.id !== excludedSite.id)
    },
    addExcludedSite (state, excludedSite) {
      state.excludedSites.push(excludedSite)
    }
  }
})
