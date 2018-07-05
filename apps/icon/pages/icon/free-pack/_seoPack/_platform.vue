<template lang="pug">
  .pack-page

    app-search(
      v-bind:grid-selector="true"
      v-bind:extended-grid-selector="extendedGrid"
      v-bind:locale="lang"
    )

    .app-page-section
      h1.app-page-title.is-small.is-left(v-html="title")

    page-scroll(
      v-on:fetch="fetchNext"
      v-bind:is-disabled="isLoading"
      v-bind:is-loading="isLoading"
    )
      icon-grid(
        v-bind:icons="icons"
        v-bind:grid-style="gridStyle"
        v-bind:action="'select'"
      )

</template>

<script>
  import utils from '~/plugins/utils'
  import Vue from 'vue'

  import { mapState } from 'vuex'

  function fetchData ({params, store, redirect}) {
    return new Promise(function (resolve) {
      const seoPack = params.seoPack
      store.commit('PLATFORM_CHANGED', params.platform)
      const platform = store.state.platform.apiCode
      if (!store.state.appInfo.platforms[platform]) {
        redirect(`/icon/free-pack/${seoPack}/all`)
        return
      }
      store.dispatch('setSeoPack', seoPack)

      let name = seoPack
      if (store.state.seoPack) {
        const lang = store.state.lang.locale
        name = store.state.seoPack.name[lang] || store.state.seoPack.name['en-US']
      }
      store.dispatch('updateSEO', {
        title: Vue.$t('WEB_APP.SEO.CATEGORY.TITLE_PACK', {categoryTitle: name}),
        description: Vue.$t('WEB_APP.SEO.CATEGORY.DESCRIPTION', {categoryTitle: name}),
        canonical: platform === 'all' ? `${store.state.appInfo.backendUrl}/icon/free-pack/${seoPack}` : ''
      })

      store.dispatch('search', {term: seoPack})
        .then(response => {
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
  }

  export default {
    name: 'packPlatformPage',
    layout: 'app',
    scrollToTop: true,
    middleware: 'state',
    asyncData ({params, store, redirect}) {
      if (process.server) {
        return fetchData({params, store, redirect})
      }
      return {
        icons: [],
        error: undefined
      }
    },
    data () {
      return {
        icons: [],
        isLoading: false,
        page: 1,
        allIconsLoaded: false
      }
    },
    computed: {
      ...mapState({
        seo: state => state.seo.data,
        iconsGridStyle: state => state.ui.iconsGridStyle,
        extendedIconsGridStyle: state => state.ui.extendedIconsGridStyle,
        platform: state => state.platform.apiCode,
        pack: state => state.seoPack,
        lang: state => state.lang.locale
      }),
      title () {
        if (!this.pack || !this.pack.name) {
          return this.$route.params.seoPack
        }
        return this.pack.name[this.lang] || this.pack.name['en-US']
      },
      extendedGrid () {
        return this.$route.params.platform === 'all'
      },
      gridStyle () {
        return this.extendedGrid ? this.extendedIconsGridStyle : this.iconsGridStyle
      },
      isScrollDisabled () {
        return this.isLoading || this.allIconsLoaded
      }
    },
    mounted () {
      if (!this.icons.length) {
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
        return new Promise((resolve) => {
          this.isLoading = true
          fetchData({
            store: this.$store,
            params
          })
            .then(response => {
              this.isLoading = false
              this.icons = response.icons
              this.checkError(response.error)
              resolve()
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
        const { seoPack } = this.$route.params
        this.$store.dispatch('search', {
          term: seoPack,
          page: this.page + 1
        })
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
            title: 'Icons load failed!',
            text: error.message
          })
          this.error = undefined
        }
      }
    }
  }
</script>
