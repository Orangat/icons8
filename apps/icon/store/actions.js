'use strict'

import * as types from './mutation-types'
import config from '~/plugins/config'
import appInfo from '~/plugins/appInfo'

const actions = {
  setPlatform,
  setPack,
  setSeoPack,
  setSearchColor,
  setSearchShape,
  setSearchFormat,

  setIconsGridStyle,
  setExtendedIconsGridStyle,
  setIconMode,
  setCollectionsMode,

  enableLeftSidebar,
  disableLeftSidebar,
  showLeftSidebar,
  hideLeftSidebar,

  enableRightSidebar,
  disableRightSidebar,
  showRightSidebar,
  hideRightSidebar,
  nuxtServerInit,
  nuxtClientInit
}

function setPlatform ({commit}, platformCode) {
  commit(types.PLATFORM_CHANGED, platformCode)
}
function setPack ({commit}, packCode) {
  commit(types.PACK_CHANGED, packCode)
}
function setSeoPack ({commit}, packCode) {
  commit(types.SEO_PACK_CHANGED, packCode)
}
function setSearchColor ({commit}, color) {
  commit(types.SEARCH_COLOR_CHANGED, color)
}
function setSearchShape ({commit}, shape) {
  commit(types.SEARCH_SHAPE_CHANGED, shape)
}
function setSearchFormat ({commit}, format) {
  commit(types.SEARCH_FORMAT_CHANGED, format)
}

function setIconsGridStyle ({commit}, style) {
  commit(types.ICONS_GRID_STYLE_CHANGED, style)
}
function setExtendedIconsGridStyle ({commit}, style) {
  commit(types.EXTENDED_ICONS_GRID_STYLE_CHANGED, style)
}
function setIconMode ({commit}) {
  commit(types.MODE_CHANGED_TO_ICON)
}
function setCollectionsMode ({commit}) {
  commit(types.MODE_CHANGED_TO_COLLECTIONS)
}

function enableLeftSidebar ({commit}) {
  commit(types.LEFT_SIDEBAR_ENABLED)
}
function disableLeftSidebar ({commit}) {
  commit(types.LEFT_SIDEBAR_DISABLED)
}
function showLeftSidebar ({commit}) {
  commit(types.LEFT_SIDEBAR_SHOWN)
}
function hideLeftSidebar ({commit}) {
  commit(types.LEFT_SIDEBAR_HIDDEN)
}

function enableRightSidebar ({commit}) {
  commit(types.RIGHT_SIDEBAR_ENABLED)
}
function disableRightSidebar ({commit}) {
  commit(types.RIGHT_SIDEBAR_DISABLED)
}
function showRightSidebar ({commit}) {
  commit(types.RIGHT_SIDEBAR_SHOWN)
}
function hideRightSidebar ({commit}) {
  commit(types.RIGHT_SIDEBAR_HIDDEN)
}

function nuxtServerInit ({commit}) {
  config.cdnApiUrl = appInfo.cdnApiUrl

  commit(types.APP_INFO_LOADED, appInfo)
  commit(types.PLATFORM_CHANGED, 'all')
  commit(types.PACK_CHANGED, 'new-icons')
}

function nuxtClientInit ({state}) {
  return new Promise(function (resolve) {
    config.backendUrl = state.appInfo.backendUrl
    config.apiUrl = state.appInfo.apiUrl
    config.cdnApiUrl = state.appInfo.cdnApiUrl
    resolve()
  })
}

export default actions
