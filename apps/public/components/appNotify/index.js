'use strict'

/*
 * Highly inspired by https://github.com/euvl/vue-notification
 */

import appNotify from './appNotify.vue'

const notifyPlugin = {
  install (Vue) {
    if (this.installed) {
      return
    }
    this.installed = true
    this.event = new Vue()

    Vue.component('app-notify', appNotify)
    Vue.prototype.$notify = (params) => {
      if (typeof params === 'string') {
        params = { text: params }
      }

      if (typeof params === 'object') {
        this.event.$emit('add', params)
      }
    }
    Vue.prototype.$error = (error) => {
      this.event.$emit('add', {
        ...error,
        type: 'error'
      })
    }
  }
}

export default notifyPlugin
