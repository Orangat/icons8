<template lang="pug">
  div
    app-menu.is-music
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


<style lang="scss">
  .app-menu.is-music {
    background-color: white;
    color: black;

    .app-menu-responsive.is-active {
      .app-menu-item {
        color: white;
      }
    }
  }
</style>

