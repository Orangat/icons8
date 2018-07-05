<template lang="pug">
  app-menu-wrapper
    nuxt-link.app-menu-item(v-bind:to="'/upload'") Upload
    a.app-menu-item(v-bind:href="'/analytics'") Icon Analytics
    a.app-menu-item(v-bind:href="'/billing/summary'") Money
    template(slot="profile")
      template(v-if="token")
        .app-menu-item(v-on:click="logoutUser") Logout
      template(v-if="!token")
        .app-menu-item(v-on:click="login") Login
</template>

<script>
  import { mapState, mapActions } from 'vuex'

  export default {
    name: 'appBroMenu',
    computed: {
      ...mapState({
        token: state => state.auth.token
      })
    },
    methods: {
      ...mapActions(['logoutUser', 'loadBroPlatforms', 'loadBroCategories']),
      login () {
        const vm = this
        this.$modal.show('login-modal', {
          callback: () => {
            vm.loadBroPlatforms()
            vm.loadBroCategories()
          }
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
</style>
