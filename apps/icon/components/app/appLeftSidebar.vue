<template lang="pug">
  .app-left-sidebar(
    v-bind:class="sidebarClasses"
    v-on:click="hideLeftSidebar"
  )
    .app-left-sidebar-toggle(
      v-bind:class="toggleClasses"
      v-on:click.stop="toggleSidebars"
    )
    .app-left-sidebar-content(v-touch:swipe.left="hideLeftSidebar")
      app-expand(v-bind:title="'Style'" v-bind:open="true")
        platform-filter.app-left-sidebar-platforms
      bundle-filter.app-left-sidebar-bundles
      app-expand(v-bind:title="'Popular'" v-bind:open="true")
        seo-pack-filter.app-left-sidebar-packs
      app-expand(v-bind:title="'Categories'")
        pack-filter.app-left-sidebar-packs
      app-expand(v-bind:title="'Attributes'")
        attributes-filter.app-left-sidebar-packs.is-last
</template>

<script>
  import packFilter from '~/components/app/packFilter.vue'
  import bundleFilter from '~/components/app/bundleFilter.vue'
  import seoPackFilter from '~/components/app/seoPackFilter.vue'
  import platformFilter from '~/components/app/platformFilter.vue'
  import attributesFilter from '~/components/app/attributesFilter.vue'

  import { mapState, mapActions } from 'vuex'

  export default {
    name: 'appLeftSidebar',
    //serverCacheKey: props => JSON.stringify(props),
    components: {
      packFilter,
      bundleFilter,
      seoPackFilter,
      platformFilter,
      attributesFilter
    },
    props: {
      locale: {
        type: String,
        'default': 'en-US'
      }
    },
    computed: {
      ...mapState({
        sidebar: state => state.ui.sidebars.left
      }),
      sidebarClasses () {
        return {
          'is-disabled': !this.sidebar.enabled,
          'is-active': this.sidebar.active
        }
      },
      toggleClasses () {
        return {
          'is-active': this.sidebar.active
        }
      }
    },
    methods: {
      ...mapActions([
        'showLeftSidebar',
        'hideLeftSidebar',
        'hideRightSidebar'
      ]),
      toggleSidebars () {
        this.showLeftSidebar()
        this.hideRightSidebar()
      }
    }
  }
</script>

<style lang="scss">
  @import '../../assets/css/variables';
  @import '../../assets/css/breakpoints';

  .app-left-sidebar {
    position: absolute;
    z-index: 2;
    top: 0;
    left: 0;
    bottom: 0;
    width: $left-sidebar-width;
    border-right: 1px solid #e9e9e9;
    transition: 0.3s all ease-in-out;
    background: #363250;
    border-radius: 10px 0 0 0;

    @media (max-width: $responsive-app-left-sidebars) {
      left: -$left-sidebar-width;

      &.is-active {
        left: 0;
      }

      .app-left-sidebar-toggle {
        width: $sidebar-toggle-width;
        position: absolute;
        top: 35px;
        left: 100%;
        height: 100%;
        margin-left: 1px;
        background: $color-grey-light;
        cursor: pointer;
        transition: 0.3s all ease;

        &:before {
          content: '';
          position: absolute;
          z-index: -1;
          top: 4rem;
          left: $sidebar-toggle-width;
          width: 1.25rem;
          height: 1.75rem;
          border-radius: 0 14px 14px 0;
          background: $color-grey-light;
          box-shadow: 0 0 1px rgba(0,0,0,0.3);
        }
        &:after {
          content: '';
          position: absolute;
          top: 4.8rem;
          left: $sidebar-toggle-width;
          width: 12px;
          height: 2px;
          background: #bbb;
          box-shadow: 0 4px 0 #bbb, 0 -4px 0 #bbb;
        }

        &.is-active {
          display: none;
        }
      }
    }

    .app-left-sidebar-content {
      overflow-y: auto;
      height: 100%;
      padding-bottom: 4rem;
    }

    &.is-disabled {
      display: none;
    }
  }
</style>
