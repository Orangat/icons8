<template lang="pug">
  .collections-page

    app-search(
      v-bind:grid-selector="true"
      v-bind:locale="locale"
    )

    .app-page-section
      h1.app-page-title.is-small.is-left {{ name }}

    icon-grid(
      v-bind:icons="icons"
      v-bind:grid-style="gridStyle"
      v-bind:action="'select'"
    )
</template>

<script>
  import axios from '~/plugins/axios'

  import { mapState } from 'vuex'

  export default {
    name: 'collectionsPage',
    layout: 'app',
    scrollToTop: true,
    data: () => ({
      icons: [],
      name: undefined,
      error: undefined
    }),
    computed: {
      ...mapState({
        gridStyle: state => state.ui.iconsGridStyle,
        user: state => state.auth.user,
        locale: state => state.lang.locale,
      })
    },
    watch: {
      '$route' () {
        this.fetch()
      },
      'user.loaded' () {
        this.fetch()
      }
    },
    mounted () {
      this.fetch()
    },
    methods: {
      fetch () {
        return new Promise((resolve) => {
          if (this.user.loaded && !this.user.isGuest) {
            axios
              .request({
                url: '/api/bundle/icons',
                params: {
                  hash: this.user.authToken,
                  bundle: this.$route.params.id,
                  language: this.locale
                }
              })
              .then(response => {
                if (response.data.success) {
                  const result = response.data.result
                  this.name = result.bundle.name
                  this.icons = result.icons
                  this.icons.forEach(icon => {
                    if (icon.id) {
                      icon.svg = icon.svg ? atob(icon.svg) : icon.svg
                    }
                  })
                }
                resolve()
              })
              .catch(error => {
                console.error('Fetch bundle icons error', error)
                resolve()
              })
          } else {
            resolve()
          }
        })
      }
    }
  }
</script>
