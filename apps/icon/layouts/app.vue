<template lang="pug">
  div
    app-menu(
      v-bind:base-url="appInfo.backendUrl"
      v-bind:blog-url="appInfo.blogUrl"
      v-bind:locale="locale"
    )
    .app
      app-left-sidebar(v-bind:locale="locale")
      app-page.is-have-search(v-bind:sidebars="sidebars" v-on:clicked="hideSidebars")
        nuxt
      app-right-sidebar(v-bind:locale="locale")
    icons8-components
</template>

<script>
  import appLeftSidebar from '~/components/app/appLeftSidebar.vue'
  import appRightSidebar from '~/components/app/appRightSidebar.vue'

  import { mapState, mapActions } from 'vuex'

  export default {
    components: {
      appLeftSidebar,
      appRightSidebar
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
        'enableRightSidebar',
        'hideLeftSidebar',
        'hideRightSidebar'
      ]),
      hideSidebars () {
        this.hideLeftSidebar()
      }
    },
    created () {
      this.enableLeftSidebar()
      this.enableRightSidebar()
    }
  }
</script>

<style>
  .app {
    z-index: 0;
  }
</style>
