<template lang="pug">
  div
    app-menu.is-white
    app-page.is-static
      nuxt
    app-footer
    icons8-components
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
