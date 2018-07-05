import Vue from 'vue'

import config from './config'
import appComments from '../../public/components/common/appComments.vue'
import icons8Components from '../../public/icons8-components'
import VueLazyload from 'vue-lazyload'
import appPage from '../../public/components/common/appPage'
import appFooter from '../../public/components/common/appFooter'
import clickToCopy from '../../public/components/common/clickToCopy'
import appIcon from '../../public/components/icon/appIcon'
import musicCover from '~/components/music/musicCover'
import markersList from '~/components/music/markersList'
import platformGrid from '~/components/tags/platformGrid'
import platformIcons from '~/components/tags/platformIcons'
import platformWin10 from '~/components/tags/platformWin10'
import platformGlyphs from '~/components/tags/platformGlyphs'
import platformColor from '~/components/tags/platformColor'
import platformMaterial from '~/components/tags/platformMaterial'
import platformP1em from '~/components/tags/platformP1em'
import platformDuskWired from '~/components/tags/platformDuskWired'
import platformUltraviolet from '~/components/tags/platformUltraviolet'
import platformIos7 from '~/components/tags/platformIos7'
import platformDusk from '~/components/tags/platformDusk'
import platformDotty from '~/components/tags/platformDotty'
import platformNolan from '~/components/tags/platformNolan'
import platformMetro from '~/components/tags/platformMetro'
import platformOffice from '~/components/tags/platformOffice'
import platformAndroid from '~/components/tags/platformAndroid'

export default ({store}) => {
  Vue.use(icons8Components(), { config, store })
  Vue.use(VueLazyload)

  Vue.component('music-cover', musicCover)
  Vue.component('markers-list', markersList)
  Vue.component('app-page', appPage)
  Vue.component('app-comments', appComments)
  Vue.component('app-footer', appFooter)
  Vue.component('app-icon', appIcon)
  Vue.component('click-to-copy', clickToCopy)
  Vue.component('platform-grid', platformGrid)
  Vue.component('platform-icons', platformIcons)
  Vue.component('platform-win10', platformWin10)
  Vue.component('platform-glyphs', platformGlyphs)
  Vue.component('platform-color', platformColor)
  Vue.component('platform-material', platformMaterial)
  Vue.component('platform-p1em', platformP1em)
  Vue.component('platform-duskwired', platformDuskWired)
  Vue.component('platform-ultraviolet', platformUltraviolet)
  Vue.component('platform-ios7', platformIos7)
  Vue.component('platform-dusk', platformDusk)
  Vue.component('platform-dotty', platformDotty)
  Vue.component('platform-nolan', platformNolan)
  Vue.component('platform-metro', platformMetro)
  Vue.component('platform-office', platformOffice)
  Vue.component('platform-android', platformAndroid)
}
