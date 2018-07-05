'use strict'

import appModal from './appModal.vue'

const modalPlugin = {
  install (Vue) {
    if (this.installed) {
      return
    }
    this.installed = true
    this.event = new Vue()

    const $modal = {
      show (name, params) {
        modalPlugin.event.$emit('toggle', name, true, params)
      },
      hide (name, params) {
        modalPlugin.event.$emit('toggle', name, false, params)
      },
      toggle (name, params) {
        modalPlugin.event.$emit('toggle', name, undefined, params)
      }
    }

    if (!Vue.prototype.hasOwnProperty('$modal')) {
      Object.defineProperty(Vue.prototype, '$modal', {
        get: () => $modal
      })
    }

    if (!Vue.$modal) {
      Vue.$modal = $modal
    }

    Vue.component('app-modal', appModal)
    return null
  }
}

export default modalPlugin
