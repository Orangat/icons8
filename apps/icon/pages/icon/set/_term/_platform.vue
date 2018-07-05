<template lang="pug">
  .search-page
    app-search(
      v-bind:grid-selector="true"
      v-bind:extended-grid-selector="extendedGrid"
      v-bind:locale="lang"
    )

    .app-page-section.custom-padding
      h1.app-page-title.is-small.is-left {{ title }}

    .app-page-section.custom-padding
      .nothing-found(v-if="fetchComplete && !icons.length")
        h2.nothing-found-title {{ $t('REQUEST_ICONS.NOT_FOUND.NOTHING', 'Nothing found') }}
        p {{ nothingFoundText }}
        a.button.is-small(v-bind:href="requestIconUrl") {{ $t('REQUEST_ICONS.FREE.REQUEST_ICON', 'Request icons')}}
      page-scroll(
        v-on:fetch="fetchNext"
        v-bind:is-disabled="isScrollDisabled"
        v-bind:is-loading="isLoading"
      )
        icon-grid(
          v-bind:icons="icons"
          v-bind:grid-style="gridStyle"
          v-bind:action="'select'"
        )
</template>

<script>
  import config from '~/plugins/config'
  import utils from '~/plugins/utils'
  import Vue from 'vue'

  import { mapState } from 'vuex'

  function fetchData ({params, store, redirect, res}) {
    return new Promise(function (resolve) {
      const term = utils.normalizeValue(params.term)
      const options = utils.parseOptions(params, store.state.appInfo)
      store.commit('SEARCH_COLOR_CHANGED', store.state.appInfo.colors.black)
      options.forEach(option => {
        switch(option.type) {
          case 'platform': store.commit('PLATFORM_CHANGED', option.value.seoCode); break
          case 'color': store.commit('SEARCH_COLOR_CHANGED', option.value); break
          case 'shape': store.commit('SEARCH_SHAPE_CHANGED', option.value); break
          case 'format': store.commit('SEARCH_FORMAT_CHANGED', option.value); break
        }
      })
      const platform = store.state.platform.apiCode
      const beautyTerm = utils.uppercaseFirstLetter(utils.prettifyValue(term))
      if (!store.state.appInfo.platforms[platform]) {
        redirect(`/icon/set/${term}/all`)
        return
      }
      let canonical = `${store.state.appInfo.backendUrl}/icon/set/${term}/${platform}`
      if (platform === 'all') {
        canonical = `${store.state.appInfo.backendUrl}/icon/set/${term}`
      }
      store.dispatch('updateSEO', {
        title: Vue.$t('WEB_APP.SEO.SEARCH.TITLE_ALL', {term: beautyTerm}),
        description: Vue.$t('WEB_APP.SEO.SEARCH.DESCRIPTION', {term: beautyTerm}),
        canonical
      })

      store.dispatch('search', {term})
        .then(response => {
          if (res && (!response.icons || !response.icons.length)) {
            res.statusCode = 404
          }
          resolve({
            ...response,
            fetchComplete: true
          })
        })
        .catch(error => {
          console.error('page error', error)
          resolve({
            icons: [],
            error: {
              message: error.message
            }
          })
        })
    })
  }

  export default {
    name: 'searchPage',
    layout: 'app',
    scrollToTop: true,
    asyncData ({app, params, store, redirect, res}) {
      if (process.server) {
        if (store.state.lang.locale !=='en-US') {
          app.head.link = app.head.link || []
          app.head.link = app.head.link.filter(link => !link.hreflang)
        }
        return fetchData({params, store, redirect, res})
      }
      return {
        icons: [],
        error: undefined
      }
    },
    data () {
      return {
        icons: [],
        term: '',
        platform: '',
        page: 1,
        isLoading: false,
        allIconsLoaded: false,
        fetchComplete: false,
        nothingFoundText: this.$t('REQUEST_ICONS.NOT_FOUND.TEXT', 'lease tell us the icon you need, and we\'ll draw it for free.').split('<br')[0]
      }
    },
    computed: {
      ...mapState({
        iconsGridStyle: state => state.ui.iconsGridStyle,
        extendedIconsGridStyle: state => state.ui.extendedIconsGridStyle,
        mode: state => state.ui.mode,
        lang: state => state.lang.locale,
        color: state => state.color,
        shape: state => state.shape,
        format: state => state.format
      }),
      title () {
        const term = this.$route.params.term
        let title = ''
        if (this.color && this.color.code !== 'black') {
          title += this.color.title + ' '
        }
        if (this.shape) {
          title += this.shape.title + ' '
        }
        if (this.format) {
          title += this.format.title + ' '
        }
        title += utils.uppercaseFirstLetter(utils.prettifyValue(term))
        return this.$t('WEB_APP.PAGE.SEARCH_LANDING.TITLE', {title})
      },
      extendedGrid () {
        return this.$route.params.platform === 'all'
      },
      gridStyle () {
        return this.extendedGrid ? this.extendedIconsGridStyle : this.iconsGridStyle
      },
      isScrollDisabled () {
        return this.isLoading || this.allIconsLoaded
      },
      requestIconUrl () {
        return `${config.backendUrl}/request-icon`
      }
    },
    mounted () {
      this.$analytics.trackSearch({
        term: this.$route.params.term
      })
      if (!this.icons.length) {
        if (this.fetchComplete) {
          this.$analytics.track({
            event: 'Nothing found',
            category: this.$route.params.platform
          })
        }
        this.fetchData(this.$route.params)
      }
      this.checkError()
    },
    updated () {
      if (this.icons.length && utils.isInViewport(this.$el)) {
        this.fetchNext()
      }
    },
    methods: {
      fetchData (params) {
        this.fetchComplete = false
        return new Promise((resolve) => {
          this.isLoading = true
          fetchData({
            store: this.$store,
            params
          })
            .then(response => {
              this.isLoading = false
              this.icons = response.icons
              this.fetchComplete = true
              if (!this.icons.length) {
                this.$analytics.track({
                  event: 'Nothing found',
                  category: this.$route.params.platform
                })
              }
              this.checkError(response.error)
              resolve()
              this.$forceUpdate()
            })
            .catch(error => {
              this.isLoading = false
              console.error('error', error)
              this.checkError(error)
              resolve()
            })
        })
      },
      fetchNext () {
        if (this.isLoading || this.allIconsLoaded) {
          return
        }
        this.isLoading = true
        const { term } = this.$route.params
        this.$store.dispatch('search', {term, page: this.page + 1})
          .then(response => {
            this.page++
            if (response.icons.length) {
              response.icons.forEach(icon => {
                this.icons.push(icon)
              })
            } else {
              this.allIconsLoaded = true
            }
            this.isLoading = false
          })
          .catch(error => {
            this.isLoading = false
            console.error('page error', error)
            this.$error({
              title: this.$t('WEB_APP.SEARCH.SEARCH_ERROR'),
              text: error.message
            })
          })
      },
      checkError (error = this.error) {
        if (error) {
          this.$error({
            title: this.$t('WEB_APP.MESSAGES.LOAD_FAILED'),
            text: error.message
          })
          this.error = undefined
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .search-page {
    .nothing-found {
      padding: 2rem;
      text-align: center;
      .nothing-found-title {
        font-size: 2rem;
      }
    }
  }
</style>
