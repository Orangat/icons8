<template lang="pug">
  .icon-grid
    app-accordion#app-accordion(
      v-show="isAccordionShown"
      ref="accordion"
    )

    // icons and labels styles
    template(v-if="gridStyle !== 'grid'")

      // Icons list
      .set(
        v-if="icons && icons.length"
        v-bind:class="{'is-labels-shown': showLabels}"
      )
        nuxt-link.icon(
          v-ripple
          v-bind:event="''"
          v-for="(icon, index) in icons"
          v-bind:ref="`icon-${icon.id}`"
          v-bind:key="icon.id"
          v-bind:to="getIconUrl(icon)"
          v-on:click.native.stop.prevent.capture="iconAction(icon, index)"
          v-bind:class="iconClasses(icon)"
        )
          app-icon(
            v-bind:icon="icon"
            v-bind:lazy="index >= 10"
            v-bind:color="color.value"
            v-bind:alt="getIconAlt(icon)"
          )
          .paid(v-html="dollarIcon" v-if="!isIconsAvailable({icon})")
          .icon-title(v-if="showLabels") {{ getIconTitle(icon) }}
          .pointer(v-if="isAccordionShown && selectedIcon === icon" v-html="$icons.selectionPointer")

      // Icons Category
      template(
        v-if="category"
        v-for="subcategory in category.subcategory"
      )
        h6.title {{ subcategory.name }}

        .set.is-category(v-bind:class="{'is-labels-shown': showLabels}")
          nuxt-link.icon(
            v-ripple
            v-bind:event="''"
            v-for="(icon, index) in subcategory.icons"
            v-bind:ref="`icon-${icon.id}`"
            v-bind:key="icon.id"
            v-bind:to="getIconUrl(icon)"
            v-on:click.native.stop.prevent.capture="iconAction(icon)"
            v-bind:class="iconClasses(icon)"
          )
            app-icon(
              v-bind:icon="icon"
              v-bind:lazy="index >= 10"
              v-bind:color="color.value"
              v-bind:alt="getIconAlt(icon)"
            )
            .paid(v-html="dollarIcon" v-if="!isIconsAvailable({icon})")
            .icon-title(v-if="showLabels") {{ getIconTitle(icon) }}
            .pointer(v-if="isAccordionShown && selectedIcon === icon" v-html="$icons.selectionPointer")

    // table styles
    template(v-if="gridStyle === 'grid'")

      // Icons list
      .grid(v-if="icons && icons.length")
        .row
          .column.is-name
          .column(v-for="platform in realPlatforms") {{ platform.title }}

        .row(v-for="icon in commonIdIcons")
          .column.is-name {{ icon.name }}
          .column(v-for="platform in realPlatforms")
            nuxt-link.icon(
              v-ripple
              v-bind:event="''"
              v-if="getPlatformIcon(icon, platform)"
              v-bind:ref="`icon-${getPlatformIcon(icon, platform).id}`"
              v-bind:to="getIconUrl(getPlatformIcon(icon, platform))"
              v-on:click.native.stop.prevent.capture="iconAction(getPlatformIcon(icon, platform))"
              v-bind:class="iconClasses(getPlatformIcon(icon, platform))"
            )
              app-icon(
                v-bind:icon="getPlatformIcon(icon, platform)"
                v-bind:color="color.value"
                v-bind:alt="getIconAlt(icon)"
              )
              .pointer(v-if="isAccordionShown && selectedIcon === getPlatformIcon(icon, platform)" v-html="$icons.selectionPointer")

            .icon.is-empty(
              v-if="!getPlatformIcon(icon, platform)"
              v-on:click="requestIconModal(icon, platform)"
            )

      // Icons Category
      template(
        v-if="category"
        v-for="subcategory in category.subcategory"
      )
        h6.title {{ subcategory.name }}

        .grid
          .row
            .column.is-name
            .column(v-for="platform in realPlatforms") {{ platform.title }}

          .row(v-for="icon in subcategory.commonIdIcons")
            .column.is-name {{ icon.name }}
            .column(v-for="platform in realPlatforms")
              nuxt-link.icon(
                v-ripple
                v-bind:event="''"
                v-if="getPlatformIcon(icon, platform)"
                v-bind:ref="`icon-${getPlatformIcon(icon, platform).id}`"
                v-bind:to="getIconUrl(getPlatformIcon(icon, platform))"
                v-on:click.native.stop.prevent.capture="iconAction(getPlatformIcon(icon, platform))"
                v-bind:class="iconClasses(getPlatformIcon(icon, platform))"
              )
                app-icon(
                  v-bind:icon="getPlatformIcon(icon, platform)"
                  v-bind:color="color.value"
                  v-bind:alt="getIconAlt(icon)"
                )
                .pointer(v-if="isAccordionShown && selectedIcon === getPlatformIcon(icon, platform)" v-html="$icons.selectionPointer")

              .icon.is-empty(
                v-if="!getPlatformIcon(icon, platform)"
                v-on:click="requestIconModal(icon, platform)"
              )

      app-modal(
        name="icon-grid-request-icon"
        v-bind:content-class="'icon-grid-request-icon-modal'"
       )
        span.close-modal-button(
          v-html="$icons.closeModal"
          v-on:click="closeRequestModal"
        )
        template(v-if="!iconRequested")
          h2 Request Icon
          p(v-html="$t('WEB_APP.REQUEST_ADD_MODAL.TITLE')")
          div.info-block
            span.snowflake-pic(v-html="$icons.snowflake")
            span.modal-span(v-html="$t('WEB_APP.REQUEST_ADD_MODAL.CATCH_TITLE')" )
            strong(v-html="$t('WEB_APP.REQUEST_ADD_MODAL.ASK_SHARE')")
            br
            span.info-block-description(v-html="$t('WEB_APP.REQUEST_ADD_MODAL.SHARE_IDEA')")
            .button(
              v-on:click="requestIcon"
              v-bind:class="{'is-loading': requestingIcon}"
            ) {{ $t('REQUEST_ICONS.REQUEST_PAGES.NEXT', 'Next') }}
        template(v-if="iconRequested")
          h2 You Requested Icon!
          p.share-description
            span(v-html="$t('REQUEST_ICONS.SHARE.TITLE')")
          div.info-block
            share-link(v-bind:text="shareText" v-bind:url="shareUrl")
            .button(
              v-on:click="closeRequestModal"
              v-bind:class="{'is-loading': requestingIcon}"
            ) {{ $t('REQUEST_ICONS.I_SHARED') }}
</template>

<script>
  import axios from '~/plugins/axios'
  import utils from '~/plugins/utils'
  import config from '~/plugins/config'
  import dollarIcon from '../../../public/assets/svg/dollar.svg'
  import { mapState, mapActions, mapGetters } from 'vuex'

  export default {
    name: 'iconGrid',
    props: {
      icons: {
        type: Array,
        'default' () {
          return []
        }
      },
      category: {
        type: Object,
        'default' () {
          return {subcategory: []}
        }
      },
      gridStyle: {
        type: String,
        validator (value) {
          return value === 'icons' || value === 'labels' || value === 'grid'
        },
        'default': 'labels'
      },
      action: {
        type: String,
        'default': 'navigate',
        validator (value) {
          return value === 'navigate' || value === 'select'
        }
      },
      activeGrid: String,
      id: String
    },
    data () {
      return {
        dollarIcon,
        requestedIcon: undefined,
        requestedPlatform: undefined,
        requestingIcon: false,
        iconRequested: false,
        shareText: '',
        shareUrl: '',
        showAccordion: false,
        selectedIconIndex: 0
      }
    },
    computed: {
      ...mapGetters(['isIconsAvailable']),
      ...mapState({
        mode: state => state.ui.mode,
        collection: state => state.collections.collection,
        platforms: state => state.appInfo.platforms,
        locale: state => state.lang.locale,
        color: state => state.color,
        shape: state => state.shape,
        format: state => state.format,
        selectedIcon: state => state.icon.selectedIcon
      }),
      showLabels () {
        return this.gridStyle === 'labels'
      },
      isIcon () {
        return this.mode === this.$store.state.ui.modes.ICON_MODE
      },
      isCollection () {
        return this.mode === this.$store.state.ui.modes.COLLECTIONS_MODE
      },
      realPlatforms () {
        let realPlatforms = Object.keys(this.platforms)
          .map(platform => this.platforms[platform])
          .filter(platform => platform.apiCode !== 'all')
          .sort((a, b) => {
            return a.order - b.order
          })
        realPlatforms.unshift({
          title: realPlatforms[0].title + ' Filled',
          apiCode: realPlatforms[0].apiCode + 'Filled'
        })
        return realPlatforms
      },
      commonIdIcons () {
        return this.groupByCommonId(this.icons)
      },
      isAccordionShown () {
        return this.isIcon && this.showAccordion && this.activeGrid === this.id
      }
    },
    watch: {
      icons () {
        // force component render in case new page icons array have the same length
        this.$forceUpdate()
      },
      category: {
        handler () {
          this.category.subcategory.forEach(subcategory => {
            subcategory.commonIdIcons = this.groupByCommonId(subcategory.icons)
          })
        },
        deep: true
      }
    },
    mounted () {
      this.category.subcategory.forEach(subcategory => {
        subcategory.commonIdIcons = this.groupByCommonId(subcategory.icons)
      })
      window.addEventListener('resize', this.moveAccordion, false);
    },
    beforeDestroy () {
      window.removeEventListener('drop', this.moveAccordion, false)
    },
    methods: {
      ...mapActions([
        'hideLeftSidebar',
        'selectIcon',
        'toggleIconInCollection'
      ]),
      getIconUrl (icon) {
        return utils.getIconUrl(icon)
      },
      getIconTitle (icon) {
        let title = `${icon.name}`
        if (this.color && this.color.code !== 'black') {
          title = this.color.title + ' ' + title
        }
        return title
      },
      getIconAlt (icon) {
        return this.getIconTitle(icon) + ' icon'
      },
      groupByCommonId (icons) {
        let commonIdIcons = {}
        icons.forEach((icon, index) => {
          const platform = icon.platform + (icon.filled ? 'Filled' : '')
          if (commonIdIcons[icon.commonId]) {
            commonIdIcons[icon.commonId].icons[platform] = icon
          } else {
            commonIdIcons[icon.commonId] = {
              id: icon.commonId,
              order: index,
              icons: {
                [platform]: icon
              },
              name: icon.name
            }
          }
        })
        commonIdIcons = Object.keys(commonIdIcons)
          .map(id => commonIdIcons[id])
          .sort((a, b) => {
            return a.order - b.order
          })
        return commonIdIcons
      },
      getPlatformIcon (commonIdIcon, platform) {
        return commonIdIcon.icons[platform.apiCode]
      },
      iconAction (icon, index) {
        this.$analytics.trackIconClick({
          id: icon.id,
          term: this.$route.params.term
        })
        if (this.action === 'navigate') {
          this.$router.push({
            path: this.getIconUrl(icon)
          })
        } else if (this.action === 'select') {
          this.hideLeftSidebar()
          if (this.isIcon) {
            this.selectIcon(icon)
            this.selectedIconIndex = index
            this.toggleAccordion(icon)
            this.$analytics.page({
              name: 'Product Page',
              url: this.getIconUrl(icon)
            })
          }
          if (this.isCollection) {
            this.toggleIconInCollection(icon)
              .catch(error => {
                console.error(error)
                this.$error({
                  title: 'Collection sync error!',
                  text: error.message
                })
              })
          }
        }
      },
      moveAccordion () {
        const iconRef = this.$refs[`icon-${this.selectedIcon.id}`]
        if (!iconRef) {
          return
        }
        const $icon = iconRef[0].$el
        const $accordion = this.$refs.accordion.$el
        if (this.gridStyle === 'grid') {
          const $row = $icon.parentNode.parentNode
          $row.parentNode.insertBefore($accordion, $row.nextSibling)
          const rowWidth = Math.max($row.scrollWidth, $row.offsetWidth, $row.clientWidth)
          $accordion.style.width = rowWidth + 'px'
        } else {
          const styleIcon = $icon.currentStyle || window.getComputedStyle($icon)
          const $parent = $icon.parentNode
          const iconWidth = $icon.offsetWidth + parseFloat(styleIcon.marginLeft) + parseFloat(styleIcon.marginRight)
          const parentWidth = $parent.offsetWidth
          const countIcon = Math.floor(parentWidth / iconWidth)
          let iconRowIndex = (this.selectedIconIndex + 1) % countIcon
          if (iconRowIndex === 0 ) {
            iconRowIndex = countIcon
          }
          let lastIconIndex = this.selectedIconIndex + (countIcon - iconRowIndex)
          if (lastIconIndex > this.icons.length) {
            lastIconIndex = this.icons.length - 1
          }
          const lastIcon = this.icons[lastIconIndex]
          const $lastIcon = this.$refs[`icon-${lastIcon.id}`][0].$el
          $lastIcon.parentNode.insertBefore($accordion, $lastIcon.nextSibling)
        }
      },
      openAccordion () {
        this.moveAccordion()
        this.showAccordion = true
        const searchOffset = 84
        let iconOffset = 152
        if (this.gridStyle === 'icons' || this.gridStyle === 'grid') {
          iconOffset = 112
        }
        setTimeout(() => {
          this.$scrollTo(this.$el.querySelector('#app-accordion'), 500, {offset: - (iconOffset + searchOffset)})
        }, 200)
        setTimeout(() => {
          this.$emit('activate', this.id)
        })
      },
      closeAccordion () {
        this.showAccordion = false
      },
      toggleAccordion (icon) {
        if (this.selectedIcon === icon) {
          this.openAccordion()
        } else {
          this.closeAccordion()
        }
      },
      iconClasses (icon) {
        const isSelected = this.isIconInCollection(icon) && this.isCollection
        return {
          'is-selected': isSelected || icon === this.selectedIcon,
          'is-unavailable': !this.isIconsAvailable({icon}),
          'is-white': this.color.value === 'ffffff',
          'is-no-labels': !this.showLabels && this.gridStyle !== 'grid'
        }
      },
      isIconInCollection (icon) {
        if (!icon) {
          return true
        }
        let exists = false
        if (Array.isArray(this.collection.icons)) {
          this.collection.icons.some(i => {
            if (i.iconId === icon.id && !icon.user_icon_id) {
              exists = true
              return true
            }
          })
        }
        return exists
      },
      requestIconModal (icon, platform) {
        this.requestedIcon = icon
        this.requestedPlatform = platform
        this.iconRequested = false
        this.$modal.show('icon-grid-request-icon')
      },
      requestIcon () {
        this.requestingIcon = true
        const icon = this.requestedIcon.icons[Object.keys(this.requestedIcon.icons)[0]]
        const name = icon.commonName ? utils.prettifyValue(icon.commonName) : icon.name
        const data = new FormData()
        data.append('Idea[title]', name)
        data.append('platform_id[]', this.requestedPlatform.id)
        data.append('commonIconId', this.requestedIcon.id)
        axios.request({
          url: `/idea/create?language=${this.locale}`,
          baseURL: config.backendUrl,
          method: 'post',
          data
        })
          .then(response => {
            this.requestingIcon = false
            const idea = response.data.idea
            if (response.data.status === 'success' && idea) {
              this.iconRequested = true
              this.shareText = 'Vote for my icon idea: ' + idea.title
              this.shareUrl = `${config.backendUrl}/request-icon/idea/${idea.idea_id}/${utils.normalizeValue(idea.title)}`
            } else {
              this.$error({
                title: 'Requesting failed',
                text: response.data.errors
              })
            }
          })
          .catch(error => {
            this.requestingIcon = false
            this.$error({
              title: 'Requesting failed',
              text: error.message
            })
          })
      },
      closeRequestModal () {
        this.$modal.hide('icon-grid-request-icon')
      }
    }
  }
</script>

<style lang="scss">
  .icon-grid-request-icon-modal {
    position: relative;

    .close-modal-button {
      position: absolute;
      top: 20px;
      right: 20px;
      width: 16px;
      height: 16px;
      cursor: pointer;
    }

    &.app-modal.icon-grid-request-icon-modal {
      width: 512px;
      padding: 32px 48px 0;
      text-align: left;
      border-radius: 8px;
      font-family: 'Helvetica Neue', 'Segoe UI', 'Fira Sans', Roboto, Oxygen, Ubuntu, 'Droid Sans', 'Arial', sans-serif;
      font-weight: 400;

      @media (max-width: 45rem) {
        width: 400px;
        padding: 1rem 0 2rem;
      }

      &>h2 {
        font-size: 32px;
        text-align: left;
        margin: 8px 0 5px;
        font-weight: 400;
      }

      &>p {
        margin: 0;
        font-size: 16px;
        font-weight: 400;
        line-height: 24px;
        width: 84%;

        &.share-description {
          margin-bottom: 58px;
        }
      }

      .info-block {
        padding: 24px 48px 48px;
        margin: 32px -48px 0;
        background-color: #f3f3f3;
        font-size: 16px;
        color: #484848;
        line-height: 24px;
        position: relative;
        border-radius: 0 0 8px 8px;

        @media (max-width: 45rem) {
          padding: 1rem;
          margin-bottom: 1rem;
        }
      }

      .button {
        height: 48px;
        width: 136px;
        font-size: 18px;
        line-height: 48px;
        padding: 0;
        font-weight: 300;
        border-radius: 6px;
      }

      .share-link {
        text-align: left;
        margin: 24px -8px 48px;

        .item {
          border-radius: 4px;

          &.is-twitter {
            background-color: #5CBFE5;

            &:hover {
              background-color: #53a9ca;
            }
          }

          &.is-facebook {
            background-color: #5C699D;

            &:hover {
              background-color: #49537d;
            }
          }

          &.is-google {
            background-color: #D55F5D;

            &:hover {
              background-color: #b75351;
            }
          }
        }
      }
      
      .info-block-description {
        margin-bottom: 20px;
        display: block;
      }

      .snowflake-pic {
        position: absolute;
        top: 27px;
        left: 23px;
        width: 20px;
        height: 20px;
      }

      .m-facebook-color {
        color: #4a90e2;
      }
      .m-twitter-color {
        color: #00c3e4;
      }

      .modal-span {
        font-size: 12px;
        text-transform: uppercase;
        color: rgba(0,0,0,0.3);
        position: relative;
      }
    }
  }
</style>

<style lang="scss" scoped>
  @import '../../../public/assets/css/variables';
  @import '../../../public/assets/css/mixins';

  .icon-grid {
    .grid {
      margin: 0 -8px;

      .app-left-sidebar-content {
        padding: 0;
      }

    }

    &.is-loading {
      @include loading;
    }

    .title {
      margin: 0 auto 1rem;
      text-align: left;
      font-size: 12px;
    }

    .set {
      display: flex;
      flex-flow: row wrap;
      margin: 0 -8px;

      &.is-labels-shown {
        .icon {
          width: 112px;
          height: 136px;
          margin: 8px;

          &>.app-icon {
            margin: 8px auto 4px;
          }
        }
      }

      &.is-category {
        margin-bottom: 2rem;
      }
    }

    .icon {
      position: relative;
      display: inline-block;
      width: 112px;
      height: 96px;
      border: none;
      border-radius: 5px;
      cursor: pointer;
      transition: all 0.2s ease;
      text-decoration: none;

      &.is-no-labels {
        margin: 8px;
      }

      &.is-white {
        background: #dadada;
      }

      &:hover, &.is-selected, &.is-clicked {
        background: #f4f4f4;
        color: black;

        &.is-white {
          background: #d2d2d2;
        }
      }

      &.is-unavailable {
        &>.app-icon {
          opacity: 0.35;
        }
        &>.paid {
          opacity: 0;
        }
        &:hover>.paid {
          opacity: 1;
        }
      }

      &.is-empty {
        &:before {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          margin-left: -10px;
          height: 1px;
          width: 22px;
          border-bottom: 2px solid #d2d2d2;
        }
        &:after {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          margin-top: -10px;
          height: 22px;
          width: 1px;
          border-right: 2px solid #d2d2d2;
        }
      }

      &>.app-icon {
        margin: 16px auto 10px;
      }
    }

    .paid {
      position: absolute;
      z-index: 2;
      top: 0.5rem;
      left: 1rem;
      width: 25px;
      height: 25px;
      transition: all 0.2s ease;
    }

    .pointer {
      position: absolute;
      bottom: 4px;
      width: 27px;
      height: 6px;
      left: 50%;
      margin-left: -14px;

      & /deep/ svg {
        fill: #e8e8e8;
        width: 100%;
      }
    }

    .icon-title {
      position: relative;
      text-align: center;
      color: $color-font;
      line-height: 16px;
      max-width: 90%;
      margin: 0 auto;
      font-size: 12px;
      padding-top: 17px;
      max-height: 52px;
      overflow: hidden;
    }

    .row {
      white-space: nowrap;
    }

    .column {
      min-width: 112px;
      max-width: 112px;
      max-height: 96px;
      font-size: 14px;
      text-align: center;
      vertical-align: middle;
      display: inline-block;
      margin: 6px 8px;

      &.is-name {
        text-align: left;
        overflow-x: hidden;
      }
    }

    .bounce-enter-active {
      animation: bounce 0.25s;
    }
    .bounce-leave-active {
      animation: bounce 0.25s reverse;
    }
    @keyframes bounce {
      0% {
        transform: translateY(-20px);
        opacity: 0;
      }
      100% {
        transform: translateY(0px);
        opacity: 1;
      }
    }
  }
</style>
