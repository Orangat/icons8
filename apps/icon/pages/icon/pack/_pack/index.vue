<template lang="pug">
  .pack-landing-page

    app-search(v-bind:grid-selector="true" v-bind:locale="lang")

    .app-page-section
      h1.app-page-title.is-small(v-html="title")

    icon-grid(
      v-bind:category="category"
      v-bind:grid-style="gridStyle"
    )
</template>

<script>
  /**
   * WARNING: THIS PAGE IS DEPRECATED. SEE SAME ROUTE FOR LANDINGS APP
   */
  import Vue from 'vue'

  import { mapState } from 'vuex'

  export default {
    name: 'packLandingPage',
    layout: 'app-landing',
    scrollToTop: true,
    asyncData ({params, store}) {
      return new Promise(function (resolve) {
        const pack = params.pack
        store.dispatch('setPack', pack)

        const state = store.state
        const lang = state.lang.locale
        const name = state.pack.name[lang] || state.pack.name['en-US']

        store.dispatch('getPack')
          .then(response => {
            store.dispatch('updateSEO', {
              title: Vue.$t('WEB_APP.SEO.TITLE', {title: name}),
              description: Vue.$t('WEB_APP.SEO.DESCRIPTION_ICONS8', {title: name}),
              image: response.category.sharePreview
            })
            resolve({
              ...response
            })
          })
          .catch(error => {
            console.error('page error', error)
            resolve({
              error: {
                message: error.message
              }
            })
          })
      })
    },
    data () {
      return {
        icons: []
      }
    },
    computed: {
      ...mapState({
        gridStyle: state => state.ui.iconsGridStyle,
        pack: state => state.pack,
        lang: state => state.lang.locale
      }),
      title () {
        let title = this.pack.name[this.lang] || this.pack.name['en-US']
        title = this.$t('WEB_APP.SEO.TITLE', {title})
        if (this.pack.code === 'free-icons' || this.pack.code === 'logos') {
          return title + '<span class="badge is-big">Free SVG</span>'
        }
        return title
      }
    },
    mounted () {
      this.$analytics.track({
        event: 'Viewed Product Category',
        category: 'Navigation',
      })
      if (this.error) {
        this.$error({
          title: this.$t('WEB_APP.MESSAGES.LOAD_FAILED'),
          text: this.error.message
        })
      }
    }
  }
</script>
