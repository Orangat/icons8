<template lang="pug">
  nuxt
</template>

<script>
  import { mapState } from 'vuex'

  export default {
    head () {
      return {
        ...this.seo
      }
    },
    computed: {
      ...mapState({
        seo: state => state.seo.data
      })
    }
  }
</script>

<style lang="scss">
  @import '../assets/css/mixins';
  @import '../assets/css/styles';
</style>