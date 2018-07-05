<template lang="pug">
  div
    app-page.is-static
      nuxt
</template>

<script>
  export default {
    head () {
      return {
        ...this.$store.state.seo.data
      }
    }
  }
</script>
