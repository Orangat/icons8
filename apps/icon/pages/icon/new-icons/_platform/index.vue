<template lang="pug">
  .new-icons-page
    app-search(
      v-bind:grid-selector="true"
      v-bind:grid-selector-grid="false"
      v-bind:locale="lang"
    )

    .app-page-section.custom-padding
      h1.app-page-title.is-small.is-left(v-html="title")
      .app-page-subtitle.is-small.is-left(v-html="subtitle")

      page-scroll(
        v-on:fetch="fetchNext"
        v-bind:is-disabled="isScrollDisabled"
        v-bind:is-loading="isLoading"
      )
        template(v-for="(icons, key) in iconsByDate")
          h6.iconDate-header {{ key }}
          icon-grid(
            v-bind:icons="icons"
            v-bind:grid-style="gridStyle"
            v-bind:action="'select'"
            v-bind:id="key"
            v-bind:active-grid="activeGrid"
            v-on:activate="activateGrid"
          )
        br
</template>

<script>
  import Vue from 'vue'
  import utils from '~/plugins/utils'

  import { mapState } from 'vuex'
  function fetchData ({params, store}) {
    return new Promise(function (resolve) {
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

      store.dispatch('latest')
        .then(response => {
          if (!response.success) {
            resolve({error: {message: response.message}})
            return
          }
          const platform = store.state.platform.apiCode
          const count = platform ==='all' ? store.state.appInfo.iconsCount : store.state.appInfo.iconsCounts[platform]
          const defaultTitle = Vue.$t('WEB_APP.SEO.LATEST.TITLE_DEFAULT', {count})
          const title = Vue.$t(`WEB_APP.SEO.LATEST.TITLE_${platform.toUpperCase()}`, {count}, defaultTitle)
          store.dispatch('updateSEO', {
            title,
            description: Vue.$t('WEB_APP.SEO.LATEST.DESCRIPTION', {
              count: store.state.appInfo.iconsCount
            }),
            image: response.preview
          })
          getIconsByDate(response.icons)
            .then(iconsByDate => {
              resolve({
                ...response,
                iconsByDate
              })
            })
        })
        .catch(error => {
          console.log('error', error)
          resolve({
            icons: [],
            iconsByDate: {},
            error: {
              message: error.message
            }
          })
        })
    })
  }

  export default {
    name: 'NewIconsPage',
    layout: 'app',
    scrollToTop: true,
    asyncData ({params, store, redirect}) {
      if (process.server) {
        return fetchData({params, store, redirect})
      }
      return {
        icons: [],
        iconsByDate: {},
        error: undefined
      }
    },
    data () {
      return {
        title: this.$t('WEB_APP.NEW_ICONS'),
        subtitle: this.$t('WEB_APP.PAGE.LATEST.SHORT_DESCRIPTION_RANDOM_0'),
        icons: [],
        iconsByDate: {},
        page: 1,
        isLoading: false,
        allIconsLoaded: false,
        activeGrid: undefined,
        $appPageSection: undefined
      }
    },
    computed: {
      ...mapState({
        gridStyle: state => state.ui.iconsGridStyle,
        lang: state => state.lang.locale
      }),
      isScrollDisabled () {
        return this.isLoading || this.allIconsLoaded
      }
    },
    mounted () {
      if (!this.icons.length) {
        this.fetchData(this.$route.params)
      }
      this.checkError()
      console.log('this', this.$el.querySelector('.app-page-section'))
      this.$appPageSection = this.$el.querySelector('.app-page-section')
      console.log('this.$appPageSection', this.$appPageSection)
    },
    updated () {
      if (this.icons.length && utils.isInViewport(this.$el)) {
        this.fetchNext()
      }
    },
    methods: {
      activateGrid (key) {
        this.activeGrid = key
      },
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
              this.iconsByDate = response.iconsByDate
              this.checkError(response.error)
              resolve()
            })
            .catch(error => {
              this.isLoading = false
              console.log('error', error)
              this.checkError(error)
              resolve()
            })
        })
      },
      fetchNext () {
        if (this.isLoading) {
          return
        }
        this.isLoading = true
        this.$store.dispatch('latest', {page: this.page + 1})
          .then(response => {
            this.page++
            if (response.success && response.icons.length) {
              response.icons.forEach(icon => {
                this.icons.push(icon)
              })
              getIconsByDate(this.icons)
                .then(iconsByDate => {
                  this.iconsByDate = iconsByDate
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

  function getIconsByDate (icons) {
    return new Promise(function (resolve) {
      import(/* webpackChunkName: "moment" */ 'moment')
        .then(moment => {
          let iconsByDate = {}
          icons.forEach(icon => {
            let date = humanizeDate(new Date(icon.timestamp*1000))
            iconsByDate[date.date] = iconsByDate[date.date] || []
            iconsByDate[date.date].push(icon)
          })
          resolve(iconsByDate)

          function humanizeDate (date) {
            let result = {
              date: '',
              code: ''
            }
            let $date = moment(date)
            $date.locale('en')

            switch (when($date)) {
              case 'today':
                result.date = 'Today'
                result.code = 'today'
                break
              case 'yesterday':
                result.date = 'Yesterday'
                result.code = 'yesterday'
                break
              case 'this_week':
                result.date = $date.format('dddd')
                result.code = result.date.toLowerCase()
                break
              case 'last_week':
                result.date = 'Last ' + $date.format('dddd')
                result.code = 'last_' + result.date.toLowerCase()
                break
              case 'this_year':
                result.date = $date.format('MMMM D')
                break
              default:
                result.date = $date.format('MMMM D YYYY')
            }

            return result
          }

          function when ($date) {
            let $today = moment().startOf('day')

            // if today
            if ($today.diff($date) < 0) {
              return 'today'

              // if yesterday
            } else if ($today.diff($date) > 0 && $today.diff($date, 'hour') < 24) {
              return 'yesterday'

              // if this week
            } else if ($today.diff($date, 'day') + 1 <= $today.weekday()) {
              return 'this_week'

              // if last week
            } else if (
              $today.diff($date, 'day') + 1 > $today.weekday() &&
              $today.diff($date, 'day') + 1 <= ($today.weekday() + 7)) {
              return 'last_week'

              // if this year
            } else if ($today.year() === $date.year()) {
              return 'this_year'

              // any other dates
            } else {
              return 'other'
            }
          }
        })
        .catch(error => {
          console.error('Failed to load moment bundle', error)
          resolve({})
        })
    })
  }
</script>
