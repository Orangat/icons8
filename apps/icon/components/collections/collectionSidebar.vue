<template lang="pug">
  .collection-sidebar(v-bind:class="{'is-loading': isLoading}")
    .app-right-sidebar-content
      collection-toolbar
      collection-workspace
</template>

<script>
  export default {
    name: 'collectionSidebar',
    data () {
      return {
        isLoading: false,
        loaded: false
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '../../assets/css/mixins';

  .collection-sidebar {
    &.is-loading {
      @include loading;

      .collection-toolbar,
      .collection-workspace,
      .collection-list {
        opacity: 0;
      }
    }
  }
</style>
