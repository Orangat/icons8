<template lang="pug">
  .app-search
    .app-search-input
      .app-search-icon(v-html="$icons.search")
      auto-complete(
        v-bind:placeholder="$t('WEB_APP.SEARCH.PLACEHOLDER')"
        v-bind:options="options"
        v-model="term"
        v-on:submit="search"
        v-on:suggest="getOptions"
      )
    grid-selector(
      v-if="gridSelector"
      v-bind:extended="extendedGridSelector"
    )
    .actions(v-if="collections")
      .go-back(v-if="isCollectionOpen" v-on:click="closeCollection")
        .go-back-icon(v-html="$icons.left")
        | Go back
      .collections(
        v-if="!isCollectionOpen"
        v-on:click.stop="toggleSidebars"
        v-bind:class="{'is-active': isCollectionsMode}"
      )
        .collection-icon(v-html="$icons.collections")
        | My Collections
      a.request(href="https://icons8.com/request-icon") Request Icon
</template>

<script>
  import searchIcon from '../../../public/assets/svg/search.svg'
  import collIcon from '../../assets/svg/collections.svg'

  import api from '~/plugins/api'
  import utils from '~/plugins/utils'
  import debounce from 'debounce'

  import { mapState, mapActions } from 'vuex'

  export default {
    name: 'appSearch',
    serverCacheKey: props => JSON.stringify(props),
    props: {
      gridSelector: {
        'default': false
      },
      extendedGridSelector: {
        'default': false
      },
      locale: {
        type: String,
        'default': 'en-US'
      },
      collections: {
        'default': true
      }
    },
    data () {
      return {
        term: '',
        options: [],
        searchIcon,
        collIcon
      }
    },
    computed: {
      ...mapState({
        mode: state => state.ui.mode,
        platform: state => state.platform,
        currentCollection: state => state.collections.collection,
        isCollectionOpen: state => state.collections.isCollectionOpen
      }),
      isCollectionsMode () {
        return this.mode === this.$store.state.ui.modes.COLLECTIONS_MODE
      }
    },
    methods: {
      ...mapActions([
        'showRightSidebar',
        'hideRightSidebar',
        'setIconMode',
        'setCollectionsMode',
        'closeCollection'
      ]),
      toggleSidebars() {
        if (this.isCollectionsMode) {
          this.hideRightSidebar()
          this.setIconMode()
        } else {
        this.showRightSidebar()
        this.setCollectionsMode()
        }
      },
      search () {
        if (this.term) {
          this.$router.push({
            path: `/icon/set/${utils.normalizeValue(this.term)}/${this.platform.seoCode}`
          })
        }
      },
      getOptions: debounce(function (term) {
        const normalized = utils.normalizeValue(term)
        if (!normalized || normalized.length < 3) {
          this.options = []
        } else {
          api.suggest({normalized}).then(options => {
            this.options = options
          })
        }
      }, 300)
    },
    mounted () {
      if (this.$route.params.term) {
        this.term = utils.prettifyValue(this.$route.params.term)
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '../../assets/css/variables';
  @import '../../assets/css/mixins';

  $search-height: 3rem;
  $search-background: rgba(243, 243, 243, 0.98);

  .app-search {
    display: flex;
    position: fixed;
    z-index: 2;
    top: $menu-height - 7px;
    left: $left-sidebar-width;
    right: 0;
    padding: 24px 24px 12px;
    background: white;
    border-radius: 0 10px 0 0;

    .app-search-input {
      position: relative;
      flex: 1;

      & /deep/ input {
        height: $search-height;
        padding: 4px 32px 4px 15px;
        @include font-bold;
        background: $search-background;
        border: none;
        font-weight: 400;
        font-size: 20px;
        @media (max-width: 1438px) {
          width: 100%;
        }
      }
    }

    .app-search-icon {
      position: absolute;
      z-index: 2;
      top: 4px;
      right: 0;
      width: $search-height - 0.4rem;
      height: $search-height - 0.4rem;
      padding: 0.5rem;

      cursor: pointer;

      &>svg {
        fill: #000;
        transition: all 0.3s ease;

        &:hover {
          fill: #888;
        }
      }
    }

    .grid-selector {
      margin-right: 24px;
    }

    .actions {
      display: flex;
      justify-content: space-between;
      width: $right-sidebar-width - 24px;
      height: 32px;
      padding-left: 25px;
      margin-top: 8px;
    }

    .collections{
      display: inline-block;
      cursor: pointer;
      font-size: 16px;
      color: #000000;
      line-height: 32px;

      &:hover, &.is-active {
        color: $color-blue;
      }
    }

    .collection-icon{
      position: relative;
      top: 5px;
      display: inline-block;
      width: 20px;
      height: 20px;
      margin-right: 10px;
      line-height: 32px;

      & > /deep/ svg {
        fill: currentColor;
      }
    }

    .go-back {
      line-height: 32px;
      height: 32px;
      cursor: pointer;
      color: #000000;

      &:hover {
        color: $color-blue;
      }
    }

    .go-back-icon {
      display: inline-block;
      position: relative;
      top: 4px;
      width: 20px;
      margin-right: 4px;
      & > /deep/ svg {
        width: 100%;
        fill: currentColor;
      }
    }

    .request{
      color: #4C3C0F;
      font-size: 16px;
      display: inline-block;
      background: #F3D583;
      background: linear-gradient(to right, rgb(243, 213, 131) 0%, rgb(254, 217, 163) 80%);
      padding: 0 20px;
      line-height: 32px;
      border-radius: 6px;
    }
  }
</style>
