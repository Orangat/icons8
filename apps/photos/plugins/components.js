import Vue from 'vue'

import editorSidebar from '../components/editorSidebar.vue'
import editorToolbar from '../components/editorToolbar.vue'
import objectSidebar from '../components/objectSidebar.vue'

export default () => {
  Vue.component('editor-sidebar', editorSidebar)
  Vue.component('editor-toolbar', editorToolbar)
  Vue.component('object-sidebar', objectSidebar)
}
