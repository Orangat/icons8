<template lang="pug">
  .pack-landing-page

    app-search(v-bind:grid-selector="true" v-bind:locale="lang")

    .app-page-section
      h1.app-page-title.is-small(v-html="title")

    icon-grid(
      v-bind:icons="icons"
      v-bind:grid-style="gridStyle"
    )
</template>

<script>
  /**
   * WARNING: THIS PAGE IS DEPRECATED. SEE SAME ROUTE FOR LANDINGS APP
   */
  import { mapState } from 'vuex'
  import Vue from 'vue'

  export default {
    name: 'seoPackLandingPage',
    layout: 'app-landing',
    scrollToTop: true,
    asyncData ({params, store}) {
      return new Promise(function (resolve) {
        const seoPack = params.seoPack
        store.dispatch('setSeoPack', seoPack)

        const state = store.state
        let name = seoPack
        if (state.seoPack) {
          const lang = state.lang.locale
          name = state.seoPack.name[lang] || state.seoPack.name['en-US']
        }

        store.dispatch('search', {term: seoPack})
          .then(response => {
            store.dispatch('updateSEO', {
              title: Vue.$t('WEB_APP.SEO.TITLE', {title: name}),
              description: Vue.$t('WEB_APP.SEO.DESCRIPTION_ICONS8', {title: name})
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
        seoPack: state => state.seoPack,
        lang: state => state.lang.locale
      }),
      title () {
        let title
        if (!this.seoPack || !this.seoPack.name) {
          title = this.$route.params.seoPack
        } else {
          title = this.seoPack.name[this.lang] || this.seoPack.name['en-US']
        }
        return this.$t('WEB_APP.SEO.TITLE', {title})
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
