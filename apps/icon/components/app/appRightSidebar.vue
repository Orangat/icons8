<template lang="pug">
  .app-right-sidebar(
    v-bind:class="sidebarClasses"
    v-touch:swipe.right="hideRightSidebar"
  )
    .app-right-sidebar-toggle(
      v-bind:class="toggleClasses"
      v-on:click.stop="toggleSidebars"
    )

    collection-sidebar(v-show="isCollectionOpen")
    collection-list(v-show="!isCollectionOpen")
</template>

<script>
  import {mapState, mapActions} from 'vuex'

  export default {
    name: 'appRightSidebar',
    serverCacheKey: props => JSON.stringify(props),
    props: {
      locale: {
        type: String,
        'default': 'en-US'
      }
    },
    data () {
      return {
        collectionList: undefined
      }
    },
    computed: {
      ...mapState({
        user: state => state.auth.user,
        sidebar: state => state.ui.sidebars.right,
        mode: state => state.ui.mode,
        currentCollection: state => state.collections.collection,
        isCollectionOpen: state => state.collections.isCollectionOpen
      }),
      sideBarComponent () {
        if (this.iconMode) {
          return 'icon-sidebar'
        } else {
          return 'collection-sidebar'
        }
      },
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
      },
      iconMode () {
        return this.mode === this.$store.state.ui.modes.ICON_MODE
      },
      collectionsMode () {
        return this.mode === this.$store.state.ui.modes.COLLECTIONS_MODE
      }
    },
    watch: {
      'user.authToken' () {
        if (this.loaded) {
          this.load()
        }
      }
    },
    mounted () {
      if (!this.loaded) {
        this.load()
      }

      this.collectionList = this.$el.querySelector('.collection-list')
      if (!this.sidebar) {
        return
      }
      this.collectionList.addEventListener('dragover', (e) => {
        e.stopPropagation()
        e.preventDefault()
        this.collectionList.classList.add('is-drag-over')
        e.dataTransfer.dropEffect = 'copy'
      }, false);
      this.collectionList.addEventListener('dragenter', (e) => {
        e.stopPropagation()
        e.preventDefault()
        this.collectionList.classList.add('is-drag-over')
      }, false);
      this.collectionList.addEventListener('dragleave', (e) => {
        e.stopPropagation()
        e.preventDefault()
        if (!this.collectionList.contains(e.fromElement)) {
          this.collectionList.classList.remove('is-drag-over')
        }
      }, false);

      this.collectionList.addEventListener('drop', this.handleDrop, false);
    },
    beforeDestroy () {
      if (this.collectionList) {
        this.collectionList.removeEventListener('drop', this.handleDrop, false)
      }
    },
    methods: {
      ...mapActions([
        'showRightSidebar',
        'hideRightSidebar',
        'hideLeftSidebar',
        'setIconMode',
        'setCollectionsMode',
        'loadCollections'
      ]),
      toggleSidebars () {
        this.showRightSidebar()
        this.hideLeftSidebar()
      },
      swipe () {
        this.hideRightSidebar()
        this.setIconMode()
      },
      load () {
        this.isLoading = true
        this.loadCollections()
          .then(() => {
            this.isLoading = false
            this.loaded = true
          })
          .catch(error => {
            console.log('error', error)
            this.loaded = true
          })
      },
      handleDrop (e) {
        e.stopPropagation()
        e.preventDefault()
        this.sidebar.classList.remove('is-drag-over')

        let data = e.dataTransfer.getData('text')
        if (data) {
          try {
            data = JSON.parse(data)
            const icon = data.icon
            if (icon) {
              this.toggleIconInCollection(icon)
              this.$analytics.trackIconClick({
                id: icon.id,
                term: this.$route.params.term
              })
            }
          } catch (e) {
            console.log('DnD data error', e)
          }
        }

        if (e.dataTransfer.files.length) {
          this.uploadIcons(Array.from(e.dataTransfer.files))
            .then(icons => {
              this.addIconsToCollection(icons)
            })
            .catch(error => {
              this.$error({
                title: 'Upload failed',
                text: error.message
              })
            })
          this.$analytics.track({
            event: 'Uploaded own SVG',
            category: 'Downloads'
          })
        }
        return false
      }
    }
  }
</script>

<style lang="scss">
  @import '../../assets/css/variables';
  @import '../../assets/css/breakpoints';

  .app-right-sidebar {
    position: absolute;
    z-index: 1;
    top: 0;
    right: -$right-sidebar-width;
    bottom: 0;
    width: $right-sidebar-width;
    padding: 24px;
    border-left: 1px solid #e9e9e9;
    transition: 0.3s all ease-in-out;
    overflow-y: auto;
    overflow-x: hidden;

    display: flex;
    flex-direction: column;

    &.is-active {
      right: 0;
    }

    .app-right-sidebar-toggle {
      width: $sidebar-toggle-width;
      position: absolute;
      top: 35px;
      right: 100%;
      height: 100%;
      margin-right: 1px;
      background: $color-grey-light;
      cursor: pointer;
      transition: 0.3s all ease;

      &:before {
        content: '';
        position: absolute;
        z-index: -1;
        top: 4rem;
        right: $sidebar-toggle-width;
        width: 1.25rem;
        height: 1.75rem;
        border-radius: 14px 0 0 14px;
        background: $color-grey-light;
        box-shadow: 0 0 1px rgba(0, 0, 0, 0.3);
      }
      &:after {
        content: '';
        position: absolute;
        top: 4.8rem;
        right: $sidebar-toggle-width;
        width: 12px;
        height: 2px;
        background: #bbb;
        box-shadow: 0 4px 0 #bbb, 0 -4px 0 #bbb;
      }

      &.is-active {
        display: none;
      }

    }

    @media (max-width: $responsive-app-right-sidebars-tiny) {
      width: 90%;
      min-width: 270px;
      max-width: 320px;
    }

    &.is-disabled {
      display: none;
    }

    .app-right-sidebar-content {
      position: absolute;
      top: 84px;
      bottom: 0;
      left: 0;
      right: 0;

      @media (max-width: $responsive-app-right-sidebars-tiny) {
        right: 0;
      }

      &.is-drag-over {
        box-shadow: inset 0 0 0 2px rgba($color-orange, 0.5), inset -1px 0 0 2px rgba($color-orange, 0.5);

        &:after {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: rgba($color-orange, 0.2);
        }
      }
    }

    .similar-icons, .collection-list {
      @media (max-width: $responsive-app-right-sidebars-tiny) {
        display: none;
      }
    }
  }
</style>
