<template lang="pug">
  .download-icon(
    v-bind:class="{'is-compact': compact}"
  )

    download-selector(
      ref="selector"
      v-bind:icon="icon"
      v-bind:download-multiple="true"
      v-bind:popup-position="selectorPopupPosition"
    )

    .actions.button-group
      .button(
        v-ripple
        v-on:click="download"
        v-bind:class="{'is-loading': isDownloading, 'is-disabled': disabled}"
      ) {{$t('WEB_APP.SINGLE_ICON.DOWNLOAD_BUTTON')}}
      .button(
        v-ripple
        v-if="isHtmlAvailable"
        v-on:click="generateHtml"
        v-bind:class="generateButtonClasses"
      ) {{$t('WEB_APP.SINGLE_ICON.GENERATE_HTML')}}

    share-icon(
      v-if="!compact"
      v-bind:icon="icon"
    )

    generate-html(v-bind:icon="icon" ref="generateHtml")

    app-modal(
      ref="modal"
      name="buy-after-download-modal"
      v-bind:width="540"
      v-bind:content-class="'is-big'"
    )
      h3.title(v-html="buyPopup.title")
      .description(v-html="buyPopup.description")
      a.button(href="/buy") {{buyPopup.action}}
</template>

<script>
  import { mapState, mapActions } from 'vuex'

  export default {
    name: 'downloadIcon',
    //serverCacheKey: props => JSON.stringify(props),
    props: {
      icon: {
        type: Object
      },
      compact: {
        type: Boolean,
        'default': false
      },
      disabled: {
        type: Boolean,
        'default': false
      },
      locale: {
        type: String,
        'default': 'en-US'
      }
    },
    data () {
      return {
        isDownloading: false,
        buyPopup: {
          title: undefined,
          description: undefined,
          action: undefined
        }
      }
    },
    computed: {
      ...mapState({
        options: state => state.icon,
        user: state => state.auth.user
      }),
      link () {
        return `ic8.link/${this.icon.id}`
      },
      generateButtonClasses () {
        return {
          'is-white': !this.compact,
          'is-gray': this.compact,
          'is-disabled': this.disabled
        }
      },
      selectorPopupPosition () {
        return this.compact ? 'center' : 'top'
      },
      isHtmlAvailable () {
        return this.options.format === 'png' || this.options.format === 'svg'
      }
    },
    methods: {
      ...mapActions(['downloadIcon', 'downloadCollection']),
      download () {
        if (this.disabled) {
          return
        }
        this.isDownloading = true
        this.$analytics.trackIconDownload({
          icon: this.icon,
          options: this.options
        })
        let downloading
        if (this.$refs.selector.isMultiSize) {
          const sizes = this.$refs.selector.selectedSizes
          downloading = this.downloadCollection({
            collection: {
              name: this.icon.name + '-' + sizes.map(size => size.title).join('-') + 'px'
            },
            icons: sizes.map(size => {
              return Object.assign({size: size.title, iconId: this.icon.id}, this.icon)
            }),
            options: this.options
          })
        } else {
          downloading = this.downloadIcon({
            icon: this.icon,
            options: {
              ...this.options,
              size: this.$refs.selector.currentSize
            }
          })
        }
        downloading
          .then(() => {
            this.isDownloading = false
            this.popupsOnDownload()
          })
          .catch(error => {
            this.isDownloading = false
            console.error(error)
          })
      },
      generateHtml () {
        if (this.disabled) {
          return
        }
        this.$analytics.track({
          event: 'Generated HTML',
          category: 'Downloads',
        })
        this.$modal.show('generate-html')
        this.$refs.generateHtml.generateHtml(this.options)
      },
      popupsOnDownload () {
        if (this.user.isGuest) {
          const firstDownload = localStorage.getItem('firstDownload')
          if (!firstDownload) {
            localStorage.setItem('firstDownload', 'true')
            this.login()
          } else {
            if (this.random()) {
              this.login()
            }
          }
        }
        if (!this.user.isGuest && !this.user.activeLicense) {
          const firstDownload = localStorage.getItem('firstUnpaidDownload')
          if (!firstDownload) {
            localStorage.setItem('firstUnpaidDownload', 'true')
            this.buy()
          } else {
            if (this.random()) {
              this.buy()
            }
          }
        }
      },
      random () {
        return Math.floor(Math.random() * 3) === 0
      },
      login () {
        const random = Math.floor(Math.random() * 5) + 1
        const title = this.$t(`WEB_APP.REGISTER_MODAL.TITLE_${random}`)
        this.$modal.show('login-modal', {
          mode: 'register',
          registerTitle: title,
          loginTitle: title,
          description: this.$t(`WEB_APP.REGISTER_MODAL.DESCRIPTION_1`)
        })
      },
      buy () {
        const random = Math.floor(Math.random() * 6) + 1
        this.buyPopup.title = this.$t(`WEB_APP.PAID_FEATURES.TITLE_${random}`)
        this.buyPopup.description = this.$t(`WEB_APP.PAID_FEATURES.DESCRIPTION_${random}`)

        let buyString = ''
        switch (random) {
          case 1: buyString = `WEB_APP.PAID_FEATURES.BUY_1`; break
          case 2: buyString = `WEB_APP.PAID_FEATURES.BUY_2`; break
          case 3: buyString = `WEB_APP.PAID_FEATURES.BUY_1`; break
          case 4: buyString = `WEB_APP.PAID_FEATURES.BUY_1`; break
          case 5: buyString = `WEB_APP.PAID_FEATURES.BUY_3`; break
          case 6: buyString = `WEB_APP.PAID_FEATURES.BUY_3`
            this.buyPopup.description = this.$t(`WEB_APP.PAID_FEATURES.DESCRIPTION_5`)
            break
        }
        this.buyPopup.action = this.$t(buyString, {price: '$19.90'})
        this.$modal.show('buy-after-download-modal')
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '../../../public/assets/css/variables';
  @import '../../../public/assets/css/breakpoints';
  @import '../../assets/css/mixins';

  .download-icon {
    display: flex;
    justify-content: space-between;
    max-width: 54rem;
    margin: 0 auto;

    @media (max-width: $responsive-app) {
      display: flex;
      flex-direction: column;
    }

    &.is-compact {
      display: block;
      text-align: left;

      & > .download-selector {
        white-space: nowrap;
        margin: 20px 0 30px;
        min-width: 0;
      }

      & > .actions {
        & > .button {
          @include font-regular;
          font-family: 'Helvetica Neue', sans-serif;
          margin: 0 10px 0 0;
          width: 138px;
          min-width: 0;
          font-size: 18px;
          border-radius: 5px;
        }
        & > .button.is-gray {
          margin: 0;
          width: 187px;
          border: 2px solid rgba(0,0,0,0.4);
          color: rgba(0,0,0,0.4);
        }
      }
    }

    .download-selector {
      min-width: 170px;
      @media (max-width: $responsive-app) {
        text-align: center;
      }
    }
    .share-icon {
      min-width: 170px;
      margin-top: 4px;
      text-align: center;
    }

    .actions {
      & > .button {
        min-width: 11rem;
        padding: 0 16px;
      }
    }

  }
</style>
