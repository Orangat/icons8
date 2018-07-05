import Vue from 'vue'
import VueClipboard from 'vue-clipboard2'

import categories from '~/components/categories'
import tracksList from '~/components/tracksList'
import appTrack from '~/components/appTrack'
import search from '~/components/search'
import categoriesList from '~/components/categoriesList'
import stickyHeader from '~/components/stickyHeader'
import player from '~/components/player'
import progressLine from '~/components/progressLine'
import appFooter from '~/components/appFooter'
import infoPopup from '~/components/infoPopup'
import loader from '~/components/loader'

import appModal from '../../public/components/appModal'
import appPage from '../../public/components/common/appPage'
import appMenu from '../../public/components/appMenu'
import appMenuAuth from '../../public/components/appMenuAuth'
import loginModal from '../../public/components/loginModal'

export default () => {
  Vue.use(VueClipboard)
  Vue.component('app-page', appPage)
  Vue.component('app-menu', appMenu)
  Vue.component('app-menu-auth', appMenuAuth)
  Vue.component('login-modal', loginModal)

  Vue.component('categories', categories)
  Vue.component('tracks-list', tracksList)
  Vue.component('app-track', appTrack)
  Vue.component('search', search)
  Vue.component('categories-list', categoriesList)
  Vue.component('sticky-header', stickyHeader)
  Vue.component('player', player)
  Vue.component('progress-line', progressLine)
  Vue.component('app-footer', appFooter)
  Vue.component('info-popup', infoPopup)
  Vue.component('loader', loader)

  Vue.use(appModal)
}
