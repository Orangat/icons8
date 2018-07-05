<template lang="pug">
  .pack-page
    app-search(
      v-bind:grid-selector="true"
      v-bind:extended-grid-selector="extendedGrid"
      v-bind:locale="lang"
    )

    .app-page-section.custom-padding
      h1.app-page-title.is-small.is-left(v-html="title")

    .app-page-section.custom-padding
      page-scroll(
        v-on:fetch="fetchNext"
        v-bind:is-disabled="isScrollDisabled"
        v-bind:is-loading="isLoading"
      )
        icon-grid(
          v-bind:category="category"
          v-bind:grid-style="gridStyle"
          v-bind:action="'select'"
        )

</template>

<script>
  import utils from '~/plugins/utils'
  import { mapState } from 'vuex'
  import Vue from 'vue'

  function fetchData ({params, store, redirect}) {
    return new Promise(function (resolve) {
      const pack = utils.normalizeValue(params.pack)
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
      if (!store.state.appInfo.platforms[platform]) {
        redirect(`/icon/pack/${pack}/all`)
        return
      }
      store.dispatch('setPack', pack)
      const state = store.state
      const lang = state.lang.locale
      const name = state.pack.name[lang] || state.pack.name['en-US']

      store.dispatch('getPack')
        .then(response => {
          if (!response.success) {
            resolve({error: {message: response.message}})
            return
          }
          let canonical = `${store.state.appInfo.backendUrl}/icon/pack/${pack}/${platform}`
          if (platform === 'all') {
            canonical = `${store.state.appInfo.backendUrl}/icon/pack/${pack}`
          }
          store.dispatch('updateSEO', {
            title: Vue.$t('WEB_APP.SEO.CATEGORY.TITLE_PACK', {categoryTitle: name}),
            description: Vue.$t('WEB_APP.SEO.CATEGORY.DESCRIPTION', {categoryTitle: name}),
            image: response.category.sharePreview,
            canonical
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
        category: undefined,
        error: undefined
      }
    },
    data () {
      return {
        isLoading: false,
        allIconsLoaded: false,
        page: 1,
        category: undefined
      }
    },
    computed: {
      ...mapState({
        seo: state => state.seo.data,
        iconsGridStyle: state => state.ui.iconsGridStyle,
        extendedIconsGridStyle: state => state.ui.extendedIconsGridStyle,
        platform: state => state.platform.apiCode,
        pack: state => state.pack,
        lang: state => state.lang.locale,
        color: state => state.color,
        shape: state => state.shape,
        format: state => state.format
      }),
      title () {
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
        title += this.pack.name[this.lang] || this.pack.name['en-US']
        if (this.pack.code === 'free-icons' || this.pack.code === 'logos') {
          return title + '<span class="badge is-big">Free SVG</span>'
        }
        return title
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
      if (!this.category && !this.error) {
        this.fetchData(this.$route.params)
      }
      this.checkError()
    },
    updated () {
      if (this.category && utils.isInViewport(this.$el)) {
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
              this.category = response.category
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
        this.$store.dispatch('getPack', {page: this.page + 1})
          .then(response => {
            this.page++
            this.isLoading = false
            if (response.success) {
              this.mergeCategories(this.category, response.category)
            } else {
              this.allIconsLoaded = true
              this.checkError(response.error)
            }
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
      mergeCategories (category1, category2) {
        category2.subcategory.forEach(sub2 => {
          const sub = category1.subcategory.find(sub1 => sub1.code === sub2.code)
          // if subcategory exist then just add icons from it
          if (sub) {
            sub.icons.push(...sub2.icons)
          // else add whole subcategory
          } else {
            category1.subcategory.push(sub2)
          }
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
