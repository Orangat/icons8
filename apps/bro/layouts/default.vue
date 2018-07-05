<template lang="pug">
  div
    app-bro-menu
    .app
      app-page
        nuxt
        icons8-components
</template>

<script>
  import { mapState, mapActions } from 'vuex'

  export default {
    computed: {
      ...mapState({
        userLoaded: (state) => state.auth.user.loaded,
        isGuest: (state) => state.auth.user.isGuest
      })
    },
    watch: {
      userLoaded () {
        if (this.isGuest && this.userLoaded) {
          const vm = this
          this.$modal.show('login-modal', {
            callback: () => {
              vm.loadBroPlatforms()
              vm.loadBroCategories()
            }
          })
        }
      }
    },
    methods: {
      ...mapActions(['loadBroPlatforms', 'loadBroCategories'])
    }
  }
</script>
