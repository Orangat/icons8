<template lang="pug">
  div
    app-menu
    .menu.panel.list
      .logo(v-html="logo")
      h4 Icons8 Components
      nuxt-link.list-item(to="/" exact) Introdution
      nuxt-link.list-item(to="/css") CSS Components
      nuxt-link.list-item(to="/vue") VUE Components
      nuxt-link.list-item(to="/plugins") Plugins
      nuxt-link.list-item(to="/mixins") Mixins
    .page
      nuxt
    icons8-components
</template>

<script>
  import logo from '../assets/svg/logo.svg'

  export default {
    name: 'DefaultLayout',
    data () {
      return {
        logo
      }
    }
  }
</script>

<style lang="scss">
  @import '../assets/css/public';
</style>