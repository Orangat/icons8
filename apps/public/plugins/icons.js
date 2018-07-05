'use strict'

function importAll (platform, r) {
  r.keys().forEach(key => (platform[key.split('./').join('').split('.svg').join('')] = r(key)))
}

export default () => {
  return {
    install (Vue) {
      const $icons = {}
      importAll($icons, require.context(`../assets/svg`, true, /\.*$/))
      Vue.prototype.$icons = $icons
      Vue.$icons = $icons
    }
  }
}
