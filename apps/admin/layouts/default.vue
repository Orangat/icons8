<template lang="pug">
  div
    admin-menu
    .admin-app
      nuxt
      icons8-components
</template>

<style lang="scss">
  .admin-app {
    position: absolute;
    top: 0;
    left: 240px;
    right: 0;
    bottom: 0;
    overflow-y: auto;
  }

  .admin-app-section {
    padding: 2rem 3rem;
  }
</style>
