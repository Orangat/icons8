import Vue from 'vue'

import config from './config'

import icons8Components from '../../public/icons8-components'
import VueLazyload from 'vue-lazyload'
import appBroMenu from '../components/appBroMenu.vue'
import categoryListSelector from '../components/categoryListSelector.vue'
import categorySelector from '../components/categorySelector.vue'
import iconNameSelector from '../components/iconNameSelector.vue'
import appMenuWrapper from '../../public/components/common/appMenuWrapper.vue'
import appPage from '../../public/components/common/appPage.vue'
import appIcon from '../../public/components/icon/appIcon.vue'

export default ({store}) => {
  Vue.use(icons8Components(), { config, store })
  Vue.use(VueLazyload)

  Vue.component('app-bro-menu', appBroMenu)
  Vue.component('category-list-selector', categoryListSelector)
  Vue.component('category-selector', categorySelector)
  Vue.component('icon-name-selector', iconNameSelector)
  Vue.component('app-menu-wrapper', appMenuWrapper)
  Vue.component('app-page', appPage)
  Vue.component('app-icon', appIcon)
}
