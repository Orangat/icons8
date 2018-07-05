<template lang="pug">
  v-container(fluid)
    v-layout(column)
      v-flex.mb-3
        v-card
          v-card-title.title Сайты ({{ $store.getters['getStats'].sites }})
      v-flex
        v-data-table.elevation-1(:headers='headers' :items='sites' hide-actions)
          template(slot='items' slot-scope='props')
            td
              v-layout(row v-if="props.item.fonts.length")
                v-flex
                  v-tooltip(bottom)
                    v-btn(icon @click="showSiteFonts(props.item)" slot='activator')
                      v-icon.teal--text.darken-4 font_download
                    span Шрифты
            td {{ props.item.fonts.length }}
            td.text-xs-left
              div
                a(:href="props.item.url" target="blank") {{ props.item.url }}
              div {{ props.item.created }}
          template(slot='no-data') Нет данных
        .text-xs-center.pt-2
          v-pagination(v-model='page', :length='pagesCount')

    v-dialog(
      v-model="dialog"
      max-width="800"
      v-if="site"
      scrollable
    )
      v-card
        v-card-title.headline {{ site.url }}
        v-card-text
          v-container(fluid grid-list-md)
            v-layout(row wrap)
              v-flex(xs4 v-for="font in site.fonts" :key='font.id')
                v-card.card--simple(tile)
                  v-card-text
                    h3 {{ font.title }}
        v-card-actions
          v-spacer
          v-btn(color='green darken-1', flat='flat', @click.native='dialog = false') Закрыть
</template>

<script>
  import { mapState } from 'vuex'

  export default {
    data() {
      return {
        page: 1,
        pagesCount: 0,
        dialog: false,
        site: null,
        headers: [
          { text: '', value: 'actions', sortable: false, width: '100px' },
          { text: 'Шрифты', value: 'fontsCount', sortable: false, width: '100px' },
          { text: 'Сайт', value: 'url', sortable: false }
        ]
      }
    },
    asyncData ({ app, store, params }) {
      return new Promise(function (resolve) {
        const callback = pagesCount => {
          resolve({ pagesCount: parseInt(pagesCount) })
        }

        store.dispatch('getSites', { callback })
      })
    },
    watch: {
      page: function (page) {
        this.$store.dispatch('getSites', { page, callback: pagesCount => { this.pagesCount = parseInt(pagesCount) } });
      },
    },
    computed: {
      ...mapState({
        sites: state => state.sites,
      })
    },
    methods: {
      showSiteFonts(site) {
        if (site.fonts.length) {
          this.site = site
          this.dialog = true
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  td {
    text-align: center;
  }

  .card {

    &__text {
      padding: 4px 8px;
    }
  }
</style>
