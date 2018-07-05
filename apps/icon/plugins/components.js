import Vue from 'vue'

import analyticsPlugin from './analytics'

import app from '../layouts/app.vue'
import appLanding from '../layouts/app-landing.vue'

import iconPage from '../pages/icon/_id/_name/index.vue'
import newIconsPage from '../pages/icon/new-icons/_platform/index.vue'
import freePackPlatformPage from '../pages/icon/free-pack/_seoPack/_platform.vue'
import freePackPage from '../pages/icon/free-pack/_seoPack/index.vue'
import packPlatformPage from '../pages/icon/pack/_pack/_platform.vue'
import packPage from '../pages/icon/pack/_pack/index.vue'
import setPlatformPage from '../pages/icon/set/_term/_platform.vue'
import setPage from '../pages/icon/set/_term/index.vue'

import iconSidebar from '../components/icon/iconSidebar.vue'
import iconToolbar from '../components/icon/iconToolbar.vue'
import iconWorkspace from '../components/icon/iconWorkspace.vue'
import downloadIcon from '../components/icon/downloadIcon.vue'
import downloadSelector from '../components/icon/downloadSelector.vue'
import effectsModal from '../components/icon/iconEffects/effectsModal.vue'
import iconEffects from '../components/icon/iconEffects/iconEffects.vue'
import generateHtml from '../../icon/components/icon/generateHtml.vue'

import gridSelector from '../components/grid/gridSelector.vue'
import iconGrid from '../components/grid/iconGrid.vue'

import collectionSidebar from '../components/collections/collectionSidebar.vue'
import collectionList from '../components/collections/collectionList.vue'
import collectionToolbar from '../components/collections/collectionToolbar.vue'
import collectionWorkspace from '../components/collections/collectionWorkspace.vue'
import downloadCollection from '../components/collections/downloadCollection.vue'
import downloadCollectionSelector from '../components/collections/downloadCollectionSelector.vue'

export default ({store}) => {
  Vue.component('app', app)
  Vue.component('app-landing', appLanding)

  Vue.component('icon-sidebar', iconSidebar)
  Vue.component('icon-toolbar', iconToolbar)
  Vue.component('icon-workspace', iconWorkspace)
  Vue.component('download-icon', downloadIcon)
  Vue.component('download-selector', downloadSelector)
  Vue.component('effects-modal', effectsModal)
  Vue.component('icon-effects', iconEffects)
  Vue.component('generate-html', generateHtml)

  Vue.component('grid-selector', gridSelector)
  Vue.component('icon-grid', iconGrid)

  Vue.component('collection-sidebar', collectionSidebar)
  Vue.component('collection-list', collectionList)
  Vue.component('collection-toolbar', collectionToolbar)
  Vue.component('collection-workspace', collectionWorkspace)
  Vue.component('download-collection', downloadCollection)
  Vue.component('download-collection-selector', downloadCollectionSelector)

  if (process.browser) {
    Vue.use(analyticsPlugin, {store})
  }
}
