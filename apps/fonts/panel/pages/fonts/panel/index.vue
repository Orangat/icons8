<template lang="pug">
  v-container(fluid grid-list-md text-xs-center)
    v-layout(column)
      v-flex
        v-layout(row wrap)
          v-flex(xs12 sm6 md4 lg3)
            v-card
              v-card-title
                v-layout(column)
                  v-flex.headline САЙТОВ
                  v-flex.display-2.green--text {{stats.sites || 0}}
                  v-flex
                    v-btn(flat color="info" @click="$router.push('/fonts/panel/sites')") Перейти
          v-flex(xs12 sm6 md4 lg3)
            v-card
              v-card-title
                v-layout(column)
                  v-flex.headline УНИКАЛЬНЫХ ШРИФТОВ
                  v-flex.display-2.green--text {{ stats.fonts || 0 }}
                  v-flex
                    v-btn(flat color="info" @click="$router.push('/fonts/panel/fonts')") Перейти
          v-flex(xs12 sm6 md4 lg3)
            v-card
              v-card-title
                v-layout(column)
                  v-flex.headline ШРИФТОВ-ИСКЛЮЧЕНИЙ
                  v-flex.display-2.green--text {{ stats.excludedFonts || 0 }}
                  v-flex
                    v-btn(flat color="info" @click="$router.push('/fonts/panel/excluded-fonts')") Перейти
          v-flex(xs12 sm6 md4 lg3)
            v-card
              v-card-title
                v-layout(column)
                  v-flex.headline САЙТОВ-ИСКЛЮЧЕНИЙ
                  v-flex.display-2.green--text {{ stats.excludedSites || 0 }}
                  v-flex
                    v-btn(flat color="info" @click="$router.push('/fonts/panel/excluded-sites')") Перейти
      v-flex
        v-progress-circular(v-if="syncLoading" indeterminate color="primary")
        v-btn(v-else color="primary" @click="refresh()") Обновить

</template>

<script>
  import { mapState } from 'vuex'

  export default {
    data() {
      return {
        syncLoading: false
      }
    },
    asyncData ({ app, store, params }) {
      return new Promise(function (resolve) {
        store.dispatch('getStats', () => resolve())
      })
    },
    computed: {
      ...mapState({
        stats: state => state.stats,
      })
    },
    methods: {
      refresh() {
        this.syncLoading = true
        this.$store.dispatch('getStats', () => {this.syncLoading = false})
      }
    }
  }
</script>

<style lang="scss" scoped>
</style>
