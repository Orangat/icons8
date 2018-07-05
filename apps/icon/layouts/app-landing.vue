<template lang="pug">
  div
    app-menu(
      v-bind:base-url="appInfo.backendUrl"
      v-bind:blog-url="appInfo.blogUrl"
      v-bind:locale="locale"
    )
    .app.is-app-landing
      app-left-sidebar(v-bind:locale="locale")
      app-page.is-have-search(v-bind:sidebars="sidebars" v-on:clicked="hideSidebars")
        nuxt
    icons8-components
</template>

<script>
  import appLeftSidebar from '~/components/app/appLeftSidebar.vue'

  import { mapState, mapActions } from 'vuex'

  export default {
    components: {
      appLeftSidebar
    },
    head () {
      return {
        ...this.seo
      }
    },
    computed: {
      ...mapState({
        seo: state => state.seo.data,
        appInfo: state => state.appInfo,
        locale: state => state.lang.locale,
        sidebars: state => state.ui.sidebars
      })
    },
    methods: {
      ...mapActions([
        'enableLeftSidebar',
        'disableRightSidebar',
        'hideLeftSidebar',
        'hideRightSidebar'
      ]),
      hideSidebars () {
        this.hideLeftSidebar()
        this.hideRightSidebar()
      }
    },
    created () {
      this.enableLeftSidebar()
      this.disableRightSidebar()
    }
  }
</script>
