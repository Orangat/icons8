import Vue from 'vue'

import config from './config'

import icons8Components from '../../public/icons8-components'
import appPage from '../../public/components/common/appPage.vue'

export default ({store}) => {
  console.log('init')
  Vue.use(icons8Components(), { config, store })
  Vue.component('app-page', appPage)
}
