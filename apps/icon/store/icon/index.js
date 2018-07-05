'use strict'

const FORMAT_CHANGED = 'FORMAT_CHANGED'
const SIZE_CHANGED = 'SIZE_CHANGED'
const COLOR_CHANGED = 'COLOR_CHANGED'
const ICON_SELECTED = 'ICON_SELECTED'
const SET_MULTI_SIZE = 'SET_MULTI_SIZE'
const SET_SIMPLIFIED = 'SET_SIMPLIFIED'
const RESOLUTION_CHANGED = 'RESOLUTION_CHANGED'
const ICON_EXTENDED = 'ICON_EXTENDED'

const state = () => ({
  selectedIcon: {
    commonId: undefined,
    filled: undefined,
    variants: undefined,
    resolutions: undefined,
    svgCurrentResolution: undefined
  },
  format: 'png',
  size: 50,
  sizes: [50],
  isMultiSize: false,
  isSimplified: true,
  color: '000000',
  resolution: 40,
  freeSizeLimit: 100,
  paidSizeLimit: 2048
})

const mutations = {
  [FORMAT_CHANGED] (state, format) {
    state.format = format
  },
  [SIZE_CHANGED] (state, size) {
    state.size = size
  },
  [COLOR_CHANGED] (state, color) {
    state.color = color.indexOf('#') === 0 ? color.slice(1) : color
  },
  [ICON_SELECTED] (state, icon) {
    state.selectedIcon = icon
  },
  [SET_MULTI_SIZE] (state, isMultiSize) {
    state.isMultiSize = isMultiSize
  },
  [SET_SIMPLIFIED] (state, isSimplified) {
    state.isSimplified = isSimplified
  },
  [RESOLUTION_CHANGED] (state, resolution) {
    state.resolution = resolution || 40
  },
  [ICON_EXTENDED] (state, data) {
    state.selectedIcon = Object.assign(state.selectedIcon, data)
  }
}

function syncLocalStorage (state) {
  if (!process.browser) {
    return
  }
  const options = {
    selectedIcon: state.selectedIcon,
    format: state.format,
    color: state.color,
    size: state.size,
    resolution: state.resolution,
    isSimplified: state.isSimplified
  }
  localStorage.setItem('options', JSON.stringify(options))
}

const actions = {
  changeFormat ({commit, state}, format) {
    commit(FORMAT_CHANGED, format)
    syncLocalStorage(state)
  },
  changeSize ({commit, state}, size) {
    commit(SIZE_CHANGED, size)
    syncLocalStorage(state)
  },
  changeColor ({commit, state}, color) {
    commit(COLOR_CHANGED, color)
    syncLocalStorage(state)
  },
  selectIcon ({commit, state}, icon) {
    commit(ICON_SELECTED, icon)
    syncLocalStorage(state)
  },
  setMultiSize ({commit}, isMultiSize) {
    commit(SET_MULTI_SIZE, isMultiSize)
  },
  setSimplified ({commit, state}, isSimplified) {
    commit(SET_SIMPLIFIED, isSimplified)
    syncLocalStorage(state)
  },
  changeResolution ({commit, state}, resolution) {
    commit(RESOLUTION_CHANGED, resolution)
    syncLocalStorage(state)
  },
  extendIcon ({commit}, data) {
    commit(ICON_EXTENDED, data)
  },
  loadFromLocalStorage ({commit, getters}) {
    const options = JSON.parse(localStorage.getItem('options') || '{}')
    if (options.selectedIcon) {
      commit(ICON_SELECTED, options.selectedIcon)
      commit(FORMAT_CHANGED, options.format)
      commit(COLOR_CHANGED, options.color)
      commit(RESOLUTION_CHANGED, options.resolution)
      commit(SET_SIMPLIFIED, options.isSimplified)

      const sizeLimit = getters.getSizeLimit()
      if (options.size > sizeLimit) {
        commit(SIZE_CHANGED, sizeLimit)
      } else {
        commit(SIZE_CHANGED, options.size)
      }
    } else {
      commit(ICON_SELECTED, {
        id: 20825,
        platform: 'color',
        name: 'Icons8'
      })
    }
  }
}

const getters = {
  getSizeLimit: (state, getters, rootState) => (icon = {}) => {
    if (icon.free) {
      return state.paidSizeLimit
    }
    if (rootState.auth.user.activeLicense) {
      return state.paidSizeLimit
    }
    let license
    if (rootState.auth.user.licenses) {
      license = rootState.auth.user.licenses[0]
    }
    if (license && icon.timestamp && icon.timestamp < license.expire) {
      return state.paidSizeLimit
    }
    return state.freeSizeLimit
  },
  isIconsAvailable: (state, getters, rootState) => ({
    icons,
    icon = state.selectedIcon,
    user = rootState.auth.user,
    options = {}
  }) => {
    icons = icons || [icon]
    // if user have active license then he has all rights
    if (user.activeLicense) {
      return icons
    }

    // compare with format or current icon state format
    const checkFormat = options.format || state.format
    // compare with size or current icon state size
    const checkSize = options.size || state.size

    // if png with small size then any icons is available
    if (checkFormat === 'png' && checkSize <= state.freeSizeLimit) {
      return icons
    }

    const availableIcons = []
    let license
    if (rootState.auth.user.licenses) {
      license = rootState.auth.user.licenses[0]
    }
    icons.forEach(icon => {
      // if it's free or user icon then it's available
      if (icon.free || icon.imported) {
        availableIcons.push(icon)
        return
      }
      // if icon was created before the expiration of last license
      if (license && icon.timestamp && icon.timestamp < license.expire) {
        // then we check format
        if (checkFormat === 'png') {
          availableIcons.push(icon)
          return
        }
        // or license features
        if (license.features.vector) {
          availableIcons.push(icon)
        }
      }
    })

    // if all icons available, then we can do anything with it
    if (availableIcons.length === icons.length) {
      return icons
    }

    // if no one icon available, then can do nothing with it
    if (availableIcons.length === 0) {
      return undefined
    }

    // if only part of icons available, then return this icons
    if (availableIcons.length < icons.length) {
      return availableIcons
    }
  }
}

const store = () => ({
  state,
  mutations,
  actions,
  getters
})

export default store
