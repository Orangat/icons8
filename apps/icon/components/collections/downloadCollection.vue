<template lang="pug">
  .download-collection

    download-collection-selector

    .actions.button-group
      .button(
        v-on:click="download"
        v-bind:class="{'is-loading': isDownloading}"
      ) {{$t('WEB_APP.COLLECTIONS.DOWNLOAD_BUTTON')}}

      .button.is-white(
        v-on:click="getFont"
        v-bind:class="{'is-loading': isFontDownloading}"
      ) {{$t('WEB_APP.COLLECTIONS.GET_FONT_BUTTON')}}

      .button.is-white(
        v-on:click="getSVGSet"
        v-bind:class="{'is-loading': isSetDownloading}"
      ) {{$t('WEB_APP.COLLECTIONS.GET_SVG_SET_BUTTON')}}

    app-popup.paid-popup(
      ref="paidPopup"
      v-bind:show-toggle="false"
      v-bind:position="'top-center'"
    )
      div(slot="content")
        p: b {{paidPopupTitle}}
        p {{$t('WEB_APP.COLLECTIONS.GENERATE_SOMETHING_DESCRIPTION')}}
        p
          a.button.is-tiny(href="/paid-license-99")  {{$t('WEB_APP.MESSAGES.SEE_PRICING')}}

</template>

<script>
  import { mapState, mapGetters, mapActions } from 'vuex'

  export default {
    name: 'downloadCollection',
    data () {
      return {
        isDownloading: false,
        isSetDownloading: false,
        isFontDownloading: false,
        paidPopupTitle: ''
      }
    },
    computed: {
      ...mapGetters(['isIconsAvailable', 'isColorPlatform']),
      ...mapState({
        options: state => state.icon,
        user: state => state.auth.user,
        collection: state => state.collections.collection
      })
    },
    methods: {
      ...mapActions(['downloadCollection', 'generateFont', 'generateIconSet']),
      getAvailableIcons (icons) {
        return this.isIconsAvailable({icons})
      },
      download () {
        if (this.isDownloading) {
          return
        }
        const icons = this.getAvailableIcons(this.collection.icons)
        if (!icons || !icons.length) {
          this.$notify({
            title: this.$t('WEB_APP.COLLECTIONS.DOWNOLADING_FAILED'),
            text: this.$t('WEB_APP.COLLECTIONS.NO_AVAILABLE_ICONS'),
            type: 'warning'
          })
          return
        }
        this.isDownloading = true
        this.$analytics.track({
          event: 'Download a collection',
          category: 'Downloads'
        })

        this.downloadCollection({
          collection: this.collection,
          icons,
          options: this.options
        })
          .then(() => {
            this.isDownloading = false
          })
          .catch(error => {
            this.isDownloading = false
            console.log('error', error)
            this.$error({
              title: this.$t('WEB_APP.COLLECTIONS.DOWNOLADING_FAILED'),
              text: error.message || (error.task ? `${error.task.status}<br>${error.task.description}` : '')
            })
          })
      },
      getFont () {
        this.$ensureLogin()
          .then(() => {
            if (this.isFontDownloading) {
              return
            }
            if (!this.user.activeLicense) {
              this.openPaidPopup(this.$t('WEB_APP.COLLECTIONS.GENERATE_FONT_TITLE'))
              return
            }
            const icons = this.getAvailableIcons(this.collection.icons)
            if (!icons || !icons.length) {
              this.$notify({
                title: this.$t('WEB_APP.COLLECTIONS.DOWNOLADING_FAILED'),
                text: this.$t('WEB_APP.COLLECTIONS.NO_AVAILABLE_ICONS'),
                type: 'warning'
              })
              return
            }
            if (this.hasColorIcons()) {
              this.$notify({
                title: this.$t('WEB_APP.COLLECTIONS.COLLECTION_COLOR_ICON_TITLE'),
                text: this.$t('WEB_APP.COLLECTIONS.COLLECTION_COLOR_ICON_DESCRIPTION'),
                type: 'warning'
              })
            }
            this.isFontDownloading = true
            this.$analytics.track({
              event: 'Generate a Font',
              category: 'Downloads'
            })
            this.generateFont({
              collection: this.collection,
              icons
            })
              .then(() => {
                this.isFontDownloading = false
              })
              .catch(error => {
                this.isFontDownloading = false
                console.log('error', error)
                this.$error({
                  title: this.$t('WEB_APP.COLLECTIONS.FONT_FAILED'),
                  text: error.task ? `${error.task.status}<br>${error.task.description}` : ''
                })
              })
          })
      },
      getSVGSet () {
        this.$ensureLogin()
          .then(() => {
            if (this.isSetDownloading) {
              return
            }
            if (!this.user.activeLicense) {
              this.openPaidPopup(this.$t('WEB_APP.COLLECTIONS.GENERATE_SVG_TITLE'))
              return
            }
            const icons = this.getAvailableIcons(this.collection.icons)
            if (!icons || !icons.length) {
              this.$notify({
                title: this.$t('WEB_APP.COLLECTIONS.DOWNOLADING_FAILED'),
                text: this.$t('WEB_APP.COLLECTIONS.NO_AVAILABLE_ICONS'),
                type: 'warning'
              })
              return
            }
            this.isSetDownloading = true
            this.$analytics.track({
              event: 'Get SVG set',
              category: 'Downloads'
            })
            this.generateIconSet({
              collection: this.collection,
              icons
            })
              .then(() => {
                this.isSetDownloading = false
              })
              .catch(error => {
                this.isSetDownloading = false
                console.log('error', error)
                this.$error({
                  title: this.$t('WEB_APP.COLLECTIONS.SVG_GENERATION_FAILED'),
                  text: error.task ? `${error.task.status}<br>${error.task.description}` : ''
                })
              })
          })
      },
      openPaidPopup (title) {
        setTimeout(() => {
          this.paidPopupTitle = title
          this.$refs.paidPopup.openPopup()
        }, 0)
      },
      hasColorIcons () {
        let result = false
        this.collection.icons.some(icon => {
          if (icon.platform && this.isColorPlatform(icon.platform)) {
            result = true
            return true
          }
        })
        return result
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '../../assets/css/variables';

  .download-collection {
    margin: 0 auto;
    padding: 1rem;

    .download-collection-selector {
      margin-bottom: 1.25rem;
      min-width: 0;
    }

    .actions {
      & > .button {
        margin: 0;
        width: 33%;
        min-width: 0;
        font-size: 14px;
        padding: 0 0.5rem;
      }
    }
    & /deep/ .app-popup-content {
      width: 300px;
      padding: 0 4px;
      margin-bottom: 56px;
    }
  }
</style>
