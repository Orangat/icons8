<template lang="pug">
  .page-scroll
    div(
      v-infinite-scroll="emitFetch"
      v-bind:infinite-scroll-disabled="isDisabled"
      v-bind:infinite-scroll-distance="0"
      v-bind:infinite-scroll-listen-for-event="'mounted'"
    )
      slot
    .page-scroll-spacer(
      v-bind:class="{'is-loading': isLoading}"
    )
</template>

<script>
  export default {
    name: 'pageScroll',
    props: {
      fetch: undefined,
      isDisabled: false,
      isLoading: false
    },
    methods: {
      emitFetch () {
        this.$emit('fetch')
      }
    }
  }
</script>

<style lang="scss">
  @import '../../assets/css/mixins';

  .page-scroll {
    .page-scroll-spacer {
      position: relative;
      z-index: -1;
      height: 15rem;
      top: -5rem;

      &.is-loading {
        @include loading;
      }
    }
  }
</style>
