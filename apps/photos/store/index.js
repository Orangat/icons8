'use strict'

import Vuex from 'vuex'

import editor from './editor'

const state = () => ({
  serverError: false,
  apiError: ''
})

const store = () => new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  state,
  modules: {
    editor: editor()
  }
})

export default store
