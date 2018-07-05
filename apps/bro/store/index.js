'use strict'

import Vuex from 'vuex'

import auth from '../../public/store/auth'
import seo from '../../icon/store/seo'
import api from '../../icon/store/api'
import utils from '~/plugins/utils'

import actions from './actions'

const state = {
  serverError: false,
  apiError: '',
  platformCode: false,
  platforms: false,
  categories: false,
  subcategories: false
}
const mutations = {
  PLATFORM_CODE_CHANGED (state, code) {
    state.platformCode = code
  },
  PLATFORMS_LOADED (state, platforms) {
    state.platforms = platforms
  },
  CATEGORIES_LOADED (state, categories) {
    state.categories = categories
    state.subcategories = []
    categories.forEach(category => {
      state.subcategories.push({
        id: category.categoryId,
        categoryId: category.categoryId,
        name: category.name,
        categoryName: category.name
      })
      category.subcategories.forEach(subcategory => {
        state.subcategories.push({
          id: subcategory.subcategoryId,
          categoryId: category.categoryId,
          subcategoryId: subcategory.subcategoryId,
          name: `${category.name}: ${subcategory.name}`,
          categoryName: category.name,
          subcategoryName: subcategory.name
        })
      })
    })
  },
  APP_INFO_LOADED (state, appInfo) {
    state.appInfo = appInfo
    state.appInfo.packs.forEach(pack => {
      pack.code = utils.normalizeValue(pack.code)
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
    seo: seo(),
    api: api()
  }
})

export default () => store
