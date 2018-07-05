<template lang="pug">
  .icon-workspace
    .content.clearfix
      .left-side-workspace.clearfix
        .icon.transparent-background(v-bind:class="{'is-unavailable': !isIconsAvailable({icon})}")
          template(v-if="previewIcon")
            app-icon(
              v-bind:key="1"
              v-bind:style="iconStyles"
              v-bind:icon="previewIcon"
              v-bind:custom-size="getCustomSize"
            )
          template(v-else)
            app-icon(
              v-bind:key="2"
              v-bind:style="iconStyles"
              v-bind:icon="icon"
              v-bind:custom-size="getCustomSize"
            )
          .paid(v-html="dollarIcon" v-if="!isIconsAvailable({icon})")
      .right-side-workspace.clearfix
        nuxt-link.title(v-bind:to="iconUrl") {{ computedIcon.synonim || computedIcon.name }}
        br
        nuxt-link.is-text.category(v-bind:to="categoryUrl") {{ computedIcon.category }} {{ subcategory }}
        icon-resolution-selector(v-if="icon.resolutions" v-bind:icon="icon")

        download-icon(
          v-bind:icon="icon"
          v-bind:compact="true"
          v-bind:disabled="!isIconsAvailable({icon})"
          v-bind:locale="lang"
        )

        app-ads
</template>

<script>
  import utils from '~/plugins/utils'
  import dollarIcon from '../../../public/assets/svg/dollar.svg'

  import { mapState, mapGetters } from 'vuex'

  export default {
    name: 'iconWorkspace',
    serverCacheKey: props => 'iconWorkspace',
    props: {
      icon: Object,
      previewIcon: Object
    },
    data () {
      return {
        dollarIcon,
        showAppStore: false,
        windowWidth: undefined,
        customSize: undefined
      }
    },
    computed: {
      ...mapState({
        packs: state => state.appInfo.packs,
        platform: state => state.platform.apiCode,
        lang: state => state.lang.locale,
        computedIcon () {
          return this.previewIcon || this.icon
        }
      }),
      ...mapGetters(['isIconsAvailable']),
      iconUrl () {
        return utils.getIconUrl(this.computedIcon)
      },
      categoryUrl () {
        const pack = this.packs.find(pack => pack.name[this.lang] === this.computedIcon.category)
        if (pack) {
          return `${utils.getPackUrl(pack.code)}/${this.platform}`
        } else {
          return `/icon/new-icons/${this.platform}`
        }
      },
      subcategory () {
        return this.computedIcon.subcategory ? '/ ' + this.computedIcon.subcategory : ''
      },
      iconStyles () {
        return {
          fill: `#${this.$store.state.icon.color}`
        }
      },
      getCustomSize () {
        if (this.windowWidth < 950) {
          return 160
        } else {
          return 200
        }
      }
    },
    mounted () {
      if (utils.isMacOS()) {
        this.showAppStore = true
      }
      this.$nextTick(() => {
        window.addEventListener('resize', () => {
          this.windowWidth = window.innerWidth
        });
      })
    }
  }
</script>

<style lang="scss" scoped>
  @import '../../assets/css/mixins';
  .icon-workspace {
    position: absolute;
    top: 48px;
    bottom: 0;
    left: 0;
    right: 0;
    overflow-y: auto;

    .content {
      padding: 1rem 1rem 0;
      text-align: center;
    }

    .title {
      @include font-title;
      display: inline-block;
      font-size: 22px;
      line-height: 28px;
      min-width: 1px;
      min-height: 29px;
      color: #4a4a4a;
      margin-bottom: 8px;
      vertical-align: top;
      border-bottom: 1px solid #ccc;
      transition: all 0.4s ease;

      &:hover {
        border-bottom: 1px solid #4a4a4a;
      }
    }
    .category {
      display: inline-block;
      min-height: 26px;
      min-width: 1px;
      vertical-align: top;
    }

    .icon {
      position: relative;
      width: 9rem;
      height: 9rem;
      margin: 32px auto;
      box-shadow: 0 1px 3px rgba(0,0,0,.2);

      &.is-unavailable {
        &>.app-icon {
          opacity: 0.35;
        }
      }

      &>.app-icon, &>.app-icon /deep/ >img {
        width: 100%;
        height: 100%;
      }
    }

    .paid {
      position: absolute;
      z-index: 2;
      top: -4px;
      left: -4px;
      width: 48px;
      height: 48px;
      transition: all 0.2s ease;
    }

    .app-ads {
      width: 300px;
      margin-left: -4px;
    }

    .download-app {
      display: block;
      margin-top: 2px;
      &>img {
        width: 45%;
      }
    }
  }
</style>
