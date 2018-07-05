<template lang="pug">
  v-container(fluid)
    v-layout(column)
      v-flex.mb-3
        v-card
          v-card-title.title Уникальные шрифты ({{ $store.getters['getStats'].fonts }})
      v-flex
        v-data-table.elevation-1(
          :headers='headers'
          :items='fonts'
          hide-actions
        )
          template(slot='items' slot-scope='props')
            td.title.text-xs-center {{ props.item.rating }}
            td.title.text-xs-left {{ props.item.title }}
            td.title.text-xs-left {{ props.item.source ? props.item.source.title : '' }}
          template(slot='no-data') Нет данных
        .text-xs-center.pt-2
          v-pagination(v-model='page', :length='pagesCount')
</template>

<script>
  export default {
    data() {
      return {
        page: 1,
        loading: false,
        pagesCount: 0,
        pagination: {},
        headers: [
          { text: 'Рейтинг', value: 'rating', sortable: false, width: '100px' },
          { text: 'Название', value: 'title', sortable: false },
          { text: 'Сервис источника', value: 'source', sortable: false },
        ]
      }
    },
    asyncData ({ app, store }) {
      return new Promise(function (resolve) {
        const callback = pagesCount => {
          resolve({ pagesCount: parseInt(pagesCount) })
        }

        store.dispatch('getFonts', { callback })
      })
    },
    watch: {
      page: function (page) {
        this.$store.dispatch('getFonts', { page, callback: pagesCount => { this.pagesCount = parseInt(pagesCount) } });
      },
    },
    computed: {
      fonts: function() {
        return this.$store.getters['getFonts']
      },
    },
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
