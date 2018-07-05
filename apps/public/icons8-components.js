'use strict'

import authStore from './store/auth'
import langStore from './store/lang'

import appModal from './components/appModal'
import appNotify from './components/appNotify'

import createI18nPlugin from './plugins/i18n'
import createEnsureLoginPlugin from './plugins/ensureLogin'
import iconsPlugin from './plugins/icons'
import configPlugin from './plugins/config'

import icons8Components from './icons8Components.vue'

import appIntercom from './components/appIntercom.vue'
import appMenu from './components/appMenu.vue'
import appMenuAuth from './components/appMenuAuth.vue'
import appPopup from './components/appPopup.vue'
import buyModal from './components/buyModal.vue'
import appAds from './components/appAds.vue'
import colorPicker from './components/colorPicker.vue'
import languageDetection from './components/languageDetection.vue'
import loginModal from './components/loginModal.vue'
import menuList from './components/menuList.vue'
import rangeInput from './components/rangeInput.vue'
import rangeSlider from './components/rangeSlider.vue'
import shareIcon from './components/shareIcon.vue'
import shareLink from './components/shareLink.vue'

import nuxtLink from './components/nuxtLink.vue'

export default () => ({
  install: function (Vue, {store, config}) {
    configPlugin.init(config)

    if (!store.state.auth) {
      store.registerModule('auth', authStore(config))
    }
    if (!store.state.lang) {
      store.registerModule('lang', langStore)
    }

    Vue.use(appModal)
    Vue.use(appNotify)

    Vue.use(createEnsureLoginPlugin(), {store})
    Vue.use(createI18nPlugin(), {store})
    Vue.use(iconsPlugin())

    Vue.component('icons8-components', icons8Components)

    Vue.component('app-intercom', appIntercom)
    Vue.component('app-menu', appMenu)
    Vue.component('app-menu-auth', appMenuAuth)
    Vue.component('app-popup', appPopup)
    Vue.component('buy-modal', buyModal)
    Vue.component('app-ads', appAds)
    Vue.component('color-picker', colorPicker)
    Vue.component('language-detection', languageDetection)
    Vue.component('login-modal', loginModal)
    Vue.component('menu-list', menuList)
    Vue.component('range-input', rangeInput)
    Vue.component('range-slider', rangeSlider)
    Vue.component('share-icon', shareIcon)
    Vue.component('share-link', shareLink)

    if (!Vue.options.components['nuxt-link']) {
      Vue.component('nuxt-link', nuxtLink)
    }
  }
})
