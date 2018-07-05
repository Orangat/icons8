'use strict'
import Vue from 'vue'
import Vuex from 'vuex'

import auth from '../../public/store/auth'
import seo from '../../icon/store/seo'

export const PLAY = 'play'
export const PAUSE = 'pause'
export const STOP = 'stop'

const state = {
  currentTrack: {},
  currentTrackIndex: 0,
  playlist: [],
  statePlaying: null,

  isShowCategories: false,
  isShowSearch: false,
  isShowModalOverlay: false,
  showedInfoPopupsById: {},
  isPlayerInit: false
}

const mutations = {
  CURRENT_TRACK_CHANGED (state, index) {
    state.currentTrackIndex = index
    state.currentTrack = state.playlist[index]
  },
  PLAYLIST_LOADED (state, playlist) {
    state.playlist = playlist
    state.currentTrackIndex = 0
    state.currentTrack = state.playlist[0]
  },
  START_PLAYING (state) {
    state.statePlaying = PLAY
  },
  STOP_PLAYING (state) {
    state.statePlaying = STOP
  },
  PAUSE_PLAYING (state) {
    state.statePlaying = PAUSE
  },
  SHOW_CATEGORIES (state) {
    state.isShowCategories = true
  },
  HIDE_CATEGORIES (state) {
    state.isShowCategories = false
  },
  SHOW_SEARCH (state) {
    state.isShowSearch = true
  },
  HIDE_SEARCH (state) {
    state.isShowSearch = false
  },
  SHOW_MODAL (state) {
    state.isShowModalOverlay = true
  },
  HIDE_MODAL (state) {
    state.isShowModalOverlay = false
    state.showedInfoPopupsById = {}
    state.isShowSearch = false
    state.isShowCategories = false
  },
  SHOW_INFO_POPUP (state, id) {
    Vue.set(state.showedInfoPopupsById, id, true)
  },
  HIDE_INFO_POPUP (state, id) {
    Vue.set(state.showedInfoPopupsById, id, false)
  },
  INIT_PLAYER (state) {
    state.isPlayerInit = true
  }
}

const getters = {
  isPlaying: state => {
    return state.statePlaying === PLAY
  },
  isStopping: state => {
    return state.statePlaying === STOP
  },
  isPausing: state => {
    return state.statePlaying === PAUSE
  }
}

const actions = {
  initPlayerAction ({ commit, state }, tracks) {
    if (!state.isPlayerInit) {
      commit('PLAYLIST_LOADED', tracks)
      commit('CURRENT_TRACK_CHANGED', 0)
      commit('INIT_PLAYER')
    }
  }
}

const store = new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  state,
  mutations,
  getters,
  actions,
  modules: {
    seo: seo(),
    auth: auth()
  }
})

export default () => store
