<template lang="pug">
  .icon-toolbar
    icon-recolor(v-bind:position="'bottom-left'" v-if="!isColor && !isImported")
    icon-effects(v-bind:icon="icon" v-on:iconEffected="iconEffected")
</template>

<script>
  import { mapState } from 'vuex'

  export default {
    name: 'iconToolbar',
    serverCacheKey: props => 'iconToolbar',
    props: {
      icon: Object
    },
    computed: {
      ...mapState({
        platforms: state => state.appInfo.platforms
      }),
      isColor () {
        if (this.icon && this.platforms[this.icon.platform]) {
          return this.platforms[this.icon.platform].isColor
        }
        return false
      },
      isImported () {
        return this.icon.imported
      }
    },
    methods: {
      iconEffected (svg) {
        this.$emit('iconEffected', svg)
      }
    }
  }
</script>

<style lang="scss">
  @import '../../assets/css/variables';
  @import '../../assets/css/breakpoints';

  .icon-toolbar {
    position: relative;
    height: 3rem;
    border-bottom: 1px solid $color-grey-light;

    @media (max-width: $responsive-effects-hide) {
      position: absolute;
      right: 10px;
      border: none;
    }

    .icon-recolor {
      display: inline-block;
      position: relative;
      top: 11px;
      margin-left: 10px;
      vertical-align: top;
      @media (max-width: $responsive-effects-hide) {
        margin-left: 0;
      }
    }

    .icon-effects {
      display: inline-block;
      @media (max-width: $responsive-effects-hide) {
        display: none;
      }
    }
  }
</style>
