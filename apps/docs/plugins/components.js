import Vue from 'vue'

import icons8Components from '../../icons8-components'

import badgeDocs from '../components/badgeDocs.vue'
import buttonDocs from '../components/buttonDocs.vue'
import listDocs from '../components/listDocs.vue'
import panelDocs from '../components/panelDocs.vue'

import buyModalDocs from '../components/plugins/buyModalDocs.vue'

export default ({store}) => {
  Vue.use(icons8Components(), {
    store: store,
    config: {
      apiUrl: 'http://api.local-icons8.com',
      backendUrl: 'http://local-icons8.com'
    }
  })

  Vue.component('badge-docs', badgeDocs)
  Vue.component('button-docs', buttonDocs)
  Vue.component('list-docs', listDocs)
  Vue.component('panel-docs', panelDocs)

  Vue.component('buy-modal-docs', buyModalDocs)
}
