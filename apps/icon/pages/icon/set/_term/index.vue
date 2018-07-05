<template lang="pug">
  .search-landing-page

    app-search(v-bind:grid-selector="true" v-bind:locale="lang")

    .app-page-section.is-underline

      h1.app-page-title {{ title }}
      .app-page-subtitle(v-html="subtitle")

      share-link(v-bind:text="seo.title")

    icon-grid(
      v-bind:icons="icons"
      v-bind:grid-style="gridStyle"
    )
</template>

<script>
  /**
   * WARNING: THIS PAGE IS DEPRECATED. SEE SAME ROUTE FOR LANDINGS APP
   */
  import utils from '~/plugins/utils'
  import Vue from 'vue'

  import { mapState } from 'vuex'

  export default {
    name: 'searchLandingPage',
    layout: 'app-landing',
    scrollToTop: true,
    asyncData ({params, store}) {
      const term = params.term
      return store.dispatch('search', {term})
        .then(response => {
          const beautyTerm = utils.uppercaseFirstLetter(utils.prettifyValue(term))
          store.dispatch('updateSEO', {
            title: Vue.$t('WEB_APP.SEO.SEARCH.TITLE_ALL', {term: beautyTerm}),
            description: Vue.$t('WEB_APP.SEO.SEARCH.DESCRIPTION', {term: beautyTerm}),
            image: '//cdnd.icons8.com/download/web-app-demo.gif'
          })
          return {
            ...response,
            beautyTerm
          }
        })
        .catch(error => {
          console.error('page error', error)
        })
    },
    data () {
      return {
        icons: []
      }
    },
    computed: {
      ...mapState({
        seo: state => state.seo.data,
        gridStyle: state => state.ui.iconsGridStyle,
        lang: state => state.lang.locale
      }),
      title () {
        return this.$t('WEB_APP.SEO.SEARCH.TITLE_ALL', {term: this.beautyTerm})
      },
      subtitle () {
        return this.$t('WEB_APP.SEO.SEARCH.DESCRIPTION', {term: (''+this.beautyTerm).toLowerCase()})
      }
    },
    mounted () {
      this.$analytics.trackSearch({
        term: this.$route.params.term
      })
    }
  }
</script>
