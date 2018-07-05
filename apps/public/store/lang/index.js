'use strict'

import objectAssignDeep from '../../plugins/object-assign-deep'

const state = () => ({
  locale: undefined, // current locale
  translation: undefined // store for translations
})

const mutations = {
  SET_LOCALE (state, locale) {
    state.locale = locale
  },
  SET_TRANSLATION (state, translation) {
    state.translation = translation
  },
  MERGE_TRANSLATION (state, translation) {
    state.translation = objectAssignDeep({}, translation, state.translation)
  }
}

const store = () => ({
  state,
  mutations
})

export default store
