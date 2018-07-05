import Vue from 'vue'

import config from './config'

import appAccordion from '../components/common/appAccordion.vue'
import appComments from '../components/common/appComments.vue'
import appExpand from '../components/common/appExpand.vue'
import appFooter from '../components/common/appFooter.vue'
import appMenuWrapper from '../components/common/appMenuWrapper.vue'
import appPage from '../components/common/appPage.vue'
import appSearch from '../components/common/appSearch.vue'
import appSelect from '../components/common/appSelect.vue'
import appTab from '../components/common/appTab.vue'
import appTabs from '../components/common/appTabs.vue'
import autoComplete from '../components/common/autoComplete.vue'
import clickToCopy from '../components/common/clickToCopy.vue'
import pageScroll from '../components/common/pageScroll.vue'

import appIcon from '../components/icon/appIcon.vue'
import iconRecolor from '../components/icon/iconRecolor.vue'
import iconTags from '../components/icon/iconTags.vue'
import iconResolutionSelector from '../components/icon/iconResolutionSelector.vue'
import relatedIcons from '../components/icon/relatedIcons.vue'
import similarIcons from '../components/icon/similarIcons.vue'

import icons8Components from '../icons8-components'
import VueLazyLoad from 'vue-lazyload'
import Ripple from './ripple'

export default ({store}) => {
  Vue.use(icons8Components(), { config, store })
  Vue.use(VueLazyLoad)
  Vue.directive('ripple', Ripple)

  Vue.component('app-accordion', appAccordion)
  Vue.component('app-comments', appComments)
  Vue.component('app-expand', appExpand)
  Vue.component('app-footer', appFooter)
  Vue.component('app-menu-wrapper', appMenuWrapper)
  Vue.component('app-page', appPage)
  Vue.component('app-search', appSearch)
  Vue.component('app-select', appSelect)
  Vue.component('app-tab', appTab)
  Vue.component('app-tabs', appTabs)
  Vue.component('auto-complete', autoComplete)
  Vue.component('click-to-copy', clickToCopy)
  Vue.component('page-scroll', pageScroll)

  Vue.component('app-icon', appIcon)
  Vue.component('icon-recolor', iconRecolor)
  Vue.component('icon-tags', iconTags)
  Vue.component('icon-resolution-selector', iconResolutionSelector)
  Vue.component('related-icons', relatedIcons)
  Vue.component('similar-icons', similarIcons)
}
